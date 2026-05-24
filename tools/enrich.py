"""Enrich shell image filenames with cached species metadata.

This module is intentionally offline. It accepts image filenames, derives
species labels from names like ``Conus_textile_3_A.jpg``, joins those labels
against cached biodiversity metadata, and computes small visual traits from
the requested images.
"""

from __future__ import annotations

import csv
import json
import re
import statistics
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image, ImageOps


FILENAME_RE = re.compile(r"^(?P<label>.+)_(?P<sample>\d+)_(?P<view>[AB])\.[^.]+$", re.IGNORECASE)

DEFAULT_FIELDS = [
    "label",
    "scientific_name",
    "requested_image_count",
    "requested_sample_count",
    "requested_views",
    "local_image_count",
    "gbif_scientific_name",
    "gbif_canonical_name",
    "family",
    "class",
    "rank",
    "gbif_status",
    "iucn_category",
    "iucn_code",
    "gbif_occurrence_count",
    "gbif_country_count",
    "gbif_countries_top",
    "rarity_proxy",
    "obis_indopacific_count",
    "obis_coordinate_count",
    "obis_lat_min",
    "obis_lat_max",
    "obis_lon_min",
    "obis_lon_max",
    "backhome_count",
    "backhome_family",
]

COMPACT_FIELDS = [
    "label",
    "scientific_name",
    "occurrence_count",
    "country_count",
    "countries_top",
    "rarity_proxy",
    "lightness_mean",
    "asymmetry_mean",
]


def load_files(path: Path) -> list[str]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, list):
        files = data
    elif isinstance(data, dict):
        for key in ("files", "images", "paths"):
            value = data.get(key)
            if isinstance(value, list):
                files = value
                break
        else:
            raise ValueError(f"{path} is an object, but it has no files/images/paths list")
    else:
        raise ValueError(f"{path} must contain a JSON list or object with files/images/paths")

    bad = [item for item in files if not isinstance(item, str)]
    if bad:
        raise ValueError(f"{path} contains non-string file entries")
    return files


def parse_file_entry(entry: str) -> dict[str, str]:
    name = Path(entry).name
    match = FILENAME_RE.match(name)
    if not match:
        return {
            "file": entry,
            "filename": name,
            "label": "",
            "scientific_name": "",
            "sample": "",
            "view": "",
            "parse_error": "expected '<Genus_species>_<sample>_<A|B>.<ext>'",
        }

    label = match.group("label")
    return {
        "file": entry,
        "filename": name,
        "label": label,
        "scientific_name": label.replace("_", " "),
        "sample": match.group("sample"),
        "view": match.group("view").upper(),
        "parse_error": "",
    }


def load_enrichment(path: Path) -> dict[str, dict[str, str]]:
    if not path.exists():
        return {}
    with path.open(encoding="utf-8", newline="") as handle:
        return {row["label"]: row for row in csv.DictReader(handle, delimiter="\t")}


def aggregate(parsed_files: list[dict[str, str]]) -> list[dict[str, Any]]:
    by_label: dict[str, dict[str, Any]] = {}
    invalid: list[dict[str, str]] = []

    for item in parsed_files:
        label = item["label"]
        if not label:
            invalid.append(item)
            continue

        row = by_label.setdefault(
            label,
            {
                "label": label,
                "scientific_name": item["scientific_name"],
                "requested_files": [],
                "requested_image_count": 0,
                "requested_samples": set(),
                "requested_views": set(),
            },
        )
        row["requested_files"].append(item["file"])
        row["requested_image_count"] += 1
        row["requested_samples"].add(item["sample"])
        row["requested_views"].add(item["view"])

    rows: list[dict[str, Any]] = []
    for row in by_label.values():
        row["requested_sample_count"] = len(row.pop("requested_samples"))
        row["requested_views"] = "".join(sorted(row["requested_views"]))
        rows.append(row)

    rows.sort(key=lambda item: item["label"])
    if invalid:
        rows.append(
            {
                "label": "",
                "scientific_name": "",
                "requested_files": [item["file"] for item in invalid],
                "requested_image_count": len(invalid),
                "requested_sample_count": "",
                "requested_views": "",
                "parse_error": "unparsed_files",
            }
        )
    return rows


def resolve_image_path(entry: str, image_root: Path) -> Path | None:
    path = Path(entry)
    candidates = []
    if path.is_absolute():
        candidates.append(path)
    else:
        candidates.append(path)
        candidates.append(image_root / path)
        candidates.append(image_root / path.name)

    for candidate in candidates:
        if candidate.exists():
            return candidate
    return None


