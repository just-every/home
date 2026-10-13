// Codex rollouts: sessions/YYYY/MM/DD/rollout-*.jsonl[.zst] and
// archived_sessions/. The first session_meta line names the thread and its
// cwd (a fork copies its parent's meta after its own); turn_context lines move
// the cwd and model per turn.
//
// Usage comes in two shapes:
//   token_usage_record  (newer CLIs) one line per model response, keyed by
//                       response_id: kept as units, deduplicated globally.
//   token_count events  cumulative totals for the thread: kept as hourly
//                       growth bins. A drop in the running total starts a new
//                       segment (a resumed process counting from zero again).
// The aggregator uses the records when a file has them and the bins
// otherwise; both are measured so they can be compared.
//
// OpenAI counts cached input inside input_tokens and reasoning inside
// output_tokens; they are split here into Claude's four buckets so
// input + cacheCreation + cacheRead + output = total_tokens.
import { scanMatchingLines } from './lines.mjs';
import {
  bump,
  hashId,
  intern,
  newSummary,
  num,
  toEpochSeconds,
} from './summary.mjs';

const buckets = usage => {
  const input = num(usage?.input_tokens);
  const cached = num(usage?.cached_input_tokens);
  const written = num(usage?.cache_write_input_tokens);
  return [
    Math.max(0, input - cached - written),
    written,
    cached,
    num(usage?.output_tokens),
  ];
};
const sum4 = values => values[0] + values[1] + values[2] + values[3];

export async function scanCodexFile(path, between) {
  const summary = newSummary('codex');
  const { diag, units, meta } = summary;
  const cwdIndex = new Map();
  const modelIndex = new Map();
  const seenResponses = new Set();
  const bins = new Map();
  let cwd = null;
  let model = null;
  const cwdNow = () => cwd ?? (cwd = intern(summary.cwds, cwdIndex, ''));
  const modelNow = () =>
    model ?? (model = intern(summary.models, modelIndex, ''));
  let previous = null;
  let firstEvent = true;
  let recordsSeen = 0;

  const addBin = (t, values, beforeRecords) => {
    if (!sum4(values)) return;
    const hour = t - (t % 3600);
    const flag = beforeRecords ? 1 : 0;
    const key = `${hour}|${cwdNow()}|${modelNow()}|${flag}`;
    const bin = bins.get(key);
    if (bin) for (let i = 0; i < 4; i++) bin[4 + i] += values[i];
    else bins.set(key, [hour, cwdNow(), modelNow(), flag, ...values]);
  };

  await scanMatchingLines(
    path,
    [
      '"type":"session_meta"',
      '"type":"turn_context"',
      '"type":"token_usage_record"',
      '"type":"token_count"',
    ],
    text => {
      let line;
      try {
        line = JSON.parse(text);
      } catch {
        bump(diag, 'unparsableLines');
        return;
      }
      const payload = line.payload ?? {};
      const t = toEpochSeconds(line.timestamp);

      if (line.type === 'session_meta') {
        if (meta.thread) {
          bump(diag, 'copiedSessionMeta');
          return;
        }
        meta.thread = payload.id ?? null;
        meta.root = payload.session_id ?? null;
        meta.forkedFrom = payload.forked_from_id ?? null;
        meta.source =
          payload.thread_source ??
          (typeof payload.source === 'string' ? payload.source : null);
        meta.originator = payload.originator ?? null;
        meta.cli = payload.cli_version ?? null;
        cwd = intern(summary.cwds, cwdIndex, payload.cwd);
        return;
      }
      if (line.type === 'turn_context') {
        if (payload.cwd) cwd = intern(summary.cwds, cwdIndex, payload.cwd);
        if (payload.model)
          model = intern(summary.models, modelIndex, payload.model);
        return;
      }
      if (line.type === 'token_usage_record') {
        recordsSeen++;
        const id = payload.response_id;
        if (!id) {
          bump(diag, 'recordsWithoutResponseId');
          return;
        }
        if (
          meta.thread &&
          payload.thread_id &&
          payload.thread_id !== meta.thread
        )
          bump(diag, 'recordsFromOtherThread');
        if (seenResponses.has(id)) {
          bump(diag, 'repeatRecordsSameResponse');
          return;
        }
        seenResponses.add(id);
        const usage = payload.usage;
        if (num(usage?.cache_write_input_tokens))
          bump(diag, 'recordsWithCacheWrites');
        if (
          num(usage?.total_tokens) !==
          num(usage?.input_tokens) + num(usage?.output_tokens)
        )
          bump(diag, 'recordsTotalNotInputPlusOutput');
        units.k.push(hashId(`codex|${id}`));
        units.t.push(t);
        units.v.push(cwdNow(), modelNow(), ...buckets(usage));
        return;
      }
      if (line.type === 'event_msg' && payload.type === 'token_count') {
        const total = payload.info?.total_token_usage;
        if (!total) {
          bump(diag, 'tokenCountWithoutInfo');
          return;
        }
        const now = buckets(total);
        let delta;
        if (firstEvent) {
          firstEvent = false;
          // A fork (CLI 0.149) starts from its parent's running total; that
          // usage belongs to the parent's own file, so only this call counts.
          const last = payload.info?.last_token_usage;
          const carried = num(total.total_tokens) - num(last?.total_tokens);
          if (carried > 0 && last) {
            meta.carriedAtStart = carried;
            bump(diag, 'firstTotalAboveLastCall');
            delta = buckets(last);
          } else delta = now;
        } else if (sum4(now) < sum4(previous)) {
          bump(diag, 'cumulativeResets');
          delta = now;
        } else delta = now.map((value, i) => Math.max(0, value - previous[i]));
        if (previous && sum4(now) === sum4(previous))
          bump(diag, 'repeatTokenCounts');
        previous = now;
        addBin(t, delta, recordsSeen === 0);
        return;
      }
      bump(diag, 'patternOutsideUsageLines');
    },
    between
  );

  for (const bin of bins.values()) summary.bins.push(...bin);
  meta.records = recordsSeen;
  return summary;
}
