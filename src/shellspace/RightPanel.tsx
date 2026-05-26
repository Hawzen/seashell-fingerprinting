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
