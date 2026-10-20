/**
 * The hero's "JustEvery Stack" card and the share image drawn from it
 * (scripts/og-image.mjs keeps the first eight rows) show each picked seed's
 * mark, pastel, ink and primary incumbent with its price. The card is built
 * from the data; the share image is a stored PNG, so a change to what it
 * shows is noted for regenerating (the sync never regenerates it).
 */
const SHOWN = {
  mark: plan => Boolean(plan.mark),
  pastel: plan => Boolean(plan.colours?.updates.pastel),
  ink: plan => Boolean(plan.colours?.updates.ink),
  'primary incumbent': (plan, seed) =>
    Boolean(plan.replaces) &&
    plan.replaces.primaryReplace !== seed.primaryReplace,
};

export function shareImageNotes(results, site) {
  const notes = [];
  for (const result of results) {
    if (result.status !== 'ok') continue;
    const { seed } = result;
    const row = site.hero.rows.indexOf(seed.slug);
    if (row < 0) continue;
    const changed = new Set();
    for (const finding of result.findings) {
      if (!finding.apply) continue;
      for (const [what, test] of Object.entries(SHOWN))
        if (test(finding.apply, seed)) changed.add(what);
      const lead = finding.apply.replaces?.primaryReplace;
      if (lead && lead !== seed.primaryReplace && !site.hero.priced.has(lead))
        finding.manual = [
          finding.manual,
          `the hero prices ${seed.name}'s primary incumbent: add ${lead} to src/data/incumbent-prices.ts`,
        ]
          .filter(Boolean)
          .join('; ');
    }
    if (!changed.size) continue;
    notes.push({
      name: seed.name,
      row: row + 1,
      onShareImage: site.hero.shareImageRows.includes(seed.slug),
      changed: [...changed],
    });
  }
  return notes;
}
