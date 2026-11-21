# Independent gate report: je-gate-67

Author: Run Edit Run fleet, independent gate. Written 2026-11-21T04:40:26Z (date -u).

PR: https://github.com/just-every/home/pull/83
Product branch: cloud/je-sync-57
Gated head: d5a27a8bb527ee2adc7108b6a384e541300acfa1
Required and observed main/base: b31943633013fe0fd6f753579457ecba453ff06a
Decision: may land, carrying one existing Lamp partial-evidence follow-up group (seven promises). No blocking A, B or BAR finding. No product changes, commits, branch pushes, PR changes, merge or deployment performed. No gate product branch was created: this is an independent read-only decision on the builder's exact head. The sole authorized write is the separate evidence ref.

## Plan and execution boundary

1. Set the fleet Git identity; use a fresh depth-1 blobless clone of the declared public home repository and read its AGENTS.md, the launcher AGENTS.md, and both inline briefs. Read no INBOX, STATE, provider credential or home environment file.
2. Fetch pull/83/head, require the frozen candidate and main/base, and compare the entire candidate diff and every candidate commit including side parents. Do not judge a replacement head.
3. Read the published Lamp release once, independently peel its annotated tag with Git, and read public release source files at both versions. Recompute source hashes and trace open-marker identities through the committed sync implementation. Sample unchanged Oncall and Uptime release source hashes to explain marker closure.
4. Run only the frozen rubric's npm ci, listings check/write, type-check, lint and production build, sequentially in this dedicated cloud VM. No full suite or sync crawl. Check the built public /lamp and /data/listings.json doors; assert at 1440 and capture the same screen at 1440 and 390 with real Chromium.
5. Observe the exact-head Verify once. Review release claim/status changes and all ten JE Lamp promises against the released contract. Preserve the seven known partial promises without upgrading or rewriting any claim.
6. Keep the complete non-secret packet outside the clone, publish only evidence/je-gate-67 attached to the already advertised product head, then remove the disposable clone and its node_modules. Keep the packet.

All source/PR/CI reads were unauthenticated public HTTPS or credential-disabled Git. The gate-specific source note forbids credential setup for reads; therefore public REST was used directly rather than an authenticated gh invocation. Three REST reads total: PR, exact-SHA actions list, and Lamp release. No CI watcher, polling, dispatch, rerun or job-log read was necessary. Launcher refresh was deferred until evidence publication, its sole allowed authenticated transport use. Heavy checks ran one at a time, directly here, with the supplied cloud_run subreaper. No additional repository was cloned, no provider was used, and no protected home path was touched.

## Frozen rubric

| Row | Result | Command / observation |
| --- | --- | --- |
| R1 Scope | MET | git diff --stat origin/main HEAD; git diff origin/main HEAD; git diff --check origin/main HEAD; git log origin/main..HEAD with author, committer and unfolded trailers. Exactly the three allowed paths, 14 added / 13 removed lines. One fleet-authored and fleet-committed candidate commit, no trailers; complete candidate range checked. No deleted/skipped/weakened test, no credential-shaped added value. All state changes are provenance/observation hashes, timestamp and open-marker bookkeeping, including the separately disclosed Uptime perceptual fingerprint. No wording changed. |
| R2 Promotion truth | MET | GET public /repos/just-every/run-lamp/releases/tags/v1.11.25 once; git ls-remote --tags for both versions; SHA-256 of released CONTRACT.md, README.md and seed.json; semantic comparison of every listing against main. Non-draft/non-prerelease published release, envelope asset present, tag peels to 09f8cdb44557e43615ffa9321bc2492bb24d0710, matching state. Lamp version agrees in all three touched files. |
| R3 Public data and render | MET | npm ci exit 0; npm run listings -- --check exit 0, current 49; npm run listings exit 0, unchanged; npm run type-check exit 0; npm run lint exit 0; npm run build exit 0. Built /lamp returns 200 and displays v1.11.25. /data/listings.json returns 49 and the same version. Screenshots at 1440 and 390 visually inspected; no overflow, missing images or browser exceptions. All tracked files remain unchanged. |
| R4 Exact-head CI | MET | One GET https://api.github.com/repos/just-every/home/actions/runs?head_sha=d5a27a8bb527ee2adc7108b6a384e541300acfa1&per_page=100. Push Verify branch run 44865228024 is completed/success on exactly the candidate. PR-event Verify 44865280599 is intentionally skipped by the cloud-branch condition; it is not used as green evidence. Dynamic PR run 44865277340 is also success. |
| R5 Claim honesty | MET | Read Lamp v1.11.25 CONTRACT.md requirement/status rows and the complete v1.11.24..v1.11.25 CONTRACT.md/seed.json/README.md diffs; compare every JE Lamp promise. No released source demonstrates any touched claim false. New COMP-011 is a missing target and not claimed on the JE page. Seven inherited partial-evidence promises remain the existing follow-up below. |

