# je-gate-25 · independent deciding gate of JustEvery PR #41

Done: PR #41 may land under the frozen rubric. Candidate `cloud/je-sync-17` is **a5fcb3ad373f028a71c9271daf5a682af20614f4**. Main and the PR's base both resolved to **c520b40c7b5bec6943a7e08bbb8fbdccc5ad535a**. The PR was open, unmerged and still at the pinned head when checked. PR: https://github.com/just-every/home/pull/41.

Zero blocking findings, zero new C findings, one pre-existing D copy observation. No product changes or product commits were made; no product branch was pushed, and no PR was opened, edited, commented on or merged. Local `cloud/je-gate-25` was created from main and advanced without a new commit to the exact candidate for report provenance. The existing PR retains its builder branch. Evidence publication is separate and makes no product READY or landing claim.

## Plan and scope

The full executed plan is in PLAN.md. In order: establish fleet setup and a fresh shallow filtered clone; confirm pinned PR/base; examine the three-path diff and every candidate commit; read four Releases and four tagged contracts within ten API calls; independently run the generator and required local checks; browse the four built real routes at 1440 and 390 and compare main at 1440; assess claim honesty under the fixed rubric; publish the non-secret packet only on the evidence ref and delete the clone. The inline RULES and je-sync-17 brief were read as context, not as additional builder work. The builder's report was not used as evidence.

Only just-every/home was cloned. Other repositories were read solely through `gh api`. No provider credentials, held-key shim, owner website checkout, deployment command, scheduler or watcher was used. No test was added, deleted, skipped or weakened.

## Row decisions

| Row | Decision | Commands / observations |
| --- | --- | --- |
| R1 Scope | MET | `git diff --name-only origin/main HEAD`, full `git diff origin/main HEAD`, `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`, and audit-probe.py. Exactly the three allowed files; one candidate commit with the baseline as its parent; fleet author and committer, no trailers. Every added line checked for credential shapes; no matches. Every state leaf change is a sync observation, copy provenance or open-finding marker, not public wording. |
| R2 Promotion truth | MET | Four `gh api repos/just-every/run-<seed>/releases?per_page=100` reads (once per seed), plus successful tagged `contents/CONTRACT.md?ref=<tag>` reads. All four tags resolve, with non-draft/non-prerelease Releases and `rer-release.dsse.json`. audit-probe.py compares every listing field, page source and state version; four agree and every other version/status is unchanged. No coming-soon copy imported. Envelope presence checked; signatures not verified. |
| R3 Public data and render | MET | `npm ci`, `npm run listings -- --check`, `npm run listings`, `git diff --exit-code`, `npm run type-check`, `npm run lint`, `cloud_run npm run build`: all exit 0. Browser probe of `/orbit`, `/spool`, `/happytohelp`, `/oncall` asserts HTTP 200, correct title/version, visible version, no horizontal overflow and zero page errors at 1440. All eight 1440/390 proof images reviewed with no layout break. Baseline build and the four 1440 probes pass; main text differs only in the four version strings, with equal measured version and page geometry. |
| R4 Exact-head CI | MET | One REST read: `gh api 'repos/just-every/home/actions/runs?head_sha=a5fcb3ad373f028a71c9271daf5a682af20614f4&per_page=100'`. Push **Verify branch 43004692443** is **completed/success** on the exact full SHA. No dispatch, rerun, watcher or extra poll. PR Verify 43004735242 is skipped by the workflow's cloud-branch condition; it is not the successful evidence. Code scanning 43004731353 also succeeded. |
| R5 Claim honesty | MET for this change | Each of the four tagged CONTRACT.md status tables was read and paired with JE's summary, does-list and exact promise sentences (je-copy.json, claim-review.json). All four tagged contract byte hashes independently match state's CONTRACT.md copy hash. Partial evidence alone is not called false. One explicit Spool wording contradiction is pre-existing D, detailed below and in FOLLOW-UPS.md. No new source-proven false claim or newly introduced security/money/privacy/authority/data-loss claim was found. |

Verify: https://github.com/just-every/home/actions/runs/43004692443. API calls: **10/10** (PR 1, exact-head CI 1, Releases 4, tagged contracts 4). Each call and result is recorded in api-calls.json; all succeeded. No failed job logs were needed.

## Every diff area explained

- `public/data/listings.json`: generatedAt advances from 2026-11-11T05:43:52.959Z to 2026-11-11T10:29:31.072Z. The only listing-field edits are HappyToHelp v0.4.18→v0.4.19, Oncall v0.5.6→v0.5.7, Orbit v0.4.4→v0.4.5 and Spool v0.7.4→v0.7.5.
- `src/data/seed-pages.ts`: those same four version values, and no other byte changes after normalizing those values. Summaries, does-lists, promises, incumbents, page links, SEO and coming-soon content are unchanged.
- `scripts/seeds-sync/state.json`: syncedAt advances from 05:43:32.135Z to 10:29:29.368Z. The four promoted seeds advance commit/sourceRef/tag to their released-copy provenance. HappyToHelp, Oncall and Spool update README.md/seed.json source hashes; Orbit updates CONTRACT.md/seed.json hashes. SourceReason stays “released listing version”. No contract implementation judgment or public wording is stored or changed here.
- State also refreshes homepage color fingerprints for **Cradle, Dial, HappyToHelp, Lamp, Mango, Nook, Oncall, Orbit, Pencil, Penny, Slate, Spool, Uptime and Vector**. These 14 observation changes were understated in the builder context and are explicitly included in this gate. They change no image, mark, brand token, headline or public asset. The sync's documented state keeps such fingerprints even for reel pages; they are provenance, not copy.
- Open-finding markers: HappyToHelp c843303a1181→42983364b373; Lamp drops 42983364b373; Oncall adds 42983364b373; Orbit adds 922fed04eacf; Spool adds 42983364b373; Uptime drops 64cb07f6a0dd. detect/index.mjs computes these from finding type/summary and remembers reported-but-unapplied findings; clearing them is not an implementation-status promotion. Full old/new leaves are in state-delta.json. There are no other leaf changes.

