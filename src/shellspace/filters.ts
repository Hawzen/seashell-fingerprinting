// @ts-nocheck

import { filterLevels, rangeFilterDefs, rarityFilterOptions } from './constants';
import { colorBinFilterValue, colorBinFromFilterValue, occupiedColorBins, shellHasColorBin } from './color-bins';
import { countryDisplayLabel, countrySearchText, parseCountryList } from './countries';
import { primeSurpriseQueue, resetSurpriseQueue } from './images-loading';
import { scheduleDraw, shellRgba } from './map-scatter';
import { renderPalette } from './palette';
import { els, state } from './runtime';
import { scheduleRenderNeighbors } from './source-neighbors';
import { clamp01, relativeArea } from './utils';

export function shellOriginKey(shell) {
  return shell?.species_traits?.region_key || shell?.location_key || "unknown";
}

function gbifCountryItems(shell) {
  return parseCountryList(shell?.gbif_countries_top || shell?.enrichment?.countries_top || "");
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
    return String(shell?.location_label || "").toLowerCase().includes(query)
      || (shell?.species_traits?.known_range_countries || []).some((country) =>
        `${country.label || ""} ${country.code || ""}`.toLowerCase().includes(query),
      )
      || gbifCountryItems(shell).some((country) => countrySearchText(country.code).includes(query));
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
      || gbifCountryItems(shell).some((country) => country.code === value);
  }
  return shellOriginKey(shell) === filterValue;
}

function isKnownDataLabel(value) {
  const text = String(value || "").trim().toLowerCase();
  return text && !["unknown", "not assessed", "data deficient", "locality unavailable"].includes(text);
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
  return rangeFilterDefs.filter((def) => state.shells.some((shell) => filterValue(shell, def.key) != null));
}

export function availableRarityOptions() {
  const values = new Set();
  for (const shell of state.shells) {
    const label = shell.rarity_label || shell.enrichment?.rarity_proxy;
    if (isKnownDataLabel(label)) values.add(label);
  }
  return rarityFilterOptions.filter((option) => values.has(option)).concat([...values].filter((option) => !rarityFilterOptions.includes(option)).sort());
}

export function hasColorFilterData() {
  return occupiedColorBins(state.shells).length > 0 || state.shells.some((shell) => normalizedPaletteRgb(shell).length || (
    shell.color_r_mean != null
    && shell.color_g_mean != null
    && shell.color_b_mean != null
    && Number.isFinite(Number(shell.color_r_mean))
    && Number.isFinite(Number(shell.color_g_mean))
    && Number.isFinite(Number(shell.color_b_mean))
  ));
}

export function availablePaletteColorFilters() {
  return occupiedColorBins(state.shells);
}

export function colorFilterLabel(value) {
  if (!value) return "Any";
  const bin = colorBinFromFilterValue(value);
  const item = bin == null ? null : occupiedColorBins(state.shells).find((color) => color.bin === bin);
  return item?.hex || value;
}

export function passesMorphFilters(shell) {
  for (const def of availableRangeFilterDefs()) {
    const filter = state.morphFilters.get(def.key);
    if (!filter) continue;
    const value = filterValue(shell, def.key);
    if (value == null) continue;
    if (value < filter.min || value > filter.max) return false;
  }
  if (state.categoryFilters.rarity && shell.rarity_label !== state.categoryFilters.rarity) return false;
  if (state.categoryFilters.origin && !shellOriginMatches(shell, state.categoryFilters.origin)) return false;
  if (state.categoryFilters.color && !shellMatchesColor(shell, state.categoryFilters.color)) return false;
  return true;
}

