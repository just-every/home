# je-sync-30 results

Recorded 2026-11-13T21:27:50Z.

Done: candidate pushed to `cloud/je-sync-30` at `2ae43f9e53a68f2a998af6df95ed13e038c66c68`. PR: https://github.com/just-every/home/pull/54. Product custody and report-only evidence custody are separate. Exact-SHA Verify completed successfully; its actual receipt is ci-final.json.

## Plan and completion

The complete working plan is PLAN.md. Read launcher AGENTS.md, home AGENTS.md and the committed sync README/modules first. Installed with npm ci, recorded a full 49-source dry sync, applied copy provenance and mechanical updates only for the six path seeds, checked fresh GitHub Release records and released source files, regenerated listings, reran the full dry sync, ran touched checks and browser proof, fetched/rebased main before the first product push, audited identity and scope, pushed via cloud guard and opened the requested PR. Remaining steps belong to the lane: independent gate, Mac publication scan, PR merge, deployment and live proof.

## Scope and counts

- Changed only public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts. One product commit; no report/evidence files in the product branch.
- Counts before and after: 49 total, 35 released, 14 coming soon. No released-status promotion.
- All listing fields except the three versions are identical to main; pricing presentation and all unrelated copy stay intact. Assisted US$10/month and Managed US$100/month policy was not edited; no GST/billing-country wording introduced.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. overrides.json is unchanged; none reappeared.
- No new marks, colours, homepage stills, designs, galleries or capture imports. src/data/seeds.ts and upcoming.ts are unchanged.
- No CONTRACT.md or implementation-status judgment edited. Clause status changes: none.

## Initial dry sync and eligible changes

Exact terminal result: `Dry run: 3 of 49 seeds changed.` All 49 sources and homepages readable; no repeated/open mark, colour, status, homepage or copy findings were emitted. Only the following version findings appeared:

- HappyToHelp: `newer tag v0.4.25 (page shows v0.4.24) [to apply]`.
- Oncall: `newer tag v0.5.13 (page shows v0.5.12) [to apply]`.
- Spool: `newer tag v0.7.10 (page shows v0.7.9) [to apply]`.

Full source refs and terminal lines for all 49 seeds are in dry-initial/report.md, dry-initial/report.json and dry-initial.log.

| Seed | Before → after | Released-copy tag and resolved commit | Brand HEAD observed |
| --- | --- | --- | --- |
| happytohelp | v0.4.24 → v0.4.25 | v0.4.25 / `333af4b0580c4284616783f1d79fcc9aad3aefc5` | `333af4b0580c4284616783f1d79fcc9aad3aefc5` |
| lamp | v1.11.14 → v1.11.14 | v1.11.14 / `733e2ce1e2fc618183a93632218bb86456a06a79` | `8d980ecc58b7a683b942293033d42ed254af6ffb` |
| uptime | v0.5.11 → v0.5.11 | v0.5.11 / `04016399e1e879e7be3b8e891baf02d975bb3901` | `83b2f2692149c9171a12cba0d7397734a1e8096b` |
| oncall | v0.5.12 → v0.5.13 | v0.5.13 / `8adae6c836f2fabda29e8a091b052450410c8ca5` | `8adae6c836f2fabda29e8a091b052450410c8ca5` |
| orbit | v0.4.9 → v0.4.9 | v0.4.9 / `a5f471626aea1bfcb2c79f5dbee2250fdb38fd49` | `31ee78c0d348ba5c0d9e5ad530d8d23dbde5f47d` |
| spool | v0.7.9 → v0.7.10 | v0.7.10 / `417ab513b3032370091479fa28f41a5a67b50c53` | `417ab513b3032370091479fa28f41a5a67b50c53` |

## Release eligibility

Fresh Releases API reads found all three updates non-draft and non-prerelease with a named rer-release.dsse.json asset. HappyToHelp and Spool were released after the brief snapshot and before the fresh check; neither was promoted merely from its signed tag. Envelope-asset presence was checked, not the envelope signature or attested contents. No signature-verification claim is made.

| Promoted tag | Release URL | Published UTC |
| --- | --- | --- |
| happytohelp v0.4.25 | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.25 | 2026-11-13T21:16:57Z |
| oncall v0.5.13 | https://github.com/just-every/run-oncall/releases/tag/v0.5.13 | 2026-11-13T19:42:50Z |
| spool v0.7.10 | https://github.com/just-every/run-spool/releases/tag/v0.7.10 | 2026-11-13T21:16:22Z |

Lamp v1.11.14, Uptime v0.5.11 and Orbit v0.4.9 were freshly checked and kept at their existing eligible released versions. Draft Oncall v0.5.0 and Spool v0.7.0 release records were excluded. Full release metadata is releases.json; exact tagged commits are released-source-refs.json.

## Copy review and per-seed effects

`--copy-only --apply` records copy-source commit/ref/hashes, preserving public wording, brand and homepage observations. It never imports prose or implementation status. Both applies used `--only uptime,happytohelp,lamp,oncall,orbit,spool` so paused later seeds could not be modified.

