# Follow-ups: je-gate-67

Author: Run Edit Run fleet, 2026-11-21T04:40:26Z.

One carry-forward group, seven pre-existing partial-evidence promises. No new blocking claim.

FOLLOW-UP C: INTAKE-002 — “Monitoring alerts follow the source's intake policy, which keeps a private draft until publication by default. Your company's policy decides agent publication; an alert alone is never a finished customer update.” Released status partial, unchanged. The cited journey asserts a private draft and page exclusion. It does not measure the 30-second create/update bound or compare all public surfaces. The class/policy wording carries no promotion.

FOLLOW-UP C: INCIDENT-004 — “A published update is never edited or deleted; a correction is a new update and both stay on the public timeline.” Released status partial, unchanged. Asserted: original wording retained; correction identifies original; both updates retained. Unasserted in old cited evidence: published deletion refused; public publication order.

FOLLOW-UP C: UPDATE-008 — “Publishing is a single step: the update and the list of people to notify are saved together.” Released status partial, unchanged. Asserted: update once; recipients once; no failed recipient. Unasserted in old cited evidence: narrowing preserves delivery; unsubscribe suppresses delivery; failed update not public; retry to success; dispatch does not block.

FOLLOW-UP C: NOTIFY-009 — “Publishing still works while email, the queue or a subscriber's endpoint is failing.” Released status partial, unchanged. Old cited evidence asserts only the previously described delivered slice. It does not assert: mail provider failure publish; queue failure publish; endpoint failure publish; public page survives delivery failure; feed survives delivery failure; widget survives delivery failure; recovery preserves and delivers committed set.

FOLLOW-UP C: PAGE-006 — “If the database or queue is down, the public page, feed and banner keep serving the last known state, labelled as such, and never show a false all-clear.” Released status partial, unchanged. Old cited evidence asserts The page body still contains Partially unavailable after database removal; Stale page content is labeled Last known state; The generation instant is visible in stale page content; The retained failure body contains Partially unavailable. Unasserted: The Atom feed survives database outage; The widget survives database outage; Page content survives queue outage; Atom feed content survives queue outage; Widget content survives queue outage; Page content survives object-storage outage; Atom feed content survives object-storage outage; Widget content survives object-storage outage; Origin outage uses the specified cached-response window; Page is unavailable only before first publication; Atom feed is unavailable only before first publication; Widget is unavailable only before first publication.

FOLLOW-UP C: MOVE-002 — “Moving in keeps original update times, notifies nobody, and brings email subscribers over as pending until they confirm.” Released status partial, unchanged. Old cited evidence asserts Sorry incident update timestamps equal source times; Past Sorry maintenance is completed; Imported Better Stack maintenance has no native notice; Import queues no notification delivery. Unasserted: Complete imported component history derives from original update times; Concurrent repeated applies send no mail; Preview sends no mail; Every resume sends no mail; Cutover checks send no mail; Each imported email subscriber is pending.

FOLLOW-UP C: SUB-006 — “Every notification email carries a one-click unsubscribe.” Released status partial, unchanged. Old cited evidence asserts mail unsubscribe value is present; web unsubscribe value is present; one-click declaration; URL-encoded deactivation. Unasserted: visible unsubscribe link in notification body; multipart form deactivation; DKIM coverage of both unsubscribe headers; per-token allowance independence.

## Out of scope

Existing Uptime partial promises, HappyToHelp eight partial promises, Terrace trust wording and Spool ERR-006 remain with their existing lanes. No new finding about them is made.
