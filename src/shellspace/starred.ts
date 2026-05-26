// @ts-nocheck

import { centerViewportOnShell, shellById } from './conservation-controls';
import { starStorageKey } from './constants';
import { els, state } from './runtime';
import { selectShell } from './selection-palette';
import { loadShellCutoutImage, setCachedShellCutoutImage } from './shell-cutouts';

let starredDockFrame = 0;
let starredDockClientX = 0;

export function loadStarred() {
  try {
    const raw = JSON.parse(localStorage.getItem(starStorageKey) || "[]");
    state.starredIds = Array.isArray(raw) ? raw.filter((id) => Number.isFinite(Number(id))).map(Number) : [];
  } catch (_error) {
    state.starredIds = [];
  }
}

export function saveStarred() {
  localStorage.setItem(starStorageKey, JSON.stringify(state.starredIds.slice(0, 80)));
}

export function isStarred(shell) {
  return Boolean(shell && state.starredIds.includes(shell.id));
}

export function updateStarButton() {
  if (!els.starShell) return;
  const active = isStarred(state.selected);
  els.starShell.setAttribute("aria-pressed", active ? "true" : "false");
  els.starShell.title = active ? "Unstar this shape" : "Star this shape";
  els.starShell.setAttribute("aria-label", active ? "Unstar this shape" : "Star this shape");
}

export function toggleStarredShell() {
  if (!state.selected) return;
  window.clearTimeout(state.neighborTimer);
  const id = state.selected.id;
  const active = isStarred(state.selected);
  state.starredIds = state.starredIds.filter((value) => value !== id);
  if (!active) {
    state.starredIds.unshift(id);
    window.requestAnimationFrame(() => {
      els.starShell.classList.remove("star-pop");
      els.starShell.classList.add("star-pop");
      triggerStarBurst();
      window.setTimeout(() => els.starShell.classList.remove("star-pop"), 850);
    });
  }
  updateStarButton();
  renderStarred();
  window.setTimeout(saveStarred, 0);
}

export function triggerStarBurst() {
  if (!els.starBurst || !els.starShell) return;
  const starRect = els.starShell.getBoundingClientRect();
  const targetRect = els.starredBand?.getBoundingClientRect();
  const startX = starRect.left + starRect.width / 2;
  const startY = starRect.top + starRect.height / 2;
  const endX = targetRect ? targetRect.left + Math.min(70, targetRect.width * 0.4) : startX;
  const endY = targetRect ? targetRect.top + targetRect.height / 2 : startY - 60;
  els.starBurst.style.setProperty("--burst-start-x", `${startX}px`);
  els.starBurst.style.setProperty("--burst-start-y", `${startY}px`);
  els.starBurst.style.setProperty("--burst-end-x", `${endX}px`);
  els.starBurst.style.setProperty("--burst-end-y", `${endY}px`);
  els.starBurst.innerHTML = "";
  for (let index = 0; index < 9; index += 1) {
    const spark = document.createElement("span");
    spark.style.setProperty("--spark-angle", `${index * 40 - 20}deg`);
    spark.style.setProperty("--spark-distance", `${24 + (index % 3) * 10}px`);
    spark.style.setProperty("--spark-delay", `${index * 18}ms`);
    els.starBurst.append(spark);
  }
  els.starBurst.classList.remove("is-active");
  void els.starBurst.offsetWidth;
  els.starBurst.classList.add("is-active");
  window.setTimeout(() => els.starBurst.classList.remove("is-active"), 900);
}

export function starredShelfSelection() {
  if (state.showAllStars) {
    const items = [];
    for (const id of state.starredIds) {
      const shell = shellById(id);
      if (shell) items.push({ shell });
    }
    return { items, hidden: 0 };
  }
  const available = Math.max(44, els.starredBand?.clientWidth || 0);
  const items = [];
  let used = 0;
  let hidden = 0;
  for (let index = 0; index < state.starredIds.length; index += 1) {
    const shell = shellById(state.starredIds[index]);
    if (!shell) continue;
    const item = { shell };
    const itemWidth = 71;
    const remainingAfter = state.starredIds.length - index - 1;
    const reserveMoreButton = remainingAfter > 0 ? 54 : 0;
    if (items.length > 0 && used + itemWidth + reserveMoreButton > available) {
      hidden = remainingAfter + 1;
      break;
    }
    items.push(item);
    used += itemWidth;
  }
  return { items, hidden };
}

