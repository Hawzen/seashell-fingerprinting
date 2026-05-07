const publicBase = new URL(".", import.meta.url).pathname;
const repoBase = publicBase.endsWith("/public/")
  ? publicBase.slice(0, -"public/".length)
  : publicBase;

const mapSpaces = ["contour", "trait"];
const colorModes = ["species", "shell", "lightness", "chroma", "roughness", "concavity", "trait"];
const overlayLayerNames = ["contour", "center"];

const state = {
  shells: [],
  filtered: [],
  contours: null,
  contourPoints: 0,
  contourScale: 1,
  model: null,
  viewport: null,
  selected: null,
  selectedContour: null,
  generatedContour: null,
  generatedTraits: null,
  generatedNeighbors: [],
  generatedMode: "selected",
  colorMixTarget: null,
  colorMixTraits: null,
  colorMixNeighbors: [],
  colorRange: null,
  generatorKernel: null,
  generatorKernelReady: false,
  mapSpace: "contour",
  xAxis: 0,
  yAxis: 1,
  colorMode: "species",
  pcValues: [],
  traitPcValues: [],
  overlayLayers: {
    contour: true,
    center: true,
  },
  draggingTarget: false,
  draggingColor: false,
  panningViewport: null,
  walkingPca: false,
  walkFrame: 0,
  walkStartedAt: 0,
  hashReady: false,
  suppressHash: false,
  hashTimer: 0,
  needsDraw: true,
};

const els = {
  statusLine: document.querySelector("#statusLine"),
  visibleCount: document.querySelector("#visibleCount"),
  explainedVariance: document.querySelector("#explainedVariance"),
  search: document.querySelector("#searchBox"),
  randomShell: document.querySelector("#randomShell"),
  mapSpaceSelect: document.querySelector("#mapSpaceSelect"),
  xAxisSelect: document.querySelector("#xAxisSelect"),
  yAxisSelect: document.querySelector("#yAxisSelect"),
  colorModeSelect: document.querySelector("#colorModeSelect"),
  pcaInterpretation: document.querySelector("#pcaInterpretation"),
  scatter: document.querySelector("#scatterCanvas"),
  pointTooltip: document.querySelector("#pointTooltip"),
  sourceImage: document.querySelector("#sourceImage"),
  sourceOverlay: document.querySelector("#sourceOverlay"),
  overlayContour: document.querySelector("#overlayContour"),
  overlayCenter: document.querySelector("#overlayCenter"),
  selectedName: document.querySelector("#selectedName"),
  selectedDetails: document.querySelector("#selectedDetails"),
  neighborsList: document.querySelector("#neighborsList"),
  outline: document.querySelector("#outlineCanvas"),
  generatorStatus: document.querySelector("#generatorStatus"),
  pcControls: document.querySelector("#pcControls"),
  meanShape: document.querySelector("#meanShape"),
  walkPca: document.querySelector("#walkPca"),
  exportSvg: document.querySelector("#exportSvg"),
  colorMix: document.querySelector("#colorMixCanvas"),
  colorMixStatus: document.querySelector("#colorMixStatus"),
  colorMixSwatches: document.querySelector("#colorMixSwatches"),
  resetColorMix: document.querySelector("#resetColorMix"),
  zoomIn: document.querySelector("#zoomIn"),
  zoomOut: document.querySelector("#zoomOut"),
  resetView: document.querySelector("#resetView"),
  missingData: document.querySelector("#missingData"),
};

const scatterCtx = els.scatter.getContext("2d");
const outlineCtx = els.outline.getContext("2d");
const sourceOverlayCtx = els.sourceOverlay.getContext("2d");
const colorMixCtx = els.colorMix.getContext("2d");
const normalizedContourCache = new Map();

function asset(path) {
  return `${publicBase}${path}`;
}

function datasetAsset(path) {
  return `${repoBase}dataset/${encodeURIComponent(path).replaceAll("%2F", "/")}`;
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function formatNumber(value, digits = 3) {
  return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: digits });
}

function quantile(values, q) {
  if (!values.length) return 0;
  const copy = [...values].sort((a, b) => a - b);
  const index = Math.min(copy.length - 1, Math.max(0, Math.round((copy.length - 1) * q)));
  return copy[index];
}

function fetchJson(url) {
  return fetch(url, { cache: "no-store" }).then((response) => {
    if (!response.ok) throw new Error(`${url} returned ${response.status}`);
    return response.json();
  });
}

function fetchArrayBuffer(url) {
  return fetch(url, { cache: "no-store" }).then((response) => {
    if (!response.ok) throw new Error(`${url} returned ${response.status}`);
    return response.arrayBuffer();
  });
}

async function initGeneratorKernel() {
  if (!("WebAssembly" in window)) return;
  try {
    const response = await fetch(asset("shell-generator.wasm"), { cache: "no-store" });
    if (!response.ok) throw new Error(`shell-generator.wasm returned ${response.status}`);
    let compiled;
    try {
      compiled = await WebAssembly.instantiateStreaming(response.clone(), {});
    } catch (_mimeError) {
      compiled = await WebAssembly.instantiate(await response.arrayBuffer(), {});
    }
    state.generatorKernel = compiled.instance.exports;
    state.generatorKernelReady = Boolean(
      state.generatorKernel?.memory && state.generatorKernel?.blend_contours,
    );
  } catch (_error) {
    state.generatorKernelReady = false;
  }
}

function parseHashState() {
  const raw = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  return new URLSearchParams(raw);
}

function updateHashState() {
  if (!state.hashReady || state.suppressHash) return;
  const params = new URLSearchParams();
  if (state.selected) params.set("id", String(state.selected.id));
  params.set("space", state.mapSpace);
  params.set("x", String(state.xAxis));
  params.set("y", String(state.yAxis));
  params.set("color", state.colorMode);
  params.set("pc", state.pcValues.slice(0, 6).map((value) => Number(value).toFixed(3)).join(","));
  if (state.traitPcValues.length) {
    params.set(
      "trait",
      state.traitPcValues.slice(0, 6).map((value) => Number(value).toFixed(3)).join(","),
    );
  }
  const next = `${window.location.pathname}${window.location.search}#${params.toString()}`;
  window.history.replaceState(null, "", next);
}

function scheduleHashUpdate() {
  if (!state.hashReady || state.suppressHash) return;
  window.clearTimeout(state.hashTimer);
  state.hashTimer = window.setTimeout(updateHashState, 80);
}

function resizeCanvas(canvas, ctx) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.needsDraw = true;
  }
  return { width: rect.width, height: rect.height };
}

function contourAxisCount() {
  return Math.min(6, state.model?.contour_visible_component_count || 0);
}

function traitAxisCount() {
  return Math.min(6, state.model?.trait_visible_component_count || 0);
}

function axisOptionCount() {
  return state.mapSpace === "trait" && traitAxisCount() ? traitAxisCount() : contourAxisCount();
}

function activeAxisValues() {
  return state.mapSpace === "trait" ? state.traitPcValues : state.pcValues;
}

function axisRange(axisIndex) {
  if (state.mapSpace === "trait" && state.model.trait_pca_ranges?.[axisIndex]) {
    return state.model.trait_pca_ranges[axisIndex];
  }
  return state.model.contour_pca_ranges?.[axisIndex];
}

