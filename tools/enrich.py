"""Enrich shell image filenames with cached species metadata.

This module is intentionally offline. It accepts image filenames, derives
species labels from names like ``Conus_textile_3_A.jpg``, joins those labels
against cached biodiversity metadata, and computes small visual traits from
the requested images.
"""

from __future__ import annotations

import csv
from datetime import datetime, timezone
import json
import os
import re
import statistics
import subprocess
from pathlib import Path
from typing import Any
from urllib.parse import urlencode
from urllib.request import urlopen

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
    "gbif_usage_key",
    "gbif_match_type",
    "gbif_confidence",
    "gbif_scientific_name",
    "gbif_canonical_name",
    "aphia_match_source",
    "aphia_candidate_count",
    "aphia_id",
    "aphia_match_type",
    "aphia_quality_status",
    "aphia_quality_flags",
    "aphia_url",
    "aphia_lsid",
    "aphia_scientific_name",
    "aphia_authority",
    "aphia_quality_status",
    "aphia_taxonomic_status",
    "aphia_unaccept_reason",
    "aphia_taxon_rank_id",
    "aphia_rank",
    "aphia_accepted_id",
    "aphia_accepted_name",
    "aphia_accepted_authority",
    "aphia_parent_id",
    "aphia_original_id",
    "aphia_superdomain",
    "aphia_kingdom",
    "aphia_subkingdom",
    "aphia_phylum",
    "aphia_subphylum",
    "aphia_superclass",
    "aphia_class",
    "aphia_subclass",
    "aphia_infraclass",
    "aphia_superorder",
    "aphia_order",
    "aphia_suborder",
    "aphia_superfamily",
    "aphia_family",
    "aphia_subfamily",
    "aphia_tribe",
    "aphia_genus",
    "aphia_subgenus",
    "aphia_species",
    "aphia_subspecies",
    "aphia_is_marine",
    "aphia_is_brackish",
    "aphia_is_fresh",
    "aphia_is_terrestrial",
    "aphia_is_extinct",
    "aphia_modified",
    "aphia_classification_id",
    "aphia_classification_path",
    "aphia_classification_ids",
    "aphia_citation",
    "family",
    "class",
    "rank",
    "gbif_status",
    "iucn_category",
    "iucn_code",
    "iucn_taxon_id",
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
]

SHELL_FIELDS = [
    "file",
    "label",
    "scientific_name",
    "lightness_mean",
    "asymmetry",
    "palette_rgb",
    "palette_weights",
]

PALETTE_SIZE = 5
MAX_PALETTE_PIXELS = 5000
GBIF_BACKFILL_CACHE = Path("dataset_enrichment/gbif/backfill_metadata.jsonl")
GBIF_TIMEOUT_SECONDS = 20


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


def has_biodiversity(row: dict[str, Any]) -> bool:
    return any(
        str(row.get(key, "")).strip()
        for key in ("gbif_usage_key", "gbif_occurrence_count", "gbif_country_count", "gbif_countries_top", "iucn_category")
    )


def rarity_proxy(count: int) -> str:
    if count >= 1000:
        return "high_gbif_evidence"
    if count >= 100:
        return "moderate_gbif_evidence"
    if count > 0:
        return "low_gbif_evidence"
    return "unknown"


def read_json_url(url: str) -> dict[str, Any]:
    try:
        with urlopen(url, timeout=GBIF_TIMEOUT_SECONDS) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception:
        payload = subprocess.check_output(
            ["curl", "--resolve", "api.gbif.org:443:130.225.43.2", "-fsSL", url],
            text=True,
            timeout=GBIF_TIMEOUT_SECONDS,
        )
        return json.loads(payload)


def country_facets(data: dict[str, Any]) -> tuple[int, int, str]:
    counts = []
    for facet in data.get("facets", []):
        if facet.get("field") == "COUNTRY":
            counts = facet.get("counts", [])
            break
    top = "; ".join(
        f"{item.get('name')}:{int(item.get('count') or 0)}"
        for item in counts[:25]
        if item.get("name")
    )
    return int(data.get("count") or 0), len([item for item in counts if item.get("name")]), top


