export const site = {
  name: "Divya Land",
  recipient: "Divya",
  nickname: "Sonu",
  tagline: "A little universe, made just for you.",
  quote: "Good food, better conversation, and nowhere else to be.",
  music: {
    title: "A small theme for Sonu",
    volume: 0.36,
    sfxVolume: 0.5,
  },
} as const;

export type Chapter = {
  id: string;
  number: string;
  label: string;
  short: string;
  sectionId: string;
};

export const chapters: Chapter[] = [
  {
    id: "invitation",
    number: "01",
    label: "The Invitation",
    short: "The gate",
    sectionId: "top",
  },
  {
    id: "files",
    number: "02",
    label: "The Divya Files",
    short: "Two versions",
    sectionId: "chapter-files",
  },
  {
    id: "overthinking",
    number: "03",
    label: "The Positive Overthinking Centre",
    short: "Think pretty",
    sectionId: "chapter-overthinking",
  },
  {
    id: "cafe",
    number: "04",
    label: "Divy's Little Café",
    short: "Coffee",
    sectionId: "chapter-cafe",
  },
  {
    id: "memories",
    number: "05",
    label: "The Little Things",
    short: "Kept things",
    sectionId: "chapter-memories",
  },
  {
    id: "making",
    number: "06",
    label: "The Making of Divya",
    short: "Little things",
    sectionId: "chapter-making",
  },
  {
    id: "letter",
    number: "07",
    label: "A Letter for My Sonu",
    short: "Sealed",
    sectionId: "chapter-letter",
  },
  {
    id: "finale",
    number: "08",
    label: "The Grand Birthday Finale",
    short: "Make a wish",
    sectionId: "chapter-finale",
  },
];

export const overture = {
  eyebrow: "you're in",
  script: "welcome home, sonu",
  line: "Eight small chapters. One very specific person.",
  hint: "Scroll to open the story",
};
