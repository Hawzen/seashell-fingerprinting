// @ts-nocheck

import { centerViewportOnShell } from './conservation-controls';
import { contourPath, maxContourRadius, normalizedContour } from './geometry-generation';
import { renderPalette } from './palette';
import { els, state } from './runtime';
import { selectShell } from './selection-palette';
import { cutShellWithPython, restoreCutoutStatus, setCachedShellCutoutImage, setShellCutoutImage } from './shell-cutouts';
import { formatNumber } from './utils';

const NEIGHBOR_IMAGE_IDLE_DELAY = 1000;
const SOURCE_IMAGE_PIPELINE_DELAY = 250;

export function setSourceImageUrl(url, shell, alt = "") {
  els.sourceImage.hidden = false;
  if (els.sourceSpinner) els.sourceSpinner.hidden = false;
  els.sourceImage.dataset.fallbackApplied = "false";
  els.sourceImage.alt = alt;
  els.sourceImage.onerror = () => {
    els.sourceImage.removeAttribute("src");
    if (els.sourceSpinner) els.sourceSpinner.hidden = true;
  };
  els.sourceImage.onload = () => {
    if (els.sourceSpinner) els.sourceSpinner.hidden = true;
    renderPalette(false);
  };
  els.sourceImage.src = url;
}

export async function renderSourceShell(shell, { preferFastSource = false } = {}) {
  if (!shell) return;
  const token = ++state.sourceToken;
  const run = state.selectionRun;
  window.clearTimeout(state.sourceLoadTimer);
  if (els.sourceSpinner) els.sourceSpinner.hidden = false;
  if (state.uploadImageUrl && shell.id < 0) {
    setSourceImageUrl(state.uploadImageUrl, shell, shell.species);
    return;
  }
  els.sourceImage.hidden = true;
  state.sourceFrame = null;
  state.sourceMode = "python";
  renderPalette(false);
  const statusBeforeCut = els.statusLine.textContent;
  state.sourceLoadTimer = window.setTimeout(async () => {
    if (run !== state.selectionRun || token !== state.sourceToken || state.selected !== shell) return;
    const cut = await cutShellWithPython(shell, { priority: 10 });
    restoreCutoutStatus(statusBeforeCut);
    if (run !== state.selectionRun || token !== state.sourceToken || state.selected !== shell) return;
    if (cut?.imageUrl) setSourceImageUrl(cut.imageUrl, shell, shell.species);
    else if (els.sourceSpinner) els.sourceSpinner.hidden = true;
  }, preferFastSource ? 80 : SOURCE_IMAGE_PIPELINE_DELAY);
}

export function contourPcDistanceSq(shell, candidate) {
  return contourPcDistanceStatsToValues(candidate, shell.contour_pc || []).rawSq;
}

export function activePcaNeighborAxes() {
  const axes = [];
  for (const axis of [state.xAxis, state.yAxis]) {
    if (Number.isInteger(axis) && axis >= 0 && !axes.includes(axis)) axes.push(axis);
  }
  return axes.length ? axes : [0, 1];
}

export function contourPcDistanceSqToValues(candidate, values, axes = null) {
  return contourPcDistanceStatsToValues(candidate, values, axes).rawSq;
}

export function pcaRangeSpan(axis) {
  const range = state.model?.contour_pca_ranges?.[axis];
  if (!range) return 1;
  const pSpan = Math.abs((range.p99 ?? 0) - (range.p01 ?? 0));
  const fullSpan = Math.abs((range.max ?? 0) - (range.min ?? 0));
  return Math.max(0.001, pSpan || fullSpan || 1);
}

export function contourPcDistanceStatsToValues(candidate, values, axes = null) {
  let distance = 0;
  let normalizedDistance = 0;
  const candidatePc = candidate.contour_pc || [];
  const dimensions = axes?.length
    ? axes
    : Array.from({ length: Math.min(4, candidatePc.length, values.length) }, (_, index) => index);
  let used = 0;
  for (const axis of dimensions) {
    if (axis >= candidatePc.length || axis >= values.length) continue;
    const delta = (candidatePc[axis] || 0) - (values[axis] || 0);
    distance += delta ** 2;
    normalizedDistance += (delta / pcaRangeSpan(axis)) ** 2;
    used += 1;
  }
  return {
    rawSq: distance,
    normalizedSq: normalizedDistance,
    dimensions: used,
  };
}

