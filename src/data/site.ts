export const site = {
  name: "Divya Land",
  recipient: "Divya",
  nickname: "Sonu",
  tagline: "Everything in here is about you. Obviously.",
  quote: "Good food, better conversation, and nowhere else to be.",
  music: {
    // Drop your own licensed/original instrumental at public/music/theme.mp3
    // and set the path below. If empty (or the file can't play), the site
    // gracefully falls back to a soft, generated ambient soundscape.
    src: "",
    title: "a small theme for Sonu",
    volume: 0.32,
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
    label: "Sonu's Little Café",
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
    id: "gallery",
    number: "06",
    label: "The Talent Gallery",
    short: "Chhota packet",
    sectionId: "chapter-gallery",
  },
  {
    id: "letter",
    number: "07",
    label: "A Letter for Sonu",
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
  line: "Eight chapters, a lot of food, and one very long letter.",
  hint: "scroll gently — the world opens as you go",
};
