// @ts-nocheck

import { syncPcControls, updatePcControl } from './conservation-controls';
import { countryDisplayLabel, formatTopCountries, parseCountryList } from './countries';
import { filterLevels } from './constants';
import { filterValue, updateFilter } from './filters';
import { drawOutline, normalizedContour, reconstructFromPc, shapeTraitsFromShell, shellColorName, updateHashChips } from './geometry-generation';
import { habitatDefs, shellHabitatKeys } from './habitat';
import { axisLabel, axisRange, axisValue, contourAxisCount, scatterHitPoints, scheduleDraw, screenToWorld } from './map-scatter';
import { renderPalette } from './palette';
import { resizeCanvas, scheduleHashUpdate } from './routing-canvas';
import { els, scatterCtx, state } from './runtime';
import { activePcaNeighborAxes, clearNeighborHydration, clearTargetNearestNeighbors, contourPcDistanceStatsToValues, similarityPercentFromStats, renderNeighborsForPc, renderSourceShell, scheduleRenderNeighbors } from './source-neighbors';
import { updateStarButton } from './starred';
import { datasetCmScale, formatNumber, physicalLocationLabel, precisePercentValue, shellAreaCm2, shellMeanRadiusCm } from './utils';
import { stopPcaWalk } from './walk-events';

function knownText(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (["unknown", "not assessed", "data deficient", "locality unavailable"].includes(text.toLowerCase())) return "";
  return text;
}

function triggerDetailFilterFeedback(element) {
  if (!element) return;
  element.classList.remove("detail-filter-ack");
  // Restart the animation when the same item is clicked repeatedly.
  void element.offsetWidth;
  element.classList.add("detail-filter-ack");
  window.setTimeout(() => element.classList.remove("detail-filter-ack"), 620);
}

function applyDetailFilter(setFilter, target) {
  setFilter();
  updateFilter();
  triggerDetailFilterFeedback(target);
}

function detailFilterText(text, setFilter, title = `Filter by ${text}`) {
  const span = document.createElement("span");
  span.textContent = text;
  attachDetailFilterTarget(span, setFilter, title);
  return span;
}

function attachDetailFilterTarget(element, setFilter, title) {
  element.classList.add("detail-filter-target");
  element.tabIndex = 0;
  element.setAttribute("role", "button");
  element.title = title;
  element.addEventListener("click", () => applyDetailFilter(setFilter, element));
  element.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    applyDetailFilter(setFilter, element);
  });
}

function setTaxonomyFilter(value) {
  const next = String(value || "").trim();
  state.categoryFilters.taxonomy = state.categoryFilters.taxonomy === next ? "" : next;
}

function setHabitatFilter(value) {
  const next = value || "";
  state.categoryFilters.habitat = state.categoryFilters.habitat === next ? "" : next;
}

function setCountryFilter(code) {
  const next = `country:${String(code || "").trim().toUpperCase()}`;
  state.categoryFilters.origin = state.categoryFilters.origin === next ? "" : next;
}

function setRarityFilter(value) {
  const next = value || "";
  state.categoryFilters.rarity = state.categoryFilters.rarity === next ? "" : next;
}

function levelForFilterValue(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return filterLevels.find((level) => number >= level.min && number <= level.max) || filterLevels.at(-1) || null;
}

function setRangeLevelFilter(key, value) {
  const level = levelForFilterValue(value);
  if (!level) return;
  const current = state.morphFilters.get(key);
  const same = current
    && Math.abs(current.min - level.min) < 0.01
    && Math.abs(current.max - level.max) < 0.01;
  state.morphFilters.set(key, same ? { min: 0, max: 1 } : { min: level.min, max: level.max });
}

function originFilterValue(shell, label) {
  const code = String(shell?.species_traits?.primary_country || shell?.location_key || "").trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(code) && countryDisplayLabel(code)) return `country:${code}`;
  const region = String(shell?.species_traits?.region_key || shell?.region_key || "").trim();
  if (region && region !== "unknown") return `region:${region}`;
  return label ? `country-search:${label}` : "";
}

function plainJsonValue(value, seen = new WeakSet()) {
  if (value == null) return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "object") return value;
  if (ArrayBuffer.isView(value)) return Array.from(value);
  if (Array.isArray(value)) return value.map((item) => plainJsonValue(item, seen));
  if (seen.has(value)) return "[Circular]";
  seen.add(value);
  const out = {};
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "function") continue;
    out[key] = plainJsonValue(item, seen);
  }
  seen.delete(value);
  return out;
}

