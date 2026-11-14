je-gate-42 independent deciding gate — PR #58

UTC: 2026-11-14T15:51:03Z
Decision: may land; no reproduced introduced blocking issue or new C follow-up.
Repository: just-every/home
Candidate branch: cloud/je-sync-34
Candidate: de3a00a8e9a04dfb0227d48fcba7465d71896815
Baseline main / PR base: d91018b5eb84b95b8d44b54b03cf7374e9cde0a4
PR: https://github.com/just-every/home/pull/58
Both initial and final REST observations show this exact open PR head and base.
The review clone was fresh, shallow, filtered, and detached at the candidate. A local cloud/je-gate-42 was created from main for the launch contract; no product changes, commits, pushes, PR comments, merges or deployments were made. Only the separate report-only evidence ref is published. No provider credentials were used. No other repository was cloned; Oncall was read through gh api only.

Plan performed

1. Verify PR prerequisites, keep main for comparison, read repository AGENTS.md and inline builder/rules references, inspect every changed path/hunk and every candidate commit including parents.
2. Independently read the Oncall release once, peel its annotated tag through the API, read released CONTRACT.md / README.md / seed.json, compare public data, provenance and copy.
3. Install with npm ci; independently check and regenerate listings, verify no diff, then type-check, lint and production-build the exact head.
4. Exercise the real built /oncall and /data/listings.json doors, assert at 1440, capture candidate proof at 1440 and 390, compare baseline's built page at 1440, and read exact-head CI once. No dispatch, rerun, watcher or scheduler was used.
5. Record full results and actual receipts, publish an explicitly selected non-secret packet to evidence/je-gate-42, then delete the disposable clone and dependencies. Keep the packet and transfer receipt outside the clone.

Rubric results

| Row | Status | Commands / evidence and result |
| --- | --- | --- |
| R1 Scope | MET | git diff --name-only origin/main HEAD; git diff origin/main HEAD; git diff --check origin/main HEAD; git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"; independent JSON/source comparison and added-line credential-shape review. Exactly three allowed paths, 12 insertions / 12 deletions. One candidate commit, both identities Run Edit Run fleet <fleet@runeditrun.com>, no trailers, no side parents, no credential-shaped additions, no test change. |
| R2 Promotion truth | MET | gh api repos/just-every/run-oncall/releases/tags/v0.5.14; gh api repos/just-every/run-oncall/git/ref/tags/v0.5.14; gh api repos/just-every/run-oncall/git/tags/fde8016831d3587b636ebd256ce8c12f634f4848; gh api contents reads at the tag / exact peeled commit. Release is published, draft=false, prerelease=false; tag peels to 4d1fc62d4d2b8bf90008ac87bbaa626bc1a5494b. All three JE records agree. No other public seed field/version/status or wording changed. |
| R3 Data and render | MET | npm ci exit 0; npm run listings -- --check exit 0, current 49; npm run listings exit 0, unchanged; git diff --exit-code -- public/data/listings.json exit 0; npm run type-check exit 0; npm run lint exit 0; npm run build exit 0. Real production server HTTP /oncall and /data/listings.json both 200. Version v0.5.14 rendered at 1440 and 390; document and body widths equal viewport, no visible layout break. Candidate screenshots inspected; baseline production build and browser check pass at 1440, with equivalent layout and old version. |
| R4 Exact-head CI | MET | gh api 'repos/just-every/home/actions/runs?head_sha=de3a00a8e9a04dfb0227d48fcba7465d71896815&per_page=100' read once. Push Verify branch run 43610187411 completed/success on this exact SHA. PR Verify run 43610219228 completed/skipped by workflow's cloud-branch condition; dynamic PR #58 run 43610217217 completed/success. The push Verify is the successful gate evidence. No CI was dispatched or rerun. |
| R5 Claim honesty | MET | Read released Oncall CONTRACT.md status table and requirements beside the entire JE Oncall entry and built copy. No sentence shown false by that source. The ten JE promise IDs map to done published clauses; partial future/other-surface evidence alone is not a finding. All public wording remains byte-identical to main. |

