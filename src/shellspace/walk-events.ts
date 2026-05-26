// @ts-nocheck

import { panViewportByWheel, selectRandomShell, setAxes, setPcValues, zoom } from './conservation-controls';
import { starStorageKey } from './constants';
import { projectFingerprintToPca } from './data-pack';
import { buildTraitFilters, positionFiltersPanel, resetTraitFilters, setFiltersPanelOpen, updateFilter } from './filters';
import { drawOutline, exportGeneratedSvg } from './geometry-generation';
import { contourAxisCount, initialViewport, renderColorLegend, scheduleDraw } from './map-scatter';
import { renderPalette } from './palette';
import { closePcaGuide, openPcaGuide, pcaAxisNamesKey } from './pca-guide';
import { scheduleHashUpdate } from './routing-canvas';
import { els, state } from './runtime';
import { flushTargetDragPreview, nearestShell, panViewportFromEvent, queuePointTooltip, queueTargetFromEvent, setSourceInspectOpen, setTargetFromEvent, startViewportPan, stopViewportPan } from './selection-palette';
import { clearPersistentCutoutCache } from './shell-cutouts';
import { finishPendingScatterSelection, renderNeighborsForPc, renderSourceShell, scheduleRenderNeighbors } from './source-neighbors';
import { queueStarredImageHydration, renderStarred, resetStarredDock, toggleStarredShell, updateStarredDock } from './starred';
import { handleUploadShell } from './upload-handler';

const showPoppedShellsKey = "shellspace-show-popped-shells";
let drawShellMode = false;
let drawingShell = false;
let drawnShellPoints = [];

function setDrawShellMode(open) {
  drawShellMode = Boolean(open);
  drawingShell = false;
  drawnShellPoints = [];
  els.drawProjectedShell?.setAttribute("aria-pressed", drawShellMode ? "true" : "false");
  els.outline?.parentElement?.classList.toggle("is-drawing", drawShellMode);
}

function outlinePoint(event) {
  const rect = els.outline.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / Math.max(1, rect.width)) * els.outline.width,
    y: ((event.clientY - rect.top) / Math.max(1, rect.height)) * els.outline.height,
  };
}

function drawShellPreview() {
  drawOutline();
  if (drawnShellPoints.length < 2) return;
  const ctx = els.outline.getContext("2d");
  ctx.save();
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#c65d4b";
  ctx.beginPath();
  ctx.moveTo(drawnShellPoints[0].x, drawnShellPoints[0].y);
  for (const point of drawnShellPoints.slice(1)) ctx.lineTo(point.x, point.y);
  ctx.stroke();
  ctx.restore();
}

function resampleDrawnShell(points, samples = 256) {
  if (points.length < 8) return null;
  const closed = [...points, points[0]];
  const lengths = [0];
  for (let index = 1; index < closed.length; index += 1) {
    const previous = closed[index - 1];
    const current = closed[index];
    lengths[index] = lengths[index - 1] + Math.hypot(current.x - previous.x, current.y - previous.y);
  }
  const perimeter = lengths.at(-1) || 0;
  if (perimeter <= 1e-6) return null;

  const contour = new Float32Array(samples * 2);
  let segment = 1;
  for (let sample = 0; sample < samples; sample += 1) {
    const target = (sample / samples) * perimeter;
    while (segment < lengths.length - 1 && lengths[segment] < target) segment += 1;
    const start = closed[segment - 1];
    const end = closed[segment];
    const span = Math.max(1e-6, lengths[segment] - lengths[segment - 1]);
    const t = (target - lengths[segment - 1]) / span;
    contour[sample * 2] = start.x + (end.x - start.x) * t;
    contour[sample * 2 + 1] = start.y + (end.y - start.y) * t;
  }

  let centerX = 0;
  let centerY = 0;
  for (let index = 0; index < samples; index += 1) {
    centerX += contour[index * 2];
    centerY += contour[index * 2 + 1];
  }
  centerX /= samples;
  centerY /= samples;
  let scale = 0;
  for (let index = 0; index < samples; index += 1) {
    contour[index * 2] -= centerX;
    contour[index * 2 + 1] -= centerY;
    scale += contour[index * 2] ** 2 + contour[index * 2 + 1] ** 2;
  }
  scale = Math.sqrt(scale / samples);
  if (scale <= 1e-6) return null;
  for (let index = 0; index < contour.length; index += 1) contour[index] /= scale;
  return contour;
}

