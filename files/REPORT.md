Done: independent deciding gate of https://github.com/just-every/home/pull/55

Recorded at 2026-11-13T23:15:36.716950+00:00. Candidate branch cloud/je-sync-31, exact head 055dc4dbed1ae33d95a9cf0412464558c5ff5aef; baseline main 8d4a1a7af1f507fb24e1f6e2502bf0e967f31663. PR head and base were independently checked at the start and again at the end, unchanged. Local cloud/je-gate-39 was created from main as requested by the cloud wrapper, but the product review checkout remained detached at the exact candidate. No product changes, commits, pushes, merges, comments, dispatches or deploys. Evidence publication is separate and grants no product READY or landing custody.

Plan and completed execution

1. Configure fleet identity; read the launcher refresh and AGENTS.md; refresh the injected bundle and install the Git credential helper. Fresh shallow filtered clone of the sole declared repository, local fleet identity, read its AGENTS.md, package scripts, workflow, and sync implementation. Read the supplied builder brief and RULES inline. Retain main and fetch PR 55; check out only the required candidate.
2. Independently establish the exact PR head/base, review all diff hunks and all candidate commit parents/identities/trailers, and compare complete parsed public listings and state records to baseline. Check changed values for credential patterns and diff whitespace.
3. Read Lamp's stable Release once, annotated tag and peeled commit, released CONTRACT.md/README.md/seed.json, and DSSE asset only via gh api. Check the actual asset SHA-256 and all copy-source hashes. Do not clone another repository or use provider credentials. Do not claim cryptographic signature verification.
4. Run npm ci, repository listings check and write, verify no diff, type-check, lint and production build on the exact candidate. Build the baseline separately for the sole touched public route. Run the public-door assertion at 1440, capture and inspect the candidate at 1440 and 390, compare baseline visible text at 1440, and fetch /data/listings.json through the local production server.
5. Read exact-head CI runs once. Compare the unchanged Lamp copy against the release's status/gap rows. Tier observations only within the frozen rubric. Save the full report and actual receipts/screenshots, publish the explicitly selected non-secret packet to evidence/je-gate-39 only, then delete both disposable checkouts and node_modules.

R1 MET — scope, all hunks, identities and credential hygiene

Commands: `git diff --name-only origin/main HEAD`; `git diff origin/main HEAD -- public/data/listings.json scripts/seeds-sync/state.json src/data/seed-pages.ts`; `git diff --check origin/main HEAD`; `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`; independent parsed checks in scope-probe.py. Results in scope-receipt.json, candidate.diff and candidate-identities.txt.

Exactly three paths changed, 14 insertions/16 deletions. All hunks are explained:
- public/data/listings.json: generatedAt advances from 2026-11-13T21:21:00.844Z to 2026-11-13T22:47:27.070Z; only Lamp's version changes, v1.11.14 to v1.11.15.
- scripts/seeds-sync/state.json: syncedAt advances from 2026-11-13T21:20:59.504Z to 2026-11-13T22:47:41.473Z. Lamp commit/sourceRef/tag advance to the released exact source. CONTRACT.md hash stays 8b575f27ee607ce3, README.md hash moves 778c7cf2ed2f6527 to 1a20f137749ab26b, seed.json hash moves b42cf20347b50d08 to 074cb758ae0a8d8f. The open-copy marker 42983364b373 is removed from HappyToHelp, Oncall and Spool and added to Lamp. It is SHA-256(type:summary)[:12] for `copy:README.md, seed.json changed since the last sync`, independently recomputed; these are detector bookkeeping markers, not acceptance statuses or published wording. No other state field changes; brand, mark and homepage observations are retained.
- src/data/seed-pages.ts: only Lamp version changes v1.11.14 to v1.11.15. All public wording is byte-identical after that single version substitution.

The only candidate commit, including all reachable side parents in origin/main..HEAD, has fleet author and committer, no trailers. No test path changed, deleted, skipped or weakened. No credential-shaped value in the diff; source commits, copy hashes and image fingerprints are provenance. Diff whitespace check passed. Mac full publication scan is reserved for landing, not claimed by this shallow gate.

R2 MET — promotion truth

Commands: gh api release/tag/content/asset endpoints enumerated in github-calls.jsonl. Release https://github.com/just-every/run-lamp/releases/tag/v1.11.15 (id 444800991) is non-draft and non-prerelease. Annotated tag object 6db107e62b0260abbaaf4312890c8038348c5630 peels to 5dd84e13f6b0478edc2fc5e759d513f5eccf6d57, exactly state.json's source. The actual downloaded rer-release.dsse.json asset is 3157 bytes, SHA-256 e9081372615ae76b5c832d71c40bf15023d783369fd64e49b762f93b76fa6350, equal to the release's asset digest and stated source. Asset integrity/presence is proven; cryptographic signature verification was not performed. The tag API reports unsigned; the frozen release rule requires the stable Release and envelope asset, not a signed Git tag.

