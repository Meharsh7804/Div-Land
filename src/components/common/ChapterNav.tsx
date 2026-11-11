"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { chapters, type Chapter } from "@/data/site";
import { EASE_ENTER } from "@/animations/motion";
import { cn } from "@/lib/utils";
import { ChapterSigil, type SigilName } from "./ChapterSigils";

function MapDoodle({ className }: { className?: string }) {
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
      <path d="M4 7.5 9 5l6 2.5L20 5v11.5L15 19l-6-2.5L4 19V7.5Z" />
      <path d="M9 5v11.5M15 7.5V19" opacity=".55" />
      <circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none" opacity=".7" />
    </svg>
  );
}

type ChapterIndicatorProps = {
  active: Chapter;
  onSelect: (chapter: Chapter) => void;
  visible: boolean;
};

export function ChapterIndicator({ active, onSelect, visible }: ChapterIndicatorProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closePanel = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    const onClick = (event: MouseEvent) => {
      if (!panelRef.current) return;
      const target = event.target as Node;
      if (panelRef.current.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open, closePanel]);

  useEffect(() => {
    if (visible) return;
    const timer = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    const onOtherPanel = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== "chapters") setOpen(false);
    };
    window.addEventListener("divland:panel-open", onOtherPanel);
    return () => window.removeEventListener("divland:panel-open", onOtherPanel);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "fixed bottom-3 left-3 z-[92] transition-opacity duration-500 sm:bottom-5 sm:left-5",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="chapter-menu"
            tabIndex={-1}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.28, ease: EASE_ENTER }}
            className="mb-2 w-[min(19rem,calc(100vw-1.5rem))] rounded-[1.4rem] border border-plum/12 bg-cream/95 p-3 shadow-[0_28px_60px_-24px_rgba(47,31,46,.55)] outline-none"
            role="dialog"
            aria-modal="false"
            aria-label="Jump to a chapter"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="h-px w-5 bg-rose/40" />
                <p className="eyebrow text-rose-deep">the map</p>
              </div>
              <button
                type="button"
                onClick={closePanel}
                aria-label="Close chapter menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-plum/60 transition-colors hover:bg-blush/60 hover:text-plum"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="max-h-[52vh] space-y-0.5 overflow-y-auto overscroll-contain">
              {chapters.map((chapter) => {
                const isActive = chapter.id === active.id;
                return (
                  <li key={chapter.id}>
                    <button
                      type="button"
                      onClick={() => {
                        closePanel();
                        onSelect(chapter);
                      }}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "flex min-h-11 w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors",
                        isActive
                          ? "bg-blush/70 text-plum"
                          : "text-ink/80 hover:bg-blush/40",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border p-1.5 transition-colors",
                          isActive
                            ? "border-rose-deep/45 bg-cream text-rose-deep"
                            : "border-plum/15 bg-cream/40 text-plum/55",
                        )}
                      >
                        <ChapterSigil name={chapter.id as SigilName} />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-[0.86rem] font-bold leading-tight">
                          {chapter.label}
                        </span>
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-plum/70">
                          {chapter.number} · {chapter.short}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (!open) {
            window.dispatchEvent(
              new CustomEvent("divland:panel-open", { detail: "chapters" }),
            );
          }
          setOpen((prev) => !prev);
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="chapter-menu"
        aria-label={
          open
            ? "Close chapter menu"
            : `Chapter ${active.number}: ${active.label}. Open chapter menu.`
        }
        className="flex min-h-11 items-center gap-2 rounded-full border border-plum/12 bg-cream/90 py-1.5 pl-1.5 pr-3.5 text-plum shadow-[0_14px_30px_-18px_rgba(47,31,46,.6)] transition-colors hover:bg-cream"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-plum p-1.5 text-cream">
          <ChapterSigil name={active.id as SigilName} />
        </span>
        <span className="max-w-[8.5rem] truncate text-[0.68rem] font-extrabold uppercase tracking-[0.14em]">
          {active.short}
        </span>
        <MapDoodle className={cn("h-4 w-4 text-rose-deep transition-transform duration-300", open && "rotate-6")} />
      </button>
    </div>
  );
}

export function ChapterRail({
  active,
  onSelect,
  visible,
}: {
  active: Chapter;
  onSelect: (chapter: Chapter) => void;
  visible: boolean;
}) {
  return (
    <nav
      aria-label="Chapter progress"
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "fixed right-4 top-1/2 z-[90] hidden -translate-y-1/2 flex-col items-center gap-1 transition-opacity duration-500 xl:flex",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <span className="mb-1 h-8 w-px bg-gradient-to-b from-transparent to-plum/20" />
      {chapters.map((chapter) => {
        const isActive = chapter.id === active.id;
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => onSelect(chapter)}
            aria-label={`Go to chapter ${chapter.number}: ${chapter.label}`}
            aria-current={isActive ? "step" : undefined}
            className="group relative flex h-11 w-11 items-center justify-center"
          >
            {isActive ? (
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-deep/40 bg-cream/80 p-1.5 text-rose-deep shadow-[0_0_0_4px_rgba(255,249,240,.4)] transition-all duration-300">
                <ChapterSigil name={chapter.id as SigilName} />
              </span>
            ) : (
              <span className="block h-2 w-2 rounded-full border border-plum/30 bg-cream/60 transition-all duration-300 group-hover:h-2.5 group-hover:w-2.5 group-hover:border-plum/60" />
            )}
            <span className="pointer-events-none absolute right-[calc(100%+10px)] whitespace-nowrap rounded-full bg-plum px-2.5 py-1 text-[0.64rem] font-semibold text-cream opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {chapter.number} · {chapter.short}
            </span>
          </button>
        );
      })}
      <span className="mt-1 h-8 w-px bg-gradient-to-t from-transparent to-plum/20" />
    </nav>
  );
}
