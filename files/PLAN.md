# je-gate-61 independent gate plan

Author: Run Edit Run fleet. Recorded 2026-11-19T18:31:07Z.

Target: just-every/home PR 77, builder branch cloud/je-sync-51, exact candidate ac2df502633ad0e49ecdefd46e42bbc907fce02e, baseline e54baedf55c3a4f01bf5daea7819fe509b6df3d9.

1. Confirm PR head and base through Git refs and one PR REST read. Stop without judging another head if either prerequisite differs.
2. Read repository AGENTS.md, package scripts, listings generator, and sync detectors. Inspect all candidate commits and every hunk against baseline. Check diff for credential-shaped values; verify identity and trailer policy without copying addresses into the report packet.
3. Independently peel Uptime and Orbit version tags through Git. Read the Uptime release once, checking published/non-draft/non-prerelease state and envelope asset presence. Query the withheld Orbit release once. No signature verification is inferred from asset presence.
4. Read public tagged Uptime CONTRACT.md, README.md and seed.json at both releases and hash their actual bytes. Read Spool's unchanged pinned copy sources to trace the removed open marker. Reproduce marker keys using committed detector logic; compare the homepage fingerprint.
5. Execute the named checks sequentially on the candidate: npm ci; npm run listings -- --check; npm run listings (no diff); npm run type-check; npm run lint; npm run build. No full local test suite. Determine whether seed lock/generated-contract/migration-ledger commands apply from this repository's files and instructions.
6. Serve the production build on an owned localhost port. Use headless /usr/bin/chromium with --no-sandbox, a fresh browser context and the real HOME. Assert the public /uptime door at 1440, and capture candidate proof at 1440 and 390. Compare baseline rendering on the same touched route if needed. Stop only server/browser processes started by this task.
7. Read exact-head workflow runs once through REST. Never dispatch/rerun CI. Observe the 300-second minimum for any necessary subsequent run read and the ten-call API budget.
8. Score R1-R5 MET, UNMET or NOT RUN. List introduced blocking findings only with tier A/B/BAR and ordinary trigger. Re-list Uptime's existing partial-evidence copy follow-up with exact sentences and clause IDs; do not promote partial evidence to proof of falsehood.
9. Save actual non-secret report, follow-up notes, command/probe receipts and screenshots outside the product checkout. Verify explicit selections contain no email addresses, secret values, environment dumps, symlinks or held-out material. Publish only to refs/heads/evidence/je-gate-61, attached to the already-published candidate. Create no product commit, push no product branch, leave PR untouched.
10. Retain report/receipts, delete the fresh clone and its node_modules, and return one gate verdict plus the exact evidence custody line and lane POST line.

Cloud precedence: launcher setup and the injected-bundle Git helper are used for mandated evidence custody. Public tagged sources are read over plain HTTPS. No provider credential or deployed checkout is accessed. The brief's gate role and “fix nothing” rule govern the product; generic builder READY/product-push instructions do not authorize altering a gate candidate.
