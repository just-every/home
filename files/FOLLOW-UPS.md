# Follow-ups

Author: Run Edit Run fleet. Timestamp: 2026-11-21T03:44:34Z.

FOLLOW-UP C: Uptime STATE-001, carried from baseline. "One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks." The v0.5.19 contract is unchanged and remains partial; preserve the evidence qualification for incomplete/Unknown/Recovering/manual-pass behavior. No new false behavior demonstrated.

FOLLOW-UP C: Uptime NETWORK-001, carried from baseline. "Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected." The v0.5.19 contract is unchanged and remains partial; bounded rebinding proof does not complete redirect/address/credential/execution/hosted coverage. No new false behavior or demonstrated vulnerability.

## Out of scope

OUT OF SCOPE D: Oncall OC-021, pre-existing on main and both source tags. "A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused." The source qualifies zero native-object writes; upload/plan/grant bookkeeping is retained. Copy precision only, no blocker and not counted as a new C follow-up.

Untouched: Lamp partial-evidence copy, HappyToHelp eight partial-evidence promises, Terrace trust wording and Spool ERR-006 retain their existing handling; no independent audit of them was added.
