// @ts-nocheck

import { speciesColor } from './map-scatter';
import { els, state } from './runtime';

export function asset(path) {
  return new URL(`public/${path}`, document.baseURI).toString();
}

export function datasetAsset(path) {
  return new URL(`dataset/${encodeURIComponent(path).replaceAll("%2F", "/")}`, document.baseURI).toString();
}

export function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

export function formatNumber(value, digits = 3) {
  return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: digits });
}

export function percentValue(value) {
  return `${Math.round(clamp01(value) * 100)}%`;
}

export function precisePercentValue(value) {
  return `${formatNumber(clamp01(value) * 100, 1)}%`;
}

export function relativeArea(shell) {
  return clamp01((shell?.area || 0) / Math.max(1, (shell?.image_width || 0) * (shell?.image_height || 0)));
}

export function relativeMeanRadius(shell) {
  return clamp01((shell?.mean_radius || 0) / Math.max(1, Math.min(shell?.image_width || 1, shell?.image_height || 1)));
}

export function contourRoughness(contour) {
  if (!contour || contour.length < 8) return null;
  const count = Math.floor(contour.length / 2);
  let centerX = 0;
  let centerY = 0;
  for (let index = 0; index < count; index += 1) {
    centerX += Number(contour[index * 2] || 0);
    centerY += Number(contour[index * 2 + 1] || 0);
  }
  centerX /= count;
  centerY /= count;

  const radii = [];
  for (let index = 0; index < count; index += 1) {
    const x = Number(contour[index * 2] || 0) - centerX;
    const y = Number(contour[index * 2 + 1] || 0) - centerY;
    const radius = Math.hypot(x, y);
    if (Number.isFinite(radius) && radius > 1e-6) radii.push(radius);
  }
  if (radii.length < 4) return null;
  const mean = radii.reduce((sum, radius) => sum + radius, 0) / radii.length;
  if (mean <= 1e-6) return null;
  const window = Math.max(2, Math.round(radii.length * 0.035));
  let rough = 0;
  for (let index = 0; index < radii.length; index += 1) {
    let local = 0;
    let used = 0;
    for (let offset = -window; offset <= window; offset += 1) {
      local += radii[(index + offset + radii.length) % radii.length];
      used += 1;
    }
    rough += Math.abs(radii[index] - local / used);
  }
  return clamp01((rough / radii.length) / mean);
}

export function datasetCmScale(shell) {
  const width = Math.max(1, shell?.image_width || 400);
  const height = Math.max(1, shell?.image_height || 300);
  const longSide = Math.max(width, height);
  const longSideCm = 10.0;
  return {
    cmPerImageUnit: longSideCm / longSide,
    widthCm: (width / longSide) * longSideCm,
    heightCm: (height / longSide) * longSideCm,
    longSideCm,
  };
}

export function shellAreaCm2(shell) {
  const scale = datasetCmScale(shell);
  return (shell?.area || 0) * scale.cmPerImageUnit * scale.cmPerImageUnit;
}

export function shellMeanRadiusCm(shell) {
  return (shell?.mean_radius || 0) * datasetCmScale(shell).cmPerImageUnit;
}

export function setLoading(text, visible = true) {
  if (els.loadingText && text) els.loadingText.textContent = text;
  if (els.loadingOverlay) els.loadingOverlay.hidden = !visible;
}

