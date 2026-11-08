"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Cloud as CloudArt, Sparkle } from "@/components/common/Illustrations";
import { EASE_ENTER } from "@/animations/motion";
import { smileMessages, smileUi } from "@/data/smile";
import { makeBag } from "@/lib/utils";

export function SmileButton({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(smileMessages[0]);
  const bag = useRef<string[]>([]);
  const last = useRef(smileMessages[0]);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const nextMessage = () => {
    if (bag.current.length === 0) {
      bag.current = makeBag(smileMessages.filter((m) => m !== last.current));
    }
    const picked = bag.current.pop() ?? smileMessages[0];
    last.current = picked;
    setMessage(picked);
  };

  const openPanel = () => {
    nextMessage();
    setOpen(true);
    window.dispatchEvent(
      new CustomEvent("divland:panel-open", { detail: "smile" }),
    );
  };

  const closePanel = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
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
      if ((event as CustomEvent<string>).detail !== "smile") setOpen(false);
    };
    window.addEventListener("divland:panel-open", onOtherPanel);
    return () => window.removeEventListener("divland:panel-open", onOtherPanel);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-3 right-3 z-[93] flex flex-col items-end gap-2 sm:bottom-5 sm:right-5"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="smile-pocket"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.32, ease: EASE_ENTER }}
            role="dialog"
            aria-modal="false"
            aria-label={smileUi.title}
            className="relative w-[min(20.5rem,calc(100vw-1.5rem))] overflow-hidden rounded-[1.6rem] border border-plum/12 bg-cream/97 shadow-[0_30px_70px_-24px_rgba(47,31,46,.6)]"
          >
            <div
              aria-hidden
              className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-butter/70 blur-2xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-lavender/60 blur-2xl"
            />
            <div className="relative p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow text-rose-deep">{smileUi.label}</p>
                  <h3 className="font-display text-2xl italic leading-tight text-plum">
                    {smileUi.title}
                  </h3>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closePanel}
                  aria-label="Close the smile pocket"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-plum/55 transition-colors hover:bg-blush/60 hover:text-plum"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <motion.p
                key={message}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_ENTER }}
                className="mt-4 min-h-[6.5rem] font-display text-[1.35rem] leading-snug text-plum"
                aria-live="polite"
              >
                &ldquo;{message}&rdquo;
              </motion.p>

              <div className="mt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={nextMessage}
                  className="btn-ghost min-h-11 text-[0.78rem]"
                >
                  <Sparkle className="h-3.5 w-3.5 text-rose-deep" />
                  {smileUi.hint}
                </button>
                <span className="hand text-lg text-rose-deep/80">
                  on the house
                </span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? closePanel() : openPanel())}
        whileTap={{ scale: 0.94 }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="smile-pocket"
        aria-label={open ? "Close the smile pocket" : smileUi.label}
        className="group flex min-h-12 items-center gap-2 rounded-full border border-plum/12 bg-cream/92 py-1.5 pl-1.5 pr-4 text-plum shadow-[0_16px_34px_-18px_rgba(47,31,46,.65)]"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-lavender/80">
          <CloudArt className="h-5 w-5 text-plum" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-butter anim-twinkle" />
        </span>
        <span className="text-left text-[0.68rem] font-extrabold uppercase leading-tight tracking-[0.1em]">
          <span className="sm:hidden">smile?</span>
          <span className="hidden sm:inline">
            need a little
            <br />
            smile?
          </span>
        </span>
      </motion.button>
    </div>
  );
}
