export type PersonalityMode = "world" | "mine";

export type Personality = {
  id: PersonalityMode;
  tab: string;
  kicker: string;
  title: string;
  quote: string;
  traits: string[];
  stats: { label: string; value: string }[];
  note: string;
};

export const personalities: Record<PersonalityMode, Personality> = {
  world: {
    id: "world",
    tab: "The World's Divya",
    kicker: "The public edition",
    title: "Independent. Unbothered. Booked and busy.",
    quote:
      "\u201cShe's got it handled.\u201d — everyone, right up until the overthinking starts.",
    traits: ["IDGAF energy", "selectively available", "main character", "baddie"],
    stats: [
      { label: "Public availability", value: "Extremely limited" },
      { label: "Attitude level", value: "Depends on the day" },
      { label: "IDGAF energy", value: "Fully charged" },
      { label: "Soft side", value: "Sealed. Allegedly." },
    ],
    note: "Stands like she invented confidence. Probably did.",
  },
  mine: {
    id: "mine",
    tab: "Off-Duty Divya",
    kicker: "The unfiltered edition",
    title: "Soft-hearted. Dramatic. A full-time menace.",
    quote:
      "Fiercely protective. Permanently hungry.",
    traits: ["soft-hearted", "food-motivated", "dramatic", "little baby", "needs a nap"],
    stats: [
      { label: "Pampering privileges", value: "Suspiciously generous" },
      { label: "Drama department", value: "Permanently operational" },
      { label: "Softness", value: "Available 24/7" },
      { label: "Nap privileges", value: "Unlimited" },
    ],
    note: "The softest one in the room. Don't tell anyone.",
  },
};

export const filesCopy = {
  eyebrow: "Chapter 02 · The Divya Files",
  title: "Two versions. Both completely her.",
  script: "both 100% her. one just hides it better.",
  hint: "flip the switch",
};
