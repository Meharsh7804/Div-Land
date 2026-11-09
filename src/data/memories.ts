export type MemoryKey =
  | "beginning"
  | "sleep"
  | "food"
  | "conversations"
  | "reels"
  | "unexpected";

export type MemoryTone = "butter" | "blush" | "lavender" | "peach" | "sage";

export type Memory = {
  id: string;
  key: MemoryKey;
  index: string;
  title: string;
  short: string;
  caption: string;
  tone: MemoryTone;
  rotate: string;
  core?: boolean;
};

export const memories: Memory[] = [
  {
    id: "the-beginning",
    key: "beginning",
    index: "01",
    title: "The Beginning",
    short: "the interview",
    caption: "Who knew an interview would start all this?",
    tone: "lavender",
    rotate: "-2.2deg",
  },
  {
    id: "the-sleep-deprived-meeting",
    key: "sleep",
    index: "02",
    title: "The Sleep-Deprived Meeting",
    short: "showing up",
    caption: "Still showed up. That meant a lot.",
    tone: "butter",
    rotate: "1.7deg",
    core: true,
  },
  {
    id: "the-food-dates",
    key: "food",
    index: "03",
    title: "Food Dates",
    short: "table for two",
    caption: "Good food. Better conversations.",
    tone: "peach",
    rotate: "-1.4deg",
  },
  {
    id: "the-conversations",
    key: "conversations",
    index: "04",
    title: "Conversations",
    short: "small hellos",
    caption: "Somewhere between random chats and deep talks.",
    tone: "blush",
    rotate: "2deg",
  },
  {
    id: "the-reel-department",
    key: "reels",
    index: "05",
    title: "Reel Department",
    short: "the dept.",
    caption: "An extremely important department.",
    tone: "lavender",
    rotate: "-1.8deg",
  },
  {
    id: "the-unexpected-friendship",
    key: "unexpected",
    index: "06",
    title: "Unexpected Friendship",
    short: "the surprise",
    caption: "Better than anything we could have planned.",
    tone: "sage",
    rotate: "1.5deg",
  },
];

export const memoriesCopy = {
  eyebrow: "Chapter 05 · The Little Things",
  title: "A scrapbook of things I kept without meaning to.",
  script: "six little scenes, drawn from memory",
  hint: "tap a keepsake to open its scene",
  outro: "Not every memory needs a photograph.",
  coreLabel: "core memory",
  coreNote: "the one I still think about",
  openLabel: "open scene",
  closeLabel: "choose another keepsake",
} as const;

export const memoryToneStyles: Record<
  MemoryTone,
  { paper: string; wash: string; ring: string }
> = {
  butter: {
    paper: "from-[#FFF8DA] via-[#FFF4E8] to-[#FFF9F0]",
    wash: "bg-[#FFF4C6]",
    ring: "ring-[#E9D48A]/55",
  },
  blush: {
    paper: "from-[#FFF0F5] via-[#FFF4E8] to-[#FFF9F0]",
    wash: "bg-[#FBDCE8]",
    ring: "ring-[#DFA9BF]/55",
  },
  lavender: {
    paper: "from-[#F2EEFF] via-[#FFF4E8] to-[#FFF9F0]",
    wash: "bg-[#E7E1FB]",
    ring: "ring-[#B9A9E0]/50",
  },
  peach: {
    paper: "from-[#FFF1E7] via-[#FFF4E8] to-[#FFF9F0]",
    wash: "bg-[#FFE3D0]",
    ring: "ring-[#E8B796]/55",
  },
  sage: {
    paper: "from-[#EFF5E8] via-[#FFF4E8] to-[#FFF9F0]",
    wash: "bg-[#DDE8D1]",
    ring: "ring-[#A9BD97]/55",
  },
};
