# je-gate-47 independent deciding gate — PR #63

Author: Run Edit Run fleet. Report time: 2026-11-15T22:27:27Z (from `date -u`).

Decision: the specified candidate may land under the frozen rubric. No reproduced A, B or standing-bar regression; no new C follow-up. One pre-existing copy precision issue is tier D. Gate work made no product changes, commits, pushes, PR comments, merges, CI dispatches or deployments. Only the explicitly authorized evidence ref is published.

Candidate branch: `cloud/je-sync-39`.
Head: `0656778f51b9191393e035773150eaf0f218293e`.
PR: https://github.com/just-every/home/pull/63.
Baseline main and PR base: `2edf0e10aa92711884a2cdbdcf66d383233870c9`.
The initial PR REST response and final Git ref probes agree on these full SHAs. The PR was open, non-draft and mergeable. Local `cloud/je-gate-47` was created from main as requested by the cloud wrapper but is not a product candidate and was not pushed. The final report manifest names the actual gated product branch and head. No READY claim for a gate branch is made.

## Full plan and execution boundaries

The complete step-by-step plan is PLAN.md. It establishes the exact PR/base, reviews all hunks and identities, independently resolves release sources, checks claim truth, runs only the frozen mechanical checks, compares production screens with main, reads exact-head CI once, and publishes selected public report artifacts before removing the clone. All heavy commands ran one at a time in this dedicated VM through cloud_run; no full suite, watchers, schedulers, external account actions or mock application routes. API authentication used only the refreshed fleet bundle without logging its values. Other product repositories were read through gh api and Git ref probes, never cloned or modified. No helper agents were used. Historical builder evidence was context, not proof.

## Frozen rows

| Row | Result | Independent command / observation |
| --- | --- | --- |
| R1 Scope | MET | `git diff --name-only baseline-main HEAD`, full `git diff baseline-main HEAD`, `git diff --check baseline-main HEAD`, `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`; exactly the three allowed paths, clean whitespace, one fleet-authored and fleet-committed candidate, no trailers, no credential-shaped addition, no test changes. Scope/data receipt and candidate.diff retain the complete result. |
| R2 Promotion truth | MET | `git ls-remote` for both annotated release tags; one `gh api repos/just-every/run-<slug>/releases/tags/<tag>` each; a batched `gh api graphql` read of both releases' old/new copy files. Both published Releases are non-draft and non-prerelease with rer-release.dsse.json; exact peeled commits, versions and all six new copy hashes agree with JE. Only the two requested version fields change in public listings; no other version/status/wording changed. |
| R3 Public data and render | MET | `npm ci` exit 0 (726 packages); `npm run listings -- --check` exit 0, current 49; `npm run listings` exit 0, unchanged; `git diff --exit-code` exit 0; `npm run type-check`, `npm run lint`, `npm run build` all exit 0. Real built `/uptime` and `/oncall` return 200 and the right versions at 1440 and 390. Assertions run at 1440; 390 is recorded visual proof. Both widths have document/body width equal to viewport, no page exceptions. Baseline production build and the same four screens also pass. |
| R4 Exact-head CI | MET | Once: `gh api 'repos/just-every/home/actions/runs?head_sha=0656778f51b9191393e035773150eaf0f218293e&per_page=100'`. Push Verify branch run 43767367492 is completed/success on that exact SHA. PR Verify 43767437617 is skipped by the existing cloud-branch guard; it is not used as green proof. Dynamic PR run 43767433525 is completed/success. No dispatch, rerun or polling was needed. |
| R5 Claim honesty | MET | Independently read every new release status row, the JE entries and old/new CONTRACT.md, README.md and seed.json via gh api; retained source SHA-256 and blob IDs, source diffs, complete status receipts and named clause excerpts. No newly false public promise is demonstrated. Known partial-evidence promises remain limitations, not asserted falsehoods. The pre-existing OC-021 wording precision issue is D below. |

No required R1–R5 check remains NOT RUN. Envelope asset presence is established; no signature verification is claimed. The Mac publication scan, merge, deployment and live-site verification remain the lane's landing work, outside this cloud gate.

## Every changed hunk

