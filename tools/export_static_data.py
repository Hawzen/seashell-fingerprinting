#!/usr/bin/env python3
"""Export processed PCA data as static browser assets."""

from __future__ import annotations

import argparse
from concurrent.futures import ProcessPoolExecutor
import gzip
import hashlib
import json
import math
import os
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageOps

from build_fingerprints import (
    compute_pca,
    contour_from_mask,
    isolate_shell,
    load_image,
    score_ranges,
    shell_appearance_features,
)


DERIVED_APPEARANCE_FIELDS = [
    "color_pattern_strength",
    "color_pattern_contrast",
    "color_pattern_chroma",
]

APPEARANCE_FEATURES = [
    ("color_l_mean", "Lightness", "appearance"),
    ("color_l_std", "Lightness contrast", "appearance"),
    ("color_a_mean", "Lab a", "appearance"),
    ("color_b_lab_mean", "Lab b", "appearance"),
    ("color_chroma_mean", "Chroma", "appearance"),
    ("color_chroma_std", "Chroma contrast", "appearance"),
    ("color_saturation_mean", "Saturation", "appearance"),
    ("color_saturation_std", "Saturation contrast", "appearance"),
    ("color_hue_sin", "Hue sine", "appearance"),
    ("color_hue_cos", "Hue cosine", "appearance"),
    ("texture_gradient_mean", "Texture gradient", "appearance"),
    ("texture_residual_std", "Texture residual", "appearance"),
    ("texture_luma_iqr", "Luma IQR", "appearance"),
    ("color_pattern_strength", "Pattern", "appearance"),
    ("color_pattern_contrast", "Pattern contrast", "appearance"),
    ("color_pattern_chroma", "Pattern color", "appearance"),
]

MORPH_FEATURES = [
    ("mask_ratio", "Mask coverage", "morphology"),
    ("aspect_ratio", "Aspect ratio", "morphology"),
    ("roughness", "Outline roughness", "morphology"),
    ("contour_concavity", "Contour concavity", "morphology"),
]

APPEARANCE_FIELD_NAMES = [
    "visible_shell_ratio",
    "color_r_mean",
    "color_g_mean",
    "color_b_mean",
    *[name for name, _label, _group in APPEARANCE_FEATURES if name not in DERIVED_APPEARANCE_FIELDS],
]

INTERPRETATION_FEATURES = [
    ("mask_ratio", "mask coverage"),
    ("aspect_ratio", "aspect ratio"),
    ("roughness", "outline roughness"),
    ("contour_concavity", "concavity"),
    ("contour_solidity", "solidity"),
    ("color_l_mean", "lightness"),
    ("color_l_std", "contrast"),
    ("color_chroma_mean", "chroma"),
    ("color_chroma_std", "chroma contrast"),
    ("color_saturation_mean", "saturation"),
    ("texture_gradient_mean", "texture gradient"),
    ("texture_luma_iqr", "luma variation"),
    ("color_pattern_strength", "pattern"),
    ("color_pattern_contrast", "pattern contrast"),
    ("color_pattern_chroma", "pattern color"),
]


def quantize(value: float, digits: int = 6) -> float:
    return round(float(value), digits)


def js_imul(left: int, right: int) -> int:
    value = ((left & 0xFFFFFFFF) * (right & 0xFFFFFFFF)) & 0xFFFFFFFF
    return value - 0x100000000 if value >= 0x80000000 else value


def js_hash_string(text: str) -> int:
    value = 2166136261
    for character in text:
        value ^= ord(character)
        value = js_imul(value, 16777619)
    return value & 0xFFFFFFFF


def base36(value: int) -> str:
    digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if value == 0:
        return "0"
    output = ""
    while value:
        value, remainder = divmod(value, 36)
        output = digits[remainder] + output
    return output


def fingerprint_hash(record: dict[str, object]) -> str:
    pcs = [f"{float(value or 0.0):.4f}" for value in list(record.get("contour_pc", []))[:6]]
    seed = f"{record.get('species', '')}|{record.get('specimen', '')}|{record.get('view', '')}|{','.join(pcs)}"
    return base36(js_hash_string(seed)).rjust(6, "0")[-6:]


def file_checksum(path: Path) -> dict[str, object]:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return {"bytes": path.stat().st_size, "sha256": digest.hexdigest()}


def write_gzip_json(path: Path, payload: dict[str, object]) -> None:
    raw = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    with path.open("wb") as fileobj:
        with gzip.GzipFile(filename="", mode="wb", fileobj=fileobj, compresslevel=9, mtime=0) as handle:
            handle.write(raw)


