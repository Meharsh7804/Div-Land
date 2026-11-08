"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Flower, Heart as HeartArt, Star4 } from "@/components/common/Illustrations";
import { DottedBackdrop } from "@/components/common/Ambient";
import { memories, memoriesCopy, type Memory } from "@/data/memories";
import { DUR, EASE_SCENE } from "@/animations/motion";
import { cn } from "@/lib/utils";
import { MemoryArt } from "./MemoryArt";

function TapDoodle({ className }: { className?: string }) {
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
      <path d="M9.5 11.5V5.8a1.7 1.7 0 0 1 3.4 0v5.1" />
      <path d="M12.9 10.9V9.4a1.6 1.6 0 0 1 3.2 0v2.1" />
      <path d="M16.1 11.5v-1a1.5 1.5 0 0 1 3 0v5.2a5.5 5.5 0 0 1-5.5 5.5h-.9a5 5 0 0 1-3.8-1.8l-3.2-4a1.7 1.7 0 0 1 2.4-2.3l1.4 1.4" />
    </svg>
  );
}

function PolaroidCard({ memory }: { memory: Memory }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={`Memory ${memory.index}: ${memory.title}. ${
        flipped
          ? "Showing the secret note. Tap to see the illustration."
          : "Tap to flip the polaroid and read the secret note."
      }`}
      className="group relative mx-auto block w-full max-w-[18.5rem] text-left transition-transform duration-500 [transform:rotate(var(--rot))] hover:[transform:rotate(0deg)] focus-visible:outline-offset-8 sm:max-w-[19.5rem]"
      style={{ ["--rot" as string]: memory.rotate }}
    >
      <div className="relative w-full [perspective:1400px]" style={{ aspectRatio: "4 / 4.55" }}>
        <div
          className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:translateZ(1px)]">
            <div className="polaroid flex h-full flex-col">
              <div className="sheen relative flex-1 overflow-hidden rounded-[2px] bg-[#FFF4E8]">
                <MemoryArt kind={memory.key} className="h-full w-full" />
                <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-cream/85 px-2 py-0.5 text-[0.64rem] font-extrabold uppercase tracking-[0.12em] text-plum/55">
                  <TapDoodle className="h-2.5 w-2.5" />
                  tap
                </span>
              </div>
              <p className="mt-2 line-clamp-2 px-1 font-hand text-[1.08rem] leading-tight text-plum/75">
                {memory.caption}
              </p>
              <Star4 className="absolute right-3 top-3 h-3.5 w-3.5 text-butter" />
            </div>
          </div>

          <div
            className="absolute inset-0 overflow-hidden rounded-[2px] p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{
              background: "linear-gradient(160deg, #543B53, #2F1F2E)",
              boxShadow: "0 22px 40px -24px rgba(47,31,46,.7)",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="rounded-full border border-butter/35 px-2.5 py-1 text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-butter/80">
                {memory.stamp}
              </span>
              <HeartArt className="mt-4 h-5 w-5 text-rose" />
              <p className="mt-3 font-hand text-[1.55rem] leading-tight text-cream">
                {memory.back}
              </p>
              <span className="mt-4 h-px w-10 bg-cream/25" />
              <span className="mt-3 text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-cream/40">
                tap to flip back
              </span>
              <Star4 className="mt-3 h-2.5 w-2.5 text-butter/70" />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function MemoryRow({ memory, index }: { memory: Memory; index: number }) {
  const polaroidFirst = index % 2 === 0;

  return (
    <li className="relative pb-12 pl-10 last:pb-0 sm:pl-14 md:pb-16 md:pl-0">
      <span
        aria-hidden
        className="absolute left-[7px] top-8 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-plum/30 bg-cream shadow-sm md:left-1/2 md:-translate-x-1/2"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-rose-deep" />
      </span>

      <div className="md:grid md:grid-cols-2 md:items-center md:gap-14">
        <div
          className={cn("w-full", polaroidFirst ? "md:order-1" : "md:order-2")}
          data-parallax={index % 2 === 0 ? -4 : 4}
        >
          <motion.div
            initial={{ opacity: 0, x: polaroidFirst ? -34 : 34, rotate: polaroidFirst ? -1.4 : 1.4 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: DUR.scene, ease: EASE_SCENE }}
          >
            <PolaroidCard memory={memory} />
          </motion.div>
        </div>

        <div
          className={cn(
            "relative mt-7 w-full md:mt-0",
            polaroidFirst ? "md:order-2" : "md:order-1",
          )}
          data-parallax={index % 2 === 0 ? 3 : -3}
        >
          <motion.div
            initial={{ opacity: 0, x: polaroidFirst ? 30 : -30, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: DUR.scene, delay: 0.08, ease: EASE_SCENE }}
          >
            <div
              className={cn(
                "relative rounded-[1.15rem] border border-plum/10 bg-[#FFFBF3] px-5 py-5 shadow-[0_20px_44px_-32px_rgba(47,31,46,.6)] sm:px-6",
                index % 2 === 0 ? "rotate-[1deg]" : "rotate-[-1deg]",
              )}
            >
              <span
                className={cn(
                  "tape h-4 w-16",
                  memory.tape === "rose" ? "tape-rose" : "",
                  polaroidFirst ? "-left-3 -top-2 -rotate-6" : "-right-3 -top-2 rotate-6",
                )}
              />
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose/35 bg-blush/35 font-display text-sm italic text-rose-deep">
                  {memory.index}
                </span>
                <span className="rotate-[3deg] rounded-full border border-dashed border-rose-deep/35 px-2.5 py-1 text-[0.64rem] font-extrabold uppercase tracking-[0.16em] text-rose-deep/70">
                  {memory.stamp}
                </span>
              </div>
              <h3 className="mt-3 font-display text-[1.45rem] leading-tight text-plum sm:text-[1.7rem]">
                {memory.title}
              </h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink/75 sm:text-[0.95rem]">
                {memory.text}
              </p>
              <div className="mt-3 flex items-center gap-2 border-t border-dashed border-plum/12 pt-2.5">
                <HeartArt className="h-3 w-3 shrink-0 text-rose" />
                <p className="font-hand text-[1.08rem] leading-tight text-plum/55">
                  kept, not archived
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </li>
  );
}

