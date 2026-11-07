# je-gate-19: independent deciding gate for PR #35

Decision: GATE PASS for **025b26efa66630787eaf2fb5bf0549ac5ec6732c**.

Repository: just-every/home. Candidate branch: cloud/je-sync-11. PR: https://github.com/just-every/home/pull/35 (open, exact pinned head confirmed). Baseline main: 706ef98b603a948b1352be2089ccf614e6f16aca. Gate branch cloud/je-gate-19 was created locally at baseline as required by cloud setup; it has no product commits and is not pushed. Checks used a detached checkout of the exact candidate. The candidate's only commit has baseline as its sole parent.

No findings, follow-ups, blockers or JE clause/status changes. This gate permits the lane to continue its existing landing process; it does not merge, deploy, or waive the Mac publication scan.

## Plan and execution

1. Configure fleet identity and the launcher's injected-bundle Git helper; read launcher AGENTS.md, repository AGENTS.md, the inline RULES.md and builder brief. Use the cloud-runtime skill for environment and package guidance. Do not inspect provider credentials, ~/.env, lane INBOX/STATE, other product checkouts or private gate material.
2. Fresh shallow/filter clone of just-every/home; preserve baseline main, fetch pull/35/head, check out the pinned SHA. Read PR metadata and the named exact-head Verify once. Stop if PR head differs.
3. Freeze the candidate diff, all candidate commit identities/messages/trailers, source selection and sync algorithm. Independently fetch changed seeds' old/new commit objects and three copy files using gh api GraphQL only. Verify public visibility, exact commit existence, default HEAD, empty tag sets, and exact blob bytes.
4. Run npm ci, replay the unchanged exported copy detector against actual source bytes and baseline/head state, run listings check/write, type-check and lint, and check generated public data, exclusions, pricing/source-tree equality and clean worktree. No application/network stubs, writes to product files or new permanent tests.
5. Save actual non-secret reports, source hashes and command receipts in packet/. Publish only the explicitly selected report files to evidence/je-gate-19 using cloud_evidence.py. Verify report transport independently, then delete the product clone and node_modules. Preserve packet and terminal product provenance.

## Frozen rubric

| Row | Status | Command/probe | Observed result |
| --- | --- | --- | --- |
| R1 Scope | MET | `git diff --name-status 706ef98b603a948b1352be2089ccf614e6f16aca HEAD`; parsed state delta; `git diff --check`; `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`; full candidate message/parent inspection | Exactly scripts/seeds-sync/state.json, 8 insertions and 8 deletions. Eight scalar changes: timestamp, four commits, three CONTRACT.md hashes. No tests or implementation touched. Both author and committer Run Edit Run fleet <fleet@runeditrun.com>, no trailers or coauthors, one direct-parent commit. Changed values are strictly timestamp/hex digests; no credential-shaped addition. |
| R2 Provenance truth | MET | `gh api graphql -F query=@source-query.graphql`; Git blob-object ID/byte-size validation; `node --import tsx ../replay.mjs <clone>` calling repository `copyHashes`, `detectCopy`, `loadSite` | Four public repositories, all recorded commits exist and equal current default-branch HEAD, no tags. All 24 before/after copy blobs reconstruct their API Git object IDs. All 12 old and 12 new state hash values match the actual sync hash function. Real copy detector returns 3 baseline findings and 0 candidate findings, explained below. Open findings, overrides and detector code unchanged. Public wording never imported. |
| R3 Public data unchanged | MET | `npm ci`; `npm run listings -- --check`; `npm run listings`; `npm run type-check`; `npm run lint`; `git diff --exit-code HEAD -- public/data/listings.json`; `python3 packet/surface-probe.py <clone>` | All exit 0. npm ci added 726 packages. Listings current/unchanged (49 seeds); generator produces no diff. Before/after: 49 listings = 35 released + 14 coming soon. All eight excluded seeds absent. src/, public/, tests/ and all sync implementation trees are byte-identical to baseline, so prices, versions, status, wording, mark, colour and homepage presentation are unchanged. |
| R4 Exact-head CI | MET | `gh api repos/just-every/home/actions/runs/42418959568 --jq '{id,name,event,status,conclusion,head_sha,html_url}'` | Verify branch, push event, completed/success, head_sha 025b26efa66630787eaf2fb5bf0549ac5ec6732c. https://github.com/just-every/home/actions/runs/42418959568. One observation, no dispatch/rerun/watcher. |

## Per-seed parsed delta and source basis

All four remain coming-soon, sourceRef HEAD, sourceReason "coming-soon seed; no release tag", tag null. Each default branch is main, with an empty complete tag list. README.md and seed.json hashes remain unchanged in every seed. source-receipt.json records full commit metadata, complete SHA-256 hashes, Git blob IDs, byte sizes, refs and public visibility; copy-replay.json records actual detector results.

