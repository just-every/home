# je-gate-65 — independent deciding gate of PR 81

Author: Codex independent gate. Recorded: 2026-11-20T18:16:03Z.

Decision: PR https://github.com/just-every/home/pull/81 may land under the frozen rubric. R1–R5 are MET. No new blocking issue or new C follow-up was found. One known, pre-existing D copy follow-up is re-listed. Product files and clause statuses were not changed.

Candidate branch: cloud/je-sync-55. Candidate HEAD: 65fe10485fe75a1d0ffa4e801750bbdc6b788150. Baseline origin/main and PR base: b77f3d58fd67ee248394bfdb5f0671b55fe31719. The fresh PR response confirmed that exact open, non-draft head and base. A terminal Git ref probe independently confirmed the same main and candidate branch tips. No product cloud/je-gate-65 branch or PR was created: the gate's specific read-only assignment governs product custody. The only requested publication is the separate evidence/je-gate-65 report ref.

## Plan and execution boundaries

1. Configure the fleet Git identity. Read launcher instructions without refreshing credentials. Fresh shallow, blobless clone of the declared repository, retaining baseline main; fetch pull/81/head and check out the exact candidate.
2. Read AGENTS.md, package scripts, Verify workflow, listings generator and sync copy/open-marker implementation. Compare every hunk and every candidate commit against main.
3. Read the public PR, exact-head CI runs, release metadata once, and Spool's public tagged CONTRACT.md, README.md and seed.json at both versions. Independently peel both annotated release tags over Git.
4. Run only npm ci, the two named listings commands, type-check, lint and production build, sequentially. Probe the built real /spool route with Chromium at 1440 and 390. Assert the flow only at 1440 and inspect both responsive captures.
5. Preserve actual public receipts and screenshots outside the product clone, publish only the selected packet through the supplied evidence entrypoint, stop the owned server/browser, and delete the disposable clone and node_modules after report transfer. No product fixes, commits, pushes, merge, comments, deploy, provider credentials, watchers or CI dispatch/rerun.

All product/source/API reads were unauthenticated public HTTPS or Git; no launcher refresh or credential was used to obtain evidence. Three GitHub REST calls total: PR, exact-head actions runs, release. The public-source receipt records each URL and its returned facts. Public REST was read directly without gh so the gate's explicit no-credential rule remained effective. No additional CI poll was needed.

## R1 — MET — Scope, identities and every hunk

Commands: git diff --stat origin/main HEAD; git diff origin/main HEAD; git log origin/main..HEAD with author, committer, full messages and unfolded trailers; semantic JSON comparison and credential-shape scan of the entire delta.

Exactly three paths differ (11 insertions, 10 deletions). No tests or assertions were deleted, skipped or weakened. One candidate commit exists, directly parented by the required main; both its author and committer satisfy the fleet identity policy, and it has no trailers or Codex co-author. No credential-shaped values were found by token/private-key pattern checks and manual hunk inspection. Receipts intentionally omit all email addresses.

- public/data/listings.json: generatedAt advances from 2026-11-20T12:06:19.165Z to 2026-11-20T17:53:18.796Z; the Spool listing version alone moves v0.7.15 → v0.7.16. Every other listing field and every other listing are unchanged.
- src/data/seed-pages.ts: the Spool page's version string alone moves v0.7.15 → v0.7.16. No public wording, promise, status or layout changed.
- scripts/seeds-sync/state.json: syncedAt advances; Spool commit advances bb2efcd34837cd6067d02ce176609d3fc636dad2 → 804a4ad15e6c8e1c52f0069dcf610ba1f5d2342c, sourceRef/tag advance to v0.7.16, seed.json hash advances 665317811e8d8aef → e12b3e10eb61e0ee. CONTRACT.md and README.md hashes, brand, marks and homepage fingerprints are unchanged. The only other state delta is Oncall's open-marker removal. This is provenance and tool bookkeeping, not wording.

Marker proof: detect/index.mjs keyOf is the first 12 SHA-256 hex characters of type + ':' + summary. detect/copy.mjs summaries list changed copy source filenames. Independently hashing `copy:seed.json changed since the last sync` gives 64cb07f6a0dd, the added Spool marker. Both public seed.json files differ only in version, giving exactly the recorded hashes. Hashing `copy:CONTRACT.md, seed.json changed since the last sync` gives 922fed04eacf, the removed Oncall marker. Oncall's source commit and all three copy hashes were already current on baseline and are unchanged by this candidate. A later full apply recomputes `open` from currently unapplied findings through closeRecord rather than indefinitely retaining historical copy findings; with no newly differing Oncall copy hash, the old two-file notification drops. The unrelated bf4b3f38e1a2 marker remains. No claim is made that dropping a notification fixes an Oncall product or copy issue.

## R2 — MET — Release truth and unchanged catalogue

Commands: unauthenticated GET https://api.github.com/repos/just-every/run-spool/releases/tags/v0.7.16 (one read); git ls-remote --tags for v0.7.15/v0.7.16 and their peeled refs; tagged raw source reads and semantic listing comparison.

Release https://github.com/just-every/run-spool/releases/tag/v0.7.16 is published 2026-11-20T15:29:27Z, draft=false, prerelease=false. Its asset list includes rer-release.dsse.json (3105 bytes). This proves envelope asset presence only; no signature verification is claimed. Git independently gives annotated tag d7bc1dee9b7035e1f4beceee3db1c41952b7a3e3 peeling to 804a4ad15e6c8e1c52f0069dcf610ba1f5d2342c. Prior annotated tag 0da50091459def6d624eb21ef2157c0a07b14cc9 peels to bb2efcd34837cd6067d02ce176609d3fc636dad2. Those exact commits match state provenance; listings and seed-pages agree on v0.7.16, whose tagged seed.json says 0.7.16.

