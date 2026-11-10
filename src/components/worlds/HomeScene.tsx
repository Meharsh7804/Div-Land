"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CalendarDays,
  Clock3,
  Coffee,
  Heart,
  ListChecks,
  Sprout,
} from "lucide-react";
import { EASE_ENTER, EASE_SCENE } from "@/animations/motion";
import { cn, seeded } from "@/lib/utils";
import { DriftField, SceneLayer } from "./scene-kit";
import type { SceneInteractionProps } from "./scene-types";

const notes = [
  {
    id: "calendar",
    Icon: CalendarDays,
    label: "the calendar",
    left: "15%",
    top: "25%",
    delay: "-1.2s",
    duration: "7.4s",
  },
  {
    id: "clock",
    Icon: Clock3,
    label: "the clock",
    left: "72%",
    top: "21%",
    delay: "-3.4s",
    duration: "8.1s",
  },
  {
    id: "list",
    Icon: ListChecks,
    label: "the list",
    left: "82%",
    top: "46%",
    delay: "-2.1s",
    duration: "7.8s",
  },
  {
    id: "chai",
    Icon: Coffee,
    label: "the chai",
    left: "22%",
    top: "53%",
    delay: "-4.6s",
    duration: "8.6s",
  },
  {
    id: "plant",
    Icon: Sprout,
    label: "the little plant",
    left: "64%",
    top: "56%",
    delay: "-0.8s",
    duration: "7.1s",
  },
  {
    id: "heart",
    Icon: Heart,
    label: "the little heart",
    left: "45%",
    top: "30%",
    delay: "-5.2s",
    duration: "8.3s",
  },
] as const;

const dust = Array.from({ length: 14 }, (_, index) => {
  const random = seeded(67 + index);
  return {
    id: index,
    left: 6 + random() * 88,
    top: 8 + random() * 72,
    size: 1.5 + random() * 3.5,
    delay: random() * -9,
    duration: 8 + random() * 8,
  };
});

