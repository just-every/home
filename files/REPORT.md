# je-gate-20 independent deciding gate

Decision: PR #36 may land under the lane's remaining publication/landing controls. No reproduced blocking issue, follow-up or clause-status change was found. No product file, commit, branch on GitHub, PR, deployment or provider account was changed by this gate.

- Repository: just-every/home.
- Candidate: cloud/je-sync-12, fa8f9b53062373c3c4a0cab931fe7483f90fef34.
- Baseline main: d9893baa5c4d862ab94e62cda6b9f43774a60e8f.
- PR: https://github.com/just-every/home/pull/36 (open; exact head confirmed at start and after checks).
- Verify: https://github.com/just-every/home/actions/runs/42535960375, completed/success on that exact SHA, observed once through REST. No CI dispatch, rerun or watcher.
- Gate product branch: cloud/je-gate-20 was created locally from main as the cloud wrapper requested; product inspection used a detached checkout of the exact candidate. No product push or READY claim is appropriate for this read-only gate. Evidence transport alone uses evidence/je-gate-20.
- Incumbent: this repository has no CONTRACT.md or Product target table. This listing/provenance sync introduces no implementation-parity claim; R1–R4 and the standing bars govern.

## Plan and execution

The full pre-check plan is PLAN.md. Executed in order: confirm PR/CI; inspect every hunk and candidate identity; read public release and pinned source objects; reconcile all builder dry/apply findings; independently check provenance and public data; install and run the named local checks; build baseline separately and compare its served Lamp page with the production candidate; inspect desktop/mobile screenshots; preserve report-only evidence. Product fixes, broader tests and new acceptance bars were excluded.

## Frozen rubric

| Row | Result | Commands and evidence |
| --- | --- | --- |
| R1 Scope | MET | `git diff --stat --numstat BASE HEAD`, full `git diff BASE HEAD`, `git diff --check BASE HEAD`, `git log origin/main..HEAD --format='%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)'`, and check-provenance.py: exactly the three expected paths, clean diff, fleet author/committer, no trailers or credential-shaped diff matches. No test path changed. |
| R2 Promotion truth | MET | `gh api repos/just-every/run-lamp/releases/tags/v1.11.4`, batched `gh api graphql -F query=@source-query.graphql`, raw Strap `gh api repos/just-every/run-strap/contents/CONTRACT.md?ref=008fef24f74b44bdb2aaf0fd95dcf50c45ceea7c -H 'Accept: application/vnd.github.raw+json'`; check-provenance.py, copy-detector-proof.mjs, and builder-report-reconciliation.json. Non-draft/non-prerelease Lamp release has rer-release.dsse.json, both displayed versions match, all seven source commits exist in public repositories, all 42 before/after copy hashes match, and no coming-soon wording was imported or initial finding unexplained. |
| R3 Public data | MET | `npm ci`; `npm run listings -- --check` → current (49); `npm run listings` → unchanged (49), `git diff --exit-code` → no diff; `npm run type-check`, `npm run lint`, `npm run build` → exit 0. Production served `/lamp` and `/data/listings.json` through next start. Browser assertions at 1440, candidate screenshots/observations at 1440 and 390, baseline comparison at 1440: PASS. Counts/exclusions unchanged and all pricing/copy paths unchanged. |
| R4 Exact-head CI | MET | `gh api repos/just-every/home/actions/runs/42535960375 --jq '{id,name,status,conclusion,head_sha,html_url,event}'` once → Verify branch, completed/success, exact fa8f9b53062373c3c4a0cab931fe7483f90fef34. |

All shell checks completed successfully. Browser/Node commands ran through cloud_run. Local runtime was Node v24.19.0, npm lock installation; the exact-SHA workflow used its pinned Node 22 setup. No full local test suite was run.

## Every product hunk

1. `public/data/listings.json` (+2/-2): generatedAt changes from 2026-11-03T22:55:28.014Z to 2026-11-08T23:32:10.622Z; Lamp version changes v1.11.3 → v1.11.4. After normalizing those two fields, every listing is identical to baseline.
2. `src/data/seed-pages.ts` (+1/-1): only Lamp's version changes v1.11.3 → v1.11.4. All wording, promises, pricing-related content, marks, colours, links and gallery references are unchanged.
3. `scripts/seeds-sync/state.json` (+19/-18): syncedAt advances to the final copy-refresh timestamp. Seven entries move source commits: four coming-soon contracts get updated hashes, Mallet and Strap get commit provenance only, and Lamp changes its released source tag/commit plus three copy hashes. Lamp's `open: ["c843303a1181"]` is the detector's exact key for the recorded three-file copy-review finding; it is not a dropped issue. Brand/home/mark observations do not change.

