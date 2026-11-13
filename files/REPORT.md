# je-sync-29 result

UTC 2026-11-13T18:40:12Z

Product branch: `cloud/je-sync-29`
Product head: `edfb1132486eaac9f87843199561c3230d5132df`
Fresh-main base: `1b7c84f81246cce3a6d7b26bffc31ea1ca0370a0`
PR: https://github.com/just-every/home/pull/53

Candidate pushed successfully on the first guarded push attempt. The product checkout is clean and the committed diff exactly matches the tree used for local checks and browser proof. No merge, deployment, provider credentials, main push or main fast-forward was performed.

## Plan and results

# je-sync-29 plan

UTC 2026-11-13T18:34:09Z

1. Read launcher and repository rules and committed sync implementation; install dependencies and fleet safeguards.
2. Dry-run all 49 listings to preserve a full inventory of proposed version, brand, homepage and copy changes with source refs.
3. Verify six-path releases via GitHub API, including draft/prerelease flags and rer-release.dsse.json asset names; asset presence is not signature verification.
4. Run copy-only apply, review released copy provenance, retain wording unless a released source proves a claim false. Preserve existing C/D follow-ups and never alter seed contract status.
5. Run mechanical apply for the six path seeds; discard any unsupported tag-only version, uncommitted live capture, unproven copy, or out-of-scope generated asset. Keep later seeds and their provenance unchanged.
6. Generate listings and check; re-run dry sync, name each deliberate hold. Run typecheck, lint and production build. Browser-check changed pages at 1440 and 390 if rendered changes require proof.
7. Fetch and rebase fresh main before first product push, inspect every candidate identity/trailer and diff hygiene; commit and push cloud/je-sync-29 through fleet guard. Open the requested PR. Observe exact-SHA Verify through REST within the polling budget.
8. Write complete results and actual receipts, publish report-only evidence/je-sync-29, retain provenance, and remove the successfully pushed clone and its dependencies.


## Initial proposed changes

Full initial dry sync: **3 of 49 seeds changed; 0 unreadable**. Every proposed change was a version change:

```text
Uptime  version  newer tag v0.5.11 (page shows v0.5.10) [to apply]
Orbit   version  newer tag v0.4.9 (page shows v0.4.8) [to apply]
Oncall  version  newer tag v0.5.12 (page shows v0.5.11) [to apply]
```

No mark, colour, released/coming-soon status, homepage, headline, incumbent, still or copy change was proposed in that dry run. The committed tool output contains no standing mark/colour/status finding requiring action. Full refs for every one of the 49 listings are in `dry-before/report.md` and `dry-before/report.json`.

## Per-seed outcome and fresh source refs

| Seed | Before → after | Released tag commit | GitHub Release |
| --- | --- | --- | --- |
| uptime | v0.5.10 → v0.5.11 | `04016399e1e879e7be3b8e891baf02d975bb3901` | https://github.com/just-every/run-uptime/releases/tag/v0.5.11 |
| oncall | v0.5.11 → v0.5.12 | `1ab915f6efdfe3398c8d7645fe56e46e123299b6` | https://github.com/just-every/run-oncall/releases/tag/v0.5.12 |
| orbit | v0.4.8 → v0.4.9 | `a5f471626aea1bfcb2c79f5dbee2250fdb38fd49` | https://github.com/just-every/run-orbit/releases/tag/v0.4.9 |
| happytohelp | v0.4.24 → v0.4.24 | `6acf8a4c50dfeb94ca9ab705b1e386d282ea8e0f` | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.24 |
| lamp | v1.11.14 → v1.11.14 | `733e2ce1e2fc618183a93632218bb86456a06a79` | https://github.com/just-every/run-lamp/releases/tag/v1.11.14 |
| spool | v0.7.9 → v0.7.9 | `8049c9153f1d987bba6211bc05b8405b06101a6f` | https://github.com/just-every/run-spool/releases/tag/v0.7.9 |

Every row above is a non-draft, non-prerelease GitHub Release with a `rer-release.dsse.json` asset. This is **envelope-asset presence, not signature verification**. Publication times for the three bumps: Uptime 2026-11-13T15:41:29Z; Oncall 2026-11-13T15:39:37Z; Orbit 2026-11-13T17:49:50Z. Source version evidence is `seed.json:4` at each new tag; Uptime `README.md:36` and Oncall `README.md:34` supply their release-record wording. Full actual release metadata is `releases.json`. No bare tag was used as release authorization.

Mechanical apply was restricted with `--only uptime,happytohelp,lamp,oncall,orbit,spool` to enforce the later-seed hold. Source refs were advanced with a second copy-only apply after the version bump, so final copy provenance follows the new displayed tags rather than the preceding releases.

## Copy provenance and clauses

