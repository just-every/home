# je-gate-36 — independent deciding gate for PR #52

**Decision: PASS. No new blocking findings and no new C follow-ups.**

Repository: just-every/home. Candidate branch: cloud/je-sync-28. PR: https://github.com/just-every/home/pull/52.
Candidate: **181ca0a1b0d41af1dc4b9566412fc64f11267787**.
Baseline and current PR base: **42d2b3bfd372f151c993e36128249d7e059091de**.
PR head/base were independently checked twice and remained exact; PR was open and mergeable. No product commit, push, PR write, CI dispatch/rerun, merge or deployment was performed. The local cloud/je-gate-36 branch was created from main as the cloud wrapper requested; the reviewed candidate was checked out detached. Evidence transport is separate from product custody and does not imply landing.

## Plan and execution

The full plan is in PLAN.md. Execution covered: fresh shallow/blob-filtered home clone; repository and inline instructions; complete candidate diff and identity inspection; one release-list read, annotated-tag resolution and release-pinned copy-source reads through gh api; independent data/provenance comparisons; npm installation, listing generation, type-check, lint and production build; real /spool and /data/listings.json public-door checks; candidate versus independently built main at 1440 and 390; one exact-SHA CI discovery; released contract-to-copy review; final PR identity recheck; explicit report-only evidence publication and clone cleanup. No other repository was cloned. Nine of ten allowed GitHub API calls were used, with no polling needed.

## Frozen rubric

| Row | Result | Commands / source and observed result |
| --- | --- | --- |
| R1 Scope | MET | `git diff --stat origin/main HEAD`, full `git diff origin/main HEAD`, `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`, and `node static-probe.mjs`. Exactly the three allowed paths, 12 insertions / 12 deletions; one candidate commit; fleet author and committer; no trailers, test edits, skipped assertions or credential-shaped values. Every changed state field is provenance or an open-copy marker; no wording field changed. |
| R2 Promotion truth | MET | `gh api 'repos/just-every/run-spool/releases?per_page=100'` read once; tag ref and annotated tag object reads; release-pinned CONTRACT.md, README.md and seed.json reads; `node static-probe.mjs`. v0.7.9 exists, non-draft and non-prerelease, with rer-release.dsse.json; tag resolves to 8049c9153f1d987bba6211bc05b8405b06101a6f. All three candidate version locations agree and copy hashes reproduce. Every other public listing is deeply equal to main. No wording or coming-soon copy was imported. |
| R3 Public data and render | MET | `npm ci`, `npm run listings -- --check`, `npm run listings`, `git diff --exit-code`, `npm run type-check`, `npm run lint`, `npm run build` all exited 0. Listings current / unchanged, 49 = 35 released + 14 coming soon; all eight exclusions absent. Real built /spool and /data/listings.json return 200; candidate shows v0.7.9, main v0.7.8. Candidate/main screenshot proof at 1440 and 390 and matching geometry/text show no layout regression. Pricing implementation is byte-identical; the quoted Assisted/Managed statements are absent on both revisions, as explained below. |
| R4 Exact-head CI | MET | `gh api 'repos/just-every/home/actions/runs?head_sha=181ca0a1b0d41af1dc4b9566412fc64f11267787&per_page=100'`. Push Verify branch run 43433866088 is completed/success on the exact SHA. PR dynamic run 43433898192 also completed/success. PR-triggered Verify 43433902415 is completed/skipped under the workflow's intentional cloud-branch condition, not failed. No dispatch, rerun or wait was needed. |
| R5 Claim honesty | MET | `gh api 'repos/just-every/run-spool/contents/CONTRACT.md?ref=v0.7.9'` and the released README.md / seed.json, against the entire JE Spool block in src/data/seed-pages.ts and the built page. No new source-proven false claim. Partial evidence alone was not treated as false implementation. Known pre-existing ERR-006 wording was not reopened. No clause/status judgment was changed. |

