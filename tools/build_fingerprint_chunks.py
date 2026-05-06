#!/usr/bin/env python3
"""Build fingerprints in restartable chunks, then merge one PCA model."""

from __future__ import annotations

import argparse
import math
import shutil
import subprocess
import sys
from pathlib import Path

from build_fingerprints import iter_image_paths


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=Path("dataset"))
    parser.add_argument("--output", type=Path, default=Path("processed"))
    parser.add_argument("--chunks", type=Path, default=Path("processed_chunks"))
    parser.add_argument("--chunk-size", type=int, default=10000)
    parser.add_argument("--total-limit", type=int, default=0, help="Test mode: process only N images.")
    parser.add_argument("--workers", type=int, default=8)
    parser.add_argument("--progress-every", type=int, default=5000)
    parser.add_argument("--max-size", type=int, default=400)
    parser.add_argument("--smooth-window", type=int, default=5)
    parser.add_argument("--fill-holes", action="store_true")
    parser.add_argument("--center", choices=["centroid", "bbox", "hybrid"], default="centroid")
    parser.add_argument("--contour-points", type=int, default=256)
    parser.add_argument("--keep-chunks", action="store_true")
    args = parser.parse_args()

    if args.chunk_size < 1:
        raise SystemExit("--chunk-size must be positive")

    image_count = len(iter_image_paths(args.dataset.resolve()))
    if args.total_limit:
        image_count = min(image_count, args.total_limit)
    if image_count == 0:
        raise SystemExit(f"No image files found in {args.dataset}")

    if args.chunks.exists():
        shutil.rmtree(args.chunks)
    args.chunks.mkdir(parents=True, exist_ok=True)

    chunk_paths = []
    chunk_count = math.ceil(image_count / args.chunk_size)
    for chunk_index in range(chunk_count):
        offset = chunk_index * args.chunk_size
        chunk = args.chunks / f"chunk_{offset:05d}"
        chunk_paths.append(chunk)
        command = [
            sys.executable,
            "tools/build_fingerprints.py",
            "--dataset",
            str(args.dataset),
            "--output",
            str(chunk),
            "--offset",
            str(offset),
            "--limit",
            str(args.chunk_size),
            "--workers",
            str(args.workers),
            "--progress-every",
            str(args.progress_every),
            "--max-size",
            str(args.max_size),
            "--smooth-window",
            str(args.smooth_window),
            "--center",
            args.center,
            "--contour-points",
            str(args.contour_points),
        ]
        if args.fill_holes:
            command.append("--fill-holes")
        print(f"chunk {chunk_index + 1}/{chunk_count}: offset {offset}", flush=True)
        subprocess.run(command, check=True)

    merge_command = [
        sys.executable,
        "tools/merge_fingerprint_chunks.py",
        "--chunks",
        *[str(path) for path in chunk_paths],
        "--output",
        str(args.output),
        "--image-count",
        str(image_count),
    ]
    subprocess.run(merge_command, check=True)

    if not args.keep_chunks:
        shutil.rmtree(args.chunks)


if __name__ == "__main__":
    main()
