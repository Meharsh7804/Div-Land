"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import {
  Butterfly,
  Cloud,
  Flower,
  LeafSprig,
  TinyFlower,
} from "@/components/common/Illustrations";
import { EASE_ENTER } from "@/animations/motion";
import { cn, seeded } from "@/lib/utils";
import { GateArt } from "./GateArt";
import { INTRO_STAGE, type IntroStage } from "./introTimeline";

type IntroSceneryProps = {
  stage: IntroStage;
  opening: boolean;
  reduced: boolean;
};

const clouds = [
  { className: "right-[2%] top-[9%] h-14 w-28 text-white/65 sm:h-20 sm:w-40", duration: 42, delay: -6 },
  { className: "left-[-4%] top-[19%] h-10 w-24 text-white/45 sm:h-14 sm:w-32", duration: 52, delay: -19 },
  { className: "right-[18%] top-[30%] h-8 w-20 text-lavender/60 sm:h-11 sm:w-28", duration: 58, delay: -31 },
  { className: "left-[28%] top-[5%] h-6 w-16 text-white/35 sm:h-9 sm:w-24", duration: 62, delay: -44 },
  { className: "left-[52%] top-[25%] h-7 w-20 text-white/30 sm:h-10 sm:w-24", duration: 55, delay: -27 },
];

const motes = (() => {
  const random = seeded(67);
  return Array.from({ length: 14 }, (_, id) => ({
    id,
    x: 3 + random() * 94,
    y: 30 + random() * 52,
    size: 1.5 + random() * 3,
    duration: 8 + random() * 8,
    delay: random() * -13,
    opacity: 0.2 + random() * 0.45,
  }));
})();

const petals = (() => {
  const random = seeded(113);
  const tones = ["#F3C9DC", "#FFF0B8", "#DCD5F5", "#FFDCCB", "#F6DCE7"];
  return Array.from({ length: 12 }, (_, id) => ({
    id,
    x: random() * 100,
    size: 5 + random() * 7,
    duration: 15 + random() * 12,
    delay: random() * -22,
    drift: (random() - 0.5) * 220,
    rotate: random() * 360,
    tone: tones[Math.floor(random() * tones.length)],
  }));
})();

const butterflies = [
  { top: "25%", size: "h-8 w-8 sm:h-11 sm:w-11", duration: 28, delay: -4 },
  { top: "38%", size: "h-6 w-6 sm:h-9 sm:w-9", duration: 34, delay: -16 },
  { top: "52%", size: "h-5 w-5 sm:h-8 sm:w-8", duration: 40, delay: -25 },
  { top: "17%", size: "h-5 w-5 sm:h-7 sm:w-7", duration: 36, delay: -11 },
  { top: "61%", size: "h-6 w-6 sm:h-8 sm:w-8", duration: 31, delay: -21 },
];

