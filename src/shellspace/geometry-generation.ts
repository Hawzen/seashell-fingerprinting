// @ts-nocheck

import { fingerprintFromPcValues, reconstructContourFromFingerprint } from './data-pack';
import { els, normalizedContourCache, outlineCtx, state } from './runtime';
import { applyFingerprintStyle, applyShellFingerprintStyle, clamp01, hashString } from './utils';

export function contourForShell(shell) {
  if (!shell) return null;
  const uploadContour = shell.upload_contour || (shell.id < 0 && state.selected === shell ? state.selectedContour : null);
  if (shell.id < 0 && uploadContour) {
    const points = [];
    const centerX = shell.center?.[0] || 0;
    const centerY = shell.center?.[1] || 0;
    const radius = shell.mean_radius || 1;
    for (let index = 0; index < uploadContour.length; index += 2) {
      points.push([
        centerX + uploadContour[index] * radius,
        centerY + uploadContour[index + 1] * radius,
      ]);
    }
    return points;
  }
  if (!state.contours && shell.fingerprint) {
    const contour = normalizedContour(shell);
    if (!contour) return null;
    const centerX = shell.center?.[0] || 0;
    const centerY = shell.center?.[1] || 0;
    const radius = shell.mean_radius || 1;
    const points = [];
    for (let index = 0; index < contour.length; index += 2) {
      points.push([centerX + contour[index] * radius, centerY + contour[index + 1] * radius]);
    }
    return points;
  }
  if (!state.contours || !state.contourPoints) return null;
  const start = shell.id * state.contourPoints * 2;
  const end = start + state.contourPoints * 2;
  if (end > state.contours.length) return null;
  const points = [];
  for (let index = start; index < end; index += 2) {
    points.push([state.contours[index] / state.contourScale, state.contours[index + 1] / state.contourScale]);
  }
  return points;
}

export function normalizedContour(shell) {
  if (shell?.upload_contour) return shell.upload_contour;
  if (shell?.id < 0 && state.selected === shell && state.selectedContour) return state.selectedContour;
  if (normalizedContourCache.has(shell.id)) return normalizedContourCache.get(shell.id);
  if (!state.contours && shell?.fingerprint) {
    const out = reconstructContourFromFingerprint(shell.fingerprint, state.contourPoints || 256);
    normalizedContourCache.set(shell.id, out);
    return out;
  }
  if (!state.contours || !state.contourPoints) return null;
  const start = shell.id * state.contourPoints * 2;
  const end = start + state.contourPoints * 2;
  if (end > state.contours.length) return null;
  const centerX = shell.center[0] * state.contourScale;
  const centerY = shell.center[1] * state.contourScale;
  const radius = Math.max(1e-6, shell.mean_radius * state.contourScale);
  const out = new Float32Array(state.contourPoints * 2);
  for (let point = 0; point < state.contourPoints; point += 1) {
    const source = start + point * 2;
    out[point * 2] = (state.contours[source] - centerX) / radius;
    out[point * 2 + 1] = (state.contours[source + 1] - centerY) / radius;
  }
  normalizedContourCache.set(shell.id, out);
  return out;
}

export function shapeTraitsFromShell(shell) {
  if (!shell) return {};
  return {
    color_r_mean: shell.color_r_mean,
    color_g_mean: shell.color_g_mean,
    color_b_mean: shell.color_b_mean,
    color_l_mean: shell.color_l_mean,
    color_a_mean: shell.color_a_mean,
    color_b_lab_mean: shell.color_b_lab_mean,
    color_chroma_mean: shell.color_chroma_mean,
    color_chroma_std: shell.color_chroma_std,
    color_saturation_mean: shell.color_saturation_mean,
    color_saturation_std: shell.color_saturation_std,
    color_pattern_strength: shell.color_pattern_strength,
    color_pattern_contrast: shell.color_pattern_contrast,
    color_pattern_chroma: shell.color_pattern_chroma,
    roughness: shell.roughness,
    texture_gradient_mean: shell.texture_gradient_mean,
    texture_residual_std: shell.texture_residual_std,
    texture_luma_iqr: shell.texture_luma_iqr,
    contour_concavity: shell.contour_concavity,
    contour_solidity: shell.contour_solidity,
  };
}