def gzip_bytes_to_file(path: Path, payload: bytes) -> None:
    with path.open("wb") as fileobj:
        with gzip.GzipFile(filename="", mode="wb", fileobj=fileobj, compresslevel=9, mtime=0) as handle:
            handle.write(payload)


def load_json_maybe_gzip(path: Path) -> dict[str, object] | None:
    if not path.exists():
        return None
    try:
        if path.suffix == ".gz":
            with gzip.open(path, "rt", encoding="utf-8") as handle:
                return json.load(handle)
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None


def roughness(fingerprint: np.ndarray) -> float:
    return float(np.mean(np.abs(np.diff(np.r_[fingerprint, fingerprint[0]]))))


def aspect_ratio(record: dict) -> float:
    x0, y0, x1, y1 = record["bbox"]
    width = max(1, x1 - x0 + 1)
    height = max(1, y1 - y0 + 1)
    return max(width / height, height / width)


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


def color_pattern_features(record: dict[str, object]) -> dict[str, float]:
    l_std = float(record.get("color_l_std", 0.0) or 0.0)
    chroma_std = float(record.get("color_chroma_std", 0.0) or 0.0)
    saturation_std = float(record.get("color_saturation_std", 0.0) or 0.0)
    gradient = float(record.get("texture_gradient_mean", 0.0) or 0.0)
    residual = float(record.get("texture_residual_std", 0.0) or 0.0)
    iqr = float(record.get("texture_luma_iqr", 0.0) or 0.0)
    gradient_unit = min(1.0, max(0.0, gradient / 1.5))
    strength = np.clip(
        (
            l_std * 1.7
            + chroma_std * 2.2
            + saturation_std * 0.9
            + residual * 10.0
            + iqr * 1.2
            + gradient_unit
        )
        / 6.0,
        0.0,
        1.0,
    )
    contrast = np.clip((l_std * 2.0 + residual * 12.0 + iqr * 1.3) / 3.0, 0.0, 1.0)
    chroma_pattern = np.clip((chroma_std * 2.6 + saturation_std * 1.2) / 2.0, 0.0, 1.0)
    return {
        "color_pattern_strength": float(strength),
        "color_pattern_contrast": float(contrast),
        "color_pattern_chroma": float(chroma_pattern),
    }


def specimen_label(value: object) -> str:
    text = str(value or "").strip()
    return f"Specimen {text}" if text else "Unknown specimen"


def view_label(value: object) -> str:
    text = str(value or "").strip()
    labels = {
        "A": "Primary view (A)",
        "B": "Reverse view (B)",
        "C": "Detail view (C)",
    }
    return labels.get(text, f"View {text}" if text else "Unknown view")


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


def mask_from_contour(image_shape: tuple[int, int, int], contour: np.ndarray | None) -> np.ndarray | None:
    if contour is None or contour.shape[0] < 3:
        return None
    mask = np.zeros(image_shape[:2], dtype=np.uint8)
    points = np.rint(contour).astype(np.int32).reshape(-1, 1, 2)
    cv2.fillPoly(mask, [points], 1)
    return mask.astype(bool)


def appearance_job(
    job: tuple[int, str, str, int, bool, dict[str, float], np.ndarray | None],
) -> tuple[int, dict[str, float]]:
    record_id, file_name, dataset_dir, max_size, fill_holes, mask_info, contour = job
    rgb = load_image(Path(dataset_dir) / file_name, max_size=max_size)
    mask = mask_from_contour(rgb.shape, contour)
    if mask is None or int(mask.sum()) < 16:
        mask, mask_info = isolate_shell(rgb, fill_holes=fill_holes)
    return record_id, shell_appearance_features(rgb, mask, mask_info)


def ensure_appearance_features(
    records: list[dict],
    dataset_dir: Path,
    fill_holes: bool,
    workers: int,
    contours: np.ndarray | None = None,
) -> None:
    if all(all(name in record for name in APPEARANCE_FIELD_NAMES) for record in records):
        return
    if not dataset_dir.exists():
        missing = ", ".join(APPEARANCE_FIELD_NAMES[:3])
        raise FileNotFoundError(
            f"Processed records are missing appearance features ({missing}, ...), "
            f"and {dataset_dir} is not available to compute them."
        )

    if workers < 1:
        workers = max(1, min(8, os.cpu_count() or 1))
    jobs = []
    for record in records:
        record_id = int(record["id"])
        contour = contours[record_id] if contours is not None else None
        mask_info = {
            "background_r": float(record.get("background_r", 0.0)),
            "background_g": float(record.get("background_g", 0.0)),
            "background_b": float(record.get("background_b", 0.0)),
            "threshold": float(record.get("threshold", 8.0)),
        }
        jobs.append(
            (
                record_id,
                record["file"],
                str(dataset_dir),
                max(int(record["image_width"]), int(record["image_height"])),
                fill_holes,
                mask_info,
                contour,
            )
        )

    print(f"appearance features {len(jobs)} records with {workers} worker(s)", flush=True)
    if workers == 1:
        iterable = map(appearance_job, jobs)
        executor = None
    else:
        executor = ProcessPoolExecutor(max_workers=workers)
        iterable = executor.map(appearance_job, jobs, chunksize=64)

    try:
        for index, (record_id, features) in enumerate(iterable, start=1):
            records[record_id].update(features)
            if index % 5000 == 0 or index == len(records):
                print(f"appearance {index}/{len(records)}", flush=True)
    finally:
        if executor is not None:
            executor.shutdown()


