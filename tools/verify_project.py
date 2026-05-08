#!/usr/bin/env python3
"""Verify the slim seashell explorer artifacts."""

from __future__ import annotations

import argparse
from functools import partial
import gzip
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


def load_json_gzip(path: Path) -> dict:
    if not path.exists():
        raise AssertionError(f"Missing {path}")
    with gzip.open(path, "rt", encoding="utf-8") as handle:
        return json.load(handle)


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


def unpack_shell_payload(payload: dict) -> list[dict]:
    if isinstance(payload.get("records"), list):
        return payload["records"]
    if payload.get("encoding") != "shell-pack-v1":
        raise AssertionError(f"Unexpected shell payload encoding: {payload.get('encoding')!r}")
    count = int(payload.get("count", 0))
    metrics = payload.get("metrics", {})
    fields = payload.get("fields", list(metrics.keys()))
    records: list[dict] = []
    for index in range(count):
        species_index = payload["species"][index]
        specimen_index = payload["specimens"][index]
        view_index = payload["views"][index]
        record = {
            "id": index,
            "file": payload["files"][index],
            "species": payload["species_names"][species_index],
            "specimen": payload["specimen_values"][specimen_index],
            "specimen_label": payload["specimen_labels"][specimen_index],
            "view": payload["view_values"][view_index],
            "view_label": payload["view_labels"][view_index],
            "area": payload["area"][index],
            "center": payload["centers"][index * 2 : index * 2 + 2],
            "image_width": payload["dims"][index * 2],
            "image_height": payload["dims"][index * 2 + 1],
            "bbox": payload["bbox"][index * 4 : index * 4 + 4],
            "contour_pc": payload["contour_pc"][
                index * payload["contour_pc_count"] : (index + 1) * payload["contour_pc_count"]
            ],
            "trait_pc": payload["trait_pc"][
                index * payload["trait_pc_count"] : (index + 1) * payload["trait_pc_count"]
            ],
        }
        for field in fields:
            record[field] = metrics[field][index]
        records.append(record)
    return records


