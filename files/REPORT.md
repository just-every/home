# je-gate-68 independent gate of PR 84

Signed: Run Edit Run fleet, 2026-11-21T06:56:55Z. All report timestamps come from date -u.

Decision: PR https://github.com/just-every/home/pull/84 may land with one carried, nonblocking copy follow-up. No new blocking findings. Candidate branch cloud/je-sync-58, exact head a4432df44b1f920691386ab779c89246fdbb047e; baseline origin/main e572559bee1902ab7f01fe2fe279e55a6a9c35ff. No product changes, commits, product pushes, PR comments, merges or deployments were made. No cloud/je-gate-68 product candidate is being proposed by this read-only gate.

## Plan and execution

1. Configure the required fleet identity; use the gate brief's explicit public-read exception to avoid launcher refresh and credential use during review. Read the launcher AGENTS.md and repository AGENTS.md, plus the two inline briefs. Clone only just-every/home, shallow and blobless; retain origin/main, fetch pull/84/head and check out the exact requested head.
2. Check PR metadata, advertised head/base, full three-file diff, all candidate identities/trailers and credential-shaped additions. Inspect sync implementation only far enough to explain every changed state field.
3. Read the release exactly once, independently resolve annotated tag commits through Git, read public Spool CONTRACT.md/README.md/seed.json at both release tags, and sample the Lamp marker's source hashes.
4. Run npm ci, listings check and regeneration, type-check, lint and production build sequentially in this dedicated VM. Do not run the full suite, sync all seeds, use provider credentials or modify source.
5. Read exact-head CI once; inspect the built real /spool route with Chromium at 1440 and 390, assert the public page at 1440, visually review both captures, and compare the touched render/data source against main.
6. Write the report, actual receipts and captures outside the product checkout. Refresh the launcher only for the explicitly permitted evidence transfer, install the fleet bundle-backed Git helper and evidence entrypoint, publish selected files solely to evidence/je-gate-68, preserve report custody, and delete the clone/node_modules after publication. Stop only the recorded server PID and close browsers.

## R1 — MET: scope and identity

Commands: git rev-parse origin/main HEAD; public GET /repos/just-every/home/pulls/84; git ls-remote origin refs/heads/main refs/heads/cloud/je-sync-58 refs/pull/84/head; git diff --stat origin/main HEAD; git diff --check origin/main HEAD; git log origin/main..HEAD with author, committer and unfolded trailers; recursive JSON comparison; credential-shaped diff scan.

Result: PR open, nondraft; PR head and origin/cloud/je-sync-58 both a4432df44b1f920691386ab779c89246fdbb047e; PR base and origin/main both e572559bee1902ab7f01fe2fe279e55a6a9c35ff. The remote refs were rechecked before evidence preparation. Exactly three changed paths, 12 insertions and 12 deletions. No tests are changed, deleted, skipped or weakened. The one candidate commit has fleet author and committer and no trailers. No credential-shaped value found in the full diff. Identity addresses were checked in the terminal and intentionally omitted from this public packet.

Every hunk:
- public/data/listings.json: generatedAt 2026-11-21T04:13:50.956Z to 2026-11-21T06:34:31.289Z; Spool version v0.7.16 to v0.7.17. No other listing differs.
- src/data/seed-pages.ts: the sole Spool version string changes. The entire file equals baseline after substituting that one version.
- scripts/seeds-sync/state.json: syncedAt 2026-11-21T04:14:12.740Z to 2026-11-21T06:34:19.798Z; Spool commit/sourceRef/tag follow the new release; its seed.json copy hash changes. CONTRACT.md and README.md hashes are unchanged. Lamp's open marker is removed, Spool's is added. Uptime's home.signature also changes at zero-based hex position 328, e to d, in its 432-character colour fingerprint. This additional hunk was omitted from the builder summary but is observation bookkeeping: no Uptime wording, art, URL, version or status changes. compareSignatures counts only channel deltas greater than 1, so this one-step channel delta yields changedShare 0 and changed false.

