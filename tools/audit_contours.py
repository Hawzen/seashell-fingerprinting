#!/usr/bin/env python3
"""Create a visual contour QA report from processed fingerprints."""

from __future__ import annotations

import argparse
import html
import json
import random
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

from make_validation_preview import draw_tile


def quantile(values: list[float], q: float) -> float:
    if not values:
        return 0.0
    sorted_values = sorted(values)
    index = min(len(sorted_values) - 1, max(0, round((len(sorted_values) - 1) * q)))
    return float(sorted_values[index])


def aspect_ratio(record: dict) -> float:
    x0, y0, x1, y1 = record["bbox"]
    width = max(1, x1 - x0 + 1)
    height = max(1, y1 - y0 + 1)
    return max(width / height, height / width)


def roughness(fingerprint: np.ndarray) -> float:
    return float(np.mean(np.abs(np.diff(np.r_[fingerprint, fingerprint[0]]))))


def pca_radius(record: dict) -> float:
    pc = record.get("pc", [0, 0])
    return float(np.hypot(pc[0], pc[1] if len(pc) > 1 else 0))


def radial_area_ratio(record: dict, fingerprint: np.ndarray) -> float:
    radii = fingerprint.astype(np.float64) * float(record["mean_radius"])
    polygon_area = 0.5 * np.sin(np.deg2rad(1.0)) * float(np.dot(radii, np.roll(radii, -1)))
    return polygon_area / max(1.0, float(record["area"]))


def radial_mismatch_score(record: dict) -> float:
    area_term = abs(np.log(max(1e-6, float(record["radial_area_ratio"]))))
    return float(record["roughness"] * 4.0 + area_term)


def polygon_area(points: np.ndarray) -> float:
    if points.shape[0] < 3:
        return 0.0
    x = points[:, 0].astype(np.float64)
    y = points[:, 1].astype(np.float64)
    return float(abs(np.dot(x, np.roll(y, -1)) - np.dot(y, np.roll(x, -1))) * 0.5)


def contour_solidity(contour: np.ndarray | None) -> float:
    if contour is None or contour.shape[0] < 3:
        return 0.0
    area = polygon_area(contour)
    if area <= 0:
        return 0.0
    hull = cv2.convexHull(contour.astype(np.float32).reshape(-1, 1, 2)).reshape(-1, 2)
    hull_area = polygon_area(hull)
    if hull_area <= 0:
        return 0.0
    return float(np.clip(area / hull_area, 0.0, 1.0))


def quantile_summary(values: list[float]) -> dict[str, float]:
    return {
        "p01": quantile(values, 0.01),
        "p05": quantile(values, 0.05),
        "p50": quantile(values, 0.50),
        "p95": quantile(values, 0.95),
        "p99": quantile(values, 0.99),
    }


def compact_records(records: list[dict], metric: str) -> list[dict]:
    compact = []
    for record in records:
        compact.append(
            {
                "id": record["id"],
                "file": record["file"],
                "species": record["species"],
                "mask_ratio": round(float(record["mask_ratio"]), 6),
                "aspect": round(float(record["aspect"]), 6),
                "roughness": round(float(record["roughness"]), 6),
                "contour_solidity": round(float(record["contour_solidity"]), 6),
                "contour_concavity": round(float(record["contour_concavity"]), 6),
                "center_adjustment": round(float(record.get("center_adjustment", 0)), 3),
                "metric": metric,
                "metric_value": round(float(record.get(metric, 0)), 6),
            }
        )
    return compact


def make_sheet(
    dataset_dir: Path,
    records: list[dict],
    fingerprints: np.ndarray,
    contours: np.ndarray | None,
    output: Path,
    title: str,
) -> None:
    tile_size = (300, 260)
    cols = 4
    rows = int(np.ceil(len(records) / cols))
    sheet = Image.new("RGB", (cols * tile_size[0], rows * tile_size[1]), (238, 243, 239))
    for slot, record in enumerate(records):
        contour = contours[record["id"]] if contours is not None else None
        tile = draw_tile(dataset_dir, record, fingerprints[record["id"]], tile_size, contour)
        x = (slot % cols) * tile_size[0]
        y = (slot // cols) * tile_size[1]
        sheet.paste(tile, (x, y))
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, quality=92)
    print(f"{title}: {output}")


