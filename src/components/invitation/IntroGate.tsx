"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Star4 } from "@/components/common/Illustrations";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { EASE_CINEMA, EASE_ENTER, EASE_SCENE } from "@/animations/motion";
import { site } from "@/data/site";
import { cn, seeded } from "@/lib/utils";
import { IntroScenery } from "./IntroScenery";
import { IntroSparks } from "./IntroSparks";
import { INTRO_BEATS, INTRO_STAGE, type IntroStage } from "./introTimeline";

type IntroGateProps = {
  onEnter: () => void;
  onComplete: () => void;
  reduced: boolean;
};

const LETTERS = ["D", "I", "V", "Y", "A"];

const petalBurst = (() => {
  const random = seeded(157);
  const tones = ["#F3C9DC", "#FFF0B8", "#DCD5F5", "#FFDCCB", "#F6DCE7"];
  return Array.from({ length: 16 }, (_, id) => {
    const angle = (id / 16) * Math.PI * 2 + random() * 0.6;
    const distance = 70 + random() * 150;
    return {
      id,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 26,
      rotate: random() * 420 - 210,
      size: 5 + random() * 7,
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
      strokeWidth="1.6"
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
          ? "Turn the garden soundtrack off"
          : "Turn the garden soundtrack on"
      }
      className={cn(
        "group absolute right-4 top-4 z-[61] flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all sm:right-6 sm:top-6",
        musicOn
          ? "border-plum/20 bg-plum/90 text-cream shadow-[0_12px_30px_-14px_rgba(47,31,46,.8)]"
          : "border-plum/12 bg-cream/55 text-plum/55 hover:bg-cream/85 hover:text-plum",
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
              style={{
                height: 6 + bar * 4,
                animationDelay: `${bar * 0.14}s`,
              }}
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
  const [stageState, setStage] = useState<IntroStage>(
    reduced ? INTRO_STAGE.ready : INTRO_STAGE.dusk,
  );
  const stage = reduced ? INTRO_STAGE.ready : stageState;
  const [opening, setOpening] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const gateButtonRef = useRef<HTMLButtonElement | null>(null);
  const hasFocusedGate = useRef(false);
  const stageTimers = useRef<number[]>([]);
  const enterTimers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) return;
    stageTimers.current = INTRO_BEATS.map(([delay, value]) =>
      window.setTimeout(() => setStage(value), delay),
    );
    return () => {
      stageTimers.current.forEach((id) => window.clearTimeout(id));
    };
  }, [reduced]);

  useEffect(() => {
    const pending = enterTimers.current;
    return () => {
      pending.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const node = sceneRef.current;
    if (!node) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        node.style.setProperty("--px", `${x.toFixed(3)}`);
        node.style.setProperty("--py", `${y.toFixed(3)}`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

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
      window.setTimeout(() => audio.playSfx("enter"), 700),
      window.setTimeout(() => onEnter(), 1500),
      window.setTimeout(() => setLeaving(true), 1650),
      window.setTimeout(() => onComplete(), 2900),
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

  const titleVisible = stage >= INTRO_STAGE.title;
  const titleMoved = stage >= INTRO_STAGE.gate;
  const ready = stage >= INTRO_STAGE.ready;

  useEffect(() => {
    if (!ready || opening || hasFocusedGate.current) return;
    const handle = window.requestAnimationFrame(() => {
      hasFocusedGate.current = true;
      gateButtonRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(handle);
  }, [ready, opening]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      className="fixed inset-0 z-[80] overflow-hidden bg-[#130d18]"
      initial={false}
      animate={{ opacity: leaving ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: leaving ? 0.95 : reduced ? 0.2 : 1.25,
        ease: leaving ? EASE_CINEMA : EASE_ENTER,
      }}
    >
      <div
        ref={sceneRef}
        className="intro-world"
        data-intro-stage={stage}
        data-intro-opening={opening || undefined}
        style={{ ["--px" as string]: "0", ["--py" as string]: "0" }}
      >
        <div className="intro-camera">
          <IntroScenery stage={stage} opening={opening} reduced={reduced} />
        </div>

        <motion.div
          aria-hidden
          initial={false}
          animate={{
            opacity: reduced || stage >= INTRO_STAGE.dawn ? 0 : 1,
          }}
          transition={{
            duration: reduced ? 0.01 : 3.6,
            ease: EASE_SCENE,
          }}
          className="pointer-events-none absolute inset-0 z-[40]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 46%, #241a2c 0%, #170f1e 58%, #0d0812 100%)",
          }}
        />

        <IntroSparks stage={stage} opening={opening} reduced={reduced} />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[42] bg-[radial-gradient(ellipse_at_50%_46%,transparent_50%,rgba(30,18,30,.28)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[43] h-[20%] bg-gradient-to-b from-plum/15 to-transparent"
        />

        <div className="pointer-events-none absolute inset-0 z-[50] flex items-center justify-center px-6">
          <motion.div
            initial={false}
            animate={
              opening
                ? { y: "-24vh", scale: 0.5, opacity: 0 }
                : titleMoved
                  ? { y: "-30vh", scale: 0.56, opacity: 1 }
                  : { y: "0vh", scale: 1, opacity: 1 }
            }
            transition={{
              duration: opening ? 0.7 : 1.9,
              ease: opening ? EASE_CINEMA : EASE_ENTER,
            }}
            className="flex flex-col items-center text-center"
          >
            <motion.p
              initial={false}
              animate={{
                opacity: titleVisible && !titleMoved && !opening ? 0.62 : 0,
                y: titleVisible ? 0 : 8,
              }}
              transition={{
                duration: titleVisible ? 1 : 0.5,
                delay: titleVisible && !titleMoved ? 0.15 : 0,
                ease: EASE_ENTER,
              }}
              className="eyebrow text-plum/60"
            >
              a small birthday gift for
            </motion.p>

            <div className="relative mt-2 inline-flex items-center justify-center sm:mt-3">
              <h1
                id="intro-title"
                className="display-title flex items-baseline justify-center text-[clamp(3.4rem,15vw,8rem)] uppercase leading-[0.82] tracking-[0.16em] text-plum"
              >
                <span className="sr-only">Divya</span>
                {LETTERS.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    aria-hidden
                    initial={false}
                    animate={
                      titleVisible
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 18, filter: "blur(14px)" }
                    }
                    transition={{
                      duration: reduced ? 0.01 : 1.15,
                      delay: titleVisible && !reduced ? index * 0.08 : 0,
                      ease: EASE_ENTER,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
              <motion.span
                aria-hidden
                initial={false}
                animate={{ opacity: titleVisible && !opening ? 0.72 : 0 }}
                transition={{
                  duration: 0.9,
                  delay: titleVisible ? 0.65 : 0,
                  ease: "easeOut",
                }}
                className="intro-shimmer display-title pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[clamp(3.4rem,15vw,8rem)] uppercase leading-[0.82] tracking-[0.16em]"
              >
                DIVYA
              </motion.span>
            </div>

            <motion.div
              initial={false}
              animate={{
                opacity: titleVisible && !titleMoved && !opening ? 1 : 0,
                width: titleVisible && !titleMoved ? "5.5rem" : "0rem",
              }}
              transition={{
                duration: titleVisible ? 1.1 : 0.4,
                delay: titleVisible && !titleMoved ? 0.5 : 0,
                ease: EASE_ENTER,
              }}
              className="mt-4 flex items-center justify-center gap-2.5 text-rose/60"
            >
              <span className="h-px flex-1 bg-current" />
              <Star4 className="h-2 w-2 shrink-0" />
              <span className="h-px flex-1 bg-current" />
            </motion.div>

            <motion.p
              initial={false}
              animate={{
                opacity: titleVisible && !titleMoved && !opening ? 1 : 0,
                y: titleVisible && !titleMoved ? 0 : -6,
                filter:
                  titleVisible && !titleMoved ? "blur(0px)" : "blur(6px)",
              }}
              transition={{
                duration: titleVisible ? 1.2 : 0.5,
                delay: titleVisible && !titleMoved ? 0.75 : 0,
                ease: EASE_ENTER,
              }}
              className="mt-4 max-w-[24ch] text-balance font-display text-[clamp(1rem,3.7vw,1.35rem)] italic leading-[1.55] text-plum/75 sm:max-w-[28ch]"
            >
              Some people make the world a little more beautiful.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={
            opening
              ? { opacity: 0, y: 18 }
              : stage >= INTRO_STAGE.gate
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 22 }
          }
          transition={{
            duration: opening ? 0.5 : 1.15,
            delay: stage >= INTRO_STAGE.gate && !opening ? 0.55 : 0,
            ease: EASE_ENTER,
          }}
          className="absolute inset-x-0 bottom-[max(1.35rem,env(safe-area-inset-bottom))] z-[55] flex flex-col items-center px-6 pb-1"
        >
          <p
            data-intro-tagline
            className="text-balance font-display text-[clamp(1.05rem,3.4vw,1.4rem)] italic text-plum/80"
          >
            {site.tagline}
          </p>

          <span
            aria-hidden
            className="mt-3 flex items-center justify-center gap-2 text-rose/45"
          >
            <span className="h-px w-7 bg-current" />
            <Star4 className="h-1.5 w-1.5" />
            <span className="h-px w-7 bg-current" />
          </span>

          <motion.button
            ref={gateButtonRef}
            data-intro-cta
            type="button"
            onClick={handleEnter}
            disabled={opening || !ready}
            aria-label="Open the gate and enter Divya Land"
            initial={false}
            animate={{
              opacity: ready && !opening ? 1 : 0,
              y: ready && !opening ? 0 : 10,
            }}
            transition={{
              duration: 0.9,
              delay: ready && !opening ? 0.15 : 0,
              ease: EASE_ENTER,
            }}
            className="intro-enter group mt-2 inline-flex items-center gap-3 rounded-full focus-visible:outline-offset-4 disabled:cursor-default"
          >
            <span>Enter Divya Land</span>
            <span aria-hidden className="intro-enter-arrow">
              <ArrowDoodle className="h-3.5 w-3.5" />
            </span>
          </motion.button>
        </motion.div>

        <SoundToggle
          onToggle={handleMusicToggle}
          musicOn={audio.musicOn}
          playing={audio.playing}
          busy={audio.busy}
        />

        {opening ? (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[54%] z-[56] h-[82vmax] w-[82vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #FFFCF1 0%, #FFEFB9 30%, #F6DCE7 54%, transparent 74%)",
              }}
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ opacity: [0, 0.85, 1, 1], scale: [0.1, 1.1, 2.7, 3.3] }}
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
                  className="absolute left-1/2 top-[54%] block"
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

        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: leaving ? 1 : 0 }}
          transition={{ duration: 0.8, ease: EASE_CINEMA }}
          className="pointer-events-none absolute inset-0 z-[72]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 56%, #FFFDF8 0%, #FFF6E4 46%, #F9E9E1 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}
