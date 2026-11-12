# je-gate-32: PR #48 may land

Decision: **GATE PASS** on `e971bef20b72603b026c871bc32a4d3fd6b45491` (`cloud/je-sync-24`, https://github.com/just-every/home/pull/48). No blocking finding and no new C follow-up. All frozen rubric rows R1–R5 are MET. No clause status changed, and no product change was made by the gate.

Baseline main is `1bc79fecf2ded7323c7047836f1046398cd0ef21`. Both initial and final PR REST reads confirm the exact requested head and that exact base; PR remains open and unmerged. The fresh shallow clone retained baseline main and fetched `pull/48/head`; checks ran on the requested detached candidate, with a temporary baseline checkout solely for the same-route render comparison. The candidate was restored clean before evidence publication. The local `cloud/je-gate-32` bookkeeping branch starts at baseline main and was never pushed; it is not a candidate product branch.

## Plan and execution boundary

The full pre-check plan is in PLAN.md. The executed sequence was: establish exact PR/base; inspect all diff hunks, identities and added values; independently read the eligible release/tag and tagged copy sources; install dependencies and check/regenerate public listings; type-check, lint and build; serve the real production `/uptime` route and public listings at 1440, capture at 1440 and 390; build and inspect the same route on main; review tagged contract status versus unchanged JE copy; read exact-head CI once; preserve report/receipts and publish only the separate evidence tree. No fixes, new permanent tests, sync application, product commit, product push, PR comment, merge, deployment, workflow dispatch/rerun, provider credential use, scheduler, broad kill or owner installation access occurred.

Only the declared home repository was cloned. Uptime source was read through `gh api`. GitHub auth reads only the injected fleet bundle through the authorized helper/command environment; credentials and environment dumps are not report material. Shell toolchain setup and long browser/server commands used the cloud subreaper. No Mac capacity polling applies in this dedicated VM.

## R1 — MET: exact scope, hunk explanations and identity

Commands: `git diff --stat origin/main..HEAD`, complete `git diff origin/main..HEAD`, `git diff --check origin/main..HEAD`, `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`, and `python3 ../audit.py` (script copied as data-audit.py). All checks passed. The candidate has exactly one incoming commit, authored and committed by `Run Edit Run fleet <fleet@runeditrun.com>`, with no trailers. No side-parent commit is omitted by the range traversal. There is no test, hook or workflow diff, so no test was deleted, skipped or weakened.

Exactly three changed paths, 15 insertions / 19 deletions:

- `public/data/listings.json`: generatedAt advances from `2026-11-12T17:02:07.783Z` to `2026-11-12T22:03:37.712Z`; Uptime version advances v0.5.8 → v0.5.9. Every other listing field is identical.
- `src/data/seed-pages.ts`: only Uptime's `version` property changes v0.5.8 → v0.5.9. Replacing that single token in the baseline makes the complete file byte-identical to head. No summary, does, promises, SEO or other wording changed.
- `scripts/seeds-sync/state.json`: syncedAt advances from `2026-11-12T17:02:02.549Z` to `2026-11-12T22:03:16.352Z`; Uptime copy-source commit moves `ed5429192d18503c4c8caa8d797d82ffdcc78f54` → `88c586f6fabdaed6768ddc8072af2340310a7ace`; sourceRef/tag move v0.5.8 → v0.5.9. Copy hashes change to CONTRACT.md `f6685342c00a3826`, README.md `ec45a6ff0815ba77`, seed.json `ae5eb94cbf16587c`; each hash was recomputed independently from that tag's actual API-read bytes and matched. `sourceReason` remains "released listing version". Open report markers are removed for Lamp (`c843303a1181`), Oncall (`c843303a1181`), Orbit (`922fed04eacf`) and Spool (`42983364b373`); Uptime's marker changes `42983364b373` → `c843303a1181`. No other state field changes.

`detect/index.mjs` defines `open` as SHA-256-derived identifiers of un-applied detector findings; `closeRecord()` replaces the full-sync open marker list. `detect/copy.mjs` reports changed source hashes and never applies wording; `apply/index.mjs` likewise documents copy preservation. These state edits are source provenance / report bookkeeping, not promotion of contract implementation status or edits to public copy, brand tokens or homepage observations.

Manual review covered every hunk. Added-line credential-shape checks covered provider tokens, private-key headers, credential-bearing URLs, AWS access keys and secret assignments: zero matches. The state hashes are provenance hashes, not credentials. This is diff hygiene, not a claim that the cloud ran the Mac's full publication scan.

Evidence: candidate.diff, commit-identities.txt, diff-check.log, data-audit.json.

## R2 — MET: release and version truth

Source commands (credential-free command descriptions):

- `gh api 'repos/just-every/run-uptime/releases?per_page=100'` — one releases read, retaining the relevant v0.5.9 entry.
- `gh api repos/just-every/run-uptime/git/ref/tags/v0.5.9`
- `gh api repos/just-every/run-uptime/git/tags/9cc2d34b3371518dd30541bb79c4e4f9d881c565`
- `gh api 'repos/just-every/run-uptime/contents/CONTRACT.md?ref=v0.5.9'`, and corresponding README.md and seed.json reads.

Uptime release https://github.com/just-every/run-uptime/releases/tag/v0.5.9 is non-draft and non-prerelease, published `2026-11-12T18:01:29Z`, release id `443324890`. Its assets include `rer-release.dsse.json` (3361 bytes). This proves envelope asset presence only; the signature was not downloaded or verified, as the rubric does not require signature verification.

Tag v0.5.9 exists as annotated tag object `9cc2d34b3371518dd30541bb79c4e4f9d881c565`, whose target commit is `88c586f6fabdaed6768ddc8072af2340310a7ace`. That target agrees with state provenance. Listings, page data and state all identify v0.5.9.

Comparison of all 49 public listing records proves the sole semantic change is Uptime's version. No other seed's version/status changed; HappyToHelp stays v0.4.22. All coming-soon public records and their copy source files are unchanged. No coming-soon copy, release-status promotion, mark, colour, still or gallery material was imported.

Evidence: release.json, uptime-tag.json, uptime-tag-target.json, the three tagged source files and data-audit.json. Builder evidence was not used as proof.

## R3 — MET: independent generation, public data and real built render

Commands and observed results:

| Command | Result |
| --- | --- |
| `npm ci` | exit 0, 726 packages installed; prepare ran Husky |
| `npm run listings -- --check` | exit 0, `Listings current (49 seeds)` |
| `npm run listings` | exit 0, `Listings unchanged (49 seeds)` |
| `git diff --exit-code` after generation | exit 0, no product diff |
| `npm run type-check` | exit 0 |
| `npm run lint` | exit 0 |
| `npm run build` on candidate | exit 0; production `/uptime` route generated |
| `cloud_run node ../browser/probe.mjs candidate` using content readiness | exit 0 |
| `npm run build` on baseline main | exit 0 |
| `cloud_run node ../browser/probe.mjs baseline` | exit 0 |
| Final candidate checkout, status and diff checks | exact requested head restored, clean |

Before and after counts: **49 total = 35 released + 14 coming soon**. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent. Pricing/copy preservation: every tracked src file is byte-identical except Uptime's single version token. No pricing, GST wording or billing-country restriction was added. The literal Assisted US$10/month and Managed US$100/month statements are absent in both main and candidate tracked src; this report establishes unchanged presentation and does not claim those literal statements were displayed by this site.

The production build was served at loopback using the real Next server. Chromium `/usr/bin/chromium`, headless with `--no-sandbox`, used new disposable contexts and no owner/browser profile. `/uptime` is the real slug, not a mock route. At 1440 the probe asserted HTTP 200, Uptime heading, visible v0.5.9 version, no horizontal document overflow, no page runtime exception and agreement with the actual public `/data/listings.json`. At 390 it captured visual proof and observed v0.5.9; assertions remain at one width. Both screens were visually inspected, including full page and version area; no new clipping, overlap or layout break is present. Main displays v0.5.8 at the same version coordinates and dimensions. At each width the body text is identical after substituting that one version, and document width equals the viewport (1440/390). Both have zero pageerror events. Screenshots are not asserted pixel-identical: media/lazy artwork can be at different loading states.

The first harness attempt timed out at 30 seconds while waiting for `networkidle`; that log is retained. The successful probe waits for DOM, fonts and actual heading/version readiness, and pauses the real video for still evidence. No product change or fake route was used. Plain Node serving emits missing analytics D1 table and cache-binding diagnostics on **both main and head**; the static page renders successfully in both. These unchanged runtime diagnostics are not a release regression.

Independent-evidence applicability was checked in AGENTS.md, package scripts and tracked repository paths. Home has no `sources.lock.json`, source-lock generator/check, CONTRACT.md, generated ACCEPTANCE.md/docs/CLAIMS.md, Lander-Regenerate command or documented migration-ledger check. D1 SQL migrations exist, but none changed. Those conditional seed-specific checks are N/A; no stale-source refusal is evidenced. The applicable documented listings generator was independently run in check and write modes and wrote nothing. No full local suite or unrelated source sync was run, consistent with the frozen gate and ten-call API budget.

Evidence: npm-ci.log, local-checks.log, baseline-build.log, browser-probe.mjs, candidate/browser receipts and screenshots, browser-comparison.json, applicability.json.

## R4 — MET: exact-head CI

Command: `gh api 'repos/just-every/home/actions/runs?head_sha=e971bef20b72603b026c871bc32a4d3fd6b45491&per_page=100'` — a single discovery/read, no polling, dispatch or rerun.

- **Verify branch**, push run **43317092344**: completed / success, head `e971bef20b72603b026c871bc32a4d3fd6b45491`; https://github.com/just-every/home/actions/runs/43317092344 . This is the required green exact-head workflow.
- PR-triggered Verify branch **43317175223**: completed / skipped. The workflow explicitly skips cloud-branch PR jobs and relies on the push workflow; the skipped run is not the evidence of success.
- Dynamic PR #48 run **43317170078**: completed / success; supplemental only.

No red Verify was observed, so no failed shard rerun/log archive/main comparison was needed. Nine `gh api` calls total, including the final PR prerequisite reread; under the ten-call limit. No workflow watcher remains.

Evidence: ci.json, pr.json, pr-final.json, gate-receipt.json.

## R5 — MET: claim honesty within the touched Uptime listing

Read the actual tagged CONTRACT.md status table and JE Uptime summary, does, promises and public render. Incumbents named by that contract: Pingdom (SolarWinds), UptimeRobot, Better Stack Uptime and Site24x7. This round synchronizes JE's release version; it does not introduce monitoring behavior or copy, and no incumbent feature outside the rubric was used as a new bar.

For the ten JE promise clause ids, v0.5.9 judges EVIDENCE-001, NOTIFY-001, DELIVERY-001, DRILL-001, TLS-001, MAINT-001, ARCHIVE-001 and ERASURE-001 done; STATE-001 and NETWORK-001 remain partial. Neither partial evidence judgment is, by itself, source proof that the corresponding public claim is false. The following exact unchanged sentences are the expressly pre-existing notes:

- STATE-001: "One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks."
- NETWORK-001: "Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected."

The tagged requirements and README describe the same intended confirmation/Unknown and validated-destination behavior; the partial status cells describe evidence gaps. No newly false JE sentence was established from this release's source. Existing HappyToHelp, Terrace, Lamp and Spool notes were not re-audited or converted into new findings. No clause status, evidence or gap cell was edited. New reportable follow-up count: zero.

Evidence: claim-review.json, uptime-contract-v0.5.9.md, uptime-readme-v0.5.9.md, data-audit.json, FOLLOW-UPS.md.

## Finding tiers, limitations and custody

No A, B, BAR or new C finding. The explicitly carried partial-evidence claims are D context, not a newly introduced defect. F/G evidence and local tooling notes are collected in LANDING-NOTES.md: absent literal pricing text on both revisions, initial browser wait timeout, identical plain-Node analytics/cache diagnostics, and the local Husky hook-path dispatch correction. None changes the product or blocks this candidate.

The Mac publication scan, merge, deployment and final live check remain with the fleet. This report is independent gate evidence; evidence publication does not itself signal product READY or landing. Only the report tree is published to `refs/heads/evidence/je-gate-32` through the task-side cloud_evidence.py entrypoint, with explicitly selected regular non-secret files and manifest hashes. No evidence is put on any product branch, main or PR. The full gate receipt is gate-receipt.json; source and browser receipts remain separate inspectable files. The clone and its node_modules are removed after successful evidence transport; the terminal response confirms cleanup. The first evidence transport was independently re-fetched and all 42 selected files matched their manifest hashes and local bytes; first-transfer-receipt.json records that check.

GATE PASS e971bef20b72603b026c871bc32a4d3fd6b45491