function nonEmptyEntries(source, predicate = () => true) {
  const out = {};
  for (const [key, value] of Object.entries(source || {})) {
    if (value == null || value === "") continue;
    if (!predicate(key, value)) continue;
    out[key] = plainJsonValue(value);
  }
  return out;
}

function aphiaTaxonomy(enrichment = {}) {
  const aphia = nonEmptyEntries(enrichment, (key) => key.startsWith("aphia_"));
  const ranks = {};
  const rankIds = {};
  for (const [key, value] of Object.entries(aphia)) {
    if (!key.startsWith("aphia_")) continue;
    if (key.endsWith("_id")) {
      const rank = key.slice("aphia_".length, -"_id".length);
      if (rank && ![
        "accepted",
        "classification",
        "parent",
        "original",
        "taxon_rank",
      ].some((prefix) => rank.startsWith(prefix))) {
        rankIds[rank] = value;
      }
    } else if (![
      "aphia_id",
      "aphia_match_source",
      "aphia_candidate_count",
      "aphia_match_type",
      "aphia_quality_status",
      "aphia_quality_flags",
      "aphia_url",
      "aphia_lsid",
      "aphia_scientific_name",
      "aphia_authority",
      "aphia_taxonomic_status",
      "aphia_unaccept_reason",
      "aphia_taxon_rank_id",
      "aphia_rank",
      "aphia_accepted_id",
      "aphia_accepted_name",
      "aphia_accepted_authority",
      "aphia_parent_id",
      "aphia_original_id",
      "aphia_is_marine",
      "aphia_is_brackish",
      "aphia_is_fresh",
      "aphia_is_terrestrial",
      "aphia_is_extinct",
      "aphia_modified",
      "aphia_citation",
      "aphia_classification_id",
      "aphia_classification_path",
      "aphia_classification_ids",
    ].includes(key)) {
      ranks[key.slice("aphia_".length)] = value;
    }
  }
  return {
    summary: nonEmptyEntries({
      match_source: enrichment.aphia_match_source,
      candidate_count: enrichment.aphia_candidate_count,
      match_type: enrichment.aphia_match_type,
      quality_status: enrichment.aphia_quality_status,
      quality_flags: enrichment.aphia_quality_flags,
      aphia_id: enrichment.aphia_id,
      url: enrichment.aphia_url,
      lsid: enrichment.aphia_lsid,
      scientific_name: enrichment.aphia_scientific_name,
      authority: enrichment.aphia_authority,
      taxonomic_status: enrichment.aphia_taxonomic_status,
      unaccept_reason: enrichment.aphia_unaccept_reason,
      rank: enrichment.aphia_rank,
      accepted_id: enrichment.aphia_accepted_id,
      accepted_name: enrichment.aphia_accepted_name,
      accepted_authority: enrichment.aphia_accepted_authority,
      parent_id: enrichment.aphia_parent_id,
      original_id: enrichment.aphia_original_id,
      modified: enrichment.aphia_modified,
      citation: enrichment.aphia_citation,
    }),
    habitat: nonEmptyEntries({
      marine: enrichment.aphia_is_marine,
      brackish: enrichment.aphia_is_brackish,
      freshwater: enrichment.aphia_is_fresh,
      terrestrial: enrichment.aphia_is_terrestrial,
      extinct: enrichment.aphia_is_extinct,
    }),
    classification: nonEmptyEntries({
      id: enrichment.aphia_classification_id,
      path: enrichment.aphia_classification_path,
      ids: enrichment.aphia_classification_ids,
    }),
    ranks,
    rank_ids: rankIds,
    raw: aphia,
  };
}

