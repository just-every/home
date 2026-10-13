/** What the search needs to know about a volume. */
export interface SearchVolume {
  slug: string;
  number: string;
  name: string;
  category: string;
  replaces: string[];
  primaryReplace: string;
  line: string;
}

const STOP_WORDS = new Set(
  'a an and app apps at by for from i in is it like my of on or our software that the this to tool tools use using we with you your'.split(
    ' '
  )
);

function words(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/** The typed words that count: two letters or more, not filler. */
export function queryTokens(query: string): string[] {
  return words(query).filter(word => word.length >= 2 && !STOP_WORDS.has(word));
}

interface Indexed<T extends SearchVolume> {
  volume: T;
  name: string[];
  replaces: string[];
  category: string[];
  line: string[];
  wholeNames: string[];
}

export function indexVolumes<T extends SearchVolume>(
  volumes: T[]
): Indexed<T>[] {
  return volumes.map(volume => ({
    volume,
    name: words(volume.name),
    replaces: volume.replaces.flatMap(words),
    category: words(volume.category),
    line: words(volume.line),
    wholeNames: [volume.name, ...volume.replaces].map(name =>
      name.toLowerCase()
    ),
  }));
}

const hasPrefix = (list: string[], token: string) =>
  list.some(word => word.startsWith(token));

/**
 * Instant, on-device matching while the visitor types: every typed word must
 * start a word in the volume's name, the products it replaces, its category
 * or its line. Names and replaced products rank above categories, then lines.
 */
export function localMatches<T extends SearchVolume>(
  index: Indexed<T>[],
  query: string
): T[] {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];
  const whole = query.trim().toLowerCase();

  const scored: { volume: T; score: number }[] = [];
  for (const entry of index) {
    let score = entry.wholeNames.some(name => name.startsWith(whole)) ? 20 : 0;
    let every = true;
    for (const token of tokens) {
      if (hasPrefix(entry.name, token)) score += 10;
      else if (hasPrefix(entry.replaces, token)) score += 8;
      else if (hasPrefix(entry.category, token)) score += 4;
      else if (hasPrefix(entry.line, token)) score += 2;
      else {
        every = false;
        break;
      }
    }
    if (every) scored.push({ volume: entry.volume, score });
  }
  return scored
    .sort(
      (a, b) =>
        b.score - a.score || a.volume.number.localeCompare(b.volume.number)
    )
    .map(({ volume }) => volume);
}

/**
 * The incumbent to name on a card: the one the visitor typed, when they named
 * one this volume replaces ("Zendesk" shows "Alternative to Zendesk"), else
 * the volume's usual one.
 */
export function namedReplace(volume: SearchVolume, query: string): string {
  const typed = query.trim().toLowerCase();
  const tokens = queryTokens(query);
  const hit = volume.replaces.find(name => {
    const lower = name.toLowerCase();
    return (
      lower === typed ||
      (tokens.length > 0 && tokens.every(token => words(lower).includes(token)))
    );
  });
  return hit ?? volume.primaryReplace;
}
