Done: je-sync-58. Signed: Run Edit Run fleet, 2026-11-21T06:38:43Z.

Repository: just-every/home. Product branch: cloud/je-sync-58.
Product HEAD: a4432df44b1f920691386ab779c89246fdbb047e.
Base main: e572559bee1902ab7f01fe2fe279e55a6a9c35ff.
PR: https://github.com/just-every/home/pull/84.
Exact-SHA push Verify: 44876309710, completed/success, https://github.com/just-every/home/actions/runs/44876309710.

The candidate advances Spool v0.7.16 to v0.7.17. Listings remain 49 total, 35 released and 14 coming soon, before and after. No clause status changes, public promise edits, status promotions, pricing changes, mark changes, colours, homepage stills or gallery imports. Assisted US$10/month and Managed US$100/month presentation remains intact, without additional tax or country wording. No redesign or capture campaign was committed.

Plan and execution: read the launcher and repository AGENTS.md, the sync README and implementation before installing. Restricted the native sync tool to the six path seeds with --only happytohelp,lamp,uptime,oncall,orbit,spool, because later seeds are paused until 25 Nov. Ran the native dry sync, copy-only apply, mechanical apply, a second copy-only apply after the version change, listings generation/check, and final dry sync. Reviewed release eligibility separately from bare tags. Compared changed copy against the released source. Ran touched checks, refreshed main and rebased the unpublished candidate, committed with the fleet hooks and identity, audited all candidate commits, pushed the named branch, opened the PR, proved the changed page at both widths and observed exact-SHA Verify. The separate evidence packet is published after the product branch; cleanup follows evidence verification. PLAN.md contains the saved pre-change plan.

Dry-sync lines (complete actual reports are included):
- Initial dry: 1 of 6 seeds changed. Spool: version, newer tag v0.7.17 (page shows v0.7.16), to apply.
- Copy-only before: 0 of 6 seeds changed. This flag records source provenance only and preserves public wording, brand and homepage observations.
- Mechanical apply: 1 of 6 seeds changed. Spool version v0.7.17 applied.
- Copy-only after: seed.json changed since the last sync, reported. The reviewed change is its version field only.
- Final dry: 0 of 6 seeds changed, no unreadable seeds; 2 existing findings remain open.

All proposed changes and provenance:
- Version: Spool v0.7.16 to v0.7.17, supported by the published stable Release and seed.json line 4 at that tag. Release asset rer-release.dsse.json is present. This is an asset-presence observation, not signature verification.
- Marks, colours, released status, homepages and public copy: no proposed change in the six-path dry run; no assets or copy imported.
- State: generated sync timestamp; Spool tag/commit/seed.json hash at its newly listed release; Lamp's previously seen copy finding clears under the native tool; Uptime's homepage fingerprint changes below the visible-change threshold. These are observation records, not clause judgments. The state records changed only for lamp, spool and uptime; all other seed records remain byte-equivalent as JSON values.

Fresh published Release checks (all non-draft, non-prerelease, with rer-release.dsse.json asset):

| Seed | Released ref | Release commit | Publication time | Release URL |
| --- | --- | --- | --- | --- |
| happytohelp | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | 2026-11-16T11:23:15Z | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.31 |
| lamp | v1.11.25 | 09f8cdb44557e43615ffa9321bc2492bb24d0710 | 2026-11-21T03:46:07Z | https://github.com/just-every/run-lamp/releases/tag/v1.11.25 |
| uptime | v0.5.19 | b9bff679ec99b702de753d63ad385d232e6b6d1e | 2026-11-20T23:39:34Z | https://github.com/just-every/run-uptime/releases/tag/v0.5.19 |
| oncall | v0.5.22 | 9cbcf975224f7171dcd3813e6f54d4b29a0791ca | 2026-11-21T02:50:25Z | https://github.com/just-every/run-oncall/releases/tag/v0.5.22 |
| orbit | v0.4.12 | a9fa1830c1913562154dedaeb5a1322ead7c3e6b | 2026-11-19T18:57:59Z | https://github.com/just-every/run-orbit/releases/tag/v0.4.12 |
| spool | v0.7.17 | 512977a936e6bda3f76c3a68e2511e62cb56090d | 2026-11-21T05:40:50Z | https://github.com/just-every/run-spool/releases/tag/v0.7.17 |

