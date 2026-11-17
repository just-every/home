# Oncall target product contract

Oncall owns the full on-call alerting and incident-response job: receive monitoring or phone-in incidents, identify coverage, wake a responder through real phone/SMS/push, escalate until acknowledged, coordinate verified recovery, communicate and finish the follow-up. The first buyer is a US software/IT operations team replacing PagerDuty, Opsgenie / Jira Service Management incident response, or Splunk On-Call (VictorOps). The target also competes with incident.io On-call, Rootly and Resolve AI through integrated response and bounded agent work. This is a destination contract, not a description of what currently ships.

## Product target

| | |
| --- | --- |
| Category | On-call alerting and incident response |
| Incumbents a buyer switches from | PagerDuty, Opsgenie / Jira Service Management, Splunk On-Call (VictorOps) |
| Up-and-comers it must also beat | incident.io On-call, Rootly and Resolve AI |
| First buyer | A US software/IT operations team replacing PagerDuty, Opsgenie / Jira Service Management incident response, or Splunk On-Call (VictorOps); costs in USD |

The primary journey: receive a monitoring or phone-in incident, find who is on call, page them through real phone, SMS and push until someone acknowledges, coordinate verified recovery in the incident, communicate it and finish the follow-up.

## How to read this contract

- This follows the RER contract standard. Existing ids remain stable: OC-001 to OC-022 are the published release guarantees, and OC-023 onward completes the purchased job.
- Core and Agent surface are reported separately; every clause here is Core or Agent surface, and none is Later.
- A clause is done only when every acceptance point passes through Oncall's own doors in a recorded run; partial names the implemented subset and the gap; missing has no implementing flow. Acceptance evidence is the public journey required to complete the clause; merely listing it is not a passing run.
- Real-world proof (carrier phones, vendor tenants, store distribution, human passes) is kept in the Field proof register, dated, and never blocks done.
- ACCEPTANCE.md and docs/CLAIMS.md are generated from this file.

## Door rules

- **D-1.** Durable execution. Every execution class commits its accepted state and its permanent audit entry together and keeps a durable failed, interrupted or uncertain outcome on crash or lease expiry: automation, provider attempts and escalation, agent grants and actions, publication, chat, mobile, standby and team-scoped export. The clause that adds a class proves, at its own execution boundary, atomic rollback on an audit failure, subject-erasure-safe export and interruption.
- **D-2.** Portable, inactive restore. Every new durable category joins the portable archive with integrity checks and the erasure journal, excludes its credentials and execution authority, and restores into the documented inactive receiving state, so preserved history can never satisfy live readiness or replay an effect.
- **D-3.** Credential custody. Every capability that adds a credential or an outbound flow keeps OC-042's obligations before it ships: custody at rest, redacted display, rotation and revocation with visible effects, a declared recipient and data category, minimum content, network restriction, budgets, and exclusion from archives, logs, the UI, audit and AI context.
- **D-4.** Automated obligations. Every automated obligation keeps an owner and a due time, survives browser closure and restart, stops only at its stated condition and keeps its failed or uncertain outcome visible.

## Shared duties (Base)

| Base duty | Duty | Delta clauses | Base journey |
| --- | --- | --- | --- |
| BASE-ACCESS-001 | Sign-in | OC-018 | not run |
| BASE-ACCESS-002 | Sessions | OC-003, OC-008, OC-018 | not run |
| BASE-ACCESS-003 | Public endpoints | none | not run |
| BASE-ACCESS-004 | Server-side authorisation | OC-003 | not run |
| BASE-INPUT-001 | Validation | OC-008 | not run |
| BASE-INPUT-002 | HTML | OC-008, OC-052 | not run |
| BASE-INPUT-003 | Uploads | OC-052 | not run |
| BASE-SECRET-001 | No leakage | OC-042 | not run |
| BASE-SECRET-002 | Startup | none | not run |
| BASE-DATA-001 | Export and import | OC-007, OC-008, OC-015, OC-016, OC-052 | not run |
| BASE-DATA-002 | Retention | OC-008, OC-040 | not run |
| BASE-DATA-003 | Erasure | OC-040 | not run |
| BASE-DATA-004 | Outbound flows | OC-006, OC-042 | not run |
| BASE-DATA-005 | Independence | OC-052 | not run |
| BASE-DATA-006 | Erasure respects retention and legal hold | OC-040 | not run |
| BASE-PUBLIC-001 | Privacy | none | not run |
| BASE-PUBLIC-002 | Origins | OC-052 | not run |
| BASE-PUBLIC-003 | Accessibility | OC-009 | not run |
| BASE-OPS-001 | Health | OC-010 | not run |
| BASE-OPS-002 | Migrations | OC-007, OC-019 | not run |
| BASE-OPS-003 | Idempotency | OC-001 | not run |
| BASE-OPS-004 | Failure is visible | OC-041 | not run |
| BASE-OPS-005 | Audit | OC-041 | not run |
| BASE-ROLE-001 | Roles through every door | OC-003, OC-039 | not run |
| BASE-AUDIT-001 | Searchable, durable audit | OC-041 | not run |
| BASE-BACKUP-001 | Independent backup, restore and rollback | none | not run |
| BASE-SIGNIN-001 | Standards-based SSO and lifecycle | OC-039, OC-069 | not run |
| BASE-SIGNIN-002 | Native multi-factor authentication | OC-039 | not run |
| BASE-INSTALL-001 | Free self-host and removal | OC-018 | not run |
| BASE-MAIL-001 | Truthful mail outcomes | OC-026 | not run |
| BASE-ACCESSIBILITY-001 | One accessibility bar | OC-009 | not run |
| BASE-DOCS-001 | On-site docs from one contract | none | not run |
| BASE-AGENT-001 | One MCP door per seed | SURFACE-001 | not run |
| BASE-AGENT-002 | The seed's jobs are tools | SURFACE-001 | not run |
| BASE-AGENT-003 | Records are resources | SURFACE-001 | not run |
| BASE-AGENT-004 | Business identity and short-lived tokens | SURFACE-003 | not run |
| BASE-AGENT-005 | An agent acts as a person in a role | SURFACE-003 | not run |
| BASE-AGENT-006 | Every action declares its risk class | SURFACE-002, SURFACE-004 | not run |
| BASE-AGENT-007 | The company's policy decides | SURFACE-003 | not run |
| BASE-AGENT-008 | Truthful attribution | SURFACE-003 | not run |
| BASE-AGENT-009 | Every agent action is audited | SURFACE-003 | not run |
| BASE-AGENT-010 | Agents can follow changes | SURFACE-001 | not run |
| BASE-AGENT-011 | Limits are policy, and Pause stops everything | SURFACE-003 | not run |
| BASE-AGENT-012 | Writes are idempotent and conflict-safe | SURFACE-001 | not run |
| BASE-AGENT-013 | Manifest, docs and the conformance journey | SURFACE-001, SURFACE-003 | not run |

## Published clauses

- `OC-001`: *Tier:* Core · *Cites:* BASE-OPS-003
- `OC-002`: *Tier:* Core
- `OC-003`: *Tier:* Core · *Cites:* BASE-ROLE-001, BASE-ACCESS-002, BASE-ACCESS-004
- `OC-004`: *Tier:* Core
- `OC-005`: *Tier:* Core
- `OC-006`: *Tier:* Core · *Cites:* BASE-DATA-004
- `OC-007`: *Tier:* Core · *Cites:* BASE-DATA-001, BASE-OPS-002
- `OC-008`: *Tier:* Core · *Cites:* BASE-DATA-001, BASE-DATA-002, BASE-INPUT-001, BASE-INPUT-002, BASE-ACCESS-002
- `OC-009`: *Tier:* Core · *Cites:* BASE-ACCESSIBILITY-001, BASE-PUBLIC-003 · *Register:* R-3, R-4
- `OC-010`: *Tier:* Core · *Cites:* BASE-OPS-001 · *Rules:* D-1
- `OC-011`: *Tier:* Core
- `OC-012`: *Tier:* Core
- `OC-013`: *Tier:* Core
- `OC-014`: *Tier:* Core
- `OC-015`: *Tier:* Core · *Cites:* BASE-DATA-001
- `OC-016`: *Tier:* Core · *Cites:* BASE-DATA-001
- `OC-017`: *Tier:* Core
- `OC-018`: *Tier:* Core · *Cites:* BASE-INSTALL-001, BASE-ACCESS-001, BASE-ACCESS-002 · *Register:* R-1
- `OC-019`: *Tier:* Core · *Cites:* BASE-OPS-002
- `OC-020`: *Tier:* Core
- `OC-021`: *Tier:* Core
- `OC-022`: *Tier:* Core

### Preserved coordination guarantees

#### OC-001 — Event identity and alerts

**Requirement.** Persist accepted events separately from alerts and human incidents. Identity is source plus eventId; conflicts compare the normalized allowlisted signal fields (canonical timestamps and trimmed strings), rather than irrelevant JSON whitespace or order or discarded fields. Repeated source event IDs return the original receipt; changed bytes with the same identity conflict. Receipts, admission order, the decision snapshot and the alert change commit atomically. Each signed or bearer source is explicitly scoped to service identities, and the service binds its environment. A deduplication key groups active alerts only within its source, service and environment; on the native Events API lifecycle generation is required, and trigger and recovery must carry the same generation. Recovery before trigger creates a recovered tombstone; a later trigger for that generation records evidence without reopening, reopening needs a new generation, and a delayed recovery can only close its own generation, never a new alert. Recovery affects the matching alert and never resolves an incident.

**Acceptance.** Through the signed and bearer native intake doors:
1. Signed and bearer events are accepted; repeating a normalized identity returns the original receipt, changed content under the same identity conflicts, a recovery sent before its trigger stays recovered, a recovery sent after a newer generation leaves the newer alert unchanged, and protected state shows each result.
2. Grouping across multiple sources never merges service or environment boundaries.

#### OC-002 — Routing replay

**Requirement.** Retain the routing policy version and explanation at admission. Release 1 routes coordination ownership, with no timed escalation or paging. Replay is read-only: it returns the historical decision, ownership, policy and evaluation snapshot beside the proposed current decision, in submitted order, and produces no alert, incident or external effect; it does not claim schedule replay. Unmatched signals remain visible and unowned; suppression reasons remain inspectable.

**Acceptance.**
1. Admit a severity-routed event, change the policy and replay it: the immutable admission explanation is compared with the proposed decision in submitted order, and durable state is unchanged before and after (zero writes).

#### OC-003 — Roles and authority

**Requirement.** Incident changes require an active authorized human session or an explicitly scoped OC-053 service-account capability (RL-2). A machine is attributed as a service account and never gains human-session, member-management or human-review authority. Viewer reads; responder coordinates; admin manages services, policies, members and import. All active members see all workspace incident data, and admin, responder and viewer permissions are separate from incident-commander attribution. Ingest credentials grant no read or human authority. Bearer and signed intake return only `duplicate`, the stored event `id`, the source `eventId`, `service`, `observedAt` and `acceptedAt` (201 accepted; 200 deduplicated). Routing decisions, snapshots and alert identities stay behind authorized read and export doors; scoped OC-053 reads disclose only granted service records, and archive and export authority remains session-protected. The status-only stakeholder role, with no incident, alert, runbook or archive access, is specified and tracked in OC-061.

**Acceptance.**
1. Anonymous, expired, revoked, viewer, responder and admin sessions each get their role's outcome on reads, commands, sources and archives, and a real HTTP mutation held open while its author is revoked or downgraded publishes nothing.
2. Minimal intake receipts disclose no private routing data.

#### OC-004 — Incident state transitions

**Requirement.** Incident state transitions are explicit. Acknowledgment assigns responsibility. Resolution requires recovery evidence and a summary, independently of alert recovery. Optimistic revision checks reject stale edits. All accepted changes append an attributed timeline transactionally with state. Any active responder or admin can attest recovery and follow-up evidence; attestation is a human claim, not automatic measurement verification. This resolution rule governs declared incidents; an alert-only page that its source recovers closes without a human summary under OC-056.

**Acceptance.**
1. Declare from admitted alerts and acknowledge; stale and concurrent changes are rejected; the source alert clears; resolution without evidence and a summary is refused; the incident then resolves, and its attributed timeline reads back over HTTP.

#### OC-005 — Copied runbooks

**Requirement.** Runbooks are copied into the incident at declaration; future service edits never silently rewrite incident instructions. Follow-ups carry owner, due date, open or completed state and completion evidence. Resolved incidents retain open work and editable review.

**Acceptance.**
1. Declare an incident and edit its service runbook, and the copied incident steps remain unchanged; an owned, due-dated action requires completion evidence; unfinished work and the review are retained after resolution.

#### OC-006 — Bounded outbound incident effects

**Requirement.** In release 1, only signed OC-053 response events to an endpoint a current administrator explicitly approved may leave the incident workspace (RL-2). No paging provider notification, AI call, production action or Lamp publication occurs in release 1. Configured remote mail sends sign-in links only. Handoffs are minimum summaries with stable identity and visibility; an exported draft is explicitly unreviewed. Source links grant no access. External acceptance, delivery and acknowledgment are distinct later records. Approved OC-053 events are proved under OC-053.

**Acceptance.** On a normal installation with no approved OC-053 endpoint:
1. Coordination and handoff preparation and export create no paging receipt, production action, AI call or external publication.
2. Draft exports remain unreviewed, and source links confer no access.

#### OC-007 — Native archive

**Requirement.** The native archive preserves services, policies, incident, alert, event and timeline identity and attribution, runbook and follow-up history. Archive and restore require current admin authority, and handoffs remain internal. Schema and references are validated before an atomic restore, and an invalid restore preserves existing data. Restore replaces application state while preserving the current administrator identity; credentials remain installation-local, other sessions are revoked, clients reload state, and historical and inactive identities are retained. Authentication secrets and sessions are never exported. Released migrations remain immutable. The full future paging archive is OC-052.

**Acceptance.** Through the protected native archive door:
1. Export the archive, restore valid held records, and reject malformed references and storage failures without losing prior data.
2. Event, incident, runbook, action, timeline and attribution identity survive, and authentication material is absent from the archive.

#### OC-008 — User-authored records kept

**Requirement.** Authored incident records are kept through restart and export. Ingress accepts bounded structured fields. Provider and incumbent-compatible intake retain bounded structured evidence and no raw bodies under OC-059. Native Events API parsing is bounded to 64 KiB; authenticated oversized, malformed or incomplete native input retains only its first 64 KiB or fewer of exact raw bytes as untrusted incomplete custody under OC-059, never parsed or routed from that prefix. Incumbent-compatible endpoints and provider adapters use the larger per-provider bounds of OC-059. There is no arbitrary remote fetching or runbook execution. Complete retention controls are OC-040.

**Acceptance.**
1. Over-limit and malformed intake is neither parsed nor retained beyond its bound, and over-limit command input is refused.
2. Hostile structured text and runbook links display literally, with no script execution and no fetch.
3. Authored history is preserved after restart and export.

#### OC-009 — Accessible interface

**Requirement.** Apply BASE-ACCESSIBILITY-001 to Oncall's web journeys and the native apps in OC-029. A failed write is visible and never shown as saved. An unavailable UI is never described as a pager coverage failure, because release 1 supplies no pager. Each release publishes a conformance report (VPAT 2.5 Accessibility Conformance Report, WCAG 2.2 edition) stating the result per success criterion and per surface; an unsupported criterion is named, never omitted (R-4). Named assistive-technology passes cover VoiceOver with Safari on macOS and NVDA with Chrome on Windows for web, and VoiceOver on iOS and TalkBack on Android for the apps; each completes sign-in, finding an incident in the filtered list (OC-060), acknowledge, snooze, reassign, schedule view and override (R-3).

**Acceptance.**
1. Run declaration, acknowledgment, notes, schedules, overrides and preview against BASE-ACCESSIBILITY-001.
2. A real stale-write failure is announced with no saved claim.

#### OC-010 — Health and honest commands

**Requirement.** Health identifies the deployed version, operating commands describe actual local and hosted effects, and acceptance records distinguish local evidence from remote, provider and pilot outcomes. Capacity promises require measured evidence. Pager, timer, mobile and standby health are OC-026 to OC-029's, and paging measurements are OC-064's. Each new execution class proves its own durable failure diagnostics under door rule D-1 before it ships.

**Acceptance.**
1. check and describe run with storage available and unavailable, health reports both states, and the deployed identity matches the actual build.
2. Local, hosted, provider and human-drill outcomes are recorded separately.

### Scheduling and held history

#### OC-011 — Calendar-day rotations

**Requirement.** Named-zone calendar-day rotations retain fixed primary and backup member slots. Hand-offs use the wall minute plus integer civil days, not fixed elapsed seconds. Repeated minutes explicitly choose earlier, later or reject; nonexistent or rejected boundaries produce visible gaps. Override intervals include their start and exclude their end; an overlap in the same role is rejected. Inactive, viewer and missing members do not shift slots. A duplicated primary and backup assignment leaves the backup unavailable.

**Acceptance.**
1. Save primary and backup schedules and query the HTTP preview across spring and fall DST, ambiguous and nonexistent minutes, override edges and an overlap refusal; inactive, viewer and missing slots are retained as gaps, and duplicate primary and backup responders are detected.

#### OC-012 — Paging off

**Requirement.** Production paging is OFF, and the existing pager is authoritative (RL-1). Every normal-installation delivery attempt refuses with an explanation that an independent standby and a real-phone drill are required. No production paging provider sends, synthetic delivery proof, cron delivery, SMS, voice or push are performed. Escalation policies are inspectable configuration data, not active timers. A labeled demo simulation is not production delivery or acceptance. Native cutover additionally requires OC-026 to OC-029 and OC-038 real-phone and provider-failure acceptance.

**Acceptance.**
1. On a normal installation, each delivery, job, tick, callback and resume door returns the paging-OFF refusal and creates no receipt.
2. Demo simulations are treated as simulations.

#### OC-013 — Held history stays historical

**Requirement.** Held synthetic job, receipt and callback identities remain historical data. Restore pauses pending jobs. Historical acknowledgment and explicit cancellation retain attribution; resume and new timer starts refuse while paging is OFF. An acknowledgment never proves recovery.

**Acceptance.**
1. Restore held synthetic jobs, receipts and callbacks: pending work is paused, acknowledgment and cancellation keep their attribution, resume is refused, and incident recovery remains unchanged.

#### OC-014 — Side-effect-free previews

**Requirement.** Schedule preview, now/next and replay are side-effect-free; actual historical delivery claims remain labeled synthetic. Nothing in this release certifies production delivery.

**Acceptance.**
1. Read now/next and the schedule and routing previews: durable state and receipt counts are unchanged, no timers or provider actions are created, and historical synthetic data stays labeled.

#### OC-015 — Strict module archives

**Requirement.** Strict module archive validation and atomic replacement remain supported. Imported pending historical jobs pause. Scope and local capacity limits remain explicit.

**Acceptance.**
1. Round-trip the strict module archive through protected HTTP; unknown fields, broken references and an injected SQL failure are rejected atomically, callbacks are retained and pending historical jobs pause.

### Consistent recovery checkpoint

#### OC-016 — Recovery checkpoint

**Requirement.** A paired recovery checkpoint captures coordination and scheduling records with both revisions in one consistent storage snapshot, excludes authentication, and validates its envelope and intrinsic record integrity. Explicit current-admin restore replaces both datasets atomically, pauses imported pending jobs, preserves the current-password mapping rule and revokes prior authority exactly as coordination restore does. Missing references in retained paused or finished history remain evidence, never dispatch authority; missing references for pending jobs are invalid. Invalid input, capacity failures, storage failure or losing concurrent writes preserve the previous complete state and cannot revoke a winning restore's new session. Proof runs through the actual emitted Worker and D1 and the private local CLI.

**Acceptance.**
1. The checkpoint door and the private CLI each capture and restore both revisions.
2. Malformed, capacity and storage failures and competing writes preserve the previous complete state, identity mapping is explicit, orphan history stays evidence, and earlier sessions are revoked without revoking the winning restore session.

### Retained reviewed handoffs

#### OC-017 — Reviewed handoffs

**Requirement.** Persist explicitly authored, unsent handoff copy with an explicit intended audience, immutable incident and service snapshots and canonical content hashes. Preparation and review actions have stable identities that conflict on changed content. Only current active responders and admins prepare, review or withdraw; viewers inspect permitted internal records and admins restore. A review binds exact copy and source versions, becomes ineligible on source drift or a recovery hold, and never grants sending, publication, recovery verification or independent-review authority. Withdrawal is terminal and preserves attributed append-only history. OC-006 and historical unreviewed envelopes stay unchanged. Separate additive handoff storage and archive are bounded to 64 records, 128 history entries per record, 128 KiB per record and 1 MiB aggregate. Explicit checkpoint version 2 includes handoffs; version 1 remains supported. Restore retains historical identities and holds active approvals atomically alongside existing recovery and credential and session safeguards. Invalid input, capacity or storage failure or losing concurrent writes preserve the complete prior state. HANDOFF-STAGE.md defines retained snapshots, eligibility and permissions. No provider send, remote fetch or Lamp publication is authorized.

**Acceptance.**
1. Prepare, review, inspect and export exact handoff copy over protected HTTP; change the source or revision, withdraw, restore versions 1 and 2 and race writes.
2. Eligibility and holds, stable action identities, append-only attribution and every storage bound hold, with no send authority.

### Activated installation and move-in

#### OC-018 — Maintained root commands

**Requirement.** Maintained root seed commands use the pinned Base installer, owner identity, dev identity and theme, with the published rer version that package.json pins and the effects OPERATIONS.json declares. Ordinary email-link sign-in is kept and tested independently of dev identity. Setup creates no example incident or service. Release 1 supports hosted coordination beside the existing pager without an independent standby (RL-1); portable SQL batch bindings are required. `rer deploy` verifies deployment identity, claims the configured owner automatically and retires the setup token. Hosted email-link sign-in requires a configured remote mail provider. Removal with the same Cloudflare credentials deletes only recorded deployment resources and verifies that they are gone. On local and hosted apps, the configured owner uses native email links, while admin-created team members use installation-local workspace names and passwords; no invitations are sent. Local dev identity never grants hosted access, local dev and preview bind loopback, and anonymous first-admin bootstrap remains loopback-only. The hosted journey on a real Cloudflare account is field proof R-1.

**Acceptance.**
1. The documented setup, dev, build, preview, reset, archive and deploy dry-run commands run, owner entry opens the workspace, and an admin-created member signs in by password.

#### OC-019 — Additive upgrade

**Requirement.** The additive upgrade removes the one-row coordination store after migrating every entity and original array order to relational tables. Released migrations stay unchanged. Held passwords and identities are preserved. New Base identity cannot silently claim held coordination data.

**Acceptance.**
1. Seed the held one-row SQL data and migrate: the held password signs in, and every entity, nested history and original ordering compares equal through HTTP; a repeated migration and restart silently reassign nothing to Base identity.

#### OC-020 — Now/next and calendar feed

**Requirement.** Now/next explains current coverage and each role's next effective hand-off. The private ICS feed uses the same resolved UTC boundaries, including overrides and gaps, and exports primary and backup separately. It requires a current session; the default window is seven days, and explicit windows are bounded to 31 elapsed days. Calendar downloads carry no public bearer access. Alert intake records immutable events with scoped source credentials; intake never starts paging.

**Acceptance.**
1. Read now/next and the authenticated ICS feed for the seven-day default and bounded explicit windows: primary and backup UTC boundaries, overrides and gaps are correct, unauthenticated access is denied, and admission starts no paging.

#### OC-021 — Move-in preview

