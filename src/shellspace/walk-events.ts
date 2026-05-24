// @ts-nocheck

import { panViewportByWheel, selectRandomShell, setAxes, setPcValues, zoom } from './conservation-controls';
import { positionFiltersPanel, resetTraitFilters, setFiltersPanelOpen, updateFilter } from './filters';
import { exportGeneratedSvg } from './geometry-generation';
import { contourAxisCount, initialViewport, scheduleDraw } from './map-scatter';
import { renderPalette } from './palette';
import { scheduleHashUpdate } from './routing-canvas';
import { els, state } from './runtime';
import { flushTargetDragPreview, nearestShell, panViewportFromEvent, queuePointTooltip, queueTargetFromEvent, setTargetFromEvent, startViewportPan, stopViewportPan } from './selection-palette';
import { finishPendingScatterSelection, renderSourceShell, scheduleRenderNeighbors } from './source-neighbors';
import { queueStarredImageHydration, renderStarred, resetStarredDock, toggleStarredShell, updateStarredDock } from './starred';
import { handleUploadShell } from './upload-handler';

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

export function setupEvents() {
  els.search.addEventListener("input", updateFilter);
  els.filtersToggle?.addEventListener("click", () => setFiltersPanelOpen(els.filtersPanel?.hidden !== false));
  els.closeFilters?.addEventListener("click", () => setFiltersPanelOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setFiltersPanelOpen(false);
  });
  els.randomShell.addEventListener("click", selectRandomShell);
  els.resetTraitFilters?.addEventListener("click", resetTraitFilters);
  els.xAxisSelect.addEventListener("change", () => setAxes(Number(els.xAxisSelect.value), state.yAxis));
  els.yAxisSelect.addEventListener("change", () => setAxes(state.xAxis, Number(els.yAxisSelect.value)));
  els.colorModeSelect.addEventListener("change", () => {
    state.colorMode = els.colorModeSelect.value;
    scheduleDraw();
    scheduleHashUpdate();
  });
  els.meanShape.addEventListener("click", resetToMeanShape);
  els.walkPca.addEventListener("click", togglePcaWalk);
  els.starShell.addEventListener("click", toggleStarredShell);
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
