#!/usr/bin/env python3
"""Verify the slim seashell explorer artifacts."""

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

import numpy as np


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


def count_images(dataset: Path) -> int:
    return sum(
        1
        for path in dataset.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )


def verify_entrypoint() -> None:
    path = Path("index.html")
    text = path.read_text(encoding="utf-8")
    parser = ControlParser()
    parser.feed(text)
    required_ids = {
        "scatterCanvas",
        "mapSpaceSelect",
        "xAxisSelect",
        "yAxisSelect",
        "colorModeSelect",
        "pcaInterpretation",
        "sourceImage",
        "sourceOverlay",
        "overlayContour",
        "overlayCenter",
        "outlineCanvas",
        "generatorStatus",
        "pcControls",
        "colorMixCanvas",
        "colorMixStatus",
        "colorMixSwatches",
        "missingData",
    }
    missing = sorted(required_ids - parser.ids)
    if missing:
        raise AssertionError(f"index.html is missing required element ids: {missing}")
    expected_color_modes = ["species", "shell", "lightness", "chroma", "roughness", "concavity", "trait"]
    if parser.options.get("colorModeSelect") != expected_color_modes:
        raise AssertionError(f"Unexpected color modes: {parser.options.get('colorModeSelect')}")
    retired = [
        "Variant Lab",
        "Upload Shape",
        "Contour QA",
        "public/index.html",
        "contour_audit",
        "validation_preview",
    ]
    for marker in retired:
        if marker in text:
            raise AssertionError(f"Retired UI/path marker is still present in index.html: {marker}")
    if not Path("public/shell-generator.wasm").exists():
        raise AssertionError("Missing public/shell-generator.wasm")


def verify_processed(dataset: Path, processed: Path) -> int:
    manifest = load_json(processed / "manifest.json")
    numeric_path = processed / "fingerprints.npz"
    if not numeric_path.exists():
        raise AssertionError(f"Missing {numeric_path}")
    image_count = count_images(dataset) if dataset.exists() else int(manifest["image_count"])
    assert_equal(manifest["image_count"], image_count, "manifest image_count")
    assert_equal(manifest["processed_count"], image_count, "manifest processed_count")
    assert_equal(manifest["error_count"], 0, "manifest error_count")
    numeric = np.load(numeric_path)
    try:
        assert_equal(numeric["fingerprints"].shape, (image_count, 360), "fingerprints shape")
        contour_points = int(manifest.get("contour_points", 0))
        if contour_points < MIN_CONTOUR_POINTS:
            raise AssertionError(f"processed contour_points is too low: {contour_points}")
        if "contours" not in numeric.files:
            raise AssertionError("processed fingerprints.npz is missing contours")
        assert_equal(numeric["contours"].shape, (image_count, contour_points, 2), "contours shape")
    finally:
        numeric.close()
    return image_count


def verify_static(public_data: Path, image_count: int) -> None:
    model = load_json(public_data / "model.json")
    checksums = load_json(public_data / "checksums.json")
    shell_payload = load_json(public_data / "shells.json")
    records = shell_payload["records"]
    assert_equal(model["processed_count"], image_count, "static model processed_count")
    assert_equal(len(records), image_count, "static shell record count")
    if (public_data / "fingerprints.u16").exists() or model.get("fingerprint_file"):
        raise AssertionError("Static app should not ship the retired radial fingerprint binary")
    for key in [
        "contour_file",
        "contour_points",
        "contour_scale",
        "contour_mean",
        "contour_components",
        "trait_feature_schema",
        "trait_components",
        "pca_interpretation",
        "color_mix",
    ]:
        if key not in model:
            raise AssertionError(f"Static model is missing {key!r}")
    if model["contour_points"] < MIN_CONTOUR_POINTS:
        raise AssertionError(f"contour_points is too low: {model['contour_points']}")
    if len(model["contour_mean"]) != model["contour_points"] * 2:
        raise AssertionError("contour_mean length does not match contour_points")
    if len(model["contour_components"]) < 2 or len(model["trait_components"]) < 2:
        raise AssertionError("Static model needs at least two contour and trait components")
    for space in ["contour", "trait"]:
        axes = model["pca_interpretation"].get(space, [])
        if len(axes) < 2:
            raise AssertionError(f"Missing PCA interpretations for {space}")
        for axis in axes[:2]:
            if not axis.get("summary") or not axis.get("drivers"):
                raise AssertionError(f"Incomplete PCA interpretation for {space} PC{axis.get('axis')}")
    color_mix = model["color_mix"]
    if color_mix.get("x", {}).get("field") != "color_a_mean" or color_mix.get("y", {}).get("field") != "color_b_lab_mean":
        raise AssertionError("color_mix must describe the Lab a/b explorer")
    sample = records[0]
    for key in [
        "id",
        "file",
        "species",
        "contour_pc",
        "trait_pc",
        "center",
        "image_width",
        "image_height",
        "roughness",
        "contour_concavity",
        "color_r_mean",
        "color_g_mean",
        "color_b_mean",
        "color_a_mean",
        "color_b_lab_mean",
        "color_chroma_mean",
        "texture_gradient_mean",
    ]:
        if key not in sample:
            raise AssertionError(f"Static shell records are missing {key!r}")
    for retired in ["pc", "radial_area_ratio", "radial_mismatch"]:
        if retired in sample:
            raise AssertionError(f"Retired static shell field is still exported: {retired}")
    contour_path = public_data / model["contour_file"]
    if not contour_path.exists():
        raise AssertionError(f"Missing {contour_path}")
    assert_equal(
        contour_path.stat().st_size,
        image_count * model["contour_points"] * 2 * 2,
        "contour binary size",
    )
    for name in ["model.json", "shells.json", model["contour_file"]]:
        checksum = checksums.get(name)
        if not checksum:
            raise AssertionError(f"checksums.json is missing {name}")
        path = public_data / name
        assert_equal(checksum.get("bytes"), path.stat().st_size, f"{name} checksum byte size")
        assert_equal(checksum.get("sha256"), sha256_file(path), f"{name} checksum sha256")


