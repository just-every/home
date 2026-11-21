# je-sync-56 results

Author: Run Edit Run fleet. Recorded 2026-11-21T03:24:47Z.

Product candidate: just-every/home, cloud/je-sync-56, 2ae09dc01a11933324491a7e235750cdd4ad2858.
Base: acb6cbe44844a1d642a9e9d034c113016e5d9e65.
PR: https://github.com/just-every/home/pull/82 (open, main target).
Product push: successful on first attempt. No main push, merge, deployment or force push.

## Plan and execution

The full plan is in PLAN.md. Read the launcher, repository AGENTS.md and committed scripts/seeds-sync implementation before installing dependencies. Used a fresh shallow blobless clone, repository-local fleet identity and forwarding commit hooks. Ran npm ci, the initial dry sync, copy-only apply, mechanical apply, a second copy-only apply at the newly displayed release boundary, listings generation/check, and the final dry sync. All sync runs used --only uptime,happytohelp,lamp,orbit,oncall,spool because later seeds are paused until 25 November. No other repository was cloned or written.

The tool's version detector reads tags, so independently checked all six repositories' GitHub Release records before accepting its proposed version edits. The latest published releases are non-draft and non-prerelease and each carries rer-release.dsse.json. This verifies asset presence only: no envelope signature or attestation verification is claimed. Bare tags do not qualify. The actual Release query response is in releases.json; complete observed Git refs are in source-refs.json.

## Initial dry-sync output

- Uptime: version newer tag v0.5.19 (page shows v0.5.18), to apply.
- Oncall: version newer tag v0.5.22 (page shows v0.5.21), to apply.
- No new mark, colour, released-status, homepage, headline, incumbent-list or copy finding.
- Two already-open findings: Uptime and Oncall have no detected “alternative to” line on their live homepages. Their replaces lists remain unchanged.
- Six repositories and six homepages read successfully after installing the missing Playwright dependency. The initial failed attempt did not apply changes.

See dry-report.md/json and dry-sync.log for the complete actual output. Existing mark/colour/status follow-ups were reviewed through this output; none was proposed in this six-seed pass. No new design or capture campaign was introduced, and no screenshot, mark, colour or gallery was imported into the product.

## Per-seed changes and source refs

| Seed | JE before | JE after | Released copy commit after sync | Release source |
| --- | --- | --- | --- | --- |
| Uptime | v0.5.18 | v0.5.19 | b9bff679ec99b702de753d63ad385d232e6b6d1e | https://github.com/just-every/run-uptime/releases/tag/v0.5.19 |
| Oncall | v0.5.21 | v0.5.22 | 9cbcf975224f7171dcd3813e6f54d4b29a0791ca | https://github.com/just-every/run-oncall/releases/tag/v0.5.22 |
| HappyToHelp | v0.4.31 | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.31 |
| Lamp | v1.11.24 | v1.11.24 | 3f1349f029fa8c8c59bf9adfe4e2ae59fd502842 | https://github.com/just-every/run-lamp/releases/tag/v1.11.24 |
| Orbit | v0.4.12 | v0.4.12 | a9fa1830c1913562154dedaeb5a1322ead7c3e6b | https://github.com/just-every/run-orbit/releases/tag/v0.4.12 |
| Spool | v0.7.16 | v0.7.16 | 804a4ad15e6c8e1c52f0069dcf610ba1f5d2342c | https://github.com/just-every/run-spool/releases/tag/v0.7.16 |

Only three paths changed: src/data/seed-pages.ts (two versions), public/data/listings.json (same versions and generated timestamp), scripts/seeds-sync/state.json (timestamp and copy provenance/open-finding bookkeeping). The mechanical apply also removed Spool's obsolete copy-change fingerprint; this is sync bookkeeping, not a resolution or promotion of ERR-006. HappyToHelp, Lamp, Orbit and Spool public listings are unchanged. Product diff is preserved in product.diff.

## Copy review

--copy-only --apply updates provenance and open findings only. It never rewrites summary, does, promises, art or implementation statuses. The first copy-only run found no copy drift at the prior displayed versions. After the mechanical version updates, the second copy-only run recorded:

