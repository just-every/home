# je-gate-29 — independent deciding gate of JustEvery PR #45

Decision: **PASS**, zero blocking findings and zero new follow-ups, for `fa1c59e71759a7f959e106e8102ff4c7edd76a55` on `cloud/je-sync-21`.

PR: https://github.com/just-every/home/pull/45. Baseline main: `66fa2fe27a8837a94676fc6515acba517ddee867`. Git and the opening PR API read agreed; the closing PR API read still reports the identical head and base, open and unmerged. This gate fixed nothing, created no product commit, pushed no product ref, and did not comment, merge, deploy or use provider credentials. `cloud/je-gate-29` was created locally at baseline to satisfy cloud setup; the reviewed checkout is the frozen candidate, detached. Report transport is separate on `evidence/je-gate-29`.

## Full executed plan

1. Configure the fleet Git identity, refresh the launcher, read its AGENTS.md, install bundle-only Git authentication, and create a fresh shallow filtered clone of the declared repository. Install the prescribed local commit hooks, read repository AGENTS.md, package scripts, sync documentation and implementation, and the inline builder/rules references. Use GitHub only through bundle-authenticated gh for API reads; no other repository was cloned.
2. Resolve main, fetch PR #45, verify the frozen PR head/base, and inspect the entire candidate diff and every candidate commit, including side-parent coverage. Check permitted paths, test preservation, identity/trailers, credential-shaped additions, data equality and provenance-only state changes.
3. Independently read Uptime Releases once, resolve the annotated release tag, read its tagged CONTRACT.md and seed.json, verify state hash prefixes/version/ref/commit, and verify the deliberately withheld HappyToHelp release's HTTP 404.
4. Run npm ci, listings check/write and clean-diff verification, type-check, lint and a production build on the exact candidate. Use its real `/uptime` route through Chromium. Assert version/layout/errors at 1440 and capture the changed screen at 1440 and 390.
5. Inspect exact-SHA CI once through REST. Build and serve baseline main on the same VM/dependencies, inspect the same route at the same sizes, compare the screenshots and rendered text, then return to the frozen SHA and verify the source tree is clean.
6. Recheck the PR prerequisite, score the five frozen rows, save the actual non-secret report/receipts/logs/proof in the packet, publish only the explicit report files on the evidence ref, then remove the checkout and node_modules. No product READY or landing claim is made by evidence publication.

## Frozen rubric results

| Row | Status | Command and result |
| --- | --- | --- |
| R1 Scope | MET | `git diff --name-only origin/main HEAD`, full `git diff origin/main HEAD`, `git diff --check origin/main HEAD`, and `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`: exactly the three named paths, one candidate commit, fleet author and committer, no trailers, no test modification/deletion, and no credential-shaped added value. Detailed hunk explanation below. |
| R2 Promotion truth | MET | `gh api 'repos/just-every/run-uptime/releases?per_page=100'`, tag-ref/tag-object reads, and independent JSON/tree comparison: v0.5.7 is a real non-draft, non-prerelease Release with `rer-release.dsse.json`. The three files agree and no other seed's version/status or public wording changed. HappyToHelp v0.4.22 Release read returned HTTP 404 and the listing remains v0.4.21. |
| R3 Public data/render | MET | `npm ci`, `npm run listings -- --check`, `npm run listings`, `git diff --exit-code`, `npm run type-check`, `npm run lint`, `npm run build`: all completed successfully. Generator says current/unchanged, 49 seeds. Chromium on production `/uptime`: HTTP 200, v0.5.7 at 1440/390, no page errors or horizontal document/body overflow; assertions at 1440. Main comparison is unchanged apart from the version. Pricing preservation is a tree-diff result: the pricing-bearing surface was not altered; the Uptime page itself does not display Assisted/Managed prices. |
| R4 Exact-head CI | MET | `gh api 'repos/just-every/home/actions/runs?head_sha=fa1c59e71759a7f959e106e8102ff4c7edd76a55&per_page=100'`: push Verify branch run **43171250875**, completed/success, exact frozen SHA. PR Verify **43171318486** skipped by its cloud-branch condition; dynamic PR run **43171315415** success. No workflow dispatch/rerun and no additional CI polling. |
| R5 Claim honesty | MET | Read tagged `CONTRACT.md` and `seed.json` with gh contents API; compare hashes with state and JE page copy. All ten promise clause statuses reviewed. Eight are done; STATE-001 and NETWORK-001 remain partial because of evidence/assertion gaps. No newly false public claim established by the released source; wording is byte-for-byte preserved. |

There were **9 gh API invocations**, including the expected release 404 and the closing PR check, within the ten-call budget. No workflow was pending or red, so no watcher or failed-log retrieval was needed.

## Every hunk explained

- `public/data/listings.json`: `generatedAt` moves from 2026-11-11T21:39:35.441Z to 2026-11-12T06:45:51.234Z; Uptime's version alone moves v0.5.6 → v0.5.7. All listing keys, wording, statuses and remaining versions are identical.
- `src/data/seed-pages.ts`: precisely one version literal changes, in Uptime's entry. Replacing that version in baseline yields the complete candidate file, confirming no wording changes anywhere in that file.
- `scripts/seeds-sync/state.json`: `syncedAt` advances. Uptime's copy commit changes `65953b2f1288fb5010f17391761abeee16923793` → `a715d2188b5d38cc563465292bc8c461b93c6528`; sourceRef/tag change v0.5.6 → v0.5.7, sourceReason remains "released listing version". Only the seed.json copy hash changes, `6b442dcadd723598` → `050aee15381cb711`; CONTRACT.md and README.md hashes are unchanged. The independently read tagged CONTRACT.md and seed.json match the stored SHA256 prefixes.
- State open-copy bookkeeping: Lamp and Spool lose `42983364b373`, Orbit loses `64cb07f6a0dd`, and Uptime changes `42983364b373` → `64cb07f6a0dd`. Reading `detect/copy.mjs`, `keyOf` and `closeRecord` and recomputing the hashes identifies these as "README.md, seed.json changed since the last sync" and "seed.json changed since the last sync" respectively. They are source-review finding markers, not acceptance judgments or page wording. Brand tokens, marks, home text/fingerprints and all other provenance remain identical.

