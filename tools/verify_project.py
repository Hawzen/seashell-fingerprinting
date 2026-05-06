#!/usr/bin/env python3
"""Verify the processed seashell explorer artifacts end to end."""

from __future__ import annotations

import argparse
from functools import partial
import hashlib
from html.parser import HTMLParser
import json
import shutil
import subprocess
import sys
import tempfile
import textwrap
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import cv2
import numpy as np

from build_fingerprints import contour_from_mask, isolate_shell, load_image


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}
MIN_CONTOUR_POINTS = 192


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: object) -> None:  # noqa: A002
        return


class ControlParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.select_stack: list[str] = []
        self.options: dict[str, list[str]] = {}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        element_id = attributes.get("id")
        if element_id:
            self.ids.add(element_id)
        if tag == "select" and element_id:
            self.select_stack.append(element_id)
            self.options.setdefault(element_id, [])
        elif tag == "option" and self.select_stack:
            value = attributes.get("value")
            if value is not None:
                self.options[self.select_stack[-1]].append(value)

    def handle_endtag(self, tag: str) -> None:
        if tag == "select" and self.select_stack:
            self.select_stack.pop()


def parse_controls(path: Path) -> ControlParser:
    if not path.exists():
        raise AssertionError(f"Missing {path}")
    parser = ControlParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def verify_entrypoints() -> None:
    root = parse_controls(Path("index.html"))
    public = parse_controls(Path("public/index.html"))
    entry_text = {
        "index.html": Path("index.html").read_text(encoding="utf-8"),
        "public/index.html": Path("public/index.html").read_text(encoding="utf-8"),
    }
    for select_id in ["colorModeSelect"]:
        if root.options.get(select_id) != public.options.get(select_id):
            raise AssertionError(
                f"{select_id} options differ between entrypoints: "
                f"{root.options.get(select_id)} != {public.options.get(select_id)}"
            )
    required_ids = {
        "scatterCanvas",
        "sourceImage",
        "sourceOverlay",
        "overlayContour",
        "overlayCenter",
        "exportContourSvg",
        "exportSvg",
        "randomShell",
        "neighborContourMode",
        "uploadShape",
        "missingData",
    }
    for path, parser in [("index.html", root), ("public/index.html", public)]:
        missing = sorted(required_ids - parser.ids)
        if missing:
            raise AssertionError(f"{path} is missing required element ids: {missing}")
        if (
            "tools/build_fingerprints.py" not in entry_text[path]
            or "tools/export_static_data.py" not in entry_text[path]
        ):
            raise AssertionError(f"{path} missing-data panel does not include rebuild commands")
        if "Contour QA" in entry_text[path] or "qualityPanel" in entry_text[path]:
            raise AssertionError(f"{path} should not include Contour QA in default markup")
    expected_color_modes = ["species", "mask", "center", "concavity"]
    if root.options.get("colorModeSelect") != expected_color_modes:
        raise AssertionError(f"Unexpected color modes: {root.options.get('colorModeSelect')}")


def count_images(dataset: Path) -> int:
    return sum(
        1
        for path in dataset.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )


