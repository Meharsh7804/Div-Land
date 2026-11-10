"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { DriftField, SceneLayer } from "./scene-kit";
import type { SceneInteractionProps } from "./scene-types";

const audience = [
  { x: 4, y: 13, s: 1 },
  { x: 14, y: 5, s: 0.86 },
  { x: 24, y: 13, s: 1.08 },
  { x: 34, y: 3, s: 0.9 },
  { x: 44, y: 11, s: 1.02 },
  { x: 55, y: 5, s: 0.88 },
  { x: 65, y: 13, s: 1.06 },
  { x: 75, y: 4, s: 0.92 },
  { x: 85, y: 11, s: 1.02 },
  { x: 95, y: 6, s: 0.86 },
];

function Audience({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-[20%] w-full transition-opacity duration-1000",
        visible ? "opacity-100" : "opacity-0",
      )}
      aria-hidden
    >
      <defs>
        <linearGradient id="voice-audience-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1219" stopOpacity=".2" />
          <stop offset="55%" stopColor="#160F16" stopOpacity=".92" />
          <stop offset="100%" stopColor="#120C12" />
        </linearGradient>
      </defs>
      <rect width="100" height="32" fill="url(#voice-audience-fade)" />
      {audience.map((person, index) => (
        <g
          key={index}
          transform={`translate(${person.x} ${person.y}) scale(${person.s})`}
        >
          <circle cx="0" cy="6" r="4.2" fill="#0D090D" />
          <path d="M-6 21c0-6 3-9 6-9s6 3 6 9v9h-12v-9Z" fill="#0D090D" />
          <circle
            cx="1.5"
            cy="10"
            r="0.7"
            fill={index % 3 === 0 ? "#FFF0B8" : "#C98EA8"}
            opacity=".6"
            className="anim-twinkle"
            style={{ animationDelay: `${index * 0.4}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

export function VoiceScene({ completed, onComplete }: SceneInteractionProps) {
  const [lit, setLit] = useState(completed);
  const [holding, setHolding] = useState(false);
  const timerRef = useRef<number | null>(null);
  const doneRef = useRef(completed);
  const holdingRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const begin = () => {
    if (doneRef.current || holdingRef.current) return;
    holdingRef.current = true;
    clearTimer();
    setHolding(true);
    timerRef.current = window.setTimeout(() => {
      doneRef.current = true;
      holdingRef.current = false;
      timerRef.current = null;
      setHolding(false);
      setLit(true);
      onComplete();
    }, 1600);
  };

  const release = () => {
    if (doneRef.current) return;
    holdingRef.current = false;
    setHolding(false);
    clearTimer();
  };

  const active = lit || holding;
  const glow = lit ? 1 : holding ? 0.82 : 0.12;

  return (
    <SceneLayer className="bg-[radial-gradient(ellipse_at_50%_4%,#5B3F58_0%,#2A1C29_58%,#160F16_100%)]">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ scale: active ? 1 : 1.04 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <div className="absolute inset-x-[8%] top-[5%] h-[74%] overflow-hidden rounded-t-[999px] border border-butter/20 bg-[linear-gradient(180deg,rgba(201,142,168,.36),rgba(73,51,72,.12)_72%,transparent)]">
          <div className="absolute inset-x-[7%] top-[5%] h-full rounded-t-[999px] border border-cream/10" />
        </div>

        <div className="absolute inset-y-0 left-0 w-[18%] bg-[repeating-linear-gradient(90deg,#1A1219_0_7px,#3B2838_7px_14px,#241821_14px_21px)] [clip-path:polygon(0_0,100%_0,58%_100%,0_100%)]" />
        <div className="absolute inset-y-0 right-0 w-[18%] bg-[repeating-linear-gradient(270deg,#1A1219_0_7px,#3B2838_7px_14px,#241821_14px_21px)] [clip-path:polygon(0_0,100%_0,100%_100%,42%_100%)]" />

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[-8%] h-[92%] w-[64%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,249,240,.38),rgba(255,240,184,.12)_46%,transparent_82%)] [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)] blur-md"
          animate={{ opacity: glow }}
          transition={{ duration: lit ? 1.1 : 1.4, ease: "easeOut" }}
        />
        <motion.div
          className="pointer-events-none absolute left-[2%] top-0 h-[72%] w-[34%] bg-[linear-gradient(180deg,rgba(246,220,231,.26),transparent_78%)] [clip-path:polygon(56%_0,64%_0,100%_100%,0_84%)] blur-xl"
          animate={{ opacity: glow * 0.8 }}
          transition={{ duration: 1.3 }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-0 h-[70%] w-[30%] bg-[linear-gradient(180deg,rgba(220,213,245,.2),transparent_78%)] [clip-path:polygon(36%_0,44%_0,100%_100%,0_84%)] blur-xl"
          animate={{ opacity: glow * 0.75 }}
          transition={{ duration: 1.3 }}
        />

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[20%] h-[2px] bg-[linear-gradient(90deg,transparent,rgba(255,240,184,.85),rgba(255,249,240,.32),transparent)] blur-[1px]"
          animate={{ opacity: glow * 0.9 }}
          transition={{ duration: 1 }}
        />

        <div className="absolute inset-x-0 bottom-[25%] h-px bg-butter/25" />
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(180deg,rgba(201,142,168,.2),#160F16_72%)]" />
        <motion.div
          className="pointer-events-none absolute inset-x-[8%] bottom-[3%] h-[24%] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,240,184,.2),transparent_70%)] blur-sm"
          animate={{ opacity: glow }}
          transition={{ duration: 1 }}
        />

        <Audience visible={active} />

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[40%] h-[34%] w-[54%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,240,184,.3),transparent_68%)] blur-2xl"
          animate={{ opacity: glow }}
          transition={{ duration: 1 }}
        />

        <motion.button
          type="button"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            begin();
          }}
          onPointerUp={release}
          onPointerCancel={release}
          onLostPointerCapture={release}
          onKeyDown={(event) => {
            if (event.key === " " || event.key === "Enter") {
              event.preventDefault();
              begin();
            }
          }}
          onKeyUp={(event) => {
            if (event.key === " " || event.key === "Enter") {
              event.preventDefault();
              release();
            }
          }}
          onContextMenu={(event) => event.preventDefault()}
          aria-label="Press and hold to light the stage"
          aria-pressed={lit}
          className="group absolute left-1/2 top-[46%] z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 touch-none select-none items-center justify-center rounded-full border border-butter/40 bg-[radial-gradient(circle_at_38%_28%,rgba(255,249,240,.22),rgba(42,28,41,.75))] text-cream shadow-[0_0_60px_-10px_rgba(255,240,184,.4)] backdrop-blur-sm transition-transform active:scale-95 sm:h-24 sm:w-24"
        >
          <span className="pointer-events-none absolute inset-[-18%] rounded-full border border-butter/25 anim-breathe" />
          <span
            className="pointer-events-none absolute inset-[-36%] rounded-full border border-blush/15 anim-breathe"
            style={{ animationDelay: "-1.4s" }}
          />
          <Mic
            className={cn(
              "h-8 w-8 transition-colors duration-500 sm:h-9 sm:w-9",
              lit ? "text-butter" : "text-cream/80",
            )}
            strokeWidth={1.6}
          />
        </motion.button>

        <div className="pointer-events-none absolute inset-x-0 bottom-[8%] flex flex-col items-center gap-1.5">
          <div className="flex h-7 items-center justify-center gap-[3px]" aria-hidden>
            {Array.from({ length: 17 }).map((_, index) => (
              <motion.span
                key={index}
                className="w-[3px] rounded-full bg-[linear-gradient(180deg,#FFF0B8,#C98EA8)]"
                style={{ height: `${26 + (index % 4) * 13}%` }}
                animate={{
                  scaleY: active
                    ? [0.35, 1, 0.5]
                    : [0.16, 0.24, 0.16],
                }}
                transition={{
                  duration: 1.1 + (index % 5) * 0.08,
                  repeat: active ? Infinity : 0,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: index * 0.05,
                }}
              />
            ))}
          </div>
          <span className="text-[0.4rem] font-extrabold uppercase tracking-[0.28em] text-cream/38">
            {lit ? "stage lights · on" : holding ? "almost there" : "press & hold"}
          </span>
        </div>

        <DriftField
          count={12}
          seed={77}
          tones={["#FFF0B8", "#F6DCE7", "#DCD5F5"]}
          opacity={0.3}
        />
      </motion.div>
    </SceneLayer>
  );
}
