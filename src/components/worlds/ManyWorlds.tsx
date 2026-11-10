"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  RotateCcw,
} from "lucide-react";
import { SparkleField } from "@/components/common/Ambient";
import { StorybookHeading } from "@/components/common/StorybookHeading";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { scrollToTarget } from "@/animations/useSmoothScroll";
import { EASE_CINEMA, EASE_ENTER, EASE_SCENE } from "@/animations/motion";
import { clamp, cn } from "@/lib/utils";
import { manyWorlds, worlds, type CaptionLine, type WorldId } from "@/data/worlds";
import { ArtistScene } from "./ArtistScene";
import { VoiceScene } from "./VoiceScene";
import { StrengthScene } from "./StrengthScene";
import { HomeScene } from "./HomeScene";
import { FinaleScene } from "./FinaleScene";
import type { SceneInteractionProps } from "./scene-types";

const sceneMap: Record<WorldId, ComponentType<SceneInteractionProps>> = {
  artist: ArtistScene,
  voice: VoiceScene,
  strength: StrengthScene,
  home: HomeScene,
  finale: FinaleScene,
};

const captionStyles: Record<CaptionLine["style"], string> = {
  display:
    "font-display text-[clamp(1.05rem,2.4vw,1.5rem)] italic leading-tight text-cream/95",
  hand: "hand text-[clamp(1.02rem,2.5vw,1.32rem)] leading-snug text-butter/90",
  accent: "display-title text-[clamp(1.2rem,3vw,1.9rem)] text-butter",
};

const primaryButton =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-butter/60 bg-butter px-4 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-plum shadow-[0_14px_28px_-16px_rgba(0,0,0,.85)] transition hover:brightness-105 active:scale-[0.98]";

const iconButton =
  "flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 bg-cream/[0.06] text-cream/75 transition hover:border-cream/40 hover:bg-cream/[0.1] hover:text-cream active:scale-95 disabled:cursor-not-allowed disabled:opacity-30";

const wipeInk: Record<WorldId, { ink: string; glow: string; beam: boolean }> = {
  artist: { ink: "#C98EA8", glow: "#F6DCE7", beam: false },
  voice: { ink: "#FFF0B8", glow: "#FFF9F0", beam: true },
  strength: { ink: "#F0A98E", glow: "#FFDCCB", beam: false },
  home: { ink: "#F6DCE7", glow: "#FFF0B8", beam: false },
  finale: { ink: "#FFF0B8", glow: "#DCD5F5", beam: true },
};

const wipePath =
  "M-140 560C120 500 260 360 430 400S700 530 880 420 1080 250 1340 330";

function WorldWipe({ sceneId, runId }: { sceneId: WorldId; runId: number }) {
  const uid = useId().replace(/:/g, "");
  const { ink, glow, beam } = wipeInk[sceneId];

  return (
    <div
      key={`wipe-${sceneId}-${runId}`}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[8] overflow-hidden"
    >
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={`${uid}-ink`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={ink} stopOpacity="0" />
            <stop offset="38%" stopColor={ink} stopOpacity=".92" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </linearGradient>
          <filter id={`${uid}-blur`} x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation={beam ? 11 : 6} />
          </filter>
        </defs>
        <motion.path
          d={wipePath}
          fill="none"
          stroke={`url(#${uid}-ink)`}
          strokeWidth={beam ? 30 : 17}
          strokeLinecap="round"
          filter={`url(#${uid}-blur)`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.6, ease: EASE_SCENE }}
        />
        <motion.path
          d={wipePath}
          fill="none"
          stroke={beam ? glow : ink}
          strokeWidth={beam ? 3.4 : 2.6}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.95, 0.08] }}
          transition={{ duration: 1.5, ease: EASE_SCENE }}
        />
      </svg>
      <motion.span
        className="absolute inset-y-0 w-1/3"
        style={{
          background: `linear-gradient(90deg, transparent, ${
            beam ? "rgba(255,249,240,.5)" : "rgba(255,249,240,.22)"
          }, transparent)`,
          filter: "blur(10px)",
        }}
        initial={{ x: "-130%", opacity: 0 }}
        animate={{ x: "360%", opacity: [0, 0.75, 0] }}
        transition={{ duration: 1.5, ease: EASE_SCENE }}
      />
    </div>
  );
}

