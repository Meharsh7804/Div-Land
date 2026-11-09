"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { StorybookHeading } from "@/components/common/StorybookHeading";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import {
  Bow,
  CoffeeCup,
  Flower,
  Heart as HeartArt,
  Sparkle,
  Star4,
  TinyFlower,
} from "@/components/common/Illustrations";
import {
  filesCopy,
  personalities,
  type PersonalityMode,
} from "@/data/personality";
import { EASE_ENTER } from "@/animations/motion";
import { clamp, cn } from "@/lib/utils";
import { MineDivya, WorldDivya } from "./DivyaCharacters";

function PublicSkyline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 720 300"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[46%] w-full"
    >
      <path d="M0 244h720v56H0Z" fill="#AEBEE8" opacity=".34" />
      <g fill="#9EB1E0" opacity=".4">
        <rect x="24" y="158" width="58" height="128" rx="5" />
        <rect x="100" y="192" width="42" height="94" rx="4" />
        <rect x="158" y="132" width="68" height="154" rx="6" />
        <rect x="244" y="176" width="48" height="110" rx="4" />
        <rect x="314" y="104" width="74" height="182" rx="7" />
        <rect x="408" y="164" width="54" height="122" rx="5" />
        <rect x="484" y="138" width="72" height="148" rx="6" />
        <rect x="576" y="188" width="46" height="98" rx="4" />
        <rect x="640" y="152" width="56" height="134" rx="5" />
      </g>
      <g fill="#FFF9F0" opacity=".62">
        {[40, 58, 114, 172, 200, 258, 330, 352, 424, 498, 524, 592, 656].map(
          (x, index) => (
            <rect
              key={x}
              x={x}
              y={174 + (index % 3) * 24}
              width="7"
              height="10"
              rx="1.5"
            />
          ),
        )}
      </g>
    </svg>
  );
}

function PublicScene({ active, shift }: { active: boolean; shift: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(155deg,#F1F5FF_0%,#DDE4FB_42%,#C3CCF2_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${shift}px)` }}
      >
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#C7D8FF]/60 blur-3xl" />
        <div className="absolute right-[9%] top-[9%] h-24 w-24 rounded-full border border-[#AFC0EA]/60 bg-[#EEF4FF]/60 shadow-[0_0_80px_30px_rgba(210,226,255,.55)] sm:h-36 sm:w-36">
          <span className="absolute inset-3 rounded-full border border-dashed border-[#AFC0EA]/45" />
          <Star4 className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-[#829BD6] garden-twinkle" />
        </div>
        <div className="absolute -left-10 top-0 h-full w-[74%] bg-[linear-gradient(115deg,rgba(255,255,255,.45),transparent_58%)] [clip-path:polygon(0_0,36%_0,92%_100%,0_100%)]" />
        <div className="absolute right-[18%] top-[27%] h-[48%] w-[26%] rounded-t-[999px] border border-[#AFC0EA]/45 bg-white/20 backdrop-blur-[1px]" />
        <div className="absolute right-[22%] top-[32%] h-[38%] w-[18%] rounded-t-[999px] border border-white/60" />
        <PublicSkyline />
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(0deg,rgba(167,187,230,.45),transparent)]" />
        <Sparkle
          className="absolute right-[30%] top-[18%] h-4 w-4 text-white/80 garden-twinkle"
          style={{ animationDelay: "1.2s" }}
        />
        <Star4
          className="absolute left-[24%] top-[28%] h-3 w-3 text-[#829BD6]/70 garden-twinkle"
          style={{ animationDelay: ".5s" }}
        />
        <TinyFlower className="absolute bottom-[18%] right-[7%] h-7 w-7 text-[#9EB1E0]/75 garden-sway" />
        <div className="absolute bottom-[7.5%] left-[3%] h-px w-[46%] bg-[#AFC0EA]/40" />
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-[3%] w-[48%] max-w-[16.5rem] transition-all duration-700 sm:left-[6%] sm:w-[42%]",
          active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90",
        )}
      >
        <WorldDivya active={active} />
      </div>
    </div>
  );
}