function shellInspectPayload(shell) {
  const speciesEnrichment = shell.enrichment || {};
  const shellEnrichment = shell.shell_enrichment || {};
  const contour = normalizedContour(shell);
  return {
    schema: "shellspace-shell-inspect-v2",
    identity: nonEmptyEntries({
      id: shell.id,
      file: shell.file,
      species: shell.species,
      name: shell.name,
      specimen: shell.specimen,
      specimen_label: shell.specimen_label,
      view: shell.view,
      view_label: shell.view_label,
      fingerprint_hash: shell.fingerprint_hash,
      legacy_fingerprint_hash: shell.legacy_fingerprint_hash,
    }),
    taxonomy: aphiaTaxonomy(speciesEnrichment),
    enrichment: {
      species: plainJsonValue(speciesEnrichment),
      shell: plainJsonValue(shellEnrichment),
    },
    occurrence_and_range: nonEmptyEntries({
      rarity_label: shell.rarity_label,
      rarity_reason: shell.rarity_reason,
      country_count: shell.country_count,
      countries_top: shell.countries_top,
      top_countries_label: shell.top_countries_label,
      location_label: shell.location_label,
      location_key: shell.location_key,
      region_label: shell.region_label,
      species_sample_count: shell.species_sample_count,
      species_traits: shell.species_traits,
    }),
    physical_metrics: nonEmptyEntries({
      area_px: shell.area,
      center_px: shell.center,
      bbox_px: shell.bbox,
      image_width_px: shell.image_width,
      image_height_px: shell.image_height,
      area_cm2: shell.area != null && shell.image_width != null && shell.image_height != null ? shellAreaCm2(shell) : null,
      mean_radius_cm: shell.mean_radius != null && shell.image_width != null && shell.image_height != null ? shellMeanRadiusCm(shell) : null,
      frame_cm: shell.image_width != null && shell.image_height != null ? datasetCmScale(shell) : null,
      mean_radius: shell.mean_radius,
      contour_concavity: shell.contour_concavity,
      contour_solidity: shell.contour_solidity,
      morph_traits: shell.morph_traits,
    }),
    visual_traits: nonEmptyEntries({
      color_r_mean: shell.color_r_mean,
      color_g_mean: shell.color_g_mean,
      color_b_mean: shell.color_b_mean,
      color_l_mean: shell.color_l_mean,
      color_a_mean: shell.color_a_mean,
      color_b_lab_mean: shell.color_b_lab_mean,
      color_hue_cos: shell.color_hue_cos,
      color_hue_sin: shell.color_hue_sin,
      color_chroma_mean: shell.color_chroma_mean,
      color_chroma_std: shell.color_chroma_std,
      color_saturation_mean: shell.color_saturation_mean,
      color_saturation_std: shell.color_saturation_std,
      color_pattern_strength: shell.color_pattern_strength,
      color_pattern_contrast: shell.color_pattern_contrast,
      color_pattern_chroma: shell.color_pattern_chroma,
      color_palette_rgb: shell.color_palette_rgb,
      color_palette_weights: shell.color_palette_weights,
      texture_gradient_mean: shell.texture_gradient_mean,
      texture_residual_std: shell.texture_residual_std,
      texture_luma_iqr: shell.texture_luma_iqr,
      lightness_mean: shellEnrichment.lightness_mean,
      asymmetry: shellEnrichment.asymmetry,
      palette_rgb: shellEnrichment.palette_rgb,
      palette_weights: shellEnrichment.palette_weights,
    }),
    embedding: {
      contour_pc: plainJsonValue(shell.contour_pc || []),
      trait_pc: plainJsonValue(shell.trait_pc || []),
    },
    fingerprint: {
      hash: shell.fingerprint_hash || "",
      length: shell.fingerprint?.length || 0,
      values: plainJsonValue(shell.fingerprint || []),
    },
    contour: {
      point_count: contour ? Math.floor(contour.length / 2) : 0,
      normalized_xy: plainJsonValue(contour || []),
      upload_contour: plainJsonValue(shell.upload_contour || null),
    },
    raw_shell: plainJsonValue(shell),
  };
}

function taxonomyRanks(enrichment = {}) {
  return [
    ["class", "class", enrichment.aphia_class],
    ["order", "order", enrichment.aphia_order],
    ["family", "family", enrichment.aphia_family],
    ["genus", "genus", enrichment.aphia_genus],
  ].map(([key, label, value]) => [key, label, String(value || "").trim()])
    .filter(([, , value]) => Boolean(value));
}

function taxonomyPanel(enrichment = {}) {
  const ranks = taxonomyRanks(enrichment);
  if (!ranks.length) return null;

  const rows = document.createElement("dl");
  rows.className = "taxonomy-list";
  rows.setAttribute("aria-label", "Taxonomy ranks");
  for (const [key, label, value] of ranks) {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.className = `taxonomy-value taxonomy-${key}-value`;
    dd.textContent = value;
    const setFilter = () => setTaxonomyFilter(value);
    const title = `Filter by ${label}: ${value}`;
    attachDetailFilterTarget(dt, setFilter, title);
    attachDetailFilterTarget(dd, setFilter, title);
    rows.append(dt, dd);
  }

  return rows;
}

