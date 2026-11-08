"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Clock3,
  Coffee,
  HeartHandshake,
  Infinity as InfinityIcon,
  RotateCcw,
  UtensilsCrossed,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SparkleField } from "@/components/common/Ambient";
import {
  Balloon,
  Flower,
  GiftArt,
  Heart,
  MoonArt,
  Sparkle,
  Star4,
  WindArt,
} from "@/components/common/Illustrations";
import { finale } from "@/data/gallery";
import { useOnceInView } from "@/animations/useParallax";
import { EASE_ENTER } from "@/animations/motion";
import { useConfetti } from "@/hooks/useConfetti";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, seeded } from "@/lib/utils";

const CANDLES = 3;
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

function Bunting() {
  const flags = ["#F6DCE7", "#FFF0B8", "#DCD5F5", "#FFDCCB", "#C98EA8"];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden">
      <div className="relative flex w-[120%] max-w-none justify-between px-2">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="absolute inset-x-0 top-2 h-8 w-full">
          <path d="M0 4 Q300 44 600 18 T1200 4" fill="none" stroke="#FFF0B8" strokeWidth="1.5" opacity=".35" />
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
  canBlow,
  onBlow,
}: {
  index: number;
  lit: boolean;
  blown: boolean;
  canBlow: boolean;
  onBlow: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onBlow}
      disabled={!canBlow || blown}
      aria-label={
        blown
          ? `Candle ${index + 1}, blown out`
          : canBlow
            ? `Blow out candle ${index + 1}`
            : `Candle ${index + 1}, not lit yet`
      }
      className="group/candle relative flex h-16 w-11 flex-col items-center justify-end rounded-md focus-visible:outline-offset-2 disabled:cursor-default sm:w-12"
    >
      <div className="relative mb-0.5 flex h-6 w-4 items-end justify-center">
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 left-1/2 h-5 w-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_72%,#FFFDF4_0%,#FFE8A1_38%,#FFB25E_78%,#FF8B4A_100%)] shadow-[0_0_14px_4px_rgba(255,208,120,.55)] transition-all duration-500",
            lit && !blown ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
          style={{ animation: "flicker 1.6s ease-in-out infinite", animationDelay: `${index * 0.18}s` }}
        >
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#7E9CFF]/70" />
        </span>
        {blown
          ? [0, 1, 2].map((puff) => (
              <span
                key={puff}
                aria-hidden
                className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cream/45 blur-[2px]"
                style={{
                  animation: "steam-rise 2.6s ease-out forwards",
                  animationDelay: `${0.1 + puff * 0.4 + index * 0.06}s`,
                  animationIterationCount: 2,
                }}
              />
            ))
          : null}
      </div>
      <span
        aria-hidden
        className="relative block h-10 w-2.5 rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,.18)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #FFF9F0 0 4px, #F6DCE7 4px 8px)",
        }}
      >
        <span className="absolute -left-1 top-1/2 h-0.5 w-1 rounded-full bg-plum/25" />
      </span>
      {canBlow && !blown ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 rounded-md border border-butter/0 transition-colors group-hover/candle:border-butter/25"
        />
      ) : null}
    </button>
  );
}

function Cake({
  cakeRef,
  lit,
  blown,
  onBlow,
  canBlow,
}: {
  cakeRef: React.RefObject<HTMLDivElement | null>;
  lit: number;
  blown: boolean;
  onBlow: () => void;
  canBlow: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: EASE_ENTER }}
      className="relative mx-auto mt-10 w-full max-w-[26rem] sm:mt-14"
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl transition-opacity duration-1000 sm:h-80 sm:w-80",
          blown ? "bg-blush/10 opacity-40" : lit > 0 ? "bg-butter/25 opacity-100" : "bg-butter/10 opacity-50",
        )}
      />

      <div ref={cakeRef} className="relative mx-auto w-[86%]">
        <div className="relative pt-[4.6rem]">
          <div className="absolute inset-x-0 top-0 mx-auto flex h-[4.6rem] w-full items-end justify-center gap-10 sm:gap-12">
            {Array.from({ length: CANDLES }).map((_, i) => (
              <Candle
                key={i}
                index={i}
                lit={i < lit}
                blown={blown}
                canBlow={canBlow}
                onBlow={onBlow}
              />
            ))}
          </div>

          <div className="relative mx-auto h-[4.4rem] w-[58%] rounded-t-[0.7rem] bg-gradient-to-b from-[#FFF3C4] to-[#F4DC94] shadow-[inset_0_-14px_24px_rgba(180,140,60,.18)]">
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

          <div className="relative mx-auto -mt-1 h-[5.6rem] w-[80%] rounded-t-[0.9rem] bg-gradient-to-b from-[#E7E1FB] to-[#CFC4F0] shadow-[inset_0_-16px_28px_rgba(90,70,140,.16)]">
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

          <div className="relative mx-auto -mt-1 h-[6.6rem] w-full rounded-t-[1.1rem] bg-gradient-to-b from-[#FBDDE9] to-[#F0C3D7] shadow-[inset_0_-18px_30px_rgba(160,80,110,.14)]">
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
      </div>

      <div className="relative mt-7 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={onBlow}
          disabled={!canBlow || blown}
          className={cn(
            "btn-magic min-h-[3.4rem] min-w-[15rem] text-[0.95rem]",
            (!canBlow || blown) && "cursor-not-allowed opacity-55",
          )}
        >
          <WindArt className="h-4 w-4 text-butter" />
          {blown
            ? finale.blownPrompt
            : canBlow
              ? finale.blowPrompt
              : "lighting the candles…"}
        </button>
        <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-cream/35">
          {blown
            ? "one wish, officially sent"
            : canBlow
              ? "tap a candle · or use the button · one very important wish"
              : "three candles · one very important wish"}
        </p>
      </div>
    </motion.div>
  );
}

