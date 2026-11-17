# je-deps-1 plan

1. Start from a fresh shallow main checkout and restrict product changes to package.json and package-lock.json.
2. Record the complete npm audit baseline and dependency versions. Upgrade Next only within 16.4.x; retain OpenNext compatibility. Update existing vulnerable overrides and use targeted lockfile updates for the rest. Add an override only when dependency ranges cannot reach a patched version.
3. Run npm ci, type-check, lint, tests, brand and listings checks, Next production build, Cloudflare production build, and full plus production-only audits with Node 22 and npm 10.9.3. Execute heavy steps directly in this dedicated cloud VM through cloud_run. Do not use provider credentials or deploy.
4. Inspect all product diffs, identity, trailers, and unchanged source/data. Commit with the fleet hooks and identity; push only cloud/je-deps-1 with the fleet guard. Open one PR to main with the requested title.
5. Observe exact-SHA Verify through the GitHub REST API within the ten-call budget and five-minute polling limit. Record actual status without inferring success.
6. Keep complete non-secret report and receipts outside the product tree, publish the explicitly selected packet only on evidence/je-deps-1, then remove the successful disposable clone and node_modules. Keep a verified bundle if publication is blocked.

No CONTRACT.md exists; no clause judgments or generated views are in scope.
