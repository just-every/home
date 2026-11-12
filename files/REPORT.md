# je-gate-31 independent deciding gate — PR #47

Decision: GATE PASS on `14bbb698b7d9e77a3d041794d84b56420fbbf737`. No A, B, BAR or new C findings. PR #47 may proceed through the lane's existing publication, landing and deployment gates.

Repository: just-every/home. Existing PR: https://github.com/just-every/home/pull/47. Candidate branch: cloud/je-sync-23. Full baseline main: `705bb0253c0285659279a6acb862437b25bcc2c4`. Both initial and final REST PR observations confirm this exact head and base; origin/main resolves to that base. Review was independent of the builder, with no delegated reviewer or builder receipts relied on. No product code, copy, tests, contract or clause status was changed. No product commit, push, merge, comment, deployment or CI dispatch/rerun was made. The required local cloud/je-gate-31 branch was created from origin/main but remains unpublished; the inspected checkout is detached at the exact candidate. Only report evidence is published.

## Frozen rubric results

| Row | Result | Commands / evidence | Outcome |
| --- | --- | --- | --- |
| R1 Scope | MET | `git diff --stat origin/main HEAD`; `git diff origin/main HEAD`; `git diff --check origin/main HEAD`; `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`; structural comparison recorded in scope-receipt.json | Exactly the three allowed paths; 47 insertions/45 deletions; one candidate commit; both identities are Run Edit Run fleet <fleet@runeditrun.com>; no trailers, changed tests or credential-shaped values. All hunks explained below. |
| R2 Promotion truth | MET | `gh api graphql -F query=@/tmp/je-gate-query.graphql` (source-query.graphql); tagged refs, release lists and contracts; JSON/TypeScript/state comparison | Five eligible releases and tags exist; DSSE asset present in each; all three local data sources agree. No other version or released/coming-soon status changed. HappyToHelp stays v0.4.22; wording and coming-soon entries stay unchanged. |
| R3 Public data/render | MET | `npm ci`; `npm run listings -- --check`; `npm run listings`; `git diff --exit-code`; `npm run type-check`; `npm run lint`; `npm run build`; Chromium production probes on `/spool`, `/lamp`, `/orbit`, `/oncall`, `/uptime` and `/data/listings.json`; same baseline build/routes | Every command exited 0. Listings remain 49 = 35 released + 14 coming soon. Generator produces no diff. All five pages return 200 with new versions at 1440 and 390; no document overflow or browser pageerror. Main comparison preserves layout. Pricing/copy paths unchanged; absent Assisted/Managed literal statements are disclosed below rather than claimed as visible. |
| R4 Exact-head CI | MET | `gh api 'repos/just-every/home/actions/runs?head_sha=14bbb698b7d9e77a3d041794d84b56420fbbf737&per_page=100'` read once | Verify branch push run **43266034973**, completed/success on the exact candidate. PR dynamic run **43266081586** also succeeded; redundant PR Verify **43266087998** is skipped by its documented cloud-branch job condition. |
| R5 Claim honesty | MET | Same source GraphQL call reads each tagged CONTRACT.md; `node --import tsx /tmp/je-gate-inspect.mjs` extracts unchanged JE copy; review of tagged status tables, gaps and clause definitions | Reviewed all five summaries, does lists and 46 named promises. The source does not demonstrate a new false claim on these touched entries. Partial evidence alone is not treated as falsity. Known pre-existing copy follow-ups remain out of scope; exact sentences/ids/status/gaps are in the appended map and claim-source-excerpts.md. |

No required rubric check remains NOT RUN. No blocking condition was reproduced. No pre-gate refusal applies.

## Every diff hunk

