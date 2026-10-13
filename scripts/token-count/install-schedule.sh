#!/bin/sh
# Installs (or reinstalls) the launchd agent that runs
# `publish.mjs --remote` every three days from this checkout. Run it from the
# checkout that should stay put (the main one, not a temporary worktree).
#
#   scripts/token-count/install-schedule.sh            install and load
#   scripts/token-count/install-schedule.sh --remove   unload and delete
set -eu

label=com.justevery.token-count
here=$(cd "$(dirname "$0")" && pwd)
repo=$(cd "$here/../.." && pwd)
plist="$HOME/Library/LaunchAgents/$label.plist"
log="$HOME/Library/Logs/justevery-token-count.log"
domain="gui/$(id -u)"

launchctl bootout "$domain/$label" 2>/dev/null || true
if [ "${1:-}" = "--remove" ]; then
  rm -f "$plist"
  echo "Removed $label."
  exit 0
fi

node=$(command -v node)
[ -x "$repo/node_modules/.bin/wrangler" ] || {
  echo "Run npm ci in $repo first (publish.mjs uses its wrangler)." >&2
  exit 1
}

mkdir -p "$(dirname "$plist")" "$(dirname "$log")"
sed -e "s#__REPO__#$repo#g" \
  -e "s#__NODE__#$node#g" \
  -e "s#__PATH__#$(dirname "$node"):/usr/bin:/bin:/usr/sbin:/sbin#g" \
  -e "s#__LOG__#$log#g" \
  "$here/$label.plist" >"$plist"
plutil -lint "$plist" >/dev/null
launchctl bootstrap "$domain" "$plist"

echo "Installed $label: publish.mjs --remote every 3 days from $repo."
echo "Log: $log"
echo "Run once now: launchctl kickstart $domain/$label"
