# Verification Matrix

## `make smoke`

Fast syntax gate:

- `node --check public/app.js`
- `node --check public/wasm-kernel.js`
- `python3 -m py_compile tools/*.py`

## `make verify`

Artifact and kernel gate:

- Runs the `make smoke` syntax gate first.
- Confirms root `index.html` and `public/index.html` expose the same critical controls.
- Counts images in `dataset/` and matches them to `processed/manifest.json`.
- Requires all dataset images to be processed with zero errors.
- Requires normalized `(processed_count, 360)` fingerprints.
- Requires stored exact contours in `processed/fingerprints.npz`.
- Checks processed contours are finite, in image bounds, and non-collapsed.
- Rebuilds contour fixtures from masks and checks stored contours still sit on the current mask boundary.
- Checks fixed-point `fingerprints.u16` round-trips against processed fingerprints.
- Checks fixed-point `contours.u16` round-trips against processed contours.
- Recomputes SHA-256 hashes from `public/data/checksums.json`.
- Requires contour PCA axes, shell records, contour metrics, and curved-shell regression fixtures.
- Requires contour-audit summary groups and contact-sheet images.
- Renders a targeted `Siliquaria` contact sheet through `tools/make_contact_sheet.py`.
- Starts a temporary local server and checks the Haskell WASM kernel:
  - kernel kind is `Haskell WASM`
  - generated mean fingerprint sums to `360`
  - fingerprint self-distance is `0`
  - contour self-distance is `0`
  - reversed-contour distance is `0`

## `make verify-browser`

Runs the `make smoke` syntax gate, runs everything in `make verify`, then adds a headless Chromium pass:

- Restores hash state for selected shell, reference shell, axes, map mode, color mode, variant, and PCA coordinates.
- Exercises PCA Walk, Stop, and Mean controls.
- Checks all 10 Variant Lab modes are present.
- Checks contour PCA axes can be selected.
- Checks concavity color mode and concavity QA mode.
- Checks search-filtered QA rows and empty-filter Random behavior.
- Checks generated fingerprint CSV and generated SVG export.
- Checks selected fingerprint CSV and selected exact-contour SVG export.
- Checks pinned comparison reports radial and exact-contour RMS.
- Checks fingerprint and exact-contour neighbor modes.
- Checks source overlay drawing and layer toggles.
- Checks Fourier and Context variants use exact contour data when available.
- Uploads a synthetic shape and checks nearest-shell matching.
- Reloads a mobile-width view from a hash with contour axes, concavity color, concavity QA, contour-neighbor mode, and contour-only overlay layers.
- Checks the mobile view has no horizontal overflow.

## Targeted Visual Checks

`tools/make_contact_sheet.py` can render targeted query sheets with the same
stored contour/radial overlays used by the validation preview. The verifier
checks a small `Siliquaria` sheet automatically.
