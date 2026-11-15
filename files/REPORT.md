# je-gate-44 independent deciding gate: PR #60

Author: Run Edit Run fleet · 2026-11-15T05:26:50Z

Decision: the reviewed change may land under the lane's existing publication/landing hold. No new A, B, BAR or C findings. This gate made no product edits, commits, product pushes, PR writes, merge, deploy or CI dispatch.

- Repository: just-every/home; PR: https://github.com/just-every/home/pull/60 (open).
- Candidate: cloud/je-sync-36 at 00caa60e44e6989fd690f5613986eceb130af2f2.
- Baseline: origin/main at 1800026d12e254459c00c62ce46e32f2b5b02cb0. Initial and final PR REST reads, and final ls-remote, agree on both refs.
- Gate's temporary local branch: cloud/je-gate-44, reset to that exact candidate solely for review. No product ref was pushed. The packet's manifest product_head binds this review to the builder's candidate, not to a new gate product commit.
- Counts before and after: 49 listings = 35 released + 14 coming soon. HappyToHelp v0.4.26 → v0.4.28. Clause status changes: none.
- Plan and execution boundary: PLAN.md. The shipped RULES.md and je-sync-36 brief were read inline; INBOX.md and STATE.md were not read or written. The excluded builder homes were not used for independent evidence.

## Frozen rubric

| Row | Result | Commands and observed results |
| --- | --- | --- |
| R1 Scope | MET | git diff --name-only origin/main HEAD and full git diff origin/main HEAD: exactly public/data/listings.json, scripts/seeds-sync/state.json, src/data/seed-pages.ts; 12 additions/12 deletions. git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)": one candidate commit, author and committer Run Edit Run fleet <fleet@runeditrun.com>, no trailers. Changed-line credential-shape scan: zero matches. No test deleted, skipped, weakened or otherwise changed. |
| R2 Promotion truth | MET | gh api repos/just-every/run-happytohelp/releases/tags/v0.4.28, read once: draft=false, prerelease=false, published_at=2026-11-15T03:25:11Z, rer-release.dsse.json asset present (3061 bytes). gh api git/ref/tags/v0.4.28 and git/tags/0ecfc8529b62c73e8108fdbc169d4f410ca08043: annotated tag peels to commit 41fb40246d2e69f928be397c48d952d147c39160. Tagged seed.json says 0.4.28; listing, page and state agree. All three tagged source-file hashes match state. |
| R3 Public data and render | MET | npm ci exit 0; npm run listings -- --check exit 0, current 49 seeds; npm run listings exit 0, unchanged; git diff --exit-code exit 0. npm run type-check, npm run lint and npm run build all exit 0. Separate baseline npm run build exit 0. Production next start servers on 127.0.0.1:3184/3185, real /happytohelp and /data/listings.json, Chromium /usr/bin/chromium --no-sandbox: HTTP 200, correct h1/version, no page errors, no document overflow. Assertions at 1440; head and baseline screenshots and layout observations at 1440 and 390. Visual comparison found no new clipping, overlap or layout break. |
| R4 Exact-head CI | MET | gh api 'repos/just-every/home/actions/runs?head_sha=00caa60e44e6989fd690f5613986eceb130af2f2&per_page=100', one observation: Verify branch 43679421386 completed/success on the exact head. Also PR #60 run 43679456473 completed/success; Verify branch 43679459434 completed/skipped. The skipped duplicate is not used as success. No dispatch, rerun or watcher. |
| R5 Claim honesty | MET | gh api contents/CONTRACT.md?ref=v0.4.28 plus source status-table reading against src/data/seed-pages.ts and the built JE page. All JE claim wording is unchanged. The tagged CONTRACT hash ae8feea8b7998aa7 is unchanged from the baseline state and independently matches the downloaded release source. Eight existing partial-evidence promises and two done promises remain; partial evidence is not proof of false implementation. No new source-proven false statement was found. |

## Every hunk explained

1. public/data/listings.json generatedAt moves from 2026-11-14T20:31:20.076Z to 2026-11-15T05:01:24.381Z; HappyToHelp.version moves from v0.4.26 to v0.4.28. No other listing field changes.
2. scripts/seeds-sync/state.json syncedAt moves from 2026-11-14T20:31:13.936Z to 2026-11-15T05:01:22.600Z.
3. HappyToHelp state commit moves from 2f597575d4ccb19cdd4cfa0de5e635757737a1aa to 41fb40246d2e69f928be397c48d952d147c39160; sourceRef and tag move to v0.4.28; sourceReason stays 'released listing version'. These are release provenance, not contract judgments.
4. HappyToHelp README.md hash f56c111027b43eda → 9260e012d46d3779; seed.json hash 685ea267d1baacbe → 519c266cfec58440; CONTRACT.md hash unchanged. SHA-256 first 16 hex digits recomputed from each tagged API source and matched the state record.
5. HappyToHelp open adds 42983364b373. Recomputed SHA-256 of 'copy:README.md, seed.json changed since the last sync' gives exactly this finding ID. scripts/seeds-sync/detect/copy.mjs reports source drift but never applies wording, and detect/index.mjs closeRecord keeps unresolved finding keys.
6. Lamp removes open finding key 922fed04eacf. Lamp's release, source commit, hashes, brand, mark and homepage observations are unchanged. This is an open-finding bookkeeping marker only; no Lamp public wording or status changes.
7. src/data/seed-pages.ts changes only HappyToHelp.version v0.4.26 → v0.4.28.

No mark, colour, status, homepage, gallery, price or public wording was imported. All other seed versions/statuses are unchanged, including Spool v0.7.11, Uptime v0.5.11, Oncall v0.5.14, Orbit v0.4.9 and Lamp v1.11.16. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent on both sides. The candidate contains no v0.4.27 promotion; its reported lack of a Release was context, not an additional release API request or a separate bar.

