# je-sync-18 plan

1. Set fleet identity/authentication and read launcher/repository rules and committed sync implementation.
2. Fresh shallow main clone; npm ci; install preserving commit hook. Run full dry sync and preserve all findings/source refs. Non-product refs are supplied through a task-local git ls-remote adapter backed only by gh api, to honor read scope without changing sync code. Immutable source contents and initial ref observations are cached outside the product checkout for repeatability.
3. Run copy-only apply; review reported drift at displayed release boundaries and newly eligible release sources. Preserve true wording and all clause judgments; record unreleased drift without importing it.
4. Confirm non-draft/non-prerelease Releases and rer-release.dsse.json presence for proposed versions; distinguish asset presence from signature verification. Full mechanical apply; retain eligible in-scope updates only. Record deliberate holds. No gallery import/redesign.
5. Regenerate/check listings; repeat dry sync, explaining every remaining finding. Type-check, lint, production build. Inspect diff/path scope/secret hygiene; browser proof at 1440/390 for changed screens.
6. Fetch/rebase fresh main before first product push. Fleet identity/hooks on every commit; scan every candidate commit and message. Push cloud/je-sync-18 through guard, open specified PR, inspect exact-SHA Verify via REST within CI budget.
7. Publish complete explicitly selected non-secret reports/receipts to evidence/je-sync-18; report custody separately from READY. Delete product clone and node_modules after successful preservation.
