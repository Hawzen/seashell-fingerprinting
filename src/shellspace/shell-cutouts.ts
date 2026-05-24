// @ts-nocheck

import { loadOriginalImage } from './images-loading';
import { els, pythonCutCache, shellCutoutImageCache, state } from './runtime';
import { fingerprintImageWithPython } from './upload-python';

const cutoutIndexKey = "shellspace:cutouts:v1:index";
const cutoutPrefix = "shellspace:cutouts:v1:";

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
  const byFile = new Map(shells.map((shell) => [shell.file, shell]));
  for (const file of readCutoutIndex()) {
    const shell = byFile.get(file);
    if (!shell || shellCutoutImageCache.has(file)) continue;
    const dataUrl = readPersistentCutout(shell);
    if (!dataUrl) continue;
    shellCutoutImageCache.set(file, imageEntryFromDataUrl(dataUrl));
    state.mapShellImageIds.add(shell.id);
  }
}

export function restoreCutoutStatus(text) {
  if (["Loading Python", "Loading numpy", "Removing background", "Cutting shell", "Fingerprinting shell"].includes(els.statusLine?.textContent)) {
    els.statusLine.textContent = text;
  }
}

export async function cutShellWithPython(shell) {
  if (!shell?.file) return null;
  if (!pythonCutCache.has(shell.file)) {
    pythonCutCache.set(shell.file, (async () => {
      const cached = readPersistentCutout(shell);
      if (cached) return { imageUrl: cached };
      const original = await loadOriginalImage(shell);
      if (!original) return null;
      const cut = await fingerprintImageWithPython(original);
      writePersistentCutout(shell, cut?.imageUrl);
      return cut;
    })().catch((error) => {
      if (els.statusLine) els.statusLine.textContent = error.message || "Python image cut failed";
      return null;
    }));
  }
  return pythonCutCache.get(shell.file);
}

export function getShellCutoutImage(shell, onReady = null) {
  if (!shell?.file) return null;
  let entry = shellCutoutImageCache.get(shell.file);
  if (!entry) {
    const persisted = readPersistentCutout(shell);
    if (persisted) {
      entry = imageEntryFromDataUrl(persisted);
      shellCutoutImageCache.set(shell.file, entry);
    }
  }
  if (!entry) {
    const image = new Image();
    image.decoding = "async";
    entry = {
      image,
      ready: false,
      promise: cutShellWithPython(shell).then((cut) => {
        if (!cut?.imageUrl) return null;
        return new Promise((resolve) => {
          image.onload = () => {
            entry.ready = true;
            resolve(image);
          };
          image.onerror = () => resolve(null);
          image.src = cut.imageUrl;
        });
      }),
    };
    shellCutoutImageCache.set(shell.file, entry);
  }
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

export async function loadShellCutoutImage(shell) {
  const ready = getShellCutoutImage(shell);
  if (ready) return ready;
  const entry = shell?.file ? shellCutoutImageCache.get(shell.file) : null;
  return entry?.promise || null;
}

export async function setShellCutoutImage(image, shell) {
  if (!image || !shell) return false;
  const cached = getShellCutoutImage(shell);
  if (cached) {
    image.src = cached.src;
    return true;
  }
  const statusBeforeCut = els.statusLine?.textContent || "";
  const ready = await loadShellCutoutImage(shell);
  restoreCutoutStatus(statusBeforeCut);
  if (!image.isConnected || !ready?.src) return false;
  image.src = ready.src;
  return true;
}
