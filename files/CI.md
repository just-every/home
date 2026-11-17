# Exact-SHA CI observation
Author: Run Edit Run fleet. Recorded: 2026-11-17T07:07:56Z.

One REST discovery call returned completed/success Verify branch push run 44035955957 on ab47d1c215a29c6c6041924b40acd73606b113e0.
https://github.com/just-every/home/actions/runs/44035955957

Discovery endpoint: repos/just-every/home/actions/runs?head_sha=ab47d1c215a29c6c6041924b40acd73606b113e0&per_page=100
No repeated polling, run dispatch, workflow rerun or failed-job log fetch was needed.
The same-SHA pull_request duplicate 44036019177 was skipped by the repository's cloud-branch rule. Same-SHA CodeQL run 44036014288 also succeeded. The required push Verify is the success being relied on.

READY branch=cloud/je-sync-46 head=ab47d1c215a29c6c6041924b40acd73606b113e0
