# je-sync-42 result

Author: Run Edit Run fleet. Recorded: 2026-11-16T15:36:52Z.

Done: product candidate pushed to `cloud/je-sync-42`, head `8859bb199a9b92eb7fe05aef12ba1dbc75ac3439`, tree `77dc0b3df74fca29e8ea7eefa0e6e4866acd7a25`, based on fresh main `c65e045744cdfde8abe63ec1718b641bc148e486`. PR: https://github.com/just-every/home/pull/66. Product custody and report-only evidence are separate. Landing remains with the lane.

## Plan and outcome

1. Read launcher AGENTS.md, home AGENTS.md and the complete committed sync workflow. Cloned only just-every/home, shallow with blob filtering. Configured fleet identity, decrypted-bundle Git helper, push guard and forwarding hooks. Installed npm dependencies and Playwright; kept dependencies and evidence outside product commits.
2. Ran full dry sync over 49 seed repositories and homepages; recorded every ref/finding. Read fresh JE listings and RER /data/seeds.json. Checked GitHub Release metadata for the six active paths. The source-read timestamp and sanitized published release receipts are retained.
3. Applied copy-only provenance for the six active paths. The initial copy apply reported 0 of 6 changed. Compared Orbit and Spool released-source files before advancing versions; preserved true wording and every specified follow-up.
4. Applied mechanical sync only to HappyToHelp, Lamp, Oncall, Orbit and Spool. Deliberately omitted tag-only Uptime from mechanical apply; its copy provenance was checked. Only Orbit/Spool versions changed. Applied copy-only provenance again for Orbit/Spool at their new release refs; only seed.json version fields changed. Generated listings and checked them.
5. Ran the final full dry sync, type-check, lint, production build and browser proof. Examined the committed diff, scope, exclusions, counts and credential-shaped added values. Fetched current main, rebased before first publication (already up to date), committed with fleet identity and active repo hooks, checked every candidate commit and pushed the first real commit through cloud-push.py. No published history was rewritten.
6. Opened the requested PR and observed exact-SHA Verify through REST. The first discovery and final observation are retained, with one watcher and at least 300 seconds between observations. No main/default branch push, merge or deployment.
7. Prepared this complete non-secret report packet and explicitly selected reports, receipts and browser screenshots for evidence/je-sync-42. The product checkout and node_modules are removed after successful evidence transfer. Mac publication scan, independent gate, PR landing, deployment and live checks remain with the lane.

## Dry-sync lines and every proposal

Initial completed full dry run: `Dry run: 3 of 49 seeds changed.` No unreadable seeds. No mark, colour, status, homepage or copy changes were proposed. No mark/colour/status follow-up appeared in the tool output.

| Seed | Finding | Source | Decision |
| --- | --- | --- | --- |
| uptime | version: newer tag v0.5.14 (page shows v0.5.13) | git tag v0.5.14; published Release metadata in release-evidence.json | Withhold: tag only, no published eligible Release |
| orbit | version: newer tag v0.4.11 (page shows v0.4.10) | git tag v0.4.11; published Release metadata in release-evidence.json | Apply: published eligible Release and envelope asset present |
| spool | version: newer tag v0.7.13 (page shows v0.7.12) | git tag v0.7.13; published Release metadata in release-evidence.json | Apply: published eligible Release and envelope asset present |

Final completed full dry run: `Dry run: 1 of 49 seeds changed.` Its only finding is `Uptime: newer tag v0.5.14 (page shows v0.5.13) [to apply]`. This is explained and deliberately withheld. No unexplained drift remains. No coming-soon/unreleased copy drift was found or imported.

## Six active paths and release evidence

