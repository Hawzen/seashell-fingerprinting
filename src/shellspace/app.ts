// @ts-nocheck

import { colorModes } from './constants';
import { els, initCanvasContexts, state } from './runtime';
import { buildAxisControls, buildPcControls, lookupConservationStatus, renderPcaInterpretation, setPcValues, shellById } from './conservation-controls';
import { loadNewFingerprintPack } from './data-pack';
import { buildTraitFilters } from './filters';
import { parseHashState, updateHashState } from './routing-canvas';
import { buildDerivedShellData, setLoading } from './utils';
import { primeSurpriseQueue } from './images-loading';
import { axisOptionCount, buildColorModeOptions, conservationStatus, initialViewport, scheduleDraw } from './map-scatter';
import { loadStarred, renderStarred, warmStarredCutoutCache } from './starred';
import { renderPalette } from './palette';
import { loadPcaAxisNames } from './pca-guide';
import { selectShell } from './selection-palette';
import { hydratePersistentCutoutCache } from './shell-cutouts';
import { setupEvents } from './walk-events';

window.shellspacePerf = {
  selectedId: () => state.selected?.id ?? null,
  neighborCacheSize: () => state.neighborCache.size,
  surpriseQueueSize: () => state.surpriseQueue.length,
  surpriseReadyCount: () => state.surpriseQueue.length,
  scatterPointCount: () => state.scatterPointCache?.shells?.length || 0,
  starredHydratedCount: () => state.starredHydratedCount,
  screenNeighborScanCount: () => state.screenNeighborScanCount,
  resetScreenNeighborScanCount: () => {
    state.screenNeighborScanCount = 0;
  },
  sourceMode: () => state.sourceMode,
  filteredCount: () => state.filtered.length,
  diametricPairs: () => state.model?.contour_pca_diametric_pairs || [],
  lookupConservationStatus,
  conservationStatusForSelected: () => conservationStatus(state.selected),
  selectSpecies: (species) => {
    const shell = state.shells.find((item) => item.species === species);
    if (shell) selectShell(shell);
    return shell?.id ?? null;
  },
};

async function init() {
  setupEvents();
  setLoading('Opening fingerprint data');
  const { model, shells } = await loadNewFingerprintPack();

  state.model = model;
  state.shells = shells;
  state.shellById = new Map(state.shells.map((shell) => [shell.id, shell]));
  loadPcaAxisNames();
  buildDerivedShellData(state.shells, null, null);
  buildTraitFilters();
  state.filtered = state.shells;
  state.contours = null;
  state.contourPoints = model.contour_points || 0;
  state.contourScale = model.contour_scale || 1;

  const statusText = model.species_count
    ? `${model.processed_count.toLocaleString()} shells, ${model.species_count.toLocaleString()} species`
    : `${model.processed_count.toLocaleString()} shells`;
  els.statusLine.textContent = statusText;

  const initialHash = parseHashState();
  if (colorModes.includes(initialHash.get('color'))) state.colorMode = initialHash.get('color');
  buildColorModeOptions();
  const axisCount = axisOptionCount();
  const rawX = initialHash.get('x');
  const rawY = initialHash.get('y');
  const x = rawX == null ? NaN : Number(rawX);
  const y = rawY == null ? NaN : Number(rawY);
  if (Number.isInteger(x) && x >= 0 && x < axisCount) state.xAxis = x;
  if (Number.isInteger(y) && y >= 0 && y < axisCount) state.yAxis = y;

  state.viewport = initialViewport(state.xAxis, state.yAxis);
  buildAxisControls();
  buildPcControls();
  buildColorModeOptions();
  renderPcaInterpretation();
  loadStarred();
  hydratePersistentCutoutCache(state.shells);
  if (state.starredIds.length) {
    await warmStarredCutoutCache({
      onProgress: ({ loaded, total }) => {
        if (total > 0) setLoading(`Caching starred shells ${Math.min(loaded + 1, total)} / ${total}`);
      },
    });
  }
  els.statusLine.textContent = statusText;

  state.suppressHash = true;
  const selected = shellById(initialHash.get('id')) || state.shells[0];
  selectShell(selected, { renderNearest: false });
  const pcValues = (initialHash.get('pc') || '')
    .split(',')
    .filter((value) => value.trim() !== '')
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));
  if (pcValues.length) setPcValues(pcValues.slice(0, 6), false);
  state.suppressHash = false;
  state.hashReady = true;
  renderStarred();
  renderPalette();
  scheduleDraw();
  updateHashState();
  setLoading('', false);
  primeSurpriseQueue();
}

export function startShellspace() {
  initCanvasContexts();
  init().catch((error) => {
    els.statusLine.textContent = error.message;
    setLoading('', false);
    if (els.missingData) els.missingData.hidden = false;
    console.error(error);
  });
}
