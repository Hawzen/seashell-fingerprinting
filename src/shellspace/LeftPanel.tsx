import { els } from "./runtime";

export function LeftPanel() {
  return (
    <aside ref={(node) => { els.controlsPanel = node; }} class="panel controls-panel">
      <ControlsPanel />
      <PhysicalShellPanel />
    </aside>
  );
}

function ControlsPanel() {
  return (
    <section class="panel-section search-section">
      <div class="search-row">
        <label class="field">
          <span>Search</span>
          <input ref={(node) => { els.search = node; }} type="search" placeholder="Species or Shellprint" />
        </label>
        <button ref={(node) => { els.filtersToggle = node; }} class="filters-toggle" title="Open attributes" aria-expanded="false">Attributes</button>
      </div>

      <div ref={(node) => { els.filtersPanel = node; }} class="filters-popover" hidden>
        <header>
          <div class="attributes-header-main">
            <h2>Attributes</h2>
            <div class="attribute-mode-toggle" role="tablist" aria-label="Attribute mode">
              <button ref={(node) => { els.attributeFilterMode = node; }} type="button" data-attribute-mode="filter" aria-pressed="true">Filter</button>
              <button ref={(node) => { els.attributeColorMode = node; }} type="button" data-attribute-mode="color" aria-pressed="false">Color</button>
            </div>
          </div>
          <button ref={(node) => { els.closeFilters = node; }} title="Close attributes" aria-label="Close attributes">x</button>
        </header>
        <div ref={(node) => { els.filterControls = node; }} class="filter-controls" />
        <div class="filter-actions">
          <button ref={(node) => { els.resetTraitFilters = node; }} title="Reset filters">Reset</button>
        </div>
      </div>

      <div class="shell-action-row">
        <button ref={(node) => { els.randomShell = node; }} class="surprise-shell" title="Surprise me" aria-label="Surprise me">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="3.5" />
            <circle cx="8.5" cy="8.5" r="1.2" />
            <circle cx="15.5" cy="8.5" r="1.2" />
            <circle cx="12" cy="12" r="1.2" />
            <circle cx="8.5" cy="15.5" r="1.2" />
            <circle cx="15.5" cy="15.5" r="1.2" />
          </svg>
        </button>
        <button ref={(node) => { els.uploadShell = node; }} class="upload-shell" title="Bring your own shell">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 16V5" />
            <path d="M7.5 9.5 12 5l4.5 4.5" />
            <path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15" />
          </svg>
          <span>Bring your own shell</span>
        </button>
      </div>
      <input ref={(node) => { els.uploadInput = node; }} type="file" accept="image/*" hidden />

      <div class="section-title">
        <h2>
          Map
          <button ref={(node) => { els.pcaGuideOpen = node; }} class="pca-guide-button" title="Explain PCA axes" aria-label="Explain PCA axes">?</button>
        </h2>
      </div>
      <div class="axis-grid">
        <label>
          <span>X</span>
          <select ref={(node) => { els.xAxisSelect = node; }} />
        </label>
        <label>
          <span>Y</span>
          <select ref={(node) => { els.yAxisSelect = node; }} />
        </label>
      </div>
      <div ref={(node) => { els.colorLegend = node; }} class="color-legend" hidden />
    </section>
  );
}

function PhysicalShellPanel() {
  return (
    <section class="panel-section physical-shell">
      <div class="section-title">
        <h2>Physical Shell <span ref={(node) => { els.physicalHash = node; }} class="fingerprint-chip compact">------</span></h2>
        <button ref={(node) => { els.starShell = node; }} class="star-button" title="Star this shape" aria-label="Star this shape" aria-pressed="false">
          <svg class="star-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path class="star-shape" d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8z" />
          </svg>
        </button>
      </div>
      <div ref={(node) => { els.sourceFrameBox = node; }} class="source-frame">
        <div ref={(node) => { els.sourceSpinner = node; }} class="source-spinner" hidden />
        <img ref={(node) => { els.sourceImage = node; }} class="source-image" alt="" hidden />
        <div ref={(node) => { els.sourceInspect = node; }} class="source-inspect" hidden />
        <button ref={(node) => { els.sourceInspectToggle = node; }} class="source-inspect-toggle" title="Show shell data" aria-label="Show shell data" aria-pressed="false">
          <span aria-hidden="true">{'{}'}</span>
        </button>
        <button ref={(node) => { els.sourceCursorToggle = node; }} class="source-cursor-toggle" title="Use shell as cursor" aria-label="Use shell as cursor" aria-pressed="false">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 3.5 18.5 14l-6.1 1.1-3.2 5.4L6 3.5Z" />
            <path d="m12.4 15.1 3 5.4" />
          </svg>
        </button>
      </div>
      <div ref={(node) => { els.selectedName = node; }} class="selected-name">None</div>
      <dl ref={(node) => { els.selectedDetails = node; }} />
      <div class="color-palette">
        <h2>Palette</h2>
        <div ref={(node) => { els.paletteSwatches = node; }} class="palette-swatches" />
      </div>
    </section>
  );
}
