PYTHON ?= python3
JS_RUNNER ?= npm
PORT ?= 8010
.PHONY: fingerprints audit localities species-traits frontend-build frontend-typecheck smoke verify verify-browser verify-perf dev serve

fingerprints:
	$(PYTHON) tools/build_fingerprints.py --dataset dataset --output processed_fft

audit:
	$(PYTHON) tools/audit_fft_fingerprints.py --dataset dataset --processed processed_fft --output processed_fft/audit_contact_sheet.jpg

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