export function similarityPercentFromStats(stats) {
  if (!stats.dimensions) return 0;
  const normalizedDistance = Math.sqrt(stats.normalizedSq);
  const maxDistance = Math.sqrt(stats.dimensions);
  return Math.max(0, Math.min(100, (1 - normalizedDistance / maxDistance) * 100));
}

export function nearestContourNeighborsForPc(values, { axes = null, limit = 4, excludeId = null } = {}) {
  var _a;
  const candidates = state.filtered.length ? state.filtered : state.shells;
  const best = [];
  let worstIndex = -1;
  let worstDistance = -1;
  for (const candidate of candidates) {
    if (candidate.id === excludeId || !((_a = candidate.contour_pc) == null ? void 0 : _a.length)) continue;
    const stats = contourPcDistanceStatsToValues(candidate, values, axes);
    const distance = stats.normalizedSq;
    if (best.length < limit) {
      best.push({ distance, stats, shell: candidate });
      if (distance > worstDistance) {
        worstDistance = distance;
        worstIndex = best.length - 1;
      }
      continue;
    }
    if (distance >= worstDistance) continue;
    best[worstIndex] = { distance, stats, shell: candidate };
    worstDistance = -1;
    for (let index = 0; index < best.length; index += 1) {
      if (best[index].distance > worstDistance) {
        worstDistance = best[index].distance;
        worstIndex = index;
      }
    }
  }
  best.sort((a, b) => a.distance - b.distance);
  return best.map((item) => ({
    distance: Math.sqrt(item.stats.rawSq),
    similarity: similarityPercentFromStats(item.stats),
    shell: item.shell
  }));
}

export function pushBestNeighbor(best, item, limit) {
  if (best.length < limit) {
    best.push(item);
    return;
  }
  let worstIndex = 0;
  let worstDistance = best[0].distance;
  for (let index = 1; index < best.length; index += 1) {
    if (best[index].distance > worstDistance) {
      worstDistance = best[index].distance;
      worstIndex = index;
    }
  }
  if (item.distance < worstDistance) best[worstIndex] = item;
}

export function formatNeighborItems(best) {
  return best
    .sort((a, b) => a.distance - b.distance)
    .map((item) => ({
      distance: Math.sqrt(item.stats.rawSq),
      similarity: similarityPercentFromStats(item.stats),
      shell: item.shell,
    }));
}

export function scheduleNearestContourNeighborsForPc(values, { axes = null, limit = 4, excludeId = null } = {}) {
  const run = ++state.neighborSearchRun;
  window.clearTimeout(state.neighborSearchTimer);
  const candidates = state.filtered.length ? state.filtered : state.shells;
  const best = [];
  let index = 0;
  const step = () => {
    if (run !== state.neighborSearchRun) return;
    const deadline = performance.now() + 5;
    for (; index < candidates.length && performance.now() < deadline; index += 1) {
      const candidate = candidates[index];
      if (candidate.id === excludeId || !candidate.contour_pc?.length) continue;
      const stats = contourPcDistanceStatsToValues(candidate, values, axes);
      pushBestNeighbor(best, { distance: stats.normalizedSq, stats, shell: candidate }, limit);
    }
    if (index < candidates.length) {
      state.neighborSearchTimer = window.setTimeout(step, 0);
      return;
    }
    renderNeighborItems(formatNeighborItems(best));
  };
  state.neighborSearchTimer = window.setTimeout(step, 0);
}

