// @ts-nocheck

import { remove, newSession, rembgConfig } from '@bunnio/rembg-web';
import * as ort from 'onnxruntime-web';
import { PYODIDE_INDEX, PYODIDE_SCRIPT, PYTHON_FINGERPRINT_CODE } from './constants';
import { els, state } from './runtime';
import { clamp01 } from './utils';

let pyodideScriptPromise = null;
let pyodidePromise = null;
let rembgSessionPromise = null;
let rembgConfigured = false;
let fingerprintWorker = null;
let fingerprintWorkerJobId = 0;
const fingerprintWorkerJobs = new Map();

function yieldToUi(timeout = 80) {
  return new Promise((resolve) => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => resolve(), { timeout });
      return;
    }
    requestAnimationFrame(() => resolve());
  });
}

export function percentile(sortedValues, q) {
  if (!sortedValues.length) return 0;
  const index = Math.min(sortedValues.length - 1, Math.max(0, Math.round((sortedValues.length - 1) * q)));
  return sortedValues[index];
}

export function srgbToLinear(value) {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

export function labFromRgb(red, green, blue) {
  const r = srgbToLinear(red);
  const g = srgbToLinear(green);
  const b = srgbToLinear(blue);
  let x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047;
  let y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
  let z = (r * 0.0193339 + g * 0.119192 + b * 0.9503041) / 1.08883;
  const f = (value) => (value > 0.008856 ? Math.cbrt(value) : 7.787 * value + 16 / 116);
  x = f(x);
  y = f(y);
  z = f(z);
  return {
    l: clamp01((116 * y - 16) / 100),
    a: ((500 * (x - y)) / 127),
    b: ((200 * (y - z)) / 127),
  };
}

export async function readUploadImage(file, maxSize = 640) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();
  return ctx.getImageData(0, 0, width, height);
}

export function imageDataFromImage(image, maxSize = 768) {
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const scale = Math.min(1, maxSize / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

export function loadPyodideScript() {
  if (!pyodideScriptPromise) {
    pyodideScriptPromise = new Promise((resolve, reject) => {
      if (window.loadPyodide) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = PYODIDE_SCRIPT;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("could not load Pyodide"));
      document.head.append(script);
    });
  }
  return pyodideScriptPromise;
}

export async function loadPyodideRuntime() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      els.statusLine.textContent = "Loading Python";
      await loadPyodideScript();
      const pyodide = await window.loadPyodide({ indexURL: PYODIDE_INDEX });
      els.statusLine.textContent = "Loading numpy";
      await pyodide.loadPackage(["numpy"]);
      await yieldToUi();
      pyodide.runPython(PYTHON_FINGERPRINT_CODE);
      return pyodide;
    })();
  }
  return pyodidePromise;
}

export function loadFingerprintWorker() {
  if (!fingerprintWorker) {
    fingerprintWorker = new Worker(new URL("./fingerprint-worker.ts", import.meta.url), { type: "classic" });
    fingerprintWorker.onmessage = (event) => {
      const { id, ok, raw, error } = event.data || {};
      const job = fingerprintWorkerJobs.get(id);
      if (!job) return;
      fingerprintWorkerJobs.delete(id);
      if (ok) job.resolve(raw);
      else job.reject(new Error(error || "Worker fingerprint failed"));
    };
    fingerprintWorker.onerror = (event) => {
      for (const [, job] of fingerprintWorkerJobs) {
        job.reject(new Error(event.message || "Worker fingerprint failed"));
      }
      fingerprintWorkerJobs.clear();
      fingerprintWorker?.terminate();
      fingerprintWorker = null;
    };
  }
  return fingerprintWorker;
}

export function runFingerprintInWorker(imageData, mask) {
  const worker = loadFingerprintWorker();
  const id = ++fingerprintWorkerJobId;
  const rgba = new Uint8Array(imageData.data);
  const maskCopy = new Uint8Array(mask);
  return new Promise((resolve, reject) => {
    fingerprintWorkerJobs.set(id, { resolve, reject });
    worker.postMessage({
      id,
      payload: {
        rgba: rgba.buffer,
        mask: maskCopy.buffer,
        width: imageData.width,
        height: imageData.height,
        contourPoints: state.contourPoints || 256,
        runtime: {
          pyodideIndex: PYODIDE_INDEX,
          pyodideScript: PYODIDE_SCRIPT,
          pythonCode: PYTHON_FINGERPRINT_CODE,
        },
      },
    }, [rgba.buffer, maskCopy.buffer]);
  });
}

export function configureRembg() {
  if (rembgConfigured) return;
  const ortBase = new URL("public/ort/", document.baseURI);
  ort.env.wasm.numThreads = 1;
  ort.env.wasm.proxy = true;
  ort.env.wasm.wasmPaths = {
    mjs: new URL("ort-wasm-simd-threaded.jsep.mjs", ortBase).toString(),
    wasm: new URL("ort-wasm-simd-threaded.jsep.wasm", ortBase).toString(),
  };
  rembgConfig.setBaseUrl(new URL("public/models", document.baseURI).toString());
  rembgConfig.setModelCacheBypass(true);
  rembgConfigured = true;
}