- `public/data/listings.json`: generatedAt advances from 2026-11-15T16:24:40.689Z to 2026-11-15T22:04:08.175Z; Oncall v0.5.15 → v0.5.16; Uptime v0.5.12 → v0.5.13. All remaining listing objects compare equal. No status change.
- `src/data/seed-pages.ts`: the same two version strings only. All summaries, does/promises, import names, installation wording and run locations compare unchanged. No coming-soon copy imported.
- `scripts/seeds-sync/state.json`: syncedAt advances from 2026-11-15T16:24:37.661Z to 2026-11-15T22:04:04.699Z. Oncall source commit 44ca722b6a5dde173b5253df7b5e0eab762df459 → 7f250f7e66f1377f7b4b773effd1c72e8854c025, sourceRef/tag v0.5.15 → v0.5.16; only its seed.json copy hash changes (1e3e511472c20faa → 130f81940ec475b7). Uptime source commit 2045014b15f76380b5d7493c0c42b2caa430f88b → c1e8376c7dfd6ed601b6fe993567237449fc7143, sourceRef/tag v0.5.12 → v0.5.13; copy hashes CONTRACT.md 15145d9425bbeedd → bc8396eb9509cf77, README.md 4deebb00bd0bdecd → 3dcae3939be7cacb, seed.json 27e772552d622f63 → 71f59345e2c02e14. sourceReason, brand tokens, mark hashes, home headline/fingerprint and every other source pin are unchanged.
- State open markers: Lamp and Spool lose `64cb07f6a0dd`; Orbit loses `922fed04eacf`; Oncall changes `42983364b373` to `64cb07f6a0dd`. These are not globally assigned issue IDs or clause judgments. `detect/index.mjs:18` computes the first 12 SHA-256 hex characters of `type:summary`: `64cb07f6a0dd` = `copy:seed.json changed since the last sync`; `922fed04eacf` = `copy:CONTRACT.md, seed.json changed since the last sync`; `42983364b373` = `copy:README.md, seed.json changed since the last sync`. The same summary under different seeds intentionally has the same key. closeRecord at lines 127–134 retains unapplied findings, unions earlier markers for copy-only apply, and replaces them with current findings in full apply. The apparent move is per-seed detection bookkeeping: Oncall's independently read new seed.json changes only its version. Marker removal does not establish that a historical copy concern was fixed, and no public wording or clause status was changed to claim that.

## Release and source truth

| Seed | Published release | Peeled source commit | Envelope asset |
| --- | --- | --- | --- |
| Uptime | https://github.com/just-every/run-uptime/releases/tag/v0.5.13 — 2026-11-15T21:06:58Z | c1e8376c7dfd6ed601b6fe993567237449fc7143 | rer-release.dsse.json, 3381 bytes |
| Oncall | https://github.com/just-every/run-oncall/releases/tag/v0.5.16 — 2026-11-15T21:07:22Z | 7f250f7e66f1377f7b4b773effd1c72e8854c025 | rer-release.dsse.json, 3185 bytes |

Annotated tag objects are respectively c9e057deaec4a1ba0c22407a813d7a9953ead196 and d1081601ecd84d9f30e52eae7c36b2382f2e31e8. Tag peeling, not the Release target_commitish string `main`, establishes the exact source commit. All recorded copy-file hashes match SHA-256 prefixes computed over independently fetched tagged file bytes. listings.json exposes versions, not commit fields; state.json carries their exact source pins, and tagged seed.json agrees on version.

Oncall CONTRACT.md and README.md are byte-identical between releases; seed.json changes only 0.5.15 → 0.5.16. Uptime CONTRACT.md changes only PUBLIC-002's evidence citation, not Requirement, Status or Gap; README adds installer/Node guidance, current private-runner join instructions, local doctor behavior and fresh-second-factor/export guidance; seed.json changes the version, raises production/development asset rate budgets from 600/1800 to 12000 and documents caching/estimation. None of that source drift contradicts the unchanged JE promises. No release implementation-status promotion is inferred.

## Counts, withholds and pricing preservation

Public counts before and after: **49 = 35 released + 14 coming soon**. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. HappyToHelp remains **v0.4.28**; its tag-only v0.4.30 is not imported. No other listing differs, including wording and status. RER's external catalogue drift is not a finding in this JE gate and was not used as promotion authority.

Pricing statements are untouched: no pricing path or pricing text occurs in the diff. The rubric's Assisted US$10/month and Managed US$100/month strings are not present in this checkout's tracked JE text, either on main or head; this result establishes no pricing change, not an independent check of external RER pricing. Screens still state MIT, 100% free for the seeds. No GST or billing-country wording is added.

Clause-status counts in the released sources are unchanged: oncall {"done": 26, "missing": 34, "partial": 41}; uptime {"done": 37, "missing": 20, "partial": 58}. No clause judgment is edited in Home or either source repository.

## Claim comparison and incumbent boundary

Uptime's Product target names Pingdom (SolarWinds), UptimeRobot, Better Stack Uptime and Site24x7; Oncall's names PagerDuty, Opsgenie/Jira Service Management and Splunk On-Call (VictorOps). For this catalogue behavior, the buyer sees the actual released version and retained product description. This gate does not demand new provider capabilities or accepted incumbent parity from a version-only sync.

