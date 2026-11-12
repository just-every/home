# Done: je-sync-23 candidate

Repository: just-every/home. Product branch: cloud/je-sync-23.
Product head: 14bbb698b7d9e77a3d041794d84b56420fbbf737.
Base main: 705bb0253c0285659279a6acb862437b25bcc2c4.
PR: https://github.com/just-every/home/pull/47 — sync: seed listings 12 Nov (5).
The candidate is pushed for the lane's independent deciding gate, publication scan and PR landing. It has not been merged or deployed.

## Plan and execution

The complete initial plan is in PLAN.md. Executed: fleet identity/launcher/credential guard setup; one fresh shallow filtered clone of the declared repository; read AGENTS.md and the committed seeds-sync implementation; npm ci; full dry sync; GitHub Release eligibility and tagged-copy review; copy-only provenance apply; full mechanical apply; second copy-only provenance pass at the five new displayed tags; listings regeneration/check; final full dry sync; type-check/lint/production build; browser assertions and proof; fresh-main fetch and no-op rebase before first successful publication; all-parent identity/message/trailer/scope/credential-pattern audit; guarded named-branch push and one PR. Final evidence publication and cleanup are recorded separately.

Only just-every/home was cloned. Other repositories were read through gh api only. An external command adapter translated the committed sync tool's git ls-remote ref observations into equivalent gh api commit/ref reads, without changing the tool or the product. Every gh invocation loaded the fleet GH_TOKEN from the decrypted launcher bundle into its own environment without printing it. No other credential source, provider credentials or RER work was used. No lane INBOX or STATE file was read or written.

## Actual dry-sync and apply results

- Initial full dry: “Dry run over 49 seeds: 5 with changes, 0 unreadable.”
- Uptime: “version newer tag v0.5.8 (page shows v0.5.7) [to apply]”.
- Lamp: “version newer tag v1.11.13 (page shows v1.11.12) [to apply]”.
- Orbit: “version newer tag v0.4.7 (page shows v0.4.6) [to apply]”.
- Oncall: “version newer tag v0.5.10 (page shows v0.5.9) [to apply]”.
- Spool: “version newer tag v0.7.8 (page shows v0.7.7) [to apply]”.
- Initial copy-only apply: “Applied: 0 of 49 seeds changed.” It records copy provenance at the prior displayed versions, preserving all wording and art.
- Mechanical apply: five version advances; one data source file written, plus sync state.
- Second copy-only apply, limited to those five seeds, records their reviewed new-tag commits/hashes. Copy findings are reviewed in COPY-REVIEW.md and released-copy.diff; no wording was changed.
- “Listings generated (49 seeds)”; “Listings current (49 seeds)”.
- Final full dry: “Nothing changed since the last sync.” All 49 statuses are ok, zero findings, zero unreadable. No unexplained drift remains.

Complete actual Markdown/JSON reports, stdout logs and homepage-observation receipts are included for each run. Every seed's source ref, full commit and reason is in those reports. Initial and final copies follow displayed released tags, while the fourteen coming-soon seeds follow HEAD. No coming-soon copy drift was found relative to the recorded state.

## Per-seed release and source evidence

Every release below was freshly checked: draft=false, prerelease=false, and rer-release.dsse.json appears in its asset list. This establishes envelope-asset presence only; cryptographic signature verification was not performed. Version values are supported by seed.json:4 at each commit.

