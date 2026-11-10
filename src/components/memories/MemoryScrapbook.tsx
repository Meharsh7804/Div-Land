"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { StorybookHeading } from "@/components/common/StorybookHeading";
import { CatSticker } from "@/components/cats/CatSticker";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { Heart as HeartArt, Sparkle, Star4 } from "@/components/common/Illustrations";
import { DottedBackdrop, SparkleField } from "@/components/common/Ambient";
import { memories, memoriesCopy, memoryToneStyles } from "@/data/memories";
import { EASE_SCENE } from "@/animations/motion";
import { cn } from "@/lib/utils";
import { MemoryScene } from "./MemoryArt";

const scraps = [
  {
    className: "left-[3%] top-[16%] w-14 -rotate-[8deg] sm:w-16",
    delay: "-1.6s",
  },
  {
    className: "right-[4%] top-[10%] w-12 rotate-[7deg] sm:w-14",
    delay: "-3.4s",
  },
  {
    className: "left-[6%] bottom-[14%] hidden w-14 rotate-[5deg] md:block",
    delay: "-2.2s",
  },
  {
    className: "right-[5%] bottom-[18%] hidden w-12 -rotate-[6deg] md:block",
    delay: "-4.1s",
  },
];

export function MemoryScrapbook() {
  const audio = useAudioExperience();
  const reduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneInView = useInView(sceneRef, { once: true, amount: 0.45 });
  const [selectedId, setSelectedId] = useState(memories[0].id);
  const selected = memories.find((memory) => memory.id === selectedId) ?? memories[0];
  const selectedIndex = memories.findIndex((memory) => memory.id === selected.id);
  const tone = memoryToneStyles[selected.tone];

  const open = (id: string) => {
    audio.playSfx("page");
    setSelectedId(id);
  };

  const step = (direction: 1 | -1) => {
    const next = (selectedIndex + direction + memories.length) % memories.length;
    open(memories[next].id);
  };

  return (
    <section
      id="chapter-memories"
      aria-labelledby="memories-title"
      className="story-scene bg-[linear-gradient(180deg,#F9EEE8_0%,#F5E5DF_48%,#F8ECE6_100%)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_4%,rgba(255,255,255,.7),transparent_58%)]" />
        <DottedBackdrop className="opacity-20" />
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-blush/45 blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-lavender/40 blur-3xl" />
        <SparkleField count={12} seed={57} tone="text-rose/30" />
        <Star4 className="absolute left-[14%] top-[30%] h-3.5 w-3.5 text-butter garden-twinkle" />
        <Star4
          className="absolute right-[16%] top-[42%] h-3 w-3 text-rose/45 garden-twinkle"
          style={{ animationDelay: "1.2s" }}
        />
        {scraps.map((scrap, index) => (
          <div
            key={index}
            className={cn(
              "absolute rounded-[0.4rem] border border-plum/10 bg-[#FFFBF1]/85 p-1.5 shadow-[0_14px_26px_-22px_rgba(47,31,46,.6)] garden-float",
              scrap.className,
            )}
            style={{ animationDelay: scrap.delay }}
          >
            <span className="mx-auto mb-1 block h-0.5 w-2/3 rounded-full bg-plum/12" />
            <span className="mx-auto block h-0.5 w-1/2 rounded-full bg-plum/10" />
            <span className="absolute left-1/2 top-0 h-2 w-6 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] bg-butter/70" />
          </div>
        ))}
      </div>

      <div className="section-shell relative">
        <StorybookHeading
          id="memories-title"
          number="05"
          label={memoriesCopy.eyebrow.replace("Chapter 05 · ", "")}
          title={memoriesCopy.title}
          note={memoriesCopy.script}
        />

        <div className="relative mx-auto mt-6 w-full max-w-5xl sm:mt-9">
          <div className="paper relative rounded-[1.5rem] border border-plum/12 px-3 py-4 shadow-[0_40px_80px_-48px_rgba(47,31,46,.7)] sm:rounded-[2rem] sm:px-6 sm:py-6">
            <span className="tape left-[12%] top-0 h-3.5 w-16 -translate-y-1/2 rotate-[-3deg]" />
            <span className="tape tape-rose right-[10%] top-0 h-3 w-14 -translate-y-1/2 rotate-[4deg]" />

            <div className="grid gap-5 lg:grid-cols-[1.16fr_0.84fr] lg:items-center lg:gap-7">
              <div className="relative min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={selected.id}
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 18,
                      rotate: reduceMotion ? 0 : -1.1,
                    }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{
                      opacity: 0,
                      y: reduceMotion ? 0 : -14,
                      rotate: reduceMotion ? 0 : 1,
                    }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.46, ease: EASE_SCENE }}
                    className="relative m-0"
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-[1.1rem] border bg-gradient-to-br p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_22px_44px_-30px_rgba(47,31,46,.6)] sm:p-3",
                        tone.paper,
                        selected.core
                          ? "border-rose-deep/45 ring-2 ring-butter/60"
                          : "border-plum/12",
                      )}
                    >
                      {selected.core ? (
                        <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full border border-cream/40 bg-plum/85 px-2 py-1 text-[0.44rem] font-extrabold uppercase tracking-[0.16em] text-butter shadow-sm sm:left-3 sm:top-3">
                          <HeartArt className="h-2.5 w-2.5" />
                          {memoriesCopy.coreLabel}
                        </span>
                      ) : null}

                      <div
                        ref={sceneRef}
                        className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.8rem] border border-white/55 bg-cream/60"
                      >
                        <div className={cn("absolute inset-0 opacity-25", tone.wash)} />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,255,255,.55),transparent_65%)]" />
                        <MemoryScene
                          key={`${selected.id}-scene`}
                          kind={selected.key}
                          animated={!reduceMotion && sceneInView}
                          className="relative h-full w-full"
                        />
                      </div>
                    </div>

                    <figcaption className="mt-3 flex items-start justify-between gap-3 px-1">
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 text-[0.5rem] font-extrabold uppercase tracking-[0.18em] text-plum/40">
                          <Sparkle className="h-2.5 w-2.5 text-rose-deep/70" />
                          scene {selected.index} · {selected.title}
                        </p>
                        <p
                          className={cn(
                            "hand mt-1 text-[clamp(1.2rem,3.7vw,1.62rem)] leading-tight",
                            selected.core ? "text-rose-deep" : "text-plum/85",
                          )}
                        >
                          {selected.caption}
                        </p>
                        {selected.core ? (
                          <p className="mt-1 text-[0.56rem] font-semibold italic text-rose-deep/75">
                            {memoriesCopy.coreNote}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex shrink-0 flex-col items-center gap-1">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-plum/15 bg-cream/70 text-[0.5rem] font-extrabold tracking-[0.1em] text-plum/45">
                          {selected.index}
                        </span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => step(-1)}
                            aria-label="Previous scene"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-plum/15 bg-cream/70 text-plum/50 transition-colors hover:bg-cream hover:text-plum"
                          >
                            <span aria-hidden className="text-sm leading-none">‹</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => step(1)}
                            aria-label="Next scene"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-plum/15 bg-cream/70 text-plum/50 transition-colors hover:bg-cream hover:text-plum"
                          >
                            <span aria-hidden className="text-sm leading-none">›</span>
                          </button>
                        </div>
                      </div>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>

                <p aria-live="polite" aria-atomic="true" className="sr-only">
                  Scene {selected.index}: {selected.title}. {selected.caption}
                </p>
              </div>

              <div className="relative min-w-0">
                <div className="mb-2.5 flex items-center justify-between gap-2">
                  <p className="text-[0.5rem] font-extrabold uppercase tracking-[0.2em] text-plum/40">
                    {memoriesCopy.hint}
                  </p>
                  <Star4 className="h-3 w-3 text-rose/45 garden-twinkle" />
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {memories.map((memory, index) => {
                    const active = memory.id === selected.id;
                    const cardTone = memoryToneStyles[memory.tone];

                    return (
                      <div
                        key={memory.id}
                        className="relative anim-float"
                        style={{ animationDelay: `${index * -0.8}s`, animationDuration: `${6 + (index % 3)}s` }}
                      >
                        <div style={{ transform: `rotate(${memory.rotate})` }}>
                          <button
                            type="button"
                            onClick={() => open(memory.id)}
                            aria-pressed={active}
                            aria-label={`Open scene: ${memory.title}. ${memory.caption}`}
                            className={cn(
                              "group relative block w-full rounded-[0.8rem] border p-1.5 text-left shadow-[0_14px_26px_-22px_rgba(47,31,46,.7)] transition-all duration-300 focus-visible:outline-offset-4",
                              active
                                ? "border-rose-deep/55 bg-cream shadow-[0_18px_34px_-20px_rgba(47,31,46,.75)]"
                                : memory.core
                                  ? "border-rose-deep/35 bg-cream/80 ring-1 ring-butter/70 hover:-translate-y-0.5 hover:border-rose-deep/50 hover:bg-cream"
                                  : "border-plum/12 bg-cream/65 hover:-translate-y-0.5 hover:border-plum/25 hover:bg-cream",
                            )}
                          >
                            <span className="absolute -top-1.5 left-1/2 z-[3] h-2.5 w-9 -translate-x-1/2 rotate-[-3deg] bg-butter/80 shadow-sm" />

                            <div
                              className={cn(
                                "relative aspect-[4/3] w-full overflow-hidden rounded-[0.55rem] border bg-cream/60",
                                active ? "border-rose-deep/25" : "border-plum/10",
                              )}
                            >
                              <div className={cn("absolute inset-0 opacity-30", cardTone.wash)} />
                              <MemoryScene
                                kind={memory.key}
                                animated={false}
                                className="relative h-full w-full"
                              />
                              {memory.core ? (
                                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cream/90 shadow-sm">
                                  <HeartArt className="h-2.5 w-2.5 text-rose-deep" />
                                </span>
                              ) : null}
                            </div>

                            <div className="mt-1 flex items-baseline justify-between gap-1 px-0.5">
                              <span className="text-[0.42rem] font-extrabold tracking-[0.12em] text-plum/35">
                                {memory.index}
                              </span>
                              <span
                                className={cn(
                                  "truncate hand text-[0.8rem] leading-tight",
                                  active ? "text-rose-deep/90" : "text-plum/60",
                                )}
                              >
                                {memory.short}
                              </span>
                            </div>

                            {active ? (
                              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rose-deep" />
                            ) : null}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-2.5 text-center text-[0.48rem] font-extrabold uppercase tracking-[0.18em] text-plum/30">
                  {memoriesCopy.closeLabel}
                </p>
              </div>
            </div>
          </div>

          <CatSticker
            art="flower"
            label="Say hello to the memory cat"
            bubble="keep this one"
            bubbleSide="top"
            interactive
            motion="sway"
            delay={-1.8}
            className="absolute -bottom-6 right-[2%] z-20 w-16 sm:-bottom-8 sm:right-[4%] sm:w-24"
          />
        </div>

        <div className="mt-7 flex flex-col items-center gap-2 text-center sm:mt-9">
          <span className="h-px w-16 bg-plum/15" />
          <p className="hand text-[clamp(1.2rem,4vw,1.65rem)] leading-tight text-rose-deep/90">
            {memoriesCopy.outro}
          </p>
          <span className="flex items-center gap-1.5 text-[0.46rem] font-extrabold uppercase tracking-[0.22em] text-plum/30">
            <HeartArt className="h-2.5 w-2.5 text-rose/60" />
            kept anyway
          </span>
        </div>
      </div>
    </section>
  );
}
