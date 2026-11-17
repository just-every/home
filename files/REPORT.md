# je-gate-56 — independent gate of PR #72

Signed: Codex, 2026-11-17T08:53:54Z. Repository: just-every/home. No builder participation, product edits, commits, pushes, PR writes, merges or deployments.

Decision: the required R2 alert-list comparison could not run. No introduced blocking correctness or security defect was reproduced. This is a NOT RUN gate, not approval to land and not a request to change the dependency patch. Finish R2 with access to the repository's Dependabot alerts, against this same head and base. Do not use another head's evidence.

## Immutable subject

- PR: https://github.com/just-every/home/pull/72 (existing, open).
- Candidate: cloud/je-deps-1, `4560a230d30bff9a8f5ad73cb0726364f66e64d4`.
- Baseline main and PR base: `567a17189ad2f0fb2b4601976ec5d1348cf083eb`.
- Git advertised main and pull/72/head matched before inspection and after all builds; `pr.json` independently bound PR head/base.
- Exact binary Git comparison: `candidate.patch`; SHA-256 `034c07cec93cb52c9aaae16b980e70ebfad29d8d66d79b6e9a9230fefbe22259`.
- Changed files: exactly package.json and package-lock.json. One candidate commit, both author and committer Run Edit Run fleet <fleet@runeditrun.com>; no trailers. All candidate commits, including any possible side parents, were covered by `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"` (one commit).
- Local cloud/je-gate-56 was created from main for task custody; the gate inspected a detached exact candidate HEAD. No product branch was published. Evidence transport binds the exact inspected product SHA separately.
- No CONTRACT.md, ACCEPTANCE.md, sources.lock.json, documented contract generator, or migration-ledger check exists in this repository. Seed-specific regeneration obligations are not applicable. The documented listings check ran independently. There is no Product target incumbent declaration; baseline main is the behavior control.

## Plan

1. Bind PR #72 to the frozen base and head through Git refs and a PR API read; stop if either changes.
2. Compare immutable base/head package manifests, lock resolution URLs/integrities, commit identities and trailers, and unchanged source/workflows.
3. Read the default-branch Dependabot alerts using only the injected fleet GitHub credential, with bounded refresh/backoff on rejection. Compare locked versions to advisory ranges; independently audit both trees.
4. Run the named candidate installation, type-check, lint, nine tests, listings check, Next build and production OpenNext build in sequence in the dedicated cloud VM on Node 22 and npm 10.9.3.
5. Build baseline main in an isolated worktree; compare production bundle sizes, serve baseline/head builds, capture the four named routes at 1440 and 390, and compare visible text, DOM structure, errors, layout and byte identity of the two JSON endpoints.
6. Read existing exact-head Verify via REST once; do not dispatch, rerun, merge, deploy, edit or publish product code.
7. Tier only findings within the frozen rubric, retain complete non-secret evidence outside the product tree, publish the explicitly selected packet to evidence/je-gate-56, and delete disposable checkouts and dependencies.

## Frozen rubric

