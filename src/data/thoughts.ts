export type Thought = {
  id: string;
  text: string;
  tone?: "butter" | "blush" | "lavender" | "peach" | "sage";
};

export const thoughts: Thought[] = [
  {
    id: "talented",
    text: "You're more talented than you realise.",
    tone: "butter",
  },
  {
    id: "rangoli",
    text: "Your rangoli deserves its own little world.",
    tone: "peach",
  },
  {
    id: "exist",
    text: "Someone is genuinely glad you exist.",
    tone: "blush",
  },
  {
    id: "care",
    text: "You deserve the same care you give everyone else.",
    tone: "lavender",
  },
  {
    id: "ordinary",
    text: "You make ordinary days better.",
    tone: "butter",
  },
  {
    id: "strong",
    text: "You don't always have to be strong.",
    tone: "sage",
  },
  {
    id: "goodthings",
    text: "Good things are allowed to happen to you.",
    tone: "blush",
  },
  {
    id: "happiness",
    text: "You deserve happiness, good food, coffee, and beautiful conversations.",
    tone: "peach",
  },
  {
    id: "rest",
    text: "You're allowed to rest without earning it first.",
    tone: "lavender",
  },
  {
    id: "figuring",
    text: "You don't have to have it all figured out to be doing beautifully.",
    tone: "butter",
  },
  {
    id: "stories",
    text: "Your side stories are someone's favourite part of the day.",
    tone: "blush",
  },
  {
    id: "ask",
    text: "Asking to be taken care of doesn't make you a burden.",
    tone: "sage",
  },
];

export const labCopy = {
  eyebrow: "Chapter 03 · The Positive Overthinking Centre",
  title: "A machine for better thoughts.",
  script: "insert overthinking. receive something kinder.",
  warning: "Negative overthinking is temporarily unavailable.",
  footnote: "one thought at a time · no queue · no charge",
  button: "Convert a thought",
  again: "Convert another",
  processing: "Recalibrating...",
  emptyLabel: "thought chamber empty",
  emptyHint: "the machine is waiting for one",
  machine: {
    name: "The Thought-o-Matic",
    sub: "positive thought converter",
    chamber: "thought chamber",
    ready: "ready to convert",
    busy: "converting...",
    warningLabel: "notice",
  },
} as const;