export function shellColorName(shell) {
  const lightness = shell.color_l_mean ?? 0.5;
  const chroma = shell.color_chroma_mean ?? 0.1;
  const hue = ((Math.atan2(shell.color_hue_sin || 0, shell.color_hue_cos || 1) * 180) / Math.PI + 360) % 360;
  if (lightness > 0.72 && chroma < 0.12) return "ivory";
  if (lightness < 0.32) return "dark brown";
  if (chroma < 0.08) return lightness > 0.58 ? "chalky cream" : "stone gray";
  if (hue < 28 || hue >= 342) return "rose-brown";
  if (hue < 58) return lightness > 0.58 ? "golden cream" : "amber-brown";
  if (hue < 92) return "olive-tan";
  if (hue < 165) return "green-gray";
  if (hue < 235) return "blue-gray";
  if (hue < 292) return "violet-gray";
  return "pink-tan";
}

export function effectiveGeneratedTraits() {
  return state.generatedTraits || shapeTraitsFromShell(state.selected);
}

export function reconstructFromPc() {
  const out = contourFromPcValues(state.pcValues);
  if (!out) return;
  state.generatedContour = out;
  state.generatedTraits = null;
  state.generatedMode = "pca";
  updateGeneratorStatus();
  drawOutline();
}

export function contourFromPcValues(values) {
  const fingerprint = fingerprintFromPcValues(values);
  if (fingerprint) return reconstructContourFromFingerprint(fingerprint, state.contourPoints || 256);
  if (!state.model?.contour_mean?.length || !state.model?.contour_components?.length) return null;
  const valueCount = state.model.contour_mean.length;
  const out = new Float32Array(valueCount);
  for (let index = 0; index < valueCount; index += 1) {
    let value = state.model.contour_mean[index] || 0;
    for (let pc = 0; pc < state.model.contour_components.length; pc += 1) {
      value += (values[pc] || 0) * (state.model.contour_components[pc]?.[index] || 0);
    }
    out[index] = value;
  }
  return out;
}

export function maxContourRadius(contours) {
  let radius = 0;
  for (const contour of contours) {
    if (!contour) continue;
    for (let index = 0; index < contour.length; index += 2) {
      radius = Math.max(radius, Math.hypot(contour[index], contour[index + 1]));
    }
  }
  return radius || 1;
}