export function MemoryScrapbook() {
  return (
    <section
      id="chapter-memories"
      aria-labelledby="memories-title"
      className="relative overflow-hidden bg-[#F7EAE4] section-pad"
    >
      <div aria-hidden data-parallax={-3} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,255,255,.65),transparent_55%)]" />
        <DottedBackdrop className="opacity-30" />
        <div className="absolute -left-16 top-1/3 h-64 w-64 rounded-full bg-blush/50 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-lavender/45 blur-3xl" />
        <span className="tape left-[8%] top-[10%] h-7 w-24 rotate-[-8deg]" />
        <span className="tape tape-rose right-[6%] top-[18%] h-6 w-20 rotate-[7deg]" />
        <Flower className="absolute bottom-[8%] left-[5%] h-9 w-9 opacity-60 anim-sway" />
        <Flower className="absolute right-[8%] top-[12%] h-7 w-7 opacity-50 anim-sway" style={{ animationDelay: "-2s" }} />
        <Star4 className="absolute left-[16%] top-[46%] h-4 w-4 text-rose/40 anim-twinkle" />
        <Star4 className="absolute right-[18%] bottom-[16%] h-3 w-3 text-butter anim-twinkle" style={{ animationDelay: "1s" }} />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          number="05"
          sceneId="memories"
          eyebrow={memoriesCopy.eyebrow}
          title={<span id="memories-title">{memoriesCopy.title}</span>}
          script={memoriesCopy.script}
        >
          <span className="flex flex-col items-center gap-2">
            <span className="font-hand text-[1.35rem] text-rose-deep">
              {memoriesCopy.hint}
            </span>
          </span>
        </SectionHeading>

        <ol className="relative mx-auto mt-10 max-w-4xl sm:mt-14">
          <div
            aria-hidden
            className="absolute bottom-4 left-[13px] top-4 w-px md:left-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(176,112,140,.6) 0 6px, transparent 6px 12px)",
            }}
          />

          {memories.map((memory, index) => (
            <MemoryRow key={memory.id} memory={memory} index={index} />
          ))}
        </ol>

        <Reveal delay={0.06} className="mt-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-plum/15" />
              <Star4 className="h-3.5 w-3.5 text-rose-deep/60" />
              <span className="h-px w-10 bg-plum/15" />
            </div>
            <p className="hand max-w-md text-[1.4rem] leading-tight text-plum/60">
              {memoriesCopy.outro}
            </p>
            <span className="rounded-full border border-dashed border-rose-deep/30 px-3 py-1 text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-rose-deep/60">
              certified · actually ours
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