def shell_records_from_payload(payload: dict[str, object] | None) -> list[dict[str, object]]:
    if not payload:
        return []
    if isinstance(payload.get("records"), list):
        return list(payload["records"])  # type: ignore[index]
    if payload.get("encoding") != "shell-pack-v1":
        return []
    count = int(payload.get("count", 0) or 0)
    files = list(payload.get("files", []))
    metrics = payload.get("metrics", {})
    if not isinstance(metrics, dict):
        metrics = {}
    species_names = list(payload.get("species_names", []))
    specimen_values = list(payload.get("specimen_values", []))
    view_values = list(payload.get("view_values", []))
    species_indices = list(payload.get("species", []))
    specimen_indices = list(payload.get("specimens", []))
    view_indices = list(payload.get("views", []))
    contour_pc_count = int(payload.get("contour_pc_count", 0) or 0)
    contour_pc = list(payload.get("contour_pc", []))
    legacy_hashes = list(payload.get("legacy_hashes", []))
    output: list[dict[str, object]] = []
    for index in range(count):
        record: dict[str, object] = {"file": files[index] if index < len(files) else ""}
        species_index = species_indices[index] if index < len(species_indices) else 0
        specimen_index = specimen_indices[index] if index < len(specimen_indices) else 0
        view_index = view_indices[index] if index < len(view_indices) else 0
        record["species"] = species_names[species_index] if species_index < len(species_names) else ""
        record["specimen"] = specimen_values[specimen_index] if specimen_index < len(specimen_values) else ""
        record["view"] = view_values[view_index] if view_index < len(view_values) else ""
        if contour_pc_count:
            start = index * contour_pc_count
            record["contour_pc"] = contour_pc[start : start + contour_pc_count]
        if index < len(legacy_hashes):
            record["legacy_hash"] = legacy_hashes[index]
        for field, values in metrics.items():
            if isinstance(values, list) and index < len(values):
                record[str(field)] = values[index]
        output.append(record)
    return output


def legacy_hashes_from_payload(payload: dict[str, object] | None) -> dict[str, str]:
    hashes: dict[str, str] = {}
    for record in shell_records_from_payload(payload):
        file_name = str(record.get("file", ""))
        if not file_name or not record.get("contour_pc"):
            continue
        aliases: list[str] = []
        for value in str(record.get("legacy_hash") or "").replace(",", " ").split():
            if value and value not in aliases:
                aliases.append(value)
        current_hash = fingerprint_hash(record)
        if current_hash and current_hash not in aliases:
            aliases.append(current_hash)
        hashes[file_name] = " ".join(aliases)
    return hashes


def reuse_exported_appearance_features(records: list[dict], previous_shells: list[Path]) -> None:
    previous: list[dict[str, object]] = []
    for path in previous_shells:
        previous = shell_records_from_payload(load_json_maybe_gzip(path))
        if previous:
            break
    if not previous:
        return
    by_file = {record.get("file"): record for record in previous}
    reused = 0
    for record in records:
        old = by_file.get(record.get("file"))
        if not old or not all(name in old for name in APPEARANCE_FIELD_NAMES):
            continue
        for name in APPEARANCE_FIELD_NAMES:
            record[name] = old[name]
        reused += 1
    if reused:
        print(f"appearance cache {reused}/{len(records)} records", flush=True)