export function ManyWorlds() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<WorldId>>(() => new Set());
  const [runId, setRunId] = useState(0);

  const completedRef = useRef<Set<WorldId>>(new Set());
  const audio = useAudioExperience();
  const playSfxRef = useRef(audio.playSfx);

  const current = worlds[sceneIndex];
  const Scene = sceneMap[current.id];
  const currentComplete = completed.has(current.id);
  const allComplete = completed.size === worlds.length;
  const firstIncompleteIndex = worlds.findIndex(
    (world) => !completed.has(world.id),
  );

  useEffect(() => {
    playSfxRef.current = audio.playSfx;
  }, [audio.playSfx]);

  const completeWorld = useCallback((id: WorldId) => {
    if (completedRef.current.has(id)) return;
    const next = new Set(completedRef.current);
    next.add(id);
    completedRef.current = next;
    setCompleted(next);
    const world = worlds.find((item) => item.id === id);
    if (world) playSfxRef.current(world.sfx);
  }, []);

  const onSceneComplete = useMemo(() => {
    const handlers = {} as Record<WorldId, () => void>;
    worlds.forEach((world) => {
      handlers[world.id] = () => completeWorld(world.id);
    });
    return handlers;
  }, [completeWorld]);

  const goToWorld = useCallback(
    (index: number) => {
      if (index === sceneIndex) return;
      setSceneIndex(clamp(index, 0, worlds.length - 1));
      setRunId((value) => value + 1);
    },
    [sceneIndex],
  );

  const changeWorld = useCallback(
    (direction: number) => {
      goToWorld(sceneIndex + direction);
    },
    [goToWorld, sceneIndex],
  );

  const restart = useCallback(() => {
    const empty = new Set<WorldId>();
    completedRef.current = empty;
    setCompleted(empty);
    setSceneIndex(0);
    setRunId((value) => value + 1);
    playSfxRef.current("page");
  }, []);

  const handleContinue = useCallback(() => {
    playSfxRef.current("page");
    scrollToTarget("#chapter-letter");
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        changeWorld(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeWorld(-1);
      }
    },
    [changeWorld],
  );

  const nextStepIndex =
    current.id === "finale"
      ? firstIncompleteIndex >= 0
        ? firstIncompleteIndex
        : 0
      : Math.min(sceneIndex + 1, worlds.length - 1);

  const nextStepLabel = currentComplete
    ? current.id === "finale" && firstIncompleteIndex >= 0
      ? `Visit ${worlds[firstIncompleteIndex].shortLabel}`
      : manyWorlds.next
    : manyWorlds.next;

  return (
    <section
      id="chapter-gallery"
      aria-labelledby="gallery-title"
      className="story-scene bg-[radial-gradient(ellipse_at_50%_10%,#5B3F58_0%,#3B2838_46%,#241821_100%)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,20,28,.24),transparent_32%,rgba(30,20,28,.58))]" />
        <SparkleField
          count={20}
          seed={96}
          tone="text-butter"
          className="opacity-50"
        />
        <div className="absolute left-[9%] top-[22%] h-2 w-2 rounded-full bg-blush/40 blur-[1px] anim-float" />
        <div
          className="absolute right-[11%] top-[58%] h-1.5 w-1.5 rounded-full bg-butter/50 blur-[1px] anim-float"
          style={{ animationDelay: "-2.4s" }}
        />
        <div className="absolute left-1/2 top-0 h-[42rem] w-[min(62rem,120vw)] -translate-x-1/2 -rotate-[14deg] bg-[linear-gradient(112deg,transparent_32%,rgba(255,240,184,.08)_49%,transparent_66%)] blur-2xl" />
      </div>

      <div className="section-shell relative z-[1]">
        <StorybookHeading
          id="gallery-title"
          number="06"
          label="The Many Worlds of Sonu"
          title={manyWorlds.title}
          note={manyWorlds.note}
          tone="light"
        />

        <div className="relative mx-auto mt-6 max-w-[68rem] sm:mt-8">
          <div className="overflow-hidden rounded-[1.3rem] border border-butter/15 bg-[linear-gradient(180deg,#33222F_0%,#2A1C29_62%,#1E141C_100%)] shadow-[0_44px_120px_-40px_rgba(0,0,0,.9)]">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden bg-plum-deep sm:aspect-[16/10]"
              onKeyDown={handleKeyDown}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={`${current.id}-${runId}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.012 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: EASE_CINEMA }}
                >
                  <Scene
                    completed={currentComplete}
                    onComplete={onSceneComplete[current.id]}
                  />
                </motion.div>
              </AnimatePresence>

              <WorldWipe
                key={`${current.id}-${runId}`}
                sceneId={current.id}
                runId={runId}
              />

              <div
                aria-hidden
                className="world-grain pointer-events-none absolute inset-0 z-[9]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[9] bg-[radial-gradient(ellipse_at_50%_44%,transparent_54%,rgba(23,16,23,.55))]"
              />

              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 bg-[linear-gradient(180deg,rgba(23,16,23,.62),transparent)] px-4 pb-10 pt-3.5 sm:px-6 sm:pt-5">
                <div>
                  <p className="flex items-center gap-2 text-[0.5rem] font-extrabold uppercase tracking-[0.24em] text-butter/70">
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-butter/30 px-1 text-[0.44rem] text-butter/85">
                      {current.number}
                    </span>
                    world {current.number} · {current.label}
                  </p>
                  <p className="hand mt-1 text-[0.98rem] leading-none text-cream/70 sm:text-[1.1rem]">
                    {current.kicker}
                  </p>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={currentComplete ? "done" : "action"}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.35, ease: EASE_ENTER }}
                    className={cn(
                      "hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.46rem] font-extrabold uppercase tracking-[0.16em] backdrop-blur sm:flex",
                      currentComplete
                        ? "border-butter/35 bg-butter/10 text-butter/85"
                        : "border-cream/15 bg-plum-deep/45 text-cream/55",
                    )}
                  >
                    {currentComplete ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <MousePointerClick className="h-3 w-3" />
                    )}
                    {currentComplete
                      ? manyWorlds.discovered
                      : current.action}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative z-10 border-t border-cream/10 bg-[linear-gradient(180deg,#2A1C29,#1E141C)] px-4 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.48rem] font-extrabold uppercase tracking-[0.2em] text-cream/40">
                    <span className="text-butter/75">{current.number}</span>
                    <span>{current.label}</span>
                    <span className="hidden h-1 w-1 rounded-full bg-cream/20 sm:block" />
                    <span className="hand text-[0.92rem] normal-case tracking-normal text-butter/65">
                      {current.kicker}
                    </span>
                  </p>

                  <div className="mt-1.5 flex min-h-[4.1rem] items-center sm:min-h-[3.5rem]">
                    <AnimatePresence mode="wait" initial={false}>
                      {currentComplete ? (
                        <motion.div
                          key={`caption-${current.id}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.5, ease: EASE_ENTER }}
                          className="flex flex-col gap-0.5"
                        >
                          {current.caption.map((line, index) => (
                            <motion.p
                              key={line.text}
                              className={captionStyles[line.style]}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.75,
                                delay:
                                  index * 0.32 + (line.delay ?? 0),
                                ease: EASE_ENTER,
                              }}
                            >
                              {line.text}
                            </motion.p>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.p
                          key={`prompt-${current.id}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.45, ease: EASE_ENTER }}
                          className="max-w-xl font-display text-[clamp(0.98rem,2.2vw,1.25rem)] italic leading-snug text-cream/85"
                        >
                          {current.prompt}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => changeWorld(-1)}
                    aria-label={manyWorlds.previous}
                    disabled={sceneIndex === 0}
                    className={iconButton}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeWorld(1)}
                    aria-label={manyWorlds.next}
                    disabled={sceneIndex === worlds.length - 1}
                    className={iconButton}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative mt-3">
                <div
                  aria-hidden
                  className="absolute left-[10%] right-[10%] top-3 h-px bg-[linear-gradient(90deg,transparent,rgba(255,249,240,.18),transparent)]"
                />
                <div className="relative grid grid-cols-5 gap-1">
                  {worlds.map((world, index) => {
                    const active = index === sceneIndex;
                    const done = completed.has(world.id);
                    return (
                      <button
                        key={world.id}
                        type="button"
                        onClick={() => goToWorld(index)}
                        aria-label={`Open world ${world.number}: ${world.label}`}
                        aria-current={active ? "step" : undefined}
                        className="group flex flex-col items-center gap-1.5 pt-0.5"
                      >
                        <span
                          className={cn(
                            "relative flex h-6 w-6 items-center justify-center rounded-full border text-[0.44rem] font-extrabold transition-all duration-300",
                            active
                              ? "scale-110 border-butter bg-butter text-plum shadow-[0_0_20px_rgba(255,240,184,.35)]"
                              : done
                                ? "border-butter/50 bg-butter/10 text-butter"
                                : "border-cream/20 bg-plum-deep/70 text-cream/40 group-hover:border-cream/40 group-hover:text-cream/70",
                          )}
                        >
                          {done && !active ? (
                            <Check className="h-3 w-3" strokeWidth={2.6} />
                          ) : (
                            world.number
                          )}
                        </span>
                        <span
                          className={cn(
                            "text-center text-[0.4rem] font-extrabold uppercase leading-tight tracking-[0.1em] transition-colors",
                            active
                              ? "text-butter/85"
                              : "text-cream/30 group-hover:text-cream/60",
                          )}
                        >
                          {world.shortLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 flex min-h-10 flex-wrap items-center justify-between gap-3 border-t border-cream/10 pt-3">
                <p className="text-[0.48rem] font-extrabold uppercase tracking-[0.18em] text-cream/30">
                  {allComplete
                    ? manyWorlds.finished
                    : currentComplete
                      ? `${completed.size} / ${worlds.length} ${manyWorlds.progress}`
                      : manyWorlds.hint}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {completed.size > 0 ? (
                    <button
                      type="button"
                      onClick={restart}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-cream/15 bg-cream/[0.04] px-3 text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-cream/55 transition hover:border-cream/30 hover:text-cream/85"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {manyWorlds.restart}
                    </button>
                  ) : null}

                  {currentComplete && !allComplete ? (
                    <button
                      type="button"
                      onClick={() => goToWorld(nextStepIndex)}
                      className={primaryButton}
                    >
                      {nextStepLabel}
                      <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                    </button>
                  ) : null}

                  {allComplete ? (
                    <button
                      type="button"
                      onClick={handleContinue}
                      className={primaryButton}
                    >
                      {manyWorlds.continue}
                      <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                    </button>
                  ) : null}
                </div>
              </div>

              {allComplete ? (
                <p className="mt-2 text-center text-[0.5rem] leading-relaxed text-cream/30">
                  {manyWorlds.credit}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        World {current.number} of {worlds.length}: {current.label}.{" "}
        {currentComplete
          ? current.caption.map((line) => line.text).join(" ")
          : current.prompt}
      </p>
    </section>
  );
}