function habitatIconRow(shell) {
  const keys = shellHabitatKeys(shell);
  const habitats = habitatDefs.filter((def) => keys.includes(def.key));
  if (!habitats.length) return null;

  const row = document.createElement("span");
  row.className = "habitat-icons";
  for (const { key, label, icon: svg } of habitats) {
    const icon = document.createElement("span");
    icon.className = `habitat-icon habitat-${key}`;
    icon.title = label;
    icon.setAttribute("aria-label", label);
    icon.setAttribute("role", "img");
    icon.innerHTML = svg;
    attachDetailFilterTarget(icon, () => setHabitatFilter(key), `Filter by habitat: ${label}`);
    row.append(icon);
  }
  return row;
}

function countryFilterRow(value) {
  const countries = parseCountryList(value);
  if (!countries.length) return null;
  const row = document.createElement("span");
  row.className = "country-filter-links";
  for (const country of countries) {
    const label = countryDisplayLabel(country.code) || country.name || country.code;
    const item = detailFilterText(country.flag || country.code, () => setCountryFilter(country.code), `Filter by ${label}`);
    item.classList.add("country-filter-item");
    item.setAttribute("aria-label", label);
    row.append(item);
  }
  return row;
}

function rangeFilterDetail(shell, key, text, label) {
  const value = filterValue(shell, key);
  const level = levelForFilterValue(value);
  if (!level) return [label, text];
  const setFilter = () => setRangeLevelFilter(key, value);
  const title = `Filter ${label}: ${level.label}`;
  return [label, detailFilterText(text, setFilter, title), setFilter, title];
}

export function renderSourceInspect(shell = state.selected) {
  if (!els.sourceInspect || !shell) return;
  els.sourceInspect.innerHTML = "";

  const textarea = document.createElement("textarea");
  textarea.className = "source-fingerprint-json";
  textarea.readOnly = true;
  textarea.spellcheck = false;
  try {
    textarea.value = JSON.stringify(shellInspectPayload(shell), null, 2);
  } catch (error) {
    textarea.value = JSON.stringify({
      schema: "shellspace-shell-inspect-error",
      error: error?.message || "Unable to render shell data.",
      identity: nonEmptyEntries({
        id: shell.id,
        file: shell.file,
        species: shell.species,
        fingerprint_hash: shell.fingerprint_hash,
      }),
      fingerprint: {
        hash: shell.fingerprint_hash || "",
        length: shell.fingerprint?.length || 0,
        values: plainJsonValue(shell.fingerprint || []),
      },
      enrichment: {
        species: plainJsonValue(shell.enrichment || {}),
        shell: plainJsonValue(shell.shell_enrichment || {}),
      },
    }, null, 2);
  }
  textarea.addEventListener("click", () => textarea.select());
  els.sourceInspect.append(textarea);
}

export function setSourceInspectOpen(open) {
  state.sourceInspectOpen = Boolean(open);
  els.sourceFrameBox?.classList.toggle("is-inspecting", state.sourceInspectOpen);
  if (els.sourceInspect) els.sourceInspect.hidden = !state.sourceInspectOpen;
  if (els.sourceInspectToggle) {
    els.sourceInspectToggle.setAttribute("aria-pressed", state.sourceInspectOpen ? "true" : "false");
    els.sourceInspectToggle.title = state.sourceInspectOpen ? "Show shell image" : "Show shell data";
    els.sourceInspectToggle.setAttribute("aria-label", els.sourceInspectToggle.title);
  }
  if (state.sourceInspectOpen) renderSourceInspect();
}

function shellCursorDataUrl(image) {
  if (!image?.src || !(image.naturalWidth || image.width) || !(image.naturalHeight || image.height)) return "";
  const size = 48;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const scale = Math.min((size - 4) / sourceWidth, (size - 4) / sourceHeight);
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const x = Math.round((size - width) / 2);
  const y = Math.round((size - height) / 2);
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(image, x, y, width, height);
  return canvas.toDataURL("image/png");
}

