Independent gate je-gate-38 completed 2026-11-13T21:53:20Z. PR https://github.com/just-every/home/pull/54 may land under the frozen rubric. No new A, B, BAR or C findings were reproduced. Existing follow-ups remain with the lane. No product file, test, contract status, PR, deployment or remote product ref was changed.

Reviewed branch: cloud/je-sync-30. Exact candidate: 2ae43f9e53a68f2a998af6df95ed13e038c66c68. Baseline main: ac2df380f2770a76aaee8a2dac8a1992554eb117. Both the initial REST PR read and the final GraphQL PR/default-branch read confirmed those exact values. The PR remained OPEN. A local cloud/je-gate-38 branch was created from main solely to run the genuine baseline build; it was never pushed. Product checkout was restored to the exact candidate, detached and clean, for evidence publication.

The brief's inline RULES.md and je-sync-30.md were the builder context. The launcher and product AGENTS.md were read. just-every/home has no CONTRACT.md Product target table, so it supplies no named incumbent for this listing-sync gate. No broader seed-product qualification was added. The builder's evidence ref was not used as gate evidence.

Plan executed:

1. Confirm PR #54 retains the fixed head and main base; shallow clone only just-every/home and fetch pull/54/head.
2. Compare every hunk, full candidate commit identity and trailers, listing counts/versions/status/copy, state provenance, and excluded seeds against baseline main.
3. Read each promoted seed's releases once and tagged CONTRACT.md via gh api; validate release eligibility, tag resolution, contract provenance and claim status against unchanged JE copy.
4. Independently run npm ci, listings check and regeneration, type-check, lint and production build. Determine whether source-lock, contract-view and migration-ledger commands apply from this repository's AGENTS.md and scripts.
5. Serve built real seed routes locally and inspect each at 1440 and 390; compare their output with a genuine baseline-main build. Assert at 1440 only, retain screenshots and DOM receipts for both widths.
6. Observe exact-head Verify once via REST, respecting the ten-call budget and 300-second cadence. Never dispatch, rerun or alter CI.
7. Report R1-R5, classify only demonstrated findings under the frozen rubric, write actual non-secret report and receipts, publish only the separate evidence ref, then delete clone/dependencies and stop only owned processes. No product edit, commit, push, PR modification, merge or deploy.


| Row | Result | Commands and independent evidence |
| --- | --- | --- |
| R1 Scope | MET | git diff --name-only and git diff ac2df380f2770a76aaee8a2dac8a1992554eb117 2ae43f9e53a68f2a998af6df95ed13e038c66c68; git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"; structural and credential-shape checks of the full diff. Exactly the three required files, 29 additions and 29 deletions, one fleet-authored and fleet-committed commit, no trailers. No tests touched or weakened. candidate.diff, STRUCTURE.json and identity.txt retain the evidence. |
| R2 Promotion truth | MET | gh api repos/just-every/run-<seed>/releases?per_page=100 once per seed; gh api repos/just-every/run-<seed>/contents/CONTRACT.md?ref=<tag>; one gh api graphql read of the three annotated tag targets. Each eligible Release is non-draft/non-prerelease and has rer-release.dsse.json. Tag commit oids match state.json; all three public version representations agree. Only the three intended versions changed. No status or wording change; no coming-soon import. |
| R3 Public data and render | MET | npm ci; npm run listings -- --check; npm run listings; git diff --exit-code; npm run type-check; npm run lint; npm run build: all exit 0. Real production-built /happytohelp, /oncall and /spool HTTP pages returned 200, showed the intended versions, had no page errors or horizontal overflow at 1440 and 390, and were visually inspected. Assertions ran at 1440; 390 is visual/measured proof. A genuine main production build and the same routes supplied the regression comparison. |
| R4 Exact-head CI | MET | gh api 'repos/just-every/home/actions/runs?head_sha=2ae43f9e53a68f2a998af6df95ed13e038c66c68&per_page=100' once. Push Verify branch run 43510379593 completed/success on the exact SHA. PR Verify run 43510444222 completed/skipped under the workflow's cloud-branch condition; it is not the green proof. Dynamic PR #54 run 43510440146 also completed/success. No dispatch, rerun or watcher. |
| R5 Claim honesty | MET | Read each tagged CONTRACT.md status table, relevant requirement paragraphs and exact JE summary/does/promises. The three CONTRACT.md byte hashes match the unchanged hashes in before/after sync state; JE copy is byte-identical except version literals. HappyToHelp's eight partial promises and Spool ERR-006's known mismatch remain pre-existing; no new false claim was introduced or counted. Full source documents, status rows and exact claim sentences are retained. |

