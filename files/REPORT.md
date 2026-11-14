# je-sync-35 listing sync report

Updated: 2026-11-14T20:34:33Z

Repository: just-every/home. Product branch: cloud/je-sync-35. Initial main: 1eb1fe9d9bf8683ec1e8ecdab8653a5ce6446a86.

## Result

Lamp changes from v1.11.15 to v1.11.16 in the seed page and public listings feed, with released-tag copy provenance updated in sync state. Public prose, marks, colours, homepages, pricing and release statuses are unchanged. Counts: 49 → 49 total, 35 → 35 released, 14 → 14 coming soon. No contract clause status changes or implementation-status promotions.

## Execution plan

The full eight-step plan is in PLAN.md. All product edits are confined to public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts. The clone is fresh/shallow. The committed sync implementation is unchanged; all runs pass --only happytohelp,lamp,uptime,oncall,orbit,spool. Paused seeds are excluded rather than queried or imported.

## Dry-sync output and decisions

Initial dry run: `Dry run: 2 of 6 seeds changed.`

- HappyToHelp: `version newer tag v0.4.27 (page shows v0.4.26) [to apply]`. Withheld: the fresh published-release listing contains v0.4.26 and older; v0.4.27 is a tag only. The mechanical tool temporarily proposed/applied it, then the review restored v0.4.26 before generation, checks or commit.
- Lamp: `version newer tag v1.11.16 (page shows v1.11.15) [to apply]`. Accepted under the RELEASED rule.
- Uptime, Oncall, Orbit, Spool: no findings.
- Marks, colours, homepage appearance/headlines/alternatives and release status: no proposed changes for any of the six. No repeated open mark/colour/status findings were printed. All six live homepages were readable through the committed capture reader. No stills, galleries, new art or designs were imported.

First copy-only apply: `Applied: 0 of 6 seeds changed.` This flag records copy provenance only and preserves published copy and art. Mechanical apply: `Applied: 2 of 6 seeds changed.` The HappyToHelp edit was then withheld as above. A second copy-only apply after the approved Lamp version change records the actual v1.11.16 publication boundary: `Applied: 1 of 6 seeds changed`, reporting Lamp CONTRACT.md and seed.json.

Final dry run: `Dry run: 1 of 6 seeds changed.` The sole remaining proposal is the deliberately withheld HappyToHelp v0.4.27 tag. There is no unexplained remaining change. The version detector is tag-based, so it will continue proposing that tag until a valid Release exists or a later round resolves it.

## Fresh source refs

Every released copy source was resolved to its listed release tag, never unreleased main. Brand inputs track each seed main. All source/ref/release reads used gh api (batched GraphQL plus Lamp REST metadata), not other-repository clones or Git transport. Exact returned refs and file bytes were cached outside the checkout and exposed to the unmodified sync command through narrow git/gh adapters, avoiding repeated API calls. Cache misses fail; no local invented fallback exists. Source receipts record hashes.

| Seed | Listing before → after | Released copy commit | Brand main |
| --- | --- | --- | --- |
| happytohelp | v0.4.26 → v0.4.26 | 2f597575d4ccb19cdd4cfa0de5e635757737a1aa | 76a98f37da9003a14e5e2c7bfd9df03b1588ab51 |
| lamp | v1.11.15 → v1.11.16 | 429a46081ce68bab2dbdae46b8402b8ccce3ee2a | 429a46081ce68bab2dbdae46b8402b8ccce3ee2a |
| uptime | v0.5.11 → v0.5.11 | 04016399e1e879e7be3b8e891baf02d975bb3901 | bcfa1639dbf56a4afe5c2dc41a60796e6df10395 |
| oncall | v0.5.14 → v0.5.14 | 4d1fc62d4d2b8bf90008ac87bbaa626bc1a5494b | 96d1b7a9ee6ed01fce1effbb889991a4a8a66d01 |
| orbit | v0.4.9 → v0.4.9 | a5f471626aea1bfcb2c79f5dbee2250fdb38fd49 | 9940c015edce444ed02c8f23fee20aac6a947761 |
| spool | v0.7.11 → v0.7.11 | b9e7e575097e0dd0fc0662ce1ed507fa0d41f0d8 | f651887172e7d74a09af89f9eb059cfd13d72c61 |

## Release evidence

Lamp release: https://github.com/just-every/run-lamp/releases/tag/v1.11.16. Published 2026-11-14T20:04:54Z, draft=false, prerelease=false. Tag object de6a8948cf2e12e3efb876066caa1a334bfd2599 resolves to commit 429a46081ce68bab2dbdae46b8402b8ccce3ee2a. The fresh metadata confirms rer-release.dsse.json (3157 bytes), asset ID 748628881, digest sha256:092c52a6cf34022c5949b765c54df6a4a9f09986f339d20ccac09fff8a17a805. This establishes envelope-asset presence and GitHub digest metadata; cryptographic DSSE signature verification was NOT performed. No bare tag/SIGNED promotion is accepted.