function axisVariance(axisIndex) {
  if (state.mapSpace === "trait") {
    return state.model.trait_explained_variance_ratio?.[axisIndex] || 0;
  }
  return state.model.contour_explained_variance_ratio?.[axisIndex] || 0;
}

function axisLabel(axisIndex) {
  return `${state.mapSpace === "trait" ? "Trait" : "Contour"} PC${axisIndex + 1}`;
}

function axisValue(shell, axisIndex) {
  if (state.mapSpace === "trait" && shell.trait_pc?.length) return shell.trait_pc[axisIndex] || 0;
  return shell.contour_pc?.[axisIndex] || 0;
}

function initialViewport(xIndex = state.xAxis, yIndex = state.yAxis) {
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

function worldToScreen(x, y, size) {
  const vx = state.viewport;
  return {
    x: ((x - vx.minX) / (vx.maxX - vx.minX)) * size.width,
    y: size.height - ((y - vx.minY) / (vx.maxY - vx.minY)) * size.height,
  };
}

function screenToWorld(x, y, size) {
  const vx = state.viewport;
  return {
    x: vx.minX + (x / size.width) * (vx.maxX - vx.minX),
    y: vx.minY + ((size.height - y) / size.height) * (vx.maxY - vx.minY),
  };
}

function speciesColor(species, alpha = 0.78) {
  let hash = 0;
  for (let index = 0; index < species.length; index += 1) {
    hash = (hash * 31 + species.charCodeAt(index)) >>> 0;
  }
  return `hsla(${hash % 360}, 42%, 42%, ${alpha})`;
}

function shellRgb(shell, alpha = 1) {
  const red = Math.round(clamp01(shell.color_r_mean ?? 0.68) * 255);
  const green = Math.round(clamp01(shell.color_g_mean ?? 0.64) * 255);
  const blue = Math.round(clamp01(shell.color_b_mean ?? 0.56) * 255);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function pointColor(shell) {
  if (state.colorMode === "shell") return shellRgb(shell);
  if (state.colorMode === "lightness") {
    const t = clamp01(shell.color_l_mean ?? 0.5);
    return `hsl(48, 24%, ${24 + t * 54}%)`;
  }
  if (state.colorMode === "chroma") {
    const t = clamp01((shell.color_chroma_mean || 0) / 0.42);
    return `hsl(${40 + t * 220}, ${32 + t * 38}%, ${34 + t * 14}%)`;
  }
  if (state.colorMode === "roughness") {
    const t = clamp01((shell.roughness || 0) / 0.035);
    return `hsl(${178 - t * 165}, 60%, ${32 + t * 13}%)`;
  }
  if (state.colorMode === "concavity") {
    const t = clamp01((shell.contour_concavity || 0) / 0.32);
    return `hsl(${320 - t * 185}, 56%, ${35 + t * 11}%)`;
  }
  if (state.colorMode === "trait") {
    const range = state.model.trait_pca_ranges?.[0];
    const t = range ? clamp01(((shell.trait_pc?.[0] || 0) - range.p01) / (range.p99 - range.p01)) : 0.5;
    return `hsl(${254 - t * 220}, 56%, ${34 + Math.abs(t - 0.5) * 18}%)`;
  }
  return speciesColor(shell.species);
}

function scheduleDraw() {
  state.needsDraw = true;
  requestAnimationFrame(drawScatter);
}

function drawScatter() {
  const size = resizeCanvas(els.scatter, scatterCtx);
  if (!state.viewport || !state.needsDraw) return;
  state.needsDraw = false;
  scatterCtx.clearRect(0, 0, size.width, size.height);
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

  const stride = state.filtered.length > 30000 ? 2 : 1;
  for (let index = 0; index < state.filtered.length; index += stride) {
    const shell = state.filtered[index];
    const point = worldToScreen(axisValue(shell, state.xAxis), axisValue(shell, state.yAxis), size);
    if (point.x < -3 || point.x > size.width + 3 || point.y < -3 || point.y > size.height + 3) {
      continue;
    }
    scatterCtx.fillStyle = pointColor(shell);
    scatterCtx.fillRect(point.x - 1, point.y - 1, 2, 2);
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

  if (state.selected) {
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
  scatterCtx.restore();
}

function updateFilter() {
  const query = els.search.value.trim().toLowerCase();
  state.filtered = query
    ? state.shells.filter((shell) =>
        `${shell.name} ${shell.species} ${shell.file}`.toLowerCase().includes(query),
      )
    : state.shells;
  els.visibleCount.textContent = state.filtered.length.toLocaleString();
  renderNeighbors(state.selected);
  drawColorMix();
  scheduleDraw();
}

function shellById(id) {
  const numeric = Number(id);
  if (!Number.isFinite(numeric)) return null;
  return state.shells.find((shell) => shell.id === numeric) || null;
}

function centerViewportOnShell(shell) {
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

function selectRandomShell() {
  if (!state.filtered.length) return;
  let index = Math.floor(Math.random() * state.filtered.length);
  if (state.selected && state.filtered.length > 1 && state.filtered[index].id === state.selected.id) {
    index = (index + 1) % state.filtered.length;
  }
  centerViewportOnShell(state.filtered[index]);
  selectShell(state.filtered[index]);
}

function zoom(factor, center = null) {
  const size = resizeCanvas(els.scatter, scatterCtx);
  const pivot = center || { x: size.width / 2, y: size.height / 2 };
  const before = screenToWorld(pivot.x, pivot.y, size);
  const vx = state.viewport;
  const width = (vx.maxX - vx.minX) * factor;
  const height = (vx.maxY - vx.minY) * factor;
  state.viewport = {
    minX: before.x - (pivot.x / size.width) * width,
    maxX: before.x + (1 - pivot.x / size.width) * width,
    minY: before.y - ((size.height - pivot.y) / size.height) * height,
    maxY: before.y + (pivot.y / size.height) * height,
  };
  scheduleDraw();
}

function buildAxisControls() {
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

function updateAxisSummary() {
  const total = axisVariance(state.xAxis) + axisVariance(state.yAxis);
  els.explainedVariance.textContent = `${formatNumber(total * 100, 1)}%`;
}

function setAxes(xAxis, yAxis) {
  state.xAxis = xAxis;
  state.yAxis = yAxis;
  els.xAxisSelect.value = String(xAxis);
  els.yAxisSelect.value = String(yAxis);
  state.viewport = initialViewport(xAxis, yAxis);
  updateAxisSummary();
  renderPcaInterpretation();
  scheduleDraw();
  scheduleHashUpdate();
}

function setMapSpace(space) {
  state.mapSpace = mapSpaces.includes(space) && (space !== "trait" || traitAxisCount()) ? space : "contour";
  const count = axisOptionCount();
  state.xAxis = Math.min(state.xAxis, Math.max(0, count - 1));
  state.yAxis = Math.min(state.yAxis, Math.max(0, count - 1));
  if (state.xAxis === state.yAxis && count > 1) state.yAxis = state.xAxis === 0 ? 1 : 0;
  els.mapSpaceSelect.value = state.mapSpace;
  buildAxisControls();
  state.viewport = initialViewport(state.xAxis, state.yAxis);
  updateAxisSummary();
  renderPcaInterpretation();
  scheduleDraw();
  scheduleHashUpdate();
}

function buildPcControls() {
  els.pcControls.innerHTML = "";
  const count = contourAxisCount();
  state.pcValues = Array.from({ length: state.model.contour_component_count || count }, () => 0);
  for (let index = 0; index < count; index += 1) {
    const range = state.model.contour_pca_ranges[index];
    const low = range ? range.p01 : -1;
    const high = range ? range.p99 : 1;
    const step = Math.max((high - low) / 500, 0.001);
    const row = document.createElement("div");
    row.className = "pc-row";
    row.dataset.pcRow = String(index);

    const label = document.createElement("label");
    label.textContent = `PC${index + 1}`;
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
    els.pcControls.append(row);
  }
}

function updatePcControl(index, value) {
  const row = document.querySelector(`[data-pc-row="${index}"]`);
  if (!row) return;
  row.querySelector("input[type='range']").value = String(value);
  row.querySelector("input[type='number']").value = Number(value).toFixed(3);
}

function setPcValue(index, value) {
  state.pcValues[index] = value;
  updatePcControl(index, value);
  reconstructFromPc();
  scheduleDraw();
  scheduleHashUpdate();
}

function setPcValues(values, updateHash = true) {
  values.forEach((value, index) => {
    state.pcValues[index] = value;
    updatePcControl(index, value);
  });
  reconstructFromPc();
  scheduleDraw();
  if (updateHash) scheduleHashUpdate();
}

function contourPcValuesFromTrait(coords) {
  const schema = state.model.trait_feature_schema || [];
  const mean = state.model.trait_mean || [];
  const components = state.model.trait_components || [];
  if (!schema.length || !mean.length || !components.length) return null;
  const contourValues = [...state.pcValues];
  for (let featureIndex = 0; featureIndex < schema.length; featureIndex += 1) {
    const spec = schema[featureIndex];
    if (!String(spec.name || "").startsWith("contour_pc")) continue;
    let weighted = mean[featureIndex] || 0;
    for (let pc = 0; pc < components.length; pc += 1) {
      weighted += (coords[pc] || 0) * (components[pc]?.[featureIndex] || 0);
    }
    const raw = (weighted / (spec.weight || 1)) * (spec.scale || 1) + (spec.mean || 0);
    const index = Number(String(spec.name).replace("contour_pc", "")) - 1;
    if (Number.isInteger(index) && index >= 0) contourValues[index] = raw;
  }
  return contourValues;
}

function renderPcaInterpretation() {
  const items = state.model.pca_interpretation?.[state.mapSpace] || [];
  els.pcaInterpretation.innerHTML = "";
  for (const item of items.slice(0, axisOptionCount())) {
    const axis = document.createElement("article");
    axis.className = "pca-axis";
    if (item.axis - 1 === state.xAxis || item.axis - 1 === state.yAxis) axis.classList.add("is-active");
    const heading = document.createElement("h3");
    heading.textContent = `${axisLabel(item.axis - 1)} · ${formatNumber((item.explained || 0) * 100, 1)}%`;
    const summary = document.createElement("p");
    summary.textContent = item.summary || "";
    const drivers = document.createElement("div");
    drivers.className = "pca-drivers";
    for (const driver of (item.drivers || []).slice(0, 4)) {
      const chip = document.createElement("span");
      chip.textContent = `${driver.sign > 0 ? "+" : "-"} ${driver.label}`;
      drivers.append(chip);
    }
    axis.append(heading, summary, drivers);
    els.pcaInterpretation.append(axis);
  }
}

function contourForShell(shell) {
  if (!state.contours || !state.contourPoints || !shell) return null;
  const start = shell.id * state.contourPoints * 2;
  const end = start + state.contourPoints * 2;
  if (end > state.contours.length) return null;
  const points = [];
  for (let index = start; index < end; index += 2) {
    points.push([state.contours[index] / state.contourScale, state.contours[index + 1] / state.contourScale]);
  }
  return points;
}

function normalizedContour(shell) {
  if (normalizedContourCache.has(shell.id)) return normalizedContourCache.get(shell.id);
  if (!state.contours || !state.contourPoints) return null;
  const start = shell.id * state.contourPoints * 2;
  const end = start + state.contourPoints * 2;
  if (end > state.contours.length) return null;
  const centerX = shell.center[0] * state.contourScale;
  const centerY = shell.center[1] * state.contourScale;
  const radius = Math.max(1e-6, shell.mean_radius * state.contourScale);
  const out = new Float32Array(state.contourPoints * 2);
  for (let point = 0; point < state.contourPoints; point += 1) {
    const source = start + point * 2;
    out[point * 2] = (state.contours[source] - centerX) / radius;
    out[point * 2 + 1] = (state.contours[source + 1] - centerY) / radius;
  }
  normalizedContourCache.set(shell.id, out);
  return out;
}

function shapeTraitsFromShell(shell) {
  if (!shell) return {};
  return {
    color_r_mean: shell.color_r_mean,
    color_g_mean: shell.color_g_mean,
    color_b_mean: shell.color_b_mean,
    color_l_mean: shell.color_l_mean,
    color_a_mean: shell.color_a_mean,
    color_b_lab_mean: shell.color_b_lab_mean,
    color_chroma_mean: shell.color_chroma_mean,
    color_saturation_mean: shell.color_saturation_mean,
    roughness: shell.roughness,
    texture_gradient_mean: shell.texture_gradient_mean,
    contour_concavity: shell.contour_concavity,
    contour_solidity: shell.contour_solidity,
  };
}

function effectiveGeneratedTraits() {
  return {
    ...(state.generatedTraits || shapeTraitsFromShell(state.selected)),
    ...(state.colorMixTraits || {}),
  };
}

function reconstructFromPc() {
  if (!state.model?.contour_mean?.length || !state.model?.contour_components?.length) return;
  const valueCount = state.model.contour_mean.length;
  const out = new Float32Array(valueCount);
  for (let index = 0; index < valueCount; index += 1) {
    let value = state.model.contour_mean[index] || 0;
    for (let pc = 0; pc < state.model.contour_components.length; pc += 1) {
      value += (state.pcValues[pc] || 0) * (state.model.contour_components[pc]?.[index] || 0);
    }
    out[index] = value;
  }
  state.generatedContour = out;
  state.generatedTraits = null;
  state.generatedNeighbors = [];
  state.generatedMode = "pca";
  updateGeneratorStatus();
  drawOutline();
}

function maxContourRadius(contours) {
  let radius = 0;
  for (const contour of contours) {
    if (!contour) continue;
    for (let index = 0; index < contour.length; index += 2) {
      radius = Math.max(radius, Math.hypot(contour[index], contour[index + 1]));
    }
  }
  return radius || 1;
}

function contourPath(ctx, contour, centerX, centerY, scale) {
  ctx.beginPath();
  const count = Math.floor(contour.length / 2);
  for (let index = 0; index < count; index += 1) {
    const x = centerX + contour[index * 2] * scale;
    const y = centerY + contour[index * 2 + 1] * scale;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function shellFillColor(traits, alpha = 0.9) {
  const red = Math.round(clamp01(traits?.color_r_mean ?? 0.72) * 255);
  const green = Math.round(clamp01(traits?.color_g_mean ?? 0.66) * 255);
  const blue = Math.round(clamp01(traits?.color_b_mean ?? 0.54) * 255);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function drawGeneratedTexture(ctx, contour, centerX, centerY, scale, traits) {
  const pointCount = Math.floor(contour.length / 2);
  if (pointCount < 4) return;
  const roughness = clamp01((traits?.roughness || 0.012) / 0.04);
  const chroma = clamp01((traits?.color_chroma_mean || 0.08) / 0.35);
  const concavity = clamp01((traits?.contour_concavity || 0.04) / 0.35);
  ctx.save();
  contourPath(ctx, contour, centerX, centerY, scale);
  ctx.clip();
  const ringCount = 5 + Math.round(concavity * 4);
  for (let ring = 1; ring <= ringCount; ring += 1) {
    contourPath(ctx, contour, centerX, centerY, scale * (0.16 + (ring / (ringCount + 1)) * 0.78));
    ctx.strokeStyle = `rgba(32, 36, 42, ${0.045 + chroma * 0.035})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  const step = Math.max(5, Math.round(15 - roughness * 6 - chroma * 3));
  ctx.lineWidth = 1.1 + roughness * 0.8;
  ctx.strokeStyle = `rgba(32, 36, 42, ${0.09 + roughness * 0.14})`;
  for (let index = 0; index < pointCount; index += step) {
    const x = contour[index * 2];
    const y = contour[index * 2 + 1];
    ctx.beginPath();
    ctx.moveTo(centerX + x * scale * 0.22, centerY + y * scale * 0.22);
    ctx.lineTo(centerX + x * scale * 0.95, centerY + y * scale * 0.95);
    ctx.stroke();
  }
  const gloss = ctx.createRadialGradient(
    centerX - scale * 0.22,
    centerY - scale * 0.28,
    scale * 0.08,
    centerX,
    centerY,
    scale * 1.25,
  );
  gloss.addColorStop(0, "rgba(255, 255, 255, 0.34)");
  gloss.addColorStop(0.45, "rgba(255, 255, 255, 0.08)");
  gloss.addColorStop(1, "rgba(32, 36, 42, 0.08)");
  ctx.fillStyle = gloss;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

function updateGeneratorStatus() {
  if (state.generatedMode === "selected" && state.selected) {
    els.generatorStatus.textContent = `Selected shell: ${state.selected.species}`;
    return;
  }
  if (!state.generatedNeighbors.length) {
    const kernel = state.generatorKernelReady ? "WASM ready" : "JS fallback";
    els.generatorStatus.textContent = `PCA reconstruction, ${kernel}`;
    return;
  }
  const species = [];
  for (const item of state.generatedNeighbors) {
    if (!species.includes(item.shell.species)) species.push(item.shell.species);
    if (species.length >= 3) break;
  }
  els.generatorStatus.textContent = `${state.generatedMode === "wasm" ? "WASM" : "JS"} local blend: ${species.join(", ")}`;
}

function drawOutline() {
  const { width, height } = els.outline;
  outlineCtx.clearRect(0, 0, width, height);
  outlineCtx.fillStyle = "#f7f7f2";
  outlineCtx.fillRect(0, 0, width, height);
  const contour = state.generatedContour || state.selectedContour;
  if (!contour) return;
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (Math.min(width, height) * 0.42) / maxContourRadius([contour]);
  const traits = effectiveGeneratedTraits();
  outlineCtx.save();
  contourPath(outlineCtx, contour, centerX, centerY, scale);
  outlineCtx.fillStyle = shellFillColor(traits, 0.9);
  outlineCtx.strokeStyle = "#287a74";
  outlineCtx.lineWidth = 3;
  outlineCtx.fill();
  drawGeneratedTexture(outlineCtx, contour, centerX, centerY, scale, traits);
  contourPath(outlineCtx, contour, centerX, centerY, scale);
  outlineCtx.stroke();
  outlineCtx.fillStyle = "#20242a";
  outlineCtx.beginPath();
  outlineCtx.arc(centerX, centerY, 3, 0, Math.PI * 2);
  outlineCtx.fill();
  outlineCtx.restore();
}

function svgPathFromContour(contour, centerX, centerY, scale) {
  const parts = [];
  const count = Math.floor(contour.length / 2);
  for (let index = 0; index < count; index += 1) {
    const x = centerX + contour[index * 2] * scale;
    const y = centerY + contour[index * 2 + 1] * scale;
    parts.push(`${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  parts.push("Z");
  return parts.join(" ");
}

function exportGeneratedSvg() {
  const contour = state.generatedContour || state.selectedContour;
  if (!contour) return;
  const size = 512;
  const center = size / 2;
  const scale = (size * 0.42) / maxContourRadius([contour]);
  const path = svgPathFromContour(contour, center, center, scale);
  const fill = shellFillColor(effectiveGeneratedTraits(), 0.86);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#f7f7f2"/><path d="${path}" fill="${fill}" stroke="#287a74" stroke-width="6" stroke-linejoin="round"/></svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "seashell-generated.svg";
  link.click();
  URL.revokeObjectURL(url);
}

function contourFallbackDataUrl(shell) {
  const contour = contourForShell(shell);
  if (!contour?.length) return "";
  const width = shell.image_width || 400;
  const height = shell.image_height || 300;
  const path = contour
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#f7f7f2"/><path d="${path} Z" fill="${shellRgb(shell, 0.35)}" stroke="#287a74" stroke-width="3" stroke-linejoin="round"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function setShellImage(image, shell, alt = "") {
  image.dataset.fallbackApplied = "false";
  image.alt = alt;
  image.onerror = () => {
    if (image.dataset.fallbackApplied === "true") {
      image.removeAttribute("src");
      return;
    }
    image.dataset.fallbackApplied = "true";
    const fallback = contourFallbackDataUrl(shell);
    if (fallback) image.src = fallback;
    else image.removeAttribute("src");
  };
  image.src = datasetAsset(shell.file);
}

function updateOverlayButtons() {
  els.overlayContour.setAttribute("aria-pressed", state.overlayLayers.contour ? "true" : "false");
  els.overlayCenter.setAttribute("aria-pressed", state.overlayLayers.center ? "true" : "false");
}

function toggleOverlayLayer(layer) {
  state.overlayLayers[layer] = !state.overlayLayers[layer];
  updateOverlayButtons();
  drawSourceOverlay();
}

function drawSourceOverlay() {
  if (!state.selected) return;
  const shell = state.selected;
  const size = resizeCanvas(els.sourceOverlay, sourceOverlayCtx);
  sourceOverlayCtx.clearRect(0, 0, size.width, size.height);
  if (!shell.image_width || !shell.image_height) return;
  const imageScale = Math.min(size.width / shell.image_width, size.height / shell.image_height);
  const imageWidth = shell.image_width * imageScale;
  const imageHeight = shell.image_height * imageScale;
  const offsetX = (size.width - imageWidth) / 2;
  const offsetY = (size.height - imageHeight) / 2;
  const contour = state.overlayLayers.contour ? contourForShell(shell) : null;
  if (contour?.length) {
    sourceOverlayCtx.strokeStyle = "rgba(232, 76, 58, 0.96)";
    sourceOverlayCtx.lineWidth = 2;
    sourceOverlayCtx.beginPath();
    contour.forEach(([x, y], index) => {
      const px = offsetX + x * imageScale;
      const py = offsetY + y * imageScale;
      if (index === 0) sourceOverlayCtx.moveTo(px, py);
      else sourceOverlayCtx.lineTo(px, py);
    });
    sourceOverlayCtx.closePath();
    sourceOverlayCtx.stroke();
  }
  if (state.overlayLayers.center) {
    const [centerX, centerY] = shell.center;
    const cx = offsetX + centerX * imageScale;
    const cy = offsetY + centerY * imageScale;
    sourceOverlayCtx.strokeStyle = "rgba(35, 190, 170, 0.96)";
    sourceOverlayCtx.beginPath();
    sourceOverlayCtx.moveTo(cx - 7, cy);
    sourceOverlayCtx.lineTo(cx + 7, cy);
    sourceOverlayCtx.moveTo(cx, cy - 7);
    sourceOverlayCtx.lineTo(cx, cy + 7);
    sourceOverlayCtx.stroke();
  }
}

function shellMapVector(shell) {
  if (state.mapSpace === "trait" && shell.trait_pc?.length) return shell.trait_pc;
  return shell.contour_pc || [];
}

function nearestMapNeighbors(values, count = 14) {
  const axisCount = Math.min(axisOptionCount(), 6);
  const source = state.filtered.length ? state.filtered : state.shells;
  const best = [];
  for (const shell of source) {
    const vector = shellMapVector(shell);
    let distanceSq = 0;
    for (let axis = 0; axis < axisCount; axis += 1) {
      const range = axisRange(axis);
      const span = Math.max(1e-6, range ? range.p99 - range.p01 : 1);
      const delta = ((vector[axis] || 0) - (values[axis] || 0)) / span;
      distanceSq += delta * delta;
    }
    best.push({ distanceSq, shell });
    best.sort((a, b) => a.distanceSq - b.distanceSq);
    if (best.length > count) best.pop();
  }
  return best;
}

function neighborWeights(neighbors) {
  const weights = new Float32Array(neighbors.length);
  if (!neighbors.length) return weights;
  const distances = neighbors.map((item) => Math.sqrt(item.distanceSq));
  const sigma = Math.max(distances[Math.min(5, distances.length - 1)] || distances.at(-1) || 1, 0.001);
  for (let index = 0; index < neighbors.length; index += 1) {
    weights[index] = Math.exp(-neighbors[index].distanceSq / (2 * sigma * sigma)) + 0.0001;
  }
  return weights;
}

function align4(value) {
  return (value + 3) & ~3;
}

function blendContoursWithWasm(contours, weights, count, valueCount) {
  if (!state.generatorKernelReady) return null;
  const contourPtr = 0;
  const weightsPtr = align4(contourPtr + contours.byteLength);
  const outPtr = align4(weightsPtr + weights.byteLength);
  const tempPtr = align4(outPtr + valueCount * 4);
  const bytesNeeded = tempPtr + valueCount * 4;
  const memory = state.generatorKernel.memory;
  if (memory.buffer.byteLength < bytesNeeded) {
    memory.grow(Math.ceil((bytesNeeded - memory.buffer.byteLength) / 65536));
  }
  const f32View = new Float32Array(memory.buffer);
  f32View.set(contours, contourPtr / 4);
  f32View.set(weights, weightsPtr / 4);
  state.generatorKernel.blend_contours(
    contourPtr,
    weightsPtr,
    outPtr,
    tempPtr,
    count,
    valueCount,
    0,
    0,
  );
  return Float32Array.from(f32View.subarray(outPtr / 4, outPtr / 4 + valueCount));
}

function blendContoursWithJs(contours, weights, count, valueCount) {
  const out = new Float32Array(valueCount);
  let weightTotal = 0;
  for (const weight of weights) weightTotal += weight;
  if (weightTotal <= 0) weightTotal = 1;
  for (let index = 0; index < valueCount; index += 1) {
    let total = 0;
    for (let neighbor = 0; neighbor < count; neighbor += 1) {
      total += contours[neighbor * valueCount + index] * weights[neighbor];
    }
    out[index] = total / weightTotal;
  }
  return out;
}

function smoothContour(contour, amount = 0.16, passes = 2) {
  const pointCount = Math.floor(contour.length / 2);
  let current = Float32Array.from(contour);
  let next = new Float32Array(contour.length);
  for (let pass = 0; pass < passes; pass += 1) {
    for (let index = 0; index < pointCount; index += 1) {
      const prev = ((index - 1 + pointCount) % pointCount) * 2;
      const here = index * 2;
      const after = ((index + 1) % pointCount) * 2;
      next[here] = current[here] * (1 - amount) + ((current[prev] + current[after]) / 2) * amount;
      next[here + 1] =
        current[here + 1] * (1 - amount) + ((current[prev + 1] + current[after + 1]) / 2) * amount;
    }
    const swap = current;
    current = next;
    next = swap;
  }
  return current;
}

function blendTraits(neighbors, weights, keys = null) {
  const fields =
    keys ||
    [
      "color_r_mean",
      "color_g_mean",
      "color_b_mean",
      "color_l_mean",
      "color_a_mean",
      "color_b_lab_mean",
      "color_chroma_mean",
      "color_saturation_mean",
      "roughness",
      "texture_gradient_mean",
      "contour_concavity",
      "contour_solidity",
    ];
  const traits = {};
  let weightTotal = 0;
  for (const weight of weights) weightTotal += weight;
  if (weightTotal <= 0) weightTotal = 1;
  for (const key of fields) {
    let total = 0;
    for (let index = 0; index < neighbors.length; index += 1) {
      total += (neighbors[index].shell[key] || 0) * weights[index];
    }
    traits[key] = total / weightTotal;
  }
  return traits;
}

function generateLocalShellFromTarget() {
  if (!state.contours || !state.contourPoints) return;
  const values = [...activeAxisValues()];
  const neighbors = nearestMapNeighbors(values);
  const count = neighbors.length;
  const valueCount = state.contourPoints * 2;
  if (!count || !valueCount) return;
  const contours = new Float32Array(count * valueCount);
  for (let index = 0; index < count; index += 1) {
    const contour = normalizedContour(neighbors[index].shell);
    if (contour) contours.set(contour, index * valueCount);
  }
  const weights = neighborWeights(neighbors);
  const wasmContour = blendContoursWithWasm(contours, weights, count, valueCount);
  state.generatedContour = smoothContour(wasmContour || blendContoursWithJs(contours, weights, count, valueCount));
  state.generatedTraits = blendTraits(neighbors, weights);
  state.generatedNeighbors = neighbors;
  state.generatedMode = wasmContour ? "wasm" : "js";
  updateGeneratorStatus();
  drawOutline();
}

function contourPcDistance(shell, candidate) {
  let distance = 0;
  const count = Math.min(4, shell.contour_pc?.length || 0, candidate.contour_pc?.length || 0);
  for (let index = 0; index < count; index += 1) {
    distance += ((shell.contour_pc[index] || 0) - (candidate.contour_pc[index] || 0)) ** 2;
  }
  return Math.sqrt(distance);
}

function renderNeighbors(shell) {
  els.neighborsList.innerHTML = "";
  if (!shell) return;
  const best = [];
  for (const candidate of state.shells) {
    if (candidate.id === shell.id) continue;
    best.push({ distance: contourPcDistance(shell, candidate), shell: candidate });
    best.sort((a, b) => a.distance - b.distance);
    if (best.length > 8) best.pop();
  }
  for (const item of best) {
    const button = document.createElement("button");
    button.className = "neighbor-button";
    button.title = `${item.shell.species} (${formatNumber(item.distance, 3)})`;
    const image = document.createElement("img");
    setShellImage(image, item.shell, item.shell.species);
    const label = document.createElement("span");
    label.textContent = formatNumber(item.distance, 2);
    button.append(image, label);
    button.addEventListener("click", () => {
      centerViewportOnShell(item.shell);
      selectShell(item.shell);
    });
    els.neighborsList.append(button);
  }
}

function selectShell(shell) {
  if (!shell) return;
  if (state.walkingPca) stopPcaWalk(false);
  state.selected = shell;
  state.selectedContour = normalizedContour(shell);
  state.generatedContour = state.selectedContour;
  state.generatedTraits = shapeTraitsFromShell(shell);
  state.generatedNeighbors = [];
  state.generatedMode = "selected";
  (shell.contour_pc || []).forEach((value, index) => {
    state.pcValues[index] = value;
    updatePcControl(index, value);
  });
  (shell.trait_pc || []).forEach((value, index) => {
    state.traitPcValues[index] = value;
  });

  els.selectedName.textContent = shell.species;
  els.selectedDetails.innerHTML = "";
  const details = [
    ["File", shell.file],
    ["Specimen", shell.specimen || "-"],
    ["View", shell.view || "-"],
    ["Contour PC", shell.contour_pc?.slice(0, 2).map((value) => formatNumber(value, 3)).join(", ") || "-"],
    ["Trait PC", shell.trait_pc?.slice(0, 2).map((value) => formatNumber(value, 3)).join(", ") || "-"],
    ["Area", shell.area?.toLocaleString() || "-"],
    ["Lightness", formatNumber(shell.color_l_mean, 3)],
    ["Chroma", formatNumber(shell.color_chroma_mean, 3)],
    ["Roughness", formatNumber(shell.roughness, 4)],
    ["Concavity", formatNumber(shell.contour_concavity, 4)],
  ];
  for (const [key, value] of details) {
    const dt = document.createElement("dt");
    dt.textContent = key;
    const dd = document.createElement("dd");
    dd.textContent = value;
    els.selectedDetails.append(dt, dd);
  }
  setShellImage(els.sourceImage, shell, shell.species);
  renderNeighbors(shell);
  updateGeneratorStatus();
  drawOutline();
  drawSourceOverlay();
  drawColorMix();
  scheduleDraw();
  scheduleHashUpdate();
}

function nearestShell(screenX, screenY) {
  const size = resizeCanvas(els.scatter, scatterCtx);
  let best = null;
  let bestDistance = Infinity;
  for (const shell of state.filtered) {
    const point = worldToScreen(axisValue(shell, state.xAxis), axisValue(shell, state.yAxis), size);
    const distance = (point.x - screenX) ** 2 + (point.y - screenY) ** 2;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = shell;
    }
  }
  return bestDistance <= 14 * 14 ? best : null;
}

function setTargetFromEvent(event) {
  const rect = els.scatter.getBoundingClientRect();
  const size = resizeCanvas(els.scatter, scatterCtx);
  const point = screenToWorld(event.clientX - rect.left, event.clientY - rect.top, size);
  if (state.mapSpace === "trait") {
    state.traitPcValues[state.xAxis] = point.x;
    state.traitPcValues[state.yAxis] = point.y;
    const contourValues = contourPcValuesFromTrait(state.traitPcValues);
    if (contourValues) setPcValues(contourValues, false);
  } else {
    state.pcValues[state.xAxis] = point.x;
    state.pcValues[state.yAxis] = point.y;
    updatePcControl(state.xAxis, point.x);
    updatePcControl(state.yAxis, point.y);
    reconstructFromPc();
  }
  generateLocalShellFromTarget();
  scheduleDraw();
  scheduleHashUpdate();
}

function startViewportPan(event) {
  const rect = els.scatter.getBoundingClientRect();
  state.panningViewport = {
    pointerId: event.pointerId,
    startX: event.clientX - rect.left,
    startY: event.clientY - rect.top,
    viewport: { ...state.viewport },
  };
  state.draggingTarget = false;
  els.scatter.classList.add("is-panning");
  els.pointTooltip.hidden = true;
}

function panViewportFromEvent(event) {
  if (!state.panningViewport || state.panningViewport.pointerId !== event.pointerId) return;
  const rect = els.scatter.getBoundingClientRect();
  const size = resizeCanvas(els.scatter, scatterCtx);
  const start = state.panningViewport;
  const vx = start.viewport;
  const dx = ((event.clientX - rect.left - start.startX) / size.width) * (vx.maxX - vx.minX);
  const dy = ((event.clientY - rect.top - start.startY) / size.height) * (vx.maxY - vx.minY);
  state.viewport = {
    minX: vx.minX - dx,
    maxX: vx.maxX - dx,
    minY: vx.minY + dy,
    maxY: vx.maxY + dy,
  };
  scheduleDraw();
}

function stopViewportPan() {
  if (!state.panningViewport) return;
  state.panningViewport = null;
  els.scatter.classList.remove("is-panning");
  scheduleHashUpdate();
}

function showPointTooltip(event, shell) {
  if (!shell) {
    els.pointTooltip.hidden = true;
    return;
  }
  const rect = els.scatter.getBoundingClientRect();
  const strong = document.createElement("strong");
  strong.textContent = shell.species;
  els.pointTooltip.replaceChildren(
    strong,
    document.createTextNode(shell.file),
    document.createElement("br"),
    document.createTextNode(`${axisLabel(state.xAxis)} ${formatNumber(axisValue(shell, state.xAxis))}, ${axisLabel(state.yAxis)} ${formatNumber(axisValue(shell, state.yAxis))}`),
    document.createElement("br"),
    document.createTextNode(`Lightness ${formatNumber(shell.color_l_mean, 3)}, chroma ${formatNumber(shell.color_chroma_mean, 3)}`),
  );
  els.pointTooltip.style.left = `${Math.min(Math.max(8, rect.width - 248), Math.max(8, event.clientX - rect.left + 14))}px`;
  els.pointTooltip.style.top = `${Math.min(Math.max(8, rect.height - 84), Math.max(8, event.clientY - rect.top + 14))}px`;
  els.pointTooltip.hidden = false;
}

function computeColorRange() {
  const a = state.shells.map((shell) => shell.color_a_mean || 0);
  const b = state.shells.map((shell) => shell.color_b_lab_mean || 0);
  state.colorRange = {
    aMin: quantile(a, 0.01),
    aMax: quantile(a, 0.99),
    bMin: quantile(b, 0.01),
    bMax: quantile(b, 0.99),
  };
}

function colorWorldToScreen(a, b, size) {
  const range = state.colorRange;
  return {
    x: ((a - range.aMin) / (range.aMax - range.aMin)) * size.width,
    y: size.height - ((b - range.bMin) / (range.bMax - range.bMin)) * size.height,
  };
}

function colorScreenToWorld(x, y, size) {
  const range = state.colorRange;
  return {
    a: range.aMin + (x / size.width) * (range.aMax - range.aMin),
    b: range.bMin + ((size.height - y) / size.height) * (range.bMax - range.bMin),
  };
}

function drawColorMix() {
  const size = resizeCanvas(els.colorMix, colorMixCtx);
  if (!state.colorRange) return;
  colorMixCtx.clearRect(0, 0, size.width, size.height);
  colorMixCtx.fillStyle = "#f7f7f2";
  colorMixCtx.fillRect(0, 0, size.width, size.height);
  colorMixCtx.strokeStyle = "rgba(32, 36, 42, 0.10)";
  for (let step = 1; step < 4; step += 1) {
    const x = (size.width * step) / 4;
    const y = (size.height * step) / 4;
    colorMixCtx.beginPath();
    colorMixCtx.moveTo(x, 0);
    colorMixCtx.lineTo(x, size.height);
    colorMixCtx.moveTo(0, y);
    colorMixCtx.lineTo(size.width, y);
    colorMixCtx.stroke();
  }
  const stride = state.filtered.length > 30000 ? 2 : 1;
  for (let index = 0; index < state.filtered.length; index += stride) {
    const shell = state.filtered[index];
    const point = colorWorldToScreen(shell.color_a_mean || 0, shell.color_b_lab_mean || 0, size);
    if (point.x < -3 || point.x > size.width + 3 || point.y < -3 || point.y > size.height + 3) continue;
    colorMixCtx.fillStyle = shellRgb(shell, 0.72);
    colorMixCtx.fillRect(point.x - 1, point.y - 1, 2, 2);
  }
  if (state.selected) {
    const selected = colorWorldToScreen(
      state.selected.color_a_mean || 0,
      state.selected.color_b_lab_mean || 0,
      size,
    );
    colorMixCtx.strokeStyle = "#20242a";
    colorMixCtx.lineWidth = 2;
    colorMixCtx.beginPath();
    colorMixCtx.arc(selected.x, selected.y, 6, 0, Math.PI * 2);
    colorMixCtx.stroke();
  }
  if (state.colorMixTarget) {
    const target = colorWorldToScreen(state.colorMixTarget.a, state.colorMixTarget.b, size);
    colorMixCtx.strokeStyle = "#c65d4b";
    colorMixCtx.lineWidth = 2;
    colorMixCtx.beginPath();
    colorMixCtx.moveTo(target.x - 9, target.y);
    colorMixCtx.lineTo(target.x + 9, target.y);
    colorMixCtx.moveTo(target.x, target.y - 9);
    colorMixCtx.lineTo(target.x, target.y + 9);
    colorMixCtx.stroke();
  }
}

function nearestColorNeighbors(target, count = 12) {
  const range = state.colorRange;
  const aSpan = Math.max(1e-6, range.aMax - range.aMin);
  const bSpan = Math.max(1e-6, range.bMax - range.bMin);
  const best = [];
  const source = state.filtered.length ? state.filtered : state.shells;
  for (const shell of source) {
    const da = ((shell.color_a_mean || 0) - target.a) / aSpan;
    const db = ((shell.color_b_lab_mean || 0) - target.b) / bSpan;
    const distanceSq = da * da + db * db;
    best.push({ distanceSq, shell });
    best.sort((a, b) => a.distanceSq - b.distanceSq);
    if (best.length > count) best.pop();
  }
  return best;
}

function renderColorSwatches() {
  els.colorMixSwatches.innerHTML = "";
  const traits = state.colorMixTraits || effectiveGeneratedTraits();
  const swatch = document.createElement("span");
  swatch.className = "color-swatch is-mix";
  swatch.title = "Mixed color";
  swatch.style.background = shellFillColor(traits, 1);
  els.colorMixSwatches.append(swatch);
  for (const item of state.colorMixNeighbors.slice(0, 7)) {
    const node = document.createElement("button");
    node.className = "color-swatch";
    node.title = item.shell.species;
    node.style.background = shellRgb(item.shell);
    node.addEventListener("click", () => selectShell(item.shell));
    els.colorMixSwatches.append(node);
  }
}

function applyColorMixFromEvent(event) {
  const rect = els.colorMix.getBoundingClientRect();
  const size = resizeCanvas(els.colorMix, colorMixCtx);
  const target = colorScreenToWorld(event.clientX - rect.left, event.clientY - rect.top, size);
  const neighbors = nearestColorNeighbors(target);
  const weights = neighborWeights(neighbors);
  state.colorMixTarget = target;
  state.colorMixNeighbors = neighbors;
  state.colorMixTraits = blendTraits(neighbors, weights, [
    "color_r_mean",
    "color_g_mean",
    "color_b_mean",
    "color_l_mean",
    "color_a_mean",
    "color_b_lab_mean",
    "color_chroma_mean",
    "color_saturation_mean",
    "texture_gradient_mean",
    "roughness",
  ]);
  const names = [];
  for (const item of neighbors) {
    if (!names.includes(item.shell.species)) names.push(item.shell.species);
    if (names.length >= 3) break;
  }
  els.colorMixStatus.textContent = `Color blend: ${names.join(", ")}`;
  renderColorSwatches();
  drawColorMix();
  drawOutline();
}

function resetColorMix() {
  state.colorMixTarget = null;
  state.colorMixTraits = null;
  state.colorMixNeighbors = [];
  els.colorMixStatus.textContent = "Selected shell color";
  renderColorSwatches();
  drawColorMix();
  drawOutline();
}

function stopPcaWalk(updateHash = true) {
  state.walkingPca = false;
  window.cancelAnimationFrame(state.walkFrame);
  els.walkPca.textContent = "Walk";
  els.walkPca.setAttribute("aria-pressed", "false");
  if (updateHash) scheduleHashUpdate();
}

function stepPcaWalk(timestamp) {
  if (!state.walkingPca) return;
  if (!state.walkStartedAt) state.walkStartedAt = timestamp;
  const t = (timestamp - state.walkStartedAt) / 1000;
  const values = [...state.pcValues];
  for (let index = 0; index < contourAxisCount(); index += 1) {
    const range = state.model.contour_pca_ranges[index];
    const span = range ? range.p99 - range.p01 : 1;
    values[index] = Math.sin(t * (0.32 + index * 0.045) + index * 1.73) * span * (0.18 + index * 0.018);
  }
  setPcValues(values, false);
  state.walkFrame = window.requestAnimationFrame(stepPcaWalk);
}

function togglePcaWalk() {
  if (state.walkingPca) {
    stopPcaWalk();
    return;
  }
  state.walkingPca = true;
  state.walkStartedAt = 0;
  els.walkPca.textContent = "Stop";
  els.walkPca.setAttribute("aria-pressed", "true");
  state.walkFrame = window.requestAnimationFrame(stepPcaWalk);
}

function resetToMeanShape() {
  stopPcaWalk(false);
  setPcValues(Array.from({ length: state.model.contour_component_count || contourAxisCount() }, () => 0));
}

function setupEvents() {
  els.search.addEventListener("input", updateFilter);
  els.randomShell.addEventListener("click", selectRandomShell);
  els.mapSpaceSelect.addEventListener("change", () => setMapSpace(els.mapSpaceSelect.value));
  els.xAxisSelect.addEventListener("change", () => setAxes(Number(els.xAxisSelect.value), state.yAxis));
  els.yAxisSelect.addEventListener("change", () => setAxes(state.xAxis, Number(els.yAxisSelect.value)));
  els.colorModeSelect.addEventListener("change", () => {
    state.colorMode = els.colorModeSelect.value;
    scheduleDraw();
    scheduleHashUpdate();
  });
  els.overlayContour.addEventListener("click", () => toggleOverlayLayer("contour"));
  els.overlayCenter.addEventListener("click", () => toggleOverlayLayer("center"));
  els.meanShape.addEventListener("click", resetToMeanShape);
  els.walkPca.addEventListener("click", togglePcaWalk);
  els.exportSvg.addEventListener("click", exportGeneratedSvg);
  els.resetColorMix.addEventListener("click", resetColorMix);
  els.zoomIn.addEventListener("click", () => zoom(0.72));
  els.zoomOut.addEventListener("click", () => zoom(1.38));
  els.resetView.addEventListener("click", () => {
    state.viewport = initialViewport(state.xAxis, state.yAxis);
    scheduleDraw();
  });

  els.scatter.addEventListener("wheel", (event) => {
    event.preventDefault();
    const rect = els.scatter.getBoundingClientRect();
    zoom(event.deltaY > 0 ? 1.12 : 0.88, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  });

  els.scatter.addEventListener("pointerdown", (event) => {
    if (event.button === 1) {
      event.preventDefault();
      els.scatter.setPointerCapture(event.pointerId);
      startViewportPan(event);
      return;
    }
    els.scatter.setPointerCapture(event.pointerId);
    const rect = els.scatter.getBoundingClientRect();
    const shell = nearestShell(event.clientX - rect.left, event.clientY - rect.top);
    if (shell) selectShell(shell);
    else {
      state.draggingTarget = true;
      setTargetFromEvent(event);
    }
  });

  els.scatter.addEventListener("pointermove", (event) => {
    if (state.panningViewport) {
      event.preventDefault();
      panViewportFromEvent(event);
      return;
    }
    if (state.draggingTarget) {
      setTargetFromEvent(event);
      els.pointTooltip.hidden = true;
      return;
    }
    const rect = els.scatter.getBoundingClientRect();
    showPointTooltip(event, nearestShell(event.clientX - rect.left, event.clientY - rect.top));
  });

  for (const eventName of ["pointerup", "pointerleave", "pointercancel"]) {
    els.scatter.addEventListener(eventName, () => {
      state.draggingTarget = false;
      stopViewportPan();
      if (eventName !== "pointerup") els.pointTooltip.hidden = true;
    });
  }
  els.scatter.addEventListener("auxclick", (event) => {
    if (event.button === 1) event.preventDefault();
  });

  els.colorMix.addEventListener("pointerdown", (event) => {
    els.colorMix.setPointerCapture(event.pointerId);
    state.draggingColor = true;
    applyColorMixFromEvent(event);
  });
  els.colorMix.addEventListener("pointermove", (event) => {
    if (state.draggingColor) applyColorMixFromEvent(event);
  });
  for (const eventName of ["pointerup", "pointerleave", "pointercancel"]) {
    els.colorMix.addEventListener(eventName, () => {
      state.draggingColor = false;
    });
  }

  window.addEventListener("resize", () => {
    scheduleDraw();
    drawSourceOverlay();
    drawColorMix();
  });
  els.sourceImage.addEventListener("load", drawSourceOverlay);
}

async function init() {
  setupEvents();
  const [model, shellPayload] = await Promise.all([
    fetchJson(asset("data/model.json")),
    fetchJson(asset("data/shells.json")),
  ]);
  const contourBuffer = model.contour_file
    ? await fetchArrayBuffer(asset(`data/${model.contour_file}`))
    : null;
  await initGeneratorKernel();

  state.model = model;
  state.shells = shellPayload.records;
  state.filtered = state.shells;
  state.contours = contourBuffer ? new Uint16Array(contourBuffer) : null;
  state.contourPoints = model.contour_points || 0;
  state.contourScale = model.contour_scale || 1;
  computeColorRange();

  const expectedContourValues = model.processed_count * model.contour_points * 2;
  if (!state.contours || state.contours.length < expectedContourValues) {
    throw new Error("Contour binary is shorter than the model manifest expects.");
  }
  els.statusLine.textContent = model.species_count
    ? `${model.processed_count.toLocaleString()} shells, ${model.species_count.toLocaleString()} species`
    : `${model.processed_count.toLocaleString()} shells`;
  els.visibleCount.textContent = state.filtered.length.toLocaleString();

  const initialHash = parseHashState();
  if (mapSpaces.includes(initialHash.get("space"))) state.mapSpace = initialHash.get("space");
  if (colorModes.includes(initialHash.get("color"))) state.colorMode = initialHash.get("color");
  const axisCount = axisOptionCount();
  const x = Number(initialHash.get("x"));
  const y = Number(initialHash.get("y"));
  if (Number.isInteger(x) && x >= 0 && x < axisCount) state.xAxis = x;
  if (Number.isInteger(y) && y >= 0 && y < axisCount) state.yAxis = y;

  state.viewport = initialViewport(state.xAxis, state.yAxis);
  buildAxisControls();
  buildPcControls();
  els.mapSpaceSelect.value = state.mapSpace;
  els.colorModeSelect.value = state.colorMode;
  updateOverlayButtons();
  updateAxisSummary();
  renderPcaInterpretation();

  state.suppressHash = true;
  const selected = shellById(initialHash.get("id")) || state.shells[0];
  selectShell(selected);
  const pcValues = (initialHash.get("pc") || "")
    .split(",")
    .filter((value) => value.trim() !== "")
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));
  if (pcValues.length) setPcValues(pcValues.slice(0, 6), false);
  const traitValues = (initialHash.get("trait") || "")
    .split(",")
    .filter((value) => value.trim() !== "")
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));
  traitValues.slice(0, 6).forEach((value, index) => {
    state.traitPcValues[index] = value;
  });
  if (state.mapSpace === "trait" && traitValues.length) {
    const contourValues = contourPcValuesFromTrait(state.traitPcValues);
    if (contourValues) setPcValues(contourValues, false);
  }
  state.suppressHash = false;
  state.hashReady = true;
  resetColorMix();
  scheduleDraw();
  updateHashState();
}

init().catch((error) => {
  els.statusLine.textContent = error.message;
  if (els.missingData) els.missingData.hidden = false;
  console.error(error);
});