def trait_feature_specs(shape_count: int) -> list[dict[str, object]]:
    specs: list[dict[str, object]] = []
    shape_weight = 1.35 / math.sqrt(max(1, shape_count))
    morph_weight = 1.0 / math.sqrt(len(MORPH_FEATURES))
    appearance_weight = 1.0 / math.sqrt(len(APPEARANCE_FEATURES))

    for index in range(shape_count):
        specs.append(
            {
                "name": f"contour_pc{index + 1}",
                "label": f"Contour PC{index + 1}",
                "group": "shape",
                "source": "contour_pc",
                "index": index,
                "weight": shape_weight,
            }
        )
    for name, label, group in MORPH_FEATURES:
        specs.append(
            {
                "name": name,
                "label": label,
                "group": group,
                "source": "field",
                "field": name,
                "weight": morph_weight,
            }
        )
    for name, label, group in APPEARANCE_FEATURES:
        specs.append(
            {
                "name": name,
                "label": label,
                "group": group,
                "source": "field",
                "field": name,
                "weight": appearance_weight,
            }
        )
    return specs


def transformed_trait_value(record: dict, field: str) -> float:
    value = float(record.get(field, 0.0) or 0.0)
    if field == "aspect_ratio":
        return math.log1p(max(0.0, value))
    if field in {
        "roughness",
        "contour_concavity",
        "texture_gradient_mean",
        "texture_residual_std",
        "color_pattern_strength",
        "color_pattern_contrast",
        "color_pattern_chroma",
    }:
        return math.log1p(max(0.0, value) * 64.0)
    return value


def raw_trait_matrix(records: list[dict], specs: list[dict[str, object]]) -> np.ndarray:
    matrix = np.zeros((len(records), len(specs)), dtype=np.float32)
    for row, record in enumerate(records):
        for column, spec in enumerate(specs):
            if spec["source"] == "contour_pc":
                values = record.get("contour_pc", [])
                index = int(spec["index"])
                matrix[row, column] = float(values[index]) if index < len(values) else 0.0
            else:
                matrix[row, column] = transformed_trait_value(record, str(spec["field"]))
    return matrix


def standardize_trait_matrix(
    raw: np.ndarray,
    specs: list[dict[str, object]],
) -> tuple[np.ndarray, list[dict[str, object]]]:
    standardized = np.zeros_like(raw, dtype=np.float32)
    schema: list[dict[str, object]] = []
    for column, spec in enumerate(specs):
        values = raw[:, column].astype(np.float64)
        low = float(np.percentile(values, 1))
        high = float(np.percentile(values, 99))
        if high <= low:
            low = float(values.min())
            high = float(values.max())
        clipped = np.clip(values, low, high)
        center = float(clipped.mean())
        scale = float(clipped.std())
        if scale <= 1e-9:
            scale = 1.0
        weight = float(spec["weight"])
        standardized[:, column] = (((values - center) / scale) * weight).astype(np.float32)
        schema.append(
            {
                "name": spec["name"],
                "label": spec["label"],
                "group": spec["group"],
                "source": spec["source"],
                "weight": quantize(weight),
                "mean": quantize(center),
                "scale": quantize(scale),
                "p01": quantize(low),
                "p99": quantize(high),
            }
        )
    return standardized, schema


def top_trait_loadings(
    components: np.ndarray,
    schema: list[dict[str, object]],
    count: int = 5,
) -> list[list[dict[str, object]]]:
    loadings: list[list[dict[str, object]]] = []
    for component in components:
        order = np.argsort(np.abs(component))[::-1][:count]
        loadings.append(
            [
                {
                    "name": str(schema[index]["name"]),
                    "label": str(schema[index]["label"]),
                    "group": str(schema[index]["group"]),
                    "loading": quantize(float(component[index])),
                }
                for index in order
            ]
        )
    return loadings


def compute_trait_pca(
    records: list[dict],
    component_count: int,
    shape_count: int,
) -> tuple[dict[str, np.ndarray], list[dict[str, object]], list[list[dict[str, object]]]]:
    specs = trait_feature_specs(shape_count)
    raw = raw_trait_matrix(records, specs)
    standardized, schema = standardize_trait_matrix(raw, specs)
    pca = compute_pca(standardized, component_count)
    loadings = top_trait_loadings(pca["components"], schema)
    return pca, schema, loadings


def feature_correlations(
    scores: np.ndarray,
    records: list[dict],
    features: list[tuple[str, str]] = INTERPRETATION_FEATURES,
) -> list[dict[str, object]]:
    output: list[dict[str, object]] = []
    axis_values = scores.astype(np.float64)
    axis_std = float(axis_values.std())
    if axis_std <= 1e-9:
        return output
    for name, label in features:
        values = np.array([float(record.get(name, 0.0) or 0.0) for record in records], dtype=np.float64)
        value_std = float(values.std())
        if value_std <= 1e-9:
            continue
        corr = float(np.corrcoef(axis_values, values)[0, 1])
        if not np.isfinite(corr):
            continue
        output.append(
            {
                "name": name,
                "label": label,
                "correlation": quantize(corr),
                "strength": quantize(abs(corr)),
                "sign": 1 if corr >= 0 else -1,
            }
        )
    output.sort(key=lambda item: float(item["strength"]), reverse=True)
    return output


