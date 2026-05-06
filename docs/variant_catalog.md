# Variant Catalog

The app implements these ten variants in the single static explorer:

| Variant | Input | Output |
| --- | --- | --- |
| Fourier | Exact contour points when available, radial fallback otherwise | Elliptic Fourier outline stack at 3, 6, 12, and 24 harmonics |
| Curvature | Fingerprint-derived outline | Boundary colored by signed turning curvature |
| Symmetry | Fingerprint and its mirrored angular index | Folded outline plus asymmetry score |
| Spectrum | Fingerprint Fourier coefficients | Harmonic magnitude bars |
| Residual | Fingerprint minus a smoothed fingerprint | Local protrusion and indentation rays |
| Spiral | Log radius over angle | Log-radius phase plot and fitted slope |
| Context | Exact contour points when available, radial fallback otherwise | 36 x 10 log-polar shape-context heatmap |
| Zernike | Filled radial silhouette in the unit disk | Low-order Zernike moment magnitudes |
| Color | Selected source image plus contour rays | Radial color strip sampled from the shell image |
| Upload | User image silhouette | Uploaded fingerprint overlaid with the nearest dataset shell |

Research ideas used while choosing the variants:

- Fourier descriptors and curvature scale space are standard contour descriptors for shape retrieval: https://www.sciencedirect.com/science/article/pii/S1047320303000038
- Elliptic Fourier descriptors can represent closed 2D contours and are widely used for biological outline morphometrics: https://academic.oup.com/jhered/article/93/5/384/2187412
- Shape contexts use log-polar histograms around sampled contour points for shape matching: https://vision.ucsd.edu/publications/2002/shape-matching-and-object-recognition-using-shape-contexts
- Zernike moments are region descriptors in a unit disk and are used as global shape descriptors: https://www.sciencedirect.com/science/article/pii/S0143816611002156
- Multiscale centroid-contour distance descriptors extend simple radial signatures with scale-space Fourier analysis: https://www.mdpi.com/1424-8220/19/3/486
- Inner-distance shape descriptors compare points by paths constrained to the silhouette, which is useful for articulated or strongly curved shapes: https://www3.cs.stonybrook.edu/~hling/publication/inner-dist.pdf
- Persistent homology is a topological descriptor family for holes and connected features across spatial scales: https://pmc.ncbi.nlm.nih.gov/articles/PMC4685963/
- Heat-kernel signatures are spectral shape descriptors based on diffusion over a shape: https://researchportal.ip-paris.fr/fr/publications/a-concise-and-provably-informative-multi-scale-signature-based-on-2/

Future niche variants that would fit the same static app:

- Persistent aperture barcode: threshold the filled shell mask across radial distance and show persistent H0/H1 bars for holes, apertures, and detached ornamentation.
- Heat diffusion outline: treat the radial polygon as a graph and animate heat-kernel signatures as a spectral fingerprint.
- Multiscale centroid contour distance: replace one 360-radius signal with several smoothed radius scales, then PCA across scale-frequency coefficients.
- Inner-distance context: compare shells by paths constrained to the silhouette, useful for curved dentalium-like shells where Euclidean radial distance overstates gaps.
- Fractal rib score: estimate box-counting dimension on the contour residual to separate smooth cowries from ribbed scallops and spired shells.
