# je-gate-62 independent deciding gate

Signed: Run Edit Run fleet, 2026-11-19T19:45:53Z (clock: date -u).

Decision: PR #78 may land under the existing lane/publication/deployment guards. No new blocking finding or new copy follow-up was demonstrated. This is a decision on the specified candidate, with no product edits, product commits, product push, PR change, merge or deployment performed by this gate.

Candidate branch: cloud/je-sync-52
Candidate SHA: e6bd26e6cbcaa0da5c190f8335319f5da02587da
PR: https://github.com/just-every/home/pull/78
Baseline/main/PR base: 76034fe7b1951090ee5bcfd47f1c98c4e7073376
Gate scratch checkout: local cloud/je-gate-62, at the exact candidate; no remote product ref of that name created.

## Plan and scope

1. Resolve main, the named builder branch and PR head with Git; read PR metadata once and require the frozen head/base pair.
2. Read repository AGENTS.md, sync implementation and inline builder/rules references. Review every candidate hunk and all candidate commit identities/trailers against baseline. Check only R1-R5 and the touched screen regression.
3. Resolve both Orbit annotated tags independently; read the new Release once; read the public released CONTRACT.md, README.md and seed.json at both tags. Compare hashes, versions and marker bookkeeping; sample unchanged Uptime copy provenance because its open-marker list is touched.
4. Run npm ci, listing check/generation/no-diff, type-check, lint and production build sequentially. Build baseline in a separate git-archive scratch directory using the same installed dependencies, then inspect the actual built /orbit at 1440 and 390 for head and baseline.
5. Read exact-head workflow runs once. Save the actual report, receipts and four screenshots outside the clone. Publish only the explicitly selected non-secret packet to the evidence ref, then remove scratch source/build/dependencies after successful transfer.

No helper agent was used. Heavy commands were sequential in this dedicated VM, with the prescribed cloud_run subreaper for build/browser work. No broad kills, mock application paths, CI dispatch, rerun, scheduler or watcher. Public seed files were read by plain HTTPS, with no provider credential. GitHub authentication was used solely for the cloud adaptation's Git/REST metadata and evidence transport.

## Rubric results

| Row | Result | Command / evidence and result |
| --- | --- | --- |
| R1 Scope | MET | git diff --name-only origin/main..HEAD reports exactly public/data/listings.json, scripts/seeds-sync/state.json, src/data/seed-pages.ts. git diff --check origin/main..HEAD exits 0. Full patch review and credential-shape scan found no credential-shaped value. git log origin/main..HEAD --format with author, committer and all trailers shows one commit, both fleet identities, no trailers. No test path changed, deleted, skipped or weakened. Every hunk explained below. |
| R2 Promotion truth | MET | git ls-remote https://github.com/just-every/run-orbit.git refs/tags/v0.4.11* refs/tags/v0.4.12* independently peels the new annotated tag to a9fa1830c1913562154dedaeb5a1322ead7c3e6b, exactly state.json. gh api repos/just-every/run-orbit/releases/tags/v0.4.12 once: published 2026-11-19T18:57:59Z, draft=false, prerelease=false, rer-release.dsse.json present (3349 bytes). Listings and page data both v0.4.12. No other listing field/version/status or page wording changed. |
| R3 Public data and render | MET | npm ci exit 0 (715 packages); npm run listings -- --check exit 0, current 49 seeds; npm run listings exit 0, unchanged; git diff --exit-code -- public/data/listings.json exit 0. npm run type-check, npm run lint, npm run build all exit 0. Counts remain 49 = 35 released + 14 coming soon; all eight excluded slugs absent. Production /orbit returns 200, displays v0.4.12 at 1440 and 390, scroll widths match viewports, no page exceptions and no layout regression against separately built main. Pricing is unchanged by the complete diff; this JE route has no Assisted/Managed price block to reprice. The stipulated Assisted US$10/month / Managed US$100/month policy was not altered; no claim of fresh RER pricing-page verification. |
| R4 Exact-head CI | MET | gh api repos/just-every/home/actions/runs?head_sha=e6bd26e6cbcaa0da5c190f8335319f5da02587da&per_page=100 once: Verify branch 44597428122 completed/success at the exact candidate. PR #78 run 44597527974 completed/success; duplicate Verify branch 44597539403 completed/skipped. Workflow condition deliberately skips a cloud-branch PR invocation; this does not replace or invalidate the successful push Verify on that same SHA. No failed shard, dispatch or rerun. |
| R5 Claim honesty | MET | Plain HTTPS reads of released Orbit CONTRACT.md/README.md/seed.json for both tags all HTTP 200; full SHA-256 receipts retained. Contract is byte-identical; README setup/PATH and restored-form instructions and seed.json version are the only sampled copy-source changes. Reviewed all ten Orbit JE promises against requirements and Status/Gap rows, and Uptime's touched-marker provenance. Partial proof alone is not a demonstrated false claim. No newly false sentence established. Existing touched follow-ups are retained below. |

