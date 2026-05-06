# Seashell Fingerprinting Explorer

This project turns images in `dataset/` into 360-value radial fingerprints, normalizes those fingerprints by shell size, fits PCA, and serves a browser explorer for navigating and generating shell outlines in PCA space.

## Build The Fingerprints

```bash
python3 tools/build_fingerprints.py --dataset dataset --output processed
```

Or use the Makefile target:

```bash
make fingerprints
```

For large WSL-mounted datasets, the restartable chunked path is safer:

```bash
make fingerprints-chunked
```

The chunked builder also accepts the main contour and image-size controls, for
example:

```bash
make fingerprints-chunked MAX_SIZE=400 CONTOUR_POINTS=256
```

For a quick smoke test:

```bash
python3 tools/build_fingerprints.py --dataset dataset --output processed --limit 500
```

The build writes:

- `processed/manifest.json`: image metadata, PCA scores, PCA ranges, and errors.
- `processed/fingerprints.npz`: normalized fingerprints, resampled exact contours, and PCA model arrays.

## Run The Static Explorer

```bash
python3 -m http.server 8010
```

Or:

```bash
make serve
```

Open `http://127.0.0.1:8010/`.

The explorer is a static app. It loads preprocessed assets from `public/data/`
and source images from `dataset/`.
Static fingerprints are exported as fixed-point `fingerprints.u16` to keep the
browser payload compact while preserving the normalized 360-radius signals.
Static source-image contours are exported as fixed-point `contours.u16`, with
one resampled outer contour per processed shell, so the UI can draw the exact
offline segmentation contour instead of relying on a browser-side approximation.
The static model also records dataset breadth metadata; the current build has
59,244 shells across 7,894 species labels.
If the static data has not been exported, the app shows a missing-data panel
with the rebuild commands.

The PCA map supports exact-contour PC axis selection, point rendering,
species/mask/center-shift/contour-concavity coloring, hover inspection, search, random visible-shell jumps, nearest-shape
browsing by either PCA distance or true 360-radius contour distance,
exact resampled outer-contour distance computed in browser JavaScript,
source-image overlays with independent contour/center layer toggles,
pinned reference comparison by exact outer-contour RMS, SVG export, and
selected contour PC readouts, generated-fingerprint CSV, selected-fingerprint CSV,
and exact-contour SVG export. It also has
URL-hash state restoration for shareable map, neighbor, variant, and overlay views. The generator also includes a
PCA walk control for continuously morphing through learned shell-shape axes.
Middle-button drag pans the PCA map without changing the generated contour target.
The left pane carries browsing controls plus the selected shell's original
source image and nearest-shape context; the right pane is the lab.
Diagnostic controls, including the thumbnail-backed Contour QA queue, are only
created when you append `?debug=1` to the app URL.
The contour audit link is in the top bar.

## Lab Panel

The right panel is the lab: generated contour, generation coordinates, and ten
shape explorations built on the same fingerprint data:

- Elliptic Fourier contour harmonic reconstructions
- Curvature coloring
- Mirror symmetry folding
- Frequency spectrum bars
- Local residual spikes
- Log-radius spiral profile
- Exact-contour shape context bins
- Zernike moment bars
- Radial color sampling from the selected image
- User-upload silhouette fingerprinting with nearest-shell matching

## Pipeline

1. Load every supported image under `dataset/`.
2. Estimate the black background from image borders.
3. Segment the shell as foreground against that background.
4. Keep the primary connected shell component and fill interior holes.
5. Locate the shell center from the segmented shell centroid by default.
6. Snap the center onto the shell mask if a curved shell puts it in background.
7. Extract 360 radial distances to the shell edge as a normalized radial fingerprint.
8. Resample the exact outer contour into a fixed point count for contour overlays and distance checks.
9. Normalize each fingerprint by its mean radius.
10. Fit radial PCA and exact-contour PCA with `numpy`.
11. Export fixed-point browser assets plus contour-derived metrics such as radial mismatch, solidity, and concavity.

Export static app data after preprocessing:

```bash
python3 tools/export_static_data.py --dataset dataset --processed processed --output public/data
```

## Verify Artifacts

Run the non-browser verifier:

```bash
python3 tools/verify_project.py
```

Or:

```bash
make verify
```

Run the full verifier, including a headless Chromium smoke test:

```bash
python3 tools/verify_project.py --browser
```

Or:

```bash
make verify-browser
```

## Contour Audit

Generate edge-case contour sheets and an HTML audit report:

```bash
python3 tools/audit_contours.py --dataset dataset --processed processed --output public/contour_audit
```

Render a targeted visual contact sheet for a species, genus, or filename query:

```bash
python3 tools/make_contact_sheet.py --dataset dataset --processed processed --query Siliquaria --sort concavity --count 8 --output /tmp/siliquaria_contact.jpg
```

Or:

```bash
make contact-sheet QUERY=Siliquaria CONTACT_OUTPUT=/tmp/siliquaria_contact.jpg
```

The audit writes `index.html`, eight edge-case contact sheets, and
`summary.json` with contour metric quantiles and top outlier records. Red
traces are segmented outer contours; amber dashes are the radial fingerprint
envelopes. The `radial_mismatch` sheet calls out curved or tubular shells where
the 360-radius representation cuts across empty background. The `concavity`
sheet ranks shells by the exact contour area relative to its convex hull.

Open `http://127.0.0.1:8010/public/contour_audit/` while the static server is running.
See `docs/contour_notes.md` for the difference between the exact red contour
and the amber radial fingerprint envelope.
See `docs/data_format.md` for the fixed-point browser data layout.
See `docs/verification_matrix.md` for verifier coverage.
See `docs/rebuild_playbook.md` for full rebuild commands.