## Each changed hunk

- public/data/listings.json: generatedAt advances from 2026-11-21T03:20:12.862Z to 2026-11-21T04:13:50.956Z; Lamp version alone advances v1.11.24 to v1.11.25. All other fields and every other listing are byte-for-byte semantically equal.
- src/data/seed-pages.ts: the existing /lamp entry changes its version string alone. All summaries, capabilities, promises, links, incumbents, coming-soon entries and rendering code remain unchanged.
- scripts/seeds-sync/state.json: syncedAt advances to 2026-11-21T04:14:12.740Z. Lamp commit advances 3f1349f029fa8c8c59bf9adfe4e2ae59fd502842 to 09f8cdb44557e43615ffa9321bc2492bb24d0710; sourceRef and tag become v1.11.25. Its CONTRACT.md hash d87c0980ff9dc859 becomes 5143f61d67908656 and seed.json hash 27ab1bd11b147555 becomes 63620403fd1bc245; README.md remains 402e33bfc617555f. All independently match the public tagged bytes.
- Lamp gains open marker 922fed04eacf; Oncall loses that same marker; Uptime loses 64cb07f6a0dd. These are not clause IDs or status judgments. keyOf is SHA-256(type + ':' + summary) truncated to 12 hex. 922fed04eacf means copy:CONTRACT.md, seed.json changed since the last sync; 64cb07f6a0dd means copy:seed.json changed since the last sync. The same summary gives the same identifier on different seeds, so the apparent move does not transfer a claim between seeds. Lamp has fresh contract/version source changes; Oncall and Uptime have no newly changed copy hashes at their already-recorded release refs. Their three source hashes each were independently checked. closeRecord recomputes open findings after a full apply, closing those old observations. bf4b3f38e1a2 (no alternative-to line on the homepage) remains for Oncall and Uptime.
- Uptime's stored home.signature also changes one hexadecimal channel at zero-based offset 328, d to e, in 432 characters (144 RGB cells). This hunk is a homepage observation fingerprint, not page wording or a new source promotion. Delta 1 is below compareSignatures' >1 channel threshold: zero materially changed cells, below the 2% changed-share threshold. The brief's context omitted this observation refresh; the report does not omit it.

## Promotion, counts and preserved boundaries

Lamp public release: https://github.com/just-every/run-lamp/releases/tag/v1.11.25
Published: 2026-11-21T03:46:07Z; draft false; prerelease false.
Assets: rer-release.dsse.json and 01-public-status-active-desktop.png. Envelope presence only: no signature-verification claim.
Annotated tag object: e24bf83fc6b11ff06acd7723957d13a5006baaed.
Peeled source commit: 09f8cdb44557e43615ffa9321bc2492bb24d0710.
Previous peeled source commit: 3f1349f029fa8c8c59bf9adfe4e2ae59fd502842.

