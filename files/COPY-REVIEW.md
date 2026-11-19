# Released copy review

Author: Run Edit Run fleet. Recorded: 2026-11-19T21:38:28Z.

Lamp source boundary: v1.11.23 at 199a635758939ab54b12f3a76dabeee68ab74b8f to v1.11.24 at 3f1349f029fa8c8c59bf9adfe4e2ae59fd502842.
The committed sync reads CONTRACT.md, README.md and seed.json at the displayed released tag.
The initial copy-only apply found no drift at v1.11.23. After applying the eligible version,
a second copy-only apply recorded the actual v1.11.24 contract and seed hashes without changing public prose.

Changed source rows and the JE decision:

- CONTRACT.md, PAGE-009 requirement and acceptance points 1–2 (around source row 271): configured-zone local time and zone name remain public; exact offsets move to Time details. JE src/data/seed-pages.ts Lamp rows 281–352 make no timestamp or tooltip promise. Preserve all wording.
- CONTRACT.md, NOTIFY-003 supplementary evidence and NOTIFY-001 status row: retry proof is recorded and NOTIFY-001 changes from partial to done in the released source. JE has no NOTIFY-001 promise row, and this listing round cannot promote seed implementation status. Preserve the existing NOTIFY-004, NOTIFY-009 and other promise text and partial-evidence follow-up.
- seed.json row 4: version 1.11.23 becomes 1.11.24. Update only the JE version and generated public listing.
- README.md is unchanged in the release comparison and the recorded hash remains 402e33bfc617555f.

No public claim was proved false by the changed released rows, so no public claim was edited.
Other five released paths had unchanged displayed-version copy hashes.
Coming-soon/unreleased copy was not imported or probed: later-seed work is explicitly paused until 25 November.
Existing Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C),
and Spool ERR-006 (D) remain exactly as on main.

Relevant actual released-source patches:

```diff
@@ -271,11 +271,11 @@ The primary journey: An operator sets up the page and components, accepts eviden
 
 #### PAGE-009 — Time display
 
-**Requirement.** Public timestamps and notifications use the configured time zone and offset. Under RL-1, the owner’s S4 exception permits a relative generation label while scripting runs.
+**Requirement.** Public timestamps use the configured time zone, named on the page with exact UTC offsets available in Time details. Feeds and notifications retain absolute timestamps with the configured offset. Under RL-1, the owner’s S4 exception permits a relative generation label while scripting runs.
 
 **Acceptance.**
-1. Every public and notification timestamp displays the configured time zone and UTC offset; page timestamps retain their exact ISO instant as machine-readable data.
-2. With scripting available, the generation label is relative and refreshes while the page stays open; its tooltip retains the absolute configured-zone time and offset and its machine-readable value retains the instant.
+1. Public page timestamps use the configured zone’s local time and name, with exact UTC offsets in Time details and ISO instants as machine-readable data. Feed and notification timestamps retain the configured UTC offset.
+2. With scripting available, the generation label is relative and refreshes while the page stays open. Its tooltip gives the absolute configured-zone time, Time details gives the offset, and its machine-readable value retains the instant.
 3. Initial HTML and script-disabled readers see the absolute generation time; incident, maintenance, feed and notification timestamps remain absolute.
 
 #### PAGE-010 — Atom feed
@@ -3182,11 +3182,13 @@ Supplementary PAGE-014 evidence from `cloud/sd-lamp-c-f46` is retained on `cloud
 
 HIST-010 retains current-main's partial judgment, Evidence and recorded Gap. The replay of candidate `8948805cd26ebcf81bdca770fa6b865a9f8744f7` adds complete-record assertions in `tests/e2e/helpers/traffic-alerts-flow.mjs` and `tests/e2e/helpers/traffic-resolution-flow.mjs` (run through the existing INCIDENT-010 registration in `tests/e2e/update-reminders.test.mjs`): immediate and backdated 409 refusals preserve the complete ordered incident, draft, update, note and audit rows; the immediate override's exact private reason and operator identity appear in independently read note and audit inventories and not in the public incident; the reopened incident's next unreasoned resolution leaves stored rows unchanged; a due-time elevated-traffic hold preserves the complete saved scheduled draft (wording, author, schedule, channels) and all rows; and near-baseline scheduled publication consumes that draft, leaves override note and audit inventories unchanged and records one ordinary publication audit with a null reason and passing recovery evidence. These assertions supplement the evidence; they do not change the clause judgment, which stays with the clause judge.
 
