# je-gate-61 independent deciding report

Author: Run Edit Run fleet. Completed assessment 2026-11-19T18:34:26Z.

Decision: PR 77 may land with one carried, nonblocking Uptime copy/evidence follow-up. Zero introduced A, B or BAR findings. R1, R2, R3, R4 and R5 are MET. No required row is NOT RUN. This is an independent decision on the frozen rubric, not a seed implementation audit or a release signature verification.

## Identity and prerequisites

- Repository: just-every/home; PR https://github.com/just-every/home/pull/77.
- Product branch: cloud/je-sync-51.
- Candidate: ac2df502633ad0e49ecdefd46e42bbc907fce02e.
- Baseline main / PR base: e54baedf55c3a4f01bf5daea7819fe509b6df3d9.
- One REST PR read confirmed open, non-draft, clean mergeability, exact requested head and base. Final Git ref reads also confirmed main, candidate branch and pull/77/head. The brief's stated base was already a full 40-character SHA and matches origin/main.
- Fresh shallow blobless clone; candidate checked out exactly. No application code, copy, test, contract judgment or PR was changed by the gate. No product commit or product push was made.
- The incumbent table in Uptime's tagged CONTRACT.md names Pingdom (SolarWinds), UptimeRobot, Better Stack Uptime and Site24x7. The touched behavior is catalogue release/provenance accuracy, not a new monitoring feature. No additional incumbent feature, provider journey or implementation audit was added to the gate.

## R1 — MET: scope, hunk explanations, identity and hygiene

Commands: git diff --name-only origin/main HEAD; git diff --stat origin/main HEAD; git diff origin/main HEAD; git log origin/main..HEAD with author/committer, full body and unfolded trailers; git rev-list origin/main..HEAD; independent credential-pattern scan of the candidate diff.

Result: exactly three paths, 12 insertions and 13 deletions. No test was changed, deleted, skipped or weakened. The one reachable candidate commit, including the traversal that would include side parents, has the permitted fleet author and committer and no trailers. The diff has no credential-shaped values. Addresses were checked in memory and omitted from packet files.

Every hunk:

1. public/data/listings.json: generatedAt moves from 2026-11-19T11:48:58.209Z to 2026-11-19T17:57:24.090Z; Uptime version changes v0.5.17 to v0.5.18. All other listing fields and all other listing objects are identical.
2. src/data/seed-pages.ts: Uptime version only, v0.5.17 to v0.5.18. No summary, capability, promise, incumbent, pricing or coming-soon wording changes.
3. scripts/seeds-sync/state.json: syncedAt moves from 2026-11-19T11:48:49.795Z to 2026-11-19T17:57:21.724Z. Spool's open array containing 42983364b373 disappears. Uptime's commit, sourceRef and tag advance to the published release; README.md and seed.json hashes update; one quantized homepage fingerprint nibble changes; 42983364b373 is added beside its retained bf4b3f38e1a2. No wording, brand colour, mark hash, source reason or other seed's provenance changes.

Open-marker explanation, independently reproduced with the committed detector:

- detect/index.mjs hashes only type + ':' + summary, truncated to 12 hex characters; it does not include a seed name or commit.
- SHA256('copy:README.md, seed.json changed since the last sync')[:12] = 42983364b373. The same description can be used independently in different seed records. It is not a cross-seed provenance identity.
- Uptime's actual newly tagged README.md and seed.json bytes differ from the baseline hashes, while CONTRACT.md does not. detectCopy therefore emits that exact summary/key, correctly adding the open copy-review marker.
- Spool remains at v0.7.15 / bb2efcd34837cd6067d02ce176609d3fc636dad2. Its actual released CONTRACT.md, README.md and seed.json hashes exactly equal the baseline and candidate state. detectCopy emits no finding. closeRecord keeps only current non-applied findings during a full apply, so the consumed Spool copy notification disappears. Its source and wording are unchanged; the marker was not moved as evidence or as a claim judgment.
- bf4b3f38e1a2 independently hashes homepage:no "alternative to" line found on the homepage. It remains a homepage observation, unrelated to the new copy marker.
- compareSignatures on baseline/candidate Uptime fingerprints returns changedShare=0 and changed=false under the tool's own quantization threshold. The recorded nibble change does not justify a new public still, mark or page design.

Receipts: scope-data.json, identity.json, markers.json, source-reads.json, spool-reads.json.

## R2 — MET: promotion truth and withheld Orbit

