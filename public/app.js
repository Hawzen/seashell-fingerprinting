const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled2 = function(promises) {
      return Promise.all(
        promises.map(
          (p) => Promise.resolve(p).then(
            (value) => ({ status: "fulfilled", value }),
            (reason) => ({ status: "rejected", reason })
          )
        )
      );
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = allSettled2(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const IS_DEV = false;
let runEffects = runQueue;
const STALE = 1;
const PENDING = 2;
const UNOWNED = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var Owner = null;
let Transition = null;
let ExternalSourceConfig = null;
let Listener = null;
let Updates = null;
let Effects = null;
let ExecCount = 0;
function createRoot(fn, detachedOwner) {
  const listener = Listener, owner = Owner, unowned = fn.length === 0, current = detachedOwner === void 0 ? owner : detachedOwner, root2 = unowned ? UNOWNED : {
    owned: null,
    cleanups: null,
    context: current ? current.context : null,
    owner: current
  }, updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root2)));
  Owner = root2;
  Listener = null;
  try {
    return runUpdates(updateFn, true);
  } finally {
    Listener = listener;
    Owner = owner;
  }
}
function createRenderEffect(fn, value, options) {
  const c = createComputation(fn, value, false, STALE);
  updateComputation(c);
}
function untrack(fn) {
  if (Listener === null) return fn();
  const listener = Listener;
  Listener = null;
  try {
    if (ExternalSourceConfig) ;
    return fn();
  } finally {
    Listener = listener;
  }
}
function writeSignal(node, value, isComp) {
  let current = node.value;
  if (!node.comparator || !node.comparator(current, value)) {
    node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i = 0; i < node.observers.length; i += 1) {
          const o = node.observers[i];
          const TransitionRunning = Transition && Transition.running;
          if (TransitionRunning && Transition.disposed.has(o)) ;
          if (TransitionRunning ? !o.tState : !o.state) {
            if (o.pure) Updates.push(o);
            else Effects.push(o);
            if (o.observers) markDownstream(o);
          }
          if (!TransitionRunning) o.state = STALE;
        }
        if (Updates.length > 1e6) {
          Updates = [];
          if (IS_DEV) ;
          throw new Error();
        }
      }, false);
    }
  }
  return value;
}
function updateComputation(node) {
  if (!node.fn) return;
  cleanNode(node);
  const time = ExecCount;
  runComputation(node, node.value, time);
}
function runComputation(node, value, time) {
  let nextValue;
  const owner = Owner, listener = Listener;
  Listener = Owner = node;
  try {
    nextValue = node.fn(value);
  } catch (err) {
    if (node.pure) {
      {
        node.state = STALE;
        node.owned && node.owned.forEach(cleanNode);
        node.owned = null;
      }
    }
    node.updatedAt = time + 1;
    return handleError(err);
  } finally {
    Listener = listener;
    Owner = owner;
  }
  if (!node.updatedAt || node.updatedAt <= time) {
    if (node.updatedAt != null && "observers" in node) {
      writeSignal(node, nextValue);
    } else node.value = nextValue;
    node.updatedAt = time;
  }
}
function createComputation(fn, init2, pure, state2 = STALE, options) {
  const c = {
    fn,
    state: state2,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init2,
    owner: Owner,
    context: Owner ? Owner.context : null,
    pure
  };
  if (Owner === null) ;
  else if (Owner !== UNOWNED) {
    {
      if (!Owner.owned) Owner.owned = [c];
      else Owner.owned.push(c);
    }
  }
  return c;
}
function runTop(node) {
  if (node.state === 0) return;
  if (node.state === PENDING) return lookUpstream(node);
  if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
  const ancestors = [node];
  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (node.state) ancestors.push(node);
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    node = ancestors[i];
    if (node.state === STALE) {
      updateComputation(node);
    } else if (node.state === PENDING) {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(node, ancestors[0]), false);
      Updates = updates;
    }
  }
}
function runUpdates(fn, init2) {
  if (Updates) return fn();
  let wait = false;
  if (!init2) Updates = [];
  if (Effects) wait = true;
  else Effects = [];
  ExecCount++;
  try {
    const res = fn();
    completeUpdates(wait);
    return res;
  } catch (err) {
    if (!wait) Effects = null;
    Updates = null;
    handleError(err);
  }
}
function completeUpdates(wait) {
  if (Updates) {
    runQueue(Updates);
    Updates = null;
  }
  if (wait) return;
  const e = Effects;
  Effects = null;
  if (e.length) runUpdates(() => runEffects(e), false);
}
function runQueue(queue) {
  for (let i = 0; i < queue.length; i++) runTop(queue[i]);
}
function lookUpstream(node, ignore) {
  node.state = 0;
  for (let i = 0; i < node.sources.length; i += 1) {
    const source = node.sources[i];
    if (source.sources) {
      const state2 = source.state;
      if (state2 === STALE) {
        if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
      } else if (state2 === PENDING) lookUpstream(source, ignore);
    }
  }
}
function markDownstream(node) {
  for (let i = 0; i < node.observers.length; i += 1) {
    const o = node.observers[i];
    if (!o.state) {
      o.state = PENDING;
      if (o.pure) Updates.push(o);
      else Effects.push(o);
      o.observers && markDownstream(o);
    }
  }
}
function cleanNode(node) {
  let i;
  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
      if (obs && obs.length) {
        const n = obs.pop(), s = source.observerSlots.pop();
        if (index < obs.length) {
          n.sourceSlots[s] = index;
          obs[index] = n;
          source.observerSlots[index] = s;
        }
      }
    }
  }
  if (node.tOwned) {
    for (i = node.tOwned.length - 1; i >= 0; i--) cleanNode(node.tOwned[i]);
    delete node.tOwned;
  }
  if (node.owned) {
    for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
    node.cleanups = null;
  }
  node.state = 0;
}
function castError(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "Unknown error", {
    cause: err
  });
}
function handleError(err, owner = Owner) {
  const error = castError(err);
  throw error;
}
function createComponent(Comp, props) {
  return untrack(() => Comp(props || {}));
}
function reconcileArrays(parentNode, a, b) {
  let bLength = b.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, after = a[aEnd - 1].nextSibling, map = null;
  while (aStart < aEnd || bStart < bEnd) {
    if (a[aStart] === b[bStart]) {
      aStart++;
      bStart++;
      continue;
    }
    while (a[aEnd - 1] === b[bEnd - 1]) {
      aEnd--;
      bEnd--;
    }
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
      while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(a[aStart])) a[aStart].remove();
        aStart++;
      }
    } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
      const node = a[--aEnd].nextSibling;
      parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
      parentNode.insertBefore(b[--bEnd], node);
      a[aEnd] = b[bEnd];
    } else {
      if (!map) {
        map = /* @__PURE__ */ new Map();
        let i = bStart;
        while (i < bEnd) map.set(b[i], i++);
      }
      const index = map.get(a[aStart]);
      if (index != null) {
        if (bStart < index && index < bEnd) {
          let i = aStart, sequence = 1, t;
          while (++i < aEnd && i < bEnd) {
            if ((t = map.get(a[i])) == null || t !== index + sequence) break;
            sequence++;
          }
          if (sequence > index - bStart) {
            const node = a[aStart];
            while (bStart < index) parentNode.insertBefore(b[bStart++], node);
          } else parentNode.replaceChild(b[bStart++], a[aStart++]);
        } else aStart++;
      } else a[aStart++].remove();
    }
  }
}
function render(code, element, init2, options = {}) {
  let disposer;
  createRoot((dispose) => {
    disposer = dispose;
    element === document ? code() : insert(element, code(), element.firstChild ? null : void 0, init2);
  }, options.owner);
  return () => {
    disposer();
    element.textContent = "";
  };
}
function template(html, isImportNode, isSVG, isMathML) {
  let node;
  const create = () => {
    const t = document.createElement("template");
    t.innerHTML = html;
    return t.content.firstChild;
  };
  const fn = () => (node || (node = create())).cloneNode(true);
  fn.cloneNode = fn;
  return fn;
}
function insert(parent, accessor, marker, initial) {
  if (marker !== void 0 && !initial) initial = [];
  if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
  createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
}
function insertExpression(parent, value, current, marker, unwrapArray) {
  while (typeof current === "function") current = current();
  if (value === current) return current;
  const t = typeof value, multi = marker !== void 0;
  parent = multi && current[0] && current[0].parentNode || parent;
  if (t === "string" || t === "number") {
    if (t === "number") {
      value = value.toString();
      if (value === current) return current;
    }
    if (multi) {
      let node = current[0];
      if (node && node.nodeType === 3) {
        node.data !== value && (node.data = value);
      } else node = document.createTextNode(value);
      current = cleanChildren(parent, current, marker, node);
    } else {
      if (current !== "" && typeof current === "string") {
        current = parent.firstChild.data = value;
      } else current = parent.textContent = value;
    }
  } else if (value == null || t === "boolean") {
    current = cleanChildren(parent, current, marker);
  } else if (t === "function") {
    createRenderEffect(() => {
      let v = value();
      while (typeof v === "function") v = v();
      current = insertExpression(parent, v, current, marker);
    });
    return () => current;
  } else if (Array.isArray(value)) {
    const array = [];
    const currentArray = current && Array.isArray(current);
    if (normalizeIncomingArray(array, value, current, unwrapArray)) {
      createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
      return () => current;
    }
    if (array.length === 0) {
      current = cleanChildren(parent, current, marker);
      if (multi) return current;
    } else if (currentArray) {
      if (current.length === 0) {
        appendNodes(parent, array, marker);
      } else reconcileArrays(parent, current, array);
    } else {
      current && cleanChildren(parent);
      appendNodes(parent, array);
    }
    current = array;
  } else if (value.nodeType) {
    if (Array.isArray(current)) {
      if (multi) return current = cleanChildren(parent, current, marker, value);
      cleanChildren(parent, current, null, value);
    } else if (current == null || current === "" || !parent.firstChild) {
      parent.appendChild(value);
    } else parent.replaceChild(value, parent.firstChild);
    current = value;
  } else ;
  return current;
}
function normalizeIncomingArray(normalized, array, current, unwrap) {
  let dynamic = false;
  for (let i = 0, len = array.length; i < len; i++) {
    let item = array[i], prev = current && current[normalized.length], t;
    if (item == null || item === true || item === false) ;
    else if ((t = typeof item) === "object" && item.nodeType) {
      normalized.push(item);
    } else if (Array.isArray(item)) {
      dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
    } else if (t === "function") {
      if (unwrap) {
        while (typeof item === "function") item = item();
        dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], Array.isArray(prev) ? prev : [prev]) || dynamic;
      } else {
        normalized.push(item);
        dynamic = true;
      }
    } else {
      const value = String(item);
      if (prev && prev.nodeType === 3 && prev.data === value) normalized.push(prev);
      else normalized.push(document.createTextNode(value));
    }
  }
  return dynamic;
}
function appendNodes(parent, array, marker = null) {
  for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
}
function cleanChildren(parent, current, marker, replacement) {
  if (marker === void 0) return parent.textContent = "";
  const node = replacement || document.createTextNode("");
  if (current.length) {
    let inserted = false;
    for (let i = current.length - 1; i >= 0; i--) {
      const el = current[i];
      if (node !== el) {
        const isParent = el.parentNode === parent;
        if (!inserted && !i) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
        else isParent && el.remove();
      } else inserted = true;
    }
  } else parent.insertBefore(node, marker);
  return [node];
}
var _tmpl$ = /* @__PURE__ */ template(`<header class=topbar><div class=brand-block><h1>Shellspace</h1><p class=tagline>Every shell is a fingerprint — Shellspace is the atlas.</p><p id=statusLine>Loading shell model</p></div><div id=starredBand class=starred-band aria-label="Starred shells"></div><div id=starBurst class=star-burst aria-hidden=true></div><div class=top-actions><button id=zoomOut title="Zoom out">-</button><button id=zoomIn title="Zoom in">+</button><button id=resetView title="Reset map view">Reset`), _tmpl$2 = /* @__PURE__ */ template(`<main class=workspace><aside class="panel controls-panel"><section class="panel-section search-section"><div class=search-row><label class=field><span>Search</span><input id=searchBox type=search placeholder="Species or Shellprint"></label><button id=filtersToggle class=filters-toggle title="Open filters"aria-expanded=false>Filters</button></div><div id=filtersPanel class=filters-popover hidden><header><h2>Filters</h2><button id=closeFilters title="Close filters"aria-label="Close filters">x</button></header><div id=filterControls class=filter-controls></div><div class=filter-actions><button id=resetTraitFilters title="Reset filters">Reset</button></div></div><button id=randomShell title="Select a random shell">Surprise me</button><button id=uploadShell class=upload-shell title="Bring your own shell">+ Bring your own shell</button><input id=uploadInput type=file accept=image/* hidden><div class=section-title><h2>Map</h2></div><div class=axis-grid><label><span>X</span><select id=xAxisSelect></select></label><label><span>Y</span><select id=yAxisSelect></select></label></div><label class=field><span>Color</span><select id=colorModeSelect><option value=locality>Location</option><option value=species>Species</option><option value=conservation>Conservation</option><option value=shell>Shell color</option><option value=pattern>Pattern</option><option value=lightness>Lightness</option><option value=concavity>Concavity</option></select></label></section><section class="panel-section physical-shell"><div class=section-title><h2>Physical Shell <span id=physicalHash class="fingerprint-chip compact">------</span></h2><button id=starShell class=star-button title="Star this shape"aria-label="Star this shape"aria-pressed=false><svg class=star-icon viewBox="0 0 24 24"aria-hidden=true><path class=star-shape d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8z"></path></svg></button></div><div class=source-frame><div id=sourceSpinner class=source-spinner hidden></div><canvas id=sourceThumb width=420 height=300></canvas><img id=sourceImage alt hidden></div><div id=selectedName class=selected-name>None</div><dl id=selectedDetails></dl></section></aside><section class=scatter-panel aria-label="PCA scatter plot"><canvas id=scatterCanvas></canvas><div id=pointTooltip class=point-tooltip hidden></div></section><aside class="panel lab-panel"><section class="panel-section projected-lab"><div class=generated-shape><div class=section-title><h2>Projected Shell <span id=projectedHash class="fingerprint-chip compact">------</span></h2></div><div class=projection-frame><canvas id=outlineCanvas width=420 height=420></canvas><button id=exportSvg class=svg-export title="Export generated shell as SVG">SVG</button></div></div><div class=color-palette><h2>Palette</h2><div id=paletteSwatches class=palette-swatches></div></div><div class=slider-stack><div class=section-title><h2>Contour PCs</h2><div class=title-actions><button id=meanShape title="Reset contour coordinates">Mean</button><button id=walkPca title="Animate through contour PCA space">Walk</button></div></div><div id=pcControls></div></div></section><section class="panel-section neighbors"><div class=section-title><h2>Nearest Shells</h2></div><div id=neighborsList>`), _tmpl$3 = /* @__PURE__ */ template(`<div id=loadingOverlay class=loading-overlay><div class=rpg-loader aria-hidden=true><div class=loader-shadow></div><div class=loader-aura></div><div class="loader-shell loader-shell-top"><span class="shell-rib rib-1"></span><span class="shell-rib rib-2"></span><span class="shell-rib rib-3"></span><span class="shell-rib rib-4"></span><span class="shell-rib rib-5"></span><span class=shell-lip></span></div><div class="loader-shell loader-shell-bottom"><span class="shell-rib rib-1"></span><span class="shell-rib rib-2"></span><span class="shell-rib rib-3"></span><span class="shell-rib rib-4"></span><span class="shell-rib rib-5"></span><span class=shell-lip></span></div><div class=loader-pearl><span class="pearl-spark spark-1"></span><span class="pearl-spark spark-2"></span><span class="pearl-spark spark-3"></span></div></div><p id=loadingText>Opening shell data`), _tmpl$4 = /* @__PURE__ */ template(`<div id=missingData class=missing-data hidden><div><h2>Processed Data Missing</h2><p>Build processed data, export static data, then refresh the app.</p><code>make fingerprints
make export-data`);
function AppShell() {
  return [_tmpl$(), _tmpl$2(), _tmpl$3(), _tmpl$4()];
}
const root = document.querySelector("#root");
if (!root) {
  throw new Error("Missing #root");
}
render(() => createComponent(AppShell, {}), root);
void __vitePreload(async () => {
  const { startShellspace: startShellspace2 } = await Promise.resolve().then(() => shellspaceApp);
  return { startShellspace: startShellspace2 };
}, true ? void 0 : void 0).then(({
  startShellspace: startShellspace2
}) => startShellspace2());
const repoBase = new URL(
  /* @vite-ignore */
  "../",
  import.meta.url
).pathname;
const publicBase = `${repoBase}public/`;
const colorModes = ["locality", "species", "conservation", "shell", "pattern", "lightness", "concavity"];
const starStorageKey = "shellspace-starred";
const rangeFilterDefs = [
  { key: "lightness", label: "Lightness", format: "percent" },
  { key: "area", label: "Area", format: "percent" },
  { key: "concavity", label: "Concavity", format: "percent" },
  { key: "asymmetry", label: "Asymmetry", format: "percent" }
];
const filterLevels = [
  { key: "low", label: "Low", min: 0, max: 1 / 3 },
  { key: "medium", label: "Medium", min: 1 / 3, max: 2 / 3 },
  { key: "high", label: "High", min: 2 / 3, max: 1 }
];
const rarityFilterOptions = ["Common", "Uncommon", "Rare", "Extremely rare", "Data deficient"];
const colorSwatches = [
  ["#f5ead0", "Ivory"],
  ["#d9c28d", "Sand"],
  ["#b68b57", "Ochre"],
  ["#7b5235", "Umber"],
  ["#3b2d25", "Dark"],
  ["#d7a295", "Rose"],
  ["#a94e44", "Coral"],
  ["#d07b39", "Amber"],
  ["#91885b", "Olive"],
  ["#7f9294", "Blue gray"],
  ["#c6c8c0", "Pearl"],
  ["#ffffff", "White"]
];
const state = {
  shells: [],
  filtered: [],
  contours: null,
  contourPoints: 0,
  contourScale: 1,
  model: null,
  viewport: null,
  selected: null,
  selectedContour: null,
  generatedContour: null,
  generatedTraits: null,
  generatedMode: "selected",
  uploadImageUrl: "",
  xAxis: 0,
  yAxis: 1,
  colorMode: "locality",
  pcValues: [],
  morphFilters: /* @__PURE__ */ new Map(),
  categoryFilters: { origin: "", rarity: "", color: "" },
  conservationCache: /* @__PURE__ */ new Map(),
  starredIds: [],
  showAllStars: false,
  speciesCounts: /* @__PURE__ */ new Map(),
  speciesTraits: /* @__PURE__ */ new Map(),
  localityMatchRate: 0,
  drawFrame: 0,
  drawTimer: 0,
  sourceFrame: null,
  sourceMode: "fallback",
  scatterHitCache: null,
  tooltipFrame: 0,
  tooltipEvent: null,
  tooltipLastAt: 0,
  draggingTarget: false,
  panningViewport: null,
  walkingPca: false,
  walkFrame: 0,
  walkStartedAt: 0,
  hashReady: false,
  suppressHash: false,
  hashTimer: 0,
  needsDraw: true,
  sourceToken: 0,
  sourceLoadTimer: 0,
  scatterPointCache: null,
  shellById: /* @__PURE__ */ new Map(),
  shellsByThumbnailPage: /* @__PURE__ */ new Map(),
  loadedThumbnailPages: /* @__PURE__ */ new Set(),
  warmingThumbnails: false,
  surpriseQueue: [],
  surpriseQueueSource: null,
  surprisePrimeTimer: 0,
  neighborCache: /* @__PURE__ */ new Map(),
  neighborTimer: 0,
  neighborToken: 0,
  pointColorCache: /* @__PURE__ */ new Map(),
  paletteCache: /* @__PURE__ */ new Map(),
  originFilterOptionsCache: null
};
const els = {
  statusLine: document.querySelector("#statusLine"),
  starredBand: document.querySelector("#starredBand"),
  starBurst: document.querySelector("#starBurst"),
  search: document.querySelector("#searchBox"),
  filtersToggle: document.querySelector("#filtersToggle"),
  filtersPanel: document.querySelector("#filtersPanel"),
  closeFilters: document.querySelector("#closeFilters"),
  filterControls: document.querySelector("#filterControls"),
  randomShell: document.querySelector("#randomShell"),
  xAxisSelect: document.querySelector("#xAxisSelect"),
  yAxisSelect: document.querySelector("#yAxisSelect"),
  colorModeSelect: document.querySelector("#colorModeSelect"),
  resetTraitFilters: document.querySelector("#resetTraitFilters"),
  scatter: document.querySelector("#scatterCanvas"),
  pointTooltip: document.querySelector("#pointTooltip"),
  physicalHash: document.querySelector("#physicalHash"),
  projectedHash: document.querySelector("#projectedHash"),
  starShell: document.querySelector("#starShell"),
  sourceThumb: document.querySelector("#sourceThumb"),
  sourceImage: document.querySelector("#sourceImage"),
  sourceSpinner: document.querySelector("#sourceSpinner"),
  selectedName: document.querySelector("#selectedName"),
  selectedDetails: document.querySelector("#selectedDetails"),
  neighborsList: document.querySelector("#neighborsList"),
  outline: document.querySelector("#outlineCanvas"),
  pcControls: document.querySelector("#pcControls"),
  meanShape: document.querySelector("#meanShape"),
  walkPca: document.querySelector("#walkPca"),
  uploadShell: document.querySelector("#uploadShell"),
  uploadInput: document.querySelector("#uploadInput"),
  exportSvg: document.querySelector("#exportSvg"),
  paletteSwatches: document.querySelector("#paletteSwatches"),
  zoomIn: document.querySelector("#zoomIn"),
  zoomOut: document.querySelector("#zoomOut"),
  resetView: document.querySelector("#resetView"),
  loadingOverlay: document.querySelector("#loadingOverlay"),
  loadingText: document.querySelector("#loadingText"),
  missingData: document.querySelector("#missingData")
};
const scatterCtx = els.scatter.getContext("2d");
const outlineCtx = els.outline.getContext("2d");
const sourceThumbCtx = els.sourceThumb.getContext("2d");
const normalizedContourCache = /* @__PURE__ */ new Map();
const thumbnailPageCache = /* @__PURE__ */ new Map();
const originalImageCache = /* @__PURE__ */ new Map();
function asset(path) {
  return `${publicBase}${path}`;
}
function datasetAsset(path) {
  return `${repoBase}dataset/${encodeURIComponent(path).replaceAll("%2F", "/")}`;
}
function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}
function formatNumber(value, digits = 3) {
  return Number(value || 0).toLocaleString(void 0, { maximumFractionDigits: digits });
}
function precisePercentValue(value) {
  return `${formatNumber(clamp01(value) * 100, 1)}%`;
}
function relativeArea(shell) {
  return clamp01(((shell == null ? void 0 : shell.area) || 0) / Math.max(1, ((shell == null ? void 0 : shell.image_width) || 0) * ((shell == null ? void 0 : shell.image_height) || 0)));
}
function datasetCmScale(shell) {
  const width = Math.max(1, (shell == null ? void 0 : shell.image_width) || 400);
  const height = Math.max(1, (shell == null ? void 0 : shell.image_height) || 300);
  const longSide = Math.max(width, height);
  const longSideCm = 10;
  return {
    cmPerImageUnit: longSideCm / longSide,
    widthCm: width / longSide * longSideCm,
    heightCm: height / longSide * longSideCm,
    longSideCm
  };
}
function shellAreaCm2(shell) {
  const scale = datasetCmScale(shell);
  return ((shell == null ? void 0 : shell.area) || 0) * scale.cmPerImageUnit * scale.cmPerImageUnit;
}
function shellMeanRadiusCm(shell) {
  return ((shell == null ? void 0 : shell.mean_radius) || 0) * datasetCmScale(shell).cmPerImageUnit;
}
function setLoading(text, visible = true) {
  if (els.loadingText && text) els.loadingText.textContent = text;
  if (els.loadingOverlay) els.loadingOverlay.hidden = !visible;
}
function hashString(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
function fingerprintHash(shell) {
  const pcs = (shell.contour_pc || []).slice(0, 6).map((value) => Number(value || 0).toFixed(4));
  const seed = `${shell.species}|${shell.specimen}|${shell.view}|${pcs.join(",")}`;
  return hashString(seed).toString(36).toUpperCase().padStart(6, "0").slice(-6);
}
function applyFingerprintStyle(node, hash) {
  const hue = hashString(hash) % 360;
  node.style.setProperty("--hash-hue", String(hue));
  node.textContent = hash;
}
function applyShellFingerprintStyle(node, shell, hash = shell == null ? void 0 : shell.fingerprint_hash) {
  if (!node || !hash) return;
  const color = rgbToHsl((shell == null ? void 0 : shell.color_r_mean) ?? 0.68, (shell == null ? void 0 : shell.color_g_mean) ?? 0.62, (shell == null ? void 0 : shell.color_b_mean) ?? 0.52);
  node.style.setProperty("--hash-hue", String(Math.round(color.h)));
  node.style.setProperty("--hash-saturation", `${Math.round(Math.max(0.28, color.s) * 100)}%`);
  node.style.setProperty("--hash-lightness", `${Math.round(Math.max(0.3, Math.min(0.72, color.l)) * 100)}%`);
  node.textContent = hash;
}
function rgbToHsl(red, green, blue) {
  const r = clamp01(red);
  const g = clamp01(green);
  const b = clamp01(blue);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return { h: h * 360, s, l };
}
function hslCss(h, s, l) {
  return `hsl(${(h % 360 + 360) % 360}, ${Math.round(clamp01(s) * 100)}%, ${Math.round(clamp01(l) * 100)}%)`;
}
function hslToRgba(h, s, l, alpha = 1) {
  const hue = (h % 360 + 360) % 360 / 360;
  const sat = clamp01(s);
  const light = clamp01(l);
  if (sat === 0) {
    const value = Math.round(light * 255);
    return [value, value, value, Math.round(clamp01(alpha) * 255)];
  }
  const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat;
  const p = 2 * light - q;
  const channel = (offset) => {
    let t = hue + offset;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [
    Math.round(channel(1 / 3) * 255),
    Math.round(channel(0) * 255),
    Math.round(channel(-1 / 3) * 255),
    Math.round(clamp01(alpha) * 255)
  ];
}
function physicalLocationLabel(shell) {
  return shell.location_label || "Locality unavailable";
}
function regionLabel(localityPayload, key) {
  var _a;
  if (!key) return "";
  return ((_a = localityPayload == null ? void 0 : localityPayload.region_labels) == null ? void 0 : _a[key]) || key.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function countryLabel(localityPayload, code) {
  var _a, _b;
  return ((_b = (_a = localityPayload == null ? void 0 : localityPayload.countries) == null ? void 0 : _a[code]) == null ? void 0 : _b.title) || code;
}
function buildLocalityLookup(localityPayload) {
  var _a, _b, _c, _d, _e;
  const lookup = /* @__PURE__ */ new Map();
  if ((localityPayload == null ? void 0 : localityPayload.encoding) !== "shell-localities-v1") return lookup;
  const names = localityPayload.species_names || [];
  for (let index = 0; index < names.length; index += 1) {
    const country = ((_a = localityPayload.primary_country_codes) == null ? void 0 : _a[index]) || "";
    const region = ((_b = localityPayload.region_keys) == null ? void 0 : _b[index]) || "";
    const total = ((_c = localityPayload.total_occurrences) == null ? void 0 : _c[index]) || 0;
    const topCodes = ((_d = localityPayload.top_country_codes) == null ? void 0 : _d[index]) || [];
    const topCounts = ((_e = localityPayload.top_country_counts) == null ? void 0 : _e[index]) || [];
    const countryName = country ? countryLabel(localityPayload, country) : "";
    const regionName = regionLabel(localityPayload, region);
    const topCountries = topCodes.map((code, topIndex) => ({
      code,
      label: countryLabel(localityPayload, code),
      count: topCounts[topIndex] || 0
    }));
    lookup.set(names[index], {
      primary_country: country,
      primary_country_label: countryName,
      region_key: region,
      region_label: regionName,
      total_occurrences: total,
      top_countries: topCountries,
      location_label: countryName && regionName ? `${countryName}, ${regionName}` : countryName || regionName || ""
    });
  }
  return lookup;
}
function buildSpeciesTraitsLookup(speciesTraitsPayload) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const lookup = /* @__PURE__ */ new Map();
  if ((speciesTraitsPayload == null ? void 0 : speciesTraitsPayload.encoding) !== "shell-species-traits-v1") return lookup;
  const names = speciesTraitsPayload.species_names || [];
  const rarityLabels = speciesTraitsPayload.rarity_labels || [];
  const protectionLabels = speciesTraitsPayload.protection_status_labels || [];
  for (let index = 0; index < names.length; index += 1) {
    const countryCodes = ((_a = speciesTraitsPayload.known_range_country_codes) == null ? void 0 : _a[index]) || [];
    const countryCounts = ((_b = speciesTraitsPayload.known_range_country_counts) == null ? void 0 : _b[index]) || [];
    const rangeCountries = countryCodes.map((code, countryIndex) => ({
      code,
      label: countryLabel(speciesTraitsPayload, code),
      count: countryCounts[countryIndex] || 0
    }));
    lookup.set(names[index], {
      genus: ((_c = speciesTraitsPayload.genus) == null ? void 0 : _c[index]) || "",
      rarity_label: rarityLabels[(_d = speciesTraitsPayload.rarity) == null ? void 0 : _d[index]] || "Data deficient",
      rarity_reason: ((_e = speciesTraitsPayload.rarity_reasons) == null ? void 0 : _e[index]) || "",
      dataset_sample_count: ((_f = speciesTraitsPayload.dataset_sample_count) == null ? void 0 : _f[index]) || 0,
      observation_count: ((_g = speciesTraitsPayload.observation_count) == null ? void 0 : _g[index]) || 0,
      known_range_country_count: ((_h = speciesTraitsPayload.country_count) == null ? void 0 : _h[index]) || rangeCountries.length,
      known_range_countries: rangeCountries,
      primary_country: ((_i = speciesTraitsPayload.primary_country_codes) == null ? void 0 : _i[index]) || "",
      region_key: ((_j = speciesTraitsPayload.region_keys) == null ? void 0 : _j[index]) || "",
      region_label: regionLabel(speciesTraitsPayload, ((_k = speciesTraitsPayload.region_keys) == null ? void 0 : _k[index]) || ""),
      protection_status: protectionLabels[(_l = speciesTraitsPayload.protection_status) == null ? void 0 : _l[index]] || "Not assessed",
      market_price_usd: ((_m = speciesTraitsPayload.market_price_usd) == null ? void 0 : _m[index]) ?? null
    });
  }
  return lookup;
}
function deriveMorphMetrics(shell) {
  const solidityLoss = clamp01((1 - (shell.contour_solidity || 1)) / 0.32);
  const pc = shell.contour_pc || [];
  const pc2 = clamp01(((pc[1] || 0) + 7) / 14);
  const pc4 = clamp01(((pc[3] || 0) + 3) / 6);
  return {
    asymmetry: clamp01(0.4 * Math.abs(pc2 - 0.5) * 2 + 0.34 * Math.abs(pc4 - 0.5) * 2 + 0.26 * solidityLoss)
  };
}
function buildDerivedShellData(shells, localityPayload = null, speciesTraitsPayload = null) {
  var _a;
  state.speciesCounts = /* @__PURE__ */ new Map();
  state.originFilterOptionsCache = null;
  for (const shell of shells) {
    state.speciesCounts.set(shell.species, (state.speciesCounts.get(shell.species) || 0) + 1);
  }
  const localityLookup = buildLocalityLookup(localityPayload);
  const speciesTraitsLookup = buildSpeciesTraitsLookup(speciesTraitsPayload);
  state.speciesTraits = speciesTraitsLookup;
  state.localityMatchRate = (localityPayload == null ? void 0 : localityPayload.match_rate) || 0;
  for (const shell of shells) {
    const locality = localityLookup.get(shell.species);
    const traits = speciesTraitsLookup.get(shell.species);
    shell.fingerprint_hash = fingerprintHash(shell);
    shell.species_sample_count = state.speciesCounts.get(shell.species) || 1;
    shell.species_traits = traits || null;
    shell.morph_traits = deriveMorphMetrics(shell);
    shell.rarity_label = (traits == null ? void 0 : traits.rarity_label) || "Data deficient";
    shell.rarity_reason = (traits == null ? void 0 : traits.rarity_reason) || "";
    shell.global_occurrences = (traits == null ? void 0 : traits.observation_count) || (locality == null ? void 0 : locality.total_occurrences) || 0;
    shell.location_label = (locality == null ? void 0 : locality.location_label) || "Locality unavailable";
    shell.location_key = (locality == null ? void 0 : locality.primary_country) || (locality == null ? void 0 : locality.region_key) || "unknown";
    shell.location_color = shell.location_key === "unknown" ? "rgba(96, 108, 106, 0.62)" : speciesColor(shell.location_key);
    shell.species_color = speciesColor(shell.species);
    shell.region_label = (locality == null ? void 0 : locality.region_label) || "";
    shell.top_countries_label = ((_a = locality == null ? void 0 : locality.top_countries) == null ? void 0 : _a.length) ? locality.top_countries.slice(0, 3).map((country) => country.label).join(", ") : "";
  }
}
function fetchJson(url) {
  return fetch(url, { cache: "no-store" }).then((response) => {
    if (!response.ok) throw new Error(`${url} returned ${response.status}`);
    return response.json();
  });
}
async function fetchCompressedArrayBuffer(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  if (!url.endsWith(".gz")) return response.arrayBuffer();
  if (!("DecompressionStream" in window)) {
    throw new Error("This browser cannot decompress the shell data pack.");
  }
  return new Response(response.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
}
async function fetchCompressedJson(url) {
  const buffer = await fetchCompressedArrayBuffer(url);
  return JSON.parse(new TextDecoder().decode(buffer));
}
function unpackShells(payload) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
  if (Array.isArray(payload == null ? void 0 : payload.records)) return payload.records;
  if ((payload == null ? void 0 : payload.encoding) !== "shell-pack-v1") {
    throw new Error("Unsupported shell data pack.");
  }
  const count = payload.count || 0;
  const metrics = payload.metrics || {};
  const fields = payload.fields || Object.keys(metrics);
  const contourPcCount = payload.contour_pc_count || 0;
  const traitPcCount = payload.trait_pc_count || 0;
  const shells = [];
  for (let id = 0; id < count; id += 1) {
    const speciesIndex = ((_a = payload.species) == null ? void 0 : _a[id]) ?? 0;
    const specimenIndex = ((_b = payload.specimens) == null ? void 0 : _b[id]) ?? 0;
    const viewIndex = ((_c = payload.views) == null ? void 0 : _c[id]) ?? 0;
    const shell = {
      id,
      file: ((_d = payload.files) == null ? void 0 : _d[id]) || "",
      species: ((_e = payload.species_names) == null ? void 0 : _e[speciesIndex]) || "Unknown shell",
      specimen: ((_f = payload.specimen_values) == null ? void 0 : _f[specimenIndex]) || "",
      specimen_label: ((_g = payload.specimen_labels) == null ? void 0 : _g[specimenIndex]) || "Unknown specimen",
      view: ((_h = payload.view_values) == null ? void 0 : _h[viewIndex]) || "",
      view_label: ((_i = payload.view_labels) == null ? void 0 : _i[viewIndex]) || "Unknown view",
      area: ((_j = payload.area) == null ? void 0 : _j[id]) || 0,
      center: [((_k = payload.centers) == null ? void 0 : _k[id * 2]) || 0, ((_l = payload.centers) == null ? void 0 : _l[id * 2 + 1]) || 0],
      image_width: ((_m = payload.dims) == null ? void 0 : _m[id * 2]) || 0,
      image_height: ((_n = payload.dims) == null ? void 0 : _n[id * 2 + 1]) || 0,
      bbox: [
        ((_o = payload.bbox) == null ? void 0 : _o[id * 4]) || 0,
        ((_p = payload.bbox) == null ? void 0 : _p[id * 4 + 1]) || 0,
        ((_q = payload.bbox) == null ? void 0 : _q[id * 4 + 2]) || 0,
        ((_r = payload.bbox) == null ? void 0 : _r[id * 4 + 3]) || 0
      ],
      contour_pc: [],
      trait_pc: [],
      legacy_fingerprint_hash: ((_s = payload.legacy_hashes) == null ? void 0 : _s[id]) || ""
    };
    shell.name = `${shell.species} ${shell.specimen_label} ${shell.view_label}`;
    for (let pc = 0; pc < contourPcCount; pc += 1) {
      shell.contour_pc.push(((_t = payload.contour_pc) == null ? void 0 : _t[id * contourPcCount + pc]) || 0);
    }
    for (let pc = 0; pc < traitPcCount; pc += 1) {
      shell.trait_pc.push(((_u = payload.trait_pc) == null ? void 0 : _u[id * traitPcCount + pc]) || 0);
    }
    for (const field of fields) {
      shell[field] = ((_v = metrics[field]) == null ? void 0 : _v[id]) || 0;
    }
    shells.push(shell);
  }
  return shells;
}
function parseHashState() {
  const raw = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
  return new URLSearchParams(raw);
}
function updateHashState() {
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
function scheduleHashUpdate() {
  if (!state.hashReady || state.suppressHash) return;
  window.clearTimeout(state.hashTimer);
  state.hashTimer = window.setTimeout(updateHashState, 80);
}
function resizeCanvas(canvas, ctx) {
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
function contourAxisCount() {
  var _a;
  return Math.min(6, ((_a = state.model) == null ? void 0 : _a.contour_visible_component_count) || 0);
}
function axisOptionCount() {
  return contourAxisCount();
}
function activeAxisValues() {
  return state.pcValues;
}
function axisRange(axisIndex) {
  var _a;
  return (_a = state.model.contour_pca_ranges) == null ? void 0 : _a[axisIndex];
}
function axisVariance(axisIndex) {
  var _a;
  return ((_a = state.model.contour_explained_variance_ratio) == null ? void 0 : _a[axisIndex]) || 0;
}
function axisMeaning(axisIndex) {
  return `PC${axisIndex + 1}`;
}
function axisLabel(axisIndex) {
  return axisMeaning(axisIndex);
}
function axisValue(shell, axisIndex) {
  var _a;
  return ((_a = shell.contour_pc) == null ? void 0 : _a[axisIndex]) || 0;
}
function initialViewport(xIndex = state.xAxis, yIndex = state.yAxis) {
  var _a;
  const fallback = ((_a = state.model.contour_pca_ranges) == null ? void 0 : _a[0]) || { p01: -1, p99: 1 };
  const x = axisRange(xIndex) || fallback;
  const y = axisRange(yIndex) || axisRange(1) || fallback;
  const padX = Math.max((x.p99 - x.p01) * 0.08, 1e-3);
  const padY = Math.max((y.p99 - y.p01) * 0.08, 1e-3);
  return {
    minX: x.p01 - padX,
    maxX: x.p99 + padX,
    minY: y.p01 - padY,
    maxY: y.p99 + padY
  };
}
function worldToScreen(x, y, size) {
  const vx = state.viewport;
  return {
    x: (x - vx.minX) / (vx.maxX - vx.minX) * size.width,
    y: size.height - (y - vx.minY) / (vx.maxY - vx.minY) * size.height
  };
}
function screenToWorld(x, y, size) {
  const vx = state.viewport;
  return {
    x: vx.minX + x / size.width * (vx.maxX - vx.minX),
    y: vx.minY + (size.height - y) / size.height * (vx.maxY - vx.minY)
  };
}
function speciesColor(species, alpha = 0.78) {
  let hash = 0;
  for (let index = 0; index < species.length; index += 1) {
    hash = hash * 31 + species.charCodeAt(index) >>> 0;
  }
  return `hsla(${hash % 360}, 42%, 42%, ${alpha})`;
}
function speciesColorRgba(species, alpha = 0.78) {
  let hash = 0;
  const value = String(species || "");
  for (let index = 0; index < value.length; index += 1) {
    hash = hash * 31 + value.charCodeAt(index) >>> 0;
  }
  return hslToRgba(hash % 360, 0.42, 0.42, alpha);
}
function shellRgb(shell, alpha = 1) {
  const red = Math.round(clamp01(shell.color_r_mean ?? 0.68) * 255);
  const green = Math.round(clamp01(shell.color_g_mean ?? 0.64) * 255);
  const blue = Math.round(clamp01(shell.color_b_mean ?? 0.56) * 255);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
function shellRgba(shell, alpha = 1) {
  return [
    Math.round(clamp01(shell.color_r_mean ?? 0.68) * 255),
    Math.round(clamp01(shell.color_g_mean ?? 0.64) * 255),
    Math.round(clamp01(shell.color_b_mean ?? 0.56) * 255),
    Math.round(clamp01(alpha) * 255)
  ];
}
function conservationStatus(shell) {
  var _a;
  return (shell == null ? void 0 : shell.live_conservation_status) || ((_a = shell == null ? void 0 : shell.species_traits) == null ? void 0 : _a.protection_status) || "Not assessed";
}
function conservationRgba(shell) {
  const status = conservationStatus(shell).toLowerCase();
  if (status.includes("critically")) return [126, 24, 28, 230];
  if (status.includes("endangered")) return [200, 45, 38, 220];
  if (status.includes("vulnerable")) return [232, 123, 54, 210];
  if (status.includes("near")) return [228, 176, 62, 200];
  if (status.includes("least")) return [58, 139, 99, 190];
  return [102, 111, 117, 112];
}
function pointRgbaForMode(shell, mode) {
  if (mode === "locality") {
    if (shell.location_key === "unknown") return [96, 108, 106, 158];
    return speciesColorRgba(shell.location_key || "unknown", 0.66);
  }
  if (mode === "conservation") return conservationRgba(shell);
  if (mode === "shell") return shellRgba(shell);
  if (mode === "lightness") {
    const t = clamp01(shell.color_l_mean ?? 0.5);
    return hslToRgba(48, 0.24, (24 + t * 54) / 100);
  }
  if (mode === "pattern") {
    const t = clamp01((shell.color_pattern_strength || 0) / 0.22);
    return hslToRgba(204 - t * 162, (34 + t * 36) / 100, (30 + t * 18) / 100);
  }
  if (mode === "concavity") {
    const t = clamp01((shell.contour_concavity || 0) / 0.32);
    return hslToRgba(320 - t * 185, 0.56, (35 + t * 11) / 100);
  }
  return speciesColorRgba(shell.species, 0.78);
}
function pointColorArray(mode) {
  if (state.pointColorCache.has(mode)) return state.pointColorCache.get(mode);
  const colors = new Uint8ClampedArray(state.shells.length * 4);
  for (const shell of state.shells) {
    if (shell.id < 0 || shell.id >= state.shells.length) continue;
    const rgba = pointRgbaForMode(shell, mode);
    const offset = shell.id * 4;
    colors[offset] = rgba[0];
    colors[offset + 1] = rgba[1];
    colors[offset + 2] = rgba[2];
    colors[offset + 3] = rgba[3];
  }
  state.pointColorCache.set(mode, colors);
  return colors;
}
function scheduleDraw(delay = 0) {
  state.needsDraw = true;
  state.scatterHitCache = null;
  if (delay > 0) {
    window.clearTimeout(state.drawTimer);
    state.drawTimer = window.setTimeout(() => scheduleDraw(), delay);
    return;
  }
  window.clearTimeout(state.drawTimer);
  state.drawTimer = 0;
  if (state.drawFrame) return;
  state.drawFrame = requestAnimationFrame(() => {
    state.drawFrame = 0;
    drawScatter();
  });
}
function drawScatterPoints(pointCache) {
  const pixelWidth = els.scatter.width;
  const pixelHeight = els.scatter.height;
  if (!pixelWidth || !pixelHeight) return;
  const dpr = window.devicePixelRatio || 1;
  const imageData = scatterCtx.createImageData(pixelWidth, pixelHeight);
  const data = imageData.data;
  const colors = pointColorArray(state.colorMode);
  const dotSize = Math.max(3, Math.round(dpr * 2.4));
  const dotOffset = Math.floor(dotSize / 2);
  for (let index = 0; index < pointCache.shells.length; index += 1) {
    const shell = pointCache.shells[index];
    const pointX = Math.round(pointCache.points[index * 2] * dpr);
    const pointY = Math.round(pointCache.points[index * 2 + 1] * dpr);
    if (pointX < -dotSize || pointX >= pixelWidth + dotSize || pointY < -dotSize || pointY >= pixelHeight + dotSize) {
      continue;
    }
    const colorOffset = shell.id >= 0 && shell.id < state.shells.length ? shell.id * 4 : -1;
    const fallback = colorOffset < 0 ? pointRgbaForMode(shell, state.colorMode) : null;
    const red = colorOffset < 0 ? fallback[0] : colors[colorOffset];
    const green = colorOffset < 0 ? fallback[1] : colors[colorOffset + 1];
    const blue = colorOffset < 0 ? fallback[2] : colors[colorOffset + 2];
    const alpha = colorOffset < 0 ? fallback[3] : colors[colorOffset + 3];
    for (let y = 0; y < dotSize; y += 1) {
      const py = pointY + y - dotOffset;
      if (py < 0 || py >= pixelHeight) continue;
      for (let x = 0; x < dotSize; x += 1) {
        const px = pointX + x - dotOffset;
        if (px < 0 || px >= pixelWidth) continue;
        const offset = (py * pixelWidth + px) * 4;
        data[offset] = red;
        data[offset + 1] = green;
        data[offset + 2] = blue;
        data[offset + 3] = alpha;
      }
    }
  }
  scatterCtx.putImageData(imageData, 0, 0);
}
function drawScatter() {
  const size = resizeCanvas(els.scatter, scatterCtx);
  if (!state.viewport || !state.needsDraw) return;
  state.needsDraw = false;
  scatterCtx.clearRect(0, 0, size.width, size.height);
  const pointCache = scatterScreenPoints(size);
  drawScatterPoints(pointCache);
  scatterCtx.save();
  scatterCtx.lineWidth = 1;
  scatterCtx.strokeStyle = "rgba(32, 36, 42, 0.25)";
  const origin = worldToScreen(0, 0, size);
  if (origin.x >= 0 && origin.x <= size.width) {
    scatterCtx.beginPath();
    scatterCtx.moveTo(origin.x, 0);
    scatterCtx.lineTo(origin.x, size.height);
    scatterCtx.stroke();
  }
  if (origin.y >= 0 && origin.y <= size.height) {
    scatterCtx.beginPath();
    scatterCtx.moveTo(0, origin.y);
    scatterCtx.lineTo(size.width, origin.y);
    scatterCtx.stroke();
  }
  const values = activeAxisValues();
  if (values.length) {
    const target = worldToScreen(values[state.xAxis] || 0, values[state.yAxis] || 0, size);
    scatterCtx.strokeStyle = "#c65d4b";
    scatterCtx.lineWidth = 2;
    scatterCtx.beginPath();
    scatterCtx.moveTo(target.x - 10, target.y);
    scatterCtx.lineTo(target.x + 10, target.y);
    scatterCtx.moveTo(target.x, target.y - 10);
    scatterCtx.lineTo(target.x, target.y + 10);
    scatterCtx.stroke();
  }
  if (state.selected) {
    const selected = worldToScreen(
      axisValue(state.selected, state.xAxis),
      axisValue(state.selected, state.yAxis),
      size
    );
    scatterCtx.fillStyle = "#ffffff";
    scatterCtx.strokeStyle = "#20242a";
    scatterCtx.lineWidth = 2;
    scatterCtx.beginPath();
    scatterCtx.arc(selected.x, selected.y, 6, 0, Math.PI * 2);
    scatterCtx.fill();
    scatterCtx.stroke();
  }
  scatterCtx.restore();
}
function scatterHitKey(size) {
  const viewport = state.viewport || {};
  return [
    state.xAxis,
    state.yAxis,
    size.width.toFixed(1),
    size.height.toFixed(1),
    Number(viewport.minX || 0).toFixed(4),
    Number(viewport.maxX || 0).toFixed(4),
    Number(viewport.minY || 0).toFixed(4),
    Number(viewport.maxY || 0).toFixed(4)
  ].join("|");
}
function scatterScreenPoints(size) {
  var _a;
  const key = scatterHitKey(size);
  if (((_a = state.scatterPointCache) == null ? void 0 : _a.key) === key && state.scatterPointCache.shells === state.filtered) {
    return state.scatterPointCache;
  }
  const shells = state.filtered;
  const points = new Float32Array(shells.length * 2);
  for (let index = 0; index < shells.length; index += 1) {
    const point = worldToScreen(axisValue(shells[index], state.xAxis), axisValue(shells[index], state.yAxis), size);
    points[index * 2] = point.x;
    points[index * 2 + 1] = point.y;
  }
  state.scatterPointCache = { key, shells, points };
  state.scatterHitCache = null;
  return state.scatterPointCache;
}
function scatterHitPoints(size) {
  var _a;
  const pointCache = scatterScreenPoints(size);
  const key = pointCache.key;
  if (((_a = state.scatterHitCache) == null ? void 0 : _a.key) === key && state.scatterHitCache.shells === state.filtered) {
    return state.scatterHitCache;
  }
  const shells = pointCache.shells;
  const points = pointCache.points;
  const cellSize = 24;
  const grid = /* @__PURE__ */ new Map();
  for (let index = 0; index < shells.length; index += 1) {
    const pointX = points[index * 2];
    const pointY = points[index * 2 + 1];
    if (pointX < -cellSize || pointX > size.width + cellSize || pointY < -cellSize || pointY > size.height + cellSize) {
      continue;
    }
    const cellX = Math.floor(pointX / cellSize);
    const cellY = Math.floor(pointY / cellSize);
    const cellKey = `${cellX},${cellY}`;
    let bucket = grid.get(cellKey);
    if (!bucket) {
      bucket = [];
      grid.set(cellKey, bucket);
    }
    bucket.push(index);
  }
  state.scatterHitCache = { key, shells, points, grid, cellSize };
  return state.scatterHitCache;
}
function shellOriginKey(shell) {
  var _a;
  return ((_a = shell == null ? void 0 : shell.species_traits) == null ? void 0 : _a.region_key) || (shell == null ? void 0 : shell.location_key) || "unknown";
}
function shellOriginLabel(shell) {
  var _a;
  return ((_a = shell == null ? void 0 : shell.species_traits) == null ? void 0 : _a.region_label) || (shell == null ? void 0 : shell.region_label) || (shell == null ? void 0 : shell.location_label) || "Unknown";
}
function shellOriginMatches(shell, filterValue2) {
  var _a, _b, _c;
  if (!filterValue2) return true;
  const [type, value] = filterValue2.split(":");
  if (!value) return shellOriginKey(shell) === filterValue2;
  if (type === "region") {
    return ((_a = shell == null ? void 0 : shell.species_traits) == null ? void 0 : _a.region_key) === value || (shell == null ? void 0 : shell.region_key) === value || (shell == null ? void 0 : shell.location_key) === value || shellOriginKey(shell) === value;
  }
  if (type === "country") {
    return (shell == null ? void 0 : shell.location_key) === value || ((_b = shell == null ? void 0 : shell.species_traits) == null ? void 0 : _b.primary_country) === value || (((_c = shell == null ? void 0 : shell.species_traits) == null ? void 0 : _c.known_range_countries) || []).some((country) => country.code === value);
  }
  return shellOriginKey(shell) === filterValue2;
}
function hexToRgb(hex) {
  const value = String(hex || "").replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(value)) return null;
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}
function shellColorDistance(shell, hex) {
  const target = hexToRgb(hex);
  if (!target) return Infinity;
  const shellColor = shellRgba(shell);
  const dr = shellColor[0] - target.r;
  const dg = shellColor[1] - target.g;
  const db = shellColor[2] - target.b;
  const patternBonus = Math.min(24, Math.max(0, shell.color_pattern_strength || 0) * 80);
  return Math.sqrt(dr * dr + dg * dg + db * db) - patternBonus;
}
function shellMatchesColor(shell, hex) {
  if (!hex) return true;
  return shellColorDistance(shell, hex) <= 105;
}
function filterValue(shell, key) {
  var _a;
  if (key === "lightness") return clamp01(shell.color_l_mean || 0);
  if (key === "area") return relativeArea(shell);
  if (key === "concavity") return clamp01((shell.contour_concavity || 0) / 0.32);
  if (key === "asymmetry") return clamp01(((_a = shell.morph_traits) == null ? void 0 : _a.asymmetry) || 0);
  return 0;
}
function passesMorphFilters(shell) {
  for (const def of rangeFilterDefs) {
    const filter = state.morphFilters.get(def.key);
    if (!filter) continue;
    const value = filterValue(shell, def.key);
    if (value < filter.min || value > filter.max) return false;
  }
  if (state.categoryFilters.rarity && shell.rarity_label !== state.categoryFilters.rarity) return false;
  if (!shellOriginMatches(shell, state.categoryFilters.origin)) return false;
  if (!shellMatchesColor(shell, state.categoryFilters.color)) return false;
  return true;
}
function updateFilter() {
  var _a;
  const query = els.search.value.trim().toLowerCase();
  state.filtered = query ? state.shells.filter(
    (shell) => `${shell.name} ${shell.species} ${shell.file} ${shell.fingerprint_hash || ""} ${shell.legacy_fingerprint_hash || ""} ${shell.location_label || ""}`.toLowerCase().includes(query) && passesMorphFilters(shell)
  ) : state.shells.filter(passesMorphFilters);
  state.scatterHitCache = null;
  state.scatterPointCache = null;
  resetSurpriseQueue();
  primeSurpriseQueue();
  scheduleRenderNeighbors(state.selected);
  renderPalette(false);
  if (els.statusLine && ((_a = state.model) == null ? void 0 : _a.processed_count)) {
    els.statusLine.textContent = `${state.filtered.length.toLocaleString()} of ${state.model.processed_count.toLocaleString()} shells`;
  }
  updateFilterButton();
  scheduleDraw(120);
}
function updateFilterButton() {
  if (!els.filtersToggle) return;
  let active = 0;
  for (const def of rangeFilterDefs) {
    const filter = state.morphFilters.get(def.key);
    if (filter && (filter.min > 0 || filter.max < 1)) active += 1;
  }
  for (const value of Object.values(state.categoryFilters)) {
    if (value) active += 1;
  }
  els.filtersToggle.textContent = active ? `Filters (${active})` : "Filters";
  els.filtersToggle.classList.toggle("is-active", active > 0);
}
function originFilterOptions() {
  return [
    ...originFilterData().regions.map((item) => [item.value, `Continent: ${item.label}`]),
    ...originFilterData().countries.map((item) => [item.value, `Country: ${item.label}`])
  ];
}
function originFilterData() {
  var _a, _b, _c, _d, _e, _f;
  const regions = /* @__PURE__ */ new Map();
  const countries = /* @__PURE__ */ new Map();
  if (state.originFilterOptionsCache) return state.originFilterOptionsCache;
  for (const shell of state.shells) {
    const regionKey = ((_a = shell.species_traits) == null ? void 0 : _a.region_key) || shell.region_key || "";
    const regionName = ((_b = shell.species_traits) == null ? void 0 : _b.region_label) || shell.region_label || "";
    if (regionKey && regionKey !== "unknown") {
      const value = `region:${regionKey}`;
      const current = regions.get(value) || { value, key: regionKey, label: regionName || shellOriginLabel(shell), count: 0 };
      current.count += 1;
      regions.set(value, current);
    }
    for (const country of ((_c = shell.species_traits) == null ? void 0 : _c.known_range_countries) || []) {
      if (!country.code || !country.label) continue;
      const value = `country:${country.code}`;
      const current = countries.get(value) || {
        value,
        code: country.code,
        label: country.label,
        region: ((_d = shell.species_traits) == null ? void 0 : _d.region_key) || "",
        count: 0
      };
      current.count += Math.max(1, Number(country.count || 0));
      countries.set(value, current);
    }
    const localityKey = shell.location_key || "";
    if (localityKey && localityKey !== "unknown" && localityKey.length <= 3) {
      const value = `country:${localityKey}`;
      const current = countries.get(value) || {
        value,
        code: localityKey,
        label: ((_e = shell.location_label) == null ? void 0 : _e.split(",")[0]) || localityKey,
        region: ((_f = shell.species_traits) == null ? void 0 : _f.region_key) || "",
        count: 0
      };
      current.count += 1;
      countries.set(value, current);
    }
  }
  state.originFilterOptionsCache = {
    regions: [...regions.values()].sort((a, b) => a.label.localeCompare(b.label)),
    countries: [...countries.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
  };
  return state.originFilterOptionsCache;
}
function addOriginSelectFilter() {
  const row = document.createElement("label");
  row.className = "filter-row filter-panel-card filter-select-row filter-origin-row";
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = "Origin";
  const output = document.createElement("output");
  output.textContent = originFilterLabel(state.categoryFilters.origin);
  header.append(label, output);
  const select = document.createElement("select");
  select.setAttribute("aria-label", "Origin");
  for (const [value, labelValue] of [["", "Any origin"], ...originFilterOptions()]) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = labelValue;
    select.append(option);
  }
  select.value = state.categoryFilters.origin || "";
  select.addEventListener("change", () => {
    state.categoryFilters.origin = select.value;
    buildTraitFilters();
    updateFilter();
  });
  row.append(header, select);
  els.filterControls.append(row);
}
function addRarityFilter() {
  const row = document.createElement("div");
  row.className = "filter-row filter-panel-card rarity-filter-row";
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = "Rarity";
  const output = document.createElement("output");
  output.textContent = state.categoryFilters.rarity || "Any";
  header.append(label, output);
  const levels = document.createElement("div");
  levels.className = "rarity-filter-options";
  for (const value of ["", ...rarityFilterOptions]) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = value || "Any";
    button.setAttribute("aria-pressed", (state.categoryFilters.rarity || "") === value ? "true" : "false");
    button.addEventListener("click", () => {
      state.categoryFilters.rarity = state.categoryFilters.rarity === value ? "" : value;
      buildTraitFilters();
      updateFilter();
    });
    levels.append(button);
  }
  row.append(header, levels);
  els.filterControls.append(row);
}
function originFilterLabel(value) {
  if (!value) return "Any";
  const data = originFilterData();
  const hit = [...data.regions, ...data.countries].find((item) => item.value === value);
  return (hit == null ? void 0 : hit.label) || "Any";
}
function addRangeFilter(def) {
  state.morphFilters.set(def.key, state.morphFilters.get(def.key) || { min: 0, max: 1 });
  const row = document.createElement("div");
  row.className = `filter-row filter-panel-card filter-range-row filter-${def.key}-row`;
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = def.label;
  const output = document.createElement("output");
  const current = state.morphFilters.get(def.key);
  const activeLevel = filterLevels.find((level) => Math.abs(current.min - level.min) < 0.01 && Math.abs(current.max - level.max) < 0.01);
  output.textContent = (activeLevel == null ? void 0 : activeLevel.label) || "Any";
  header.append(label, output);
  const levels = document.createElement("div");
  levels.className = "filter-levels";
  for (const level of filterLevels) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.level = level.key;
    button.textContent = level.label;
    button.title = `${def.label}: ${level.label}`;
    const pressed = (activeLevel == null ? void 0 : activeLevel.key) === level.key;
    button.setAttribute("aria-pressed", pressed ? "true" : "false");
    button.addEventListener("click", () => {
      const isActive = button.getAttribute("aria-pressed") === "true";
      state.morphFilters.set(def.key, isActive ? { min: 0, max: 1 } : { min: level.min, max: level.max });
      buildTraitFilters();
      updateFilter();
    });
    levels.append(button);
  }
  row.append(header, levels);
  els.filterControls.append(row);
}
function addColorPickerFilter() {
  var _a;
  const row = document.createElement("div");
  row.className = "filter-row filter-panel-card color-filter-row";
  const header = document.createElement("header");
  const label = document.createElement("span");
  label.textContent = "Color";
  const output = document.createElement("output");
  output.textContent = ((_a = colorSwatches.find(([hex]) => hex === state.categoryFilters.color)) == null ? void 0 : _a[1]) || "Any";
  header.append(label, output);
  const panel = document.createElement("div");
  panel.className = "color-filter-panel";
  const controls = document.createElement("div");
  controls.className = "color-swatch-filter";
  for (const [hex, name] of colorSwatches) {
    const button = document.createElement("button");
    button.type = "button";
    button.title = name;
    button.setAttribute("aria-label", name);
    button.setAttribute("aria-pressed", state.categoryFilters.color === hex ? "true" : "false");
    button.style.setProperty("--swatch", hex);
    const dot = document.createElement("span");
    dot.className = "color-swatch-dot";
    button.append(dot);
    button.addEventListener("click", () => {
      state.categoryFilters.color = state.categoryFilters.color === hex ? "" : hex;
      buildTraitFilters();
      updateFilter();
    });
    controls.append(button);
  }
  panel.append(controls);
  row.append(header, panel);
  els.filterControls.append(row);
}
function buildTraitFilters() {
  if (!els.filterControls) return;
  els.filterControls.innerHTML = "";
  addOriginSelectFilter();
  addRarityFilter();
  addColorPickerFilter();
  for (const def of rangeFilterDefs) {
    if (!state.morphFilters.has(def.key)) state.morphFilters.set(def.key, { min: 0, max: 1 });
    addRangeFilter(def);
  }
  updateFilterButton();
}
function resetTraitFilters() {
  for (const def of rangeFilterDefs) state.morphFilters.set(def.key, { min: 0, max: 1 });
  state.categoryFilters = { origin: "", rarity: "", color: "" };
  buildTraitFilters();
  updateFilter();
}
function positionFiltersPanel() {
  var _a;
  if (!els.filtersPanel || !els.filtersToggle || els.filtersPanel.hidden) return;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1024;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 768;
  const toggleRect = els.filtersToggle.getBoundingClientRect();
  const controlsRect = (_a = document.querySelector(".controls-panel")) == null ? void 0 : _a.getBoundingClientRect();
  const desktopRoom = controlsRect ? viewportWidth - controlsRect.right - 24 : 0;
  const desktop = viewportWidth > 1080 && desktopRoom >= 520;
  const width = desktop ? Math.min(460, desktopRoom) : Math.min(460, Math.max(340, viewportWidth - 24));
  const preferredLeft = desktop ? controlsRect.right + 12 : toggleRect.left;
  const left = Math.max(12, Math.min(preferredLeft, viewportWidth - width - 12));
  const measuredHeight = els.filtersPanel.offsetHeight || 420;
  const preferredTop = desktop ? toggleRect.top : toggleRect.bottom + 8;
  const top = Math.max(12, Math.min(preferredTop, viewportHeight - Math.min(measuredHeight, viewportHeight - 24) - 12));
  els.filtersPanel.style.setProperty("--filters-left", `${Math.round(left)}px`);
  els.filtersPanel.style.setProperty("--filters-top", `${Math.round(top)}px`);
  els.filtersPanel.style.setProperty("--filters-width", `${Math.round(width)}px`);
}
function setFiltersPanelOpen(open) {
  if (!els.filtersPanel || !els.filtersToggle) return;
  els.filtersPanel.hidden = !open;
  els.filtersToggle.setAttribute("aria-expanded", open ? "true" : "false");
  if (open) {
    positionFiltersPanel();
    window.requestAnimationFrame(positionFiltersPanel);
  }
}
function shellById(id) {
  const numeric = Number(id);
  if (!Number.isFinite(numeric)) return null;
  return state.shellById.get(numeric) || null;
}
function centerViewportOnShell(shell) {
  if (!state.viewport || !shell) return;
  const width = state.viewport.maxX - state.viewport.minX;
  const height = state.viewport.maxY - state.viewport.minY;
  const x = axisValue(shell, state.xAxis);
  const y = axisValue(shell, state.yAxis);
  state.viewport = {
    minX: x - width / 2,
    maxX: x + width / 2,
    minY: y - height / 2,
    maxY: y + height / 2
  };
}
function selectRandomShell() {
  const source = state.filtered.length ? state.filtered : state.shells;
  if (!source.length) return;
  const shell = randomShellFromSource(source);
  if (!shell) return;
  centerViewportOnShell(shell);
  selectShell(shell);
  scheduleDraw(420);
  primeSurpriseQueue(source);
}
function iucnSearchUrl(species) {
  const encoded = encodeURIComponent(species || "");
  return `https://www.iucnredlist.org/search?query=${encoded}&searchType=species`;
}
function speciesCacheKey(species) {
  return String(species || "").trim().toLowerCase();
}
function iucnStatusName(code) {
  const normalized = String(code || "").trim().toUpperCase();
  return {
    EX: "Extinct",
    EW: "Extinct in the wild",
    CR: "Critically endangered",
    EN: "Endangered",
    VU: "Vulnerable",
    NT: "Near threatened",
    LC: "Least concern",
    DD: "Data deficient"
  }[normalized] || normalized;
}
function conservationRecordIsGlobal(record) {
  return record && (record.place == null && record.place_id == null);
}
function conservationRecordIsIucn(record) {
  return /iucn/i.test(String((record == null ? void 0 : record.authority) || "")) || Number((record == null ? void 0 : record.iucn) || 0) > 0;
}
function bestConservationRecord(...taxa) {
  const records = [];
  for (const taxon of taxa) {
    if (!taxon) continue;
    if (taxon.conservation_status) records.push(taxon.conservation_status);
    if (Array.isArray(taxon.conservation_statuses)) records.push(...taxon.conservation_statuses);
  }
  return records.find((record) => conservationRecordIsGlobal(record) && conservationRecordIsIucn(record)) || records.find((record) => conservationRecordIsIucn(record)) || records.find((record) => conservationRecordIsGlobal(record)) || records[0] || null;
}
function conservationStatusLabel(record) {
  if (!record) return "Not assessed";
  const code = String(record.status || "").trim().toUpperCase();
  const rawName = record.status_name || record.description || iucnStatusName(code) || code;
  const name = String(rawName || "").trim();
  if (!name) return "Not assessed";
  if (!code || name.toUpperCase().includes(`(${code})`) || name.toUpperCase() === code) return name;
  return `${name} (${code})`;
}
function pickINaturalistTaxon(results, species) {
  const key = speciesCacheKey(species);
  return results.find((taxon) => speciesCacheKey(taxon.name) === key) || results.find((taxon) => speciesCacheKey(taxon.matched_term) === key) || results.find((taxon) => taxon.rank === "species") || results[0] || null;
}
async function lookupConservationStatus(species, { signal = null } = {}) {
  var _a;
  const key = speciesCacheKey(species);
  if (!key) return { status: "Not assessed", authority: "", url: "", taxonId: null };
  if (state.conservationCache.has(key)) return state.conservationCache.get(key);
  const params = new URLSearchParams({ q: species, per_page: "8" });
  const fallback = { status: "Not assessed", authority: "iNaturalist", url: iucnSearchUrl(species), taxonId: null };
  try {
    const searchResponse = await fetch(`https://api.inaturalist.org/v1/taxa/autocomplete?${params.toString()}`, { signal });
    if (!searchResponse.ok) return fallback;
    const searchPayload = await searchResponse.json();
    const taxon = pickINaturalistTaxon(searchPayload.results || [], species);
    if (!(taxon == null ? void 0 : taxon.id)) {
      state.conservationCache.set(key, fallback);
      return fallback;
    }
    let detailTaxon = taxon;
    const detailResponse = await fetch(`https://api.inaturalist.org/v1/taxa/${taxon.id}`, { signal });
    if (detailResponse.ok) {
      const detailPayload = await detailResponse.json();
      detailTaxon = ((_a = detailPayload.results) == null ? void 0 : _a[0]) || taxon;
    }
    const record = bestConservationRecord(detailTaxon, taxon);
    const result = {
      status: conservationStatusLabel(record),
      authority: (record == null ? void 0 : record.authority) || "iNaturalist",
      url: (record == null ? void 0 : record.url) || iucnSearchUrl(species),
      taxonId: taxon.id
    };
    state.conservationCache.set(key, result);
    return result;
  } catch (error) {
    if ((error == null ? void 0 : error.name) === "AbortError") throw error;
    return fallback;
  }
}
function zoom(factor, center = null) {
  const size = resizeCanvas(els.scatter, scatterCtx);
  const pivot = center || { x: size.width / 2, y: size.height / 2 };
  const before = screenToWorld(pivot.x, pivot.y, size);
  const vx = state.viewport;
  const width = (vx.maxX - vx.minX) * factor;
  const height = (vx.maxY - vx.minY) * factor;
  state.viewport = {
    minX: before.x - pivot.x / size.width * width,
    maxX: before.x + (1 - pivot.x / size.width) * width,
    minY: before.y - (size.height - pivot.y) / size.height * height,
    maxY: before.y + pivot.y / size.height * height
  };
  scheduleDraw();
}
function buildAxisControls() {
  const count = axisOptionCount();
  for (const select of [els.xAxisSelect, els.yAxisSelect]) {
    select.innerHTML = "";
    for (let index = 0; index < count; index += 1) {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = `${axisLabel(index)} (${formatNumber(axisVariance(index) * 100, 1)}%)`;
      select.append(option);
    }
  }
  els.xAxisSelect.value = String(state.xAxis);
  els.yAxisSelect.value = String(state.yAxis);
}
function setAxes(xAxis, yAxis) {
  state.xAxis = xAxis;
  state.yAxis = yAxis;
  els.xAxisSelect.value = String(xAxis);
  els.yAxisSelect.value = String(yAxis);
  state.viewport = initialViewport(xAxis, yAxis);
  scheduleDraw(120);
  scheduleHashUpdate();
}
function buildPcControls() {
  els.pcControls.innerHTML = "";
  const count = contourAxisCount();
  state.pcValues = Array.from({ length: state.model.contour_component_count || count }, () => 0);
  for (let index = 0; index < count; index += 1) {
    const range = state.model.contour_pca_ranges[index];
    const low = range ? range.p01 : -1;
    const high = range ? range.p99 : 1;
    const step = Math.max((high - low) / 500, 1e-3);
    const row = document.createElement("div");
    row.className = "pc-row";
    row.dataset.pcRow = String(index);
    const label = document.createElement("label");
    label.textContent = axisMeaning(index);
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(low);
    slider.max = String(high);
    slider.step = String(step);
    slider.value = "0";
    const number = document.createElement("input");
    number.type = "number";
    number.step = String(step);
    number.value = "0.000";
    slider.addEventListener("input", () => setPcValue(index, Number(slider.value)));
    number.addEventListener("change", () => setPcValue(index, Number(number.value)));
    row.append(label, slider, number);
    els.pcControls.append(row);
  }
}
function updatePcControl(index, value) {
  const row = document.querySelector(`[data-pc-row="${index}"]`);
  if (!row) return;
  row.querySelector("input[type='range']").value = String(value);
  row.querySelector("input[type='number']").value = Number(value).toFixed(3);
}
function setPcValue(index, value) {
  state.pcValues[index] = value;
  updatePcControl(index, value);
  reconstructFromPc();
  scheduleDraw();
  scheduleHashUpdate();
}
function setPcValues(values, updateHash = true) {
  values.forEach((value, index) => {
    state.pcValues[index] = value;
    updatePcControl(index, value);
  });
  reconstructFromPc();
  scheduleDraw();
  if (updateHash) scheduleHashUpdate();
}
function contourForShell(shell) {
  var _a, _b;
  if (!shell) return null;
  const uploadContour = shell.upload_contour || (shell.id < 0 && state.selected === shell ? state.selectedContour : null);
  if (shell.id < 0 && uploadContour) {
    const points2 = [];
    const centerX = ((_a = shell.center) == null ? void 0 : _a[0]) || 0;
    const centerY = ((_b = shell.center) == null ? void 0 : _b[1]) || 0;
    const radius = shell.mean_radius || 1;
    for (let index = 0; index < uploadContour.length; index += 2) {
      points2.push([
        centerX + uploadContour[index] * radius,
        centerY + uploadContour[index + 1] * radius
      ]);
    }
    return points2;
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
function normalizedContour(shell) {
  if (shell == null ? void 0 : shell.upload_contour) return shell.upload_contour;
  if ((shell == null ? void 0 : shell.id) < 0 && state.selected === shell && state.selectedContour) return state.selectedContour;
  if (normalizedContourCache.has(shell.id)) return normalizedContourCache.get(shell.id);
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
function shapeTraitsFromShell(shell) {
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
    contour_solidity: shell.contour_solidity
  };
}
function shellColorName(shell) {
  const lightness = shell.color_l_mean ?? 0.5;
  const chroma = shell.color_chroma_mean ?? 0.1;
  const hue = (Math.atan2(shell.color_hue_sin || 0, shell.color_hue_cos || 1) * 180 / Math.PI + 360) % 360;
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
function effectiveGeneratedTraits() {
  return state.generatedTraits || shapeTraitsFromShell(state.selected);
}
function reconstructFromPc() {
  const out = contourFromPcValues(state.pcValues);
  if (!out) return;
  state.generatedContour = out;
  state.generatedTraits = null;
  state.generatedMode = "pca";
  drawOutline();
}
function contourFromPcValues(values) {
  var _a, _b, _c, _d, _e;
  if (!((_b = (_a = state.model) == null ? void 0 : _a.contour_mean) == null ? void 0 : _b.length) || !((_d = (_c = state.model) == null ? void 0 : _c.contour_components) == null ? void 0 : _d.length)) return null;
  const valueCount = state.model.contour_mean.length;
  const out = new Float32Array(valueCount);
  for (let index = 0; index < valueCount; index += 1) {
    let value = state.model.contour_mean[index] || 0;
    for (let pc = 0; pc < state.model.contour_components.length; pc += 1) {
      value += (values[pc] || 0) * (((_e = state.model.contour_components[pc]) == null ? void 0 : _e[index]) || 0);
    }
    out[index] = value;
  }
  return out;
}
function maxContourRadius(contours) {
  let radius = 0;
  for (const contour of contours) {
    if (!contour) continue;
    for (let index = 0; index < contour.length; index += 2) {
      radius = Math.max(radius, Math.hypot(contour[index], contour[index + 1]));
    }
  }
  return radius || 1;
}
function contourPath(ctx, contour, centerX, centerY, scale) {
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
function shellFillColor(traits, alpha = 0.9) {
  const red = Math.round(clamp01((traits == null ? void 0 : traits.color_r_mean) ?? 0.72) * 255);
  const green = Math.round(clamp01((traits == null ? void 0 : traits.color_g_mean) ?? 0.66) * 255);
  const blue = Math.round(clamp01((traits == null ? void 0 : traits.color_b_mean) ?? 0.54) * 255);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
function generatedFingerprintHash() {
  const values = state.pcValues.slice(0, 6).map((value) => Number(value || 0).toFixed(4));
  return hashString(`projected|${values.join(",")}`).toString(36).toUpperCase().padStart(6, "0").slice(-6);
}
function updateHashChips() {
  var _a, _b, _c;
  if (((_a = state.selected) == null ? void 0 : _a.fingerprint_hash) && els.physicalHash) {
    applyShellFingerprintStyle(els.physicalHash, state.selected);
  }
  if (els.projectedHash) {
    const hash = state.generatedMode === "selected" && ((_b = state.selected) == null ? void 0 : _b.fingerprint_hash) ? state.selected.fingerprint_hash : generatedFingerprintHash();
    if (state.generatedMode === "selected" && ((_c = state.selected) == null ? void 0 : _c.fingerprint_hash)) {
      applyShellFingerprintStyle(els.projectedHash, state.selected, hash);
    } else {
      applyFingerprintStyle(els.projectedHash, hash);
    }
  }
}
function drawGeneratedTexture(ctx, contour, centerX, centerY, scale, traits) {
  const pointCount = Math.floor(contour.length / 2);
  if (pointCount < 4) return;
  const roughness = clamp01(((traits == null ? void 0 : traits.roughness) || 0.012) / 0.04);
  const chroma = clamp01(((traits == null ? void 0 : traits.color_chroma_mean) || 0.08) / 0.35);
  const concavity = clamp01(((traits == null ? void 0 : traits.contour_concavity) || 0.04) / 0.35);
  const pattern = clamp01(((traits == null ? void 0 : traits.color_pattern_strength) || 0.06) / 0.22);
  const patternContrast = clamp01(((traits == null ? void 0 : traits.color_pattern_contrast) || 0.04) / 0.18);
  ctx.save();
  contourPath(ctx, contour, centerX, centerY, scale);
  ctx.clip();
  const ringCount = 4 + Math.round(concavity * 4 + pattern * 5);
  for (let ring = 1; ring <= ringCount; ring += 1) {
    contourPath(ctx, contour, centerX, centerY, scale * (0.16 + ring / (ringCount + 1) * 0.78));
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
    scale * 1.25
  );
  gloss.addColorStop(0, "rgba(255, 255, 255, 0.34)");
  gloss.addColorStop(0.45, "rgba(255, 255, 255, 0.08)");
  gloss.addColorStop(1, "rgba(32, 36, 42, 0.08)");
  ctx.fillStyle = gloss;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}
function drawOutline() {
  const { width, height } = els.outline;
  outlineCtx.clearRect(0, 0, width, height);
  outlineCtx.fillStyle = "#f7f7f2";
  outlineCtx.fillRect(0, 0, width, height);
  const contour = state.generatedContour || state.selectedContour;
  if (!contour) return;
  updateHashChips();
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = Math.min(width, height) * 0.42 / maxContourRadius([contour]);
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
function svgPathFromContour(contour, centerX, centerY, scale) {
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
function exportGeneratedSvg() {
  const contour = state.generatedContour || state.selectedContour;
  if (!contour) return;
  const size = 512;
  const center = size / 2;
  const scale = size * 0.42 / maxContourRadius([contour]);
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
function contourFallbackDataUrl(shell) {
  const contour = contourForShell(shell);
  if (!(contour == null ? void 0 : contour.length)) return "";
  const width = shell.image_width || 400;
  const height = shell.image_height || 300;
  const path = contour.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#f7f7f2"/><path d="${path} Z" fill="${shellRgb(shell, 0.35)}" stroke="#287a74" stroke-width="3" stroke-linejoin="round"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function fitImageFrame(imageWidth, imageHeight, frameWidth, frameHeight) {
  const scale = Math.min(frameWidth / Math.max(1, imageWidth), frameHeight / Math.max(1, imageHeight));
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  return {
    x: (frameWidth - width) / 2,
    y: (frameHeight - height) / 2,
    width,
    height,
    scale
  };
}
function thumbnailPageForShell(shell) {
  var _a;
  const atlas = (_a = state.model) == null ? void 0 : _a.thumbnail_atlas;
  if (!atlas || !shell || shell.id < 0) return null;
  const perAtlas = atlas.per_atlas || 2048;
  return Math.floor(shell.id / perAtlas);
}
function thumbnailSourceRect(shell) {
  var _a;
  const atlas = (_a = state.model) == null ? void 0 : _a.thumbnail_atlas;
  const page = thumbnailPageForShell(shell);
  if (!atlas || page == null) return null;
  const tile = atlas.size || 56;
  const columns = atlas.columns || 64;
  const perAtlas = atlas.per_atlas || 2048;
  const local = shell.id % perAtlas;
  const tileX = local % columns * tile;
  const tileY = Math.floor(local / columns) * tile;
  const imageScale = Math.min(tile / Math.max(1, shell.image_width), tile / Math.max(1, shell.image_height));
  const width = Math.max(1, shell.image_width * imageScale);
  const height = Math.max(1, shell.image_height * imageScale);
  return {
    page,
    x: tileX + (tile - width) / 2,
    y: tileY + (tile - height) / 2,
    width,
    height
  };
}
function loadThumbnailPage(page) {
  var _a, _b;
  const atlas = (_a = state.model) == null ? void 0 : _a.thumbnail_atlas;
  if (!((_b = atlas == null ? void 0 : atlas.files) == null ? void 0 : _b[page])) return Promise.resolve(null);
  if (thumbnailPageCache.has(page)) return thumbnailPageCache.get(page);
  const promise = new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      state.loadedThumbnailPages.add(page);
      resolve(image);
    };
    image.onerror = () => resolve(null);
    image.src = asset(`data/${atlas.dir}/${atlas.files[page]}`);
  });
  thumbnailPageCache.set(page, promise);
  return promise;
}
function loadOriginalImage(shell) {
  if (!shell || shell.id < 0 || !shell.file) return Promise.resolve(null);
  if (originalImageCache.has(shell.file)) return originalImageCache.get(shell.file);
  const promise = new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = datasetAsset(shell.file);
  });
  originalImageCache.set(shell.file, promise);
  return promise;
}
function buildThumbnailPageIndex(shells) {
  const byPage = /* @__PURE__ */ new Map();
  for (const shell of shells) {
    const page = thumbnailPageForShell(shell);
    if (page == null) continue;
    let pageShells = byPage.get(page);
    if (!pageShells) {
      pageShells = [];
      byPage.set(page, pageShells);
    }
    pageShells.push(shell);
  }
  return byPage;
}
function scheduleIdleWork(callback, timeout = 1200) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout });
    return;
  }
  window.setTimeout(callback, Math.min(timeout, 160));
}
function randomShellFromSource(source, avoidId = ((_a) => (_a = state.selected) == null ? void 0 : _a.id)()) {
  if (!source.length) return null;
  let index = Math.floor(Math.random() * source.length);
  if (avoidId != null && source.length > 1 && source[index].id === avoidId) {
    index = (index + 1 + Math.floor(Math.random() * (source.length - 1))) % source.length;
  }
  return source[index];
}
function resetSurpriseQueue() {
  state.surpriseQueue = [];
  state.surpriseQueueSource = null;
  window.clearTimeout(state.surprisePrimeTimer);
  state.surprisePrimeTimer = 0;
}
function queueRandomSurpriseShell(source) {
  const queuedIds = new Set(state.surpriseQueue.map((entry2) => {
    var _a;
    return (_a = entry2.shell) == null ? void 0 : _a.id;
  }));
  let shell = null;
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const candidate = randomShellFromSource(source);
    if (!candidate || queuedIds.has(candidate.id)) continue;
    shell = candidate;
    break;
  }
  if (!shell) shell = randomShellFromSource(source);
  if (!shell) return;
  const page = thumbnailPageForShell(shell);
  const entry = { shell, page, ready: page == null || state.loadedThumbnailPages.has(page) };
  state.surpriseQueue.push(entry);
  if (page != null && !entry.ready) {
    loadThumbnailPage(page).then((image) => {
      entry.ready = Boolean(image);
    });
  }
}
function primeSurpriseQueue(source = state.filtered, targetSize = 3) {
  if (!source.length) return;
  if (state.surpriseQueueSource !== source) {
    state.surpriseQueue = [];
    state.surpriseQueueSource = source;
  }
  window.clearTimeout(state.surprisePrimeTimer);
  state.surprisePrimeTimer = window.setTimeout(() => {
    scheduleIdleWork(() => {
      while (state.surpriseQueue.length < targetSize) queueRandomSurpriseShell(source);
    }, 500);
  }, 80);
}
function thumbnailWarmOrder() {
  var _a, _b;
  const files = ((_b = (_a = state.model) == null ? void 0 : _a.thumbnail_atlas) == null ? void 0 : _b.files) || [];
  const selectedPage = thumbnailPageForShell(state.selected);
  return Array.from({ length: files.length }, (_value, index) => index).sort((left, right) => {
    const leftDistance = selectedPage == null ? left : Math.abs(left - selectedPage);
    const rightDistance = selectedPage == null ? right : Math.abs(right - selectedPage);
    return leftDistance - rightDistance;
  });
}
function warmThumbnailPages({ eager = false } = {}) {
  var _a, _b, _c;
  if (state.warmingThumbnails || !((_c = (_b = (_a = state.model) == null ? void 0 : _a.thumbnail_atlas) == null ? void 0 : _b.files) == null ? void 0 : _c.length)) return;
  state.warmingThumbnails = true;
  const order = thumbnailWarmOrder();
  let cursor = 0;
  let active = 0;
  const concurrency = eager ? 4 : 2;
  const pump = () => {
    while (active < concurrency && cursor < order.length) {
      const page = order[cursor];
      cursor += 1;
      if (state.loadedThumbnailPages.has(page)) continue;
      active += 1;
      loadThumbnailPage(page).finally(() => {
        active -= 1;
        scheduleIdleWork(pump, eager ? 200 : 1200);
      });
    }
    if (cursor >= order.length && active === 0) {
      state.warmingThumbnails = false;
    }
  };
  scheduleIdleWork(pump, eager ? 100 : 1600);
}
function drawLoadedThumbnailImage(ctx, shell, source, image, frameWidth, frameHeight) {
  if (!source || !image) return false;
  const frame = fitImageFrame(shell.image_width, shell.image_height, frameWidth, frameHeight);
  ctx.drawImage(
    image,
    source.x,
    source.y,
    source.width,
    source.height,
    frame.x,
    frame.y,
    frame.width,
    frame.height
  );
  return frame;
}
function thumbnailContourPath(ctx, shell, frame) {
  const contour = contourForShell(shell);
  if (!(contour == null ? void 0 : contour.length) || !frame) return false;
  ctx.beginPath();
  for (let index = 0; index < contour.length; index += 1) {
    const x = frame.x + contour[index][0] * frame.scale;
    const y = frame.y + contour[index][1] * frame.scale;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  return true;
}
function drawContourFallbackThumb(ctx, shell, frame, frameWidth, frameHeight) {
  if (!thumbnailContourPath(ctx, shell, frame)) return false;
  ctx.fillStyle = shellRgb(shell, 0.9);
  ctx.fill();
  const hsl = rgbToHsl(shell.color_r_mean ?? 0.68, shell.color_g_mean ?? 0.64, shell.color_b_mean ?? 0.56);
  ctx.strokeStyle = hslCss(hsl.h, Math.max(0.18, hsl.s * 0.8), Math.max(0.16, hsl.l - 0.22));
  ctx.lineWidth = Math.max(1.25, Math.min(frameWidth, frameHeight) * 0.025);
  ctx.stroke();
  return true;
}
function contourPointBounds(points) {
  if (!(points == null ? void 0 : points.length)) return null;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of points) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  if (!Number.isFinite(minX) || maxX <= minX || maxY <= minY) return null;
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}
function paddedContourCrop(shell, contour, paddingRatio = 0.08) {
  const bounds = contourPointBounds(contour);
  if (!bounds) return null;
  const pad = Math.max(2, Math.max(bounds.width, bounds.height) * paddingRatio);
  const imageWidth = Math.max(shell.image_width || 0, bounds.maxX + pad);
  const imageHeight = Math.max(shell.image_height || 0, bounds.maxY + pad);
  const x = Math.max(0, bounds.minX - pad);
  const y = Math.max(0, bounds.minY - pad);
  const right = Math.min(imageWidth, bounds.maxX + pad);
  const bottom = Math.min(imageHeight, bounds.maxY + pad);
  return {
    x,
    y,
    width: Math.max(1, right - x),
    height: Math.max(1, bottom - y)
  };
}
function fitCropFrame(crop, frameWidth, frameHeight, inset = 2) {
  const availableWidth = Math.max(1, frameWidth - inset * 2);
  const availableHeight = Math.max(1, frameHeight - inset * 2);
  const scale = Math.min(availableWidth / crop.width, availableHeight / crop.height);
  const width = crop.width * scale;
  const height = crop.height * scale;
  return {
    x: (frameWidth - width) / 2,
    y: (frameHeight - height) / 2,
    width,
    height,
    scale
  };
}
function croppedContourPath(ctx, contour, crop, frame) {
  if (!(contour == null ? void 0 : contour.length) || !crop || !frame) return false;
  ctx.beginPath();
  for (let index = 0; index < contour.length; index += 1) {
    const x = frame.x + (contour[index][0] - crop.x) * frame.scale;
    const y = frame.y + (contour[index][1] - crop.y) * frame.scale;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  return true;
}
function drawCroppedContourFallback(ctx, shell, contour, crop, frame, frameWidth, frameHeight) {
  if (!croppedContourPath(ctx, contour, crop, frame)) return false;
  ctx.fillStyle = shellRgb(shell, 0.92);
  ctx.fill();
  const hsl = rgbToHsl(shell.color_r_mean ?? 0.68, shell.color_g_mean ?? 0.64, shell.color_b_mean ?? 0.56);
  ctx.strokeStyle = hslCss(hsl.h, Math.max(0.2, hsl.s * 0.84), Math.max(0.14, hsl.l - 0.24));
  ctx.lineWidth = Math.max(1.4, Math.min(frameWidth, frameHeight) * 0.035);
  ctx.stroke();
  return true;
}
function transparentBlackPixels(ctx, x, y, width, height) {
  const matrix = ctx.getTransform();
  const scaleX = Math.abs(matrix.a) || 1;
  const scaleY = Math.abs(matrix.d) || 1;
  const left = Math.max(0, Math.floor(x * scaleX + matrix.e));
  const top = Math.max(0, Math.floor(y * scaleY + matrix.f));
  const right = Math.min(ctx.canvas.width, Math.ceil((x + width) * scaleX + matrix.e));
  const bottom = Math.min(ctx.canvas.height, Math.ceil((y + height) * scaleY + matrix.f));
  const pixelWidth = Math.max(0, right - left);
  const pixelHeight = Math.max(0, bottom - top);
  if (!pixelWidth || !pixelHeight) return;
  const imageData = ctx.getImageData(left, top, pixelWidth, pixelHeight);
  const data = imageData.data;
  const black = new Uint8Array(pixelWidth * pixelHeight);
  for (let pixel = 0, index = 0; index < data.length; pixel += 1, index += 4) {
    black[pixel] = data[index + 3] >= 16 && data[index] < 18 && data[index + 1] < 18 && data[index + 2] < 18 ? 1 : 0;
  }
  const queue = [];
  const push = (pixel) => {
    if (!black[pixel] || black[pixel] === 2) return;
    black[pixel] = 2;
    queue.push(pixel);
  };
  for (let px = 0; px < pixelWidth; px += 1) {
    push(px);
    push((pixelHeight - 1) * pixelWidth + px);
  }
  for (let py = 1; py < pixelHeight - 1; py += 1) {
    push(py * pixelWidth);
    push(py * pixelWidth + pixelWidth - 1);
  }
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const pixel = queue[cursor];
    const px = pixel % pixelWidth;
    const py = Math.floor(pixel / pixelWidth);
    if (px > 0) push(pixel - 1);
    if (px + 1 < pixelWidth) push(pixel + 1);
    if (py > 0) push(pixel - pixelWidth);
    if (py + 1 < pixelHeight) push(pixel + pixelWidth);
  }
  for (const pixel of queue) {
    const index = pixel * 4;
    data[index + 3] = 0;
  }
  ctx.putImageData(imageData, left, top);
}
function drawCroppedLoadedShellImage(ctx, shell, source, image, frameWidth, frameHeight) {
  if (!source || !image) return null;
  const contour = contourForShell(shell);
  const crop = paddedContourCrop(shell, contour, 0.045);
  if (!(contour == null ? void 0 : contour.length) || !crop) return null;
  const frame = fitCropFrame(crop, frameWidth, frameHeight, 8);
  const scaleX = source.width / Math.max(1, shell.image_width || crop.width);
  const scaleY = source.height / Math.max(1, shell.image_height || crop.height);
  ctx.save();
  croppedContourPath(ctx, contour, crop, frame);
  ctx.clip();
  ctx.drawImage(
    image,
    source.x + crop.x * scaleX,
    source.y + crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    frame.x,
    frame.y,
    frame.width,
    frame.height
  );
  ctx.restore();
  transparentBlackPixels(ctx, frame.x, frame.y, frame.width, frame.height);
  if (croppedContourPath(ctx, contour, crop, frame)) {
    const hsl = rgbToHsl(shell.color_r_mean ?? 0.68, shell.color_g_mean ?? 0.64, shell.color_b_mean ?? 0.56);
    ctx.strokeStyle = hslCss(hsl.h, Math.max(0.18, hsl.s * 0.76), Math.max(0.16, hsl.l - 0.26));
    ctx.lineWidth = Math.max(1.15, Math.min(frameWidth, frameHeight) * 8e-3);
    ctx.stroke();
  }
  return frame;
}
function drawCroppedOriginalShellImage(ctx, shell, image, frameWidth, frameHeight) {
  if (!image) return null;
  const contour = contourForShell(shell);
  const crop = paddedContourCrop(shell, contour, 0.045);
  if (!(contour == null ? void 0 : contour.length) || !crop) return null;
  const frame = fitCropFrame(crop, frameWidth, frameHeight, 8);
  const scaleX = (image.naturalWidth || shell.image_width || crop.width) / Math.max(1, shell.image_width || crop.width);
  const scaleY = (image.naturalHeight || shell.image_height || crop.height) / Math.max(1, shell.image_height || crop.height);
  ctx.save();
  croppedContourPath(ctx, contour, crop, frame);
  ctx.clip();
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    frame.x,
    frame.y,
    frame.width,
    frame.height
  );
  ctx.restore();
  transparentBlackPixels(ctx, frame.x, frame.y, frame.width, frame.height);
  return frame;
}
function starredThumbSize(crop) {
  const cssHeight = 44;
  if (!(crop == null ? void 0 : crop.width) || !(crop == null ? void 0 : crop.height)) {
    return { cssWidth: 44, pixelWidth: 96, pixelHeight: 96 };
  }
  const ratio = crop.width / Math.max(1, crop.height);
  const cssWidth = Math.round(Math.max(20, Math.min(60, cssHeight * ratio)));
  const pixelHeight = 104;
  return {
    cssWidth,
    pixelWidth: Math.round(cssWidth / cssHeight * pixelHeight),
    pixelHeight
  };
}
function starredThumbGeometry(shell) {
  const contour = contourForShell(shell);
  const crop = paddedContourCrop(shell, contour, 0.035);
  return { contour, crop, size: starredThumbSize(crop) };
}
async function drawStarredThumbToCanvas(canvas, shell, geometry = null, { loadImage = false } = {}) {
  const ctx = canvas.getContext("2d");
  const { contour, crop, size } = geometry || starredThumbGeometry(shell);
  canvas.width = size.pixelWidth;
  canvas.height = size.pixelHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!contour || !crop) {
    await drawShellThumbToCanvas(canvas, shell, { loadImage });
    return;
  }
  const frame = fitCropFrame(crop, canvas.width, canvas.height, 2);
  drawCroppedContourFallback(ctx, shell, contour, crop, frame, canvas.width, canvas.height);
  const source = thumbnailSourceRect(shell);
  if (source && (loadImage || state.loadedThumbnailPages.has(source.page))) {
    const image = await loadThumbnailPage(source.page);
    const scaleX = source.width / Math.max(1, shell.image_width || crop.width);
    const scaleY = source.height / Math.max(1, shell.image_height || crop.height);
    if (image && croppedContourPath(ctx, contour, crop, frame)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      croppedContourPath(ctx, contour, crop, frame);
      ctx.save();
      ctx.clip();
      ctx.drawImage(
        image,
        source.x + crop.x * scaleX,
        source.y + crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        frame.x,
        frame.y,
        frame.width,
        frame.height
      );
      ctx.restore();
      transparentBlackPixels(ctx, frame.x, frame.y, frame.width, frame.height);
    }
  }
}
async function drawThumbnailImage(ctx, shell, frameWidth, frameHeight, { onlyIfReady = false } = {}) {
  const source = thumbnailSourceRect(shell);
  if (!source) return false;
  if (onlyIfReady && !state.loadedThumbnailPages.has(source.page)) return false;
  const image = await loadThumbnailPage(source.page);
  if (!image) return false;
  return drawLoadedThumbnailImage(ctx, shell, source, image, frameWidth, frameHeight);
}
async function drawShellThumbToCanvas(canvas, shell, { loadImage = true } = {}) {
  const ctx = canvas.getContext("2d");
  canvas.width = 96;
  canvas.height = 96;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const frame = fitImageFrame(shell.image_width || canvas.width, shell.image_height || canvas.height, canvas.width, canvas.height);
  const hasContour = thumbnailContourPath(ctx, shell, frame);
  if (hasContour) {
    ctx.save();
    ctx.clip();
    const drewImage = await drawThumbnailImage(ctx, shell, canvas.width, canvas.height, { onlyIfReady: !loadImage });
    ctx.restore();
    if (drewImage) transparentBlackPixels(ctx, 0, 0, canvas.width, canvas.height);
    else drawContourFallbackThumb(ctx, shell, frame, canvas.width, canvas.height);
    return;
  }
  if (await drawThumbnailImage(ctx, shell, canvas.width, canvas.height, { onlyIfReady: !loadImage })) {
    transparentBlackPixels(ctx, 0, 0, canvas.width, canvas.height);
    return;
  }
}
function setSourceImageUrl(url, shell, alt = "") {
  els.sourceThumb.hidden = true;
  els.sourceImage.hidden = false;
  if (els.sourceSpinner) els.sourceSpinner.hidden = false;
  els.sourceImage.dataset.fallbackApplied = "false";
  els.sourceImage.alt = alt;
  els.sourceImage.onerror = () => {
    if (els.sourceImage.dataset.fallbackApplied === "true") {
      els.sourceImage.removeAttribute("src");
      return;
    }
    els.sourceImage.dataset.fallbackApplied = "true";
    const fallback = contourFallbackDataUrl(shell);
    if (fallback) els.sourceImage.src = fallback;
    else els.sourceImage.removeAttribute("src");
  };
  els.sourceImage.onload = () => {
    if (els.sourceSpinner) els.sourceSpinner.hidden = true;
    renderPalette(true);
  };
  els.sourceImage.src = url;
}
function drawSourceFallback(shell, size) {
  sourceThumbCtx.clearRect(0, 0, size.width, size.height);
  const contour = contourForShell(shell);
  const crop = paddedContourCrop(shell, contour, 0.045);
  const frame = crop ? fitCropFrame(crop, size.width, size.height, 8) : fitImageFrame(shell.image_width || size.width, shell.image_height || size.height, size.width, size.height);
  if (!crop || !drawCroppedContourFallback(sourceThumbCtx, shell, contour, crop, frame, size.width, size.height)) {
    sourceThumbCtx.fillStyle = shellRgb(shell, 0.84);
    sourceThumbCtx.beginPath();
    sourceThumbCtx.ellipse(size.width / 2, size.height / 2, size.width * 0.28, size.height * 0.36, 0, 0, Math.PI * 2);
    sourceThumbCtx.fill();
  }
  state.sourceFrame = null;
  state.sourceMode = "fallback";
  if (els.sourceSpinner) els.sourceSpinner.hidden = true;
  renderPalette(false);
}
async function renderSourceShell(shell) {
  if (!shell) return;
  const token = ++state.sourceToken;
  window.clearTimeout(state.sourceLoadTimer);
  if (els.sourceSpinner) els.sourceSpinner.hidden = false;
  if (state.uploadImageUrl && shell.id < 0) {
    setSourceImageUrl(state.uploadImageUrl, shell, shell.species);
    return;
  }
  const size = resizeCanvas(els.sourceThumb, sourceThumbCtx);
  els.sourceImage.hidden = true;
  els.sourceThumb.hidden = false;
  drawSourceFallback(shell, size);
  const source = thumbnailSourceRect(shell);
  state.sourceLoadTimer = window.setTimeout(async () => {
    const original = await loadOriginalImage(shell);
    if (token !== state.sourceToken || state.selected !== shell) return;
    if (original) {
      sourceThumbCtx.clearRect(0, 0, size.width, size.height);
      const frame2 = drawCroppedOriginalShellImage(sourceThumbCtx, shell, original, size.width, size.height);
      if (frame2) {
        state.sourceFrame = frame2;
        state.sourceMode = "original";
        if (els.sourceSpinner) els.sourceSpinner.hidden = true;
        renderPalette(true);
        return;
      }
    }
    if (!source) return;
    const image = await loadThumbnailPage(source.page);
    if (token !== state.sourceToken || state.selected !== shell) return;
    sourceThumbCtx.clearRect(0, 0, size.width, size.height);
    const frame = drawCroppedLoadedShellImage(sourceThumbCtx, shell, source, image, size.width, size.height) || drawLoadedThumbnailImage(sourceThumbCtx, shell, source, image, size.width, size.height);
    if (frame) {
      state.sourceFrame = frame;
      state.sourceMode = "atlas";
      if (els.sourceSpinner) els.sourceSpinner.hidden = true;
      renderPalette(true);
      return;
    }
    drawSourceFallback(shell, size);
  }, 320);
}
function contourPcDistanceSq(shell, candidate) {
  var _a, _b;
  let distance = 0;
  const count = Math.min(4, ((_a = shell.contour_pc) == null ? void 0 : _a.length) || 0, ((_b = candidate.contour_pc) == null ? void 0 : _b.length) || 0);
  for (let index = 0; index < count; index += 1) {
    distance += ((shell.contour_pc[index] || 0) - (candidate.contour_pc[index] || 0)) ** 2;
  }
  return distance;
}
function nearestContourNeighbors(shell) {
  if (!shell) return [];
  if (state.neighborCache.has(shell.id)) return state.neighborCache.get(shell.id);
  const best = [];
  let worstIndex = -1;
  let worstDistance = -1;
  for (const candidate of state.shells) {
    if (candidate.id === shell.id) continue;
    const distance = contourPcDistanceSq(shell, candidate);
    if (best.length < 8) {
      best.push({ distance, shell: candidate });
      if (distance > worstDistance) {
        worstDistance = distance;
        worstIndex = best.length - 1;
      }
      continue;
    }
    if (distance >= worstDistance) continue;
    best[worstIndex] = { distance, shell: candidate };
    worstDistance = -1;
    for (let index = 0; index < best.length; index += 1) {
      if (best[index].distance > worstDistance) {
        worstDistance = best[index].distance;
        worstIndex = index;
      }
    }
  }
  best.sort((a, b) => a.distance - b.distance);
  const neighbors = best.map((item) => ({
    distance: Math.sqrt(item.distance),
    shell: item.shell
  }));
  state.neighborCache.set(shell.id, neighbors);
  return neighbors;
}
function renderNeighbors(shell, token = state.neighborToken) {
  els.neighborsList.innerHTML = "";
  if (!shell || token !== state.neighborToken) return;
  const best = nearestContourNeighbors(shell);
  if (token !== state.neighborToken) return;
  for (const item of best) {
    const button = document.createElement("button");
    button.className = "neighbor-button";
    button.title = `${item.shell.species} (${formatNumber(item.distance, 3)})`;
    const image = document.createElement("canvas");
    image.setAttribute("aria-label", item.shell.species);
    drawShellThumbToCanvas(image, item.shell, { loadImage: false });
    const label = document.createElement("span");
    label.textContent = formatNumber(item.distance, 2);
    button.append(image, label);
    button.addEventListener("click", () => {
      centerViewportOnShell(item.shell);
      selectShell(item.shell);
    });
    els.neighborsList.append(button);
  }
}
function scheduleRenderNeighbors(shell, delay = 2500) {
  state.neighborToken += 1;
  const token = state.neighborToken;
  window.clearTimeout(state.neighborTimer);
  if (!shell) {
    els.neighborsList.innerHTML = "";
    return;
  }
  state.neighborTimer = window.setTimeout(() => {
    renderNeighbors(shell, token);
  }, delay);
}
function loadStarred() {
  try {
    const raw = JSON.parse(localStorage.getItem(starStorageKey) || "[]");
    state.starredIds = Array.isArray(raw) ? raw.filter((id) => Number.isFinite(Number(id))).map(Number) : [];
  } catch (_error) {
    state.starredIds = [];
  }
}
function saveStarred() {
  localStorage.setItem(starStorageKey, JSON.stringify(state.starredIds.slice(0, 80)));
}
function isStarred(shell) {
  return Boolean(shell && state.starredIds.includes(shell.id));
}
function updateStarButton() {
  if (!els.starShell) return;
  const active = isStarred(state.selected);
  els.starShell.setAttribute("aria-pressed", active ? "true" : "false");
  els.starShell.title = active ? "Unstar this shape" : "Star this shape";
  els.starShell.setAttribute("aria-label", active ? "Unstar this shape" : "Star this shape");
}
function toggleStarredShell() {
  if (!state.selected) return;
  const selectedForNeighbors = state.selected;
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
  scheduleRenderNeighbors(selectedForNeighbors, 900);
}
function triggerStarBurst() {
  var _a;
  if (!els.starBurst || !els.starShell) return;
  const starRect = els.starShell.getBoundingClientRect();
  const targetRect = (_a = els.starredBand) == null ? void 0 : _a.getBoundingClientRect();
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
    spark.style.setProperty("--spark-distance", `${24 + index % 3 * 10}px`);
    spark.style.setProperty("--spark-delay", `${index * 18}ms`);
    els.starBurst.append(spark);
  }
  els.starBurst.classList.remove("is-active");
  void els.starBurst.offsetWidth;
  els.starBurst.classList.add("is-active");
  window.setTimeout(() => els.starBurst.classList.remove("is-active"), 900);
}
function starredShelfSelection() {
  var _a;
  if (state.showAllStars) {
    const items2 = [];
    for (const id of state.starredIds) {
      const shell = shellById(id);
      if (shell) items2.push({ shell, geometry: starredThumbGeometry(shell) });
    }
    return { items: items2, hidden: 0 };
  }
  const available = Math.max(44, ((_a = els.starredBand) == null ? void 0 : _a.clientWidth) || 0);
  const items = [];
  let used = 0;
  let hidden = 0;
  for (let index = 0; index < state.starredIds.length; index += 1) {
    const shell = shellById(state.starredIds[index]);
    if (!shell) continue;
    const item = { shell, geometry: starredThumbGeometry(shell) };
    const itemWidth = item.geometry.size.cssWidth + 1;
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
function renderStarred() {
  if (!els.starredBand) return;
  els.starredBand.innerHTML = "";
  const { items, hidden } = starredShelfSelection();
  for (const { shell, geometry } of items) {
    const button = document.createElement("button");
    button.className = "starred-shell";
    button.title = `${shell.species} ${shell.fingerprint_hash}`;
    button.style.setProperty("--starred-thumb-width", `${geometry.size.cssWidth}px`);
    const canvas = document.createElement("canvas");
    canvas.width = geometry.size.pixelWidth;
    canvas.height = geometry.size.pixelHeight;
    button.append(canvas);
    window.requestAnimationFrame(() => drawStarredThumbToCanvas(canvas, shell, geometry));
    button.addEventListener("click", () => {
      centerViewportOnShell(shell);
      selectShell(shell);
    });
    els.starredBand.append(button);
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
}
function selectShell(shell, { renderNearest = true } = {}) {
  var _a;
  if (!shell) return;
  if (state.walkingPca) stopPcaWalk(false);
  if (shell.id >= 0 && state.uploadImageUrl) {
    URL.revokeObjectURL(state.uploadImageUrl);
    state.uploadImageUrl = "";
  }
  state.selected = shell;
  state.selectedContour = normalizedContour(shell);
  state.generatedContour = state.selectedContour;
  state.generatedTraits = shapeTraitsFromShell(shell);
  state.generatedMode = "selected";
  (shell.contour_pc || []).forEach((value, index) => {
    state.pcValues[index] = value;
    updatePcControl(index, value);
  });
  els.selectedName.textContent = shell.species;
  updateHashChips();
  updateStarButton();
  els.selectedDetails.innerHTML = "";
  const scale = datasetCmScale(shell);
  const details = [
    ["Fingerprint", shell.fingerprint_hash || "-"],
    ["Rarity", shell.rarity_label || "Data deficient"],
    ["Origin", physicalLocationLabel(shell)],
    ["Area", `${formatNumber(shellAreaCm2(shell), 2)} cm²`],
    ["Mean radius", `${formatNumber(shellMeanRadiusCm(shell), 2)} cm`],
    ["Lightness", precisePercentValue(shell.color_l_mean ?? 0)],
    ["Concavity", precisePercentValue((shell.contour_concavity || 0) / 0.32)],
    ["Asymmetry", precisePercentValue(((_a = shell.morph_traits) == null ? void 0 : _a.asymmetry) || 0)],
    ["Scale", `${formatNumber(scale.widthCm, 2)} x ${formatNumber(scale.heightCm, 2)} cm frame`]
  ];
  for (const [key, value] of details) {
    const dt = document.createElement("dt");
    dt.textContent = key;
    const dd = document.createElement("dd");
    dd.textContent = value;
    els.selectedDetails.append(dt, dd);
  }
  state.sourceFrame = null;
  renderSourceShell(shell);
  if (renderNearest) scheduleRenderNeighbors(shell);
  else els.neighborsList.innerHTML = "";
  drawOutline();
  renderPalette(false);
  scheduleDraw(120);
  scheduleHashUpdate();
}
function nearestShell(screenX, screenY) {
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
function setTargetFromEvent(event) {
  const rect = els.scatter.getBoundingClientRect();
  const size = resizeCanvas(els.scatter, scatterCtx);
  const point = screenToWorld(event.clientX - rect.left, event.clientY - rect.top, size);
  state.pcValues[state.xAxis] = point.x;
  state.pcValues[state.yAxis] = point.y;
  updatePcControl(state.xAxis, point.x);
  updatePcControl(state.yAxis, point.y);
  reconstructFromPc();
  scheduleDraw();
  scheduleHashUpdate();
}
function startViewportPan(event) {
  const rect = els.scatter.getBoundingClientRect();
  state.panningViewport = {
    pointerId: event.pointerId,
    startX: event.clientX - rect.left,
    startY: event.clientY - rect.top,
    viewport: { ...state.viewport }
  };
  state.draggingTarget = false;
  els.scatter.classList.add("is-panning");
  els.pointTooltip.hidden = true;
}
function panViewportFromEvent(event) {
  if (!state.panningViewport || state.panningViewport.pointerId !== event.pointerId) return;
  const rect = els.scatter.getBoundingClientRect();
  const size = resizeCanvas(els.scatter, scatterCtx);
  const start = state.panningViewport;
  const vx = start.viewport;
  const dx = (event.clientX - rect.left - start.startX) / size.width * (vx.maxX - vx.minX);
  const dy = (event.clientY - rect.top - start.startY) / size.height * (vx.maxY - vx.minY);
  state.viewport = {
    minX: vx.minX - dx,
    maxX: vx.maxX - dx,
    minY: vx.minY + dy,
    maxY: vx.maxY + dy
  };
  scheduleDraw();
}
function stopViewportPan() {
  if (!state.panningViewport) return;
  state.panningViewport = null;
  els.scatter.classList.remove("is-panning");
  scheduleHashUpdate();
}
function showPointTooltip(event, shell) {
  if (!shell) {
    els.pointTooltip.hidden = true;
    return;
  }
  const rect = els.scatter.getBoundingClientRect();
  const strong = document.createElement("strong");
  strong.textContent = shell.species;
  els.pointTooltip.replaceChildren(
    strong,
    document.createTextNode(shell.file),
    document.createElement("br"),
    document.createTextNode(`${shell.specimen_label || shell.specimen || "Unknown specimen"}, ${shell.view_label || shell.view || "Unknown view"}`),
    document.createElement("br"),
    document.createTextNode(`${axisLabel(state.xAxis)} ${formatNumber(axisValue(shell, state.xAxis))}, ${axisLabel(state.yAxis)} ${formatNumber(axisValue(shell, state.yAxis))}`),
    document.createElement("br"),
    document.createTextNode(`${shellColorName(shell)}, lightness ${formatNumber(shell.color_l_mean, 3)}`)
  );
  els.pointTooltip.style.left = `${Math.min(Math.max(8, rect.width - 248), Math.max(8, event.clientX - rect.left + 14))}px`;
  els.pointTooltip.style.top = `${Math.min(Math.max(8, rect.height - 84), Math.max(8, event.clientY - rect.top + 14))}px`;
  els.pointTooltip.hidden = false;
}
function queuePointTooltip(event) {
  state.tooltipEvent = {
    clientX: event.clientX,
    clientY: event.clientY
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
function rgbCssFromTriplet(color) {
  return `rgb(${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(color[2])})`;
}
function colorDistanceSq(a, b) {
  const red = a[0] - b[0];
  const green = a[1] - b[1];
  const blue = a[2] - b[2];
  return red * red + green * green + blue * blue;
}
function fiveDistinctColorsFromPixels(pixels) {
  if (!pixels.length) return null;
  const centers = [pixels.reduce((best, color) => {
    const chroma = Math.max(color[0], color[1], color[2]) - Math.min(color[0], color[1], color[2]);
    const bestChroma = Math.max(best[0], best[1], best[2]) - Math.min(best[0], best[1], best[2]);
    return chroma > bestChroma ? color : best;
  }, pixels[0]).slice()];
  while (centers.length < 5) {
    let next = pixels[0];
    let nextDistance = -1;
    for (const color of pixels) {
      const distance = Math.min(...centers.map((center) => colorDistanceSq(color, center)));
      if (distance > nextDistance) {
        nextDistance = distance;
        next = color;
      }
    }
    centers.push(next.slice());
  }
  for (let pass = 0; pass < 5; pass += 1) {
    const totals = centers.map(() => [0, 0, 0, 0]);
    for (const color of pixels) {
      let best = 0;
      let bestDistance = Infinity;
      for (let index = 0; index < centers.length; index += 1) {
        const distance = colorDistanceSq(color, centers[index]);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      }
      totals[best][0] += color[0];
      totals[best][1] += color[1];
      totals[best][2] += color[2];
      totals[best][3] += 1;
    }
    for (let index = 0; index < centers.length; index += 1) {
      if (!totals[index][3]) continue;
      centers[index] = [
        totals[index][0] / totals[index][3],
        totals[index][1] / totals[index][3],
        totals[index][2] / totals[index][3]
      ];
    }
  }
  return centers.sort((a, b) => rgbToHsl(a[0] / 255, a[1] / 255, a[2] / 255).l - rgbToHsl(b[0] / 255, b[1] / 255, b[2] / 255).l).map(rgbCssFromTriplet);
}
function paletteFromSourceCanvas() {
  if (els.sourceThumb.hidden || !els.sourceThumb.width || !els.sourceThumb.height) return null;
  let data;
  try {
    data = sourceThumbCtx.getImageData(0, 0, els.sourceThumb.width, els.sourceThumb.height).data;
  } catch (_error) {
    return null;
  }
  const pixels = [];
  const step = Math.max(4, Math.floor(Math.sqrt(els.sourceThumb.width * els.sourceThumb.height / 2200)));
  for (let y = 0; y < els.sourceThumb.height; y += step) {
    for (let x = 0; x < els.sourceThumb.width; x += step) {
      const offset = (y * els.sourceThumb.width + x) * 4;
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      const alpha = data[offset + 3];
      if (alpha < 180 || red + green + blue < 48) continue;
      pixels.push([red, green, blue]);
    }
  }
  return fiveDistinctColorsFromPixels(pixels);
}
function paletteFromTraits(traits) {
  const base = {
    r: clamp01(traits.color_r_mean ?? 0.72),
    g: clamp01(traits.color_g_mean ?? 0.66),
    b: clamp01(traits.color_b_mean ?? 0.54)
  };
  const hsl = rgbToHsl(base.r, base.g, base.b);
  const contrast = clamp01((traits.color_l_std || 0.18) / 0.32);
  return [
    hslCss(hsl.h, hsl.s * 0.78, Math.max(0.12, hsl.l - 0.28 - contrast * 0.08)),
    hslCss(hsl.h - 8, hsl.s * 0.92, Math.max(0.22, hsl.l - 0.12)),
    hslCss(hsl.h, hsl.s, hsl.l),
    hslCss(hsl.h + 6, hsl.s * 0.72, Math.min(0.86, hsl.l + 0.16)),
    hslCss(hsl.h, hsl.s * 0.48, Math.min(0.94, hsl.l + 0.3 + contrast * 0.04))
  ];
}
function renderPalette(preferCanvas = false) {
  if (!els.paletteSwatches) return;
  els.paletteSwatches.innerHTML = "";
  const traits = effectiveGeneratedTraits();
  const cacheKey = state.generatedMode === "selected" && state.selected ? state.selected.id : null;
  let palette = cacheKey == null ? null : state.paletteCache.get(cacheKey);
  if (!palette && preferCanvas) {
    palette = paletteFromSourceCanvas();
    if (palette && cacheKey != null) state.paletteCache.set(cacheKey, palette);
  }
  if (!palette) palette = paletteFromTraits(traits);
  for (const color of palette) {
    const swatch = document.createElement("span");
    swatch.className = "palette-swatch";
    swatch.style.background = color;
    swatch.title = color;
    els.paletteSwatches.append(swatch);
  }
}
function percentile(sortedValues, q) {
  if (!sortedValues.length) return 0;
  const index = Math.min(sortedValues.length - 1, Math.max(0, Math.round((sortedValues.length - 1) * q)));
  return sortedValues[index];
}
function srgbToLinear(value) {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}
function labFromRgb(red, green, blue) {
  const r = srgbToLinear(red);
  const g = srgbToLinear(green);
  const b = srgbToLinear(blue);
  let x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047;
  let y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
  let z = (r * 0.0193339 + g * 0.119192 + b * 0.9503041) / 1.08883;
  const f = (value) => value > 8856e-6 ? Math.cbrt(value) : 7.787 * value + 16 / 116;
  x = f(x);
  y = f(y);
  z = f(z);
  return {
    l: clamp01((116 * y - 16) / 100),
    a: 500 * (x - y) / 127,
    b: 200 * (y - z) / 127
  };
}
async function readUploadImage(file, maxSize = 640) {
  var _a;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  (_a = bitmap.close) == null ? void 0 : _a.call(bitmap);
  return ctx.getImageData(0, 0, width, height);
}
function estimateBorderBackground(data, width, height) {
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
function otsuThreshold(values) {
  const bins = 256;
  const hist = new Uint32Array(bins);
  let maxValue = 1;
  for (const value of values) maxValue = Math.max(maxValue, value);
  for (const value of values) {
    hist[Math.min(bins - 1, Math.floor(value / maxValue * (bins - 1)))] += 1;
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
  return best / (bins - 1) * maxValue;
}
function largestMaskComponent(mask, width, height) {
  const visited = new Uint8Array(mask.length);
  const queue = new Int32Array(mask.length);
  let bestStart = -1;
  let bestCount = 0;
  for (let start = 0; start < mask.length; start += 1) {
    if (!mask[start] || visited[start]) continue;
    let head2 = 0;
    let tail2 = 0;
    let count = 0;
    visited[start] = 1;
    queue[tail2] = start;
    tail2 += 1;
    while (head2 < tail2) {
      const here = queue[head2];
      head2 += 1;
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
        queue[tail2] = next;
        tail2 += 1;
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
function isolateUploadMask(imageData) {
  const { data, width, height } = imageData;
  const background = estimateBorderBackground(data, width, height);
  const diffs = new Float32Array(width * height);
  for (let index = 0; index < width * height; index += 1) {
    const offset = index * 4;
    diffs[index] = Math.hypot(
      data[offset] - background[0],
      data[offset + 1] - background[1],
      data[offset + 2] - background[2]
    );
  }
  const threshold = Math.max(14, otsuThreshold(diffs) * 0.72);
  const mask = new Uint8Array(width * height);
  for (let index = 0; index < mask.length; index += 1) {
    mask[index] = diffs[index] > threshold && data[index * 4 + 3] > 20 ? 1 : 0;
  }
  return largestMaskComponent(mask, width);
}
function contourFromUploadMask(mask, width, height, pointCount) {
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
    const angle = -Math.PI / 2 + point / pointCount * Math.PI * 2;
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
  let rough = 0;
  for (let index = 0; index < radii.length; index += 1) {
    rough += Math.abs(radii[index] - radii[(index + 1) % radii.length]);
  }
  const bboxArea = Math.max(1, (maxX - minX + 1) * (maxY - minY + 1));
  return {
    contour,
    center: [centerX, centerY],
    meanRadius,
    area,
    bbox: [minX, minY, maxX, maxY],
    aspectRatio: Math.max((maxX - minX + 1) / Math.max(1, maxY - minY + 1), (maxY - minY + 1) / Math.max(1, maxX - minX + 1)),
    roughness: rough / Math.max(1e-6, meanRadius * radii.length),
    concavity: clamp01(1 - area / bboxArea)
  };
}
function traitsFromUpload(imageData, mask, geometry) {
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
  const std = (values, center) => Math.sqrt(values.reduce((total, value) => total + (value - center) ** 2, 0) / Math.max(1, values.length));
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
      const local = (lumaImage[index - width] + lumaImage[index + width] + lumaImage[index - 1] + lumaImage[index + 1] + lumaImage[index]) / 5;
      gradientTotal += Math.hypot(gx, gy);
      residualValues.push(lumaImage[index] - local);
    }
  }
  const residualMean = mean(residualValues);
  const textureResidual = std(residualValues, residualMean);
  const textureIqr = percentile(sortedLuma, 0.75) - percentile(sortedLuma, 0.25);
  const patternStrength = clamp01(
    (std(luma, lMean) * 1.7 + std(chroma, cMean) * 2.2 + std(saturation, sMean) * 0.9 + textureResidual * 10 + textureIqr * 1.2 + clamp01(gradientTotal / Math.max(1, residualValues.length) / 1.5)) / 6
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
    color_pattern_chroma: patternChroma
  };
}
function projectContourToPca(contour) {
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
function transformedTraitValue(field, value) {
  const number = Number(value || 0);
  if (field === "aspect_ratio") return Math.log1p(Math.max(0, number));
  if ([
    "roughness",
    "contour_concavity",
    "texture_gradient_mean",
    "texture_residual_std",
    "color_pattern_strength",
    "color_pattern_contrast",
    "color_pattern_chroma"
  ].includes(field)) {
    return Math.log1p(Math.max(0, number) * 64);
  }
  return number;
}
function projectTraitsToPca(shell) {
  const schema = state.model.trait_feature_schema || [];
  const mean = state.model.trait_mean || [];
  const components = state.model.trait_components || [];
  if (!schema.length || !components.length) return [];
  const standardized = schema.map((spec, index) => {
    var _a;
    let raw = 0;
    if (String(spec.name || "").startsWith("contour_pc")) {
      const pcIndex = Number(String(spec.name).replace("contour_pc", "")) - 1;
      raw = ((_a = shell.contour_pc) == null ? void 0 : _a[pcIndex]) || 0;
    } else {
      raw = transformedTraitValue(spec.name, shell[spec.name]);
    }
    return (raw - (spec.mean || 0)) / Math.max(1e-9, spec.scale || 1) * (spec.weight || 1) - (mean[index] || 0);
  });
  return components.map(
    (component) => component.reduce((total, loading, index) => total + (standardized[index] || 0) * loading, 0)
  );
}
async function handleUploadShell() {
  var _a;
  const file = (_a = els.uploadInput.files) == null ? void 0 : _a[0];
  if (!file) return;
  try {
    const imageData = await readUploadImage(file);
    const mask = isolateUploadMask(imageData);
    const geometry = contourFromUploadMask(mask, imageData.width, imageData.height, state.contourPoints || 256);
    const traits = traitsFromUpload(imageData, mask, geometry);
    const shell = {
      id: -Date.now(),
      file: file.name,
      name: `Uploaded shell ${file.name}`,
      species: "Uploaded shell",
      specimen: "",
      specimen_label: "Bring your own shell",
      view: "",
      view_label: "Uploaded image",
      component_count: 1,
      contour_pc: projectContourToPca(geometry.contour),
      upload_contour: geometry.contour,
      ...traits
    };
    shell.trait_pc = projectTraitsToPca(shell);
    shell.morph_traits = deriveMorphMetrics(shell);
    shell.fingerprint_hash = fingerprintHash(shell);
    shell.species_sample_count = 1;
    shell.global_occurrences = 0;
    shell.rarity_label = "Data deficient";
    shell.rarity_reason = "uploaded image";
    shell.location_label = "Uploaded image";
    shell.location_key = "uploaded";
    shell.location_color = speciesColor("uploaded");
    shell.species_color = speciesColor(shell.species);
    if (state.uploadImageUrl) URL.revokeObjectURL(state.uploadImageUrl);
    state.uploadImageUrl = URL.createObjectURL(file);
    centerViewportOnShell(shell);
    selectShell(shell);
  } catch (error) {
    els.statusLine.textContent = error.message || "Upload failed";
  } finally {
    els.uploadInput.value = "";
  }
}
function stopPcaWalk(updateHash = true) {
  state.walkingPca = false;
  window.cancelAnimationFrame(state.walkFrame);
  els.walkPca.textContent = "Walk";
  els.walkPca.setAttribute("aria-pressed", "false");
  if (updateHash) scheduleHashUpdate();
}
function stepPcaWalk(timestamp) {
  if (!state.walkingPca) return;
  if (!state.walkStartedAt) state.walkStartedAt = timestamp;
  const t = (timestamp - state.walkStartedAt) / 1e3;
  const values = [...state.pcValues];
  for (let index = 0; index < contourAxisCount(); index += 1) {
    const range = state.model.contour_pca_ranges[index];
    const span = range ? range.p99 - range.p01 : 1;
    values[index] = Math.sin(t * (0.32 + index * 0.045) + index * 1.73) * span * (0.18 + index * 0.018);
  }
  setPcValues(values, false);
  state.walkFrame = window.requestAnimationFrame(stepPcaWalk);
}
function togglePcaWalk() {
  if (state.walkingPca) {
    stopPcaWalk();
    return;
  }
  state.walkingPca = true;
  state.walkStartedAt = 0;
  els.walkPca.textContent = "Stop";
  els.walkPca.setAttribute("aria-pressed", "true");
  state.walkFrame = window.requestAnimationFrame(stepPcaWalk);
}
function resetToMeanShape() {
  stopPcaWalk(false);
  setPcValues(Array.from({ length: state.model.contour_component_count || contourAxisCount() }, () => 0));
}
function setupEvents() {
  var _a, _b, _c;
  els.search.addEventListener("input", updateFilter);
  (_a = els.filtersToggle) == null ? void 0 : _a.addEventListener("click", () => {
    var _a2;
    return setFiltersPanelOpen(((_a2 = els.filtersPanel) == null ? void 0 : _a2.hidden) !== false);
  });
  (_b = els.closeFilters) == null ? void 0 : _b.addEventListener("click", () => setFiltersPanelOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setFiltersPanelOpen(false);
  });
  els.randomShell.addEventListener("click", selectRandomShell);
  (_c = els.resetTraitFilters) == null ? void 0 : _c.addEventListener("click", resetTraitFilters);
  els.xAxisSelect.addEventListener("change", () => setAxes(Number(els.xAxisSelect.value), state.yAxis));
  els.yAxisSelect.addEventListener("change", () => setAxes(state.xAxis, Number(els.yAxisSelect.value)));
  els.colorModeSelect.addEventListener("change", () => {
    state.colorMode = els.colorModeSelect.value;
    scheduleDraw();
    scheduleHashUpdate();
  });
  els.meanShape.addEventListener("click", resetToMeanShape);
  els.walkPca.addEventListener("click", togglePcaWalk);
  els.starShell.addEventListener("click", toggleStarredShell);
  els.uploadShell.addEventListener("click", () => els.uploadInput.click());
  els.uploadInput.addEventListener("change", handleUploadShell);
  els.exportSvg.addEventListener("click", exportGeneratedSvg);
  els.zoomIn.addEventListener("click", () => zoom(0.72));
  els.zoomOut.addEventListener("click", () => zoom(1.38));
  els.resetView.addEventListener("click", () => {
    state.viewport = initialViewport(state.xAxis, state.yAxis);
    scheduleDraw();
  });
  els.scatter.addEventListener("wheel", (event) => {
    event.preventDefault();
    const rect = els.scatter.getBoundingClientRect();
    zoom(event.deltaY > 0 ? 1.12 : 0.88, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  });
  els.scatter.addEventListener("pointerdown", (event) => {
    if (event.button === 1) {
      event.preventDefault();
      els.scatter.setPointerCapture(event.pointerId);
      startViewportPan(event);
      return;
    }
    els.scatter.setPointerCapture(event.pointerId);
    const rect = els.scatter.getBoundingClientRect();
    const shell = nearestShell(event.clientX - rect.left, event.clientY - rect.top);
    if (shell) selectShell(shell);
    else {
      state.draggingTarget = true;
      setTargetFromEvent(event);
    }
  });
  els.scatter.addEventListener("pointermove", (event) => {
    if (state.panningViewport) {
      event.preventDefault();
      panViewportFromEvent(event);
      return;
    }
    if (state.draggingTarget) {
      event.preventDefault();
      setTargetFromEvent(event);
      els.pointTooltip.hidden = true;
      return;
    }
    queuePointTooltip(event);
  });
  for (const eventName of ["pointerup", "pointerleave", "pointercancel"]) {
    els.scatter.addEventListener(eventName, (event) => {
      state.draggingTarget = false;
      stopViewportPan();
      if (eventName !== "pointerup") els.pointTooltip.hidden = true;
    });
  }
  els.scatter.addEventListener("auxclick", (event) => {
    if (event.button === 1) event.preventDefault();
  });
  window.addEventListener("resize", () => {
    scheduleDraw();
    renderSourceShell(state.selected);
    renderPalette();
    renderStarred();
    positionFiltersPanel();
  });
  window.addEventListener("scroll", positionFiltersPanel, true);
}
window.shellspacePerf = {
  loadedThumbnailPageCount: () => state.loadedThumbnailPages.size,
  warmThumbnails: () => warmThumbnailPages({ eager: true }),
  selectedId: () => {
    var _a;
    return ((_a = state.selected) == null ? void 0 : _a.id) ?? null;
  },
  neighborCacheSize: () => state.neighborCache.size,
  surpriseQueueSize: () => state.surpriseQueue.length,
  surpriseReadyCount: () => state.surpriseQueue.filter((entry) => entry.ready || entry.page == null || state.loadedThumbnailPages.has(entry.page)).length,
  scatterPointCount: () => {
    var _a, _b;
    return ((_b = (_a = state.scatterPointCache) == null ? void 0 : _a.shells) == null ? void 0 : _b.length) || 0;
  },
  sourceMode: () => state.sourceMode,
  filteredCount: () => state.filtered.length,
  lookupConservationStatus,
  conservationStatusForSelected: () => conservationStatus(state.selected),
  selectSpecies: (species) => {
    const shell = state.shells.find((item) => item.species === species);
    if (shell) selectShell(shell);
    return (shell == null ? void 0 : shell.id) ?? null;
  }
};
async function init() {
  setupEvents();
  setLoading("Opening shell model");
  const model = await fetchJson(asset("data/model.json"));
  setLoading("Unpacking shell fingerprints");
  const shellPayload = await fetchCompressedJson(asset(`data/${model.shell_file || "shells.json"}`));
  const [localityPayload, speciesTraitsPayload] = await Promise.all([
    model.locality_file ? fetchCompressedJson(asset(`data/${model.locality_file}`)) : null,
    model.species_traits_file ? fetchCompressedJson(asset(`data/${model.species_traits_file}`)) : null
  ]);
  setLoading("Unpacking contours");
  const contourBuffer = model.contour_file ? await fetchCompressedArrayBuffer(asset(`data/${model.contour_file}`)) : null;
  state.model = model;
  state.shells = unpackShells(shellPayload);
  state.shellById = new Map(state.shells.map((shell) => [shell.id, shell]));
  state.shellsByThumbnailPage = buildThumbnailPageIndex(state.shells);
  buildDerivedShellData(state.shells, localityPayload, speciesTraitsPayload);
  buildTraitFilters();
  state.filtered = state.shells;
  state.contours = contourBuffer ? new Uint16Array(contourBuffer) : null;
  state.contourPoints = model.contour_points || 0;
  state.contourScale = model.contour_scale || 1;
  const expectedContourValues = model.processed_count * model.contour_points * 2;
  if (!state.contours || state.contours.length < expectedContourValues) {
    throw new Error("Contour binary is shorter than the model manifest expects.");
  }
  els.statusLine.textContent = model.species_count ? `${model.processed_count.toLocaleString()} shells, ${model.species_count.toLocaleString()} species` : `${model.processed_count.toLocaleString()} shells`;
  const initialHash = parseHashState();
  if (colorModes.includes(initialHash.get("color"))) state.colorMode = initialHash.get("color");
  const axisCount = axisOptionCount();
  const x = Number(initialHash.get("x"));
  const y = Number(initialHash.get("y"));
  if (Number.isInteger(x) && x >= 0 && x < axisCount) state.xAxis = x;
  if (Number.isInteger(y) && y >= 0 && y < axisCount) state.yAxis = y;
  state.viewport = initialViewport(state.xAxis, state.yAxis);
  buildAxisControls();
  buildPcControls();
  els.colorModeSelect.value = state.colorMode;
  loadStarred();
  state.suppressHash = true;
  const selected = shellById(initialHash.get("id")) || state.shells[0];
  selectShell(selected, { renderNearest: false });
  const pcValues = (initialHash.get("pc") || "").split(",").filter((value) => value.trim() !== "").map((value) => Number(value)).filter((value) => Number.isFinite(value));
  if (pcValues.length) setPcValues(pcValues.slice(0, 6), false);
  state.suppressHash = false;
  state.hashReady = true;
  renderStarred();
  renderPalette();
  scheduleDraw();
  updateHashState();
  setLoading("", false);
  primeSurpriseQueue();
}
function startShellspace() {
  init().catch((error) => {
    els.statusLine.textContent = error.message;
    setLoading("", false);
    if (els.missingData) els.missingData.hidden = false;
    console.error(error);
  });
}
const shellspaceApp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  startShellspace
}, Symbol.toStringTag, { value: "Module" }));
