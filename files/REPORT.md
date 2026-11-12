# je-gate-30 independent deciding gate

Decision: PR #46 may land under the lane's existing publication, merge and deployment custody. R1–R5 are MET. No new blocking finding or follow-up was identified. No product file, contract judgment, commit, branch on GitHub, PR, deployment or provider resource was changed by this gate.

- Repository: just-every/home
- PR: https://github.com/just-every/home/pull/46
- Candidate branch: cloud/je-sync-22
- Exact candidate: 876d1edb1024b65d722eff36a2182193a2aa34f0
- Baseline and still-current PR base/main: 4c5444b557b0a2f6fbafcc6612572fa12f0ed7d5
- Counts before and after: 49 total = 35 released + 14 coming soon.
- Clause status changes: none. No clause was promoted or demoted.
- New findings: 0 blocking, 0 follow-up. Known pre-existing copy/evidence follow-ups remain outside this decision.

## Plan and execution boundary

1. Set the required fleet identity. Inspect and refresh the authorized cloud launcher, then install the decrypted-bundle Git helper and credential URL cleanup. The first refresh attempt was rejected by automatic approval review as inconsistent with the historical gate mechanics. After reading refresh.sh and documenting the explicit cloud setup/evidence authorization, the same refresh was approved and completed. No credential value was printed or selected for evidence.
2. Read the shipped RULES.md and builder brief inline, launcher AGENTS.md and checkout AGENTS.md. Clone only just-every/home with `git clone --depth 1 --filter=blob:none`. Configure local fleet identity. Preserve origin/main, create the requested local cloud/je-gate-30 branch from main, fetch pull/46/head at depth 2, then detach at the pinned candidate for testing. No product commit or push is appropriate for this read-only gate.
3. Confirm PR head/base, compare all three changed files and every candidate commit, inspect the sync implementation's provenance/open-marker behavior, and perform structural data comparisons.
4. Read each seed's releases once and CONTRACT.md at its new release tag using gh api only. Resolve all three annotated tags and recheck PR custody in one final GraphQL API request. Other repositories were not cloned or written.
5. Run npm ci, the listings check and write, type-check, lint and production build on the candidate. Exercise the built JSON and seed-page public HTTP doors. Build a temporary baseline worktree sharing the installed dependencies and compare the same screens. Assert page behavior at 1440; capture/review candidate visual proof at 1440 and 390.
6. Read exact-SHA Verify once, retain reports and actual receipts outside the clone, publish only the evidence/je-gate-30 ref using cloud_evidence.py, then remove the gate's temporary checkouts and dependencies. No product READY or landing claim is made.

No rer setup/build, full local test suite, sync-wide provider reads, workflow dispatch/rerun, account-provider access, watchers, schedulers, broad process kills, Mac paths, INBOX.md or STATE.md reads/writes were needed. Long-lived build/browser/server commands ran through cloud_run; browser used /usr/bin/chromium with --no-sandbox and closed normally. Only the two server PIDs started here were stopped (1388 and 1644); both subreaper sessions finished after SIGTERM.

## R1 — MET: scope, identity and every hunk

Commands: `git diff --stat origin/main HEAD`, `git diff origin/main HEAD`, `git diff --check origin/main HEAD`, `git rev-list --parents origin/main..HEAD`, and `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"` (also recorded commit SHA and full message). Results: exactly three paths, one candidate commit directly parented by the baseline, no side parent, no whitespace errors, no test touched/deleted/weakened. Author and committer are both Run Edit Run fleet <fleet@runeditrun.com>; no trailers. Added lines were checked for GitHub/AWS/private-key/credential-URL shapes with no matches and manually reviewed. This is diff hygiene, not the Mac publication scan.

Every hunk is explained in candidate.diff and data-receipt.json:

