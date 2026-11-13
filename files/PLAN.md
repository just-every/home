# je-sync-30 plan
Recorded 2026-11-13T21:17:33Z.

1. Read launcher and home instructions and committed sync modules; install pinned dependencies and preserve repository hooks with fleet cleanup.
2. Run a full dry sync to enumerate all released and coming-soon drift. Read source refs through gh api only (external Git ref adapter, no sync implementation edits); source-file reads use the committed tool and immutable SHA caching.
3. Freshly check the six path seeds' Releases, requiring non-draft/non-prerelease and rer-release.dsse.json asset before retaining a version promotion. Asset presence does not verify a signature.
4. Run copy-only apply; retain provenance only for six path seeds and review any changed released-source claims against current JE wording. Preserve known C/D follow-ups and true copy.
5. Run full apply; restore all non-path changes and any ineligible versions. Preserve existing pricing, exclusions, galleries and clause judgments. Inspect tool output for marks, colours, status and homepage follow-ups; no new design work.
6. Regenerate/check listings, rerun dry sync and explain all withheld drift. Run lint, type-check and production build; capture changed pages at 1440 and 390 if needed.
7. Fetch/rebase current main before first push, audit every candidate identity/trailer and changed paths/secrets, commit with fleet identity/hooks, and push cloud/je-sync-30 via guard. Open requested PR, observe exact-SHA Verify through REST under watcher budget.
8. Write complete reports and receipts, explicitly publish non-secret files to evidence/je-sync-30, relay POST lines, and remove pushed product clone/node_modules after evidence publication. Retain any unpushed work with verified external bundle.

Budget: source sync necessarily reads the 49 declared listing sources; the ten-call budget is reserved for PR/CI administration and failed-job logs, with CI observations at least 300 seconds apart per run. No other repository is cloned, written, or given a PR.
