// @ts-nocheck

import { centerViewportOnShell, refreshPcaControlLabels } from './conservation-controls';
import { els, state } from './runtime';
import { selectShell } from './selection-palette';
import { drawNeighborContour } from './source-neighbors';
import { datasetAsset } from './utils';

export const pcaAxisNamesKey = "shellspace-pca-axis-names";

export function loadPcaAxisNames() {
  try {
    const names = JSON.parse(localStorage.getItem(pcaAxisNamesKey) || "[]");
    state.pcaAxisNames = Array.isArray(names) ? names.map((name) => String(name || "")) : [];
  } catch (_error) {
    state.pcaAxisNames = [];
  }
}

function savePcaAxisNames() {
  try {
    localStorage.setItem(pcaAxisNamesKey, JSON.stringify(state.pcaAxisNames || []));
  } catch (_error) {
    // Best effort.
  }
}

function shellByPairId(id) {
  return state.shellById.get(Number(id)) || null;
}

function shellPreview(shell, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "pca-guide-shell";
  button.title = shell?.species || "";
  const frame = document.createElement("span");
  frame.className = "pca-guide-shell-frame";
  const image = document.createElement("img");
  image.alt = shell?.species || "";
  image.loading = "lazy";
  image.decoding = "async";
  image.hidden = true;
  const canvas = document.createElement("canvas");
  canvas.width = 148;
  canvas.height = 104;
  if (shell) drawNeighborContour(canvas, shell);
  if (shell?.file) {
    image.src = datasetAsset(shell.file);
    image.onload = () => {
      image.hidden = false;
      canvas.hidden = true;
    };
    image.onerror = () => {
      image.hidden = true;
      canvas.hidden = false;
    };
  } else {
    image.hidden = true;
  }
  frame.append(image, canvas);
  const caption = document.createElement("span");
  caption.textContent = label;
  const name = document.createElement("strong");
  name.textContent = shell?.species || "Unknown";
  button.append(frame, caption, name);
  button.addEventListener("click", () => {
    if (!shell) return;
    centerViewportOnShell(shell);
    selectShell(shell);
    closePcaGuide();
  });
  return button;
}

function pairRow(pair) {
  const lowShell = shellByPairId(pair.low_shell_id);
  const highShell = shellByPairId(pair.high_shell_id);
  const row = document.createElement("article");
  row.className = "pca-guide-row";

  const header = document.createElement("div");
  header.className = "pca-guide-row-header";
  const title = document.createElement("h3");
  const defaultLabel = `PC${pair.axis + 1}`;
  title.textContent = state.pcaAxisNames?.[pair.axis] || defaultLabel;
  title.contentEditable = "true";
  title.spellcheck = false;
  title.setAttribute("role", "textbox");
  title.setAttribute("aria-label", `Name ${defaultLabel}`);
  title.addEventListener("input", () => {
    const text = title.textContent.trim();
    state.pcaAxisNames[pair.axis] = text === defaultLabel ? "" : text;
    savePcaAxisNames();
    refreshPcaControlLabels();
  });
  title.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      title.blur();
    }
  });
  title.addEventListener("blur", () => {
    if (!title.textContent.trim()) title.textContent = defaultLabel;
  });
  header.append(title);

  const shells = document.createElement("div");
  shells.className = "pca-guide-shells";
  shells.append(
    shellPreview(lowShell, "Low"),
    shellPreview(highShell, "High"),
  );

  row.append(header, shells);
  return row;
}

export function renderPcaGuide() {
  if (!els.pcaGuideList) return;
  const pairs = state.model?.contour_pca_diametric_pairs || [];
  els.pcaGuideList.innerHTML = "";
  if (!pairs.length) {
    const empty = document.createElement("p");
    empty.className = "pca-guide-empty";
    empty.textContent = "No PCA contrast pairs are available yet.";
    els.pcaGuideList.append(empty);
    return;
  }
  for (const pair of pairs.slice(0, 6)) {
    els.pcaGuideList.append(pairRow(pair));
  }
}

export function openPcaGuide() {
  renderPcaGuide();
  if (els.pcaGuideModal) els.pcaGuideModal.hidden = false;
}

export function closePcaGuide() {
  if (els.pcaGuideModal) els.pcaGuideModal.hidden = true;
}
