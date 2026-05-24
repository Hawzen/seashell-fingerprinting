// @ts-nocheck

import { syncPcControls, updatePcControl } from './conservation-controls';
import { drawOutline, normalizedContour, reconstructFromPc, shapeTraitsFromShell, shellColorName, updateHashChips } from './geometry-generation';
import { axisLabel, axisRange, axisValue, contourAxisCount, scatterHitPoints, scheduleDraw, screenToWorld } from './map-scatter';
import { renderPalette } from './palette';
import { resizeCanvas, scheduleHashUpdate } from './routing-canvas';
import { els, scatterCtx, state } from './runtime';
import { activePcaNeighborAxes, clearTargetNearestNeighbors, contourPcDistanceStatsToValues, similarityPercentFromStats, renderNeighborsForPc, renderSourceShell, scheduleRenderNeighbors } from './source-neighbors';
import { updateStarButton } from './starred';
import { datasetCmScale, formatNumber, physicalLocationLabel, precisePercentValue, shellAreaCm2, shellMeanRadiusCm } from './utils';
import { stopPcaWalk } from './walk-events';

export function selectShell(shell, { renderNearest = true, preferFastSource = false } = {}) {
  var _a;
  if (!shell) return;
  state.selectionRun += 1;
  state.sourceToken += 1;
  window.clearTimeout(state.sourceLoadTimer);
  window.clearTimeout(state.neighborHydrationTimer);
  state.neighborHydrationTimer = 0;
  state.neighborHydrationItems = [];
  if (state.walkingPca) stopPcaWalk(false);
  if (shell.id >= 0 && state.uploadImageUrl) {
    URL.revokeObjectURL(state.uploadImageUrl);
    state.uploadImageUrl = "";
  }
  state.selected = shell;
  if (els.sourceSpinner) els.sourceSpinner.hidden = true;
  if (els.sourceImage) {
    els.sourceImage.hidden = true;
    els.sourceImage.removeAttribute("src");
  }
  if (shell.id >= 0) state.mapShellImageIds.add(shell.id);
  state.selectedContour = normalizedContour(shell);
  state.generatedContour = state.selectedContour;
  state.generatedTraits = shapeTraitsFromShell(shell);
  state.generatedMode = "selected";
  (shell.contour_pc || []).forEach((value, index) => {
    state.pcValues[index] = value;
    updatePcControl(index, value);
  });
  els.selectedName.textContent = shell.species;
  updateHashChips();
  updateStarButton();
  els.selectedDetails.innerHTML = "";
  const details = [
    ["Fingerprint", shell.fingerprint_hash || "-"],
    ["Rarity", shell.rarity_label || "Data deficient"],
    ["Origin", physicalLocationLabel(shell)],
  ];
  if (shell.area != null && shell.image_width != null && shell.image_height != null) details.push(["Area", `${formatNumber(shellAreaCm2(shell), 2)} cm²`]);
  if (shell.mean_radius != null && shell.image_width != null && shell.image_height != null) details.push(["Mean radius", `${formatNumber(shellMeanRadiusCm(shell), 2)} cm`]);
  if (shell.color_l_mean != null) details.push(["Lightness", precisePercentValue(shell.color_l_mean)]);
  if (shell.contour_concavity != null) details.push(["Concavity", precisePercentValue(shell.contour_concavity / 0.32)]);
  if (((_a = shell.morph_traits) == null ? void 0 : _a.asymmetry) != null) details.push(["Asymmetry", precisePercentValue(shell.morph_traits.asymmetry)]);
  if (shell.image_width != null && shell.image_height != null) {
    const scale = datasetCmScale(shell);
    details.push(["Scale", `${formatNumber(scale.widthCm, 2)} x ${formatNumber(scale.heightCm, 2)} cm frame`]);
  }
  for (const [key, value] of details) {
    const dt = document.createElement("dt");
    dt.textContent = key;
    const dd = document.createElement("dd");
    dd.textContent = value;
    els.selectedDetails.append(dt, dd);
  }
  state.sourceFrame = null;
  renderSourceShell(shell, { preferFastSource });
  if (renderNearest) scheduleRenderNeighbors(shell);
  else els.neighborsList.innerHTML = "";
  drawOutline();
  renderPalette(false);
  scheduleDraw(120);
  scheduleHashUpdate();
}

export function nearestShell(screenX, screenY) {
  const size = resizeCanvas(els.scatter, scatterCtx);
  const hitCache = scatterHitPoints(size);
  let best = null;
  let bestDistance = Infinity;
  const cellX = Math.floor(screenX / hitCache.cellSize);
  const cellY = Math.floor(screenY / hitCache.cellSize);
  for (let radius = 0; radius <= 1; radius += 1) {
    for (let y = cellY - radius; y <= cellY + radius; y += 1) {
      for (let x = cellX - radius; x <= cellX + radius; x += 1) {
        if (radius && x > cellX - radius && x < cellX + radius && y > cellY - radius && y < cellY + radius) {
          continue;
        }
        const bucket = hitCache.grid.get(`${x},${y}`);
        if (!bucket) continue;
        for (const index of bucket) {
          const dx = hitCache.points[index * 2] - screenX;
          const dy = hitCache.points[index * 2 + 1] - screenY;
          const distance = dx * dx + dy * dy;
          if (distance < bestDistance) {
            bestDistance = distance;
            best = hitCache.shells[index];
          }
        }
      }
    }
    if (bestDistance <= 14 * 14) break;
  }
  return bestDistance <= 14 * 14 ? best : null;
}

