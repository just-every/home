# je-gate-61 follow-ups

Author: Run Edit Run fleet. Recorded 2026-11-19T18:32:23Z.

FOLLOW-UP C: Carry forward one existing Uptime copy/evidence qualification item. No new source-proven false claim was found, and no copy change is requested by this gate. The released CONTRACT.md is byte-identical between v0.5.17 and v0.5.18; it retains partial judgments. These exact unchanged JE sentences describe intended behavior more broadly than the clause's current evidence qualification:

- STATE-001: “One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks.” Status partial; the table retains gaps for mixed-vantage Degraded, missing/stale Unknown, intermediate Recovering and false recovery isolation. The newer bounded evidence notes do not change the retained status.
- NETWORK-001: “Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected.” Status partial; the source retains broader redirect, address-family, credential, execution-bound, hosted-transport and managed-location qualification gaps. This is not proof of an exploitable failure, and the candidate did not introduce the sentence.

Related unchanged feature sentences sampled against the status table:

- “Check that a server port answers, that DNS records are right, and that SSL certificates and domain registrations are not about to expire” maps to TCP-001 partial (second-location assertion gap), DNS-001 done, TLS-001 done and DOMAIN-001 partial (console-door assertion gap). These gaps do not show that the sentence is false.
- “Watch cron jobs and nightly backups through heartbeat check-ins” maps to HEARTBEAT-001 done, HEARTBEAT-002/003 partial (hosted timing and actual external scheduler execution qualification remain). The copy does not claim those unperformed proofs.
- “Run checks from a machine on your own network and export your monitors, evidence and alert history any time” maps to PRIVATE-001 done, ARCHIVE-001 done and ARCHIVE-002 partial. Bounded inactive export exists; unimplemented resumable/scaled export is not claimed by this sentence. No new false statement was independently demonstrated.

Count: one carried copy/evidence follow-up item, with two explicitly named promise sentences. Zero new A/B/BAR findings.

## Out of scope

OUT OF SCOPE D: Spool ERR-006 remains the brief's pre-existing follow-up. The candidate only clears its consumed copy-change marker; it changes none of Spool's public data, copy, source ref or hashes. No reassessment of Spool implementation is within R5. Lamp partial-evidence promises, HappyToHelp's eight partial-evidence promises and Terrace trust wording are unchanged and outside the touched-copy review. They are not newly scored findings.
