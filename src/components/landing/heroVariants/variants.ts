import type { ChromeTone } from '../Header';
import { type Layout, type Look, look } from './looks';

/** One header and hero layout, in each header colour it comes in. */
export interface HeroGroup {
  key: string;
  /** A to F; none for today's page, shown for comparison. */
  letter?: string;
  name: string;
  summary: string;
  variants: HeroVariant[];
}

export interface HeroVariant {
  /** The preview route's id: /preview/hero/<id>. */
  id: string;
  chrome: ChromeTone;
  title: string;
  look: Look;
}

const layouts: {
  key: string;
  letter?: string;
  name: string;
  summary: string;
  layout: Layout;
  tones: ChromeTone[];
}[] = [
  {
    key: 'now',
    name: 'Today',
    summary:
      'For comparison: the live page, and the black header trial on the same hero.',
    layout: 'now',
    tones: ['light', 'dark'],
  },
  {
    key: 'a',
    letter: 'A',
    name: 'Spacious',
    summary:
      'Today’s composition scaled up: a viewport-tall hero, a two-line headline, a bigger shelf and more air all round.',
    layout: 'spacious',
    tones: ['light', 'dark'],
  },
  {
    key: 'b',
    letter: 'B',
    name: 'Stage',
    summary:
      'The header stands alone; the hero is a rounded stage set in below it, headline left and a larger shelf right.',
    layout: 'stage',
    tones: ['light', 'dark'],
  },
  {
    key: 'c',
    letter: 'C',
    name: 'Stacked',
    summary:
      'Headline, line and buttons centred above; the shelf below across most of the page, plant and light at its end.',
    layout: 'stacked',
    tones: ['light', 'dark'],
  },
  {
    key: 'd',
    letter: 'D',
    name: 'Overlay',
    summary:
      'The header floats on the hero’s room (a dark glass bar in the dark look); a full-height hero with the shelf running off the edge.',
    layout: 'overlay',
    tones: ['light', 'dark'],
  },
  {
    key: 'e',
    letter: 'E',
    name: 'Dark stage',
    summary:
      'The black header flows into a dark hero of the same ink: the shelf lit warm on a dark floor, and the light page rising over its foot.',
    layout: 'night',
    tones: ['dark'],
  },
  {
    key: 'f',
    letter: 'F',
    name: 'Split',
    summary:
      'Header and hero share one frame: a solid panel with the wordmark and copy, beside the lit room with the menu and the shelf.',
    layout: 'split',
    tones: ['light', 'dark'],
  },
];

const toneName: Record<ChromeTone, string> = {
  light: 'light header',
  dark: 'dark header',
};

export const heroGroups: HeroGroup[] = layouts.map(group => ({
  key: group.key,
  letter: group.letter,
  name: group.name,
  summary: group.summary,
  variants: group.tones.map(tone => ({
    id: group.tones.length > 1 ? `${group.key}-${tone}` : group.key,
    chrome: tone,
    title: `${group.letter ? `${group.letter}. ` : ''}${group.name}, ${toneName[tone]}`,
    look: look(group.layout, tone),
  })),
}));

export const heroVariants: HeroVariant[] = heroGroups.flatMap(
  group => group.variants
);

export const heroVariant = (id: string) =>
  heroVariants.find(variant => variant.id === id);