- Initial copy-only apply: `Applied: 0 of 6 seeds changed.`
- Mechanical apply: `Applied: 3 of 6 seeds changed.` Each applied finding was one of the eligible version changes above.
- Post-version copy-only apply: `Applied: 3 of 6 seeds changed.` README.md and seed.json changed in HappyToHelp, Oncall and Spool; each tagged CONTRACT.md hash is unchanged across its version pair. All three contracts were also read at their new released commits.
- HappyToHelp: version and tagged provenance/hashes advanced. README changes cover portable contract checking, legacy import reservation/custody and history, ticket/mailbox guidance and release/upgrade details; no new contradiction of JE wording requiring an edit.
- Oncall: version and tagged provenance/hashes advanced. Source README/seed.json changes are the version reference only. OC-006 at CONTRACT.md line 145 and OC-012 at line 195 still keep paging off for release 1, consistent with JE.
- Spool: version and tagged provenance/hashes advanced. README changes are version references plus explicit local invitation guidance; no new claim contradiction. ERR-006 mismatch remains the existing D follow-up.
- Lamp: no data or state change.
- Uptime and Orbit: public data, copy, sources, brand and homepage unchanged; mechanical sync cleared their prior resolved source-copy finding markers from state. These markers are tool bookkeeping, not implementation status.
- Public claim edits: none. The full source-file patches are release-copy-diff.json. COPY-REVIEW.md records current promise ids against released CONTRACT heading/status row lines. Seed version declarations are seed.json line 4 at each new tagged commit; Oncall README line 34, HappyToHelp README Release section and Spool README release/version references agree.

## Withheld and preserved items

- New drift deliberately withheld: none. Full initial and final dry runs found no non-path drift, mark/colour/homepage follow-up or coming-soon/unreleased copy drift to import. The later-seed pause until 25 Nov remains in effect; their state/data were not changed.
- C follow-ups retained: Terrace trust wording; HappyToHelp eight partial-evidence promises; Uptime/Lamp partial-evidence promises.
- D follow-up retained: Spool ERR-006 mismatch.
- No RER inventory work performed; no JE version reduced to match RER. No other repository cloned or written; source reads used gh api.

## Validation

- npm ci: pass (726 packages).
- npm run listings: generated 49 seeds; npm run listings -- --check: `Listings current (49 seeds)`.
- Final full dry sync: `Dry run: 0 of 49 seeds changed.` Report records zero unreadable; no unexplained changes remain.
- npm run type-check, npm run lint and npm run build: all pass. No permanent tests added, full local suite run or checks weakened.
- Browser proof: HappyToHelp, Oncall and Spool captured once at 1440 and 390. At 1440, HTTP 200 plus visible Version and structured softwareVersion matched the independently observed release tags. Phone captures are proof only, without a second assertion suite. See browser-receipt.json and six browser/*.jpg files.
- Scope semantic checks: all other listing fields identical, exclusions absent, state changes limited to six-path scope, promoted CONTRACT hashes unchanged. See scope-receipt.json.
- git diff --check and credential-shaped added-value scan: pass. Candidate author and committer are Run Edit Run fleet <fleet@runeditrun.com>; all candidate messages inspected, no trailers.
- Repository Husky lint-staged hook ran successfully (eslint --fix/Prettier); fleet co-author cleanup remained active. No bypass.

## Resolved cloud setup issues and limits

- Initial sync capture lacked Playwright. Installed playwright-core@1.63.0 outside the product and linked only the ignored node_modules lookup; no dependency manifests changed. Required Chromium executable and --no-sandbox were used.
- The exact fleet hook symlinks exposed Husky’s relative h lookup. Added task-local Git hook dispatchers that execute original hooks at their absolute path, preserving actual Husky behavior and fleet commit-msg stripping. The retry committed successfully with hooks enabled.
- Browser’s first networkidle wait timed out on ongoing media activity. The successful proof waited for DOM content/fonts and took the target-page captures, retaining release-derived assertions. Browser was closed and only the recorded Next server PID was stopped.
- Plain Next production server warns about standalone output and has no Cloudflare caches binding for the pre-existing token snapshot endpoint. Target seed pages still returned 200 and the version checks passed; no unrelated code was changed.
- Mac publication scan is unavailable in this cloud by the task contract and remains a lane gate; no COMPLETE scan claim is made.

## PR and CI custody

Product head: `2ae43f9e53a68f2a998af6df95ed13e038c66c68`. Base: `ac2df380f2770a76aaee8a2dac8a1992554eb117`. Rebase check after fresh fetch reported branch up to date. Pushed through cloud-push.py on attempt 1; no force push, main push, merge or deploy. PR #54: https://github.com/just-every/home/pull/54.

The exact-SHA push Verify run is 43510379593: https://github.com/just-every/home/actions/runs/43510379593 . Discovery at 2026-11-13T21:24:40Z reported in_progress, with exact head 2ae43f9e53a68f2a998af6df95ed13e038c66c68. A single watcher made one follow-up REST call after the 300-second interval. At 2026-11-13T21:29:40Z, the exact-SHA Verify was completed/success. Three administration calls total: PR creation, CI discovery and final CI observation. No failed-job log calls or retries were needed; source-sync reads are separate required evidence reads.

## Evidence and cleanup

Complete selected non-secret reports/receipts and screenshots will be published only to refs/heads/evidence/je-sync-30 using cloud_evidence.py, with the exact EVIDENCE line returned separately. Evidence publication never signals acceptance or landing. Product checkout/head/index are not changed by report transport. After successful product/evidence custody checks the clone and node_modules are removed, preserving the packet outside the clone.

## Final candidate status

Verify run 43510379593: completed/success on exact SHA `2ae43f9e53a68f2a998af6df95ed13e038c66c68`. No product blocker. No clause statuses changed.

READY branch=cloud/je-sync-30 head=2ae43f9e53a68f2a998af6df95ed13e038c66c68