Catalogue before and after: 49 = 35 released + 14 coming soon. Only Lamp's version changes. HappyToHelp remains v0.4.31; Uptime v0.5.19; Oncall v0.5.22; Orbit v0.4.12; Spool v0.7.16. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No release-status changes, no wording change, and no coming-soon copy import. Assisted US$10/month and Managed US$100/month terms receive no edits: no pricing/content/render source changes at all; /lamp itself does not display those plan prices. No RER deployment or price-provider audit was added to this gate.

The seed contract diff adds COMP-011 (shared ordering of groups and ungrouped components), adds it to the components MCP clause list and general landing-claim mapping, and records it as target/missing. Published summary remains 45 done / 62 partial / 0 missing = 107. Target summary becomes 20 done / 62 partial / 56 missing = 138, previously 137 with 55 missing. All clauses become 65 done / 124 partial / 56 missing = 245, previously 244. No existing clause changes Status, Gap or Evidence; all ten JE promise status rows are identical across the two release tags. seed.json changes only version 1.11.24 to 1.11.25; README.md is identical. JE makes no claim about COMP-011's unbuilt shared ordering.

Incumbents named by Lamp's Product target: Atlassian Statuspage, Better Stack Status Pages, Status.io. The relevant buyer behaviour is customer-facing status publication and subscriber updates. This round changes JE release catalogue metadata rather than implementing new status-page behaviour; the existing JE incumbent links and claims are unchanged. No new competitor benchmark or parity obligation was introduced.

## Independent checks and browser evidence

No CONTRACT.md, sources.lock.json, contract-docs generator, Lander-Regenerate command or migration-ledger check exists in this home checkout. Seed-only source-lock/generated-view/migration-ledger steps are not applicable to this catalogue maintenance gate; no other repository was cloned to manufacture those checks. The documented relevant generated output is listings.json: both its check and write were independently run and produced no tracked diff. No migration or runtime behaviour changed.

Runtime: Node v24.19.0, npm 11.9.0; repository packageManager declares npm 10.9.3 and Node 18+ in AGENTS.md. The supplied cloud toolchain was sourced in each heavy command shell. npm ci installed 715 packages successfully and preserved package-lock.json. No dependency pins or product code were changed. Local commands used this VM runtime; exact-head CI independently runs its workflow on Node 22.

At 1440: document/client/body widths all 1440; page heading Lamp, version v1.11.25, no missing images or page errors. At 390: widths all 390, same heading/version, no missing images or page errors; phone navigation, carousel peek, promise cards and facts remain readable and contained. Assertion journey ran at 1440 only; 390 is visual proof and recorded metrics. Renderer and styles are identical to main and the only public data delta is the version value, providing the focused regression comparison.

The first browser attempt waited for networkidle, which timed out while the real media page remained active. Its failure receipt is retained. A single corrected harness attempt waited for DOM content, heading, local logo and document fonts; it passed without intercepting requests, mocking application paths or changing product code. next start emitted its existing standalone advisory; local tokens/events APIs also logged unavailable Cloudflare cache/local D1 table diagnostics. Those unrelated endpoints are unchanged from main and are outside this release/version door; no application fix or provider access was attempted. Each server was stopped by its recorded PID and both browser sessions were closed. No server or browser is left running.

## Existing follow-up group (one C, seven promises)

FOLLOW-UP C: Carry forward Lamp's existing partial-evidence promises listed below. These are unchanged from main and v1.11.24; the new release source does not prove them false. Partial evidence is not treated as a new correctness/privacy/money defect, and none blocks this maintenance change.

- INTAKE-002: “Monitoring alerts follow the source's intake policy, which keeps a private draft until publication by default. Your company's policy decides agent publication; an alert alone is never a finished customer update.”
  Released status: partial. Gap: The cited journey asserts a private draft and page exclusion. It does not measure the 30-second create/update bound or compare all public surfaces. The class/policy wording carries no promotion.
- INCIDENT-004: “A published update is never edited or deleted; a correction is a new update and both stay on the public timeline.”
  Released status: partial. Gap: Asserted: original wording retained; correction identifies original; both updates retained. Unasserted in old cited evidence: published deletion refused; public publication order.
