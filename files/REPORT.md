# je-sync-36 — seed listing sync, 15 November 2026

Author: Run Edit Run fleet. Report timestamp: 2026-11-15T05:07:43Z.

Done: product candidate pushed to `cloud/je-sync-36` at `00caa60e44e6989fd690f5613986eceb130af2f2` in just-every/home.
PR: https://github.com/just-every/home/pull/60 . Base main: `1800026d12e254459c00c62ce46e32f2b5b02cb0`.
Exact-SHA CI observation is recorded below and in the CI receipt. Product custody and report-only evidence publication are separate. Nothing has been merged or deployed.

## Full plan and execution

The complete prior plan is in PLAN.md. Executed: set fleet identity; refresh launcher; install bundle-only Git helper, guard and co-author cleanup; shallow-clone the sole declared write repository; read AGENTS.md and the committed sync code; install npm dependencies; limit all sync passes to the six path seeds; independently read their GitHub Releases; apply copy provenance, review released sources, apply eligible mechanical updates, update promoted-tag provenance; regenerate/check listings; rerun dry sync; type-check/lint/build; rebase on current main; audit identities/trailers and diff; push candidate; open PR; capture candidate page at 1440 and 390; observe exact-SHA Verify; publish explicit non-secret report/receipt files on evidence/je-sync-36; remove the pushed clone and node_modules after transport verification.

Other repositories were read through gh api only, never cloned or written. A task-local transport adapter converts the committed tool’s git ls-remote calls into gh API ref reads, including annotated-tag peeling. It caches only source GETs for one consistent task snapshot; the six independent Releases list queries are fresh. No sync implementation was edited. There were 67 uncached tool/source API reads; release, PR and CI orchestration calls are counted separately in operations-receipt.json. No CI polling occurred within 300 seconds of run discovery.

## Proposed and applied changes

Initial command: `npm run seeds:sync -- --only happytohelp,lamp,uptime,oncall,orbit,spool --out ../packet/dry-initial`.

Actual dry-sync lines:

```text
Dry run: 1 of 6 seeds changed.
HappyToHelp
  version   newer tag v0.4.28 (page shows v0.4.26) [to apply]
```

This is the complete proposal list. No mark, colour, status, homepage or copy change was proposed initially, and no recurring mark/colour/status follow-up was emitted for these six seeds. All six homepages were readable in each completed full sync. No art, still, gallery, logo, colour, design or copy edit was made.

Applied: HappyToHelp public version v0.4.26 → v0.4.28 in src/data/seed-pages.ts and public/data/listings.json; updated released copy provenance and source hashes in scripts/seeds-sync/state.json. State also records the sync timestamp and clears Lamp’s previously seen open-finding hash without changing its copy, source ref or brand/homepage observations.

The copy-only flag reads released copy files and records provenance only; it does not alter public text or artwork. The pre-promotion copy-only apply reported 0/6 changes. After the mechanical version update, copy-only apply reported HappyToHelp README.md and seed.json changes, now from the v0.4.28 tag. The contract is byte-identical (truncated SHA-256 `ae8feea8b7998aa7`). README.md release notes describe indexes/projections, installer/migration changes and limited synthetic local size qualification; seed.json changes only version. No public claim is proven false. Existing wording stays true to the unchanged contract. Supporting source rows and comparison are in COPY-REVIEW.md and happytohelp-released-source.diff.

Final dry-sync lines:

```text
Dry run: 0 of 6 seeds changed.
```

No unexplained finding remains. The dry runs are deliberately scoped; no claim is made that the paused 43 other catalogue entries were surveyed.

## Independently verified release boundaries

All rows below are non-draft, non-prerelease GitHub Releases with rer-release.dsse.json present. Asset presence and GitHub-advertised asset digests were observed. Cryptographic signature verification was not performed and is not claimed.

