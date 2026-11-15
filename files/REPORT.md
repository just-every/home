# je-sync-37 results

Author: Run Edit Run fleet. Written: 2026-11-15T10:13:18Z.

Done: product candidate pushed. Branch `cloud/je-sync-37`, head `2eb5ffbe583fcd1671cf9cb32640b32a34214716`. PR https://github.com/just-every/home/pull/61. Exact-SHA branch Verify run 43702829307 completed successfully, observed 2026-11-15T10:17:12Z.

## Plan and execution

The full execution plan is in PLAN.md. This round cloned only just-every/home, read AGENTS.md and the committed sync implementation, installed with npm ci, scoped every sync to happytohelp,lamp,uptime,oncall,orbit,spool, verified release evidence, ran both apply modes, regenerated listings, checked the resulting candidate, pushed the named branch, and opened the requested PR. External seed repositories were read only through gh api; a task-local Git adapter outside the checkout translated the tool's ls-remote ref probes into gh api calls. The committed sync implementation was not edited. API source responses were cached for this round by gh's HTTP cache after fresh initial reads. No other repository was cloned, written, pushed or given a PR.

## Actual sync output

- Initial scoped full dry sync: `Dry run: 1 of 6 seeds changed.` Zero unreadable sources/homepages. Only proposal: `Lamp / version / newer tag v1.11.17 (page shows v1.11.16) [to apply]`.
- First `--copy-only --apply`: `Applied: 0 of 6 seeds changed.` This flag updates copy provenance only; it never rewrites public prose or imports art.
- Full `--apply`: `Applied: 1 of 6 seeds changed.` Only applied finding: Lamp version v1.11.17.
- Post-promotion `--copy-only --apply`: `Applied: 1 of 6 seeds changed.` Lamp seed.json changed, reported for review. The only seed.json diff is line 4, version `1.11.16` → `1.11.17`; no wording rewrite follows from it.
- Final scoped dry sync: `Dry run: 0 of 6 seeds changed.` Zero unreadable sources/homepages. This is a scoped six-path result, not an all-seed freshness claim.
- `npm run listings`: `Listings generated (49 seeds)`.
- `npm run listings -- --check`: `Listings current (49 seeds)`.

Complete actual report.md/report.json and terminal output for the successful dry/apply/copy runs are included in the packet. The first dry-run attempt failed because Playwright was absent; installing playwright@1.63.0 globally resolved that dependency without changing package files or sync code.

## Fresh published-source verification

The independent GitHub API release query checked all six seeds. Every row below was published, non-draft and non-prerelease, and had an asset named `rer-release.dsse.json`. A bare tag was never treated as RELEASED. This verifies envelope-asset presence only; no cryptographic signature verification was performed by this builder.

