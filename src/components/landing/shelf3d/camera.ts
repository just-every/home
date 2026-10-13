/**
 * The camera of the approved box-set art, solved with `12ui scene solve` from
 * ten landmarks read off the 1536x1024 design (winner.png): the featured box's
 * cover corners and the left edges of volumes 02, 08 and 14 (rms 1.6 px).
 * Units: a volume is 1 tall. The row runs along +x, spines face +z, and the
 * featured volume's cover faces -x, with its spine edge at the origin.
 */
export const FRAME = { w: 1536, h: 1024 } as const;

export const CAM = {
  pos: [-4.38429, 0.20343, 3.52723] as const,
  yawDeg: -46.8707,
  pitchDeg: -2.373,
  vfov: 28.2301,
} as const;

export const CLIP = { near: 0.5, far: 80 } as const;

/**
 * The hero art (box-set.webp, 1588x912) is a 1.983x crop of that design. This
 * is the crop in design pixels; at 14 volumes the scene fills it as the art.
 */
export const ART_CROP = { x: 738.6, y: 122.9, w: 800.8, h: 459.9 } as const;
