# je-sync-27 results

Done: candidate verified and pushed: `cloud/je-sync-27` at `5c025fcb6629b82000ac2d09a2ad4b1c5df8f81b`. PR: https://github.com/just-every/home/pull/51.

## Plan and completion

The full execution plan is in PLAN.md. All requested local work is complete: fresh shallow clone from main, source/tool review, npm ci, complete dry sync, copy-only apply, released-source review, full mechanical apply with ineligible Spool tag reverted, listings generation/check, final dry sync, type-check, lint, production build, 1440/390 browser proof, identity/scope/credential-pattern review, current-main rebase before first publication, guarded push and one PR. No empty or intermediate product commits were made.

Only just-every/home was cloned or written. Other seed repositories were read through gh api. An external transport adapter translated the committed tool's git ls-remote calls into the equivalent GitHub commit/ref API reads, including annotated-tag peeling. It did not change sync implementation, product data interpretation or source versions. Immutable commit-addressed file responses were cached between passes; mutable refs were freshly read on each pass.

## Actual dry-sync lines

Initial full dry sync: `Dry run: 2 of 49 seeds changed.`

- HappyToHelp: `version   newer tag v0.4.24 (page shows v0.4.23) [to apply]`.
- Spool: `version   newer tag v0.7.9 (page shows v0.7.8) [to apply]`.

Initial copy-only apply: `Applied: 0 of 49 seeds changed.` No public copy or art was changed by this flag.

Full mechanical apply wrote both proposed version tags. Spool was immediately restored to v0.7.8 before listings generation or publication. The full tool report is preserved as actual output, including that temporary mechanical write; withheld.md records the review correction.

After eligible promotion, copy-only apply for HappyToHelp: `Applied: 1 of 1 seeds changed.` `README.md, seed.json changed since the last sync [reported]`. These provenance changes were reviewed and recorded without wording changes.

Final full dry sync: `Dry run: 1 of 49 seeds changed.` Spool: `version   newer tag v0.7.9 (page shows v0.7.8) [to apply]`. This is the deliberately withheld bare tag. All 49 sources and all 49 homepages were readable. There is no unexplained remaining finding. The actual mark/colour/homepage/status output proposed zero such changes and listed no recurring open findings; no redesign, hand redraw, style work, new gallery input or capture campaign was created.

## Release and copy provenance

HappyToHelp v0.4.24: https://github.com/just-every/run-happytohelp/releases/tag/v0.4.24 ; published 2026-11-13T09:36:51Z; non-draft, non-prerelease; asset `rer-release.dsse.json` present. The released source resolves to `6acf8a4c50dfeb94ca9ab705b1e386d282ea8e0f`. Envelope asset presence was checked through Release metadata; no independent cryptographic signature verification was performed or claimed. This is a version update, with no released-status promotion.

HappyToHelp v0.4.23 source was `3c45a60a6debb0886ae8c41eee18a95e6fee694d`. CONTRACT.md is byte-identical between these releases. README.md release notes and seed.json version changed. Existing JE wording stays true at the reviewed level; no new importer-adoption or live-provider claim was imported. The eight known partial judgments are unchanged. COPY-REVIEW.md supplies each relevant contract row and rationale; source documents and diffs are included. No contract clause or implementation judgment was promoted or edited.

Spool remains v0.7.8 at `47ecaeeec8c442aa4648ad3b7f4fc1d7e1f115e2`. Latest published Release: https://github.com/just-every/run-spool/releases/tag/v0.7.8 (envelope asset present). The fresh `releases/tags/v0.7.9` read returned HTTP 404, with the actual response/error preserved. The v0.7.9 bare tag is insufficient under RELEASED; its source was read for diagnosis only and was not imported as released copy.

SOURCE-REFS.md and each actual sync report list the complete 49-seed refs, commits and reasons. Released copy follows the displayed version, coming-soon copy HEAD. Initial and final runs found no new coming-soon copy drift. RER inventory was not used to downgrade JE and no RER work was started.

## Product diff and counts