No other seed version, release status or listing content changed. HappyToHelp v0.4.31, Lamp v1.11.24, Uptime v0.5.18, Oncall v0.5.21 and Orbit v0.4.12 are preserved. No coming-soon wording was imported. No gallery or imagery was ingested. No additional release scope was added by this gate.

## R3 — MET — Data and built public render

Actual commands/results:

- npm ci: exit 0, 715 packages installed; repository prepare hook ran.
- npm run listings -- --check: exit 0, Listings current (49 seeds).
- npm run listings: exit 0, Listings unchanged (49 seeds).
- git diff --exit-code after generation: exit 0.
- npm run type-check: exit 0.
- npm run lint: exit 0.
- npm run build: exit 0, production compilation/type generation and all 61 static pages completed.
- Production Next server on owned local port 3871, Chromium at /usr/bin/chromium with --no-sandbox, fresh contexts: HTTP 200 /spool, correct Spool heading and visible v0.7.16. Desktop flow asserted at 1440 only. Both 1440 and 390 proof captures visually inspected, version readable, no layout break; observed scrollWidth/clientWidth 1440/1440 and 390/390, with no browser page errors. Browser and owned server were closed.

Before and after: 49 = 35 released + 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Pricing is unchanged: the complete delta changes no price, assistance plan, currency, tax or country wording. The brief's Assisted US$10/month and Managed US$100/month policy was not edited; those statements are not displayed on the affected /spool page, so no claim of rendering those plan labels is made.

Initial browser navigation waited for `networkidle` and timed out after 30 seconds; it produced no content assertion result. The retained browser-initial-receipt.json records it. Repeating the same built route with DOM-ready navigation, fonts ready and heading visibility passed and produced the actual screenshots. No product change was made. Build emitted the existing Next middleware-convention warning; it did not fail.

This repository has no CONTRACT.md, sources.lock.json, documented seed contract-view/source-lock generator, or migration-ledger checker. Those seed-specific independent-evidence commands are inapplicable here. The documented listings generator was independently checked and regenerated without a diff. The gate did not run the full test suite or seed sync/capture campaign beyond the named checks.

## R4 — MET — Exact-head CI

Command: unauthenticated GET https://api.github.com/repos/just-every/home/actions/runs?head_sha=65fe10485fe75a1d0ffa4e801750bbdc6b788150&per_page=100 (one read).

Verify branch push run 44787789105 is completed/success on exact SHA 65fe10485fe75a1d0ffa4e801750bbdc6b788150: https://github.com/just-every/home/actions/runs/44787789105. The workflow includes install, lint, type-check, tests, brand check, listings check and Cloudflare production build. PR-triggered Verify run 44787851273 is completed/skipped by the documented cloud-branch duplicate guard, not a red Verify. Dynamic run 44787843142 is completed/success; it is not substituted for Verify. No run was dispatched or rerun and no other SHA was used.

## R5 — MET — Released-source claim honesty

Commands: public raw HTTPS reads of CONTRACT.md, README.md and seed.json at v0.7.15 and v0.7.16; full file comparison, SHA-256 truncation as the sync tool uses, reading the status table and the complete JE Spool entry.

CONTRACT.md is byte-identical across the release (325429 bytes, SHA-256 prefix ee9c871bfa25a110). README.md is byte-identical (16991 bytes, a9c5f1be825c6da3). seed.json changes only its version; no new promise or contract judgment was introduced. Thus the contract diff is empty, not unread. The status table records ERR-001/002/003/004/006/007/008/009 done; ERR-005 partial, with expanded lookup/capacity/provider work in its gap. Partial evidence alone does not establish a false JE sentence. The reviewed JE promise cards map to ERR-003, ERR-004, ERR-002, ERR-006, ERR-007 and ERR-008; source mapping and archive prose relate to ERR-005 and ERR-009. No new false claim was identified on this version-only delta.

The named incumbent set in Spool's Product target table is Sentry, Datadog Error Tracking, Rollbar and Bugsnag (SmartBear). The unchanged ERR-006 text distinguishes resolution in a release from SDK-009 plain Resolve; SDK-009 explicitly follows Sentry for plain Resolve. No wider incumbent audit or seed implementation suite was added.

OUT OF SCOPE D: known pre-existing Spool ERR-006 copy caveat, inherited from main. Exact JE sentence: "Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm." Source CONTRACT.md ERR-006 requirement at line 157 and SDK-009 requirement at line 466 distinguish current/named release resolution from plain Resolve; SDK-009 acceptance point 5 says a plain-resolved issue with a same-release recurrence is Regressed. Trigger: plain Resolve followed by an accepted same-release event. The JE sentence's unconditional "only" omits that mode. Both JE copy and both tagged contracts are unchanged by PR 81. Re-list for a separate copy round; it does not block or add a new C finding here. Other named historical follow-ups were not touched and were not re-audited.

## Results and custody

All five frozen rows MET. Blocking findings: 0. New C follow-ups: 0. Known D items re-listed: 1. Clause status changes: none. JE listing counts: 49/35/14 → 49/35/14. Spool public version: v0.7.15 → v0.7.16. All actual non-secret receipts and screenshots are selected explicitly for separate evidence publication. No product branch push, READY claim, acceptance promotion or landing is made by this report.

Product verdict: GATE PASS head=65fe10485fe75a1d0ffa4e801750bbdc6b788150
