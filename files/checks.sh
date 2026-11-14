set -u
. /tmp/rer-cloud-toolchain.sh
packet="$HOME/rer-consolidation/work/je-gate-41/packet"
run_check() {
  check_name="$1"; shift
  check_started="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
  cloud_run "$@" > "$packet/$check_name.log" 2>&1
  check_code=$?
  check_finished="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
  python3 - "$packet/checks.jsonl" "$check_name" "$check_started" "$check_finished" "$check_code" "$@" <<'PY'
import json,sys
from pathlib import Path
path,name,start,end,code,*command=sys.argv[1:]
with Path(path).open('a') as f:
    f.write(json.dumps(dict(name=name,start=start,end=end,exit=int(code),command=command))+'\n')
print(name+': exit='+code)
PY
  tail -35 "$packet/$check_name.log"
}
run_check listings-check npm run listings -- --check
run_check listings-generate npm run listings
run_check listings-no-diff git diff --exit-code
run_check type-check npm run type-check
run_check lint npm run lint
run_check build npm run build
