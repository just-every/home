# je-gate-32 independent gate plan

Target: PR #48, cloud/je-sync-24, e971bef20b72603b026c871bc32a4d3fd6b45491.
Baseline: origin/main 1bc79fecf2ded7323c7047836f1046398cd0ef21.

1. Confirm PR head and base before judging; preserve a fresh shallow baseline clone and detach the exact candidate. Do not alter any product file or publish a product commit.
2. R1: inspect every changed path and hunk, candidate identity/trailers, diff hygiene and credential-shaped additions; distinguish state provenance/open markers from published wording.
3. R2: read Uptime releases once, resolve v0.5.9 annotated tag, verify release eligibility and DSSE asset presence without claiming signature verification. Compare all listings/statuses and page data against baseline; hash the tagged copy sources against state.
4. R3: npm ci; listings check and regeneration/no-diff; counts and exclusions; pricing comparison; type-check; lint; production build. Serve the built candidate on a loopback port and inspect /uptime at 1440 and 390. Assert the public route at 1440 and capture both widths; look for regressions against main on the same touched route.
5. Independent-evidence applicability: inspect repository scripts and AGENTS for documented source-lock/generated-contract/migration-ledger commands. Run applicable commands only; report N/A when absent. No repository-wide tests or new gate requirements.
6. R4: observe exact-SHA Verify through REST once; if incomplete, a single watcher may poll no faster than 300 seconds. Never dispatch/rerun workflow.
7. R5: compare JE Uptime copy with its tagged CONTRACT status table and scope incumbent; only newly false claims are findings. Carry existing partial-evidence notes without creating a new blocker.
8. Save the full actual report, receipts, relevant source extracts and browser proof in packet/. Publish explicitly selected regular non-secret files only to evidence/je-gate-32, retaining product provenance. No product push, PR comment, merge, deploy or provider credential use. Stop only started PIDs and remove the clone/node_modules after evidence publication. End with the deciding gate verdict and POST relay line.
