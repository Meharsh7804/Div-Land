"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Butterfly,
  Cloud,
  Flower,
  LeafSprig,
  Sparkle,
  Star4,
  TinyFlower,
} from "@/components/common/Illustrations";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { DUR, EASE_CINEMA, EASE_ENTER, EASE_SOFT } from "@/animations/motion";
import { site } from "@/data/site";
import { cn, seeded } from "@/lib/utils";

type IntroGateProps = {
  onEnter: () => void;
  reduced: boolean;
};

const STAGE = {
  scene: 0,
  gate: 1,
  bloom: 2,
  title: 3,
  ready: 4,
} as const;

const stars = (() => {
  const random = seeded(19);
  return Array.from({ length: 30 }, (_, id) => ({
    id,
    x: random() * 100,
    y: random() * 56,
    size: 2 + random() * 5,
    delay: random() * 6,
    duration: 3 + random() * 4.5,
    opacity: 0.25 + random() * 0.65,
  }));
})();

const motes = (() => {
  const random = seeded(47);
  return Array.from({ length: 26 }, (_, id) => ({
    id,
    x: random() * 100,
    y: 16 + random() * 74,
    size: 1.5 + random() * 3.5,
    duration: 8 + random() * 9,
    delay: random() * -14,
    opacity: 0.25 + random() * 0.5,
  }));
})();

const petals = (() => {
  const random = seeded(83);
  const tones = ["#F6DCE7", "#FFF0B8", "#DCD5F5", "#FFDCCB", "#F3C9DC"];
  return Array.from({ length: 16 }, (_, id) => ({
    id,
    x: random() * 100,
    size: 6 + random() * 10,
    duration: 13 + random() * 11,
    delay: random() * -18,
    drift: (random() - 0.5) * 180,
    tone: tones[Math.floor(random() * tones.length)],
    rotate: random() * 360,
  }));
})();

const butterflies = [
  { top: "26%", size: "h-8 w-8 sm:h-11 sm:w-11", duration: 25, delay: -3 },
  { top: "39%", size: "h-6 w-6 sm:h-9 sm:w-9", duration: 30, delay: -15 },
  { top: "51%", size: "h-5 w-5 sm:h-8 sm:w-8", duration: 35, delay: -23 },
  { top: "18%", size: "h-5 w-5 sm:h-7 sm:w-7", duration: 32, delay: -9 },
  { top: "62%", size: "h-6 w-6 sm:h-8 sm:w-8", duration: 28, delay: -19 },
];

const gateBlooms = [
  { left: "-18%", bottom: "0%", size: 38, tone: "#F6DCE7", center: "#FFF0B8", delay: 0 },
  { left: "-7%", bottom: "8%", size: 30, tone: "#DCD5F5", center: "#FFF9F0", delay: 0.1 },
  { left: "2%", bottom: "-2%", size: 34, tone: "#FFDCCB", center: "#C98EA8", delay: 0.18 },
  { left: "84%", bottom: "-1%", size: 36, tone: "#FFF0B8", center: "#C98EA8", delay: 0.06 },
  { left: "94%", bottom: "7%", size: 30, tone: "#F6DCE7", center: "#FFF9F0", delay: 0.14 },
  { left: "108%", bottom: "0%", size: 40, tone: "#DCD5F5", center: "#FFF0B8", delay: 0.22 },
];

const archRoses = [
  { left: "5%", top: "22%", size: 18 },
  { left: "17%", top: "10%", size: 15 },
  { left: "38%", top: "2%", size: 20 },
  { left: "62%", top: "2%", size: 17 },
  { left: "83%", top: "11%", size: 16 },
  { left: "95%", top: "24%", size: 19 },
];