| Seed | JE before | Candidate | Latest eligible published Release | Released source commit |
| --- | --- | --- | --- | --- |
| happytohelp | v0.4.31 | v0.4.31 | [v0.4.31](https://github.com/just-every/run-happytohelp/releases/tag/v0.4.31) (2026-11-16T11:23:15Z) | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f |
| lamp | v1.11.19 | v1.11.19 | [v1.11.19](https://github.com/just-every/run-lamp/releases/tag/v1.11.19) (2026-11-15T23:27:59Z) | 761f3d186e8fa73ea9aa8b61bcf9ebe8013384f6 |
| uptime | v0.5.13 | v0.5.13 | [v0.5.13](https://github.com/just-every/run-uptime/releases/tag/v0.5.13) (2026-11-15T21:06:58Z) | c1e8376c7dfd6ed601b6fe993567237449fc7143 |
| oncall | v0.5.16 | v0.5.16 | [v0.5.16](https://github.com/just-every/run-oncall/releases/tag/v0.5.16) (2026-11-15T21:07:22Z) | 7f250f7e66f1377f7b4b773effd1c72e8854c025 |
| orbit | v0.4.10 | v0.4.11 | [v0.4.11](https://github.com/just-every/run-orbit/releases/tag/v0.4.11) (2026-11-16T14:35:53Z) | a4fcbfcd72fa4253826f43d0b0de02275094f86d |
| spool | v0.7.12 | v0.7.13 | [v0.7.13](https://github.com/just-every/run-spool/releases/tag/v0.7.13) (2026-11-16T14:00:22Z) | e35ebeca36a855cdbe7c0685b7c5324170d17a2a |

All six latest eligible Releases above are non-draft and non-prerelease and carry rer-release.dsse.json. Only Orbit and Spool advance. The envelope check establishes asset presence, not cryptographic verification. Uptime v0.5.14 has only a tag in the observed inputs.

## Per-file and per-seed diff

- `src/data/seed-pages.ts`: Orbit v0.4.10 → v0.4.11; Spool v0.7.12 → v0.7.13. All public descriptive and promise copy remains byte-identical.
- `public/data/listings.json`: the same two version changes and generator timestamp only.
- `scripts/seeds-sync/state.json`: sync timestamp, released source refs/commits/tags and seed.json hashes for Orbit/Spool; the tool records their seed.json copy findings in open. HappyToHelp loses one stale open finding when the mechanical apply detects no remaining drift. This is sync bookkeeping, not a contract or implementation status change. Every stored brand token and homepage fingerprint is unchanged.
- HappyToHelp v0.4.31, Lamp v1.11.19, Uptime v0.5.13 and Oncall v0.5.16 remain unchanged in public data. No other listing changes. No public assets or overrides change.

Counts before → after: 49 → 49 total; 35 → 35 released; 14 → 14 coming soon. Clause status changes: none. No CONTRACT.md, ACCEPTANCE.md or docs/CLAIMS.md changes. No acceptance claim or new implementation evidence is asserted.

## Released copy provenance

The full initial dry sync found no changed copy source for any of the 49 listings. Copy-only apply for the six active paths reported zero changes. It records provenance only and leaves published wording and art intact.

Orbit v0.4.10 (22ca38c0e0bb5784440df021e8a5eb5b41a81de8) → v0.4.11 (a4fcbfcd72fa4253826f43d0b0de02275094f86d): CONTRACT.md and README.md are byte-identical; seed.json row 4 changes only version 0.4.10 → 0.4.11. No source contradicts the existing JE wording. Preserve all summary, does, promises, move-in, runs-on and SEO copy.

Spool v0.7.12 (cc086904fd942175d18c60082b10c459c343dc78) → v0.7.13 (e35ebeca36a855cdbe7c0685b7c5324170d17a2a): CONTRACT.md and README.md are byte-identical; seed.json row 4 changes only version 0.7.12 → 0.7.13. No source contradicts the existing JE wording. Preserve all public copy, including the ERR-006 follow-up classified D in the brief.

Hashes and byte lengths for every compared file are in copy-release-comparison.json. The two empty contract diff files confirm no contract text/status change across these releases. No public claim edit is proposed, so there is no claim-edit source row to cite beyond the seed.json version row above.

HappyToHelp v0.4.31, Lamp v1.11.19, Uptime v0.5.13 and Oncall v0.5.16 retain their listed release refs and wording. The initial tool report found no copy drift against their stored released sources. The initial report also found no coming-soon/unreleased copy drift. Their HEAD refs are recorded for observation only; none are imported.

Preserved follow-ups: Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), Spool ERR-006 (D). This catalogue round makes no implementation or acceptance status judgment and edits no contract.

## Deliberately withheld and preserved

- Uptime v0.5.14: the tag is visible to git ls-remote and to both full dry syncs, but GitHub's current releases list contains no published v0.5.14 Release or envelope asset. Keep v0.5.13. Uptime was included in copy-only provenance apply, and deliberately omitted from mechanical apply to avoid importing its unqualified tag.
- Later/paused seeds: no changes imported. Initial and final full dry runs found no copy, mark, colour, homepage or status drift for them. Their source refs are observational only; pause through 25 Nov remains intact.
- Coming-soon status: no promotions. Auth and all other coming-soon seeds retain status. No seed contract implementation status is promoted.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain excluded. No override edit was needed.
- Marks/colours/homepage stills: no findings in the actual complete dry reports; no assets were imported or redrawn. No gallery capture or redesign.
- Copy follow-ups remain: Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), Spool ERR-006 (D). All published claims are byte-for-byte unchanged; the only page-source edits are two version fields.
- Assisted US$10/month and Managed US$100/month pricing presentation remains unchanged. No GST wording or billing-country restriction introduced; no pricing source is touched.
- RER drift is report-only: HappyToHelp 0.4.28 vs JE v0.4.31; Lamp 1.11.18 vs JE v1.11.19; Orbit 0.4.10 vs candidate v0.4.11; Spool (RER id errors-workbench) 0.7.12 vs candidate v0.7.13. Uptime and Oncall match. Preserve JE versions, relay to gr, and do not edit RER from this task.
- Envelope asset presence is verified from release metadata; cryptographic signature verification was not performed.

## Fresh RER drift (report-only)

| Seed | RER snapshot | JE candidate |
| --- | --- | --- |
| happytohelp (happytohelp) | 0.4.28 | v0.4.31 |
| lamp (lamp) | 1.11.18 | v1.11.19 |
| uptime (uptime) | 0.5.13 | v0.5.13 |
| oncall (oncall) | 0.5.16 | v0.5.16 |
| orbit (orbit) | 0.4.10 | v0.4.11 |
| spool (errors-workbench) | 0.7.12 | v0.7.13 |

RER generatedAt: 2026-11-15T13:56:34Z; fresh read recorded in source-read-at.txt. The Spool row uses RER id errors-workbench; it is present. JE was never downgraded. Relay the four stale RER versions to gr.

## Validation and limits

- PASS npm ci (726 packages).
- PASS copy-only apply for the six paths, followed by mechanical apply for the five eligible paths, and new-release copy-only apply for Orbit/Spool.
- PASS npm run listings and npm run listings -- --check (49 seeds).
- PASS npm run type-check, npm run lint, npm run build (61 static pages). Actual UTC start/end and exit codes are in checks.tsv; complete logs are included.
- PASS full final dry sync: only the documented Uptime tag remains; 0 unreadable.
- PASS browser version and structured-metadata assertions against eligible release metadata at width 1440, HTTP 200 for both changed pages. Browser proof shows those changed version sections once at 1440 and 390. Browser-receipt.json and four PNGs are included.
- PASS scope/data receipt, unchanged 49/35/14 counts, eight hidden slugs absent, diff whitespace and credential-shaped added-value checks.
- PASS every candidate author/committer is Run Edit Run fleet <fleet@runeditrun.com>, no trailers. Required repository hooks stayed active; working tree clean after commit. Product push succeeded on attempt 1.
- CI: Verify branch run 43897089796: completed / success, exact head 8859bb199a9b92eb7fe05aef12ba1dbc75ac3439. https://github.com/just-every/home/actions/runs/43897089796
- Full test suite, brand check and Cloudflare build are owned by branch Verify; no unrelated full local suite or new pin tests.
- Setup limitations resolved: the first two full dry attempts could not load Playwright (first missing, then global-core fallback unsupported by the existing loader). Installing playwright-core and linking it inside ignored node_modules resolved the issue without sync implementation changes. The third initial dry and final dry completed successfully.
- Browser proof first timed out waiting for networkidle. Retried using DOMContentLoaded plus the actual version row, applied local-only D1 migrations, and completed proof. The bare Next server emits an unavailable Cloudflare caches warning for token snapshots; it did not affect the changed sections. No provider credentials or production bindings were used.
- Browser contexts were closed and own Next server PIDs 22020 and 22508 stopped; subreapers exited. No other server/browser was stopped.
- The Mac-only publication scan cannot run in this cloud and is explicitly left to the fleet landing gate. This local diff check is not that scan.

## Product provenance and CI

Branch: cloud/je-sync-42. Head: 8859bb199a9b92eb7fe05aef12ba1dbc75ac3439. PR: https://github.com/just-every/home/pull/66. Product push receipt: product-push.log. Product tree and per-file hashes: product-receipt.json. Candidate commit identity/messages: candidate-commits.txt.

Verify branch run 43897089796: completed / success, exact head 8859bb199a9b92eb7fe05aef12ba1dbc75ac3439. https://github.com/just-every/home/actions/runs/43897089796

Direct operational GitHub calls: six release metadata reads, one PR create, one exact-SHA run discovery, and at most one delayed run observation (nine). The committed seeds-sync tool performs its separately required raw-source reads through gh api and Git ref probes; no task-local GitHub transport adapter was added. No CI log calls, reruns, dispatches or short polls.

## Full copy-source refs (final dry run)

| Seed | Kind | Ref | Commit | Reason |
| --- | --- | --- | --- | --- |
| uptime | released | v0.5.13 | c1e8376c7dfd6ed601b6fe993567237449fc7143 | released listing version |
| happytohelp | released | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | released listing version |
| nook | released | v0.5.0 | 7fc9516570502e9066b7f3a16d08ad63610d608e | released listing version |
| lamp | released | v1.11.19 | 761f3d186e8fa73ea9aa8b61bcf9ebe8013384f6 | released listing version |
| cradle | released | v0.4.0 | 6422d6fa21bb215167d9335d41e02b862bb7ad65 | released listing version |
| vector | released | v0.4.1 | 3c1e3de9f338b79206be339f7b594ed55e62c934 | released listing version |
| slate | released | v0.4.0 | 635df53b1d055f31998b7a5dd448ce467dab07d2 | released listing version |
| pencil | released | v0.7.0 | 97a985113cfadb9b7edaa8171bac9f5bd31718cb | released listing version |
| orbit | released | v0.4.11 | a4fcbfcd72fa4253826f43d0b0de02275094f86d | released listing version |
| mango | released | v0.4.0 | b40be01dcfcf8d793a92780252859eeccdaeb754 | released listing version |
| dial | released | v0.5.0 | da9f7f3c8b60b1b1935de0a4c7384a5cad1256ac | released listing version |
| penny | released | v0.2.1 | 4befdc40491a1a2f0ce66a77cb67ca5c49a31135 | released listing version |
| oncall | released | v0.5.16 | 7f250f7e66f1377f7b4b773effd1c72e8854c025 | released listing version |
| spool | released | v0.7.13 | e35ebeca36a855cdbe7c0685b7c5324170d17a2a | released listing version |
| balm | released | v0.1.4 | fc2451647ed0263ae50bd8d3536038a9a5c379c0 | released listing version |
| beam | released | v0.1.0 | 3278cad69eab0cf0a591ddf993f6549fbc4097c4 | released listing version |
| cabin | released | v0.1.0 | 37464b4468f5967f381951737d3c3cba46a736fe | released listing version |
| chest | released | v0.2.0 | 219ca4f53eed1448409e979823eac80ad8a24400 | released listing version |
| coaster | released | v0.1.0 | 568ad6d10bdf64f7a1f40a3ff2bbf3e16785fb51 | released listing version |
| coffer | released | v0.1.0 | 87b6d2c62e187385f72debfc5c9bbd3e3d1df458 | released listing version |
| easel | released | v0.1.0 | 82c03999852d81ca96e04c50b87ee81adb2abeb2 | released listing version |
| gasket | released | v0.1.0 | 33769933eaf2bafeb75c80eb2093b1400d282bc5 | released listing version |
| gauge | released | v0.1.0 | cf3745f66aff3b27a4111e30b7cf59824395b4cd | released listing version |
| glove | released | v0.1.0 | a9086f381d9c15af4aec26baafcb6aba619a374d | released listing version |
| larder | released | v0.1.3 | 10758c4295dec89b655e30ef8e26fa4f472e223d | released listing version |
| locket | released | v0.1.3 | b16525ec322de963fa48e6f4aafd78790ff58b41 | released listing version |
| lodge | released | v0.1.0 | 5d58f08b12819305f62e0e617edb1398b07654ca | released listing version |
| nectar | released | v0.1.0 | 59215a083b5f8a1248b1ab53c4c3ea4e51aa110b | released listing version |
| pantry | released | v0.2.8 | b24aaab5aac7e4cd3b83ef39d93a07e8325b6a8e | released listing version |
| pier | released | v0.1.0 | 67c944bf027977ad161aa209e1ff22b0afa9e812 | released listing version |
| purse | released | v0.1.1 | bab2cbe475ea23bd4831a71b441a6fb2b0d2cbdf | released listing version |
| willow | released | v0.1.0 | def0450eb8de870eed4b41fbe3ebdfdb35e6166f | released listing version |
| buoy | released | v0.1.3 | e85c5fa796ccd03ba45e6bea5d5fd3b65b27d471 | released listing version |
| lanyard | released | v0.1.3 | db2a1ef37612248290e0efd85209c9b1f0da8c83 | released listing version |
| terrace | released | v0.1.4 | 0afcac8b3a42c23d984078e6ff90e928c9ebc22f | released listing version |
| auth | soon | HEAD | d55816c1f0e6b66f12d0c2846fdba6cf22965251 | coming-soon seed |
| blotter | soon | HEAD | 4e18475e9bfd57e90da8141a1d6de13efa3f2231 | coming-soon seed; no release tag |
| crank | soon | HEAD | 4c92d9469bda9d3e1a21bc03f4c7f9d20f97c047 | coming-soon seed; no release tag |
| evidence | soon | HEAD | 2a064b4ce1e9e30350a6ea887ff8e4d057f4ef8d | coming-soon seed; no release tag |
| inkwell | soon | HEAD | e4e3c2dd4bdf48fe16111f9d447568d6c4366a84 | coming-soon seed; no release tag |
| mallet | soon | HEAD | 095576e8bfe68bf364228679ff6bd34176a89907 | coming-soon seed; no release tag |
| pane | soon | HEAD | 16501ad7d10c5af6f04799aa44c700249a41e9b4 | coming-soon seed; no release tag |
| placemat | soon | HEAD | 6232d682d8356f2eb0f2d9e58b4e44bba51fd9cd | coming-soon seed; no release tag |
| platter | soon | HEAD | 85dee737177a6559448a012b2b6e22cad05f5e1a | coming-soon seed; no release tag |
| plinth | soon | HEAD | 1fd27e714032ffb16b4682e9409671bd272d0f11 | coming-soon seed; no release tag |
| satchel | soon | HEAD | 2e07928ffcf1061422b85ce066b54dbe08e1e6c3 | coming-soon seed; no release tag |
| stall | soon | HEAD | 8ee1f25df4f0b10b9a62e7fe221453499f27b297 | coming-soon seed; no release tag |
| strap | soon | HEAD | 008fef24f74b44bdb2aaf0fd95dcf50c45ceea7c | coming-soon seed; no release tag |
| vane | soon | HEAD | a2638146dc0faaefe358d203ac940389183151ef | coming-soon seed; no release tag |

## Packet custody

Evidence is published only to refs/heads/evidence/je-sync-42 in just-every/home. It contains a report-only tree and SHA-256 manifest. It does not change the product branch/head/index and is not READY, acceptance or landing proof. The terminal EVIDENCE line names its exact ref and head. PLAN.md retains the original full plan; generated reports and actual receipts are selected explicitly. No credential file, environment dump, held-out gate material or symlink is selected.

Blockers: none. Exact-SHA Verify completed successfully. Independent lane hold and landing gates remain in force.
