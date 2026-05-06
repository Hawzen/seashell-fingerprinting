# Contour Notes

The project stores two different shape views because they answer different
questions.

The exact contour is a resampled outer boundary loop from the segmented shell
mask. It is stored in `processed/fingerprints.npz` as `contours` and exported to
`public/data/contours.u16`. The app uses this contour for source-image overlays,
exact-contour nearest neighbors, contour PCA axes, elliptic Fourier variants,
shape-context variants, selected-contour SVG export, solidity, and concavity.

The radial fingerprint is a 360-value signal measured from the detected shell
center to the shell mask edge. It is normalized by mean radius and used for the
original PCA generator. This representation is compact and works well for
star-shaped silhouettes, but it cannot exactly represent every shell outline.
On curved or tubular shells, one ray per angle can bridge across black
background. That is a limitation of the radial envelope, not necessarily a
failed outer-contour segmentation.

Validation sheets use this color convention:

- Red: stored segmented outer contour.
- Amber dashed: radial fingerprint envelope.
- Cyan: detected center.

The `radial_mismatch` and `concavity` audit sheets intentionally surface shells
where the radial envelope and exact contour diverge. Those cases should remain
visible because they are important diagnostics for deciding whether to compare
shells by radial PCA, 360-radius fingerprint distance, or exact-contour
distance.
