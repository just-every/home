
## happytohelp
| Incumbents a buyer switches from | Zendesk, Intercom (with Fin), Help Scout, Freshdesk (agent baseline: Decagon, Sierra, Pylon) |

### MOVE-IN-001

JE sentence: Imports are reviewed before anything is written, send no messages to your customers, can be undone as a whole, and keep source dates, private notes and publication state.
Status: done

Gap: none

Released clause:

#### MOVE-IN-001 — Reviewed history import

**Requirement.** Current workspace owner/admin reviewers privately upload, inspect per-kind plans, source-located omissions, rejections, conflicts and publication changes, then explicitly apply bounded, resumable imports of conversations, contacts, tags, saved replies and articles. Preserve source identities, timestamps, private notes and publication state; reject unsupported meaning rather than inventing it. Recheck current role and workspace authority for apply, resume and whole-import undo. Retain immutable source custody and conflict-safe reversal journals. Imports and undo send no mail, widget messages, model requests, assignment or connection notifications; imports are excluded from Reports. Native tag controls enforce workspace scope. RL-2 requires exact business-state repeat/undo equality, including contacts, conversations, messages, private notes, tags, source links and every other imported business table. Only platform counters/sequences, audit history and import journals are excluded. Synthetic 1,000-conversation datasets for Zendesk and Help Scout qualify this local flow.

**Acceptance.**
1. Through Move in, exercise all five kinds, source custody, per-row omissions/rejections/conflicts, current-role denials, inert apply/resume/repeat/undo and exact business-state equality for synthetic 1,000-conversation Zendesk and Help Scout datasets; counters/sequences, audit and journals are the only named exclusions.

### CONVERSATION-001

JE sentence: Customer and agent messages are stored once, and two conflicting final replies can never both be accepted.
Status: partial

Gap: Main re-audit: unasserted in the cited Evidence set: model writer race; import writer race; lost-response final-reply race. Asserted: competing visitor revisions admit one writer; exact duplicate replay; changed replay refused; stale operator frontier refused; operator admission; erased message identity; erased message revision; erased message content removed; erased transcript frontier. Prior-reference qualification (before test consolidation): Carried-done audit: unasserted in the cited Evidence set: model writer race; import writer race; lost-response final-reply race. Asserted: competing visitor revisions admit one writer; exact duplicate replay; changed replay refused; stale operator frontier refused; operator admission; erased message identity; erased message revision; erased message content removed; erased transcript frontier.

Released clause:

#### CONVERSATION-001 — Durable transcript

**Requirement.** Customer, operator, generation, import and administrative writers preserve stable message/command identity, revision/frontier, attachment ownership and final-reply admission atomically. Competing or repeated writes cannot admit two incompatible final replies. Owner/admin contact erasure removes message content while keeping identity, revision and frontier, so erased transcripts stay coherent.

**Acceptance.**
1. Race visitor, operator, model and import writers through conversation routes with duplicate and lost responses; admit only compatible final replies.
2. Erase a contact through the owner door and verify coherent identity/revision/frontier with content removed.

### DELIVERY-001

JE sentence: Messages are saved before they are shown live, so a reload or dropped connection recovers everything that was sent, and an AI draft never becomes a final answer until it is safely accepted.
Status: partial

Gap: Carried-done audit: unasserted in the cited Evidence set: widget reconnect replay; operator reconnect replay; runtime restart replay; committed messages recovered; committed attachments recovered; unauthorized replay denied; superseded provisional AI never becomes final. The cited registry invokes the delivered workflow, but its helper assertions are not named in this clause’s old Evidence set; no direct outcome assertion is claimed here.

Released clause:

#### DELIVERY-001 — Live delivery and recovery

**Requirement.** Persist before broadcast; reconnect/outbox replay and socket authorization recover committed messages after reload, disconnection or process wake. Provisional AI deltas never become durable final answers until guarded admission succeeds.

**Acceptance.**
1. Disconnect/reconnect widget and operator sockets after persisted writes, restart the runtime and recover the same committed messages/attachments; unauthorized replay is denied and superseded AI deltas never become final replies.

### OUTCOMES-001

JE sentence: Customers can rate a resolution with a thumbs up or down and a short comment, and comments are removed if the contact is erased.
Status: partial

