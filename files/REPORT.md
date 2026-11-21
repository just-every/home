# je-sync-57 results

Author: Codex; date: 2026-11-21 UTC. The actual plan is PLAN.md.

Candidate repository: just-every/home. Branch: cloud/je-sync-57.
Base: b31943633013fe0fd6f753579457ecba453ff06a.
Product HEAD: d5a27a8bb527ee2adc7108b6a384e541300acfa1.
PR: https://github.com/just-every/home/pull/83.

## Outcome and counts

Lamp advances from v1.11.24 to v1.11.25. Counts remain 49 listings, 35 released, 14 coming soon. The other five path versions remain HappyToHelp v0.4.31, Uptime v0.5.19, Oncall v0.5.22, Orbit v0.4.12 and Spool v0.7.16. No public claims, implementation statuses, pricing, marks, colours, homepage URLs or stills changed. No galleries imported.

Only public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts changed. Listing semantic comparison finds exactly one field change: Lamp version. The listings timestamp and sync provenance were regenerated. State changes are limited to Lamp, Oncall and Uptime: Lamp records the newly displayed release and reviewed copy hashes; Oncall/Uptime drop previously reported copy findings now resolved at their existing displayed releases; Uptime's observed homepage fingerprint varies below the import threshold. All other seeds' state records are unchanged.

## Actual committed-tool output and proposals

All sync commands used --only happytohelp,lamp,uptime,oncall,orbit,spool, implementing the six-path-only instruction. Later seeds remain paused until 25 November.

Initial dry sync: `Dry run: 1 of 6 seeds changed.` The only proposed mechanical update was `Lamp: version newer tag v1.11.25 (page shows v1.11.24) [to apply]`. It proposed no mark, colour, homepage, still, headline, incumbent or status changes.

Copy-only apply at the initial displayed versions: `Applied: 0 of 6 seeds changed.` This flag updates only copy-source provenance, preserving prior brand/home observations and published wording; it never rewrites copy.

Mechanical apply: `Applied: 1 of 6 seeds changed.` Only Lamp's version was applied. A second copy-only apply then recorded Lamp's newly displayed v1.11.25 source and reported CONTRACT.md and seed.json changes for human review.

Final dry sync: `Dry run: 0 of 6 seeds changed.` Two previously open findings remain: Uptime and Oncall have no alternative-to line on their live homepages, so their incumbent names remain unchanged. No unexplained drift remains in the six-path scope.

Complete actual tool reports are in dry-initial/, copy-apply/, mechanical-apply/, copy-new-release/ and dry-final/; each contains report.md and report.json. The tool read all six homepages successfully. It wrote no marks or stills. Homepage observations are existing sync-tool checks, not a new gallery or design capture campaign.

## Release verification and source refs

Each latest release was independently read through GitHub REST: published, draft=false, prerelease=false, with rer-release.dsse.json present. This verifies envelope-asset presence only; no cryptographic signature verification is claimed. Complete observations including publication times and assets are in releases.json.

| Seed | Displayed release/source ref | Peeled copy commit |
| --- | --- | --- |
| HappyToHelp | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f |
| Lamp before | v1.11.24 | 3f1349f029fa8c8c59bf9adfe4e2ae59fd502842 |
| Lamp after | v1.11.25 | 09f8cdb44557e43615ffa9321bc2492bb24d0710 |
| Uptime | v0.5.19 | b9bff679ec99b702de753d63ad385d232e6b6d1e |
| Oncall | v0.5.22 | 9cbcf975224f7171dcd3813e6f54d4b29a0791ca |
| Orbit | v0.4.12 | a9fa1830c1913562154dedaeb5a1322ead7c3e6b |
| Spool | v0.7.16 | 804a4ad15e6c8e1c52f0069dcf610ba1f5d2342c |

Each release URL is https://github.com/just-every/run-<seed>/releases/tag/<version>, using the slug and exact version above. The only promotion is https://github.com/just-every/run-lamp/releases/tag/v1.11.25, published 2026-11-21T03:46:07Z. Lamp's annotated tag object e24bf83fc6b11ff06acd7723957d13a5006baaed peels to the after commit above. Bare tags were not used as publication evidence.

