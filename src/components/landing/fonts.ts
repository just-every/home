import { Inter, Kalam } from 'next/font/google';

/** Inter with optical sizes, so headlines use its display cut as in the design. */
export const sans = Inter({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-label-sans',
  display: 'swap',
});

/** The handwritten notes on the contact page and in the articles. */
export const handwriting = Kalam({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
});
