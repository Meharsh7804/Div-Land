"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { StorybookHeading } from "@/components/common/StorybookHeading";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import {
  Flower,
  Heart as HeartArt,
  LeafSprig,
  Sparkle,
  Star4,
  TinyFlower,
} from "@/components/common/Illustrations";
import { letter, letterUi } from "@/data/letter";
import { EASE_CURTAIN, EASE_ENTER, EASE_EXIT, EASE_SCENE } from "@/animations/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, seeded } from "@/lib/utils";

const random = seeded(71);
const dust = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: 4 + random() * 92,
  top: 6 + random() * 84,
  size: 1.5 + random() * 3.5,
  delay: random() * -12,
  duration: 9 + random() * 9,
  opacity: 0.2 + random() * 0.45,
}));

const sparkRandom = seeded(118);
const sealSparks = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 + sparkRandom() * 0.55;
  const distance = 30 + sparkRandom() * 52;
  return {
    id: i,
    tx: Math.cos(angle) * distance,
    ty: Math.sin(angle) * distance - 8,
    size: 2.5 + sparkRandom() * 4,
    delay: Math.round(sparkRandom() * 120),
  };
});

const SEAL_LEFT =
  "polygon(0 0, 56% 0, 50% 16%, 58% 32%, 46% 50%, 57% 68%, 48% 84%, 55% 100%, 0 100%)";
const SEAL_RIGHT =
  "polygon(56% 0, 100% 0, 100% 100%, 55% 100%, 48% 84%, 57% 68%, 46% 50%, 58% 32%, 50% 16%)";

function Candle() {
  return (
    <div aria-hidden className="pointer-events-none absolute bottom-5 left-4 sm:bottom-7 sm:left-7">
      <span className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(255,208,120,.32),transparent_68%)] blur-2xl" />
      <div className="relative flex flex-col items-center">
        <span className="relative mb-1 h-5 w-3 rounded-full bg-[radial-gradient(circle_at_50%_72%,#FFFDF4_0%,#FFE8A1_36%,#FFB25E_76%,#FF8B4A_100%)] shadow-[0_0_20px_7px_rgba(255,208,120,.4)] anim-flame" />
        <span className="h-11 w-3 rounded-[2px] bg-[linear-gradient(180deg,#FFF9F0,#F6DCE7)] shadow-[0_3px_8px_rgba(0,0,0,.25)]">
          <span className="mx-auto mt-1 block h-3 w-px bg-plum/20" />
        </span>
        <span className="mt-0.5 h-2 w-8 rounded-[50%] bg-plum-deep/40 blur-[1px]" />
      </div>
    </div>
  );
}

