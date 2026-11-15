# je-sync-38 results
Author: Run Edit Run fleet. Updated 2026-11-15T16:29:27Z (date -u).

Product: just-every/home, cloud/je-sync-38, `4a7cef36328b98da774deab81849d7aa9a3fc1fd`.
PR: https://github.com/just-every/home/pull/62. Base: main e65b94456024ec80409449a4b7b91dedcd88f9a9.

## Result

Five version advances; only public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts changed. Public wording, marks, colours, homepages, galleries, pricing, implementation and clause statuses are unchanged. The generated sync state refreshes six active entries and its timestamp; its open hashes record copy-source observations, not implementation judgments. Counts: 49 total / 35 released / 14 coming soon before and after. Eight excluded slugs remain absent.

## Executed plan

# je-sync-38 plan

Author: Run Edit Run fleet. Timestamp: see started-at.txt (date -u).

1. Configure fleet identity, launcher credential helper, push guard and forwarding commit hooks. Clone only just-every/home shallow from fresh main; work only on cloud/je-sync-38.
2. Read AGENTS.md and committed sync implementation. Install with npm ci. Restrict sync to the six active paths (happytohelp,lamp,spool,uptime,oncall,orbit); later seeds remain paused until 25 November.
3. Freshly read RER /data/seeds.json and GitHub Release metadata for the five proposed version advances. Require non-draft, non-prerelease and rer-release.dsse.json asset presence; do not claim signature verification. Preserve newer JE versions over stale RER versions.
4. Run dry sync; retain its actual report, proposed mechanics and source refs. Run copy-only apply to record tagged copy provenance without replacing public wording. Review relevant released source rows; retain true copy, preserve named C/D follow-ups and all contract statuses.
5. Run mechanical apply, review every changed file, withhold unproven release/claim updates and any new gallery/capture campaign. Existing committed mark/colour/still inputs only. Run listings generation and check, then dry sync again and explain each residual finding.
6. Check scope, diff and identity hygiene. Run relevant touched checks, type-check, lint and production build. Capture changed public pages once at 1440 and 390; assertions at 1440 only. No full local test suite.
7. Fetch/rebase before first publication (merge only after publication), commit with fleet identity and active hooks, inspect every candidate identity/trailer, push via fleet guard. Open the requested PR. Discover exact-SHA Verify via REST, respecting one observation per 300 seconds and the discretionary ten-call budget; report real status.
8. Write complete results and actual receipts outside product clone. Publish explicit non-secret packet files only to evidence/je-sync-38 using cloud_evidence.py. Preserve pushed provenance; delete successful clone/node_modules at task end. Leave landing, publication scan, deployment and live proof to the lane.

## Source and release verification

Fresh public RER /data/seeds.json was read; generatedAt 2026-11-15T13:56:34Z. It matches the candidate on HappyToHelp, Lamp, Spool, Oncall and Orbit; Uptime remains v0.5.11 there. JE advances to independently verified v0.5.12 rather than downgrading or treating RER as release authority. Source refs use git ls-remote, with annotated tags peeled. Other repository files were read only through gh api; no other repository was cloned or modified.

| Seed | Before | After | Tagged copy commit | Release |
| --- | --- | --- | --- | --- |
| happytohelp | v0.4.28 | v0.4.28 | 41fb40246d2e69f928be397c48d952d147c39160 | unchanged |
| lamp | v1.11.17 | v1.11.18 | f495b89afd9f6832e4d4807018d91fa4c4670147 | https://github.com/just-every/run-lamp/releases/tag/v1.11.18 |
| spool | v0.7.11 | v0.7.12 | cc086904fd942175d18c60082b10c459c343dc78 | https://github.com/just-every/run-spool/releases/tag/v0.7.12 |
| uptime | v0.5.11 | v0.5.12 | 2045014b15f76380b5d7493c0c42b2caa430f88b | https://github.com/just-every/run-uptime/releases/tag/v0.5.12 |
| oncall | v0.5.14 | v0.5.15 | 44ca722b6a5dde173b5253df7b5e0eab762df459 | https://github.com/just-every/run-oncall/releases/tag/v0.5.15 |
| orbit | v0.4.9 | v0.4.10 | 22ca38c0e0bb5784440df021e8a5eb5b41a81de8 | https://github.com/just-every/run-orbit/releases/tag/v0.4.10 |

All five new Releases were freshly checked: draft=false, prerelease=false, published_at present, rer-release.dsse.json asset present. Each seed.json at the new tag declares the matching version on line 4. The envelope was not downloaded or cryptographically verified; no signature claim is made. release-*.json and source-refs.txt retain actual observations.

## Actual sync output

Commands used the committed tool unchanged with --only happytohelp,lamp,spool,uptime,oncall,orbit, because later seeds are paused until 25 November.

- Initial dry attempt: failed because Playwright was not installed. No apply ran. Installed playwright-core@1.63.0, then used /usr/bin/chromium with --no-sandbox through the committed capture tool. Restored the exact locked dependency tree with npm ci before typecheck/lint/build; browser tooling is outside the product tree.
- Completed dry-before: `Dry run: 5 of 6 seeds changed.` Exactly the five version lines in the table; no mark/colour/status/homepage/headline/replacement/copy findings and no unresolved mark/colour follow-ups in these six paths.
- Copy-before: `Applied: 0 of 6 seeds changed.` --copy-only --apply only records tagged copy provenance, retaining wording and art.
- Mechanical apply: `Applied: 5 of 6 seeds changed.` Exactly the five versions.
- Copy-after: the new published tag sources were recorded without replacing wording. Uptime CONTRACT.md/README.md/seed.json; Lamp seed.json; Orbit CONTRACT.md/seed.json; Oncall README.md/seed.json; Spool seed.json were reported for review.
- Listings: `Listings generated (49 seeds)` then `Listings current (49 seeds)`.
- Final dry: `Dry run: 0 of 6 seeds changed.` No unexplained residual findings.

