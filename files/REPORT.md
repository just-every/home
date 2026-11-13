# je-gate-33 independent deciding gate

Verdict: PASS. PR https://github.com/just-every/home/pull/49 may land under the frozen rubric. No blocking or new follow-up findings were reproduced. This report does not merge, deploy or waive the fleet's independent publication and landing checks.

Candidate: cloud/je-sync-25 at e6fe389a5b80b60ed8d7c97db717f653651143f2.
Required baseline: main d1ffd164f0a362da8a6e1f9a8d27db8bf5130a99.
Both initial and final REST reads of PR #49 match those full SHAs, and a final fetch confirms origin/main still matches. The gate created a local cloud/je-gate-33 pointer at baseline as requested by the cloud wrapper, then inspected the exact candidate detached; it made no product commit or product push and opened no PR.

## Plan and execution

1. Set fleet Git identity, refresh the provided launcher, install decrypted-bundle authentication, read launcher/repository AGENTS.md and the two inline briefs. No provider credentials were used. GitHub authentication was loaded privately from the instructed bundle; no secret values were printed.
2. Make a fresh shallow filtered clone of just-every/home; fetch pull/49/head and inspect the frozen candidate against origin/main. Read complete hunks, all candidate identities/messages, and the sync state/copy hashing implementation.
3. Independently verify the eligible HappyToHelp release, annotated tag target and tagged source-file hashes through GitHub REST. Read the released contract and unchanged JE claims.
4. Run npm ci, listings check/write and no-diff check, type-check, lint and production build on exact head. Identify source-lock, contract-view and migration-ledger applicability from repository instructions.
5. Build baseline main in a scratch worktree with shared installed dependencies. Through the real production HTTP doors, compare /happytohelp and /data/listings.json at 1440. Capture the changed version section once on candidate and baseline at 1440 and 390.
6. Read exact-SHA CI once; no dispatch, rerun or watcher was needed. Recheck PR identity/base and origin/main before reporting. Save reports and actual receipts outside the product checkout, transfer only evidence/je-gate-33, stop recorded server trees and remove scratch checkouts/dependencies.

## Frozen rubric

| Row | Result | Command/evidence and outcome |
| --- | --- | --- |
| R1 Scope | MET | git diff origin/main HEAD; git log origin/main..HEAD with author, committer, trailers and full messages; python3 ../packet/scope-probe.py. Exactly the three named paths, no test changes, one fleet-authored/committed candidate with no trailers, and no credential-shaped additions. Every hunk is explained below. |
| R2 Promotion truth | MET | gh api repos/just-every/run-happytohelp/releases?per_page=100 (one releases read); git/ref/tags/v0.4.23 and annotated tag object REST reads; tagged CONTRACT.md/README.md/seed.json REST reads; scope-probe.py. v0.4.23 exists, has a non-draft/non-prerelease release and rer-release.dsse.json asset; commit and three source hashes match state. Only HappyToHelp changes v0.4.22 to v0.4.23; every other public version/status and all wording remain identical. No coming-soon copy imported. |
| R3 Public data and render | MET | npm ci; npm run listings -- --check; npm run listings; git diff --exit-code; npm run type-check; npm run lint; cloud_run npm run build; cloud_run node ../packet/browser-probe.mjs. All passed. Counts before/after 49 = 35 released + 14 coming soon; exclusions absent. Real /happytohelp renders v0.4.23, baseline renders v0.4.22, real JSON agrees, layout geometry and main text are identical after substituting version. Proof at 1440 and 390 reviewed visually. Pricing-preservation qualification below. |
| R4 Exact-head CI | MET | gh api repos/just-every/home/actions/runs?head_sha=e6fe389a5b80b60ed8d7c97db717f653651143f2&per_page=100. Push Verify branch run 43356623475 completed/success on the exact candidate. PR wrapper run 43356681112 completed/skipped by the workflow's explicit cloud-branch rule; that is not the required push Verify. Dynamic PR #49 run 43356678568 completed/success. |
| R5 Claim honesty | MET | Tagged HappyToHelp CONTRACT.md requirement and status rows compared with src/data/seed-pages.ts's HappyToHelp summary, does and promises; source file hashes independently recomputed. None of the released source read proves an existing JE sentence false. Eight partial rows remain partial; incomplete cited evidence was not treated as disproof. Exact sentences/IDs are recorded below. |

## R1: every hunk