No frozen-rubric row is UNMET or NOT RUN. Source-lock, generated contract-view and migration-ledger checks are **not applicable**: home has no CONTRACT.md, sources.lock.json, documented contract generator or migration-ledger check in AGENTS.md, package scripts or Verify. This is the listing site, not the Spool seed; the gate did not clone or run another repository's generators.

## Every hunk explained

1. `public/data/listings.json`: generatedAt advances from 2026-11-13T12:21:08.975Z to 2026-11-13T13:23:14.204Z. The Spool version changes v0.7.8 → v0.7.9. Status remains released. After removing generatedAt and normalizing that single version, the entire JSON is deeply identical.
2. `scripts/seeds-sync/state.json`: syncedAt advances from 2026-11-13T12:21:04.934Z to 2026-11-13T13:22:47.701Z. HappyToHelp's `open: ["42983364b373"]` is removed. Spool's source commit changes 47ecaeeec8c442aa4648ad3b7f4fc1d7e1f115e2 → 8049c9153f1d987bba6211bc05b8405b06101a6f; sourceRef and tag change v0.7.8 → v0.7.9, while sourceReason remains "released listing version". README.md copy hash changes 681c10b41dbc712a → 8e4935c8e07d3150; seed.json changes abe07bec13dcc59f → 9df4692f3993614c; CONTRACT.md remains ee9c871bfa25a110. Spool receives `open: ["42983364b373"]`. No other state leaf differs.
3. `src/data/seed-pages.ts`: only Spool's version literal changes v0.7.8 → v0.7.9. Reverting that literal produces byte-for-byte equality with main, including summaries, promises, SEO and coming-soon wording.

The marker 42983364b373 independently reproduces as the first 12 SHA-256 hex digits of `copy:README.md, seed.json changed since the last sync`. `scripts/seeds-sync/detect/copy.mjs` produces a manual copy-review finding, not an automatic wording edit; detect/index.mjs `closeRecord()` tracks unapplied findings under `open`. Thus the HappyToHelp deletion / Spool addition is review bookkeeping rather than a public-copy transfer or an implementation-status judgment.

## Release and provenance

Release: https://github.com/just-every/run-spool/releases/tag/v0.7.9.
Release ID: 444210704. Published: 2026-11-13T12:35:45Z. draft=false; prerelease=false.
Envelope asset: rer-release.dsse.json, asset 743601522, 3089 bytes. **Asset presence only; no signature verification claimed.**
Annotated tag object e5a543bcbe2f77f4d11b86eb02f3f983e05fae05 points to commit 8049c9153f1d987bba6211bc05b8405b06101a6f, exactly the new state provenance.

Independently calculated SHA-256 hashes of the raw files at v0.7.9:

| File | Full hash | State's first 16 digits agree |
| --- | --- | --- |
| CONTRACT.md | ee9c871bfa25a110d3f3e61924164c75cc17ea412cb775f2e0621f114ab3594b | yes |
| README.md | 8e4935c8e07d3150b58cde42e5f06e7a8eb90b063c2215f407ee7e5c5eed5436 | yes |
| seed.json | 9df4692f3993614c65983b49abbf98a40b6e3521668764e021b9c6295c35e58e | yes |

| Entry | Before | After | Status |
| --- | --- | --- | --- |
| Spool | v0.7.8 | v0.7.9 | released unchanged |
| HappyToHelp | v0.4.24 | v0.4.24 | released unchanged |
| Lamp | v1.11.14 | v1.11.14 | released unchanged |
| Uptime | v0.5.10 | v0.5.10 | released unchanged |
| Oncall | v0.5.11 | v0.5.11 | released unchanged |
| Orbit | v0.4.8 | v0.4.8 | released unchanged |

All remaining versions, status values, marks, colours, URLs and public wording are unchanged. Both versions contain 49 public entries: 35 released and 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent before and after.

## Public render and regression comparison

The actual route is `/spool`, generated by src/app/[slug]/page.tsx. The production page and public JSON were read through HTTP from the real Next production build; no fake route, fixture response or provider service was substituted. Chromium was /usr/bin/chromium with --no-sandbox, in fresh ordinary browser contexts. Functional page/data assertions ran at 1440; 390 supplied visual proof and recorded metrics.

