# Independent deciding gate — je-gate-37-c1

Decision: PR #53 may land under the frozen rubric. No new A, B, BAR or C finding was established. Known pre-existing follow-ups remain carried. The gate fixed nothing, created no product commit, made no product push, and made no PR comment, merge or deployment.

- Repository: just-every/home; PR https://github.com/just-every/home/pull/53
- Candidate branch: cloud/je-sync-29
- Exact candidate: edfb1132486eaac9f87843199561c3230d5132df
- Baseline origin/main and PR base: 1b7c84f81246cce3a6d7b26bffc31ea1ca0370a0
- Initial and final REST PR reads both show the same head/base, open and unmerged.
- This gate's requested local cloud/je-gate-37-c1 was created from origin/main. The review checkout remains detached at the exact candidate. No cloud/je-gate-37-c1 product ref is published; evidence uses its separate evidence/je-gate-37-c1 ref.
- Before / after: 49 total = 35 released + 14 coming soon, unchanged. Implementation clause statuses changed: none. No source clause was promoted.

The complete execution plan is PLAN.md. The actual data, claim-status, local-check, CI and browser receipts are included in this packet. This is independent evidence, not reliance on a builder receipt.

## R1 — MET: scope and identity

Commands: `git diff --name-only origin/main HEAD`; `git diff origin/main HEAD`; `git diff --check origin/main HEAD`; `git log origin/main..HEAD --format="%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)"`; `python3 /tmp/gate-data-proof.py`.

Exactly three changed paths, 29 insertions and 27 deletions; no test path changed, deleted, skipped or weakened. One candidate commit exists above main, with no side-parent candidate commits. Author and committer are both Run Edit Run fleet <fleet@runeditrun.com>; no trailers. Candidate messages were read in full and contain no OpenAI/Codex co-author. All added lines were inspected and the credential-shape check passed. Full Base publication scanning remains on the fleet Mac as the cloud instruction requires.

Every hunk is accounted for:

- public/data/listings.json: generatedAt advances; Oncall v0.5.11 -> v0.5.12, Orbit v0.4.8 -> v0.4.9, Uptime v0.5.10 -> v0.5.11. No other public field changes.
- src/data/seed-pages.ts: exactly the same three version string increments. Removing those increments makes the file byte-identical to main; no summary, feature, promise, migration or pricing wording changes.
- scripts/seeds-sync/state.json: syncedAt advances. Each target seed updates its resolved source commit, sourceRef and tag, plus README.md/seed.json provenance hashes where changed. All three CONTRACT.md hashes stay unchanged. Oncall and Uptime add open-copy marker 42983364b373 (README.md and seed.json drift), Orbit adds 64cb07f6a0dd (seed.json drift). Each key independently equals sha256 of the tool's `copy:<summary>` input, truncated to 12 characters. Spool removes only its old open marker 42983364b373; its release and public wording stay untouched. The recursive JSON delta check permits only these provenance and open-copy fields. Brand tokens, marks, homepage headlines/signatures and all public wording are unchanged.

## R2 — MET: promotion truth

Commands: one `gh api repos/just-every/run-<seed>/releases?per_page=100` per seed; one `gh api repos/just-every/run-<seed>/contents/CONTRACT.md?ref=<tag>` per seed; one `gh api graphql` resolving the three tag commit objects; `python3 /tmp/gate-data-proof.py` for cross-file comparisons.

All three target Releases are non-draft, non-prerelease, and include an uploaded rer-release.dsse.json. All tags exist; their exact commit objects equal state.json's commit provenance. Tagged CONTRACT.md hashes equal the corresponding committed provenance hashes. Envelope asset presence is verified; signature verification is not claimed.

| Seed | Before -> after | Tagged source commit | Release publication UTC |
| --- | --- | --- | --- |
| uptime | v0.5.10 -> v0.5.11 | 04016399e1e879e7be3b8e891baf02d975bb3901 | 2026-11-13T15:41:29Z |
| oncall | v0.5.11 -> v0.5.12 | 1ab915f6efdfe3398c8d7645fe56e46e123299b6 | 2026-11-13T15:39:37Z |
| orbit | v0.4.8 -> v0.4.9 | a5f471626aea1bfcb2c79f5dbee2250fdb38fd49 | 2026-11-13T17:49:50Z |

Release URLs:

- https://github.com/just-every/run-uptime/releases/tag/v0.5.11
- https://github.com/just-every/run-oncall/releases/tag/v0.5.12
- https://github.com/just-every/run-orbit/releases/tag/v0.4.9

listings.json, seed-pages.ts and state.json agree. Every other seed version and status is unchanged, including HappyToHelp v0.4.24, Lamp v1.11.14 and Spool v0.7.9. No coming-soon copy was imported and no public wording changed.

## R3 — MET: public data and render

Commands and observed results:

| Command | Result |
| --- | --- |
| `cloud_run npm ci` | exit 0; 726 packages installed |
| `npm run listings -- --check` | exit 0; Listings current (49 seeds) |
| `npm run listings` | exit 0; Listings unchanged (49 seeds) |
| `git diff --exit-code HEAD -- public/data/listings.json` | exit 0; no generated difference |
| `cloud_run npm run type-check` | exit 0 |
| `cloud_run npm run lint` | exit 0 |
| `cloud_run npm run build` | exit 0; production build, 61 static pages generated |
| baseline archive: `cloud_run npm run build` | exit 0; same dependency installation, no source edits |
| `cloud_run timeout 180 node /tmp/gate-browser.cjs` | exit 0; real built /uptime, /oncall and /orbit, main and head, at 1440 and 390 |

Independent structural checks confirm 49 = 35 released + 14 coming soon. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen are absent. No price source or wording changed. Assisted/Managed price text does not occur in either revision of this checkout; preservation of the accepted Assisted US$10/month and Managed US$100/month terms is by no change to pricing, not a new observation of an external pricing site.

The browser used /usr/bin/chromium with --no-sandbox and the real HOME. Assertions run at 1440: each actual slug returned HTTP 200 and displayed the intended version once, with no horizontal overflow or clipped version. Main/head visible text is identical after normalizing only each version. Every h1, h2 and facts block has identical geometry. At 390 the receipt records HTTP 200, the correct version and scrollWidth 390 for all six observations; the phone screenshots were visually reviewed. Full-page screenshots of all three routes, both revisions and both widths are present. No introduced layout break appears. No page errors were observed. The browser closed in finally, both owned Next server PIDs received SIGTERM and were confirmed stopped.

No permanent test was added and no full local test suite was run; branch Verify supplies the existing full check. No fixture or mock application path was substituted.

## R4 — MET: exact-head CI

Command: `gh api 'repos/just-every/home/actions/runs?head_sha=edfb1132486eaac9f87843199561c3230d5132df&per_page=100'` (one read; no dispatch/rerun/poll was needed).