Gap: Main re-audit: unasserted in the cited Evidence set: rerating retains history; other actors cannot rate; revoked session cannot rate; reopened cycle cannot use previous rating; erasure redacts comment history. Asserted: close and initial eligible rating; rerating preserves latest value; expired session cannot rate; second close has a distinct cycle; operator reads past-cycle feedback after reopen; erasure redacts current comments; human outcome from visible answer; assisted outcome from visible answer; AI-only outcome from visible answer; missing provenance stays unknown.

Released clause:

#### OUTCOMES-001 — Resolution feedback and provenance

**Requirement.** Current original visitor sessions may rate a closed resolution with thumbs up/down and an optional comment up to 1,000 characters. Changes retain history; reopened cycles cannot receive the previous resolution's rating. Operators retain access to each past resolution's latest feedback after reopening; visitor eligibility and report denominators remain tied to the current cycle. Erasure removes rating comments. Confirmed operator-sent drafts establish assisted outcomes, otherwise confirmed human replies establish human outcomes. AI requires a complete visible answer history without a person handoff; missing evidence remains unknown. Status, assignment and cancellation transitions recheck current authority atomically.

**Acceptance.**
1. Close, rate, rerate, reopen and close again via widget/operator routes; prevent previous-session/cycle feedback, retain old-cycle operator visibility, redact erased comments and verify human/assisted/AI/unknown attribution from actual visible answers.

### REPORTS-001

JE sentence: Reports use your own calendar and time zone, count each conversation once, and export to a spreadsheet file that is safe to open.
Status: done

Gap: none

Released clause:

#### REPORTS-001 — Workspace calendar reports

**Requirement.** Native conversations created in the workspace IANA calendar range with at least one persisted message form the cohort; Move in and legacy imports are excluded. First visitor-to-visible-answer response and creation-to-first known-resolution durations use median and nearest-rank p90. Each conversation contributes its latest closed cycle once to outcome and satisfaction rates. Reopened conversations leave those denominators. Aggregate queries return bounded data; CSV streams every matching conversation with formula-safe cells. Empty widget conversations stay durable but are excluded from Reports and its analytics CSVs. A separate step-up guarded JSON export includes all workspace conversations, messages, private notes and attachment names across dates and imports; attachment bytes stay in the portable backup.

**Acceptance.**
1. Compare Reports and formula-safe CSV to hand-calculated response/resolution median and p90, latest-cycle outcome and satisfaction cohorts across DST and tenants, including more than 10,000 rows and excluded imports/reopened cycles.

### AI-001

JE sentence: With no AI key, the AI is simply not assigned to new conversations and your team keeps them; your company's policy sets AI spending limits and uncertain attempts are never silently repeated.
Status: partial

Gap: Carried-done audit: unasserted in the cited Evidence set: configured suggestion; configured reply; normalized stream events; per-round usage; bounded context; bounded tools; policy budgets; missing-provider error; durable daily skip; crash never replays; ambiguous attempt never replays. The cited registry invokes the delivered workflow, but its helper assertions are not named in this clause’s old Evidence set; no direct outcome assertion is claimed here.

Released clause:

#### AI-001 — Configured model execution

**Requirement.** Retain Ensemble model selection, context/tools, streamed events, normalization, raw per-round provider usage, attribution, bounded suggestions and reply lifecycle. Missing providers fail explicitly when AI is asked for, and a default assistant whose provider has no key is simply not assigned to new conversations; uncertain provider attempts remain uncertain and are not replayed automatically. Usage is diagnostic/provider accounting data, not an active payment, balance or debit system. Visitor-caused model work carries the classes of its eventual action, and the company’s policy sets its project and installation AI spending limits; a skipped reply is recorded as terminal and never replayed. Each workspace's AI reply mode is auto (the default), draft or off: in draft AI writes only drafts its team sends themselves, in off AI generates nothing, no AI-authored message reaches a customer in draft or off by any path (a local computer agent's reply becomes a draft its operator sends themselves, and a visitor whose assistant will not answer is handled as one without an assistant), in draft or off a conversation whose visitor has written since its assistant last answered is listed in the team's normal views as one without an assistant, and switching back to auto releases nothing queued, written or due during that time.

