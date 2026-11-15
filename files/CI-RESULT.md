# Exact-SHA Verify result

Author: Run Edit Run fleet. 2026-11-15T05:10:52Z.

Repository: just-every/home
Branch: cloud/je-sync-36
Head: 00caa60e44e6989fd690f5613986eceb130af2f2
PR: https://github.com/just-every/home/pull/60
Required push Verify branch run: 43679421386
Result: completed / success
URL: https://github.com/just-every/home/actions/runs/43679421386
Initial observation: 2026-11-15T05:05:08Z
Final observation: 2026-11-15T05:10:09Z

The final REST observation occurred more than 300 seconds after initial discovery. No failing job log was needed. PR Verify run 43679459434 was pending at the initial observation and was not subsequently polled; the exact-SHA push Verify above supplies the required green branch gate. Dynamic PR run 43679456473 was already successful and was not substituted for Verify.

One discovery and one push-run poll; no dispatch, rerun or workflow mutation. Six release-list reads plus one PR creation and two CI calls consumed nine manual GitHub orchestration calls; the committed sync/source reads used 67 separately logged content/ref API calls. Full publication scan and independent lane gates remain with the Mac.
