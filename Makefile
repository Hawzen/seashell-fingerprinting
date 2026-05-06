PYTHON ?= python3
PORT ?= 8010
MAX_SIZE ?= 400
SMOOTH_WINDOW ?= 5
CENTER ?= centroid
CONTOUR_POINTS ?= 256
CHUNK_SIZE ?= 10000
WORKERS ?= 8
PROGRESS_EVERY ?= 5000
QUERY ?=
CONTACT_SORT ?= concavity
CONTACT_COUNT ?= 8
CONTACT_OUTPUT ?= /tmp/seashell_contact.jpg

.PHONY: fingerprints fingerprints-chunked export-data wasm audit contact-sheet verify verify-browser serve smoke

fingerprints:
	$(PYTHON) tools/build_fingerprints.py --dataset dataset --output processed --max-size $(MAX_SIZE) --smooth-window $(SMOOTH_WINDOW) --center $(CENTER) --contour-points $(CONTOUR_POINTS)

fingerprints-chunked:
	$(PYTHON) tools/build_fingerprint_chunks.py --dataset dataset --output processed --chunks processed_chunks --chunk-size $(CHUNK_SIZE) --workers $(WORKERS) --progress-every $(PROGRESS_EVERY) --max-size $(MAX_SIZE) --smooth-window $(SMOOTH_WINDOW) --center $(CENTER) --contour-points $(CONTOUR_POINTS)

export-data:
	$(PYTHON) tools/export_static_data.py --dataset dataset --processed processed --output public/data --contour-points $(CONTOUR_POINTS)

wasm:
	tools/build_wasm.sh

audit:
	$(PYTHON) tools/audit_contours.py --dataset dataset --processed processed --output public/contour_audit
	$(PYTHON) tools/make_validation_preview.py --dataset dataset --processed processed --output public/validation_preview.jpg --count 12

contact-sheet:
	$(PYTHON) tools/make_contact_sheet.py --dataset dataset --processed processed --query "$(QUERY)" --sort $(CONTACT_SORT) --count $(CONTACT_COUNT) --output $(CONTACT_OUTPUT)

verify: smoke
	$(PYTHON) tools/verify_project.py

verify-browser: smoke
	$(PYTHON) tools/verify_project.py --browser

smoke:
	node --check public/app.js
	node --check public/wasm-kernel.js
	$(PYTHON) -m py_compile tools/*.py

serve:
	$(PYTHON) -m http.server $(PORT)
