# Released copy review

No public wording edit is justified by the released-source differences. No implementation judgment is promoted.

Lamp v1.11.10 → v1.11.11: the GitHub compare response in lamp-copy-diff.json lists README.md and seed.json, with no CONTRACT.md change. README changes concern the installer command, PATH instructions and rer 0.2.108; seed.json changes only version. The release contract hash remains 2dc299fabd2361bf. Existing JE summary, does and promises remain true under this unchanged source.

HappyToHelp v0.4.20 → v0.4.21: happytohelp-copy-diff.json lists README.md and seed.json, with no CONTRACT.md change. README release notes describe restricting owner password/two-factor resets for accounts in multiple workspaces, the existing roster erasure limitation, and no new migration. JE does not claim that an owner may reset every account or that the roster corner is fixed. Its authenticator/security-key promise is unchanged by that restriction. The release contract hash remains ae8feea8b7998aa7. Existing wording is retained.

Terrace v0.1.4 and Uptime v0.5.5: the full dry sync reports no copy drift against their listed release commits, so existing cent-reconciliation and STATE-001/NETWORK-001 wording are retained under the brief’s no-wording-round default. They are not requalified.

Coming-soon copy: first dry sync and initial copy-only apply report no drift for all fourteen coming-soon entries. No coming-soon wording is imported; Auth stays coming soon under its owner override.

## Known partial rows at the new release tags

### lamp-v1.11.11-CONTRACT.md

- Source CONTRACT.md:3199: `PAGE-006`, Serving through a failure, published, partial. Retained unchanged.
- Source CONTRACT.md:3253: `INCIDENT-004`, Published updates are immutable, published, partial. Retained unchanged.
- Source CONTRACT.md:3271: `UPDATE-008`, Atomic publication and recipients, published, partial. Retained unchanged.
- Source CONTRACT.md:3301: `SUB-006`, One-click unsubscribe, published, partial. Retained unchanged.
- Source CONTRACT.md:3323: `NOTIFY-004`, Delivery log, without tracking, published, partial. Retained unchanged.
- Source CONTRACT.md:3329: `NOTIFY-009`, Delivery never blocks publication, published, partial. Retained unchanged.
- Source CONTRACT.md:3345: `INTAKE-002`, Alerts never publish, published, partial. Retained unchanged.
- Source CONTRACT.md:3408: `MOVE-002`, Retroactive and silent, published, partial. Retained unchanged.

### happytohelp-v0.4.21-CONTRACT.md

- Source CONTRACT.md:1204: `CONVERSATION-001`, Durable transcript, published, partial. Retained unchanged.
- Source CONTRACT.md:1205: `DELIVERY-001`, Live delivery and recovery, published, partial. Retained unchanged.
- Source CONTRACT.md:1208: `OUTCOMES-001`, Resolution feedback and provenance, published, partial. Retained unchanged.
- Source CONTRACT.md:1210: `CONNECTIONS-001`, Workspace integrations, published, partial. Retained unchanged.
- Source CONTRACT.md:1212: `AI-001`, Configured model execution, published, partial. Retained unchanged.
- Source CONTRACT.md:1215: `DELEGATION-001`, Explicit local authority, published, partial. Retained unchanged.
- Source CONTRACT.md:1269: `IDENTITY-003`, Two-factor authentication for native accounts, target, partial. Retained unchanged.
- Source CONTRACT.md:1279: `PORTABILITY-001`, Complete customer-owned portable support data, target, partial. Retained unchanged.

