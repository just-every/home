# Released copy review
Author: Run Edit Run fleet. Recorded: 2026-11-17T07:01:15Z

No public claims were edited. The released CONTRACT.md is byte-identical across each version update. README.md/seed.json remain provenance inputs, not permission to turn partial implementation evidence into a done claim. Existing Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C) and Spool ERR-006 (D) remain deferred under this brief.

## lamp
CONTRACT.md v1.11.19 → v1.11.21: identical blob a9cd9d56a1b1d6547d41414748b95be04a348a9b; SHA256 f9cb0b8a5bd46d6937005eccfd7b290d1ac6c3c512da4e973c0771bc3256cfdd.
Existing JE wording retained. The following released source clauses support the unchanged descriptions; these excerpts do not assert implementation completion.

### CONTRACT.md:906: #### INTAKE-002 — Alerts never publish

**Requirement.** The source-specific intake policy controls accepted alerts. Under the held intake policy an alert remains a private draft until publication; AUTO-001 carries component-specific alternatives. An agent publication carries external and live classes decided by company policy.

**Acceptance.**
1. Under the held intake policy an accepted alert creates or updates a draft within 30 seconds.
2. That intake changes no public page, feed, widget or other public surface.
3. Publication follows UPDATE-008 and supplies every UPDATE-001 narrative field; an alert payload alone is not a completed narrative.


### CONTRACT.md:469: #### INCIDENT-004 — Published updates are immutable

**Requirement.** Corrections add to the public record without changing earlier wording.

**Acceptance.**
1. Published updates cannot be edited or deleted.
2. A correction is a new publication identifying the update it corrects.
3. Original and correction remain on the public timeline in publication order.


### CONTRACT.md:604: #### UPDATE-008 — Atomic publication and recipients

**Requirement.** Publication commits its fixed recipient set before dispatching without holding publish. Its committed success starts PAGE-007’s visibility bound and NOTIFY-002’s delivery bound.

**Acceptance.**
1. The selected channels’ recipients and the update commit together before success is returned.
2. Narrowing selection afterwards preserves committed delivery; unsubscribing suppresses it under SUB-008.
3. Failed publication exposes no update and records no recipients.
4. Dispatch retries the committed set until success without blocking publication.

### CONTRACT.md:868: #### NOTIFY-009 — Delivery never blocks publication

**Requirement.** Delivery failure never withholds a committed public update; its notification set resumes when the failed channel recovers.

**Acceptance.**
1. Publication succeeds despite a failing mail provider, queue or subscriber endpoint.
2. The public page, feed and widget meet PAGE-007 despite the failure.
3. Recovery delivers the original committed notification set under NOTIFY-003.


### CONTRACT.md:387: #### UPTIME-001 — Definition

**Requirement.** The public uptime figure derives from component-state history over the trailing ninety days.

**Acceptance.**
1. Each visible component shows the percentage of the ninety-day window not in a downtime state, using one-minute resolution.
2. The figure rounds down to two decimals so any downtime prevents a displayed 100.00%.

#### UPTIME-002 — Downtime weights

### CONTRACT.md:246: #### PAGE-006 — Serving through a failure

**Requirement.** Public status continues to answer from retained content during primary storage, database or queue failure, with truthful stale labeling.

**Acceptance.**
1. When the database, queue or object storage is unreachable, the page, Atom feed and widget return successful current or retained content; an origin outage can use PAGE-007’s cached response.
2. Only an installation with no snapshot ever written returns unavailable instead of status content.
3. Content not built from current data identifies its generation instant and says Last known state; a failed read never invents an operational all-clear.


### CONTRACT.md:308: #### PAGE-013 — Enforced isolation

**Requirement.** Public status has restrictive same-origin isolation and needs no CAPTCHA or consent banner. The exact header policy is documented in the public mechanisms record. The formats and configuration details are in [Public status mechanisms](docs/contract/public-details.md).

