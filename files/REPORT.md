# je-gate-66 independent deciding gate

Author: Run Edit Run fleet. Timestamp: 2026-11-21T03:44:34Z (from date -u).

PR: https://github.com/just-every/home/pull/82
Candidate branch: cloud/je-sync-56
Gated head: 2ae09dc01a11933324491a7e235750cdd4ad2858
Baseline main and PR base: acb6cbe44844a1d642a9e9d034c113016e5d9e65
Decision: PASS WITH FOLLOW-UPS, two carried-forward Uptime evidence follow-ups; zero blocking findings. No product changes or clause status changes were made. The gate did not create cloud/je-gate-66, push product code, comment, merge, deploy, dispatch or rerun CI. The gate-specific read-only assignment takes precedence over the generic builder instructions. Only the separately authorized report evidence publication is a write.

## Plan and execution boundaries

The full plan is PLAN.md. The gate used one fresh shallow blobless clone, fetched pull/82/head, checked out the requested SHA and retained origin/main for comparison. PR metadata independently confirmed the requested head/base and that PR 82 remains open. A final unauthenticated Git ls-remote confirmed main, cloud/je-sync-56 and pull/82/head still advertise these same SHAs. Heavy commands ran serially in this dedicated cloud VM. No other repository was cloned; no provider credentials or private held-out material were used. Gate source and metadata reads used public unauthenticated Git/HTTPS, including four public REST reads, rather than consuming injected credentials. The specific source note forbids launcher refresh for those public reads. The launcher refresh is reserved solely for the explicitly permitted evidence push. No secrets or environment values are selected for publication.

## Frozen rubric

| Row | Score | Commands / result |
| --- | --- | --- |
| R1 Scope | MET | git diff --stat/--name-only origin/main HEAD; full three-file diff; git log origin/main..HEAD with author, committer and unfolded trailers; candidate diff credential-pattern scan. Exactly the named three paths; one fleet-authored/fleet-committed candidate, no trailers, no credential-shaped matches, no test change. Hunk and marker explanations below. |
| R2 Promotion truth | MET | Public REST GET releases/tags/v0.5.22 and releases/tags/v0.5.19, each once; git ls-remote --tags with annotated-tag peeling; public raw reads of the released and preceding CONTRACT.md, README.md and seed.json; independent SHA-256 comparison. Published normal releases have rer-release.dsse.json. Version/source agreement verified. Other listings and statuses unchanged. |
| R3 Public data and render | MET | npm ci exit 0; npm run listings -- --check exit 0, current 49 seeds; npm run listings exit 0, unchanged; npm run type-check exit 0; npm run lint exit 0; npm run build exit 0. Production browser assertions at 1440 and proof at 1440/390 for /uptime and /oncall, then independent production main build and same screen comparison. Both new versions render, no horizontal overflow or page JavaScript exception, and version block geometry is unchanged against main. Counts and pricing qualification below. |
| R4 Exact-head CI | MET | Public REST GET repos/just-every/home/actions/runs?head_sha=2ae09dc01a11933324491a7e235750cdd4ad2858&per_page=100 once. Push Verify branch 44860698831 completed/success on this exact head. PR duplicate Verify branch 44860779583 completed/skipped by documented workflow condition. Dynamic PR run 44860776900 completed/success. No watcher, dispatch or rerun. |
| R5 Claim honesty | MET, carried follow-ups | Read both entire released contract status tables, all ten mapped JE promise clauses per product, both previous-to-current contract and seed.json diffs and the touched JE page entries. No newly false release claim established. Uptime's partial-evidence statements remain partial, not disproved; two carried follow-ups below. Oncall's changed contract observations and agent classes do not contradict the existing public copy. No wording or implementation judgment was imported. |

## R1: each changed hunk

