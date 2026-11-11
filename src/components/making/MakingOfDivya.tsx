"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw, Sparkles } from "lucide-react";
import gsap from "gsap";
import { StorybookHeading } from "@/components/common/StorybookHeading";
import { CatSticker } from "@/components/cats/CatSticker";
import { DottedBackdrop, SparkleField } from "@/components/common/Ambient";
import {
  Butterfly,
  Flower,
  Heart,
  LeafSprig,
  Sparkle,
  Star4,
  TinyFlower,
} from "@/components/common/Illustrations";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_ENTER, EASE_SCENE } from "@/animations/motion";
import { cn } from "@/lib/utils";
import {
  makingCopy,
  skills,
  type Skill,
  type SkillId,
} from "@/data/making";
import { DivyaPortrait } from "./DivyaPortrait";
import { SkillGlyph } from "./SkillGlyph";

const skillMap = new Map<SkillId, Skill>(skills.map((skill) => [skill.id, skill]));
const TOTAL = skills.length;

function makeParticle(
  overlay: HTMLDivElement,
  x: number,
  y: number,
  color: string,
) {
  const el = document.createElement("span");
  const size = 4 + Math.random() * 6;
  const petal = Math.random() > 0.58;
  el.style.position = "absolute";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.width = `${size}px`;
  el.style.height = `${petal ? size * 1.15 : size}px`;
  el.style.background = color;
  el.style.borderRadius = petal ? "100% 0 100% 0" : "999px";
  el.style.opacity = "0";
  el.style.pointerEvents = "none";
  el.style.willChange = "transform, opacity";
  overlay.appendChild(el);
  return el;
}

function pulse(overlay: HTMLDivElement, x: number, y: number, color: string) {
  const ring = document.createElement("span");
  ring.style.position = "absolute";
  ring.style.left = `${x}px`;
  ring.style.top = `${y}px`;
  ring.style.width = "20px";
  ring.style.height = "20px";
  ring.style.marginLeft = "-10px";
  ring.style.marginTop = "-10px";
  ring.style.borderRadius = "999px";
  ring.style.border = `2px solid ${color}`;
  ring.style.pointerEvents = "none";
  ring.style.opacity = "0";
  overlay.appendChild(ring);
  gsap.fromTo(
    ring,
    { scale: 0.35, opacity: 0.75 },
    {
      scale: 3.5,
      opacity: 0,
      duration: 1.15,
      ease: "power2.out",
      onComplete: () => ring.remove(),
    },
  );
}

