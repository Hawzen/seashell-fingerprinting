PYTHON ?= python3
PORT ?= 8010
MAX_SIZE ?= 400
SMOOTH_WINDOW ?= 5
CONTOUR_POINTS ?= 256
WORKERS ?= 8
THUMBNAIL_SIZE ?= 160
THUMBNAIL_QUALITY ?= 64

.PHONY: fingerprints export-data wasm smoke verify verify-browser serve

fingerprints:
	$(PYTHON) tools/build_fingerprints.py --dataset dataset --output processed --max-size $(MAX_SIZE) --smooth-window $(SMOOTH_WINDOW) --center centroid --contour-points $(CONTOUR_POINTS)

export-data:
	$(PYTHON) tools/export_static_data.py --dataset dataset --processed processed --output public/data --contour-points $(CONTOUR_POINTS) --contour-workers $(WORKERS) --thumbnail-size $(THUMBNAIL_SIZE) --thumbnail-quality $(THUMBNAIL_QUALITY)

wasm:
	$(PYTHON) tools/build_wasm.py --output public/shell-generator.wasm

smoke: wasm
	node --check public/app.js
	$(PYTHON) -m py_compile tools/*.py

verify: smoke
	$(PYTHON) tools/verify_project.py

verify-browser: smoke
	$(PYTHON) tools/verify_project.py --browser

serve:
	$(PYTHON) -m http.server $(PORT)
