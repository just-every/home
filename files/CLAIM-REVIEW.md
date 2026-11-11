# R5 claim review

All 30 promise sentences below are unchanged from main. The released CONTRACT.md bytes match the CONTRACT.md hashes already recorded on baseline main; only source version/ref and non-contract source hashes advanced. Status is the seed’s judgment, not a judgment promoted by this gate. Partial evidence alone is not source proof of falsity. Summary and “What it does” copy are also unchanged; the rendered body comparison, after normalizing only the three version strings, is identical to main.

## uptime v0.5.5

| Clause | Seed status | JE sentence | Source/status judgment |
| --- | --- | --- | --- |
| STATE-001 | partial (CONTRACT.md:1512) | One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |
| EVIDENCE-001 | done (CONTRACT.md:1511) | Every scheduled check and every retry is kept with its time, result and error type, and a retry never erases an earlier failure. | Done in the released status table; no contradictory released-source statement found. |
| NOTIFY-001 | done (CONTRACT.md:1523) | Only confirmed incident changes send automatic alerts, and a test send never changes a monitor's status. | Done in the released status table; no contradictory released-source statement found. |
| DELIVERY-001 | done (CONTRACT.md:1524) | Each alert gets one automatic send per destination where a repeat could double up, an unclear outcome is not sent again, and 'accepted' is never reported as 'read'. | Done in the released status table; no contradictory released-source statement found. |
| DRILL-001 | done (CONTRACT.md:1527) | An alert drill sends a clearly marked test with a one-time confirmation link, and a confirmation is the recipient's own report, never proof of monitoring. | Done in the released status table; no contradictory released-source statement found. |
| TLS-001 | done (CONTRACT.md:1540) | Certificate checks look at trust, host name and expiry from each location, warn in stages before a certificate runs out, and clear only after a new valid certificate is seen. | Done in the released status table; no contradictory released-source statement found. |
| MAINT-001 | done (CONTRACT.md:1553) | Planned and recurring maintenance windows use US time zones and daylight saving, and keep the underlying check results so reports still show what happened. | Done in the released status table; no contradictory released-source statement found. |
| ARCHIVE-001 | done (CONTRACT.md:1516) | A backup restores only into an empty installation: monitors come back paused, destinations disabled and old alerts held back. | Done in the released status table; no contradictory released-source statement found. |
| NETWORK-001 | partial (CONTRACT.md:1514) | Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |
| ERASURE-001 | done (CONTRACT.md:1519) | An owner can erase a monitor with its evidence, an alert destination, or an operator, and gets a receipt of what was removed. | Done in the released status table; no contradictory released-source statement found. |

## happytohelp v0.4.20

| Clause | Seed status | JE sentence | Source/status judgment |
| --- | --- | --- | --- |
| MOVE-IN-001 | done (CONTRACT.md:1207) | Imports are reviewed before anything is written, send no messages to your customers, can be undone as a whole, and keep source dates, private notes and publication state. | Done in the released status table; no contradictory released-source statement found. |
| CONVERSATION-001 | partial (CONTRACT.md:1204) | Customer and agent messages are stored once, and two conflicting final replies can never both be accepted. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |
| DELIVERY-001 | partial (CONTRACT.md:1205) | Messages are saved before they are shown live, so a reload or dropped connection recovers everything that was sent, and an AI draft never becomes a final answer until it is safely accepted. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |
| OUTCOMES-001 | partial (CONTRACT.md:1208) | Customers can rate a resolution with a thumbs up or down and a short comment, and comments are removed if the contact is erased. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |
| REPORTS-001 | done (CONTRACT.md:1209) | Reports use your own calendar and time zone, count each conversation once, and export to a spreadsheet file that is safe to open. | Done in the released status table; no contradictory released-source statement found. |
| AI-001 | partial (CONTRACT.md:1212) | With no AI key, the AI is simply not assigned to new conversations and your team keeps them; your company's policy sets AI spending limits and uncertain attempts are never silently repeated. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |
| DELEGATION-001 | partial (CONTRACT.md:1215) | Revoking a computer's access ends its authority at once, and HappyToHelp never claims that work already running there was stopped. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |
| CONNECTIONS-001 | partial (CONTRACT.md:1210) | API tokens have chosen scopes, are shown once, are stored hashed and can expire; an unclear webhook result is not sent again. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |
| IDENTITY-003 | partial (CONTRACT.md:1269) | Teammates can sign in with an authenticator app or a security key plus one-time recovery codes, and an owner can require it for everyone or by role. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |
| PORTABILITY-001 | partial (CONTRACT.md:1279) | You can export your conversations, files, contacts, help articles, settings and history in one checked archive and restore it into a clean installation; sign-ins and provider secrets are left out. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |

## oncall v0.5.8

| Clause | Seed status | JE sentence | Source/status judgment |
| --- | --- | --- | --- |
| OC-012 | done (CONTRACT.md:1442) | Oncall sends no texts, calls or push alerts, so your existing pager stays in charge while you use it. | Done in the released status table; no contradictory released-source statement found. |
| OC-006 | partial (CONTRACT.md:1436) | Oncall sends signed response events only to endpoints an administrator approves; paging stays off, and email is for sign-in links only. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |
| OC-005 | done (CONTRACT.md:1435) | A runbook is copied into the incident when it is declared, so later edits never rewrite instructions mid-incident. | Done in the released status table; no contradictory released-source statement found. |
| OC-004 | done (CONTRACT.md:1434) | Resolving an incident needs recovery evidence and a summary, and every change is recorded in an attributed timeline. | Done in the released status table; no contradictory released-source statement found. |
| OC-008 | done (CONTRACT.md:1438) | Incident records you write are never deleted automatically. | Done in the released status table; no contradictory released-source statement found. |
| OC-011 | done (CONTRACT.md:1441) | Rotations hand over by wall-clock time in your named zone, and clock-change gaps show up as visible gaps. | Done in the released status table; no contradictory released-source statement found. |
| OC-003 | done (CONTRACT.md:1433) | Viewers can only read, responders coordinate, and admins manage; alert-sending credentials grant no read access, and removed access stops on the next request. | Done in the released status table; no contradictory released-source statement found. |
| OC-002 | done (CONTRACT.md:1432) | Replaying alert routing only reads: it creates no alert, incident or outside effect. | Done in the released status table; no contradictory released-source statement found. |
| OC-021 | done (CONTRACT.md:1451) | A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused. | Done in the released status table; no contradictory released-source statement found. |
| OC-022 | partial (CONTRACT.md:1452) | A move-in can be undone, and edits you made afterwards are kept rather than overwritten. | Partial because the status table names missing assertions; no explicit contradiction of this sentence. |

No new source-proved false sentence was found. No new C follow-up and no blocking A/B/BAR finding. This review does not certify every seed’s implementation or any held provider journey.
