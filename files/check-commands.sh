#!/bin/bash
set -o pipefail
. /tmp/rer-cloud-toolchain.sh
packet="$HOME/rer-consolidation/work/je-gate-45/packet"
run_check() {
  name="$1"; shift
  date -u +%Y-%m-%dT%H:%M:%SZ > "$packet/$name.log"
  printf 'COMMAND:' >> "$packet/$name.log"
  printf ' %q' "$@" >> "$packet/$name.log"
  printf '\n' >> "$packet/$name.log"
  cloud_run "$@" >> "$packet/$name.log" 2>&1
  code=$?
  date -u +%Y-%m-%dT%H:%M:%SZ >> "$packet/$name.log"
  printf 'EXIT=%s\n' "$code" >> "$packet/$name.log"
  printf '%s exit=%s\n' "$name" "$code"
  tail -n 6 "$packet/$name.log"
  return "$code"
}
run_check npm-ci timeout 360 npm ci || exit $?
run_check listings-check timeout 120 npm run listings -- --check
run_check listings-write timeout 120 npm run listings
git diff --exit-code > "$packet/regeneration-diff.log" 2>&1
printf 'listings-regeneration-diff exit=%s\n' "$?"
run_check type-check timeout 180 npm run type-check
run_check lint timeout 180 npm run lint
run_check build timeout 600 npm run build
