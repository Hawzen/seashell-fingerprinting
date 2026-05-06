# Completion Audit

Objective restated as concrete deliverables:

1. Accurate seashell contouring from black-background images.
2. Full `dataset/` processing into normalized 360-value fingerprints.
3. A strong explorer for PCA navigation and generated outlines.
4. One static app, not a frontend/backend split, powered by Haskell WebAssembly.
5. Ten variant explorations, including upload and color-aware modes.
6. Continue work for a user-requested 12-hour minimum.

## Evidence Checklist

| Requirement | Evidence | Status |
| --- | --- | --- |
| Load every image from `dataset/` | `processed/manifest.json` reports `image_count: 59244`; `tools/verify_project.py` independently counts the dataset. | Done |
| Isolate shells from black backgrounds | `tools/build_fingerprints.py` uses border background estimation, dark-background threshold capping, OpenCV connected-component cleanup, and hole filling. | Done |
| Correct bad contouring seen in preview | `public/validation_preview.jpg` and `public/contour_audit/` now draw the stored segmented outer contour separately from the radial fingerprint envelope; the stored exact contour resolution has been raised from 128 to 256 points; the `radial_mismatch` audit sheet exposes curved/tubular shells where a one-radius-per-angle fingerprint cuts across empty background. The app source overlay uses exact offline contours from `public/data/contours.u16`, has independent contour/radial/center layer toggles, and includes search-aware thumbnail-backed Contour QA ranking. | Done |
| Targeted visual validation | `tools/make_contact_sheet.py` renders query-specific contact sheets with the stored exact contour and radial envelope overlays, with optional metric sorting; a `Siliquaria` concavity-sorted smoke produced 8 rendered tiles from 14 matching records. | Done |
| Find shell outer contour | `tools/build_fingerprints.py` builds a primary filled shell mask and now stores one 256-point resampled external contour per shell in `processed/fingerprints.npz`; `tools/merge_fingerprint_chunks.py` preserves contour arrays; `tools/export_static_data.py` exports fixed-point contours in `public/data/contours.u16`. | Done |
| Choose a center point | Manifest records include `center`; default method is `centroid`, with `center_adjustment` recorded if a center must be snapped onto the shell mask. | Done |
| Store 360-value fingerprints | `processed/fingerprints.npz` contains `fingerprints` with shape `(59244, 360)`; static browser fingerprints are exported as fixed-point `public/data/fingerprints.u16`; exact source contours are exported separately as `public/data/contours.u16`; the app can export the generated or selected 360-value fingerprint as CSV and the selected exact contour as SVG. | Done |
| Normalize by shape, not size | `tools/verify_project.py` checks each fingerprint mean is approximately `1.0`. | Done |
| Run PCA | `processed/fingerprints.npz` contains `pca_components` with shape `(12, 360)` and `pca_scores`; manifest records explained variance. | Done |
| Create explorer with shell points in PCA space | `public/app.js` renders `#scatterCanvas` from radial PCA scores and exact-contour PCA scores, with zoom, hover, search, random visible-shell jumps, radial/contour PC axis selection, selected radial/contour PC readouts, point mode, density mode, species/mask/center-shift/radial-mismatch/contour-concavity coloring, Contour QA ranking, pinned reference comparison by radial and exact contour RMS, URL-hash restoration, and selection. | Done |
| Nearby points mean similar shapes | `nearestNeighbors` in `public/app.js` compares shells in PCA space; the neighbor panel can also switch to exact 360-radius fingerprint distance or Haskell-WASM-backed exact resampled outer-contour distance for contour-level similarity. | Done |
| Moving through PCA changes fingerprint shape | PCA sliders and the PCA Walk control call the Haskell WASM reconstruction path and redraw `#outlineCanvas`. | Done |
| Generate by selected PCA coordinates | `public/app.js` reconstructs a generated outline from current PCA coordinates; SVG export is available. | Done |
| One app, not frontend/backend | Runtime app is static HTML/CSS/JS served by `python3 -m http.server`; no API server is required. | Done |
| Powered by WebAssembly and Haskell | `wasm/ShellKernel.hs` compiles to `public/shell-kernel.wasm`; verifier checks kernel kind is `Haskell WASM`, reconstruction normalizes to 360 total radius, fingerprint self-distance is 0, exact-contour self-distance is 0, and reversed-contour distance is 0. | Done |
| Process all dataset | `tools/verify_project.py` output: `dataset images: 59244`, `processed shells: 59244`, `errors: 0`. | Done |
| Dataset breadth surfaced | `public/data/model.json` reports `species_count: 7894` and `view_count: 2`; the app status line includes the species count and the verifier checks it. | Done |
| Restartable full rebuild | `tools/build_fingerprint_chunks.py` builds offset chunks and calls `tools/merge_fingerprint_chunks.py`; `make fingerprints-chunked` exposes it. A 50-image two-chunk smoke test produced `(50, 360)` fingerprints with 0 errors. | Done |
| Dimension/contour controls | Direct and chunked builders expose `--max-size` and `--contour-points`; the Makefile exposes `MAX_SIZE` and `CONTOUR_POINTS`, defaulting to 256 contour samples; an 8-image two-chunk smoke test with `--max-size 320 --contour-points 96 --smooth-window 7` produced `(8, 360)` fingerprints and `(8, 96, 2)` contours, and the full verified rebuild produced `(59244, 256, 2)` contours. | Done |
| Ten variants | `docs/variant_catalog.md` and the app's Variant Lab list Fourier, Curvature, Symmetry, Spectrum, Residual, Spiral, Context, Zernike, Color, Upload. Fourier and Context now use exact contour data when available, with radial fallbacks for generated/upload shapes. | Done |
| User upload version | Browser verifier uploads a generated test PNG and requires nearest-shell matching in Upload mode. | Done |
| Color-aware version | Color mode samples radial color from the selected source image using stored center, mean radius, and image dimensions. | Done |
| Repeatable verification | `make smoke`, `make verify`, and `make verify-browser` run syntax, entrypoint consistency, artifact, stale legacy payload absence, static payload SHA-256 checksum checks, processed-contour array checks, fixture-level mask-boundary contour checks, fixed-point fingerprint/contour round-trip export checks, curved-shell regression fixture checks, contour-audit summary and sheet existence including concavity, targeted contact-sheet rendering, WASM, browser, PC-axis, density-mode, generated/selected export, overlay-toggle, desktop/mobile no-overflow, hash-restored QA/neighbor/overlay state, variant, and upload checks. | Done |
| Missing-data recovery | Root and public entrypoints include a hidden missing-data panel with build/export commands; browser verification asserts it remains hidden when static data loads. | Done |
| 12-hour minimum | Active goal tracker reports `timeUsedSeconds: 45855`, which is above the 43,200-second 12-hour minimum. | Done |

## Latest Verification Commands

```bash
make smoke
make verify
make verify-browser
```

All three passed in the current workspace after the 256-point contour rebuild, segmented-contour/radial-envelope overlay split, source overlay layer toggles, exact `contours.u16` source contour export, static payload checksums, Haskell-WASM-backed exact outer-contour neighbor mode, selected exact-contour SVG export, generated and selected fingerprint CSV export, radial-mismatch audit, exact-contour concavity/solidity metrics, search-aware thumbnail Contour QA, random visible-shell navigation, missing-data recovery panel, upload-center alignment, PCA color-mode update, pinned reference comparison, Haskell WASM fingerprint and contour distance wiring, URL-hash restoration for map/QA/neighbor/overlay state, PCA Walk control, and desktop/mobile layout checks.

## Remaining Gap

None found in the current audit. The implementation deliverables are complete, the full dataset is processed, the app verifies in browser, and the explicit 12-hour minimum has elapsed.
