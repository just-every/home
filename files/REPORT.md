# je-sync-24 result

Done: the scoped listing candidate is pushed and PR #48 is open. Product custody is **READY** from the exact-SHA CI result recorded below; no merge, deployment or landing was performed here.

- Repository: `just-every/home`
- Branch: `cloud/je-sync-24`
- Full head: `e971bef20b72603b026c871bc32a4d3fd6b45491`
- Product tree: `6ea81940081fce6d6692a95d28ed9213f3f7fb48`
- Fresh main base: `1bc79fecf2ded7323c7047836f1046398cd0ef21`; fetched and rebased with autostash before the first product commit/push. Main was unchanged at that read.
- PR: https://github.com/just-every/home/pull/48
- Verify: run `43317092344`, `completed` / `success` at exact head `e971bef20b72603b026c871bc32a4d3fd6b45491`. URL: https://github.com/just-every/home/actions/runs/43317092344
- Listings before → after: **49 → 49 total; 35 → 35 released; 14 → 14 coming soon**.
- Clause implementation status changes: **none**. Public prose edits: **none**.

## Plan and execution

The complete plan is in PLAN.md. All seven required sync/validation stages were completed: initial dry review; copy-only provenance apply; independent Release eligibility review; mechanical apply; post-version tagged-copy refresh; listings generation/check and final dry run; local checks/browser proof and publication. Reports, receipts and images live outside the product checkout. Evidence transport is separate from product READY, acceptance and landing.

The launcher and repository AGENTS.md were read. Fleet identity was configured globally and in the new shallow filtered clone. The decrypted-bundle helper and push guard were installed, and the fleet co-author hook stayed active. The supplied hook's direct symlink could not resolve Husky's relative `h` entrypoint on the first commit attempt; a clone-local `h` compatibility file re-entered the original hook by its actual path. The retry visibly ran the repository's lint-staged ESLint/Prettier hook; no hook was bypassed. No product implementation was changed for this environment issue.

Source code and refs in other repositories were read only through `gh api`. A task-side wrapper adapted seeds-sync's `git ls-remote` calls to GitHub commit/ref APIs, including annotated-tag peeling. It did not clone another repository or edit the committed sync implementation. Ref caches were isolated per invocation; the final full run used fresh reads.

## Exact dry/apply observations

- Initial full dry: `Dry run: 1 of 49 seeds changed.` / `Uptime: version newer tag v0.5.9 (page shows v0.5.8) [to apply]`. All 49 repositories and homepages were readable.
- Initial `--copy-only --apply`: `Applied: 0 of 49 seeds changed.` That flag records source provenance and preserves public wording, brand and homepage data.
- Full `--apply`: `Applied: 1 of 49 seeds changed.` / `Uptime: version newer tag v0.5.9 (page shows v0.5.8) [applied]`.
- Post-version `--copy-only --apply`: `Applied: 1 of 49 seeds changed.` / `Uptime: copy CONTRACT.md, README.md, seed.json changed since the last sync [reported]`. Recorded the newly displayed release's sources after reviewing their exact tag-to-tag diff.
- Listings: `Listings generated (49 seeds)` and `Listings current (49 seeds)`.
- Final full dry: `Dry run: 0 of 49 seeds changed.` All 49 sources/homepages readable; no findings or unexplained remaining change.

The actual initial/final terminal logs, Markdown reports and JSON reports are included. Every source ref/commit is listed below and in the reports.

## Release eligibility and copy provenance

The only proposed newer version was **Uptime v0.5.9**. Release: https://github.com/just-every/run-uptime/releases/tag/v0.5.9, tag `v0.5.9`, published `2026-11-12T18:01:29Z`, draft `False`, prerelease `False`. Its asset list includes `rer-release.dsse.json` (3361 bytes, GitHub asset digest `sha256:d82d277f5d0810841a9e08ecfefee57959847ba4a29ae3702a0952a6cb7ec67a`). This establishes **envelope-asset presence only; no cryptographic signature verification was performed**. A bare tag was not used as eligibility.

