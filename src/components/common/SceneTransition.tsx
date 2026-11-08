"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChapterSigil, type SigilName } from "./ChapterSigils";
import { EASE_CINEMA, EASE_SCENE } from "@/animations/motion";
import type { Chapter } from "@/data/site";

type SceneTransitionProps = {
  active: Chapter;
  visible: boolean;
  reduced: boolean;
  suppress?: boolean;
};

/**
 * A brief film-gate moment whenever the story cuts to a new scene:
 * a warm light leak sweeps the frame while the chapter sigil is stamped
 * into the middle of the screen, then dissolves.
 */
export function SceneTransition({
  active,
  visible,
  reduced,
  suppress = false,
}: SceneTransitionProps) {
  const [slate, setSlate] = useState<Chapter>(active);
  const [playing, setPlaying] = useState(false);
  const entered = useRef(false);

  useEffect(() => {
    let timer: number | undefined;
    if (!visible) {
      entered.current = false;
      timer = window.setTimeout(() => setPlaying(false), 0);
    } else if (!entered.current) {
      entered.current = true;
      timer = window.setTimeout(() => setSlate(active), 0);
    } else if (suppress) {
      timer = window.setTimeout(() => {
        setPlaying(false);
        setSlate(active);
      }, 0);
    } else if (slate.id !== active.id) {
      timer = window.setTimeout(() => {
        setSlate(active);
        setPlaying(true);
      }, 240);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [active, slate.id, suppress, visible]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setPlaying(false), 2100);
    return () => window.clearTimeout(timer);
  }, [playing, slate.id]);

  if (!visible || reduced || !playing) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={`${slate.id}-transition`}
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#1E141C]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.2, 0] }}
            transition={{ duration: 1.4, times: [0, 0.16, 0.56, 1], ease: EASE_SCENE }}
          />
          <motion.div
            className="absolute inset-y-[-10%] left-[-45%] w-[42%] -skew-x-[14deg] bg-[linear-gradient(90deg,transparent,rgba(255,240,184,.2),rgba(246,220,231,.14),transparent)] blur-2xl"
            initial={{ x: "0%" }}
            animate={{ x: "380%" }}
            transition={{ duration: 1.7, ease: EASE_CINEMA }}
          />
          <motion.div
            className="absolute inset-y-[-10%] left-[-20%] w-[26%] -skew-x-[14deg] bg-[linear-gradient(90deg,transparent,rgba(255,249,240,.2),transparent)] blur-3xl"
            initial={{ x: "0%" }}
            animate={{ x: "520%" }}
            transition={{ duration: 1.9, delay: 0.12, ease: EASE_CINEMA }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, times: [0, 0.2, 0.56, 1], ease: EASE_SCENE }}
          >
            <div className="flex flex-col items-center gap-2.5">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-butter/35 bg-plum/45 p-3.5 text-butter shadow-[0_0_40px_rgba(255,240,184,.18)]">
                <ChapterSigil name={slate.id as SigilName} />
                <span className="absolute inset-0 rounded-full border border-butter/15 anim-breathe" />
              </span>
              <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.3em] text-butter/70">
                scene {slate.number}
              </p>
              <p className="font-display text-[1.05rem] italic leading-none text-cream/85">
                {slate.short}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