Pricing comparison: no pricing wording changes anywhere in the complete diff. The specific Assisted US$10/month and Managed US$100/month statements are not present in tracked JE baseline or head source (git grep -ni -E 'assisted|managed|US\$10|US\$100' HEAD -- src public/data returned no matches). The gate does not claim these offers are rendered by this JE page and does not introduce pricing or billing-country/GST wording. Their absence is pre-existing and outside this version-only change.

## Public-door and regression proof

The built page's real slug is /happytohelp. At 1440 and 390 the candidate shows v0.4.28 and main shows v0.4.26. Public listings agree at both servers. Normalizing only that version, the 1440 main text is identical. Document scrollWidth equals viewport width for all four observations. The version box has identical dimensions and placement between main and head at each width: 1440 x=617.328125, y=3963.640625, width=205.328125; 390 x=20, y=4371.390625, width=350. Screenshots were visually inspected in all four cases.

The first browser harness attempt waited for networkidle and timed out on a page with streamed media; it made no product assertion. It was corrected to wait for DOM content and loaded fonts, then all recorded public-door probes passed. This is a harness observation, not a product finding. Browsers closed and both recorded server PIDs stopped, independently checked absent from /proc.

The builder's five points are covered proportionally by the actual diff/provenance review (points 1–3), regenerated listing/no-diff (point 4), and type/lint/build/public page probe (point 5). No broad 49-repository resync was run or claimed; that would exceed the frozen rubric and shared API budget. No gallery or art change needed a further door.

## Claim sentences and release statuses

The source's Product target names Zendesk, Intercom (with Fin), Help Scout and Freshdesk as switching incumbents; Decagon, Sierra and Pylon set its agent/procedure baseline. This gate compares truthful release listing/rendering, not unmodified seed helpdesk behaviour or a new incumbent audit. The JE catalogue has no root CONTRACT.md or Product target table of its own.

The following existing sentences are retained for the lane's already-known partial-evidence follow-up, not new C findings:

| Clause | v0.4.28 status | Exact unchanged JE sentence |
| --- | --- | --- |
| CONVERSATION-001 | partial | Customer and agent messages are stored once, and two conflicting final replies can never both be accepted. |
| DELIVERY-001 | partial | Messages are saved before they are shown live, so a reload or dropped connection recovers everything that was sent, and an AI draft never becomes a final answer until it is safely accepted. |
| OUTCOMES-001 | partial | Customers can rate a resolution with a thumbs up or down and a short comment, and comments are removed if the contact is erased. |
| AI-001 | partial | With no AI key, the AI is simply not assigned to new conversations and your team keeps them; your company's policy sets AI spending limits and uncertain attempts are never silently repeated. |
| DELEGATION-001 | partial | Revoking a computer's access ends its authority at once, and HappyToHelp never claims that work already running there was stopped. |
| CONNECTIONS-001 | partial | API tokens have chosen scopes, are shown once, are stored hashed and can expire; an unclear webhook result is not sent again. |
| IDENTITY-003 | partial | Teammates can sign in with an authenticator app or a security key plus one-time recovery codes, and an owner can require it for everyone or by role. |
| PORTABILITY-001 | partial | You can export your conversations, files, contacts, help articles, settings and history in one checked archive and restore it into a clean installation; sign-ins and provider secrets are left out. |

MOVE-IN-001 and REPORTS-001 are done in the same source table. The existing heading/summary about Codex/Claude repair is mirrored in the source's Homepage claims, including DELEGATION-001/PUSH-001; no new copy was introduced and no sustained-recovery claim was added. Pre-existing Terrace, Uptime, Lamp and Spool follow-ups were not widened or rejudged.

## Independent mechanical applicability and limits

- Source lock regeneration/check: NOT RUN, not applicable; this repository has no sources.lock.json or documented lock command.
- Contract generated-view write/check: NOT RUN, not applicable; no root CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md or documented contract generator. No generated view was edited or committed.
- Migration-ledger check: NOT RUN, not applicable; SQL migrations exist but no migration ledger/checker is documented or present, and no migration changed.
- Base complete publication scan: NOT RUN in this cloud, as the cloud adaptation explicitly reserves it for the Mac lander. Changed-line credential-shape and complete candidate identity/trailer checks passed. The lane retains the full scan, PR merge, deployment and live verification hold.
- Local server logs show unavailable token snapshots (caches is not defined) and uninitialized page_views analytics on both main and head; next start also warns about the repository's standalone output setting. These unchanged local counter limitations do not affect the rendered HappyToHelp page or the public listings probe. No Cloudflare/provider qualification is claimed.
- Release envelope asset presence was observed; no cryptographic signature verification is claimed.
- Nine GitHub API calls total, including the final PR custody check; CI was read once. No logs were needed because no required run failed.
- No provider credentials, owner browser state, private held-out material, ~/.env, INBOX.md or STATE.md were accessed. Only the designated decrypted bundle was used for authorized Git/GitHub authentication without printing its values.

NOTE G: The Mac publication scan and existing lane landing/deployment hold remain with the lane; they are not replaced by this evidence transfer.

New findings: none. Blockers: none. Clause status changes: none. Complete actual non-secret report/receipt files are selected explicitly for refs/heads/evidence/je-gate-44 only; evidence publication is separate from product READY or acceptance. The clone/dependencies and temporary baseline are cleaned up at the end, with the product clone retained only until evidence publication completes.

GATE PASS 00caa60e44e6989fd690f5613986eceb130af2f2
