#!/bin/bash
# .ai/ → .cursor/ + .claude/ 변환 shim.
# 실제 로직은 sync.py (파이썬 3, 엄격 에러 모드)에 있다.
# Usage: bash .ai/sync.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec python3 "$SCRIPT_DIR/sync.py" "$@"
