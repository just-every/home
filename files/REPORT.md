# je-gate-46 — independent deciding gate of PR #62

Signed: Run Edit Run fleet / Codex independent gate, 2026-11-15T16:49:17Z (UTC from `date -u`).

Decision: PASS. No blocking findings and no new follow-ups. The gate examined exactly `4a7cef36328b98da774deab81849d7aa9a3fc1fd` on `cloud/je-sync-38`, PR https://github.com/just-every/home/pull/62, against main `e65b94456024ec80409449a4b7b91dedcd88f9a9`. Initial PR API metadata and terminal Git ref probes agree on the pinned head and base. The gate made no product change, product commit, product push, PR comment, merge or deployment. `cloud/je-gate-46` was created locally from main as instructed; the reviewed checkout is detached at the candidate for report provenance. Only the separately authorized evidence ref receives reports.

## Plan and execution

1. Configure fleet identity, refresh the authorized launcher, install the decrypted-bundle Git helper, read launcher/repository AGENTS.md and the two inline briefs. Clone only just-every/home shallow with blob filtering, retain origin/main, fetch pull/62/head, and check the exact pinned commit before judging.
2. Read every changed hunk and all candidate commit identities/messages; structurally compare listings, seed page copy and sync state. Trace copy keys and hashes through the committed sync implementation.
3. Independently probe the five annotated tags with `git ls-remote --tags`; use one `gh api graphql` request to read each new release once, the resolved tag targets, and old/new CONTRACT.md, README.md and seed.json blobs. Recompute all 15 new copy hashes and compare all five old/new contract status tables.
4. Run only the named checks, one heavy job at a time: npm ci; listings check and generation with a clean-diff check; type-check; lint; production build. Serve the production output and inspect Lamp and Spool at 1440 and 390 using headless `/usr/bin/chromium --no-sandbox`. Build the retained main once for the requested regression comparison of the same pages, then restore the pinned candidate.
5. Read exact-head Actions runs once through REST; preserve actual public evidence and receipts; stop only server descendants started by this gate; publish the explicitly selected packet to evidence/je-gate-46; delete the clone and node_modules after successful evidence transfer.

## Frozen rubric

| Row | Status | Command / source and observed result |
| --- | --- | --- |
| R1 Scope | MET | `git diff --name-status origin/main HEAD`, complete `git diff origin/main HEAD`, recursive JSON comparison, `git log origin/main..HEAD --format=...`, credential-shape checks and `git diff --check`: exactly the three allowed files; one fleet-authored/fleet-committed candidate commit, no trailers, no credential-shaped value in its diff, no test path changed. |
| R2 Promotion truth | MET | Five `git ls-remote --tags` probes plus the single saved `gh api graphql -f query=...` request: every tag peels to the state commit, every release is published/non-draft/non-prerelease and contains rer-release.dsse.json. All five versions agree across listings and seed-pages, and state sourceRef/tag. No other listing changes. |
| R3 Public data/render | MET | `npm ci`, `npm run listings -- --check`, `npm run listings`, `git diff --exit-code`, `npm run type-check`, `npm run lint`, `npm run build` all exit 0. Head/main built-page browser comparisons pass on /lamp and /spool at 1440 and 390. 49 = 35 released + 14 coming soon before and after; eight excluded slugs absent. No pricing or wording changes. |
| R4 Exact-head CI | MET | `gh api 'repos/just-every/home/actions/runs?head_sha=4a7cef36328b98da774deab81849d7aa9a3fc1fd&per_page=100'`: push Verify branch run 43735528330 completed/success on this exact SHA. PR Verify 43735573750 is intentionally skipped by the existing cloud-branch job guard; dynamic run 43735570352 also completed/success. No dispatch, rerun or watcher. |
| R5 Claim honesty | MET | Released source blobs, their status tables and named promise clauses compared with the five JE entries; sampled every changed copy hash. No newly false public sentence identified. Partial evidence alone was not treated as falsity. No source status promoted. |

All executed named checks passed. Source-lock regeneration/check, contract-view write/check and migration-ledger check are not applicable: this home repository has no root CONTRACT.md, sources.lock.json, contract generator, or migration ledger command. Its documented listings generator was independently run and checked. Existing D1 migrations are untouched; no database migration or provider operation was needed for the named static-page review. No broader suite or all-seed sync was added to the frozen gate.

