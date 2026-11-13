# Independent deciding gate · je-gate-35

PR #51 may proceed to the lane's retained landing process. All frozen rubric rows are MET. No blocking A, B or BAR finding and no new C finding was reproduced. No product fix, commit, push, PR write, merge, deployment, provider-key use or clause/status change was made.

- Repository: just-every/home; PR: https://github.com/just-every/home/pull/51.
- Candidate branch: cloud/je-sync-27; exact head: `5c025fcb6629b82000ac2d09a2ad4b1c5df8f81b`.
- Current main and PR base: `274220fea1ba6f13126557bb86b5cc078680a4eb`. Initial and final PR REST reads agree. The shallow filtered clone fetched pull/51/head and inspected the exact candidate detached; the required local cloud/je-gate-35 ref was created from main and is not a product landing candidate.
- Before and after: **49 = 35 released + 14 coming soon**. HappyToHelp v0.4.23 → v0.4.24. No other seed version/status changes.
- Exact-head push Verify: **43425109174, completed/success**, https://github.com/just-every/home/actions/runs/43425109174. Other observations: Verify branch 43425141238 skipped on the PR event; PR #51 run 43425135691 success. The skipped PR-event run is not substituted for the successful push Verify.

## Plan and custody

PLAN.md contains the complete executed gate plan. The builder brief and RULES were read from the supplied inline references. Fresh clone, repository AGENTS.md, scripts/seeds-sync documentation and the actual sync/listings code were read before validation. The cloud adaptation allowed report-only evidence publication; the gate did not publish a product branch. Other repository reads used gh api only. Nine GitHub CLI calls were used within the ten-call budget; the runs list was read once, with no CI watcher, dispatch, rerun or log download.

The builder's five points were independently covered as follows: (1) exact diff/source provenance review; (2) tagged copy-source hash verification and complete wording preservation; (3) Release eligibility and version agreement; (4) actual listings generator check/write and counts; (5) install, type-check, lint, build and real built-page probes. Builder reports were context, not a substitute for these checks. No broad seeds:sync network run or copy rewrite was performed by this read-only deciding gate.

## Frozen rubric

| Row | Result | Command / evidence and result |
| --- | --- | --- |
| R1 Scope | MET | `git diff --name-only origin/main HEAD`, full `git diff origin/main HEAD`, `git diff --check origin/main HEAD`, and `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`: exactly the three expected paths; one candidate commit, fleet author and committer, no trailers. Full structured JSON diff and added-text credential-pattern scan passed. No tests touched, skipped, deleted or weakened. |
| R2 Promotion truth | MET | `gh api repos/just-every/run-happytohelp/releases?per_page=100` once, `gh api .../git/ref/tags/v0.4.24`, and annotated-tag object resolution: release is non-draft/non-prerelease with rer-release.dsse.json. Tag resolves to the state commit. Independently fetched tagged CONTRACT/README/seed.json hashes match state. Listings, seed page and state agree on v0.4.24. Every other listing field/version/status is unchanged. |
| R3 Public data and render | MET | `npm ci` exit 0; `npm run listings -- --check` exit 0 (49 current); `npm run listings` exit 0 (49 unchanged); `git diff --exit-code` and cached diff exit 0. `npm run type-check`, `npm run lint`, `npm run build` all exit 0. Baseline production build exit 0. Real production /happytohelp returns 200 and shows v0.4.24 at both widths; public /data/listings.json agrees. Head vs main browser/body comparison and visual proof show no layout regression. No pricing content changed; see NOTE G below about stale historical price wording. |
| R4 Exact-head CI | MET | One `gh api repos/just-every/home/actions/runs?head_sha=5c025fcb6629b82000ac2d09a2ad4b1c5df8f81b&per_page=100` observation: Verify branch 43425109174 completed/success on exactly that SHA. No dispatch/rerun. |
| R5 Claim honesty | MET | Tagged `CONTRACT.md` requirements/status rows were compared with all HappyToHelp summary/does/promises wording. Eight known clauses remain partial; MOVE-IN-001 and REPORTS-001 are done. Their gaps concern evidence, not a source-proven false new sentence. All JE wording is byte-for-byte unchanged except the version. No new false claim established. Exact sentences and clause source/status mappings are in happytohelp-je-copy.txt and claim-receipt.json. |

## Every changed hunk

1. `public/data/listings.json`, header: generatedAt advances from 07:28:12.440Z to 12:21:08.975Z on 13 November; generator metadata only.
2. Same file, HappyToHelp record: version v0.4.23 → v0.4.24; every other public listing field remains equal, including wording, status and all coming-soon records.
3. `scripts/seeds-sync/state.json`, header: syncedAt advances from 07:28:13.329Z to 12:21:04.934Z; observation metadata only.
4. Same file, HappyToHelp provenance: commit `3c45a60a6debb0886ae8c41eee18a95e6fee694d` → `6acf8a4c50dfeb94ca9ab705b1e386d282ea8e0f`; sourceRef/tag v0.4.23 → v0.4.24. sourceReason remains “released listing version”. README.md hash changes to ff2699e21edf96c7; seed.json to de762362ebcab2ec; CONTRACT.md remains ae8feea8b7998aa7. Independent downloaded-source SHA-256 prefixes match all three values.
5. Same file, HappyToHelp `open`: adds 42983364b373. The actual detector defines finding identity as the first 12 SHA-256 hex digits of `type:summary`; this key is `copy:README.md, seed.json changed since the last sync`. It marks copy for review and writes no JE sentence.
6. Same file, Lamp: removes open 42983364b373.
7. Same file, Oncall: removes open c843303a1181.
8. Same file, Orbit: removes open 42983364b373.
9. Same file, Uptime: removes open c843303a1181. c843303a1181 denotes `copy:CONTRACT.md, README.md, seed.json changed since the last sync`. These four deletions clear remembered copy findings only. All their actual provenance/brand/home records stay unchanged. `closeRecord` records unapplied findings in `open`; these arrays are bookkeeping, not wording or clause-status judgments. This gate does not interpret clearing them as resolving the existing claim follow-ups.
10. `src/data/seed-pages.ts`, HappyToHelp: the sole line changes version v0.4.23 → v0.4.24. Replacing that literal in baseline reproduces the entire candidate file byte for byte.

