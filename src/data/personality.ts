export type PersonalityMode = "world" | "mine";

export type Personality = {
  id: PersonalityMode;
  tab: string;
  short: string;
  kicker: string;
  caption: string;
};

export const personalities: Record<PersonalityMode, Personality> = {
  world: {
    id: "world",
    tab: "Public Divya",
    short: "public",
    kicker: "public mode",
    caption: "Unavailable. Unbothered. Booked.",
  },
  mine: {
    id: "mine",
    tab: "Off-Duty Sonu",
    short: "off-duty",
    kicker: "off-duty mode",
    caption: "Softness detected. Pampering required.",
  },
};

export const filesCopy = {
  eyebrow: "The Divya Files",
  title: "One person. Two settings.",
  footer: "Both are 100% Sonu.",
  hint: "drag the mood",
};