Commands: git ls-remote --tags on run-uptime for v0.5.17/v0.5.18 and peeled forms; git ls-remote --tags on run-orbit for v0.4.11/v0.4.12 and peeled forms; gh api repos/just-every/run-uptime/releases/tags/v0.5.18 (one release read); gh api repos/just-every/run-orbit/releases/tags/v0.4.12; JSON comparison of every listing; SHA256 of actual public tagged source bytes.

Uptime release: https://github.com/just-every/run-uptime/releases/tag/v0.5.18. Release id 451620070, published 2026-11-19T16:34:45Z, draft=false, prerelease=false. rer-release.dsse.json exists as an asset (3381 bytes). This establishes envelope-asset presence only; its signature was not verified and is not claimed.

The annotated v0.5.18 tag object is 8aa5b753383f8f45b80207c1f1223d91796672d5 and peels to 52f77a94a0a675ba5e1be122dfe0c720087144fb, exactly state.json's source commit. Previous v0.5.17 peels to 359b1bb93606ccfe5dc0120d2cdce78e8df67f6a. listings.json and seed-pages.ts say v0.5.18; state sourceRef and tag say v0.5.18; actual tagged seed.json says 0.5.18.

Source copy hashes, first 16 SHA256 hex characters:

| File | v0.5.17 | v0.5.18 | State agrees |
| --- | --- | --- | --- |
| CONTRACT.md | 9e5c8dd14ef60da6 | 9e5c8dd14ef60da6 | yes |
| README.md | e7ffa12f1203490e | 7a2a44311f07e869 | yes |
| seed.json | 97d6a9d3659eb36d | fa03b1b7d3585076 | yes |

Orbit v0.4.12 is a real annotated tag, object 5f6aae44f2d05009835cc98ed029aff5af1dfafd, peeled commit a9fa1830c1913562154dedaeb5a1322ead7c3e6b. Its release endpoint returns HTTP 404 Not Found. An unpublished draft is not distinguishable with every account, but there is no published release at that tag. Withholding promotion is correct; JE remains v0.4.11.

No other seed version or status changed. The six versions are HappyToHelp v0.4.31, Lamp v1.11.23, Uptime v0.5.18, Oncall v0.5.19, Orbit v0.4.11 and Spool v0.7.15. No coming-soon copy was imported. RER's separate seeds.json/deployment is explicitly outside this gate and was not treated as evidence of a JE defect.

Receipts: releases.json, source-reads.json, scope-data.json, markers.json; the Uptime/Orbit tag observations are also retained in RECEIPT.json.

## R3 — MET: public data, required local checks and production render

All heavy steps ran sequentially in this dedicated cloud VM, without slot/load polling or a full local test suite.

| Command/probe | Result |
| --- | --- |
| npm ci | exit 0; 715 packages installed |
| npm run listings -- --check | exit 0; Listings current (49 seeds) |
| npm run listings | exit 0; Listings unchanged (49 seeds); git diff HEAD on listings.json empty |
| npm run type-check | exit 0 |
| npm run lint | exit 0 |
| npm run build | exit 0; /uptime prerendered in production build |
| Browser public door, http://127.0.0.1:3161/uptime | HTTP 200, Uptime heading, v0.5.18; 1440 assertions pass |
| Candidate screenshots | 1440 and 390; no horizontal document overflow or visible layout break |
| Baseline production build + same public door | exit 0; v0.5.17; same measured page/header/version geometry at both widths |

Counts before and after: 49 total = 35 released + 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent. No listing was added/removed; every object outside Uptime is identical.

Pricing equality: no pricing statement, GST wording or billing-country restriction changed. The frozen rubric's Assisted US$10/month and Managed US$100/month literals are absent on both the baseline and candidate tracked JE presentation, so this is an unchanged-surface result, not a claim those exact labels appear on /uptime. This pre-existing rubric/presentation mismatch does not widen the gate.

The candidate's built Uptime page was visually inspected once at 1440 and 390. All changed release data fits the existing desktop row and phone stack. At each width, baseline and candidate document width equals viewport width; sampled main/article/h1/dt/dd geometry matches exactly. Browser errors were empty. The completed proof asserts at 1440 only; 390 is the visual proof required by the brief. The page's pre-existing media request means networkidle is not a suitable readiness condition: the first observation timed out; its processes were stopped, then DOM-and-font readiness completed. No product change or mock route was used.

