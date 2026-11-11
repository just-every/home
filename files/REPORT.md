je-gate-27 independent deciding gate of PR #43

Judgment: may land under the frozen R1-R5 rubric. Candidate cloud/je-sync-19 at 47e7f9a6c01147c49c6c39403db3bdd9442ad045; baseline main 464302fb78beebdfb13de67529124fb5602d88e8. PR https://github.com/just-every/home/pull/43 remained open, non-draft and pinned to those SHAs in the initial and final REST reads. No product changes, commits, pushes, PR comments, merges, deploys or CI dispatches/reruns were made. A local cloud/je-gate-27 branch was created from main for the cloud protocol; the inspected checkout is detached at the exact candidate. Evidence publication is a separate report-only ref and is not product landing or READY.

Plan and scope

PLAN.md contains the complete execution plan. It was followed: launcher/authentication and repository guidance; pinned PR/main verification; exact diff/identity and credential-shape review; one releases read per source plus tag and contract reads; independent listings generation, type-check, lint and production build; real-slug browser checks and screenshots; one exact-SHA CI discovery; claim/status comparison; final head/base recheck; explicit evidence publication and clone cleanup. Only the declared home repository was cloned. Other repositories were read solely through gh api. The inline RULES and builder brief were read as supplied. No design or source rewrite was attempted.

R1 MET — scope and each hunk

Commands: git rev-parse HEAD origin/main; git merge-base HEAD origin/main; git diff --stat origin/main HEAD; git diff origin/main HEAD; git diff --check origin/main HEAD; git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"; full messages and rev-list of all candidate parents; diff-only credential-shape scan. Result: exactly 3 paths, 20 insertions and 21 deletions, one candidate commit, direct ancestry from the required baseline. Author and committer are Run Edit Run fleet <fleet@runeditrun.com>; no trailers, OpenAI/Codex co-authors or credential-shaped values. No test or test command changed, was deleted, skipped or weakened. This was the required touched diff review, not the Mac publication scan.

public/data/listings.json has three hunks: generatedAt advances 15:38:55.826Z → 16:42:17.482Z; HappyToHelp v0.4.20 → v0.4.21; Lamp v1.11.10 → v1.11.11. No other listing field changes. src/data/seed-pages.ts has exactly those two version-token hunks and no prose changes.

scripts/seeds-sync/state.json has six hunks: syncedAt advances 15:38:44.635Z → 16:42:08.061Z; HappyToHelp changes copy commit 1c9051307419c22530c4b1f7aab80a53bd4eb9d8 → 51492e5d3cbaa94b42df1bef063fb00131038a19, sourceRef/tag v0.4.20 → v0.4.21 and README/seed.json hashes; Lamp changes commit 511a966c34f2d95eba3766d1cfa4b4a47b10d76e → 9bbe26c4fe8cd806fb1d25e23412f2f6b198028c, sourceRef/tag v1.11.10 → v1.11.11 and README/seed.json hashes; Lamp adds open marker 42983364b373; Oncall removes that marker; Uptime removes 64cb07f6a0dd. CONTRACT hashes, sourceReason, brand values, marks, home headlines and visual signatures are unchanged. Source inspection of detect/index.mjs and detect/copy.mjs plus recomputation identifies 42983364b373 as “README.md, seed.json changed since the last sync” and 64cb07f6a0dd as “seed.json changed since the last sync”. These are open-copy finding markers, not wording. data-receipt.json enumerates every changed JSON leaf and asserts that each is within this provenance/marker set. README/seed.json digest changes are classified as provenance; their full source bytes were not separately fetched.

R2 MET — promotion truth

Commands: gh api repos/just-every/run-lamp/releases?per_page=100; gh api repos/just-every/run-happytohelp/releases?per_page=100 (each read once, filtered to the target release); gh api repos/just-every/run-lamp/commits/v1.11.11; gh api repos/just-every/run-happytohelp/commits/v0.4.21; contents/CONTRACT.md?ref=<tag> for each source; node --import tsx /tmp/je-gate-data.mjs.

lamp: v1.11.11 resolves to 9bbe26c4fe8cd806fb1d25e23412f2f6b198028c; Release 441883245 published 2026-11-11T15:38:16Z, draft=false, prerelease=false, https://github.com/just-every/run-lamp/releases/tag/v1.11.11; rer-release.dsse.json present (3157 bytes). The tag commit equals state.json commit, and listing/page/sourceRef/tag versions agree. Envelope presence only: no signature verification was performed.

happytohelp: v0.4.21 resolves to 51492e5d3cbaa94b42df1bef063fb00131038a19; Release 441930303 published 2026-11-11T16:22:35Z, draft=false, prerelease=false, https://github.com/just-every/run-happytohelp/releases/tag/v0.4.21; rer-release.dsse.json present (3061 bytes). The tag commit equals state.json commit, and listing/page/sourceRef/tag versions agree. Envelope presence only: no signature verification was performed.

A structural comparison of all 49 listing objects, after normalizing only generatedAt and the two allowed versions, equals main exactly. Uptime v0.5.5, Oncall v0.5.8, Orbit v0.4.5 and Spool v0.7.5 are unchanged. Every other version/status is unchanged. No wording or coming-soon copy was imported; seeds.ts, upcoming.ts, overrides and all marks/gallery/homepage assets are byte-identical to main. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent.

