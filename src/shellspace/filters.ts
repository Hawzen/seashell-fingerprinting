// @ts-nocheck

import { filterLevels, rangeFilterDefs, rarityFilterOptions } from './constants';
import { colorBinFilterValue, colorBinFromFilterValue, occupiedColorBins, shellHasColorBin } from './color-bins';
import { countryDisplayLabel, countrySearchText, parseCountryList } from './countries';
import { habitatDefs, shellHabitatKeys } from './habitat';
import { primeSurpriseQueue, resetSurpriseQueue } from './images-loading';
import { colorModeLabel, renderColorLegend, scheduleDraw, shellRgba } from './map-scatter';
import { renderPalette } from './palette';
import { scheduleHashUpdate } from './routing-canvas';
import { els, state } from './runtime';
import { scheduleRenderNeighbors } from './source-neighbors';
import { clamp01, relativeArea } from './utils';

export function shellOriginKey(shell) {
  return shell?.species_traits?.region_key || shell?.location_key || "unknown";
}

function countryItems(shell) {
  return shell?._filterCountryItems || parseCountryList(shell?.countries_top || shell?.enrichment?.countries_top || "");
}

function isColorAttributeMode() {
  return state.attributeMode === "color";
}

function rangeModeValue(key) {
  const text = String(state.colorMode || "");
  if (text === key) return "";
  if (!text.startsWith(`range:${key}:`)) return null;
  return text.slice(`range:${key}:`.length);
}

function categoryColorValue(key) {
  const text = String(state.colorMode || "");
  if (key === "taxonomy") {
    if (text === "taxonomy") return "";
    return text.startsWith("taxonomy:") ? text.slice("taxonomy:".length) : null;
  }
  if (key === "origin") {
    if (text === "origin") return "";
    return text.startsWith("origin:") ? text.slice("origin:".length) : null;
  }
  if (key === "habitat") {
    if (text === "habitat") return "";
    return text.startsWith("habitat:") ? text.slice("habitat:".length) : null;
  }
  if (key === "color") {
    if (text === "color" || text === "shell") return "";
    return text.startsWith("palette:") ? text.slice("palette:".length) : null;
  }
  if (key === "rarity") {
    if (text === "rarity") return "";
    return text.startsWith("rarity:") ? text.slice("rarity:".length) : null;
  }
  return null;
}

function setColorMode(mode) {
  state.colorMode = mode;
  state.pointColorCache.clear();
  renderColorLegend();
  scheduleDraw();
  scheduleHashUpdate();
  syncFilterControlState();
}

function setCategoryColorValue(key, value) {
  const text = String(value || "");
  if (key === "taxonomy") setColorMode(text ? `taxonomy:${text}` : "taxonomy");
  else if (key === "origin") setColorMode(text ? `origin:${text}` : "origin");
  else if (key === "habitat") setColorMode(categoryColorValue("habitat") === text ? "habitat" : `habitat:${text}`);
  else if (key === "color") setColorMode(categoryColorValue("color") === text ? "color" : `palette:${text}`);
  else if (key === "rarity") setColorMode(categoryColorValue("rarity") === text ? "rarity" : `rarity:${text}`);
}

function setRangeColorValue(key, levelKey) {
  setColorMode(rangeModeValue(key) === levelKey ? key : `range:${key}:${levelKey}`);
}

function activeCategoryValue(key) {
  if (!isColorAttributeMode()) return state.categoryFilters[key] || "";
  const value = categoryColorValue(key);
  return value == null ? "" : value;
}

function activeRangeLevelKey(key) {
  if (!isColorAttributeMode()) {
    const current = state.morphFilters.get(key);
    const activeLevel = current && filterLevels.find((level) => Math.abs(current.min - level.min) < 0.01 && Math.abs(current.max - level.max) < 0.01);
    return activeLevel?.key || "";
  }
  return rangeModeValue(key) || "";
}

function categoryOutputLabel(key) {
  if (!isColorAttributeMode()) {
    if (key === "origin") return originFilterLabel(state.categoryFilters.origin);
    if (key === "taxonomy") return state.categoryFilters.taxonomy || "Any";
    if (key === "habitat") return habitatFilterLabel(state.categoryFilters.habitat);
    if (key === "rarity") return state.categoryFilters.rarity || "Any";
    if (key === "color") return colorFilterLabel(state.categoryFilters.color);
    return "Any";
  }
  const value = categoryColorValue(key);
  return value == null ? "Not selected" : colorModeLabel(state.colorMode);
}

