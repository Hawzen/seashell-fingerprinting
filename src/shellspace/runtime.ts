// @ts-nocheck

export const state = {
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
  colorMode: "roughness",
  attributeMode: "filter",
  pcValues: [],
  pcaAxisNames: [],
  pcControlRows: [],
  morphFilters: new Map(),
  categoryFilters: { origin: "", taxonomy: "", habitat: "", rarity: "", color: "" },
  conservationCache: new Map(),
  starredIds: [],
  showAllStars: false,
  speciesCounts: new Map(),
  speciesTraits: new Map(),
  localityMatchRate: 0,
  drawFrame: 0,
  drawTimer: 0,
  sourceFrame: null,
  sourceMode: "fallback",
  sourceInspectOpen: false,
  sourceCursorActive: false,
  sourceCursorUrl: "",
  scatterHitCache: null,
  screenNeighborScanCount: 0,
  starredHydrationTimer: 0,
  starredHydrationRun: 0,
  starredHydratedCount: 0,
  starredThumbs: [],
  tooltipFrame: 0,
  tooltipEvent: null,
  tooltipLastAt: 0,
  holdingNearest: false,
  pendingSelectShell: null,
  targetFrame: 0,
  targetEvent: null,
  targetNeighborTimer: 0,
  targetNeighborValues: null,
  targetNeighborLastAt: 0,
  draggingTarget: false,
  targetDragStart: null,
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
  selectionRun: 0,
  scatterPointCache: null,
  shellById: new Map(),
  surpriseQueue: [],
  surpriseQueueSource: null,
  surprisePrimeTimer: 0,
  neighborCache: new Map(),
  neighborTimer: 0,
  neighborHydrationTimer: 0,
  neighborHydrationItems: [],
  neighborHydrationUnsubscribers: [],
  neighborSearchRun: 0,
  neighborSearchTimer: 0,
  neighborToken: 0,
  neighborRenderKey: "",
  pointColorCache: new Map(),
  originFilterOptionsCache: null,
  filterOptionsCache: null,
  showPoppedShells: true,
  mapSampleLimit: 8000,
  mapShellImageIds: new Set(),
};

export const els: Record<string, any> = {};

export let scatterCtx = null;
export let outlineCtx = null;

export function initCanvasContexts() {
  scatterCtx = els.scatter.getContext("2d");
  outlineCtx = els.outline.getContext("2d");
}

export const normalizedContourCache = new Map();
export const originalImageCache = new Map();
export const pythonCutCache = new Map();
export const shellCutoutImageCache = new Map();
export const shellCutoutSubscribers = new Map();
