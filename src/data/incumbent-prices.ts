/**
 * List prices for the rented tools in the hero's "Your current stack" card,
 * each the vendor's popular or entry plan from its own pricing page. Keyed by
 * the tool's name as the seeds spell it (`primaryReplace`). Full research and
 * caveats: the hero-g evidence, incumbent-prices-2026-10-16.json.
 */
export interface IncumbentPrice {
  /**
   * What the hero shows beside the tool, per year: "$240/user", a range
   * where one number would mislead ("$348–$1,584/user"), "$312" for a vendor
   * priced per account, or HIDDEN_PRICE for a vendor that shows no public
   * price (quote-only).
   */
  label: string;
  /** Whether the price is per user (the label then ends in "/user"). */
  perUser: boolean;
  /**
   * A shorter label for phones, where the price must not wrap: a range
   * without its repeated "$", and without "/user" where the row is too tight
   * for it.
   */
  compact?: string;
  /** The plan the price is for. */
  plan: string;
  /** The vendor's pricing page. */
  sourceUrl: string;
  /** When the price was checked. */
  checked: string;
}

/** The label for a vendor that publishes no price. */
export const HIDDEN_PRICE = '$$$$$';

const CHECKED = '2026-10-16';

export const incumbentPrices: Record<string, IncumbentPrice> = {
  Notion: {
    label: '$240/user',
    perUser: true,
    plan: 'Business (Recommended)',
    sourceUrl: 'https://www.notion.com/pricing',
    checked: CHECKED,
  },
  Slack: {
    label: '$180/user',
    perUser: true,
    plan: 'Business+ (Best value)',
    sourceUrl: 'https://slack.com/pricing',
    checked: CHECKED,
  },
  Intercom: {
    label: '$348–$1,584/user',
    perUser: true,
    compact: '$348–1.6k',
    plan: 'Essential to Expert, per seat',
    sourceUrl: 'https://www.intercom.com/pricing',
    checked: CHECKED,
  },
  Calendly: {
    label: '$192/user',
    perUser: true,
    plan: 'Teams (Popular)',
    sourceUrl: 'https://calendly.com/pricing',
    checked: CHECKED,
  },
  Linear: {
    label: '$120/user',
    perUser: true,
    plan: 'Basic',
    sourceUrl: 'https://linear.app/pricing',
    checked: CHECKED,
  },
  HubSpot: {
    label: '$1,080–$1,800/user',
    perUser: true,
    compact: '$1.1–1.8k',
    plan: 'Sales Hub Professional to Enterprise, per seat',
    sourceUrl: 'https://www.hubspot.com/pricing/sales',
    checked: CHECKED,
  },
  Airtable: {
    label: '$240/user',
    perUser: true,
    plan: 'Team',
    sourceUrl: 'https://www.airtable.com/pricing',
    checked: CHECKED,
  },
  Mailchimp: {
    label: '$240–$4,200',
    perUser: false,
    compact: '$240–4.2k',
    plan: 'Standard to Premium, scales with contacts',
    sourceUrl: 'https://mailchimp.com/pricing/marketing/',
    checked: CHECKED,
  },
  Expensify: {
    label: '$60/user',
    perUser: true,
    plan: 'Collect',
    sourceUrl:
      'https://help.expensify.com/articles/expensify-classic/expensify-billing/Billing-Overview',
    checked: CHECKED,
  },
  BambooHR: {
    label: '$120/user',
    perUser: true,
    compact: '$120',
    plan: 'Core',
    sourceUrl: 'https://www.bamboohr.com/pricing',
    checked: CHECKED,
  },
  Sentry: {
    label: '$312',
    perUser: false,
    plan: 'Team',
    sourceUrl: 'https://sentry.io/pricing/',
    checked: CHECKED,
  },
  Pingdom: {
    label: '$120–$1,200',
    perUser: false,
    compact: '$120–1.2k',
    plan: 'Entry tier up, scales with checks',
    sourceUrl: 'https://www.pingdom.com/synthetic-pricing/',
    checked: CHECKED,
  },
};
