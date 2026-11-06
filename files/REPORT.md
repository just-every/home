# je-gate-18: independent deciding gate for PR #34

Verdict: GATE PASS. Candidate `cloud/je-sync-10` at `fe5213e28a8b55c83c3ee02277fa980ca9eafc22` may land subject to the lane's existing publication scan and landing custody. This gate made no product changes, product commits, product pushes, PR comments, merges, deployments or provider calls. Evidence publication is separate report-only transport.

Repository: just-every/home. PR: https://github.com/just-every/home/pull/34.
Baseline main: `3d6df7dcc63b57cb5eb4e231cd35dcccb934a081`.
PR head was checked at entry and again at completion; both match the assigned candidate, and the PR remains open. The fresh shallow clone checked out the exact candidate detached, preserving origin/main for comparison. Local `cloud/je-gate-18` was created from main as requested by the cloud wrapper; it has no product changes and was never pushed.

## Completed plan

1. Set the required fleet Git identity, read the launcher refresh script, refresh the launcher, install the task-side Git helper, and read launcher/repository instructions. Use only the injected fleet credential for GitHub. The cloud environment runtime skill supplied network-policy guidance; no provider credentials were used.
2. Read PR #34 once at entry and Verify run 42294583588 once. Clone only just-every/home shallowly, fetch pull/34/head, pin the exact assigned SHA, and preserve baseline main.
3. Compare every changed path and JSON field, enumerate all candidate commits including side parents, inspect identities and trailers, and scan the changed diff for credential-shaped values.
4. Read the repository's actual source-selection, copy-hashing, copy-detection, homepage-finding and apply code. Batch public seed repository reads through `gh api graphql`; verify referenced commit existence, public visibility, default HEAD or peeled release tag, and all copy hashes. For Strap's large CONTRACT.md, use a separate raw REST read because GraphQL text was truncated to 512000 bytes of 522107. No other seed repository was cloned or written.
5. Run `npm ci`, the listings check, listings regeneration, type-check and lint on the exact candidate. Exercise the actual copyHashes/detectCopy functions on full source bytes for the seven touched entries; compare baseline and candidate state without applying updates. Inspect Terrace's removed finding against the existing state and released copy.
6. Confirm counts, exclusions, unchanged public/src trees and pricing, and a clean checkout. Check whether source-lock, contract-view and migration-ledger commands apply. Recheck the PR head, retain actual non-secret reports and receipts, publish them only on evidence/je-gate-18, verify the transfer, and delete the disposable clone and node_modules.

## Frozen rubric results

| Row | Result | Command / observation |
| --- | --- | --- |
| R1 Scope | MET | `git diff --name-status 3d6df7dcc63b57cb5eb4e231cd35dcccb934a081 HEAD` returns only `M scripts/seeds-sync/state.json`. JSON delta is 14 leaf changes: syncedAt, six commit/hash pairs, one removed Terrace open list. `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"` enumerates one candidate commit: fleet author and committer, no trailers. No test changed or disappeared. Credential-shaped diff checks found no token, private-key, credential URL, AWS key, provider secret or secret assignment. |
| R2 Provenance truth | MET, with a pre-existing copy inconsistency recorded below | Batched `gh api graphql --input /tmp/je-gate-sources-query.json` and raw `gh api repos/just-every/run-strap/contents/CONTRACT.md?ref=ceba5960cbe5ddc323624eb128280ce241f59e72 -H 'Accept: application/vnd.github.raw+json'` read actual public source. All seven commits exist; all 21 truncated SHA-256 copy hashes match; all six coming-soon HEAD refs match. Terrace's annotated v0.1.4 tag peels to its recorded SHA. Repository copyHashes/detectCopy reproduce 6 -> 0 copy findings for the touched entries. All six stay coming soon; no JE wording was imported. Terrace's removed notification is explained below; this result does not claim all legacy Terrace detail copy is accurate. |
| R3 Public data unchanged | MET | `npm ci` exit 0; `npm run listings -- --check` exit 0, “Listings current (49 seeds)”; `npm run listings` exit 0, “Listings unchanged (49 seeds)”; `npm run type-check` exit 0; `npm run lint` exit 0. `git diff baseline HEAD -- public src` is empty. After regeneration `git status --porcelain` is empty. Listings remain 49 = 35 released + 14 coming soon; all eight excluded slugs are absent. All pricing/served source bytes are unchanged. |
| R4 Exact-head CI | MET | `gh api repos/just-every/home/actions/runs/42294583588 --jq '{id,name,event,status,conclusion,head_sha,head_branch,html_url,run_started_at,updated_at}'` returned completed/success for Verify branch, push event, cloud/je-sync-10, exact assigned SHA. Read once; no dispatch, rerun or watcher. https://github.com/just-every/home/actions/runs/42294583588 |

