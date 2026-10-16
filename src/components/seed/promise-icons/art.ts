/**
 * A promise icon's art: flat painted layers on a 48 box, drawn back to
 * front, and the soft tint of its hue family (lavender, blue, pink, peach or
 * aqua, from the footer's dusk-mist palette) for the card it leads.
 */
export interface PromiseArt {
  tint: string;
  layers: readonly (readonly [fill: string, d: string])[];
}