## R1: every hunk

- public/data/listings.json: generatedAt changes from 2026-11-19T17:57:24.090Z to 2026-11-19T19:19:33.792Z; only listing change is Orbit v0.4.11 -> v0.4.12. Structural comparison of all 49 listings proves every other field identical.
- src/data/seed-pages.ts: Orbit's version literal changes v0.4.11 -> v0.4.12, with no summary, feature, promise, price or coming-soon copy edit.
- scripts/seeds-sync/state.json: syncedAt changes from 2026-11-19T17:57:21.724Z to 2026-11-19T19:19:30.150Z. Orbit commit changes a4fcbfcd72fa4253826f43d0b0de02275094f86d -> a9fa1830c1913562154dedaeb5a1322ead7c3e6b, sourceRef/tag v0.4.11 -> v0.4.12; sourceReason remains released listing version. CONTRACT.md short hash remains 2c7cce58a1437e4b; README.md 20ef6d3a4cdc967d -> e5fc0bf436eeddff; seed.json d0ec85580f2b4ddf -> 8dd55de93d00fe43. All six old/new Orbit source hashes recomputed from released files match. Brand, mark and homepage fields are identical.
- Orbit adds open marker 42983364b373; Uptime removes that same marker while retaining bf4b3f38e1a2. keyOf in scripts/seeds-sync/detect/index.mjs hashes type + ':' + summary, without a slug. sha256('copy:README.md, seed.json changed since the last sync')[:12] is 42983364b373. These are independent per-seed findings, not a provenance transfer between repositories. The actual detectCopy module using released bytes and baseline state produces the two-file copy finding for Orbit and no copy finding for Uptime. All three Uptime hashes at v0.5.18 match both baseline/head state, so its old copy finding is already acknowledged and full closeRecord can drop it. bf4b3f38e1a2 hashes 'homepage:no "alternative to" line found on the homepage'; it remains untouched. No Uptime copy, status, version or source commit was changed.

The only other path versions remain HappyToHelp v0.4.31, Lamp v1.11.23, Uptime v0.5.18, Oncall v0.5.19, Spool v0.7.15. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Clause status changes: none. Before/after listing counts: 49/49 total, 35/35 released, 14/14 coming soon.

## R2/R5: released source and claim review

Release: https://github.com/just-every/run-orbit/releases/tag/v0.4.12
Annotated tag object: 5f6aae44f2d05009835cc98ed029aff5af1dfafd
Peeled source commit: a9fa1830c1913562154dedaeb5a1322ead7c3e6b
Previous annotated tag object: 810d833d3a832f11d7bd1ba37d5ea812b45113a0
Previous peeled commit: a4fcbfcd72fa4253826f43d0b0de02275094f86d
Envelope asset presence was verified; no DSSE signature verification was performed or claimed.

URLs read: https://raw.githubusercontent.com/just-every/run-orbit/v0.4.11/CONTRACT.md, README.md and seed.json at that same prefix; and https://raw.githubusercontent.com/just-every/run-orbit/v0.4.12/CONTRACT.md, README.md and seed.json at that prefix. Uptime equivalents at https://raw.githubusercontent.com/just-every/run-uptime/v0.5.18/ were also read. Exact URLs, byte counts and hashes are in source-receipt.json.

