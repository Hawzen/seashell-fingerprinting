// @ts-nocheck

import { effectiveGeneratedTraits } from './geometry-generation';
import { els, state } from './runtime';
import { clamp01, hslCss, rgbToHsl } from './utils';

export function rgbCssFromTriplet(color) {
  return `rgb(${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(color[2])})`;
}

export function colorDistanceSq(a, b) {
  const red = a[0] - b[0];
  const green = a[1] - b[1];
  const blue = a[2] - b[2];
  return red * red + green * green + blue * blue;
}

export function fiveDistinctColorsFromPixels(pixels) {
  if (!pixels.length) return null;
  const centers = [pixels.reduce((best, color) => {
    const chroma = Math.max(color[0], color[1], color[2]) - Math.min(color[0], color[1], color[2]);
    const bestChroma = Math.max(best[0], best[1], best[2]) - Math.min(best[0], best[1], best[2]);
    return chroma > bestChroma ? color : best;
  }, pixels[0]).slice()];
  while (centers.length < 5) {
    let next = pixels[0];
    let nextDistance = -1;
    for (const color of pixels) {
      const distance = Math.min(...centers.map((center) => colorDistanceSq(color, center)));
      if (distance > nextDistance) {
        nextDistance = distance;
        next = color;
      }
    }
    centers.push(next.slice());
  }
  for (let pass = 0; pass < 5; pass += 1) {
    const totals = centers.map(() => [0, 0, 0, 0]);
    for (const color of pixels) {
      let best = 0;
      let bestDistance = Infinity;
      for (let index = 0; index < centers.length; index += 1) {
        const distance = colorDistanceSq(color, centers[index]);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      }
      totals[best][0] += color[0];
      totals[best][1] += color[1];
      totals[best][2] += color[2];
      totals[best][3] += 1;
    }
    for (let index = 0; index < centers.length; index += 1) {
      if (!totals[index][3]) continue;
      centers[index] = [
        totals[index][0] / totals[index][3],
        totals[index][1] / totals[index][3],
        totals[index][2] / totals[index][3],
      ];
    }
  }
  return centers
    .sort((a, b) => rgbToHsl(a[0] / 255, a[1] / 255, a[2] / 255).l - rgbToHsl(b[0] / 255, b[1] / 255, b[2] / 255).l)
    .map(rgbCssFromTriplet);
}

export function paletteFromSourceImage() {
  const image = els.sourceImage;
  if (!image || image.hidden || !image.complete || !image.naturalWidth || !image.naturalHeight) return null;
  const width = Math.min(220, image.naturalWidth);
  const height = Math.max(1, Math.round((width / image.naturalWidth) * image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0, width, height);
  let data;
  try {
    data = ctx.getImageData(0, 0, width, height).data;
  } catch (_error) {
    return null;
  }
  const pixels = [];
  const step = Math.max(4, Math.floor(Math.sqrt((width * height) / 2200)));
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const offset = (y * width + x) * 4;
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      const alpha = data[offset + 3];
      if (alpha < 180 || red + green + blue < 48) continue;
      pixels.push([red, green, blue]);
    }
  }
  return fiveDistinctColorsFromPixels(pixels);
}

export function paletteFromTraits(traits) {
  const base = {
    r: clamp01(traits.color_r_mean ?? 0.72),
    g: clamp01(traits.color_g_mean ?? 0.66),
    b: clamp01(traits.color_b_mean ?? 0.54),
  };
  const hsl = rgbToHsl(base.r, base.g, base.b);
  const contrast = clamp01((traits.color_l_std || 0.18) / 0.32);
  return [
    hslCss(hsl.h, hsl.s * 0.78, Math.max(0.12, hsl.l - 0.28 - contrast * 0.08)),
    hslCss(hsl.h - 8, hsl.s * 0.92, Math.max(0.22, hsl.l - 0.12)),
    hslCss(hsl.h, hsl.s, hsl.l),
    hslCss(hsl.h + 6, hsl.s * 0.72, Math.min(0.86, hsl.l + 0.16)),
    hslCss(hsl.h, hsl.s * 0.48, Math.min(0.94, hsl.l + 0.3 + contrast * 0.04)),
  ];
}

export function renderPalette(preferCanvas = false) {
  if (!els.paletteSwatches) return;
  els.paletteSwatches.innerHTML = "";
  const traits = effectiveGeneratedTraits();
  const cacheKey = state.generatedMode === "selected" && state.selected ? state.selected.id : null;
  let palette = cacheKey == null ? null : state.paletteCache.get(cacheKey);
  if (!palette && preferCanvas) {
    palette = paletteFromSourceImage();
    if (palette && cacheKey != null) state.paletteCache.set(cacheKey, palette);
  }
  if (!palette) palette = paletteFromTraits(traits);
  for (const color of palette) {
    const swatch = document.createElement("span");
    swatch.className = "palette-swatch";
    swatch.style.background = color;
    swatch.title = color;
    els.paletteSwatches.append(swatch);
  }
}
