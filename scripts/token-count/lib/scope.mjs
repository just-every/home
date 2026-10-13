// Which working directories count as "building these products": the Just
// Every products and Run Edit Run. Anything that might belong but is not
// certain is reported as `ambiguous` and kept out of the footer's total.
//
//   products   the RER workspace (seeds, worktrees, families, site), its
//              consolidation, fleet and review checkouts, HappyToHelp
//              checkouts, the justevery.com site checkouts, and Claude Code
//              scratchpads of sessions started in any of those
//   ambiguous  related by name or purpose but not certainly product work
//   other      everything else (12ui, outreach, COO, orchestrator, ...)

const USERS = '/Users/(?:zemaj|m1-runner)';
const ROOTS = '(?:www|dev)'; // m1-runner keeps checkouts under ~/dev
const PRODUCT_DIRS = [
  'runeditrun',
  'rer-consolidation',
  'rer-fleet',
  'review',
  'happytohelp[^/]*',
  'just-every/home(?:-[^/]*)?',
];
// Claude Code names a session's scratchpad after its start directory, with
// every '/' and '.' turned into '-': /private/tmp/claude-<uid>/-Users-zemaj-www-runeditrun-...
const PRODUCT_SLUGS = [
  'runeditrun',
  'rer-consolidation',
  'rer-fleet',
  'review',
  'happytohelp',
  'just-every-home(?!brew)',
];

const PRODUCTS = [
  new RegExp(`^${USERS}/${ROOTS}/(?:${PRODUCT_DIRS.join('|')})(?:/|$)`),
  new RegExp(
    `^(?:/private)?/tmp/claude-\\d+/-Users-(?:zemaj|m1-runner)-${ROOTS}-(?:${PRODUCT_SLUGS.join('|')})(?:[-/]|$)`
  ),
];

// Related but not certain; reported, never in the footer total.
const AMBIGUOUS = [
  // An early Zendesk-alternative seed, before the RER workspace.
  new RegExp(`^${USERS}/${ROOTS}/just-every/seeds(?:/|$)`),
  // Vector (just-every/vector) and its review queue: a drafting and
  // publishing fleet, not the RER Vector seed.
  new RegExp(`^${USERS}/${ROOTS}/just-every/(?:vector|review)(?:/|$)`),
  // Seed marketplace prototypes that preceded the RER catalogue.
  new RegExp(`^${USERS}/${ROOTS}/just-every/seed(?:market|place)[^/]*(?:/|$)`),
  // Orchestrator rosters and 12ui design calls made for seeds: the tools'
  // own work, partly in service of the products.
  new RegExp(
    `^${USERS}/${ROOTS}/just-every/orchestrator/\\.worktrees/[^/]*runeditrun`
  ),
  /^\/private\/var\/folders\/[^/]+\/[^/]+\/T\/12ui-/,
];

/**
 * The scope of a call, and the machine it ran on: the owner of its cwd
 * (m1-runner's homes hold copies of Mac sessions; /Users/zemaj does not
 * exist there), else the machine whose logs held it.
 */
export function classify(cwd, foundOn) {
  const machine = cwd.startsWith('/Users/m1-runner/')
    ? 'm1-runner'
    : cwd.startsWith('/Users/zemaj/')
      ? 'mac'
      : foundOn;
  if (PRODUCTS.some(pattern => pattern.test(cwd)))
    return { scope: 'products', machine };
  if (AMBIGUOUS.some(pattern => pattern.test(cwd)))
    return { scope: 'ambiguous', machine };
  return { scope: 'other', machine };
}

/** A readable bucket for reporting: the project root a cwd sits in. */
export function bucketOf(cwd) {
  if (!cwd) return '(no cwd logged)';
  const patterns = [
    new RegExp(`^(${USERS}/${ROOTS}/just-every/[^/]+)`),
    new RegExp(`^(${USERS}/${ROOTS}/[^/]+)`),
    /^((?:\/private)?\/tmp\/claude-\d+\/[^/]+)/,
    /^(\/private\/var\/folders\/[^/]+\/[^/]+\/T\/12ui)-/,
    /^((?:\/private)?\/tmp\/[^/]+)/,
    new RegExp(`^(${USERS}/[^/]+)`),
  ];
  for (const pattern of patterns) {
    const match = cwd.match(pattern);
    if (match) return match[1];
  }
  return cwd;
}
