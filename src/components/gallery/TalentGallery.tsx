"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { StorybookHeading } from "@/components/common/StorybookHeading";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { SparkleField } from "@/components/common/Ambient";
import { Flower, LeafSprig, Sparkle, Star4 } from "@/components/common/Illustrations";
import { gallery, type GalleryPiece } from "@/data/gallery";
import { EASE_ENTER } from "@/animations/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, seeded } from "@/lib/utils";
import { CircleStudyArt, PetalStudyArt, RangoliArt } from "./RangoliArt";

const accents: Record<GalleryPiece["accent"], { glow: string; line: string; text: string }> = {
  rose: {
    glow: "bg-rose/25",
    line: "border-rose/45",
    text: "text-blush",
  },
  butter: {
    glow: "bg-butter/20",
    line: "border-butter/45",
    text: "text-butter",
  },
  lavender: {
    glow: "bg-lavender/20",
    line: "border-lavender/45",
    text: "text-lavender",
  },
};

const random = seeded(64);
const floating = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: 5 + random() * 90,
  top: 8 + random() * 70,
  size: 3 + random() * 8,
  delay: random() * -8,
  duration: 7 + random() * 7,
  tone: ["#F6DCE7", "#FFF0B8", "#DCD5F5", "#FFDCCB"][i % 4],
}));

function ExhibitArt({
  piece,
  revealed,
}: {
  piece: GalleryPiece;
  revealed: boolean;
}) {
  if (piece.image) {
    return (
      <Image
        src={piece.image}
        alt={`${piece.title} — ${piece.medium}`}
        fill
        sizes="(max-width: 640px) 82vw, 32rem"
        className="object-cover"
      />
    );
  }

  if (piece.art === "detail") {
    return <PetalStudyArt />;
  }

  if (piece.art === "rhythm") {
    return <CircleStudyArt />;
  }

  return <RangoliArt revealed={revealed} />;
}

