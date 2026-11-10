"use client";

import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion } from "motion/react";
import { ArrowLeftRight } from "lucide-react";
import { EASE_SCENE } from "@/animations/motion";
import { clamp, seeded } from "@/lib/utils";
import { DriftField, SceneLayer } from "./scene-kit";
import type { SceneInteractionProps } from "./scene-types";

const random = seeded(93);
const windLines = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  side: index % 2 === 0 ? "left" : "right",
  top: 6 + random() * 82,
  width: 18 + random() * 42,
  duration: 9 + random() * 12,
  delay: random() * -12,
  opacity: 0.16 + random() * 0.38,
}));

function WindHalf({
  side,
  open,
  dragging,
}: {
  side: "left" | "right";
  open: number;
  dragging: boolean;
}) {
  const direction = side === "left" ? -1 : 1;
  return (
    <div
      aria-hidden
      className="absolute inset-y-0 z-10 w-[62%] overflow-hidden"
      style={{
        left: side === "left" ? 0 : "auto",
        right: side === "right" ? 0 : "auto",
        transform: `translateX(${direction * open * 64}%)`,
        transition: dragging
          ? "none"
          : "transform .95s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(102deg,rgba(255,249,240,.12)_0_1.5px,transparent_1.5px_19px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,27,44,.55),rgba(42,27,44,.12)_60%,rgba(42,27,44,.45))]" />
      {windLines
        .filter((line) => line.side === side)
        .map((line) => (
          <span
            key={line.id}
            className="absolute h-px rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,249,240,.85),transparent)] anim-drift"
            style={{
              top: `${line.top}%`,
              left: side === "left" ? `${100 - line.width}%` : 0,
              width: `${line.width}%`,
              opacity: line.opacity,
              animationDuration: `${line.duration}s`,
              animationDelay: `${line.delay}s`,
            }}
          />
        ))}
    </div>
  );
}

function LoneTree({ glowing }: { glowing: boolean }) {
  return (
    <svg
      viewBox="0 0 360 420"
      className="h-full w-full"
      aria-label="A lone tree holding its ground while the wind moves around it"
      role="img"
    >
      <defs>
        <radialGradient id="strength-canopy" cx="38%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#6B435E" />
          <stop offset="64%" stopColor="#4B3045" />
          <stop offset="100%" stopColor="#352235" />
        </radialGradient>
        <radialGradient id="strength-glow" cx="50%" cy="52%" r="50%">
          <stop offset="0%" stopColor="#FFE3C4" stopOpacity=".55" />
          <stop offset="62%" stopColor="#FFD99A" stopOpacity=".16" />
          <stop offset="100%" stopColor="#FFD99A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="180" cy="230" rx="170" ry="210" fill="url(#strength-glow)" />
      <ellipse cx="180" cy="382" rx="142" ry="17" fill="#2A1B2C" opacity=".5" />

      <path
        d="M137 372c-6-24-18-32-38-36 20-2 34 4 45 16m79 20c6-24 18-32 38-36-20-2-34 4-45 16m-64-10c-2-18-8-28-18-38m54 38c2-18 8-28 18-38"
        fill="none"
        stroke="#3F283E"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M172 372c-2-46-1-88 3-126l-5-34 10-40 9 40-6 34c6 38 6 80 1 126-2 9-10 9-12 0Z"
        fill="#3F283E"
      />
      <path
        d="M181 246c-21-12-36-31-44-55m44 28c19-10 32-28 38-50m-37 64c-15-8-26-21-32-38m32 52c15-8 25-20 30-35m-29-38c-8-18-10-38-6-58m8 50c7-18 9-37 5-55"
        fill="none"
        stroke="#3F283E"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <g fill="url(#strength-canopy)">
        <circle cx="106" cy="176" r="30" />
        <circle cx="132" cy="148" r="46" />
        <circle cx="180" cy="114" r="57" />
        <circle cx="230" cy="148" r="48" />
        <circle cx="256" cy="178" r="30" />
        <circle cx="154" cy="190" r="40" />
        <circle cx="212" cy="188" r="42" />
      </g>

      <path
        d="M124 150c12-26 34-44 62-48 24-4 46 4 62 22"
        fill="none"
        stroke="#FFE3C4"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity=".5"
      />
      <path
        d="M209 78c20 12 32 32 34 55"
        fill="none"
        stroke="#FFF3C9"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".55"
      />
      <path
        d="M186 178c-6 28-8 58-6 88"
        fill="none"
        stroke="#FFE3C4"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".32"
      />

      {glowing ? (
        <g className="anim-twinkle" style={{ transformBox: "fill-box" }}>
          <circle cx="104" cy="204" r="2.6" fill="#FFF0B8" />
          <circle cx="246" cy="214" r="2.2" fill="#FFDCCB" />
          <circle cx="198" cy="196" r="2" fill="#FFF0B8" />
          <circle cx="154" cy="214" r="1.8" fill="#DCD5F5" />
        </g>
      ) : null}
    </svg>
  );
}

export function StrengthScene({ completed, onComplete }: SceneInteractionProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<number | null>(null);
  const openRef = useRef(completed ? 1 : 0);
  const doneRef = useRef(completed);
  const [open, setOpen] = useState(completed ? 1 : 0);
  const [dragging, setDragging] = useState(false);

  const begin = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (doneRef.current) return;
    startRef.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (startRef.current === null) return;
    const width = wrapRef.current?.getBoundingClientRect().width ?? 600;
    const next = clamp(
      Math.abs(event.clientX - startRef.current) / (width * 0.26),
      0,
      1,
    );
    openRef.current = next;
    setOpen(next);
  };

  const end = () => {
    if (startRef.current === null) return;
    startRef.current = null;
    setDragging(false);
    if (openRef.current >= 0.72) {
      openRef.current = 1;
      setOpen(1);
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
    } else {
      openRef.current = 0;
      setOpen(0);
    }
  };

  const partForHer = () => {
    openRef.current = 1;
    setOpen(1);
    if (!doneRef.current) {
      doneRef.current = true;
      onComplete();
    }
  };

  const calm = open > 0.6;

  return (
    <SceneLayer className="bg-[linear-gradient(180deg,#241726_0%,#4A2C43_28%,#A65C6C_54%,#E6A07F_76%,#FFE3C4_100%)]">
      <div ref={wrapRef} className="absolute inset-0">
        <motion.div
          className="absolute left-[54%] top-[35%] h-[58%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFF3C9_0%,#FFD99A_26%,#F0A98E_52%,transparent_72%)] blur-[1px]"
          animate={{ opacity: 0.6 + open * 0.35 }}
          transition={{ duration: dragging ? 0.1 : 0.8, ease: EASE_SCENE }}
        />

        <div className="absolute left-[10%] top-[12%] h-2 w-2 rounded-full bg-butter/70 anim-twinkle" />
        <div className="absolute left-[34%] top-[8%] h-1.5 w-1.5 rounded-full bg-cream/65 anim-twinkle" style={{ animationDelay: "1.1s" }} />
        <div className="absolute right-[18%] top-[10%] h-2 w-2 rounded-full bg-blush/70 anim-twinkle" style={{ animationDelay: "2.2s" }} />

        <svg
          viewBox="0 0 1000 330"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-[36%] w-full"
          aria-hidden
        >
          <path d="M0 330V218l112-32 98 28 108-44 122 46 104-30 122 46 108-28 112 34 114-24v116H0Z" fill="#6B3F55" opacity=".5" />
          <path d="M0 330V260l134-36 116 30 124-38 126 36 104-28 130 40 108-28 158 20v74H0Z" fill="#3F283E" opacity=".9" />
          <path d="M0 314c150-18 290-16 420-3 146 14 286 16 440 1 54-5 98-8 140-8v26H0Z" fill="#2A1B2C" />
        </svg>

        <div className="absolute bottom-[7%] left-1/2 h-[57%] w-[52%] max-w-[22rem] -translate-x-1/2 sm:h-[62%] sm:w-[34%]">
          <div
            className="absolute -inset-10 rounded-full bg-[radial-gradient(ellipse,rgba(255,226,176,.46),transparent_68%)] blur-2xl transition-opacity duration-700"
            style={{ opacity: 0.25 + open * 0.75 }}
          />
          <LoneTree glowing={calm} />
        </div>

        <WindHalf side="left" open={open} dragging={dragging} />
        <WindHalf side="right" open={open} dragging={dragging} />

        <div
          className="absolute inset-0 z-20 touch-pan-y"
          onPointerDown={begin}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          onLostPointerCapture={end}
          aria-hidden
        />

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[48%] z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-cream/85"
          animate={{ opacity: open > 0.12 ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/35 bg-plum-deep/45 backdrop-blur-sm anim-breathe">
            <ArrowLeftRight className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span className="text-[0.46rem] font-extrabold uppercase tracking-[0.24em] text-cream/55">
            drag the wind
          </span>
        </motion.div>

        {!completed ? (
          <button
            type="button"
            onClick={partForHer}
            className="absolute bottom-[9%] right-[4%] z-30 rounded-full border border-cream/30 bg-plum-deep/40 px-3 py-1.5 text-[0.48rem] font-extrabold uppercase tracking-[0.18em] text-cream/80 backdrop-blur-sm transition hover:border-cream/50 hover:text-cream"
          >
            part it for her
          </button>
        ) : null}

        <DriftField
          count={calm ? 20 : 8}
          seed={108}
          tones={["#FFE3C4", "#F6DCE7", "#FFF0B8"]}
          opacity={calm ? 0.5 : 0.2}
          minSize={2}
          maxSize={5}
        />
      </div>
    </SceneLayer>
  );
}