- `public/data/listings.json:2`: generatedAt advances from 2026-11-12T11:45:53.358Z to 2026-11-12T17:02:07.783Z. The other five hunks change only Lamp v1.11.12 → v1.11.13, Oncall v0.5.9 → v0.5.10, Orbit v0.4.6 → v0.4.7, Spool v0.7.7 → v0.7.8 and Uptime v0.5.7 → v0.5.8. Every other listing field is equal, including status, line, headline, URLs, art, colours and incumbents.
- `src/data/seed-pages.ts`: exactly five version properties change to the same five values. Replacing only these old version literals in the baseline reconstructs the candidate file byte for byte; no summary, does, promises, import list, running guidance, SEO or other wording changes.
- `scripts/seeds-sync/state.json:2`: syncedAt advances from 2026-11-12T11:45:50.071Z to 2026-11-12T17:02:02.549Z.
- State HappyToHelp: removes only its old `open: ["42983364b373"]` observation marker. Its version, status and provenance are unchanged.
- State Lamp: commit/sourceRef/tag move to the v1.11.13 release commit; CONTRACT.md, README.md and seed.json hashes update; adds open marker c843303a1181.
- State Oncall: commit/sourceRef/tag move to v0.5.10; the three copy-file hashes update. Existing open marker is unchanged.
- State Orbit: commit/sourceRef/tag move to v0.4.7; CONTRACT.md and seed.json hashes change, README.md hash stays the same; adds open marker 922fed04eacf.
- State Spool: commit/sourceRef/tag move to v0.7.8; README.md and seed.json hashes change while CONTRACT.md hash stays the same; replaces open marker c843303a1181 with 42983364b373.
- State Uptime: commit/sourceRef/tag move to v0.5.8; README.md and seed.json hashes change while CONTRACT.md hash stays the same; adds open marker 42983364b373.

The source `detect/index.mjs` constructs each marker from the first 12 hexadecimal characters of SHA256(`type:summary`) and `closeRecord` remembers unapplied findings; `detect/copy.mjs` reports hash drift, never rewrites public copy. Independently recomputed marker meanings: c843303a1181 = “CONTRACT.md, README.md, seed.json changed since the last sync”; 42983364b373 = “README.md, seed.json changed since the last sync”; 922fed04eacf = “CONTRACT.md, seed.json changed since the last sync”. All state deltas are provenance or open-copy observation markers. Brand/mark/home observations are unchanged. No state hunk contains a wording edit or implementation-status promotion.

The complete diff and complete candidate identity output are in candidate.diff and identities.txt. The source checks scanned for GitHub token prefixes, private-key headers, AWS access-key shapes and credential-bearing HTTP URLs; none was found. This bounded touched-diff check is not the Mac's full publication scan, whose custody remains unchanged.

## Release truth and source pins

Each source repository was read only through gh api, never cloned. One batched GraphQL request fetched each repository's releases once and also the required tag and tagged CONTRACT.md. The required release was present within the first page in every case; each selected release's asset list was complete. Tags are annotated and peeled targets match both release tagCommit and local state.commit. isDraft and isPrerelease are false for every selected release. Asset presence is checked; cryptographic signature verification was not requested or performed.

| Seed | Version | Release commit | Published UTC | Release |
| --- | --- | --- | --- | --- |
| spool | v0.7.8 | `47ecaeeec8c442aa4648ad3b7f4fc1d7e1f115e2` | 2026-11-12T16:30:33Z | https://github.com/just-every/run-spool/releases/tag/v0.7.8 |
| lamp | v1.11.13 | `e82bc349b98af44c440efa2960927e327deda1a5` | 2026-11-12T16:30:00Z | https://github.com/just-every/run-lamp/releases/tag/v1.11.13 |
| orbit | v0.4.7 | `eab0faafccd2eb0945dddb7d0f52c30ce573c04c` | 2026-11-12T15:49:46Z | https://github.com/just-every/run-orbit/releases/tag/v0.4.7 |
| oncall | v0.5.10 | `1dc0069324de17933e7b65bffefa14de7dabea9a` | 2026-11-12T14:03:26Z | https://github.com/just-every/run-oncall/releases/tag/v0.5.10 |
| uptime | v0.5.8 | `ed5429192d18503c4c8caa8d797d82ffdcc78f54` | 2026-11-12T13:38:20Z | https://github.com/just-every/run-uptime/releases/tag/v0.5.8 |

All five tagged CONTRACT.md SHA256 prefixes match state.copy["CONTRACT.md"]. Complete public tagged contracts, blob ids and hashes are retained in the packet. No DSSE asset was downloaded or signature claim made.