R3 MET — public data, local checks and production render

Commands: npm ci; npm run listings -- --check; npm run listings; git diff --exit-code; npm run type-check; npm run lint; npm run build; python3 /tmp/je-gate-browser.py head. All required commands passed. npm ci added 726 packages and ran the repository prepare hook. The mandated fleet hook installer was rerun afterward. Listing check reported “Listings current (49 seeds)” and generation “Listings unchanged (49 seeds)”; the tracked tree remained clean. Production build generated 61 pages. No full local test suite or sync campaign was run; the fixed gate did not authorize extra source/homepage inventory polling.

Before and after: 49 listings = 35 released + 14 coming soon. Public data, prose, pricing sources, assets and configuration are unchanged apart from the two version values and generatedAt. Pricing preservation is proven by the unchanged source and rendered-text comparison. The literal Assisted US$10/month and Managed US$100/month statements named by the brief are absent from home source and these two pages in both revisions; both pages instead display “MIT, 100% free”. No independent observation of those plan amounts is claimed. This round neither adds nor alters pricing, GST wording or billing-country restrictions.

Browser command serves each real production route, /lamp and /happytohelp, with the built Next server on own PID/localhost port 38127, using Playwright Chromium /usr/bin/chromium --no-sandbox, default isolated contexts, and no profile transplantation, route mocks or provider credentials. Automated version/HTTP/layout/exception assertions run at 1440 only. One full-page screenshot per candidate page was captured at 1440 and 390; matching baseline screenshots are also preserved. Both routes return HTTP 200, show the intended versions at both widths and have no page exceptions or page-wide horizontal overflow. Main was built on the same runner and checked with the same browser probe. The visible text differs only in versions and all measured layout values match at both widths. Intentional offscreen carousel slides are clipped within the carousel, not document overflow. Four candidate screens were visually inspected, with a baseline regression look on the same routes. All own browser/server processes were closed.

Applicable generator/lock/ledger review: git ls-tree plus AGENTS.md/package.json/scripts inspection found no home CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md, sources.lock.json, contract-docs generator or migration-ledger checker, and no documented Lander-Regenerate/lock command. Those seed-only steps are not applicable; no fictional command or source file was created. The applicable public listing generator was run independently and checked clean. D1 SQL migrations exist, but no migration-ledger checker is documented, and this version-only change does not alter migrations.

R4 MET — exact-head CI

Command: gh api "repos/just-every/home/actions/runs?head_sha=47e7f9a6c01147c49c6c39403db3bdd9442ad045&per_page=100". One observation only; no polling was needed. Push Verify branch run 43061634641 is completed/success on exactly 47e7f9a6c01147c49c6c39403db3bdd9442ad045: https://github.com/just-every/home/actions/runs/43061634641 . The same-head PR Verify run 43061663538 is completed/skipped because verify.yml excludes cloud/* PR events when push Verify handles them; it is not a red run. Same-head CodeQL PR #43 run 43061659612 is completed/success. No failed job logs, CI reruns or dispatches were requested. Nine gh calls in total, including the final PR recheck, are recorded in api-calls.json; each released-source list was read once.

R5 MET — claim honesty on the touched entries

Read the entire released CONTRACT source responses, extracted their status tables and matched all 20 JE promise ids plus summary/does copy to the appropriate source. claim-review.json lists every exact promise sentence, clause id, released status and gap; contract-status-tables.json preserves the tables in structured form. Four displayed promises map to done rows; sixteen map to partial rows. No source status is promoted by the listing version update.

lamp CONTRACT.md blob 30ea726f6b3295c6bb100fbb0015de3cd18b45e1, SHA-256 2dc299fabd2361bf0fc61199d664c27646c2b38cd1ccb50d50a7ee581382c33c; its first 16 hex digits exactly equal both main's and the candidate's recorded CONTRACT digest. Thus the new-tag contract content is identical to the contract source already recorded at the old displayed release. JE page prose is also exactly unchanged.

happytohelp CONTRACT.md blob dc29251bc6ee4b69de8ae440b3154a890a60db5b, SHA-256 ae8feea8b7998aa729edadf621d7f3809aa83bbe073fd3e053e1c1fb8b9b04ec; its first 16 hex digits exactly equal both main's and the candidate's recorded CONTRACT digest. Thus the new-tag contract content is identical to the contract source already recorded at the old displayed release. JE page prose is also exactly unchanged.

The known eight HappyToHelp partial promises (CONVERSATION-001, DELIVERY-001, OUTCOMES-001, AI-001, DELEGATION-001, CONNECTIONS-001, IDENTITY-003, PORTABILITY-001) and eight Lamp partial promises (INTAKE-002, INCIDENT-004, UPDATE-008, NOTIFY-009, PAGE-006, NOTIFY-004, MOVE-002, SUB-006) remain the pre-existing context explicitly excluded from new findings. Unasserted proof is not evidence of false implementation. No newly false claim on this touched surface was demonstrated. Terrace and Uptime prose is untouched and was not widened into a new audit.

