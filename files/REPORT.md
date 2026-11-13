# Done: je-sync-26

Repository: just-every/home
Product branch: cloud/je-sync-26
Product head: 0396a50284d16568b52f397e13787cf9440f3ad5
Base: 7212b2fd1cb0bfe9241752dc64d37a407f0b004f
PR: https://github.com/just-every/home/pull/50
Disposition: pushed candidate; exact-SHA push Verify succeeded. Landing hold, independent deciding gate, publication scan, merge, deployment and live verification remain with the lane.

## Plan and completion

The full initial plan is in PLAN.md. Execution completed the authorized sequence: fleet/launcher/toolchain setup; fresh shallow filtered main clone; AGENTS.md and sync-tool review; locked dependency installation; initial full dry sync; copy-only provenance apply and released-copy review; Release eligibility check; full mechanical apply; new-tag copy provenance recording; listings regeneration/check; final full dry sync; type-check/lint/production build; fetch/rebase, identity/trailer/scope/credential-pattern audits; fleet-guard push and PR; candidate browser proof; exact-SHA REST CI observation; separate report-only evidence publication. The product contains no fleet reports or receipts.

No seed contract or generated contract view exists in the changed tree. No seed implementation status was promoted. No RER inventory work, gallery ingestion, redesign, new art, capture campaign, merge or deployment was performed.

## Counts and dry-sync output

Before: 49 listings, 35 released, 14 coming soon.
After: 49 listings, 35 released, 14 coming soon.
Updated released versions: 4. Status promotions: 0. Public prose edits: 0. Clause status changes: 0.

Initial completed full dry run:
- Dry run: 4 of 49 seeds changed. Zero unreadable.
- Uptime: version newer tag v0.5.10 (page shows v0.5.9) [to apply].
- Lamp: version newer tag v1.11.14 (page shows v1.11.13) [to apply].
- Orbit: version newer tag v0.4.8 (page shows v0.4.7) [to apply].
- Oncall: version newer tag v0.5.11 (page shows v0.5.10) [to apply].

Initial copy-only apply: 0 of 49 seeds changed. This flag records copy provenance only and preserves public wording and brand/home observations.
Full apply: the four version findings above applied.
After changing displayed versions, copy-only apply on those four recorded the new released source hashes. Lamp/Orbit changed README.md and seed.json; Uptime/Oncall changed CONTRACT.md, README.md and seed.json. All were reviewed; wording retained.
Final full dry run: 0 of 49 seeds changed. Zero unreadable. No unexplained or recurring finding remains.

Full actual logs and Markdown/JSON reports are supplied for every completed run. The first dry run stopped before any product changes because Playwright was absent; installing playwright@1.63.0 globally and using provisioned /usr/bin/chromium with --no-sandbox resolved it. Its failed log is retained separately.

## Sources and per-seed changes

Every version import passed the standing RELEASED rule: the GitHub Release is non-draft and non-prerelease and carries rer-release.dsse.json. This checks envelope-asset presence only; no cryptographic signature verification was performed.

| Seed | Before | After | Release commit | Release URL |
| --- | --- | --- | --- | --- |
| Lamp | v1.11.13 | v1.11.14 | 733e2ce1e2fc618183a93632218bb86456a06a79 | https://github.com/just-every/run-lamp/releases/tag/v1.11.14 |
| Uptime | v0.5.9 | v0.5.10 | bd7b21317cae0ae0082fa88127cef6842c377504 | https://github.com/just-every/run-uptime/releases/tag/v0.5.10 |
| Oncall | v0.5.10 | v0.5.11 | 457a0a194a0dc97f653cdc12224cae27b6f1a79f | https://github.com/just-every/run-oncall/releases/tag/v0.5.11 |
| Orbit | v0.4.7 | v0.4.8 | 0e9e55cf150dfcc781d1d9e62b2d88c15c9b6a63 | https://github.com/just-every/run-orbit/releases/tag/v0.4.8 |

The displayed-version source boundary moved from:
- Lamp e82bc349b98af44c440efa2960927e327deda1a5.
- Uptime 88c586f6fabdaed6768ddc8072af2340310a7ace.
- Oncall 1dc0069324de17933e7b65bffefa14de7dabea9a.
- Orbit eab0faafccd2eb0945dddb7d0f52c30ce573c04c.

release-receipt.json records publication times, envelope filenames, asset metadata and release refs. released-sources.json and the actual released source text preserve the read evidence. The initial/final reports list all 49 copy source refs, full commits and reasons. No other newer tag or eligible release update appeared in the complete sync.

