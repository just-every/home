/**
 * The run's report: printed, and written as report.json and report.md with
 * before/after images (marks drawn to PNG beside their SVGs, homepage stills
 * side by side) under the run's folder.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { sideBySide, svgPng } from '../lib/image.mjs';
import * as thresholds from '../lib/image.mjs';
import { HUE_TOLERANCE } from '../detect/colours.mjs';

const isSvg = buffer => /<svg[\s>]/.test(buffer.subarray(0, 4096).toString());

/** Writes a finding's images; returns their paths relative to the report. */
async function writeImages(out, slug, finding, index) {
  if (!finding.images) return null;
  mkdirSync(join(out, 'images'), { recursive: true });
  const stem = `images/${slug}-${finding.type}-${index}`;
  const paths = {};
  const pictures = {};
  for (const side of ['before', 'after']) {
    const image = finding.images[side];
    if (!image) continue;
    if (isSvg(image)) {
      writeFileSync(join(out, `${stem}-${side}.svg`), image);
      pictures[side] = await svgPng(image, 256);
      writeFileSync(join(out, `${stem}-${side}.png`), pictures[side]);
      paths[side] = `${stem}-${side}.png`;
    } else {
      pictures[side] = image;
      writeFileSync(join(out, `${stem}-${side}.png`), image);
      paths[side] = `${stem}-${side}.png`;
    }
  }
  if (pictures.before && pictures.after) {
    const height = finding.type === 'mark' ? 256 : 360;
    writeFileSync(
      join(out, `${stem}-compare.png`),
      await sideBySide(pictures.before, pictures.after, height)
    );
    paths.compare = `${stem}-compare.png`;
  }
  return paths;
}

const status = finding =>
  finding.applied
    ? 'applied'
    : finding.kept
      ? `kept (overrides.json keeps ${finding.kept.join(', ')})`
      : finding.apply
        ? 'to apply'
        : 'reported';

export async function writeReport(out, run) {
  mkdirSync(out, { recursive: true });
  const seeds = [];
  for (const result of run.results) {
    const findings = [];
    for (const [index, finding] of (result.findings ?? []).entries()) {
      const images = await writeImages(out, result.seed.slug, finding, index);
      findings.push({
        type: finding.type,
        summary: finding.summary,
        status: status(finding),
        manual: finding.manual ?? null,
        copy: finding.copy ?? null,
        details: finding.details ?? null,
        repeat: Boolean(finding.repeat),
        images,
      });
    }
    seeds.push({
      slug: result.seed.slug,
      name: result.seed.name,
      kind: result.seed.kind,
      status: result.status,
      reason: result.reason ?? null,
      source: result.record
        ? {
            ref: result.record.sourceRef,
            commit: result.record.commit,
            reason: result.record.sourceReason,
            copy: result.record.copy,
          }
        : null,
      findings,
    });
  }
  const report = {
    ...run.meta,
    seeds,
    shareImage: run.shareImage,
    apply: run.apply ?? null,
  };
  writeFileSync(
    join(out, 'report.json'),
    `${JSON.stringify(report, null, 2)}\n`
  );
  writeFileSync(join(out, 'report.md'), markdown(report));
  return report;
}

/** A seed's findings that are news this run (not still open from the last). */
const news = seed => seed.findings.filter(finding => !finding.repeat);

