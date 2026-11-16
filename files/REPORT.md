# je-sync-43 report

Done: candidate pushed for lane review. Author: Run Edit Run fleet. Report date: 2026-11-16T23:10:48Z.

Repository: just-every/home. Branch: cloud/je-sync-43. Head: `423e10234898f9742f9724749e106b0678572b38`.
PR: https://github.com/just-every/home/pull/67. Fresh main: `1d91856f473247502fc65302131891dbdf2c0000`.
No merge or deployment was performed. Exact-SHA Verify run 43976676609 completed/success on `423e10234898f9742f9724749e106b0678572b38`, observed at 2026-11-16T23:14:37Z. Its URL and exact-SHA receipt are in ci-final.json and TERMINAL-RECEIPT.json.

## Plan and execution

The full plan is in PLAN.md. Fleet identity and credential helpers were installed before Git transport; the launcher and repository AGENTS.md plus sync implementation were read first. The product clone was shallow and blobless, on fresh main. `npm ci` passed. The six permitted seed paths were selected with `--only happytohelp,lamp,uptime,oncall,orbit,spool`; later seeds remain paused until 25 November.

The committed sync command was used for dry run, copy-only apply, mechanical apply, release-boundary copy-only apply, and final dry run. Playwright was initially unavailable to the tool. Installing playwright-core globally and exposing it through an ignored node_modules link repaired module resolution without any product dependency or implementation edit. The fleet hooks were reinstalled after setup. The failed setup attempts and successful run logs are retained separately.

Initial dry-sync lines:

```
Dry run: 1 of 6 seeds changed.
Uptime
  version   newer tag v0.5.15 (page shows v0.5.13) [to apply]
```

No mark, colour, released-status, homepage, still, headline, incumbent or copy change was proposed for these six seeds. Actual tool output contains no still-open art/status follow-up for this subset. There was no redesign, new artwork, gallery ingestion or capture campaign. The tool's normal homepage reads were used only for comparison; no public art changed.

`--copy-only --apply` preserves published wording and art, updating only copy provenance and the sync timestamp. Its first run reported `Applied: 0 of 6 seeds changed`. Mechanical apply reported `Applied: 1 of 6 seeds changed`, applying only Uptime's version. Because released copy follows the displayed listing version, copy-only apply was then repeated at v0.5.15 and recorded Uptime's three changed source hashes. No copy was imported automatically.

Final dry-sync line:

```
Dry run: 0 of 6 seeds changed.
```

There are no unexplained findings in the permitted subset. The full tool reports and source hashes are in the selected report files.

## Source and publication evidence

Fresh GitHub latestRelease data for all six seeds is in releases.json. Every listed release is non-draft and non-prerelease and carries an asset named `rer-release.dsse.json`. This establishes asset presence only. No signature, DSSE verification, implementation completion or held provider qualification is claimed.

The one version promotion is Uptime v0.5.13 → v0.5.15, published 2026-11-16T21:13:14Z:
https://github.com/just-every/run-uptime/releases/tag/v0.5.15

The annotated v0.5.15 tag object is `2d3ac2f535092e72cd6bba64afee21e12321715f`; its peeled released commit is `40a6a6d8104a7e4bc15ea89e47406f455a734fe9`. Uptime main was independently observed at `f5ae7e2e254bc90c64d2ec617e617a2fe3dd1ed9`; released copy follows the peeled release, not main. v0.5.14 was not imported as a standalone release.

| Seed | Final released copy ref | Released source commit | Published at | Public copy edits |
| --- | --- | --- | --- | --- |
| happytohelp | v0.4.31 | `e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f` | 2026-11-16T11:23:15Z | none |
| lamp | v1.11.19 | `761f3d186e8fa73ea9aa8b61bcf9ebe8013384f6` | 2026-11-15T23:27:59Z | none |
| uptime | v0.5.15 | `40a6a6d8104a7e4bc15ea89e47406f455a734fe9` | 2026-11-16T21:13:14Z | none |
| oncall | v0.5.16 | `7f250f7e66f1377f7b4b773effd1c72e8854c025` | 2026-11-15T21:07:22Z | none |
| orbit | v0.4.11 | `a4fcbfcd72fa4253826f43d0b0de02275094f86d` | 2026-11-16T14:35:53Z | none |
| spool | v0.7.13 | `e35ebeca36a855cdbe7c0685b7c5324170d17a2a` | 2026-11-16T14:00:22Z | none |

All unchanged versions and their release URLs are recorded in releases.json. Existing marks and colour sources continue to follow seed HEAD through the committed tool, and all six produced no art drift.

## Copy review

COPY-REVIEW.md and the three Uptime source diffs contain the review. At v0.5.15 the changed contract requirement is STARTUP-001 (CONTRACT.md line 237): explicit `MAIL_PROVIDER=none` allows hosted operation without outbound mail and guarded `rer signin` provides owner access. Email links, invitations and email alerts stay unavailable in that mode. README.md lines 160 and 170 document the same option. seed.json line 4 changes only the release version. Existing JE Uptime copy describes supported monitoring and configured alert channels; it does not claim outbound mail is mandatory for deployment, so these source changes prove none of the existing public wording false. All published wording was retained. No contract implementation status was promoted.

Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D) are preserved and remain follow-ups. This catalogue maintenance makes no claim to resolve them. No later/coming-soon/unreleased source was read or imported, in accordance with the pause; its copy drift remains unassessed in this round.

