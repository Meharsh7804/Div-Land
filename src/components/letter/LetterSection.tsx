"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Flower, Heart as HeartArt, LeafSprig, Star4 } from "@/components/common/Illustrations";
import { letter, letterUi } from "@/data/letter";
import { EASE_ENTER } from "@/animations/motion";

function EnvelopeLarge({
  opening,
  onOpen,
}: {
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open the letter for Sonu"
      className="group relative mx-auto flex w-full max-w-[21rem] flex-col items-center transition-transform duration-300 active:scale-[0.98] sm:max-w-[25rem]"
    >
      <span aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-butter/40 blur-3xl transition-opacity group-hover:opacity-90" />
      <span className="relative block aspect-[19/12.5] w-full max-w-[19rem] [perspective:900px] sm:aspect-auto sm:h-[15rem] sm:w-[23rem] sm:max-w-none">
        <span className="absolute inset-0 rounded-[12px] border border-plum/20 bg-gradient-to-b from-[#FFFDF8] to-[#FFEFDD] shadow-[0_28px_50px_-26px_rgba(47,31,46,.5)]" />
        <span
          aria-hidden
          className={`absolute left-1/2 top-[9%] z-[1] flex h-[84%] w-[88%] -translate-x-1/2 flex-col whitespace-pre-line rounded-[7px] border border-plum/10 bg-[#FFFCF6] px-4 py-4 font-display text-[1rem] leading-relaxed text-plum/70 shadow-sm transition-all duration-[800ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)] sm:text-[1.1rem] ${
            opening
              ? "-translate-y-[64%] rotate-[-1deg]"
              : "translate-y-[6%] opacity-0 group-hover:-translate-y-[10%] group-hover:opacity-90"
          }`}
        >
          <span>{letter.greeting}</span>
          <span className="mt-1 text-[0.8em] leading-snug text-plum/45">
            This friendship started with a committee interview&hellip;
          </span>
          <span className="mt-auto flex items-end justify-between">
            <span className="font-hand text-[1.2rem] text-rose-deep">{letter.signature}</span>
            <HeartArt className="h-3 w-3 text-rose" />
          </span>
        </span>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-[2] h-[60%] rounded-b-[12px] bg-gradient-to-b from-[#FFF8EC] to-[#FFE6D2]"
          style={{ clipPath: "polygon(0 24%, 50% 100%, 100% 24%, 100% 100%, 0 100%)" }}
        />
        <span
          aria-hidden
          className={`absolute inset-x-0 top-0 z-[3] h-[62%] origin-top bg-gradient-to-b from-[#FFE4CF] to-[#FFD0BE] shadow-sm transition-transform duration-[900ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(.6,-0.2,.3,1.2)] ${
            opening ? "[transform:rotateX(-170deg)]" : "[transform:rotateX(0deg)]"
          }`}
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        />
        <span
          aria-hidden
          className={`absolute left-1/2 top-[56%] z-[4] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#9E5C78] bg-rose-deep font-display text-lg italic text-cream shadow-lg transition-all duration-500 ${
            opening ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          S
          <span className="absolute inset-1 rounded-full border border-cream/25" />
        </span>
        <span
          aria-hidden
          className="absolute right-3 top-3 z-[4] flex h-10 w-8 rotate-6 flex-col items-center justify-center gap-0.5 rounded-[2px] border border-dashed border-rose-deep/40 bg-cream/80 text-[0.64rem] font-extrabold uppercase leading-tight tracking-widest text-rose-deep/60"
        >
          with
          <br />
          care
        </span>
        <span aria-hidden className="absolute -left-3 bottom-2 z-[5] h-10 w-10 text-plum/60">
          <LeafSprig className="h-full w-full" />
        </span>
        <Flower className="absolute -right-6 -top-4 z-[5] h-12 w-12 anim-sway" />
        <Star4 className="absolute -left-5 top-5 z-[5] h-3.5 w-3.5 text-butter anim-twinkle" />
      </span>

      <span className="mt-3 flex flex-col items-center gap-1">
        <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.3em] text-plum/45">
          {letter.envelopeTo} · {letter.envelopeFrom}
        </span>
        <span className="font-hand text-[1.35rem] text-rose-deep transition-transform group-hover:translate-y-0.5">
          tap to break the seal
        </span>
      </span>
    </button>
  );
}

function LetterModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="letter-title"
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-[#2F1F2E]/80 px-3 py-4 sm:items-center sm:px-6 sm:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 50, scale: 0.94, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.7, ease: EASE_ENTER }}
        style={{ transformOrigin: "top center", perspective: 1200 }}
        className="relative my-auto w-full max-w-[46rem] shrink-0"
      >
        <div className="deckle paper relative overflow-hidden rounded-[4px] px-5 pb-8 pt-10 shadow-[0_50px_100px_-30px_rgba(0,0,0,.6)] sm:px-12 sm:pb-12 sm:pt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 32px, rgba(73,51,72,.045) 32px 33px)",
            }}
          />
          <span className="absolute left-0 top-0 h-full w-[3px] bg-rose/25" />

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={letterUi.close}
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-plum/15 bg-cream text-plum/65 transition-colors hover:bg-cream-soft hover:text-plum sm:right-5 sm:top-5"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative">
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-plum/15 pb-4">
              <div>
                <p className="eyebrow text-rose-deep/75">a letter for sonu</p>
                <h3 id="letter-title" className="mt-1 font-display text-[clamp(1.6rem,5vw,2.4rem)] italic leading-tight text-plum">
                  A few things I wanted to say.
                </h3>
              </div>
              <div className="hidden shrink-0 flex-col items-center sm:flex">
                <Flower className="h-10 w-10" />
                <span className="hand text-lg text-rose-deep/70">for you</span>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
              }}
              className="pt-6"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="font-hand text-[1.8rem] leading-none text-rose-deep sm:text-[2.1rem]"
              >
                {letter.greeting}
              </motion.p>

              <div className="mt-4 space-y-[1.05rem]">
                {letter.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: EASE_ENTER },
                      },
                    }}
                    className="font-display text-[1.05rem] font-medium leading-[1.72] text-ink/85 sm:text-[1.16rem] sm:leading-[1.75]"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
                className="mt-7 border-t border-dashed border-plum/15 pt-5"
              >
                <p className="font-display text-[1.45rem] italic leading-tight text-plum sm:text-[1.7rem]">
                  {letter.closing}
                </p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-plum/35">
                      yours,
                    </p>
                    <p className="font-hand text-[1.6rem] leading-tight text-rose-deep sm:text-[1.9rem]">
                      {letter.signature}
                    </p>
                  </div>
                  <div className="relative flex h-14 w-14 shrink-0 -rotate-12 items-center justify-center rounded-full border-2 border-rose-deep/35 bg-blush/30 font-display text-xl italic text-rose-deep shadow-sm sm:h-16 sm:w-16">
                    S
                    <span className="absolute inset-1 rounded-full border border-rose-deep/20" />
                  </div>
                </div>
                <p className="hand mt-4 text-[1.2rem] text-plum/55">
                  {letter.postscript}
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative mt-7 flex flex-col items-center justify-between gap-3 border-t border-dashed border-plum/15 pt-4 sm:flex-row">
            <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-plum/35">
              {letterUi.revealNote}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost min-h-11 text-[0.78rem]"
            >
              <HeartArt className="h-3.5 w-3.5 text-rose-deep" />
              {letterUi.close}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LetterSection() {
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const handleOpen = useCallback(() => {
    if (opening || open) return;
    setOpening(true);
    timer.current = window.setTimeout(() => {
      setOpen(true);
      setOpening(false);
    }, 750);
  }, [opening, open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <section
      id="chapter-letter"
      aria-labelledby="letter-section-title"
      className="relative overflow-hidden bg-cream section-pad"
    >
      <div aria-hidden data-parallax={-3} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(246,220,231,.55),transparent_60%)]" />
        <div className="absolute left-1/2 top-0 h-[38rem] w-[min(50rem,140vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,240,184,.45),transparent_66%)]" />
        <div className="absolute left-[4%] top-[8%] h-24 w-24 rotate-12 text-sage/40">
          <LeafSprig className="h-full w-full" />
        </div>
        <div className="absolute bottom-[6%] right-[5%] h-28 w-28 -rotate-12 text-sage/35">
          <LeafSprig className="h-full w-full" />
        </div>
        <div className="absolute right-[10%] top-[14%] h-24 w-24 rounded-full border-[6px] border-rose/10 opacity-70" />
        <div className="absolute right-[11.5%] top-[16.5%] h-20 w-20 rounded-full border border-rose/10 opacity-70" />
        <Flower className="absolute left-[12%] top-[26%] h-6 w-6 opacity-50 anim-sway" />
        <Flower className="absolute bottom-[16%] left-[18%] h-4 w-4 opacity-40 anim-sway" style={{ animationDelay: "-2s" }} />
        <Star4 className="absolute right-[22%] top-[30%] h-3 w-3 text-butter anim-twinkle" />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          number="07"
          sceneId="letter"
          eyebrow={letter.eyebrow}
          title={<span id="letter-section-title">{letter.title}</span>}
          script={letter.script}
        />

        <Reveal delay={0.12} className="mt-10 sm:mt-14">
          <div data-parallax={1.5} className="mx-auto max-w-2xl">
            <div className="relative rounded-[2rem] border border-plum/10 bg-[#FFFCF6]/80 px-4 py-8 shadow-[0_30px_70px_-50px_rgba(47,31,46,.55)] sm:px-10 sm:py-10">
              <span className="tape left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg]" />
              <EnvelopeLarge opening={opening} onOpen={handleOpen} />

              <div className="mt-7 flex flex-col items-center gap-3 border-t border-dashed border-plum/12 pt-6 text-center">
                <p className="max-w-sm text-[0.82rem] leading-relaxed text-ink/60">
                  {letter.hint} Some things deserve to be read slowly.
                </p>
                <button
                  type="button"
                  onClick={handleOpen}
                  className="btn-magic min-h-[3.1rem] text-[0.88rem]"
                >
                  <HeartArt className="h-4 w-4 text-butter" />
                  {letterUi.open}
                </button>
                <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.22em] text-plum/30">
                  sealed by hand · no return address needed
                </p>
              </div>
            </div>

            <p className="mx-auto mt-5 max-w-md text-center font-hand text-[1.35rem] leading-tight text-plum/50">
              &ldquo;You&apos;ll scold someone for skipping a meal, then ask to
              be fed.&rdquo;
            </p>
          </div>
        </Reveal>
      </div>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open ? <LetterModal key="letter" onClose={handleClose} /> : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
