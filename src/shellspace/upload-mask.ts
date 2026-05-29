// @ts-nocheck

import { state } from './runtime';
import { labFromRgb, percentile } from './upload-python';
import { clamp01, contourRoughness } from './utils';

export function estimateBorderBackground(data, width, height) {
  const step = Math.max(1, Math.floor((width + height) / 260));
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  const sample = (x, y) => {
    const offset = (y * width + x) * 4;
    r += data[offset];
    g += data[offset + 1];
    b += data[offset + 2];
    count += 1;
  };
  for (let x = 0; x < width; x += step) {
    sample(x, 0);
    sample(x, height - 1);
  }
  for (let y = 0; y < height; y += step) {
    sample(0, y);
    sample(width - 1, y);
  }
  return [r / Math.max(1, count), g / Math.max(1, count), b / Math.max(1, count)];
}

export function otsuThreshold(values) {
  const bins = 256;
  const hist = new Uint32Array(bins);
  let maxValue = 1;
  for (const value of values) maxValue = Math.max(maxValue, value);
  for (const value of values) {
    hist[Math.min(bins - 1, Math.floor((value / maxValue) * (bins - 1)))] += 1;
  }
  let sum = 0;
  let total = 0;
  for (let index = 0; index < bins; index += 1) {
    sum += index * hist[index];
    total += hist[index];
  }
  let sumBack = 0;
  let weightBack = 0;
  let best = 0;
  let bestVariance = 0;
  for (let index = 0; index < bins; index += 1) {
    weightBack += hist[index];
    if (!weightBack) continue;
    const weightFore = total - weightBack;
    if (!weightFore) break;
    sumBack += index * hist[index];
    const meanBack = sumBack / weightBack;
    const meanFore = (sum - sumBack) / weightFore;
    const variance = weightBack * weightFore * (meanBack - meanFore) ** 2;
    if (variance > bestVariance) {
      bestVariance = variance;
      best = index;
    }
  }
  return (best / (bins - 1)) * maxValue;
}

export function largestMaskComponent(mask, width, height) {
  const visited = new Uint8Array(mask.length);
  const queue = new Int32Array(mask.length);
  let bestStart = -1;
  let bestCount = 0;
  for (let start = 0; start < mask.length; start += 1) {
    if (!mask[start] || visited[start]) continue;
    let head = 0;
    let tail = 0;
    let count = 0;
    visited[start] = 1;
    queue[tail] = start;
    tail += 1;
    while (head < tail) {
      const here = queue[head];
      head += 1;
      count += 1;
      const x = here % width;
      const y = Math.floor(here / width);
      const neighbors = [here - 1, here + 1, here - width, here + width];
      for (const next of neighbors) {
        if (next < 0 || next >= mask.length || visited[next] || !mask[next]) continue;
        const nx = next % width;
        const ny = Math.floor(next / width);
        if (Math.abs(nx - x) + Math.abs(ny - y) !== 1) continue;
        visited[next] = 1;
        queue[tail] = next;
        tail += 1;
      }
    }
    if (count > bestCount) {
      bestCount = count;
      bestStart = start;
    }
  }
  const output = new Uint8Array(mask.length);
  if (bestStart < 0) return output;
  queue.fill(0);
  visited.fill(0);
  let head = 0;
  let tail = 0;
  visited[bestStart] = 1;
  queue[tail] = bestStart;
  tail += 1;
  while (head < tail) {
    const here = queue[head];
    head += 1;
    output[here] = 1;
    const x = here % width;
    const y = Math.floor(here / width);
    for (const next of [here - 1, here + 1, here - width, here + width]) {
      if (next < 0 || next >= mask.length || visited[next] || !mask[next]) continue;
      const nx = next % width;
      const ny = Math.floor(next / width);
      if (Math.abs(nx - x) + Math.abs(ny - y) !== 1) continue;
      visited[next] = 1;
      queue[tail] = next;
      tail += 1;
    }
  }
  return output;
}

export function isolateUploadMask(imageData) {
  const { data, width, height } = imageData;
  const background = estimateBorderBackground(data, width, height);
  const diffs = new Float32Array(width * height);
  for (let index = 0; index < width * height; index += 1) {
    const offset = index * 4;
    diffs[index] = Math.hypot(
      data[offset] - background[0],
      data[offset + 1] - background[1],
      data[offset + 2] - background[2],
    );
  }
  const threshold = Math.max(14, otsuThreshold(diffs) * 0.72);
  const mask = new Uint8Array(width * height);
  for (let index = 0; index < mask.length; index += 1) {
    mask[index] = diffs[index] > threshold && data[index * 4 + 3] > 20 ? 1 : 0;
  }
  return largestMaskComponent(mask, width, height);
}

