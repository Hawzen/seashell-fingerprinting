#!/usr/bin/env python3
"""Export processed PCA data as static browser assets."""

from __future__ import annotations

import argparse
from concurrent.futures import ProcessPoolExecutor
import hashlib
import json
import os
from pathlib import Path

import cv2
import numpy as np

from build_fingerprints import compute_pca, contour_from_mask, isolate_shell, load_image, score_ranges


def quantize(value: float, digits: int = 6) -> float:
    return round(float(value), digits)


def file_checksum(path: Path) -> dict[str, object]:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return {"bytes": path.stat().st_size, "sha256": digest.hexdigest()}


def roughness(fingerprint: np.ndarray) -> float:
    return float(np.mean(np.abs(np.diff(np.r_[fingerprint, fingerprint[0]]))))


def aspect_ratio(record: dict) -> float:
    x0, y0, x1, y1 = record["bbox"]
    width = max(1, x1 - x0 + 1)
    height = max(1, y1 - y0 + 1)
    return max(width / height, height / width)


def radial_area_ratio(record: dict, fingerprint: np.ndarray) -> float:
    radii = fingerprint.astype(np.float64) * float(record["mean_radius"])
    polygon_area = 0.5 * np.sin(np.deg2rad(1.0)) * float(np.dot(radii, np.roll(radii, -1)))
    return polygon_area / max(1.0, float(record["area"]))


def radial_mismatch(record: dict, fingerprint: np.ndarray) -> float:
    area_ratio = radial_area_ratio(record, fingerprint)
    area_term = abs(np.log(max(1e-6, area_ratio)))
    return float(roughness(fingerprint) * 4.0 + area_term)


def polygon_area(points: np.ndarray) -> float:
    if points.shape[0] < 3:
        return 0.0
    x = points[:, 0].astype(np.float64)
    y = points[:, 1].astype(np.float64)
    return float(abs(np.dot(x, np.roll(y, -1)) - np.dot(y, np.roll(x, -1))) * 0.5)


def contour_solidity(contour: np.ndarray | None) -> float:
    if contour is None or contour.shape[0] < 3:
        return 0.0
    area = polygon_area(contour)
    if area <= 0:
        return 0.0
    hull = cv2.convexHull(contour.astype(np.float32).reshape(-1, 1, 2)).reshape(-1, 2)
    hull_area = polygon_area(hull)
    if hull_area <= 0:
        return 0.0
    return float(np.clip(area / hull_area, 0.0, 1.0))


def normalized_contour_matrix(records: list[dict], contours: np.ndarray) -> np.ndarray:
    normalized = contours.astype(np.float32, copy=True)
    for index, record in enumerate(records):
        center_x, center_y = record["center"]
        scale = max(1e-6, float(record["mean_radius"]))
        normalized[index, :, 0] = (normalized[index, :, 0] - float(center_x)) / scale
        normalized[index, :, 1] = (normalized[index, :, 1] - float(center_y)) / scale
    return normalized.reshape(normalized.shape[0], -1).astype(np.float32, copy=False)


def contour_job(job: tuple[int, str, str, int, int, int, bool]) -> tuple[int, np.ndarray]:
    record_id, file_name, dataset_dir, point_count, scale, max_size, fill_holes = job
    rgb = load_image(Path(dataset_dir) / file_name, max_size=max_size)
    mask, _info = isolate_shell(rgb, fill_holes=fill_holes)
    sampled = contour_from_mask(mask, point_count)
    encoded = np.rint(np.clip(sampled * scale, 0, 65535)).astype("<u2")
    return record_id, encoded