def run_browser_check(url: str) -> None:
    npm = shutil.which("npm")
    node = shutil.which("node")
    if npm is None or node is None:
        raise AssertionError("npm and node are required for --browser")

    with tempfile.TemporaryDirectory(prefix="seashell-pw-") as directory:
        temp = Path(directory)
        script = textwrap.dedent(
            f"""
            const {{ chromium }} = require('playwright');
            (async () => {{
              const browser = await chromium.launch({{ headless: true }});
              const page = await browser.newPage({{ viewport: {{ width: 1440, height: 980 }} }});
              const messages = [];
              page.on('console', (msg) => messages.push({{ type: msg.type(), text: msg.text() }}));
              page.on('pageerror', (err) => messages.push({{ type: 'pageerror', text: err.message }}));
              await page.goto('{url}/#id=12&x=0&y=1&color=shell', {{ waitUntil: 'networkidle', timeout: 120000 }});
              await page.waitForFunction(
                () => document.querySelector('#statusLine')?.textContent.includes('shells'),
                null,
                {{ timeout: 120000 }}
              );
              const restored = await page.evaluate(() => ({{
                selected: document.querySelector('#selectedName').textContent,
                color: document.querySelector('#colorModeSelect').value,
                pcaText: document.querySelector('#pcaInterpretation').textContent,
                generated: document.querySelector('#generatorStatus').textContent,
                swatches: document.querySelectorAll('#colorMixSwatches > *').length,
                bodyWidth: document.body.scrollWidth,
                documentWidth: document.documentElement.scrollWidth,
                innerWidth,
              }}));
              if (
                restored.selected === 'None' ||
                restored.color !== 'shell' ||
                !restored.pcaText.includes('positive values') ||
                !restored.generated.includes('Selected shell') ||
                restored.swatches < 1 ||
                restored.bodyWidth > restored.innerWidth ||
                restored.documentWidth > restored.innerWidth
              ) {{
                throw new Error(`initial UI failed: ${{JSON.stringify(restored)}}`);
              }}

              const scatterBox = await page.locator('#scatterCanvas').boundingBox();
              if (!scatterBox) throw new Error('scatter canvas has no box');
              await page.fill('#searchBox', 'no-such-shell-filter-value');
              await page.waitForTimeout(200);
              await page.mouse.click(scatterBox.x + scatterBox.width * 0.35, scatterBox.y + scatterBox.height * 0.45);
              await page.waitForTimeout(450);
              const generated = await page.textContent('#generatorStatus');
              if (!generated.includes('local blend')) throw new Error(`map generation failed: ${{generated}}`);
              await page.fill('#searchBox', '');
              await page.waitForTimeout(250);

              await page.locator('#colorMixCanvas').scrollIntoViewIfNeeded();
              await page.waitForTimeout(120);
              const colorBox = await page.locator('#colorMixCanvas').boundingBox();
              if (!colorBox) throw new Error('color canvas has no box');
              await page.mouse.click(colorBox.x + colorBox.width * 0.70, colorBox.y + colorBox.height * 0.32);
              await page.waitForTimeout(250);
              const color = await page.evaluate(() => ({{
                status: document.querySelector('#colorMixStatus').textContent,
                swatches: document.querySelectorAll('#colorMixSwatches > *').length,
              }}));
              if (!color.status.includes('Color blend') || color.swatches < 2) {{
                throw new Error(`color mix failed: ${{JSON.stringify(color)}}`);
              }}

              await page.selectOption('#mapSpaceSelect', 'trait');
              await page.waitForTimeout(200);
              const traitText = await page.textContent('#pcaInterpretation');
              if (!traitText.includes('Trait PC1')) throw new Error(`trait interpretation failed: ${{traitText}}`);

              await page.setViewportSize({{ width: 390, height: 844 }});
              await page.goto('{url}/?mobile=1#id=49008&x=0&y=1&color=concavity', {{ waitUntil: 'networkidle', timeout: 120000 }});
              await page.waitForFunction(
                () => document.querySelector('#statusLine')?.textContent.includes('shells'),
                null,
                {{ timeout: 120000 }}
              );
              const mobile = await page.evaluate(() => ({{
                bodyWidth: document.body.scrollWidth,
                documentWidth: document.documentElement.scrollWidth,
                innerWidth,
                selected: document.querySelector('#selectedName').textContent,
                color: document.querySelector('#colorModeSelect').value,
              }}));
              if (
                mobile.bodyWidth > mobile.innerWidth ||
                mobile.documentWidth > mobile.innerWidth ||
                mobile.selected === 'None' ||
                mobile.color !== 'concavity'
              ) {{
                throw new Error(`mobile UI failed: ${{JSON.stringify(mobile)}}`);
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
    parser.add_argument("--browser", action="store_true")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    print("checking app entrypoint...", flush=True)
    verify_entrypoint()
    print("checking processed data...", flush=True)
    image_count = verify_processed(args.dataset, args.processed)
    print("checking static data...", flush=True)
    verify_static(args.public_data, image_count)

    server, url = serve_repo(Path.cwd())
    try:
        if args.browser:
            print("checking browser UI...", flush=True)
            run_browser_check(url)
    finally:
        server.shutdown()

    print("OK")
    print(f"dataset images: {image_count}")
    print(f"browser checked: {args.browser}")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:  # noqa: BLE001
        print(f"FAILED: {exc}", file=sys.stderr)
        raise
