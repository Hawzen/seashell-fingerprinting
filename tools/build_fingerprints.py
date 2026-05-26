#!/usr/bin/env python3
"""Build contour fingerprints and aligned-contour PCA scores."""

from __future__ import annotations

import argparse
from concurrent.futures import ProcessPoolExecutor
import hashlib
import json
import os
from io import BytesIO
from pathlib import Path
from typing import Any, TypeAlias

import cv2
import numpy as np
from PIL import Image, ImageOps
from rembg import new_session, remove

from enrich import write_enrichment


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}
MAX_IMAGE_PIXELS = 100_000_000
REMBG_MODEL = "u2netp"
REFERENCE_SAMPLES = 256
CONTOUR_CACHE_VERSION = "2"
CONTOUR_CACHE_DIR = Path(".cache/shell-contours")
REFERENCE_MEAN_CONTOUR = Path(__file__).with_name("reference_mean_contour.f32")
_SESSION: Any | None = None

Shell: TypeAlias = np.ndarray
Fingerprint: TypeAlias = np.ndarray


def image_paths(dataset: Path) -> list[Path]:
    return sorted(
        (
            path
            for path in dataset.rglob("*_A.jpg")
            if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
        ),
        key=lambda path: path.as_posix().lower(),
    )


def fingerprint_file(job: tuple[Path, int]) -> tuple[str, Shell]:
    path, samples = job
    shell = load_shell(path, samples)
    return path.name, shell


