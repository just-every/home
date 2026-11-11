# Done: je-sync-19 candidate

Product repository: just-every/home. Branch: cloud/je-sync-19. Full SHA: `47e7f9a6c01147c49c6c39403db3bdd9442ad045`.
PR: https://github.com/just-every/home/pull/43 — sync: seed listings 11 Nov (2).
Fresh shallow main and pre-push fetched main: `464302fb78beebdfb13de67529124fb5602d88e8`. The explicit pre-push rebase reported the branch up to date. Only cloud/je-sync-19 was pushed, first attempt succeeded. No default-branch push, merge, deployment or provider operation was performed.

## Product result

- Lamp: v1.11.10 → v1.11.11. Release source commit 9bbe26c4fe8cd806fb1d25e23412f2f6b198028c.
- HappyToHelp: v0.4.20 → v0.4.21. Release source commit 51492e5d3cbaa94b42df1bef063fb00131038a19.
- Three changed paths: src/data/seed-pages.ts, public/data/listings.json, scripts/seeds-sync/state.json. Only the two page/listing version fields, generated timestamps and sync provenance/open-finding bookkeeping changed.
- State records the new source refs/commits and README.md/seed.json hashes. CONTRACT.md hashes are unchanged. Its full apply clears stale copy-finding keys for Oncall and Uptime; copy-only refresh records the reviewed new README/seed findings for Lamp and HappyToHelp. These are source-observation bookkeeping, not implementation or claim judgments.
- Counts before → after: 49 → 49 listings, 35 → 35 released, 14 → 14 coming soon. Released-status promotions: none.
- Public wording edits: none. Contract clause status changes: none. No galleries, logos, styles, colours, homepages or stills changed.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Auth stays coming soon. Assisted US$10/month and Managed US$100/month presentation is preserved; no pricing file changed.
- public/brand.json SHA-256 remains a54bb68daa5f1590e5a6eaafecf38c627e42fa014f65c0d7efaf81bee809b7a4. RER inventory/version gaps were not imported or worked on.

## Every dry-run proposal and release authority

First full dry run: `Dry run: 2 of 49 seeds changed.`
```text
HappyToHelp
  version   newer tag v0.4.21 (page shows v0.4.20) [to apply]
Lamp
  version   newer tag v1.11.11 (page shows v1.11.10) [to apply]
```

No mark, colour, status, homepage, still, share-image or copy proposal was present, including repeated/manual follow-ups. Every source and homepage was readable. No redesign or separate seed capture campaign was initiated: only the committed sync tool’s existing homepage observation ran.

- lamp: v1.11.11, https://github.com/just-every/run-lamp/releases/tag/v1.11.11; published 2026-11-11T15:38:16Z; draft=false, prerelease=false; asset rer-release.dsse.json present (3157 bytes, GitHub metadata digest sha256:f1b5ac4b7afc810f614a3b1710e5af43b8b12ec775bc7e1bb51d4c2ae523ca52).
- happytohelp: v0.4.21, https://github.com/just-every/run-happytohelp/releases/tag/v0.4.21; published 2026-11-11T16:22:35Z; draft=false, prerelease=false; asset rer-release.dsse.json present (3061 bytes, GitHub metadata digest sha256:c1e0e90bdc39c75a55f3b7fbbcfad53d96fa2408f70f5a4bb4ecebe5c039fba4).

This satisfies the standing release-presence rule. Envelope signatures were not cryptographically verified, and this report makes no signature-verification claim. No bare tag authorized a promotion.

## Copy and deliberate withholding

Initial `npm run seeds:sync -- --copy-only --apply` reports 0 of 49 changed and records provenance only. It reads released copy at the displayed listing tag and coming-soon copy at HEAD; it cannot rewrite public claims or artwork. Full apply then updates the two eligible versions. A second copy-only apply refreshes provenance at their new displayed release tags and reports README.md/seed.json changes for review, without importing text.

Lamp’s changes are local-start/PATH instructions, rer 0.2.108 and version metadata. HappyToHelp’s release notes narrow owner reset authority for multi-workspace accounts, document an existing roster erasure corner, and require no new migration. Existing JE wording claims neither unrestricted owner resets nor a fixed roster corner. Neither release changes CONTRACT.md. No released source proves a JE claim false, so all public wording is retained. Exact file/row review and known partial judgments are in COPY-REVIEW.md, with GitHub comparisons retained as lamp-copy-diff.json and happytohelp-copy-diff.json.