- Uptime seed.json changed. At v0.5.19, seed.json row 4 changes version from 0.5.18 to 0.5.19. CONTRACT.md and README.md are identical to v0.5.18. JE src/data/seed-pages.ts row 119 is the corresponding version edit. No public wording change was justified.
- Oncall CONTRACT.md and seed.json changed. At v0.5.22, seed.json row 4 changes version to 0.5.22. CONTRACT.md rows 597 and 601 add merge/split conflict observations; row 1062 adds action-submission readback proof; rows 1244 and 1289 add sensitive classifications to agent tools; row 1321 adds discovery/guide proof. README.md is unchanged. These additions do not falsify JE's existing on-call schedule, incident, paging-off or import wording. JE src/data/seed-pages.ts row 1046 is the version edit. No promise or implementation-status edit was made.

True wording was retained. The final dry sync has zero new findings and zero unreadable sources, with only the two explained incumbent-line findings still open. Copy provenance source refs use displayed release tags, while brand observations continue to follow seed HEAD through the existing tool.

## Deliberately withheld and preserved

- No eligible six-path release is withheld. No bare tag was promoted, and no new release-status promotion was needed.
- The other 43 listings, including all 14 coming-soon seeds, were not synced because later seeds are paused. Their unreleased/default-branch copy was not imported or newly audited.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No override edit was needed.
- Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial evidence (C) and Spool ERR-006 (D) remain follow-ups. This maintenance round makes no judgment on them.
- Clause status changes: none. No source contract or generated contract view was edited.
- Pricing presentation and its existing terms remain unchanged; no price, GST or billing-country text was edited.
- No galleries or unproven capture inputs were ingested.

## RER comparison and lane drift

Read https://runeditrun.com/data/seeds.json freshly during this run, matching by repository URL. Its generatedAt is the static 2026-11-15T13:56:34Z stamp, not proof of current versions. Actual versions were HappyToHelp 0.4.31, Lamp 1.11.24, Uptime 0.5.18, Oncall 0.5.21, Orbit 0.4.12 and Spool 0.7.16. Spool is present as id errors-workbench and was not omitted. RER trails this candidate on Uptime and Oncall only. No JE version was downgraded. See rer-comparison.json; relay the two stale pins to gr.

## Validation and custody

- npm ci: pass.
- Copy-only apply, mechanical apply, listings generation and listings --check: pass.
- Final dry sync: zero new changes across six seeds, zero unreadable; two explained recurring incumbent-line findings.
- npm run type-check, npm run lint, npm run build: pass.
- Scope check, diff whitespace check and added-line credential-shape inspection: pass.
- All candidate author/committer identities and complete messages/trailers inspected before push; fleet identity, no co-author trailers. Fetch/rebase before first push found no main drift. Repository hooks remained active.
- Browser: actual built /uptime and /oncall pages returned HTTP 200 and rendered their catalogue versions at 1440. Actual screenshots show those changed facts at both 1440 and 390. Four captures and browser-receipt.json carry the product SHA. Assertions run at 1440 only.
- Full local tests not run: CI owns the full suite. No test was deleted, skipped, weakened or added.
- Publication scan, independent gate, PR landing, deployment and live verification remain with the lane, per the cloud brief.

Runtime: Node v24.19.0 and npm 11.9.0. The repository declares npm 10.9.3; the supplied cloud toolchain selects Node/pnpm pins and does not replace npm. npm ci and every required local check succeeded with the provisioned npm.

Initial browser proof waited for networkidle and timed out due continuing page network activity. The successful proof uses document readiness and fonts. The local Next server logged missing Cloudflare caches for the optional token API and an unmigrated analytics D1 table. No API was mocked, no product changes were made for these local runtime limitations, and the catalogue pages rendered correctly. Only the server/browser processes this task started were stopped.

Exact-SHA CI observations are preserved in ci-observation.json. Product custody and evidence publication are separate; an evidence commit never indicates acceptance or landing.

## Final CI observation

At 2026-11-21T03:27:21Z, Verify branch run 44860698831 was completed/success on exact product SHA 2ae09dc01a11933324491a7e235750cdd4ad2858: https://github.com/just-every/home/actions/runs/44860698831. Discovery was at 03:22:20 UTC and the only subsequent status query was at 03:27:21 UTC, respecting the 300-second interval. No failed-job archive calls or workflow retries were needed. Blockers: none for the candidate. The lane retains its landing hold and post-builder gates.

Final report recorded 2026-11-21T03:27:50Z. The separate evidence publisher emits the evidence ref/head and manifest hashes for this immutable packet.
