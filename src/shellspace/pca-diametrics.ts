// @ts-nocheck

const EXTREME_FRACTION = 0.28;
// Keep guide-pair search bounded on the full dataset.
const MAX_SIDE_CANDIDATES = 384;

function pcaSpan(range) {
  if (!range) return 1;
  const pSpan = Math.abs(Number(range.p99 || 0) - Number(range.p01 || 0));
  const fullSpan = Math.abs(Number(range.max || 0) - Number(range.min || 0));
  return Math.max(0.001, pSpan || fullSpan || 1);
}

function normalizedPc(shell, axis, ranges) {
  const range = ranges?.[axis] || {};
  const center = ((Number(range.p01 || 0) + Number(range.p99 || 0)) / 2) || 0;
  return (Number(shell.contour_pc?.[axis] || 0) - center) / pcaSpan(range);
}

function orthogonalDistanceSq(a, b, targetAxis, axes, ranges) {
  let distance = 0;
  for (const axis of axes) {
    if (axis === targetAxis) continue;
    const delta = normalizedPc(a.shell, axis, ranges) - normalizedPc(b.shell, axis, ranges);
    distance += delta * delta;
  }
  return distance;
}

function pairScore(targetDelta, orthogonalDistance) {
  return targetDelta / (0.05 + orthogonalDistance);
}

function pairRecord(axis, a, b, targetDelta, orthogonalDistance) {
  const low = a.target <= b.target ? a : b;
  const high = a.target <= b.target ? b : a;
  return {
    axis,
    axis_label: `PC${axis + 1}`,
    low_shell_id: low.shell.id,
    high_shell_id: high.shell.id,
    low_file: low.shell.file,
    high_file: high.shell.file,
    low_species: low.shell.species,
    high_species: high.shell.species,
    normalized_target_delta: Math.round(targetDelta * 10000) / 10000,
    orthogonal_distance: Math.round(orthogonalDistance * 10000) / 10000,
    score: Math.round(pairScore(targetDelta, orthogonalDistance) * 10000) / 10000,
  };
}

function bestCrossExtremePair(shells, axis, axes, ranges) {
  const ranked = shells
    .filter((shell) => shell?.contour_pc?.length > axis)
    .map((shell) => ({
      shell,
      target: normalizedPc(shell, axis, ranges),
    }))
    .sort((a, b) => a.target - b.target);

  if (ranked.length < 2) return null;
  if (axes.length <= 1) {
    const low = ranked[0];
    const high = ranked[ranked.length - 1];
    return pairRecord(axis, low, high, Math.abs(high.target - low.target), 0);
  }

  const sideCount = Math.max(2, Math.min(
    Math.ceil(ranked.length * EXTREME_FRACTION),
    Math.floor(ranked.length / 2),
    MAX_SIDE_CANDIDATES,
  ));
  const lowSide = ranked.slice(0, sideCount);
  const highSide = ranked.slice(-sideCount);
  let best = null;

  const consider = (source, target) => {
    if (!source || !target || source.shell.id === target.shell.id) return;
    const targetDelta = Math.abs(target.target - source.target);
    const orthogonalDistance = Math.sqrt(orthogonalDistanceSq(source, target, axis, axes, ranges));
    const score = pairScore(targetDelta, orthogonalDistance);
    if (!best || score > best.score) {
      best = { source, target, targetDelta, orthogonalDistance, score };
    }
  };

  for (const item of lowSide) {
    for (const candidate of highSide) consider(item, candidate);
  }

  return best ? pairRecord(axis, best.source, best.target, best.targetDelta, best.orthogonalDistance) : null;
}

export function computePcaDiametricPairs(shells, ranges, { axisCount = null } = {}) {
  const usable = (shells || []).filter((shell) => shell?.contour_pc?.length);
  if (usable.length < 2) return [];
  const dimensions = Math.min(
    axisCount || usable[0].contour_pc.length,
    usable[0].contour_pc.length,
    ranges?.length || usable[0].contour_pc.length,
  );
  const axes = Array.from({ length: dimensions }, (_, axis) => axis);
  return axes
    .map((axis) => bestCrossExtremePair(usable, axis, axes, ranges))
    .filter(Boolean);
}
