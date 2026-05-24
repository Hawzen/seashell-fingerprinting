// @ts-nocheck

import { els, state } from './runtime';

export function parseHashState() {
  const raw = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  return new URLSearchParams(raw);
}

export function updateHashState() {
  if (!state.hashReady || state.suppressHash) return;
  const params = new URLSearchParams();
  if (state.selected) params.set("id", String(state.selected.id));
  params.set("x", String(state.xAxis));
  params.set("y", String(state.yAxis));
  params.set("color", state.colorMode);
  params.set("pc", state.pcValues.slice(0, 6).map((value) => Number(value).toFixed(3)).join(","));
  const next = `${window.location.pathname}${window.location.search}#${params.toString()}`;
  window.history.replaceState(null, "", next);
}

export function scheduleHashUpdate() {
  if (!state.hashReady || state.suppressHash) return;
  window.clearTimeout(state.hashTimer);
  state.hashTimer = window.setTimeout(updateHashState, 80);
}

export function resizeCanvas(canvas, ctx) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (canvas === els.scatter) {
      state.needsDraw = true;
      state.scatterHitCache = null;
      state.scatterPointCache = null;
    }
  }
  return { width: rect.width, height: rect.height };
}
