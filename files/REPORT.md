# je-sync-46 results
Author: Run Edit Run fleet. Recorded: 2026-11-17T07:06:49Z.

Done: sound product candidate pushed as cloud/je-sync-46 at ab47d1c215a29c6c6041924b40acd73606b113e0.
PR: https://github.com/just-every/home/pull/71 (open, main remains fleet-controlled).
Base: 98760b32e33ae6cdacb6328c9de076d66bfa9f94; fetched before the first product push and rebase confirmed up to date.

## Plan and execution

The full initial plan is PLAN.md. Read launcher AGENTS.md, home AGENTS.md, and the sync implementation before installing or applying. npm ci completed. Scoped all sync invocations with --only happytohelp,lamp,uptime,oncall,orbit,spool because later seeds are paused until 25 November. No additional repository was cloned, no provider credentials used, and no product ref other than cloud/je-sync-46 was pushed.

The first dry run read all six repository sources then stopped because Playwright was absent. Installed global Playwright and the repository's npm 10.9.3 pin; reinstalled fleet forwarding/cleanup hooks. The successful dry-review report proposed exactly these lines:

- Uptime: version newer tag v0.5.16 (page shows v0.5.15) [to apply].
- Lamp: version newer tag v1.11.21 (page shows v1.11.19) [to apply].
- Spool: version newer tag v0.7.14 (page shows v0.7.13) [to apply].

HappyToHelp, Oncall and Orbit had no proposal. No marks, colours, status, homepage, stills, headline or incumbent changes were proposed; no recurring manual mark/colour/status findings appeared for the six paths. Share-image regeneration was not requested. The tool's standard homepage observations were retained only in evidence; no new art or gallery capture was imported.

Ran --copy-only --apply before mechanical apply; it changed provenance state only and reported 0 of 6 changed at the existing version tags. Ran --apply and imported exactly the three eligible version changes. Then ran --copy-only --apply at the new displayed release tags to align provenance. It reported Lamp README.md and seed.json and Uptime/Spool seed.json changes. The exact source diffs are released-copy-diffs.txt: all seed.json changes are version fields at row 4, and Lamp README.md rows 88–94 and 138–142 clarify the package.json CLI pin instead of hard-coding rer 0.2.108. The three released CONTRACT.md blobs are unchanged across old/new tags. source-review.md cites the 26 unchanged JE promise clauses by released file/row. No public claim was proven false by these source changes, so all current public wording remains intact.

Generated listings and passed its check. Final dry sync: 0 of 6 seeds changed, 0 unreadable. Nothing unexplained remains in the six-path scope. State records the new source refs, hashes and reported copy findings; Oncall's stale seed.json finding id was cleared by the committed tool because it no longer reports that drift. No clause judgment changed.

## Release eligibility and per-seed result

All three advances were freshly checked through GitHub Release objects: published, non-draft, non-prerelease, carrying rer-release.dsse.json. This proves asset presence only; no signature verification was performed. release-gate-receipt.json matches the release tag commits to the tool's final Git-resolved copy sources.

| Seed | Before | After | Released source commit | Published UTC | Release |
| --- | --- | --- | --- | --- | --- |
| Lamp | v1.11.19 | v1.11.21 | 4d0675dbe51e2a86f69a8112b153baaf3fd91094 | 2026-11-17T06:00:15Z | https://github.com/just-every/run-lamp/releases/tag/v1.11.21 |
| Spool | v0.7.13 | v0.7.14 | 1853e3b3b59d49853b5ee7678f851d6de8343fbf | 2026-11-17T05:47:55Z | https://github.com/just-every/run-spool/releases/tag/v0.7.14 |
| Uptime | v0.5.15 | v0.5.16 | 6fd9399cf9ce9acf4e009999581cc20f32c9e129 | 2026-11-17T06:55:05Z | https://github.com/just-every/run-uptime/releases/tag/v0.5.16 |
| HappyToHelp | v0.4.31 | unchanged | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | unchanged | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.31 |
| Oncall | v0.5.17 | unchanged | 3b9cba555f564a4d582b9909305bc8d35c9c8bf1 | unchanged | https://github.com/just-every/run-oncall/releases/tag/v0.5.17 |
| Orbit | v0.4.11 | unchanged | a4fcbfcd72fa4253826f43d0b0de02275094f86d | unchanged | https://github.com/just-every/run-orbit/releases/tag/v0.4.11 |

