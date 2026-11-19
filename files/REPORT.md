# Done: je-sync-50

Author: Run Edit Run fleet. Recorded: 2026-11-19T11:54:30Z.

Product: just-every/home, branch cloud/je-sync-50, full HEAD cfcfbd6d264fb5fc53689da63a3d0fa6943e4d0f.
PR: https://github.com/just-every/home/pull/76 — sync: seed listings 19 Nov (path release Spool v0.7.15).
Base: e6d3ce9aba21377e929bf8742c168dfe3279f731. Fresh shallow/blobless clone, local fleet hooks active; main freshly fetched and rebase confirmed up to date before the first push. Fleet guard published the only product commit on its first attempt. No default branch was pushed or merged.

## Plan and execution

PLAN.md records the complete seven-step plan before edits. Completed: read launcher/repository/sync rules; install pinned dependencies and hooks; dry sync the six path seeds; verify fresh GitHub Releases and live RER; record copy provenance; apply the eligible mechanical version update; re-record the newly listed source; generate and check listings; rerun dry sync; type-check, lint and production build; audit scope/identities/diff; commit, update from main, push and open PR; browser proof on the clean product HEAD; one exact-SHA CI observation; publish the separate packet and remove the successful clone/dependencies. Evidence custody does not replace product or landing gates.

## Actual dry-sync lines and changes

Before: `Dry run: 1 of 6 seeds changed.`
`Spool — version — newer tag v0.7.15 (page shows v0.7.14) [to apply]`.
No unreadable source or homepage. No mark, colour, status, homepage, still or wording change was proposed.

Copy-only before: `Applied: 0 of 6 seeds changed.` The flag records source provenance only. Mechanical apply: `Applied: 1 of 6 seeds changed.` Spool version applied. Copy-only after the bump: `README.md, seed.json changed since the last sync [reported]`; provenance advanced to the reviewed released tag. Public wording stayed identical.

After: `Dry run: 0 of 6 seeds changed.` Two previously open findings remain: Uptime and Oncall have no detectable alternative-to homepage line. Nothing unexplained remains. All successful tool reports and complete terminal transcripts are in this packet.

## Released sources and per-seed diff

| Seed | Before → after | Released copy source commit | Result |
| --- | --- | --- | --- |
| HappyToHelp | v0.4.31 → v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | No product or provenance change |
| Lamp | v1.11.23 → v1.11.23 | 199a635758939ab54b12f3a76dabeee68ab74b8f | No public change; tool removed one stale open-finding key |
| Uptime | v0.5.17 → v0.5.17 | 359b1bb93606ccfe5dc0120d2cdce78e8df67f6a | No public change; known homepage finding remains |
| Oncall | v0.5.19 → v0.5.19 | 518317b385c4535599bfc670dd676da46069b451 | No public change; one stale open key removed, homepage finding remains |
| Orbit | v0.4.11 → v0.4.11 | a4fcbfcd72fa4253826f43d0b0de02275094f86d | No product or provenance change |
| Spool | v0.7.14 → v0.7.15 | bb2efcd34837cd6067d02ce176609d3fc636dad2 | Listed version/feed and reviewed copy provenance updated |

Spool v0.7.15 Release: https://github.com/just-every/run-spool/releases/tag/v0.7.15, published 2026-11-19T10:28:00Z. Fresh metadata says non-draft and non-prerelease and lists rer-release.dsse.json. This establishes envelope-asset presence only; signature verification was not performed or claimed. Other path releases are unchanged. Release receipts and full source refs are selected separately in the packet.

Public diff: src/data/seed-pages.ts:1100 and public/data/listings.json:866 change only Spool's version, plus the generated feed timestamp. scripts/seeds-sync/state.json records source commit/ref/tag and README/seed hashes, removes obsolete Lamp/Oncall finding keys and remembers the reviewed copy finding. Source contract hash is unchanged. Only these three declared paths changed. No sync implementation, tests, assets, gallery, unrelated prose or generated contract views were changed.

Released copy review: CONTRACT.md is unchanged across Spool v0.7.14...v0.7.15. README setup instructions and seed.json version are the only changed copy inputs. They do not falsify JE's existing claims, so no claim wording was edited. SOURCE-REVIEW.md names the actual file/hunk rows and retains all standing partial-evidence and ERR-006 follow-ups. Clause status changes: none.

## Counts, holds and drift

Before and after: 49 listings; 35 released; 14 coming soon. DIFF-RECEIPT.json verifies that Spool's version is the only changed public field. Assisted US$10/month and Managed US$100/month presentation is preserved, with no GST or billing-country change.

Withheld deliberately: existing Uptime and Oncall replacements because their homepage alternative-to line is absent; later-seed source/copy updates under the six-path pause until 25 November; unreleased/coming-soon copy. No eligible six-path published Release was withheld. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No new art or gallery capture was imported.

Live RER still advertised Spool 0.7.14 at the fresh read, using id errors-workbench. Matching by repository URL found it correctly; its static generatedAt stamp was not treated as version evidence. The other five matched. JE advances to published 0.7.15 without a downgrade; gr owns the RER pin/deploy follow-up. Actual matched versions and read time are in RER-DRIFT.json.

## Checks and CI

Passed: npm ci (npm 10.9.3), npm run listings, npm run listings -- --check (49), final six-path dry sync, npm run type-check, npm run lint, npm run build (61 pages), git diff --check, path/semantic diff audit and credential-shaped-added-value check. No test was added, removed or weakened; CI owns the full suite. Repository pre-commit hooks ran eslint/prettier and the committed tree is clean. All candidate authors/committers and complete messages/trailers, including side parents, passed the fleet identity audit before push.

Browser: clean HEAD cfcfbd6d264fb5fc53689da63a3d0fa6943e4d0f, actual production build; /spool and listing JSON HTTP 200; public version/count assertions at 1440; changed screen captured once at 1440 and 390. Both widths show v0.7.15, no horizontal overflow. BROWSER-RECEIPT.json and two screenshots retain the proof. Browsers closed and only the recorded own Next PID stopped. TOOLCHAIN-RECOVERY.md records the recovered missing Playwright and the local preview's unavailable Cloudflare analytics/token bindings; none affects the version proof.

One CI observation for exact HEAD cfcfbd6d264fb5fc53689da63a3d0fa6943e4d0f: Verify branch push run 44518479316 completed/success, https://github.com/just-every/home/actions/runs/44518479316. The PR duplicate run 44518490019 completed/skipped by workflow design. Code scanning run 44518484825 completed/success. No other SHA's CI was used, no run was rerun or dispatched, and no short polling occurred. CI-DISCOVERY.json and CI-RECEIPT.json are the actual selected observations.

## Custody and remaining gates

No product blocker. The lane retains its independent non-builder gate, Mac publication scan, PR merge, deployment and live 1440/390 proof. This candidate was not merged or deployed. Report/receipt files go only to evidence/je-sync-50, attached as a child of the already advertised product HEAD. Product branch/index/HEAD remain untouched by evidence publication. The complete actual packet stays outside the product clone. Delete the successful clone and node_modules after evidence transfer; preserve the packet and terminal product provenance.