- public/data/listings.json: generatedAt advances from 2026-11-20T17:53:18.796Z to 2026-11-21T03:20:12.862Z. Only Oncall v0.5.21 -> v0.5.22 and Uptime v0.5.18 -> v0.5.19 change within listings. Deep comparison of all 49 entries shows exactly those two version fields and no other content/status change.
- src/data/seed-pages.ts: the same two version literal changes, at the real /uptime and /oncall entries. No summary, does, promises, pricing, imports, marks or layouts change.
- scripts/seeds-sync/state.json: syncedAt advances. Oncall sourceRef/tag and commit follow v0.5.22; its CONTRACT.md and seed.json fingerprints advance while README.md is unchanged. Uptime sourceRef/tag and commit follow v0.5.19; only seed.json's fingerprint advances. Brand tokens, homepage fingerprints and human-facing wording are unchanged. The remaining changes are open-copy marker bookkeeping.
- Oncall adds 922fed04eacf, the first 12 SHA-256 characters of `copy:CONTRACT.md, seed.json changed since the last sync`. Actual detectCopy against independently fetched files reports exactly those two files. Existing bf4b3f38e1a2 remains.
- Uptime adds 64cb07f6a0dd, the first 12 SHA-256 characters of `copy:seed.json changed since the last sync`. Actual detectCopy reports exactly seed.json. Existing bf4b3f38e1a2 remains.
- Spool removes its prior 64cb07f6a0dd open marker, with its source commit, tag, copy hashes, brand and homepage observations unchanged. These keys hash finding type and summary, not seed identity; this is not a global marker transferred from Spool to Uptime. detect/index.mjs closeRecord recomputes full-sync open from that run's unapplied findings. Once Spool's preceding seed.json change has been recorded in its copy hashes, no current copy delta repeats, so the stale marker drops. This neither changes Spool copy nor proves or promotes ERR-006. A removed open marker is not evidence that a copy claim was repaired.

The candidate is a direct child of the recorded baseline with no side parent. Identity inspection covered all candidates; names and addresses satisfy the fleet policy independently. No author data is included in selected receipts. Tests, workflows and sync implementation are untouched.

## R2: independent release and source provenance

| Product | Previous peeled commit | New tag / peeled commit | Published at | Release |
| --- | --- | --- | --- | --- |
| Oncall | 33cafdc7750103f51ac4173c7b52c8dbcf1efbe0 | v0.5.22 / 9cbcf975224f7171dcd3813e6f54d4b29a0791ca | 2026-11-21T02:50:25Z | https://github.com/just-every/run-oncall/releases/tag/v0.5.22 |
| Uptime | 52f77a94a0a675ba5e1be122dfe0c720087144fb | v0.5.19 / b9bff679ec99b702de753d63ad385d232e6b6d1e | 2026-11-20T23:39:34Z | https://github.com/just-every/run-uptime/releases/tag/v0.5.19 |

Both release responses report draft=false and prerelease=false, with rer-release.dsse.json in assets. This establishes envelope presence only; the gate makes no signature-verification claim. Git tag objects were independently peeled rather than trusting target_commitish=main.

Oncall CONTRACT.md hashes 7617e905d0abae0e -> cadffafd0877d991; seed.json hashes c7510d2baa3cf6cd -> 00cd8f30b1f2a58e; README.md remains b2c25df447c4fbed. Uptime seed.json hashes fa03b1b7d3585076 -> 7a8736536e7b6342; CONTRACT.md remains 9e5c8dd14ef60da6 and README.md remains 7a2a44311f07e869. Full SHA-256 values and exact successful public URLs are in source-reads.json. Every fingerprint agrees with state.json.

The two seed.json diffs change only their own version number. Uptime CONTRACT.md is byte-for-byte unchanged. Oncall CONTRACT.md adds merge-target and split-source stale-review observations (OC-050), follow-up submission resource readback (BASE-AGENT-003), a local discovery proof (SURFACE-001) and sensitive risk classification on incidents.update and changes.read. Both complete status tables are unchanged. Nothing promotes a source clause.

Unchanged path versions: HappyToHelp v0.4.31, Lamp v1.11.24, Orbit v0.4.12 and Spool v0.7.16. There is no coming-soon import or status promotion. Newer unrelated releases and RER's separate catalogue are outside this frozen gate.

## R3: public data and browser proof

Before: 49 = 35 released + 14 coming soon. After: 49 = 35 released + 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent.

All six named npm commands succeeded, as did the separate baseline production build. Listings write produced no tracked diff. No seed source lock, contract-view generator or migration-ledger check is declared by this website's AGENTS.md/package scripts and no corresponding source artifacts exist; the seed-specific triage steps are inapplicable, not omitted failures. The website's documented generated-listings check was independently run and passed.

Pricing preservation is established by the complete diff: no price field or pricing-bearing source changed. The literal Assisted US$10/month and Managed US$100/month statements named by the brief are absent from both this baseline and candidate website source; therefore this gate does not claim to have rendered or newly verified those amounts. The scoped preservation check passes, and the baseline mismatch is a landing note, not an introduced defect. No GST or billing-country wording was added.

Production routes /uptime and /oncall returned 200 and displayed v0.5.19/v0.5.22 on candidate and v0.5.18/v0.5.21 on baseline. At 1440, both version blocks have x=617.328125 and width=205.328125; at 390 both have x=20 and width=350. Their y positions are identical on head and main: Uptime 3867.640625/4154.078125; Oncall 3686.890625/3881.828125. Document widths equal viewport widths at both sizes. The screenshots show readable content, unchanged navigation/columns and unobscured version facts. The gallery's intentional phone slide peek is unchanged, not page overflow. Full-page and scrolled-version screenshots for each product/width/head are attached.