The unchanged path releases were also freshly checked as non-draft, non-prerelease with rer-release.dsse.json:
- https://github.com/just-every/run-happytohelp/releases/tag/v0.4.26 (tag v0.4.26).
- https://github.com/just-every/run-uptime/releases/tag/v0.5.11 (tag v0.5.11).
- https://github.com/just-every/run-oncall/releases/tag/v0.5.14 (tag v0.5.14).
- https://github.com/just-every/run-orbit/releases/tag/v0.4.9 (tag v0.4.9).
- https://github.com/just-every/run-spool/releases/tag/v0.7.11 (tag v0.7.11).

## Copy provenance review

The first copy-only report found no released-source drift. Between Lamp v1.11.15 and v1.11.16, CONTRACT.md:1098 (SETUP-002 acceptance point 2) changes how setup preserves a valid saved time zone and falls back to a valid browser time zone/UTC. seed.json:4 changes only the package version. README.md is byte-identical. The complete diff is lamp-released-source.diff. The existing JE Lamp summary/does/promises make no first-run time-zone claim; the release does not prove them false, so public wording is retained. No public-claim edit requires a file/row justification. The state records the newly reviewed source hash and its copy finding; Oncall’s stale open copy-finding key is cleared by the tool with no source/wording change. This is observation bookkeeping, not a contract judgment.

No coming-soon/unreleased copy was imported. The paused later seeds were not probed, so this report does not claim to establish whether they have copy drift. Preserve the existing Terrace trust (C), HappyToHelp eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D) follow-ups; this sync changes none of their claims or judgments.

## Explicitly withheld and preserved

- HappyToHelp v0.4.27: no corresponding published Release in the fresh read; keep JE v0.4.26.
- All seeds outside the six path seeds: paused until 25 November. No later seed release/status/copy import.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen: remain absent; generated listings checked for exclusion. No overrides edit was needed.
- RER inventory: not used as an authority to lower JE versions; gr/pr own that inventory.
- Pricing: Assisted US$10/month and Managed US$100/month presentation retained; no GST/billing-country edits.
- No gallery import, capture-provenance change, custom mark redraw, homepage redesign or unrelated copy round. No changes under public/seeds.

## Checks and browser proof

- npm ci: passed. Setup reinstalled the original Husky hooks; the fleet wrapper was reinstalled afterward.
- npm run listings: generated 49 entries; npm run listings -- --check: passed (49).
- npm run type-check: passed.
- npm run lint: passed.
- npm run build: passed; 61 static pages generated. Existing Next middleware/standalone warnings do not affect this candidate.
- Browser: candidate /lamp captured once at 1440 and 390 with headless /usr/bin/chromium --no-sandbox; desktop assertions check the page version, SoftwareApplication schema and public feed agree, and HappyToHelp remains withheld. See browser-receipt.json and lamp-1440.png/lamp-390.png. An initial networkidle wait timed out on streaming media; the successful proof waits for document readiness and loaded fonts.
- No tests added/deleted/weakened, and no full local test suite run; exact-SHA branch CI owns the full suite.
- git diff --check, scope/identity/trailer checks and diff credential-pattern inspection: recorded in final receipt before push.
- Mac publication scan, independent non-builder gate, landing, deployment and live production proof: lane responsibilities; not run in cloud.

## Limitations and custody

No product blocker identified. Cryptographic envelope verification was not claimed. API reads are bounded to the ten-call budget; only one exact-SHA CI watcher is used, at least 300 seconds between discovery/poll calls for a run. The terminal receipt records the actual product SHA, PR and CI IDs/conclusions. Report-only evidence is published separately to evidence/je-sync-35 and is not a READY or landing signal. No main/default-branch pushes, merge, deploy or provider operations are performed.

## Published candidate and current CI

Timestamp: 2026-11-14T20:36:53Z. Product SHA: e7d336a0005e9a764869340199e6c007cbd51011. PR: https://github.com/just-every/home/pull/59. Push and remote-ref verification succeeded. Exact-SHA Verify branch run 43638334147 was in progress at discovery. A later observation will be recorded only after the 300-second minimum interval.

The initial fleet hook symlink failed Husky helper lookup; the first shell incorrectly continued and published the branch at unchanged main. The wrapper now executes original hooks by their real paths; lint-staged ran successfully and the candidate was committed/pushed. No history was rewritten, no product work was discarded, and no hooks were disabled.

Browser environment limitation (2026-11-14T20:37:26Z): stock next start logs a missing Cloudflare caches global for the token snapshot and a missing local analytics D1 page_views table. These background services are outside the version-listing change. The /lamp document, schema and feed checks passed; no migrations or provider operations were performed.

## Final exact-SHA CI observation

Timestamp: 2026-11-14T20:41:49Z. Verify branch run 43638334147: completed/success, head e7d336a0005e9a764869340199e6c007cbd51011. Run: https://github.com/just-every/home/actions/runs/43638334147. Actual GitHub API calls: 6 of 10. Candidate custody: READY.