**Acceptance.**
1. Request configured suggestions/replies through native routes; inspect normalized streaming events, per-round usage, context/tool and budget bounds, explicit missing-provider errors and durable daily-cap skips; crash/ambiguous attempts must not automatically replay.

### DELEGATION-001

JE sentence: Revoking a computer's access ends its authority at once, and HappyToHelp never claims that work already running there was stopped.
Status: partial

Gap: Carried-done audit: unasserted in the cited Evidence set: packaged connector pairing; read-only investigation; separately authorized child fix; distinct read-only observation; human Send; exact-request replay; stale work refused; revoked work refused; offline work refused; unverified work refused; uncertain work not replayed; resolve versus resolve-and-reply; revocation does not assert cancellation. The cited registry invokes the delivered workflow, but its helper assertions are not named in this clause’s old Evidence set; no direct outcome assertion is claimed here.

Released clause:

#### DELEGATION-001 — Explicit local authority

**Requirement.** Pairing, devices/grants, revocation, tool context and work/result states preserve investigation, resolve and advance-authorized resolve-and-reply distinctions. Revocation withdraws authority and never asserts that a local process stopped: started work becomes terminal with an unconfirmed outcome, and only the device may report cancellation. Local processes remain in the optional connector, never an implicit Worker capability. Agent calls use the company’s policy for their computed classes; any approval or review in this journey is under the held company policy.

**Acceptance.**
1. Under the held company policy, pair the packaged connector, investigate, separately authorize a child fix, obtain a distinct read-only observation and use human Send with exact-request replay.
2. Under the held company policy, refuse stale/revoked/offline/unverified/uncertain work and distinguish resolve from advance-authorized resolve-and-reply; revocation cannot assert process cancellation.

### CONNECTIONS-001

JE sentence: API tokens have chosen scopes, are shown once, are stored hashed and can expire; an unclear webhook result is not sent again.
Status: partial

Gap: Main re-audit: unasserted in the cited Evidence set: issued token has exact scopes; issued token has expiry; show-once secret; hashed secret storage; unsafe literal destination refused; outgoing byte bound. Asserted: scoped native API use; token revocation; token expiry; erasure replay fences; signed events; Slack escaped customer text; redirect target never requested; declared response bound; streamed response bound; timeout remains uncertain; server error remains uncertain; uncertain work never replays; rate-limit retry retains same event. Prior-reference qualification (before test consolidation): Carried-done audit: unasserted in the cited Evidence set: show-once secret; hashed secret storage; unsafe literal destination refused. Asserted: issued token has exact scopes; issued token has expiry; scoped native API use; token revocation; token expiry; erasure replay fences; signed events; Slack escaped customer text; redirect target never requested; outgoing byte bound; declared response bound; streamed response bound; timeout remains uncertain; server error remains uncertain; uncertain work never replays; rate-limit retry retains same event.

Released clause:

#### CONNECTIONS-001 — Workspace integrations

**Requirement.** Owner/admin tokens have explicit scopes, optional expiry, one-time display, hashed storage and durable audit. Bearer-only API calls have no CORS, per-token limits and native guarded writes. Contact erasure fences API identity restoration and pending event payloads. Native events commit tenant-bound webhook and Slack intents; historical import apply and undo do not emit them. Slack projects bounded native visitor text through Base escaping. The owner-authorized ordinary HTTPS exception retains redirect refusal, bounded requests/responses and literal-destination checks instead of DNS pinning (RL-3). See [the full transport exception](docs/contract/support-protocols.md).

**Acceptance.**
1. Issue, use, expire and revoke each scoped show-once token; exercise native API operations, erasure fences, signed events and Slack escaping.
2. Refuse redirects/unsafe literal destinations and over-limit traffic; preserve timeout, streamed bounds, uncertain 500 without replay and bounded 429 behavior under the recorded HTTPS override.

### IDENTITY-003

JE sentence: Teammates can sign in with an authenticator app or a security key plus one-time recovery codes, and an owner can require it for everyone or by role.
Status: partial

Gap: Carried-done audit: unasserted in the cited Evidence set: TOTP enrollment; role policy forces factor enrollment; single-use recovery codes; missing factor refused; wrong factor refused; replayed TOTP refused; used recovery refused; passkey sign-in; owner reset needs own step-up; reset notification; reset audit; refund needs recent step-up; export needs recent step-up; installation owner recovery; existing no-factor sessions revoked. The direct enrollment call asserts only HTTP 201. Enrollment state and recovery-code assertions are in `tests/helpers/identity/two-factor.mjs`, outside the carried Evidence set.

