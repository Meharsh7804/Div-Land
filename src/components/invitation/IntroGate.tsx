"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Butterfly,
  Cloud,
  Flower,
  Heart,
  Sparkle,
  Star4,
  TinyFlower,
} from "@/components/common/Illustrations";
import { PetalRain, SparkleField } from "@/components/common/Ambient";
import { DUR, EASE_ENTER } from "@/animations/motion";
import { site } from "@/data/site";

type IntroGateProps = {
  onEnter: () => void;
  reduced: boolean;
};

const flowerRow = [
  { x: 34, h: 168, tone: "#F6DCE7", center: "#FFF0B8", tilt: -8 },
  { x: 96, h: 118, tone: "#DCD5F5", center: "#FFF9F0", tilt: 6 },
  { x: 158, h: 196, tone: "#FFDCCB", center: "#C98EA8", tilt: -4 },
  { x: 226, h: 138, tone: "#FFF0B8", center: "#C98EA8", tilt: 9 },
  { x: 300, h: 176, tone: "#F6DCE7", center: "#FFF9F0", tilt: -6 },
  { x: 372, h: 112, tone: "#DCD5F5", center: "#FFF0B8", tilt: 4 },
  { x: 452, h: 190, tone: "#FFDCCB", center: "#FFF9F0", tilt: -3 },
  { x: 526, h: 132, tone: "#FFF0B8", center: "#C98EA8", tilt: 7 },
  { x: 598, h: 182, tone: "#F6DCE7", center: "#FFF0B8", tilt: -7 },
  { x: 668, h: 124, tone: "#DCD5F5", center: "#FFF9F0", tilt: 5 },
  { x: 742, h: 200, tone: "#FFDCCB", center: "#C98EA8", tilt: -5 },
  { x: 814, h: 144, tone: "#FFF0B8", center: "#FFF9F0", tilt: 8 },
  { x: 872, h: 172, tone: "#F6DCE7", center: "#C98EA8", tilt: -9 },
];

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

function GardenBorder() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 320"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] max-h-[340px] w-full"
    >
      <path
        d="M0 250c120-30 210 8 330-10s210-42 330-16 170 14 240 2v94H0Z"
        fill="#C7D3BD"
        opacity=".55"
      />
      <path
        d="M0 282c150-24 240 14 380-6s250-30 360-6 120 14 160 8v42H0Z"
        fill="#F6DCE7"
        opacity=".8"
      />
      {flowerRow.map((f, i) => (
        <g key={i} transform={`rotate(${f.tilt} ${f.x} 300)`}>
          <path
            d={`M${f.x} 320 C ${f.x - 12} 280, ${f.x + 16} 250, ${f.x} ${320 - f.h}`}
            stroke="#7E8F72"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity=".75"
          />
          <ellipse
            cx={f.x + 14}
            cy={320 - f.h * 0.45}
            rx="17"
            ry="7"
            fill="#A9B99E"
            transform={`rotate(-32 ${f.x + 14} ${320 - f.h * 0.45})`}
            opacity=".8"
          />
          <ellipse
            cx={f.x - 13}
            cy={320 - f.h * 0.62}
            rx="14"
            ry="6"
            fill="#7E8F72"
            transform={`rotate(30 ${f.x - 13} ${320 - f.h * 0.62})`}
            opacity=".65"
          />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx={f.x}
              cy={320 - f.h - 9}
              rx="8.5"
              ry="14"
              fill={f.tone}
              transform={`rotate(${deg} ${f.x} ${320 - f.h})`}
              opacity=".95"
            />
          ))}
          <circle cx={f.x} cy={320 - f.h} r="6.5" fill={f.center} />
          <circle cx={f.x} cy={320 - f.h} r="2.2" fill="#C98EA8" opacity=".6" />
        </g>
      ))}
      {Array.from({ length: 34 }).map((_, i) => {
        const x = 18 + i * 27;
        const h = 16 + ((i * 37) % 40);
        return (
          <path
            key={i}
            d={`M${x} 320 Q ${x + (i % 2 === 0 ? 8 : -8)} ${320 - h * 0.6} ${x + (i % 2 === 0 ? 12 : -12)} ${320 - h}`}
            stroke="#7E8F72"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            opacity=".55"
          />
        );
      })}
    </svg>
  );
}

