#!/usr/bin/env python3
"""Merge chunked fingerprint builds and fit one PCA model over all records."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

import numpy as np

from build_fingerprints import compute_pca, score_ranges


def load_chunk(path: Path) -> tuple[dict, np.ndarray, np.ndarray | None]:
    manifest_path = path / "manifest.json"
    numeric_path = path / "fingerprints.npz"
    if not manifest_path.exists() or not numeric_path.exists():
        raise FileNotFoundError(f"Missing chunk artifacts in {path}")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    numeric = np.load(numeric_path)
    contours = numeric["contours"].astype(np.float32, copy=False) if "contours" in numeric.files else None
    return manifest, numeric["fingerprints"].astype(np.float32, copy=False), contours


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--chunks", nargs="+", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=Path("processed"))
    parser.add_argument("--image-count", type=int, default=0)
    args = parser.parse_args()

    loaded = [load_chunk(path) for path in args.chunks]
    loaded.sort(key=lambda item: item[0].get("processed_image_offset", 0))

    first_manifest = loaded[0][0]
    image_count = int(args.image_count or first_manifest["image_count"])
    expected_offset = 0
    records: list[dict] = []
    errors: list[dict] = []
    matrices = []
    contour_matrices = []

    for manifest, fingerprints, contours in loaded:
        offset = int(manifest.get("processed_image_offset", 0))
        count = int(manifest.get("processed_image_count", manifest["processed_count"]))
        if offset != expected_offset:
            raise ValueError(f"Chunk offset gap: expected {expected_offset}, got {offset}")
        if fingerprints.shape != (manifest["processed_count"], 360):
            raise ValueError(f"Fingerprint shape mismatch in offset {offset}: {fingerprints.shape}")
        if contours is not None and contours.shape[0] != manifest["processed_count"]:
            raise ValueError(f"Contour shape mismatch in offset {offset}: {contours.shape}")
        if manifest["error_count"] != 0:
            errors.extend(manifest["errors"])

        for record in manifest["records"]:
            merged = dict(record)
            merged["id"] = len(records)
            merged.pop("pc", None)
            records.append(merged)

        matrices.append(fingerprints)
        if contours is not None:
            contour_matrices.append(contours)
        expected_offset += count

    if expected_offset != image_count:
        raise ValueError(f"Chunks cover {expected_offset} images, expected {image_count}")
    if errors:
        raise ValueError(f"Chunks contain {len(errors)} errors")

    matrix = np.vstack(matrices).astype(np.float32, copy=False)
    pca = compute_pca(matrix, int(first_manifest["components"]))
    scores = pca["scores"]
    ranges = score_ranges(scores)

    for record, score in zip(records, scores, strict=True):
        record["pc"] = [round(float(value), 6) for value in score]

    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    numeric_payload = {
        "fingerprints": matrix,
        "pca_scores": scores,
        "pca_mean": pca["mean"],
        "pca_components": pca["components"],
        "explained_variance": pca["explained_variance"],
        "explained_variance_ratio": pca["explained_variance_ratio"],
    }
    if contour_matrices:
        if len(contour_matrices) != len(matrices):
            raise ValueError("Only some chunks contain contour arrays")
        numeric_payload["contours"] = np.vstack(contour_matrices).astype(np.float32, copy=False)
    np.savez_compressed(output / "fingerprints.npz", **numeric_payload)

    manifest = {
        "version": 1,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "dataset_dir": first_manifest["dataset_dir"],
        "image_count": image_count,
        "processed_image_offset": 0,
        "processed_image_count": image_count,
        "processed_count": len(records),
        "error_count": 0,
        "max_size": first_manifest["max_size"],
        "smooth_window": first_manifest["smooth_window"],
        "fill_holes": first_manifest["fill_holes"],
        "center": first_manifest["center"],
        "components": int(pca["components"].shape[0]),
        "contour_points": int(contour_matrices[0].shape[1]) if contour_matrices else 0,
        "explained_variance_ratio": [
            round(float(value), 8) for value in pca["explained_variance_ratio"]
        ],
        "pca_ranges": ranges,
        "chunk_count": len(loaded),
        "records": records,
        "errors": [],
    }
    (output / "manifest.json").write_text(json.dumps(manifest, separators=(",", ":")), encoding="utf-8")
    print(f"Merged {len(records)} records into {output}")


if __name__ == "__main__":
    main()
