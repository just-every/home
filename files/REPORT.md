# je-sync-11 · 7 November 2026 listing sync

The candidate refreshes sync provenance only. Public listings, wording, versions, release statuses, marks, colours, homepages and galleries are unchanged. Counts remain **49 listings: 35 released and 14 coming soon**. The only product path is `scripts/seeds-sync/state.json` (8 insertions, 8 deletions): the sync timestamp, four source commits and three CONTRACT.md hashes.

## Plan and execution

The full plan is in PLAN.md. Executed in order: fleet initialization and a fresh shallow filtered clone at main 706ef98b603a948b1352be2089ccf614e6f16aca; repository/sync-rule inspection; `npm ci`; full dry sync; source review; `npm run seeds:sync -- --copy-only --apply`; full `--apply`; listings generation/check; final full dry sync; touched checks; scope/identity review; pre-publication main refresh/rebase; product publication and PR; exact-SHA CI observation; separate evidence return. No other repository was cloned or written. No lane INBOX.md or STATE.md was read or written.

The first dry attempt stopped because Playwright was missing, after resolving the source refs but before applying changes. Installing global playwright@1.63.0 restored the documented capture path. Subsequent browser work used `/usr/bin/chromium`, headless with `--no-sandbox`, through cloud_run and the existing sync implementation. All capture browsers closed in the tool's finally blocks; no server or persistent watcher was started. No sync code or permanent tests changed.

## Actual sync results

- Initial successful dry: **3 of 49 seeds with changes; 0 unreadable**. Only Crank, Placemat and Platter's CONTRACT.md changed. All 49 homepages returned HTTP 200.
- Copy-only apply: the same three findings were recorded as provenance; the tool applied no published copy or art.
- Full apply: **0 of 49 seeds changed mechanically**; 0 unreadable; no art or public data module written. It records the source pointers and complete observation state.
- `npm run listings`: **Listings unchanged (49 seeds)**.
- `npm run listings -- --check`: **Listings current (49 seeds)**.
- Final dry: **0 of 49 seeds changed; 0 unreadable**, all 49 homepages read. No unexplained findings remain.

The actual full reports and logs are under dry-before/, copy-apply/, full-apply/ and dry-after/. Each report lists every seed's full source ref/commit and reason. sync-receipt.json summarizes the runs; state-diff.json and product.patch preserve the actual product diff. There were no emitted recurring mark, colour, status or share-image follow-ups in this run.

## Per-seed diff and source review

| Seed | Previous source commit | New source commit | Product change |
| --- | --- | --- | --- |
| Crank | c16d7b09492b2c61c4cbfb4c0f892be6b0e9c1ef | 97dbba76c57a620110886e92a959fbf15b07d3d0 | HEAD provenance and CONTRACT.md hash |
| Mallet | 1331aef49644cea21ff44371ae4d7218bb588646 | 05f12bb25287d22654fda8b2a549712d14e94c1c | HEAD provenance only; watched copy hashes unchanged |
| Placemat | 7736720683b5d4d9236cecf9434a64b3ed84a61e | 187fa5c3720adb99a25412f029821a840d950867 | HEAD provenance and CONTRACT.md hash |
| Platter | 696c5253a2a06ba928c1e6f5457b4d4e10aa7e1a | b384813c64c78665f189b5aa1f6b8f2c0fca79da | HEAD provenance and CONTRACT.md hash |

All four are coming soon, with no release tag; their sourceRef and sourceReason remain unchanged. The 35 released seeds continue to read copy from the version displayed by JE, never unreleased HEAD. No released watched copy file changed and no released source disproves existing JE wording, so all wording is retained.

Actual GitHub source comparisons and the detailed review are in source-review/. In the unreleased sources, Crank CONTRACT.md:1376 BASE-AGENT-013 extends documentation evidence/gaps while staying partial; Placemat CONTRACT.md:727 GUEST-006 changes missing to partial and CONTRACT.md:794 BASE-AGENT-013 extends partial evidence/gaps; Platter CONTRACT.md:2281 PAY-005 changes missing to partial for bounded deposit notices with remaining retry/provider holds. These are observations of upstream source judgments, **not JE clause/status promotions**. No seed contract was edited, and JE clause status changes are **none**. Mallet's comparison changes workflow/verification/lock files only, with no watched copy-file drift.

