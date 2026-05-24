// @ts-nocheck

import { reconstructFromPc } from './geometry-generation';
import { popReadySurpriseShell, randomShellFromSource } from './images-loading';
import { axisLabel, axisMeaning, axisOptionCount, axisValue, axisVariance, contourAxisCount, initialViewport, scheduleDraw, screenToWorld } from './map-scatter';
import { resizeCanvas, scheduleHashUpdate } from './routing-canvas';
import { els, scatterCtx, state } from './runtime';
import { selectShell } from './selection-palette';
import { formatNumber } from './utils';

export function shellById(id) {
  const numeric = Number(id);
  if (!Number.isFinite(numeric)) return null;
  return state.shellById.get(numeric) || null;
}

export function centerViewportOnShell(shell) {
  if (!state.viewport || !shell) return;
  const width = state.viewport.maxX - state.viewport.minX;
  const height = state.viewport.maxY - state.viewport.minY;
  const x = axisValue(shell, state.xAxis);
  const y = axisValue(shell, state.yAxis);
  state.viewport = {
    minX: x - width / 2,
    maxX: x + width / 2,
    minY: y - height / 2,
    maxY: y + height / 2,
  };
}

export function selectRandomShell() {
  const source = state.filtered.length ? state.filtered : state.shells;
  if (!source.length) return;
  const shell = popReadySurpriseShell(source) || randomShellFromSource(source);
  if (!shell) return;
  centerViewportOnShell(shell);
  selectShell(shell, { preferFastSource: true, renderNearest: false });
  scheduleDraw(420);
}

export function iucnSearchUrl(species) {
  const encoded = encodeURIComponent(species || "");
  return `https://www.iucnredlist.org/search?query=${encoded}&searchType=species`;
}

export function speciesCacheKey(species) {
  return String(species || "").trim().toLowerCase();
}

export function iucnStatusName(code) {
  const normalized = String(code || "").trim().toUpperCase();
  return {
    EX: "Extinct",
    EW: "Extinct in the wild",
    CR: "Critically endangered",
    EN: "Endangered",
    VU: "Vulnerable",
    NT: "Near threatened",
    LC: "Least concern",
    DD: "Data deficient",
  }[normalized] || normalized;
}

export function conservationRecordIsGlobal(record) {
  return record && (record.place == null && record.place_id == null);
}

export function conservationRecordIsIucn(record) {
  return /iucn/i.test(String(record?.authority || "")) || Number(record?.iucn || 0) > 0;
}

export function bestConservationRecord(...taxa) {
  const records = [];
  for (const taxon of taxa) {
    if (!taxon) continue;
    if (taxon.conservation_status) records.push(taxon.conservation_status);
    if (Array.isArray(taxon.conservation_statuses)) records.push(...taxon.conservation_statuses);
  }
  return records.find((record) => conservationRecordIsGlobal(record) && conservationRecordIsIucn(record))
    || records.find((record) => conservationRecordIsIucn(record))
    || records.find((record) => conservationRecordIsGlobal(record))
    || records[0]
    || null;
}

export function conservationStatusLabel(record) {
  if (!record) return "Not assessed";
  const code = String(record.status || "").trim().toUpperCase();
  const rawName = record.status_name || record.description || iucnStatusName(code) || code;
  const name = String(rawName || "").trim();
  if (!name) return "Not assessed";
  if (!code || name.toUpperCase().includes(`(${code})`) || name.toUpperCase() === code) return name;
  return `${name} (${code})`;
}

export function pickINaturalistTaxon(results, species) {
  const key = speciesCacheKey(species);
  return results.find((taxon) => speciesCacheKey(taxon.name) === key)
    || results.find((taxon) => speciesCacheKey(taxon.matched_term) === key)
    || results.find((taxon) => taxon.rank === "species")
    || results[0]
    || null;
}

export async function lookupConservationStatus(species, { signal = null } = {}) {
  var _a;
  const key = speciesCacheKey(species);
  if (!key) return { status: "Not assessed", authority: "", url: "", taxonId: null };
  if (state.conservationCache.has(key)) return state.conservationCache.get(key);
  const params = new URLSearchParams({ q: species, per_page: "8" });
  const fallback = { status: "Not assessed", authority: "iNaturalist", url: iucnSearchUrl(species), taxonId: null };
  try {
    const searchResponse = await fetch(`https://api.inaturalist.org/v1/taxa/autocomplete?${params.toString()}`, { signal });
    if (!searchResponse.ok) return fallback;
    const searchPayload = await searchResponse.json();
    const taxon = pickINaturalistTaxon(searchPayload.results || [], species);
    if (!(taxon == null ? void 0 : taxon.id)) {
      state.conservationCache.set(key, fallback);
      return fallback;
    }
    let detailTaxon = taxon;
    const detailResponse = await fetch(`https://api.inaturalist.org/v1/taxa/${taxon.id}`, { signal });
    if (detailResponse.ok) {
      const detailPayload = await detailResponse.json();
      detailTaxon = ((_a = detailPayload.results) == null ? void 0 : _a[0]) || taxon;
    }
    const record = bestConservationRecord(detailTaxon, taxon);
    const result = {
      status: conservationStatusLabel(record),
      authority: (record == null ? void 0 : record.authority) || "iNaturalist",
      url: (record == null ? void 0 : record.url) || iucnSearchUrl(species),
      taxonId: taxon.id
    };
    state.conservationCache.set(key, result);
    return result;
  } catch (error) {
    if ((error == null ? void 0 : error.name) === "AbortError") throw error;
    return fallback;
  }
}