export function updateFilter() {
  const query = els.search.value.trim().toLowerCase();
  state.filtered = query
    ? state.shells.filter((shell) =>
        `${shell.name} ${shell.species} ${shell.file} ${shell.fingerprint_hash || ""} ${shell.legacy_fingerprint_hash || ""} ${shell.location_label || ""}`.toLowerCase().includes(query)
        && passesMorphFilters(shell),
      )
    : state.shells.filter(passesMorphFilters);
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
  els.filtersToggle.textContent = active ? `Filters (${active})` : "Filters";
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
    for (const country of gbifCountryItems(shell)) {
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
  output.textContent = originFilterLabel(state.categoryFilters.origin);
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
  input.setAttribute("aria-label", "Country");
  input.setAttribute("list", listId);
  for (const [value, labelValue] of options) {
    const option = document.createElement("option");
    option.value = labelValue;
    option.label = value.replace(/^country:/, "");
    option.textContent = labelValue;
    list.append(option);
  }
  if (state.categoryFilters.origin?.startsWith("country-search:")) {
    input.value = state.categoryFilters.origin.slice("country-search:".length);
  } else if (state.categoryFilters.origin) {
    input.value = optionByValue.get(state.categoryFilters.origin) || "";
  }
  input.addEventListener("input", () => {
    const text = input.value.trim();
    state.categoryFilters.origin = text
      ? optionByLabel.get(text.toLowerCase()) || `country-search:${text}`
      : "";
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
  output.textContent = state.categoryFilters.rarity || "Any";
  header.append(label, output);
  const levels = document.createElement("div");
  levels.className = "rarity-filter-options";
  for (const value of rarityOptions) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = value || "Any";
    button.setAttribute("aria-pressed", (state.categoryFilters.rarity || "") === value ? "true" : "false");
    button.addEventListener("click", () => {
      state.categoryFilters.rarity = state.categoryFilters.rarity === value ? "" : value;
      buildTraitFilters();
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

export function addRangeFilter(def) {
  state.morphFilters.set(def.key, state.morphFilters.get(def.key) || { min: 0, max: 1 });
  const row = document.createElement("div");
  row.className = `filter-row filter-panel-card filter-range-row filter-${def.key}-row`;
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = def.label;
  const output = document.createElement("output");
  const current = state.morphFilters.get(def.key);
  const activeLevel = filterLevels.find((level) => Math.abs(current.min - level.min) < 0.01 && Math.abs(current.max - level.max) < 0.01);
  output.textContent = activeLevel?.label || "Any";
  header.append(label, output);
  const levels = document.createElement("div");
  levels.className = "filter-levels";
  for (const level of filterLevels) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.level = level.key;
    button.textContent = level.label;
    button.title = `${def.label}: ${level.label}`;
    const pressed = activeLevel?.key === level.key;
    button.setAttribute("aria-pressed", pressed ? "true" : "false");
    button.addEventListener("click", () => {
      const isActive = button.getAttribute("aria-pressed") === "true";
      state.morphFilters.set(def.key, isActive ? { min: 0, max: 1 } : { min: level.min, max: level.max });
      buildTraitFilters();
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
  output.textContent = colorFilterLabel(state.categoryFilters.color);
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
    button.setAttribute("aria-label", `${hex} color bin`);
    button.setAttribute("aria-pressed", state.categoryFilters.color === value ? "true" : "false");
    button.style.setProperty("--swatch", hex);
    const dot = document.createElement("span");
    dot.className = "color-swatch-dot";
    button.append(dot);
    button.addEventListener("click", () => {
      state.categoryFilters.color = state.categoryFilters.color === value ? "" : value;
      buildTraitFilters();
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
  if (originOptions.length) addOriginSelectFilter();
  addRarityFilter();
  addColorPickerFilter();
  for (const def of visibleRangeDefs) {
    if (!state.morphFilters.has(def.key)) state.morphFilters.set(def.key, { min: 0, max: 1 });
    addRangeFilter(def);
  }
  updateFilterButton();
}

export function resetTraitFilters() {
  for (const def of rangeFilterDefs) state.morphFilters.set(def.key, { min: 0, max: 1 });
  state.categoryFilters = { origin: "", rarity: "", color: "" };
  buildTraitFilters();
  updateFilter();
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
    positionFiltersPanel();
    window.requestAnimationFrame(positionFiltersPanel);
  }
}