## Deliberately withheld and preserved

- Crank's documentation, Placemat's group guestbook and Platter's failed-deposit-notice implementation drift is unreleased and not imported into JE copy, capability claims or status. Public wording remains true within its existing publication boundary.
- No new version/status proposal exists. There is no release promotion URL/tag to qualify. No DSSE asset-presence or signature-verification claim is made; signatures were not verified. A bare tag would not have sufficed. Auth retains its owner coming-soon override.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent; no override removal is necessary.
- Assisted US$10/month and Managed US$100/month, with the accepted presentation, are untouched. No GST wording or country restriction was introduced.
- No new mark, logo, design, style, gallery import or capture campaign. Only standard observations from the existing committed tool were taken. No visible product path changed, so candidate 1440/390 proof is inapplicable to this metadata-only candidate; independent post-landing live checks remain with the lane.

## Fresh public sources

JE's public `/data/listings.json` is byte-identical to main, SHA-256 `790e115fdf755eea1212b68df6df033fb9d2467dbff94cad0f61ad2928544bc8`. Public `/brand.json` is also identical, SHA-256 `a54bb68daa5f1590e5a6eaafecf38c627e42fa014f65c0d7efaf81bee809b7a4`.

RER's live `/data/seeds.json` contains 16 seeds. JE's newer versions for HappyToHelp, Lamp, Uptime, Penny, Oncall, Orbit, Mango, Vector and Pantry are preserved. The inventory gaps remain with the existing import custody; no RER repository or provider work was undertaken. The root `/seeds.json` returned 404; the actual data endpoint succeeded. An initial Python HTTP client returned 403; ordinary curl through the inherited proxy fetched the sources successfully. See public-sources/receipt.json and baseline-receipt.json.

## Validation and custody

Actual command results and terminal product/PR/CI identity are recorded in checks-receipt.json and TERMINAL-RECEIPT.json. Diff hygiene, strict path scope, unchanged public-listing identity and credential-shape scanning are recorded in hygiene-receipt.json. Product publication uses the fleet identity, active co-author cleanup/repository hooks and the supplied cloud push guard. Evidence files are published only to refs/heads/evidence/je-sync-11, separately from product custody. The lane retains the landing hold, independent deciding gate, Mac publication scan, PR merge, deployment and live verification.

All required local checks passed: type-check, lint and production build, along with listings generation/freshness and diff/scope hygiene. No permanent tests or broader suite were added or run locally. The production build had only the existing Next.js middleware-deprecation notice.

The first commit attempt exposed a path-dependent Husky wrapper incompatibility in the supplied symlink hook setup. The shell also initially continued after that failed commit; the attempted push was stopped by the same local hook before any remote ref was written. Husky's executable wrappers were changed only in Git's untracked hook directory to exec their original absolute paths, preserving both repository hooks and fleet commit-message cleanup. The successful pre-commit ran lint-staged/Prettier and the successful pre-push ran Git LFS. The shell was corrected to stop on failure. No product implementation changed. The successful commit's exact state-file hash matches the locally checked file. Identity/trailer inspection was repeated before the successful push.

The recovered local push command was `git push --porcelain origin HEAD:refs/heads/cloud/je-sync-11`; the original hook rejection supplied no HTTP status. The guard created a verified rescue bundle of the then-current main, not of a product candidate. It is not product custody or READY evidence. Successful product custody is separately recorded in product-custody.json. Public push logs omit only the injected-credential fingerprint/age metadata line; no credential values enter the selected evidence files.

## Terminal result

Done. Product branch `cloud/je-sync-11` at **025b26efa66630787eaf2fb5bf0549ac5ec6732c** is pushed; [PR #35](https://github.com/just-every/home/pull/35) is open. Exact-SHA [Verify run 42418959568](https://github.com/just-every/home/actions/runs/42418959568) completed successfully, observed 2026-11-07T22:11:01.507345+00:00. There were two CI REST calls separated by over 300 seconds; no failed-job log calls were needed. No blockers remain. Counts are 49/35/14 before and after; no clause, version or release-status promotions. READY applies to this exact SHA only. The clone is scheduled for removal after evidence publication; node_modules is removed before that publication.
