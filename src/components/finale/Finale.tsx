"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { StorybookHeading } from "@/components/common/StorybookHeading";
import { CatSticker } from "@/components/cats/CatSticker";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { SparkleField } from "@/components/common/Ambient";
import {
  Balloon,
  ChatBubbleArt,
  CoffeeCup,
  Flower,
  GiftArt,
  Heart,
  HeartHandsArt,
  LeafSprig,
  MealArt,
  MoonArt,
  Sparkle,
  Star4,
  WindArt,
} from "@/components/common/Illustrations";
import { finale } from "@/data/gallery";
import { EASE_ENTER } from "@/animations/motion";
import { useConfetti } from "@/hooks/useConfetti";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, seeded } from "@/lib/utils";

const CANDLE_COUNT = 3;
const SPRINKLE_COLORS = ["#C98EA8", "#FFF9F0", "#493348", "#B0708C", "#FFF0B8"];
const random = seeded(24);
const sprinkles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: 6 + random() * 86,
  top: 36 + random() * 54,
  rotate: Math.round(random() * 180),
  color: SPRINKLE_COLORS[i % SPRINKLE_COLORS.length],
  wide: random() > 0.5,
}));

const giftTokens = [
  { icon: CoffeeCup, label: "coffee", tone: "border-butter/45 bg-butter text-plum" },
  { icon: MealArt, label: "food", tone: "border-blush/45 bg-blush text-rose-deep" },
  { icon: ChatBubbleArt, label: "conversations", tone: "border-lavender/45 bg-lavender text-plum" },
  { icon: HeartHandsArt, label: "pampering", tone: "border-rose/45 bg-rose text-cream" },
];

