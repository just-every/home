/** What the shelf needs to draw one volume. */
export interface ShelfVolume {
  slug: string;
  name: string;
  /** The kind of product, one or two words: 'Support', 'Monitoring'. */
  family: string;
  /** Two-digit volume number: "01" upward. */
  number: string;
  /** The harmonised spine colour, hex. */
  colour: string;
  /** Text and mark colour on that spine (the brand ink), hex. */
  ink: string;
  /** URL of the SVG mark to print on the spine, already recoloured if needed. */
  mark: string;
  /** The product's own headline, for a featured cover. */
  tagline: string | null;
  /** Anchor of the product's card on the page. */
  href: string;
}
