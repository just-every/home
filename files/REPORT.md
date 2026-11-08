# je-sync-12 results — 8 November 2026

Done: candidate pushed for lane review. Repository `just-every/home`; branch `cloud/je-sync-12`; full SHA `fa8f9b53062373c3c4a0cab931fe7483f90fef34`; [PR #36](https://github.com/just-every/home/pull/36), titled **sync: seed listings 8 Nov**. No merge or deployment was performed.

## Plan and result

The complete executed plan is in [PLAN.md](PLAN.md). Launcher refresh and fleet credential setup completed; a fresh shallow, blob-filtered clone started at main `d9893baa5c4d862ab94e62cda6b9f43774a60e8f`. Repository instructions and committed sync implementation were read before installation and sync. The branch was rebased onto freshly fetched current main before its first push; main was unchanged. One product writer was used. All product writes stay within the declared scope.

The actual sequence was dependency install → full dry sync → copy-only apply → full apply → released-copy provenance refresh → listings generation/check → fresh full dry sync → type-check/lint/brand check/production build → browser proof → commit/rebase/identity scan → guarded product push → REST PR. No permanent test, gallery, sync implementation, pricing, or unrelated page changes were made.

## Counts and product diff

| | Before | After |
| --- | ---: | ---: |
| All listings | 49 | 49 |
| Released | 35 | 35 |
| Coming soon | 14 | 14 |
| JE/seed clause statuses changed by this builder | 0 | 0 |

Only these three product paths changed:

- `src/data/seed-pages.ts`: Lamp version v1.11.3 → v1.11.4.
- `public/data/listings.json`: matching Lamp version plus generatedAt; every other listing field is unchanged.
- `scripts/seeds-sync/state.json`: timestamp and released/unreleased source provenance for the seven seeds below. No brand/homepage observation changed.

The exact patch is [product.patch](product.patch); machine receipts are [diff-receipt.json](diff-receipt.json), [postcommit-receipt.json](postcommit-receipt.json) and [RECEIPT.json](RECEIPT.json).

## Initial dry-sync lines and all proposals

```text
Dry run: 5 of 49 seeds changed.
Lamp: version newer tag v1.11.4 (page shows v1.11.3) [to apply]
Blotter (coming soon): copy CONTRACT.md changed since the last sync [reported]
Crank (coming soon): copy CONTRACT.md changed since the last sync [reported]
Placemat (coming soon): copy CONTRACT.md changed since the last sync [reported]
Platter (coming soon): copy CONTRACT.md changed since the last sync [reported]
```

All 49 sources and homepages were readable. The actual tool found no mark, colour, homepage/still, headline, incumbent, released-status, recurring open, manual, or share-image follow-up. Thus there was no mark/colour/status design work to apply or withhold. Full initial output and all 49 exact source refs are in [dry-01.log](dry-01.log), [dry-01/report.md](dry-01/report.md), and [dry-01/report.json](dry-01/report.json).

## Source refs and per-seed result

| Seed | Prior source commit | Observed source commit | Ref / product result |
| --- | --- | --- | --- |
| blotter | `4e7612a8313d08773cf95527824ef60c214837f2` | `43da1e7f3312fc5463844e08b220eeff746c7902` | HEAD provenance only; no wording/status import |
| crank | `97dbba76c57a620110886e92a959fbf15b07d3d0` | `18cf94064499fd097f145cd1c45a681dadd08445` | HEAD provenance only; no wording/status import |
| lamp | `d42822f3281899cda3d5636ed30915e8bc287ae0` | `720ee842bc0f69fe32b419f40cf9f78d0bf562c5` | v1.11.3 → v1.11.4; released source and version |
| mallet | `05f12bb25287d22654fda8b2a549712d14e94c1c` | `095576e8bfe68bf364228679ff6bd34176a89907` | HEAD provenance only; no wording/status import |
| placemat | `187fa5c3720adb99a25412f029821a840d950867` | `6232d682d8356f2eb0f2d9e58b4e44bba51fd9cd` | HEAD provenance only; no wording/status import |
| platter | `b384813c64c78665f189b5aa1f6b8f2c0fca79da` | `85dee737177a6559448a012b2b6e22cad05f5e1a` | HEAD provenance only; no wording/status import |
| strap | `ceba5960cbe5ddc323624eb128280ce241f59e72` | `008fef24f74b44bdb2aaf0fd95dcf50c45ceea7c` | HEAD provenance only; no wording/status import |

Other seeds retain their source provenance and all public content. Mallet and Strap moved HEAD without changing CONTRACT.md/README.md/seed.json hashes; Blotter, Crank, Placemat and Platter changed CONTRACT.md hashes. The four coming-soon compare ranges, review, source rows and decisions are recorded in [COPY-REVIEW.md](COPY-REVIEW.md).

## Release and copy decision

Lamp v1.11.4 qualifies for the existing RELEASED rule: [GitHub Release](https://github.com/just-every/run-lamp/releases/tag/v1.11.4), published 2026-11-08T07:27:02Z, `draft=false`, `prerelease=false`, with `rer-release.dsse.json` (3141 bytes). [Actual API receipt](lamp-release-v1.11.4.json). Envelope asset presence was checked; cryptographic signature verification was not performed. The new release tag resolves to `720ee842bc0f69fe32b419f40cf9f78d0bf562c5`. No coming-soon seed was promoted.

The copy-only flag records source refs/commits/hashes while preserving public copy, marks, colours and homepage observations. It first recorded the four coming-soon contract changes. After the version import, a second copy-only apply brought Lamp provenance to the newly displayed release. The released contract’s entire normative prefix before `## Status` is identical (216774 bytes, SHA-256 `609671875c97a6790a53c6d885f3da7e3d0104ea0e7f3353e35fae83d83f83ee`). Changed implementation evidence/judgment text does not make JE wording false. All existing public claims stay. The file/row mappings for the retained promises are in [COPY-REVIEW.md](COPY-REVIEW.md); [copy-review-receipt.json](copy-review-receipt.json) records the exact source hashes. No public claim edit requires a correction citation.

## Deliberately withheld

- Blotter, Crank, Placemat and Platter unreleased contract wording/status drift: recorded as source provenance only. The upstream Blotter INTEGRATE-005 and Platter CRM-004 missing → partial observations are not JE promotions; Crank/Placemat evidence updates keep their recorded upstream statuses.
- Lamp’s upstream implementation-judgment changes: recorded at the release boundary, without changing or promoting contract status or public claims.
- Auth remains coming soon under the owner override, regardless of its existing tag.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent.
- RER inventory gaps or older versions do not lower JE versions and trigger no RER work.

Accepted Assisted US$10/month and Managed US$100/month presentation is preserved without adding GST language or billing-country restrictions. All pricing files are untouched. No mark, colour, homepage still, gallery, logo, design or share image was changed.

## Fresh public source observations

Fresh justevery.com listings and brand bytes matched main: listings SHA-256 `790e115fdf755eea1212b68df6df033fb9d2467dbff94cad0f61ad2928544bc8`; brand SHA-256 `a54bb68daa5f1590e5a6eaafecf38c627e42fa014f65c0d7efaf81bee809b7a4`. `https://runeditrun.com/data/seeds.json` was readable and contained 16 seeds (SHA-256 `0fc0f96a41a81b700692a04b9100ca6f6abed2b402dfb7f960ecf612e9561faf`). RER had older versions for HappyToHelp, Lamp, Uptime, Penny, Oncall, Orbit, Mango, Vector and Pantry; JE versions were preserved. Actual metadata is in [public-sources.json](public-sources.json) and [rer-version-observations.json](rer-version-observations.json). A shorthand `/seeds.json` probe returned 404; the actual `/data/seeds.json` source succeeded.

## Checks and browser evidence

- `npm ci`: passed.
- `npm run seeds:sync (dry initial)`: passed after installing missing Playwright.
- `npm run seeds:sync -- --copy-only --apply`: passed.
- `npm run seeds:sync -- --apply`: passed; Lamp version only.
- `npm run seeds:sync -- --copy-only --apply (release refresh)`: passed; new release provenance.
- `npm run listings`: passed.
- `npm run listings -- --check`: passed.
- `npm run seeds:sync (dry final)`: passed: 0/49 changed, 0 unreadable.
- `npm run type-check`: passed.
- `npm run lint`: passed.
- `npm run brand -- --check`: passed.
- `npm run build`: passed.
- `browser assertion at 1440`: passed.
- `browser proof at 1440 and 390`: passed.
- `git diff --check`: passed.
- `scope and credential-shaped diff inspection`: passed.
- `all candidate commit identities and trailers`: passed: fleet, no trailers.
- `rebase origin/main before first push`: passed; main unchanged.
- `cloud push guard`: passed on attempt 1.

Final full dry sync: **0 of 49 seeds changed, 0 unreadable, zero findings of any kind**. Ref metadata was freshly reread through REST for this final pass. [Actual final report](dry-final/report.md), [JSON](dry-final/report.json), [terminal output](dry-final.log). No unexplained change remains.

The browser assertion checks the displayed Lamp version and the generated listing/counts at 1440. Screenshots show the changed version section once at [1440](browser/lamp-1440.png) and [390](browser/lamp-390.png). Both returned HTTP 200, with no page errors or horizontal overflow. [Actual browser receipt](browser-receipt.json). The browser was closed and the task-owned Next server PID 28009 was stopped.

The required cloud Git hook initially could not dispatch Husky through a location-sensitive symlink. A dispatcher under the clone’s Git common directory restored the original hook’s real path; the successful commit ran repository eslint and Prettier hooks. No hook was disabled. The initial missing Playwright runtime and initial networkidle timeout were repaired outside product code; the subsequent sync and browser checks passed. The standalone screenshot server logged optional tokens/events API limitations because it had no Cloudflare caches global or migrated page_views table; the public Lamp page and listings checks passed, and no provider account or credentials were used. Those optional endpoints are outside this data-only candidate.

## Custody, CI and lane boundary

Product push succeeded through cloud-push.py on attempt 1. One candidate commit, including all reachable side parents in origin/main..HEAD, passed fleet author/committer and trailer inspection; no co-author trailer exists. Diff hygiene, scope and credential-shaped-value checks passed. The product working tree was clean after commit.

One exact-SHA REST discovery observation confirms push **Verify branch** run [42535960375](https://github.com/just-every/home/actions/runs/42535960375) completed **success** on `fa8f9b53062373c3c4a0cab931fe7483f90fef34`. The PR-event Verify run 42535988718 is intentionally skipped by the workflow’s cloud-branch condition; the required push run is green. Dynamic PR run 42535986609 also succeeded. The one PR creation plus one CI discovery used two of the ten CI/PR control API calls; no failed-job log call was needed. Actual response: [ci-discovery.json](ci-discovery.json). This supports READY for the product candidate. Evidence publication is a separate report-only ref and is not a product landing signal. The lane retains independent deciding review, Mac publication scan, merge, deployment and live browser verification. No main/default branch was pushed.

No product blocker is known; envelope signatures were not independently verified by this builder. All reports and selected actual non-secret receipts are published separately on `refs/heads/evidence/je-sync-12` before clone cleanup. The product clone and node_modules are removed only after remote product/evidence custody is verified.