function GalleryDoors({
  opening,
  onEnter,
}: {
  opening: boolean;
  onEnter: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE_ENTER }}
      className="absolute inset-0 z-30 overflow-hidden rounded-[1.4rem] border border-butter/15 [perspective:1400px]"
    >
      <div className="absolute inset-0 flex">
        <motion.div
          aria-hidden
          animate={opening ? { rotateY: -86, opacity: 0.3 } : { rotateY: 0, opacity: 1 }}
          transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
          className="relative h-full w-1/2 border-r border-plum-deep/70 bg-[linear-gradient(120deg,#2B1D29_0%,#352433_48%,#241821_100%)]"
        >
          <span className="absolute inset-5 rounded-[2px] border border-butter/15" />
          <span className="absolute inset-7 rounded-[2px] border border-cream/8" />
          <span className="absolute inset-x-8 top-[34%] h-px bg-cream/10" />
          <span className="absolute inset-x-8 top-[66%] h-px bg-cream/10" />
          <span className="absolute right-3 top-1/2 h-16 w-2.5 -translate-y-1/2 rounded-full border border-butter/25 bg-[linear-gradient(180deg,#FFF0B8,#9B7A54)] shadow-[0_0_18px_rgba(255,240,184,.22)]" />
        </motion.div>

        <motion.div
          aria-hidden
          animate={opening ? { rotateY: 86, opacity: 0.3 } : { rotateY: 0, opacity: 1 }}
          transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
          className="relative h-full w-1/2 border-l border-plum-deep/70 bg-[linear-gradient(240deg,#2B1D29_0%,#352433_48%,#241821_100%)]"
        >
          <span className="absolute inset-5 rounded-[2px] border border-butter/15" />
          <span className="absolute inset-7 rounded-[2px] border border-cream/8" />
          <span className="absolute inset-x-8 top-[34%] h-px bg-cream/10" />
          <span className="absolute inset-x-8 top-[66%] h-px bg-cream/10" />
          <span className="absolute left-3 top-1/2 h-16 w-2.5 -translate-y-1/2 rounded-full border border-butter/25 bg-[linear-gradient(180deg,#FFF0B8,#9B7A54)] shadow-[0_0_18px_rgba(255,240,184,.22)]" />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 top-8 z-10 flex justify-center">
        <span className="rounded-full border border-butter/20 bg-plum-deep/80 px-4 py-1.5 text-[0.58rem] font-extrabold uppercase tracking-[0.28em] text-butter/70 backdrop-blur">
          {gallery.entrance.kicker}
        </span>
      </div>

      <motion.div
        animate={opening ? { opacity: 0, y: 18, filter: "blur(10px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0 z-20 flex items-center justify-center px-5"
      >
        <div className="relative max-w-md text-center">
          <span aria-hidden className="absolute left-1/2 top-1/2 h-44 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-butter/10 blur-3xl" />
          <p className="hand relative text-[1.45rem] leading-none text-butter/80">now showing</p>
          <h3 className="relative mt-2 font-display text-[clamp(1.9rem,6vw,3rem)] leading-[1.02] text-cream">
            {gallery.entrance.title}
          </h3>
          <p className="relative mx-auto mt-3 max-w-sm text-[0.86rem] leading-relaxed text-cream/58">
            {gallery.entrance.note}
          </p>
          <button
            type="button"
            onClick={onEnter}
            disabled={opening}
            className="btn-magic relative mt-6 min-h-[3.2rem] min-w-[13rem] text-[0.92rem]"
          >
            <Sparkle className="h-4 w-4 text-butter" />
            {gallery.entrance.action}
          </button>
          <p className="relative mt-3 text-[0.56rem] font-extrabold uppercase tracking-[0.24em] text-cream/30">
            one artist · one confirmed masterpiece
          </p>
        </div>
      </motion.div>

      <span aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-[#241821] to-transparent" />
    </motion.div>
  );
}

function SideFrame({
  piece,
  active,
  revealed,
  onSelect,
}: {
  piece: GalleryPiece;
  active: boolean;
  revealed: boolean;
  onSelect: () => void;
}) {
  const accent = accents[piece.accent];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`View ${piece.title}`}
      className={cn(
        "group relative w-full rounded-[0.5rem] border p-2 text-left transition-all duration-500 focus-visible:outline-offset-4",
        active
          ? "border-butter/60 bg-cream/10 shadow-[0_0_30px_rgba(255,240,184,.14)]"
          : "border-cream/12 bg-cream/[0.035] opacity-75 hover:-translate-y-1 hover:opacity-100",
      )}
    >
      <span className={cn("absolute -inset-3 -z-10 rounded-full blur-2xl transition-opacity", accent.glow, active ? "opacity-100" : "opacity-0")} />
      <span className="relative block aspect-square overflow-hidden rounded-[0.2rem] border border-butter/20 bg-plum-deep">
        <ExhibitArt piece={piece} revealed={revealed} />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.12),transparent_36%,rgba(0,0,0,.22))]" />
        {active ? (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-butter shadow-[0_0_10px_3px_rgba(255,240,184,.4)]" />
        ) : null}
      </span>
      <span className="mt-2 flex items-center justify-between gap-2 px-1">
        <span className="min-w-0">
          <span className="block truncate font-display text-[0.98rem] italic leading-none text-cream/85">
            {piece.title}
          </span>
          <span className="mt-1 block truncate text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-cream/38">
            {piece.medium}
          </span>
        </span>
        <Star4 className={cn("h-2 w-2 shrink-0", accent.text, active ? "opacity-90" : "opacity-35")} />
      </span>
    </button>
  );
}

