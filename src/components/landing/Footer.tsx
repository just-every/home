import Link from 'next/link';

import { footer } from '@/content/landing';
import { seeds } from '@/data/seeds';
import { upcoming } from '@/data/upcoming';

import ui from './label.module.css';
import { FooterMotion } from './FooterMotion';
import { FooterNote, notedItem } from './FooterNote';
import { Logo } from './Logo';
import styles from './footer.module.css';
import { TokenCount } from './TokenCount';

/** A column of links under a small heading; a link may carry a note. */
type FooterGroup = {
  heading: string;
  links: readonly { label: string; href: string; note?: string }[];
};

/**
 * The illustrated footer (owner's pick B3, 15 Oct): a flat landscape in the
 * collection's pastels as a full-bleed band that runs to the bottom of the
 * page, with the wordmark, the token line and the site's links set over its
 * sky. The art is one static SVG (traced shapes coloured by region;
 * scripts/footer-colours.mjs sets the colourway), loaded lazily as an image
 * so the page's HTML stays light, with its moving parts laid over it as
 * small images of their own (FooterMotion, scripts/footer-motion.mjs). The
 * products link carries a handwritten "(so far)" (FooterNote).
 *
 * `rise`: the page above ends on an opaque card, so the art may rise behind
 * it (by the stylesheet's --rise), the tree's crown growing out from under
 * the card. Pages that end on bare text leave it off.
 */
export function Footer({ rise = false }: { rise?: boolean }) {
  const count = seeds.length + upcoming.length;
  const groups: readonly FooterGroup[] = [
    {
      heading: footer.products.heading,
      links: [
        {
          label: footer.products.label(count),
          href: footer.products.href,
          note: footer.products.note,
        },
      ],
    },
    ...footer.groups,
  ];
  return (
    <footer
      className={rise ? `${styles.footer} ${styles.rise}` : styles.footer}
    >
      <div className={styles.scene}>
        <div className={`${ui.wrap} ${styles.top}`}>
          <div className={styles.text}>
            <div className={styles.mark}>
              {/* The page links to itself: no prefetch needed. */}
              <Link className={styles.brand} href="/" prefetch={false}>
                <Logo />
              </Link>
              <TokenCount />
            </div>
            <nav aria-label="Footer" className={styles.nav}>
              {groups.map(group => (
                <div key={group.heading} className={styles.group}>
                  <h2 className={styles.heading}>{group.heading}</h2>
                  <ul className={styles.links}>
                    {group.links.map(link => (
                      <li
                        key={link.label}
                        className={link.note ? notedItem : undefined}
                      >
                        <a href={link.href}>{link.label}</a>
                        {link.note ? <FooterNote text={link.note} /> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
        {/* The art's box shows its crop; the canvas inside is the whole art. */}
        <div className={styles.art}>
          <div className={styles.canvas}>
            {/* An SVG: next/image would only pass it through. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.paint}
              src="/landing/footer/footer-art.svg"
              width={7040}
              height={2186}
              alt="A person with a laptop and a white dog sit under a big tree on a grassy hill, looking over a bay at the setting sun, with a small village and cypress trees beyond."
              loading="lazy"
              decoding="async"
            />
            <FooterMotion />
          </div>
        </div>
      </div>
    </footer>
  );
}