## Counts, public doors and regression

Before: 49 total, 35 released, 14 coming soon. After: 49 total, 35 released, 14 coming soon. Version promotions: exactly five. Released-status promotions: zero. Contract/clause status edits: zero. HappyToHelp remains v0.4.22. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent. No coming-soon public data changed or copy was imported.

The built real slug is `/uptime` (from `src/app/[slug]/page.tsx`, not an invented monitor route). The candidate's real `/data/listings.json` response contains 49 entries and all five new versions. The real pages each display exactly one matching version fact at 1440. Browser journeys assert at 1440; screenshots at 1440 and 390 and recorded dimensions provide the required two-width proof. All 10 candidate renders return 200, document/body scroll widths equal the viewport width, and pageerror arrays are empty. Baseline main was exported from the retained commit into a separate scratch directory, built using the same installed dependencies and runner, and rendered through the same routes at both widths. The changed version facts preserve their layout. Full-page screenshots, version-area screenshots, contact sheets and regression-receipt.json are retained. Browser contexts were closed; only the recorded owned Next server PIDs 1376 and 2129 were stopped with SIGTERM.

No Assisted/Managed price literal occurs in the checkout. Therefore this gate confirms **no pricing statement or pricing-bearing code changed**, and does not claim absent US$10/US$100 strings rendered. The observed licence facts remain “MIT, 100% free” on both head and main. This is a pre-existing rubric/context mismatch with no introduced money change, recorded as NOTE G for the lane, not a product repair.

The initial browser wait for networkidle timed out because the media-bearing page did not become idle. A bounded DOM-content-loaded/font-ready probe then passed without mocks, intercepted routes, app edits or provider credentials. Both baseline and head emit missing Cloudflare caches / local page_views warnings for ancillary endpoints when run through next start without deployed Worker bindings. These are shared local-runtime limitations, with no pageerror or broken layout, and the exact-SHA deployed-build CI succeeds. Logs include the failed attempt and the successful probe.

## Independent source/lock/migration applicability

This website repository has no CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md, sources.lock.json, contract-view generator or documented source-lock/migration-ledger check. Inspection of AGENTS.md, package.json scripts and file names establishes those seed-only steps are not applicable. No source status or generated contract view was modified. The repository's applicable generated public data door was independently run in both check and write modes, producing no diff. No private held-out material, secret file, environment dump, account credential or session state is in the selected packet.

## Claim review and incumbent bar

The home repository declares no Product target incumbent for listing synchronization. The regression reference for this behavior is retained main and the released source claims. For context the tagged sources name these buyer incumbents: Spool — Sentry, Datadog Error Tracking, Rollbar, Bugsnag; Lamp — Atlassian Statuspage, Better Stack Status Pages, Status.io; Orbit — HubSpot Sales Hub, Pipedrive, Salesforce Sales Cloud; Oncall — PagerDuty, Opsgenie/Jira Service Management, Splunk On-Call; Uptime — Pingdom, UptimeRobot, Better Stack Uptime, Site24x7. This version-only gate does not widen into a seed-product audit.

All 46 JE promise ids were found in the tagged status tables: 28 done and 18 partial. A partial row or missing assertion is not proof of false implementation. Orbit OPP-004's gap says source-evidence links are unreachable, while JE's sentence says source/time/weight are shown and does not promise clickable source evidence. The other reviewed partial gaps likewise do not prove a newly false public sentence. Spool ERR-006 is done in the new tag; its source requirement qualifies the resolution mode and is byte-identical by contract hash to the prior listed release, so its known broad JE wording is not a new finding. No C follow-up is added. HappyToHelp/Terrace and the named old Uptime/Lamp items retain their existing follow-up custody.

## Findings, CI, custody and remaining work

No BLOCKING A, BLOCKING B, BLOCKING BAR or new FOLLOW-UP C finding. No test was deleted, skipped or weakened. No introduced security, privacy, money, authority or data-loss issue is visible in the bounded diff. No clause status changes are proposed or made.

NOTE G: The first browser networkidle wait timed out; successful bounded real-page probes replaced it. The unchanged local Cloudflare ancillary warnings occur on both head and main. See LANDING-NOTES.md.

