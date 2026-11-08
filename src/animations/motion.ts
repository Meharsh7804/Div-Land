export type Bezier = [number, number, number, number];

/**
 * One motion language for the whole film.
 *
 * - `scene`   the house curve. Everything settles with it.
 * - `enter`   slower, softer approach for titles and hero beats.
 * - `exit`    accelerating departure for cards and overlays.
 * - `cinema`  a long, deliberate wipe used only for scene changes.
 * - `soft`    gentle micro-interactions.
 */
export const EASE_SCENE: Bezier = [0.22, 1, 0.36, 1];
export const EASE_CURTAIN: Bezier = [0.65, 0, 0.35, 1];
export const EASE_SOFT: Bezier = [0.33, 1, 0.68, 1];
export const EASE_ENTER: Bezier = [0.16, 1, 0.3, 1];
export const EASE_EXIT: Bezier = [0.7, 0, 0.84, 0];
export const EASE_CINEMA: Bezier = [0.83, 0, 0.17, 1];

/**
 * Timing scale. Reach for a token instead of a magic number so every
 * chapter breathes at the same rhythm.
 */
export const DUR = {
  micro: 0.26,
  quick: 0.42,
  base: 0.72,
  wide: 0.95,
  scene: 1.15,
  chapter: 1.6,
  title: 1.25,
} as const;

export const STAGGER = {
  tight: 0.04,
  word: 0.045,
  base: 0.08,
  loose: 0.13,
} as const;

export const VIEWPORT = {
  once: true,
  amount: 0.22,
} as const;

export const VIEWPORT_EARLY = {
  once: true,
  amount: 0.12,
} as const;

export const VIEWPORT_SCENE = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -12% 0px",
} as const;

export const titleLine = {
  hidden: { y: "112%", rotate: 1.5 },
  show: { y: "0%", rotate: 0 },
};