R1 hunk explanation:

- public/data/listings.json: generatedAt advances from 2026-11-13T18:33:09.577Z to 2026-11-13T21:21:00.844Z, then exactly HappyToHelp v0.4.24 → v0.4.25, Oncall v0.5.12 → v0.5.13 and Spool v0.7.9 → v0.7.10. Removing generatedAt and normalizing those three versions makes the entire parsed listing data equal to main.
- src/data/seed-pages.ts: exactly three version-literal substitutions for the same entries; replacing those literals in main yields byte-identical candidate content. Summary, does, promises, SEO text, status, marks, colors, screenshots, prices and coming-soon copy were not changed.
- scripts/seeds-sync/state.json: syncedAt advances from 2026-11-13T18:33:06.093Z to 2026-11-13T21:20:59.504Z. Each promoted seed changes only commit, sourceRef, tag, and README.md/seed.json provenance hashes. Each CONTRACT.md provenance hash is unchanged. HappyToHelp and Spool add open marker 42983364b373; Orbit removes 64cb07f6a0dd; Uptime removes 42983364b373. No seed entry is added or removed. All brand, mark and home records and all other seed fields remain identical. The tool's detect/index.mjs computes finding keys from type/summary, and closeRecord remembers findings not applied. 42983364b373 is independently reproduced as sha256('copy:README.md, seed.json changed since the last sync')[:12]. These are bookkeeping/provenance/open-finding markers, not imported wording or implementation-status judgments. Removal of a marker does not close the lane's known copy follow-up.

Release evidence, read once per repository:

| Seed | Before → after | Release and UTC publication | Annotated tag target commit |
| --- | --- | --- | --- |
| HappyToHelp | v0.4.24 → v0.4.25 | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.25 · 2026-11-13T21:16:57Z | 333af4b0580c4284616783f1d79fcc9aad3aefc5 |
| Oncall | v0.5.12 → v0.5.13 | https://github.com/just-every/run-oncall/releases/tag/v0.5.13 · 2026-11-13T19:42:50Z | 8adae6c836f2fabda29e8a091b052450410c8ca5 |
| Spool | v0.7.9 → v0.7.10 | https://github.com/just-every/run-spool/releases/tag/v0.7.10 · 2026-11-13T21:16:22Z | 417ab513b3032370091479fa28f41a5a67b50c53 |

All three releases have draft=false, prerelease=false and rer-release.dsse.json in assets. This establishes asset presence, not cryptographic signature verification. The tag-ref read independently establishes tag existence and resolves the annotated tag to the commit saved in candidate state. Contract SHA-256 prefixes are ae8feea8b7998aa7, c04517abc904f1e5 and ee9c871bfa25a110 respectively and match both main's and candidate's state records.

Counts before and after are 49 total = 35 released + 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent. Lamp v1.11.14, Uptime v0.5.11 and Orbit v0.4.9 are unchanged. Every other seed's version and status is unchanged. Every non-version listing field and every public prose sentence is unchanged. There is no new mark, color, gallery or homepage capture in the candidate.

Pricing invariance was checked through the complete diff and equality of all non-version public content. The exact Assisted US$10/month and Managed US$100/month phrases in the brief do not occur in either tracked source snapshot; this gate does not claim they are rendered on these pages or verify an external pricing site. The candidate changes no pricing, GST wording or billing-country condition. ADDITIONAL-CHECKS.json records that limitation.

Local mechanical checks use the repository's npm commands, under the required cloud toolchain and cloud_run subreaper. npm ci installed 726 packages successfully. Listings check reported 'Listings current (49 seeds)'; regeneration reported 'Listings unchanged (49 seeds)' and the tracked tree stayed clean. type-check, lint, and Next.js production build succeeded. npm test/full-suite execution was left to the already-green exact-head Verify, as the frozen gate requires only the listed local checks. No permanent test was written or changed.

Independent generated-source checks: this repository has no sources.lock.json, contract-docs generator, CONTRACT.md, ACCEPTANCE.md or docs/CLAIMS.md. AGENTS.md and package scripts document no source-lock or migration-ledger command. It has five ordinary D1 SQL migrations, all unchanged. Therefore source-lock regeneration/check, contract-view write/check and migration-ledger check are not applicable here; no stale-source prerequisite was demonstrated. The applicable documented generated-data command, listings, was independently run in check and write modes without a diff.

