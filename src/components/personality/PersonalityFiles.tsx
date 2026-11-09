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
  LeafSprig,
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

const MIN_POSITION = 10;
const MAX_POSITION = 90;
const START_POSITION = 18;
const SCENE_FADE = { duration: 0.45, ease: EASE_ENTER } as const;
const CHARACTER_SPRING = {
  type: "spring",
  stiffness: 110,
  damping: 22,
  mass: 0.55,
} as const;

function PublicSkyline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 720 300"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[48%] w-full"
    >
      <path d="M0 244h720v56H0Z" fill="#AEBEE8" opacity=".34" />
      <g fill="#9EB1E0" opacity=".42">
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

function PublicEnvironment() {
  return (
    <div
      aria-hidden
      data-personality-bg="world"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(150deg,#F5F8FF_0%,#E5EBFE_34%,#D2DBF6_68%,#BCC8ED_100%)]"
    >
      <div className="absolute -right-[14%] -top-[22%] h-[25rem] w-[25rem] rounded-full bg-[#C6D7FF]/55 blur-3xl" />
      <div className="absolute left-[43%] top-[6%] h-24 w-24 rounded-full border border-[#AFC0EA]/60 bg-[#F3F7FF]/70 shadow-[0_0_80px_30px_rgba(210,226,255,.55)] sm:h-36 sm:w-36">
        <span className="absolute inset-3 rounded-full border border-dashed border-[#AFC0EA]/45" />
        <Star4 className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-[#829BD6] garden-twinkle" />
      </div>
      <div className="absolute inset-y-[12%] right-[6%] w-[36%] rounded-t-[999px] border border-[#AFC0EA]/35 bg-white/15 backdrop-blur-[1px]" />
      <div className="absolute inset-y-[18%] right-[11%] w-[26%] rounded-t-[999px] border border-white/60" />
      <div className="absolute -left-[18%] top-0 h-full w-[74%] bg-[linear-gradient(115deg,rgba(255,255,255,.52),transparent_58%)] [clip-path:polygon(0_0,36%_0,92%_100%,0_100%)]" />
      <PublicSkyline />
      <div className="absolute inset-x-0 bottom-0 h-[44%] bg-[linear-gradient(0deg,rgba(155,177,225,.4),transparent)]" />
      <div className="absolute left-[8%] top-[22%] h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_18px_6px_rgba(255,255,255,.4)]" />
      <div className="absolute left-[31%] top-[31%] h-1.5 w-1.5 rounded-full bg-[#FFF0B8]/80 shadow-[0_0_14px_5px_rgba(255,240,184,.35)]" />
      <div className="absolute right-[24%] top-[35%] h-2 w-2 rounded-full bg-white/60 shadow-[0_0_16px_6px_rgba(255,255,255,.32)]" />
      <Sparkle
        className="absolute right-[31%] top-[14%] h-4 w-4 text-white/80 garden-twinkle"
        style={{ animationDelay: "1.2s" }}
      />
      <Star4
        className="absolute left-[25%] top-[26%] h-3 w-3 text-[#829BD6]/70 garden-twinkle"
        style={{ animationDelay: ".5s" }}
      />
      <TinyFlower className="absolute bottom-[18%] right-[7%] h-7 w-7 text-[#9EB1E0]/75 garden-sway" />
      <div className="absolute bottom-[7.5%] left-[3%] h-px w-[46%] bg-[#AFC0EA]/40" />
    </div>
  );
}

function FairyLights() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 280 120"
      className="absolute left-[4%] top-0 h-24 w-[64%] sm:w-[56%]"
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

function OffDutyEnvironment({ weight }: { weight: number }) {
  return (
    <motion.div
      aria-hidden
      data-personality-bg="mine"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(150deg,#FFF6DA_0%,#FFE4D2_42%,#F5D5E3_100%)]"
      animate={{ opacity: weight }}
      transition={SCENE_FADE}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: 1.035 - weight * 0.035 }}
        transition={CHARACTER_SPRING}
      >
        <div className="absolute -left-[14%] top-[2%] h-64 w-64 rounded-full bg-peach/70 blur-3xl" />
        <div className="absolute right-[2%] top-[4%] h-44 w-44 rounded-full bg-butter/30 blur-3xl" />
        <div className="absolute left-[32%] top-[7%] h-[39%] w-[27%] overflow-hidden rounded-[999px_999px_0.9rem_0.9rem] border-[3px] border-[#F3D9C8]/80 bg-[linear-gradient(180deg,#FFE9B8_0%,#FFCBB4_55%,#F6C9D9_100%)] shadow-[inset_0_0_26px_rgba(255,249,240,.5)]">
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#F3D9C8]/80" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-[#F3D9C8]/80" />
          <div className="absolute bottom-[-14%] left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-[#FFF0B8] shadow-[0_0_44px_20px_rgba(255,240,184,.65)]" />
        </div>
        <div className="absolute left-[29%] top-[5%] h-[44%] w-[5%] rounded-full bg-[#F6DCE7]/85" />
        <div className="absolute left-[58%] top-[5%] h-[41%] w-[4%] rounded-full bg-[#F6DCE7]/65" />
        <FairyLights />
        <div className="absolute bottom-[3%] left-[2%] h-[24%] w-[54%] rounded-[50%] border border-rose/10 bg-[#FFC9B5]/55 shadow-[inset_0_10px_20px_rgba(255,249,240,.45)]" />
        <div className="absolute bottom-[0%] left-[8%] h-20 w-36 rounded-[50%] border border-rose/15 bg-[#F6DCE7]/85 shadow-[inset_0_10px_20px_rgba(255,249,240,.55)] sm:h-24 sm:w-44" />
        <div className="absolute bottom-[13%] left-[3%] h-16 w-24 rounded-[45%] bg-[#FFE6B8]/80" />
        <div className="absolute bottom-[7%] right-[4%] h-24 w-44 rounded-[50%] border border-rose/15 bg-[#FFC9B5]/65 shadow-[inset_0_10px_20px_rgba(255,249,240,.5)] sm:h-28 sm:w-52" />
        <div className="absolute bottom-[4%] right-[19%] h-20 w-36 rounded-[50%] border border-rose/15 bg-[#F6DCE7]/85 shadow-[inset_0_10px_20px_rgba(255,249,240,.55)] sm:h-24 sm:w-44" />
        <div className="absolute bottom-[10%] left-[6%] flex flex-col gap-1">
          <span className="h-2.5 w-24 rounded-full bg-[#C98EA8]/75 shadow-[0_2px_0_rgba(73,51,72,.12)]" />
          <span className="ml-1 h-2.5 w-20 rounded-full bg-[#8EA5DA]/60 shadow-[0_2px_0_rgba(73,51,72,.1)]" />
          <span className="ml-2 h-2.5 w-28 rounded-full bg-[#FFF9F0] shadow-[0_2px_0_rgba(73,51,72,.1)]" />
        </div>
        <div className="absolute bottom-[19%] left-[29%]">
          <div className="mx-auto h-9 w-7 rounded-t-[45%] bg-[#FFF4D6] shadow-[0_0_28px_12px_rgba(255,240,184,.55)]" />
          <div className="mx-auto mt-0.5 h-1.5 w-9 rounded-full bg-[#C98EA8]/60" />
        </div>
        <CoffeeCup className="absolute bottom-[24%] left-[36%] h-10 w-10 garden-float sm:h-14 sm:w-14" />
        <LeafSprig className="absolute bottom-[12%] right-[27%] h-16 w-16 -rotate-12 text-[#9DB49A]/75 sm:h-20 sm:w-20" />
        <Bow className="absolute left-[7%] top-[35%] h-12 w-12 -rotate-12 garden-float sm:h-16 sm:w-16" />
        <HeartArt
          className="absolute left-[38%] top-[15%] h-5 w-5 text-rose/50 garden-float sm:h-7 sm:w-7"
          style={{ animationDuration: "7s" }}
        />
        <TinyFlower
          className="absolute bottom-[23%] left-[18%] h-7 w-7 text-peach garden-sway"
          style={{ animationDelay: "-1.4s" }}
        />
        <Sparkle
          className="absolute right-[31%] top-[11%] h-4 w-4 text-butter garden-twinkle"
          style={{ animationDelay: ".6s" }}
        />
      </motion.div>
    </motion.div>
  );
}

function PublicCharacter({
  active,
  weight,
}: {
  active: boolean;
  weight: number;
}) {
  return (
    <motion.div
      data-personality-character="world"
      className="pointer-events-none absolute bottom-0 left-[-3%] z-10 w-[58%] max-w-[18.5rem] origin-bottom sm:left-[-1%] sm:max-w-[21rem] lg:max-w-[23rem]"
      animate={{
        opacity: weight,
        x: (1 - weight) * -20,
        scale: 0.97 + weight * 0.03,
        rotate: (1 - weight) * -1.6,
      }}
      transition={CHARACTER_SPRING}
    >
      <WorldDivya active={active} />
    </motion.div>
  );
}

function OffDutyCharacter({
  active,
  weight,
}: {
  active: boolean;
  weight: number;
}) {
  return (
    <motion.div
      data-personality-character="mine"
      className="pointer-events-none absolute bottom-0 right-[-3%] z-10 w-[58%] max-w-[18.5rem] origin-bottom sm:right-[-1%] sm:max-w-[21rem] lg:max-w-[23rem]"
      animate={{
        opacity: weight,
        x: (1 - weight) * 20,
        scale: 0.97 + weight * 0.03,
        rotate: (1 - weight) * 1.6,
      }}
      transition={CHARACTER_SPRING}
    >
      <MineDivya active={active} />
    </motion.div>
  );
}

function PersonalityCopy({ mode }: { mode: PersonalityMode }) {
  const active = personalities[mode];
  const isWorld = mode === "world";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, x: isWorld ? 16 : -16 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -8, x: isWorld ? 10 : -10 }}
      transition={{ duration: 0.42, ease: EASE_ENTER }}
      data-personality-copy={mode}
      className={cn(
        "pointer-events-none absolute top-[17%] z-20 w-[62%] max-w-[22rem] rounded-[1.2rem] border px-4 py-3.5 shadow-[0_18px_40px_-24px_rgba(47,31,46,.5)] backdrop-blur-[3px] sm:top-[16%] sm:w-[48%] sm:px-5 sm:py-4 lg:w-[42%]",
        isWorld
          ? "right-[4%] border-[#8EA5DA]/35 bg-[#F7FAFF]/60 text-[#3D4D75]"
          : "left-[4%] border-rose/35 bg-[#FFF8EE]/65 text-rose-deep",
      )}
    >
      <p className="balance font-display text-[clamp(1.15rem,3.8vw,2rem)] italic leading-[1.05]">
        {active.headline}
      </p>
      <p
        className={cn(
          "mt-2 text-[0.5rem] font-extrabold uppercase tracking-[0.22em] sm:text-[0.56rem]",
          isWorld ? "text-[#4F639B]/70" : "text-rose-deep/70",
        )}
      >
        {active.support}
      </p>
    </motion.div>
  );
}