+NOTIFY-003 retry proof from the replay of `b230f541de4a00168670888ce74e1fdad91bb16e` exercises durable eligibility, five exponential retries over one hour, terminal subscriber and update reconciliation, and replay silence in `tests/e2e/delivery-contract.test.mjs`. In `tests/e2e/rer-mail.test.mjs`, Cron stays silent before eligibility and submits the original frozen envelope after the isolated Worker clock advances, across RER, Resend and SendGrid. The recorded partial judgment and gap remain in the status table. Run Edit Run fleet, 2026-11-19.
+
 | Clauses | Done | Partial | Missing | Total |
 | --- | ---: | ---: | ---: | ---: |
-| Published | 44 | 63 | 0 | 107 |
+| Published | 45 | 62 | 0 | 107 |
 | Target and push further | 20 | 62 | 55 | 137 |
-| All | 64 | 125 | 55 | 244 |
+| All | 65 | 124 | 55 | 244 |
 
 | Clause | Title | Kind | Status | Evidence | Gap |
 | --- | --- | --- | --- | --- | --- |
@@ -3317,7 +3319,7 @@ HIST-010 retains current-main's partial judgment, Evidence and recorded Gap. The
 | `SUB-020` | Subscriber limits are stated, enforced and reported | target | partial | `tests/e2e/statuspage-import.test.mjs` (MOVE-002 — SUB-017 and SUB-020 imports keep history silent, CSV dry runs write nothing, pending subscribers need explicit invitations, and capacity refuses excess without writes), `tests/e2e/helpers/subscriber-limits-flow.mjs` (subscriberLimitsFlow, subscriberChannelLimitsFlow) and `tests/e2e/delivery-contract.test.mjs` (subscriberLimitsBrowserFlow). A direct fixture-database setup inserts 24,998 subscriptions and two public opt-ins reach 25,000; script-free public POSTs for a new and an existing address return identical 409 pages with Atom/RSS links, create nothing and send nothing. Recorded operator mail receives each 80% and 100% alert once; full Follow-ups remain until below capacity. The 300-into-100-free import and CSV each name an excess of 200, refuse exactly those rows, and refuse apply without changing any application table or mail; narrowed fresh dry runs apply. A full installation also refuses a single-row import unchanged. Saved and recorded fixed-origin API responses with 5,000 and 25,000 subscribers fit without narrowing. Pending/active counts and webhook/chat sublimits are enforced atomically. Subscribers (/app/subscribers), Move in, Follow-ups and full-capacity public pages pass axe, overflow and hydration checks at 1440/390. This is fixture admission proof, not a 25,000-recipient delivery qualification. | Old cited evidence asserts total capacity; the full seeded webhook channel refuses another destination; freeing one webhook slot admits a pending subscriber; that pending subscriber exhausts the recovered webhook slot. Unasserted: the reported combined-chat count and limit are explicitly 1000; incident subscriptions consume capacity; deleted subscribers release capacity; each channel count in Settings browser assertions; no subscriber row in any other state is created; every channel crossing alert; the full-channel refusal creates no subscriber in another state. |
 | `SUB-023` | Import subscriber capacity | target | partial | `tests/e2e/statuspage-import.test.mjs` (MOVE-002 — SUB-017 and SUB-020 imports keep history silent, CSV dry runs write nothing, pending subscribers need explicit invitations, and capacity refuses excess without writes), `tests/e2e/helpers/subscriber-limits-flow.mjs` (subscriberLimitsFlow, subscriberChannelLimitsFlow) and `tests/e2e/delivery-contract.test.mjs` (subscriberLimitsBrowserFlow). A direct fixture-database setup inserts 24,998 subscriptions and two public opt-ins reach 25,000; script-free public POSTs for a new and an existing address return identical 409 pages with Atom/RSS links, create nothing and send nothing. Recorded operator mail receives each 80% and 100% alert once; full Follow-ups remain until below capacity. The 300-into-100-free import and CSV each name an excess of 200, refuse exactly those rows, and refuse apply without changing any application table or mail; narrowed fresh dry runs apply. A full installation also refuses a single-row import unchanged. Saved and recorded fixed-origin API responses with 5,000 and 25,000 subscribers fit without narrowing. Pending/active counts and webhook/chat sublimits are enforced atomically. Subscribers (/app/subscribers), Move in, Follow-ups and full-capacity public pages pass axe, overflow and hydration checks at 1440/390. This is fixture admission proof, not a 25,000-recipient delivery qualification. | Old cited evidence asserts move-in excess named; move-in refused rows; CSV excess named; CSV refused rows. Unasserted: move-in database comparison asserted in tests/e2e/helpers/subscriber-management-fixture.mjs outside the old Evidence set; CSV database comparison asserted in tests/e2e/helpers/subscriber-management-fixture.mjs outside the old Evidence set; the narrowed apply persists all expected non-subscriber records; the over-limit apply creates no subscriber in another state; the email-free apply persists the expected source component; the fitting CSV apply actually stores one pending subscriber. |
 | `SUB-024` | Pre-launch page | target | missing |  | Built on this branch (owner-controlled switch, five refusing routes, noindex header and robots.txt); the judge has not yet recorded it against `tests/e2e/delivery-contract.test.mjs`. |
