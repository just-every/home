/**
 * The content of each seed's own page (/<slug>), read from each seed's repo
 * (README, CONTRACT.md, seed.json) on 17 Oct 2026: what it does, what it
 * promises, what it moves in, where it runs and its version. Facts about the
 * product's look and card (mark, colours, line, reel) stay in seeds.ts and
 * upcoming.ts; src/components/seed/model.ts joins the two. An empty
 * `contractUrl` or `version` means the repo has none yet.
 */
export type PromiseCategory =
  | 'privacy'
  | 'access'
  | 'history'
  | 'undo'
  | 'export'
  | 'import'
  | 'alerts'
  | 'evidence'
  | 'money'
  | 'ai'
  | 'erasure'
  | 'schedule'
  | 'approval'
  | 'security'
  | 'reliability'
  | 'other';

export interface SeedPromise {
  /** The contract's own id, e.g. STATE-001; empty where the contract numbers none. */
  id: string;
  text: string;
  category: PromiseCategory;
}

export interface SeedPageContent {
  slug: string;
  summary: string;
  does: string[];
  promises: SeedPromise[];
  /** What the seed imports from; empty when it names none. */
  moveIn: string[];
  runsOn: string;
  version: string;
  contractUrl: string;
  seoTitle: string;
  seoDescription: string;
}