def export_contours(
    dataset_dir: Path,
    output_dir: Path,
    records: list[dict],
    point_count: int,
    scale: int,
    fill_holes: bool,
    workers: int,
) -> None:
    if workers < 1:
        workers = max(1, min(8, os.cpu_count() or 1))

    contours = np.zeros((len(records), point_count, 2), dtype="<u2")
    jobs = [
        (
            int(record["id"]),
            record["file"],
            str(dataset_dir),
            point_count,
            scale,
            max(int(record["image_width"]), int(record["image_height"])),
            fill_holes,
        )
        for record in records
    ]

    if workers == 1:
        iterable = map(contour_job, jobs)
    else:
        executor = ProcessPoolExecutor(max_workers=workers)
        iterable = executor.map(contour_job, jobs, chunksize=32)

    try:
        for index, (record_id, contour) in enumerate(iterable, start=1):
            contours[record_id] = contour
            if index % 5000 == 0 or index == len(records):
                print(f"contours {index}/{len(records)}", flush=True)
    finally:
        if workers != 1:
            executor.shutdown()

    contours.tofile(output_dir / "contours.u16")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, default=Path("dataset"))
    parser.add_argument("--processed", type=Path, default=Path("processed"))
    parser.add_argument("--output", type=Path, default=Path("public/data"))
    parser.add_argument("--record-components", type=int, default=6)
    parser.add_argument("--contour-points", type=int, default=256)
    parser.add_argument("--contour-scale", type=int, default=16)
    parser.add_argument("--contour-workers", type=int, default=0)
    parser.add_argument("--no-contours", action="store_true")
    args = parser.parse_args()

    manifest = json.loads((args.processed / "manifest.json").read_text(encoding="utf-8"))
    numeric = np.load(args.processed / "fingerprints.npz")
    args.output.mkdir(parents=True, exist_ok=True)

    components = numeric["pca_components"].astype(np.float32)
    scores = numeric["pca_scores"].astype(np.float32)
    fingerprints = numeric["fingerprints"].astype(np.float32)
    species_count = len({record["species"] for record in manifest["records"]})
    view_count = len({record["view"] for record in manifest["records"] if record.get("view")})
    component_count = min(args.record_components, components.shape[0])
    fingerprint_scale = 8192
    contour_scores = None
    contour_pca = None
    contour_source = None
    if "contours" in numeric.files:
        contour_source = numeric["contours"].astype(np.float32, copy=False)
        if (
            contour_source.ndim != 3
            or contour_source.shape[0] != len(manifest["records"])
            or contour_source.shape[2] != 2
        ):
            raise ValueError(f"Unexpected contour array shape: {contour_source.shape}")
        contour_pca = compute_pca(
            normalized_contour_matrix(manifest["records"], contour_source),
            args.record_components,
        )
        contour_scores = contour_pca["scores"]

    model = {
        "version": manifest["version"],
        "generated_at": manifest["generated_at"],
        "processed_count": manifest["processed_count"],
        "image_count": manifest["image_count"],
        "error_count": manifest["error_count"],
        "species_count": species_count,
        "view_count": view_count,
        "angle_count": int(numeric["pca_mean"].shape[0]),
        "component_count": int(components.shape[0]),
        "visible_component_count": int(component_count),
        "explained_variance_ratio": [
            quantize(value, 8) for value in numeric["explained_variance_ratio"]
        ],
        "pca_ranges": manifest["pca_ranges"],
        "mean": [quantize(value) for value in numeric["pca_mean"]],
        "components": [
            [quantize(value) for value in row]
            for row in components[:component_count]
        ],
        "fingerprint_file": "fingerprints.u16",
        "fingerprint_encoding": "uint16_fixed",
        "fingerprint_scale": fingerprint_scale,
    }
    if contour_pca is not None:
        model.update(
            {
                "contour_component_count": int(contour_pca["components"].shape[0]),
                "contour_visible_component_count": int(
                    min(args.record_components, contour_pca["components"].shape[0])
                ),
                "contour_explained_variance_ratio": [
                    quantize(value, 8) for value in contour_pca["explained_variance_ratio"]
                ],
                "contour_pca_ranges": score_ranges(contour_scores),
                "contour_mean": [quantize(value) for value in contour_pca["mean"]],
                "contour_components": [
                    [quantize(value) for value in row]
                    for row in contour_pca["components"][
                        : min(args.record_components, contour_pca["components"].shape[0])
                    ]
                ],
            }
        )

    records = []
    for index, (record, score, fingerprint) in enumerate(
        zip(manifest["records"], scores, fingerprints, strict=True)
    ):
        solidity = contour_solidity(contour_source[index]) if contour_source is not None else 0.0
        contour_pc = (
            [quantize(value) for value in contour_scores[index][: args.record_components]]
            if contour_scores is not None
            else []
        )
        records.append(
            {
                "id": int(record["id"]),
                "file": record["file"],
                "name": record["name"],
                "species": record["species"],
                "specimen": record["specimen"],
                "view": record["view"],
                "pc": [quantize(value) for value in score[:component_count]],
                "contour_pc": contour_pc,
                "area": int(record["area"]),
                "center": record["center"],
                "center_adjustment": quantize(record.get("center_adjustment", 0), 3),
                "bbox": record["bbox"],
                "image_width": int(record["image_width"]),
                "image_height": int(record["image_height"]),
                "component_count": int(record.get("component_count", 0)),
                "mask_ratio": quantize(record["mask_ratio"]),
                "roughness": quantize(roughness(fingerprint)),
                "aspect_ratio": quantize(aspect_ratio(record)),
                "radial_area_ratio": quantize(radial_area_ratio(record, fingerprint)),
                "radial_mismatch": quantize(radial_mismatch(record, fingerprint)),
                "contour_solidity": quantize(solidity),
                "contour_concavity": quantize(1.0 - solidity),
                "mean_radius": quantize(record["mean_radius"]),
            }
        )

    (args.output / "model.json").write_text(
        json.dumps(model, separators=(",", ":")),
        encoding="utf-8",
    )
    (args.output / "shells.json").write_text(
        json.dumps({"records": records}, separators=(",", ":")),
        encoding="utf-8",
    )
    encoded = np.rint(np.clip(fingerprints * fingerprint_scale, 0, 65535)).astype("<u2")
    encoded.tofile(args.output / "fingerprints.u16")
    contour_file = args.output / "contours.u16"
    if args.no_contours:
        if contour_file.exists():
            contour_file.unlink()
    elif "contours" in numeric.files:
        contours = numeric["contours"].astype(np.float32, copy=False)
        encoded_contours = np.rint(np.clip(contours * args.contour_scale, 0, 65535)).astype("<u2")
        encoded_contours.tofile(contour_file)
        model.update(
            {
                "contour_file": "contours.u16",
                "contour_encoding": "uint16_xy_fixed",
                "contour_points": int(contours.shape[1]),
                "contour_scale": args.contour_scale,
            }
        )
        (args.output / "model.json").write_text(
            json.dumps(model, separators=(",", ":")),
            encoding="utf-8",
        )
    elif args.dataset.exists():
        export_contours(
            args.dataset.resolve(),
            args.output,
            records,
            args.contour_points,
            args.contour_scale,
            bool(manifest.get("fill_holes", False)),
            args.contour_workers,
        )
        model.update(
            {
                "contour_file": "contours.u16",
                "contour_encoding": "uint16_xy_fixed",
                "contour_points": args.contour_points,
                "contour_scale": args.contour_scale,
            }
        )
        (args.output / "model.json").write_text(
            json.dumps(model, separators=(",", ":")),
            encoding="utf-8",
        )

    legacy = args.output / "fingerprints.f32"
    if legacy.exists():
        legacy.unlink()

    print(args.output / "model.json")
    print(args.output / "shells.json")
    print(args.output / "fingerprints.u16")
    if contour_file.exists():
        print(contour_file)

    checksum_names = ["model.json", "shells.json", "fingerprints.u16"]
    if contour_file.exists():
        checksum_names.append("contours.u16")
    checksums = {
        name: file_checksum(args.output / name)
        for name in checksum_names
    }
    (args.output / "checksums.json").write_text(
        json.dumps(checksums, indent=2),
        encoding="utf-8",
    )
    print(args.output / "checksums.json")


if __name__ == "__main__":
    main()
