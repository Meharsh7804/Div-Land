"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { Flower } from "@/components/common/Illustrations";
import { scrollToTarget } from "@/animations/useSmoothScroll";
import { site } from "@/data/site";

export function ScrollTopButton({ visible }: { visible: boolean }) {
  const [show, setShow] = useState(false);
  const showRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 900;
      if (next === showRef.current) return;
      showRef.current = next;
      setShow(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && show ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => scrollToTarget(0)}
          aria-label="Back to the top of Divya Land"
          className="fixed bottom-[5.2rem] right-3 z-[92] flex h-11 w-11 items-center justify-center rounded-full border border-plum/12 bg-cream text-plum shadow-[0_12px_28px_-16px_rgba(47,31,46,.7)] transition-colors hover:bg-cream-soft sm:bottom-[5.4rem] sm:right-5"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export function BrandMark({ visible }: { visible: boolean }) {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      aria-label="Divya Land — back to the beginning"
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed left-3 top-3 z-[92] flex items-center gap-2 rounded-full border border-plum/10 bg-cream/95 py-1.5 pl-2 pr-3.5 text-plum shadow-[0_10px_22px_-18px_rgba(47,31,46,.7)] transition-all duration-500 hover:bg-cream sm:left-5 sm:top-5 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ marginTop: "env(safe-area-inset-top)" }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-plum text-cream">
        <Flower className="h-5 w-5" />
      </span>
      <span className="flex flex-col text-left leading-none">
        <span className="font-display text-[1.05rem] italic leading-tight">
          {site.name}
        </span>
        <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.25em] text-rose-deep/80">
          for sonu
        </span>
      </span>
    </button>
  );
}

export function TopProgress({ visible }: { visible: boolean }) {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`fixed inset-x-0 top-0 z-[94] h-[3px] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-rose via-rose-deep to-plum"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}
