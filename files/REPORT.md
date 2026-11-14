# je-sync-33 results (2026-11-14T09:53:35Z)

Done: product candidate pushed on cloud/je-sync-33 at 17b30cd333dbc7f0732b0d5c0b30fc6596836aa5. PR https://github.com/just-every/home/pull/57. Exact-SHA CI observation is recorded in ci-receipt.json. No landing or deployment was performed.

## Plan and execution

Followed PLAN.md: initialized fleet launcher/authentication and identity, read AGENTS.md and the sync implementation first, cloned shallow from main 1faa377be04206d8423fdd1c1c39da28a87b1199, installed npm dependencies, and restricted every sync pass to happytohelp,lamp,uptime,oncall,orbit,spool. Later seeds are paused until 25 Nov. No other repository was cloned or written. Read-only source files were fetched through gh api by the committed sync and fresh API probes; the sync internally resolves refs using git ls-remote.

The --copy-only --apply flag only refreshes copy provenance; it preserves public wording and previous brand/home observations. After the mechanical version update, a second copy-only pass aligned HappyToHelp provenance with the new displayed release.

## Initial proposals and final diff

Initial successful dry sync: 1 of 6 seeds changed; 0 unreadable. Its only proposal was HappyToHelp version v0.4.25 to v0.4.26. No mark, colours, status, homepage URL, still, headline, replacement or copy drift was proposed at the originally displayed release refs. All six live homepages were readable. Existing mark/colour/status follow-ups produced no new or recurring findings in this six-seed run; none was invented.

Only three product paths changed:

- src/data/seed-pages.ts:193: HappyToHelp version becomes v0.4.26; all public prose is unchanged.
- public/data/listings.json: matching version plus generatedAt; every other listing field is unchanged.
- scripts/seeds-sync/state.json: HappyToHelp source ref/tag/commit and README/seed hashes advance to the verified release; CONTRACT hash is unchanged. Its reviewed README/seed copy finding is recorded as seen. Spool's previously seen copy-finding key is removed by the full sync because its displayed released source did not change. No Spool public wording or contract status changes. Global syncedAt advances. Other seed records are unchanged.

Per-seed versions:

| Seed | Before | After | Released source commit | Release eligibility |
| --- | --- | --- | --- | --- |
| happytohelp | v0.4.25 | v0.4.26 | 2f597575d4ccb19cdd4cfa0de5e635757737a1aa | non-draft, non-prerelease; rer-release.dsse.json present |
| lamp | v1.11.15 | v1.11.15 | 5dd84e13f6b0478edc2fc5e759d513f5eccf6d57 | non-draft, non-prerelease; rer-release.dsse.json present |
| uptime | v0.5.11 | v0.5.11 | 04016399e1e879e7be3b8e891baf02d975bb3901 | non-draft, non-prerelease; rer-release.dsse.json present |
| oncall | v0.5.13 | v0.5.13 | 8adae6c836f2fabda29e8a091b052450410c8ca5 | non-draft, non-prerelease; rer-release.dsse.json present |
| orbit | v0.4.9 | v0.4.9 | a5f471626aea1bfcb2c79f5dbee2250fdb38fd49 | non-draft, non-prerelease; rer-release.dsse.json present |
| spool | v0.7.11 | v0.7.11 | b9e7e575097e0dd0fc0662ce1ed507fa0d41f0d8 | non-draft, non-prerelease; rer-release.dsse.json present |

## Fresh published-source checks

Each release below was read freshly from GitHub; the source commit is the tagCommit, not an unreleased main head. All six latest published releases carry the required envelope asset. Only HappyToHelp advances. Asset presence and GitHub-provided digest are observed; this builder did NOT rerun cryptographic DSSE signature verification. The brief's earlier pr verification PASS remains a reported prior observation, not this builder's independent result.

- happytohelp: https://github.com/just-every/run-happytohelp/releases/tag/v0.4.26 (v0.4.26), published 2026-11-14T08:04:05Z; envelope sha256:a49abd55a88bc216a4c062e161644573636018d2d0aa4116cdfda282b351e759; current main observed 2f597575d4ccb19cdd4cfa0de5e635757737a1aa for brand-source comparison.
- lamp: https://github.com/just-every/run-lamp/releases/tag/v1.11.15 (v1.11.15), published 2026-11-13T22:24:48Z; envelope sha256:e9081372615ae76b5c832d71c40bf15023d783369fd64e49b762f93b76fa6350; current main observed bef5115afc3972d78962fbb899a2a32433f5f3a6 for brand-source comparison.
- uptime: https://github.com/just-every/run-uptime/releases/tag/v0.5.11 (v0.5.11), published 2026-11-13T15:41:29Z; envelope sha256:e39d196f96f3ca11e5364ba93f5a8e0f59335ca8b689ce514ffaa73ec692cbec; current main observed d47a432be0b9d6b1115de8579e23115b7a123646 for brand-source comparison.
- oncall: https://github.com/just-every/run-oncall/releases/tag/v0.5.13 (v0.5.13), published 2026-11-13T19:42:50Z; envelope sha256:508b92f3243b31a4bd2ff8e2c79c407bc537344ebe0def16d159035d19b9648d; current main observed 54e2434253aeb8510759b15e3589ae2643d02abd for brand-source comparison.
- orbit: https://github.com/just-every/run-orbit/releases/tag/v0.4.9 (v0.4.9), published 2026-11-13T17:49:50Z; envelope sha256:faf934abfc43efb3e167fcecd92f6c78c529fcc323127cd7e757917e2fd8559a; current main observed 7e577833179cbd0fb8db8500b61a8bd0a1d2e56b for brand-source comparison.
- spool: https://github.com/just-every/run-spool/releases/tag/v0.7.11 (v0.7.11), published 2026-11-14T02:29:00Z; envelope sha256:0da3575aaa5b3f982ae20446ba90acb074829f14b1135669c1e9443376b17f89; current main observed e206a1ca9a631059818333837062a90bd225443d for brand-source comparison.