-| `NOTIFY-001` | What notifies subscribers | published | partial | `tests/e2e/delivery-contract.test.mjs` | Old cited evidence asserts only the previously described delivered slice. It does not assert: first incident notification; subsequent incident notification; resolution notification; maintenance lifecycle notification events; component change silence or opted-in replacement. |
+| `NOTIFY-001` | What notifies subscribers | published | done | `tests/e2e/delivery-contract.test.mjs`; `tests/e2e/delivery-contract.test.mjs` (SUB-019 SUB-001 SUB-002 SUB-003 SUB-004 SUB-005 SUB-006 SUB-007 SUB-008 SUB-009 SUB-010 SUB-011 SUB-012 SUB-013 SUB-016 SUB-017 SUB-018 SUB-020 PAGE-013 HIST-007 TEAM-003 TEAM-004 UPDATE-008 NOTIFY-007 — Subscriber consent, selected publication, channel delivery, export and erasure); `tests/e2e/publishing-contract.test.mjs` (Maintenance reminders respect the lead time and skip recent announcements); `tests/e2e/publishing-contract.test.mjs` (INCIDENT-001 INCIDENT-002 INCIDENT-003 INCIDENT-004 INCIDENT-005 INCIDENT-006 INCIDENT-007 INCIDENT-008 INCIDENT-009 INCIDENT-013 HIST-005 HIST-008 NOTIFY-015 UPDATE-001 UPDATE-002 UPDATE-003 UPDATE-004 UPDATE-005 UPDATE-007 UPDATE-008 UPDATE-011 UPDATE-012 UPDATE-013 COMP-006 HIST-001 HIST-002 HIST-003 AGENT-005 AUTO-004 UPTIME-009 — reviewed incident from private template to immutable updates, recovery, report and audited deletion) | |
 | `NOTIFY-002` | Delivery time | published | partial | `tests/e2e/delivery-contract.test.mjs` | Old cited evidence asserts 1000 recipient-capture records exist for the event; 1000 attempts carry provider identifiers; 1000 messages reach the capture adapter; five-minute measured bound. Unasserted: every expected eligible recipient has a provider acceptance without a missing recipient hidden by duplicates. |
 | `NOTIFY-003` | Retry | published | partial | `tests/e2e/delivery-contract.test.mjs` | Old cited evidence asserts six total attempts; durable failed outcome; the failure event identifies the expected delivery; the failure event identifies the expected notification event. Unasserted: exponential backoff timing over one hour. |
 | `NOTIFY-004` | Delivery log, without tracking | published | done | `tests/e2e/delivery-contract.test.mjs`, `tests/e2e/delivery-contract.test.mjs`; `tests/e2e/delivery-contract.test.mjs` (Failing subscriber destinations deactivate with reasons, alert the webhook contact and suppress queued and future notifications); `tests/e2e/delivery-contract.test.mjs` (NOTIFY-013 NOTIFY-002 NOTIFY-003 NOTIFY-004 NOTIFY-005 NOTIFY-007 NOTIFY-008 NOTIFY-010 — Owner-selected provider fallback preserves frozen notifications and reconciles delivery receipts) | |
@@ -1,7 +1,7 @@
 {
   "id": "lamp",
   "name": "Lamp",
-  "version": "1.11.23",
+  "version": "1.11.24",
   "maturity": "ui-port-local-runtime",
   "category": "status",
   "spine": {
```
