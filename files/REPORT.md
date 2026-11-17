# je-sync-44 result

Author: Run Edit Run fleet. Recorded: 2026-11-17T02:15:12Z.

Candidate pushed: `cloud/je-sync-44` at `9ec81f8a0a48b2ef43c82873e057f0667c04f868` in `just-every/home`.
PR: https://github.com/just-every/home/pull/68 (open to main). Exact-SHA push Verify run [44001126383](https://github.com/just-every/home/actions/runs/44001126383) completed successfully; this candidate is READY for the lane's independent gates.

## Plan and execution

The full initial plan is in PLAN.md. A fresh shallow, blob-filtered clone started at main `20474825061a95160f9df45c7064385b068db2e7`. Read the launcher AGENTS.md, repository AGENTS.md, sync README and implementation before installing dependencies. Configured fleet identity and the supplied forwarding/co-author cleanup hook; preserved Husky/lint-staged and Git LFS hooks. Ran the required committed sync tools, limiting every round to `happytohelp,lamp,uptime,oncall,orbit,spool` because later paths are paused until 25 November.

1. `npm ci` passed.
2. Initial `npm run seeds:sync -- --only happytohelp,lamp,uptime,oncall,orbit,spool` dry run succeeded after the two recovery steps described below. It proposed exactly one mechanical change.
3. `npm run seeds:sync -- --only happytohelp,lamp,uptime,oncall,orbit,spool --copy-only --apply` reported zero changed sources. This flag only records copy provenance in state; it preserves public wording and prior brand/home observations.
4. Reviewed fresh Oncall published Release metadata, the released-source comparison and CONTRACT.md. Then mechanical `--apply` imported exactly the Oncall version change.
5. A second copy-only apply aligned Oncall's provenance with its newly displayed release. Its sole finding was seed.json's version row; reviewed it and retained all true JE wording.
6. Ran `npm run listings`, `npm run listings -- --check`, and the final six-path dry sync. Listings check passed; final sync reported zero changes and zero unreadable sources.
7. Typecheck, lint and production build passed (build retry described below). Candidate browser proof passed at 1440, with changed-screen screenshots at 1440 and 390; browser and the recorded server PID were stopped.
8. Fetched main and rebased the unpublished candidate before its first push; main remained at the original SHA. Inspected every candidate author, committer, message and trailer via `git log origin/main..HEAD`, verified clean status, exact checked file hashes, diff whitespace and credential-shaped additions. Pushed the first real commit through the supplied cloud push guard on its first attempt. No force push, merge or deployment occurred.
9. Opened the requested PR. Evidence publication uses a separate report-only ref; product HEAD/index remain untouched. The lane retains its independent non-builder gate, publication scan, landing hold, PR merge, deployment and live checks.

## Actual dry-sync lines and proposed changes

Initial successful output:

```text
Dry run: 1 of 6 seeds changed.
Oncall
  version   newer tag v0.5.17 (page shows v0.5.16) [to apply]
```

Mechanical output:

```text
Applied: 1 of 6 seeds changed.
Oncall
  version   newer tag v0.5.17 (page shows v0.5.16) [applied]
```

Final output:

```text
Dry run: 0 of 6 seeds changed.
```

Every completed full round read all six homepages successfully. The initial/final JSON and Markdown tool reports are included in the packet. There were no mark, colour, released-status, homepage, still, headline, incumbent or public-copy proposals. The actual tool output contains no recurring mark/colour/status hand step for these six paths; none is invented here. No logo, redesign, gallery or capture campaign was imported. The six existing reels and all public/seeds assets are unchanged.

## Release and source provenance

