/**
 * The footer art's motion, as the style sheet inside the SVG. It runs in an
 * <img>, where page CSS can't reach, and every rule sits inside the
 * no-preference query: with reduced motion the parts are at rest, and the
 * petals and glints (which start out invisible) are never seen.
 * Transform and opacity only; slow, eased and out of phase.
 */
import { petals, glints, streaks } from './parts.mjs';

const px = ([x, y]) => `${x}px ${y}px`;
const E = 'ease-in-out';

// Pivots and timings of the parts, by id.
const move = {
  tail: { o: [1200, 1405], k: 'wag', t: 11, d: -4 },
  ear: { o: [1195, 1198], k: 'twitch', t: 17, d: -9 },
  head: { o: [615, 1080], k: 'tilt', t: 19, d: -6 },
};
const birds = {
  bird1: { c: [2574, 696], glide: [34, -8, 21, 0], flap: [9, -2] },
  bird2: { c: [2727, 725], glide: [-28, 10, 25, -9], flap: [13, -7] },
  bird3: { c: [2442, 779], glide: [40, -6, 18, -5], flap: [11, -4] },
};

export function motionCss() {
  const r = [];
  for (const [id, m] of Object.entries(move)) {
    r.push(
      `#${id}{transform-origin:${px(m.o)};animation:${m.k} ${m.t}s ${E} ${m.d}s infinite}`
    );
  }
  for (const [id, b] of Object.entries(birds)) {
    const [dx, dy, t, d] = b.glide;
    r.push(
      `#${id}{animation:glide ${t}s ${E} ${d}s infinite alternate;--dx:${dx}px;--dy:${dy}px}`,
      `#${id}f{transform-origin:${px(b.c)};animation:flap ${b.flap[0]}s ${E} ${b.flap[1]}s infinite}`
    );
  }
  petals.forEach(([x, y, dx, dy, spin, t, d], i) => {
    r.push(
      `#pt${i}{animation:fall ${t}s linear ${d}s infinite;--dx:${dx}px;--dy:${dy}px;--r:${spin}deg}`
    );
  });
  r.push(
    `[data-m=sw]{animation:sway 3.6s ${E} infinite alternate}`,
    `[data-m=fl]{transform-box:fill-box;transform-origin:center;animation:flutter 2.2s ${E} infinite alternate}`
  );
  r.push(`.gl{transform-box:fill-box;transform-origin:center}`);
  glints.forEach(([, , , d, t], i) =>
    r.push(`#gl${i}{animation:glint ${t}s ${E} ${d}s infinite}`)
  );
  streaks.forEach(([, , , d, t], i) =>
    r.push(`#st${i}{animation:streak ${t}s ${E} ${d}s infinite}`)
  );

  const keys = [
    `@keyframes wag{0%,58%,100%{transform:rotate(0)}63%{transform:rotate(3.5deg)}69%{transform:rotate(-2.5deg)}75%{transform:rotate(3deg)}81%{transform:rotate(-1.5deg)}87%{transform:rotate(0)}}`,
    `@keyframes twitch{0%,80%,100%{transform:rotate(0)}83%{transform:rotate(-5deg)}86%{transform:rotate(1deg)}88%{transform:rotate(-3deg)}92%{transform:rotate(0)}}`,
    `@keyframes tilt{0%,8%,76%,100%{transform:rotate(0)}22%,44%{transform:rotate(1.5deg)}60%{transform:rotate(-.7deg)}}`,
    `@keyframes glide{from{transform:translate(0,0)}to{transform:translate(var(--dx),var(--dy))}}`,
    `@keyframes flap{0%,68%,88%,100%{transform:scaleY(1)}72%,80%{transform:scaleY(.5)}76%,84%{transform:scaleY(1)}}`,
    `@keyframes fall{0%{opacity:0;transform:translate(0,0) rotate(0)}5%{opacity:.9}30%{opacity:.9}38%,100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(var(--r))}}`,
    `@keyframes sway{from{transform:translateX(-12px)}to{transform:translateX(12px)}}`,
    `@keyframes flutter{from{transform:scaleY(1)}to{transform:scaleY(.35)}}`,
    `@keyframes glint{0%,100%{opacity:0;transform:translateX(0) scaleX(.8)}50%{opacity:.6;transform:translateX(5px) scaleX(1.05)}}`,
    `@keyframes streak{0%,100%{opacity:0;transform:scaleX(.6)}50%{opacity:.8;transform:scaleX(1.1)}}`,
  ];
  // Petals and glints are invisible unless their animation runs.
  return `.gl,[id^=pt]{opacity:0}@media (prefers-reduced-motion:no-preference){${r.join('')}${keys.join('')}}`;
}
