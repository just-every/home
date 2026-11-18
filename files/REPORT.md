# je-sync-48 — listing sync for 18 November 2026

Done: product candidate pushed for review. Author: Run Edit Run fleet; report recorded 2026-11-18T12:51:01Z.

Repository: just-every/home. Branch: cloud/je-sync-48. Product HEAD: 145dc392f1cba1d403ddd2c4005f8be7c15c2c7e.
Base: b8dbc82823e70d46001e422d98567c9edbff097a (fresh shallow main clone).
PR: https://github.com/just-every/home/pull/74 — sync: seed listings 18 Nov (path release Uptime v0.5.17).
Product and evidence custody are separate. No merge or deployment was performed.

## Plan and execution

Read the launcher, repository and committed sync implementation. Run dependency installation and a six-path dry sync, leaving later seeds paused. Inspect all proposed mark, colour, homepage, tag and copy findings. Freshly verify published releases and envelope asset presence, and read the RER catalogue by repository/name. Run copy-only apply, preserving existing claims unless released evidence proves them false. Run mechanical apply only for eligible changes; retain follow-up holds and exclude retired entries. Generate and check listings, rerun dry sync, review scope and withheld work. Run typecheck, lint and production build, with browser proof at 1440/390 if visible content changes. Fetch and rebase unpublished work onto main, install hooks, commit with fleet identity and inspect all candidate identities/trailers. Push cloud/je-sync-48 via the guard, open the requested PR, inspect exact-SHA Verify, save full non-secret reports/receipts and publish evidence separately. Delete the sound, published clone only after evidence publication and provenance capture.

The committed sync CLI was read before use. Every sync selected only happytohelp,lamp,uptime,oncall,orbit,spool with --only; later seeds are paused until 25 November. No sync implementation, unrelated copy, layout, pricing, gallery or generated contract view was edited. Dependencies were installed with npm ci; the final installation and subsequent commands used the package-manager pin npm 10.9.3. The initial dependency install used the VM npm 11.9.0 and was replaced by the pinned installation before the final checks. Node was v24.19.0. Clone-local fleet hooks were reinstalled after dependency setup, preserving repository hooks.

1. Initial full dry sync reported transient Git ref HTTP 503 failures before applying anything. A later fresh dry run succeeded for all six sources and homepages.
2. Successful initial dry line: `Dry run: 2 of 6 seeds changed.` These were Uptime's v0.5.17 version proposal and a missing alternative-to line, plus Oncall's missing alternative-to line. Only the version was an applicable product change. There were no mark, colour, status or homepage-image proposals and no initial released-copy drift.
3. `--copy-only --apply` records released copy provenance only and preserves site copy, art, brand and homepage observations. The required six-path copy-only apply found zero copy changes.
4. Fresh GitHub release metadata confirmed every latest path release in the table below as published, non-draft and non-prerelease with rer-release.dsse.json present. Only Uptime was newer than JE. Its annotated tag peeled to the commit below through Git. This is an envelope-asset-presence check; signature verification was not run.
5. Mechanical `--apply` applied Uptime's version only. Its `Applied: 2 of 6 seeds changed.` headline counts seeds with findings, including Oncall's reported-only follow-up; the applied item list contains only Uptime's version.
6. Listings were regenerated and checked. The next dry run reported one explained copy finding at the new released Uptime source: seed.json changed only its version, at row 4, from 0.5.16 to 0.5.17. CONTRACT.md is byte-identical between the releases; README.md's recorded hash is unchanged. No existing JE public claim was proved false, so wording stayed intact. A second copy-only apply for Uptime recorded the newly released source and version-only seed hash.
7. The first closing dry run met two transient gh HTTP 503 source reads and applied nothing. After a 15-second bounded recovery delay, launcher refresh, Git helper reinstall and a fresh credential read, the retry succeeded: `Dry run: 0 of 6 seeds changed.` All six sources and homepages were readable; only the two explained homepage follow-ups remain open.
8. Listings generation/check, typecheck, lint, production build and brand check passed. The unchanged full suite was left to branch CI. The production build generated all 61 pages and emitted only the existing middleware deprecation warning.
9. Browser proof on the built candidate shows /uptime at 1440 and 390, with the visible v0.5.17 version and public-manifest agreement asserted at 1440. The first attempt waited for network idle on the reel page and timed out; the successful attempt used DOM readiness and an explicit visible heading. Both attempts closed the browser and stopped their own recorded server PIDs. Local analytics reported an uninitialized page_views table during preview; it is unrelated to the scoped version display and no analytics behavior is claimed.
10. Fetched fresh main and rebased unpublished work; main remained at the base above. The single candidate commit passed all-ancestry identity/trailer inspection, diff whitespace review and an added-line credential-shaped-value review. Repository commit hooks ran normally. The push guard published the first real commit on its first attempt. No history was rewritten after publication.

## Released sources and per-seed result

