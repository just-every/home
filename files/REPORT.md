# je-sync-55: 20 November listing sync

Signed: Run Edit Run fleet, 2026-11-20T17:56:45Z.

Product candidate: just-every/home, cloud/je-sync-55, 65fe10485fe75a1d0ffa4e801750bbdc6b788150.
Base: b77f3d58fd67ee248394bfdb5f0671b55fe31719. PR: https://github.com/just-every/home/pull/81.

## Full plan and completed execution

1. Refresh the fleet launcher and install the supplied Git credential, push-guard and commit-hook setup. Clone only the declared repository shallow/blobless, branch from fresh main, and read its AGENTS.md and committed sync implementation before installing dependencies.
2. Install dependencies with npm ci. Use the committed tool with --only happytohelp,lamp,uptime,oncall,orbit,spool, honoring the pause on later seeds. Review a full dry sync including brand and live-homepage observations; do not initiate any redesign or gallery capture campaign.
3. Verify all six latest GitHub Releases independently of the tag-based detector. Read fresh RER /data/seeds.json and match entries by repository URL. Preserve JE versions if RER lags.
4. Run --copy-only --apply to record tagged copy provenance without changing public wording, then --apply for reviewed mechanical updates. Reconcile Spool provenance once more after the version update, because the tool reads the displayed version at the start of a run.
5. Regenerate listings and check them, repeat the full six-path dry sync, then run type-check, lint and production build. Review the exact diff, identities, trailers and credential-shaped values; fetch/rebase fresh main before the first push. Push the named product branch via cloud-push.py and open one PR.
6. Capture the changed Spool production page at 1440 and 390; assert the displayed version and public feed at 1440 only. Close the browser and stop the recorded server PID. Observe exact-SHA Verify, publish this complete report packet only on evidence/je-sync-55, and remove the product clone after preservation.

## Actual dry-sync output and proposed changes

Initial successful dry sync: `Dry run: 1 of 6 seeds changed.`
Only proposed change: `Spool / version / newer tag v0.7.16 (page shows v0.7.15) [to apply]`.
No mark, colour, released-status, homepage, still or public-copy changes were proposed for these six seeds.
All six source repositories and homepages were readable.

The first dry attempt resolved every released source but failed to find Playwright: installing playwright-core globally did not satisfy the tool's global lookup (which searches playwright). Installing playwright@1.63.0 globally resolved this; the subsequent required runs succeeded without changing sync implementation. The original failure log is retained.

Final dry sync: `Dry run: 0 of 6 seeds changed.`
`2 finding(s) still open from the last sync`: Uptime and Oncall have no “alternative to” line detected on their live homepages. Their existing replaces lists remain intact. These are explained existing follow-ups, not new imports.

Actual initial, copy-only, apply, post-version copy-only and final dry reports are included under sync/.

## Release eligibility and source refs

All six latest Releases were freshly read through GitHub and have draft=false, prerelease=false and a rer-release.dsse.json asset. These receipts prove envelope-asset presence only; no signature or release acceptance verification is claimed.

| Seed | JE before | JE after / released copy ref | Released copy commit |
| --- | --- | --- | --- |
| HappyToHelp | v0.4.31 | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f |
| Lamp | v1.11.24 | v1.11.24 | 3f1349f029fa8c8c59bf9adfe4e2ae59fd502842 |
| Uptime | v0.5.18 | v0.5.18 | 52f77a94a0a675ba5e1be122dfe0c720087144fb |
| Oncall | v0.5.21 | v0.5.21 | 33cafdc7750103f51ac4173c7b52c8dbcf1efbe0 |
| Orbit | v0.4.12 | v0.4.12 | a9fa1830c1913562154dedaeb5a1322ead7c3e6b |
| Spool | v0.7.15 | v0.7.16 | 804a4ad15e6c8e1c52f0069dcf610ba1f5d2342c |

Spool promotion: https://github.com/just-every/run-spool/releases/tag/v0.7.16, published 2026-11-20T15:29:27Z, envelope asset size 3105 bytes. It was already released; this changes its listed version, not its release status. The annotated tag object d7bc1dee9b7035e1f4beceee3db1c41952b7a3e3 peels to the commit above. Previous copy ref v0.7.15 resolved to bb2efcd34837cd6067d02ce176609d3fc636dad2.

