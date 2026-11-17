# je-pm-1 — Done

Reported 2026-11-17T02:52:18Z. Repository: just-every/home.
Branch: cloud/je-pm-1.
Product head: aa8d3e0dedcfd68c74e89aadadde99318bb2f81e.
Fresh main and re-fetched main: 20474825061a95160f9df45c7064385b068db2e7.
PR: https://github.com/just-every/home/pull/69
Title: build: pin packageManager npm@10.9.3 for the fleet runner

## Full plan and completion

1. Refresh the fleet launcher, install its Git credential/push guards and clone only the declared product repository shallowly with blob filtering. Read launcher and repository AGENTS.md; create cloud/je-pm-1 from main. Completed.
2. Add the exact npm pin after the existing type field, install the fleet commit hooks, confirm the exact one-line diff, commit with explicit fleet author/committer, audit all candidate identities/messages and immediately push through cloud-push.py. Completed.
3. Open one PR to main. Run the bounded installation/listings/type-check/lint/build chain on the clean committed SHA in the dedicated cloud VM; inspect exact-SHA Verify once. Record all results outside the product tree, publish only the selected public-safe evidence to evidence/je-pm-1, then delete the product clone and node_modules. Validation and PR completed; evidence transfer and final cleanup occur after this report is written.

## Product result and counts

The entire product diff is one added line in package.json:

    +  "packageManager": "npm@10.9.3",

Before: packageManager absent (0 pins). After: exact npm@10.9.3 pin (1 pin).
Files changed: 1; lines added/deleted: +1/-0.
The field matches the fleet runner's accepted exact manager@x.y.z shape.
JSON comparison after removing only this field is identical to main.
package-lock.json, scripts, dependencies, workflows and source are unchanged.
Production uses Node 22 and npm and has no Corepack enablement; the added metadata does not change its npm commands or install inputs.
Listings remain 49 seeds; build generated 61/61 static pages.
Clause status changes: none; no CONTRACT.md is present; no contract clauses or generated views were changed.

## Validation and receipt

Node 22.23.5 / npm 10.9.3 were installed outside the product clone.
The committed checkout was clean at the start and after validation.
A 1,800-second timeout bounded the chain:

    npm ci && npm run listings -- --check && npm run type-check && npm run lint && npm run build

The complete second attempt passed with exit 0, from 2026-11-17T02:50:30Z to 2026-11-17T02:51:16Z.
Receipt: check-receipt.json and checks-retry.log.
Actual final receipt line:

    CHECK_RESULT execution=dedicated-cloud-vm exit=0

The first attempt passed install/listings/type-check/lint and compiled/generated pages, then Next.js stopped once with SecurityFatalError to recommend a security upgrade. The complete retry succeeded and retained the upgrade reminder. Existing Next.js 16.4.3 is reported as affected by a known security vulnerability; a security upgrade is recommended as separate work, outside this package.json-only assignment. Both actual logs are retained. No dependency changes were made.

No m1 RESULT line or remote-run acceptance is claimed. The cloud adaptation explicitly replaces heavy-slot.py with direct execution in this dedicated cloud VM. Pin shape and complete checks were proved here; the lane's independent remote gate still owns its acceptance.

## Exact-SHA CI (one observation)

One REST discovery response for head_sha=aa8d3e0dedcfd68c74e89aadadde99318bb2f81e:
- Verify branch push run 44005594956: completed/success, exact head SHA. https://github.com/just-every/home/actions/runs/44005594956
- PR event Verify branch run 44005662266: completed/skipped by the workflow's cloud-branch PR guard.
- Dynamic PR #69 run 44005658935: completed/success, exact head SHA.

The required push Verify is green. No failing workflow or pending required workflow was observed.
Raw observation: ci-observation.json; UTC observation: ci-observed-at.txt.
GitHub API budget: 2 calls for PR creation and one run discovery, plus 1 final PR-description update (3 total). No log downloads, polling, deployment or merge.

## Publication and custody

Author and committer: Run Edit Run fleet <fleet@runeditrun.com>; no trailers.
The first push succeeded on attempt 1. The remote product branch was independently checked to match the full product SHA.
A main re-fetch found no update, so no merge or replay was needed.
Only the product's single package.json edit is in cloud/je-pm-1.
The report packet is explicitly selected for the separate report-only evidence/je-pm-1 branch; no credentials, environment dumps, private held-out material or symlinks are selected.
The lane retains the landing hold, independent gate, publication scan, merge, deployment and live verification.
Product blockers: none. Remote m1 receipt unavailable by cloud execution design, not fabricated.
After successful evidence publication, the temporary product clone including node_modules is deleted as requested.