- `src/data/seed-pages.ts:193`: HappyToHelp version v0.4.23 → v0.4.24 only.
- `public/data/listings.json`: generated timestamp and HappyToHelp version only. Every other public listing field remains byte-equivalent after parsing.
- `scripts/seeds-sync/state.json`: sync timestamp, HappyToHelp released ref/commit/tag and README/seed hashes, and the actual tool's open-finding bookkeeping. Full apply clears prior handled copy markers for Lamp, Oncall, Orbit and Uptime; promoted HappyToHelp copy provenance records its new reviewed-copy marker. These are provenance records, not public clause-status changes. No other seed's public data changes.

Before and after: **49 listings, 35 released, 14 coming soon**. Released-status changes: **0**. Public claim changes: **0**. Contract/clause-status changes: **0**. Brand/colour/homepage/still/gallery changes: **0**. Spool v0.7.8, Lamp v1.11.14, Orbit v0.4.8, Oncall v0.5.11 and Uptime v0.5.10 remain intact. Auth stays coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Pricing presentation is untouched: Assisted US$10/month and Managed US$100/month, with no GST or billing-country edits.

## Checks and browser evidence

Passed: npm ci; initial/final full dry sync; both copy-only applies; full apply with reviewed Spool restoration; npm run listings; npm run listings -- --check; npm run type-check; npm run lint; npm run build; git diff --check; declared-path scope; credential-pattern scan; all candidate author/committer/trailer checks. Runtime: Node v24.19.0, pnpm fallback 10.12.4 (repository has no Node/packageManager pin); Verify uses the repository's existing Node 22 workflow. No permanent tests, weakened checks or full local test suite were added/run.

Browser assertions ran at 1440 only: HTTP 200, displayed v0.4.24, 49 generated listings, HappyToHelp v0.4.24, Spool v0.7.8, no horizontal document overflow and no page JavaScript errors. The changed HappyToHelp screen was captured once each at 1440 and 390 and visually reviewed, including its version row. See browser/receipt.json and the two PNGs. No additional mobile assertions were added.

Resolved environment limitations: the first dry attempt needed Playwright; it was installed without product dependency changes, and the full sync then passed. The first browser attempt waited on networkidle and timed out on background requests; the completed proof uses DOM readiness, fonts and a bounded settle. The local Next server logs Worker-only caches/D1 analytics availability warnings; this static page/listings proof does not qualify those unrelated APIs. No provider credentials or deployment were used. Browser contexts and the recorded local server PID were closed.

The provided fleet-hook symlink installation exposed Husky's relative-helper lookup. Supplemental local forwarding wrappers exec the original Husky launchers by original path, preserving both the repository pre-commit lint-staged checks and LFS pre-push hook as well as the fleet co-author cleanup. The successful commit ran ESLint/Prettier hooks. No hooks were disabled and no product hook files changed.

## Publication and CI

Product branch: `cloud/je-sync-27`; full SHA `5c025fcb6629b82000ac2d09a2ad4b1c5df8f81b`; parent main `274220fea1ba6f13126557bb86b5cc078680a4eb`. Current main was fetched and the unpublished commit rebased before first push (already up to date). The guarded product push succeeded on attempt 1; no retry, force push, main push, merge, deployment or landing occurred. All candidate authors and committers are Run Edit Run fleet <fleet@runeditrun.com>; no trailers survived or were added. Product checkout is clean.

PR: https://github.com/just-every/home/pull/51 . Exact-SHA Verify: https://github.com/just-every/home/actions/runs/43425109174 (run 43425109174); initial observation was in_progress on `5c025fcb6629b82000ac2d09a2ad4b1c5df8f81b`. After at least 300 seconds, the terminal REST observation returned completed/success on the exact candidate SHA. See RECEIPT.json and ci-observation.json. CI/PR API budget used 3/10 calls: PR creation, exact-SHA discovery, terminal observation. No workflow failures or failed-job log reads occurred; source reads are the required separate inventory reads. Main was re-fetched after the published save and remains unchanged, so no merge is required.

No builder blocker is known. Independent gate, Mac publication scan, landing hold, merge, deployment and live verification remain lane custody. Evidence publication is report transport only and is not product READY, acceptance or landing. This packet contains the complete actual non-secret tool reports, report receipts, source refs/diffs and browser proof, separately from the product branch.

READY branch=cloud/je-sync-27 head=5c025fcb6629b82000ac2d09a2ad4b1c5df8f81b