export function setSourceShellCursorOpen(open) {
  state.sourceCursorActive = Boolean(open);
  if (!state.sourceCursorActive) {
    state.sourceCursorUrl = "";
    document.documentElement.classList.remove("shell-cursor-active");
    document.documentElement.style.removeProperty("--shell-cursor");
  } else {
    const dataUrl = sourceShellCursorFromCurrentImage();
    if (!dataUrl) {
      state.sourceCursorActive = false;
    } else {
      state.sourceCursorUrl = dataUrl;
      document.documentElement.style.setProperty("--shell-cursor", `url("${dataUrl}") 24 24`);
      document.documentElement.classList.add("shell-cursor-active");
    }
  }
  if (els.sourceCursorToggle) {
    els.sourceCursorToggle.setAttribute("aria-pressed", state.sourceCursorActive ? "true" : "false");
    els.sourceCursorToggle.title = state.sourceCursorActive ? "Use normal cursor" : "Use shell as cursor";
    els.sourceCursorToggle.setAttribute("aria-label", els.sourceCursorToggle.title);
  }
}

function sourceShellCursorFromCurrentImage() {
  if (!els.sourceImage || els.sourceImage.hidden || !els.sourceImage.src) return "";
  try {
    return shellCursorDataUrl(els.sourceImage);
  } catch (_error) {
    // Cursor preview is decorative; keep the app usable if canvas export fails.
    return "";
  }
}

export function selectShell(shell, { renderNearest = true, preferFastSource = false } = {}) {
  var _a;
  if (!shell) return;
  state.selectionRun += 1;
  state.sourceToken += 1;
  window.clearTimeout(state.sourceLoadTimer);
  clearNeighborHydration({ resetRenderKey: true });
  if (state.walkingPca) stopPcaWalk(false);
  if (shell.id >= 0 && state.uploadImageUrl) {
    URL.revokeObjectURL(state.uploadImageUrl);
    state.uploadImageUrl = "";
  }
  state.selected = shell;
  if (els.sourceSpinner) els.sourceSpinner.hidden = true;
  if (els.sourceImage) {
    els.sourceImage.hidden = true;
    els.sourceImage.removeAttribute("src");
  }
  if (shell.id >= 0) state.mapShellImageIds.add(shell.id);
  state.selectedContour = normalizedContour(shell);
  state.generatedContour = state.selectedContour;
  state.generatedTraits = shapeTraitsFromShell(shell);
  state.generatedMode = "selected";
  (shell.contour_pc || []).forEach((value, index) => {
    state.pcValues[index] = value;
    updatePcControl(index, value);
  });
  els.selectedName.textContent = shell.species;
  setSourceInspectOpen(state.sourceInspectOpen);
  updateHashChips();
  updateStarButton();
  els.selectedDetails.innerHTML = "";
  const topCountryData = shell.countries_top || shell.enrichment?.countries_top || "";
  const topCountries = topCountryData || shell.top_countries_label;
  const taxonomy = taxonomyPanel(shell.enrichment);
  const habitats = habitatIconRow(shell);
  const details = [];
  if (taxonomy) details.push(["Taxonomy", taxonomy]);
  if (habitats) details.push(["Habitat", habitats]);
  const rarityLabel = knownText(shell.rarity_label);
  if (rarityLabel) {
    const setFilter = () => setRarityFilter(rarityLabel);
    details.push(["Rarity", detailFilterText(rarityLabel, setFilter, `Filter by rarity: ${rarityLabel}`), setFilter, `Filter by rarity: ${rarityLabel}`]);
  }
  const countryNode = countryFilterRow(topCountryData);
  const countryLabel = countryNode || formatTopCountries(topCountries);
  if (countryLabel) details.push(["Countries", countryLabel]);
  const originLabel = knownText(physicalLocationLabel(shell));
  if (originLabel) {
    const filter = originFilterValue(shell, originLabel);
    if (filter) {
      const setFilter = () => {
        state.categoryFilters.origin = state.categoryFilters.origin === filter ? "" : filter;
      };
      details.push(["Origin", detailFilterText(originLabel, setFilter, `Filter by origin: ${originLabel}`), setFilter, `Filter by origin: ${originLabel}`]);
    } else {
      details.push(["Origin", originLabel]);
    }
  }
  if (shell.area != null && shell.image_width != null && shell.image_height != null) {
    const text = `${formatNumber(shellAreaCm2(shell), 2)} cm²`;
    details.push(rangeFilterDetail(shell, "area", text, "Area"));
  }
  if (shell.mean_radius != null && shell.image_width != null && shell.image_height != null) details.push(["Mean radius", `${formatNumber(shellMeanRadiusCm(shell), 2)} cm`]);
  if (shell.color_l_mean != null) {
    details.push(rangeFilterDetail(shell, "lightness", precisePercentValue(shell.color_l_mean), "Mean lightness"));
  }
  if (shell.contour_concavity != null) {
    details.push(rangeFilterDetail(shell, "concavity", precisePercentValue(shell.contour_concavity / 0.32), "Concavity"));
  }
  if (((_a = shell.morph_traits) == null ? void 0 : _a.roughness) != null) {
    details.push(rangeFilterDetail(shell, "roughness", precisePercentValue(shell.morph_traits.roughness), "Roughness"));
  }
  if (shell.image_width != null && shell.image_height != null) {
    const scale = datasetCmScale(shell);
    details.push(["Scale", `${formatNumber(scale.widthCm, 2)} x ${formatNumber(scale.heightCm, 2)} cm frame`]);
  }
  for (const [key, value, setFilter, title] of details) {
    if (value == null || value === "") continue;
    const dt = document.createElement("dt");
    dt.textContent = key;
    if (setFilter) attachDetailFilterTarget(dt, setFilter, title);
    const dd = document.createElement("dd");
    if (value instanceof Node) dd.append(value);
    else dd.textContent = value;
    els.selectedDetails.append(dt, dd);
  }
  state.sourceFrame = null;
  renderSourceShell(shell, { preferFastSource });
  if (renderNearest) scheduleRenderNeighbors(shell);
  else els.neighborsList.innerHTML = "";
  drawOutline();
  renderPalette(false);
  scheduleDraw(120);
  scheduleHashUpdate();
}