## Source truth and before/after

Uptime Release: https://github.com/just-every/run-uptime/releases/tag/v0.5.7, published **2026-11-12T06:17:12Z**, draft=false, prerelease=false. Envelope asset name `rer-release.dsse.json`, asset id 738316779, size 3361 bytes. **Asset presence was checked; no signature verification is claimed.** Annotated tag `88959316ab47c342db0ac6ec636958321624d7ed` resolves to commit `a715d2188b5d38cc563465292bc8c461b93c6528`, matching state. Tagged seed.json identifies Uptime version 0.5.7.

| Item | Before | After |
| --- | --- | --- |
| Listings total | 49 | 49 |
| Released | 35 | 35 |
| Coming soon | 14 | 14 |
| Uptime | v0.5.6 | v0.5.7 |
| Lamp | v1.11.12 | v1.11.12 |
| Orbit | v0.4.6 | v0.4.6 |
| Spool | v0.7.6 | v0.7.6 |
| HappyToHelp | v0.4.21 | v0.4.21 |
| Oncall | v0.5.8 | v0.5.8 |
| Clause status changes | none | none |
| Tests modified/deleted | 0 | 0 |

Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent. No coming-soon copy was imported. No price was changed, added or removed; the standing Assisted US$10/month / Managed US$100/month preservation condition introduces no new price edit in this candidate. No provider or billing-country/GST flow was exercised or changed.

## Claim review, incumbent and existing context

The tagged source's Product target names Pingdom, UptimeRobot, Better Stack Uptime and Site24x7 as incumbents. For this listing-promotion behavior the bar is accurate release identity, truthful retained claims and an intact public product page. This gate does not add a new monitoring feature comparison or a new obligation beyond the frozen rubric.

Reviewed promise clause statuses at v0.5.7: EVIDENCE-001, NOTIFY-001, DELIVERY-001, DRILL-001, TLS-001, MAINT-001, ARCHIVE-001 and ERASURE-001 **done**; STATE-001 and NETWORK-001 **partial**. CONTRACT.md status counts are 37 done, 58 partial, 20 missing, total 115; the candidate changes none of them.

Existing, unchanged sentences under the two known partial-evidence promises:

- STATE-001: "One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks."
- NETWORK-001: "Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected."

The tagged requirements state those behaviors; status gaps describe missing assertions in cited files, not source statements disproving the behaviors. Under R5, partial evidence alone is not a new false-claim finding. The two sentences and their statuses are already named as known context in the brief and are not counted as new follow-ups. HappyToHelp, Terrace, Lamp and Spool's pre-existing copy follow-ups remain unchanged; their pages are outside this version-only touched surface.

## Independent evidence and limits

- Builder point 1/source review: independently resolved the promoted release/tag/commit and reviewed committed sync state and detector semantics. Builder point 2/copy: independently checked source hashes and complete public-text equality. Builder point 3/mechanical update: checked release eligibility, three-way version agreement, all other listing values, exclusions and no copy import. Builder point 4/generated public data: independently ran listings check/write, proved no diff, and checked withheld release 404. Builder point 5/validation: independently ran type-check/lint/build and the real production public door.
- The network-wide 49-repository builder sync was not repeated. It is not a frozen gate row, invokes Git reads of other repositories (cloud scope permits gh API only there), and would exceed the ten-call budget. No dry-sync output is invented or adopted as independent evidence.
- Source-lock regeneration/check, contract-view write/check and migration-ledger check are **not applicable**: this JE repository has no CONTRACT.md, sources.lock.json, contract-docs generator or migration-ledger checker. AGENTS.md documents the standard Next build. No such unprovided tool was invented. The applicable generated surface is listings, which passed independent write/check with zero diff.
- The Mac publication scan and landing/deployment remain with the fleet. This gate's R1 scan covers the entire candidate diff and all candidate commit identities/trailers, and the evidence packet is explicitly selected for public report transfer.
- Head and baseline production builds both exit 0. Actual screenshots and browser JSON receipts are retained at both widths. Their rendered body text is identical after the single version substitution; screenshots show the same layout and no break. The 390 capture is observation/proof, with behavioral assertions at 1440.
- The initial browser harness used networkidle, which timed out on ongoing gallery media. Two subsequent probe assumptions looked for an unused data headline; the renderer actually shows the seed's line. The final probe uses document-ready/fonts-ready and checks the named version/layout conditions; no application code or permanent test was edited. This is probe correction, not a product failure.
- The prescribed fleet hook symlink encountered Husky's relative `h` lookup during the main/head checkout. Both intended SHAs were selected and verified, and the tree stayed clean. A local wrapper now invokes that repository hook at its original path. No product hook changed and no commit hook was bypassed.

No reproduced A, B or BAR issue; no new C finding. FOLLOW-UPS.md contains no new work. LANDING-NOTES.md records nonblocking custody/process notes. All owned live browser/server processes were stopped. node_modules is removed before evidence publication; the remaining clone is removed after the evidence transfer. Reports remain under the fleet work packet.
