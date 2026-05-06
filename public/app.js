const publicBase = new URL(".", import.meta.url).pathname;
const repoBase = publicBase.endsWith("/public/")
  ? publicBase.slice(0, -"public/".length)
  : "/";

function urlFlag(name) {
  const value = new URLSearchParams(window.location.search).get(name);
  if (value == null) return false;
  if (value === "") return true;
  return !["0", "false", "no", "off"].includes(value.toLowerCase());
}

const debugDiagnostics = urlFlag("debug");

const state = {
  shells: [],
  filtered: [],
  fingerprints: null,
  fingerprintEncoding: "float32",
  fingerprintScale: 1,
  contours: null,
  contourPoints: 0,
  contourScale: 1,
  model: null,
  viewport: null,
  selected: null,
  selectedContour: null,
  selectedFingerprint: null,
  referenceShell: null,
  referenceContour: null,
  referenceFingerprint: null,
  generatedContour: null,
  generatedFingerprint: null,
  uploadFingerprint: null,
  uploadMatches: [],
  uploadName: "",
  activeVariant: "fourier",
  xAxis: 0,
  yAxis: 1,
  colorMode: "species",
  qualityMode: "center",
  diagnostics: {
    qa: debugDiagnostics || urlFlag("qa"),
  },
  neighborMode: "contour",
  overlayLayers: {
    contour: true,
    center: true,
  },
  colorRequest: 0,
  pcValues: [],
  draggingTarget: false,
  panningViewport: null,
  walkingPca: false,
  walkStartedAt: 0,
  walkFrame: 0,
  hashReady: false,
  suppressHash: false,
  hashTimer: 0,
  needsDraw: true,
};

const variantModes = [
  ["fourier", "Fourier"],
  ["curvature", "Curvature"],
  ["symmetry", "Symmetry"],
  ["spectrum", "Spectrum"],
  ["residual", "Residual"],
  ["spiral", "Spiral"],
  ["context", "Context"],
  ["zernike", "Zernike"],
  ["color", "Color"],
  ["upload", "Upload"],
];

const qualityModes = ["center", "rough", "low-mask", "high-mask", "slender", "concavity", "components"];
const neighborModes = ["pca", "contour"];
const overlayLayerNames = ["contour", "center"];

const els = {
  controlsPanel: document.querySelector(".controls-panel"),
  mapSummary: document.querySelector(".map-summary"),
  statusLine: document.querySelector("#statusLine"),
  visibleCount: document.querySelector("#visibleCount"),
  explainedVariance: document.querySelector("#explainedVariance"),
  scatter: document.querySelector("#scatterCanvas"),
  pointTooltip: document.querySelector("#pointTooltip"),
  outline: document.querySelector("#outlineCanvas"),
  compareStatus: document.querySelector("#compareStatus"),
  search: document.querySelector("#searchBox"),
  xAxisSelect: document.querySelector("#xAxisSelect"),
  yAxisSelect: document.querySelector("#yAxisSelect"),
  colorModeSelect: document.querySelector("#colorModeSelect"),
  qualityModeSelect: document.querySelector("#qualityModeSelect"),
  qualityPanel: document.querySelector("#qualityPanel"),
  qualityList: document.querySelector("#qualityList"),
  pcControls: document.querySelector("#pcControls"),
  selectedName: document.querySelector("#selectedName"),
  selectedDetails: document.querySelector("#selectedDetails"),
  sourceImage: document.querySelector("#sourceImage"),
  sourceOverlay: document.querySelector("#sourceOverlay"),
  overlayContour: document.querySelector("#overlayContour"),
  overlayCenter: document.querySelector("#overlayCenter"),
  neighborsList: document.querySelector("#neighborsList"),
  neighborPcaMode: document.querySelector("#neighborPcaMode"),
  neighborContourMode: document.querySelector("#neighborContourMode"),
  neighborStatus: document.querySelector("#neighborStatus"),
  variantButtons: document.querySelector("#variantButtons"),
  variantCanvas: document.querySelector("#variantCanvas"),
  variantStatus: document.querySelector("#variantStatus"),
  uploadShape: document.querySelector("#uploadShape"),
  pinReference: document.querySelector("#pinReference"),
  clearReference: document.querySelector("#clearReference"),
  meanShape: document.querySelector("#meanShape"),
  walkPca: document.querySelector("#walkPca"),
  exportContourSvg: document.querySelector("#exportContourSvg"),
  exportSvg: document.querySelector("#exportSvg"),
  randomShell: document.querySelector("#randomShell"),
  zoomIn: document.querySelector("#zoomIn"),
  zoomOut: document.querySelector("#zoomOut"),
  resetView: document.querySelector("#resetView"),
  missingData: document.querySelector("#missingData"),
};

const scatterCtx = els.scatter.getContext("2d");
const outlineCtx = els.outline.getContext("2d");
const variantCtx = els.variantCanvas.getContext("2d");
const sourceOverlayCtx = els.sourceOverlay.getContext("2d");
const imageCache = new Map();
const sourceContourCache = new Map();
const normalizedContourCache = new Map();

function asset(path) {
  return `${publicBase}${path}`;
}

function datasetAsset(path) {
  return `${repoBase}dataset/${encodeURIComponent(path).replaceAll("%2F", "/")}`;
}

