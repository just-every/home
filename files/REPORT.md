# je-sync-47 results

Author: Run Edit Run fleet. Timestamp: 2026-11-17T10:01:22Z.

Product: just-every/home, branch `cloud/je-sync-47`, head `622aec51aa844eeaa4fba3841393a673d18e88eb`.
PR: https://github.com/just-every/home/pull/73 (open to main; requested title preserved verbatim).
Fresh main/base: `b0243a5998f76c4cbe56e6b76160d36961150207`.
Product push succeeded on the first guard attempt at 2026-11-17T09:58:16Z. Main was fetched, the clean committed candidate was rebased onto origin/main (already current), and all candidate author, committer, messages and trailers were checked before publication. No main push, merge, deployment or provider work was performed.

## Plan and execution

The full pre-edit plan is PLAN.md. Its steps were completed: fresh shallow clone; AGENTS and sync implementation review; npm ci; six-path dry sync; fresh RER and Release reads; copy-only provenance apply; mechanical apply; release-source comparison; final copy provenance refresh; listings generation/check; final dry sync; type-check, lint, build and responsive browser proof; fleet commit/hook/identity/diff checks; named-branch push and PR; separate evidence return. CI observation and terminal custody appear below and in CI/terminal receipt files.

Only the six path seeds were read by sync (`--only happytohelp,lamp,uptime,oncall,orbit,spool`). The other 43 catalogue entries remain paused. The sync implementation was not changed. Copy-only mode was inspected before use: it reads released copy at the displayed version, preserves public copy/art/brand/home observations, and only records provenance in state. It is not a copy-import flag.

## Actual dry-sync and apply output

Initial successful dry run at 2026-11-17T09:50:18.311Z:

```text
Dry run: 2 of 6 seeds changed.
Lamp
  version   newer tag v1.11.22 (page shows v1.11.21) [to apply]
Oncall
  version   newer tag v0.5.18 (page shows v0.5.17) [to apply]
```

No mark, colour, status, homepage, headline, incumbent-list or copy change was proposed by that run. No recurring art/colour/status hand step was listed by the actual six-seed output. The old state open hashes for Lamp, Spool and Uptime were retired by the tool's full apply; this is sync bookkeeping and is not a clause judgment.

The first copy-only apply reported zero copy changes at the then-displayed releases. The successful full apply imported exactly the two version changes. At the newly displayed releases, the next dry run reported only `seed.json changed since the last sync` for Lamp and Oncall. Comparison of the actual released files proves CONTRACT.md and README.md are byte-identical between the old and new tags for both seeds. Each seed.json changes only line 4, its version. Therefore all existing public claims remain true relative to the reviewed change, and no public copy edit was made. See released-copy-sources.json (Git blob IDs and text) and released-copy-diff.txt. A final copy-only apply recorded those released refs/hashes, with no wording edits.

Final dry-sync output:

```text
Dry run: 0 of 6 seeds changed.
```

All six final sources were readable. The complete actual logs and generated reports are retained in this packet; no finding remains unexplained.

## Per-seed versions and released source refs

| Seed | Before | After | Copy source commit after sync |
| --- | --- | --- | --- |
| Uptime | v0.5.16 | v0.5.16 | `6fd9399cf9ce9acf4e009999581cc20f32c9e129` |
| HappyToHelp | v0.4.31 | v0.4.31 | `e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f` |
| Lamp | v1.11.21 | v1.11.22 | `4c90e6c8f35775e2a0287ab24ccba87d7a8d8485` |
| Orbit | v0.4.11 | v0.4.11 | `a4fcbfcd72fa4253826f43d0b0de02275094f86d` |
| Oncall | v0.5.17 | v0.5.18 | `8dd2a0acf06b30fbc810c8a2a7e0fe8c01dd85ef` |
| Spool | v0.7.14 | v0.7.14 | `1853e3b3b59d49853b5ee7678f851d6de8343fbf` |

Every listed source reason is `released listing version`. Source refs and annotated-tag peeling are recorded in source-refs.txt and the generated reports. Copy sources follow release commits; brand checks follow seed main; homepage checks are separate live observations. No new art or capture campaign was imported.

Lamp promotion: https://github.com/just-every/run-lamp/releases/tag/v1.11.22, published 2026-11-17T09:20:51Z. Oncall promotion: https://github.com/just-every/run-oncall/releases/tag/v0.5.18, published 2026-11-17T09:09:41Z. Fresh release API reads show both non-draft, non-prerelease and carrying `rer-release.dsse.json` (Lamp 3157 bytes; Oncall 3185 bytes). This verifies envelope-asset presence only; signatures were not verified. Fresh API reads of the other four seeds show no newer published release than the versions retained. The actual Release response projections are releases-*.json.

