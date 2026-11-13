# Done: je-sync-28 candidate

Repository: just-every/home. Branch: `cloud/je-sync-28`. Full product SHA: `181ca0a1b0d41af1dc4b9566412fc64f11267787`. Base: `42d2b3bfd372f151c993e36128249d7e059091de`. PR: https://github.com/just-every/home/pull/52.

Exact-SHA Verify branch run: 43433866088; status completed; conclusion success. https://github.com/just-every/home/actions/runs/43433866088

## Outcome

Spool is the only public listing change: v0.7.8 → v0.7.9 in src/data/seed-pages.ts:1100 and public/data/listings.json. The generated listing timestamp and scripts/seeds-sync/state.json accompany it. No public copy, mark, colour, homepage, still, gallery, price, or released/coming-soon status changed. No contract implementation status was changed or promoted.

Counts before → after: 49 → 49 listings; 35 → 35 released; 14 → 14 coming soon. Eight excluded seeds remain absent: Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen. The brand.json SHA-256 remains a54bb68daa5f1590e5a6eaafecf38c627e42fa014f65c0d7efaf81bee809b7a4. Pricing presentation is untouched by this three-file diff; the accepted Assisted US$10/month and Managed US$100/month remain the instructed policy.

## Plan and execution

1. Configure fleet Git identity, refresh the authorized launcher bundle, install credential/push helpers and commit hooks. Clone only just-every/home shallowly from main and read its AGENTS.md and seeds-sync implementation before installing dependencies.
2. Run the committed seeds-sync dry run across all 49 visible seeds. Read other repositories through gh api only; a task-local Git adapter translates the sync tool's cross-repository ls-remote reads to GitHub ref/commit API results, caching that fresh task snapshot outside the checkout. No sync implementation changes.
3. Read GitHub Releases freshly for all listed seeds. Require a non-draft, non-prerelease Release with rer-release.dsse.json before importing any newer version; report asset presence separately from cryptographic verification.
4. Apply copy-only provenance, review source drift and the named existing copy follow-ups against tagged source, preserving true wording and all contract statuses. Record unreleased drift without publishing its copy.
5. Apply the mechanical sync, inspect its actual mark/colour/status/homepage output and retain only eligible scoped changes. Generate/check listings and repeat the dry run. Explain every retained open finding.
6. Run type-check, lint and production build sequentially, check scoped diff hygiene, and capture any changed screen at 1440 and 390 with a meaningful assertion at one width.
7. Fetch/rebase current main before the first product push, commit with explicit fleet author/committer environment and active hooks, audit all candidate identities/messages, and publish only cloud/je-sync-28 with the fleet push guard. Open the requested PR and observe exact-SHA Verify through REST with the prescribed interval and budget.
8. Write complete non-secret reports and actual receipts here, explicitly publish them only to evidence/je-sync-28, preserve pushed provenance and remove the disposable product checkout/node_modules after evidence publication. Relay the lane POST and terminal custody line.

## Actual sync observations

```text
npm ci: added 726 packages; exit 0
Initial dry attempt: source refs resolved; Playwright missing; no changes applied
Dry run: 1 of 49 seeds changed.
Spool: version newer tag v0.7.9 (page shows v0.7.8) [to apply]
Copy-only apply: 0 of 49 seeds changed.
Mechanical apply: 1 of 49 seeds changed.
Spool: version newer tag v0.7.9 (page shows v0.7.8) [applied]
Copy-only apply after version advance: Spool README.md, seed.json changed [reported]
Listings generated (49 seeds)
Listings current (49 seeds)
Final dry run: 0 of 49 seeds changed.
```

All 49 repositories and all 49 homepages were readable in each completed full sync. The final dry report has zero findings, including repeated findings, and zero unreadable sources. There were no mark/colour/status/homepage follow-ups in the tool output to import or withhold; no redesign or new gallery capture was undertaken. The standard homepage observations are retained in the tool reports/captures.

## Released-source eligibility

A fresh batched GitHub Releases read over all 49 listed repositories found only Spool newer than the displayed versions. Eligible Release: https://github.com/just-every/run-spool/releases/tag/v0.7.9, published 2026-11-13T12:35:45Z; non-draft, non-prerelease. The assets include rer-release.dsse.json. Envelope-asset presence was confirmed; cryptographic signature verification was not performed. This is an already released seed version advance, not a coming-soon promotion.

Old Spool tag v0.7.8 → commit 47ecaeeec8c442aa4648ad3b7f4fc1d7e1f115e2. New tag v0.7.9 → commit 8049c9153f1d987bba6211bc05b8405b06101a6f. CONTRACT.md is byte-identical. README.md and seed.json differences are captured in the exact diff files and reviewed in COPY-REVIEW.md. No changed released-source statement proves a JE public sentence false, so all wording stays. Source files and row references are included in COPY-REVIEW.md.