Copy-only apply before the version bumps: 0/6 source-copy changes. After the bumps: Uptime README.md and seed.json, Oncall README.md and seed.json, Orbit seed.json changed. Full actual diffs and row-specific review are in `released-copy-diffs.txt` and `COPY-REVIEW.md`. The three CONTRACT.md files are byte-identical across old and new tags; `released-contract-diffs.txt` is empty. README changes only describe release records; Uptime seed.json also adds heartbeat-key/rules static assets. These changes do not falsify existing public copy. All six path seeds retain every public summary, capability and promise verbatim. Oncall README uses the phrase release candidate, while independently published GitHub Release metadata satisfies the standing RELEASED rule.

**Clause status changes: none.** No CONTRACT.md, generated acceptance views, implementation-status cell or seed repository was edited. No acceptance-point completion is claimed.

## Withheld and preserved items

- Later seeds are paused until 25 Nov. Both full 49-seed dry runs found no later-seed drift to import or withhold; all 43 other seed state records are unchanged.
- Coming-soon/unreleased copy drift: none reported. No default-branch wording or status promotion was imported.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent.
- Terrace trust wording (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial-evidence promises (C), and Spool ERR-006 mismatch (D) remain open for their existing lanes; this round makes no copy or status change for them.
- No mark, colour, homepage or gallery finding required import; no new artwork, homepage design, style, capture campaign or gallery ingestion was added.
- Pricing remains the accepted Assisted US$10/month and Managed US$100/month presentation, with no GST wording or billing-country restriction change. RER inventory was not edited; no JE version was lowered.

## Exact product diff and counts

Only three scoped paths changed: `src/data/seed-pages.ts` (three version strings), `public/data/listings.json` (the same three versions plus generated timestamp), and `scripts/seeds-sync/state.json` (sync timestamp, three released tag refs/hashes and tool-maintained seen markers). Spool’s old generic copy-source seen marker was cleared by the committed tool because its current source hashes already matched; its public listing and copy are unchanged. All mark, colour, homepage observations, source code, pricing, excluded seeds and paused-seed records are unchanged.

**Before → after: 49 → 49 listings; 35 → 35 released; 14 → 14 coming soon.** Eligible version drift 3 → 0. No release-status promotion.

## Checks and browser proof

- `npm ci`: passed; repeated before final checks to restore the lockfile dependency tree after adding a temporary Playwright installation.
- `npm run listings` and `npm run listings -- --check`: passed, 49 listings.
- `npm run type-check`: passed.
- `npm run lint`: passed.
- `npm run build`: passed, production Next build.
- Final full `npm run seeds:sync`: **0 of 49 seeds changed; 0 unreadable**. See `dry-after-retry/report.md` and `dry-after-retry/report.json`.
- Browser public-door checks at 1440: served JSON listing and rendered version on /uptime, /oncall and /orbit agree with independent verified GitHub Release metadata; HTTP 200 and no page errors. Screenshots of each page at 1440 and 390 are in `browser/`; assertions run only at 1440.
- Scope, diff whitespace, credential-shaped diff scan and all candidate author/committer/trailer checks passed. The repository pre-commit hook ran lint-staged, ESLint and Prettier; its result did not alter the validated diff.

No permanent tests, full local suite or weakened checks were added. Build and browser processes used the provided cloud toolchain/subreaper. All task servers and browsers were stopped. Actual command receipts are in `CHECKS-RECEIPT.json`, `browser-receipt.json` and the selected logs.

## Recovered execution limitations

The first dry attempt lacked Playwright. A temporary official playwright-core installation fixed it. A later full dry run got `gh: HTTP 502` on HappyToHelp public/rer-theme.css; after 15 seconds, launcher refresh and shared Git setup, the complete retry succeeded with 0/49 findings. An initial browser networkidle wait timed out on ongoing page traffic; the successful run waited for DOM readiness and loaded fonts, checking the same public page/version. The local SQLite migrations were run for telemetry storage, with no remote provider access. Husky uses its invoked path to locate its helper; fleet symlinks initially broke that path, so local Git hook entrypoints now execute the original hook by its own path. The original repo hooks and fleet co-author cleanup remained active, and the successful commit ran them. These were recovered tool/setup issues; no product implementation was edited to address them.

## Landing custody and remaining limits

The independent lane gate, Mac publication scan, PR merge, deployment and live verification remain with the fleet. The cloud diff scan is not claimed to be the Mac publication scan. No release-envelope signature was verified. No product blocker is currently known. Product READY/PUSHED custody is separate from report-only evidence publication.

## Exact-SHA CI and terminal custody

UTC 2026-11-13T18:43:26Z

Verify branch run **43484468818**: **completed/success** on exact head `edfb1132486eaac9f87843199561c3230d5132df`.

https://github.com/just-every/home/actions/runs/43484468818

Discovery observed in_progress, followed by one successful REST status observation after the required 300-second interval. One watcher was used. Total manual GitHub calls: 6 (three source GraphQL reads, one PR creation, one exact-SHA run discovery, one status poll); the committed sync tool’s required source reads are recorded separately in its logs. No workflow rerun or dispatch and no failed-job log call was needed.

Product blocker: none. The lane still owns the independent gate, Mac publication scan, merge and deployment.

READY branch=cloud/je-sync-29 head=edfb1132486eaac9f87843199561c3230d5132df