Hunk accounting

- public/data/listings.json: generatedAt advances from 2026-11-14T09:48:38.555Z to 2026-11-14T15:22:04.359Z; only public entry change is Oncall v0.5.13 -> v0.5.14.
- scripts/seeds-sync/state.json: syncedAt advances from 2026-11-14T09:48:33.578Z to 2026-11-14T15:22:03.181Z. HappyToHelp's open marker [42983364b373] is removed. Oncall's commit/sourceRef/tag advance to the released source; README.md and seed.json provenance hashes change; CONTRACT.md provenance stays c04517abc904f1e5; Oncall gains open marker [42983364b373]. The detector hashes type:summary; 42983364b373 is SHA-256 prefix of "copy:README.md, seed.json changed since the last sync". These are provenance and finding markers, never page wording. No brand, mark or homepage observation changed.
- src/data/seed-pages.ts: only Oncall's version changes to v0.5.14; replacing it with v0.5.13 reproduces the entire baseline file exactly. No copy, CSS, component, gallery or pricing implementation changed.

Release provenance

Release URL: https://github.com/just-every/run-oncall/releases/tag/v0.5.14
Release id: 445286610; published 2026-11-14T12:38:51Z.
Annotated tag object: fde8016831d3587b636ebd256ce8c12f634f4848.
Peeled source commit: 4d1fc62d4d2b8bf90008ac87bbaa626bc1a5494b.
Asset: rer-release.dsse.json, id 747450536, 3185 bytes, published GitHub digest sha256:46986d1f204c9dbf75d079ed2a31aa4dac5de9f93edb67119b47b40b5e780798.
This verifies asset presence and metadata, not cryptographic DSSE signature verification. No signature-validity claim is made.
Independently downloaded source hash prefixes exactly match state.json: CONTRACT.md c04517abc904f1e5; README.md 03d11757d735563f; seed.json 0d887683acfe58be.

Before / after public data

| Item | Main | Candidate |
| --- | --- | --- |
| Total listings | 49 | 49 |
| Released | 35 | 35 |
| Coming soon | 14 | 14 |
| Oncall | v0.5.13 | v0.5.14 |
| Spool | v0.7.11 | v0.7.11 |
| Uptime | v0.5.11 | v0.5.11 |
| HappyToHelp | v0.4.26 | v0.4.26 |
| Orbit | v0.4.9 | v0.4.9 |
| Lamp | v1.11.15 | v1.11.15 |

Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent on both trees. No other seed version, status, copy or listing field changed. No coming-soon copy was imported. Pricing code/presentation is byte-identical to baseline, so this change does not alter the brief's Assisted US$10/month or Managed US$100/month terms. Neither paid label is on the Oncall detail page inspected; its existing licence line remains "MIT, 100% free". No paid-price display is claimed by this report.

Claims and incumbent

Oncall's Product target names PagerDuty, Opsgenie / Jira Service Management and Splunk On-Call (VictorOps). For this touched behavior, these products supply schedules, current/next coverage, overrides and incident coordination. JE explicitly describes alongside-pager use; this gate does not require its native paging destination contract to be complete before a truthful coordination listing update can land.

The JE statements reviewed, with their published clause IDs:

| Clause | Exact JE promise sentence |
| --- | --- |
| OC-012 | Oncall sends no texts, calls or push alerts, so your existing pager stays in charge while you use it. |
| OC-006 | Oncall sends signed response events only to endpoints an administrator approves; paging stays off, and email is for sign-in links only. |
| OC-005 | A runbook is copied into the incident when it is declared, so later edits never rewrite instructions mid-incident. |
| OC-004 | Resolving an incident needs recovery evidence and a summary, and every change is recorded in an attributed timeline. |
| OC-008 | Incident records you write are never deleted automatically. |
| OC-011 | Rotations hand over by wall-clock time in your named zone, and clock-change gaps show up as visible gaps. |
| OC-003 | Viewers can only read, responders coordinate, and admins manage; alert-sending credentials grant no read access, and removed access stops on the next request. |
| OC-002 | Replaying alert routing only reads: it creates no alert, incident or outside effect. |
| OC-021 | A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused. |
| OC-022 | A move-in can be undone, and edits you made afterwards are kept rather than overwritten. |