- Verify branch, push, run **43484468818**: completed/success, exact head edfb1132486eaac9f87843199561c3230d5132df. https://github.com/just-every/home/actions/runs/43484468818
- Verify branch, pull_request, run **43484538130**: completed/skipped under the existing cloud/* PR job condition. The successful exact-head push invocation is the Verify evidence. https://github.com/just-every/home/actions/runs/43484538130
- Code scanning / PR #53, run **43484531808**: completed/success on that exact head. https://github.com/just-every/home/actions/runs/43484531808

No failing run or failed job required logs. Total gh API invocations: 10, including the final prerequisite recheck. No watcher, scheduler or CI rerun was started.

## R5 — MET: claim honesty on touched entries

Commands: tagged CONTRACT.md content reads above; extraction of each JE entry's summary, features, promises and named clause ids; direct reading of the corresponding requirement, acceptance and current status/gap rows. See claim-copy.json, claim-status-receipt.json and the three claim-sections.txt files.

No newly demonstrated false statement was established. The gate did not treat an unasserted/partial evidence cell as proof of falsity. The new tagged contracts have the same recorded 16-character content hashes as baseline's contract provenance. No JE wording changed.

The incumbent context is Uptime: Pingdom, UptimeRobot, Better Stack Uptime, Site24x7; Oncall: PagerDuty, Opsgenie/Jira Service Management, Splunk On-Call; Orbit: HubSpot Sales Hub, Pipedrive, Salesforce Sales Cloud. This JE version sync changes none of those products' behavior; no wider incumbent audit was added.

Uptime's STATE-001 and NETWORK-001 remain partial because named assertions are absent, not because these unchanged promises are demonstrated false. Oncall's ten named promise clauses are done; OC-021's zero-write promise concerns preview creating no native imported objects, while the source explicitly retains upload/plan bookkeeping custody. Orbit's partial rows retain their stated proof limits: OPP-004's missing source-evidence links do not refute JE's promise to show contributions/source/time/weight beside a recommendation; JE does not promise those links. SIGNAL-007's source preserves no public-page/app tracker, while the disclosed OUT-016 mail-tracking target is marked missing and does not itself establish that the release collects a pixel. No missing provider qualification was converted into a false-claim finding. The known pre-existing Uptime/Lamp, HappyToHelp, Terrace and Spool follow-ups stay unchanged.

Every named JE promise and the released source status read by this gate follows; the full source gaps and evidence references are in the receipt. These are observations, not status promotions.

### uptime

- STATE-001 — source partial, CONTRACT.md:1522: “One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks.”
- EVIDENCE-001 — source done, CONTRACT.md:1521: “Every scheduled check and every retry is kept with its time, result and error type, and a retry never erases an earlier failure.”
- NOTIFY-001 — source done, CONTRACT.md:1533: “Only confirmed incident changes send automatic alerts, and a test send never changes a monitor's status.”
- DELIVERY-001 — source done, CONTRACT.md:1534: “Each alert gets one automatic send per destination where a repeat could double up, an unclear outcome is not sent again, and 'accepted' is never reported as 'read'.”
- DRILL-001 — source done, CONTRACT.md:1537: “An alert drill sends a clearly marked test with a one-time confirmation link, and a confirmation is the recipient's own report, never proof of monitoring.”
- TLS-001 — source done, CONTRACT.md:1550: “Certificate checks look at trust, host name and expiry from each location, warn in stages before a certificate runs out, and clear only after a new valid certificate is seen.”
- MAINT-001 — source done, CONTRACT.md:1563: “Planned and recurring maintenance windows use US time zones and daylight saving, and keep the underlying check results so reports still show what happened.”
- ARCHIVE-001 — source done, CONTRACT.md:1526: “A backup restores only into an empty installation: monitors come back paused, destinations disabled and old alerts held back.”
- NETWORK-001 — source partial, CONTRACT.md:1524: “Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected.”
- ERASURE-001 — source done, CONTRACT.md:1529: “An owner can erase a monitor with its evidence, an alert destination, or an operator, and gets a receipt of what was removed.”

### orbit

- OUT-001 — source partial, CONTRACT.md:2460: “Signals, scores and AI text never grant permission to send. Your company's policy decides agent sending; when approval is required, a person approves the exact saved recipients, subject and body, and later changes invalidate it.”
- OPP-004 — source partial, CONTRACT.md:2449: “A deal's score shows every signal it used, with source, time and weight, beside the reason for the recommendation.”
- SIGNAL-007 — source partial, CONTRACT.md:2434: “Orbit uses no tracking script, pixel or cookie, and does not fingerprint visitors.”
- OUT-007 — source partial, CONTRACT.md:2466: “A reply, a booked meeting, an unsubscribe or a permanent bounce cancels that contact's scheduled messages.”
- OUT-012 — source done, CONTRACT.md:2471: “Opt-out is on by default for sequence email and off for one-to-one email. Messages set to carry it include one-click unsubscribe; an identified opt-out marks the contact do-not-contact within a minute and cancels scheduled messages.”
- ACTION-005 — source partial, CONTRACT.md:2459: “A draft goes stale when the customer replies or the deal changes, and a stale draft cannot be sent until you have seen what changed.”
- CAPTURE-005 — source partial, CONTRACT.md:2441: “Capture never writes a draft or sends a message, and a contact created from captured mail is do-not-contact until you clear it.”
- AI-003 — source partial, CONTRACT.md:2474: “If the AI is unavailable, records, scoring, search, hand-written drafts and sending still work.”
- RECORD-004 — source done, CONTRACT.md:2418: “Merging duplicates needs you to choose the surviving record and every conflicting value, and refuses if either record changed after your review.”
- DATA-002 — source partial, CONTRACT.md:2488: “Deleting a contact removes their email, signals, drafts and message bodies from records, search, exports and later AI or mail requests within five minutes.”

### oncall

- OC-012 — source done, CONTRACT.md:1444: “Oncall sends no texts, calls or push alerts, so your existing pager stays in charge while you use it.”
- OC-006 — source done, CONTRACT.md:1438: “Oncall sends signed response events only to endpoints an administrator approves; paging stays off, and email is for sign-in links only.”
- OC-005 — source done, CONTRACT.md:1437: “A runbook is copied into the incident when it is declared, so later edits never rewrite instructions mid-incident.”
- OC-004 — source done, CONTRACT.md:1436: “Resolving an incident needs recovery evidence and a summary, and every change is recorded in an attributed timeline.”
- OC-008 — source done, CONTRACT.md:1440: “Incident records you write are never deleted automatically.”
- OC-011 — source done, CONTRACT.md:1443: “Rotations hand over by wall-clock time in your named zone, and clock-change gaps show up as visible gaps.”
- OC-003 — source done, CONTRACT.md:1435: “Viewers can only read, responders coordinate, and admins manage; alert-sending credentials grant no read access, and removed access stops on the next request.”
- OC-002 — source done, CONTRACT.md:1434: “Replaying alert routing only reads: it creates no alert, incident or outside effect.”
- OC-021 — source done, CONTRACT.md:1453: “A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused.”
- OC-022 — source done, CONTRACT.md:1454: “A move-in can be undone, and edits you made afterwards are kept rather than overwritten.”

## Independent evidence, limitations and custody

No seed-style sources.lock.json, CONTRACT.md, generated acceptance views or migration-ledger check exists/documented in just-every/home. The seed-specific regenerate/write/check instructions are inapplicable here; the repository's actual documented listings check and generation both passed independently. No generated seed view or lock was committed. D1 migrations are untouched; no provider setup or credential was used.

The exact source patch, fleet identities, release metadata, resolved tag commits, status rows, observed command exits and real production browser screenshots are included. Only explicitly selected non-secret regular files are eligible for the report-only transfer; no environment dump, decrypted bundle, secret value, private held-out material or symlink is included.

Blockers: none. New blocking findings: 0. New C follow-ups: 0. No product, contract or documentation changes were made by this gate. FOLLOW-UPS.md retains the known out-of-scope copy follow-ups; LANDING-NOTES.md records the CI condition, expected build warnings and remaining fleet landing duties. Main was never pushed, merged or fast-forwarded.

After report transport is verified, the temporary product clone, installed node_modules and baseline archive are removed. The packet/report files remain under the fleet work directory. The evidence ref is report custody only and neither a product READY claim nor a merge/deployment.

Verdict on the frozen candidate: PASS.
