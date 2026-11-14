# je-gate-40 follow-ups

Recorded 2026-11-14T04:32:49Z; candidate 198052d795b6a151201bd2d02713b892575897a7.

No new tier C findings. No A, B or BAR findings.

## Out of scope

OUT OF SCOPE D: Existing JE ERR-006 promise: “Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm.” Spool CONTRACT.md v0.7.11 ERR-006 delegates plain Resolve to SDK-009, whose requirement explicitly permits regression on the next accepted event in any release. This is the known pre-existing copy mismatch: the same sentence appears in main and the candidate; both tagged CONTRACT content and its recorded hash are unchanged. It does not block this version sync and creates no new follow-up count.

The brief's already-recorded HappyToHelp, Terrace, Uptime and Lamp copy follow-ups are retained as context only; this change edits none of their wording. They were not re-audited or promoted into new findings.