def load_json(path: Path) -> dict:
    if not path.exists():
        raise AssertionError(f"Missing {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def assert_equal(actual: object, expected: object, label: str) -> None:
    if actual != expected:
        raise AssertionError(f"{label}: expected {expected!r}, got {actual!r}")


def mask_boundary(mask: np.ndarray) -> np.ndarray:
    padded = np.pad(mask, 1, mode="constant", constant_values=False)
    center = padded[1:-1, 1:-1]
    neighbors = [
        padded[1:-1, :-2],
        padded[1:-1, 2:],
        padded[:-2, 1:-1],
        padded[2:, 1:-1],
    ]
    return center & ~np.logical_and.reduce(neighbors)


def verify_contour_fixtures(
    dataset: Path,
    manifest: dict,
    numeric: np.lib.npyio.NpzFile,
) -> None:
    contours = numeric["contours"]
    contour_points = int(manifest["contour_points"])
    by_file = {record["file"]: record for record in manifest["records"]}
    fixtures = [
        "Aandara_consociata_10_A.jpg",
        "Laevidentalium_martyi_1_A.jpg",
        "Siliquaria_anguina_1_A.jpg",
        "Dentalium_aprinum_4_A.jpg",
    ]
    for file_name in fixtures:
        record = by_file.get(file_name)
        if record is None:
            raise AssertionError(f"Contour fixture is missing from manifest: {file_name}")
        rgb = load_image(
            dataset / file_name,
            max_size=max(int(record["image_width"]), int(record["image_height"])),
        )
        mask, _info = isolate_shell(rgb)
        fresh = contour_from_mask(mask, contour_points)
        stored = contours[int(record["id"])]
        max_delta = float(np.max(np.abs(fresh - stored)))
        if max_delta > 0.75:
            raise AssertionError(f"{file_name} stored contour is stale; max delta {max_delta:.3f}px")

        boundary = mask_boundary(mask)
        distance_source = np.full(mask.shape, 255, dtype=np.uint8)
        distance_source[boundary] = 0
        distance = cv2.distanceTransform(distance_source, cv2.DIST_L2, 3)
        xs = np.clip(np.rint(stored[:, 0]).astype(np.int32), 0, mask.shape[1] - 1)
        ys = np.clip(np.rint(stored[:, 1]).astype(np.int32), 0, mask.shape[0] - 1)
        p95 = float(np.percentile(distance[ys, xs], 95))
        if p95 > 2.0:
            raise AssertionError(f"{file_name} contour is not on the mask boundary; p95 {p95:.3f}px")


def verify_processed(dataset: Path, processed: Path) -> tuple[dict, np.lib.npyio.NpzFile]:
    manifest = load_json(processed / "manifest.json")
    numeric_path = processed / "fingerprints.npz"
    if not numeric_path.exists():
        raise AssertionError(f"Missing {numeric_path}")

    image_count = count_images(dataset)
    assert_equal(manifest["image_count"], image_count, "manifest image_count")
    assert_equal(manifest["processed_count"], image_count, "manifest processed_count")
    assert_equal(manifest["error_count"], 0, "manifest error_count")
    assert_equal(manifest["max_size"], 400, "manifest max_size")
    assert_equal(manifest["center"], "centroid", "manifest center")
    if manifest.get("chunk_count", 0) < 1:
        raise AssertionError("manifest is missing chunk_count from the verified full rebuild")

    numeric = np.load(numeric_path)
    fingerprints = numeric["fingerprints"]
    components = numeric["pca_components"]
    scores = numeric["pca_scores"]
    assert_equal(fingerprints.shape, (image_count, 360), "fingerprints shape")
    assert_equal(components.shape[1], 360, "PCA component angle count")
    assert_equal(scores.shape[0], image_count, "PCA score count")
    contour_points = int(manifest.get("contour_points", 0))
    if contour_points < MIN_CONTOUR_POINTS:
        raise AssertionError(f"processed contour_points is too low: {contour_points}")
    if "contours" not in numeric.files:
        raise AssertionError("processed fingerprints.npz is missing exact resampled contours")
    contours = numeric["contours"]
    assert_equal(contours.shape, (image_count, contour_points, 2), "processed contours shape")
    if not np.isfinite(contours).all():
        raise AssertionError("Processed contours contain non-finite values")
    contour_deltas = np.diff(np.concatenate([contours, contours[:, :1, :]], axis=1), axis=1)
    perimeters = np.linalg.norm(contour_deltas, axis=2).sum(axis=1)
    if float(np.min(perimeters)) <= 1.0:
        raise AssertionError("Processed contours include a collapsed outline")
    widths = np.array([record["image_width"] for record in manifest["records"]], dtype=np.float32)
    heights = np.array([record["image_height"] for record in manifest["records"]], dtype=np.float32)
    x_values = contours[:, :, 0]
    y_values = contours[:, :, 1]
    if np.any(x_values < -0.5) or np.any(y_values < -0.5):
        raise AssertionError("Processed contours include negative image coordinates")
    if np.any(x_values > widths[:, None] - 0.5) or np.any(y_values > heights[:, None] - 0.5):
        raise AssertionError("Processed contours exceed source image bounds")
    verify_contour_fixtures(dataset, manifest, numeric)

    means = fingerprints.mean(axis=1)
    if not np.allclose(means, 1.0, atol=1e-4):
        raise AssertionError("Fingerprints are not mean-normalized")
    if not np.isfinite(fingerprints).all():
        raise AssertionError("Fingerprints contain non-finite values")
    if not any(record["file"] == "Laevidentalium_martyi_1_A.jpg" for record in manifest["records"]):
        raise AssertionError("Known curved-shell contour regression fixture is missing")

    return manifest, numeric


def verify_static(public_data: Path, image_count: int, numeric: np.lib.npyio.NpzFile) -> None:
    model = load_json(public_data / "model.json")
    checksums = load_json(public_data / "checksums.json")
    shell_payload = load_json(public_data / "shells.json")
    records = shell_payload["records"]
    fingerprint_path = public_data / model.get("fingerprint_file", "fingerprints.f32")
    if not fingerprint_path.exists():
        raise AssertionError(f"Missing {fingerprint_path}")
    legacy_fingerprint = public_data / "fingerprints.f32"
    if legacy_fingerprint.exists():
        raise AssertionError(f"Stale legacy fingerprint payload exists: {legacy_fingerprint}")

    assert_equal(model["processed_count"], image_count, "static model processed_count")
    assert_equal(model["angle_count"], 360, "static model angle_count")
    assert_equal(len(records), image_count, "static shell record count")
    if model.get("species_count", 0) < 1000:
        raise AssertionError(f"static model species_count is suspiciously low: {model.get('species_count')}")
    if model.get("view_count", 0) < 2:
        raise AssertionError(f"static model view_count is suspiciously low: {model.get('view_count')}")
    if model.get("contour_visible_component_count", 0) < 2:
        raise AssertionError("Static model is missing contour PCA axes")
    if len(model.get("contour_pca_ranges", [])) < model["contour_visible_component_count"]:
        raise AssertionError("Static model contour PCA ranges are incomplete")
    if len(model.get("contour_mean", [])) != model.get("contour_points", 0) * 2:
        raise AssertionError("Static model is missing contour PCA mean geometry")
    contour_components = model.get("contour_components", [])
    if len(contour_components) < model["contour_visible_component_count"]:
        raise AssertionError("Static model contour PCA components are incomplete")
    if contour_components and len(contour_components[0]) != model.get("contour_points", 0) * 2:
        raise AssertionError("Static model contour PCA component geometry has the wrong size")
    if model.get("fingerprint_encoding") == "uint16_fixed":
        assert_equal(model.get("fingerprint_scale"), 8192, "fingerprint scale")
        assert_equal(fingerprint_path.stat().st_size, image_count * 360 * 2, "fingerprint binary size")
        encoded = np.fromfile(fingerprint_path, dtype="<u2").reshape(image_count, 360)
        decoded = encoded.astype(np.float32) / float(model["fingerprint_scale"])
        max_error = float(np.max(np.abs(decoded - numeric["fingerprints"])))
        if max_error > (0.5 / float(model["fingerprint_scale"]) + 1e-6):
            raise AssertionError(f"fingerprint fixed-point max error is too high: {max_error}")
    else:
        assert_equal(fingerprint_path.stat().st_size, image_count * 360 * 4, "fingerprint binary size")
    contour_file = model.get("contour_file")
    if not contour_file:
        raise AssertionError("Static model is missing contour_file for exact source-image contours")
    contour_path = public_data / contour_file
    if not contour_path.exists():
        raise AssertionError(f"Missing {contour_path}")
    assert_equal(model.get("contour_encoding"), "uint16_xy_fixed", "contour encoding")
    if model.get("contour_points", 0) < MIN_CONTOUR_POINTS:
        raise AssertionError(f"contour_points is too low: {model.get('contour_points')}")
    if model.get("contour_scale", 0) < 1:
        raise AssertionError(f"contour_scale is invalid: {model.get('contour_scale')}")
    assert_equal(
        contour_path.stat().st_size,
        image_count * model["contour_points"] * 2 * 2,
        "contour binary size",
    )
    if "contours" in numeric.files:
        encoded_contours = np.fromfile(contour_path, dtype="<u2").reshape(
            image_count, model["contour_points"], 2
        )
        decoded_contours = encoded_contours.astype(np.float32) / float(model["contour_scale"])
        contour_error = float(np.max(np.abs(decoded_contours - numeric["contours"])))
        if contour_error > (0.5 / float(model["contour_scale"]) + 1e-6):
            raise AssertionError(f"contour fixed-point max error is too high: {contour_error}")

    sample = records[0]
    for key in [
        "id",
        "file",
        "species",
        "pc",
        "contour_pc",
        "center",
        "center_adjustment",
        "bbox",
        "image_width",
        "image_height",
        "component_count",
        "roughness",
        "aspect_ratio",
        "radial_area_ratio",
        "radial_mismatch",
        "contour_solidity",
        "contour_concavity",
    ]:
        if key not in sample:
            raise AssertionError(f"Static shell records are missing {key!r}")
    if len(sample["contour_pc"]) < 2:
        raise AssertionError("Static shell records have incomplete contour_pc values")
    for name in ["model.json", "shells.json", "fingerprints.u16", contour_file]:
        payload = checksums.get(name)
        path = public_data / name
        if not payload:
            raise AssertionError(f"checksums.json is missing {name}")
        assert_equal(payload.get("bytes"), path.stat().st_size, f"{name} checksum byte size")
        digest = sha256_file(path)
        assert_equal(payload.get("sha256"), digest, f"{name} checksum sha256")
    by_file = {record["file"]: record for record in records}
    curved_fixtures = {
        "Laevidentalium_martyi_1_A.jpg": {"radial_mismatch": 0.25, "contour_concavity": 0.40},
        "Siliquaria_anguina_1_A.jpg": {"radial_mismatch": 0.70, "contour_concavity": 0.65},
        "Dentalium_aprinum_4_A.jpg": {"radial_mismatch": 1.40, "contour_concavity": 0.55},
    }
    for file_name, minimums in curved_fixtures.items():
        record = by_file.get(file_name)
        if record is None:
            raise AssertionError(f"Known curved-shell contour regression fixture is missing: {file_name}")
        for key, minimum in minimums.items():
            if float(record.get(key, 0)) < minimum:
                raise AssertionError(
                    f"{file_name} {key} regression: expected at least {minimum}, got {record.get(key)}"
                )


def verify_contour_audit(audit_dir: Path, image_count: int) -> None:
    summary = load_json(audit_dir / "summary.json")
    index_path = audit_dir / "index.html"
    if not index_path.exists() or index_path.stat().st_size == 0:
        raise AssertionError(f"Missing or empty {index_path}")
    assert_equal(summary["processed_count"], image_count, "audit processed_count")
    assert_equal(summary["error_count"], 0, "audit error_count")
    for key in [
        "mask_ratio",
        "roughness",
        "aspect",
        "center_adjustment",
        "radial_area_ratio",
        "radial_mismatch",
        "contour_solidity",
        "contour_concavity",
    ]:
        if key not in summary:
            raise AssertionError(f"Contour audit summary is missing {key!r}")
    if summary["center_adjustment"]["p95"] > 0.01:
        raise AssertionError(
            f"Unexpected center adjustment p95: {summary['center_adjustment']['p95']}"
        )
    for group in [
        "low_mask",
        "high_mask",
        "slender",
        "rough",
        "radial_mismatch",
        "concavity",
        "pca_edge",
        "random",
    ]:
        if group not in summary["groups"]:
            raise AssertionError(f"Contour audit summary is missing group {group!r}")
        if not summary["groups"][group]:
            raise AssertionError(f"Contour audit summary group {group!r} is empty")
        image_path = audit_dir / f"{group}.jpg"
        if not image_path.exists() or image_path.stat().st_size == 0:
            raise AssertionError(f"Missing or empty contour audit sheet: {image_path}")


def verify_contact_sheet_tool() -> None:
    with tempfile.TemporaryDirectory(prefix="seashell-contact-") as directory:
        output = Path(directory) / "siliquaria.jpg"
        subprocess.run(
            [
                sys.executable,
                "tools/make_contact_sheet.py",
                "--dataset",
                "dataset",
                "--processed",
                "processed",
                "--query",
                "Siliquaria",
                "--sort",
                "concavity",
                "--count",
                "8",
                "--output",
                str(output),
            ],
            check=True,
            capture_output=True,
            text=True,
        )
        if not output.exists() or output.stat().st_size < 50_000:
            raise AssertionError(f"Targeted contact sheet was not generated correctly: {output}")


def run_browser_check(url: str) -> None:
    npm = shutil.which("npm")
    node = shutil.which("node")
    if npm is None or node is None:
        raise AssertionError("npm and node are required for --browser")

    with tempfile.TemporaryDirectory(prefix="seashell-pw-") as directory:
      temp = Path(directory)
      upload_path = temp / "upload-test.png"
      from PIL import Image, ImageDraw

      image = Image.new("RGB", (360, 280), (0, 0, 0))
      draw = ImageDraw.Draw(image)
      draw.ellipse((72, 38, 284, 238), fill=(230, 230, 210))
      draw.polygon([(230, 140), (330, 120), (236, 172)], fill=(230, 230, 210))
      draw.ellipse((122, 86, 210, 176), fill=(30, 30, 25))
      image.save(upload_path)

      script = textwrap.dedent(
        f"""
        const {{ chromium }} = require('playwright');
        (async () => {{
          const browser = await chromium.launch({{ headless: true }});
          const page = await browser.newPage({{ viewport: {{ width: 1440, height: 980 }} }});
          const messages = [];
          page.on('console', (msg) => messages.push({{ type: msg.type(), text: msg.text() }}));
          page.on('pageerror', (err) => messages.push({{ type: 'pageerror', text: err.message }}));
          await page.goto(
            '{url}/?debug=1#id=12&ref=0&x=2&y=3&color=mask&near=contour&variant=spiral&pc=0.250,0.000,0.000,0.000,0.000,0.000',
            {{ waitUntil: 'networkidle', timeout: 120000 }}
          );
          await page.waitForFunction(
            () => document.querySelector('#statusLine')?.textContent.includes('species'),
            null,
            {{ timeout: 120000 }}
          );
          const restored = await page.evaluate(() => ({{
            xAxis: document.querySelector('#xAxisSelect').value,
            yAxis: document.querySelector('#yAxisSelect').value,
            color: document.querySelector('#colorModeSelect').value,
            variant: document.querySelector('#variantButtons button[aria-pressed="true"]')?.textContent,
            selected: document.querySelector('#selectedName').textContent,
            status: document.querySelector('#statusLine').textContent,
            missingHidden: document.querySelector('#missingData').hidden,
            hash: window.location.hash,
          }}));
          if (
            restored.xAxis !== '2' ||
            restored.yAxis !== '3' ||
            restored.color !== 'mask' ||
            restored.variant !== 'Spiral' ||
            restored.selected === 'None' ||
            !restored.status.includes('species') ||
            restored.missingHidden !== true ||
            !restored.hash.includes('id=')
          ) {{
            throw new Error(`hash restore failed: ${{JSON.stringify(restored)}}`);
          }}
          const desktopLayout = await page.evaluate(() => ({{
            innerWidth,
            bodyWidth: document.body.scrollWidth,
            documentWidth: document.documentElement.scrollWidth,
          }}));
          if (
            desktopLayout.bodyWidth > desktopLayout.innerWidth ||
            desktopLayout.documentWidth > desktopLayout.innerWidth
          ) {{
            throw new Error(`desktop layout overflow: ${{JSON.stringify(desktopLayout)}}`);
          }}
          const beforeMiddlePan = await page.evaluate(() => ({{
            selected: document.querySelector('#selectedName').textContent,
            firstPc: document.querySelector('[data-pc-row="0"] input[type="number"]').value,
          }}));
          const scatterBox = await page.locator('#scatterCanvas').boundingBox();
          if (!scatterBox) throw new Error('scatter canvas has no box');
          await page.mouse.move(scatterBox.x + scatterBox.width / 2, scatterBox.y + scatterBox.height / 2);
          await page.mouse.down({{ button: 'middle' }});
          await page.mouse.move(
            scatterBox.x + scatterBox.width / 2 + 80,
            scatterBox.y + scatterBox.height / 2 + 40,
          );
          const panningActive = await page.evaluate(() =>
            document.querySelector('#scatterCanvas').classList.contains('is-panning'),
          );
          await page.mouse.up({{ button: 'middle' }});
          const middlePanState = await page.evaluate((before) => ({{
            active: document.querySelector('#scatterCanvas').classList.contains('is-panning'),
            selected: document.querySelector('#selectedName').textContent,
            firstPc: document.querySelector('[data-pc-row="0"] input[type="number"]').value,
            before,
          }}), beforeMiddlePan);
          if (
            !panningActive ||
            middlePanState.active ||
            middlePanState.selected !== beforeMiddlePan.selected ||
            middlePanState.firstPc !== beforeMiddlePan.firstPc
          ) {{
            throw new Error(`middle-button pan failed: ${{JSON.stringify(middlePanState)}}`);
          }}
          await page.getByRole('button', {{ name: 'Walk' }}).click();
          await page.waitForTimeout(700);
          const walkState = await page.evaluate(() => ({{
            pressed: document.querySelector('#walkPca').getAttribute('aria-pressed'),
            firstPc: Number(document.querySelector('[data-pc-row="0"] input[type="number"]').value),
          }}));
          if (walkState.pressed !== 'true' || Math.abs(walkState.firstPc) < 0.001) {{
            throw new Error(`PCA walk failed: ${{JSON.stringify(walkState)}}`);
          }}
          await page.getByRole('button', {{ name: 'Stop' }}).click();
          await page.getByRole('button', {{ name: 'Mean' }}).click();
          const meanState = await page.evaluate(() => Number(document.querySelector('[data-pc-row="0"] input[type="number"]').value));
          if (Math.abs(meanState) > 0.001) throw new Error(`mean reset failed: ${{meanState}}`);
          const beforeRandom = await page.evaluate(() => new URLSearchParams(window.location.hash.slice(1)).get('id'));
          await page.locator('#randomShell').click();
          await page.waitForTimeout(250);
          const randomState = await page.evaluate((before) => ({{
            before,
            after: new URLSearchParams(window.location.hash.slice(1)).get('id'),
            selected: document.querySelector('#selectedName').textContent,
            hash: window.location.hash,
          }}), beforeRandom);
          if (!randomState.after || randomState.after === randomState.before || randomState.selected === 'None') {{
            throw new Error(`random selection failed: ${{JSON.stringify(randomState)}}`);
          }}
          await page.fill('#searchBox', 'Dentalium');
          await page.waitForTimeout(300);
          const filteredQa = await page.evaluate(() => ({{
            visible: Number(document.querySelector('#visibleCount').textContent.replaceAll(',', '')),
            qualityCount: document.querySelectorAll('#qualityList button').length,
            labels: [...document.querySelectorAll('#qualityList button strong')].map((node) => node.textContent),
          }}));
          if (
            filteredQa.visible <= 0 ||
            filteredQa.qualityCount === 0 ||
            filteredQa.labels.some((label) => !label.toLowerCase().includes('dentalium'))
          ) {{
            throw new Error(`filtered QA failed: ${{JSON.stringify(filteredQa)}}`);
          }}
          const beforeEmptyRandom = await page.evaluate(() => new URLSearchParams(window.location.hash.slice(1)).get('id'));
          await page.fill('#searchBox', 'no-such-shell-filter-value');
          await page.waitForTimeout(200);
          await page.locator('#randomShell').click();
          await page.waitForTimeout(150);
          const emptyFilterState = await page.evaluate((before) => ({{
            before,
            after: new URLSearchParams(window.location.hash.slice(1)).get('id'),
            visible: Number(document.querySelector('#visibleCount').textContent.replaceAll(',', '')),
            qualityCount: document.querySelectorAll('#qualityList button').length,
          }}), beforeEmptyRandom);
          if (
            emptyFilterState.visible !== 0 ||
            emptyFilterState.qualityCount !== 0 ||
            emptyFilterState.after !== emptyFilterState.before
          ) {{
            throw new Error(`empty-filter random failed: ${{JSON.stringify(emptyFilterState)}}`);
          }}
          await page.fill('#searchBox', '');
          await page.waitForTimeout(300);
          const modes = ['Fourier','Curvature','Symmetry','Spectrum','Residual','Spiral','Context','Zernike','Color','Upload'];
          const labels = await page.evaluate(() => [...document.querySelectorAll('#variantButtons button')].map((button) => button.textContent));
          if (labels.join('|') !== modes.join('|')) throw new Error(`variant labels: ${{labels.join('|')}}`);
          const axes = await page.evaluate(() => ({{
            xOptions: document.querySelector('#xAxisSelect').options.length,
            yOptions: document.querySelector('#yAxisSelect').options.length,
            contourLabel: document.querySelector('#xAxisSelect').options[0]?.textContent || '',
          }}));
          if (axes.xOptions < 6 || axes.yOptions < 6 || !axes.contourLabel.includes('Contour')) {{
            throw new Error(`axis options missing contour PCA: ${{JSON.stringify(axes)}}`);
          }}
          await page.selectOption('#xAxisSelect', '0');
          await page.selectOption('#yAxisSelect', '1');
          await page.waitForTimeout(300);
          const contourAxes = await page.evaluate(() => ({{
            xAxis: document.querySelector('#xAxisSelect').value,
            yAxis: document.querySelector('#yAxisSelect').value,
            explained: document.querySelector('#explainedVariance').textContent,
          }}));
          if (contourAxes.xAxis !== '0' || contourAxes.yAxis !== '1' || contourAxes.explained === '0%') {{
            throw new Error(`contour PCA axes failed: ${{JSON.stringify(contourAxes)}}`);
          }}
          await page.selectOption('#xAxisSelect', '2');
          await page.selectOption('#colorModeSelect', 'concavity');
          await page.waitForTimeout(300);
          const mapState = await page.evaluate(() => ({{
            xAxis: document.querySelector('#xAxisSelect').value,
            color: document.querySelector('#colorModeSelect').value,
            explained: document.querySelector('#explainedVariance').textContent,
          }}));
          if (mapState.xAxis !== '2' || mapState.color !== 'concavity') {{
            throw new Error(`map controls failed: ${{JSON.stringify(mapState)}}`);
          }}
          await page.selectOption('#qualityModeSelect', 'concavity');
          await page.waitForTimeout(200);
          const qualityState = await page.evaluate(() => ({{
            mode: document.querySelector('#qualityModeSelect').value,
            count: document.querySelectorAll('#qualityList button').length,
            thumbnails: document.querySelectorAll('#qualityList button img').length,
          }}));
          if (qualityState.mode !== 'concavity' || qualityState.count !== 8 || qualityState.thumbnails !== 8) {{
            throw new Error(`quality controls failed: ${{JSON.stringify(qualityState)}}`);
          }}
          const generatedSvgDownload = await Promise.all([
            page.waitForEvent('download'),
            page.locator('#exportSvg').click(),
          ]).then(([download]) => download);
          if (generatedSvgDownload.suggestedFilename() !== 'seashell-generated-contour.svg') {{
            throw new Error(`generated SVG download failed: ${{generatedSvgDownload.suggestedFilename()}}`);
          }}
          await page.locator('#qualityList button').first().click();
          await page.waitForTimeout(300);
          const selectedDetails = await page.textContent('#selectedDetails');
          if (
            !selectedDetails.includes('Solidity') ||
            !selectedDetails.includes('Concavity') ||
            !selectedDetails.includes('Contour PC')
          ) {{
            throw new Error(`quality selection details missing: ${{selectedDetails}}`);
          }}
          const contourDownload = await Promise.all([
            page.waitForEvent('download'),
            page.getByRole('button', {{ name: 'Contour SVG' }}).click(),
          ]).then(([download]) => download);
          if (!contourDownload.suggestedFilename().endsWith('_contour.svg')) {{
            throw new Error(`contour SVG download failed: ${{contourDownload.suggestedFilename()}}`);
          }}
          await page.getByRole('button', {{ name: 'Pin' }}).click();
          await page.locator('#neighborsList button').first().click();
          await page.waitForTimeout(400);
          const compareStatus = await page.textContent('#compareStatus');
          if (!compareStatus.includes('reference') || !compareStatus.includes('contour RMS')) {{
            throw new Error(`compare reference failed: ${{compareStatus}}`);
          }}
          await page.getByRole('button', {{ name: 'Clear' }}).click();
          const clearedStatus = await page.textContent('#compareStatus');
          if (!clearedStatus.includes('No pinned')) {{
            throw new Error(`compare clear failed: ${{clearedStatus}}`);
          }}
          await page.locator('#neighborContourMode').click();
          await page.waitForTimeout(700);
          const contourNeighborState = await page.evaluate(() => ({{
            pressed: document.querySelector('#neighborContourMode').getAttribute('aria-pressed'),
            status: document.querySelector('#neighborStatus').textContent,
            count: document.querySelectorAll('#neighborsList button').length,
          }}));
          if (
            contourNeighborState.pressed !== 'true' ||
            contourNeighborState.count !== 8 ||
            !contourNeighborState.status.includes('outer-contour')
          ) {{
            throw new Error(`contour neighbors failed: ${{JSON.stringify(contourNeighborState)}}`);
          }}
          await page.waitForFunction(() => {{
            const canvas = document.querySelector('#sourceOverlay');
            if (!canvas || !canvas.width || !canvas.height) return false;
            const ctx = canvas.getContext('2d');
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            for (let index = 0; index < data.length; index += 16) {{
              if (data[index + 3] > 0 && (data[index] > 180 || data[index + 1] > 180)) return true;
            }}
            return false;
          }}, null, {{ timeout: 120000 }});
          await page.locator('#overlayCenter').click();
          await page.waitForTimeout(120);
          const overlayState = await page.evaluate(() => ({{
            contour: document.querySelector('#overlayContour').getAttribute('aria-pressed'),
            center: document.querySelector('#overlayCenter').getAttribute('aria-pressed'),
          }}));
          if (overlayState.contour !== 'true' || overlayState.center !== 'false') {{
            throw new Error(`overlay layer toggle failed: ${{JSON.stringify(overlayState)}}`);
          }}
          await page.locator('#overlayCenter').click();
          for (const label of modes.slice(0, 9)) {{
            await page.getByRole('button', {{ name: label }}).click();
            await page.waitForTimeout(label === 'Color' ? 900 : 200);
            if (label === 'Fourier') {{
              const fourierStatus = await page.textContent('#variantStatus');
              if (!fourierStatus.includes('Elliptic Fourier contour')) {{
                throw new Error(`fourier variant did not use exact contours: ${{fourierStatus}}`);
              }}
            }}
            if (label === 'Context') {{
              const contextStatus = await page.textContent('#variantStatus');
              if (!contextStatus.includes('exact contour')) {{
                throw new Error(`context variant did not use exact contours: ${{contextStatus}}`);
              }}
            }}
          }}
          await page.setInputFiles('#uploadShape', {json.dumps(str(upload_path))});
          await page.waitForTimeout(900);
          const upload = await page.evaluate(() => ({{
            status: document.querySelector('#variantStatus').textContent,
            pressed: document.querySelector('#variantButtons button[aria-pressed="true"]')?.textContent,
          }}));
          if (upload.pressed !== 'Upload' || !upload.status.includes('nearest')) {{
            throw new Error(`upload mode failed: ${{JSON.stringify(upload)}}`);
          }}
          await page.setViewportSize({{ width: 390, height: 844 }});
          await page.goto(
            '{url}/?mobile=1&debug=1#id=49008&x=0&y=1&color=concavity&quality=concavity&near=contour&layers=contour,center',
            {{ waitUntil: 'networkidle', timeout: 120000 }}
          );
          await page.waitForFunction(
            () => document.querySelector('#statusLine')?.textContent.includes('species'),
            null,
            {{ timeout: 120000 }}
          );
          const mobile = await page.evaluate(() => {{
            const contour = document.querySelector('#overlayContour');
            const center = document.querySelector('#overlayCenter');
            const contourRect = contour.getBoundingClientRect();
            const centerRect = center.getBoundingClientRect();
            return {{
              innerWidth,
              bodyWidth: document.body.scrollWidth,
              documentWidth: document.documentElement.scrollWidth,
              contour: contour.getAttribute('aria-pressed'),
              center: center.getAttribute('aria-pressed'),
              buttonHeights: [contourRect.height, centerRect.height],
              selected: document.querySelector('#selectedName').textContent,
              color: document.querySelector('#colorModeSelect').value,
              quality: document.querySelector('#qualityModeSelect').value,
              contourNeighbor: document.querySelector('#neighborContourMode').getAttribute('aria-pressed'),
              xAxis: document.querySelector('#xAxisSelect').value,
              yAxis: document.querySelector('#yAxisSelect').value,
            }};
          }});
          if (
            mobile.bodyWidth > mobile.innerWidth ||
            mobile.documentWidth > mobile.innerWidth ||
            mobile.contour !== 'true' ||
            mobile.center !== 'true' ||
            mobile.buttonHeights.some((height) => height < 28) ||
            mobile.selected === 'None' ||
            mobile.color !== 'concavity' ||
            mobile.quality !== 'concavity' ||
            mobile.contourNeighbor !== 'true' ||
            mobile.xAxis !== '0' ||
            mobile.yAxis !== '1'
          ) {{
            throw new Error(`mobile layout failed: ${{JSON.stringify(mobile)}}`);
          }}
          const bad = messages.filter((msg) => msg.type === 'error' || msg.type === 'pageerror');
          await browser.close();
          if (bad.length) throw new Error(JSON.stringify(bad));
        }})().catch((error) => {{
          console.error(error);
          process.exit(1);
        }});
        """
      )
      (temp / "package.json").write_text('{"type":"commonjs"}\n', encoding="utf-8")
      subprocess.run([npm, "install", "playwright@latest", "--no-save"], cwd=temp, check=True)
      subprocess.run([node, "-e", script], cwd=temp, check=True)


def serve_repo(root: Path) -> tuple[ThreadingHTTPServer, str]:
    handler = partial(QuietHandler, directory=str(root))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    url = f"http://127.0.0.1:{server.server_port}"
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, url


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=Path("dataset"))
    parser.add_argument("--processed", type=Path, default=Path("processed"))
    parser.add_argument("--public-data", type=Path, default=Path("public/data"))
    parser.add_argument("--browser", action="store_true", help="Also run the Playwright browser smoke test.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    root = Path.cwd()
    print("checking app entrypoints...", flush=True)
    verify_entrypoints()
    print("checking processed artifacts...", flush=True)
    manifest, numeric = verify_processed(args.dataset, args.processed)
    print("checking static exports...", flush=True)
    verify_static(args.public_data, manifest["processed_count"], numeric)
    print("checking contour audit...", flush=True)
    verify_contour_audit(Path("public/contour_audit"), manifest["processed_count"])
    print("checking targeted contact sheet...", flush=True)
    verify_contact_sheet_tool()
    numeric.close()

    server, url = serve_repo(root)
    try:
        if args.browser:
            print("checking browser UI...", flush=True)
            run_browser_check(url)
    finally:
        server.shutdown()

    print("OK")
    print(f"dataset images: {manifest['image_count']}")
    print(f"processed shells: {manifest['processed_count']}")
    print(f"errors: {manifest['error_count']}")
    print(f"components: {manifest['components']}")
    print(f"browser checked: {args.browser}")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:  # noqa: BLE001
        print(f"VERIFY FAILED: {exc}", file=sys.stderr)
        raise