**Acceptance.**
1. Every public response has the documented own-origin default, script, style, image, connection, form and base policies, refuses framing, prevents content-type sniffing and uses the documented referrer policy.
2. The public page contains neither a CAPTCHA nor a consent banner.
3. The public page writes no visitor data to browser storage.


### CONTRACT.md:815: #### NOTIFY-004 — Delivery log, without tracking

**Requirement.** The notification log exposes delivery facts for each recipient and supports channel, outcome and update filtering plus CSV. It adds subscription-communication fields to the Base mail-outcome duty.

**Acceptance.**
1. Each notification records subscriber, channel, update, queue time, outcome and outcome time.
2. Outcomes distinguish queued, delivered, bounced, complained, suppressed and failed.
3. Messages contain no tracking pixel or tracked link.
4. Each channel, outcome and update filter returns matching rows, and the complete CSV matches those filters.

### CONTRACT.md:1135: #### MOVE-002 — Retroactive and silent

**Requirement.** Imported incident and maintenance history is silent and preserves its original timing rather than replaying publication.

**Acceptance.**
1. Each incident update keeps its original publication time, and imported component state history derives from those times under INCIDENT-009.
2. Past maintenance is completed; import creates no lifecycle maintenance notice and queues no incident or maintenance notification.
3. Preview, apply, resume, job reads and Cutover checks send no mail.
4. Imported email subscribers remain pending for the separate invitation action.

### CONTRACT.md:722: #### SUB-006 — One-click unsubscribe

**Requirement.** Every notification offers standards-compatible one-click unsubscribe. Its public rate allowance belongs to the subscriber token, so one mailbox provider cannot exhaust another subscriber's allowance. The technical profile is specified in [Delivery details](docs/contract/delivery-details.md).

**Acceptance.**
1. Notification email contains the mail and web unsubscribe values, the one-click declaration and a visible unsubscribe link.
2. Both supported form encodings deactivate that subscription with a successful empty response, no redirect and no further interaction.
3. The message signature covers both unsubscribe headers.
4. One token's rate allowance never consumes another token's allowance, including requests from one mailbox provider.


## spool
CONTRACT.md v0.7.13 → v0.7.14: identical blob 98d20645c67acd0ea21f39ea97855ba566a79e62; SHA256 ee9c871bfa25a110d3f3e61924164c75cc17ea412cb775f2e0621f114ab3594b.
Existing JE wording retained. The following released source clauses support the unchanged descriptions; these excerpts do not assert implementation completion.

### CONTRACT.md:119: #### ERR-003 — Scrub before storage

**Requirement.** Apply the native allowlist, bounded text, query/fragment removal and sensitive-text scrubbing before persistence. Native envelopes contain no headers, cookies, request bodies or personal user identity; the `user` interface that unmodified Sentry SDKs send is governed by SDK-008's project identity policy instead. An optional random installation identifier supports bounded exposure measurement; it is never a name or address. Telemetry, source and notes are untrusted data and cannot authorize execution. The event fields SDK-010 keeps from unmodified Sentry SDKs (frame local variables, SDK-sent source context lines, exception values, tags, contexts, request, extra and thread stacks) pass through these scrubbers and SDK-003's server-side rules before storage, and default secret names are masked inside frame variables. Default protection persists when SDK-003 and CTX-002 introduce opt-in context; those captures require their own field policies and previews. Redaction does not promise removal of arbitrary semantic personal data.

**Acceptance.** Privacy canaries ingested through public ingest:
1. are absent from stored events;
2. are absent from issue views;
3. are absent from evidence packets;
4. are absent from archives;

### CONTRACT.md:131: #### ERR-004 — Separated authority

**Requirement.** Every private API/document checks the current owner session or its exact ingest, deploy or read-only project grant itself. Cookie writes enforce same origin. Revocation and identity fencing take effect on the next request; confidential maps are never public. Ingest cannot read, deploy can only register releases/upload artifacts and record deployment starts/callbacks, and read-only agent grants cannot mutate. TEAM-001 extends this model to collaborative membership without broadening existing credentials.

