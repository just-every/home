import { reels } from '@/content/landing';
import { seeds } from '@/data/seeds';

import { ReelShowcase, type ReelSeed } from './ReelShowcase';

/** Every seed with a reel, in collection order; new reels appear on their own. */
const reelSeeds: ReelSeed[] = seeds
  .filter(seed => seed.reel)
  .map(
    ({
      slug,
      name,
      line,
      headline,
      repo,
      reel,
      mark,
      markLight,
      markInk,
      accent,
      paper,
    }) => ({
      slug,
      name,
      line,
      headline,
      repo,
      reel,
      mark,
      markLight,
      markInk,
      accent,
      paper,
    })
  );

export function Running() {
  if (reelSeeds.length === 0) return null;
  return (
    <ReelShowcase
      id={reels.id}
      heading={reels.heading}
      line={reels.line}
      githubLabel={reels.githubLabel}
      reelSeeds={reelSeeds}
    />
  );
}
