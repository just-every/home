import { DM_Sans, IBM_Plex_Mono, Kalam, VT323 } from 'next/font/google';

/** The 12ui design's faces: DM Sans for the headline and line. */
export const display = DM_Sans({
  weight: ['400', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--hb-sans',
});

/** The terminal card, the buttons and the benefits. */
export const mono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--hb-mono',
});

/** The pixel eyebrow, the card's arrow and the sign. */
export const pixel = VT323({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--hb-pixel',
});

/** The handwritten notes. */
export const hand = Kalam({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
  variable: '--hb-hand',
});