Uptime copy boundary advances from `v0.5.8` / `ed5429192d18503c4c8caa8d797d82ffdcc78f54` to `v0.5.9` / `88c586f6fabdaed6768ddc8072af2340310a7ace`. `uptime-released-copy-diff.json` records the exact source diff. At the new release, CONTRACT.md:235 adds missing/malformed RER mail API-key startup refusal and CONTRACT.md:243 adds bounded conditional relay-URL evidence with qualification still pending. README.md:36 and seed.json:4 record the version. These changes do not require an edit to the existing JE summary, does or promises. State records all three new hashes and the actual release ref/commit.

## Per-seed product diff

Only these three allowed paths changed:

- `src/data/seed-pages.ts:119`: Uptime `v0.5.8` → `v0.5.9`.
- `public/data/listings.json:950`: Uptime `v0.5.8` → `v0.5.9`; generatedAt refreshed. No listing was added/removed, and no released-status value changed.
- `scripts/seeds-sync/state.json`: sync timestamp refreshed; Uptime release ref/tag/commit and three copy-file hashes updated; the new tagged copy finding recorded. The standard full apply cleared stale copy-finding markers for Lamp, Oncall, Orbit and Spool after their already displayed sources had been reviewed. This is sync provenance housekeeping, not clause promotion.

All other seed records and all public words, marks, colours, homepage stills and galleries remain unchanged. The actual diff is in product.diff and the before/after state keys are in RECEIPT.json. No source lock or generated contract view exists in this repository's task scope, and no contract was edited.

## Withheld items and standing follow-ups

No eligible drift was deliberately withheld. The actual tool output proposed no mark, colour, homepage or status update and no new manual art follow-up. No hand redraw, new logo, redesign or gallery capture/import was undertaken. No coming-soon copy drift was reported, and no unreleased copy was imported. Auth remains coming soon under the existing owner override. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain excluded and absent from all 49 public listings.

The supplied non-blocking copy follow-ups remain open. copy-review.md records the exact released CONTRACT.md row citations for Uptime STATE-001/NETWORK-001, all eight HappyToHelp clauses and all eight Lamp clauses. Partial/unasserted evidence was not converted to a status promotion or treated as proof that every sentence is false. HappyToHelp's policy/budget qualification remains explicitly unresolved. Terrace's v0.1.4 ACCT-006 row 551 is done with native matching/sign-off evidence, despite older contradictory README/capacity prose; that older prose was not allowed to override the newer specific judgment. Its accepted reconciliation copy was retained. No wording round was invented.

RER was neither edited nor asked to do new work; no JE version was downgraded from its known lagging inventory. Accepted pricing presentation remains untouched: Assisted US$10/month and Managed US$100/month, with no GST wording or billing-country restriction added.

## Validation and browser proof

Passed: npm ci; all required sync invocations; listings generation and `--check`; `npm run type-check`; `npm run lint`; `npm run build`; diff/scope/credential-shaped-value checks; all candidate author/committer/trailer checks including side parents. The repository's commit hook ran ESLint/Prettier successfully, left the same product diff and a clean tree, and the first real commit was immediately pushed through cloud-push.py on its first attempt. No permanent test or weakened check was added. The existing Verify workflow retains its full CI checks.

Candidate browser proof used the production build served on loopback, Chromium `/usr/bin/chromium --no-sandbox`, and the cloud subreaper. At 1440 it asserted HTTP 200, Uptime heading, version v0.5.9, no overflow/hydration/page errors, 49 listings/35 released and all eight exclusions. At 390 it captured the same changed page without a second assertion pass. Both full-page images were visually inspected. See browser-proof.json, browser-proof.log, uptime-1440.png and uptime-390.png.

