# Follow-ups for je-gate-25

No new C finding or blocking A/B/BAR finding.

## Out of scope

OUT OF SCOPE D: Spool ERR-006 promise is overbroad for plain Resolve. JE's exact sentence is: “Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm.” The ordinary trigger is a plain Resolve followed by another accepted event from the same release. Released CONTRACT.md v0.7.5, ERR-006 line 157 explicitly says “plain Resolve regresses on the next accepted event in any release”; TEAM-003 acceptance 4 at line 279 says “A plain-resolved issue regresses on the next same-release event.” SDK-009's status row at line 1708 records plain resolution as asserted; its remaining gap concerns alerts/release-scoped views. This is an explicit behavior contradiction, not an inference from a partial label. The sentence is byte-for-byte unchanged from baseline main, and the Spool contract provenance hash is unchanged across v0.7.4 to v0.7.5 (`ab1e2b5eff5e8170`, independently matches the tagged bytes). The native current-release resolution explanation remains true; the absolute “only” does not cover the additional plain-resolution behavior. There is no newly introduced money/privacy/authority/data-loss issue. Keep this for a future named wording round; it does not hold PR #41.

Known HappyToHelp partial-clause follow-ups remain as given in the brief (CONVERSATION-001, DELIVERY-001, OUTCOMES-001, AI-001, DELEGATION-001, CONNECTIONS-001, IDENTITY-003, PORTABILITY-001). Their gaps describe missing assertions and qualification, not source-proven false implementations. Terrace wording is unchanged and outside this touched-entry gate. No new finding is inferred from those existing items.