export function nearestShell(screenX, screenY) {
  const size = resizeCanvas(els.scatter, scatterCtx);
  const hitCache = scatterHitPoints(size);
  let best = null;
  let bestDistance = Infinity;
  const cellX = Math.floor(screenX / hitCache.cellSize);
  const cellY = Math.floor(screenY / hitCache.cellSize);
  for (let radius = 0; radius <= 1; radius += 1) {
    for (let y = cellY - radius; y <= cellY + radius; y += 1) {
      for (let x = cellX - radius; x <= cellX + radius; x += 1) {
        if (radius && x > cellX - radius && x < cellX + radius && y > cellY - radius && y < cellY + radius) {
          continue;
        }
        const bucket = hitCache.grid.get(`${x},${y}`);
        if (!bucket) continue;
        for (const index of bucket) {
          const dx = hitCache.points[index * 2] - screenX;
          const dy = hitCache.points[index * 2 + 1] - screenY;
          const distance = dx * dx + dy * dy;
          if (distance < bestDistance) {
            bestDistance = distance;
            best = hitCache.shells[index];
          }
        }
      }
    }
    if (bestDistance <= 14 * 14) break;
  }
  return bestDistance <= 14 * 14 ? best : null;
}

export function nearestScatterNeighborItems(screenX, screenY, values, limit = 4) {
  state.screenNeighborScanCount += 1;
  const size = resizeCanvas(els.scatter, scatterCtx);
  const hitCache = scatterHitPoints(size);
  if (!hitCache.shells.length) return [];
  const cellX = Math.floor(screenX / hitCache.cellSize);
  const cellY = Math.floor(screenY / hitCache.cellSize);
  const best = [];
  const seen = new Set();
  let worstIndex = -1;
  let worstDistance = -1;
  const maxRadius = Math.ceil(Math.max(size.width, size.height) / hitCache.cellSize);
  for (let radius = 0; radius <= maxRadius; radius += 1) {
    for (let y = cellY - radius; y <= cellY + radius; y += 1) {
      for (let x = cellX - radius; x <= cellX + radius; x += 1) {
        if (radius && x > cellX - radius && x < cellX + radius && y > cellY - radius && y < cellY + radius) continue;
        const bucket = hitCache.grid.get(`${x},${y}`);
        if (!bucket) continue;
        for (const index of bucket) {
          if (seen.has(index)) continue;
          seen.add(index);
          const dx = hitCache.points[index * 2] - screenX;
          const dy = hitCache.points[index * 2 + 1] - screenY;
          const screenDistance = dx * dx + dy * dy;
          if (best.length < limit) {
            best.push({ screenDistance, shell: hitCache.shells[index] });
            if (screenDistance > worstDistance) {
              worstDistance = screenDistance;
              worstIndex = best.length - 1;
            }
            continue;
          }
          if (screenDistance >= worstDistance) continue;
          best[worstIndex] = { screenDistance, shell: hitCache.shells[index] };
          worstDistance = -1;
          for (let bestIndex = 0; bestIndex < best.length; bestIndex += 1) {
            if (best[bestIndex].screenDistance > worstDistance) {
              worstDistance = best[bestIndex].screenDistance;
              worstIndex = bestIndex;
            }
          }
        }
      }
    }
    if (best.length >= limit && radius >= 2) break;
  }
  best.sort((a, b) => a.screenDistance - b.screenDistance);
  return best.map((item) => {
    const stats = contourPcDistanceStatsToValues(item.shell, values, activePcaNeighborAxes());
    return {
      distance: Math.sqrt(stats.rawSq),
      similarity: similarityPercentFromStats(stats),
      shell: item.shell,
    };
  });
}