| Seed | Before source SHA | After source SHA | Explanation |
| --- | --- | --- | --- |
| Blotter | 4e7612a8313d08773cf95527824ef60c214837f2 | 43da1e7f3312fc5463844e08b220eeff746c7902 | HEAD, coming soon; only CONTRACT hash changes. Upstream INTEGRATE-005 judgment and TIME-001 evidence changed; no JE wording/status import. |
| Crank | 97dbba76c57a620110886e92a959fbf15b07d3d0 | 18cf94064499fd097f145cd1c45a681dadd08445 | HEAD, coming soon; only CONTRACT hash changes. DATA-001 and BASE-AGENT-012 evidence/gap movement stays upstream. |
| Lamp | d42822f3281899cda3d5636ed30915e8bc287ae0 | 720ee842bc0f69fe32b419f40cf9f78d0bf562c5 | Released source v1.11.3 → v1.11.4; CONTRACT/README/seed.json hashes change; release-copy review recorded open. |
| Mallet | 05f12bb25287d22654fda8b2a549712d14e94c1c | 095576e8bfe68bf364228679ff6bd34176a89907 | HEAD, coming soon; all three copy files identical. |
| Placemat | 187fa5c3720adb99a25412f029821a840d950867 | 6232d682d8356f2eb0f2d9e58b4e44bba51fd9cd | HEAD, coming soon; only CONTRACT hash changes. BASE-AGENT-007/011 evidence/gaps stay upstream; no JE import. |
| Platter | b384813c64c78665f189b5aa1f6b8f2c0fca79da | 85dee737177a6559448a012b2b6e22cad05f5e1a | HEAD, coming soon; only CONTRACT hash changes. Upstream CRM-004 judgment stays upstream; no JE wording/status import. |
| Strap | ceba5960cbe5ddc323624eb128280ce241f59e72 | 008fef24f74b44bdb2aaf0fd95dcf50c45ceea7c | HEAD, coming soon; all three copy files identical. |

All seven repositories returned isPrivate=false. Lamp's annotated v1.11.4 tag peels to its recorded commit. Its release was published 2026-11-08T07:27:02Z and carries rer-release.dsse.json (3141 bytes). This verifies asset presence only; no DSSE signature was verified. The first 3,116 lines of Lamp CONTRACT.md, before `## Status`, are independently byte-equal at the old/new release commits. README release instructions and seed metadata/route declarations changed without contradicting JE's unchanged wording. seed.json reports 1.11.4.

GraphQL truncates text at 512,000 bytes: both Strap CONTRACT objects share Git blob 2940c24bf08b7320272cab0d064d223150abab8a and byteSize 522107. A full raw REST read independently matches that Git blob and recorded sha256 prefix de176ce40493ca6d. The provenance receipt uses those full bytes, not the truncated GraphQL text.

## Findings reconciliation and independent evidence

Fetched the builder's separate `evidence/je-sync-12` ref in this same declared repository. Its manifest binds product_head to the candidate, and every selected report's byte count and SHA256 were verified before use. These reports supplement this gate's independently obtained source/API/data/build/browser proof; they are not a substitute for it.

- First full successful dry run: five findings, no unreadable source — Lamp's eligible version and four unreleased CONTRACT changes (Blotter, Crank, Placemat, Platter).
- Copy-only apply: records the four coming-soon source hashes without modifying public wording. Their changes and reasons for withholding are recorded in COPY-REVIEW.md and reports; they were reviewed, not silently dropped.
- Full apply: imports only Lamp's version; no mark, colour, status, homepage, incumbent, still or manual follow-up appears.
- Lamp released-copy refresh: reports all three changed copy files, reviews unchanged accepted copy and records the exact open-finding key.
- Final builder full dry run: 49 readable sources, zero findings. This gate did not repeat a 49-source live crawl or import; doing so would exceed the ten-call API budget and judge moving upstream heads rather than the pinned candidate.
- Independent invocation of the repository's actual detectCopy function against fresh public pinned source blobs reproduces all five explained copy changes against old provenance (including Lamp after its release boundary moves) and zero unexplained copy drift against candidate provenance.

Counts: **before 49 = 35 released + 14 coming soon; after 49 = 35 released + 14 coming soon**. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent. Every listing except Lamp's version is byte-semantically equal. All pricing-related paths are unchanged; this round makes no change to the accepted Assisted US$10/month / Managed US$100/month presentation.

## Production browser proof and regression look

Built and served both exact baseline and exact candidate from separate directories. Candidate tracked files stayed clean throughout. Browser assertions run at 1440: HTTP 200, one visible new version, old version absent from served HTML, no horizontal overflow, no page errors, and byte-identical served listings versus committed listings. The baseline serves v1.11.3; candidate serves v1.11.4. Candidate screenshots show the changed version at 1440 and 390. Mobile observation has scrollWidth=390, with the new version visible and no visible layout break. Desktop baseline/candidate main text differs only in the version; image and link lists are equal. Screenshots were visually inspected. No user-visible regression was found on the touched surface.

Files: browser-receipt.json; baseline-lamp-1440.png; candidate-lamp-1440.png; candidate-lamp-390.png; browser.log; baseline/candidate server logs. Both servers were stopped by their recorded PIDs and the browser was closed.

## Applicability, findings and custody

- Source lock regeneration/check: not applicable. No sources.lock.json or documented source-lock command exists in this repository.
- Generated contract write/check: not applicable. No CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md or documented contract generator exists here. Nothing was generated or committed under that exception.
- Migration-ledger check: not applicable. This repository documents D1 migration commands but no migration-ledger check; no schema/migration path changes.
- Standing bars: exact-SHA Verify succeeds; no test is deleted/skipped/weakened; the data-only diff introduces no reproduced security, money or data-loss defect.
- Publication scan, PR merge, deployment and live verification remain the lane's retained work. No scan result or landing authorization is fabricated here.
- Product changes/commits/pushes by gate: none. Clause status changes: none. Findings A–G/BAR: none. Follow-ups: zero. Blockers: none.
- GitHub API calls: six, including the final PR-head confirmation; the CI run was read exactly once.
- Complete actual report and receipt files are preserved in the packet. Report-only publication is separate from product custody. The temporary candidate clone, baseline build and dependency trees are removed after successful evidence transport; no unfinished product work exists.

GATE PASS fa8f9b53062373c3c4a0cab931fe7483f90fef34
