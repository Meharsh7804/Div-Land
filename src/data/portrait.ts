import type { SkillId } from "./making";

export const PORTRAIT_SRC = "/divya/divya.webp";
export const PORTRAIT_WIDTH = 720;
export const PORTRAIT_HEIGHT = 1469;
export const PORTRAIT_ASPECT = `${PORTRAIT_WIDTH} / ${PORTRAIT_HEIGHT}`;

type Point = [number, number];

export type PortraitFragment = {
  id: string;
  skill: SkillId;
  box: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  clip: string;
  inner: {
    width: string;
    height: string;
    left: string;
    top: string;
  };
  drift: {
    x: number;
    y: number;
    rotate: number;
    scale: number;
    opacity: number;
  };
};

const COLS = 3;
const ROWS = 7;

const ROW_SKILLS: SkillId[] = [
  "creativity",
  "cooking",
  "kindness",
  "confidence",
  "marwadi-dimaag",
  "allrounder",
  "emotional",
];

const SKILL_ANCHORS: Record<SkillId, [number, number]> = {
  creativity: [-0.64, -0.55],
  cooking: [0.64, -0.56],
  kindness: [-0.66, -0.04],
  confidence: [0.66, 0.03],
  "marwadi-dimaag": [-0.64, 0.54],
  allrounder: [0.64, 0.55],
  emotional: [0, 0.63],
};

function createRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildFragments(): PortraitFragment[] {
  const rng = createRng(0x51f15e);
  const grid: Point[][] = [];

  for (let row = 0; row <= ROWS; row += 1) {
    const points: Point[] = [];
    for (let col = 0; col <= COLS; col += 1) {
      let x = col / COLS;
      let y = row / ROWS;
      if (col > 0 && col < COLS) {
        x += (rng() - 0.5) * 0.058;
      }
      if (row > 0 && row < ROWS) {
        y += (rng() - 0.5) * 0.026;
      }
      points.push([x, y]);
    }
    grid.push(points);
  }

  const fragments: PortraitFragment[] = [];

  for (let row = 0; row < ROWS; row += 1) {
    const skill = ROW_SKILLS[row];
    const anchor = SKILL_ANCHORS[skill];

    for (let col = 0; col < COLS; col += 1) {
      const index = row * COLS + col;
      const points: Point[] = [
        grid[row][col],
        grid[row][col + 1],
        grid[row + 1][col + 1],
        grid[row + 1][col],
      ];
      const xs = points.map((point) => point[0]);
      const ys = points.map((point) => point[1]);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const boxW = maxX - minX;
      const boxH = maxY - minY;

      const clip = `polygon(${points
        .map(
          ([x, y]) =>
            `${(((x - minX) / boxW) * 100).toFixed(3)}% ${(((y - minY) / boxH) * 100).toFixed(3)}%`,
        )
        .join(", ")})`;

      const driftX = anchor[0] + (rng() - 0.5) * 0.24;
      const driftY = anchor[1] + (rng() - 0.5) * 0.2;

      fragments.push({
        id: `piece-${index + 1}`,
        skill,
        box: { x: minX, y: minY, w: boxW, h: boxH },
        clip,
        inner: {
          width: `${(100 / boxW).toFixed(4)}%`,
          height: `${(100 / boxH).toFixed(4)}%`,
          left: `${((-minX / boxW) * 100).toFixed(4)}%`,
          top: `${((-minY / boxH) * 100).toFixed(4)}%`,
        },
        drift: {
          x: driftX,
          y: driftY,
          rotate: (rng() * 2 - 1) * 24,
          scale: 0.34 + rng() * 0.13,
          opacity: 0.26 + rng() * 0.16,
        },
      });
    }
  }

  return fragments;
}

export const portraitFragments = buildFragments();