export function clampPcValue(axisIndex, value) {
  const range = axisRange(axisIndex);
  if (!range) return value;
  const span = Math.max(0.001, range.p99 - range.p01);
  const lower = Math.max(Number.isFinite(range.min) ? range.min : range.p01, range.p01 - span * 0.75);
  const upper = Math.min(Number.isFinite(range.max) ? range.max : range.p99, range.p99 + span * 0.75);
  return Math.max(lower, Math.min(upper, value));
}

export function assignPointAxes(values, point) {
  if (state.xAxis >= 0 && state.xAxis < values.length) values[state.xAxis] = point.x;
  if (state.yAxis >= 0 && state.yAxis < values.length && state.yAxis !== state.xAxis) {
    values[state.yAxis] = point.y;
  }
}

export function fillHiddenPcValuesFromNeighbors(values, neighborItems) {
  const axes = activePcaNeighborAxes();
  const locked = new Set(axes);
  const neighbors = (neighborItems || [])
    .map((item) => ({
      distance: contourPcDistanceStatsToValues(item.shell, values, axes).normalizedSq,
      shell: item.shell,
    }))
    .sort((a, b) => a.distance - b.distance);
  if (!neighbors.length) return values;

  if (neighbors[0].distance < 1e-10) {
    const source = neighbors[0].shell.contour_pc || [];
    for (let index = 0; index < values.length; index += 1) {
      if (!locked.has(index)) values[index] = source[index] || 0;
    }
    return values;
  }

  for (let pc = 0; pc < values.length; pc += 1) {
    if (locked.has(pc)) continue;
    let total = 0;
    let weightSum = 0;
    for (const neighbor of neighbors) {
      const source = neighbor.shell.contour_pc || [];
      if (pc >= source.length) continue;
      const weight = 1 / Math.max(neighbor.distance, 1e-6);
      total += (source[pc] || 0) * weight;
      weightSum += weight;
    }
    values[pc] = weightSum ? total / weightSum : 0;
  }
  return values;
}

export function pcValuesFromPoint(point, neighborItems = null) {
  const count = Math.max(state.model?.contour_component_count || 0, state.pcValues.length, contourAxisCount());
  const values = Array.from({ length: count }, () => 0);
  assignPointAxes(values, point);
  return fillHiddenPcValuesFromNeighbors(values, neighborItems);
}

export function applyPcValues(values, { updateControls = true } = {}) {
  values.forEach((value, index) => {
    state.pcValues[index] = value;
    if (updateControls) updatePcControl(index, value);
  });
  reconstructFromPc();
}

export function setTargetFromEvent(event, { updateControls = false } = {}) {
  const rect = els.scatter.getBoundingClientRect();
  const size = resizeCanvas(els.scatter, scatterCtx);
  const screenX = event.clientX - rect.left;
  const screenY = event.clientY - rect.top;
  const point = screenToWorld(screenX, screenY, size);
  const baseValues = pcValuesFromPoint(point);
  const fastNeighbors = nearestScatterNeighborItems(screenX, screenY, baseValues, 8);
  const values = pcValuesFromPoint(point, fastNeighbors);
  applyPcValues(values, { updateControls });
  if (!updateControls) syncPcControls(values);
  renderNeighborsForPc(values, fastNeighbors.slice(0, 4));
  scheduleDraw();
  scheduleHashUpdate();
}

