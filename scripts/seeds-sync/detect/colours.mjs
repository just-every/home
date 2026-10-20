/**
 * (b) Brand colours. A seed's colours on the site (accent, ink, paper; a
 * coming-soon seed has only its pastel) each follow a token in its sources:
 * src/branding.json, the --rer-* colours of public/rer-theme.css, or the live
 * homepage's computed colours. Which token a colour follows is found by
 * value: the token that held the site's value at the last sync, the
 * highest-precedence one when several did. When that token's value has
 * moved, the colour moves with it. A colour that follows no token (picked by
 * hand, often from the mark) is left; its sources' changes are reported.
 *
 * The pastel follows the colour whose hue it keeps: the accent, else the
 * ink (within HUE_TOLERANCE degrees), and is re-derived by the recipe in
 * lib/pastel.mjs when that colour moves. A pastel taken from a mark colour
 * stays, unless the brand had no hue of its own (near-black, or Base's
 * #356c60) and now has one.
 */
import { isNeutral, oklch, pastelOf } from '../lib/pastel.mjs';

/** Tokens the sync keeps: the brand's own, not status or code colours. */
export const TRACKED =
  /^(branding\..+|theme\.(page|text|accent|link|focus)|live\..+)$/;

const PRECEDENCE = {
  accent: [
    'branding.primaryColor',
    'branding.accent',
    'branding.color',
    'branding.markColor',
    'theme.accent',
    'live.action',
    'theme.focus',
    'theme.link',
  ],
  ink: [
    'theme.text',
    'live.text',
    'branding.color',
    'branding.primaryColor',
    'theme.accent',
    'theme.link',
    'theme.focus',
  ],
  paper: ['theme.page', 'live.page', 'live.themeColor'],
  pastel: [
    'branding.primaryColor',
    'branding.accent',
    'branding.color',
    'theme.accent',
    'live.action',
    'theme.focus',
    'theme.link',
    'theme.text',
    'live.text',
  ],
};
const rank = (field, token) => {
  const index = PRECEDENCE[field].indexOf(token);
  return index < 0 ? 100 : index;
};

const BASE_DEFAULT = '#356c60';
export const HUE_TOLERANCE = 25;

const hueGap = (a, b) => {
  const d = Math.abs(oklch(a).h - oklch(b).h) % 360;
  return Math.min(d, 360 - d);
};
const keepsHue = (pastel, colour) =>
  Boolean(colour) &&
  !isNeutral(colour) &&
  hueGap(pastel, colour) <= HUE_TOLERANCE;

export const tokenLabel = token => {
  const [source, name] = [
    token.slice(0, token.indexOf('.')),
    token.slice(token.indexOf('.') + 1),
  ];
  if (source === 'branding') return `src/branding.json ${name}`;
  if (source === 'theme') return `its rer-theme ${name}`;
  return {
    page: 'its homepage background',
    text: 'its homepage headline colour',
    action: 'its homepage button colour',
    themeColor: 'its homepage theme-color',
  }[name];
};

export const tracked = tokens =>
  Object.fromEntries(
    Object.entries(tokens).filter(([key]) => TRACKED.test(key))
  );

/** The token a site colour follows: equal at the baseline, by precedence. */
function follows(field, value, baseline) {
  const bound = Object.keys(baseline)
    .filter(token => baseline[token] === value)
    .sort((a, b) => rank(field, a) - rank(field, b) || a.localeCompare(b));
  return bound[0] ?? null;
}

/**
 * `baseline`: tracked tokens at the last sync (live tokens only where a
 * sync has recorded them; otherwise today's stand in, which can bind but
 * never move). `current`: tracked tokens now.
 */