function contourFallbackDataUrl(shell) {
  const contour = contourForShell(shell);
  if (!contour?.length) return "";
  const width = shell.image_width || 400;
  const height = shell.image_height || 300;
  const path = contour
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#f7f7f2"/><path d="${path} Z" fill="rgba(198,93,75,0.18)" stroke="#287a74" stroke-width="3" stroke-linejoin="round"/></svg>`;
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

function formatNumber(value, digits = 3) {
  return Number(value).toLocaleString(undefined, {
    maximumFractionDigits: digits,
  });
}

function applyDiagnosticVisibility() {
  if (state.diagnostics.qa && !els.qualityPanel) {
    const panel = document.createElement("section");
    panel.id = "qualityPanel";
    panel.className = "panel-section quality-panel";

    const title = document.createElement("div");
    title.className = "section-title";
    const heading = document.createElement("h2");
    heading.textContent = "Contour QA";
    const select = document.createElement("select");
    select.id = "qualityModeSelect";
    select.setAttribute("aria-label", "Contour QA metric");
    const labels = {
      center: "Center shift",
      rough: "Roughness",
      "low-mask": "Low mask",
      "high-mask": "High mask",
      slender: "Slender",
      concavity: "Concavity",
      components: "Components",
    };
    for (const mode of qualityModes) {
      const option = document.createElement("option");
      option.value = mode;
      option.textContent = labels[mode] || mode;
      select.append(option);
    }
    title.append(heading, select);

    const list = document.createElement("div");
    list.id = "qualityList";
    panel.append(title, list);
    els.mapSummary?.after(panel);
    els.qualityPanel = panel;
    els.qualityModeSelect = select;
    els.qualityList = list;
  }
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

async function fetchArrayBuffer(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.arrayBuffer();
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
  if (state.referenceShell) params.set("ref", String(state.referenceShell.id));
  params.set("x", String(state.xAxis));
  params.set("y", String(state.yAxis));
  params.set("color", state.colorMode);
  if (state.diagnostics.qa) params.set("quality", state.qualityMode);
  params.set("near", state.neighborMode);
  params.set(
    "layers",
    overlayLayerNames.filter((layer) => state.overlayLayers[layer]).join(","),
  );
  params.set("variant", state.activeVariant);
  if (state.pcValues.length) {
    params.set(
      "pc",
      state.pcValues
        .slice(0, 6)
        .map((value) => Number(value).toFixed(3))
        .join(","),
    );
  }
  const hash = params.toString();
  const next = `${window.location.pathname}${window.location.search}${hash ? `#${hash}` : ""}`;
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
  return Math.min(6, state.model.contour_visible_component_count || 0);
}

function axisOptionCount() {
  return contourAxisCount();
}

function axisRange(axisIndex) {
  return state.model.contour_pca_ranges?.[axisIndex];
}

function axisVariance(axisIndex) {
  return state.model.contour_explained_variance_ratio?.[axisIndex] || 0;
}

function axisLabel(axisIndex) {
  return `Contour PC${axisIndex + 1}`;
}

function initialViewport(xIndex = state.xAxis, yIndex = state.yAxis) {
  const fallback = state.model.contour_pca_ranges?.[0] || state.model.pca_ranges[0];
  const x = axisRange(xIndex) || fallback;
  const y = axisRange(yIndex) || axisRange(1) || fallback;
  const minX = x.p01;
  const maxX = x.p99;
  const minY = y.p01;
  const maxY = y.p99;
  const padX = Math.max((maxX - minX) * 0.08, 0.001);
  const padY = Math.max((maxY - minY) * 0.08, 0.001);
  return {
    minX: minX - padX,
    maxX: maxX + padX,
    minY: minY - padY,
    maxY: maxY + padY,
  };
}

function axisValue(shell, axisIndex) {
  return shell.contour_pc?.[axisIndex] || 0;
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

function speciesColor(species, alpha = 0.76) {
  let hash = 0;
  for (let i = 0; i < species.length; i += 1) {
    hash = (hash * 31 + species.charCodeAt(i)) >>> 0;
  }
  return `hsla(${hash % 360}, 42%, 42%, ${alpha})`;
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function pointColor(shell) {
  if (state.colorMode === "mask") {
    const t = clamp01((shell.mask_ratio - 0.025) / 0.42);
    return `hsl(${210 - t * 170}, 55%, ${34 + t * 10}%)`;
  }
  if (state.colorMode === "center") {
    const t = clamp01((shell.center_adjustment || 0) / 24);
    return `hsl(${164 - t * 154}, 62%, ${32 + t * 8}%)`;
  }
  if (state.colorMode === "concavity") {
    const t = clamp01((shell.contour_concavity || 0) / 0.32);
    return `hsl(${322 - t * 180}, 58%, ${36 + t * 8}%)`;
  }
  return speciesColor(shell.species);
}

function qualityMetric(shell, mode) {
  if (mode === "rough") return shell.roughness || 0;
  if (mode === "low-mask" || mode === "high-mask") return shell.mask_ratio || 0;
  if (mode === "slender") return shell.aspect_ratio || 0;
  if (mode === "concavity") return shell.contour_concavity || 0;
  if (mode === "components") return shell.component_count || 0;
  return shell.center_adjustment || 0;
}

function qualityLabel(shell, mode) {
  const value = qualityMetric(shell, mode);
  if (mode === "low-mask" || mode === "high-mask") return `${formatNumber(value * 100, 1)}%`;
  if (mode === "components") return `${Math.round(value)}`;
  if (mode === "center") return `${formatNumber(value, 1)} px`;
  return formatNumber(value, 3);
}

function centerViewportOnShell(shell) {
  if (!state.viewport) return;
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

function renderQualityList() {
  if (!state.diagnostics.qa || !els.qualityList) {
    if (els.qualityList) els.qualityList.innerHTML = "";
    return;
  }
  const mode = state.qualityMode;
  const ascending = mode === "low-mask";
  const ranked = [...state.filtered]
    .sort((a, b) => {
      const delta = qualityMetric(a, mode) - qualityMetric(b, mode);
      return ascending ? delta : -delta;
    })
    .slice(0, 8);

  els.qualityList.innerHTML = "";
  for (const shell of ranked) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quality-button";
    button.title = shell.file;
    const image = document.createElement("img");
    setShellImage(image, shell);
    image.loading = "lazy";
    const name = document.createElement("strong");
    name.textContent = shell.species;
    const metric = document.createElement("span");
    metric.textContent = qualityLabel(shell, mode);
    button.append(image, name, metric);
    button.addEventListener("click", () => {
      centerViewportOnShell(shell);
      selectShell(shell);
    });
    els.qualityList.append(button);
  }
}

function selectRandomShell() {
  const source = state.filtered;
  if (!source.length) return;
  let index = Math.floor(Math.random() * source.length);
  if (state.selected && source.length > 1 && source[index].id === state.selected.id) {
    index = (index + 1) % source.length;
  }
  const shell = source[index];
  centerViewportOnShell(shell);
  selectShell(shell);
  scheduleDraw();
}

function drawScatter() {
  const size = resizeCanvas(els.scatter, scatterCtx);
  if (!state.viewport || !state.needsDraw) return;
  state.needsDraw = false;

  scatterCtx.clearRect(0, 0, size.width, size.height);
  scatterCtx.save();
  scatterCtx.lineWidth = 1;
  scatterCtx.strokeStyle = "rgba(32, 36, 42, 0.28)";

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

  const stride = state.filtered.length > 25000 ? 2 : 1;
  for (let i = 0; i < state.filtered.length; i += stride) {
    const shell = state.filtered[i];
    const point = worldToScreen(axisValue(shell, state.xAxis), axisValue(shell, state.yAxis), size);
    if (
      point.x < -3 ||
      point.x > size.width + 3 ||
      point.y < -3 ||
      point.y > size.height + 3
    ) {
      continue;
    }
    scatterCtx.fillStyle = pointColor(shell);
    scatterCtx.fillRect(point.x - 1, point.y - 1, 2, 2);
  }

  if (state.pcValues.length >= 2) {
    const target = worldToScreen(state.pcValues[state.xAxis] || 0, state.pcValues[state.yAxis] || 0, size);
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
    scatterCtx.strokeStyle = "#20242a";
    scatterCtx.fillStyle = "#ffffff";
    scatterCtx.lineWidth = 2;
    scatterCtx.beginPath();
    scatterCtx.arc(selected.x, selected.y, 6, 0, Math.PI * 2);
    scatterCtx.fill();
    scatterCtx.stroke();
  }
  scatterCtx.restore();
}

function scheduleDraw() {
  state.needsDraw = true;
  requestAnimationFrame(drawScatter);
}

function updateFilter() {
  const query = els.search.value.trim().toLowerCase();
  state.filtered = query
    ? state.shells.filter((shell) => {
        return (
          shell.name.toLowerCase().includes(query) ||
          shell.species.toLowerCase().includes(query) ||
          shell.file.toLowerCase().includes(query)
        );
      })
    : state.shells;
  els.visibleCount.textContent = state.filtered.length.toLocaleString();
  renderQualityList();
  scheduleDraw();
}

function shellById(id) {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;
  return state.shells.find((shell) => shell.id === numericId) || null;
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

function updatePcControl(index, value) {
  const row = document.querySelector(`[data-pc-row="${index}"]`);
  if (row) {
    row.querySelector("input[type='range']").value = String(value);
    row.querySelector("input[type='number']").value = Number(value).toFixed(3);
  }
}

function setPcValues(values, updateHash = true) {
  values.forEach((value, index) => {
    state.pcValues[index] = value;
    updatePcControl(index, value);
  });
  reconstruct();
  scheduleDraw();
  if (updateHash) scheduleHashUpdate();
}

function setPcValue(index, value) {
  state.pcValues[index] = value;
  updatePcControl(index, value);
  reconstruct();
  scheduleDraw();
  scheduleHashUpdate();
}

function buildAxisControls() {
  const count = axisOptionCount();
  for (const select of [els.xAxisSelect, els.yAxisSelect]) {
    select.innerHTML = "";
    for (let index = 0; index < count; index += 1) {
      const option = document.createElement("option");
      option.value = String(index);
      const variance = axisVariance(index);
      option.textContent = `${axisLabel(index)} (${formatNumber(variance * 100, 1)}%)`;
      select.append(option);
    }
  }
  els.xAxisSelect.value = String(state.xAxis);
  els.yAxisSelect.value = String(state.yAxis);
}

function updateAxisSummary() {
  const x = axisVariance(state.xAxis);
  const y = axisVariance(state.yAxis);
  els.explainedVariance.textContent = `${formatNumber((x + y) * 100, 1)}%`;
}

function setAxes(xAxis, yAxis) {
  state.xAxis = xAxis;
  state.yAxis = yAxis;
  els.xAxisSelect.value = String(xAxis);
  els.yAxisSelect.value = String(yAxis);
  state.viewport = initialViewport(xAxis, yAxis);
  updateAxisSummary();
  scheduleDraw();
  scheduleHashUpdate();
}

function exportGeneratedSvg() {
  const contour = state.generatedContour;
  if (!contour) return;
  const size = 512;
  const center = size / 2;
  const scale = (size * 0.42) / maxContourRadius([contour]);
  const path = svgPathFromContour(contour, center, center, scale);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#f7f7f2"/><path d="${path}" fill="rgba(40,122,116,0.18)" stroke="#287a74" stroke-width="6" stroke-linejoin="round"/></svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "seashell-generated-contour.svg";
  link.click();
  URL.revokeObjectURL(url);
}

function safeName(value) {
  return value.replace(/[^a-z0-9_-]+/gi, "_").replace(/^_+|_+$/g, "").slice(0, 80) || "shell";
}

function exportSelectedContourSvg() {
  if (!state.selected) return;
  const contour = contourForShell(state.selected);
  if (!contour?.length) return;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of contour) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  const size = 512;
  const pad = 36;
  const scale = Math.min(
    (size - pad * 2) / Math.max(1, maxX - minX),
    (size - pad * 2) / Math.max(1, maxY - minY),
  );
  const points = contour.map(([x, y]) => [
    pad + (x - minX) * scale,
    pad + (y - minY) * scale,
  ]);
  const path = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#f7f7f2"/><path d="${path} Z" fill="rgba(232,76,58,0.14)" stroke="#e84c3a" stroke-width="5" stroke-linejoin="round"/></svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeName(state.selected.name || state.selected.species)}_contour.svg`;
  link.click();
  URL.revokeObjectURL(url);
}

function contourRms(a, b) {
  const count = Math.min(a.length, b.length);
  if (!count) return 0;
  let total = 0;
  for (let index = 0; index < count; index += 1) {
    const delta = a[index] - b[index];
    total += delta * delta;
  }
  return Math.sqrt(total / count);
}

function contourArrayRms(left, right) {
  const pointCount = Math.floor(Math.min(left.length, right.length) / 2);
  if (!pointCount) return 0;
  let direct = 0;
  let reversed = 0;
  for (let index = 0; index < pointCount; index += 1) {
    const directIndex = index * 2;
    const reverseIndex = ((pointCount - index) % pointCount) * 2;
    const rightX = right[directIndex];
    const rightY = right[directIndex + 1];
    const dx = left[directIndex] - rightX;
    const dy = left[directIndex + 1] - rightY;
    const rx = left[reverseIndex] - rightX;
    const ry = left[reverseIndex + 1] - rightY;
    direct += dx * dx + dy * dy;
    reversed += rx * rx + ry * ry;
  }
  return Math.sqrt(Math.min(direct, reversed) / pointCount);
}

function exactContourRms(leftShell, rightShell) {
  const left = normalizedContour(leftShell);
  const right = normalizedContour(rightShell);
  if (!left || !right) return null;
  return contourArrayRms(left, right);
}

function updateCompareStatus() {
  if (!state.referenceShell || !state.referenceContour) {
    els.compareStatus.textContent = "No pinned reference";
    return;
  }
  if (state.selected && state.selected.id !== state.referenceShell.id && state.selectedContour) {
    const exactRms = exactContourRms(state.selected, state.referenceShell);
    els.compareStatus.textContent =
      exactRms == null
        ? `${state.referenceShell.species} reference`
        : `${state.referenceShell.species} reference, contour RMS ${formatNumber(exactRms, 4)}`;
    return;
  }
  els.compareStatus.textContent = `${state.referenceShell.species} reference`;
}

function pinReferenceShell() {
  if (!state.selected || !state.selectedContour) return;
  state.referenceShell = state.selected;
  state.referenceContour = Float32Array.from(state.selectedContour);
  state.referenceFingerprint = state.selectedFingerprint
    ? Float32Array.from(state.selectedFingerprint)
    : null;
  updateCompareStatus();
  drawOutline();
  scheduleHashUpdate();
}

function clearReferenceShell() {
  state.referenceShell = null;
  state.referenceContour = null;
  state.referenceFingerprint = null;
  updateCompareStatus();
  drawOutline();
  scheduleHashUpdate();
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
  const count = contourAxisCount();
  for (let index = 0; index < count; index += 1) {
    const range = state.model.contour_pca_ranges[index];
    const span = range ? range.p99 - range.p01 : 1;
    const amplitude = span * (0.18 + index * 0.018);
    values[index] = Math.sin(t * (0.32 + index * 0.045) + index * 1.73) * amplitude;
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

function buildControls() {
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

function reconstructFingerprint(coords) {
  if (!state.model?.mean?.length || !state.model?.components?.length) return new Float32Array();
  const angleCount = state.model.angle_count || state.model.mean.length;
  const out = new Float32Array(angleCount);
  for (let angle = 0; angle < angleCount; angle += 1) {
    let value = state.model.mean[angle] || 0;
    for (let pc = 0; pc < state.model.components.length; pc += 1) {
      value += (coords?.[pc] || 0) * (state.model.components[pc]?.[angle] || 0);
    }
    out[angle] = Math.max(value, 0.02);
  }
  return normalizeMean(out);
}

function reconstruct() {
  if (state.model?.contour_mean?.length && state.model?.contour_components?.length) {
    const pointCount = state.model.contour_points || Math.floor(state.model.contour_mean.length / 2);
    const valueCount = pointCount * 2;
    const out = new Float32Array(valueCount);
    for (let index = 0; index < valueCount; index += 1) {
      let value = state.model.contour_mean[index] || 0;
      for (let pc = 0; pc < state.model.contour_components.length; pc += 1) {
        value += (state.pcValues[pc] || 0) * (state.model.contour_components[pc]?.[index] || 0);
      }
      out[index] = value;
    }
    state.generatedContour = out;
  }
  state.generatedFingerprint = reconstructFingerprint([]);
  drawOutline();
  drawVariant();
}

function pathFromFingerprint(ctx, fingerprint, centerX, centerY, scale) {
  ctx.beginPath();
  for (let angle = 0; angle < fingerprint.length; angle += 1) {
    const radians = (angle * Math.PI) / 180;
    const radius = fingerprint[angle] * scale;
    const x = centerX + Math.cos(radians) * radius;
    const y = centerY - Math.sin(radians) * radius;
    if (angle === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function contourPath(ctx, contour, centerX, centerY, scale) {
  ctx.beginPath();
  const pointCount = Math.floor(contour.length / 2);
  for (let index = 0; index < pointCount; index += 1) {
    const x = centerX + contour[index * 2] * scale;
    const y = centerY + contour[index * 2 + 1] * scale;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function svgPathFromContour(contour, centerX, centerY, scale) {
  const parts = [];
  const pointCount = Math.floor(contour.length / 2);
  for (let index = 0; index < pointCount; index += 1) {
    const x = centerX + contour[index * 2] * scale;
    const y = centerY + contour[index * 2 + 1] * scale;
    parts.push(`${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  parts.push("Z");
  return parts.join(" ");
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

function drawOutline() {
  const canvas = els.outline;
  const width = canvas.width;
  const height = canvas.height;
  outlineCtx.clearRect(0, 0, width, height);
  outlineCtx.fillStyle = "#f7f7f2";
  outlineCtx.fillRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const contour = state.generatedContour || state.selectedContour;
  if (!contour) return;

  const maxRadius = maxContourRadius([contour, state.selectedContour, state.referenceContour]);
  const scale = (Math.min(width, height) * 0.42) / maxRadius;

  outlineCtx.save();
  contourPath(outlineCtx, contour, centerX, centerY, scale);
  outlineCtx.fillStyle = "rgba(40, 122, 116, 0.16)";
  outlineCtx.strokeStyle = "#287a74";
  outlineCtx.lineWidth = 3;
  outlineCtx.fill();
  outlineCtx.stroke();

  if (state.selectedContour) {
    contourPath(outlineCtx, state.selectedContour, centerX, centerY, scale);
    outlineCtx.strokeStyle = "#c65d4b";
    outlineCtx.lineWidth = 2;
    outlineCtx.setLineDash([7, 6]);
    outlineCtx.stroke();
    outlineCtx.setLineDash([]);
  }

  if (state.referenceContour) {
    contourPath(outlineCtx, state.referenceContour, centerX, centerY, scale);
    outlineCtx.strokeStyle = "#4d6fb7";
    outlineCtx.lineWidth = 2;
    outlineCtx.setLineDash([2, 5]);
    outlineCtx.stroke();
    outlineCtx.setLineDash([]);
  }

  outlineCtx.fillStyle = "#20242a";
  outlineCtx.beginPath();
  outlineCtx.arc(centerX, centerY, 3, 0, Math.PI * 2);
  outlineCtx.fill();
  outlineCtx.restore();
}

function percentile(values, q) {
  if (!values.length) return 0;
  values.sort((a, b) => a - b);
  const index = Math.min(values.length - 1, Math.max(0, Math.round((values.length - 1) * q)));
  return values[index];
}

function dilateMask(mask, width, height) {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let value = 0;
      for (let dy = -1; dy <= 1 && !value; dy += 1) {
        const yy = y + dy;
        if (yy < 0 || yy >= height) continue;
        for (let dx = -1; dx <= 1; dx += 1) {
          const xx = x + dx;
          if (xx >= 0 && xx < width && mask[yy * width + xx]) {
            value = 1;
            break;
          }
        }
      }
      out[y * width + x] = value;
    }
  }
  return out;
}

function erodeMask(mask, width, height) {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let value = 1;
      for (let dy = -1; dy <= 1 && value; dy += 1) {
        const yy = y + dy;
        for (let dx = -1; dx <= 1; dx += 1) {
          const xx = x + dx;
          if (yy < 0 || yy >= height || xx < 0 || xx >= width || !mask[yy * width + xx]) {
            value = 0;
            break;
          }
        }
      }
      out[y * width + x] = value;
    }
  }
  return out;
}

function fillExternalBackground(candidate, width, height) {
  const external = new Uint8Array(candidate.length);
  const queue = new Int32Array(candidate.length);
  let head = 0;
  let tail = 0;
  const push = (index) => {
    if (index < 0 || index >= candidate.length || candidate[index] || external[index]) return;
    external[index] = 1;
    queue[tail] = index;
    tail += 1;
  };

  for (let x = 0; x < width; x += 1) {
    push(x);
    push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    push(y * width);
    push(y * width + width - 1);
  }

  while (head < tail) {
    const index = queue[head];
    head += 1;
    const x = index % width;
    if (x > 0) push(index - 1);
    if (x + 1 < width) push(index + 1);
    if (index >= width) push(index - width);
    if (index + width < candidate.length) push(index + width);
  }

  const mask = new Uint8Array(candidate.length);
  for (let index = 0; index < candidate.length; index += 1) {
    mask[index] = external[index] ? 0 : 1;
  }
  return mask;
}

function contourForShell(shell) {
  if (!state.contours || !state.contourPoints) return null;
  const start = shell.id * state.contourPoints * 2;
  const end = start + state.contourPoints * 2;
  if (end > state.contours.length) return null;
  const points = [];
  for (let index = start; index < end; index += 2) {
    points.push([
      state.contours[index] / state.contourScale,
      state.contours[index + 1] / state.contourScale,
    ]);
  }
  return points;
}

function sourceContourCanvas(image, width, height) {
  if (!image.complete || !image.naturalWidth || width < 8 || height < 8) return null;
  const key = `${image.currentSrc || image.src}|${width}x${height}`;
  if (sourceContourCache.has(key)) return sourceContourCache.get(key);

  const source = document.createElement("canvas");
  source.width = width;
  source.height = height;
  const sourceCtx = source.getContext("2d", { willReadFrequently: true });
  sourceCtx.drawImage(image, 0, 0, width, height);

  let pixels;
  try {
    pixels = sourceCtx.getImageData(0, 0, width, height).data;
  } catch (_error) {
    return null;
  }

  const band = Math.max(2, Math.round(Math.min(width, height) / 24));
  const rs = [];
  const gs = [];
  const bs = [];
  const borderIndices = [];
  const collect = (x, y) => {
    const offset = (y * width + x) * 4;
    rs.push(pixels[offset]);
    gs.push(pixels[offset + 1]);
    bs.push(pixels[offset + 2]);
    borderIndices.push(offset);
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < band; x += 1) collect(x, y);
    for (let x = Math.max(band, width - band); x < width; x += 1) collect(x, y);
  }
  for (let y = 0; y < band; y += 1) {
    for (let x = band; x < width - band; x += 1) collect(x, y);
  }
  for (let y = Math.max(band, height - band); y < height; y += 1) {
    for (let x = band; x < width - band; x += 1) collect(x, y);
  }

  const bgR = percentile(rs, 0.5);
  const bgG = percentile(gs, 0.5);
  const bgB = percentile(bs, 0.5);
  const borderDiffs = borderIndices.map((offset) =>
    Math.hypot(pixels[offset] - bgR, pixels[offset + 1] - bgG, pixels[offset + 2] - bgB),
  );
  const cutoff = percentile([...borderDiffs], 0.55);
  const backgroundDiffs = borderDiffs.filter((value) => value <= cutoff);
  const backgroundNoise = percentile(backgroundDiffs.length ? backgroundDiffs : borderDiffs, 0.98);
  const threshold = Math.max(8, Math.min(34, backgroundNoise + 8));
  let foreground = 0;
  let candidate = new Uint8Array(width * height);

  for (let index = 0; index < candidate.length; index += 1) {
    const offset = index * 4;
    const diff = Math.hypot(
      pixels[offset] - bgR,
      pixels[offset + 1] - bgG,
      pixels[offset + 2] - bgB,
    );
    if (diff > threshold) {
      candidate[index] = 1;
      foreground += 1;
    }
  }
  const foregroundRatio = foreground / candidate.length;
  if (foregroundRatio < 0.005 || foregroundRatio > 0.92) return null;

  candidate = erodeMask(dilateMask(candidate, width, height), width, height);
  const mask = fillExternalBackground(candidate, width, height);
  const contour = document.createElement("canvas");
  contour.width = width;
  contour.height = height;
  const contourCtx = contour.getContext("2d");
  const imageData = contourCtx.createImageData(width, height);

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x;
      if (
        mask[index] &&
        (!mask[index - 1] || !mask[index + 1] || !mask[index - width] || !mask[index + width])
      ) {
        const offset = index * 4;
        imageData.data[offset] = 232;
        imageData.data[offset + 1] = 76;
        imageData.data[offset + 2] = 58;
        imageData.data[offset + 3] = 235;
      }
    }
  }
  contourCtx.putImageData(imageData, 0, 0);
  if (sourceContourCache.size > 64) sourceContourCache.delete(sourceContourCache.keys().next().value);
  sourceContourCache.set(key, contour);
  return contour;
}

function updateOverlayButtons() {
  els.overlayContour.setAttribute("aria-pressed", state.overlayLayers.contour ? "true" : "false");
  els.overlayCenter.setAttribute("aria-pressed", state.overlayLayers.center ? "true" : "false");
}

function toggleOverlayLayer(layer) {
  state.overlayLayers[layer] = !state.overlayLayers[layer];
  updateOverlayButtons();
  drawSourceOverlay();
  scheduleHashUpdate();
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
  const [centerX, centerY] = shell.center;

  sourceOverlayCtx.save();
  const contourPoints = state.overlayLayers.contour ? contourForShell(shell) : null;
  if (contourPoints?.length) {
    sourceOverlayCtx.strokeStyle = "rgba(232, 76, 58, 0.96)";
    sourceOverlayCtx.lineWidth = 2;
    sourceOverlayCtx.beginPath();
    contourPoints.forEach(([x, y], index) => {
      const px = offsetX + x * imageScale;
      const py = offsetY + y * imageScale;
      if (index === 0) sourceOverlayCtx.moveTo(px, py);
      else sourceOverlayCtx.lineTo(px, py);
    });
    sourceOverlayCtx.closePath();
    sourceOverlayCtx.stroke();
  } else if (state.overlayLayers.contour) {
    const contour = sourceContourCanvas(
      els.sourceImage,
      Math.max(1, Math.round(imageWidth)),
      Math.max(1, Math.round(imageHeight)),
    );
    if (contour) {
      sourceOverlayCtx.drawImage(contour, offsetX, offsetY, imageWidth, imageHeight);
    }
  }

  const cx = offsetX + centerX * imageScale;
  const cy = offsetY + centerY * imageScale;
  if (state.overlayLayers.center) {
    sourceOverlayCtx.strokeStyle = "rgba(35, 230, 202, 0.96)";
    sourceOverlayCtx.beginPath();
    sourceOverlayCtx.moveTo(cx - 7, cy);
    sourceOverlayCtx.lineTo(cx + 7, cy);
    sourceOverlayCtx.moveTo(cx, cy - 7);
    sourceOverlayCtx.lineTo(cx, cy + 7);
    sourceOverlayCtx.stroke();
  }
  sourceOverlayCtx.restore();
}

function setVariantStatus(text) {
  els.variantStatus.textContent = text;
}

function updateVariantButtons() {
  for (const button of els.variantButtons.querySelectorAll("button")) {
    button.setAttribute(
      "aria-pressed",
      button.dataset.variant === state.activeVariant ? "true" : "false",
    );
  }
}

function buildVariantButtons() {
  els.variantButtons.innerHTML = "";
  for (const [id, label] of variantModes) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.variant = id;
    button.textContent = label;
    button.title = label;
    button.addEventListener("click", () => {
      state.activeVariant = id;
      updateVariantButtons();
      drawVariant();
      scheduleHashUpdate();
    });
    els.variantButtons.append(button);
  }
  updateVariantButtons();
}

function activeFingerprint() {
  if (state.activeVariant === "upload" && state.uploadFingerprint) {
    return state.uploadFingerprint;
  }
  return state.selectedFingerprint || state.generatedFingerprint;
}

function normalizeMean(values) {
  let total = 0;
  for (const value of values) total += value;
  const mean = total / values.length || 1;
  return Float32Array.from(values, (value) => Math.max(0.02, value / mean));
}

function circularSmoothLocal(values, window) {
  const size = values.length;
  const half = Math.floor(window / 2);
  const out = new Float32Array(size);
  for (let index = 0; index < size; index += 1) {
    let total = 0;
    for (let offset = -half; offset <= half; offset += 1) {
      total += values[(index + offset + size) % size];
    }
    out[index] = total / window;
  }
  return out;
}

function circularMedianLocal(values, window) {
  const size = values.length;
  const half = Math.floor(window / 2);
  const out = new Float32Array(size);
  const samples = new Array(window);
  for (let index = 0; index < size; index += 1) {
    for (let offset = -half; offset <= half; offset += 1) {
      samples[offset + half] = values[(index + offset + size) % size];
    }
    samples.sort((a, b) => a - b);
    out[index] = samples[half];
  }
  return out;
}

function fingerprintScale(fingerprint, width, height, ratio = 0.42) {
  return (Math.min(width, height) * ratio) / Math.max(...fingerprint);
}

function pointsFromFingerprint(fingerprint, centerX, centerY, scale) {
  const points = [];
  for (let angle = 0; angle < fingerprint.length; angle += 1) {
    const radians = (angle * Math.PI) / 180;
    const radius = fingerprint[angle] * scale;
    points.push([
      centerX + Math.cos(radians) * radius,
      centerY - Math.sin(radians) * radius,
    ]);
  }
  return points;
}

function strokeFingerprint(ctx, fingerprint, centerX, centerY, scale, color, width = 2) {
  ctx.save();
  pathFromFingerprint(ctx, fingerprint, centerX, centerY, scale);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
}

function clearVariant() {
  const { width, height } = els.variantCanvas;
  variantCtx.clearRect(0, 0, width, height);
  variantCtx.fillStyle = "#f7f7f2";
  variantCtx.fillRect(0, 0, width, height);
  return { width, height, centerX: width / 2, centerY: height / 2 };
}

function fourierCoefficients(fingerprint, maxHarmonic) {
  const n = fingerprint.length;
  const a = new Float64Array(maxHarmonic + 1);
  const b = new Float64Array(maxHarmonic + 1);
  let mean = 0;
  for (const value of fingerprint) mean += value;
  mean /= n;
  for (let harmonic = 1; harmonic <= maxHarmonic; harmonic += 1) {
    let cosTotal = 0;
    let sinTotal = 0;
    for (let index = 0; index < n; index += 1) {
      const radians = (2 * Math.PI * harmonic * index) / n;
      cosTotal += fingerprint[index] * Math.cos(radians);
      sinTotal += fingerprint[index] * Math.sin(radians);
    }
    a[harmonic] = (2 * cosTotal) / n;
    b[harmonic] = (2 * sinTotal) / n;
  }
  return { mean, a, b };
}

function reconstructFourier(coeffs, harmonicCount, length) {
  const out = new Float32Array(length);
  for (let index = 0; index < length; index += 1) {
    let value = coeffs.mean;
    for (let harmonic = 1; harmonic <= harmonicCount; harmonic += 1) {
      const radians = (2 * Math.PI * harmonic * index) / length;
      value +=
        coeffs.a[harmonic] * Math.cos(radians) +
        coeffs.b[harmonic] * Math.sin(radians);
    }
    out[index] = Math.max(0.02, value);
  }
  return normalizeMean(out);
}

function strokePointLoop(ctx, points, color, width = 2) {
  if (!points.length) return;
  ctx.save();
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
}

function contourFourierCoefficients(points, maxHarmonic) {
  const n = points.length;
  const ax = new Float64Array(maxHarmonic + 1);
  const bx = new Float64Array(maxHarmonic + 1);
  const ay = new Float64Array(maxHarmonic + 1);
  const by = new Float64Array(maxHarmonic + 1);
  let meanX = 0;
  let meanY = 0;
  for (const [x, y] of points) {
    meanX += x;
    meanY += y;
  }
  meanX /= n;
  meanY /= n;
  for (let harmonic = 1; harmonic <= maxHarmonic; harmonic += 1) {
    let cosX = 0;
    let sinX = 0;
    let cosY = 0;
    let sinY = 0;
    for (let index = 0; index < n; index += 1) {
      const radians = (2 * Math.PI * harmonic * index) / n;
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      cosX += points[index][0] * cos;
      sinX += points[index][0] * sin;
      cosY += points[index][1] * cos;
      sinY += points[index][1] * sin;
    }
    ax[harmonic] = (2 * cosX) / n;
    bx[harmonic] = (2 * sinX) / n;
    ay[harmonic] = (2 * cosY) / n;
    by[harmonic] = (2 * sinY) / n;
  }
  return { meanX, meanY, ax, bx, ay, by };
}

function reconstructContourFourier(coeffs, harmonicCount, length) {
  const points = [];
  for (let index = 0; index < length; index += 1) {
    let x = coeffs.meanX;
    let y = coeffs.meanY;
    for (let harmonic = 1; harmonic <= harmonicCount; harmonic += 1) {
      const radians = (2 * Math.PI * harmonic * index) / length;
      x += coeffs.ax[harmonic] * Math.cos(radians) + coeffs.bx[harmonic] * Math.sin(radians);
      y += coeffs.ay[harmonic] * Math.cos(radians) + coeffs.by[harmonic] * Math.sin(radians);
    }
    points.push([x, y]);
  }
  return points;
}

function fitContourPoints(points, box, ratio = 0.78) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of points) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  const scale = (Math.min(box.width, box.height) * ratio) / Math.max(1, maxX - minX, maxY - minY);
  const sourceCenterX = (minX + maxX) / 2;
  const sourceCenterY = (minY + maxY) / 2;
  return points.map(([x, y]) => [
    box.centerX + (x - sourceCenterX) * scale,
    box.centerY + (y - sourceCenterY) * scale,
  ]);
}

function drawFourierVariant(fingerprint) {
  const box = clearVariant();
  const harmonics = [3, 6, 12, 24];
  const contour = state.selected ? contourForShell(state.selected) : null;
  const colors = ["rgba(168,121,35,0.58)", "rgba(198,93,75,0.62)", "#287a74", "#20242a"];
  if (contour?.length) {
    const contourCoeffs = contourFourierCoefficients(contour, 36);
    harmonics.forEach((count, index) => {
      const reconstruction = reconstructContourFourier(contourCoeffs, count, contour.length);
      strokePointLoop(variantCtx, fitContourPoints(reconstruction, box), colors[index], 2);
    });
    setVariantStatus("Elliptic Fourier contour harmonics: 3, 6, 12, 24");
    return;
  }
  const coeffs = fourierCoefficients(fingerprint, 36);
  const scale = fingerprintScale(fingerprint, box.width, box.height, 0.39);
  harmonics.forEach((count, index) => {
    const smoothed = reconstructFourier(coeffs, count, fingerprint.length);
    strokeFingerprint(variantCtx, smoothed, box.centerX, box.centerY, scale, colors[index], 2);
  });
  setVariantStatus("Fourier harmonics: 3, 6, 12, 24");
}

function curvatureValues(points) {
  const values = new Float32Array(points.length);
  for (let index = 0; index < points.length; index += 1) {
    const prev = points[(index - 1 + points.length) % points.length];
    const current = points[index];
    const next = points[(index + 1) % points.length];
    const a = Math.atan2(current[1] - prev[1], current[0] - prev[0]);
    const b = Math.atan2(next[1] - current[1], next[0] - current[0]);
    let delta = b - a;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    values[index] = delta;
  }
  return values;
}

function drawCurvatureVariant(fingerprint) {
  const box = clearVariant();
  const scale = fingerprintScale(fingerprint, box.width, box.height, 0.39);
  const points = pointsFromFingerprint(fingerprint, box.centerX, box.centerY, scale);
  const curvature = curvatureValues(points);
  let maxAbs = 0;
  for (const value of curvature) maxAbs = Math.max(maxAbs, Math.abs(value));
  variantCtx.lineWidth = 3;
  for (let index = 0; index < points.length; index += 1) {
    const next = points[(index + 1) % points.length];
    const intensity = Math.min(1, Math.abs(curvature[index]) / (maxAbs || 1));
    variantCtx.strokeStyle =
      curvature[index] >= 0
        ? `rgba(198, 93, 75, ${0.25 + intensity * 0.75})`
        : `rgba(40, 122, 116, ${0.25 + intensity * 0.75})`;
    variantCtx.beginPath();
    variantCtx.moveTo(points[index][0], points[index][1]);
    variantCtx.lineTo(next[0], next[1]);
    variantCtx.stroke();
  }
  setVariantStatus(`Curvature max ${formatNumber(maxAbs, 4)}`);
}

function mirrorFingerprint(fingerprint) {
  const n = fingerprint.length;
  const out = new Float32Array(n);
  let asymmetry = 0;
  for (let index = 0; index < n; index += 1) {
    const mirrorIndex = (180 - index + n) % n;
    out[index] = (fingerprint[index] + fingerprint[mirrorIndex]) / 2;
    asymmetry += Math.abs(fingerprint[index] - fingerprint[mirrorIndex]);
  }
  return { mirrored: normalizeMean(out), asymmetry: asymmetry / n };
}

function drawSymmetryVariant(fingerprint) {
  const box = clearVariant();
  const { mirrored, asymmetry } = mirrorFingerprint(fingerprint);
  const scale = fingerprintScale(fingerprint, box.width, box.height, 0.39);
  strokeFingerprint(variantCtx, mirrored, box.centerX, box.centerY, scale, "#287a74", 3);
  variantCtx.save();
  variantCtx.setLineDash([7, 6]);
  strokeFingerprint(variantCtx, fingerprint, box.centerX, box.centerY, scale, "#c65d4b", 2);
  variantCtx.restore();
  variantCtx.strokeStyle = "rgba(32,36,42,0.26)";
  variantCtx.beginPath();
  variantCtx.moveTo(box.centerX, 22);
  variantCtx.lineTo(box.centerX, box.height - 22);
  variantCtx.stroke();
  setVariantStatus(`Mirror asymmetry ${formatNumber(asymmetry, 4)}`);
}

function drawSpectrumVariant(fingerprint) {
  const box = clearVariant();
  const count = 60;
  const coeffs = fourierCoefficients(fingerprint, count);
  const amplitudes = [];
  let maxAmplitude = 0;
  for (let harmonic = 1; harmonic <= count; harmonic += 1) {
    const value = Math.hypot(coeffs.a[harmonic], coeffs.b[harmonic]);
    amplitudes.push(value);
    maxAmplitude = Math.max(maxAmplitude, value);
  }
  const pad = 28;
  const barWidth = (box.width - pad * 2) / count;
  variantCtx.fillStyle = "rgba(40, 122, 116, 0.76)";
  amplitudes.forEach((value, index) => {
    const height = ((box.height - pad * 2) * Math.log1p(value * 18)) / Math.log1p((maxAmplitude || 1) * 18);
    variantCtx.fillRect(pad + index * barWidth, box.height - pad - height, Math.max(1, barWidth - 1), height);
  });
  variantCtx.strokeStyle = "rgba(32,36,42,0.25)";
  variantCtx.strokeRect(pad, pad, box.width - pad * 2, box.height - pad * 2);
  setVariantStatus(`Dominant harmonic ${amplitudes.indexOf(maxAmplitude) + 1}`);
}

function drawResidualVariant(fingerprint) {
  const box = clearVariant();
  const smooth = circularSmoothLocal(fingerprint, 31);
  const scale = fingerprintScale(fingerprint, box.width, box.height, 0.39);
  strokeFingerprint(variantCtx, smooth, box.centerX, box.centerY, scale, "rgba(32,36,42,0.55)", 2);
  let total = 0;
  for (let angle = 0; angle < fingerprint.length; angle += 4) {
    const radians = (angle * Math.PI) / 180;
    const base = smooth[angle] * scale;
    const tip = fingerprint[angle] * scale;
    const delta = fingerprint[angle] - smooth[angle];
    total += Math.abs(delta);
    variantCtx.strokeStyle = delta >= 0 ? "rgba(198,93,75,0.75)" : "rgba(40,122,116,0.72)";
    variantCtx.beginPath();
    variantCtx.moveTo(box.centerX + Math.cos(radians) * base, box.centerY - Math.sin(radians) * base);
    variantCtx.lineTo(box.centerX + Math.cos(radians) * tip, box.centerY - Math.sin(radians) * tip);
    variantCtx.stroke();
  }
  setVariantStatus(`Residual energy ${formatNumber(total / 90, 4)}`);
}

function drawSpiralVariant(fingerprint) {
  const box = clearVariant();
  const pad = 30;
  const logs = Array.from(fingerprint, (value) => Math.log(Math.max(0.02, value)));
  const min = Math.min(...logs);
  const max = Math.max(...logs);
  const sx = (box.width - pad * 2) / (logs.length - 1);
  const sy = (box.height - pad * 2) / Math.max(0.001, max - min);
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  logs.forEach((value, index) => {
    sumX += index;
    sumY += value;
    sumXY += index * value;
    sumXX += index * index;
  });
  const n = logs.length;
  const slope = (n * sumXY - sumX * sumY) / Math.max(1e-9, n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  variantCtx.strokeStyle = "#287a74";
  variantCtx.lineWidth = 2;
  variantCtx.beginPath();
  logs.forEach((value, index) => {
    const x = pad + index * sx;
    const y = box.height - pad - (value - min) * sy;
    if (index === 0) variantCtx.moveTo(x, y);
    else variantCtx.lineTo(x, y);
  });
  variantCtx.stroke();
  variantCtx.strokeStyle = "#c65d4b";
  variantCtx.setLineDash([7, 6]);
  variantCtx.beginPath();
  for (const index of [0, logs.length - 1]) {
    const yValue = slope * index + intercept;
    const x = pad + index * sx;
    const y = box.height - pad - (yValue - min) * sy;
    if (index === 0) variantCtx.moveTo(x, y);
    else variantCtx.lineTo(x, y);
  }
  variantCtx.stroke();
  variantCtx.setLineDash([]);
  setVariantStatus(`Log-distance slope ${formatNumber(slope, 5)}`);
}

function drawContextVariant(fingerprint) {
  const box = clearVariant();
  const contour = state.selected ? contourForShell(state.selected) : null;
  const angleBins = 36;
  const radiusBins = 10;
  if (contour?.length) {
    let centerX = 0;
    let centerY = 0;
    for (const [x, y] of contour) {
      centerX += x;
      centerY += y;
    }
    centerX /= contour.length;
    centerY /= contour.length;

    let maxDistance = 0;
    for (let i = 0; i < contour.length; i += 1) {
      for (let j = 0; j < contour.length; j += 1) {
        if (i === j) continue;
        const dx = contour[j][0] - contour[i][0];
        const dy = contour[j][1] - contour[i][1];
        maxDistance = Math.max(maxDistance, Math.hypot(dx, dy));
      }
    }
    const minDistance = Math.max(1e-3, maxDistance / 96);
    const logSpan = Math.log(maxDistance / minDistance || 1);
    const bins = new Float32Array(angleBins * radiusBins);
    let maxBin = 0;
    for (let i = 0; i < contour.length; i += 1) {
      for (let j = 0; j < contour.length; j += 1) {
        if (i === j) continue;
        const dx = contour[j][0] - contour[i][0];
        const dy = contour[j][1] - contour[i][1];
        const distance = Math.max(minDistance, Math.hypot(dx, dy));
        const angle = (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2);
        const angleBin = Math.min(angleBins - 1, Math.floor((angle / (Math.PI * 2)) * angleBins));
        const radiusBin = Math.min(
          radiusBins - 1,
          Math.max(0, Math.floor((Math.log(distance / minDistance) / logSpan) * radiusBins)),
        );
        const index = radiusBin * angleBins + angleBin;
        bins[index] += 1;
        maxBin = Math.max(maxBin, bins[index]);
      }
    }
    const cellW = box.width / angleBins;
    const cellH = box.height / radiusBins;
    for (let r = 0; r < radiusBins; r += 1) {
      for (let a = 0; a < angleBins; a += 1) {
        const value = bins[r * angleBins + a] / Math.max(1, maxBin);
        variantCtx.fillStyle = `rgba(${Math.round(42 + value * 184)}, ${Math.round(69 + value * 54)}, ${Math.round(96 + value * 26)}, ${0.12 + value * 0.78})`;
        variantCtx.fillRect(a * cellW, box.height - (r + 1) * cellH, Math.ceil(cellW), Math.ceil(cellH));
      }
    }
    variantCtx.strokeStyle = "rgba(32,36,42,0.2)";
    variantCtx.strokeRect(0.5, 0.5, box.width - 1, box.height - 1);
    setVariantStatus("Shape context: exact contour log-polar bins");
    return;
  }

  const maxRadius = Math.max(...fingerprint);
  const cellW = box.width / angleBins;
  const cellH = box.height / radiusBins;
  for (let a = 0; a < angleBins; a += 1) {
    let radius = 0;
    for (let offset = 0; offset < 10; offset += 1) radius += fingerprint[a * 10 + offset];
    radius = radius / 10 / maxRadius;
    for (let r = 0; r < radiusBins; r += 1) {
      const fill = r / radiusBins <= radius ? 0.18 + (1 - r / radiusBins) * 0.68 : 0.04;
      variantCtx.fillStyle = `rgba(40, 122, 116, ${fill})`;
      variantCtx.fillRect(a * cellW, box.height - (r + 1) * cellH, Math.ceil(cellW), Math.ceil(cellH));
    }
  }
  variantCtx.strokeStyle = "rgba(32,36,42,0.2)";
  variantCtx.strokeRect(0.5, 0.5, box.width - 1, box.height - 1);
  setVariantStatus("Shape context: 36 x 10 polar bins");
}

const factorialCache = [1];

function factorial(value) {
  while (factorialCache.length <= value) {
    factorialCache.push(factorialCache[factorialCache.length - 1] * factorialCache.length);
  }
  return factorialCache[value];
}

function zernikeRadial(n, m, rho) {
  let total = 0;
  const limit = (n - m) / 2;
  for (let s = 0; s <= limit; s += 1) {
    const sign = s % 2 === 0 ? 1 : -1;
    const top = factorial(n - s);
    const bottom =
      factorial(s) *
      factorial((n + m) / 2 - s) *
      factorial((n - m) / 2 - s);
    total += sign * (top / bottom) * rho ** (n - 2 * s);
  }
  return total;
}

function zernikeMagnitudes(fingerprint, order = 8) {
  const maxRadius = Math.max(...fingerprint);
  const radialSteps = 14;
  const modes = [];
  for (let n = 0; n <= order; n += 1) {
    for (let m = 0; m <= n; m += 1) {
      if ((n - m) % 2 !== 0 || (n === 0 && m === 0)) continue;
      let real = 0;
      let imag = 0;
      for (let angle = 0; angle < fingerprint.length; angle += 1) {
        const theta = (angle * Math.PI) / 180;
        const limit = fingerprint[angle] / maxRadius;
        for (let step = 0; step < radialSteps; step += 1) {
          const rho = (step + 0.5) / radialSteps;
          if (rho > limit) continue;
          const radial = zernikeRadial(n, m, rho) * rho;
          real += radial * Math.cos(m * theta);
          imag -= radial * Math.sin(m * theta);
        }
      }
      const magnitude = ((n + 1) * Math.hypot(real, imag)) / (Math.PI * fingerprint.length * radialSteps);
      modes.push({ label: `${n},${m}`, magnitude });
    }
  }
  return modes;
}

function drawZernikeVariant(fingerprint) {
  const box = clearVariant();
  const modes = zernikeMagnitudes(fingerprint);
  const max = Math.max(...modes.map((mode) => mode.magnitude));
  const pad = 26;
  const barWidth = (box.width - pad * 2) / modes.length;
  modes.forEach((mode, index) => {
    const height = ((box.height - pad * 2) * mode.magnitude) / (max || 1);
    variantCtx.fillStyle = index % 2 ? "rgba(198,93,75,0.72)" : "rgba(40,122,116,0.72)";
    variantCtx.fillRect(pad + index * barWidth, box.height - pad - height, Math.max(2, barWidth - 1), height);
  });
  setVariantStatus(`Zernike modes ${modes.length}, strongest ${modes.reduce((a, b) => (a.magnitude > b.magnitude ? a : b)).label}`);
}

async function loadImage(shell) {
  if (imageCache.has(shell.file)) return imageCache.get(shell.file);
  const image = new Image();
  const promise = new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
  image.src = datasetAsset(shell.file);
  imageCache.set(shell.file, promise);
  return promise;
}

async function drawColorVariant(fingerprint, requestId) {
  const box = clearVariant();
  if (!state.selected) {
    setVariantStatus("Color: no selected shell");
    return;
  }
  setVariantStatus("Color sampling");
  try {
    const image = await loadImage(state.selected);
    if (requestId !== state.colorRequest || state.activeVariant !== "color") return;
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const scaleX = canvas.width / (state.selected.image_width || canvas.width);
    const scaleY = canvas.height / (state.selected.image_height || canvas.height);
    const cx = state.selected.center[0] * scaleX;
    const cy = state.selected.center[1] * scaleY;
    const radiusScale = state.selected.mean_radius;
    const stripeWidth = box.width / fingerprint.length;
    for (let angle = 0; angle < fingerprint.length; angle += 1) {
      const radians = (angle * Math.PI) / 180;
      let red = 0;
      let green = 0;
      let blue = 0;
      let samples = 0;
      for (const fraction of [0.45, 0.68, 0.9]) {
        const radius = fingerprint[angle] * radiusScale * fraction;
        const x = Math.round(cx + Math.cos(radians) * radius * scaleX);
        const y = Math.round(cy - Math.sin(radians) * radius * scaleY);
        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
        const offset = (y * canvas.width + x) * 4;
        red += pixels[offset];
        green += pixels[offset + 1];
        blue += pixels[offset + 2];
        samples += 1;
      }
      if (!samples) {
        red = 247;
        green = 247;
        blue = 242;
        samples = 1;
      }
      variantCtx.fillStyle = `rgb(${Math.round(red / samples)}, ${Math.round(green / samples)}, ${Math.round(blue / samples)})`;
      variantCtx.fillRect(angle * stripeWidth, 0, Math.ceil(stripeWidth), box.height);
    }
    const scale = fingerprintScale(fingerprint, box.width, box.height, 0.28);
    variantCtx.globalCompositeOperation = "multiply";
    strokeFingerprint(variantCtx, fingerprint, box.centerX, box.centerY, scale, "rgba(32,36,42,0.68)", 2);
    variantCtx.globalCompositeOperation = "source-over";
    setVariantStatus(`Color contour sampling: ${state.selected.species}`);
  } catch (error) {
    setVariantStatus(error.message);
  }
}

function drawUploadVariant(fingerprint) {
  const box = clearVariant();
  const scale = fingerprintScale(fingerprint, box.width, box.height, 0.39);
  strokeFingerprint(variantCtx, fingerprint, box.centerX, box.centerY, scale, "#287a74", 3);
  if (state.uploadMatches.length) {
    const best = state.uploadMatches[0].shell;
    const bestFingerprint = fingerprintForShell(best);
    variantCtx.save();
    variantCtx.setLineDash([7, 6]);
    strokeFingerprint(variantCtx, bestFingerprint, box.centerX, box.centerY, scale, "#c65d4b", 2);
    variantCtx.restore();
    setVariantStatus(`${state.uploadName || "Upload"} nearest ${best.species}`);
  } else if (state.uploadFingerprint) {
    setVariantStatus(state.uploadName || "Upload");
  } else {
    setVariantStatus("Upload: waiting for image");
  }
}

function drawVariant() {
  const fingerprint = activeFingerprint();
  if (!fingerprint) return;
  if (state.activeVariant !== "color") state.colorRequest += 1;
  updateVariantButtons();
  switch (state.activeVariant) {
    case "fourier":
      drawFourierVariant(fingerprint);
      break;
    case "curvature":
      drawCurvatureVariant(fingerprint);
      break;
    case "symmetry":
      drawSymmetryVariant(fingerprint);
      break;
    case "spectrum":
      drawSpectrumVariant(fingerprint);
      break;
    case "residual":
      drawResidualVariant(fingerprint);
      break;
    case "spiral":
      drawSpiralVariant(fingerprint);
      break;
    case "context":
      drawContextVariant(fingerprint);
      break;
    case "zernike":
      drawZernikeVariant(fingerprint);
      break;
    case "color":
      state.colorRequest += 1;
      drawColorVariant(fingerprint, state.colorRequest);
      break;
    case "upload":
      drawUploadVariant(fingerprint);
      break;
    default:
      drawFourierVariant(fingerprint);
  }
}

function nearestShell(screenX, screenY) {
  const size = resizeCanvas(els.scatter, scatterCtx);
  let best = null;
  let bestDistance = Infinity;
  for (const shell of state.filtered) {
    const point = worldToScreen(axisValue(shell, state.xAxis), axisValue(shell, state.yAxis), size);
    const dx = point.x - screenX;
    const dy = point.y - screenY;
    const distance = dx * dx + dy * dy;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = shell;
    }
  }
  return bestDistance <= 14 * 14 ? best : null;
}

function nearestNeighbors(shell, count = 8) {
  const pcCount = Math.min(4, shell.contour_pc?.length || 0);
  const distances = [];
  for (const candidate of state.shells) {
    if (candidate.id === shell.id) continue;
    let distance = 0;
    for (let i = 0; i < pcCount; i += 1) {
      const delta = (candidate.contour_pc?.[i] || 0) - (shell.contour_pc?.[i] || 0);
      distance += delta * delta;
    }
    distances.push({ distance: Math.sqrt(distance), shell: candidate });
  }
  distances.sort((a, b) => a.distance - b.distance);
  return distances.slice(0, count);
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
  for (let index = 0; index < state.contourPoints; index += 1) {
    const source = start + index * 2;
    out[index * 2] = (state.contours[source] - centerX) / radius;
    out[index * 2 + 1] = (state.contours[source + 1] - centerY) / radius;
  }
  normalizedContourCache.set(shell.id, out);
  return out;
}

function contourDistance(sourceContour, candidate) {
  const candidateContour = normalizedContour(candidate);
  if (!candidateContour) return Infinity;
  return contourArrayRms(sourceContour, candidateContour);
}

function nearestContourNeighbors(shell, count = 8) {
  if (!state.contours || !state.contourPoints) return nearestNeighbors(shell, count);
  const sourceContour = normalizedContour(shell);
  if (!sourceContour) return nearestNeighbors(shell, count);
  const best = [];
  for (const candidate of state.shells) {
    if (candidate.id === shell.id) continue;
    const item = { distance: contourDistance(sourceContour, candidate), shell: candidate };
    best.push(item);
    best.sort((a, b) => a.distance - b.distance);
    if (best.length > count) best.pop();
  }
  return best;
}

function updateNeighborModeButtons() {
  els.neighborPcaMode.setAttribute("aria-pressed", state.neighborMode === "pca" ? "true" : "false");
  els.neighborContourMode.setAttribute(
    "aria-pressed",
    state.neighborMode === "contour" ? "true" : "false",
  );
}

function setNeighborMode(mode) {
  state.neighborMode = mode;
  updateNeighborModeButtons();
  if (state.selected) renderNeighbors(state.selected);
  scheduleHashUpdate();
}

function renderNeighbors(shell) {
  els.neighborsList.innerHTML = "";
  updateNeighborModeButtons();
  const items =
    state.neighborMode === "contour"
      ? nearestContourNeighbors(shell)
      : nearestNeighbors(shell);
  els.neighborStatus.textContent =
    state.neighborMode === "contour"
      ? "Resampled outer-contour distance"
      : "Euclidean distance in contour PC1-PC4";
  for (const item of items) {
    const neighbor = item.shell;
    const button = document.createElement("button");
    button.className = "neighbor-button";
    button.title = `${neighbor.species} (${formatNumber(item.distance, 4)})`;
    const image = document.createElement("img");
    setShellImage(image, neighbor, neighbor.species);
    const label = document.createElement("span");
    label.textContent = formatNumber(item.distance, 3);
    button.append(image, label);
    button.addEventListener("click", () => selectShell(neighbor));
    els.neighborsList.append(button);
  }
}

function fingerprintForShell(shell) {
  if (!state.fingerprints || !state.model) return reconstructFingerprint(shell.pc);
  const angleCount = state.model.angle_count;
  const start = shell.id * angleCount;
  const end = start + angleCount;
  if (end > state.fingerprints.length) return reconstructFingerprint(shell.pc);
  if (state.fingerprintEncoding === "float32") return state.fingerprints.slice(start, end);
  const fingerprint = new Float32Array(angleCount);
  for (let angle = 0; angle < angleCount; angle += 1) {
    fingerprint[angle] = state.fingerprints[start + angle] / state.fingerprintScale;
  }
  return fingerprint;
}

function fingerprintValue(shellId, angle) {
  const index = shellId * state.model.angle_count + angle;
  const value = state.fingerprints[index];
  return state.fingerprintEncoding === "uint16_fixed" ? value / state.fingerprintScale : value;
}

function selectShell(shell) {
  if (!shell) return;
  if (state.walkingPca) stopPcaWalk(false);
  state.selected = shell;
  state.selectedContour = normalizedContour(shell);
  state.selectedFingerprint = fingerprintForShell(shell);

  shell.contour_pc.forEach((value, index) => {
    state.pcValues[index] = value;
  });
  for (let index = 0; index < Math.min(6, shell.contour_pc.length); index += 1) {
    setPcValue(index, shell.contour_pc[index]);
  }

  els.selectedName.textContent = shell.species;
  els.selectedDetails.innerHTML = "";
  const details = [
    ["File", shell.file],
    ["Specimen", shell.specimen || "-"],
    ["View", shell.view || "-"],
    ["Contour PC", shell.contour_pc?.slice(0, 2).map((value) => formatNumber(value, 3)).join(", ") || "-"],
    ["Area", shell.area.toLocaleString()],
    ["Mask", `${formatNumber(shell.mask_ratio * 100, 2)}%`],
    ["Components", shell.component_count || "-"],
    ["Center shift", `${formatNumber(shell.center_adjustment || 0, 2)} px`],
    ["Roughness", formatNumber(shell.roughness || 0, 4)],
    ["Aspect", formatNumber(shell.aspect_ratio || 0, 2)],
    ["Solidity", formatNumber(shell.contour_solidity || 0, 4)],
    ["Concavity", formatNumber(shell.contour_concavity || 0, 4)],
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
  updateCompareStatus();
  drawOutline();
  drawSourceOverlay();
  drawVariant();
  scheduleDraw();
  scheduleHashUpdate();
}

function setTargetFromEvent(event) {
  const rect = els.scatter.getBoundingClientRect();
  const size = resizeCanvas(els.scatter, scatterCtx);
  const point = screenToWorld(event.clientX - rect.left, event.clientY - rect.top, size);
  setPcValue(state.xAxis, point.x);
  setPcValue(state.yAxis, point.y);
}

function startViewportPan(event) {
  if (!state.viewport) return;
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
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const strong = document.createElement("strong");
  strong.textContent = shell.species;
  els.pointTooltip.replaceChildren(
    strong,
    document.createTextNode(shell.file),
    document.createElement("br"),
    document.createTextNode(
      `${axisLabel(state.xAxis)} ${formatNumber(axisValue(shell, state.xAxis))}, ` +
        `${axisLabel(state.yAxis)} ${formatNumber(axisValue(shell, state.yAxis))}`,
    ),
    document.createElement("br"),
    document.createTextNode(
      `Mask ${formatNumber(shell.mask_ratio * 100, 1)}%, center ${formatNumber(
        shell.center_adjustment || 0,
        1,
      )} px`,
    ),
    document.createElement("br"),
    document.createTextNode(
      `Solidity ${formatNumber(shell.contour_solidity || 0, 3)}, concavity ${formatNumber(shell.contour_concavity || 0, 3)}`,
    ),
  );
  const maxLeft = Math.max(8, rect.width - 248);
  const maxTop = Math.max(8, rect.height - 92);
  els.pointTooltip.style.left = `${Math.min(maxLeft, Math.max(8, x + 14))}px`;
  els.pointTooltip.style.top = `${Math.min(maxTop, Math.max(8, y + 14))}px`;
  els.pointTooltip.hidden = false;
}

function otsu(values) {
  const hist = new Uint32Array(256);
  for (const value of values) hist[Math.max(0, Math.min(255, Math.round(value)))] += 1;
  let total = 0;
  let weightedTotal = 0;
  for (let i = 0; i < hist.length; i += 1) {
    total += hist[i];
    weightedTotal += i * hist[i];
  }
  let backgroundWeight = 0;
  let backgroundSum = 0;
  let best = 0;
  let bestVariance = -1;
  for (let i = 0; i < hist.length; i += 1) {
    backgroundWeight += hist[i];
    if (!backgroundWeight) continue;
    const foregroundWeight = total - backgroundWeight;
    if (!foregroundWeight) break;
    backgroundSum += i * hist[i];
    const backgroundMean = backgroundSum / backgroundWeight;
    const foregroundMean = (weightedTotal - backgroundSum) / foregroundWeight;
    const variance = backgroundWeight * foregroundWeight * (backgroundMean - foregroundMean) ** 2;
    if (variance > bestVariance) {
      bestVariance = variance;
      best = i;
    }
  }
  return best;
}

async function imageBitmapFromFile(file) {
  if ("createImageBitmap" in window) return createImageBitmap(file);
  const image = new Image();
  const url = URL.createObjectURL(file);
  const promise = new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
  image.src = url;
  const loaded = await promise;
  URL.revokeObjectURL(url);
  return loaded;
}

function radialFingerprintFromMask(mask, width, height, centerX, centerY, bbox) {
  const [x0, y0, x1, y1] = bbox;
  const maxRadius =
    Math.ceil(
      Math.max(
        Math.hypot(centerX - x0, centerY - y0),
        Math.hypot(centerX - x0, centerY - y1),
        Math.hypot(centerX - x1, centerY - y0),
        Math.hypot(centerX - x1, centerY - y1),
      ),
    ) + 4;
  const fingerprint = new Float32Array(360);
  for (let angle = 0; angle < 360; angle += 1) {
    const radians = (angle * Math.PI) / 180;
    let last = 0;
    for (let radius = 0; radius <= maxRadius; radius += 1) {
      const x = Math.round(centerX + Math.cos(radians) * radius);
      const y = Math.round(centerY - Math.sin(radians) * radius);
      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      if (mask[y * width + x]) last = radius;
    }
    fingerprint[angle] = last;
  }

  const known = [];
  for (let i = 0; i < fingerprint.length; i += 1) {
    if (fingerprint[i] > 0) known.push(i);
  }
  if (known.length < 8) throw new Error("Upload silhouette is too small");
  for (let i = 0; i < fingerprint.length; i += 1) {
    if (fingerprint[i] > 0) continue;
    let left = known[known.length - 1] - 360;
    let right = known[0] + 360;
    for (const index of known) {
      if (index < i) left = index;
      if (index > i) {
        right = index;
        break;
      }
    }
    const leftValue = fingerprint[(left + 360) % 360];
    const rightValue = fingerprint[right % 360];
    const t = (i - left) / (right - left);
    fingerprint[i] = leftValue * (1 - t) + rightValue * t;
  }
  return normalizeMean(circularSmoothLocal(circularMedianLocal(fingerprint, 3), 5));
}

function fingerprintFromUploadPixels(pixels, width, height) {
  const border = [];
  const step = Math.max(1, Math.floor(Math.min(width, height) / 80));
  for (let x = 0; x < width; x += step) {
    border.push((0 * width + x) * 4, ((height - 1) * width + x) * 4);
  }
  for (let y = 0; y < height; y += step) {
    border.push((y * width + 0) * 4, (y * width + width - 1) * 4);
  }
  let br = 0;
  let bg = 0;
  let bb = 0;
  for (const offset of border) {
    br += pixels[offset];
    bg += pixels[offset + 1];
    bb += pixels[offset + 2];
  }
  br /= border.length;
  bg /= border.length;
  bb /= border.length;

  const diff = new Float32Array(width * height);
  for (let offset = 0, index = 0; index < diff.length; offset += 4, index += 1) {
    const dr = pixels[offset] - br;
    const dg = pixels[offset + 1] - bg;
    const db = pixels[offset + 2] - bb;
    diff[index] = Math.hypot(dr, dg, db);
  }
  const threshold = Math.max(10, otsu(diff) * 0.72);
  const mask = new Uint8Array(width * height);
  let count = 0;
  let borderCount = 0;
  let borderForeground = 0;
  for (let index = 0; index < diff.length; index += 1) {
    const x = index % width;
    const y = Math.floor(index / width);
    const foreground = diff[index] > threshold ? 1 : 0;
    mask[index] = foreground;
    count += foreground;
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      borderCount += 1;
      borderForeground += foreground;
    }
  }
  if (borderForeground / Math.max(1, borderCount) > 0.45 || count / mask.length > 0.72) {
    count = 0;
    for (let index = 0; index < mask.length; index += 1) {
      mask[index] = mask[index] ? 0 : 1;
      count += mask[index];
    }
  }
  if (count < 64) throw new Error("Upload foreground is too small");

  let x0 = width;
  let y0 = height;
  let x1 = 0;
  let y1 = 0;
  let sumX = 0;
  let sumY = 0;
  for (let index = 0; index < mask.length; index += 1) {
    if (!mask[index]) continue;
    const x = index % width;
    const y = Math.floor(index / width);
    sumX += x;
    sumY += y;
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x);
    y1 = Math.max(y1, y);
  }
  let centerX = sumX / count;
  let centerY = sumY / count;
  const centerColumn = Math.min(width - 1, Math.max(0, Math.round(centerX)));
  const centerRow = Math.min(height - 1, Math.max(0, Math.round(centerY)));
  const centerIndex = centerRow * width + centerColumn;
  if (!mask[centerIndex]) {
    let bestDistance = Infinity;
    for (let index = 0; index < mask.length; index += 1) {
      if (!mask[index]) continue;
      const x = index % width;
      const y = Math.floor(index / width);
      const distance = (x - centerX) ** 2 + (y - centerY) ** 2;
      if (distance < bestDistance) {
        bestDistance = distance;
        centerX = x;
        centerY = y;
      }
    }
  }
  return radialFingerprintFromMask(mask, width, height, centerX, centerY, [x0, y0, x1, y1]);
}

function nearestFingerprints(fingerprint, count = 5) {
  const angleCount = state.model.angle_count;
  const best = [];
  for (const shell of state.shells) {
    let distance = 0;
    for (let angle = 0; angle < angleCount; angle += 4) {
      const delta = fingerprintValue(shell.id, angle) - fingerprint[angle];
      distance += delta * delta;
    }
    const item = { distance, shell };
    best.push(item);
    best.sort((a, b) => a.distance - b.distance);
    if (best.length > count) best.pop();
  }
  return best;
}

async function handleUpload(event) {
  const [file] = event.target.files;
  if (!file) return;
  setVariantStatus("Upload loading");
  try {
    const image = await imageBitmapFromFile(file);
    const maxSize = 520;
    const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    state.uploadFingerprint = fingerprintFromUploadPixels(pixels, canvas.width, canvas.height);
    state.uploadName = file.name;
    state.uploadMatches = nearestFingerprints(state.uploadFingerprint, 5);
    state.activeVariant = "upload";
    updateVariantButtons();
    drawVariant();
    scheduleHashUpdate();
  } catch (error) {
    setVariantStatus(error.message);
  }
}

function setupEvents() {
  buildVariantButtons();
  applyDiagnosticVisibility();
  els.search.addEventListener("input", updateFilter);
  els.uploadShape.addEventListener("change", handleUpload);
  els.pinReference.addEventListener("click", pinReferenceShell);
  els.clearReference.addEventListener("click", clearReferenceShell);
  els.meanShape.addEventListener("click", resetToMeanShape);
  els.walkPca.addEventListener("click", togglePcaWalk);
  els.exportContourSvg.addEventListener("click", exportSelectedContourSvg);
  els.exportSvg.addEventListener("click", exportGeneratedSvg);
  els.xAxisSelect.addEventListener("change", () => {
    setAxes(Number(els.xAxisSelect.value), state.yAxis);
  });
  els.yAxisSelect.addEventListener("change", () => {
    setAxes(state.xAxis, Number(els.yAxisSelect.value));
  });
  els.colorModeSelect.addEventListener("change", () => {
    state.colorMode = els.colorModeSelect.value;
    scheduleDraw();
    scheduleHashUpdate();
  });
  if (els.qualityModeSelect) {
    els.qualityModeSelect.addEventListener("change", () => {
      state.qualityMode = els.qualityModeSelect.value;
      renderQualityList();
      scheduleHashUpdate();
    });
  }
  els.neighborPcaMode.addEventListener("click", () => setNeighborMode("pca"));
  els.neighborContourMode.addEventListener("click", () => setNeighborMode("contour"));
  els.overlayContour.addEventListener("click", () => toggleOverlayLayer("contour"));
  els.overlayCenter.addEventListener("click", () => toggleOverlayLayer("center"));
  els.randomShell.addEventListener("click", selectRandomShell);
  els.zoomIn.addEventListener("click", () => zoom(0.72));
  els.zoomOut.addEventListener("click", () => zoom(1.38));
  els.resetView.addEventListener("click", () => {
    state.viewport = initialViewport(state.xAxis, state.yAxis);
    scheduleDraw();
    scheduleHashUpdate();
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
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const shell = nearestShell(localX, localY);
    if (shell) {
      selectShell(shell);
    } else {
      state.draggingTarget = true;
      setTargetFromEvent(event);
    }
  });

  els.scatter.addEventListener("pointermove", (event) => {
    if (state.panningViewport) {
      event.preventDefault();
      panViewportFromEvent(event);
      els.pointTooltip.hidden = true;
      return;
    }
    if (state.draggingTarget) {
      setTargetFromEvent(event);
      els.pointTooltip.hidden = true;
      return;
    }
    const rect = els.scatter.getBoundingClientRect();
    const shell = nearestShell(event.clientX - rect.left, event.clientY - rect.top);
    showPointTooltip(event, shell);
  });

  els.scatter.addEventListener("pointerup", () => {
    state.draggingTarget = false;
    stopViewportPan();
  });

  els.scatter.addEventListener("pointerleave", () => {
    state.draggingTarget = false;
    stopViewportPan();
    els.pointTooltip.hidden = true;
  });

  els.scatter.addEventListener("pointercancel", () => {
    state.draggingTarget = false;
    stopViewportPan();
  });

  els.scatter.addEventListener("auxclick", (event) => {
    if (event.button === 1) event.preventDefault();
  });

  window.addEventListener("resize", () => {
    scheduleDraw();
    drawSourceOverlay();
  });
  els.sourceImage.addEventListener("load", drawSourceOverlay);
}

async function init() {
  setupEvents();
  const [model, shellPayload] = await Promise.all([
    fetchJson(asset("data/model.json")),
    fetchJson(asset("data/shells.json")),
  ]);
  const fingerprintBuffer = await fetchArrayBuffer(
    asset(`data/${model.fingerprint_file || "fingerprints.f32"}`),
  );
  const contourBuffer = model.contour_file
    ? await fetchArrayBuffer(asset(`data/${model.contour_file}`))
    : null;

  state.model = model;
  state.shells = shellPayload.records;
  state.fingerprintEncoding = model.fingerprint_encoding || "float32";
  state.fingerprintScale = model.fingerprint_scale || 1;
  state.fingerprints =
    state.fingerprintEncoding === "uint16_fixed"
      ? new Uint16Array(fingerprintBuffer)
      : new Float32Array(fingerprintBuffer);
  state.contours = contourBuffer ? new Uint16Array(contourBuffer) : null;
  state.contourPoints = model.contour_points || 0;
  state.contourScale = model.contour_scale || 1;
  state.filtered = state.shells;

  const expectedFingerprintValues = model.processed_count * model.angle_count;
  if (state.fingerprints.length < expectedFingerprintValues) {
    throw new Error("Fingerprint binary is shorter than the model manifest expects.");
  }
  if (model.contour_file) {
    const expectedContourValues = model.processed_count * model.contour_points * 2;
    if (!state.contours || state.contours.length < expectedContourValues) {
      throw new Error("Contour binary is shorter than the model manifest expects.");
    }
  }

  els.statusLine.textContent = model.species_count
    ? `${model.processed_count.toLocaleString()} shells, ${model.species_count.toLocaleString()} species in contour PCA space`
    : `${model.processed_count.toLocaleString()} shells in contour PCA space`;
  els.visibleCount.textContent = state.filtered.length.toLocaleString();

  const initialHash = parseHashState();
  const axesAvailable = axisOptionCount();
  const coerceAxis = (value) => {
    if (!Number.isInteger(value)) return null;
    if (value >= 0 && value < axesAvailable) return value;
    const legacyOffset = model.visible_component_count || 0;
    const legacyValue = value - legacyOffset;
    if (legacyValue >= 0 && legacyValue < axesAvailable) return legacyValue;
    return null;
  };
  const requestedXAxis = coerceAxis(Number(initialHash.get("x")));
  const requestedYAxis = coerceAxis(Number(initialHash.get("y")));
  if (requestedXAxis != null) {
    state.xAxis = requestedXAxis;
  }
  if (requestedYAxis != null) {
    state.yAxis = requestedYAxis;
  }
  if (["species", "mask", "center", "concavity"].includes(initialHash.get("color"))) {
    state.colorMode = initialHash.get("color");
  }
  if (state.diagnostics.qa && qualityModes.includes(initialHash.get("quality"))) {
    state.qualityMode = initialHash.get("quality");
  }
  if (neighborModes.includes(initialHash.get("near"))) {
    state.neighborMode = initialHash.get("near");
  }
  if (initialHash.has("layers")) {
    const requestedLayers = new Set(
      initialHash
        .get("layers")
        .split(",")
        .map((layer) => layer.trim())
        .filter((layer) => overlayLayerNames.includes(layer)),
    );
    for (const layer of overlayLayerNames) {
      state.overlayLayers[layer] = requestedLayers.has(layer);
    }
  }
  if (variantModes.some(([id]) => id === initialHash.get("variant"))) {
    state.activeVariant = initialHash.get("variant");
  }

  state.viewport = initialViewport(state.xAxis, state.yAxis);
  buildAxisControls();
  els.colorModeSelect.value = state.colorMode;
  if (els.qualityModeSelect) els.qualityModeSelect.value = state.qualityMode;
  updateOverlayButtons();
  updateNeighborModeButtons();
  updateVariantButtons();
  updateAxisSummary();
  buildControls();
  renderQualityList();

  state.suppressHash = true;
  const selectedFromHash = shellById(initialHash.get("id"));
  selectShell(selectedFromHash || state.shells[0]);
  const pcValues = (initialHash.get("pc") || "")
    .split(",")
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));
  pcValues.slice(0, 6).forEach((value, index) => setPcValue(index, value));
  const referenceFromHash = shellById(initialHash.get("ref"));
  if (referenceFromHash) {
    state.referenceShell = referenceFromHash;
    state.referenceContour = normalizedContour(referenceFromHash);
    state.referenceFingerprint = Float32Array.from(fingerprintForShell(referenceFromHash));
  }
  state.suppressHash = false;
  state.hashReady = true;
  updateCompareStatus();
  reconstruct();
  scheduleDraw();
  updateHashState();
}

init().catch((error) => {
  els.statusLine.textContent = error.message;
  if (els.missingData) els.missingData.hidden = false;
  console.error(error);
});
