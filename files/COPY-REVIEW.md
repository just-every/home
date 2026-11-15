# Released-source review

Author: Run Edit Run fleet. 2026-11-15T05:05:49Z

HappyToHelp v0.4.28 is commit 41fb40246d2e69f928be397c48d952d147c39160. CONTRACT.md is byte-identical to v0.4.26 (truncated SHA-256 ae8feea8b7998aa7). README.md changes release/installer/migration/local-size documentation; seed.json changes only version. No public claim is proven false by these changes, so no claim text is edited.

The release README discusses implementation and local synthetic qualification separately from hosted/provider acceptance. Existing eight partial-evidence promise follow-ups remain C; no contract status is promoted.

Supporting released-source rows:

## README.md

40: ## Release 0.4.28
41: 
42: Deploy version 0.4.28, tagged **`v0.4.28`** once published. v0.4.26 is the upgrade baseline; the release upgrade checks cover v0.4.26, v0.4.25 and v0.4.24. The pinned installer is rer 0.2.117.
43: 
44: This release includes the content of the tagged but unreleased v0.4.27. Credential-shaped notification test fixtures blocked source scanning for that tag; they now use short example markers. The local size documentation also reflects the qualified rer 0.2.117 results. v0.4.26 remains the previous public release.
45: 
46: - **Reports:** summary and team reports read indexed, message-bearing date cohorts, with separate timing distributions and SLA breakdowns. Workload reads the selected cohort and older active backlog while a maintained inventory preserves historical empty buckets. Overlapping handle sessions still include older tickets worked in the interval. Report evidence, labels and permissions remain live reads; these projections are not cached report totals.
47: - **Conversations and knowledge:** transcript assembly reuses article references within a response and skips article-free source arrays. Socket replay reads bounded pages of raw message and ordered attachment projections, then renders current knowledge and rechecks authority before sending. Message corrections, attachment changes and erasure update the replay data while retaining event identities. An attachment index narrows message reads, and a solved-time index narrows the scheduler’s due cohort without changing rule eligibility or cursor order.
48: - **Backup and restore:** derived report projections are excluded from portable archives and rebuilt after source rows and current write triggers are restored. Historical archive handling skips these derived backfills when the original inventory lacks their source subsystems. Keep normal backups and the installation’s existing custody and recovery requirements.
49: - **Installer and mail settings:** the managed integration recipe now carries the complete native migration inventory and current binding declarations. Public mail validation covers native SendGrid and Mailgun as well as Resend, Cloudflare and the managed relay. Explicit off, none or disabled selections normalize to mail off and remove stale public provider settings from emitted plans; private bindings remain separately selected and checked. This does not activate mail or establish provider readiness.
50: - **Local size tooling:** the pinned rer installer advances from 0.2.112 to 0.2.117. A seed-owned declaration exercises the built application with disposable synthetic local installations, exports SQL statement artifacts and supports a deliberate unbounded-read rejection exercise. Selected source and migration changes and daily scheduled verification use the shared build with queue consumers disabled for size measurement. This local tooling does not qualify live-provider limits or real-customer scale; synthetic text and attachment distributions and scheduled-consumer completion remain limitations.
51: - **Fresh hosted installs:** after the full migration inventory and this Worker are installed, normal writes maintain the new report and replay projections and existing reads use the new indexes. On an empty database there is no historical cohort or replay data to backfill. Managed recovery still requires compatible platform custody and a verified assertion; SQL alone enables no recovery authority. Legacy import and adoption remain inert until a package is imported through the approved flow. Updating starts no import and activates no mail provider; live hosted delivery and provider qualification remain separate.
52: - **Migrations:** four since v0.4.26, bringing the inventory from 196 to 200 files. `333_report_cohorts.sql` is additive: it creates report tables, a view, indexes and maintenance triggers and immediately backfills derived membership, workload and bucket-presence rows without rewriting business rows. `334_media_message_reads.sql` adds only the media-message read index. `335_socket_replay_projection.sql` is additive to the outbox schema: it adds nullable raw-message and media columns, immediately fills existing outbox rows from retained native data, and installs synchronization triggers. It therefore writes derived data on upgrade. `336_solved_time_rule_reads.sql` adds only the solved-time expression index. Apply missing migrations once in filename order before the new Worker serves HTTP or queue traffic. Migration 326 remains absent.
53: 
54: Update from v0.4.26 without resetting; v0.4.25 and v0.4.24 are also upgrade baselines. Back up D1, R2, Durable Object state, private settings and installation encryption custody, then stop the old Worker. Use Node 22.20.0, pnpm 10.12.4 and pinned rer 0.2.117. Retain native owners, permissions, support history, files, erasure fences and every applied migration identity. On v0.4.26 apply 333_report_cohorts.sql, 334_media_message_reads.sql, 335_socket_replay_projection.sql and 336_solved_time_rule_reads.sql once in that order. On v0.4.25 or v0.4.24 first apply the missing 330_identity_recovery.sql once even though 331 and 332 are already recorded, then apply 333 through 336 in filename order. Retain earlier published buyer steps, including 332’s conditional cleanup; older installations first apply every other missing published migration in filename order. Finish all missing migrations BEFORE the new Worker serves HTTP or queue traffic. Report and replay backfills run during migration; report projections are rebuilt after portable restore. There is no migration 326. Keep the durable recovery revocation watermark on rollback, and require fresh Managed custody binding after portable restore. Run `rer deploy --dry-run` against the retained installation before any separately authorized deployment. Legacy v1 remains cleanup-only and incomplete cleanup remains pending. No reset, mail activation, recovery adoption, production import, cutover or production deployment is authorized by this preparation.

