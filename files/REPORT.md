# je-deps-1: security dependency update

UTC report time: 2026-11-17T08:29:34Z

Repository: just-every/home. Branch: cloud/je-deps-1. Base: 567a17189ad2f0fb2b4601976ec5d1348cf083eb. Product HEAD: 4560a230d30bff9a8f5ad73cb0726364f66e64d4.
PR: https://github.com/just-every/home/pull/72.

## Plan

1. Start from a fresh shallow main checkout and restrict product changes to package.json and package-lock.json.
2. Record the complete npm audit baseline and dependency versions. Upgrade Next only within 16.4.x; retain OpenNext compatibility. Update existing vulnerable overrides and use targeted lockfile updates for the rest. Add an override only when dependency ranges cannot reach a patched version.
3. Run npm ci, type-check, lint, tests, brand and listings checks, Next production build, Cloudflare production build, and full plus production-only audits with Node 22 and npm 10.9.3. Execute heavy steps directly in this dedicated cloud VM through cloud_run. Do not use provider credentials or deploy.
4. Inspect all product diffs, identity, trailers, and unchanged source/data. Commit with the fleet hooks and identity; push only cloud/je-deps-1 with the fleet guard. Open one PR to main with the requested title.
5. Observe exact-SHA Verify through the GitHub REST API within the ten-call budget and five-minute polling limit. Record actual status without inferring success.
6. Keep complete non-secret report and receipts outside the product tree, publish the explicitly selected packet only on evidence/je-deps-1, then remove the successful disposable clone and node_modules. Keep a verified bundle if publication is blocked.

No CONTRACT.md exists; no clause judgments or generated views are in scope.

## Dependency changes

| Package | Alert | Before | After | Method |
| --- | --- | --- | --- | --- |
| next | moderate; GHSA-mfr8-8qww-v76h | 16.4.3 | 16.4.5 | Direct pin to the smallest patched 16.4.x release |
| @opennextjs/cloudflare | compatibility | 1.20.13 | 1.20.13 | Unchanged; peer range >=16.4.1 includes 16.4.5 |
| undici | high; eight advisories | 7.29.1 | 7.30.1 | Existing override updated |
| brace-expansion | high; three advisories | 5.0.9 | 5.0.12 | Existing override updated to cover all three fixed thresholds |
| source-map-js | high; GHSA-68fv-2mgg-jv7q | 1.2.1 | 1.2.2 | Targeted lockfile update inside parent range |
| sharp | high; GHSA-wq5f-xc86-pv6w | 0.35.4, 0.35.5 | 0.35.5 | Direct development pin; deduplicates already-patched runtime copies |
| qs | moderate; GHSA-6pq8-jhm2-2vcw | 6.16.0 | 6.16.1 | Existing override updated |
| minimatch | moderate; GHSA-g3hv-75wg-m249 | 10.2.6, 3.1.5 | 11.0.1, 3.1.5 | New minimatch@>=7 override; modern vulnerable ranges exclude patched 11.0.1; unaffected 3.1.5 retained |
| glob | moderate; GHSA-3g3m-2fjr-6pw4 | 13.0.6 | 14.0.2 | New glob@>=9 override; OpenNext ^13.0.6 excludes patched 14.0.2 |
| fast-uri | moderate/low; five advisories | 3.1.7 | 3.1.9 | Existing override updated |

Next remains on 16.4.x and OpenNext remains 1.20.13. No direct dependency major was upgraded. The two transitive major updates (glob 13→14 and modern minimatch 10→11) are required by their published fix versions and use the smallest patched releases. Existing older minimatch 3.1.5 is unaffected by this alert and remains installed. Sharp/native-package deduplication explains most lockfile deletions; full path-by-path changes are in lock-changes.json.

Reasons for each changed or new override:

- undici 7.30.1: the existing 7.29.1 pin blocks all eight current high-severity fixes.
- brace-expansion 5.0.12: the existing 5.0.9 pin blocks the three recursion/quadratic-expansion fixes.
- fast-uri 3.1.9: the existing 3.1.7 pin blocks the URI normalization and scheme/host fixes.
- qs 6.16.1: the existing 6.16.0 pin blocks the comma-stringification denial-of-service fix.
- glob@>=9 →14.0.2: OpenNext 1.20.13 requires ^13.0.6, so a lockfile-only update cannot reach the fix; the scoped override retains unaffected older majors if introduced.
- minimatch@>=7 →11.0.1: TypeScript ESLint requires ^10.2.2, so a lockfile-only update cannot reach the fix; the scoped override preserves unaffected 3.x consumers.

Other pre-existing overrides were retained unchanged. No new override is needed for source-map-js.

## Audit counts and limitations

