# je-gate-34 — independent deciding gate for home PR #50

**Decision: PASS.** No blocking finding and no new copy follow-up. Candidate branch `cloud/je-sync-26`, exact head `0396a50284d16568b52f397e13787cf9440f3ad5`, PR https://github.com/just-every/home/pull/50. Baseline main and PR base are both `7212b2fd1cb0bfe9241752dc64d37a407f0b004f`. A final Git ref read confirmed both refs still match. This report judges that candidate only; it creates no product commit, READY claim, deployment or landing signal.

## Plan and execution boundary

The complete pre-execution plan is PLAN.md. In order: authenticate using only the launcher bundle, shallow-clone the declared home repository; confirm frozen refs; inspect every path, hunk and candidate commit; read four release lists and four tagged contracts through gh api; independently regenerate public listings and run the named local checks; build the candidate and baseline; compare the four public routes at 1440 and 390; inspect exact-head CI once; evaluate source-proven false claims only; preserve actual reports/receipts and publish only the separate evidence ref. Clean up the browser, owned server PIDs and clone after evidence publication. No product fixes, comments, PR mutations, CI dispatch/reruns, provider credentials, other-repository clones, or production-tree access occurred.

The generic cloud builder branch `cloud/je-gate-34` was created locally at baseline main as requested by the cloud wrapper, then the checkout was detached at the exact gate candidate. It is not a new product candidate and was not pushed. The existing product branch and PR remain the builder's.

## Frozen rubric

| Row | Result | Command / actual result |
| --- | --- | --- |
| R1 Scope | MET | `git diff --name-status origin/main HEAD`, full `git diff origin/main HEAD`, `git diff --check origin/main HEAD`, `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`, and independent structural/credential-pattern checks. Exactly the three allowed files; one commit whose parent is baseline; fleet author and committer, no trailers; no added credential-shaped values; no test changes. State changes are provenance and open-copy markers only. Full diff: candidate.diff; machine receipt: scope-data-receipt.json. |
| R2 Promotion truth | MET | One `gh api repos/just-every/run-<seed>/releases?per_page=100` per seed, plus `gh api repos/just-every/run-<seed>/contents/CONTRACT.md?ref=<tag>`. All four tags resolve to a tagged contract and each has a non-draft, non-prerelease Release carrying rer-release.dsse.json. Independent comparison confirms versions agree in listings, page data and state; every other version/status and all wording remain unchanged. HappyToHelp v0.4.23 and Spool v0.7.8 remain unchanged. No coming-soon copy import. |
| R3 Public data and render | MET | `npm ci` exit 0 (726 packages); `npm run listings -- --check` exit 0, current 49; `npm run listings` exit 0, unchanged 49; `git diff --exit-code` exit 0; `npm run type-check`, `npm run lint`, `npm run build` all exit 0. Production build generated 61 pages including the real seed slugs. Built `/lamp`, `/uptime`, `/oncall`, `/orbit` each returned 200 and showed its new version. Candidate and baseline proof at 1440 and 390 shows no layout break, no page errors, no horizontal document overflow; page text and promises are identical after normalizing only the intended version. Browser assertions ran at 1440; 390 supplied visual proof and observations. |
| R4 Exact-head CI | MET | One `gh api 'repos/just-every/home/actions/runs?head_sha=0396a50284d16568b52f397e13787cf9440f3ad5&per_page=100'`. Push Verify branch run **43386406510 completed/success**, exactly that head. The PR-event Verify run 43386457193 is skipped by its workflow condition, not used as success proof. Dynamic PR run 43386457973 also completed/success. No polling, dispatch, rerun or logs were needed. Raw selected response: ci.json. |
| R5 Claim honesty | MET | Read the four tagged CONTRACT.md sources, their status tables and the full JE copy blocks; matched all 40 promise IDs to their tagged rows. No new source-proven false public sentence identified. Partial evidence alone was not treated as false. Existing known C items are unchanged and not recounted as new findings. Per-seed claim receipts preserve exact status, gaps, source lines and JE sentences. |

No required gate check remains NOT RUN. Source-lock regeneration/check, contract-view generation/check and migration-ledger checks are **not applicable** here: home has no CONTRACT.md, sources.lock.json, documented contract generator, or migration-ledger checker in AGENTS.md/package scripts. Home's applicable generated-data door is the independently passing listings write/check. Existing database migration application was not requested or needed for these static public pages. No seed source was cloned or changed.

The Mac publication scan and deployment/live-site check remain with the lane as specified in the builder brief. This gate performed the named R1 added-value credential and full candidate-identity checks; it does not claim to have run the unavailable Mac publication scan.

## Every changed hunk

`public/data/listings.json` has five hunks: generatedAt moves from `2026-11-13T03:01:53.800Z` to `2026-11-13T07:28:12.440Z`; Lamp, Oncall, Orbit and Uptime change only their version field, as shown below. No listing copy, category, status, name, link, brand or mark changes.

