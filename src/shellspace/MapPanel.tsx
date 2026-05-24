import { els } from "./runtime";

export function MapPanel() {
  return (
    <section class="scatter-panel" aria-label="PCA scatter plot">
      <canvas ref={(node) => { els.scatter = node; }} class="scatter-canvas" />
      <div ref={(node) => { els.pointTooltip = node; }} class="point-tooltip" hidden />
    </section>
  );
}
