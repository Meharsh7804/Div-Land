export const INTRO_STAGE = {
  dusk: 0,
  dawn: 1,
  title: 2,
  gate: 3,
  ready: 4,
} as const;

export type IntroStage = (typeof INTRO_STAGE)[keyof typeof INTRO_STAGE];

/**
 * The opening is one continuous shot, not a set of cards.
 * Each beat hands the eye to the next subject: light, then name, then gate.
 */
export const INTRO_BEATS: ReadonlyArray<readonly [number, IntroStage]> = [
  [240, INTRO_STAGE.dawn],
  [3000, INTRO_STAGE.title],
  [5900, INTRO_STAGE.gate],
  [6000, INTRO_STAGE.ready],
];
