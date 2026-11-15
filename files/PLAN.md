# je-sync-37 execution plan

Author: Run Edit Run fleet. Date: 2026-11-15T10:07:58Z.

1. Set fleet identity; refresh launcher; install credential helper, push guard and commit hooks. Clone only just-every/home shallow and branch cloud/je-sync-37 from fresh main.
2. Read AGENTS.md and committed seeds-sync implementation. Install dependencies. Run dry sync with --only happytohelp,lamp,uptime,oncall,orbit,spool to honor the later-seed pause. Adapt only Git read transport outside the checkout: seed ref queries go through gh api, never cloning another repository.
3. Independently inspect GitHub releases for all six seeds and the live RER /data/seeds.json. Require published non-draft/non-prerelease releases with rer-release.dsse.json for version promotion; preserve newer JE versions when RER is behind. Asset presence does not verify signatures.
4. Run --copy-only --apply and review provenance at released refs, leaving accurate wording and existing partial-evidence follow-ups unchanged. Run --apply only after reviewing proposed updates. Refresh new-version copy provenance and verify a final dry sync has no unexplained drift.
5. Regenerate listings and check them; verify scope, counts, exclusions and pricing. Run type-check, lint and production build. Browser-check the changed Lamp page at 1440 and 390; keep evidence out of product commits.
6. Fetch/rebase fresh main before first product push. Commit with forced fleet author/committer environment and active repository hooks. Check all candidate identities/trailers, diff hygiene and credential patterns; push cloud/je-sync-37 with the guard. Open the requested PR and observe exact-SHA Verify through REST with a 300-second per-run interval and a ten-call CI/PR observation budget.
7. Save full non-secret results and receipts in this packet, publish only to evidence/je-sync-37 using cloud_evidence.py, and delete the pushed product clone and node_modules. Leave merge, publication scan, deployment and live proof to the lane.