const giftTokens = [
  {
    icon: Coffee,
    label: "coffee",
    tone: "border-butter/45 bg-butter text-plum",
    position: "left-[2%] top-[8%]",
  },
  {
    icon: UtensilsCrossed,
    label: "food",
    tone: "border-blush/45 bg-blush text-rose-deep",
    position: "right-[1%] top-[1%]",
  },
  {
    icon: Clock3,
    label: "time",
    tone: "border-lavender/45 bg-lavender text-plum",
    position: "bottom-[3%] left-[7%]",
  },
  {
    icon: HeartHandshake,
    label: "pampering",
    tone: "border-rose/45 bg-rose text-cream",
    position: "bottom-[8%] right-[3%]",
  },
];

function GiftScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mt-3 overflow-hidden rounded-[1rem] border border-butter/20 bg-[radial-gradient(circle_at_50%_42%,rgba(255,240,184,.14),rgba(255,249,240,.02)_58%,transparent_76%)] px-4 py-6 sm:px-6"
    >
      <p className="sr-only">
        {finale.giftTitle}. {finale.giftBody} {finale.giftFooter}
      </p>

      <div className="relative mx-auto h-[17rem] w-full max-w-[25rem]">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-[10%] rounded-full border border-dashed border-butter/20 anim-spin-slow" />
          <div className="absolute inset-[24%] rounded-full border border-blush/15" />
          <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-butter/15 blur-2xl" />
          <Sparkle className="absolute left-[16%] top-[24%] h-3 w-3 text-butter anim-twinkle" />
          <Star4 className="absolute right-[18%] top-[18%] h-4 w-4 text-blush anim-twinkle" style={{ animationDelay: "1.2s" }} />
          <Star4 className="absolute bottom-[14%] left-1/2 h-2.5 w-2.5 -translate-x-1/2 text-butter anim-twinkle" style={{ animationDelay: "0.6s" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.55, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 170, damping: 16 }}
          className="absolute left-1/2 top-1/2 z-[2] flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-butter/45 bg-plum text-butter shadow-[0_0_50px_rgba(255,240,184,.22)]"
        >
          <GiftArt className="h-10 w-10" />
          <span className="absolute inset-2 rounded-full border border-butter/20 anim-breathe" />
        </motion.div>

        {giftTokens.map((token, index) => {
          const Icon = token.icon;
          return (
            <div
              key={token.label}
              className={cn("absolute anim-float", token.position)}
              style={{
                animationDelay: `${index * -1.35}s`,
                animationDuration: `${6 + index * 0.7}s`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.35, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.2 + index * 0.1,
                  type: "spring",
                  stiffness: 180,
                  damping: 15,
                }}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_14px_30px_-16px_rgba(0,0,0,.8)] sm:h-16 sm:w-16",
                    token.tone,
                  )}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.8} />
                </span>
                <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-cream/65">
                  {token.label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="relative mx-auto -mt-1 flex w-fit items-center gap-2 rounded-full border border-butter/25 bg-butter/10 px-4 py-2 text-butter/85"
      >
        <InfinityIcon className="h-4 w-4" strokeWidth={2} />
        <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em]">
          never expires · redeemable any day
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Finale({ onReplay }: { onReplay: () => void }) {
  const reduceMotion = useReducedMotion();
  const { fire } = useConfetti();
  const cakeRef = useRef<HTMLDivElement | null>(null);
  const giftRef = useRef<HTMLDivElement | null>(null);

  const [inView, setInView] = useState(false);
  const [lit, setLit] = useState(0);
  const [blown, setBlown] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  const handleInView = useCallback(() => setInView(true), []);
  useOnceInView(cakeRef, handleInView, 0.2);

  const effectiveLit = reduceMotion ? (inView && !blown ? CANDLES : 0) : lit;

  useEffect(() => {
    if (!inView || blown || reduceMotion) return;
    if (lit >= CANDLES) return;
    const timer = window.setTimeout(() => setLit((value) => Math.min(CANDLES, value + 1)), 480);
    return () => window.clearTimeout(timer);
  }, [inView, lit, blown, reduceMotion]);

  const burstFromCake = useCallback(() => {
    const rect = cakeRef.current?.getBoundingClientRect();
    if (rect) {
      fire({ x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.28 });
    } else {
      fire();
    }
  }, [fire]);

  const handleBlow = useCallback(() => {
    if (blown || effectiveLit < CANDLES) return;
    setBlown(true);
    setGiftOpen(false);
    burstFromCake();
    window.setTimeout(() => fire({ count: 70 }), 500);
  }, [blown, effectiveLit, burstFromCake, fire]);

  const relight = useCallback(() => {
    setBlown(false);
    setGiftOpen(false);
    setLit(reduceMotion ? CANDLES : 0);
  }, [reduceMotion]);

  const revealGift = useCallback(() => {
    setGiftOpen(true);
    const rect = giftRef.current?.getBoundingClientRect();
    if (rect) {
      fire({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, count: 90 });
    } else {
      fire();
    }
  }, [fire]);

  return (
    <section
      id="chapter-finale"
      aria-labelledby="finale-title"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#54394F_0%,#382533_45%,#251922_100%)] section-pad"
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
      </div>

      <Bunting />

      <div className="section-shell relative pt-8">
        <SectionHeading
          number="08"
          sceneId="finale"
          variant="marquee"
          tone="light"
          eyebrow={finale.eyebrow}
          title={
            <span id="finale-title" className="uppercase">
              {finale.title}
            </span>
          }
          script={finale.script}
        />

        <Cake
          cakeRef={cakeRef}
          lit={effectiveLit}
          blown={blown}
          onBlow={handleBlow}
          canBlow={effectiveLit >= CANDLES}
        />

        <AnimatePresence mode="wait">
          {blown ? (
            <motion.div
              key="wish"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: EASE_ENTER }}
              className="mx-auto mt-10 max-w-2xl text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkle className="h-4 w-4 text-butter" />
                <p className="font-display text-[1.3rem] italic text-butter sm:text-[1.5rem]">
                  {finale.blownPrompt}
                </p>
                <Sparkle className="h-4 w-4 text-butter" />
              </div>

              <div className="paper relative mt-7 overflow-hidden rounded-[1.2rem] border border-butter/25 px-5 py-7 sm:px-9 sm:py-9">
                <span className="tape-rose left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-[-1.5deg]" />
                <p className="eyebrow text-rose-deep/75">{finale.messageTitle}</p>
                <motion.div
                  className="mt-3 space-y-2"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
                  }}
                >
                  {finale.message.map((line) => (
                    <motion.p
                      key={line}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.55, ease: EASE_ENTER },
                        },
                      }}
                      className="font-display text-[clamp(1.2rem,3.8vw,1.7rem)] leading-snug text-plum/90"
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
                  <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.24em] text-butter/55">
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
                        onClick={revealGift}
                        className="group mt-3 flex w-full flex-col items-center gap-3 rounded-[0.9rem] border border-cream/10 bg-cream/[0.05] px-4 py-5 transition-colors hover:bg-cream/[0.09]"
                      >
                        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-butter/40 bg-butter/10 text-butter transition-transform group-hover:scale-105">
                          <GiftArt className="h-7 w-7" />
                          <span className="absolute inset-0 rounded-full border border-butter/20 anim-breathe" />
                        </span>
                        <span className="font-hand text-[1.35rem] text-cream/85">
                          unbox it
                        </span>
                      </motion.button>
                    ) : (
                      <GiftScene key="opened" />
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button type="button" onClick={relight} className="btn-magic min-h-[3.2rem] text-[0.88rem]">
                  <Sparkle className="h-4 w-4 text-butter" />
                  {finale.makeWishAgain}
                </button>
                <button type="button" onClick={onReplay} className="btn-ghost min-h-[3rem] bg-cream/15 text-[0.82rem] text-cream/85 hover:bg-cream/25">
                  <RotateCcw className="h-4 w-4" />
                  {finale.replay}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center"
            >
              <p className="font-hand text-[1.35rem] text-cream/55">
                {effectiveLit >= CANDLES ? finale.wishPrompt : "birthday magic, loading…"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-14 flex flex-col items-center gap-2 border-t border-cream/10 pt-6 text-center">
          <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.24em] text-cream/30">
            made with affection, snacks, and absolutely no supervision
          </p>
          <p className="hand text-[1.2rem] text-cream/35">
            divya land · est. this birthday
          </p>
        </div>
      </div>
    </section>
  );
}
