# je-sync-18 results

Product candidate pushed on cloud/je-sync-18 at c7c60bc1617ba017472cb25a91f419492bc4bef5. PR: https://github.com/just-every/home/pull/42. No landing or deployment is part of this task.

## Plan and scope

The full plan is PLAN.md. Fresh shallow clone of just-every/home at main 85aa3f93662614840d92352f33f375b9ecca8b62; branch cloud/je-sync-18. Read launcher AGENTS.md, repository AGENTS.md, committed seeds-sync README/entry point/source readers/detectors/apply implementation and Verify workflow first. No other product repository was cloned or written. Non-product source reads use gh api only: a task-local adapter supplies the sync tool's ls-remote ref interface from API observations, with immutable content cached outside the checkout. Initial ref observations are retained in source-refs.json. Product code and sync implementation are unchanged.

## Actual sync runs

- npm ci passed. Initial dry sync stopped before applying because seed API reads returned HTTP 401. Launcher refresh plus the required Git setup recovered access at attempt 2, after 15 seconds. Actual source-recovery.json/log retain the failure and successful recovery. No alternate credential was used.
- The next dry attempt resolved sources but found Playwright missing. Installed playwright-core without changing tracked package files, reinstalled the preserving fleet hook, and reran successfully. A final npm ci restores exactly the committed lockfile before candidate validation; browser proof uses the external task-local Playwright copy.
- Full completed dry: `npm run seeds:sync -- --out ../packet/dry-initial`: **4 of 49 seeds changed**, 0 unreadable. Every one of 49 homepages read successfully. No mark, colour, homepage, status or copy finding; the four proposed lines are below.
- `npm run seeds:sync -- --copy-only --apply --out ../packet/copy-initial`: **0 of 49 seeds changed**. This flag updates copy provenance only; it preserves public wording, brand and homepage observations. No coming-soon/unreleased copy drift was reported or imported.
- `npm run seeds:sync -- --apply --out ../packet/apply`: **4 of 49 seeds changed**, all proposed versions. The tool mechanically accepts bare tags. Before any commit, restored Lamp v1.11.10 and selected HappyToHelp v0.4.20, following verified Release eligibility. No transient unqualified version is in the candidate.
- Repeated copy-only apply at the retained released versions: **3 of 49 seeds changed**, reporting Uptime seed.json, HappyToHelp README.md/seed.json and Oncall README.md/seed.json. Actual comparison diffs are in released-source-review.json; exact source bytes are under source-review/. All three CONTRACT.md hashes remain unchanged from their displayed predecessors. Public claims stay unchanged; see COPY-REVIEW.md for source file/row evidence and retained partial judgments.
- `npm run listings` generated 49 entries; `npm run listings -- --check` passed.
- Final full dry: **2 of 49 seeds changed**, 0 unreadable. Only the explicitly withheld HappyToHelp v0.4.21 and Lamp v1.11.11 tags remain. No unexplained change remains. All 49 homepages read successfully again.

The complete actual dry/apply reports include every seed's source ref, commit, reason and copy hashes, with the capture observations and actual command output. No invented mark/colour/status follow-up, redesign, new capture campaign or gallery import was added.

## Proposed changes and Release decisions

| Seed | Initial proposed line | Retained candidate | Source decision |
| --- | --- | --- | --- |
| Uptime | `version newer tag v0.5.5 (page shows v0.5.4)` | v0.5.4 → v0.5.5 | Non-draft, non-prerelease Release with rer-release.dsse.json |
| HappyToHelp | `version newer tag v0.4.21 (page shows v0.4.19)` | v0.4.19 → v0.4.20 | v0.4.20 is the latest eligible Release; v0.4.21 remains a bare tag |
| Lamp | `version newer tag v1.11.11 (page shows v1.11.10)` | v1.11.10 unchanged | Latest non-draft Release is v1.11.10; withhold v1.11.11 |
| Oncall | `version newer tag v0.5.8 (page shows v0.5.7)` | v0.5.7 → v0.5.8 | Non-draft, non-prerelease Release with rer-release.dsse.json |

