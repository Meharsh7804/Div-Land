"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

function SpeakerOff({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9.5h3.2L12 5.5v13L7.2 14.5H4v-5Z" />
      <path d="M16 9.5 21 15M21 9.5 16 15" />
    </svg>
  );
}

export function MusicToggle({
  playing,
  busy,
  onToggle,
  label = "soundtrack",
}: {
  playing: boolean;
  busy: boolean;
  onToggle: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      aria-busy={busy}
      aria-label={
        busy
          ? "Starting the soundtrack"
          : playing
            ? "Turn the soundtrack off"
            : "Turn the soundtrack on (soft instrumental)"
      }
      className={cn(
        "group pointer-events-auto fixed right-3 top-3 z-[95] flex h-11 items-center gap-2 rounded-full border px-3 shadow-[0_10px_24px_-16px_rgba(47,31,46,.8)] transition-colors sm:right-5 sm:top-5",
        playing
          ? "border-rose/45 bg-plum text-cream"
          : "border-plum/15 bg-cream/80 text-plum hover:bg-cream",
        busy && "opacity-70",
      )}
      style={{ marginTop: "env(safe-area-inset-top)" }}
      disabled={busy}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        {playing ? (
          <>
            <span className="absolute inset-0 flex items-end justify-center gap-[3px] pb-[1px]">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-butter"
                  animate={{ height: ["5px", "14px", "8px", "16px", "6px"] }}
                  transition={{
                    duration: 1.4 + i * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.16,
                  }}
                />
              ))}
            </span>
          </>
        ) : (
          <SpeakerOff className="h-[18px] w-[18px]" />
        )}
      </span>
      <span className="hidden text-[0.66rem] font-extrabold uppercase tracking-[0.18em] sm:inline">
        {playing ? "sound on" : "sound off"}
      </span>
      <span className="pointer-events-none absolute right-0 top-[calc(100%+8px)] hidden whitespace-nowrap rounded-full bg-plum px-3 py-1 text-[0.64rem] font-semibold text-cream opacity-0 transition-opacity group-hover:opacity-100 sm:block">
        {label}
      </span>
    </button>
  );
}

export function SoundHint() {
  return (
    <AnimatePresence>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="hand mx-auto mt-4 max-w-[18rem] text-center text-[1.05rem] leading-snug text-plum/60"
      >
        tip: the note in the corner turns on the world&apos;s softest
        soundtrack
      </motion.p>
    </AnimatePresence>
  );
}