No other path differs. Added lines contain no credential-shaped values in the scoped patterns; the complete diff was also read. Timestamps and hashes are public provenance. Identity inspection includes every candidate commit and side parent reachable in the range; the candidate is one commit with parent main and no merge side parents.

## Release/source evidence and preserved inventory

Release: https://github.com/just-every/run-happytohelp/releases/tag/v0.4.24; id 444048798; published 2026-11-13T09:36:51Z; draft=false, prerelease=false. Assets include rer-release.dsse.json and screen-1.webp. The tag is annotated object e92ebf51c358f4737810c26766d8a7f4073449b5, pointing to commit 6acf8a4c50dfeb94ca9ab705b1e386d282ea8e0f. Envelope **asset presence only** was established; no signature verification is claimed.

Lamp v1.11.14, Uptime v0.5.10, Oncall v0.5.11, Orbit v0.4.8 and Spool v0.7.8 remain unchanged. Spool v0.7.9 is not imported; this gate does not re-adjudicate its release eligibility because no Spool promotion occurred. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent from both public listing sets. No coming-soon copy, art, colours, marks, homepage stills, status or implementation judgment was imported.

## Render proof and regression look

Both trees were built with the same installed package-lock dependencies, Node v24.19.0, Chromium /usr/bin/chromium, headless and --no-sandbox. Documented local D1 migrations succeeded on both temporary trees, without provider credentials or remote migration. Assertions ran at 1440; screenshots cover 1440 and 390. HTTP 200, visible HappyToHelp heading, version facts, public listing totals and zero uncaught page errors passed. Candidate/baseline rendered body text is identical after replacing only v0.4.23 with v0.4.24, at each width. Desktop and mobile have no horizontal document overflow. Visual inspection confirms readable sections, unchanged wrapping, working page structure and version visibility, with no new layout break. Footer lazy images are awaited before the final proof captures.

Actual proof: candidate-happytohelp-1440.png, candidate-happytohelp-390.png, baseline-happytohelp-1440.png, baseline-happytohelp-390.png and browser-receipt.json. All browser contexts are closed and the two owned servers stopped. The first networkidle wait timeout is retained honestly in browser-first-attempt.log/receipt; it was a harness readiness choice, not a reproduced product assertion failure. An intermediate readiness wait for every footer motion image also timed out because some responsive images remain hidden; browser-lazy-readiness-attempt.log/receipt preserves it. Waiting for the main footer art image, rather than hidden responsive variants, passes. The final content/font/main-image readiness probe passes. The local Node server's pre-existing Cloudflare `caches` diagnostic affects the optional token snapshot, not this render; no API mock or shim was introduced.

## Claim review and incumbent

The released HappyToHelp contract's Product target names Zendesk, Intercom (with Fin), Help Scout and Freshdesk (agent baseline: Decagon, Sierra, Pylon). This JE candidate changes a displayed released version, not support behavior; those helpdesk behaviors are not re-audited here. No JE CONTRACT.md declares a separate clause/incumbent for this data sync. The frozen rubric controls.

Known partial sentences (unchanged; source mappings and complete gaps in claim-receipt.json):
- **MOVE-IN-001**: done.
- **CONVERSATION-001**: partial.
- **DELIVERY-001**: partial.
- **OUTCOMES-001**: partial.
- **REPORTS-001**: done.
- **AI-001**: partial.
- **DELEGATION-001**: partial.
- **CONNECTIONS-001**: partial.
- **IDENTITY-003**: partial.
- **PORTABILITY-001**: partial.

The full exact JE text is retained in happytohelp-je-copy.txt. FOLLOW-UPS.md carries the already-known eight partial-clause matters and names the other pre-existing context; none is counted as a new C finding or a blocker. No clause status, acceptance point, generated claim view or summary count changed.

## Applicability, limitations and tiered notes

The listings generator is the applicable independent generated-data check and was run in both modes. Source-lock generation/check, contract-view write/check, and migration-ledger check are not applicable: this repository has no sources.lock.json, CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md, or documented corresponding generator/ledger checker. No applicable required check remains NOT RUN. A full seed/source audit, cryptographic release signature verification, live deployment, broad seed-sync run and Mac publication scan were not performed or claimed by this gate. The lane retains its publication/merge/deploy responsibilities.

NOTE G: Historical Assisted US$10/month and Managed US$100/month wording is absent from both main and candidate. All current pricing, tax and billing-country content is unchanged; the present shared copy says MIT licensed and 100% free. This is a stale rubric detail, not a new pricing defect.

NOTE G: The initial browser `networkidle` wait timed out. Content/font/lazy-image readiness on the real page passes, with the actual first-attempt log preserved. No product assertion was weakened or product code changed.

No A, B, BAR or new C finding. Blockers: none. Product provenance and evidence provenance remain separate. The report packet is intended only for refs/heads/evidence/je-gate-35. The clone, baseline worktree and node_modules are deleted after report transport; the actual packet is retained outside them.

GATE PASS 5c025fcb6629b82000ac2d09a2ad4b1c5df8f81b