export function queueTargetFromEvent(event) {
  state.targetEvent = {
    clientX: event.clientX,
    clientY: event.clientY,
  };
  if (state.targetFrame) return;
  state.targetFrame = window.requestAnimationFrame(() => {
    state.targetFrame = 0;
    const next = state.targetEvent;
    if (!next) return;
    setTargetFromEvent(next);
  });
}

export function flushTargetDragPreview() {
  if (state.targetFrame) {
    window.cancelAnimationFrame(state.targetFrame);
    state.targetFrame = 0;
  }
  const next = state.targetEvent;
  state.targetEvent = null;
  if (next && state.targetDragStart?.active) setTargetFromEvent(next);
  syncPcControls();
}

export function startViewportPan(event) {
  const rect = els.scatter.getBoundingClientRect();
  state.panningViewport = {
    pointerId: event.pointerId,
    startX: event.clientX - rect.left,
    startY: event.clientY - rect.top,
    viewport: { ...state.viewport },
  };
  state.draggingTarget = false;
  state.targetDragStart = null;
  state.targetEvent = null;
  state.pendingSelectShell = null;
  clearTargetNearestNeighbors();
  if (state.targetFrame) {
    window.cancelAnimationFrame(state.targetFrame);
    state.targetFrame = 0;
  }
  state.holdingNearest = false;
  els.scatter.classList.add("is-panning");
  els.pointTooltip.hidden = true;
}

export function panViewportFromEvent(event) {
  if (!state.panningViewport || state.panningViewport.pointerId !== event.pointerId) return;
  const rect = els.scatter.getBoundingClientRect();
  const size = resizeCanvas(els.scatter, scatterCtx);
  const start = state.panningViewport;
  const vx = start.viewport;
  const dx = ((event.clientX - rect.left - start.startX) / size.width) * (vx.maxX - vx.minX);
  const dy = ((event.clientY - rect.top - start.startY) / size.height) * (vx.maxY - vx.minY);
  state.viewport = {
    minX: vx.minX - dx,
    maxX: vx.maxX - dx,
    minY: vx.minY + dy,
    maxY: vx.maxY + dy,
  };
  scheduleDraw();
}

export function stopViewportPan() {
  if (!state.panningViewport) return;
  state.panningViewport = null;
  els.scatter.classList.remove("is-panning");
  scheduleHashUpdate();
}

export function showPointTooltip(event, shell) {
  if (!shell) {
    els.pointTooltip.hidden = true;
    return;
  }
  const rect = els.scatter.getBoundingClientRect();
  const strong = document.createElement("strong");
  strong.textContent = shell.species;
  const tooltipParts = [
    strong,
    document.createTextNode(shell.file),
    document.createElement("br"),
    document.createTextNode(`${shell.specimen_label || shell.specimen || "Unknown specimen"}, ${shell.view_label || shell.view || "Unknown view"}`),
    document.createElement("br"),
    document.createTextNode(`${axisLabel(state.xAxis)} ${formatNumber(axisValue(shell, state.xAxis))}, ${axisLabel(state.yAxis)} ${formatNumber(axisValue(shell, state.yAxis))}`),
  ];
  if (shell.color_l_mean != null) {
    tooltipParts.push(document.createElement("br"), document.createTextNode(`${shellColorName(shell)}, lightness ${formatNumber(shell.color_l_mean, 3)}`));
  }
  els.pointTooltip.replaceChildren(...tooltipParts);
  els.pointTooltip.style.left = `${Math.min(Math.max(8, rect.width - 248), Math.max(8, event.clientX - rect.left + 14))}px`;
  els.pointTooltip.style.top = `${Math.min(Math.max(8, rect.height - 84), Math.max(8, event.clientY - rect.top + 14))}px`;
  els.pointTooltip.hidden = false;
}

export function queuePointTooltip(event) {
  state.tooltipEvent = {
    clientX: event.clientX,
    clientY: event.clientY,
  };
  if (state.tooltipFrame) return;
  state.tooltipFrame = requestAnimationFrame(() => {
    state.tooltipFrame = 0;
    const now = performance.now();
    if (now - state.tooltipLastAt < 60) return;
    state.tooltipLastAt = now;
    const next = state.tooltipEvent;
    if (!next) return;
    const rect = els.scatter.getBoundingClientRect();
    showPointTooltip(next, nearestShell(next.clientX - rect.left, next.clientY - rect.top));
  });
}
