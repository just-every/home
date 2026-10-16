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
  auth: 'It signs people in to your own apps with email links and passkeys over OpenID Connect; it does not synchronise roles or provision people with SCIM.',
  chest:
    'It does not edit office documents or preview every file type, share anonymously, sync devices, or apply statutory retention and automatic destruction.',
  easel:
    'One company only: no multi-entity consolidation or currency conversion, no posting journals or correcting the ledger, no payroll, tax or statutory statements, and it does not run spreadsheet formulas or macros.',
  pier: 'Finished-goods wholesale for one business in AUD: no manufacturing or assemblies, serial or expiry tracking, payments, general ledger, tax filing, carrier or supplier networks, or autonomous purchasing.',
  purse:
    'It does not execute payments, post to accounting, determine tax, find suppliers, or send supplier messages or negotiate for you.',
  willow:
    'It does not calculate payroll, tax or payments, handle benefits or pensions, track applicants or performance, rank candidates, or apply statutory entitlement rules; it hands changes to the payroll provider you already use.',
  beam: 'It builds courses from your own procedures; no accreditation or statements of competence, SCORM or xAPI playback, course sales, or learners who are children.',
  coaster:
    'It records reimbursement but never moves money or makes payment files; no card issuing or feeds, payroll, travel booking, multi-currency claims, receipt reading by OCR or model, accounting software sync or tax determination. Finance exports a CSV.',
  gasket:
    'One site only: it never certifies equipment as safe or compliant, takes no sensor or IoT feeds and controls no equipment, and has no purchasing, costs, depreciation or contractor work for customers.',
  gauge:
    'It prepares billing packets but issues no tax or statutory invoices, takes no payments, runs no payroll and handles no retainers; it connects to no calendar or accounting providers.',
  glove:
    'It has no route optimisation or maps, sends no SMS or email, takes no card payments and is not a full accounting or tax system; invoices are exported to your own accounting system.',
  larder:
    "It does not keep statutory books, file tax, run payroll, post journals, handle multiple entities or currencies, schedule by finite capacity, or certify regulated quality or recalls; it hands off to the accountant's own ledger.",
  locket:
    'It organises and prepares agreements but gives no legal advice, does not sign or re-sign anything, and does not validate signatory authority; signing happens in the service you already use.',
  lodge:
    'It sends no email and syncs no calendars; it does not reject, rank or score candidates automatically, record or run interviews, do background checks, payroll, employee records or e-signature, or post to job boards.',
  nectar:
    'It never collects payments, holds cards or retries charges, and sends no invoices or reminders; no merchant-of-record service, revenue recognition, multiple entities or currencies, and tax only for one declared US state policy.',
  pantry:
    'One US business in USD: no live bank feeds, payment initiation, tax filing or advice, payroll, multi-currency, multi-entity consolidation or inventory valuation.',
};
