#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -f "${HOME}/.ghc-wasm/env" ]]; then
  # shellcheck source=/dev/null
  source "${HOME}/.ghc-wasm/env"
fi

if ! command -v wasm32-wasi-ghc >/dev/null 2>&1; then
  echo "wasm32-wasi-ghc is not installed. Run:" >&2
  echo "curl https://gitlab.haskell.org/haskell-wasm/ghc-wasm-meta/-/raw/master/bootstrap.sh | sh" >&2
  exit 1
fi

mkdir -p "${ROOT}/public"

wasm32-wasi-ghc \
  "${ROOT}/wasm/ShellKernel.hs" \
  -O2 \
  -no-hs-main \
  -optl-mexec-model=reactor \
  -optl-Wl,--export=hs_init \
  -optl-Wl,--export=normalizeFingerprint \
  -optl-Wl,--export=reconstructFingerprint \
  -optl-Wl,--export=fingerprintDistance \
  -optl-Wl,--export=contourDistance \
  -optl-Wl,--export=malloc \
  -optl-Wl,--export=free \
  -o "${ROOT}/public/shell-kernel.wasm"

ls -lh "${ROOT}/public/shell-kernel.wasm"