def axis_examples(
    scores: np.ndarray,
    records: list[dict],
    count: int = 3,
) -> dict[str, list[dict[str, object]]]:
    order = np.argsort(scores)

    def pack(indices: np.ndarray) -> list[dict[str, object]]:
        return [
            {
                "id": int(records[index]["id"]),
                "species": records[index]["species"],
                "file": records[index]["file"],
                "score": quantize(float(scores[index])),
            }
            for index in indices
        ]

    return {
        "negative": pack(order[:count]),
        "positive": pack(order[-count:][::-1]),
    }


def pca_interpretations(
    scores: np.ndarray,
    records: list[dict],
    explained: np.ndarray,
    loadings: list[list[dict[str, object]]] | None = None,
) -> list[dict[str, object]]:
    axes: list[dict[str, object]] = []
    visible_count = min(scores.shape[1], len(explained), 6)
    for axis in range(visible_count):
        correlations = feature_correlations(scores[:, axis], records)
        drivers = correlations[:5]
        if loadings and axis < len(loadings):
            loading_drivers = [
                {
                    "name": item["name"],
                    "label": item["label"],
                    "group": item["group"],
                    "correlation": item["loading"],
                    "strength": quantize(abs(float(item["loading"]))),
                    "sign": 1 if float(item["loading"]) >= 0 else -1,
                }
                for item in loadings[axis][:5]
            ]
            drivers = loading_drivers
        axes.append(
            {
                "axis": axis + 1,
                "label": f"PC{axis + 1}",
                "explained": quantize(float(explained[axis]), 8),
                "summary": f"PC{axis + 1}",
                "drivers": drivers,
                "correlations": correlations[:8],
                "examples": axis_examples(scores[:, axis], records),
            }
        )
    return axes


def color_mix_model(records: list[dict]) -> dict[str, object]:
    def rng(field: str) -> dict[str, float]:
        values = np.array([float(record.get(field, 0.0) or 0.0) for record in records], dtype=np.float64)
        return {
            "p01": quantize(float(np.percentile(values, 1))),
            "p50": quantize(float(np.percentile(values, 50))),
            "p99": quantize(float(np.percentile(values, 99))),
        }

    return {
        "x": {"field": "color_a_mean", "label": "Lab a", **rng("color_a_mean")},
        "y": {"field": "color_b_lab_mean", "label": "Lab b", **rng("color_b_lab_mean")},
        "blend_fields": [
            "color_r_mean",
            "color_g_mean",
            "color_b_mean",
            "color_l_mean",
            "color_a_mean",
            "color_b_lab_mean",
            "color_chroma_mean",
            "color_chroma_std",
            "color_saturation_mean",
            "color_saturation_std",
            "texture_gradient_mean",
            "texture_residual_std",
            "texture_luma_iqr",
            "color_pattern_strength",
            "color_pattern_contrast",
            "color_pattern_chroma",
            "roughness",
        ],
    }


def compact_pool(values: list[object]) -> tuple[list[object], list[int]]:
    pool: list[object] = []
    lookup: dict[str, int] = {}
    indices: list[int] = []
    for value in values:
        key = str(value)
        if key not in lookup:
            lookup[key] = len(pool)
            pool.append(value)
        indices.append(lookup[key])
    return pool, indices


def flat_pc_values(records: list[dict], key: str) -> tuple[int, list[float]]:
    count = max((len(record.get(key, [])) for record in records), default=0)
    flat: list[float] = []
    for record in records:
        values = list(record.get(key, []))
        for index in range(count):
            flat.append(quantize(float(values[index] if index < len(values) else 0.0)))
    return count, flat