Oncall promotion: [v0.5.17](https://github.com/just-every/run-oncall/releases/tag/v0.5.17), published 2026-11-17T00:50:36Z, `draft=false`, `prerelease=false`. The published Release carries `rer-release.dsse.json` (3185 bytes). This verifies envelope asset presence only; no signature verification is claimed. The tag resolves to `3b9cba555f564a4d582b9909305bc8d35c9c8bf1`.

Old displayed Oncall version/source: v0.5.16, `7f250f7e66f1377f7b4b773effd1c72e8854c025`. The comparison of those two released commits changes seed.json row 4 only among the sync copy sources: `"version": "0.5.16"` to `"version": "0.5.17"`. CONTRACT.md and README.md are absent from the comparison's changed files. Their recorded content hashes remain `c04517abc904f1e5` and `1868c766a1837b41`; seed.json changes `130f81940ec475b7` to `18e677ccbb9af2f1`. See oncall-release.json, oncall-release-compare.json, copy-post-version/report.json and product.diff.

Final copy provenance (the displayed released version is the source boundary in every row):

| Seed | Released ref | Commit | Public copy result |
| --- | --- | --- | --- |
| Uptime | v0.5.15 | `40a6a6d8104a7e4bc15ea89e47406f455a734fe9` | No public copy edit |
| HappyToHelp | v0.4.31 | `e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f` | No public copy edit |
| Lamp | v1.11.19 | `761f3d186e8fa73ea9aa8b61bcf9ebe8013384f6` | No public copy edit |
| Orbit | v0.4.11 | `a4fcbfcd72fa4253826f43d0b0de02275094f86d` | No public copy edit |
| Oncall | v0.5.17 | `3b9cba555f564a4d582b9909305bc8d35c9c8bf1` | No public copy edit |
| Spool | v0.7.13 | `e35ebeca36a855cdbe7c0685b7c5324170d17a2a` | No public copy edit |

The released Oncall contract still supports JE's coordination-first wording: OC-002 routing replay, OC-003 roles, OC-004 incident evidence/timeline, OC-005 copied runbooks, OC-006 bounded approved outbound response events, OC-008 retained authored history, OC-011 zone-aware rotations, OC-012 paging OFF, OC-020 private calendar/now-next, OC-021 reviewed paused move-in, and OC-022 resume/undo. Their sections are unchanged between the releases. No new claim or implementation status was imported. The only public edit is the version field, supported by the published Release and seed.json row 4; no claim wording edit needs a new supporting row.

## Per-seed result and counts

| Seed | Before | After | Other changes |
| --- | --- | --- | --- |
| HappyToHelp | v0.4.31 | v0.4.31 | None |
| Lamp | v1.11.19 | v1.11.19 | None |
| Uptime | v0.5.15 | v0.5.15 | None |
| Oncall | v0.5.16 | v0.5.17 | Released copy provenance follows the new tag; no wording or art changes |
| Orbit | v0.4.11 | v0.4.11 | None |
| Spool | v0.7.13 | v0.7.13 | None |

Counts before → after: **49 → 49 listings; 35 → 35 released; 14 → 14 coming soon**. Clause status changes: **none**. No CONTRACT.md, ACCEPTANCE.md or docs/CLAIMS.md is changed.

Changed product paths, and nothing else:

- `src/data/seed-pages.ts`: Oncall version field, row 1046.
- `public/data/listings.json`: generatedAt and Oncall version, row 595.
- `scripts/seeds-sync/state.json`: syncedAt and Oncall commit/ref/tag/seed.json provenance hash, plus the tool's observed copy-finding marker.

The tool's full mechanical apply cleared a prior Uptime open copy marker because it was no longer a new finding. Restored that existing marker `c843303a1181` so this round does not silently close the named Uptime follow-up. All non-Oncall state records are identical to main, and legacy formatting is preserved. The Oncall copy-only observation is recorded by the tool as seen (`64cb07f6a0dd`); its version-only source edit does not warrant rewriting true claims.

## Deliberately withheld and preserved

- No eligible release drift was withheld in the six paths. No additional bare-tag promotion was proposed. A tag alone would not satisfy RELEASED.
- All later paths, including coming-soon/unreleased source copy, remain unimported under the pause; this round makes no claim to have rescanned their contracts. Coming-soon counts and all statuses stay unchanged.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No overrides change was needed.
- Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D) remain follow-ups. No public copy in any seed was rewritten and no source clause was promoted.
- Assisted US$10/month and Managed US$100/month retain the accepted presentation; pricing files and all GST/billing-country wording remain untouched.
- No galleries or unproven captures were ingested. The sync's own live homepage observations are evidence only.