The repository has no seed CONTRACT.md, sources.lock.json, contract-view generator or documented migration-ledger check. Those seed-only independent-generation steps are inapplicable. The applicable generated-data entrypoint is listings, whose write and check both passed independently. Local touched checks and browser proof are bound to the exact candidate, and the separate baseline proof is labeled with its own SHA.

Receipts: npm-ci.log, local-checks.json and named command logs, browser-head.json, browser-base.json, regression.json, four screenshots. Browser and server processes started by this task were closed by recorded PID; no watchers, schedulers, broad kills, provider calls or live deployment actions were used.

## R4 — MET: exact-head CI

Command (one discovery/read): gh api 'repos/just-every/home/actions/runs?head_sha=ac2df502633ad0e49ecdefd46e42bbc907fce02e&per_page=100'. Observation 2026-11-19T18:23:45Z.

| Run | Workflow/event | Exact head | Result |
| --- | --- | --- | --- |
| 44583257308 | Verify branch / push | ac2df502633ad0e49ecdefd46e42bbc907fce02e | completed / success |
| 44583353630 | Verify branch / pull_request | same exact head | completed / skipped |
| 44583347125 | PR #77 / dynamic | same exact head | completed / success |

Successful Verify: https://github.com/just-every/home/actions/runs/44583257308. The skipped duplicate follows the committed job condition for PRs whose head branch starts with cloud/. No dispatch, rerun, watcher or repeated CI poll occurred. Four GitHub REST calls total: PR, exact-head runs, Uptime release, Orbit release. The 404 is the expected release-absence result, not an authentication rejection.

Receipt: ci.json.

## R5 — MET: claim honesty on the touched entries

Read actual public Uptime CONTRACT.md at v0.5.18, its complete status table, the JE Uptime summary/does/promises, and the v0.5.17→v0.5.18 README.md/seed.json diff. Sampled unchanged Spool copy to explain the consumed marker. CONTRACT.md is byte-identical between the two Uptime tags: no implementation status was promoted. The table retains 115 clauses: 37 done, 58 partial, 20 missing. Those counts are descriptive source evidence, not a JE gate reassessment.

The README changes simplify the introductory line, expressly say Uptime does not publish a customer status page, adjust installer/CLI paths and setup guidance, and make the practice-target helper failure-safe. seed.json changes only version. JE's unchanged Uptime page does not claim that Uptime publishes a customer status page. The source change does not independently show a false JE sentence. The full source diff was read, but raw source files containing example contact addresses are not selected for public evidence.

All ten JE promise IDs were matched to the tagged status table. EVIDENCE-001, NOTIFY-001, DELIVERY-001, DRILL-001, TLS-001, MAINT-001, ARCHIVE-001 and ERASURE-001 are done; STATE-001 and NETWORK-001 remain partial. Related capabilities TCP-001, DOMAIN-001 and HEARTBEAT-002/003 retain their own source qualifications, while DNS-001, SCHEDULE-001 and PRIVATE-001 are done. A partial evidence cell alone is not a source demonstration that a claim is false.

FOLLOW-UP C: Carry forward one existing Uptime copy/evidence qualification item, specifically STATE-001's “One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks.” and NETWORK-001's “Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected.” Both are unchanged on JE and remain broader than their retained qualification evidence. No false behavior, introduced privacy/security defect or new claim was demonstrated. Exact sentences, clause gaps and related sampled capabilities are in FOLLOW-UPS.md.

OUT OF SCOPE D: Spool ERR-006 remains the brief's pre-existing follow-up; only its sync marker is touched, and its source/copy/listing is unchanged. Lamp, HappyToHelp and Terrace follow-ups remain outside this touched-copy decision. No copy was rewritten.

Receipts: clause-status.json, source-reads.json, spool-reads.json, markers.json, FOLLOW-UPS.md.

## Outcome and custody

No product blocker or missing required check. Zero clause status changes. One existing nonblocking Uptime follow-up retained. PR 77 may land after the lane's remaining independent publication/merge/deploy controls; this gate does not merge or deploy it. No gate-owned READY product branch is asserted.

Full plan: PLAN.md. Concrete checks and observations: RECEIPT.json plus the explicitly selected logs/JSON/screenshots. Report-only evidence is published separately as a child of the already-published candidate on evidence/je-gate-61. Product checkout remains unchanged; the fresh clone and node_modules are removed after evidence custody is verified. Sources and reports remain outside the deleted clone.

Verdict: GATE PASS WITH FOLLOW-UPS 1 head=ac2df502633ad0e49ecdefd46e42bbc907fce02e.