## Per-seed and file diff

- Uptime: public version v0.5.13 → v0.5.15; state now names the peeled v0.5.15 release and its CONTRACT.md, README.md and seed.json hashes. Its existing open copy-review fingerprint is retained.
- Orbit and Spool: public content and versions unchanged; the mechanical sync clears stale state-only open fingerprints that no longer recur in the actual output. This does not close or change any promise, contract status or Spool ERR-006 follow-up.
- HappyToHelp, Lamp and Oncall: no product or state change.
- All other seed records and all existing public copy/art are unchanged.

Only three allowed paths changed: public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts. No evidence files were committed to the product branch. Product diff: 12 insertions, 14 deletions. Generated listing and sync timestamps advance. Full diff is in product.diff.

Before/after counts: **49 → 49 listings; 35 → 35 released; 14 → 14 coming soon**. Version promotions: **1**. Released-status changes: **0**. Clause status changes: **0**. Public claim edits: **0**. Mark/colour/homepage changes: **0**. Tests added/deleted: **0/0**.

Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent from listings and public/seeds. No exclusion reappeared, so overrides.json is unchanged. Pricing remains the existing Assisted US$10/month and Managed US$100/month presentation, with no GST wording or billing-country restriction added; the pricing source is byte-for-byte unchanged.

## RER drift and deliberately withheld work

A fresh HTTPS read of https://runeditrun.com/data/seeds.json is retained in rer-seeds.json, with read time in source-read-at.txt. Its generatedAt is 2026-11-15T13:56:34Z. RER lists Uptime 0.5.13 while this candidate now lists released v0.5.15; Spool is absent from RER despite JE's published v0.7.13. HappyToHelp 0.4.31, Lamp 1.11.19, Oncall 0.5.16 and Orbit 0.4.11 agree. No JE released version was downgraded. RER's update belongs to gr and is relayed separately.

Deliberately withheld: all later/coming-soon seeds until 25 November; excluded seeds listed above; any v0.5.14 bare-tag promotion; unreleased-main copy/status; signature verification claims; existing partial-evidence copy follow-ups; gallery and capture-pipeline work. No otherwise eligible change within the six permitted paths remains withheld.

## Validation and custody

- npm ci: pass.
- listings generation and --check: pass, 49 seeds.
- final six-seed dry sync: pass, zero drift and all six readable.
- npm run lint: pass.
- npm run type-check: pass.
- npm run build: the initial build stopped after compilation on Next.js's existing security upgrade reminder; repeating the unchanged command passed. Next.js 16.4.3 still reports an upgrade recommendation, outside this listing-only scope. No dependency was changed and no security fix is claimed.
- Local public-page/browser proof: version and JSON consistency asserted at 1440; changed Uptime facts photographed at 1440 and 390, in uptime-1440.png and uptime-390.png. Browser receipt records the successful proof. An initial networkidle wait timed out; proof used DOM readiness instead. Local D1 migrations were applied before proof. Exploratory startup failures are retained, not counted as product failures.
- Diff scope, unchanged listing fields, exclusion absence, before/after counts and zero clause/public-copy changes: pass (scope-receipt.json).
- git diff --check and credential-shaped candidate diff scan: pass.
- All candidate commit authors/committers are Run Edit Run fleet <fleet@runeditrun.com>, with no trailers. Fleet commit hooks and repository hooks remained active. Fresh main was fetched and the unpublished commit rebased before its first guarded push. Push succeeded on attempt 1; there was no force push or history rewrite.
- Full suite belongs to exact-SHA branch Verify. Mac publication scan, independent gate, merge, deploy and live verification remain with the lane under the stated landing hold. No cloud publication-scan completion is claimed.

The exact candidate SHA, PR, push and CI results are recorded in TERMINAL-RECEIPT.json. The complete selected packet is published only to evidence/je-sync-43 using the separate report transport. No product READY claim is inferred from evidence publication. The product clone will be deleted after successful transfer as required; packet files remain outside it.

The existing Next.js 16.4.3 dependency emitted a security-upgrade advisory. Its initial build refusal and the successful retry are both retained; a dependency upgrade is outside this catalogue-only write scope and remains a separate follow-up. Local preview also logged an unavailable token-snapshot cache in Node; this does not affect the released listing rendering. No provider credentials or production bindings were used.

## Final candidate custody

Finalized at 2026-11-16T23:15:12Z. Exact-SHA Verify run **43976676609** is **completed/success**: https://github.com/just-every/home/actions/runs/43976676609. No required workflow is pending and no candidate blocker remains. The single watcher used one discovery and one status observation, separated by more than 300 seconds. Seven manual gh calls were used for release/source qualification, PR creation and CI; the separately mandated committed sync tools also made their own source-content reads. No failed-job log archive was needed.

Product branch and exact head were verified by git ls-remote. Identities and trailers were checked across origin/main..HEAD including every reachable candidate commit; the single commit has fleet author/committer and no co-author trailers. All report files remain outside the product branch. The clone and its node_modules are scheduled for deletion after the report-only transfer succeeds, per the brief. All started browser/server processes are stopped. The lane retains independent gate, publication scan, merge, deployment and live 1440/390 verification.

READY branch=cloud/je-sync-43 head=423e10234898f9742f9724749e106b0678572b38