The final state updates the Spool tagged source ref/commit and README/seed hashes. The tool removes HappyToHelp’s previously open copy-source finding after its prior update was seen, and records the newly reviewed Spool copy finding; these are sync provenance, not implementation judgments.

## Per-seed results and final copy provenance

| Seed | Kind | Initial proposal / resulting change | Final source ref | Commit |
| --- | --- | --- | --- | --- |
| uptime | released | none | v0.5.10 | bd7b21317cae0ae0082fa88127cef6842c377504 |
| happytohelp | released | cleared prior seen copy finding; no public change | v0.4.24 | 6acf8a4c50dfeb94ca9ab705b1e386d282ea8e0f |
| nook | released | none | v0.5.0 | 7fc9516570502e9066b7f3a16d08ad63610d608e |
| lamp | released | none | v1.11.14 | 733e2ce1e2fc618183a93632218bb86456a06a79 |
| cradle | released | none | v0.4.0 | 6422d6fa21bb215167d9335d41e02b862bb7ad65 |
| vector | released | none | v0.4.1 | 3c1e3de9f338b79206be339f7b594ed55e62c934 |
| slate | released | none | v0.4.0 | 635df53b1d055f31998b7a5dd448ce467dab07d2 |
| pencil | released | none | v0.7.0 | 97a985113cfadb9b7edaa8171bac9f5bd31718cb |
| orbit | released | none | v0.4.8 | 0e9e55cf150dfcc781d1d9e62b2d88c15c9b6a63 |
| mango | released | none | v0.4.0 | b40be01dcfcf8d793a92780252859eeccdaeb754 |
| dial | released | none | v0.5.0 | da9f7f3c8b60b1b1935de0a4c7384a5cad1256ac |
| penny | released | none | v0.2.1 | 4befdc40491a1a2f0ce66a77cb67ca5c49a31135 |
| oncall | released | none | v0.5.11 | 457a0a194a0dc97f653cdc12224cae27b6f1a79f |
| spool | released | version v0.7.8 → v0.7.9; README/seed provenance only | v0.7.9 | 8049c9153f1d987bba6211bc05b8405b06101a6f |
| balm | released | none | v0.1.4 | fc2451647ed0263ae50bd8d3536038a9a5c379c0 |
| beam | released | none | v0.1.0 | 3278cad69eab0cf0a591ddf993f6549fbc4097c4 |
| cabin | released | none | v0.1.0 | 37464b4468f5967f381951737d3c3cba46a736fe |
| chest | released | none | v0.2.0 | 219ca4f53eed1448409e979823eac80ad8a24400 |
| coaster | released | none | v0.1.0 | 568ad6d10bdf64f7a1f40a3ff2bbf3e16785fb51 |
| coffer | released | none | v0.1.0 | 87b6d2c62e187385f72debfc5c9bbd3e3d1df458 |
| easel | released | none | v0.1.0 | 82c03999852d81ca96e04c50b87ee81adb2abeb2 |
| gasket | released | none | v0.1.0 | 33769933eaf2bafeb75c80eb2093b1400d282bc5 |
| gauge | released | none | v0.1.0 | cf3745f66aff3b27a4111e30b7cf59824395b4cd |
| glove | released | none | v0.1.0 | a9086f381d9c15af4aec26baafcb6aba619a374d |
| larder | released | none | v0.1.3 | 10758c4295dec89b655e30ef8e26fa4f472e223d |
| locket | released | none | v0.1.3 | b16525ec322de963fa48e6f4aafd78790ff58b41 |
| lodge | released | none | v0.1.0 | 5d58f08b12819305f62e0e617edb1398b07654ca |
| nectar | released | none | v0.1.0 | 59215a083b5f8a1248b1ab53c4c3ea4e51aa110b |
| pantry | released | none | v0.2.8 | b24aaab5aac7e4cd3b83ef39d93a07e8325b6a8e |
| pier | released | none | v0.1.0 | 67c944bf027977ad161aa209e1ff22b0afa9e812 |
| purse | released | none | v0.1.1 | bab2cbe475ea23bd4831a71b441a6fb2b0d2cbdf |
| willow | released | none | v0.1.0 | def0450eb8de870eed4b41fbe3ebdfdb35e6166f |
| buoy | released | none | v0.1.3 | e85c5fa796ccd03ba45e6bea5d5fd3b65b27d471 |
| lanyard | released | none | v0.1.3 | db2a1ef37612248290e0efd85209c9b1f0da8c83 |
| terrace | released | none | v0.1.4 | 0afcac8b3a42c23d984078e6ff90e928c9ebc22f |
| auth | soon | none | HEAD | d55816c1f0e6b66f12d0c2846fdba6cf22965251 |
| blotter | soon | none | HEAD | 4e18475e9bfd57e90da8141a1d6de13efa3f2231 |
| crank | soon | none | HEAD | 4c92d9469bda9d3e1a21bc03f4c7f9d20f97c047 |
| evidence | soon | none | HEAD | 2a064b4ce1e9e30350a6ea887ff8e4d057f4ef8d |
| inkwell | soon | none | HEAD | e4e3c2dd4bdf48fe16111f9d447568d6c4366a84 |
| mallet | soon | none | HEAD | 095576e8bfe68bf364228679ff6bd34176a89907 |
| pane | soon | none | HEAD | 16501ad7d10c5af6f04799aa44c700249a41e9b4 |
| placemat | soon | none | HEAD | 6232d682d8356f2eb0f2d9e58b4e44bba51fd9cd |
| platter | soon | none | HEAD | 85dee737177a6559448a012b2b6e22cad05f5e1a |
| plinth | soon | none | HEAD | 1fd27e714032ffb16b4682e9409671bd272d0f11 |
| satchel | soon | none | HEAD | 2e07928ffcf1061422b85ce066b54dbe08e1e6c3 |
| stall | soon | none | HEAD | 8ee1f25df4f0b10b9a62e7fe221453499f27b297 |
| strap | soon | none | HEAD | 008fef24f74b44bdb2aaf0fd95dcf50c45ceea7c |
| vane | soon | none | HEAD | a2638146dc0faaefe358d203ac940389183151ef |