- public/data/listings.json: generatedAt changes from 2026-11-12T06:45:51.234Z to 2026-11-12T11:45:53.358Z; HappyToHelp v0.4.21 → v0.4.22, Oncall v0.5.8 → v0.5.9, Spool v0.7.6 → v0.7.7. Each of these entries differs in its version field only.
- scripts/seeds-sync/state.json: syncedAt advances. HappyToHelp's commit/sourceRef/tag advance to its new release; README.md and seed.json copy hashes change; its CONTRACT.md hash is unchanged. Oncall and Spool commit/sourceRef/tag and all three copy-file hashes advance. The HappyToHelp open marker 42983364b373 is the tool's SHA-256 prefix for `copy:README.md, seed.json changed since the last sync`; Oncall/Spool c843303a1181 is the prefix for `copy:CONTRACT.md, README.md, seed.json changed since the last sync`. Uptime's old open marker 64cb07f6a0dd is removed. It is unresolved-finding bookkeeping only: no Uptime version, source pin, brand, homepage or wording changes. detect/index.mjs closeRecord rebuilds the open set from findings not applied (or unions it in copy-only mode); these opaque IDs are not copy. All state changes are provenance, timestamps or open-marker bookkeeping. Brand tokens, mark hashes, stored home headlines and fingerprints remain unchanged.
- src/data/seed-pages.ts: exactly the same three version substitutions. Replacing only those old version literals in the baseline produces the candidate file byte-for-byte. Summary, does, promises, move-in, SEO and all other wording remain unchanged.

## R2 — MET: release and version truth

Commands, one releases read each: `gh api 'repos/just-every/run-<seed>/releases?per_page=100'` with projection to release metadata/assets; `gh api 'repos/just-every/run-<seed>/contents/CONTRACT.md?ref=<tag>' -H 'Accept: application/vnd.github.raw+json'`; one final `gh api graphql` resolves all three refs and PR/main custody. Complete selected metadata and tag/PR response are retained in the packet.

| Seed | Before → after | Published (UTC) | Annotated tag peeled commit | Release |
| --- | --- | --- | --- | --- |
| Spool | v0.7.6 → v0.7.7 | 2026-11-12T09:07:23Z | 26d13d4f574298851f25778818c1af0b9b2a2386 | https://github.com/just-every/run-spool/releases/tag/v0.7.7 |
| Oncall | v0.5.8 → v0.5.9 | 2026-11-12T09:04:59Z | 59af2f80bb67eb3382828f5c736698491006254c | https://github.com/just-every/run-oncall/releases/tag/v0.5.9 |
| HappyToHelp | v0.4.21 → v0.4.22 | 2026-11-12T07:26:55Z | 4dee2432081a64cee0bd12c59a31cb84371c3ab3 | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.22 |

All three matching releases have draft=false and prerelease=false and an uploaded rer-release.dsse.json asset. This proves asset presence only; no signature verification was performed or claimed. All three tag commits equal state.json's pins; all three tagged CONTRACT.md SHA-256 prefixes equal state.json's copy hashes. listings.json, seed-pages.ts and state.json agree on versions. Every other seed's version and status remains unchanged, including Uptime v0.5.7, Lamp v1.11.12 and Orbit v0.4.6. No coming-soon copy or status change was imported.

## R3 — MET: public data, local checks and production render

| Command | Result | Receipt |
| --- | --- | --- |
| npm ci | exit 0; 726 packages added | npm-ci.log |
| npm run listings -- --check | exit 0; Listings current (49 seeds) | listings---check.log |
| npm run listings | exit 0; Listings unchanged (49 seeds), no diff | listings.log |
| npm run type-check | exit 0 | type-check.log |
| npm run lint | exit 0 | lint.log |
| npm run build | exit 0; all static seed routes generated | build.log |
| npm run build on baseline worktree | exit 0 | main-build.log |
| git status --porcelain after checks/build/public-door probe | empty | public-door-receipt.json |
| cloud_run node ../packet/browser-probe.mjs | exit 0 | browser-receipt.json, browser.log, PNGs |

