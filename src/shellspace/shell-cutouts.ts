// @ts-nocheck

import { loadOriginalImage } from './images-loading';
import { els, pythonCutCache, shellCutoutImageCache, state } from './runtime';
import { fingerprintImageWithPython } from './upload-python';

const cutoutIndexKey = "shellspace:cutouts:v1:index";
const cutoutPrefix = "shellspace:cutouts:v1:";
let cutoutQueueRunning = false;
let cutoutJobId = 0;
const cutoutQueue = [];
const cutoutJobsByFile = new Map();
const maxCutoutQueueSize = 80;

export function cutoutStorageKey(file) {
  return `${cutoutPrefix}${encodeURIComponent(file)}`;
}

export function readCutoutIndex() {
  try {
    const raw = JSON.parse(localStorage.getItem(cutoutIndexKey) || "[]");
    return Array.isArray(raw) ? raw.filter((file) => typeof file === "string") : [];
  } catch (_error) {
    return [];
  }
}

export function writeCutoutIndex(files) {
  try {
    localStorage.setItem(cutoutIndexKey, JSON.stringify([...new Set(files)]));
  } catch (_error) {
    // Persistent cache is best-effort; memory cache still works.
  }
}

export function clearPersistentCutoutCache() {
  cutoutQueue.length = 0;
  cutoutJobsByFile.clear();
  for (const file of readCutoutIndex()) {
    try {
      localStorage.removeItem(cutoutStorageKey(file));
    } catch (_error) {
      // Best effort.
    }
  }
  try {
    localStorage.removeItem(cutoutIndexKey);
  } catch (_error) {
    // Best effort.
  }
  pythonCutCache.clear();
  shellCutoutImageCache.clear();
  state.mapShellImageIds.clear();
}

export function readPersistentCutout(shell) {
  if (!shell?.file) return "";
  try {
    return localStorage.getItem(cutoutStorageKey(shell.file)) || "";
  } catch (_error) {
    return "";
  }
}

export function writePersistentCutout(shell, dataUrl) {
  if (!shell?.file || !dataUrl?.startsWith("data:image/")) return;
  try {
    localStorage.setItem(cutoutStorageKey(shell.file), dataUrl);
    writeCutoutIndex([...readCutoutIndex(), shell.file]);
    if (shell.id >= 0) state.mapShellImageIds.add(shell.id);
  } catch (_error) {
    // localStorage can fill up; skip persistence without breaking runtime cache.
  }
}

function writePersistentCutoutLater(shell, dataUrl) {
  const write = () => writePersistentCutout(shell, dataUrl);
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(write, { timeout: 5000 });
    return;
  }
  window.setTimeout(write, 2500);
}

export function imageEntryFromDataUrl(dataUrl) {
  const image = new Image();
  image.decoding = "async";
  const entry = {
    image,
    ready: false,
    promise: new Promise((resolve) => {
      image.onload = () => {
        entry.ready = true;
        resolve(image);
      };
      image.onerror = () => resolve(null);
    }),
  };
  image.src = dataUrl;
  return entry;
}

export function hydratePersistentCutoutCache(shells) {
  // Keep startup cheap. Reading each cached data URL out of localStorage is
  // synchronous and can stall the UI, so persisted cutouts are restored only
  // when the background queue consumes a requested shell.
  void shells;
}

export function restoreCutoutStatus(text) {
  if (["Loading Python", "Loading numpy", "Removing background", "Cutting shell", "Fingerprinting shell"].includes(els.statusLine?.textContent)) {
    els.statusLine.textContent = text;
  }
}

function waitForIdleTurn(timeout = 120) {
  return new Promise((resolve) => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => resolve(), { timeout });
      return;
    }
    window.setTimeout(resolve, 16);
  });
}

function pumpCutoutQueue() {
  if (cutoutQueueRunning) return;
  cutoutQueueRunning = true;
  void (async () => {
    while (cutoutQueue.length) {
      cutoutQueue.sort((a, b) => b.priority - a.priority || a.id - b.id);
      const job = cutoutQueue.shift();
      if (job.file) cutoutJobsByFile.delete(job.file);
      await waitForIdleTurn();
      try {
        job.resolve(await job.task());
      } catch (error) {
        if (els.statusLine) els.statusLine.textContent = error.message || "Python image cut failed";
        job.resolve(null);
      }
    }
    cutoutQueueRunning = false;
    if (cutoutQueue.length) pumpCutoutQueue();
  })();
}

function enqueueCutout(file, shell, task, { priority = 0 } = {}) {
  const existing = cutoutJobsByFile.get(file);
  if (existing) {
    if (priority > existing.priority) existing.priority = priority;
    return true;
  }
  if (cutoutQueue.length >= maxCutoutQueueSize) {
    if (priority <= 0) return false;
    let dropIndex = -1;
    let dropPriority = priority;
    for (let index = 0; index < cutoutQueue.length; index += 1) {
      if (cutoutQueue[index].priority < dropPriority) {
        dropPriority = cutoutQueue[index].priority;
        dropIndex = index;
      }
    }
    if (dropIndex < 0) return false;
    const [dropped] = cutoutQueue.splice(dropIndex, 1);
    cutoutJobsByFile.delete(dropped.file);
    pythonCutCache.delete(dropped.file);
    dropped.resolve(null);
  }
  const entry = ensureShellCutoutEntry(shell);
  const promise = new Promise((resolve) => {
    const job = { id: ++cutoutJobId, file, priority, task, resolve };
    cutoutQueue.push(job);
    cutoutJobsByFile.set(file, job);
    pumpCutoutQueue();
  });
  pythonCutCache.set(file, promise);
  entry.promise = entry.promise || promise;
  return true;
}

