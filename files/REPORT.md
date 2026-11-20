# je-sync-54 report

Author: Run Edit Run fleet
Recorded: 2026-11-20T12:10:51Z

Done: candidate pushed and exact-SHA Verify completed successfully. READY custody is recorded in TERMINAL-RECEIPT.json.

Repository: just-every/home
Branch: cloud/je-sync-54
Base: 85540bca95af7ba648bd511bf58a8e9c17edd45f
Product head: 868476d830f4153bdd8bbd1ca73a2cee55dc20be
PR: https://github.com/just-every/home/pull/80
Title: sync: seed listings 20 Nov (path release Oncall v0.5.21)

## Plan and execution

The full plan is PLAN.md. Initialized the fleet launcher, decrypted-bundle Git helper, fleet identity, commit hooks and toolchain. Shallow-cloned only the declared repository, read its AGENTS.md and committed sync source before installing dependencies, and created cloud/je-sync-54 from fresh main. Ran the committed tool with --only happytohelp,lamp,uptime,oncall,orbit,spool on every pass to enforce the six-path scope. No implementation, test, contract-status, pricing, gallery or unrelated copy edits were made.

Initial dry run read all six repositories, released copy sources and homepages. The first invocation stopped because Playwright was not discoverable; linking the VM's existing playwright-core into ignored node_modules fixed discovery without changing tracked files. The successful retry reported exactly:

    Dry run: 1 of 6 seeds changed.
    Oncall
      version   newer tag v0.5.21 (page shows v0.5.19) [to apply]
    2 finding(s) still open from the last sync (report.md lists them).

The first copy-only apply encountered a Git HTTP 503 on the Oncall ref probe and refused to apply anything. Refreshed the launcher and repeated the fleet Git setup, waited 15 seconds, then the copy-only retry succeeded with 0 of 6 seeds changed. Mechanical apply succeeded with only the eligible Oncall version update. A second copy-only apply at the new displayed release boundary recorded the reviewed v0.5.21 copy provenance, preserving all wording and art. Generated and checked listings, then reran the full six-seed dry sync successfully:

    Dry run: 0 of 6 seeds changed.
    2 finding(s) still open from the last sync (report.md lists them).

No unexplained proposed change remains. Full actual outputs and source refs are preserved in DRY-BEFORE, COPY-APPLY, MECHANICAL-APPLY, COPY-NEW-RELEASE and DRY-AFTER reports (both Markdown and JSON).

## Per-seed result and sources

| Seed | Before | Candidate | Released copy commit | Result |
| --- | --- | --- | --- | --- |
| HappyToHelp | v0.4.31 | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | unchanged |
| Lamp | v1.11.24 | v1.11.24 | 3f1349f029fa8c8c59bf9adfe4e2ae59fd502842 | public data unchanged; sync removed an old nonrecurring copy-finding key |
| Uptime | v0.5.18 | v0.5.18 | 52f77a94a0a675ba5e1be122dfe0c720087144fb | public data unchanged; tiny homepage fingerprint observation updated below the change threshold |
| Oncall | v0.5.19 | v0.5.21 | 33cafdc7750103f51ac4173c7b52c8dbcf1efbe0 | displayed version and source provenance updated |
| Orbit | v0.4.12 | v0.4.12 | a9fa1830c1913562154dedaeb5a1322ead7c3e6b | unchanged |
| Spool | v0.7.15 | v0.7.15 | bb2efcd34837cd6067d02ce176609d3fc636dad2 | unchanged |

Every current version was freshly checked against a published, non-draft, non-prerelease GitHub Release carrying rer-release.dsse.json. The only promotion is https://github.com/just-every/run-oncall/releases/tag/v0.5.21, published 2026-11-20T11:53:45Z. Its annotated tag peels to 33cafdc7750103f51ac4173c7b52c8dbcf1efbe0. This verifies envelope-asset presence only; no signatures were downloaded or verified. RELEASE-RECEIPT.json records all six release URLs and metadata.

## Copy provenance review and claims

--copy-only --apply records hashes/ref/commit/reason and preserves prior brand/home observations, open findings and all public wording. It never rewrites public copy or imports mechanical updates.

Compared the released Oncall source range v0.5.19...v0.5.21 through GitHub. CONTRACT.md adds observations and evidence; seed.json changes only its version, while README.md has no diff. The CONTRACT.md OC-021 and OC-022 rows (new-file hunk around lines 1497 onward) retain done and extend cited evidence. Added observations for OC-009, OC-023, OC-025, OC-050, OC-061, OC-070, OC-078 and agent clauses do not contradict the existing JE wording. No source proves a public claim false, so there is no public-copy edit to justify and no implementation-status promotion. COPY-SOURCE-REVIEW.json contains the actual reviewed source patches. Oncall's prior source was 518317b385c4535599bfc670dd676da46069b451; the state now records the v0.5.21 commit and new CONTRACT.md/seed.json hashes.

Clause status changes: none. Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial evidence (C) and Spool ERR-006 (D) remain follow-ups as instructed. No contract or generated acceptance views were changed.

