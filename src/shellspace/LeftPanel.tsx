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
        <button ref={(node) => { els.filtersToggle = node; }} class="filters-toggle" title="Open filters" aria-expanded="false">Filters</button>
      </div>

      <div ref={(node) => { els.filtersPanel = node; }} class="filters-popover" hidden>
        <header>
          <h2>Filters</h2>
          <button ref={(node) => { els.closeFilters = node; }} title="Close filters" aria-label="Close filters">x</button>
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
        <h2>Map</h2>
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
      <label class="field">
        <span>Color</span>
        <select ref={(node) => { els.colorModeSelect = node; }}>
          <option value="locality">Location</option>
          <option value="species">Species</option>
          <option value="conservation">Conservation</option>
          <option value="shell">Shell color</option>
          <option value="pattern">Pattern</option>
          <option value="lightness">Lightness</option>
          <option value="concavity">Concavity</option>
        </select>
      </label>
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
      <div class="source-frame">
        <div ref={(node) => { els.sourceSpinner = node; }} class="source-spinner" hidden />
        <img ref={(node) => { els.sourceImage = node; }} class="source-image" alt="" hidden />
      </div>
      <div ref={(node) => { els.selectedName = node; }} class="selected-name">None</div>
      <dl ref={(node) => { els.selectedDetails = node; }} />
    </section>
  );
}