NOTE G: The rubric's Assisted/Managed literal prices are absent from both snapshots. Pricing/copy paths are unchanged. This does not demonstrate an introduced defect or justify widening the frozen rubric.

Exact-SHA CI: Verify branch **43266034973**, completed/success: https://github.com/just-every/home/actions/runs/43266034973. Other observed runs: PR dynamic **43266081586** completed/success; PR duplicate Verify **43266087998** completed/skipped. The run list was read once; no watcher, polling, dispatch, rerun or job-log call was necessary. Total GitHub requests: four (initial PR, exact-head runs, one GraphQL source batch, final PR). No API rejection or backoff was encountered.

Blocking prerequisites: none. The lane still owns its Mac publication scan, PR landing, deployment and live verification; this gate performs none of those actions. No READY/PUSHED claim is made for cloud/je-gate-31, because this is a read-only product gate. Only refs/heads/evidence/je-gate-31 receives report files. Cleanup removes the fresh clone and dependencies after successful evidence transfer; the packet and report stay outside the clone.

## Full plan and execution results

# je-gate-31 completed plan

1. Configure the fleet identity and launcher Git helper. Read launcher/repository instructions and the inline gate rubric. Use one independent reviewer and no product edits.
2. Clone only just-every/home shallowly; retain origin/main, fetch PR #47 and check out the pinned candidate. Confirm the PR head and full base SHA before judging and again before returning.
3. Inspect every diff hunk, every candidate commit including ancestry, credential-shaped additions, state provenance and wording. Compare counts, excluded entries and all version/status changes.
4. Read the five source repositories only through gh api. In one GraphQL request, read each release list once, the required tag target and the tagged CONTRACT.md. Check release eligibility, DSSE asset presence, contract hashes and public claim wording. Do not verify signatures or assert implementation from partial evidence.
5. Install with npm ci; check and regenerate listings without a diff; run type-check, lint and production build. Determine applicability of the source-lock, contract-view and migration-ledger commands from this repository's instructions/files.
6. Read exact-SHA CI once through REST. Build main from an archive of the retained baseline and compare the touched pages through the real production routes. Assert at 1440 and capture 1440/390 proof; use Chromium at /usr/bin/chromium with --no-sandbox. Close browser contexts and stop only server PIDs created here.
7. Write the complete non-secret report, receipts, source excerpts and browser proof outside the product checkout. Publish only the explicitly selected evidence packet to evidence/je-gate-31. Leave the existing PR and product refs unchanged; remove clone/dependencies after successful evidence transfer.

All seven phases have completed through report preparation. Publication and cleanup are the terminal transport steps. No product commit, PR comment, rerun, merge, deployment, provider operation or clause-status edit is part of this gate.


## Exact public claim map

## uptime v0.5.8

Summary: Uptime watches your websites and APIs on a schedule and tells you only when a failure is confirmed. It never calls a missing check healthy, and it keeps the evidence behind every incident. Alerts go to email, Slack or a signed webhook.

Does:
- Check web pages and API responses for the right status, text, headers, data values and speed
- Check that a server port answers, that DNS records are right, and that SSL certificates and domain registrations are not about to expire
- Choose how many failed checks in a row open an incident and how many passes close it
- Show a time as Unknown when no check arrived, instead of guessing it was fine
- Watch cron jobs and nightly backups through heartbeat check-ins
- Alert you by email, Slack or a signed webhook, and run an alert drill to learn whether a message really reaches someone
- Pause alerts during planned maintenance windows
- Run checks from a machine on your own network and export your monitors, evidence and alert history any time

STATE-001 [partial, CONTRACT.md:1512]
JE: One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks.
Gap: Two configured runner networks still prove confirmed Failing and the scheduled confirmation/recovery thresholds. Gap: exactly one failing vantage reading Degraded; Unknown for partial, missing and stale evidence; the intermediate Recovering state; and no fabricated recovery from a manual pass during an outage, an absent selected probe or maintenance expiry lack assertions in the cited files. Maintenance expiry is asserted only in tests/maintenance-windows.mjs, which this clause does not cite.

