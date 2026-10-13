import {
  Euler,
  MathUtils,
  PerspectiveCamera,
  Quaternion,
  Vector3,
} from 'three';

import { ART_CROP, CAM, CLIP, FRAME } from './camera';

/**
 * One volume: a bevelled slab, 1 tall, the same for every product. The
 * featured volume is the set's box: as in the art, a little slimmer.
 */
export const VOLUME = {
  h: 1,
  d: 0.68,
  t: 0.23,
  boxT: 0.18,
  gap: 0.012,
  bevel: 0.012,
} as const;
export const PITCH = VOLUME.t + VOLUME.gap;

/** The art shows fourteen volumes; at that count the camera is the art's. */
const ART_COUNT = 14;
const UP = new Vector3(0, 1, 0);

/** Left edge of slot i along the row; slot 0 is the featured volume. */
export const slotX = (index: number) =>
  index === 0 ? 0 : VOLUME.boxT + VOLUME.gap + (index - 1) * PITCH;

/** Thickness of the volume in slot i. */
export const slotT = (index: number) => (index === 0 ? VOLUME.boxT : VOLUME.t);

/** Right edge of the last real volume in a row of `count`. */
const rowEnd = (count: number) => {
  const last = Math.max(count, 1) - 1;
  return slotX(last) + slotT(last);
};

/**
 * How the camera frames a row of `count` volumes, in the art's terms:
 * `orbit` turns the art camera about the featured volume's spine edge (radians
 * about +y), `shift` slides the frame sideways (design px).
 */
export interface Framing {
  orbit: number;
  shift: number;
  /** Where the idle drift and pointer parallax turn about. */
  pivot: Vector3;
}

const baseQuaternion = new Quaternion().setFromEuler(
  new Euler(
    MathUtils.degToRad(CAM.pitchDeg),
    MathUtils.degToRad(CAM.yawDeg),
    0,
    'YXZ'
  )
);

/** The art camera turned by `orbit` about the origin. */
export function poseCamera(camera: PerspectiveCamera, orbit: number) {
  const turn = new Quaternion().setFromAxisAngle(UP, orbit);
  camera.position.set(CAM.pos[0], CAM.pos[1], CAM.pos[2]).applyQuaternion(turn);
  camera.quaternion.copy(turn).multiply(baseQuaternion);
  camera.updateMatrixWorld(true);
}

export function makeCamera() {
  return new PerspectiveCamera(
    CAM.vfov,
    FRAME.w / FRAME.h,
    CLIP.near,
    CLIP.far
  );
}

const probe = makeCamera();
const point = new Vector3();

function designX(x: number, z: number) {
  point.set(x, VOLUME.h / 2, z).project(probe);
  return ((point.x + 1) / 2) * FRAME.w;
}

/** Screen extent (design px) of the cover's far edge and the row's end. */
function extent(orbit: number, count: number) {
  poseCamera(probe, orbit);
  return { left: designX(0, -VOLUME.d), right: designX(rowEnd(count), 0) };
}

/**
 * The collection grows by turning the camera along the row, so that every
 * volume stays in the frame between the featured cover and the art's end
 * point: a longer row recedes further into the distance (and the blur)
 * instead of running off the page. At fourteen this is the art's camera.
 */
export function frameRow(count: number): Framing {
  const art = extent(0, ART_COUNT);
  const target = art.right - art.left;
  const width = (orbit: number) => {
    const e = extent(orbit, count);
    return e.right - e.left;
  };
  // Negative orbit looks further along the row, which narrows its span.
  let lo = MathUtils.degToRad(-34);
  let hi = MathUtils.degToRad(10);
  let orbit = 0;
  if (width(lo) > target) orbit = lo;
  else if (width(hi) < target) orbit = hi;
  else {
    for (let i = 0; i < 40; i += 1) {
      orbit = (lo + hi) / 2;
      if (width(orbit) > target) hi = orbit;
      else lo = orbit;
    }
  }
  const shift = extent(orbit, count).left - art.left;
  const visibleEnd = Math.min(rowEnd(count), rowEnd(ART_COUNT));
  return {
    orbit,
    shift,
    pivot: new Vector3(visibleEnd * 0.4, VOLUME.h * 0.45, -VOLUME.d / 2),
  };
}

/**
 * The part of the design frame the canvas shows: the art crop, fitted inside
 * a canvas of any aspect (contain), moved by the framing's shift.
 */
export function viewWindow(aspect: number, shift: number) {
  const artAspect = ART_CROP.w / ART_CROP.h;
  const w = aspect >= artAspect ? ART_CROP.h * aspect : ART_CROP.w;
  const h = w / aspect;
  const cx = ART_CROP.x + ART_CROP.w / 2 + shift;
  const cy = ART_CROP.y + ART_CROP.h / 2;
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}