Public-door coverage of the builder's points: (1) fresh-clone data/source scope was independently compared against main; (2) unchanged copy and tagged-contract provenance were checked; (3) release eligibility, actual listing/page versions, exclusions and status invariance were checked; (4) the listing generator check/write and clean-tree proof were run; (5) type-check, lint, production build and real route rendering were run. The broad 49-repository/live-homepage sync was not rerun: the gate's frozen R1-R5 inputs are the three promoted release sources and touched surface, and no unrelated source inventory was opened.

Browser proof: Chromium /usr/bin/chromium, headless --no-sandbox, real HOME, fresh browser contexts, real built routes served by next start at 127.0.0.1:34038. The first networkidle navigation timed out after 60 seconds while media/network activity remained outstanding; no screenshot had yet been taken. The successful harness waits for DOM content and rendered Version facts, then takes full-page and version-area screenshots. Candidate and main were built and served independently, with no mocked application responses or modified app files. At both widths all three bodies are identical after substituting only their version string, all six version rectangles are unchanged, and scrollWidth equals the viewport. No layout break was seen in the candidate full-page and version-area proof. REGRESSION.json and both BROWSER.json files record the measurements. The browser source is included for reproducibility.

The local Next Node server logged unavailable Worker cache/token snapshots and missing local page_views D1 table errors on both main and head. Those ancillary APIs are outside the touched listing surface and do not alter the rendered pages; no provider account or credentials were used and no application fix was attempted. The identical baseline behavior is recorded in both server logs. The clone-local supplied fleet hook wrapper also emitted a Husky relative-helper post-checkout warning; the checkout nevertheless reached the exact head and git status/diff confirmed a clean product tree. No product commit was made through that wrapper.

Exact-SHA CI evidence: https://github.com/just-every/home/actions/runs/43510379593 is completed/success with head_sha=2ae43f9e53a68f2a998af6df95ed13e038c66c68; it includes lint, type-check, npm tests, generated brand/listings checks and Cloudflare production build under the existing workflow. The API response is CI.json. No red Verify was observed, so failure-log reads and failure-triage reruns do not apply. There were 9 gh calls total: PR REST 1, releases 3, tagged contracts 3, exact-SHA runs 1, and one final GraphQL read resolving the three tags and rechecking PR/current-main 1. No polling or log-download calls were made. One local post-read comparison accidentally read baseline state while the main build was checked out; rechecking the same stored API receipt against git show 2ae43f9e53a68f2a998af6df95ed13e038c66c68:scripts/seeds-sync/state.json passed without another provider call.

Exact JE promise review (status values are read-only source judgments, not new gate findings):

