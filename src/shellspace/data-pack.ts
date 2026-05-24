// @ts-nocheck

import { state } from './runtime';
import { asset, fetchCompressedArrayBuffer, fetchJson } from './utils';

export function speciesFromFileName(fileName) {
  return String(fileName || "")
    .replace(/\.[^.]+$/, "")
    .replace(/_\d+_[A-Z]$/i, "")
    .replace(/_/g, " ")
    .trim() || "Unknown shell";
}

export function speciesLabelFromFileName(fileName) {
  return String(fileName || "")
    .replace(/\.[^.]+$/, "")
    .replace(/_\d+_[A-Z]$/i, "")
    .trim();
}

async function fetchOptionalJson(url) {
  try {
    return await fetchJson(url);
  } catch {
    return null;
  }
}

export function pcaRanges(scores, count, pcaSize) {
  const ranges = [];
  for (let pc = 0; pc < pcaSize; pc += 1) {
    const values = [];
    for (let id = 0; id < count; id += 1) values.push(scores[id * pcaSize + pc] || 0);
    values.sort((a, b) => a - b);
    const at = (q) => values[Math.min(values.length - 1, Math.max(0, Math.round((values.length - 1) * q)))] || 0;
    const min = values[0] || 0;
    const max = values.at(-1) || 0;
    const p01 = at(0.01);
    const p99 = at(0.99);
    const span = Math.max(0.001, p99 - p01, max - min);
    ranges.push({
      min: min - span * 0.08,
      max: max + span * 0.08,
      p01: p01 - span * 0.08,
      p99: p99 + span * 0.08,
    });
  }
  return ranges;
}

export async function shellprintFromFingerprint(fingerprint) {
  const bytes = new Uint8Array(fingerprint.buffer, fingerprint.byteOffset, fingerprint.byteLength);
  const copy = new Uint8Array(bytes.length);
  copy.set(bytes);
  const digest = await crypto.subtle.digest("SHA-256", copy);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 6)
    .toUpperCase();
}

export function reconstructContourFromFingerprint(fingerprint, samples = 256) {
  const harmonics = Math.floor(fingerprint.length / 4);
  const contour = new Float32Array(samples * 2);
  for (let point = 0; point < samples; point += 1) {
    const t = point / samples;
    let x = 0;
    let y = 0;
    for (let index = 0; index < harmonics; index += 1) {
      const harmonic = index + 1;
      const offset = index * 4;
      const posR = fingerprint[offset] || 0;
      const posI = fingerprint[offset + 1] || 0;
      const negR = fingerprint[offset + 2] || 0;
      const negI = fingerprint[offset + 3] || 0;
      const angle = Math.PI * 2 * harmonic * t;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      x += posR * cos - posI * sin + negR * cos + negI * sin;
      y += posR * sin + posI * cos + negI * cos - negR * sin;
    }
    contour[point * 2] = x;
    contour[point * 2 + 1] = y;
  }
  return contour;
}

export function fingerprintFromPcValues(values) {
  const mean = state.model?.fingerprint_mean || [];
  const components = state.model?.fingerprint_components || [];
  if (!mean.length || !components.length) return null;
  const fingerprint = new Float32Array(mean);
  for (let pc = 0; pc < Math.min(values.length, components.length); pc += 1) {
    const component = components[pc] || [];
    for (let index = 0; index < Math.min(fingerprint.length, component.length); index += 1) {
      fingerprint[index] += (values[pc] || 0) * component[index];
    }
  }
  return fingerprint;
}

export function projectFingerprintToPca(fingerprint) {
  const mean = state.model?.fingerprint_mean || [];
  const components = state.model?.fingerprint_components || [];
  return components.map((component) => {
    let score = 0;
    for (let index = 0; index < Math.min(fingerprint.length, mean.length, component.length); index += 1) {
      score += (fingerprint[index] - mean[index]) * component[index];
    }
    return score;
  });
}

