# je-sync-22 — candidate report

Done: candidate pushed, PR #46 open, exact-SHA Verify completed/success.

- Repository: just-every/home
- Branch: cloud/je-sync-22
- Product head: 876d1edb1024b65d722eff36a2182193a2aa34f0
- PR: https://github.com/just-every/home/pull/46 — sync: seed listings 12 Nov (3)
- Starting/current main before first publication: 4c5444b557b0a2f6fbafcc6612572fa12f0ed7d5. Fetch and rebase completed; main was unchanged. No published history was rewritten.
- Product guarded push succeeded on the first attempt. Remote ref was read back at the exact head. Worktree clean.

## Plan and execution

The full plan is in PLAN.txt. In order: fresh shallow filtered clone and guidance/tool review; npm ci; full dry sync; copy-only apply; released-source review and release-asset eligibility checks; mechanical apply; a second copy-only apply for the three newly displayed tags to record their reviewed released provenance; regenerate/check listings; full final dry sync; data review, type-check, lint, production build and brand check; local browser proof at desktop/phone widths; identity/scope/diff/credential-pattern audit; commit, fetch/rebase, guarded branch push and REST PR; exact-SHA Verify observation; separate evidence publication; successful clone cleanup.

Source repository files and refs were read through gh api only. An external, temporary transport adapter translated the committed sync tool's git ls-remote source-ref requests into gh api commit/ref reads; the sync implementation and repository source were not edited. Each gh process loaded the injected credential from the fleet bundle without displaying it. Source reads inherent to the required 49-seed sync are separate from the ten-call CI/control budget.

## Actual sync lines and proposed changes

Initial full dry run: **Dry run: 3 of 49 seeds changed.** All 49 repositories and homepages readable; zero unreadable. Its only findings were:

```text
HappyToHelp
  version   newer tag v0.4.22 (page shows v0.4.21) [to apply]
Oncall
  version   newer tag v0.5.9 (page shows v0.5.8) [to apply]
Spool
  version   newer tag v0.7.7 (page shows v0.7.6) [to apply]
```

The first copy-only apply reported 0 of 49 changed. Mechanical apply imported exactly the three version findings. Once the displayed versions changed, copy-only apply for those three reported the corresponding source-file hashes (HappyToHelp README.md/seed.json; Oncall and Spool CONTRACT.md/README.md/seed.json) and recorded their new released source refs. It changed no public wording or art. SOURCE_REVIEW.md records the review and row citations. The state keeps those observed copy keys; they are acknowledged source-review findings, not new claims or remaining drift. Full apply also cleared Uptime's already-seen seed.json finding key 64cb07f6a0dd. Hidden legacy state entries remain untouched.

Final full dry run: **Dry run: 0 of 49 seeds changed.** Zero unreadable and no unexplained findings. Coming-soon/unreleased copy drift: none detected. Existing mark, colour, homepage and status follow-ups: no findings in this run; no redesign or new gallery capture was initiated.

## Per-seed diff and released authority

| Seed | Version before → after | Released source commit | Release |
| --- | --- | --- | --- |
| HappyToHelp | v0.4.21 → v0.4.22 | 4dee2432081a64cee0bd12c59a31cb84371c3ab3 | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.22 |
| Oncall | v0.5.8 → v0.5.9 | 59af2f80bb67eb3382828f5c736698491006254c | https://github.com/just-every/run-oncall/releases/tag/v0.5.9 |
| Spool | v0.7.6 → v0.7.7 | 26d13d4f574298851f25778818c1af0b9b2a2386 | https://github.com/just-every/run-spool/releases/tag/v0.7.7 |

All three Releases are non-draft and non-prerelease, with rer-release.dsse.json assets. release-receipts.json preserves actual IDs, publication times, asset names, sizes and supplied digests. **Envelope-asset presence was confirmed; signatures were not verified.** Bare tags alone were not used as release authority. This round has three version advancements and zero released-status promotions.

Changed product files only: public/data/listings.json, scripts/seeds-sync/state.json, src/data/seed-pages.ts. product.patch contains the complete diff. Public prose, marks, colours, homepages, stills, galleries, overrides and pricing presentation are unchanged. Assisted US$10/month and Managed US$100/month presentation was preserved; no GST or billing-country wording was introduced.

## Counts, withheld work and clause custody