export function zoom(factor, center = null) {
  const size = resizeCanvas(els.scatter, scatterCtx);
  const pivot = center || { x: size.width / 2, y: size.height / 2 };
  const before = screenToWorld(pivot.x, pivot.y, size);
  const vx = state.viewport;
  const base = initialViewport(state.xAxis, state.yAxis);
  const baseWidth = base.maxX - base.minX;
  const baseHeight = base.maxY - base.minY;
  const minWidth = Math.max(baseWidth * 0.04, 0.001);
  const minHeight = Math.max(baseHeight * 0.04, 0.001);
  const maxWidth = Math.max(baseWidth * 8, minWidth);
  const maxHeight = Math.max(baseHeight * 8, minHeight);
  const width = Math.max(minWidth, Math.min(maxWidth, (vx.maxX - vx.minX) * factor));
  const height = Math.max(minHeight, Math.min(maxHeight, (vx.maxY - vx.minY) * factor));
  state.viewport = {
    minX: before.x - (pivot.x / size.width) * width,
    maxX: before.x + (1 - pivot.x / size.width) * width,
    minY: before.y - ((size.height - pivot.y) / size.height) * height,
    maxY: before.y + (pivot.y / size.height) * height,
  };
  scheduleDraw();
}

export function panViewportByWheel(deltaX, deltaY) {
  const size = resizeCanvas(els.scatter, scatterCtx);
  const vx = state.viewport;
  if (!vx || !size.width || !size.height) return;
  const worldX = (deltaX / size.width) * (vx.maxX - vx.minX);
  const worldY = (deltaY / size.height) * (vx.maxY - vx.minY);
  state.viewport = {
    minX: vx.minX + worldX,
    maxX: vx.maxX + worldX,
    minY: vx.minY - worldY,
    maxY: vx.maxY - worldY,
  };
  scheduleDraw();
}

export function buildAxisControls() {
  const count = axisOptionCount();
  for (const select of [els.xAxisSelect, els.yAxisSelect]) {
    select.innerHTML = "";
    for (let index = 0; index < count; index += 1) {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = `${axisLabel(index)} (${formatNumber(axisVariance(index) * 100, 1)}%)`;
      select.append(option);
    }
  }
  els.xAxisSelect.value = String(state.xAxis);
  els.yAxisSelect.value = String(state.yAxis);
}

export function setAxes(xAxis, yAxis) {
  state.xAxis = xAxis;
  state.yAxis = yAxis;
  els.xAxisSelect.value = String(xAxis);
  els.yAxisSelect.value = String(yAxis);
  state.viewport = initialViewport(xAxis, yAxis);
  renderPcaInterpretation();
  scheduleDraw(120);
  scheduleHashUpdate();
}

export function buildPcControls() {
  els.pcControls.innerHTML = "";
  const count = contourAxisCount();
  state.pcValues = Array.from({ length: state.model.contour_component_count || count }, () => 0);
  state.pcControlRows = [];
  for (let index = 0; index < count; index += 1) {
    const range = state.model.contour_pca_ranges[index];
    const low = range ? range.p01 : -1;
    const high = range ? range.p99 : 1;
    const step = Math.max((high - low) / 500, 0.001);
    const row = document.createElement("div");
    row.className = "pc-row";

    const label = document.createElement("label");
    label.textContent = axisMeaning(index);
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(low);
    slider.max = String(high);
    slider.step = String(step);
    slider.value = "0";
    const number = document.createElement("input");
    number.type = "number";
    number.step = String(step);
    number.value = "0.000";

    slider.addEventListener("input", () => setPcValue(index, Number(slider.value)));
    number.addEventListener("change", () => setPcValue(index, Number(number.value)));
    row.append(label, slider, number);
    state.pcControlRows[index] = { slider, number };
    els.pcControls.append(row);
  }
}

export function updatePcControl(index, value) {
  const row = state.pcControlRows[index];
  if (!row) return;
  row.slider.value = String(value);
  row.number.value = Number(value).toFixed(3);
}

export function syncPcControls(values = state.pcValues) {
  values.forEach((value, index) => updatePcControl(index, value));
}

export function syncActivePcControls(values = state.pcValues) {
  const axes = new Set([state.xAxis, state.yAxis]);
  for (const axis of axes) {
    if (axis >= 0 && axis < values.length) updatePcControl(axis, values[axis]);
  }
}

export function setPcValue(index, value) {
  state.pcValues[index] = value;
  updatePcControl(index, value);
  reconstructFromPc();
  scheduleDraw();
  scheduleHashUpdate();
}

export function setPcValues(values, updateHash = true) {
  values.forEach((value, index) => {
    state.pcValues[index] = value;
    updatePcControl(index, value);
  });
  reconstructFromPc();
  scheduleDraw();
  if (updateHash) scheduleHashUpdate();
}

export function renderPcaInterpretation() {
  return;
}
