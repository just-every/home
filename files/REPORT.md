# je-sync-45 results

Author: Run Edit Run fleet. Recorded 2026-11-17T03:42:22Z.

Done. Candidate pushed and exact-SHA push Verify is completed/success. No builder blocker remains. The lane retains its independent gate, publication scan and landing hold.

- Repository: just-every/home.
- Branch: cloud/je-sync-45.
- Head: df5a56749a451ccdfc958738fc36a730ef0f61b4.
- Fresh main/base: 53148176c2b9d533981173439c94b82ca50a988b (still current at pre-push fetch/rebase).
- PR: https://github.com/just-every/home/pull/70 (requested title retained verbatim: sync: seed listings 16 Nov (path release Oncall v0.5.17)). Open; no merge or deploy performed.

## Full plan

1. Configure fleet Git identity, launcher credentials, push guard, commit hooks, and checkout toolchain. Clone only just-every/home shallow and blobless from main; branch cloud/je-sync-45.
2. Read repository instructions and committed sync implementation. Install dependencies with npm ci. Limit each sync to happytohelp,lamp,uptime,oncall,orbit,spool because later paths are paused until 25 November.
3. Run a dry sync, examine every proposal and source ref, fetch fresh RER public seed data, and verify any version promotion against an actual non-draft/non-prerelease GitHub Release carrying rer-release.dsse.json. Claim asset presence only.
4. Run --copy-only --apply to record released copy provenance without importing wording; retain true public copy and the named existing follow-ups. Compare changed released sources before any public claim edit. Never import unreleased copy or change contract judgments.
5. Run mechanical --apply, review its exact diff, regenerate public listings and check them, and repeat dry sync. Explain every withheld/open finding. Preserve the eight excluded slugs and accepted pricing. No gallery imports, art redesign, provider activity or unrelated source edits.
6. Run type-check, lint and production build plus only checks relevant to the touched catalogue. Check changed paths, diff hygiene and credential-shaped values. Fetch and rebase current main before first publication. Commit using explicit fleet author/committer, hooks active; inspect every candidate identity/trailer and push only cloud/je-sync-45 through cloud-push.py immediately.
7. Open one requested PR to main. Observe exact-SHA Verify using gh REST within the CI observation budget and polling interval. Preserve actual report and receipt files outside the product tree, publish them only to evidence/je-sync-45, and report product and evidence custody separately. Remove the clone/node_modules after successful publication and evidence transport. Leave landing, publication scan and deployment to the lane.

## Dry-sync output and sources

All sync invocations used the committed tool and `--only happytohelp,lamp,uptime,oncall,orbit,spool`. Later seeds are paused until 25 November, so their copy/status/brand sources were deliberately not read or imported. The six-path limit is the brief's stated default, not an inference that other paths have no drift.

Initial successful output:

```text
Dry run: 1 of 6 seeds changed.
Oncall
  version   newer tag v0.5.17 (page shows v0.5.16) [to apply]
```

No mark, colour, homepage/still, released-status or public-copy proposal was reported for any of these six paths; there were no still-open mark/colour/status findings in this six-path run. No gallery or mark files were imported. The initial dry attempt failed because Playwright was missing; installing global playwright@1.63.0 fixed the actual tool without changing repository implementation or dependencies.

Final output:

```text
Dry run: 0 of 6 seeds changed.
```

All six repositories and homepages were readable in the final run. Complete command logs and tool reports accompany this report.

| Seed | Final released copy ref | Peeled source commit | Per-seed public diff |
| --- | --- | --- | --- |
| Uptime | v0.5.15 | 40a6a6d8104a7e4bc15ea89e47406f455a734fe9 | No public change |
| HappyToHelp | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | No public change |
| Lamp | v1.11.19 | 761f3d186e8fa73ea9aa8b61bcf9ebe8013384f6 | No public change |
| Orbit | v0.4.11 | a4fcbfcd72fa4253826f43d0b0de02275094f86d | No public change |
| Oncall | v0.5.17 | 3b9cba555f564a4d582b9909305bc8d35c9c8bf1 | v0.5.16 → v0.5.17; seed.json version only |
| Spool | v0.7.13 | e35ebeca36a855cdbe7c0685b7c5324170d17a2a | No public change |