EVIDENCE-001 [done, CONTRACT.md:1511]
JE: Every scheduled check and every retry is kept with its time, result and error type, and a retry never erases an earlier failure.
Gap: 

NOTIFY-001 [done, CONTRACT.md:1523]
JE: Only confirmed incident changes send automatic alerts, and a test send never changes a monitor's status.
Gap: 

DELIVERY-001 [done, CONTRACT.md:1524]
JE: Each alert gets one automatic send per destination where a repeat could double up, an unclear outcome is not sent again, and 'accepted' is never reported as 'read'.
Gap: 

DRILL-001 [done, CONTRACT.md:1527]
JE: An alert drill sends a clearly marked test with a one-time confirmation link, and a confirmation is the recipient's own report, never proof of monitoring.
Gap: 

TLS-001 [done, CONTRACT.md:1540]
JE: Certificate checks look at trust, host name and expiry from each location, warn in stages before a certificate runs out, and clear only after a new valid certificate is seen.
Gap: 

MAINT-001 [done, CONTRACT.md:1553]
JE: Planned and recurring maintenance windows use US time zones and daylight saving, and keep the underlying check results so reports still show what happened.
Gap: 

ARCHIVE-001 [done, CONTRACT.md:1516]
JE: A backup restores only into an empty installation: monitors come back paused, destinations disabled and old alerts held back.
Gap: 

NETWORK-001 [partial, CONTRACT.md:1514]
JE: Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected.
Gap: Cross-origin authentication, client-certificate and body stripping are asserted. Gap: mixed DNS answers, rebinding before connection, TLS hostname mismatch, re-resolution of every redirect, HTTPS downgrade and forbidden redirect refusal, exact-origin credential binding, timeout/body/encoding bounds and zero connections to rejected destinations lack assertions in the cited files. tests/tls-auth.mjs calls assertions in helper files this clause does not cite.

ERASURE-001 [done, CONTRACT.md:1519]
JE: An owner can erase a monitor with its evidence, an alert destination, or an operator, and gets a receipt of what was removed.
Gap: 
## lamp v1.11.13

Summary: Lamp is a status page that tells your customers who is affected, how badly and what still works. You write each update once, and the page, the feed, the site banner and subscriber emails all carry the same words. Your page keeps answering even when Lamp's own database is down.

Does:
- Show a status page with each component's state, a 90-day record and a plain-words account of every incident
- Write each update once and send it to the page, an Atom feed, a site banner and subscriber email together, with a preview first
- Keep the page answering from the last known state, labelled with its age, when Lamp's own database is down
- Let subscribers choose the components they follow and unsubscribe in one click, with no cookies and no CAPTCHA
- Run planned maintenance that starts, finishes and notifies subscribers by itself
- Turn alerts from your monitoring tools into one draft incident per problem, which you review and publish
- Publish post-incident reports, post to Slack or Microsoft Teams, send signed webhooks and keep a delivery log
- Use your own domain and colours, and export everything whenever you like

INTAKE-002 [partial, CONTRACT.md:3345]
JE: Monitoring alerts follow the source's intake policy, which keeps a private draft until publication by default. Your company's policy decides agent publication; an alert alone is never a finished customer update.
Gap: The cited journey asserts a private draft and page exclusion. It does not measure the 30-second create/update bound or compare all public surfaces. The class/policy wording carries no promotion.

INCIDENT-004 [partial, CONTRACT.md:3253]
JE: A published update is never edited or deleted; a correction is a new update and both stay on the public timeline.
Gap: Asserted: original wording retained; correction identifies original; both updates retained. Unasserted in old cited evidence: published deletion refused; public publication order.

UPDATE-008 [partial, CONTRACT.md:3271]
JE: Publishing is a single step: the update and the list of people to notify are saved together.
Gap: Asserted: update once; recipients once; no failed recipient. Unasserted in old cited evidence: narrowing preserves delivery; unsubscribe suppresses delivery; failed update not public; retry to success; dispatch does not block.