- public/data/listings.json first hunk: generatedAt changes from 2026-11-12T22:03:37.712Z to 2026-11-13T03:01:53.800Z.
- Same file's only entry hunk: HappyToHelp version v0.4.22 -> v0.4.23. All other keys of that entry, every other entry, ordering and status are identical.
- scripts/seeds-sync/state.json first hunk: syncedAt changes from 2026-11-12T22:03:16.352Z to 2026-11-13T03:01:48.929Z.
- HappyToHelp provenance hunk: commit 4dee2432081a64cee0bd12c59a31cb84371c3ab3 -> 3c45a60a6debb0886ae8c41eee18a95e6fee694d; sourceRef and tag v0.4.22 -> v0.4.23. sourceReason remains "released listing version". CONTRACT.md hash remains ae8feea8b7998aa7; README.md hash changes 5483ddb9e5f071e5 -> 2b37c66810922da8; seed.json hash changes c283958a928aa942 -> 573d1f0fa88958a5. Independently fetched released bytes reproduce all three new hashes.
- HappyToHelp state open-marker hunk: adds open ["42983364b373"] after unchanged home data.
- Uptime state open-marker hunk: removes open ["c843303a1181"]; its version/ref/commit/copy/brand/mark/home observations are unchanged. writeState and the sync README define open entries as findings retained for the next sync, not website wording.
- src/data/seed-pages.ts only hunk: HappyToHelp version v0.4.22 -> v0.4.23.

State changes are provenance/timing/open-copy finding markers only. There is no wording change, new mark, color change, capture, gallery change, implementation change, contract judgment or unrelated seed promotion. No test was deleted, skipped or weakened. Candidate ancestry contains exactly one commit beyond main, no side-parent candidate is omitted. Its author and committer are both Run Edit Run fleet <fleet@runeditrun.com>; no trailers exist.

## R2: release/source proof

Release: https://github.com/just-every/run-happytohelp/releases/tag/v0.4.23
Published 2026-11-13T00:12:39Z; draft false; prerelease false; asset rer-release.dsse.json, 3061 bytes.
Annotated tag object 9db6d9537555ee91180f1a6cac03ba856f1125d6 resolves to commit 3c45a60a6debb0886ae8c41eee18a95e6fee694d, matching state.

Envelope-asset presence is verified. Its bytes were not downloaded and its signature was not verified; neither the rubric nor this report equates asset presence with attestation verification.

The row's parenthetical "HappyToHelp v0.4.22 unchanged" contradicts its explicit v0.4.23 promotion target and the supplied builder brief. Applied the explicit promotion target: HappyToHelp alone advances from the old v0.4.22 to v0.4.23, while every other seed's version/status is unchanged.

## R3: independent checks and regression comparison

- npm ci: success, 726 packages installed; Husky prepare ran. Reinstalled fleet commit hook after dependency setup.
- npm run listings -- --check: "Listings current (49 seeds)".
- npm run listings: "Listings unchanged (49 seeds)".
- git diff --exit-code after generation: success, no diff; post-listings.diff is empty.
- npm run type-check and npm run lint: completed without errors.
- cloud_run npm run build: success; /happytohelp is among generated production routes.
- Scratch worktree setup: the required fleet hook forwarding encountered the repository Husky post-checkout helper-path warning (cannot open fleet-cloud-hooks/h). The worktree was created at the correct baseline; no commit was attempted and no hook was disabled.
- Baseline build: success. Sharing installed dependencies by a scratch worktree symlink produces only Next tracing warnings about dependencies outside that worktree; the real baseline production route ran successfully.
- Real candidate and baseline /happytohelp and /data/listings.json: HTTP 200. At 1440, assert HappyToHelp title/version, listings version/counts, no horizontal overflow, no page errors and unchanged main text/element geometry other than version.
- Candidate and main document dimensions: 1440 x 5058 at 1440; 390 x 5250 at 390. Both phone documents have width exactly 390.
- Screenshots candidate-1440.png and candidate-390.png show the changed version section without clipping, overlap or layout break. Baseline equivalents retained. Browser screenshots at 390 are proof; behavioral assertions run only at 1440.
- Counts before -> after: 49 -> 49 total; 35 -> 35 released; 14 -> 14 coming soon.
- Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent before and after.

Pricing preservation: no pricing statement or content file changes. Current main and candidate website sources do not contain the Assisted/Managed price sentences cited by the brief, so this gate does not claim it observed US$10/month and US$100/month on this page. Their preservation is assessed as unchanged surface against main; no new pricing, GST wording or billing-country restriction is introduced.

This website has no tracked CONTRACT.md, generated ACCEPTANCE.md/docs/CLAIMS.md, sources.lock.json or migration ledger, and AGENTS.md/package.json document no generator/lock/ledger commands. Those seed-specific independent-evidence steps are not applicable here. Existing migrations are untouched. The applicable public listings generator was independently checked, written and checked for an unchanged product tree.

## R4: exact-head CI

