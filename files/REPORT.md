# je-gate-26 independent deciding gate

Decision: PASS for PR https://github.com/just-every/home/pull/42 at `c7c60bc1617ba017472cb25a91f419492bc4bef5` on `cloud/je-sync-18`. Baseline `origin/main` and the PR base are `85aa3f93662614840d92352f33f375b9ecca8b62`. Initial and final PR API observations and final advertised refs agree. The gate fixed nothing. Blocking findings: 0. New C follow-ups: 0. Clause status changes: none.

## Plan and boundaries

The full executed plan is in PLAN.md. I read the two inline references, launcher AGENTS.md, home AGENTS.md and sync implementation/docs; used the cloud-environment-runtime skill for environment/package/browser handling; cloned only just-every/home shallow with blob filtering; fetched PR #42 and checked out the exact candidate, preserving main. The local cloud/je-gate-26 branch was created at baseline only and was never published. Product checkout remained detached at the reviewed candidate. Other repositories were read only through gh api. No product edit, product commit/push, PR write, merge, CI dispatch/rerun, deployment or provider credential use occurred. GitHub CLI reads loaded only the fleet GitHub credential through the prescribed private environment mechanism, without printing any value. Nine GitHub API calls were used; no watcher was started.

## Frozen rubric

| Row | Result | Command / observation | Result details |
| --- | --- | --- | --- |
| R1 Scope | MET | `git diff --stat origin/main HEAD`; complete `git diff origin/main HEAD`; `git diff --check origin/main HEAD`; `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`; added-line credential-shape review | Exactly the three allowed paths, 26 additions/27 deletions. Only candidate commit `c7c60bc1617ba017472cb25a91f419492bc4bef5`, author and committer Run Edit Run fleet <fleet@runeditrun.com>, no trailers. No test changed/deleted/weakened; no credential-shaped added value. Detailed hunk explanation below and diff.patch/data-receipt.json/identity.txt. |
| R2 Promotion truth | MET | One `gh api repos/just-every/run-<seed>/releases?per_page=100` per source; `gh api repos/just-every/run-<seed>/contents/CONTRACT.md?ref=<new-tag>`; structured before/after data comparison | Each promoted tag ref resolves and has a non-draft, non-prerelease Release with rer-release.dsse.json. Listings, page source and sync state agree. Only three versions changed; no public copy/status changed, no coming-soon import. CONTRACT.md source hashes match sync state. source-receipt.json records URLs, dates, asset names/sizes and hashes. Asset presence was verified; signatures were not verified. |
| R3 Public data and render | MET | `npm ci`; `npm run listings -- --check`; `npm run listings`; `git diff --exit-code`; `npm run type-check`; `npm run lint`; `npm run build`; independent Playwright Chromium public-route probes of both builds | All commands exit 0; generator reports current/unchanged 49 seeds; checkout remains clean. Three real routes return 200, show new versions, and show no new layout break at 1440 and 390. Assertions run at 1440; both widths captured. Main/head body text differs only by expected versions, with identical 1440 heading geometry/page height. Counts/exclusions/pricing preservation detailed below. browser-receipt.json, screenshots and individual command logs retained. |
| R4 Exact-head CI | MET | `gh api 'repos/just-every/home/actions/runs?head_sha=c7c60bc1617ba017472cb25a91f419492bc4bef5&per_page=100'` once | Push Verify branch run 43051508549 completed/success on the exact candidate. PR Verify run 43051617713 is skipped by the cloud-branch guard, not a failed run; dynamic PR #42 run 43051610017 completed/success. No dispatch/rerun. ci.json is the actual receipt. |
| R5 Claim honesty | MET | Read each released CONTRACT.md status table at v0.5.5/v0.5.8/v0.4.20 and compare JE source plus rendered pages | All 30 promise sentences, summary and does text are unchanged. No sentence is shown false by the released source. Partial rows describe missing assertions and are not treated as false claims. Exact sentences, clause ids and source row numbers are in CLAIM-REVIEW.md and claims-receipt.json. Existing known follow-ups were not reopened. |

