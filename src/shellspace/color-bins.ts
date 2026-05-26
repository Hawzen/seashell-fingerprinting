export type ShellColorBin = {
  bin: number;
  weight: number;
};

export type ColorBin = {
  bin: number;
  hex: string;
  rgb: number[];
  hue: number;
  tone: number;
  count: number;
  weight: number;
};

const HUE_BINS = 15;
const TONE_BINS = 10;
const MIN_BIN_WEIGHT = 0.08;

const TONES = [
  { saturation: 0.2, lightness: 0.18 },
  { saturation: 0.42, lightness: 0.24 },
  { saturation: 0.64, lightness: 0.31 },
  { saturation: 0.82, lightness: 0.39 },
  { saturation: 0.82, lightness: 0.48 },
  { saturation: 0.74, lightness: 0.58 },
  { saturation: 0.62, lightness: 0.68 },
  { saturation: 0.48, lightness: 0.78 },
  { saturation: 0.34, lightness: 0.86 },
  { saturation: 0.2, lightness: 0.93 },
];

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function normalizeRgb(rgb: number[]): number[] {
  const values = [Number(rgb?.[0] ?? 0), Number(rgb?.[1] ?? 0), Number(rgb?.[2] ?? 0)];
  const scale = values.some((value) => value > 1) ? 255 : 1;
  return values.map((value) => clamp01(value / scale));
}

function hslToRgb(hue: number, saturation: number, lightness: number): number[] {
  const h = ((hue % 360) + 360) % 360 / 360;
  const q = lightness < 0.5
    ? lightness * (1 + saturation)
    : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;
  const channel = (offset: number) => {
    let t = h + offset;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [channel(1 / 3), channel(0), channel(-1 / 3)].map(clamp01);
}

function rgbToHex(rgb: number[]): string {
  return `#${rgb
    .map((channel) => Math.max(0, Math.min(255, Math.round(channel * 255))).toString(16).padStart(2, "0"))
    .join("")}`;
}

function rgbFromHex(hex: string): number[] | null {
  const value = String(hex || "").replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(value)) return null;
  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ];
}

function rgbFromCss(color: string): number[] | null {
  const match = String(color || "").match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i);
  if (!match) return null;
  return [Number(match[1]) / 255, Number(match[2]) / 255, Number(match[3]) / 255].map(clamp01);
}

function canonicalRgbForBin(bin: number): number[] {
  const safeBin = Math.max(0, Math.min(HUE_BINS * TONE_BINS - 1, Math.round(Number(bin) || 0)));
  const tone = Math.floor(safeBin / HUE_BINS);
  const hue = safeBin % HUE_BINS;
  return hslToRgb((hue / HUE_BINS) * 360, TONES[tone].saturation, TONES[tone].lightness);
}

export function canonicalColorBin(bin: number): ColorBin {
  const safeBin = Math.max(0, Math.min(HUE_BINS * TONE_BINS - 1, Math.round(Number(bin) || 0)));
  const rgb = canonicalRgbForBin(safeBin);
  return {
    bin: safeBin,
    hex: rgbToHex(rgb),
    rgb,
    hue: safeBin % HUE_BINS,
    tone: Math.floor(safeBin / HUE_BINS),
    count: 0,
    weight: 0,
  };
}

export function colorBinForRgb(rgb: number[]): number {
  const target = normalizeRgb(rgb);
  let bestBin = 0;
  let bestDistance = Infinity;
  for (let bin = 0; bin < HUE_BINS * TONE_BINS; bin += 1) {
    const color = canonicalRgbForBin(bin);
    const red = target[0] - color[0];
    const green = target[1] - color[1];
    const blue = target[2] - color[2];
    const distance = red * red * 0.3 + green * green * 0.59 + blue * blue * 0.11;
    if (distance < bestDistance) {
      bestDistance = distance;
      bestBin = bin;
    }
  }
  return bestBin;
}

export function colorBinForCss(color: string): number | null {
  const rgb = rgbFromHex(color) || rgbFromCss(color);
  return rgb ? colorBinForRgb(rgb) : null;
}

export function colorBinFilterValue(bin: number): string {
  return `bin:${Math.max(0, Math.min(HUE_BINS * TONE_BINS - 1, Math.round(Number(bin) || 0)))}`;
}

export function colorBinFromFilterValue(value: string): number | null {
  const text = String(value || "");
  if (text.startsWith("bin:")) {
    const bin = Number(text.slice(4));
    return Number.isInteger(bin) && bin >= 0 && bin < HUE_BINS * TONE_BINS ? bin : null;
  }
  return colorBinForCss(text);
}

function shellPalette(shell): { colors: number[][]; weights: number[] } {
  const colors = Array.isArray(shell?.color_palette_rgb)
    ? shell.color_palette_rgb.map(normalizeRgb)
    : [];
  const palette = colors;
  if (!palette.length) return { colors: [], weights: [] };

  const rawWeights = Array.isArray(shell?.color_palette_weights) ? shell.color_palette_weights : [];
  const weights = palette.map((_, index) => {
    const weight = Number(rawWeights[index]);
    return Number.isFinite(weight) && weight > 0 ? weight : 1 / palette.length;
  });
  const total = weights.reduce((sum, weight) => sum + weight, 0) || 1;
  return {
    colors: palette,
    weights: weights.map((weight) => weight / total),
  };
}

function assignShellColorBins(shell): ShellColorBin[] {
  const { colors, weights } = shellPalette(shell);
  const bins = new Map<number, number>();
  for (let index = 0; index < colors.length; index += 1) {
    const bin = colorBinForRgb(colors[index]);
    bins.set(bin, (bins.get(bin) || 0) + weights[index]);
  }
  const colorBins = [...bins.entries()]
    .map(([bin, weight]) => ({ bin, weight: Math.round(weight * 10000) / 10000 }))
    .sort((a, b) => b.weight - a.weight || a.bin - b.bin);
  shell.color_bins = colorBins;
  return colorBins;
}

export function buildShellColorBins(shells): void {
  for (const shell of shells || []) assignShellColorBins(shell);
}

export function shellHasColorBin(shell, bin): boolean {
  const target = Number(bin);
  if (!Number.isInteger(target)) return false;
  const bins = Array.isArray(shell?.color_bins) ? shell.color_bins : assignShellColorBins(shell);
  return bins.some((item) => item.bin === target && Number(item.weight || 0) > 0);
}

export function occupiedColorBins(shells): ColorBin[] {
  const bins = new Map<number, ColorBin>();
  for (const shell of shells || []) {
    const shellBins = Array.isArray(shell?.color_bins) ? shell.color_bins : assignShellColorBins(shell);
    for (const item of shellBins) {
      const weight = Number(item.weight || 0);
      if (weight < MIN_BIN_WEIGHT) continue;
      const current = bins.get(item.bin) || canonicalColorBin(item.bin);
      current.count += 1;
      current.weight += weight;
      bins.set(item.bin, current);
    }
  }
  return [...bins.values()]
    .map((item) => ({ ...item, weight: Math.round(item.weight * 1000) / 1000 }))
    .sort((a, b) => a.tone - b.tone || a.hue - b.hue);
}
