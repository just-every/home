# je-sync-31 report

Recorded 2026-11-13T22:54:07Z. Repository: just-every/home. Branch: cloud/je-sync-31.
Product head: `055dc4dbed1ae33d95a9cf0412464558c5ff5aef`. Base: `8d4a1a7af1f507fb24e1f6e2502bf0e967f31663`.
PR: https://github.com/just-every/home/pull/55 (open, main base; no merge or deployment).

## Plan and scope

The complete execution plan is in PLAN.md. Configure fleet identity/launcher/guards; shallow-clone home; inspect committed sync tools; install with npm ci; dry-sync the six path seeds; verify published Releases; review copy-only apply; apply eligible mechanical drift; refresh copy provenance at the new displayed release; regenerate/check listings; run final dry sync, type-check, lint and production build; rebase onto fresh main; inspect identities/trailers and credential-shaped values; push the named branch; open the requested PR; observe exact-SHA Verify; publish the report packet separately and remove the disposable checkout.

Every sync used `--only happytohelp,lamp,uptime,oncall,orbit,spool`: later seeds are paused until 25 November. Other repositories were read solely through gh api. An external, uncommitted command shim translated the tool's `git ls-remote` source-ref queries to REST commits/HEAD and git/matching-refs/tags, peeling annotated tags through REST. No other repository was cloned, written or given a PR. Source reads were fresh at the beginning of this run and cached within the round to avoid repeat reads. Sync implementation was unchanged.

## Actual tool output and decisions

Initial dry: `Dry run: 1 of 6 seeds changed.` The complete proposal was `Lamp: version newer tag v1.11.15 (page shows v1.11.14) [to apply]`. No mark, colour, homepage, status or copy changes were proposed. All six homepages were readable. The actual tool output had no mark/colour/status follow-up requiring an edit, and no share-image follow-up. No images or galleries were imported.

`--copy-only --apply` is provenance-only: it reads CONTRACT.md, README.md and seed.json at the currently displayed release tag, preserves brand/home observations and all published wording/art, and records source hashes and unresolved findings. The first run reported `Applied: 0 of 6 seeds changed.`

Mechanical apply reported `Applied: 1 of 6 seeds changed.` and imported only Lamp's version. Since that first apply necessarily read copy at the previously displayed v1.11.14, a second copy-only apply then read v1.11.15 at its resolved commit, reported the README.md/seed.json differences and updated provenance. This is deliberately reviewed copy drift, not permission for an automatic rewrite.

Final dry: `Dry run: 0 of 6 seeds changed.` There is no unexplained six-path drift.

## Released sources and per-seed result

