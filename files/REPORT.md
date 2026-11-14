# je-gate-41 independent deciding gate

Report time: 2026-11-14T10:17:05Z. Verdict: PASS, with zero new blocking findings and zero new C follow-ups. PR #57 may proceed to the fleet's remaining landing controls.

Repository: just-every/home. PR: https://github.com/just-every/home/pull/57. Candidate branch: cloud/je-sync-33. Exact candidate: 17b30cd333dbc7f0732b0d5c0b30fc6596836aa5. Required baseline and current PR base: 1faa377be04206d8423fdd1c1c39da28a87b1199. Both prerequisites matched at entry and at the final Git/REST read. The PR remains open. No replacement head was judged.

This was an independent gate: no builder receipt or evidence ref was used as proof. The shipped builder brief and RULES.md were read inline. Launcher AGENTS.md, JE AGENTS.md, sync documentation, generator and relevant source were read. A fresh shallow filtered clone retained origin/main and fetched pull/57/head; checks ran detached at the exact candidate. The local cloud/je-gate-41 branch was created from main solely to honor task naming, and was never pushed. No product file was fixed, no product commit created, and no PR, provider account, deployment or owner checkout was changed. Only the explicitly selected report tree is published to evidence/je-gate-41.

## Plan and execution

The full plan is in PLAN.md. Completed: establish exact identities/base/head; inspect all seven diff hunks and candidate metadata; independently read the stable release, annotated tag and release-source files; verify hashes/counts/unchanged content; install with npm ci; run listings check/generation, type-check, lint and production build; render the real /happytohelp route at 1440 and 390; build/render baseline main for one regression comparison; read exact-SHA Verify once; inspect claims only against the released source; preserve actual reports/receipts; publish the selected evidence packet. All heavy commands ran directly in the dedicated cloud VM through cloud_run where required. No agent helpers, watchers, CI dispatches/reruns, provider secrets or source-sync network sweep were used.

The incumbent table exists in HappyToHelp's release contract: Zendesk, Intercom (with Fin), Help Scout and Freshdesk; Decagon, Sierra and Pylon set the agent/procedure baseline. JE itself has no root product CONTRACT.md or incumbent table. This version/provenance-only change adds no customer-support behavior or guarantee requiring a new incumbent comparison. The fixed five rubric rows and touched-route regression remain the decision boundary.

## Frozen rubric

| Row | Result | Commands and evidence |
| --- | --- | --- |
| R1 Scope | MET | `git diff --stat origin/main HEAD`, `git diff origin/main HEAD`, `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`, full candidate messages and `python3 /tmp/je-gate-audit.py`: exactly the three required paths, 12 insertions and 12 deletions. One candidate commit; fleet author/committer, no trailers. No credential-shaped added value. No test path deleted, skipped or weakened. State mutations are provenance/open-copy records only. |
| R2 Promotion truth | MET | `gh api repos/just-every/run-happytohelp/releases/tags/v0.4.26` once: non-draft, non-prerelease release 445132651 carries rer-release.dsse.json. Tag-ref and annotated-tag REST reads resolve v0.4.26 through tag object 20b30051488f6e923e16f70f17b5f5e137b55bcc to 2f597575d4ccb19cdd4cfa0de5e635757737a1aa. Released seed.json says 0.4.26. Listings, page version and sync source/tag/commit agree. No other seed version/status or wording changed. |
| R3 Public data/render | MET | `npm ci` exit 0; `npm run listings -- --check` exit 0, current 49 seeds; `npm run listings` exit 0, unchanged 49 seeds; `git diff --exit-code` exit 0; `npm run type-check`, `npm run lint`, `npm run build` all exit 0. Playwright/Chromium rendered production /happytohelp, HTTP 200 with v0.4.26 at 1440 and 390; assertions run at 1440, both widths visually inspected. Main's build/render also passed. Counts and exclusion checks passed. No pricing/copy import or layout regression. |
| R4 Exact-head CI | MET | One REST discovery read: `gh api 'repos/just-every/home/actions/runs?head_sha=17b30cd333dbc7f0732b0d5c0b30fc6596836aa5&per_page=100'`. Verify branch push run 43582553278 completed/success on exactly this SHA. PR-event Verify 43582573964 completed/skipped by the workflow's cloud-branch condition; it was not counted as green. Dynamic PR check 43582571910 also completed/success. No CI dispatch or rerun; no polling needed. |
| R5 Claim honesty | MET | `gh api 'repos/just-every/run-happytohelp/contents/CONTRACT.md?ref=v0.4.26'` and review of JE's HappyToHelp summary, does list and ten promises. Released contract copy hash ae8feea8b7998aa7 is unchanged from baseline state. Two promise rows are done, eight partial; unasserted proof is not falsity. No newly false sentence identified. Known partial-evidence promises remain the existing follow-up and exact sentences/IDs are retained in FOLLOW-UPS.md. |

## Every diff hunk explained