Uptime v0.5.16 was published during this run, after the brief snapshot, and meets the same RELEASED rule. Initial copy refs and old commits are fully recorded in dry-review/report.md; final refs are in dry-final/report.md. The sync reads committed marks and brand declarations from HEAD separately from these tagged copy sources; no brand change resulted.

Fresh public https://runeditrun.com/data/seeds.json was downloaded. Its generatedAt remains 2026-11-15T13:56:34Z, so compared actual versions and repositories, not its static stamp. At observation it listed HappyToHelp 0.4.31, Lamp 1.11.19, Uptime 0.5.15, Oncall 0.5.17, Orbit 0.4.11 and Spool 0.7.13. Spool matched https://github.com/just-every/run-spool with id errors-workbench. RER is behind the candidate on Lamp, Spool and Uptime; no JE version was downgraded. rer-comparison.json records the observed rows and timestamp.

## Scope, withheld work and counts

Changed exactly public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts: 28 insertions, 26 deletions. The generated listing differences are only the three version fields plus generatedAt. No new test registrations or contract edits. Clause status changes: none.

Counts before → after: 49 → 49 listings, 35 → 35 released, 14 → 14 coming soon. All eight exclusions remain absent: Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen. No exclusion reappeared, so overrides.json was untouched.

No proposed six-path version was withheld: all three latest tags had eligible published Releases and assets. Later/coming-soon seeds were deliberately not inspected or imported under the pause, and are not claimed drift-free. Preserve Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D). Those follow-ups were not repaired or promoted here. Keep current marks/colours/status/homepage observations because the tool proposed no changes. Pricing and its accepted presentation are unchanged: Assisted US$10/month and Managed US$100/month, with no added GST wording or billing-country restrictions.

## Validation and limitations

npm ci, type-check, lint, listings generation/check and final dry sync passed. Production build passed on retry. The first build compiled and generated all 61 pages but exited with Next.js's pre-existing security upgrade reminder; retry succeeded with its continuing warning. The push also reported pre-existing default-branch Dependabot findings (8 high, 12 moderate, 2 low). These dependency findings need the owning lane's follow-up; no dependencies changed in this catalogue scope.

Browser proof: three version assertions at 1440; each changed page captured once at 1440 and 390. First attempt waited for networkidle and timed out on Lamp; corrected the evidence driver to wait for document readiness, retaining the actual initial failure log. Local-only D1 migrations were applied after missing analytics tables appeared in the local server log. No mocked application routes or provider service was used. Final six captures returned HTTP 200. Existing media can still be loading; this proof validates the rendered catalogue versions and responsive page presentation, not gallery/media qualification. Browser/context cleanup completed, and the owned Next process was stopped by its recorded PID.

Diff whitespace, write-scope and credential-shape checks passed. All candidate author/committer identities are Run Edit Run fleet <fleet@runeditrun.com>, with no trailers. Repository pre-commit and pre-push hooks remained active through the fleet wrappers. The first rebase attempt preceded the commit and Git refused unstaged changes without modifying the tree; after committing, rebase against freshly fetched main passed without changes. No published history was rewritten.

The full local suite was intentionally not run; exact-SHA Verify is the full CI gate. Mac publication scanning, independent non-builder review, PR merge, deployment and live verification are retained fleet responsibilities. Evidence publication is separate from product custody and signals no landing or acceptance. CI observation and terminal disposition are recorded in CI.md and ci-receipt.json when available.

## CI and terminal custody

Recorded 2026-11-17T07:07:56Z: exact-SHA push Verify branch run 44035955957 completed/success. URL: https://github.com/just-every/home/actions/runs/44035955957. One REST discovery call, zero poll calls and zero log fetches. Same-SHA CodeQL 44036014288 succeeded; duplicate PR Verify 44036019177 was skipped by repository policy. Required push Verify is green. No blocker remains for producing this candidate; fleet review/publication scan and landing hold remain in force.

READY branch=cloud/je-sync-46 head=ab47d1c215a29c6c6041924b40acd73606b113e0
