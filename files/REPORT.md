# je-sync-49 — catalogue maintenance result

Author: Run Edit Run fleet. Timestamp: 2026-11-19T03:31:37Z.

Done: the candidate for just-every/home is published on cloud/je-sync-49 at ebb37c16d14f5da21a34b4b70398e3b0af654e8c. PR: https://github.com/just-every/home/pull/75. Product push succeeded on the first guarded attempt. No landing or deployment was performed.

## Plan and scope

The full execution plan is in PLAN.md. Completed: fresh shallow blobless main clone; AGENTS.md and sync implementation review; dependency installation; six-path dry sync; release evidence review; copy-only apply; mechanical apply; released-tag provenance refresh; listings generation/check; repeated dry sync; typecheck/lint/production build; diff/scope/identity review; fresh-main fetch and pre-publication rebase; guarded branch push; PR; candidate browser proof. CI and evidence custody are recorded separately below. Only three permitted product paths changed. Later seeds are paused until 25 November and were not inspected or changed.

## Before and after

| Seed | JE before | JE candidate | Fresh RER version | Product change |
| --- | --- | --- | --- | --- |
| HappyToHelp | v0.4.31 | v0.4.31 | 0.4.31 | none |
| Lamp | v1.11.22 | v1.11.23 | 1.11.22 | version and released copy provenance |
| Uptime | v0.5.17 | v0.5.17 | 0.5.16 | sync observation only |
| Oncall | v0.5.18 | v0.5.19 | 0.5.18 | version and released copy provenance |
| Orbit | v0.4.11 | v0.4.11 | 0.4.11 | none |
| Spool | v0.7.14 | v0.7.14 | 0.7.14 | none |

Counts before and after: 49 listings, 35 released, 14 coming soon. No seed changed release status. No clause status changed. Pricing presentation remains Assisted US$10/month and Managed US$100/month; no pricing file changed.

Fresh https://runeditrun.com/data/seeds.json was read by repository URL/name, including Spool under id errors-workbench. Its generatedAt stamp is static; actual entry versions above were compared. JE retained its newer Uptime release and advances beyond RER's Lamp and Oncall entries. See rer-comparison.json for the selected source facts.

## Actual sync findings

All sync invocations used the committed tool with --only happytohelp,lamp,uptime,oncall,orbit,spool because later seeds are paused. The initial dry run printed:

    Dry run: 2 of 6 seeds changed.
    Lamp: version newer tag v1.11.23 (page shows v1.11.22) [to apply]
    Oncall: version newer tag v0.5.19 (page shows v0.5.18) [to apply]
    2 finding(s) still open from the last sync.

No mark, colour, status, homepage, still or public-copy update was proposed. Existing open findings were Uptime and Oncall lacking an alternative-to line on their live homepages; incumbent lists remain unchanged. The initial copy-only apply reported zero changes and preserved public copy and art. Mechanical apply reported exactly the two version updates. After versions moved, a second copy-only apply recorded changed CONTRACT.md, README.md and seed.json hashes at the new released tags for Lamp and Oncall. The final dry run printed:

    Dry run: 0 of 6 seeds changed.
    2 finding(s) still open from the last sync.

No unexplained change remains within this round's six-path scope. Actual complete tool reports are retained as dry-before.*, copy-before.*, apply.*, copy-after.* and dry-after.*.

## Release evidence and source refs

Both promotions were freshly checked through GitHub's Releases API, rather than inferred from tags. Each is published, non-draft and non-prerelease with rer-release.dsse.json in its assets. Only envelope asset presence is claimed; the envelope was not downloaded or cryptographically verified.

- Lamp v1.11.23, published 2026-11-19T01:05:42Z: https://github.com/just-every/run-lamp/releases/tag/v1.11.23
- Oncall v0.5.19, published 2026-11-18T21:42:25Z: https://github.com/just-every/run-oncall/releases/tag/v0.5.19

The six release-response receipts confirm no newer published eligible release for HappyToHelp, Uptime, Orbit or Spool. Oncall's older v0.5.0 draft and Spool's older v0.7.0 draft were ignored. They are not promotion evidence.

| Seed | Candidate copy source | Resolved commit |
| --- | --- | --- |
| HappyToHelp | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f |
| Lamp | v1.11.23 | 199a635758939ab54b12f3a76dabeee68ab74b8f |
| Uptime | v0.5.17 | 359b1bb93606ccfe5dc0120d2cdce78e8df67f6a |
| Oncall | v0.5.19 | 518317b385c4535599bfc670dd676da46069b451 |
| Orbit | v0.4.11 | a4fcbfcd72fa4253826f43d0b0de02275094f86d |
| Spool | v0.7.14 | 1853e3b3b59d49853b5ee7678f851d6de8343fbf |