Per-seed product change: each of the four has one version literal in src/data/seed-pages.ts and the corresponding version in public/data/listings.json changed, plus released source ref/commit/hash provenance in scripts/seeds-sync/state.json. The state also clears HappyToHelp's previously recorded copy-finding key after the complete run observed no outstanding source drift. The four reviewed new-source copy findings are recorded in state. No art, brand token or homepage observation changed. listings.json generatedAt and state syncedAt are regenerated.

Only changed paths:
- public/data/listings.json
- scripts/seeds-sync/state.json
- src/data/seed-pages.ts

product.diff and data-receipt.json prove all other listing fields and all page prose remain identical. The commit contains 41 insertions and 38 deletions.

## Copy decisions and withheld items

COPY-REVIEW.md gives the per-seed review and exact released file/row references. Four saved released-copy diffs show the actual old/new source changes. No newly false public sentence was established, so no wording was edited.

Lamp's contract is unchanged between these release tags. Its eight listed partial follow-ups remain partial. Uptime's new contract adds bounded evidence without qualification or promotion; STATE-001 and NETWORK-001 remain partial. HappyToHelp remains v0.4.23, with the eight named partial follow-ups retained. Terrace remains v0.1.4: the broad claim mapping is partial while the more specific released ACCT-001 and ACCT-006 judgments are done; ACCT-012 remains partial. The older README limitation conflicts with those specific later contract judgments, so it was not used to invent a new correction or override a judgment. Existing wording and the follow-up stay.

Deliberately not imported:
- No new mark, colour, homepage/still, headline, replacement or status drift was proposed by the actual tool. No manual redesign or source re-interpretation was added.
- No coming-soon copy drift appeared; no default-branch/unreleased copy was imported.
- Auth remains coming soon by owner override; no tagged upcoming seed is promoted.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent.
- Existing pricing remains Assisted US$10/month and Managed US$100/month, with the accepted presentation and no added GST or billing-country language.
- No galleries are ingested; gr's capture custody and RER inventory gaps remain outside scope.

## Validation and browser evidence

Passed: npm ci; npm run listings; npm run listings -- --check; final full seeds:sync; npm run type-check; npm run lint; npm run build; diff whitespace/scope/credential-pattern audit; all-candidate author/committer/trailer audit. No permanent tests or full local test suite were added or run. Existing lint-staged ran successfully on commit.

The first commit attempt was refused before a commit existed because the supplied fleet symlinks caused Husky to look for its relative h helper under the fleet directory. Clone-local hook dispatch wrappers were repaired to exec each original hook by its original path. Both fleet commit-message cleanup and original Husky hooks remained active; nothing was disabled or bypassed.

Browser proof uses the actual production build and Chromium at /usr/bin/chromium with --no-sandbox. Lamp, Uptime, Oncall and Orbit each have one full-page screenshot at 1440 and 390. Assertions at 1440 check HTTP 200, the exact version in the rendered definition list, and no horizontal overflow. All passed. All eight screenshots were visually reviewed; the version labels are readable at both widths.

The first browser attempt timed out waiting for networkidle before writing a screenshot. DOM/font readiness plus local DB initialization allowed the successful run. No application path was mocked. This is candidate rendering proof, not provider/deployment qualification; existing external video loading spinners can appear on their posters. All browser contexts closed in finally, and the recorded task server received SIGTERM and exited.

## Product publication and one CI observation

First push succeeded on attempt 1 through cloud-push.py:
git push --porcelain origin HEAD:refs/heads/cloud/je-sync-26
PUSH_OK branch=cloud/je-sync-26

Fresh main was fetched and the unpublished candidate rebased onto origin/main before first push; base was unchanged. All candidate commits, including side parents, passed fleet identity and trailer inspection. One product commit, fleet author and committer, no co-author trailers. The working tree is clean.

One REST discovery call for the exact full SHA returned:
- Verify branch, push run 43386406510: completed/success, head 0396a50284d16568b52f397e13787cf9440f3ad5. https://github.com/just-every/home/actions/runs/43386406510
- Verify branch, pull_request run 43386457193: pending at that observation. The cloud-branch PR job is redundant with the push entry under its existing workflow condition; no green result is claimed for this run.
- PR #50 dynamic run 43386457973: completed/success on the same SHA.

ci-discovery.json and ci-observation.json retain the actual response and observation. No run was polled twice; there were no failed assertions or failed-job archive calls. The push Verify's success qualifies READY for this exact candidate; no result from another SHA is used.

## Return and remaining custody

No builder blocker remains. Full actual non-secret reports, receipts, released-source evidence, diff and eight candidate screenshots are selected explicitly for evidence/je-sync-26 via the separate cloud_evidence.py entrypoint. Evidence transport does not signal acceptance, landing or deployment.

The packet remains under $HOME/rer-consolidation/work/je-sync-26/packet/. After successful evidence publication/verification, the product clone and node_modules are removed as requested. The lane retains its landing hold and all independent gates.