def fetch_gbif_backfill(row: dict[str, Any]) -> dict[str, Any]:
    scientific_name = row.get("scientific_name", "")
    timestamp = datetime.now(timezone.utc).isoformat()
    match_url = "https://api.gbif.org/v1/species/match?" + urlencode({"name": scientific_name})
    match = read_json_url(match_url)
    usage_key = match.get("usageKey") or match.get("speciesKey")
    if not usage_key:
        return {
            "label": row.get("label", ""),
            "scientific_name": scientific_name,
            "name_issue": row.get("name_issue", ""),
            "local_image_count": row.get("local_image_count", ""),
            "gbif_match_type": match.get("matchType", "NONE") or "NONE",
            "gbif_confidence": str(match.get("confidence", "")),
            "gbif_status": "NO_MATCH",
            "gbif_occurrence_count": "0",
            "gbif_country_count": "0",
            "gbif_countries_top": "",
            "rarity_proxy": "unknown",
            "fetched_at": timestamp,
            "gbif_backfill_error": "no_usage_key",
        }

    occurrence_url = "https://api.gbif.org/v1/occurrence/search?" + urlencode(
        {
            "taxon_key": str(usage_key),
            "limit": "0",
            "facet": "country",
            "facetLimit": "300",
        }
    )
    occurrence = read_json_url(occurrence_url)
    occurrence_count, country_count, countries_top = country_facets(occurrence)

    iucn_category = ""
    iucn_code = ""
    iucn_taxon_id = ""
    try:
        iucn = read_json_url(f"https://api.gbif.org/v1/species/{usage_key}/iucnRedListCategory")
        iucn_category = iucn.get("category", "") or ""
        iucn_code = iucn.get("code", "") or ""
        iucn_taxon_id = str(iucn.get("iucnTaxonID", "") or "")
    except Exception:
        pass

    return {
        "label": row.get("label", ""),
        "scientific_name": scientific_name,
        "name_issue": row.get("name_issue", ""),
        "local_image_count": row.get("local_image_count", ""),
        "gbif_usage_key": str(usage_key),
        "gbif_match_type": match.get("matchType", ""),
        "gbif_confidence": str(match.get("confidence", "")),
        "gbif_status": match.get("status", ""),
        "gbif_scientific_name": match.get("scientificName", ""),
        "gbif_canonical_name": match.get("canonicalName", ""),
        "family": match.get("family", ""),
        "class": match.get("class", ""),
        "rank": match.get("rank", ""),
        "iucn_category": iucn_category,
        "iucn_code": iucn_code,
        "iucn_taxon_id": iucn_taxon_id,
        "gbif_occurrence_count": str(occurrence_count),
        "gbif_country_count": str(country_count),
        "gbif_countries_top": countries_top,
        "rarity_proxy": rarity_proxy(occurrence_count),
        "fetched_at": timestamp,
    }


def load_backfill_cache(path: Path = GBIF_BACKFILL_CACHE) -> dict[str, dict[str, Any]]:
    if not path.exists():
        return {}
    rows = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        row = json.loads(line)
        if row.get("label"):
            rows[row["label"]] = row
    return rows


def append_backfill_cache(rows: list[dict[str, Any]], path: Path = GBIF_BACKFILL_CACHE) -> None:
    if not rows:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False, separators=(",", ":")) + "\n")


def backfill_missing_gbif(rows: dict[str, dict[str, str]]) -> None:
    if os.environ.get("SHELLSPACE_GBIF_BACKFILL") != "1":
        return

    cache = load_backfill_cache()
    fetched = []
    for label, row in rows.items():
        cached = cache.get(label)
        if cached and has_biodiversity(cached):
            row.update({key: str(value) for key, value in cached.items() if key in DEFAULT_FIELDS})
            continue
        if has_biodiversity(row):
            continue
        try:
            next_row = fetch_gbif_backfill(row)
        except Exception as error:
            next_row = {
                "label": label,
                "scientific_name": row.get("scientific_name", ""),
                "gbif_backfill_error": repr(error),
                "fetched_at": datetime.now(timezone.utc).isoformat(),
            }
        fetched.append(next_row)
        if has_biodiversity(next_row):
            row.update({key: str(value) for key, value in next_row.items() if key in DEFAULT_FIELDS})
    append_backfill_cache(fetched)


def normalize_gbif_counts(rows: dict[str, dict[str, str]]) -> None:
    for row in rows.values():
        row["gbif_occurrence_count"] = str(row.get("gbif_occurrence_count", "")).strip() or "0"
        row["gbif_country_count"] = str(row.get("gbif_country_count", "")).strip() or "0"
        row["gbif_countries_top"] = str(row.get("gbif_countries_top", "")).strip()
        row["rarity_proxy"] = str(row.get("rarity_proxy", "")).strip() or "unknown"
        if not str(row.get("gbif_usage_key", "")).strip() and not str(row.get("gbif_status", "")).strip():
            row["gbif_status"] = "NO_MATCH"
        if not str(row.get("gbif_match_type", "")).strip() and row["gbif_status"] == "NO_MATCH":
            row["gbif_match_type"] = "NONE"


