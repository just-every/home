import { numberWord } from '@/lib/number-word';

/**
 * Page metadata, following the hero (hero G): its headline, "Stop renting
 * your software.", and its switch from the tools a team rents to open
 * source it owns.
 */
export const heroCopy = {
  first: 'Stop renting',
  second: 'your software.',
  subhead: (released: number, coming: number) =>
    `Switch to free, open-source alternatives for the tools your team already uses. ${numberWord(released, true)} are out now, with ${numberWord(coming)} more on the way. MIT licensed, forever yours.`,
} as const;

export const siteMeta = {
  name: 'Just Every',
  url: 'https://justevery.com',
  title: 'Just Every · Stop renting your software.',
  description:
    'Switch from Notion, Slack, Intercom, Calendly and more to free, open-source alternatives you own. MIT licensed, yours to change.',
  ogTitle: `${heroCopy.first} ${heroCopy.second}`,
  ogImage: {
    url: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'The Just Every headline “Stop renting your software.” on a dusk sky, between a card of rented tools and their yearly prices under a cloud raining dollar signs and coins, and a card of their free, open-source replacements in the sun.',
  },
  githubUrl: 'https://github.com/just-every',
} as const;
