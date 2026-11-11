"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Sparkle, Star4 } from "@/components/common/Illustrations";
import { ChapterSigil } from "@/components/common/ChapterSigils";
import { CatSticker } from "@/components/cats/CatSticker";
import { Polaroid } from "@/components/scrapbook/Polaroid";
import { EnvelopeNote } from "@/components/scrapbook/EnvelopeNote";
import {
  CornerVine,
  CurlyArrow,
  DelicateButterfly,
  DoodleHeart,
  Eucalyptus,
  PressedFlower,
  Squiggle,
  Tape,
  WaxSeal,
} from "@/components/scrapbook/ScrapbookArt";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { useJourney } from "@/components/journey/JourneyProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DUR, EASE_ENTER, EASE_SCENE, STAGGER } from "@/animations/motion";
import { chapterInstructions } from "@/data/journey";
import { overture } from "@/data/site";

const sequence = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.base, delayChildren: 0.16 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DUR.scene, ease: EASE_ENTER },
  },
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
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: DUR.title, ease: EASE_ENTER },
  },
};

function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Overture({ playing = true }: { playing?: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const audio = useAudioExperience();
  const { goNext } = useJourney();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !playing) return;
    const node = sectionRef.current;
    if (!node) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        node.style.setProperty("--px", x.toFixed(3));
        node.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [playing, reduced]);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="overture-title"
      className="sb-scene story-scene flex-col px-4 pb-28 pt-24 text-center sm:pb-32"
      style={{ ["--px" as string]: "0", ["--py" as string]: "0" }}
    >
      <div aria-hidden className="sb-grain" />
      <div aria-hidden className="sb-fiber" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_12%,rgba(255,255,255,.6),transparent_58%)]"
      />

      {/* the desk around the open journal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          translate: "calc(var(--px, 0) * 9px) calc(var(--py, 0) * 7px)",
        }}
      >
        <span className="sb-drift absolute left-[6%] top-[14%] h-14 w-14 text-rose/45 sm:h-20 sm:w-20">
          <DoodleHeart className="h-full w-full" />
        </span>
        <span className="sb-sway absolute right-[5%] top-[20%] h-20 w-14 text-sage/60 sm:h-28 sm:w-20">
          <Eucalyptus className="h-full w-full" />
        </span>
        <span className="sb-float absolute left-[10%] bottom-[12%] h-10 w-10 sm:h-14 sm:w-14">
          <DelicateButterfly className="h-full w-full" />
        </span>
        <span className="sb-twinkle absolute right-[12%] top-[10%] h-8 w-8 text-butter sm:h-10 sm:w-10">
          <Star4 className="h-full w-full" />
        </span>
        <span className="sb-twinkle absolute right-[22%] bottom-[16%] h-4 w-4 text-lavender-deep sm:h-6 sm:w-6">
          <Sparkle className="h-full w-full" />
        </span>
        <CornerVine className="absolute -left-6 top-2 h-28 w-28 opacity-40 sm:h-40 sm:w-40" />
        <CornerVine className="absolute -right-6 bottom-2 h-28 w-28 rotate-180 opacity-40 sm:h-40 sm:w-40" />
      </div>

      {/* the open spread */}
      <motion.div
        className="relative z-[2] mx-auto w-full max-w-5xl"
        initial="hidden"
        animate={playing ? "show" : "hidden"}
        variants={sequence}
      >
        <motion.div
          variants={cardIn}
          className="sb-card relative rounded-[1.6rem] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
        >
          <span
            aria-hidden
            className="sb-stitch pointer-events-none absolute inset-3 rounded-[1.3rem]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-plum/15 to-transparent lg:block"
          />

          <div className="relative z-[2] grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* left page — the written invitation */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-plum/20 bg-cream/60 p-1.5 text-plum/70">
                  <ChapterSigil name="invitation" />
                </span>
                <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.28em] text-rose-ink/75">
                  chapter 01 · the invitation
                </span>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="hand mt-5 text-[1.5rem] leading-none text-rose-deep sm:text-[1.8rem]"
              >
                {overture.script}
              </motion.p>

              <h1
                id="overture-title"
                aria-label="Make yourself at home."
                className="display-title mt-3 text-[clamp(2.9rem,9.5vw,4.6rem)] font-semibold leading-[0.86] tracking-[-0.02em] text-plum"
              >
                <span className="sr-only">Make yourself at home.</span>
                <span aria-hidden className="block overflow-hidden pb-[0.06em]">
                  <motion.span variants={titleLine} className="block">
                    Make yourself
                  </motion.span>
                </span>
                <span aria-hidden className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    variants={titleLine}
                    className="block italic text-rose-deep/90"
                  >
                    at home.
                  </motion.span>
                </span>
              </h1>

              <motion.div variants={fadeUp} className="mt-1 text-rose-deep/60">
                <Squiggle className="h-4 w-36" />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink/65 sm:text-base"
              >
                A little collection of moments, for someone who makes them
                special.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-5 flex w-fit max-w-md items-start gap-2 rounded-2xl border border-dashed border-plum/20 bg-cream/50 px-4 py-2.5 text-left"
              >
                <Sparkle className="mt-0.5 h-3 w-3 shrink-0 text-rose-deep/70" />
                <span className="text-[0.72rem] font-semibold leading-snug text-plum/65">
                  {chapterInstructions.invitation}
                </span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-col items-center gap-3 lg:items-start"
              >
                <span className="hand text-[1.15rem] text-rose-ink/70">
                  the story begins here
                </span>
                <button
                  type="button"
                  onClick={() => {
                    audio.playSfx("page");
                    goNext();
                  }}
                  className="sb-cta focus-visible:outline-none"
                >
                  <span>Turn the page</span>
                  <span aria-hidden className="sb-cta__badge">
                    <ArrowDoodle className="h-3.5 w-3.5" />
                  </span>
                </button>
                <span className="hand mt-1 text-[0.95rem] text-plum/60">
                  made with a little extra love, just for you ♡
                </span>
              </motion.div>
            </div>

            {/* right page — the collage */}
            <div className="relative mx-auto flex w-full max-w-[24rem] flex-col items-center lg:max-w-none">
              <motion.div variants={fadeUp} className="relative w-[68%]">
                <Tape
                  tone="rose"
                  className="left-1/2 top-0 h-6 w-24 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg]"
                />
                <Polaroid
                  src="/divya/2.jpeg"
                  alt="Divya"
                  rotate={-4}
                  objectPosition="center 24%"
                  caption="the star of this book"
                />
              </motion.div>

              <div className="-mt-12 flex w-full items-end justify-between gap-3 px-1">
                <motion.div variants={fadeUp} className="relative w-[44%]">
                  <Tape
                    tone="lav"
                    className="left-1/2 top-0 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[4deg]"
                  />
                  <Polaroid
                    src="/divya/3.jpeg"
                    alt="Divya smiling"
                    rotate={6}
                    objectPosition="center 22%"
                    caption="a little joy"
                  />
                </motion.div>

                <motion.div variants={fadeUp} className="w-[50%] pb-4">
                  <EnvelopeNote
                    message="you make ordinary days feel like little celebrations."
                    hint="tap to open"
                    rotate={4}
                  />
                </motion.div>
              </div>

              <motion.span
                variants={fadeUp}
                className="absolute -right-1 -top-3 h-16 w-12 sm:h-20 sm:w-14"
              >
                <span className="sb-sway block h-full w-full">
                  <PressedFlower className="h-full w-full" />
                </span>
              </motion.span>
              <motion.span
                variants={fadeUp}
                className="absolute -left-2 top-6 h-10 w-10 sm:h-12 sm:w-12"
              >
                <span className="sb-float block h-full w-full">
                  <DelicateButterfly className="h-full w-full" />
                </span>
              </motion.span>
              <motion.span
                variants={fadeUp}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
              >
                <WaxSeal className="h-12 w-12 opacity-90" />
              </motion.span>
              <motion.div
                variants={fadeUp}
                className="absolute -right-3 bottom-16 text-rose-deep/60"
              >
                <CurlyArrow className="h-10 w-12 -scale-x-100" />
              </motion.div>
            </div>
          </div>
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
        className="absolute bottom-[4.5rem] left-[4%] z-[4] w-20 sm:bottom-[5rem] sm:left-[8%] sm:w-28"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-24 bg-gradient-to-b from-transparent to-cream"
      />
    </section>
  );
}