## Release sources and counts

| Seed | Before → after | Eligible Release | Published UTC | State copy commit |
| --- | --- | --- | --- | --- |
| Orbit | v0.4.4 → v0.4.5 | https://github.com/just-every/run-orbit/releases/tag/v0.4.5 | 2026-11-11 05:54:43 | 36f701cc53e127f0ed4baf367625af329fef6768 |
| Spool | v0.7.4 → v0.7.5 | https://github.com/just-every/run-spool/releases/tag/v0.7.5 | 2026-11-11 06:02:41 | 5886617d17da50761fb442f66b03ce623d5e9559 |
| HappyToHelp | v0.4.18 → v0.4.19 | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.19 | 2026-11-11 06:22:53 | 63b6217aae78be1cdaf5d1b8f8ac6f1d04ce83ad |
| Oncall | v0.5.6 → v0.5.7 | https://github.com/just-every/run-oncall/releases/tag/v0.5.7 | 2026-11-11 08:31:26 | 4d80176140c138d0d9b01830b75e2edc18f9b8da |

Release metadata is in the four `*-release.json` receipts. Each CONTRACT.md is read at the tag, not seed main. Commit values above are state-recorded provenance; they were not separately resolved by additional ref API calls. Successful contract reads at each exact tag independently establish tag readability, and those bytes match state's contract hash. Asset presence is not a verified DSSE signature.

Before **49 = 35 released + 14 coming soon**; after **49 = 35 released + 14 coming soon**. Uptime **v0.5.4** and Lamp **v1.11.10** are unchanged. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are all absent. No seed status changes. No contract clause status changes. No copy, pricing or presentation edit: the existing pricing policy (Assisted US$10/month, Managed US$100/month, without new GST/country wording) is unchanged because no pricing-bearing text or renderer changed. This is an unchanged-policy assessment, not a claim that both paid-plan labels appear on the four product pages.

## Claims and incumbent bar

Home has no CONTRACT.md or Product target table. This listing-sync gate uses the four seeds' named product incumbents only to interpret ordinary buyer-visible behavior: Orbit names HubSpot Sales Hub/Pipedrive/Salesforce Sales Cloud; Spool names Sentry/Datadog Error Tracking/Rollbar/Bugsnag; HappyToHelp names Zendesk/Intercom/Help Scout/Freshdesk; Oncall names PagerDuty/Opsgenie/Jira Service Management/Splunk On-Call. No incumbent product was separately audited or used to widen the rubric. Spool's contract explicitly documents its plain-Resolve behavior as matching Sentry.

The exact public promises map as follows: Orbit 2 done + 8 partial; Spool 6 done; HappyToHelp 2 done + 8 partial; Oncall 8 done + 2 partial. These are only the JE promise-linked clauses, not whole-seed status counts. The complete source tables and exact gaps are included; no statuses are promoted. Orbit OPP-004's missing source-evidence drill-through is not itself a contradiction of JE's narrower source/time/weight presentation sentence. Oncall OC-006 and OC-022 gaps concern unasserted export/absence and interrupted-resume outcomes beyond the narrower JE sentences. HappyToHelp's eight existing evidence gaps remain known follow-ups and are not new findings. No source says their promised implementation is false merely because its evidence status is partial.

OUT OF SCOPE D: Spool's unchanged ERR-006 promise says “Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm.” Released source ERR-006 line 157 explicitly documents plain Resolve regressing on the next accepted event in any release; TEAM-003 acceptance 4 line 279 names the same-release trigger, and SDK-009's status row records plain resolution as asserted. The sentence is already on main; the Spool contract hash is unchanged across the sync and matches the independently read tagged bytes. This is a pre-existing copy mismatch, without a new money/privacy/authority/data-loss defect. See FOLLOW-UPS.md for the exact source and ordinary trigger. It does not change this verdict.

NOTE G: Local `next start` reports missing Cloudflare cache and local analytics-table bindings on both candidate and baseline. The first harness's networkidle wait timed out on gallery/media loading; a DOMContentLoaded-plus-fonts probe completed without mocking or changing the application. All four public product pages pass at both widths and compare cleanly to main. Full diagnostics and setup/landing limitations are in LANDING-NOTES.md. These are not reproduced product regressions.

## Applicability, custody and limits

Listings is this repository's documented applicable generated-data check; it independently passes with write producing no diff. There is no sources.lock.json, seed contract-doc generator, generated acceptance/claims pair or documented migration-ledger checker here. Those seed-specific triage steps are **NOT RUN / not applicable**, not silently claimed as passed. No migration changed. The full suite was not run locally, per gate proportionality; exact-head Verify is green. The fleet Mac's publication scan, PR landing and deployment remain required lane steps and were not performed here.

The gate made no product commit, product push or READY claim. Browsers were closed and only the two recorded server PIDs were terminated. Receipt hashes and outcomes are in RECEIPT.json; the packet includes the actual reports, public source receipts, candidate diff, probes and screenshots. Only explicitly selected regular, non-secret files are sent to refs/heads/evidence/je-gate-25; evidence is not product acceptance or landing. After successful publication and verification the clone and node_modules are removed, retaining this report and packet outside the clone. No blocker remains for this gate.

GATE PASS a5fcb3ad373f028a71c9271daf5a682af20614f4
