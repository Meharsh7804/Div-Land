"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkle, Star4 } from "@/components/common/Illustrations";
import { Polaroid } from "@/components/scrapbook/Polaroid";
import {
  CornerVine,
  DelicateButterfly,
  DoodleHeart,
  Eucalyptus,
  PostageStamp,
  Squiggle,
  Tape,
  WaxSeal,
} from "@/components/scrapbook/ScrapbookArt";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import {
  DUR,
  EASE_CINEMA,
  EASE_ENTER,
  EASE_SCENE,
  STAGGER,
} from "@/animations/motion";
import { site } from "@/data/site";
import { cn, seeded } from "@/lib/utils";

type IntroGateProps = {
  onEnter: () => void;
  onComplete: () => void;
  reduced: boolean;
};

const LETTERS = ["D", "I", "V", "Y", "A"];

const cover = {
  hidden: {},
  show: {
    transition: { staggerChildren: STAGGER.loose, delayChildren: 0.28 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 22, filter: "blur(7px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DUR.wide, ease: EASE_ENTER },
  },
};

const scatter = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE_SCENE } },
};

const petalBurst = (() => {
  const random = seeded(91);
  const tones = ["#F3C9DC", "#FFF0B8", "#DCD5F5", "#FFDCCB", "#F6DCE7"];
  return Array.from({ length: 18 }, (_, id) => {
    const angle = (id / 18) * Math.PI * 2 + random() * 0.5;
    const distance = 90 + random() * 190;
    return {
      id,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotate: random() * 400 - 200,
      size: 5 + random() * 8,
      tone: tones[Math.floor(random() * tones.length)],
    };
  });
})();