def compact_shell_records(records: list[dict]) -> dict[str, object]:
    species_names, species = compact_pool([record.get("species", "") for record in records])
    specimen_values, specimens = compact_pool([record.get("specimen", "") for record in records])
    view_values, views = compact_pool([record.get("view", "") for record in records])
    contour_pc_count, contour_pc = flat_pc_values(records, "contour_pc")
    trait_pc_count, trait_pc = flat_pc_values(records, "trait_pc")
    fields = [
        "center_adjustment",
        "component_count",
        "mask_ratio",
        "roughness",
        "aspect_ratio",
        "contour_solidity",
        "contour_concavity",
        "mean_radius",
        *APPEARANCE_FIELD_NAMES,
        *DERIVED_APPEARANCE_FIELDS,
    ]
    metrics = {
        field: [quantize(float(record.get(field, 0.0) or 0.0)) for record in records]
        for field in fields
    }
    payload = {
        "encoding": "shell-pack-v1",
        "count": len(records),
        "files": [record.get("file", "") for record in records],
        "species_names": species_names,
        "species": species,
        "specimen_values": specimen_values,
        "specimens": specimens,
        "specimen_labels": [specimen_label(value) for value in specimen_values],
        "view_values": view_values,
        "views": views,
        "view_labels": [view_label(value) for value in view_values],
        "area": [int(record.get("area", 0) or 0) for record in records],
        "centers": [
            quantize(value)
            for record in records
            for value in (record.get("center", [0.0, 0.0]) or [0.0, 0.0])[:2]
        ],
        "dims": [
            int(value)
            for record in records
            for value in [record.get("image_width", 0) or 0, record.get("image_height", 0) or 0]
        ],
        "bbox": [
            int(value)
            for record in records
            for value in (record.get("bbox", [0, 0, 0, 0]) or [0, 0, 0, 0])[:4]
        ],
        "contour_pc_count": contour_pc_count,
        "contour_pc": contour_pc,
        "trait_pc_count": trait_pc_count,
        "trait_pc": trait_pc,
        "fields": fields,
        "metrics": metrics,
    }
    legacy_hashes = [str(record.get("legacy_hash", "") or "") for record in records]
    if any(legacy_hashes):
        payload["legacy_hashes"] = legacy_hashes
    return payload


def remove_matching_files(directory: Path, pattern: str) -> None:
    if not directory.exists():
        return
    for path in directory.glob(pattern):
        if path.is_file():
            path.unlink()