| Seed | Listing before → after | Released source commit | GitHub Release |
| --- | --- | --- | --- |
| Spool | v0.7.7 → v0.7.8 | 47ecaeeec8c442aa4648ad3b7f4fc1d7e1f115e2 | https://github.com/just-every/run-spool/releases/tag/v0.7.8 |
| Lamp | v1.11.12 → v1.11.13 | e82bc349b98af44c440efa2960927e327deda1a5 | https://github.com/just-every/run-lamp/releases/tag/v1.11.13 |
| Orbit | v0.4.6 → v0.4.7 | eab0faafccd2eb0945dddb7d0f52c30ce573c04c | https://github.com/just-every/run-orbit/releases/tag/v0.4.7 |
| Oncall | v0.5.9 → v0.5.10 | 1dc0069324de17933e7b65bffefa14de7dabea9a | https://github.com/just-every/run-oncall/releases/tag/v0.5.10 |
| Uptime | v0.5.7 → v0.5.8 | ed5429192d18503c4c8caa8d797d82ffdcc78f54 | https://github.com/just-every/run-uptime/releases/tag/v0.5.8 |

The five release API receipts are release-spool.json, release-lamp.json, release-orbit.json, release-oncall.json and release-uptime.json. source-review.log and reviewed-source-hashes.json identify the exact tagged copy files reviewed. Full old/new copy differences and relevant source rows are retained in released-copy.diff and SOURCE-EXCERPTS.md.

## Copy, mark, colour, status and homepage decisions

No proposed mark, colour, homepage, still, headline, incumbent or released-status drift appeared in the initial dry run or either full follow-up. There were no recurring mark/redraw/placeholder/colour/status findings to import or invent. No gallery, new logo, homepage design or capture campaign was added. No public/seeds asset changed.

Released copy review supports keeping existing wording:

- Spool's contract is unchanged; README changes release/install/SDK context without a new capability that falsifies JE wording.
- Lamp's changes are evidence/judgment advances for PAGE-019, SUB-001 and MOVE-014. JE wording remains supported.
- Orbit's self-caused-outcome notification exception is absent from JE's promises, so it requires no JE sentence edit.
- Oncall's OC-052 evidence/status and triage agent-surface corrections do not contradict JE's listed behavior.
- Uptime's contract is unchanged; README corrects install and interface instructions that JE does not quote.

Deliberately retained follow-ups:

- Terrace remains v0.1.4 (0afcac8b3a42c23d984078e6ff90e928c9ebc22f). README.md:7 and :95 retain no-reconciliation wording, but released CONTRACT.md:551 judges ACCT-006 done with reviewed statement matching, differences and balanced sign-off. ACCT-001 is done at :546; ACCT-012 at :557 retains cash-draft limits. Record this internal source inconsistency; it does not prove JE's “reconciled to the cent” summary or bank-matching does line false. No wording edit is justified under this brief.
- HappyToHelp remains v0.4.22 (4dee2432081a64cee0bd12c59a31cb84371c3ab3). CONVERSATION-001, DELIVERY-001, OUTCOMES-001, AI-001, DELEGATION-001, CONNECTIONS-001, IDENTITY-003 and PORTABILITY-001 remain partial in its released source. Partial evidence is not proof that their JE wording is false; keep the true-as-built sentences.
- Uptime STATE-001 and NETWORK-001 remain partial at CONTRACT.md:1512 and :1514 in v0.5.8. Lamp INTAKE-002, INCIDENT-004, UPDATE-008, NOTIFY-009, PAGE-006, NOTIFY-004, MOVE-002 and SUB-006 remain partial in v1.11.13. No new falsification was found, so wording is retained. COPY-REVIEW.md gives every source row.
- All fourteen coming-soon seeds remain coming soon; Auth keeps its explicit owner override. No unreleased copy was imported. No eligible version proposal was withheld.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Pricing remains the accepted Assisted US$10/month and Managed US$100/month presentation, with no new GST language or billing-country restriction. Pricing files did not change.

Clause status changes made by this task: none. Upstream source judgments are observations only; no seed contract implementation status was promoted here.

## Counts and exact product diff

Before: 49 listings, 35 released, 14 coming soon. After: 49 listings, 35 released, 14 coming soon. Five version values advance; zero status moves, zero wording edits, zero asset changes.

Exactly three changed paths, all within scope:

