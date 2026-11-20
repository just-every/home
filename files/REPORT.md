# je-gate-64: independent deciding gate of PR 80

Author: Run Edit Run fleet
Date: 2026-11-20T12:31:30Z

Decision: PR https://github.com/just-every/home/pull/80 may land at 868476d830f4153bdd8bbd1ca73a2cee55dc20be. No new blocking finding and no new copy follow-up. Gate only; no product changes, commits, pushes, PR actions, deployment or provider credentials were used. The sole write publication is the report-only evidence ref. The cloud adaptation's generic product-branch instructions do not apply to this fix-nothing gate.

Product branch: cloud/je-sync-54. No cloud/je-gate-64 product branch was created.
Baseline: 85540bca95af7ba648bd511bf58a8e9c17edd45f. Candidate: 868476d830f4153bdd8bbd1ca73a2cee55dc20be.
Public PR API and independent Git refs both identify this head and base. Remote main and PR head were rechecked after the render checks and remained unchanged.

## Plan and scope

PLAN.md records the execution plan: establish immutable head/base, inspect every diff hunk and candidate identity, independently resolve Oncall release/tag and source bytes, run only named checks sequentially, compare built /oncall against main at 1440 and 390, observe exact-head CI once, report and publish evidence, then remove the clone and dependencies. The inline builder brief and RULES were read as supplied, together with the checkout's AGENTS.md, package scripts, Verify workflow, listings generator and sync documentation/detectors. No helper agents were used. No full suite, scheduler, watcher, CI rerun or dispatch was used. Only owned server/browser processes were started and stopped.

This catalogue-maintenance gate has no JE clause promotion. Its fixed rubric is the acceptance boundary. The released Oncall contract names PagerDuty, Opsgenie / Jira Service Management and Splunk On-Call as incumbents. The JE copy explicitly describes coordinating alongside the existing pager; this gate adds no paging-delivery obligation.

## R1 — MET: scope, identity and each hunk

Commands: git diff --name-status origin/main HEAD; git diff origin/main HEAD; git diff --check; git log origin/main..HEAD with author, committer and unfolded trailers; credential-pattern inspection of the complete changed diff. Result: exactly three allowed paths, 12 insertions and 13 deletions. Both candidate identities satisfy fleet policy and the commit has no trailers. No credential-shaped added value. No test, assertion, workflow or executable implementation changed, so no user-visible flow test was removed, skipped or weakened.

* public/data/listings.json: generatedAt advances; Oncall v0.5.19 becomes v0.5.21. Every other listing field and listing is byte-equivalent when parsed.
* src/data/seed-pages.ts: exactly the Oncall version string changes. Summary, does, promises, SEO and all other seeds remain unchanged.
* scripts/seeds-sync/state.json: syncedAt advances. Oncall source commit, sourceRef and tag advance to the independently verified release; CONTRACT.md and seed.json hashes change, README.md hash remains the same. Lamp drops an open copy marker, Oncall adds that marker beside its retained bf4b3f38e1a2 marker. The only fingerprint change is Uptime's; Oncall's fingerprint is unchanged. No wording, mark bytes, colours, public asset or implementation status changes.

Marker proof from the committed tool: detectCopy using independently fetched Oncall tagged files and main's previous state emits summary “CONTRACT.md, seed.json changed since the last sync”, range 518317b385c4...33cafdc77501, key 922fed04eacf, apply=null. keyOf hashes type + summary, not seed identity; the same marker under two seeds does not represent a transferred claim. Lamp's current tagged CONTRACT.md hashes to d87c0980ff9dc859, matching its unchanged state. Its stored copy hashes already equal the current record: a fresh no-delta detectCopy emits no copy finding, and closeRecord drops the no-longer-current open marker. Oncall now has that same filename-change summary, so records it as open. The retained bf4b3f38e1a2 is the unchanged “no alternative to line found on the homepage” bookkeeping marker.

Fingerprint proof: compareSignatures(main.uptime.home.signature, head.uptime.home.signature) returns changedShare=0, changed=false. The small fingerprint differences do not pass the per-cell channel threshold; no visible-change finding or still update is indicated. The brief's contextual description calling this Oncall was inaccurate; the actual Uptime change is harmless observed-state bookkeeping. Full detector output is in SYNC-PROBE.json.

## R2 — MET: promotion truth

Commands: public HTTPS GET of the release endpoint once; git ls-remote for both annotated tags and peeled refs; HTTPS reads of CONTRACT.md, README.md and seed.json at both tags; parsed listing and state comparison.

Release: https://github.com/just-every/run-oncall/releases/tag/v0.5.21. Published 2026-11-20T11:53:45Z, draft=false, prerelease=false, with rer-release.dsse.json. Asset presence was checked; no signature verification is claimed.

v0.5.21 tag object d64013191039b85d20579f3699aaa2c2a0e22c28 peels independently to 33cafdc7750103f51ac4173c7b52c8dbcf1efbe0. v0.5.19 tag object 2345c090f5ffaf13c455d10cfa9780c266c6dd4f peels to 518317b385c4535599bfc670dd676da46069b451. State sourceRef/tag/commit agree with those refs; seed.json version is 0.5.21 and the public listings and JE page both use v0.5.21.

Independent SHA-256 prefixes match every Oncall provenance hunk:

| File | v0.5.19 | v0.5.21 |
| --- | --- | --- |
| CONTRACT.md | 831ba92eb6dc8bd2 | 7617e905d0abae0e |
| README.md | b2c25df447c4fbed | b2c25df447c4fbed |
| seed.json | b090e45599bc4e28 | c7510d2baa3cf6cd |

