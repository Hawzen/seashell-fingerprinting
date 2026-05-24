import { els } from "./runtime";

export function TopBar() {
  return (
    <header class="topbar">
      <div class="brand-block">
        <h1>Shellspace</h1>
        <p ref={(node) => { els.statusLine = node; }} class="status-line">Loading shell model</p>
      </div>
      <div ref={(node) => { els.starredBand = node; }} class="starred-band" aria-label="Starred shells" />
      <div ref={(node) => { els.starBurst = node; }} class="star-burst" aria-hidden="true" />
      <div class="top-actions">
        <button ref={(node) => { els.zoomOut = node; }} title="Zoom out">-</button>
        <button ref={(node) => { els.zoomIn = node; }} title="Zoom in">+</button>
        <button ref={(node) => { els.resetView = node; }} title="Reset map view">Reset</button>
      </div>
    </header>
  );
}
