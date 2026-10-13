import {
  CanvasTexture,
  Color,
  CustomBlending,
  DirectionalLight,
  Group,
  HemisphereLight,
  type Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  OneFactor,
  OneMinusSrcAlphaFactor,
  PlaneGeometry,
  type Texture,
  Vector2,
  Vector3,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

import { slotT, slotX, VOLUME } from './layout';

/** One slot on the shelf: a product volume, or the blank next volume. */
export interface VolumeNode {
  /** Index into the ordered volumes; -1 for the blank next volume. */
  volume: number;
  slot: number;
  group: Group;
  mirror: Group;
  slab: Mesh;
  rest: Vector3;
  lift: number;
  liftTarget: number;
  /** Side faces (and their reflections): dark in the row's gaps, lit when slid out. */
  sides: MeshStandardMaterial[];
  tone: Color;
}

export interface ShelfPrint {
  colour: string;
  spine: Texture | null;
  cover: Texture | null;
}

/** The unprinted box white, and the blank volume that says the set goes on. */
const BOX_WHITE = '#f4f2f1';
const BOX_EDGE = '#e2e0ea';
const BLANK = '#f1f0f6';
const FLOOR = '#fbfaff';
/** Side faces read as the dark seams between volumes; slid out, they light up. */
const SIDE_SHADE = { rest: 0.6, out: 0.86 };
const PRINT_LIFT = 0.0012;
const LIFT = { up: 0.012, out: 0.09 };

/** Reflection strength at the floor and the height over which it fades. */
const MIRROR = new Vector2(0.26, 0.2);

function mirrored<T extends MeshStandardMaterial>(material: T): T {
  const copy = material.clone() as T;
  copy.transparent = false;
  copy.depthWrite = !copy.map;
  copy.blending = CustomBlending;
  copy.blendSrc = OneFactor;
  copy.blendDst = OneMinusSrcAlphaFactor;
  copy.blendSrcAlpha = OneFactor;
  copy.blendDstAlpha = OneMinusSrcAlphaFactor;
  copy.onBeforeCompile = shader => {
    shader.uniforms.uMirror = { value: MIRROR };
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying float vMirrorY;'
      )
      .replace(
        '#include <project_vertex>',
        '#include <project_vertex>\nvMirrorY = (modelMatrix * vec4(transformed, 1.0)).y;'
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying float vMirrorY;\nuniform vec2 uMirror;'
      )
      .replace(
        '#include <dithering_fragment>',
        [
          'gl_FragColor.a *= uMirror.x * pow(1.0 - clamp(-vMirrorY / uMirror.y, 0.0, 1.0), 1.6);',
          'gl_FragColor.rgb *= gl_FragColor.a;',
          '#include <dithering_fragment>',
        ].join('\n')
      );
  };
  copy.customProgramCacheKey = () =>
    `shelf-mirror-${copy.map ? 'print' : 'slab'}`;
  return copy;
}

function paper(colour: string | Color) {
  return new MeshStandardMaterial({
    color: colour,
    roughness: 0.62,
    metalness: 0,
  });
}

function printMaterial(map: Texture) {
  return new MeshStandardMaterial({
    map,
    transparent: true,
    depthWrite: false,
    roughness: 0.62,
    metalness: 0,
  });
}

/** A soft footprint shadow and a tight contact line, drawn once. */
function shadowTexture(length: number, depth: number, margin: number) {
  const scale = Math.min(160, 4096 / (length + margin * 2));
  const el = document.createElement('canvas');
  el.width = Math.round((length + margin * 2) * scale);
  el.height = Math.round((depth + margin * 2) * scale);
  const ctx = el.getContext('2d');
  if (!ctx) throw new Error('Shelf: no 2D canvas context');
  const rect = (blur: number, alpha: number, grow: number) => {
    const away = el.width + el.height;
    ctx.shadowColor = `rgba(255,255,255,${alpha})`;
    ctx.shadowBlur = blur * scale;
    ctx.shadowOffsetX = away;
    ctx.fillStyle = '#fff';
    ctx.fillRect(
      (margin - grow) * scale - away,
      (margin - grow) * scale,
      (length + grow * 2) * scale,
      (depth + grow * 2) * scale
    );
  };
  rect(0.22, 0.42, 0.04);
  rect(0.05, 0.4, 0);
  rect(0.008, 0.6, -0.004);
  return new CanvasTexture(el);
}