export function contourFromUploadMask(mask, width, height, pointCount) {
  let area = 0;
  let sumX = 0;
  let sumY = 0;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let index = 0; index < mask.length; index += 1) {
    if (!mask[index]) continue;
    const x = index % width;
    const y = Math.floor(index / width);
    area += 1;
    sumX += x;
    sumY += y;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  if (area < 32) throw new Error("The uploaded shell mask is too small.");
  const centerX = sumX / area;
  const centerY = sumY / area;
  const maxRadius = Math.ceil(Math.hypot(Math.max(centerX, width - centerX), Math.max(centerY, height - centerY))) + 2;
  const points = [];
  const radii = [];
  for (let point = 0; point < pointCount; point += 1) {
    const angle = -Math.PI / 2 + (point / pointCount) * Math.PI * 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    let lastX = centerX;
    let lastY = centerY;
    let lastRadius = 0;
    for (let radius = 0; radius <= maxRadius; radius += 0.75) {
      const x = Math.round(centerX + dx * radius);
      const y = Math.round(centerY + dy * radius);
      if (x < 0 || x >= width || y < 0 || y >= height) break;
      if (mask[y * width + x]) {
        lastX = x;
        lastY = y;
        lastRadius = radius;
      }
    }
    points.push([lastX, lastY]);
    radii.push(lastRadius);
  }
  const meanRadius = radii.reduce((total, value) => total + value, 0) / Math.max(1, radii.length);
  const contour = new Float32Array(pointCount * 2);
  for (let point = 0; point < pointCount; point += 1) {
    contour[point * 2] = (points[point][0] - centerX) / Math.max(1e-6, meanRadius);
    contour[point * 2 + 1] = (points[point][1] - centerY) / Math.max(1e-6, meanRadius);
  }
  const bboxArea = Math.max(1, (maxX - minX + 1) * (maxY - minY + 1));
  return {
    contour,
    center: [centerX, centerY],
    meanRadius,
    area,
    bbox: [minX, minY, maxX, maxY],
    aspectRatio: Math.max((maxX - minX + 1) / Math.max(1, maxY - minY + 1), (maxY - minY + 1) / Math.max(1, maxX - minX + 1)),
    roughness: contourRoughness(contour),
    concavity: clamp01(1 - area / bboxArea),
  };
}