def verify_entrypoint() -> None:
    path = Path("index.html")
    text = path.read_text(encoding="utf-8")
    parser = ControlParser()
    parser.feed(text)
    required_ids = {
        "scatterCanvas",
        "xAxisSelect",
        "yAxisSelect",
        "colorModeSelect",
        "starredBand",
        "physicalHash",
        "projectedHash",
        "starShell",
        "sourceThumb",
        "sourceImage",
        "sourceSpinner",
        "shellDescription",
        "outlineCanvas",
        "pcControls",
        "uploadShell",
        "uploadInput",
        "paletteSwatches",
        "loadingOverlay",
        "loadingText",
        "neighborsList",
        "missingData",
    }
    missing = sorted(required_ids - parser.ids)
    if missing:
        raise AssertionError(f"index.html is missing required element ids: {missing}")
    expected_color_modes = ["locality", "species", "shell", "pattern", "lightness", "chroma", "roughness", "concavity"]
    if parser.options.get("colorModeSelect") != expected_color_modes:
        raise AssertionError(f"Unexpected color modes: {parser.options.get('colorModeSelect')}")
    legacy_title = "Seashell " + "PCA Explorer"
    retired = [
        "Variant Lab",
        "Upload Shape",
        "Contour QA",
        "public/index.html",
        "contour_audit",
        "validation_preview",
        "Stats",
        "Haskell",
        legacy_title,
        "Shape + traits",
        "Trait PC1",
        "PCA Axes",
        "Color Mix",
        "overlayContour",
        "overlayCenter",
        "sourceOverlay",
        "colorMixCanvas",
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
    shell_file = model.get("shell_file")
    if shell_file != "shells.compact.json.gz":
        raise AssertionError(f"Static model should use compressed shell pack, got {shell_file!r}")
    shell_payload = load_json_gzip(public_data / shell_file)
    records = unpack_shell_payload(shell_payload)
    assert_equal(model["processed_count"], image_count, "static model processed_count")
    assert_equal(len(records), image_count, "static shell record count")
    if (public_data / "shells.json").exists():
        raise AssertionError("Static app should not ship the oversized uncompressed shells.json")
    if (public_data / "fingerprints.u16").exists() or model.get("fingerprint_file"):
        raise AssertionError("Static app should not ship the retired radial fingerprint binary")
    if (public_data / "contours.u16").exists():
        raise AssertionError("Static app should not ship the oversized uncompressed contour binary")
    for key in [
        "shell_file",
        "locality_file",
        "species_traits_file",
        "contour_file",
        "contour_points",
        "contour_scale",
        "contour_mean",
        "contour_components",
        "trait_feature_schema",
        "trait_components",
        "pca_interpretation",
        "color_mix",
        "color_fingerprint_fields",
        "thumbnail_atlas",
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
            if not axis.get("label") or not axis.get("drivers"):
                raise AssertionError(f"Incomplete PCA interpretation for {space} PC{axis.get('axis')}")
            if "positive values" in str(axis.get("summary", "")):
                raise AssertionError(f"PCA interpretation is still verbose for {space} PC{axis.get('axis')}")
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
        "color_pattern_strength",
        "color_pattern_contrast",
        "texture_gradient_mean",
        "specimen_label",
        "view_label",
    ]:
        if key not in sample:
            raise AssertionError(f"Static shell records are missing {key!r}")
    for retired in ["pc", "radial_area_ratio", "radial_mismatch"]:
        if retired in sample:
            raise AssertionError(f"Retired static shell field is still exported: {retired}")
    locality_path = public_data / model["locality_file"]
    if not locality_path.exists():
        raise AssertionError(f"Missing {locality_path}")
    locality_payload = load_json_gzip(locality_path)
    if locality_payload.get("encoding") != "shell-localities-v1":
        raise AssertionError("Unexpected locality pack encoding")
    assert_equal(locality_payload.get("species_count"), model["species_count"], "locality species count")
    if locality_payload.get("matched_species_count", 0) < model["species_count"] // 2:
        raise AssertionError("Locality pack matched too few species")
    traits_path = public_data / model["species_traits_file"]
    if not traits_path.exists():
        raise AssertionError(f"Missing {traits_path}")
    traits_payload = load_json_gzip(traits_path)
    if traits_payload.get("encoding") != "shell-species-traits-v1":
        raise AssertionError("Unexpected species traits pack encoding")
    assert_equal(traits_payload.get("species_count"), model["species_count"], "species traits count")
    rarity_labels = traits_payload.get("rarity_labels", [])
    if rarity_labels != ["Common", "Uncommon", "Rare", "Extremely rare", "Data deficient"]:
        raise AssertionError(f"Unexpected rarity labels: {rarity_labels!r}")
    rarity = traits_payload.get("rarity", [])
    if len(rarity) != model["species_count"] or len(set(rarity)) < 4:
        raise AssertionError("Species traits pack should contain varied coarse rarity labels")
    for key in [
        "species_names",
        "genus",
        "dataset_sample_count",
        "observation_count",
        "known_range_country_codes",
        "protection_status",
        "market_price_usd",
    ]:
        if len(traits_payload.get(key, [])) != model["species_count"]:
            raise AssertionError(f"Species traits field {key!r} has the wrong length")
    contour_path = public_data / model["contour_file"]
    if not contour_path.exists():
        raise AssertionError(f"Missing {contour_path}")
    with gzip.open(contour_path, "rb") as handle:
        contour_bytes = len(handle.read())
    assert_equal(contour_bytes, image_count * model["contour_points"] * 2 * 2, "contour binary size")
    atlas = model["thumbnail_atlas"]
    thumb_total = 0
    if atlas.get("bytes", 0) > 50 * 1024 * 1024:
        raise AssertionError("Thumbnail atlas exceeds the 50 MiB budget")
    for file_name in atlas.get("files", []):
        path = public_data / atlas["dir"] / file_name
        if not path.exists():
            raise AssertionError(f"Missing thumbnail atlas file {path}")
        thumb_total += path.stat().st_size
    assert_equal(thumb_total, atlas.get("bytes"), "thumbnail atlas byte total")
    checksum_names = ["model.json", shell_file, model["contour_file"], model["locality_file"], model["species_traits_file"]]
    checksum_names.extend(f"{atlas['dir']}/{name}" for name in atlas.get("files", []))
    for name in checksum_names:
        checksum = checksums.get(name)
        if not checksum:
            raise AssertionError(f"checksums.json is missing {name}")
        path = public_data / name
        assert_equal(checksum.get("bytes"), path.stat().st_size, f"{name} checksum byte size")
        assert_equal(checksum.get("sha256"), sha256_file(path), f"{name} checksum sha256")


def run_browser_check(
    url: str,
    perf_clicks: int = 0,
    perf_max_median_ms: float = 250,
    perf_max_p90_ms: float = 1200,
) -> None:
    npm = shutil.which("npm")
    node = shutil.which("node")
    if npm is None or node is None:
        raise AssertionError("npm and node are required for --browser")

    with tempfile.TemporaryDirectory(prefix="seashell-pw-") as directory:
        temp = Path(directory)
        from PIL import Image, ImageDraw

        upload_path = temp / "upload-shell.png"
        upload = Image.new("RGB", (420, 300), "black")
        draw = ImageDraw.Draw(upload)
        draw.ellipse((62, 42, 360, 264), fill=(216, 185, 135))
        draw.arc((86, 72, 344, 238), 195, 20, fill=(115, 71, 51), width=18)
        draw.arc((96, 102, 326, 268), 200, 18, fill=(244, 226, 184), width=10)
        upload.save(upload_path)
        script = textwrap.dedent(
            f"""
            const path = require('path');
            const {{ chromium }} = require('playwright');
            (async () => {{
              const uploadPath = path.join(process.cwd(), 'upload-shell.png');
              const browser = await chromium.launch({{ headless: true }});
              const page = await browser.newPage({{ viewport: {{ width: 1440, height: 980 }} }});
              const messages = [];
              page.on('console', (msg) => messages.push({{ type: msg.type(), text: msg.text() }}));
              page.on('pageerror', (err) => messages.push({{ type: 'pageerror', text: err.message }}));
              await page.goto('{url}/#id=20&x=0&y=1&color=shell', {{ waitUntil: 'networkidle', timeout: 120000 }});
	              await page.waitForFunction(
	                () => document.querySelector('#statusLine')?.textContent.includes('shells'),
	                null,
	                {{ timeout: 120000 }}
	              );
	              await page.waitForFunction(
	                () => window.shellspacePerf?.scatterPointCount?.() === window.shellspacePerf?.filteredCount?.(),
	                null,
	                {{ timeout: 120000 }}
	              );
	              const restored = await page.evaluate(() => ({{
	                selected: document.querySelector('#selectedName').textContent,
	                color: document.querySelector('#colorModeSelect').value,
	                hash: document.querySelector('#physicalHash').textContent,
	                projectedHash: document.querySelector('#projectedHash').textContent,
                palette: document.querySelectorAll('#paletteSwatches > *').length,
                description: document.querySelector('#shellDescription').textContent,
                details: document.querySelector('#selectedDetails').textContent,
	                loadingHidden: document.querySelector('#loadingOverlay').hidden,
	                scatterPoints: window.shellspacePerf?.scatterPointCount?.() || 0,
	                filteredCount: window.shellspacePerf?.filteredCount?.() || 0,
	                bodyWidth: document.body.scrollWidth,
	                documentWidth: document.documentElement.scrollWidth,
	                innerWidth,
	              }}));
	              if (
	                restored.selected === 'None' ||
	                restored.color !== 'shell' ||
	                !/^[0-9A-Z]{{6}}$/.test(restored.hash) ||
                restored.projectedHash !== restored.hash ||
                restored.palette < 5 ||
                restored.description.length < 20 ||
                !restored.details.includes('Rarity') ||
                !/(Common|Uncommon|Rare|Extremely rare|Data deficient)/.test(restored.details) ||
                restored.details.includes('No true population estimate') ||
                restored.details.includes('Recorded share') ||
                restored.details.includes('Occurrence records') ||
                restored.details.includes('GBIF') ||
                restored.description.includes('GBIF') ||
	                restored.description.includes('is a shell species represented') ||
	                restored.details.includes('dataset rarity') ||
	                !restored.loadingHidden ||
	                restored.scatterPoints !== restored.filteredCount ||
	                restored.bodyWidth > restored.innerWidth ||
	                restored.documentWidth > restored.innerWidth
	              ) {{
	                throw new Error(`initial UI failed: ${{JSON.stringify(restored)}}`);
	              }}

	              const perfClickCount = {perf_clicks};
	              if (perfClickCount > 0) {{
	                await page.waitForFunction(
	                  () => (window.shellspacePerf?.surpriseReadyCount?.() || 0) >= 2,
	                  null,
	                  {{ timeout: 120000 }}
	                );
	                const samples = [];
	                for (let index = 0; index < perfClickCount; index += 1) {{
	                  const before = await page.evaluate(() => ({{
	                    hash: document.querySelector('#physicalHash')?.textContent || '',
	                    selected: document.querySelector('#selectedName')?.textContent || '',
	                  }}));
	                  const started = await page.evaluate(() => performance.now());
	                  await page.click('#randomShell', {{ timeout: 10000, noWaitAfter: true }});
	                  await page.waitForFunction(
	                    (previous) => {{
	                      const hash = document.querySelector('#physicalHash')?.textContent || '';
	                      const selected = document.querySelector('#selectedName')?.textContent || '';
	                      const spinner = document.querySelector('#sourceSpinner');
	                      return spinner?.hidden === true && (hash !== previous.hash || selected !== previous.selected);
	                    }},
	                    before,
	                    {{ timeout: 120000 }}
	                  );
	                  samples.push(await page.evaluate((start) => performance.now() - start, started));
	                }}
	                const sorted = [...samples].sort((a, b) => a - b);
	                const perf = {{
	                  samples: samples.map((value) => Math.round(value)),
	                  median: sorted[Math.floor(sorted.length / 2)],
	                  p90: sorted[Math.floor(sorted.length * 0.9)],
	                  loadedPages: await page.evaluate(() => window.shellspacePerf?.loadedThumbnailPageCount?.() ?? -1),
	                }};
	                console.log(`surprise perf ${{JSON.stringify({{
	                  samples: perf.samples,
	                  median: Math.round(perf.median),
	                  p90: Math.round(perf.p90),
	                  loadedPages: perf.loadedPages,
	                }})}}`);
	                if (perf.median > {perf_max_median_ms} || perf.p90 > {perf_max_p90_ms}) {{
	                  throw new Error(`surprise perf failed: ${{JSON.stringify(perf)}}`);
	                }}
	              }}

	              await page.click('#starShell');
              await page.waitForTimeout(250);
              const starred = await page.evaluate(() => ({{
                count: document.querySelectorAll('#starredBand .starred-shell').length,
                imageOnly: document.querySelectorAll('#starredBand .starred-shell canvas').length,
                text: document.querySelector('#starredBand').textContent.trim(),
                active: document.querySelector('#starShell').getAttribute('aria-pressed'),
                icon: Boolean(document.querySelector('#starShell .star-icon')),
              }}));
              if (starred.count < 1 || starred.imageOnly < 1 || starred.text || starred.active !== 'true' || !starred.icon) {{
                throw new Error(`star failed: ${{JSON.stringify(starred)}}`);
              }}

              const scatterBox = await page.locator('#scatterCanvas').boundingBox();
              if (!scatterBox) throw new Error('scatter canvas has no box');
              const beforeHash = await page.textContent('#projectedHash');
              await page.fill('#searchBox', 'no-such-shell-filter-value');
              await page.waitForTimeout(200);
              await page.mouse.click(scatterBox.x + scatterBox.width * 0.35, scatterBox.y + scatterBox.height * 0.45);
              await page.waitForTimeout(450);
              const afterHash = await page.textContent('#projectedHash');
              if (!afterHash || afterHash === beforeHash) throw new Error(`map generation failed: ${{beforeHash}} -> ${{afterHash}}`);
              await page.fill('#searchBox', '');
              await page.waitForTimeout(250);

              const axisText = await page.evaluate(() => Array.from(document.querySelectorAll('#xAxisSelect option')).map((option) => option.textContent).join(' '));
              const hasAxisPanel = await page.$('#pcaInterpretation');
              if (!axisText.includes('PC1') || axisText.includes('Elongation') || hasAxisPanel) {{
                throw new Error(`axis labels failed: ${{axisText}}`);
              }}

              await page.fill('#searchBox', restored.hash);
              await page.waitForTimeout(250);
              const hashSearch = await page.evaluate(() => document.querySelector('#statusLine').textContent);
              await page.fill('#searchBox', '');

              await page.setInputFiles('#uploadInput', uploadPath);
              await page.waitForTimeout(650);
              const uploaded = await page.evaluate(() => ({{
                selected: document.querySelector('#selectedName').textContent,
                details: document.querySelector('#selectedDetails').textContent,
                hash: document.querySelector('#physicalHash').textContent,
              }}));
              if (
                !uploaded.selected.includes('Uploaded shell') ||
                !uploaded.details.includes('Bring your own shell') ||
                !uploaded.details.includes('Uploaded image') ||
                !/^[0-9A-Z]{{6}}$/.test(uploaded.hash)
              ) {{
                throw new Error(`upload failed: ${{JSON.stringify(uploaded)}}`);
              }}

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
    parser.add_argument("--perf", action="store_true", help="run the Surprise me browser latency gate")
    parser.add_argument("--perf-clicks", type=int, default=12)
    parser.add_argument("--perf-max-median-ms", type=float, default=250)
    parser.add_argument("--perf-max-p90-ms", type=float, default=1200)
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
        if args.browser or args.perf:
            print("checking browser UI...", flush=True)
            run_browser_check(
                url,
                perf_clicks=args.perf_clicks if args.perf else 0,
                perf_max_median_ms=args.perf_max_median_ms,
                perf_max_p90_ms=args.perf_max_p90_ms,
            )
    finally:
        server.shutdown()

    print("OK")
    print(f"dataset images: {image_count}")
    print(f"browser checked: {args.browser}")
    print(f"perf checked: {args.perf}")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:  # noqa: BLE001
        print(f"FAILED: {exc}", file=sys.stderr)
        raise