function fingerprintFromContour(contour, harmonics = 32) {
  const samples = Math.floor(contour.length / 2);
  const fingerprint = new Float32Array(harmonics * 4);
  for (let harmonic = 1; harmonic <= harmonics; harmonic += 1) {
    let posR = 0;
    let posI = 0;
    let negR = 0;
    let negI = 0;
    for (let point = 0; point < samples; point += 1) {
      const x = contour[point * 2] || 0;
      const y = contour[point * 2 + 1] || 0;
      const angle = (Math.PI * 2 * harmonic * point) / samples;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      posR += x * cos + y * sin;
      posI += y * cos - x * sin;
      negR += x * cos - y * sin;
      negI += y * cos + x * sin;
    }
    const offset = (harmonic - 1) * 4;
    fingerprint[offset] = posR / samples;
    fingerprint[offset + 1] = posI / samples;
    fingerprint[offset + 2] = negR / samples;
    fingerprint[offset + 3] = negI / samples;
  }
  return fingerprint;
}

function projectDrawnShell() {
  const contour = resampleDrawnShell(drawnShellPoints, state.contourPoints || 256);
  if (!contour) return;
  const fingerprint = fingerprintFromContour(contour, Math.floor((state.model?.fingerprint_mean?.length || 128) / 4));
  const values = projectFingerprintToPca(fingerprint);
  if (!values.length) return;
  setPcValues(values);
  renderNeighborsForPc(values);
  setDrawShellMode(false);
}

export function stopPcaWalk(updateHash = true) {
  state.walkingPca = false;
  window.cancelAnimationFrame(state.walkFrame);
  els.walkPca.textContent = "Walk";
  els.walkPca.setAttribute("aria-pressed", "false");
  if (updateHash) scheduleHashUpdate();
}

