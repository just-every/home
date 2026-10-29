/**
 * (f) The sources of a seed's page copy (CONTRACT.md, README.md, seed.json)
 * changed since the last sync. Rewriting summary, does, promises and the
 * rest is an agent's job, so these are reported with the commit range to
 * read, never applied.
 */
import { sha256 } from '../lib/image.mjs';
import { COPY_FILES } from '../sources/repo.mjs';

export const copyHashes = files =>
  Object.fromEntries(
    COPY_FILES.map(file => [
      file,
      files[file] ? sha256(files[file]).slice(0, 16) : null,
    ])
  );

export function detectCopy(seed, repo, previous) {
  if (!previous?.copy) return [];
  const now = copyHashes(repo.files);
  const changed = COPY_FILES.filter(
    file => (previous.copy[file] ?? null) !== now[file]
  );
  if (!changed.length) return [];
  const range =
    previous.commit && previous.commit !== repo.copyCommit
      ? `https://github.com/${seed.repo}/compare/${previous.commit.slice(0, 12)}...${repo.copyCommit.slice(0, 12)}`
      : null;
  return [
    {
      type: 'copy',
      summary: `${changed.join(', ')} changed since the last sync`,
      details: {
        files: changed,
        range,
        from: previous.commit,
        to: repo.copyCommit,
      },
      apply: null,
      copy: `rewrite the page copy from ${changed.join(', ')}${range ? ` (${range})` : ''}`,
    },
  ];
}