export function nearestContourNeighbors(shell) {
  if (!shell) return [];
  if (state.neighborCache.has(shell.id)) return state.neighborCache.get(shell.id);
  const best = [];
  let worstIndex = -1;
  let worstDistance = -1;
  for (const candidate of state.shells) {
    if (candidate.id === shell.id) continue;
    const stats = contourPcDistanceStatsToValues(candidate, shell.contour_pc || []);
    const distance = stats.normalizedSq;
    if (best.length < 4) {
      best.push({ distance, stats, shell: candidate });
      if (distance > worstDistance) {
        worstDistance = distance;
        worstIndex = best.length - 1;
      }
      continue;
    }
    if (distance >= worstDistance) continue;
    best[worstIndex] = { distance, stats, shell: candidate };
    worstDistance = -1;
    for (let index = 0; index < best.length; index += 1) {
      if (best[index].distance > worstDistance) {
        worstDistance = best[index].distance;
        worstIndex = index;
      }
    }
  }
  best.sort((a, b) => a.distance - b.distance);
  const neighbors = best.map((item) => ({
    distance: Math.sqrt(item.stats.rawSq),
    similarity: similarityPercentFromStats(item.stats),
    shell: item.shell,
  }));
  state.neighborCache.set(shell.id, neighbors);
  return neighbors;
}

export function renderNeighborItems(items) {
  const key = items.map((item) => item.shell.id).join("|");
  if (state.neighborRenderKey === key) {
    if (state.draggingTarget && state.neighborHydrationItems.length) {
      scheduleNeighborImageHydration(state.neighborHydrationItems, key);
    }
    return;
  }
  state.neighborRenderKey = key;
  els.neighborsList.innerHTML = "";
  window.clearTimeout(state.neighborHydrationTimer);
  state.neighborHydrationItems = [];
  const images = [];
  for (const item of items) {
    const button = document.createElement("button");
    button.className = "neighbor-button";
    const similarity = Number.isFinite(item.similarity) ? item.similarity : 0;
    button.title = `${item.shell.species} (${formatNumber(similarity, 1)}% similar, distance ${formatNumber(item.distance, 3)})`;
    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 116;
    canvas.className = "neighbor-contour";
    drawNeighborContour(canvas, item.shell);
    const image = document.createElement("img");
    image.setAttribute("aria-label", item.shell.species);
    image.alt = item.shell.species;
    image.hidden = true;
    image.onload = () => {
      image.hidden = false;
      canvas.hidden = true;
    };
    const label = document.createElement("span");
    label.textContent = `${Math.round(similarity)}%`;
    button.append(canvas, image, label);
    button.addEventListener("click", () => {
      centerViewportOnShell(item.shell);
      selectShell(item.shell);
    });
    els.neighborsList.append(button);
    if (setCachedShellCutoutImage(image, item.shell)) {
      if (!image.hidden) canvas.hidden = true;
    }
    images.push({ image, shell: item.shell });
  }
  state.neighborHydrationItems = images;
  scheduleNeighborImageHydration(images, key);
}

export function drawNeighborContour(canvas, shell) {
  const ctx = canvas.getContext("2d");
  const contour = normalizedContour(shell);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!contour) return;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = (Math.min(canvas.width, canvas.height) * 0.4) / maxContourRadius([contour]);
  const fill = ctx.createLinearGradient(0, canvas.height * 0.22, canvas.width, canvas.height * 0.86);
  fill.addColorStop(0, "#f7ead0");
  fill.addColorStop(1, "#c98f72");
  contourPath(ctx, contour, centerX, centerY, scale);
  ctx.fillStyle = fill;
  ctx.strokeStyle = "rgba(59, 77, 76, 0.72)";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  ctx.save();
  contourPath(ctx, contour, centerX, centerY, scale);
  ctx.clip();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 1.1;
  for (let ring = 1; ring <= 2; ring += 1) {
    contourPath(ctx, contour, centerX, centerY, scale * (0.34 + ring * 0.2));
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(64, 44, 38, 0.1)";
  ctx.lineWidth = 1;
  const count = Math.floor(contour.length / 2);
  const step = Math.max(12, Math.floor(count / 10));
  for (let index = 0; index < count; index += step) {
    const x = contour[index * 2];
    const y = contour[index * 2 + 1];
    ctx.beginPath();
    ctx.moveTo(centerX + x * scale * 0.25, centerY + y * scale * 0.25);
    ctx.lineTo(centerX + x * scale * 0.94, centerY + y * scale * 0.94);
    ctx.stroke();
  }
  ctx.restore();
}