def load_shell(path: Path, samples: int, debug_info: bool = False) -> Shell | tuple[Shell, dict[str, Any]]:
    # Contour cache
    cache_path = None
    if not debug_info:
        stat = path.stat()
        key = hashlib.sha256(
            "\0".join(
                [
                    str(path.resolve()),
                    str(stat.st_mtime_ns),
                    str(stat.st_size),
                    str(samples),
                    REMBG_MODEL,
                    CONTOUR_CACHE_VERSION,
                ]
            ).encode("utf-8")
        ).hexdigest()
        cache_path = CONTOUR_CACHE_DIR / f"{key}.f32"
        if cache_path.exists():
            shell = np.fromfile(cache_path, dtype="<f4")
            if shell.size == samples * 2:
                return shell.reshape(samples, 2).astype(np.float32)
            cache_path.unlink()

    global _SESSION
    if _SESSION is None:
        _SESSION = new_session(REMBG_MODEL)

    # Image mask
    with Image.open(path) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        width, height = image.size
        if width * height > MAX_IMAGE_PIXELS:
            raise ValueError(f"image is too large: {width}x{height}")
        rgb = np.asarray(image, dtype=np.uint8) if debug_info else None
        mask = remove(image, only_mask=True, session=_SESSION)

    if isinstance(mask, bytes):
        mask = Image.open(BytesIO(mask))

    mask_array = np.asarray(mask, dtype=np.uint8)
    if mask_array.ndim == 3:
        mask_array = mask_array[:, :, 0]
    mask_array = mask_array > 0

    # Crop foreground
    ys, xs = np.nonzero(mask_array)
    if len(xs) == 0:
        raise ValueError("no shell foreground found")

    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    crop = mask_array[y0:y1, x0:x1]
    crop_rgb = rgb[y0:y1, x0:x1] if rgb is not None else None

    # Square canvas
    side = max(crop.shape)
    canvas = np.zeros((side, side), dtype=bool)
    canvas_rgb = np.full((side, side, 3), 255, dtype=np.uint8) if crop_rgb is not None else None
    y = (side - crop.shape[0]) // 2
    x = (side - crop.shape[1]) // 2
    canvas[y : y + crop.shape[0], x : x + crop.shape[1]] = crop
    if canvas_rgb is not None and crop_rgb is not None:
        canvas_rgb[y : y + crop.shape[0], x : x + crop.shape[1]] = crop_rgb

    # Extract contour
    found, _ = cv2.findContours(canvas.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    if not found:
        raise ValueError("no shell contour found")

    points = max(found, key=cv2.contourArea).reshape(-1, 2).astype(np.float32)
    if len(points) < 3:
        raise ValueError("shell contour is too small")

    # Resample points
    closed = np.vstack([points, points[0]])
    segment_lengths = np.linalg.norm(np.diff(closed, axis=0), axis=1)
    distance = np.concatenate([[0.0], np.cumsum(segment_lengths)])
    perimeter = distance[-1]
    if perimeter <= 0:
        raise ValueError("shell contour has zero perimeter")

    positions = np.linspace(0, perimeter, samples, endpoint=False)
    x = np.interp(positions, distance, closed[:, 0])
    y = np.interp(positions, distance, closed[:, 1])
    points = np.column_stack([x, y]).astype(np.float32)

    # Center and rotate
    center = points.mean(axis=0)
    points -= center.reshape(1, 2)
    covariance = np.cov(points.T)
    values, vectors = np.linalg.eigh(covariance)
    axis = vectors[:, int(np.argmax(values))]
    angle = np.arctan2(axis[1], axis[0])
    cos_a = float(np.cos(-angle))
    sin_a = float(np.sin(-angle))
    rotation = np.array([[cos_a, -sin_a], [sin_a, cos_a]], dtype=np.float32)
    points = points @ rotation.T

    # Normalize scale
    scale = float(np.sqrt(np.mean(np.sum(points * points, axis=1))))
    if scale <= 0:
        raise ValueError("shell contour has zero scale")
    points /= scale

    # Normalize winding
    area = 0.5 * float(
        np.sum(points[:, 0] * np.roll(points[:, 1], -1) - np.roll(points[:, 0], -1) * points[:, 1])
    )
    if area < 0:
        points = points[::-1]

    # Start point
    start = int(np.lexsort((points[:, 0], -points[:, 1]))[0])
    shell = np.roll(points, -start, axis=0).astype(np.float32)
    if not debug_info:
        if cache_path is not None:
            tmp_path = cache_path.with_name(f"{cache_path.name}.{os.getpid()}.tmp")
            shell.astype("<f4", copy=False).tofile(tmp_path)
            os.replace(tmp_path, cache_path)
        return shell

    # Debug output
    image_to_shell = np.eye(3, dtype=np.float32)
    image_to_shell[:2, :2] = rotation / scale
    image_to_shell[:2, 2] = -(rotation @ center.astype(np.float32)) / scale
    rgba = np.dstack([canvas_rgb, canvas.astype(np.uint8) * 255])
    return shell, {"image": rgba, "image_to_shell": image_to_shell}


def fft(shell: Shell, harmonics: int) -> Fingerprint:
    z = shell[:, 0].astype(np.float32) + 1j * shell[:, 1].astype(np.float32)
    spectrum = np.fft.fft(z) / len(z)
    values: list[float] = []
    for harmonic in range(1, harmonics + 1):
        pos = spectrum[harmonic]
        neg = spectrum[-harmonic]
        values.extend([pos.real, pos.imag, neg.real, neg.imag])
    return np.asarray(values, dtype=np.float32)


def reconstruct_shell(fingerprint: Fingerprint, samples: int = REFERENCE_SAMPLES) -> Shell:
    harmonics = len(fingerprint) // 4
    t = np.linspace(0.0, 1.0, samples, endpoint=False, dtype=np.float32)
    points = np.zeros(samples, dtype=np.complex64)
    for index in range(harmonics):
        harmonic = index + 1
        offset = index * 4
        c_pos = fingerprint[offset] + 1j * fingerprint[offset + 1]
        c_neg = fingerprint[offset + 2] + 1j * fingerprint[offset + 3]
        points += c_pos * np.exp(2j * np.pi * harmonic * t)
        points += c_neg * np.exp(-2j * np.pi * harmonic * t)

    return np.column_stack([points.real, points.imag]).astype(np.float32)


def pca(fingerprints: np.ndarray, components: int) -> dict[str, np.ndarray]:
    matrix = fingerprints.astype(np.float64)
    mean = matrix.mean(axis=0)
    centered = matrix - mean
    u, singular, vt = np.linalg.svd(centered, full_matrices=False)
    count = min(components, len(vt))
    vectors = vt[:count]
    scores = u[:, :count] * singular[:count]
    return {
        "mean": mean.astype(np.float32),
        "components": vectors.astype(np.float32),
        "scores": scores.astype(np.float32),
    }


def write_outputs(
    output: Path,
    model: dict[str, Any],
    file_names: list[str],
    fingerprints: np.ndarray,
    pca_scores: np.ndarray,
) -> None:
    def clean(value: Any) -> Any:
        if isinstance(value, np.ndarray):
            return clean(value.tolist())
        if isinstance(value, np.generic):
            return value.item()
        if isinstance(value, float):
            return round(value, 6)
        if isinstance(value, list):
            return [clean(item) for item in value]
        if isinstance(value, dict):
            return {key: clean(item) for key, item in value.items()}
        return value

    output.mkdir(parents=True, exist_ok=True)
    (output / "pca_model.json").write_text(json.dumps(clean(model), separators=(",", ":")), encoding="utf-8")
    fingerprints.astype("<f4", copy=False).tofile(output / "fingerprints.f32")
    pca_scores.astype("<f4", copy=False).tofile(output / "pca.f32")
    (output / "files.json").write_text(json.dumps(file_names, separators=(",", ":")), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=Path("dataset"))
    parser.add_argument("--output", type=Path, default=Path("processed_fft"))
    parser.add_argument("--samples", type=int, default=256)
    parser.add_argument("--harmonics", type=int, default=32)
    parser.add_argument("--components", type=int, default=12)
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--workers", type=int, default=1)
    parser.add_argument("--enrichment", type=Path, default=Path("dataset_enrichment/enriched_preview.tsv"))
    parser.add_argument("--skip-enrichment", action="store_true")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.samples != REFERENCE_SAMPLES:
        raise SystemExit(f"{REFERENCE_MEAN_CONTOUR} requires --samples {REFERENCE_SAMPLES}")

    # Input files
    paths = image_paths(args.dataset)
    if args.limit:
        paths = paths[: args.limit]
    if not paths:
        raise SystemExit(f"no images found in {args.dataset}")

    # Shell contours
    CONTOUR_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    file_names: list[str] = []
    shells: list[Shell] = []

    jobs = [(path, args.samples) for path in paths]
    if args.workers <= 1:
        for file_name, shell in map(fingerprint_file, jobs):
            file_names.append(file_name)
            shells.append(shell)
    else:
        with ProcessPoolExecutor(max_workers=args.workers) as executor:
            for file_name, shell in executor.map(fingerprint_file, jobs):
                file_names.append(file_name)
                shells.append(shell)

    if len(shells) < 2:
        raise SystemExit(f"need at least two usable shells, got {len(shells)}")

    # Align contours
    shell_matrix = np.stack(shells).astype(np.float32)
    template = np.fromfile(REFERENCE_MEAN_CONTOUR, dtype="<f4")
    if template.size != REFERENCE_SAMPLES * 2:
        raise SystemExit(f"invalid reference contour: {REFERENCE_MEAN_CONTOUR}")
    template = template.reshape(args.samples, 2).astype(np.float32)
    template -= template.mean(axis=0, keepdims=True)
    template /= max(float(np.sqrt(np.mean(np.sum(template * template, axis=1)))), 1e-8)
    target = template[:, 0] + 1j * template[:, 1]
    target_fft = np.fft.fft(target)

    aligned_shells: list[Shell] = []
    for shell in shell_matrix:
        shell = shell - shell.mean(axis=0, keepdims=True)
        shell /= max(float(np.sqrt(np.mean(np.sum(shell * shell, axis=1)))), 1e-8)
        best_score = -1.0
        best_aligned = shell
        for candidate in (shell, shell[::-1].copy()):
            candidate_complex = candidate[:, 0] + 1j * candidate[:, 1]
            correlations = np.fft.ifft(target_fft * np.conj(np.fft.fft(candidate_complex)))
            shift = int(np.argmax(np.abs(correlations)))
            correlation = correlations[shift]
            score = float(abs(correlation))
            if score <= best_score:
                continue
            rotation = correlation / max(score, 1e-8)
            shifted = np.roll(candidate_complex, shift)
            aligned = shifted * rotation
            best_score = score
            best_aligned = np.column_stack([aligned.real, aligned.imag]).astype(np.float32)
        best_aligned -= best_aligned.mean(axis=0, keepdims=True)
        best_aligned /= max(float(np.sqrt(np.mean(np.sum(best_aligned * best_aligned, axis=1)))), 1e-8)
        aligned_shells.append(best_aligned)
    shell_matrix = np.stack(aligned_shells).astype(np.float32)

    # FFT fingerprints
    fingerprint_matrix = np.vstack([fft(shell, args.harmonics) for shell in shell_matrix]).astype(np.float32)

    # PCA model
    pca_model = pca(fingerprint_matrix, args.components)
    pca_scores = pca_model["scores"].astype(np.float32)

    model = {
        "mean": pca_model["mean"],
        "components": pca_model["components"],
    }

    # Output pack
    write_outputs(args.output, model, file_names, fingerprint_matrix, pca_scores)
    if not args.skip_enrichment:
        write_enrichment(
            file_names,
            args.output / "enrichment.json",
            image_root=args.dataset,
            enrichment_path=args.enrichment,
            compact=True,
        )
    print(f"wrote {len(shells)} shells to {args.output}")


if __name__ == "__main__":
    main()