## Every changed hunk

`public/data/listings.json` has four hunks: generatedAt 2026-11-11T10:29:31.072Z → 2026-11-11T15:38:55.826Z, HappyToHelp v0.4.19 → v0.4.20, Oncall v0.5.7 → v0.5.8 and Uptime v0.5.4 → v0.5.5. All other listing properties are identical.

`src/data/seed-pages.ts` has three hunks, the same version changes at the corresponding seed entries. Every other byte of public page copy is preserved.

`scripts/seeds-sync/state.json` has seven hunks: syncedAt 2026-11-11T10:29:29.368Z → 2026-11-11T15:38:44.635Z; HappyToHelp source commit/ref/tag and README.md/seed.json hashes; Oncall source commit/ref/tag and README.md/seed.json hashes; Orbit’s removed open marker; Spool’s removed open marker; Uptime source commit/ref/tag and seed.json hash; and Uptime’s added open marker. CONTRACT.md hashes and brand/mark/home fields remain unchanged. Source commits are HappyToHelp `1c9051307419c22530c4b1f7aab80a53bd4eb9d8`, Oncall `0dac089dba93dc1209c3a2317d5e7a4392d44c4e`, Uptime `3caf61f087a59a0cc009f1eb1c87077be0eb985b`. These are provenance, not imported wording.

The exact open-marker hashes resolve with sync’s keyOf algorithm: removed Orbit 922fed04eacf = `copy:CONTRACT.md, seed.json changed since the last sync`; removed Spool 42983364b373 = `copy:README.md, seed.json changed since the last sync`; added Uptime 64cb07f6a0dd = `copy:seed.json changed since the last sync`. These are open-copy report markers only. Full before/after details: data-receipt.json and open-markers-receipt.json.

## Releases, consistency and holds

| Seed | Before → after | Eligible Release | Published UTC | Envelope asset |
| --- | --- | --- | --- | --- |
| Uptime | v0.5.4 → v0.5.5 | https://github.com/just-every/run-uptime/releases/tag/v0.5.5 | 2026-11-11 13:02:13 | rer-release.dsse.json, 3361 bytes |
| Oncall | v0.5.7 → v0.5.8 | https://github.com/just-every/run-oncall/releases/tag/v0.5.8 | 2026-11-11 11:59:50 | rer-release.dsse.json, 3169 bytes |
| HappyToHelp | v0.4.19 → v0.4.20 | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.20 | 2026-11-11 14:29:30 | rer-release.dsse.json, 3061 bytes |

Orbit v0.4.5, Spool v0.7.5 and Lamp v1.11.10 are unchanged. Lamp v1.11.11 and HappyToHelp v0.4.21 were not imported. The brief’s stated no-Release hold remains respected; no fresh Lamp-release authority was sought beyond the frozen three-source read. No source signatures are asserted. No coming-soon seed was promoted or its copy imported.

## Counts, pricing and public pages

Before: 49 = 35 released + 14 coming soon. After: 49 = 35 released + 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent in both. No status, mark, colors, still, gallery, headline, summary, promise, import claim, price, GST wording or country restriction changed. The entire non-version listing content compares equal, and the rendered body normalizes exactly to baseline after replacing only those version strings.

The named Assisted US$10/month and Managed US$100/month tier text is not present in the reviewed baseline/candidate page source/render, so this gate verifies preservation rather than claiming those amounts appeared on screen (NOTE F). No pricing presentation change was introduced.