1. public/data/listings.json, top hunk: generatedAt advances from 2026-11-14T04:06:54.212Z to 2026-11-14T09:48:38.555Z, matching a generated data refresh.
2. public/data/listings.json, HappyToHelp hunk: its version alone advances v0.4.25 to v0.4.26. Its released status, name, category, line, headline, competitors, colors, art and URLs remain unchanged. All other listing objects are equal to main.
3. scripts/seeds-sync/state.json, top hunk: syncedAt advances from 2026-11-14T04:06:52.747Z to 2026-11-14T09:48:33.578Z.
4. state.json, HappyToHelp source hunk: copy commit advances 333af4b0580c4284616783f1d79fcc9aad3aefc5 to 2f597575d4ccb19cdd4cfa0de5e635757737a1aa; sourceRef/tag v0.4.25 to v0.4.26. sourceReason stays released listing version. README.md and seed.json copy hashes advance; CONTRACT.md remains ae8feea8b7998aa7. These are source-file fingerprints, not published prose or implementation-status promotions.
5. state.json, HappyToHelp open hunk: adds the report marker 42983364b373. Independent SHA-256 of `copy:README.md, seed.json changed since the last sync`, truncated to 12 hex characters by the documented keyOf algorithm, equals this value. It records a copy-source follow-up rather than changing copy.
6. state.json, Spool hunk: removes that same open marker from Spool. Its source/version/brand/home data are otherwise identical to main. The marker is a generic finding key, not seed wording or release status.
7. src/data/seed-pages.ts, HappyToHelp hunk: only version changes v0.4.25 to v0.4.26. Replacing that one value back yields the baseline file byte-for-byte, so no summary, does, promise, metadata or coming-soon text was imported.

## Release/source verification

Stable release: https://github.com/just-every/run-happytohelp/releases/tag/v0.4.26, published 2026-11-14T08:04:05Z. It is not a draft or prerelease. rer-release.dsse.json is 3061 bytes with GitHub-reported digest sha256:a49abd55a88bc216a4c062e161644573636018d2d0aa4116cdfda282b351e759. This gate confirms asset presence, not cryptographic signature verification; no signature-validation claim is made.

Annotated tag v0.4.26 resolves to exact source 2f597575d4ccb19cdd4cfa0de5e635757737a1aa. Released files read through gh api reproduce the sync tool's truncated SHA-256 hashes:

| File | Actual hash | Candidate state |
| --- | --- | --- |
| CONTRACT.md | ae8feea8b7998aa7 | match |
| README.md | f56c111027b43eda | match |
| seed.json | 685ea267d1baacbe | match |

Unchanged path releases: Spool v0.7.11, Uptime v0.5.11, Oncall v0.5.13, Orbit v0.4.9 and Lamp v1.11.15. Every other listing version/status is unchanged too. Coming-soon copy remains baseline copy.

## Public data, pricing and regression

Before: 49 = 35 released + 14 coming soon. After: 49 = 35 released + 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent. No mark/color/status/homepage asset changed. No promotion except HappyToHelp's version is in the diff.

Pricing text is unchanged against main, including no introduced GST or billing-country restriction. The named optional Assisted US$10/month and Managed US$100/month statements are not present in the current JE source/touched page on either main or candidate; this gate does not claim they are visibly rendered. It confirms their accepted baseline presentation has not been changed or replaced. The page's current MIT, 100% free statement is unchanged.

Candidate production build generated /happytohelp as a real static route. The browser probe used Chromium /usr/bin/chromium with --no-sandbox, fresh contexts and no profile/session import. /happytohelp and /data/listings.json return the expected released version. The candidate main-content text becomes exactly equal to main's rendered text after the single version normalization. Version-row geometry is identical on head/main at both widths; document/body widths remain 1440/390 respectively. No browser page errors, new clipping, overflow or overlap appeared. Phone gallery continuation and wrapping match main. Four full-page PNGs retain actual candidate/main proof; no new product test or pin test was committed.

The first browser networkidle wait timed out before assertions; the rerun used actual DOM/font readiness and passed. Local preview telemetry/Cloudflare binding warnings also reproduce on main. Details and helper-only hook setup are in LANDING-NOTES.md; none is a new product finding.

## Applicability and independent mechanical evidence

The JE repository has no root CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md, sources.lock.json, documented Lander-Regenerate command, source-lock generation command or migration-ledger check in AGENTS.md/package scripts/scripts. Those seed-specific commands are NOT RUN (not applicable), rather than silently treated as passing. The applicable documented generated-public-data command was independently run in both check and write modes, leaving no diff. Ordinary D1 migration application is a different action, not a documented migration-ledger check; it was not widened into this gate. Upstream HappyToHelp was read only through gh api as required; it was not cloned or modified.

No clause status changed, no generated contract view was committed, and no stale generator result or failing migration-ledger result was demonstrated. The Mac publication scan remains a fleet landing control, explicitly unavailable to this cloud. This gate made no product push needing that scan.

## CI custody and API budget

Required exact-head green run: https://github.com/just-every/home/actions/runs/43582553278 (Verify branch, push, completed/success, head 17b30cd333dbc7f0732b0d5c0b30fc6596836aa5). Other observed runs: 43582573964 (PR-event Verify, completed/skipped), 43582571910 (dynamic PR check, completed/success). The exact-head list was read once; all runs were already complete. Nine gate GitHub API reads total, including the final PR prerequisite check. No failed job required a log read.

RECEIPT.json binds all command exits, both browser receipts, CI observations, base/head, counts and zero clause changes to this gate. audit.json and source JSON/files retain the actual comparisons. Git remote reads and final-pr.json reconfirmed the exact required base and head after the browser checks. The product checkout was restored to the candidate, clean in both index and worktree, before report publication.

## Findings and handoff

No new A, B, BAR or C finding. Zero blocking findings, zero new follow-ups. The eight known partial-evidence promises are unchanged context in FOLLOW-UPS.md, not eight new findings. Existing Terrace/Uptime/Lamp/Spool follow-ups remain outside this change. Execution notes of tier G are in LANDING-NOTES.md and do not affect landing eligibility. Blockers: none.

No product READY/PUSHED claim is made for the gate's unused branch. Report-only evidence publication is separate from the already-pushed builder candidate and from landing, acceptance or deployment. Stop owned processes, publish selected files, then delete the scratch clone/node_modules; preserve the report packet under work/je-gate-41/packet.

GATE PASS 17b30cd333dbc7f0732b0d5c0b30fc6596836aa5
