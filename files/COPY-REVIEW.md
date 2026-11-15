# Released-source copy review

Author: Run Edit Run fleet. Date: 2026-11-15T22:04:49Z

`--copy-only --apply` reads the listing's published tag, updates only source provenance and open observation keys in state, and does not import or rewrite public copy, marks, colours or home observations. The first six-seed run found no new copy drift at the existing release pins. After mechanical version advancement, a second copy-only apply recorded the actual new release source commits and hashes.

Uptime: v0.5.12 / 2045014b15f76380b5d7493c0c42b2caa430f88b → v0.5.13 / c1e8376c7dfd6ed601b6fe993567237449fc7143. The complete released-source compare is retained in uptime-released-copy-diff.json and uptime-released-copy-review.md. CONTRACT.md around row 1543 changes PUBLIC-002 evidence references only, retaining its done judgment. README.md updates install/start/backup/MFA guidance (hunks starting at old rows 39, 54, 119, 161, 175, 203). seed.json row 5 advances the version; rows 1866–1874 adjust asset budgets and explanatory metadata. These do not contradict the published JE summary, does, promises, move-in or runs-on wording. Preserve all of it, including the existing partial-evidence follow-up. The only public page edit is the proven version at src/data/seed-pages.ts:119, reflected in listings.json.

Oncall: v0.5.15 / 44ca722b6a5dde173b5253df7b5e0eab762df459 → v0.5.16 / 7f250f7e66f1377f7b4b773effd1c72e8854c025. The released-source compare changes only seed.json row 5 among CONTRACT.md, README.md and seed.json. Keep every existing public claim. Advance only src/data/seed-pages.ts:1046 and the generated listing, with matching state provenance.

HappyToHelp stays on v0.4.28 / 41fb40246d2e69f928be397c48d952d147c39160; Lamp v1.11.18 / f495b89afd9f6832e4d4807018d91fa4c4670147; Orbit v0.4.10 / 22ca38c0e0bb5784440df021e8a5eb5b41a81de8; Spool v0.7.12 / cc086904fd942175d18c60082b10c459c343dc78. Initial full dry and copy-only apply find no new copy-source differences for these four. No public copy edit is justified.

The full 49-seed dry run reports no new coming-soon or unreleased copy drift. None is imported. No implementation status is promoted, no contract source/view/lock is edited, and existing Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D) follow-ups remain for the lane. The tool cleared old seen observation keys for Lamp/Orbit/Spool during mechanical apply; that is sync bookkeeping, not resolution of those editorial/evidence follow-ups.