JE's ten Uptime promise IDs were compared with STATE-001, EVIDENCE-001, NOTIFY-001, DELIVERY-001, DRILL-001, TLS-001, MAINT-001, ARCHIVE-001, NETWORK-001 and ERASURE-001. STATE-001 and NETWORK-001 remain partial for explicit evidence gaps; the rest are done in the released status table. In particular the exact sentences “One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks.” (STATE-001) and “Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected.” (NETWORK-001) remain pre-existing partial-evidence promises, not new source-demonstrated falsehoods.

JE's ten Oncall promise IDs OC-012, OC-006, OC-005, OC-004, OC-008, OC-011, OC-003, OC-002, OC-021 and OC-022 all remain done in the released table. Paging OFF, admin-approved signed response events, copied runbooks, recovery evidence, retention, wall-clock handover, roles, read-only routing replay and reviewed inactive/undoable imports agree with the named source requirements. No new text or authority is imported.

OUT OF SCOPE D: OC-021's exact JE sentence is “A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused.” Released CONTRACT.md:269 specifies zero native objects but explicitly retains upload custody, plan snapshots and grant/bookkeeping rows. “Writes nothing” is therefore too broad if read literally. The identical sentence is present on baseline main, and the identical contract is in Oncall v0.5.15; the release bump introduces neither this precision issue nor a new data effect. This is not a C introduced by this candidate and does not alter the verdict. See FOLLOW-UPS.md.

Existing HappyToHelp eight partial clauses, Terrace trust wording, Uptime/Lamp partial-evidence promises and Spool ERR-006 remain the lane's existing follow-ups. They were not expanded into fresh blockers or rewritten.

## Production browser evidence and regression look

The browser driver used installed Playwright with /usr/bin/chromium, headless and --no-sandbox, ordinary isolated contexts and real HOME. It served the actual Next production build locally, without provider credentials or fakes. Each candidate page was captured once at 1440 and 390. The same production build and probes ran on baseline main, then the clean checkout returned to the exact candidate. Source diff and all eight visually inspected images show the expected version change with preserved layout. At both widths document and body scroll widths equal the viewport, correct heading/version appears once, and page exceptions are empty. Mobile gallery peeking and media loading spinners are also on baseline, with no introduced layout break. Candidate server PIDs 1291 (first attempt) and 1524, and baseline PID 1931, were stopped by the driver's finally block; all browser instances were closed.

NOTE F: The initial browser harness waited for global networkidle and timed out on /uptime while the page carries continuing media/analytics requests. That first attempt and cleanup are retained. The corrected readiness criterion waits for DOM content, fonts and the actual version element; it passes on head and baseline. Navigation can abort background analytics/events/tokens requests on both heads; the receipts retain those observations. These are not failed named acceptance assertions or CI failures.

## Independent-evidence applicability and builder-point coverage

Home is the static Next site, not either seed. `rg --files` and AGENTS.md show no Home CONTRACT.md, ACCEPTANCE.md/docs/CLAIMS.md generator, sources.lock.json or documented source-lock command, or migration-ledger checker. Those seed-only generator/ledger steps are **not applicable**; no view or lock was changed or committed. Home has D1 runtime migration commands, but this diff changes no migration/data schema; using provider credentials or applying remote migrations would violate this gate. The documented relevant generated catalogue door was independently checked and regenerated with no diff.

Builder point 1 is covered proportionally by fresh exact baseline/head, sync implementation/provenance review and independent release/source reads; a full seeds:sync crawl is not added beyond the frozen gate or the API budget. Point 2 is covered by source/copy-hash and claim comparison. Point 3 is covered by actual release/tag checks and unchanged public data/status/exclusions. Point 4 is covered by listings check, regeneration and semantic equality. Point 5 is covered by scope, type-check, lint, production build and real public page probes. Builder receipts are not required inputs to this decision.

## API use and custody

Five gh calls total: PR metadata (1), Uptime Release (2), Oncall Release (3), exact-head run discovery (4), batched source GraphQL (5). No CI polling, log archive read, rerun or dispatch. Git ref reads/fetches remained the primary ref transport. No API rejection occurred.

Actual reports, receipts, diff, source excerpts and eight screenshots are explicitly selected for report-only publication. No credential file, environment dump, private held-out gate data, symlink or raw signed URL query is selected. Product HEAD/index/worktree are checked unchanged before and after publication. Final Git ref custody is saved in final-product-refs.txt. No product commit was created, so cloud commit hooks/product push guard were not exercised by this gate. The evidence-only publisher sets fleet identity and inspects its report commit identities/trailers before its separate push. The fleet still owns the required Mac publication scan and PR landing.

No blocker remains in this gate. The complete actual receipts are in this packet; publication verification and clone-removal custody are recorded outside the selected immutable packet after transfer.

GATE PASS head=0656778f51b9191393e035773150eaf0f218293e
