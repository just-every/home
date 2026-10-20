/**
 * (e) A newer release tag than the version a seed's page shows, and (g) a
 * tag on a coming-soon seed, which may mean it is released now. The sync
 * never moves a seed between seeds.ts and upcoming.ts: that is reported.
 */
import { compareVersions } from '../lib/net.mjs';

export function detectReleases(seed, repo, previous, override) {
  const findings = [];
  const tag = repo.latestTag;
  if (tag && (!seed.version || compareVersions(tag, seed.version) > 0)) {
    findings.push({
      type: 'version',
      summary: `newer tag ${tag} (page shows ${seed.version || 'none'})`,
      apply: { version: tag },
    });
  }
  if (seed.kind === 'soon' && tag && previous?.tag !== tag) {
    findings.push({
      type: 'release',
      summary: override.staysComingSoon
        ? `tagged ${tag}, and stays coming soon (${override.why ?? 'owner override'})`
        : `tagged ${tag}: it may be released; moving it to seeds.ts is a decision, not a sync`,
      apply: null,
      manual: override.staysComingSoon
        ? null
        : `decide whether ${seed.name} moves from upcoming.ts to seeds.ts`,
    });
  }
  return findings;
}
