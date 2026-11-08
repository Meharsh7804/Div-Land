"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Flower, Heart as HeartArt, Star4 } from "@/components/common/Illustrations";
import { filesCopy, personalities, type PersonalityMode } from "@/data/personality";
import { EASE_ENTER } from "@/animations/motion";
import { cn } from "@/lib/utils";
import { MineDivya, WorldDivya } from "./DivyaCharacters";

function SwapDoodle({ className }: { className?: string }) {
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
      <path d="M4 9h14M14 5l4 4-4 4" />
      <path d="M20 15H6M10 11l-4 4 4 4" opacity=".7" />
    </svg>
  );
}

export function PersonalityFiles() {
  const [mode, setMode] = useState<PersonalityMode>("world");
  const sectionRef = useRef<HTMLElement | null>(null);
  const active = personalities[mode];
  const isMine = mode === "mine";

  return (
    <section
      ref={sectionRef}
      id="chapter-files"
      aria-labelledby="files-title"
      className="paper relative overflow-hidden bg-gradient-to-b from-cream via-[#FBEDF3] to-cream section-pad"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          data-parallax={-5}
          className={cn(
            "absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl transition-colors duration-700",
            isMine ? "bg-peach/45" : "bg-lavender/50",
          )}
        />
        <div
          data-parallax={4}
          className={cn(
            "absolute -right-20 bottom-24 h-80 w-80 rounded-full blur-3xl transition-colors duration-700",
            isMine ? "bg-butter/45" : "bg-blush/60",
          )}
        />
        <Flower className="absolute left-[6%] top-[16%] h-10 w-10 opacity-60 anim-sway" />
        <Flower
          className="absolute right-[9%] top-[24%] h-7 w-7 opacity-50 anim-sway"
          style={{ animationDelay: "-1.5s" }}
        />
        <Star4 className="absolute right-[18%] top-[12%] h-4 w-4 text-butter anim-twinkle" />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          number="02"
          sceneId="files"
          variant="editorial"
          eyebrow={filesCopy.eyebrow}
          title={
            <span id="files-title">
              Two versions.{" "}
              <span className="italic text-rose-deep">Both completely her.</span>
            </span>
          }
          script={filesCopy.script}
        />

        <Reveal delay={0.12} className="mt-9 sm:mt-12">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center">
              <div
                role="group"
                aria-label="Choose which version of Divya to view"
                className="relative flex w-full max-w-[23rem] items-center gap-1 rounded-full border border-plum/12 bg-cream/85 p-1.5 shadow-[0_16px_34px_-26px_rgba(47,31,46,.6)] sm:max-w-[27rem]"
              >
                {(
                  [
                    { id: "world" as const, label: personalities.world.tab, icon: Star4 },
                    { id: "mine" as const, label: personalities.mine.tab, icon: HeartArt },
                  ]
                ).map(({ id, label, icon: Icon }) => {
                  const selected = mode === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMode(id)}
                      aria-pressed={selected}
                      className={cn(
                        "relative z-10 flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full px-2.5 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.09em] transition-colors duration-300 sm:text-[0.72rem] sm:tracking-[0.12em]",
                        selected ? "text-cream" : "text-plum/65 hover:text-plum",
                      )}
                    >
                      {selected ? (
                        <motion.span
                          layoutId="personality-pill"
                          className={cn(
                            "absolute inset-0 -z-10 rounded-full shadow-[0_10px_22px_-14px_rgba(47,31,46,.8)]",
                            id === "world" ? "bg-plum" : "bg-rose-deep",
                          )}
                          transition={{ type: "spring", stiffness: 340, damping: 32 }}
                        />
                      ) : null}
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0",
                          selected ? "text-butter" : "text-rose-deep/70",
                        )}
                      />
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center gap-2 text-plum/45">
                <span className="h-px w-6 bg-plum/20" />
                <SwapDoodle className="h-3.5 w-3.5" />
                <span className="hand text-lg text-plum/60">{filesCopy.hint}</span>
                <span className="h-px w-6 bg-plum/20" />
              </div>
            </div>

            <div
              className={cn(
                "relative mt-6 overflow-hidden rounded-[2rem] border shadow-[0_28px_60px_-40px_rgba(47,31,46,.55)] transition-colors duration-700 sm:rounded-[2.6rem]",
                isMine
                  ? "border-rose/25 bg-gradient-to-br from-[#FFEFE1] via-[#FFF6EA] to-[#F6E7F2]"
                  : "border-lavender-deep/40 bg-gradient-to-br from-[#EAE4F9] via-[#F6E9F1] to-[#FFF3E7]",
              )}
            >
              <div className="flex items-center justify-between px-4 pt-3.5 sm:px-6 sm:pt-5">
                <span className="flex items-center gap-1.5 text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-plum/45">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-deep/70" />
                  divya files · vol. 02
                </span>
                <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-plum/40">
                  both opinions are correct
                </span>
              </div>

              <div className="relative grid grid-cols-2 gap-1 px-2.5 pb-4 pt-3 sm:gap-4 sm:px-6 sm:pb-6 sm:pt-4">
                <div
                  aria-hidden
                  className="absolute left-1/2 top-10 bottom-16 w-px -translate-x-1/2 border-l border-dashed border-plum/15"
                />
                {(
                  [
                    {
                      id: "world" as const,
                      label: personalities.world.tab,
                      kicker: "public edition",
                      note: "attitude: loaded",
                      rotate: "-4deg",
                    },
                    {
                      id: "mine" as const,
                      label: personalities.mine.tab,
                      kicker: "private edition",
                      note: "soft: activated",
                      rotate: "4deg",
                    },
                  ]
                ).map((panel) => {
                  const selected = mode === panel.id;
                  return (
                    <div
                      key={panel.id}
                      className={cn(
                        "group relative rounded-[1.4rem] p-1.5 transition-all duration-700 sm:p-2",
                        selected ? "opacity-100" : "opacity-55 saturate-[0.7]",
                      )}
                    >
                      <div
                        className={cn(
                          "sheen relative overflow-hidden rounded-t-[999px] rounded-b-[1.1rem] border transition-colors duration-700",
                          selected
                            ? "border-plum/15 bg-gradient-to-b from-cream/90 via-blush/60 to-lavender/70 shadow-[inset_0_1px_0_rgba(255,255,255,.7)]"
                            : "border-plum/10 bg-cream/50",
                          panel.id === "mine"
                            ? "aspect-[3/4.05]"
                            : "aspect-[3/4.05]",
                        )}
                      >
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-3 h-10 w-10 -translate-x-1/2 rounded-full bg-butter/50 blur-md sm:h-14 sm:w-14"
                        />
                        <span className="absolute inset-x-0 top-2.5 z-10 mx-auto w-max rounded-full border border-plum/10 bg-cream/80 px-1.5 py-0.5 text-[0.64rem] font-extrabold uppercase tracking-[0.06em] text-plum/60 sm:px-2 sm:tracking-[0.16em]">
                          {panel.kicker}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 top-8 flex items-end justify-center">
                          {panel.id === "world" ? (
                            <WorldDivya active={selected} className="w-[96%]" />
                          ) : (
                            <MineDivya active={selected} className="w-[96%]" />
                          )}
                        </div>
                        <span
                          aria-hidden
                          className="tape left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                          style={{ transform: `rotate(${panel.rotate}) translate(-50%, -50%)` }}
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <p className="font-display text-[1.05rem] leading-tight text-plum sm:text-[1.3rem]">
                          {panel.label}
                        </p>
                        <p
                          className={cn(
                            "hand mt-0.5 text-[0.95rem] transition-colors sm:text-lg",
                            selected ? "text-rose-deep" : "text-plum/40",
                          )}
                        >
                          {panel.note}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="relative border-t border-dashed border-plum/15 px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                <motion.article
                  key={mode}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE_ENTER }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <p className="eyebrow text-rose-deep/90">{active.kicker}</p>
                    <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-plum/40">
                      file no. 0{mode === "world" ? "1" : "2"} · {mode === "world" ? "on the record" : "off the record"}
                    </p>
                  </div>
                  <h3 className="mt-2 font-display text-[1.5rem] leading-tight text-plum sm:text-[2rem]">
                    {active.title}
                  </h3>
                  <p className="mt-2 max-w-xl font-display text-[0.98rem] italic leading-relaxed text-ink/70 sm:text-[1.08rem]">
                    {active.quote}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {active.traits.map((trait) => (
                      <span
                        key={trait}
                        className="rounded-full border border-plum/12 bg-cream/70 px-2.5 py-1 text-[0.64rem] font-bold text-plum/70"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  <dl className="mt-4 grid gap-x-6 gap-y-0 sm:grid-cols-2">
                    {active.stats.map((stat, index) => (
                      <div
                        key={stat.label}
                        className={cn(
                          "flex flex-wrap items-baseline justify-between gap-x-3 border-b border-dashed border-plum/12 py-2",
                          index === active.stats.length - 1 && "border-b-0 sm:border-b-0",
                        )}
                      >
                        <dt className="text-[0.66rem] font-extrabold uppercase tracking-[0.12em] text-plum/50">
                          {stat.label}
                        </dt>
                        <dd className="font-display text-[0.98rem] italic text-plum">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="hand mt-3 text-center text-xl text-rose-deep/90 sm:text-left sm:text-2xl">
                    {active.note}
                  </p>
                </motion.article>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-butter/35 blur-2xl"
              />
            </div>

            <p className="mx-auto mt-4 max-w-md text-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-plum/35">
              same person · different access levels
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
