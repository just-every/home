import assert from 'node:assert/strict';
import { test } from 'node:test';

import { validateRerCli } from '../scripts/lib/rer-cli.mjs';

const manifest = {
  schema: 'brand/v1',
  cli: {
    package: '@example/runner',
    installUrl: 'https://example.com/install.sh',
    devCommand: 'npx -y @example/runner dev owner/repo',
  },
};

test('accepts a portable CLI template and keeps only its public fields', () => {
  assert.deepEqual(validateRerCli(manifest), manifest.cli);
});

test('refuses missing or malformed remote CLI input', () => {
  for (const input of [
    null,
    {},
    { ...manifest, schema: 'unknown' },
    { ...manifest, cli: { ...manifest.cli, package: 'runner; other' } },
    { ...manifest, cli: { ...manifest.cli, devCommand: 'do something else' } },
  ]) {
    assert.throws(() => validateRerCli(input));
  }
});

test('refuses installer URLs that could change the displayed shell command', () => {
  for (const installUrl of [
    'http://example.com/install.sh',
    'https://user:password@example.com/install.sh',
    'https://example.com/install.sh?next=other',
    'https://example.com/install.sh#fragment',
    'https://example.com/install.sh&&other',
    'https://example.com/$(other)',
  ]) {
    assert.throws(() =>
      validateRerCli({ ...manifest, cli: { ...manifest.cli, installUrl } })
    );
  }
});