export function TalentGallery() {
  const audio = useAudioExperience();
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [opening, setOpening] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState(gallery.pieces[0].id);
  const entranceTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);

  const piece = gallery.pieces.find((item) => item.id === selected) ?? gallery.pieces[0];
  const selectedIndex = gallery.pieces.findIndex((item) => item.id === selected);
  const isCentrepiece = piece.id === gallery.pieces[0].id;
  const accent = accents[piece.accent];

  useEffect(
    () => () => {
      if (entranceTimer.current) window.clearTimeout(entranceTimer.current);
      if (revealTimer.current) window.clearTimeout(revealTimer.current);
    },
    [],
  );

  const handleEnter = useCallback(() => {
    if (opening || entered) return;
    audio.playSfx("lights");
    setOpening(true);
    entranceTimer.current = window.setTimeout(
      () => {
        setEntered(true);
        setOpening(false);
      },
      reduceMotion ? 60 : 980,
    );
  }, [audio, entered, opening, reduceMotion]);

  useEffect(() => {
    if (!entered) return;
    revealTimer.current = window.setTimeout(
      () => setRevealed(true),
      reduceMotion ? 0 : 420,
    );
    return () => {
      if (revealTimer.current) window.clearTimeout(revealTimer.current);
    };
  }, [entered, reduceMotion]);

  const handleSelect = useCallback(
    (id: string) => {
      if (id === selected) return;
      audio.playSfx("page");
      setSelected(id);
    },
    [audio, selected],
  );

  return (
    <section
      id="chapter-gallery"
      aria-labelledby="gallery-title"
      className="story-scene bg-[radial-gradient(ellipse_at_50%_12%,#5B3F58_0%,#3B2838_46%,#241821_100%)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,20,28,.22),transparent_30%,rgba(30,20,28,.5))]" />
        <SparkleField count={22} seed={77} tone="text-butter" className="opacity-55" />
        <div className="absolute left-1/2 top-0 h-[44rem] w-[min(64rem,120vw)] -translate-x-1/2 -rotate-[14deg] bg-[linear-gradient(112deg,transparent_32%,rgba(255,240,184,.09)_49%,transparent_66%)] blur-2xl" />
        <div className="absolute left-[8%] top-[30%] h-3 w-3 rounded-full bg-blush/35 blur-[1px] anim-float" style={{ animationDuration: "9s" }} />
        <div className="absolute right-[10%] top-[56%] h-2 w-2 rounded-full bg-butter/45 blur-[1px] anim-float" style={{ animationDuration: "7s", animationDelay: "-2s" }} />
        <Flower className="absolute left-[4%] top-[22%] h-8 w-8 opacity-25 anim-sway sm:left-[6%] sm:h-10 sm:w-10" />
        <LeafSprig className="absolute -bottom-6 right-[3%] h-28 w-28 rotate-[18deg] text-sage/20 sm:h-36 sm:w-36" />
        <Star4 className="absolute left-[10%] top-[48%] h-2.5 w-2.5 text-butter/70 anim-twinkle" />
        <Star4 className="absolute right-[12%] top-[24%] h-2 w-2 text-blush/60 anim-twinkle" style={{ animationDelay: "1.1s" }} />
      </div>

      <div className="section-shell relative z-[1]">
        <StorybookHeading
          id="gallery-title"
          number="06"
          label="The Talent Gallery"
          title="An exhibition for one."
          note={gallery.script}
          tone="light"
        />

        <div className="relative mx-auto mt-6 max-w-[68rem] sm:mt-8">
          <div className="relative overflow-hidden rounded-[1.4rem] border border-butter/15 bg-[linear-gradient(180deg,#33222F_0%,#2A1C29_62%,#1E141C_100%)] px-3 pb-5 pt-10 shadow-[0_44px_120px_-40px_rgba(0,0,0,.9)] sm:px-6 sm:pb-8 sm:pt-12">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-[58%] bg-[linear-gradient(180deg,rgba(91,63,88,.85),rgba(59,40,56,.55)_55%,transparent)]" />
              <div className="absolute inset-x-0 bottom-0 h-[26%] bg-[repeating-linear-gradient(90deg,rgba(255,249,240,.035)_0_1px,transparent_1px_72px)] opacity-70" />
              <div className="absolute inset-x-0 bottom-[26%] h-px bg-butter/15" />
              <div className="absolute inset-x-0 bottom-[24%] h-8 bg-[linear-gradient(180deg,rgba(30,20,28,.2),rgba(30,20,28,.6))]" />

              <motion.div
                initial={false}
                animate={revealed ? { opacity: 0.95 } : { opacity: 0 }}
                transition={{ duration: 1.4, ease: EASE_ENTER }}
                className="absolute left-1/2 top-0 h-[34rem] w-[min(32rem,84%)] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,240,184,.22),rgba(255,240,184,.06)_48%,transparent_78%)] [clip-path:polygon(45%_0,55%_0,100%_100%,0_100%)] blur-xl"
              />
              <motion.div
                initial={false}
                animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute left-1/2 top-[6%] h-36 w-36 -translate-x-1/2 rounded-full bg-butter/20 blur-3xl"
              />

              <div className="absolute left-[2.5%] top-[11%] flex flex-col items-center gap-2">
                <span className="h-10 w-1 rounded-full bg-[linear-gradient(180deg,#FFF0B8,#9B7A54)] shadow-[0_0_18px_rgba(255,240,184,.5)]" />
                <span className="h-4 w-4 rounded-full bg-butter/90 shadow-[0_0_26px_10px_rgba(255,240,184,.28)]" />
              </div>
              <div className="absolute right-[2.5%] top-[11%] flex flex-col items-center gap-2">
                <span className="h-10 w-1 rounded-full bg-[linear-gradient(180deg,#FFF0B8,#9B7A54)] shadow-[0_0_18px_rgba(255,240,184,.5)]" />
                <span className="h-4 w-4 rounded-full bg-butter/90 shadow-[0_0_26px_10px_rgba(255,240,184,.28)]" />
              </div>

              {floating.map((mote) => (
                <span
                  key={mote.id}
                  className="absolute rounded-full blur-[0.5px] anim-float"
                  style={{
                    left: `${mote.left}%`,
                    top: `${mote.top}%`,
                    width: mote.size,
                    height: mote.size,
                    background: mote.tone,
                    opacity: 0.3,
                    animationDuration: `${mote.duration}s`,
                    animationDelay: `${mote.delay}s`,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={false}
              animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.9, delay: 0.12, ease: EASE_ENTER }}
              aria-hidden={!entered}
              inert={!entered}
              className={cn("relative z-10", !entered && "pointer-events-none")}
            >
              <div className="grid items-center gap-5 lg:grid-cols-[8.5rem_minmax(0,1fr)_8.5rem] lg:gap-7">
                <div className="order-2 grid grid-cols-2 gap-3 lg:order-1 lg:grid-cols-1">
                  {gallery.pieces.slice(1).map((item) => (
                    <SideFrame
                      key={item.id}
                      piece={item}
                      active={item.id === selected}
                      revealed={entered}
                      onSelect={() => handleSelect(item.id)}
                    />
                  ))}
                </div>

                <figure className="order-1 mx-auto w-full max-w-[31rem] lg:order-2">
                  <div className="relative mx-auto">
                    <motion.div
                      initial={false}
                      animate={revealed ? { opacity: [0, 0.7, 0.35] } : { opacity: 0 }}
                      transition={{ duration: 2.4 }}
                      className={cn("pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl", accent.glow)}
                    />

                    <div className="absolute -top-7 left-1/2 z-20 flex w-[62%] -translate-x-1/2 flex-col items-center">
                      <span className="h-1 w-full rounded-full bg-[linear-gradient(90deg,transparent,#FFF0B8,#FFF9F0,#FFF0B8,transparent)] shadow-[0_0_20px_rgba(255,240,184,.4)]" />
                      <span className="h-5 w-16 bg-[linear-gradient(180deg,rgba(255,240,184,.16),transparent)] [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)]" />
                    </div>

                    <div className="relative rounded-[0.65rem] border border-butter/45 bg-[linear-gradient(145deg,#F0DCA8,#C7A266_38%,#8F6D42_62%,#E7CE96)] p-[6px] shadow-[0_36px_80px_-30px_rgba(0,0,0,.95)]">
                      <div className="relative rounded-[0.3rem] border border-plum/30 bg-[#241821] p-2">
                        <div className="relative aspect-square overflow-hidden rounded-[0.15rem] bg-[radial-gradient(circle_at_50%_40%,#3A2737,#241821_72%)]">
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                              key={piece.id}
                              initial={{ opacity: 0, scale: 1.035, filter: "blur(5px)" }}
                              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                              exit={{ opacity: 0, scale: 0.985, filter: "blur(4px)" }}
                              transition={{ duration: 0.62, ease: EASE_ENTER }}
                              className="absolute inset-0 p-1"
                            >
                              <ExhibitArt piece={piece} revealed={revealed} />
                            </motion.div>
                          </AnimatePresence>

                          <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,240,184,.12),transparent_56%)]" />
                          <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,.45)]" />
                        </div>
                      </div>

                      <div className="pointer-events-none absolute inset-0 rounded-[0.65rem] border border-cream/20" />
                      <span className="absolute -left-1.5 top-1/2 h-10 w-1.5 -translate-y-1/2 rounded-l-full bg-[linear-gradient(180deg,#E7CE96,#8F6D42)]" />
                      <span className="absolute -right-1.5 top-1/2 h-10 w-1.5 -translate-y-1/2 rounded-r-full bg-[linear-gradient(180deg,#E7CE96,#8F6D42)]" />
                    </div>

                    <div className="relative mx-auto mt-3 w-[88%] rounded-[0.25rem] border border-butter/25 bg-[linear-gradient(180deg,#3A2737,#2A1C29)] px-4 py-2.5 text-center shadow-[0_18px_30px_-20px_rgba(0,0,0,.8)]">
                      <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.24em] text-butter/50">
                        exhibit {String(selectedIndex + 1).padStart(2, "0")} · {isCentrepiece ? "centrepiece" : "study"}
                      </p>
                      <div aria-live="polite" aria-atomic="true" className="mt-1">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={piece.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.28 }}
                          >
                            <h3 className="font-display text-[1.15rem] italic leading-tight text-cream">
                              {piece.title}
                            </h3>
                            <p className="mt-0.5 text-[0.66rem] leading-snug text-cream/45">{piece.note}</p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </figure>

                <div className="order-3 hidden flex-col items-end gap-4 text-right lg:flex">
                  <div className="rounded-[0.4rem] border border-butter/20 bg-cream/[0.04] px-4 py-3">
                    <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.22em] text-butter/45">the plaque</p>
                    <p className="mt-2 font-display text-[1.08rem] italic leading-snug text-cream/90">
                      {gallery.captions.first}
                    </p>
                    <motion.p
                      initial={false}
                      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      className="mt-2 max-w-[12rem] text-[0.72rem] leading-relaxed text-cream/48"
                    >
                      {gallery.captions.second}
                    </motion.p>
                  </div>

                  {!isCentrepiece ? (
                    <button
                      type="button"
                      onClick={() => handleSelect(gallery.pieces[0].id)}
                      className="btn-ghost min-h-10 border-cream/20 bg-cream/10 text-[0.72rem] text-cream/80 hover:bg-cream/20"
                    >
                      ← {gallery.back}
                    </button>
                  ) : (
                    <p className="max-w-[11rem] text-[0.56rem] font-extrabold uppercase leading-relaxed tracking-[0.18em] text-cream/25">
                      {gallery.hint}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-col items-center gap-2 lg:hidden">
                <div className="max-w-md text-center">
                  <p className="font-display text-[1.15rem] italic leading-tight text-cream/90">
                    {gallery.captions.first}
                  </p>
                  <motion.p
                    initial={false}
                    animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-1 text-[0.75rem] leading-snug text-cream/50"
                  >
                    {gallery.captions.second}
                  </motion.p>
                </div>
                {!isCentrepiece ? (
                  <button
                    type="button"
                    onClick={() => handleSelect(gallery.pieces[0].id)}
                    className="btn-ghost min-h-9 border-cream/20 bg-cream/10 text-[0.68rem] text-cream/75 hover:bg-cream/20"
                  >
                    ← {gallery.back}
                  </button>
                ) : null}
              </div>
            </motion.div>

            <div className="relative z-10 mt-5 flex flex-col items-center gap-1 border-t border-cream/8 pt-3 text-center">
              <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.2em] text-cream/20">
                {gallery.credit}
              </p>
              <p className="hand text-[1.05rem] text-blush/45">lights on · exhibit open</p>
            </div>
          </div>

          <AnimatePresence>
            {!entered ? (
              <GalleryDoors key="doors" opening={opening} onEnter={handleEnter} />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
