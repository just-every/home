# je-sync-17 results

Candidate for just-every/home; branch cloud/je-sync-17. Base c520b40c7b5bec6943a7e08bbb8fbdccc5ad535a. No landing or deployment performed. Product and evidence custody are recorded separately below.

## Plan executed

Follow PLAN.md: configure fleet identity/auth/hooks; read the committed sync implementation; install locked dependencies; dry-run all 49 seeds; run copy-only apply; validate Release eligibility; apply mechanical changes; advance copy provenance to promoted tags; regenerate/check listings; repeat dry sync; type-check/lint/build; browser proof; synchronize main before first push; inspect identities/diff; publish the named branch, open a PR, inspect exact-SHA Verify and publish this evidence packet.

All cross-repository reads used gh api. A temporary executable adapter outside the checkout translated the tool's git ls-remote calls into GitHub REST ref/commit reads; no sync implementation was edited and no other repository was cloned or written. Each gh command loaded its token privately from the refreshed fleet bundle. No rer setup/build was needed for this npm-managed website; the pinned cloud shell and cloud_run subreaper were used for dependency, sync, build and browser work.

## Proposed and applied changes

The initial dry run reported exactly four findings, all versions: “Dry run: 4 of 49 seeds changed.” The full stdout and all 49 source refs are in dry-before.txt and dry-before/report.json. All 49 repositories and homepages were readable. Marks, colours, released/coming-soon status, homepage/still, headline, incumbent and copy drift: zero findings. No mark/colour/status follow-up was invented. The share-image notes were empty.

| Seed | Version before → after | Copy source commit at promoted tag | Eligible Release |
| --- | --- | --- | --- |
| happytohelp | v0.4.18 → v0.4.19 | 63b6217aae78be1cdaf5d1b8f8ac6f1d04ce83ad | https://github.com/just-every/run-happytohelp/releases/tag/v0.4.19 (2026-11-11T06:22:53Z) |
| oncall | v0.5.6 → v0.5.7 | 4d80176140c138d0d9b01830b75e2edc18f9b8da | https://github.com/just-every/run-oncall/releases/tag/v0.5.7 (2026-11-11T08:31:26Z) |
| orbit | v0.4.4 → v0.4.5 | 36f701cc53e127f0ed4baf367625af329fef6768 | https://github.com/just-every/run-orbit/releases/tag/v0.4.5 (2026-11-11T05:54:43Z) |
| spool | v0.7.4 → v0.7.5 | 5886617d17da50761fb442f66b03ce623d5e9559 | https://github.com/just-every/run-spool/releases/tag/v0.7.5 (2026-11-11T06:02:41Z) |

Fresh inspection found Oncall v0.5.7, published at 08:31:26 UTC after the brief's three-release snapshot. It was included under the instruction to verify fresh sources. The requested PR title retains “(3)”; its body explains the fourth eligible version update.

Every Release above has draft=false, prerelease=false and an asset named rer-release.dsse.json. releases.json preserves the actual Release/asset metadata. This proves envelope-asset presence, not cryptographic signature verification. No bare-tag promotion was used. There were no status promotions.

Product files: public/data/listings.json (regenerated versions and generatedAt), src/data/seed-pages.ts (four version strings), scripts/seeds-sync/state.json (new tag/commit/copy hashes, latest tool-observed homepage fingerprints and acknowledged copy-finding keys). Subthreshold screenshot fingerprint changes are observation noise recorded by the tool; no corresponding art, still or wording changed. Old acknowledged Lamp/Uptime copy keys were cleared by the full apply, and new copy keys for the four promoted tags were recorded by the final copy-only apply. These are provenance bookkeeping, not new implementation judgments.

## Copy review and clause judgments

--copy-only --apply was read before use: it records copy source provenance and preserves public wording, brand and homepage observations. The first copy-only apply at existing JE tags reported 0 of 49 changed. After version apply, a second copy-only apply read the promoted tags and reported four copy findings: HappyToHelp README.md/seed.json; Orbit CONTRACT.md/seed.json; Oncall README.md/seed.json; Spool README.md/seed.json. Actual source snapshots and diffs are retained under sources/ and *-contract.diff, *-README.md.diff, *-seed.json.diff.

All four seed.json diffs change only version (row 4). Orbit README is identical. Spool README changes only tag/upgrade references (rows 36, 58, 80). Oncall README changes only its latest-tag reference (row 34). HappyToHelp README rows 40–49 describe the help-article policy-query fix, no new migration, and retained upgrade custody; its installation tag references also advance. None proves a JE public claim false, so zero summary/does/promises/SEO wording edits were made.

HappyToHelp, Spool and Oncall CONTRACT.md are byte-identical between their old and new tags. Orbit CONTRACT.md changes only its implementation-evidence table: RECORD-008, BRIEF-002, PUBLIC-002, FORM-002 and AGENT-002 are partial→done upstream (rows 2417, 2472, 2479, 2512, 2580 at v0.4.5). This is a read-only observation of the seed's judgment; JE changes no clause status and promotes no seed implementation judgment. The existing Orbit promise requirements remain unchanged.

The standing C follow-ups remain as instructed:

