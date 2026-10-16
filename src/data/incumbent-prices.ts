/**
 * List prices for the rented tools in the hero's "Your current stack" card,
 * each the vendor's popular or entry plan from its own pricing page. Keyed by
 * the tool's name as the seeds spell it (`primaryReplace`). Full research and
 * caveats: the hero-g evidence, incumbent-prices-2026-10-16.json.
 */
export interface IncumbentPrice {
  /**
   * What the hero shows beside the tool: "$26/mo", a range where one number
   * would mislead ("$29–$132/mo"), or HIDDEN_PRICE for a vendor that shows no
   * public price (quote-only).
   */
  label: string;
  /** A shorter label for phones, where a range must not wrap. */
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
    label: '$20/mo',
    plan: 'Business (Recommended)',
    sourceUrl: 'https://www.notion.com/pricing',
    checked: CHECKED,
  },
  Slack: {
    label: '$15/mo',
    plan: 'Business+ (Best value)',
    sourceUrl: 'https://slack.com/pricing',
    checked: CHECKED,
  },
  Intercom: {
    label: '$29–$132/mo',
    compact: '$29–132',
    plan: 'Essential to Expert, per seat',
    sourceUrl: 'https://www.intercom.com/pricing',
    checked: CHECKED,
  },
  Calendly: {
    label: '$16/mo',
    plan: 'Teams (Popular)',
    sourceUrl: 'https://calendly.com/pricing',
    checked: CHECKED,
  },
  Linear: {
    label: '$10/mo',
    plan: 'Basic',
    sourceUrl: 'https://linear.app/pricing',
    checked: CHECKED,
  },
  HubSpot: {
    label: '$90–$150/mo',
    compact: '$90–150',
    plan: 'Sales Hub Professional to Enterprise, per seat',
    sourceUrl: 'https://www.hubspot.com/pricing/sales',
    checked: CHECKED,
  },
  Airtable: {
    label: '$20/mo',
    plan: 'Team',
    sourceUrl: 'https://www.airtable.com/pricing',
    checked: CHECKED,
  },
  Mailchimp: {
    label: '$20–$350/mo',
    compact: '$20–350',
    plan: 'Standard to Premium, scales with contacts',
    sourceUrl: 'https://mailchimp.com/pricing/marketing/',
    checked: CHECKED,
  },
  Expensify: {
    label: '$5/mo',
    plan: 'Collect',
    sourceUrl:
      'https://help.expensify.com/articles/expensify-classic/expensify-billing/Billing-Overview',
    checked: CHECKED,
  },
  BambooHR: {
    label: '$10/mo',
    plan: 'Core',
    sourceUrl: 'https://www.bamboohr.com/pricing',
    checked: CHECKED,
  },
  Sentry: {
    label: '$26/mo',
    plan: 'Team',
    sourceUrl: 'https://sentry.io/pricing/',
    checked: CHECKED,
  },
  Pingdom: {
    label: '$10–$100/mo',
    compact: '$10–100',
    plan: 'Entry tier up, scales with checks',
    sourceUrl: 'https://www.pingdom.com/synthetic-pricing/',
    checked: CHECKED,
  },
};