Only Oncall changes version. HappyToHelp v0.4.31, Lamp v1.11.24, Uptime v0.5.18, Orbit v0.4.12 and Spool v0.7.15 remain exact. No status changes, other listing differences or coming-soon wording imports. No RER catalogue judgment was made.

## R3 — MET: public data, named mechanical checks and render

Commands and results: npm ci (715 packages installed, exit 0); npm run listings -- --check (current, 49 seeds, exit 0); npm run listings (unchanged, 49 seeds, exit 0); npm run type-check (exit 0); npm run lint (exit 0); npm run build (exit 0); git diff --exit-code and git status --short (clean). Actual command logs and CHECKS.json are included. Runtime was Node v24.19.0 and npm 11.9.0; npm ci used the committed lockfile. No rer setup or provider account was required for this static catalogue.

Before and after: 49 listings = 35 released + 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent. Pricing preservation is verified by the complete diff: no pricing path or wording/value changed, and no tax or billing-country restrictions were introduced. The named Assisted US$10/month and Managed US$100/month statements are not present in this checkout on either head or main; this is a preservation conclusion, not a claim to have rendered those labels.

Built-route command: own Next production server on port 3180, Playwright Chromium at /usr/bin/chromium with --no-sandbox, route /oncall. Desktop public-door assertions run at 1440; screenshots and metrics also capture 390. Both return HTTP 200 with H1 Oncall and visible v0.5.21. Document widths are exactly 1440 and 390, with no horizontal overflow or browser page exception. Version text is fully inside the viewport. Candidate screenshots head-1440.png and head-390.png show the touched version facts region.

Main was built and rendered in the same clone sequentially, then the exact candidate was restored. Main shows v0.5.19, with identical version-box coordinates and dimensions at both widths and no page exception. Main screenshots and browser receipts are retained. No new layout regression is visible. The initial attempt waiting for networkidle timed out on the page's network activity; it was replaced by real DOM readiness, loaded fonts and the visible version condition. No network was mocked. Standalone local telemetry/token requests lack Cloudflare runtime state on both builds; they do not affect the touched page rendering and are not a candidate regression.

Applicability: home contains no CONTRACT.md, sources.lock.json, ACCEPTANCE.md or docs/CLAIMS.md, and AGENTS/package scripts document no source-lock, generated-contract-view or migration-ledger check. Those seed-specific regeneration requirements are not applicable to this JE static-listing gate. The applicable documented generated-data check and regeneration were independently run and stayed clean.

## R4 — MET: exact-head CI

One unauthenticated public REST discovery: GET https://api.github.com/repos/just-every/home/actions/runs?head_sha=868476d830f4153bdd8bbd1ca73a2cee55dc20be&per_page=100. Public reads used curl rather than an authenticated gh invocation so no credential was consumed before the evidence publication. Four public API calls total were used for PR, release and run metadata plus the final PR recheck; raw content and Git ref transport are separate. No polling was necessary.

Verify branch run 44733339123 is completed/success on exactly 868476d830f4153bdd8bbd1ca73a2cee55dc20be: https://github.com/just-every/home/actions/runs/44733339123. Also observed PR #80 run 44733379327 completed/success. The pull_request duplicate Verify branch run 44733382505 is completed/skipped, consistent with the workflow excluding duplicate cloud-branch PR verification; the successful push run supplies the bar. No green run from another SHA is substituted. No failed shard, rerun or log archive call was needed.

## R5 — MET: claim honesty

Commands: direct reads and full 119-line CONTRACT.md diff for v0.5.19..v0.5.21; tagged README.md and seed.json comparison; read JE Oncall summary, does and all ten promises; invoke committed detectCopy and compareSignatures as recorded above. All six Oncall public source URLs were readable; none of R1–R5 is NOT RUN.

seed.json differs only in version. README.md is byte-identical. CONTRACT.md adds native/observed evidence under OC-009, OC-023, OC-025, OC-050, OC-060, OC-061, OC-070, BASE-AGENT-002, BASE-AGENT-003 and BASE-AGENT-012; status-table changes add evidence citations to OC-021 and OC-022. No clause status, published promise or requirement is promoted. The existing published counts remain 19 done + 3 partial = 22, and all-clause counts 26 done + 41 partial + 34 missing = 101.

JE Oncall promises reference OC-012, OC-006, OC-005, OC-004, OC-008, OC-011, OC-003, OC-002, OC-021 and OC-022. Every referenced clause is done in the release's own status table. The sentences about paging off, approved signed response events, immutable copied runbooks, evidenced resolution, retained incident records, wall-clock rotations, role authority, zero-effect replay, reviewed move-in preview and preserving later edits on undo agree with the released source. No source-demonstrated false claim was found. Partial status of unrelated obligations alone is not proof these sentences are false. OC-009 accessibility, OC-014 previews and OC-018 installation remain partial; JE does not gain new guarantees from this version change.

The known Lamp and Uptime partial-evidence copy follow-ups remain unchanged. Exact sentences, clause IDs and current released-source gaps are in PREEXISTING.json and FOLLOW-UPS.md. These are retained context, not new findings or newly established security defects. Spool ERR-006, HappyToHelp's eight partial-evidence promises and Terrace trust wording were not touched and were not re-audited.

## Findings and landing

No A, B or BAR finding; no new C finding. No clause status changes. No product fixes. The gate does not merge, deploy, verify DSSE signatures or replace the lane's Mac publication and landing checks. LANDING-NOTES.md records the contextual fingerprint correction, existing local telemetry limitations and report-only custody. The final PR head/base check is recorded in RECEIPT.json. The fresh clone and node_modules are removed after evidence publication; report files remain under the task's work directory.

GATE PASS head=868476d830f4153bdd8bbd1ca73a2cee55dc20be