export function nearestScatterNeighborItems(screenX, screenY, values, limit = 4) {
  state.screenNeighborScanCount += 1;
  const size = resizeCanvas(els.scatter, scatterCtx);
  const hitCache = scatterHitPoints(size);
  if (!hitCache.shells.length) return [];
  const cellX = Math.floor(screenX / hitCache.cellSize);
  const cellY = Math.floor(screenY / hitCache.cellSize);
  const best = [];
  const seen = new Set();
  let worstIndex = -1;
  let worstDistance = -1;
  const maxRadius = Math.ceil(Math.max(size.width, size.height) / hitCache.cellSize);
  for (let radius = 0; radius <= maxRadius; radius += 1) {
    for (let y = cellY - radius; y <= cellY + radius; y += 1) {
      for (let x = cellX - radius; x <= cellX + radius; x += 1) {
        if (radius && x > cellX - radius && x < cellX + radius && y > cellY - radius && y < cellY + radius) continue;
        const bucket = hitCache.grid.get(`${x},${y}`);
        if (!bucket) continue;
        for (const index of bucket) {
          if (seen.has(index)) continue;
          seen.add(index);
          const dx = hitCache.points[index * 2] - screenX;
          const dy = hitCache.points[index * 2 + 1] - screenY;
          const screenDistance = dx * dx + dy * dy;
          if (best.length < limit) {
            best.push({ screenDistance, shell: hitCache.shells[index] });
            if (screenDistance > worstDistance) {
              worstDistance = screenDistance;
              worstIndex = best.length - 1;
            }
            continue;
          }
          if (screenDistance >= worstDistance) continue;
          best[worstIndex] = { screenDistance, shell: hitCache.shells[index] };
          worstDistance = -1;
          for (let bestIndex = 0; bestIndex < best.length; bestIndex += 1) {
            if (best[bestIndex].screenDistance > worstDistance) {
              worstDistance = best[bestIndex].screenDistance;
              worstIndex = bestIndex;
            }
          }
        }
      }
    }
    if (best.length >= limit && radius >= 2) break;
  }
  best.sort((a, b) => a.screenDistance - b.screenDistance);
  return best.map((item) => {
    const stats = contourPcDistanceStatsToValues(item.shell, values, activePcaNeighborAxes());
    return {
      distance: Math.sqrt(stats.rawSq),
      similarity: similarityPercentFromStats(stats),
      shell: item.shell,
    };
  });
}

export function clampPcValue(axisIndex, value) {
  const range = axisRange(axisIndex);
  if (!range) return value;
  const span = Math.max(0.001, range.p99 - range.p01);
  const lower = Math.max(Number.isFinite(range.min) ? range.min : range.p01, range.p01 - span * 0.75);
  const upper = Math.min(Number.isFinite(range.max) ? range.max : range.p99, range.p99 + span * 0.75);
  return Math.max(lower, Math.min(upper, value));
}

export function assignPointAxes(values, point) {
  if (state.xAxis >= 0 && state.xAxis < values.length) values[state.xAxis] = point.x;
  if (state.yAxis >= 0 && state.yAxis < values.length && state.yAxis !== state.xAxis) {
    values[state.yAxis] = point.y;
  }
}

export function fillHiddenPcValuesFromNeighbors(values, neighborItems) {
  const axes = activePcaNeighborAxes();
  const locked = new Set(axes);
  const neighbors = (neighborItems || [])
    .map((item) => ({
      distance: contourPcDistanceStatsToValues(item.shell, values, axes).normalizedSq,
      shell: item.shell,
    }))
    .sort((a, b) => a.distance - b.distance);
  if (!neighbors.length) return values;

  if (neighbors[0].distance < 1e-10) {
    const source = neighbors[0].shell.contour_pc || [];
    for (let index = 0; index < values.length; index += 1) {
      if (!locked.has(index)) values[index] = source[index] || 0;
    }
    return values;
  }

  for (let pc = 0; pc < values.length; pc += 1) {
    if (locked.has(pc)) continue;
    let total = 0;
    let weightSum = 0;
    for (const neighbor of neighbors) {
      const source = neighbor.shell.contour_pc || [];
      if (pc >= source.length) continue;
      const weight = 1 / Math.max(neighbor.distance, 1e-6);
      total += (source[pc] || 0) * weight;
      weightSum += weight;
    }
    values[pc] = weightSum ? total / weightSum : 0;
  }
  return values;
}

