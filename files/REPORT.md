# je-gate-45 · independent deciding gate of PR #61

Author: Run Edit Run fleet. Timestamp: 2026-11-15T10:36:43Z.

Decision: PASS on candidate `cloud/je-sync-37`, head `2eb5ffbe583fcd1671cf9cb32640b32a34214716`, PR https://github.com/just-every/home/pull/61. Baseline `origin/main` and PR base both resolve to `9805549c7fc4a357ac08bda001cb5165e1141b7e`; the final PR read still reports that same head and base. No blocking findings and no new follow-ups. This is an independent landing judgment, not a product READY/push or a deployment claim.

## Plan and boundaries

The full plan is in PLAN.md. Read the supplied frozen rubric, RULES.md and builder brief inline, then the launcher AGENTS.md and fresh home checkout AGENTS.md, package scripts, sync README/detectors, listing generator, changed files and Verify workflow. Cloned only just-every/home, shallow with blob filtering, kept baseline main, created local cloud/je-gate-45 from main as required by the cloud wrapper, and detached at the exact PR head for all checks. Read run-lamp only through gh api. No provider credentials, product changes, commits, product pushes, PR edits/comments, merges or deployments. One heavy check at a time; no full suite or fresh sync of unrelated seeds. All authored report timestamps use date -u.

The product checkout is detached intentionally: report transport records the exact product head, while the candidate branch is cloud/je-sync-37. The unused local cloud/je-gate-45 ref is not a product candidate and was not pushed. Evidence is published separately on evidence/je-gate-45 before removing the clone and node_modules.

## Frozen rows

| Row | Status | Independent command / evidence and result |
| --- | --- | --- |
| R1 Scope | MET | `git diff --name-only origin/main HEAD`, full `git diff origin/main HEAD`, `git diff --check origin/main HEAD`; exactly the three permitted paths, all hunks explained below, whitespace clean. `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"` contains one candidate commit: fleet author and committer, no trailers or side parents. Added-value credential-pattern review found none; no test file, assertion, skip or registration changed. See candidate.diff, commit-identities.txt and scope-data-receipt.json. |
| R2 Promotion truth | MET | `gh api repos/just-every/run-lamp/releases/tags/v1.11.17` read once; published, non-draft, non-prerelease, carrying rer-release.dsse.json. `gh api .../git/ref/tags/v1.11.17` then `gh api .../git/tags/8cb7fe2712bf0e513dcea7e04b72c5d43aa7bd6b` peels exactly to b5b5628a247ba2289aeb9af16cab04a998e823ce. Version and provenance agree across listing, page and state. Exact released CONTRACT.md and seed.json SHA-256 prefixes match state.json. All other seed versions/statuses and wording unchanged. |
| R3 Public data/render | MET | `npm ci` exit 0; `npm run listings -- --check` exit 0, current 49; `npm run listings` exit 0, unchanged; `git diff --exit-code` exit 0. `npm run type-check`, `npm run lint`, `npm run build` all exit 0. Built HTTP /data/listings.json is 200 with 49 = 35 + 14 and all eight exclusions absent. Production /lamp is 200 and displays v1.11.17. Real Chromium probe asserts at 1440 and saves full-page proof at 1440 and 390. Document widths equal 1440 and 390 respectively; visual inspection found no layout break. Logs, browser-probe.mjs, browser-receipt.json and two PNGs are included. Pricing/copy preservation details below. |
| R4 Exact-head CI | MET | One REST discovery: `gh api 'repos/just-every/home/actions/runs?head_sha=2eb5ffbe583fcd1671cf9cb32640b32a34214716&per_page=100'`. Push Verify branch run 43702829307 is completed/success on that exact SHA. PR #61 run 43702860848 is completed/success; duplicate pull_request Verify branch 43702862984 is completed/skipped under the workflow's cloud-branch deduplication condition. No dispatch, rerun or watcher. |
| R5 Claim honesty | MET | `gh api 'repos/just-every/run-lamp/contents/CONTRACT.md?ref=v1.11.17'` read once and decoded; read its status table and the full JE Lamp copy, then compare every hunk to main. No newly false claim established. The eight partial-status promises have evidence gaps, not source statements proving the promises false; the brief explicitly preserves their existing follow-up. Two promise clauses are done. Exact sentences, IDs and statuses below. |