export function traitsFromUpload(imageData, mask, geometry) {
  const { data, width, height } = imageData;
  const lumaImage = new Float32Array(width * height);
  const luma = [];
  const chroma = [];
  const saturation = [];
  let rTotal = 0;
  let gTotal = 0;
  let bTotal = 0;
  let labL = 0;
  let labA = 0;
  let labB = 0;
  let hueSin = 0;
  let hueCos = 0;
  let hueWeight = 0;
  for (let index = 0; index < width * height; index += 1) {
    const offset = index * 4;
    lumaImage[index] = (0.2126 * data[offset] + 0.7152 * data[offset + 1] + 0.0722 * data[offset + 2]) / 255;
  }
  for (let index = 0; index < mask.length; index += 1) {
    if (!mask[index]) continue;
    const offset = index * 4;
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const lab = labFromRgb(red, green, blue);
    const maxRgb = Math.max(red, green, blue) / 255;
    const minRgb = Math.min(red, green, blue) / 255;
    const sat = maxRgb <= 0 ? 0 : (maxRgb - minRgb) / maxRgb;
    const hue = Math.atan2(Math.sqrt(3) * (green - blue), 2 * red - green - blue);
    const hueW = Math.max(sat, 0.05);
    rTotal += red / 255;
    gTotal += green / 255;
    bTotal += blue / 255;
    labL += lab.l;
    labA += lab.a;
    labB += lab.b;
    hueSin += Math.sin(hue) * hueW;
    hueCos += Math.cos(hue) * hueW;
    hueWeight += hueW;
    luma.push(lab.l);
    chroma.push(Math.hypot(lab.a, lab.b));
    saturation.push(sat);
  }
  const count = Math.max(1, luma.length);
  const mean = (values) => values.reduce((total, value) => total + value, 0) / Math.max(1, values.length);
  const std = (values, center) =>
    Math.sqrt(values.reduce((total, value) => total + (value - center) ** 2, 0) / Math.max(1, values.length));
  const lMean = mean(luma);
  const cMean = mean(chroma);
  const sMean = mean(saturation);
  const sortedLuma = [...luma].sort((a, b) => a - b);
  let gradientTotal = 0;
  let residualValues = [];
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x;
      if (!mask[index]) continue;
      const gx = lumaImage[index + 1] - lumaImage[index - 1];
      const gy = lumaImage[index + width] - lumaImage[index - width];
      const local =
        (lumaImage[index - width] +
          lumaImage[index + width] +
          lumaImage[index - 1] +
          lumaImage[index + 1] +
          lumaImage[index]) /
        5;
      gradientTotal += Math.hypot(gx, gy);
      residualValues.push(lumaImage[index] - local);
    }
  }
  const residualMean = mean(residualValues);
  const textureResidual = std(residualValues, residualMean);
  const textureIqr = percentile(sortedLuma, 0.75) - percentile(sortedLuma, 0.25);
  const patternStrength = clamp01(
    (std(luma, lMean) * 1.7 +
      std(chroma, cMean) * 2.2 +
      std(saturation, sMean) * 0.9 +
      textureResidual * 10 +
      textureIqr * 1.2 +
      clamp01((gradientTotal / Math.max(1, residualValues.length)) / 1.5)) /
      6,
  );
  const patternContrast = clamp01((std(luma, lMean) * 2 + textureResidual * 12 + textureIqr * 1.3) / 3);
  const patternChroma = clamp01((std(chroma, cMean) * 2.6 + std(saturation, sMean) * 1.2) / 2);
  return {
    visible_shell_ratio: 1,
    mask_ratio: geometry.area / Math.max(1, width * height),
    area: geometry.area,
    center: geometry.center,
    bbox: geometry.bbox,
    mean_radius: geometry.meanRadius,
    image_width: width,
    image_height: height,
    roughness: geometry.roughness,
    aspect_ratio: geometry.aspectRatio,
    contour_solidity: 1 - geometry.concavity,
    contour_concavity: geometry.concavity,
    color_r_mean: rTotal / count,
    color_g_mean: gTotal / count,
    color_b_mean: bTotal / count,
    color_l_mean: labL / count,
    color_l_std: std(luma, lMean),
    color_a_mean: labA / count,
    color_b_lab_mean: labB / count,
    color_chroma_mean: cMean,
    color_chroma_std: std(chroma, cMean),
    color_saturation_mean: sMean,
    color_saturation_std: std(saturation, sMean),
    color_hue_sin: hueSin / Math.max(1, hueWeight),
    color_hue_cos: hueCos / Math.max(1, hueWeight),
    texture_gradient_mean: gradientTotal / Math.max(1, residualValues.length),
    texture_residual_std: textureResidual,
    texture_luma_iqr: textureIqr,
    color_pattern_strength: patternStrength,
    color_pattern_contrast: patternContrast,
    color_pattern_chroma: patternChroma,
  };
}

export function projectContourToPca(contour) {
  const mean = state.model.contour_mean || [];
  const components = state.model.contour_components || [];
  return components.map((component) => {
    let score = 0;
    for (let index = 0; index < Math.min(contour.length, mean.length, component.length); index += 1) {
      score += (contour[index] - mean[index]) * component[index];
    }
    return score;
  });
}

export function transformedTraitValue(field, value) {
  const number = Number(value || 0);
  if (field === "aspect_ratio") return Math.log1p(Math.max(0, number));
  if (
    [
      "roughness",
      "contour_concavity",
      "texture_gradient_mean",
      "texture_residual_std",
      "color_pattern_strength",
      "color_pattern_contrast",
      "color_pattern_chroma",
    ].includes(field)
  ) {
    return Math.log1p(Math.max(0, number) * 64);
  }
  return number;
}

export function projectTraitsToPca(shell) {
  const schema = state.model.trait_feature_schema || [];
  const mean = state.model.trait_mean || [];
  const components = state.model.trait_components || [];
  if (!schema.length || !components.length) return [];
  const standardized = schema.map((spec, index) => {
    let raw = 0;
    if (String(spec.name || "").startsWith("contour_pc")) {
      const pcIndex = Number(String(spec.name).replace("contour_pc", "")) - 1;
      raw = shell.contour_pc?.[pcIndex] || 0;
    } else {
      raw = transformedTraitValue(spec.name, shell[spec.name]);
    }
    return ((raw - (spec.mean || 0)) / Math.max(1e-9, spec.scale || 1)) * (spec.weight || 1) - (mean[index] || 0);
  });
  return components.map((component) =>
    component.reduce((total, loading, index) => total + (standardized[index] || 0) * loading, 0),
  );
}
