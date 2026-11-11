# Done: je-sync-20

Repository: just-every/home. Branch: cloud/je-sync-20.
Candidate: `393067c8e694cb7d088fd44685a9d4dd37b0ae9d`. PR: https://github.com/just-every/home/pull/44.
Fresh shallow main base: `71a913e8667dc8a68e8cfc7e8fc04a1c401de2fa`.

## Result

Four released version updates; no public claim, mark, colour, status, homepage or gallery change. Counts: **49 → 49 listings; 35 → 35 released; 14 → 14 coming soon**. No clause status changes, no contract implementation promotions. Pricing remains Assisted US$10/month and Managed US$100/month; accepted presentation and no GST/billing-country restrictions are preserved by the unchanged pricing source. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. HappyToHelp v0.4.21 and Oncall v0.5.8 are unchanged.

## Plan and execution

The complete plan is PLAN.md. Work followed its seven steps: fresh scoped clone and instruction review; locked dependency install and full dry sync; provenance-only apply; fresh Release qualification and mechanical apply; generated listings and final drift check; local validation and guarded product publication; browser proof, CI observation and separate report-only evidence publication. No other repository was cloned or modified. No provider deployment, merge, main push or gallery ingestion was performed. The lane retains its independent gate, landing hold, Mac publication scan, merge, deployment and live verification.

The initial full dry command stopped because Playwright was absent. Playwright 1.63.0 was installed globally in the user-owned tool directory, with no package manifest or lockfile change, and the unchanged sync was rerun with `/usr/bin/chromium` and `--no-sandbox`. Dependency npm ci passed. The supplied fleet forwarding symlinks initially broke Husky's relative `h` lookup before any commit was created; local Git hook forwarding wrappers now execute the original Husky hook paths. The original pre-commit ran eslint and Prettier through lint-staged successfully; fleet commit-message cleanup remains active. No hook was disabled.

## Complete dry-sync proposal list

`Dry run: 4 of 49 seeds changed.` All 49 repositories and all 49 homepages were readable. These four lines are the entire set of proposed changes:

- Uptime: `version newer tag v0.5.6 (page shows v0.5.5)`.
- Lamp: `version newer tag v1.11.12 (page shows v1.11.11)`.
- Orbit: `version newer tag v0.4.6 (page shows v0.4.5)`.
- Spool: `version newer tag v0.7.6 (page shows v0.7.5)`.

There were no mark, colour, released-status, homepage, copy or coming-soon drift findings in the initial full dry run. There were no still-open mark/colour/status findings in that tool output; no redesign or capture campaign was invented. The normal committed sync tool's homepage observations were used only for its own comparisons; no art or captures were imported. The initial copy source refs are the currently displayed release versions, not newer default-branch copy; the complete 49-row ref/commit/reason table is in dry-initial-report.md and dry-initial-report.json.

## Per-seed changes and released source refs

| Seed | Displayed version before → after | Released commit | Source row |
| --- | --- | --- | --- |
| Uptime | v0.5.5 → v0.5.6 | 65953b2f1288fb5010f17391761abeee16923793 | run-uptime@v0.5.6 seed.json:4 |
| Lamp | v1.11.11 → v1.11.12 | 62e6a2c30f7f87ad29c5e9d3eec2e0946315cc6b | run-lamp@v1.11.12 seed.json:4 |
| Orbit | v0.4.5 → v0.4.6 | 9e7f46ce42c6bde7c5f29a6ab7cdb07e82978c8f | run-orbit@v0.4.6 seed.json:4 |
| Spool | v0.7.5 → v0.7.6 | 2e12affd54e9b3bfe759e0eaec60906e3548f876 | run-spool@v0.7.6 seed.json:4 |

Each version is changed in src/data/seed-pages.ts and generated public/data/listings.json; scripts/seeds-sync/state.json records its matching tag, commit and copy hashes. The sync also clears prior seen-copy keys for HappyToHelp/Lamp and records this round's reported copy keys; these are sync bookkeeping, not product or contract judgments. No other product fields change. The product patch is product.diff.

## Fresh Release qualification

The following non-draft, non-prerelease GitHub Releases were read fresh through gh api. Each carries an asset named `rer-release.dsse.json`; releases.json retains the complete selected metadata. **Envelope-asset presence was established; its signature was not verified.** No bare tag was used as release authority and no seed changed released/coming-soon status.

