#!/usr/bin/env python3
"""Export contour-FFT processed data into the static Shellspace data pack."""

from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import numpy as np

from build_fft_fingerprints import reconstruct_fft_fingerprint


METRIC_FIELDS = [
    "mean_radius",
    "roughness",
    "aspect_ratio",
    "contour_solidity",
    "contour_concavity",
    "mask_ratio",
    "background_ratio",
    "color_r_mean",
    "color_g_mean",
    "color_b_mean",
    "color_l_mean",
    "color_l_std",
    "color_a_mean",
    "color_b_lab_mean",
    "color_chroma_mean",
    "color_chroma_std",
    "color_saturation_mean",
    "color_saturation_std",
    "color_hue_sin",
    "color_hue_cos",
    "texture_gradient_mean",
    "texture_residual_std",
    "texture_luma_iqr",
    "color_pattern_strength",
    "color_pattern_contrast",
    "color_pattern_chroma",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--processed", type=Path, default=Path("processed_fft"))
    parser.add_argument("--output", type=Path, default=Path("public/data"))
    parser.add_argument("--previous", type=Path, default=Path("public/data"))
    parser.add_argument("--contour-scale", type=int, default=64)
    parser.add_argument("--contour-points", type=int, default=256)
    return parser.parse_args()


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def load_gzip_json(path: Path) -> dict[str, Any]:
    with gzip.open(path, "rt", encoding="utf-8") as handle:
        return json.load(handle)


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")


def write_gzip_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    encoded = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    with gzip.GzipFile(filename="", mode="wb", fileobj=path.open("wb"), mtime=0) as handle:
        handle.write(encoded)


def write_gzip_bytes(path: Path, payload: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with gzip.GzipFile(filename="", mode="wb", fileobj=path.open("wb"), mtime=0) as handle:
        handle.write(payload)


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def resample_indexed_contour(contour: np.ndarray, point_count: int) -> np.ndarray:
    if point_count >= len(contour):
        return contour
    positions = np.linspace(0, len(contour), point_count, endpoint=False)
    lower = np.floor(positions).astype(np.int32)
    upper = (lower + 1) % len(contour)
    ratio = (positions - lower).astype(np.float32)
    return contour[lower] * (1.0 - ratio[:, None]) + contour[upper] * ratio[:, None]


def fft_to_ui_contour(
    values: list[float] | np.ndarray,
    samples: int,
    harmonics: int,
    point_count: int,
) -> np.ndarray:
    contour = reconstruct_fft_fingerprint(np.asarray(values, dtype=np.float32), samples, harmonics)
    contour[:, 1] *= -1.0
    return resample_indexed_contour(contour.astype(np.float32), point_count)


def flattened_contour(values: list[float] | np.ndarray, samples: int, harmonics: int, point_count: int) -> list[float]:
    return [round(float(value), 6) for value in fft_to_ui_contour(values, samples, harmonics, point_count).reshape(-1)]


def index_values(values: list[str]) -> tuple[list[str], list[int]]:
    names: list[str] = []
    lookup: dict[str, int] = {}
    indices: list[int] = []
    for value in values:
        if value not in lookup:
            lookup[value] = len(names)
            names.append(value)
        indices.append(lookup[value])
    return names, indices


def view_label(value: str) -> str:
    return f"View {value}" if value else "View"


def specimen_label(value: str) -> str:
    return f"Specimen {value}" if value else "Specimen"


def old_aliases_by_file(previous_dir: Path) -> dict[str, str]:
    path = previous_dir / "shells.compact.json.gz"
    if not path.exists():
        return {}
    try:
        payload = load_gzip_json(path)
    except Exception:
        return {}
    files = payload.get("files", [])
    aliases = payload.get("legacy_hashes", [])
    return {
        str(file_name): str(aliases[index])
        for index, file_name in enumerate(files)
        if index < len(aliases) and aliases[index]
    }


def merged_alias(record: dict[str, Any], old_alias: str = "") -> str:
    values = []
    for value in [record.get("shellprint"), record.get("fingerprint_hash"), old_alias]:
        for item in str(value or "").replace(",", " ").split():
            if item and item not in values:
                values.append(item)
    return " ".join(values)


def compact_shell_pack(records: list[dict[str, Any]], old_aliases: dict[str, str]) -> dict[str, Any]:
    species_names, species = index_values([str(record.get("species") or "Unknown shell") for record in records])
    specimen_values, specimens = index_values([str(record.get("specimen") or "") for record in records])
    view_values, views = index_values([str(record.get("view") or "") for record in records])
    contour_pc_count = max(len(record.get("pca_scores", [])) for record in records)

    metrics = {
        field: [round(float(record.get(field, 0) or 0), 6) for record in records]
        for field in METRIC_FIELDS
    }
    return {
        "encoding": "shell-pack-v1",
        "count": len(records),
        "files": [record["file"] for record in records],
        "species_names": species_names,
        "species": species,
        "specimen_values": specimen_values,
        "specimen_labels": [specimen_label(value) for value in specimen_values],
        "specimens": specimens,
        "view_values": view_values,
        "view_labels": [view_label(value) for value in view_values],
        "views": views,
        "legacy_hashes": [
            merged_alias(record, old_aliases.get(str(record.get("file")), ""))
            for record in records
        ],
        "area": [int(record.get("mask_area") or record.get("area") or 0) for record in records],
        "centers": [
            round(float(value), 3)
            for record in records
            for value in (record.get("center") or [0, 0])
        ],
        "dims": [
            int(value)
            for record in records
            for value in [record.get("processing_width") or record.get("original_width") or 0,
                          record.get("processing_height") or record.get("original_height") or 0]
        ],
        "bbox": [
            int(value)
            for record in records
            for value in (record.get("bbox") or [0, 0, 0, 0])
        ],
        "contour_pc_count": contour_pc_count,
        "contour_pc": [
            round(float(value), 6)
            for record in records
            for value in list(record.get("pca_scores", []))[:contour_pc_count]
        ],
        "trait_pc_count": 0,
        "trait_pc": [],
        "fields": METRIC_FIELDS,
        "metrics": metrics,
    }


def encoded_contours(
    records: list[dict[str, Any]],
    samples: int,
    harmonics: int,
    point_count: int,
    contour_scale: int,
) -> np.ndarray:
    encoded = np.empty((len(records), point_count, 2), dtype="<u2")
    for index, record in enumerate(records):
        contour = fft_to_ui_contour(record["fft_fingerprint"], samples, harmonics, point_count)
        center = np.asarray(record.get("center") or [0, 0], dtype=np.float32)
        radius = float(record.get("mean_radius") or record.get("normalization_scale") or 1.0)
        source = contour * radius + center.reshape(1, 2)
        encoded[index] = np.clip(np.rint(source * contour_scale), 0, 65535).astype("<u2")
    return encoded


def species_count(records: list[dict[str, Any]]) -> int:
    return len({record.get("species") for record in records})


def copy_if_exists(source: Path, target: Path) -> bool:
    if not source.exists():
        return False
    if source.resolve() == target.resolve():
        return True
    if source.is_dir():
        if target.exists():
            shutil.rmtree(target)
        shutil.copytree(source, target)
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
    return True


def inherited_sidecars(previous_dir: Path, output_dir: Path) -> dict[str, Any]:
    inherited: dict[str, Any] = {}
    previous_model_path = previous_dir / "model.json"
    previous_model = load_json(previous_model_path) if previous_model_path.exists() else {}
    for key in ["locality_file", "species_traits_file"]:
        file_name = previous_model.get(key)
        if file_name and copy_if_exists(previous_dir / file_name, output_dir / file_name):
            inherited[key] = file_name
    if previous_model.get("thumbnail_atlas"):
        atlas = dict(previous_model["thumbnail_atlas"])
        atlas_dir = atlas.get("dir")
        if atlas_dir and copy_if_exists(previous_dir / atlas_dir, output_dir / atlas_dir):
            inherited["thumbnail_atlas"] = atlas
    return inherited


def checksum_payload(output_dir: Path, model: dict[str, Any]) -> dict[str, dict[str, Any]]:
    names = ["model.json", model["shell_file"], model["contour_file"]]
    for key in ["locality_file", "species_traits_file"]:
        if model.get(key):
            names.append(model[key])
    atlas = model.get("thumbnail_atlas") or {}
    for file_name in atlas.get("files", []):
        names.append(f"{atlas.get('dir', 'thumbs')}/{file_name}")
    checksums = {}
    for name in names:
        path = output_dir / name
        if not path.exists():
            continue
        checksums[name] = {"bytes": path.stat().st_size, "sha256": sha256_file(path)}
    return checksums


def build_model(
    processed_model: dict[str, Any],
    records: list[dict[str, Any]],
    contour_scale: int,
    contour_points: int,
    inherited: dict[str, Any],
) -> dict[str, Any]:
    samples = int(processed_model["contour_samples"])
    harmonics = int(processed_model["harmonics"])
    component_count = int(processed_model["pca_component_count"])
    model = {
        "version": 2,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_fingerprint_type": processed_model.get("fingerprint_type", "contour_fft_v1"),
        "image_count": int(processed_model["image_count"]),
        "processed_count": len(records),
        "error_count": int(processed_model.get("error_count", 0)),
        "species_count": species_count(records),
        "view_count": len({record.get("view", "") for record in records}),
        "shell_file": "shells.compact.json.gz",
        "shell_encoding": "shell-pack-v1",
        "contour_file": "contours.u16.gz",
        "contour_encoding": "uint16_xy",
        "contour_compression": "gzip",
        "contour_points": contour_points,
        "contour_scale": contour_scale,
        "contour_component_count": component_count,
        "contour_visible_component_count": min(6, component_count),
        "contour_mean": flattened_contour(processed_model["pca_mean"], samples, harmonics, contour_points),
        "contour_components": [
            flattened_contour(component, samples, harmonics, contour_points)
            for component in processed_model["pca_components"]
        ],
        "contour_explained_variance_ratio": processed_model["pca_explained_variance_ratio"],
        "contour_pca_ranges": processed_model["pca_ranges"],
        "pca_interpretation": {
            "contour": [
                {"axis": index + 1, "label": f"PC{index + 1}", "drivers": ["FFT"], "summary": f"PC{index + 1}"}
                for index in range(min(6, component_count))
            ],
            "trait": [],
        },
        "trait_component_count": 0,
        "trait_visible_component_count": 0,
        "trait_components": [],
        "trait_explained_variance_ratio": [],
        "trait_pca_ranges": [],
        "trait_feature_schema": [],
        "trait_mean": [],
        "trait_top_loadings": [],
        "color_mix": {
            "x": {"field": "color_a_mean", "label": "Lab a"},
            "y": {"field": "color_b_lab_mean", "label": "Lab b"},
            "summary": "Shell color spread in Lab a/b space",
        },
        "color_fingerprint_fields": [
            "color_r_mean",
            "color_g_mean",
            "color_b_mean",
            "color_pattern_strength",
            "color_pattern_contrast",
        ],
        **inherited,
    }
    model.setdefault("thumbnail_atlas", {"dir": "thumbs", "files": [], "count": 0, "bytes": 0})
    return model


def main() -> None:
    args = parse_args()
    processed_model = load_json(args.processed / "model.json")
    records = load_gzip_json(args.processed / "shells.json.gz")["records"]
    if not records:
        raise SystemExit("No FFT shell records found")

    args.output.mkdir(parents=True, exist_ok=True)
    old_aliases = old_aliases_by_file(args.previous)
    inherited = inherited_sidecars(args.previous, args.output)

    shell_pack = compact_shell_pack(records, old_aliases)
    contours = encoded_contours(
        records,
        samples=int(processed_model["contour_samples"]),
        harmonics=int(processed_model["harmonics"]),
        point_count=int(args.contour_points),
        contour_scale=args.contour_scale,
    )
    model = build_model(processed_model, records, args.contour_scale, int(args.contour_points), inherited)

    write_gzip_json(args.output / model["shell_file"], shell_pack)
    write_gzip_bytes(args.output / model["contour_file"], contours.tobytes())
    write_json(args.output / "model.json", model)
    write_json(args.output / "checksums.json", checksum_payload(args.output, model))

    print(
        f"exported {len(records)} shells, {model['species_count']} species to {args.output.as_posix()}"
    )


if __name__ == "__main__":
    main()