function EnvelopeScene({
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
      aria-haspopup="dialog"
      aria-expanded={opening}
      className="group relative mx-auto block w-full max-w-[22rem] touch-manipulation text-left transition-transform duration-300 active:scale-[0.985] sm:max-w-[24rem]"
    >
      <span
        aria-hidden
        className={cn(
          "absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-700",
          opening ? "scale-125 bg-butter/30" : "bg-butter/20 group-hover:scale-110 group-hover:bg-butter/25",
        )}
      />

      <span
        className={cn(
          "relative block transition-transform duration-[1100ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)]",
          opening ? "-translate-y-1 scale-[1.055] will-change-transform" : "scale-100",
        )}
      >
        <span className="paper-breeze relative block aspect-[1.52] w-full [perspective:1100px]">
          <span className="absolute inset-0 rounded-[12px] border border-plum/25 bg-[linear-gradient(160deg,#FFFDF8,#FFEFDD)] shadow-[0_30px_54px_-26px_rgba(0,0,0,.8)]" />

          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 z-[1] rounded-[12px] transition-all duration-[900ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)]",
              opening ? "scale-100 opacity-100" : "scale-75 opacity-0",
            )}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,244,203,.92) 0%, rgba(255,208,120,.42) 32%, transparent 66%)",
              mixBlendMode: "screen",
            }}
          />

          <span className="absolute inset-x-0 bottom-0 z-[1] h-[55%] bg-[linear-gradient(180deg,rgba(73,51,72,.08),transparent)]" style={{ clipPath: "polygon(0 10%, 50% 92%, 100% 10%, 100% 100%, 0 100%)" }} />

          <span
            aria-hidden
            className={cn(
              "absolute left-[7%] top-[7%] z-[1] flex h-[86%] w-[86%] flex-col rounded-[6px] border border-plum/10 bg-[#FFFCF6] px-4 py-4 shadow-[0_6px_18px_rgba(73,51,72,.12)] transition-all duration-[900ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)]",
              opening
                ? "-translate-y-[60%] rotate-[-1.8deg] scale-[1.02] opacity-100 [transition-delay:120ms]"
                : "translate-y-[7%] opacity-0 group-hover:-translate-y-[8%] group-hover:opacity-90 group-focus-visible:-translate-y-[8%] group-focus-visible:opacity-90",
            )}
          >
            <span className="flex items-center justify-between border-b border-dashed border-plum/12 pb-2">
              <span className="text-[0.5rem] font-extrabold uppercase tracking-[0.2em] text-plum/35">a letter</span>
              <HeartArt className="h-2.5 w-2.5 text-rose-deep/55" />
            </span>
            <span className="mt-3 font-display text-[0.98rem] leading-snug text-plum/75">{letter.greeting}</span>
            <span className="mt-1 text-[0.7rem] leading-relaxed text-plum/38">
              We met because of a committee interview&hellip;
            </span>
            <span className="mt-auto flex items-end justify-between gap-3">
              <span className="font-hand text-[1.15rem] leading-none text-rose-deep">{letter.signature}</span>
              <span className="h-6 w-6 rounded-full border border-rose-deep/30 bg-blush/30" />
            </span>
          </span>

          <span className="absolute inset-x-0 bottom-0 z-[2] h-[62%] rounded-b-[12px] bg-[linear-gradient(180deg,#FFF8EC,#FFE2CE)]" style={{ clipPath: "polygon(0 22%, 50% 100%, 100% 22%, 100% 100%, 0 100%)" }} />

          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute -inset-8 z-[2] rounded-[2rem] bg-[radial-gradient(circle,rgba(255,240,184,.5),transparent_62%)] blur-2xl transition-all duration-[900ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)]",
              opening ? "scale-100 opacity-100" : "scale-75 opacity-0",
            )}
          />

          <span
            aria-hidden
            className={cn(
              "absolute inset-x-0 top-0 z-[3] h-[64%] origin-top bg-[linear-gradient(180deg,#FFE4CF,#FFD0BE)] shadow-[0_4px_10px_rgba(73,51,72,.18)] transition-transform duration-[900ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(.22,1,.36,1)]",
              opening
                ? "[transform:rotateX(-172deg)]"
                : "[transform:rotateX(0deg)] group-hover:[transform:rotateX(-12deg)]",
            )}
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          />

          <span className="absolute left-1/2 top-[54%] z-[4] h-12 w-12 -translate-x-1/2 transition-transform duration-500 group-hover:scale-105">
            <span
              aria-hidden
              className={cn(
                "absolute inset-[-45%] rounded-full bg-[radial-gradient(circle,rgba(255,208,120,.45),transparent_66%)] blur-md transition-opacity duration-500",
                opening ? "opacity-0" : "anim-breathe opacity-70 group-hover:opacity-100",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFF9F0,#FFD078_58%,transparent_72%)] blur-[2px] transition-all duration-500",
                opening ? "scale-[2.8] opacity-90" : "scale-0 opacity-0",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_38%_28%,#C9809C,#B0708C_58%,#9B5874)] font-display text-lg italic text-cream transition-opacity duration-200",
                opening ? "opacity-0" : "opacity-100",
              )}
            >
              S
              <span className="absolute inset-1 rounded-full border border-cream/25" />
            </span>
            {(["left", "right"] as const).map((side) => (
              <span
                key={side}
                aria-hidden
                className={cn(
                  "absolute inset-0 flex items-center justify-center rounded-full border border-[#9E5C78] bg-[radial-gradient(circle_at_38%_28%,#C9809C,#B0708C_58%,#9B5874)] font-display text-lg italic text-cream shadow-[0_10px_20px_rgba(73,51,72,.28)] transition-all duration-[560ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)]",
                  opening
                    ? side === "left"
                      ? "-translate-x-[78%] -translate-y-[24%] -rotate-[38deg] opacity-0"
                      : "translate-x-[78%] translate-y-[18%] rotate-[34deg] opacity-0"
                    : "translate-x-0 translate-y-0 rotate-0 opacity-100",
                )}
                style={{ clipPath: side === "left" ? SEAL_LEFT : SEAL_RIGHT }}
              >
                S
                <span className="absolute inset-1 rounded-full border border-cream/25" />
              </span>
            ))}
            {opening ? (
              <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0">
                {sealSparks.map((spark) => (
                  <span
                    key={spark.id}
                    className="anim-seal-spark absolute left-0 top-0 rounded-full bg-butter shadow-[0_0_10px_2px_rgba(255,208,120,.6)]"
                    style={
                      {
                        "--tx": `${spark.tx}px`,
                        "--ty": `${spark.ty}px`,
                        width: spark.size,
                        height: spark.size,
                        animationDelay: `${spark.delay}ms`,
                      } as CSSProperties
                    }
                  />
                ))}
              </span>
            ) : null}
          </span>

          <span
            aria-hidden
            className="absolute right-3 top-3 z-[4] flex h-10 w-8 rotate-6 flex-col items-center justify-center gap-0.5 rounded-[2px] border border-dashed border-rose-deep/40 bg-cream/80 text-[0.58rem] font-extrabold uppercase leading-tight tracking-widest text-rose-deep/55"
          >
            with
            <br />
            care
          </span>

          <LeafSprig className="absolute -left-4 bottom-3 z-[5] h-14 w-14 rotate-12 text-sage/60" />
          <Flower className="absolute -right-5 -top-4 z-[5] h-12 w-12 anim-sway" />
          <Star4 className="absolute -left-5 top-5 z-[5] h-3.5 w-3.5 text-butter anim-twinkle" />
          <span aria-hidden className="absolute -bottom-2 left-1/2 h-3 w-[70%] -translate-x-1/2 rounded-full bg-black/40 blur-md" />
        </span>
      </span>

      <span className="mt-5 flex flex-col items-center gap-1 text-center">
        <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.28em] text-cream/45">
          {letter.envelopeTo} · {letter.envelopeFrom}
        </span>
        <span
          className={cn(
            "font-hand text-[1.3rem] leading-none text-butter/75 transition-all duration-500",
            opening ? "-translate-y-1 opacity-0" : "group-hover:translate-y-0.5",
          )}
        >
          tap to break the seal
        </span>
      </span>
    </button>
  );
}