All ten are done in the released source status table. Summary/does bullets also align with OC-001, OC-004/005, OC-011 and OC-020/021/022. No clause statuses were changed or promoted. Known pre-existing C follow-ups named in the brief were preserved and not reopened as findings.

Independent evidence applicability and public doors

home has no CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md, sources.lock.json, contract-docs generator, documented source-lock regeneration command or migration-ledger check. AGENTS.md declares none. Those seed-only generator/lock/ledger steps are not applicable to this JE repository; no seed source was edited or cloned. The applicable generated-data check, listings, was independently checked and written without diff. Local D1 schema setup (npm run db:migrate:local, exit 0) applied the repository's existing five migrations to disposable local storage only, to serve the real page.

Builder end-state points were probed proportionally through the frozen rows: point 1 via fresh clone/npm ci and inspection of actual sync source/state; point 2 via exact released source hashes and rendered unchanged copy; point 3 via public Release/tag truth and public listing data; point 4 via independent listings write/check/no-diff; point 5 via type-check/lint/build and the production HTTP/browser doors. The builder's broad all-seed sync campaign was not repeated: that is historical builder execution context, not an additional frozen gate obligation. No source-lock or migration check was invented.

Findings and execution notes

No A, B or BAR findings. No new C finding. No blocker. No clauses moved.
OUT OF SCOPE D: The local Node production server's background token request logs "caches is not defined" and returns 502 on both candidate and baseline. The Oncall page itself returns 200, renders the version and has no page exception. This is a reproduced pre-existing local Cloudflare-runtime mismatch outside the version diff, not an introduced regression.
NOTE F: The gate's first data-helper expectation mistakenly labeled the removed marker as Inkwell. The actual structured diff identified HappyToHelp. Only the external gate helper was corrected; its first failed receipt is retained and the corrected independent comparison passes.
NOTE G: The first browser attempt waited for networkidle and timed out after 60 seconds. The completed probe waits for the real document, rendered version and fonts instead. Named render/layout assertions are unchanged; both attempts and server logs are retained. No application code or network mock was used.
NOTE G: The supplied fleet symlink hooks report a missing sibling "h" from Husky on post-checkout after dependency setup. Git did switch to the requested commits, which were verified by full SHA. No product commit was attempted; hooks were not disabled. This affects the disposable gate checkout, not candidate behavior or CI.

CI URLs

- Verify branch push, completed/success: https://github.com/just-every/home/actions/runs/43610187411
- PR #58 dynamic, completed/success: https://github.com/just-every/home/actions/runs/43610217217
- Verify branch pull_request, intentionally skipped: https://github.com/just-every/home/actions/runs/43610219228

Nine gh API calls were used, within the ten-call budget. There was one exact-SHA CI discovery and no polling because it was already complete. No failed job needed a log-archive call. Full local suite / deploy / cryptographic envelope verification / Mac publication scan were not run: the first three were outside the frozen checks, and the Mac publication/landing stage remains the lane's responsibility. All R1-R5 checks were completed; none is NOT RUN.

Custody

Candidate checkout is clean and restored to de3a00a8e9a04dfb0227d48fcba7465d71896815. Browsers and only the servers started by this gate were closed by their recorded PIDs; subreaper commands completed. Complete actual non-secret report/source/command/browser receipts are retained in this packet. Publication goes only to refs/heads/evidence/je-gate-42 with a report-only tree; this does not signal product READY, acceptance, landing or deployment. The product clone and its node_modules will be removed after verified evidence transfer; the external packet remains.

Evidence return verification: the initial 42-file packet was independently fetched from exact evidence head 125c2d4bc1f5913069c8b805fd98394aed9aa680; every manifest entry, Git blob and byte/hash matched the retained packet. EVIDENCE-TRANSFER-RECEIPT.json contains that actual transfer receipt. The final evidence revision includes that receipt as file 43.