Counts before → after: **49 → 49 listings; 35 → 35 released; 14 → 14 coming soon.** Every listing property other than the three intended versions is structurally identical after JSON parsing. Uptime v0.5.7, Lamp v1.11.12 and Orbit v0.4.6 remain unchanged. public/brand.json SHA-256 remains a54bb68daa5f1590e5a6eaafecf38c627e42fa014f65c0d7efaf81bee809b7a4.

Deliberately retained/withheld:

- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent; hidden state records were not republished as listings.
- Auth stays coming soon under its owner override. No seed was promoted by tag alone.
- Terrace's “reconciled to the cent” and bank matching wording is retained: released v0.1.4 ACCT-001:546, ACCT-006:551 and ACCT-011:556 support the recorded-source books/reconciliation/close behavior. No live bank-feed, payment-rail, tax-certification or full-migration claim was added.
- HappyToHelp's eight named promises remain partial in the unchanged v0.4.22 contract. Their gaps are preserved in SOURCE_REVIEW.md; the source changes do not falsify the existing JE wording. Uptime STATE-001/NETWORK-001 and the eight named Lamp partial rows likewise keep their source judgments and true-as-built wording. No wording round was imported.
- No coming-soon/default-branch copy was imported. No gallery or still import was proposed. RER was neither edited nor launched; its separate inventory/import follow-ups remain with their owners.

JE clause-status changes: **none**. No seed contract was modified. Observed upstream released judgments only: Spool BASE-AGENT-006 missing → partial; Oncall OC-006, OC-017 and OC-022 partial → done; HappyToHelp no contract/status delta. source-status-observations.json records exact tag/row provenance. These are observations of upstream release source, not independent implementation promotions by this task.

## Checks and browser proof

Passed: npm ci; all required sync modes; npm run listings; npm run listings -- --check; npm run type-check; npm run lint; npm run build; npm run brand -- --check; final listings check; meaningful data comparison of all listing fields/counts/exclusions; git diff --check; complete candidate identity/trailer/scope/credential-pattern audit. No permanent tests, full local suite or weakened check was added.

Chromium /usr/bin/chromium with --no-sandbox: all three local candidate pages passed version, JSON-LD softwareVersion, HTTP 200 and horizontal-overflow assertions at **1440**. All changed version sections were captured and visually reviewed once at **1440 and 390**; browser/receipt.json and six screenshots hold proof. The browser and both recorded server attempts were closed/stopped; server-receipt.json records successful cleanup.

Resolved environment/setup issues: Playwright was initially absent, then installed under the user directory and linked only in ignored node_modules; npm's nested prefix discovery required that local link. An initial networkidle wait timed out on media activity; the successful proof waits for document/content/font readiness. The supplied fleet hook symlinks exposed Husky's relative support-file lookup; forwarding existing executable original hooks at their own paths repaired it. Fleet commit-msg cleanup and every original repository hook stayed active; pre-commit ESLint/Prettier and pre-push LFS checks ran. No product implementation was changed for these issues.

## CI and landing custody

Initial REST discovery observed push Verify branch run **43212634338** in_progress on **876d1edb1024b65d722eff36a2182193a2aa34f0**, https://github.com/just-every/home/actions/runs/43212634338. One watcher; no follow-up API call before 300 seconds. Final REST observation after 300.59 seconds: **completed / success on the same exact SHA**. ci-receipt.json records the actual response; 3 of 10 CI/control calls used (PR creation, run discovery, final run observation). No failed-job logs were needed. No green result from another SHA or the skipped PR job is accepted.

The candidate is not merged or deployed. The lane retains the landing hold, independent deciding gate, Mac publication scan, PR merge, deployment and live verification. No product blocker has been found. Cloud checks cannot substitute for the Mac publication scan or DSSE signature verification.

## Evidence and cleanup

Actual non-secret reports/receipts are under /home/agent/rer-consolidation/work/je-sync-22/packet. Explicit public-safe file selection is recorded in evidence-selection.json. Evidence is transported only to refs/heads/evidence/je-sync-22; product source remains only on cloud/je-sync-22. No credentials, environment dumps, private held-out gate material or symlinks are selected. Successful publication and exact-ref/head custody are recorded by the terminal EVIDENCE line. Clone/node_modules cleanup occurs after successful evidence publication and verification; packet files remain outside the clone.
