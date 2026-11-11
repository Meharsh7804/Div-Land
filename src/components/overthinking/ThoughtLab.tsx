"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StorybookHeading } from "@/components/common/StorybookHeading";
import { CatSticker } from "@/components/cats/CatSticker";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { useChapterGate } from "@/components/journey/JourneyProvider";
import {
  BrainBloom,
  Butterfly,
  Cloud,
  Heart,
  Sparkle,
  SpiralDoodle,
  Star4,
} from "@/components/common/Illustrations";
import { SparkleField } from "@/components/common/Ambient";
import { labCopy, thoughts, type Thought } from "@/data/thoughts";
import { chapterInstructions } from "@/data/journey";
import { EASE_SCENE, EASE_SOFT } from "@/animations/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, makeBag } from "@/lib/utils";

type Phase = "idle" | "processing" | "ready";

const toneStyles: Record<NonNullable<Thought["tone"]> | "default", string> = {
  butter: "bg-[#FFF8DA]",
  blush: "bg-[#FFF0F5]",
  lavender: "bg-[#F2EEFF]",
  peach: "bg-[#FFF1E7]",
  sage: "bg-[#EFF5E8]",
  default: "bg-cream",
};

const motes = [
  { left: "16%", top: "64%", size: 5, delay: 0 },
  { left: "28%", top: "46%", size: 3, delay: 0.5 },
  { left: "44%", top: "74%", size: 4, delay: 1.1 },
  { left: "58%", top: "52%", size: 6, delay: 0.2 },
  { left: "72%", top: "68%", size: 3, delay: 0.8 },
  { left: "82%", top: "42%", size: 4, delay: 1.4 },
  { left: "36%", top: "32%", size: 3, delay: 1.7 },
  { left: "64%", top: "28%", size: 2.5, delay: 0.9 },
];

const paperNotes = [
  {
    className: "left-[2%] top-[26%] w-[4.4rem] -rotate-6 sm:left-[5%] sm:top-[24%] sm:w-[5.5rem]",
    delay: "-1.4s",
    doodle: "star" as const,
  },
  {
    className: "right-[2%] top-[18%] w-[4rem] rotate-[5deg] sm:right-[6%] sm:top-[17%] sm:w-[5rem]",
    delay: "-3.1s",
    doodle: "heart" as const,
  },
  {
    className: "bottom-[16%] left-[4%] hidden w-[4.8rem] rotate-[4deg] md:block",
    delay: "-2.2s",
    doodle: "spiral" as const,
  },
  {
    className: "bottom-[13%] right-[4%] hidden w-[4.4rem] -rotate-[5deg] md:block",
    delay: "-0.6s",
    doodle: "star" as const,
  },
];

const floatBubbles = [
  {
    className: "left-[1%] top-[38%] w-[5.5rem] lg:left-[4%]",
    delay: "-1.2s",
    icon: "dots" as const,
  },
  {
    className: "right-[1%] top-[34%] w-[6rem] lg:right-[4%]",
    delay: "-2.7s",
    icon: "spiral" as const,
  },
  {
    className: "left-[7%] bottom-[22%] hidden w-[5rem] lg:block",
    delay: "-3.4s",
    icon: "star" as const,
  },
];

function PaperNote({
  className,
  delay,
  doodle,
}: {
  className: string;
  delay: string;
  doodle: "star" | "heart" | "spiral";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-[0.45rem] border border-plum/10 bg-[#FFFBF1] p-2 shadow-[0_16px_30px_-24px_rgba(47,31,46,.6)] garden-float",
        className,
      )}
      style={{ animationDelay: delay }}
    >
      <span className="absolute left-1/2 top-0 h-2.5 w-10 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] bg-butter/70" />
      <span className="flex h-7 items-center justify-center text-rose-deep/55">
        {doodle === "star" ? (
          <Star4 className="h-4 w-4" />
        ) : doodle === "heart" ? (
          <Heart className="h-4 w-4" />
        ) : (
          <SpiralDoodle className="h-5 w-5" />
        )}
      </span>
      <span className="mt-1 block h-0.5 rounded-full bg-plum/10" />
      <span className="mt-1 block h-0.5 w-2/3 rounded-full bg-plum/10" />
    </div>
  );
}