function GardenGate({
  opening,
  onOpen,
}: {
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={opening}
      aria-label="Enter your world — open the garden gate"
      className="group relative mx-auto mt-7 flex w-full max-w-[20rem] flex-col items-center gap-4 rounded-[1.8rem] px-4 py-3 transition-transform duration-300 focus-visible:outline-offset-8 active:scale-[0.985] disabled:cursor-default"
    >
      <span className="relative block h-[9.2rem] w-[13.8rem] [perspective:900px] sm:h-[10.6rem] sm:w-[16.2rem]">
        <span
          aria-hidden
          className="absolute -inset-7 rounded-full bg-butter/45 blur-2xl transition-opacity duration-700 group-hover:opacity-90"
        />

        <span
          aria-hidden
          className="absolute inset-x-[9%] bottom-0 top-[7%] overflow-hidden rounded-t-[999px] border border-plum/15 bg-[radial-gradient(ellipse_at_50%_78%,#FFF9F0_0%,#FFF0B8_42%,#F6DCE7_78%,#DCD5F5_100%)] shadow-[inset_0_0_30px_rgba(73,51,72,.16)]"
        >
          <span className="absolute left-1/2 top-[22%] h-12 w-12 -translate-x-1/2 rounded-full bg-gradient-to-br from-butter to-peach shadow-[0_0_38px_18px_rgba(255,240,184,.55)] sm:h-16 sm:w-16" />
          <Sparkle className="absolute left-[18%] top-[38%] h-4 w-4 text-cream/90 anim-twinkle" />
          <Star4 className="absolute right-[20%] top-[30%] h-3 w-3 text-rose/70 anim-twinkle" style={{ animationDelay: ".9s" }} />
          <span className="absolute bottom-0 left-1/2 h-[38%] w-[46%] -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,249,240,.85))]" />
          <span className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-[#A9B99E]/45 to-transparent" />
        </span>

        <span
          aria-hidden
          className={`absolute inset-y-0 left-0 z-[2] w-1/2 origin-left overflow-hidden rounded-tl-[999px] border-r border-plum/25 bg-[linear-gradient(145deg,#FFE4CF,#F6DCE7_54%,#E8C7D5)] shadow-[inset_-8px_0_16px_rgba(73,51,72,.08)] transition-transform duration-700 [backface-visibility:hidden] [transform-style:preserve-3d] ${
            opening ? "[transform:rotateY(-82deg)]" : "[transform:rotateY(0deg)]"
          }`}
        >
          <span className="absolute inset-x-3 top-[24%] h-px bg-plum/15" />
          <span className="absolute inset-x-3 top-[48%] h-px bg-plum/15" />
          <span className="absolute inset-x-3 top-[72%] h-px bg-plum/15" />
          <span className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-butter/70 bg-butter shadow-sm" />
          <Flower className="absolute bottom-4 left-3 h-5 w-5 text-rose/60" />
        </span>

        <span
          aria-hidden
          className={`absolute inset-y-0 right-0 z-[2] w-1/2 origin-right overflow-hidden rounded-tr-[999px] border-l border-plum/25 bg-[linear-gradient(215deg,#FFE4CF,#F6DCE7_54%,#E8C7D5)] shadow-[inset_8px_0_16px_rgba(73,51,72,.08)] transition-transform duration-700 [backface-visibility:hidden] [transform-style:preserve-3d] ${
            opening ? "[transform:rotateY(82deg)]" : "[transform:rotateY(0deg)]"
          }`}
        >
          <span className="absolute inset-x-3 top-[24%] h-px bg-plum/15" />
          <span className="absolute inset-x-3 top-[48%] h-px bg-plum/15" />
          <span className="absolute inset-x-3 top-[72%] h-px bg-plum/15" />
          <span className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-butter/70 bg-butter shadow-sm" />
          <TinyFlower className="absolute bottom-4 right-3 h-5 w-5 text-lavender-deep/70" />
        </span>

        <span className="absolute inset-x-[6%] -top-1 h-3 rounded-full border border-butter/60 bg-butter/35" />
        <Flower
          className={`absolute -right-7 -top-5 z-[5] h-10 w-10 transition-transform duration-700 ${
            opening ? "translate-y-2 rotate-45 opacity-0" : "anim-sway"
          }`}
        />
        <Star4
          aria-hidden
          className={`absolute -left-4 top-7 h-3.5 w-3.5 text-butter transition-opacity duration-500 ${
            opening ? "opacity-0" : "anim-twinkle"
          }`}
        />
        <span className="absolute inset-x-[2%] bottom-0 h-2 rounded-full bg-plum/20" />
      </span>

      <span
        className={`btn-magic mt-1 w-full max-w-[17.5rem] text-[0.92rem] transition-opacity duration-300 ${
          opening ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Sparkle className="h-4 w-4 text-butter" />
        Enter your world
        <ArrowDoodle className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

export function IntroGate({ onEnter, reduced }: IntroGateProps) {
  const [phaseState, setPhase] = useState(0);
  const phase = reduced ? 3 : phaseState;
  const [opening, setOpening] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const enterTimeout = useRef<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) return;
    const schedule: [number, number][] = [
      [1250, 1],
      [2050, 2],
      [2850, 3],
    ];
    timers.current = schedule.map(([delay, value]) =>
      window.setTimeout(() => setPhase(value), delay),
    );
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      if (enterTimeout.current) window.clearTimeout(enterTimeout.current);
    };
  }, [reduced]);

  useEffect(() => {
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
  }, []);

  const handleEnter = () => {
    if (opening) return;
    setOpening(true);
    enterTimeout.current = window.setTimeout(() => onEnter(), reduced ? 320 : 1250);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Divya Land"
      className="fixed inset-0 z-[80] overflow-hidden bg-gradient-to-b from-lavender via-blush to-[#FFF6DF]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
      transition={{ duration: DUR.wide, ease: EASE_ENTER }}
    >
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[75] h-2 bg-plum/85" />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[75] h-2 bg-plum/85" />

      <div
        ref={sceneRef}
        className="relative flex h-full w-full flex-col overflow-y-auto overscroll-contain"
        style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}
      >
        {/* sky */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full bg-butter/55 blur-3xl" />
          <div className="absolute right-[-10%] top-[12%] h-72 w-72 rounded-full bg-peach/50 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(255,255,255,.6),transparent_60%)]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-lavender/90 to-transparent" />
          <SparkleField count={20} seed={5} tone="text-cream" className="opacity-80" />
          <PetalRain count={13} seed={21} className="opacity-80" />
        </div>

        {/* sun + clouds */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            transform: "translate3d(calc(var(--px) * 6px), calc(var(--py) * 4px), 0)",
          }}
        >
          <div className="absolute left-[8%] top-[12%] h-28 w-28 rounded-full bg-gradient-to-br from-butter to-peach opacity-80 shadow-[0_0_90px_40px_rgba(255,240,184,.55)] sm:h-36 sm:w-36" />
          <Cloud className="absolute right-[4%] top-[10%] h-16 w-28 text-cream/80 anim-drift sm:h-24 sm:w-40" />
          <Cloud
            className="absolute left-[-2%] top-[26%] h-12 w-24 text-lavender-deep/60 anim-drift"
            style={{ animationDuration: "24s", animationDelay: "-6s" }}
          />
          <Cloud
            className="absolute right-[14%] top-[38%] h-10 w-20 text-white/60 anim-drift"
            style={{ animationDuration: "30s", animationDelay: "-14s" }}
          />
        </div>

        {/* butterflies */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Butterfly
            className="absolute left-[6%] top-[34%] h-10 w-10 anim-float sm:h-14 sm:w-14"
            style={{
              animationDuration: "7s",
              transform: "translate3d(calc(var(--px) * -14px), calc(var(--py) * -8px), 0)",
            }}
          />
          <Butterfly
            className="absolute right-[8%] top-[28%] h-8 w-8 anim-float sm:h-12 sm:w-12"
            style={{
              animationDuration: "9s",
              animationDelay: "-2s",
              transform: "translate3d(calc(var(--px) * 20px), calc(var(--py) * 12px), 0)",
            }}
          />
          <Butterfly
            className="absolute right-[18%] top-[52%] hidden h-10 w-10 anim-float sm:block"
            style={{ animationDuration: "8s", animationDelay: "-4s" }}
          />
        </div>

        <GardenBorder />

        {/* loading curtain */}
        <AnimatePresence>
          {phase === 0 ? (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-lavender via-blush to-[#FFF6DF] px-6 text-center"
            >
              <div className="relative flex h-24 w-24 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-rose/30 anim-spin-slow" />
                <span className="absolute inset-2 rounded-full border border-dashed border-rose/40" />
                <Sparkle className="h-10 w-10 text-rose-deep anim-breathe" />
                <Star4 className="absolute -right-2 top-2 h-4 w-4 text-butter anim-twinkle" />
                <Star4
                  className="absolute -left-1 bottom-3 h-3 w-3 text-lavender-deep anim-twinkle"
                  style={{ animationDelay: ".8s" }}
                />
              </div>
              <div className="max-w-xs">
                <p className="hand text-2xl text-plum">your world is waking up&hellip;</p>
                <p className="mt-2 text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-plum/55">
                  threading stars · brewing coffee · arranging flowers
                </p>
                <div className="mx-auto mt-5 h-1 w-44 overflow-hidden rounded-full bg-plum/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-rose via-rose-deep to-plum"
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.15, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* content */}
        <div className="relative z-20 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-4 pb-24 pt-10 text-center sm:pb-16 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : -8 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 rounded-full border border-plum/10 bg-cream/45 px-3.5 py-1.5"
          >
            <Heart className="h-3 w-3 text-rose-deep" />
            <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.28em] text-plum/70">
              a world with your name on it
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 14 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="hand mt-5 max-w-[20rem] text-[1.45rem] leading-tight text-plum/80 sm:max-w-md sm:text-[1.7rem]"
          >
            &ldquo;{site.quote}&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
            animate={{
              opacity: phase >= 2 ? 1 : 0,
              y: phase >= 2 ? 0 : 22,
              filter: phase >= 2 ? "blur(0px)" : "blur(10px)",
            }}
            transition={{ duration: DUR.wide, ease: EASE_ENTER }}
            className="mt-4 flex flex-col items-center"
          >
            <div className="relative">
              <motion.h1
                aria-label="Divya Land"
                initial={{ opacity: 0, y: 18 }}
                animate={
                  phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                }
                transition={{ duration: DUR.wide, ease: EASE_ENTER }}
                className="display-title text-[clamp(2.85rem,14vw,6.4rem)] font-semibold uppercase leading-[0.9] tracking-[0.12em] text-plum"
              >
                Divya{" "}
                <span
                  aria-hidden
                  className="mx-1.5 inline-block -translate-y-2 align-middle text-rose-deep sm:mx-3"
                >
                  <Flower className="h-[0.45em] w-[0.45em] anim-sway" />
                </span>{" "}
                Land
              </motion.h1>
              <Star4 className="absolute -right-4 -top-3 h-4 w-4 text-rose-deep anim-twinkle sm:-right-8 sm:h-6 sm:w-6" />
              <Star4
                className="absolute -left-4 bottom-0 h-3 w-3 text-plum/50 anim-twinkle"
                style={{ animationDelay: "1.4s" }}
              />
            </div>
            <p className="mt-3 font-display text-[1.15rem] italic text-plum/80 sm:text-[1.45rem]">
              {site.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 24 }}
            transition={{ duration: DUR.wide, ease: EASE_ENTER }}
            inert={phase < 3}
            className={phase < 3 ? "pointer-events-none w-full" : "w-full"}
          >
            <GardenGate opening={opening} onOpen={handleEnter} />
            <p className="mx-auto mt-1 max-w-[17rem] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-plum/45">
              tap the gate · sound is optional · feels are not
            </p>
          </motion.div>
        </div>

        {/* footer + skip */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 px-4 pb-4 sm:px-6 sm:pb-6">
          <p className="hand pointer-events-none text-base text-plum/55 sm:text-lg">
            built with too much spare time &amp; a questionable amount of coffee
          </p>
          {phase < 3 ? (
            <button
              type="button"
              onClick={() => setPhase(3)}
              className="pointer-events-auto min-h-11 rounded-full border border-plum/15 bg-cream/50 px-4 text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-plum/65 transition-colors hover:bg-cream/80"
            >
              skip the suspense
            </button>
          ) : (
            <span className="pointer-events-none flex items-center gap-1.5 text-[0.64rem] font-extrabold uppercase tracking-[0.22em] text-plum/40">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              divya land · est. 2026
            </span>
          )}
        </div>

        {/* opening bloom */}
        <AnimatePresence>
          {opening ? (
            <motion.div
              key="bloom"
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 0.95, 0], scale: 2.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.25, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFF9F0_0%,#FFF0B8_35%,transparent_70%)]"
            />
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
