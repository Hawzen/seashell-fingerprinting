# Rebuild Playbook

Run commands from the repository root.

## Full Static App Rebuild

```bash
make fingerprints-chunked
make export-data
make audit
make verify-browser
```

Useful knobs:

```bash
make fingerprints-chunked MAX_SIZE=400 CONTOUR_POINTS=256 WORKERS=8 CHUNK_SIZE=10000
```

`MAX_SIZE=400` uses the full resolution of the current 400 x 300 dataset
images. Raise `CONTOUR_POINTS` if the contour overlay needs denser resampled
boundary loops.

## Quick Pipeline Smoke

```bash
python3 tools/build_fingerprint_chunks.py \
  --dataset dataset \
  --output /tmp/seashell-smoke-processed \
  --chunks /tmp/seashell-smoke-chunks \
  --total-limit 8 \
  --chunk-size 4 \
  --workers 2 \
  --max-size 320 \
  --contour-points 96 \
  --smooth-window 7
```

The expected merged output has:

```text
fingerprints: (8, 360)
contours: (8, 96, 2)
```

## Serve The App

```bash
make serve
```

Open:

```text
http://127.0.0.1:8010/
```

The app is static. There is no backend service; `python3 -m http.server` only
serves files from the workspace.

## Targeted Contact Sheet

```bash
make contact-sheet QUERY=Siliquaria CONTACT_OUTPUT=/tmp/siliquaria_contact.jpg
```

By default this sorts matches by contour concavity so curved/tubular cases rise
to the front of the sheet.
