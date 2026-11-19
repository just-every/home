# je-sync-52 — 19 November catalogue sync

Author: Run Edit Run fleet. Recorded 2026-11-19T19:24:32Z.

Product candidate pushed: just-every/home, branch cloud/je-sync-52, head `e6bd26e6cbcaa0da5c190f8335319f5da02587da`. PR: https://github.com/just-every/home/pull/78. Base: `76034fe7b1951090ee5bcfd47f1c98c4e7073376`. Only Orbit's version and associated released-copy provenance changed. There are no clause status changes or implementation claims.

## Plan and execution

The full plan is PLAN.md. Executed in an isolated fresh shallow blobless clone after fleet identity, launcher, Git-helper and commit-hook setup. Read AGENTS.md, sync README and implementation before frozen dependency installation. Applied the brief's six-path boundary with `--only happytohelp,lamp,uptime,oncall,orbit,spool` to every sync invocation. Later seeds remain paused through 25 November. No other repository was cloned or written.

Sequence: frozen install; initial dry sync; copy-only apply; mechanical apply; released-source review; another copy-only apply at Orbit's newly displayed release; listings generation and check; final dry sync; type-check, lint and production build; fresh-main fetch/rebase; scope/credential-shaped diff and all-candidate identity/message checks; fleet commit and guarded product push; one PR; candidate browser proof; exact-SHA CI observation; report/evidence publication. The initial dry sync lacked Playwright; installing it globally fixed the tool requirement without a product dependency or implementation edit.

## Dry sync and mechanical changes

Initial successful tool output:

```text
Dry run: 1 of 6 seeds changed.
Orbit
  version   newer tag v0.4.12 (page shows v0.4.11) [to apply]
2 finding(s) still open from the last sync (report.md lists them).
```

No mark, colour, homepage, still, status, headline or incumbent-list update was proposed. The first copy-only apply reported zero copy changes. Mechanical apply imported exactly the Orbit version. The next copy-only pass read Orbit at its new released listing version and reported changed README.md and seed.json; it recorded their hashes without modifying public prose or art. Final tool output:

```text
Dry run: 0 of 6 seeds changed.
2 finding(s) still open from the last sync (report.md lists them).
```

Every proposed or remaining item:

| Item | Decision and source |
| --- | --- |
| Orbit version v0.4.11 → v0.4.12 | Applied from the published v0.4.12 Release and its tag commit below. |
| Orbit README.md and seed.json | Reviewed at released tag v0.4.12; copy provenance only, true public wording retained. |
| Uptime homepage alternative list | Existing open finding: no “alternative to” line detected at https://run-uptime.com; existing replaces and Pingdom priority preserved. |
| Oncall homepage alternative list | Existing open finding: no “alternative to” line detected at https://run-oncall.com; existing replaces preserved. |
| Marks/colours/status follow-ups | No new findings in this round's actual six-path tool output; no redesign or promotion. |

Complete actual dry, copy-only, mechanical-apply, released-copy and final reports are included as both Markdown and JSON, with their source commits and findings. Raw live seed captures remain outside the product and were not imported or selected as evidence art.

## Fresh release verification and source refs

A fresh GitHub repository/release query verified the latest published non-draft, non-prerelease Releases for all six path seeds. Each has an asset named `rer-release.dsse.json`. This establishes envelope-asset presence only; no signature verification, release acceptance or implementation status is claimed. The sync's Git tag probes found no newer unqualified path-seed tags to withhold.

| Seed | Before → after | Released tag commit | Release URL |
| --- | --- | --- | --- |
| HappyToHelp | v0.4.31 → v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.31 |
| Lamp | v1.11.23 → v1.11.23 | 199a635758939ab54b12f3a76dabeee68ab74b8f | https://github.com/just-every/run-lamp/releases/tag/v1.11.23 |
| Uptime | v0.5.18 → v0.5.18 | 52f77a94a0a675ba5e1be122dfe0c720087144fb | https://github.com/just-every/run-uptime/releases/tag/v0.5.18 |
| Oncall | v0.5.19 → v0.5.19 | 518317b385c4535599bfc670dd676da46069b451 | https://github.com/just-every/run-oncall/releases/tag/v0.5.19 |
| Orbit | v0.4.11 → v0.4.12 | a9fa1830c1913562154dedaeb5a1322ead7c3e6b | https://github.com/just-every/run-orbit/releases/tag/v0.4.12 |
| Spool | v0.7.15 → v0.7.15 | bb2efcd34837cd6067d02ce176609d3fc636dad2 | https://github.com/just-every/run-spool/releases/tag/v0.7.15 |

Orbit v0.4.12 was published at 2026-11-19T18:57:59Z. Its prior copy source was tag v0.4.11, commit `a4fcbfcd72fa4253826f43d0b0de02275094f86d`. Other path source refs remain the released versions in the table. Brand files follow seed main through the committed tool, but none produced a change this round.

## Copy provenance review

Compared Orbit's released v0.4.11 and v0.4.12 CONTRACT.md, README.md and seed.json through GitHub repository blobs. CONTRACT.md is byte-identical (state's truncated SHA-256 remains `2c7cce58a1437e4b`), including clause statuses; no contract judgment was imported or promoted.

