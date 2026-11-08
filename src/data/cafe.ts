export type MenuItem = {
  name: string;
  notes: string;
  price: string;
  tag?: string;
};

export const cafe = {
  eyebrow: "Chapter 04 · Sonu's Little Café",
  title: "Coffee, conversations & absolutely no plans to leave.",
  script: "table for two, no rush",
  intro:
    "A tiny café with one favourite regular, one table, and no closing time. Everything's free — especially the long conversations.",
  menu: [
    {
      name: "Overthinking Cappuccino",
      notes: "Extra foam, extra spirals. Served with a side of \u201cbut what if\u2026\u201d",
      price: "on me",
      tag: "best-seller",
    },
    {
      name: "Drama Queen Cold Coffee",
      notes: "Dramatically tall. Obviously. Whipped cream for emotional support.",
      price: "still free",
    },
    {
      name: "Deep Talk Latte",
      notes: "Best after midnight. Pairs well with saying things you've never said out loud.",
      price: "no charge",
      tag: "refillable",
    },
    {
      name: "Unlimited Gossip Mocha",
      notes: "Comes with zero judgement and an unreasonable number of plot twists.",
      price: "free, obviously",
    },
    {
      name: "Sonu Special",
      notes: "The owner's favourite. Secret ingredients: good food, better company.",
      price: "always free",
      tag: "chef's pick",
    },
  ],
  machine: {
    label: "the little coffee machine",
    idle: "Tap the machine",
    grinding: "Grinding the beans\u2026",
    brewing: "Brewing something warm\u2026",
    done: "Your cup is ready",
    brewAgain: "Brew another cup",
  },
  messages: [
    "Coffee first. Conversation immediately after.",
    "Brewed at exactly the right temperature for a long conversation.",
    "Contains zero judgement and a dangerous amount of \u201ctell me everything.\u201d",
    "Strong coffee, longer catch-up.",
    "Warning: may cause spontaneous deep talks.",
    "Freshly poured for the one who always asks if I've eaten.",
  ],
  certificate: {
    title: "Officially Certified",
    headline: "90% coffee, 10% human",
    body: "This certifies that Sonu runs on coffee, food, and conversations that go on for hours. Refills are on me. So is the good company.",
    seal: "quality checked by the café",
  },
  counter: {
    label: "cups poured",
    suffix: "all for you",
  },
};

export const menuCopy = {
  boardTitle: "today's menu",
  boardNote: "everything tastes better when you're the one talking",
  note: "no awkward silences allowed at this table",
};