Marker explanation, traced to scripts/seeds-sync/detect/index.mjs, detect/copy.mjs and apply/index.mjs:
- keyOf is SHA-256 of type + ':' + summary, truncated to 12 hex.
- 922fed04eacf = SHA-256('copy:CONTRACT.md, seed.json changed since the last sync')[:12]. It belonged to Lamp, not Spool. Lamp's baseline and candidate copy provenance are already identical; fresh public reads of run-lamp v1.11.25 confirm CONTRACT.md hash 5143f61d67908656 and seed.json hash 63620403fd1bc245, matching state. detectCopy therefore finds no new hash difference and a full apply's closeRecord no longer retains that historical marker. Removal is bookkeeping, not a claim that every Lamp promise was repaired.
- 64cb07f6a0dd = SHA-256('copy:seed.json changed since the last sync')[:12]. It belongs to Spool's version-only seed.json update. Copy findings have apply null, so closeRecord remembers that reported, unapplied item. It is not imported wording or an implementation-status promotion.

## R2 — MET: promotion truth

Commands: one public GET https://api.github.com/repos/just-every/run-spool/releases/tags/v0.7.17; git ls-remote for v0.7.16 and v0.7.17 and their peeled annotated tags; public raw HTTPS reads of each release's CONTRACT.md, README.md and seed.json; JSON listing comparison.

Release: https://github.com/just-every/run-spool/releases/tag/v0.7.17, published 2026-11-21T05:40:50Z, draft false, prerelease false; assets include rer-release.dsse.json and spool-issue-page-1600.png. Envelope asset presence was verified; no signature verification is claimed.

Independent tag resolution:
- v0.7.16 tag object d7bc1dee9b7035e1f4beceee3db1c41952b7a3e3; peeled commit 804a4ad15e6c8e1c52f0069dcf610ba1f5d2342c.
- v0.7.17 tag object 5c503761af3001d6cc3edb5000dd70f028418d00; peeled commit 512977a936e6bda3f76c3a68e2511e62cb56090d.

Spool's listing and page agree on v0.7.17; state sourceRef/tag agree and state.commit equals the independently peeled commit. seed.json identifies Spool as errors-workbench, version 0.7.17. No source was matched by an assumed RER slug.

All other listings are byte-equal, including HappyToHelp v0.4.31, Lamp v1.11.25, Uptime v0.5.19, Oncall v0.5.22 and Orbit v0.4.12. No wording or coming-soon copy was imported. No status changed. No new release search or RER live-data sync was added to this frozen gate.

## R3 — MET: public data and render

Commands and outcomes, in order:
- npm ci — exit 0, 715 packages installed; repository prepare hook ran.
- npm run listings -- --check — exit 0, Listings current (49 seeds).
- npm run listings — exit 0, Listings unchanged (49 seeds); git status remains clean.
- npm run type-check — exit 0.
- npm run lint — exit 0.
- npm run build — exit 0, production pages generated (61/61).
- cloud_run next start --hostname 127.0.0.1 --port 3168, followed by a Playwright public-door read of http://127.0.0.1:3168/spool — HTTP 200 at both widths; title Spool; v0.7.17 visible; scrollWidth 1440 at width 1440 and 390 at width 390. Browser assertion runs at 1440; 390 is the requested visual proof. Both full-page images were inspected and show no layout break.

Before and after counts: 49 = 35 released + 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent. The JSON comparison proves no other listing or order changed.

Pricing is untouched: all render/pricing/content sources are identical to main. The literal Assisted US$10/month and Managed US$100/month phrases do not occur in either checkout's current source; this PR neither changes nor removes them and adds no GST or billing-country wording. This is a preservation check, not a claim that those offers are rendered on /spool.

Regression comparison: the page's layout/components/styles, src/data/seeds.ts, upcoming.ts and src/content are identical to main. seed-pages.ts is byte-identical after the sole version replacement; generated listings differ only by that version and generatedAt. The rendered changed page remains legible and the version fits at both required widths. No unrelated routes or full suite were added.

Browser limitation: the initial networkidle navigation timed out after 30000ms. The actual server rendered the page, but optional token/analytics requests encountered unavailable local Cloudflare caches and an unmigrated page_views table. The probe was repeated with DOMContentLoaded and actual font/version visibility; it passed without mocks or suppressed network requests. These are local runtime observations, not a new source change or a failure of the named page. The browser closed and recorded next-server PID 1241 was sent TERM; the subreaper command finished.

Independent generator applicability: this home repository has no CONTRACT.md, sources.lock.json, documented source-lock generator, contract-view generator or migration-ledger check. These seed-specific steps are not applicable here. The applicable documented listing generator was independently checked and run with no diff. Spool's public source was read without cloning or executing that separate repository.