export function hashString(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function fingerprintHash(shell) {
  if (shell?.fingerprint_hash) return shell.fingerprint_hash;
  const pcs = (shell.contour_pc || []).slice(0, 6).map((value) => Number(value || 0).toFixed(4));
  const seed = `${shell.species}|${shell.specimen}|${shell.view}|${pcs.join(",")}`;
  return hashString(seed).toString(36).toUpperCase().padStart(6, "0").slice(-6);
}

export function applyFingerprintStyle(node, hash) {
  const hue = hashString(hash) % 360;
  node.style.setProperty("--hash-hue", String(hue));
  node.textContent = hash;
}

export function applyShellFingerprintStyle(node, shell, hash = shell?.fingerprint_hash) {
  if (!node || !hash) return;
  const color = rgbToHsl(shell?.color_r_mean ?? 0.68, shell?.color_g_mean ?? 0.62, shell?.color_b_mean ?? 0.52);
  node.style.setProperty("--hash-hue", String(Math.round(color.h)));
  node.style.setProperty("--hash-saturation", `${Math.round(Math.max(0.28, color.s) * 100)}%`);
  node.style.setProperty("--hash-lightness", `${Math.round(Math.max(0.3, Math.min(0.72, color.l)) * 100)}%`);
  node.textContent = hash;
}

export function rgbToHsl(red, green, blue) {
  const r = clamp01(red);
  const g = clamp01(green);
  const b = clamp01(blue);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return { h: h * 360, s, l };
}

export function hslCss(h, s, l) {
  return `hsl(${((h % 360) + 360) % 360}, ${Math.round(clamp01(s) * 100)}%, ${Math.round(clamp01(l) * 100)}%)`;
}

export function hslToRgba(h, s, l, alpha = 1) {
  const hue = (((h % 360) + 360) % 360) / 360;
  const sat = clamp01(s);
  const light = clamp01(l);
  if (sat === 0) {
    const value = Math.round(light * 255);
    return [value, value, value, Math.round(clamp01(alpha) * 255)];
  }
  const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat;
  const p = 2 * light - q;
  const channel = (offset) => {
    let t = hue + offset;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [
    Math.round(channel(1 / 3) * 255),
    Math.round(channel(0) * 255),
    Math.round(channel(-1 / 3) * 255),
    Math.round(clamp01(alpha) * 255),
  ];
}

export function physicalLocationLabel(shell) {
  return shell.location_label || "Locality unavailable";
}

export function regionLabel(localityPayload, key) {
  if (!key) return "";
  return localityPayload?.region_labels?.[key] || key.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function countryLabel(localityPayload, code) {
  return localityPayload?.countries?.[code]?.title || code;
}

export function buildLocalityLookup(localityPayload) {
  const lookup = new Map();
  if (localityPayload?.encoding !== "shell-localities-v1") return lookup;
  const names = localityPayload.species_names || [];
  for (let index = 0; index < names.length; index += 1) {
    const country = localityPayload.primary_country_codes?.[index] || "";
    const region = localityPayload.region_keys?.[index] || "";
    const total = localityPayload.total_occurrences?.[index] || 0;
    const topCodes = localityPayload.top_country_codes?.[index] || [];
    const topCounts = localityPayload.top_country_counts?.[index] || [];
    const countryName = country ? countryLabel(localityPayload, country) : "";
    const regionName = regionLabel(localityPayload, region);
    const topCountries = topCodes.map((code, topIndex) => ({
      code,
      label: countryLabel(localityPayload, code),
      count: topCounts[topIndex] || 0,
    }));
    lookup.set(names[index], {
      primary_country: country,
      primary_country_label: countryName,
      region_key: region,
      region_label: regionName,
      total_occurrences: total,
      top_countries: topCountries,
      location_label: countryName && regionName ? `${countryName}, ${regionName}` : countryName || regionName || "",
    });
  }
  return lookup;
}

export function buildSpeciesTraitsLookup(speciesTraitsPayload) {
  const lookup = new Map();
  if (speciesTraitsPayload?.encoding !== "shell-species-traits-v1") return lookup;
  const names = speciesTraitsPayload.species_names || [];
  const rarityLabels = speciesTraitsPayload.rarity_labels || [];
  const protectionLabels = speciesTraitsPayload.protection_status_labels || [];
  for (let index = 0; index < names.length; index += 1) {
    const countryCodes = speciesTraitsPayload.known_range_country_codes?.[index] || [];
    const countryCounts = speciesTraitsPayload.known_range_country_counts?.[index] || [];
    const rangeCountries = countryCodes.map((code, countryIndex) => ({
      code,
      label: countryLabel(speciesTraitsPayload, code),
      count: countryCounts[countryIndex] || 0,
    }));
    lookup.set(names[index], {
      genus: speciesTraitsPayload.genus?.[index] || "",
      rarity_label: rarityLabels[speciesTraitsPayload.rarity?.[index]] || "Data deficient",
      rarity_reason: speciesTraitsPayload.rarity_reasons?.[index] || "",
      dataset_sample_count: speciesTraitsPayload.dataset_sample_count?.[index] || 0,
      observation_count: speciesTraitsPayload.observation_count?.[index] || 0,
      known_range_country_count: speciesTraitsPayload.country_count?.[index] || rangeCountries.length,
      known_range_countries: rangeCountries,
      primary_country: speciesTraitsPayload.primary_country_codes?.[index] || "",
      region_key: speciesTraitsPayload.region_keys?.[index] || "",
      region_label: regionLabel(speciesTraitsPayload, speciesTraitsPayload.region_keys?.[index] || ""),
      protection_status: protectionLabels[speciesTraitsPayload.protection_status?.[index]] || "Not assessed",
      market_price_usd: speciesTraitsPayload.market_price_usd?.[index] ?? null,
    });
  }
  return lookup;
}

export function deriveMorphMetrics(shell) {
  const roughness = Number.isFinite(Number(shell.roughness)) ? Number(shell.roughness) : contourRoughness(shell.upload_contour);
  const solidityLoss = clamp01((1 - (shell.contour_solidity || 1)) / 0.32);
  const pc = shell.contour_pc || [];
  const pc2 = clamp01(((pc[1] || 0) + 7) / 14);
  const pc4 = clamp01(((pc[3] || 0) + 3) / 6);
  return {
    roughness: roughness ?? clamp01(0.4 * Math.abs(pc2 - 0.5) * 2 + 0.34 * Math.abs(pc4 - 0.5) * 2 + 0.26 * solidityLoss),
  };
}

export function buildDerivedShellData(shells, localityPayload = null, speciesTraitsPayload = null) {
  state.speciesCounts = new Map();
  state.originFilterOptionsCache = null;
  for (const shell of shells) {
    state.speciesCounts.set(shell.species, (state.speciesCounts.get(shell.species) || 0) + 1);
  }
  const localityLookup = buildLocalityLookup(localityPayload);
  const speciesTraitsLookup = buildSpeciesTraitsLookup(speciesTraitsPayload);
  state.speciesTraits = speciesTraitsLookup;
  state.localityMatchRate = localityPayload?.match_rate || 0;
  for (const shell of shells) {
    const locality = localityLookup.get(shell.species);
    const traits = speciesTraitsLookup.get(shell.species);
    const derivedMorphTraits = deriveMorphMetrics(shell);
    shell.fingerprint_hash ||= fingerprintHash(shell);
    shell.species_sample_count = state.speciesCounts.get(shell.species) || 1;
    shell.species_traits = traits || null;
    shell.morph_traits = { ...derivedMorphTraits, ...(shell.morph_traits || {}) };
    shell.rarity_label = traits?.rarity_label || shell.rarity_label || "";
    shell.rarity_reason = traits?.rarity_reason || "";
    shell.global_occurrences = traits?.observation_count || locality?.total_occurrences || shell.gbif_occurrence_count || 0;
    shell.location_label = locality?.location_label || "Locality unavailable";
    shell.location_key = locality?.primary_country || locality?.region_key || "unknown";
    shell.location_color = shell.location_key === "unknown"
      ? "rgba(96, 108, 106, 0.62)"
      : speciesColor(shell.location_key);
    shell.species_color = speciesColor(shell.species);
    shell.region_label = locality?.region_label || "";
    shell.top_countries_label = locality?.top_countries?.length
      ? locality.top_countries.slice(0, 3).map((country) => country.label).join(", ")
      : shell.gbif_countries_top || "";
  }
}

export function fetchJson(url) {
  return fetch(url, { cache: "no-store" }).then((response) => {
    if (!response.ok) throw new Error(`${url} returned ${response.status}`);
    return response.json();
  });
}

export async function fetchCompressedArrayBuffer(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  if (!url.endsWith(".gz")) return response.arrayBuffer();
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) return buffer;
  if (!("DecompressionStream" in window)) {
    throw new Error("This browser cannot decompress the shell data pack.");
  }
  return new Response(new Blob([buffer]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
}

export async function fetchCompressedJson(url) {
  const buffer = await fetchCompressedArrayBuffer(url);
  return JSON.parse(new TextDecoder().decode(buffer));
}