NOTIFY-009 [partial, CONTRACT.md:3329]
JE: Publishing still works while email, the queue or a subscriber's endpoint is failing.
Gap: Old cited evidence asserts only the previously described delivered slice. It does not assert: mail provider failure publish; queue failure publish; endpoint failure publish; public page survives delivery failure; feed survives delivery failure; widget survives delivery failure; recovery preserves and delivers committed set.

UPTIME-001 [done, CONTRACT.md:3239]
JE: Uptime is rounded down, so a period with any downtime never shows 100 percent.
Gap: 

PAGE-006 [partial, CONTRACT.md:3199]
JE: If the database or queue is down, the public page, feed and banner keep serving the last known state, labelled as such, and never show a false all-clear.
Gap: Old cited evidence asserts The page body still contains Partially unavailable after database removal; Stale page content is labeled Last known state; The generation instant is visible in stale page content; The retained failure body contains Partially unavailable. Unasserted: The Atom feed survives database outage; The widget survives database outage; Page content survives queue outage; Atom feed content survives queue outage; Widget content survives queue outage; Page content survives object-storage outage; Atom feed content survives object-storage outage; Widget content survives object-storage outage; Origin outage uses the specified cached-response window; Page is unavailable only before first publication; Atom feed is unavailable only before first publication; Widget is unavailable only before first publication.

PAGE-013 [done, CONTRACT.md:3206]
JE: The public page sets no cookies, has no tracking or consent banner, and loads nothing from other sites.
Gap: 

NOTIFY-004 [partial, CONTRACT.md:3323]
JE: The delivery log records whether each message was delivered, bounced or failed, and nothing tracks whether anyone read it.
Gap: Old cited evidence asserts outcome field; queued outcome; delivered outcome; bounced outcome. Unasserted: subscriber field readback; channel field readback; update field readback; queue time readback; outcome time readback; complained outcome readback; message pixel absence; tracked-link absence; the outcome filter returns all and only matching rows throughout its result set; channel filter reconciliation; update filter reconciliation; all 101 distinct expected destinations occur once and match the full filtered view.

MOVE-002 [partial, CONTRACT.md:3408]
JE: Moving in keeps original update times, notifies nobody, and brings email subscribers over as pending until they confirm.
Gap: Old cited evidence asserts Sorry incident update timestamps equal source times; Past Sorry maintenance is completed; Imported Better Stack maintenance has no native notice; Import queues no notification delivery. Unasserted: Complete imported component history derives from original update times; Concurrent repeated applies send no mail; Preview sends no mail; Every resume sends no mail; Cutover checks send no mail; Each imported email subscriber is pending.

SUB-006 [partial, CONTRACT.md:3301]
JE: Every notification email carries a one-click unsubscribe.
Gap: Old cited evidence asserts mail unsubscribe value is present; web unsubscribe value is present; one-click declaration; URL-encoded deactivation. Unasserted: visible unsubscribe link in notification body; multipart form deactivation; DKIM coverage of both unsubscribe headers; per-token allowance independence.
## orbit v0.4.7

Summary: Orbit puts a deal in your NOW queue when a customer replies, scores it from real signals, and shows you why. Your company's policy controls agent sending; with approval required, a person reviews the exact email before it is sent. It is free for the whole team, and you can try it beside your current CRM.

Does:
- Move a deal into your NOW queue when a customer replies, books a meeting or submits a form
- Score each deal from what customers actually did, with older activity counting for less and every signal behind the score shown
- Keep contacts, companies and deals, with your own fields, in a pipeline with your own stages
- Let a contact form on your site drop each enquiry onto the right contact
- Draft follow-ups, with optional AI, that you review and approve one by one, and schedule them with quiet hours
- Cancel scheduled follow-ups automatically when the customer replies
- Pull in emails and meetings from Gmail, Google Calendar, Outlook, forwarded mail or a calendar link
- Import contacts from a CSV, and export or restore a complete archive of your workspace any time

