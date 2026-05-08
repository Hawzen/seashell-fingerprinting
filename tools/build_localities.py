#!/usr/bin/env python3
"""Build compact species-level locality hints from GBIF occurrence facets."""

from __future__ import annotations

import argparse
import concurrent.futures
import gzip
import hashlib
import json
import os
import tempfile
import time
import urllib.parse
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


GBIF_OCCURRENCE_URL = "https://api.gbif.org/v1/occurrence/search"
GBIF_COUNTRIES_URL = "https://api.gbif.org/v1/enumeration/country"


def load_json(path: Path) -> Any:
    opener = gzip.open if path.suffix == ".gz" else open
    with opener(path, "rt", encoding="utf-8") as handle:
        return json.load(handle)


def write_json_gzip(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with gzip.open(path, "wt", encoding="utf-8", compresslevel=9) as handle:
        json.dump(payload, handle, separators=(",", ":"))


def atomic_write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temp_name = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump(payload, handle, indent=2, sort_keys=True)
        os.replace(temp_name, path)
    finally:
        if os.path.exists(temp_name):
            os.unlink(temp_name)


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def file_checksum(path: Path) -> dict[str, Any]:
    return {"bytes": path.stat().st_size, "sha256": sha256_file(path)}


def request_json(url: str, timeout: float, retries: int) -> Any:
    last_error: Exception | None = None
    for attempt in range(retries + 1):
        try:
            request = urllib.request.Request(url, headers={"User-Agent": "Shellspace locality builder"})
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            last_error = error
            if error.code == 429:
                retry_after = error.headers.get("Retry-After")
                wait = float(retry_after) if retry_after and retry_after.isdigit() else min(45.0, 8.0 * (attempt + 1))
                time.sleep(wait)
                continue
            time.sleep(min(2.5, 0.4 * (attempt + 1)))
        except Exception as error:  # noqa: BLE001 - keep cache generation resilient.
            last_error = error
            time.sleep(min(2.5, 0.4 * (attempt + 1)))
    raise RuntimeError(str(last_error))


def species_names_from_shell_pack(path: Path) -> list[str]:
    payload = load_json(path)
    names = payload.get("species_names")
    if not isinstance(names, list) or not names:
        raise ValueError(f"{path} does not look like a compact shell pack with species_names")
    return [str(name) for name in names]


def load_country_map(timeout: float, retries: int) -> dict[str, dict[str, str]]:
    rows = request_json(GBIF_COUNTRIES_URL, timeout, retries)
    countries: dict[str, dict[str, str]] = {}
    for row in rows:
        iso2 = row.get("iso2")
        if not iso2:
            continue
        countries[str(iso2)] = {
            "title": str(row.get("title") or iso2),
            "region": str(row.get("gbifRegion") or "UNKNOWN"),
        }
    return countries


def load_cache(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}
    if not isinstance(payload, dict):
        return {}
    return payload


def fetch_species_locality(species: str, timeout: float, retries: int, facet_limit: int) -> tuple[str, dict[str, Any]]:
    params = urllib.parse.urlencode(
        {
            "scientificName": species,
            "hasCoordinate": "true",
            "limit": 0,
            "facet": "country",
            "facetLimit": facet_limit,
        },
    )
    url = f"{GBIF_OCCURRENCE_URL}?{params}"
    try:
        payload = request_json(url, timeout, retries)
        facets = payload.get("facets") or []
        country_counts: list[list[Any]] = []
        for facet in facets:
            if facet.get("field") != "COUNTRY":
                continue
            for count in facet.get("counts") or []:
                code = str(count.get("name") or "").upper()
                if not code or code == "UNKNOWN":
                    continue
                country_counts.append([code, int(count.get("count") or 0)])
            break
        return species, {
            "status": "ok",
            "total": int(payload.get("count") or 0),
            "countries": country_counts,
        }
    except Exception as error:  # noqa: BLE001 - failed species should not block the whole export.
        return species, {"status": "error", "error": str(error), "total": 0, "countries": []}


def region_label(region: str) -> str:
    return region.replace("_", " ").title() if region else "Unknown"


def build_payload(species_names: list[str], cache: dict[str, Any], countries: dict[str, dict[str, str]]) -> dict[str, Any]:
    used_countries: dict[str, dict[str, str]] = {}
    primary_country_codes: list[str] = []
    region_keys: list[str] = []
    total_occurrences: list[int] = []
    primary_country_counts: list[int] = []
    top_country_codes: list[list[str]] = []
    top_country_counts: list[list[int]] = []

    for species in species_names:
        entry = cache.get(species) if isinstance(cache.get(species), dict) else {}
        counts = entry.get("countries") if isinstance(entry.get("countries"), list) else []
        valid_counts: list[tuple[str, int]] = []
        for row in counts:
            if not isinstance(row, list) or len(row) < 2:
                continue
            code = str(row[0]).upper()
            count = int(row[1] or 0)
            if code in countries and count > 0:
                valid_counts.append((code, count))
                used_countries[code] = countries[code]
        primary_code = valid_counts[0][0] if valid_counts else ""
        primary_count = valid_counts[0][1] if valid_counts else 0
        region = countries.get(primary_code, {}).get("region", "") if primary_code else ""

        primary_country_codes.append(primary_code)
        region_keys.append(region)
        total_occurrences.append(int(entry.get("total") or 0))
        primary_country_counts.append(primary_count)
        top_country_codes.append([code for code, _count in valid_counts[:5]])
        top_country_counts.append([count for _code, count in valid_counts[:5]])

    matched = sum(1 for code in primary_country_codes if code)
    regions = sorted({region for region in region_keys if region})
    return {
        "encoding": "shell-localities-v1",
        "source": "GBIF occurrence country facets with coordinates",
        "source_url": GBIF_OCCURRENCE_URL,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "species_count": len(species_names),
        "matched_species_count": matched,
        "match_rate": round(matched / max(1, len(species_names)), 6),
        "species_names": species_names,
        "primary_country_codes": primary_country_codes,
        "primary_country_counts": primary_country_counts,
        "top_country_codes": top_country_codes,
        "top_country_counts": top_country_counts,
        "total_occurrences": total_occurrences,
        "region_keys": region_keys,
        "region_labels": {region: region_label(region) for region in regions},
        "countries": used_countries,
    }


def update_model_and_checksums(output: Path, model_path: Path | None, checksums_path: Path | None) -> None:
    if model_path and model_path.exists():
        model = json.loads(model_path.read_text(encoding="utf-8"))
        model["locality_file"] = output.name
        model["locality_source"] = "GBIF occurrence country facets"
        model_path.write_text(json.dumps(model, separators=(",", ":")), encoding="utf-8")
    if checksums_path and checksums_path.exists():
        checksums = json.loads(checksums_path.read_text(encoding="utf-8")) if checksums_path.exists() else {}
        checksums[output.name] = file_checksum(output)
        if model_path and model_path.exists():
            checksums[model_path.name] = file_checksum(model_path)
        checksums_path.write_text(json.dumps(checksums, indent=2), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--shell-pack", type=Path, default=Path("public/data/shells.compact.json.gz"))
    parser.add_argument("--output", type=Path, default=Path("public/data/localities.compact.json.gz"))
    parser.add_argument("--cache", type=Path, default=Path("processed/localities.gbif.json"))
    parser.add_argument("--model", type=Path, default=Path("public/data/model.json"))
    parser.add_argument("--checksums", type=Path, default=Path("public/data/checksums.json"))
    parser.add_argument("--workers", type=int, default=10)
    parser.add_argument("--timeout", type=float, default=20.0)
    parser.add_argument("--retries", type=int, default=2)
    parser.add_argument("--facet-limit", type=int, default=5)
    parser.add_argument("--limit", type=int, default=0, help="Only query the first N species, for testing.")
    parser.add_argument("--offline", action="store_true", help="Only pack the existing cache; do not query GBIF.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    species_names = species_names_from_shell_pack(args.shell_pack)
    if args.limit:
        species_names = species_names[: args.limit]
    countries = load_country_map(args.timeout, args.retries)
    cache = load_cache(args.cache)
    pending = [] if args.offline else [
        species for species in species_names if species not in cache or cache[species].get("status") == "error"
    ]
    completed = 0
    if pending:
        with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, args.workers)) as executor:
            futures = [
                executor.submit(fetch_species_locality, species, args.timeout, args.retries, args.facet_limit)
                for species in pending
            ]
            for future in concurrent.futures.as_completed(futures):
                species, entry = future.result()
                cache[species] = entry
                completed += 1
                if completed % 100 == 0:
                    atomic_write_json(args.cache, cache)
                    print(f"queried {completed}/{len(pending)} species", flush=True)
    atomic_write_json(args.cache, cache)
    payload = build_payload(species_names, cache, countries)
    write_json_gzip(args.output, payload)
    update_model_and_checksums(args.output, args.model, args.checksums)
    print(args.output)
    print(f"matched {payload['matched_species_count']}/{payload['species_count']} species")


if __name__ == "__main__":
    main()
