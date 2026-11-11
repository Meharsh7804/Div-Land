"use client";

import { motion } from "motion/react";
import { Star4 } from "@/components/common/Illustrations";
import { cn, seeded } from "@/lib/utils";
import { INTRO_STAGE, type IntroStage } from "./introTimeline";

type IntroSparksProps = {
  stage: IntroStage;
  opening: boolean;
  reduced: boolean;
};

const stars = (() => {
  const random = seeded(41);
  return Array.from({ length: 22 }, (_, id) => ({
    id,
    x: 2 + random() * 96,
    y: 2 + random() * 44,
    size: 1.4 + random() * 3,
    delay: random() * 6,
    duration: 3.6 + random() * 4.2,
    opacity: 0.2 + random() * 0.62,
  }));
})();

const fireflies = (() => {
  const random = seeded(73);
  return Array.from({ length: 14 }, (_, id) => ({
    id,
    x: 4 + random() * 92,
    y: 32 + random() * 54,
    size: 3 + random() * 5,
    duration: 7 + random() * 8,
    delay: random() * -14,
    opacity: 0.35 + random() * 0.55,
  }));
})();

export function IntroSparks({ stage, opening, reduced }: IntroSparksProps) {
  const dawn = stage >= INTRO_STAGE.dawn;

  return (
    <>
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: dawn ? 0 : 1 }}
        transition={{ duration: reduced ? 0.01 : 3, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-[41]"
      >
        {stars.map((star) => (
          <Star4
            key={star.id}
            className={cn(
              "absolute text-cream garden-twinkle",
              star.id % 4 === 0 && "hidden sm:block",
            )}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
        <motion.div
          initial={false}
          animate={{ opacity: dawn ? 0.28 : 0.8, scale: dawn ? 1 : 0.94 }}
          transition={{ duration: reduced ? 0.01 : 3.4, ease: "easeOut" }}
          className="absolute right-[13%] top-[12%] h-16 w-16 rounded-full bg-[radial-gradient(circle_at_38%_35%,#FFFDF2,#FFEFC4_58%,#F4D9C6_100%)] shadow-[0_0_70px_26px_rgba(255,240,190,0.35)] sm:h-24 sm:w-24"
        />
        <div className="absolute right-[13%] top-[12%] hidden h-24 w-24 rounded-full border border-cream/30 sm:block" />
      </motion.div>

      <motion.div
        aria-hidden
        initial={false}
        animate={{
          opacity: opening
            ? 0.15
            : stage >= INTRO_STAGE.ready
              ? 0.55
              : stage >= INTRO_STAGE.gate
                ? 0.75
                : 1,
        }}
        transition={{ duration: reduced ? 0.01 : 2.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-[41]"
      >
        {fireflies.map((fly) => (
          <span
            key={fly.id}
            className={cn("intro-firefly absolute rounded-full", fly.id % 3 === 0 && "hidden sm:block")}
            style={{
              left: `${fly.x}%`,
              top: `${fly.y}%`,
              width: fly.size,
              height: fly.size,
              opacity: fly.opacity,
              background:
                "radial-gradient(circle, #FFFBDF 0%, #FFE7A6 45%, rgba(255,214,132,0) 74%)",
              boxShadow: "0 0 12px 3px rgba(255,230,158,0.45)",
              animationDuration: `${fly.duration}s`,
              animationDelay: `${fly.delay}s`,
            }}
          />
        ))}
      </motion.div>
    </>
  );
}
