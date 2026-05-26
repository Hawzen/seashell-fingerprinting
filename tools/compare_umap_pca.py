#!/usr/bin/env python3
"""Compare PCA and UMAP embeddings for shell FFT fingerprints.

The script evaluates how well a low-dimensional embedding preserves local
neighborhoods from the original fingerprint space. UMAP is optional: install
``umap-learn`` to include it in the comparison.
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path
from time import perf_counter
from typing import Any

import numpy as np

LOCAL_DEPENDENCIES = Path("tmp/umap_deps")
if LOCAL_DEPENDENCIES.exists():
    sys.path.insert(0, str(LOCAL_DEPENDENCIES.resolve()))


def load_matrix(data_dir: Path, limit: int | None = None) -> tuple[list[str], np.ndarray, np.ndarray | None]:
    files = json.loads((data_dir / "files.json").read_text(encoding="utf-8"))
    if limit:
        files = files[:limit]
    count = len(files)
    fingerprints = np.fromfile(data_dir / "fingerprints.f32", dtype="<f4")
    if fingerprints.size % count:
        raise ValueError(f"fingerprints.f32 size {fingerprints.size} is not divisible by file count {count}")
    matrix = fingerprints.reshape(count, fingerprints.size // count).astype(np.float64)

    pca_path = data_dir / "pca.f32"
    existing_pca = None
    if pca_path.exists():
      scores = np.fromfile(pca_path, dtype="<f4")
      if scores.size % len(json.loads((data_dir / "files.json").read_text(encoding="utf-8"))) == 0:
          full_count = len(json.loads((data_dir / "files.json").read_text(encoding="utf-8")))
          existing_pca = scores.reshape(full_count, scores.size // full_count)[:count].astype(np.float64)
    return files, matrix, existing_pca


def standardize(matrix: np.ndarray) -> np.ndarray:
    mean = matrix.mean(axis=0)
    std = matrix.std(axis=0)
    std[std < 1e-12] = 1.0
    return (matrix - mean) / std


def pca_embedding(matrix: np.ndarray, dimensions: int) -> tuple[np.ndarray, np.ndarray]:
    centered = matrix - matrix.mean(axis=0)
    u, singular, _vt = np.linalg.svd(centered, full_matrices=False)
    scores = u[:, :dimensions] * singular[:dimensions]
    variance = singular**2 / max(1, len(matrix) - 1)
    ratio = variance[:dimensions] / variance.sum() if variance.sum() else np.zeros(dimensions)
    return scores, ratio


def pairwise_distances(matrix: np.ndarray) -> np.ndarray:
    squared = np.sum(matrix * matrix, axis=1, keepdims=True)
    distances = squared + squared.T - 2 * matrix @ matrix.T
    np.maximum(distances, 0.0, out=distances)
    return np.sqrt(distances, out=distances)


def neighbor_order(distances: np.ndarray) -> np.ndarray:
    order = np.argsort(distances, axis=1)
    return order[:, 1:]


def mean_neighbor_overlap(reference_order: np.ndarray, embedded_order: np.ndarray, k: int) -> float:
    values = []
    for ref, emb in zip(reference_order[:, :k], embedded_order[:, :k]):
        values.append(len(set(ref).intersection(emb)) / k)
    return float(np.mean(values))


def trustworthiness(reference_order: np.ndarray, embedded_order: np.ndarray, k: int) -> float:
    n = reference_order.shape[0]
    ranks = np.empty((n, n), dtype=np.int32)
    for i in range(n):
        ranks[i, reference_order[i]] = np.arange(1, n)
    penalty = 0
    for i in range(n):
        ref_neighbors = set(reference_order[i, :k])
        for j in embedded_order[i, :k]:
            if j not in ref_neighbors:
                penalty += ranks[i, j] - k
    normalizer = n * k * (2 * n - 3 * k - 1)
    return float(1 - (2 / normalizer) * penalty) if normalizer > 0 else 0.0


def continuity(reference_order: np.ndarray, embedded_order: np.ndarray, k: int) -> float:
    return trustworthiness(embedded_order, reference_order, k)


def spearman_distance_correlation(original_distances: np.ndarray, embedded_distances: np.ndarray) -> float:
    upper = np.triu_indices_from(original_distances, k=1)
    a = original_distances[upper]
    b = embedded_distances[upper]
    a_rank = np.empty_like(a, dtype=np.float64)
    b_rank = np.empty_like(b, dtype=np.float64)
    a_rank[np.argsort(a)] = np.arange(len(a), dtype=np.float64)
    b_rank[np.argsort(b)] = np.arange(len(b), dtype=np.float64)
    a_rank -= a_rank.mean()
    b_rank -= b_rank.mean()
    denom = math.sqrt(float(np.dot(a_rank, a_rank) * np.dot(b_rank, b_rank)))
    return float(np.dot(a_rank, b_rank) / denom) if denom else 0.0


def evaluate_embedding(name: str, embedding: np.ndarray, original_order: np.ndarray, original_distances: np.ndarray, k_values: list[int], seconds: float, extra: dict[str, Any] | None = None) -> dict[str, Any]:
    embedded_distances = pairwise_distances(embedding)
    embedded_order = neighbor_order(embedded_distances)
    row: dict[str, Any] = {
        "method": name,
        "dimensions": int(embedding.shape[1]),
        "seconds": round(seconds, 3),
        "spearman_distance": round(spearman_distance_correlation(original_distances, embedded_distances), 4),
    }
    for k in k_values:
        row[f"neighbor_overlap@{k}"] = round(mean_neighbor_overlap(original_order, embedded_order, k), 4)
        row[f"trustworthiness@{k}"] = round(trustworthiness(original_order, embedded_order, k), 4)
        row[f"continuity@{k}"] = round(continuity(original_order, embedded_order, k), 4)
    if extra:
        row.update(extra)
    return row


def umap_embedding(matrix: np.ndarray, dimensions: int, neighbors: int, min_dist: float, seed: int) -> np.ndarray:
    try:
        import umap  # type: ignore
    except ModuleNotFoundError as error:
        raise RuntimeError("Install UMAP with: python3 -m pip install umap-learn scikit-learn") from error
    reducer = umap.UMAP(
        n_components=dimensions,
        n_neighbors=neighbors,
        min_dist=min_dist,
        metric="euclidean",
        random_state=seed,
    )
    return reducer.fit_transform(matrix)


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    fields = sorted({key for row in rows for key in row})
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        handle.write(",".join(fields) + "\n")
        for row in rows:
            handle.write(",".join(str(row.get(field, "")) for field in fields) + "\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", type=Path, default=Path("public/data"))
    parser.add_argument("--output", type=Path, default=Path("tmp/umap_pca_comparison.csv"))
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--dimensions", type=int, default=2)
    parser.add_argument("--neighbors", type=int, default=15)
    parser.add_argument("--min-dist", type=float, default=0.08)
    parser.add_argument("--seed", type=int, default=7)
    parser.add_argument("--k", type=int, nargs="+", default=[5, 10, 20])
    parser.add_argument("--skip-umap", action="store_true")
    args = parser.parse_args()

    files, matrix, existing_pca = load_matrix(args.data, args.limit or None)
    matrix = standardize(matrix)
    print(f"loaded {len(files)} shells x {matrix.shape[1]} FFT features")

    original_distances = pairwise_distances(matrix)
    original_order = neighbor_order(original_distances)
    rows: list[dict[str, Any]] = []

    started = perf_counter()
    pca_scores, variance = pca_embedding(matrix, args.dimensions)
    rows.append(
        evaluate_embedding(
            "pca_recomputed",
            pca_scores,
            original_order,
            original_distances,
            args.k,
            perf_counter() - started,
            {"explained_variance": round(float(variance.sum()), 4)},
        )
    )

    if existing_pca is not None and existing_pca.shape[1] >= args.dimensions:
        rows.append(
            evaluate_embedding(
                "pca_existing",
                existing_pca[:, : args.dimensions],
                original_order,
                original_distances,
                args.k,
                0.0,
            )
        )

    if not args.skip_umap:
        try:
            started = perf_counter()
            embedding = umap_embedding(matrix, args.dimensions, args.neighbors, args.min_dist, args.seed)
            rows.append(
                evaluate_embedding(
                    f"umap_n{args.neighbors}_d{args.min_dist:g}",
                    embedding,
                    original_order,
                    original_distances,
                    args.k,
                    perf_counter() - started,
                )
            )
        except RuntimeError as error:
            rows.append({"method": "umap", "error": str(error)})

    write_csv(args.output, rows)
    for row in rows:
        print(json.dumps(row, sort_keys=True))
    print(f"wrote {args.output}")


if __name__ == "__main__":
    main()