function ArrowDoodle({ className }: { className?: string }) {
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
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
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

function SoundToggle({
  onToggle,
  musicOn,
  playing,
  busy,
}: {
  onToggle: () => void;
  musicOn: boolean;
  playing: boolean;
  busy: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={busy}
      aria-pressed={musicOn}
      aria-label={
        musicOn && playing
          ? "Turn the little soundtrack off"
          : "Turn the little soundtrack on"
      }
      className={cn(
        "group absolute right-4 top-4 z-[61] flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all sm:right-6 sm:top-6",
        musicOn
          ? "border-rose-ink/30 bg-rose-ink text-cream shadow-[0_12px_30px_-14px_rgba(138,80,104,.85)]"
          : "border-plum/12 bg-cream/60 text-plum/55 hover:bg-cream/90 hover:text-plum",
        busy && "opacity-60",
      )}
      style={{ marginTop: "env(safe-area-inset-top)" }}
    >
      {musicOn && playing ? (
        <span className="flex h-4 items-end gap-[3px]">
          {[0, 1, 2].map((bar) => (
            <span
              key={bar}
              className="w-[2.5px] animate-pulse rounded-full bg-butter"
              style={{ height: 6 + bar * 4, animationDelay: `${bar * 0.14}s` }}
            />
          ))}
        </span>
      ) : (
        <SpeakerOff className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}

export function IntroGate({ onEnter, onComplete, reduced }: IntroGateProps) {
  const audio = useAudioExperience();
  const [ready, setReady] = useState(reduced);
  const [opening, setOpening] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const gateButtonRef = useRef<HTMLButtonElement | null>(null);
  const hasFocusedGate = useRef(false);
  const enterTimers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setReady(true), 1500);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    const pending = enterTimers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  useEffect(() => {
    if (!ready || opening || hasFocusedGate.current) return;
    const frame = window.requestAnimationFrame(() => {
      hasFocusedGate.current = true;
      gateButtonRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [ready, opening]);

  const handleEnter = () => {
    if (opening) return;
    audio.playSfx("gate");
    void audio.startIfEnabled();
    setOpening(true);

    if (reduced) {
      enterTimers.current.push(
        window.setTimeout(() => onEnter(), 40),
        window.setTimeout(() => onComplete(), 320),
      );
      return;
    }

    enterTimers.current.push(
      window.setTimeout(() => audio.playSfx("enter"), 620),
      window.setTimeout(() => onEnter(), 900),
      window.setTimeout(() => setLeaving(true), 1050),
      window.setTimeout(() => onComplete(), 2250),
    );
  };

  const handleMusicToggle = () => {
    const willPlay = !audio.musicOn || !audio.playing;
    if (audio.musicOn && !audio.playing) {
      void audio.startIfEnabled();
    } else {
      audio.toggleMusic();
    }
    if (willPlay) audio.playSfx("garden");
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      className="sb-scene fixed inset-0 z-[80] overflow-hidden"
      initial={false}
      animate={{ opacity: leaving ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: leaving ? 0.95 : reduced ? 0.2 : 1.15,
        ease: leaving ? EASE_CINEMA : EASE_ENTER,
      }}
    >
      <div aria-hidden className="sb-grain" />
      <div aria-hidden className="sb-fiber" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_46%,transparent_44%,rgba(73,51,72,.16)_100%)]"
      />

      {/* the desk around the journal */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        initial="hidden"
        animate="show"
        variants={cover}
      >
        <motion.div
          variants={scatter}
          transition={{ delay: 0.5 }}
          className="absolute left-[7%] top-[16%] h-16 w-16 sm:h-24 sm:w-24"
        >
          <span className="sb-sway block h-full w-full text-rose/50">
            <FlowerSway />
          </span>
        </motion.div>
        <motion.div
          variants={scatter}
          transition={{ delay: 0.7 }}
          className="absolute bottom-[14%] right-[8%] h-14 w-14 opacity-80 sm:h-20 sm:w-20"
        >
          <span className="sb-float block h-full w-full">
            <DoodleHeart className="h-full w-full text-rose/45" />
          </span>
        </motion.div>
        <motion.div
          variants={scatter}
          transition={{ delay: 0.85 }}
          className="absolute left-[13%] bottom-[20%] h-20 w-20 text-sage/60 sm:h-28 sm:w-28"
        >
          <span className="sb-sway block h-full w-full">
            <Eucalyptus className="h-full w-full" />
          </span>
        </motion.div>
        <motion.div
          variants={scatter}
          transition={{ delay: 0.6 }}
          className="absolute right-[14%] top-[12%] h-8 w-8 text-butter sm:h-11 sm:w-11"
        >
          <span className="sb-twinkle block h-full w-full">
            <Star4 className="h-full w-full" />
          </span>
        </motion.div>
        <motion.div
          variants={scatter}
          transition={{ delay: 1 }}
          className="absolute right-[22%] bottom-[10%] h-4 w-4 text-lavender-deep sm:h-6 sm:w-6"
        >
          <span className="sb-twinkle block h-full w-full">
            <Sparkle className="h-full w-full" />
          </span>
        </motion.div>
        <motion.div
          variants={scatter}
          transition={{ delay: 0.75 }}
          className="absolute left-[26%] top-[9%] h-9 w-9 opacity-70 sm:h-12 sm:w-12"
        >
          <span className="sb-drift block h-full w-full">
            <DelicateButterfly className="h-full w-full" />
          </span>
        </motion.div>
      </motion.div>

      {/* the journal itself */}
      <div className="pointer-events-none absolute inset-0 z-[50] flex items-center justify-center px-5 py-16 sm:py-20">
        <motion.div
          className="pointer-events-auto relative w-full max-w-[32rem]"
          style={{ transformPerspective: 1500, transformOrigin: "left center" }}
          initial={reduced ? false : { opacity: 0, y: 30, scale: 0.94 }}
          animate={{
            opacity: opening ? 0.75 : 1,
            y: opening ? 0 : 0,
            scale: 1,
            rotateY: opening ? -112 : 0,
          }}
          transition={{
            duration: opening ? 0.9 : 1.05,
            ease: opening ? EASE_CINEMA : EASE_ENTER,
          }}
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={cover}
            className="sb-cover relative rounded-[1.5rem] px-6 pb-9 pt-10 text-center sm:px-10 sm:pb-11 sm:pt-12"
          >
            <span aria-hidden className="sb-stitch pointer-events-none absolute inset-3 rounded-[1.2rem]" />
            <CornerVine
              aria-hidden
              className="pointer-events-none absolute -left-3 -top-3 h-24 w-24 opacity-70 sm:h-32 sm:w-32"
            />
            <CornerVine
              aria-hidden
              className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24 rotate-180 opacity-70 sm:h-32 sm:w-32"
            />

            {/* ribbon bookmark */}
            <span
              aria-hidden
              className="absolute -top-6 right-9 h-12 w-3.5 rounded-b-[3px] bg-gradient-to-b from-rose-deep to-rose shadow-[0_6px_10px_-6px_rgba(73,51,72,.6)]"
            >
              <span className="absolute inset-x-0 bottom-0 h-2.5 [clip-path:polygon(0_0,50%_100%,100%_0)] bg-cream/70" />
            </span>

            {/* taped photo corner */}
            <motion.div
              variants={rise}
              className="absolute -left-4 bottom-10 hidden w-28 sm:block lg:-left-10 lg:w-32"
            >
              <div className="relative">
                <Tape tone="lav" className="left-1/2 top-0 h-5 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg]" />
                <Polaroid
                  src="/divya/1.jpeg"
                  alt="The birthday girl"
                  rotate={-7}
                  objectPosition="center 22%"
                  caption="The birthday Girl"
                />
              </div>
            </motion.div>

            <motion.div
              variants={rise}
              className="absolute -right-3 top-16 hidden sm:block"
            >
              <span className="sb-float block">
                <PostageStamp className="h-20 w-16 rotate-[8deg]" />
              </span>
            </motion.div>

            {/* the written cover */}
            <div className="relative z-[2] flex flex-col items-center">
              <motion.p
                variants={rise}
                className="text-[0.62rem] font-extrabold uppercase tracking-[0.34em] text-rose-ink/70"
              >
                a small birthday gift for
              </motion.p>

              <h1
                id="intro-title"
                className="display-title mt-3 flex items-baseline justify-center text-[clamp(3.6rem,16vw,7rem)] uppercase leading-[0.82] tracking-[0.12em] text-plum"
              >
                <span className="sr-only">{site.recipient}</span>
                {LETTERS.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    aria-hidden
                    initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: reduced ? 0.01 : 1,
                      delay: reduced ? 0 : 0.35 + index * 0.07,
                      ease: EASE_ENTER,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>

              <motion.div variants={rise} className="mt-1 text-rose-deep/70">
                <Squiggle className="h-4 w-40" />
              </motion.div>

              <motion.p
                variants={rise}
                className="hand mt-3 max-w-[22ch] text-balance text-[1.35rem] leading-tight text-plum/75 sm:text-[1.5rem]"
              >
                {site.tagline}
              </motion.p>

              <motion.div
                variants={rise}
                className="mt-6 flex items-center justify-center gap-2.5 text-rose/60"
              >
                <span className="h-px w-8 bg-current" />
                <Star4 className="h-2.5 w-2.5" />
                <span className="h-px w-8 bg-current" />
              </motion.div>

              <motion.div variants={rise} className="mt-6">
                <button
                  ref={gateButtonRef}
                  type="button"
                  onClick={handleEnter}
                  disabled={opening || !ready}
                  aria-label="Open the scrapbook and enter Divya Land"
                  className="sb-cta focus-visible:outline-none disabled:cursor-default disabled:opacity-70"
                >
                  <span>Open the scrapbook</span>
                  <span aria-hidden className="sb-cta__badge">
                    <ArrowDoodle className="h-3.5 w-3.5" />
                  </span>
                </button>
              </motion.div>

              <motion.p
                variants={rise}
                className="hand mt-3 text-[0.95rem] text-rose-ink/60"
              >
                made with a little extra love ♡
              </motion.p>
            </div>

            {/* wax seal */}
            <motion.div
              variants={rise}
              className="absolute -bottom-5 right-8 sm:right-10"
            >
              <WaxSeal className="h-16 w-16 drop-shadow-[0_8px_12px_rgba(138,80,104,.35)]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <SoundToggle
        onToggle={handleMusicToggle}
        musicOn={audio.musicOn}
        playing={audio.playing}
        busy={audio.busy}
      />

      {/* the cover swings open */}
      <AnimatePresence>
        {opening ? (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 z-[56] h-[84vmax] w-[84vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #FFFDF6 0%, #FFEFB9 32%, #F6DCE7 56%, transparent 76%)",
              }}
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ opacity: [0, 0.8, 1, 1], scale: [0.1, 1.1, 2.6, 3.2] }}
              transition={{
                duration: 1.9,
                times: [0, 0.24, 0.7, 1],
                ease: EASE_CINEMA,
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[58] overflow-hidden"
            >
              {petalBurst.map((petal) => (
                <motion.span
                  key={petal.id}
                  className="absolute left-1/2 top-1/2 block"
                  style={{
                    width: petal.size,
                    height: petal.size * 0.72,
                    background: petal.tone,
                    borderRadius: "100% 0 100% 0",
                  }}
                  initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.4 }}
                  animate={{
                    opacity: [0, 0.9, 0],
                    x: petal.x,
                    y: petal.y,
                    rotate: petal.rotate,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.6,
                    delay: petal.id * 0.025,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </>
        ) : null}
      </AnimatePresence>

      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: leaving ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE_CINEMA }}
        className="pointer-events-none absolute inset-0 z-[72]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 54%, #FFFDF8 0%, #FFF6E4 46%, #F9E9E1 100%)",
        }}
      />
    </motion.div>
  );
}

function FlowerSway() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-full w-full">
      <g fill="currentColor">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="32"
            cy="17"
            rx="9"
            ry="14"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
      </g>
      <circle cx="32" cy="32" r="7.5" fill="#FFF0B8" />
      <circle cx="32" cy="32" r="3" fill="#C98EA8" opacity="0.55" />
    </svg>
  );
}
