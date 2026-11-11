import type { SfxName } from "@/lib/audio-engine";

export type SkillId =
  | "creativity"
  | "cooking"
  | "kindness"
  | "confidence"
  | "marwadi-dimaag"
  | "allrounder"
  | "emotional";

export type Skill = {
  id: SkillId;
  label: string;
  chip: string;
  note: string;
  sfx: SfxName;
  restRotate: number;
  position: string;
  accent: {
    paper: string;
    border: string;
    wash: string;
    ink: string;
    particles: string[];
  };
};

export const makingCopy = {
  eyebrow: "Chapter 06 · The Making of Divya",
  label: "A living portrait",
  title: "The Making of Divya",
  note: "every little thing, made her",
  hint: "Click on each skill to complete it.",
  progress: "little things discovered",
  collected: "little things found",
  messageLineOne: "They say a perfect girl can't exist...",
  messageLineTwo: "I guess they haven't met my Divya.",
  messageSub: "Made of a thousand beautiful little things.",
  again: "Start again",
} as const;

export const skills: Skill[] = [
  {
    id: "creativity",
    label: "Creativity",
    chip: "Creativity",
    note: "colour spills",
    sfx: "page",
    restRotate: -3,
    position:
      "absolute left-[2%] top-[0.5%] w-[7.25rem] sm:left-[15%] sm:top-[1%] sm:w-[8.75rem] lg:left-[1.5%] lg:top-[5%] lg:w-[10.5rem] xl:left-[4%]",
    accent: {
      paper: "#FCE9EF",
      border: "rgba(176, 112, 140, 0.28)",
      wash: "#F7D7E3",
      ink: "#9C5A78",
      particles: ["#C95D86", "#E8A6BC", "#F6C6A8", "#B58BB8"],
    },
  },
  {
    id: "cooking",
    label: "Cooking",
    chip: "Cooking",
    note: "tastes like love",
    sfx: "coffee",
    restRotate: 2.4,
    position:
      "absolute right-[2%] top-[5%] w-[7.25rem] sm:right-[15%] sm:top-[4%] sm:w-[8.75rem] lg:right-[1.5%] lg:top-[2%] lg:w-[11rem] xl:right-[4%]",
    accent: {
      paper: "#FCEBDF",
      border: "rgba(180, 111, 76, 0.24)",
      wash: "#F8D9C4",
      ink: "#A3674D",
      particles: ["#E38E5D", "#FFDCCB", "#D6A23F", "#C95D86"],
    },
  },
  {
    id: "kindness",
    label: "Kindness",
    chip: "Kindness",
    note: "softest superpower",
    sfx: "candle",
    restRotate: -1.6,
    position:
      "absolute left-[0%] top-[31%] w-[7.25rem] sm:left-[12%] sm:w-[8.75rem] lg:left-0 lg:top-[36%] lg:w-[10rem]",
    accent: {
      paper: "#FDEDEA",
      border: "rgba(190, 104, 118, 0.24)",
      wash: "#F9D9D9",
      ink: "#B06876",
      particles: ["#E8A6BC", "#F6DCE7", "#FFF0B8", "#C7D3BD"],
    },
  },
  {
    id: "confidence",
    label: "Confidence",
    chip: "Confidence",
    note: "steady pencil lines",
    sfx: "page",
    restRotate: 2.2,
    position:
      "absolute right-[0%] top-[35%] w-[7.25rem] sm:right-[12%] sm:w-[8.75rem] lg:right-0 lg:top-[31%] lg:w-[10rem]",
    accent: {
      paper: "#F2EEE6",
      border: "rgba(92, 70, 87, 0.24)",
      wash: "#E8E1D5",
      ink: "#5C4657",
      particles: ["#5C4657", "#8A7A88", "#C9BFE9", "#D6A23F"],
    },
  },
  {
    id: "marwadi-dimaag",
    label: "Marwaadi Dimaag",
    chip: "Marwaadi Dimaag",
    note: "the sharpest deal",
    sfx: "spark",
    restRotate: -2.6,
    position:
      "absolute left-[2%] top-[62%] w-[7.25rem] sm:left-[15%] sm:top-[64%] sm:w-[8.75rem] lg:left-[4%] lg:bottom-[10%] lg:w-[10.5rem] xl:left-[7%]",
    accent: {
      paper: "#F6F1DC",
      border: "rgba(160, 132, 68, 0.26)",
      wash: "#F3E7BC",
      ink: "#8A6B2E",
      particles: ["#D6A23F", "#FFF0B8", "#DCD5F5", "#C98EA8"],
    },
  },
  {
    id: "allrounder",
    label: "All Rounder",
    chip: "All-Rounder",
    note: "all of it, always",
    sfx: "spark",
    restRotate: 2.6,
    position:
      "absolute right-[2%] top-[66%] w-[7.25rem] sm:right-[15%] sm:top-[68%] sm:w-[8.75rem] lg:right-[4%] lg:bottom-[6%] lg:w-[11rem] xl:right-[7%]",
    accent: {
      paper: "#EAF0E6",
      border: "rgba(94, 126, 88, 0.24)",
      wash: "#DCE8D6",
      ink: "#5E7E58",
      particles: ["#7C9A70", "#C7D3BD", "#D6A23F", "#C98EA8"],
    },
  },
  {
    id: "emotional",
    label: "Emotional",
    chip: "Emotional",
    note: "feels everything",
    sfx: "envelope",
    restRotate: -2,
    position:
      "absolute bottom-[1%] left-[calc(50%-4.5rem)] w-[9rem] sm:bottom-[0.5%] sm:left-[calc(50%-5rem)] sm:w-[10rem] lg:bottom-0 lg:left-[calc(50%-5.25rem)] lg:w-[10.5rem]",
    accent: {
      paper: "#E4EBF7",
      border: "rgba(96, 116, 160, 0.24)",
      wash: "#D6E0F2",
      ink: "#5D6C96",
      particles: ["#96ACE0", "#C9BFE9", "#E8A6BC", "#FFF0B8"],
    },
  },
];
