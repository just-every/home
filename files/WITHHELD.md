# Initial findings and deliberately withheld items

Author: Run Edit Run fleet. Date: 2026-11-15T22:03:41Z

The complete dry run read 49 repositories and 49 homepages successfully. All proposals:

- uptime: version: newer tag v0.5.13 (page shows v0.5.12); copy source v0.5.12 at 2045014b15f76380b5d7493c0c42b2caa430f88b.
- happytohelp: version: newer tag v0.4.30 (page shows v0.4.28); copy source v0.4.28 at 41fb40246d2e69f928be397c48d952d147c39160.
- oncall: version: newer tag v0.5.16 (page shows v0.5.15); copy source v0.5.15 at 44ca722b6a5dde173b5253df7b5e0eab762df459.

Uptime v0.5.13 and Oncall v0.5.16 are eligible: fresh release responses prove draft=false, prerelease=false, publication timestamps and rer-release.dsse.json asset presence. No signature verification was performed.

HappyToHelp v0.4.30 is deliberately withheld: git advertises its tag, but the fresh Releases API lists v0.4.28 as the latest published release. A bare tag cannot advance the JE release boundary. To prevent even a temporary unqualified version write, the mechanical --apply filter excludes HappyToHelp; its copy-only --apply remains pinned to v0.4.28.

There were no new mark, colour, homepage, status or copy findings, no coming-soon/unreleased copy drift, and no share-image action. Existing follow-ups remain as briefed: Terrace trust (C); HappyToHelp eight partial-evidence promises (C); Uptime/Lamp partial evidence (C); Spool ERR-006 (D). No new redesign/capture/gallery work is warranted.

All 43 seeds outside the six active paths remain paused for writes until 25 Nov. Their read-only baseline had no proposals. Auth stays coming soon under its existing override. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain excluded. No seed moves between released and coming soon; no contract status changes.