Withheld items: no eligible mechanical drift was withheld. Existing Terrace cent-reconciliation wording, Uptime STATE-001/NETWORK-001 and the eight named Lamp and eight named HappyToHelp partial-evidence promises remain open follow-ups under the brief’s no-wording-round rule. They are not requalified or promoted. No coming-soon/unreleased copy drift appeared; none was imported. Existing art/status follow-ups produced no actual findings this round. No gallery capture lacking committed provenance was ingested.

Final full dry run: `Dry run: 0 of 49 seeds changed.` All 49 are readable and have zero findings. No unexplained change remains. The complete reports preserve every source ref and commit.

## Validation and limitations

- npm ci: pass (726 packages); repository husky prepare ran. Playwright-core 1.63.0 was provisioned outside the product files and linked under ignored node_modules for the documented system Chromium path.
- npm run listings: pass; npm run listings -- --check: pass (49 seeds).
- npm run type-check: pass; npm run lint: pass; npm run build: pass. Actual timestamps and exit codes are in checks-receipt.json and complete logs are selected into the evidence packet.
- Desktop assertions at 1440: both changed pages return HTTP 200, contain the exact new version once, have a title, and have no horizontal overflow. Browser proof of each page was captured once at 1440 and 390 and visually inspected. browser-receipt.json names the four screenshots. No permanent tests, full local suite, mock application routes or weakened checks were introduced.
- First browser setup lacked Playwright; installing the documented dependency fixed it. The initial candidate navigation’s network-idle wait timed out; using the configured HTTPS proxy for browser assets and waiting for DOM content/fonts produced the successful captures. The failed attempt log is retained.
- Local Next production preview emits existing platform warnings: the Cloudflare cache API is absent for /api/tokens and the unmigrated local D1 page_views table is absent for /api/events. The two page documents and version assertions pass. No provider setup, database migration, application change or API substitute was used to conceal these preview limitations. Existing reels show their static posters/loading indicator; playback was not qualified.
- Product diff passes whitespace, path-scope and credential-shape checks. The repository hook ran lint-staged/ESLint/Prettier. Fleet hook symlinks required a Git-local Husky helper bridge to preserve Husky’s sibling-helper lookup; hooks were kept enabled. The committed diff equals the validated diff.
- Every candidate commit author and committer is Run Edit Run fleet <fleet@runeditrun.com>; no trailers or OpenAI/Codex co-author lines. The required all-parent origin/main..HEAD inspection was performed immediately before the guarded product push.
- No product blocker. Independent lane gating, publication scan, landing hold, PR merge, deployment and live-site 1440/390 verification remain with the lane. Builder evidence is separate from product READY/custody.

## Exact-SHA CI observation

```json
{
  "observedAt": "2026-11-11T16:53:14.692687+00:00",
  "method": "GitHub REST exact-run poll after at least 300 seconds from discovery",
  "requiredRun": {
    "conclusion": "success",
    "event": "push",
    "head_sha": "47e7f9a6c01147c49c6c39403db3bdd9442ad045",
    "html_url": "https://github.com/just-every/home/actions/runs/43061634641",
    "id": 43061634641,
    "name": "Verify branch",
    "status": "completed"
  },
  "manualGitHubCallsUsed": 9,
  "otherRunsAtDiscovery": [
    {
      "conclusion": null,
      "created_at": "2026-11-11T16:46:47Z",
      "event": "pull_request",
      "head_sha": "47e7f9a6c01147c49c6c39403db3bdd9442ad045",
      "html_url": "https://github.com/just-every/home/actions/runs/43061663538",
      "id": 43061663538,
      "name": "Verify branch",
      "status": "pending",
      "updated_at": "2026-11-11T16:46:48Z"
    },
    {
      "conclusion": "success",
      "created_at": "2026-11-11T16:46:46Z",
      "event": "dynamic",
      "head_sha": "47e7f9a6c01147c49c6c39403db3bdd9442ad045",
      "html_url": "https://github.com/just-every/home/actions/runs/43061659612",
      "id": 43061659612,
      "name": "PR #43",
      "status": "completed",
      "updated_at": "2026-11-11T16:47:50Z"
    }
  ]
}
```