Spool's prior copy source was v0.7.16 at 804a4ad15e6c8e1c52f0069dcf610ba1f5d2342c; its final source is v0.7.17 at 512977a936e6bda3f76c3a68e2511e62cb56090d. CONTRACT.md is the identical blob 98d20645c67acd0ea21f39ea97855ba566a79e62 at both refs. README.md is the identical blob f623176ca4114b64118fc1481a13d6c0294e82c1. seed.json changes only line 4, version 0.7.16 to 0.7.17; its blob changes from 64d84e483c08d7b1c7e2061cc05d5bef046449df to 62c1c6a1aae5449314353647a5bc787634f605a2. Thus no source proves any existing public claim false, and public wording is retained. released-source-review.json records this review. The other five copy sources are their listed release commits in the table. Brand/mark probes follow seed main; source-heads.json records fresh HEAD probes, and the actual tool report/state records its source hashes.

Per-seed result: HappyToHelp v0.4.31 unchanged; Lamp v1.11.25 unchanged publicly, prior copy-observation key cleared; Uptime v0.5.19 unchanged publicly, sub-threshold fingerprint observation updated; Oncall v0.5.22 unchanged; Orbit v0.4.12 unchanged; Spool v0.7.16 to v0.7.17 with released provenance updated. Changed product paths are public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts. product.diff is the complete product diff.

Withheld and retained: no additional bare-tag promotion was proposed for these six seeds. All later-seed syncing and coming-soon copy ingestion is deliberately deferred until 25 Nov; no fresh drift claim is made for unqueried paused seeds. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Uptime and Oncall still have no detected “alternative to” line on their homepages; their accepted incumbent lists are preserved, including Uptime's Pingdom override. No mark/colour/status follow-up requires a new edit in the actual tool output. Preserve Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D); no source contract implementation status is promoted. These copy/evidence follow-ups remain with the lane.

RER comparison: freshly read https://runeditrun.com/data/seeds.json and matched entries by repository URL, never by the Spool slug. Spool is present as id errors-workbench. It still lists 0.7.16 while this JE candidate lists 0.7.17; preserve the JE version and relay this drift to gr. The other five versions match JE. The RER generatedAt value, 2026-11-15T13:56:34Z, is a static stamp and was not treated as version freshness. rer-comparison-source.json contains the six actual matching metadata rows and observation time.

Validation: npm ci succeeds using the repository's pinned npm 10.9.3 for the final dependency install; Node is v24.19.0. npm run listings, npm run listings -- --check, npm run type-check, npm run lint, and npm run build all pass. Full local test suite was not run; CI owns it. No test was added, deleted, skipped or weakened. Verify's complete branch workflow passes on this exact HEAD. Browser proof of /spool from the production build shows v0.7.17 at 1440x1000 and 390x1000; the one functional assertion runs at 1440 and compares the rendered version against the generated listing rather than a separate pinned literal. Both screenshots were visually reviewed. Browser contexts close and the recorded Next server PIDs are stopped by their owning runner.

Recovered setup limitations: the first dry run and two apply attempts stopped before application because Playwright was unavailable to the native resolver. Installed Playwright 1.63.0 outside the product and exposed it through ignored node_modules; no manifest or lockfile edit. Retried with Chromium at /usr/bin/chromium and --no-sandbox. The final required sync passes completed. The first candidate browser attempt timed out waiting for networkidle; switched the proof wait to DOM readiness and bounded font readiness, then both captures passed. No product change was needed for either limitation.

Custody and gates: main was freshly fetched before the first push; rebase was a no-op. One real product commit was published on the first guard attempt. All candidate author/committer identities and messages were checked; no co-author trailers remain. Changed-path scope, whitespace, credential-shaped diff checks and clean checkout checks pass. Product HEAD is advertised at refs/heads/cloud/je-sync-58. No default branch push, history rewrite, merge, deployment or provider action was performed. PR-triggered Verify is skipped by this repository's intended cloud-branch rule; the push Verify is the required successful run. The separate dynamic PR #84 run was in progress at the single CI observation; no green claim is made for it. The lane retains its landing hold, independent non-builder review, Mac publication scan, PR merge, deployment and live browser verification. The Mac publication scan cannot run in this cloud and remains a landing gate, as the cloud brief specifies. No builder blocker remains.

The actual report, sync reports, source receipts, local check logs and browser proof are retained outside the product repository and selected explicitly for refs/heads/evidence/je-sync-58. Evidence publication is separate from product READY and never grants acceptance or landing.
