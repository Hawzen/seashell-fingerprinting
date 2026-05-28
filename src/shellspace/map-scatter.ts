// @ts-nocheck

import { resizeCanvas } from './routing-canvas';
import { colorModeDefs, filterLevels } from './constants';
import { canonicalColorBin, colorBinFromFilterValue, shellHasColorBin } from './color-bins';
import { countryDisplayLabel } from './countries';
import { habitatDefs, shellHabitatKeys } from './habitat';
import { els, scatterCtx, state } from './runtime';
import { getCachedShellCutoutImage } from './shell-cutouts';
import { clamp01, hslToRgba, relativeArea } from './utils';

export function contourAxisCount() {
  return Math.min(6, state.model?.contour_visible_component_count || 0);
}

export function axisOptionCount() {
  return contourAxisCount();
}

export function activeAxisValues() {
  return state.pcValues;
}

export function axisRange(axisIndex) {
  return state.model.contour_pca_ranges?.[axisIndex];
}

export function axisVariance(axisIndex) {
  return state.model.contour_explained_variance_ratio?.[axisIndex] || 0;
}

export function axisMeaning(axisIndex) {
  const name = String(state.pcaAxisNames?.[axisIndex] || "").trim();
  return name || `PC${axisIndex + 1}`;
}

export function axisLabel(axisIndex) {
  const name = String(state.pcaAxisNames?.[axisIndex] || "").trim();
  return name ? `${name} (PC${axisIndex + 1})` : `PC${axisIndex + 1}`;
}

export function axisValue(shell, axisIndex) {
  return shell.contour_pc?.[axisIndex] || 0;
}

export function initialViewport(xIndex = state.xAxis, yIndex = state.yAxis) {
  const fallback = state.model.contour_pca_ranges?.[0] || { p01: -1, p99: 1 };
  const x = axisRange(xIndex) || fallback;
  const y = axisRange(yIndex) || axisRange(1) || fallback;
  const padX = Math.max((x.p99 - x.p01) * 0.08, 0.001);
  const padY = Math.max((y.p99 - y.p01) * 0.08, 0.001);
  return {
    minX: x.p01 - padX,
    maxX: x.p99 + padX,
    minY: y.p01 - padY,
    maxY: y.p99 + padY,
  };
}

export function worldToScreen(x, y, size) {
  const vx = state.viewport;
  return {
    x: ((x - vx.minX) / (vx.maxX - vx.minX)) * size.width,
    y: size.height - ((y - vx.minY) / (vx.maxY - vx.minY)) * size.height,
  };
}

export function screenToWorld(x, y, size) {
  const vx = state.viewport;
  return {
    x: vx.minX + (x / size.width) * (vx.maxX - vx.minX),
    y: vx.minY + ((size.height - y) / size.height) * (vx.maxY - vx.minY),
  };
}

export function speciesColor(species, alpha = 0.78) {
  let hash = 0;
  for (let index = 0; index < species.length; index += 1) {
    hash = (hash * 31 + species.charCodeAt(index)) >>> 0;
  }
  return `hsla(${hash % 360}, 42%, 42%, ${alpha})`;
}

export function speciesColorRgba(species, alpha = 0.78) {
  let hash = 0;
  const value = String(species || "");
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hslToRgba(hash % 360, 0.42, 0.42, alpha);
}

