#!/usr/bin/env python3
"""Render a visual audit sheet for contour-FFT fingerprints."""

from __future__ import annotations

import argparse
import gzip
import json
import random
import textwrap
from pathlib import Path
from typing import Any

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps

from build_fft_fingerprints import (
    contour_from_mask,
    isolate_shell,
    load_rgb_image,
    reconstruct_fft_fingerprint,
)


PAPER = (247, 245, 239)
INK = (30, 31, 29)
MUTED = (109, 104, 96)
ACCENT = (196, 66, 52)
SHELL_FILL = (232, 219, 198)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create a contact-sheet audit image for FFT shell fingerprints."
    )
    parser.add_argument("--dataset", type=Path, default=Path("dataset"))
    parser.add_argument("--processed", type=Path, default=Path("processed_fft"))
    parser.add_argument("--output", type=Path, default=Path("processed_fft/audit_contact_sheet.jpg"))
    parser.add_argument("--samples", type=int, default=48)
    parser.add_argument("--seed", type=int, default=17)
    parser.add_argument("--columns", type=int, default=2)
    parser.add_argument("--tile", type=int, default=150)
    parser.add_argument(
        "--include",
        nargs="*",
        default=[],
        help="Optional ids, shellprints, filenames, or filename fragments to force into the sheet.",
    )
    return parser.parse_args()


def load_payloads(processed_dir: Path) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    with (processed_dir / "model.json").open("r", encoding="utf-8") as handle:
        model = json.load(handle)
    with gzip.open(processed_dir / "shells.json.gz", "rt", encoding="utf-8") as handle:
        shells = json.load(handle)["records"]
    return model, shells


def select_records(
    records: list[dict[str, Any]],
    sample_count: int,
    seed: int,
    includes: list[str],
) -> list[dict[str, Any]]:
    selected: list[dict[str, Any]] = []
    seen: set[int] = set()

    def add(record: dict[str, Any]) -> None:
        record_id = int(record["id"])
        if record_id not in seen:
            selected.append(record)
            seen.add(record_id)

    for query in includes:
        lowered = query.lower()
        for record in records:
            if (
                str(record.get("id", "")) == query
                or str(record.get("shellprint", "")).lower() == lowered
                or lowered in str(record.get("file", "")).lower()
            ):
                add(record)
                break

    remaining = [record for record in records if int(record["id"]) not in seen]
    rng = random.Random(seed)
    rng.shuffle(remaining)
    for record in remaining[: max(0, sample_count - len(selected))]:
        add(record)
    return selected[:sample_count]


def padded_bbox_from_mask(mask: np.ndarray, pad_ratio: float = 0.12) -> tuple[int, int, int, int]:
    ys, xs = np.nonzero(mask)
    if len(xs) == 0:
        return (0, 0, mask.shape[1] - 1, mask.shape[0] - 1)

    x0 = int(xs.min())
    x1 = int(xs.max())
    y0 = int(ys.min())
    y1 = int(ys.max())
    pad = int(max(x1 - x0 + 1, y1 - y0 + 1) * pad_ratio)
    return (
        max(0, x0 - pad),
        max(0, y0 - pad),
        min(mask.shape[1] - 1, x1 + pad),
        min(mask.shape[0] - 1, y1 + pad),
    )


def fit_panel(image: Image.Image, tile_size: int, background: tuple[int, int, int]) -> Image.Image:
    panel = Image.new("RGB", (tile_size, tile_size), background)
    fitted = ImageOps.contain(image.convert("RGB"), (tile_size, tile_size), Image.Resampling.LANCZOS)
    x = (tile_size - fitted.width) // 2
    y = (tile_size - fitted.height) // 2
    panel.paste(fitted, (x, y))
    return panel


def crop_arrays(
    rgb: np.ndarray,
    mask: np.ndarray,
    bbox: tuple[int, int, int, int],
) -> tuple[np.ndarray, np.ndarray]:
    x0, y0, x1, y1 = bbox
    return rgb[y0 : y1 + 1, x0 : x1 + 1], mask[y0 : y1 + 1, x0 : x1 + 1]


def original_panel(rgb: np.ndarray, mask: np.ndarray, tile_size: int) -> Image.Image:
    crop_rgb, _crop_mask = crop_arrays(rgb, mask, padded_bbox_from_mask(mask))
    return fit_panel(Image.fromarray(crop_rgb), tile_size, background=(8, 8, 8))


def contour_panel(
    rgb: np.ndarray,
    mask: np.ndarray,
    contour: np.ndarray,
    tile_size: int,
) -> Image.Image:
    bbox = padded_bbox_from_mask(mask)
    x0, y0, _x1, _y1 = bbox
    crop_rgb, crop_mask = crop_arrays(rgb, mask, bbox)

    overlay = crop_rgb.astype(np.float32)
    overlay[~crop_mask] = np.array(PAPER, dtype=np.float32)
    overlay[crop_mask] = overlay[crop_mask] * 0.82 + np.array((72, 138, 176), dtype=np.float32) * 0.18
    overlay = np.clip(overlay, 0, 255).astype(np.uint8)

    shifted = contour.astype(np.int32).copy()
    shifted[:, 0] -= x0
    shifted[:, 1] -= y0
    cv2.polylines(
        overlay,
        [shifted.reshape(-1, 1, 2)],
        isClosed=True,
        color=ACCENT,
        thickness=max(1, int(round(max(crop_rgb.shape[:2]) / 90))),
        lineType=cv2.LINE_AA,
    )
    return fit_panel(Image.fromarray(overlay), tile_size, background=PAPER)