function rangeOutputLabel(key) {
  if (!isColorAttributeMode()) {
    const current = state.morphFilters.get(key);
    const activeLevel = current && filterLevels.find((level) => Math.abs(current.min - level.min) < 0.01 && Math.abs(current.max - level.max) < 0.01);
    return activeLevel?.label || "Any";
  }
  const value = rangeModeValue(key);
  if (value == null) return "Not selected";
  const level = filterLevels.find((item) => item.key === value);
  return level?.label || "Gradient";
}

function syncAttributeModeControls() {
  const isColor = isColorAttributeMode();
  els.attributeFilterMode?.setAttribute("aria-pressed", isColor ? "false" : "true");
  els.attributeColorMode?.setAttribute("aria-pressed", isColor ? "true" : "false");
  if (els.resetTraitFilters) {
    els.resetTraitFilters.textContent = isColor ? "Reset color" : "Reset filters";
    els.resetTraitFilters.title = isColor ? "Reset color" : "Reset filters";
  }
}

export function shellOriginLabel(shell) {
  return shell?.species_traits?.region_label || shell?.region_label || shell?.location_label || "Unknown";
}

export function shellOriginMatches(shell, filterValue) {
  if (!filterValue) return true;
  const [type, value] = filterValue.split(":");
  if (!value) return shellOriginKey(shell) === filterValue;
  if (type === "country-search") {
    const query = value.trim().toLowerCase();
    if (!query) return true;
    return (shell?._filterCountrySearchText || "").includes(query)
      || countryItems(shell).some((country) => countrySearchText(country.code).includes(query));
  }
  if (type === "region") {
    return shell?.species_traits?.region_key === value
      || shell?.region_key === value
      || shell?.location_key === value
      || shellOriginKey(shell) === value;
  }
  if (type === "country") {
    return shell?.location_key === value
      || shell?.species_traits?.primary_country === value
      || (shell?.species_traits?.known_range_countries || []).some((country) => country.code === value)
      || shell?._filterCountryCodes?.has(value)
      || countryItems(shell).some((country) => country.code === value);
  }
  return shellOriginKey(shell) === filterValue;
}

function isKnownDataLabel(value) {
  const text = String(value || "").trim().toLowerCase();
  return text && !["unknown", "not assessed", "data deficient", "locality unavailable"].includes(text);
}