## Copy review and deliberate withholds

- Lamp and Spool: only seed.json:4 changes the version; CONTRACT.md and README.md blobs are identical. No public claim correction is supported.
- Oncall: README.md:34 changes the release identifier; seed.json:4 changes the version. CONTRACT.md is identical. No claim correction is supported.
- Orbit: CONTRACT.md:1772 adds Zoom to its current Settings integrations list. seed.json:237-250 adds the bounded optional Zoom provider metadata; seed.json:4 changes the version. JE does not assert Zoom is absent, so its existing wording remains true. No new integration claim is imported.
- Uptime: CONTRACT.md:135 and :999 add bounded NETWORK-001 and OPS-001 qualification paragraphs, expressly retaining partial status and wider proof gaps. README.md:36 and seed.json:4 advance the release record/version. These do not prove existing JE wording false or justify any status promotion. The Uptime partial-evidence follow-up stays C.
- HappyToHelp: v0.4.28 and its tagged copy sources are unchanged; preserve all eight partial-evidence copy promises (C). Lamp partial evidence (C), Terrace trust (C) and Spool ERR-006 (D) remain follow-ups. No status, gap or evidence cell was changed.
- Later/coming-soon seeds remain paused and were not read or imported. No coming-soon copy drift was asserted from unavailable observations. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No excluded entry reappeared, so overrides.json was not edited.
- No new marks, colour selections, home design, gallery ingestion, share-image regeneration or capture campaign. The tool read the six existing homepages for comparison and found no mechanical artwork drift.
- Assisted US$10/month and Managed US$100/month presentation is unchanged; no GST wording or billing-country restriction was introduced.

## Validation and custody

- npm ci: passed; repeated locked npm ci before validation after installing browser tooling.
- npm run type-check: passed.
- npm run lint: passed.
- npm run build: passed (production Next build; 61 generated pages). The existing middleware deprecation warning is unrelated.
- npm run listings and npm run listings -- --check: passed.
- git diff --check, precise three-file/six-state-entry scope review, semantic listing diff (versions only), excluded-slug and credential-shaped diff review: passed. scope-receipt.json and product.patch retain the actual result.
- No added/deleted/replaced tests, no full local suite; CI owns full tests and Cloudflare production build.
- Active fleet forwarding hooks retained repository lint-staged and Git LFS hooks; precommit lint/format passed. All unpublished candidate author/committer identities were fleet, and trailers absent. Rebased onto freshly fetched origin/main before the first push; no published history rewrite.
- Guarded product push succeeded on attempt 1. Exact remote branch/head recorded in product-ref.txt. No main/default push, merge, deployment, deployment-provider credential use, or external service mutation occurred beyond the authorized GitHub branch and PR publication.
- Base publication scan and independent landing/deployment/live 1440/390 gates remain with the lane as the cloud brief requires. A local credential-shaped diff review is not a substitute for that scan.

Browser and CI final receipts are appended below before evidence publication.

## Browser proof

All five changed public seed pages returned HTTP 200 and passed agreement between rendered version, generated listing and SEO softwareVersion at 1440 pixels on the product SHA. Each changed version display was captured once at 1440 and 390; all ten screenshots were visually inspected and show the correct versions. The 390 captures are visual proof only. See browser-receipt.json and browser/*.png.

The first browser probe timed out waiting for networkidle because unrelated background requests remain active. The successful probe waits for document load and fonts, without mocking routes or suppressing network requests. The local Next server also logs unavailable Cloudflare cache/D1 analytics bindings for ancillary token and page-view requests; those do not prevent the static version displays. No production runtime, API or analytics claim is made by this local proof. Browsers closed in finally, and only recorded server descendants were stopped.

## Evidence selection

The packet explicitly selects complete actual reports/receipts/logs, source-review diffs/excerpts and public homepage/browser comparison captures. Raw RER catalogue and tagged source response are retained as read-only inputs outside the packet; all relevant source changes and exact blob/tag refs are recorded in the report and source-review files. No credentials, environment dumps, symlinks or held gate material are selected. All selected text was checked for credential-shaped values.

## Final exact-SHA CI observation

At 2026-11-15T16:32:26Z, REST returned completed/success for Verify branch run 43735528330 on `4a7cef36328b98da774deab81849d7aa9a3fc1fd`: https://github.com/just-every/home/actions/runs/43735528330. Discovery and final observation were 300 seconds apart, with one watcher. Nine explicit gh requests were used: five Release metadata requests, one batched GraphQL source read, one PR create, one exact-SHA run discovery and one final run read. The required unchanged sync tool additionally performs its own contents API reads (180 requests across the failed initial attempt and successful required sync passes); no task-local Git/API transport adapter was installed.

No product blocker remains. Clause status changes: none. Source evidence presence is distinct from signature verification. The lane retains publication scan, independent gate, PR landing, deployment and live proof.
