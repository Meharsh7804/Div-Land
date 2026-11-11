import type { SfxName } from "@/lib/audio-engine";

export type SkillId =
  | "artistry"
  | "confidence"
  | "speaking"
  | "marwadi-dimaag"
  | "smartness"
  | "allrounder"
  | "kindness";

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
    id: "artistry",
    label: "Artistry",
    chip: "Artistry",
    note: "colour spills",
    sfx: "page",
    restRotate: -3,
    position: "lg:absolute lg:left-[1.5%] lg:top-[5%] lg:w-[10.5rem] xl:left-[4%]",
    accent: {
      paper: "#FCE9EF",
      border: "rgba(176, 112, 140, 0.28)",
      wash: "#F7D7E3",
      ink: "#9C5A78",
      particles: ["#C95D86", "#E8A6BC", "#F6C6A8", "#B58BB8"],
    },
  },
  {
    id: "confidence",
    label: "Confidence",
    chip: "Confidence",
    note: "pencil lines",
    sfx: "page",
    restRotate: 2.4,
    position:
      "lg:absolute lg:right-[1.5%] lg:top-[2%] lg:w-[11rem] xl:right-[4%]",
    accent: {
      paper: "#F2EEE6",
      border: "rgba(92, 70, 87, 0.24)",
      wash: "#E8E1D5",
      ink: "#5C4657",
      particles: ["#5C4657", "#8A7A88", "#C9BFE9", "#D6A23F"],
    },
  },
  {
    id: "speaking",
    label: "Public Speaking",
    chip: "Public Speaking",
    note: "the room listens",
    sfx: "lights",
    restRotate: -2,
    position: "lg:absolute lg:left-0 lg:top-[36%] lg:w-[10rem]",
    accent: {
      paper: "#F6F1DC",
      border: "rgba(160, 132, 68, 0.26)",
      wash: "#F3E7BC",
      ink: "#8A6B2E",
      particles: ["#D6A23F", "#FFF0B8", "#DCD5F5", "#C98EA8"],
    },
  },
  {
    id: "marwadi-dimaag",
    label: "Marwadi Dimaag",
    chip: "Marwadi Dimaag",
    note: "lights, camera, you",
    sfx: "lights",
    restRotate: 2.8,
    position: "lg:absolute lg:right-0 lg:top-[31%] lg:w-[10rem]",
    accent: {
      paper: "#FCEBDF",
      border: "rgba(180, 111, 76, 0.24)",
      wash: "#F8D9C4",
      ink: "#A3674D",
      particles: ["#E38E5D", "#FFDCCB", "#D6A23F", "#C95D86"],
    },
  },
  {
    id: "smartness",
    label: "Smartness",
    chip: "Smartness",
    note: "a hundred ideas",
    sfx: "spark",
    restRotate: -2.6,
    position:
      "lg:absolute lg:left-[4%] lg:bottom-[10%] lg:w-[10.5rem] xl:left-[7%]",
    accent: {
      paper: "#F0ECFA",
      border: "rgba(120, 100, 170, 0.24)",
      wash: "#E2DAF5",
      ink: "#7561A0",
      particles: ["#8A6BB5", "#DCD5F5", "#E38E5D", "#4E8C7A"],
    },
  },
  {
    id: "allrounder",
    label: "Being an All-Rounder",
    chip: "All-Rounder",
    note: "all of it, always",
    sfx: "spark",
    restRotate: 2.2,
    position:
      "lg:absolute lg:right-[4%] lg:bottom-[6%] lg:w-[11rem] xl:right-[7%]",
    accent: {
      paper: "#EAF0E6",
      border: "rgba(94, 126, 88, 0.24)",
      wash: "#DCE8D6",
      ink: "#5E7E58",
      particles: ["#7C9A70", "#C7D3BD", "#D6A23F", "#C98EA8"],
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
      "lg:absolute lg:bottom-0 lg:left-[calc(50%-5.25rem)] lg:w-[10.5rem]",
    accent: {
      paper: "#FDEDEA",
      border: "rgba(190, 104, 118, 0.24)",
      wash: "#F9D9D9",
      ink: "#B06876",
      particles: ["#E8A6BC", "#F6DCE7", "#FFF0B8", "#C7D3BD"],
    },
  },
];
