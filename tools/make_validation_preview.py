#!/usr/bin/env python3
"""Render a contact sheet of detected shell centers and radial outlines."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageOps

from build_fingerprints import isolate_shell, load_image


CONTOUR_COLOR = (232, 76, 58)
FINGERPRINT_COLOR = (238, 158, 48)
CENTER_COLOR = (35, 230, 202)


def outline_points(
    record: dict,
    fingerprint: np.ndarray,
    scale_x: float,
    scale_y: float,
) -> list[tuple[float, float]]:
    center_x, center_y = record["center"]
    mean_radius = record["mean_radius"]
    points = []
    for angle, value in enumerate(fingerprint):
        radians = np.deg2rad(angle)
        radius = float(value) * mean_radius
        points.append(
            (
                center_x * scale_x + np.cos(radians) * radius * scale_x,
                center_y * scale_y - np.sin(radians) * radius * scale_y,
            )
        )
    return points


def outer_contour_points(
    dataset_dir: Path,
    record: dict,
    contour: np.ndarray | None = None,
) -> list[tuple[float, float]]:
    if contour is not None and contour.size:
        return [(float(x), float(y)) for x, y in contour]

    max_size = max(int(record["image_width"]), int(record["image_height"]))
    rgb = load_image(dataset_dir / record["file"], max_size=max_size)
    mask, _info = isolate_shell(rgb)
    contours, _hierarchy = cv2.findContours(
        mask.astype(np.uint8) * 255,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_NONE,
    )
    if not contours:
        return []

    contour = max(contours, key=cv2.contourArea)
    perimeter = cv2.arcLength(contour, closed=True)
    epsilon = max(0.65, perimeter * 0.0015)
    simplified = cv2.approxPolyDP(contour, epsilon, closed=True)
    return [(float(point[0][0]), float(point[0][1])) for point in simplified]


def draw_dashed_loop(
    draw: ImageDraw.ImageDraw,
    points: list[tuple[float, float]],
    color: tuple[int, int, int],
    width: int,
    dash: int = 10,
) -> None:
    if len(points) < 2:
        return
    for index in range(len(points)):
        if (index // dash) % 2 == 0:
            draw.line((points[index], points[(index + 1) % len(points)]), fill=color, width=width)


def draw_tile(
    dataset_dir: Path,
    record: dict,
    fingerprint: np.ndarray,
    tile_size: tuple[int, int],
    contour: np.ndarray | None = None,
) -> Image.Image:
    path = dataset_dir / record["file"]
    image = Image.open(path).convert("RGB")
    image = ImageOps.exif_transpose(image)
    scale = min(tile_size[0] / image.width, (tile_size[1] - 34) / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)

    tile = Image.new("RGB", tile_size, (248, 247, 242))
    tile.paste(resized, ((tile_size[0] - resized.width) // 2, 0))
    draw = ImageDraw.Draw(tile)

    offset_x = (tile_size[0] - resized.width) // 2
    overlay_scale_x = resized.width / record["image_width"]
    overlay_scale_y = resized.height / record["image_height"]

    contour_points = [
        (x * overlay_scale_x + offset_x, y * overlay_scale_y)
        for x, y in outer_contour_points(dataset_dir, record, contour)
    ]
    if len(contour_points) > 1:
        draw.line(contour_points + [contour_points[0]], fill=CONTOUR_COLOR, width=2)

    fingerprint_points = [
        (x + offset_x, y)
        for x, y in outline_points(record, fingerprint, overlay_scale_x, overlay_scale_y)
    ]
    draw_dashed_loop(draw, fingerprint_points, FINGERPRINT_COLOR, width=2)

    cx = record["center"][0] * overlay_scale_x + offset_x
    cy = record["center"][1] * overlay_scale_y
    draw.line((cx - 7, cy, cx + 7, cy), fill=CENTER_COLOR, width=2)
    draw.line((cx, cy - 7, cx, cy + 7), fill=CENTER_COLOR, width=2)
    draw.ellipse((cx - 3, cy - 3, cx + 3, cy + 3), fill=CENTER_COLOR)

    label = f"{record['id']}  {record['species']}  PC=({record['pc'][0]:.2f}, {record['pc'][1]:.2f})"
    draw.rectangle((0, tile_size[1] - 34, tile_size[0], tile_size[1]), fill=(255, 255, 255))
    draw.text((8, tile_size[1] - 25), label[:62], fill=(31, 36, 42))
    legend_x = tile_size[0] - 46
    legend_y = tile_size[1] - 24
    draw.line((legend_x, legend_y, legend_x + 14, legend_y), fill=CONTOUR_COLOR, width=2)
    draw.line((legend_x + 22, legend_y, legend_x + 28, legend_y), fill=FINGERPRINT_COLOR, width=2)
    draw.line((legend_x + 34, legend_y, legend_x + 40, legend_y), fill=FINGERPRINT_COLOR, width=2)
    return tile


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=Path("dataset"))
    parser.add_argument("--processed", type=Path, default=Path("processed"))
    parser.add_argument("--output", type=Path, default=Path("public/validation_preview.jpg"))
    parser.add_argument("--count", type=int, default=12)
    args = parser.parse_args()

    manifest = json.loads((args.processed / "manifest.json").read_text(encoding="utf-8"))
    numeric = np.load(args.processed / "fingerprints.npz")
    fingerprints = numeric["fingerprints"]
    contours = numeric["contours"] if "contours" in numeric.files else None
    records = manifest["records"]

    if not records:
        raise SystemExit("No processed records found.")

    indices = np.linspace(0, len(records) - 1, min(args.count, len(records)), dtype=int)
    tile_size = (300, 260)
    cols = 4
    rows = int(np.ceil(len(indices) / cols))
    sheet = Image.new("RGB", (cols * tile_size[0], rows * tile_size[1]), (238, 243, 239))

    for slot, index in enumerate(indices):
        contour = contours[int(index)] if contours is not None else None
        tile = draw_tile(args.dataset, records[int(index)], fingerprints[int(index)], tile_size, contour)
        x = (slot % cols) * tile_size[0]
        y = (slot // cols) * tile_size[1]
        sheet.paste(tile, (x, y))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(args.output, quality=92)
    print(args.output)


if __name__ == "__main__":
    main()
