// Streams a JSONL file (plain or .zst) and hands back only the lines that
// contain one of a few byte patterns. The search is Buffer.indexOf over
// large chunks, so the multi-megabyte tool-result lines that make up most of
// a transcript are never decoded or parsed.
import fs from 'node:fs';
import zlib from 'node:zlib';

const NL = 0x0a;
const CHUNK = 8 << 20;

function openSource(path) {
  const raw = fs.createReadStream(path, { highWaterMark: CHUNK });
  if (!path.endsWith('.zst')) return raw;
  if (typeof zlib.createZstdDecompress !== 'function') {
    throw new Error(
      `Node ${process.version} cannot read ${path}: zstd needs Node 22.15 or later`
    );
  }
  return raw.pipe(zlib.createZstdDecompress());
}

/** Lines in buf[0, end) containing a needle, each reported once, in order. */
function matchRegion(buf, end, needles, onLine) {
  const next = needles.map(needle => buf.indexOf(needle));
  let pos = 0;
  for (;;) {
    let best = -1;
    for (let i = 0; i < needles.length; i++) {
      if (next[i] !== -1 && next[i] < pos)
        next[i] = buf.indexOf(needles[i], pos);
      if (next[i] !== -1 && next[i] < end && (best === -1 || next[i] < best))
        best = next[i];
    }
    if (best === -1) return;
    const start = buf.lastIndexOf(NL, best) + 1;
    let stop = buf.indexOf(NL, best);
    if (stop === -1 || stop > end) stop = end;
    onLine(buf.toString('utf8', start, stop));
    pos = stop + 1;
  }
}

/**
 * Calls onLine(text) for every line containing any of `patterns`, and
 * `between()` (awaited) after each chunk so a caller can pace itself.
 * Returns the number of (decompressed) bytes read.
 */
export async function scanMatchingLines(path, patterns, onLine, between) {
  const needles = patterns.map(pattern => Buffer.from(pattern));
  let pending = [];
  let bytes = 0;
  for await (const chunk of openSource(path)) {
    bytes += chunk.length;
    const lastNl = chunk.lastIndexOf(NL);
    if (lastNl === -1) {
      pending.push(chunk);
      continue;
    }
    const buf = pending.length ? Buffer.concat([...pending, chunk]) : chunk;
    const end = buf.length - (chunk.length - lastNl - 1);
    matchRegion(buf, end, needles, onLine);
    pending = end < buf.length ? [Buffer.from(buf.subarray(end))] : [];
    if (between) await between();
  }
  if (pending.length) {
    const tail = Buffer.concat(pending);
    matchRegion(tail, tail.length, needles, onLine);
  }
  return bytes;
}
