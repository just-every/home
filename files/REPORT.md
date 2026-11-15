# je-sync-39 report

Author: Run Edit Run fleet. Date: 2026-11-15T22:09:00Z

Product repository: just-every/home
Branch: cloud/je-sync-39
Candidate: 0656778f51b9191393e035773150eaf0f218293e
PR: https://github.com/just-every/home/pull/63
Base: 2edf0e10aa92711884a2cdbdcf66d383233870c9

## Outcome

Only Uptime and Oncall released versions change in public data: Uptime v0.5.12 → v0.5.13; Oncall v0.5.15 → v0.5.16. Sync state records their new tagged commits/copy hashes and clears old seen observation keys for Lamp/Orbit/Spool. Public wording, status, marks, colours, homepages, stills, galleries, pricing, contract judgments and exclusions remain unchanged. Changed paths: public/data/listings.json, scripts/seeds-sync/state.json, src/data/seed-pages.ts.

Counts before → after: 49 → 49 listings, 35 → 35 released, 14 → 14 coming soon. No clause status changes or new implementation acceptance claims. The existing editorial/evidence follow-ups remain with the lane.

## Executed plan

See PLAN.md for the full working plan.
1. Fresh shallow filtered clone from main; read AGENTS.md and the complete sync entrypoints, copy/release/brand/homepage detection and apply semantics. npm ci passed. Installed current Playwright globally after the committed capture loader found no supported package. Reinstalled fleet forwarding hooks after setup; repository hooks remained active.
2. Ran the committed full dry sync over all 49 seeds and 49 homepages. It succeeded with three version proposals, zero unreadable sources and no mark, colour, homepage, release-status or copy changes. Its complete source refs and findings are in dry-baseline/report.md and report.json.
3. Verified the two promoted GitHub Releases freshly, including non-draft/non-prerelease status, publication time and rer-release.dsse.json asset presence; resolved annotated tags to released commits. This proves envelope-asset presence only; no signature verification is claimed. Fetched the live RER catalogue and retained JE versions rather than downgrading.
4. Ran copy-only apply on the six active seeds. It preserved public wording, brand and home observations. Ran mechanical apply on Uptime, Lamp, Orbit, Oncall and Spool; excluded HappyToHelp to prevent the unqualified v0.4.30 tag from being written. Only the two eligible versions applied.
5. Ran copy-only apply again after the version boundary moved, recording the new released-source commits. Reviewed the actual released-source compare against existing JE copy; no claim was proved false, so every public sentence stays. COPY-REVIEW.md names supporting files and rows. Coming-soon source drift was absent in the full baseline and none was imported.
6. Generated listings, checked them, then ran a final six-active-seed dry sync. Only the explained HappyToHelp bare-tag finding remains. Type-check, lint and production build passed. No new tests were warranted for version literals; branch Verify owns the full suite. Inspected counts/exclusions, scope, whitespace and credential-shaped additions.
7. Committed with explicit fleet author and committer, fetched current main and rebased before the first push (main unchanged), audited every candidate identity and trailer, and pushed the first real commit through cloud-push.py. Opened the requested PR. Browser proof and exact-SHA CI observation are recorded in their actual receipts. Evidence travels separately from the product branch; the lane retains its independent gate, Mac publication scan, merge, deploy and live verification.

## All initial proposed changes

```text
Dry run: 3 of 49 seeds changed.
Uptime: version newer tag v0.5.13 (page shows v0.5.12) [to apply]
HappyToHelp: version newer tag v0.4.30 (page shows v0.4.28) [to apply]
Oncall: version newer tag v0.5.16 (page shows v0.5.15) [to apply]
```

No mark, colour, homepage, still, copy, status or share-image proposal. The full source-ref table for all 49 seeds is retained verbatim in dry-baseline/report.md; versions compare to advertised Git tags, copy stays at the released listing tag, brand files track committed seed HEAD and live homepages are separate observations.

## Six active seeds and released refs

| Seed | Before | After | Released copy commit | Result |
| --- | --- | --- | --- | --- |
| uptime | v0.5.12 | v0.5.13 | c1e8376c7dfd6ed601b6fe993567237449fc7143 | Version/provenance only |
| oncall | v0.5.15 | v0.5.16 | 7f250f7e66f1377f7b4b773effd1c72e8854c025 | Version/provenance only |
| happytohelp | v0.4.28 | v0.4.28 | 41fb40246d2e69f928be397c48d952d147c39160 | v0.4.30 withheld |
| lamp | v1.11.18 | v1.11.18 | f495b89afd9f6832e4d4807018d91fa4c4670147 | Old seen state key cleared; copy unchanged |
| orbit | v0.4.10 | v0.4.10 | 22ca38c0e0bb5784440df021e8a5eb5b41a81de8 | Old seen state key cleared; copy unchanged |
| spool | v0.7.12 | v0.7.12 | cc086904fd942175d18c60082b10c459c343dc78 | Old seen state key cleared; copy unchanged |

