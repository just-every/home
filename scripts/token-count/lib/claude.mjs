// Claude Code transcripts: projects/<slug>/**/*.jsonl, including subagent and
// workflow transcripts. Every assistant line carries message.usage for the
// API call that produced it; one call is often written as several lines (one
// per content block) with the same message id and requestId, so each call is
// kept once, field by field at its largest value (older versions streamed
// partial output counts into the earlier lines).
import { scanMatchingLines } from './lines.mjs';
import {
  bump,
  hashId,
  intern,
  newSummary,
  num,
  toEpochSeconds,
  UNIT_WIDTH,
} from './summary.mjs';

function callOf(line) {
  if (line.type === 'assistant') {
    return {
      message: line.message,
      requestId: line.requestId,
      uuid: line.uuid,
      timestamp: line.timestamp,
      nested: false,
    };
  }
  // Some versions mirrored a subagent's messages into the parent as progress events.
  const inner = line.type === 'progress' ? line.data?.message : undefined;
  if (inner?.type === 'assistant') {
    return {
      message: inner.message,
      requestId: inner.requestId,
      uuid: inner.uuid,
      timestamp: inner.timestamp ?? line.timestamp,
      nested: true,
    };
  }
  return null;
}

function checkIterations(usage, diag) {
  const iterations = usage.iterations;
  if (!Array.isArray(iterations) || iterations.length === 0) return;
  if (iterations.length > 1) bump(diag, 'iterationsMulti');
  const sum = {
    input_tokens: 0,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    output_tokens: 0,
  };
  for (const it of iterations) {
    bump(diag, `iterationType:${it?.type ?? 'none'}`);
    for (const field of Object.keys(sum)) sum[field] += num(it?.[field]);
  }
  if (Object.keys(sum).some(field => sum[field] !== num(usage[field])))
    bump(diag, 'iterationsDifferFromTotal');
}

export async function scanClaudeFile(path, between) {
  const summary = newSummary('claude');
  const { diag, units } = summary;
  const cwdIndex = new Map();
  const modelIndex = new Map();
  const byKey = new Map();
  const sessions = new Set();

  await scanMatchingLines(
    path,
    ['"type":"assistant"'],
    text => {
      let line;
      try {
        line = JSON.parse(text);
      } catch {
        bump(diag, 'unparsableLines');
        return;
      }
      const call = callOf(line);
      const usage = call?.message?.usage;
      if (!usage) {
        bump(diag, call ? 'assistantWithoutUsage' : 'patternOutsideAssistant');
        return;
      }
      if (call.nested) bump(diag, 'nestedProgressCalls');
      if (line.sessionId) sessions.add(line.sessionId);
      checkIterations(usage, diag);

      const id =
        call.message.id || call.requestId
          ? `${call.message.id ?? ''}|${call.requestId ?? ''}`
          : `uuid|${call.uuid ?? text.length}`;
      if (!call.message.id) bump(diag, 'callsWithoutMessageId');
      const values = [
        num(usage.input_tokens),
        num(usage.cache_creation_input_tokens),
        num(usage.cache_read_input_tokens),
        num(usage.output_tokens),
      ];
      const t = toEpochSeconds(call.timestamp);
      const at = byKey.get(id);
      if (at !== undefined) {
        bump(diag, 'repeatLinesSameCall');
        const base = at * UNIT_WIDTH + 2;
        let differs = false;
        for (let i = 0; i < 4; i++) {
          if (units.v[base + i] !== values[i]) differs = true;
          units.v[base + i] = Math.max(units.v[base + i], values[i]);
        }
        if (differs) bump(diag, 'repeatLinesWithDifferentUsage');
        if (t && (!units.t[at] || t < units.t[at])) units.t[at] = t;
        return;
      }
      byKey.set(id, units.k.length);
      units.k.push(hashId(id));
      units.t.push(t);
      units.v.push(
        intern(summary.cwds, cwdIndex, line.cwd),
        intern(summary.models, modelIndex, call.message.model),
        ...values
      );
    },
    between
  );

  summary.meta.sessions = [...sessions];
  return summary;
}