One REST discovery; all rows below have head_sha e6fe389a5b80b60ed8d7c97db717f653651143f2:

- Verify branch, push: 43356623475 completed/success, https://github.com/just-every/home/actions/runs/43356623475
- Verify branch, pull_request: 43356681112 completed/skipped, https://github.com/just-every/home/actions/runs/43356681112
- PR #49, dynamic: 43356678568 completed/success, https://github.com/just-every/home/actions/runs/43356678568

No red Verify, failed shard, pending CI, CI dispatch, CI rerun or polling watcher. Nine GitHub API calls total: initial PR, releases, tag ref, tagged contract, exact-head runs, annotated tag target, tagged README, tagged seed.json and final PR. No provider-account calls or GitHub comments/writes. Ordinary Git transports are used only for the declared repo clone/fetch and the separately authorized report-only transfer.

## R5: exact JE promise sentences and released clause status

The released contract's incumbents are Zendesk, Intercom (with Fin), Help Scout and Freshdesk, with Decagon, Sierra and Pylon as the agent baseline. just-every/home has no CONTRACT.md Product target table or target acceptance clause for this sync. The behavior judged here is accurate public release metadata and unchanged product-page rendering against the frozen rubric, not an expanded helpdesk audit.

| Clause | Released status | Exact unchanged JE sentence |
| --- | --- | --- |
| MOVE-IN-001 | done | Imports are reviewed before anything is written, send no messages to your customers, can be undone as a whole, and keep source dates, private notes and publication state. |
| CONVERSATION-001 | partial | Customer and agent messages are stored once, and two conflicting final replies can never both be accepted. |
| DELIVERY-001 | partial | Messages are saved before they are shown live, so a reload or dropped connection recovers everything that was sent, and an AI draft never becomes a final answer until it is safely accepted. |
| OUTCOMES-001 | partial | Customers can rate a resolution with a thumbs up or down and a short comment, and comments are removed if the contact is erased. |
| REPORTS-001 | done | Reports use your own calendar and time zone, count each conversation once, and export to a spreadsheet file that is safe to open. |
| AI-001 | partial | With no AI key, the AI is simply not assigned to new conversations and your team keeps them; your company's policy sets AI spending limits and uncertain attempts are never silently repeated. |
| DELEGATION-001 | partial | Revoking a computer's access ends its authority at once, and HappyToHelp never claims that work already running there was stopped. |
| CONNECTIONS-001 | partial | API tokens have chosen scopes, are shown once, are stored hashed and can expire; an unclear webhook result is not sent again. |
| IDENTITY-003 | partial | Teammates can sign in with an authenticator app or a security key plus one-time recovery codes, and an owner can require it for everyone or by role. |
| PORTABILITY-001 | partial | You can export your conversations, files, contacts, help articles, settings and history in one checked archive and restore it into a clean installation; sign-ins and provider secrets are left out. |

The eight partial gaps concern incomplete cited assertions: writer races, delivery replay, rating history/session/erasure coverage, model execution bounds/replay, delegation evidence naming, token/destination bounds, two-factor evidence naming and nonempty-target restore refusal. They do not assert that the quoted behaviors are false. PORTABILITY-001 explicitly lists clean-install restore and portable store/attachment equality as asserted. The unchanged tagged CONTRACT.md hash is independently reproduced. No wording was rewritten and no partial clause was promoted.

Known existing Terrace, Uptime, Lamp and Spool copy follow-ups remain outside this version-only change. No new C finding is added.

## Findings, clause changes and custody

Blocking A/B/BAR: none. New follow-up C: none.
NOTE G: the brief's old-version parenthetical and pricing reference need the interpretation/qualification recorded above; neither indicates a head-introduced product defect.
Clause status changes: none. Source contract and generated views untouched. Counts unchanged.
Product commits: none. Product branch push/merge/deploy/comment: none. PR #49 left open.
No unresolved blocker; no pre-gate refusal. The Mac fleet retains publication scan, PR landing, deployment and live-site verification.

Non-secret plan, full source/diff receipts, command logs, browser probe and screenshots live in this packet. Evidence publication is exclusively refs/heads/evidence/je-gate-33; it does not signal product READY. Scratch clone, baseline worktree and installed temporary browser dependencies are removed after transfer; only the report packet and transport receipts remain.

POST lanes/je/INBOX.md: je-gate-33 PASS e6fe389a5b80b60ed8d7c97db717f653651143f2 PR #49; R1-R5 MET; 49=35+14 unchanged; no clause changes or new findings; exact-head Verify 43356623475 success, PR 43356681112 skipped, dynamic 43356678568 success; no product writes.

GATE PASS e6fe389a5b80b60ed8d7c97db717f653651143f2