export function contourPath(ctx, contour, centerX, centerY, scale) {
  ctx.beginPath();
  const count = Math.floor(contour.length / 2);
  for (let index = 0; index < count; index += 1) {
    const x = centerX + contour[index * 2] * scale;
    const y = centerY + contour[index * 2 + 1] * scale;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export function shellFillColor(traits, alpha = 0.9) {
  const red = Math.round(clamp01(traits?.color_r_mean ?? 0.72) * 255);
  const green = Math.round(clamp01(traits?.color_g_mean ?? 0.66) * 255);
  const blue = Math.round(clamp01(traits?.color_b_mean ?? 0.54) * 255);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function generatedFingerprintHash() {
  const values = state.pcValues.slice(0, 6).map((value) => Number(value || 0).toFixed(4));
  return hashString(`projected|${values.join(",")}`).toString(36).toUpperCase().padStart(6, "0").slice(-6);
}

export function updateHashChips() {
  if (state.selected?.fingerprint_hash && els.physicalHash) {
    applyShellFingerprintStyle(els.physicalHash, state.selected);
  }
  if (els.projectedHash) {
    const hash = state.generatedMode === "selected" && state.selected?.fingerprint_hash
      ? state.selected.fingerprint_hash
      : generatedFingerprintHash();
    if (state.generatedMode === "selected" && state.selected?.fingerprint_hash) {
      applyShellFingerprintStyle(els.projectedHash, state.selected, hash);
    } else {
      applyFingerprintStyle(els.projectedHash, hash);
    }
  }
}

export function drawGeneratedTexture(ctx, contour, centerX, centerY, scale, traits) {
  const pointCount = Math.floor(contour.length / 2);
  if (pointCount < 4) return;
  const roughness = clamp01((traits?.roughness || 0.012) / 0.04);
  const chroma = clamp01((traits?.color_chroma_mean || 0.08) / 0.35);
  const concavity = clamp01((traits?.contour_concavity || 0.04) / 0.35);
  const pattern = clamp01((traits?.color_pattern_strength || 0.06) / 0.22);
  const patternContrast = clamp01((traits?.color_pattern_contrast || 0.04) / 0.18);
  ctx.save();
  contourPath(ctx, contour, centerX, centerY, scale);
  ctx.clip();
  const ringCount = 4 + Math.round(concavity * 4 + pattern * 5);
  for (let ring = 1; ring <= ringCount; ring += 1) {
    contourPath(ctx, contour, centerX, centerY, scale * (0.16 + (ring / (ringCount + 1)) * 0.78));
    ctx.strokeStyle = `rgba(32, 36, 42, ${0.035 + chroma * 0.035 + patternContrast * 0.05})`;
    ctx.lineWidth = 0.8 + pattern * 0.55;
    ctx.stroke();
  }
  const step = Math.max(4, Math.round(16 - roughness * 5 - chroma * 3 - pattern * 6));
  ctx.lineWidth = 0.9 + roughness * 0.8 + pattern * 0.6;
  ctx.strokeStyle = `rgba(32, 36, 42, ${0.07 + roughness * 0.12 + patternContrast * 0.16})`;
  for (let index = 0; index < pointCount; index += step) {
    const x = contour[index * 2];
    const y = contour[index * 2 + 1];
    ctx.beginPath();
    ctx.moveTo(centerX + x * scale * 0.22, centerY + y * scale * 0.22);
    ctx.lineTo(centerX + x * scale * 0.95, centerY + y * scale * 0.95);
    ctx.stroke();
  }
  const gloss = ctx.createRadialGradient(
    centerX - scale * 0.22,
    centerY - scale * 0.28,
    scale * 0.08,
    centerX,
    centerY,
    scale * 1.25,
  );
  gloss.addColorStop(0, "rgba(255, 255, 255, 0.34)");
  gloss.addColorStop(0.45, "rgba(255, 255, 255, 0.08)");
  gloss.addColorStop(1, "rgba(32, 36, 42, 0.08)");
  ctx.fillStyle = gloss;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

export function updateGeneratorStatus() {
  return;
}

export function drawOutline() {
  const { width, height } = els.outline;
  outlineCtx.clearRect(0, 0, width, height);
  outlineCtx.fillStyle = "#f7f7f2";
  outlineCtx.fillRect(0, 0, width, height);
  const contour = state.generatedContour || state.selectedContour;
  if (!contour) return;
  updateHashChips();
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (Math.min(width, height) * 0.42) / maxContourRadius([contour]);
  const traits = effectiveGeneratedTraits();
  outlineCtx.save();
  contourPath(outlineCtx, contour, centerX, centerY, scale);
  outlineCtx.fillStyle = shellFillColor(traits, 0.9);
  outlineCtx.strokeStyle = "#287a74";
  outlineCtx.lineWidth = 3;
  outlineCtx.fill();
  drawGeneratedTexture(outlineCtx, contour, centerX, centerY, scale, traits);
  contourPath(outlineCtx, contour, centerX, centerY, scale);
  outlineCtx.stroke();
  outlineCtx.fillStyle = "#20242a";
  outlineCtx.beginPath();
  outlineCtx.arc(centerX, centerY, 3, 0, Math.PI * 2);
  outlineCtx.fill();
  outlineCtx.restore();
}

export function svgPathFromContour(contour, centerX, centerY, scale) {
  const parts = [];
  const count = Math.floor(contour.length / 2);
  for (let index = 0; index < count; index += 1) {
    const x = centerX + contour[index * 2] * scale;
    const y = centerY + contour[index * 2 + 1] * scale;
    parts.push(`${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  parts.push("Z");
  return parts.join(" ");
}

export function exportGeneratedSvg() {
  const contour = state.generatedContour || state.selectedContour;
  if (!contour) return;
  const size = 512;
  const center = size / 2;
  const scale = (size * 0.42) / maxContourRadius([contour]);
  const path = svgPathFromContour(contour, center, center, scale);
  const fill = shellFillColor(effectiveGeneratedTraits(), 0.86);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#f7f7f2"/><path d="${path}" fill="${fill}" stroke="#287a74" stroke-width="6" stroke-linejoin="round"/></svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "seashell-generated.svg";
  link.click();
  URL.revokeObjectURL(url);
}