- UPDATE-008: “Publishing is a single step: the update and the list of people to notify are saved together.”
  Released status: partial. Gap: Asserted: update once; recipients once; no failed recipient. Unasserted in old cited evidence: narrowing preserves delivery; unsubscribe suppresses delivery; failed update not public; retry to success; dispatch does not block.
- NOTIFY-009: “Publishing still works while email, the queue or a subscriber's endpoint is failing.”
  Released status: partial. Gap: Old cited evidence asserts only the previously described delivered slice. It does not assert: mail provider failure publish; queue failure publish; endpoint failure publish; public page survives delivery failure; feed survives delivery failure; widget survives delivery failure; recovery preserves and delivers committed set.
- PAGE-006: “If the database or queue is down, the public page, feed and banner keep serving the last known state, labelled as such, and never show a false all-clear.”
  Released status: partial. Gap: Old cited evidence asserts The page body still contains Partially unavailable after database removal; Stale page content is labeled Last known state; The generation instant is visible in stale page content; The retained failure body contains Partially unavailable. Unasserted: The Atom feed survives database outage; The widget survives database outage; Page content survives queue outage; Atom feed content survives queue outage; Widget content survives queue outage; Page content survives object-storage outage; Atom feed content survives object-storage outage; Widget content survives object-storage outage; Origin outage uses the specified cached-response window; Page is unavailable only before first publication; Atom feed is unavailable only before first publication; Widget is unavailable only before first publication.
- MOVE-002: “Moving in keeps original update times, notifies nobody, and brings email subscribers over as pending until they confirm.”
  Released status: partial. Gap: Old cited evidence asserts Sorry incident update timestamps equal source times; Past Sorry maintenance is completed; Imported Better Stack maintenance has no native notice; Import queues no notification delivery. Unasserted: Complete imported component history derives from original update times; Concurrent repeated applies send no mail; Preview sends no mail; Every resume sends no mail; Cutover checks send no mail; Each imported email subscriber is pending.
- SUB-006: “Every notification email carries a one-click unsubscribe.”
  Released status: partial. Gap: Old cited evidence asserts mail unsubscribe value is present; web unsubscribe value is present; one-click declaration; URL-encoded deactivation. Unasserted: visible unsubscribe link in notification body; multipart form deactivation; DKIM coverage of both unsubscribe headers; per-token allowance independence.

The three other promise rows are done: UPTIME-001, PAGE-013 and NOTIFY-004. No evidence/status promotion is inferred for the seven partial rows.

NOTE G: Uptime's harmless observation fingerprint is an additional bookkeeping hunk beyond the builder's short context summary; it is explicitly accounted for above.
NOTE G: Initial browser networkidle timeout was a harness readiness choice; the corrected real-page probe passed. No workflow rerun or product modification was needed.

## Handoff and custody

No blocker. Product clause status changes: none. Existing Lamp partial judgments remain intact. Existing unrelated Terrace, HappyToHelp and Spool follow-ups are not re-audited or widened. The independent exact-head Verify is green; publication scan, PR landing and deployment remain the fleet/lander's work. This report does not claim the cloud ran the Mac publication scan.

The packet explicitly selects this report, FOLLOW-UPS.md, LANDING-NOTES.md, install-receipt.json, checks.json, public-source-receipt.json, provenance-receipt.json, claim-review.json, browser-first-attempt.json, browser-receipt.json, lamp-1440.png and lamp-390.png. No source/environment dumps, credentials, email addresses, private gate material or symlinks are selected. Evidence publication is separate from product readiness and does not change the checkout/head/index. The terminal EVIDENCE line identifies its actual remote commit; a separate local publication receipt is retained after transfer. Disposable clone cleanup follows publication.

GATE PASS WITH FOLLOW-UPS 1 head=d5a27a8bb527ee2adc7108b6a384e541300acfa1
