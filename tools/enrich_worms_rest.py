#!/usr/bin/env python3
"""Fetch rich WoRMS/Aphia taxonomy for local dataset labels.

This uses the official WoRMS REST endpoints instead of scraping the public
match form. It stores raw Aphia match candidates, full classification trees for
accepted Aphia IDs, a flattened match TSV, and optionally merges those fields
into the local enrichment table.
"""

from __future__ import annotations

import argparse
import csv
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
import json
from pathlib import Path
import time
from typing import Any, Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


MATCH_URL = "https://www.marinespecies.org/rest/AphiaRecordsByMatchNames"
CLASSIFICATION_URL = "https://www.marinespecies.org/rest/AphiaClassificationByAphiaID/{aphia_id}"

DEFAULT_LABELS = Path("dataset_enrichment/labels.tsv")
DEFAULT_SOURCE_DIR = Path("dataset_enrichment/sources/worms_rest")
DEFAULT_MATCHES = Path("dataset_enrichment/worms_match.tsv")
DEFAULT_ENRICHMENT = Path("dataset_enrichment/enriched_preview.tsv")

RANKS = [
    "Superdomain",
    "Domain",
    "Kingdom",
    "Subkingdom",
    "Infrakingdom",
    "Phylum",
    "Subphylum",
    "Infraphylum",
    "Parvphylum",
    "Gigaclass",
    "Megaclass",
    "Superclass",
    "Class",
    "Subclass",
    "Infraclass",
    "Subterclass",
    "Superorder",
    "Order",
    "Suborder",
    "Infraorder",
    "Parvorder",
    "Section",
    "Subsection",
    "Superfamily",
    "Epifamily",
    "Family",
    "Subfamily",
    "Supertribe",
    "Tribe",
    "Subtribe",
    "Genus",
    "Subgenus",
    "Species",
    "Subspecies",
    "Natio",
    "Variety",
    "Subvariety",
    "Forma",
    "Subforma",
]

RANK_FIELD_NAMES = {rank: f"aphia_{rank.lower().replace(' ', '_')}" for rank in RANKS}
RANK_ID_FIELD_NAMES = {rank: f"aphia_{rank.lower().replace(' ', '_')}_id" for rank in RANKS}

BASE_FIELDS = [
    "label",
    "scientific_name",
    "aphia_match_source",
    "aphia_candidate_count",
    "aphia_match_type",
    "aphia_quality_status",
    "aphia_quality_flags",
    "aphia_id",
    "aphia_url",
    "aphia_lsid",
    "aphia_scientific_name",
    "aphia_authority",
    "aphia_taxonomic_status",
    "aphia_unaccept_reason",
    "aphia_taxon_rank_id",
    "aphia_rank",
    "aphia_accepted_id",
    "aphia_accepted_name",
    "aphia_accepted_authority",
    "aphia_parent_id",
    "aphia_original_id",
    "aphia_is_marine",
    "aphia_is_brackish",
    "aphia_is_fresh",
    "aphia_is_terrestrial",
    "aphia_is_extinct",
    "aphia_modified",
    "aphia_citation",
    "aphia_classification_id",
    "aphia_classification_path",
    "aphia_classification_ids",
]

OUTPUT_FIELDS = BASE_FIELDS + list(RANK_FIELD_NAMES.values()) + list(RANK_ID_FIELD_NAMES.values())


def read_tsv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle, delimiter="\t"))