**Acceptance.** Each private transport:
1. refuses an anonymous call;
2. refuses a wrong-scope grant;
3. refuses a foreign-project grant;
4. refuses a revoked grant on the next request;

### CONTRACT.md:110: #### ERR-002 — Atomic acceptance

**Requirement.** Accepted means a sanitized occurrence, its group aggregate and its local new/regression alert commit atomically. Retry identity is project plus event ID and SHA-256 of canonical original accepted JSON before scrubbing: identical retry never increments, changed raw content conflicts even if its sanitized result matches. Raw bytes are not retained. Group algorithm version and basis remain inspectable.

**Acceptance.** Through public ingest:
1. An event ingested twice yields one occurrence and one aggregate increment.
2. It raises one local alert.
3. The same event ID with a changed raw secret is an explicit conflict, with no partial rows.


### CONTRACT.md:155: #### ERR-006 — Audited triage and regression

**Requirement.** Revision-checked open, acknowledged, resolved and suppressed changes are audited. An issue resolved in its current release reopens as a regression on a recurrence in a later release; delayed older-release events cannot invent one. For native version-1 events the order is the registered sequence, never guessed semver; Sentry events follow the project's stated rule in SDK-028, including releases later enriched by registration. SDK-009 carries resolve in the next or a named release and plain Resolve, and plain Resolve regresses on the next accepted event in any release; TEAM-004 inherits resolution from a commit's release, and TEAM-003 carries same-release recurrence policies, bulk actions and collaborative triage. Recognized JavaScript bundle hash suffixes do not split grouping; native anchors and reported frames stay immutable. Corrections retain exact occurrence provenance and reversible fenced apply/undo.

**Acceptance.**
1. A captured issue resolved in its current release reopens as a regression when its fingerprint arrives in a newer release.
2. A later event from an older release does not reopen it.
3. Split and merge previews through the owner HTTP door and the issue view move nothing.
4. Split and merge apply and undo through the owner HTTP door and the issue view.

### CONTRACT.md:167: #### ERR-007 — Sanitized evidence packet

**Requirement.** A compatible v1 packet exposes issue/lifecycle/grouping, retained release sequence and per-event release/build/environment, generated/original coordinates, immutable diagnostics beside current lookup, links and coded coverage gaps. UTF-8 JSON is bounded to 256 KiB and ten events, removing oldest events first and naming included/available counts even if none fit. It excludes source snippets, sourcesContent and artifact bytes. It carries the latest computed repair observation and newest three owner-recorded repairs, with omitted history named. CLI and stdio MCP keep exact-project read authority and untrusted/no-execution labels; they cause no model egress.

**Acceptance.**
1. The same packet reads through HTTP, the CLI and the official MCP transport, with equal projections.
2. At the size boundary the oldest events are removed first and the included and available counts are named.
3. At the retention, import and loss boundaries the packet carries each coded coverage gap.
4. The packet carries no secrets.

### CONTRACT.md:180: #### ERR-008 — Loss counters and repair observation

**Requirement.** Expose windowed accepted/rejected/budget outcomes, SDK-reported discards by category and reason, and unknown pre-transport loss. Reported discarded errors are a loss input and prevent a quiet feed from proving a repair; other discarded categories do not imply lost errors. Only the owner records revision-checked repair links, scrubbed notes, checks, approval/merge/deploy facts and an exercised-flow record. Links are HTTPS origin/path text and never fetched. Manual repair writes send no notifications or external work. Compute recur/reasoned inconclusive/no-recurrence-after-exercise from stored release sequence, maps, events, exercise and loss; list older-release events separately. Missing exercise, capture, map, exposure or retention yields inconclusive. Never label a quiet feed fixed. Repair recurrence counts retained native admission membership, current membership and exact occurrence membership during the repair's lifetime, even after further corrections or undo; any applied or undone correction involving the issue leaves a `grouping_changed` coverage gap, so without retained recurrence its observation is inconclusive. AI-004 adds rate-based live proof.

