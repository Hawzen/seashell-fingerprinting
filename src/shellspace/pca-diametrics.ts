// @ts-nocheck

const EXTREME_FRACTION = 0.28;
const NEAREST_CANDIDATES = 12;

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

function pointForShell(shell, axes, ranges) {
  return axes.map((axis) => normalizedPc(shell, axis, ranges));
}

function distanceSq(a, b) {
  let distance = 0;
  for (let index = 0; index < a.length; index += 1) {
    const delta = (a[index] || 0) - (b[index] || 0);
    distance += delta * delta;
  }
  return distance;
}

function buildKdTree(items, depth = 0) {
  if (!items.length) return null;
  const dimensions = items[0].point.length || 1;
  const axis = depth % dimensions;
  const sorted = items.slice().sort((a, b) => (a.point[axis] || 0) - (b.point[axis] || 0));
  const median = Math.floor(sorted.length / 2);
  return {
    axis,
    item: sorted[median],
    left: buildKdTree(sorted.slice(0, median), depth + 1),
    right: buildKdTree(sorted.slice(median + 1), depth + 1),
  };
}

function pushNearest(best, item, distance, limit) {
  if (!item || !Number.isFinite(distance)) return;
  best.push({ item, distance });
  best.sort((a, b) => b.distance - a.distance);
  if (best.length > limit) best.length = limit;
}

function queryKdTree(node, point, limit, best = []) {
  if (!node) return best;
  const axis = node.axis;
  const delta = (point[axis] || 0) - (node.item.point[axis] || 0);
  const near = delta <= 0 ? node.left : node.right;
  const far = delta <= 0 ? node.right : node.left;
  queryKdTree(near, point, limit, best);
  pushNearest(best, node.item, distanceSq(point, node.item.point), limit);
  const worst = best.length < limit ? Infinity : best[0].distance;
  if (delta * delta <= worst) queryKdTree(far, point, limit, best);
  return best;
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
  const otherAxes = axes.filter((candidate) => candidate !== axis);
  const ranked = shells
    .filter((shell) => shell?.contour_pc?.length > axis)
    .map((shell) => ({
      shell,
      target: normalizedPc(shell, axis, ranges),
      point: pointForShell(shell, otherAxes, ranges),
    }))
    .sort((a, b) => a.target - b.target);

  if (ranked.length < 2) return null;
  if (!otherAxes.length) {
    const low = ranked[0];
    const high = ranked[ranked.length - 1];
    return pairRecord(axis, low, high, Math.abs(high.target - low.target), 0);
  }

  const sideCount = Math.max(2, Math.min(Math.ceil(ranked.length * EXTREME_FRACTION), Math.floor(ranked.length / 2)));
  const lowSide = ranked.slice(0, sideCount);
  const highSide = ranked.slice(-sideCount);
  const highTree = buildKdTree(highSide);
  const lowTree = buildKdTree(lowSide);
  let best = null;

  const consider = (source, target) => {
    if (!source || !target || source.shell.id === target.shell.id) return;
    const targetDelta = Math.abs(target.target - source.target);
    const orthogonalDistance = Math.sqrt(distanceSq(source.point, target.point));
    const score = pairScore(targetDelta, orthogonalDistance);
    if (!best || score > best.score) {
      best = { source, target, targetDelta, orthogonalDistance, score };
    }
  };

  for (const item of lowSide) {
    for (const neighbor of queryKdTree(highTree, item.point, NEAREST_CANDIDATES, [])) {
      consider(item, neighbor.item);
    }
  }
  for (const item of highSide) {
    for (const neighbor of queryKdTree(lowTree, item.point, NEAREST_CANDIDATES, [])) {
      consider(item, neighbor.item);
    }
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