Released clause:

#### IDENTITY-003 — Two-factor authentication for native accounts

*Tier:* Core · *Cites:* BASE-SIGNIN-002, BASE-ACCESS-002, BASE-AGENT-006, BASE-AGENT-008

**Requirement.** Native accounts have ten single-use recovery codes shown once, alongside the shared native-factor duty. An owner can require two-factor sign-in for every teammate or by role; affected users must enroll at their next sign-in before reaching any data, and existing sessions without the factor end.  Owner-assisted reset of a teammate's factor requires the owner's own recent factor, notifies the teammate and is audited; an owner who loses every factor recovers through the documented installation-level owner recovery through `rer`, never by email alone. Refund and billing approval (COMMERCE-001, BILLING-001), integration and credential installation, exports, erasure, role changes and the two-factor policy itself require a recent second-factor step-up. API access uses scoped tokens (CONNECTIONS-001), never a password alone. SSO users follow their identity provider's MFA (ACCESS-001). This adds to the retained native password identity (IDENTITY-002) and never replaces it.

**Acceptance.**
1. As owner require two-factor sign-in; sign in as a support operator and be forced to enroll TOTP and receive recovery codes; sign out and verify refusal without the factor, with a wrong code, with a reused code and with a used recovery code; sign in with a passkey.
2. Reset the support operator’s factor as owner with a step-up and observe the notification and audit.
3. Approve a test refund and start an export with and without a recent step-up; recover a locked-out owner through `rer`; verify sessions without the factor ended when the policy was turned on.

### PORTABILITY-001

JE sentence: You can export your conversations, files, contacts, help articles, settings and history in one checked archive and restore it into a clean installation; sign-ins and provider secrets are left out.
Status: partial

Gap: Carried-done audit: unasserted in the cited Evidence set: nonempty target refused. Asserted: source destroyed before restore; clean independent install; each populated portable business record; native support store equality; every attachment byte; R2 metadata equality; erasure fences preserved; corrupt archive refused; oversized archive refused; refusal has no partial restore; restored work is inert; Durable Object history captured; interrupted business action state retained inertly.

Released clause:

#### PORTABILITY-001 — Complete customer-owned portable support data

*Tier:* Core · *Cites:* BASE-DATA-001, BASE-BACKUP-001, BASE-SECRET-001

**Requirement.** Export versioned machine-readable conversations, attachments, contacts/companies, knowledge/versions, settings, rules/procedures/evaluations, outcomes and audit with the documented support-data inventory. Validate a bounded archive before atomic inactive restore to a clean installation; do not transfer sessions, provider secrets or connector authority and do not replay imported actions. Include D1, R2 and Durable Object business state or a lossless reconstruction; retain erasure fences and receiving-owner identity. This target replaces the current documented incomplete-storage boundary without pretending the held Base-data equivalence is done.

**Acceptance.**
1. Through rer export/import and owner data controls, populate each business store, export, destroy the disposable source and restore to a clean installation.
2. Compare every portable record and attachment byte, preserve erasure fences, refuse corrupt/oversized/nonempty targets and verify all restored work is inert until separately authorized.
3. Include Durable Object history and interrupted actions.

## oncall
| Incumbents a buyer switches from | PagerDuty, Opsgenie / Jira Service Management, Splunk On-Call (VictorOps) |

### OC-012

JE sentence: Oncall sends no texts, calls or push alerts, so your existing pager stays in charge while you use it.
Status: done

Gap: none

Released clause:

#### OC-012 — Paging off

**Requirement.** Production paging is OFF, and the existing pager is authoritative (RL-1). Every normal-installation delivery attempt refuses with an explanation that an independent standby and a real-phone drill are required. No production paging provider sends, synthetic delivery proof, cron delivery, SMS, voice or push are performed. Escalation policies are inspectable configuration data, not active timers. A labeled demo simulation is not production delivery or acceptance. Native cutover additionally requires OC-026 to OC-029 and OC-038 real-phone and provider-failure acceptance.