OUT-001 [partial, CONTRACT.md:2460]
JE: Signals, scores and AI text never grant permission to send. Your company's policy decides agent sending; when approval is required, a person approves the exact saved recipients, subject and body, and later changes invalidate it.
Gap: Unasserted in the carried evidence: an actual agent customer-message call under held company policy through its owning agent-surface tool. Asserted: the current source signature ingests evidence but cannot approve or dispatch a saved draft without a native session; refusal is 401 with unchanged saved content and effect inventories and no mail submission, followed by signed-in exact-revision approval and exact reviewed bytes dispatched.

OPP-004 [partial, CONTRACT.md:2449]
JE: A deal's score shows every signal it used, with source, time and weight, beside the reason for the recommendation.
Gap: Not reachable in the product, so unasserted: following each contribution to its source evidence. A contribution in the deal's Why this is first list has no link or visible signal ID, Recorded details lists each signal's subject, kind, source and linking basis without ids, and no route serves a signal's source evidence; `tests/e2e/operator.spec.mjs` resolves each contribution's signal ID from the opportunity API inside the test and then finds its Recorded details line by subject text. Asserted at 390 and 1440 in the browser: every contribution shown with its signal subject, type, signed points and source; the current recommendation's reason and next action beside them; each contributing signal's Recorded details line names its source and how it was linked.

SIGNAL-007 [partial, CONTRACT.md:2434]
JE: Orbit uses no tracking script, pixel or cookie, and does not fingerprint visitors.
Gap: Unasserted in the carried evidence: no tracking script/pixel/cookie in public assets/network; identity-free chat held; unsupported identity absent from customer history. Asserted: identity-free page view held.

OUT-007 [partial, CONTRACT.md:2466]
JE: A reply, a booked meeting, an unsubscribe or a permanent bounce cancels that contact's scheduled messages.
Gap: Unasserted in the carried evidence: booking cancels scheduled mail; unsubscribe cancels scheduled mail; bounce cancels scheduled mail; manual stop cancels scheduled mail; replay has no second effect. Asserted: reply cancels scheduled mail; stop stales unsent draft.

OUT-012 [done, CONTRACT.md:2471]
JE: Opt-out is on by default for sequence email and off for one-to-one email. Messages set to carry it include one-click unsubscribe; an identified opt-out marks the contact do-not-contact within a minute and cancels scheduled messages.
Gap: 

ACTION-005 [partial, CONTRACT.md:2459]
JE: A draft goes stale when the customer replies or the deal changes, and a stale draft cannot be sent until you have seen what changed.
Gap: Unasserted in the carried evidence: customer/deal mutation stales draft; stale send refused; current differences shown before new review. Asserted: reply stop stales draft.

CAPTURE-005 [partial, CONTRACT.md:2441]
JE: Capture never writes a draft or sends a message, and a contact created from captured mail is do-not-contact until you clear it.
Gap: Unasserted in the carried evidence: delegation credential refused; address-only intake works; proposed new contact stays blocked. Asserted: native intake works; collaborator intake refused; source signature refused.

AI-003 [partial, CONTRACT.md:2474]
JE: If the AI is unavailable, records, scoring, search, hand-written drafts and sending still work.
Gap: Unasserted in the carried evidence: configured-outage continuity; manual CRM updates; ingestion and linking continuity; scoring and queue placement continuity; search continuity; recommendation action and evidence readback; rendered generation-failure qualification. Connected mailboxes and live model or provider qualification remain unclaimed. Asserted: unconfigured generation unavailable; handwritten drafting, exact approval and one accepted customer-mail submission continue with AI unconfigured.

RECORD-004 [done, CONTRACT.md:2418]
JE: Merging duplicates needs you to choose the surviving record and every conflicting value, and refuses if either record changed after your review.
Gap: 

DATA-002 [partial, CONTRACT.md:2488]
JE: Deleting a contact removes their email, signals, drafts and message bodies from records, search, exports and later AI or mail requests within five minutes.
Gap: Unasserted in the carried evidence: contact erasure redacts stored Slack content; company erasure redacts stored Slack content; deal erasure redacts stored Slack content; provider delete requests tracked; each provider-deletion outcome visible; aliases erased; imported/captured evidence erased; drafts erased; transfer copies withdrawn; AI absence; mail absence; anonymous audit; completion within five minutes; replay cannot recreate erased content. Asserted: search absence; export absence.
## oncall v0.5.10