export const seedPageContent: SeedPageContent[] = [
  {
    slug: 'uptime',
    summary:
      'Uptime is for owners who want to know when their website or service goes down, without a monthly bill. It checks your sites on a schedule, waits for a failure to be confirmed before calling it an outage, and alerts you by email, signed webhook or Slack.',
    does: [
      'Start from one web address: it looks around your site and proposes what to watch',
      'Check web pages and API responses, and look for expected text',
      'Check that a server port answers, that DNS records are right, and that SSL certificates and domain registrations are not about to expire',
      'Watch back-office jobs through heartbeat check-ins',
      'Add a checker of your own on another network for a second viewpoint on your site',
      'Alert you by email, a signed webhook or Slack when an incident opens',
      'Run an alert drill to find out whether a message really reaches a person',
      'Keep monitors as a reviewed definitions file you can export and re-import, or move them in from UptimeRobot after a preview',
    ],
    promises: [
      {
        id: 'STATE-001',
        text: 'One failed check shows a monitor as Degraded, not as an alert. It is called Failing only after confirmation, and Healthy returns only after fresh passing checks.',
        category: 'reliability',
      },
      {
        id: 'EVIDENCE-001',
        text: 'Every scheduled check and every retry is kept with its time, result and error type, and retries never erase an earlier failure.',
        category: 'evidence',
      },
      {
        id: 'NOTIFY-001',
        text: "Only confirmed incident changes send automatic alerts, and a test send never changes a monitor's status.",
        category: 'alerts',
      },
      {
        id: 'DELIVERY-001',
        text: "Each alert gets one automatic send per destination; if the outcome is unclear it is not sent again, and 'accepted' is never reported as 'read'.",
        category: 'alerts',
      },
      {
        id: 'DRILL-001',
        text: "An alert drill sends a clearly marked test with a one-time confirmation link; a confirmation is the recipient's own report and is never treated as proof of monitoring.",
        category: 'alerts',
      },
      {
        id: 'TLS-001',
        text: 'Certificate checks look at trust, host name and expiry from each location, warn in stages before a certificate runs out, and clear only after a newly seen valid certificate.',
        category: 'alerts',
      },
      {
        id: 'IMPORT-001',
        text: 'Imported monitor files and saved UptimeRobot pages are previewed first, apply as one change, arrive paused, and can be undone without deleting history.',
        category: 'import',
      },
      {
        id: 'ARCHIVE-001',
        text: 'A backup restores only into an empty installation: monitors come back paused, destinations disabled and old alerts held back, and sign-in sessions and webhook addresses are left out.',
        category: 'import',
      },
      {
        id: 'NETWORK-001',
        text: 'Checks validate every address and redirect, and refuse unsafe or private addresses and web redirects that downgrade from HTTPS.',
        category: 'security',
      },
      {
        id: 'ERASURE-001',
        text: 'An owner can erase a monitor with its evidence, a destination, or an operator, and gets a receipt of what was removed.',
        category: 'erasure',
      },
    ],
    moveIn: [
      'UptimeRobot (saved monitor pages)',
      'A reviewed monitor definitions file',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.3.0',
    contractUrl:
      'https://github.com/just-every/run-uptime/blob/main/CONTRACT.md',
    seoTitle: 'Uptime: free, open-source alternative to UptimeRobot',
    seoDescription:
      'Uptime watches your websites, servers, DNS and certificates, confirms failures before alerting, and emails, webhooks or Slacks you. 100% free and open source, an UptimeRobot alternative.',
  },
  {
    slug: 'happytohelp',
    summary:
      'HappyToHelp is a customer support workspace for small businesses: a chat box for your website, a shared inbox with customer details beside each conversation, help articles and optional AI-assisted replies. It works with human replies alone, and you can hand investigation to your own Codex or Claude.',
    does: [
      'Put a chat widget on your website and reply from a shared inbox',
      'Turn forwarded customer email into conversations',
      'Get suggested replies and AI answers once you add an AI service key',
      'Publish help centers and search them',
      'Hand a task to your own Codex or Claude on your computer',
      'Collect thumbs up or down on resolved conversations and see reports you can export',
      'Connect with scoped API tokens, signed webhooks and Slack',
      'Move in your support history from Zendesk, Help Scout, Intercom or Freshdesk exports',
    ],
    promises: [
      {
        id: 'MOVE-IN-001',
        text: 'Imports are reviewed before anything is written, never message your customers, can be undone as a whole, and keep source dates, private notes and publication state.',
        category: 'import',
      },
      {
        id: 'CONVERSATION-001',
        text: 'Customer and agent messages are stored once, and two conflicting final replies can never both be accepted.',
        category: 'reliability',
      },
      {
        id: 'OUTCOMES-001',
        text: 'Customers can rate a resolution with a thumbs up or down and a short comment; comments are removed if the contact is erased.',
        category: 'erasure',
      },
      {
        id: 'REPORTS-001',
        text: 'Reports use your own calendar and time zone, count each conversation once, and export to a spreadsheet file that is safe to open.',
        category: 'export',
      },
      {
        id: 'AI-001',
        text: 'With no AI key, the AI simply is not assigned to new conversations and your team keeps them; automatic AI work has daily limits and uncertain attempts are never silently repeated.',
        category: 'ai',
      },
      {
        id: 'DELEGATION-001',
        text: "Revoking a computer's access ends its authority at once, and HappyToHelp never claims that work already running there was stopped.",
        category: 'approval',
      },
      {
        id: 'CONNECTIONS-001',
        text: 'API tokens have chosen scopes, are shown once, are stored hashed and can expire; an unclear webhook result is not sent again.',
        category: 'security',
      },
      {
        id: 'KNOWLEDGE-001',
        text: 'A failed refresh of your help content never replaces the last good published version, and drafts never appear publicly.',
        category: 'reliability',
      },
      {
        id: 'IDENTITY-001',
        text: 'Every private page and action checks who is signed in, which workspace and which role; blocked workspaces and revoked tokens lose access.',
        category: 'access',
      },
    ],
    moveIn: ['Zendesk', 'Help Scout', 'Intercom', 'Freshdesk'],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.4.1',
    contractUrl:
      'https://github.com/just-every/run-happytohelp/blob/main/CONTRACT.md',
    seoTitle: 'HappyToHelp: free, open-source alternative to Zendesk',
    seoDescription:
      'HappyToHelp is a free, open-source support desk with a website chat widget, shared inbox, help center and AI replies. A Zendesk and Intercom alternative.',
  },
  {
    slug: 'nook',
    summary:
      'Nook is a team chat workspace for people who want conversations to end in decisions and agreed work. It has channels, direct messages, threads, recorded decisions and requests that only the person asked can accept, with calm notifications. It can bring in public channel history from a Slack export.',
    does: [
      'Talk in private channels, fixed-person direct messages and threads',
      'Record decisions with a full revision history',
      'Ask a teammate to take something on, in the thread, where only they can accept it',
      'Share files up to 25 MB each, kept private',
      'Mute or follow conversations and set quiet time; mark a message urgent when it cannot wait',
      'Opt in to email and phone push notifications',
      'Invite teammates by email as owner, admin or guest, and search the messages you can see',
      'Bring in selected public channel history from a Slack export, and back up everything to one file you can restore later',
    ],
    promises: [
      {
        id: 'NOOK-001',
        text: "Every action checks who you are and whether you are in that conversation; workspace admins cannot read other people's direct messages.",
        category: 'access',
      },
      {
        id: 'NOOK-003',
        text: "Removing someone from a channel cuts their reading, writing and search access immediately. New members can see a channel's whole history, and Nook says so.",
        category: 'access',
      },
      {
        id: 'NOOK-004',
        text: 'A request becomes accepted only through the person it was assigned to, and a completed item is reported as completed, never as verified.',
        category: 'approval',
      },
      {
        id: 'NOOK-010',
        text: "If a request's wording or deadline materially changes, the assignee must accept the new version again.",
        category: 'approval',
      },
      {
        id: 'NOOK-013',
        text: 'Muting hides routine updates but never an explicit mention or a request to you, and an urgent request still shows during quiet time.',
        category: 'alerts',
      },
      {
        id: 'NOOK-014',
        text: 'Email is off for everyone until they turn it on, goes only to your own sign-in address, and covers only mentions, urgent requests and commitments.',
        category: 'alerts',
      },
      {
        id: 'NOOK-012',
        text: 'Attachments are kept private and are checked for membership on every download; only text, PNG, JPEG and PDF files are accepted.',
        category: 'security',
      },
      {
        id: 'NOOK-007',
        text: 'Message text is shown as plain text and cannot run code or fetch links from your device.',
        category: 'security',
      },
      {
        id: 'NOOK-009',
        text: 'Backups include every conversation, decision, file and attention choice with integrity checks, and leave out live sign-ins.',
        category: 'export',
      },
      {
        id: 'ERASURE-001',
        text: 'Owners and admins can erase messages and members, but never the last owner, and never through a door into private direct messages.',
        category: 'erasure',
      },
    ],
    moveIn: ['Slack (public channel history, from an export file)'],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.3.0',
    contractUrl: 'https://github.com/just-every/run-nook/blob/main/CONTRACT.md',
    seoTitle: 'Nook: free, open-source alternative to Slack',
    seoDescription:
      'Nook is a calm team chat with channels, threads, decisions and requests. 100% free and open source, a Slack and Microsoft Teams alternative you host yourself.',
  },
  {
    slug: 'lamp',
    summary:
      'Lamp is a status page and incident desk for one business. When something breaks, you write the update once and Lamp publishes it to your public page, an Atom feed, an embeddable banner and your subscribers together.',
    does: [
      "Show a public status page with every component's state and 90-day uptime",
      'Open incidents and write updates from a fixed template: who is affected, the impact, what still works',
      'Preview the public page and email before publishing, and schedule an update',
      'Announce maintenance windows with automatic start and finish',
      'Email subscribers, who can choose components and unsubscribe in one click',
      'Post to Slack or Microsoft Teams channels and send webhooks',
      'Receive alerts from Datadog, UptimeRobot, Better Stack or Pingdom as drafts for you to publish',
      'Embed a status banner on your own site and offer an Atom feed; move in from Statuspage, Better Stack, Instatus or Sorry',
    ],
    promises: [
      {
        id: 'INTAKE-002',
        text: 'A monitoring alert only creates a draft. Nothing reaches customers until a person publishes it.',
        category: 'approval',
      },
      {
        id: 'INCIDENT-004',
        text: 'A published update is never edited or deleted; a correction is a new update and both stay on the public timeline.',
        category: 'history',
      },
      {
        id: 'UPDATE-008',
        text: 'Publishing is a single step: the update and the list of people to notify are saved together.',
        category: 'reliability',
      },
      {
        id: 'NOTIFY-009',
        text: "Publishing still works while email, the queue or a subscriber's endpoint is failing.",
        category: 'reliability',
      },
      {
        id: 'NOTIFY-005',
        text: 'A subscriber gets at most one message per update per channel, however many times a send is retried.',
        category: 'alerts',
      },
      {
        id: 'PAGE-006',
        text: 'If the database or queue is down, the public page, feed and banner keep serving the last known state, labelled as such, and never show a false all-clear.',
        category: 'reliability',
      },
      {
        id: 'PAGE-002',
        text: 'The status page and subscribe form work with JavaScript turned off.',
        category: 'access',
      },
      {
        id: 'PAGE-013',
        text: 'The public page sets no cookies, has no tracking or consent banner, and loads nothing from other sites.',
        category: 'privacy',
      },
      {
        id: 'MOVE-002',
        text: 'Moving in keeps original update times, notifies nobody, and brings email subscribers over as pending until they confirm.',
        category: 'import',
      },
      {
        id: 'SUB-006',
        text: 'Every notification email carries a one-click unsubscribe.',
        category: 'alerts',
      },
    ],
    moveIn: ['Statuspage', 'Better Stack', 'Instatus', 'Sorry'],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v1.5.1',
    contractUrl: 'https://github.com/just-every/run-lamp/blob/main/CONTRACT.md',
    seoTitle: 'Lamp: free, open-source alternative to Statuspage',
    seoDescription:
      'Lamp is a status page and incident desk: write one update and publish it to your page, feed, widget and subscribers. 100% free and open source.',
  },
  {
    slug: 'cradle',
    summary:
      'Cradle is a private workspace for a business that keeps its information in tables: customers, projects, campaigns and anything else. You build your own tables with linked records, views, forms and automations, and it works without any AI service.',
    does: [
      'Build tables with text, number, date, select, checkbox and linked-record fields',
      'Look at records as a grid with sort, filter and group, as a board, or as a form people fill in after signing in',
      'Preview every structure change, with the records it affects, before you accept it',
      'Start from ready-made templates such as customer relationships, project tracker and launch readiness',
      'Run automations that notify people, email a teammate, update records or call a webhook or Slack',
      'Hand an AI agent a limited key to propose structure changes that only you can accept',
      'Share data with scoped keys that expire within 30 days',
      'Bring in spreadsheet tables, Airtable exports and earlier Cradle bases, or merge a CSV into an existing table, and export your whole base',
    ],
    promises: [
      {
        id: 'RECORDS-002',
        text: 'Changes to your tables show an impact preview first, and the preview is rechecked against current data when you accept it, so out-of-date changes do not apply.',
        category: 'approval',
      },
      {
        id: 'RECORDS-005',
        text: 'Importing shows every conversion, rejected row and ambiguous link before anything is written, and can be undone for imported records you have not edited.',
        category: 'import',
      },
      {
        id: 'RECORDS-006',
        text: 'You can download your complete base, with tables, records, links and views, and a full installation archive from Settings.',
        category: 'export',
      },
      {
        id: 'RECORDS-007',
        text: "An agent's proposed change is inert text until the owner adopts it, and the agent's key can never read or write your records.",
        category: 'ai',
      },
      {
        id: 'AI-003',
        text: 'AI never changes a record, sends a notification or saves a view on its own.',
        category: 'ai',
      },
      {
        id: 'AUTO-003',
        text: 'An automation runs once per triggering event, even if a message is delivered twice.',
        category: 'reliability',
      },
      {
        id: 'API-USER-001',
        text: 'Access keys are shown once, limited to one app, stored only as digests, can be revoked, and expire within 30 days.',
        category: 'security',
      },
      {
        id: 'WEBHOOK-USER-001',
        text: 'Webhook and Slack addresses are stored encrypted, signing keys are shown once, and deliveries go only to secure addresses without following redirects.',
        category: 'security',
      },
      {
        id: 'PERM-002',
        text: 'Rules can limit which records and fields each role can read or write; restricted cells are missing from reads, search, history, exports and API answers.',
        category: 'privacy',
      },
    ],
    moveIn: [
      'Spreadsheet (CSV) tables',
      'Airtable exports (CSV)',
      'A Cradle base export file',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.2.0',
    contractUrl:
      'https://github.com/just-every/run-cradle/blob/main/CONTRACT.md',
    seoTitle: 'Cradle: free, open-source alternative to Airtable',
    seoDescription:
      'Cradle is a private records workspace with tables, linked records, views, forms and automations. 100% free and open source, an Airtable alternative.',
  },
  {
    slug: 'vector',
    summary:
      'Vector is an issue tracker for one business. New requests land in an intake queue where someone accepts, defers or declines them, and a Current page explains what needs attention and why.',
    does: [
      'Triage incoming evidence with explicit accept, defer or decline decisions',
      'See a Current page that gives the reason each item is there',
      'Track issues with priority, estimate, due date, expected outcome and customer impact',
      'Plan with teams, projects, cycles, dependencies and a team board',
      'Comment, mention teammates, attach private files and keep an unchangeable activity history',
      'Search everything and jump around with a command palette and keyboard shortcuts',
      'Get an Inbox, due reminders, and email for assignments and mentions',
      'Link GitHub pull requests, connect with scoped API tokens, and import issues from CSV, JSON, Jira or Linear after a review',
    ],
    promises: [
      {
        id: 'INTAKE-007',
        text: 'Declining a request needs a reason, and its evidence and decision history are kept.',
        category: 'history',
      },
      {
        id: 'INTAKE-006',
        text: 'A deferred item returns to the decision queue at the time you set, or sooner if new evidence arrives.',
        category: 'schedule',
      },
      {
        id: 'CURR-006',
        text: 'Every item on Current states why it is there, such as awaiting decision, overdue, or due this week.',
        category: 'evidence',
      },
      {
        id: 'ISSUE-006',
        text: 'If two people edit the same issue, the later save is rejected with the current version rather than overwriting the first.',
        category: 'reliability',
      },
      {
        id: 'ISSUE-007',
        text: 'Every change to an issue is recorded with the time, the old and new value and who did it, and cannot be changed afterwards.',
        category: 'history',
      },
      {
        id: 'OPS-001',
        text: "Everyone in the workspace can see every public team's issues, requests and projects; team membership organises work and does not hide it.",
        category: 'access',
      },
      {
        id: 'OPS-004',
        text: 'Removing a person ends their sessions, hands their projects and shared views to whoever removes them, and keeps their name on their past comments and history.',
        category: 'access',
      },
      {
        id: 'DATA-002',
        text: 'An import is checked and reported before anything is written.',
        category: 'import',
      },
      {
        id: 'DATA-001',
        text: 'A full export carries every issue, comment, file, decision and setting, and never a sign-in or provider secret.',
        category: 'export',
      },
      {
        id: 'API-001',
        text: 'API tokens are shown once, have set scopes, can expire, and are checked on every request.',
        category: 'security',
      },
    ],
    moveIn: [
      'Jira (CSV)',
      'Linear (CSV, plus a file from its API)',
      'CSV or JSON files',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.2.0',
    contractUrl:
      'https://github.com/just-every/run-vector/blob/main/CONTRACT.md',
    seoTitle: 'Vector: free, open-source alternative to Linear and Jira',
    seoDescription:
      'Vector is an issue tracker with intake decisions, cycles and projects. 100% free and open source, a Linear, Jira and Asana alternative you host yourself.',
  },
  {
    slug: 'slate',
    summary:
      'Slate is a team wiki for one business: nested pages in spaces, rich-text editing, comments, permissions, search and full revision history. It can take in Notion and Confluence exports.',
    does: [
      'Write pages in a nested tree inside spaces, with headings, tables, tasks, media and link cards',
      'Keep structured records and databases in the same tree, with grid, board and chart views',
      'Comment on a selection or on a whole page, with mentions and resolving',
      'Share pages with people and groups at view, comment, edit or full level, with optional expiry',
      'Publish a page to the public web only by an explicit act, with unpublish at any time',
      'Use page history to compare and restore earlier versions',
      'Mark pages verified, with an expiry and a reminder when it lapses',
      'Search everything you are allowed to read; import from Notion and Confluence, Word and Google Docs files, and back up or restore the whole workspace',
    ],
    promises: [
      {
        id: 'WEB-001',
        text: 'A page is visible without signing in only when a member with full access publishes it and its space allows public links.',
        category: 'privacy',
      },
      {
        id: 'LIFE-002',
        text: 'A draft is hidden from search, lists and exports, and visible only to its author and people it is shared with.',
        category: 'privacy',
      },
      {
        id: 'SHARE-007',
        text: 'Access changes take effect at once.',
        category: 'access',
      },
      {
        id: 'REV-001',
        text: 'Every saved page version is kept unchanged with its author and time, and a repeated save with no change creates nothing new.',
        category: 'history',
      },
      {
        id: 'SAVE-003',
        text: 'If someone else changed a page first, your edit is rejected and your unsaved text is kept, not silently overwritten.',
        category: 'reliability',
      },
      {
        id: 'ARCH-005',
        text: 'Deleted pages go to a trash where they can be found and restored, and nothing leaves it on a timer.',
        category: 'undo',
      },
      {
        id: 'IMP-001',
        text: 'Notion and Confluence imports show a full preview with a list of what will not carry over before anything is created, and keep the original file.',
        category: 'import',
      },
      {
        id: 'PORT-002',
        text: 'Restoring an export brings back pages, history, permissions, links and files so links keep resolving.',
        category: 'export',
      },
      {
        id: 'PORT-005',
        text: 'Exports leave out sign-ins and secrets, and imported people stay inactive until you invite them.',
        category: 'security',
      },
      {
        id: 'IMP-004',
        text: 'Importing fetches nothing from the internet; media comes from your file only.',
        category: 'security',
      },
    ],
    moveIn: [
      'Notion',
      'Confluence',
      'Word documents',
      'Google Docs',
      'Markdown, HTML, PDF, EPUB, text and CSV files',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.2.0',
    contractUrl:
      'https://github.com/just-every/run-slate/blob/main/CONTRACT.md',
    seoTitle: 'Slate: free, open-source alternative to Notion',
    seoDescription:
      'Slate is a team wiki with pages, comments, permissions, search and version history that imports Notion and Confluence. 100% free and open source.',
  },
  {
    slug: 'pencil',
    summary:
      'Pencil is a form and feedback builder where each answer can lead to the next question. You publish forms, invite people or embed them on your site, then read results and optional AI analysis that points back to the exact responses.',
    does: [
      'Build forms with thirteen question types, including rating, NPS, choice, date and consent',
      'Branch to a different follow-up question depending on the answer',
      'Preview safely, then publish a form with a shareable link or an embed',
      'Invite contacts by email, send reminders and honour opt-outs',
      'Collect anonymous responses that carry no contact link or IP address',
      'Read results with completion rates and drop-off by question',
      'Run analysis that quotes real answers and shows its evidence, and turn a recommendation into a tracked action',
      'Export responses, and bring in forms and responses from Typeform and Google Forms',
    ],
    promises: [
      {
        id: 'RESP-006',
        text: 'Anonymous responses store no contact, name, email taken from an invitation or session, or raw IP address.',
        category: 'privacy',
      },
      {
        id: 'RESP-007',
        text: 'A finished response and its answers are saved together before any follow-on email or task is triggered.',
        category: 'reliability',
      },
      {
        id: 'RESP-015',
        text: 'Spam defences run on your own installation, with no third-party challenge or tracking script on public forms.',
        category: 'privacy',
      },
      {
        id: 'ANLY-004',
        text: 'Anything shown in quotation marks is an exact excerpt of a real answer; summaries are labelled as analysis.',
        category: 'evidence',
      },
      {
        id: 'ANLY-005',
        text: 'Small groups below a set size never show raw answers or identities.',
        category: 'privacy',
      },
      {
        id: 'ANLY-008',
        text: 'If the AI is not set up or fails, no findings are invented and forms, responses and exports keep working.',
        category: 'ai',
      },
      {
        id: 'RSLT-003',
        text: 'Every percentage shown names the count it came from.',
        category: 'evidence',
      },
      {
        id: 'DIST-005',
        text: 'Every invitation and reminder has an opt-out link, and opting out stops future mail without deleting existing responses.',
        category: 'privacy',
      },
      {
        id: 'DATA-002',
        text: 'Deleting a response or contact removes their answers from analyses within five minutes and marks affected analyses stale.',
        category: 'erasure',
      },
      {
        id: 'IMPORT-002',
        text: 'A response CSV import reports every row error and commits only after you acknowledge each change; cancelling creates nothing.',
        category: 'import',
      },
    ],
    moveIn: ['Typeform', 'Google Forms'],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.5.0',
    contractUrl:
      'https://github.com/just-every/run-pencil/blob/main/CONTRACT.md',
    seoTitle: 'Pencil: free, open-source alternative to Typeform',
    seoDescription:
      'Pencil builds branching forms, sends invitations and analyses feedback with evidence. 100% free and open source, a Typeform and Google Forms alternative.',
  },
  {
    slug: 'orbit',
    summary:
      'Orbit is a sales tool for selling to accounts, guided by what customers actually do. It scores your deals from real signals, tells you the next action and why, and drafts follow-ups that you review and send yourself.',
    does: [
      'Keep contacts, companies and deals in a pipeline with your own stages',
      'Collect signals from forms, email events and other signed sources, with no tracking script',
      'Score each deal 0 to 100 and show every signal behind the score',
      'Work from a NOW queue that says what to do next',
      'Write follow-up drafts with optional AI, then review and approve each message',
      'Schedule sends with quiet hours and sending limits',
      'Pull in emails and meetings by forwarding to a private Orbit address, adding a calendar link, uploading files, or connecting Gmail, Google Calendar or Outlook',
      'Import contacts, companies, deals and notes from CSV, and try a read-only example workspace first',
    ],
    promises: [
      {
        id: 'OUT-001',
        text: 'No score, draft, AI result or automatic job can approve or start a customer message; a person must see the exact recipient, subject and body.',
        category: 'approval',
      },
      {
        id: 'SIGNAL-007',
        text: 'Orbit uses no tracking script, pixel or cookie, and does not fingerprint visitors.',
        category: 'privacy',
      },
      {
        id: 'OPP-004',
        text: "A deal's score shows every signal it used, with source, time and weight, beside the reason for the recommendation.",
        category: 'evidence',
      },
      {
        id: 'AI-003',
        text: 'If the AI is unavailable, records, scoring, search, hand-written drafts and sending still work.',
        category: 'ai',
      },
      {
        id: 'CAPTURE-005',
        text: 'Capture never writes a draft or sends a message, and a contact created from captured mail is do-not-contact until you clear it.',
        category: 'approval',
      },
      {
        id: 'OUT-012',
        text: 'Every message carries a one-click unsubscribe; an opt-out marks the contact do-not-contact within a minute and cancels scheduled messages.',
        category: 'privacy',
      },
      {
        id: 'OUT-007',
        text: "A reply, a booked meeting, an unsubscribe or a permanent bounce cancels that contact's scheduled messages.",
        category: 'alerts',
      },
      {
        id: 'RECORD-004',
        text: 'Merging duplicates needs you to choose the surviving record and every conflicting value, and refuses if either record changed after your review.',
        category: 'approval',
      },
      {
        id: 'DATA-002',
        text: 'Deleting a contact removes their email, signals, drafts and message bodies from records, search, exports and later AI or mail requests within five minutes.',
        category: 'erasure',
      },
      {
        id: 'RECORD-008',
        text: 'CSV imports need a saved dry run first, and imported contacts are held unless consent is shown; an existing do-not-contact always wins.',
        category: 'import',
      },
    ],
    moveIn: [
      'CSV files',
      'Email and calendar files',
      'Gmail and Google Calendar',
      'Outlook mail and calendar',
      'Mail forwarded to a private Orbit address',
      'A private calendar link',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-orbit/blob/main/CONTRACT.md',
    seoTitle: 'Orbit: free, open-source alternative to HubSpot',
    seoDescription:
      'Orbit is a sales CRM that scores deals from real customer signals and drafts follow-ups you approve. 100% free and open source, a HubSpot alternative.',
  },
  {
    slug: 'mango',
    summary:
      'Mango is a newsletter desk where nothing goes out until you approve it. You write and approve each email, it protects customers who have opted out, and it reports honestly on delivery. Connecting a store, text messages and AI suggestions are optional extras.',
    does: [
      'Write and edit email newsletters, preview them, add images and send a marked test to yourself',
      'Put a signup form on your site; new subscribers confirm by email before they receive anything',
      'Build audiences and saved segments that automatically leave out anyone not subscribed or recently emailed',
      'Approve one exact saved version before it can be scheduled; schedule with quiet hours and throttling, and cancel while sending',
      'Optionally connect one store to import customers, products, orders and carts, and see ranked campaign suggestions with their evidence',
      'Add text messages and AI suggestions if you want them',
      'See clicks and delivery as it really happened, with store sales when a store is connected',
      'Import contacts from CSV files with their consent records, and export everything, including uploaded images',
    ],
    promises: [
      {
        id: 'CAMP-004',
        text: 'A campaign cannot be scheduled until you approve a specific saved version; approval checks the audience, consent, sender, links and content, and any failure leaves it a draft that names every problem.',
        category: 'approval',
      },
      {
        id: 'CONT-004',
        text: 'An unsubscribe or text opt-out takes effect before it is acknowledged, and later imports, syncs, merges or edits never reverse it.',
        category: 'privacy',
      },
      {
        id: 'AUD-002',
        text: 'Contacts who are pending, not subscribed, unsubscribed or suppressed on a channel are excluded from it, whatever segment they are in.',
        category: 'privacy',
      },
      {
        id: 'MSG-003',
        text: 'Every marketing email has a visible unsubscribe link and a one-click unsubscribe that works without further steps.',
        category: 'privacy',
      },
      {
        id: 'CAMP-008',
        text: 'A test send goes only to your test addresses, is clearly marked, and changes no reports, attribution or sending limits.',
        category: 'evidence',
      },
      {
        id: 'SEND-006',
        text: 'Mango records a message as delivered only when the provider says so; being accepted by the provider is never reported as delivery.',
        category: 'evidence',
      },
      {
        id: 'CONT-009',
        text: 'Opening a confirmation link only shows a button; subscribers are confirmed only when they press it, so mailbox scanners cannot sign anyone up.',
        category: 'privacy',
      },
      {
        id: 'CAMP-009',
        text: 'Cancelling a scheduled or sending campaign stops everything not yet handed to the mail provider, and never claims to recall a message already delivered.',
        category: 'undo',
      },
      {
        id: 'CONT-013',
        text: 'Deleting a contact removes their profile, consent evidence and messages within five minutes, while keeping a one-way record that they opted out.',
        category: 'erasure',
      },
      {
        id: 'AUD-004',
        text: 'Someone emailed too recently is left out of the next send with a stated reason, not quietly delayed.',
        category: 'reliability',
      },
    ],
    moveIn: ['Contact lists from CSV files', 'Audience export archives (zip)'],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.2.0',
    contractUrl:
      'https://github.com/just-every/run-mango/blob/main/CONTRACT.md',
    seoTitle: 'Mango: free, open-source alternative to Mailchimp',
    seoDescription:
      'Mango is an approval-first newsletter desk that protects opt-outs and tells you what really delivered. 100% free and open source, a Mailchimp alternative.',
  },
  {
    slug: 'dial',
    summary:
      'Dial is a scheduler for independent professionals and small businesses that run their own. Customers book a time from your page without an account, change or cancel through a private link, or ask you for another time when nothing fits. You manage event types, availability, bookings and calendar connections.',
    does: [
      'Publish a booking page for each host, with no account needed to book',
      'Set weekly availability, buffers, minimum notice and booking limits per event type',
      "Show every time in the visitor's own time zone and the host's, with correct daylight saving handling",
      'Connect Google Calendar to block busy times and add Google Meet links',
      'Let customers reschedule or cancel from a private link, and add the booking to their calendar',
      'Let customers send several preferred time windows when nothing fits, then book the one you agree',
      'Send confirmation, reminder and change emails',
      "Bring your booking history over from Calendly, export all your data, or erase one person's data",
    ],
    promises: [
      {
        id: 'AUTH-003',
        text: 'A booking can only be viewed or changed with its private manage link; a booking number or email address never gives access.',
        category: 'access',
      },
      {
        id: 'BOOK-002',
        text: 'A time slot can never be booked twice; if many people try at once, exactly one gets it and the rest are sent back to choose another time.',
        category: 'reliability',
      },
      {
        id: 'BOOK-003',
        text: 'Sending the same confirmation twice returns the original booking and never creates a second booking, calendar event or email.',
        category: 'reliability',
      },
      {
        id: 'AVAIL-006',
        text: 'A time that does not exist when clocks change is never offered, and repeated times are shown so each maps to exactly one moment.',
        category: 'reliability',
      },
      {
        id: 'CAL-002',
        text: 'From your calendars Dial keeps only the busy times it needs; titles, descriptions, attendees and locations are never stored.',
        category: 'privacy',
      },
      {
        id: 'BOOK-008',
        text: 'Cancelling through the private link frees the slot right away and cannot be undone; repeating it sends no second notice.',
        category: 'undo',
      },
      {
        id: 'NOTIFY-006',
        text: 'Dial never reads mail sent to its sender address, so a reply can never create a booking or request.',
        category: 'security',
      },
      {
        id: 'DATA-002',
        text: "Deleting every booking and request for an email address, after a preview of what matches, erases that person's data from your installation.",
        category: 'erasure',
      },
      {
        id: 'PUBLIC-005',
        text: 'A page that is unknown, draft, disabled or deleted shows a plain not-found and reveals nothing about whether it ever existed.',
        category: 'privacy',
      },
    ],
    moveIn: ['Calendly (saved account data)'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.3.0',
    contractUrl: 'https://github.com/just-every/run-dial/blob/main/CONTRACT.md',
    seoTitle: 'Dial: free, open-source alternative to Calendly',
    seoDescription:
      'Dial is a free, open-source scheduler for one business: booking pages, availability, calendar sync and reminders. An alternative to Calendly and Acuity.',
  },
  {
    slug: 'penny',
    summary:
      'Penny is a customer-feedback tool for one software business. Customers post and vote on requests on a public board; your team records the evidence behind each request, decides what to build, and publishes status updates and release notes.',
    does: [
      'Run a public board where customers post, vote, comment and follow requests',
      'Check for similar requests before a new one is posted',
      'Review and approve what becomes public before anyone sees it',
      'Record customer evidence from calls and support and link it to requests and decisions',
      'Compare options side by side and record a decision with its reasons and review date',
      'Keep an internal roadmap and show only approved items on a public roadmap',
      'Publish release notes and email the customers who asked',
      'Bring over saved feedback exports from Canny or UserVoice, and export or erase your data',
    ],
    promises: [
      {
        id: 'DATA-002',
        text: 'Nothing marked for your team only ever appears in a public page or response, even in fields the page does not display.',
        category: 'privacy',
      },
      {
        id: 'EVID-006',
        text: 'Customer account details, evidence sources and internal notes never appear on public pages or in customer email.',
        category: 'privacy',
      },
      {
        id: 'REQ-005',
        text: 'Nothing becomes public until a team member approves its title, description, board and each attachment.',
        category: 'approval',
      },
      {
        id: 'REQ-006',
        text: 'Each person has at most one vote on a request, and the total counts distinct current voters.',
        category: 'history',
      },
      {
        id: 'REQ-023',
        text: 'Email addresses are verified with a single-use link that expires after 30 minutes.',
        category: 'security',
      },
      {
        id: 'REQ-009',
        text: "A merge of duplicate requests can be reversed, restoring the duplicate's own votes, comments and followers.",
        category: 'undo',
      },
      {
        id: 'REL-011',
        text: 'A hard bounce or spam complaint stops all further email to that address until the person verifies it again.',
        category: 'alerts',
      },
      {
        id: 'NOTIFY-004',
        text: 'A reply to a notification email never creates a request, comment or any other record.',
        category: 'security',
      },
      {
        id: 'DEC-006',
        text: 'Changing a decision later adds a new revision and keeps the original reasons and evidence readable.',
        category: 'history',
      },
      {
        id: 'DATA-003',
        text: "Erasing a person's data takes precedence over history: undoing a merge or reading old revisions never brings erased data back.",
        category: 'erasure',
      },
    ],
    moveIn: ['Canny (saved CSV or API files)', 'UserVoice (saved CSV exports)'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.1.1',
    contractUrl:
      'https://github.com/just-every/run-penny/blob/main/CONTRACT.md',
    seoTitle: 'Penny: free, open-source alternative to Canny',
    seoDescription:
      'Penny is a free, open-source customer feedback board with decisions, a public roadmap and release notes. An alternative to Canny, UserVoice and Productboard.',
  },
  {
    slug: 'oncall',
    summary:
      'Oncall helps a small team run incidents and on-call schedules alongside the pager it already uses. It keeps rotas, overrides, incident notes, runbooks and follow-ups in one place. Your existing pager stays in charge of paging.',
    does: [
      'See who is on call now and who is next',
      'Build rotations in named time zones with overrides and previewed coverage',
      'Download a private calendar feed of the schedule',
      'Declare an incident, record notes and decisions, and follow its runbook',
      'Assign follow-up tasks and complete a review afterwards',
      'Record alerts from monitoring, route them to services and replay routing safely',
      'Save your Opsgenie or PagerDuty data with a read-only download tool, then preview the move-in before anything is saved',
      'Export and restore your data',
    ],
    promises: [
      {
        id: 'OC-012',
        text: 'Paging is off. Oncall sends no texts, calls or push alerts, and your existing pager stays in charge.',
        category: 'alerts',
      },
      {
        id: 'OC-006',
        text: 'Oncall sends nothing outward during an incident; any email it sends is for sign-in links only.',
        category: 'security',
      },
      {
        id: 'OC-005',
        text: 'A runbook is copied into the incident when it is declared, so later edits never rewrite instructions mid-incident.',
        category: 'history',
      },
      {
        id: 'OC-004',
        text: 'Resolving an incident needs recovery evidence and a summary, and every change is recorded in an attributed timeline.',
        category: 'evidence',
      },
      {
        id: 'OC-008',
        text: 'Incident records you write are never deleted automatically.',
        category: 'history',
      },
      {
        id: 'OC-021',
        text: 'A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused.',
        category: 'import',
      },
      {
        id: 'OC-022',
        text: 'A move-in can be undone, and edits you made afterwards are kept rather than overwritten.',
        category: 'undo',
      },
      {
        id: 'OC-011',
        text: 'Rotations hand over by wall-clock time in your named zone, and clock-change gaps show up as visible gaps.',
        category: 'schedule',
      },
      {
        id: 'OC-003',
        text: 'Viewers can only read, responders coordinate, and admins manage; alert-sending credentials grant no read access, and removed access stops on the next request.',
        category: 'access',
      },
    ],
    moveIn: ['Opsgenie (saved files)', 'PagerDuty (saved files)'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.3.0',
    contractUrl:
      'https://github.com/just-every/run-oncall/blob/main/CONTRACT.md',
    seoTitle: 'Oncall: free, open-source on-call and incident tool',
    seoDescription:
      'Oncall is a free, open-source tool for on-call rotas, incidents and runbooks that works beside your existing pager. Import from Opsgenie or PagerDuty.',
  },
  {
    slug: 'spool',
    summary:
      'Spool catches errors from your JavaScript, Python and Go apps, groups repeats into issues, and traces browser errors back to your original code. It can record a fix and tell you honestly whether the error came back. One owner can keep several projects separate.',
    does: [
      'Catch errors from JavaScript, Python and Go apps',
      'Group repeats into a single issue',
      'Trace browser errors back to the original source lines using your source maps',
      'Download an evidence packet to hand to someone fixing the issue',
      'Give an agent read-only access to a single project',
      'Show when a fixed error comes back in a later release',
      'Record a fix and see whether the error recurred, without Spool ever calling it fixed',
      'Get optional alerts for new issues, returning errors and spikes, and erase a whole project when you finish with it',
    ],
    promises: [
      {
        id: 'ERR-003',
        text: 'Error details are scrubbed before they are stored: no headers, cookies, request bodies or user identity are kept.',
        category: 'privacy',
      },
      {
        id: 'ERR-004',
        text: 'Owner sign-in, error sending and read-only agent access are separate, revoking one takes effect on the next request, and your private source maps are never public.',
        category: 'access',
      },
      {
        id: 'ERR-002',
        text: 'An error is only counted once it is fully saved, and a repeated send never counts twice.',
        category: 'reliability',
      },
      {
        id: 'ERR-006',
        text: "A resolved issue is flagged as returning only when it appears in a later release; an old release's error does not trigger a false alarm.",
        category: 'history',
      },
      {
        id: 'ERR-005',
        text: 'Source maps are matched by project, release and build; if a map is missing or wrong, the original frame is kept rather than guessed.',
        category: 'evidence',
      },
      {
        id: 'ERR-008',
        text: 'Counts of errors accepted and rejected are visible, Spool does not claim complete coverage, and a quiet period is never reported as proof an error is fixed.',
        category: 'evidence',
      },
      {
        id: 'ERR-007',
        text: 'The evidence packet is size-limited and clearly marks its contents as untrusted data; it never includes your source code.',
        category: 'evidence',
      },
      {
        id: 'ERR-009',
        text: 'Archives restore into an empty installation only after being checked, so a bad archive leaves nothing half-restored.',
        category: 'import',
      },
      {
        id: 'BASE-DATA-003',
        text: 'The owner can erase a whole project after a count-only preview and typed confirmation, and receives a receipt showing what was removed without personal values.',
        category: 'erasure',
      },
      {
        id: 'ERR-010',
        text: 'A new installation starts with no demo data.',
        category: 'other',
      },
    ],
    moveIn: ['Sentry (point your existing error reporting at Spool)'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.2.0',
    contractUrl:
      'https://github.com/just-every/run-spool/blob/main/CONTRACT.md',
    seoTitle: 'Spool: free, open-source alternative to Sentry',
    seoDescription:
      'Spool is a free, open-source error tracker for JavaScript, Python and Go apps with source maps and agent access. An alternative to Sentry, Bugsnag and Rollbar.',
  },
  {
    slug: 'beam',
    summary:
      'Beam is training for your own procedures. A reviewer publishes an approved procedure as a course, staff complete it, and managers can see who completed what, when and on what evidence.',
    does: [
      'Upload your procedures and media with proof you may use them',
      'Build courses with lessons, quizzes and optional practical assessments',
      'Have a named reviewer approve each course revision before staff see it',
      'Assign courses to people or teams with due dates in a named time zone',
      'Let staff resume lessons on any device and take quizzes',
      'Collect practical evidence for a named assessor to accept or return',
      'Record offline, instructor-attested training',
      'Issue numbered certificates and run reports on overdue and expiring training',
      'Flag courses for review when a source procedure changes',
    ],
    promises: [
      {
        id: 'BEAM-03',
        text: "A stale save is refused rather than merged, and only the course's named reviewer or the owner can publish it.",
        category: 'approval',
      },
      {
        id: 'BEAM-05',
        text: 'An assignment is tied to the exact published revision of the course.',
        category: 'history',
      },
      {
        id: 'BEAM-09',
        text: 'A completion is recorded only when every lesson is done and each required assessment is passed or accepted, tied to the exact revision.',
        category: 'evidence',
      },
      {
        id: 'BEAM-11',
        text: 'Certificates record your business as the issuer and state they are not an accreditation or a statement of competence.',
        category: 'evidence',
      },
      {
        id: 'BEAM-13',
        text: "A learner cannot read anyone else's assignments, attempts, evidence or certificates.",
        category: 'privacy',
      },
      {
        id: 'BEAM-08',
        text: 'Practical evidence can be read and decided only by the named assessor, and nothing completes before their decision.',
        category: 'approval',
      },
      {
        id: 'BEAM-18',
        text: 'Your own agent can only prepare drafts and plans; nothing reaches staff until a person approves it, and every decision is recorded.',
        category: 'ai',
      },
      {
        id: 'BEAM-19',
        text: "Answers to optional diagnostic questions are stored without the person's name or the time, and are shown only after the question closes with at least three answers.",
        category: 'privacy',
      },
      {
        id: 'BEAM-16',
        text: 'Export captures every record and file without sessions or credentials, and import refuses corrupt or non-empty targets.',
        category: 'export',
      },
    ],
    moveIn: ['TalentLMS (course list CSV and course report workbooks)'],
    runsOn:
      'your own computer; going live needs your own Cloudflare account and a verified email sender',
    version: 'v0.1.0',
    contractUrl: 'https://github.com/just-every/run-beam/blob/main/CONTRACT.md',
    seoTitle: 'Beam: free, open-source staff training tool',
    seoDescription:
      'Beam is a free, open-source tool to turn your own procedures into courses, track completions and issue certificates. Import from TalentLMS.',
  },
  {
    slug: 'chest',
    summary:
      'Chest is a private document library for the supplier, customer and project records a small business needs to keep. It keeps the original files, shows which version is approved, and controls who can see each collection.',
    does: [
      'Keep supplier, customer and project documents in collections',
      'Define your own document types with required fields',
      'Keep every uploaded version as an unchanged original',
      'Assign a reviewer to a specific version and record their approval or requested changes',
      'Track review dates and expiry dates with evidence of completion',
      'Grant read, edit or review access to people or groups',
      'Search titles, details and the text of plain-text files',
      'Preview PDFs and images in the browser',
      'Move deleted records to a trash that keeps every file and its history',
    ],
    promises: [
      {
        id: 'CHEST-07',
        text: 'Original versions never change; an approved version stays current while newer ones wait for review, and approving one never approves another.',
        category: 'history',
      },
      {
        id: 'CHEST-08',
        text: 'An approval is recorded against the exact version and needs the assigned reviewer, who must still have reviewer access.',
        category: 'approval',
      },
      {
        id: 'CHEST-03',
        text: 'A file is checked and safely stored before it appears in the library, so a failed upload never shows up.',
        category: 'reliability',
      },
      {
        id: 'CHEST-06',
        text: 'Lists, counts, search, previews, downloads and edits only show what the person currently has access to.',
        category: 'access',
      },
      {
        id: 'CHEST-10',
        text: "Removing someone's access takes effect everywhere right away.",
        category: 'access',
      },
      {
        id: 'CHEST-05',
        text: 'Web pages and SVG files are shown as plain text, never run as active content; unknown formats can only be downloaded.',
        category: 'security',
      },
      {
        id: 'CHEST-13',
        text: 'Trash keeps all files and history, every trash and restore is recorded, and nothing is destroyed automatically.',
        category: 'history',
      },
      {
        id: 'CHEST-11',
        text: 'An archive import previews first, applies only what was reviewed, and can be undone for untouched records.',
        category: 'import',
      },
      {
        id: 'CHEST-12',
        text: 'A full export restores into an empty installation with files, history and approvals intact, and never includes login credentials.',
        category: 'export',
      },
    ],
    moveIn: [
      'A JSON archive of your files, in the format described in the guide (chest-archive-1)',
    ],
    runsOn:
      'your own computer; going live needs your own hosting and email setup',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-chest/blob/main/CONTRACT.md',
    seoTitle: 'Chest: free, open-source private document library',
    seoDescription:
      'Chest is a free, open-source document library for supplier, customer and project records, with version approval and access control.',
  },
  {
    slug: 'coaster',
    summary:
      'Coaster runs employee expenses and reimbursements for one business. Employees submit claims with receipts, managers approve or return them, and finance turns approved claims into a reviewed payment batch and an accounting file. Coaster never moves money; you pay people outside it.',
    does: [
      'Submit claims with receipt photos or PDFs, mileage and per diem',
      'Split an expense across categories and cost centres',
      'Flag missing receipts, over-limit spending and possible duplicates, and require an explanation',
      "Route each claim to the employee's approving manager to approve, return or reject",
      'Gather approved claims into a reimbursement batch checked against a reconciled total',
      'Download an accounting CSV and a per-person reimbursements CSV',
      'Record the payment you made outside Coaster, with its reference and date',
      "Let a person's own agent prepare draft claims that only that person can accept",
      'Bring past Expensify reports in as read-only history',
    ],
    promises: [
      {
        id: 'COA-005',
        text: 'An exact duplicate expense can never be reimbursed twice.',
        category: 'money',
      },
      {
        id: 'COA-006',
        text: 'A manager decides the exact submitted version of a claim, and nobody can decide their own claim.',
        category: 'approval',
      },
      {
        id: 'COA-007',
        text: 'A returned claim is corrected and resubmitted, and earlier versions, receipts and decisions stay readable and cannot be changed.',
        category: 'history',
      },
      {
        id: 'COA-009',
        text: 'The accounting CSV and the reimbursements CSV each add up to the reviewed batch total.',
        category: 'money',
      },
      {
        id: 'COA-002',
        text: 'Every receipt keeps its exact original file, with a checksum, uploader and time.',
        category: 'evidence',
      },
      {
        id: 'COA-008',
        text: 'Employees, managers and finance each see only what their role allows, and drafts stay private to their author.',
        category: 'access',
      },
      {
        id: 'COA-010',
        text: 'An agent can only prepare drafts; it cannot submit, approve, batch or pay anything.',
        category: 'ai',
      },
      {
        id: 'COA-011',
        text: 'An Expensify move-in previews without writing, applies only what was previewed, and can be undone.',
        category: 'import',
      },
      {
        id: 'COA-012',
        text: 'A full export restores claims, receipts, decisions and history identically, and a corrupt archive is refused.',
        category: 'export',
      },
    ],
    moveIn: ['Expensify (report export CSV)'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-coaster/blob/main/CONTRACT.md',
    seoTitle: 'Coaster: free, open-source expense claims tool',
    seoDescription:
      'Coaster is a free, open-source expense claims tool with receipts, approvals and reimbursement batches. Import your history from Expensify.',
  },
  {
    slug: 'easel',
    summary:
      'Easel is financial planning for one company: a twelve-month plan, a locked budget, a downside scenario and a monthly review of actual results against plan. Your accounting system stays the record of posted figures.',
    does: [
      'Plan revenue, hiring, expenses and cash for the next twelve months',
      'Bring in actual results from a ledger CSV and reconcile every month',
      'Bring in an existing Excel budget as a scenario and compare it',
      'Ask each department to submit its budget, then approve and lock it',
      'Branch a downside scenario and compare it with the plan',
      'Let contributors suggest changes that finance can accept or decline',
      'Close each month and see actual versus budget with the rows behind every variance',
      'Publish a review pack, downloadable as HTML or CSV',
    ],
    promises: [
      {
        id: 'EASEL-006',
        text: 'Every number shows the arithmetic behind it; money is kept in whole cents and rounding is consistent.',
        category: 'evidence',
      },
      {
        id: 'EASEL-010',
        text: 'Approving the budget freezes it with a permanent record of exactly what was approved, by whom and when.',
        category: 'history',
      },
      {
        id: 'EASEL-007',
        text: "Individual salaries and positions are visible only to finance and that department's contributors; the server removes the detail for everyone else.",
        category: 'privacy',
      },
      {
        id: 'EASEL-003',
        text: 'Actuals are accepted only when every account and department is mapped and the reviewed preview still matches.',
        category: 'import',
      },
      {
        id: 'EASEL-004',
        text: 'An accepted actuals import can be undone exactly, unless a forecast month has already been closed.',
        category: 'undo',
      },
      {
        id: 'EASEL-012',
        text: 'A proposal is promoted only at the exact revision reviewed and only if the plan has not changed since.',
        category: 'approval',
      },
      {
        id: 'EASEL-013',
        text: 'Closing a month first keeps the forecast as it stood, so you can always compare against it.',
        category: 'history',
      },
      {
        id: 'EASEL-014',
        text: 'A published review pack is permanent, carries no individual pay detail, and every member, including viewers, can download it.',
        category: 'history',
      },
      {
        id: 'EASEL-016',
        text: 'A full export restores the same model, approvals and packs into an empty installation of the same release.',
        category: 'export',
      },
    ],
    moveIn: ['General-ledger CSV (actuals)', 'Excel planning workbook (.xlsx)'],
    runsOn: 'your own computer',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-easel/blob/main/CONTRACT.md',
    seoTitle: 'Easel: free, open-source budget and planning tool',
    seoDescription:
      'Easel is a free, open-source financial planning tool: twelve-month plan, locked budget, scenarios and monthly actual-versus-plan review.',
  },
  {
    slug: 'gasket',
    summary:
      "Gasket keeps the equipment a small team owns in service. It holds an asset register, preventive maintenance schedules, assigned work orders, inspections, parts and downtime, and a supervisor's review. It records what people did and never certifies equipment as safe.",
    does: [
      'Keep one register of assets with tags, locations, custodians and meters',
      'Schedule preventive work by calendar or by meter reading',
      'Create due work orders and assign them to maintainers',
      'Capture checklist results, photos, readings, parts used and downtime',
      'Have a supervisor approve or return finished work',
      'Track the parts list and reconcile physical counts',
      'See overdue work, assets down now, downtime and low stock',
      "Download an asset's full history as CSV",
      'Let an agent propose schedules, work orders and parts counts for a person to approve',
    ],
    promises: [
      {
        id: 'OPERATING-RULES',
        text: 'A new installation starts empty, with no sample assets, parts or schedules.',
        category: 'other',
      },
      {
        id: '2',
        text: 'Editing an asset keeps its earlier values, and retiring one keeps all of its history.',
        category: 'history',
      },
      {
        id: '4',
        text: 'A work order keeps the checklist revision it was created with, so later changes never alter issued work.',
        category: 'history',
      },
      {
        id: '7',
        text: "A meter reading lower than the asset's latest earlier reading is refused.",
        category: 'evidence',
      },
      {
        id: '3',
        text: 'Part stock never goes below zero, and a physical count records the exact difference without rewriting history.',
        category: 'history',
      },
      {
        id: '9',
        text: 'Nobody approves a work order they did the work on, and a supervisor approves the exact version they reviewed.',
        category: 'approval',
      },
      {
        id: '1',
        text: "Ending someone's access ends their sessions at once.",
        category: 'access',
      },
      {
        id: '12',
        text: 'A MaintainX move-in shows a dry run first, applies only what was reviewed, adds nothing if repeated, and can be undone.',
        category: 'import',
      },
      {
        id: '13',
        text: 'An agent can only prepare proposals; a person other than its preparer approves them, and the approval is refused if the records it relied on have changed.',
        category: 'ai',
      },
    ],
    moveIn: ['MaintainX (asset, parts and meter-reading CSV exports)'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-gasket/blob/main/CONTRACT.md',
    seoTitle: 'Gasket: free, open-source equipment maintenance tool',
    seoDescription:
      'Gasket is a free, open-source maintenance tool: asset register, preventive schedules, work orders and downtime. Import from MaintainX.',
  },
  {
    slug: 'gauge',
    summary:
      'Gauge is for owner-led design, marketing and software agencies of about 5 to 40 people. It keeps engagements and agreed terms, rates, capacity, time and expense approval, project economics and billing preparation in your own workspace.',
    does: [
      'Set up clients, engagements, scope, tasks and milestones',
      'Agree hourly or fixed-fee terms and add change orders as new versions',
      'Record time with a timer or manual entries, and submit it for approval',
      'Record expenses with receipts and have a lead approve them',
      "See next month's capacity, leave and staffing conflicts",
      'Compare agreed budget with approved actual time and cost',
      'Prepare billing packets from approved work and download each once',
      "Review the week's exceptions in one place",
      'Let an agent prepare drafts and proposals that the right person approves',
    ],
    promises: [
      {
        id: 'BUDGET-001',
        text: 'Approved terms cannot be changed; a change order is a new version beside them.',
        category: 'history',
      },
      {
        id: 'RATE-001',
        text: 'Rates are kept by effective date, so adding a new rate never rewrites past work, and rates stay private to finance.',
        category: 'privacy',
      },
      {
        id: 'TIME-001',
        text: 'Overlapping time entries and a second running timer are refused.',
        category: 'reliability',
      },
      {
        id: 'TIME-002',
        text: 'Approved time is reopened only through an audited correction.',
        category: 'history',
      },
      {
        id: 'BILLING-001',
        text: 'The same approved work can never be reserved for two billing packets.',
        category: 'money',
      },
      {
        id: 'BILLING-002',
        text: 'An approved billing packet is fixed, repeated downloads return identical files, and corrections are separate adjustment packets.',
        category: 'money',
      },
      {
        id: 'ACCESS-001',
        text: 'Staff see only their own work, and private costs and rates stay with finance; revoking access takes effect on the next request.',
        category: 'access',
      },
      {
        id: 'AGENT-003',
        text: 'An agent proposing billing lines never sees amounts, and finance approves before anything is drafted.',
        category: 'ai',
      },
      {
        id: 'MOVE-001',
        text: 'A Harvest move-in previews first, can be rolled back, adds no duplicates when repeated, and refuses to undo records you have edited.',
        category: 'import',
      },
      {
        id: 'OPERATING-RULES',
        text: 'Repeating the same save never creates a duplicate; reusing its key for different work is refused.',
        category: 'reliability',
      },
    ],
    moveIn: [
      'Harvest (exported time, client, project and people files, plus an optional Forecast schedule)',
    ],
    runsOn: 'your own computer',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-gauge/blob/main/CONTRACT.md',
    seoTitle: 'Gauge: free, open-source agency time and billing tool',
    seoDescription:
      'Gauge is a free, open-source tool for agencies: engagements, time, expenses, capacity and billing packets. Import from Harvest.',
  },
  {
    slug: 'glove',
    summary:
      'Glove is for the owner or dispatcher of an Australian trade business with 2 to 10 technicians (heating and cooling, plumbing, electrical or recurring commercial service). It turns a customer-approved quote into a booked visit, lets technicians record the job on a phone even when the signal drops, and prepares the invoice for your own accounting system.',
    does: [
      'Turn a customer-approved quote into a booked and assigned visit',
      "Let technicians record arrival, checklist, notes, photos, materials and the customer's signature on a phone, even through a lost signal",
      'Show each technician only the visits assigned to them, without prices',
      'Refuse a booking that overlaps another visit for the same technician until the dispatcher reviews the conflict',
      "Prepare, approve and export invoices as a CSV in Xero's sales-invoice format, with a correction trail",
      'Let an agent prepare quotes, dispatch proposals and invoices for a person to approve',
      'Keep a full timeline of every job, and download the whole business as JSON',
      'Bring in customers, staff and job history from ServiceM8',
    ],
    promises: [
      {
        id: 'GLOVE-03',
        text: 'A person approves the exact price of one quote revision; any price change is a new revision that needs its own approval, and earlier ones stay on the record.',
        category: 'approval',
      },
      {
        id: 'GLOVE-04',
        text: "A quote marked as sent is only a person's statement of what they did, never a claim of delivery, and the customer's acceptance or decline is recorded with who answered, how and who recorded it.",
        category: 'evidence',
      },
      {
        id: 'GLOVE-05',
        text: 'A booking that overlaps another visit for the same technician is refused until the dispatcher reviews those exact conflicts and confirms.',
        category: 'schedule',
      },
      {
        id: 'GLOVE-06',
        text: 'Field notes, photos and checklist results are kept on the phone until the server confirms them, and resending after a lost signal lands each one exactly once.',
        category: 'reliability',
      },
      {
        id: 'GLOVE-07',
        text: "Changing a visit's technician or time needs a reason and keeps the before and after; evidence that arrives late is kept and flagged for the dispatcher.",
        category: 'history',
      },
      {
        id: 'GLOVE-08',
        text: "A job is completed only when every required checklist item is done or marked not applicable with a reason, with the customer's drawn signature or the reason they could not sign.",
        category: 'evidence',
      },
      {
        id: 'GLOVE-09',
        text: 'An exported invoice is never changed; a correction is a new approved revision that exports as its own numbered row.',
        category: 'history',
      },
      {
        id: 'GLOVE-10',
        text: "An agent can prepare quote drafts, dispatch proposals and invoice drafts, but can never approve, decide its own work or perform a person's step.",
        category: 'ai',
      },
      {
        id: 'GLOVE-11',
        text: 'Moving in from ServiceM8 shows a dry-run preview first, keeps every original ID and file, writes nothing when repeated unchanged, and can be undone.',
        category: 'import',
      },
      {
        id: 'GLOVE-12',
        text: 'Every job shows who did each step, in which role; the whole installation can be exported and restored into a fresh one.',
        category: 'export',
      },
    ],
    moveIn: ['ServiceM8'],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-glove/blob/main/CONTRACT.md',
    seoTitle: 'Glove: free, open-source alternative to ServiceM8',
    seoDescription:
      'Glove is free, open-source job scheduling and invoicing for small Australian trade businesses: quotes, dispatch, phone job capture and Xero-ready invoices.',
  },
  {
    slug: 'larder',
    summary:
      "Larder runs the operations of a small maker of about 5 to 50 people: what can be promised, what must be bought or made, what actually moved, and what needs a person today. It carries one confirmed order through reserved stock, purchase or production, partial shipment and a handoff to your accountant's own ledger.",
    does: [
      'Show on hand, reserved, quarantine, expected and available-to-promise stock for every item',
      'Reserve stock for confirmed orders so two orders can never take the same stock',
      'Work out shortages and draft purchase orders or work orders',
      'Receive purchases in part, with supplier lots and a quarantine hold',
      'Record production with materials used, scrap and cost variance',
      'Pick, pack and ship part of an order',
      'Prepare a CSV handoff of stock movements for your accountant and check it against their references',
      'Keep one queue of shortages, overdue purchases, quarantine and waiting approvals',
      'Bring in items, BOMs, stock and orders from Odoo',
    ],
    promises: [
      {
        id: 'LARDER-003',
        text: 'Releasing work pins the bill of materials version in force; a later revision does not change work already released.',
        category: 'history',
      },
      {
        id: 'LARDER-005',
        text: 'Confirming or reserving takes only available stock, and a retried command returns its first outcome rather than doing it twice.',
        category: 'reliability',
      },
      {
        id: 'LARDER-007',
        text: 'A buyer or manager approves a purchase order with its exact terms and cash exposure recorded.',
        category: 'approval',
      },
      {
        id: 'LARDER-008',
        text: 'Over-receipt is refused, and held stock stays in quarantine until a recorded release or rejection decision.',
        category: 'evidence',
      },
      {
        id: 'LARDER-011',
        text: "A count by one person needs another person's approval before stock is adjusted (the owner may approve their own), and reversals are refused while later work depends on the stock.",
        category: 'approval',
      },
      {
        id: 'LARDER-012',
        text: 'Accountant handoff batches are fixed once prepared, download as CSV, and show mismatches until corrected; Larder never posts journals.',
        category: 'money',
      },
      {
        id: 'LARDER-013',
        text: 'The owner can export a complete archive with a checksum and restore it into an empty installation, with every stock position checked against the archive.',
        category: 'export',
      },
      {
        id: 'LARDER-015',
        text: 'An agent can prepare orders, purchases, merges, reschedules and reconciliations, but a person with authority approves the exact version, and stale inputs are refused.',
        category: 'ai',
      },
      {
        id: 'LARDER-016',
        text: 'Moving in from Odoo shows a dry run with every rejected row first, keeps the original files, and can be undone until later work depends on it.',
        category: 'import',
      },
      {
        id: '',
        text: 'Stock is never edited: corrections are new entries pointing at the original, and the database itself refuses stock that would go below zero or be over-reserved.',
        category: 'history',
      },
      {
        id: '',
        text: 'Larder starts empty and does not file tax, run payroll, post journals or claim regulated traceability.',
        category: 'other',
      },
    ],
    moveIn: ['Odoo (CSV exports)'],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-larder/blob/main/CONTRACT.md',
    seoTitle: 'Larder: free, open-source alternative to Odoo for makers',
    seoDescription:
      'Larder is free, open-source stock, purchasing and production software for small makers, with reserved stock, partial shipments and an accountant handoff.',
  },
  {
    slug: 'linen',
    summary:
      'Linen is an IT service desk for employees. People ask in their own words, in one conversation per request, and Linen does the routine work and checks it worked. The service team sees only the choices that need a person, in a Needs your decision view.',
    does: [
      'Ask for help or access in your own words, or choose a known service from the catalogue, and follow one conversation per request',
      'See in each conversation what is ready, what remains and who owns the next step, and say when something is still not working',
      'Keep private notes for the service team beside shared replies, with controls to assign, pause and close',
      'Decide the choices that need a person in a Needs your decision view: choose an option, defer or reject, with your reason recorded',
      'Record people joining, moving and leaving, with access and devices followed separately to the end',
      'Keep a register of devices and who holds them, and record each physical handoff',
      'Connect Microsoft identity and licences, your existing desk, a reasoning model and email delivery, and review what Linen finds',
      'Grant exactly who or what may act, for which service, for how long and how many times',
      'Move in from Freshservice through a connection or saved files, run both desks side by side, and back up and restore everything as one archive',
    ],
    promises: [
      {
        id: 'A1',
        text: 'Private notes stay hidden from employees without service-team access, and imported requests are visible only to the person who made them and to owners.',
        category: 'privacy',
      },
      {
        id: 'A2',
        text: 'Linen acts only where you have granted it. Permissions are checked again at the moment it acts, every grant has an end, and an approval never widens what Linen may do.',
        category: 'access',
      },
      {
        id: 'E2',
        text: 'Silence never counts as approval: a choice stays open, with its exposure and next date visible, until a person decides.',
        category: 'approval',
      },
      {
        id: 'A4',
        text: 'Work is shown as verified only on independent evidence, and closing a conversation is never treated as proof that work was restored.',
        category: 'evidence',
      },
      {
        id: 'E4',
        text: 'A physical handoff is never marked done on its own: a device delivery shows its next owner until a person records the handoff.',
        category: 'evidence',
      },
      {
        id: 'A7',
        text: 'Connecting a service lets Linen read facts and never grants permission to act. Credentials are encrypted and never shown again.',
        category: 'security',
      },
      {
        id: 'E1',
        text: 'Cancelling a request records your cancellation and never claims that something already done has been undone.',
        category: 'undo',
      },
      {
        id: 'A6',
        text: 'A Freshservice move-in shows what will and will not come across before anything is adopted, arrives paused and restricted, and never acts on its own.',
        category: 'import',
      },
      {
        id: 'A3',
        text: 'A backup holds your workspace, people, requests, conversations, attachments and history, leaves out sessions and stored credentials, and restores only into an empty installation. Work that was in flight comes back held until an owner checks what really happened, and Linen never repeats an action on its own.',
        category: 'export',
      },
    ],
    moveIn: [
      'Freshservice (a live connection or saved ticket and conversation files)',
    ],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-linen/blob/main/CONTRACT.md',
    seoTitle: 'Linen: free, open-source alternative to Freshservice',
    seoDescription:
      'Linen is a free, open-source IT service desk: ask in your own words, follow one conversation per request, and decide only the choices that need a person.',
  },
  {
    slug: 'locket',
    summary:
      "Locket keeps a small business's commercial agreements from request to renewal, for a 10 to 100 person Australian service business or small supplier. It tracks approved templates, negotiated versions, approvals tied to the exact version, signed files from the signing service you already use, obligations and renewal notice deadlines.",
    does: [
      'Capture agreement requests with counterparty, value, dates and required attachments',
      'Build agreements from approved templates and a clause playbook',
      'Keep negotiation versions and compare any two line by line',
      'Record review findings that quote the exact passage',
      'Require approval of the exact version before signing',
      'Prepare a signature-ready file for the signing service you already use and check the signed copy when it comes back',
      'Track key terms, obligations and renewal notice deadlines',
      'Let an agent prepare intake, reviews, terms and renewal notices for a person to approve',
      'Search, export and restore everything, and bring in a DocuSign archive',
    ],
    promises: [
      {
        id: '',
        text: "Uploaded, signed and imported files keep their exact bytes and fingerprint; Locket never rewrites an original or creates a certificate in a provider's name.",
        category: 'evidence',
      },
      {
        id: '',
        text: 'An approval is tied to the exact version and decision context; any change makes earlier approvals stop counting, visibly.',
        category: 'approval',
      },
      {
        id: '',
        text: 'A restricted agreement and everything attached to it is invisible to anyone not given access, including in search.',
        category: 'privacy',
      },
      {
        id: '',
        text: 'Terms proposed by an agent or an importer drive nothing until a person with authority confirms them against the signed text.',
        category: 'ai',
      },
      {
        id: '',
        text: "A renewal notice deadline is the end of that day in the agreement's time zone, correct across daylight-saving changes.",
        category: 'schedule',
      },
      {
        id: '',
        text: 'An approved notice is not treated as sent; sending is recorded separately with method, time and optional evidence.',
        category: 'evidence',
      },
      {
        id: '',
        text: 'A signed file whose envelope, signers or certificate do not match the handoff stays unsigned until the owner or counsel accepts it with a reason.',
        category: 'evidence',
      },
      {
        id: '',
        text: 'Requesters cannot approve their own request unless they are the owner, and nobody can decide an agent proposal they prepared (the owner excepted).',
        category: 'approval',
      },
      {
        id: '',
        text: 'A DocuSign move-in shows a dry run first, keeps the signed files and certificates unchanged, and can be undone until an imported agreement is used.',
        category: 'import',
      },
      {
        id: '',
        text: 'Locket organises and prepares agreements; it does not give legal advice or claim any agreement is valid or enforceable.',
        category: 'other',
      },
    ],
    moveIn: [
      'DocuSign archive (Envelope Report CSV plus signed PDFs and certificates)',
    ],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-locket/blob/main/CONTRACT.md',
    seoTitle: 'Locket: free, open-source alternative to contract tools',
    seoDescription:
      'Locket is free, open-source contract management for small businesses: templates, versions, approvals, signed files, obligations and renewal deadlines.',
  },
  {
    slug: 'lodge',
    summary:
      'Lodge is a hiring workspace for one US employer, from an approved vacancy to a recorded offer decision. It handles applications, interviews, scorecards against an agreed rubric, approved offers and the deletion of candidate data under your own policy. It makes no hiring decision, ranks no one and sends no message.',
    does: [
      'Create vacancies with pay range and headcount approval before publishing',
      'Agree stages, interview plan and a job-related rubric before anyone is evaluated',
      'Publish an accessible application page that records the privacy notice and gives a receipt',
      'Track candidates, files, source, consent and retention dates',
      'Plan interviews, collect availability and download calendar invitations',
      'Collect independent scorecards that colleagues cannot see until feedback is released',
      'Approve candidate messages and offers, and export an HR handoff',
      'Let a coding agent prepare work that a named person approves',
      'Handle legal holds, deletion and candidate access requests, and bring in a Workable export',
    ],
    promises: [
      {
        id: 'LDG-001',
        text: 'Publishing a vacancy needs approval of its exact pay range and headcount; any later change makes the approval stale until it is approved again.',
        category: 'approval',
      },
      {
        id: 'LDG-003',
        text: 'The application page works without JavaScript, shows the privacy notice and accommodation contact, and refuses a submission made against an older notice.',
        category: 'privacy',
      },
      {
        id: 'LDG-005',
        text: 'Possible duplicate candidates are listed with reasons, and nothing is merged until a person decides, with a reason.',
        category: 'approval',
      },
      {
        id: 'LDG-006',
        text: 'Interviewers see only the applications they are assigned to, without contact details or restricted documents, in every screen, search, download and export.',
        category: 'access',
      },
      {
        id: 'LDG-007',
        text: 'Moving an application between stages needs a reason and leaves a readable history.',
        category: 'history',
      },
      {
        id: 'LDG-009',
        text: 'Each interviewer submits their own scorecard, which is final once submitted and hidden from colleagues until the manager releases feedback.',
        category: 'privacy',
      },
      {
        id: 'LDG-010',
        text: 'Candidate messages are approved as exact text and downloaded marked unsent; Lodge sends nothing itself.',
        category: 'approval',
      },
      {
        id: 'LDG-012',
        text: 'Legal holds block deletion, and deleting a candidate removes their records, document files and related proposals, leaving a receipt without personal data.',
        category: 'erasure',
      },
      {
        id: 'LDG-013',
        text: 'A coding agent can only propose, for one named person, and nothing applies until that person approves and the records are unchanged.',
        category: 'ai',
      },
      {
        id: 'LDG-014',
        text: 'Moving in from Workable shows a dry-run preview first, keeps the original files, and can be undone; imported people get no access and no permission to contact.',
        category: 'import',
      },
      {
        id: 'LDG-016',
        text: "Every private page checks the person's live sign-in and saved role, so deactivating a member removes their access at once.",
        category: 'security',
      },
    ],
    moveIn: ['Workable (full data export ZIP)'],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-lodge/blob/main/CONTRACT.md',
    seoTitle: 'Lodge: free, open-source alternative to Workable',
    seoDescription:
      'Lodge is free, open-source hiring software for one business: vacancies, applications, interviews, scorecards and offers, with privacy built in.',
  },
  {
    slug: 'nectar',
    summary:
      'Nectar is subscription billing for a US business that sells monthly software or services plans, seats and simple metered usage. It turns agreed subscriptions and recorded usage into invoices you can explain line by line, then tracks credits, payments and overdue follow-up. It never collects payments or sends anything for you.',
    does: [
      'Keep customers, billing contacts and a versioned catalogue of plans, seats and metered prices',
      'Start subscriptions with trials, billing days and contract exceptions that a person approves',
      'Import usage from CSV or an agent credential, with duplicates ignored',
      'Preview plan and seat changes with their proration before they take effect',
      'Draft a monthly bill run and compare it with the previous one',
      'Approve and issue numbered invoices',
      'Issue credit notes and record payments received elsewhere',
      'Show ageing and prepare overdue reminders for a person to send',
      'Export invoices, usage and whole bill runs, and bring in customers and subscriptions from Stripe Billing',
    ],
    promises: [
      {
        id: 'NEC-07',
        text: 'Billing is repeatable: the same recorded inputs always produce the same invoice lines.',
        category: 'reliability',
      },
      {
        id: 'NEC-10',
        text: 'Approving a draft is tied to its exact inputs; if usage, a price, a contract exception or the tax setting changes, the approval no longer holds and the invoice is not issued.',
        category: 'approval',
      },
      {
        id: 'NEC-05',
        text: 'A usage event with an id already recorded changes nothing, so usage is never billed twice.',
        category: 'reliability',
      },
      {
        id: '',
        text: 'Each subscription period is invoiced at most once, with sequential invoice numbers; issued invoices, payments and the audit trail are never edited, and corrections are new records.',
        category: 'history',
      },
      {
        id: 'NEC-11',
        text: 'A credit note can never exceed what an invoice still owes, and a payment can never be applied beyond its unallocated amount.',
        category: 'money',
      },
      {
        id: 'NEC-12',
        text: 'A reminder is approved as exact recipient and wording, and downloads as a message you send from your own mail.',
        category: 'approval',
      },
      {
        id: 'NEC-14',
        text: 'An agent can prepare proposals such as contract terms or price changes, but people decide, Nectar computes the invoices itself, and its credentials can be revoked.',
        category: 'ai',
      },
      {
        id: 'NEC-15',
        text: "Only the owner changes business settings, tax policy, access or credentials, and every page, form, API call and download checks the person's role.",
        category: 'access',
      },
      {
        id: 'NEC-16',
        text: 'Subscriptions moved in from Stripe stay in shadow and bill nothing until you adopt each one, and the move-in can be undone while untouched.',
        category: 'import',
      },
      {
        id: '',
        text: 'Nectar never collects a payment, holds card details or sends an invoice or reminder.',
        category: 'money',
      },
    ],
    moveIn: ['Stripe Billing'],
    runsOn:
      'Your own Cloudflare account; a local copy on your computer to try it',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-nectar/blob/main/CONTRACT.md',
    seoTitle: 'Nectar: free, open-source alternative to Stripe Billing',
    seoDescription:
      'Nectar is free, open-source subscription billing for US B2B businesses: plans, seats, usage, invoices, credits and overdue follow-up.',
  },
  {
    slug: 'pantry',
    summary:
      'Pantry keeps the books of one US service business: an accrual ledger kept by the owner, a bookkeeper and an outside accountant. It reconciles to bank statements, closes each month and hands over an accountant package. Your own agent can prepare matches, entries and close work, and a person approves each one.',
    does: [
      'Set up the business, a chart of accounts and opening balances',
      'Keep customers, vendors and source documents exactly as uploaded',
      'Issue invoices and credits, and record bills with their documents',
      'Record payments made outside Pantry and apply them to invoices and bills',
      'Import bank statements in CSV or OFX and match them to the ledger',
      'Reconcile each bank account and close and lock each month',
      'Run trial balance, general ledger, profit and loss, balance sheet and ageing reports',
      'Download an accountant package, and bring in a QuickBooks Online cutover',
    ],
    promises: [
      {
        id: 'PAN-02',
        text: 'Opening balances are a balanced draft that a second person posts.',
        category: 'approval',
      },
      {
        id: 'PAN-06',
        text: 'Pantry records payments but never moves money.',
        category: 'money',
      },
      {
        id: 'PAN-07',
        text: 'Re-importing the same bank statement adds nothing, and an overlapping download adds only new lines.',
        category: 'reliability',
      },
      {
        id: 'PAN-09',
        text: 'A statement reconciles only when every line is matched and the ledger balance, less items not yet on a statement, equals the closing balance.',
        category: 'evidence',
      },
      {
        id: 'PAN-10',
        text: 'Someone other than the preparer posts a manual journal, and only the exact revision they reviewed (the owner excepted).',
        category: 'approval',
      },
      {
        id: 'PAN-11',
        text: 'A posted entry is never changed or deleted; it is corrected by a dated reversal linked both ways.',
        category: 'history',
      },
      {
        id: 'PAN-12',
        text: 'Every report is calculated from posted lines, never from a typed-in total.',
        category: 'evidence',
      },
      {
        id: 'PAN-13',
        text: 'A locked month refuses new postings, payments, matches and agent proposals until a reopening request is approved by someone else holding that grant.',
        category: 'approval',
      },
      {
        id: 'PAN-15',
        text: 'An agent files proposals only, and each is approved by a person before it affects the books.',
        category: 'ai',
      },
      {
        id: 'PAN-16',
        text: 'Moving in from QuickBooks Online shows a dry run with refused rows and balance checks before anything is written, and can be undone until the accountant signs off and the opening entry is posted.',
        category: 'import',
      },
    ],
    moveIn: ['QuickBooks Online (seven report exports as CSV)'],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-pantry/blob/main/CONTRACT.md',
    seoTitle: 'Pantry: free, open-source alternative to QuickBooks',
    seoDescription:
      'Pantry is free, open-source accounting for one US service business: invoices, bills, bank reconciliation, month-end close and an accountant package.',
  },
  {
    slug: 'pier',
    summary:
      'Pier is stock and wholesale-order software for small US finished-goods wholesalers who buy goods and sell to known business customers. It answers what can be promised, what must be bought and why a physical count differs from the record, without an ERP project.',
    does: [
      'Define items with barcodes, units and pack sizes, and warehouse bins',
      'Keep supplier terms such as price, minimum order and lead time',
      'Take sales orders and reserve stock, showing backorders for unmet demand',
      'Draft and approve supplier purchase orders',
      'Receive purchases in part into named bins, and correct a receipt against a physical count',
      'Transfer stock between locations through a transit location',
      'Dispatch part of an order and handle returns through quarantine',
      'Reconcile physical counts, trace any balance, and import opening stock from its own CSV format',
    ],
    promises: [
      {
        id: 'PIER-004',
        text: 'Pier never reserves the same unit twice or allows negative sellable stock; quarantine, transit and expected receipts are never sellable.',
        category: 'reliability',
      },
      {
        id: 'PIER-005',
        text: 'A purchase approval names the exact supplier, quantity, price and promise date, a change makes it unusable until approved again, and an agent cannot approve its own purchase.',
        category: 'approval',
      },
      {
        id: 'PIER-006',
        text: 'A purchase receipt posts once or not at all; one bad line leaves every line unchanged, and the remainder stays expected.',
        category: 'reliability',
      },
      {
        id: 'PIER-007',
        text: 'Stock changes are only ever added as movements; a correction is a linked compensating movement, never an edit.',
        category: 'history',
      },
      {
        id: 'PIER-009',
        text: "A partial shipment can only use that order's own reservations, and a retry never reduces stock twice.",
        category: 'reliability',
      },
      {
        id: 'PIER-010',
        text: 'A returned item goes to quarantine and becomes sellable only after a separately reviewed restock, and a return cannot exceed what was shipped.',
        category: 'evidence',
      },
      {
        id: 'PIER-011',
        text: 'If stock moves after a count is taken, the old count cannot overwrite it.',
        category: 'evidence',
      },
      {
        id: 'PIER-003',
        text: 'An opening-stock import is previewed and reviewed first, repeats add nothing, and undo is refused once later work depends on it.',
        category: 'import',
      },
      {
        id: 'PIER-012',
        text: 'The whole installation can be exported and restored into a fresh one without posting opening stock twice, and people sign in afresh afterwards.',
        category: 'export',
      },
      {
        id: 'AGENT-001',
        text: 'Agents can prepare purchases and reallocations with evidence, but a person approves them.',
        category: 'ai',
      },
    ],
    moveIn: ["Pier's own CSV format"],
    runsOn:
      'Your own computer to try it; deploys to an owner-configured Cloudflare target when you choose',
    version: 'v0.1.0',
    contractUrl: 'https://github.com/just-every/run-pier/blob/main/CONTRACT.md',
    seoTitle: 'Pier: free, open-source stock and wholesale orders',
    seoDescription:
      'Pier is free, open-source stock and order software for small wholesalers: reservations, purchasing, part shipments and count reconciliation.',
  },
  {
    slug: 'purse',
    summary:
      'Purse is a purchasing workspace for one business buying from known suppliers. It follows a purchase from request through approval of the exact revision, purchase order, partial receiving and invoice evidence handed to accounting. It makes no payments and posts nothing to accounts.',
    does: [
      'Keep suppliers with contacts, documents, agreements and blocked or preferred reasons',
      'Copy approved catalogue prices into purchase requests',
      'Compare supplier quotations side by side',
      'Route requests for approval by amount, category and project, with delegation',
      'Convert approved requests into numbered purchase orders with downloadable documents',
      'Record partial receipts, service milestones, returns and cancellations',
      'Record supplier invoices and export accounting CSV',
      'Prepare drafts for people to edit, and bring in purchasing history from CSV',
    ],
    promises: [
      {
        id: 'PUR-003',
        text: 'Changing the catalogue later does not change the terms of an approved request.',
        category: 'history',
      },
      {
        id: 'PUR-006',
        text: 'Approval applies to the exact request revision, nobody can approve their own request, and concurrent requests cannot overspend a budget.',
        category: 'approval',
      },
      {
        id: 'PUR-007',
        text: 'Every approve, reject or return decision keeps its reason, person, time and revision, and delegation expires.',
        category: 'history',
      },
      {
        id: 'PUR-009',
        text: 'Generating a purchase order document is separate from authorised issuing, and an amendment needs renewed approval before it is issued.',
        category: 'approval',
      },
      {
        id: 'PUR-010',
        text: 'Over-receipt, repeat returns and actions by the wrong role are refused.',
        category: 'reliability',
      },
      {
        id: 'PUR-011',
        text: 'An invoice is recorded once per supplier and reference, conflicting evidence is refused for review, and the accounting export happens once without posting or payment.',
        category: 'money',
      },
      {
        id: 'PUR-012',
        text: 'A full archive can be restored with decisions, files and import history intact, and a corrupt archive fails without partial changes.',
        category: 'export',
      },
      {
        id: 'PUR-013',
        text: 'Importing history previews first, can be undone, and imported approvals never grant purchasing authority.',
        category: 'import',
      },
      {
        id: 'PUR-014',
        text: 'Preparation drafts show missing fields and sources, and nothing is sent or binding without a person.',
        category: 'ai',
      },
      {
        id: 'PUR-017',
        text: 'Every page and download checks the live sign-in, role and business; forged roles or totals cannot authorise anything.',
        category: 'security',
      },
    ],
    moveIn: ["Procurify-shaped CSV in Purse's documented format"],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-purse/blob/main/CONTRACT.md',
    seoTitle: 'Purse: free, open-source alternative to Procurify',
    seoDescription:
      'Purse is free, open-source purchasing for one business: requests, approvals, purchase orders, partial receiving and invoice evidence.',
  },
  {
    slug: 'willow',
    summary:
      "Willow keeps one employer's people register, employment history, leave ledger and joiner, mover and leaver work, for an employer of about 20 to 200 people with an existing payroll provider. It hands accurate changes to the payroll provider you already use. Optional connections add email notices, sign-in through your identity provider and checklist drafts.",
    does: [
      'Register people separately from their employment periods, with dated changes to title, pay, manager and location',
      'Run joiner, mover and leaver checklists from versioned templates',
      'Keep private documents with categories that control who can read them',
      "Run leave policies, balances and requests calculated in hours from each person's schedule",
      'Show who else on the team is away when someone requests leave',
      'Prepare payroll change batches for each pay period, with exceptions listed',
      "Export them as a payroll file with columns you map yourself, or in ADP's time-sheet import layout",
      'Report headcount, starters, leavers and leave taken, and bring in people from BambooHR',
    ],
    promises: [
      {
        id: 'WIL-01',
        text: "Every permission is explicit and set only by the owner, and ending someone's access ends every session without restoring permissions if access is given again.",
        category: 'access',
      },
      {
        id: 'WIL-02',
        text: 'HR can preview exactly what another member would see about a person, with unreadable values reported as withheld.',
        category: 'privacy',
      },
      {
        id: 'WIL-03',
        text: 'Without the grant, nobody can read private contact details, pay, confidential absence reasons or restricted documents through any page, download or export, and reads of private details are audited.',
        category: 'privacy',
      },
      {
        id: 'WIL-07',
        text: 'A change of terms is a new version effective from a date; past versions stay, and a version can be cancelled but never edited.',
        category: 'history',
      },
      {
        id: 'WIL-10',
        text: 'The leave ledger only ever grows, and concurrent requests cannot spend the same hours.',
        category: 'reliability',
      },
      {
        id: 'WIL-11',
        text: 'Payroll change batches list every start, end, terms change and approved leave not yet handed off, hand each change off exactly once, and show changes without a provider identifier as exceptions.',
        category: 'money',
      },
      {
        id: 'WIL-12',
        text: 'A departure cannot be marked complete while account and device tasks remain open without recorded evidence.',
        category: 'evidence',
      },
      {
        id: 'WIL-15',
        text: 'Agent-prepared joiner or mover changes show the exact diff, and HR approves the plan before anything runs.',
        category: 'ai',
      },
      {
        id: 'WIL-16',
        text: 'Moving in from BambooHR shows a dry run first, keeps the original files, and can be undone while untouched.',
        category: 'import',
      },
      {
        id: 'WIL-18',
        text: 'Email notices are off until the owner enables them, and carry no names, pay, private documents or confidential absence details.',
        category: 'alerts',
      },
      {
        id: 'WIL-19',
        text: 'Sign-in through your own identity provider is optional, and a provider failure or unlinking leaves email sign-in available.',
        category: 'access',
      },
    ],
    moveIn: ['BambooHR (employee report, time-off balances and documents)'],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl:
      'https://github.com/just-every/run-willow/blob/main/CONTRACT.md',
    seoTitle: 'Willow: free, open-source alternative to BambooHR',
    seoDescription:
      'Willow is free, open-source HR for one employer: people register, leave, joiner and leaver checklists and payroll change handoff.',
  },
  {
    slug: 'auth',
    summary:
      "Auth is an owner-run sign-in service for your team, using email links and passkeys. It keeps a directory of people, lets compatible apps and your company's other apps sign people in, and can create and remove their accounts in those apps automatically. It is free, MIT-licensed and open source",
    does: [
      'Sign people in with email links and passkeys',
      'Keep a directory of people, sign-in methods and activity',
      'Link compatible apps so one sign-in works across them',
      "Connect your company's other apps by SAML or OpenID Connect, and give access by person or group",
      'Create, update and switch off accounts in apps that support SCIM, and show when each change was confirmed',
      'Send signed event notifications to a web address you choose',
      "Recover accounts with another administrator's approval, a 72-hour delay, or a local emergency token",
      'Sign people out of every linked app at once',
      'Let an agent prepare administration changes for an administrator to approve',
      'Export and restore the whole installation, and stage a user list from Google Workspace, Microsoft Entra, Auth0, Okta or JumpCloud for review',
    ],
    promises: [
      {
        id: 'AUTH-HOST-001',
        text: "The host you choose owns sign-in and passkeys; changing it is a provider move that needs each app's owner to approve re-linking.",
        category: 'access',
      },
      {
        id: 'AUTH-PRIVACY-001',
        text: "Auth shares each person's email and name with the apps they use.",
        category: 'privacy',
      },
      {
        id: 'AUTH-IDENTITY-001',
        text: 'Email-link proof completes only in the browser that asked for it, and administration needs a hardware passkey plus a fresh email confirmation.',
        category: 'security',
      },
      {
        id: 'AUTH-IDENTITY-001',
        text: "Recovery requires another administrator's approval, a cancellable notified 72-hour delay, or the local emergency recovery token.",
        category: 'access',
      },
      {
        id: 'AUTH-PROTOCOL-001',
        text: "Access tokens are short-lived, last at most five minutes, and work only for reading the person's own identity details.",
        category: 'security',
      },
      {
        id: 'AUTH-SAML-001',
        text: 'A company app gets a sign-in only for people assigned to it; forged, replayed, stale or misaddressed requests are refused.',
        category: 'access',
      },
      {
        id: 'AUTH-SCIM-001',
        text: 'Account changes sent to apps are read back and checked; anything unconfirmed after 15 minutes is flagged, and an existing account is adopted only when an administrator decides.',
        category: 'reliability',
      },
      {
        id: 'AUTH-MOVEIN-001',
        text: 'People staged from another provider cannot sign in or receive mail until you admit them, and admission carries no password, passkey, role or session.',
        category: 'import',
      },
      {
        id: 'AUTH-ADMIN-001',
        text: 'An agent only prepares administration work and a person decides; its key is shown once and expires after 30 days.',
        category: 'ai',
      },
      {
        id: 'AUTH-LOGOUT-001',
        text: 'Signing out everywhere or suspending a person tells each linked app to end their session, retrying for up to 24 hours.',
        category: 'security',
      },
      {
        id: 'AUTH-TRANSFER-001',
        text: 'Exports leave out sessions and private keys.',
        category: 'export',
      },
    ],
    moveIn: [
      'Google Workspace',
      'Microsoft Entra',
      'Auth0',
      'Okta',
      'JumpCloud',
    ],
    runsOn:
      'Your own computer to try it; a host you choose and run yourself for real use',
    version: 'v0.1.0',
    contractUrl: 'https://github.com/just-every/run-auth/blob/main/CONTRACT.md',
    seoTitle: 'Auth: free, open-source sign-in with passkeys',
    seoDescription:
      "Auth is a free, open-source, owner-run sign-in service with email links, passkeys and OpenID Connect for your team's apps.",
  },
  {
    slug: 'balm',
    summary:
      "Balm is for an Australian physio, psychology or podiatry clinic with 1 to 10 practitioners. It handles online bookings, intake forms, private treatment notes and invoices, and keeps your clinic's records in your own account with every access to a client file logged. It does no Medicare, DVA, NDIS or health-fund claiming.",
    does: [
      "Let new clients book online from each practitioner's real open times",
      'Send each client a one-use private link to fill in the intake form',
      'Let practitioners write treatment notes that only they and the owner can read, with every amendment kept as a new revision',
      'Prepare, approve and number invoices that download as the same file every time, and record payments received elsewhere',
      'Show the owner a log of who opened each client file, read notes or intake answers, changed something or downloaded an invoice',
      "Give reception, practitioners and the owner different access, and cut off someone's access straight away",
      'Let an assistant prepare invoices, reminder text and intake form versions for a person to approve',
      'Move patients in from a Cliniko patient export (CSV) with a preview, a journal and undo, and back up and restore the whole clinic',
    ],
    promises: [
      {
        id: 'BALM-001',
        text: 'Every page and request checks who is signed in and what their role allows; practitioners see only clients they are booked with, and reception never sees intake answers or treatment notes.',
        category: 'access',
      },
      {
        id: 'BALM-001',
        text: "An assistant's key can only prepare invoices, reminder text and intake form versions; a person must approve each one, and the approval keeps a fingerprint of exactly what was approved.",
        category: 'ai',
      },
      {
        id: 'BALM-001',
        text: "Removing a staff member's access or cancelling an assistant key takes effect on the very next request.",
        category: 'access',
      },
      {
        id: 'BALM-001',
        text: 'Treatment notes can be read only by their author and the owner, and an amendment adds a new revision instead of overwriting the old one.',
        category: 'history',
      },
      {
        id: 'BALM-001',
        text: 'A booking slot that is already taken or invalid is refused, even if two people try at once.',
        category: 'reliability',
      },
      {
        id: 'BALM-001',
        text: 'Invoices are numbered and fixed only when a person approves them, approval is refused if anything frozen has changed, and a payment reference can be recorded only once and cannot exceed the invoice.',
        category: 'money',
      },
      {
        id: 'BALM-001',
        text: 'The access log is append-only and holds no client personal details; every opening of a file, read of notes or intake answers, change and download is added to it.',
        category: 'evidence',
      },
      {
        id: 'BALM-001',
        text: 'An intake link works once and is tied to the exact version of the form it was sent for.',
        category: 'privacy',
      },
      {
        id: 'BALM-001',
        text: 'Balm does no Medicare, health-fund or other claiming.',
        category: 'other',
      },
    ],
    moveIn: ['Cliniko patient export (CSV)'],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl: 'https://github.com/just-every/run-balm/blob/main/CONTRACT.md',
    seoTitle: 'Balm: free, open-source clinic booking and notes',
    seoDescription:
      'Balm is free, open-source software for small Australian physio, psychology and podiatry clinics: online booking, intake, private notes and invoices.',
  },
  {
    slug: 'barrow',
    summary:
      "Barrow is a wholesale ordering portal for an Australian maker or wholesaler. Trade customers see their own prices and minimum orders, you review and approve their orders, and Barrow exports an invoice file on each customer's payment terms. Stock is held in a separate Pier stock system that you connect.",
    does: [
      'Set up trade accounts with private prices, minimum orders and payment terms',
      'Invite customers to sign in and see only their own catalogue against live stock',
      'Let customers prepare and submit orders with their own purchase order reference',
      'Review and approve orders so the stock system reserves the items',
      'Export an invoice CSV once an order is fully reserved, with the agreed prices and terms',
      'Let an assistant read a catalogue and prepare order drafts for people to submit and approve',
      'Move in a trade-account list from CSV with a preview, journal and undo',
      'Back up and restore your data, and erase an unused trade account',
    ],
    promises: [
      {
        id: 'BAR-001',
        text: 'Every request checks who is signed in; supplier actions need an owner or admin, and customers can reach only their own account.',
        category: 'access',
      },
      {
        id: 'BAR-002',
        text: 'Orders keep a snapshot of the agreed prices and terms and the identity of whoever approved them; each order is sent to the stock system once, and the stock system remains the authority on stock.',
        category: 'history',
      },
      {
        id: 'BAR-002',
        text: 'An invoice export is offered only when every ordered unit is reserved; a partial reservation is shown plainly.',
        category: 'reliability',
      },
      {
        id: 'BAR-002',
        text: 'Amounts are exact whole cents; Barrow calculates no tax and moves no money.',
        category: 'money',
      },
      {
        id: 'BAR-003',
        text: 'Assistant access is revocable, lasts seven days, and can only read catalogues and prepare drafts; people submit and approve, and an assistant cannot approve, export, import or erase.',
        category: 'ai',
      },
      {
        id: 'BAR-004',
        text: 'Importing a trade-account list is previewed first, kept in a journal with the original file, and can be undone without discarding later edits or accounts that already have orders.',
        category: 'import',
      },
      {
        id: 'BAR-005',
        text: 'Backups restore your commercial records but leave out sign-in details and connection secrets.',
        category: 'export',
      },
      {
        id: 'BAR-005',
        text: 'Erasing an unused account also blocks an older backup from bringing it back; accounts that have orders keep their commercial history.',
        category: 'erasure',
      },
    ],
    moveIn: ["Trade-account list (CSV in Barrow's documented format)"],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-barrow/blob/main/CONTRACT.md',
    seoTitle: 'Barrow: free, open-source wholesale ordering portal',
    seoDescription:
      'Barrow is a free, open-source wholesale ordering portal: private trade prices, order approval and invoice exports for makers and wholesalers.',
  },
  {
    slug: 'blotter',
    summary:
      'Blotter is the job workflow for a small Australian bookkeeping or accounting practice with 1 to 15 people. It handles recurring client jobs like the quarterly BAS, document requests that clients answer through a private upload link, reviewer sign-off, and time exported for your own billing. It does not lodge anything with the ATO or calculate tax.',
    does: [
      'Add reviewers and preparers with their own hourly rates; preparers see only jobs assigned to them',
      "Start a client's quarterly BAS job from a template with a checklist, document requests and a fixed fee",
      'Send clients a reminder with a private upload link so they can send files without an account',
      'Have a preparer submit the finished job and a different reviewer sign it off with a recorded note',
      'Roll a signed-off job forward to the next period, with a due date a person enters',
      "Record time at each person's rate and export approved time and fees as a CSV for your billing",
      'Let an assistant prepare roll-forwards, reminders and exports for a person to approve or decline',
      'Move in a client list from CSV, back up the whole practice and erase a client file',
    ],
    promises: [
      {
        id: '',
        text: 'Blotter does not lodge anything with the ATO, calculate tax, GST or due dates, keep client books, or give advice; due dates are entered by people.',
        category: 'other',
      },
      {
        id: '',
        text: 'The assigned reviewer, not the preparer, signs off a job, and the sign-off is recorded with a note.',
        category: 'approval',
      },
      {
        id: '',
        text: 'An approved billing export never changes afterwards, and each time entry or fixed fee can be exported only once.',
        category: 'money',
      },
      {
        id: '',
        text: 'An assistant can only prepare work; every roll-forward, reminder and export waits until a person approves or declines it, and the decision is recorded.',
        category: 'ai',
      },
      {
        id: '',
        text: "Preparers see only the jobs assigned to them, and removing a team member's access takes effect at once.",
        category: 'access',
      },
      {
        id: '',
        text: 'Undoing a client-list import keeps any client who already has jobs, and the journal says what was kept and why.',
        category: 'undo',
      },
      {
        id: '',
        text: 'A client-list import commits exactly the file you previewed; if the file has changed since, it is refused and a new preview is needed.',
        category: 'import',
      },
      {
        id: '',
        text: 'After a client file is erased, an older backup cannot restore it unless you also supply the newer backup that records the erasure.',
        category: 'erasure',
      },
    ],
    moveIn: [
      "Client list (CSV in Blotter's documented format, from a spreadsheet or a previous practice tool)",
    ],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl: '',
    seoTitle: 'Blotter: free, open-source job workflow for bookkeepers',
    seoDescription:
      'Blotter is free, open-source job workflow software for small bookkeeping and accounting practices: BAS jobs, client uploads, sign-off and time export.',
  },
  {
    slug: 'buoy',
    summary:
      'Buoy is customer success and renewals for a small B2B software company. It keeps confirmed renewal dates beside billing and support evidence, lets you work an approved at-risk playbook, and records the renewal decision.',
    does: [
      "Record each account's confirmed renewal date, notice days and contract reference",
      'Show account health from billing and support snapshots, with missing or stale evidence clearly labelled',
      'Prepare an at-risk playbook action, have an owner or admin approve it, and record completion with separate evidence',
      'Prepare and approve a renewal outcome (renewed, churned or deferred) with a reason and evidence',
      'Import accounts, billing and support snapshots from a documented JSON format with a preview and undo',
      'Let an assistant prepare playbooks and renewal proposals for people to approve',
      'Back up, restore and erase an account',
    ],
    promises: [
      {
        id: 'HTTP-001',
        text: 'Every request checks the current sign-in, role and origin; assistant access is limited to reading and preparing.',
        category: 'access',
      },
      {
        id: 'DATA-001',
        text: 'Invoice balances cannot go negative, dates and observations are checked, and missing or stale evidence stays visible.',
        category: 'reliability',
      },
      {
        id: 'APPROVAL-001',
        text: 'A proposal captures the account as it was; approval records who approved and when, and is checked against that same version.',
        category: 'approval',
      },
      {
        id: 'APPROVAL-001',
        text: 'Completing an action needs separate evidence, and refreshing the source data leaves earlier decisions untouched.',
        category: 'history',
      },
      {
        id: 'IMPORT-001',
        text: 'An import is applied only against the data you reviewed, is journalled, and undo is refused for accounts that were edited or have dependent work.',
        category: 'undo',
      },
      {
        id: 'ERASE-001',
        text: 'Erasing an account removes its work, decisions and imported copies together, and stops it being re-imported in that installation; copies you exported or hold elsewhere are outside this.',
        category: 'erasure',
      },
      {
        id: 'RESTORE-001',
        text: 'A backup restores into an empty installation with a new sign-in; damaged backups and non-empty destinations are refused, and credentials and settings are left out.',
        category: 'export',
      },
      {
        id: '',
        text: 'Buoy sends no messages, collects no billing and makes no churn predictions.',
        category: 'other',
      },
    ],
    moveIn: [
      "Account, billing and support JSON snapshot (Buoy's documented format)",
    ],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl: 'https://github.com/just-every/run-buoy/blob/main/CONTRACT.md',
    seoTitle: 'Buoy: free, open-source renewals and customer success',
    seoDescription:
      'Buoy is free, open-source customer success software for small B2B companies: renewal dates, account health, approved playbooks and decisions.',
  },
  {
    slug: 'cabin',
    summary:
      'Cabin is holiday-rental operations for a host or manager with 3 to 40 short-stay properties. It brings in booking calendar files, runs cleaner photo checklists and produces approved monthly owner statements.',
    does: [
      'Manage properties, owners, commission and team access',
      'Import Airbnb and Booking.com calendar files, show clashes and how fresh each calendar is, and approve each change',
      'Assign a cleaner to a turnover and have them tick every checklist item and upload a photo',
      'Prepare a monthly owner statement, approve it and download it as a CSV',
      'Import a property register from a CSV, with a preview and undo',
      'Let an assistant prepare calendar, turnover and statement drafts for people to approve',
      "Back up and restore records and photos, and erase a property's personal data",
    ],
    promises: [
      {
        id: 'AUTH-001',
        text: "Only the owner grants access; every private page checks the signed-in person's role, and cleaners see only the jobs assigned to them.",
        category: 'access',
      },
      {
        id: 'CONTROL-001',
        text: 'Calendar changes, turnovers and statements are never published on their own: a manager approves the exact version, with who and when recorded, and a stale approval is refused if the underlying booking or terms have changed.',
        category: 'approval',
      },
      {
        id: 'SYNC-001',
        text: 'Calendar changes (edits, cancellations and removals) are never adopted silently; each needs a fresh human approval, and malformed files are refused.',
        category: 'evidence',
      },
      {
        id: 'CONTROL-002',
        text: "An assistant's key can be revoked and can only prepare drafts; it cannot approve, and each approval records who approved and which version.",
        category: 'ai',
      },
      {
        id: 'EVIDENCE-001',
        text: 'Cleaner completion evidence, including the photo, is private to the team and cannot be changed after it is recorded.',
        category: 'evidence',
      },
      {
        id: 'FIN-004',
        text: 'Statements are frozen in exact whole cents at approval, and Cabin never moves money or does trust accounting.',
        category: 'money',
      },
      {
        id: 'MIGRATE-001',
        text: 'Property imports are previewed, journalled and can be undone without losing edits you made since.',
        category: 'undo',
      },
      {
        id: 'DATA-001',
        text: 'Backups leave out sign-in details and credentials, and after an erasure an older backup cannot restore the erased data when a later backup is supplied.',
        category: 'erasure',
      },
    ],
    moveIn: [
      "Property register (CSV in Cabin's documented format)",
      'Airbnb calendar (.ics)',
      'Booking.com calendar (.ics)',
    ],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-cabin/blob/main/CONTRACT.md',
    seoTitle: 'Cabin: free, open-source holiday rental operations',
    seoDescription:
      'Cabin is free, open-source software for holiday-rental hosts: calendar imports, cleaner photo checklists and approved owner statements.',
  },
  {
    slug: 'coffer',
    summary:
      "Coffer keeps donor records for a US nonprofit: donors and households, every gift as an exact ledger line, pledges and each donor's consent to hear from you. It prepares the acknowledgement letters that larger gifts need and builds appeal lists that only include donors who said yes. It does not process payments, send email or give tax advice.",
    does: [
      'Move in a year of gifts from saved Stripe pages, with a preview and undo',
      "Show each donor's gifts by year, pledges, consent history, letters and appeals",
      'Record gifts by hand and correct mistakes with a matching reversal',
      "Record each donor's consent for email or postal mail with evidence",
      'Prepare acknowledgement letters in your own wording, approve them, export them for printing or mail merge and record when they were sent',
      'Build appeal audiences that include only donors who currently consent, and refuse to export if consent changes',
      'Let an assistant prepare letters and appeals for a person to approve',
      'Back up, restore and erase a donor',
    ],
    promises: [
      {
        id: 'HTTP-001',
        text: "Every request checks the person's role, and a revoked sign-in or key stops working even for a request already in progress.",
        category: 'access',
      },
      {
        id: 'GIFT-001',
        text: 'Gifts are exact-cent ledger lines that cannot be edited; a correction is a matching opposite line, once per gift.',
        category: 'history',
      },
      {
        id: 'CONSENT-001',
        text: 'Consent is kept as a history per donor and channel, with method, evidence, date and who recorded it; the newest answer counts.',
        category: 'privacy',
      },
      {
        id: 'ACK-001',
        text: 'Gifts at or over your threshold are due a letter within your target number of days, and no letter is prepared until a person has saved your letter wording; Coffer never sends mail.',
        category: 'alerts',
      },
      {
        id: 'ACK-001',
        text: 'A person approves the exact content of a letter batch, then exports it, then records when it was sent.',
        category: 'approval',
      },
      {
        id: 'APPEAL-001',
        text: 'An appeal audience includes only donors whose latest consent for that channel is yes, and approval and export are refused if any of that consent has since changed.',
        category: 'privacy',
      },
      {
        id: 'AGENT-001',
        text: "An assistant's key expires, can be revoked, and can only prepare letters and appeals; approvals record who prepared and who approved the exact content.",
        category: 'ai',
      },
      {
        id: 'IMPORT-001',
        text: 'Stripe imports are previewed, applied only as reviewed, journalled with the original pages and can be undone; failed, refunded, non-US-dollar and duplicate charges are skipped with reasons.',
        category: 'import',
      },
      {
        id: 'DATA-001',
        text: 'Erasing a donor (you type ERASE) removes their personal details, consent evidence and letter text, keeps gift amounts as anonymous ledger lines, and stops them returning from a later import or an older backup.',
        category: 'erasure',
      },
    ],
    moveIn: ['Stripe customer and charge pages (saved list pages)'],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-coffer/blob/main/CONTRACT.md',
    seoTitle: 'Coffer: free, open-source donor records for nonprofits',
    seoDescription:
      'Coffer is free, open-source donor management for US nonprofits: gift ledger, consent, acknowledgement letters and consent-checked appeals.',
  },
  {
    slug: 'crank',
    summary:
      'Crank is human-approved workflow automation. An incoming event becomes a visible run, and a person approves its exact contents and destination before Crank sends anything. A failed delivery gets one manual replay with the same idempotency key.',
    does: [
      'Create and activate a flow that passes events from one app to another over the web',
      "Show each run's exact input and destination before anyone approves or rejects it",
      'Record the decision and the delivery result for every run',
      'Replay a failed delivery once, so the receiving app records it only once',
      'Take events from your sending app with a limited credential for a single flow',
      'Let an assistant prepare flows and runs, but never approve them',
      'Import a supported n8n workflow export with a preview, journal and undo',
      'Back up and restore your workflows, and erase a completed run',
      'Try it with an included local receiving app, the Operations inbox',
    ],
    promises: [
      {
        id: 'TEAM-002',
        text: "A person approves or rejects a run's exact body and destination before anything is delivered; a rejection stops the run with nothing sent.",
        category: 'approval',
      },
      {
        id: 'TEAM-003',
        text: 'An assistant can prepare flows and runs but cannot approve, reject, replay, import, export or erase; its credentials are scoped and can be revoked.',
        category: 'ai',
      },
      {
        id: 'TRIG-001',
        text: 'Sending the same event ID and body again returns the existing run, and changed input under an event ID is refused.',
        category: 'reliability',
      },
      {
        id: 'EXEC-004',
        text: 'A failed delivery can be replayed once only, using the original approved body and the same idempotency key, so a receiving app that follows the rule records it once.',
        category: 'undo',
      },
      {
        id: 'HTTP-001',
        text: 'Every run keeps its exact input, destination, decision and delivery attempts, including incomplete ones.',
        category: 'evidence',
      },
      {
        id: 'MIG-001',
        text: 'An n8n import is previewed and approved first, journalled, and can be undone only while the imported draft is unused; only a simple webhook-to-web-request workflow is supported.',
        category: 'import',
      },
      {
        id: 'DATA-001',
        text: 'Backups restore only into an empty installation and leave out owners, sessions and tokens.',
        category: 'export',
      },
      {
        id: 'DATA-002',
        text: 'Erasing a run blocks an older backup from restoring its data, though the receiving app keeps the effect it already recorded.',
        category: 'erasure',
      },
      {
        id: 'AGENT-001',
        text: 'Crank does not hold third-party app credentials, call other services on its own, run schedules, or check that the business job was actually finished; destinations must support the documented idempotency rule.',
        category: 'other',
      },
    ],
    moveIn: ['n8n workflow export (supported subset)'],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-crank/blob/main/CONTRACT.md',
    seoTitle: 'Crank: free, open-source approved workflow automation',
    seoDescription:
      'Crank is free, open-source workflow automation where a person approves each run before anything is sent, with one safe replay for failed deliveries.',
  },
  {
    slug: 'evidence',
    summary:
      'Evidence is an audit-evidence desk for one business. You write your controls, keep proof on a schedule, see honest gaps, share an expiring folder with an auditor, and take your archive with you. A file fingerprint proves the bytes are unchanged; it does not certify your business or prove a control worked.',
    does: [
      'Write controls in plain words with the proof you need and how often',
      'Upload proof files and keep a receipt and fingerprint for each, with replaced files kept',
      'See for any period whether each requirement is covered, due soon, overdue, missing, replaced-only or unreadable',
      'Share selected controls and dates with an auditor through an expiring link, and see who opened what',
      'Close an auditor folder to stop future access',
      'Let an assistant propose an auditor folder for you to approve',
      'Import from a Drata audit-evidence ZIP with a preview, journal and undo',
      'Export the whole archive and restore it into an empty installation',
    ],
    promises: [
      {
        id: 'PROOF-001',
        text: 'Each upload issues a receipt from the stored bytes, a replacement keeps the old receipt and file, and nothing already recorded is altered.',
        category: 'evidence',
      },
      {
        id: 'GAP-001',
        text: 'Each requirement shows one honest state for the chosen period; there is no single green score.',
        category: 'evidence',
      },
      {
        id: 'REVIEW-001',
        text: 'An auditor folder covers only the controls and dates you select, uses a one-time link that expires, is checked on every request, and keeps an owner-only access history.',
        category: 'access',
      },
      {
        id: 'REVIEW-001',
        text: 'Auditors cannot sign in, change anything, or see who uploaded files, other folders or the access log.',
        category: 'privacy',
      },
      {
        id: 'CUSTODY-001',
        text: 'The archive holds your records and proof files with their fingerprints, lists any file that could not be read, and restores only into an empty installation; restored folders stay closed.',
        category: 'export',
      },
      {
        id: 'IMPORT-001',
        text: 'A Drata import is reviewed before it is admitted, journalled, and undo removes the links while keeping the original files and receipts; imported material never counts as current proof.',
        category: 'import',
      },
      {
        id: 'AGENT-001',
        text: 'An assistant can only inspect gaps and propose folders; the owner approves the exact proposal and the decision is recorded.',
        category: 'ai',
      },
      {
        id: 'BOUNDARY-001',
        text: 'Evidence does not certify a business, replace an auditor, supply policies or legal advice, or run automatic collectors; a receipt shows what you asserted and kept, not that a control worked.',
        category: 'other',
      },
    ],
    moveIn: ['Drata audit-evidence ZIP with HTML manifest'],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-evidence/blob/main/CONTRACT.md',
    seoTitle: 'Evidence: free, open-source audit evidence desk',
    seoDescription:
      'Evidence is a free, open-source desk for audit proof: controls, dated receipts, honest gap states and expiring auditor folders.',
  },
  {
    slug: 'inkwell',
    summary:
      'Inkwell lets you send a fixed PDF for ordered electronic signatures and keep the signed file, certificate and audit trail in your own account. You place the fields, approve, and each signer in turn verifies by an emailed code, consents and signs.',
    does: [
      'Upload a PDF (up to 2 MiB) and place signature, text and date fields for one to five signers in order',
      'Approve the envelope yourself before the first signer is invited',
      'Have each signer verify an email code, give consent and sign in turn',
      'Download the signed PDF, a certificate, the audit record and a handoff manifest, and re-check their fingerprints',
      'Void an unfinished envelope with a recorded reason',
      'Let an assistant prepare an envelope for a person to review and approve',
      'Import a DocuSeal archive with a preview, journal and undo',
      'Back up and restore your documents, and permanently erase an envelope',
    ],
    promises: [
      {
        id: '',
        text: "Preparing an envelope sends nothing; only a signed-in person's approval sends the first invitation.",
        category: 'approval',
      },
      {
        id: '',
        text: 'Signing needs a verified email code, explicit consent and the current, unchanged version of the document, and the next signer is invited only after the previous signature is recorded.',
        category: 'security',
      },
      {
        id: '',
        text: 'An assistant token can prepare an envelope but cannot approve or sign.',
        category: 'ai',
      },
      {
        id: '',
        text: 'The original PDF is never altered, and the certificate records the real email-code check, consent and signing order, with the evidence saved in one step with the signature.',
        category: 'evidence',
      },
      {
        id: '',
        text: 'Imported signatures keep their original provider provenance; Inkwell never invents historical verification.',
        category: 'import',
      },
      {
        id: '',
        text: 'Inkwell does not apply qualified cryptographic signatures, does not do identity checks or notarisation, and gives no legal advice about whether e-signing suits a document.',
        category: 'other',
      },
      {
        id: '',
        text: 'After an envelope is erased, an older backup cannot restore it when the newer backup is supplied as the erasure record.',
        category: 'erasure',
      },
      {
        id: '',
        text: "Private pages and data requests check the signed-in person's role; unknown addresses return a proper not-found.",
        category: 'access',
      },
    ],
    moveIn: ['DocuSeal archive (submission JSON with signed and audit PDFs)'],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-inkwell/blob/main/CONTRACT.md',
    seoTitle: 'Inkwell: free, open-source e-signature software',
    seoDescription:
      'Inkwell is free, open-source e-signature software: send a PDF for ordered signatures and keep the signed file, certificate and audit trail.',
  },
  {
    slug: 'lanyard',
    summary:
      'Lanyard offers weekly rosters, phone clocking and approved timesheets for a small Australian venue. It exports hours for your existing payroll process; it never calculates or pays wages.',
    does: [
      'Add staff and invite them to sign in, or import a staff list from a CSV',
      'Collect staff availability and leave requests, and let managers decide leave',
      'Publish a conflict-free weekly roster that staff see and confirm',
      'Let staff clock in and out on a phone, with a retry if the connection drops',
      'Let managers prepare missed time, approve hours and correct approved records with history kept',
      "Export approved hours as a payroll CSV once per revision, and record your provider's acknowledgement",
      'Let an assistant prepare rosters, timesheets and payroll drafts for people to approve',
      'Back up and restore, and remove staff or assistant access',
    ],
    promises: [
      {
        id: '',
        text: 'Lanyard never calculates award pay or pays wages; it exports hours only, and there is no automatic submission to a payroll provider.',
        category: 'money',
      },
      {
        id: '',
        text: 'Publishing a roster is refused if a shift falls outside availability, approved leave or overlaps another shift.',
        category: 'reliability',
      },
      {
        id: '',
        text: 'A retried clock-in or clock-out never duplicates time.',
        category: 'reliability',
      },
      {
        id: '',
        text: "A correction keeps the earlier record and needs a fresh approval, and a manager's own hours need another manager or the owner to approve.",
        category: 'history',
      },
      {
        id: '',
        text: 'Each payroll revision is exported once, re-downloads return identical bytes, and later corrections export only the difference in hours.',
        category: 'export',
      },
      {
        id: '',
        text: 'An assistant can only prepare work; a person alone publishes, approves and exports, and decisions are recorded.',
        category: 'ai',
      },
      {
        id: '',
        text: 'Deactivating staff cuts off their access at once.',
        category: 'access',
      },
      {
        id: '',
        text: 'Only staff who were never invited, imported or used in work can be erased; staff with history are deactivated and their records kept.',
        category: 'erasure',
      },
      {
        id: '',
        text: 'The staff import is a documented format, previewed and journalled, with undo for untouched rows.',
        category: 'import',
      },
    ],
    moveIn: ["Staff list (Staff CSV v1, Lanyard's documented format)"],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-lanyard/blob/main/CONTRACT.md',
    seoTitle: 'Lanyard: free, open-source rosters and timesheets',
    seoDescription:
      'Lanyard is free, open-source rostering, phone clocking and timesheet software for small Australian venues, with payroll CSV export.',
  },
  {
    slug: 'mallet',
    summary:
      "Mallet runs the repair bench for a small Australian mechanic, bicycle or device shop. It tracks customer assets, bay bookings, estimates, the customer's recorded authorisation, parts and labour, and one saved invoice file per visit. Each asset keeps its full visit history.",
    does: [
      "Register a customer's vehicle or device and keep every visit in its service history, with a service history CSV to download",
      'Book a bay and a technician, with overlapping bookings refused for either',
      'Prepare estimates with parts and labour, with 10% GST shown separately, and record how the customer authorised each line',
      'Record parts used and labour hours only against the lines the customer authorised',
      'Approve an invoice and export it once as a saved CSV file for your accounting (not an automatic accounting import)',
      'Let an agent prepare estimates, schedules and invoice drafts while a person makes every decision',
      'Move in customers and assets from saved RepairShopr snapshots, with a preview and undo',
      'Back up and restore the workshop, and erase an asset that has never been used',
    ],
    promises: [
      {
        id: 'HTTP-001',
        text: 'Workshop pages and commands sit behind sign-in; direct requests are checked for the right host and origin, and unknown addresses return a real not-found.',
        category: 'security',
      },
      {
        id: 'WORKSHOP-001',
        text: 'Each asset has a unique identifier and keeps its visits; a booking is refused if it overlaps another for either the bay or the technician.',
        category: 'reliability',
      },
      {
        id: 'ESTIMATE-001',
        text: "A person approves the exact estimate revision before it is shared, and staff record the customer's name, chosen lines, method and evidence against that revision. Sharing is a record you make, not an email Mallet sends.",
        category: 'approval',
      },
      {
        id: 'WORK-001',
        text: 'Work can be recorded only against lines and quantities the customer authorised, and staff members record only their own assigned jobs.',
        category: 'approval',
      },
      {
        id: 'INVOICE-001',
        text: 'An invoice freezes the authorised prices and actual quantities, a person approves it, and repeated export returns the same saved file rather than a new one.',
        category: 'money',
      },
      {
        id: 'AGENT-001',
        text: 'An agent key expires and can be revoked; it can only prepare estimates, revisions, schedules and invoice drafts, never approve, share, authorise or export.',
        category: 'ai',
      },
      {
        id: 'IMPORT-001',
        text: 'Moving in from RepairShopr shows a preview that writes nothing, applies only the exact reviewed version, keeps the originals, and refuses to undo records that were changed or used since. Past repair history stays in the old system.',
        category: 'import',
      },
      {
        id: 'DATA-001',
        text: 'Backups restore only into an empty installation. Only the owner can erase an unused asset, by typing ERASE; assets with visits are kept. An older backup from before an erasure is refused.',
        category: 'erasure',
      },
      {
        id: 'PIER-001',
        text: 'The optional stock catalogue link is read-only; Mallet never reserves, changes or orders stock.',
        category: 'other',
      },
    ],
    moveIn: ['RepairShopr customer and customer-asset snapshots'],
    runsOn:
      'Your own computer, or your own Cloudflare account; you hold the data',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-mallet/blob/main/CONTRACT.md',
    seoTitle: 'Mallet: free, open-source repair shop software',
    seoDescription:
      'Mallet runs a small repair shop: bookings, estimates, customer approvals and invoices. Free and open source, and you keep your own data.',
  },
  {
    slug: 'pane',
    summary:
      'Pane is a small business website with five pages and a contact inbox. You preview every change, publish when you are happy, and can roll back in one step.',
    does: [
      'Prepare and preview five pages: home, about, services, hours and contact, with a clear draft banner on previews',
      'Approve and publish, with the approver and exact version recorded',
      'Restore an earlier version of the site in one step',
      'Receive messages from the contact form on the live site, and read or erase them',
      'See approximate page-view counts by day and page, without cookies or visitor tracking',
      'Move in an existing site from a static-site export as an unpublished draft that can be undone',
      'Back up and restore the site and inbox',
      'Let an agent prepare drafts while only the owner publishes',
    ],
    promises: [
      {
        id: 'PANE-ROLES',
        text: 'Every private action requires a signed-in person. Owners publish, roll back and erase messages; owners and admins prepare, preview and import; members can only read.',
        category: 'access',
      },
      {
        id: 'PANE-SNAPSHOT',
        text: 'Each version holds the complete five-page snapshot with a fingerprint, and publishing selects it in one step and records who approved it.',
        category: 'history',
      },
      {
        id: 'PANE-CONTACT',
        text: 'A contact form submission is only counted once even if sent twice.',
        category: 'reliability',
      },
      {
        id: 'PANE-VISITS',
        text: 'Visit counts store only day and page totals, with no cookies, visitor IDs, IP addresses or referrers.',
        category: 'privacy',
      },
      {
        id: 'PANE-ERASE',
        text: 'Erasing a message is recorded together with the backup safeguard, so an older backup cannot bring it back.',
        category: 'erasure',
      },
      {
        id: 'PANE-IMPORT',
        text: 'Static-site imports keep a journal and refuse a reversal that would be unsafe.',
        category: 'import',
      },
      {
        id: 'PANE-BRAND',
        text: "The live site carries no Pane branding; previews show your own site's typography with a clear draft banner.",
        category: 'other',
      },
      {
        id: 'PANE-ESCAPE',
        text: 'Page text is shown as plain text, so pasted HTML is not run.',
        category: 'security',
      },
    ],
    moveIn: ['Static-site JSON export (the documented five-page format)'],
    runsOn: 'Your own Cloudflare account, or your own computer to try it',
    version: '',
    contractUrl: 'https://github.com/just-every/run-pane/blob/main/CONTRACT.md',
    seoTitle: 'Pane: free, open-source small business website',
    seoDescription:
      'Pane is a five-page business website with a contact inbox, previews and one-step rollback. Free and open source, in your own account.',
  },
  {
    slug: 'placemat',
    summary:
      "Placemat handles table bookings for a restaurant. Guests book online, walk-ins and the waitlist share one floor, and every guest's visits are remembered.",
    does: [
      'Set your venue timezone, tables, turn times and cover limit',
      'Publish a service after you approve the exact plan',
      'Let guests book online into times that fit a full turn',
      'Seat walk-ins, run a waitlist and mark no-shows on one floor view',
      'Combine tables automatically when one table is too small',
      'Prepare approved reminder lists as a CSV for your own email or SMS sender',
      "Keep guest history and notes, and erase a guest's details",
      'Move in guest and booking history from Tablein-style CSV files',
    ],
    promises: [
      {
        id: 'PLACEMAT-ACCESS',
        text: 'Owners and managers run the floor and approve plans; read-only staff can only look; move-in, erasure, backups and keys need the owner.',
        category: 'access',
      },
      {
        id: 'PLACEMAT-GUEST-PRIVACY',
        text: "Guests can see published services and make a booking, but never see other guests' contact details.",
        category: 'privacy',
      },
      {
        id: 'PLACEMAT-TABLES',
        text: "Tables cannot be double booked, bookings start every 15 minutes, and a service's total cover limit cannot be exceeded.",
        category: 'reliability',
      },
      {
        id: 'PLACEMAT-CONFLICT',
        text: 'If the floor changed while you were editing, the change is refused as a conflict instead of overwriting it.',
        category: 'reliability',
      },
      {
        id: 'PLACEMAT-APPROVAL',
        text: 'Agents can prepare plans and proposals, but only a person approves, and that person is recorded. A changed draft or a physical table clash refuses the approval.',
        category: 'approval',
      },
      {
        id: 'PLACEMAT-REMINDERS',
        text: 'Reminders are an approved CSV for your own sender; Placemat takes no deposits or card holds, takes no payments and sends no messages.',
        category: 'money',
      },
      {
        id: 'PLACEMAT-IMPORT',
        text: 'Move-in shows a dry run first, applies only the confirmed plan, keeps a journal and refuses to undo rows that were edited.',
        category: 'import',
      },
      {
        id: 'PLACEMAT-ERASE',
        text: 'Erasing a guest removes their personal details, including from import records, and blocks older backups from bringing them back.',
        category: 'erasure',
      },
    ],
    moveIn: ['Tablein-style guest and history CSV'],
    runsOn: 'Your own computer, or your own Cloudflare account',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-placemat/blob/main/CONTRACT.md',
    seoTitle: 'Placemat: free, open-source restaurant bookings',
    seoDescription:
      'Placemat manages restaurant tables, online bookings, walk-ins and waitlists. A free, open-source alternative to OpenTable, Tablein and ResDiary.',
  },
  {
    slug: 'platter',
    summary:
      'Platter is for a small Australian agency or studio that sends proposals and quotes. You prepare two priced options, approve the exact offer, and a client accepts one after verifying their email. You keep the signed-off agreement and a once-only deposit invoice file.',
    does: [
      'Keep a list of clients',
      'Prepare a proposal with scope, two priced options and a deposit percentage',
      'Approve the exact version, then send the client a private link',
      'Let the client verify by email code, choose an option and accept with their name',
      'Export the deposit invoice once as a CSV with Xero sales-invoice columns',
      'Replace a lost or expired client link without changing the offer',
      'Let an agent prepare drafts while only the owner approves and sends',
      'Import clients from a CSV, and back up, restore or erase unused clients',
    ],
    promises: [
      {
        id: 'PLATTER-APPROVAL',
        text: 'Only the owner approves an exact proposal revision or sends it, and any edit clears the earlier approval.',
        category: 'approval',
      },
      {
        id: 'PLATTER-FROZEN',
        text: "Once sent, an offer is frozen; a replacement link can be issued without changing it. A client's link opens only their own offer.",
        category: 'history',
      },
      {
        id: 'PLATTER-ACCEPT',
        text: 'A client can accept only with a verified email, a typed name, one offered option and their consent.',
        category: 'evidence',
      },
      {
        id: 'PLATTER-SNAPSHOT',
        text: 'The agreed scope, prices and deposit are kept exactly as approved, with the deposit worked out in whole cents, rounded to the nearest cent.',
        category: 'money',
      },
      {
        id: 'PLATTER-IMMUTABLE',
        text: 'An accepted agreement and its deposit CSV cannot be changed, and repeated or simultaneous exports return the same single invoice.',
        category: 'history',
      },
      {
        id: 'PLATTER-AGENT',
        text: 'Agent keys expire and can be revoked; they can read and prepare drafts but never approve, send, export, import or erase.',
        category: 'ai',
      },
      {
        id: 'PLATTER-IMPORT',
        text: 'Client import shows a preview first, keeps the original file and a journal, and refuses undo if clients changed or have proposals.',
        category: 'import',
      },
      {
        id: 'PLATTER-RESTORE',
        text: 'Only unused, non-imported clients can be erased, and agreements are kept. Restoring older data needs a newer erasure record, and offers already sent need fresh links after a restore.',
        category: 'erasure',
      },
      {
        id: 'PLATTER-LIMITS',
        text: 'Offers carry no GST. Platter does not collect payments or calculate GST, and re-downloading the file does not stop you importing it into your books twice.',
        category: 'money',
      },
      {
        id: 'PLATTER-MAIL',
        text: 'Proposal emails are queued, claimed before sending and never blindly retried when the outcome is unclear; provider acceptance is not proof the client received it.',
        category: 'reliability',
      },
    ],
    moveIn: ['Client CSV (name and email)'],
    runsOn: 'Your own computer, or your own Cloudflare account',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-platter/blob/main/CONTRACT.md',
    seoTitle: 'Platter: free, open-source proposals and quotes',
    seoDescription:
      'Platter sends priced proposals, lets clients accept after email verification and exports a deposit invoice. Free and open source.',
  },
  {
    slug: 'plinth',
    summary:
      'Plinth is project management for a small residential builder. It covers accepted quotes, scheduled trades, site diaries, client-approved variations, supplier orders and progress claims.',
    does: [
      'Create a job, prepare a quote and record how the client accepted it',
      'Book trades without double booking, even across jobs',
      'Publish a daily site diary with photos',
      'Invite the client to approve each variation at its exact amount and scope',
      'Prepare and issue supplier purchase orders and record deliveries',
      'Approve and export a progress claim as CSV along with a full reconciliation',
      'Let an agent prepare drafts while people approve',
      'Move in accepted jobs from a CSV, and back up, restore or erase a job',
    ],
    promises: [
      {
        id: 'PLINTH-ACCESS',
        text: 'Every action checks who is signed in: owners and admins manage jobs, and clients are limited to their own job, matched by email.',
        category: 'access',
      },
      {
        id: 'PLINTH-CLIENT-APPROVAL',
        text: "A client approves variations themselves; a manager cannot approve on the client's behalf.",
        category: 'approval',
      },
      {
        id: 'PLINTH-SNAPSHOT',
        text: 'Approvals are tied to the exact terms at the time, and an accepted quote stays fixed.',
        category: 'history',
      },
      {
        id: 'PLINTH-MONEY',
        text: 'Money is kept in whole cents, and progress claims reserve their position so they cannot overlap or double count.',
        category: 'money',
      },
      {
        id: 'PLINTH-AGENT',
        text: 'Agent credentials can prepare drafts only; people make the approvals.',
        category: 'ai',
      },
      {
        id: 'PLINTH-LEDGER',
        text: 'Database updates keep the job ledger, photos, import records and erasure history intact.',
        category: 'history',
      },
      {
        id: 'PLINTH-IMPORT',
        text: 'Moving in jobs shows a dry run, keeps a journal and can be undone, while your own edits survive.',
        category: 'import',
      },
      {
        id: 'PLINTH-ERASE',
        text: 'Erasing a job also removes its photos and import records, and a later archive stops older backups bringing it back.',
        category: 'erasure',
      },
      {
        id: 'PLINTH-LIMITS',
        text: 'Plinth does not send orders, pay anyone, calculate tax or prepare statutory payment claims.',
        category: 'other',
      },
    ],
    moveIn: ['Accepted jobs CSV'],
    runsOn: 'Your own computer, or your own Cloudflare account',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-plinth/blob/main/CONTRACT.md',
    seoTitle: 'Plinth: free, open-source builder project software',
    seoDescription:
      'Plinth manages quotes, trades, site diaries, variations, orders and progress claims for small builders. Free and open source.',
  },
  {
    slug: 'satchel',
    summary:
      'Satchel is practice management for a US law firm of one to ten lawyers. It covers conflict-reviewed matters, time and expenses, private original files, confirmed deadlines and reviewed bill exports. Trust funds stay in your existing trust ledger.',
    does: [
      'Search for conflicts, review every possible match and open a matter only after a lawyer records the conclusion',
      'Record time and expenses and prepare bills from unbilled work',
      'Approve a bill with a review note and download it as CSV',
      'Keep original files up to 1 MiB with versions, visible to the whole matter or only to certain people',
      'Record deadlines with their citations, have a lawyer confirm them and mark completion',
      'Give each person access only to the matters they are assigned',
      'Let an agent prepare matters, bills and deadlines for a person to review',
      "Move in contacts from a Clio CSV, and download a private firm backup, restore it or erase a document's contents",
    ],
    promises: [
      {
        id: 'README-CONFLICT',
        text: "A matter opens only after a fresh conflict search covering this firm's records is run, every possible match is reviewed and a lawyer records the conclusion.",
        category: 'approval',
      },
      {
        id: 'README-BILLS',
        text: 'A bill is reviewed by a lawyer with a note and exported once; exported bills stay unchanged, and a changed amount needs a separately reviewed correction.',
        category: 'money',
      },
      {
        id: 'README-DEADLINES',
        text: 'A lawyer confirms each deadline and records completion evidence; a new version of the source document replaces earlier pending or confirmed deadlines so they are reviewed again.',
        category: 'approval',
      },
      {
        id: 'README-AGENT',
        text: 'An agent can only propose matters, bills and deadlines; a person must still do the conflict search or final review, and the decision is recorded.',
        category: 'ai',
      },
      {
        id: 'README-ACCESS',
        text: 'The principal sees every matter; other people see only matters they are assigned, and deactivating someone removes firm access immediately.',
        category: 'access',
      },
      {
        id: 'README-IMPORT',
        text: 'Contact import is previewed first, keeps the original file and a journal, and undo keeps contacts that have been changed or used by matters.',
        category: 'import',
      },
      {
        id: 'README-ERASE',
        text: 'Erasing a file removes all its version bytes while keeping names, fingerprints and history; an archive from before an erasure is refused unless a newer erasure record is supplied.',
        category: 'erasure',
      },
      {
        id: 'README-BACKUP',
        text: 'A private firm archive holds data, originals, bills, approvals and import records, but not sign-in credentials, sessions, agent keys or local mail. Restore only goes into an empty installation.',
        category: 'export',
      },
      {
        id: 'README-LIMITS',
        text: 'Satchel does not calculate court deadlines, establish legal conflict clearance, send invoices, calculate tax, handle trust accounting or move money.',
        category: 'other',
      },
    ],
    moveIn: ['Clio contacts CSV'],
    runsOn: 'Your own Cloudflare account',
    version: '',
    contractUrl: '',
    seoTitle: 'Satchel: free, open-source law practice software',
    seoDescription:
      'Satchel handles conflict checks, matters, time, bills, documents and deadlines for small US law firms. Free and open source.',
  },
  {
    slug: 'stall',
    summary:
      "Stall is an online shop for a maker or retailer, built around your own Stripe payments and stock kept in Pier. It publishes products after you approve them, takes card payment on Stripe's page, reserves stock, ships and makes partial refunds, with an approval recorded at each step.",
    does: [
      'Publish products after approving the exact name, description and price',
      "Take card payments on Stripe's hosted payment page",
      'Reserve stock in Pier when a paid order is confirmed',
      'Prepare and approve shipping with a tracking reference',
      'Prepare and approve a partial refund for one line',
      'Let an agent prepare product, shipping and refund drafts while a person approves',
      'Move in simple products from a Shopify product CSV; they arrive unpublished and can be undone',
      "Back up and restore the shop, and erase a customer's contact details",
    ],
    promises: [
      {
        id: 'PAY-003',
        text: 'An order counts as paid only when a verified payment event matches the exact order, amount and currency; returning from the payment page alone never marks it paid. Repeated events lead to one paid order and one stock reservation.',
        category: 'money',
      },
      {
        id: 'ORDER-002',
        text: 'A signed-in owner or admin approves an exact shipment before it is dispatched; stale drafts fail and a repeated approval ships once.',
        category: 'approval',
      },
      {
        id: 'ORDER-003',
        text: 'A person approves the exact refund, lines and amount, and a repeated approval cannot pay twice.',
        category: 'money',
      },
      {
        id: 'AGENT-001',
        text: 'The owner can grant and revoke short-lived agent access. Agents prepare product, shipment and refund drafts; they cannot approve, grant access, export, restore or erase.',
        category: 'ai',
      },
      {
        id: 'SECURITY-001',
        text: 'Desk, import and data pages are guarded by sign-in on the server; a member, an anonymous caller or a revoked agent cannot reach private actions, and card details never belong in the shop.',
        category: 'security',
      },
      {
        id: 'ERASURE-001',
        text: "The owner can erase a customer's email, address and checkout fingerprint while keeping anonymous order history; an older backup that predates the erasure is refused.",
        category: 'erasure',
      },
      {
        id: 'DATA-001',
        text: 'A backup of products, orders, approvals, payment and stock references and import records can be restored into an empty installation; sign-in details, agent credentials and private settings do not travel.',
        category: 'export',
      },
      {
        id: 'AUDIT-001',
        text: 'Commercial actions are written to an attributable history that shows who did what.',
        category: 'history',
      },
      {
        id: 'MIGRATE-001',
        text: 'Simple products move in from a Shopify product CSV as unpublished products, with a preview, journal and undo.',
        category: 'import',
      },
    ],
    moveIn: ['Shopify product CSV'],
    runsOn:
      'Your own Cloudflare account, with your own Stripe and Pier accounts',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-stall/blob/main/CONTRACT.md',
    seoTitle: 'Stall: free, open-source online shop',
    seoDescription:
      'Stall is an online shop with Stripe checkout, stock in Pier, shipping and partial refunds. Free and open source (MIT).',
  },
  {
    slug: 'strap',
    summary:
      'Strap manages classes, class packs and member balances for an Australian yoga, pilates or fitness studio. You own the records, and payments stay with your existing processor.',
    does: [
      'Add instructors and members and control what each can see',
      'Prepare and publish a week of classes with capacity and instructors',
      'Let members book with class-pack credits, with a waitlist when a class is full',
      'Return a credit on early cancellation and promote the first eligible waiting member',
      'Let instructors check attendees in for their own classes',
      'Approve packs and record payments you received elsewhere, with balances and reminder text',
      'Have members acknowledge the current waiver',
      'Move in members from a Mindbody CSV, and back up, restore or erase unused people',
    ],
    promises: [
      {
        id: 'STRAP-ROLES',
        text: 'Members can only book or cancel their own classes and acknowledge the waiver; instructors check in only their assigned classes; only the owner approves money or publication.',
        category: 'access',
      },
      {
        id: 'STRAP-BOOKING',
        text: 'Booking takes a seat and a credit together in one step, and joining a waitlist spends no credit.',
        category: 'reliability',
      },
      {
        id: 'STRAP-CANCEL',
        text: 'Cancelling refunds the credit once and promotes the next eligible person in order, in the same step.',
        category: 'undo',
      },
      {
        id: 'STRAP-PAYMENTS',
        text: 'Payment records are receipts of money received elsewhere; Strap never charges a card.',
        category: 'money',
      },
      {
        id: 'STRAP-REFS',
        text: 'Each outside payment reference can be recorded only once.',
        category: 'evidence',
      },
      {
        id: 'STRAP-AGENT',
        text: 'Agent keys can only prepare drafts for a person to review.',
        category: 'ai',
      },
      {
        id: 'STRAP-REVOKE',
        text: "Revoking someone's access takes effect on their next request.",
        category: 'access',
      },
      {
        id: 'STRAP-WAIVER',
        text: 'A waiver acknowledgement records receipt of the exact version and is not a legal signature.',
        category: 'evidence',
      },
    ],
    moveIn: ['Mindbody member CSV'],
    runsOn: 'Your own Cloudflare account, or your own computer to try it',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-strap/blob/main/CONTRACT.md',
    seoTitle: 'Strap: free, open-source studio class software',
    seoDescription:
      'Strap runs classes, class packs, bookings, waitlists and member balances for fitness studios. Free and open source.',
  },
  {
    slug: 'terrace',
    summary:
      'Terrace is residential property management for an independent manager or landlord. It keeps tenancies, recorded rent, photographed inspections, reviewed maintenance and owner statements in your own account.',
    does: [
      'Set up tenancies with lease dates and rent terms, and approve renewals',
      'Record rent charges and rent received elsewhere, and see arrears',
      'Download an owner statement CSV for a period',
      'Complete inspections with notes and photos',
      'Prepare and approve maintenance, then download an email packet to send to the trade',
      'Move in tenancies from a CSV, with a preview and undo',
      'Let a preparer or agent propose work while an owner or manager approves',
      'Back up, restore and erase a tenancy',
    ],
    promises: [
      {
        id: 'TERRACE-MONEY',
        text: 'Terrace records charges and money received elsewhere; trust money and external delivery stay outside it, so it does not collect rent, hold or move funds, or reconcile a trust account.',
        category: 'money',
      },
      {
        id: 'TERRACE-ROLES',
        text: 'Owners control imports, backups, erasure and people; managers record rent and inspections and approve proposals; members can read and prepare only.',
        category: 'access',
      },
      {
        id: 'TERRACE-PAYMENT-CAP',
        text: 'A payment cannot exceed what is still owed on a charge.',
        category: 'reliability',
      },
      {
        id: 'TERRACE-INSPECTION',
        text: 'An inspection needs notes and at least one photo before it is complete.',
        category: 'evidence',
      },
      {
        id: 'TERRACE-MAINTENANCE',
        text: 'Maintenance is approved first, sent from your own email, and only then is the handoff recorded.',
        category: 'approval',
      },
      {
        id: 'TERRACE-IMPORT',
        text: 'Import undo stops if a tenancy has gained rent, inspections, maintenance or edits.',
        category: 'undo',
      },
      {
        id: 'TERRACE-ERASE',
        text: 'Erasing a tenancy removes its dependent data, and a later archive stops older backups bringing it back.',
        category: 'erasure',
      },
    ],
    moveIn: ['Terrace tenancy CSV (documented format)'],
    runsOn: 'Your own Cloudflare account, or your own computer to try it',
    version: '',
    contractUrl:
      'https://github.com/just-every/run-terrace/blob/main/CONTRACT.md',
    seoTitle: 'Terrace: free, open-source property management',
    seoDescription:
      'Terrace tracks tenancies, rent, inspections with photos, maintenance and owner statements. Free and open source, in your own account.',
  },
  {
    slug: 'vane',
    summary:
      'Vane is cookie-free website analytics that runs in your own account. Add one script to your site to count page loads, sources, campaigns and goal conversions, then export or restore your history.',
    does: [
      'Register a site with the pages, goals and campaigns you want counted',
      'Add one script tag to your website',
      'See page loads, sources, campaigns, goals and a comparison with the previous period',
      'Choose a sampling rate of 10%, 25%, 50% or 100% of eligible loads, and require visitor consent',
      'Move in history from Umami v2 and undo it',
      'Export and restore full analytics history',
      'Erase history, or apply a retention window of 30, 90 or 365 days',
      'Let an administrator or agent prepare changes while the owner approves',
    ],
    promises: [
      {
        id: 'VANE-COOKIES',
        text: 'No cookies or browser storage are used, and Do Not Track and Global Privacy Control are respected.',
        category: 'privacy',
      },
      {
        id: 'VANE-STORED',
        text: 'No IP address, user agent, visitor ID or full page address is stored; only the pages you list are counted.',
        category: 'privacy',
      },
      {
        id: 'VANE-COUNTS',
        text: 'Counts are what was actually seen, never estimated or scaled up, and page loads are not unique people.',
        category: 'evidence',
      },
      {
        id: 'VANE-APPROVAL',
        text: 'Administrators and agents prepare changes, only the owner approves, and the person and time are recorded.',
        category: 'approval',
      },
      {
        id: 'VANE-COLLECT',
        text: 'The collector accepts only the fields you configured.',
        category: 'security',
      },
      {
        id: 'VANE-IMPORT',
        text: 'Imports show a preview with no changes, keep a journal and can be undone; imported consent and sampling are shown as unknown, not invented.',
        category: 'import',
      },
      {
        id: 'VANE-BACKUP',
        text: 'Analytics history, deletion record and import records are portable, and old backups are refused if a later deletion has been recorded.',
        category: 'erasure',
      },
      {
        id: 'VANE-ERASE',
        text: 'Deleting history also removes any imported copies.',
        category: 'erasure',
      },
    ],
    moveIn: ['Umami v2 Events API JSON'],
    runsOn: 'Your own Cloudflare account, or your own computer to try it',
    version: '',
    contractUrl: 'https://github.com/just-every/run-vane/blob/main/CONTRACT.md',
    seoTitle: 'Vane: free, open-source cookie-free analytics',
    seoDescription:
      'Vane is private, cookie-free website analytics in your own account. Count page loads, sources and goals. Free and open source.',
  },
];
