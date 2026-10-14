import type { ReactNode } from 'react';

import type { HeroStyles } from '../Hero';

/**
 * The owner's new hero copy of 14 Oct, tried in the preview looks:
 * new1 is a one-line headline over the whole line; new2 carries the turn
 * ("But it is.") in the headline's second line, in the muted ink; new3 is
 * the shorter "Every SaaS. Just Free." over a line that names the products.
 */
export type HeroCopy = 'new1' | 'new2' | 'new3';

export const heroCopyLabel: Record<HeroCopy, string> = {
  new1: 'New copy 1: one-line headline',
  new2: 'New copy 2: two-line headline',
  new3: 'New copy 3: Every SaaS. Just Free.',
};

/** Words that stay together: a hyphenated word, or a short phrase. */
const Together = ({ children }: { children: ReactNode }) => (
  <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
);

const alternatives = (
  <>
    Beautifully made, <Together>open-source</Together> alternatives to Notion,
    Linear, Intercom and more.
  </>
);

/**
 * The headline and line for `copy`. Each half of "Too good to be free." is
 * kept whole so a narrow column breaks between them, never inside; copy 3's
 * second line ("Just Free.") is the muted turn, as copy 2's is.
 */
export function heroCopy(
  copy: HeroCopy,
  styles: HeroStyles
): { title: ReactNode; line: ReactNode } {
  if (copy === 'new3')
    return {
      title: (
        <>
          <Together>Every SaaS.</Together>{' '}
          <span className={styles.turn}>Just Free.</span>
        </>
      ),
      line: alternatives,
    };
  const first = (
    <>
      <Together>Too good</Together> <Together>to be free.</Together>
    </>
  );
  if (copy === 'new1')
    return {
      title: first,
      line: <>But it is. {alternatives}</>,
    };
  return {
    title: (
      <>
        {first} <span className={styles.turn}>But it is.</span>
      </>
    ),
    line: alternatives,
  };
}
