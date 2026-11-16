# je-gate-49 · independent deciding gate of PR #65

Signed Run Edit Run fleet · 2026-11-16T14:07:57Z

PR https://github.com/just-every/home/pull/65 may land with the eight already known HappyToHelp copy/evidence follow-ups. No blocking A, B or BAR finding was established. No product was changed.

Candidate branch: `cloud/je-sync-41`.
Candidate: `7795b774fcead3ae2c846ff48f974b328de924c4`.
Baseline main and PR base: `abbda23585bcb50a430ffc60dba59b9d40046aa0`.
The fresh PR API read and final Git ref probe agree on these refs. The candidate has one commit beyond baseline. The local administrative branch `cloud/je-gate-49` was created from main but was never used as a product candidate or pushed.

## Plan and completed execution

1. Use a fresh shallow filtered clone of just-every/home, retain main, fetch PR 65 and inspect only the requested exact head. Read AGENTS.md, the supplied builder brief/rules and sync implementation. Confirm current head and base before judging.
2. Explain every changed hunk, audit all candidate identities/trailers and credential-shaped additions, and compare all public listings and provenance records with main.
3. Independently read the public HappyToHelp release once, peel its tag, compare the old/new CONTRACT.md, README.md and seed.json, and trace the open markers from the committed detector.
4. Run npm ci, the listings check and generator, type-check, lint and production build sequentially. Use the real production HappyToHelp route and listing endpoint; capture candidate at 1440/390 and compare the same page against a production build of main. Run assertions at 1440; 390 is the required visual proof.
5. Read exact-SHA CI once. Re-list the eight known partial-evidence promises with their exact JE sentences and release status rows. Preserve reports and receipts outside the clone, publish only the separate evidence ref, then delete the clone and node_modules. No fix, PR write, rerun/dispatch, product push or deployment.

## Frozen rubric results

| Row | Result | Commands / independent evidence |
| --- | --- | --- |
| R1 Scope | MET | `git diff --stat origin/main HEAD`, full `git diff origin/main HEAD`, `git diff --check origin/main HEAD`; exactly the three named paths, 13 additions/14 deletions. `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`: one fleet-authored/fleet-committed commit, no trailers. Candidate additions: zero credential-shaped values in targeted token/private-key/authenticated-URL patterns, plus full hunk review. No tests deleted, skipped, weakened or changed. |
| R2 Promotion truth | MET | One public GET of `https://api.github.com/repos/just-every/run-happytohelp/releases/tags/v0.4.31`; non-draft/non-prerelease, published 2026-11-16T11:23:15Z, asset rer-release.dsse.json present. `git ls-remote` independently peels v0.4.31 to e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f. The listing and page version, state tag/sourceRef/commit, and source seed.json all agree. All other listing objects are byte-for-byte-equivalent parsed data. |
| R3 Public data and render | UNMET only for the contradictory literal version sentence; all applicable maintenance checks MET | `npm ci` exit 0; `npm run listings -- --check` exit 0, current 49; `npm run listings` exit 0, unchanged; clean Git status. `npm run type-check`, `npm run lint`, `npm run build` all exit 0. Built `/happytohelp` returns 200 and shows v0.4.31 at 1440/390, not the literal v1.11.19 requested in R3. That is Lamp’s version, retained in its listing and built `/lamp`, and conflicts with R2’s HappyToHelp promotion. This is NOTE G, not an A/B/BAR product failure. Pricing/copy are unchanged; the cited Assisted/Managed price strings are absent on both trees, so no claim is made that those strings were rendered. See landing notes. |
| R4 Exact-head CI | MET | `gh api 'repos/just-every/home/actions/runs?head_sha=7795b774fcead3ae2c846ff48f974b328de924c4&per_page=100'` once: push Verify branch run 43878969241 is completed/success on the exact SHA. PR Verify run 43879073445 is completed/skipped by the workflow’s cloud-branch condition. Additional dynamic PR run 43879066476 is completed/success. No dispatch, rerun or watcher. |
| R5 Claim honesty | MET, eight existing FOLLOW-UP C qualifications retained | Public old/new release source files read successfully. CONTRACT.md is byte-identical (hash prefix ae8feea8b7998aa7). Read all ten JE promise sentences and the corresponding release status rows, including the eight partial rows listed in FOLLOW-UPS.md. The changed seed.json contains only the release version bump; README changes installer/browser-download guidance. Neither establishes any existing JE claim false. No copy was imported or rewritten. |

R3’s literal mismatch is reported explicitly rather than silently marked passed. Under the frozen proportionality rule, a contradictory version in the brief is process G; the actual version maintenance behavior meets the promotion requirement. No required executable check remains NOT RUN.

## Every hunk explained