The first browser harness attempt waited for networkidle and timed out; this site makes background requests. A second attempt exposed a variable-shadowing error in the temporary gate harness. Both were corrected outside the product. The final harness waits for document content, h1 and fonts, captures the actual unmodified application and completes on both head and baseline. No application mocks, route interception or test weakening was used. Named assertions run at 1440; 390 is visual proof and measured observation. The plain Node production server logged missing local Worker token-cache/analytics bindings on both head and main; this has no changed-screen effect and was not expanded into unrelated feature testing. Every browser was closed and own server descendant PIDs were recorded and stopped.

## R4: exact-head CI

https://github.com/just-every/home/actions/runs/44860698831 — Verify branch, push, completed/success, exact gated SHA.
https://github.com/just-every/home/actions/runs/44860779583 — Verify branch, pull_request, completed/skipped. The unchanged workflow intentionally skips the PR duplicate for cloud/* heads.
https://github.com/just-every/home/actions/runs/44860776900 — dynamic PR run, completed/success, exact gated SHA.

The successful push Verify satisfies the bar; the skipped duplicate is not being represented as success. No failed shard required log retrieval or triage. Four total public REST metadata calls were made, below the ten-call budget. No gh token was loaded for public reads; the source-note public/no-credentials exception was used.

## R5: claims and tiers

Incumbents from the source Product target tables: Uptime — Pingdom, UptimeRobot, Better Stack Uptime, Site24x7; Oncall — PagerDuty, Opsgenie / Jira Service Management and Splunk On-Call. This is a version/provenance sync; its gate does not demand that either release complete its broader incumbent-replacement destination. JE explicitly preserves Oncall's existing pager and paging-OFF boundary.

All ten Oncall promise mappings are source-table done: OC-012, OC-006, OC-005, OC-004, OC-008, OC-011, OC-003, OC-002, OC-021 and OC-022. Oncall's new contract observations/risk classes do not change those statuses or public promises. Uptime maps EVIDENCE-001, ARCHIVE-001, ERASURE-001, NOTIFY-001, DELIVERY-001, DRILL-001, TLS-001 and MAINT-001 to done; STATE-001 and NETWORK-001 remain partial. A partial evidence judgment is not proof that its release's behavior is false.

FOLLOW-UP C: Carried Uptime STATE-001 evidence qualification. Exact JE text: "One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks." The released contract keeps a partial judgment and its missing-vantage/Unknown/Recovering/manual-pass evidence qualification. This text, status and contract are unchanged from baseline; no source-demonstrated false behavior or new blocker is established.

FOLLOW-UP C: Carried Uptime NETWORK-001 evidence qualification. Exact JE text: "Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected." The released clause remains partial, explicitly limiting the observed rebinding proof and leaving wider redirects/address families/credential combinations/execution bounds/hosted locations unproved. These are evidence gaps, not a demonstrated security defect; source and JE wording are unchanged.

OUT OF SCOPE D: Existing Oncall OC-021 copy precision. Exact JE sentence: "A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused." Both preceding and current contracts specify zero native-object writes while retaining upload custody, plan snapshots and grant/bookkeeping rows. The product promise is accurate for imported native objects but overbroad if read as a literal ban on bookkeeping. This is pre-existing copy precision, no changed native behavior, money, privacy, authority or data-loss finding, and no additional gate hold. It is recorded under Out of scope in FOLLOW-UPS.md, not counted among the two carried C follow-ups.

No A, B or BAR finding. No test was deleted, skipped or weakened. No new security, money or data-loss defect was demonstrated. Known untouched Lamp/HappyToHelp/Terrace copy qualifications and Spool ERR-006 were not reopened.

## Result custody and limits

Actual report/receipt files reside under the task packet directory outside the disposable product clone. Every selected filename is explicit; source documents and raw API payloads are kept outside the selection. Selected text contains no email addresses, credentials or environment dumps. The separate evidence publication attaches this packet as a child of the already advertised product head on evidence/je-gate-66; it does not signal product READY, acceptance or landing. Product branch and index remain unchanged by that command. Publication outcome is reported separately in the terminal message. The Mac publication scan, PR merge and deployment remain the lane's responsibility.

Clause status changes: none. Before/after source status tables: unchanged. Blockers: none in the product gate. Final transfer/cleanup receipts are retained outside the published packet to avoid changing its manifest after publication.

Decision: PASS WITH FOLLOW-UPS, count 2, head 2ae09dc01a11933324491a7e235750cdd4ad2858.