## R4 — MET: exact-head CI

Public API query: https://api.github.com/repos/just-every/home/actions/runs?head_sha=a4432df44b1f920691386ab779c89246fdbb047e&per_page=100, read once.
- Verify branch run 44876309710 — completed/success, exact head a4432df44b1f920691386ab779c89246fdbb047e, https://github.com/just-every/home/actions/runs/44876309710.
- PR #84 run 44876350833 — completed/success on the same head.
- Verify branch run 44876352831 — completed/skipped on the same head; it is not the green evidence. The workflow intentionally skips the redundant pull_request job for cloud branches.

No workflows were dispatched or rerun. No polling/watchers or log downloads were needed. The requested unauthenticated gh api command was tried once with empty credentials/config and refused locally with the standard authentication prerequisite. Because this gate explicitly prohibits credential use for reads, the same public REST endpoint was read using unauthenticated HTTPS. Three successful public REST calls total (PR, CI listing, release), plus that one local CLI refusal; raw-source and Git ref reads are separate public transports. No token was read or printed by the gate. Launcher refresh happened only after all review checks, for evidence publication.

## R5 — MET, with one carried follow-up: claim honesty

Sources read fully at both tags:
- https://raw.githubusercontent.com/just-every/run-spool/v0.7.16/CONTRACT.md
- https://raw.githubusercontent.com/just-every/run-spool/v0.7.17/CONTRACT.md
- Corresponding README.md and seed.json at each tag.

CONTRACT.md and README.md are byte-identical across the release. seed.json differs only in version 0.7.16 to 0.7.17; there is no new copy claim. Computed SHA-256 prefixes match both prior and candidate state:
- CONTRACT.md ee9c871bfa25a110 at both tags.
- README.md a9c5f1be825c6da3 at both tags.
- seed.json e12b3e10eb61e0ee to ae789445b452ee5a.

Incumbents from Spool CONTRACT.md Product target: Sentry, Datadog Error Tracking, Rollbar and Bugsnag (SmartBear). The touched behavior is catalogue release identity; no new product behavior claims were introduced or independently held against a broader incumbent standard.

Status table reviewed: ERR-001/002/003/004/006/007/008/009 are done, ERR-005 is partial. JE's displayed promises name ERR-003, ERR-004, ERR-002, ERR-006, ERR-007 and ERR-008, all done in that release's source table. A status alone is not a hosted/provider proof; no new false statement is established by the version-only release delta.

The carried ERR-006 sentence in src/data/seed-pages.ts is:
"Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm."

CONTRACT.md ERR-006 Requirement (line 157) distinguishes native registered ordering from Sentry rules and says plain Resolve regresses on the next accepted event in any release. The public JE sentence lacks that qualification. It is the explicitly known pre-existing copy follow-up, present on main and unchanged in this PR. No copy is rewritten here and no product clause status changes.

## Findings and custody

OUT OF SCOPE D: carried ERR-006 copy qualification above; the sentence is unchanged from main. Retain it for the next copy round. One carried follow-up, zero new blocking findings.
NOTE G: local networkidle/optional analytics limitation and the unauthenticated gh prerequisite are documented above; successful public page/REST observations are retained, without adding a product bar.
NOTE F: Mac publication scan, PR landing and deployment remain with the fleet; this cloud gate does not claim to run or waive them.

Clause status changes: none. Before/after public listing counts: 49/49, released 35/35, coming soon 14/14. Product HEAD remains a4432df44b1f920691386ab779c89246fdbb047e; all source changes belong to the already-published builder candidate. No blockers remain for this gate's frozen rubric. Evidence publication is separate from READY or landing.

Report packet: REPORT.md, CHECK-RECEIPT.json, BROWSER-RECEIPT.json, SOURCE-RECEIPT.json, FOLLOW-UPS.md, LANDING-NOTES.md, CHECKS.log, spool-1440.png and spool-390.png. Only explicitly selected regular files are published; public source documents and raw API metadata containing personal addresses are not included. No environment dumps, credentials, held-out private material or symlinks are selected.

GATE PASS WITH FOLLOW-UPS 1 head=a4432df44b1f920691386ab779c89246fdbb047e