The local runtime was Node v24.19.0; the repository specifies no Node/packageManager pin. The existing Verify workflow uses Node 22 and succeeded on the exact head. Production build and browser proof were not run, as the frozen rubric explicitly excludes a build for this provenance-only change and no served/UI file changed. The regression comparison is byte identity for all public/src files.

## Parsed state delta and per-seed source proof

syncedAt changes from `2026-11-05T21:20:03.417Z` to `2026-11-06T21:06:54.134Z`.
For each of Auth, Crank, Mallet, Placemat, Satchel and Strap, only commit and copy.CONTRACT.md change. README.md and seed.json hashes, sourceRef, sourceReason, tag, brand, mark, home and all other fields stay identical.

| Seed | Before commit | After commit | CONTRACT.md hash before -> after |
| --- | --- | --- | --- |
| Auth | `f07f60e355bc518ab3e2487350002811e78b1290` | `d55816c1f0e6b66f12d0c2846fdba6cf22965251` | `d89f2f7cf29804ec` -> `efe84cf61df4d449` |
| Crank | `e2c146dc38eb64e685cf01d2c56e798404b3936e` | `c16d7b09492b2c61c4cbfb4c0f892be6b0e9c1ef` | `aac2d3d2ae3f5062` -> `e3dec2a78eefc328` |
| Mallet | `b5656076d025dcd521173057070e5f8fd3b5ff29` | `1331aef49644cea21ff44371ae4d7218bb588646` | `bb2b29175f71a418` -> `06599a1925257db8` |
| Placemat | `9e6bb6147a834849683f30973a45a814a0ee0139` | `7736720683b5d4d9236cecf9434a64b3ed84a61e` | `f98f316649ad03f6` -> `8670c33f798e4707` |
| Satchel | `798b3b2110cdeddb82f4772d6860d9650df3f695` | `2e07928ffcf1061422b85ce066b54dbe08e1e6c3` | `bb45a7b8c3952de2` -> `fd03cc85b0953a2b` |
| Strap | `5bc1e11b32150892809e3d81d525e46e506233cb` | `ceba5960cbe5ddc323624eb128280ce241f59e72` | `18190d4e4a36f7a5` -> `de176ce40493ca6d` |
| Terrace | `0afcac8b3a42c23d984078e6ff90e928c9ebc22f` | unchanged | `98fbe43b4ddadbb8` unchanged; only open `["c47278a1546d"]` is removed |

| Seed | Source ref | Verified source commit | Computed CONTRACT.md hash | Result |
| --- | --- | --- | --- | --- |
| Auth | `HEAD` | `d55816c1f0e6b66f12d0c2846fdba6cf22965251` | `efe84cf61df4d449` | Public default HEAD matches; all 3 hashes match; stays coming soon. |
| Crank | `HEAD` | `c16d7b09492b2c61c4cbfb4c0f892be6b0e9c1ef` | `e3dec2a78eefc328` | Public default HEAD matches; all 3 hashes match; stays coming soon. |
| Mallet | `HEAD` | `1331aef49644cea21ff44371ae4d7218bb588646` | `06599a1925257db8` | Public default HEAD matches; all 3 hashes match; stays coming soon. |
| Placemat | `HEAD` | `7736720683b5d4d9236cecf9434a64b3ed84a61e` | `8670c33f798e4707` | Public default HEAD matches; all 3 hashes match; stays coming soon. |
| Satchel | `HEAD` | `2e07928ffcf1061422b85ce066b54dbe08e1e6c3` | `fd03cc85b0953a2b` | Public default HEAD matches; all 3 hashes match; stays coming soon. |
| Strap | `HEAD` | `ceba5960cbe5ddc323624eb128280ce241f59e72` | `de176ce40493ca6d` | Public default HEAD matches; all 3 hashes match; stays coming soon. |
| Terrace | `v0.1.4` | `0afcac8b3a42c23d984078e6ff90e928c9ebc22f` | `98fbe43b4ddadbb8` | Peeled v0.1.4 matches; all 3 hashes match. |

The receipt source-provenance.json contains all three copy-file hashes, blob IDs, source-commit URLs, public visibility, tag targets and default HEADs. copy-detector-receipt.json contains the actual detector findings before and after. This is a source-copy detector probe over seven touched entries, not a claim to have repeated the full 49-homepage sync. Six unreleased CONTRACT.md changes remain withheld from JE wording. Auth's existing v0.1.0 tag does not promote it; it remains coming soon. No release, version, mark, colour, status, wording, pricing or JE contract clause changed.

## Terrace's removed finding and released copy

The exact removed key is reproducible with the repository's key algorithm:

`sha256('homepage:headline changed: "Rent in. Repairs done. Owners paid." -> "Rent in. Repairs done. Owners informed."').slice(0,12) === 'c47278a1546d'`.

