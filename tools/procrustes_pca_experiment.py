#!/usr/bin/env python3
"""Experiment with PCA on Procrustes-aligned shell contours.

This does not overwrite the app's active data. It reads the current FFT
fingerprints, reconstructs contours, optionally aligns contour start/rotation/
scale to a shared template, then writes experimental PCA outputs under tmp/.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from shutil import copy2

import numpy as np


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DATA = ROOT / "public" / "data"
DEFAULT_OUT = ROOT / "tmp" / "procrustes_pca"
DEFAULT_BACKUP = ROOT / "tmp" / "fft_pca_backup"


def reconstruct_contour(fingerprint: np.ndarray, samples: int = 256) -> np.ndarray:
    harmonics = len(fingerprint) // 4
    t = np.linspace(0.0, 1.0, samples, endpoint=False, dtype=np.float32)
    points = np.zeros(samples, dtype=np.complex64)
    for index in range(harmonics):
        harmonic = index + 1
        offset = index * 4
        pos = fingerprint[offset] + 1j * fingerprint[offset + 1]
        neg = fingerprint[offset + 2] + 1j * fingerprint[offset + 3]
        points += pos * np.exp(2j * np.pi * harmonic * t)
        points += neg * np.exp(-2j * np.pi * harmonic * t)
    return np.column_stack([points.real, points.imag]).astype(np.float32)


def normalize(contour: np.ndarray) -> np.ndarray:
    contour = contour - contour.mean(axis=0, keepdims=True)
    scale = float(np.sqrt(np.mean(np.sum(contour * contour, axis=1))))
    return (contour / max(scale, 1e-8)).astype(np.float32)


def rotate_to_template(source: np.ndarray, template: np.ndarray) -> np.ndarray:
    matrix = source.T @ template
    u, _, vt = np.linalg.svd(matrix)
    rotation = u @ vt
    if np.linalg.det(rotation) < 0:
        u[:, -1] *= -1
        rotation = u @ vt
    return (source @ rotation).astype(np.float32)


def candidate_shifts(count: int, stride: int) -> list[int]:
    stride = max(1, stride)
    shifts = list(range(0, count, stride))
    if 0 not in shifts:
        shifts.insert(0, 0)
    return shifts


def refine_shifts(center: int, count: int, radius: int) -> list[int]:
    return [int((center + delta) % count) for delta in range(-radius, radius + 1)]


def shifted_alignment_error(contour: np.ndarray, template: np.ndarray, shift: int) -> tuple[float, np.ndarray]:
    shifted = np.roll(contour, shift, axis=0)
    aligned = rotate_to_template(shifted, template)
    error = float(np.mean(np.sum((aligned - template) ** 2, axis=1)))
    return error, aligned


def align_to_template(
    contour: np.ndarray,
    template: np.ndarray,
    *,
    coarse_stride: int = 8,
    refine_radius: int = 10,
    allow_reverse: bool = True,
) -> np.ndarray:
    contour = normalize(contour)
    template = normalize(template)
    best_error = float("inf")
    best_shift = 0
    best_source = contour
    sources = [contour]
    if allow_reverse:
        sources.append(contour[::-1].copy())

    for source in sources:
        for shift in candidate_shifts(len(source), coarse_stride):
            error, _ = shifted_alignment_error(source, template, shift)
            if error < best_error:
                best_error = error
                best_shift = shift
                best_source = source

    best_aligned = None
    for shift in refine_shifts(best_shift, len(best_source), refine_radius):
        error, aligned = shifted_alignment_error(best_source, template, shift)
        if error < best_error or best_aligned is None:
            best_error = error
            best_aligned = aligned

    return normalize(best_aligned)


def generalized_procrustes(
    contours: np.ndarray,
    *,
    iterations: int = 8,
    coarse_stride: int = 8,
    refine_radius: int = 10,
    allow_reverse: bool = True,
) -> tuple[np.ndarray, np.ndarray]:
    template = normalize(contours[0])
    aligned = contours
    for iteration in range(iterations):
        aligned = np.stack([
            align_to_template(
                contour,
                template,
                coarse_stride=coarse_stride,
                refine_radius=refine_radius,
                allow_reverse=allow_reverse,
            )
            for contour in contours
        ])
        next_template = normalize(aligned.mean(axis=0))
        delta = float(np.sqrt(np.mean((next_template - template) ** 2)))
        print(f"iteration {iteration + 1}: template_delta={delta:.7f}")
        template = next_template
        if delta < 1e-5:
            break
    return aligned.astype(np.float32), template.astype(np.float32)


def pca(matrix: np.ndarray, components: int) -> dict[str, np.ndarray]:
    matrix = matrix.astype(np.float64)
    mean = matrix.mean(axis=0)
    centered = matrix - mean
    _, singular, vt = np.linalg.svd(centered, full_matrices=False)
    count = min(components, len(vt))
    basis = vt[:count]
    scores = centered @ basis.T
    variance = (singular[:count] ** 2) / max(1, len(matrix) - 1)
    total = float(np.sum((singular ** 2) / max(1, len(matrix) - 1)))
    return {
        "mean": mean.astype(np.float32),
        "components": basis.astype(np.float32),
        "scores": scores.astype(np.float32),
        "explained_variance": variance.astype(np.float32),
        "explained_variance_ratio": (variance / total if total else np.zeros_like(variance)).astype(np.float32),
    }


def clean_json(value):
    if isinstance(value, np.ndarray):
        return clean_json(value.tolist())
    if isinstance(value, np.generic):
        return value.item()
    if isinstance(value, float):
        return round(value, 7)
    if isinstance(value, list):
        return [clean_json(item) for item in value]
    if isinstance(value, dict):
        return {key: clean_json(item) for key, item in value.items()}
    return value


def backup_active_fft_data(data: Path, backup: Path) -> None:
    backup.mkdir(parents=True, exist_ok=True)
    for name in ["files.json", "fingerprints.f32", "pca.f32", "pca_model.json"]:
        source = data / name
        if source.exists():
            copy2(source, backup / name)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data", type=Path, default=DEFAULT_DATA)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUT)
    parser.add_argument("--backup", type=Path, default=DEFAULT_BACKUP)
    parser.add_argument("--samples", type=int, default=256)
    parser.add_argument("--components", type=int, default=12)
    parser.add_argument("--iterations", type=int, default=8)
    parser.add_argument("--coarse-stride", type=int, default=8)
    parser.add_argument("--refine-radius", type=int, default=10)
    parser.add_argument("--skip-align", action="store_true", help="PCA directly on reconstructed contour coordinates")
    parser.add_argument("--no-reverse", action="store_true")
    parser.add_argument("--no-backup", action="store_true")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    data = args.data.resolve()
    output = args.output.resolve()
    backup = args.backup.resolve()

    if not args.no_backup:
        backup_active_fft_data(data, backup)
        print(f"backed up current FFT PCA data to {backup}")

    files = json.loads((data / "files.json").read_text(encoding="utf-8"))
    fingerprints = np.fromfile(data / "fingerprints.f32", dtype="<f4")
    count = len(files)
    if count == 0:
        raise ValueError("files.json is empty")
    fingerprint_size = len(fingerprints) // count
    fingerprints = fingerprints.reshape(count, fingerprint_size)

    print(f"reconstructing {count} contours")
    contours = np.stack([reconstruct_contour(fingerprint, args.samples) for fingerprint in fingerprints])
    if args.skip_align:
        print("normalizing contours without Procrustes alignment")
        aligned = np.stack([normalize(contour) for contour in contours]).astype(np.float32)
        template = normalize(aligned.mean(axis=0))
        input_label = "normalized_contour_coordinates"
    else:
        print("aligning contours")
        aligned, template = generalized_procrustes(
            contours,
            iterations=args.iterations,
            coarse_stride=args.coarse_stride,
            refine_radius=args.refine_radius,
            allow_reverse=not args.no_reverse,
        )
        input_label = "procrustes_aligned_contour_coordinates"

    matrix = aligned.reshape(count, -1)
    print("running PCA")
    model = pca(matrix, args.components)

    output.mkdir(parents=True, exist_ok=True)
    (output / "files.json").write_text(json.dumps(files, separators=(",", ":")), encoding="utf-8")
    aligned.astype("<f4", copy=False).tofile(output / "aligned_contours.f32")
    template.astype("<f4", copy=False).tofile(output / "template_contour.f32")
    model["scores"].astype("<f4", copy=False).tofile(output / "pca.f32")
    (output / "pca_model.json").write_text(
        json.dumps(
            clean_json({
                "input": input_label,
                "samples": args.samples,
                "component_count": min(args.components, model["components"].shape[0]),
                "mean": model["mean"],
                "components": model["components"],
                "explained_variance": model["explained_variance"],
                "explained_variance_ratio": model["explained_variance_ratio"],
            }),
            separators=(",", ":"),
        ),
        encoding="utf-8",
    )
    print(f"wrote experiment to {output}")


if __name__ == "__main__":
    main()