export function MakingOfDivya() {
  const audio = useAudioExperience();
  const reduced = useReducedMotion();

  const [discovered, setDiscovered] = useState<SkillId[]>([]);
  const [finale, setFinale] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const discoveredRef = useRef<SkillId[]>([]);
  const finaleRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      overlay?.replaceChildren();
    };
  }, []);

  const spawnBurst = useCallback((skill: Skill, originEl: HTMLElement) => {
    const overlay = overlayRef.current;
    const stage = stageRef.current;
    const figure = figureRef.current;
    if (!overlay || !stage || !figure) return;

    const stageRect = stage.getBoundingClientRect();
    const originRect = originEl.getBoundingClientRect();
    const figureRect = figure.getBoundingClientRect();

    const sx = originRect.left + originRect.width / 2 - stageRect.left;
    const sy = originRect.top + originRect.height / 2 - stageRect.top;
    const tx = figureRect.left + figureRect.width / 2 - stageRect.left;
    const ty = figureRect.top + figureRect.height * 0.46 - stageRect.top;

    pulse(overlay, sx, sy, skill.accent.particles[0]);

    const count = 22;
    for (let index = 0; index < count; index += 1) {
      const color =
        skill.accent.particles[index % skill.accent.particles.length];
      const angle = Math.random() * Math.PI * 2;
      const radius = 6 + Math.random() * 22;
      const startX = sx + Math.cos(angle) * radius;
      const startY = sy + Math.sin(angle) * radius;
      const el = makeParticle(overlay, startX, startY, color);
      const midX = (tx + startX) / 2 + (Math.random() - 0.5) * 90;
      const midY = (ty + startY) / 2 - 34 - Math.random() * 60;
      const duration = 0.9 + Math.random() * 0.35;

      gsap.set(el, { rotate: Math.random() * 180, scale: 0.8 + Math.random() * 0.5 });
      const tl = gsap.timeline({
        delay: index * 0.012,
        onComplete: () => el.remove(),
      });
      tl.to(el, { opacity: 0.95, duration: 0.16 }, 0)
        .to(
          el,
          {
            x: midX - startX,
            y: midY - startY,
            rotate: `+=${90 + Math.random() * 140}`,
            duration: duration * 0.55,
            ease: "power1.out",
          },
          0.05,
        )
        .to(
          el,
          {
            x: tx - startX,
            y: ty - startY,
            scale: 0.3,
            opacity: 0,
            duration: duration * 0.6,
            ease: "power2.in",
          },
          duration * 0.5,
        );
    }

    window.setTimeout(() => {
      pulse(overlay, tx, ty, skill.accent.particles[1] ?? skill.accent.particles[0]);
    }, 850);
  }, []);

  const spawnConvergence = useCallback(() => {
    const overlay = overlayRef.current;
    const stage = stageRef.current;
    const figure = figureRef.current;
    if (!overlay || !stage || !figure) return;

    const stageRect = stage.getBoundingClientRect();
    const figureRect = figure.getBoundingClientRect();
    const tx = figureRect.left + figureRect.width / 2 - stageRect.left;
    const ty = figureRect.top + figureRect.height * 0.45 - stageRect.top;
    const colors = skills.flatMap((skill) => skill.accent.particles);

    pulse(overlay, tx, ty, "#D6A23F");
    window.setTimeout(() => pulse(overlay, tx, ty, "#C95D86"), 280);

    const count = 46;
    for (let index = 0; index < count; index += 1) {
      const color = colors[index % colors.length];
      let startX = 16 + Math.random() * Math.max(40, stageRect.width - 32);
      let startY = 16 + Math.random() * Math.max(40, stageRect.height - 32);
      if (Math.hypot(startX - tx, startY - ty) < 130) {
        startX += startX < tx ? -160 : 160;
        startY += startY < ty ? -100 : 100;
      }
      startX = Math.max(-20, Math.min(stageRect.width + 20, startX));
      startY = Math.max(-20, Math.min(stageRect.height + 20, startY));

      const el = makeParticle(overlay, startX, startY, color);
      const midX = (tx + startX) / 2 + (Math.random() - 0.5) * 80;
      const midY = (ty + startY) / 2 - 40 - Math.random() * 80;
      const duration = 1.15 + Math.random() * 0.6;

      gsap.set(el, { rotate: Math.random() * 180, scale: 0.7 + Math.random() * 0.6 });
      const tl = gsap.timeline({
        delay: index * 0.014,
        onComplete: () => el.remove(),
      });
      tl.to(el, { opacity: 0.9, duration: 0.2 }, 0)
        .to(
          el,
          {
            x: midX - startX,
            y: midY - startY,
            rotate: `+=${80 + Math.random() * 120}`,
            duration: duration * 0.55,
            ease: "sine.out",
          },
          0.05,
        )
        .to(
          el,
          {
            x: tx - startX,
            y: ty - startY,
            scale: 0.25,
            opacity: 0,
            duration: duration * 0.6,
            ease: "power2.in",
          },
          duration * 0.5,
        );
    }
  }, []);

  const beginFinale = useCallback(() => {
    if (finaleRef.current) return;
    finaleRef.current = true;
    audio.setMood("celebration");
    audio.playSfx("finale");
    if (!reduced) spawnConvergence();
    timersRef.current.push(
      window.setTimeout(() => setFinale(true), reduced ? 40 : 300),
    );
    timersRef.current.push(
      window.setTimeout(() => setShowMessage(true), reduced ? 500 : 2200),
    );
  }, [audio, reduced, spawnConvergence]);

  const handleSelect = useCallback(
    (skill: Skill, originEl: HTMLElement) => {
      if (finaleRef.current) return;
      if (discoveredRef.current.includes(skill.id)) return;

      const next = [...discoveredRef.current, skill.id];
      discoveredRef.current = next;
      setDiscovered(next);
      audio.playSfx(skill.sfx);

      if (!reduced) spawnBurst(skill, originEl);

      if (next.length === TOTAL) {
        timersRef.current.push(
          window.setTimeout(beginFinale, reduced ? 220 : 1450),
        );
      }
    },
    [audio, beginFinale, reduced, spawnBurst],
  );

  const reset = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    discoveredRef.current = [];
    finaleRef.current = false;
    setDiscovered([]);
    setFinale(false);
    setShowMessage(false);
    audio.setMood("default");
    audio.playSfx("page");
    overlayRef.current?.replaceChildren();
  }, [audio]);

  const collected = discovered
    .map((id) => skillMap.get(id))
    .filter((skill): skill is Skill => Boolean(skill));
  const remaining = skills.filter((skill) => !discovered.includes(skill.id));
  const count = discovered.length;
  const progressLabel =
    count === TOTAL
      ? `all ${TOTAL} ${makingCopy.progress}`
      : `${count} of ${TOTAL} ${makingCopy.progress}`;

  return (
    <section
      id="chapter-making"
      aria-labelledby="making-title"
      className="story-scene paper"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_12%,rgba(255,255,255,0.66),transparent_58%)]" />
        <div className="absolute -left-24 top-[18%] h-72 w-72 rounded-full bg-blush/35 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-24 bottom-[8%] h-72 w-72 rounded-full bg-lavender/30 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute left-[8%] top-[46%] h-40 w-40 rounded-full bg-peach/30 blur-2xl" />
        <DottedBackdrop className="opacity-55" />
        <SparkleField count={18} seed={134} tone="text-rose/35" />
        <Star4 className="absolute left-[8%] top-[16%] h-4 w-4 text-rose/25 anim-twinkle" />
        <Star4
          className="absolute right-[11%] top-[24%] h-3 w-3 text-plum/20 anim-twinkle"
          style={{ animationDelay: "-1.8s" }}
        />
        <Heart className="absolute bottom-[16%] left-[12%] h-4 w-4 text-blush-deep/50 anim-float" />
        <Sparkle className="absolute bottom-[24%] right-[9%] h-4 w-4 text-lavender-deep/60 anim-twinkle" />
      </div>

      <div className="section-shell relative z-[1]">
        <StorybookHeading
          id="making-title"
          number="06"
          label={makingCopy.label}
          title={makingCopy.title}
          note={makingCopy.note}
        />

        <div className="mt-4 flex flex-col items-center gap-2">
          <p
            aria-live="polite"
            className="text-center text-[0.56rem] font-extrabold uppercase tracking-[0.24em] text-plum/70"
          >
            {progressLabel}
          </p>
          <div className="flex items-center justify-center gap-1.5" aria-hidden>
            {skills.map((skill) => {
              const done = discovered.includes(skill.id);
              return (
                <span
                  key={skill.id}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    done ? "w-7" : "w-3",
                  )}
                  style={{
                    backgroundColor: done
                      ? skill.accent.ink
                      : "rgba(73, 51, 72, 0.14)",
                  }}
                />
              );
            })}
          </div>
          <AnimatePresence initial={false}>
            {count === 0 ? (
              <motion.p
                key="hint"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.45, ease: EASE_ENTER }}
                className="hand mt-0.5 text-center text-[1.02rem] text-rose-deep/80"
              >
                {makingCopy.hint}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="relative mx-auto mt-4 w-full max-w-[64rem] sm:mt-5">
          <div ref={stageRef} className="relative">
            <div className="relative flex justify-center lg:absolute lg:inset-0 lg:items-center">
              <div
                ref={figureRef}
                className="relative w-[min(17rem,72vw)] sm:w-[19rem] lg:w-[20rem]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[-18%] -z-10"
                >
                  <div
                    className={cn(
                      "h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_46%,rgba(255,240,184,0.38),rgba(246,220,231,0.2)_44%,transparent_72%)] transition-opacity duration-1000",
                      finale ? "opacity-100" : "opacity-65",
                    )}
                  />
                </div>

                <DivyaPortrait
                  discovered={discovered}
                  finale={finale}
                  reduced={reduced}
                />

                <AnimatePresence>
                  {finale ? (
                    <motion.div
                      key="finale-decor"
                      aria-hidden
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.4 } }}
                      className="pointer-events-none absolute inset-0 z-20"
                    >
                      <motion.span
                        initial={{ opacity: 0, scale: 0.2, rotate: -24 }}
                        animate={{ opacity: 1, scale: 1, rotate: -12 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 180,
                          damping: 16,
                        }}
                        className="absolute -left-9 top-[10%] anim-float"
                      >
                        <Flower className="h-10 w-10 drop-shadow-[0_4px_6px_rgba(73,51,72,0.12)] sm:h-12 sm:w-12" />
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.75,
                          type: "spring",
                          stiffness: 200,
                          damping: 18,
                        }}
                        className="absolute -right-7 top-[18%] text-lavender-deep anim-sway"
                      >
                        <TinyFlower className="h-6 w-6 sm:h-7 sm:w-7" />
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.3, x: 8 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.95, duration: 0.7, ease: EASE_SCENE }}
                        className="absolute -right-10 top-[43%] anim-bob"
                      >
                        <Butterfly className="h-10 w-10 sm:h-12 sm:w-12" />
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.6, ease: EASE_SCENE }}
                        className="absolute -left-8 top-[52%] text-rose/60 anim-twinkle"
                      >
                        <Star4 className="h-5 w-5" />
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.05, duration: 0.6, ease: EASE_SCENE }}
                        className="absolute -left-4 bottom-[10%] text-blush-deep anim-float"
                        style={{ animationDelay: "-1.6s" }}
                      >
                        <Heart className="h-5 w-5" />
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85, duration: 0.7, ease: EASE_SCENE }}
                        className="absolute -right-6 bottom-[4%] text-sage anim-sway"
                        style={{ animationDelay: "-2s" }}
                      >
                        <LeafSprig className="h-11 w-11 sm:h-14 sm:w-14" />
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.15, duration: 0.55, ease: EASE_SCENE }}
                        className="absolute left-[22%] -top-4 text-butter"
                      >
                        <Sparkle className="h-4 w-4 text-[#D6A23F] drop-shadow-[0_2px_2px_rgba(214,162,63,0.25)]" />
                      </motion.span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            <div className="absolute inset-0 z-20 lg:relative lg:inset-auto lg:h-[50rem] xl:h-[52rem]">
              <AnimatePresence initial={false}>
                {remaining.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    index={skills.indexOf(skill)}
                    reduced={reduced}
                    onSelect={handleSelect}
                  />
                ))}
              </AnimatePresence>
            </div>

            <div
              ref={overlayRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 overflow-visible"
            />
          </div>
        </div>

        <AnimatePresence>
          {collected.length > 0 ? (
            <motion.div
              key="collected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.5, ease: EASE_ENTER }}
              className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2"
            >
              <span className="text-[0.5rem] font-extrabold uppercase tracking-[0.22em] text-plum/40">
                {makingCopy.collected}
              </span>
              {collected.map((skill) => (
                <motion.span
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.55, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: skill.restRotate / 2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 shadow-sm"
                  style={{
                    background: skill.accent.paper,
                    borderColor: skill.accent.border,
                    color: skill.accent.ink,
                  }}
                >
                  <SkillGlyph id={skill.id} className="h-3.5 w-3.5" />
                  <span className="hand text-[0.84rem] leading-none">
                    {skill.chip}
                  </span>
                </motion.span>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {showMessage ? (
            <motion.div
              key="finale-message"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 1, ease: EASE_ENTER }}
              className="relative mx-auto mt-8 max-w-xl text-center"
            >
              <div className="paper relative rounded-[1.55rem] border border-rose/25 px-5 py-8 shadow-paper sm:px-9 sm:py-10">
                <span className="tape -top-3 left-1/2 -translate-x-1/2" aria-hidden />
                <span
                  className="tape tape-rose -bottom-2.5 right-6 rotate-[6deg]"
                  aria-hidden
                />
                <div className="mx-auto mb-3 flex w-fit items-center gap-2 text-rose-deep/70">
                  <Star4 className="h-3.5 w-3.5 anim-twinkle" />
                  <Heart className="h-3.5 w-3.5 text-blush-deep" />
                  <Star4
                    className="h-3.5 w-3.5 anim-twinkle"
                    style={{ animationDelay: "-1.2s" }}
                  />
                </div>
                <p className="balance font-display text-[clamp(1.2rem,4.8vw,1.7rem)] italic leading-snug text-plum">
                  {makingCopy.messageLineOne}
                </p>
                <p className="balance mt-3 font-display text-[clamp(1.4rem,5.8vw,2.1rem)] italic leading-tight text-rose-deep">
                  {makingCopy.messageLineTwo}{" "}
                  <span aria-hidden className="not-italic">
                    ♡
                  </span>
                </p>
                <div className="mx-auto my-4 flex items-center justify-center gap-2 text-rose/50">
                  <span className="h-px w-10 bg-rose/30" />
                  <TinyFlower className="h-3.5 w-3.5 text-rose/70" />
                  <span className="h-px w-10 bg-rose/30" />
                </div>
                <p className="hand text-[clamp(1rem,3.6vw,1.2rem)] text-plum/65">
                  {makingCopy.messageSub}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="btn-ghost mt-5 text-[0.78rem]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {makingCopy.again}
                </button>
              </div>

              <CatSticker
                art="heart"
                label="Say hello to the proud little cat"
                bubble="so proud of you"
                bubbleSide="top"
                interactive
                motion="bob"
                delay={-1.1}
                className="absolute -bottom-6 -right-2 z-20 w-16 sm:-bottom-8 sm:-right-4 sm:w-20"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

type SkillCardProps = {
  skill: Skill;
  index: number;
  reduced: boolean;
  onSelect: (skill: Skill, origin: HTMLElement) => void;
};

function SkillCard({ skill, index, reduced, onSelect }: SkillCardProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      exit={{
        opacity: 0,
        scale: 0.35,
        y: -12,
        rotate: skill.restRotate + 14,
        transition: { duration: 0.38, ease: EASE_ENTER },
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.055,
        ease: EASE_SCENE,
      }}
      className={cn("relative", skill.position)}
    >
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (buttonRef.current) onSelect(skill, buttonRef.current);
        }}
        animate={{ rotate: skill.restRotate }}
        whileHover={
          reduced ? undefined : { y: -4, rotate: 0, scale: 1.035 }
        }
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 230, damping: 18 }}
        aria-label={`Add ${skill.label} to Divya's portrait`}
        className="group relative flex w-full flex-col gap-1.5 rounded-[1.05rem] border px-3 py-2.5 text-left shadow-[0_14px_30px_-22px_rgba(73,51,72,0.55)] transition-shadow hover:shadow-[0_20px_38px_-22px_rgba(73,51,72,0.55)]"
        style={{
          background: skill.accent.paper,
          borderColor: skill.accent.border,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 left-4 h-3 w-11 -rotate-3 bg-butter/70 opacity-90 shadow-sm"
          style={{ clipPath: "polygon(2% 8%, 98% 0%, 100% 92%, 0% 100%)" }}
        />
        <span className="flex w-full items-center gap-2">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border p-1.5 sm:h-10 sm:w-10"
            style={{
              background: skill.accent.wash,
              borderColor: skill.accent.border,
              color: skill.accent.ink,
            }}
          >
            <SkillGlyph id={skill.id} className="h-full w-full" />
          </span>
          <span className="min-w-0">
            <span className="hand block text-[1.02rem] leading-[0.95] text-plum sm:text-[1.08rem]">
              {skill.label}
            </span>
            <span
              className="mt-1 block text-[0.42rem] font-extrabold uppercase tracking-[0.16em]"
              style={{ color: skill.accent.ink, opacity: 0.7 }}
            >
              {skill.note}
            </span>
          </span>
        </span>
        <Sparkles
          aria-hidden
          className="absolute right-2.5 top-2.5 h-3 w-3 opacity-25 transition group-hover:opacity-60"
          style={{ color: skill.accent.ink }}
        />
      </motion.button>
    </motion.div>
  );
}