export function shellRgb(shell, alpha = 1) {
  const red = Math.round(clamp01(shell.color_r_mean ?? 0.68) * 255);
  const green = Math.round(clamp01(shell.color_g_mean ?? 0.64) * 255);
  const blue = Math.round(clamp01(shell.color_b_mean ?? 0.56) * 255);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function shellRgba(shell, alpha = 1) {
  return [
    Math.round(clamp01(shell.color_r_mean ?? 0.68) * 255),
    Math.round(clamp01(shell.color_g_mean ?? 0.64) * 255),
    Math.round(clamp01(shell.color_b_mean ?? 0.56) * 255),
    Math.round(clamp01(alpha) * 255),
  ];
}

export function conservationStatus(shell) {
  return shell?.live_conservation_status || shell?.species_traits?.protection_status || "Not assessed";
}

function isKnownText(value) {
  const text = String(value || "").trim().toLowerCase();
  return text && !["unknown", "not assessed", "data deficient", "locality unavailable"].includes(text);
}

function hasNumber(value) {
  if (value == null || String(value).trim() === "") return false;
  const number = Number(value);
  return Number.isFinite(number);
}

function rangeValue(shell, key) {
  if (key === "lightness") return shell.color_l_mean == null ? null : clamp01(shell.color_l_mean);
  if (key === "area") return shell.area == null || shell.image_width == null || shell.image_height == null ? null : relativeArea(shell);
  if (key === "concavity") return shell.contour_concavity == null ? null : clamp01(shell.contour_concavity / 0.32);
  if (key === "roughness") return shell.morph_traits?.roughness == null ? null : clamp01(shell.morph_traits.roughness);
  return null;
}

function parseAttributeColorMode(mode) {
  const text = String(mode || "");
  if (text.startsWith("range:")) {
    const [, key, level] = text.split(":");
    return key && level ? { type: "range", key, value: level } : null;
  }
  if (text.startsWith("taxonomy:")) return { type: "taxonomy", value: text.slice("taxonomy:".length) };
  if (text.startsWith("habitat:")) return { type: "habitat", value: text.slice("habitat:".length) };
  if (text.startsWith("origin:")) return { type: "origin", value: text.slice("origin:".length) };
  if (text.startsWith("palette:")) return { type: "color", value: text.slice("palette:".length) };
  if (text.startsWith("rarity:")) return { type: "rarity", value: text.slice("rarity:".length) };
  if (["taxonomy", "habitat", "origin", "color", "lightness", "area", "roughness", "rarity", "concavity"].includes(text)) {
    return { type: text };
  }
  return null;
}

function taxonomyColorKey(shell) {
  const enrichment = shell?.enrichment || {};
  return enrichment.aphia_family
    || enrichment.aphia_genus
    || enrichment.aphia_order
    || enrichment.aphia_class
    || shell?.species
    || "Unknown";
}

function taxonomyText(shell) {
  if (shell?._filterTaxonomyText) return shell._filterTaxonomyText;
  const enrichment = shell?.enrichment || {};
  return [
    enrichment.aphia_class,
    enrichment.aphia_order,
    enrichment.aphia_family,
    enrichment.aphia_genus,
    enrichment.aphia_scientific_name,
    enrichment.aphia_accepted_name,
    enrichment.aphia_classification_path,
    shell?.species,
    shell?.name,
  ].filter(Boolean).join(" ").toLowerCase();
}

function matchesTaxonomy(shell, query) {
  const tokens = String(query || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return true;
  const haystack = taxonomyText(shell);
  return tokens.every((token) => haystack.includes(token));
}

function shellOriginColorKey(shell) {
  return shell?.species_traits?.primary_country
    || shell?._filterCountryItems?.[0]?.code
    || shell?.location_key
    || "unknown";
}

function matchesOrigin(shell, filterValue) {
  if (!filterValue) return true;
  const [type, value] = String(filterValue).split(":");
  if (!value) return shellOriginColorKey(shell) === filterValue;
  if (type === "country-search") {
    const query = value.trim().toLowerCase();
    if (!query) return true;
    return (shell?._filterCountrySearchText || "").includes(query);
  }
  if (type === "region") {
    return shell?.species_traits?.region_key === value
      || shell?.region_key === value
      || shell?.location_key === value;
  }
  if (type === "country") {
    return shell?.location_key === value
      || shell?.species_traits?.primary_country === value
      || shell?._filterCountryCodes?.has(value)
      || (shell?._filterCountryItems || []).some((country) => country.code === value);
  }
  return shellOriginColorKey(shell) === filterValue;
}

function habitatColorKey(shell) {
  return shell?._filterHabitatKeys?.[0] || shellHabitatKeys(shell)[0] || "unknown";
}

function matchesHabitat(shell, key) {
  if (!key) return true;
  return (shell?._filterHabitatSet || new Set(shellHabitatKeys(shell))).has(key);
}

function highlightRgba(matches, color = [31, 117, 111, 222]) {
  return matches ? color : [103, 113, 116, 54];
}

function levelForKey(levelKey) {
  return filterLevels.find((level) => level.key === levelKey);
}

function rangeModeRgba(shell, key) {
  if (key === "lightness") {
    const t = clamp01(shell.color_l_mean ?? 0.5);
    return hslToRgba(48, 0.24, (24 + t * 54) / 100);
  }
  if (key === "roughness") {
    const t = clamp01(shell.morph_traits?.roughness ?? 0);
    return hslToRgba(178 - t * 150, 0.58, (34 + t * 16) / 100);
  }
  if (key === "area") {
    const t = clamp01(rangeValue(shell, "area") ?? 0.5);
    return hslToRgba(210 - t * 176, 0.55, (35 + t * 16) / 100);
  }
  if (key === "concavity") {
    const t = clamp01((shell.contour_concavity || 0) / 0.32);
    return hslToRgba(320 - t * 185, 0.56, (35 + t * 11) / 100);
  }
  return speciesColorRgba(key, 0.72);
}

function rangeHighlightColor(levelKey) {
  if (levelKey === "low") return [43, 95, 116, 222];
  if (levelKey === "medium") return [222, 146, 54, 222];
  if (levelKey === "high") return [198, 93, 75, 224];
  return [31, 117, 111, 222];
}

export function shellHasColorModeData(shell, mode) {
  const parsed = parseAttributeColorMode(mode);
  if (parsed?.type === "taxonomy") return isKnownText(taxonomyColorKey(shell));
  if (parsed?.type === "habitat") return shellHabitatKeys(shell).length > 0 || (shell?._filterHabitatKeys || []).length > 0;
  if (parsed?.type === "origin") return isKnownText(shellOriginColorKey(shell));
  if (parsed?.type === "color") return hasNumber(shell.color_r_mean) && hasNumber(shell.color_g_mean) && hasNumber(shell.color_b_mean);
  if (parsed?.type === "range") return rangeValue(shell, parsed.key) != null;
  if (parsed?.type === "rarity") return isKnownText(shell.rarity_label);
  if (mode === "species") return true;
  if (mode === "locality") return isKnownText(shell.location_key);
  if (mode === "conservation") return isKnownText(conservationStatus(shell));
  if (mode === "shell") return hasNumber(shell.color_r_mean) && hasNumber(shell.color_g_mean) && hasNumber(shell.color_b_mean);
  if (mode === "pattern") return hasNumber(shell.color_pattern_strength);
  if (mode === "lightness") return hasNumber(shell.color_l_mean);
  if (mode === "area") return rangeValue(shell, "area") != null;
  if (mode === "roughness") return hasNumber(shell.morph_traits?.roughness);
  if (mode === "rarity") return isKnownText(shell.rarity_label);
  if (mode === "concavity") return hasNumber(shell.contour_concavity);
  return false;
}

export function availableColorModes() {
  return colorModeDefs.filter((mode) => state.shells.some((shell) => shellHasColorModeData(shell, mode.key)));
}

export function isSupportedColorMode(mode) {
  const text = String(mode || "");
  const parsed = parseAttributeColorMode(text);
  if (parsed?.type === "range") return ["lightness", "area", "roughness", "concavity"].includes(parsed.key);
  if (parsed) return true;
  return colorModeDefs.some((item) => item.key === text);
}

function colorLabelForOrigin(value) {
  if (!value) return "Countries";
  if (value.startsWith("country-search:")) return value.slice("country-search:".length);
  if (value.startsWith("country:")) {
    const code = value.slice("country:".length);
    return countryDisplayLabel(code) || code;
  }
  if (value.startsWith("region:")) return value.slice("region:".length).replace(/[-_]/g, " ");
  return value;
}

export function colorModeLabel(mode = state.colorMode) {
  const text = String(mode || "");
  const parsed = parseAttributeColorMode(text);
  if (parsed?.type === "taxonomy") return parsed.value ? parsed.value : "Family groups";
  if (parsed?.type === "habitat") return parsed.value
    ? habitatDefs.find((def) => def.key === parsed.value)?.label || "Habitat"
    : "All habitats";
  if (parsed?.type === "origin") return colorLabelForOrigin(parsed.value || "");
  if (parsed?.type === "color") {
    if (!parsed.value) return "Shell color";
    const bin = colorBinFromFilterValue(parsed.value);
    return bin == null ? parsed.value : canonicalColorBin(bin).hex;
  }
  if (parsed?.type === "range") {
    const level = levelForKey(parsed.value);
    return level?.label || "Gradient";
  }
  if (parsed?.type === "rarity") return parsed.value || "All rarities";
  return colorModeDefs.find((modeDef) => modeDef.key === text)?.label || "Shell color";
}

export function buildColorModeOptions() {
  const modes = availableColorModes();
  if (!isSupportedColorMode(state.colorMode) || !state.shells.some((shell) => shellHasColorModeData(shell, state.colorMode))) {
    state.colorMode = modes.some((mode) => mode.key === "roughness") ? "roughness" : modes[0]?.key || "species";
  }
  if (els.colorModeSelect) {
    els.colorModeSelect.innerHTML = "";
    for (const mode of modes) {
      const option = document.createElement("option");
      option.value = mode.key;
      option.textContent = mode.label;
      els.colorModeSelect.append(option);
    }
    els.colorModeSelect.value = state.colorMode;
  }
  renderColorLegend();
}

function rgbaCss(rgba) {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] / 255})`;
}

function legendDot(label, color) {
  const item = document.createElement("span");
  item.className = "color-legend-item";
  const dot = document.createElement("span");
  dot.className = "color-legend-dot";
  dot.style.background = color;
  const text = document.createElement("span");
  text.textContent = label;
  item.append(dot, text);
  return item;
}

function legendGradient(low, high, lowLabel = "Low", highLabel = "High") {
  const item = document.createElement("div");
  item.className = "color-legend-gradient";
  const bar = document.createElement("span");
  bar.style.background = `linear-gradient(90deg, ${low}, ${high})`;
  const labels = document.createElement("span");
  labels.className = "color-legend-labels";
  labels.innerHTML = `<span>${lowLabel}</span><span>${highLabel}</span>`;
  item.append(bar, labels);
  return item;
}

export function renderColorLegend() {
  if (!els.colorLegend) return;
  const legend = els.colorLegend;
  legend.innerHTML = "";
  legend.hidden = false;
  const parsed = parseAttributeColorMode(state.colorMode);
  if (parsed?.type === "taxonomy") {
    legend.append(parsed.value
      ? legendDot(colorModeLabel(), rgbaCss(speciesColorRgba(parsed.value, 0.86)))
      : legendDot("Family groups", rgbaCss(speciesColorRgba("taxonomy", 0.78))));
    return;
  }
  if (parsed?.type === "habitat") {
    legend.append(parsed.value
      ? legendDot(colorModeLabel(), rgbaCss(speciesColorRgba(parsed.value, 0.86)))
      : legendDot("Habitat groups", rgbaCss(speciesColorRgba("habitat", 0.78))));
    return;
  }
  if (parsed?.type === "origin") {
    legend.append(parsed.value
      ? legendDot(colorModeLabel(), rgbaCss(speciesColorRgba(parsed.value, 0.86)))
      : legendDot("Country groups", rgbaCss(speciesColorRgba("origin", 0.78))));
    return;
  }
  if (parsed?.type === "color" && parsed.value) {
    const bin = colorBinFromFilterValue(parsed.value);
    const color = bin == null ? parsed.value : canonicalColorBin(bin).hex;
    legend.append(legendDot(colorModeLabel(), color));
    return;
  }
  if (parsed?.type === "range") {
    if (parsed.value) {
      legend.append(
        legendDot(colorModeLabel(), rgbaCss(rangeHighlightColor(parsed.value))),
        legendDot("Other", "rgba(103, 113, 116, 0.32)"),
      );
      return;
    }
    if (parsed.key === "area") {
      legend.append(legendGradient(rgbaCss(hslToRgba(210, 0.55, 0.35)), rgbaCss(hslToRgba(34, 0.55, 0.51)), "Small", "Large"));
      return;
    }
  }
  if (parsed?.type === "rarity" && parsed.value) {
    legend.append(
      legendDot(parsed.value, rgbaCss(rarityRgba({ rarity_label: parsed.value }))),
      legendDot("Other", "rgba(103, 113, 116, 0.32)"),
    );
    return;
  }
  if (state.colorMode === "rarity") {
    legend.append(
      legendDot("Common", "rgba(52, 136, 96, 0.82)"),
      legendDot("Uncommon", "rgba(222, 146, 54, 0.85)"),
      legendDot("Rare", "rgba(199, 64, 44, 0.88)"),
    );
    return;
  }
  if (state.colorMode === "lightness") {
    legend.append(legendGradient(rgbaCss(hslToRgba(48, 0.24, 0.24)), rgbaCss(hslToRgba(48, 0.24, 0.78)), "Dark", "Light"));
    return;
  }
  if (state.colorMode === "area") {
    legend.append(legendGradient(rgbaCss(hslToRgba(210, 0.55, 0.35)), rgbaCss(hslToRgba(34, 0.55, 0.51)), "Small", "Large"));
    return;
  }
  if (state.colorMode === "roughness") {
    legend.append(legendGradient(rgbaCss(hslToRgba(178, 0.58, 0.34)), rgbaCss(hslToRgba(28, 0.58, 0.5)), "Smooth", "Rough"));
    return;
  }
  if (state.colorMode === "concavity") {
    legend.append(legendGradient(rgbaCss(hslToRgba(320, 0.56, 0.35)), rgbaCss(hslToRgba(135, 0.56, 0.46)), "Smooth", "Indented"));
    return;
  }
  if (state.colorMode === "conservation") {
    legend.append(
      legendDot("Least", "rgba(58, 139, 99, 0.75)"),
      legendDot("Near", "rgba(228, 176, 62, 0.78)"),
      legendDot("Risk", "rgba(200, 45, 38, 0.86)"),
    );
    return;
  }
  legend.hidden = true;
}

export function conservationRgba(shell) {
  const status = conservationStatus(shell).toLowerCase();
  if (status.includes("critically")) return [126, 24, 28, 230];
  if (status.includes("endangered")) return [200, 45, 38, 220];
  if (status.includes("vulnerable")) return [232, 123, 54, 210];
  if (status.includes("near")) return [228, 176, 62, 200];
  if (status.includes("least")) return [58, 139, 99, 190];
  return [102, 111, 117, 112];
}

function rarityRgba(shell) {
  const rarity = String(shell.rarity_label || "").toLowerCase();
  if (rarity.includes("uncommon")) return [222, 146, 54, 218];
  if (rarity.includes("common")) return [52, 136, 96, 208];
  if (rarity.includes("rare")) return [199, 64, 44, 224];
  return [104, 113, 116, 138];
}

export function pointRgbaForMode(shell, mode) {
  const parsed = parseAttributeColorMode(mode);
  if (parsed?.type === "taxonomy") {
    if (parsed.value) return highlightRgba(matchesTaxonomy(shell, parsed.value), speciesColorRgba(parsed.value, 0.86));
    return speciesColorRgba(taxonomyColorKey(shell), 0.76);
  }
  if (parsed?.type === "habitat") {
    if (parsed.value) return highlightRgba(matchesHabitat(shell, parsed.value), speciesColorRgba(parsed.value, 0.86));
    const key = habitatColorKey(shell);
    return key === "unknown" ? [96, 108, 106, 138] : speciesColorRgba(key, 0.76);
  }
  if (parsed?.type === "origin") {
    if (parsed.value) return highlightRgba(matchesOrigin(shell, parsed.value), speciesColorRgba(parsed.value, 0.86));
    const key = shellOriginColorKey(shell);
    return key === "unknown" ? [96, 108, 106, 138] : speciesColorRgba(key, 0.72);
  }
  if (parsed?.type === "color") {
    if (!parsed.value) return shellRgba(shell);
    const bin = colorBinFromFilterValue(parsed.value);
    const match = bin == null ? false : shellHasColorBin(shell, bin);
    const canonical = bin == null ? [31, 117, 111, 222] : canonicalColorBin(bin).rgb.map((channel) => Math.round(channel * 255)).concat(224);
    return highlightRgba(match, canonical);
  }
  if (parsed?.type === "range") {
    if (!parsed.value) return rangeModeRgba(shell, parsed.key);
    const level = levelForKey(parsed.value);
    const value = rangeValue(shell, parsed.key);
    const matches = value != null && level && value >= level.min && value <= level.max;
    return highlightRgba(Boolean(matches), rangeHighlightColor(parsed.value));
  }
  if (parsed?.type === "rarity" && parsed.value) {
    return highlightRgba(shell.rarity_label === parsed.value, rarityRgba({ rarity_label: parsed.value }));
  }
  if (mode === "locality") {
    if (shell.location_key === "unknown") return [96, 108, 106, 158];
    return speciesColorRgba(shell.location_key || "unknown", 0.66);
  }
  if (mode === "conservation") return conservationRgba(shell);
  if (mode === "shell") return shellRgba(shell);
  if (mode === "lightness" || mode === "roughness" || mode === "area" || mode === "concavity") return rangeModeRgba(shell, mode);
  if (mode === "rarity") return rarityRgba(shell);
  if (mode === "pattern") {
    const t = clamp01((shell.color_pattern_strength || 0) / 0.22);
    return hslToRgba(204 - t * 162, (34 + t * 36) / 100, (30 + t * 18) / 100);
  }
  return speciesColorRgba(shell.species, 0.78);
}

export function pointColorArray(mode) {
  if (state.pointColorCache.has(mode)) return state.pointColorCache.get(mode);
  const colors = new Uint8ClampedArray(state.shells.length * 4);
  for (const shell of state.shells) {
    if (shell.id < 0 || shell.id >= state.shells.length) continue;
    const rgba = pointRgbaForMode(shell, mode);
    const offset = shell.id * 4;
    colors[offset] = rgba[0];
    colors[offset + 1] = rgba[1];
    colors[offset + 2] = rgba[2];
    colors[offset + 3] = rgba[3];
  }
  state.pointColorCache.set(mode, colors);
  return colors;
}

function mapSampleSignature() {
  return [
    state.mapSampleLimit || 0,
    state.filtered.length,
    state.selected?.id ?? -1,
  ].join("|");
}

function sampledScatterShells(source) {
  const limit = Math.floor(Number(state.mapSampleLimit || 0));
  if (!limit || source.length <= limit) return source;
  const target = Math.max(1, Math.min(limit, source.length));
  const sampled = [];
  const used = new Set();
  for (let index = 0; index < target; index += 1) {
    const sourceIndex = Math.floor(((index + 0.5) * source.length) / target);
    const shell = source[Math.min(source.length - 1, sourceIndex)];
    if (!shell || used.has(shell.id)) continue;
    sampled.push(shell);
    used.add(shell.id);
  }
  if (state.selected && source.includes(state.selected) && !used.has(state.selected.id)) {
    if (sampled.length >= target) sampled[sampled.length - 1] = state.selected;
    else sampled.push(state.selected);
  }
  return sampled;
}

export function scheduleDraw(delay = 0) {
  state.needsDraw = true;
  state.scatterHitCache = null;
  if (delay > 0) {
    window.clearTimeout(state.drawTimer);
    state.drawTimer = window.setTimeout(() => scheduleDraw(), delay);
    return;
  }
  window.clearTimeout(state.drawTimer);
  state.drawTimer = 0;
  if (state.drawFrame) return;
  state.drawFrame = requestAnimationFrame(() => {
    state.drawFrame = 0;
    drawScatter();
  });
}

window.addEventListener("shellspace:cutout-ready", () => scheduleDraw());

export function drawScatterPoints(pointCache) {
  const pixelWidth = els.scatter.width;
  const pixelHeight = els.scatter.height;
  if (!pixelWidth || !pixelHeight) return;
  const dpr = window.devicePixelRatio || 1;
  const imageData = scatterCtx.createImageData(pixelWidth, pixelHeight);
  const data = imageData.data;
  const colors = pointColorArray(state.colorMode);
  const dotSize = Math.max(8, Math.round(dpr * 4));
  const dotOffset = Math.floor(dotSize / 2);
  for (let index = 0; index < pointCache.shells.length; index += 1) {
    const shell = pointCache.shells[index];
    const pointX = Math.round(pointCache.points[index * 2] * dpr);
    const pointY = Math.round(pointCache.points[index * 2 + 1] * dpr);
    if (pointX < -dotSize || pointX >= pixelWidth + dotSize || pointY < -dotSize || pointY >= pixelHeight + dotSize) {
      continue;
    }
    const colorOffset = shell.id >= 0 && shell.id < state.shells.length ? shell.id * 4 : -1;
    const fallback = colorOffset < 0 ? pointRgbaForMode(shell, state.colorMode) : null;
    const red = colorOffset < 0 ? fallback[0] : colors[colorOffset];
    const green = colorOffset < 0 ? fallback[1] : colors[colorOffset + 1];
    const blue = colorOffset < 0 ? fallback[2] : colors[colorOffset + 2];
    const alpha = colorOffset < 0 ? fallback[3] : colors[colorOffset + 3];
    for (let y = 0; y < dotSize; y += 1) {
      const py = pointY + y - dotOffset;
      if (py < 0 || py >= pixelHeight) continue;
      for (let x = 0; x < dotSize; x += 1) {
        const px = pointX + x - dotOffset;
        if (px < 0 || px >= pixelWidth) continue;
        const offset = (py * pixelWidth + px) * 4;
        data[offset] = red;
        data[offset + 1] = green;
        data[offset + 2] = blue;
        data[offset + 3] = alpha;
      }
    }
  }
  scatterCtx.putImageData(imageData, 0, 0);
}

export function drawShellImageMarker(shell, size) {
  if (!shell || shell.id < 0) return false;
  const image = getCachedShellCutoutImage(shell, () => scheduleDraw());
  if (!image) return false;
  const point = worldToScreen(axisValue(shell, state.xAxis), axisValue(shell, state.yAxis), size);
  if (point.x < -40 || point.x > size.width + 40 || point.y < -40 || point.y > size.height + 40) return true;
  const side = shell === state.selected ? 52 : 42;
  scatterCtx.save();
  scatterCtx.drawImage(image, point.x - side / 2, point.y - side / 2, side, side);
  scatterCtx.restore();
  return true;
}

export function drawScatter() {
  const size = resizeCanvas(els.scatter, scatterCtx);
  if (!state.viewport || !state.needsDraw) return;
  state.needsDraw = false;
  scatterCtx.clearRect(0, 0, size.width, size.height);
  const pointCache = scatterScreenPoints(size);
  const visibleShells = new Set(pointCache.shells);
  drawScatterPoints(pointCache);
  scatterCtx.save();
  scatterCtx.lineWidth = 1;
  scatterCtx.strokeStyle = "rgba(32, 36, 42, 0.25)";
  const origin = worldToScreen(0, 0, size);
  if (origin.x >= 0 && origin.x <= size.width) {
    scatterCtx.beginPath();
    scatterCtx.moveTo(origin.x, 0);
    scatterCtx.lineTo(origin.x, size.height);
    scatterCtx.stroke();
  }
  if (origin.y >= 0 && origin.y <= size.height) {
    scatterCtx.beginPath();
    scatterCtx.moveTo(0, origin.y);
    scatterCtx.lineTo(size.width, origin.y);
    scatterCtx.stroke();
  }

  const values = activeAxisValues();
  if (values.length) {
    const target = worldToScreen(values[state.xAxis] || 0, values[state.yAxis] || 0, size);
    scatterCtx.strokeStyle = "#c65d4b";
    scatterCtx.lineWidth = 2;
    scatterCtx.beginPath();
    scatterCtx.moveTo(target.x - 10, target.y);
    scatterCtx.lineTo(target.x + 10, target.y);
    scatterCtx.moveTo(target.x, target.y - 10);
    scatterCtx.lineTo(target.x, target.y + 10);
    scatterCtx.stroke();
  }

  if (state.showPoppedShells) {
    for (const id of state.mapShellImageIds) {
      const shell = state.shellById.get(id);
      if (shell && shell !== state.selected && visibleShells.has(shell)) drawShellImageMarker(shell, size);
    }
  }

  if (state.selected && visibleShells.has(state.selected)) {
    if (!state.showPoppedShells || !drawShellImageMarker(state.selected, size)) {
      const selected = worldToScreen(
        axisValue(state.selected, state.xAxis),
        axisValue(state.selected, state.yAxis),
        size,
      );
      scatterCtx.fillStyle = "#ffffff";
      scatterCtx.strokeStyle = "#20242a";
      scatterCtx.lineWidth = 2;
      scatterCtx.beginPath();
      scatterCtx.arc(selected.x, selected.y, 6, 0, Math.PI * 2);
      scatterCtx.fill();
      scatterCtx.stroke();
    }
  }
  scatterCtx.restore();
}

export function scatterHitKey(size) {
  const viewport = state.viewport || {};
  return [
    state.xAxis,
    state.yAxis,
    size.width.toFixed(1),
    size.height.toFixed(1),
    Number(viewport.minX || 0).toFixed(4),
    Number(viewport.maxX || 0).toFixed(4),
    Number(viewport.minY || 0).toFixed(4),
    Number(viewport.maxY || 0).toFixed(4),
  ].join("|");
}

export function scatterScreenPoints(size) {
  const key = scatterHitKey(size);
  const sampleSignature = mapSampleSignature();
  if (
    state.scatterPointCache?.key === key
    && state.scatterPointCache.source === state.filtered
    && state.scatterPointCache.sampleSignature === sampleSignature
  ) {
    return state.scatterPointCache;
  }
  const shells = sampledScatterShells(state.filtered);
  const points = new Float32Array(shells.length * 2);
  for (let index = 0; index < shells.length; index += 1) {
    const point = worldToScreen(axisValue(shells[index], state.xAxis), axisValue(shells[index], state.yAxis), size);
    points[index * 2] = point.x;
    points[index * 2 + 1] = point.y;
  }
  state.scatterPointCache = { key, source: state.filtered, sampleSignature, shells, points };
  state.scatterHitCache = null;
  return state.scatterPointCache;
}

export function scatterHitPoints(size) {
  const pointCache = scatterScreenPoints(size);
  const key = pointCache.key;
  if (
    state.scatterHitCache?.key === key
    && state.scatterHitCache.source === state.filtered
    && state.scatterHitCache.sampleSignature === pointCache.sampleSignature
  ) {
    return state.scatterHitCache;
  }
  const shells = pointCache.shells;
  const points = pointCache.points;
  const cellSize = 24;
  const grid = new Map();
  for (let index = 0; index < shells.length; index += 1) {
    const pointX = points[index * 2];
    const pointY = points[index * 2 + 1];
    if (pointX < -cellSize || pointX > size.width + cellSize || pointY < -cellSize || pointY > size.height + cellSize) {
      continue;
    }
    const cellX = Math.floor(pointX / cellSize);
    const cellY = Math.floor(pointY / cellSize);
    const cellKey = `${cellX},${cellY}`;
    let bucket = grid.get(cellKey);
    if (!bucket) {
      bucket = [];
      grid.set(cellKey, bucket);
    }
    bucket.push(index);
  }
  state.scatterHitCache = { key, source: state.filtered, sampleSignature: pointCache.sampleSignature, shells, points, grid, cellSize };
  return state.scatterHitCache;
}