Pricing preservation is a diff conclusion: the three changed files add no pricing, GST or billing-country statements, and no pricing path changes. The literal Assisted/Managed US$10/US$100 statements do not appear in either version's tracked textual source or these two built pages; this report does not claim an independent observation of an external pricing service.

## Every changed hunk

- public/data/listings.json: generatedAt advances from 2026-11-15T10:08:28.040Z to 2026-11-15T16:24:40.689Z. Exactly five version properties advance: Lamp v1.11.17 → v1.11.18; Oncall v0.5.14 → v0.5.15; Orbit v0.4.9 → v0.4.10; Spool v0.7.11 → v0.7.12; Uptime v0.5.11 → v0.5.12. Every other listing field is byte-equivalent as a parsed value. HappyToHelp remains v0.4.28.
- src/data/seed-pages.ts: exactly the same five version literals advance. Summaries, does lists, promises, SEO, links and all other seeds remain unchanged. There is no coming-soon copy import.
- scripts/seeds-sync/state.json: syncedAt advances from 2026-11-15T10:08:12.915Z to 2026-11-15T16:24:37.661Z; only the five release commit/sourceRef/tag pins, the indicated copy hashes, and five open-key add/remove operations change. No stored brand token, mark, home headline/fingerprint or sourceReason changes. Full structural changes are in state-diff.json.
- Lamp: commit/sourceRef/tag advance; only seed.json copy hash changes, because its version property changes. Its existing open copy key is unchanged.
- Oncall: commit/sourceRef/tag advance; README and seed.json hashes change only for release version references. The README still describes hosted coordination. open 42983364b373 is added.
- Orbit: commit/sourceRef/tag advance; CONTRACT.md adds Zoom to the list of real integrations, and seed.json adds the optional Zoom adapter metadata plus the version bump. No JE Zoom sentence is imported. open 922fed04eacf is added.
- Spool: commit/sourceRef/tag advance; seed.json hash changes only for its version. open 64cb07f6a0dd is added.
- Uptime: commit/sourceRef/tag advance; CONTRACT.md adds bounded qualification paragraphs for NETWORK-001 rebinding and OPS-003 healthy-digest custody; README release-record versions and seed.json version change. The status table remains unchanged. open c843303a1181 is added.
- HappyToHelp (the seed immediately before Inkwell): removes open 42983364b373 only; its commit, version source, copy hashes and public wording remain unchanged.

The apparent moved open marker is not a transferred issue. `detect/index.mjs:keyOf` hashes `finding.type + ':' + finding.summary`, truncated to 12 hex digits; the slug and commit are not in that key. Independently recomputed keys are: 42983364b373 = copy:README.md, seed.json changed since the last sync; 922fed04eacf = copy:CONTRACT.md, seed.json changed since the last sync; 64cb07f6a0dd = copy:seed.json changed since the last sync; c843303a1181 = copy:CONTRACT.md, README.md, seed.json changed since the last sync. `closeRecord` retains current un-applied findings; a full apply drops an old copy-change marker when its already-recorded hashes no longer differ. A copy-only apply unions the previous markers instead. These keys record detector observations, not completed fixes, contract judgments or wording edits. The same summary can legitimately occur under HappyToHelp and Oncall.

## Released-source provenance

Asset presence below is not DSSE signature verification. Each row's release was read once in the saved GraphQL response; independent Git peeling agrees with it. All CONTRACT/README/seed hash values in candidate state were recomputed from those released blobs and matched exactly.

| Seed | New version | Exact released source commit | Published UTC | Release |
| --- | --- | --- | --- | --- |
| lamp | v1.11.18 | `f495b89afd9f6832e4d4807018d91fa4c4670147` | 2026-11-15T12:40:20Z | https://github.com/just-every/run-lamp/releases/tag/v1.11.18 |
| oncall | v0.5.15 | `44ca722b6a5dde173b5253df7b5e0eab762df459` | 2026-11-15T13:34:20Z | https://github.com/just-every/run-oncall/releases/tag/v0.5.15 |
| orbit | v0.4.10 | `22ca38c0e0bb5784440df021e8a5eb5b41a81de8` | 2026-11-15T13:47:13Z | https://github.com/just-every/run-orbit/releases/tag/v0.4.10 |
| spool | v0.7.12 | `cc086904fd942175d18c60082b10c459c343dc78` | 2026-11-15T12:41:15Z | https://github.com/just-every/run-spool/releases/tag/v0.7.12 |
| uptime | v0.5.12 | `2045014b15f76380b5d7493c0c42b2caa430f88b` | 2026-11-15T14:03:19Z | https://github.com/just-every/run-uptime/releases/tag/v0.5.12 |