**Acceptance.**
1. The owner records a repair through the HTTP door.
2. Every project-grant write to repairs is denied, with the rows unchanged.
3. A deployed repair with no events reads inconclusive, with a named reason.
4. A healthy exercised window reads no recurrence after exercise.


## uptime
CONTRACT.md v0.5.15 → v0.5.16: identical blob cf4dbe0437f56c237be137697b1b56323c2988a1; SHA256 9e5c8dd14ef60da605c7729888ce46f087f26f83f77f2c6ae05d9f872d569609.
Existing JE wording retained. The following released source clauses support the unchanged descriptions; these excerpts do not assert implementation completion.

### CONTRACT.md:113: #### STATE-001 — Fixed coverage and incident hysteresis

**Requirement.** Missing or expired passing coverage is Unknown, partial failure stays visible, independent-vantage agreement and scheduled confirmation determine Failing, and complete fresh scheduled passing evidence plus recovery threshold is required for recovery; manual checks and maintenance never rewrite observations or scheduled policy. See [Evidence and state](docs/contract/safety-rules.md#evidence-and-state).

**Acceptance.**
1. Run two assigned network vantages through partial, missing, stale, failing and recovering slots; inspect Unknown/Degraded/Failing and thresholds.
2. A manual pass, absent probe or maintenance expiry cannot fabricate recovery.

#### AUTHORITY-001 — Server-side scoped authority

### CONTRACT.md:106: #### EVIDENCE-001 — Immutable scheduled evidence

**Requirement.** Definitions, scheduled slots and every retry attempt retain revision, policy, fixed selected probes, runner identity, timings, status, assertions and error category; retries never erase failures, and observation/state/outbox commit atomically. See [Evidence and state](docs/contract/safety-rules.md#evidence-and-state) and [Integrity and authority](docs/contract/safety-rules.md#integrity-and-authority).

**Acceptance.**
1. Through signed claim/result routes submit failure, retry, late and duplicate attempts, restart, and read history; each attempt and its revision remains identifiable and observation/state/outbox either all commit or none do.

#### STATE-001 — Fixed coverage and incident hysteresis


### CONTRACT.md:198: #### NOTIFY-001 — Authorized installation-wide destinations

**Requirement.** An owner may configure email, signed JSON webhook, or Slack incoming webhook destinations for all monitors in one installation; only scheduled incident transitions generate automatic notifications, and a test send cannot change monitor evidence or incident state. The hosted Worker submits email through the configured Base mail adapter and sends webhooks and Slack without a private runner; a private runner can also claim notification work. Webhook destinations also take WEBHOOK-001's configurable method, content type, custom headers and payload template. Destination credentials are installation-local and are not restored from archives. See [Contact, interface and delivery](docs/contract/safety-rules.md#contact-interface-and-delivery) and [Network and credentials](docs/contract/safety-rules.md#network-and-credentials).

**Acceptance.**
1. Create/rotate/disable email, Slack and signed webhook destinations, cause scheduled failure/recovery and a test send through actual Worker/runner delivery doors; inspect one job per enabled destination, credentials, exact signing, escaping and unchanged health for tests.

#### DELIVERY-001 — Bounded notification acknowledgment


### CONTRACT.md:205: #### DELIVERY-001 — Bounded notification acknowledgment

**Requirement.** Each event and destination without receiver-side deduplication (email, Slack incoming webhooks and the other channels DELIVERY-002 names), every test send and every drill gets one automatic send attempt. A RER relay 429 with Retry-After confirms non-acceptance and queues another submission after that delay. For those sends HTTP 500, connection loss, timeout, and unknown outcomes remain uncertain and are not automatically sent again; deduplicating destinations retry and every route can fall back to another contact under DELIVERY-002. Accepted means the configured provider or endpoint acknowledged the request; it does not mean a person received, read, or acted on it. See [Contact, interface and delivery](docs/contract/safety-rules.md#contact-interface-and-delivery).

**Acceptance.**
1. At authorized provider edges return accepted, proven-unaccepted relay 429, HTTP 500, timeout and connection loss; restart during claims.
2. Only the proven-unaccepted case requeues automatically; uncertain started sends never replay and acceptance remains distinct from receipt.

#### PUBLIC-001 — Public landing and documentation

### CONTRACT.md:228: #### DRILL-001 — Recipient-reported alert drills

**Requirement.** An owner can run an alert drill on one destination: the existing test event with drill wording, sent once through the same path with no automatic resend, plus a one-time confirmation link (random capability, stored only as a bound hash, single use, 24-hour expiry, one drill and one destination). Opening the link shows a page; only a same-origin POST confirms, and unknown, used, expired and foreign links answer 404 alike. The console keeps Submitted, Acknowledged (or Uncertain/Failed with its code) and Recipient confirmed as separate lines, and does not measure whether anyone acted. A confirmed drill is a report by the recipient that one message reached a person at one time. It is never evidence of monitoring, a delivery guarantee or a human response, and it changes no monitor evidence, state or incident. Proof belongs to the destination's current credential: a new address or URL or a rotated secret makes it Never proven, and drill history stays with the installation, so a restored destination is Never proven. See [Alert drills](docs/contract/safety-rules.md#alert-drills).

**Acceptance.**
1. Drill email, Slack and signed webhook through the actual delivery runtime: GET/HEAD never confirm, same-origin POST confirms once, expired/replayed/foreign links refuse, 500 stays uncertain, rotation resets proof and archives/logs contain no capability or endpoint secret.

#### STARTUP-001 — Required configuration diagnostics


### CONTRACT.md:354: #### TLS-001 — SSL certificate and chain monitoring

*Tier:* Core

**Requirement.** TLS checks verify hostname/SNI, certificate chain/trust, validity, expiry and renewal on HTTPS or configured TLS ports from each location. Staged configurable expiry warnings name the certificate and accountable owner, track renewal and resolve only after a newly observed valid chain.

**Acceptance.**
1. Monitor a controlled TLS service; present an expiring certificate, broken chain, wrong name and then renewed certificate, advance the clock and inspect deduplicated warnings, location evidence and renewal resolution.


### CONTRACT.md:492: #### MAINT-001 — Planned and recurring maintenance

*Tier:* Core

**Requirement.** One-time and recurring windows target monitors/groups with US time zones, daylight-saving handling, preview and audit. Buyers choose notification suppression or execution pause explicitly; reports show maintenance separately and retain denominator and underlying observations. Expiry re-evaluates actual evidence and cannot emit orphan recovery.

**Acceptance.**
1. Schedule a New York recurring maintenance window across a DST transition and a one-time group window; fail a monitor during each, restart, end/cancel the window and inspect preserved results, suppression and reports.


### CONTRACT.md:144: #### ARCHIVE-001 — Inactive validated restore

**Requirement.** Bounded versioned archives require integrity and semantic validation before transactional restore into empty product data, preserve historical evidence, erasure receipts and the permanent anonymized action audit, create paused current revisions, interrupt leases and quarantine alerts; installation-local sessions, keys, grants, request credential values, heartbeat authority, contact, webhook and Slack URLs, and signing keys are excluded; destination definitions and retained notification histories are portable, and imported evidence cannot establish current health or replay events. The source erasure journal fences copies made before a later erasure when that journal accompanies the restore. A local CLI receiving checkout must run setup first to establish its owner and settings. Supersedes `BASE-DATA-001` for installation authority and endpoint credentials only: the owner accepted this archive policy on 2026-10-13 (RL-1), as an intentional replacement, not BASE-DATA-001 equivalence. See [Portability and retention](docs/contract/safety-rules.md#portability-and-retention) and [Integrity and authority](docs/contract/safety-rules.md#integrity-and-authority).

**Acceptance.**
1. Export a populated installation including TCP, DNS, TLS and domain monitors, establish a different receiving owner, import into empty product data, then export/read history and repeat the restore.
2. Each protocol’s settings and immutable revisions/slots survive; definitions are paused, leases interrupted, delivery quarantined, secrets/authority absent, history retained and later erasure journals enforced; corrupt/nonempty imports write nothing.

#### IMPORT-001 — Reviewed definition files and inactive imports

### CONTRACT.md:128: #### NETWORK-001 — Pinned bounded destination execution

**Requirement.** Every public DNS answer and redirect hop is validated fail closed; private-runner numeric sockets preserve Host and TLS identity, hosted checks use Cloudflare’s public Internet fetch transport, unsafe/mixed addresses and HTTPS downgrade are rejected, cross-origin redirects strip request authority, and synthetic grants and protected origin-bound local credential files retain their separate custody limits. The PROBE-002 identification header follows these credential rules and is stripped on cross-origin redirects. See [Network and credentials](docs/contract/safety-rules.md#network-and-credentials).

**Acceptance.**
1. Exercise real controlled HTTP/TLS endpoints with mixed DNS, rebinding, hostname mismatch, redirects, downgrade, forbidden addresses, credentials and execution bounds; inspect requests and prove rejected destinations receive no connection or authority.

**Bounded qualification.** `tests/tls-auth.mjs` mounts `tests/network-rebinding-support.mjs` proveNetworkRebinding once, with `tests/network-rebinding-routing.mjs` controlling only the authorized DNS and socket edge: an owner-created public HTTPS monitor and the production signed runner retain scheduled history through pre-connection A-to-B rebinding, next-due forbidden-B refusal and restored-A execution across a persistent Worker restart. Independent destination listeners and an ordered edge journal check numeric A, original Host and SNI, verified TLS, zero forbidden-B connections and requests, a passing canary, and Unknown with Incomplete fixed coverage and no fabricated incident or recovery on refusal. This qualifies only that rebinding cell; broader redirect re-resolution, address families, credential combinations, execution bounds, hosted transport and managed locations remain unproved, and the clause remains partial.


### CONTRACT.md:168: #### ERASURE-001 — Operator-directed entity erasure

**Requirement.** An owner can erase a monitor with its evidence and dependent notification/heartbeat records, a destination with its credential copies, or an operator while another active owner remains. Monitor erasure requires typing the current monitor name. Each completed erasure returns a receipt with entity kind, per-table counts and completion time, and returns it only after the transaction containing the erasure, audit entry and portability fence succeeds. Requests based on stale monitor or destination state cannot re-create erased rows. The last active owner cannot be erased: local installations use `rer reset --yes`, while hosted installations require replacement by redeployment. Uptime has no R2 attachment feature; import-door uploads, plan snapshots and archive bytes are held in installation-local custody under the erasure rule in [Erasure and audit](docs/contract/safety-rules.md#erasure-and-audit). Already downloaded archives, messages already sent to external recipients and requests already in progress remain outside local erasure. See [Erasure and audit](docs/contract/safety-rules.md#erasure-and-audit).

**Acceptance.**
1. Erase each supported entity through the owner API, including stale concurrent requests and the original owner with a successor.
2. Inspect the atomic per-table receipt, audit and journal; the last owner is protected and an old archive with the later journal cannot resurrect erased records.

#### AUDIT-001 — Durable anonymized audit



## Changed non-contract sources

The exact diff in `released-copy-diffs.txt` shows all three `seed.json:4` version fields advancing to the verified published releases. Lamp's README.md:88-94 and :138-142 replace the hard-coded rer 0.2.108 guidance with the package.json pin and installed CLI explanation. Those installation instructions do not contradict JE's existing summaries or promises. No JE claim edits are justified. These provenance findings remain recorded in state; no implementation status is promoted.