Actual released source hashes match every recorded copy hash. seed.json version is 1.11.15. listings.json, seed-pages.ts and state.json agree on v1.11.15. Other path seeds remain HappyToHelp v0.4.25, Uptime v0.5.11, Oncall v0.5.13, Orbit v0.4.9, Spool v0.7.10; all other seeds' versions and statuses remain unchanged. No coming-soon copy was imported.

R3 MET — generated public data and production render

Commands and results:
- `npm ci`: exit 0; 726 packages installed; no product diff.
- `npm run listings -- --check`: exit 0, Listings current (49 seeds).
- `npm run listings`: exit 0, Listings unchanged (49 seeds).
- `git diff --exit-code`: exit 0 after generation.
- `npm run type-check`: exit 0.
- `npm run lint`: exit 0.
- `npm run build`: exit 0, production routes generated, including the actual /lamp slug.
- Baseline `npm run build`: exit 0 for the regression comparison.
- `cloud_run node /tmp/je39-browser/probe.mjs`: successful final public-door assertions at 1440, actual candidate /lamp HTTP 200 and v1.11.15; /data/listings.json HTTP 200 with v1.11.15. Candidate screenshots and manual inspection at 1440 and 390 show intact layout, readable version and wrapping, document width equal to viewport, no clipped prose, no browser pageerror events.
- `cloud_run node /tmp/je39-browser/baseline.mjs`: exit 0. At 1440 the complete visible body text on main equals the candidate after only v1.11.14 to v1.11.15 replacement. Baseline screenshots preserve the regression look.

Before and after: 49 = 35 released + 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen absent in both. No pricing statement or price source changed; Assisted US$10/month and Managed US$100/month are preserved by the no-copy-change comparison. Those plan labels are not rendered on JE's /lamp page; this gate does not claim to have reverified a separate provider's pricing site. No new GST or billing-country wording appears.

Seed source lock, generated contract views and migration-ledger regeneration are not applicable: this home repository has no sources.lock.json, CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md, documented contract generator or migration-ledger check. Database migrations are untouched. The repository's applicable generated-data public check, listings, was independently run in both check and write modes and left no diff. Full seeds:sync is not repeated because the frozen gate enumerates the applicable release/listings/provenance checks and forbids widening to an all-seed capture/source campaign. No published galleries, marks or colours changed.

R4 MET — exact-head CI

Command: `gh api 'repos/just-every/home/actions/runs?head_sha=055dc4dbed1ae33d95a9cf0412464558c5ff5aef&per_page=100'`, read once at 2026-11-13T23:07:00Z. Verify branch run 43522518973 is completed/success with head_sha exactly 055dc4dbed1ae33d95a9cf0412464558c5ff5aef, https://github.com/just-every/home/actions/runs/43522518973. PR #55 run 43522577260 is also completed/success on that exact SHA. Duplicate PR-event Verify branch run 43522582393 is completed/skipped by the workflow's cloud-branch PR condition; it does not replace or negate the successful push Verify. No rerun, dispatch or polling was needed. Ten total gh calls, all documented; no failed-job log requests.

R5 MET — claim honesty

Read released Lamp CONTRACT.md and actual JE page wording (claims-receipt.json and CLAIMS_REVIEW.md name every exact promise sentence, clause, status and source gap). Eight of ten named promises have existing partial-evidence judgments; PAGE-013 and UPTIME-001 are done. Their partial rows say assertions or provider proof are absent; they do not prove the statements false. No new source-proven false claim was found. Both tagged contract hash and published JE wording are unchanged from baseline. Do not convert known partial evidence to a false-claim finding or rewrite copy. The known HappyToHelp, Terrace, Uptime/Lamp and Spool follow-ups remain unchanged and add no new count. No clause status changed.

Findings and outcome

No new A, B, BAR or C finding. One local-preview process note is recorded below and in LANDING-NOTES.md; no blocking or C follow-up count. No missing ruling, account or check blocks this gate. All five rubric rows are MET; no required row is NOT RUN.

NOTE G: Plain Node preview logs missing Cloudflare Cache API and uninitialized analytics-table warnings on both main and candidate; actual /lamp and listings render successfully. This is preview environment evidence, not a new product regression. The lane retains the Mac publication scan, PR merge, deployment and live verification.

Product custody: candidate cloud/je-sync-31 at 055dc4dbed1ae33d95a9cf0412464558c5ff5aef, PR #55 remains open and unmodified. This gate creates no cloud/je-gate-39 product commit and makes no product READY claim. Evidence-only publication carries the complete report/receipts; it is not acceptance or landing. Delete disposable clone and baseline after confirmed evidence publication; keep the packet and publication receipt.

GATE PASS 055dc4dbed1ae33d95a9cf0412464558c5ff5aef