## Claim review and incumbent boundary

Home has no Product target/CONTRACT incumbent table. This catalogue change is judged against the fixed listing rubric. The five released source contracts name their product incumbents: Lamp — Atlassian Statuspage, Better Stack Status Pages, Status.io; Oncall — PagerDuty, Opsgenie/Jira Service Management, Splunk On-Call; Orbit — HubSpot Sales Hub, Pipedrive, Salesforce Sales Cloud; Spool — Sentry, Datadog Error Tracking, Rollbar, Bugsnag; Uptime — Pingdom, UptimeRobot, Better Stack Uptime, Site24x7. This gate makes no claim to have rerun those products or incumbent suites.

The old and new status tables are identical for each release pair. Counts, expressed done/partial/missing: Lamp 60/129/55 (244); Oncall 26/41/34 (101); Orbit 42/130/32 (204); Spool 23/54/28 (105); Uptime 37/58/20 (115). JE clause-status changes: none. No implementation status is inferred from release publication or from copy hashes.

Every named promise in the five JE entries was compared to the corresponding released clause and status row; exact sentences, clauses and source line numbers are in claim-clauses.txt and claim-review.txt. In particular, Oncall OC-012 retains paging OFF and OC-006 bounds approved signed response events; the JE copy already reflects that distinction. Orbit's Zoom addition does not make its existing manual CRM/outreach sentences false. Uptime's two new bounded qualifications add evidence without removing its broader partial gaps. Lamp and Spool source-copy diffs are version-only.

OUT OF SCOPE D: The known unchanged Spool ERR-006 sentence, “Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm.” The released requirement also states that plain Resolve regresses on the next accepted event in any release under SDK-009. Both the JE wording and that requirement predate this candidate; the frozen brief explicitly carries this mismatch. No new finding or FIX request results.

Known HappyToHelp partial-evidence promises, Terrace trust wording and Lamp/Uptime partial-evidence follow-ups remain carried context. Partial or unasserted status rows do not by themselves prove a false claim. No new C finding was demonstrated.

## Browser proof and limits

Head and baseline production builds each returned HTTP 200 for /lamp and /spool. Chromium screenshots at both widths were visually reviewed. Versions at head are v1.11.18 and v0.7.12; baseline versions are v1.11.17 and v0.7.11. Rendered text is identical after replacing only the version, at both widths. Document widths equal the viewport (1440/390), with no horizontal overflow or page exceptions. Head/main heights also match: Lamp 4798/4876, Spool 4419/4367 at desktop/phone. Full-page PNGs, extracted rendered text and actual browser receipts are included.

NOTE G: The first browser navigation used networkidle and timed out while the page retained ancillary network requests. The probe was corrected to wait for DOM content, fonts and a bounded render settling interval; no application code was changed. Local next start also reports missing Cloudflare caches/D1 analytics tables in this fresh non-provider runtime. The named static pages render correctly on head and main; those ancillary runtime services are not qualified by this gate. The actual startup diagnostic is retained in server-head.log.

The Mac publication scan, PR merge, deployment and live-site proof remain with the lane. No signature, hosted-provider or live-deployment acceptance is claimed. Builder report/evidence refs were not used as deciding evidence. No helper agent was needed. GitHub use was three API calls total (PR metadata, batched released sources, exact-head run discovery); independent ref transport used Git. No CI wait or failed-job log call was needed.

## Custody

All public report/receipt/proof files are under the task packet outside the product repository. Product tree was clean at the reviewed head before evidence publication. Evidence publication is report-only and conveys no product READY or landing authority. The gate clone and node_modules are deleted only after successful evidence publication; reports are retained.

Blockers: none. New blocking findings: 0. New follow-ups: 0. Verdict: GATE PASS on the pinned head.