All six release URLs, publication times and asset names are retained in releases/*.json. source-refs.json records independent Git HEAD probes; brand art continues to follow seed HEAD by the existing tool, and no art changes were detected.

## Copy provenance review and per-seed diff

--copy-only --apply updates only source provenance in state and never public wording or brand/home observations. Before the mechanical apply it reported zero changed copy sources.

For Spool v0.7.15...v0.7.16, the released comparison has no CONTRACT.md or README.md changes. seed.json line 4 changes only version from 0.7.15 to 0.7.16 (patch hunk starts at line 1). The contract and README hashes remain ee9c871bfa25a110 and a9c5f1be825c6da3. The seed.json hash changes from 665317811e8d8aef to e12b3e10eb61e0ee. No public claim is proved false by that source delta, so all existing summary, does, promises and SEO wording is preserved. Actual released copy patch: spool-copy-review.json.

- Spool: src/data/seed-pages.ts line 1100 advances version; public/data/listings.json mirrors it; scripts/seeds-sync/state.json records v0.7.16, its peeled commit and seed.json hash. The tool remembers the reviewed seed.json finding as open key 64cb07f6a0dd; this is a provenance observation, not a clause judgment.
- Oncall: no public data or copy edits. The generated state clears old copy-observation key 922fed04eacf because its currently displayed v0.5.21 copy is already the recorded source; existing homepage finding bf4b3f38e1a2 remains. All Oncall copy hashes remain unchanged.
- HappyToHelp, Lamp, Uptime and Orbit: no public or provenance record changes. Uptime's existing homepage finding remains.
- State syncedAt and listing generatedAt advance mechanically. No other paths changed.

## RER drift, withheld work and preserved follow-ups

Fresh https://runeditrun.com/data/seeds.json has a static generatedAt of 2026-11-15T13:56:34Z; versions were read from the entries themselves. Matching used repository URLs. Spool was found as id errors-workbench, not omitted.

- RER Oncall is 0.5.19; JE stays at v0.5.21.
- RER Spool is 0.7.15; JE advances to v0.7.16.
- HappyToHelp 0.4.31, Lamp 1.11.24, Uptime 0.5.18 and Orbit 0.4.12 agree.
- No unqualified bare-tag promotion was applied. All six latest published Releases agree with the resulting JE versions; no other eligible six-path promotion was found.
- Uptime and Oncall incumbent-list changes are deliberately withheld because the tool found no alternative-to line; existing wording remains true and unchanged.
- Later and coming-soon seeds are deliberately outside this six-path round through 25 November. Their unreleased copy is not imported or judged; no coming-soon drift is claimed to have been inspected.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen stay absent. Overrides were not changed.
- Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D) are preserved as requested. No contract implementation status or acceptance point changed.
- No pricing, GST or billing-country wording changed. The accepted Assisted US$10/month and Managed US$100/month presentation was outside the diff.
- Existing marks, colours, homepages and stills had no new findings. No art or gallery files were ingested.

## Counts, checks and custody

Before: 49 listings, 35 released, 14 coming soon.
After: 49 listings, 35 released, 14 coming soon.
Public version changes: 1. Public claim edits: 0. Status promotions: 0. Clause status changes: none. Added/deleted tests: 0.

Passed: npm ci; required dry/copy-only/apply runs; npm run listings; npm run listings -- --check; npm run type-check; npm run lint; npm run build; diff whitespace/scope/credential-shaped review. The full test suite belongs to branch CI. No tests were added for this version/provenance maintenance change.

Only public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts changed. The first product push succeeded on its first guarded attempt after a current-main fetch/rebase (no main drift). Candidate identity/message review covered all commits in origin/main..HEAD, including side parents; one fleet-authored/committed product commit, no trailers. No published history was rewritten.

Browser and exact-SHA CI observations are in their receipts and the completion section below. The cloud cannot run the Mac publication scan. Independent Sol gate, Mac publication scan, landing hold, PR merge, deployment and live 1440/390 verification remain with the lane. No merge or deploy was attempted.

## Completion at 2026-11-20T17:58:42Z

Done: product branch is advertised at 65fe10485fe75a1d0ffa4e801750bbdc6b788150. PR #81 is open at https://github.com/just-every/home/pull/81. Exact-SHA push Verify branch run 44787789105 completed/success: https://github.com/just-every/home/actions/runs/44787789105. The duplicate PR Verify 44787851273 was skipped by the existing cloud-branch condition; the successful push run is the required observation. The PR dynamic run 44787843142 also succeeded. One CI discovery call was sufficient, with no polling or log downloads. Direct GitHub calls used: 9 (6 latest Releases, 1 Spool comparison, 1 PR creation, 1 CI discovery). The prescribed committed sync tools make their own source-content API reads; these were limited to the six path seeds.

The exact candidate's local production Spool page returned HTTP 200 and displayed v0.7.16. At 1440, assertions confirmed both the public page version and the public listing feed's matching released version. Screenshots at 1440 and 390 were inspected and are included. The first browser attempt timed out waiting for network idle; the second compared the CSS-uppercase VERSION label against title case. The corrected harness waits for DOM content and checks the dd version value. Both failed-attempt receipts are preserved alongside the successful final receipt. No product change was needed. The local Next-only server also logged a Cloudflare caches-unavailable token-counter message; page/listings proof passed, and this round did not test or modify that unrelated endpoint. Browser contexts were closed and each server was stopped by its recorded PID.

No unresolved builder blocker. The lane retains the independent gate, Mac publication scan, landing hold, merge, deploy and live verification. Product and evidence publication are separate custody events; this packet makes no acceptance or landing claim. After evidence publication and transport verification, the local product clone and node_modules are removed as instructed.

Relay: je-sync-55 changes Spool v0.7.15 to v0.7.16 only, with source provenance and generated listings; clauses unchanged; 49/35/14 before and after; head 65fe10485fe75a1d0ffa4e801750bbdc6b788150; PR 81; Verify 44787789105 success. RER drift for gr: Oncall 0.5.19 versus JE 0.5.21, Spool 0.7.15 versus JE 0.7.16, matched by repository URL (Spool id errors-workbench).
