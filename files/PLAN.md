# je-sync-36 plan

Author: Run Edit Run fleet. Prepared 2026-11-15 UTC (execution timestamps are captured with date -u in receipts).

1. Refresh launcher, install bundle-only Git authentication, identity and co-author hooks. Shallow clone only just-every/home and create cloud/je-sync-36 from main.
2. Read AGENTS.md and committed sync implementation. Limit all sync passes to happytohelp,lamp,uptime,oncall,orbit,spool because later seeds are paused. Read other repositories only through gh api; an external task-local transport adapter translates the sync's git ls-remote probes into GitHub ref/commit API reads without editing the sync implementation. Cache source reads for a consistent run snapshot; live homepage observations remain separate.
3. Install with npm ci; run dry sync and review every proposed change. Independently query published GitHub Releases for all six seeds, including rer-release.dsse.json presence. Do not infer signature verification from asset presence or use a bare tag as publication evidence.
4. Run copy-only apply. Review changed released copy sources against existing JE wording. Edit claims only if released source proves them false; preserve partial-evidence follow-ups and all contract statuses.
5. Run mechanical apply. Retain only eligible six-path changes within scope. Revert any bare-tag version, live-homepage claim change without released-source support, gallery input or unproven live still. Preserve pricing and excluded seeds. Run listings generation/check, then dry sync and explain every withheld finding.
6. Run type-check, lint and production build and only relevant data checks. If public listing appearance changes, capture changed candidate screens at 1440 and 390, with assertions only at 1440. Do not redesign.
7. Refresh main and rebase before the first product push (merge after publication). Audit all commit identities, trailers, paths and diff for credential-shaped values. Push real candidate using cloud-push.py; open the prescribed PR. Observe exact-SHA Verify through REST with at least 300 seconds between observations of the run. Retain complete reports/receipts outside product branch; publish report-only evidence ref and clean clone after successful publication.

No target contract clause changes or status promotions are authorized. Publication scan, landing, deploy and live proof remain with the lane.
