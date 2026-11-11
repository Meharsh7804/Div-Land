"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Sparkle } from "@/components/common/Illustrations";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { EASE_ENTER } from "@/animations/motion";
import { chapters } from "@/data/site";
import { useJourney } from "./JourneyProvider";

export function JourneyContinue({ visible }: { visible: boolean }) {
  const { completed, currentIndex, goNext } = useJourney();
  const audio = useAudioExperience();

  const current = chapters[currentIndex];
  const next = chapters[currentIndex + 1];
  const show =
    visible &&
    currentIndex > 0 &&
    Boolean(current) &&
    Boolean(next) &&
    Boolean(completed[current.id]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[4.8rem] z-[91] flex justify-center px-3 sm:bottom-[5.6rem]"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <AnimatePresence>
        {show && next ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.38, ease: EASE_ENTER }}
            className="pointer-events-auto"
          >
            <button
              type="button"
              onClick={() => {
                audio.playSfx("page");
                goNext();
              }}
              className="btn-magic group min-h-[3.2rem] w-fit max-w-[min(23rem,calc(100vw-7rem))] justify-start gap-3 py-2 pl-2 pr-4 text-left"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/15 text-butter">
                <Sparkle className="h-4 w-4" />
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="text-[0.5rem] font-extrabold uppercase tracking-[0.2em] text-butter/80">
                  scene complete · next
                </span>
                <span className="truncate text-[0.9rem] font-extrabold text-cream">
                  {next.label}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