def fft_panel(fingerprint: list[float], samples: int, harmonics: int, tile_size: int) -> Image.Image:
    outline = reconstruct_fft_fingerprint(
        np.asarray(fingerprint, dtype=np.float32),
        samples=samples,
        harmonics=harmonics,
    )
    extent = float(np.max(np.abs(outline)))
    if extent <= 0:
        extent = 1.0

    scale = tile_size * 0.41 / extent
    center = np.array([tile_size / 2, tile_size / 2], dtype=np.float32)
    points = outline.copy()
    points[:, 1] *= -1
    points = points * scale + center
    tuples = [(float(x), float(y)) for x, y in points]

    panel = Image.new("RGB", (tile_size, tile_size), PAPER)
    draw = ImageDraw.Draw(panel)
    draw.polygon(tuples, fill=SHELL_FILL)
    draw.line(tuples + [tuples[0]], fill=INK, width=max(2, tile_size // 75), joint="curve")
    return panel


def text_font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(path.as_posix(), size)
    return ImageFont.load_default()


def draw_label(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, font: ImageFont.ImageFont) -> None:
    draw.text(xy, text, fill=INK, font=font)


def make_card(
    record: dict[str, Any],
    dataset_dir: Path,
    model: dict[str, Any],
    tile_size: int,
) -> Image.Image:
    rgb, _original_size = load_rgb_image(dataset_dir / record["file"], int(model["max_size"]))
    mask, _mask_info = isolate_shell(rgb, int(model["flood_tolerance"]))
    contour = contour_from_mask(mask)

    gap = 8
    label_height = 52
    card_width = tile_size * 3 + gap * 2
    card_height = label_height + tile_size + 24
    card = Image.new("RGB", (card_width, card_height), PAPER)
    draw = ImageDraw.Draw(card)

    title_font = text_font(14, bold=True)
    small_font = text_font(11)

    title = Path(record["file"]).name
    title = textwrap.shorten(title, width=48, placeholder="...")
    draw_label(draw, (0, 0), title, title_font)
    draw.text(
        (0, 21),
        f"{record.get('shellprint', '')}  PC1 {record['pca_scores'][0]:.3f}  PC2 {record['pca_scores'][1]:.3f}",
        fill=MUTED,
        font=small_font,
    )

    panels = [
        ("original", original_panel(rgb, mask, tile_size)),
        ("mask + contour", contour_panel(rgb, mask, contour, tile_size)),
        ("FFT outline", fft_panel(record["fft_fingerprint"], int(model["contour_samples"]), int(model["harmonics"]), tile_size)),
    ]

    y = label_height
    for index, (label, panel) in enumerate(panels):
        x = index * (tile_size + gap)
        card.paste(panel, (x, y))
        draw.text((x, y + tile_size + 5), label, fill=MUTED, font=small_font)

    return card


def make_contact_sheet(
    records: list[dict[str, Any]],
    dataset_dir: Path,
    model: dict[str, Any],
    columns: int,
    tile_size: int,
) -> Image.Image:
    cards = [make_card(record, dataset_dir, model, tile_size) for record in records]
    if not cards:
        raise SystemExit("No records selected for audit sheet")

    columns = max(1, columns)
    gap = 18
    header_height = 62
    card_width, card_height = cards[0].size
    rows = int(np.ceil(len(cards) / columns))
    width = columns * card_width + (columns - 1) * gap
    height = header_height + rows * card_height + max(0, rows - 1) * gap

    sheet = Image.new("RGB", (width, height), PAPER)
    draw = ImageDraw.Draw(sheet)
    draw.text((0, 0), "Shellspace FFT Fingerprint Audit", fill=INK, font=text_font(22, bold=True))
    draw.text(
        (0, 32),
        f"{len(records)} samples | original, recovered mask/contour, reconstructed 128-value FFT outline",
        fill=MUTED,
        font=text_font(13),
    )

    for index, card in enumerate(cards):
        row = index // columns
        column = index % columns
        x = column * (card_width + gap)
        y = header_height + row * (card_height + gap)
        sheet.paste(card, (x, y))
    return sheet


def main() -> None:
    args = parse_args()
    model, records = load_payloads(args.processed)
    selected = select_records(records, args.samples, args.seed, args.include)
    sheet = make_contact_sheet(selected, args.dataset, model, args.columns, args.tile)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(args.output, quality=92)
    print(f"wrote {len(selected)}-sample audit sheet to {args.output}")


if __name__ == "__main__":
    main()
