# je-gate-34 independent gate plan

Evaluate only PR #50 at 0396a50284d16568b52f397e13787cf9440f3ad5 against its frozen main base. Do not fix or publish product changes, merge, comment, deploy, dispatch CI, or use provider credentials. Publish reports only to evidence/je-gate-34.

1. Confirm PR head/base using one PR REST read and fresh shallow Git refs. Preserve baseline main and inspect every candidate commit, path and hunk; check identity, trailers and credential-shaped values without exposing secrets.
2. Read each of four seed release lists once and the tagged CONTRACT.md once via gh api. Confirm release asset presence, maturity and tag; compare exact promotion versions and unchanged copy/status for every seed.
3. Independently run npm ci, listings check/write/check, typecheck, lint and production build. Determine whether this home repository documents contract/source-lock/migration generators; execute applicable commands only. Keep generated files uncommitted.
4. Probe the built four seed pages and baseline at 1440 and 390. Assert candidate version/overflow at 1440; capture both widths and compare touched routes against baseline.
5. Read exact-SHA Verify once; no reruns or dispatch. Compare four tagged contract status tables with JE claims, only flag source-proven false sentences and tier proportionally.
6. Record commands, actual results, limits, before/after counts and all rubric rows in REPORT.md and actual receipt files. Publish explicitly selected non-secret evidence to the declared repository evidence ref. Stop owned server/browser processes; delete clone and node_modules after report publication.

GitHub REST budget: at most ten calls total: one PR, four release lists, four tagged contracts, one exact-head Actions read. No other-repository clones.