| Width | Candidate version | Main version | Document width, head/main | Document height, head/main | Page JS errors |
| --- | --- | --- | --- | --- | --- |
| 1440 | v0.7.9 | v0.7.8 | 1440 / 1440 | 4512 / 4512 | none |
| 390 | v0.7.9 | v0.7.8 | 390 / 390 | 4367 / 4367 | none |

The entire visible page text matches after normalizing only the version. Screenshots show no introduced break in header, gallery, copy, promise cards, install instructions or version facts. Offscreen carousel slides are clipped within their gallery and do not create document overflow. Deferred lazy footer artwork is unchanged. The public JSON serves the matching version and all 49 entries.

The first browser harness waited for networkidle and timed out; the second unnecessarily waited for hidden/lazy gallery images and timed out. Both closed the browser in finally. The final harness waits for the actual Version fact and fonts, records lazy image state, and completes. These were harness waits, not failed user-facing product assertions. Actual receipts retain these limitations.

Both plain-Next local servers log the same unavailable Cloudflare caches token snapshot and missing uninitialized local D1 analytics table. These do not prevent the rendered route or public JSON from returning 200 and do not produce page JavaScript exceptions. This is an unchanged local-runtime limitation, not a new defect. No provider credentials were used.

## Released contract and claim review

Spool's named incumbents are Sentry, Datadog Error Tracking, Rollbar and Bugsnag (SmartBear). This round changes the listing's published version, not incumbent behavior or Spool's implementation. The gate applied only the fixed release/listing checks and one touched-route regression look.

The six JE promise sentences are unchanged:

| Clause | Exact JE sentence | v0.7.9 status |
| --- | --- | --- |
| ERR-003 | Error details are scrubbed before they are stored: emails, tokens and passwords are removed, and headers, cookies and request bodies are not kept by default. | done |
| ERR-004 | Owner sign-in, error sending and read-only agent access are separate, revoking one takes effect on the next request, and your source maps are never public. | done |
| ERR-002 | An error is only counted once it is fully saved, and a repeated send never counts twice. | done |
| ERR-006 | Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm. | done; known pre-existing wording follow-up retained |
| ERR-007 | The evidence packet is size-limited and never includes your source code. | done |
| ERR-008 | Counts of errors accepted and rejected are visible, and a quiet period is never reported as proof an error is fixed. | done |

ERR-005 (source map identity) and SDK-012 (unmodified server runtimes) remain partial; their status/evidence is not a demonstration that the existing general page sentences are false. The released README explicitly describes JavaScript/Python/Go capture, supported Sentry DSNs, private maps, project evidence access and later-release regression. No new source-proven false assertion was found in the summary, eight does items, promises or SEO. No source clause was promoted and the gate made no status changes.

## Findings and landing notes

Blocking A/B/BAR: 0. New follow-up C: 0. Clause status changes: none.

NOTE G: The frozen rubric quotes Assisted US$10/month and Managed US$100/month, but neither exact statement exists in this checkout on main or head. All relevant rendering/pricing source bytes are unchanged; the actual Spool licence fact is "MIT, 100% free" on both. The gate verifies preservation and does not claim to have observed those two absent prices.

OUT OF SCOPE D: The brief's known ERR-006 wording mismatch remains unchanged. Its exact sentence is listed above. Existing HappyToHelp, Terrace, Uptime and Lamp follow-ups were not re-audited or counted as new findings.

NOTE G: The full Mac publication scan remains the lander's custody, as the cloud instructions state. No product tree was published here; report-only publication is not a substitute for that scan, acceptance, READY or landing.

No blocker remains. FOLLOW-UPS.md contains no new C item; LANDING-NOTES.md records the process notes. The complete actual report, source/read receipts, check logs, probe scripts and browser proof are retained in this packet. No credentials, environment dumps, private held-out material or symlinks are selected for evidence transport.

GATE PASS 181ca0a1b0d41af1dc4b9566412fc64f11267787