`src/data/seed-pages.ts` has four hunks: only those same four version literals change. Normalizing those literals makes each affected complete page-data block equal to baseline. Summaries, does lists, promises, incumbents, SEO and all coming-soon copy remain byte-identical.

`scripts/seeds-sync/state.json` changes only these fields:

| Entry | Change and meaning |
| --- | --- |
| root | syncedAt `2026-11-13T03:01:48.929Z` → `2026-11-13T07:28:13.329Z`. |
| HappyToHelp | Removes open marker `42983364b373`; no version, copy hash, source commit, brand or home observation changes. This is a sync finding marker, not a change to or resolution of public promise wording. |
| Lamp | commit `e82bc349b98af44c440efa2960927e327deda1a5` → `733e2ce1e2fc618183a93632218bb86456a06a79`; sourceRef/tag to v1.11.14; README.md and seed.json copy hashes update; CONTRACT.md hash stays `8b575f27ee607ce3`; adds open copy marker `42983364b373`. |
| Oncall | commit `1dc0069324de17933e7b65bffefa14de7dabea9a` → `457a0a194a0dc97f653cdc12224cae27b6f1a79f`; sourceRef/tag to v0.5.11; CONTRACT.md, README.md and seed.json hashes update; adds open marker `c843303a1181`. |
| Orbit | commit `eab0faafccd2eb0945dddb7d0f52c30ce573c04c` → `0e9e55cf150dfcc781d1d9e62b2d88c15c9b6a63`; sourceRef/tag to v0.4.8; README.md and seed.json hashes update; CONTRACT.md hash stays `faa136fb56b398c3`; adds open marker `42983364b373`. |
| Uptime | commit `88c586f6fabdaed6768ddc8072af2340310a7ace` → `bd7b21317cae0ae0082fa88127cef6842c377504`; sourceRef/tag to v0.5.10; CONTRACT.md, README.md and seed.json hashes update; adds open marker `c843303a1181`. |

The sync implementation hashes a finding's type and summary for open markers. `42983364b373` identifies the README.md/seed.json copy-change summary; `c843303a1181` identifies CONTRACT.md/README.md/seed.json copy change. The directly downloaded tagged CONTRACT.md SHA-256 prefixes match all four candidate state hashes. README/seed.json hash values and recorded source-commit identities are reviewed as provenance fields; they were not independently re-fetched at the cost of exceeding the fixed ten-call budget. No wording-bearing state field changes, including all brand/home headlines, tokens, signatures and marks. Complete state before/after field values are in scope-data-receipt.json.

## Promotions and counts

| Seed | Baseline → candidate | Release URL | Published UTC | DSSE asset |
| --- | --- | --- | --- | --- |
| Lamp | v1.11.13 → v1.11.14 | https://github.com/just-every/run-lamp/releases/tag/v1.11.14 | 2026-11-13 05:23:23 | present, 3157 bytes |
| Uptime | v0.5.9 → v0.5.10 | https://github.com/just-every/run-uptime/releases/tag/v0.5.10 | 2026-11-13 05:56:08 | present, 3381 bytes |
| Oncall | v0.5.10 → v0.5.11 | https://github.com/just-every/run-oncall/releases/tag/v0.5.11 | 2026-11-13 06:43:55 | present, 3185 bytes |
| Orbit | v0.4.7 → v0.4.8 | https://github.com/just-every/run-orbit/releases/tag/v0.4.8 | 2026-11-13 03:37:12 | present, 3333 bytes |

DSSE envelope-asset presence is verified. No signature verification is claimed. Tag existence is independently established by successful tagged contract reads. The gate did not use provider credentials or assert live seed runtime behavior.

Before and after: **49 total = 35 released + 14 coming soon**. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent on both sides. HappyToHelp and Spool retain v0.4.23 and v0.7.8. No seed status changes, contract clause status changes, public wording changes or added tests.

Pricing preservation: no pricing field or source hunk changes. The brief's Assisted US$10/month and Managed US$100/month labels are not present in this home checkout's src/public-data text at either baseline or candidate, and are not rendered on these four existing pages. This is an unchanged baseline condition, not a newly introduced issue or a claim that those plan amounts were visually observed. Existing per-page “MIT, 100% free” licence copy is identical. No GST wording or billing-country restriction is introduced.

## Contract and claim review

The tagged status tables contain Lamp 241 rows (60 done, 129 partial, 52 missing), Uptime 102 (37 done, 47 partial, 18 missing), Oncall 88 (25 done, 36 partial, 27 missing), Orbit 191 (42 done, 117 partial, 32 missing). These are source observations, not status promotions. Exact JE copy is preserved in `<seed>-JE-copy.txt`, full public source in `<seed>-CONTRACT.md`, parsed rows in `<seed>-status-table.json`, and the ten matching promise rows per seed in `<seed>-claim-receipt.json`.

