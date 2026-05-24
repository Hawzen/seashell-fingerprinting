import { els } from "./runtime";

export function LoadingOverlay() {
  return (
    <div ref={(node) => { els.loadingOverlay = node; }} class="loading-overlay">
      <div class="rpg-loader" aria-hidden="true">
        <div class="loader-shadow" />
        <div class="loader-aura" />
        <LoaderShell position="top" />
        <LoaderShell position="bottom" />
        <div class="loader-pearl">
          <span class="pearl-spark spark-1" />
          <span class="pearl-spark spark-2" />
          <span class="pearl-spark spark-3" />
        </div>
      </div>
      <p ref={(node) => { els.loadingText = node; }}>Opening shell data</p>
    </div>
  );
}

export function MissingData() {
  return (
    <div ref={(node) => { els.missingData = node; }} class="missing-data" hidden>
      <div>
        <h2>Processed Data Missing</h2>
        <p>Build FFT fingerprints, export static data, then refresh the app.</p>
        <code>make fingerprints export-static</code>
      </div>
    </div>
  );
}

function LoaderShell(props: { position: "top" | "bottom" }) {
  return (
    <div class={`loader-shell loader-shell-${props.position}`}>
      <span class="shell-rib rib-1" />
      <span class="shell-rib rib-2" />
      <span class="shell-rib rib-3" />
      <span class="shell-rib rib-4" />
      <span class="shell-rib rib-5" />
      <span class="shell-lip" />
    </div>
  );
}
