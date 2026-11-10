"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HandHeart, Mic, Mountain, Palette, Sparkles } from "lucide-react";
import { EASE_ENTER, EASE_SCENE } from "@/animations/motion";
import { cn, seeded } from "@/lib/utils";
import { RangoliArt } from "./RangoliArt";
import { DriftField, SceneLayer } from "./scene-kit";
import type { SceneInteractionProps } from "./scene-types";

const fragments = [
  {
    id: "colour",
    Icon: Palette,
    label: "the colour",
    tone: "#F6DCE7",
    left: "15%",
    top: "26%",
    delay: "-1.6s",
  },
  {
    id: "voice",
    Icon: Mic,
    label: "the voice",
    tone: "#FFF0B8",
    left: "82%",
    top: "22%",
    delay: "-3.2s",
  },
  {
    id: "ground",
    Icon: Mountain,
    label: "her ground",
    tone: "#AFC4A4",
    left: "84%",
    top: "60%",
    delay: "-2.4s",
  },
  {
    id: "care",
    Icon: HandHeart,
    label: "the warmth",
    tone: "#FFDCCB",
    left: "16%",
    top: "58%",
    delay: "-4.1s",
  },
] as const;

const dust = Array.from({ length: 28 }, (_, index) => {
  const random = seeded(113 + index);
  return {
    id: index,
    left: 3 + random() * 94,
    top: 5 + random() * 82,
    size: 1.5 + random() * 4.5,
    delay: random() * -10,
    duration: 6 + random() * 9,
    tone: ["#FFF0B8", "#F6DCE7", "#DCD5F5", "#FFDCCB"][index % 4],
  };
});