export function stepPcaWalk(timestamp) {
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

export function togglePcaWalk() {
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

export function resetToMeanShape() {
  stopPcaWalk(false);
  setPcValues(Array.from({ length: state.model.contour_component_count || contourAxisCount() }, () => 0));
}

export function setSettingsPanelOpen(open) {
  if (!els.settingsPanel || !els.settingsToggle) return;
  els.settingsPanel.hidden = !open;
  els.settingsToggle.setAttribute("aria-expanded", open ? "true" : "false");
}

export function clearAllLocalData() {
  if (!window.confirm("Clear saved shell images, starred shells, and local settings?")) return;
  clearPersistentCutoutCache();
  try {
    localStorage.removeItem(starStorageKey);
    localStorage.removeItem(showPoppedShellsKey);
    localStorage.removeItem(pcaAxisNamesKey);
  } catch (_error) {
    // Best effort.
  }
  window.location.hash = "";
  window.location.reload();
}

export function loadLocalSettings() {
  let showPoppedShells = true;
  try {
    showPoppedShells = localStorage.getItem(showPoppedShellsKey) !== "false";
  } catch (_error) {
    showPoppedShells = true;
  }
  state.showPoppedShells = showPoppedShells;
  if (els.showPoppedShells) els.showPoppedShells.checked = showPoppedShells;
}

export function setupEvents() {
  loadLocalSettings();
  els.search.addEventListener("input", updateFilter);
  els.filtersToggle?.addEventListener("click", () => setFiltersPanelOpen(els.filtersPanel?.hidden !== false));
  els.pcaGuideOpen?.addEventListener("click", openPcaGuide);
  els.pcaGuideClose?.addEventListener("click", closePcaGuide);
  els.pcaGuideModal?.querySelector(".pca-guide-backdrop")?.addEventListener("click", closePcaGuide);
  els.closeFilters?.addEventListener("click", () => setFiltersPanelOpen(false));
  els.settingsToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    setSettingsPanelOpen(els.settingsPanel?.hidden !== false);
  });
  els.settingsPanel?.addEventListener("click", (event) => event.stopPropagation());
  els.clearAllData?.addEventListener("click", clearAllLocalData);
  els.showPoppedShells?.addEventListener("change", () => {
    state.showPoppedShells = Boolean(els.showPoppedShells.checked);
    try {
      localStorage.setItem(showPoppedShellsKey, state.showPoppedShells ? "true" : "false");
    } catch (_error) {
      // Best effort.
    }
    scheduleDraw();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setFiltersPanelOpen(false);
      setSettingsPanelOpen(false);
      closePcaGuide();
    }
  });
  document.addEventListener("click", () => {
    setSettingsPanelOpen(false);
  });
  els.randomShell.addEventListener("click", selectRandomShell);
  els.resetTraitFilters?.addEventListener("click", resetTraitFilters);
  els.xAxisSelect.addEventListener("change", () => setAxes(Number(els.xAxisSelect.value), state.yAxis));
  els.yAxisSelect.addEventListener("change", () => setAxes(state.xAxis, Number(els.yAxisSelect.value)));
  els.colorModeSelect.addEventListener("change", () => {
    state.colorMode = els.colorModeSelect.value;
    renderColorLegend();
    scheduleDraw();
    scheduleHashUpdate();
  });
  window.addEventListener("shellspace:color-filter-changed", () => {
    buildTraitFilters();
    updateFilter();
  });
  els.meanShape.addEventListener("click", resetToMeanShape);
  els.walkPca.addEventListener("click", togglePcaWalk);
  els.starShell.addEventListener("click", toggleStarredShell);
  els.sourceInspectToggle?.addEventListener("click", () => setSourceInspectOpen(!state.sourceInspectOpen));
  els.drawProjectedShell?.addEventListener("click", () => setDrawShellMode(!drawShellMode));
  els.outline.addEventListener("pointerdown", (event) => {
    if (!drawShellMode || event.button !== 0) return;
    event.preventDefault();
    drawingShell = true;
    drawnShellPoints = [outlinePoint(event)];
    els.outline.setPointerCapture(event.pointerId);
    drawShellPreview();
  });
  els.outline.addEventListener("pointermove", (event) => {
    if (!drawingShell) return;
    event.preventDefault();
    const point = outlinePoint(event);
    const last = drawnShellPoints.at(-1);
    if (last && Math.hypot(point.x - last.x, point.y - last.y) < 2.5) return;
    drawnShellPoints.push(point);
    drawShellPreview();
  });
  for (const eventName of ["pointerup", "pointercancel"]) {
    els.outline.addEventListener(eventName, (event) => {
      if (!drawingShell) return;
      event.preventDefault();
      try {
        els.outline.releasePointerCapture(event.pointerId);
      } catch (_error) {
        // Best effort.
      }
      drawingShell = false;
      if (eventName === "pointerup") projectDrawnShell();
      else drawOutline();
    });
  }
  els.uploadShell.addEventListener("click", () => els.uploadInput.click());
  els.uploadInput.addEventListener("change", handleUploadShell);
  els.exportSvg.addEventListener("click", exportGeneratedSvg);
  els.starredBand?.addEventListener("pointermove", updateStarredDock);
  els.starredBand?.addEventListener("pointerleave", () => {
    resetStarredDock();
    queueStarredImageHydration(1200);
  });
  els.starredBand?.addEventListener("pointercancel", resetStarredDock);
  els.zoomIn.addEventListener("click", () => zoom(0.72));
  els.zoomOut.addEventListener("click", () => zoom(1.38));
  els.resetView.addEventListener("click", () => {
    state.viewport = initialViewport(state.xAxis, state.yAxis);
    scheduleDraw();
  });

  els.scatter.addEventListener("wheel", (event) => {
    event.preventDefault();
    queueStarredImageHydration(1800);
    if (event.shiftKey) {
      const rect = els.scatter.getBoundingClientRect();
      zoom(event.deltaY > 0 ? 1.12 : 0.88, {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
      return;
    }
    panViewportByWheel(event.deltaX, event.deltaY);
  });

  els.scatter.addEventListener("pointerdown", (event) => {
    if (event.button === 1) {
      event.preventDefault();
      els.scatter.setPointerCapture(event.pointerId);
      startViewportPan(event);
      return;
    }
    if (event.button !== 0) return;
    state.holdingNearest = true;
    const rect = els.scatter.getBoundingClientRect();
    const shell = nearestShell(event.clientX - rect.left, event.clientY - rect.top);
    state.pendingSelectShell = shell;
    if (shell) scheduleRenderNeighbors(shell, 16);
    else {
      state.draggingTarget = true;
      state.targetDragStart = {
        pointerId: event.pointerId,
        clientX: event.clientX,
        clientY: event.clientY,
        active: false,
        ignoreRealShells: true,
      };
      els.pointTooltip.hidden = true;
    }
  });

  els.scatter.addEventListener("pointermove", (event) => {
    if (state.panningViewport) {
      event.preventDefault();
      panViewportFromEvent(event);
      return;
    }
    if (state.draggingTarget) {
      const start = state.targetDragStart;
      if (start && !start.active) {
        const distance = Math.hypot(event.clientX - start.clientX, event.clientY - start.clientY);
        if (distance < 4) return;
        start.active = true;
      }
      queueTargetFromEvent(event);
      els.pointTooltip.hidden = true;
      return;
    }
    if (state.holdingNearest) {
      els.pointTooltip.hidden = true;
      return;
    }
    queuePointTooltip(event);
  });

  els.scatter.addEventListener("mousedown", (event) => {
    if (event.button !== 0 || state.draggingTarget || state.holdingNearest || state.panningViewport) return;
    state.holdingNearest = true;
    const rect = els.scatter.getBoundingClientRect();
    const shell = nearestShell(event.clientX - rect.left, event.clientY - rect.top);
    state.pendingSelectShell = shell;
    if (shell) scheduleRenderNeighbors(shell, 16);
    else {
      state.draggingTarget = true;
      state.targetDragStart = {
        pointerId: -1,
        clientX: event.clientX,
        clientY: event.clientY,
        active: false,
        ignoreRealShells: true,
      };
      els.pointTooltip.hidden = true;
    }
  });

  els.scatter.addEventListener("mousemove", (event) => {
    if (!state.draggingTarget || (event.buttons & 1) !== 1) return;
    const start = state.targetDragStart;
    if (start && !start.active) {
      const distance = Math.hypot(event.clientX - start.clientX, event.clientY - start.clientY);
      if (distance < 4) return;
      start.active = true;
    }
    queueTargetFromEvent(event);
    els.pointTooltip.hidden = true;
  });

  for (const eventName of ["pointerup", "pointercancel"]) {
    els.scatter.addEventListener(eventName, (event) => {
      const shouldCommitTargetClick = eventName === "pointerup" && state.draggingTarget && !state.targetDragStart?.active;
      flushTargetDragPreview();
      if (shouldCommitTargetClick) setTargetFromEvent(event);
      const pendingSelect = eventName === "pointerup";
      state.holdingNearest = false;
      state.draggingTarget = false;
      state.targetDragStart = null;
      state.targetEvent = null;
      stopViewportPan();
      if (pendingSelect) finishPendingScatterSelection();
      else state.pendingSelectShell = null;
      try {
        if (els.scatter.hasPointerCapture?.(event.pointerId)) els.scatter.releasePointerCapture(event.pointerId);
      } catch (error) {
        // Pointer capture can already be gone after browser-level cancellation.
      }
      if (eventName !== "pointerup") els.pointTooltip.hidden = true;
    });
  }
  window.addEventListener("mouseup", (event) => {
    if (!state.holdingNearest && !state.draggingTarget) return;
    const shouldCommitTargetClick = state.draggingTarget && !state.targetDragStart?.active;
    flushTargetDragPreview();
    if (shouldCommitTargetClick) setTargetFromEvent(event);
    state.holdingNearest = false;
    state.draggingTarget = false;
    state.targetDragStart = null;
    state.targetEvent = null;
    finishPendingScatterSelection();
  });
  els.scatter.addEventListener("pointerleave", () => {
    if (state.draggingTarget || state.panningViewport) return;
    els.pointTooltip.hidden = true;
  });
  els.scatter.addEventListener("auxclick", (event) => {
    if (event.button === 1) event.preventDefault();
  });

  window.addEventListener("resize", () => {
    scheduleDraw();
    renderSourceShell(state.selected);
    renderPalette();
    renderStarred();
    positionFiltersPanel();
  });
  window.addEventListener("scroll", () => {
    positionFiltersPanel();
    queueStarredImageHydration(1800);
  }, true);
  window.addEventListener("wheel", () => queueStarredImageHydration(1800), { passive: true, capture: true });
}
