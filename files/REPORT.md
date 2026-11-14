# je-gate-43 — independent deciding gate of PR #59

Recorded UTC: 2026-11-14T21:02:21Z

Decision: PASS. R1–R5 are MET. No new blocking finding, no new C follow-up, no product blocker, no clause status change.

Repository: just-every/home. Existing PR: https://github.com/just-every/home/pull/59.
Candidate: cloud/je-sync-35 at e7d336a0005e9a764869340199e6c007cbd51011.
Baseline origin/main and PR base: 1eb1fe9d9bf8683ec1e8ecdab8653a5ce6446a86.
Both prerequisite reads confirmed the exact head/base, open and unmerged. No different head was judged. The gate made no product change, commit, push, merge, PR comment or deployment. A local cloud/je-gate-43 branch exists only at main; all review/build probes used the exact detached candidate. Only the explicit report-only evidence ref is to be published.

## Plan and boundary

Read the inline je-sync-35 brief and RULES, launcher rules and home AGENTS; establish immutable head/base; explain all changed hunks and identity; independently read promotion/tag/source evidence; run the frozen public-data, type/lint/build and browser checks; compare the actual built Lamp route against baseline at desktop and phone sizes; observe exact-SHA Verify once; review existing Lamp claims against the tagged status table; retain actual reports/receipts/screenshots and return them through evidence/je-gate-43, then remove the disposable checkout and dependencies. PLAN.md contains the full execution plan.

Home has no CONTRACT.md Product target or incumbent table. Lamp's released source names Atlassian Statuspage, Better Stack Status Pages and Status.io. The named behavior here is truthful publication of a released listing version, with no incumbent feature audit added. The fixed R1–R5 rubric and three standing bars were used without widening checks. Builder context and builder evidence were not substituted for independent observations.

## Row results

| Row | Status | Commands / observations | Result |
| --- | --- | --- | --- |
| R1 Scope | MET | git diff --name-status origin/main HEAD; git diff origin/main HEAD; git diff --check origin/main HEAD; git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"; structural JSON/source comparison and added-line credential-shape review | Exactly the three allowed files, 12 insertions and 12 deletions. One candidate commit, parent is baseline, no side parent; fleet author/committer, no trailers. No tests changed, deleted, skipped or weakened. No credential-shaped added value. |
| R2 Promotion truth | MET | gh api run-lamp/releases/tags/v1.11.16, git/ref/tags/v1.11.16, git/tags/de6a8948cf2e12e3efb876066caa1a334bfd2599; tagged CONTRACT.md and seed.json reads; SHA-256 reproduction; HappyToHelp tag and Release reads | Lamp Release is published, non-draft, non-prerelease, and has rer-release.dsse.json. Tag, commit, all three JE records and changed copy hashes agree. HappyToHelp v0.4.27 is tag-only (Release HTTP 404), kept at v0.4.26. All other listing versions/statuses unchanged. |
| R3 Public data/render | MET | npm ci; npm run listings -- --check; npm run listings; git diff --exit-code; npm run type-check; npm run lint; npm run build; real Next production /lamp and /data/listings.json probe; baseline build/probe | All required local commands exit 0. Listings regenerate without a diff. 49 = 35 released + 14 coming soon, unchanged before/after. Eight excluded seeds absent. Built /lamp is HTTP 200 and shows v1.11.16 at 1440 and 390; no page overflow/layout regression. Text is baseline-identical except version. |
| R4 Exact-head CI | MET | gh api repos/just-every/home/actions/runs?head_sha=e7d336a0005e9a764869340199e6c007cbd51011&per_page=100, once | Push Verify branch run 43638334147 completed/success on this exact SHA. No poll, rerun or dispatch needed. PR Verify run 43638363063 is skipped by the workflow's cloud-branch PR condition, not a red push Verify. |
| R5 Claim honesty | MET | Read tagged Lamp CONTRACT.md status table and tagged seed.json; read JE summary, does list, ten promises and rendered text; exact source-only-version comparison | No newly introduced claim shown false by the source. Eight promise clauses remain partial evidence and two are done; partial evidence is not falsity under the frozen rule. All exact sentences/ids/statuses/gaps are in claim-review.json. No wording rewritten or clause promoted. |

## Every hunk explained

- public/data/listings.json: generatedAt moves from 2026-11-14T15:22:04.359Z to 2026-11-14T20:31:20.076Z; Lamp version moves v1.11.15 to v1.11.16. No other listing field changes.
- scripts/seeds-sync/state.json: syncedAt advances to 2026-11-14T20:31:13.936Z. Lamp commit changes from 5dd84e13f6b0478edc2fc5e759d513f5eccf6d57 to 429a46081ce68bab2dbdae46b8402b8ccce3ee2a; sourceRef/tag advance to v1.11.16. CONTRACT.md hash changes 8b575f27ee607ce3 to f9cb0b8a5bd46d69 and seed.json hash changes 074cb758ae0a8d8f to 12d7013d559c4028. The independently retrieved tagged files reproduce both new 16-character SHA-256 prefixes. README hash stays unchanged. Lamp open marker 922fed04eacf is added; independently reproduced from SHA-256('copy:CONTRACT.md, seed.json changed since the last sync')[:12]. Oncall open marker 42983364b373 is removed. detect/index.mjs closeRecord writes these findings bookkeeping markers; none is public copy, a listing status or an implementation judgment. Brand, marks and home observations are unchanged.
- src/data/seed-pages.ts: the only source edit is Lamp's version literal, v1.11.15 to v1.11.16. Replacing that literal in baseline produces the exact candidate file. No summary, does item, promise, coming-soon text or other wording changes.

## Source and release evidence