function Bunting() {
  const flags = ["#F6DCE7", "#FFF0B8", "#DCD5F5", "#FFDCCB", "#C98EA8"];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden">
      <div className="relative flex w-[120%] max-w-none justify-between px-2">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="absolute inset-x-0 top-2 h-8 w-full">
          <path d="M0 4 Q300 44 600 18 T1200 4" fill="none" stroke="#FFF0B8" strokeWidth="1.5" opacity=".38" />
        </svg>
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="relative mt-3 h-5 w-8 opacity-70 sm:h-7 sm:w-10"
            style={{
              background: flags[i % flags.length],
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: `translateY(${Math.sin((i / 14) * Math.PI) * 10}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Candle({
  index,
  lit,
  blown,
  onLight,
}: {
  index: number;
  lit: boolean;
  blown: boolean;
  onLight: () => void;
}) {
  const canLight = !lit && !blown;

  return (
    <button
      type="button"
      onClick={onLight}
      disabled={!canLight}
      aria-label={
        blown
          ? `Candle ${index + 1}, blown out`
          : lit
            ? `Candle ${index + 1}, lit`
            : `Light candle ${index + 1}`
      }
      aria-pressed={lit}
      className="group/candle relative flex h-24 w-12 touch-manipulation flex-col items-center justify-end rounded-xl focus-visible:outline-offset-4 disabled:cursor-default sm:w-14"
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-1 top-0 bottom-0 rounded-xl border transition-colors duration-300",
          canLight
            ? "border-butter/0 group-hover/candle:border-butter/30 group-hover/candle:bg-butter/5"
            : "border-transparent",
        )}
      />

      <span className="relative mb-0.5 flex h-8 w-6 items-end justify-center">
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 left-1/2 h-5 w-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_72%,#FFFDF4_0%,#FFE8A1_38%,#FFB25E_78%,#FF8B4A_100%)] shadow-[0_0_16px_5px_rgba(255,208,120,.55)] transition-all duration-500",
            lit && !blown ? "scale-100 opacity-100 anim-flame" : "scale-0 opacity-0",
          )}
          style={{ animationDelay: `${index * 0.18}s` }}
        >
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#7E9CFF]/70" />
        </span>

        {!lit && !blown ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-dashed border-butter/40 text-butter/70 transition-all duration-300 group-hover/candle:scale-110 group-hover/candle:border-butter/80 group-hover/candle:text-butter">
            <Sparkle className="h-2.5 w-2.5" />
          </span>
        ) : null}

        {blown
          ? [0, 1].map((puff) => (
              <span
                key={puff}
                aria-hidden
                className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cream/45 blur-[2px]"
                style={{
                  animation: "steam-rise 2.6s ease-out forwards",
                  animationDelay: `${0.1 + puff * 0.45 + index * 0.06}s`,
                  animationIterationCount: 2,
                }}
              />
            ))
          : null}
      </span>

      <span
        aria-hidden
        className="relative block h-11 w-2.5 rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,.18)]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #FFF9F0 0 4px, #F6DCE7 4px 8px)",
        }}
      >
        <span className="absolute -left-1 top-1/2 h-0.5 w-1 rounded-full bg-plum/25" />
        <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-plum/30" />
      </span>
    </button>
  );
}

function Cake({
  cakeRef,
  lit,
  blown,
  onLight,
}: {
  cakeRef: React.RefObject<HTMLDivElement | null>;
  lit: boolean[];
  blown: boolean;
  onLight: (index: number) => void;
}) {
  const litCount = lit.filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: EASE_ENTER }}
      className="relative mx-auto mt-8 w-full max-w-[27rem] sm:mt-12"
    >
      <motion.div
        aria-hidden
        animate={{ opacity: blown ? 0.2 : litCount > 0 ? 0.55 + litCount * 0.15 : 0.2 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/3 rounded-full bg-butter/30 blur-3xl sm:h-80 sm:w-80"
      />

      <div ref={cakeRef} className="relative mx-auto w-[88%]">
        <div className="relative pt-[6.4rem] sm:pt-[6.8rem]">
          <div className="absolute inset-x-0 top-0 mx-auto flex h-[6.4rem] w-full items-end justify-center gap-7 sm:gap-9">
            {lit.map((isLit, index) => (
              <Candle
                key={index}
                index={index}
                lit={isLit}
                blown={blown}
                onLight={() => onLight(index)}
              />
            ))}
          </div>

          <div className="relative mx-auto h-[3.7rem] w-[58%] rounded-t-[0.7rem] bg-gradient-to-b from-[#FFF3C4] to-[#F4DC94] shadow-[inset_0_-14px_24px_rgba(180,140,60,.18)] sm:h-[4.4rem]">
            <span className="absolute -top-2 inset-x-0 flex justify-around px-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="h-4 w-4 rounded-full bg-[#FFF9F0] shadow-sm" />
              ))}
            </span>
            <span className="absolute left-1/2 top-1/2 flex h-8 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-plum/10 bg-cream/85 font-hand text-[1.1rem] text-rose-deep/80">
              sonu
            </span>
            <span className="absolute inset-x-0 bottom-0 h-2 rounded-b-[0.4rem] bg-plum/5" />
          </div>

          <div className="relative mx-auto -mt-1 h-[4.6rem] w-[80%] rounded-t-[0.9rem] bg-gradient-to-b from-[#E7E1FB] to-[#CFC4F0] shadow-[inset_0_-16px_28px_rgba(90,70,140,.16)] sm:h-[5.6rem]">
            <span className="absolute -top-2 inset-x-0 flex justify-around px-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="h-4 w-4 rounded-full bg-[#FFF9F0] shadow-sm" />
              ))}
            </span>
            <span className="absolute left-[18%] top-1/3 h-5 w-3 rounded-b-full bg-[#FFF9F0]" />
            <span className="absolute right-[24%] top-1/4 h-6 w-3 rounded-b-full bg-[#FFF9F0]" />
            <div className="absolute inset-0 overflow-hidden">
              {sprinkles.slice(0, 8).map((s) => (
                <span
                  key={s.id}
                  className="absolute h-1 rounded-full"
                  style={{
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    width: s.wide ? 10 : 6,
                    background: s.color,
                    transform: `rotate(${s.rotate}deg)`,
                    opacity: 0.75,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative mx-auto -mt-1 h-[5.4rem] w-full rounded-t-[1.1rem] bg-gradient-to-b from-[#FBDDE9] to-[#F0C3D7] shadow-[inset_0_-18px_30px_rgba(160,80,110,.14)] sm:h-[6.6rem]">
            <span className="absolute -top-2 inset-x-0 flex justify-around px-2">
              {Array.from({ length: 11 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-4 w-4 rounded-full bg-[#FFF9F0] shadow-sm",
                    i === 3 && "h-6 w-4 rounded-b-full",
                    i === 7 && "h-5 w-4 rounded-b-full",
                  )}
                />
              ))}
            </span>
            <div className="absolute inset-0 overflow-hidden">
              {sprinkles.slice(8).map((s) => (
                <span
                  key={s.id}
                  className="absolute h-1 rounded-full"
                  style={{
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    width: s.wide ? 11 : 7,
                    background: s.color,
                    transform: `rotate(${s.rotate}deg)`,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
            <span className="absolute inset-x-0 bottom-0 h-2 rounded-b-[0.5rem] bg-plum/5" />
          </div>
        </div>

        <div className="relative -mt-1 h-4">
          <div className="absolute left-1/2 top-0 h-4 w-[112%] -translate-x-1/2 rounded-[50%] border border-plum/10 bg-gradient-to-b from-[#FFFDF8] to-[#F0E2D2] shadow-[0_22px_28px_-16px_rgba(0,0,0,.75)]" />
        </div>
        <div className="mx-auto mt-3 h-1.5 w-[74%] rounded-full bg-black/25 blur-md" />

        <CatSticker
          art="party"
          label="Say hello to the birthday cat"
          bubble="make a wish"
          bubbleSide="left"
          interactive
          motion="bob"
          delay={-1.4}
          className="absolute -bottom-2 -right-7 z-20 w-16 sm:-right-9 sm:w-20"
        />
      </div>

      <div className="relative mt-5 flex flex-col items-center gap-2 sm:mt-7">
        <div className="flex items-center gap-2">
          {lit.map((isLit, index) => (
            <span
              key={index}
              aria-hidden
              className={cn(
                "h-1.5 w-6 rounded-full transition-all duration-500",
                isLit ? "bg-butter shadow-[0_0_10px_rgba(255,240,184,.5)]" : "bg-cream/15",
                blown && "bg-cream/10 shadow-none",
              )}
            />
          ))}
        </div>
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-cream/55" aria-live="polite">
          {blown
            ? "one wish, officially sent"
            : litCount === CANDLE_COUNT
              ? finale.wishPrompt
              : finale.candleHint}
        </p>
      </div>
    </motion.div>
  );
}

function HoldToBlow({
  disabled,
  reduced,
  onComplete,
}: {
  disabled: boolean;
  reduced: boolean;
  onComplete: () => void;
}) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);
  const startedAt = useRef(0);
  const completed = useRef(false);
  const duration = reduced ? 420 : 1400;

  const stop = useCallback((reset = true) => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    setHolding(false);
    if (reset && !completed.current) setProgress(0);
  }, []);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const begin = useCallback(() => {
    if (disabled || completed.current) return;
    stop(false);
    setHolding(true);
    startedAt.current = performance.now();

    const tick = (now: number) => {
      const next = Math.min(1, (now - startedAt.current) / duration);
      setProgress(next);
      if (next >= 1) {
        completed.current = true;
        setHolding(false);
        frame.current = null;
        onComplete();
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
  }, [disabled, duration, onComplete, stop]);

  const end = useCallback(() => {
    if (completed.current) return;
    stop();
  }, [stop]);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        disabled={disabled}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          begin();
        }}
        onPointerUp={end}
        onPointerCancel={end}
        onLostPointerCapture={end}
        onKeyDown={(event) => {
          if ((event.key === " " || event.key === "Enter") && !event.repeat) {
            event.preventDefault();
            begin();
          }
        }}
        onKeyUp={(event) => {
          if (event.key === " " || event.key === "Enter") end();
        }}
        aria-label={finale.holdPrompt}
        className={cn(
          "btn-magic relative min-h-[3.4rem] min-w-[17rem] touch-none select-none overflow-hidden text-[0.92rem]",
          holding && "scale-[0.99]",
        )}
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 origin-left bg-butter/30 transition-[width] duration-75"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
        <WindArt className="relative h-4 w-4 text-butter" />
        <span className="relative">{holding ? "blowing…" : finale.holdPrompt}</span>
      </button>
      <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.2em] text-cream/50">
        {finale.blowPrompt}
      </p>
    </div>
  );
}

function MessageCard({ giftRef, giftOpen, onOpenGift }: {
  giftRef: React.RefObject<HTMLDivElement | null>;
  giftOpen: boolean;
  onOpenGift: () => void;
}) {
  return (
    <motion.div
      key="wish"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.8, ease: EASE_ENTER }}
      className="mx-auto mt-9 max-w-2xl text-center sm:mt-12"
    >
      <div className="flex items-center justify-center gap-2">
        <Sparkle className="h-4 w-4 text-butter" />
        <p className="font-display text-[1.25rem] italic text-butter sm:text-[1.45rem]">
          {finale.blownPrompt}
        </p>
        <Sparkle className="h-4 w-4 text-butter" />
      </div>

      <div className="paper relative mt-6 overflow-hidden rounded-[1.2rem] border border-butter/25 px-5 py-7 sm:px-9 sm:py-9">
        <span className="tape-rose left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-[-1.5deg]" />
        <p className="eyebrow text-rose-deep/75">the official birthday headline</p>
        <motion.h3
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE_ENTER }}
          className="mt-2 font-display text-[clamp(2rem,7vw,3.6rem)] font-medium italic leading-[1.02] text-plum"
        >
          {finale.messageTitle}
        </motion.h3>

        <motion.div
          className="mt-5 space-y-2"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
          }}
        >
          {finale.message.map((line) => (
            <motion.p
              key={line}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_ENTER } },
              }}
              className="font-display text-[1.02rem] leading-relaxed text-plum/80 sm:text-[1.1rem]"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <p className="mt-5 font-hand text-[1.45rem] text-rose-deep sm:text-[1.65rem]">
          {finale.signature}
        </p>
      </div>

      <div ref={giftRef} className="relative mt-6">
        <div className="rounded-[1.2rem] border border-dashed border-butter/30 bg-cream/[0.05] p-4 sm:p-6">
          <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.24em] text-butter/70">
            {finale.giftLabel}
          </p>

          <AnimatePresence initial={false} mode="wait">
            {!giftOpen ? (
              <motion.button
                key="sealed"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={onOpenGift}
                className="group mt-3 flex w-full flex-col items-center gap-3 rounded-[0.9rem] border border-cream/10 bg-cream/[0.05] px-4 py-6 transition-colors hover:bg-cream/[0.09]"
              >
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-butter/40 bg-butter/10 text-butter transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                  <GiftArt className="h-8 w-8" />
                  <span className="absolute inset-0 rounded-full border border-butter/20 anim-breathe" />
                </span>
                <span className="font-hand text-[1.35rem] text-cream/85">unbox it</span>
                <span className="text-[0.54rem] font-extrabold uppercase tracking-[0.22em] text-cream/45">
                  {finale.giftTitle}
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="opened"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: EASE_ENTER }}
                className="relative mt-4 overflow-hidden rounded-[1rem] border border-butter/25 bg-[radial-gradient(circle_at_50%_24%,rgba(255,240,184,.15),rgba(255,249,240,.02)_62%,transparent_80%)] px-4 py-6 sm:px-6"
              >
                <p className="sr-only">{finale.giftBody}</p>
                <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.22em] text-butter/70">
                  {finale.giftTitle}
                </p>

                <div className="relative mt-4 flex flex-col gap-3">
                  {finale.giftLines.map((line, index) => {
                    const token = giftTokens[index];
                    const Icon = token.icon;
                    return (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + index * 0.1, duration: 0.5 }}
                        className="flex items-center gap-3 rounded-full border border-cream/10 bg-cream/[0.05] px-3 py-2.5 text-left"
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                            token.tone,
                          )}
                        >
                          <Icon className="h-[1.15rem] w-[1.15rem]" />
                        </span>
                        <span className="font-display text-[1.02rem] leading-snug text-cream/85 sm:text-[1.1rem]">
                          {line}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                <p className="mt-4 text-[0.64rem] leading-relaxed text-cream/55">
                  {finale.giftFooter}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function Finale({ onReplay }: { onReplay: () => void }) {
  const audio = useAudioExperience();
  const reduceMotion = useReducedMotion();
  const { fire } = useConfetti();
  const cakeRef = useRef<HTMLDivElement | null>(null);
  const giftRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  const [lit, setLit] = useState<boolean[]>(() => Array(CANDLE_COUNT).fill(false));
  const [blown, setBlown] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  const litCount = lit.filter(Boolean).length;
  const allLit = litCount === CANDLE_COUNT;

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  const schedule = useCallback((fn: () => void, delay: number) => {
    const timer = window.setTimeout(fn, delay);
    timers.current.push(timer);
  }, []);

  const handleLight = useCallback(
    (index: number) => {
      if (blown) return;
      setLit((current) => {
        if (current[index]) return current;
        const next = [...current];
        next[index] = true;
        return next;
      });
      audio.playSfx("spark");
    },
    [audio, blown],
  );

  const burstFromCake = useCallback(() => {
    const rect = cakeRef.current?.getBoundingClientRect();
    if (rect) {
      fire({ x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.22 });
    } else {
      fire();
    }
  }, [fire]);

  const handleBlow = useCallback(() => {
    if (blown || !allLit) return;
    setBlown(true);
    audio.setMood("celebration");
    audio.playSfx("candle");
    burstFromCake();
    schedule(() => audio.playSfx("finale"), 360);
    schedule(() => fire({ count: 80 }), 620);
  }, [allLit, audio, blown, burstFromCake, fire, schedule]);

  const revealGift = useCallback(() => {
    audio.playSfx("gift");
    setGiftOpen(true);
    const rect = giftRef.current?.getBoundingClientRect();
    if (rect) {
      fire({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, count: 80 });
    } else {
      fire();
    }
  }, [audio, fire]);

  const relight = useCallback(() => {
    setBlown(false);
    setGiftOpen(false);
    setLit(Array(CANDLE_COUNT).fill(false));
    audio.setMood("bright");
    audio.playSfx("page");
    schedule(() => {
      cakeRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }, 60);
  }, [audio, reduceMotion, schedule]);

  return (
    <section
      id="chapter-finale"
      aria-labelledby="finale-title"
      className="story-scene bg-[radial-gradient(ellipse_at_50%_0%,#54394F_0%,#382533_45%,#251922_100%)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[58%] w-[min(54rem,135vw)] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,240,184,.16),rgba(255,240,184,.035)_46%,transparent_82%)] [clip-path:polygon(43%_0,57%_0,100%_100%,0_100%)] blur-2xl" />
        <SparkleField count={24} seed={99} tone="text-butter" className="opacity-70" />
        <span className="anim-shoot absolute right-[22%] top-[12%] h-px w-28 bg-gradient-to-r from-transparent via-cream/75 to-transparent" />
        <div className="absolute -right-10 top-16 h-32 w-32 text-butter/90 sm:right-[10%] sm:h-40 sm:w-40">
          <span className="absolute inset-0 rounded-full bg-butter/15 blur-2xl" />
          <MoonArt className="relative h-full w-full anim-float" />
        </div>
        <Balloon
          className="absolute left-[3%] top-[18%] h-16 w-10 text-rose/35 anim-float sm:left-[6%] sm:h-20 sm:w-12"
          style={{ animationDuration: "7.5s" }}
        />
        <Balloon
          className="absolute right-[3%] top-[34%] h-14 w-9 text-lavender/35 anim-float sm:right-[6%] sm:h-16 sm:w-10"
          style={{ animationDuration: "9s", animationDelay: "-3s" }}
        />
        <div className="absolute left-[9%] top-[30%] h-3 w-3 rounded-full bg-blush/60 shadow-[0_0_18px_6px_rgba(246,220,231,.2)] anim-float" style={{ animationDuration: "8s" }} />
        <div className="absolute right-[13%] top-[48%] h-2 w-2 rounded-full bg-butter/70 shadow-[0_0_14px_5px_rgba(255,240,184,.26)] anim-float" style={{ animationDuration: "6s", animationDelay: "-2s" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1E141C] to-transparent" />
        <Flower className="absolute left-[6%] top-[68%] h-7 w-7 opacity-30 anim-sway" />
        <Heart className="absolute left-[18%] top-[76%] h-4 w-4 text-rose/40 anim-bob" />
        <Star4 className="absolute right-[24%] top-[60%] h-3 w-3 text-butter anim-twinkle" />
        <LeafSprig className="absolute -bottom-4 right-[2%] h-32 w-32 rotate-12 text-sage/15" />
        <AnimatePresence>
          {blown ? (
            <motion.div
              key="celebration-glow"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.9, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: EASE_ENTER }}
              className="absolute left-1/2 top-[38%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,240,184,.22),rgba(246,220,231,.08)_48%,transparent_72%)] blur-3xl"
            />
          ) : null}
        </AnimatePresence>
      </div>

      <Bunting />

      <div className="section-shell relative pt-8">
        <StorybookHeading
          id="finale-title"
          number="08"
          label="The Grand Birthday Finale"
          title="One last wish."
          note={finale.script}
          tone="light"
        />

        <Cake cakeRef={cakeRef} lit={lit} blown={blown} onLight={handleLight} />

        <AnimatePresence mode="wait">
          {blown ? (
            <MessageCard key="wish" giftRef={giftRef} giftOpen={giftOpen} onOpenGift={revealGift} />
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="mt-7 flex flex-col items-center gap-3 text-center sm:mt-9"
            >
              <AnimatePresence mode="wait">
                {allLit ? (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <p className="font-hand text-[1.45rem] text-butter/80">{finale.wishPrompt}</p>
                    <HoldToBlow disabled={!allLit} reduced={reduceMotion} onComplete={handleBlow} />
                  </motion.div>
                ) : (
                  <motion.p
                    key="lighting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-sm font-hand text-[1.35rem] leading-snug text-cream/55"
                  >
                    Three candles. One very important wish. Tap each flame into being.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {blown && giftOpen ? (
            <motion.div
              key="closing"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE_ENTER }}
              className="mx-auto mt-10 max-w-2xl text-center"
            >
              <div className="mx-auto h-px w-24 bg-[linear-gradient(90deg,transparent,#FFF0B8,transparent)]" />
              <p className="mt-5 font-display text-[clamp(1.5rem,4.6vw,2.2rem)] italic leading-tight text-butter">
                {finale.closing}
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button type="button" onClick={relight} className="btn-magic min-h-[3.2rem] text-[0.88rem]">
                  <Sparkle className="h-4 w-4 text-butter" />
                  {finale.makeWishAgain}
                </button>
                <button
                  type="button"
                  onClick={onReplay}
                  className="btn-ghost min-h-[3rem] bg-cream/15 text-[0.82rem] text-cream/85 hover:bg-cream/25"
                >
                  <RotateCcw className="h-4 w-4" />
                  {finale.replay}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-14 hidden flex-col items-center gap-2 border-t border-cream/10 pt-6 text-center sm:flex">
          <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.24em] text-cream/45">
            made with affection, snacks, and absolutely no supervision
          </p>
          <p className="hand text-[1.2rem] text-cream/50">divya land · est. this birthday</p>
        </div>
      </div>
    </section>
  );
}