function LetterModal({ onClose, reduceMotion }: { onClose: () => void; reduceMotion: boolean }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
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
      document.body.style.paddingRight = previousBodyPadding;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      id="letter-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="letter-title"
      className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#1B121B]/92 px-3 py-4 sm:px-6 sm:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.2 : 0.4, ease: EASE_EXIT, delay: 0 } }}
      transition={reduceMotion ? { duration: 0.2 } : { duration: 0.95, delay: 0.35, ease: EASE_CURTAIN }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        {reduceMotion ? null : (
          <motion.div
            initial={{ opacity: 0.85, scale: 0.25 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 1.7, ease: EASE_ENTER }}
            className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,244,203,.6),rgba(255,208,120,.2)_38%,transparent_66%)] blur-3xl"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,rgba(255,240,184,.16),transparent_56%)]" />
        <div className="absolute left-1/2 top-0 h-[42rem] w-[min(50rem,140vw)] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,240,184,.18),rgba(255,240,184,.03)_50%,transparent_80%)] [clip-path:polygon(45%_0,55%_0,100%_100%,0_100%)] blur-2xl" />
        {dust.slice(0, 14).map((mote) => (
          <span
            key={mote.id}
            className="absolute rounded-full bg-butter/70 anim-dust"
            style={{
              left: `${mote.left}%`,
              top: `${mote.top}%`,
              width: mote.size,
              height: mote.size,
              opacity: mote.opacity * 0.7,
              animationDuration: `${mote.duration}s`,
              animationDelay: `${mote.delay}s`,
            }}
          />
        ))}
        <Sparkle className="absolute left-[8%] top-[18%] h-4 w-4 text-butter/50 anim-twinkle" />
        <Star4 className="absolute right-[10%] top-[24%] h-3 w-3 text-blush/50 anim-twinkle" style={{ animationDelay: "1.2s" }} />
      </div>

      <div
        ref={panelRef}
        className="relative mx-auto my-auto flex min-h-full w-full max-w-[46rem] items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.2 : 0.35, ease: EASE_EXIT } }}
          transition={reduceMotion ? { duration: 0.2 } : { duration: 0.5, delay: 0.55, ease: EASE_SCENE }}
          style={{ transformOrigin: "top center", perspective: 1600 }}
          className="relative w-full [perspective:1600px]"
        >
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-butter/25 bg-cream/10 p-1.5 text-butter/80">
                <HeartArt className="h-full w-full" />
              </span>
              <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.24em] text-cream/55">
                {letter.eyebrow}
              </span>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={letterUi.close}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 bg-cream/10 text-cream/70 transition-colors hover:bg-cream/20 hover:text-cream"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <motion.div
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { rotateX: -38, scaleY: 0.7, scale: 0.92, y: 36 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { rotateX: 0, scaleY: 1, scale: 1, y: 0 }
            }
            exit={{
              opacity: 0,
              rotateX: reduceMotion ? 0 : 14,
              scaleY: reduceMotion ? 1 : 0.94,
              y: reduceMotion ? 0 : 22,
              transition: { duration: reduceMotion ? 0.2 : 0.4, ease: EASE_EXIT },
            }}
            transition={reduceMotion ? { duration: 0.25, delay: 0.05 } : { duration: 1.2, delay: 0.6, ease: EASE_SCENE }}
            style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
            className="paper relative overflow-hidden rounded-[4px] px-5 pb-8 pt-9 shadow-[0_60px_120px_-30px_rgba(0,0,0,.9)] sm:px-11 sm:pb-12 sm:pt-12"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0 31px, rgba(73,51,72,.045) 31px 32px)",
              }}
            />
            <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-rose/25" />
            <span aria-hidden className="absolute inset-x-0 top-[33.3%] h-px bg-plum/8" />
            <span aria-hidden className="absolute inset-x-0 top-[66.6%] h-px bg-plum/8" />
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(73,51,72,.05),transparent_8%,transparent_92%,rgba(73,51,72,.05))]" />

            <button
              type="button"
              onClick={onClose}
              aria-label={letterUi.close}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-plum/12 bg-cream/70 text-plum/50 backdrop-blur transition-colors hover:bg-cream-soft hover:text-plum sm:right-5 sm:top-5"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <motion.div
              initial={reduceMotion ? false : "hidden"}
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: reduceMotion ? 0 : 1.05 } },
              }}
              className="relative"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                }}
                className="flex items-start justify-between gap-5 border-b border-dashed border-plum/15 pb-4"
              >
                <div>
                  <p className="eyebrow text-rose-deep/65">a letter for sonu</p>
                  <h3 id="letter-title" className="mt-1 font-display text-[clamp(1.6rem,5vw,2.35rem)] italic leading-tight text-plum">
                    For the quiet moments.
                  </h3>
                </div>
                <div className="hidden shrink-0 flex-col items-center sm:flex">
                  <Flower className="h-10 w-10" />
                  <span className="hand mt-0.5 text-lg text-rose-deep/70">for you</span>
                </div>
              </motion.div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="mt-6 font-hand text-[1.9rem] leading-none text-rose-deep sm:text-[2.15rem]"
              >
                {letter.greeting}
              </motion.p>

              <div className="mt-5 max-w-[62ch] space-y-[1.15rem]">
                {letter.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 14, filter: "blur(3px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.7, ease: EASE_ENTER },
                      },
                    }}
                    className="font-display text-[1.06rem] font-medium leading-[1.82] text-ink/85 sm:text-[1.13rem] sm:leading-[1.86]"
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
                className="mt-8 border-t border-dashed border-plum/15 pt-5"
              >
                <p className="font-display text-[1.5rem] italic leading-tight text-plum sm:text-[1.7rem]">
                  {letter.closing}
                </p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-plum/35">Meharsh,</p>
                    <p className="font-hand text-[1.7rem] leading-tight text-rose-deep sm:text-[1.95rem]">
                      {letter.signature}
                    </p>
                  </div>
                  <div className="relative flex h-14 w-14 shrink-0 -rotate-12 items-center justify-center rounded-full border-2 border-rose-deep/35 bg-blush/30 font-display text-xl italic text-rose-deep shadow-sm sm:h-16 sm:w-16">
                    S
                    <span className="absolute inset-1 rounded-full border border-rose-deep/20" />
                  </div>
                </div>
                <p className="hand mt-4 text-[1.18rem] text-plum/50">{letter.postscript}</p>
              </motion.div>
            </motion.div>

            <div className="relative mt-7 flex flex-col items-center justify-between gap-3 border-t border-dashed border-plum/15 pt-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <TinyFlower className="h-3.5 w-3.5 text-rose/60" />
                <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-plum/35">
                  {letterUi.revealNote}
                </p>
              </div>
              <button type="button" onClick={onClose} className="btn-ghost min-h-11 text-[0.78rem]">
                <HeartArt className="h-3.5 w-3.5 text-rose-deep" />
                {letterUi.close}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function LetterSection() {
  const audio = useAudioExperience();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const handleOpen = useCallback(() => {
    if (opening || open) return;
    audio.playSfx("envelope");
    setPortalReady(true);
    setOpening(true);
    setOpen(true);
    if (reduceMotion) return;
    timer.current = window.setTimeout(() => audio.playSfx("spark"), 280);
  }, [audio, opening, open, reduceMotion]);

  const handleClose = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    audio.playSfx("page");
    setOpen(false);
    setOpening(false);
  }, [audio]);

  return (
    <section
      id="chapter-letter"
      aria-labelledby="letter-section-title"
      className="story-scene bg-[radial-gradient(ellipse_at_50%_18%,#3D2739_0%,#2A1C29_52%,#1B121B_100%)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_86%,rgba(255,208,120,.16),transparent_38%)]" />
        <div className="absolute left-1/2 top-0 h-[38rem] w-[min(50rem,140vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,240,184,.16),transparent_66%)]" />
        <div className="absolute left-[4%] top-[8%] h-28 w-28 rotate-12 text-sage/20">
          <LeafSprig className="h-full w-full" />
        </div>
        <div className="absolute bottom-[6%] right-[5%] h-32 w-32 -rotate-12 text-sage/18">
          <LeafSprig className="h-full w-full" />
        </div>
        <Flower className="absolute left-[9%] top-[28%] h-6 w-6 opacity-30 anim-sway" />
        <Flower className="absolute bottom-[17%] right-[12%] h-5 w-5 opacity-25 anim-sway" style={{ animationDelay: "-2s" }} />
        <TinyFlower className="absolute right-[20%] top-[24%] h-4 w-4 text-blush/35 anim-sway" />
        <Star4 className="absolute right-[22%] top-[30%] h-3 w-3 text-butter/60 anim-twinkle" />
        <Sparkle className="absolute left-[16%] top-[18%] h-3.5 w-3.5 text-butter/40 anim-twinkle" style={{ animationDelay: "1.4s" }} />
        {dust.map((mote) => (
          <span
            key={mote.id}
            className="absolute rounded-full bg-butter/70 anim-dust"
            style={{
              left: `${mote.left}%`,
              top: `${mote.top}%`,
              width: mote.size,
              height: mote.size,
              opacity: mote.opacity,
              animationDuration: `${mote.duration}s`,
              animationDelay: `${mote.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="section-shell relative">
        <StorybookHeading
          id="letter-section-title"
          number="07"
          label="A Letter for Sonu"
          title={letter.title}
          note={letter.script}
          tone="light"
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE_ENTER }}
          className="relative mx-auto mt-7 w-full max-w-[34rem] sm:mt-9"
        >
          <div className="relative overflow-hidden rounded-[1.4rem] border border-butter/15 bg-[linear-gradient(180deg,#33222F_0%,#2A1C29_66%,#1E141C_100%)] px-4 pb-24 pt-8 shadow-[0_44px_100px_-40px_rgba(0,0,0,.9)] sm:px-8 sm:pb-28 sm:pt-10">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-[62%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,240,184,.15),transparent_64%)]" />
              <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,#3A2737,#241821)]" />
              <div className="absolute inset-x-0 bottom-[34%] h-px bg-butter/15" />
              <div className="absolute inset-x-0 bottom-[32%] h-6 bg-[linear-gradient(180deg,rgba(30,20,28,.15),rgba(30,20,28,.55))]" />
              <div className="absolute left-1/2 top-0 h-[28rem] w-[min(30rem,90%)] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,240,184,.12),transparent_72%)] [clip-path:polygon(45%_0,55%_0,100%_100%,0_100%)] blur-xl" />
              <Flower className="absolute bottom-20 right-5 h-10 w-10 opacity-55 anim-sway" />
              <TinyFlower className="absolute bottom-16 right-16 h-5 w-5 text-lavender/50 anim-sway" style={{ animationDelay: "-1.8s" }} />
              <Star4 className="absolute left-7 top-8 h-2.5 w-2.5 text-butter/60 anim-twinkle" />
            </div>

            <Candle />

            <div className="relative mx-auto w-full max-w-[24rem] pt-2">
              <EnvelopeScene opening={opening} onOpen={handleOpen} />
            </div>

            <div className="relative mt-5 flex flex-col items-center gap-2 text-center">
              <button
                type="button"
                onClick={handleOpen}
                aria-haspopup="dialog"
                aria-expanded={opening}
                className="btn-magic min-h-[3.1rem] text-[0.88rem]"
              >
                <HeartArt className="h-4 w-4 text-butter" />
                {letterUi.open}
              </button>
              <p className="max-w-xs text-[0.74rem] leading-relaxed text-cream/45">
                {letter.hint} Some things deserve to be read slowly.
              </p>
            </div>
          </div>

          <p className="mt-4 text-center text-[0.55rem] font-extrabold uppercase tracking-[0.24em] text-cream/25">
            sealed by hand · no return address needed
          </p>
        </motion.div>
      </div>

      {portalReady && typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open ? <LetterModal key="letter" onClose={handleClose} reduceMotion={reduceMotion} /> : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