`npm ci` installed 726 packages successfully. Production build compiled and generated 61 pages. A second production build from a baseline archive, sharing only installed dependencies, also passed. The probes used system Chromium `/usr/bin/chromium --no-sandbox` with a fresh context, no owner profile. Routes `/uptime`, `/oncall`, `/happytohelp` show respectively v0.5.5, v0.5.8, v0.4.20. Six head and six baseline full-page screenshots are retained. No page exception occurred; document widths equal viewport widths at both observed sizes. Media requests canceled when navigating match main; the 1440 assertion journey verifies normalized text, version visibility, response status, no horizontal overflow, headings and page height. I visually inspected the six candidate images and baseline phone comparisons; no version-induced layout break was seen.

## Claims and incumbent boundary

There is no CONTRACT.md Product target table in home. The three read source contracts name Uptime incumbents Pingdom/UptimeRobot/Better Stack Uptime/Site24x7; Oncall incumbents PagerDuty/Opsgenie-JSM/Splunk On-Call; HappyToHelp incumbents Zendesk/Intercom/Help Scout/Freshdesk, with Decagon/Sierra/Pylon as agent baseline. This is a listing-sync gate, not a new implementation comparison against those products. The frozen requirement is truthful released-version presentation and no regression, not proof of every source seed’s target contract.

Uptime STATE-001 and NETWORK-001 remain partial; HappyToHelp’s eight identified partial clauses remain partial. Oncall OC-006/OC-022 are also partial with gaps in cited assertions. Their requirement text supports the unchanged claims; none of those partial labels alone establishes false implementation. The source CONTRACT.md bytes at all three new tag refs have the same hashes the baseline state had recorded. No clause status was edited or promoted anywhere. FOLLOW-UPS.md retains the existing context; this gate adds zero C findings.

## Generator/ledger applicability and checks not performed

Source-lock regeneration/check: NOT RUN — not applicable; home has no sources.lock.json or documented source-lock command. Contract generated-view write/check: NOT RUN — not applicable; home has no CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md or declared generator. Migration-ledger check: NOT RUN — no ledger-check command/artifact is documented here; no migration changed. The repository’s applicable public data generator (`listings`) was independently checked and run without diff. No pre-gate stale condition was demonstrated. Full tests, broad sync/capture, provider actions and implementation audits were not added to the fixed rubric. The full suite is represented by the exact-SHA successful Verify workflow.

The first browser harness attempt timed out waiting for networkidle on baseline /uptime. Correcting readiness to DOM/h1/fonts allowed the complete unchanged main/head comparison to pass. Actual failure log and cleanup receipt are retained (NOTE G). Plain Next server logs contain missing local ancillary Cloudflare analytics bindings on this unprovisioned local run; they do not affect the frozen static version/render assertions and no backend/provider correctness is claimed. See LANDING-NOTES.md for these limits.

## Custody and blockers

No A, B or BAR finding. No unresolved blocker. The candidate remains at `c7c60bc1617ba017472cb25a91f419492bc4bef5` on the existing PR. No product push or READY claim is made by this gate. Evidence publication uses only evidence/je-gate-26, separately from the product. The lane retains the Mac publication scan, PR landing, deployment and live proof. Owned server PIDs were stopped and browser closed; process-cleanup.json records actual shutdown. Clone and baseline archive are removed after report transfer, with the packet retained outside them.

API read budget: 9/10 calls: initial PR, exact-head run discovery, three release lists, three tagged CONTRACT.md reads, final PR. No CI poll was needed because Verify had completed. A separate final Git advertised-ref read confirmed main/base and candidate branch unchanged.

Relevant receipt index: gate-receipt.json, pr.json, pr-final.json, ci.json, refs-final.txt, identity.txt, data-receipt.json, source-receipt.json, claims-receipt.json, browser-receipt.json, process-cleanup.json, checks.txt, command logs, full diff.patch and screenshots. The source readbacks are retained outside the published packet; only relevant non-secret derived source receipts are selected for public report transfer. The report contains no credential values, environment dump, owner session, symlink or private held-out material.

Report completed UTC: 2026-11-11T16:13:47.442216+00:00.