| Seed | Released tag | Released source commit | Published at UTC | URL | Envelope asset |
| --- | --- | --- | --- | --- | --- |
| happytohelp | v0.4.28 | 41fb40246d2e69f928be397c48d952d147c39160 | 2026-11-15T03:25:11Z | [release](https://github.com/just-every/run-happytohelp/releases/tag/v0.4.28) | present |
| lamp | v1.11.17 | b5b5628a247ba2289aeb9af16cab04a998e823ce | 2026-11-15T08:42:04Z | [release](https://github.com/just-every/run-lamp/releases/tag/v1.11.17) | present |
| uptime | v0.5.11 | 04016399e1e879e7be3b8e891baf02d975bb3901 | 2026-11-13T15:41:29Z | [release](https://github.com/just-every/run-uptime/releases/tag/v0.5.11) | present |
| oncall | v0.5.14 | 4d1fc62d4d2b8bf90008ac87bbaa626bc1a5494b | 2026-11-14T12:38:51Z | [release](https://github.com/just-every/run-oncall/releases/tag/v0.5.14) | present |
| orbit | v0.4.9 | a5f471626aea1bfcb2c79f5dbee2250fdb38fd49 | 2026-11-13T17:49:50Z | [release](https://github.com/just-every/run-orbit/releases/tag/v0.4.9) | present |
| spool | v0.7.11 | b9e7e575097e0dd0fc0662ce1ed507fa0d41f0d8 | 2026-11-14T02:29:00Z | [release](https://github.com/just-every/run-spool/releases/tag/v0.7.11) | present |

Initial copy sources followed the existing displayed tags. Lamp initially resolved v1.11.16 to `429a46081ce68bab2dbdae46b8402b8ccce3ee2a`; after promotion its copy provenance resolves v1.11.17 to `b5b5628a247ba2289aeb9af16cab04a998e823ce`. The other five copy source refs/commits remain as shown in the table. The current main commits used for brand observations are recorded in brand-source-heads.json. Homepage observations came from the six public URLs in the tool's captures/jobs.json; no new captured asset was imported into the product.

## Per-seed diff and copy review

- Lamp: public version v1.11.16 → v1.11.17 in src/data/seed-pages.ts and generated public/data/listings.json. State changes only Lamp's source ref, source commit, tag and seed.json hash, plus the tool's recorded copy finding and sync timestamp. CONTRACT.md at both released commits is byte-for-byte identical: hash prefix f9cb0b8a5bd46d69. README.md hash remains 1a20f137749ab26b. The released seed.json row 4 proves the version edit; its maturity and every other field remain unchanged. No public claim was proved false and no summary, does, promise or SEO text was rewritten. lamp-seed.diff and lamp-contract.diff record this comparison.
- HappyToHelp: v0.4.28 retained. No mechanical or copy-source change; its pre-existing state.open entry 42983364b373 was retained explicitly after the full apply would have dropped it. This preserves the existing unresolved copy-review record.
- Uptime: v0.5.11 retained; no changes.
- Oncall: v0.5.14 retained; no changes.
- Orbit: v0.4.9 retained; no changes.
- Spool: v0.7.11 retained; no changes.

Only three product paths changed: public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts. The diff is 10 insertions and 9 deletions. No marks, colours, headlines, homepages, homepage stills, galleries, status classifications, pricing or clause judgments changed. The final tool output proposes no mark/colour/status follow-up; existing separate copy follow-ups remain in force.

## Deliberately withheld and preserved

- Later seeds stay paused until 25 Nov. No coming-soon or non-path copy was fetched/imported in this scoped round; their current drift is not assessed. No bare tag promoted a seed or changed released/coming-soon classification.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Overrides were unchanged; there was no reappearing excluded entry to remove.
- Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial-evidence follow-ups (C), and Spool ERR-006 (D) remain untouched. This round makes no implementation-status or clause-status promotion.
- Assisted US$10/month and Managed US$100/month presentation is preserved; no GST wording or billing-country restriction was added. No pricing source was edited.
- No new logo, design, style, gallery capture or gallery ingestion was done. The existing sync tool read public homepages for comparison; it imported no images.

## RER drift

Read https://runeditrun.com/data/seeds.json freshly. Its generatedAt was `2026-10-25T08:59:46Z`. JE's newer released versions were preserved rather than downgraded. RER ownership remains gr; no RER write was made.

| Seed | JE candidate | RER source |
| --- | --- | --- |
| happytohelp | v0.4.28 | 0.4.12 |
| lamp | v1.11.17 | 1.10.0 |
| uptime | v0.5.11 | 0.4.3 |
| oncall | v0.5.14 | 0.4.2 |
| orbit | v0.4.9 | 0.3.0 |
| spool | v0.7.11 | absent |

## Counts, clauses and checks

Before: 49 listings, 35 released, 14 coming soon. After: 49 listings, 35 released, 14 coming soon. Changed public listings: 1. Changed state seed records: Lamp only. Clause status changes: none. Contract implementation promotions: none. Public claim edits: none. Added/removed test registrations: 0; the full suite is owned by CI.

Passed: npm ci; scoped sync/apply passes; listings regeneration/check; npm run type-check; npm run lint; npm run build. The production build generated 61 pages successfully. Existing Next.js middleware/standalone warnings were left outside scope.

Browser proof: the built Lamp page returned HTTP 200 and displayed v1.11.17 at widths 1440 and 390. Assertions run at 1440 verified that the version is visible and the page has no horizontal overflow; 390 is visual proof of the same changed screen. Screenshots lamp-1440.png and lamp-390.png were reviewed. The browser and the server PID 7897 were closed/stopped in finally. The initial networkidle wait timed out on ongoing page activity; readiness was changed to DOM content plus rendered version, with no application path mocked or intercepted. This is page proof, not Worker/D1 runtime or deployment proof; local next start logged unavailable Worker caches and uninitialized telemetry D1 bindings.

## Publication and custody

Fleet identity and cleanup hooks were installed. A clone-local adapter was needed because symlinking Husky wrappers changes dirname lookup; it executes each repository hook at its original absolute path and retains the fleet commit-msg cleanup. The first commit/push attempt was rejected locally by that hook-path issue, with no candidate commit and no published branch. After correction, the real commit and guarded push succeeded. pre-push-check.log covers every candidate commit including side parents, allowed identity/trailers, scope, diff hygiene and credential-shaped values. Product push used cloud-push.py only. The clone was current with fresh origin/main before the first successful push; no history was force-pushed.

The cloud cannot run the Mac publication scan. Independent Codex gate, publication scan, PR merge, deployment and live 1440/390 proof remain with the lane. Evidence publication is separate from product readiness and will use only refs/heads/evidence/je-sync-37. The product checkout and node_modules will be deleted only after the product and complete relevant packet are successfully published. No server, browser or watcher is left running.

## Final CI observation

At 2026-11-15T10:17:12Z, REST returned completed/success for Verify branch run 43702829307 on exact head `2eb5ffbe583fcd1671cf9cb32640b32a34214716`: https://github.com/just-every/home/actions/runs/43702829307. Discovery and one follow-up observation were 309 seconds apart. Two CI observation calls plus one PR-creation call used 3 of the ten-call CI/PR observation budget. No workflow was dispatched, rerun or judged from another SHA. Product is READY for the lane’s independent gate; no product blocker remains.