export function pcValuesFromPoint(point, neighborItems = null) {
  const count = Math.max(state.model?.contour_component_count || 0, state.pcValues.length, contourAxisCount());
  const values = Array.from({ length: count }, () => 0);
  assignPointAxes(values, point);
  return fillHiddenPcValuesFromNeighbors(values, neighborItems);
}

export function applyPcValues(values, { updateControls = true } = {}) {
  values.forEach((value, index) => {
    state.pcValues[index] = value;
    if (updateControls) updatePcControl(index, value);
  });
  reconstructFromPc();
}

export function setTargetFromEvent(event, { updateControls = false } = {}) {
  const rect = els.scatter.getBoundingClientRect();
  const size = resizeCanvas(els.scatter, scatterCtx);
  const screenX = event.clientX - rect.left;
  const screenY = event.clientY - rect.top;
  const point = screenToWorld(screenX, screenY, size);
  const baseValues = pcValuesFromPoint(point);
  const fastNeighbors = nearestScatterNeighborItems(screenX, screenY, baseValues, 8);
  const values = pcValuesFromPoint(point, fastNeighbors);
  applyPcValues(values, { updateControls });
  if (!updateControls) syncPcControls(values);
  renderNeighborsForPc(values, fastNeighbors.slice(0, 4));
  scheduleDraw();
  scheduleHashUpdate();
}

export function queueTargetFromEvent(event) {
  state.targetEvent = {
    clientX: event.clientX,
    clientY: event.clientY,
  };
  if (state.targetFrame) return;
  state.targetFrame = window.requestAnimationFrame(() => {
    state.targetFrame = 0;
    const next = state.targetEvent;
    if (!next) return;
    setTargetFromEvent(next);
  });
}

export function flushTargetDragPreview() {
  if (state.targetFrame) {
    window.cancelAnimationFrame(state.targetFrame);
    state.targetFrame = 0;
  }
  const next = state.targetEvent;
  state.targetEvent = null;
  if (next && state.targetDragStart?.active) setTargetFromEvent(next);
  syncPcControls();
}

export function startViewportPan(event) {
  const rect = els.scatter.getBoundingClientRect();
  state.panningViewport = {
    pointerId: event.pointerId,
    startX: event.clientX - rect.left,
    startY: event.clientY - rect.top,
    viewport: { ...state.viewport },
  };
  state.draggingTarget = false;
  state.targetDragStart = null;
  state.targetEvent = null;
  state.pendingSelectShell = null;
  clearTargetNearestNeighbors();
  if (state.targetFrame) {
    window.cancelAnimationFrame(state.targetFrame);
    state.targetFrame = 0;
  }
  state.holdingNearest = false;
  els.scatter.classList.add("is-panning");
  els.pointTooltip.hidden = true;
}

export function panViewportFromEvent(event) {
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

export function stopViewportPan() {
  if (!state.panningViewport) return;
  state.panningViewport = null;
  els.scatter.classList.remove("is-panning");
  scheduleHashUpdate();
}

export function showPointTooltip(event, shell) {
  if (!shell) {
    els.pointTooltip.hidden = true;
    return;
  }
  const rect = els.scatter.getBoundingClientRect();
  const strong = document.createElement("strong");
  strong.textContent = shell.species;
  const tooltipParts = [
    strong,
    document.createTextNode(shell.file),
    document.createElement("br"),
    document.createTextNode(`${shell.specimen_label || shell.specimen || "Unknown specimen"}, ${shell.view_label || shell.view || "Unknown view"}`),
    document.createElement("br"),
    document.createTextNode(`${axisLabel(state.xAxis)} ${formatNumber(axisValue(shell, state.xAxis))}, ${axisLabel(state.yAxis)} ${formatNumber(axisValue(shell, state.yAxis))}`),
  ];
  if (shell.color_l_mean != null) {
    tooltipParts.push(document.createElement("br"), document.createTextNode(`${shellColorName(shell)}, lightness ${formatNumber(shell.color_l_mean, 3)}`));
  }
  els.pointTooltip.replaceChildren(...tooltipParts);
  els.pointTooltip.style.left = `${Math.min(Math.max(8, rect.width - 248), Math.max(8, event.clientX - rect.left + 14))}px`;
  els.pointTooltip.style.top = `${Math.min(Math.max(8, rect.height - 84), Math.max(8, event.clientY - rect.top + 14))}px`;
  els.pointTooltip.hidden = false;
}

export function queuePointTooltip(event) {
  state.tooltipEvent = {
    clientX: event.clientX,
    clientY: event.clientY,
  };
  if (state.tooltipFrame) return;
  state.tooltipFrame = requestAnimationFrame(() => {
    state.tooltipFrame = 0;
    const now = performance.now();
    if (now - state.tooltipLastAt < 60) return;
    state.tooltipLastAt = now;
    const next = state.tooltipEvent;
    if (!next) return;
    const rect = els.scatter.getBoundingClientRect();
    showPointTooltip(next, nearestShell(next.clientX - rect.left, next.clientY - rect.top));
  });
}
