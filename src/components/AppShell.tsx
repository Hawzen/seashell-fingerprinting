export function AppShell() {
  return (
    <>
      <header class="topbar">
        <div class="brand-block">
          <h1>Shellspace</h1>
          <p class="tagline">Every shell is a fingerprint — Shellspace is the atlas.</p>
          <p id="statusLine">Loading shell model</p>
        </div>
        <div id="starredBand" class="starred-band" aria-label="Starred shells" />
        <div id="starBurst" class="star-burst" aria-hidden="true" />
        <div class="top-actions">
          <button id="zoomOut" title="Zoom out">-</button>
          <button id="zoomIn" title="Zoom in">+</button>
          <button id="resetView" title="Reset map view">Reset</button>
        </div>
      </header>

      <main class="workspace">
        <aside class="panel controls-panel">
          <section class="panel-section search-section">
            <div class="search-row">
              <label class="field">
                <span>Search</span>
                <input id="searchBox" type="search" placeholder="Species or Shellprint" />
              </label>
              <button id="filtersToggle" class="filters-toggle" title="Open filters" aria-expanded="false">Filters</button>
            </div>
            <div id="filtersPanel" class="filters-popover" hidden>
              <header>
                <h2>Filters</h2>
                <button id="closeFilters" title="Close filters" aria-label="Close filters">x</button>
              </header>
              <div id="filterControls" class="filter-controls" />
              <div class="filter-actions">
                <button id="resetTraitFilters" title="Reset filters">Reset</button>
              </div>
            </div>
            <button id="randomShell" title="Select a random shell">Surprise me</button>
            <button id="uploadShell" class="upload-shell" title="Bring your own shell">+ Bring your own shell</button>
            <input id="uploadInput" type="file" accept="image/*" hidden />
            <div class="section-title">
              <h2>Map</h2>
            </div>
            <div class="axis-grid">
              <label>
                <span>X</span>
                <select id="xAxisSelect" />
              </label>
              <label>
                <span>Y</span>
                <select id="yAxisSelect" />
              </label>
            </div>
            <label class="field">
              <span>Color</span>
              <select id="colorModeSelect">
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

          <section class="panel-section physical-shell">
            <div class="section-title">
              <h2>Physical Shell <span id="physicalHash" class="fingerprint-chip compact">------</span></h2>
              <button id="starShell" class="star-button" title="Star this shape" aria-label="Star this shape" aria-pressed="false">
                <svg class="star-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path class="star-shape" d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8z" />
                </svg>
              </button>
            </div>
            <div class="source-frame">
              <div id="sourceSpinner" class="source-spinner" hidden />
              <canvas id="sourceThumb" width="420" height="300" />
              <img id="sourceImage" alt="" hidden />
            </div>
            <div id="selectedName" class="selected-name">None</div>
            <dl id="selectedDetails" />
          </section>
        </aside>

        <section class="scatter-panel" aria-label="PCA scatter plot">
          <canvas id="scatterCanvas" />
          <div id="pointTooltip" class="point-tooltip" hidden />
        </section>

        <aside class="panel lab-panel">
          <section class="panel-section projected-lab">
            <div class="generated-shape">
              <div class="section-title">
                <h2>Projected Shell <span id="projectedHash" class="fingerprint-chip compact">------</span></h2>
              </div>
              <div class="projection-frame">
                <canvas id="outlineCanvas" width="420" height="420" />
                <button id="exportSvg" class="svg-export" title="Export generated shell as SVG">SVG</button>
              </div>
            </div>

            <div class="color-palette">
              <h2>Palette</h2>
              <div id="paletteSwatches" class="palette-swatches" />
            </div>

            <div class="slider-stack">
              <div class="section-title">
                <h2>Contour PCs</h2>
                <div class="title-actions">
                  <button id="meanShape" title="Reset contour coordinates">Mean</button>
                  <button id="walkPca" title="Animate through contour PCA space">Walk</button>
                </div>
              </div>
              <div id="pcControls" />
            </div>
          </section>

          <section class="panel-section neighbors">
            <div class="section-title">
              <h2>Nearest Shells</h2>
            </div>
            <div id="neighborsList" />
          </section>
        </aside>
      </main>

      <div id="loadingOverlay" class="loading-overlay">
        <div class="rpg-loader" aria-hidden="true">
          <div class="loader-shadow" />
          <div class="loader-aura" />
          <div class="loader-shell loader-shell-top">
            <span class="shell-rib rib-1" />
            <span class="shell-rib rib-2" />
            <span class="shell-rib rib-3" />
            <span class="shell-rib rib-4" />
            <span class="shell-rib rib-5" />
            <span class="shell-lip" />
          </div>
          <div class="loader-shell loader-shell-bottom">
            <span class="shell-rib rib-1" />
            <span class="shell-rib rib-2" />
            <span class="shell-rib rib-3" />
            <span class="shell-rib rib-4" />
            <span class="shell-rib rib-5" />
            <span class="shell-lip" />
          </div>
          <div class="loader-pearl">
            <span class="pearl-spark spark-1" />
            <span class="pearl-spark spark-2" />
            <span class="pearl-spark spark-3" />
          </div>
        </div>
        <p id="loadingText">Opening shell data</p>
      </div>

      <div id="missingData" class="missing-data" hidden>
        <div>
          <h2>Processed Data Missing</h2>
          <p>Build processed data, export static data, then refresh the app.</p>
          <code>{`make fingerprints\nmake export-data`}</code>
        </div>
      </div>
    </>
  );
}
