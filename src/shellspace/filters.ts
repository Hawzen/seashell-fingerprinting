// @ts-nocheck

import { colorSwatches, filterLevels, rangeFilterDefs, rarityFilterOptions } from './constants';
import { primeSurpriseQueue, resetSurpriseQueue } from './images-loading';
import { scheduleDraw, shellRgba } from './map-scatter';
import { renderPalette } from './palette';
import { els, state } from './runtime';
import { scheduleRenderNeighbors } from './source-neighbors';
import { clamp01, relativeArea } from './utils';

export function shellOriginKey(shell) {
  return shell?.species_traits?.region_key || shell?.location_key || "unknown";
}

export function shellOriginLabel(shell) {
  return shell?.species_traits?.region_label || shell?.region_label || shell?.location_label || "Unknown";
}

export function shellOriginMatches(shell, filterValue) {
  if (!filterValue) return true;
  const [type, value] = filterValue.split(":");
  if (!value) return shellOriginKey(shell) === filterValue;
  if (type === "region") {
    return shell?.species_traits?.region_key === value
      || shell?.region_key === value
      || shell?.location_key === value
      || shellOriginKey(shell) === value;
  }
  if (type === "country") {
    return shell?.location_key === value
      || shell?.species_traits?.primary_country === value
      || (shell?.species_traits?.known_range_countries || []).some((country) => country.code === value);
  }
  return shellOriginKey(shell) === filterValue;
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

export function shellColorDistance(shell, hex) {
  const target = hexToRgb(hex);
  if (!target) return Infinity;
  if (shell.color_r_mean == null || shell.color_g_mean == null || shell.color_b_mean == null) return null;
  const shellColor = shellRgba(shell);
  const dr = shellColor[0] - target.r;
  const dg = shellColor[1] - target.g;
  const db = shellColor[2] - target.b;
  const patternBonus = Math.min(24, Math.max(0, shell.color_pattern_strength || 0) * 80);
  return Math.sqrt(dr * dr + dg * dg + db * db) - patternBonus;
}

export function shellMatchesColor(shell, hex) {
  if (!hex) return true;
  const distance = shellColorDistance(shell, hex);
  return distance == null ? true : distance <= 105;
}

export function filterValue(shell, key) {
  if (key === "lightness") return shell.color_l_mean == null ? null : clamp01(shell.color_l_mean);
  if (key === "area") return shell.area == null || shell.image_width == null || shell.image_height == null ? null : relativeArea(shell);
  if (key === "concavity") return shell.contour_concavity == null ? null : clamp01(shell.contour_concavity / 0.32);
  if (key === "asymmetry") return shell.morph_traits?.asymmetry == null ? null : clamp01(shell.morph_traits.asymmetry);
  return null;
}

export function passesMorphFilters(shell) {
  for (const def of rangeFilterDefs) {
    const filter = state.morphFilters.get(def.key);
    if (!filter) continue;
    const value = filterValue(shell, def.key);
    if (value == null) continue;
    if (value < filter.min || value > filter.max) return false;
  }
  if (state.categoryFilters.rarity && shell.rarity_label !== state.categoryFilters.rarity) return false;
  if (!shellOriginMatches(shell, state.categoryFilters.origin)) return false;
  if (!shellMatchesColor(shell, state.categoryFilters.color)) return false;
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
  for (const def of rangeFilterDefs) {
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
    ...originFilterData().regions.map((item) => [item.value, `Continent: ${item.label}`]),
    ...originFilterData().countries.map((item) => [item.value, `Country: ${item.label}`]),
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
        label: country.label,
        region: shell.species_traits?.region_key || "",
        count: 0,
      };
      current.count += Math.max(1, Number(country.count || 0));
      countries.set(value, current);
    }
    const localityKey = shell.location_key || "";
    if (localityKey && localityKey !== "unknown" && localityKey.length <= 3) {
      const value = `country:${localityKey}`;
      const current = countries.get(value) || {
        value,
        code: localityKey,
        label: shell.location_label?.split(",")[0] || localityKey,
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
  label.textContent = "Origin";
  const output = document.createElement("output");
  output.textContent = originFilterLabel(state.categoryFilters.origin);
  header.append(label, output);
  const select = document.createElement("select");
  select.setAttribute("aria-label", "Origin");
  for (const [value, labelValue] of [["", "Any origin"], ...originFilterOptions()]) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = labelValue;
    select.append(option);
  }
  select.value = state.categoryFilters.origin || "";
  select.addEventListener("change", () => {
    state.categoryFilters.origin = select.value;
    buildTraitFilters();
    updateFilter();
  });
  row.append(header, select);
  els.filterControls.append(row);
}

export function addRarityFilter() {
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
  for (const value of ["", ...rarityFilterOptions]) {
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
  const row = document.createElement("div");
  row.className = "filter-row filter-panel-card color-filter-row";
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = "Color";
  const output = document.createElement("output");
  output.textContent = colorSwatches.find(([hex]) => hex === state.categoryFilters.color)?.[1] || "Any";
  header.append(label, output);
  const panel = document.createElement("div");
  panel.className = "color-filter-panel";
  const controls = document.createElement("div");
  controls.className = "color-swatch-filter";
  for (const [hex, name] of colorSwatches) {
    const button = document.createElement("button");
    button.type = "button";
    button.title = name;
    button.setAttribute("aria-label", name);
    button.setAttribute("aria-pressed", state.categoryFilters.color === hex ? "true" : "false");
    button.style.setProperty("--swatch", hex);
    const dot = document.createElement("span");
    dot.className = "color-swatch-dot";
    button.append(dot);
    button.addEventListener("click", () => {
      state.categoryFilters.color = state.categoryFilters.color === hex ? "" : hex;
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
  addOriginSelectFilter();
  addRarityFilter();
  addColorPickerFilter();
  for (const def of rangeFilterDefs) {
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
