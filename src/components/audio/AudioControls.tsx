"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { useAudioExperience } from "./AudioProvider";

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span className="flex h-5 w-5 items-end justify-center gap-[3px] pb-[1px]">
      {[0, 1, 2].map((bar) => (
        <motion.span
          key={bar}
          className="w-[3px] rounded-full bg-current"
          animate={
            playing
              ? { height: ["5px", "14px", "8px", "16px", "6px"] }
              : { height: "5px" }
          }
          transition={{
            duration: 1.4 + bar * 0.25,
            repeat: playing ? Infinity : 0,
            ease: "easeInOut",
            delay: bar * 0.16,
          }}
        />
      ))}
    </span>
  );
}

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

function MixIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <path d="M5 6h14M5 12h14M5 18h14" />
      <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MusicIcon({ className }: { className?: string }) {
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
      <path d="M9 18V6.2l10-2v11.3" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
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
      <path d="M12 3.5c.5 4.6 3.9 8 8.5 8.5-4.6.5-8 3.9-8.5 8.5-.5-4.6-3.9-8-8.5-8.5 4.6-.5 8-3.9 8.5-8.5Z" />
    </svg>
  );
}

function MixRow({
  icon,
  label,
  note,
  enabled,
  value,
  onToggle,
  onChange,
}: {
  icon: ReactNode;
  label: string;
  note: string;
  enabled: boolean;
  value: number;
  onToggle: () => void;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
              enabled
                ? "border-rose/30 bg-blush/35 text-rose-deep"
                : "border-plum/10 bg-cream-soft text-plum/30",
            )}
          >
            {icon}
          </span>
          <span className="min-w-0">
            <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-plum/65">
              {label}
            </span>
            <span className="hand block truncate text-[0.95rem] leading-tight text-plum/40">
              {note}
            </span>
          </span>
        </span>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={`Toggle ${label.toLowerCase()}`}
          onClick={onToggle}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
            enabled
              ? "border-rose-deep/50 bg-rose-deep"
              : "border-plum/15 bg-plum/10",
          )}
        >
          <span
            className={cn(
              "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream shadow-sm transition-[left] duration-300",
              enabled ? "left-[calc(100%-1.15rem)]" : "left-[3px]",
            )}
          />
        </button>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(value * 100)}
        disabled={!enabled}
        aria-label={`${label} volume`}
        onChange={(event) => onChange(Number(event.target.value) / 100)}
        style={{ ["--audio-fill" as string]: `${Math.round(value * 100)}%` }}
        className="audio-range mt-2.5 w-full"
      />
    </div>
  );
}

export function AudioControls({ visible }: { visible: boolean }) {
  const audio = useAudioExperience();
  const [mixOpen, setMixOpen] = useState(false);

  useEffect(() => {
    const onOtherPanel = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== "audio") setMixOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMixOpen(false);
    };
    window.addEventListener("divland:panel-open", onOtherPanel);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("divland:panel-open", onOtherPanel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (visible) return;
    const timer = window.setTimeout(() => setMixOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  const toggleMix = () => {
    if (!mixOpen) {
      window.dispatchEvent(
        new CustomEvent("divland:panel-open", { detail: "audio" }),
      );
    }
    setMixOpen((open) => !open);
  };

  return (
    <div
      className="pointer-events-none fixed right-3 top-3 z-[95] flex flex-col items-end gap-2 sm:right-5 sm:top-5"
      style={{ marginTop: "env(safe-area-inset-top)" }}
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-plum/15 bg-cream/85 p-1 shadow-[0_10px_24px_-16px_rgba(47,31,46,.8)] backdrop-blur">
        <button
          type="button"
          onClick={audio.toggleMusic}
          aria-pressed={audio.musicOn}
          aria-busy={audio.busy}
          aria-label={
            audio.busy
              ? "Starting the soundtrack"
              : audio.musicOn
                ? "Turn the soundtrack off"
                : "Turn the soundtrack on"
          }
          disabled={audio.busy}
          className={cn(
            "group flex h-10 items-center gap-2 rounded-full px-3 transition-colors",
            audio.musicOn
              ? "bg-plum text-cream"
              : "text-plum hover:bg-cream-soft",
            audio.busy && "opacity-70",
          )}
        >
          {audio.musicOn ? (
            <Equalizer playing={audio.playing} />
          ) : (
            <SpeakerOff className="h-[18px] w-[18px]" />
          )}
          <span className="hidden text-[0.62rem] font-extrabold uppercase tracking-[0.18em] sm:inline">
            {audio.busy ? "starting" : audio.musicOn ? "sound on" : "sound off"}
          </span>
        </button>

        <button
          type="button"
          onClick={toggleMix}
          aria-expanded={mixOpen}
          aria-controls="audio-mix-panel"
          aria-label={mixOpen ? "Close sound controls" : "Open sound controls"}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
            mixOpen
              ? "bg-blush/55 text-rose-deep"
              : "text-plum/55 hover:bg-cream-soft hover:text-plum",
          )}
        >
          <MixIcon className="h-[18px] w-[18px]" />
        </button>
      </div>

      <AnimatePresence>
        {mixOpen ? (
          <motion.div
            id="audio-mix-panel"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="pointer-events-auto w-[17.75rem] rounded-[1.15rem] border border-plum/15 bg-cream/95 p-3.5 shadow-[0_24px_50px_-28px_rgba(47,31,46,.55)] backdrop-blur"
          >
            <div className="flex items-end justify-between gap-2 border-b border-dashed border-plum/12 pb-2.5">
              <p className="eyebrow text-plum/50">the mix</p>
              <p className="hand max-w-[10rem] text-right text-[1.02rem] leading-tight text-rose-deep/80">
                {site.music.title}
              </p>
            </div>

            <div className="mt-3 space-y-3">
              <MixRow
                icon={<MusicIcon className="h-3.5 w-3.5" />}
                label="Music"
                note="soft, original, no vocals"
                enabled={audio.musicOn}
                value={audio.musicVolume}
                onToggle={audio.toggleMusic}
                onChange={audio.setMusicVolume}
              />
              <MixRow
                icon={<SparkIcon className="h-3.5 w-3.5" />}
                label="Little sounds"
                note="cups, paper, candles"
                enabled={audio.sfxOn}
                value={audio.sfxVolume}
                onToggle={audio.toggleSfx}
                onChange={audio.setSfxVolume}
              />
            </div>

            <p className="mt-3 border-t border-dashed border-plum/12 pt-2 text-[0.52rem] font-extrabold uppercase tracking-[0.18em] text-plum/35">
              remembered on this device · never autoplays
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