function resolveShellCutoutEntry(shell, dataUrl) {
  if (!shell?.file || !dataUrl?.startsWith("data:image/")) return;
  let entry = shellCutoutImageCache.get(shell.file);
  if (!entry) {
    entry = pendingImageEntry();
    shellCutoutImageCache.set(shell.file, entry);
  }
  entry.image.src = dataUrl;
  if (shell.id >= 0) state.mapShellImageIds.add(shell.id);
}

function pendingImageEntry() {
  const image = new Image();
  image.decoding = "async";
  const entry = {
    image,
    ready: false,
    promise: null,
  };
  entry.promise = new Promise((resolve) => {
    image.onload = () => {
      entry.ready = true;
      resolve(image);
    };
    image.onerror = () => resolve(null);
  });
  return entry;
}

function ensureShellCutoutEntry(shell) {
  let entry = shellCutoutImageCache.get(shell.file);
  if (!entry) {
    entry = pendingImageEntry();
    shellCutoutImageCache.set(shell.file, entry);
  }
  return entry;
}

export function requestShellCutout(shell, options = {}) {
  if (!shell?.file) return false;
  if (shellCutoutImageCache.get(shell.file)?.ready) return true;
  if (pythonCutCache.has(shell.file)) {
    reprioritizeCutout(shell.file, options.priority);
    return true;
  }
  return enqueueCutout(shell.file, shell, async () => {
    const cached = readPersistentCutout(shell);
    if (cached) {
      resolveShellCutoutEntry(shell, cached);
      return { imageUrl: cached };
    }
    const original = await loadOriginalImage(shell);
    if (!original) return null;
    const cut = await fingerprintImageWithPython(original);
    if (cut?.imageUrl) {
      resolveShellCutoutEntry(shell, cut.imageUrl);
      writePersistentCutoutLater(shell, cut.imageUrl);
    }
    return cut;
  }, options);
}

function waitForShellCutout(shell) {
  const entry = ensureShellCutoutEntry(shell);
  return entry.promise.then((image) => (image?.src ? { imageUrl: image.src } : null));
}

function watchShellCutoutImage(image, shell, { timeout = 30000 } = {}) {
  return new Promise((resolve) => {
    const startedAt = performance.now();
    const check = () => {
      if (!image.isConnected) {
        resolve(false);
        return;
      }
      const ready = getCachedShellCutoutImage(shell);
      if (ready?.src) {
        image.src = ready.src;
        resolve(true);
        return;
      }
      if (performance.now() - startedAt > timeout) {
        resolve(false);
        return;
      }
      window.setTimeout(check, 120);
    };
    check();
  });
}

function reprioritizeCutout(file, priority = 0) {
  const job = cutoutJobsByFile.get(file);
  if (job && priority > job.priority) job.priority = priority;
}

export async function cutShellWithPython(shell, options = {}) {
  if (!shell?.file) return null;
  requestShellCutout(shell, options);
  return waitForShellCutout(shell).catch((error) => {
    if (els.statusLine) els.statusLine.textContent = error.message || "Python image cut failed";
    return null;
  });
}

export function getShellCutoutImage(shell, onReady = null, options = {}) {
  if (!shell?.file) return null;
  let entry = shellCutoutImageCache.get(shell.file);
  if (!entry && options.request !== false) {
    requestShellCutout(shell, options);
    entry = shellCutoutImageCache.get(shell.file);
  }
  if (!entry) return null;
  if (entry.ready) return entry.image;
  if (onReady) entry.promise.then((image) => { if (image) onReady(image); });
  return null;
}

export function peekShellCutoutImage(shell) {
  const entry = shell?.file ? shellCutoutImageCache.get(shell.file) : null;
  return entry?.ready ? entry.image : null;
}

export function getCachedShellCutoutImage(shell, onReady = null) {
  const entry = shell?.file ? shellCutoutImageCache.get(shell.file) : null;
  if (!entry) return null;
  if (entry.ready) return entry.image;
  if (onReady) entry.promise.then((image) => { if (image) onReady(image); });
  return null;
}

export function setCachedShellCutoutImage(image, shell) {
  if (!image || !shell?.file) return false;
  const entry = shellCutoutImageCache.get(shell.file);
  if (!entry) return false;
  if (entry.ready) {
    image.src = entry.image.src;
    image.hidden = false;
    return true;
  }
  entry.promise.then((ready) => {
    if (ready?.src && image.isConnected) {
      image.src = ready.src;
      image.hidden = false;
    }
  });
  return true;
}

export async function loadShellCutoutImage(shell, options = {}) {
  const ready = getShellCutoutImage(shell, null, { ...options, request: false });
  if (ready) return ready;
  requestShellCutout(shell, options);
  const entry = shell?.file ? shellCutoutImageCache.get(shell.file) : null;
  return entry?.promise || null;
}

export async function setShellCutoutImage(image, shell, options = {}) {
  if (!image || !shell) return false;
  const cached = getShellCutoutImage(shell, null, { ...options, request: false });
  if (cached) {
    image.src = cached.src;
    return true;
  }
  const statusBeforeCut = els.statusLine?.textContent || "";
  if (!requestShellCutout(shell, options)) return false;
  const loaded = await watchShellCutoutImage(image, shell, options);
  restoreCutoutStatus(statusBeforeCut);
  return loaded;
}
