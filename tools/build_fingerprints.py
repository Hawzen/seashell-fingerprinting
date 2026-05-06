#!/usr/bin/env python3
"""Build radial seashell fingerprints and a PCA model from dataset images."""

from __future__ import annotations

import argparse
import os
import json
import time
from concurrent.futures import ProcessPoolExecutor
from datetime import datetime, timezone
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

cv2.setNumThreads(1)
cv2.ocl.setUseOpenCL(False)

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}


def iter_image_paths(dataset_dir: Path) -> list[Path]:
    return sorted(
        path
        for path in dataset_dir.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )


def otsu_threshold(values: np.ndarray) -> float:
    clipped = np.clip(values, 0, 255).astype(np.uint8)
    hist = np.bincount(clipped.ravel(), minlength=256).astype(np.float64)
    total = hist.sum()
    if total == 0:
        return 0.0

    bins = np.arange(256, dtype=np.float64)
    weight_bg = np.cumsum(hist)
    weight_fg = total - weight_bg
    sum_bg = np.cumsum(hist * bins)
    sum_total = sum_bg[-1]

    valid = (weight_bg > 0) & (weight_fg > 0)
    mean_bg = np.zeros_like(bins)
    mean_fg = np.zeros_like(bins)
    mean_bg[valid] = sum_bg[valid] / weight_bg[valid]
    mean_fg[valid] = (sum_total - sum_bg[valid]) / weight_fg[valid]
    between = weight_bg * weight_fg * (mean_bg - mean_fg) ** 2
    return float(np.argmax(between))


def load_image(path: Path, max_size: int) -> np.ndarray:
    with Image.open(path) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        if max(image.size) > max_size:
            image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        return np.asarray(image, dtype=np.float32)