def load_enrichment(path: Path) -> dict[str, dict[str, str]]:
    if not path.exists():
        return {}
    with path.open(encoding="utf-8", newline="") as handle:
        rows = {row["label"]: row for row in csv.DictReader(handle, delimiter="\t")}
    for label, row in load_backfill_cache().items():
        if label in rows and has_biodiversity(row):
            rows[label].update({key: str(value) for key, value in row.items() if key in DEFAULT_FIELDS})
    backfill_missing_gbif(rows)
    normalize_gbif_counts(rows)
    return rows


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


def color_palette(
    pixels: np.ndarray,
    weights: np.ndarray | None = None,
    *,
    size: int = PALETTE_SIZE,
) -> tuple[list[list[float]], list[float]]:
    if pixels.size == 0:
        return [], []

    pixels = np.asarray(pixels, dtype=np.float32).reshape(-1, 3)
    pixels = np.clip(pixels, 0.0, 1.0)
    if weights is None:
        weights = np.ones(len(pixels), dtype=np.float32)
    else:
        weights = np.asarray(weights, dtype=np.float32).reshape(-1)
        weights = np.maximum(weights, 0.0)

    valid = np.isfinite(pixels).all(axis=1) & np.isfinite(weights) & (weights > 0)
    pixels = pixels[valid]
    weights = weights[valid]
    if len(pixels) == 0:
        return [], []

    if len(pixels) > MAX_PALETTE_PIXELS:
        step = max(1, len(pixels) // MAX_PALETTE_PIXELS)
        pixels = pixels[::step]
        weights = weights[::step]

    weights = weights / float(weights.sum())
    luminance = pixels @ np.asarray([0.2126, 0.7152, 0.0722], dtype=np.float32)
    order = np.argsort(luminance)
    sorted_pixels = pixels[order]
    sorted_weights = weights[order]
    cumulative = np.cumsum(sorted_weights)
    quantiles = np.linspace(0.08, 0.92, size)
    centers = np.asarray(
        [sorted_pixels[min(len(sorted_pixels) - 1, int(np.searchsorted(cumulative, q, side="left")))] for q in quantiles],
        dtype=np.float32,
    )

    counts = np.zeros(size, dtype=np.float32)
    labels = np.zeros(len(pixels), dtype=np.int32)
    for _ in range(8):
        distances = np.sum((pixels[:, None, :] - centers[None, :, :]) ** 2, axis=2)
        labels = np.argmin(distances, axis=1)
        counts = np.zeros(size, dtype=np.float32)
        next_centers = centers.copy()
        for index in range(size):
            cluster = labels == index
            weight = float(weights[cluster].sum())
            counts[index] = weight
            if weight > 0:
                next_centers[index] = np.average(pixels[cluster], axis=0, weights=weights[cluster])
        centers = next_centers

    center_luminance = centers @ np.asarray([0.2126, 0.7152, 0.0722], dtype=np.float32)
    order = np.argsort(center_luminance)
    centers = centers[order]
    counts = counts[order]
    if float(counts.sum()) > 0:
        counts = counts / float(counts.sum())

    return (
        [[round(float(channel), 4) for channel in color] for color in centers],
        [round(float(weight), 4) for weight in counts],
    )


def foreground_mask(gray: np.ndarray, rgb: np.ndarray) -> np.ndarray:
    border = np.concatenate([gray[0, :], gray[-1, :], gray[:, 0], gray[:, -1]])
    background = float(np.median(border))
    if background < 64.0:
        mask = gray > max(8.0, background + 8.0)
        if int(mask.sum()) < 64:
            mask = gray > max(2.0, background + 2.0)
        return mask
    if background > 192.0:
        mask = gray < min(247.0, background - 8.0)
        if int(mask.sum()) < 64:
            mask = gray < min(253.0, background - 2.0)
        return mask

    border_rgb = np.concatenate([rgb[0, :, :], rgb[-1, :, :], rgb[:, 0, :], rgb[:, -1, :]], axis=0)
    background_rgb = np.median(border_rgb, axis=0)
    distance = np.linalg.norm(rgb - background_rgb.reshape(1, 1, 3), axis=2)
    mask = distance > 0.08
    if int(mask.sum()) < 64:
        mask = np.abs(gray - background) > 8.0
    return mask


def image_traits(path: Path) -> dict[str, Any]:
    with Image.open(path) as image:
        rgb = ImageOps.exif_transpose(image).convert("RGB")
        gray = ImageOps.grayscale(rgb)

    arr = np.asarray(gray, dtype=np.float32)
    rgb_arr = np.asarray(rgb, dtype=np.float32) / 255.0
    mask = foreground_mask(arr, rgb_arr)

    if int(mask.sum()) == 0:
        colors, weights = color_palette(rgb_arr.reshape(-1, 3))
        return {
            "lightness_mean": float(arr.mean()),
            "asymmetry": 0.0,
            "palette_rgb": colors,
            "palette_weights": weights,
        }

    lightness_mean = float(arr[mask].mean())
    colors, weights = color_palette(rgb_arr[mask])

    ys, xs = np.where(mask)
    crop = mask[ys.min() : ys.max() + 1, xs.min() : xs.max() + 1]
    flipped = np.fliplr(crop)
    width = min(crop.shape[1], flipped.shape[1])
    crop = crop[:, :width]
    flipped = flipped[:, :width]
    union = np.logical_or(crop, flipped).sum()
    asymmetry = float(np.logical_xor(crop, flipped).sum() / union) if union else 0.0

    return {
        "lightness_mean": lightness_mean,
        "asymmetry": asymmetry,
        "palette_rgb": colors,
        "palette_weights": weights,
    }


def add_visual_traits(rows: list[dict[str, Any]], image_root: Path) -> list[dict[str, Any]]:
    shell_rows: list[dict[str, Any]] = []
    for row in rows:
        values: dict[str, list[float]] = {"lightness_mean": [], "asymmetry": []}
        palette_colors: list[list[float]] = []
        palette_weights: list[float] = []
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
            image_colors = traits.get("palette_rgb") or []
            image_weights = traits.get("palette_weights") or []
            shell_rows.append(
                {
                    "file": entry,
                    "label": row.get("label", ""),
                    "scientific_name": row.get("scientific_name", ""),
                    "lightness_mean": round(float(traits["lightness_mean"]), 3),
                    "asymmetry": round(float(traits["asymmetry"]), 5),
                    "palette_rgb": image_colors,
                    "palette_weights": image_weights,
                }
            )
            if image_colors and image_weights:
                scale = 1.0 / max(1, len(row.get("requested_files", [])))
                palette_colors.extend(image_colors)
                palette_weights.extend(float(weight) * scale for weight in image_weights)

        row["visual_trait_image_count"] = len(values["lightness_mean"])
        row["visual_trait_missing_count"] = missing
        row["lightness_mean"] = round(statistics.fmean(values["lightness_mean"]), 3) if values["lightness_mean"] else ""
        row["asymmetry_mean"] = round(statistics.fmean(values["asymmetry"]), 5) if values["asymmetry"] else ""
        if palette_colors and palette_weights:
            colors, weights = color_palette(np.asarray(palette_colors, dtype=np.float32), np.asarray(palette_weights, dtype=np.float32))
            row["palette_rgb"] = colors
            row["palette_weights"] = weights
        else:
            row["palette_rgb"] = []
            row["palette_weights"] = []
    return shell_rows


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
    compact = {
        "label": row.get("label", ""),
        "scientific_name": row.get("scientific_name", ""),
        "occurrence_count": row.get("gbif_occurrence_count", ""),
        "country_count": row.get("gbif_country_count", ""),
        "countries_top": row.get("gbif_countries_top", ""),
        "rarity_proxy": row.get("rarity_proxy", "unknown"),
    }
    for key, value in row.items():
        if key.startswith("aphia_") and value not in {"", None}:
            compact[key] = value
    return compact


def write_json(path: Path, species_rows: list[dict[str, Any]], shell_rows: list[dict[str, Any]], source_files: list[str]) -> None:
    payload = {
        "source_file_count": len(source_files),
        "species_count": sum(1 for row in species_rows if row.get("label")),
        "species": species_rows,
        "shell": shell_rows,
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
            writer.writerow(
                {
                    key: json.dumps(value, separators=(",", ":"), ensure_ascii=False)
                    if isinstance(value, (list, dict))
                    else value
                    for key, value in row.items()
                }
            )


def enrich_files(
    source_files: list[str],
    *,
    image_root: Path = Path("dataset"),
    enrichment_path: Path = Path("dataset_enrichment/enriched_preview.tsv"),
    compact: bool = True,
    include_files: bool = False,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    parsed = [parse_file_entry(entry) for entry in source_files]
    rows = aggregate(parsed)
    shell_rows = add_visual_traits(rows, image_root)
    rows = enrich_rows(rows, load_enrichment(enrichment_path))
    if compact:
        rows = [compact_row(row) for row in rows]

    if not include_files or compact:
        for row in rows:
            row.pop("requested_files", None)

    return rows, shell_rows


def write_enrichment(
    source_files: list[str],
    output: Path,
    *,
    image_root: Path = Path("dataset"),
    enrichment_path: Path = Path("dataset_enrichment/enriched_preview.tsv"),
    compact: bool = True,
    include_files: bool = False,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    rows, shell_rows = enrich_files(
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
        write_json(output, rows, shell_rows, source_files)
    return rows, shell_rows