export function PersonalityFiles() {
  const [position, setPosition] = useState(START_POSITION);
  const [displayMode, setDisplayMode] = useState<PersonalityMode>("world");
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pointerActive = useRef(false);
  const previousMode = useRef<PersonalityMode>(displayMode);
  const audio = useAudioExperience();

  const mix = clamp(
    (position - MIN_POSITION) / (MAX_POSITION - MIN_POSITION),
    0,
    1,
  );
  const publicWeight = 1 - mix;
  const privateWeight = mix;

  useEffect(() => {
    if (previousMode.current === displayMode) return;
    previousMode.current = displayMode;
    audio.playSfx("page");
  }, [audio, displayMode]);

  const updateMode = useCallback((next: number) => {
    setDisplayMode((current) => {
      if (current === "world" && next >= 62) return "mine";
      if (current === "mine" && next <= 38) return "world";
      return current;
    });
  }, []);

  const moveTo = useCallback(
    (clientX: number) => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = clamp(
        ((clientX - rect.left) / rect.width) * 100,
        MIN_POSITION,
        MAX_POSITION,
      );
      setPosition(next);
      updateMode(next);
    },
    [updateMode],
  );

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
      const next = clamp(position - step, MIN_POSITION, MAX_POSITION);
      setPosition(next);
      updateMode(next);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = clamp(position + step, MIN_POSITION, MAX_POSITION);
      setPosition(next);
      updateMode(next);
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(MIN_POSITION);
      updateMode(MIN_POSITION);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(MAX_POSITION);
      updateMode(MAX_POSITION);
    }
  };

  const chooseMode = (next: PersonalityMode) => {
    setPosition(next === "world" ? MIN_POSITION : MAX_POSITION);
    setDisplayMode(next);
  };

  const active = personalities[displayMode];

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
            data-personality-stage
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
            className="group relative h-[27rem] touch-pan-y select-none overflow-hidden rounded-[1.6rem] border border-plum/12 bg-cream shadow-[0_40px_84px_-42px_rgba(47,31,46,.62)] sm:h-[32rem] sm:rounded-[2rem] lg:h-[35rem]"
          >
            <PublicEnvironment />
            <OffDutyEnvironment weight={privateWeight} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 bg-[linear-gradient(0deg,rgba(47,31,46,.14),transparent)]" />

            <PublicCharacter active={displayMode === "world"} weight={publicWeight} />
            <OffDutyCharacter active={displayMode === "mine"} weight={privateWeight} />

            <AnimatePresence initial={false}>
              <PersonalityCopy key={displayMode} mode={displayMode} />
            </AnimatePresence>

            <button
              type="button"
              onClick={() => chooseMode("world")}
              onPointerDown={(event) => event.stopPropagation()}
              aria-pressed={displayMode === "world"}
              className={cn(
                "absolute left-4 top-4 z-30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.52rem] font-extrabold uppercase tracking-[0.2em] backdrop-blur transition-all duration-300 sm:left-5 sm:top-5 sm:text-[0.58rem]",
                displayMode === "world"
                  ? "border-[#8EA5DA]/45 bg-white/70 text-[#4F639B]"
                  : "border-[#8EA5DA]/20 bg-white/35 text-[#5B6FA8]/60 hover:bg-white/55",
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#7E96D2]" />
              {personalities.world.tab}
            </button>

            <button
              type="button"
              onClick={() => chooseMode("mine")}
              onPointerDown={(event) => event.stopPropagation()}
              aria-pressed={displayMode === "mine"}
              className={cn(
                "absolute right-4 top-4 z-30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.52rem] font-extrabold uppercase tracking-[0.2em] backdrop-blur transition-all duration-300 sm:right-5 sm:top-5 sm:text-[0.58rem]",
                displayMode === "mine"
                  ? "border-rose/45 bg-white/70 text-rose-deep"
                  : "border-rose/20 bg-white/35 text-rose-deep/55 hover:bg-white/55",
              )}
            >
              {personalities.mine.tab}
              <span className="h-1.5 w-1.5 rounded-full bg-rose" />
            </button>

            <span className="pointer-events-none absolute left-1/2 top-4 z-30 hidden -translate-x-1/2 hand text-[1rem] text-plum/55 sm:block">
              {filesCopy.hint}
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
                aria-valuemin={MIN_POSITION}
                aria-valuemax={MAX_POSITION}
                aria-valuenow={Math.round(position)}
                aria-valuetext={`${active.tab}: ${active.headline}`}
                onKeyDown={handleKeyDown}
                className={cn(
                  "pointer-events-auto flex h-16 w-16 cursor-ew-resize touch-none items-center justify-center rounded-full border border-plum/15 bg-cream/95 text-plum/65 shadow-[0_14px_32px_-14px_rgba(47,31,46,.7)] outline-none backdrop-blur transition-transform duration-200 sm:h-14 sm:w-14",
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
          </div>
        </div>
      </div>
    </section>
  );
}

