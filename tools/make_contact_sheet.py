#!/usr/bin/env python3
"""Render a targeted contact sheet from processed shell records."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image

from make_validation_preview import draw_tile


def record_text(record: dict) -> str:
    return " ".join(
        [
            str(record.get("file", "")),
            str(record.get("name", "")),
            str(record.get("species", "")),
        ]
    ).lower()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=Path("dataset"))
    parser.add_argument("--processed", type=Path, default=Path("processed"))
    parser.add_argument("--public-data", type=Path, default=Path("public/data"))
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--query", default="", help="Case-insensitive species, filename, or record text filter.")
    parser.add_argument(
        "--sort",
        choices=["id", "radial-mismatch", "concavity", "roughness", "mask"],
        default="id",
    )
    parser.add_argument("--ascending", action="store_true")
    parser.add_argument("--count", type=int, default=12)
    parser.add_argument("--start", type=int, default=0)
    args = parser.parse_args()

    manifest = json.loads((args.processed / "manifest.json").read_text(encoding="utf-8"))
    numeric = np.load(args.processed / "fingerprints.npz")
    fingerprints = numeric["fingerprints"]
    contours = numeric["contours"] if "contours" in numeric.files else None

    query = args.query.strip().lower()
    records = [
        record
        for record in manifest["records"]
        if not query or query in record_text(record)
    ]
    if not records:
        raise SystemExit(f"No records matched query {args.query!r}")

    if args.sort != "id":
        shell_payload = json.loads((args.public_data / "shells.json").read_text(encoding="utf-8"))
        static_by_id = {int(record["id"]): record for record in shell_payload["records"]}
        metric_key = {
            "radial-mismatch": "radial_mismatch",
            "concavity": "contour_concavity",
            "roughness": "roughness",
            "mask": "mask_ratio",
        }[args.sort]
        records.sort(
            key=lambda record: float(static_by_id[int(record["id"])].get(metric_key, 0)),
            reverse=not args.ascending,
        )

    selected = records[args.start : args.start + max(1, args.count)]
    tile_size = (300, 260)
    cols = min(4, len(selected))
    rows = int(np.ceil(len(selected) / cols))
    sheet = Image.new("RGB", (cols * tile_size[0], rows * tile_size[1]), (238, 243, 239))
    for slot, record in enumerate(selected):
        record_id = int(record["id"])
        contour = contours[record_id] if contours is not None else None
        tile = draw_tile(args.dataset, record, fingerprints[record_id], tile_size, contour)
        x = (slot % cols) * tile_size[0]
        y = (slot // cols) * tile_size[1]
        sheet.paste(tile, (x, y))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(args.output, quality=92)
    print(args.output)
    print(f"records: {len(records)}, rendered: {len(selected)}")


if __name__ == "__main__":
    main()
