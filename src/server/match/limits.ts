/**
 * What each product does not do (and, where a search would stretch it, the
 * exact scope it does cover), from its own seed.json and CONTRACT.md. Only
 * the matcher reads these, on the server, so a reason never claims more than
 * is true. Every seed in src/data/seeds.ts needs an entry: the catalogue
 * refuses to build without one.
 */
export const seedLimits: Readonly<Record<string, string>> = {
  uptime:
    'Its checks are scheduled HTTP(S), keyword, heartbeat and browser-flow checks, and it alerts by email, signed webhook or Slack. It never phones, texts or pages anyone, has no on-call escalation, does not connect to databases itself and publishes no status page.',
  happytohelp:
    'A person presses Send on every reply; it never answers customers on its own.',
  nook: 'It notifies people by email only, for mentions, urgent requests and commitments; it never pages anyone.',
  lamp: 'It does not monitor or probe services, schedule on-call or page anyone, send text or voice notifications, or host private status pages.',
  cradle:
    'It does not sync two ways with spreadsheets or other tools, track general tasks, run content calendars or feedback tracking, publish public views, or ship native mobile apps.',
  vector:
    'It has no roadmaps, Gantt charts or time tracking, no customer portals or public roadmaps, no AI triage, and no built-in Sentry, Slack, GitLab, Jira or email integrations.',
  slate:
    'One workspace per install; no template marketplace, screen recorder or native mobile app.',
  pencil:
    'It does not take payments or orders, book appointments, accept file uploads, signatures, video or audio answers, or offer single sign-on.',
  orbit:
    'It sends no bulk campaigns or sequences and does no autonomous outreach or SMS, phone or social sending; it has no revenue forecasting, hosted forms, landing pages, ads or attribution.',
  mango:
    'It sends no order, shipping or account messages and nothing without your approval; it builds no signup forms or landing pages, runs no social or ad campaigns, and has no A/B tests or journey automation.',
  dial: 'One host per install: no team round-robin, group events or classes, payments, recurring bookings, or SMS, WhatsApp or phone reminders.',
  penny:
    'It is not a support inbox, survey or NPS tool, community chat or forum, and it has no AI classification or scoring, Gantt charts or sprint planning.',
  oncall:
    'Paging is off: it never calls, texts or pages anyone, and it runs beside your existing pager. Escalation policies are configuration you can read, not live timers.',
  spool:
    'It handles errors only (other Sentry telemetry is counted and discarded), and it never pages anyone.',
};