function FairyLights() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 280 120"
      className="absolute left-[5%] top-0 h-28 w-[55%] sm:w-[48%]"
    >
      <path
        d="M4 8c36 52 84 62 132 42 42-18 80-14 140 18"
        fill="none"
        stroke="#B0708C"
        strokeWidth="1.2"
        opacity=".45"
      />
      {[
        [26, 36, "#FFF0B8"],
        [70, 55, "#F6DCE7"],
        [112, 58, "#FFF0B8"],
        [154, 48, "#FFDCCB"],
        [200, 46, "#FFF0B8"],
        [234, 58, "#F6DCE7"],
      ].map(([cx, cy, fill], index) => (
        <g key={cx}>
          <circle
            cx={cx}
            cy={cy}
            r="4"
            fill={String(fill)}
            className="garden-twinkle"
            style={{ animationDelay: `${index * 0.3}s` }}
          />
          <circle cx={Number(cx)} cy={Number(cy)} r="8" fill={String(fill)} opacity=".16" />
        </g>
      ))}
    </svg>
  );
}

function OffDutyScene({ active, shift }: { active: boolean; shift: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(155deg,#FFF6DA_0%,#FFE4D2_44%,#F5D5E3_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${shift}px)` }}
      >
        <div className="absolute -left-16 top-[6%] h-64 w-64 rounded-full bg-peach/70 blur-3xl" />
        <div className="absolute left-[6%] top-[9%] h-[34%] w-[30%] overflow-hidden rounded-[999px_999px_0.9rem_0.9rem] border-[3px] border-[#F3D9C8]/80 bg-[linear-gradient(180deg,#FFE9B8_0%,#FFCBB4_55%,#F6C9D9_100%)] shadow-[inset_0_0_26px_rgba(255,249,240,.5)]">
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#F3D9C8]/80" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-[#F3D9C8]/80" />
          <div className="absolute bottom-[-14%] left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-[#FFF0B8] shadow-[0_0_44px_20px_rgba(255,240,184,.65)]" />
        </div>
        <div className="absolute left-[3%] top-[7%] h-[45%] w-[5%] rounded-full bg-[#F6DCE7]/85" />
        <div className="absolute left-[32%] top-[7%] h-[41%] w-[4%] rounded-full bg-[#F6DCE7]/65" />
        <FairyLights />
        <div className="absolute bottom-[6%] right-[3%] h-24 w-44 rounded-[50%] border border-rose/15 bg-[#FFC9B5]/70 shadow-[inset_0_10px_20px_rgba(255,249,240,.5)] sm:h-28 sm:w-52" />
        <div className="absolute bottom-[1%] right-[18%] h-20 w-36 rounded-[50%] border border-rose/15 bg-[#F6DCE7]/85 shadow-[inset_0_10px_20px_rgba(255,249,240,.55)] sm:h-24 sm:w-44" />
        <div className="absolute bottom-[17%] right-[6%] h-16 w-24 rounded-[45%] bg-[#FFE6B8]/80" />
        <Bow className="absolute left-[4%] top-[38%] h-12 w-12 -rotate-12 garden-float sm:h-16 sm:w-16" />
        <CoffeeCup className="absolute bottom-[30%] left-[10%] h-10 w-10 garden-float sm:h-14 sm:w-14" />
        <HeartArt
          className="absolute left-[34%] top-[16%] h-5 w-5 text-rose/50 garden-float sm:h-7 sm:w-7"
          style={{ animationDuration: "7s" }}
        />
        <TinyFlower
          className="absolute bottom-[22%] left-[24%] h-7 w-7 text-peach garden-sway"
          style={{ animationDelay: "-1.4s" }}
        />
        <Sparkle
          className="absolute right-[30%] top-[10%] h-4 w-4 text-butter garden-twinkle"
          style={{ animationDelay: ".6s" }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(0deg,rgba(229,183,196,.32),transparent)]" />
      <div
        className={cn(
          "absolute bottom-0 right-[3%] w-[50%] max-w-[17rem] transition-all duration-700 sm:right-[6%] sm:w-[44%]",
          active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90",
        )}
      >
        <MineDivya active={active} />
      </div>
    </div>
  );
}

export function PersonalityFiles() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pointerActive = useRef(false);
  const audio = useAudioExperience();

  const mode: PersonalityMode = position >= 50 ? "world" : "mine";
  const active = personalities[mode];
  const previousMode = useRef<PersonalityMode>(mode);
  const publicShift = (50 - position) * 0.6;
  const warmShift = (position - 50) * 0.6;

  useEffect(() => {
    if (previousMode.current === mode) return;
    previousMode.current = mode;
    audio.playSfx("page");
  }, [audio, mode]);

  const moveTo = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = clamp(((clientX - rect.left) / rect.width) * 100, 6, 94);
    setPosition(next);
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    pointerActive.current = true;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerActive.current) return;
    moveTo(event.clientX);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    pointerActive.current = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 14 : 6;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((value) => clamp(value - step, 6, 94));
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((value) => clamp(value + step, 6, 94));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(6);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(94);
    }
  };

  const chooseMode = (next: PersonalityMode) => {
    setPosition(next === "world" ? 82 : 18);
  };

  return (
    <section
      id="chapter-files"
      aria-labelledby="files-title"
      className="story-scene bg-[radial-gradient(ellipse_at_50%_18%,#FFF9F0_0%,#F7E9EF_46%,#EFE3F0_100%)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-lavender/45 blur-3xl" />
        <div className="absolute bottom-[12%] right-[6%] h-48 w-48 rounded-full bg-peach/45 blur-3xl" />
        <Flower className="absolute left-[7%] top-[26%] h-8 w-8 opacity-55 garden-sway" />
        <Flower
          className="absolute bottom-[18%] right-[9%] h-6 w-6 opacity-45 garden-sway"
          style={{ animationDelay: "-1.8s" }}
        />
        <Star4 className="absolute right-[19%] top-[15%] h-3.5 w-3.5 text-butter garden-twinkle" />
      </div>

      <div className="section-shell relative">
        <StorybookHeading
          id="files-title"
          number="02"
          label={filesCopy.eyebrow}
          title={
            <>
              One person.{" "}
              <span className="italic text-rose-deep">Two settings.</span>
            </>
          }
        />

        <div className="mx-auto mt-7 w-full max-w-[60rem] sm:mt-9">
          <div
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
            className="group relative h-[23rem] touch-pan-y select-none overflow-hidden rounded-[1.6rem] border border-plum/12 bg-cream shadow-[0_40px_84px_-42px_rgba(47,31,46,.62)] sm:h-[30rem] sm:rounded-[2rem] lg:h-[33rem]"
          >
            <OffDutyScene active={mode === "mine"} shift={warmShift} />

            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <PublicScene active={mode === "world"} shift={publicShift} />
            </div>

            <span
              className={cn(
                "pointer-events-none absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.52rem] font-extrabold uppercase tracking-[0.2em] backdrop-blur transition-all duration-300 sm:left-5 sm:top-5 sm:text-[0.58rem]",
                mode === "world"
                  ? "border-[#8EA5DA]/45 bg-white/65 text-[#4F639B]"
                  : "border-[#8EA5DA]/20 bg-white/35 text-[#5B6FA8]/60",
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#7E96D2]" />
              {personalities.world.tab}
            </span>

            <span
              className={cn(
                "pointer-events-none absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.52rem] font-extrabold uppercase tracking-[0.2em] backdrop-blur transition-all duration-300 sm:right-5 sm:top-5 sm:text-[0.58rem]",
                mode === "mine"
                  ? "border-rose/45 bg-white/65 text-rose-deep"
                  : "border-rose/20 bg-white/35 text-rose-deep/55",
              )}
            >
              {personalities.mine.tab}
              <span className="h-1.5 w-1.5 rounded-full bg-rose" />
            </span>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,249,240,.95)_10%,rgba(73,51,72,.38)_50%,rgba(255,249,240,.95)_90%,transparent)]"
              style={{ left: `${position}%` }}
            />

            <div
              className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${position}%` }}
            >
              <div
                role="slider"
                tabIndex={0}
                aria-label="Scrub between public Divya and off-duty Sonu"
                aria-valuemin={6}
                aria-valuemax={94}
                aria-valuenow={Math.round(position)}
                aria-valuetext={`${active.tab}: ${active.caption}`}
                onKeyDown={handleKeyDown}
                className={cn(
                  "pointer-events-auto flex h-14 w-14 cursor-ew-resize touch-none items-center justify-center rounded-full border border-plum/15 bg-cream/95 text-plum/65 shadow-[0_14px_32px_-14px_rgba(47,31,46,.7)] outline-none backdrop-blur transition-transform duration-200",
                  dragging ? "scale-110" : "group-hover:scale-105",
                )}
              >
                <span className="flex items-center gap-1">
                  <span className="text-[0.72rem]">‹</span>
                  <Sparkle className="h-4 w-4 text-rose-deep/80" />
                  <span className="text-[0.72rem]">›</span>
                </span>
                <span className="absolute inset-0 rounded-full border border-cream/50" />
                <span
                  className={cn(
                    "absolute inset-[-6px] rounded-full border border-rose/30 transition-opacity duration-300",
                    dragging ? "opacity-100" : "opacity-0",
                  )}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-[linear-gradient(0deg,rgba(47,31,46,.14),transparent)]" />
          </div>

          <div className="mx-auto mt-4 max-w-[44rem]">
            <div className="flex items-center justify-between gap-2 px-1">
              <button
                type="button"
                onClick={() => chooseMode("world")}
                aria-pressed={mode === "world"}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[0.54rem] font-extrabold uppercase tracking-[0.18em] transition-all sm:text-[0.58rem]",
                  mode === "world"
                    ? "border-[#8EA5DA]/50 bg-[#E9EEFC] text-[#4F639B]"
                    : "border-plum/12 bg-cream/40 text-plum/45 hover:bg-cream/80",
                )}
              >
                {personalities.world.short}
              </button>
              <span className="hand shrink-0 text-[0.98rem] text-rose-deep/65 sm:text-[1.05rem]">
                {filesCopy.hint}
              </span>
              <button
                type="button"
                onClick={() => chooseMode("mine")}
                aria-pressed={mode === "mine"}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[0.54rem] font-extrabold uppercase tracking-[0.18em] transition-all sm:text-[0.58rem]",
                  mode === "mine"
                    ? "border-rose/50 bg-[#FBE7EF] text-rose-deep"
                    : "border-plum/12 bg-cream/40 text-plum/45 hover:bg-cream/80",
                )}
              >
                {personalities.mine.short}
              </button>
            </div>
          </div>

          <div className="mt-3 flex min-h-[4.25rem] items-center justify-center px-3 text-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_ENTER }}
              >
                <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.24em] text-plum/40">
                  {active.kicker}
                </p>
                <p className="mt-1 font-display text-[clamp(1.18rem,4.2vw,1.7rem)] italic leading-tight text-plum/85">
                  {active.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2 pb-1">
            <span className="h-px w-8 bg-plum/12" />
            <HeartArt className="h-3 w-3 text-rose-deep/65" />
            <p className="hand text-[1.15rem] text-plum/65 sm:text-[1.3rem]">
              {filesCopy.footer}
            </p>
            <HeartArt className="h-3 w-3 text-rose-deep/65" />
            <span className="h-px w-8 bg-plum/12" />
          </div>
        </div>
      </div>
    </section>
  );
}