**Acceptance.**
1. On a normal installation, each delivery, job, tick, callback and resume door returns the paging-OFF refusal and creates no receipt.
2. Demo simulations are treated as simulations.

### OC-006

JE sentence: Oncall sends signed response events only to endpoints an administrator approves; paging stays off, and email is for sign-in links only.
Status: done

Gap: none

Released clause:

#### OC-006 — Bounded outbound incident effects

**Requirement.** In release 1, only signed OC-053 response events to an endpoint a current administrator explicitly approved may leave the incident workspace (RL-2). No paging provider notification, AI call, production action or Lamp publication occurs in release 1. Configured remote mail sends sign-in links only. Handoffs are minimum summaries with stable identity and visibility; an exported draft is explicitly unreviewed. Source links grant no access. External acceptance, delivery and acknowledgment are distinct later records. Approved OC-053 events are proved under OC-053.

**Acceptance.** On a normal installation with no approved OC-053 endpoint:
1. Coordination and handoff preparation and export create no paging receipt, production action, AI call or external publication.
2. Draft exports remain unreviewed, and source links confer no access.

### OC-005

JE sentence: A runbook is copied into the incident when it is declared, so later edits never rewrite instructions mid-incident.
Status: done

Gap: none

Released clause:

#### OC-005 — Copied runbooks

**Requirement.** Runbooks are copied into the incident at declaration; future service edits never silently rewrite incident instructions. Follow-ups carry owner, due date, open or completed state and completion evidence. Resolved incidents retain open work and editable review.

**Acceptance.**
1. Declare an incident and edit its service runbook, and the copied incident steps remain unchanged; an owned, due-dated action requires completion evidence; unfinished work and the review are retained after resolution.

### OC-004

JE sentence: Resolving an incident needs recovery evidence and a summary, and every change is recorded in an attributed timeline.
Status: done

Gap: none

Released clause:

#### OC-004 — Incident state transitions

**Requirement.** Incident state transitions are explicit. Acknowledgment assigns responsibility. Resolution requires recovery evidence and a summary, independently of alert recovery. Optimistic revision checks reject stale edits. All accepted changes append an attributed timeline transactionally with state. Any active responder or admin can attest recovery and follow-up evidence; attestation is a human claim, not automatic measurement verification. This resolution rule governs declared incidents; an alert-only page that its source recovers closes without a human summary under OC-056.

**Acceptance.**
1. Declare from admitted alerts and acknowledge; stale and concurrent changes are rejected; the source alert clears; resolution without evidence and a summary is refused; the incident then resolves, and its attributed timeline reads back over HTTP.

### OC-008

JE sentence: Incident records you write are never deleted automatically.
Status: done

Gap: none

Released clause:

#### OC-008 — User-authored records kept

**Requirement.** Authored incident records are kept through restart and export. Ingress accepts bounded structured fields. Provider and incumbent-compatible intake retain bounded structured evidence and no raw bodies under OC-059. Native Events API parsing is bounded to 64 KiB; authenticated oversized, malformed or incomplete native input retains only its first 64 KiB or fewer of exact raw bytes as untrusted incomplete custody under OC-059, never parsed or routed from that prefix. Incumbent-compatible endpoints and provider adapters use the larger per-provider bounds of OC-059. There is no arbitrary remote fetching or runbook execution. Complete retention controls are OC-040.

**Acceptance.**
1. Over-limit and malformed intake is neither parsed nor retained beyond its bound, and over-limit command input is refused.
2. Hostile structured text and runbook links display literally, with no script execution and no fetch.
3. Authored history is preserved after restart and export.

### OC-011

JE sentence: Rotations hand over by wall-clock time in your named zone, and clock-change gaps show up as visible gaps.
Status: done

Gap: none

Released clause:

#### OC-011 — Calendar-day rotations

**Requirement.** Named-zone calendar-day rotations retain fixed primary and backup member slots. Hand-offs use the wall minute plus integer civil days, not fixed elapsed seconds. Repeated minutes explicitly choose earlier, later or reject; nonexistent or rejected boundaries produce visible gaps. Override intervals include their start and exclude their end; an overlap in the same role is rejected. Inactive, viewer and missing members do not shift slots. A duplicated primary and backup assignment leaves the backup unavailable.