function taxonomySearchText(shell) {
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

export function shellTaxonomyMatches(shell, query) {
  const tokens = String(query || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return true;
  const haystack = taxonomySearchText(shell);
  return tokens.every((token) => haystack.includes(token));
}

export function availableHabitatFilters() {
  return filterOptionData().habitats;
}

export function habitatFilterLabel(value) {
  if (!value) return "Any";
  return habitatDefs.find((def) => def.key === value)?.label || "Any";
}

export function prepareShellFilterData(shells = state.shells) {
  for (const shell of shells || []) {
    const enrichment = shell?.enrichment || {};
    const countryItemsValue = parseCountryList(shell?.countries_top || enrichment.countries_top || "");
    shell._filterCountryItems = countryItemsValue;
    shell._filterCountryCodes = new Set([
      shell?.location_key,
      shell?.species_traits?.primary_country,
      ...(shell?.species_traits?.known_range_countries || []).map((country) => country.code),
      ...countryItemsValue.map((country) => country.code),
    ].filter(Boolean).map((code) => String(code).toUpperCase()));
    shell._filterCountrySearchText = [
      shell?.location_label,
      ...(shell?.species_traits?.known_range_countries || []).flatMap((country) => [country.label, country.code]),
      ...countryItemsValue.flatMap((country) => [country.name, country.code]),
    ].filter(Boolean).join(" ").toLowerCase();
    shell._filterHabitatKeys = shellHabitatKeys(shell);
    shell._filterHabitatSet = new Set(shell._filterHabitatKeys);
    shell._filterTaxonomyText = taxonomySearchText(shell);
    shell._filterSearchText = [
      shell?.name,
      shell?.species,
      shell?.file,
      shell?.fingerprint_hash,
      shell?.legacy_fingerprint_hash,
      shell?.location_label,
    ].filter(Boolean).join(" ").toLowerCase();
  }
  state.originFilterOptionsCache = null;
  state.filterOptionsCache = null;
}

export function filterOptionData() {
  if (state.filterOptionsCache) return state.filterOptionsCache;

  const rarityValues = new Set();
  const habitatCounts = new Map();
  for (const shell of state.shells) {
    if (isKnownDataLabel(shell.rarity_label)) rarityValues.add(shell.rarity_label);
    for (const key of shell._filterHabitatKeys || shellHabitatKeys(shell)) {
      habitatCounts.set(key, (habitatCounts.get(key) || 0) + 1);
    }
  }
  const colorOptions = occupiedColorBins(state.shells);
  const hasColorData = colorOptions.length > 0 || state.shells.some((shell) => normalizedPaletteRgb(shell).length || (
    shell.color_r_mean != null
    && shell.color_g_mean != null
    && shell.color_b_mean != null
    && Number.isFinite(Number(shell.color_r_mean))
    && Number.isFinite(Number(shell.color_g_mean))
    && Number.isFinite(Number(shell.color_b_mean))
  ));

  state.filterOptionsCache = {
    rangeDefs: rangeFilterDefs.filter((def) => state.shells.some((shell) => filterValue(shell, def.key) != null)),
    rarityOptions: rarityFilterOptions
      .filter((option) => rarityValues.has(option))
      .concat([...rarityValues].filter((option) => !rarityFilterOptions.includes(option)).sort()),
    habitats: habitatDefs
      .map((def) => ({ ...def, count: habitatCounts.get(def.key) || 0 }))
      .filter((def) => def.count > 0),
    colorOptions,
    hasColorData,
  };
  return state.filterOptionsCache;
}

export function hexToRgb(hex) {
  const value = String(hex || "").replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(value)) return null;
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function normalizedPaletteRgb(shell) {
  if (Array.isArray(shell.color_palette_rgb) && shell.color_palette_rgb.length) {
    return shell.color_palette_rgb
      .map((color) => [
        Number(color?.[0] ?? 0) * 255,
        Number(color?.[1] ?? 0) * 255,
        Number(color?.[2] ?? 0) * 255,
      ])
      .filter((color) => color.every((channel) => Number.isFinite(channel)));
  }
  return [];
}

export function shellColorDistance(shell, hex) {
  const target = hexToRgb(hex);
  if (!target) return Infinity;
  const palette = normalizedPaletteRgb(shell);
  if (palette.length) {
    return Math.min(...palette.map((color) => {
      const dr = color[0] - target.r;
      const dg = color[1] - target.g;
      const db = color[2] - target.b;
      return Math.sqrt(dr * dr + dg * dg + db * db);
    }));
  }
  if (shell.color_r_mean == null || shell.color_g_mean == null || shell.color_b_mean == null) return null;
  const shellColor = shellRgba(shell);
  const dr = shellColor[0] - target.r;
  const dg = shellColor[1] - target.g;
  const db = shellColor[2] - target.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function shellMatchesColor(shell, hex) {
  if (!hex) return true;
  const bin = colorBinFromFilterValue(hex);
  if (bin != null) return shellHasColorBin(shell, bin);
  const distance = shellColorDistance(shell, hex);
  return distance == null ? true : distance <= 42;
}

export function filterValue(shell, key) {
  if (key === "lightness") return shell.color_l_mean == null ? null : clamp01(shell.color_l_mean);
  if (key === "area") return shell.area == null || shell.image_width == null || shell.image_height == null ? null : relativeArea(shell);
  if (key === "concavity") return shell.contour_concavity == null ? null : clamp01(shell.contour_concavity / 0.32);
  if (key === "roughness") return shell.morph_traits?.roughness == null ? null : clamp01(shell.morph_traits.roughness);
  return null;
}

export function availableRangeFilterDefs() {
  return filterOptionData().rangeDefs;
}

export function availableRarityOptions() {
  return filterOptionData().rarityOptions;
}

export function hasColorFilterData() {
  return filterOptionData().hasColorData;
}

export function availablePaletteColorFilters() {
  return filterOptionData().colorOptions;
}

export function colorFilterLabel(value) {
  if (!value) return "Any";
  const bin = colorBinFromFilterValue(value);
  const item = bin == null ? null : availablePaletteColorFilters().find((color) => color.bin === bin);
  return item?.hex || value;
}

export function passesMorphFilters(shell) {
  return compiledFilterPredicate()(shell);
}

export function compiledFilterPredicate() {
  const rangeFilters = availableRangeFilterDefs()
    .map((def) => ({ def, filter: state.morphFilters.get(def.key) }))
    .filter(({ filter }) => filter && (filter.min > 0 || filter.max < 1));
  const rarity = state.categoryFilters.rarity || "";
  const origin = state.categoryFilters.origin || "";
  const taxonomyTokens = String(state.categoryFilters.taxonomy || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  const habitat = state.categoryFilters.habitat || "";
  const color = state.categoryFilters.color || "";
  const colorBin = colorBinFromFilterValue(color);
  const colorTarget = colorBin == null ? hexToRgb(color) : null;

  return (shell) => {
    for (const { def, filter } of rangeFilters) {
      const value = filterValue(shell, def.key);
      if (value == null) continue;
      if (value < filter.min || value > filter.max) return false;
    }
    if (rarity && shell.rarity_label !== rarity) return false;
    if (origin && !shellOriginMatches(shell, origin)) return false;
    if (taxonomyTokens.length) {
      const haystack = shell._filterTaxonomyText || taxonomySearchText(shell);
      for (const token of taxonomyTokens) {
        if (!haystack.includes(token)) return false;
      }
    }
    if (habitat && !(shell._filterHabitatSet || new Set(shellHabitatKeys(shell))).has(habitat)) return false;
    if (color) {
      if (colorBin != null) {
        if (!shellHasColorBin(shell, colorBin)) return false;
      } else {
        const distance = shellColorDistanceToTarget(shell, colorTarget);
        if (distance != null && distance > 42) return false;
      }
    }
    return true;
  };
}

function shellColorDistanceToTarget(shell, target) {
  if (!target) return Infinity;
  const palette = normalizedPaletteRgb(shell);
  if (palette.length) {
    let best = Infinity;
    for (const color of palette) {
      const dr = color[0] - target.r;
      const dg = color[1] - target.g;
      const db = color[2] - target.b;
      const distance = Math.sqrt(dr * dr + dg * dg + db * db);
      if (distance < best) best = distance;
    }
    return best;
  }
  if (shell.color_r_mean == null || shell.color_g_mean == null || shell.color_b_mean == null) return null;
  const shellColor = shellRgba(shell);
  const dr = shellColor[0] - target.r;
  const dg = shellColor[1] - target.g;
  const db = shellColor[2] - target.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function updateFilter({ refreshControls = false } = {}) {
  if (refreshControls) buildTraitFilters();
  const query = els.search.value.trim().toLowerCase();
  const predicate = compiledFilterPredicate();
  state.filtered = query
    ? state.shells.filter((shell) => (shell._filterSearchText || "").includes(query) && predicate(shell))
    : state.shells.filter(predicate);
  state.scatterHitCache = null;
  state.scatterPointCache = null;
  resetSurpriseQueue();
  primeSurpriseQueue();
  scheduleRenderNeighbors(state.selected);
  renderPalette(false);
  if (els.statusLine && state.model?.processed_count) {
    els.statusLine.textContent = `${state.filtered.length.toLocaleString()} of ${state.model.processed_count.toLocaleString()} shells`;
  }
  updateFilterButton();
  scheduleDraw(120);
  if (els.filtersPanel?.hidden === false) syncFilterControlState();
}

export function syncFilterControlState() {
  if (!els.filterControls) return;
  syncAttributeModeControls();
  for (const output of els.filterControls.querySelectorAll("[data-filter-output]")) {
    const key = output.dataset.filterOutput;
    if (["origin", "taxonomy", "habitat", "rarity", "color"].includes(key)) output.textContent = categoryOutputLabel(key);
    else if (key?.startsWith("range:")) {
      output.textContent = rangeOutputLabel(key.slice("range:".length));
    }
  }
  for (const button of els.filterControls.querySelectorAll("[data-category-filter]")) {
    const key = button.dataset.categoryFilter;
    button.setAttribute("aria-pressed", activeCategoryValue(key) === button.dataset.filterValue ? "true" : "false");
  }
  for (const button of els.filterControls.querySelectorAll("[data-range-filter]")) {
    button.setAttribute("aria-pressed", activeRangeLevelKey(button.dataset.rangeFilter) === button.dataset.level ? "true" : "false");
  }
  const taxonomyInput = els.filterControls.querySelector("[data-filter-input='taxonomy']");
  const taxonomyValue = isColorAttributeMode() ? (categoryColorValue("taxonomy") || "") : (state.categoryFilters.taxonomy || "");
  if (taxonomyInput && taxonomyInput.value !== taxonomyValue) taxonomyInput.value = taxonomyValue;
  const originInput = els.filterControls.querySelector("[data-filter-input='origin']");
  if (originInput && document.activeElement !== originInput) {
    const originValue = isColorAttributeMode() ? categoryColorValue("origin") || "" : state.categoryFilters.origin || "";
    originInput.value = originValue?.startsWith("country-search:")
      ? originValue.slice("country-search:".length)
      : originFilterLabel(originValue);
    if (originInput.value === "Any") originInput.value = "";
    if (originInput.value === "Countries") originInput.value = "";
  }
}

export function updateFilterButton() {
  if (!els.filtersToggle) return;
  let active = 0;
  for (const def of availableRangeFilterDefs()) {
    const filter = state.morphFilters.get(def.key);
    if (filter && (filter.min > 0 || filter.max < 1)) active += 1;
  }
  for (const value of Object.values(state.categoryFilters)) {
    if (value) active += 1;
  }
  els.filtersToggle.textContent = active ? `Attributes (${active})` : "Attributes";
  els.filtersToggle.classList.toggle("is-active", active > 0);
}

export function originFilterOptions() {
  return [
    ...originFilterData().countries.map((item) => [item.value, item.label]),
  ];
}

export function originFilterData() {
  const regions = new Map();
  const countries = new Map();
  if (state.originFilterOptionsCache) return state.originFilterOptionsCache;
  for (const shell of state.shells) {
    const regionKey = shell.species_traits?.region_key || shell.region_key || "";
    const regionName = shell.species_traits?.region_label || shell.region_label || "";
    if (regionKey && regionKey !== "unknown") {
      const value = `region:${regionKey}`;
      const current = regions.get(value) || { value, key: regionKey, label: regionName || shellOriginLabel(shell), count: 0 };
      current.count += 1;
      regions.set(value, current);
    }
    for (const country of shell.species_traits?.known_range_countries || []) {
      if (!country.code || !country.label) continue;
      const value = `country:${country.code}`;
      const current = countries.get(value) || {
        value,
        code: country.code,
        label: countryDisplayLabel(country.code) || country.label,
        region: shell.species_traits?.region_key || "",
        count: 0,
      };
      current.count += Math.max(1, Number(country.count || 0));
      countries.set(value, current);
    }
    for (const country of countryItems(shell)) {
      const value = `country:${country.code}`;
      const label = countryDisplayLabel(country.code);
      if (!label) continue;
      const current = countries.get(value) || {
        value,
        code: country.code,
        label,
        region: "",
        count: 0,
      };
      current.count += country.count;
      countries.set(value, current);
    }
    const localityKey = shell.location_key || "";
    if (localityKey && localityKey !== "unknown" && localityKey.length <= 3) {
      const value = `country:${localityKey}`;
      const current = countries.get(value) || {
        value,
        code: localityKey,
        label: countryDisplayLabel(localityKey) || shell.location_label?.split(",")[0] || localityKey,
        region: shell.species_traits?.region_key || "",
        count: 0,
      };
      current.count += 1;
      countries.set(value, current);
    }
  }
  state.originFilterOptionsCache = {
    regions: [...regions.values()].sort((a, b) => a.label.localeCompare(b.label)),
    countries: [...countries.values()].sort((a, b) => a.label.localeCompare(b.label) || a.code.localeCompare(b.code)),
  };
  return state.originFilterOptionsCache;
}

export function addOriginSelectFilter() {
  const row = document.createElement("label");
  row.className = "filter-row filter-panel-card filter-select-row filter-origin-row";
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = "Country";
  const output = document.createElement("output");
  output.dataset.filterOutput = "origin";
  output.textContent = categoryOutputLabel("origin");
  header.append(label, output);
  const input = document.createElement("input");
  const list = document.createElement("datalist");
  const options = originFilterOptions();
  const optionByLabel = new Map(options.map(([value, labelValue]) => [labelValue.toLowerCase(), value]));
  const optionByValue = new Map(options);
  const listId = "country-filter-options";
  list.id = listId;
  input.type = "search";
  input.placeholder = "Search country";
  input.dataset.filterInput = "origin";
  input.setAttribute("aria-label", "Country");
  input.setAttribute("list", listId);
  for (const [value, labelValue] of options) {
    const option = document.createElement("option");
    option.value = labelValue;
    option.label = value.replace(/^country:/, "");
    option.textContent = labelValue;
    list.append(option);
  }
  const originValue = isColorAttributeMode() ? categoryColorValue("origin") || "" : state.categoryFilters.origin || "";
  if (originValue?.startsWith("country-search:")) {
    input.value = originValue.slice("country-search:".length);
  } else if (originValue) {
    input.value = optionByValue.get(originValue) || "";
  }
  input.addEventListener("input", () => {
    const text = input.value.trim();
    const next = text
      ? optionByLabel.get(text.toLowerCase()) || `country-search:${text}`
      : "";
    if (isColorAttributeMode()) {
      setCategoryColorValue("origin", next);
      return;
    }
    state.categoryFilters.origin = next;
    updateFilter();
  });
  row.append(header, input, list);
  els.filterControls.append(row);
}

export function addRarityFilter() {
  const rarityOptions = availableRarityOptions();
  if (!rarityOptions.length) return;
  const row = document.createElement("div");
  row.className = "filter-row filter-panel-card rarity-filter-row";
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = "Rarity";
  const output = document.createElement("output");
  output.dataset.filterOutput = "rarity";
  output.textContent = categoryOutputLabel("rarity");
  header.append(label, output);
  const levels = document.createElement("div");
  levels.className = "rarity-filter-options";
  for (const value of rarityOptions) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = value || "Any";
    button.dataset.categoryFilter = "rarity";
    button.dataset.filterValue = value;
    button.setAttribute("aria-pressed", activeCategoryValue("rarity") === value ? "true" : "false");
    button.addEventListener("click", () => {
      if (isColorAttributeMode()) {
        setCategoryColorValue("rarity", value);
        return;
      }
      state.categoryFilters.rarity = state.categoryFilters.rarity === value ? "" : value;
      updateFilter();
    });
    levels.append(button);
  }
  row.append(header, levels);
  els.filterControls.append(row);
}

export function originFilterLabel(value) {
  if (!value) return "Any";
  if (value.startsWith("country-search:")) return value.slice("country-search:".length);
  const data = originFilterData();
  const hit = [...data.regions, ...data.countries].find((item) => item.value === value);
  return hit?.label || "Any";
}

export function addTaxonomyTextFilter() {
  const row = document.createElement("label");
  row.className = "filter-row filter-panel-card filter-select-row filter-taxonomy-row";
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = "Taxonomy";
  const output = document.createElement("output");
  output.dataset.filterOutput = "taxonomy";
  output.textContent = categoryOutputLabel("taxonomy");
  header.append(label, output);
  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = isColorAttributeMode() ? "Taxon to highlight, or blank for families" : "Class, order, family, genus";
  input.value = isColorAttributeMode() ? categoryColorValue("taxonomy") || "" : state.categoryFilters.taxonomy || "";
  input.dataset.filterInput = "taxonomy";
  input.setAttribute("aria-label", "Taxonomy");
  input.addEventListener("input", () => {
    const text = input.value.trim();
    if (isColorAttributeMode()) {
      setCategoryColorValue("taxonomy", text);
      output.textContent = categoryOutputLabel("taxonomy");
      return;
    }
    state.categoryFilters.taxonomy = text;
    output.textContent = text || "Any";
    updateFilter();
  });
  row.append(header, input);
  els.filterControls.append(row);
}

export function addHabitatFilter() {
  const habitats = availableHabitatFilters();
  if (!habitats.length) return;
  const row = document.createElement("div");
  row.className = "filter-row filter-panel-card habitat-filter-row";
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = "Habitat";
  const output = document.createElement("output");
  output.dataset.filterOutput = "habitat";
  output.textContent = categoryOutputLabel("habitat");
  header.append(label, output);
  const controls = document.createElement("div");
  controls.className = "habitat-filter-options";
  for (const { key, label: habitatLabel, icon, count } of habitats) {
    const button = document.createElement("button");
    button.type = "button";
    button.title = `${habitatLabel} · ${count.toLocaleString()} shells`;
    button.dataset.categoryFilter = "habitat";
    button.dataset.filterValue = key;
    button.setAttribute("aria-label", habitatLabel);
    button.setAttribute("aria-pressed", activeCategoryValue("habitat") === key ? "true" : "false");
    const glyph = document.createElement("span");
    glyph.className = `habitat-icon habitat-${key}`;
    glyph.innerHTML = icon;
    button.append(glyph);
    button.addEventListener("click", () => {
      if (isColorAttributeMode()) {
        setCategoryColorValue("habitat", key);
        return;
      }
      state.categoryFilters.habitat = state.categoryFilters.habitat === key ? "" : key;
      updateFilter();
    });
    controls.append(button);
  }
  row.append(header, controls);
  els.filterControls.append(row);
}

export function addRangeFilter(def) {
  state.morphFilters.set(def.key, state.morphFilters.get(def.key) || { min: 0, max: 1 });
  const row = document.createElement("div");
  row.className = `filter-row filter-panel-card filter-range-row filter-${def.key}-row`;
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = def.label;
  const output = document.createElement("output");
  output.dataset.filterOutput = `range:${def.key}`;
  const activeLevelKey = activeRangeLevelKey(def.key);
  output.textContent = rangeOutputLabel(def.key);
  header.append(label, output);
  const levels = document.createElement("div");
  levels.className = "filter-levels";
  for (const level of filterLevels) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.level = level.key;
    button.dataset.rangeFilter = def.key;
    button.textContent = level.label;
    button.title = `${def.label}: ${level.label}`;
    const pressed = activeLevelKey === level.key;
    button.setAttribute("aria-pressed", pressed ? "true" : "false");
    button.addEventListener("click", () => {
      if (isColorAttributeMode()) {
        setRangeColorValue(def.key, level.key);
        return;
      }
      const isActive = button.getAttribute("aria-pressed") === "true";
      state.morphFilters.set(def.key, isActive ? { min: 0, max: 1 } : { min: level.min, max: level.max });
      updateFilter();
    });
    levels.append(button);
  }
  row.append(header, levels);
  els.filterControls.append(row);
}

export function addColorPickerFilter() {
  if (!hasColorFilterData()) return;
  const colors = availablePaletteColorFilters();
  if (!colors.length) return;
  const row = document.createElement("div");
  row.className = "filter-row filter-panel-card color-filter-row";
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = "Color";
  const output = document.createElement("output");
  output.dataset.filterOutput = "color";
  output.textContent = categoryOutputLabel("color");
  header.append(label, output);
  const panel = document.createElement("div");
  panel.className = "color-filter-panel";
  const controls = document.createElement("div");
  controls.className = "color-swatch-filter";
  const preferredColumns = [12, 11, 10, 9, 8, 7, 6, 5];
  const columns = preferredColumns.find((value) => colors.length >= value && colors.length % value <= 1)
    || Math.min(10, Math.max(5, Math.ceil(Math.sqrt(colors.length * 1.4))));
  controls.style.setProperty("--color-filter-columns", String(columns));
  for (const { bin, hex, count, weight } of colors) {
    const value = colorBinFilterValue(bin);
    const button = document.createElement("button");
    button.type = "button";
    button.title = `${hex} · bin ${bin} · ${count} shells · weight ${weight.toFixed(2)}`;
    button.dataset.categoryFilter = "color";
    button.dataset.filterValue = value;
    button.setAttribute("aria-label", `${hex} color bin`);
    button.setAttribute("aria-pressed", activeCategoryValue("color") === value ? "true" : "false");
    button.style.setProperty("--swatch", hex);
    const dot = document.createElement("span");
    dot.className = "color-swatch-dot";
    button.append(dot);
    button.addEventListener("click", () => {
      if (isColorAttributeMode()) {
        setCategoryColorValue("color", value);
        return;
      }
      state.categoryFilters.color = state.categoryFilters.color === value ? "" : value;
      updateFilter();
    });
    controls.append(button);
  }
  panel.append(controls);
  row.append(header, panel);
  els.filterControls.append(row);
}

export function buildTraitFilters() {
  if (!els.filterControls) return;
  syncAttributeModeControls();
  els.filterControls.innerHTML = "";
  const originOptions = originFilterOptions();
  const rarityOptions = availableRarityOptions();
  const visibleRangeDefs = availableRangeFilterDefs();
  if (
    state.categoryFilters.origin
    && !state.categoryFilters.origin.startsWith("country-search:")
    && !originOptions.some(([value]) => value === state.categoryFilters.origin)
  ) {
    state.categoryFilters.origin = "";
  }
  if (!rarityOptions.includes(state.categoryFilters.rarity)) state.categoryFilters.rarity = "";
  if (state.categoryFilters.habitat && !availableHabitatFilters().some((def) => def.key === state.categoryFilters.habitat)) {
    state.categoryFilters.habitat = "";
  }
  const colorOptions = availablePaletteColorFilters().filter((color) => color.count > 0);
  if (
    state.categoryFilters.color
    && !colorOptions.some((color) => colorBinFilterValue(color.bin) === state.categoryFilters.color)
  ) {
    state.categoryFilters.color = "";
  }
  if (!hasColorFilterData()) state.categoryFilters.color = "";
  for (const def of rangeFilterDefs) {
    if (!visibleRangeDefs.includes(def)) state.morphFilters.set(def.key, { min: 0, max: 1 });
  }
  addTaxonomyTextFilter();
  addHabitatFilter();
  if (originOptions.length) addOriginSelectFilter();
  addColorPickerFilter();
  for (const def of visibleRangeDefs) {
    if (!state.morphFilters.has(def.key)) state.morphFilters.set(def.key, { min: 0, max: 1 });
    addRangeFilter(def);
  }
  addRarityFilter();
  updateFilterButton();
}

export function resetTraitFilters() {
  if (isColorAttributeMode()) {
    state.colorMode = "roughness";
    state.pointColorCache.clear();
    buildTraitFilters();
    renderColorLegend();
    scheduleDraw();
    scheduleHashUpdate();
    return;
  }
  for (const def of rangeFilterDefs) state.morphFilters.set(def.key, { min: 0, max: 1 });
  state.categoryFilters = { origin: "", taxonomy: "", habitat: "", rarity: "", color: "" };
  buildTraitFilters();
  updateFilter();
}

export function setAttributeMode(mode) {
  const next = mode === "color" ? "color" : "filter";
  if (state.attributeMode === next) return;
  state.attributeMode = next;
  buildTraitFilters();
  syncFilterControlState();
}

export function positionFiltersPanel() {
  if (!els.filtersPanel || !els.filtersToggle || els.filtersPanel.hidden) return;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1024;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 768;
  const toggleRect = els.filtersToggle.getBoundingClientRect();
  const controlsRect = els.controlsPanel?.getBoundingClientRect();
  const desktopRoom = controlsRect ? viewportWidth - controlsRect.right - 24 : 0;
  const desktop = viewportWidth > 1080 && desktopRoom >= 520;
  const width = desktop ? Math.min(460, desktopRoom) : Math.min(460, Math.max(340, viewportWidth - 24));
  const preferredLeft = desktop ? (controlsRect.right + 12) : toggleRect.left;
  const left = Math.max(12, Math.min(preferredLeft, viewportWidth - width - 12));
  const measuredHeight = els.filtersPanel.offsetHeight || 420;
  const preferredTop = desktop ? toggleRect.top : toggleRect.bottom + 8;
  const top = Math.max(12, Math.min(preferredTop, viewportHeight - Math.min(measuredHeight, viewportHeight - 24) - 12));
  els.filtersPanel.style.setProperty("--filters-left", `${Math.round(left)}px`);
  els.filtersPanel.style.setProperty("--filters-top", `${Math.round(top)}px`);
  els.filtersPanel.style.setProperty("--filters-width", `${Math.round(width)}px`);
}

export function setFiltersPanelOpen(open) {
  if (!els.filtersPanel || !els.filtersToggle) return;
  els.filtersPanel.hidden = !open;
  els.filtersToggle.setAttribute("aria-expanded", open ? "true" : "false");
  if (open) {
    syncFilterControlState();
    positionFiltersPanel();
    window.requestAnimationFrame(positionFiltersPanel);
  }
}