- `public/data/listings.json`: generatedAt advances; HappyToHelp’s version changes v0.4.28 → v0.4.31. All 48 other listing objects and all non-version HappyToHelp fields are unchanged.
- `src/data/seed-pages.ts`: the single HappyToHelp version string changes v0.4.28 → v0.4.31. No summary, capability, promise, price, source link or coming-soon text changes.
- `scripts/seeds-sync/state.json`: syncedAt advances. HappyToHelp’s source commit changes 41fb40246d2e69f928be397c48d952d147c39160 → e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f; sourceRef/tag change to v0.4.31; sourceReason is unchanged. README hash 9260e012d46d3779 → 022f2ad37fee04ef and seed.json hash 519c266cfec58440 → 9289d1c33da14860 match independent SHA-256/16 calculations from both public release tags. CONTRACT.md hash is unchanged. Brand, mark and home records are unchanged.
- Added HappyToHelp `open: ["42983364b373"]` is exactly SHA256(`copy:README.md, seed.json changed since the last sync`)[0:12]. It remembers an unapplied copy-source finding; it is not a clause status or a claim that copy was rewritten. The seed.json sample is only 0.4.28 → 0.4.31. README’s changes move the bootstrap command first and separate normal setup from Chromium download during verification; JE’s existing Node alternative stays true.
- Removed `open: ["64cb07f6a0dd"]` from **Lamp** and **Oncall** is exactly SHA256(`copy:seed.json changed since the last sync`)[0:12]. The marker identifies a finding category/summary, not a globally unique seed issue. `detectCopy` compares stored hashes; full-sync `closeRecord` retains current unapplied findings only. Both seeds’ source commits, refs and copy hashes are unchanged, so the old seed.json notifications cease to recur once acknowledged. Independently read Lamp v1.11.19 seed.json hash 7d8b60b1b7a538bf and Oncall v0.5.16 seed.json hash 130f81940ec475b7: both match both states. These removals change bookkeeping only and do not close any product clause or import wording.

## Counts, exclusions and deliberate holds

Before **49 = 35 released + 14 coming soon**. After **49 = 35 released + 14 coming soon**.
Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent before and after.
HappyToHelp v0.4.28 → v0.4.31 is the only version promotion. Uptime remains v0.5.13, Spool v0.7.12, Lamp v1.11.19, and Oncall v0.5.16. No seed status changes.
The candidate preserves the stated holds on tag-only Uptime v0.5.14 and Spool v0.7.13; this gate did not reread unrelated releases or widen the source review. RER’s slower HappyToHelp pin is context outside this repository and is not treated as a defect.

## Public release provenance

Release: https://github.com/just-every/run-happytohelp/releases/tag/v0.4.31, release id 446944688.
Assets: rer-release.dsse.json (3061 bytes), screen-1.webp (112826 bytes).
Annotated tag object: 61cdf5e595b4de625e66fa8e9ad52f0e02920d27.
Peeled source commit: e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f.
Previous peeled v0.4.28: 41fb40246d2e69f928be397c48d952d147c39160.
Envelope presence was checked; no signature, attestation trust or provider qualification is claimed.

Source URLs actually read: `https://raw.githubusercontent.com/just-every/run-happytohelp/{v0.4.28,v0.4.31}/{CONTRACT.md,README.md,seed.json}`, plus Lamp v1.11.19 and Oncall v0.5.16 seed.json for the removed markers. All eight returned successfully without authorization. Public sources and release JSON are preserved in the packet.

## Browser and regression evidence

Production candidate `/happytohelp` and `/data/listings.json` returned 200. HappyToHelp v0.4.31 is visible at both widths; the 1440 probe also verifies Lamp’s unchanged v1.11.19. Candidate page dimensions are 1440×4965 and 390×5250, with document scroll widths exactly 1440 and 390 and no browser page errors. Main’s same page shows v0.4.28 and has identical dimensions and no page errors. Full-page screenshots and version-region screenshots of head/main at both widths are retained and visually reviewed. No layout break was observed.

The first networkidle wait timed out; a load/real-DOM observation succeeded. Both production builds emit the same local auxiliary telemetry limitations (Cloudflare cache global and local page_views migration absent). These are recorded in LANDING-NOTES.md and the actual logs, not hidden or repaired. They did not prevent the changed page/data render. Both browsers were closed and only the recorded server child PIDs were stopped. No provider or hosted app was used.

## Contract and incumbent interpretation

No clause status changed. HappyToHelp’s eight listed promises remain partial in both release sources: CONVERSATION-001, DELIVERY-001, OUTCOMES-001, AI-001, DELEGATION-001, CONNECTIONS-001, IDENTITY-003, PORTABILITY-001. MOVE-IN-001 and REPORTS-001 remain done. Exact JE sentences, status-table line numbers and the actual recorded gaps are in FOLLOW-UPS.md. These are the eight existing C follow-ups explicitly retained by the brief; a lack of complete proof is not a demonstrated false source claim or an introduced security/authority failure.

The source Product target names Zendesk, Intercom (with Fin), Help Scout and Freshdesk, with Decagon/Sierra/Pylon as agent baseline. This candidate changes catalogue version provenance, not any helpdesk behavior. No new incumbent comparison or seed implementation audit was added to the fixed gate.

Home has no seed CONTRACT.md/source lock/generated contract views/migration-ledger check. Those seed-only steps are not applicable; the documented listings generator and check were run independently and left the product clean. No full local test suite, seed installation or provider journey was run beyond the named checks.

## CI and custody

Exact-head successful Verify: https://github.com/just-every/home/actions/runs/43878969241.
PR Verify skipped by design: https://github.com/just-every/home/actions/runs/43879073445.
Additional successful PR run: https://github.com/just-every/home/actions/runs/43879066476.
Three GitHub REST reads total (PR, exact-head run discovery, public HappyToHelp release), no polling/log downloads, well within ten-call budget. Git remains the ref transport.

No product branch was pushed by this gate and no new PR was opened. PR #65 stays with the lane. There is no unresolved product blocker. The separate report-only evidence transfer does not assert READY, merge approval outside this rubric, landing, deployment or signature verification. The Mac publication scan/landing controls remain in force. Clone/node_modules cleanup follows successful evidence publication; reports remain outside the clone.

Verdict: GATE PASS WITH FOLLOW-UPS 8 head=7795b774fcead3ae2c846ff48f974b328de924c4
