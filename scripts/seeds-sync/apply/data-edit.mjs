/**
 * Edits one seed's object in a data module (src/data/seeds.ts, upcoming.ts,
 * seed-pages.ts) as text, so the comments and layout around it stay; the
 * apply step runs Prettier over every file it touched afterwards.
 *
 * Each module is an array of object literals at two spaces, with properties
 * at four: `    slug: 'uptime',` names the object.
 */
const PROPERTY_START = /\n {4}(?:\/\/|[A-Za-z_$][\w$]*\s*:)|\n {2}\}/g;

/** The [start, end) of the object holding `slug: '<slug>'`. */
function objectSpan(text, slug) {
  const at = text.indexOf(`\n    slug: '${slug}',`);
  if (at < 0) throw new Error(`no object with slug '${slug}'`);
  const start = text.lastIndexOf('\n  {\n', at);
  const end = text.indexOf('\n  },', at);
  if (start < 0 || end < 0)
    throw new Error(`cannot find the bounds of '${slug}'`);
  return [start, end];
}

/** The [valueStart, valueEnd) of `prop` in the object (value without its comma). */
function valueSpan(text, slug, prop) {
  const [start, end] = objectSpan(text, slug);
  const key = new RegExp(`\\n {4}${prop}\\s*:`, 'g');
  key.lastIndex = start;
  const match = key.exec(text);
  if (!match || match.index > end) return null;
  const valueStart = match.index + match[0].length;
  PROPERTY_START.lastIndex = valueStart;
  const next = PROPERTY_START.exec(text);
  let valueEnd = next ? next.index : end;
  while (/[\s,]/.test(text[valueEnd - 1])) valueEnd--;
  return [valueStart, valueEnd, match.index];
}

/** The property's value as written (source text), or null. */
export function readProp(text, slug, prop) {
  const span = valueSpan(text, slug, prop);
  return span ? text.slice(span[0], span[1]).trim() : null;
}

/** Replaces the property's value with `source` (TypeScript source text). */
export function setProp(text, slug, prop, source) {
  const span = valueSpan(text, slug, prop);
  if (!span) throw new Error(`'${slug}' has no ${prop}`);
  return `${text.slice(0, span[0])} ${source}${text.slice(span[1])}`;
}

/** The `//` comment lines directly above the property, as one string. */
export function readComment(text, slug, prop) {
  const span = valueSpan(text, slug, prop);
  if (!span) return null;
  const lines = text.slice(0, span[2]).split('\n');
  const comment = [];
  for (let i = lines.length - 1; i >= 0 && /^ {4}\/\//.test(lines[i]); i--)
    comment.unshift(lines[i].replace(/^ {4}\/\/ ?/, ''));
  return comment.length ? comment.join(' ') : null;
}

/** Replaces (or removes, with null) the comment lines above the property. */
export function setComment(text, slug, prop, comment) {
  const span = valueSpan(text, slug, prop);
  if (!span) throw new Error(`'${slug}' has no ${prop}`);
  const before = text.slice(0, span[2]);
  const lines = before.split('\n');
  let first = lines.length;
  while (first > 0 && /^ {4}\/\//.test(lines[first - 1])) first--;
  const kept = lines.slice(0, first);
  if (comment) kept.push(...wrapComment(comment));
  return `${kept.join('\n')}${text.slice(span[2])}`;
}

/** A comment wrapped at 80 columns, four spaces in. */
function wrapComment(comment) {
  const lines = [];
  let line = '    //';
  for (const word of comment.split(/\s+/)) {
    if (line.length + word.length + 1 > 80 && line !== '    //') {
      lines.push(line);
      line = '    //';
    }
    line += ` ${word}`;
  }
  lines.push(line);
  return lines;
}

/** A string as a TypeScript literal. */
export const str = value =>
  `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
export const strArray = values => `[${values.map(str).join(', ')}]`;
export const strOrNull = value => (value === null ? 'null' : str(value));