export function HomeScene({ completed, onComplete }: SceneInteractionProps) {
  const [collected, setCollected] = useState<Set<string>>(() =>
    completed ? new Set(notes.map((note) => note.id)) : new Set(),
  );
  const doneRef = useRef(completed);

  useEffect(() => {
    if (collected.size === notes.length && !doneRef.current) {
      doneRef.current = true;
      onComplete();
    }
  }, [collected, onComplete]);

  const collect = (id: string) => {
    setCollected((previous) => {
      if (previous.has(id)) return previous;
      const next = new Set(previous);
      next.add(id);
      return next;
    });
  };

  const ratio = collected.size / notes.length;
  const complete = collected.size === notes.length;

  return (
    <SceneLayer className="bg-[linear-gradient(160deg,#FFF6E6_0%,#FBE5D6_46%,#F3D2D8_100%)]">
      <motion.div
        className="absolute inset-0"
        animate={{
          filter: complete
            ? "saturate(1.08) brightness(1.04)"
            : "saturate(1) brightness(1)",
        }}
        transition={{ duration: 1.4, ease: EASE_SCENE }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_18%,rgba(255,220,150,.68),transparent_54%)]" />

        <div className="absolute right-[3%] top-[7%] h-[42%] w-[34%] overflow-hidden rounded-t-[999px] border-[3px] border-[#E8C7B0]/80 bg-[linear-gradient(180deg,#FFE7B0_0%,#FFC7A8_52%,#F3B9C9_100%)] shadow-[inset_0_0_34px_rgba(255,249,240,.55)] sm:right-[6%] sm:w-[24%]">
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#E8C7B0]/80" />
          <div className="absolute left-0 top-1/3 h-px w-full bg-[#E8C7B0]/80" />
          <div className="absolute left-0 top-2/3 h-px w-full bg-[#E8C7B0]/80" />
          <div className="absolute bottom-[-16%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[#FFF0B8] shadow-[0_0_54px_24px_rgba(255,240,184,.6)]" />
          <span className="absolute left-[-18%] top-[-10%] h-[130%] w-[40%] rounded-full bg-cream/35 blur-md" />
          <span className="absolute right-[-12%] top-[-6%] h-[120%] w-[34%] rounded-full bg-blush/30 blur-md" />
        </div>

        <div className="absolute left-[3%] top-[9%] h-[30%] w-[34%] sm:w-[27%]">
          <div className="absolute inset-x-0 top-[34%] h-1.5 rounded-full bg-[#C98EA8]/45" />
          <div className="absolute inset-x-0 top-[68%] h-1.5 rounded-full bg-[#C98EA8]/35" />
          {["#C98EA8", "#DCD5F5", "#FFF0B8", "#AFC4A4", "#FFDCCB"].map(
            (color, index) => (
              <span
                key={color}
                className="absolute bottom-[34%] w-[7%] rounded-t-[2px]"
                style={{
                  left: `${8 + index * 12}%`,
                  height: `${30 + (index % 3) * 10}%`,
                  background: color,
                }}
              />
            ),
          )}
          <span className="absolute bottom-[34%] right-[4%] h-[26%] w-[18%] rounded-t-full border border-[#9DB49A]/50 bg-[#AFC4A4]/40" />
          <span className="absolute bottom-[68%] left-[12%] h-[22%] w-[8%] rounded-t-[2px] bg-[#B0708C]/70" />
          <span className="absolute bottom-[68%] left-[24%] h-[26%] w-[8%] rounded-t-[2px] bg-[#8F6D42]/60" />
          <span className="absolute bottom-[68%] left-[36%] h-[20%] w-[8%] rounded-t-[2px] bg-[#DCD5F5]/80" />
        </div>

        <div className="absolute left-[43%] top-0 hidden sm:block">
          <span className="mx-auto block h-8 w-px bg-[#8F5069]/45" />
          <div className="relative mt-[-2px] h-7 w-16 rounded-t-[999px] rounded-b-[0.4rem] border border-[#E8C7B0]/70 bg-[linear-gradient(180deg,#FFE9C4,#F4C9BC)] shadow-[0_10px_24px_rgba(255,220,150,.35)]" />
        </div>

        <div className="absolute right-[1%] top-[47%] hidden h-[12%] w-[9%] sm:block">
          <div className="absolute bottom-0 h-[55%] w-full rounded-t-full border border-[#9DB49A]/50 bg-[#AFC4A4]/45" />
          <div className="absolute bottom-[48%] left-1/2 h-[52%] w-px -translate-x-1/2 bg-[#7E9670]" />
          <span className="absolute bottom-[56%] left-[10%] h-3 w-5 -rotate-[28deg] rounded-full bg-[#AFC4A4]" />
          <span className="absolute bottom-[64%] right-[8%] h-3 w-5 rotate-[24deg] rounded-full bg-[#8FAA84]" />
          <span className="absolute bottom-[78%] left-[30%] h-2.5 w-4 -rotate-[16deg] rounded-full bg-[#C7D3BD]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,rgba(201,142,168,.06),rgba(201,142,168,.24))]" />
        <div className="absolute inset-x-[4%] bottom-[4%] h-[20%] rounded-[50%] border border-[#C98EA8]/20 bg-[#F6DCE7]/60 shadow-[inset_0_10px_18px_rgba(255,249,240,.45)]" />
        <div className="absolute inset-x-0 bottom-[24%] h-px bg-[#C98EA8]/25" />

        <AnimatePresence>
          {notes
            .filter((note) => !collected.has(note.id))
            .map((note, index) => (
              <motion.button
                key={note.id}
                type="button"
                onClick={() => collect(note.id)}
                initial={{ opacity: 0, scale: 0.78 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2, y: 28 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: EASE_ENTER,
                }}
                className="group absolute z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[0.6rem] border border-[#D9B4A2]/80 bg-[#FFF9F0]/90 text-[#B0708C] shadow-[0_12px_22px_-14px_rgba(73,51,72,.65)] backdrop-blur-sm transition-colors hover:border-[#C98EA8] hover:text-[#8F5069] active:scale-95 sm:h-12 sm:w-12"
                style={{ left: note.left, top: note.top }}
                aria-label={`Collect ${note.label}`}
              >
                <span
                  className="anim-float"
                  style={{
                    animationDelay: note.delay,
                    animationDuration: note.duration,
                  }}
                >
                  <note.Icon className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem]" strokeWidth={1.7} />
                </span>
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#C98EA8]/60 transition-colors group-hover:bg-[#8F5069]" />
              </motion.button>
            ))}
        </AnimatePresence>

        <div className="absolute bottom-[17%] left-1/2 z-10 w-[40%] max-w-[11rem] -translate-x-1/2 sm:w-[30%]">
          <div
            className="absolute -inset-10 rounded-full bg-[radial-gradient(ellipse,rgba(255,240,184,.55),transparent_70%)] blur-2xl transition-opacity duration-700"
            style={{ opacity: 0.2 + ratio * 0.8 }}
          />
          <motion.div
            key={collected.size}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 0.55, ease: EASE_SCENE }}
            className="relative"
          >
            <div className="absolute inset-x-[8%] top-0 flex items-center justify-between">
              {notes.map((note) => (
                <span
                  key={note.id}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                    collected.has(note.id) ? "bg-[#C95D86]" : "bg-[#E8C7B0]",
                  )}
                />
              ))}
            </div>
            <div className="relative mt-3 h-14 w-full overflow-hidden rounded-b-[999px] border border-[#B98A63]/70 bg-[linear-gradient(180deg,#D9A86F,#B98A63)] shadow-[0_18px_28px_-18px_rgba(73,51,72,.7)]">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_6px,rgba(90,60,40,.32)_6px_8px)] opacity-50" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_7px,rgba(90,60,40,.32)_7px_9px)] opacity-40" />
              <motion.div
                className="absolute inset-x-[14%] bottom-0 h-1/2 rounded-t-full bg-[#FFF0B8]"
                animate={{ opacity: 0.12 + ratio * 0.72 }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="absolute -top-[3px] inset-x-0 h-3 rounded-[50%] border border-[#B98A63]/70 bg-[#E8C7B0]" />
          </motion.div>

          <AnimatePresence>
            {complete ? (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.6 }}
                animate={{ opacity: 1, y: -12, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE_SCENE }}
                className="absolute inset-x-0 top-0 flex justify-center text-[#C95D86] anim-float"
              >
                <Heart className="h-5 w-5 fill-current" />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>

        {dust.map((mote) => (
          <span
            key={mote.id}
            aria-hidden
            className="absolute rounded-full bg-[#FFF9F0] blur-[0.5px] anim-float"
            style={{
              left: `${mote.left}%`,
              top: `${mote.top}%`,
              width: mote.size,
              height: mote.size,
              opacity: 0.3,
              animationDuration: `${mote.duration}s`,
              animationDelay: `${mote.delay}s`,
            }}
          />
        ))}

        <DriftField
          count={complete ? 18 : 0}
          seed={144}
          tones={["#FFF0B8", "#F6DCE7", "#FFDCCB"]}
          opacity={0.55}
          minSize={2}
          maxSize={5}
        />
      </motion.div>
    </SceneLayer>
  );
}