export function detectColours(seed, baseline, current) {
  const base = { ...current, ...baseline };
  const findings = [];
  const updates = {};
  const notes = [];
  const sources = {};

  const fields = seed.kind === 'released' ? ['accent', 'ink', 'paper'] : [];
  for (const field of fields) {
    const value = seed.colours[field];
    const token = follows(field, value, base);
    sources[field] = token;
    if (!token || current[token] === value) continue;
    if (!current[token]) {
      notes.push(
        `${field} ${value} followed ${tokenLabel(token)}, which the repo no longer declares`
      );
      continue;
    }
    updates[field] = { from: value, to: current[token], token };
  }

  // The pastel: which colour's hue it keeps, and whether that colour moved.
  const pastel = seed.colours.pastel;
  let pastelSource = null;
  if (seed.kind === 'released') {
    const after = field => updates[field]?.to ?? seed.colours[field];
    const from = ['accent', 'ink'].find(field =>
      keepsHue(pastel, seed.colours[field])
    );
    if (from) {
      pastelSource = { kind: 'field', field: from, token: sources[from] };
      if (updates[from]) {
        if (isNeutral(after(from)))
          notes.push(
            `pastel followed the ${from}, now ${after(from)}, which has no hue: pick a pastel by hand`
          );
        else
          updates.pastel = {
            from: pastel,
            to: pastelOf(after(from)),
            basis: `the ${from} ${after(from)}`,
            token: sources[from],
          };
      }
    } else if (
      updates.accent &&
      isNeutral(updates.accent.from) &&
      !isNeutral(updates.accent.to)
    ) {
      updates.pastel = {
        from: pastel,
        to: pastelOf(updates.accent.to),
        basis: `the accent ${updates.accent.to}`,
        token: sources.accent,
      };
    }
  } else {
    const bound = Object.keys(base)
      .filter(token => keepsHue(pastel, base[token]))
      .sort(
        (a, b) => rank('pastel', a) - rank('pastel', b) || a.localeCompare(b)
      );
    const token = bound[0] ?? null;
    pastelSource = token ? { kind: 'token', token } : null;
    const brandWas = base['branding.primaryColor'];
    const brandIs = current['branding.primaryColor'];
    let to = null;
    if (token && current[token] && current[token] !== base[token])
      to = { colour: current[token], token };
    else if (
      !token &&
      brandIs &&
      brandIs !== brandWas &&
      (!brandWas || brandWas === BASE_DEFAULT || isNeutral(brandWas)) &&
      !isNeutral(brandIs)
    )
      to = { colour: brandIs, token: 'branding.primaryColor' };
    if (to) {
      if (isNeutral(to.colour))
        notes.push(
          `pastel followed ${tokenLabel(to.token)}, now ${to.colour}, which has no hue: pick a pastel by hand`
        );
      else if (pastelOf(to.colour) !== pastel)
        updates.pastel = {
          from: pastel,
          to: pastelOf(to.colour),
          basis: `${tokenLabel(to.token)} ${to.colour}`,
          token: to.token,
        };
    }
  }

  // Every tracked token that moved; live ones only once a sync recorded them.
  const liveRecorded = Object.keys(baseline).some(token =>
    token.startsWith('live.')
  );
  const moved = Object.keys({ ...baseline, ...current })
    .filter(token => liveRecorded || !token.startsWith('live.'))
    .filter(token => baseline[token] !== current[token])
    .sort()
    .map(token => ({
      token,
      from: baseline[token] ?? null,
      to: current[token] ?? null,
    }));

  if (Object.keys(updates).length || moved.length || notes.length) {
    const applied = Object.entries(updates).map(
      ([field, u]) => `${field} ${u.from} -> ${u.to}`
    );
    findings.push({
      type: 'colours',
      summary: applied.length
        ? `brand colours changed: ${applied.join(', ')}`
        : `brand tokens changed, site colours unchanged: ${moved
            .slice(0, 4)
            .map(m => `${m.token} ${m.from ?? 'none'} -> ${m.to ?? 'gone'}`)
            .join(', ')}${moved.length > 4 ? ', ...' : ''}`,
      details: { updates, moved, sources, pastelSource },
      apply: Object.keys(updates).length
        ? { colours: { updates, sources } }
        : null,
      manual: notes.length ? notes.join('; ') : null,
    });
  }
  return { findings, pastelSource, updates };
}
