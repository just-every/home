# je-sync-50 plan

Author: Run Edit Run fleet. Recorded: 2026-11-19T11:44:48Z.

1. Start from a fresh shallow clone of just-every/home main; read AGENTS.md and the committed sync sources; install dependencies and fleet hooks.
2. Run the committed dry sync for HappyToHelp, Lamp, Uptime, Oncall, Orbit and Spool only. Preserve the later-seed pause through 25 November. Review every actual finding and source ref.
3. Freshly query the six repositories' published Releases. Retain a version promotion only for a non-draft, non-prerelease Release with rer-release.dsse.json present. Observe asset presence only, without a signature claim. Read live RER seeds and match by repository URL/name.
4. Run copy-only apply to record the currently listed release sources while preserving public wording. Review any changed released source against existing copy; keep the named partial-evidence and ERR-006 follow-ups intact. Record unreleased drift without importing it.
5. Run mechanical apply, retain only eligible changes within the declared paths and six-seed scope, preserve accepted pricing and all excluded seeds. Generate listings, check them, and rerun dry sync; explain any deliberately withheld findings.
6. Run relevant local checks: type-check, lint and production build. Inspect diff, scope and credential-shaped values. Fetch main and rebase only before the first publication; use fleet identity and active repository hooks for every commit. Push the real candidate immediately with the fleet guard.
7. Open the one requested PR, observe exact-SHA Verify through REST within the polling budget, and record its actual status. Publish this complete non-secret packet separately to evidence/je-sync-50, then remove the successful clone and dependencies. Retain recovery material on any unpushed failure.

Clause status changes: none planned. This task maintains catalogue data and does not promote seed implementation or contract status.