| Seed | Before → after | Published release | Released source commit |
| --- | --- | --- | --- |
| happytohelp | v0.4.26 → v0.4.28 | [v0.4.28](https://github.com/just-every/run-happytohelp/releases/tag/v0.4.28) (2026-11-15T03:25:11Z) | `41fb40246d2e69f928be397c48d952d147c39160` |
| lamp | v1.11.16 → v1.11.16 | [v1.11.16](https://github.com/just-every/run-lamp/releases/tag/v1.11.16) (2026-11-14T20:04:54Z) | `429a46081ce68bab2dbdae46b8402b8ccce3ee2a` |
| uptime | v0.5.11 → v0.5.11 | [v0.5.11](https://github.com/just-every/run-uptime/releases/tag/v0.5.11) (2026-11-13T15:41:29Z) | `04016399e1e879e7be3b8e891baf02d975bb3901` |
| oncall | v0.5.14 → v0.5.14 | [v0.5.14](https://github.com/just-every/run-oncall/releases/tag/v0.5.14) (2026-11-14T12:38:51Z) | `4d1fc62d4d2b8bf90008ac87bbaa626bc1a5494b` |
| orbit | v0.4.9 → v0.4.9 | [v0.4.9](https://github.com/just-every/run-orbit/releases/tag/v0.4.9) (2026-11-13T17:49:50Z) | `a5f471626aea1bfcb2c79f5dbee2250fdb38fd49` |
| spool | v0.7.11 → v0.7.11 | [v0.7.11](https://github.com/just-every/run-spool/releases/tag/v0.7.11) (2026-11-14T02:29:00Z) | `b9e7e575097e0dd0fc0662ce1ed507fa0d41f0d8` |

HappyToHelp v0.4.28’s advertised envelope digest is `sha256:d27718d3594520c64c319fdb9d7ad55554883a5b2b1f4ec26cc2c21ccd39aef5`, matching the brief’s receipt. The published source resolves to `41fb40246d2e69f928be397c48d952d147c39160`.

## Deliberately withheld / preserved

- HappyToHelp v0.4.27: tag exists but no published release was found; never used.
- Lamp v1.11.16, Uptime v0.5.11, Oncall v0.5.14, Orbit v0.4.9 and Spool v0.7.11: already at their latest eligible published versions; no update needed.
- Later seeds, including coming-soon/unreleased copy drift: paused until 25 November, so excluded from this six-path sync and not imported. No released status was promoted.
- RER’s stale seed feed: not used to downgrade JE; RER is owned by gr.
- Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C) and Spool ERR-006 (D): preserved follow-ups; no contract implementation status changed.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen: all remain absent. No override removal was needed.
- Assisted US$10/month and Managed US$100/month: accepted presentation retained; pricing files and wording were untouched.
- Galleries, share-image work and new captures for ingestion: none proposed or imported. Browser evidence is candidate proof only and remains off the product branch.

## Counts and clause status

49 listings → 49; 35 released → 35; 14 coming soon → 14. One public version changed, zero status promotions, zero claim-text edits, zero contract clause/status changes. Three product files changed, 12 insertions and 12 deletions. No clause DONE/PARTIAL claim is made by this catalogue-maintenance round.

## Validation and proof

Passed: npm ci; the scoped initial dry sync; copy-only apply before and after version promotion; mechanical apply; npm run listings; npm run listings -- --check (49 seeds); final scoped dry sync (0/6 changes); npm run type-check; npm run lint; npm run build; git diff --check; allowed-path/diff review; credential-shaped and injected-value diff checks; all candidate commit author/committer/trailer checks, including all side parents. Repository pre-commit lint-staged/ESLint/Prettier hooks ran successfully. No test was deleted or weakened and no new fixed-literal test was added. CI owns the full suite.

Candidate browser proof: /happytohelp returned 200 at 1440 and 390. At 1440, an assertion compared the rendered Version fact to the generated public listing feed; both show v0.4.28. The two full-page images were inspected; browser-receipt.json records the exact candidate SHA. Browsers closed and the recorded Next server PID was stopped. The first networkidle attempt timed out; the completed proof uses DOMContentLoaded plus font readiness, with no mock paths. Cloudflare-specific background analytics/caches are not qualified by local Next start; see operations-receipt.json. This does not affect the changed version fact or the successful build.

Initial launcher-hook/Husky path failure was repaired only under .git; no product hook was bypassed. The earlier attempted push was rejected locally by that hook with no HTTP status supplied and published no ref. The real candidate was then committed and pushed successfully on the first guard transport attempt. Initial missing Playwright was repaired by installing playwright@1.63.0 globally. Complete final command logs and resolved-attempt diagnostics are included.

The cloud checked its diff for credential-shaped and injected values. Base’s complete publication scan is unavailable in this cloud adaptation and remains a required Mac lane gate, together with independent Sol high review, landing hold, merge, deployment and live 1440/390 proof. This report does not waive those gates.

## Exact-SHA CI

Initial REST discovery at 2026-11-15T05:05:08Z: push Verify branch run 43679421386 was in_progress on the candidate SHA; PR Verify run 43679459434 was pending; dynamic PR #60 run 43679456473 was completed/success. Dynamic PR success is not treated as Verify success. The required push run is observed again no sooner than 300 seconds later; final status appears in CI-RESULT.md and ci-final.json.

Final REST result at 2026-11-15T05:10:09Z: **Verify branch 43679421386 completed/success** on `00caa60e44e6989fd690f5613986eceb130af2f2`. See [CI-RESULT.md](CI-RESULT.md) and ci-final.json. This is the required exact-SHA push run, not the dynamic PR status.

## Publication / blockers

No product blocker identified. Evidence is transported separately on refs/heads/evidence/je-sync-36 with explicitly selected report/receipt files and file-hash manifest. The final transfer head is printed in the terminal report, and no report file is committed to the product branch. The lane retains publication scan and landing/deploy authority. The clone and node_modules are removed only after successful product and evidence transport; non-secret packet and receipts are retained under $HOME/rer-consolidation/work/je-sync-36/packet/.
