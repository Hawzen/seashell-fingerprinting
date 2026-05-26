// @ts-nocheck

import { resizeCanvas } from './routing-canvas';
import { colorModeDefs } from './constants';
import { els, scatterCtx, state } from './runtime';
import { getCachedShellCutoutImage } from './shell-cutouts';
import { clamp01, hslToRgba } from './utils';

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

export function shellHasColorModeData(shell, mode) {
  if (mode === "species") return true;
  if (mode === "locality") return isKnownText(shell.location_key);
  if (mode === "conservation") return isKnownText(conservationStatus(shell));
  if (mode === "shell") return hasNumber(shell.color_r_mean) && hasNumber(shell.color_g_mean) && hasNumber(shell.color_b_mean);
  if (mode === "pattern") return hasNumber(shell.color_pattern_strength);
  if (mode === "lightness") return hasNumber(shell.color_l_mean);
  if (mode === "roughness") return hasNumber(shell.morph_traits?.roughness);
  if (mode === "rarity") return isKnownText(shell.rarity_label);
  if (mode === "concavity") return hasNumber(shell.contour_concavity);
  return false;
}

export function availableColorModes() {
  return colorModeDefs.filter((mode) => state.shells.some((shell) => shellHasColorModeData(shell, mode.key)));
}

export function buildColorModeOptions() {
  if (!els.colorModeSelect) return;
  const modes = availableColorModes();
  els.colorModeSelect.innerHTML = "";
  for (const mode of modes) {
    const option = document.createElement("option");
    option.value = mode.key;
    option.textContent = mode.label;
    els.colorModeSelect.append(option);
  }
  if (!modes.some((mode) => mode.key === state.colorMode)) {
    state.colorMode = modes.some((mode) => mode.key === "roughness") ? "roughness" : modes[0]?.key || "species";
  }
  els.colorModeSelect.value = state.colorMode;
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
  if (mode === "locality") {
    if (shell.location_key === "unknown") return [96, 108, 106, 158];
    return speciesColorRgba(shell.location_key || "unknown", 0.66);
  }
  if (mode === "conservation") return conservationRgba(shell);
  if (mode === "shell") return shellRgba(shell);
  if (mode === "lightness") {
    const t = clamp01(shell.color_l_mean ?? 0.5);
    return hslToRgba(48, 0.24, (24 + t * 54) / 100);
  }
  if (mode === "roughness") {
    const t = clamp01(shell.morph_traits?.roughness ?? 0);
    return hslToRgba(178 - t * 150, 0.58, (34 + t * 16) / 100);
  }
  if (mode === "rarity") return rarityRgba(shell);
  if (mode === "pattern") {
    const t = clamp01((shell.color_pattern_strength || 0) / 0.22);
    return hslToRgba(204 - t * 162, (34 + t * 36) / 100, (30 + t * 18) / 100);
  }
  if (mode === "concavity") {
    const t = clamp01((shell.contour_concavity || 0) / 0.32);
    return hslToRgba(320 - t * 185, 0.56, (35 + t * 11) / 100);
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
  if (state.scatterPointCache?.key === key && state.scatterPointCache.shells === state.filtered) {
    return state.scatterPointCache;
  }
  const shells = state.filtered;
  const points = new Float32Array(shells.length * 2);
  for (let index = 0; index < shells.length; index += 1) {
    const point = worldToScreen(axisValue(shells[index], state.xAxis), axisValue(shells[index], state.yAxis), size);
    points[index * 2] = point.x;
    points[index * 2 + 1] = point.y;
  }
  state.scatterPointCache = { key, shells, points };
  state.scatterHitCache = null;
  return state.scatterPointCache;
}

export function scatterHitPoints(size) {
  const pointCache = scatterScreenPoints(size);
  const key = pointCache.key;
  if (state.scatterHitCache?.key === key && state.scatterHitCache.shells === state.filtered) {
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
  state.scatterHitCache = { key, shells, points, grid, cellSize };
  return state.scatterHitCache;
}