Oncall's initial source was v0.5.16 at 7f250f7e66f1377f7b4b773effd1c72e8854c025. The source refs use the displayed released version, not seed-main. Marks and colours were checked from seed HEAD by the tool, and live homepages were separate observations. No public art change was proposed or applied.

## Release rule and copy review

The only version promotion is Oncall v0.5.16 to v0.5.17. Fresh GitHub Release metadata: https://github.com/just-every/run-oncall/releases/tag/v0.5.17, Release ID 447842965, published 2026-11-17T00:50:36Z, draft=false, prerelease=false, asset rer-release.dsse.json (3185 bytes). This proves envelope-asset presence only. No signature verification claim is made. The annotated v0.5.17 tag peels to 3b9cba555f564a4d582b9909305bc8d35c9c8bf1; a bare tag was not the release gate.

The first `--copy-only --apply` recorded zero copy findings and changed no public wording or art. After applying the version, a second copy-only pass recorded the new release's source provenance. Its sole copy finding was seed.json: line 4, version 0.5.16 → 0.5.17. The two released CONTRACT.md files are byte-identical (SHA256 c04517abc904f1e5618a858e191fd0a9ae1dc54484b6fb993a56c794a9193cac); the README hash is unchanged (1868c766a1837b41). No released source proves an existing public claim false, so all existing wording stays. The displayed version edit is supported by released seed.json line 4 and the actual GitHub Release metadata. The copy finding remains recorded in state as seen; it requires no prose rewrite and produces no unexplained residual dry-sync change.

No source CONTRACT.md, ACCEPTANCE.md or docs/CLAIMS.md was edited. No clause status, gap, evidence, acceptance point, or implementation judgment changed. The Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D) follow-ups are preserved. No DONE/PARTIAL claim is advanced in this catalogue round.

## Exact product changes and counts

- src/data/seed-pages.ts:1046: Oncall version only, v0.5.16 → v0.5.17.
- public/data/listings.json: generatedAt refreshed; Oncall version mirrors the released source.
- scripts/seeds-sync/state.json: syncedAt refreshed; Oncall ref, peeled source commit and seed.json hash follow v0.5.17; its version-only copy finding is recorded. The mechanical full apply removed Uptime's old open-finding key c843303a1181 because the current tool found no corresponding drift. This bookkeeping does not close or change the lane's partial-evidence copy follow-up.

Before and after: 49 listings, 35 released, 14 coming soon. The listing comparison verified that every listing field other than Oncall's version is unchanged. Only Oncall and Uptime records changed in sync state; every paused-seed record is byte-equivalent as parsed data. No other product path changed. No tests were added, deleted or weakened.

## Deliberately withheld and preserved

- No other newer tag was proposed on the active six paths; no bare-tag release promotion was made.
- Paused later paths and coming-soon/unreleased copy were not imported or promoted. Their current drift was not assessed in this six-path round.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No override removal was needed.
- No mark, palette, still, gallery capture, design or unrelated copy change was made.
- Pricing presentation remains Assisted US$10/month and Managed US$100/month, with no GST or billing-country restriction introduced; all pricing source paths are unchanged.
- Full publication scan, independent gate, PR merge, deployment and live 1440/390 checks remain with the lane. The cloud performed its changed-diff hygiene scan only, as instructed.

## Fresh RER catalogue observation