| Seed | Before | After | Final copy source commit | Non-draft, non-prerelease Release |
| --- | --- | --- | --- | --- |
| happytohelp | v0.4.25 | v0.4.25 | `333af4b0580c4284616783f1d79fcc9aad3aefc5` | [Release](https://github.com/just-every/run-happytohelp/releases/tag/v0.4.25) |
| lamp | v1.11.14 | v1.11.15 | `5dd84e13f6b0478edc2fc5e759d513f5eccf6d57` | [Release](https://github.com/just-every/run-lamp/releases/tag/v1.11.15) |
| uptime | v0.5.11 | v0.5.11 | `04016399e1e879e7be3b8e891baf02d975bb3901` | [Release](https://github.com/just-every/run-uptime/releases/tag/v0.5.11) |
| oncall | v0.5.13 | v0.5.13 | `8adae6c836f2fabda29e8a091b052450410c8ca5` | [Release](https://github.com/just-every/run-oncall/releases/tag/v0.5.13) |
| orbit | v0.4.9 | v0.4.9 | `a5f471626aea1bfcb2c79f5dbee2250fdb38fd49` | [Release](https://github.com/just-every/run-orbit/releases/tag/v0.4.9) |
| spool | v0.7.10 | v0.7.10 | `417ab513b3032370091479fa28f41a5a67b50c53` | [Release](https://github.com/just-every/run-spool/releases/tag/v0.7.10) |

Each listed Release carries rer-release.dsse.json. Full relevant metadata, DSSE asset IDs/digests, resolved copy commits and brand HEAD commits are in release-receipts.json. All five unchanged versions match the newest stable tag observed by the sync. None was downgraded against lagging inventory. All six were already released; no coming-soon seed or implementation status was promoted.

Lamp v1.11.15 resolves to `5dd84e13f6b0478edc2fc5e759d513f5eccf6d57`, matching the brief. Its downloaded DSSE envelope SHA-256 is `e9081372615ae76b5c832d71c40bf15023d783369fd64e49b762f93b76fa6350`, matching both the Release asset digest and the stated digest. The decoded payload names the same repository, tag, version and publicCommit; it contains a signature entry. This verifies asset presence, downloaded-byte integrity and statement consistency. It is **not cryptographic signature verification**, which was not performed. Both actual envelope and decoded statement are included.

## Copy provenance review

Lamp's released README.md at the new commit, lines 87–101, replaces stale checkout/tag examples with instructions to choose a published release and substitute vX.Y.Z. That guidance does not contradict existing JE product wording. seed.json row 4 changes only `version` from 1.11.14 to 1.11.15; it supports `src/data/seed-pages.ts:348` and the generated Lamp listing's version. CONTRACT.md is byte-identical between the two tags: full SHA-256 `8b575f27ee607ce3f259e3ec0d733febbf5536d9906cb99a0d9a2ede09c5096f`. README/seed diff files and full source hashes are included in copy-review-receipt.json.

The other five released seeds' CONTRACT.md, README.md and seed.json hashes match the previously recorded release sources. No changed released source disproves their existing wording; no prose rewrite was justified, and the standing partial-evidence follow-ups remain. All copy wording remains as on main. Generated state clears previously seen copy-finding IDs for HappyToHelp, Oncall and Spool after observing unchanged current sources, and records Lamp's reviewed README/seed drift. Those sync bookkeeping IDs do not represent the standing copy follow-ups or clause statuses.

## Withheld and preserved

- Later-seed and coming-soon/unreleased copy drift was not imported or reviewed beyond the brief's six-path boundary; that scope stays paused until 25 November.
- Terrace trust (C), HappyToHelp's eight partial-evidence promises (C), Uptime/Lamp partial evidence (C) and Spool ERR-006 (D) are preserved. There are no clause-status changes, promotions or new DONE claims.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent; the generated listing check confirms the hidden list stays excluded.
- Assisted US$10/month and Managed US$100/month remain untouched. No GST or billing-country language was added.
- No mark, colour, homepage still, new design, gallery capture, source sync implementation or unrelated copy change was justified by the actual report. No new capture campaign was started; the committed tool's normal six-homepage observations and candidate browser proof are the only browser work.

## Product diff and counts

Only three allowed paths changed: public/data/listings.json, scripts/seeds-sync/state.json and src/data/seed-pages.ts. The exact product diff is in product.diff. The public listing content changes only Lamp's version, plus the generator timestamp. State records that release and copy provenance and the sync's reviewed findings. No evidence file is in the product commit.

Before: 49 listings / 35 released / 14 coming soon. After: **49 / 35 / 14**. No public claims or contract implementation statuses changed. Non-path seed state entries are byte-for-byte equivalent as parsed JSON.

## Validation and custody

npm ci, listings generation, listings --check, type-check, lint and production build all passed. Full local suite and rer verify were not run, per the brief. Final dry sync is clean. Git diff --check and credential-shaped-value checks passed; every candidate author and committer is Run Edit Run fleet <fleet@runeditrun.com>, with no trailers or OpenAI/Codex co-authors. The first real commit was pushed immediately after successful local touched checks and rebase onto the freshly fetched main. Product branch push succeeded through cloud-push.py.

The supplied hook symlinks initially prevented Husky from locating its relative h loader. The first commit was rejected, and the guard also rejected an attempted push before any new product commit existed. No product ref was published by that failed attempt. Hook delegates were repaired outside the product tree to execute the original Husky paths, preserving repository hooks and co-author cleanup; lint-staged then passed and the real commit/push succeeded. The initial sanitized rejection log is retained as an actual receipt. No hooks were disabled or bypassed and no published history was rewritten.

Browser proof on the production build shows the changed Lamp version once at 1440 and 390. Assertions run at 1440 only and verify that rendered version, softwareVersion metadata and served public listings agree. Both screenshot widths display v1.11.15. An initial networkidle wait timed out; DOM-loaded proof passed. Local next start emitted existing background Cloudflare caches/D1 analytics errors because that local runtime was not provisioned; the changed page and data returned 200 and passed. No provider credentials, deployment or live verification were used. The browser was closed and only the recorded Next server PID was stopped; its subreaper exited.

The full Mac publication scan, independent non-builder gate, landing hold, merge, deployment and live verification remain owned by the lane. The cloud cannot run the fleet's publication scan. This report does not waive any of those gates.

CI: **completed/success** on exact SHA `055dc4dbed1ae33d95a9cf0412464558c5ff5aef`, Verify branch run [43522518973](https://github.com/just-every/home/actions/runs/43522518973). Discovery at 22:50:53Z was in progress; the sole follow-up at 2026-11-13T22:55:53Z was completed/success, 300 seconds later. Three orchestration API calls were used: PR creation, exact-SHA run discovery, and the single follow-up. The committed sync's required source reads are recorded separately in api-reads.log. No failed jobs, log downloads, workflow reruns or rapid polling were needed.

Blockers: none. Product candidate is READY for the lane's retained gates. Publish this complete non-secret packet only to refs/heads/evidence/je-sync-31; evidence does not promote or land the product.

READY branch=cloud/je-sync-31 head=055dc4dbed1ae33d95a9cf0412464558c5ff5aef