The first browser attempt timed out at `networkidle`, not a version assertion. The local DB was migrated using the repository's documented command and the retry captured at page load/fonts ready. Initial and successful logs are retained. Local Next start reports its existing standalone warning and a token-snapshot fallback because the Node server lacks the Worker Cache API; production Worker live behavior was not claimed. This browser proof covers the changed static listing/page. External HTTPS requests were blocked for the local proof, so it is not a claim of third-party service or live media verification. Both recorded server PIDs were stopped and both browsers closed.

## CI, product and evidence custody

The candidate is at `e971bef20b72603b026c871bc32a4d3fd6b45491`, PR #48. One CI watcher discovered run `43317092344` for that exact SHA and spaces subsequent run reads by at least 300 seconds, within the ten-call workflow budget. Latest terminal observation: `completed` / `success`; actual raw observation is in ci-observation.json when available, with initial discovery in ci-discovery.json. Product READY does not imply acceptance or landing. The lane retains the deciding gate, Mac publication scan, PR merge, deployment and live 1440/390 verification.

The complete selected report/receipt packet is published only to `refs/heads/evidence/je-sync-24` with cloud_evidence.py. Its exact transport head is returned separately in the final message. Evidence publication changes no product head/index and is not a READY signal. The disposable clone/node_modules are removed only after successful product and evidence custody. Actual packet files are retained at `$HOME/rer-consolidation/work/je-sync-24/packet/`.

Blockers: none for the scoped pushed candidate. No source was unreadable and no required tool remains failed. The supplied wording/qualification follow-ups are retained, not closed by this sync.

## Final source refs