function markdown(report) {
  const lines = [];
  const changed = report.seeds.filter(seed => news(seed).length);
  const unreadable = report.seeds.filter(seed => seed.status === 'unreadable');
  lines.push(`# Seeds sync, ${report.startedAt}`, '');
  lines.push(
    `${report.mode === 'apply' ? 'Applied' : 'Dry run'} over ${report.seeds.length} seeds: ` +
      `${changed.length} with changes, ${unreadable.length} unreadable. ` +
      (report.copyOnly
        ? 'Copy sources only; homepages not read '
        : `Homepages read ${report.captureHost ? `on ${report.captureHost}` : 'here'} `) +
      `(load ${report.load.toFixed(1)}). State: ${report.statePath}.`,
    ''
  );
  lines.push(
    '## Copy source refs',
    '',
    '| Seed | Ref | Commit | Reason |',
    '| --- | --- | --- | --- |'
  );
  for (const seed of report.seeds)
    lines.push(
      `| ${seed.slug} | ${seed.source?.ref ?? 'unresolved'} | ${seed.source?.commit ?? 'unresolved'} | ${seed.source?.reason ?? seed.reason} |`
    );
  lines.push('');
  if (!changed.length && !unreadable.length)
    lines.push('Nothing changed since the last sync.', '');

  if (changed.length) {
    lines.push('## Changes by seed', '');
    for (const seed of changed) {
      lines.push(
        `### ${seed.name} (${seed.kind === 'soon' ? 'coming soon' : 'released'})`,
        ''
      );
      for (const finding of news(seed)) {
        lines.push(
          `- **${finding.type}**: ${finding.summary} (${finding.status})`
        );
        if (finding.manual) lines.push(`  - needs a hand: ${finding.manual}`);
        if (finding.images?.compare)
          lines.push(`  - before / after: ![](${finding.images.compare})`);
        else if (finding.images?.after)
          lines.push(`  - now: ![](${finding.images.after})`);
      }
      lines.push('');
    }
  }

  const copy = report.seeds.flatMap(seed =>
    news(seed)
      .filter(f => f.copy)
      .map(f => `- ${seed.name}: ${f.copy}`)
  );
  if (copy.length)
    lines.push(
      '## For a copy rewrite (reported, never applied)',
      '',
      ...new Set(copy),
      ''
    );

  const manual = report.seeds.flatMap(seed =>
    news(seed)
      .filter(f => f.manual)
      .map(f => `- ${seed.name}: ${f.manual}`)
  );
  if (manual.length) lines.push('## Waiting on a hand step', '', ...manual, '');

  const open = report.seeds.flatMap(seed =>
    seed.findings
      .filter(f => f.repeat)
      .map(
        f => `- ${seed.name}: ${f.summary}${f.manual ? ` (${f.manual})` : ''}`
      )
  );
  if (open.length)
    lines.push('## Still open from the last sync (not news)', '', ...open, '');

  if (unreadable.length) {
    lines.push('## Unreadable (left unchanged)', '');
    for (const seed of unreadable) lines.push(`- ${seed.name}: ${seed.reason}`);
    lines.push('');
  }

  const share = report.shareImage.filter(note => note.onShareImage);
  const card = report.shareImage.filter(note => !note.onShareImage);
  if (share.length) {
    lines.push(
      '## Share image needs regenerating',
      '',
      'public/og-image.png (scripts/og-image.mjs, from a build) shows the first eight hero rows; what it shows of these changed. The sync does not regenerate it.',
      '',
      ...share.map(
        note =>
          `- ${note.name} (hero row ${note.row}): ${note.changed.join(', ')}`
      ),
      ''
    );
  }
  if (card.length) {
    lines.push(
      '## Hero card',
      '',
      "Rows below the share image's eight; the card is built from the data, so nothing to do:",
      '',
      ...card.map(
        note =>
          `- ${note.name} (hero row ${note.row}): ${note.changed.join(', ')}`
      ),
      ''
    );
  }

  if (report.apply) {
    lines.push(
      '## Applied',
      '',
      `Files written: ${report.apply.written.length}.`
    );
    if (report.apply.favicons)
      lines.push('Favicons regenerated (`npm run favicons`).');
    lines.push('', ...report.apply.written.map(path => `- ${path}`), '');
  }

  lines.push(
    '## Rules',
    '',
    `- Marks: drawn at ${thresholds.MARK_SIZE}px on white; changed when over ${thresholds.MARK_CHANGED_SHARE * 100}% of pixels move by more than ${thresholds.MARK_PIXEL_DELTA}/255 in a channel.`,
    `- Homepage stills: 1280x720 after fonts load, motion reduced, overlays removed; compared at ${thresholds.STILL_SIZE.width}x${thresholds.STILL_SIZE.height}, changed when over ${thresholds.STILL_CHANGED_SHARE * 100}% of pixels move by more than ${thresholds.STILL_PIXEL_DELTA}/255. Seeds with a reel keep a ${thresholds.SIGNATURE_GRID.width}x${thresholds.SIGNATURE_GRID.height} fingerprint instead, changed when over ${thresholds.SIGNATURE_CHANGED_SHARE * 100}% of cells move.`,
    `- Colours follow the token that held them at the last sync; the pastel keeps the hue (within ${HUE_TOLERANCE} degrees) of the accent or ink.`,
    ''
  );
  return `${lines.join('\n')}\n`;
}

/** The report, shortened, for the terminal. */
export function printReport(report) {
  const changed = report.seeds.filter(seed => news(seed).length);
  console.log(
    `\n${report.mode === 'apply' ? 'Applied' : 'Dry run'}: ${changed.length} of ${report.seeds.length} seeds changed.`
  );
  for (const seed of report.seeds) {
    if (seed.status === 'unreadable')
      console.log(
        `\n${seed.name}: UNREADABLE, left unchanged (${seed.reason})`
      );
    if (!news(seed).length) continue;
    console.log(
      `\n${seed.name}${seed.kind === 'soon' ? ' (coming soon)' : ''}`
    );
    for (const finding of news(seed)) {
      console.log(
        `  ${finding.type.padEnd(9)} ${finding.summary} [${finding.status}]`
      );
      if (finding.manual)
        console.log(`  ${''.padEnd(9)} needs a hand: ${finding.manual}`);
    }
  }
  const open = report.seeds.reduce(
    (sum, seed) => sum + seed.findings.filter(f => f.repeat).length,
    0
  );
  if (open)
    console.log(
      `\n${open} finding(s) still open from the last sync (report.md lists them).`
    );
  const share = report.shareImage.filter(note => note.onShareImage);
  if (share.length)
    console.log(
      `\nShare image needs regenerating:\n${share.map(note => `  ${note.name} (row ${note.row}): ${note.changed.join(', ')}`).join('\n')}`
    );
}
