// @ts-nocheck

import { originalImageCache, state } from './runtime';
import { datasetAsset } from './utils';

export function loadOriginalImage(shell) {
  if (!shell || shell.id < 0 || !shell.file) return Promise.resolve(null);
  if (originalImageCache.has(shell.file)) return originalImageCache.get(shell.file);
  const promise = new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = datasetAsset(shell.file);
  });
  originalImageCache.set(shell.file, promise);
  return promise;
}

export function scheduleIdleWork(callback, timeout = 1200) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout });
    return;
  }
  window.setTimeout(callback, Math.min(timeout, 160));
}

export function randomShellFromSource(source, avoidId = state.selected?.id) {
  if (!source.length) return null;
  let index = Math.floor(Math.random() * source.length);
  if (avoidId != null && source.length > 1 && source[index].id === avoidId) {
    index = (index + 1 + Math.floor(Math.random() * (source.length - 1))) % source.length;
  }
  return source[index];
}

export function resetSurpriseQueue() {
  state.surpriseQueue = [];
  state.surpriseQueueSource = null;
  window.clearTimeout(state.surprisePrimeTimer);
  state.surprisePrimeTimer = 0;
}

export function queueRandomSurpriseShell(source) {
  const queuedIds = new Set(state.surpriseQueue.map((entry) => entry.shell?.id));
  let shell = null;
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const candidate = randomShellFromSource(source);
    if (!candidate || queuedIds.has(candidate.id)) continue;
    shell = candidate;
    break;
  }
  if (!shell) shell = randomShellFromSource(source);
  if (!shell) return;
  state.surpriseQueue.push({ shell, ready: true });
}

export function primeSurpriseQueue(source = state.filtered, targetSize = 12, delay = 80) {
  if (!source.length) return;
  if (state.surpriseQueueSource !== source) {
    state.surpriseQueue = [];
    state.surpriseQueueSource = source;
  }
  window.clearTimeout(state.surprisePrimeTimer);
  state.surprisePrimeTimer = window.setTimeout(() => {
    scheduleIdleWork(() => {
      while (state.surpriseQueue.length < targetSize) queueRandomSurpriseShell(source);
    }, 500);
  }, delay);
}

export function popReadySurpriseShell(source) {
  if (state.surpriseQueueSource !== source || !state.surpriseQueue.length) return null;
  for (let index = 0; index < state.surpriseQueue.length; index += 1) {
    const entry = state.surpriseQueue[index];
    if (!entry?.shell || entry.shell.id === state.selected?.id) continue;
    state.surpriseQueue.splice(index, 1);
    return entry.shell;
  }
  return null;
}