- HappyToHelp v0.4.19 CONTRACT.md implementation rows 1204/1205/1208/1210/1212/1215/1269/1279 still mark CONVERSATION-001, DELIVERY-001, OUTCOMES-001, CONNECTIONS-001, AI-001, DELEGATION-001, IDENTITY-003 and PORTABILITY-001 partial. Their requirement text (sections beginning at rows 153, 161, 182, 196, 212, 233 and the two target sections) and retained JE wording were reviewed. No new contradictory source was found; no wording round was imported.
- Uptime v0.5.4 STATE-001/NETWORK-001 remain partial at rows 1512/1514. Lamp v1.11.10 PAGE-006, INCIDENT-004, UPDATE-008, SUB-006, NOTIFY-004, NOTIFY-009, INTAKE-002 and MOVE-002 remain partial at rows 3199/3253/3271/3301/3323/3329/3345/3408. They have no new sync finding and predate the base; existing wording was retained.
- Terrace v0.1.4 retains exact-cent ledger/reconciliation requirements. Its homepage mapping row 373 marks “keeps every owner's books reconciled” partial; this is an evidence qualification, not newly false wording. ACCT-001 and ACCT-011 are done at rows 546/556. The flagged summary/does wording was retained under the brief's default; no contract or judgment was changed.

## Withheld items and invariants

No eligible mechanical finding was withheld. No coming-soon/unreleased copy drift was detected across the 14 HEAD sources, and no unreleased wording was imported. Auth stays coming soon under the existing override. No RER inventory was imported, downgraded, edited or launched. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No galleries, captures for product ingestion, marks, favicons or homepage assets were changed. The sync's ordinary diagnostic homepage captures are evidence only. Accepted Assisted US$10/month and Managed US$100/month presentation and all pricing source files are unchanged; no GST or country restrictions were added.

Before/after: 49→49 listings, 35→35 released, 14→14 coming soon; 4 version updates, 0 status promotions, 0 public claim edits, 0 JE clause status changes. listing-diff.json contains an exact per-field comparison and excluded-seed assertion.

## Validation and custody

See checks.json and the actual command logs for check outcomes. The exact final SHA, PR, Verify run and evidence transfer are added below after publication. The lane retains independent deciding review, publication scan, merge, deployment and live verification. A successful builder check does not perform any of those actions.

Local validation completed successfully: listings generated/current (49), type-check, lint, production build (61 pages), brand check (a54bb68daa5f1590e5a6eaafecf38c627e42fa014f65c0d7efaf81bee809b7a4). Final full dry sync: 0 of 49 changed, every source and homepage readable, no withheld or unexplained finding. Browser proof contains eight full-page PNGs and browser/receipt.json: HTTP 200, visible new version, matching structured data and no desktop horizontal overflow asserted at 1440; all four pages also captured at 390. Browser contexts and both local server attempts were closed/stopped.

The first browser attempt timed out on networkidle because auxiliary local token/analytics API requests do not have the production cache/database in this preview. The successful retry waited for visible version content and fonts, with identical version/structured-data/overflow assertions. Static listing content was served by the real production build; no application paths or data were mocked. Auxiliary API errors are preserved in server.txt and were not represented as API validation.

The first commit attempt was rejected because the prescribed symlink forwarding relocated Husky's $0, breaking its sibling h lookup. Clone-local forwarding for existing executable hooks was changed to exec their original absolute path. The fleet commit-message cleanup stayed active; the original pre-commit ran eslint --fix and Prettier successfully on the three staged files. The repository pre-push hook (git lfs pre-push) remained active. No tracked hook or implementation file was changed.

Fresh main remained at the base SHA; env-scoped fleet identity was used for rebase --autostash before the first commit/push. Candidate identity/message/scope/credential-shape/whitespace checks passed for the sole candidate commit, including all side parents. The first guarded product push succeeded without retry.

## Terminal product result

Done. Branch cloud/je-sync-17; full SHA a5fcb3ad373f028a71c9271daf5a682af20614f4; PR https://github.com/just-every/home/pull/41. Verify branch push run 43004692443 is completed/success on that exact SHA: https://github.com/just-every/home/actions/runs/43004692443, observed 2026-11-11T10:40:08.333203+00:00. The discovery observation and the final observation were 301 seconds apart; monitoring used two CI REST calls and one PR creation call within the ten-call budget. Discovery also saw PR-event Verify 43004735242 pending and dynamic PR #41 run 43004731353 in progress at its observation time; the required passing push Verify is 43004692443, and no other SHA is used as green evidence.

Product push and remote-advertised HEAD were verified. No eligible drift was withheld, no public claim or JE clause status changed, no blocker remains for producing the candidate. The standing C wording/evidence follow-ups remain with the lane under the stated default. This packet is being published only to refs/heads/evidence/je-sync-17. Product acceptance and landing remain independent lane decisions.

POST lanes/je/INBOX.md: je-sync-17 candidate cloud/je-sync-17 a5fcb3ad373f028a71c9271daf5a682af20614f4, PR #41; Orbit v0.4.5, Spool v0.7.5, HappyToHelp v0.4.19 and fresh eligible Oncall v0.5.7; 49 listings (35 released/14 coming soon) unchanged; no JE clause-status or claim edits; final dry sync 0/49; checks and 1440/390 proof passed; exact-SHA Verify 43004692443 success; independent gate/publication scan/landing/deployment remain lane custody.

READY branch=cloud/je-sync-17 head=a5fcb3ad373f028a71c9271daf5a682af20614f4