def image_traits(path: Path) -> dict[str, float]:
    with Image.open(path) as image:
        rgb = ImageOps.exif_transpose(image).convert("RGB")
        gray = ImageOps.grayscale(rgb)

    arr = np.asarray(gray, dtype=np.float32)
    # The dataset images generally use a white/light background. This mask keeps
    # darker shell pixels and rejects most background without needing rembg.
    threshold = min(245.0, float(np.percentile(arr, 92)))
    mask = arr < threshold
    if int(mask.sum()) < 64:
        mask = arr < 250.0

    if int(mask.sum()) == 0:
        return {"lightness_mean": float(arr.mean()), "asymmetry": 0.0}

    lightness_mean = float(arr[mask].mean())

    ys, xs = np.where(mask)
    crop = mask[ys.min() : ys.max() + 1, xs.min() : xs.max() + 1]
    flipped = np.fliplr(crop)
    width = min(crop.shape[1], flipped.shape[1])
    crop = crop[:, :width]
    flipped = flipped[:, :width]
    union = np.logical_or(crop, flipped).sum()
    asymmetry = float(np.logical_xor(crop, flipped).sum() / union) if union else 0.0

    return {"lightness_mean": lightness_mean, "asymmetry": asymmetry}


def add_visual_traits(rows: list[dict[str, Any]], image_root: Path) -> None:
    for row in rows:
        values: dict[str, list[float]] = {"lightness_mean": [], "asymmetry": []}
        missing = 0
        for entry in row.get("requested_files", []):
            path = resolve_image_path(entry, image_root)
            if path is None:
                missing += 1
                continue
            try:
                traits = image_traits(path)
            except Exception:
                missing += 1
                continue
            values["lightness_mean"].append(traits["lightness_mean"])
            values["asymmetry"].append(traits["asymmetry"])

        row["visual_trait_image_count"] = len(values["lightness_mean"])
        row["visual_trait_missing_count"] = missing
        row["lightness_mean"] = round(statistics.fmean(values["lightness_mean"]), 3) if values["lightness_mean"] else ""
        row["asymmetry_mean"] = round(statistics.fmean(values["asymmetry"]), 5) if values["asymmetry"] else ""


def enrich_rows(rows: list[dict[str, Any]], enrichment: dict[str, dict[str, str]]) -> list[dict[str, Any]]:
    enriched = []
    for row in rows:
        metadata = enrichment.get(row["label"], {})
        merged = dict(row)
        for key, value in metadata.items():
            if key in {"label", "scientific_name"}:
                continue
            merged[key] = value
        merged["enrichment_found"] = bool(metadata)
        enriched.append(merged)
    return enriched


def compact_row(row: dict[str, Any]) -> dict[str, Any]:
    return {
        "label": row.get("label", ""),
        "scientific_name": row.get("scientific_name", ""),
        "occurrence_count": row.get("gbif_occurrence_count", ""),
        "country_count": row.get("gbif_country_count", ""),
        "countries_top": row.get("gbif_countries_top", ""),
        "rarity_proxy": row.get("rarity_proxy", "unknown"),
        "lightness_mean": row.get("lightness_mean", ""),
        "asymmetry_mean": row.get("asymmetry_mean", ""),
    }


def write_json(path: Path, rows: list[dict[str, Any]], source_files: list[str]) -> None:
    payload = {
        "source_file_count": len(source_files),
        "species_count": sum(1 for row in rows if row.get("label")),
        "rows": rows,
    }
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_tsv(path: Path, rows: list[dict[str, Any]], fields: list[str] | None = None) -> None:
    fields = list(fields or DEFAULT_FIELDS)
    for row in rows:
        for key in row:
            if key not in fields and key != "requested_files":
                fields.append(key)

    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, delimiter="\t", fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def enrich_files(
    source_files: list[str],
    *,
    image_root: Path = Path("dataset"),
    enrichment_path: Path = Path("dataset_enrichment/enriched_preview.tsv"),
    compact: bool = True,
    include_files: bool = False,
) -> list[dict[str, Any]]:
    parsed = [parse_file_entry(entry) for entry in source_files]
    rows = aggregate(parsed)
    add_visual_traits(rows, image_root)
    rows = enrich_rows(rows, load_enrichment(enrichment_path))
    if compact:
        rows = [compact_row(row) for row in rows]

    if not include_files or compact:
        for row in rows:
            row.pop("requested_files", None)

    return rows


def write_enrichment(
    source_files: list[str],
    output: Path,
    *,
    image_root: Path = Path("dataset"),
    enrichment_path: Path = Path("dataset_enrichment/enriched_preview.tsv"),
    compact: bool = True,
    include_files: bool = False,
) -> list[dict[str, Any]]:
    rows = enrich_files(
        source_files,
        image_root=image_root,
        enrichment_path=enrichment_path,
        compact=compact,
        include_files=include_files,
    )
    output.parent.mkdir(parents=True, exist_ok=True)
    if output.suffix.lower() == ".tsv":
        write_tsv(output, rows, COMPACT_FIELDS if compact else None)
    else:
        write_json(output, rows, source_files)
    return rows