export function scheduleNeighborImageHydration(images, key) {
  window.clearTimeout(state.neighborHydrationTimer);
  state.neighborHydrationTimer = window.setTimeout(() => {
    state.neighborHydrationTimer = 0;
    if (state.draggingTarget) {
      scheduleNeighborImageHydration(images, key);
      return;
    }
    hydrateNeighborImages(images, key);
  }, NEIGHBOR_IMAGE_IDLE_DELAY);
}

export async function hydrateNeighborImages(images, key) {
  const run = state.selectionRun;
  for (const item of images) {
    if (run !== state.selectionRun || state.neighborRenderKey !== key) return;
    if (setCachedShellCutoutImage(item.image, item.shell)) continue;
    void setShellCutoutImage(item.image, item.shell, { priority: -5 }).then(() => {
      if (run !== state.selectionRun || state.neighborRenderKey !== key) {
        item.image.hidden = true;
      }
    });
  }
}

export function renderNeighbors(shell, token = state.neighborToken) {
  if (!shell || token !== state.neighborToken) {
    state.neighborRenderKey = "";
    state.neighborSearchRun += 1;
    window.clearTimeout(state.neighborSearchTimer);
    state.neighborSearchTimer = 0;
    window.clearTimeout(state.neighborHydrationTimer);
    state.neighborHydrationTimer = 0;
    state.neighborHydrationItems = [];
    els.neighborsList.innerHTML = "";
    return;
  }
  renderNeighborItems(nearestContourNeighbors(shell));
}

export function renderNeighborsForPc(values, items = null) {
  state.neighborToken += 1;
  window.clearTimeout(state.neighborTimer);
  state.neighborSearchRun += 1;
  window.clearTimeout(state.neighborSearchTimer);
  state.neighborSearchTimer = 0;
  window.clearTimeout(state.neighborHydrationTimer);
  state.neighborHydrationTimer = 0;
  state.neighborHydrationItems = [];
  if (items) {
    renderNeighborItems(items);
    return;
  }
  scheduleNearestContourNeighborsForPc(values.slice(), { axes: activePcaNeighborAxes() });
}

export function queueTargetNearestNeighbors(values) {
  state.targetNeighborValues = values.slice();
  window.clearTimeout(state.targetNeighborTimer);
  state.targetNeighborTimer = window.setTimeout(() => {
    state.targetNeighborTimer = 0;
    state.targetNeighborLastAt = performance.now();
    const next = state.targetNeighborValues;
    state.targetNeighborValues = null;
    if (next) renderNeighborsForPc(next);
  }, NEIGHBOR_IMAGE_IDLE_DELAY);
}

export function clearTargetNearestNeighbors() {
  window.clearTimeout(state.targetNeighborTimer);
  state.targetNeighborTimer = 0;
  state.targetNeighborValues = null;
  state.neighborSearchRun += 1;
  window.clearTimeout(state.neighborSearchTimer);
  state.neighborSearchTimer = 0;
}

export function finishPendingScatterSelection() {
  const shell = state.pendingSelectShell;
  state.pendingSelectShell = null;
  if (shell) selectShell(shell, { preferFastSource: true });
}

export function scheduleRenderNeighbors(shell, delay = 0) {
  state.neighborToken += 1;
  const token = state.neighborToken;
  window.clearTimeout(state.neighborTimer);
  window.clearTimeout(state.neighborHydrationTimer);
  state.neighborHydrationTimer = 0;
  state.neighborHydrationItems = [];
  if (!shell) {
    state.neighborRenderKey = "";
    state.neighborSearchRun += 1;
    window.clearTimeout(state.neighborSearchTimer);
    state.neighborSearchTimer = 0;
    window.clearTimeout(state.neighborHydrationTimer);
    state.neighborHydrationTimer = 0;
    state.neighborHydrationItems = [];
    els.neighborsList.innerHTML = "";
    return;
  }
  state.neighborTimer = window.setTimeout(() => {
    renderNeighbors(shell, token);
  }, delay);
}