Copy source refs in the initial run were the old displayed tags, including HappyToHelp v0.4.25 at 333af4b0580c4284616783f1d79fcc9aad3aefc5. The final source refs are those in the table; every reason is “released listing version”. The dry-run and apply reports include every full ref and commit.

## Copy review and deliberate withholds

- HappyToHelp CONTRACT.md is byte-identical at v0.4.25 and v0.4.26 (same recorded hash ae8feea8b7998aa7). README.md lines 40–51 change release/health/recovery/migration guidance, and seed.json row 4 changes only version. None proves existing JE prose false. No public claim was edited or broadened; no new recovery promise was imported. happytohelp-copy.diff records the actual source changes; happytohelp-contract.diff is empty.
- The eight existing HappyToHelp partial-evidence promise follow-ups remain: CONVERSATION-001 (CONTRACT row 1204), DELIVERY-001 (1205), OUTCOMES-001 (1208), CONNECTIONS-001 (1210), AI-001 (1212), DELEGATION-001 (1215), IDENTITY-003 (1269), PORTABILITY-001 (1279). Their partial judgments were not promoted. MOVE-IN-001 and REPORTS-001 retain their released-source judgments.
- Terrace trust (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D) remain existing follow-ups. This round changes none of their wording or judgments.
- Uptime, Lamp, Oncall, Orbit and Spool have no newer eligible published release in the fresh read. Preserve v0.5.11, v1.11.15, v0.5.13, v0.4.9 and v0.7.11 respectively; no bare tag or main-only change is a promotion.
- One intermediate final dry capture rendered Lamp without styles, reporting live.page white, live.text black, missing action colour and 35% fingerprint movement. The screenshot confirms an unstyled response; it was not ingested. A fresh complete recheck returned 0 of 6 changed and 0 unreadable. This explains all observed residual drift. Lamp's reel remains unchanged.
- All 43 other listings, including coming-soon/unreleased sources, were deliberately left outside this six-path round under the pause until 25 Nov. Their copy drift was not queried or imported; no claim of a fresh all-seed audit is made.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No galleries, new logos, new captures outside the committed six-homepage sync, design, styles, favicons or existing marks/stills changed.
- Assisted US$10/month and Managed US$100/month presentation is unchanged; no GST or billing-country restriction was introduced. RER inventory and its lagging HappyToHelp version were not changed.

## Counts, clauses and checks

Before and after: 49 total, 35 released, 14 coming soon. Contract/status changes: none. No target acceptance clauses were edited or claimed DONE. No tests were added, removed, skipped or weakened. CI owns the full suite.

- PASS npm ci. The first dry attempt needed global Playwright; playwright@1.63.0 was installed as tooling, with no product dependency changes.
- PASS initial dry sync, copy-only apply, mechanical apply, final provenance apply, npm run listings, npm run listings -- --check, and final fresh dry recheck (0 changes, 0 unreadable). Actual logs and tool reports are retained.
- PASS npm run type-check, npm run lint and npm run build (production). The build had only existing Next middleware deprecation/standalone guidance.
- PASS browser version assertion at 1440; changed-page screenshots at 1440 and 390, both HTTP 200 and no page errors. The proof reads the expected version from the generated public listing. The first browser attempt timed out waiting for networkidle; the successful attempt used DOM readiness and bounded font readiness. No provider or hosted runtime qualification is claimed.
- PASS scope/count/exclusion assertions, git diff --check and touched-diff credential-shape inspection. All candidate authors and committers are Run Edit Run fleet <fleet@runeditrun.com>; no co-author trailers.
- Fleet hooks remain active, including repository lint-staged and LFS pre-push. A local Husky compatibility bridge preserves execution through the original hook path; no tracked hook file changed. First commit was rebased onto freshly fetched origin/main before its first guard push; it was already current. No force push or main push occurred.
- Public publication scan cannot run in this cloud under the adaptation; it remains required on the Mac before landing, along with independent gate and deployed browser verification.

All browsers closed and only the recorded local server PID was terminated. Product checkout deletion happens after evidence transfer and product custody verification. No INBOX or STATE files were read or written.

## Custody and CI

Product branch cloud/je-sync-33; candidate 17b30cd333dbc7f0732b0d5c0b30fc6596836aa5; PR https://github.com/just-every/home/pull/57. product-push.log records PUSH_OK. See pr-receipt.json, identity-check.txt, scope-receipt.json, browser-receipt.json and ci-receipt.json. No unresolved product blocker; source-signature re-verification and Mac gates are explicitly unclaimed, not silently represented as complete.

Exact-SHA CI observed 2026-11-14T09:53:46Z: push Verify branch run 43582553278 completed/success at 17b30cd333dbc7f0732b0d5c0b30fc6596836aa5 (https://github.com/just-every/home/actions/runs/43582553278). Separate pull_request Verify branch run 43582573964 was in_progress; dynamic PR #57 run 43582571910 completed/success. No run was dispatched or rerun. The required branch Verify is green on the candidate; terminal status READY. Remote product ref was independently read back and matches the candidate.

API activity: four manual source/read probes, one PR creation and one exact-SHA run discovery; no CI poll repeats or log-archive downloads. Committed sync commands perform their own authorized source reads.