Summary: Oncall shows everyone who is on call now, who is next and exactly when they hand over. It keeps rotations, swaps, incidents, runbooks and follow-ups in one place, and runs alongside the pager you already use while you move your schedules over.

Does:
- Show who is on call now, who is next and when the next hand-over happens
- Build primary and backup rotations in your team's timezone, so a hand-over stays on the same clock time when clocks change
- Cover a few hours with an override or swap without touching the rotation
- Subscribe to a private calendar feed of the next seven days of shifts
- Record alerts from monitoring, route them to the right service and replay the routing safely
- Declare an incident, assign a commander, follow the runbook and keep every decision on a timeline
- Resolve with recovery evidence and a summary, then track follow-up tasks and review
- Preview your Opsgenie or PagerDuty schedules before anything is imported

OC-012 [done, CONTRACT.md:1444]
JE: Oncall sends no texts, calls or push alerts, so your existing pager stays in charge while you use it.
Gap: 

OC-006 [done, CONTRACT.md:1438]
JE: Oncall sends signed response events only to endpoints an administrator approves; paging stays off, and email is for sign-in links only.
Gap: 

OC-005 [done, CONTRACT.md:1437]
JE: A runbook is copied into the incident when it is declared, so later edits never rewrite instructions mid-incident.
Gap: 

OC-004 [done, CONTRACT.md:1436]
JE: Resolving an incident needs recovery evidence and a summary, and every change is recorded in an attributed timeline.
Gap: 

OC-008 [done, CONTRACT.md:1440]
JE: Incident records you write are never deleted automatically.
Gap: 

OC-011 [done, CONTRACT.md:1443]
JE: Rotations hand over by wall-clock time in your named zone, and clock-change gaps show up as visible gaps.
Gap: 

OC-003 [done, CONTRACT.md:1435]
JE: Viewers can only read, responders coordinate, and admins manage; alert-sending credentials grant no read access, and removed access stops on the next request.
Gap: 

OC-002 [done, CONTRACT.md:1434]
JE: Replaying alert routing only reads: it creates no alert, incident or outside effect.
Gap: 

OC-021 [done, CONTRACT.md:1453]
JE: A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused.
Gap: 

OC-022 [done, CONTRACT.md:1454]
JE: A move-in can be undone, and edits you made afterwards are kept rather than overwritten.
Gap: 
## spool v0.7.8

Summary: Spool catches the errors in your app, groups repeats into one issue and points to the exact line in your own source code where it broke. It tells you when a fixed error comes back in a later release, and gives your coding agent a read-only view of one project's evidence.

Does:
- Catch errors from JavaScript, Python and Go apps, using the same reporting libraries Sentry uses
- Group repeats into a single issue and show exactly where in your original source each error happened
- Keep your source maps private and match them to the right release
- Download an evidence packet to hand to whoever is fixing the issue
- Create a read-only agent key so a coding agent can read one project's issues and evidence, and change nothing
- Reopen a resolved issue when it returns in a later release, and name that release
- Scrub emails, tokens and passwords before anything is saved
- Export everything to one file and restore it into a fresh copy

ERR-003 [done, CONTRACT.md:1683]
JE: Error details are scrubbed before they are stored: emails, tokens and passwords are removed, and headers, cookies and request bodies are not kept by default.
Gap: 

ERR-004 [done, CONTRACT.md:1684]
JE: Owner sign-in, error sending and read-only agent access are separate, revoking one takes effect on the next request, and your source maps are never public.
Gap: 

ERR-002 [done, CONTRACT.md:1682]
JE: An error is only counted once it is fully saved, and a repeated send never counts twice.
Gap: 

ERR-006 [done, CONTRACT.md:1686]
JE: Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm.
Gap: 

ERR-007 [done, CONTRACT.md:1687]
JE: The evidence packet is size-limited and never includes your source code.
Gap: 

ERR-008 [done, CONTRACT.md:1688]
JE: Counts of errors accepted and rejected are visible, and a quiet period is never reported as proof an error is fixed.
Gap: 


GATE PASS 14bbb698b7d9e77a3d041794d84b56420fbbf737