export function renderStarred() {
  if (!els.starredBand) return;
  els.starredBand.innerHTML = "";
  state.starredHydratedCount = 0;
  state.starredThumbs = [];
  const { items, hidden } = starredShelfSelection();
  for (const { shell } of items) {
    const button = document.createElement("button");
    button.className = "starred-shell";
    button.title = `${shell.species} ${shell.fingerprint_hash}`;
    button.dataset.shellId = String(shell.id);
    const image = document.createElement("img");
    image.alt = shell.species;
    button.append(image);
    state.starredThumbs.push({ button, image, shell });
    button.addEventListener("click", () => {
      centerViewportOnShell(shell);
      selectShell(shell);
    });
    els.starredBand.append(button);
    setCachedShellCutoutImage(image, shell);
  }
  if (hidden > 0 || state.showAllStars) {
    const more = document.createElement("button");
    more.className = "starred-more";
    more.textContent = state.showAllStars ? "Less" : `+${hidden}`;
    more.title = state.showAllStars ? "Show fewer starred shells" : "Show all starred shells";
    more.addEventListener("click", () => {
      state.showAllStars = !state.showAllStars;
      renderStarred();
    });
    els.starredBand.append(more);
  }
  queueStarredImageHydration(0);
}

export async function warmStarredCutoutCache({ limit = 80, onProgress = null } = {}) {
  const shells = [];
  for (const id of state.starredIds.slice(0, limit)) {
    const shell = shellById(id);
    if (shell?.file) shells.push(shell);
  }
  let loaded = 0;
  for (const shell of shells) {
    if (onProgress) onProgress({ shell, loaded, total: shells.length });
    await loadShellCutoutImage(shell, { priority: -2 });
    loaded += 1;
  }
  if (onProgress) onProgress({ shell: null, loaded, total: shells.length });
  return loaded;
}

export function queueStarredImageHydration(delay = 3000) {
  if (!els.starredBand) return;
  state.starredHydrationRun += 1;
  const run = state.starredHydrationRun;
  window.clearTimeout(state.starredHydrationTimer);
  state.starredHydrationTimer = window.setTimeout(() => hydrateVisibleStarredImages(run), delay);
}

export async function hydrateVisibleStarredImages(run) {
  if (!els.starredBand || run !== state.starredHydrationRun) return;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const thumbs = state.starredThumbs
    .filter(({ button }) => {
      const rect = button.getBoundingClientRect();
      return rect.right >= 0 && rect.left <= viewportWidth && rect.bottom >= 0 && rect.top <= viewportHeight;
    })
    .slice(0, 18);
  for (const { image, shell } of thumbs) {
    if (run !== state.starredHydrationRun) return;
    if (!image || !shell) continue;
    await waitForIdle();
    if (run !== state.starredHydrationRun || !image.isConnected) return;
    if (setCachedShellCutoutImage(image, shell)) state.starredHydratedCount += 1;
  }
}

export function waitForIdle() {
  return new Promise((resolve) => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(resolve, { timeout: 300 });
    } else {
      window.setTimeout(resolve, 80);
    }
  });
}

export function updateStarredDock(event) {
  starredDockClientX = event.clientX;
  if (starredDockFrame) return;
  starredDockFrame = window.requestAnimationFrame(renderStarredDock);
}

export function renderStarredDock() {
  starredDockFrame = 0;
  if (!els.starredBand) return;
  if (!state.starredThumbs.length) return;
  const bandRect = els.starredBand.getBoundingClientRect();
  for (const { button } of state.starredThumbs) {
    const centerX = bandRect.left + button.offsetLeft + button.offsetWidth / 2;
    const influence = Math.max(0, 1 - Math.abs(starredDockClientX - centerX) / 118);
    const eased = influence * influence * (3 - 2 * influence);
    button.style.setProperty("--dock-scale", (1 + eased * 1.08).toFixed(3));
    button.style.setProperty("--dock-lift", `${(18 * eased).toFixed(2)}px`);
    button.style.setProperty("--dock-z", `${Math.round(eased * 100)}`);
  }
}

export function resetStarredDock() {
  if (!els.starredBand) return;
  if (starredDockFrame) {
    window.cancelAnimationFrame(starredDockFrame);
    starredDockFrame = 0;
  }
  for (const { button } of state.starredThumbs) {
    button.style.setProperty("--dock-scale", "1");
    button.style.setProperty("--dock-lift", "0px");
    button.style.setProperty("--dock-z", "0");
  }
}
