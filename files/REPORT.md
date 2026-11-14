# Done: je-sync-32

Report time: 2026-11-14T04:12:15Z

Repository: just-every/home

Branch: cloud/je-sync-32

Candidate: 198052d795b6a151201bd2d02713b892575897a7

PR: https://github.com/just-every/home/pull/56

## Plan and result

The full original plan is in PLAN.md. Completed: fleet setup and fresh shallow clone; read repository and sync instructions; independent six-path source/release inspection; initial dry sync; copy-only provenance apply; gated mechanical apply; review newly selected released copy and record provenance; regenerate/check listings; final dry sync; type-check, lint and production build; fleet identity and diff hygiene review; rebase on current main before the first successful push; guarded named-branch push; requested PR creation. Browser and exact-SHA CI receipts follow below. Evidence is published separately; the lane owns the independent gate, Mac publication scan, PR merge, deploy and live proof.

Only three product paths changed: public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts. No contract, clause status, acceptance point, claim wording, pricing, art, gallery or implementation changes.

## Actual dry-sync output

Initial: `Dry run: 1 of 6 seeds changed.` Spool: `version newer tag v0.7.11 (page shows v0.7.10) [to apply]`. There were zero unreadable sources/homepages and no mark, colour, status, homepage, headline or copy findings. Existing follow-ups were reviewed through actual tool output: none recurred; no design/capture campaign was initiated. Only the committed tool's routine homepage observations were run.

Initial copy-only apply: `Applied: 0 of 6 seeds changed.` It records only source provenance and preserves public copy and prior brand/home observations.

Mechanical apply: `Applied: 1 of 6 seeds changed.` Spool version v0.7.11 was the sole mechanical update. A second copy-only apply after promotion correctly resolved Spool to its newly displayed tag and reported `README.md, seed.json changed since the last sync`; this was reviewed and recorded without importing new prose.

Final: `Dry run: 0 of 6 seeds changed.` No unexplained change remains. Full real reports, JSON, logs and ordinary tool captures accompany this packet.

## Independently read source refs

All repositories below were read through gh api, never cloned or fetched with Git. A single fresh batched API snapshot included all current refs, published releases, released copy blobs and HEAD brand blobs. The sync's Git ls-remote/file-read subprocess interface was adapted outside the clone to those actual API results, so unmodified committed sync code could run within the cloud's gh-api-only restriction and shared API budget. Every returned text blob was checked against its API byte count and Git blob SHA-1. No local substitute, mock app or uncaptured-source fallback was used. The six seeds were selected with --only; later seeds are paused until 25 Nov. Repeated sync passes use this task's same fresh source snapshot and new routine live-home observations.

| Seed | Final displayed tag | Released commit | Brand HEAD | Change |
| --- | --- | --- | --- | --- |
| happytohelp | v0.4.25 | 333af4b0580c4284616783f1d79fcc9aad3aefc5 | a4e0d0976cbf4079e6ad3d89e9b744dc1745e2c7 | No public listing/copy/art change |
| lamp | v1.11.15 | 5dd84e13f6b0478edc2fc5e759d513f5eccf6d57 | 76748e97deb8a8c2001c7ce043cf48ff6396d80a | No public listing/copy/art change |
| uptime | v0.5.11 | 04016399e1e879e7be3b8e891baf02d975bb3901 | c14aafe38f2a5c754a550251593170404f1363a5 | No public listing/copy/art change |
| oncall | v0.5.13 | 8adae6c836f2fabda29e8a091b052450410c8ca5 | d21a61a6635cca536c972c139e1115567af26eef | No public listing/copy/art change |
| orbit | v0.4.9 | a5f471626aea1bfcb2c79f5dbee2250fdb38fd49 | a35d331920a4bace2548bbd0efaf9344ffcd32a6 | No public listing/copy/art change |
| spool | v0.7.11 | b9e7e575097e0dd0fc0662ce1ed507fa0d41f0d8 | b9e7e575097e0dd0fc0662ce1ed507fa0d41f0d8 | v0.7.10 → v0.7.11; copy provenance updated |

