"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import {
  Butterfly,
  Cloud,
  Flower,
  LeafSprig,
  Sparkle,
  Star4,
} from "@/components/common/Illustrations";
import { ChapterSigil } from "@/components/common/ChapterSigils";
import { ScallopDivider } from "@/components/common/Dividers";
import { SparkleField } from "@/components/common/Ambient";
import { CatSticker } from "@/components/cats/CatSticker";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { useJourney } from "@/components/journey/JourneyProvider";
import { DUR, EASE_ENTER, EASE_SCENE, STAGGER } from "@/animations/motion";
import { chapterInstructions } from "@/data/journey";
import { overture } from "@/data/site";

const sequence = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.base, delayChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DUR.base, ease: EASE_SCENE },
  },
};

const titleLine = {
  hidden: { y: "112%", rotate: 1.6 },
  show: { y: "0%", rotate: 0, transition: { duration: DUR.title, ease: EASE_ENTER } },
};

function GardenArch() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 560 680"
      fill="none"
      className="absolute left-1/2 top-[2%] h-[88%] w-[min(46rem,96vw)] -translate-x-1/2 text-plum/20"
    >
      <path d="M70 660V318a210 210 0 0 1 420 0v342" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M104 660V322a176 176 0 0 1 352 0v338"
        stroke="currentColor"
        strokeWidth=".9"
        strokeDasharray="2 7"
        opacity=".7"
      />
      <path d="M28 660h504" stroke="currentColor" strokeWidth="1" opacity=".5" />
      <path d="M70 318c54-18 118-18 172 0M318 318c54-18 118-18 172 0" stroke="currentColor" strokeWidth=".9" opacity=".35" />
      {[0, 1, 2, 3, 4].map((index) => {
        const x = 122 + index * 79;
        return (
          <g key={index} opacity={0.65 - index * 0.05}>
            <circle cx={x} cy={132 - Math.sin((index / 4) * Math.PI) * 34} r="3.4" fill="#FFF9F0" stroke="currentColor" strokeWidth=".8" />
            <circle cx={x + 28} cy={158 - Math.sin((index / 4) * Math.PI) * 26} r="1.6" fill="currentColor" opacity=".6" />
          </g>
        );
      })}
      <circle cx="280" cy="104" r="26" stroke="currentColor" strokeWidth=".8" opacity=".35" />
      <circle cx="280" cy="104" r="12" fill="#FFF0B8" opacity=".4" />
    </svg>
  );
}