- src/data/seed-pages.ts: five version substitutions (Uptime :119, Lamp :348, Orbit :737, Oncall :1046, Spool :1100).
- public/data/listings.json: matching five versions and generatedAt.
- scripts/seeds-sync/state.json: reviewed tagged commits, refs and copy hashes; timestamp; seen-copy finding bookkeeping. The obsolete HappyToHelp open-copy marker is cleared because its released copy matches the stored hashes. Brand/home observations remain unchanged.

Commit: 3 files changed, 47 insertions(+), 45 deletions(-). candidate.diff and data-review.json contain the full diff and field-level review. No implementation, gallery, pricing, unrelated page, CONTRACT.md or generated seed view was edited.

## Checks and browser proof

Passed: npm ci; required dry/copy-only/apply sync invocations; npm run listings; npm run listings -- --check; npm run type-check; npm run lint; npm run build (61 generated static pages, four workers); git diff --check; scope audit; all-parent author/committer, trailer and message audit; credential-shaped-value scan. No permanent test was added, no full local suite was run and no check was weakened.

Browser assertions at 1440 verify HTTP 200, all five displayed versions, each matching JSON-LD softwareVersion and no horizontal overflow. Exactly one screenshot per changed page at 1440 and 390 is in browser/. browser-receipt.json and browser.log contain the results. The initial browser harness timed out waiting for global networkidle; the successful run waits for DOM readiness and fonts with the same content/schema/overflow assertions. Local Next production serving reports ancillary missing Cloudflare cache binding and unmigrated telemetry-table warnings; unchanged provider/API features were not tested. The recorded production-server PID was terminated and waited, and all browser contexts were closed. These limits do not affect the observed static listing/version proof.

The provided fleet hook installer initially failed because Husky resolves helper/repository paths from $0 and the installed symlink changed that path. The first commit and first push were blocked locally; no product ref was published. The shell's missing fail-fast handling allowed the first push attempt after the failed commit. Retry used set -e and clone-local delegate wrappers that exec each preserved original hook at its own path. Fleet commit-msg cleanup remains active, and repository lint-staged ran successfully. The first guard bundle contains only unchanged main, not a candidate. Details: hook-repair.md and product-push-attempt-1.log. The subsequent real commit and named-branch push succeeded with fleet author/committer, no trailers, a clean tree and a successful repeat audit.

## CI, evidence custody and cleanup

Exact-SHA CI observation and terminal status are recorded in ci-receipt.json and appended below before evidence publication. Only the existing exact-SHA Verify result qualifies this candidate; no main push, merge or deployment was used to obtain CI. The publication scan, independent gate, PR merge, deployment and live 1440/390 verification remain the lane's work.

Product and report custody are separate. This packet is selected explicitly and published only to evidence/je-sync-23 using cloud_evidence.py; it contains no credential files, environment dump, private held-out gate material or symlink. The product branch contains only the three product files above. Actual product/PR/audit/check receipts and full reports are included. Evidence publication does not establish acceptance or landing.

### Terminal CI observation

Single REST discovery observation: push workflow **Verify branch**, run **43266034973**, **completed/success** on exact head **14bbb698b7d9e77a3d041794d84b56420fbbf737**. URL: https://github.com/just-every/home/actions/runs/43266034973. Observed at 2026-11-12T17:09:23.071713+00:00. One CI call used of ten; no poll or log-download call was needed because the discovered run had already completed successfully. The PR-triggered duplicate Verify run 43266087998 is skipped by the existing workflow rule and was not used for readiness. Dynamic PR #47 run 43266081586 is success.

Blockers: none. No missing source or eligible withheld version remains. Product is READY for lane review, not accepted, merged or deployed.

### Cleanup and publication sequence

All browser contexts and the production-server PID were closed and waited. node_modules and generated local build/cache output are removed after checks. The final product checkout is removed only after successful evidence publication and the product/evidence provenance checks; the final message confirms that deletion. The public packet remains under /home/agent/rer-consolidation/work/je-sync-23/packet/.