## Copy review and retained judgments

The released comparison v1.11.24...v1.11.25 was read through gh api. Its relevant patches are preserved in lamp-copy-review.json. README.md is unchanged. seed.json line 4 changes only the version. CONTRACT.md adds target COMP-011, 'One page order across groups and ungrouped components', at the component section following COMP-010 (new heading around line 1462), adds its mapping entries, and records COMP-011 as target/missing in the status table (around line 3252). It does not establish a new implemented promise or contradict JE's existing Lamp wording. Therefore all existing public wording is retained, and no row is edited as a new public claim.

Clause status changes: none. Existing Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C) and Spool ERR-006 (D) are retained follow-ups. No seed contract implementation status is promoted. This is catalogue maintenance, separate from the business harness.

## RER catalogue drift and deliberately withheld items

Fresh https://runeditrun.com/data/seeds.json was read; its generatedAt is a static stamp and was not treated as freshness proof. Matching used repository URLs and names. Spool is present as id errors-workbench and was included.

RER's observed versions: Lamp 1.11.24 versus candidate JE 1.11.25; Uptime 0.5.18 versus JE 0.5.19; Oncall 0.5.21 versus JE 0.5.22. HappyToHelp 0.4.31, Orbit 0.4.12 and Spool 0.7.16 agree. No downgrade was imported. Full selected observations are in rer-drift.json; gr owns RER pin follow-up.

No additional newer path tag or eligible published path release was found. The five unchanged released seeds have no version promotion to apply. Uptime/Oncall incumbent names are deliberately retained because their live pages provide no alternative-to line. Later/coming-soon seeds were deliberately not re-read or imported during the pause; no statement is made about their current HEAD drift. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Assisted US$10/month and Managed US$100/month presentation is untouched, as are billing-region and tax wording. No marks, colour or homepage work was proposed, so none was invented.

## Checks, custody and limitations

npm ci, copy-only apply, mechanical apply, npm run listings, npm run listings -- --check, final dry sync, npm run type-check, npm run lint and npm run build all passed. Scope, generated listing semantics, excluded-seed absence, diff whitespace, added credential-shaped values, every candidate commit identity and every trailer were checked. Repository pre-commit hooks remained active and ran lint-staged. The final candidate has no skip marker. Fresh main was fetched and the candidate was rebased before its first push; main remained at the stated base. The guarded product push succeeded on its first attempt.

The initial dry run required installing missing Playwright Core without changing dependency manifests or lockfiles; the same committed sync command then passed. The initial candidate browser probe's network-idle wait timed out because unrelated local analytics requests lacked D1/cache runtime state. The probe was corrected to wait for the public page DOM and actual version presentation; final browser results are recorded separately. No application source was changed for this.

The Mac publication scan cannot run here and remains a fleet landing gate. The full application suite runs in branch CI. The lane retains its independent gate, publication scan, merge, deploy and live 1440/390 verification. Product readiness and evidence publication are separate.

Candidate browser proof passed: Lamp version is visible and agrees with the public listings endpoint at the 1440px assertion width; screenshots show the changed page once at 1440px and 390px. Browser contexts and browser were closed. Both locally started server attempts were stopped by their recorded PID. The initial network-idle timeout was a probe-wait issue; the successful DOM-based probe is browser-receipt.json.

Final exact-SHA CI observation at 2026-11-21T04:21:48Z: Verify branch run 44865228024 completed successfully on d5a27a8bb527ee2adc7108b6a384e541300acfa1. URL: https://github.com/just-every/home/actions/runs/44865228024. Discovery was at 04:16:21 UTC, and the final observation was at 04:21:22 UTC, respecting the 300-second cadence. Two CI REST calls were used. Ten explicit release/comparison/PR/CI REST calls were used in total, in addition to the required committed sync tool's source reads. No failed-job log calls were needed. No product blocker remains. Candidate custody is READY; acceptance and landing remain with the fleet.
