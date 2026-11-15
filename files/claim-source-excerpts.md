# Released claim source excerpts

Author: Run Edit Run fleet. Recorded: 2026-11-15T22:27:27Z.

## uptime v0.5.13 STATE-001

#### STATE-001 — Fixed coverage and incident hysteresis

**Requirement.** Missing or expired passing coverage is Unknown, partial failure stays visible, independent-vantage agreement and scheduled confirmation determine Failing, and complete fresh scheduled passing evidence plus recovery threshold is required for recovery; manual checks and maintenance never rewrite observations or scheduled policy. See [Evidence and state](docs/contract/safety-rules.md#evidence-and-state).

**Acceptance.**
1. Run two assigned network vantages through partial, missing, stale, failing and recovering slots; inspect Unknown/Degraded/Failing and thresholds.
2. A manual pass, absent probe or maintenance expiry cannot fabricate recovery.


## uptime v0.5.13 EVIDENCE-001

#### EVIDENCE-001 — Immutable scheduled evidence

**Requirement.** Definitions, scheduled slots and every retry attempt retain revision, policy, fixed selected probes, runner identity, timings, status, assertions and error category; retries never erase failures, and observation/state/outbox commit atomically. See [Evidence and state](docs/contract/safety-rules.md#evidence-and-state) and [Integrity and authority](docs/contract/safety-rules.md#integrity-and-authority).

**Acceptance.**
1. Through signed claim/result routes submit failure, retry, late and duplicate attempts, restart, and read history; each attempt and its revision remains identifiable and observation/state/outbox either all commit or none do.


## uptime v0.5.13 NOTIFY-001

#### NOTIFY-001 — Authorized installation-wide destinations

**Requirement.** An owner may configure email, signed JSON webhook, or Slack incoming webhook destinations for all monitors in one installation; only scheduled incident transitions generate automatic notifications, and a test send cannot change monitor evidence or incident state. The hosted Worker submits email through the configured Base mail adapter and sends webhooks and Slack without a private runner; a private runner can also claim notification work. Webhook destinations also take WEBHOOK-001's configurable method, content type, custom headers and payload template. Destination credentials are installation-local and are not restored from archives. See [Contact, interface and delivery](docs/contract/safety-rules.md#contact-interface-and-delivery) and [Network and credentials](docs/contract/safety-rules.md#network-and-credentials).

**Acceptance.**
1. Create/rotate/disable email, Slack and signed webhook destinations, cause scheduled failure/recovery and a test send through actual Worker/runner delivery doors; inspect one job per enabled destination, credentials, exact signing, escaping and unchanged health for tests.


## uptime v0.5.13 DELIVERY-001

#### DELIVERY-001 — Bounded notification acknowledgment

**Requirement.** Each event and destination without receiver-side deduplication (email, Slack incoming webhooks and the other channels DELIVERY-002 names), every test send and every drill gets one automatic send attempt. A RER relay 429 with Retry-After confirms non-acceptance and queues another submission after that delay. For those sends HTTP 500, connection loss, timeout, and unknown outcomes remain uncertain and are not automatically sent again; deduplicating destinations retry and every route can fall back to another contact under DELIVERY-002. Accepted means the configured provider or endpoint acknowledged the request; it does not mean a person received, read, or acted on it. See [Contact, interface and delivery](docs/contract/safety-rules.md#contact-interface-and-delivery).

**Acceptance.**
1. At authorized provider edges return accepted, proven-unaccepted relay 429, HTTP 500, timeout and connection loss; restart during claims.
2. Only the proven-unaccepted case requeues automatically; uncertain started sends never replay and acceptance remains distinct from receipt.


## uptime v0.5.13 DRILL-001

#### DRILL-001 — Recipient-reported alert drills

**Requirement.** An owner can run an alert drill on one destination: the existing test event with drill wording, sent once through the same path with no automatic resend, plus a one-time confirmation link (random capability, stored only as a bound hash, single use, 24-hour expiry, one drill and one destination). Opening the link shows a page; only a same-origin POST confirms, and unknown, used, expired and foreign links answer 404 alike. The console keeps Submitted, Acknowledged (or Uncertain/Failed with its code) and Recipient confirmed as separate lines, and does not measure whether anyone acted. A confirmed drill is a report by the recipient that one message reached a person at one time. It is never evidence of monitoring, a delivery guarantee or a human response, and it changes no monitor evidence, state or incident. Proof belongs to the destination's current credential: a new address or URL or a rotated secret makes it Never proven, and drill history stays with the installation, so a restored destination is Never proven. See [Alert drills](docs/contract/safety-rules.md#alert-drills).

**Acceptance.**
1. Drill email, Slack and signed webhook through the actual delivery runtime: GET/HEAD never confirm, same-origin POST confirms once, expired/replayed/foreign links refuse, 500 stays uncertain, rotation resets proof and archives/logs contain no capability or endpoint secret.


## uptime v0.5.13 TLS-001

#### TLS-001 — SSL certificate and chain monitoring

*Tier:* Core

**Requirement.** TLS checks verify hostname/SNI, certificate chain/trust, validity, expiry and renewal on HTTPS or configured TLS ports from each location. Staged configurable expiry warnings name the certificate and accountable owner, track renewal and resolve only after a newly observed valid chain.

**Acceptance.**
1. Monitor a controlled TLS service; present an expiring certificate, broken chain, wrong name and then renewed certificate, advance the clock and inspect deduplicated warnings, location evidence and renewal resolution.


## uptime v0.5.13 MAINT-001

#### MAINT-001 — Planned and recurring maintenance

*Tier:* Core

**Requirement.** One-time and recurring windows target monitors/groups with US time zones, daylight-saving handling, preview and audit. Buyers choose notification suppression or execution pause explicitly; reports show maintenance separately and retain denominator and underlying observations. Expiry re-evaluates actual evidence and cannot emit orphan recovery.

**Acceptance.**
1. Schedule a New York recurring maintenance window across a DST transition and a one-time group window; fail a monitor during each, restart, end/cancel the window and inspect preserved results, suppression and reports.

### Reports, evidence and diagnosis


## uptime v0.5.13 ARCHIVE-001

#### ARCHIVE-001 — Inactive validated restore

**Requirement.** Bounded versioned archives require integrity and semantic validation before transactional restore into empty product data, preserve historical evidence, erasure receipts and the permanent anonymized action audit, create paused current revisions, interrupt leases and quarantine alerts; installation-local sessions, keys, grants, request credential values, heartbeat authority, contact, webhook and Slack URLs, and signing keys are excluded; destination definitions and retained notification histories are portable, and imported evidence cannot establish current health or replay events. The source erasure journal fences copies made before a later erasure when that journal accompanies the restore. A local CLI receiving checkout must run setup first to establish its owner and settings. Supersedes `BASE-DATA-001` for installation authority and endpoint credentials only: the owner accepted this archive policy on 2026-10-13 (RL-1), as an intentional replacement, not BASE-DATA-001 equivalence. See [Portability and retention](docs/contract/safety-rules.md#portability-and-retention) and [Integrity and authority](docs/contract/safety-rules.md#integrity-and-authority).

**Acceptance.**
1. Export a populated installation including TCP, DNS, TLS and domain monitors, establish a different receiving owner, import into empty product data, then export/read history and repeat the restore.
2. Each protocol’s settings and immutable revisions/slots survive; definitions are paused, leases interrupted, delivery quarantined, secrets/authority absent, history retained and later erasure journals enforced; corrupt/nonempty imports write nothing.


## uptime v0.5.13 NETWORK-001

#### NETWORK-001 — Pinned bounded destination execution

**Requirement.** Every public DNS answer and redirect hop is validated fail closed; private-runner numeric sockets preserve Host and TLS identity, hosted checks use Cloudflare’s public Internet fetch transport, unsafe/mixed addresses and HTTPS downgrade are rejected, cross-origin redirects strip request authority, and synthetic grants and protected origin-bound local credential files retain their separate custody limits. The PROBE-002 identification header follows these credential rules and is stripped on cross-origin redirects. See [Network and credentials](docs/contract/safety-rules.md#network-and-credentials).

**Acceptance.**
1. Exercise real controlled HTTP/TLS endpoints with mixed DNS, rebinding, hostname mismatch, redirects, downgrade, forbidden addresses, credentials and execution bounds; inspect requests and prove rejected destinations receive no connection or authority.

**Bounded qualification.** `tests/tls-auth.mjs` mounts `tests/network-rebinding-support.mjs` proveNetworkRebinding once, with `tests/network-rebinding-routing.mjs` controlling only the authorized DNS and socket edge: an owner-created public HTTPS monitor and the production signed runner retain scheduled history through pre-connection A-to-B rebinding, next-due forbidden-B refusal and restored-A execution across a persistent Worker restart. Independent destination listeners and an ordered edge journal check numeric A, original Host and SNI, verified TLS, zero forbidden-B connections and requests, a passing canary, and Unknown with Incomplete fixed coverage and no fabricated incident or recovery on refusal. This qualifies only that rebinding cell; broader redirect re-resolution, address families, credential combinations, execution bounds, hosted transport and managed locations remain unproved, and the clause remains partial.


## uptime v0.5.13 ERASURE-001

#### ERASURE-001 — Operator-directed entity erasure

**Requirement.** An owner can erase a monitor with its evidence and dependent notification/heartbeat records, a destination with its credential copies, or an operator while another active owner remains. Monitor erasure requires typing the current monitor name. Each completed erasure returns a receipt with entity kind, per-table counts and completion time, and returns it only after the transaction containing the erasure, audit entry and portability fence succeeds. Requests based on stale monitor or destination state cannot re-create erased rows. The last active owner cannot be erased: local installations use `rer reset --yes`, while hosted installations require replacement by redeployment. Uptime has no R2 attachment feature; import-door uploads, plan snapshots and archive bytes are held in installation-local custody under the erasure rule in [Erasure and audit](docs/contract/safety-rules.md#erasure-and-audit). Already downloaded archives, messages already sent to external recipients and requests already in progress remain outside local erasure. See [Erasure and audit](docs/contract/safety-rules.md#erasure-and-audit).

**Acceptance.**
1. Erase each supported entity through the owner API, including stale concurrent requests and the original owner with a successor.
2. Inspect the atomic per-table receipt, audit and journal; the last owner is protected and an old archive with the later journal cannot resurrect erased records.


## oncall v0.5.16 OC-012

#### OC-012 — Paging off

**Requirement.** Production paging is OFF, and the existing pager is authoritative (RL-1). Every normal-installation delivery attempt refuses with an explanation that an independent standby and a real-phone drill are required. No production paging provider sends, synthetic delivery proof, cron delivery, SMS, voice or push are performed. Escalation policies are inspectable configuration data, not active timers. A labeled demo simulation is not production delivery or acceptance. Native cutover additionally requires OC-026 to OC-029 and OC-038 real-phone and provider-failure acceptance.

**Acceptance.**
1. On a normal installation, each delivery, job, tick, callback and resume door returns the paging-OFF refusal and creates no receipt.
2. Demo simulations are treated as simulations.


## oncall v0.5.16 OC-006

#### OC-006 — Bounded outbound incident effects

**Requirement.** In release 1, only signed OC-053 response events to an endpoint a current administrator explicitly approved may leave the incident workspace (RL-2). No paging provider notification, AI call, production action or Lamp publication occurs in release 1. Configured remote mail sends sign-in links only. Handoffs are minimum summaries with stable identity and visibility; an exported draft is explicitly unreviewed. Source links grant no access. External acceptance, delivery and acknowledgment are distinct later records. Approved OC-053 events are proved under OC-053.

**Acceptance.** On a normal installation with no approved OC-053 endpoint:
1. Coordination and handoff preparation and export create no paging receipt, production action, AI call or external publication.
2. Draft exports remain unreviewed, and source links confer no access.


## oncall v0.5.16 OC-005

#### OC-005 — Copied runbooks

**Requirement.** Runbooks are copied into the incident at declaration; future service edits never silently rewrite incident instructions. Follow-ups carry owner, due date, open or completed state and completion evidence. Resolved incidents retain open work and editable review.

**Acceptance.**
1. Declare an incident and edit its service runbook, and the copied incident steps remain unchanged; an owned, due-dated action requires completion evidence; unfinished work and the review are retained after resolution.


## oncall v0.5.16 OC-004

#### OC-004 — Incident state transitions

**Requirement.** Incident state transitions are explicit. Acknowledgment assigns responsibility. Resolution requires recovery evidence and a summary, independently of alert recovery. Optimistic revision checks reject stale edits. All accepted changes append an attributed timeline transactionally with state. Any active responder or admin can attest recovery and follow-up evidence; attestation is a human claim, not automatic measurement verification. This resolution rule governs declared incidents; an alert-only page that its source recovers closes without a human summary under OC-056.

**Acceptance.**
1. Declare from admitted alerts and acknowledge; stale and concurrent changes are rejected; the source alert clears; resolution without evidence and a summary is refused; the incident then resolves, and its attributed timeline reads back over HTTP.


## oncall v0.5.16 OC-008

#### OC-008 — User-authored records kept

**Requirement.** Authored incident records are kept through restart and export. Ingress accepts bounded structured fields. Provider and incumbent-compatible intake retain bounded structured evidence and no raw bodies under OC-059. Native Events API parsing is bounded to 64 KiB; authenticated oversized, malformed or incomplete native input retains only its first 64 KiB or fewer of exact raw bytes as untrusted incomplete custody under OC-059, never parsed or routed from that prefix. Incumbent-compatible endpoints and provider adapters use the larger per-provider bounds of OC-059. There is no arbitrary remote fetching or runbook execution. Complete retention controls are OC-040.

**Acceptance.**
1. Over-limit and malformed intake is neither parsed nor retained beyond its bound, and over-limit command input is refused.
2. Hostile structured text and runbook links display literally, with no script execution and no fetch.
3. Authored history is preserved after restart and export.


## oncall v0.5.16 OC-011

#### OC-011 — Calendar-day rotations

**Requirement.** Named-zone calendar-day rotations retain fixed primary and backup member slots. Hand-offs use the wall minute plus integer civil days, not fixed elapsed seconds. Repeated minutes explicitly choose earlier, later or reject; nonexistent or rejected boundaries produce visible gaps. Override intervals include their start and exclude their end; an overlap in the same role is rejected. Inactive, viewer and missing members do not shift slots. A duplicated primary and backup assignment leaves the backup unavailable.

**Acceptance.**
1. Save primary and backup schedules and query the HTTP preview across spring and fall DST, ambiguous and nonexistent minutes, override edges and an overlap refusal; inactive, viewer and missing slots are retained as gaps, and duplicate primary and backup responders are detected.


## oncall v0.5.16 OC-003

#### OC-003 — Roles and authority

**Requirement.** Incident changes require an active authorized human session or an explicitly scoped OC-053 service-account capability (RL-2). A machine is attributed as a service account and never gains human-session, member-management or human-review authority. Viewer reads; responder coordinates; admin manages services, policies, members and import. All active members see all workspace incident data, and admin, responder and viewer permissions are separate from incident-commander attribution. Ingest credentials grant no read or human authority. Bearer and signed intake return only `duplicate`, the stored event `id`, the source `eventId`, `service`, `observedAt` and `acceptedAt` (201 accepted; 200 deduplicated). Routing decisions, snapshots and alert identities stay behind authorized read and export doors; scoped OC-053 reads disclose only granted service records, and archive and export authority remains session-protected. The status-only stakeholder role, with no incident, alert, runbook or archive access, is specified and tracked in OC-061.

**Acceptance.**
1. Anonymous, expired, revoked, viewer, responder and admin sessions each get their role's outcome on reads, commands, sources and archives, and a real HTTP mutation held open while its author is revoked or downgraded publishes nothing.
2. Minimal intake receipts disclose no private routing data.


## oncall v0.5.16 OC-002

#### OC-002 — Routing replay

**Requirement.** Retain the routing policy version and explanation at admission. Release 1 routes coordination ownership, with no timed escalation or paging. Replay is read-only: it returns the historical decision, ownership, policy and evaluation snapshot beside the proposed current decision, in submitted order, and produces no alert, incident or external effect; it does not claim schedule replay. Unmatched signals remain visible and unowned; suppression reasons remain inspectable.

**Acceptance.**
1. Admit a severity-routed event, change the policy and replay it: the immutable admission explanation is compared with the proposed decision in submitted order, and durable state is unchanged before and after (zero writes).


## oncall v0.5.16 OC-021

#### OC-021 — Move-in preview

**Requirement.** The shared Base import-kit D1 file door accepts PagerDuty, Opsgenie, Splunk On-Call, Jira Service Management Ops and Better Stack saved exports. Preview writes zero native objects; retained upload custody, plan snapshots and grant/bookkeeping rows exist. A current administrator must review the exact source fingerprint before applying. Users are matched by normalized email and grant no login rights; schedules and policy data stay paused. Original bytes, unmapped fields, rejected objects, the journal and provenance are retained. Every unmappable rotation or rule is named; no partial rotation approximation is allowed. Missing detail exports reject. No account or API calls or routing credentials are activated. Complete incumbent migration and real-export acceptance remain OC-038. The shared file door and its proof limits are documented in [Move-in](docs/move-in.md#shared-file-door-implementation-and-proof-limits).

**Acceptance.**
1. Following the provider export instructions, saved Opsgenie and PagerDuty list and detail bundles preview with zero native-object writes, exact rejected and unmapped rules and fingerprints are shown, and the apply stays paused, with people and services explicitly mapped before native coverage is adopted.


## oncall v0.5.16 OC-022

#### OC-022 — Resume and undo

**Requirement.** Journaled imports support bounded resume after restart and explicit undo. SQL checks current actor, session and admin authority inside publication and reversal. Changed source identities require a reviewed catch-up through the shared door; outside that lifecycle they conflict. Duplicate unchanged sources are idempotent. Undo removes only unchanged attributed native objects; edits are preserved with an explicit conflict. Invalid input or failed publication leaves prior committed state unchanged; partial progress remains visible and resumable.

**Native proof.** In `tests/activation.mjs`, the per-vendor “unfinished checkpoint” journey applies one bounded batch of a PagerDuty or Opsgenie saved file, proves its checkpoint is strictly inside the reviewed total, restarts the Worker, and completes the same job and fingerprint. It compares the committed prefix unchanged, checks each remaining object exists once, retries the completed job without new effects, and undoes exactly that import while native membership and paging state remain unchanged. The injected native SQL failure and expired publication lease legs distinguish rolled-back publication from retained partial effects that require explicit rollback. The same file's saved-response journeys cover unchanged replay, and its native-edit and later-import journeys preserve records under `NATIVE_EDIT_CONFLICT` and `IMPORT_SUPERSEDED`, including revoked-session refusal. In `tests/import-door.mjs`, the PagerDuty account HTTP journey revokes Business import authority inside the committing batch, injects publication failure, and checks unchanged native records; its identical-byte and reviewed catch-up journeys cover unchanged and changed identities. These are synthetic saved-file proofs with imported objects inactive and paging OFF; live account conversion and cutover remain with OC-038 and OC-074.

**Acceptance.**
1. Apply, interrupt and restart, resume and undo both vendor imports over HTTP; revoke authority at publication, inject an SQL failure, replay unchanged and changed identities, and preserve native edits as named undo conflicts.