function FloatBubble({
  className,
  delay,
  icon,
}: {
  className: string;
  delay: string;
  icon: "dots" | "spiral" | "star";
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute garden-float", className)}
      style={{ animationDelay: delay }}
    >
      <div className="relative rounded-[46%_54%_48%_52%/58%_44%_56%_42%] border border-white/70 bg-cream/60 p-3.5 shadow-[0_20px_40px_-28px_rgba(73,51,72,.55)] backdrop-blur-[1px]">
        {icon === "dots" ? (
          <span className="flex justify-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-rose/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-rose/30" />
          </span>
        ) : icon === "spiral" ? (
          <SpiralDoodle className="mx-auto h-5 w-5 text-rose-deep/45" />
        ) : (
          <Star4 className="mx-auto h-4 w-4 text-butter" />
        )}
        <span className="absolute -bottom-1 left-3 h-3 w-3 rounded-full border border-white/70 bg-cream/70" />
        <span className="absolute -bottom-3 left-1 h-2 w-2 rounded-full border border-white/60 bg-cream/60" />
      </div>
    </div>
  );
}

function ThoughtWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.34, delay: 0.24 + index * 0.032, ease: EASE_SOFT }}
          className="mr-[0.24em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function ThoughtBubble({ thought }: { thought: Thought }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.55, y: 14, rotate: -3, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.12, y: -8, filter: "blur(6px)" }}
      transition={{ type: "spring", stiffness: 210, damping: 19 }}
      className={cn(
        "relative z-10 w-[88%] rounded-[46%_54%_48%_52%/54%_46%_54%_46%] border border-white/80 px-4 py-4 text-center shadow-[0_20px_40px_-24px_rgba(73,51,72,.55),inset_0_1px_0_rgba(255,255,255,.8)] sm:px-6 sm:py-5",
        toneStyles[thought.tone ?? "default"],
      )}
    >
      <p className="font-display text-[clamp(0.82rem,3.1vw,1.08rem)] italic leading-[1.28] text-plum">
        <ThoughtWords text={thought.text} />
      </p>
      <span className="mt-2 block text-[0.42rem] font-extrabold uppercase tracking-[0.22em] text-plum/35">
        converted &amp; approved
      </span>
      <span className="absolute -bottom-2 left-[22%] h-4 w-4 rounded-full border border-white/80 bg-[inherit]" />
      <span className="absolute -bottom-5 left-[16%] h-2.5 w-2.5 rounded-full border border-white/70 bg-[inherit]" />
    </motion.div>
  );
}

function EmptyChamber() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: EASE_SCENE }}
      className="relative z-10 flex flex-col items-center text-center"
    >
      <div className="relative">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-12 w-20 items-center justify-center rounded-full border border-white/75 bg-cream/75 shadow-[inset_0_-6px_14px_rgba(73,51,72,.06)]"
        >
          <span className="absolute left-5 top-5 h-1.5 w-1.5 rounded-full bg-plum/55" />
          <span className="absolute right-5 top-5 h-1.5 w-1.5 rounded-full bg-plum/55" />
          <span className="absolute bottom-4 h-1.5 w-3 rounded-b-full border-b-2 border-plum/45" />
          <span className="absolute -right-4 -top-2 hand text-base text-plum/40">z</span>
          <span className="absolute -right-6 -top-5 hand text-sm text-plum/25">z</span>
        </motion.div>
        <span className="absolute -bottom-1 left-5 h-3 w-3 rounded-full border border-white/70 bg-cream/75" />
      </div>
      <p className="mt-3 text-[0.46rem] font-extrabold uppercase tracking-[0.24em] text-plum/38">
        {labCopy.emptyLabel}
      </p>
      <p className="hand mt-0.5 text-[0.9rem] leading-tight text-plum/55">{labCopy.emptyHint}</p>
    </motion.div>
  );
}

