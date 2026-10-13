export interface ShelfVolume {
  slug: string;
  name: string;
  number: string;
  colour: string;
  ink: string;
  mark: string;
  tagline: string | null;
  href: string;
}
// number is "01"; colour = spine colour (hex); ink = text and mark colour on that spine (hex); mark = URL of an SVG mark; tagline = text for a featured cover; href = anchor of that product's card on the page.