def table_rows(records: list[dict], extra_metric: str) -> str:
    rows = []
    for record in records:
        rows.append(
            "<tr>"
            f"<td>{record['id']}</td>"
            f"<td>{html.escape(record['file'])}</td>"
            f"<td>{html.escape(record['species'])}</td>"
            f"<td>{record['mask_ratio']:.4f}</td>"
            f"<td>{aspect_ratio(record):.2f}</td>"
            f"<td>{record.get(extra_metric, 0):.4f}</td>"
            "</tr>"
        )
    return "\n".join(rows)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=Path("dataset"))
    parser.add_argument("--processed", type=Path, default=Path("processed"))
    parser.add_argument("--output", type=Path, default=Path("public/contour_audit"))
    parser.add_argument("--per-group", type=int, default=12)
    parser.add_argument("--seed", type=int, default=7)
    args = parser.parse_args()

    manifest = json.loads((args.processed / "manifest.json").read_text(encoding="utf-8"))
    numeric = np.load(args.processed / "fingerprints.npz")
    fingerprints = numeric["fingerprints"]
    contours = numeric["contours"] if "contours" in numeric.files else None
    records = manifest["records"]
    if not records:
        raise SystemExit("No records to audit.")

    for record in records:
        contour = contours[record["id"]] if contours is not None else None
        solidity = contour_solidity(contour)
        record["roughness"] = roughness(fingerprints[record["id"]])
        record["aspect"] = aspect_ratio(record)
        record["pca_radius"] = pca_radius(record)
        record["radial_area_ratio"] = radial_area_ratio(record, fingerprints[record["id"]])
        record["radial_mismatch"] = radial_mismatch_score(record)
        record["contour_solidity"] = solidity
        record["contour_concavity"] = 1.0 - solidity

    random.seed(args.seed)
    per = min(args.per_group, len(records))
    groups = [
        ("low_mask", "Smallest masks", sorted(records, key=lambda r: r["mask_ratio"])[:per], "mask_ratio"),
        ("high_mask", "Largest masks", sorted(records, key=lambda r: r["mask_ratio"], reverse=True)[:per], "mask_ratio"),
        ("slender", "Most slender boxes", sorted(records, key=lambda r: r["aspect"], reverse=True)[:per], "aspect"),
        ("rough", "Roughest radial traces", sorted(records, key=lambda r: r["roughness"], reverse=True)[:per], "roughness"),
        ("radial_mismatch", "Radial envelope mismatch risk", sorted(records, key=lambda r: r["radial_mismatch"], reverse=True)[:per], "radial_mismatch"),
        ("concavity", "Most concave contours", sorted(records, key=lambda r: r["contour_concavity"], reverse=True)[:per], "contour_concavity"),
        ("pca_edge", "Farthest PCA points", sorted(records, key=lambda r: r["pca_radius"], reverse=True)[:per], "pca_radius"),
        ("random", "Seeded random sample", random.sample(records, per), "mask_ratio"),
    ]

    args.output.mkdir(parents=True, exist_ok=True)
    sections = []
    for slug, title, selected, metric in groups:
        image_name = f"{slug}.jpg"
        make_sheet(args.dataset, selected, fingerprints, contours, args.output / image_name, title)
        sections.append(
            f"""
            <section>
              <h2>{html.escape(title)}</h2>
              <img src="{image_name}" alt="{html.escape(title)} contour sheet">
              <table>
                <thead><tr><th>ID</th><th>File</th><th>Species</th><th>Mask</th><th>Aspect</th><th>{html.escape(metric)}</th></tr></thead>
                <tbody>{table_rows(selected, metric)}</tbody>
              </table>
            </section>
            """
        )

    ratios = [record["mask_ratio"] for record in records]
    roughnesses = [record["roughness"] for record in records]
    aspects = [record["aspect"] for record in records]
    center_adjustments = [record.get("center_adjustment", 0) for record in records]
    radial_area_ratios = [record["radial_area_ratio"] for record in records]
    radial_mismatches = [record["radial_mismatch"] for record in records]
    contour_solidities = [record["contour_solidity"] for record in records]
    contour_concavities = [record["contour_concavity"] for record in records]
    summary = {
        "processed_count": manifest["processed_count"],
        "error_count": manifest["error_count"],
        "mask_ratio": quantile_summary(ratios),
        "roughness": quantile_summary(roughnesses),
        "aspect": quantile_summary(aspects),
        "center_adjustment": quantile_summary(center_adjustments),
        "radial_area_ratio": quantile_summary(radial_area_ratios),
        "radial_mismatch": quantile_summary(radial_mismatches),
        "contour_solidity": quantile_summary(contour_solidities),
        "contour_concavity": quantile_summary(contour_concavities),
        "groups": {
            slug: compact_records(selected, metric)
            for slug, _title, selected, metric in groups
        },
    }
    (args.output / "summary.json").write_text(
        json.dumps(summary, indent=2),
        encoding="utf-8",
    )

    html_text = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contour Audit</title>
  <style>
    body {{ margin: 0; padding: 24px; font-family: Inter, system-ui, sans-serif; color: #20242a; background: #fbfaf6; }}
    h1 {{ margin: 0 0 8px; }}
    p {{ margin: 0 0 18px; color: #68707a; }}
    .stats {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin: 18px 0 28px; }}
    .stat {{ border: 1px solid #d7d9d4; border-radius: 8px; padding: 12px; background: #fff; }}
    .stat strong {{ display: block; font-size: 22px; }}
    section {{ margin: 0 0 34px; }}
    img {{ width: 100%; max-width: 1200px; border: 1px solid #d7d9d4; border-radius: 8px; background: #fff; }}
    table {{ width: 100%; max-width: 1200px; border-collapse: collapse; margin-top: 10px; font-size: 13px; background: #fff; }}
    th, td {{ border-bottom: 1px solid #e1e3de; padding: 7px 8px; text-align: left; }}
    th {{ color: #68707a; }}
  </style>
</head>
<body>
  <h1>Contour Audit</h1>
  <p>Edge-case sheets from the processed shell fingerprints. Red traces are segmented outer contours; amber dashes are radial fingerprint envelopes; cyan crosses are detected centers.</p>
  <div class="stats">
    <div class="stat"><span>Processed</span><strong>{manifest['processed_count']:,}</strong></div>
    <div class="stat"><span>Errors</span><strong>{manifest['error_count']:,}</strong></div>
    <div class="stat"><span>Mask p01 / p50 / p99</span><strong>{quantile(ratios, 0.01):.3f} / {quantile(ratios, 0.50):.3f} / {quantile(ratios, 0.99):.3f}</strong></div>
    <div class="stat"><span>Aspect p99</span><strong>{quantile(aspects, 0.99):.2f}</strong></div>
    <div class="stat"><span>Roughness p99</span><strong>{quantile(roughnesses, 0.99):.4f}</strong></div>
    <div class="stat"><span>Concavity p99</span><strong>{quantile(contour_concavities, 0.99):.4f}</strong></div>
  </div>
  {''.join(sections)}
</body>
</html>
"""
    (args.output / "index.html").write_text(html_text, encoding="utf-8")
    print(args.output / "index.html")


if __name__ == "__main__":
    main()