function GearArt() {
  return (
    <g fill="#B0708C">
      <circle cx="28" cy="28" r="13" opacity=".22" />
      <circle cx="28" cy="28" r="8" fill="#C98EA8" />
      <circle cx="28" cy="28" r="3" fill="#FFF9F0" />
      {Array.from({ length: 8 }).map((_, index) => (
        <rect
          key={index}
          x="26.5"
          y="10"
          width="3"
          height="7"
          rx="1.4"
          transform={`rotate(${index * 45} 28 28)`}
        />
      ))}
    </g>
  );
}

function ThoughtMachine({
  thought,
  phase,
  served,
  onActivate,
}: {
  thought: Thought | null;
  phase: Phase;
  served: number;
  onActivate: () => void;
}) {
  const busy = phase === "processing";

  return (
    <div className="relative mx-auto w-[17rem] sm:w-[22rem]">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-[7%] h-64 w-64 -translate-x-1/2 rounded-full bg-butter/45 blur-3xl transition-opacity duration-500 sm:h-80 sm:w-80",
          busy ? "opacity-100" : "opacity-60 garden-glow",
        )}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute -left-3 top-[41%] hidden h-28 w-7 rounded-l-full border-4 border-r-0 border-[#D3B592]/70 sm:block"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 top-[38%] hidden h-32 w-7 rounded-r-full border-4 border-l-0 border-[#D3B592]/70 sm:block"
      />

      <motion.div
        animate={busy ? { rotate: [0, -1.1, 1.1, -0.7, 0], scale: [1, 1.014, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: busy ? 0.62 : 0.6, repeat: busy ? Infinity : 0, ease: "easeInOut" }}
        className="relative mx-auto aspect-square w-[13.2rem] sm:w-[18rem]"
      >
        <div
          aria-hidden
          className="absolute -inset-2 rounded-full border-[3px] border-[#D9C1A3]/75"
        />
        <div
          aria-hidden
          className="absolute -inset-4 rounded-full border border-[#EAD7BE]/55"
        />
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-full border-[6px] border-[#E8D4B9] bg-[radial-gradient(circle_at_34%_26%,rgba(255,255,255,.97),rgba(255,249,240,.72)_30%,rgba(246,220,231,.46)_56%,rgba(205,194,236,.44)_80%,rgba(158,143,191,.36))] shadow-[inset_0_0_42px_rgba(255,255,255,.65),0_34px_64px_-34px_rgba(73,51,72,.72)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[2%] rounded-full border border-white/45"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[13%] top-[9%] h-[30%] w-[21%] -rotate-[24deg] rounded-full bg-white/55 blur-md"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[12%] right-[15%] h-[22%] w-[17%] rotate-[22deg] rounded-full bg-white/25 blur-md"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[6%] rounded-full shadow-[inset_0_-22px_44px_rgba(73,51,72,.12)]"
        />

        <div className="absolute inset-[8%] overflow-hidden rounded-full">
          {motes.map((mote, index) => (
            <motion.span
              key={index}
              aria-hidden
              className="absolute rounded-full bg-butter shadow-[0_0_10px_4px_rgba(255,240,184,.45)]"
              style={{
                left: mote.left,
                top: mote.top,
                width: mote.size,
                height: mote.size,
              }}
              animate={
                busy
                  ? {
                      y: [4, -22, -52],
                      opacity: [0, 0.95, 0],
                      scale: [0.6, 1.25, 0.4],
                    }
                  : {
                      y: [0, -8, 0],
                      opacity: [0.25, 0.7, 0.25],
                      scale: [0.8, 1, 0.8],
                    }
              }
              transition={{
                duration: busy ? 1.5 : 5.5,
                repeat: Infinity,
                delay: busy ? mote.delay * 0.55 : mote.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-7">
            <AnimatePresence mode="wait" initial={false}>
              {thought ? (
                <ThoughtBubble key={`${thought.id}-${served}`} thought={thought} />
              ) : (
                <EmptyChamber key="empty" />
              )}
            </AnimatePresence>
          </div>
        </div>

        {[0, 1, 2, 3].map((index) => {
          const positions = [
            "left-[7%] top-[28%]",
            "right-[7%] top-[28%]",
            "left-[7%] top-[68%]",
            "right-[7%] top-[68%]",
          ];
          return (
            <span
              key={index}
              aria-hidden
              className={cn(
                "absolute h-2 w-2 rounded-full border border-[#C9A27E]/50 bg-[#F4E4CE] shadow-sm",
                positions[index],
              )}
            />
          );
        })}
      </motion.div>

      <div className="relative z-10 mx-auto -mt-2 w-[16rem] sm:w-[20.5rem]">
        <div
          aria-hidden
          className="mx-auto h-7 w-24 rounded-b-[1.1rem] border-x-2 border-b-2 border-[#C9A27E] bg-[linear-gradient(180deg,#EBD7BF,#D9BA98)] sm:h-9 sm:w-32"
        />
        <div className="relative rounded-[2rem] border-[3px] border-[#B88F6E] bg-[linear-gradient(155deg,#F5DBC6,#EFC6D5_58%,#E4BDD2)] p-3 shadow-[0_34px_70px_-36px_rgba(73,51,72,.78),inset_0_1px_0_rgba(255,255,255,.72)]">
          <span
            aria-hidden
            className="absolute -left-1 top-12 h-16 w-3 rounded-l-full bg-[#E9D0B5] shadow-inner"
          />
          <span
            aria-hidden
            className="absolute -right-1 top-8 h-20 w-3 rounded-r-full bg-[#E9D0B5] shadow-inner"
          />

          <div className="relative overflow-hidden rounded-[1.45rem] border border-plum/20 bg-[linear-gradient(160deg,#FFF9F0,#FBEADF)] p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-display text-[1.05rem] italic leading-none text-plum sm:text-[1.2rem]">
                  {labCopy.machine.name}
                </p>
                <p className="mt-1 text-[0.42rem] font-extrabold uppercase tracking-[0.22em] text-plum/45 sm:text-[0.46rem]">
                  {labCopy.machine.sub}
                </p>
              </div>
              <span className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border border-white/70 shadow-sm transition-colors",
                    busy ? "bg-rose-deep garden-twinkle" : "bg-sage",
                  )}
                />
                <span className="text-[0.36rem] font-extrabold uppercase tracking-[0.16em] text-plum/35">
                  {busy ? labCopy.machine.busy : labCopy.machine.ready}
                </span>
              </span>
            </div>

            <div className="mt-2 flex items-stretch gap-2">
              <div className="relative h-14 w-14 shrink-0 rounded-full border-2 border-plum/25 bg-cream shadow-inner">
                <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full">
                  <circle cx="28" cy="28" r="21" fill="none" stroke="#493348" strokeWidth="1.5" opacity=".18" />
                  <circle cx="28" cy="28" r="17" fill="none" stroke="#B0708C" strokeWidth="1" strokeDasharray="2 5" opacity=".5" />
                  <motion.line
                    x1="28"
                    y1="28"
                    x2="28"
                    y2="12"
                    stroke="#B0708C"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    animate={busy ? { rotate: [-16, 26, -7, 34, -16] } : { rotate: -18 }}
                    transition={{ duration: busy ? 1.4 : 0.6, repeat: busy ? Infinity : 0, ease: "easeInOut" }}
                    style={{ transformBox: "view-box", transformOrigin: "28px 28px" }}
                  />
                  <circle cx="28" cy="28" r="3" fill="#493348" />
                </svg>
                <span className="absolute inset-x-0 bottom-1 text-center text-[0.34rem] font-extrabold uppercase tracking-[0.14em] text-plum/35">
                  mood
                </span>
              </div>

              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-plum/20 bg-[#FDF4E8] shadow-inner">
                <svg viewBox="0 0 56 56" className="h-11 w-11">
                  <motion.g
                    animate={busy ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: busy ? 1.5 : 0.6, repeat: busy ? Infinity : 0, ease: "linear" }}
                    style={{ transformBox: "view-box", transformOrigin: "28px 28px" }}
                  >
                    <GearArt />
                  </motion.g>
                </svg>
                <span className="absolute inset-x-0 bottom-0.5 text-center text-[0.34rem] font-extrabold uppercase tracking-[0.14em] text-plum/35">
                  grind
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 rounded-[0.8rem] border border-plum/10 bg-plum/[0.035] px-2.5 py-1.5">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((index) => (
                    <motion.span
                      key={index}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        index === 0 ? "bg-rose" : index === 1 ? "bg-butter" : "bg-lavender-deep",
                      )}
                      animate={busy ? { opacity: [1, 0.25, 1] } : { opacity: 0.55 }}
                      transition={{
                        duration: 0.9,
                        repeat: busy ? Infinity : 0,
                        delay: index * 0.18,
                      }}
                    />
                  ))}
                  <span className="ml-auto text-[0.38rem] font-extrabold uppercase tracking-[0.16em] text-plum/35">
                    {phase === "ready" ? "thought ready" : phase === "processing" ? "working" : "standby"}
                  </span>
                </div>
                <span className="h-1.5 rounded-full bg-plum/10" />
                <span className="h-1.5 w-3/4 rounded-full bg-plum/10" />
                <div className="flex items-center justify-between text-[0.38rem] font-extrabold uppercase tracking-[0.14em] text-plum/30">
                  <span>{labCopy.machine.chamber}</span>
                  <span>{served} converted</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2 rounded-full border border-plum/10 bg-plum/[0.04] px-3 py-1">
              <span className="flex items-center gap-1.5 text-[0.4rem] font-extrabold uppercase tracking-[0.18em] text-plum/40">
                <Sparkle className="h-2.5 w-2.5 text-rose-deep/60" />
                positive thoughts only
              </span>
              <span className="flex gap-1">
                <span className="h-1 w-1 rounded-full bg-plum/20" />
                <span className="h-1 w-1 rounded-full bg-plum/20" />
                <span className="h-1 w-1 rounded-full bg-plum/20" />
              </span>
            </div>

            <AnimatePresence>
              {busy ? (
                <motion.span
                  key="negative-note"
                  aria-hidden
                  initial={{ opacity: 0, y: -30, rotate: -22, scale: 0.8 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [-30, -6, 18, 30], rotate: [-22, -8, 12, 26] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  className="pointer-events-none absolute left-[18%] top-0 h-5 w-5 rounded-[40%_60%_45%_55%] border border-plum/15 bg-[#FFF7E7] shadow-sm"
                />
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div aria-hidden className="mx-auto flex w-[86%] justify-between px-5">
          <span className="h-3 w-10 rounded-b-xl bg-[#AB8766]" />
          <span className="h-3 w-10 rounded-b-xl bg-[#AB8766]" />
        </div>
      </div>

      <button
        type="button"
        onClick={onActivate}
        disabled={busy}
        aria-label="Convert a thought in the positive overthinking machine"
        className="btn-magic mt-5 w-full min-h-[3.15rem] text-[0.9rem]"
      >
        <Sparkle className="h-4 w-4 text-butter" />
        {phase === "processing"
          ? labCopy.processing
          : thought
            ? labCopy.again
            : labCopy.button}
      </button>

      <p className="mt-2 text-center text-[0.52rem] font-extrabold uppercase tracking-[0.2em] text-plum/32">
        {served > 0 ? `${served} converted · only good ones leave` : labCopy.footnote}
      </p>

      <div className="relative mx-auto mt-4 w-full max-w-[22rem] rotate-[-1deg]">
        <span className="tape left-1/2 top-0 h-3 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg]" />
        <div className="flex items-start gap-2.5 rounded-[0.8rem] border border-dashed border-rose-deep/35 bg-[#FFF5DD] px-4 py-2.5 text-left shadow-[0_16px_28px_-24px_rgba(47,31,46,.55)]">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-deep/70 garden-twinkle" />
          <div>
            <p className="text-[0.42rem] font-extrabold uppercase tracking-[0.2em] text-plum/38">
              {labCopy.machine.warningLabel}
            </p>
            <p className="text-[0.58rem] font-extrabold uppercase leading-snug tracking-[0.11em] text-plum/68">
              {labCopy.warning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThoughtLab() {
  const audio = useAudioExperience();
  const reduced = useReducedMotion();
  const [thought, setThought] = useState<Thought | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [served, setServed] = useState(0);
  const bag = useRef<Thought[]>([]);
  const lastId = useRef<string | null>(null);
  const timer = useRef<number | null>(null);
  const { markComplete } = useChapterGate("overthinking");

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  useEffect(() => {
    if (served > 0) markComplete("overthinking");
  }, [markComplete, served]);

  const nextThought = useCallback(() => {
    if (phase === "processing") return;
    audio.playSfx("page");
    setPhase("processing");

    if (bag.current.length === 0) {
      bag.current = makeBag(thoughts.filter((item) => item.id !== lastId.current));
    }

    let picked = bag.current.pop() ?? thoughts[0];
    if (picked.id === lastId.current) {
      const fallback = thoughts.find((item) => item.id !== lastId.current);
      if (fallback) picked = fallback;
    }

    lastId.current = picked.id;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(
      () => {
        setThought(picked);
        setServed((value) => value + 1);
        setPhase("ready");
        audio.playSfx("gift");
      },
      reduced ? 650 : 1600,
    );
  }, [audio, phase, reduced]);

  return (
    <section
      id="chapter-overthinking"
      aria-labelledby="overthinking-title"
      className="story-scene bg-[radial-gradient(ellipse_at_50%_16%,#FFF9F0_0%,#F1EAF9_52%,#E7DDF4_100%)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[4%] top-[12%] h-20 w-36 text-white/60 garden-cloud sm:h-24 sm:w-44">
          <Cloud className="h-full w-full" />
        </div>
        <div
          className="absolute right-[3%] top-[20%] h-16 w-32 text-blush/65 garden-cloud sm:h-20 sm:w-40"
          style={{ animationDuration: "31s", animationDelay: "-9s" }}
        >
          <Cloud className="h-full w-full" />
        </div>
        <div
          className="absolute left-[24%] top-[6%] h-10 w-24 text-white/40 garden-cloud"
          style={{ animationDuration: "38s", animationDelay: "-17s" }}
        >
          <Cloud className="h-full w-full" />
        </div>
        <SparkleField count={14} seed={31} tone="text-rose/35" />
        <Star4 className="absolute left-[14%] bottom-[22%] h-3 w-3 text-butter garden-twinkle" />
        <Star4
          className="absolute right-[18%] bottom-[30%] h-2.5 w-2.5 text-rose/50 garden-twinkle"
          style={{ animationDelay: "1.2s" }}
        />
        <Butterfly className="absolute left-[8%] top-[46%] h-8 w-8 opacity-60 garden-sway" />
      </div>

      <div className="section-shell relative">
        <StorybookHeading
          id="overthinking-title"
          number="03"
          label={labCopy.eyebrow.replace("Chapter 03 · ", "")}
          title={labCopy.title}
          note={labCopy.script}
          instruction={chapterInstructions.overthinking}
        />

        {paperNotes.map((note, index) => (
          <PaperNote key={index} {...note} />
        ))}
        {floatBubbles.map((bubble, index) => (
          <FloatBubble key={index} {...bubble} />
        ))}

        <div className="relative mx-auto mt-7 flex w-full max-w-3xl flex-col items-center sm:mt-10">
          <div className="relative flex w-full justify-center">
            <span className="pointer-events-none absolute -left-2 top-8 hidden h-24 w-24 text-lavender-deep/30 md:block">
              <BrainBloom className="h-full w-full garden-breathe" />
            </span>
            <span className="pointer-events-none absolute -right-2 top-16 hidden h-20 w-20 text-rose/25 md:block">
              <BrainBloom className="h-full w-full garden-breathe" style={{ animationDelay: "-2s" }} />
            </span>
            <ThoughtMachine
              thought={thought}
              phase={phase}
              served={served}
              onActivate={nextThought}
            />
          </div>
        </div>

        <CatSticker
          art="heart"
          label="Say hello to the thought cat"
          bubble="only nice thoughts"
          bubbleSide="left"
          interactive
          motion="bob"
          delay={-0.8}
          className="absolute bottom-[6%] right-[14%] z-10 hidden w-20 md:block lg:w-24"
        />

        <p aria-live="polite" aria-atomic="true" className="sr-only">
          {thought ? thought.text : "The thought chamber is empty."}
        </p>
      </div>
    </section>
  );
}
