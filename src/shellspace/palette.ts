// @ts-nocheck

import { effectiveGeneratedTraits } from './geometry-generation';
import { canonicalColorBin, colorBinFilterValue, colorBinForRgb } from './color-bins';
import { els, state } from './runtime';
import { clamp01, hslCss, rgbToHsl } from './utils';

export function paletteItemsFromShell(shell) {
  if (Array.isArray(shell?.color_bins) && shell.color_bins.length) {
    return shell.color_bins
      .slice()
      .sort((a, b) => Number(b.weight || 0) - Number(a.weight || 0) || Number(a.bin || 0) - Number(b.bin || 0))
      .map((item) => {
        const bin = Number(item.bin);
        const color = canonicalColorBin(bin).hex;
        return {
          color,
          filterValue: colorBinFilterValue(bin),
          title: `${color} · bin ${bin} · weight ${Number(item.weight || 0).toFixed(3)}`,
        };
      });
  }
  if (Array.isArray(shell?.color_palette_rgb) && shell.color_palette_rgb.length) {
    return shell.color_palette_rgb.map((color) => {
      const normalized = [
        clamp01(Number(color?.[0] ?? 0)),
        clamp01(Number(color?.[1] ?? 0)),
        clamp01(Number(color?.[2] ?? 0)),
      ];
      const bin = colorBinForRgb(normalized);
      const canonical = canonicalColorBin(bin).hex;
      return {
        color: canonical,
        filterValue: colorBinFilterValue(bin),
        title: `${canonical} · bin ${bin}`,
      };
    });
  }
  return [];
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
  const selectedPalette = state.generatedMode === "selected" ? paletteItemsFromShell(state.selected) : [];
  const palette = selectedPalette.length
    ? selectedPalette
    : paletteFromTraits(effectiveGeneratedTraits()).map((color) => ({ color, filterValue: "", title: color }));
  for (const item of palette) {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "palette-swatch";
    swatch.style.background = item.color;
    swatch.title = item.title;
    swatch.setAttribute("aria-label", `Filter by ${item.color}`);
    swatch.setAttribute("aria-pressed", item.filterValue && state.categoryFilters.color === item.filterValue ? "true" : "false");
    swatch.disabled = !item.filterValue;
    swatch.addEventListener("click", () => {
      if (!item.filterValue) return;
      state.categoryFilters.color = state.categoryFilters.color === item.filterValue ? "" : item.filterValue;
      window.dispatchEvent(new CustomEvent("shellspace:color-filter-changed"));
    });
    els.paletteSwatches.append(swatch);
  }
}
