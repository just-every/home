# je-gate-36 independent gate plan

Fixed candidate: PR #52, cloud/je-sync-28, 181ca0a1b0d41af1dc4b9566412fc64f11267787.
Baseline: origin/main 42d2b3bfd372f151c993e36128249d7e059091de.

1. Set fleet identity, refresh only the authorized launcher bundle, install the shared Git helper and preserve repository hooks. Never use provider credentials or change the product. Use only the declared home clone; other repositories are read through gh api.
2. Read PR identity and exact base/head; create a fresh shallow, blob-filtered home clone. Retain origin/main and check out the fixed candidate detached. Read home AGENTS.md and the shipped gate/builder/rules references.
3. R1: enumerate all changed paths and candidate commits, inspect every hunk and trailers, scan the touched diff for credential shapes, and classify state changes against the sync implementation. Confirm no test changes or wording imports.
4. R2: read Spool releases once, confirm eligible v0.7.9 and the envelope asset, resolve its annotated tag to the source commit, and read release-pinned CONTRACT.md/README.md/seed.json. Independently match provenance hashes and version agreement. Compare every other listing exactly.
5. R3: npm ci; listings check; listings write and verify zero diff; type-check; lint; production build. Count public entries and excluded seeds. Inspect unchanged pricing implementation without inventing missing statements.
6. Use the actual production Spool route /spool. Assert the candidate public page/data at 1440; capture candidate and baseline at 1440 and 390, compare visible content/geometry and inspect screenshots for layout regressions. Stop only the server/browser PIDs started here.
7. R4: one REST discovery of exact-head runs. Require completed/success Verify on the exact SHA. No dispatch, rerun, PR writes or product push.
8. R5: read Spool status rows and JE sentences, applying the frozen truth standard. Partial evidence alone is no finding. Record any actual false claim with exact sentence/clause; do not reopen known pre-existing follow-ups.
9. Source-lock/contract-view/migration-ledger regeneration is applicable only when home documents such tools. Record N/A if absent, rather than running seed tooling in another repository.
10. Save a complete non-secret report, receipts and browser proof in this packet. Publish explicitly selected files only to evidence/je-gate-36 through cloud_evidence.py. Confirm the product index/tree/head remained unchanged. Delete the clone and node_modules after transfer. Report the verdict and inbox relay lines, with no product READY claim from a gate-only run.

GitHub REST budget: ten calls total. One watcher only; if a run needs polling, at least 300 seconds between calls. Actual calls recorded in api-receipt.json.