README.md at v0.4.12 lines 45–65 changes the installer presentation from a piped combined install/dev command to explicit install and dev steps and documents the rer PATH recovery. JE's shared terminal already presents the npx dev route and a separate install-then-dev alternative, so no public catalogue statement became false. README.md line 105 expands archive restore guidance: published forms are withdrawn because capture authority remains with the original installation, then the owner reviews and republishes. The existing JE “export or restore a complete archive of your workspace” capability remains true; it does not promise to carry publication authority or automatically republish forms. The unchanged CONTRACT.md DATA-001 row (line 2487) and DATA-003 row (line 2581) retain the portability judgments; this round makes no new acceptance claim. seed.json line 4 changes only the version from 0.4.11 to 0.4.12.

Public version edits are supported by seed.json line 4 at v0.4.12 plus the published Release above. No other public claim was edited. All existing summary, capability and promise wording is retained. Terrace trust(C), HappyToHelp's eight partial-evidence promises(C), Uptime/Lamp partial evidence(C), and Spool ERR-006(D) remain untouched follow-ups. Coming-soon/unreleased copy was neither imported nor reviewed because later seeds are paused; no claim of no drift is made for those seeds.

## RER catalogue comparison and deliberate holds

Freshly read https://runeditrun.com/data/seeds.json and matched the six path seeds by repository URL, not id. Its generatedAt remains a static 2026-11-15T13:56:34Z; the actual version fields are authoritative for this comparison. HappyToHelp 0.4.31, Lamp 1.11.23, Uptime 0.5.18, Oncall 0.5.19 and Spool 0.7.15 match JE. Spool is present as id `errors-workbench` with repository https://github.com/just-every/run-spool. RER's Orbit is 0.4.11, behind JE's eligible 0.4.12; no downgrade. Relay that drift to gr.

No path version was withheld for lacking a published qualified Release. Deliberately retained: Uptime and Oncall incumbent lists (known missing homepage line); all true public prose; all contract statuses and existing partial-evidence follow-ups; all 43 later catalogue entries under the pause. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Existing Assisted US$10/month and Managed US$100/month presentation remains untouched, without adding GST wording or billing-country restrictions. No galleries, new logos, homepage design or seed stills were ingested.

## Product diff and counts

Exactly three committed paths:

- `src/data/seed-pages.ts`: Orbit version v0.4.11 → v0.4.12 only.
- `public/data/listings.json`: Orbit version and generator timestamp only.
- `scripts/seeds-sync/state.json`: sync timestamp; Orbit's released source ref, commit, tag, README/seed hashes and recorded copy finding; Uptime's previously observed copy finding cleared by the tool. No other seed record changed.

Before and after: **49 listings, 35 released, 14 coming soon**. Status promotions: **0**. Clause status changes: **0**. Changed public listing rows: **1**. Added/deleted/weakened tests: **0**. Every changed path is within the declared write scope. No sync implementation, contract, generated acceptance view, pricing or unrelated page was edited.

## Validation, browser proof and custody

Passed: npm ci; all required scoped sync passes; npm run listings; npm run listings -- --check (49 seeds); npm run type-check; npm run lint; npm run build (61 generated pages); git diff --check; scope and credential-shaped diff inspection; all-candidate author/committer/trailer checks. No full local suite was run; branch CI owns it. Build output carries the pre-existing middleware deprecation notice without a build error. Actual npm/type/lint/build logs and validation-receipt.json are included.

Browser proof ran against the candidate's production build. At width 1440, the Orbit page's rendered version matched the public listings endpoint (v0.4.12). The changed version section was captured once at 1440 and once at 390, and both images were visually inspected. An initial networkidle wait timed out; a DOM-readiness navigation succeeded. Bare Next preview lacks the edge caches API and a migrated analytics table, which emitted local telemetry errors; the catalogue proof passed. No analytics or provider claim is made. Browser and task servers were closed, with servers stopped only by their recorded PID.

The first real commit was pushed immediately through the fleet guard on attempt 1; advertised cloud branch and clean product checkout were verified. No main push, force push, merge, deployment or provider credential use occurred. The PR remains for the lane's independent gate, Mac publication scan, landing, deployment and live 1440/390 verification. Report/evidence publication is separate from product READY custody.

CI status and final custody are recorded in ci-discovery.json, ci-final.json and FINAL-STATUS.md when available. Evidence files are selected explicitly after an email/credential/symlink scan and go only to evidence/je-sync-52. The successfully pushed product clone and node_modules will be deleted after evidence publication; the actual packet remains under this task's work directory.

## Final exact-SHA CI result

At 2026-11-19T19:27:52Z, Verify branch push run 44597428122 completed successfully on `e6bd26e6cbcaa0da5c190f8335319f5da02587da`: https://github.com/just-every/home/actions/runs/44597428122. The earlier discovery is retained unchanged as an actual observation; the additional PR/dynamic runs listed there were not used as proof. No red workflow or product blocker was observed. The publication scan, independent gate, landing, deployment and live proof remain with the lane.

Product custody: READY branch=cloud/je-sync-52 head=e6bd26e6cbcaa0da5c190f8335319f5da02587da.