- Uptime v0.5.6, published 2026-11-11T18:44:41Z: https://github.com/just-every/run-uptime/releases/tag/v0.5.6
- Orbit v0.4.6, published 2026-11-11T18:56:11Z: https://github.com/just-every/run-orbit/releases/tag/v0.4.6
- Lamp v1.11.12, published 2026-11-11T19:26:45Z: https://github.com/just-every/run-lamp/releases/tag/v1.11.12
- Spool v0.7.6, published 2026-11-11T19:58:17Z: https://github.com/just-every/run-spool/releases/tag/v0.7.6

## Copy provenance and deliberately preserved items

`npm run seeds:sync -- --copy-only --apply` initially reported nothing changed. Its flag updates only copy provenance, preserving wording, brand and home observations. The full apply imported exactly the four eligible versions. A second provenance-only apply at the new displayed versions reported Uptime/Lamp/Spool README.md + seed.json changes and Orbit seed.json changes. The new seed.json files change only versions. Lamp/Spool README changes update release references; Uptime README changes its practice-target/setup instructions and removes stale CLI-pin prose, none of which JE repeats. All four CONTRACT.md files are byte-identical across the released boundaries. COPY-REVIEW.md contains full source-file hashes, complete diffs and precise clause-row citations. No public claim was proved false, so no wording was changed.

Deliberately retained existing follow-ups: Terrace's reconciliation wording (released ACCT-001/ACCT-006 are done, CONTRACT.md:546/:551); HappyToHelp's eight partial-evidence promises; Uptime STATE-001/NETWORK-001; Lamp INTAKE-002, INCIDENT-004, UPDATE-008, NOTIFY-009, PAGE-006, NOTIFY-004, MOVE-002 and SUB-006. These implementation evidence gaps are unchanged and do not by themselves justify changing accepted copy. No source contract status was promoted. Auth stays coming soon under its owner override. Other coming-soon sources remain HEAD observations; **no new unreleased copy drift was reported or imported**. RER inventory gaps remain outside this write scope; no JE version was reduced and no RER work was started. There were no new eligible updates deliberately withheld.

After listing generation/check and the second provenance apply, the final full dry sync reported **`Dry run: 0 of 49 seeds changed.`** All 49 sources remain readable and there are no unexplained findings. dry-final-report.md/json contain the complete final refs and zero-finding result.

## Checks and browser proof

Passed: npm ci; initial full dry sync (after the missing Playwright install); both provenance-only applies; full mechanical apply; npm run listings; npm run listings -- --check; final full dry sync; npm run type-check; npm run lint; npm run build; npm run brand -- --check; git diff --check; scope, public-copy, count, excluded-slug, identity and credential-shape checks. No permanent tests, full local test suite or weakened checks were introduced. The initial production build's middleware deprecation warning did not prevent success.

Eight screenshots in screens/ show the four changed version sections once at 1440 and once at 390. Version and desktop overflow assertions run only at 1440, as requested. browser-receipt.json records the widths and pages. The first browser attempt timed out waiting for network idle; rerunning after document load succeeded. All browser contexts closed and only the recorded local proof-server PID was stopped. This is candidate proof; the lane's live production verification remains separate.

Changed paths are exactly public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts. All accepted public prose, prices and art are unchanged. public/brand.json remains sha256 `a54bb68daa5f1590e5a6eaafecf38c627e42fa014f65c0d7efaf81bee809b7a4`.

## Product publication and CI custody

Commit and committer: Run Edit Run fleet <fleet@runeditrun.com>. All candidate commits (including side-parent traversal) and full messages were checked; no co-author trailer is present. The commit was rebased onto freshly fetched main before first publication; main was unchanged. The fleet push guard published the named branch on its first transport attempt. PR #44 targets main. No published history was rewritten.

Exact-SHA Verify branch run: 43105519553, https://github.com/just-every/home/actions/runs/43105519553.
Latest observed status: **completed / success**, head `393067c8e694cb7d088fd44685a9d4dd37b0ae9d`. One watcher observes the same run using REST, with at least 300 seconds between calls including discovery. CI receipts are retained verbatim as JSON. READY is claimed only after completed/success on this exact candidate.

## Evidence return and remaining custody

REPORT.md, PLAN.md, RECEIPT.json, the actual tool reports, release metadata, source review, local check logs, browser proof and product provenance are kept in this packet and published only to refs/heads/evidence/je-sync-20 through the task-side report entrypoint. Evidence publication is separate from product readiness or landing. No evidence enters the product branch or a PR tree. The clone and node_modules will be deleted only after successful product publication and verified evidence transfer, as requested. No blocker is currently known; pending CI is not a builder failure.