Retained Release URLs and exact peeled source commits:

- Uptime v0.5.5: https://github.com/just-every/run-uptime/releases/tag/v0.5.5 — `3caf61f087a59a0cc009f1eb1c87077be0eb985b`.
- Oncall v0.5.8: https://github.com/just-every/run-oncall/releases/tag/v0.5.8 — `0dac089dba93dc1209c3a2317d5e7a4392d44c4e`.
- HappyToHelp v0.4.20: https://github.com/just-every/run-happytohelp/releases/tag/v0.4.20 — `1c9051307419c22530c4b1f7aab80a53bd4eb9d8`.

The Releases API observations are in releases.json and releases-fresh.json. **Envelope asset presence is confirmed; cryptographic signature verification was not performed or claimed.** Annotated tag objects are distinguished from peeled commits in released-source-review.json; reviewed file hashes match the exact committed provenance.

## Per-seed product diff and preserved decisions

- Uptime, HappyToHelp and Oncall: only displayed version plus generated listing version, and recorded copy source ref/commit/tag/hashes. No public claim edit, category/line/headline/colour/mark/homepage/status/pricing change.
- Orbit and Spool: full sync removes obsolete `open` observation keys (922fed04eacf and 42983364b373) because the current detector has no remaining findings. No listing or public wording changes for either seed.
- Uptime's copy finding is retained as an observed open key by copy-only apply. No implementation status changes.
- Lamp remains v1.11.10. Its partial clause follow-ups remain unchanged. Terrace v0.1.4's ACCT-001 and ACCT-006 rows support current recorded-source exact-cent ledger/reconciliation; retain accepted wording. HappyToHelp's eight named partial clauses and Uptime STATE-001/NETWORK-001 remain partial. No seed contract is edited or promoted.
- Every other seed is unchanged. Counts before/after: **49 total, 35 released, 14 coming soon**. No released-status promotions.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Pricing remains Assisted US$10/month and Managed US$100/month with accepted presentation unchanged; no GST or billing-country restriction was added. RER versions are not downgraded from a lagging inventory; no RER work was launched.

## Checks and custody

Actual local check logs, browser receipt, product receipt and CI observation are separate files. Only three tracked product paths may be committed: public/data/listings.json, scripts/seeds-sync/state.json, src/data/seed-pages.ts. All plan/report/receipt/capture files remain outside the product branch. No permanent tests, full suite, weakened check, unrelated page or sync implementation change.

The lane retains the landing hold, independent deciding gate, Mac publication scan, merge, deployment and live verification. Evidence publication is report custody only, never READY, acceptance or landing.

## Validation and product publication receipts

Type-check, lint, production build, brand consistency and listings checks all passed. No full local test suite or new permanent tests. Six browser screenshots show the changed version facts at 1440 and 390; assertions of HTTP 200, displayed version and structured softwareVersion run only at 1440. The initial browser wait for networkidle timed out; waiting for actual document/fact readiness succeeded without changing or mocking the application. All six screenshots were inspected. Browser contexts closed; only the started Next server PID 18137 was terminated.

The supplied hook installer's symlinks caused Husky to resolve its h helper in the wrong directory. The first commit and attempted push both stopped locally; neither published anything. The initial guard bundle contains the unchanged base only, and is not candidate custody. Repaired hook dispatch only under .git, preserving the fleet commit-msg cleanup and all original repository hooks at their absolute paths; pre-commit lint-staged and pre-push Git LFS then ran successfully. See hook-repair.md and the initial/successful push logs. No hooks bypassed.

Fetched current main and rebased before the first successful push (already up to date). Commit identity: Run Edit Run fleet <fleet@runeditrun.com>, author and committer. Every candidate commit, including side parents, and its full message/trailers passed the scan. Only the named branch was pushed, without force. Clean final product tree. PR and CI receipts are kept separately.