happytohelp
- MOVE-IN-001 — done (happytohelp-CONTRACT.md:1207): Imports are reviewed before anything is written, send no messages to your customers, can be undone as a whole, and keep source dates, private notes and publication state.
- CONVERSATION-001 — partial (happytohelp-CONTRACT.md:1204): Customer and agent messages are stored once, and two conflicting final replies can never both be accepted.
- DELIVERY-001 — partial (happytohelp-CONTRACT.md:1205): Messages are saved before they are shown live, so a reload or dropped connection recovers everything that was sent, and an AI draft never becomes a final answer until it is safely accepted.
- OUTCOMES-001 — partial (happytohelp-CONTRACT.md:1208): Customers can rate a resolution with a thumbs up or down and a short comment, and comments are removed if the contact is erased.
- REPORTS-001 — done (happytohelp-CONTRACT.md:1209): Reports use your own calendar and time zone, count each conversation once, and export to a spreadsheet file that is safe to open.
- AI-001 — partial (happytohelp-CONTRACT.md:1212): With no AI key, the AI is simply not assigned to new conversations and your team keeps them; your company's policy sets AI spending limits and uncertain attempts are never silently repeated.
- DELEGATION-001 — partial (happytohelp-CONTRACT.md:1215): Revoking a computer's access ends its authority at once, and HappyToHelp never claims that work already running there was stopped.
- CONNECTIONS-001 — partial (happytohelp-CONTRACT.md:1210): API tokens have chosen scopes, are shown once, are stored hashed and can expire; an unclear webhook result is not sent again.
- IDENTITY-003 — partial (happytohelp-CONTRACT.md:1269): Teammates can sign in with an authenticator app or a security key plus one-time recovery codes, and an owner can require it for everyone or by role.
- PORTABILITY-001 — partial (happytohelp-CONTRACT.md:1279): You can export your conversations, files, contacts, help articles, settings and history in one checked archive and restore it into a clean installation; sign-ins and provider secrets are left out.
oncall
- OC-012 — done (oncall-CONTRACT.md:1444): Oncall sends no texts, calls or push alerts, so your existing pager stays in charge while you use it.
- OC-006 — done (oncall-CONTRACT.md:1438): Oncall sends signed response events only to endpoints an administrator approves; paging stays off, and email is for sign-in links only.
- OC-005 — done (oncall-CONTRACT.md:1437): A runbook is copied into the incident when it is declared, so later edits never rewrite instructions mid-incident.
- OC-004 — done (oncall-CONTRACT.md:1436): Resolving an incident needs recovery evidence and a summary, and every change is recorded in an attributed timeline.
- OC-008 — done (oncall-CONTRACT.md:1440): Incident records you write are never deleted automatically.
- OC-011 — done (oncall-CONTRACT.md:1443): Rotations hand over by wall-clock time in your named zone, and clock-change gaps show up as visible gaps.
- OC-003 — done (oncall-CONTRACT.md:1435): Viewers can only read, responders coordinate, and admins manage; alert-sending credentials grant no read access, and removed access stops on the next request.
- OC-002 — done (oncall-CONTRACT.md:1434): Replaying alert routing only reads: it creates no alert, incident or outside effect.
- OC-021 — done (oncall-CONTRACT.md:1453): A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused.
- OC-022 — done (oncall-CONTRACT.md:1454): A move-in can be undone, and edits you made afterwards are kept rather than overwritten.
spool
- ERR-003 — done (spool-CONTRACT.md:1683): Error details are scrubbed before they are stored: emails, tokens and passwords are removed, and headers, cookies and request bodies are not kept by default.
- ERR-004 — done (spool-CONTRACT.md:1684): Owner sign-in, error sending and read-only agent access are separate, revoking one takes effect on the next request, and your source maps are never public.
- ERR-002 — done (spool-CONTRACT.md:1682): An error is only counted once it is fully saved, and a repeated send never counts twice.
- ERR-006 — done (spool-CONTRACT.md:1686): Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm.
- ERR-007 — done (spool-CONTRACT.md:1687): The evidence packet is size-limited and never includes your source code.
- ERR-008 — done (spool-CONTRACT.md:1688): Counts of errors accepted and rejected are visible, and a quiet period is never reported as proof an error is fixed.


No clause status changes were made or requested. No claim was promoted from PARTIAL to DONE. HappyToHelp has the same eight named partial promises in this page's ten promises; Oncall's ten cited promise rows are done; Spool's six promise rows are done, while its source-map clause ERR-005 remains partial. Partial evidence by itself was not treated as a false claim.

OUT OF SCOPE D: the known Spool ERR-006 sentence 'Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm.' is already present on main. Tagged CONTRACT.md:157 explicitly says plain Resolve regresses on the next accepted event in any release, alongside the later-release rule for resolution in the current release. This known copy mismatch is unchanged and excluded by the brief; it is not a new follow-up or blocker.

OUT OF SCOPE D: the eight HappyToHelp partial-evidence promise follow-ups listed above remain pre-existing. Terrace trust wording and Uptime/Lamp partial-evidence follow-ups are explicitly preserved outside this gate; their copy was not changed and their seed source repositories were not audited.

NOTE G: exact pricing labels in the brief are absent from both JE source snapshots; only the unchanged pricing/copy invariant is established. The local Node-versus-Worker ancillary API behavior and the initial browser networkidle timeout are gate execution limitations, reproduced or resolved as described above; none demonstrates a new product regression.

There are zero blocking findings and zero new C follow-ups. FOLLOW-UPS.md retains existing context; LANDING-NOTES.md records process/landing notes. No product push, merge, PR comment, CI dispatch or deployment was performed. The full non-secret packet is intended only for refs/heads/evidence/je-gate-38. Gate pass authorizes consideration under the existing lane hold and Mac publication/landing checks; it is not a landing or READY claim. The clone and node_modules will be deleted after report-only evidence publication and transfer verification; report files are retained outside the clone.

Verdict: GATE PASS 2ae43f9e53a68f2a998af6df95ed13e038c66c68