## RER drift

Freshly fetched https://runeditrun.com/data/seeds.json at 2026-11-17T09:49:15Z. Its generatedAt is the static `2026-11-15T13:56:34Z`; comparison used each actual version and matched repository URL/name. Before the sync, all six versions matched. After the candidate, RER trails Lamp (1.11.21 versus JE v1.11.22) and Oncall (0.5.17 versus JE v0.5.18); the candidate retains its newer released versions. The other four match. Spool is present as `errors-workbench`, matched through https://github.com/just-every/run-spool, at 0.7.14. It is not omitted. See rer-comparison.json and rer-comparison-after.json; relay this drift to gr.

## Scope, counts, withheld work and clause status

49 listings → 49; 35 released → 35; 14 coming soon → 14. No released-status promotion or contract implementation-status change. No target clause is being claimed DONE or PARTIAL by this catalogue maintenance task.

Changed product files only:

- `src/data/seed-pages.ts`: two version strings.
- `public/data/listings.json`: those same two versions and generatedAt, regenerated by the committed tool.
- `scripts/seeds-sync/state.json`: final released refs, copy hashes, sync timestamp and observed/open-finding bookkeeping from the committed tool.

No changes to mark, colour, homepage/still, gallery, pricing, excluded-entry overrides, copy, sync implementation or unrelated pages. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Assisted US$10/month and Managed US$100/month retain the accepted presentation with no added GST or billing-country restriction. Terrace trust(C), HappyToHelp's eight partial-evidence promises(C), Uptime/Lamp partial evidence(C), and Spool ERR-006(D) remain follow-ups, unchanged by this candidate.

Withheld: all later-seed changes until 25 November; coming-soon/unreleased copy and status promotions; galleries lacking committed capture provenance; new logo/homepage/style/capture work. None of the six path seeds has a newer bare tag to withhold according to the successful dry-sync and fresh published-Release comparison. No eligible six-path version update was deliberately left out.

## Checks and proof

PASS: npm ci; initial and final six-seed dry sync; both copy-only applies; mechanical apply on retry; npm run listings; npm run listings -- --check; npm run type-check; npm run lint; production npm run build; diff whitespace/scope/credential-pattern review; all candidate commit identities/trailers. No new tests were added for these two version strings. The full suite belongs to CI.

Browser proof from the production build of the exact candidate tree: Lamp and Oncall versions asserted at 1440, and each changed page captured once at 1440 and 390. All four pages returned HTTP 200. See browser/receipt.json and browser/*.png; screenshots were visually inspected and display the new versions clearly. Browsers were closed in finally blocks; only the two recorded Next server PIDs started for this work were stopped.

Limitations recovered: first source reads returned HTTP 401; the mandated 15-second backoff, launcher refresh, fleet Git setup reinstall and decrypted-bundle reread recovered. A later Orbit ref read returned HTTP 503; a 15-second backoff and refresh recovered it before mechanical apply. The initial browser pass lacked Playwright; installed the documented global Playwright 1.63.0 and reinstalled fleet hooks. The first candidate browser proof timed out on networkidle; it closed normally and was repeated using DOM readiness plus font readiness. The local server logged pre-existing analytics/D1/token-cache environment errors; the read-only static catalogue proof passed, and those paths were not changed. One supplemental GraphQL query used the wrong gh field flag and returned a syntax error; rerunning with `-F query=@file` returned the actual released blobs. No failed read was used as release proof.

Mac publication scan, independent non-builder review, landing hold, PR merge, deployment and live verification remain with the lane. This report does not claim landing or deployment.

## CI and terminal custody

Exact-SHA REST observation at 2026-11-17T10:01:36Z: Verify branch push run 44060446426 is completed/success on `622aec51aa844eeaa4fba3841393a673d18e88eb` (https://github.com/just-every/home/actions/runs/44060446426). The PR-event Verify run 44060585675 is skipped by the existing cloud-branch rule; it is not the success used for READY. Dynamic PR #73 run 44060582436 also completed/success on the same head. One CI discovery call; no polling, dispatch or rerun. No failing run was observed. Product custody and report evidence custody are separate. The evidence ref is report-only and does not signal product acceptance.

Final custody: READY for independent lane gates on `cloud/je-sync-47` at `622aec51aa844eeaa4fba3841393a673d18e88eb`. No product blocker remains. Full local suite and Mac publication scan were deliberately left to their named CI/lane owners. Evidence transport is separate from this READY claim.

Signed: Run Edit Run fleet, 2026-11-17T10:02:23Z.