/**
 * The light floor: a soft pool, brightest along the row's front and gone
 * before the canvas edges, so it melts into the page around it.
 */
function floorTexture(length: number, depth: number, margin: number) {
  const scale = Math.min(48, 2048 / (length + margin * 2));
  const el = document.createElement('canvas');
  el.width = Math.round((length + margin * 2) * scale);
  el.height = Math.round((depth + margin * 2) * scale);
  const ctx = el.getContext('2d');
  if (!ctx) throw new Error('Shelf: no 2D canvas context');
  const away = el.width + el.height;
  ctx.shadowColor = 'rgba(255,255,255,1)';
  ctx.shadowBlur = 0.9 * scale;
  ctx.shadowOffsetX = away;
  ctx.fillStyle = '#fff';
  // Canvas x runs along the row from -margin; canvas y from the back (z = -depth - margin).
  const left = 0.6;
  const right = length + 0.1;
  const back = -depth - 0.4;
  const front = 0.05;
  ctx.fillRect(
    (left + margin) * scale - away,
    (back + depth + margin) * scale,
    (right - left) * scale,
    (front - back) * scale
  );
  return new CanvasTexture(el);
}

export function lights() {
  const sky = new HemisphereLight('#ffffff', '#e6e3f1', 3.14);
  const key = new DirectionalLight('#fffdfb', 0.5);
  key.position.set(-0.35, 0.55, 0.76).multiplyScalar(10);
  return [sky, key];
}

/**
 * The shelf: every volume as a bevelled slab with its printed spine (and the
 * featured box's printed cover), their reflections under the floor, the
 * floor's depth for the lens, and the contact shadow.
 */
