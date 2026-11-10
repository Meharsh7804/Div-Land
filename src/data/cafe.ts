export type DrinkId = "cappuccino" | "cold-coffee" | "latte" | "mocha" | "special";

export type MenuItem = {
  id: DrinkId;
  name: string;
  notes: string;
  price: string;
  tag?: string;
  liquid: string;
  foam: string;
  accent: string;
};

export const cafe = {
  eyebrow: "Chapter 04 · If you owned a Café",
  title: "Coffee, Conversations & Absolutely no plans to leave.",
  script: "Table for two please",
  intro:
    "A tiny café with one favourite regular, one table, and no closing time. Everything's free, especially the long conversations.",
  menu: [
    {
      id: "cappuccino",
      name: "Overthinking Cappuccino",
      notes: "Extra foam, extra spirals. Served with a side of 'but what if...'",
      price: "on me",
      tag: "best-seller",
      liquid: "#B9835F",
      foam: "#FFF3DD",
      accent: "#D9A679",
    },
    {
      id: "cold-coffee",
      name: "Drama Queen Cold Coffee",
      notes: "Dramatically tall. Obviously. Whipped cream for emotional support.",
      price: "still free",
      liquid: "#8E5A45",
      foam: "#FFF8EA",
      accent: "#8EA5DA",
    },
    {
      id: "latte",
      name: "Deep Talk Latte",
      notes: "Best after midnight. Pairs well with saying things you've never said out loud.",
      price: "no charge",
      tag: "refillable",
      liquid: "#C79A70",
      foam: "#FFF1DA",
      accent: "#E0B98F",
    },
    {
      id: "mocha",
      name: "Gossip Mocha",
      notes: "Comes with zero judgement and an unreasonable number of plot twists.",
      price: "free obviously",
      liquid: "#6B4432",
      foam: "#FFF0D6",
      accent: "#B0708C",
    },
    {
      id: "special",
      name: "Div's Special",
      notes: "The owner's favourite. Secret ingredients: good food, better company.",
      price: "always free",
      tag: "chef's pick",
      liquid: "#C58A55",
      foam: "#FFF6E3",
      accent: "#FFF0B8",
    },
  ] satisfies MenuItem[],
  machine: {
    label: "the little coffee machine",
    idle: "Brew a cup",
    grinding: "Grinding the beans...",
    brewing: "Pouring something warm...",
    done: "Freshly brewed",
    brewAgain: "Brew another cup",
  },
  messages: [
    "Coffee first. Conversation immediately after.",
    "Brewed at exactly the right temperature for a long conversation.",
    "Contains zero judgement and a dangerous amount of 'tell me everything.'",
    "Strong coffee, longer catch-up.",
    "Warning: may cause spontaneous deep talks.",
    "Freshly poured for the one who always asks if I've eaten.",
  ],
  certificate: {
    title: "Officially Certified",
    headline: "90% Coffee. 10% Human.",
    body: "This certifies that Sonu runs on coffee, food, and conversations that go on for hours. Refills are on me. So is the good company.",
    seal: "quality checked by the café",
  },
  counter: {
    label: "Cups poured",
    suffix: "all for you",
  },
  menuCopy: {
    boardTitle: "Today's menu",
    boardNote: "everything tastes better when you're the one talking",
    hint: "Pick a drink. The machine will handle the rest.",
  },
} as const;

export const menuCopy = cafe.menuCopy;