Every listed latest release was independently observed non-draft/non-prerelease with rer-release.dsse.json. Latest semantic tags exactly match those releases; the complete API tag result sets have no next page. The release URLs are:

- https://github.com/just-every/run-happytohelp/releases/tag/v0.4.25
- https://github.com/just-every/run-lamp/releases/tag/v1.11.15
- https://github.com/just-every/run-uptime/releases/tag/v0.5.11
- https://github.com/just-every/run-oncall/releases/tag/v0.5.13
- https://github.com/just-every/run-orbit/releases/tag/v0.4.9
- https://github.com/just-every/run-spool/releases/tag/v0.7.11

Spool's former copy ref was v0.7.10 at 417ab513b3032370091479fa28f41a5a67b50c53. Its new annotated tag object is d54b7b443870e71ad7a2505b2f5970f93c3c9f8f, peeled commit b9e7e575097e0dd0fc0662ce1ed507fa0d41f0d8, equal to fresh seed HEAD. The downloaded DSSE asset SHA-256 is 0da3575aaa5b3f982ae20446ba90acb074829f14b1135669c1e9443376b17f89, matching the brief. The envelope contains one signature; its payload's repository/tag/commit and CONTRACT.md, README.md and seed.json hashes and sizes match the API source bytes. release-receipt.json records those exact checks. This is envelope/source consistency and asset-presence evidence. Cryptographic signature verification was NOT rerun because no trusted public verification key was supplied; the brief's prior PASS is not relabelled as this builder's verification.

## Copy review and source rows

No public claim was edited: no changed released source proves an existing JE sentence false. At Spool v0.7.11, CONTRACT.md is byte-identical to v0.7.10 (SHA-256 ee9c871bfa25a110d3f3e61924164c75cc17ea412cb775f2e0621f114ab3594b). The only README.md changes are tag references on rows 36, 58 and 80, and seed.json row 4 advances version to 0.7.11. spool-released-source.diff contains the full actual delta. These support the listing version edit in src/data/seed-pages.ts row 1100 and the generated listing, without changing feature/promise prose.

Spool's unchanged contract headings remain ERR-002 row 110, ERR-003 row 119, ERR-004 row 131, ERR-006 row 155, ERR-007 row 167 and ERR-008 row 180. ERR-006's existing follow-up is retained, not resolved or promoted by this listing sync. The other five seeds' released source file hashes have no drift from existing provenance; their public wording remains unchanged.

Sync-state bookkeeping: Lamp's old seen-copy hash marker 42983364b373 is removed by the committed mechanical tool because the previously seen copy change no longer recurs. Spool receives that same generic copy-finding marker after its newly selected README/seed version provenance is recorded. This marker is tool bookkeeping, not an implementation judgment. Brand values, mark hashes and home observations remain unchanged.

## Deliberately withheld and preserved

- Later/coming-soon seeds: not queried or imported because the brief pauses later seeds until 25 Nov. No coming-soon status promotion or copy drift claim is made for unassessed sources.
- Unreleased HEAD copy: not imported; the release tag remains each public listing's copy boundary. HEAD was used only for the tool's permitted brand files and ref observation.
- Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D): preserved. No source implementation status was promoted; no CONTRACT.md changed.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen: remain absent, verified against generated listings. No overrides edit was needed.
- Pricing stays Assisted US$10/month and Managed US$100/month; no GST or billing-country wording changed.
- Galleries and new captures/designs: no imports or new design work. Existing tool observations found no eligible art/homepage drift, so public/seeds is untouched.
- RER inventory: not changed; the builder did not downgrade any JE version or write to another repository.

## Counts and validation

Before → after: 49 → 49 listings; 35 → 35 released; 14 → 14 coming soon. Spool is the only changed listing object, and its version is the only changed field. No test registration added, removed, skipped or weakened; full suite belongs to CI. Clause status changes: none.