| Seed | Kind | Ref | Commit | Boundary |
| --- | --- | --- | --- | --- |
| uptime | released | v0.5.9 | 88c586f6fabdaed6768ddc8072af2340310a7ace | released listing version |
| happytohelp | released | v0.4.22 | 4dee2432081a64cee0bd12c59a31cb84371c3ab3 | released listing version |
| nook | released | v0.5.0 | 7fc9516570502e9066b7f3a16d08ad63610d608e | released listing version |
| lamp | released | v1.11.13 | e82bc349b98af44c440efa2960927e327deda1a5 | released listing version |
| cradle | released | v0.4.0 | 6422d6fa21bb215167d9335d41e02b862bb7ad65 | released listing version |
| vector | released | v0.4.1 | 3c1e3de9f338b79206be339f7b594ed55e62c934 | released listing version |
| slate | released | v0.4.0 | 635df53b1d055f31998b7a5dd448ce467dab07d2 | released listing version |
| pencil | released | v0.7.0 | 97a985113cfadb9b7edaa8171bac9f5bd31718cb | released listing version |
| orbit | released | v0.4.7 | eab0faafccd2eb0945dddb7d0f52c30ce573c04c | released listing version |
| mango | released | v0.4.0 | b40be01dcfcf8d793a92780252859eeccdaeb754 | released listing version |
| dial | released | v0.5.0 | da9f7f3c8b60b1b1935de0a4c7384a5cad1256ac | released listing version |
| penny | released | v0.2.1 | 4befdc40491a1a2f0ce66a77cb67ca5c49a31135 | released listing version |
| oncall | released | v0.5.10 | 1dc0069324de17933e7b65bffefa14de7dabea9a | released listing version |
| spool | released | v0.7.8 | 47ecaeeec8c442aa4648ad3b7f4fc1d7e1f115e2 | released listing version |
| balm | released | v0.1.4 | fc2451647ed0263ae50bd8d3536038a9a5c379c0 | released listing version |
| beam | released | v0.1.0 | 3278cad69eab0cf0a591ddf993f6549fbc4097c4 | released listing version |
| cabin | released | v0.1.0 | 37464b4468f5967f381951737d3c3cba46a736fe | released listing version |
| chest | released | v0.2.0 | 219ca4f53eed1448409e979823eac80ad8a24400 | released listing version |
| coaster | released | v0.1.0 | 568ad6d10bdf64f7a1f40a3ff2bbf3e16785fb51 | released listing version |
| coffer | released | v0.1.0 | 87b6d2c62e187385f72debfc5c9bbd3e3d1df458 | released listing version |
| easel | released | v0.1.0 | 82c03999852d81ca96e04c50b87ee81adb2abeb2 | released listing version |
| gasket | released | v0.1.0 | 33769933eaf2bafeb75c80eb2093b1400d282bc5 | released listing version |
| gauge | released | v0.1.0 | cf3745f66aff3b27a4111e30b7cf59824395b4cd | released listing version |
| glove | released | v0.1.0 | a9086f381d9c15af4aec26baafcb6aba619a374d | released listing version |
| larder | released | v0.1.3 | 10758c4295dec89b655e30ef8e26fa4f472e223d | released listing version |
| locket | released | v0.1.3 | b16525ec322de963fa48e6f4aafd78790ff58b41 | released listing version |
| lodge | released | v0.1.0 | 5d58f08b12819305f62e0e617edb1398b07654ca | released listing version |
| nectar | released | v0.1.0 | 59215a083b5f8a1248b1ab53c4c3ea4e51aa110b | released listing version |
| pantry | released | v0.2.8 | b24aaab5aac7e4cd3b83ef39d93a07e8325b6a8e | released listing version |
| pier | released | v0.1.0 | 67c944bf027977ad161aa209e1ff22b0afa9e812 | released listing version |
| purse | released | v0.1.1 | bab2cbe475ea23bd4831a71b441a6fb2b0d2cbdf | released listing version |
| willow | released | v0.1.0 | def0450eb8de870eed4b41fbe3ebdfdb35e6166f | released listing version |
| buoy | released | v0.1.3 | e85c5fa796ccd03ba45e6bea5d5fd3b65b27d471 | released listing version |
| lanyard | released | v0.1.3 | db2a1ef37612248290e0efd85209c9b1f0da8c83 | released listing version |
| terrace | released | v0.1.4 | 0afcac8b3a42c23d984078e6ff90e928c9ebc22f | released listing version |
| auth | soon | HEAD | d55816c1f0e6b66f12d0c2846fdba6cf22965251 | coming-soon seed |
| blotter | soon | HEAD | 4e18475e9bfd57e90da8141a1d6de13efa3f2231 | coming-soon seed; no release tag |
| crank | soon | HEAD | 4c92d9469bda9d3e1a21bc03f4c7f9d20f97c047 | coming-soon seed; no release tag |
| evidence | soon | HEAD | 2a064b4ce1e9e30350a6ea887ff8e4d057f4ef8d | coming-soon seed; no release tag |
| inkwell | soon | HEAD | e4e3c2dd4bdf48fe16111f9d447568d6c4366a84 | coming-soon seed; no release tag |
| mallet | soon | HEAD | 095576e8bfe68bf364228679ff6bd34176a89907 | coming-soon seed; no release tag |
| pane | soon | HEAD | 16501ad7d10c5af6f04799aa44c700249a41e9b4 | coming-soon seed; no release tag |
| placemat | soon | HEAD | 6232d682d8356f2eb0f2d9e58b4e44bba51fd9cd | coming-soon seed; no release tag |
| platter | soon | HEAD | 85dee737177a6559448a012b2b6e22cad05f5e1a | coming-soon seed; no release tag |
| plinth | soon | HEAD | 1fd27e714032ffb16b4682e9409671bd272d0f11 | coming-soon seed; no release tag |
| satchel | soon | HEAD | 2e07928ffcf1061422b85ce066b54dbe08e1e6c3 | coming-soon seed; no release tag |
| stall | soon | HEAD | 8ee1f25df4f0b10b9a62e7fe221453499f27b297 | coming-soon seed; no release tag |
| strap | soon | HEAD | 008fef24f74b44bdb2aaf0fd95dcf50c45ceea7c | coming-soon seed; no release tag |
| vane | soon | HEAD | a2638146dc0faaefe358d203ac940389183151ef | coming-soon seed; no release tag |