export function loadRembgSession() {
  configureRembg();
  if (!rembgSessionPromise) rembgSessionPromise = newSession("u2netp");
  return rembgSessionPromise;
}

export function maskFromBase64(raw, width, height) {
  const binary = atob(raw || "");
  const mask = new Uint8Array(width * height);
  for (let index = 0; index < Math.min(binary.length, mask.length); index += 1) {
    mask[index] = binary.charCodeAt(index);
  }
  return mask;
}

export function maskBounds(mask, width, height) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let index = 0; index < mask.length; index += 1) {
    if (!mask[index]) continue;
    const x = index % width;
    const y = Math.floor(index / width);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  return maxX < minX ? [0, 0, width - 1, height - 1] : [minX, minY, maxX, maxY];
}

function canvasToPngDataUrl(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(canvas.toDataURL("image/png"));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(canvas.toDataURL("image/png"));
      reader.readAsDataURL(blob);
    }, "image/png");
  });
}

export async function maskedImageUrl(imageData, mask, bbox = null) {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d");
  const cut = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
  for (let index = 0; index < mask.length; index += 1) {
    cut.data[index * 4 + 3] = mask[index] ? cut.data[index * 4 + 3] : 0;
    if ((index & 0x1ffff) === 0x1ffff) await yieldToUi(16);
  }
  ctx.putImageData(cut, 0, 0);

  const [minX, minY, maxX, maxY] = bbox || maskBounds(mask, imageData.width, imageData.height);
  const boxWidth = Math.max(1, maxX - minX + 1);
  const boxHeight = Math.max(1, maxY - minY + 1);
  const pad = Math.max(8, Math.round(Math.max(boxWidth, boxHeight) * 0.08));
  const x0 = Math.max(0, minX - pad);
  const y0 = Math.max(0, minY - pad);
  const x1 = Math.min(imageData.width, maxX + pad + 1);
  const y1 = Math.min(imageData.height, maxY + pad + 1);
  const cropWidth = Math.max(1, x1 - x0);
  const cropHeight = Math.max(1, y1 - y0);
  const side = Math.max(cropWidth, cropHeight);
  const output = document.createElement("canvas");
  output.width = side;
  output.height = side;
  output.getContext("2d").drawImage(canvas, x0, y0, cropWidth, cropHeight, (side - cropWidth) / 2, (side - cropHeight) / 2, cropWidth, cropHeight);
  return canvasToPngDataUrl(output);
}

export async function maskWithRembg(imageData) {
  els.statusLine.textContent = "Removing background";
  await yieldToUi();
  const input = document.createElement("canvas");
  input.width = imageData.width;
  input.height = imageData.height;
  input.getContext("2d").putImageData(imageData, 0, 0);
  const session = await loadRembgSession();
  await yieldToUi();
  const blob = await remove(input, { onlyMask: true, postProcessMask: true, session });
  await yieldToUi();
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(bitmap, 0, 0, imageData.width, imageData.height);
  bitmap.close?.();
  const pixels = ctx.getImageData(0, 0, imageData.width, imageData.height).data;
  const mask = new Uint8Array(imageData.width * imageData.height);
  for (let index = 0; index < mask.length; index += 1) {
    mask[index] = pixels[index * 4] > 16 ? 1 : 0;
    if ((index & 0x1ffff) === 0x1ffff) await yieldToUi(16);
  }
  return mask;
}

export async function fingerprintImageDataWithPython(imageData) {
  const mask = await maskWithRembg(imageData);
  els.statusLine.textContent = "Fingerprinting shell";
  await yieldToUi();
  const raw = await runFingerprintInWorker(imageData, mask);
  await yieldToUi();
  const result = JSON.parse(raw);
  const cleanMask = maskFromBase64(result.mask, imageData.width, imageData.height);
  const bbox = result.bbox || maskBounds(cleanMask, imageData.width, imageData.height);
  return {
    imageData,
    mask: cleanMask,
    contour: new Float32Array(result.contour || []),
    fingerprint: new Float32Array(result.fingerprint || []),
    maskPixels: Number(result.mask_pixels || 0),
    bbox,
    imageUrl: await maskedImageUrl(imageData, cleanMask, bbox),
  };
}

export async function fingerprintImageWithPython(image) {
  els.statusLine.textContent = "Cutting shell";
  await yieldToUi();
  return fingerprintImageDataWithPython(imageDataFromImage(image, 768));
}

export async function fingerprintUploadWithPython(file) {
  els.statusLine.textContent = "Cutting shell";
  await yieldToUi();
  return fingerprintImageDataWithPython(await readUploadImage(file, 768));
}
