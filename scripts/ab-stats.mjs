// Two-proportion comparison for `npm run ab`: each rate's posterior is
// Beta(1 + successes, 1 + failures) (a uniform prior), sampled with a fixed
// seed so the same data always prints the same numbers.

/** mulberry32: a small seeded generator, uniform in [0, 1). */
function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normal(random) {
  let u = 0;
  while (u === 0) u = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
}

/** Marsaglia and Tsang's method; shape is always at least 1 here. */
function gamma(shape, random) {
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x;
    let v;
    do {
      x = normal(random);
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = random();
    if (u < 1 - 0.0331 * x ** 4) return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}

function beta(a, b, random) {
  const x = gamma(a, random);
  return x / (x + gamma(b, random));
}

/**
 * `variant` against `control`, each { hits, visitors }: the observed
 * difference in rates, a 95% interval for it, and the probability that the
 * variant's true rate is higher. Null when either side has no visitors.
 */
export function compare(control, variant, draws = 100_000) {
  if (control.visitors === 0 || variant.visitors === 0) return null;
  const random = seeded(20261016);
  const differences = new Float64Array(draws);
  let better = 0;
  for (let i = 0; i < draws; i += 1) {
    const c = beta(
      1 + control.hits,
      1 + control.visitors - control.hits,
      random
    );
    const v = beta(
      1 + variant.hits,
      1 + variant.visitors - variant.hits,
      random
    );
    differences[i] = v - c;
    if (v > c) better += 1;
  }
  differences.sort();
  return {
    difference:
      variant.hits / variant.visitors - control.hits / control.visitors,
    low: differences[Math.floor(0.025 * draws)],
    high: differences[Math.floor(0.975 * draws)],
    pBetter: better / draws,
  };
}
