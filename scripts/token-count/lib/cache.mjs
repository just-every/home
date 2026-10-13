// Per-file results, keyed by path and valid while size and mtime match, so a
// re-run reads only new or grown files. A file that has since been deleted
// (Claude Code and Codex prune old sessions) keeps its last measurement:
// those tokens were spent and measured, so the total never shrinks because a
// log aged out. Bump VERSION whenever a scanner's output changes meaning.
//
// One line per file: `<header JSON>\t<summary JSON>`. The summary stays an
// unparsed string here, so a warm run holds text, not millions of objects.
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

export const VERSION = 2;

export function entryLine(file, entry) {
  const { summaryText, ...header } = entry;
  return `${JSON.stringify({ file, ...header })}\t${summaryText}`;
}

export function splitLine(line) {
  const tab = line.indexOf('\t');
  return {
    header: JSON.parse(line.slice(0, tab)),
    summaryText: line.slice(tab + 1),
  };
}

/** The non-empty lines of a text file, one at a time. */
export async function* readLines(file) {
  const lines = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity,
  });
  for await (const line of lines) if (line) yield line;
}

export async function loadCache(file) {
  const files = new Map();
  if (!fs.existsSync(file)) return files;
  let first = true;
  for await (const line of readLines(file)) {
    if (first) {
      first = false;
      if (JSON.parse(line).version !== VERSION) return files;
      continue;
    }
    const { header, summaryText } = splitLine(line);
    const { file: key, ...rest } = header;
    files.set(key, { ...rest, summaryText });
  }
  return files;
}

/** Writes `headLines`, then one line per file, to a path or to stdout ('-'). */
export async function writeLines(target, headLines, files) {
  const out = target === '-' ? process.stdout : fs.createWriteStream(target);
  const write = text =>
    out.write(text)
      ? undefined
      : new Promise(resolve => out.once('drain', resolve));
  for (const line of headLines) await write(`${line}\n`);
  for (const [file, entry] of files) await write(`${entryLine(file, entry)}\n`);
  if (out !== process.stdout)
    await new Promise((resolve, reject) =>
      out.end(error => (error ? reject(error) : resolve()))
    );
}

export async function saveCache(file, files) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.tmp`;
  await writeLines(temp, [JSON.stringify({ version: VERSION })], files);
  fs.renameSync(temp, file);
}
