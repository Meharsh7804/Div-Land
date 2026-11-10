"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_ENTER } from "@/animations/motion";
import { cn } from "@/lib/utils";

export type CatArt =
  | "peek"
  | "sleepy"
  | "heart"
  | "party"
  | "flower"
  | "loaf"
  | "cup";

export type CatMotion = "float" | "bob" | "sway" | "breathe" | "none";
export type CatBubbleSide = "top" | "bottom" | "left" | "right";

const ART: Record<CatArt, { src: string; width: number; height: number }> = {
  peek: { src: "/cats/peek.svg", width: 140, height: 120 },
  sleepy: { src: "/cats/sleepy.svg", width: 150, height: 110 },
  heart: { src: "/cats/heart.svg", width: 140, height: 150 },
  party: { src: "/cats/party.svg", width: 150, height: 160 },
  flower: { src: "/cats/flower.svg", width: 140, height: 150 },
  loaf: { src: "/cats/loaf.svg", width: 130, height: 90 },
  cup: { src: "/cats/cup.svg", width: 120, height: 130 },
};

const MOTION_CLASS: Record<CatMotion, string> = {
  float: "cat-float",
  bob: "cat-bob",
  sway: "cat-sway",
  breathe: "cat-breathe",
  none: "",
};

const BUBBLE_POSITION: Record<CatBubbleSide, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

const BUBBLE_TAIL: Record<CatBubbleSide, string> = {
  top: "-bottom-1 left-1/2 -translate-x-1/2 rotate-45 border-b border-r",
  bottom: "-top-1 left-1/2 -translate-x-1/2 rotate-45 border-l border-t",
  left: "-right-1 top-1/2 -translate-y-1/2 rotate-45 border-r border-t",
  right: "-left-1 top-1/2 -translate-y-1/2 rotate-45 border-b border-l",
};

type CatStickerProps = {
  art: CatArt;
  label?: string;
  bubble?: string;
  bubbleSide?: CatBubbleSide;
  className?: string;
  motion?: CatMotion;
  delay?: number;
  flip?: boolean;
  interactive?: boolean;
  autoBubble?: boolean;
  autoBubbleDelay?: number;
  style?: CSSProperties;
};

export function CatSticker({
  art,
  label = "A small cat sticker",
  bubble,
  bubbleSide = "top",
  className,
  motion: motionKind = "float",
  delay = 0,
  flip = false,
  interactive = false,
  autoBubble = false,
  autoBubbleDelay = 900,
  style,
}: CatStickerProps) {
  const audio = useAudioExperience();
  const reduced = useReducedMotion();
  const [speaking, setSpeaking] = useState(false);
  const [reacting, setReacting] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const hideTimer = useRef<number | null>(null);
  const reactTimer = useRef<number | null>(null);
  const autoTimer = useRef<number | null>(null);
  const autoShown = useRef(false);

  const meta = ART[art];
  const positioned = /\b(absolute|fixed|sticky|relative)\b/.test(className ?? "");

  const hideLater = useCallback((duration = 3400) => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setSpeaking(false), duration);
  }, []);

  const speak = useCallback(() => {
    if (!bubble) return;
    setSpeaking(true);
    setReacting(true);
    audio.playSfx("spark");
    if (reactTimer.current) window.clearTimeout(reactTimer.current);
    reactTimer.current = window.setTimeout(() => setReacting(false), 680);
    hideLater();
  }, [audio, bubble, hideLater]);

  useEffect(
    () => () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      if (reactTimer.current) window.clearTimeout(reactTimer.current);
      if (autoTimer.current) window.clearTimeout(autoTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!autoBubble || !bubble || autoShown.current) return;
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        autoShown.current = true;
        autoTimer.current = window.setTimeout(() => {
          setSpeaking(true);
          hideLater(4200);
        }, autoBubbleDelay);
      },
      { threshold: 0.55 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (autoTimer.current) window.clearTimeout(autoTimer.current);
    };
  }, [autoBubble, autoBubbleDelay, bubble, hideLater]);

  const artNode = (
    <span
      className={cn(
        "cat-sticker-art block h-full w-full",
        reduced ? undefined : reacting ? "cat-react" : MOTION_CLASS[motionKind],
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <span
        className={cn("block h-full w-full", flip && "-scale-x-100")}
        style={{ backgroundImage: `url("${meta.src}")` }}
      />
    </span>
  );

  return (
    <span
      ref={wrapperRef}
      className={cn(
        "cat-sticker inline-block align-bottom",
        !positioned && "relative",
        interactive ? "pointer-events-auto" : "pointer-events-none",
        className,
      )}
      style={{
        ...style,
        aspectRatio: `${meta.width} / ${meta.height}`,
      }}
      aria-hidden={interactive ? undefined : true}
    >
      {interactive ? (
        <button
          type="button"
          onClick={speak}
          onPointerDown={(event) => event.stopPropagation()}
          aria-label={label}
          className="cat-sticker-button block h-full w-full"
        >
          {artNode}
        </button>
      ) : (
        <span className="block h-full w-full">{artNode}</span>
      )}

      <AnimatePresence>
        {bubble && speaking ? (
          <span
            className={cn(
              "pointer-events-none absolute z-30 w-max max-w-[11rem]",
              BUBBLE_POSITION[bubbleSide],
            )}
            aria-live="polite"
          >
            <motion.span
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 5, scale: 0.92, rotate: -1.5 }
              }
              animate={
                reduced
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1, rotate: 0 }
              }
              exit={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 3, scale: 0.95, rotate: 0.5 }
              }
              transition={{ duration: reduced ? 0.01 : 0.26, ease: EASE_ENTER }}
              className="relative block rounded-[1rem_1rem_1rem_0.35rem] border border-plum/12 bg-cream/97 px-3 py-1.5 text-center font-hand text-[0.95rem] leading-tight text-plum/80 shadow-[0_10px_22px_-14px_rgba(47,31,46,.55)]"
            >
              {bubble}
              <span
                aria-hidden
                className={cn(
                  "absolute h-2 w-2 border-plum/12 bg-cream",
                  BUBBLE_TAIL[bubbleSide],
                )}
              />
            </motion.span>
          </span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
