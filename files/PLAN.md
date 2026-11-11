# je-sync-17 plan

1. Configure fleet identity, credential helper, push guard and commit-message cleanup; read launcher and home AGENTS.md plus committed sync implementation.
2. Install locked dependencies, run complete dry sync with system Chromium, retain reports and source refs. Use gh api exclusively for other repositories, translating the sync tool's ref reads outside the product checkout without changing its implementation.
3. Run copy-only apply and compare released copy to existing JE claims. Preserve true wording and implementation judgments; record unreleased drift without importing it.
4. Validate every proposed version/status change against a non-draft, non-prerelease GitHub Release with rer-release.dsse.json; asset presence is not cryptographic signature verification. Run mechanical apply, withhold unsupported changes and inventory regressions.
5. Regenerate listings and check, repeat dry sync, review all residual findings. Preserve excluded seeds and accepted pricing. Run type-check, lint and production build; browser proof at 1440 and 390 for changed screens.
6. Rebase fresh main before first publication, inspect all candidate identities/trailers, commit only authorized paths and push cloud/je-sync-17 using cloud-push.py. Open PR and observe exact-SHA Verify through REST within ten CI calls and 300-second poll spacing.
7. Preserve complete non-secret report and actual receipts outside product checkout, publish selected files on evidence/je-sync-17, report exact product/evidence custody and lane POST. Remove clone and node_modules only after successful product and evidence publication.