## seed.json

1: {
2:   "id": "happytohelp",
3:   "name": "HappyToHelp",
4:   "version": "0.4.28",
5:   "license": "MIT",
6:   "repository": "https://github.com/just-every/run-happytohelp",
7:   "maturity": "Owner-installable MIT source release. Local verification and hosted, real-provider and accessibility acceptance are separate; see ACCEPTANCE.md.",

## CONTRACT.md

153: #### CONVERSATION-001 — Durable transcript
154: 
155: **Requirement.** Customer, operator, generation, import and administrative writers preserve stable message/command identity, revision/frontier, attachment ownership and final-reply admission atomically. Competing or repeated writes cannot admit two incompatible final replies. Owner/admin contact erasure removes message content while keeping identity, revision and frontier, so erased transcripts stay coherent.
156: 
157: **Acceptance.**
158: 1. Race visitor, operator, model and import writers through conversation routes with duplicate and lost responses; admit only compatible final replies.
159: 2. Erase a contact through the owner door and verify coherent identity/revision/frontier with content removed.
160: 
161: #### DELIVERY-001 — Live delivery and recovery
162: 
163: **Requirement.** Persist before broadcast; reconnect/outbox replay and socket authorization recover committed messages after reload, disconnection or process wake. Provisional AI deltas never become durable final answers until guarded admission succeeds.
164: 
165: **Acceptance.**
166: 1. Disconnect/reconnect widget and operator sockets after persisted writes, restart the runtime and recover the same committed messages/attachments; unauthorized replay is denied and superseded AI deltas never become final replies.
175: #### MOVE-IN-001 — Reviewed history import
176: 
177: **Requirement.** Current workspace owner/admin reviewers privately upload, inspect per-kind plans, source-located omissions, rejections, conflicts and publication changes, then explicitly apply bounded, resumable imports of conversations, contacts, tags, saved replies and articles. Preserve source identities, timestamps, private notes and publication state; reject unsupported meaning rather than inventing it. Recheck current role and workspace authority for apply, resume and whole-import undo. Retain immutable source custody and conflict-safe reversal journals. Imports and undo send no mail, widget messages, model requests, assignment or connection notifications; imports are excluded from Reports. Native tag controls enforce workspace scope. RL-2 requires exact business-state repeat/undo equality, including contacts, conversations, messages, private notes, tags, source links and every other imported business table. Only platform counters/sequences, audit history and import journals are excluded. Synthetic 1,000-conversation datasets for Zendesk and Help Scout qualify this local flow.
178: 
179: **Acceptance.**
180: 1. Through Move in, exercise all five kinds, source custody, per-row omissions/rejections/conflicts, current-role denials, inert apply/resume/repeat/undo and exact business-state equality for synthetic 1,000-conversation Zendesk and Help Scout datasets; counters/sequences, audit and journals are the only named exclusions.
181: 
182: #### OUTCOMES-001 — Resolution feedback and provenance
183: 
184: **Requirement.** Current original visitor sessions may rate a closed resolution with thumbs up/down and an optional comment up to 1,000 characters. Changes retain history; reopened cycles cannot receive the previous resolution's rating. Operators retain access to each past resolution's latest feedback after reopening; visitor eligibility and report denominators remain tied to the current cycle. Erasure removes rating comments. Confirmed operator-sent drafts establish assisted outcomes, otherwise confirmed human replies establish human outcomes. AI requires a complete visible answer history without a person handoff; missing evidence remains unknown. Status, assignment and cancellation transitions recheck current authority atomically.
185: 
186: **Acceptance.**
187: 1. Close, rate, rerate, reopen and close again via widget/operator routes; prevent previous-session/cycle feedback, retain old-cycle operator visibility, redact erased comments and verify human/assisted/AI/unknown attribution from actual visible answers.
188: 
189: #### REPORTS-001 — Workspace calendar reports
190: 
191: **Requirement.** Native conversations created in the workspace IANA calendar range with at least one persisted message form the cohort; Move in and legacy imports are excluded. First visitor-to-visible-answer response and creation-to-first known-resolution durations use median and nearest-rank p90. Each conversation contributes its latest closed cycle once to outcome and satisfaction rates. Reopened conversations leave those denominators. Aggregate queries return bounded data; CSV streams every matching conversation with formula-safe cells. Empty widget conversations stay durable but are excluded from Reports and its analytics CSVs. A separate step-up guarded JSON export includes all workspace conversations, messages, private notes and attachment names across dates and imports; attachment bytes stay in the portable backup.
192: 
193: **Acceptance.**
194: 1. Compare Reports and formula-safe CSV to hand-calculated response/resolution median and p90, latest-cycle outcome and satisfaction cohorts across DST and tenants, including more than 10,000 rows and excluded imports/reopened cycles.
195: 
196: #### CONNECTIONS-001 — Workspace integrations
197: 
198: **Requirement.** Owner/admin tokens have explicit scopes, optional expiry, one-time display, hashed storage and durable audit. Bearer-only API calls have no CORS, per-token limits and native guarded writes. Contact erasure fences API identity restoration and pending event payloads. Native events commit tenant-bound webhook and Slack intents; historical import apply and undo do not emit them. Slack projects bounded native visitor text through Base escaping. The owner-authorized ordinary HTTPS exception retains redirect refusal, bounded requests/responses and literal-destination checks instead of DNS pinning (RL-3). See [the full transport exception](docs/contract/support-protocols.md).
199: 
200: **Acceptance.**
201: 1. Issue, use, expire and revoke each scoped show-once token; exercise native API operations, erasure fences, signed events and Slack escaping.
212: #### AI-001 — Configured model execution
213: 
214: **Requirement.** Retain Ensemble model selection, context/tools, streamed events, normalization, raw per-round provider usage, attribution, bounded suggestions and reply lifecycle. Missing providers fail explicitly when AI is asked for, and a default assistant whose provider has no key is simply not assigned to new conversations; uncertain provider attempts remain uncertain and are not replayed automatically. Usage is diagnostic/provider accounting data, not an active payment, balance or debit system. Visitor-caused model work carries the classes of its eventual action, and the company’s policy sets its project and installation AI spending limits; a skipped reply is recorded as terminal and never replayed. Each workspace's AI reply mode is auto (the default), draft or off: in draft AI writes only drafts its team sends themselves, in off AI generates nothing, no AI-authored message reaches a customer in draft or off by any path (a local computer agent's reply becomes a draft its operator sends themselves, and a visitor whose assistant will not answer is handled as one without an assistant), in draft or off a conversation whose visitor has written since its assistant last answered is listed in the team's normal views as one without an assistant, and switching back to auto releases nothing queued, written or due during that time.
215: 
216: **Acceptance.**
217: 1. Request configured suggestions/replies through native routes; inspect normalized streaming events, per-round usage, context/tool and budget bounds, explicit missing-provider errors and durable daily-cap skips; crash/ambiguous attempts must not automatically replay.
233: #### DELEGATION-001 — Explicit local authority
234: 
235: **Requirement.** Pairing, devices/grants, revocation, tool context and work/result states preserve investigation, resolve and advance-authorized resolve-and-reply distinctions. Revocation withdraws authority and never asserts that a local process stopped: started work becomes terminal with an unconfirmed outcome, and only the device may report cancellation. Local processes remain in the optional connector, never an implicit Worker capability. Agent calls use the company’s policy for their computed classes; any approval or review in this journey is under the held company policy.
236: 
237: **Acceptance.**
238: 1. Under the held company policy, pair the packaged connector, investigate, separately authorize a child fix, obtain a distinct read-only observation and use human Send with exact-request replay.
239: 2. Under the held company policy, refuse stale/revoked/offline/unverified/uncertain work and distinguish resolve from advance-authorized resolve-and-reply; revocation cannot assert process cancellation.

## Other path seeds

The initial tool run reported no copy-source drift for Lamp, Uptime, Oncall, Orbit or Spool at their already-displayed published versions. Their final refs remain:

- Uptime: v0.5.11 at 04016399e1e879e7be3b8e891baf02d975bb3901
- Lamp: v1.11.16 at 429a46081ce68bab2dbdae46b8402b8ccce3ee2a
- Orbit: v0.4.9 at a5f471626aea1bfcb2c79f5dbee2250fdb38fd49
- Oncall: v0.5.14 at 4d1fc62d4d2b8bf90008ac87bbaa626bc1a5494b
- Spool: v0.7.11 at b9e7e575097e0dd0fc0662ce1ed507fa0d41f0d8

No mark/colour/status/homepage follow-up was emitted in the actual six-path output. Clearing Lamp’s previously seen open-finding hash is normal mechanical state bookkeeping; its source and public wording stay the same.

Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D) are preserved. Later seeds remain paused until 25 November, so coming-soon/unreleased drift is not imported or newly surveyed.