Runtime: Node v24.19.0; no Node/pnpm pin is declared; the prescribed toolchain selected fallback pnpm 10.12.4 (npm is the checkout's package workflow). The exact-head CI uses Node 22 and passed independently.

A direct GET of the production `/data/listings.json` returned 200 with bytes equal to the committed file (SHA-256 099a116e7f976e9c0d75214587b7690798d8dfd965b71402852f26d6694554ee). Structural comparisons prove 49 = 35 released + 14 coming soon and Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen absent. No field except the three versions and generatedAt changed in public data. All public prose and all files outside the three-path diff are identical to baseline, so no price, tax or billing-country wording was altered. The rubric's historical Assisted US$10/month / Managed US$100/month labels are not present in this baseline or candidate source; this gate confirms pricing invariance and does not claim those offers are rendered on the tested pages.

Built routes `/spool`, `/oncall`, `/happytohelp` and the real `/uptime` slug returned 200 with the expected headings and versions. At 1440 the probe asserts those outcomes, no document overflow and no page errors for both baseline and head. Candidate visual proof at 1440 and 390 shows the three updated versions and unchanged Uptime v0.5.7; all observed document/body widths equal their viewports and no page errors were recorded. Main and head screenshots were inspected: no new clipping or layout break. These are real local production pages, not mocks. Videos were paused for screenshots; playback/provider delivery is outside this version-sync round.

The initial probe waited for networkidle and timed out on baseline /uptime, which has media traffic. The retained initial log records that harness timeout; switching the wait to DOM content, rendered facts and ready fonts allowed the complete probe to pass. No product file changed to accommodate it.

Independent generation applicability: this home checkout has no CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md, sources.lock.json, documented source-lock generator, contract-view generator or migration-ledger check. Those seed-specific steps are not applicable. Its documented public listings generator write and check both ran independently and left a clean tree. No generated view was committed. No permanent test was added or changed.

## R4 — MET: exact-head CI

Command: `gh api 'repos/just-every/home/actions/runs?head_sha=876d1edb1024b65d722eff36a2182193a2aa34f0&per_page=100'` with run metadata projection. Read once; no polling, rerun or dispatch. ci.json retains all results.

- Verify branch, push run 43212634338: completed/success on exact head 876d1edb1024b65d722eff36a2182193a2aa34f0, https://github.com/just-every/home/actions/runs/43212634338 . This is the required green run.
- Verify branch, pull_request run 43212715418: completed/skipped. The workflow deliberately skips its PR job for cloud/* heads, where the push run supplies Verify; this skipped duplicate is not used as success.
- Dynamic PR #46 run 43212709804: completed/success on the same head; supplementary, not substituted for Verify.

No failed-job archive was needed. Total GitHub API calls: 9 (PR 1, releases 3, tagged contracts 3, exact-head runs 1, final GraphQL custody/tags 1); no GitHub API loop.

## R5 — MET: claim honesty

Read all three release-tagged contract status tables and the JE entries' summary, does and every promise. claim-review.md retains each exact promise sentence, clause ID, status/gap and relevant released requirement/acceptance body; je-copy.json preserves the complete three JE entries. Partial evidence alone was not treated as false implementation. No new false claim was established by these releases' own source.

- Oncall: OC-012, OC-006, OC-005, OC-004, OC-008, OC-011, OC-003, OC-002, OC-021 and OC-022 are done at v0.5.9; their requirements align with the retained coordination, paging-off, approved endpoint, calendar, read-only replay and reviewed/paused import copy. Its named incumbents are PagerDuty, Opsgenie/Jira Service Management and Splunk On-Call.
- Spool: displayed ERR-003, ERR-004, ERR-002, ERR-006, ERR-007 and ERR-008 are done at v0.7.7. The known ERR-006 broad "only ... later release" wording still omits the released clause's plain-Resolve next-event behavior. The exact existing sentence and exception are retained in FOLLOW-UPS.md; this is explicitly pre-existing in the frozen brief, not a new finding. Its named incumbents are Sentry, Datadog Error Tracking, Rollbar and Bugsnag.
- HappyToHelp: MOVE-IN-001 and REPORTS-001 are done; CONVERSATION-001, DELIVERY-001, OUTCOMES-001, AI-001, DELEGATION-001, CONNECTIONS-001, IDENTITY-003 and PORTABILITY-001 remain partial. Their recorded gaps principally state missing carried assertions/qualification; they do not by themselves prove the corresponding retained promise false. These are exactly the known eight follow-ups, not eight new findings. CONTRACT.md's content hash is unchanged across the candidate's pin update. Its named incumbents are Zendesk, Intercom with Fin, Help Scout and Freshdesk (agent baseline Decagon, Sierra and Pylon).

The home repository has no Product target contract. The release contracts' named incumbents were used only to understand the corresponding listing copy; no broader product audit or new acceptance bar was introduced. Known Terrace/Uptime/Lamp copy follow-ups are untouched and were not widened into this gate.

## Findings, custody and limits

No A, B or BAR finding. No new C finding. FOLLOW-UPS.md records only the explicitly known pre-existing copy/evidence follow-ups; LANDING-NOTES.md records evidence limits and remaining lane custody. No source-lock/view exception or stale-listings refusal is needed.

The only remote mutation authorized for this gate is the separate report-only evidence/je-gate-30 ref. The product checkout remains detached at the candidate and clean until cleanup; local cloud/je-gate-30 was created from baseline only and is never pushed. The existing PR remains open. Mac publication scan, lane merge and deployment/live-site custody remain with the fleet. Evidence publication is not product READY, acceptance or landing.

Verdict: GATE PASS for 876d1edb1024b65d722eff36a2182193a2aa34f0.