PASS: npm ci; initial six-path dry sync; first copy-only apply; gated mechanical apply; final copy-only provenance apply; npm run listings; npm run listings -- --check; final six-path dry sync (zero drift); npm run type-check; npm run lint; cloud_run npm run build (61 static pages generated); git diff --check; exact three-path scope; credential-shaped added-diff scan; all candidate author/committer/trailer identities; non-force rebase onto freshly fetched origin/main before first successful push; guarded product push.

Local fleet-hook integration: the supplied symlink hook setup exposed Husky's relative `h` lookup failure. The first commit failed, and an accidentally attempted pre-commit push was rejected locally by the same original pre-push hook; nothing was published then. The outer fleet-hook links were replaced with executable forwarding wrappers that invoke original hooks by their real paths. The fleet commit-msg cleanup remained active. Original Husky lint-staged checks and git-lfs pre-push then ran successfully. No hooks were disabled or bypassed, and no published history was rewritten. The successful push receipt is push.log.

Production build succeeded with the repository's existing middleware-deprecation notice. For browser proof, the production Next server was started only on local port 31932; its exact recorded PID was 3656 (subreaper 3655). An initial browser navigation waiting for networkidle timed out due to background work; the successful proof uses DOM readiness and the visible release field. Existing local ancillary API calls log missing production cache/D1 bindings; they are outside this listing change, and no provider credentials were used. Browser proof checks and screenshots are recorded separately. The server and browsers are stopped before cleanup.

Public publication scan: reserved for the fleet's Mac per the cloud adaptation; no cloud COMPLETE claim is made. Required independent gate, landing/deploy and live production checks remain lane-owned, not builder acceptance or deployment.

Browser proof PASS: actual /spool at 1440 and 390, new v0.7.11 field visible; the 1440 probe also asserts the heading, matching public listings version and absence of horizontal overflow. Full-page screenshots: spool-1440.png, spool-390.png. Browsers closed in finally blocks.

## Exact-SHA CI observation

```json
{
  "observed_at": "2026-11-14T04:11:27Z",
  "api_calls_used": 7,
  "budget": 10,
  "runs": [
    {
      "id": 43555200362,
      "name": "Verify branch",
      "status": "completed",
      "conclusion": "skipped",
      "head_sha": "198052d795b6a151201bd2d02713b892575897a7",
      "event": "pull_request",
      "html_url": "https://github.com/just-every/home/actions/runs/43555200362",
      "created_at": "2026-11-14T04:09:18Z",
      "updated_at": "2026-11-14T04:10:52Z"
    },
    {
      "id": 43555197504,
      "name": "PR #56",
      "status": "completed",
      "conclusion": "success",
      "head_sha": "198052d795b6a151201bd2d02713b892575897a7",
      "event": "dynamic",
      "html_url": "https://github.com/just-every/home/actions/runs/43555197504",
      "created_at": "2026-11-14T04:09:16Z",
      "updated_at": "2026-11-14T04:10:09Z"
    },
    {
      "id": 43555153014,
      "name": "Verify branch",
      "status": "completed",
      "conclusion": "success",
      "head_sha": "198052d795b6a151201bd2d02713b892575897a7",
      "event": "push",
      "html_url": "https://github.com/just-every/home/actions/runs/43555153014",
      "created_at": "2026-11-14T04:08:43Z",
      "updated_at": "2026-11-14T04:10:52Z"
    }
  ]
}
```


Exact-SHA push Verify run 43555153014 completed/success. The PR event duplicate run 43555200362 is intentionally skipped by the committed workflow for cloud/ branches; this does not replace or weaken the successful push Verify. Dynamic PR run 43555197504 also succeeded. Seven GitHub API calls were used, including one corrected schema-validation request; no CI polling or log-download retries were needed. No blockers remain for the builder candidate. Full non-secret plan and actual reports/receipts are in this evidence packet. The product checkout is clean, all started browser processes closed, and the recorded local server/subreaper completed after TERM to the server's exact PID. The clone/node_modules are deleted only after successful evidence transfer, per the brief.