## Final source refs

| Seed | Ref | Commit | Reason |
| --- | --- | --- | --- |
| uptime | v0.5.5 | 3caf61f087a59a0cc009f1eb1c87077be0eb985b | released listing version |
| happytohelp | v0.4.21 | 51492e5d3cbaa94b42df1bef063fb00131038a19 | released listing version |
| nook | v0.5.0 | 7fc9516570502e9066b7f3a16d08ad63610d608e | released listing version |
| lamp | v1.11.11 | 9bbe26c4fe8cd806fb1d25e23412f2f6b198028c | released listing version |
| cradle | v0.4.0 | 6422d6fa21bb215167d9335d41e02b862bb7ad65 | released listing version |
| vector | v0.4.1 | 3c1e3de9f338b79206be339f7b594ed55e62c934 | released listing version |
| slate | v0.4.0 | 635df53b1d055f31998b7a5dd448ce467dab07d2 | released listing version |
| pencil | v0.7.0 | 97a985113cfadb9b7edaa8171bac9f5bd31718cb | released listing version |
| orbit | v0.4.5 | 36f701cc53e127f0ed4baf367625af329fef6768 | released listing version |
| mango | v0.4.0 | b40be01dcfcf8d793a92780252859eeccdaeb754 | released listing version |
| dial | v0.5.0 | da9f7f3c8b60b1b1935de0a4c7384a5cad1256ac | released listing version |
| penny | v0.2.1 | 4befdc40491a1a2f0ce66a77cb67ca5c49a31135 | released listing version |
| oncall | v0.5.8 | 0dac089dba93dc1209c3a2317d5e7a4392d44c4e | released listing version |
| spool | v0.7.5 | 5886617d17da50761fb442f66b03ce623d5e9559 | released listing version |
| balm | v0.1.4 | fc2451647ed0263ae50bd8d3536038a9a5c379c0 | released listing version |
| beam | v0.1.0 | 3278cad69eab0cf0a591ddf993f6549fbc4097c4 | released listing version |
| cabin | v0.1.0 | 37464b4468f5967f381951737d3c3cba46a736fe | released listing version |
| chest | v0.2.0 | 219ca4f53eed1448409e979823eac80ad8a24400 | released listing version |
| coaster | v0.1.0 | 568ad6d10bdf64f7a1f40a3ff2bbf3e16785fb51 | released listing version |
| coffer | v0.1.0 | 87b6d2c62e187385f72debfc5c9bbd3e3d1df458 | released listing version |
| easel | v0.1.0 | 82c03999852d81ca96e04c50b87ee81adb2abeb2 | released listing version |
| gasket | v0.1.0 | 33769933eaf2bafeb75c80eb2093b1400d282bc5 | released listing version |
| gauge | v0.1.0 | cf3745f66aff3b27a4111e30b7cf59824395b4cd | released listing version |
| glove | v0.1.0 | a9086f381d9c15af4aec26baafcb6aba619a374d | released listing version |
| larder | v0.1.3 | 10758c4295dec89b655e30ef8e26fa4f472e223d | released listing version |
| locket | v0.1.3 | b16525ec322de963fa48e6f4aafd78790ff58b41 | released listing version |
| lodge | v0.1.0 | 5d58f08b12819305f62e0e617edb1398b07654ca | released listing version |
| nectar | v0.1.0 | 59215a083b5f8a1248b1ab53c4c3ea4e51aa110b | released listing version |
| pantry | v0.2.8 | b24aaab5aac7e4cd3b83ef39d93a07e8325b6a8e | released listing version |
| pier | v0.1.0 | 67c944bf027977ad161aa209e1ff22b0afa9e812 | released listing version |
| purse | v0.1.1 | bab2cbe475ea23bd4831a71b441a6fb2b0d2cbdf | released listing version |
| willow | v0.1.0 | def0450eb8de870eed4b41fbe3ebdfdb35e6166f | released listing version |
| buoy | v0.1.3 | e85c5fa796ccd03ba45e6bea5d5fd3b65b27d471 | released listing version |
| lanyard | v0.1.3 | db2a1ef37612248290e0efd85209c9b1f0da8c83 | released listing version |
| terrace | v0.1.4 | 0afcac8b3a42c23d984078e6ff90e928c9ebc22f | released listing version |
| auth | HEAD | d55816c1f0e6b66f12d0c2846fdba6cf22965251 | coming-soon seed |
| blotter | HEAD | 4e18475e9bfd57e90da8141a1d6de13efa3f2231 | coming-soon seed; no release tag |
| crank | HEAD | 4c92d9469bda9d3e1a21bc03f4c7f9d20f97c047 | coming-soon seed; no release tag |
| evidence | HEAD | 2a064b4ce1e9e30350a6ea887ff8e4d057f4ef8d | coming-soon seed; no release tag |
| inkwell | HEAD | e4e3c2dd4bdf48fe16111f9d447568d6c4366a84 | coming-soon seed; no release tag |
| mallet | HEAD | 095576e8bfe68bf364228679ff6bd34176a89907 | coming-soon seed; no release tag |
| pane | HEAD | 16501ad7d10c5af6f04799aa44c700249a41e9b4 | coming-soon seed; no release tag |
| placemat | HEAD | 6232d682d8356f2eb0f2d9e58b4e44bba51fd9cd | coming-soon seed; no release tag |
| platter | HEAD | 85dee737177a6559448a012b2b6e22cad05f5e1a | coming-soon seed; no release tag |
| plinth | HEAD | 1fd27e714032ffb16b4682e9409671bd272d0f11 | coming-soon seed; no release tag |
| satchel | HEAD | 2e07928ffcf1061422b85ce066b54dbe08e1e6c3 | coming-soon seed; no release tag |
| stall | HEAD | 8ee1f25df4f0b10b9a62e7fe221453499f27b297 | coming-soon seed; no release tag |
| strap | HEAD | 008fef24f74b44bdb2aaf0fd95dcf50c45ceea7c | coming-soon seed; no release tag |
| vane | HEAD | a2638146dc0faaefe358d203ac940389183151ef | coming-soon seed; no release tag |