| Row | Status | Command/evidence and result |
| --- | --- | --- |
| R1 Scope | MET | `git diff origin/main HEAD --name-only`, manifest structural comparison, candidate identity/trailer log, lockfile validation. Exactly the allowed pins and overrides; unchanged scripts/source/workflows/public data/copy. All 812 non-root lock entries have a registry.npmjs.org resolved URL and an integrity hash. No git/file/link/other-host resolution or credential-shaped changed value. |
| R2 Alerts cleared | NOT RUN | `gh api 'repos/just-every/home/dependabot/alerts?state=open&per_page=100'`: five attempts, each HTTP 403, `Resource not accessible by integration`, after bounded 15/45/90/150-second backoff and launcher credential refreshes. No alternative credential was sought. The actual alert inventory and each alert's first patched version remain unavailable. Supplemental independent evidence: both candidate npm audits exit 0 with zero advisories; baseline reports 17 full / 13 production. All nine named package advisory ranges from baseline npm audit exclude the candidate's patched versions, but npm audit is not represented as the missing GitHub alert list. OpenNext peer range accepts Next 16.4.5. |
| R3 Remote proof | UNMET only for literal console-clean subcheck; named commands and comparison MET | Every named candidate command below exits 0. Dedicated cloud execution replaces heavy-slot per the cloud adaptation. Production Next pages `/`, `/products`, `/uptime`, `/nook` were served from baseline and head and captured at 1440 and 390. All eight comparisons have exactly equal visible text, visible DOM tag/role/link structure and heading/landmark geometry, no page exceptions and no document overflow. Console resource errors occurred identically on both trees; they are pre-existing/local-environment D evidence, not introduced failures. Both JSON endpoints are byte-identical, HTTP 200. |
| R4 Exact-head CI | MET | One REST discovery `gh api 'repos/just-every/home/actions/runs?head_sha=4560a230d30bff9a8f5ad73cb0726364f66e64d4&per_page=100'`. Verify branch 44046796169 completed/success on the exact head. PR #72 run 44046837297 completed/success. Duplicate Verify branch 44046841495 completed/skipped. The successful branch Verify is the relevant proof; the skipped run is not called green. No dispatch or rerun. |
| R5 Deploy and behavior safety | MET | All three YAML workflows were read once from the candidate, unchanged against main. Deploy Production uses Node 22, npm ci, npm run build:cloudflare, verifies .open-next/worker.js, then Wrangler deployment. Both production OpenNext builds complete; output sizes and build-tool reachability traced below. No new observed render/data behavior or build failure. No provider credentials or deployment used. |

## Commands on the exact candidate

Node 22.23.5, npm 10.9.3 (the repository packageManager pin), Linux dedicated VM. Heavy commands ran one at a time through cloud_run's subreaper. Provider tokens/secret-key environment variables were removed from the subprocess environment. No rer setup/build was needed for this existing npm project. The source/index stayed clean.

| Command | Exit | UTC start → end | Actual log |
| --- | --- | --- | --- |
| `npm ci` | 0 | 2026-11-17T08:41:47Z → 2026-11-17T08:42:12Z | `head-01.log` |
| `npm run type-check` | 0 | 2026-11-17T08:42:12Z → 2026-11-17T08:42:19Z | `head-02.log` |
| `npm run lint` | 0 | 2026-11-17T08:42:19Z → 2026-11-17T08:42:24Z | `head-03.log` |
| `npm test` | 0 | 2026-11-17T08:42:24Z → 2026-11-17T08:42:31Z | `head-04.log` |
| `npm run listings -- --check` | 0 | 2026-11-17T08:42:31Z → 2026-11-17T08:42:31Z | `head-05.log` |
| `npm audit --json` | 0 | 2026-11-17T08:42:31Z → 2026-11-17T08:42:32Z | `head-06.log` |
| `npm audit --omit=dev --json` | 0 | 2026-11-17T08:42:32Z → 2026-11-17T08:42:33Z | `head-07.log` |
| `npm run build` | 0 | 2026-11-17T08:42:33Z → 2026-11-17T08:43:27Z | `head-08.log` |
| `env NODE_ENV=production npm run build:cloudflare` | 0 | 2026-11-17T08:43:27Z → 2026-11-17T08:44:25Z | `head-09.log` |

`npm test`: 9 registrations, 9 passed, 0 failed/skipped. Test count is unchanged (tests are outside this diff). `npm run listings -- --check`: passing. No unrelated suite or new test was introduced.

Baseline comparison commands and raw exits are in `baseline-checks.json`. Baseline npm ci succeeded. Both baseline audits exited 1 because they found advisories. Baseline's first standalone npm run build exited 1 after generating routes because Next 16.4.3's security check emitted SecurityFatalError for its known vulnerability. The subsequent production OpenNext build ran the same Next build successfully and completed bundling. That stop is pre-existing baseline evidence; the candidate did not emit it. The log's requested upgrade is already the purpose of PR #72; no baseline or candidate source was edited.