**Acceptance.**
1. Save primary and backup schedules and query the HTTP preview across spring and fall DST, ambiguous and nonexistent minutes, override edges and an overlap refusal; inactive, viewer and missing slots are retained as gaps, and duplicate primary and backup responders are detected.

### OC-003

JE sentence: Viewers can only read, responders coordinate, and admins manage; alert-sending credentials grant no read access, and removed access stops on the next request.
Status: done

Gap: none

Released clause:

#### OC-003 — Roles and authority

**Requirement.** Incident changes require an active authorized human session or an explicitly scoped OC-053 service-account capability (RL-2). A machine is attributed as a service account and never gains human-session, member-management or human-review authority. Viewer reads; responder coordinates; admin manages services, policies, members and import. All active members see all workspace incident data, and admin, responder and viewer permissions are separate from incident-commander attribution. Ingest credentials grant no read or human authority. Bearer and signed intake return only `duplicate`, the stored event `id`, the source `eventId`, `service`, `observedAt` and `acceptedAt` (201 accepted; 200 deduplicated). Routing decisions, snapshots and alert identities stay behind authorized read and export doors; scoped OC-053 reads disclose only granted service records, and archive and export authority remains session-protected. The status-only stakeholder role, with no incident, alert, runbook or archive access, is specified and tracked in OC-061.

**Acceptance.**
1. Anonymous, expired, revoked, viewer, responder and admin sessions each get their role's outcome on reads, commands, sources and archives, and a real HTTP mutation held open while its author is revoked or downgraded publishes nothing.
2. Minimal intake receipts disclose no private routing data.

### OC-002

JE sentence: Replaying alert routing only reads: it creates no alert, incident or outside effect.
Status: done

Gap: none

Released clause:

#### OC-002 — Routing replay

**Requirement.** Retain the routing policy version and explanation at admission. Release 1 routes coordination ownership, with no timed escalation or paging. Replay is read-only: it returns the historical decision, ownership, policy and evaluation snapshot beside the proposed current decision, in submitted order, and produces no alert, incident or external effect; it does not claim schedule replay. Unmatched signals remain visible and unowned; suppression reasons remain inspectable.

**Acceptance.**
1. Admit a severity-routed event, change the policy and replay it: the immutable admission explanation is compared with the proposed decision in submitted order, and durable state is unchanged before and after (zero writes).

### OC-021

JE sentence: A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused.
Status: done

Gap: none

Released clause:

#### OC-021 — Move-in preview

