# Done: je-sync-51 candidate

Author: Run Edit Run fleet. Recorded: 2026-11-19T18:03:55Z.

Repository: just-every/home. Product branch: cloud/je-sync-51.
Product head: ac2df502633ad0e49ecdefd46e42bbc907fce02e.
Base main: e54baedf55c3a4f01bf5daea7819fe509b6df3d9.
PR: https://github.com/just-every/home/pull/77.

The candidate updates Uptime v0.5.17 to v0.5.18, refreshes its released-copy provenance and regenerates listings. Counts before and after: 49 total, 35 released, 14 coming soon. No released-status promotion, contract change, clause status change or public claim rewrite. No test changes.

## Plan and result

PLAN.md records the full plan. Fresh shallow blobless clone; read AGENTS.md and committed seeds-sync implementation before installing. Locked npm ci passed. Sync was limited to the six paths because later seeds are paused until 25 Nov. No other repository was cloned. Ref transport used Git; repository content and Release metadata used gh api. No credential or environment dump is in this packet.

Initial dry run output: 2 of 6 seeds changed; Uptime newer tag v0.5.18 (page v0.5.17), Orbit newer tag v0.4.12 (page v0.4.11); 0 unreadable. There were no proposed mark, colour, status, homepage, still or copy changes. Uptime and Oncall still lack an alternative-to line detected by the tool; the existing incumbents were preserved. Full actual output and source refs are in dry-before.log and dry-before/report.md and report.json.

The first browser attempt in the initial sync failed to locate Playwright. Making the environment's installed playwright-core available in ignored node_modules resolved it; the actual failed log is retained, and subsequent dry and apply runs passed. No sync implementation or dependency manifest was edited. Fleet hooks were reinstalled after npm setup and dependency availability changes.

The six-path copy-only apply found 0 copy changes and preserved wording and art. Full apply mechanically attempted both tag bumps; Orbit was immediately restored to v0.4.11 before generation, commit or publication because its v0.4.12 tag has no published Release. The raw apply report is preserved without alteration, and this report states the eligibility correction. No Orbit v0.4.12 copy was accepted as released evidence.

A copy-only apply for newly displayed Uptime v0.5.18 recorded its README.md and seed.json changes. COPY-REVIEW.md documents the released-source comparison, row support and preserved claims. CONTRACT.md is unchanged between releases. No observed released-source change proves existing JE wording false. Coming-soon copy was not sampled or imported during the pause.

Listings generation and check passed. Final six-path dry output: 1 of 6 changed, solely Orbit v0.4.12 (deliberately withheld); 0 unreadable; the same two open alternative-to findings. No unexplained drift remains.

## Released refs and per-seed outcome

| Seed | Before | Candidate | Released source commit | Result |
| --- | --- | --- | --- | --- |
| Uptime | v0.5.17 | v0.5.18 | 52f77a94a0a675ba5e1be122dfe0c720087144fb | version and copy provenance updated |
| HappyToHelp | v0.4.31 | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | unchanged |
| Lamp | v1.11.23 | v1.11.23 | 199a635758939ab54b12f3a76dabeee68ab74b8f | unchanged |
| Orbit | v0.4.11 | v0.4.11 | a4fcbfcd72fa4253826f43d0b0de02275094f86d | v0.4.12 tag withheld |
| Oncall | v0.5.19 | v0.5.19 | 518317b385c4535599bfc670dd676da46069b451 | unchanged |
| Spool | v0.7.15 | v0.7.15 | bb2efcd34837cd6067d02ce176609d3fc636dad2 | public data unchanged; stale copy observation cleared by tool |

Uptime Release: https://github.com/just-every/run-uptime/releases/tag/v0.5.18, published 2026-11-19T16:34:45Z, non-draft, non-prerelease, rer-release.dsse.json present. Envelope presence only; signature verification was not performed. releases.json records this and the five unchanged latest published stable releases and their asset presence. orbit-release.json records release(tagName:v0.4.12) returning null.