Every named check ran. Source lock regeneration/check and contract-view write/check are not applicable to just-every/home: no local CONTRACT.md, sources.lock.json, ACCEPTANCE.md, docs/CLAIMS.md or documented generator exists. Five SQL migrations are tracked; no migration-ledger check is documented and none is changed. No generated acceptance view was edited or committed. The relevant documented generated public view, listings.json, was independently checked and regenerated with zero diff. The builder brief's sync/publication outcomes are probed through the real built public JSON and Lamp page, not by rerunning a broad sync that reads unrelated sources.

## Hunk review and preserved catalogue

1. `public/data/listings.json`: generatedAt changes from 2026-11-15T05:01:24.381Z to 2026-11-15T10:08:28.040Z; Lamp version v1.11.16 becomes v1.11.17. All listing objects otherwise compare equal against main.
2. `scripts/seeds-sync/state.json`: syncedAt advances. Only Lamp's record changes: commit 429a46081ce68bab2dbdae46b8402b8ccce3ee2a becomes b5b5628a247ba2289aeb9af16cab04a998e823ce, sourceRef/tag become v1.11.17, seed.json copy hash 12d7013d559c4028 becomes 588e2ec26a9f9880, and open gains 64cb07f6a0dd. The actual v1.11.17 CONTRACT.md hashes to f9cb0b8a5bd46d69, unchanged from baseline; seed.json hashes to 588e2ec26a9f9880. The detector's sha256(type + ':' + summary).slice(0,12) computes 64cb07f6a0dd for `copy:seed.json changed since the last sync`; closeRecord retains findings not applied. These are provenance/open-copy markers, not wording, contract-status or branding changes. README hash, CONTRACT hash, brand, mark and homepage fingerprint are unchanged.
3. `src/data/seed-pages.ts`: only Lamp's version literal becomes v1.11.17. Replacing that one old version in baseline yields the candidate file byte for byte; summary, does, promises, runs-on, links and SEO wording are unchanged. No coming-soon copy was imported.

Before and after: **49 total = 35 released + 14 coming soon**. Lamp remains released. Spool v0.7.11, Uptime v0.5.11, Oncall v0.5.14, Orbit v0.4.9 and HappyToHelp v0.4.28 are unchanged; all other versions/statuses also compare equal. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No mark, colour, homepage, gallery or layout source changed. Regression comparison uses identical rendering components and identical content except the equal-length Lamp version, plus real built-page visual proof at both widths.

Pricing preservation: the candidate changes no price or pricing source; all public copy is identical to main except the version literal. In particular it introduces no change to the brief's Assisted US$10/month / Managed US$100/month policy, GST wording or country restrictions. Those exact Assisted/Managed strings do not occur in this current JE checkout, so this report does not claim to have observed them rendered on /lamp or to have tested a billing flow. That is unchanged baseline content, outside this version-only gate.

## Release/source receipt

Release: https://github.com/just-every/run-lamp/releases/tag/v1.11.17, ID 445918048, published 2026-11-15T08:42:04Z, draft=false, prerelease=false. Envelope asset ID 750375165, 3157 bytes, digest sha256:11b571becf7976151beef714f4b69d74902ccaa9e354eff9eb1dd797c5487472. Asset presence/digest metadata was read; the envelope was not downloaded or signature-verified. The annotated tag object is 8cb7fe2712bf0e513dcea7e04b72c5d43aa7bd6b and points to the exact required source b5b5628a247ba2289aeb9af16cab04a998e823ce; GitHub tag-signature metadata reports unsigned. A signed tag is not a frozen prerequisite.

## Lamp claim review

The release contract Product target names Atlassian Statuspage, Better Stack Status Pages and Status.io; up-and-comers are Instatus and incident.io Status Pages. This catalogue sync changes no Lamp behaviour or target guarantee. Its JE page still presents Atlassian Statuspage as primary, plus Instatus and Better Stack. No incumbent comparison beyond the frozen version/copy/render gate is needed.

