"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { BrainBloom, Cloud, Flower, Sparkle, Star4 } from "@/components/common/Illustrations";
import { DottedBackdrop, SparkleField } from "@/components/common/Ambient";
import { labCopy, thoughts, type Thought } from "@/data/thoughts";
import { EASE_SCENE } from "@/animations/motion";
import { makeBag } from "@/lib/utils";

export function ThoughtLab() {
  const [current, setCurrent] = useState<Thought>(thoughts[0]);
  const [served, setServed] = useState(0);
  const [busy, setBusy] = useState(false);
  const bag = useRef<Thought[]>([]);
  const lastId = useRef(thoughts[0].id);
  const timeout = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(
    () => () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    },
    [],
  );

  const nextThought = () => {
    if (busy) return;
    setBusy(true);

    if (bag.current.length === 0) {
      bag.current = makeBag(thoughts.filter((t) => t.id !== lastId.current));
    }

    let picked = bag.current.pop() ?? thoughts[0];
    if (picked.id === lastId.current) {
      const fallback = thoughts.find((t) => t.id !== lastId.current);
      if (fallback) picked = fallback;
    }

    lastId.current = picked.id;
    setCurrent(picked);
    setServed((value) => value + 1);

    if (timeout.current) window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setBusy(false), 420);
  };

  return (
    <section
      ref={sectionRef}
      id="chapter-overthinking"
      aria-labelledby="overthinking-title"
      className="paper relative overflow-hidden bg-cream section-pad"
    >
      <div aria-hidden data-parallax={-3} className="pointer-events-none absolute inset-0">
        <DottedBackdrop className="opacity-40" />
        <div className="absolute left-[6%] top-[18%] h-20 w-36 text-lavender/60 anim-drift sm:h-24 sm:w-44">
          <Cloud className="h-full w-full" />
        </div>
        <div className="absolute right-[3%] top-[30%] h-16 w-32 text-blush/70 anim-drift sm:h-20 sm:w-40" style={{ animationDelay: "-8s" }} >
          <Cloud className="h-full w-full" />
        </div>
        <BrainBloom className="absolute -left-4 bottom-[20%] hidden h-24 w-24 rotate-12 opacity-70 anim-float lg:block" />
        <BrainBloom
          className="absolute -right-2 top-[14%] h-16 w-16 -rotate-12 opacity-60 anim-float sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          style={{ animationDelay: "-2s" }}
        />
        <SparkleField count={12} seed={31} tone="text-rose/50" />
        <Flower className="absolute bottom-[14%] right-[8%] h-8 w-8 opacity-60 anim-sway" />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          number="03"
          sceneId="overthinking"
          variant="marquee"
          eyebrow={labCopy.eyebrow}
          title={<span id="overthinking-title">{labCopy.title}</span>}
          script={labCopy.script}
        >
          {labCopy.intro}
        </SectionHeading>

        <Reveal delay={0.08} className="mt-9 sm:mt-12">
          <div data-parallax={2} className="relative mx-auto max-w-4xl">
            <div
              aria-hidden
              className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-plum px-4 py-1 text-[0.64rem] font-extrabold uppercase tracking-[0.22em] text-cream shadow-md sm:text-[0.64rem]"
            >
              the positive overthinking centre
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-plum/15 bg-[#FFFBF4] p-4 shadow-[0_30px_70px_-45px_rgba(47,31,46,.6)] sm:rounded-[2.4rem] sm:p-6">
              <span className="absolute left-2.5 top-2.5 h-2 w-2 rounded-full border border-plum/20 bg-blush" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border border-plum/20 bg-lavender" />
              <span className="absolute bottom-2.5 left-2.5 h-2 w-2 rounded-full border border-plum/20 bg-butter" />
              <span className="absolute bottom-2.5 right-2.5 h-2 w-2 rounded-full border border-plum/20 bg-peach" />

              <div className="grid gap-4 md:grid-cols-[0.82fr_1.35fr] md:gap-6">
                <div className="relative hidden flex-col items-center justify-center rounded-[1.5rem] border border-plum/10 bg-gradient-to-b from-lavender/30 to-blush/30 p-5 md:flex">
                  <div className="relative flex h-44 w-40 items-end justify-center">
                    <div className="absolute bottom-2 h-5 w-32 rounded-[999px] bg-plum/15 blur-[1px]" />
                    <div className="absolute bottom-3 h-6 w-28 rounded-[999px] border border-plum/20 bg-[#F3E6DE]" />
                    <div className="absolute bottom-7 h-32 w-28 overflow-hidden rounded-t-full rounded-b-[1rem] border border-plum/20 bg-cream/40">
                      <span className="absolute inset-x-2 top-2 h-24 rounded-t-full bg-gradient-to-b from-white/60 to-transparent" />
                      <BrainBloom className="absolute inset-x-2 bottom-4 h-24 w-24" />
                    </div>
                    <span className="absolute right-2 top-6 h-6 w-2 -rotate-12 rounded-full bg-white/70" />
                    <span className="absolute right-5 top-12 h-3 w-2 -rotate-12 rounded-full bg-white/50" />
                    <Star4 className="absolute -right-1 top-2 h-4 w-4 text-butter anim-twinkle" />
                  </div>
                  <p className="mt-4 text-center text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-plum/45">
                    specimen: one busy brain
                  </p>
                  <p className="hand mt-1 text-center text-lg text-rose-deep/80">
                    handle with kindness
                  </p>
                </div>

                <div className="relative">
                  <div className="relative">
                    <div
                      className="relative flex min-h-[13.5rem] flex-col justify-center rounded-[1.7rem] rounded-bl-[0.55rem] border-2 border-dashed border-rose/35 bg-white/65 px-5 py-6 sm:min-h-[14.5rem] sm:px-7 sm:py-8"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-4 top-1 select-none font-display text-[3.2rem] italic leading-none text-rose/30"
                      >
                        &ldquo;
                      </span>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={current.id + String(served)}
                          initial={{ opacity: 0, y: 22, rotate: -0.8, filter: "blur(5px)" }}
                          animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -12, rotate: 0.6, filter: "blur(4px)" }}
                          transition={{ duration: 0.55, ease: EASE_SCENE }}
                          style={{ transformOrigin: "top center" }}
                        >
                          <p className="font-display text-[clamp(1.45rem,5.2vw,2.1rem)] italic leading-[1.25] text-plum">
                            {current.text}
                          </p>
                          {current.special ? (
                            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-plum px-3 py-1 text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-cream">
                              <Star4 className="h-3 w-3 text-butter" />
                              official ruling
                            </span>
                          ) : null}
                        </motion.div>
                      </AnimatePresence>

                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-dashed border-plum/10 pt-3">
                        <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-plum/40">
                          thought no. {String(served + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-rose-deep/60">
                          {served === 0 ? "fresh from the machine" : `${served} served today`}
                        </span>
                      </div>
                    </div>
                    <span className="absolute -bottom-2 left-7 h-4 w-4 rounded-full border-2 border-dashed border-rose/30 bg-cream" />
                    <span className="absolute -bottom-5 left-4 h-2.5 w-2.5 rounded-full border-2 border-dashed border-rose/25 bg-cream" />
                    <AnimatePresence>
                      {busy ? (
                        <motion.div
                          key="thought-spark"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: [0, 1, 0], scale: [0.9, 1.08, 1.2] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.55 }}
                          className="pointer-events-none absolute inset-0 rounded-[1.7rem] bg-[radial-gradient(circle_at_50%_50%,rgba(255,240,184,.55),transparent_70%)]"
                        />
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div className="mt-5 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={nextThought}
                      disabled={busy}
                      className="btn-magic min-h-[3.4rem] w-full text-[0.92rem] sm:w-auto"
                    >
                      <Sparkle className="h-4 w-4 text-butter" />
                      {served === 0 ? labCopy.button : labCopy.again}
                    </button>
                    <p className="hand text-center text-lg leading-tight text-plum/55 sm:max-w-[11rem] sm:text-right">
                      take one, they&apos;re free
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="relative rotate-[-1.5deg] rounded-[1.1rem] border border-plum/10 bg-cream px-4 py-3 shadow-[0_14px_30px_-24px_rgba(47,31,46,.6)]">
                <span className="tape -right-3 -top-2 h-4 w-14 rotate-6" />
                <p className="eyebrow text-rose-deep/80">the prescription</p>
                <p className="mt-1 text-[0.85rem] font-semibold leading-snug text-ink/75">
                  Dosage: as needed.
                  <br />
                  Side effects: a lighter day.
                </p>
              </div>
              <div className="relative rotate-[1.2deg] rounded-[1.1rem] border border-plum/10 bg-cream px-4 py-3 shadow-[0_14px_30px_-24px_rgba(47,31,46,.6)]">
                <span className="tape tape-rose -left-3 -top-2 h-4 w-14 -rotate-6" />
                <p className="eyebrow text-rose-deep/80">house rule</p>
                <p className="mt-1 text-[0.85rem] font-semibold leading-snug text-ink/75">
                  All spirals must be positive. House policy.
                </p>
              </div>
              <div className="relative flex rotate-[-0.8deg] flex-col justify-between rounded-[1.1rem] border border-plum/10 bg-lavender/35 px-4 py-3 shadow-[0_14px_30px_-24px_rgba(47,31,46,.6)]">
                <div>
                  <p className="eyebrow text-plum/55">brain status</p>
                  <p className="mt-1 text-[0.85rem] font-semibold leading-snug text-ink/75">
                    Currently busy overthinking something nice. Do not disturb.
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Sparkle className="h-3.5 w-3.5 text-rose-deep" />
                  <span className="hand text-lg text-plum/60">prescribed with affection</span>
                </div>
              </div>
            </div>
            <p className="mx-auto mt-5 max-w-md text-center text-[0.64rem] font-bold uppercase tracking-[0.18em] text-plum/30">
              {labCopy.footnote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
