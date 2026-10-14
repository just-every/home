import type { ChromeTone } from '../Header';
import type { HeroStyles } from '../Hero';
import type { HeroCopy } from './copy';
import type { ShelfPoster } from '../shelf3d/Shelf';
import type { ShelfTone } from '../shelf3d/tones';
import copyCss from './copy.module.css';
import note from './note.module.css';
import night from './night.module.css';
import overlay from './overlay.module.css';
import { layoutPoster } from './posters';
import spacious from './spacious.module.css';
import split from './split.module.css';
import stacked from './stacked.module.css';
import stage from './stage.module.css';

/**
 * A look for the landing page's top: the header's colour and the hero's
 * layout, with the classes, shelf room and poster that go with them. The
 * live page has none and keeps its own header and hero.
 */
export interface Look {
  chrome: ChromeTone;
  /** On the page's root: a layout's tokens (header height, insets). */
  page?: string;
  header?: string;
  hero?: HeroStyles;
  poster?: ShelfPoster;
  shelfTone?: ShelfTone;
  /** A preview's own headline and line, in place of the page's. */
  copy?: HeroCopy;
}

export type Layout =
  | 'now'
  | 'spacious'
  | 'stage'
  | 'stacked'
  | 'overlay'
  | 'night'
  | 'split';

type Module = Readonly<Record<string, string>>;

const modules: Record<Exclude<Layout, 'now'>, Module> = {
  spacious,
  stage,
  stacked,
  overlay,
  night,
  split,
};

const join = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(' ') || undefined;

/** The page's top in `layout`, with the header in `chrome` and any new copy. */
export function look(
  layout: Layout,
  chrome: ChromeTone,
  copy?: HeroCopy
): Look {
  if (layout === 'now') return { chrome, copy };
  const css = modules[layout];
  const dark = chrome === 'dark';
  return {
    chrome,
    page: join(css.page, dark && css.dark),
    header: join(css.header, dark && css.headerDark),
    hero: {
      ...css,
      note: join(note.note, css.note) ?? note.note,
      noteArrow: note.noteArrow,
      noteText: note.noteText,
      turn: copyCss.turn,
    },
    poster: layoutPoster(layout),
    shelfTone: layout === 'night' ? 'dark' : 'light',
    copy,
  };
}
