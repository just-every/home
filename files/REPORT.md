# je-gate-40 independent deciding gate

Recorded 2026-11-14T04:32:49Z. Decision: PR #56 may land under the frozen gate rubric. No new blocking or follow-up finding. This report does not merge or deploy it.

- Repository: just-every/home; PR: https://github.com/just-every/home/pull/56.
- Reviewed product branch: cloud/je-sync-32.
- Candidate: 198052d795b6a151201bd2d02713b892575897a7.
- Baseline and current PR base at both observations: 24b0e587dbb784d19a32bb4679f7a866a61c1f6a.
- Gate workspace: fresh shallow blob-filtered clone, detached at the exact candidate. Local cloud/je-gate-40 was created from main but never pushed. No product files fixed; no commits or clause status changes.
- Before → after: 49 = 35 released + 14 coming soon → 49 = 35 + 14; only Spool v0.7.10 → v0.7.11.

## Plan and independence

The complete executed plan is PLAN.md. The builder's narrative and evidence ref were context only, not evidence. No builder receipts were relied on. All scoped source, generator, build, browser and CI observations below were made independently. The supplied builder brief and RULES.md were read inline. The independent checks were limited to R1–R5, the standing bars and one regression comparison on the touched public surface.

## Frozen rubric

| Row | Result | Command / source | Actual result |
| --- | --- | --- | --- |
| R1 Scope | MET | `git diff --stat origin/main HEAD`; `git diff origin/main HEAD -- public/data/listings.json scripts/seeds-sync/state.json src/data/seed-pages.ts`; `git diff --check origin/main HEAD`; `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`; independent structural/credential-shape probe | Exactly the allowed three paths, 12 insertions and 12 deletions. One candidate commit; author and committer both Run Edit Run fleet <fleet@runeditrun.com>, no trailers. No credential-shaped values found in added lines or these three files. No tests or workflow files changed, deleted, skipped or weakened. |
| R2 Promotion truth | MET | `gh api repos/just-every/run-spool/releases/tags/v0.7.11`; `gh api repos/just-every/run-spool/git/ref/tags/v0.7.11`; peel annotated tag via `gh api repos/just-every/run-spool/git/tags/d54b7b443870e71ad7a2505b2f5970f93c3c9f8f`; read tagged files through contents API; independent JSON/hash reconciliation | Non-draft, non-prerelease Release exists and carries rer-release.dsse.json. Tag peels to b9e7e575097e0dd0fc0662ce1ed507fa0d41f0d8. Listings, page source and state all agree on v0.7.11; state names that exact commit. Tagged copy hashes independently match. Other versions/statuses and all wording unchanged; no coming-soon copy imported. |
| R3 Public data and render | MET | `npm ci`; `npm run listings -- --check`; `npm run listings`; `git diff --exit-code`; `npm run type-check`; `npm run lint`; `cloud_run npm run build`; production `next start`, HTTP and Chromium probe of `/spool` and `/data/listings.json` | All commands exit 0. Check says Listings current (49 seeds); generation says Listings unchanged (49 seeds), followed by no diff. Built real `/spool` returns 200 and visibly shows v0.7.11 at 1440 and 390. No horizontal layout break; document width equals viewport at both sizes, no text overflow or page exceptions. All eight excluded slugs absent from served listings. Pricing-bearing components/content were untouched. |
| R4 Exact-head CI | MET | `gh api 'repos/just-every/home/actions/runs?head_sha=198052d795b6a151201bd2d02713b892575897a7&per_page=100'` | Verify branch push run **43555153014** completed/success on exactly 198052d795b6a151201bd2d02713b892575897a7. Dynamic PR #56 run 43555197504 succeeded. Duplicate pull_request Verify run 43555200362 was intentionally skipped by the unchanged workflow guard. No rerun or dispatch; no pending or red Verify. |
| R5 Claim honesty | MET | `gh api 'repos/just-every/run-spool/contents/CONTRACT.md?ref=v0.7.11' -H 'Accept: application/vnd.github.raw+json'`; read JE Spool copy and tagged README/seed.json; compare rendered main/head article | No newly false claim in the touched entry. ERR-001/002/003/004/006/007/008/009 are done in the released status table. ERR-005 is partial for expanded lookup/capacity, with its five browser-map outcomes explicitly asserted; SDK-012 partial gaps concern PHP and Ruby, not the JE Python/Go claim. Partial status alone is not a falsehood. The known ERR-006 copy mismatch is pre-existing D, detailed below. |

## Every hunk explained

1. public/data/listings.json: generatedAt updates from 2026-11-13T22:47:27.070Z to 2026-11-14T04:06:54.212Z. Spool version changes v0.7.10 → v0.7.11. An independent field-by-field comparison proves no other listing field changes.
2. scripts/seeds-sync/state.json: syncedAt advances to 2026-11-14T04:06:52.747Z. Lamp's prior open-finding marker is removed; it changes bookkeeping only. Spool's commit, sourceRef and tag update to the exact published v0.7.11 source. README.md hash changes d3558bee3c5f1d96 → c942367838430a75; seed.json changes 76b608fdf01eeaa9 → 2121502a5371a2c3; CONTRACT.md stays ee9c871bfa25a110. Independently downloaded tagged bytes produce those exact SHA-256 prefixes. Spool adds open marker 42983364b373, independently recomputed from `copy:README.md, seed.json changed since the last sync` using the tool's key formula. The same summary can yield the same marker for different seeds; it is per-seed review metadata. All brand, mark, home and wording fields remain identical. No source status or contract judgment is promoted.
3. src/data/seed-pages.ts: precisely one replacement, the Spool version literal. Replacing that one literal in baseline reproduces the entire candidate file byte-for-byte. Summary, does, promises, move-in, SEO, run instructions and every other page remain unchanged.

