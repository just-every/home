# Released copy review

No wording edits are justified by the released sources reviewed in this round. The five eligible versions advance; no JE or seed contract implementation judgment is changed.

## spool: v0.7.7 → v0.7.8
- Released commit: 47ecaeeec8c442aa4648ad3b7f4fc1d7e1f115e2.
- Version source: https://github.com/just-every/run-spool/blob/47ecaeeec8c442aa4648ad3b7f4fc1d7e1f115e2/seed.json#L4.
- Release: https://github.com/just-every/run-spool/releases/tag/v0.7.8; current release API receipt in release-spool.json. Non-draft, non-prerelease, rer-release.dsse.json asset present. Signature verification was not performed.

## lamp: v1.11.12 → v1.11.13
- Released commit: e82bc349b98af44c440efa2960927e327deda1a5.
- Version source: https://github.com/just-every/run-lamp/blob/e82bc349b98af44c440efa2960927e327deda1a5/seed.json#L4.
- Release: https://github.com/just-every/run-lamp/releases/tag/v1.11.13; current release API receipt in release-lamp.json. Non-draft, non-prerelease, rer-release.dsse.json asset present. Signature verification was not performed.

## orbit: v0.4.6 → v0.4.7
- Released commit: eab0faafccd2eb0945dddb7d0f52c30ce573c04c.
- Version source: https://github.com/just-every/run-orbit/blob/eab0faafccd2eb0945dddb7d0f52c30ce573c04c/seed.json#L4.
- Release: https://github.com/just-every/run-orbit/releases/tag/v0.4.7; current release API receipt in release-orbit.json. Non-draft, non-prerelease, rer-release.dsse.json asset present. Signature verification was not performed.

## oncall: v0.5.9 → v0.5.10
- Released commit: 1dc0069324de17933e7b65bffefa14de7dabea9a.
- Version source: https://github.com/just-every/run-oncall/blob/1dc0069324de17933e7b65bffefa14de7dabea9a/seed.json#L4.
- Release: https://github.com/just-every/run-oncall/releases/tag/v0.5.10; current release API receipt in release-oncall.json. Non-draft, non-prerelease, rer-release.dsse.json asset present. Signature verification was not performed.

## uptime: v0.5.7 → v0.5.8
- Released commit: ed5429192d18503c4c8caa8d797d82ffdcc78f54.
- Version source: https://github.com/just-every/run-uptime/blob/ed5429192d18503c4c8caa8d797d82ffdcc78f54/seed.json#L4.
- Release: https://github.com/just-every/run-uptime/releases/tag/v0.5.8; current release API receipt in release-uptime.json. Non-draft, non-prerelease, rer-release.dsse.json asset present. Signature verification was not performed.

## Per-seed copy decisions

- Spool: CONTRACT.md is identical between v0.7.7 and v0.7.8. README.md updates release references, the SDK installation context and observation date; the SDK remains 0.1.0 and 0.2.0 remains unpublished. JE makes no new SDK capability claim. Keep existing JE wording.
- Lamp: CONTRACT.md changes evidence/judgments for PAGE-019, SUB-001 and MOVE-014; README.md prepares the new version. These changes do not falsify JE wording. Preserve all public promises without promoting their status.
- Orbit: notification requirements gain an exception for outcomes caused by the responsible operator, including immediate sends; later provider outcomes and other recipients still notify. JE’s summary/does/promises contain no promise of self-notification, so no sentence changes. Evidence additions retain other partial judgments.
- Oncall: OC-052 moves upstream from partial to done and the agent-surface row documents read-only triage search/filter availability. JE does not claim saved views or a complete target archive; preserve wording.
- Uptime: CONTRACT.md is identical between v0.5.7 and v0.5.8. README.md corrects installation and UI instructions and lists already supported monitor kinds. JE does not quote the superseded UI labels; preserve wording.
- HappyToHelp stays v0.4.22. Its eight noted promises remain partial in the tagged contract; partial evidence does not establish a false implementation claim. No new wording or status judgment is imported.
- Terrace stays v0.1.4. README.md:7 says trust reconciliation is not yet supported and README.md:95 retains older capacity caveats, but the same released CONTRACT.md:551 explicitly judges ACCT-006 done with reviewed CSV/OFX/QFX/PDF matching, unresolved differences and balanced sign-off; ACCT-001 is done at :546 and ACCT-012 at :557 retains the cash-draft limits already reflected in JE. The internal README/contract inconsistency is recorded; it does not prove JE’s reconciliation wording false. Keep the existing summary and does. No source judgment is altered.

## Known partial follow-ups (observed only)

### uptime@v0.5.8 (ed5429192d18503c4c8caa8d797d82ffdcc78f54)

- CONTRACT.md:1512: `STATE-001` | Fixed coverage and incident hysteresis | published | partial
- CONTRACT.md:1514: `NETWORK-001` | Pinned bounded destination execution | published | partial

### lamp@v1.11.13 (e82bc349b98af44c440efa2960927e327deda1a5)

- CONTRACT.md:3199: `PAGE-006` | Serving through a failure | published | partial
- CONTRACT.md:3253: `INCIDENT-004` | Published updates are immutable | published | partial
- CONTRACT.md:3271: `UPDATE-008` | Atomic publication and recipients | published | partial
- CONTRACT.md:3301: `SUB-006` | One-click unsubscribe | published | partial
- CONTRACT.md:3323: `NOTIFY-004` | Delivery log, without tracking | published | partial
- CONTRACT.md:3329: `NOTIFY-009` | Delivery never blocks publication | published | partial
- CONTRACT.md:3345: `INTAKE-002` | Alerts never publish | published | partial
- CONTRACT.md:3408: `MOVE-002` | Retroactive and silent | published | partial

### happytohelp@v0.4.22 (4dee2432081a64cee0bd12c59a31cb84371c3ab3)

- CONTRACT.md:1204: `CONVERSATION-001` | Durable transcript | published | partial
- CONTRACT.md:1205: `DELIVERY-001` | Live delivery and recovery | published | partial
- CONTRACT.md:1208: `OUTCOMES-001` | Resolution feedback and provenance | published | partial
- CONTRACT.md:1210: `CONNECTIONS-001` | Workspace integrations | published | partial
- CONTRACT.md:1212: `AI-001` | Configured model execution | published | partial
- CONTRACT.md:1215: `DELEGATION-001` | Explicit local authority | published | partial
- CONTRACT.md:1269: `IDENTITY-003` | Two-factor authentication for native accounts | target | partial
- CONTRACT.md:1279: `PORTABILITY-001` | Complete customer-owned portable support data | target | partial

## Unreleased copy drift

Initial dry run and copy-only apply report no changed CONTRACT.md/README.md/seed.json for the fourteen coming-soon seeds relative to recorded state. All coming-soon copy stays as published. Auth retains the explicit staysComingSoon override.

Full file-level differences are recorded in released-copy.diff; source tags and commits are in source-review.log. The committed tool reads released copy at the displayed version, so the post-version copy-provenance pass must record the new five tags.

## Copy provenance after version apply

The required initial `--copy-only --apply` saw zero copy drift at the prior displayed versions. After the mechanical version advance, a second copy-only apply limited to the five changed seeds recorded their reviewed new tags and hashes. It reported Uptime README.md and seed.json; Lamp CONTRACT.md, README.md and seed.json; Orbit CONTRACT.md and seed.json; Oncall CONTRACT.md, README.md and seed.json; Spool README.md and seed.json. No wording changed. The full mechanical apply also cleared an already-seen HappyToHelp copy finding from state because its current released sources match the stored hashes.
