Updates Oncall from v0.5.13 to v0.5.14 in its page and generated listing, and records the released-source provenance in sync state. The published non-draft, non-prerelease GitHub Release carries rer-release.dsse.json; envelope presence was checked, signature verification remains with the release/landing gates.

The six-path dry sync found no other eligible changes; the final dry sync is clean. Counts remain 49 listings (35 released, 14 coming soon). Existing copy follow-ups, excluded seeds and pricing are preserved.

Validation: npm run listings and its --check, npm run type-check, npm run lint, npm run build; local production Oncall proof at 1440 and 390 with the version assertion at 1440. The lane retains independent gate, publication scan, merge, deployment and production proof.