## Package and advisory comparison

| Package | Baseline locked versions | Candidate locked versions |
| --- | --- | --- |
| next | 16.4.3 | 16.4.5 |
| sharp | 0.35.4, 0.35.5 | 0.35.5 |
| undici | 7.29.1 | 7.30.1 |
| brace-expansion | 5.0.9 | 5.0.12 |
| source-map-js | 1.2.1 | 1.2.2 |
| qs | 6.16.0 | 6.16.1 |
| fast-uri | 3.1.7 | 3.1.9 |
| minimatch | 10.2.6, 3.1.5 | 11.0.1, 3.1.5 |
| glob | 13.0.6 | 14.0.2 |
| @opennextjs/cloudflare | 1.20.13 | 1.20.13 |

The direct sharp pin changed from 0.35.4 to 0.35.5; baseline also had an optional transitive sharp 0.35.5. minimatch 3.1.5 remains for ESLint consumers whose range is below the new scoped override. Baseline npm advisory range for minimatch is >=7.0.0 <11.0.1, so that retained 3.x resolution is not in the advisory being repaired. Full audit total: 17 → 0. Production audit total: 13 → 0. Lock package nodes: 865 → 812. No remaining npm advisory.

Npm baseline advisory ranges, URLs and fixes are retained in `npm-advisory-review.json`; complete audit JSON is in the four audit logs. Examples: Next affected through 16.4.4; glob through 14.0.1; minimatch below 11.0.1 on the affected >=7 line; undici below 7.30.1 on 7.x; brace-expansion below 5.0.12; source-map-js below 1.2.2; sharp below 0.35.5; qs through 6.16.0; fast-uri below 3.1.9. These are npm advisory observations, not first-patched-version fields from inaccessible Dependabot alerts.

OpenNext 1.20.13's package peerDependencies were read once: next `>=15.5.28 <16 || >=16.4.1`, rclone.js `^0.6.6`, wrangler `^4.148.0`. Both 16.4.3 and 16.4.5 satisfy its Next range. The update stays on 16.4.x.

Reasons for overrides: undici, brace-expansion, fast-uri and qs raise existing security overrides to patched versions. New glob@>=9 overrides OpenNext's glob ^13.0.6 to 14.0.2 because the fix is outside its parent range. New minimatch@>=7 reaches 11.0.1 for the affected tooling ranges without forcing the separate ESLint 3.x consumers onto that major. source-map-js is a lock-only resolution update. No override changed application source or routes.

## Build/deployment impact

OpenNext is a production dependency in package metadata, but its glob imports are in CLI/build code: dist/cli/build/bundle-server.js (globSync for trace discovery), build/open-next/bundle-node-middleware.js, build/patches/plugins/load-manifest.js (glob for manifest collection), and cli/commands/populate-cache.js. glob uses minimatch; TypeScript ESLint also pulls affected minimatch through @typescript-eslint/typescript-estree. Site src/scripts have no direct glob/minimatch import. These overrides affect install/lint/build/cache-preparation tooling, not a glob/minimatch code path invoked by a served site request. No matching package import/marker was found in generated .open-next JavaScript. The material counterexample was missing manifest/route assets after the major tooling bump; the controls are the real OpenNext bundle, generated Worker, exact-head Verify and matching public route/data probes. This is evidence for the specified surfaces, not proof about every future dynamic configuration.

| .open-next measurement | Baseline | Candidate |
| --- | ---: | ---: |
| Regular-file bytes | 70,535,835 | 70,571,104 |
| Regular files | 2,331 | 2,333 |
| worker.js bytes | 2,278 | 2,278 |

Difference: +35,269 bytes (+0.0500%). worker.js SHA-256 is identical: d05223bf4d44c84108a102ab62aa3bc9c5568f0c3ac2064c37be5cc65c64bc45. Bundle size is sane relative to baseline. The workflow's install path, Wrangler deploy step and Worker existence check remain satisfied at build time. No deployment was performed.

