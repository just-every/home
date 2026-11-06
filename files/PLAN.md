# je-sync-10 plan

1. Read launcher rules, repository AGENTS.md and the committed sync sources before installing with npm ci.
2. Run the complete dry sync and preserve its actual report and all source refs. Use the provisioned Chromium, without adding a gallery or design campaign.
3. Run copy-only apply after confirming it records provenance only. Compare released copy changes against the displayed release's CONTRACT.md, README.md and seed.json. Retain true public wording; record coming-soon drift without importing it.
4. Inspect actual mechanical findings. Check every proposed version/status promotion against a published non-prerelease GitHub Release with rer-release.dsse.json; record asset presence separately from signature verification. Apply only eligible changes, preserving exclusions, pricing, accepted branding and gallery custody.
5. Generate and check listings, repeat dry sync, explain withheld/repeated/unreadable findings. Check changed paths against the explicit scope.
6. If changed, run type-check, lint, production build and relevant browser proof if a screen changes; install fleet hooks, commit with fleet identity, refresh main before first push, inspect all candidate identities/trailers, guarded push and one PR. Observe exact-SHA Verify through REST with a bounded budget. No merge/deploy.
7. Write actual reports/receipts outside product history, publish explicitly selected evidence files on evidence/je-sync-10, and return provenance plus the lane POST line. Delete clone only after product custody and evidence publication have succeeded; retain unpushed work on any failure.

Source reads: the committed sync invokes git ls-remote for refs. A task-local shim outside the repository translates only those seed ref queries to gh api, as required by the read-only other-repository rule. Other Git operations use /usr/bin/git. Each gh process loads only GH_TOKEN from the decrypted fleet bundle privately. No sync implementation is edited.