## Deliberately retained boundaries

- No eligible tool proposal was withheld. Auth remains coming soon under its standing owner override; a tag grants no release-status promotion. Coming-soon copy-only sync found no new drift and no unreleased copy was imported.
- Terrace’s accepted summary/does wording is retained. Its released contract describes a balanced ledger and reconciliation as done, while complete owner statements remain partial; older README exclusions are recorded in COPY-REVIEW.md. No separate wording round or contract judgment change was made.
- The eight named HappyToHelp partial clauses, Uptime STATE-001/NETWORK-001, and the eight named Lamp partial clauses remain unchanged. Exact released rows and statuses are recorded in COPY-REVIEW.md. Partial evidence alone was not treated as proof a claim is false.
- The eight excluded seeds stay absent. No galleries were imported; committed gallery custody remains with gr. No work was done on RER or another repository, and no RER lag was used to downgrade JE versions.

## Validation

- `npm run type-check`: exit 0 (2026-11-13T13:24:37.847045+00:00 to 2026-11-13T13:24:44.243299+00:00).
- `npm run lint`: exit 0 (2026-11-13T13:24:44.243616+00:00 to 2026-11-13T13:24:48.118423+00:00).
- `npm run build`: exit 0 (2026-11-13T13:24:48.119115+00:00 to 2026-11-13T13:25:22.738963+00:00).
- `npm run listings` and `npm run listings -- --check`: passed, 49 seeds.
- Committed sync final dry run: zero unexplained drift; 0/49 seeds changed; zero unreadable.
- Diff whitespace, declared write scope, credential-shape scan, and every candidate author/committer/message check passed. Exactly one product commit; fleet identity on both author and committer, no trailers.
- Production browser proof: at 1440, HTTP 200, visible Version v0.7.9, public JSON v0.7.9, and 49/35 counts asserted. Changed page captured exactly once at 1440 and once at 390, both inspected. The first proof attempt waited for network idle and timed out before taking any image; the retry waited for document/load/fonts while allowing media traffic and passed. No product changes were made for that recovery.
- No permanent tests were added and no local full suite was run. Existing CI retains its full prescribed workflow. All browsers and the owned production server were closed.

## Publication and custody

Product push succeeded on the first guarded attempt: `181ca0a1b0d41af1dc4b9566412fc64f11267787` to cloud/je-sync-28. Current main was fetched, and the unpublished candidate was rebased before first push (already up to date). No published history was rewritten. PR #52 targets main, using the title requested by the brief. No merge or deploy was performed.

The provided fleet forwarding symlinks were incompatible with Husky’s relative h loader. Before any successful commit they were replaced, inside .git only, with forwarding executables that exec the same original hook paths. The fleet commit-msg cleanup remained active, and the repository’s lint-staged ESLint/Prettier hook ran successfully. No hook was skipped or disabled.

Reports and receipts are selected explicitly as regular non-symlink files under this packet and published only to refs/heads/evidence/je-sync-28. Evidence publication is separate from product READY/acceptance/landing. The independent lane gate, Mac publication scan, merge, deployment and live verification remain with the lane.

Blockers: none in the pushed candidate. Cryptographic envelope verification was not claimed. Initial missing Playwright, browser wait timeout and Husky path issues were recovered and are retained as actual receipts. The disposable product clone and node_modules will be removed after the evidence transfer is verified, as requested.

CI observation: completed / success on exact SHA 181ca0a1b0d41af1dc4b9566412fc64f11267787; run 43433866088. The REST watcher observes the 300-second minimum between discovery/polls. PR/CI calls and times are recorded separately; source reads use the committed sync tool plus two batched provenance GraphQL reads.