## Actual proposed categories and deliberate holds

Version: only Oncall v0.5.21, independently release-gated as above.
Mark, colours, status, homepage URL, headline, still and incumbent-list changes: none proposed for the six paths. No logo/redesign, recapture campaign, gallery import or artwork edit occurred. The sync's ordinary homepage observations were retained only in its state.
Copy: only Oncall CONTRACT.md and seed.json provenance changed after the version boundary advanced; reviewed and recorded, with wording kept.

Uptime and Oncall still have no parseable alternative-to line on their live homepages. Their existing incumbent lists and Uptime's Pingdom override remain unchanged; these are the two open actual tool findings. No newer detected path version was withheld for lack of an eligible Release. No bare tag was used as publication evidence.

Later seeds remain paused until 25 November and were deliberately excluded from these sync passes. Coming-soon/unreleased copy was not ingested; this run makes no claim that those sources have no drift. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Assisted US$10/month and Managed US$100/month presentation stays intact, including no GST or billing-country restriction changes.

## RER feed and lane drift

Read https://runeditrun.com/data/seeds.json freshly. A default urllib request returned HTTP 403; a normal browser-user-agent curl request succeeded. Matched by repository URL, including Spool at https://github.com/just-every/run-spool with RER id errors-workbench. RER versions are HappyToHelp 0.4.31, Lamp 1.11.24, Uptime 0.5.18, Oncall 0.5.19, Orbit 0.4.12 and Spool 0.7.15. The generatedAt stamp was not treated as version freshness. Preserve candidate Oncall v0.5.21 and relay the RER 0.5.19 drift to gr. RER-FEED-RECEIPT.json records the extracted public facts.

## Scope, counts and validation

Before and after: 49 listings, 35 released, 14 coming soon. No released-status promotion. Three changed files, 12 insertions and 13 deletions:

- public/data/listings.json: generatedAt and Oncall version.
- src/data/seed-pages.ts: Oncall version only.
- scripts/seeds-sync/state.json: sync timestamp, Oncall released-source hashes/ref/commit, Oncall reviewed-copy finding, Lamp old copy-finding bookkeeping, Uptime homepage fingerprint observation.

All other paths remain untouched; PRODUCT.diff is the exact published product diff.

Passed npm ci, npm run listings, npm run listings -- --check, final dry sync, npm run type-check, npm run lint and npm run build. CHECKS-RECEIPT.json records exact-SHA commands, exit codes and UTC times. Production build emits a pre-existing middleware-convention deprecation warning and completes. No local full suite was run; exact-SHA branch CI owns it. No new tests or content-pin tests were added.

Browser proof uses the production build and public /oncall and /data/listings.json doors, asserting at 1440 only and capturing the changed version area once at 1440 and 390. The first networkidle navigation timed out on ongoing page traffic and shut down its browser and recorded server PID. The retry waits for DOM content and fonts, preserving real page behavior. BROWSER-RECEIPT.json and the two PNGs record the result; BROWSER-ATTEMPT-1.json preserves the earlier failed attempt. Only servers started by this run were stopped.

## Publication custody and remaining lane work

Refreshed main and rebased before first push; main remained at the same base. One product commit, fleet author and committer, no co-authors or other trailers. Inspected every candidate identity and complete message, including all side-parent candidates, and checked diff hygiene, scoped paths and credential-shaped patterns. The fleet push guard succeeded on its first attempt. No default-branch push, force push, merge, deploy, rer stop or provider credential use occurred.

Product and evidence publication are separate. Report files stay out of the product branch and are published only to evidence/je-sync-54 attached as a child of the advertised product head. The terminal receipt records exact-SHA Verify and push provenance. Full Mac publication scan is not available in this cloud and remains required, with the independent non-builder gate, PR merge, deployment and live 1440/390 checks, before landing. No READY assertion waives those gates.

Manual GitHub core calls are bounded separately from the committed sync tool's necessary source-file reads: six release lists, one source compare, one PR creation, one exact-SHA discovery and at most one run observation, ten manual calls total. No API adapter, alternate credential, REST ref polling, workflow rerun, extra repository clone or direct log-blob request was used. The actual committed sync commands perform their own contents reads as documented; they were not replaced or patched.

Blockers: none identified in the product change. Any incomplete CI or report transfer is named in TERMINAL-RECEIPT.json and the final relay. The pushed clone and dependencies are removed only after evidence publication succeeds, as the brief requires.

## Final CI observation

Recorded 2026-11-20T12:15:04Z. Verify branch push run 44733339123 completed successfully on exact product head 868476d830f4153bdd8bbd1ca73a2cee55dc20be: https://github.com/just-every/home/actions/runs/44733339123. Discovery also saw PR run 44733382505 and dynamic PR-check run 44733379327; their pending/in-progress discovery observations were not used to claim green. The one permitted follow-up read occurred more than 300 seconds after discovery. Manual core-call budget used: 10.

The candidate is READY for the lane, subject to its independent gates. No product blockers remain. Evidence transport result is reported separately in the final EVIDENCE line.