export async function loadNewFingerprintPack() {
  const [files, pcaModel, fingerprintBuffer, pcaBuffer, enrichment] = await Promise.all([
    fetchJson(asset("data/files.json")),
    fetchJson(asset("data/pca_model.json")),
    fetchCompressedArrayBuffer(asset("data/fingerprints.f32")),
    fetchCompressedArrayBuffer(asset("data/pca.f32")),
    fetchOptionalJson(asset("data/enrichment.json")),
  ]);
  const enrichmentByLabel = new Map((enrichment?.rows || []).map((row) => [row.label, row]));
  const count = files.length;
  const fingerprints = new Float32Array(fingerprintBuffer);
  const pcaScores = new Float32Array(pcaBuffer);
  const fingerprintSize = Math.floor(fingerprints.length / count);
  const pcaSize = Math.floor(pcaScores.length / count);
  const model = {
    processed_count: count,
    species_count: new Set(files.map(speciesFromFileName)).size,
    contour_points: 256,
    contour_scale: 1,
    contour_component_count: pcaSize,
    contour_visible_component_count: Math.min(6, pcaSize),
    contour_pca_ranges: pcaRanges(pcaScores, count, pcaSize),
    contour_explained_variance_ratio: Array.from({ length: pcaSize }, () => 0),
    fingerprint_mean: pcaModel.mean || [],
    fingerprint_components: pcaModel.components || [],
  };
  const shells = await Promise.all(files.map(async (file, id) => {
    const fingerprint = fingerprints.slice(id * fingerprintSize, (id + 1) * fingerprintSize);
    const contourPc = Array.from(pcaScores.slice(id * pcaSize, (id + 1) * pcaSize));
    const enrichmentRow = enrichmentByLabel.get(speciesLabelFromFileName(file)) || {};
    return {
      id,
      file,
      species: speciesFromFileName(file),
      specimen: "",
      specimen_label: "",
      view: "",
      view_label: "",
      name: speciesFromFileName(file),
      contour_pc: contourPc,
      trait_pc: [],
      fingerprint,
      fingerprint_hash: await shellprintFromFingerprint(fingerprint),
      enrichment: enrichmentRow,
      rarity_label: enrichmentRow.rarity_proxy || "unknown",
      gbif_occurrence_count: Number(enrichmentRow.occurrence_count || 0),
      gbif_country_count: Number(enrichmentRow.country_count || 0),
      gbif_countries_top: enrichmentRow.countries_top || "",
      color_l_mean: Number(enrichmentRow.lightness_mean || 0) / 255,
      morph_traits: {
        asymmetry: Number(enrichmentRow.asymmetry_mean || 0),
      },
    };
  }));
  return { model, shells };
}

export function unpackShells(payload) {
  if (Array.isArray(payload?.records)) return payload.records;
  if (payload?.encoding !== "shell-pack-v1") {
    throw new Error("Unsupported shell data pack.");
  }
  const count = payload.count || 0;
  const metrics = payload.metrics || {};
  const fields = payload.fields || Object.keys(metrics);
  const contourPcCount = payload.contour_pc_count || 0;
  const traitPcCount = payload.trait_pc_count || 0;
  const shells = [];
  for (let id = 0; id < count; id += 1) {
    const speciesIndex = payload.species?.[id] ?? 0;
    const specimenIndex = payload.specimens?.[id] ?? 0;
    const viewIndex = payload.views?.[id] ?? 0;
    const shell = {
      id,
      file: payload.files?.[id] || "",
      species: payload.species_names?.[speciesIndex] || "Unknown shell",
      specimen: payload.specimen_values?.[specimenIndex] || "",
      specimen_label: payload.specimen_labels?.[specimenIndex] || "Unknown specimen",
      view: payload.view_values?.[viewIndex] || "",
      view_label: payload.view_labels?.[viewIndex] || "Unknown view",
      area: payload.area?.[id] || 0,
      center: [payload.centers?.[id * 2] || 0, payload.centers?.[id * 2 + 1] || 0],
      image_width: payload.dims?.[id * 2] || 0,
      image_height: payload.dims?.[id * 2 + 1] || 0,
      bbox: [
        payload.bbox?.[id * 4] || 0,
        payload.bbox?.[id * 4 + 1] || 0,
        payload.bbox?.[id * 4 + 2] || 0,
        payload.bbox?.[id * 4 + 3] || 0,
      ],
      contour_pc: [],
      trait_pc: [],
      legacy_fingerprint_hash: payload.legacy_hashes?.[id] || "",
    };
    shell.name = `${shell.species} ${shell.specimen_label} ${shell.view_label}`;
    for (let pc = 0; pc < contourPcCount; pc += 1) {
      shell.contour_pc.push(payload.contour_pc?.[id * contourPcCount + pc] || 0);
    }
    for (let pc = 0; pc < traitPcCount; pc += 1) {
      shell.trait_pc.push(payload.trait_pc?.[id * traitPcCount + pc] || 0);
    }
    for (const field of fields) {
      shell[field] = metrics[field]?.[id] || 0;
    }
    shells.push(shell);
  }
  return shells;
}