## Execution plan and completion

# je-sync-19 plan

1. Configure fleet identity and credential helper, refresh the authorized launcher, and read its AGENTS.md. Clone only just-every/home shallowly, branch cloud/je-sync-19 from fresh main, read repository AGENTS.md and committed sync implementation.
2. Install pinned repository dependencies with npm ci and provision the documented Chromium/Playwright capture dependency outside versioned files. Run the committed full dry sync and retain its complete non-secret report, including all source refs and existing brand/status follow-ups.
3. Verify each proposed released-version promotion against non-draft, non-prerelease GitHub Release metadata carrying rer-release.dsse.json. Record envelope presence separately from signature verification. Review release copy comparisons and relevant contract rows; retain existing wording unless released sources prove it false.
4. Run --copy-only --apply to record copy provenance, then the full --apply. Keep only authorized paths and eligible mechanical updates. Record coming-soon drift without importing wording, keep excluded seeds absent, preserve pricing and contract judgments.
5. Regenerate listings and check them. Repeat the full dry sync and explain every withheld or persistent item. Inspect all diffs for scope, secret-shaped content, incidental changes, stale source provenance and unexplained drift.
6. Run type-check, lint and production build; inspect changed pages once at 1440 and 390 with assertions at 1440. Do not add permanent tests or run the full local suite.
7. Fetch current main and rebase before the first publication if needed, using explicit fleet author/committer identity and active hooks. Commit only product files, inspect every candidate commit identity/trailer and push only cloud/je-sync-19 through cloud-push.py.
8. Open the requested PR via GitHub REST, observe exact-SHA Verify within the ten manual-call budget and five-minute poll limit. Keep lane landing/deployment authority unchanged.
9. Save full report, actual check/CI receipts and relevant public source evidence in this packet. Publish explicit regular files only to evidence/je-sync-19. After successful product and evidence publication, delete the disposable clone and node_modules. Report branch, exact SHA, PR, CI, counts, clause changes, limitations and the lane POST line.

All product work and checks above are complete. The report-only evidence publication uses refs/heads/evidence/je-sync-19 and explicitly selected regular files. Product checkout/head/index stay unchanged by that transport. After successful evidence publication, the disposable clone and its node_modules are removed; the final terminal message confirms cleanup. No server, browser or watcher is retained.
