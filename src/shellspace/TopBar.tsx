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
        <button ref={(node) => { els.settingsToggle = node; }} class="settings-toggle" title="Settings" aria-label="Settings" aria-expanded="false">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z" />
            <path d="m19 13.3.1-1.3-.1-1.3 2-1.5-1.9-3.2-2.4 1a8.6 8.6 0 0 0-2.2-1.3L14.2 3h-4.4l-.3 2.7A8.6 8.6 0 0 0 7.3 7L4.9 6 3 9.2l2 1.5-.1 1.3.1 1.3-2 1.5L4.9 18l2.4-1a8.6 8.6 0 0 0 2.2 1.3l.3 2.7h4.4l.3-2.7a8.6 8.6 0 0 0 2.2-1.3l2.4 1 1.9-3.2-2-1.5Z" />
          </svg>
        </button>
      </div>
      <div ref={(node) => { els.settingsPanel = node; }} class="settings-panel" hidden>
        <section>
          <h2>Settings</h2>
          <button ref={(node) => { els.clearAllData = node; }} class="danger-button">Clear all data</button>
        </section>
        <section>
          <h2>Controls</h2>
          <ul>
            <li>Two-finger pan moves the map.</li>
            <li>Shift + two-finger pan zooms.</li>
            <li>Click empty space projects a shell there.</li>
            <li>Drag empty space walks through PCA space.</li>
          </ul>
        </section>
      </div>
    </header>
  );
}