function parallax(depth: number): CSSProperties {
  return {
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${(
      depth * 0.6
    ).toFixed(2)}px), 0)`,
  };
}

function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function SpeakerOff({ className }: { className?: string }) {
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
      <path d="M4 9.5h3.2L12 5.5v13L7.2 14.5H4v-5Z" />
      <path d="M16 9.5 21 15M21 9.5 16 15" />
    </svg>
  );
}

function SoundToggle({
  onToggle,
  musicOn,
  playing,
  busy,
}: {
  onToggle: () => void;
  musicOn: boolean;
  playing: boolean;
  busy: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={busy}
      aria-pressed={musicOn}
      aria-label={
        musicOn && playing
          ? "Turn the garden soundtrack off"
          : "Turn the garden soundtrack on"
      }
      className={cn(
        "group absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all sm:right-6 sm:top-6",
        musicOn
          ? "border-plum/20 bg-plum/90 text-cream shadow-[0_12px_30px_-14px_rgba(47,31,46,.8)]"
          : "border-plum/12 bg-cream/55 text-plum/55 hover:bg-cream/85 hover:text-plum",
        busy && "opacity-60",
      )}
      style={{ marginTop: "env(safe-area-inset-top)" }}
    >
      {musicOn && playing ? (
        <span className="flex h-4 items-end gap-[3px]">
          {[0, 1, 2].map((bar) => (
            <span
              key={bar}
              className="w-[2.5px] animate-pulse rounded-full bg-butter"
              style={{
                height: 6 + bar * 4,
                animationDelay: `${bar * 0.14}s`,
              }}
            />
          ))}
        </span>
      ) : (
        <SpeakerOff className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}

function FlutteringButterfly({
  top,
  size,
  duration,
  delay,
  className,
}: {
  top: string;
  size: string;
  duration: number;
  delay: number;
  className?: string;
}) {
  return (
    <span
      className={cn("garden-butterfly absolute left-0", className)}
      style={{
        top,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      <span className="garden-float block" style={{ animationDuration: "4.2s" }}>
        <span className="garden-flutter block">
          <Butterfly className={size} />
        </span>
      </span>
    </span>
  );
}

function DistantGarden() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 640"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[54%] w-full"
    >
      <path
        d="M0 396c158-58 300-10 470-44 178-36 322-132 512-108 174 22 288 98 458 76v320H0Z"
        fill="#CBC3E9"
        opacity=".5"
      />
      <path
        d="M0 442c176-56 328 8 506-26 188-36 336-108 520-74 158 30 274 78 414 58v240H0Z"
        fill="#B7C4D8"
        opacity=".55"
      />
      <path
        d="M0 486c196-48 342 12 524-14 202-28 336-74 512-46 152 24 272 54 404 32v182H0Z"
        fill="#9DB094"
        opacity=".55"
      />
      <path
        d="M0 436c140-34 246 4 356-18 118-24 190-70 300-58 106 12 160 54 262 50 132-6 226-46 522-16v68c-260-24-376 18-516 22-118 4-180-40-282-40-96 0-166 42-278 52-130 12-238-14-364 6Z"
        fill="#FFF6E4"
        opacity=".32"
      />
      <g fill="#7E8F72" opacity=".5">
        {[74, 158, 238, 318, 432, 1008, 1098, 1186, 1288, 1372].map((x, index) => {
          const y = 456 + (index % 3) * 16;
          const scale = 0.72 + ((index * 19) % 40) / 100;
          return (
            <g key={x} transform={`translate(${x} ${y}) scale(${scale})`}>
              <rect x="-2" y="0" width="4" height="54" rx="2" fill="#6F8267" />
              <circle cx="0" cy="-10" r="24" />
              <circle cx="-18" cy="8" r="16" />
              <circle cx="19" cy="5" r="18" />
            </g>
          );
        })}
      </g>
      <path
        d="M720 640 596 640c34-92 58-150 88-188 18-24 44-24 62 0 30 38 54 96 88 188Z"
        fill="#FFF6E4"
        opacity=".55"
      />
      <path
        d="M0 566c220-28 382 16 562-4 222-24 376-44 538-16 134 23 236 22 340 8v86H0Z"
        fill="#F8E9D4"
        opacity=".85"
      />
      <path
        d="M0 606c236-18 402 10 594-4 236-18 382-22 548-4 108 12 202 8 298 2v40H0Z"
        fill="#F6DCE7"
        opacity=".55"
      />
    </svg>
  );
}

function MidGarden({ bloom }: { bloom: boolean }) {
  const clusters = [
    { left: "4%", bottom: "0%", size: 58, tone: "#F6DCE7", center: "#FFF0B8", delay: 0 },
    { left: "11%", bottom: "-2%", size: 42, tone: "#DCD5F5", center: "#FFF9F0", delay: 0.1 },
    { left: "18%", bottom: "1%", size: 48, tone: "#FFF0B8", center: "#C98EA8", delay: 0.18 },
    { left: "82%", bottom: "0%", size: 52, tone: "#FFDCCB", center: "#C98EA8", delay: 0.06 },
    { left: "89%", bottom: "-2%", size: 44, tone: "#F6DCE7", center: "#FFF9F0", delay: 0.15 },
    { left: "96%", bottom: "1%", size: 60, tone: "#DCD5F5", center: "#FFF0B8", delay: 0.24 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] min-h-40">
      <svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-full w-full"
      >
        <path
          d="M0 160c196-56 336 18 520-6 214-28 348-92 520-66 158 24 270 70 400 52v160H0Z"
          fill="#9DB094"
          opacity=".6"
        />
        <path
          d="M0 216c220-40 372 24 560 0 214-28 344-58 520-30 146 23 250 48 360 30v84H0Z"
          fill="#B7C6AC"
          opacity=".7"
        />
        <path
          d="M0 266c240-22 400 10 590-4 232-18 382-24 548-6 108 12 204 8 302 2v42H0Z"
          fill="#F0DFCE"
          opacity=".9"
        />
      </svg>

      {clusters.map((cluster, index) => (
        <motion.div
          key={`${cluster.left}-${index}`}
          initial={false}
          animate={bloom ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.2, y: 14 }}
          transition={{ duration: 1, delay: cluster.delay, ease: EASE_ENTER }}
          className="absolute origin-bottom"
          style={{
            left: cluster.left,
            bottom: cluster.bottom,
            width: cluster.size,
            height: cluster.size,
            transform: "translateX(-50%)",
          }}
        >
          <Flower
            className="h-full w-full garden-sway"
            style={{
              ["--flower-petal" as string]: cluster.tone,
              ["--flower-center" as string]: cluster.center,
              animationDelay: `${-index * 0.8}s`,
            }}
          />
        </motion.div>
      ))}

      <LeafSprig className="absolute bottom-0 left-[8%] h-24 w-24 rotate-[16deg] text-[#7E8F72]/60 garden-sway" />
      <LeafSprig
        className="absolute bottom-0 right-[9%] h-28 w-28 -rotate-[20deg] text-[#7E8F72]/55 garden-sway"
        style={{ animationDelay: "-2.4s" }}
      />
    </div>
  );
}

function GardenGate({
  visible,
  bloom,
  ready,
  opening,
  onOpen,
}: {
  visible: boolean;
  bloom: boolean;
  ready: boolean;
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={false}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 34, scale: 0.9, filter: "blur(14px)" }
      }
      transition={{ duration: DUR.title, ease: EASE_ENTER }}
      inert={!ready}
      aria-hidden={!visible}
      className={cn("pointer-events-auto", !ready && "pointer-events-none")}
    >
      <button
        type="button"
        onClick={onOpen}
        disabled={opening || !ready}
        aria-label="Open the garden gate and enter Divya Land"
        className="group relative flex flex-col items-center rounded-[2rem] px-4 py-2 focus-visible:outline-offset-8 active:scale-[0.99] disabled:cursor-default"
      >
        <span className="relative block h-[13.4rem] w-[9.6rem] [perspective:1300px] sm:h-[18rem] sm:w-[12.6rem]">
          <span
            aria-hidden
            className={cn(
              "absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(255,240,184,.85),transparent_68%)] blur-2xl transition-all duration-700",
              opening ? "scale-150 opacity-100" : "garden-glow",
            )}
          />

          <span
            aria-hidden
            className="absolute -inset-x-[13%] -bottom-3 -top-3 rounded-t-[999px] border-[10px] border-[#D8C2B2] bg-[linear-gradient(180deg,rgba(255,249,240,.35),rgba(255,249,240,0))] shadow-[0_34px_60px_-32px_rgba(73,51,72,.7),inset_0_0_0_1px_rgba(255,255,255,.65)] sm:border-[12px]"
          />
          <span
            aria-hidden
            className="absolute inset-x-[4%] bottom-0 top-[2%] rounded-t-[999px] border-[3px] border-cream/70"
          />

          <span
            aria-hidden
            className={cn(
              "absolute inset-x-[9%] bottom-0 top-[9%] overflow-hidden rounded-t-[999px] bg-[radial-gradient(ellipse_at_50%_80%,#FFFDF4_0%,#FFF0B8_36%,#F6DCE7_70%,#D3CDED_100%)] transition-opacity duration-700",
              opening ? "opacity-100" : "opacity-95",
            )}
          >
            <span className="absolute left-1/2 top-[14%] h-16 w-16 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#FFFDF4,#FFE9A8_70%,#FFD9A0)] shadow-[0_0_70px_34px_rgba(255,240,184,.72)] sm:h-24 sm:w-24" />
            <span className="absolute bottom-0 left-1/2 h-[54%] w-[70%] -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,249,240,.97))]" />
            <span className="absolute bottom-[8%] left-1/2 h-[26%] w-[34%] -translate-x-1/2 rounded-t-full border-t border-cream/70" />
            <Sparkle className="absolute left-[18%] top-[40%] h-4 w-4 text-cream/90 garden-twinkle" />
            <Star4
              className="absolute right-[19%] top-[33%] h-3 w-3 text-rose/70 garden-twinkle"
              style={{ animationDelay: ".9s" }}
            />
          </span>

          <span
            aria-hidden
            className={cn(
              "absolute inset-y-0 left-0 z-[3] w-1/2 origin-left overflow-hidden rounded-tl-[999px] border-r border-plum/25 bg-[linear-gradient(145deg,#FFE7D6,#F6DCE7_54%,#E9CAD8)] shadow-[inset_-8px_0_16px_rgba(73,51,72,.08)] [backface-visibility:hidden] [transform-style:preserve-3d] transition-transform duration-[1100ms] [transition-timing-function:cubic-bezier(.65,0,.35,1)]",
              opening ? "[transform:rotateY(-88deg)]" : "[transform:rotateY(0deg)]",
            )}
          >
            <span className="absolute inset-x-3 top-[20%] h-px bg-plum/15" />
            <span className="absolute inset-x-3 top-[42%] h-px bg-plum/15" />
            <span className="absolute inset-x-3 top-[64%] h-px bg-plum/15" />
            <span className="absolute inset-x-3 top-[84%] h-px bg-plum/15" />
            <span className="absolute left-1/2 top-[48%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-butter shadow-[0_0_10px_rgba(255,240,184,.9)]" />
            <span className="absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-butter/80 bg-butter shadow-sm" />
            <Flower className="absolute bottom-5 left-3 h-5 w-5 garden-sway" />
            <TinyFlower className="absolute right-3 top-[24%] h-4 w-4 text-lavender-deep/70 garden-sway" />
          </span>

          <span
            aria-hidden
            className={cn(
              "absolute inset-y-0 right-0 z-[3] w-1/2 origin-right overflow-hidden rounded-tr-[999px] border-l border-plum/25 bg-[linear-gradient(215deg,#FFE7D6,#F6DCE7_54%,#E9CAD8)] shadow-[inset_8px_0_16px_rgba(73,51,72,.08)] [backface-visibility:hidden] [transform-style:preserve-3d] transition-transform duration-[1100ms] [transition-timing-function:cubic-bezier(.65,0,.35,1)]",
              opening ? "[transform:rotateY(88deg)]" : "[transform:rotateY(0deg)]",
            )}
          >
            <span className="absolute inset-x-3 top-[20%] h-px bg-plum/15" />
            <span className="absolute inset-x-3 top-[42%] h-px bg-plum/15" />
            <span className="absolute inset-x-3 top-[64%] h-px bg-plum/15" />
            <span className="absolute inset-x-3 top-[84%] h-px bg-plum/15" />
            <span className="absolute left-1/2 top-[48%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-butter shadow-[0_0_10px_rgba(255,240,184,.9)]" />
            <span className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-butter/80 bg-butter shadow-sm" />
            <Flower className="absolute bottom-5 right-3 h-5 w-5 garden-sway" />
            <TinyFlower className="absolute left-3 top-[24%] h-4 w-4 text-lavender-deep/70 garden-sway" />
          </span>

          <span
            aria-hidden
            className="absolute inset-x-[-11%] -top-3 h-5 rounded-full border border-butter/70 bg-[linear-gradient(90deg,#E9CAD8,#FFF0B8,#E9CAD8)] shadow-sm"
          />
          <span className="absolute left-1/2 top-0 z-[5] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-butter/70 bg-cream/85 shadow-sm sm:h-11 sm:w-11">
            <Star4 className="h-4 w-4 text-rose-deep garden-twinkle sm:h-5 sm:w-5" />
          </span>

          {archRoses.map((rose, index) => (
            <motion.span
              key={`${rose.left}-${index}`}
              aria-hidden
              initial={false}
              animate={bloom ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.7, delay: 0.25 + index * 0.08, ease: EASE_ENTER }}
              className="absolute z-[6]"
              style={{ left: rose.left, top: rose.top, width: rose.size, height: rose.size }}
            >
              <Flower
                className="h-full w-full garden-sway"
                style={{
                  ["--flower-petal" as string]: index % 2 ? "#F6DCE7" : "#DCD5F5",
                  ["--flower-center" as string]: index % 2 ? "#FFF0B8" : "#FFF9F0",
                }}
              />
            </motion.span>
          ))}

          <span
            aria-hidden
            className="absolute -bottom-3 left-1/2 z-[2] h-3 w-[118%] -translate-x-1/2 rounded-[50%] bg-[#8FA083]/55 blur-[1px]"
          />

          {gateBlooms.map((spot, index) => (
            <motion.span
              key={`${spot.left}-${index}`}
              aria-hidden
              initial={false}
              animate={bloom ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.15, y: 14 }}
              transition={{ duration: 0.85, delay: spot.delay, ease: EASE_ENTER }}
              className="absolute z-[4] origin-bottom"
              style={{
                left: spot.left,
                bottom: spot.bottom,
                width: spot.size,
                height: spot.size,
                ["--flower-petal" as string]: spot.tone,
                ["--flower-center" as string]: spot.center,
              }}
            >
              <Flower
                className="h-full w-full garden-sway"
                style={{ animationDelay: `${-index * 0.6}s` }}
              />
            </motion.span>
          ))}

          <motion.span
            aria-hidden
            animate={opening ? { scale: [0.7, 2.8], opacity: [0.9, 0] } : { opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 z-[7] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-butter/60"
          />
        </span>

        <span
          className={cn(
            "mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-plum/12 bg-cream/60 px-4 py-1.5 text-[0.58rem] font-extrabold uppercase tracking-[0.24em] text-plum/70 shadow-[0_10px_24px_-18px_rgba(47,31,46,.7)] backdrop-blur transition-all duration-500 group-hover:border-rose-deep/25 group-hover:bg-cream/90 group-hover:text-plum",
            ready && !opening ? "opacity-100" : "opacity-0",
          )}
        >
          open the gate
          <ArrowDoodle className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </button>
    </motion.div>
  );
}

function ForegroundGarden() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      <LeafSprig className="absolute -bottom-10 -left-12 h-48 w-48 rotate-[20deg] text-[#6F8267]/65 blur-[0.4px] garden-sway sm:h-64 sm:w-64" />
      <LeafSprig
        className="absolute -bottom-14 -right-14 h-52 w-52 -rotate-[26deg] text-[#7E8F72]/65 blur-[0.4px] garden-sway sm:h-72 sm:w-72"
        style={{ animationDelay: "-2.2s" }}
      />
      <Flower
        className="absolute -bottom-6 left-[2%] h-16 w-16 garden-sway sm:h-24 sm:w-24"
        style={{
          ["--flower-petal" as string]: "#F6DCE7",
          ["--flower-center" as string]: "#FFF0B8",
          animationDuration: "7s",
        }}
      />
      <Flower
        className="absolute -bottom-8 right-[3%] h-20 w-20 garden-sway sm:h-28 sm:w-28"
        style={{
          ["--flower-petal" as string]: "#DCD5F5",
          ["--flower-center" as string]: "#C98EA8",
          animationDuration: "8s",
          animationDelay: "-2.4s",
        }}
      />
      <TinyFlower className="absolute bottom-[12%] left-[9%] h-7 w-7 text-rose/55 garden-sway" />
      <TinyFlower
        className="absolute bottom-[18%] right-[11%] h-6 w-6 text-lavender-deep/55 garden-sway"
        style={{ animationDelay: "-1.6s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_44%,transparent_52%,rgba(73,51,72,.16)_100%)]" />
    </div>
  );
}

export function IntroGate({ onEnter, reduced }: IntroGateProps) {
  const audio = useAudioExperience();
  const [stageState, setStage] = useState<number>(reduced ? STAGE.ready : STAGE.scene);
  const stage = reduced ? STAGE.ready : stageState;
  const [opening, setOpening] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const enterTimeout = useRef<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) return;
    const schedule: [number, number][] = [
      [700, STAGE.gate],
      [1500, STAGE.bloom],
      [2200, STAGE.title],
      [2950, STAGE.ready],
    ];
    timers.current = schedule.map(([delay, value]) =>
      window.setTimeout(() => setStage(value), delay),
    );
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      if (enterTimeout.current) window.clearTimeout(enterTimeout.current);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const node = sceneRef.current;
    if (!node) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        node.style.setProperty("--px", `${x.toFixed(3)}`);
        node.style.setProperty("--py", `${y.toFixed(3)}`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  const handleEnter = () => {
    if (opening) return;
    audio.playSfx("gate");
    void audio.startIfEnabled();
    setOpening(true);
    enterTimeout.current = window.setTimeout(
      () => onEnter(),
      reduced ? 320 : 1500,
    );
  };

  const handleMusicToggle = () => {
    if (audio.musicOn && !audio.playing) {
      void audio.startIfEnabled();
      return;
    }
    audio.toggleMusic();
  };

  const titleVisible = stage >= STAGE.title;
  const ready = stage >= STAGE.ready;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      className="fixed inset-0 z-[80] overflow-hidden bg-[#F4EADF]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DUR.wide, ease: EASE_ENTER }}
    >
      <motion.div
        className="absolute inset-0 origin-[50%_60%]"
        animate={
          opening
            ? { scale: 1.4, y: "-1%", filter: "blur(3px)" }
            : { scale: [1.015, 1.045, 1.015], y: "0%", filter: "blur(0px)" }
        }
        transition={
          opening
            ? { duration: 1.55, ease: EASE_CINEMA }
            : { duration: 26, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div
          ref={sceneRef}
          className="relative h-full w-full overflow-hidden"
          style={{ ["--px" as string]: "0", ["--py" as string]: "0" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,#B9B2E8_0%,#D3C5EC_22%,#F0D5E6_44%,#FFE6D3_64%,#FFF2D6_82%,#F8EBDD_100%)]"
          />

          <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]" style={parallax(4)}>
            <div className="absolute left-[6%] top-[8%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,240,184,.95),rgba(255,220,203,.35)_55%,transparent_72%)] blur-2xl sm:h-56 sm:w-56" />
            <div className="absolute left-1/2 top-[24%] h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,246,223,.8),transparent_68%)] blur-2xl sm:h-96 sm:w-96" />
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]" style={parallax(7)}>
            <Cloud className="absolute right-[3%] top-[7%] h-16 w-28 text-white/70 garden-cloud sm:h-24 sm:w-44" />
            <Cloud
              className="absolute left-[-6%] top-[20%] h-11 w-24 text-white/50 garden-cloud"
              style={{ animationDuration: "31s", animationDelay: "-8s" }}
            />
            <Cloud
              className="absolute right-[17%] top-[31%] h-9 w-20 text-lavender/60 garden-cloud"
              style={{ animationDuration: "36s", animationDelay: "-17s" }}
            />
            <Cloud
              className="absolute left-[22%] top-[4%] h-7 w-16 text-white/40 garden-cloud"
              style={{ animationDuration: "42s", animationDelay: "-24s" }}
            />
            <Cloud
              className="absolute left-[42%] top-[38%] h-8 w-20 text-white/35 garden-cloud"
              style={{ animationDuration: "39s", animationDelay: "-31s" }}
            />
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-0 z-[3]" style={parallax(3)}>
            {stars.map((star) => (
              <Star4
                key={star.id}
                className="absolute text-cream garden-twinkle"
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
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-full"
            style={parallax(9)}
          >
            <DistantGarden />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[58%]"
            style={parallax(12)}
          >
            <svg
              viewBox="0 0 1440 420"
              preserveAspectRatio="xMidYMax slice"
              className="h-full w-full"
            >
              <g fill="#6F8267" opacity=".45">
                {[128, 224, 318, 1104, 1198, 1296, 1392].map((x, index) => (
                  <g key={x} transform={`translate(${x} ${296 + (index % 2) * 18})`}>
                    <rect x="-3" y="0" width="6" height="94" rx="3" />
                    <circle cx="0" cy="-14" r="42" />
                    <circle cx="-30" cy="12" r="28" />
                    <circle cx="31" cy="8" r="31" />
                  </g>
                ))}
              </g>
            </svg>
          </div>

          <div className="pointer-events-none absolute inset-0 z-[6]">
            <MidGarden bloom={stage >= STAGE.bloom} />
          </div>

          <div className="absolute left-1/2 top-[66%] z-10 -translate-x-1/2 -translate-y-1/2 sm:top-[67%]">
            <GardenGate
              visible={stage >= STAGE.gate}
              bloom={stage >= STAGE.bloom}
              ready={ready}
              opening={opening}
              onOpen={handleEnter}
            />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[14] overflow-hidden"
            style={parallax(16)}
          >
            {butterflies.map((butterfly, index) => (
              <FlutteringButterfly
                key={index}
                top={butterfly.top}
                size={butterfly.size}
                duration={butterfly.duration}
                delay={butterfly.delay}
                className={index === 3 ? "hidden sm:block" : undefined}
              />
            ))}
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-0 z-[15]" style={parallax(13)}>
            {motes.map((mote) => (
              <span
                key={mote.id}
                className="garden-mote absolute rounded-full bg-cream/85 shadow-[0_0_9px_rgba(255,249,240,.9)]"
                style={{
                  left: `${mote.x}%`,
                  top: `${mote.y}%`,
                  width: mote.size,
                  height: mote.size,
                  opacity: mote.opacity,
                  animationDuration: `${mote.duration}s`,
                  animationDelay: `${mote.delay}s`,
                }}
              />
            ))}
            {petals.map((petal) => (
              <span
                key={`petal-${petal.id}`}
                className="garden-petal absolute top-0 block"
                style={{
                  left: `${petal.x}%`,
                  width: petal.size,
                  height: petal.size * 0.72,
                  background: petal.tone,
                  borderRadius: "100% 0 100% 0",
                  opacity: 0.7,
                  transform: `rotate(${petal.rotate}deg)`,
                  animationDuration: `${petal.duration}s`,
                  animationDelay: `${petal.delay}s`,
                  ["--drift" as string]: `${petal.drift}px`,
                }}
              />
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[16] h-[26%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,249,240,.96)_0%,rgba(255,240,184,.5)_38%,transparent_74%)]"
          />

          <ForegroundGarden />

          <motion.div
            initial={false}
            animate={
              opening
                ? { opacity: 0, y: -30, scale: 1.06, filter: "blur(10px)" }
                : titleVisible
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, y: 30, scale: 0.97, filter: "blur(14px)" }
            }
            transition={{ duration: DUR.title, ease: EASE_ENTER }}
            className="absolute inset-x-0 top-[7%] z-30 px-5 text-center sm:top-[8%]"
          >
            <div className="relative mx-auto w-max max-w-full">
              <span
                aria-hidden
                className="absolute inset-x-2 top-1/2 h-24 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,240,184,.7),transparent_70%)] blur-2xl"
              />
              <h1
                id="intro-title"
                className="relative display-title text-[clamp(3rem,12.5vw,7.4rem)] uppercase leading-[0.8] tracking-[0.05em] text-plum sm:tracking-[0.08em]"
              >
                <span className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={false}
                    animate={
                      titleVisible && !opening
                        ? { y: "0%", opacity: 1, rotate: 0 }
                        : { y: "112%", opacity: 0, rotate: 2 }
                    }
                    transition={{ duration: 1.15, ease: EASE_ENTER }}
                  >
                    Divya
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block italic text-rose-deep"
                    initial={false}
                    animate={
                      titleVisible && !opening
                        ? { y: "0%", opacity: 1, rotate: 0 }
                        : { y: "112%", opacity: 0, rotate: -2 }
                    }
                    transition={{ duration: 1.15, delay: 0.14, ease: EASE_ENTER }}
                  >
                    Land
                  </motion.span>
                </span>
              </h1>
              <Star4 className="absolute -right-3 -top-2 h-4 w-4 text-rose-deep garden-twinkle sm:-right-7 sm:h-5 sm:w-5" />
              <Star4
                className="absolute -left-3 bottom-2 h-3 w-3 text-plum/45 garden-twinkle"
                style={{ animationDelay: "1.1s" }}
              />
            </div>

            <motion.p
              initial={false}
              animate={
                titleVisible && !opening
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 12, filter: "blur(6px)" }
              }
              transition={{ duration: 0.9, delay: 0.5, ease: EASE_SOFT }}
              className="mx-auto mt-3 max-w-sm font-display text-[clamp(0.92rem,3vw,1.15rem)] italic tracking-[0.01em] text-plum/72"
            >
              {site.tagline}
            </motion.p>
          </motion.div>

          <SoundToggle
            onToggle={handleMusicToggle}
            musicOn={audio.musicOn}
            playing={audio.playing}
            busy={audio.busy}
          />

          <AnimatePresence>
            {opening ? (
              <motion.div
                key="garden-bloom"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: [0, 0.95, 0], scale: 2.9 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="pointer-events-none absolute left-1/2 top-1/2 z-[60] h-[76vmax] w-[76vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFFDF7_0%,#FFF0B8_30%,transparent_68%)]"
              />
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
