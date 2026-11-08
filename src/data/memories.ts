export type MemoryKey =
  | "beginning"
  | "sleep"
  | "food"
  | "conversations"
  | "reels"
  | "unexpected";

export type Memory = {
  id: string;
  key: MemoryKey;
  index: string;
  title: string;
  text: string;
  stamp: string;
  caption: string;
  back: string;
  tape: "butter" | "rose";
  rotate: string;
};

export const memories: Memory[] = [
  {
    id: "the-beginning",
    key: "beginning",
    index: "01",
    title: "The Beginning",
    text: "It started with a committee interview — strictly professional, obviously — and somehow turned into one of my favourite friendships.",
    stamp: "where it started",
    caption: "one interview, one conversation, one very good accident",
    back: "the best thing to come out of a committee room.",
    tape: "butter",
    rotate: "-2.2deg",
  },
  {
    id: "the-sleep-deprived-meeting",
    key: "sleep",
    index: "02",
    title: "The Sleep-Deprived Meeting",
    text: "You came to meet me after barely sleeping for two days. You probably didn't think twice about it. I still think about it.",
    stamp: "core memory",
    caption: "sleep: 0 / showing up anyway: 100",
    back: "still one of the kindest things anyone has done for me.",
    tape: "rose",
    rotate: "1.8deg",
  },
  {
    id: "the-food-dates",
    key: "food",
    index: "03",
    title: "The Food Dates",
    text: "Some of our best plans were barely plans at all. Just food, a table for two, and you doing most of the talking while I happily listen.",
    stamp: "table for two",
    caption: "the unofficial headquarters of every good conversation",
    back: "no plans, no rush, and you doing the talking.",
    tape: "butter",
    rotate: "-1.4deg",
  },
  {
    id: "the-conversations",
    key: "conversations",
    index: "04",
    title: "The Conversations",
    text: "No grand gestures, no big announcement. Just conversations, random Instagram messages, and a friendship that became part of my everyday.",
    stamp: "slow & steady",
    caption: "no grand announcement. just a lot of small hellos.",
    back: "turns out, the small stuff was the whole point.",
    tape: "rose",
    rotate: "2deg",
  },
  {
    id: "the-reel-department",
    key: "reels",
    index: "05",
    title: "The Reel Department",
    text: "At this point, exchanging reels has practically become an independent department of our friendship.",
    stamp: "officially a dept.",
    caption: "budget: snacks. output: questionable humour. attendance: mandatory.",
    back: "this department never sleeps.",
    tape: "butter",
    rotate: "-1.8deg",
  },
  {
    id: "the-unexpected-friendship",
    key: "unexpected",
    index: "06",
    title: "The Unexpected Friendship",
    text: "This friendship was never part of the plan. It turned out better than the plan.",
    stamp: "unexpected favourite",
    caption: "no pressure, no performance, just one of the good surprises.",
    back: "good thing nobody checked the plan.",
    tape: "rose",
    rotate: "1.5deg",
  },
];

export const memoriesCopy = {
  eyebrow: "Chapter 05 · The Little Things",
  title: "A friendship made of small, unplanned things.",
  script: "a scrapbook of things I kept without meaning to",
  hint: "tap the polaroids — they're shy",
  outro: "Not every memory comes with a photo. I drew these anyway.",
};
