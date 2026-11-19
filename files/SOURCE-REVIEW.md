# Source and copy review

Author: Run Edit Run fleet. Recorded: 2026-11-19T11:48:34Z.

The six-path pause limits this round to HappyToHelp, Lamp, Uptime, Oncall, Orbit and Spool. Later released seeds and coming-soon source drift were not imported or refreshed. No coming-soon copy is imported.

| Seed | Listed release source | Copy commit | Initial findings |
| --- | --- | --- | --- |
| Uptime | v0.5.17 | 359b1bb93606ccfe5dc0120d2cdce78e8df67f6a | no "alternative to" line found on the homepage (previously open) |
| HappyToHelp | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | None |
| Lamp | v1.11.23 | 199a635758939ab54b12f3a76dabeee68ab74b8f | None |
| Orbit | v0.4.11 | a4fcbfcd72fa4253826f43d0b0de02275094f86d | None |
| Oncall | v0.5.19 | 518317b385c4535599bfc670dd676da46069b451 | no "alternative to" line found on the homepage (previously open) |
| Spool | v0.7.14 | 1853e3b3b59d49853b5ee7678f851d6de8343fbf | newer tag v0.7.15 (page shows v0.7.14) |

Brand inputs follow committed default-branch HEAD. BRAND-REFS.json records the fresh full refs; source mark paths come from scripts/seeds-sync/sources.json, with src/branding.json and public/rer-theme.css supplying colour tokens. Homepage observations came from the six published URLs through the existing tool. No mark, colour, status, headline, replacement or still update was proposed. No gallery input or new capture campaign was created.

Spool promotion: https://github.com/just-every/run-spool/releases/tag/v0.7.15, published 2026-11-19T10:28:00Z; non-draft, non-prerelease, rer-release.dsse.json asset present. This is asset-presence evidence only; no signature was verified. Annotated tag v0.7.15 resolves to bb2efcd34837cd6067d02ce176609d3fc636dad2. The other five newest eligible published Releases match their listed versions.

Released comparison: run-spool v0.7.14...v0.7.15 is 41 commits ahead. The only changed copy inputs are README.md and seed.json. CONTRACT.md is unchanged. seed.json lines 1–7 update version from 0.7.14 to 0.7.15. README.md setup/installation rows around lines 45–90 replace short rer commands with the full binary path, describe installation naming and the existing setup flow; later hunks consistently use that path. These changes do not contradict the existing JE summary, does, promises, move-in or runs-on text. No public wording was edited; therefore no claim-edit source row is asserted. The sanitized actual diff is SPOOL-RELEASED-COPY-DIFF.json.

Standing copy follow-ups remain: Terrace trust (C); HappyToHelp eight partial-evidence promises (C); Uptime/Lamp partial evidence (C); Spool ERR-006 (D). No clause implementation status is promoted.

Deliberately withheld: Uptime and Oncall homepage replacements remain as listed because the tool found no alternative-to line. Brand/status follow-ups otherwise produced no new finding. The eight excluded seeds Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Later-seed and unreleased copy stays outside this round. No eligible six-path Release is withheld and no bare-tag promotion is made.

RER drift: live /data/seeds.json still lists Spool 0.7.14 (id errors-workbench, matched by repository URL). JE advances to verified published 0.7.15 without downgrading to RER. The other five match. Its generatedAt stamp is static; the actual versions were read. RER deployment and pins belong to gr.

Pricing presentation is preserved: Assisted US$10/month and Managed US$100/month. No pricing, GST or billing-country wording is changed.
