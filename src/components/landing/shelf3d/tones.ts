/**
 * The room the box set stands in: the page's own light room, or a dark
 * stage lit by the same warm window. The volumes are lit the same in both;
 * only the room around them changes.
 */
export type ShelfTone = 'light' | 'dark';

export interface ScenePalette {
  /** What far volumes fade towards: the room around the row's far end. */
  haze: string;
  /** The lit floor under the row, and how strongly it shows. */
  floor: string;
  floorOpacity: number;
  /** The contact shadow under the row. */
  shadow: string;
  /** Light bounced up off the floor. */
  ground: string;
  /** The window's light. */
  key: string;
  keyIntensity: number;
}

export const PALETTES: Record<ShelfTone, ScenePalette> = {
  light: {
    haze: '#ece9f7',
    floor: '#fbfaff',
    floorOpacity: 0.7,
    shadow: '#282338',
    ground: '#e6e3f1',
    key: '#fffdfb',
    keyIntensity: 0.5,
  },
  dark: {
    haze: '#2a2529',
    floor: '#8a7466',
    floorOpacity: 0.32,
    shadow: '#000000',
    ground: '#b7aab0',
    key: '#ffe7cf',
    keyIntensity: 0.75,
  },
};