**Requirement.** The shared Base import-kit D1 file door accepts PagerDuty, Opsgenie, Splunk On-Call, Jira Service Management Ops and Better Stack saved exports. Preview writes zero native objects; retained upload custody, plan snapshots and grant/bookkeeping rows exist. A current administrator must review the exact source fingerprint before applying. Users are matched by normalized email and grant no login rights; schedules and policy data stay paused. Original bytes, unmapped fields, rejected objects, the journal and provenance are retained. Every unmappable rotation or rule is named; no partial rotation approximation is allowed. Missing detail exports reject. No account or API calls or routing credentials are activated. Complete incumbent migration and real-export acceptance remain OC-038. The shared file door and its proof limits are documented in [Move-in](docs/move-in.md#shared-file-door-implementation-and-proof-limits).

**Acceptance.**
1. Following the provider export instructions, saved Opsgenie and PagerDuty list and detail bundles preview with zero native-object writes, exact rejected and unmapped rules and fingerprints are shown, and the apply stays paused, with people and services explicitly mapped before native coverage is adopted.

#### OC-022 — Resume and undo

**Requirement.** Journaled imports support bounded resume after restart and explicit undo. SQL checks current actor, session and admin authority inside publication and reversal. Changed source identities require a reviewed catch-up through the shared door; outside that lifecycle they conflict. Duplicate unchanged sources are idempotent. Undo removes only unchanged attributed native objects; edits are preserved with an explicit conflict. Invalid input or failed publication leaves prior committed state unchanged; partial progress remains visible and resumable.

**Native proof.** In `tests/activation.mjs`, the per-vendor “unfinished checkpoint” journey applies one bounded batch of a PagerDuty or Opsgenie saved file, proves its checkpoint is strictly inside the reviewed total, restarts the Worker, and completes the same job and fingerprint. It compares the committed prefix unchanged, checks each remaining object exists once, retries the completed job without new effects, and undoes exactly that import while native membership and paging state remain unchanged. The injected native SQL failure and expired publication lease legs distinguish rolled-back publication from retained partial effects that require explicit rollback. The same file's saved-response journeys cover unchanged replay, and its native-edit and later-import journeys preserve records under `NATIVE_EDIT_CONFLICT` and `IMPORT_SUPERSEDED`, including revoked-session refusal. In `tests/import-door.mjs`, the PagerDuty account HTTP journey revokes Business import authority inside the committing batch, injects publication failure, and checks unchanged native records; its identical-byte and reviewed catch-up journeys cover unchanged and changed identities. These are synthetic saved-file proofs with imported objects inactive and paging OFF; live account conversion and cutover remain with OC-038 and OC-074.

**Acceptance.**
1. Apply, interrupt and restart, resume and undo both vendor imports over HTTP; revoke authority at publication, inject an SQL failure, replay unchanged and changed identities, and preserve native edits as named undo conflicts.

## Target clauses

### Complete category job

#### OC-023 — Services, teams and ownership

*Tier:* Core · *Rules:* D-1

**Requirement.** Maintain searchable services, environments, owning teams, dependencies, escalation policies, responder contacts, runbooks and lifecycle state. An alert exposes its applicable runbook before declaration; declaration keeps the immutable copy under OC-005. Team managers administer their own coverage; private team and service access is enforced on the UI, API, exports and integrations, and team privacy hides foreign items from every door. Workspace administrators retain explicit cross-team access. Backstage imports ownership and dependency changes with preview, provenance and conflict review; stale or ownerless services stay visible and cannot silently route to an invented person. Team scope also covers the duties received under RL-3 and RL-5: private-team recent-change scope (OC-065); teams as business-service subscribers, and a private team's business service invisible to stakeholders outside its scope (OC-061); create-page and request-responders permissions set per role and team, with responders and admins paging services in their teams by default and a workspace setting that lets a named team, such as Support, page any service (OC-068); and manager rules for swaps (OC-025). Business services built on these dependencies, with stakeholder subscriptions and an internal status view, are OC-061; each service's recent deploys and configuration changes are OC-065. Team-scoped audit export keeps door rule D-1.

**Acceptance.**
1. Create two teams and a dependent service through the UI/API, read the alert runbook, import a Backstage ownership change, deny a foreign-team user through direct/export/chat doors, and resolve an ownership conflict without losing incident history.
2. A foreign team's incidents are neither listed nor selectable.
3. Team-scoped audit export proves door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-024 — Follow-the-sun, PTO and holiday coverage

*Tier:* Core · *Register:* R-14

**Requirement.** Compose primary and secondary layers with daily, weekly, custom interval and business-hour rotations across named zones. Show effective coverage and gaps for follow-the-sun handoffs, US federal and company holidays and individual PTO imported from Google Calendar or Microsoft Outlook with least-privilege consent. A holiday calendar is not a universal US work schedule: teams choose their rules. A proposed schedule change shows who loses or gains coverage, including DST, and cannot silently close a gap or move retained member slots. Overlaps have an explicit precedence and explanation. The moved duty and its acceptance are retained verbatim in OC-076 and OC-066 (RL-3).

**Acceptance.**
1. Build New York/Los Angeles/London handoffs, add a US holiday and approved PTO in Google and Outlook, inspect a DST weekend and uncovered interval, then apply a reviewed layer change and compare actual paging targets to the preview.
2. During the New York-to-London handoff, page the London responder through their verified UK voice and SMS routes under OC-066, and see a shift held by a responder with only one verified route flagged as degraded in the preview.

#### OC-025 — Swaps, reminders and calendar subscriptions

*Tier:* Core · *Register:* R-14

**Requirement.** Responders request and accept schedule swaps from web or mobile with explicit substitute acceptance and manager rules; no accepted swap may leave coverage ambiguous. The moved duty and its acceptance are retained verbatim in OC-077 (RL-3). Personal on/off-call reminders obey each responder's channel/time rules; overdue swap requests remain visible. Support Google Calendar and Outlook through revocable scoped ICS subscriptions as well as authenticated downloads; feeds contain schedule data only, and revocation ends access without changing historical assignments.

**Acceptance.**
1. Request, accept and race two swaps, reject an unauthorized substitute, revoke a calendar subscription, view the effective rotation in Google/Outlook, and observe automatic change/reminder delivery plus a visible failed-notification outcome.

#### OC-026 — Native US phone, SMS, push and email paging

*Tier:* Core · *Cites:* BASE-MAIL-001 · *Rules:* D-1, D-3, D-4 · *Register:* R-5, R-6

**Requirement.** Every responder enrolls and verifies real destinations and keeps two separate ordered notification rule sets, one for high urgency and one for low urgency (OC-057), each by channel, on/off-call state and delay in minutes; a rule with zero delay notifies immediately. The two-channel/two-provider requirement below applies to the high-urgency set; the low-urgency set may be, for example, push and email only. Deliver SMS and voice using Twilio and an independently operated second provider such as Telnyx, plus mobile push through APNs/FCM and incident email through a configured US mail service (Resend, SendGrid or Amazon SES). Require at least two channels over two independent providers per responder, including a telephone route independent of the mobile push path. SMS and voice to destinations outside the US follow the OC-066 country list, and this two-channel/two-provider rule applies to every responder in every listed country. Complete US A2P 10DLC registration, sender/caller identity, consent/opt-out handling and carrier testing before activation. Opt-out, invalid number, unregistered sender or failed provider leaves coverage degraded and pages an approved alternate; it never silently counts as delivered. Show queued, attempted, provider-accepted, device/carrier-delivered where observable, human-confirmed and explicitly acknowledged separately, with provider costs and usage in USD. Notifications are composed per responder and channel under OC-071: pages due together bundle into one call, SMS and push, and every SMS reply code and keypress binds to the exact items of its message under OC-082. Intake-to-first-provider-attempt and per-channel provider-acceptance latency meet the OC-064 bars. A manual page's obligation has the same OC-064 timing bars, stop conditions (except source recovery, since there is no source), audit and standby continuity (OC-028) as an alert-born page (received from OC-068 under RL-5). Live cutover and parallel routing within this clause's subject are received from OC-038 (RL-3). Provider attempts and outcomes keep door rule D-1.

**Acceptance.**
1. On registered US carrier phones, trigger a real alert and verify voice/DTMF, SMS replies/links, push and incident email, with intake-to-first-attempt measured against the OC-064 bar; send a low-urgency alert and verify only the responder's low-urgency rules fire.
2. Disable Twilio then the second provider and the push path separately; prove an independent route reaches the responder.
3. Reject forged/duplicate callbacks, expose uncertainty and opt-out, and record actual receipts and human acknowledgment rather than test-provider success.
4. Repeat the provider-disable checks for a verified UK and a verified Canadian number under OC-066.
5. Trigger two pages to one responder minutes apart and acknowledge the first by its SMS reply code; observe only that page acknowledged (OC-082).
6. The engineer is phoned within the OC-064 intake-to-first-attempt bar, and the notification names the creator.
7. Provider attempts and outcomes prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-075 — Source recovery cancels attempts and sends recovered notices

*Tier:* Core · *From:* OC-026 · *Rules:* D-4

**Requirement.** When the source recovers that generation, before or after acknowledgment, Oncall does all of the following in one commit: stops the obligation, cancels every attempt not yet handed to a provider, records the outcome "stopped by source recovery" with the recovery receipt, and resolves the alert with no human summary. Attempts already handed to a provider keep their recorded outcomes. Per service, policy chooses to send a "recovered" notice to everyone already notified, or to stop silently. This duty is received from OC-056 under RL-4.

**Acceptance.**
1. Before paging ships, the OC-070 email recovery path runs with actual attempt cancellation and recovered notices: attempts not yet handed to a provider are cancelled with the stop, and attempts already handed over keep their outcomes.
2. Under the "notify recovered" policy, exactly one recovery notice reaches each person already notified.

#### OC-076 — Verified route counts and degraded coverage before a shift

*Tier:* Core · *From:* OC-026

**Requirement.** Every shift in the effective coverage view and the change preview shows its responder's verified high-urgency route count under OC-026 and OC-066, and a shift whose responder lacks two independent routes in their country is flagged as degraded coverage before it starts, never discovered when a page fails. This duty is received from OC-024 under RL-3.

**Acceptance.**
1. Every shift in the coverage view and the change preview shows its responder's verified high-urgency route count, and a shift whose responder lacks two independent routes in their country is flagged as degraded before it starts.

#### OC-077 — Schedule-change notices are delivered

*Tier:* Core · *From:* OC-026 · *Rules:* D-4

**Requirement.** Schedule and override changes automatically notify affected responders and service owners and retain delivery failures. This duty is received from OC-025 under RL-3.

**Acceptance.**
1. A schedule or override change notifies the affected responders and service owners, and a failed delivery is retained and visible.

#### OC-027 — Durable escalation until acknowledged

*Tier:* Core · *Rules:* D-1, D-4

**Requirement.** Versioned service escalation policies use absolute persisted deadlines, scheduled target resolution at firing time, simultaneous or ordered levels, primary and secondary targets, repeats (0–9 passes through the policy), round-robin, explicit reassignment and manual escalation. Each level's escalation delay is a whole number of minutes from 1 to 1,440. The acknowledgment timeout is the per-service re-trigger of OC-058, and snooze is OC-058's durable snooze; neither exists only in a browser. Incoming eligible alerts, manual pages and responder requests (OC-068) each start a durable obligation without a browser open. Each obligation records owner, due time, attempts, stop condition and terminal or failure outcome. The stop conditions are exactly: acknowledgment, source recovery of the paging generation (OC-056), resolution, explicit cancellation by an authorized human, and the urgency rule of OC-057 (low urgency does not escalate unless the service opts in); each stop records which condition fired. Acknowledgment atomically records responsibility and stops future escalation at both sites; resolution remains OC-004. Deadlines fire within the OC-064 lateness bar and never early. Reassignment visibly transfers responsibility and starts the configured receiving deadline. Escalation by SMS reply code or voice key (OC-082) is a manual escalation of only the item it names. No eligible target, exhausted repeats, expired acknowledgment or failed transport escalates to the designated final responder and leaves an operator-visible failure; silence never means handled. Duplicate workers or callbacks cannot consume a round-robin turn twice or restart a stopped job. A user-targeted page follows the service's user-assignment rule: either repeat to that user under the OC-027 repeat setting, or escalate to a chosen escalation policy from level one after 1–1,440 minutes unacknowledged; the default is the service's own policy after 10 minutes (received from OC-068 under RL-5). Live cutover and parallel routing within this clause's subject are received from OC-038 (RL-3). Escalation workers and provider attempts keep door rule D-1.

**Acceptance.**
1. Trigger through the Events API, close the browser, cross a handoff and observe primary, secondary, repeat and round-robin pages, each first attempt within the OC-064 deadline-lateness bar of its persisted due time (a 5-minute escalation fires between 5:00 and 5:30 at p99) and none early.
2. Escalate one of two open pages by SMS reply code and observe only that page move to its next level.
3. Restart workers at a deadline; race reassignment, acknowledgment, duplicate callbacks and acknowledgment expiry.
4. Inspect one consistent obligation history, stopped jobs and the final failure path.
5. Not acknowledging escalates per that user-assignment rule, and the outcome is recorded.
6. Escalation workers and provider attempts prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-078 — Source recovery and support hours stop or start escalation

*Tier:* Core · *From:* OC-027 · *Rules:* D-4

**Requirement.** When support hours begin, a durable timer raises each open low-urgency alert of a support-hours service to high (OC-057), attributed to the rule version, and its escalation starts from the support start. Source recovery of a paging generation before its next escalation deadline stops further notification and records a stopped-by-recovery outcome; an alert-only page leaves no incident needing manual resolution, and when every alert of a declared incident recovers, paging stops while the incident stays open and awaiting resolution with a reminder to its commander. The closed-browser and reminder duties are received from OC-056 under RL-4.

**Acceptance.**
1. Recover the source before the first escalation deadline and observe no further notification and a recorded stopped-by-recovery outcome.
2. Leave a low-urgency alert of a support-hours service open across the support start and observe its attributed raise to high at that start, within the OC-064 lateness bar and never early, and escalation starting from it.
3. Trigger an alert-only page and recover it before the first escalation deadline with the browser closed: no further notification goes out, a stopped-by-recovery outcome is recorded, and no incident is left needing manual resolution.
4. Recover a declared incident's alerts and observe that paging stops, the incident stays open and awaiting resolution, the reminder fires, and resolution is refused without an OC-004 summary.

#### OC-028 — Independent standby and tested takeover

*Tier:* Core · *Rules:* D-1, D-4 · *Register:* R-8

**Requirement.** Paging survives loss of the main application or its cloud account: dual alert intake, configuration pull and a separately operated standby with independent store, secrets, identity and delivery credentials retain the same scoped source identities, lifecycle generations and absolute deadlines. Term-scoped dispatch markers and fencing prevent competing sites from taking authority; one-use acknowledgment works at either site and reconciles without a second ownership claim. Announce role moves externally to operators, record configuration age and backlog, and expose which site owns each obligation. Provider timeouts remain uncertain; do not claim impossible exactly-once carrier delivery. The approved takeover policy can issue a separately identified emergency alternate page with a duplicate warning, retaining both attempts. Test failback and reconcile pending and acknowledged work without replaying history. Live cutover and parallel routing within this clause's subject are received from OC-038 (RL-3). Standby authority moves and dispatch keep door rule D-1.

**Acceptance.**
1. During live phone drills remove the main site's network, storage, identity and account access in turn, split the sites, duplicate intake and acknowledge at either site.
2. Measure loss-to-takeover and takeover-to-first-provider-attempt times against the OC-064 bars (standby authority within 120 seconds of loss; first attempt for every due obligation within 60 seconds of takeover), verify fencing, role announcements and recovery/failback, and prove no acknowledged incident resumes.
3. Publish measured results and operating instructions before cutover.
4. Standby authority moves and dispatch prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-029 — Native iOS and Android responder apps

*Tier:* Core · *Rules:* D-1, D-3 · *Register:* R-6, R-7

**Requirement.** Ship iOS and Android apps for the filtered incident list with "mine" and bulk actions (OC-079), manual pages and responder requests (OC-068), incident details, runbook, recent changes (OC-065), live timeline, current and next schedule, swaps, one-tap acknowledgment and reassignment, snooze (OC-058), library actions (OC-063), stakeholder status (OC-061) and incident coordination, meeting the OC-009 accessibility bar. Use approved iOS Critical Alerts and Android high-priority/full-screen or DND-bypass mechanisms with platform permissions and device enrollment checks; obtaining entitlements and distribution approval is delivery work. A responder sees when OS permissions, silent mode, a revoked device, offline state or stale sync prevents urgent delivery. Never claim bypass when the device or OS disallows it: invoke the enrolled independent phone route under OC-026. Pages due together arrive as one OC-071 bundled push that opens the OC-060 list filtered to its items. Lock-screen messages expose only configured minimum information; offline acknowledgment is pending until the server commits it and cannot stop escalation locally. The mobile duties received under RL-3 and RL-5 are the mobile recent-changes panel (OC-065), mobile status and subscription access and push delivery (OC-061), mobile manual pages (OC-068), mobile swaps (OC-025) and mobile queries and bulk coordination (OC-060); live cutover and parallel routing within this clause's subject are received from OC-038. Mobile actions and device delivery keep door rule D-1.

**Acceptance.**
1. On physical supported iPhone and Android devices, trigger with the screen locked and DND enabled after permission enrollment; observe urgent notification and one-tap server acknowledgment.
2. Deny permissions, revoke a device and disconnect data; verify phone escalation, pending offline state, current schedule and an accepted swap without duplicate authority.
3. Snooze for 15 minutes from the lock-screen notification and observe a re-page at expiry; trigger five pages together and observe one bundled push that opens exactly those five; complete acknowledge and reassign with VoiceOver and TalkBack.
4. Create a policy-targeted page from the mobile app and through the API with a repeated idempotency key, and observe one incident paging that policy instead of the service's.
5. During a 50-incident storm, filter by team, service, urgency and status, view "assigned to me" on web and mobile, and acknowledge all 50 in one action.
6. The stakeholder is notified only through the approved update, by their chosen channel, and is denied the incident timeline, alerts and runbook over web, mobile, API and export doors.
7. Mobile actions and device delivery prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-030 — Datadog, Prometheus and Grafana intake

*Tier:* Core · *Rules:* D-3 · *Register:* R-12

**Requirement.** Provide documented authenticated Datadog metric/APM, Prometheus Alertmanager and Grafana alerting integrations. Preserve source IDs, labels, service and environment, severity, trigger and recovery generation, event time, provenance and bounded diagnostic links; map provider fingerprints without treating retries or reordered resolved groups as new outages. An installation screen verifies credentials with a named test alert, lists the last accepted and rejected input and explains routing. OC-001/002 and OC-043 deduplication, grouping, maintenance and suppression rules apply consistently to every adapter. Every adapter accepts the request bounds of OC-059 and splits a grouped notification into one event per alert, so a large Alertmanager group or Datadog multi-alert never becomes a refusal without a page. Each adapter installation is bound either to one service or to an OC-072 routed key whose rules route by Alertmanager labels, Datadog tags or Grafana labels.

**Acceptance.**
1. Use each provider's supported test/send door then fire and recover a real rule; repeat/reorder a grouped webhook, reject forged auth and malformed payloads, and inspect one correct incident generation and public-door rejection diagnostics.
2. Install one Alertmanager adapter on an OC-072 routed key and observe alerts with different `team` labels on their own services.

#### OC-031 — AWS CloudWatch and SNS intake

*Tier:* Core · *Rules:* D-3 · *Register:* R-12

**Requirement.** Connect US AWS accounts and regions through least-privilege CloudWatch/SNS integration. Validate SNS signatures and subscription confirmation against trusted provider endpoints; reject replay, a foreign topic or account and unsafe URL fetches. Preserve alarm identity, dimensions, account and region and ALARM/OK ordering; INSUFFICIENT_DATA remains unknown and never proves customer recovery. Credential rotation and subscription failure surface to the integration owner and alternate coverage route.

**Acceptance.**
1. Subscribe a real authorized SNS topic, transition a CloudWatch alarm through ALARM/OK/INSUFFICIENT_DATA, duplicate/reorder notifications, rotate access, and refuse forged signatures, foreign topics and hostile confirmation URLs without network or state side effects.

#### OC-032 — Error and uptime integrations with sibling products

*Tier:* Core · *Register:* R-12

**Requirement.** Connect Sentry issues and releases and Spool error groups to the affected service, including sanitized stack, error and deploy context and links subject to source permissions. Accept signed Uptime trigger and recovery events with immutable monitor evidence links; source recovery updates alert evidence and never independently resolves the human incident. Configure source-specific grouping and flapping controls. Oncall owns response, while [Spool](https://github.com/just-every/run-spool) owns error tracking and [Uptime](https://github.com/just-every/run-uptime) owns checks, probes and uptime calculation; links do not confer access. [Porthole](https://github.com/just-every/run-porthole) is the RunEditRun sibling for the monitoring and observability boundary; this is a scope reference without a capability or readiness claim.

**Acceptance.**
1. Trigger and recover via a real Sentry rule, Spool error group and Uptime monitor; replay each event, send a stale recovery and access a restricted context link.
2. Verify correct grouping, source permission checks and a still-open incident until evidence-backed human resolution.

#### OC-033 — Generic email and Events API

*Tier:* Core · *Rules:* D-3 · *Register:* R-2

**Requirement.** Offer scoped, revocable webhook and Events API credentials and integration email addresses for tools without adapters. Email intake uses authenticated Cloudflare Email Routing delivery, integration addresses with an unguessable installation-generated local part on the configured inbound email domain (email is off until one is set), bounded MIME and attachment handling, safe text extraction and explicit sender and routing rules; an arbitrary From address does not grant authority. Show parse failures, quarantine and unmapped service or environment to the integration owner. Document curl examples, stable receipt IDs, idempotency, rate and size limits, signatures, key rotation and trigger and recovery generation mapping. Each integration email address has an OC-070 email mode, with trigger and resolve rules and a stated unmatched-mail fallback, that turns each email into a trigger, deduplication or recovery of a derived alert generation; no email opens or resolves anything outside those rules. No rejected event is shown as accepted or silently discarded. Sources that already send PagerDuty, Opsgenie or Splunk On-Call shaped payloads use the OC-055 compatible endpoints instead of this schema. A real-provider email run is field proof R-2.

**Acceptance.**
1. Send signed and bearer API events plus an inbound provider email; duplicate message IDs, revoke credentials, exceed limits, spoof senders and submit malformed MIME.
2. Inspect accepted receipts, bounded quarantine/rejection diagnostics and no unauthorized read or incident mutation.
3. Send a repeated failure subject and then a resolve-rule mail to an address in OC-070 custom-rule mode, and observe one generation whose paging stops by source recovery.

#### OC-034 — Slack and Microsoft Teams response

*Tier:* Core · *Rules:* D-1, D-3 · *Register:* R-12

**Requirement.** Install real Slack and Microsoft Teams applications with workspace- or tenant-scoped identity and least-privilege grants. Policy automatically creates the incident channel, invites the responders and publishes the incident summary, runbook, bridge and timeline link. Slash commands and message actions declare, acknowledge, assign commander, scribe and communications roles, request responders, add timeline entries and change incident state through the same server authority. Map a chat identity explicitly to an active Oncall member; signed chat payloads, retries and role changes obey idempotency and revocation. Channel creation or delivery failure remains a visible obligation and cannot block paging. A chat "request responders" pages each named user or policy as its own obligation under OC-068. Each service's standing alert channels, interactive alert messages, the on-call lookup command and the page command are OC-067 and OC-081. Chat grants, commands and delivery keep door rule D-1.

**Acceptance.**
1. In each real workspace/tenant declare an incident, observe the automatic channel and role assignment, acknowledge through a command/action and see the same web state.
2. Replay a request, remove a grant/member, attempt cross-tenant access and break channel creation; verify denial, one state change and continued phone escalation.
3. Chat grants, commands and delivery prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-035 — Incident bridges and live call routing

*Tier:* Core · *Rules:* D-3 · *Register:* R-6, R-12

**Requirement.** Create or join an incident bridge through Zoom or Microsoft Teams, record participants and the bridge link in the timeline, and apply workspace permissions. US inbound telephone numbers route callers to the current on-call responder via Twilio or Telnyx independently of web intake; the call is transferred to that responder's verified voice destination in any OC-066 country, so a London or Toronto responder on the follow-the-sun rotation answers phone-in incidents too. DTMF identifies service and urgency, missed calls create durable phone-in incidents with timed escalation, and caller disconnection or provider failure retains an explicit outcome; warm transfer and fallback targets use the same coverage rules. Recording and transcription are optional, consented and retained under OC-040, with no claim that they prove incident acknowledgment. An answered call requires the responder's explicit acknowledgment to stop escalation.

**Acceptance.**
1. Call the real US number across a handoff, answer and acknowledge, reach a London on-call responder's verified UK number by transfer, miss a call and reach secondary, fail each carrier and transfer a live call.
2. Create Zoom and Teams bridges from incident actions, deny an unauthorized join/detail read, and inspect call/timeline/outcome records without exposing recordings to viewers without a grant.

#### OC-036 — Post-incident review and completion policy

*Tier:* Core · *Rules:* D-3, D-4 · *Register:* R-12

**Requirement.** Generate postmortem material automatically from attributed events, actions, delivery and acknowledgment times, hypotheses, recovery evidence and chat and bridge context; distinguish observation, human assertion and agent suggestion. Accepting a root cause, impact or review is a commitment: a person accepts it in the product, and an agent's acceptance carries the commitment class, which the company's policy decides; the record names who accepted it. Follow-ups have priority, owner, due time, escalation recipient, completion policy and evidence, with automatic reminders, overdue escalation and recurring review until accepted completion. Create or link and synchronize issue ownership and state in Jira and Linear and issues and pull requests in GitHub and GitLab using scoped grants and stable operation IDs. A closed remote ticket or quiet alert stream alone cannot close a required mitigation; conflicts and revoked connectors remain visible.

**Acceptance.**
1. Resolve with open critical work, generate review material, accept a correction and create a Jira, Linear, GitHub and GitLab follow-up.
2. Advance due time with the browser shut, reopen a remote issue and revoke its connector; verify reminders, escalation, synchronization/conflicts and evidence-required completion without erasing history.

#### OC-037 — Response analytics and fair on-call load

*Tier:* Core

**Requirement.** Report MTTA, MTTR, time to verified recovery, escalation and reassignment latency, page volume, repeat and noisy alerts, missed and unknown delivery, after-hours interruptions, shift hours and responder, team and service load over selectable periods. Publish exact start and end and inclusion rules; retain unresolved, unacknowledged and missing timestamps as visible censored or unknown cases rather than zero or excluded successes. Show percentiles and distributions and fairness normalized by coverage hours; break out human and automated observations and imported history. Export filtered CSV and API results with the same permissions and incident drilldown. Configuration changes, maintenance and erased subjects cannot silently improve historical denominators. Until the capabilities that produce the remaining figures exist, the report computes what current records hold and names the rest. Page volume and missed or unknown delivery are inherited by OC-026 and OC-064, escalation and reassignment latency by OC-027, after-hours interruptions by OC-024 and OC-026, team load and foreign-team export refusal by OC-023, imported-history provenance by OC-038, erasure-proof denominators by OC-040 and independently verified recovery by OC-048. Each adds its figures to this report, its CSV and its API before it ships, repeating this clause's evidence for its own figures. Coverage hours are scheduled hours from the current schedule revisions and are labeled as scheduled, not worked.

**Acceptance.**
1. Run a known sequence of resolved, open, never-acknowledged, late, repeated and imported incidents across DST and after-hours shifts; compare dashboard/CSV/API figures with source timelines and coverage hours, inspect an interruption-fairness imbalance and refuse foreign-team exports.

#### OC-038 — Complete incumbent migration and controlled cutover

*Tier:* Core · *Rules:* D-2, D-3 · *Register:* R-11

**Requirement.** Provide reviewed migration from PagerDuty; Opsgenie and Jira Service Management incident-response records; Splunk On-Call (VictorOps); and Better Stack, with vendor-specific file and API export instructions, reconciliation and a resumable journal. Inventory users and teams, verified contacts, schedules, layers, overrides and PTO, services, integrations, notification rules, escalation, repeat and round-robin settings, open incidents and historical timelines, reviews and actions. Preserve foreign IDs, timestamps and provenance; imported histories never count as live delivery. Name unsupported or missing objects individually and retain their original source for resolution rather than approximating the rotation. Map users without login grants, rotate secrets locally and keep send authority inactive. Imported contact methods keep their E.164 country codes and pass through OC-026/OC-066 verification, so an imported number in an unlisted country is named in the move report with its two-route warning. Each incumbent service's chat channel connection that the export includes is listed for re-creation under OC-067. Monitor sources move without re-keying: imported PagerDuty Events v1/v2 integration keys, Opsgenie API integration keys and Splunk On-Call REST routing keys map to the matching Oncall services and stay inactive until an administrator activates each one, after which the OC-055 endpoints accept the incumbent key, so an unmodified monitor moves by changing only its URL; Oncall's own replacement keys can then be rotated in. Keys that route across services import as OC-072 routed keys: PagerDuty global integration and Event Orchestration router keys, with their routing rules, dynamic routing rules and catch-all; Opsgenie API integrations that route by `responders`, `teams` or alert policies; and Splunk On-Call REST endpoints whose routing keys address several teams. Each becomes the key's first rule-set version, each unconvertible condition is named in the move report with its original kept, and the key stays inactive until activated, so these monitors also move by changing only their URL. Each named source with a configurable PagerDuty or Opsgenie destination (Datadog Webhooks, Prometheus Alertmanager, Grafana, CloudWatch via SNS, New Relic, Azure Monitor action groups, Google Cloud Monitoring, Jenkins, GitHub Actions) has a documented move guide; a tool whose built-in integration hard-codes the incumbent host is named in the move report with its generic-webhook route. Email integration modes, custom trigger and resolve rules and Opsgenie email filters import into OC-070, each unconvertible rule named. Terraform-managed configuration converts through OC-062, Automation Actions import as inactive OC-063 definitions, and business services and stakeholder subscriptions import into OC-061. Compare source and target coverage through DST and real alert outcomes in parallel; an administrator explicitly accepts the real-phone and standby drill before rerouting sources and retiring the old pager, with a rehearsed rollback that leaves one paging authority. Before OC-038 ships, it imports the complete OC-070 PagerDuty email settings and Opsgenie email filters; each unconvertible rule is named in the mapping report with its original kept for review. Live-API pull and account reconciliation are co-held with OC-074 (RL-3, RL-5).

**Acceptance.**
1. For each named incumbent migrate a representative export/account through preview, apply, restart, reconcile and undo, including custom policies, overrides, integration keys, custom email rules, business services, stakeholder subscriptions, Automation Actions and an open incident.
2. Repoint an unmodified Datadog webhook and an Alertmanager `pagerduty_configs` receiver by URL only after key activation and confirm one alert generation per source.
3. Import an account whose Alertmanager sends to one Event Orchestration key, activate it as an OC-072 routed key, and confirm each team's alert pages its own service with the URL as the only change.
4. Resolve named mapping differences, compare coverage across a US DST change, rehearse parallel alert routing and rollback, then perform an authorized real-phone cutover under OC-026–029.
5. Opsgenie migration has a dated readiness checklist for its announced 5 April 2027 shutdown; current provider/export availability must be checked at execution.
6. Import the complete OC-070 PagerDuty email settings and Opsgenie email filters, and read a mapping report that names each unconvertible rule with its original kept for review.

#### OC-074 — Live incumbent API pull and account reconciliation

*Tier:* Core · *Rules:* D-3 · *Register:* R-11

**Requirement.** Pull live incumbent account records through their APIs with reviewed least-privilege access, reconcile subsequent account changes against the resumable migration journal, preserve foreign IDs and provenance, and name unsupported or conflicting objects for human review. This is the live-API pull and account reconciliation duty referenced from OC-038, which it co-holds (RL-5); saved-response file adapters remain OC-038.

**Acceptance.** Mapped verbatim from OC-038:
1. For each named incumbent migrate a representative export/account through preview, apply, restart, reconcile and undo, including custom policies, overrides, integration keys, custom email rules, business services, stakeholder subscriptions, Automation Actions and an open incident.

#### OC-039 — Enterprise access and responder lifecycle

*Tier:* Core · *Cites:* BASE-SIGNIN-001, BASE-SIGNIN-002, BASE-ROLE-001 · *Register:* R-9

**Requirement.** Add verified invitations and the team membership lifecycle, SSO through Google Workspace, Okta, Microsoft Entra ID, JumpCloud and OneLogin, with just-in-time accounts and required-SSO enforcement as OC-069 specifies, step-up for privileged changes and scoped service accounts. Keep documented emergency administrator access independent of the main identity provider and reconcile revocation at standby. Imported contacts, chat accounts and caller IDs never create membership automatically. Revocation retires device and provider access; deprovisioning shows the resulting schedule gap and invokes approved alternate coverage rather than reassigning silently. Assigning the OC-061 stakeholder role to SSO and SCIM users is received under RL-5.

**Acceptance.**
1. Invite a responder, sign in through Google Workspace, Okta, Entra and a generic SAML provider under OC-069, require step-up to edit paging credentials, deprovision via SCIM while a write is in flight, and exercise documented emergency access during IdP loss.
2. Verify standby revocation reconciliation and a visible coverage gap.

#### OC-040 — Retention, erasure and custody

*Tier:* Core · *Cites:* BASE-DATA-002, BASE-DATA-003, BASE-DATA-006 · *Rules:* D-2

**Requirement.** Keep authored incident, review, runbook and follow-up history until explicit owner erasure or a separately chosen retention policy. Publish data categories, custody, configured retention and effects before enabling automatic expiry for telemetry snapshots, recordings or provider content. Admins can erase an incident, contact or member or integration and its local copies, pending deliveries, credentials and imported custody; receipts contain per-table counts and completion state and are not issued before commit. Preserve erasure fences without personal content; an erased responder leaves an explicit gap. Imports and restores carrying the later source erasure journal cannot resurrect erased data. Older offline copies, already sent provider messages and in-flight external calls cannot be recalled; document recipient and provider deletion requests. Cross-site erasure must reconcile standby before success is claimed.

**Acceptance.**
1. Erase an imported person including filenames, plans and indirect schedule references, then erase native contact/incident/connector data and inspect all local/standby/export copies and receipts.
2. Restore with a later erasure journal, inject a failure and race a send; prove rollback or a visible incomplete state, explicit schedule gaps and no success before all owned custody is handled.

#### OC-041 — Durable operational audit

*Tier:* Core · *Cites:* BASE-AUDIT-001, BASE-OPS-005, BASE-OPS-004 · *Rules:* D-1, D-2

**Requirement.** Keep a structured, append-only permanent audit separate from the unchanged held operational history, incident timelines and reviewed handoff copy. Each permanent entry records the actor or feature, subject and source as permanent random pseudonyms, operation kind, time, before and after revision where applicable and an allowlisted outcome. Identity associations are separate and erasable: erasure deletes those associations while immutable kind, time and outcome and unlinkable labels survive. Labels are never reassigned, including after erase, restore or recreation; old chronology never becomes a new actor's. No raw identities, hashes, credential labels, tokens, telephone or message content, payload content or telemetry secrets enter this audit. Operational payload history retains its own access, retention and erasure policy under OC-040; keeping both records does not rewrite it into anonymous history. Every current mutation path commits its accepted state and permanent audit entry in the same D1 batch: workspace commands and native member and access changes, password changes, native source, intake and change keys and admission, schedules, paging refusals and historical acknowledgment and cancellation, triage bulk actions, handoffs, routing publication, move-in, the import door and erasure. Audit-write failure rolls back the state change. Committed mutations and decision receipts advance a global revision and retain workspace, paging and handoff revision snapshots. Under OC-050, an authorized human command whose every submitted value equals its stored value is a pure comparison no-op and writes no timeline, audit or revision entry. Denials, failed authorization, stale-revision conflicts and any no-op touching permission, credential, notification-routing or retention surfaces still write an audit fact, retaining equal before and after revisions when no state changes. The Response API retains its audited 201 receipt for a new operation and 200 replay; bulk operations retain durable receipts. Import apply and resume have a durable lease and retain a failed, interrupted or uncertain outcome on interruption or lease expiry; a vanished process cannot silently erase its operation. The protected audit export serves permanent audit to the current administrator; the installation owner acts as administrator until OC-023 introduces team-scoped export. The permanent audit is included in OC-052's durable transfer and erasure policy without transferring identity or execution authority. Future execution classes inherit their own atomic audit and crash and lease outcomes under door rule D-1 before shipping; those unbuilt flows remain requirements of their own clauses, and current audit completion does not establish their delivery, execution or crash proof.

**Acceptance.**
1. Exercise every current mutation class through protected HTTP, inject audit-write failure and prove neither state nor audit partially commits.
2. Export as administrator, refuse anonymous/revoked/viewer authority, erase a subject's identity associations and prove permanent labels and immutable kind/time/outcome survive without personal content, hashes, credential labels or secrets.
3. Interrupt import apply/resume and expire its lease; inspect durable outcomes and safe resume.
4. Restore held data without rewriting operational history, compare portable permanent audit, and prove restored history never grants authority or reassigns labels.

#### OC-042 — Credential custody and declared external flows

*Tier:* Core · *Cites:* BASE-SECRET-001, BASE-DATA-004 · *Rules:* D-3

**Requirement.** Encrypt telephone destinations, provider tokens and webhook and chat capabilities at rest under installation-local key custody; display only redacted definitions and verification state. Rotate and revoke with visible effects on queued and in-flight work and independently provision standby credentials. Declare every outbound recipient and data category before enabling a connector: telecom receives the destination, minimum incident text and acknowledgment capabilities; APNs/FCM receives the device token and minimum alert; collaboration receives reviewed incident context; monitoring, code and Resolve-style connectors receive only granted query scope; mail receives addressed messages and links. AI receives only redacted incident-granted context with a named processor and retention choice. No arbitrary destination fetch or production command is authorized by a runbook or link. Restrict redirects, SSRF, budgets and signed callbacks; credential values never enter archives, logs, the UI, audit or AI context. Each capability that adds a credential or outbound flow, including telephone, paging, push-device, chat and collaboration, monitoring, code and Resolve-style query, AI and standby connectors (specifically OC-026/028/029/033/034/035/039/045/048/051/053/063/066/067/069/071), inherits this clause's obligations as door rule D-3 and proves them under its own clause before it ships. Subscriber delivery for OC-061 business services stays under this clause's custody with the held SendGrid sender, pending delivery proof: subscribers can be users, teams, Slack/Teams channels and email lists, each choosing email, push (OC-029) or chat delivery, and approved internal updates (OC-051) and optional templated "impact started/ended" notices reach subscribers of the impacted business services, with raw alert text never sent (received under RL-5).

**Acceptance.**
1. Configure and rotate each connector over a protected setup door, inspect authorized network traffic at its network edge and all persisted/exported representations, submit hostile URLs/redirects and revoked credentials, and prove only the chosen endpoint receives the minimum permitted content and secrets never travel in an archive or model request.

#### OC-043 — Explainable grouping and event orchestration

*Tier:* Core · *Rules:* D-1, D-2, D-4

**Requirement.** Extend exact-key deduplication with configurable cross-source correlation, grouping windows, service and dependency association, maintenance windows, suppression, flapping controls and severity and urgency transformations. Explain the original event, matching rule and version, group membership, suppression reason and expiry, ownership and intended actions before applying changes. Retain suppressed and unmatched signals and route failures to an owner; no noise rule deletes evidence or silently lowers severity. Durable idempotent workflows can declare an incident, notify responders and launch the coordination steps of a workflow version an administrator approved; an agent's approval of a version carries the live class, which the company's policy decides. Dry-run and replay produce an ordered comparison without effects. Auto-recovery may close the source alert but never invent customer recovery or complete a human incident. Source recovery of a paging generation stops that generation's paging obligation under OC-056, and an orchestration rule may set urgency under OC-057 only by raising it or by a versioned, explained lowering at admission. Orchestration has two stages, as in PagerDuty: on a routed key, the OC-072 routing rules first pick the service, and this clause's service orchestration rules then run within that service. The explanation names both rule versions. Orchestration automation keeps door rule D-1.

**Acceptance.**
1. Send correlated and unrelated Datadog/Prometheus/error events across services, replay after changing policy, apply/expire maintenance and suppression with a browser closed, and restart during orchestration.
2. Inspect retained originals and explanations, one intended action per identity and a visible unmatched/failure queue.
3. Send events through an OC-072 routed key into a service with orchestration rules, and observe routing before the service rules, with both rule versions in the explanation.
4. Orchestration automation proves door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-044 — US operating boundaries and transparent cost

*Tier:* Core

**Requirement.** Oncall supplies paging, schedules and incident response as its own product. [Lamp](https://github.com/just-every/run-lamp) owns public status sites and subscriber delivery; Spool owns error diagnosis records and Uptime owns monitoring. Jira/JSM and Linear retain general help-desk and project work, while Oncall keeps incident-linked follow-ups. Related RunEditRun siblings are [Envelope](https://github.com/just-every/run-envelope) for the payroll boundary, [Pegboard](https://github.com/just-every/run-pegboard) for general work and project management, and [Porthole](https://github.com/just-every/run-porthole) for monitoring and observability. These links identify separate product scope; they make no capability, integration or readiness claim. Telecom carriers and registered messaging, APNs/FCM and Zoom/Teams supply their infrastructure through working integrations; provider registration, agreements, native entitlements and account setup remain required engineering deliverables. Oncall is not a 911 dispatch service; emergency calls go directly to US emergency services. Show USD provider usage, per-channel and per-country (OC-066) charges, configurable warning budgets and capacity and availability limits based on measurements. Budget warnings cannot silently drop an accepted critical page; any hard quota refusal is explicit and routes the approved alternate. No HIPAA or regulated-data claim precedes applicable agreements and validated controls; redacted workflows remain usable.

**Acceptance.**
1. Complete a US installation/dependency checklist, inspect a USD usage report and budget warning during a real paging obligation, hit an explicit capacity/provider quota refusal and observe the alternate/escalation outcome, then follow Lamp/Spool/Uptime links with independent access controls.
2. Verify emergency guidance and advertised availability/regulated claims against the actual release evidence.

### Complete coordination and operating guarantees

#### OC-050 — Incident command, severity and response workflows

*Tier:* Core · *Rules:* D-2, D-4

**Requirement.** Define service-specific severity and impact, urgency rules (OC-057), priority, incident types, templates, commander, scribe and communications roles, response checklists, stakeholder update cadence and additional responder requests, each of which pages its named user or policy under OC-068. Eligible alert workflows can declare or link one incident and mobilize its team; humans can merge related incidents or split unrelated groups with retained aliases and provenance and an explicit explanation. Keep command role attribution separate from authorization. Assign and transfer roles, record decisions and automatically remind for unfilled roles, stalled actions and overdue stakeholder updates without needing an open browser. Resolution closes response obligations explicitly while retaining open remediation work. Storm triage of many incidents uses the OC-060 list, filters and bulk actions (OC-079).

**Acceptance.**
1. Trigger a service template, request backup responders and assign/transfer commander/scribe/communications roles through web/chat.
2. Merge related incidents, split an unrelated alert, miss an update deadline with the browser closed and inspect reminders, aliases and attributed timelines; reject unauthorized role and state mutations.

#### OC-051 — Reviewed Lamp and Statuspage communication

*Tier:* Core · *Rules:* D-1, D-3, D-4 · *Register:* R-12

**Requirement.** An incident communications owner prepares audience-specific internal and customer updates with impact, affected components, next-update time and source evidence, then approves exact copy and visibility before delivery: internal-audience updates go to the OC-061 business-service subscribers by email, push or chat, and customer-audience updates go to Lamp or Atlassian Statuspage. OC-017 source drift, withdrawal and restore holds still invalidate eligibility. Send uses an independent operation identity and retains queued, attempted, externally accepted, published and uncertain outcomes; a source link is not publication authority. Automatic reminders draft due updates and never publish new customer impact outside the human approval policy the company chose. Sync publication links and status into the web and chat timeline; failure and uncertainty remain visible without blind duplicate publication. Lamp owns public pages and subscriptions, while Oncall owns the reviewed response handoff. Lamp and Statuspage publication keeps door rule D-1.

**Acceptance.**
1. Prepare a customer update, change its source before approval and refuse stale delivery; approve current copy and publish through real Lamp and Statuspage APIs.
2. Replay, revoke credentials, withdraw and lose a response at the publication boundary; inspect exact copy, external readback and durable uncertainty with no false published state.
3. Lamp and Statuspage publication proves door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-052 — Complete portable target archive and Base replacements

*Tier:* Core · *Cites:* BASE-DATA-001, BASE-INPUT-002, BASE-INPUT-003, BASE-PUBLIC-002, BASE-DATA-005 · *Rules:* D-2

**Requirement.** Extend the OC-007, OC-015 and OC-016 archives to every new durable product record: teams and services, complete coverage, policies, responder destination definitions and verification history, alert and incident identities, delivery, escalation and call histories, reviews and actions, connector definitions, investigations, plans and grants as inactive history, audit, import provenance and erasure journals. Exclude sessions, passwords, provider keys, device and acknowledgment capabilities and execution credentials as installation-local authority; declare these exclusions as the product's explicit BASE-DATA-001 replacement rather than claiming credential portability. Restore atomically into the documented receiving state with all sends, schedules needing reauthorization, agent actions and publication paused; preserved history cannot satisfy live readiness or replay effects. BASE-INPUT-002 uses literal structured text and no arbitrary supplied HTML; BASE-INPUT-003 treats current JSON imports as bounded structured data with no arbitrary attachment upload (any future recording or upload must add validated scoped custody); BASE-PUBLIC-002 has no public incident embed. Native coordination has no AI dependency, and any optional management connector is explicit and revocable. These replacements preserve security, erasure and operating obligations; they do not claim untested baseline equivalence. Every new durable category keeps door rule D-2.

**Acceptance.**
1. Export a populated target installation via protected HTTP and rer CLI, compare every durable category, restore inactive on a fresh authorized installation, reconfigure local secrets and prove no send/action replay.
2. Supply malformed/over-limit/erased/unknown records and inject storage/concurrency faults; preserve the full prior state.
3. Deny optional AI network access and use native incident coordination, then verify literal input and absence of an undeclared public embed/upload door.

#### OC-053 — Public API, outbound events and reliable automation

*Tier:* Core · *Rules:* D-1, D-2, D-3

**Requirement.** Expose documented versioned APIs for services, schedules, incidents, actions, analytics and integration state, with scoped service-account tokens, cursor pagination, rate limits, explicit errors, idempotent mutations and concurrency control. Publish signed trigger, acknowledgment, reassignment, resolution, role and follow-up events to owner-selected endpoints through a durable outbox with a named owner, due time, bounded retries, terminal and uncertain outcomes and a protected replay action. Endpoint delivery is not human acknowledgment; duplicate receivers can deduplicate by operation ID. Revocation and receiving-end authorization apply at dispatch. Under RL-2, a service-account key grants only its named API permissions and services, cannot create sessions or manage members, and acts only while the administrator who created it remains an active administrator: demotion or removal suspends it from the next request and at dispatch, and its authority never transfers. A machine acknowledgment names an active responder, who becomes the incident's commander and assignee; the timeline and audit record it as the service account's act naming that member, never as that member's own acknowledgment. A token cannot accept human-review follow-ups, and completion it supplies under the evidence policy is an automation claim, not a human attestation. Endpoint approval declares exact recipients and minimal data fields; each event body is frozen at the domain commit and carries no names, summaries, notes, evidence URLs or contacts; only an authenticated receiver receipt records sent, and an unsigned success is uncertain. Recipients are literal globally routable IPv4 HTTPS addresses on port 443, redirects are never followed, and an operation gets at most five attempts. Creating, rotating, revoking and replaying are administrator-only, and each commits with its OC-041 audit entry. When the unfinished-delivery capacity is full, every recipient still gets a durable terminal capacity-not-scheduled event with its original operation identity, owner, due time and frozen payload, committed with the human incident action and its permanent audit fact, so capacity never drops an event or refuses human coordination; a later administrator replay needs a free slot and current origin, endpoint and receiver authority, retains the identity and never repeats the incident action. No automatic pruning occurs, and actual storage failure still rolls back the complete transaction. An installation's lifetime API mutation receipts are bounded without pruning or a rolling window: once full, new machine mutations are refused while authorized identical idempotent retries return their prior receipt, and the limit never applies to human sessions. Client and recipient definitions, operation receipts, frozen payloads and exact delivery history are portable under door rule D-2: tokens and signing custody remain installation-local, restored clients and recipients are inactive, all outbox work is held, and fresh key provisioning, recipient approval and protected replay are required before any side effect; subject erasure severs matching automation labels and authority and fences older archives. API automation and outbound delivery keep door rule D-1. These integration and workflow APIs serve Oncall's response job and do not become a general automation product. The declarative Terraform/OpenTofu provider built on them is OC-062.

**Acceptance.**
1. Create/acknowledge/reassign/resolve via a scoped API client, page through real records, hit limits and conflict stale edits.
2. Observe signed outbound events, revoke a token/endpoint, fail and restart delivery, deduplicate a replay and inspect due/terminal/uncertain outcomes without double-changing incident state.
3. API automation and outbound outbox delivery prove door rule D-1: an audit failure rolls back state and outbox together, export stays safe after subject erasure, and a send interrupted at dispatch keeps an uncertain outcome.
4. Under door rule D-2, a restored installation keeps client and recipient definitions and delivery history, holds outbox work inactive and carries no token or signing custody.

#### OC-054 — Operational readiness and switching acceptance

*Tier:* Core · *Rules:* D-4 · *Register:* R-8

**Requirement.** Publish a release-specific readiness matrix for coordination, native paging, standby, each provider and adapter and each mobile platform. Expose independent health for intake, timers, main and standby authority, configuration freshness, delivery backlog and failed obligations; web health alone cannot assert pager coverage. Run a scheduled end-to-end canary alert with an external watch for missed deadlines and a distinct test recipient; schedule periodic human-confirmed drills as OC-047. Measure sustained and burst intake, escalation delay, provider failover, recovery and archive capacity at the OC-064 reference load and report measured p50, p95, p99 and maximum against each OC-064 bar (a missed bar marks that row unproven and blocks the cutover checklist), and publish actual support and escalation and backup and restore procedures. A buyer can retire the incumbent only after its actual services and responders pass the cutover checklist; no successful localhost test, demo or provider sandbox substitutes for live acceptance.

**Acceptance.**
1. Operate the release at the OC-064 reference load and publish the measured values against its bars; stop each intake/timer/identity/storage/provider path, observe independent missed-deadline alarms and recover from backup.
2. Inspect measured latencies/capacity and unanswered obligations, execute the buyer's real-device cutover checklist and show unsupported/unproven rows accurately.

### Day-one switching depth

#### OC-055 — Drop-in PagerDuty, Opsgenie and Splunk On-Call intake

*Tier:* Core · *Rules:* D-3

**Requirement.** Each Oncall service offers incumbent-compatible endpoints beside the native Events API. **PagerDuty Events API v2:** `POST /v2/enqueue` with `routing_key`, `event_action` (`trigger`, `acknowledge`, `resolve`), `dedup_key`, and `payload` fields `summary`, `source`, `severity` (`critical`/`error`/`warning`/`info`), `timestamp`, `component`, `group`, `class` and `custom_details`, plus `links`. `images` are kept as links and never fetched. Responses use PagerDuty's 202, 400 and 429 shapes and return the `dedup_key`, and Oncall generates one when the source omits it. **PagerDuty Events API v1:** the legacy `service_key`, `event_type` and `incident_key` form that older Alertmanager `pagerduty_configs` receivers still send. **Opsgenie Alert API:** `POST /v2/alerts` with `alias`, `message`, `priority` P1–P5, `tags` and `details`; the alias-identified `close`, `acknowledge` and `notes` actions; and `Authorization: GenieKey` keys. **Splunk On-Call REST:** `message_type` CRITICAL/WARNING/INFO/ACKNOWLEDGMENT/RECOVERY with `entity_id`. Oncall derives the lifecycle generation itself from the source's deduplication key and receipt order, because these payloads carry no generation, and the OC-001 tombstone and reopening rules then apply. A trigger for a key with no open generation opens one, and repeated triggers while it is open deduplicate into it. A resolve or recovery closes the generation that was open when it was received; a resolve with nothing open is retained as a no-effect receipt. A later trigger opens a new generation. A source `acknowledge` stops escalation for that generation, attributed to the integration rather than a human. Severity and priority map to urgency under OC-057; Opsgenie P1–P3 map to high and P4–P5 to low, and an unknown value maps to high. Each endpoint accepts the incumbent integration key imported and activated under OC-038, or a native Oncall key. A key is either scoped to one service, or is an OC-072 routed key that picks one service in its scope for each event; every key is revocable. It shares OC-001/002 identity, routing explanation and minimal receipts, and accepts the OC-059 request bounds.

**Acceptance.**
1. Repoint an unmodified Datadog Webhooks monitor that uses the PagerDuty v2 payload, and an unmodified Alertmanager `pagerduty_configs` receiver, by changing only the URL.
2. Fire, re-fire and resolve each one, and observe one alert generation per source and the escalation stopped by the resolve.
3. Do the same with an Opsgenie Alert API create/close by alias and a Splunk On-Call CRITICAL/RECOVERY pair.
4. Then send a resolve before any trigger, a trigger without a `dedup_key`, a forged or revoked key and a key for another service.
5. Verify incumbent-shaped responses, no cross-service effect and protected-state receipts.
6. Repeat the Alertmanager journey through one OC-072 routed key and observe each team's alert on its own service with its own generation.

#### OC-056 — Alert-only pages, and source recovery that stops paging

*Tier:* Core · *Rules:* D-2

**Requirement.** Each service's response policy states which pages are **alert-only**, the default, and which **declare an incident** automatically, by urgency, severity or orchestration rule (OC-043/050). An alert-only page is a paging obligation on the alert generation. A human can declare an incident from any alert at any time, and declared incidents always need OC-004 summary and evidence to resolve. When every alert linked to a declared incident recovers, paging stops with the same recorded outcome. The incident stays open, marked "all alerts recovered — awaiting resolution", with a reminder to its commander. Source recovery includes a PagerDuty-compatible resolve (OC-055) and an email matched by an OC-070 resolve rule. OC-001's rule that recovery never resolves a declared incident is unchanged. Flapping re-triggers open new generations and follow OC-043 flapping controls. Actual attempt cancellation and recovered-notice delivery are accepted under OC-026 and OC-075; closed-browser timing and reminder firing are accepted under OC-027 and OC-078 (RL-4).

**Acceptance.**
1. Recover an email-triggered page with an OC-070 resolve-rule mail and observe the same stopped-by-recovery outcome.

#### OC-057 — Urgency, support hours and per-urgency notification

*Tier:* Core

**Requirement.** Each service has a versioned urgency rule. The rule is one of: constant high; constant low; by severity, where `critical`/`error` map to high, `warning`/`info` to low, and a missing or unknown severity to high (Oncall's native `critical`/`warning`/`info` map to high/low/low); or by support hours in a named IANA zone, with weekly hours and the OC-024 holiday calendar, and a chosen urgency inside and outside those hours. Support-hours services can raise open low-urgency alerts to high when support hours begin. Urgency can be raised by rule, by a higher-severity re-trigger or by a human. It is lowered only by an attributed human action or by a versioned rule decided at admission, and the reason is recorded. A later lower-severity event never lowers it silently. Responders keep separate high-urgency and low-urgency notification rules (OC-026). Low urgency notifies only the first escalation level's current target and does not escalate, unless the service opts in with its own delays. It stays on the OC-060 triage list until acknowledged or resolved. The routing explanation (OC-002) shows the urgency decision and its rule version. Oncall has no timer until OC-027's durable timers ship. Until then, each open low alert under a support-hours rule says that the raise at support start is not automatic and shows the next support start; it is never claimed as applied. OC-027 and OC-078 carry applying the raise at support start in their own text and acceptance. OC-026 inherits the separate high- and low-urgency notification rules. OC-027 inherits first-level-only low-urgency notification and the opt-in escalation delays. OC-060 inherits keeping low-urgency alerts on the triage list until acknowledged or resolved. OC-026, OC-027 and OC-060 repeat the notification, raise, escalation and triage-list steps before they ship.

**Acceptance.**
1. Send a `warning` to a support-hours service (New York, 09:00–17:00 Monday–Friday) at 03:00 New York time and observe low urgency: only the responder's low-urgency rules fire, with no voice or SMS and no escalation past level one.
2. At 09:00, observe the raise to high and the start of escalation.
3. Send a `warning` at 11:00 and observe high urgency that escalates.
4. Send a missing-severity event to a by-severity service and observe high.
5. Re-trigger with a lower severity and observe no silent lowering.
6. Lower urgency by hand and observe the attributed reason.
7. Replay the policy across a DST change.
8. Until timers ship, observe the open low alert's not-automatic support-start label and its next support start.

#### OC-058 — Snooze and acknowledgment-timeout re-trigger

*Tier:* Core · *Rules:* D-4

**Requirement.** An acknowledged alert or incident can be snoozed for 1 minute to 24 hours from web, mobile app, Slack/Teams command and the API. The snooze is a durable persisted deadline, not a browser timer. When it expires, the item returns to triggered and re-notifies its current assignee, if they are still on call. Otherwise it re-notifies the current on-call at the level it was at. Each service can set an acknowledgment timeout (off, or 1–1,440 minutes). An acknowledgment left unsnoozed and unresolved for that long returns to triggered, and escalation restarts at level one, with targets resolved at firing time. A snooze replaces the pending timeout, and a new acknowledgment starts a new one. Resolution, source recovery (OC-056) and cancellation end both. Snooze start, expiry, timeout and re-trigger appear on the incident timeline with actor, duration, due time and outcome, and they survive restart and standby takeover (OC-028) under the OC-064 lateness bar.

**Acceptance.**
1. Acknowledge, then snooze for 15 minutes from the browser and close it.
2. Observe a re-page at the deadline, within the OC-064 lateness bar, to the current assignee.
3. Repeat after a handoff and observe the page to the new on-call.
4. Let an unsnoozed acknowledgment reach the service timeout, observe re-escalation from level one to the current on-call, and see each step on the timeline.
5. Restart workers at the deadline and observe exactly one re-trigger.
6. Recover the source mid-snooze and observe no re-page.

#### OC-059 — Large and partly readable payloads still page

*Tier:* Core · *Rules:* D-2

**Requirement.** Request bounds follow each provider rather than one global cap. Incumbent-compatible endpoints (OC-055) accept at least 512 KiB, PagerDuty's documented maximum. The Prometheus Alertmanager, Datadog and Grafana adapters (OC-030) and SNS (OC-031) accept at least 2 MiB per request, and they split a grouped notification into one event per alert, subject to that adapter's field bounds. Over-long labels, annotations and details are cut with a visible truncation marker and the original byte count, and the alert itself is never dropped. The native Events API keeps its 64 KiB bound (OC-008). Suppose a request exceeds its endpoint's bound, or cannot be fully parsed, but its URL or key authenticates it to one service or to an OC-072 routed key. Oncall then still does three things. It creates a high-urgency "incomplete intake" alert on that service from whatever fields it could read, with a count of alerts and bytes not read. It pages that service under its policy. It notifies the integration owner. It retains bounded structured evidence: byte total, SHA-256, the readable alert identities and the dropped count. Compatible and monitoring providers retain no raw body. For authenticated oversized or unparseable native input, the first 64 KiB of exact raw bytes are retained as an untrusted prefix, flagged truncated or unparseable; the prefix is never parsed as a structured event. Native incomplete receipts count against the per-key allowances and the 10,000 storage capacity. The 10,000-receipt count is a local limit; it becomes a hosted capacity only under OC-073. Unauthenticated, revoked or wrong-audience requests retain no intake record, and an over-allowance request is refused before custody. It returns 202 with a truncation flag, never a bare 413. For a routed key, readable alerts are routed by its rules, and the incomplete-intake alert goes to the key's catch-all service and pages it; when the catch-all is record unrouted, the alert is held in the key's unrouted queue and pages the key's integration owner as a user-targeted high-urgency page under OC-068. A request that cannot be authenticated to a service is refused and shown to integration owners as a rejection diagnostic. The incomplete-intake alert is high urgency under every service urgency rule (OC-057). While paging stays OFF (OC-012), the page and the owner notice are recorded obligations: the alert carries its owner notice with paging OFF, and the owner notice is an audit record. OC-026 (service paging) and OC-068 (user-targeted owner pages) inherit "the incomplete-intake alert pages the service, or the integration owner for an unrouted key" before paging ships, repeating the page and owner-page steps, and OC-064 inherits reference-load measurement of the 512 KiB and 2 MiB bounds.

**Acceptance.**
1. Send a 300 KiB Alertmanager group of 200 alerts, and observe 200 alert events, a page and no refusal.
2. Send a 600 KiB PagerDuty v2 event and a 3 MiB Alertmanager group.
3. Observe an incomplete-intake alert that pages the service, an integration-owner notice, bounded evidence of what was dropped, and a 202 response with the truncation flag.
4. Send an oversize unauthenticated request, observe a refusal diagnostic and no alert, and confirm no raw body is stored.
5. Send a 3 MiB Alertmanager group to an OC-072 routed key with a record-unrouted catch-all, and observe the readable alerts paging their routed services and the incomplete-intake alert paging the integration owner.
6. Until paging ships, observe the high-urgency alert under a constant-low service rule, its owner notice with paging OFF and the owner audit notice.

#### OC-060 — Incident triage list: search, filters and "mine"

*Tier:* Core

**Requirement.** The alert and incident list offers four kinds of filter. **Search:** full-text search over title, summary, service, deduplication key and notes. **Status and severity:** status (triggered, acknowledged, snoozed, resolved), urgency, priority and severity. **Ownership:** service, team, assignee, "assigned to me" and "my teams". **Time:** created and updated time range. The list sorts by time, urgency or priority. Filters are shareable by URL, users can save them, and the same queries are available on the mobile apps (OC-029) and the API (OC-053), with cursor pagination. Team privacy (OC-023) hides foreign items from every door. Open low-urgency alerts stay on the list until acknowledged or resolved (OC-057). Bulk actions on the list are OC-079.

**Acceptance.**
1. During a 50-incident storm, filter by team, service, urgency and status, and view "assigned to me" on web and mobile.
2. Confirm that a foreign team's incidents are neither listed nor selectable.
3. Leave a low-urgency alert open and observe it listed until it is acknowledged or resolved.

#### OC-079 — Bulk triage actions with per-item results

*Tier:* Core · *From:* OC-060

**Requirement.** Bulk acknowledge, snooze, reassign, set urgency or priority, merge and resolve apply to up to 500 selected items, or to "all matching" up to 1,000 after a confirmed count. Bulk resolve closes alert-only items. For declared incidents it requires one OC-004 summary and evidence, recorded and attributed on each incident. Each item commits independently, with its own authority and revision check. The result reports success or the reason for failure per item, and every item's timeline carries a shared bulk operation ID, so a replay changes nothing twice. Acknowledge all and resolve all from an OC-071 bundled call or SMS reply with OC-082 reply and keypress commits use these same bulk rules.

**Acceptance.**
1. During a 50-incident storm, acknowledge all 50 in one action.
2. Each incident's timeline shows the bulk operation ID.
3. A viewer's bulk attempt is refused for every item.
4. A stale revision on one incident fails visibly while the other 49 commit.
5. Replay the operation and observe no second change.
6. Bulk-resolve declared incidents without a summary and observe refusal.
7. Acknowledge a bundled SMS's items by its acknowledge-all code and observe the same per-item results and shared operation ID.

#### OC-061 — Business services, stakeholder subscriptions and internal status

*Tier:* Core · *Rules:* D-2, D-3

**Requirement.** Model business services, the capabilities customers and the company recognize (for example "Checkout"), on top of the OC-023 technical-service dependencies. A business service is impacted when a supporting service has an open declared incident, or a high-urgency alert where the rule says so. Its internal status (operational, degraded or major outage) is derived from that impact, and the communications owner can set it by hand with a recorded reason. Internal users subscribe themselves to business services or teams, or admins and communications owners subscribe them. Subscribers can be users, teams, Slack/Teams channels and email lists, and each chooses email, push (OC-029) or chat delivery. Approved internal updates (OC-051) and optional templated "impact started/ended" notices reach subscribers of the impacted business services, and raw alert text is never sent. A **stakeholder** role, assignable to SSO/SCIM users (OC-039) and separate from viewer/responder/admin, sees only the internal status view and the approved updates for business services it may see. It is denied incident timelines, alerts, runbooks, responder contacts and chat channels, and it cannot create manual pages or request responders (OC-068). The internal status view is distinct from Lamp's public status pages and never publishes externally.

**Acceptance.**
1. A stakeholder subscribes to "Checkout".
2. An incident on a supporting service turns "Checkout" degraded on the internal status view.
3. The stakeholder is notified only through the approved update, by their chosen channel, and is denied the incident timeline, alerts and runbook over web, mobile, API and export doors.
4. An unsubscribed stakeholder receives nothing.
5. A private team's business service is invisible to stakeholders outside its scope.
6. A manual status override is attributed.

#### OC-062 — Configuration as code with Terraform and OpenTofu

*Tier:* Core · *Rules:* D-3 · *Register:* R-10

**Requirement.** Oncall publishes and maintains a Terraform/OpenTofu provider on the Terraform and OpenTofu registries, built on the OC-053 API. It has resources and data sources for teams and memberships, schedules with layers and restrictions, escalation policies, services, urgency and support-hours rules, integrations (keys are write-only and sensitive in state), OC-072 routed keys with their scope, versioned routing rule sets and catch-all, business services and dependencies, stakeholder subscriptions, maintenance windows, event orchestration rules, library actions (OC-063) and responder notification rules. Destinations still need the responder's own verification under OC-026. `plan` calls a dry-run preview endpoint that returns the same coverage preview as the UI (who gains or loses coverage, OC-024). `apply` refuses if the server's preview no longer matches the plan. Existing objects are adoptable through import blocks. Objects managed by the provider are labeled in the UI and API, and an administrator chooses per workspace whether UI edits on them are blocked or allowed and shown as drift. Either way, the next `plan` reports the drift. A converter takes a module using the official PagerDuty Terraform provider ([PagerDuty/terraform-provider-pagerduty](https://github.com/PagerDuty/terraform-provider-pagerduty): `pagerduty_team`, `pagerduty_team_membership`, `pagerduty_user`, `pagerduty_user_contact_method`, `pagerduty_user_notification_rule`, `pagerduty_schedule`, `pagerduty_escalation_policy`, `pagerduty_service`, `pagerduty_service_integration`, `pagerduty_business_service`, `pagerduty_service_dependency`, `pagerduty_maintenance_window` and `pagerduty_event_orchestration*`, where `pagerduty_event_orchestration`, `pagerduty_event_orchestration_router` and `pagerduty_event_orchestration_unrouted` become OC-072 routed keys, rule sets and catch-alls, and `pagerduty_event_orchestration_global` and `pagerduty_event_orchestration_service` become OC-043 rules) or the Opsgenie provider, and emits Oncall resources and a mapping report. The report names each unconvertible attribute and does not approximate, matching OC-021. Before OC-062 ships, it manages OC-070 email address modes, ordered trigger/resolve rules, key extraction and unmatched-mail fallback as code, with the same preview, stale-plan and secret-free-output checks.

**Acceptance.**
1. Convert a PagerDuty Terraform module with schedules, layers, an escalation policy, services, integrations and a business service, and read its mapping report.
2. `plan` shows the intended diff and the coverage preview, and `apply` produces the same configuration the UI preview showed.
3. Edit a managed object out of band in the UI, and observe drift in the next `plan`, or a refusal if edits are locked.
4. Apply a stale plan and observe refusal.
5. Confirm integration keys never appear in plan output.
6. Convert a module with `pagerduty_event_orchestration_router` and `pagerduty_event_orchestration_unrouted`, and observe a routed key whose plan shows its scope, rule set and catch-all.

#### OC-063 — Curated automation actions and named executors

*Tier:* Core · *Rules:* D-1, D-3

**Requirement.** Admins and team managers curate a library of diagnostic and remediation actions. Each action has a name, description, kind, executor, typed and bounded parameters, target services, allowed teams and roles, an optional second-person approval the company sets for runs by people, a timeout, an output limit and output redaction rules. **Named executors:** (1) a self-hosted runner, an open-source agent on the customer's infrastructure that polls over outbound HTTPS, runs pinned scripts and needs no inbound port; (2) AWS Systems Manager Run Command and Automation documents, through a cross-account role with an external ID; (3) GitHub Actions `workflow_dispatch`, through a GitHub App scoped to named repositories; (4) Kubernetes `rollout restart` and `rollout undo` of named deployments, through the runner with namespace-scoped RBAC; and (5) Rundeck / PagerDuty Runbook Automation job triggers, so existing jobs keep working. Responders run allowed actions from the incident on web, mobile and Slack/Teams. Each run records actor, parameters, executor, start, finish and exit status, and streams bounded, redacted output to the incident timeline. A timeout or a lost runner is recorded as an uncertain outcome and is never retried blindly. Credentials are scoped to each run and never enter archives, logs or AI context (OC-042). Viewers, users outside the allowed teams and items outside the target services are refused. PagerDuty Automation Actions definitions import as inactive library entries with a mapping report (OC-038). Agent plans (OC-048) can use only library actions within their bounds; an agent's run of a library action carries the action's live class, and destructive where it cannot be undone, which the company's policy decides. Library automation and executor actions keep door rule D-1.

**Acceptance.**
1. A responder runs a library diagnostic from Slack, and its bounded output appears in the incident timeline with attribution.
2. A viewer is refused, and so is a responder outside the allowed team.
3. Run a Kubernetes rollout restart through the runner and a GitHub Actions dispatch, then kill the runner mid-run and observe an uncertain outcome with no automatic rerun.
4. An agent plan restricted to one named action cannot run another.
5. Import a PagerDuty Automation Actions export and observe inactive entries with a mapping report.
6. Library automation and executor actions prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-064 — Stated paging timing bars and reference load

*Tier:* Core · *Rules:* D-1 · *Register:* R-6

**Requirement.** Paging is measured against fixed bars at a named US reference load. **Reference load:** 500 responders, 100 teams, 1,500 services and 3,000 integration keys; a sustained 600 accepted events per minute for one hour; a burst of 12,000 events within 60 seconds, carrying 1,000 distinct alert generations; and 1,000 open paging obligations, with 200 escalation deadlines due in the same minute. **Pass bars at the burst:** (1) intake receipt returned at p99 ≤ 2 seconds, with no accepted event lost; (2) intake to first provider attempt for a high-urgency, zero-delay rule at p95 ≤ 10 seconds and p99 ≤ 30 seconds; (3) deadline lateness (actual first attempt minus persisted due time, for escalation, repeat, snooze and timeout deadlines) at p95 ≤ 15 seconds, p99 ≤ 30 seconds and maximum ≤ 60 seconds, never early; (4) no notification attempt started more than 5 seconds after an acknowledgment or recovery commits; (5) provider acceptance at p95 ≤ 5 seconds after each attempt for every channel and, for SMS and voice, in every OC-066 country, measured and reported per country; and (6) standby authority within 120 seconds of main-site loss, and a first attempt for every due obligation within 60 seconds of takeover (OC-028). The OC-071 bundling window counts inside bars (2) and (3), so bundling never delays a first attempt beyond them. Escalation delays run from 1 to 1,440 minutes (OC-027). Carrier and device delivery after provider acceptance is measured and published, never promised. Measured takeover values come only from the OC-028 drills. A release that misses a bar publishes the miss in the OC-054 matrix and cannot pass the cutover checklist. A manual page's phone notification is measured against bar (2) (received from OC-068 under RL-5). Provider attempts and timing outcomes keep door rule D-1.

**Acceptance.**
1. Drive the reference load through the public intake doors, with provider fakes only at the paid network edge for timing and a real-phone sample for end-to-end receipt.
2. Measure p50, p95, p99 and maximum for intake receipt, intake to first attempt, deadline lateness, stop-after-acknowledgment and provider acceptance (per channel, and per OC-066 country for SMS and voice), and compare each with its bar.
3. Confirm that no deadline fires early and that a 5-minute escalation fires between 5:00 and 5:30 at p99, with OC-071 bundling on throughout the burst.
4. Publish the measured values in the OC-054 readiness matrix.
5. The engineer is phoned within the OC-064 intake-to-first-attempt bar, and the notification names the creator.
6. Provider attempts and timing outcomes prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-065 — Change events and recent changes for responders

*Tier:* Core · *Rules:* D-2, D-3 · *Register:* R-12

**Requirement.** Oncall accepts change events that never page, through the PagerDuty Change Events API (`POST /v2/change/enqueue` with `routing_key`, `summary`, `timestamp`, `source`, `custom_details` and `links`), a native change API, GitHub deployment, release and merged-pull-request webhooks, GitLab deployment webhooks, and generic signed webhooks from Argo CD, Terraform Cloud and CI jobs. Each change attaches to its service. A **recent changes** panel on every service, alert and incident, on web and mobile and in the Slack/Teams incident summary, lists the changes for that service and its direct dependencies within a lookback window. The window defaults to 24 hours before the trigger and can be set from 1 to 168 hours. Each entry shows time, author, source link and whether the change belongs to a dependency. Humans see it without any agent. OC-045 reads the same records. Change records follow team privacy (OC-023), retention and erasure (OC-040) and archives (OC-052). Their links grant no access.

**Acceptance.**
1. Send a change through the PagerDuty-compatible change endpoint and a GitHub deployment webhook, one for the alerting service and one decoy for an unrelated service, plus one for a dependency.
2. Trigger the alert and observe that no page is caused by any change event.
3. The recent-changes panel lists the service's and the dependency's changes, labeled, and omits the unrelated decoy.
4. A user without access to the service sees none of them.
5. Replay a change event and observe one record.

#### OC-066 — International SMS and voice paging for follow-the-sun responders

*Tier:* Core · *Rules:* D-3 · *Register:* R-6

**Requirement.** OC-026 SMS and voice paging reaches responders outside the US through a published, maintained country list; email and push already work worldwide. A country is listed only when two independent providers (Twilio and a second provider such as Telnyx, Vonage or Sinch) have each passed a live SMS send, an SMS reply where the row offers one, and a voice call with DTMF acknowledgment to a real handset in that country. The list's row for each country names the sender used for paging (local two-way long code, toll-free, short code or registered alphanumeric sender), the sender registration it needs, whether SMS replies (the OC-082 per-message reply codes, plus the one-use link) work, the caller ID shown, the country's consent and opt-out keywords, and the per-message and per-minute USD rates (OC-044). Where a row says SMS replies do not work, the row also names its stated reason, and the SMS carries a one-use acknowledgment link while the voice call's DTMF acknowledgment and push remain the reply routes; no country row is left without a way to acknowledge from the page itself. Destinations are stored in E.164. Verification checks the number's country against the list before sending the code: a number in an unlisted country, or in a listed country whose sender registration is incomplete, is refused for SMS and voice at verification with the warning "does not meet two-route coverage", and the responder's coverage shows degraded under OC-024 until two independent routes verify. That refusal never waits for a page to fail. Each country's sender numbers are published as a downloadable contact card so responders can allow them through Do Not Disturb. A country is removed from the list only with an advance notice to administrators naming every affected responder, never silently. Every shift in the effective coverage view and the change preview shows its responder's verified high-urgency route count under OC-026 and OC-066, and a shift whose responder lacks two independent routes in their country is flagged as degraded coverage before it starts, never discovered when a page fails (received from OC-024 under RL-3). Delivery across the listed countries is OC-080. The first release lists the following, each with SMS and voice paging:

| Country | Paging sender and registration | SMS replies |
|---|---|---|
| United States | A2P 10DLC long code with registered brand and campaign, plus verified toll-free (OC-026) | yes |
| Canada | verified toll-free number or Canadian short code, with English and French opt-out keywords | yes |
| United Kingdom | UK mobile long code (+44 7); an alphanumeric sender is never used for paging because it cannot take replies | yes |
| Each EU/EEA member state | one row per state: a local two-way long code where both providers offer one, otherwise the state's registered alphanumeric or short-code sender | per state row |
| India | DLT registration under TRAI rules: registered entity, header and content templates | yes, where both providers offer a two-way route; otherwise the row says no |
| Australia | Australian mobile long code (+61 4); any alphanumeric sender registered in the ACMA SMS Sender ID Register | yes |
| Mexico | Mexican long code through both providers | yes |

**Acceptance.**
1. Enroll and verify a UK and a Canadian mobile number.
2. Verify a number in a row without SMS replies and acknowledge from its link and by DTMF.
3. Enroll a number from an unlisted country and observe refusal at verification with the "does not meet two-route coverage" warning and a degraded shift in the coverage preview.
4. Every shift in the coverage view and the change preview shows its responder's verified high-urgency route count, and a shift whose responder lacks two independent routes in their country is flagged as degraded before it starts.

#### OC-080 — International delivery, failover and per-country measurement

*Tier:* Core · *From:* OC-066 · *Rules:* D-1, D-3 · *Register:* R-6

**Requirement.** Responders in every listed country are paged by voice and SMS through two independent providers. Delivery outcomes, OC-064 provider-acceptance timing and carrier delivery where observable are measured and reported per country, and per-country USD charges appear in the usage report (OC-044). International provider attempts keep door rule D-1.

**Acceptance.**
1. During a New York-to-London handoff, trigger a high-urgency alert: the London responder receives the voice call and the SMS, acknowledges by SMS reply, and the timeline records each attempt with its provider and country.
2. Disable the first provider for the UK and observe the second provider reach the same handset.
3. Compare the per-country provider-acceptance times with the OC-064 bar and the per-country USD charges with the usage report.
4. Trigger three pages to the London responder together and acknowledge all of them from one bundled SMS reply code (OC-071 bundle, OC-082 reply code).
5. International provider attempts prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-067 — Service alert channels and interactive alert messages

*Tier:* Core · *Rules:* D-1, D-3 · *Register:* R-12

**Requirement.** An administrator or team manager connects each service or team to one or more Slack channels or Microsoft Teams channels through the OC-034 apps. Each connection has a filter by urgency, priority, alert-only or declared, and event type (triggered, acknowledged, snoozed, escalated, reassigned, resolved, recovered). Every alert-only page and declared incident that passes the filter posts one message per alert generation or incident, showing service, urgency, summary, assignee, escalation level, the OC-065 recent-change count and a link. The message has **Acknowledge**, **Resolve**, **Snooze** (OC-058 durations) and **Reassign** (user or escalation policy) buttons, plus **Declare incident** on an alert-only page. The posted message updates in place on every state change from any surface, and each state change is also recorded in its thread. Each button press is verified with the Slack signing secret or the Teams token. It uses the OC-034 chat-identity mapping and server authority checked at press time, and is idempotent across chat retries. A refused press, for example from a viewer or an unmapped user, gets an explanation visible only to that user and changes nothing. Resolving a declared incident opens a form that requires the OC-004 summary and evidence. Posting is never on the paging path: a failed post, revoked token, archived channel or chat rate limit becomes a visible obligation for the integration owner, retried in order with bounded backoff, and never delays or blocks a page. Slack/Teams channel subscribers and chat delivery (OC-061) and Slack/Teams recent-change summaries (OC-065) are received under RL-3 and RL-5. The chat commands are OC-081. Chat commands and channel publication keep door rule D-1.

**Acceptance.**
1. Connect #payments-alerts to the Payments service with a high-urgency-only filter.
2. Trigger a low-urgency and a high-urgency alert-only page, and observe that only the high-urgency one is posted.
3. Acknowledge it from the button and see the message and the web state update, then snooze and reassign it from the buttons and see each change in place and in the thread.
4. See a viewer's button press refused with no state change, and replay a signed button payload with one state change.
5. Archive the channel and observe a visible posting failure while the page still reaches the responder's phone.
6. Chat commands and channel publication prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-081 — Chat on-call lookup, page and mine commands

*Tier:* Core · *From:* OC-067 · *Rules:* D-1 · *Register:* R-12

**Requirement.** The **on-call lookup** command (`/oncall who` in Slack, with the same action in Teams) takes a service, team or schedule and returns, from the OC-020 resolution, the current and next responder at each escalation level with handoff times in the asker's zone, including overrides and gaps. With no argument, it answers for the asker's teams. Results follow OC-023 team privacy. The **page** command (`/oncall page`) opens the OC-068 manual page form, and `/oncall mine` lists the asker's open assigned items. Manual pages and responder requests from Slack/Teams are received from OC-068 under RL-5. Chat commands keep door rule D-1.

**Acceptance.**
1. Run the on-call command across a handoff and compare its answer with now/next.
2. Page the service from Slack and observe the escalation start.
3. Request a second responder from Slack, observe a separate page and acknowledgment, and decline a third request and see the requester notified.
4. Chat commands prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-068 — Manual pages, responder requests and paging a person directly

*Tier:* Core · *Rules:* D-2, D-4

**Requirement.** Anyone with the create-page permission can page from web, mobile app (OC-029), Slack/Teams (OC-081) and the API (OC-053). A manual page names a service, a title and an urgency, which defaults to the service's OC-057 rule outcome, or to high where that rule needs a severity. It can add a description and priority. It can also set a target: one or more named users, or one escalation policy, which overrides the service's escalation policy for this incident. A manual page is a declared incident (OC-004) with its creator recorded, and the notification says who paged. Creating it starts the OC-027 obligation in the same commit. That obligation has the same OC-064 timing bars, stop conditions (except source recovery, since there is no source), audit and standby continuity (OC-028) as an alert-born page. A user-targeted page follows the service's **user-assignment rule**: either repeat to that user under the OC-027 repeat setting, or escalate to a chosen escalation policy from level one after 1–1,440 minutes unacknowledged. The default is the service's own policy after 10 minutes. The rule in force is shown on the page and recorded with its outcome. **Request responders** on an open incident names users or policies with a message. Each target becomes its own obligation with its own notifications, accept or decline, and acknowledgment recorded separately on the timeline; a decline notifies the requester. Accepting a request adds the responder to the incident without acknowledging its primary obligation, and acknowledging the incident does not cancel pending requests. Resolution or the requester's cancellation ends them. The create-page and request-responders permissions are set per role and team. By default, responders and admins can page services in their teams, and a workspace setting lets a named team, such as Support, page any service. Viewers and stakeholders (OC-061) cannot do either, and API service accounts need an explicit incident-write scope. A refused attempt creates nothing and says why. A client operation ID or API idempotency key makes a double submit create one page.

**Acceptance.**
1. A responder on the Support team creates a high-urgency incident on "Payments" from the web, assigned to a named engineer, with no alert.
2. The engineer is phoned within the OC-064 intake-to-first-attempt bar, and the notification names the creator.
3. Not acknowledging escalates per that user-assignment rule, and the outcome is recorded.
4. Create a policy-targeted page from the mobile app and through the API with a repeated idempotency key, and observe one incident paging that policy instead of the service's.
5. Request a second responder from Slack, observe a separate page and acknowledgment, and decline a third request and see the requester notified.
6. See a stakeholder's and a viewer's attempts refused with nothing created.

#### OC-069 — Google Workspace, generic SAML and OIDC sign-in, and just-in-time accounts

*Tier:* Core · *Cites:* BASE-SIGNIN-001 · *Rules:* D-3 · *Register:* R-9

**Requirement.** Single sign-on is included for every paying workspace, not only an enterprise tier. **Google Workspace:** "Sign in with Google" through OpenID Connect, restricted to the workspace's verified Google domains by checking the ID token's verified `hd` and `email_verified` claims on the server, and Google Workspace as a SAML identity provider through a custom SAML app. **Generic SAML 2.0:** sign-in started from the identity provider's app tile and from the Oncall login page, metadata import by URL or XML, required signed responses or assertions, and validated audience, recipient, time window and in-response-to. A replayed assertion ID is refused. Two signing certificates can be active during rotation. Email or persistent NameID is accepted, with name, email and group attribute mapping. **Generic OIDC:** authorization code with PKCE, issuer discovery, and validated issuer, audience, nonce and signature. Each identity-provider connection is scoped to verified email domains. Setup guides are published for Google Workspace, Okta, Microsoft Entra ID, JumpCloud and OneLogin. **Just-in-time accounts:** optional per connection, with a chosen default role of viewer, responder or stakeholder, never admin. Optional group-to-team and group-to-role mapping is shown to admins before it applies. A just-in-time account has no team coverage, schedule slot or paging destination until the person verifies their destinations under OC-026/OC-066, and new just-in-time accounts appear on an administrator review list. A subject erased under OC-040 is not recreated without an administrator's explicit action. **Required SSO:** an administrator can require SSO for the workspace, which the administrator can enable only while signed in through SSO. Password and email-link sign-in are then refused for everyone except the documented emergency administrators (OC-039). Their use is audited and notifies the other administrators. Mobile apps (OC-029) and chat identity linking (OC-034) sign in through the same connections. SCIM deprovisioning remains OC-039, and a user removed at the identity provider cannot sign in again.

**Acceptance.**
1. Sign in through Google Workspace and through a generic SAML provider (for example JumpCloud), from both the identity provider and the Oncall login page.
2. See a first-time user created just in time with the default role and no paging coverage until they verify a destination.
3. A user from another Google domain is refused, and so are a replayed SAML assertion and an unsigned one.
4. Require SSO and observe that a password login is refused for everyone except the emergency administrator, whose sign-in is audited and notifies the other administrators.
5. Sign in to the mobile app through the same Google connection.

#### OC-070 — Email integration modes, trigger and resolve rules

*Tier:* Core · *Rules:* D-2 · *Register:* R-2

**Requirement.** Each OC-033 integration email address has one versioned **email mode**, chosen per address. **(1) Subject deduplication**, the default: an email whose normalized subject (trimmed, whitespace collapsed, leading `Re:`, `Fwd:` and `FW:` markers removed) matches an open alert generation on that address deduplicates into it as a timeline entry and starts no new page. **(2) One open alert at a time:** every email while a generation is open on that address appends to it, and the first email after it closes opens a new one. **(3) A new alert for each email**, each with its own generation. **(4) Custom rules:** an ordered list of up to 20 rules per address, so every imported PagerDuty set of up to ten fits. Each rule is a trigger rule or a resolve rule. Its conditions apply to the authenticated sender address, the subject and the extracted text body, each with contains, equals, matches regex or does not match regex, combined by all or any. Each rule states how its dedup key is extracted: the text between two literal markers, or a regex capture group, from the subject or the body. A trigger rule that extracts nothing uses the normalized subject as its key; a resolve rule that extracts nothing takes no effect and says so on its receipt. A trigger rule can set severity or urgency (OC-057) and priority. Regexes run on a linear-time engine with RE2 semantics, a bounded pattern length and at most the first 256 KiB of text, so no rule can stall intake. The first matching rule decides. Any mode can also carry resolve rules, and under modes 1–3 an email never resolves anything except through a resolve rule. Email maps onto the OC-055 derived-generation rules exactly: a trigger for a key with no open generation opens one, a trigger while it is open deduplicates into it, a resolve closes the generation open for the same key compared byte for byte, and a resolve with nothing open is retained as a no-effect receipt. A resolve is source recovery: paging stops under OC-056 with the outcome "stopped by source recovery" and the email's receipt, and a declared incident follows OC-056's declared-incident rule. Keys are scoped to the address's service, so the same key on two services never merges. An email that matches no rule follows the address's stated **fallback**: trigger an alert keyed by its normalized subject (the default), or quarantine it for the integration owner with the reason. An unmatched email is never silently dropped and appears in the address's activity with its outcome. Each email's receipt and its OC-002 routing explanation name the mode, the matched rule's ID and version, the extracted key and the action taken. An owner can test a draft rule set against saved emails before saving it, as an OC-002 replay with zero writes. OC-038 imports PagerDuty email integration settings (the incident-creation mode, custom trigger and resolve rules with their conditions, alert-key extraction and the unmatched-email behavior) and Opsgenie email integration filters and alert actions into this model, and names each rule it cannot convert, with its original kept for review. OC-062 manages the same modes and rules as code. A real-provider email run is field proof R-2.

**Acceptance.**
1. On an address in subject-deduplication mode, send the same failure subject three times and observe one alert generation with three timeline entries and one page.
2. With a custom trigger rule (subject matches `FAILED: (\S+)`) and a resolve rule (subject matches `OK: (\S+)`) that share the extracted key, send `FAILED: nightly-db`, then `FAILED: nightly-web`, then `OK: nightly-db`: observe two generations and two pages, then observe that the OK mail stops `nightly-db` paging with a stopped-by-source-recovery outcome while `nightly-web` keeps escalating.
3. Send an OK mail with no open generation and observe a no-effect receipt.
4. Send an unmatched mail under each fallback and observe a triggered alert, then a quarantined item shown to the integration owner.
5. Send a mail whose subject drives a pathological regex and observe intake unaffected.
6. Send the same key to a second service's address and observe no merge.
7. Test a draft rule against saved mail and observe the would-be actions with zero writes.
8. Import a PagerDuty service with custom email rules and an Opsgenie email integration with filters, and read the mapping report, which names each rule it could not convert.

#### OC-071 — Notification bundling per responder and channel

*Tier:* Core · *Rules:* D-4 · *Register:* R-6

**Requirement.** Personal notifications are composed per responder and channel, not per obligation. **Bundling:** when an attempt falls due for a responder on a channel, Oncall waits at most 5 seconds (the bundling window) and sends one notification carrying every attempt due to that responder on that channel in that window. The window counts inside the OC-064 intake-to-first-attempt and deadline-lateness bars and never adds to them. SMS, push and email for new items are never held behind a voice call in progress; a further voice call starts when the current call ends, within the OC-064 lateness bar of its items' due times. High-urgency and low-urgency items never share a notification, and each follows its own OC-026 rule set. **Content:** a bundled notification states the count and lists the items, highest urgency then oldest first, each with service, urgency and summary: up to 5 items read aloud on a voice call, as many as fit in 3 SMS segments followed by "+N more", up to 10 in a push and all of them in email. OC-029 lock-screen minimum-information settings apply. A bundled SMS also carries a one-use link to the OC-060 list filtered to exactly its items, and a bundled push opens the filtered OC-060 list in the app (OC-029). Bundling and reply codes apply in every OC-066 country; in a row without SMS replies, the bundled SMS carries the one-use link, and DTMF and push remain the reply routes. Per-message reply codes, voice keys and commits are OC-082.

**Acceptance.**
1. On a real US handset, trigger 30 high-urgency pages to one responder within 60 seconds, and observe one bundled call and one bundled SMS, not 30 of each, within the OC-064 first-attempt bar, with the count and top items.
2. Trigger a low-urgency and a high-urgency page together and observe that the low-urgency item is not in the high-urgency call.
3. Repeat the bundled SMS and its reply codes on the UK number under OC-066.

#### OC-082 — Per-message reply codes, voice keys and bundle commits

*Tier:* Core · *From:* OC-071 · *Rules:* D-4 · *Register:* R-6

**Requirement.** **Voice keys:** a single-item call offers 4 acknowledge, 6 resolve and 8 escalate. A bundled call offers 4 acknowledge all, 6 resolve all and 1 hear each item, which then offers 4, 6 and 8 for that item and 9 for the next item. **SMS reply codes:** every SMS carries a reference from 1 to 99 that is unique among the responder's unexpired messages and is bound on the server to the exact items in that message. A reply of the reference followed by 4, 6 or 8 acknowledges, resolves or escalates those items; in a bundle, 4 and 6 act on all of them. A plain `ack` or `resolve` acts only when exactly one unexpired message to that responder holds open items; otherwise it is answered with the valid codes and changes nothing. A reply acts only on the items bound to its message, never on whatever else is open. A reference expires after 24 hours or once all its items are terminal. A reply to an expired or unknown reference, or for items already acknowledged, resolved or reassigned away from the responder, is answered with what happened to each item and changes nothing. A reply is accepted only from the responder's verified destination through the provider's signed callback, under the responder's authority checked at reply time; a replayed callback makes one change. **Commit:** each item keeps its own obligation, attempts, provider receipts and outcome on its own timeline, and every item in a bundle carries the bundle's notification ID. Acknowledge all and resolve all commit each item independently under the OC-060 bulk rules (OC-079), with per-item authority and revision checks and one shared operation ID. The reply or voice prompt reports how many items changed and names each refused one. Resolve all closes alert-only items; a declared incident in the bundle is acknowledged and named as needing its OC-004 summary. Escalate (8) moves only the named item to its next level under OC-027, recorded as a manual escalation by that responder. Bundled-call and SMS acknowledge-all and resolve-all are received from OC-060 under RL-5.

**Acceptance.**
1. Press 4 for acknowledge all and observe all 30 acknowledged, each timeline carrying the shared operation ID; acknowledging a bundled SMS's items by its acknowledge-all code gives the same per-item results and shared operation ID.
2. Trigger two separate pages minutes apart and reply with the first SMS's acknowledge code: only the first page is acknowledged and the second keeps escalating.
3. Reply a plain `ack` while both are open and observe the code list and no change.
4. Reply to an already-acknowledged message and observe an explanatory answer and no state change.
5. Escalate one item by reply and observe its next level paged.
6. Resolve all on a bundle with one declared incident and observe it acknowledged and named as needing a summary.
7. Reassign one bundled item to someone else, then acknowledge all, and observe that item named as refused.
8. Replay a signed reply callback and observe one change.

#### OC-072 — Routed intake keys that pick the service per event

*Tier:* Core · *Rules:* D-3

**Requirement.** Beside the service-scoped key, Oncall offers a **routed integration key**, created at workspace level or team level. Each routed key has an **allowed scope**: the explicit set of services it may route to. A team-level key's scope can hold only that team's services. A routed key is accepted wherever a service key is: on every OC-055 endpoint (PagerDuty Events v2 `routing_key` and v1 `service_key`, Opsgenie Alert API `GenieKey`, and Splunk On-Call REST, whose URL routing key becomes a matchable field), on the OC-030/031 adapters, on OC-033 webhooks and on the native Events API. Authentication, revocation, rotation, rate limits and minimal receipts are the same as for a service key, and so are the incumbent-shaped responses. Per-key intake allowances follow OC-084. **Routing rules:** each routed key has one versioned, ordered rule set of up to 100 rules, and the first matching rule picks exactly one service. A condition is equals, contains, exists, or a regex match or non-match on the linear-time engine of OC-070, and conditions combine with all or any. Conditions read the transformed event (summary, source, severity, component, group, class, urgency) and the raw payload by path. The paths include PagerDuty `payload.source`, `payload.component`, `payload.group`, `payload.class` and `payload.custom_details.*`; Alertmanager `labels.*`, `annotations.*`, `commonLabels.*` and `groupLabels.*`; Datadog `tags` as key:value pairs; Opsgenie `responders`, `teams`, `tags`, `details.*`, `entity` and `source`; and the Splunk On-Call routing key, `entity_id` and custom fields. **Dynamic routing:** a rule can take a service name or ID from a chosen field, optionally through a regex capture group. The value resolves only within the key's allowed scope. A value that names an unknown service, or one outside the scope, never routes there: the event goes to the catch-all, with the diagnostic "dynamic route target outside key scope" naming the field and value. A rule that names a fixed service outside the scope is refused when it is saved. **Catch-all:** every routed key states its catch-all, and an event is never silently dropped. The catch-all is either (a) **record unrouted**, the default as in PagerDuty: the event is retained as a suppressed, unrouted alert that never pages, shown in the integration owner's unrouted queue with the rules evaluated and counted on the key's health; or (b) **route to a named service** in the scope. A catch-all change applies to later events only. An integration owner can re-admit a retained unrouted event to a chosen in-scope service as a new, attributed admission that keeps the original receipt. **Explanation and replay:** every receipt and every OC-002 explanation names the routed key, the rule-set version, the matched rule ID (or "catch-all", or "dynamic" with its field and value) and the chosen service. A draft rule set replays against retained events chosen by time range or ID (up to 10,000 events). Replay returns each event's ordered decision, a diff against the published version, and a warning for every open generation whose later resolve would route to a different service. It makes zero writes. Publishing a version is attributed and audited, and it is refused when the draft's base version is stale. **Management:** routed keys and rule sets are managed in the UI, the OC-053 API and Terraform (OC-062). Creating or editing a workspace key needs integration-admin authority on every service in its scope, and a team key needs team-admin authority. Per-service generations, the OC-059 bounds and imported routed keys are OC-083.

**Acceptance.**
1. Import a PagerDuty account whose Alertmanager sends to one Event Orchestration integration key with three routing rules (`team=payments`, `team=search`, and dynamic routing on `custom_details.service`) and a catch-all, activate the key and repoint the unmodified Alertmanager `pagerduty_configs` receiver by changing only its URL.
2. Fire one alert per rule and one with an unmatched label, and observe each alert paging its own service's policy, and the unmatched alert recorded as unrouted, not paged and shown to the integration owner.
3. Switch the catch-all to a named service, fire the unmatched label again, and observe it routed there.
4. Confirm that every receipt and OC-002 explanation names the rule ID and its version.
5. Dynamic-route to a service outside the key's scope and observe the event at the catch-all with the out-of-scope diagnostic.
6. Replay a changed rule set and observe ordered decisions, the open-generation warning and zero writes; then publish from a stale base version and observe refusal.

#### OC-083 — Routed keys keep per-service generations, bounds and imports

*Tier:* Core · *From:* OC-072 · *Rules:* D-3

**Requirement.** **Per-service identity:** a routed key selects exactly one service in its allowed scope for each event, and the service is chosen first. OC-001 identity, the OC-055 derived generation, OC-043 service orchestration and OC-057 urgency then apply within that service. The same `dedup_key`, alias or `entity_id` routed to two services opens two separate generations that never merge. Acknowledge, resolve and close events pass through the same rule set and act only on the generation open for that key on the service they route to. If they route to a service with no open generation for that key, the result is a no-effect receipt naming the routed service, and the integration owner sees a "resolve matched no open generation" diagnostic that lists the services where that key is open. **Bounds:** the OC-059 request bounds apply to routed keys. When an over-limit or partly unreadable request authenticates only to a routed key, each readable alert is routed by the rules. The incomplete-intake alert for the unread remainder goes to the catch-all service and pages it under that service's policy. When the catch-all is record unrouted, the alert is held in the unrouted queue and pages the key's integration owner as a user-targeted high-urgency page under OC-068. The response is 202 with the truncation flag. **Migration:** OC-038 imports PagerDuty global integration and Event Orchestration router keys with their routing rules, dynamic routing rules and catch-all; Opsgenie API integrations that route by `responders`, `teams` or alert policies; and Splunk On-Call REST endpoints whose routing keys address several teams. The move report names each unconvertible condition with its original kept, and each imported key stays inactive until activated.

**Acceptance.**
1. Send the same `dedup_key` routed to two services and observe two generations and no merge.
2. Resolve one and observe only that service's paging stop.
3. Send a 3 MiB Alertmanager group to the routed key with a record-unrouted catch-all: routed alerts page their services, and the incomplete-intake alert pages the integration owner.
4. Repeat with an imported Opsgenie API integration routing by `responders`, and with a Splunk On-Call REST endpoint routing by routing key, and read each move report.

#### OC-084 — Per-key rolling intake allowances

*Tier:* Core · *From:* OC-072 · *Rules:* D-3

**Requirement.** Every service key and routed key has separate request and new-event allowances over a rolling one-minute window, owned by its record rather than its secret. Rotation neither resets nor doubles usage; revocation ends admission. Every authenticated request counts, including duplicates and rejected payloads. A new receipt counts once; a repeat or an alert grouped into an existing group counts zero. An owner or admin may set each key's allowances within a documented ceiling. Exceeding either allowance returns 429, tells the sender and notifies the owner once per window with the key name and count; temporary throttles carry Retry-After from the actual window's expiry, never a reset timer. Email keeps its separate per-address new-receipt allowance. Refusal precedes grouping and changes no grouped-alert custody. Under RL-6, an atomic batch exceeding the configured new-event allowance is refused whole with a machine-readable batch_exceeds_allowance code, count, allowance and split-or-raise instruction, without Retry-After because it cannot fit unchanged; the owner still gets one notice per window. Receipt capacity remains a separate storage bound, local until OC-073 establishes hosted capacity.

**Acceptance.** Through service-key and routed-key intake:
1. Exhaust one key's new-event allowance and observe its 429 while another key still admits events; a repeat or a further grouped alert consumes no new-event slot.
2. Count duplicate and rejected authenticated requests towards the request allowance and observe 429 when it is exhausted.
3. Rotate a throttled key and observe unchanged usage and refusal; revoke it and observe no further admission.
4. Set per-key allowances as owner or admin within the documented ceiling and observe them applied.
5. Read a temporary throttle's Retry-After, retry before and at the actual window's expiry and observe refusal then recovery, with one owner notice naming the key and count per window.
6. Exhaust email's separate per-address new-receipt allowance and observe refusal before grouping, with grouped custody unchanged.
7. Submit an atomic batch larger than the configured new-event allowance and observe whole-batch 429, its code, count, allowance and split-or-raise instruction, no Retry-After, unchanged grouped custody and one owner notice per window.
8. Reach receipt capacity with rate allowance remaining and observe the separate storage refusal, without treating the local capacity as a hosted claim.

#### OC-073 — Intake stays inside the Workers memory limit at stated receipt capacity

*Tier:* Core · *Register:* R-13

**Requirement.** Events, alerts, receipts and audit are loaded in pages or lazily, so request time and memory do not grow with the number of held receipts. The stated receipt capacity is a hosted claim only after a hosted run stays inside the Cloudflare Workers 128 MB memory limit; until then the count is a local limit (RL-6). The 413 limits on the JSON archive and checkpoint and the streaming portable export and import stand.

**Acceptance.**
1. Hold the stated receipt capacity with its events, alerts and audit, then use native, compatible and monitoring intake and the incident, alert and audit views, and observe that request time and memory do not grow with held receipts and stay inside 128 MB, first locally and then on a hosted Worker before the capacity is stated as hosted.

### Agent surface (Base-delivered)

#### BASE-AGENT-001 — One MCP door per seed

*Tier:* Agent surface

**Requirement.** Every seed, hosted or self-hosted, serves one remote MCP endpoint at `/mcp` over Streamable HTTP. It speaks the current revision (2026-07-28) and accepts 2025-11-25 clients through the twelve-month deprecation window. It implements `server / discover` and the capabilities the seed declares in its agent-surface manifest: tools, policy, pause, audit and idempotency. A request for a capability the seed has not declared is refused with `capability_not_declared`. Resources, events and prompts are obligations a seed declares through its own Agent surface clause (here SURFACE-001), not a blanket Base requirement. Lists are deterministic and carry `ttlMs` and `cacheScope: "private"`. Roots, Sampling and Logging are not served.

**Acceptance.**
1. `server / discover` returns the supported versions, capabilities, `serverInfo` and instructions.
2. A 2026-07-28 request works with no handshake, and a 2025-11-25 client completes `initialize` and lists the same tools.
3. An unsupported version returns `UnsupportedProtocolVersion`.
4. Two `tools / list` calls return the same order, with cache fields.
5. A foreign Origin returns 403, and a header and body method mismatch returns `HeaderMismatch`.
6. An oversized body returns 413 with no effect.
7. A request for a capability the seed has not declared returns `capability_not_declared` with no effect.

#### BASE-AGENT-002 — The seed's jobs are tools, through the UI's own actions

*Tier:* Agent surface

**Requirement.** Each Core job a person does in the product is a tool. Where one is not, the Agent surface says why: it runs on a device, it is a person's interactive screen, it belongs to a connector or the import door, or it is an installation fact. Risk is never the reason: a risky job is a tool with its class (BASE-AGENT-006). Tools are named `<seed>.<area>.<verb>` and declare input and output schemas and truthful annotations. Each calls the same server action as the UI, so validation and authorization are written once, and the seed's embedded agents use the same registry. A business refusal returns `isError` with the seed's stable error code.

**Acceptance.**
1. The Core clause ids in each tool's `_meta`, with the not-a-tool reasons that `server / discover` serves, cover every Core clause in the contract, and no reason is risk; the harness and `rer check` fail on a gap.
2. Each tool's fixture result validates against its `outputSchema`.
3. Read tools declare `readOnlyHint`; tools that can carry destructive declare `destructiveHint`, and tools that can carry external declare `openWorldHint`.
4. A refusal returns the same error code the UI gets for the same action.
5. The UI action and its tool, on the same fixture, give the same record state and the same audit event type.
6. The seed's embedded agents appear in the audit as calls to the same tools.

#### BASE-AGENT-003 — Records are resources

*Tier:* Agent surface

**Requirement.** Each primary record type has a URI template, and tools return `resource_link`s to the records they touch. A read returns exactly the fields the caller's role sees in the UI. File bytes count against any byte budget on the grant. A record the caller cannot open reads as not found, identical to a missing id. Text from customers, imports or files carries an untrusted marker in `_meta`.

**Acceptance.**
1. `resources / templates / list` names every record type in the Agent surface.
2. Reads as two roles return exactly what the UI shows each.
3. An out-of-scope id and a missing id give identical responses.
4. A write's `resource_link` reads back the new state.
5. Bytes over budget return `budget_exhausted` and no partial content.
6. Customer-sourced text carries the untrusted marker.

#### BASE-AGENT-004 — Business identity and short-lived, audience-bound tokens

*Tier:* Agent surface

**Requirement.** The door is an OAuth 2.1 resource server. Its RFC 9728 metadata names the authorization servers this installation trusts. That is the paired Business when Business provisioned it, verified with the owner-claim trust the installation already holds for its import door; otherwise it is the seed's own sign-in. Access tokens are RFC 9068 JWTs with `aud` set to the seed's canonical MCP URI, `sub` the sponsoring person, `act` the agent (RFC 8693) with its specialist, scopes per tool family, and a lifetime of 15 minutes or less (5 by default). The policy scopes rules on the sponsor, agent and specialist the token names. The consent behind the tokens can last longer and is revocable. Tokens travel only in the Authorization header, and there is no passthrough.

**Acceptance.**
1. An unauthenticated call returns 401 with `resource_metadata`, and the metadata names the trusted servers and scopes.
2. A Business token for this seed works, and the same token sent to a sibling seed returns 401.
3. An expired token returns 401, and a token with a lifetime over 15 minutes is refused.
4. A read-only token calling a write tool returns 403 `insufficient_scope` with every needed scope in one challenge.
5. A token in a query string is refused and not logged.
6. Revoking consent in the seed or in Business refuses the next call within 60 seconds.
7. After unpairing, Business tokens are refused and the seed's own sign-in still works.

#### BASE-AGENT-005 — An agent acts as a person in a role, never more

*Tier:* Agent surface

**Requirement.** Every call is authorized as the sponsoring person's current role and access (BASE-ACCESS-004), intersected with the grant's resources, actions and budget. A grant only narrows. No call widens the calling agent's own authority. A call that would widen its own grant or its sponsor's role, or change the company policy or Pause, is refused with `self_escalation`, whatever the policy says; narrowing its own grant is allowed. Other access and security changes are ordinary actions in the access and security classes. An agent never acts after its sponsor is suspended. Anything an agent reads (records, files, emails, imports, other seeds' results) is data and cannot change its scope, its targets or a call's class.

**Acceptance.**
1. For each role fixture, every tool's allow or deny through MCP equals the UI's for the same action.
2. A one-folder, read-only grant holds, and widening through arguments is refused.
3. Downgrading the sponsor changes the next call's result, and suspending the sponsor returns 401.
4. Calls that widen the agent's own grant or its sponsor's role, or change the policy or Pause, return `self_escalation` and change nothing, even under a policy with every class autonomous; dropping a scope from its own grant runs.
5. An injection fixture yields no out-of-grant call and no change of class: record text asking for a wider action, or claiming that a recipient is internal.

#### BASE-AGENT-006 — Every action declares its risk class

*Tier:* Agent surface

**Requirement.** Classes come from the fleet list in RISK-POLICY.md: standard, external, money, commitment, accounts, gated, access, security, destructive, sensitive and live. In the registry, each tool declares the classes it can carry and a server-side classifier that decides them per call from the arguments, current records and, for gated, the provider's answer. The classifier also supplies each class's facts: the measure (items, recipients, amount and currency, people or records), the counterparty (internal, known, new or public), the direction for access, the provider and step for gated, and the data kind for sensitive. A classifier never reads a flag, label or claim supplied by the agent or by record text. A seed cannot add a class; it proposes one for the fleet list.

**Acceptance.**
1. Every tool in `tools / list` carries its possible classes in `_meta`, equal to the Agent surface table.
2. For each tool, fixture calls cover every class it can carry, and the computed classes and facts equal the fixture's expected values.
3. An argument or record text asserting a class or a confirmation (`internal: true`, `confirmExternal: true`) leaves the computed classes unchanged.
4. Money calls carry amount and currency, external calls their counterparty and recipient count, access calls their direction, and destructive calls their item count.
5. No tool in `tools / list` declares a class outside the fleet list, and `rer check` fails on one.
6. A refused call's audit row still records its computed classes.

#### BASE-AGENT-007 — The company's policy decides, at one chokepoint

*Tier:* Agent surface

**Requirement.** Every agent door calls one decision function: MCP, the integration API with agent tokens, and the seed's embedded agents. It evaluates the call's classes against the company's policy, as above. The seed ships no dispositions and fills no gap with one: agent access opens only under a complete policy that setup has asked for (RISK-POLICY.md), and before then every agent call returns `policy_unset` with the setup link and changes nothing. *Autonomous* runs the call. *Review* runs it and adds it to the review feed. *Approval* saves a pending action with server-computed facts and returns `input_required`, with a URL-mode elicitation to the seed's approval page and a pending handle. Each person the rule names approves the exact saved revision in a signed-in browser, and changed inputs need a new approval. The retried call returns the result and a receipt. A rejection returns `approval_rejected`, and a lapse past the wait the rule sets returns `approval_expired`. *Blocked* returns `policy_blocked`, naming the class, rule and revision.

**Acceptance.**
1. The Base harness runs each tool under each disposition for every class it can carry, and sees it run, run and enter the review feed, wait with no effect, or be refused.
2. Before setup is complete, the setup page lists every class the seed's tools carry with examples and no answer pre-selected, an agent call returns `policy_unset` with the setup link and changes nothing, and an incomplete revision cannot be confirmed; a `*` rule completes it, and a tool an upgrade adds with an unanswered class appears in `tools / list` once that class is answered, while the other tools keep running.
3. Under "money autonomous up to $500, approval up to $10,000, blocked above", calls of $400, $600 and $20,000 run, wait and are refused; a per-day cap sends the call that crosses it to the next rule.
4. A call carrying two classes takes the stricter disposition.
5. An approval shows server-computed facts and an expiry, returns the URL elicitation and a handle, and completes once after the named approver approves; a changed input needs a new approval, and a rejection or lapse leaves no effect.
6. The same call through MCP, the integration API and an embedded agent gets the same decision.
7. A policy change applies to the next call within 60 seconds, and the audit cites the new revision.
8. A policy document with a bad signature or another Business's id is rejected, and the door keeps the last valid revision.

#### BASE-AGENT-008 — Truthful attribution

*Tier:* Agent surface

**Requirement.** Every agent act is recorded and shown as `"<agent> for <person>"`, and mail and messages an agent sends outside name it that way as their sender. An approval, a review mark, a confirmation (a warning dialog, a typed-field confirmation, a delivery confirmation), a decision or a signature attributed to a person comes only from that person's signed-in session. When an agent does the equivalent act, the record names the agent, and the act carries its own class; a binding decision or a signature is commitment. Agent doors ignore arguments that stand for a person's confirmation. No tool solves a bot check, or enters a person's own password or 2FA code at an outside service. A provider step that demands a person goes to a person, whatever the policy says; the gated class marks such steps before they run.

**Acceptance.**
1. An agent call carrying a person-confirmation flag is classified and decided exactly as without it.
2. Approving, marking reviewed or answering a policy question with an agent or device token returns 403 and changes nothing.
3. A form-mode elicitation "accept" never completes an approval.
4. Where an agent's decision, signature or field confirmation runs without a person, it reads `"<agent> for <person>"` in the record, the activity view, exports and any certificate, never as the person's own act.
5. After a person approves an agent's prepared action, the record shows the person as approver and the agent as preparer.
6. Activity and exports at 1440 and 390 show `"<agent> for <person>"` for every agent act.
7. Mail an agent sends to an outside address names `"<agent> for <person>"` as its sender.

#### BASE-AGENT-009 — Every agent action is audited with its class and decision

*Tier:* Agent surface

**Requirement.** Extending BASE-OPS-005, each call that reads private data or changes anything records the agent client, name and specialist, and the run or task id (`traceparent` when sent); the sponsoring person, the grant, the tool and the targets; the classes and their facts, and the policy revision and rule; the decision (autonomous, review, approval, blocked, unset or self_escalation) and the outcome (done, refused, pending or failed); the approval or review id and person, and the idempotency key. For a period, the seed's Agents page shows actions by class and decision with the notable ones, the review feed (Mark reviewed, Flag, and Undo where reversible), pending approvals, steps waiting for a person and setup questions. Business shows the same across seeds.

**Acceptance.**
1. One write leaves a complete audit row.
2. Refused, pending, unset and self-escalation calls are audited.
3. The Agents page's counts by class and decision equal the audit rows on a fixture week.
4. The review feed lists exactly the calls decided as review; Mark reviewed records the person, and Undo restores a reversible one.
5. Filtering by agent or class lists only those rows, and export includes every field.
6. Removing the agent keeps its rows and its name.
7. The Agents page works at 1440 and 390 with no serious or critical axe findings.

#### BASE-AGENT-010 — Agents can follow changes

*Tier:* Agent surface

**Requirement.** The seed emits a typed event for every record change and for every approval, review and policy decision. Each event carries a stable id, a type, the record URI, the actor (a person, or an agent acting for a person) and a time. Events never carry secrets or more than the subscriber may read. Agents can read events three ways: `subscriptions / listen`, an `events.list` tool with a cursor, and signed webhooks from Base `integrations` using the same ids. Every channel delivers at least once and filters by access at delivery.

**Acceptance.**
1. A subscribed record changed in the UI produces a notification within 10 seconds.
2. `events.list` returns the same event id the webhook carries.
3. Replaying from a cursor returns the same ids in order.
4. After access is revoked, no channel delivers events about that record.
5. A failed webhook is visible and replays without duplicate effects.
6. `approval.pending`, `approval.decided`, `review.flagged` and `policy.adopted` carry the class and decision and nothing the subscriber may not read.

#### BASE-AGENT-011 — Limits are policy, and Pause stops everything

*Tier:* Agent surface

**Requirement.** Business limits are rules in the company's policy: per-call and per-day thresholds on any class's measure, such as money moved, outside recipients or items destroyed; spend caps on provider cost (models, SMS, email) per seed, specialist or agent, which setup asks with the classes; "no cap" is an answer. Tools with provider cost declare an estimate before they run, and an exhausted cap returns `budget_exhausted` before any partial effect. The seed's capacity limits (request rate, body and byte sizes) protect the installation: they bound rate and size, never daily business volume, are documented and are not policy. A grant carries budgets only when the person granting it sets them. A **Pause agents** control in the seed, and Pause all agents in Business when paired, refuses every agent token within 60 seconds until a person resumes; browser sessions and devices keep working.

**Acceptance.**
1. A rate overrun returns 429 with `Retry-After`.
2. A per-day cap of three outside recipients sends the fourth to the rule that applies past the cap.
3. An exhausted spend cap returns `budget_exhausted` with no partial effect and shows the spend.
4. Under the answer "no cap", a spending call runs and its spend shows in usage; a call that spends nothing is unaffected by any cap.
5. The usage view shows calls, decisions by class, money moved and provider spend per agent.
6. Pause and Pause all agents each stop the next call within 60 seconds, and resume restores access.
7. An agent token cannot resume.

#### BASE-AGENT-012 — Writes are idempotent and conflict-safe

*Tier:* Agent surface

**Requirement.** Every mutating tool requires an idempotency key and takes an optional expected revision. The same key with the same arguments returns the first outcome for at least 24 hours; the same key with different arguments returns `idempotency_conflict`; a stale revision returns `revision_conflict` with the current revision. Long work returns a job handle and a status tool, with no dependence on the Tasks extension.

**Acceptance.**
1. Two calls with one key give one effect and equal results.
2. A retry with a new JSON-RPC id and the same key, after a dropped stream, returns the recorded outcome.
3. The same key with different arguments returns a conflict and no effect.
4. A stale revision returns a conflict naming the current revision.
5. A job handle used by another person's token reads as not found.

#### BASE-AGENT-013 — Manifest, docs and the conformance journey

*Tier:* Agent surface

**Requirement.** `server / discover` instructions and an on-site `/docs/agents` page are generated from the action registry. The page lists tools by job, with each tool's classes, the test that adds each computed class, its scopes, resource templates, event types, capacity limits and error codes, and the specialist role. `prompts / list` carries the specialist's jobs. Base ships the conformance journey, a harness that `rer verify` runs against `rer dev` and seeds run in CI. It is an MCP client; a signed-in test person takes a person's steps (setup answers, approvals, review marks, resume) through the URLs the door returns, and the same browser leg runs the UI-parity actions and the page checks at 1440 and 390. It runs every acceptance point of BASE-AGENT-001 to 012 and of the seed's SURFACE clauses under two company policies: *all autonomous* (`*`), and *held* (standard review, every other class the seed declares approval, which the test person grants), plus the single-class variants a point names. A point that names no disposition passes under both.

**Acceptance.**
1. The docs list exactly the names in `tools / list` and `resources / templates / list`.
2. Each tool's classes, and the test behind each computed one, are documented.
3. The harness fails on any of: a tool without a schema; an effect under approval or blocked, or before setup is complete; a computed class that differs from its fixture; a flag that changes a class or completes a person's step; a role-parity mismatch; a wrong-audience token being accepted; a duplicate effect on retry.
4. Every acceptance point runs under both policies, every decision matches the policy in force, and under all autonomous no call waits for a person or is refused by policy.
5. A stranger agent given only the seed URL completes the specialist journey through MCP.

### Agent surface

**Specialist: on-call coordinator.** It keeps incident response moving for the business: it reads coverage and alerts, declares and works incidents, adjusts rotations and routing, and prepares hand-offs, updates and follow-ups for the people on call.

Inherits BASE-AGENT-001 to BASE-AGENT-013. The company's policy decides every call.

**How Oncall computes each class.**
- **standard**: a call that stays inside the workspace and can be undone or superseded in Oncall: reads, notes, acknowledgment, reassignment, snooze, merges, drafts, triage views and follow-up edits; measured in items.
- **live**: a call that changes who is paged or when, or how a production service behaves: rotations, overrides and swaps, escalation, urgency, response and user-assignment rules, notification channels and delays, routing rule sets, pages and responder requests, readiness drills, and library actions and remediation plans. It also covers intake modes, trigger and resolve rules, key activation or revocation, allowances and adapter bindings when they change which events admit or page; service edits that alter whom an active service pages; member changes affecting current or future coverage; erasure that changes coverage, intake or pending delivery; and state-replacing restore; measured by service.
- **external**: a call that sends or exposes something to someone outside the business: a published internal or customer update, a Zoom or Teams incident bridge sent to its provider, a registered outbound endpoint and its replay, a calendar feed an outside calendar service fetches, and creating or synchronizing a Jira, Linear, GitHub or GitLab issue or pull request; the counterparty is known for a recipient on record or the company's own tracker project, new otherwise, and public for a public status page or public repository.
- **commitment**: a sign-off others rely on: resolving a declared incident with its summary and evidence, reviewing hand-off copy, publishing an update, and accepting a root cause, impact, review or completion.
- **access**: a call that changes standing authority: member roles and deactivation, team membership and private scope, a library action's allowed teams and roles, and API client grants. It also covers erasure of a member or of an API client's authority, state-replacing restore, and SSO configuration that enables or changes just-in-time accounts, their default role or group-to-team or group-to-role mapping; its direction is widens or narrows.
- **security**: a call that handles credentials or protective settings: intake keys and email addresses, API client and endpoint keys, calendar feed secrets and SSO settings, erasure of an integration's intake keys or email addresses, or of an API client's keys, state-replacing restore that deletes workspace credentials and every other member's password, and library edits to executor bindings, second-person approval for runs by people or output redaction rules.
- **destructive**: a call that cannot be undone in Oncall: erasure, a restore that replaces state, and an irreversible library or remediation action; measured in items.
- **gated**: destination verification, whose code arrives on the responder's own phone or inbox and is entered by that person.
- Oncall uses no money, accounts or sensitive class: it moves no money, provider numbers and sender registration are installation work, and it holds no health, ID, bank, card or payroll numbers.

| Tool | Does | Core clauses | Risk class | Today |
| --- | --- | --- | --- | --- |
| `oncall.alerts.list` | Read alerts, events and their routing explanations | OC-001, OC-002, OC-059 | standard; sensitive for retained personal or incident evidence | MCP · scoped alerts and observations with bounded cursor pages, service, state and urgency filters |
| `oncall.alerts.replay` | Replay events against the current or a draft policy with zero writes | OC-002, OC-014, OC-043, OC-070 | standard | Not yet shipped |
| `oncall.incidents.declare` | Declare an incident from alerts | OC-004, OC-050, OC-056 | standard | Shipped |
| `oncall.incidents.list` | List incidents the caller may read | OC-003, OC-053 | standard (+ sensitive) | Shipped |
| `oncall.incidents.read` | Read one incident | OC-003, OC-004, OC-053 | standard (+ sensitive) | Shipped |
| `oncall.incidents.receipt` | Read the receipt of an earlier incident call by its idempotency key | OC-053 | standard | Shipped |
| `oncall.incidents.update` | Acknowledge, note, reassign, snooze or escalate an incident and assign its roles | OC-004, OC-027, OC-050, OC-058 | standard (+ live) | Shipped for reassign, role and recovery changes; manual-page, snooze, cancel-deadline and expire-deadline add live from validated native custody; acknowledge and note ship as oncall.incidents.acknowledge and oncall.notes.add; escalation not yet shipped; paging remains OFF |
| `oncall.incidents.acknowledge` | Record an agent acknowledgment naming an active human responder | OC-004, OC-053 | standard (+ sensitive) | Shipped |
| `oncall.notes.add` | Append an agent-attributed note to an incident | OC-004, OC-008 | standard (+ sensitive) | Shipped |
| `oncall.bridges.create` | Create or join a Zoom or Teams incident bridge and record its participants and link | OC-035 | external | Not yet shipped |
| `oncall.incidents.resolve` | Resolve a declared incident with its summary and evidence | OC-004, OC-056 | commitment (+ sensitive) | Shipped |
| `oncall.incidents.merge` | Merge related incidents or split an unrelated alert group | OC-050 | standard | Not yet shipped |
| `oncall.triage.list` | Search, filter and save triage views | OC-060 | standard; sensitive when returned records contain personal or incident evidence | Read-only search and filters shipped; saved views not yet shipped |
| `oncall.triage.bulk` | Apply one action to selected or matching items | OC-079 | standard (+ commitment) (+ live) | Not yet shipped |
| `oncall.pages.create` | Page a service, a person or a policy, or request responders | OC-026, OC-068 | live | Not yet shipped · API (incidents) |
| `oncall.schedules.update` | Change rotations, layers, overrides, holiday and PTO coverage | OC-011, OC-024, OC-077 | live | Shipped |
| `oncall.schedules.create` | Create a native schedule within the granted service and team authority | OC-003, OC-011, OC-012, OC-024, OC-053 | standard (+ sensitive) (+ live) | Shipped |
| `oncall.schedules.override` | Append a primary or backup override to a schedule | OC-003, OC-011, OC-012, OC-024, OC-053 | standard (+ sensitive) (+ live) | Shipped |
| `oncall.schedules.read` | Read schedules within the granted service scope | OC-003, OC-011, OC-014, OC-053 | standard (+ sensitive) | Shipped |
| `oncall.schedules.review` | Compute the coverage diff and review digest of a schedule change without writing | OC-003, OC-011, OC-014, OC-024 | standard (+ sensitive) | Shipped |
| `oncall.schedules.receipt` | Read the receipt of an earlier schedule call by its idempotency key | OC-053 | standard | Shipped |
| `oncall.swaps.respond` | Request, accept or decline a swap | OC-025 | live | Not yet shipped |
| `oncall.schedules.coverage` | Read now/next, coverage previews and route counts | OC-014, OC-020, OC-076 | standard | Shipped |
| `oncall.calendar.subscribe` | Issue or revoke a private calendar feed | OC-020, OC-025 | external · security | Not yet shipped |
| `oncall.policies.update` | Publish escalation, urgency, response, timeout and user-assignment rules | OC-027, OC-056, OC-057, OC-058, OC-068 | live | Not yet shipped |
| `oncall.routing.publish` | Publish routing rule sets, catch-alls and orchestration rules, and re-admit unrouted events | OC-043, OC-072, OC-083 | live | Not yet shipped |
| `oncall.intake.keys` | Create, rotate, activate or revoke intake keys, allowances, email addresses, modes and adapters | OC-030, OC-031, OC-033, OC-042, OC-055, OC-070, OC-072, OC-084 | security (+ live) | Not yet shipped · API (integrations) |
| `oncall.services.update` | Maintain services, teams, ownership, dependencies and business services | OC-023, OC-061 | standard (+ access) (+ live) | Shipped for the native service record (standard class only today); teams ship as oncall.teams.update; the access and live additions not yet computed |
| `oncall.services.list` | List services | OC-003, OC-053 | standard | Shipped |
| `oncall.services.read` | Read one service | OC-003, OC-005, OC-053 | standard | Shipped |
| `oncall.services.receipt` | Read the receipt of an earlier service call by its idempotency key | OC-053 | standard | Shipped |
| `oncall.teams.update` | Create or edit a public team | OC-023, OC-041 | standard (+ access) | Shipped |
| `oncall.members.update` | Add members, change roles and deactivate | OC-003, OC-039 | access (+ live) | Not yet shipped |
| `oncall.access.read` | Read member access and roles | OC-003, OC-023 | standard (+ sensitive) | Shipped |
| `oncall.access.update` | Change an existing member's role and active access under a current administrator sponsor | OC-003, OC-041, OC-053 | access | Shipped |
| `oncall.contacts.update` | Enroll and verify a responder's destinations and notification rules | OC-026, OC-066 | standard (+ gated) (+ live) | Not yet shipped |
| `oncall.handoffs.prepare` | Prepare or withdraw hand-off copy | OC-017 | standard | Not yet shipped |
| `oncall.handoffs.review` | Review exact hand-off copy | OC-017 | commitment | Not yet shipped |
| `oncall.updates.publish` | Publish a reviewed internal or customer update | OC-051, OC-061 | external · commitment | Not yet shipped |
| `oncall.followups.update` | Create, complete or accept follow-ups, root causes and reviews | OC-005, OC-036, OC-049 | standard (+ commitment) (+ external) | Not yet shipped · API (actions) |
| `oncall.actions.create` | Create an owned, due-dated follow-up | OC-005, OC-053 | standard (+ sensitive) | Shipped |
| `oncall.actions.list` | List follow-ups | OC-005, OC-053 | standard (+ sensitive) | Shipped |
| `oncall.actions.read` | Read one follow-up | OC-005, OC-036 | standard (+ sensitive) | Shipped |
| `oncall.actions.submit` | Submit completion evidence for a follow-up | OC-005, OC-053 | standard (+ sensitive) | Shipped |
| `oncall.actions.receipt` | Read the receipt of an earlier follow-up call by its idempotency key | OC-053 | standard | Shipped |
| `oncall.reviews.read` | Read an incident's review material | OC-036, OC-049 | standard (+ sensitive) | Shipped |
| `oncall.analytics.read` | Read response analytics, load, usage and readiness | OC-037, OC-044, OC-054 | standard; sensitive for retained personal or incident evidence | Shipped response analytics, scheduled load and noise for granted services; workspace readiness only with every service granted; no-argument OC-053 counts retained; usage not yet shipped |
| `oncall.coordination.read` | Read the workspace coordination state and its revision | OC-003, OC-004, OC-036, OC-053 | standard | Shipped |
| `oncall.events.list` | List events an agent can follow | BASE-AGENT-010 | standard | Shipped |
| `oncall.imports.read` | Read imports | OC-038, OC-040 | standard | Shipped |
| `oncall.changes.read` | List recent changes for a service, alert or incident | OC-065 | standard | Shipped |
| `oncall.archive.export` | Export the archive, a checkpoint or the permanent audit | OC-007, OC-015, OC-016, OC-041, OC-052 | standard | Not yet shipped |
| `oncall.archive.restore` | Restore an archive or checkpoint, replacing state | OC-007, OC-013, OC-015, OC-016, OC-052 | destructive · live · access (+ security) | Not yet shipped |
| `oncall.paging.history` | Acknowledge or cancel held historical paging jobs | OC-013 | standard | Not yet shipped |
| `oncall.privacy.erase` | Erase a person, incident, integration or change record | OC-040 | destructive (+ live) (+ access) (+ security) | Shipped (destructive class only today; live, access and security additions not yet computed) |
| `oncall.clients.update` | Create, rotate or revoke API clients | OC-053 | access · security | Shipped as revoke; create and rotate not yet shipped |
| `oncall.endpoints.update` | Register, rotate or revoke outbound event endpoints | OC-053 | external · security | Shipped as revoke; register and rotate not yet shipped |
| `oncall.automation.replay` | Replay a held or uncertain outbound event | OC-053 | external | Shipped |
| `oncall.automation.dispatch` | Dispatch a minimal response event to an approved receiver | OC-006, OC-053 | external | Shipped |
| `oncall.automation.read` | Read API clients and endpoints with their effective grants | OC-053 | standard | Shipped |
| `oncall.integrations.read` | Read integrations | OC-053 | standard | Shipped |
| `oncall.actions.update` | Create, edit or retire library actions, including their executors, bounds and allowed teams and roles | OC-063 | standard (+ access) (+ security) | Not yet shipped |
| `oncall.actions.run` | Run a library action through its named executor | OC-063 | live (+ destructive) | Not yet shipped |
| `oncall.remediation.run` | Run a bounded remediation plan | OC-048 | live (+ destructive) | Not yet shipped |
| `oncall.investigations.start` | Start or stop an investigation of an incident | OC-045 | standard | Not yet shipped |
| `oncall.ownership.propose` | Prepare and apply ownership, dependency and runbook changes | OC-046 | standard (+ access) (+ live) | Not yet shipped |
| `oncall.readiness.drill` | Schedule or run a readiness drill | OC-047, OC-054 | live | Not yet shipped |
| `oncall.sso.configure` | Configure SSO connections, just-in-time accounts and required SSO | OC-039, OC-069 | security (+ access) | Not yet shipped |

**Table status.** The Today column marks each tool shipped or not yet shipped in `agent-surface.json` on main; a not-yet-shipped row stays a target obligation, and a shipped row keeps its target text until its note says it is complete. The door declares only tools, policy, pause, audit and idempotency, so the resources, events and prompts below are target obligations that the door does not yet declare.

**Resources (not yet declared by the door).** `oncall://incidents/{id}`, `oncall://alerts/{id}`, `oncall://services/{id}`, `oncall://schedules/{id}`, `oncall://handoffs/{id}`, `oncall://changes/{id}` and `oncall://reports/{period}`. **Events (not yet declared by the door).** `incident.declared`, `incident.acknowledged`, `incident.reassigned`, `incident.resolved`, `alert.triggered`, `alert.recovered`, `schedule.changed`, `handoff.reviewed` and `update.published`, with Base's approval, review and policy events. **Prompts (not yet declared by the door).** "Work an incident" (OC-004, OC-050, OC-079), "Cover a shift" (OC-011, OC-024, OC-025), "Route a new monitor" (OC-033, OC-055, OC-072), "Prepare the hand-off and update" (OC-017, OC-051) and "Close the follow-ups" (OC-005, OC-036, OC-049).
**Not tools, and why.** Device-only: the native apps and their lock-screen and offline behaviour (OC-029), and the SMS replies, voice keys and phone calls a responder makes from a handset (OC-035, OC-071, OC-082). A person's screen: the accessible web app (OC-009) and owner entry and sign-in (OC-018). Connectors: the Slack and Teams apps with their buttons and commands (OC-034, OC-067, OC-081), the sibling error and uptime sources (OC-032), the Terraform and OpenTofu provider, which is itself an OC-053 client (OC-062), and live incumbent APIs (OC-074). The import door: file move-in, resume and undo (OC-021, OC-022, OC-038). Installation facts: the release-1 outbound and paging boundaries (OC-006, OC-012), input bounds and retention (OC-008), health and commands (OC-010), upgrades (OC-019), standby (OC-028), timing bars and reference load (OC-064), memory capacity (OC-073), and Oncall's own delivery and timers, which run inside paging obligations rather than as a person's job (OC-075, OC-078, OC-080).
**Limits.** Capacity limits are each door's request rate and body bounds, documented with the intake, API and archive doors; business limits and spend caps are the company's policy (BASE-AGENT-011).
**Handoffs.** Listens for Uptime monitor events and Spool error groups (OC-032), Lamp publication results (OC-051) and Business policy revisions; emits incident lifecycle, schedule-change and hand-off events for Lamp's status specialist and the Business overview.

#### SURFACE-001 — The registry equals this table, and the Base harness passes

*Tier:* Agent surface · *From:* new · *Cites:* BASE-AGENT-001, BASE-AGENT-002, BASE-AGENT-003, BASE-AGENT-010, BASE-AGENT-012, BASE-AGENT-013

**Requirement.** Oncall serves the Base MCP door with exactly the tools, resources, events and prompts this area lists. The table marks each tool shipped or not yet shipped, and the resources, events and prompts are marked as not yet declared by the door; this clause stays unmet until every row ships and the door declares them.

**Acceptance.**
1. `tools/list` names exactly the tools in this area's table, each with its Core clauses and classes in `_meta`.
2. `resources/templates/list` names the record types listed above, and each listed event type arrives with its record URI.
3. The Base conformance journey (BASE-AGENT-013) passes on Oncall's own fixtures under the all-autonomous and held company policies.

#### SURFACE-002 — Oncall computes each class from the call and its records

*Tier:* Agent surface · *From:* new · *Cites:* BASE-AGENT-006

**Requirement.** Each tool carries the classes computed by Oncall's class rules in this area.

**Acceptance.** Through MCP on Oncall's fixtures:
1. `oncall.services.update` is standard for a runbook edit and adds access when it changes a team's members or a private team's scope. `oncall.actions.update` is standard for a library definition edit and adds access when it changes the action's allowed teams or roles.
2. `oncall.contacts.update` is standard for a destination-label edit, adds live when a notification-channel or delay change affects who is paged or when, and adds gated when it verifies a destination.
3. `oncall.triage.bulk` is standard for a reversible triage edit, adds live for an urgency change or another action that changes who is paged or when, and adds commitment when it resolves a declared incident, carrying the summary and evidence as its facts.
4. `oncall.followups.update` adds commitment when it accepts a root cause, impact, review or completion.
5. `oncall.actions.run` is live and adds destructive when the library action's definition marks it irreversible.
6. `oncall.remediation.run` is live and adds destructive when any planned action is irreversible.
7. `oncall.ownership.propose` adds access when the change grants or removes a team's access and adds live when the change alters whom an active service pages.
8. `oncall.incidents.update` is standard for an incident note and adds live when escalation or another incident update changes who is paged or when.

#### SURFACE-003 — A stranger agent runs a seeded on-call week under two company policies

*Tier:* Agent surface · *From:* new · *Cites:* BASE-AGENT-004, BASE-AGENT-005, BASE-AGENT-007, BASE-AGENT-008, BASE-AGENT-009, BASE-AGENT-011, BASE-AGENT-013

**Requirement.** Given only the Oncall URL, a stranger agent acting for a named responder runs a seeded week of on-call coordination through MCP: it reads coverage and alerts, declares and works an incident, moves an override, publishes a routing rule version, prepares and reviews a hand-off and closes a follow-up. The company's policy decides every call, and the four fixed rules hold whatever the policy says.

**Acceptance.**
1. Under the all-autonomous policy, the week completes with no person involved: no call waits for a person or is refused by policy, and the review feed is empty.
2. Under the held policy (standard calls reviewed, every other class Oncall declares waiting for approval, which the test person grants), each live and commitment call waits with no effect and runs once approved, and the review feed holds the week's standard calls.
3. An OC-053 service-account act in the same week reads as that service account, never as an agent's or a person's act.

#### SURFACE-004 — Configuration, restore and erasure carry every affected class

*Tier:* Agent surface · *From:* new · *Cites:* BASE-AGENT-006

**Requirement.** Configuration, restore and erasure calls carry every class their effects meet under Oncall's class rules.

**Acceptance.** Through MCP on Oncall's fixtures:
1. `oncall.intake.keys` carries security and adds live when a mode, trigger or resolve rule, activation, revocation, allowance or adapter binding changes which events admit or page.
2. `oncall.services.update` adds live when an edit changes whom an active service pages; a runbook-only edit remains standard.
3. `oncall.members.update` carries access and adds live when a role or activation change affects current or future coverage; changing an unscheduled member carries access alone.
4. `oncall.privacy.erase` carries destructive, adds live when the erased subject changes coverage, intake or pending delivery, adds access when it removes a member or an API client's authority, and adds security when it deletes an integration's intake keys or email addresses or an API client's keys; an incident-history-only erasure carries destructive alone.
5. `oncall.archive.restore` carries destructive, live and access when it replaces state, pauses sends and schedules and revokes prior authority. It adds security when it replaces the workspace, deleting every intake, email, change, incumbent, API client and endpoint credential and every other member's password; a module-only restore does not.
6. `oncall.sso.configure` carries security and adds access when it enables or changes just-in-time accounts, their default role or group mapping; a signing-certificate-only rotation carries security alone.
7. `oncall.actions.update` adds security when it changes an executor binding, second-person approval for runs by people or output redaction rules; a description-only edit remains standard.
8. `oncall.followups.update` adds external when it creates or synchronizes a Jira, Linear, GitHub or GitLab issue or pull request, with the counterparty public for a public repository; an Oncall-only follow-up edit remains standard.

## Push further

### Agents serving incident response

#### OC-045 — Investigate before the responder opens the alert

*Tier:* Core · *Rules:* D-1, D-3

**Requirement.** On admission an agent joins the incident's immutable alert generations, Spool/Sentry errors, Datadog/CloudWatch logs and traces, GitHub/GitLab deploy and change history, service dependencies and copied runbooks under an incident-specific read-only grant. When the company's policy lets its read-only calls run, it starts bounded hypotheses and read-only checks within 30 seconds of admission at p95 under the OC-064 reference load, so its running or initial result is visible from the link in the first notification, retaining query scope, source timestamps, citations, contradictory or missing evidence and confidence reasons. Resolve AI-style connectors or a connected Resolve AI service use the same scoped, revocable contract. The responder can stop or revoke it, exclude a source and inspect the exact shared context; instructions inside logs and issues are data. A summary is read-only output: acknowledging, declaring a verified root cause, changing production or claiming recovery are separate calls that carry their own classes, which the company's policy decides. It reads the same OC-065 change records humans see. Quality bar per release: on a maintained held-out suite of at least 20 planted incidents (each with a causal deploy or error, at least one decoy change on an unrelated service, stale or contradictory logs and embedded hostile instructions), the planted cause is the top-ranked cited hypothesis in at least 16, no decoy on an unrelated service is ever presented as the leading cause, and every hypothesis cites at least one retained record; the measured result is published in the OC-054 readiness matrix. Investigation agent grants and actions keep door rule D-1.

**Acceptance.**
1. Trigger an incident with a causal recent deploy, a Spool error and a decoy deploy on an unrelated service; open the first notification's link at notification time and find the investigation already running, with the causal deploy and error cited as leading evidence ranked first and the decoy not cited as cause, while the OC-065 recent-changes panel lists both deploys.
2. Run the held-out suite and compare its top-1 result with the bar.
3. Supply contradictory/stale logs and hostile embedded instructions, revoke one source mid-run and compare citation/permission boundaries and durable incomplete/failure outcomes with no production writes.
4. Investigation agent grants and actions prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-046 — Keep ownership and runbooks current from changes

*Tier:* Core · *Rules:* D-1

**Requirement.** An agent watches accepted Backstage ownership changes, GitHub/GitLab service changes and deploys, resolved incident evidence and failed or outdated runbook steps. It prepares precise service-owner, dependency and runbook diffs with the real change or source, affected routes and a coverage preview. Each change carries its class (standard for a runbook or dependency diff, access when ownership grants or removes access, live when it alters active paging), and the company's policy decides whether it applies alone, is reviewed or waits for a current service owner's approval; under the held policy the agent opens owned review work instead of replacing instructions, and a stale or conflicting proposal needs a fresh decision. Incident runbook snapshots remain unchanged. Track applied changes and whether later incidents still contradict the runbook. Ownership and runbook agent grants and actions keep door rule D-1.

**Acceptance.**
1. Under the held policy, change service ownership and a deploy/runbook reference in real connected sources, observe a proposed diff and review task, reject one and approve another after coverage preview.
2. Under the held policy, change the source during approval and verify renewed review; inspect an older incident to prove its runbook and attribution did not change.
3. Ownership and runbook agent grants and actions prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-047 — Continuously rehearse coverage and standby readiness

*Tier:* Core · *Rules:* D-1, D-4 · *Register:* R-8

**Requirement.** On a configured schedule and after material schedule, contact, provider or standby changes, an agent compares effective coverage, contact verification, provider health, registration, permission and entitlement state, standby configuration age and independent reachability. It requests a real drill when risk changes and rehearses escalation and takeover in an isolated test incident with retained deadlines and failure outcomes. Drill owner, due time, stop condition and reminder and escalation remain durable. A disruptive takeover test carries the live class, which the company's policy decides, and actual receipt is confirmed only by the person who received the page. Separate simulated routing, provider acceptance and human receipt in readiness views. No simulation or one past successful drill certifies future coverage; the existing pager stays authoritative until accepted cutover. Readiness agent grants, actions and drills keep door rule D-1.

**Acceptance.**
1. Revoke a contact, break a provider and stale the standby configuration; observe scheduled detection and a due drill request without a manual prompt.
2. Under the held policy, run a main-site outage drill with real phones that a person approves, decline another, and compare displayed readiness with measured receipt/takeover outcomes and visible unresolved obligations.
3. Readiness agent grants, actions and drills prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-048 — Bounded remediation with independent recovery evidence

*Tier:* Core · *Rules:* D-1, D-3

**Requirement.** The agent prepares a plan from cited incident data with exact production resources and actions, preconditions, permission scope, expiry, action, time and cost bounds, rollback and separately sourced recovery measurements. Running the plan carries the live class, and destructive where an action cannot be undone; the company's policy decides whether it runs alone or waits, and under the held policy an active incident commander approves that exact plan, so a change to its hash, scope, evidence or expiry needs a fresh approval. Plans compose only OC-063 library actions within their declared parameter bounds and run through that clause's named executors; no free-form command is planned or executed. A separately authorized executor performs only the plan's actions with short-lived credentials and records start, result and uncertainty. People can cancel; restart cannot rerun an uncertain action blindly. Independently observed Uptime, customer-journey and telemetry outcomes confirm or contradict recovery, and rollback and further work remain visible on failure. Agent output and a cleared alert are not resolution: resolving the human incident is its own OC-004 call, which carries the commitment class. Remediation agent grants and executor actions keep door rule D-1.

**Acceptance.**
1. Under the held policy, investigate a reversible production fault, inspect and approve one bounded plan, attempt changed/expired/revoked approval, have a plan restricted to one named library action try to run another and see it refused, cancel mid-execution and restart after an uncertain result.
2. Observe executor authority, bounded action/rollback and independent failing then passing recovery evidence before a responder resolves through OC-004.
3. Remediation agent grants and executor actions prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

#### OC-049 — Close the loop on recurrence

*Tier:* Core · *Rules:* D-1, D-4

**Requirement.** An agent follows critical actions until their completion evidence is accepted, compares subsequent alerts and incidents against promised mitigations and service changes, and reopens review work when the failure recurs. It uses the retained incident timeline, Jira/Linear/GitHub/GitLab follow-ups, deploys and fresh Spool/Uptime observations, and shows the linkage and alternative explanations rather than asserting an identical root cause from matching text. It prepares a review of failed mitigations and an owned next action, with reminders and escalation under OC-036. Accepting a root cause, completion or priority is a commitment, which the company's policy decides; silence or an auto-closed external issue cannot complete a mitigation. Recurrence agent grants and actions keep door rule D-1.

**Acceptance.**
1. Complete an evidenced follow-up, trigger a related recurrence after a deploy and observe a linked review and owned task without a prompt.
2. Mark a ticket closed without evidence, leave another overdue, dispute the recurrence and verify a person's correction, continued escalation and unchanged original history.
3. Recurrence agent grants and actions prove door rule D-1: atomic rollback, subject-erasure-safe export and interruption at the execution boundary.

## Field proof register

| ID | Proof | Clauses | State | Date | Receipt |
| --- | --- | --- | --- | --- | --- |
| R-1 | A hosted deployment on a real Cloudflare account claims the owner and retires the setup token, signs the owner in by a real emailed link, coordinates with a password member after reload at 1440 and 390, and removes the recorded resources with empty provider readback. | OC-018 | passed | 2026-10-19 | `docs/contract/acceptance-before-cleanup.md` |
| R-2 | A real inbound provider email through Cloudflare Email Routing and SendGrid opens, deduplicates and recovers generations by address mode and rule, and the rule, scratch Worker and suppressions then read back empty. | OC-033, OC-070 | passed | 2026-10-21 | `docs/contract/acceptance-before-cleanup.md` |
| R-3 | Human screen-reader passes: VoiceOver with Safari on macOS and NVDA with Chrome on Windows for the web app, and VoiceOver on iOS and TalkBack on Android for the apps, each through sign-in, the filtered incident list, acknowledge, snooze, reassign, schedule view and override. | OC-009 | not run | | |
| R-4 | Each release's VPAT 2.5 Accessibility Conformance Report (WCAG 2.2 edition), per success criterion and per surface, published before any new target surface ships. | OC-009 | not run | | |
| R-5 | US A2P 10DLC brand and campaign registration, sender and caller identity, consent and opt-out handling and carrier testing for the paging numbers. | OC-026 | not run | | |
| R-6 | Live handset delivery on registered carrier phones in the US and each listed country: voice with DTMF, SMS with reply codes and links, push and email, with provider-disable drills and inbound call routing. | OC-026, OC-029, OC-035, OC-064, OC-066, OC-071, OC-080, OC-082 | not run | | |
| R-7 | App Store and Google Play distribution with the iOS Critical Alerts entitlement and Android full-screen and Do Not Disturb permissions. | OC-029 | not run | | |
| R-8 | Live phone drills: main-site network, storage, identity and account loss with takeover and failback, scheduled readiness drills, and a buyer's real-device cutover checklist. | OC-028, OC-047, OC-054 | not run | | |
| R-9 | Real identity-provider tenants: Google Workspace, Okta, Microsoft Entra ID, JumpCloud and OneLogin, with SCIM where offered. | OC-039, OC-069 | not run | | |
| R-10 | The Oncall Terraform and OpenTofu provider published on both registries. | OC-062 | not run | | |
| R-11 | Live incumbent accounts: PagerDuty, Opsgenie / Jira Service Management, Splunk On-Call and Better Stack exports and API pulls of a representative account. | OC-038, OC-074 | not run | | |
| R-12 | Real vendor tenants for connectors: Datadog, Grafana and Alertmanager senders, an AWS account with CloudWatch and SNS, Sentry, Slack and Microsoft Teams workspaces, Zoom, Jira, Linear, GitHub, GitLab, Argo CD, Terraform Cloud and Atlassian Statuspage. | OC-030, OC-031, OC-032, OC-034, OC-035, OC-036, OC-051, OC-065, OC-067, OC-081 | not run | | |
| R-13 | A hosted Worker run that holds the stated receipt capacity inside the 128 MB memory limit. | OC-073 | not run | | |
| R-14 | Google Calendar and Microsoft Outlook accounts: least-privilege PTO import and the effective rotation viewed through a subscribed feed. | OC-024, OC-025 | not run | | |

## Boundaries

- Release 1 is hosted incident coordination alongside the team's existing pager (RL-1). Paging stays OFF, the existing pager stays authoritative, and coordination does not require an independent standby. Hosting does not synchronize the pager's configuration, deliver pages, announce role moves externally or prove delivery. Teams keep their existing pager routes and responder notification settings in place.
- Release 2 paging and its independent standby are not built. Its requirements include dual alert intake, configuration pull, independent store, secrets and identity and external role-move announcements; durable absolute deadlines and term-scoped sent markers; one-use acknowledgment at both sites; two channels on two providers per responder; carrier registration; and real-phone and provider-failure drills (OC-026 to OC-028, OC-064, OC-066). Measured takeover-to-page time belongs in this contract only after those drills. None is inferred from coordination deployment or local proof.
- Writing a target does not activate providers, change the approved UI or homepage, or waive the independent standby and real-phone cutover requirements.
- Vendor names identify migration and integration targets, not implemented partnerships. The reference interfaces in `docs/contract/references.md` do not prove Oncall's implementation, and contracts for neighboring products remain separate.
- Network and provider fakes can prove protocol handling but cannot prove real delivery, carrier registration, mobile Do Not Disturb behavior, independent takeover or a human response. Those journeys need explicit account or drill authorization and keep minimum evidence without secrets.
- Demo simulations never prove delivery, and synthetic receipts are never promoted to delivery evidence.

## Homepage claims

| # | Claim | Clauses |
| --- | --- | --- |
| 1 | Everyone knows who's on call: Oncall shows who's on now, who's next and exactly when they hand over. | OC-020, OC-011 |
| 2 | 100% free, open source alternative to PagerDuty and Opsgenie. | OC-018 |
| 3 | Free for the whole rota: MIT licensed, yours to use, change and run, with no seats, no plans and no fees. | OC-018 |
| 4 | Hand-overs on the minute: rotations follow your team's timezone, and when the clocks go back, Monday's hand-over is still at 09:00. | OC-011 |
| 5 | Primary and backup: two rotations, each in order. | OC-011 |
| 6 | Swaps: cover a few hours without touching the rotation. | OC-011, OC-025 |
| 7 | Shifts in your calendar: a private feed of the next seven days. | OC-020 |
| 8 | Incidents, start to finish: declare, coordinate and resolve, with every decision kept. | OC-004, OC-005 |
| 9 | Try it beside your pager: keep your current tool running while you try Oncall. | OC-012 |
| 10 | Bring your schedules from Opsgenie or PagerDuty, and see every schedule in a preview before you import. | OC-021, OC-022 |

## Status

Judged from the code and tests at commit `f4f0bdb097de881accfb709543d551c71e674d7a` (8 November 2026).

| Clauses | Done | Partial | Missing | Total |
| --- | ---: | ---: | ---: | ---: |
| Published | 19 | 3 | 0 | 22 |
| Target and push further | 7 | 38 | 34 | 79 |
| All | 26 | 41 | 34 | 101 |

| Clause | Title | Kind | Status | Evidence | Gap |
| --- | --- | --- | --- | --- | --- |
| `OC-001` | Event identity and alerts | published | done | `src/api.ts`; `src/family/response-operations/domain.ts`; `src/intake/lifecycle.ts`; `tests/runtime.mjs`; `tests/intake.mjs` |  |
| `OC-002` | Routing replay | published | done | `src/api.ts`; `src/orchestration/replay.ts`; `src/family/response-operations/domain.ts`; `tests/runtime.mjs` — coordinationJourney (the OC-002 native replay block): a severity-routed event is admitted under a policy, the policy is changed by an attributed command, and the authorized replay request for a newer-generation event then the original returns decisions in submitted order, each historical decision, owner, policy version and evaluation snapshot equal to the immutable admission record beside the proposed decision under the changed policy, with unchanged application state, workspace revision and permanent audit rows before and after (zero writes), and anonymous and revoked sessions refused with no comparison. | |
| `OC-003` | Roles and authority | published | done | `tests/runtime.mjs` — coordinationJourney: session roles, responder workspace reads, attributed acknowledgment and note, administrator refusals, held downgrade and revoke mutations, minimal bearer and signed intake receipts; `tests/member-coordination-browser.mjs` — responder coordinates and reloads attributed history. |  |
| `OC-004` | Incident state transitions | published | done | `tests/runtime.mjs` — coordinationJourney: exact admitted alert links, responder commander, stale and concurrent refusal, source recovery independence, unchanged state after recovery without evidence and resolution without a summary, evidenced recovery, resolved state and human-attributed lifecycle history; `tests/triage.mjs` — bulk resolution refuses missing recovery evidence. |  |
| `OC-005` | Copied runbooks | published | done | `tests/runtime.mjs` — coordinationJourney: declaration copies every service step; an accepted service runbook edit reads back while the declared incident, its copied steps and revision stay unchanged; an owned, due-dated action reads back open with no evidence; completion without a URL is refused with every record unchanged; an evidenced submission awaits human acceptance and is accepted; the unfinished action, copied steps with checklist progress and an editable review are retained after resolution.; `tests/runtime.mjs` (coordinationJourney) | |
| `OC-006` | Bounded outbound incident effects | published | done | `src/delivery.ts`; `src/handoff-api.ts`; `src/mail.server.mjs`; `tests/runtime.mjs`; `tests/activation.mjs`; `tests/activation.mjs` (PROBE OC-006 1); `tests/activation.mjs` (PROBE OC-006 2); `tests/runtime.mjs` (coordinationJourney) | |
| `OC-007` | Native archive | published | done | `src/api.ts`; `src/family/response-operations/domain.ts`; `tests/runtime.mjs` |  |
| `OC-008` | User-authored records kept | published | done | `src/api.ts`; `src/native-incomplete.ts`; `src/family/response-operations/domain.ts`; `tests/runtime.mjs`; `tests/product-browser-journey.mjs`; `tests/product-browser.mjs` |  |
| `OC-009` | Accessible interface | published | partial | `src/forms.tsx`; `src/app/AlertsPanel.tsx`; `tests/product-browser-journey.mjs` — keyboardCoordination: native-key declaration, acknowledgment, literal attributed notes, action-dialog focus containment and Escape return at 1440 and 390, plus the desktop real-409 alert with no saved claim; productSchedule: native-key rota person order, date and time entry, phone preview disclosure, cover preparation, zero-write review, Escape, explicit confirmation and protected assignment and preview readback at 1440 and 390. `tests/product-browser.mjs` runs these legs in push Verify with a controlled platform and browser clock; `tests/keyboard.mjs` checks visible focus; selected states check labels, overflow and serious or critical axe findings. | Maintained keyboard/responsive journeys exist; full accessibility conformance is not established. BASE-ACCESSIBILITY-001 is not established across every Oncall journey and the OC-029 apps; the human passes and the VPAT are register rows R-3 and R-4. |
| `OC-010` | Health and honest commands | published | done | `tests/runtime.mjs` — coordinationHealth: check and describe with storage available and unavailable, exact emitted build identity, storage-loss 503 and recovery with unchanged records; hosted production output: actual source and artifact identity, supplied version binding and linked-page results. `tests/transfer.mjs` — managed installation transfer: observed CLI outcomes, populated inactive restore and erasure fences. `tests/health-outcomes.mjs` — separate local and locally executed hosted-mode records, dated prior R-1 and R-2 provider receipts with their source SHAs, and R-8 explicitly not run. Paging health and measured capacity remain with OC-026 to OC-029 and OC-064. |  |
| `OC-011` | Calendar-day rotations | published | done | `src/family/response-operations/schedules.ts`; `src/paging-api.ts`; `src/schedule-api.ts`; `tests/activation.mjs` — savedRotationCoverage (run by scheduleCoordination in the changes shard): saves primary and backup rotations over HTTP and reads the HTTP preview and now-next for the fall New York 09:00 hand-off (a 25-hour civil day), a repeated 01:30 and a nonexistent 02:30 under earlier, later and reject with explained gaps, primary and backup override edges (start included, end excluded, a different role may share an interval, a same-role overlap refused with no write, a touching interval accepted), viewer and missing member slots retained as explained gaps with later turns unmoved, and identical primary and backup rotations leaving the backup unavailable; every read leaves all durable rows and outbound requests unchanged. | |
| `OC-012` | Paging off | published | done | `tests/activation.mjs` — normal-installation refusal loop: delivery, job, tick, callback and resume each explain paging OFF, the existing pager, independent standby and a passed real-phone drill, preserve workspace and paging records and revisions, retain refusal audit, create no receipt and attempt no outbound request; labelled demo HTTP flow: emitted HTML Demo decoration and title plus the workspace demo flag identify all four simulated channel outcomes, with no production receipt or outbound request. |  |
| `OC-013` | Held history stays historical | published | done | `src/family/response-operations/escalation.ts`; `src/paging-api.ts`; `tests/runtime.mjs`; `tests/activation.mjs` |  |
| `OC-014` | Side-effect-free previews | published | partial | `src/schedule-api.ts`; `src/paging-api.ts`; `src/family/response-operations/paging-archive.ts`; `tests/activation.mjs` — **scheduleCoordination** and **pagingHistory** (preview isolation); `tests/routing.mjs` — **OC-014 service routing preview isolation** | No cited test compares durable state, receipt counts, timers or provider actions before and after a now/next, schedule or routing preview, or reads the synthetic label on historical delivery data. |
| `OC-015` | Strict module archives | published | done | `tests/activation.mjs` pagingHistory: current-admin populated archive round trip; anonymous 401 and active viewer and responder 403 at both archive and restore doors, no disclosure, unchanged module records and both revisions with refusal audit; unknown fields, broken references, retained callbacks, paused pending jobs and injected SQL rollback. |  |
| `OC-016` | Recovery checkpoint | published | done | `src/api.ts`; `src/family/response-operations/recovery.ts`; `scripts/checkpoint.mjs`; `tests/activation.mjs`; `tests/checkpoint-cli.mjs` |  |
| `OC-017` | Reviewed handoffs | published | done | `src/handoff-api.ts`; `src/family/response-operations/handoffs.ts`; `tests/activation.mjs`; `tests/activation.mjs` (HTTP export preserves the exact reviewed payload, source snapshots, hashes, revision and attributed history); `tests/activation.mjs` (OC-016/017: checkpoint consistency); `tests/checkpoint-cli.mjs` (checkpointCli) | |
| `OC-018` | Maintained root commands | published | partial | `scripts/installer/seed.mjs`; `src/auth.server.ts`; `tests/transfer.mjs`; `tests/member-coordination-browser.mjs`; `tests/member-coordination-browser.mjs`; `tests/product-browser-journey.mjs` | No cited test asserts `rer build` or the deploy dry-run; setup, dev, preview, reset, archive, owner entry and member password sign-in are asserted. The real-account hosted journey is register row R-1; no maintained test repeats the account steps. |
| `OC-019` | Additive upgrade | published | done | `src/workspace-store.ts`; `migrations/core/0106_relational_workspace.sql`; `tests/runtime.mjs`; `tests/runtime.mjs` |  |
| `OC-020` | Now/next and calendar feed | published | done | `src/calendar.ts`; `src/schedule-api.ts`; `tests/activation.mjs` — the main HTTP journey (run in the changes shard after scheduleCoordination): now/next at the 13:00 UTC hand-off and with an override (primary, backup and next hand-off); the ICS feed with no session refused 401; the seven-day default window, an explicit override window and the 31-day limit each compare every primary and backup event to the resolved UTC preview intervals (distinct UIDs, DST-day boundaries, override start and end); 31 days plus one second, a zero and a reverse window refused 400 with only the refusal audit written; an inactive responder shows primary and backup Coverage gap events with exact intervals and explanations; a scoped source credential admits an immutable event and active alert with the saved paging policy unchanged, a retry returns the original event, a revoked key is refused 401, and zero outbound requests are made. | |
| `OC-021` | Move-in preview | published | done | `src/move-in/owner-door.ts`; `src/move-in/source.ts`; `src/move-in/adoption.ts`; `tests/activation.mjs`; `tests/import-door.mjs`; `tests/product-browser-journey.mjs`; `tests/import-door.mjs` |  |
| `OC-022` | Resume and undo | published | done | `src/move-in/owner-door.ts`; `src/move-in/api.ts`; `src/move-in/journal.ts`; `tests/activation.mjs`; `tests/import-door.mjs`; `tests/import-door.mjs`; `tests/import-door.mjs`; `tests/activation.mjs` (OC-022 pagerduty: unfinished checkpoint); `tests/activation.mjs` (OC-022 opsgenie: unfinished checkpoint); `tests/import-door.mjs` (OC-038 PagerDuty account HTTP) | |
| `OC-023` | Services, teams and ownership | target | partial | `src/family/response-operations/domain.ts`; `src/changes/Dependencies.tsx`; `src/app/AlertsPanel.tsx`; `tests/changes.mjs`; `tests/member-coordination-browser.mjs`; `tests/transfer.mjs`; `src/teams/backstage.ts`; `src/teams/api.ts`; `src/teams/BackstageImport.tsx`; `tests/changes.mjs` — reviewed dependency import, zero-write preview, bounded references, digest/conflict refusals, atomic provenance and audit rollback; `tests/member-coordination-browser.mjs` — dependency conflict choice, Apply, lost-response Retry and reload; `tests/transfer.mjs` and `tests/checkpoint-cli.mjs` — immutable dependency provenance and inactive restore. | Explicit unassigned service ownership is workspace-visible; unmatched intake retains null ownership and archive/handoff restore retains the ownership gap. Services, copied incident runbooks, alert-level service runbooks, workspace roles and revision-checked direct dependencies ship. Team privacy, managers/ownership scope and Backstage remain missing. OC-041 audit and durable crash/lease outcomes for team-scoped audit export remain this clause's pre-shipping acceptance. Receiving Gap: OC-065 private-team recent-change scope; mixed source sentences remain in OC-065. Received duties remain unbuilt: team subscribers and private-team business-service visibility (OC-061); per-team create-page and request-responder permissions (OC-068); swap manager rules and team privacy (OC-025, OC-060). |
| `OC-024` | Follow-the-sun, PTO and holiday coverage | target | partial | `src/schedule-coverage/review.ts`; `src/schedule-coverage/ReviewedChange.tsx`; `src/schedule-api.ts`; `tests/activation.mjs`; `tests/product-browser-journey.mjs`; `docs/schedules.md` | P1: 366-day bounded coverage and digest-bound review in `src/family/response-operations/schedules.ts` and `src/schedule-coverage/review.ts`. P2: ordered named-zone layers and explicit precedence in `src/schedule-coverage/layers.ts`. P3: selected federal observed holidays and revisioned company dates. P4: stored PTO and reviewed local ICS upload in `src/schedule-api.ts` and `src/schedule-coverage/pto-ics.ts`; existing rota editor controls in `src/schedule-coverage/CoverageRules.tsx`; member-owned PTO and ICS at `/api/schedules/:id/pto-review` and `/api/schedules/:id/pto-apply` scoped by `memberPTO` in `src/teams/model.ts`; public-door proof in `tests/activation.mjs` (PASS OC-024 member PTO) and `tests/product-browser-journey.mjs` (ordinary-member browser 1440). Public Worker journeys in `tests/activation.mjs`; browser journey in `tests/product-browser-journey.mjs`; custody in `tests/transfer.mjs` and `tests/checkpoint-cli.mjs`. Gap: Google and Outlook consent-based PTO import (R-14: dated one-time owner-role evidence, not run); verified-route counts and degraded coverage (OC-076 and OC-066); real-phone London handoff; paging OFF. |
| `OC-025` | Swaps, reminders and calendar subscriptions | target | partial | `src/schedule-coordination/`; `src/calendar.ts`; `src/schedule-api.ts`; `src/paging-store.ts`; `tests/activation.mjs`; `tests/activation.mjs`; `tests/runtime.mjs`; `tests/import-door.mjs`; `tests/product-browser-journey.mjs`; `tests/member-coordination-browser.mjs`; `tests/transfer.mjs`; `tests/checkpoint-cli.mjs` | Current holders name one substitute and a bounded interval. Only that substitute accepts or declines; the versioned none/admin setting starts at workspace admin approval. Acceptance revision-checks one override, keeps the other role's effective holder at every boundary, and commits its recorded notices with the permanent audit; racing decisions commit once. Requesters cancel, and overdue requests remain undecided. Each affected configured responder and service owner gets one schedule-change recorded obligation, visibly not deliverable without a verified channel. Per-member reminder lead/channel settings show a due time and not sent (no timer). Schedule/service/own-shift bearer feeds expose schedule windows only, show the raw URL once, store its hash and support at most 20 subscription records per member; owner/admin revocation refuses immediately without changing assignments. The new category is validated and audited, transfers and restores inactive with cleared hashes, and participates in subject erasure. Gap: mobile (OC-029), team managers/privacy (OC-023), dated Google/Outlook viewing not run (R-14). Automatic notice delivery is OC-077 and reminder delivery OC-027 (RL-3). PARTIAL; paging OFF. |
| `OC-026` | Native US phone, SMS, push and email paging | target | missing |  | No implementing flow. Only the paging refusal exists; no live providers, responder rules or carrier drill. OC-041 audit and durable crash/lease outcomes for provider attempts and outcomes remain this clause's pre-shipping acceptance (door rule D-1). Received duties remain unbuilt: live cutover and parallel routing within this clause's own subject (OC-038); phone-within-bar and creator-naming notification (OC-068). Source-recovery cancellation, route counts and change notices are OC-075 to OC-077. Paging OFF. |
| `OC-075` | Source recovery cancels attempts and sends recovered notices | target | missing |  | No implementing flow. Actual attempt cancellation and recovered-notice delivery are unbuilt; OC-056's recorded-state proof cannot satisfy them, and the current email receipt records only the labelled non-automatic paging-OFF stopped state. |
| `OC-076` | Verified route counts and degraded coverage before a shift | target | missing |  | No implementing flow. Verified high-urgency route counts and degraded-coverage flags are unbuilt (received from OC-024). |
| `OC-077` | Schedule-change notices are delivered | target | missing |  | No implementing flow. Automatic schedule-change notice delivery and retained delivery failures are unbuilt (received from OC-025); schedule changes record notice obligations that are visibly not deliverable. |
| `OC-027` | Durable escalation until acknowledged | target | partial | `src/paging-api.ts`; `src/family/response-operations/escalation.ts`; `src/delivery.ts`; `tests/activation.mjs` | Inspectable policies and historical acknowledge/cancel exist; active timers, reassignment, repeat and round-robin execution are absent. OC-041 audit and durable crash/lease outcomes for escalation workers and provider attempts remain this clause's pre-shipping acceptance. Received duties remain unbuilt: live cutover and parallel routing within this clause's own subject (OC-038); automatic user-assignment repeat/escalation (OC-068). The source-recovery, support-start and reminder duties are OC-078. |
| `OC-078` | Source recovery and support hours stop or start escalation | target | missing |  | No implementing flow. The browser-closed deadline, no-further-notification and reminder-firing duties received from OC-056, and the support-start raise of OC-057, remain unbuilt: Oncall has no durable timer, and an open low alert shows the raise as not automatic. |
| `OC-028` | Independent standby and tested takeover | target | missing |  | No implementing flow. One Cloudflare coordination deployment is not independent pager continuity. OC-041 audit and durable crash/lease outcomes for standby authority moves and dispatch remain this clause's pre-shipping acceptance. Receiving Gap from OC-038: live cutover and parallel routing within this clause’s own subject remain unbuilt; the mixed DST-comparison/cutover sentence stays verbatim in OC-038. |
| `OC-029` | Native iOS and Android responder apps | target | missing |  | No implementing flow. Responsive web is implemented, but no native apps, entitlements or live critical-push acceptance exist. OC-041 audit and durable crash/lease outcomes for mobile actions and device delivery remain this clause's pre-shipping acceptance. Receiving Gap from OC-038: live cutover and parallel routing within this clause’s own subject remain unbuilt; the mixed DST-comparison/cutover sentence stays verbatim in OC-038. Receiving Gap: OC-065 mobile recent-changes panel; mixed source sentences remain in OC-065. Received duties remain unbuilt: mobile status/subscription access and push delivery (OC-061); mobile manual pages (OC-068); mobile swaps (OC-025); mobile queries and bulk coordination (OC-060). |
| `OC-030` | Datadog, Prometheus and Grafana intake | target | partial | `src/monitoring/api.ts`; `src/monitoring/providers.ts`; `src/integrations/SourcePage.tsx`; `tests/intake.mjs`; `docs/monitoring-providers.md` | Bearer-authenticated Alertmanager/Grafana groups and explicit Datadog templates retain provider identities, precise generations, bounded context and source links. Retry/reordering, recovery tombstones, old-cycle recovery, routed labels/tags, named local checks and rejection diagnostics are maintained tests; a local check is not provider acceptance. The real-provider journey (each provider's own test/send door, then fire and recover a real rule, and an Alertmanager on a routed key) has not been run (R-12, RL-7). Datadog's journey needs an owner Datadog account and a provider-reachable deployment. Grafana optionally requires a sealed per-integration HMAC-SHA256 secret with bearer authentication, raw-body or timestamp:body verification, timestamp checks, named rejection diagnostics, rotation fences and audit rollback. `tests/intake.mjs` — **OC-030 optional Grafana HMAC**; `tests/product-browser.mjs` — **OC-065/030 templates and signing settings** at 1440/390. Header/signing assumptions remain unverified against a live sender. Intake capacity is the explicit local receipt guard (429); team privacy is OC-023's, mobile OC-029's, paging OC-026's and measured load OC-064's. |
| `OC-031` | AWS CloudWatch and SNS intake | target | missing |  | No implementing flow. No AWS adapter or subscription validation is implemented. |
| `OC-032` | Error and uptime integrations with sibling products | target | missing |  | No implementing flow. Only the generic event schema is implemented; no Sentry/Spool/Uptime connector acceptance exists. |
| `OC-033` | Generic email and Events API | target | done | `tests/runtime.mjs` — coordinationJourney: signed and bearer Events API admission, scoped credentials, revocation, limits and minimal receipts; `tests/intake.mjs` — emitted-Worker intake journey: authenticated email, duplicate message IDs, spoof and MIME quarantine, bounded diagnostics, unauthorized reads and incident mutations, and custom failure deduplication with canonical source-recovery stop; `tests/routing.mjs` — public Worker journey: email modes and versioned trigger and resolve rules; `tests/triage.mjs` — source-recovery journey: canonical obligations and declared-incident independence. Real-provider field proof remains the dated R-2 record; paging remains OFF. |  |
| `OC-034` | Slack and Microsoft Teams response | target | missing |  | No implementing flow. Internal handoff drafts do not implement either collaboration app. OC-041 audit and durable crash/lease outcomes for chat grants, commands and delivery remain this clause's pre-shipping acceptance. |
| `OC-035` | Incident bridges and live call routing | target | missing |  | No implementing flow. No telephony routing or conferencing connector exists. |
| `OC-036` | Post-incident review and completion policy | target | partial | `src/reviews/material.ts`; `src/reviews/review-controls.ts`; `src/reviews/ReviewsHome.tsx`; `src/reviews/ReviewSheet.tsx`; `tests/runtime.mjs`; `docs/reviews.md`; `tests/triage.mjs` — Response learning: retained pre-resolution P1 custody, revision-bound review correction/refusal, both attributed accepted snapshots and archive/restart retention | Generated source-attributed observations, literal human assertions, response source entries, changes and follow-ups remain separate from revision-bound human acceptance of root cause, impact and review. Accepted assessments retain immutable timeline snapshots. Priority, UTC due dates, manual escalation contacts and evidence/human-review completion policies ship; P1 evidence submission stays open until explicit acceptance. Automatic reminders/escalation, recurring review, hypotheses/chat context and remote ticket synchronization remain missing. |
| `OC-037` | Response analytics and fair on-call load | target | partial | `src/reviews/report.ts`; `src/reviews/load.ts`; `src/reviews/noise.ts`; `src/reviews/csv.ts`; `src/reviews/api.ts`; `src/reviews/ResponseReport.tsx`; `src/family/response-operations/schedules.ts`; `tests/runtime.mjs`; `docs/reviews.md`; `tests/triage.mjs` — Response learning and OC-037 response report: resolved, open, unknown and repeated cohorts, DST hours, exact late acknowledgement, named-zone night coverage, outside-coverage load, percentiles and matching frozen CSV and API; `tests/product-browser.mjs` — responseReportBrowser: rendered response figures and downloaded CSV match one frozen API observation | Imported incidents, late acknowledgment, after-hours shifts, the dashboard's figures and foreign-team export refusal are not asserted in the cited test; resolved, open and never-acknowledged cohorts, DST hours, repeat and noisy alerts, CSV and API figures against coverage hours and the fairness ratio are asserted. Page volume/delivery (OC-026/064), escalation/reassignment latency (OC-027), after-hours interruptions (OC-024/026), team load and export scope (OC-023), import provenance (OC-038), erasure-proof denominators (OC-040) and verified recovery (OC-048) are inherited. |
| `OC-038` | Complete incumbent migration and controlled cutover | target | partial | `src/move-in/vendor-formats.ts`; `src/move-in/source.ts`; `src/move-in/mapping.ts`; `src/move-in/SavedExportHelp.tsx`; `tests/import-door.mjs`; `tests/import-door.mjs`; `tests/product-browser-journey.mjs`; `tests/transfer.mjs`; `docs/move-in.md`; `src/move-in/ExportHelp.tsx`; `tests/product-browser-journey.mjs` — providerExport and opsgenieReadiness via `tests/product-browser.mjs`: actual Opsgenie selection and saved-response help reach the dated readiness checklist and saved-export instructions, names all five official references and blocked account gates, preserves native and paging records with zero migration, provider authorization or external requests; visual proof at 1440 and 390 | Splunk On-Call, JSM Ops and Better Stack saved responses use the reviewed apply, restart, reconcile and undo path. JSM single rotations use the strict converter; imported integration inventory stays inactive and keyless, contacts unverified, unsupported objects individually retained with erasable source provenance. Acceptance 5 has account-free checklist guidance reviewed on 31 October 2026; authenticated provider and export availability remain blocked and unrun, with R-11 not run. Gap: unverified live-account export shapes; Splunk and Better Stack recurring schedule conversion; complete contact, team, service and history conversion; live-API pull and account reconciliation; real-phone cutover and parallel routing (OC-026–029); Terraform (OC-062), automation actions (OC-063), routed-key import (OC-083), chat (OC-067), email modes (OC-070), business services (OC-061). No delivery or login grants. Live cutover and parallel routing are receiving duties in OC-026–029, and live-API pull and account reconciliation are co-held with OC-074 (RL-3, RL-5). |
| `OC-074` | Live incumbent API pull and account reconciliation | target | missing |  | Live API pull, reconciliation and live-account shape proof remain unbuilt; OC-038 retains saved-response adapters. |
| `OC-039` | Enterprise access and responder lifecycle | target | partial | `src/auth.server.ts`; `src/api.ts`; `tests/runtime.mjs`; `tests/member-coordination-browser.mjs` | Native owner email links and admin-created local member passwords exist; invitations, federated identity, MFA and SCIM are not adopted product flows. SSO/SCIM stakeholder assignment (OC-061) remains unbuilt. |
| `OC-040` | Retention, erasure and custody | target | partial | `src/subject-erasure.ts`; `src/changes/erasure.ts`; `src/move-in/erasure.ts`; `src/move-in/native-erasure.ts`; `src/subject-erasure-identity.ts`; `tests/activation.mjs`; `tests/runtime.mjs`; `tests/checkpoint-cli.mjs`; `tests/transfer.mjs`; `tests/product-browser.mjs`; `docs/data.md`; `docs/changes.md`; `tests/runtime.mjs`; `tests/activation.mjs`; `migrations/core/0144_erased_report_cases.sql` | Exact imported-person custody/fence proof and local change-event erasure exist. `src/subject-erasure.ts`; `tests/activation.mjs` (activation, **OC-040 incident erasure**, **integration erasure**); `tests/runtime.mjs` via runtime (**OC-040 integration erasure**) exercise native incident/credential custody, failure rollback, queued/in-flight delivery races and stale/forged-journal restore refusal; `tests/product-browser.mjs` asserts the existing erasure form at 1440/390. Change erasure commits per-table local counts, last-receipt cleanup, transfer-copy invalidation, retry/restore fences and identity unlinking; audit failure rolls back and completion explicitly excludes standby reconciliation. OC-028 standby reconciliation remains incomplete. Cross-site erasure must reconcile standby before success is claimed. Email integration erasure uses the shared receipt, source unlinking, credential deletion, transfer invalidation, permanent-audit identity unlinking and restore/reuse fences; `tests/intake.mjs` (intake — **OC-040 email integration erasure**) proves authority, stale refusal, audit/table rollback, committed counts and restart; `tests/product-browser.mjs` (product-browser) proves its review and receipt at 1440/390. Linked imported integration originals/plans and both incumbent/native credentials retire atomically through `src/move-in/native-erasure.ts`; `tests/activation.mjs` (**OC-040 imported integration erasure**) proves rollback and committed per-store counts, with the receipt at 1440/390 in product-browser. Conflicting imported bindings refuse without erasure. Native incident and native/routed/change/API integration erasure use the shared committed receipt, transfer-copy invalidation, restore fences and permanent-audit identity unlinking. Sending and uncleared uncertain/expired-lease response work refuses erasure with 409; queued work is removed atomically. Already-sent external messages cannot be recalled. Receiving Gap from OC-065: change-event local object erasure is exercised; cross-site custody still needs OC-028 standby reconciliation. Mixed source sentences remain in OC-065. |
| `OC-041` | Durable operational audit | target | done | `src/audit-store.ts`; `src/audit-database.ts`; `src/audit-request.ts`; `migrations/core/0129_admin_audit.sql`; `migrations/core/0130_import_audit_lifecycle.sql`; `tests/runtime.mjs`; `tests/transfer.mjs`; `tests/activation.mjs`; `tests/triage.mjs`; `docs/audit.md`; `tests/routing.mjs` — journey OC-041 accepted state and its audit entry commit together, survive subject erasure and export without secrets across: (1) `tests/runtime.mjs` workspace-command and member and access changes under injected audit failure (injected_audit_failure, synthetic_oncall_437_audit), password change (synthetic_oncall_password_audit: credential and session custody roll back, retry commits one revision-bound fact); `tests/activation.mjs` schedule accept, every handoff action (handoffMutation, one accepted fact at the committed handoff revision), paging refusals, historical acknowledgment and cancellation, erasure kinds and the import door (injected_import_failure); `tests/routing.mjs` routing publication (synthetic_oncall_publication_audit) and source and intake key admission; `tests/changes.mjs` change keys; `tests/intake.mjs` email and monitoring admission; `tests/triage.mjs` bulk actions (synthetic_bulk_audit). (2) `tests/runtime.mjs` viewer 403, anonymous 401, revoked-session 401 and bearer 401 on the audit export, administrator export secret-free; member erasure keeps the permanent label with no association and no reassignment (PASS OC-053 named-responder erasure); `tests/activation.mjs` erased subjects. (3) `tests/activation.mjs` import apply with injected_import_exit, expired lease (import_interrupted_lease), durable interrupted audit across a Worker restart and refused retry; `tests/transfer.mjs` restored pending import work interrupted. (4) `tests/transfer.mjs` portable restore keeps every audit row unchanged, grants no session or Business authority, and PROBE OC-041 portable labels: restored identity associations absent, fresh actor, subject and source labels never adopt retained history. | |
| `OC-042` | Credential custody and declared external flows | target | partial | `src/native-sources.ts`; `src/changes/credentials.ts`; `src/changes/api.ts`; `migrations/core/0127_source_signing_custody.sql`; `src/portability-policy.mjs`; `tests/runtime.mjs`; `tests/changes.mjs`; `tests/transfer.mjs` | No cited test inspects outbound traffic at a network edge, submits a hostile URL or redirect, or proves which endpoint receives which content, and there is no model request to inspect; native source custody, rotation, revocation, echo refusal and archive exclusion are asserted. Subscriber delivery under this clause's custody (OC-061) remains unbuilt, pending delivery proof with the held SendGrid sender. |
| `OC-043` | Explainable grouping and event orchestration | target | partial | `src/orchestration/correlation.ts`; `src/orchestration/Settings.tsx`; `src/family/response-operations/domain.ts`; `src/routing/preview.ts`; `tests/routing.mjs`; `tests/routing.mjs`; `tests/runtime.mjs`; `tests/product-browser.mjs`; `tests/transfer.mjs`; `docs/routed-intake.md`; `src/triage-orchestration.ts`; `tests/product-browser-journey.mjs`; `src/orchestration/transformation.ts`; `src/orchestration/workflows.ts`; `src/orchestration/workflow-api.ts` | Routed-key selection precedes versioned service grouping and OC-057 urgency. Declared keys/titles/provider labels group inside original-event timestamp windows; missing fields, exact-end and other-environment signals stay visible. Direct-dependency association, both original/current service-rule versions and the preceding routing version are retained. Independent source/service/generation identity, severity and immutable originals remain; completed/retriggered flapping generations are held as one visible source signal with a reason. Private ordered replay compares grouping and both urgency decisions with zero durable/permanent-audit writes; initial urgency lowering requires the explicit OC-057 rule and never silently lowers an open high alert. Audit rollback, restart/duplicate admission, original-integration erasure references and inactive archive/checkpoint/portable custody are exercised. Finite maintenance remains admission-time and timer-free. `tests/runtime.mjs` (runtime — **OC-043 durable coordination workflow**) proves a frozen ordered selected-alert reassignment plan in existing triage custody, restart after two committed steps, explicit authorized resume, atomic audit rollback with interrupted outcome, completed-step idempotency and recipient-erasure/export custody. `tests/product-browser-journey.mjs` via product-browser proves authoring, saved pending progress after reload and completion at 1440/390. No timer or sender runs. Rule-launched recorded workflows retain pending declaration/notification steps until explicit authorized resume; unattended continuation and live responder delivery remain unproved under OC-027/OC-026/OC-042, with paging OFF. Retained scope: "severity/urgency transformations"; "no noise rule deletes evidence or silently lowers severity"; "Durable idempotent workflows can declare an incident, notify responders and launch approved coordination steps; dry-run/replay produces an ordered comparison without effects." OC-041 inheritance remains binding: "Orchestration automation must commit accepted state with its permanent audit entry and retain a durable failed, interrupted or uncertain outcome on crash or lease expiry before shipping. Its own acceptance proves atomic rollback, subject-erasure-safe export and interruption at the execution boundary." |
| `OC-044` | US operating boundaries and transparent cost | target | partial | `docs/limits.md`; `tests/product-browser.mjs` — limitationsBrowser: emitted public limitations document, Readiness navigation, desktop accessibility and visual proof at 1440 and 390; `tests/readiness.mjs` — readinessHealth: paging OFF, unbuilt standby and unmeasured reference load; `src/delivery.ts`; `src/family/response-operations/domain.ts`; `tests/runtime.mjs` | Current release hold, structured bounds and explicit local capacity refusal exist; provider usage/budget and target integration acceptance do not. Acceptance 2 guidance names no availability or regulated-data guarantee; applicable agreements and validated controls are absent. Acceptance 1 remains unproved: complete US installation and dependency checklist, real USD usage by channel and country, budget warning during a real paging obligation, provider or capacity quota alternate or escalation, and Lamp, Spool and Uptime journeys with independent access controls. Paging remains OFF; provider authorization, A2P registration, live delivery, independent standby, real-phone drills and OC-064 reference-load measurements remain required. R-1 and R-2 are dated prior evidence; not-run field rows supply no new proof or authorization. |
| `OC-050` | Incident command, severity and response workflows | target | partial | `src/incident-workflows/`; `src/family/response-operations/incident-controls.ts`; `src/app/IncidentResponseControls.tsx`; `tests/product-browser.mjs` — incidentWorkflowBrowser: template publication, typed declaration, commander checklist, merge, alias and split; `tests/product-browser-journey.mjs` — incidentRolesBrowser: Lead transfer and Scribe and Communications assignment and transfer through native controls, protected HTTP and reloaded values, exact revisions and human-attributed old and new role history, administrator refusals for a responder holding command roles, unchanged paging and zero outbound attempts; desktop assertions and selected role screens at 1440 and 390. Existing keyboardCoordination proves the initial Lead choice. `tests/triage.mjs` retains stale, viewer, authority and workflow custody coverage; `tests/transfer.mjs`; `tests/checkpoint-cli.mjs`; `docs/incidents.md` | Stakeholder update cadence and automatic reminders for unfilled roles, stalled actions and overdue updates need OC-027 timers; current role/action state remains labelled non-automatic. Additional-responder requests that page a named user or policy await OC-068/OC-026. Web/chat workflows await OC-034/OC-067; broader eligible-alert workflow automation awaits OC-043/OC-056’s workflow engine beyond the explicit service response rules. Paging stays OFF. The unbuilt backup-request/chat and browser-closed timer/reminder duties of both acceptance sentences remain this Gap. |
| `OC-051` | Reviewed Lamp and Statuspage communication | target | partial | `src/handoff-api.ts`; `src/family/response-operations/handoffs.ts`; `src/family/response-operations/integrations.ts`; `tests/activation.mjs` | Reviewed minimum handoffs and Lamp-compatible export exist; connected submission, status synchronization and reminders are missing. OC-041 audit and durable crash/lease outcomes for Lamp/Statuspage publication remain this clause's pre-shipping acceptance. |
| `OC-052` | Complete portable target archive and Base replacements | target | done | `scripts/installer/archive-policy.mjs`; `src/portability-policy.mjs`; `tests/transfer.mjs`; `tests/transfer.mjs`; `tests/checkpoint-cli.mjs`; `tests/activation.mjs`; `tests/transfer.mjs` (managed installation transfer); `tests/checkpoint-cli.mjs` (checkpointCli); `tests/activation.mjs` (checkpoint consistency); `tests/runtime.mjs` (automationJourney); `tests/product-browser-journey.mjs` (keyboardCoordination) | |
| `OC-053` | Public API, outbound events and reliable automation | target | done | `tests/runtime.mjs`; `tests/transfer.mjs`; `tests/checkpoint-cli.mjs`; `tests/product-browser-journey.mjs` |  |
| `OC-054` | Operational readiness and switching acceptance | target | partial | `src/api.ts`; `src/delivery.ts`; `tests/runtime.mjs`; `tests/activation.mjs` | Storage health, local flows and honest paging refusal exist; end-to-end production readiness, independent watches and measured paging availability do not. |
| `OC-055` | Drop-in PagerDuty, Opsgenie and Splunk On-Call intake | target | partial | `src/intake/api.ts`; `src/intake/providers.ts`; `src/intake/incumbent.ts`; `src/intake/IncumbentActivation.tsx`; `tests/intake.mjs`; `tests/import-door.mjs`; `tests/product-browser-journey.mjs`; `tests/transfer.mjs`; `tests/checkpoint-cli.mjs`; `tests/routing.mjs`; `docs/compatible-intake.md` | Service-bound and routed compatible intake retains derived generations, attributed acknowledgment and no-effect receipts. Reviewed keyless integration inventory has separate administrator key supply, inactive hash-only custody, explicit activation accepting incumbent and native keys, rotation/revocation, atomic audit rollback and keyless inactive restore. PD v1/v2 identity bounds are 255, Opsgenie 512; identities are refused rather than truncated. Gap: live unmodified sender acceptance (PagerDuty, Opsgenie, Splunk, Datadog and Alertmanager), routed-key import, complete provider character rules and confirmed Splunk/key limits remain unobserved; Splunk 200 and printable-key rules are conservative local assumptions. Proxy URL-log redaction is an operator duty, not proved by these local application tests. Incomplete intake remains OC-059; paging stays OFF. |
| `OC-056` | Alert-only pages, and source recovery that stops paging | target | done | `src/response-policy/`; `src/alert-obligation.ts`; `tests/triage.mjs`; `tests/runtime.mjs`; `tests/intake.mjs`; `tests/intake.mjs`; `tests/product-browser.mjs`; `tests/transfer.mjs`; `tests/checkpoint-cli.mjs`; `docs/incidents.md` |  |
| `OC-057` | Urgency, support hours and per-urgency notification | target | partial | `src/urgency/rules.ts`; `src/urgency/support-hours.ts`; `src/urgency/model.ts`; `src/urgency/api.ts`; `src/urgency/UrgencyPolicy.tsx`; `src/urgency/AlertUrgency.tsx`; `tests/routing.mjs` — urgency routing: severity mapping, no silent lowering, attributed human change and DST previews; `tests/product-browser.mjs` — productBrowserJourney and supportStartBrowser in `tests/product-browser-journey.mjs`: acceptance 8, emitted Settings saves New York weekday 09:00–17:00 hours without holidays; an active low warning at 2026-11-03T08:00:00Z shows the not-automatic notice and exact next support start 2026-11-03T14:00:00Z, with retained rendered history and low urgency after a pre-support reload, unchanged native records and paging jobs and receipts, zero outbound requests and screens at 1440 and 390. Supplemental browser proof retains the current partial judgment and Gap pending reassessment. | Low-urgency-only notification, the absence of voice, SMS and escalation past level one, the 09:00 raise and escalation start, escalation of a high alert and the not-automatic support-start label are not asserted in the cited test, because paging is OFF, Oncall has no timer and the label is not read; the urgency decisions, severity mapping, no silent lowering, the attributed human change and DST previews are asserted. Applying the raise is carried by OC-027 and OC-078, per-urgency notification rules by OC-026, low-urgency escalation behavior by OC-027 and the alert triage list by OC-060; paging stays OFF. |
| `OC-058` | Snooze and acknowledgment-timeout re-trigger | target | partial | `src/incident-deadlines/`; `src/server.ts`; `tests/triage.mjs`; `tests/routing.mjs`; `tests/runtime.mjs`; `tests/member-coordination-browser.mjs`; `tests/transfer.mjs`; `tests/checkpoint-cli.mjs` | Absolute incident snooze and acknowledgment-timeout deadlines persist with actor, duration, due time and outcome. A scheduled workspace/schedule revision guard records one deterministic non-automatic re-trigger obligation, resolves current coverage at firing, and retains an operator-visible failure when the recorded level has no eligible on-call. Default timeout is off; admin publication is versioned. Resolution, source recovery and cancellation stop pending work. Archive, checkpoint and portable recovery retain deadlines held without resuming execution; erasure severs destinations. Gap: actual deadline delivery (OC-026), the unmeasured OC-064 lateness bar, standby takeover (OC-028), Slack/Teams (OC-067), mobile (OC-029) and actual alert-only deadline execution remain unbuilt. Alert-only bulk acknowledgment and no-timer snooze records are exercised under OC-079. The existing model has primary/backup coverage, not a running escalation level; a snooze with no identifiable level records an operator failure rather than inventing one. Recorded obligations only; paging OFF. |
| `OC-059` | Large and partly readable payloads still page | target | done | `tests/intake.mjs`; `tests/runtime.mjs`; `tests/routing.mjs`; `tests/routing.mjs`; `tests/product-browser.mjs`; `tests/transfer.mjs`; `tests/checkpoint-cli.mjs` |  |
| `OC-060` | Incident triage list: search, filters and "mine" | target | partial | `src/triage-api.ts`; `src/triage-store.ts`; `src/triage-alerts.ts`; `src/family/response-operations/triage.ts`; `src/app/IncidentTriage.tsx`; `tests/triage.mjs` — existing 50-incident storm: exact service, urgency, triggered, declared, acknowledged, recorded snoozed and mine cohorts; triageBulkCompletion: independent low-alert retention, populated viewer reads with anonymous and intake-only refusals, attributed acknowledgment and explicit closure, retained history and source-recovery independence despite duplicate intake and source revocation; `tests/product-browser-journey.mjs` — triageFiltersBrowser, invoked by `tests/product-browser.mjs`: rendered IDs and counts agree with protected HTTP, controls and shared URLs, low urgency across reloads, acknowledged and resolved views retained after duplicate and revoked intake, unchanged durable rows, permanent audit and paging records with zero outbound requests; assertions at 1440 and changed-screen proof at 1440 and 390. | Incident search and context, filters, mine, URL and personal saved views and cursor pagination are retained. Recorded snoozes are a read-only triage status, including overdue records; reads never fire or resume execution and declared-status queries remain compatible. Gap: team filtering, foreign-team listing and selection refusals and my-teams privacy across all doors (OC-023); native-mobile storm, mine and shared-query journeys (OC-029). Existing workspace capacity bounds apply; this 50-incident proof supplies no hosted-capacity qualification. Bulk actions remain OC-079. Automatic timers, production paging and delivery, independent standby and real-phone prerequisites remain unchanged. PARTIAL; paging OFF. |
| `OC-079` | Bulk triage actions with per-item results | target | partial | `src/triage-api.ts`; `src/triage-store.ts`; `tests/triage.mjs` — triageBulkCompletion: 50 successful incident acknowledgments with shared operation history and completed retry, incident snooze and merge, stale-source isolation, viewer refusal, audit rollback and inactive archive and restart; triageAlertResolveBounds: authenticated native intake of 1,500 distinct alerts, complete cursor enumeration, 500 selected and separately 1,000 confirmed matching alert-only resolutions with identical-payload continuations, exact successful results, expected revisions and responder history, wrong-count and over-bound refusals, completed retry with only value-free attempt audit, retained source identity, unchanged paging custody and zero outbound requests; existing storm journey: 49 successful acknowledgments and one stale refusal, 50-item viewer refusal, downgrade fencing and declared-incident summary and evidence requirements; `tests/product-browser-journey.mjs` | The replay-safe per-item bulk path is retained: bulk snooze records the existing incident deadline; bulk merge commits each source and target, retained explanations and shared operation ID atomically; alert-only items support acknowledgment, assignment, priority and urgency changes, recorded no-timer snooze and explicit human closure without a declared-incident summary or fabricated source recovery. Exact 500-selected and 1,000-matching execution is observed only for native alert-only resolve; the successful 50-incident acknowledgment is separate proof. Gap: upper-bound execution of other bulk actions remains unproved. Bundled-phone acknowledge-all and resolve-all, acceptance 7 SMS acknowledge-all and OC-071 and OC-082 reply-code and keypress delivery and commits remain unbuilt, with provider authorization, A2P, independent standby and real-phone prerequisites held. Every per-item authority and revision check and declared-incident summary and evidence obligation remains binding. No hosted-capacity, timing, automatic-timer, native-device, delivery or cutover qualification follows; OC-073's failed memory result, predecessor and hosted-measurement-plan prerequisite remain unchanged. PARTIAL; paging OFF. |
| `OC-061` | Business services, stakeholder subscriptions and internal status | target | partial | `src/business-status/`; `src/alert-obligation.ts`; `tests/triage.mjs`; `tests/member-coordination-browser.mjs`; `tests/transfer.mjs`; `tests/checkpoint-cli.mjs`; `tests/activation.mjs` | Explicit member audiences deny stakeholder access by default. Only an active communications owner or admin may override. Impact notices are recorded non-automatic obligations with paging OFF and no sender; email, push and chat delivery (OC-042 custody/OC-029) are not built. Team and channel subscribers, SSO/SCIM assignment (OC-039), the private-team acceptance sentence (OC-023), OC-051 approved updates beyond the absent current source, and mobile remain gaps. Records only; email-list subscriber records are exercised here, and delivery remains under OC-042 with the held SendGrid sender. |
| `OC-062` | Configuration as code with Terraform and OpenTofu | target | missing |  | No implementing flow. No Terraform/OpenTofu provider, dry-run plan endpoint, drift labeling or PagerDuty module converter exists. |
| `OC-063` | Curated automation actions and named executors | target | missing |  | No implementing flow. No action library, runner or executor connector exists. OC-041 audit and durable crash/lease outcomes for library automation and executor actions remain this clause's pre-shipping acceptance. |
| `OC-064` | Stated paging timing bars and reference load | target | missing |  | No implementing flow. No paging exists to measure; no reference-load harness or published measurements exist. OC-041 audit and durable crash/lease outcomes for provider attempts and timing outcomes remain this clause's pre-shipping acceptance. Received from OC-068: phone-within-bar and creator-naming notification remain unproved; paging OFF. |
| `OC-065` | Change events and recent changes for responders | target | partial | `src/changes/api.ts`; `src/changes/providers.ts`; `src/changes/RecentChanges.tsx`; `tests/changes.mjs`; `docs/changes.md` | Native bearer/signed CI, PagerDuty-compatible nested Change Events, repository-bound GitHub deployment, release and merged-PR and signed GitLab deployment intake retain bounded context without paging; service, alert and incident panels show direct-dependency changes over 1–168 hours. Argo CD signed templates and Terraform Cloud SHA-512 run notifications retain bounded context and stable retained identities without alerts or obligations. A visible 1,000-record oldest-first cap protects retained incident context and refuses protected capacity; the workspace byte limit can refuse earlier. `tests/changes.mjs` — **OC-065 named source templates** and **OC-065 bounded oldest-first retention**; `tests/product-browser.mjs` — **OC-065/030 templates and signing settings** at 1440/390; `tests/transfer.mjs` — **sd-oncall-c14 OC-065/030**. Gap: live GitHub/GitLab/Argo CD/Terraform acceptance (dated one-time evidence not run, R-12), mobile panel (OC-029), Slack/Teams summary (OC-067), private-team scope (OC-023), object erasure (OC-040). Argo signing-template and Terraform field assumptions are unverified; Terraform raw-body signatures make no delivery-freshness claim. |
| `OC-066` | International SMS and voice paging for follow-the-sun responders | target | missing |  | No implementing flow. Only the paging refusal exists; no SMS/voice provider, country list, E.164 country check or sender registration exists in any country. Received from OC-024: verified route counts and degraded coverage remain unbuilt. Delivery is OC-080. |
| `OC-080` | International delivery, failover and per-country measurement | target | missing |  | No implementing flow. No international provider, per-country measurement or charge exists; OC-041 audit and durable crash/lease outcomes for international provider attempts remain this clause's pre-shipping acceptance (door rule D-1). |
| `OC-067` | Service alert channels and interactive alert messages | target | missing |  | No implementing flow. No Slack/Teams app, service channel connection or interactive alert message exists. OC-041 audit and durable crash/lease outcomes for chat publication remain this clause's pre-shipping acceptance (door rule D-1). Received duties remain unbuilt: Slack/Teams recent-change summaries (OC-065); Slack/Teams channel subscribers and chat delivery (OC-061). The chat commands are OC-081. |
| `OC-081` | Chat on-call lookup, page and mine commands | target | missing |  | No implementing flow. No chat command exists; Slack/Teams manual pages and responder requests (OC-068) remain unbuilt. |
| `OC-068` | Manual pages, responder requests and paging a person directly | target | partial | `src/manual-pages/model.ts`; `src/manual-pages/Controls.tsx`; `src/api.ts`; `tests/activation.mjs`; `tests/runtime.mjs`; `tests/product-browser-journey.mjs`; `tests/triage.mjs`; `tests/member-coordination-browser.mjs`; `tests/transfer.mjs`; `tests/checkpoint-cli.mjs` | Recorded manual pages retain creator, urgency, optional description/priority, real user/policy targets, versioned user-assignment settings and replay/conflict-safe operation keys. Each responder request has its own accept/decline, timeline response and recorded requester notice; acceptance adds a responder without acknowledging the primary, acknowledgment preserves pending requests, and resolution/requester cancellation ends them. Viewer and stakeholder attempts create nothing. `tests/activation.mjs` proves these public doors and permanent-audit rollback; `tests/runtime.mjs` proves scoped policy-targeted API pages and repeated keys; `tests/product-browser-journey.mjs`, `tests/triage.mjs` and `tests/member-coordination-browser.mjs` exercise web controls and refusals; `tests/transfer.mjs` and `tests/checkpoint-cli.mjs` retain records inactive on archive/checkpoint/portable restore and sever erased destinations. Gap: phone delivery/timing and creator-naming notifications (OC-026/064), mobile (OC-029), Slack/Teams (OC-067, OC-081), per-team and Support-team workspace permissions (OC-023), automatic assignment repeat/escalation (OC-027), and standby continuity (OC-028) remain unbuilt. Role-gated recorded obligations only; paging OFF. |
| `OC-069` | Google Workspace, generic SAML and OIDC sign-in, and just-in-time accounts | target | missing |  | No implementing flow. Sign-in is native owner email links and admin-created local passwords (`src/auth.server.ts`); no Google, SAML or OIDC connection, just-in-time account or required-SSO setting exists. |
| `OC-070` | Email integration modes, trigger and resolve rules | target | partial | `src/server.ts`; `src/email/`; `tests/intake.mjs`; `tests/routing.mjs`; `tests/transfer.mjs`; `docs/compatible-intake.md`; `docs/incidents.md` | No cited test shows two pages and the second generation still escalating (paging is OFF and there are no escalation timers), or imports PagerDuty email settings and Opsgenie filters into a mapping report (OC-038's inherited duty); subject deduplication with one recorded page, custom trigger and resolve rules with source recovery, no-effect resolves, both fallbacks, the pathological regex, per-service keys and zero-write draft replay are asserted. A real inbound provider email is register row R-2. |
| `OC-071` | Notification bundling per responder and channel | target | missing |  | No implementing flow. Paging is OFF and sends refuse (`src/delivery.ts`); no notification composition or bundling exists. Reply codes and keys are OC-082. |
| `OC-082` | Per-message reply codes, voice keys and bundle commits | target | missing |  | No implementing flow. No SMS reply code or DTMF handling exists; bundled-call/SMS acknowledge-all and resolve-all received from OC-060 remain unbuilt. |
| `OC-072` | Routed intake keys that pick the service per event | target | partial | `src/routing/management.ts`; `src/routing/engine.ts`; `src/monitoring/admission.ts`; `src/routing/RoutingWorkspace.tsx`; `tests/routing.mjs`; `tests/intake.mjs` | Workspace-admin compatible and Alertmanager/Grafana/Datadog routed keys choose fixed or dynamic in-scope services with ordered versioned RE2 rules, catch-all/unrouted custody, idempotent attributed re-admission and both routing stages. Read-only replay retains open-generation warnings. Native bearer/HMAC routed credentials reuse native authentication and retain original retry decisions, scoped recovery and secret-free inactive archives (`tests/routing.mjs` / `tests/routing.mjs`). Team authority, SNS routed credentials, incumbent account/router import and move reports, OC-053 routing-management API, Terraform and dated unmodified Alertmanager acceptance remain gaps. Per-key allowances are OC-084. Native authenticated oversized/unparseable input retains bounded incomplete custody and returns 202 (`tests/runtime.mjs`, `tests/routing.mjs`). Record-unrouted retains incomplete-intake alerts with recorded high-urgency integration-owner obligations, while ordinary unrouted events remain receipts; re-admission requires workspace admin; general `/api/replay` lacks routed-key metadata (the routed-key preview retains it). Incomplete intake follows OC-059 (catch-all or unrouted custody with a recorded owner notice; paging inherited by OC-026/OC-068). Paging stays OFF. |
| `OC-083` | Routed keys keep per-service generations, bounds and imports | target | partial | `src/routing/engine.ts`; `src/monitoring/admission.ts`; `tests/routing.mjs`; `tests/intake.mjs` | Per-service generations, scoped recovery and routed incomplete-intake custody are exercised; incumbent account and router import with move reports and SNS routed credentials remain gaps. |
| `OC-084` | Per-key rolling intake allowances | target | partial | `src/intake-rate/`; `tests/routing.mjs` OC-084 per-record rolling allowances; `tests/intake.mjs` OC-084 authenticated email allowance before grouping | Per-key rolling request/event accounting, rotation continuity, isolation, grouped refusal, owner notices and actual-window recovery are exercised through native and currently built compatible/monitoring HTTP doors (`tests/routing.mjs`). Inherently over-allowance atomic batches are refused whole with a machine-readable count/allowance and split/raise instruction, without a fabricated Retry-After (RL-6). Team authority and SNS routed credentials remain unbuilt, so these outcomes are not established through those doors. Email keeps its separate per-address new-receipt allowance. At fixed platform time, 60 distinct authenticated same-subject messages share one generation and recorded obligation; the next message is refused before grouping with exact alert, event, sample and prior D1 custody preserved, one refusal receipt, quarantine and audit. Later refusals add no per-message custody, and another address still admits (`tests/intake.mjs` OC-084 authenticated email allowance before grouping). Receipt capacity remains a separate local storage bound until OC-073. Paging stays OFF. |
| `OC-073` | Intake stays inside the Workers memory limit at stated receipt capacity | target | missing |  | Unbuilt: every request loads the whole workspace (`src/workspace-store.ts` loadWorkspace); local workerd RSS exceeded 128 MB at 4,500 held receipts (sd-oncall-oc072-fix2). |
| `SURFACE-001` | The registry equals this table, and the Base harness passes | target | missing |  | No implementing flow. No MCP door, tool registry or conformance harness exists; machine clients use only the OC-053 service-account API. |
| `SURFACE-002` | Oncall computes each class from the call and its records | target | missing |  | No implementing flow. No tool or server-side class computation exists. |
| `SURFACE-003` | A stranger agent runs a seeded on-call week under two company policies | target | missing |  | No implementing flow. No MCP door, company policy or specialist journey exists. |
| `SURFACE-004` | Configuration, restore and erasure carry every affected class | target | partial | `tests/oncall-agent-erase-replay.mjs` — eraseClasses and eraseReplay through emitted Worker MCP; `tests/agent-door-browser.mjs` — native erasure approval and receiver removal. | Acceptance 4: fresh native erasures compute destructive with conditional access, security and live (live also covers coverage, windowed maintenance, grouping and approved-workflow members, intake and pending deliveries), and retain witnessed facts atomically. Held member erasure redacts its own saved approval; Base returns subject_erased before completed-retry classification, so class-aware replay of that approval still needs a Base seam. Older receipts without facts refuse rather than infer history. Acceptances 1, 2, 3, 5, 6, 7 and 8 remain unproved: intake-key changes, service paging changes, member-update classification, archive restore, SSO, executor settings and remote follow-up synchronization. OC-040 still needs OC-028 standby reconciliation; external deletion, uncertain-send clearance and new erasure categories are omitted. OC-023 team privacy, identity, executor and agent egress authority holds remain; paging stays OFF and provider delivery, independent standby and real-phone proof remain unproved. |
| `OC-045` | Investigate before the responder opens the alert | push-further | partial | `src/family/response-operations/domain.ts`; `tests/runtime.mjs` | Incident/alert/runbook context exists as in the audit; no investigator, telemetry or deploy connector is implemented. OC-041 audit and durable crash/lease outcomes for investigation agent grants and actions remain this clause's pre-shipping acceptance. |
| `OC-046` | Keep ownership and runbooks current from changes | push-further | partial | `src/family/response-operations/domain.ts`; `tests/runtime.mjs` | Services, copied runbooks and human follow-ups exist; change watching/proposals are missing. OC-041 audit and durable crash/lease outcomes for ownership/runbook agent grants and actions remain this clause's pre-shipping acceptance. |
| `OC-047` | Continuously rehearse coverage and standby readiness | push-further | partial | `src/schedule-api.ts`; `src/delivery.ts`; `tests/activation.mjs` | Now/next reveals static gaps and production sends refuse; continuous readiness and scheduled live drills are missing. OC-041 audit and durable crash/lease outcomes for readiness agent grants, actions and drills remain this clause's pre-shipping acceptance. |
| `OC-048` | Bounded remediation with independent recovery evidence | push-further | missing |  | No implementing flow. No remediation planner, production executor or independent recovery integration exists. OC-041 audit and durable crash/lease outcomes for remediation agent grants and executor actions remain this clause's pre-shipping acceptance. |
| `OC-049` | Close the loop on recurrence | push-further | partial | `src/family/response-operations/domain.ts`; `tests/runtime.mjs` | Owned evidenced follow-ups and retained reviews exist; recurrence comparison and follow-through agents are missing. OC-041 audit and durable crash/lease outcomes for recurrence agent grants and actions remain this clause's pre-shipping acceptance. |
| `BASE-AGENT-001` | One MCP door per seed | target | done | `tests/oncall-agent-flow.mjs` — nativeTransport in `tests/oncall-agent-transport.mjs`, through emitted Worker HTTP under autonomous and held company policies: points 1–5 reuse discoverDoor and listedDoor for discovery, modern stateless requests, legacy initialization parity, version refusal, deterministic private cached lists, Origin and HeaderMismatch refusals; point 6 sends an authenticated native resolution padded only with legal JSON whitespace beyond the advertised bound, observes 413 and identical retained tables including native revisions, timeline, permanent audit, replay, approval, review and paging custody, then completes the identical unpadded action through its ordinary policy; point 7 reuses refusalPhase for every undeclared capability, preserving native and decision custody with only capacity bookkeeping and its required refusal audit. All probes retain zero outbound requests. |  |
| `BASE-AGENT-002` | The seed's jobs are tools, through the UI's own actions | target | missing | | Not yet judged through this seed's own doors. |
| `BASE-AGENT-003` | Records are resources | target | missing | | Not yet judged through this seed's own doors. |
| `BASE-AGENT-004` | Business identity and short-lived, audience-bound tokens | target | missing | `tests/oncall-agent-flow.mjs` — consentRevocationMatrix via `tests/agent-door-runtime.mjs`: emitted Worker and D1, both company policies, admitted throwaway agents and retained originating consents, exact still-unexpired bearers refused on the next valid native read and coordination mutation within 60 seconds, no private outcome, unchanged application records, revisions, timeline, approval and review custody and paging records apart from attributed refusal audit and its bookkeeping, zero outbound requests; separately consented controls retain policy-appropriate reads and coordination. | Not yet judged through this seed's own doors. Bounded receiving-door regression evidence is retained without an acceptance judgment. Main’s missing judgment is retained; this bounded receiving-door evidence does not complete the clause. The regression exercises the acceptance-6 receiving-door scenario through signed fixtures only; acceptance 6 remains unjudged. Seed consent revocation and actual Business consent UI and account propagation remain unproved; existing installation agent revocation conformance is not complete consent proof. Acceptances 1 to 5 and 7 remain unjudged here: full metadata and challenge, real sibling-audience refusal, expiration and lifetime judgment, complete scope challenge, query-token nonlogging and unpairing with independent native sign-in. Signed fixtures supply no external-account proof. Model, investigation, ownership, remediation, recurrence and executor flows remain omitted under OC-045, OC-046, OC-048 and OC-049 agent and AI egress authority holds; existing live work, replay-seam and release prerequisites remain unchanged. Paging remains OFF; production delivery, independent standby and real-phone obligations remain unproved. |
| `BASE-AGENT-005` | An agent acts as a person in a role, never more | target | missing | `tests/oncall-agent-flow.mjs` — Business sponsor current-role and suspension journey: acceptance 3 under autonomous and held company policies, exact approval by the named sponsor, one preissued unexpired token, attributed note, viewer write refusal with permitted read, suspension 401, unchanged native records and pending work, zero outbound requests; `tests/oncall-agent-native.mjs` — local-client sponsor demotion. | Not yet judged through this seed's own doors. Main's current missing judgment is retained pending acceptance review; the bounded sponsor-transition assertions do not promote this clause. Acceptances 1, 2, 4 and 5 remain unproved: every-tool and every-role UI parity; complete resource, action and budget grant intersection with argument-widening refusal; self-escalation refusal and permitted self-narrowing; complete hostile-record injection matrix. OC-045, OC-046, OC-048 and OC-049 retain their agent and AI egress authority holds; OC-023 team privacy and scoped ownership remain held. No new grant capability, federation, model or execution authority is claimed; paging remains OFF with production delivery, independent standby and real-phone proof omitted. |
| `BASE-AGENT-006` | Every action declares its risk class | target | partial | `tests/oncall-agent-flow.mjs` — every emitted MCP listed tool declares only fleet-catalog classes; incident resolution classification: emitted MCP declarations, server-computed commitment and sensitive facts, autonomous resolution, isolated commitment and sensitive refusals, pending and stale approval state preservation, caller and record claims, attributed effect-free retry and audit classes; `tests/transfer.mjs` — pinned CLI catalog refusal: passing clean check, one actually exposed tool with an uncatalogued class refused with its tool and class diagnostic, exact declaration-byte restoration and passing clean recheck; `tests/agent-door-browser.mjs` — exact saved incident-resolution approval and attributed once-only resolution; `tests/agent-door.mjs` — generic conformance with the resolution fixture. | Point 5 and only the native incident-resolution slice of points 1, 2, 3 and 6 are proved. Full surface-table equality for every listed tool, every other tool's class combinations, remaining per-class fixtures, injection checks, class facts and refused-call auditing remain unproved here. Model, investigation, ownership, remediation, recurrence and executor flows remain omitted; OC-045, OC-046, OC-048 and OC-049 retain their agent and AI egress authority hold. Paging stays OFF; provider delivery, independent standby and real-phone duties remain held. |
| `BASE-AGENT-007` | The company's policy decides, at one chokepoint | target | partial | `tests/oncall-agent-flow.mjs` — signed native policy adoption, using `tests/agent-door-runtime.mjs` policyAdoption: the same admitted bearer performs native MCP service reads and coordination notes before signed adoption, during refusal and after restoration under autonomous and held policies; immediate standard-class refusal within 60 seconds, new rule and revision in decisions and retained audit, unchanged application and paging state after each refusal, no queued approval, zero outbound requests, and policy-appropriate restoration with the original refusal audit preserved and the restored read, note and approved execution audited at the restored revision. | Acceptance 7 is proved only through the native MCP door; actual Business UI propagation remains unproved. Acceptances 1 to 6 and 8 retain unproved complete tool, class and disposition coverage; setup and upgrade behavior; monetary and daily thresholds; complete multi-class and approval lifecycle matrices; cross-door decision equality; and signature and Business-identity judgments. Model, investigation, ownership, remediation, recurrence and executor flows remain omitted. OC-045, OC-046, OC-048 and OC-049 retain their agent and AI egress authority hold. BASE-AGENT-006, BASE-AGENT-008, BASE-AGENT-011, SURFACE-004 and all release prerequisites remain unchanged. Paging remains OFF; production delivery, independent standby and real-phone obligations remain omitted. |
| `BASE-AGENT-008` | Truthful attribution | target | partial | `tests/oncall-agent-flow.mjs` — person-only coordination: real pending non-erasure resolution approvals and open declaration reviews; valid saved action bodies return person_session_required for agent bearer alone and with the owner cookie under held and autonomous policies, preserving all D1 records, marks, policy, native state and outbound work. Held preparation precedes the autonomous-policy observation. Separate human-session controls retain the actual reviewer and approver, the agent preparer and once-only resolution; existing distinct-responder acceptance remains. | Only acceptance 2's native agent-token approval and Mark reviewed observations are proved here. Acceptance 2's device-token and policy-question outcomes, acceptance 1's full confirmation and class matrix, acceptance 3's form-mode elicitation refusal, acceptances 4 to 6's complete record, activity, export and certificate attribution, and acceptance 7's outside-mail sender proof remain unproved. Device qualification, connected sends, model and executor flows retain their prerequisites; OC-045, OC-046, OC-048 and OC-049 still need agent and AI egress authority. BASE-AGENT-006 live classification and SURFACE-004's held Base replay dependency remain unchanged. Paging stays OFF; production delivery, independent standby and real-phone proof remain omitted. |
| `BASE-AGENT-009` | Every agent action is audited with its class and decision | target | partial | `tests/agent-door-browser.mjs` — weekly-counts: native MCP calls at controlled UTC week boundaries, the complete cursor-paginated audit, all rendered class and decision cohorts at 1440 and 390, each carried class counted once, unchanged durable records across reloads and zero outbound requests. | Only acceptance 3 is proved. Acceptance 1's complete-write schema; acceptance 2's complete refused, pending, unset and self-escalation matrix; acceptance 4's exact review feed, attributed Mark reviewed and reversible Undo; acceptance 5's filters and full-field export; acceptance 6's removed-agent retention; and acceptance 7's whole-page accessibility remain unproved here beyond existing cited proof. Cross-seed Business reporting, model and executor activity and every unbuilt execution class retain their obligations. OC-045, OC-046, OC-048 and OC-049 retain their agent and AI egress authority hold; BASE-AGENT-006 and SURFACE-004 remain unchanged. Paging stays OFF; delivery, independent standby and real-phone duties remain held. |
| `BASE-AGENT-010` | Agents can follow changes | target | missing | | Not yet judged through this seed's own doors. |
| `BASE-AGENT-011` | Limits are policy, and Pause stops everything | target | partial | `tests/oncall-agent-flow.mjs` — independent Pause flags via `tests/agent-door-runtime.mjs` pauseMatrix: emitted Worker and D1, both company policies, valid next MCP read and coordination mutation refused within 60 seconds, independent flag clearing, bearer resume refused even with the owner cookie, unchanged native and paging state, zero outbound requests, attributed human coordination and policy-appropriate resume. `tests/agent-door-browser.mjs` — the same matrix through the signed-in Pause agents and Resume agents controls; local, Business-only and resumed screens at 1440 and 390; pending dispatch approval remains refused during local Pause. | Acceptances 1 to 5 remain unproved: request-rate refusal, recipient caps, provider spend caps, no-cap spending and the complete usage view; paid AI spend caps are explicitly not enforced. Acceptance 6 proves only the native local control and signed fixture policy-adoption door, not actual Business UI propagation or device continuity. Model and provider spending and executor flows remain omitted under OC-045, OC-046, OC-048 and OC-049 authority holds. BASE-AGENT-006 and SURFACE-004 holds remain unchanged. Paging remains OFF; production delivery, independent standby and real-phone prerequisites remain. |
| `BASE-AGENT-012` | Writes are idempotent and conflict-safe | target | missing | `tests/oncall-agent-flow.mjs` — droppedDeclarationReplay, invoked by `tests/runtime.mjs`: real MCP declaration response destroyed at headers without reading its body under autonomous and held policies; native D1 confirms the original call and incident before a new JSON-RPC id replays the stored structured outcome, with one declaration, one application revision and state-changing audit commit, a separate linked replay-attempt audit, one original held review and zero outbound requests. `tests/agent-door-runtime.mjs` — discardToolResponse uses the real HTTP socket with no response-body consumer. `tests/oncall-agent-flow.mjs` — changedArgumentConflicts, invoked by `tests/runtime.mjs`: completed standard-only oncall.incidents.declare and oncall.notes.add under autonomous and held policies; changed title or note text with the original key returns isError and idempotency_conflict, preserving native records, revisions, timeline, state-changing audit, original call and outcome custody, approvals, reviews and paging; exact original arguments with a new JSON-RPC id return the stored outcome without another effect or held review, with zero outbound requests. `tests/agent-door-runtime.mjs` — agentEffectSnapshot compares retained effects, allowing attempt audit and capacity bookkeeping. `tests/oncall-agent-flow.mjs` — staleNoteRevision: autonomous and held MCP note calls carry the current required native revision and a stale optional expected revision; both return isError, revision_conflict and the exact current_revision in metadata and text, preserving native records, revisions, timeline, state-changing audit, replay, approval, review and paging custody apart from refusal audit and capacity bookkeeping. A fresh key using that returned revision adds one attributed note with the autonomous or open-review outcome; retry preserves that single effect and review, with zero outbound requests. `tests/oncall-agent-flow.mjs` — staleCoordinationRevision, invoked by `tests/runtime.mjs`: on separate ordinary incidents, oncall.incidents.acknowledge and oncall.actions.create carry the current required native revision and stale optional expected_revision under autonomous and held policies. Each refusal returns isError and revision_conflict with the exact authorized parent current_revision in metadata and text and no private structured result, preserving native records, revisions, timeline, state-changing permanent audit, original calls and outcomes, approvals, reviews and paging. A fresh key using the returned revision produces one agent-attributed acknowledgment naming an active responder or one owned, due-dated P1 human-review follow-up that remains open, with the autonomous or single open-review outcome. An identical-argument retry with a new JSON-RPC id returns the stored result without another effect or review; missing and scoped-out targets return not_found without a revision or private result, with zero outbound requests. `tests/oncall-agent-service-replay.mjs` — changedServiceNameReplay, invoked by `tests/oncall-agent-flow.mjs` through `tests/runtime.mjs`: under autonomous and held policies, a completed standard-only oncall.services.update changes only the authorized service name, retaining environment, owner, runbook, pager and dependencies, with one workspace revision and an agent-attributed native service audit. Reusing its original key and projected ETag with only another schema-valid name returns isError and idempotency_conflict in metadata and text without private structured content. Exact original arguments with a new JSON-RPC id return the stored result and original review identity, without another native effect or held review; native records, revisions, incident timelines, state-changing audit, original call and outcome custody, approvals, reviews and paging remain unchanged apart from attributed refusal and linked replay-attempt audit and capacity bookkeeping, with zero outbound requests. | Main's missing judgment is retained; these bounded acceptance-2 and acceptance-3 observations do not complete the clause. Acceptance 2 is proved only for the shipped oncall.incidents.declare tool. Acceptance 1's complete mutating-tool coverage, acceptance 3's remaining tools and argument combinations, acceptance 4's remaining current-revision diagnostics, acceptance 5's foreign-person job-handle refusal, the full 24-hour retention bar and long-work status independent of the Tasks extension remain unproved here. Erasure and approval replay, including SURFACE-004's ambiguous hold and Base seam, are outside this slice; BASE-AGENT-006's live campaign is not repeated. Model, investigation, ownership, remediation, recurrence and executor flows remain omitted; OC-045, OC-046, OC-048 and OC-049 retain their agent and AI egress authority hold. Paging stays OFF; production delivery, independent standby and real-phone duties remain held. Acceptance 3 is proved here only for changed declaration title, standard-only note text and the standard-only service name edit under both company policies; its remaining tools and argument combinations remain unproved. Acceptance 4 is proved here only for a stale optional expected revision on oncall.notes.add, oncall.incidents.acknowledge and oncall.actions.create under both company policies; this bounded observation does not complete the clause, and acceptance 4's other tools and native required-revision diagnostics remain unproved. |
| `BASE-AGENT-013` | Manifest, docs and the conformance journey | target | missing | `scripts/write-agent-surface.mjs` — native registry generation and freshness check; `tests/oncall-agent-flow.mjs` — complete generated and served guide inventory against emitted Worker discovery under autonomous and held policies, maintained computed-class fixture references, unchanged native and paging state with zero outbound requests; `tests/agent-door-browser.mjs` — rendered inventory agrees with live MCP under both policies, desktop assertions and guide proof at 1440 and 390; `tests/agent-door.mjs` — existing computed-class execution through the Base conformance journey. | Main's missing judgment is retained; this bounded native inventory proof does not complete the clause. Acceptances 1 and 2 are proved only for the current native surface: all 39 exposed tools, their scopes, possible classes and maintained class-test fixture IDs; the source manifest retains 40 tools but withholds oncall.events.list, and no resource templates are exposed. Gap: unshipped tools and their class and test documentation; undeclared resources, events and prompts; complete discovery-instruction generation and judgment; acceptance 3 complete harness rejection matrix; acceptance 4 every-point coverage under both policies; acceptance 5 stranger-agent specialist completion. OC-045, OC-046, OC-048 and OC-049 retain the agent egress authority hold; model, investigation, ownership, remediation, recurrence and executor flows remain omitted. Existing BASE-AGENT-005 work and BASE-AGENT-006 and BASE-AGENT-008 holds, SURFACE-004 ambiguous hold and Base replay seam, and all release prerequisites remain unchanged. PARTIAL; paging OFF; no production delivery, independent standby, real-phone or publication authority. |