Initial Lamp source was v1.11.22 at 4c90e6c8f35775e2a0287ab24ccba87d7a8d8485; initial Oncall source was v0.5.18 at 8dd2a0acf06b30fbc810c8a2a7e0fe8c01dd85ef. Other source refs were unchanged. Released listing versions, rather than default-branch implementation, bound copy reads. Brand observations continued to follow seed HEAD as the tool documents; they produced no changes.

## Copy review and withheld items

The actual released-source compare receipts are copy-review-lamp.json and copy-review-oncall.json. Both seed.json files change version at row 4, supporting JE src/data/seed-pages.ts rows 348 and 1046 and the corresponding generated listings.

Lamp CONTRACT.md hunks at rows 1128 and 2761 expand Sorry import/template accounting; later hunks update source judgments and evidence. README.md hunks from row 52 refine CLI PATH instructions and explicit installed-CLI use. None disproves JE's existing public summary, capabilities or promises, so none was rewritten. Source implementation judgments were not copied into JE.

Oncall README.md rows 1–2 add “Rotas, alerts and incident notes for your team. Works beside your pager.” CONTRACT.md hunks at rows 687, 741, 959, 1015, 1146, 1220, 1278 and 1520 add bounded agent, schedule, readback and runbook proof while retaining the source's incomplete judgments. These remain consistent with JE's existing rota/incident copy and paging-off promises. No public wording was changed and no implementation status was promoted.

Deliberately retained or withheld:

- Uptime and Oncall missing alternative-to homepage lines: existing open findings, with incumbent lists retained.
- Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial evidence (C), and Spool ERR-006 (D): existing follow-ups preserved; no unrelated copy pass or claim promotion.
- Coming-soon/later-seed copy drift: not imported or assessed while paused; this run covers the six released paths only.
- Bare tags or draft Releases: no promotion; the only newer six-path tags match the two eligible published Releases.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent; overrides did not need changing.
- No new marks, colours, homepage design, gallery capture, still import or capture campaign. Built-in homepage observations were used for comparison only.

## Product diff

- src/data/seed-pages.ts: only Lamp and Oncall version strings changed.
- public/data/listings.json: those versions and generatedAt changed through npm run listings.
- scripts/seeds-sync/state.json: Lamp and Oncall released refs, commits and copy hashes; copy findings recorded; sync timestamp; Uptime homepage fingerprint observation and cleared prior copy finding. No other seed state changed.

The exact diff is product.diff. There are no product report files, generated contract views, lock edits, tests or sync-implementation changes. The product checkout is clean.

## Checks and browser proof

Passed: npm ci; npm run listings; npm run listings -- --check (49 current); npm run type-check; npm run lint; npm run build; git diff --check; scope, excluded-entry, before/after catalogue and credential-shape checks. No new tests were added for this data-only change; the full suite belongs to branch Verify. Check logs and checks-receipt.json retain actual outcomes.

Candidate browser assertions at 1440 confirmed real HTTP 200 pages, displayed versions matching the public catalogue and matching SoftwareApplication version data. Four screenshots show each changed version screen once at 1440 and once at 390: lamp-1440.png, lamp-390.png, oncall-1440.png, oncall-390.png. Initial networkidle waiting timed out; the first browser/server were closed and the successful retry waited for page load, blocked external requests and used real local application responses. The standalone Next preview logged unavailable Cloudflare-only token-cache/page-view facilities; these were not catalogue failures, and no provider setup or credentials were used. No preview API response was mocked. Both servers were stopped by their recorded PIDs, and browsers closed.

## Publication custody and limits

Fleet hooks preserved repository hooks. All candidate authors, committers and messages were checked, including side-parent reachability; the one product commit has no co-author trailer. Fresh origin/main remained 3ca519fe5ed32210f185a60764e2c605f0fc4062 and rebase reported up to date before first push. cloud-push.py pushed the named branch successfully on attempt 1. custody-receipt.json and pr-receipt.json retain exact product provenance.

The full Mac publication scan, independent gate, PR merge, deployment and live verification remain with the lane as required by the cloud adaptation. Local candidate checks do not waive them. The evidence child commit and evidence ref are report transport only, never product acceptance or landing.

## Exact-SHA CI observation

Observed once through REST at 2026-11-19T03:32:50Z. Verify branch push run 44451676898 is completed/success on ebb37c16d14f5da21a34b4b70398e3b0af654e8c: https://github.com/just-every/home/actions/runs/44451676898. The pull-request Verify wrapper run 44451720981 is intentionally skipped for cloud branches; its result was not used as proof. Ancillary PR workflow 44451716778 also succeeded on this SHA. No CI poll or failed-log call was needed. Ten manual GitHub calls were used: six release reads, two released-source compare reads, one PR creation and one exact-SHA CI discovery; the mandated committed sync tool also made its own existing content reads. No task-local API adapter was installed.

No product blockers remain. Independent lane gates still apply. Evidence publication is separate custody and never authorizes landing.

READY branch=cloud/je-sync-49 head=ebb37c16d14f5da21a34b4b70398e3b0af654e8c

