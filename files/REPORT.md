# Done: je-sync-59 candidate

Author: Run Edit Run fleet. Recorded at 2026-11-21T14:21:09Z.

Repository: just-every/home. Branch: cloud/je-sync-59. Product HEAD: a1f21a22a9548c68cbadcd57cdb5b6b302d8bad4.
Base: d49ab6e90a88bdc1adb5dd98d994bdd667fa6a97. PR: https://github.com/just-every/home/pull/85.

The published candidate advances HappyToHelp v0.4.31 to v0.4.32, records the released copy source and regenerates listings. Three allowed files changed; 13 insertions and 13 deletions. No contract clause, implementation status, public wording, mark, colour, homepage, still, gallery, price or exclusion changed. Counts remain 49 total, 35 released, 14 coming soon.

## Plan and execution

PLAN.md contains the full plan. The fresh shallow blobless clone began at the brief's main SHA. Launcher instructions, home AGENTS.md and the committed sync implementation were read first; npm ci passed. The fleet identity, credential helper, push guard and forwarding/cleanup hooks were installed. The final product commit was rebased onto freshly fetched origin/main before its first push; main was unchanged. One product commit was pushed through the guard on its first attempt. No default branch was pushed and no published history was rewritten. PR 85 is open for the lane; there was no merge or deployment.

The later-seed pause was applied using the committed tool's --only uptime,happytohelp,lamp,oncall,spool,orbit option. Those are the six active path seeds. This deliberately avoids re-observing or changing the other 43 listings, including coming-soon copy.

## Dry-sync output and source refs

Initial successful dry sync: `Dry run: 1 of 6 seeds changed.` The sole proposal was `version newer tag v0.4.32 (page shows v0.4.31) [to apply]` for HappyToHelp. No new mark, colour, status, homepage, still or copy proposal appeared. Final dry sync: `Dry run: 0 of 6 seeds changed.` Both successful dry runs read all six homepages. The actual logs and full machine/human reports are included in this packet.

| Seed | Catalogue before -> after | Released copy commit after sync |
| --- | --- | --- |
| HappyToHelp | v0.4.31 -> v0.4.32 | c9f4904b175366d0226fc2a4c33348d6e4f8ffc9 |
| Uptime | v0.5.19 -> v0.5.19 | b9bff679ec99b702de753d63ad385d232e6b6d1e |
| Lamp | v1.11.25 -> v1.11.25 | 09f8cdb44557e43615ffa9321bc2492bb24d0710 |
| Oncall | v0.5.22 -> v0.5.22 | 9cbcf975224f7171dcd3813e6f54d4b29a0791ca |
| Spool | v0.7.17 -> v0.7.17 | 512977a936e6bda3f76c3a68e2511e62cb56090d |
| Orbit | v0.4.12 -> v0.4.12 | a9fa1830c1913562154dedaeb5a1322ead7c3e6b |

Each source ref is the displayed release tag, resolved through Git. The old HappyToHelp source was v0.4.31 at e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f. All other seeds retain their existing catalogue version and source.

## Release verification

Fresh GitHub Release metadata was read for all six repositories in one GraphQL API request. Each latest Release is published, non-draft, non-prerelease and carries an asset named rer-release.dsse.json. Only HappyToHelp's latest eligible release was newer than JE. This proves envelope-asset presence only; no signature verification is claimed. releases.json preserves the actual metadata, including publication times and previous releases.

- HappyToHelp: https://github.com/just-every/run-happytohelp/releases/tag/v0.4.32 (published 2026-11-21T13:06:52Z).
- Lamp: https://github.com/just-every/run-lamp/releases/tag/v1.11.25.
- Uptime: https://github.com/just-every/run-uptime/releases/tag/v0.5.19.
- Oncall: https://github.com/just-every/run-oncall/releases/tag/v0.5.22.
- Spool: https://github.com/just-every/run-spool/releases/tag/v0.7.17.
- Orbit: https://github.com/just-every/run-orbit/releases/tag/v0.4.12.

No bare tag or missing-envelope release was promoted; no further version promotion was proposed.

## Copy review and per-file diff

`--copy-only --apply` was read before use: it records copy provenance only and preserves published copy and art. Its first pass found zero changed sources. After the mechanical version update, a second pass recorded the three HappyToHelp copy hashes at v0.4.32 and emitted one copy-review finding. COPY-REVIEW.md records the source rows and the decision to retain the true wording. The release's only CONTRACT.md text change is the free-section headline at row 269, which JE does not quote. The README changes concern setup/release/preflight/widget-default details that JE does not state. seed.json row 4 supplies the new version. No public claim required an edit and no implementation status was inferred from requirement text.