## Browser and served data

`browser.json` retains complete per-route observations, visible text and structures; sixteen actual full-page screenshots cover baseline/head × four routes × two widths. The first baseline attempt timed out waiting for networkidle at 60 seconds; `browser-first-attempt.txt` and its receipt retain that event. The completed retry waited for DOMContentLoaded, a visible h1, bounded font readiness and a short settle. No blocked/faked network response was installed. Both production servers were stopped by their exact PIDs and Chromium was closed.

All eight before/after pairs: visible text equal; structure equal; heading and landmark positions/sizes equal; document overflow absent; pageerror events absent; identical console-error arrays. All candidate route responses are HTTP 200. Visual review of candidate screenshots at both widths found no new layout break.

| Served endpoint | Bytes | Equal baseline/head | SHA-256 |
| --- | ---: | --- | --- |
| /brand.json | 2,384 | yes | a54bb68daa5f1590e5a6eaafecf38c627e42fa014f65c0d7efaf81bee809b7a4 |
| /data/listings.json | 30,086 | yes | 78ae543ada87bddbf65d6470686a009b94c2f8f425fbe517161445c645df7229 |

The probe serves the production Next build locally; it is not a Cloudflare production deployment. Both local server logs show unavailable Cloudflare-only token cache support and an unmigrated local page_views database. Corresponding 500 resource messages and 502 resource messages appear equally on main/head. No absolute claim of a console-clean environment is made.

## Findings and limits

- Blocking A/B/BAR: none demonstrated.
- Follow-up C: none introduced.
- OUT OF SCOPE D: both baseline and head show the same console HTTP 502 resource messages and local analytics HTTP 500 messages; baseline/head server logs show missing local page_views table and unavailable caches. Trigger: ordinary local page loads. New: no; the same errors occur on main and all eight paired console arrays match. These do not hold this dependency patch.
- NOTE G: baseline's first Next build stopped for the already-known 16.4.3 vulnerability; baseline OpenNext's later Next build and final bundle succeeded. Candidate's builds both succeeded.
- NOTE G: R2 GitHub alert inventory remains inaccessible after five credential-refresh attempts (HTTP 403). This is missing evidence, not an introduced product defect, and leads to GATE NOT RUN rather than FIX. Seven GitHub REST calls total (PR identity, five alert attempts, exact-head CI discovery); no short-interval CI watcher.
- No source lock/contract status/claim changes; no clauses promoted or demoted. No main/default-branch push, PR comment or deployment. Product publication scan remains the fleet lander's responsibility; this report-only evidence transfer is not product READY, acceptance or landing.

Risk assessment: impact if wrong high (shared production build/runtime can affect every page); regression likelihood low on the tested surfaces (both builds, exact-head Verify and paired public pages/data agree); regression protection partial (nine tests plus real builds/render probes, no deployed Worker probe); recovery easy (revert the two package files, rebuild/redeploy, no migration or new persisted state); confidence moderate for behavior, incomplete for mandatory alert inventory. Recommendation: hold_for_evidence; workflow label hold_for_evidence. The only decision-critical remaining action is to obtain the default-branch alert list and match each relevant alert's first patched version to this exact lock. If all are covered and the pinned PR remains current, the available checks support landing; if a named advisory remains, report it under the fixed rubric. The auxiliary assess-patch-risk shared schema/validator and artifact-storage reference were unavailable through the installed skill resource interface; no schema-validated assessment JSON is claimed. This tool limitation does not add a gate bar.

## Custody

Complete non-secret reports and actual receipts remain under the requested packet directory. Evidence is published only through refs/heads/evidence/je-gate-56 using the declared repository clone; it does not change the product checkout, index or head. The final evidence line identifies the publication commit. Disposable product checkouts and node_modules are deleted only after successful report transport. No unpushed product work exists.

GATE NOT RUN R2 Dependabot alert-to-lock comparison head=4560a230d30bff9a8f5ad73cb0726364f66e64d4
