export type WorldId = "artist" | "voice" | "strength" | "home" | "finale";

export type WorldSfx = "page" | "lights" | "spark" | "candle" | "finale";

export type CaptionLine = {
  text: string;
  style: "display" | "hand" | "accent";
  delay?: number;
};

export type World = {
  id: WorldId;
  number: string;
  label: string;
  shortLabel: string;
  kicker: string;
  action: string;
  prompt: string;
  sfx: WorldSfx;
  accent: "rose" | "butter" | "lavender" | "peach" | "sage";
  caption: CaptionLine[];
};

export const manyWorlds = {
  eyebrow: "Chapter 06 · The Many Worlds of Sonu",
  title: "A little world for every side of you.",
  script: "five worlds · all yours",
  note: "Nothing here is just for looking.",
  next: "Next world",
  previous: "Previous world",
  continue: "Continue to your letter",
  finished: "all five worlds, still only a glimpse",
  hint: "touch the world, and it will answer",
  restart: "Start again",
  credit: "Made by hand, only for Sonu.",
  progress: "worlds discovered",
  discovered: "world discovered",
} as const;

export const worlds: World[] = [
  {
    id: "artist",
    number: "01",
    label: "The Artist",
    shortLabel: "Artist",
    kicker: "where colour begins",
    action: "drag to paint",
    prompt: "Drag a little colour across the canvas. See what she makes of it.",
    sfx: "page",
    accent: "rose",
    caption: [
      { text: "She doesn't just see colours.", style: "display" },
      { text: "She creates with them.", style: "hand" },
    ],
  },
  {
    id: "voice",
    number: "02",
    label: "The Voice",
    shortLabel: "Voice",
    kicker: "the room goes quiet",
    action: "press & hold",
    prompt: "Press and hold the mic until the stage finds her.",
    sfx: "lights",
    accent: "butter",
    caption: [
      { text: "Give her a stage.", style: "display" },
      { text: "She'll own the room.", style: "hand" },
    ],
  },
  {
    id: "strength",
    number: "03",
    label: "The Strong One",
    shortLabel: "Strong",
    kicker: "her own kind of weather",
    action: "part the wind",
    prompt: "Drag the wind aside. She is still standing there.",
    sfx: "spark",
    accent: "lavender",
    caption: [
      { text: "She knows how to stand her ground.", style: "hand" },
    ],
  },
  {
    id: "home",
    number: "04",
    label: "The Responsible One",
    shortLabel: "Home",
    kicker: "the warmth she keeps",
    action: "collect the little things",
    prompt: "Tap the little things she carries. Put them somewhere safe.",
    sfx: "candle",
    accent: "peach",
    caption: [
      { text: "Always there for everyone.", style: "display" },
      { text: "Deserving of care herself.", style: "hand", delay: 3.2 },
    ],
  },
  {
    id: "finale",
    number: "05",
    label: "All These Sides. One Sonu.",
    shortLabel: "All of her",
    kicker: "every world, together",
    action: "bring it together",
    prompt: "Bring the four worlds into the light, one by one.",
    sfx: "finale",
    accent: "sage",
    caption: [
      { text: "Different sides. Countless little things.", style: "display" },
      { text: "One very special Sonu.", style: "accent", delay: 0.7 },
      {
        text: "And this is still just a glimpse of you.",
        style: "hand",
        delay: 2.8,
      },
    ],
  },
];