- Before, full: 17 vulnerable packages (4 high, 13 moderate, 0 low); 22 distinct directly reported advisory URLs.
- Before, production-only: 13 vulnerable packages (4 high, 9 moderate, 0 low); 16 distinct directly reported advisory URLs.
- After, full: 0 vulnerable packages (0 high, 0 moderate, 0 low); 0 distinct directly reported advisory URLs.
- After, production-only: 0 vulnerable packages (0 high, 0 moderate, 0 low); 0 distinct directly reported advisory URLs.

Remaining advisories: none in either final npm audit. The audit count is an npm vulnerable-package count, including affected parents, rather than a count of Dependabot alerts closed. Dependabot re-evaluates the default branch after landing; this task does not claim default-branch alert closure before merge.

Lockfile package records: 865 → 812 (excluding root). Audit dependency inventory: 865 → 812, including optional platform packages.

## Proof receipts

All required heavy steps ran directly in the dedicated cloud VM via cloud_run; no Mac heavy-slot helper was used. The actual checks used Node v22.23.5 and npm 10.9.3. No provider credentials were passed into the check environment, and no deployment ran.

| Command | Result | Seconds | Receipt |
| --- | --- | --- | --- |
| npm ci | PASS | 13.839 | npm-ci.log |
| npm ls next @opennextjs/cloudflare sharp undici brace-expansion source-map-js qs minimatch glob fast-uri | PASS | 0.861 | dependency-tree.log |
| ./node_modules/.bin/prettier --check package.json package-lock.json | PASS | 0.369 | dependency-format.log |
| npm run type-check | PASS | 5.323 | type-check.log |
| npm run lint | PASS | 2.601 | lint.log |
| npm test | PASS | 11.784 | tests.log |
| npm run brand -- --check | PASS | 0.315 | brand.log |
| npm run listings -- --check | PASS | 0.3 | listings.log |
| npm run build | PASS | 25.943 | build.log |
| npm run build:cloudflare | PASS | 34.754 | build-cloudflare.log |
| npm audit --omit=dev | PASS | 0.515 | audit-production.log |
| npm audit | PASS | 0.522 | audit-full.log |

The tests pass 9/9; listings verify 49 seeds. Both builds generate 61/61 static pages and the Cloudflare build creates .open-next/worker.js. Source, page routes, data, public assets, copy, scripts and workflows are unchanged according to the tracked diff. Dependency bundles and native sharp assets change as expected. No baseline compiled-output comparison or browser comparison was performed, so byte-identical runtime output is not claimed. No UI change was made.

All check logs and checks.jsonl contain actual commands, UTC timestamps, exit codes and durations. Local proof ran on the uncommitted dependency candidate; candidate-files.json records the package file hashes, and the final product receipt verifies the committed bytes against them. Exact-SHA CI provides the committed-candidate check.

Preflight diagnostics were retained, not hidden: the first npm ci failed because a minimatch selector allowed inconsistent resolution; the next failed because the initial isolated check harness omitted the cloud proxy CA setting. Preserving CA configuration fixed downloads. An optional npm ls then reported glob invalid because its selector excluded the replacement version; broadening only that selector corrected metadata. Final clean installation and the complete required suite were rerun. Preflight logs and receipts identify those attempts. No source change was used to fix a check.

## CI and publication

Exact-SHA Verify passed in push run 44046796169. The PR-triggered Verify run 44046841495 was intentionally skipped by the existing cloud-branch workflow condition; the auxiliary PR #72 dynamic run 44046837297 succeeded. One REST CI observation was made; total GitHub REST budget used: 2 of 10 calls (PR creation and exact-SHA run discovery).

Exact-SHA REST observation:

```json
{
  "observed_utc": "2026-11-17T08:28:49Z",
  "conclusion": "success",
  "created_at": "2026-11-17T08:26:50Z",
  "event": "push",
  "head_sha": "4560a230d30bff9a8f5ad73cb0726364f66e64d4",
  "html_url": "https://github.com/just-every/home/actions/runs/44046796169",
  "id": 44046796169,
  "name": "Verify branch",
  "status": "completed",
  "updated_at": "2026-11-17T08:28:01Z"
}
```

Product custody and evidence publication are separate. The evidence ref contains only explicitly selected report/receipt files, never product acceptance or landing signals. The lane retains its landing hold, independent gate, publication scan, production notice, merge, deployment watch and live verification. No main push, merge or deploy was performed.

Clause status changes: not applicable; this repository has no CONTRACT.md and this task changes dependency files only.

Blockers: none. All required local checks and exact-SHA Verify pass.

The successful disposable clone and node_modules will be removed after product and evidence transport are verified. The report packet remains outside the clone.

Build warnings retained without source/config changes: Next warns about the existing middleware convention, workerd warns about the existing 2025-03-25 compatibility date, and npm reports deprecation notices for existing eslint/node-domexception dependencies. These do not fail the build.
