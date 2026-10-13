/** In-page anchors shared by the hero, the collection and the reels. */

/** A product's card in the collection. */
export const cardId = (slug: string) => `p-${slug}`;

/** A reel's tab; linking to it also selects that reel. */
export const watchId = (slug: string) => `watch-${slug}`;