def write_tsv(path: Path, rows: list[dict[str, str]], fields: Iterable[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, delimiter="\t", fieldnames=list(fields), extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def read_jsonl_by_key(path: Path, key: str) -> dict[str, dict[str, Any]]:
    if not path.exists():
        return {}
    rows: dict[str, dict[str, Any]] = {}
    with path.open(encoding="utf-8") as handle:
        for line in handle:
            if not line.strip():
                continue
            row = json.loads(line)
            if row.get(key) is not None:
                rows[str(row[key])] = row
    return rows


def append_jsonl(path: Path, rows: Iterable[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False, separators=(",", ":")) + "\n")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def get_json(url: str, *, retries: int = 3) -> Any:
    last_error: Exception | None = None
    for attempt in range(retries):
        request = Request(url, headers={"User-Agent": "seashell-fingerprinting-enrichment/1.0"})
        try:
            with urlopen(request, timeout=90) as response:
                return json.loads(response.read().decode("utf-8"))
        except (HTTPError, URLError, TimeoutError, OSError, json.JSONDecodeError) as error:
            last_error = error
            if attempt + 1 >= retries:
                break
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"request failed for {url}: {last_error!r}")


def batched(rows: list[dict[str, str]], size: int) -> Iterable[list[dict[str, str]]]:
    for index in range(0, len(rows), size):
        yield rows[index : index + size]


def match_batch(rows: list[dict[str, str]]) -> list[dict[str, Any]]:
    names = [row["scientific_name"] for row in rows]
    query = urlencode(
        {
            "scientificnames[]": names,
            "marine_only": "false",
            "extant_only": "false",
        },
        doseq=True,
    )
    payload = get_json(f"{MATCH_URL}?{query}")
    if not isinstance(payload, list) or len(payload) != len(rows):
        raise RuntimeError(f"unexpected match payload length: got {len(payload) if isinstance(payload, list) else type(payload)}")

    fetched_at = now_iso()
    out = []
    for row, candidates in zip(rows, payload, strict=True):
        if candidates is None:
            candidates = []
        if not isinstance(candidates, list):
            candidates = [candidates]
        out.append(
            {
                "label": row["label"],
                "scientific_name": row["scientific_name"],
                "fetched_at": fetched_at,
                "candidates": candidates,
            }
        )
    return out


def fetch_matches(labels: Path, source_dir: Path, batch_size: int, force: bool, sleep_seconds: float) -> dict[str, dict[str, Any]]:
    rows = read_tsv(labels)
    match_cache = source_dir / "match_names.jsonl"
    cached = {} if force else read_jsonl_by_key(match_cache, "label")
    missing = [row for row in rows if row["label"] not in cached]

    print(f"match cache: {len(cached)} cached, {len(missing)} missing")
    for index, batch in enumerate(batched(missing, batch_size), start=1):
        print(f"fetching match batch {index}: {len(batch)} labels")
        fetched = match_batch(batch)
        append_jsonl(match_cache, fetched)
        cached.update({row["label"]: row for row in fetched})
        if sleep_seconds > 0:
            time.sleep(sleep_seconds)

    return {row["label"]: cached[row["label"]] for row in rows if row["label"] in cached}


def candidate_score(candidate: dict[str, Any]) -> tuple[int, int, int]:
    match_type = str(candidate.get("match_type") or "").lower()
    status = str(candidate.get("status") or "").lower()
    rank = str(candidate.get("rank") or "").lower()
    phylum = str(candidate.get("phylum") or "").lower()
    match_score = {"exact": 0, "exact_genus": 1, "fuzzy": 2, "phonetic": 3, "near": 4}.get(match_type, 9)
    phylum_score = 0 if phylum == "mollusca" else 1
    status_score = 0 if status == "accepted" else 1
    rank_score = 0 if rank in {"species", "subspecies"} else 1
    return match_score, phylum_score, status_score, rank_score


def best_candidate(candidates: list[dict[str, Any]]) -> dict[str, Any] | None:
    valid = [candidate for candidate in candidates if isinstance(candidate, dict) and candidate.get("AphiaID")]
    if not valid:
        return None
    return sorted(valid, key=candidate_score)[0]


def quality_fields(candidate: dict[str, Any]) -> dict[str, str]:
    if not candidate:
        return {
            "aphia_quality_status": "unmatched",
            "aphia_quality_flags": "no_aphia_match",
        }

    flags = []
    match_type = str(candidate.get("match_type") or "").lower()
    status = str(candidate.get("status") or "").lower()
    rank = str(candidate.get("rank") or "").lower()
    phylum = str(candidate.get("phylum") or "")

    if match_type and match_type != "exact":
        flags.append("non_exact_match")
    if status and status != "accepted":
        flags.append("non_accepted_status")
    if rank and rank not in {"species", "subspecies"}:
        flags.append("non_species_rank")
    if phylum and phylum != "Mollusca":
        flags.append("outside_mollusca")

    return {
        "aphia_quality_status": "review" if flags else "ok",
        "aphia_quality_flags": ";".join(flags),
    }


def fetch_classification(aphia_id: str) -> dict[str, Any]:
    url = CLASSIFICATION_URL.format(aphia_id=aphia_id)
    return {
        "aphia_id": aphia_id,
        "fetched_at": now_iso(),
        "classification": get_json(url),
    }


def fetch_classifications(
    aphia_ids: Iterable[str],
    source_dir: Path,
    *,
    force: bool,
    workers: int,
) -> dict[str, dict[str, Any]]:
    cache_path = source_dir / "classifications.jsonl"
    cached = {} if force else read_jsonl_by_key(cache_path, "aphia_id")
    ids = sorted({str(aphia_id) for aphia_id in aphia_ids if str(aphia_id).strip()})
    missing = [aphia_id for aphia_id in ids if aphia_id not in cached]
    print(f"classification cache: {len(cached)} cached, {len(missing)} missing")

    if not missing:
        return cached

    with ThreadPoolExecutor(max_workers=max(1, workers)) as executor:
        future_map = {executor.submit(fetch_classification, aphia_id): aphia_id for aphia_id in missing}
        completed = 0
        for future in as_completed(future_map):
            aphia_id = future_map[future]
            try:
                row = future.result()
            except Exception as error:
                row = {"aphia_id": aphia_id, "fetched_at": now_iso(), "error": repr(error)}
            append_jsonl(cache_path, [row])
            cached[aphia_id] = row
            completed += 1
            if completed % 100 == 0 or completed == len(missing):
                print(f"classifications fetched {completed}/{len(missing)}")

    return cached


def flatten_classification(node: Any) -> list[dict[str, Any]]:
    path: list[dict[str, Any]] = []
    current = node
    while isinstance(current, dict):
        path.append(
            {
                "AphiaID": current.get("AphiaID"),
                "rank": current.get("rank"),
                "scientificname": current.get("scientificname"),
            }
        )
        current = current.get("child")
    return path


def classification_fields(classification_row: dict[str, Any] | None) -> dict[str, str]:
    out = {field: "" for field in list(RANK_FIELD_NAMES.values()) + list(RANK_ID_FIELD_NAMES.values())}
    out["aphia_classification_path"] = ""
    out["aphia_classification_ids"] = ""
    if not classification_row or classification_row.get("error"):
        return out

    path = flatten_classification(classification_row.get("classification"))
    parts = []
    id_parts = []
    for item in path:
        rank = str(item.get("rank") or "")
        name = str(item.get("scientificname") or "")
        aphia_id = str(item.get("AphiaID") or "")
        if rank and name:
            parts.append(f"{rank}:{name}")
        if rank and aphia_id:
            id_parts.append(f"{rank}:{aphia_id}")
        if rank in RANK_FIELD_NAMES:
            out[RANK_FIELD_NAMES[rank]] = name
            out[RANK_ID_FIELD_NAMES[rank]] = aphia_id
    out["aphia_classification_path"] = " > ".join(parts)
    out["aphia_classification_ids"] = " > ".join(id_parts)
    return out


def boolish(value: Any) -> str:
    if value is None:
        return ""
    return str(value)


def flat_match_row(match: dict[str, Any], classifications: dict[str, dict[str, Any]]) -> dict[str, str]:
    candidates = match.get("candidates") if isinstance(match.get("candidates"), list) else []
    candidate = best_candidate(candidates) or {}
    accepted_id = str(candidate.get("valid_AphiaID") or candidate.get("AphiaID") or "")
    row = {
        "label": str(match.get("label") or ""),
        "scientific_name": str(match.get("scientific_name") or ""),
        "aphia_match_source": str(match.get("match_source") or "AphiaRecordsByMatchNames"),
        "aphia_candidate_count": str(len(candidates)),
        "aphia_match_type": str(candidate.get("match_type") or ""),
        **quality_fields(candidate),
        "aphia_id": str(candidate.get("AphiaID") or ""),
        "aphia_url": str(candidate.get("url") or ""),
        "aphia_lsid": str(candidate.get("lsid") or ""),
        "aphia_scientific_name": str(candidate.get("scientificname") or ""),
        "aphia_authority": str(candidate.get("authority") or ""),
        "aphia_taxonomic_status": str(candidate.get("status") or ""),
        "aphia_unaccept_reason": str(candidate.get("unacceptreason") or ""),
        "aphia_taxon_rank_id": str(candidate.get("taxonRankID") or ""),
        "aphia_rank": str(candidate.get("rank") or ""),
        "aphia_accepted_id": accepted_id,
        "aphia_accepted_name": str(candidate.get("valid_name") or ""),
        "aphia_accepted_authority": str(candidate.get("valid_authority") or ""),
        "aphia_parent_id": str(candidate.get("parentNameUsageID") or ""),
        "aphia_original_id": str(candidate.get("originalNameUsageID") or ""),
        "aphia_is_marine": boolish(candidate.get("isMarine")),
        "aphia_is_brackish": boolish(candidate.get("isBrackish")),
        "aphia_is_fresh": boolish(candidate.get("isFreshwater")),
        "aphia_is_terrestrial": boolish(candidate.get("isTerrestrial")),
        "aphia_is_extinct": boolish(candidate.get("isExtinct")),
        "aphia_modified": str(candidate.get("modified") or ""),
        "aphia_citation": str(candidate.get("citation") or ""),
        "aphia_classification_id": accepted_id,
    }
    row.update(classification_fields(classifications.get(accepted_id)))
    return row


def write_matches(matches: dict[str, dict[str, Any]], classifications: dict[str, dict[str, Any]], output: Path) -> list[dict[str, str]]:
    rows = [flat_match_row(match, classifications) for match in matches.values()]
    write_tsv(output, rows, OUTPUT_FIELDS)
    return rows


def merge_enrichment(matches: Path, enrichment: Path, output: Path) -> None:
    match_rows = {row["label"]: row for row in read_tsv(matches)}
    rows = read_tsv(enrichment)
    if not rows:
        raise RuntimeError(f"{enrichment} has no rows")

    fields = list(rows[0].keys())
    for field in OUTPUT_FIELDS:
        if field not in {"label", "scientific_name"} and field not in fields:
            fields.append(field)

    for row in rows:
        match = match_rows.get(row.get("label", ""))
        if not match:
            continue
        for field, value in match.items():
            if field not in {"label", "scientific_name"}:
                row[field] = value

    write_tsv(output, rows, fields)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--labels", type=Path, default=DEFAULT_LABELS)
    parser.add_argument("--source-dir", type=Path, default=DEFAULT_SOURCE_DIR)
    parser.add_argument("--matches", type=Path, default=DEFAULT_MATCHES)
    parser.add_argument("--enrichment", type=Path, default=DEFAULT_ENRICHMENT)
    parser.add_argument("--output", type=Path, default=DEFAULT_ENRICHMENT)
    parser.add_argument("--batch-size", type=int, default=100)
    parser.add_argument("--sleep", type=float, default=0.2)
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--fetch-only", action="store_true")
    parser.add_argument("--merge-only", action="store_true")
    args = parser.parse_args()

    if args.batch_size <= 0:
        raise SystemExit("--batch-size must be positive")

    if args.merge_only:
        merge_enrichment(args.matches, args.enrichment, args.output)
        return

    source_dir = args.source_dir
    source_dir.mkdir(parents=True, exist_ok=True)

    matches = fetch_matches(args.labels, source_dir, args.batch_size, args.force, args.sleep)
    provisional_rows = [flat_match_row(match, {}) for match in matches.values()]
    classification_ids = [row["aphia_accepted_id"] or row["aphia_id"] for row in provisional_rows]
    classifications = fetch_classifications(classification_ids, source_dir, force=args.force, workers=args.workers)
    rows = write_matches(matches, classifications, args.matches)
    matched = sum(1 for row in rows if row.get("aphia_id"))
    classified = sum(1 for row in rows if row.get("aphia_classification_path"))
    print(f"{args.matches}: wrote {len(rows)} rows, {matched} matched, {classified} classified")

    if not args.fetch_only:
        merge_enrichment(args.matches, args.enrichment, args.output)
        print(f"{args.output}: merged Aphia fields")


if __name__ == "__main__":
    main()
