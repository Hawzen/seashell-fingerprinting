#!/usr/bin/env python3
"""Build contour FFT fingerprints from shell images.

This module is intentionally organized as a pipeline, not as one large
"do everything" script.  The planned data flow is:

    dataset image
      -> image loading
      -> shell mask
      -> outer contour
      -> normalized 512-point contour
      -> 128-value FFT fingerprint
      -> PCA projection
      -> JSON payloads

The comments below are the working design.  Implementation should fill in one
section at a time so segmentation, FFT math, PCA, and serialization remain easy
to audit separately.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import gzip
import hashlib
import json
import math
import os
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import cv2
import numpy as np
from PIL import Image, ImageOps


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}
HASH_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"


# =============================================================================
# Configuration / CLI
# =============================================================================
#
# Owns:
#   - command-line arguments
#   - default sample count / harmonic count
#   - output filenames
#
# Intended command:
#
#   python3 tools/build_fft_fingerprints.py \
#     --dataset dataset \
#     --output processed_fft \
#     --samples 512 \
#     --harmonics 32 \
#     --components 12
#
# Important defaults:
#   - samples = 512 contour points
#   - harmonics = 32
#   - fingerprint_size = harmonics * 4 = 128
#


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build contour-FFT seashell fingerprints and PCA artifacts."
    )
    parser.add_argument("--dataset", type=Path, default=Path("dataset"))
    parser.add_argument("--output", type=Path, default=Path("processed_fft"))
    parser.add_argument("--max-size", type=int, default=768)
    parser.add_argument("--samples", type=int, default=512)
    parser.add_argument("--harmonics", type=int, default=32)
    parser.add_argument("--components", type=int, default=12)
    parser.add_argument("--flood-tolerance", type=int, default=28)
    parser.add_argument("--digits", type=int, default=6)
    parser.add_argument("--workers", type=int, default=0)
    parser.add_argument("--chunk-size", type=int, default=16)
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--offset", type=int, default=0)
    parser.add_argument("--progress-every", type=int, default=250)
    return parser.parse_args()


def validate_args(args: argparse.Namespace) -> None:
    if not args.dataset.exists():
        raise SystemExit(f"Dataset folder does not exist: {args.dataset}")
    if args.max_size < 128:
        raise SystemExit("--max-size must be at least 128")
    if args.samples < 64:
        raise SystemExit("--samples must be at least 64")
    if args.samples % 2 != 0:
        raise SystemExit("--samples must be even")
    if args.harmonics < 1:
        raise SystemExit("--harmonics must be positive")
    if args.harmonics >= args.samples // 2:
        raise SystemExit("--harmonics must be smaller than samples / 2")
    if args.components < 1:
        raise SystemExit("--components must be positive")
    if args.flood_tolerance < 1:
        raise SystemExit("--flood-tolerance must be positive")


# =============================================================================
# Image Discovery
# =============================================================================
#
# Owns:
#   - walking dataset/
#   - accepting image extensions
#   - stable sorted order
#
# Output:
#   list[Path]
#
# This section should not know anything about masks, FFT, PCA, hashes, or JSON.
#


def iter_image_paths(dataset_dir: Path) -> list[Path]:
    """Return all image files below dataset_dir in a deterministic order."""
    paths = [
        path
        for path in dataset_dir.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    ]
    return sorted(paths, key=lambda path: path.as_posix().lower())


def slice_paths(paths: list[Path], offset: int, limit: int) -> list[Path]:
    if offset:
        paths = paths[offset:]
    if limit:
        paths = paths[:limit]
    return paths


# =============================================================================
# Image Loading
# =============================================================================
#
# Owns:
#   - reading one image
#   - EXIF orientation
#   - RGB conversion
#   - optional resize for processing speed
#
# Output:
#   np.ndarray shaped (height, width, 3), dtype float32 or uint8
#
# This section should not segment the shell.  It only loads pixels.
#


def load_rgb_image(path: Path, max_size: int) -> tuple[np.ndarray, tuple[int, int]]:
    """Load one image as RGB uint8 and optionally shrink its long edge."""
    with Image.open(path) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        original_size = image.size
        if max(image.size) > max_size:
            image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        array = np.asarray(image, dtype=np.uint8)
    return array, original_size


# =============================================================================
# Shell Segmentation
# =============================================================================
#
# Owns:
#   - dominant background-color estimation from the border
#   - flood-fill background recovery from the outside of the image
#   - inversion into a shell mask
#   - keeping the largest connected shell component
#
# Input:
#   RGB image
#
# Output:
#   mask: bool array shaped (height, width)
#   mask_info: small dict of diagnostic numbers
#
# This section is the only place that should decide what is shell vs background.
# It should not compute contours, FFT, PCA, or hashes.
#


def border_rgb_pixels(rgb: np.ndarray, width: int = 4) -> np.ndarray:
    width = max(1, min(width, rgb.shape[0] // 2, rgb.shape[1] // 2))
    return np.concatenate(
        [
            rgb[:width, :, :].reshape(-1, 3),
            rgb[-width:, :, :].reshape(-1, 3),
            rgb[:, :width, :].reshape(-1, 3),
            rgb[:, -width:, :].reshape(-1, 3),
        ],
        axis=0,
    )


def dominant_border_color(rgb: np.ndarray, bin_size: int = 8) -> np.ndarray:
    """Find the most common coarse RGB bucket on the image border."""
    border = border_rgb_pixels(rgb)
    quantized = (border // bin_size).astype(np.int32)
    packed = quantized[:, 0] * 1024 + quantized[:, 1] * 32 + quantized[:, 2]
    values, counts = np.unique(packed, return_counts=True)
    mode = values[int(np.argmax(counts))]
    members = border[packed == mode]
    return members.mean(axis=0).astype(np.float32)


def edge_seed_points(rgb: np.ndarray, background_color: np.ndarray, tolerance: int) -> list[tuple[int, int]]:
    """Return border points that look like the dominant outside background."""
    h, w = rgb.shape[:2]
    step = max(1, min(h, w) // 160)
    candidates: list[tuple[int, int]] = []

    for x in range(0, w, step):
        candidates.append((x, 0))
        candidates.append((x, h - 1))
    for y in range(0, h, step):
        candidates.append((0, y))
        candidates.append((w - 1, y))

    limit = max(float(tolerance) * 2.0, 32.0)
    seeds = []
    for x, y in candidates:
        distance = float(np.linalg.norm(rgb[y, x].astype(np.float32) - background_color))
        if distance <= limit:
            seeds.append((x, y))

    if seeds:
        return seeds
    return [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]


def flood_background_mask(rgb: np.ndarray, tolerance: int) -> tuple[np.ndarray, np.ndarray]:
    """Photoshop-fill-bucket-style background detection from the image edge."""
    background_color = dominant_border_color(rgb)
    seeds = edge_seed_points(rgb, background_color, tolerance)

    h, w = rgb.shape[:2]
    mask = np.zeros((h + 2, w + 2), dtype=np.uint8)
    image = rgb.copy()
    flags = (
        4
        | cv2.FLOODFILL_FIXED_RANGE
        | cv2.FLOODFILL_MASK_ONLY
        | (255 << 8)
    )
    lo_diff = (tolerance, tolerance, tolerance)
    up_diff = (tolerance, tolerance, tolerance)

    for seed in seeds:
        x, y = seed
        if mask[y + 1, x + 1] != 0:
            continue
        cv2.floodFill(
            image,
            mask,
            seedPoint=(x, y),
            newVal=(0, 0, 0),
            loDiff=lo_diff,
            upDiff=up_diff,
            flags=flags,
        )

    return mask[1:-1, 1:-1].astype(bool), background_color


def fill_mask_holes(mask: np.ndarray) -> np.ndarray:
    h, w = mask.shape
    padded = np.pad(mask.astype(np.uint8), 1, constant_values=0)
    flood_mask = np.zeros((h + 4, w + 4), dtype=np.uint8)
    cv2.floodFill(padded, flood_mask, (0, 0), 1)
    outside = padded[1:-1, 1:-1].astype(bool)
    return mask | ~outside


def keep_largest_component(mask: np.ndarray) -> tuple[np.ndarray, dict[str, Any]]:
    count, labels, stats, centroids = cv2.connectedComponentsWithStats(mask.astype(np.uint8), 8)
    if count <= 1:
        raise ValueError("segmentation produced no foreground component")

    areas = stats[1:, cv2.CC_STAT_AREA]
    component_index = int(np.argmax(areas) + 1)
    component = labels == component_index
    x = int(stats[component_index, cv2.CC_STAT_LEFT])
    y = int(stats[component_index, cv2.CC_STAT_TOP])
    width = int(stats[component_index, cv2.CC_STAT_WIDTH])
    height = int(stats[component_index, cv2.CC_STAT_HEIGHT])
    center_x, center_y = centroids[component_index]

    return component, {
        "component_count": int(count - 1),
        "mask_area": int(stats[component_index, cv2.CC_STAT_AREA]),
        "bbox": [x, y, x + width - 1, y + height - 1],
        "center": [round(float(center_x), 3), round(float(center_y), 3)],
    }


def isolate_shell(rgb: np.ndarray, flood_tolerance: int) -> tuple[np.ndarray, dict[str, Any]]:
    background_mask, background_color = flood_background_mask(rgb, flood_tolerance)
    shell_mask = ~background_mask
    shell_mask, component_info = keep_largest_component(shell_mask)
    shell_mask = fill_mask_holes(shell_mask)
    shell_mask, component_info = keep_largest_component(shell_mask)

    component_info.update(
        {
            "background_color": [round(float(channel), 3) for channel in background_color.tolist()],
            "background_ratio": round(float(background_mask.mean()), 6),
            "flood_tolerance": int(flood_tolerance),
            "mask_ratio": round(float(component_info["mask_area"] / shell_mask.size), 6),
        }
    )
    return shell_mask, component_info


# =============================================================================
# Contour Extraction
# =============================================================================
#
# Owns:
#   - finding the external shell contour from the mask
#   - rejecting tiny/invalid contours
#   - preserving the contour in source image coordinates for QA only
#
# Input:
#   mask
#
# Output:
#   contour: np.ndarray shaped (n_points, 2), source image coordinates
#
# This contour is not the fingerprint.  It is the source geometry from which the
# fingerprint is derived.
#


def contour_from_mask(mask: np.ndarray) -> np.ndarray:
    contours, _hierarchy = cv2.findContours(
        mask.astype(np.uint8) * 255,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_NONE,
    )
    if not contours:
        raise ValueError("no outer contour found")

    contour = max(contours, key=cv2.contourArea)
    points = contour[:, 0, :].astype(np.float64)
    if len(points) < 8:
        raise ValueError("outer contour has too few points")
    return points


def contour_metrics(points: np.ndarray) -> dict[str, Any]:
    area = abs(float(cv2.contourArea(points.astype(np.float32))))
    perimeter = float(cv2.arcLength(points.astype(np.float32), closed=True))
    return {
        "contour_points": int(len(points)),
        "contour_area": round(area, 3),
        "contour_perimeter": round(perimeter, 3),
    }


# =============================================================================
# Contour Resampling
# =============================================================================
#
# Owns:
#   - converting an arbitrary-length contour into exactly 512 equally spaced
#     perimeter samples
#
# Input:
#   raw contour
#
# Output:
#   sampled contour shaped (512, 2)
#
# This step makes every shell comparable before normalization and FFT.
#


def resample_closed_contour(points: np.ndarray, samples: int) -> np.ndarray:
    """Sample a closed contour at equal arc-length intervals."""
    closed = np.vstack([points, points[0]])
    deltas = np.diff(closed, axis=0)
    segment_lengths = np.sqrt(np.sum(deltas * deltas, axis=1))
    perimeter = float(segment_lengths.sum())
    if perimeter <= 0:
        raise ValueError("contour perimeter is zero")

    cumulative = np.concatenate([[0.0], np.cumsum(segment_lengths)])
    targets = np.linspace(0.0, perimeter, samples, endpoint=False)
    segment_index = np.searchsorted(cumulative, targets, side="right") - 1
    segment_index = np.clip(segment_index, 0, len(segment_lengths) - 1)

    local_distance = targets - cumulative[segment_index]
    local_ratio = np.divide(
        local_distance,
        segment_lengths[segment_index],
        out=np.zeros_like(local_distance),
        where=segment_lengths[segment_index] > 0,
    )
    return closed[segment_index] + deltas[segment_index] * local_ratio[:, None]


# =============================================================================
# Contour Normalization
# =============================================================================
#
# Owns:
#   - translation normalization
#   - scale normalization
#   - rotation normalization
#   - orientation normalization
#   - start-point normalization
#
# Proposed rules:
#   - translate by contour centroid
#   - scale by RMS radius
#   - rotate by principal axis
#   - force a deterministic sign so mirrored/equivalent rotations do not flip
#   - start at topmost point after normalization
#
# Input:
#   sampled contour shaped (512, 2)
#
# Output:
#   normalized contour shaped (512, 2)
#   normalization_info diagnostics
#
# This is the most important step for PCA quality.  If normalization leaks image
# orientation, PCA will explain photo alignment instead of shell shape.
#


def signed_area_xy(points: np.ndarray) -> float:
    x = points[:, 0]
    y = points[:, 1]
    return float(0.5 * np.sum(x * np.roll(y, -1) - np.roll(x, -1) * y))


def roll_to_canonical_start(z: np.ndarray) -> np.ndarray:
    xy = np.column_stack([z.real, z.imag])
    start_index = int(np.lexsort((xy[:, 0], -xy[:, 1]))[0])
    return np.roll(z, -start_index)


def normalize_contour(points: np.ndarray) -> tuple[np.ndarray, dict[str, Any]]:
    """Remove translation, scale, rotation, winding, and start-point ambiguity."""
    z = points[:, 0].astype(np.float64) + 1j * (-points[:, 1].astype(np.float64))
    centroid = complex(np.mean(z.real), np.mean(z.imag))
    z = z - centroid

    if signed_area_xy(np.column_stack([z.real, z.imag])) < 0:
        z = z[::-1]

    covariance = np.cov(np.column_stack([z.real, z.imag]).T)
    eigenvalues, eigenvectors = np.linalg.eigh(covariance)
    axis = eigenvectors[:, int(np.argmax(eigenvalues))]
    rotation = math.atan2(float(axis[1]), float(axis[0]))
    z = z * np.exp(-1j * rotation)

    skew = float(np.mean(z.real**3))
    if skew < 0:
        z = -z
        rotation += math.pi

    scale = float(np.sqrt(np.mean(np.abs(z) ** 2)))
    if scale <= 0:
        raise ValueError("normalized contour scale is zero")

    z = roll_to_canonical_start(z / scale)
    normalized = np.column_stack([z.real, z.imag]).astype(np.float32)
    return normalized, {
        "normalization_centroid": [round(float(centroid.real), 6), round(float(-centroid.imag), 6)],
        "normalization_scale": round(scale, 6),
        "normalization_rotation_degrees": round(math.degrees(rotation), 6),
    }


# =============================================================================
# FFT Fingerprint
# =============================================================================
#
# Owns:
#   - converting normalized contour points into complex sequence z = x + i*y
#   - FFT
#   - keeping harmonics 1..32 and -1..-32
#   - flattening complex coefficients into real numbers
#
# Input:
#   normalized contour shaped (512, 2)
#
# Output:
#   fft_fingerprint shaped (128,)
#
# Layout:
#   for k in 1..32:
#     Re(Fk), Im(Fk), Re(F-k), Im(F-k)
#
# This is the primary shell fingerprint.  PCA should run on this vector.
#


def fft_fingerprint(normalized_contour: np.ndarray, harmonics: int) -> np.ndarray:
    """Encode the closed outline as positive and negative complex harmonics."""
    z = normalized_contour[:, 0].astype(np.float64) + 1j * normalized_contour[:, 1].astype(
        np.float64
    )
    coefficients = np.fft.fft(z) / len(z)

    values: list[float] = []
    for harmonic in range(1, harmonics + 1):
        positive = coefficients[harmonic]
        negative = coefficients[-harmonic]
        values.extend(
            [
                float(positive.real),
                float(positive.imag),
                float(negative.real),
                float(negative.imag),
            ]
        )
    return np.asarray(values, dtype=np.float32)


# =============================================================================
# FFT Reconstruction
# =============================================================================
#
# Owns:
#   - inverse operation for display and QA
#   - reconstructing an outline from a 128-value FFT fingerprint
#
# Input:
#   fft_fingerprint shaped (128,)
#
# Output:
#   reconstructed contour shaped (512, 2)
#
# Rule:
#   user-facing analytical outlines should come from FFT reconstruction, not
#   from raw contours.  Raw contours are only for segmentation QA.
#


def reconstruct_fft_fingerprint(fingerprint: np.ndarray, samples: int, harmonics: int) -> np.ndarray:
    """Rebuild a smooth normalized contour from a fingerprint for QA or generation."""
    coefficients = np.zeros(samples, dtype=np.complex128)
    cursor = 0
    for harmonic in range(1, harmonics + 1):
        coefficients[harmonic] = complex(float(fingerprint[cursor]), float(fingerprint[cursor + 1]))
        coefficients[-harmonic] = complex(
            float(fingerprint[cursor + 2]), float(fingerprint[cursor + 3])
        )
        cursor += 4

    z = np.fft.ifft(coefficients * samples)
    return np.column_stack([z.real, z.imag]).astype(np.float32)


# =============================================================================
# PCA
# =============================================================================
#
# Owns:
#   - building the matrix X shaped (shell_count, 128)
#   - computing mean fingerprint
#   - computing PCA components
#   - projecting each shell into PCA coordinates
#   - computing ranges / explained variance
#
# Input:
#   all fft_fingerprints
#
# Output:
#   pca_mean shaped (128,)
#   pca_components shaped (component_count, 128)
#   pca_scores shaped (shell_count, component_count)
#
# PCA should not know about image paths, masks, hashes, or JSON.
#


def compute_pca(matrix: np.ndarray, component_count: int) -> dict[str, np.ndarray]:
    """Fit PCA using SVD; rows are shells and columns are FFT dimensions."""
    if matrix.ndim != 2:
        raise ValueError("PCA input must be a 2D matrix")
    if len(matrix) < 2:
        raise ValueError("PCA requires at least two fingerprints")

    mean = matrix.mean(axis=0, dtype=np.float64)
    centered = matrix.astype(np.float64) - mean
    _u, singular_values, vh = np.linalg.svd(centered, full_matrices=False)

    max_components = min(component_count, vh.shape[0])
    components = vh[:max_components]
    scores = centered @ components.T

    variance = (singular_values**2) / max(len(matrix) - 1, 1)
    total_variance = float(variance.sum())
    if total_variance > 0:
        variance_ratio = variance / total_variance
    else:
        variance_ratio = np.zeros_like(variance)

    return {
        "mean": mean.astype(np.float32),
        "components": components.astype(np.float32),
        "scores": scores.astype(np.float32),
        "explained_variance": variance[:max_components].astype(np.float32),
        "explained_variance_ratio": variance_ratio[:max_components].astype(np.float32),
    }


def pca_ranges(scores: np.ndarray) -> list[dict[str, float]]:
    ranges = []
    for component_index in range(scores.shape[1]):
        column = scores[:, component_index]
        ranges.append(
            {
                "component": component_index + 1,
                "min": round(float(np.min(column)), 6),
                "max": round(float(np.max(column)), 6),
                "p01": round(float(np.percentile(column, 1)), 6),
                "p99": round(float(np.percentile(column, 99)), 6),
            }
        )
    return ranges


# =============================================================================
# Metadata / Labels
# =============================================================================
#
# Owns:
#   - parsing species/specimen/view from filenames
#   - image dimensions
#   - bbox / center / area
#
# Input:
#   path + mask diagnostics
#
# Output:
#   per-shell metadata dict
#
# This section should not compute shape descriptors.
#


def parse_label(relative_path: Path) -> dict[str, str]:
    """Extract practical labels from folders and common filename patterns."""
    stem = relative_path.stem
    parent = relative_path.parent.name if relative_path.parent != Path(".") else ""

    tokens = re.split(r"[_\-\s]+", stem)
    specimen = tokens[-1] if tokens else stem
    view = ""
    if tokens and re.fullmatch(r"[A-Za-z]?\d+[A-Za-z]?", tokens[-1]):
        view = tokens[-1]
        specimen = tokens[-2] if len(tokens) >= 2 else stem

    species_source = parent if parent else stem
    species = species_source.replace("_", " ").replace("-", " ").strip()
    name = species if species else stem
    return {
        "name": name,
        "species": species,
        "specimen": specimen,
        "view": view,
    }


# =============================================================================
# Fingerprint Hashes
# =============================================================================
#
# Owns:
#   - short human-facing shellprint IDs
#
# Input:
#   stable shell identity + FFT fingerprint
#
# Output:
#   e.g. "QQ9E7E"
#
# This is not the fingerprint.  It is a reference label derived from the
# fingerprint/identity so users can search and talk about a shell.
#


def base36(value: int, digits: int) -> str:
    characters = []
    for _ in range(digits):
        value, remainder = divmod(value, len(HASH_ALPHABET))
        characters.append(HASH_ALPHABET[remainder])
    return "".join(reversed(characters))


def fingerprint_hash(relative_path: Path, fingerprint: np.ndarray, digits: int) -> str:
    digest = hashlib.blake2s(digest_size=8)
    digest.update(relative_path.as_posix().encode("utf-8"))
    digest.update(np.asarray(fingerprint, dtype="<f4").tobytes())
    return base36(int.from_bytes(digest.digest(), "big"), digits)


# =============================================================================
# Serialization
# =============================================================================
#
# Owns:
#   - writing model.json
#   - writing shells.json.gz
#   - writing errors.json
#
# Proposed output:
#
#   processed_fft/model.json
#   processed_fft/shells.json.gz
#   processed_fft/errors.json
#
# model.json:
#   global FFT/PCA model message:
#     fingerprint_type
#     samples
#     harmonics
#     pca_mean
#     pca_components
#     pca_explained_variance_ratio
#     pca_ranges
#
# shells.json.gz:
#   per-shell records:
#     id
#     file
#     species
#     specimen
#     view
#     bbox
#     area
#     center
#     fingerprint_hash
#     fft_fingerprint
#     pca_scores
#
# errors.json:
#   files that failed segmentation/fingerprint extraction.
#


def round_float(value: float, digits: int = 6) -> float:
    return round(float(value), digits)


def round_array(values: np.ndarray, digits: int = 6) -> list[float]:
    return [round_float(value, digits) for value in values.tolist()]


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")


def write_gzip_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    encoded = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    with gzip.GzipFile(filename="", mode="wb", fileobj=path.open("wb"), mtime=0) as handle:
        handle.write(encoded)


# =============================================================================
# Orchestration
# =============================================================================
#
# Owns:
#   - connecting the sections above
#   - multiprocessing over images
#   - progress logging
#   - failing cleanly if nothing can be processed
#
# This should remain thin.  If it grows large, the logic probably belongs in one
# of the sections above.
#


def process_image_job(job: tuple[Path, Path, int, int, int, int]) -> dict[str, Any]:
    dataset_dir, path, max_size, samples, harmonics, flood_tolerance = job
    relative_path = path.relative_to(dataset_dir)

    try:
        rgb, original_size = load_rgb_image(path, max_size=max_size)
        mask, mask_info = isolate_shell(rgb, flood_tolerance=flood_tolerance)
        contour = contour_from_mask(mask)
        sampled = resample_closed_contour(contour, samples=samples)
        normalized, normalization_info = normalize_contour(sampled)
        fingerprint = fft_fingerprint(normalized, harmonics=harmonics)

        processing_height, processing_width = rgb.shape[:2]
        record = {
            "file": relative_path.as_posix(),
            "original_width": int(original_size[0]),
            "original_height": int(original_size[1]),
            "processing_width": int(processing_width),
            "processing_height": int(processing_height),
            **parse_label(relative_path),
            **mask_info,
            **contour_metrics(contour),
            **normalization_info,
        }
        return {
            "ok": True,
            "file": relative_path.as_posix(),
            "record": record,
            "fingerprint": fingerprint,
        }
    except Exception as exc:  # noqa: BLE001 - batch jobs should report per-file failures.
        return {
            "ok": False,
            "file": relative_path.as_posix(),
            "error": f"{type(exc).__name__}: {exc}",
        }


def process_images(
    dataset_dir: Path,
    paths: list[Path],
    max_size: int,
    samples: int,
    harmonics: int,
    flood_tolerance: int,
    workers: int,
    chunk_size: int,
    progress_every: int,
) -> tuple[list[dict[str, Any]], list[dict[str, str]]]:
    jobs = [
        (dataset_dir, path, max_size, samples, harmonics, flood_tolerance)
        for path in paths
    ]
    records: list[dict[str, Any]] = []
    errors: list[dict[str, str]] = []
    started = time.perf_counter()

    def collect(index: int, result: dict[str, Any]) -> None:
        if result["ok"]:
            records.append(result)
        else:
            errors.append({"file": result["file"], "error": result["error"]})

        if progress_every and (index % progress_every == 0 or index == len(jobs)):
            elapsed = max(time.perf_counter() - started, 1e-6)
            rate = index / elapsed
            print(
                f"processed {index}/{len(jobs)} images "
                f"({len(records)} ok, {len(errors)} errors, {rate:.1f}/s)",
                flush=True,
            )

    if workers == 1:
        for index, job in enumerate(jobs, start=1):
            collect(index, process_image_job(job))
    else:
        if workers <= 0:
            workers = max(1, (os.cpu_count() or 2) - 1)
        with concurrent.futures.ProcessPoolExecutor(max_workers=workers) as executor:
            iterator = executor.map(process_image_job, jobs, chunksize=max(1, chunk_size))
            for index, result in enumerate(iterator, start=1):
                collect(index, result)

    return records, errors


def build_payloads(
    args: argparse.Namespace,
    all_paths: list[Path],
    selected_paths: list[Path],
    processed_results: list[dict[str, Any]],
    errors: list[dict[str, str]],
) -> tuple[dict[str, Any], dict[str, Any], dict[str, Any]]:
    fingerprints = np.vstack([result["fingerprint"] for result in processed_results]).astype(np.float32)
    pca = compute_pca(fingerprints, component_count=args.components)
    scores = pca["scores"]

    records = []
    for index, result in enumerate(processed_results):
        record = dict(result["record"])
        fingerprint = result["fingerprint"]
        short_hash = fingerprint_hash(Path(record["file"]), fingerprint, args.digits)
        record["id"] = index
        record["fingerprint_hash"] = short_hash
        record["shellprint"] = short_hash
        record["fft_fingerprint"] = round_array(fingerprint)
        record["pca_scores"] = round_array(scores[index])
        records.append(record)

    generated_at = datetime.now(timezone.utc).isoformat()
    model = {
        "version": 1,
        "generated_at": generated_at,
        "fingerprint_type": "contour_fft_v1",
        "shell_file": "shells.json.gz",
        "errors_file": "errors.json",
        "dataset": args.dataset.as_posix(),
        "image_count": len(all_paths),
        "processed_image_offset": int(args.offset),
        "processed_image_count": len(selected_paths),
        "processed_count": len(records),
        "error_count": len(errors),
        "max_size": int(args.max_size),
        "flood_tolerance": int(args.flood_tolerance),
        "contour_samples": int(args.samples),
        "harmonics": int(args.harmonics),
        "fingerprint_size": int(fingerprints.shape[1]),
        "pca_component_count": int(pca["components"].shape[0]),
        "normalization": {
            "translation": "centroid centered",
            "scale": "unit root-mean-square radius",
            "rotation": "principal-axis aligned",
            "orientation": "consistent contour winding",
            "start_point": "rolled to topmost normalized contour point",
            "coordinate_system": "x right, y up",
        },
        "fingerprint_layout": (
            "for harmonic k=1..K: Re(F[k]), Im(F[k]), Re(F[-k]), Im(F[-k])"
        ),
        "pca_mean": round_array(pca["mean"]),
        "pca_components": [round_array(row) for row in pca["components"]],
        "pca_explained_variance": round_array(pca["explained_variance"]),
        "pca_explained_variance_ratio": round_array(pca["explained_variance_ratio"]),
        "pca_ranges": pca_ranges(scores),
    }
    shells = {
        "encoding": "shell-fft-pack-v1",
        "fingerprint_type": model["fingerprint_type"],
        "records": records,
    }
    error_payload = {
        "generated_at": generated_at,
        "error_count": len(errors),
        "errors": errors,
    }
    return model, shells, error_payload


def build(args: argparse.Namespace) -> None:
    validate_args(args)
    all_paths = iter_image_paths(args.dataset)
    selected_paths = slice_paths(all_paths, offset=args.offset, limit=args.limit)
    if not selected_paths:
        raise SystemExit("No images found to process")

    print(f"found {len(all_paths)} images; processing {len(selected_paths)}", flush=True)
    processed_results, errors = process_images(
        dataset_dir=args.dataset,
        paths=selected_paths,
        max_size=args.max_size,
        samples=args.samples,
        harmonics=args.harmonics,
        flood_tolerance=args.flood_tolerance,
        workers=args.workers,
        chunk_size=args.chunk_size,
        progress_every=args.progress_every,
    )

    if len(processed_results) < 2:
        raise SystemExit(f"Need at least two valid fingerprints for PCA; got {len(processed_results)}")

    model, shells, error_payload = build_payloads(
        args=args,
        all_paths=all_paths,
        selected_paths=selected_paths,
        processed_results=processed_results,
        errors=errors,
    )

    write_json(args.output / "model.json", model)
    write_gzip_json(args.output / "shells.json.gz", shells)
    write_json(args.output / "errors.json", error_payload)

    print(
        f"wrote {len(shells['records'])} shells, {len(errors)} errors to {args.output.as_posix()}",
        flush=True,
    )


if __name__ == "__main__":
    build(parse_args())