| Seed | Prior commit -> recorded commit | CONTRACT.md copy hash | Explanation |
| --- | --- | --- | --- |
| Crank | c16d7b09492b2c61c4cbfb4c0f892be6b0e9c1ef -> 97dbba76c57a620110886e92a959fbf15b07d3d0 | e3dec2a78eefc328 -> 01dcf1fbed0c384d | Source BASE-AGENT-013 evidence/gap prose changed; partial status retained. Coming-soon implementation/evidence drift recorded only; JE wording untouched. |
| Mallet | 1331aef49644cea21ff44371ae4d7218bb588646 -> 05f12bb25287d22654fda8b2a549712d14e94c1c | 06599a1925257db8 unchanged | Source HEAD advanced; all three copy files byte-identical. Commit provenance refresh only; never contributed a copy finding. |
| Placemat | 7736720683b5d4d9236cecf9434a64b3ed84a61e -> 187fa5c3720adb99a25412f029821a840d950867 | 8670c33f798e4707 -> 2fc8167189ba0379 | Source GUEST-006 changed missing -> partial, associated summary counts changed, BASE-AGENT-013 evidence/gap changed. This is upstream context only; JE status/wording unchanged and unreleased claims withheld. |
| Platter | 696c5253a2a06ba928c1e6f5457b4d4e10aa7e1a -> b384813c64c78665f189b5aa1f6b8f2c0fca79da | f11a88e1690bbbd0 -> 20c37e54ecce40a0 | Source PAY-005 changed missing -> partial with limited deposit-notice evidence and retained gaps/holds; summary counts changed. This is upstream context only; JE status/wording unchanged and unreleased claims withheld. |

The sole global change is syncedAt: 2026-11-06T21:06:54.134Z -> 2026-11-07T22:00:48.037Z. Every other state property, including brand, mark, home and open-finding arrays, is unchanged. No releases, promotions, version changes, asset changes or public claim edits were made. No findings were removed by changing detection rules or open lists.

## Independent detector replay and public doors

The touched change is copy provenance. The gate fetched the exact old/new copy sources through one batched gh api GraphQL request (request included as source-query.graphql). Buffer bytes reconstructed from the API text reproduce every Git Blob oid and byteSize, then the repository's unchanged copyHashes computes the exact state values. The unchanged detectCopy runs with actual loadSite seed entries and source buffers, first against baseline state (Crank, Placemat and Platter: one CONTRACT.md finding each; Mallet: none), then candidate state (all four: none). There is a recorded hash and commit basis for each disappeared finding.

This is a deterministic replay of the copy detector on the entire touched surface, not a claim to have run a new network/browser sync of every seed. A full live sync is not a frozen-rubric requirement for this provenance-only gate and would exceed the ten-call GitHub budget; it also re-observes unrelated live assets. No fallback files, application mocks, service stubs or modified detector paths were used.

The builder points are covered proportionally: (1) enumerate all touched proposals with verified source refs; (2) verify copy-only state against real copy sources and prove no imported wording; (3) prove zero public/release/asset changes and retained exclusions; (4) independently regenerate/check the public listings door and reproduce the explained 3 -> 0 copy delta; (5) type-check and lint pass. The gate brief explicitly waives a production build because no served file changed. No UI route/screen is touched, so there is no changed-screen browser proof to produce. Public listings output is the relevant public data door; it has SHA-256 790e115fdf755eea1212b68df6df033fb9d2467dbff94cad0f61ad2928544bc8 both before and after.

Repository applicability checks: no CONTRACT.md/Product target table/incumbent, sources.lock.json, ACCEPTANCE.md or docs/CLAIMS.md exists; AGENTS.md/package scripts define no source-lock or contract-view regeneration/check. SQL migrations exist but no migration-ledger check is defined, and the migrations are unchanged. These seed-specific steps are not applicable. The public listings generator is present and was independently run in both check and write modes. No stale-listings/pre-gate refusal condition exists.

The comparison proves all pricing/presentation sources identical to baseline; it does not invent or change pricing copy. Both snapshots exclude Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen. All four touched seed listings retain coming-soon. No JE clause status changes: none before -> none after.

## Custody and limits

Three gh API invocations total of ten allowed: PR metadata, named Verify run, batched source GraphQL. Other source repositories were neither cloned nor written. No CI reruns, dispatches, PR comments, merges, product pushes, deployments or provider operations. No servers or browsers started. No product changes, commits or READY/PUSHED claim for cloud/je-gate-19. Evidence publication is report custody only and does not signal product readiness or landing.

The lane retains its Mac publication scan and landing/deployment/live-verification duties. This report adds no findings or obligations beyond the frozen rubric. Full machine-readable checks and provenance are in gate-receipt.json, source-receipt.json, copy-replay.json and the actual logs. The report transport manifest binds its product_head to the exact detached candidate; product_branch is empty by design. Cleanup follows successful evidence transfer and verification.

GATE PASS 025b26efa66630787eaf2fb5bf0549ac5ec6732c
