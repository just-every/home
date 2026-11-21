# je-sync-56 plan

Author: Run Edit Run fleet. Recorded 2026-11-21T03:23:45Z.

1. Read launcher and repository instructions and the committed sync implementation; use a fresh shallow main clone and the named cloud branch.
2. Restrict sync to Uptime, HappyToHelp, Lamp, Orbit, Oncall and Spool. Later seeds remain paused. Independently check published Releases and envelope-asset presence before importing any version.
3. Read current RER catalogue by repository URL, preserving JE versions when RER lags. Record drift for gr.
4. Run the dry sync, review every finding, then apply copy provenance only. Review released-source differences and retain true public wording; record deferred follow-ups without changing implementation statuses.
5. Apply eligible mechanical sync changes, generate and check listings, and rerun the dry sync until every remaining finding is explained.
6. Check scope and diff hygiene; run typecheck, lint and production build. No full local suite or unrelated source changes.
7. Fetch current main and rebase before the first push with fleet identity and hooks. Inspect every candidate identity, trailer and message. Push using the cloud guard, open one PR, and observe exact-SHA Verify through REST.
8. Keep reports and actual receipts outside the product tree, publish explicitly selected safe files on the evidence ref, relay results and RER drift to the lane, then delete the successfully published clone.
