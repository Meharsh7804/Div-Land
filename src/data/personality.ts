export type PersonalityMode = "world" | "mine";

export type Personality = {
  id: PersonalityMode;
  tab: string;
  short: string;
  kicker: string;
  headline: string;
  support: string;
  caption: string;
};

export const personalities: Record<PersonalityMode, Personality> = {
  world: {
    id: "world",
    tab: "Public Divya",
    short: "public",
    kicker: "public mode",
    headline: "Unavailable. IDGAF. Cool Diva.",
    support: "Responsibilities. Deadlines. Meetings.",
    caption: "Unavailable. IDGAF. Booked.",
  },
  mine: {
    id: "mine",
    tab: "Off-Duty Sonu",
    short: "off-duty",
    kicker: "off-duty mode",
    headline: "Softness detected. Pampering required.",
    support: "Personal time. Self-care. Relaxation.",
    caption: "Softness detected. Pampering required.",
  },
};

export const filesCopy = {
  eyebrow: "The Divya Files",
  title: "One person. Two settings.",
  footer: "Both are 100% same person.",
  hint: "Drag the mood",
};