export function FinaleScene({ completed, onComplete }: SceneInteractionProps) {
  const uid = useId().replace(/:/g, "");
  const doneRef = useRef(completed);
  const [placed, setPlaced] = useState<Set<string>>(() =>
    completed ? new Set(fragments.map((fragment) => fragment.id)) : new Set(),
  );

  useEffect(() => {
    if (placed.size === fragments.length && !doneRef.current) {
      doneRef.current = true;
      onComplete();
    }
  }, [placed, onComplete]);

  const place = (id: string) => {
    setPlaced((previous) => {
      if (previous.has(id)) return previous;
      const next = new Set(previous);
      next.add(id);
      return next;
    });
  };

  const ratio = placed.size / fragments.length;
  const complete = placed.size === fragments.length;

  return (
    <SceneLayer className="bg-[linear-gradient(118deg,#3B2436_0%,#6B435E_30%,#A96683_54%,#E3A28E_78%,#FFE7C6_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_44%,rgba(255,240,184,.24),transparent_56%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,16,23,.56),transparent_38%,rgba(23,16,23,.46))]" />

      <motion.div
        className="absolute inset-0"
        animate={{ scale: 1 + ratio * 0.012 }}
        transition={{ duration: 1.2, ease: EASE_SCENE }}
      >
        <div className="absolute left-1/2 top-[-8%] h-[112%] w-[72%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,249,240,.28),rgba(255,240,184,.1)_46%,transparent_84%)] [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)] blur-md" />
        <div className="absolute right-0 top-[4%] h-[58%] w-[30%] rounded-t-full border border-butter/20 bg-[linear-gradient(180deg,rgba(255,236,188,.36),transparent_78%)] blur-[1px]" />
        <div className="absolute left-[-6%] top-[10%] h-[62%] w-[40%] rounded-full bg-[radial-gradient(ellipse,rgba(201,142,168,.5),transparent_66%)] blur-2xl" />
        <div className="absolute right-[-6%] top-[34%] h-[52%] w-[38%] rounded-full bg-[radial-gradient(ellipse,rgba(255,220,150,.55),transparent_66%)] blur-2xl" />

        <motion.div
          className="absolute left-1/2 top-[48%] h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2"
          animate={{
            opacity: 0.1 + ratio * 0.82,
            scale: 0.78 + ratio * 0.22,
            rotate: ratio * 18,
          }}
          transition={{ duration: 1.4, ease: EASE_SCENE }}
          style={{ mixBlendMode: "screen" }}
        >
          <RangoliArt revealed />
        </motion.div>

        <div className="absolute left-1/2 top-[48%] h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,240,184,.34),rgba(201,142,168,.12)_52%,transparent_72%)] blur-md" />

        <svg
          viewBox="0 0 1000 600"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id={`${uid}-ribbon-a`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C98EA8" stopOpacity="0" />
              <stop offset="35%" stopColor="#C98EA8" stopOpacity=".9" />
              <stop offset="72%" stopColor="#FFF0B8" stopOpacity=".92" />
              <stop offset="100%" stopColor="#FFF0B8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-ribbon-b`} x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFDCCB" stopOpacity="0" />
              <stop offset="38%" stopColor="#FFDCCB" stopOpacity=".8" />
              <stop offset="74%" stopColor="#DCD5F5" stopOpacity=".8" />
              <stop offset="100%" stopColor="#DCD5F5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M-80 420C120 300 190 170 330 232S560 372 730 260 910 142 1080 208"
            fill="none"
            stroke={`url(#${uid}-ribbon-a)`}
            strokeWidth="16"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 0.15 + ratio * 0.7,
            }}
            transition={{ duration: 2.2, ease: EASE_SCENE }}
          />
          <motion.path
            d="M-60 470C140 390 230 286 378 330S592 452 760 350 930 286 1080 330"
            fill="none"
            stroke={`url(#${uid}-ribbon-b)`}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 0.1 + ratio * 0.6,
            }}
            transition={{ duration: 2, ease: EASE_SCENE, delay: 0.15 }}
          />
        </svg>

        <AnimatePresence>
          {fragments
            .filter((fragment) => !placed.has(fragment.id))
            .map((fragment, index) => (
              <motion.button
                key={fragment.id}
                type="button"
                onClick={() => place(fragment.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: EASE_ENTER,
                }}
                className="group absolute z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 bg-plum-deep/30 text-cream/85 shadow-[0_0_30px_-8px_rgba(255,240,184,.3)] backdrop-blur-[2px] transition-colors hover:border-butter/60 hover:text-butter active:scale-95 sm:h-14 sm:w-14"
                style={{ left: fragment.left, top: fragment.top }}
                aria-label={`Bring ${fragment.label} into the light`}
              >
                <span
                  className="anim-float"
                  style={{ animationDelay: fragment.delay }}
                >
                  <fragment.Icon
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    strokeWidth={1.5}
                    style={{ color: fragment.tone }}
                  />
                </span>
                <span className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[0.42rem] font-extrabold uppercase tracking-[0.18em] text-cream/45 transition-colors group-hover:text-cream/75 sm:block">
                  {fragment.label}
                </span>
              </motion.button>
            ))}
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-[16%] flex items-center justify-center gap-2">
          {fragments.map((fragment) => (
            <span
              key={fragment.id}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all duration-500",
                placed.has(fragment.id)
                  ? "scale-125 bg-butter"
                  : "bg-cream/25",
              )}
            />
          ))}
        </div>

        <div className="absolute bottom-[20%] left-1/2 flex w-[72%] max-w-[42rem] -translate-x-1/2 items-center justify-between px-2 sm:w-[46%]">
          {Array.from({ length: 11 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-butter/80 shadow-[0_0_16px_6px_rgba(255,240,184,.28)] anim-twinkle"
              style={{
                animationDelay: `${index * 0.22}s`,
                opacity: 0.25 + ratio * 0.5 + (index % 3) * 0.1,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(180deg,transparent,rgba(23,16,23,.54))]" />

        {complete ? (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[48%] h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-butter/30"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.7, 0], scale: 1.4 }}
            transition={{ duration: 1.8, ease: EASE_SCENE }}
          />
        ) : null}

        {dust.map((mote) => (
          <span
            key={mote.id}
            aria-hidden
            className="absolute rounded-full blur-[0.5px] anim-float"
            style={{
              left: `${mote.left}%`,
              top: `${mote.top}%`,
              width: mote.size,
              height: mote.size,
              background: mote.tone,
              opacity: 0.34,
              animationDuration: `${mote.duration}s`,
              animationDelay: `${mote.delay}s`,
            }}
          />
        ))}

        <DriftField
          count={complete ? 16 : 6}
          seed={168}
          tones={["#FFF0B8", "#FFDCCB", "#DCD5F5"]}
          opacity={complete ? 0.6 : 0.24}
          minSize={2}
          maxSize={5}
        />

        <Sparkles className="absolute right-[14%] top-[36%] h-5 w-5 text-butter/70 anim-twinkle" />
        <Sparkles className="absolute left-[12%] top-[22%] h-4 w-4 text-blush/60 anim-twinkle" style={{ animationDelay: "1.2s" }} />
      </motion.div>
    </SceneLayer>
  );
}