Orbit README replaces a shell-piped one-step startup with install-then-rer-dev, documents rer PATH recovery and clarifies that restored public contact forms are withdrawn pending fresh limit/expiry review, approval and publication. JE already shows a two-step no-npm alternative, and its archive sentence does not promise restoration of installation-local publication authority. seed.json changes only version. CONTRACT.md is unchanged (full hash 2c7cce58a1437e4b0104046706ee4c79ad96965c233d8a36149a3573f1fe2872). No new wording is contradicted by these source changes.

Orbit's contract names HubSpot Sales Hub, Pipedrive and Salesforce Sales Cloud as incumbents. The listing change itself is catalogue version/provenance maintenance, with no JE CONTRACT.md incumbent table; it claims no new CRM superiority or implementation status. No additional incumbent audit was added.

Status rows: RECORD-004 and OUT-012 are done; OUT-001, OPP-004, SIGNAL-007, OUT-007, ACTION-005, CAPTURE-005, AI-003 and DATA-002 remain partial. The precise requirements and gaps are retained in claims-receipt.json. Partial does not itself refute the narrower listed sentence. In particular OPP-004's documented missing source-evidence drill-through is not a new drill-through promise in JE, and SIGNAL-007's disclosed opt-in outbound-mail tracking exception concerns a separate mail feature; no new website tracking or changed privacy wording was introduced by this diff. No clause was promoted.

Existing touched Uptime follow-ups, kept as out-of-scope D and not counted as new follow-ups:
- STATE-001: "One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks." The release still marks the clause partial; no new wording or change in evidence custody here.
- NETWORK-001: "Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected." The release still marks the clause partial with broader qualification remaining. No new implementation contradiction or introduced defect is established here.
- The preserved Uptime bf4b3f38e1a2 is an internal homepage-copy follow-up (missing alternative-to line), not deletion of a privacy/correctness finding.

Lamp, HappyToHelp, Spool ERR-006 and Terrace follow-ups in the supplied context are unchanged and not touched. No source audit of those unrelated entries was added.

## Independent checks and limitations

The candidate has no CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md, sources.lock.json, documented contract/source-lock generator or migration-ledger check. Those seed-specific pre-gate regeneration steps are not applicable to this JE catalogue repository. The applicable generated listing check was independently run and passed; no pre-gate refusal.

Actual head browser proof: head-orbit-1440.png and head-orbit-390.png. Actual main proof: main-orbit-1440.png and main-orbit-390.png, built from a git archive of the baseline with the same installed dependency tree. Both body text comparisons differ only by v0.4.11/v0.4.12; version fact coordinates and dimensions are identical for each width. Browser contexts were isolated and closed; only the two recorded server PIDs started by this gate were terminated.

NOTE G: the first browser navigation waited for networkidle and timed out after 60000 ms while the page's media/background traffic remained active. The completed probe used DOM readiness, actual heading/version readiness and font readiness, without intercepting or mocking requests. Both baseline and head render the same page. Their local Next start support endpoints log unavailable Worker cache / missing local D1 page_views context; no exception occurs in the page, no touched code changes these endpoints, and these are not findings against this version-only change. Production Cloudflare build is covered by exact-head Verify. No live-provider/deployment claim.

No red Verify or failed product assertion. No test deletion/weakening. No new security, money or data-loss issue demonstrated. No full local suite was run. GitHub REST metadata calls: three (PR, exact-head runs, release); no polling was needed. Final Git ref re-probe still advertised the original main, candidate and PR head.

## Custody

Complete selected report/receipts/screenshots are published only through refs/heads/evidence/je-gate-62 as a child of the already-published candidate. Evidence publication is not product READY, landing or deployment. The lane still owns its publication scan, PR merge, deployment and live checks. No cloud/je-gate-62 product branch was pushed. No product change or clause-status change was made by this gate. Scratch checkout, dependency tree and baseline archive are removed after transfer succeeds; this packet remains.

Verdict: PASS on the exact candidate, with zero new follow-ups and zero blockers.