## Release evidence

| Product | Release URL | Published UTC | Envelope |
| --- | --- | --- | --- |
| uptime | https://github.com/just-every/run-uptime/releases/tag/v0.5.13 | 2026-11-15T21:06:58Z | rer-release.dsse.json present; signature not verified |
| oncall | https://github.com/just-every/run-oncall/releases/tag/v0.5.16 | 2026-11-15T21:07:22Z | rer-release.dsse.json present; signature not verified |

Source proof for each public version edit: the fresh GitHub Release response and annotated-tag peel, plus seed.json row 5 in the released compare. Uptime c1e8376c7dfd6ed601b6fe993567237449fc7143; Oncall 7f250f7e66f1377f7b4b773effd1c72e8854c025.

## Deliberately withheld and preserved

HappyToHelp v0.4.30: advertised tag efea73943b4995e951aa9c2e7a2577eaacfd5042, but the fresh Releases API lists v0.4.28 as the latest published release; no matching v0.4.30 release/envelope evidence. A bare tag does not qualify. Keep v0.4.28. This is the sole final dry-sync proposal; not an unexplained drift or a blocker.

All 43 other seeds remain paused for writes until 25 Nov. No initial proposals for them. Auth remains coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No gallery ingestion, design or capture campaign. Pricing is untouched, preserving Assisted US$10/month and Managed US$100/month without adding GST wording or billing-country restrictions.

Follow-ups preserved: Terrace trust (C); HappyToHelp eight partial-evidence promises (C); Uptime/Lamp partial evidence (C); Spool ERR-006 (D). The sync state observation-key cleanup does not resolve these follow-ups. No seed contract implementation status was promoted.

## RER catalogue drift

Fetched https://runeditrun.com/data/seeds.json at 2026-11-15T22:00:11Z; generatedAt 2026-11-15T13:56:34Z.

- happytohelp: RER 0.4.28, pin v0.4.28.
- lamp: RER 1.11.18, pin v1.11.18.
- uptime: RER 0.5.12, pin v0.5.12.
- oncall: RER 0.5.15, pin v0.5.15.
- spool: RER 0.7.12, pin v0.7.12.
- orbit: RER 0.4.10, pin v0.4.10.

RER was still behind the eligible JE candidate for Uptime (0.5.12 vs 0.5.13) and Oncall (0.5.15 vs 0.5.16). Preserve the verified JE releases; gr owns the RER deploy. No writes outside just-every/home.

## Validation and custody

CHECKS-RECEIPT.json contains commands/results, exact product/base SHA and log hashes. scope-and-counts.json contains before/after counts and per-field data/state differences. Product identity and push receipts are identity-audit.log and product-push.log. No full publication scan is available on this cloud; the Mac lander owns it under the explicit cloud override.

Initial capture prerequisite failures were fixed by installing playwright@1.63.0 globally (the loader does not find a global playwright-core package). No product implementation changes were made for the environment. Initial browser networkidle waiting timed out on background activity; the successful proof waits for DOM content and fonts, uses no changed application paths and closes the browser and only its recorded server PID.

The packet contains no credentials, environment dumps or private gate material. Explicit packet files are published solely to evidence/je-sync-39. Publication is report transport, separate from product readiness/acceptance.


## Browser result and practical limits

At 2026-11-15T22:09:08Z the exact candidate served /uptime and /oncall with HTTP 200. At 1440 the probe asserted the new rendered version, matching JSON-LD and no page-level JavaScript exceptions. Four screenshots show each changed version area once at 1440 and 390. All four observed document widths match their viewport widths (no horizontal overflow). The four images were visually inspected. The browser closed and its recorded local server PID was terminated; the subreaper exited.

The unchanged analytics endpoints in a plain Next production preview log missing Cloudflare caches and the unmigrated local page_views table. These do not affect the changed static listing pages and are not covered by this round; no analytics or deployed-runtime acceptance is claimed. Local preview is not live JE verification, which remains with the lane.


## Final exact-SHA Verify and return

At 2026-11-15T22:11:59Z, run 43767367492 completed/success on 0656778f51b9191393e035773150eaf0f218293e. URL: https://github.com/just-every/home/actions/runs/43767367492. The first discovery at 2026-11-15T22:06:50Z saw in_progress; the one later run read honored the 300-second interval. Eight direct GitHub control calls were used (five release/source reads, PR creation, exact-SHA discovery, final run read); the requested committed sync separately performs its own source-file reads. No failing-job log calls were needed.

Product branch is pushed, PR #63 remains open, exact-SHA Verify is green and the worktree is clean. There are no builder blockers. CUSTODY-RECEIPT.json records the actual terminal product provenance and CI result. Evidence publication is independent of READY and will be named by its exact ref/head in the terminal message. After verified evidence publication, delete the pushed product clone/node_modules; preserve this actual packet outside the clone.

READY branch=cloud/je-sync-39 head=0656778f51b9191393e035773150eaf0f218293e
