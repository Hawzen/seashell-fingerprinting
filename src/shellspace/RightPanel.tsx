import { els } from "./runtime";

export function RightPanel() {
  return (
    <aside class="panel lab-panel">
      <ProjectedShellPanel />
      <NeighborsPanel />
    </aside>
  );
}

function ProjectedShellPanel() {
  return (
    <section class="panel-section projected-lab">
      <div class="generated-shape">
        <div class="section-title">
          <h2>Projected Shell <span ref={(node) => { els.projectedHash = node; }} class="fingerprint-chip compact">------</span></h2>
        </div>
        <div class="projection-frame">
          <canvas ref={(node) => { els.outline = node; }} class="outline-canvas" width="420" height="420" />
          <button ref={(node) => { els.exportSvg = node; }} class="svg-export" title="Export generated shell as SVG">SVG</button>
          <button ref={(node) => { els.drawProjectedShell = node; }} class="draw-shell-button" title="Draw shell and project it" aria-label="Draw shell and project it" aria-pressed="false">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 17.8c3.8-6.7 7.4-6.7 10.8 0 1.4 2.8 3.2 2.8 5.2 0" />
              <path d="M15.2 4.8 19.2 8.8" />
              <path d="M5.8 18.2 15.9 8.1l3.2 3.2L9 21.4l-4.1.7.9-3.9Z" />
            </svg>
          </button>
        </div>
      </div>

      <div class="slider-stack">
        <div class="section-title">
          <h2>Contour PCs</h2>
          <div class="title-actions">
            <button ref={(node) => { els.meanShape = node; }} title="Reset contour coordinates">Mean</button>
            <button ref={(node) => { els.walkPca = node; }} title="Animate through contour PCA space">Walk</button>
          </div>
        </div>
        <div ref={(node) => { els.pcControls = node; }} class="pc-controls" />
      </div>
    </section>
  );
}

function NeighborsPanel() {
  return (
    <section class="panel-section neighbors">
      <div class="section-title">
        <h2>Nearest Shells</h2>
      </div>
      <div ref={(node) => { els.neighborsList = node; }} class="neighbors-list" />
    </section>
  );
}
