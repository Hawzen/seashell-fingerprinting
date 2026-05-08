#!/usr/bin/env python3
"""Build a compact species-traits pack for Shellspace."""

from __future__ import annotations

import argparse
from collections import Counter
from datetime import datetime, timezone
import gzip
import hashlib
import json
from pathlib import Path
from typing import Any


RARITY_LABELS = ["Common", "Uncommon", "Rare", "Extremely rare", "Data deficient"]
PROTECTION_LABELS = ["Not assessed"]
GBIF_OCCURRENCE_URL = "https://api.gbif.org/v1/occurrence/search"
DATASET_URL = "https://www.nature.com/articles/s41597-019-0230-3"


def load_json(path: Path) -> Any:
    opener = gzip.open if path.suffix == ".gz" else open
    with opener(path, "rt", encoding="utf-8") as handle:
        return json.load(handle)


def write_json_gzip(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with gzip.open(path, "wt", encoding="utf-8", compresslevel=9) as handle:
        json.dump(payload, handle, separators=(",", ":"))


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def file_checksum(path: Path) -> dict[str, Any]:
    return {"bytes": path.stat().st_size, "sha256": sha256_file(path)}


def genus_of(species: str) -> str:
    return species.split(" ", 1)[0] if species else ""


def rarity_code(observations: int, country_count: int, sample_count: int) -> int:
    """A coarse commonness bucket, not a population estimate."""
    if observations <= 0 and country_count <= 0 and sample_count <= 2:
        return 4
    if observations >= 1000 or country_count >= 8 or sample_count >= 24:
        return 0
    if observations >= 100 or country_count >= 4 or sample_count >= 10:
        return 1
    if observations >= 10 or country_count >= 2 or sample_count >= 4:
        return 2
    return 3


def rarity_reason(code: int, observations: int, country_count: int, sample_count: int) -> str:
    if code == 4:
        return "insufficient external signal"
    if observations >= 1000 or country_count >= 8:
        return "broad observation signal"
    if observations >= 100 or country_count >= 4:
        return "moderate observation signal"
    if observations >= 10 or country_count >= 2:
        return "thin observation signal"
    if sample_count >= 24:
        return "frequent in this image set"
    if sample_count >= 10:
        return "several specimens in this image set"
    if sample_count >= 4:
        return "few specimens in this image set"
    return "very little supporting signal"


def build_traits(shell_pack: dict[str, Any], localities: dict[str, Any]) -> dict[str, Any]:
    species_names = shell_pack["species_names"]
    sample_counts = Counter(shell_pack["species"])
    locality_names = localities.get("species_names", [])
    locality_index = {name: index for index, name in enumerate(locality_names)}

    genera: list[str] = []
    dataset_sample_count: list[int] = []
    observation_count: list[int] = []
    known_range_country_codes: list[list[str]] = []
    known_range_country_counts: list[list[int]] = []
    country_count: list[int] = []
    primary_country_codes: list[str] = []
    region_keys: list[str] = []
    rarity: list[int] = []
    rarity_reasons: list[str] = []
    commonness: list[str] = []

    for index, species in enumerate(species_names):
        locality_position = locality_index.get(species)
        samples = int(sample_counts.get(index, 0))
        if locality_position is None:
            observations = 0
            range_codes: list[str] = []
            range_counts: list[int] = []
            primary_country = ""
            region = ""
        else:
            observations = int(localities.get("total_occurrences", [])[locality_position] or 0)
            range_codes = list(localities.get("top_country_codes", [])[locality_position] or [])
            range_counts = [int(count) for count in (localities.get("top_country_counts", [])[locality_position] or [])]
            primary_country = str(localities.get("primary_country_codes", [])[locality_position] or "")
            region = str(localities.get("region_keys", [])[locality_position] or "")

        code = rarity_code(observations, len(range_codes), samples)
        genera.append(genus_of(species))
        dataset_sample_count.append(samples)
        observation_count.append(observations)
        known_range_country_codes.append(range_codes)
        known_range_country_counts.append(range_counts)
        country_count.append(len(range_codes))
        primary_country_codes.append(primary_country)
        region_keys.append(region)
        rarity.append(code)
        rarity_reasons.append(rarity_reason(code, observations, len(range_codes), samples))
        commonness.append(RARITY_LABELS[code])

    return {
        "encoding": "shell-species-traits-v1",
        "source": "Derived from dataset sample counts and GBIF occurrence country facets",
        "source_urls": [DATASET_URL, GBIF_OCCURRENCE_URL],
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "species_count": len(species_names),
        "species": species_names,
        "species_names": species_names,
        "genus": genera,
        "rarity_labels": RARITY_LABELS,
        "rarity": rarity,
        "rarity_reasons": rarity_reasons,
        "commonness": commonness,
        "dataset_sample_count": dataset_sample_count,
        "observation_count": observation_count,
        "known_range": known_range_country_codes,
        "known_range_country_codes": known_range_country_codes,
        "known_range_country_counts": known_range_country_counts,
        "country_count": country_count,
        "primary_country_codes": primary_country_codes,
        "region_keys": region_keys,
        "region_labels": localities.get("region_labels", {}),
        "countries": localities.get("countries", {}),
        "protection_status_labels": PROTECTION_LABELS,
        "protection_status": [0] * len(species_names),
        "market_price_usd": [None] * len(species_names),
    }


def update_model_and_checksums(output: Path, model_path: Path, checksums_path: Path) -> None:
    model = load_json(model_path)
    model["species_traits_file"] = output.name
    model["species_traits_source"] = "Derived species traits with coarse rarity buckets"
    model_path.write_text(json.dumps(model, separators=(",", ":")), encoding="utf-8")

    checksums = load_json(checksums_path)
    checksums[output.name] = file_checksum(output)
    checksums[model_path.name] = file_checksum(model_path)
    checksums_path.write_text(json.dumps(checksums, indent=2), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--shell-pack", type=Path, default=Path("public/data/shells.compact.json.gz"))
    parser.add_argument("--localities", type=Path, default=Path("public/data/localities.compact.json.gz"))
    parser.add_argument("--output", type=Path, default=Path("public/data/species_traits.compact.json.gz"))
    parser.add_argument("--model", type=Path, default=Path("public/data/model.json"))
    parser.add_argument("--checksums", type=Path, default=Path("public/data/checksums.json"))
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    shell_pack = load_json(args.shell_pack)
    localities = load_json(args.localities)
    traits = build_traits(shell_pack, localities)
    write_json_gzip(args.output, traits)
    update_model_and_checksums(args.output, args.model, args.checksums)
    print(args.output)


if __name__ == "__main__":
    main()
