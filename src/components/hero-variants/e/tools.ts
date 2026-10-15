import { volumes, type Volume } from '@/components/landing/volumes';

/** A tool a visitor may rent, and the seed that replaces it. */
export interface RentedTool {
  name: string;
  volume: Volume;
}

/**
 * The seven pairs the design shows side by side, in its order: each seed's
 * own primaryReplace, so "Notion" sits across from Slate.
 */
const SHOWN = [
  'slate',
  'nook',
  'happytohelp',
  'dial',
  'vector',
  'orbit',
  'cradle',
];

const isShown = (volume: Volume) => SHOWN.includes(volume.slug);

export const shownVolumes: Volume[] = SHOWN.flatMap(slug =>
  volumes.filter(volume => volume.slug === slug)
);

export const shownTools: RentedTool[] = shownVolumes.map(volume => ({
  name: volume.seed.primaryReplace,
  volume,
}));

/** The seeds behind the switch card's "+ N more" row, in collection order. */
export const restVolumes: Volume[] = volumes.filter(volume => !isShown(volume));

/** The other seeds' primary incumbents: the first group under "+ N more". */
export const moreTools: RentedTool[] = restVolumes.map(volume => ({
  name: volume.seed.primaryReplace,
  volume,
}));

/**
 * Every other incumbent a seed lists in `replaces`, once each (the first
 * seed that lists it wins), alphabetically: so a visitor on Jira finds Vector.
 */
export const alsoTools: RentedTool[] = (() => {
  const seen = new Set(volumes.map(volume => volume.seed.primaryReplace));
  const tools: RentedTool[] = [];
  for (const volume of volumes) {
    for (const name of volume.seed.replaces) {
      if (seen.has(name)) continue;
      seen.add(name);
      tools.push({ name, volume });
    }
  }
  return tools.sort((a, b) => a.name.localeCompare(b.name));
})();

const byName = new Map(
  [...shownTools, ...moreTools, ...alsoTools].map(tool => [tool.name, tool])
);

export function toolNamed(name: string): RentedTool | null {
  return byName.get(name) ?? null;
}