def export_thumbnail_atlases(
    dataset_dir: Path,
    output_dir: Path,
    records: list[dict],
    size: int,
    quality: int,
    image_format: str,
    per_atlas: int,
    columns: int,
    budget_mib: float,
) -> dict[str, object] | None:
    if not dataset_dir.exists() or not records or size <= 0:
        return None
    thumb_dir = output_dir / "thumbs"
    thumb_dir.mkdir(parents=True, exist_ok=True)
    remove_matching_files(thumb_dir, "thumb_*.webp")
    remove_matching_files(thumb_dir, "thumb_*.avif")

    image_format = image_format.lower()
    if image_format not in {"webp", "avif"}:
        raise ValueError(f"Unsupported thumbnail format: {image_format}")
    extension = "avif" if image_format == "avif" else "webp"
    columns = max(1, min(columns, per_atlas))
    per_atlas = max(1, per_atlas)
    page_files: list[str] = []
    total_bytes = 0
    for page, start in enumerate(range(0, len(records), per_atlas)):
        page_records = records[start : start + per_atlas]
        rows = math.ceil(len(page_records) / columns)
        atlas = Image.new("RGB", (columns * size, rows * size), (0, 0, 0))
        for offset, record in enumerate(page_records):
            source = dataset_dir / str(record.get("file", ""))
            try:
                with Image.open(source) as image:
                    image = ImageOps.exif_transpose(image).convert("RGB")
                    image.thumbnail((size, size), Image.Resampling.LANCZOS)
                    x = (offset % columns) * size + (size - image.width) // 2
                    y = (offset // columns) * size + (size - image.height) // 2
                    atlas.paste(image, (x, y))
            except OSError:
                continue
        file_name = f"thumb_{page:03d}.{extension}"
        path = thumb_dir / file_name
        if image_format == "avif":
            atlas.save(path, "AVIF", quality=quality, speed=6)
        else:
            atlas.save(path, "WEBP", quality=quality, method=6)
        page_files.append(file_name)
        total_bytes += path.stat().st_size
        if (page + 1) % 5 == 0 or start + len(page_records) == len(records):
            print(f"thumbnails {start + len(page_records)}/{len(records)}", flush=True)

    if total_bytes > budget_mib * 1024 * 1024:
        for name in page_files:
            (thumb_dir / name).unlink(missing_ok=True)
        return None

    return {
        "dir": "thumbs",
        "files": page_files,
        "size": size,
        "quality": quality,
        "format": image_format,
        "columns": columns,
        "per_atlas": per_atlas,
        "count": len(records),
        "bytes": total_bytes,
    }


def reusable_thumbnail_atlas(output_dir: Path, previous_model: dict[str, object] | None) -> dict[str, object] | None:
    atlas = previous_model.get("thumbnail_atlas") if isinstance(previous_model, dict) else None
    if not isinstance(atlas, dict):
        return None
    directory = output_dir / str(atlas.get("dir", "thumbs"))
    files = [name for name in atlas.get("files", []) if isinstance(name, str)]
    if not files or not directory.exists():
        return None
    total_bytes = 0
    for name in files:
        path = directory / name
        if not path.exists() or path.stat().st_size <= 0:
            return None
        total_bytes += path.stat().st_size
    reused = dict(atlas)
    reused["bytes"] = total_bytes
    return reused


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
    parser.add_argument("--thumbnail-size", type=int, default=224)
    parser.add_argument("--thumbnail-quality", type=int, default=45)
    parser.add_argument("--thumbnail-format", choices=("webp", "avif"), default="avif")
    parser.add_argument("--thumbnail-per-atlas", type=int, default=2048)
    parser.add_argument("--thumbnail-columns", type=int, default=64)
    parser.add_argument("--thumbnail-budget-mib", type=float, default=50.0)
    parser.add_argument("--no-thumbnails", action="store_true")
    parser.add_argument(
        "--reuse-thumbnails",
        action="store_true",
        help="Reuse the existing thumbnail atlas metadata/files instead of regenerating them.",
    )
    parser.add_argument(
        "--legacy-shell-pack",
        type=Path,
        default=None,
        help="Optional previous shell pack used to keep old shellprint searches working.",
    )
    args = parser.parse_args()

    manifest = json.loads((args.processed / "manifest.json").read_text(encoding="utf-8"))
    numeric = np.load(args.processed / "fingerprints.npz")
    args.output.mkdir(parents=True, exist_ok=True)
    previous_model = load_json_maybe_gzip(args.output / "model.json")
    legacy_shell_payload = (
        load_json_maybe_gzip(args.legacy_shell_pack)
        if args.legacy_shell_pack
        else load_json_maybe_gzip(args.output / "shells.compact.json.gz")
    )
    legacy_hash_by_file = legacy_hashes_from_payload(legacy_shell_payload)

    fingerprints = numeric["fingerprints"].astype(np.float32)
    species_count = len({record["species"] for record in manifest["records"]})
    view_count = len({record["view"] for record in manifest["records"] if record.get("view")})
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
    reuse_exported_appearance_features(
        manifest["records"],
        [args.output / "shells.compact.json.gz", args.output / "shells.json"],
    )
    ensure_appearance_features(
        manifest["records"],
        args.dataset.resolve(),
        bool(manifest.get("fill_holes", False)),
        args.contour_workers,
        contour_source,
    )

    model = {
        "version": manifest["version"],
        "generated_at": manifest["generated_at"],
        "processed_count": manifest["processed_count"],
        "image_count": manifest["image_count"],
        "error_count": manifest["error_count"],
        "species_count": species_count,
        "view_count": view_count,
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
    for index, (record, fingerprint) in enumerate(zip(manifest["records"], fingerprints, strict=True)):
        solidity = contour_solidity(contour_source[index]) if contour_source is not None else 0.0
        contour_pc = (
            [quantize(value) for value in contour_scores[index][: args.record_components]]
            if contour_scores is not None
            else []
        )
        exported = {
            "id": int(record["id"]),
            "file": record["file"],
            "name": record["name"],
            "species": record["species"],
            "specimen": record["specimen"],
            "specimen_label": specimen_label(record["specimen"]),
            "view": record["view"],
            "view_label": view_label(record["view"]),
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
            "contour_solidity": quantize(solidity),
            "contour_concavity": quantize(1.0 - solidity),
            "mean_radius": quantize(record["mean_radius"]),
        }
        for field in APPEARANCE_FIELD_NAMES:
            exported[field] = quantize(record.get(field, 0.0))
        for field, value in color_pattern_features(exported).items():
            exported[field] = quantize(value)
        legacy_hash = legacy_hash_by_file.get(str(exported["file"]), "")
        if legacy_hash and legacy_hash != fingerprint_hash(exported):
            exported["legacy_hash"] = legacy_hash
        records.append(exported)

    trait_pca = None
    if records and contour_scores is not None:
        shape_trait_count = min(args.record_components, contour_scores.shape[1])
        trait_pca, trait_schema, trait_loadings = compute_trait_pca(
            records,
            args.record_components,
            shape_trait_count,
        )
        for record, trait_score in zip(records, trait_pca["scores"], strict=True):
            record["trait_pc"] = [quantize(value) for value in trait_score[: args.record_components]]
        model.update(
            {
                "trait_component_count": int(trait_pca["components"].shape[0]),
                "trait_visible_component_count": int(
                    min(args.record_components, trait_pca["components"].shape[0])
                ),
                "trait_explained_variance_ratio": [
                    quantize(value, 8) for value in trait_pca["explained_variance_ratio"]
                ],
                "trait_pca_ranges": score_ranges(trait_pca["scores"]),
                "trait_mean": [quantize(value) for value in trait_pca["mean"]],
                "trait_components": [
                    [quantize(value) for value in row]
                    for row in trait_pca["components"][
                        : min(args.record_components, trait_pca["components"].shape[0])
                    ]
                ],
                "trait_feature_schema": trait_schema,
                "trait_top_loadings": trait_loadings,
            }
        )

    if contour_scores is not None and contour_pca is not None:
        interpretation = {
            "contour": pca_interpretations(
                contour_scores,
                records,
                contour_pca["explained_variance_ratio"],
            )
        }
        if trait_pca is not None:
            interpretation["trait"] = pca_interpretations(
                trait_pca["scores"],
                records,
                trait_pca["explained_variance_ratio"],
                trait_loadings,
            )
        model["pca_interpretation"] = interpretation
    model["color_mix"] = color_mix_model(records)

    shell_file = "shells.compact.json.gz"
    model.update(
        {
            "shell_file": shell_file,
            "shell_encoding": "shell-pack-v1-gzip-json",
            "color_fingerprint_fields": DERIVED_APPEARANCE_FIELDS,
        }
    )

    write_gzip_json(args.output / shell_file, compact_shell_records(records))
    old_shell_file = args.output / "shells.json"
    if old_shell_file.exists():
        old_shell_file.unlink()

    fingerprint_file = args.output / "fingerprints.u16"
    if fingerprint_file.exists():
        fingerprint_file.unlink()
    contour_file = args.output / "contours.u16.gz"
    raw_contour_file = args.output / "contours.u16"
    if raw_contour_file.exists():
        raw_contour_file.unlink()
    if args.no_contours:
        if contour_file.exists():
            contour_file.unlink()
    elif "contours" in numeric.files:
        contours = numeric["contours"].astype(np.float32, copy=False)
        encoded_contours = np.rint(np.clip(contours * args.contour_scale, 0, 65535)).astype("<u2")
        gzip_bytes_to_file(contour_file, encoded_contours.tobytes(order="C"))
        model.update(
            {
                "contour_file": "contours.u16.gz",
                "contour_encoding": "uint16_xy_fixed",
                "contour_compression": "gzip",
                "contour_points": int(contours.shape[1]),
                "contour_scale": args.contour_scale,
            }
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
        if raw_contour_file.exists():
            gzip_bytes_to_file(contour_file, raw_contour_file.read_bytes())
            raw_contour_file.unlink()
        model.update(
            {
                "contour_file": "contours.u16.gz",
                "contour_encoding": "uint16_xy_fixed",
                "contour_compression": "gzip",
                "contour_points": args.contour_points,
                "contour_scale": args.contour_scale,
            }
        )

    legacy = args.output / "fingerprints.f32"
    if legacy.exists():
        legacy.unlink()

    if args.no_thumbnails:
        thumb_dir = args.output / "thumbs"
        remove_matching_files(thumb_dir, "thumb_*.webp")
    elif args.reuse_thumbnails:
        thumbnail_atlas = reusable_thumbnail_atlas(args.output, previous_model)
        if thumbnail_atlas is None:
            raise FileNotFoundError("Cannot reuse thumbnails because the existing atlas is incomplete")
        model["thumbnail_atlas"] = thumbnail_atlas
    else:
        thumbnail_atlas = export_thumbnail_atlases(
            args.dataset.resolve(),
            args.output,
            records,
            args.thumbnail_size,
            args.thumbnail_quality,
            args.thumbnail_format,
            args.thumbnail_per_atlas,
            args.thumbnail_columns,
            args.thumbnail_budget_mib,
        )
        if thumbnail_atlas is not None:
            model["thumbnail_atlas"] = thumbnail_atlas

    (args.output / "model.json").write_text(
        json.dumps(model, separators=(",", ":")),
        encoding="utf-8",
    )

    print(args.output / "model.json")
    print(args.output / shell_file)
    if contour_file.exists():
        print(contour_file)

    checksum_names = ["model.json", shell_file]
    if contour_file.exists():
        checksum_names.append("contours.u16.gz")
    thumbnail_atlas = model.get("thumbnail_atlas")
    if isinstance(thumbnail_atlas, dict):
        checksum_names.extend(
            f"{thumbnail_atlas.get('dir', 'thumbs')}/{name}"
            for name in thumbnail_atlas.get("files", [])
            if isinstance(name, str)
        )
    checksums = {name: file_checksum(args.output / name) for name in checksum_names}
    (args.output / "checksums.json").write_text(
        json.dumps(checksums, indent=2),
        encoding="utf-8",
    )
    print(args.output / "checksums.json")


if __name__ == "__main__":
    main()
