/**
 * Runs every check for one seed and assembles what the state keeps for it.
 * A seed whose repo or live homepage cannot be read is unreadable: nothing
 * else is checked and nothing about it changes.
 */
import { readFileSync } from 'node:fs';

import { sha256 } from '../lib/image.mjs';
import { readComment } from '../apply/data-edit.mjs';
import { brandTokens, liveTokens } from '../sources/repo.mjs';
import { detectColours, tracked } from './colours.mjs';
import { copyHashes, detectCopy } from './copy.mjs';
import { detectHomepage } from './homepage.mjs';
import { detectMark, pastelLeftBehind } from './marks.mjs';
import { detectReleases } from './releases.mjs';

/** A finding's identity, so one already reported is not news next time. */
const keyOf = finding =>
  sha256(`${finding.type}:${finding.summary}`).slice(0, 12);

export async function detectSeed({
  seed,
  repo,
  home,
  previous,
  override,
  site,
  texts,
}) {
  if (repo.error) return { seed, status: 'unreadable', reason: repo.error };
  const homepage = await detectHomepage(
    seed,
    home,
    previous?.home,
    override,
    site
  );
  if (homepage.unreadable)
    return { seed, status: 'unreadable', reason: homepage.unreadable };

  const current = {
    ...tracked(brandTokens(repo.files)),
    ...liveTokens(home?.ok ? home : null),
  };
  const colours = detectColours(seed, previous?.brand ?? current, current);
  const marks = await detectMark(seed, repo, site);
  // A pastel that keeps a brand colour's hue (rather than a mark colour's)
  // does not depend on the mark.
  const { pastelSource } = colours;
  const pastelFollowsBrand =
    pastelSource &&
    (pastelSource.kind === 'field' || Boolean(current[pastelSource.token]));
  for (const finding of marks) {
    if (
      !(finding.apply?.mark || finding.pending) ||
      colours.updates.pastel ||
      pastelFollowsBrand
    )
      continue;
    const colour = pastelLeftBehind(
      readComment(texts[seed.kind], seed.slug, 'pastel'),
      readFileSync(site.publicPath(seed.marks.mark)),
      repo.files.mark
    );
    if (colour)
      finding.manual = [
        finding.manual,
        `the pastel was taken from ${colour}, which the new mark no longer uses: pick it again`,
      ]
        .filter(Boolean)
        .join('; ');
  }

  const findings = [
    ...marks,
    ...colours.findings,
    ...homepage.findings,
    ...detectReleases(seed, repo, previous, override),
    ...detectCopy(seed, repo, previous),
  ];
  // overrides.json `keep`: updates of these kinds are reported, not made.
  const keep = new Set(override.keep ?? []);
  const seen = new Set(previous?.open ?? []);
  for (const finding of findings) {
    const kept = Object.keys(finding.apply ?? {}).filter(kind =>
      keep.has(kind)
    );
    if (kept.length) {
      finding.kept = kept;
      finding.apply = null;
    }
    finding.key = keyOf(finding);
    // Reported at the last sync and still open (waiting on a hand step, or
    // kept by an override): listed, but not news.
    if (!finding.apply && seen.has(finding.key)) finding.repeat = true;
  }

  const record = {
    commit: repo.head,
    tag: repo.latestTag ?? previous?.tag ?? null,
    copy: copyHashes(repo.files),
    brand: current,
    mark: repo.files.mark ? sha256(repo.files.mark).slice(0, 16) : null,
    home: homepage.record ?? previous?.home ?? null,
  };
  return { seed, status: 'ok', findings, record };
}

/** After apply: what was reported but not applied is remembered as seen. */
export function closeRecord(result) {
  const open = result.findings
    .filter(finding => !finding.applied)
    .map(finding => finding.key);
  return open.length ? { ...result.record, open } : result.record;
}