**Requirement.** The shared Base import-kit D1 file door accepts PagerDuty, Opsgenie, Splunk On-Call, Jira Service Management Ops and Better Stack saved exports. Preview writes zero native objects; retained upload custody, plan snapshots and grant/bookkeeping rows exist. A current administrator must review the exact source fingerprint before applying. Users are matched by normalized email and grant no login rights; schedules and policy data stay paused. Original bytes, unmapped fields, rejected objects, the journal and provenance are retained. Every unmappable rotation or rule is named; no partial rotation approximation is allowed. Missing detail exports reject. No account or API calls or routing credentials are activated. Complete incumbent migration and real-export acceptance remain OC-038. The shared file door and its proof limits are documented in [Move-in](docs/move-in.md#shared-file-door-implementation-and-proof-limits).

**Acceptance.**
1. Following the provider export instructions, saved Opsgenie and PagerDuty list and detail bundles preview with zero native-object writes, exact rejected and unmapped rules and fingerprints are shown, and the apply stays paused, with people and services explicitly mapped before native coverage is adopted.

### OC-022

JE sentence: A move-in can be undone, and edits you made afterwards are kept rather than overwritten.
Status: done

Gap: none

Released clause:

#### OC-022 — Resume and undo

**Requirement.** Journaled imports support bounded resume after restart and explicit undo. SQL checks current actor, session and admin authority inside publication and reversal. Changed source identities require a reviewed catch-up through the shared door; outside that lifecycle they conflict. Duplicate unchanged sources are idempotent. Undo removes only unchanged attributed native objects; edits are preserved with an explicit conflict. Invalid input or failed publication leaves prior committed state unchanged; partial progress remains visible and resumable.

**Native proof.** In `tests/activation.mjs`, the per-vendor “unfinished checkpoint” journey applies one bounded batch of a PagerDuty or Opsgenie saved file, proves its checkpoint is strictly inside the reviewed total, restarts the Worker, and completes the same job and fingerprint. It compares the committed prefix unchanged, checks each remaining object exists once, retries the completed job without new effects, and undoes exactly that import while native membership and paging state remain unchanged. The injected native SQL failure and expired publication lease legs distinguish rolled-back publication from retained partial effects that require explicit rollback. The same file's saved-response journeys cover unchanged replay, and its native-edit and later-import journeys preserve records under `NATIVE_EDIT_CONFLICT` and `IMPORT_SUPERSEDED`, including revoked-session refusal. In `tests/import-door.mjs`, the PagerDuty account HTTP journey revokes Business import authority inside the committing batch, injects publication failure, and checks unchanged native records; its identical-byte and reviewed catch-up journeys cover unchanged and changed identities. These are synthetic saved-file proofs with imported objects inactive and paging OFF; live account conversion and cutover remain with OC-038 and OC-074.

**Acceptance.**
1. Apply, interrupt and restart, resume and undo both vendor imports over HTTP; revoke authority at publication, inject an SQL failure, replay unchanged and changed identities, and preserve native edits as named undo conflicts.

## spool
| Incumbents a buyer switches from | Sentry, Datadog Error Tracking, Rollbar, Bugsnag (SmartBear) |

### ERR-003

JE sentence: Error details are scrubbed before they are stored: emails, tokens and passwords are removed, and headers, cookies and request bodies are not kept by default.
Status: done

Gap: none

Released clause:

#### ERR-003 — Scrub before storage

**Requirement.** Apply the native allowlist, bounded text, query/fragment removal and sensitive-text scrubbing before persistence. Native envelopes contain no headers, cookies, request bodies or personal user identity; the `user` interface that unmodified Sentry SDKs send is governed by SDK-008's project identity policy instead. An optional random installation identifier supports bounded exposure measurement; it is never a name or address. Telemetry, source and notes are untrusted data and cannot authorize execution. The event fields SDK-010 keeps from unmodified Sentry SDKs (frame local variables, SDK-sent source context lines, exception values, tags, contexts, request, extra and thread stacks) pass through these scrubbers and SDK-003's server-side rules before storage, and default secret names are masked inside frame variables. Default protection persists when SDK-003 and CTX-002 introduce opt-in context; those captures require their own field policies and previews. Redaction does not promise removal of arbitrary semantic personal data.

**Acceptance.** Privacy canaries ingested through public ingest:
1. are absent from stored events;
2. are absent from issue views;
3. are absent from evidence packets;
4. are absent from archives;
5. are absent from alert delivery content;
6. while the ordinary diagnostic content beside them survives.

### ERR-004

JE sentence: Owner sign-in, error sending and read-only agent access are separate, revoking one takes effect on the next request, and your source maps are never public.
Status: done

Gap: none

Released clause:

#### ERR-004 — Separated authority

**Requirement.** Every private API/document checks the current owner session or its exact ingest, deploy or read-only project grant itself. Cookie writes enforce same origin. Revocation and identity fencing take effect on the next request; confidential maps are never public. Ingest cannot read, deploy can only register releases/upload artifacts and record deployment starts/callbacks, and read-only agent grants cannot mutate. TEAM-001 extends this model to collaborative membership without broadening existing credentials.

**Acceptance.** Each private transport:
1. refuses an anonymous call;
2. refuses a wrong-scope grant;
3. refuses a foreign-project grant;
4. refuses a revoked grant on the next request;
5. refuses an identity-fenced grant;
6. leaves state unchanged after every denied write;
7. and a direct map URL reveals no private bytes.

### ERR-002

JE sentence: An error is only counted once it is fully saved, and a repeated send never counts twice.
Status: done

Gap: none

Released clause:

#### ERR-002 — Atomic acceptance

**Requirement.** Accepted means a sanitized occurrence, its group aggregate and its local new/regression alert commit atomically. Retry identity is project plus event ID and SHA-256 of canonical original accepted JSON before scrubbing: identical retry never increments, changed raw content conflicts even if its sanitized result matches. Raw bytes are not retained. Group algorithm version and basis remain inspectable.

**Acceptance.** Through public ingest:
1. An event ingested twice yields one occurrence and one aggregate increment.
2. It raises one local alert.
3. The same event ID with a changed raw secret is an explicit conflict, with no partial rows.

### ERR-006

JE sentence: Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm.
Status: done

Gap: none

Released clause:

#### ERR-006 — Audited triage and regression

**Requirement.** Revision-checked open, acknowledged, resolved and suppressed changes are audited. An issue resolved in its current release reopens as a regression on a recurrence in a later release; delayed older-release events cannot invent one. For native version-1 events the order is the registered sequence, never guessed semver; Sentry events follow the project's stated rule in SDK-028, including releases later enriched by registration. SDK-009 carries resolve in the next or a named release and plain Resolve, and plain Resolve regresses on the next accepted event in any release; TEAM-004 inherits resolution from a commit's release, and TEAM-003 carries same-release recurrence policies, bulk actions and collaborative triage. Recognized JavaScript bundle hash suffixes do not split grouping; native anchors and reported frames stay immutable. Corrections retain exact occurrence provenance and reversible fenced apply/undo.

**Acceptance.**
1. A captured issue resolved in its current release reopens as a regression when its fingerprint arrives in a newer release.
2. A later event from an older release does not reopen it.
3. Split and merge previews through the owner HTTP door and the issue view move nothing.
4. Split and merge apply and undo through the owner HTTP door and the issue view.
5. A stale revision is refused.
6. Original membership stays inspectable after apply and undo.

### ERR-007

JE sentence: The evidence packet is size-limited and never includes your source code.
Status: done

Gap: none

Released clause:

#### ERR-007 — Sanitized evidence packet

**Requirement.** A compatible v1 packet exposes issue/lifecycle/grouping, retained release sequence and per-event release/build/environment, generated/original coordinates, immutable diagnostics beside current lookup, links and coded coverage gaps. UTF-8 JSON is bounded to 256 KiB and ten events, removing oldest events first and naming included/available counts even if none fit. It excludes source snippets, sourcesContent and artifact bytes. It carries the latest computed repair observation and newest three owner-recorded repairs, with omitted history named. CLI and stdio MCP keep exact-project read authority and untrusted/no-execution labels; they cause no model egress.

**Acceptance.**
1. The same packet reads through HTTP, the CLI and the official MCP transport, with equal projections.
2. At the size boundary the oldest events are removed first and the included and available counts are named.
3. At the retention, import and loss boundaries the packet carries each coded coverage gap.
4. The packet carries no secrets.
5. It carries no source bytes.
6. Reading it performs no write.
7. A cross-project read is refused.

### ERR-008

JE sentence: Counts of errors accepted and rejected are visible, and a quiet period is never reported as proof an error is fixed.
Status: done

Gap: none

Released clause:

#### ERR-008 — Loss counters and repair observation

**Requirement.** Expose windowed accepted/rejected/budget outcomes, SDK-reported discards by category and reason, and unknown pre-transport loss. Reported discarded errors are a loss input and prevent a quiet feed from proving a repair; other discarded categories do not imply lost errors. Only the owner records revision-checked repair links, scrubbed notes, checks, approval/merge/deploy facts and an exercised-flow record. Links are HTTPS origin/path text and never fetched. Manual repair writes send no notifications or external work. Compute recur/reasoned inconclusive/no-recurrence-after-exercise from stored release sequence, maps, events, exercise and loss; list older-release events separately. Missing exercise, capture, map, exposure or retention yields inconclusive. Never label a quiet feed fixed. Repair recurrence counts retained native admission membership, current membership and exact occurrence membership during the repair's lifetime, even after further corrections or undo; any applied or undone correction involving the issue leaves a `grouping_changed` coverage gap, so without retained recurrence its observation is inconclusive. AI-004 adds rate-based live proof.

**Acceptance.**
1. The owner records a repair through the HTTP door.
2. Every project-grant write to repairs is denied, with the rows unchanged.
3. A deployed repair with no events reads inconclusive, with a named reason.
4. A healthy exercised window reads no recurrence after exercise.
5. An older-release event is listed separately and does not count as recurrence.
6. A loss case reads inconclusive.
7. A recurrence reads recurred.
8. Manual repair records send no notification and start no external work.