Read https://runeditrun.com/data/seeds.json freshly. Its generatedAt field is 2026-11-15T13:56:34Z. It lists HappyToHelp 0.4.31, Lamp 1.11.19, Uptime 0.5.15, Oncall 0.5.17 and Orbit 0.4.11; these match the final JE candidate. It has no Spool entry (16 entries total), so JE Spool v0.7.13 was preserved. Report the RER omission to gr; no RER repository was cloned, changed or pushed, and no JE version was downgraded. rer-six-path.json records the relevant public observation, including an explicit missing Spool observation in the final packet.

## Validation and limitations

- `npm ci`: passed.
- `six-path initial dry sync`: passed after installing missing Playwright; one version proposal.
- `six-path --copy-only --apply`: passed; no public text imported.
- `six-path --apply`: passed; Oncall version only.
- `six-path final --copy-only --apply`: passed; recorded Oncall seed.json version-only change.
- `npm run listings`: passed.
- `npm run listings -- --check`: passed.
- `six-path final dry sync`: passed; 0 of 6 seeds changed, 0 unreadable.
- `npm run type-check`: passed.
- `npm run lint`: passed.
- `npm run build`: passed on identical-command retry following first-run SecurityFatalError upgrade reminder.
- `catalogue comparison`: passed; sole listing field delta is released Oncall version.
- `git diff --check`: passed.
- `changed-diff credential-pattern scan`: passed; 0 findings.
- `candidate identities and trailers`: passed for all origin/main..HEAD commits.
- `Oncall browser`: 1440 and 390: HTTP 200, v0.5.17 observed, 0 page errors; assertion at 1440, proof screenshots at both widths.
- `full local suite`: not run; CI owns full suite per brief.
- `full publication scan`: lane-owned Mac gate; not available in this cloud.


The browser initially timed out waiting for networkidle on the page's existing remote media; the retry used DOM readiness, without mocking application routes. Local DB migrations were run for the local preview only. Both screenshots show the version and existing responsive layout; the existing external reel displayed a loading spinner. These are local candidate proofs, not live deployment receipts.

The first production build generated all 61 pages then exited with SecurityFatalError and a Next.js upgrade reminder. The identical-command retry passed and retained the known-vulnerability warning. The existing Next.js version should be upgraded in a separate scoped round; no dependency or workflow change was made here. This warning is not introduced by the listing update. The middleware convention deprecation is also pre-existing.

Product push succeeded on attempt 1. Fleet identity and trailer inspection covered all candidate commits and their side parents (this candidate has one new commit and no side parents); no co-author trailers are present. Commit hooks remained active and preserved repository lint-staged hooks. The pre-push fetch/rebase was up to date. No published history was rewritten.

The full test suite and OpenNext CI build are owned by branch Verify; its exact-SHA observation follows in the CI receipt. Evidence publication is separate from product READY and never substitutes for a green Verify or the lane's publication scan. Product checkout and node_modules are to be deleted only after successful product push, CI observation, and evidence publication; actual packet files remain outside the clone.


## Exact-SHA CI observation

Observed once at 2026-11-17T03:43:06Z, via gh api repos/just-every/home/actions/runs?head_sha=df5a56749a451ccdfc958738fc36a730ef0f61b4&per_page=100. The push Verify branch run [44011868390](https://github.com/just-every/home/actions/runs/44011868390) is completed/success on exactly df5a56749a451ccdfc958738fc36a730ef0f61b4. No rerun or dispatch was requested. The pull_request Verify run 44011933288 is completed/skipped, as expected from its cloud-branch duplicate suppression. Dynamic PR #70 run 44011930518 also reports completed/success on the same SHA, but the required READY basis is the push Verify run, not that auxiliary run.

Direct gh calls: Release metadata 1; released Oncall CONTRACT.md files 2; released seed.json files 2; PR creation 1; exact-SHA CI discovery 1. There were 7 direct calls, 1 CI watcher observation, no CI polls and no failed-job log calls. The required committed sync tools additionally perform their own source-file reads through gh api; those were left unchanged, with no task-local API adapter or alternate credential.

READY branch=cloud/je-sync-45 head=df5a56749a451ccdfc958738fc36a730ef0f61b4
