"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EnvelopeArt } from "@/components/common/Illustrations";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { EASE_ENTER } from "@/animations/motion";
import { cn } from "@/lib/utils";

type EnvelopeNoteProps = {
  message: string;
  hint?: string;
  className?: string;
  rotate?: number;
  tone?: string;
};

/**
 * A little envelope taped into the journal. Tapping it breaks the seal and
 * unfolds a hidden handwritten note, kept contained so it never overflows
 * the page on small screens.
 */
export function EnvelopeNote({
  message,
  hint = "tap to open",
  className,
  rotate = 0,
  tone = "bg-[#fff7ee]",
}: EnvelopeNoteProps) {
  const [open, setOpen] = useState(false);
  const audio = useAudioExperience();

  return (
    <div
      className={cn(
        "sb-note relative rounded-[0.7rem] border border-plum/10 px-4 pb-3 pt-3",
        tone,
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      <span className="sb-tape sb-tape--rose left-1/2 top-0 h-4 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg]" />

      <button
        type="button"
        onClick={() => {
          audio.playSfx("envelope");
          setOpen((value) => !value);
        }}
        aria-expanded={open}
        aria-label={open ? "Close the hidden note" : "Open the hidden note"}
        className="group flex w-full flex-col items-center gap-1.5"
      >
        <EnvelopeArt className="h-11 w-16 text-plum transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5 group-hover:rotate-[-2deg]" />
        <span className="hand text-[0.98rem] leading-none text-rose-ink">
          {open ? "close it again" : hint}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.p
            key="note"
            initial={{ opacity: 0, height: 0, y: 4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 4 }}
            transition={{ duration: 0.42, ease: EASE_ENTER }}
            className="hand overflow-hidden px-1 text-center text-[1.12rem] leading-snug text-plum/80"
          >
            <span className="block pt-3">{message}</span>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