export function Overture({ playing = true }: { playing?: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const audio = useAudioExperience();
  const { goNext } = useJourney();

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="overture-title"
      className="story-scene flex-col bg-gradient-to-b from-lavender via-blush to-cream px-4 pb-28 pt-24 text-center sm:pb-32"
    >
      <motion.div
        aria-hidden
        initial={{ scale: 1.06 }}
        animate={{ scale: playing ? 1 : 1.06 }}
        transition={{ duration: 2.2, ease: EASE_SCENE }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0 transition-[translate] duration-700 ease-out"
          style={{ translate: "calc(var(--px, 0) * 8px) calc(var(--py, 0) * 6px)" }}
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_12%,rgba(255,249,240,.68),transparent_62%)]" />
            <div className="absolute left-[8%] top-[12%] h-24 w-24 rounded-full bg-butter/60 blur-3xl sm:h-36 sm:w-36" />
            <div className="absolute right-[6%] top-[30%] h-40 w-40 rounded-full bg-peach/40 blur-3xl" />
            <GardenArch />
            <SparkleField count={26} seed={13} tone="text-cream" className="opacity-90" />
            <Cloud className="absolute left-[-4%] top-[14%] h-14 w-28 text-cream/70 anim-drift" />
            <Cloud
              className="absolute right-[-2%] top-[8%] h-12 w-24 text-white/60 anim-drift"
              style={{ animationDuration: "26s", animationDelay: "-8s" }}
            />
          </div>

          <div className="absolute inset-0">
            <Butterfly className="absolute left-[10%] top-[42%] h-10 w-10 anim-float sm:h-14 sm:w-14" />
            <Butterfly
              className="absolute right-[12%] top-[52%] h-8 w-8 anim-float"
              style={{ animationDuration: "8s", animationDelay: "-2s" }}
            />
            <Flower className="absolute bottom-[18%] left-[6%] h-8 w-8 opacity-70 anim-sway" />
            <Flower
              className="absolute bottom-[24%] right-[8%] h-6 w-6 opacity-60 anim-sway"
              style={{ animationDelay: "-2s", ["--flower-petal" as string]: "#DCD5F5" }}
            />
            <LeafSprig className="absolute bottom-[10%] left-[16%] h-16 w-16 rotate-12 text-sage/70" />
            <Star4 className="absolute right-[22%] top-[66%] h-3 w-3 text-butter anim-twinkle" />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="overture-copy relative z-[2] mx-auto flex w-full max-w-2xl flex-col items-center"
        initial="hidden"
        animate={playing ? "show" : "hidden"}
        variants={sequence}
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-plum/25 sm:w-8" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-plum/20 bg-cream/50 p-1.5 text-plum/70">
            <ChapterSigil name="invitation" />
          </span>
          <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.26em] text-plum/70 sm:text-[0.64rem]">
            a small gift for sonu
          </span>
          <span className="h-1 w-1 rounded-full bg-rose/60" />
          <span className="hidden text-[0.64rem] font-extrabold uppercase tracking-[0.26em] text-plum/70 sm:inline">
            scene 01 · the invitation
          </span>
          <Star4 className="h-2.5 w-2.5 text-rose-deep" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="hand mt-6 text-[1.5rem] leading-none text-rose-deep sm:text-[1.85rem]"
        >
          {overture.script}
        </motion.p>

        <h1
          id="overture-title"
          aria-label="Make yourself at home."
          className="display-title mt-3 text-[clamp(3.1rem,10.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.025em] text-plum"
        >
          <span className="sr-only">Make yourself at home.</span>
          <span aria-hidden className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={titleLine} className="block">
              Make yourself
            </motion.span>
          </span>
          <span aria-hidden className="block overflow-hidden pb-[0.14em]">
            <motion.span variants={titleLine} className="block italic text-rose-deep/90">
              at home.
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink/65 sm:text-base"
        >
          {overture.line}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-4 flex w-fit max-w-md items-start gap-2 rounded-full border border-dashed border-plum/20 bg-cream/45 px-3.5 py-1.5 text-left"
        >
          <Sparkle className="mt-0.5 h-3 w-3 shrink-0 text-rose-deep/70" />
          <span className="text-[0.72rem] font-semibold leading-snug text-plum/65">
            {chapterInstructions.invitation}
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => {
              audio.playSfx("page");
              goNext();
            }}
            className="group flex min-h-11 flex-col items-center gap-1 text-plum/70 transition-colors hover:text-plum"
          >
            <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.26em]">
              {overture.hint}
            </span>
            <span className="flex h-10 w-9 items-center justify-center rounded-full border border-plum/20 bg-cream/60 transition-transform group-hover:translate-y-0.5">
              <Sparkle className="h-4 w-4 text-plum/70" />
            </span>
          </button>
          <Sparkle className="h-3 w-3 text-rose/70 anim-breathe" />
        </motion.div>
      </motion.div>

      <CatSticker
        art="peek"
        label="Say hello to the peeking cat"
        bubble="psst… hi sonu"
        bubbleSide="top"
        interactive
        motion="bob"
        delay={-1.2}
        className="absolute bottom-[4.25rem] left-[4%] z-[4] w-20 sm:bottom-[4.5rem] sm:left-[8%] sm:w-28"
      />

      <div className="absolute inset-x-0 bottom-0 z-[3]">
        <ScallopDivider color="#FFF9F0" height={64} />
      </div>
    </section>
  );
}