The baseline main commit had already recorded `home.headline = "Rent in. Repairs done. Owners informed."`; the candidate keeps that value unchanged. Thus this is an old headline-transition notification, not an unresolved copy-hash finding. The next comparison sees the same recorded headline and the old headline transition no longer occurs. Clearing this notification is mechanically warranted; it does not establish that someone rewrote every detail-page claim.

Terrace's sourceRef/tag stay v0.1.4. Its annotated tag `88326407ecfd18240bdf6cccc443bceeb8e32156` peels to `0afcac8b3a42c23d984078e6ff90e928c9ebc22f`, not today's newer default HEAD. All three source-file hashes remain correct. The released README lines 5–7 describes recorded rent and owner statements and expressly says the release does not collect rent, hold/move funds, reconcile a trust account, screen applicants or publish listings. Released seed.json describes tenancy, recorded rent, photographed inspections and reviewed maintenance, and lists trust accounting/money movement and rent collection/screening/listings as non-goals. JE's unchanged public listing line in src/data/seeds.ts:840 describes “Tenancies, recorded rent, photo inspections and maintenance for landlords.” It agrees with that released scope and does not claim owners are paid. The published core CONTRACT clauses TER-004 and TER-006 explicitly distinguish external recorded receipts and rent receivables from collection, trust, distribution or tax statements.

OUT OF SCOPE D: JE's pre-existing Terrace detail summary and some “does” bullets in src/data/seed-pages.ts:3724 still claim rent collection, listing syndication, trust/bank reconciliation, owner transfers and incumbent move-in. The v0.1.4 README lines 5–7 and seed.json nonGoals contradict those broad current-product claims; CONTRACT TER-004/TER-006/TER-009 distinguish the shipped core, and MOVE-002/MOVE-003/MOVE-011 remain missing in the release status table. Trigger: a visitor reads the Terrace detail page. New: none; the entire src/data/seed-pages.ts blob is byte-identical on baseline and candidate. This is a pre-existing copy inconsistency, recorded under Out of scope in FOLLOW-UPS.md; it does not block this provenance-only change. No security, money operation or data-loss behavior was introduced.

The gate does not equate clearing the old headline key with correcting that inherited detail copy.

## Independent evidence and applicability

- Source-lock regeneration/check: not applicable. The exact product tree has no sources.lock.json or documented source-lock command.
- Generated contract-view write/check: not applicable. There is no root CONTRACT.md, ACCEPTANCE.md or docs/CLAIMS.md and AGENTS.md declares no Lander-Regenerate command. No views were generated or committed.
- Migration-ledger check: not applicable. AGENTS.md/package.json document no such check and the candidate touches no migration.
- Public-door probes for the builder's five points, restricted to the frozen rubric: fresh clone/instructions/source boundary read; actual public source ref/hash proof and six coming-soon holds; no promotion/version/art changes by exact tree comparison; listings check/write with no diff and 6 -> 0 touched-copy detector findings; exact-head type-check/lint and CI success. No broad source/homepage campaign, full suite or production build was added to the gate.
- Incumbent: the JE repository has no CONTRACT.md Product target table naming an incumbent for this sync behavior. No new incumbent bar is invented.
- Standing bars: exact-SHA Verify success; no changed/deleted/skipped/weakened tests; no introduced security, money or data-loss surface. No A, B or BAR finding.
- Full Mac publication scan remains in the lane's existing landing custody, as the builder brief states. This cloud did not push a product or claim that scan ran.

## Counts, status and custody

Before/after listings: 49 -> 49 total; 35 -> 35 released; 14 -> 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. All served/source files, including pricing presentation, are byte-identical to baseline.
Before/after touched copy findings: 6 -> 0 (seven touched entries inspected); Terrace's old open headline notification: 1 -> 0.
Clause status changes: none. Blocking findings: 0. C follow-ups: 0. One D observation is recorded without changing the verdict.
GitHub API/CLI calls: 5 total: PR at entry, exact-head Verify read, batched public-source GraphQL, Strap raw CONTRACT.md, PR at completion. No workflow logs were needed. Git clone/fetch/evidence transports are ordinary Git, separate from those five API calls.
No blocker. No new PR or product READY/PUSHED claim belongs to this report-only gate. The candidate's existing PR is #34 and the only CI run observed is 42294583588.

## Actual packet

REPORT.md; gate-receipt.json; source-provenance.json; copy-detector-receipt.json; local-checks.json; pr.json; pr-final.json; verify.json; candidate-identities.txt; candidate.diff; npm-ci.log; listings-check.log; listings-write.log; type-check.log; lint.log; FOLLOW-UPS.md; LANDING-NOTES.md.
These files contain actual results and public-source metadata, no credential values or environment dumps. Public source contracts and the private brief/rubric itself are not included in the packet. The packet is retained outside the clone at $HOME/rer-consolidation/work/je-gate-18/packet/.
