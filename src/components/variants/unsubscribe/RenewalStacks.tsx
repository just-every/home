import type { CSSProperties } from 'react';
import { ChevronRight, Mail } from 'lucide-react';

import { seeds } from '@/data/seeds';

import { cardId } from './anchors';
import { Mark } from './Mark';
import p from './page.module.css';
import { ArrowDown, ArrowSweep, Burst, Underline } from './Scribbles';
import s from './stacks.module.css';

const row = (i: number) => ({ '--i': i }) as CSSProperties;

/**
 * The hero device: the renewal emails for the tools you rent, beside the
 * Just Every product you own instead of each one. Each rented tool is struck
 * through as its replacement arrives (instantly when motion is reduced).
 */
export function RenewalStacks() {
  return (
    <div className={s.art}>
      <div className={s.stage}>
        <div className={s.noteFrom}>
          <p className={p.note}>
            From this…
            <br />
            (another renewal email)
          </p>
          <ArrowDown className={s.arrowFrom} />
        </div>

        <div className={s.noteTo}>
          <ArrowSweep className={s.arrowTo} />
          <p className={p.note}>
            …to this.
            <br />
            (you own it)
          </p>
        </div>

        <ul
          className={s.rented}
          aria-label="Renewal emails for the tools you rent"
        >
          {seeds.map((seed, i) => (
            <li key={seed.slug} className={s.email} style={row(i)}>
              <Mail aria-hidden="true" className={s.mail} strokeWidth={1.5} />
              <span className={s.vendor}>
                {seed.primaryReplace}
                <svg
                  className={s.strike}
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M1 5.2C24 3.4 52 5.6 99 3.1" pathLength={1} />
                </svg>
              </span>
              <span className={s.renews}>Renews soon</span>
            </li>
          ))}
        </ul>

        <ul className={s.owned} aria-label="The Just Every products you own">
          {seeds.map((seed, i) => (
            <li key={seed.slug} className={s.ownedRow} style={row(i)}>
              <a href={`#${cardId(seed.slug)}`} className={s.product}>
                <Mark seed={seed} size={22} className={s.mark} />
                <span className={s.productName}>{seed.name}</span>
                <ChevronRight
                  aria-hidden="true"
                  className={s.chevron}
                  strokeWidth={1.8}
                />
              </a>
            </li>
          ))}
        </ul>

        <Burst className={s.burst} />

        <div className={s.noteSame}>
          <p className={p.note}>
            Same work.
            <br />
            Different freedom.
          </p>
          <Underline className={s.underline} />
        </div>
      </div>
    </div>
  );
}