Lamp Release: https://github.com/just-every/run-lamp/releases/tag/v1.11.16, id 445557067, published 2026-11-14T20:04:54Z. Annotated tag object de6a8948cf2e12e3efb876066caa1a334bfd2599 resolves to commit 429a46081ce68bab2dbdae46b8402b8ccce3ee2a. Tagged seed.json says version 1.11.16. Envelope asset rer-release.dsse.json is 3157 bytes with GitHub-reported digest sha256:092c52a6cf34022c5949b765c54df6a4a9f09986f339d20ccac09fff8a17a805. This gate verified the Release's asset presence and metadata; it did not cryptographically verify a DSSE signature.

Full independently retrieved CONTRACT.md SHA-256: f9cb0b8a5bd46d6937005eccfd7b290d1ac6c3c512da4e973c0771bc3256cfdd.
Full independently retrieved seed.json SHA-256: 12d7013d559c4028d343349ad49aa8378d3850b131646967fad7aef356c32ba7.

HappyToHelp v0.4.27 ref exists, with tag object e14aa1897ef393f37f29bd30054640f8fd8b175a. GET release by that tag returns HTTP 404 Not Found; withholding it is correct. The expected 404 is evidence of no Release, not a rejected credential request.

Versions after: Spool v0.7.11, Uptime v0.5.11, HappyToHelp v0.4.26, Orbit v0.4.9, Oncall v0.5.14, Lamp v1.11.16. Every entry except Lamp's version is equal to baseline, including all released/coming-soon statuses. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. Public/source/artifact comparison gives 49→49 total, 35→35 released, 14→14 coming soon.

Pricing preservation: no price or billing-country text was edited; all source except the Lamp version literal is baseline-identical. The literal Assisted/Managed price statements are absent from this JE checkout at both SHAs, so this check confirms preservation of JE's existing presentation and does not invent or claim a live upstream pricing verification. Assisted US$10/month and Managed US$100/month were not changed or contradicted by this diff; no GST or country restriction was imported.

## Render and regression proof

Node v24.19.0, pnpm 10.12.4 fallback; repository has no toolchain pin. npm ci installed its committed lock. The required production npm run build generated 61 static pages. Candidate and baseline used the same package lock and node_modules; baseline was built in a detached worktree at the exact main SHA.

Browser commands: source /tmp/rer-cloud-toolchain.sh, then cloud_run timeout 180 node ../browser-probe.mjs candidate (and baseline). Chromium executable /usr/bin/chromium, headless, --no-sandbox; fresh browser context, real HOME. Desktop assertions only at 1440: HTTP 200, Lamp heading/version, no document overflow, and public JSON count/status/version readback. At 390, capture/readback is browser proof. The completed screenshots are candidate-lamp-1440.png and candidate-lamp-390.png, with matching baseline screenshots. Both were visually inspected. The document widths are 1440 and 390 respectively; version boxes and all visible text except the version match baseline at both sizes. Browser pageErrors is empty for each completed run. All servers were stopped by their recorded PID and browsers closed.

The initial network-idle navigation timeout and the same local Cloudflare telemetry limitations on both heads are retained transparently as non-blocking NOTE G items in LANDING-NOTES.md. No product fix was made to obtain these results.

## Exact-head workflow observations and call budget

Successful required push run: https://github.com/just-every/home/actions/runs/43638334147, Verify branch, completed/success, head e7d336a0005e9a764869340199e6c007cbd51011.
Additional exact-head run: 43638361677, PR #59, completed/success. PR-event Verify 43638363063 completed/skipped; the workflow excludes cloud/* PR duplicates while push Verify covers them.

Exactly 10 gh API invocations total, including both prerequisite reads and source checks; one CI discovery invocation, zero polls/watchers, zero workflow dispatches/reruns, zero failed-job archive reads. github-api-ledger.json lists every command and outcome. No source other than the injected launcher bundle was used for GitHub auth; no provider credential was used.

## Triage applicability and builder-point coverage

Home is a website, not a seed contract repository: no CONTRACT.md, sources.lock.json, ACCEPTANCE.md or docs/CLAIMS.md exists, and AGENTS.md/package scripts declare no source-lock or contract-view generator. Those regeneration/check duties are not applicable. Existing SQL migrations are untouched, with no documented migration-ledger mechanism; no migration-ledger check applies. This is not an unrun blocking check and causes no pre-gate refusal. The applicable generator is listings: independently checked and written with no diff.

Builder points 1/2: script semantics, exact three-file scope, released-source provenance, open-marker behavior and unchanged public copy checked. Point 3: Lamp Release eligibility, preserved versions/statuses/assets/pricing surface and excluded entries checked. Point 4: public listings write/check idempotence and deliberately withheld HappyToHelp tag-only release checked. Point 5: type-check, lint, production build and actual route regression proof completed. A broad new sync of all 49 unrelated repositories was not added to the frozen gate.

## Findings, status and custody

New A/B/BAR findings: zero. New C follow-ups: zero. No test guarding a user-visible flow changed. No new security, privacy, money or data-loss defect was found on this touched surface. Clause statuses before/after: unchanged; no CONTRACT.md change or status promotion. Known pre-existing follow-ups remain in FOLLOW-UPS.md, with exact Lamp promise text/ids preserved in claim-review.json.

No product blocker. PR #59 may land subject to the fleet's own publication scan and landing/deploy controls. No READY/PUSHED product claim is made by this gate; its only publication is the required report-only evidence ref. Actual complete command/HTTP/build/browser receipts and original failure receipts are kept in this packet. Evidence transport result is recorded outside the immutable packet and echoed in the terminal answer. Disposable clone/worktree/dependencies are removed after evidence publication and verification.