| Exact JE promise sentence | Clause | Release status | Judgment |
| --- | --- | --- | --- |
| Monitoring alerts follow the source's intake policy, which keeps a private draft until publication by default. Your company's policy decides agent publication; an alert alone is never a finished customer update. | INTAKE-002 | partial | Private draft/page exclusion is evidenced; timing and all surfaces unasserted. Not proven false. |
| A published update is never edited or deleted; a correction is a new update and both stay on the public timeline. | INCIDENT-004 | partial | Original/correction retention evidenced; deletion refusal/public order unasserted. Not proven false. |
| Publishing is a single step: the update and the list of people to notify are saved together. | UPDATE-008 | partial | Once-only update/recipient evidence; remaining points unasserted. Not proven false. |
| Publishing still works while email, the queue or a subscriber's endpoint is failing. | NOTIFY-009 | partial | Failure coverage unasserted, not declared absent. Known follow-up, no new finding. |
| Uptime is rounded down, so a period with any downtime never shows 100 percent. | UPTIME-001 | done | No contradiction. |
| If the database or queue is down, the public page, feed and banner keep serving the last known state, labelled as such, and never show a false all-clear. | PAGE-006 | partial | Some retained-state evidence; feed/widget/queue cases unasserted. Known follow-up, no new finding. |
| The public page sets no cookies, has no tracking or consent banner, and loads nothing from other sites. | PAGE-013 | done | Applies to Lamp public status page, not JE's marketing page. No contradiction. |
| The delivery log records whether each message was delivered, bounced or failed, and nothing tracks whether anyone read it. | NOTIFY-004 | partial | Outcome evidence with incomplete filtering/privacy assertions. Not proven false. |
| Moving in keeps original update times, notifies nobody, and brings email subscribers over as pending until they confirm. | MOVE-002 | partial | Existing time/silence evidence; remaining cases unasserted. Not proven false. |
| Every notification email carries a one-click unsubscribe. | SUB-006 | partial | Header/URL-encoded deactivation evidence; further body/DKIM/form cases unasserted. Not proven false. |

Read the summary and all eight does bullets too: page/history, single publication, retained serving, subscription, scheduled maintenance, intake drafts, reports/integrations and export. None is newly contradicted by the release status source; no promise claims unsupported target-only custom CSS, private audience imports, or missing management API. The broader export wording addresses released records, which PORT-001 says export/restore; its target gaps are not imported as claims. No clause promotion or demotion: eight partial and two done promise statuses remain unchanged. This is not a new ten-clause product audit or a claim to re-prove Lamp behaviour.

## Check limitations and notes

NOTE G: Initial browser networkidle wait timed out; final DOM-readiness/visible-content probe passed without app changes or mocks. Preserve the failed attempt receipt as well as the successful one.

NOTE G: The local production Next server warned about standalone startup and lacked Cloudflare cache/D1 telemetry bindings (caches undefined; page_views missing). Those untouched APIs are outside this version sync. /lamp and /data/listings.json returned 200, browser pageerrors were empty, all version/public-data checks passed, and screenshots show no layout break. Two requests aborted during page reload are recorded. No provider credentials, remote migration or telemetry setup was used to expand the gate.

No A, B or BAR findings. No new C, D, E or F finding. The brief's known pre-existing copy follow-ups remain in FOLLOW-UPS.md; process/proof notes are in LANDING-NOTES.md. The source contract was only read, not changed. Mac publication scan, PR landing and deployment remain with the lane.

## CI, API budget and custody

Exact-head push Verify: https://github.com/just-every/home/actions/runs/43702829307 (completed/success). PR check: https://github.com/just-every/home/actions/runs/43702860848 (completed/success). Deduplicated PR Verify: https://github.com/just-every/home/actions/runs/43702862984 (completed/skipped). The checked workflow explains the skipped duplicate: Verify runs on push for cloud branches, not again on their PR event. No red run, no failed-job logs or shard rerun needed.

Eight explicit gh API calls: initial PR, exact-head runs, Lamp release, tag ref, annotated tag, released CONTRACT.md, released seed.json, final PR. No other repository was cloned. No CI polling or workflow action. Report transport uses only ordinary Git on the declared just-every/home evidence ref.

Actual full results are in gate-receipt.json, scope-data-receipt.json, all six command logs, zero-length regeneration-diff.log, complete candidate.diff, commit-identities.txt, public API source receipts, browser receipts, rendered text and screenshot files. Evidence selections are regular explicit files, no credentials, environment dumps, symlinks or held-out private material. The candidate checkout remained clean. Product commits created: 0; product pushes: 0; clause status changes: none. Server PID 1423 was terminated by recorded PID after browser closure; the subreaper completed. The clone and node_modules are removed after successful evidence publication; report packet is retained outside it.