Brand and homepage observations were read normally by the committed tool. brand-refs.txt records freshly observed default-branch refs; no brand asset or still needed importing. The state retains a fresh Uptime homepage fingerprint with a minor cell variation below the detector threshold, updates the released source hashes and records seen copy findings. No new logo, design, style or gallery was created or imported.

Fresh RER /data/seeds.json was matched by repository URL, not ids or generatedAt. It lists Spool as errors-workbench at 0.7.15, not omitted. All six versions agree except Uptime: RER 0.5.17, JE candidate 0.5.18. No downgrade was taken. RER's static generatedAt is 2026-11-15T13:56:34Z; the read versions, not that stamp, determine the comparison. See rer-comparison.json. Relay drift to gr.

## Withheld and preserved

- Orbit v0.4.12: bare tag, no published Release. Keep v0.4.11. No other newer eligible path release was found.
- Later and coming-soon seeds: paused until 25 Nov; no copy, brand or release-status changes imported.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent from the public catalogue.
- Uptime and Oncall missing alternative-to findings: pre-existing, no mechanical edit; keep existing incumbents. No new mark, colour or status follow-up was produced by this six-path run.
- Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), Spool ERR-006 (D): retained. No clause promoted or demoted; no CLAIM lines apply to this catalogue-only change.
- Pricing and accepted presentation remain Assisted US$10/month and Managed US$100/month; no GST or billing-country wording was introduced.

## Validation and custody

Only public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts changed. product.diff is the complete committed diff. npm ci, type-check, lint, production build, listings generation/check, final dry sync, whitespace, scope and credential-shaped diff review passed. CHECKS.json links actual logs and limitations. No full local test suite or rer verify was run; exact-SHA branch Verify owns the full suite.

The Uptime version facts were asserted at width 1440 and captured once at 1440 and 390; browser/receipt.json and both screenshots show v0.5.18 with no horizontal overflow. The initial browser proof navigation waiting for networkidle timed out; a DOM-content-loaded navigation with fonts settled succeeded. Local preview analytics emitted existing D1 table and Cloudflare cache diagnostics; no app API or analytics code was changed. Browsers closed and only the recorded server PID was stopped.

Fresh main fetch returned the original base. Main refresh/rebase completed before the first product commit and push. The repository's lint-staged hook and fleet co-author cleanup stayed active. All candidate commit identities and full messages/trailers were inspected; no co-author trailers were present. The guarded product push succeeded on attempt 1. main was neither pushed nor merged by this task.

The independent Sol high gate, Mac publication scan, PR merge, deployment and live verification remain with the lane. No cloud publication scan or deployed/live verification is claimed. There is no product blocker in the local checks. CI provenance and final observation are in the receipt files below; an in-progress run alone does not claim READY.

## CI

Initial exact-head observation at 2026-11-19T18:01:18Z: Verify branch run 44583257308 was in_progress on ac2df502633ad0e49ecdefd46e42bbc907fce02e, https://github.com/just-every/home/actions/runs/44583257308. One watcher; no re-dispatch and no poll sooner than 300 seconds. A final observation will be appended before evidence publication.

Direct task-managed GitHub calls so far: two batched Release/source GraphQL reads, one PR creation REST call, and one exact-SHA run discovery REST call. The required committed sync tool separately performs its built-in file reads through gh api on every invocation; those calls were not replaced by an adapter or ref API probes.

Final exact-head observation at 2026-11-19T18:06:32Z: Verify branch run 44583257308 completed/success on ac2df502633ad0e49ecdefd46e42bbc907fce02e. The REST discovery and this final poll were 314 seconds apart. No failed-job log download or workflow retry was needed. Direct task-managed GitHub calls: 5 total (plus the committed sync tool's built-in gh file reads).

Product is READY for the independent lane gates. Exact product SHA was confirmed advertised on cloud/je-sync-51. Evidence publication is separate custody, only to evidence/je-sync-51. The product clone will be deleted after successful evidence publication, preserving the packet and remote refs.