function parallax(depth: number): CSSProperties {
  return {
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${(
      depth * 0.55
    ).toFixed(2)}px), 0)`,
  };
}

function push(value: number, opacity = 1): CSSProperties {
  return {
    ["--push" as string]: value,
    ["--push-opacity" as string]: opacity,
  };
}

function MountainRange() {
  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      className="h-full w-full"
    >
      <path
        d="M0 352c150-74 264-24 420-94 150-68 244-150 382-118 126 30 218 118 322 128 120 12 214-52 316-34v286H0Z"
        fill="#B9B2D8"
        opacity=".38"
      />
      <path
        d="M0 412c176-70 300 10 470-44 160-50 260-132 414-100 140 30 226 108 338 106 88-2 148-34 218-30v176H0Z"
        fill="#A5ACCC"
        opacity=".34"
      />
      <path
        d="M0 468c196-46 336 20 528-8 206-30 332-84 512-52 148 26 258 60 400 36v76H0Z"
        fill="#F7E4D2"
        opacity=".55"
      />
    </svg>
  );
}

function MidGarden() {
  const treeClusters = [
    { x: 62, scale: 1 },
    { x: 148, scale: 0.72 },
    { x: 1312, scale: 0.9 },
    { x: 1392, scale: 1.15 },
  ];

  return (
    <svg
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      className="h-full w-full"
    >
      <g fill="#8C9C86" opacity=".42">
        {Array.from({ length: 16 }, (_, index) => {
          const x = 180 + index * 70 + (index % 3) * 12;
          const r = 18 + ((index * 13) % 22);
          const y = 238 - ((index * 29) % 44);
          return <circle key={index} cx={x} cy={y} r={r} />;
        })}
      </g>
      <path
        d="M0 238c180-60 320 14 500-14 200-30 330-84 512-56 156 24 268 70 428 46v206H0Z"
        fill="#A8BA9C"
        opacity=".55"
      />
      <g fill="#6F8267" opacity=".5">
        {treeClusters.map((tree, index) => (
          <g key={index} transform={`translate(${tree.x} 250) scale(${tree.scale})`}>
            <rect x="-4" y="0" width="8" height="96" rx="4" />
            <circle cx="0" cy="-18" r="40" />
            <circle cx="-30" cy="12" r="27" />
            <circle cx="30" cy="8" r="31" />
            <circle cx="-16" cy="-42" r="25" />
          </g>
        ))}
      </g>
      <path
        d="M0 298c200-48 350 18 544-8 210-28 340-58 516-28 140 24 248 44 380 24v134H0Z"
        fill="#93A888"
        opacity=".5"
      />
      <g stroke="#7E8F72" strokeWidth="1.5" strokeLinecap="round" opacity=".4">
        {Array.from({ length: 26 }, (_, index) => {
          const x = 30 + index * 54;
          const h = 22 + ((index * 17) % 34);
          return <path key={index} d={`M${x} 420c-6-${h} 6-${h + 10} -2-${h + 24}`} fill="none" />;
        })}
      </g>
      <path
        d="M0 352c220-26 366 16 560-2 220-20 352-36 520-12 140 20 240 18 360 6v76H0Z"
        fill="#C7D3BD"
        opacity=".72"
      />
      <g opacity=".75">
        {[
          [180, 330, "#F3C9DC"],
          [330, 348, "#FFF0B8"],
          [486, 326, "#DCD5F5"],
          [972, 340, "#FFDCCB"],
          [1128, 354, "#F3C9DC"],
          [1272, 328, "#FFF0B8"],
        ].map(([cx, cy, color], index) => (
          <g key={index}>
            <path d={`M${cx} 420V${Number(cy) + 14}`} stroke="#7E8F72" strokeWidth="1.3" opacity=".4" />
            <circle cx={Number(cx)} cy={Number(cy)} r="4" fill={String(color)} />
            <circle cx={Number(cx)} cy={Number(cy)} r="1.8" fill="#FFF9F0" opacity=".8" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function GatePath() {
  return (
    <svg
      viewBox="0 0 1440 440"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      className="h-full w-full blur-[1px]"
    >
      <path
        d="M618 440c44-118 66-196 77-268l5-172h40l5 172c11 72 33 150 77 268Z"
        fill="#FFF2DA"
        opacity=".62"
      />
      <path
        d="M655 440c30-108 46-178 54-244l3-196h16l3 196c8 66 24 136 54 244Z"
        fill="#FFFBF0"
        opacity=".65"
      />
      <g stroke="#A8BA9C" strokeWidth="1.6" strokeLinecap="round" opacity=".5">
        <path d="M596 440c-14-40-6-72 12-96M844 440c14-40 6-72-12-96M564 440c-8-30 2-52 16-68M876 440c8-30-2-52-16-68" fill="none" />
      </g>
      <ellipse cx="720" cy="430" rx="148" ry="30" fill="#FFF4DF" opacity=".5" />
    </svg>
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
      style={{ top, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <span className="garden-float block" style={{ animationDuration: "4.4s" }}>
        <span className="garden-flutter block">
          <Butterfly className={size} />
        </span>
      </span>
    </span>
  );
}

function ForegroundGarden() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <LeafSprig className="absolute -bottom-12 -left-14 h-52 w-52 rotate-[20deg] text-[#6F8267]/75 blur-[0.6px] garden-sway sm:h-72 sm:w-72" />
      <LeafSprig
        className="absolute -bottom-16 -right-16 h-56 w-56 -rotate-[26deg] text-[#7E8F72]/75 blur-[0.6px] garden-sway sm:h-80 sm:w-80"
        style={{ animationDelay: "-2.2s" }}
      />
      <LeafSprig
        className="absolute -left-20 top-[14%] h-48 w-48 -rotate-[58deg] text-[#6F8267]/45 blur-[2px] garden-sway sm:h-64 sm:w-64"
        style={{ animationDelay: "-4s", animationDuration: "9s" }}
      />
      <LeafSprig
        className="absolute -right-20 top-[24%] h-44 w-44 rotate-[62deg] text-[#7E8F72]/40 blur-[2px] garden-sway sm:h-60 sm:w-60"
        style={{ animationDelay: "-1.2s", animationDuration: "10s" }}
      />
      <Flower
        className="absolute -bottom-7 left-[1%] h-20 w-20 garden-sway sm:h-28 sm:w-28"
        style={{
          ["--flower-petal" as string]: "#F3C9DC",
          ["--flower-center" as string]: "#FFF0B8",
          animationDuration: "7.5s",
        }}
      />
      <Flower
        className="absolute -bottom-9 right-[2%] h-24 w-24 garden-sway sm:h-32 sm:w-32"
        style={{
          ["--flower-petal" as string]: "#DCD5F5",
          ["--flower-center" as string]: "#C98EA8",
          animationDuration: "8.5s",
          animationDelay: "-2.4s",
        }}
      />
      <TinyFlower className="absolute bottom-[13%] left-[7%] h-8 w-8 text-rose/60 garden-sway" />
      <TinyFlower
        className="absolute bottom-[19%] right-[9%] h-7 w-7 text-lavender-deep/60 garden-sway"
        style={{ animationDelay: "-1.6s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_48%,rgba(47,31,46,.24)_100%)]" />
    </div>
  );
}

export function IntroScenery({ stage, opening, reduced }: IntroSceneryProps) {
  const bloom = stage >= INTRO_STAGE.gate;
  const gateVisible = stage >= INTRO_STAGE.gate;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="intro-sky absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_78%,rgba(255,249,232,.9),transparent_62%)]" />

      <div className="intro-depth z-[1]" data-open={opening || undefined} style={push(1.12, 0.5)}>
        <div className="absolute inset-0" style={parallax(4)}>
          {clouds.map((cloud, index) => (
            <Cloud
              key={index}
              className={cn("garden-cloud absolute", cloud.className)}
              style={{ animationDuration: `${cloud.duration}s`, animationDelay: `${cloud.delay}s` }}
            />
          ))}
          <div className="absolute inset-x-[-10%] top-[22%] h-24 rounded-[100%] bg-[linear-gradient(180deg,rgba(255,255,255,.3),transparent)] blur-2xl" />
        </div>
      </div>

      <div className="intro-depth z-[2]" data-open={opening || undefined} style={push(1.2, 0.3)}>
        <div className="absolute inset-x-0 bottom-0 h-[64%]" style={parallax(6)}>
          <MountainRange />
        </div>
      </div>

      <div className="intro-depth z-[3]" data-open={opening || undefined} style={push(1.45, 0.7)}>
        <div className="absolute inset-x-0 bottom-0 h-[58%]" style={parallax(10)}>
          <MidGarden />
        </div>
      </div>

      <div className="intro-depth z-[4]" data-open={opening || undefined} style={push(1.55, 0.2)}>
        <div className="absolute inset-x-0 bottom-0 h-[56%]" style={parallax(12)}>
          <GatePath />
        </div>
      </div>

      <div className="intro-depth z-[6]" data-open={opening || undefined} style={push(1.3, 0)}>
        <div className="absolute inset-0" style={parallax(8)}>
          <div className="intro-fog absolute inset-x-[-12%] top-[46%] h-[15%]" />
          <div
            className="intro-fog absolute inset-x-[-16%] top-[60%] h-[16%]"
            style={{ animationDelay: "-9s", animationDuration: "32s" }}
          />
          <div
            className="intro-fog absolute inset-x-[-14%] top-[73%] h-[18%]"
            style={{ animationDelay: "-17s", animationDuration: "38s" }}
          />
        </div>
      </div>

      <div className="intro-depth z-[10]" data-open={opening || undefined} style={push(2.6, 1)}>
        <div className="absolute inset-0" style={parallax(16)}>
          <div data-intro-gate className="intro-gate-frame">
            <motion.div
              initial={false}
              animate={
                gateVisible
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0.55, y: 18, scale: 0.84, filter: "blur(3px)" }
              }
              transition={{
                duration: reduced ? 0.01 : 2.6,
                ease: EASE_ENTER,
              }}
              className="h-full w-full"
            >
              <GateArt bloom={bloom} opening={opening} reduced={reduced} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="intro-depth z-[12]" data-open={opening || undefined} style={push(1.9, 0)}>
        <div className="absolute inset-0" style={parallax(14)}>
          {butterflies.map((butterfly, index) => (
            <FlutteringButterfly
              key={index}
              top={butterfly.top}
              size={butterfly.size}
              duration={butterfly.duration}
              delay={butterfly.delay}
              className={index >= 3 ? "hidden sm:block" : undefined}
            />
          ))}
          {motes.map((mote) => (
            <span
              key={mote.id}
              className={cn(
                "garden-mote absolute rounded-full bg-cream/85 shadow-[0_0_10px_rgba(255,249,240,.9)]",
                mote.id % 3 === 0 && "hidden sm:block",
              )}
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
              key={petal.id}
              className={cn(
                "garden-petal absolute top-0 block rounded-[100%_0_100%_0]",
                petal.id % 2 === 1 && "hidden sm:block",
              )}
              style={{
                left: `${petal.x}%`,
                width: petal.size,
                height: petal.size * 0.72,
                background: petal.tone,
                opacity: 0.75,
                transform: `rotate(${petal.rotate}deg)`,
                animationDuration: `${petal.duration}s`,
                animationDelay: `${petal.delay}s`,
                ["--drift" as string]: `${petal.drift}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="intro-depth z-[20]" data-open={opening || undefined} style={push(4.2, 0)}>
        <div className="absolute inset-0" style={parallax(26)}>
          <ForegroundGarden />
        </div>
      </div>
    </div>
  );
}
