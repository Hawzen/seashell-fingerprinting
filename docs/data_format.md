# Static Data Format

The browser app reads precomputed files from `public/data/`.

## `model.json`

Small JSON metadata for reconstruction and UI setup:

- `processed_count`: number of processed shells.
- `species_count`: number of species labels in the static dataset.
- `angle_count`: number of radial samples, currently `360`.
- `component_count`: number of radial PCA components stored in `processed/`.
- `visible_component_count`: number of radial PCA components sent to the browser controls.
- `mean` and `components`: radial PCA mean and visible components.
- `pca_ranges`: radial PCA axis ranges.
- `contour_pca_ranges`: exact-contour PCA axis ranges.
- `fingerprint_file`, `fingerprint_encoding`, `fingerprint_scale`: binary fingerprint payload metadata.
- `contour_file`, `contour_encoding`, `contour_points`, `contour_scale`: binary exact-contour payload metadata.

## `shells.json`

One record per shell, in the same order as the binary arrays. Important fields:

- `id`: array row index.
- `file`: source image path under `dataset/`.
- `species`, `specimen`, `view`: labels parsed from the filename.
- `pc`: radial PCA scores shown on radial map axes.
- `contour_pc`: exact-contour PCA scores shown on contour map axes.
- `center`, `mean_radius`: radial fingerprint frame of reference.
- `radial_mismatch`, `contour_solidity`, `contour_concavity`: contour QA metrics.

## `fingerprints.u16`

Flat little-endian `uint16` array with shape:

```text
processed_count * 360
```

Values decode as:

```text
radius = stored_value / fingerprint_scale
```

The decoded 360-value vector is mean-normalized, so shells compare by shape
rather than size.

## `contours.u16`

Flat little-endian `uint16` array with shape:

```text
processed_count * contour_points * 2
```

Values decode as:

```text
x_or_y = stored_value / contour_scale
```

Each row is a resampled outer contour in source-image pixel coordinates. It is
used for exact source overlays, contour SVG export, contour PCA axes, and
browser-side contour-neighbor comparison.

## `checksums.json`

SHA-256 integrity metadata for the static payload files:

- `model.json`
- `shells.json`
- `fingerprints.u16`
- `contours.u16`

Each entry records the byte count and SHA-256 digest. The project verifier
recomputes these hashes so stale or partially written browser assets fail fast.
