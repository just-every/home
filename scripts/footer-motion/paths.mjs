/**
 * Crops the art's traced paths (the ink plates and the region clips) to a
 * box, so a moving part carries a few kilobytes of the art instead of all of
 * it. Inside the box the cropped path fills exactly what the whole path
 * fills; outside it, anything goes (the part's SVG ends at the box).
 *
 * A subpath that never comes near the box is dropped, unless it wraps the box,
 * when it becomes a loop around the box's edge. Within a subpath that does
 * cross the box, every stretch far from it (each segment's control hull clear
 * of the box) becomes straight lines pressed onto the box's edge. Pressing a
 * far vertex onto the edge never sweeps a line across the box, so every point
 * inside keeps its winding number, holes included.
 */

const NUM = /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi;
const ARGS = { M: 2, L: 2, C: 6, Z: 0 };

/** The subpaths of d as absolute segments: [{ start, segs: [{ c: 'L' | 'C', pts }] }]. */
function parse(d) {
  const subs = [];
  let cur = null;
  let x = 0;
  let y = 0;
  for (const [, letter, body] of d.matchAll(/([MmLlCcZz])([^MmLlCcZz]*)/g)) {
    const up = letter.toUpperCase();
    const rel = letter !== up;
    if (up === 'Z') {
      [x, y] = cur.start;
      continue;
    }
    const nums = (body.match(NUM) ?? []).map(Number);
    const k = ARGS[up];
    for (let i = 0; i < nums.length; i += k) {
      const n = nums.slice(i, i + k);
      const pts = [];
      for (let j = 0; j < k; j += 2)
        pts.push(rel ? [x + n[j], y + n[j + 1]] : [n[j], n[j + 1]]);
      if (up === 'M' && i === 0) {
        cur = { start: pts[0], segs: [] };
        subs.push(cur);
      } else cur.segs.push({ c: up === 'C' ? 'C' : 'L', pts });
      [x, y] = pts.at(-1);
    }
  }
  return subs;
}

/** A matrix(a b c d e f) attribute (no skew) as a function and its inverse on boxes. */
function frame(attr) {
  if (!attr) return b => b;
  const [a, , , d, e, f] = attr.match(NUM).map(Number);
  return ([x1, y1, x2, y2]) => {
    const xs = [(x1 - e) / a, (x2 - e) / a];
    const ys = [(y1 - f) / d, (y2 - f) / d];
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  };
}

const r = v => Math.round(v * 100) / 100;

/** The subpaths of d (drawn through transform) that matter inside box [x1, y1, x2, y2]. */
export function crop(d, transform, box, margin = 2) {
  const [x1, y1, x2, y2] = frame(transform)([
    box[0] - margin,
    box[1] - margin,
    box[2] + margin,
    box[3] + margin,
  ]);
  const far = pts =>
    pts.every(([px]) => px < x1) ||
    pts.every(([px]) => px > x2) ||
    pts.every(([, py]) => py < y1) ||
    pts.every(([, py]) => py > y2);
  const press = ([px, py]) => [
    Math.min(x2, Math.max(x1, px)),
    Math.min(y2, Math.max(y1, py)),
  ];

  const out = [];
  for (const { start, segs } of parse(d)) {
    // Close it: the last segment returns to the start.
    const last = segs.length ? segs.at(-1).pts.at(-1) : start;
    if (last[0] !== start[0] || last[1] !== start[1])
      segs.push({ c: 'L', pts: [start] });
    if (!segs.length) continue;
    let from = start;
    const isFar = segs.map(s => {
      const f = far([from, ...s.pts]);
      from = s.pts.at(-1);
      return f;
    });
    const n = segs.length;
    // Vertex i ends segment i; it may move when both segments meeting there are far.
    const moves = i => isFar[i] && isFar[(i + 1) % n];
    const verts = segs.map((s, i) =>
      moves(i) ? press(s.pts.at(-1)) : s.pts.at(-1)
    );
    const startV = verts[n - 1];
    // Re-emit, dropping repeated and straight-through points on the edge.
    const items = segs.map((s, i) =>
      isFar[i]
        ? { c: 'L', pts: [verts[i]] }
        : { c: 'C', pts: s.c === 'C' ? s.pts : [s.pts[0], s.pts[0], s.pts[0]] }
    );
    if (isFar.every(Boolean)) {
      // A loop on the edge: it wraps the box or encloses nothing of it.
      const ring = [];
      for (const { pts } of items) {
        const p = pts[0];
        const q = ring.at(-1);
        if (!q || q[0] !== p[0] || q[1] !== p[1]) ring.push(p);
      }
      if (
        ring.length > 1 &&
        ring[0][0] === ring.at(-1)[0] &&
        ring[0][1] === ring.at(-1)[1]
      )
        ring.pop();
      // Keep only corners: drop points on the line between their neighbours.
      const corners = ring.filter((p, i) => {
        const a = ring[(i + ring.length - 1) % ring.length];
        const b = ring[(i + 1) % ring.length];
        return !(
          (a[0] === p[0] && p[0] === b[0]) ||
          (a[1] === p[1] && p[1] === b[1])
        );
      });
      if (corners.length < 3) continue;
      // Twice the signed area: a loop that encloses the box's inside has some.
      let area = 0;
      corners.forEach(([ax, ay], i) => {
        const [bx, by] = corners[(i + 1) % corners.length];
        area += ax * by - bx * ay;
      });
      if (Math.abs(area) < 1e-6) continue;
      out.push(`M${corners.map(([px, py]) => `${r(px)} ${r(py)}`).join('L')}z`);
      continue;
    }
    // Lines pressed onto the edge: drop repeats and points a line runs straight through.
    const ops = [];
    let prev = startV;
    for (const { c, pts } of items) {
      const end = pts.at(-1);
      if (c === 'L') {
        if (end[0] === prev[0] && end[1] === prev[1]) continue;
        const before = ops.at(-1);
        const back = before?.c === 'L' ? (ops.at(-2)?.end ?? startV) : null;
        if (
          back &&
          ((back[0] === prev[0] && prev[0] === end[0]) ||
            (back[1] === prev[1] && prev[1] === end[1]))
        ) {
          before.end = end;
          prev = end;
          continue;
        }
        ops.push({ c, end });
      } else
        ops.push({
          c,
          end,
          rel: pts.flatMap(([px, py]) => [r(px - prev[0]), r(py - prev[1])]),
        });
      prev = end;
    }
    const text = ops
      .map(o =>
        o.c === 'L' ? `L${r(o.end[0])} ${r(o.end[1])}` : `c${o.rel.join(' ')}`
      )
      .join('');
    out.push(`M${r(startV[0])} ${r(startV[1])}${text}z`);
  }
  return out.join('');
}