| Seed | JE promise IDs → tagged status |
| --- | --- |
| Lamp | INTAKE-002 partial; INCIDENT-004 partial; UPDATE-008 partial; NOTIFY-009 partial; UPTIME-001 done; PAGE-006 partial; PAGE-013 done; NOTIFY-004 partial; MOVE-002 partial; SUB-006 partial. |
| Uptime | STATE-001 partial; EVIDENCE-001 done; NOTIFY-001 done; DELIVERY-001 done; DRILL-001 done; TLS-001 done; MAINT-001 done; ARCHIVE-001 done; NETWORK-001 partial; ERASURE-001 done. |
| Oncall | OC-012, OC-006, OC-005, OC-004, OC-008, OC-011, OC-003, OC-002, OC-021 and OC-022 all done. The tagged requirements retain paging OFF and administrator-approved signed response events, matching the existing JE distinction. |
| Orbit | OUT-001 partial; OPP-004 partial; SIGNAL-007 partial; OUT-007 partial; OUT-012 done; ACTION-005 partial; CAPTURE-005 partial; AI-003 partial; RECORD-004 done; DATA-002 partial. |

Lamp/Uptime's named evidence gaps remain the brief's existing follow-ups, not proof of newly false implementation. Orbit's OPP-004 specifically says following a contribution to source evidence is not reachable; the JE sentence says “A deal's score shows every signal it used, with source, time and weight, beside the reason for the recommendation.” It makes no source-evidence navigation promise. The carried row reports rendered contribution source and recommendation reason, so this gap alone does not establish that sentence false. Other Orbit rows describe unasserted obligations, not proof that the advertised implementation is false; the contract hash and JE wording are unchanged from baseline. No new follow-up is manufactured from a partial label. HappyToHelp, Terrace and Spool's pre-existing items remain outside this candidate's four-entry review.

Incumbents named by the released sources: Lamp — Atlassian Statuspage, Better Stack Status Pages, Status.io; Uptime — Pingdom, UptimeRobot, Better Stack Uptime, Site24x7; Oncall — PagerDuty, Opsgenie/Jira Service Management, Splunk On-Call; Orbit — HubSpot Sales Hub, Pipedrive, Salesforce Sales Cloud. For this listing-sync behavior the reviewed buyer-visible operation is disclosure of the currently released version and retained factual copy; no incumbent migration or feature-parity test is added.

## Built-page evidence and execution notes

Both exact trees were built with the same installed dependencies. A separate baseline worktree at 7212b2fd was used; no baseline product edits. Playwright used `/usr/bin/chromium` with `--no-sandbox`, real HOME, a new isolated context, no owner profile or credentialed session. The scripts are preserved as browser-probe.mjs and browser-servers.py. The receipt records 16 observations: four routes × two trees × two widths, with a single full-page screenshot per observation. Candidate and baseline page heights match route by route at each width. At 390 all pages also observed 200, expected version, no page errors and document width 390. Visual review of the saved candidate proof confirms readable unclipped version facts and preserved layout; comparison is bounded to the four touched routes.

Initial browser invocation timed out waiting for `networkidle` on the baseline Lamp route, before screenshot capture. Its browser and both servers were closed. The second invocation used DOM readiness, completed fonts and the rendered facts element, and passed all route assertions without changing the application or mocking requests. Initial diagnostic and cleanup are retained. Production next-start warnings about standalone output and deprecation warnings are existing tooling messages, not a new product regression. Final servers 2013 and 2029 were stopped by their recorded PIDs, exit 143; browser closed in finally. No broad process kills.

One preparatory baseline-build invocation accidentally ran from the candidate working directory; it passed and was followed by the intended baseline build from the baseline root, which also passed. The saved baseline-build.log is the actual baseline-root build. Git worktree creation reported a Husky post-checkout hook-relative-path error after successful checkout; no commits were attempted and the verified baseline HEAD remained the expected SHA. No hook was disabled and no application source was changed.

CI evidence uses exactly ten GitHub API calls total: PR 1 + Releases 4 + tagged contracts 4 + exact-head Actions 1. Git clone/fetch/ref reads and report-only evidence transport use ordinary Git, not additional REST calls. No watcher, scheduler, failed-job archive download, CI rerun, provider check or full local suite. The generic rer setup/build commands are not this repository's documented local check doors and were not substituted for its named npm commands.

## Findings, custody and cleanup

Blocking A/B/BAR findings: **0**. New FOLLOW-UP C findings: **0**. No new D/E product finding or F/G landing finding is asserted. Existing known follow-ups are retained in FOLLOW-UPS.md without changing this verdict. Product branch is unchanged, no product commit/push and no contract clause status change. Product checkout was clean after generation, build and browser probes. Final actual receipts and the explicit selected-file manifest accompany this report. Evidence publication is report-only and is not proof of product acceptance or landing.

The final message supplies the exact evidence ref/head from the publisher. Clone and node_modules are deleted after that successful transfer; actual reports and receipts remain outside the clone in the packet.

GATE PASS 0396a50284d16568b52f397e13787cf9440f3ad5
