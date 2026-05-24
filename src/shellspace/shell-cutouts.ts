// @ts-nocheck

import { loadOriginalImage } from './images-loading';
import { els, pythonCutCache } from './runtime';
import { fingerprintImageWithPython } from './upload-python';

export function restoreCutoutStatus(text) {
  if (["Loading Python", "Loading numpy", "Removing background", "Cutting shell", "Fingerprinting shell"].includes(els.statusLine?.textContent)) {
    els.statusLine.textContent = text;
  }
}

export async function cutShellWithPython(shell) {
  if (!shell?.file) return null;
  if (!pythonCutCache.has(shell.file)) {
    pythonCutCache.set(shell.file, (async () => {
      const original = await loadOriginalImage(shell);
      if (!original) return null;
      return fingerprintImageWithPython(original);
    })().catch((error) => {
      if (els.statusLine) els.statusLine.textContent = error.message || "Python image cut failed";
      return null;
    }));
  }
  return pythonCutCache.get(shell.file);
}

export async function setShellCutoutImage(image, shell) {
  if (!image || !shell) return false;
  const statusBeforeCut = els.statusLine?.textContent || "";
  const cut = await cutShellWithPython(shell);
  restoreCutoutStatus(statusBeforeCut);
  if (!image.isConnected || !cut?.imageUrl) return false;
  image.src = cut.imageUrl;
  return true;
}