## Fresh RER feed and lane drift

Read https://runeditrun.com/data/seeds.json freshly; its generatedAt is `2026-11-15T13:56:34Z`. It reports HappyToHelp 0.4.31, Lamp 1.11.19, Uptime 0.5.15, Oncall 0.5.16 and Orbit 0.4.11; Spool is absent from the feed. JE preserves all current versions, advances Oncall to its verified eligible release, and preserves Spool v0.7.13. RER's Oncall lag and missing Spool entry are relayed to je/gr; no RER repository was cloned or written. catalogue-before.json records the actual observed values and counts.

## Checks, recovery and limitations

- npm ci: PASS.
- Copy-only apply, mechanical apply, listings generation/check, final dry sync: PASS.
- npm run type-check: PASS.
- npm run lint: PASS.
- npm run build: PASS on the permitted second invocation. The first invocation compiled and generated routes, then Next.js 16.4.3 stopped with SecurityFatalError for a known dependency vulnerability. The unchanged second invocation completed successfully while retaining the warning. No dependency or security upgrade was attempted outside the brief. This pre-existing Next.js advisory needs a separate maintenance follow-up; the upstream push response also reported default-branch Dependabot findings (8 high, 7 moderate, 2 low).
- Browser: PASS against the production candidate, verifying the displayed version against the freshly observed Release at 1440 and agreement with the public listings door. Screenshots oncall-1440.png and oncall-390.png show the changed version section once at each width. The initial networkidle wait timed out on the page's ongoing resources; a DOM-ready run succeeded. Both attempts closed their browsers and stopped only their recorded server PID. Receipts preserve both outcomes.
- Initial seed Git probes failed authentication, applied nothing, and were retained in dry-initial.log. After 15 seconds, launcher refresh plus the prescribed fleet Git setup recovered authentication. This retry reached all six released refs, then stopped because Playwright was not discoverable. Linked the environment's installed playwright-core under ignored node_modules, reinstalled the supplied commit hook after setup, and ran the original command successfully with /usr/bin/chromium and --no-sandbox. No sync implementation edit or alternate credential/API adapter was used.
- Only relevant checks and typecheck ran locally; the full test suite belongs to CI. No tests were added, deleted, skipped or weakened.
- Mac publication scanning, independent gate, merge, deployment and live proof are intentionally left to the lane under the cloud contract. Evidence publication is separate from product READY/custody.

## CI observation

Observed once at 2026-11-17T02:14:03Z through the required exact-SHA REST discovery endpoint. Required push `Verify branch` run **44001126383** is `completed/success` on `9ec81f8a0a48b2ef43c82873e057f0667c04f868`: https://github.com/just-every/home/actions/runs/44001126383. The PR-triggered Verify run `44001208540` is `completed/skipped` under the workflow's cloud-branch guard; it is not the green evidence. The ancillary dynamic PR #68 run `44001203555` also succeeded. No failing run, rerun or extra poll was needed.

Manual release/source/PR/CI REST calls: 5. The mandatory committed sync rounds themselves also issue source-file API reads (180 expected across four full rounds and two copy-only rounds); no task-local Git/API adapter or high-frequency CI watcher was installed. ci-receipt.json records the actual observation and exact head.

## Packet and publication

PLAN.md, REPORT.md, actual source/review/browser/product/PR/CI receipts, dry/copy/apply reports, checks logs, product.diff and candidate screenshots are selected explicitly for the report-only evidence ref. Credentials, environment dumps, symlinks and private gate material are excluded. Evidence does not alter the product checkout, branch, index or acceptance status.