export function buildShelf(prints: ShelfPrint[]) {
  const root = new Group();
  const mirrors = new Group();
  root.add(mirrors);
  const nodes: VolumeNode[] = [];
  const disposables: { dispose(): void }[] = [];

  const box = new RoundedBoxGeometry(
    VOLUME.boxT,
    VOLUME.h,
    VOLUME.d,
    3,
    VOLUME.bevel
  );
  const spine = new RoundedBoxGeometry(
    VOLUME.t,
    VOLUME.h,
    VOLUME.d,
    3,
    VOLUME.bevel
  );
  const spineFace = new PlaneGeometry(
    VOLUME.t - VOLUME.bevel * 2,
    VOLUME.h - VOLUME.bevel * 2
  );
  const coverFace = new PlaneGeometry(
    VOLUME.d - VOLUME.bevel * 2,
    VOLUME.h - VOLUME.bevel * 2
  );
  disposables.push(box, spine, spineFace, coverFace);

  const slots = [...prints.map((print, volume) => ({ print, volume })), null];
  slots.forEach((entry, slot) => {
    const featured = slot === 0;
    const colour = new Color(
      entry ? (featured ? BOX_WHITE : entry.print.colour) : BLANK
    );
    const face = paper(colour);
    const side = paper(colour.clone().multiplyScalar(SIDE_SHADE.rest));
    // The box's narrow front sits a shade under its cover, as in the art.
    const front = featured ? paper(BOX_EDGE) : face;
    // BoxGeometry groups: +x, -x, +y, -y, +z, -z.
    const materials: Material[] = [
      side,
      featured ? face : side,
      face,
      face,
      front,
      face,
    ];
    const planes: { mesh: Mesh; map: Texture }[] = [];

    const t = slotT(slot);
    const group = new Group();
    const slab = new Mesh(featured ? box : spine, materials);
    group.add(slab);
    if (entry?.print.spine) {
      const mesh = new Mesh(spineFace, printMaterial(entry.print.spine));
      mesh.position.z = VOLUME.d / 2 + PRINT_LIFT;
      planes.push({ mesh, map: entry.print.spine });
    }
    if (entry?.print.cover) {
      const mesh = new Mesh(coverFace, printMaterial(entry.print.cover));
      mesh.rotation.y = -Math.PI / 2;
      mesh.position.x = -t / 2 - PRINT_LIFT;
      planes.push({ mesh, map: entry.print.cover });
    }
    planes.forEach(({ mesh }) => group.add(mesh));
    const rest = new Vector3(slotX(slot) + t / 2, VOLUME.h / 2, -VOLUME.d / 2);
    group.position.copy(rest);
    root.add(group);

    const mirror = new Group();
    const mirrorSide = mirrored(side);
    const mirrorSlab = new Mesh(slab.geometry, [
      mirrorSide,
      featured ? mirrored(face) : mirrorSide,
      mirrored(face),
      mirrored(face),
      mirrored(front),
      mirrored(face),
    ]);
    mirrorSlab.renderOrder = -3;
    mirror.add(mirrorSlab);
    planes.forEach(({ mesh }) => {
      const copy = new Mesh(
        mesh.geometry,
        mirrored(mesh.material as MeshStandardMaterial)
      );
      copy.position.copy(mesh.position);
      copy.rotation.copy(mesh.rotation);
      copy.renderOrder = -2.5;
      mirror.add(copy);
    });
    mirror.scale.y = -1;
    mirrors.add(mirror);

    slab.userData.node = nodes.length;
    nodes.push({
      volume: entry ? entry.volume : -1,
      slot,
      group,
      mirror,
      slab,
      rest,
      lift: 0,
      liftTarget: 0,
      sides: [side, mirrorSide],
      tone: colour,
    });
    disposables.push(
      face,
      side,
      front,
      ...planes.map(({ mesh }) => mesh.material as Material)
    );
    disposables.push(...planes.map(({ map }) => map));
    mirror.traverse(node => {
      if (node instanceof Mesh) {
        const list = Array.isArray(node.material)
          ? node.material
          : [node.material];
        disposables.push(...list);
      }
    });
  });

  const floor = new Mesh(
    new PlaneGeometry(400, 400),
    new MeshBasicMaterial({ colorWrite: false })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.renderOrder = -2;
  root.add(floor);
  disposables.push(floor.geometry, floor.material);

  const length = slotX(slots.length - 1) + VOLUME.t;

  const floorMargin = 1.6;
  const floorMap = floorTexture(length, VOLUME.d, floorMargin);
  const surface = new Mesh(
    new PlaneGeometry(length + floorMargin * 2, VOLUME.d + floorMargin * 2),
    new MeshBasicMaterial({
      map: floorMap,
      color: FLOOR,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    })
  );
  surface.rotation.x = -Math.PI / 2;
  surface.position.set(length / 2, 0, -VOLUME.d / 2);
  surface.renderOrder = -4;
  root.add(surface);
  disposables.push(surface.geometry, surface.material, floorMap);

  const margin = 0.32;
  const shadowMap = shadowTexture(length, VOLUME.d, margin);
  const shadow = new Mesh(
    new PlaneGeometry(length + margin * 2, VOLUME.d + margin * 2),
    new MeshBasicMaterial({
      map: shadowMap,
      color: '#282338',
      transparent: true,
      depthWrite: false,
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(length / 2, 0.0015, -VOLUME.d / 2);
  shadow.renderOrder = -1;
  root.add(shadow);
  disposables.push(shadow.geometry, shadow.material, shadowMap);

  /** Move every volume to its lift (0 at rest, 1 slid out). */
  const place = () => {
    for (const node of nodes) {
      const up = node.lift * LIFT.up;
      const out = node.lift * LIFT.out;
      node.group.position.set(node.rest.x, node.rest.y + up, node.rest.z + out);
      node.mirror.position.set(
        node.rest.x,
        -(node.rest.y + up),
        node.rest.z + out
      );
      const shade =
        SIDE_SHADE.rest + (SIDE_SHADE.out - SIDE_SHADE.rest) * node.lift;
      for (const side of node.sides)
        side.color.copy(node.tone).multiplyScalar(shade);
    }
  };
  place();

  /** World point just above a volume's printed face, for its name tag. */
  const anchor = (node: VolumeNode, out = new Vector3()) => {
    const { group } = node;
    if (node.slot === 0)
      return out
        .set(0, VOLUME.h + 0.02, -VOLUME.d / 2)
        .add(group.position)
        .sub(node.rest);
    return out.set(
      group.position.x,
      group.position.y + VOLUME.h / 2 + 0.02,
      group.position.z + VOLUME.d / 2
    );
  };

  return {
    root,
    nodes,
    pickables: nodes.filter(node => node.volume >= 0).map(node => node.slab),
    place,
    anchor,
    dispose() {
      disposables.forEach(item => item.dispose());
    },
  };
}

export type Shelf = ReturnType<typeof buildShelf>;