## Release and source truth

Release: https://github.com/just-every/run-spool/releases/tag/v0.7.11, published 2026-11-14T02:29:00Z. Annotated tag object d54b7b443870e71ad7a2505b2f5970f93c3c9f8f points to commit b9e7e575097e0dd0fc0662ce1ed507fa0d41f0d8. GitHub reports rer-release.dsse.json asset 746016539, size 3105, digest sha256:0da3575aaa5b3f982ae20446ba90acb074829f14b1135669c1e9443376b17f89. This proves release/asset metadata, **not cryptographic signature verification**. The gate did not download or verify the envelope's bytes/signature.

Unchanged path seeds: HappyToHelp v0.4.25; Uptime v0.5.11; Oncall v0.5.13; Orbit v0.4.9; Lamp v1.11.15. Spool remains released, and every other seed's version and status is unchanged. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent on both trees and the served data.

Pricing preservation is a diff result: this round changes no price text, price model, source component or billing restriction. The touched Spool page does not render Assisted/Managed plan labels, and no such strings occur in its changed data; the specified Assisted US$10/month and Managed US$100/month policy is neither edited nor replaced. No new GST or billing-country restriction is introduced. External pricing pages were not added to the rubric.

## Public-door and regression evidence

`npm ci` installed 726 packages successfully. Local Node was v24.19.0 (no repository Node/pnpm pin; CI uses Node 22). Relevant local checks and production build succeeded. Main was separately built from `git archive origin/main` on this same runner using the same dependency installation. Local documented D1 migrations applied successfully in each scratch preview; no remote database was touched.

The candidate and baseline were served by actual production Next servers, not mocks. Chromium executable /usr/bin/chromium used --no-sandbox, a normal HOME and an ephemeral browser context. Assertions ran at 1440; the candidate's 390 run supplied visual proof. Both served listing endpoints return 49 = 35 + 14 and the right source-specific Spool version. Their JSON is identical after normalizing generatedAt and that version. Their rendered article text is identical after normalizing only v0.7.10 → v0.7.11. Full-page candidate screenshots at 1440 and 390 and baseline at 1440 were visually inspected: headings, gallery, text, promise cards, run instructions, version and footer fit normally. Main shows v0.7.10; candidate shows v0.7.11. No page exceptions.

The first media-bearing navigation on both snapshots hit the probe's 30-second networkidle timeout. Those failed-attempt receipts and logs are retained. The final probe uses DOMContentLoaded and font readiness, without intercepting requests or changing application code. Final candidate server PID 2297 and baseline PID 2602 were stopped, and browsers closed. Initial PIDs 1555 and 1892 were also stopped by their probe cleanup.

## Seed-specific independent checks

| Check | Result | Reason |
| --- | --- | --- |
| Listings source freshness | MET | Independent check and write both pass with no diff. |
| Source-lock regenerate/check | NOT RUN — not applicable | Home has no sources.lock.json or documented source-lock tool; no seed source-lock command exists here. |
| Contract generator write/check | NOT RUN — not applicable | Home has no CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md or documented contract generator. No such file was edited. Reading Spool's released contract does not authorize running or changing its repository. |
| Migration-ledger check | NOT RUN — not applicable | No ledger checker is documented/present; no migrations changed. All five existing migrations applied locally as preview setup. |
| Base publication scan | NOT RUN in cloud | The task explicitly retains the publication scan on the fleet Mac. The scoped credential-shape and identity checks above passed. No product push was made by this gate. |

## Incumbent, claims and findings

Home has no own Product target contract. The reviewed Spool release names Sentry, Datadog Error Tracking, Rollbar and Bugsnag (SmartBear), matching JE's move-in targets. At the behavior reviewed here these incumbents receive error reports, group repeated issues, map to source locations and track resolved/regressed releases. This sync only updates the public representation of Spool's released version; it neither adds a new product capability nor changes those switching claims.

OUT OF SCOPE D: The unchanged sentence “Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm.” is the known ERR-006 copy mismatch. Released ERR-006 and SDK-009 permit plain Resolve to regress on the next accepted event in any release. Same JE sentence on main and head; no new finding. See FOLLOW-UPS.md.

No A, B, BAR or new C findings. No status changes, demotions, new acceptance points or product fixes. Other pre-existing copy follow-ups remain untouched. F/G observations are in LANDING-NOTES.md and do not change the decision.

## CI, custody and limitations

CI Verify: https://github.com/just-every/home/actions/runs/43555153014. Exact head 198052d795b6a151201bd2d02713b892575897a7; completed/success. All returned run IDs are retained in ci-runs.json. PR head/base were rechecked unchanged in pr-final.json. GitHub budget: 9/10 calls, one release read, one CI discovery, zero CI dispatches/reruns/watchers. No failed-job logs were needed.

No sound work is unpushed: this gate creates no product work. The local bookkeeping branch cloud/je-gate-40 does not represent a new candidate, so no READY/PUSHED custody claim is appropriate. Existing PR #56 and builder branch are left untouched. The complete relevant packet is for report-only evidence/je-gate-40; publication receipt is returned separately in the terminal message. The lane still owns publication scan, merge, deployment and live verification. No blocker remains under the frozen rubric.

GATE PASS 198052d795b6a151201bd2d02713b892575897a7