def border_pixels(rgb: np.ndarray) -> np.ndarray:
    height, width, _ = rgb.shape
    band = max(3, min(height, width) // 24)
    return np.concatenate(
        [
            rgb[:band, :, :].reshape(-1, 3),
            rgb[-band:, :, :].reshape(-1, 3),
            rgb[:, :band, :].reshape(-1, 3),
            rgb[:, -band:, :].reshape(-1, 3),
        ],
        axis=0,
    )


def estimate_dark_background_threshold(border_diff: np.ndarray) -> tuple[float, float]:
    """Estimate black-background noise without being fooled by shells near edges."""
    cutoff = float(np.percentile(border_diff, 55))
    background_like = border_diff[border_diff <= cutoff]
    if background_like.size < 32:
        background_like = border_diff
    background_noise = float(np.percentile(background_like, 98))
    threshold = float(np.clip(background_noise + 8.0, 8.0, 28.0))
    return threshold, background_noise


def mask_to_image(mask: np.ndarray) -> Image.Image:
    return Image.fromarray(mask.astype(np.uint8) * 255)


def erode(mask: np.ndarray, size: int = 3) -> np.ndarray:
    return np.asarray(mask_to_image(mask).filter(ImageFilter.MinFilter(size))) > 0


def dilate(mask: np.ndarray, size: int = 3) -> np.ndarray:
    return np.asarray(mask_to_image(mask).filter(ImageFilter.MaxFilter(size))) > 0


def binary_opening(mask: np.ndarray, size: int = 3) -> np.ndarray:
    return dilate(erode(mask, size), size)


def binary_closing(mask: np.ndarray, size: int = 3) -> np.ndarray:
    return erode(dilate(mask, size), size)


def binary_fill_holes(mask: np.ndarray) -> np.ndarray:
    inverse = Image.fromarray((~mask).astype(np.uint8) * 255).copy()
    pixels = inverse.load()
    width, height = inverse.size

    for x in range(width):
        if pixels[x, 0] == 255:
            ImageDraw.floodfill(inverse, (x, 0), 128, thresh=0)
        if pixels[x, height - 1] == 255:
            ImageDraw.floodfill(inverse, (x, height - 1), 128, thresh=0)
    for y in range(height):
        if pixels[0, y] == 255:
            ImageDraw.floodfill(inverse, (0, y), 128, thresh=0)
        if pixels[width - 1, y] == 255:
            ImageDraw.floodfill(inverse, (width - 1, y), 128, thresh=0)

    inverse_array = np.asarray(inverse)
    holes = inverse_array == 255
    return mask | holes


def primary_component(mask: np.ndarray) -> tuple[np.ndarray, int]:
    """Keep the largest connected foreground component."""
    labels_count, labels, stats, _ = cv2.connectedComponentsWithStats(
        mask.astype(np.uint8), connectivity=8
    )
    component_count = labels_count - 1
    if component_count <= 0:
        return mask, 0

    areas = stats[1:, cv2.CC_STAT_AREA]
    largest_label = int(np.argmax(areas)) + 1
    return labels == largest_label, component_count


def external_background(candidate: np.ndarray) -> np.ndarray:
    """Return background pixels connected to the image border."""
    image = Image.fromarray((~candidate).astype(np.uint8) * 255).copy()
    pixels = image.load()
    width, height = image.size
    step = max(1, min(width, height) // 20)
    seeds = []

    for x in range(0, width, step):
        seeds.append((x, 0))
        seeds.append((x, height - 1))
    for y in range(0, height, step):
        seeds.append((0, y))
        seeds.append((width - 1, y))
    seeds.extend(
        [
            (width - 1, 0),
            (0, height - 1),
            (width - 1, height - 1),
            (width // 2, 0),
            (width // 2, height - 1),
            (0, height // 2),
            (width - 1, height // 2),
        ]
    )

    for seed in seeds:
        if pixels[seed] == 255:
            ImageDraw.floodfill(image, seed, 128, thresh=0)

    return np.asarray(image) == 128


def isolate_shell(rgb: np.ndarray, fill_holes: bool = False) -> tuple[np.ndarray, dict[str, float]]:
    bg = np.median(border_pixels(rgb), axis=0)
    diff = np.linalg.norm(rgb - bg, axis=2)
    border_diff = np.linalg.norm(border_pixels(rgb) - bg, axis=1)
    background_level = float(np.linalg.norm(bg))
    border_noise = float(np.percentile(border_diff, 99))

    if background_level < 30.0:
        threshold, background_noise = estimate_dark_background_threshold(border_diff)
    else:
        background_noise = border_noise
        threshold = max(
            10.0,
            float(np.percentile(border_diff, 98) * 2.4),
            otsu_threshold(diff) * 0.82,
        )
    candidate = diff > threshold

    if candidate.mean() < 0.01 or candidate.mean() > 0.9:
        luma = np.dot(rgb, np.array([0.2126, 0.7152, 0.0722], dtype=np.float32))
        bg_luma = float(np.median(np.dot(border_pixels(rgb), [0.2126, 0.7152, 0.0722])))
        luma_diff = np.abs(luma - bg_luma)
        threshold = max(8.0, otsu_threshold(luma_diff) * 0.75)
        candidate = luma_diff > threshold

    candidate = binary_opening(candidate, 3)
    candidate = binary_closing(candidate, 9 if background_level < 30.0 else 5)
    if background_level < 30.0:
        mask = ~external_background(candidate)
    else:
        mask = binary_fill_holes(candidate) if fill_holes else candidate
    mask = binary_closing(mask, 5 if background_level < 30.0 else 3)
    mask, component_count = primary_component(mask)
    mask = binary_fill_holes(mask)
    mask = binary_closing(mask, 3)

    info = {
        "background_r": float(bg[0]),
        "background_g": float(bg[1]),
        "background_b": float(bg[2]),
        "background_level": background_level,
        "border_noise": border_noise,
        "background_noise": background_noise,
        "threshold": float(threshold),
        "mask_ratio": float(mask.mean()),
        "component_count": float(component_count),
    }
    return mask.astype(bool), info


def circular_median(values: np.ndarray, window: int) -> np.ndarray:
    if window <= 1:
        return values
    if window % 2 == 0:
        window += 1
    pad = window // 2
    wrapped = np.pad(values, (pad, pad), mode="wrap")
    return np.array(
        [np.median(wrapped[index : index + window]) for index in range(len(values))],
        dtype=np.float32,
    )


def circular_smooth(values: np.ndarray, window: int) -> np.ndarray:
    if window <= 1:
        return values
    if window % 2 == 0:
        window += 1
    kernel = np.ones(window, dtype=np.float32) / float(window)
    pad = window // 2
    wrapped = np.pad(values, (pad, pad), mode="wrap")
    return np.convolve(wrapped, kernel, mode="valid").astype(np.float32)


def radial_fingerprint_from_mask(
    mask: np.ndarray,
    center_x: float,
    center_y: float,
    bbox: tuple[int, int, int, int],
) -> np.ndarray:
    x0, y0, x1, y1 = bbox
    max_radius = int(
        np.ceil(
            max(
                np.hypot(center_x - x0, center_y - y0),
                np.hypot(center_x - x0, center_y - y1),
                np.hypot(center_x - x1, center_y - y0),
                np.hypot(center_x - x1, center_y - y1),
            )
        )
        + 3
    )
    distances = np.arange(max_radius + 1, dtype=np.float32)
    radians = np.deg2rad(np.arange(360, dtype=np.float32))[:, None]
    sample_x = np.rint(center_x + np.cos(radians) * distances).astype(np.int32)
    sample_y = np.rint(center_y - np.sin(radians) * distances).astype(np.int32)

    height, width = mask.shape
    in_bounds = (
        (sample_x >= 0)
        & (sample_x < width)
        & (sample_y >= 0)
        & (sample_y < height)
    )
    clipped_x = np.clip(sample_x, 0, width - 1)
    clipped_y = np.clip(sample_y, 0, height - 1)
    inside = in_bounds & mask[clipped_y, clipped_x]

    has_hit = inside.any(axis=1)
    reversed_index = np.argmax(inside[:, ::-1], axis=1)
    last_index = inside.shape[1] - 1 - reversed_index
    fingerprint = np.where(has_hit, distances[last_index], 0.0).astype(np.float32)

    missing = fingerprint <= 0
    if missing.any():
        known = np.flatnonzero(~missing)
        if len(known) < 8:
            raise ValueError("not enough angular mask samples")
        xp = np.concatenate([known - 360, known, known + 360])
        yp = np.concatenate([fingerprint[known], fingerprint[known], fingerprint[known]])
        fingerprint = np.interp(np.arange(360), xp, yp).astype(np.float32)

    return fingerprint


def resample_closed_contour(contour: np.ndarray, point_count: int) -> np.ndarray:
    points = contour.reshape(-1, 2).astype(np.float64)
    if points.shape[0] == 0:
        return np.zeros((point_count, 2), dtype=np.float32)
    if points.shape[0] == 1:
        return np.repeat(points.astype(np.float32), point_count, axis=0)

    start = int(np.lexsort((points[:, 0], points[:, 1]))[0])
    points = np.concatenate([points[start:], points[:start]], axis=0)
    closed = np.vstack([points, points[0]])
    segment_lengths = np.linalg.norm(np.diff(closed, axis=0), axis=1)
    perimeter = float(segment_lengths.sum())
    if perimeter <= 0:
        return np.repeat(points[:1].astype(np.float32), point_count, axis=0)

    cumulative = np.concatenate([[0.0], np.cumsum(segment_lengths)])
    samples = np.linspace(0.0, perimeter, point_count, endpoint=False)
    x = np.interp(samples, cumulative, closed[:, 0])
    y = np.interp(samples, cumulative, closed[:, 1])
    return np.column_stack([x, y]).astype(np.float32)


def contour_from_mask(mask: np.ndarray, point_count: int) -> np.ndarray:
    contours, _hierarchy = cv2.findContours(
        mask.astype(np.uint8) * 255,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_NONE,
    )
    if not contours:
        return np.zeros((point_count, 2), dtype=np.float32)
    return resample_closed_contour(max(contours, key=cv2.contourArea), point_count)


def locate_shell_center(
    xs: np.ndarray,
    ys: np.ndarray,
    strategy: str,
) -> tuple[float, float, tuple[int, int, int, int]]:
    x0, x1 = int(np.min(xs)), int(np.max(xs))
    y0, y1 = int(np.min(ys)), int(np.max(ys))
    bbox_center_x = (x0 + x1 + 1) / 2.0
    bbox_center_y = (y0 + y1 + 1) / 2.0
    centroid_x = float(xs.mean())
    centroid_y = float(ys.mean())

    if strategy == "centroid":
        center_x, center_y = centroid_x, centroid_y
    elif strategy == "hybrid":
        center_x = (bbox_center_x + centroid_x) / 2.0
        center_y = (bbox_center_y + centroid_y) / 2.0
    else:
        center_x, center_y = bbox_center_x, bbox_center_y

    return center_x, center_y, (x0, y0, x1, y1)


def ensure_center_on_mask(
    mask: np.ndarray,
    center_x: float,
    center_y: float,
) -> tuple[float, float, float]:
    height, width = mask.shape
    x_index = int(round(center_x))
    y_index = int(round(center_y))
    if (
        0 <= x_index < width
        and 0 <= y_index < height
        and mask[y_index, x_index]
    ):
        return center_x, center_y, 0.0

    ys, xs = np.nonzero(mask)
    if len(xs) == 0:
        return center_x, center_y, 0.0
    distances = (xs.astype(np.float32) - center_x) ** 2 + (ys.astype(np.float32) - center_y) ** 2
    nearest = int(np.argmin(distances))
    adjusted_x = float(xs[nearest])
    adjusted_y = float(ys[nearest])
    adjustment = float(np.sqrt(distances[nearest]))
    return adjusted_x, adjusted_y, adjustment


def fingerprint_from_mask(
    mask: np.ndarray,
    smooth_window: int,
    center_strategy: str,
) -> tuple[np.ndarray, dict]:
    ys, xs = np.nonzero(mask)
    if len(xs) < 16:
        raise ValueError("foreground mask is too small")

    center_x, center_y, bbox = locate_shell_center(xs, ys, center_strategy)
    center_x, center_y, center_adjustment = ensure_center_on_mask(mask, center_x, center_y)

    fingerprint = radial_fingerprint_from_mask(mask, center_x, center_y, bbox)
    fingerprint = circular_median(fingerprint, 3)
    fingerprint = circular_smooth(fingerprint, smooth_window)
    mean_radius = float(fingerprint.mean())
    if mean_radius <= 0:
        raise ValueError("mean radius is zero")
    normalized = fingerprint / mean_radius

    info = {
        "center": [round(center_x, 3), round(center_y, 3)],
        "center_method": center_strategy,
        "center_adjustment": round(center_adjustment, 3),
        "bbox": list(bbox),
        "area": int(mask.sum()),
        "mean_radius": mean_radius,
    }
    return normalized.astype(np.float32), info


def parse_label(relative_path: str) -> dict[str, str]:
    stem = Path(relative_path).stem
    parts = stem.split("_")
    view = ""
    specimen = ""
    species_parts = parts

    if len(parts) >= 3 and parts[-1].isalpha() and parts[-2].isdigit():
        view = parts[-1]
        specimen = parts[-2]
        species_parts = parts[:-2]
    elif len(parts) >= 2 and parts[-1].isdigit():
        specimen = parts[-1]
        species_parts = parts[:-1]

    species = " ".join(species_parts) if species_parts else stem
    return {
        "name": stem,
        "species": species,
        "specimen": specimen,
        "view": view,
    }


def process_image_job(job: tuple[str, str, int, int, bool, str, int]) -> dict:
    path_string, dataset_dir_string, max_size, smooth_window, fill_holes, center, contour_points = job
    dataset_dir = Path(dataset_dir_string)
    path = Path(path_string)
    relative = path.relative_to(dataset_dir).as_posix()

    try:
        rgb = load_image(path, max_size)
        mask, mask_info = isolate_shell(rgb, fill_holes=fill_holes)
        fingerprint, shape_info = fingerprint_from_mask(mask, smooth_window, center)
        contour = contour_from_mask(mask, contour_points) if contour_points else None
        label = parse_label(relative)
        record = {
            "file": relative,
            **label,
            "image_width": int(rgb.shape[1]),
            "image_height": int(rgb.shape[0]),
            **shape_info,
            **mask_info,
        }
        result = {"ok": True, "record": record, "fingerprint": fingerprint}
        if contour is not None:
            result["contour"] = contour
        return result
    except Exception as exc:  # noqa: BLE001 - keep going over imperfect datasets.
        return {"ok": False, "error": {"file": relative, "error": str(exc)}}


def compute_pca(fingerprints: np.ndarray, component_count: int) -> dict[str, np.ndarray]:
    if fingerprints.shape[0] < 2:
        raise ValueError("PCA needs at least two processed shells")

    max_components = min(component_count, fingerprints.shape[0] - 1, fingerprints.shape[1])
    x = fingerprints.astype(np.float32, copy=False)
    mean = x.mean(axis=0, dtype=np.float64).astype(np.float32)
    centered = x - mean

    covariance = (centered.T @ centered).astype(np.float64) / float(max(1, x.shape[0] - 1))
    eigenvalues, eigenvectors = np.linalg.eigh(covariance)
    order = np.argsort(eigenvalues)[::-1]
    eigenvalues = eigenvalues[order]
    eigenvectors = eigenvectors[:, order]

    components = eigenvectors[:, :max_components].T.astype(np.float32)
    scores = (centered @ components.T).astype(np.float32)
    total_variance = float(eigenvalues.sum())
    explained = eigenvalues[:max_components].astype(np.float32)
    if total_variance > 0:
        explained_ratio = (eigenvalues[:max_components] / total_variance).astype(np.float32)
    else:
        explained_ratio = np.zeros(max_components, dtype=np.float32)

    return {
        "mean": mean,
        "components": components,
        "scores": scores,
        "explained_variance": explained,
        "explained_variance_ratio": explained_ratio,
    }


def score_ranges(scores: np.ndarray) -> list[dict[str, float]]:
    ranges = []
    for column in range(scores.shape[1]):
        values = scores[:, column]
        ranges.append(
            {
                "min": float(values.min()),
                "max": float(values.max()),
                "p01": float(np.percentile(values, 1)),
                "p50": float(np.percentile(values, 50)),
                "p99": float(np.percentile(values, 99)),
            }
        )
    return ranges


def build(args: argparse.Namespace) -> None:
    dataset_dir = args.dataset.resolve()
    output_dir = args.output.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    all_paths = iter_image_paths(dataset_dir)
    paths = all_paths
    if args.offset:
        paths = paths[args.offset :]
    if args.limit:
        paths = paths[: args.limit]
    if not paths:
        raise SystemExit(f"No image files found in {dataset_dir}")

    fingerprints: list[np.ndarray] = []
    contours: list[np.ndarray] = []
    records: list[dict] = []
    errors: list[dict] = []
    started = time.time()
    total = len(paths)

    workers = args.workers
    if workers < 1:
        workers = max(1, min(8, os.cpu_count() or 1))

    jobs = [
        (
            str(path),
            str(dataset_dir),
            args.max_size,
            args.smooth_window,
            args.fill_holes,
            args.center,
            args.contour_points,
        )
        for path in paths
    ]

    result_iterable = map(process_image_job, jobs)
    executor = None
    if workers > 1:
        executor = ProcessPoolExecutor(max_workers=workers)
        result_iterable = executor.map(process_image_job, jobs, chunksize=args.chunk_size)

    print(f"Processing {total} images with {workers} worker(s)", flush=True)
    for index, result in enumerate(result_iterable, start=1):
        if result["ok"]:
            record = result["record"]
            record["id"] = len(records)
            records.append(record)
            fingerprints.append(result["fingerprint"])
            if "contour" in result:
                contours.append(result["contour"])
        else:
            errors.append(result["error"])

        if index % args.progress_every == 0 or index == total:
            elapsed = time.time() - started
            rate = index / elapsed if elapsed else 0.0
            print(
                f"{index}/{total} images scanned, {len(records)} processed, "
                f"{len(errors)} errors, {rate:.1f} images/sec",
                flush=True,
            )

    if executor is not None:
        executor.shutdown()

    if not fingerprints:
        preview = "; ".join(f"{item['file']}: {item['error']}" for item in errors[:5])
        raise SystemExit(f"No shells were processed successfully. Sample errors: {preview}")

    matrix = np.vstack(fingerprints).astype(np.float32)
    pca = compute_pca(matrix, args.components)
    scores = pca["scores"]
    ranges = score_ranges(scores)

    for record, score in zip(records, scores, strict=True):
        record["pc"] = [round(float(value), 6) for value in score]

    numeric_path = output_dir / "fingerprints.npz"
    manifest_path = output_dir / "manifest.json"
    numeric_payload = {
        "fingerprints": matrix,
        "pca_scores": scores,
        "pca_mean": pca["mean"],
        "pca_components": pca["components"],
        "explained_variance": pca["explained_variance"],
        "explained_variance_ratio": pca["explained_variance_ratio"],
    }
    if contours:
        numeric_payload["contours"] = np.stack(contours).astype(np.float32, copy=False)
    np.savez_compressed(numeric_path, **numeric_payload)

    manifest = {
        "version": 1,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "dataset_dir": str(dataset_dir),
        "image_count": len(all_paths),
        "processed_image_offset": args.offset,
        "processed_image_count": total,
        "processed_count": len(records),
        "error_count": len(errors),
        "max_size": args.max_size,
        "smooth_window": args.smooth_window,
        "fill_holes": args.fill_holes,
        "center": args.center,
        "components": int(pca["components"].shape[0]),
        "contour_points": args.contour_points,
        "explained_variance_ratio": [
            round(float(value), 8) for value in pca["explained_variance_ratio"]
        ],
        "pca_ranges": ranges,
        "records": records,
        "errors": errors,
    }
    manifest_path.write_text(json.dumps(manifest, separators=(",", ":")), encoding="utf-8")

    elapsed = time.time() - started
    print(f"Wrote {manifest_path}")
    print(f"Wrote {numeric_path}")
    print(f"Processed {len(records)} shells in {elapsed:.1f}s")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=Path("dataset"))
    parser.add_argument("--output", type=Path, default=Path("processed"))
    parser.add_argument(
        "--max-size",
        type=int,
        default=400,
        help="Resize longest image edge to this size before processing.",
    )
    parser.add_argument(
        "--smooth-window",
        type=int,
        default=5,
        help="Circular smoothing window for the 360-radius fingerprint.",
    )
    parser.add_argument("--components", type=int, default=12)
    parser.add_argument(
        "--center",
        choices=("bbox", "centroid", "hybrid"),
        default="centroid",
        help="How to locate the shell center before radial sampling.",
    )
    parser.add_argument(
        "--fill-holes",
        action="store_true",
        help="Fill non-external background holes before contouring.",
    )
    parser.add_argument("--limit", type=int, default=0, help="Only process the first N images.")
    parser.add_argument("--offset", type=int, default=0, help="Skip the first N sorted images.")
    parser.add_argument("--progress-every", type=int, default=250)
    parser.add_argument("--workers", type=int, default=0, help="Parallel workers, default: auto.")
    parser.add_argument("--chunk-size", type=int, default=32)
    parser.add_argument(
        "--contour-points",
        type=int,
        default=256,
        help="Number of resampled points stored for each exact outer contour.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    build(parse_args())