- src/data/seed-pages.ts:193 changes the HappyToHelp version only.
- public/data/listings.json:364 mirrors that version and advances generatedAt.
- scripts/seeds-sync/state.json: advances syncedAt; records HappyToHelp's new tag, copy commit and three source hashes with its copy-review finding; the committed tool clears Spool's old copy finding, whose released files were unchanged. That bookkeeping does not resolve Spool ERR-006.

Standing follow-ups are retained: Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), Spool ERR-006 (D). No clause changes or DONE/PARTIAL claims are made.

## Deliberately withheld or preserved

Uptime and Oncall still have no visible “alternative to” line. The tool reports these as two existing open findings and preserves replaces; Uptime's accepted Pingdom-first override remains. No redesign or fresh capture campaign was undertaken; the only external captures were the six live observations built into the committed sync tool, and no captured still or gallery was imported. No mark/colour/status follow-up beyond the actual tool output was invented.

Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. All other paused seeds and all coming-soon copy remain unchanged. There was no unqualified release to withhold among the six paths. Assisted US$10/month and Managed US$100/month retain their accepted presentation; no pricing path changed, no GST text or billing-country restrictions were added.

## RER drift

https://runeditrun.com/data/seeds.json was read freshly. Its generatedAt stamp remains static at 2026-11-15T13:56:34Z; comparisons use actual versions and repository URLs. At the observation recorded in rer-versions-latest.json, RER still showed HappyToHelp 0.4.31 versus this JE candidate's 0.4.32. The full repository-matched comparison also found existing RER lag for Penny 0.1.4 vs JE 0.2.1, Nook 0.4.0 vs 0.5.0, Mango 0.3.0 vs 0.4.0, Vector 0.3.0 vs 0.4.1, and Pantry 0.2.5 vs 0.2.8. All higher JE versions are retained. Spool matches by https://github.com/just-every/run-spool despite RER id errors-workbench; its v0.7.17 is present and matches. RER corrections belong to gr and are relayed, not changed here.

## Validation and limitations

Passed: npm ci; committed dry/copy/apply sync operations; npm run listings; npm run listings -- --check; npm run type-check; npm run lint; npm run build; diff whitespace, scope, exclusion/count and credential-shaped-value checks. The existing repository pre-commit lint-staged hook also passed. No full local test suite or full local verify was run; branch CI owns it. No tests were added, removed, skipped or weakened.

Browser proof uses /usr/bin/chromium with --no-sandbox and real HOME. At 1440, the public HappyToHelp page loads and its displayed version and SoftwareApplication structured data agree with the public listings feed, with no horizontal overflow. The same changed page is captured once at 1440 and 390. Both browsers/contexts closed and the recorded Next server PID was stopped; its subreaper completed.

Recovered tool limitations: the first dry attempt lacked Playwright; installing global playwright 1.63.0 resolved it. The mechanical apply saw a transient Uptime homepage ERR_CERT_VERIFIER_CHANGED and left Uptime unchanged; both successful dry runs read Uptime normally. The first proof's networkidle wait timed out with external page activity; DOM-ready navigation and the relevant rendered-page checks completed. The plain Next production server also logged pre-existing Cloudflare-only token-cache/page-view D1 diagnostics; this proof covers the rendered catalogue page and public manifest, not the Worker API runtime. No implementation file was changed to hide a limitation.

The Mac publication scan cannot run in this cloud under the supplied adaptation. The lane retains that independent gate, PR merge, deployment and live 1440/390 verification. Product and evidence custody are separate. CI status and exact run IDs are recorded in CI-RECEIPT.json when the observation completes.

## Final exact-SHA CI observation

At 2026-11-21T14:25:09Z, Verify branch run 44913327266 completed successfully on a1f21a22a9548c68cbadcd57cdb5b6b302d8bad4: https://github.com/just-every/home/actions/runs/44913327266. Discovery and one final observation were more than 300 seconds apart; there was one watcher, two workflow reads and no workflow rerun/dispatch. Six direct administrative API operations were used. The mandatory committed sync tool separately performed 180 repository file reads over its six invocations, including the first browser-dependency failure. No failed job log was needed.

There are no product blockers. The independent Mac publication scan, review, merge, deployment and live verification remain with the lane. Evidence publication does not constitute any of those gates.

Browser proof: [1440](happytohelp-1440.png), [390](happytohelp-390.png). PRODUCT-RECEIPT.json, OPERATIONS-RECEIPT.json and CI-RECEIPT.json preserve product/check custody.