| Seed | JE before → after | Released copy source commit | Result |
| --- | --- | --- | --- |
| HappyToHelp | v0.4.31 → v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | No product or state changes |
| Lamp | v1.11.22 → v1.11.22 | 4c90e6c8f35775e2a0287ab24ccba87d7a8d8485 | Product unchanged; resolved previous copy-finding marker removed by sync |
| Uptime | v0.5.16 → v0.5.17 | 359b1bb93606ccfe5dc0120d2cdce78e8df67f6a | Page/listing version and released-source provenance updated; homepage fingerprint/open follow-up refreshed |
| Oncall | v0.5.18 → v0.5.18 | 8dd2a0acf06b30fbc810c8a2a7e0fe8c01dd85ef | Product unchanged; homepage fingerprint/open follow-up refreshed |
| Orbit | v0.4.11 → v0.4.11 | a4fcbfcd72fa4253826f43d0b0de02275094f86d | No product or state changes |
| Spool | v0.7.14 → v0.7.14 | 1853e3b3b59d49853b5ee7678f851d6de8343fbf | No product or state changes |

All source refs are the corresponding version tags, with reason `released listing version`. Uptime's prior source was v0.5.16 at 6fd9399cf9ce9acf4e009999581cc20f32c9e129. Brand inputs still follow seed HEAD through the committed sync tool; no brand input produced an applicable change. Homepage observations came from each existing public homepage; no new image was imported.

Uptime promotion evidence: https://github.com/just-every/run-uptime/releases/tag/v0.5.17, published 2026-11-18T10:12:36Z. Source seed.json:4 supports the version edit in src/data/seed-pages.ts:119 and the generated public/data/listings.json entry. The published release's rer-release.dsse.json asset was present. See RELEASES.json for the same checks on all other path seeds. No bare tag was treated as proof of release and no released-status promotion was made.

## Final product diff and counts

Only three scoped files changed: public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts (14 insertions, 14 deletions). Public data changed only Uptime's version and generatedAt. Source page content changed only its version. State records the new Uptime tag/commit/seed hash, current Uptime/Oncall homepage fingerprints and observed open findings, and clears Lamp's resolved previous copy marker. All non-path seed state entries are unchanged as parsed data.

Counts before → after: 49 → 49 total; 35 → 35 released; 14 → 14 coming soon. No tests were added, removed, skipped or weakened. Clause status changes: none. No CONTRACT.md exists in this catalogue repository, and no seed contract status was changed.

## Deliberately withheld and follow-ups

- Uptime and Oncall: tool could not find an alternative-to line on the current homepages. Their existing replacement lists remain unchanged. Uptime retains the Pingdom-first override. These are reported follow-ups, not version blockers.
- Coming-soon and other later-seed drift was not imported or assessed in this six-path round because later seeds are paused until 25 November. No implementation status was inferred from a tag.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No excluded entry reappeared, so overrides.json was not changed.
- Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D) remain the existing follow-ups. They were not promoted or rewritten.
- Existing marks, colours, homepage stills and galleries stayed intact. No redesign, new logo, capture campaign or gallery ingestion was performed.
- Assisted US$10/month and Managed US$100/month presentation stays unchanged, with no GST wording or billing-country restriction added.

## Fresh RER comparison

Read https://runeditrun.com/data/seeds.json freshly. Its static generatedAt is 2026-11-15T13:56:34Z; the actual entry versions were compared. Match by repository URL/name, including Spool under id errors-workbench (never omitted). RER matches HappyToHelp 0.4.31, Lamp 1.11.22, Oncall 0.5.18, Orbit 0.4.11 and Spool 0.7.14. RER still has Uptime 0.5.16 while this candidate follows the newer proven v0.5.17 release. Preserve JE's newer version and relay that drift to gr. RER-CATALOGUE.json contains the inspected public fields.

## CI and custody

Exact-SHA push Verify branch run 44307525306 completed successfully: https://github.com/just-every/home/actions/runs/44307525306. The single REST observation at 2026-11-18T12:51:13Z also showed dynamic PR check 44307573504 success and duplicate pull-request Verify 44307577644 intentionally skipped by its workflow condition. Only the successful push Verify is the required gate. See RECEIPT.json for the complete actual observation and validation results. Product push succeeded via cloud-push.py; separate evidence publication does not imply acceptance, landing, deployment or live verification. Mac publication scan, independent Sol high gate, landing hold, merge, deployment and live verification remain with the lane. The cloud cannot run the fleet's Mac publication scan; its scoped credential-shaped diff review passed and does not replace that scan.

No unresolved product blocker was found. Transient source HTTP 503s recovered, and the closing six-path sync is clean. The packet preserves actual initial, copy, mechanical, new-release-copy and clean dry-run reports, relevant failure/check logs, release/RER/copy receipts and browser proof. Only explicitly selected non-secret regular files will be published; no credentials, environment dumps or private held-out material are included.
