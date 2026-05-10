PYTHON ?= python3
JS_RUNNER ?= bun
PORT ?= 8010
MAX_SIZE ?= 400
SMOOTH_WINDOW ?= 5
CONTOUR_POINTS ?= 256
CONTOUR_SCALE ?= 16
WORKERS ?= 8
THUMBNAIL_SIZE ?= 224
THUMBNAIL_QUALITY ?= 45
THUMBNAIL_FORMAT ?= avif

.PHONY: fingerprints export-data localities species-traits frontend-build frontend-typecheck smoke verify verify-browser verify-perf dev serve

fingerprints:
	$(PYTHON) tools/build_fingerprints.py --dataset dataset --output processed --max-size $(MAX_SIZE) --smooth-window $(SMOOTH_WINDOW) --center centroid --contour-points $(CONTOUR_POINTS)

export-data:
	$(PYTHON) tools/export_static_data.py --dataset dataset --processed processed --output public/data --contour-points $(CONTOUR_POINTS) --contour-scale $(CONTOUR_SCALE) --contour-workers $(WORKERS) --thumbnail-size $(THUMBNAIL_SIZE) --thumbnail-quality $(THUMBNAIL_QUALITY) --thumbnail-format $(THUMBNAIL_FORMAT)

localities:
	$(PYTHON) tools/build_localities.py --offline

species-traits:
	$(PYTHON) tools/build_species_traits.py

frontend-build:
	$(JS_RUNNER) run build

frontend-typecheck:
	$(JS_RUNNER) run typecheck

smoke: frontend-build frontend-typecheck
	node --check public/app.js
	$(PYTHON) -m py_compile tools/*.py

verify: smoke
	$(PYTHON) tools/verify_project.py

verify-browser: smoke
	$(PYTHON) tools/verify_project.py --browser

verify-perf: smoke
	$(PYTHON) tools/verify_project.py --browser --perf

dev:
	$(JS_RUNNER) run dev

serve:
	$(PYTHON) -m http.server $(PORT)