Incumbent and proportionality

home has no Product target contract. For the released source claims, Lamp names Atlassian Statuspage, Better Stack Status Pages and Status.io; HappyToHelp names Zendesk, Intercom with Fin, Help Scout and Freshdesk (agent baseline Decagon/Sierra/Pylon). This sync changes public version facts and provenance, not either product’s incumbent behavior. The ordinary JE reader must see a real eligible release and its matching version without a page regression; those doors passed. No additional incumbent capability, source implementation test or held-out condition was added to the frozen rubric.

Standing bars: exact-head push Verify is green; no user-visible test was changed/deleted/weakened; the two version changes introduce no observed security, money, privacy or data-loss defect. New blocking A/B/BAR: 0. New follow-up C: 0. Clause status changes: none. Known partial clauses remain partial.

Execution notes and limits

The first browser harness used networkidle and timed out after 60 seconds before taking any screenshot. Its failure is preserved as head-browser.log and the failed checks.json row. The harness was corrected to wait for DOMContentLoaded and the visible version, without mocking network traffic or changing product source; head and main then passed. Local next start warns about output:standalone and logs a missing Worker caches global / unmigrated local analytics D1 table on both revisions. Those background analytics/token routes were not part of the version diff and did not prevent successful HTML rendering. Server logs are retained, and no deployed-provider behavior is claimed.

The mandated fleet/Husky hook chain emits a missing fleet-cloud-hooks/h diagnostic after checkout because Husky resolves its shim relative to the wrapper link. The checkout itself reached each intended SHA, verified before each run; no hook was disabled and no commit was created. This local setup diagnostic did not change the product tree or evidence identity. The final checkout is the exact candidate and clean. The Mac publication scan and eventual landing/deployment remain with the lane; this cloud gate does not certify those separate actions.

Builder acceptance mapping: the independent scope/source inspection covers the dry-sync proposed-change and copy/source-review intent without trusting the builder report; tagged Release/asset/tag/contract reads cover the two promotion points; listing generation/check and unchanged public data cover the public inventory/no-import points; type-check/lint/build and both real page renders cover the changed-tree checks. No independent claim is made that a fresh all-seed seeds:sync dry run had no drift: that builder operation is broader than this gate’s frozen touched-surface rows and would exceed the bounded API budget. Withheld marks/colours/stills/unreleased copy are preserved exactly as main, not newly imported.

Complete command results

- npm-ci: `timeout 600 npm ci` → exit 0, 23.528 s, head 47e7f9a6c01147c49c6c39403db3bdd9442ad045. Full output: npm-ci.log.

- listings-check: `npm run listings -- --check` → exit 0, 0.514 s, head 47e7f9a6c01147c49c6c39403db3bdd9442ad045. Full output: listings-check.log.

- listings-generate: `npm run listings` → exit 0, 0.479 s, head 47e7f9a6c01147c49c6c39403db3bdd9442ad045. Full output: listings-generate.log.

- generator-clean: `git diff --exit-code` → exit 0, 0.007 s, head 47e7f9a6c01147c49c6c39403db3bdd9442ad045. Full output: generator-clean.log.

- type-check: `timeout 300 npm run type-check` → exit 0, 5.303 s, head 47e7f9a6c01147c49c6c39403db3bdd9442ad045. Full output: type-check.log.

- lint: `timeout 300 npm run lint` → exit 0, 3.94 s, head 47e7f9a6c01147c49c6c39403db3bdd9442ad045. Full output: lint.log.

- public-data: `node --import tsx /tmp/je-gate-data.mjs` → exit 0, 0.391 s, head 47e7f9a6c01147c49c6c39403db3bdd9442ad045. Full output: public-data.log.

- production-build: `timeout 600 npm run build` → exit 0, 36.935 s, head 47e7f9a6c01147c49c6c39403db3bdd9442ad045. Full output: production-build.log.

- head-browser: `timeout 180 python3 /tmp/je-gate-browser.py head` → exit 1, 63.894 s, head 47e7f9a6c01147c49c6c39403db3bdd9442ad045. Full output: head-browser.log.

- head-browser-render: `timeout 180 python3 /tmp/je-gate-browser.py head` → exit 0, 7.84 s, head 47e7f9a6c01147c49c6c39403db3bdd9442ad045. Full output: head-browser-render.log.

- baseline-build: `timeout 600 npm run build` → exit 0, 28.795 s, head 464302fb78beebdfb13de67529124fb5602d88e8. Full output: baseline-build.log.

- baseline-browser: `timeout 180 python3 /tmp/je-gate-browser.py baseline` → exit 0, 5.932 s, head 464302fb78beebdfb13de67529124fb5602d88e8. Full output: baseline-browser.log.


The receipt files, public source observations and screenshots named in the evidence manifest are the actual outputs of this run. Product provenance is pinned in MECHANICAL.json; report transfer is separate. After evidence publication succeeds, delete the fresh clone and its node_modules, retaining this packet. No product READY line is emitted by an independent read-only gate.

GATE PASS 47e7f9a6c01147c49c6c39403db3bdd9442ad045
