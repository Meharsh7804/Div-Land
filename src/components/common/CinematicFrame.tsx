"use client";

import { AnimatePresence, motion } from "motion/react";
import { EASE_CINEMA } from "@/animations/motion";
import { cn } from "@/lib/utils";

export type SceneTone = "dawn" | "day" | "dusk" | "night";

const TONES: Record<
  SceneTone,
  { wash: string; glow: string; edge: string; bar: string }
> = {
  dawn: {
    wash: "linear-gradient(180deg, rgba(255,240,184,.2), rgba(246,220,231,.12) 45%, rgba(73,51,72,.12))",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(255,240,184,.24), transparent 46%)",
    edge: "rgba(73,51,72,.5)",
    bar: "linear-gradient(90deg, rgba(73,51,72,.7), rgba(201,142,168,.55) 50%, rgba(73,51,72,.7))",
  },
  day: {
    wash: "linear-gradient(180deg, rgba(255,220,203,.2), rgba(255,240,184,.14) 48%, rgba(73,51,72,.1))",
    glow: "radial-gradient(ellipse at 70% 4%, rgba(255,240,184,.26), transparent 48%)",
    edge: "rgba(73,51,72,.44)",
    bar: "linear-gradient(90deg, rgba(73,51,72,.62), rgba(255,240,184,.55) 50%, rgba(73,51,72,.62))",
  },
  dusk: {
    wash: "linear-gradient(180deg, rgba(201,142,168,.2), rgba(220,213,245,.13) 38%, rgba(47,31,46,.2))",
    glow: "radial-gradient(ellipse at 30% 8%, rgba(255,220,203,.2), transparent 46%)",
    edge: "rgba(47,31,46,.6)",
    bar: "linear-gradient(90deg, rgba(47,31,46,.72), rgba(201,142,168,.5) 50%, rgba(47,31,46,.72))",
  },
  night: {
    wash: "linear-gradient(180deg, rgba(220,213,245,.12), rgba(73,51,72,.16) 42%, rgba(47,31,46,.3))",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(255,240,184,.2), transparent 44%)",
    edge: "rgba(47,31,46,.72)",
    bar: "linear-gradient(90deg, rgba(47,31,46,.85), rgba(255,240,184,.5) 50%, rgba(47,31,46,.85))",
  },
};

const CORNERS = [
  "left-3 top-3 border-l border-t",
  "right-3 top-3 border-r border-t",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

export function CinematicFrame({
  visible,
  tone = "dawn",
}: {
  visible: boolean;
  tone?: SceneTone;
}) {
  const palette = TONES[tone];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[71] overflow-hidden transition-opacity duration-1000",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={tone}
          className="absolute inset-0 max-md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.35, ease: EASE_CINEMA }}
        >
          <div
            className="absolute inset-0"
            style={{ background: palette.wash, mixBlendMode: "soft-light" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: palette.glow, mixBlendMode: "screen" }}
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 max-md:hidden"
        style={{ boxShadow: "inset 0 0 190px rgba(47,31,46,.18)" }}
      />

      <div className="absolute inset-x-0 top-0 h-[clamp(4px,0.6vw,7px)]">
        <div className="h-full w-full opacity-75" style={{ background: palette.bar }} />
        <div className="h-px w-full bg-black/20" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[clamp(4px,0.6vw,7px)]">
        <div className="h-px w-full bg-black/15" />
        <div className="h-full w-full opacity-50" style={{ background: palette.bar }} />
      </div>

      {CORNERS.map((position) => (
        <span
          key={position}
          className={cn("absolute h-4 w-4 opacity-40", position)}
          style={{ borderColor: palette.edge }}
        />
      ))}
    </div>
  );
}
