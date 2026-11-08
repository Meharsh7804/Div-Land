"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { CoffeeCup, Flower, Heart, Sparkle, Star4 } from "@/components/common/Illustrations";
import { cafe, menuCopy } from "@/data/cafe";


import { makeBag, cn } from "@/lib/utils";

type Stage = "idle" | "grinding" | "brewing" | "done";

const stageLabels: Record<Stage, string> = {
  idle: cafe.machine.idle,
  grinding: cafe.machine.grinding,
  brewing: cafe.machine.brewing,
  done: cafe.machine.brewAgain,
};

function Awning() {
  const count = 18;
  const width = 900 / count;
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 92"
      preserveAspectRatio="none"
      className="pointer-events-none block h-14 w-full sm:h-[4.5rem]"
    >
      {Array.from({ length: count }).map((_, i) => {
        const fill = i % 2 === 0 ? "#F6DCE7" : "#FFF9F0";
        return (
          <g key={i}>
            <rect x={i * width} y={0} width={width + 0.5} height={58} fill={fill} />
            <path
              d={`M${i * width} 58 Q${i * width + width / 2} 88 ${(i + 1) * width} 58 Z`}
              fill={fill}
            />
          </g>
        );
      })}
      <rect x="0" y="55" width="900" height="2.5" fill="#C98EA8" opacity=".45" />
      <rect x="0" y="0" width="900" height="4" fill="#C98EA8" opacity=".3" />
    </svg>
  );
}

function CoffeeMachine({
  stage,
  onBrew,
  cups,
}: {
  stage: Stage;
  onBrew: () => void;
  cups: number;
}) {
  const active = stage === "grinding" || stage === "brewing";
  const liquid = stage === "brewing" || stage === "done";
  const steam = stage === "done" || stage === "brewing";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onBrew}
        aria-label={
          stage === "idle"
            ? "Brew a cup of coffee"
            : stage === "done"
              ? "Brew another cup of coffee"
              : "Coffee is being made, please wait"
        }
        className="group relative mx-auto block w-full max-w-[19rem] rounded-[1.6rem] p-1 focus-visible:outline-offset-4"
      >
        <span
          aria-hidden
          className="absolute inset-x-8 bottom-3 h-8 rounded-full bg-plum/15 blur-lg transition-transform duration-500 group-hover:scale-105"
        />
        <svg viewBox="0 0 280 320" className="relative h-auto w-full">
          {/* shelf mugs */}
          <g opacity=".9">
            <rect x="34" y="24" width="212" height="6" rx="3" fill="#C98EA8" opacity=".55" />
            <g transform="translate(56 0)">
              <path d="M0 32h30l-3 24c-.4 4-3.6 6-7 6H10c-3.4 0-6.6-2-7-6L0 32Z" fill="#FFF9F0" stroke="#B0708C" strokeWidth="1.5" />
              <path d="M30 38h5c5 0 7 4 5 8-1.6 3-5 5-9 4" fill="none" stroke="#B0708C" strokeWidth="1.5" />
              <path d="M11 28c-2-3 2-5 0-8M21 28c-2-3 2-5 0-8" stroke="#C98EA8" strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
            </g>
            <g transform="translate(122 0)">
              <path d="M0 34h26l-3 22c-.4 4-3.2 6-6 6H9c-2.8 0-5.6-2-6-6L0 34Z" fill="#DCD5F5" stroke="#B0708C" strokeWidth="1.5" />
              <path d="M26 39h4c5 0 6 4 4 7-1.4 3-4 4-8 3" fill="none" stroke="#B0708C" strokeWidth="1.5" />
            </g>
            <g transform="translate(190 0)">
              <path d="M0 32h28l-3 23c-.4 4-3.4 6-6.6 6H9.6c-3.2 0-6.2-2-6.6-6L0 32Z" fill="#FFDCCB" stroke="#B0708C" strokeWidth="1.5" />
              <path d="M28 38h5c5 0 7 4 5 8-1.6 3-5 5-9 4" fill="none" stroke="#B0708C" strokeWidth="1.5" />
            </g>
          </g>

          {/* hopper */}
          <path d="M104 106 113 62h54l9 44Z" fill="#FFF9F0" opacity=".72" stroke="#B0708C" strokeWidth="2" />
          <rect x="108" y="52" width="64" height="13" rx="6" fill="#493348" />
          <rect x="118" y="69" width="44" height="4" rx="2" fill="#C98EA8" opacity=".5" />
          {[
            { x: 128, y: 84, r: -18 },
            { x: 145, y: 78, r: 12 },
            { x: 136, y: 94, r: 28 },
            { x: 152, y: 92, r: -6 },
            { x: 122, y: 99, r: 8 },
          ].map((bean, i) => (
            <motion.g
              key={i}
              animate={
                stage === "grinding"
                  ? { x: [0, 2, -2, 0], y: [0, -2, 1, 0], rotate: [0, 8, -6, 0] }
                  : { x: 0, y: 0, rotate: 0 }
              }
              transition={{
                duration: 0.42,
                repeat: stage === "grinding" ? Infinity : 0,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <ellipse cx={bean.x} cy={bean.y} rx="5" ry="3.6" fill="#6B4432" transform={`rotate(${bean.r} ${bean.x} ${bean.y})`} />
              <path d={`M${bean.x - 4} ${bean.y} Q${bean.x} ${bean.y - 2} ${bean.x + 4} ${bean.y}`} stroke="#C98EA8" strokeWidth="1" fill="none" opacity=".6" />
            </motion.g>
          ))}

          {/* machine body */}
          <rect x="44" y="111" width="192" height="155" rx="26" fill="#C98EA8" stroke="#B0708C" strokeWidth="2" />
          <rect x="56" y="123" width="168" height="131" rx="20" fill="#F6DCE7" />
          <rect x="56" y="123" width="168" height="38" rx="19" fill="#EFC9DA" />

          {/* gauge */}
          <circle cx="92" cy="178" r="17" fill="#FFF9F0" stroke="#B0708C" strokeWidth="1.6" />
          <g style={{ transformBox: "fill-box", transformOrigin: "92px 178px" }}>
            <motion.g
              animate={
                active
                  ? { rotate: [0, 22, -14, 8, 0] }
                  : { rotate: stage === "done" ? 30 : -18 }
              }
              transition={{ duration: active ? 1.4 : 0.6, repeat: active ? Infinity : 0 }}
              style={{ transformBox: "fill-box", transformOrigin: "92px 178px" }}
            >
              <line x1="92" y1="178" x2="92" y2="166" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          </g>
          <circle cx="92" cy="178" r="3.2" fill="#493348" />
          <path d="M80 166a16 16 0 0 1 10-5" stroke="#C98EA8" strokeWidth="1.6" fill="none" opacity=".7" />

          {/* branding + button */}
          <text x="170" y="158" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="17" fill="#493348">
            sonu&apos;s
          </text>
          <text x="170" y="171" textAnchor="middle" fontFamily="var(--font-nunito)" fontWeight="800" fontSize="6.5" letterSpacing="2.2" fill="#B0708C">
            COFFEE CO.
          </text>
          <circle cx="196" cy="196" r="13" fill="#493348" />
          <circle cx="196" cy="196" r="4" fill={stage === "idle" ? "#FFF0B8" : "#C98EA8"} className={stage === "idle" ? "anim-twinkle" : ""} />
          <path d="M196 187l1.5 4.3 4.3 1.5-4.3 1.5-1.5 4.3-1.5-4.3-4.3-1.5 4.3-1.5L196 187Z" fill="#FFF9F0" opacity=".85" />

          {/* group head + spout */}
          <rect x="118" y="188" width="46" height="16" rx="6" fill="#493348" />
          <rect x="126" y="203" width="30" height="9" rx="4" fill="#B0708C" />
          <rect x="136" y="211" width="10" height="6" rx="2" fill="#493348" />

          {/* coffee stream */}
          <motion.rect
            x="139"
            y="216"
            width="4"
            height="14"
            rx="2"
            fill="#6B4432"
            animate={{ opacity: stage === "brewing" ? [0.4, 1, 0.5, 1] : 0 }}
            transition={{ duration: 0.7, repeat: stage === "brewing" ? Infinity : 0 }}
          />

          {/* tray + cup */}
          <rect x="96" y="258" width="90" height="10" rx="5" fill="#B0708C" />
          <rect x="102" y="267" width="78" height="5" rx="2.5" fill="#493348" opacity=".45" />
          <path d="M118 258 L126 222 H156 L164 258 Z" fill="#FFF9F0" stroke="#493348" strokeWidth="2" strokeLinejoin="round" />
          <path d="M156 230h6c7 0 10 5 8 11-1.6 5-6 8-11 7" fill="none" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
          <rect x="130" y="226" width="22" height="28" rx="3" fill="#B0708C" opacity=".25" />
          <rect
            x="130"
            y="226"
            width="22"
            height="28"
            rx="3"
            fill="#8E5A45"
            style={{
              transformBox: "fill-box",
              transformOrigin: "bottom center",
              transform: `scaleY(${liquid ? 0.9 : 0})`,
              transition: "transform 1.4s cubic-bezier(.2,.8,.3,1)",
            }}
          />
          <path d="M120 222h40" stroke="#F6DCE7" strokeWidth="2" strokeLinecap="round" />

          {/* steam */}
          <g opacity={steam ? 1 : 0} style={{ transition: "opacity .5s" }}>
            <path
              d="M132 214c-4-6 4-8 0-15"
              stroke="#FFF9F0"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              className="steam-line"
              opacity=".85"
            />
            <path
              d="M146 212c-4-7 5-9 0-17"
              stroke="#FFF9F0"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              className="steam-line"
              style={{ animationDelay: "0.5s" }}
              opacity=".7"
            />
            <path
              d="M160 214c-4-6 4-8 0-15"
              stroke="#FFF9F0"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              className="steam-line"
              style={{ animationDelay: "0.9s" }}
              opacity=".8"
            />
          </g>

          {/* steam on top of hopper */}
          <g opacity={active ? 0.55 : 0} style={{ transition: "opacity .4s" }}>
            <path d="M132 44c-3-5 3-7 0-12" stroke="#C98EA8" strokeWidth="2" strokeLinecap="round" fill="none" className="steam-line" />
            <path d="M148 42c-3-5 3-7 0-12" stroke="#C98EA8" strokeWidth="2" strokeLinecap="round" fill="none" className="steam-line" style={{ animationDelay: ".6s" }} />
          </g>
        </svg>
      </button>

      <div className="mt-2 flex flex-col items-center gap-1">
        <span className="flex items-center gap-1.5 text-[0.64rem] font-extrabold uppercase tracking-[0.16em] text-plum/45">
          <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-rose-deep anim-twinkle" : "bg-sage")} />
          {stage === "idle" ? "machine ready" : stage === "done" ? "freshly brewed" : "in progress"}
        </span>
        <span className="hand text-lg text-rose-deep/85">
          cups poured today: {cups} · {cafe.counter.suffix}
        </span>
      </div>
    </div>
  );
}

export function SonuCafe() {
  const [stage, setStage] = useState<Stage>("idle");
  const [cups, setCups] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const bag = useRef<string[]>([]);
  const timers = useRef<number[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const brew = () => {
    if (stage === "grinding" || stage === "brewing") return;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setStage("grinding");
    setMessage(null);

    timers.current.push(
      window.setTimeout(() => setStage("brewing"), 900),
      window.setTimeout(() => {
        if (bag.current.length === 0) bag.current = makeBag(cafe.messages);
        const picked = bag.current.pop() ?? cafe.messages[0];
        setMessage(picked);
        setCups((value) => value + 1);
        setStage("done");
      }, 2500),
    );
  };

  return (
    <section
      ref={sectionRef}
      id="chapter-cafe"
      aria-labelledby="cafe-title"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-[#FFEFDF] to-[#FFF6E7] section-pad"
    >
      <div aria-hidden data-parallax={-3} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-peach/50 blur-3xl" />
        <div className="absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-butter/45 blur-3xl" />
        <div
          className="absolute inset-x-0 top-0 h-10 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #C98EA8 0 18px, transparent 18px 36px)",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
        <Flower className="absolute left-[5%] top-[30%] h-9 w-9 opacity-50 anim-sway" />
        <Star4 className="absolute right-[12%] top-[18%] h-4 w-4 text-rose/50 anim-twinkle" />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          number="04"
          sceneId="cafe"
          variant="placard"
          eyebrow={cafe.eyebrow}
          title={<span id="cafe-title">{cafe.title}</span>}
          script={cafe.script}
        >
          {cafe.intro}
        </SectionHeading>

        <Reveal delay={0.08} className="mt-9 sm:mt-12">
          <div data-parallax={1.5} className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-plum/12 bg-cream shadow-[0_36px_80px_-50px_rgba(47,31,46,.55)] sm:rounded-[2.6rem]">
            <Awning />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(201,142,168,.055) 0 2px, transparent 2px 46px)",
              }}
            />

            <div className="relative flex flex-col items-center px-4 pb-1 pt-5 text-center sm:px-8 sm:pt-6">
              <div className="relative">
                <span className="absolute -left-8 top-1 h-px w-6 bg-plum/20" />
                <p className="font-display text-[1.45rem] italic leading-none text-plum sm:text-[1.8rem]">
                  Sonu&apos;s Little Café
                </p>
                <span className="absolute -right-8 top-1 h-px w-6 bg-plum/20" />
                <p className="mt-1 text-[0.64rem] font-extrabold uppercase tracking-[0.28em] text-rose-deep/70">
                  open whenever you&apos;re hungry · always has been
                </p>
              </div>
            </div>

            <div className="relative grid gap-5 p-4 sm:p-6 md:grid-cols-[0.95fr_1.05fr] md:gap-7 md:p-8 lg:p-9">
              <div className="flex flex-col rounded-[1.6rem] border border-plum/10 bg-gradient-to-b from-[#FFF9EE] to-[#FFE9D8] p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="eyebrow text-rose-deep/80">{cafe.machine.label}</p>
                    <h3 className="mt-1 font-display text-[1.4rem] leading-tight text-plum sm:text-[1.65rem]">
                      One machine. One very specific order.
                    </h3>
                  </div>
                  <Sparkle className="mt-1 h-4 w-4 shrink-0 text-rose-deep/70" />
                </div>

                <div className="mt-3 flex-1">
                  <CoffeeMachine stage={stage} onBrew={brew} cups={cups} />
                </div>

                <button
                  type="button"
                  onClick={brew}
                  disabled={stage === "grinding" || stage === "brewing"}
                  aria-busy={stage === "grinding" || stage === "brewing"}
                  className="btn-magic mt-3 w-full text-[0.88rem]"
                >
                  <Sparkle className="h-4 w-4 text-butter" />
                  {stageLabels[stage]}
                </button>

                <div className="mt-3 min-h-[3.4rem]" aria-live="polite" aria-atomic="true">
                  <AnimatePresence mode="wait">
                    {message ? (
                      <motion.p
                        key={message}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.4 }}
                        className="mx-auto max-w-[17rem] text-center font-display text-[1.02rem] italic leading-snug text-plum"
                      >
                        &ldquo;{message}&rdquo;
                      </motion.p>
                    ) : (
                      <p key="hint" className="mx-auto max-w-[17rem] text-center text-[0.7rem] font-semibold leading-relaxed text-plum/45">
                        {stage === "grinding"
                          ? "the beans are doing their thing…"
                          : stage === "brewing"
                            ? "patience. good coffee takes a moment."
                            : "tap the machine. it knows exactly what you like."}
                      </p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-2 flex items-center justify-center gap-3 border-t border-dashed border-plum/10 pt-3">
                  <CoffeeCup className="h-7 w-7 opacity-70" />
                  <span className="hand text-lg leading-tight text-plum/55">
                    no decaf. no rush.
                  </span>
                </div>
              </div>

              <div className="relative mt-2">
                <span className="tape tape-rose left-1/2 top-0 -z-0 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[1.2rem] border-[6px] border-[#C98EA8] bg-[#3B2838] p-4 shadow-[0_24px_50px_-34px_rgba(47,31,46,.9)] sm:border-[8px] sm:p-6">
                  <div className="relative flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-hand text-[2.1rem] leading-none text-cream">
                        {menuCopy.boardTitle}
                      </h3>
                      <p className="mt-1 text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-blush/60">
                        {menuCopy.boardNote}
                      </p>
                    </div>
                    <span className="rounded-full border border-blush/25 px-2 py-0.5 text-[0.64rem] font-extrabold uppercase tracking-[0.16em] text-blush/70">
                      5 items
                    </span>
                  </div>

                  <ul className="relative mt-4 flex-1 space-y-3">
                    {cafe.menu.map((item) => (
                      <li key={item.name} className="group">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:flex-nowrap">
                          <h4 className="font-display text-[1.02rem] leading-tight text-cream sm:text-[1.15rem]">
                            {item.name}
                          </h4>
                          {item.tag ? (
                            <span className="shrink-0 rounded-full bg-butter/20 px-1.5 py-0.5 text-[0.58rem] font-extrabold uppercase tracking-[0.1em] text-butter/90">
                              {item.tag}
                            </span>
                          ) : null}
                          <span className="hidden flex-1 border-b border-dotted border-cream/25 sm:mt-3 sm:block" />
                          <span className="ml-auto shrink-0 font-hand text-[0.95rem] text-butter/85 sm:ml-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="mt-0.5 max-w-[22rem] text-[0.72rem] leading-snug text-cream/55">
                          {item.notes}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-4 rounded-[0.8rem] border border-dashed border-cream/20 px-3 py-2 text-center">
                    <p className="hand text-[1.1rem] leading-tight text-blush/85">
                      {menuCopy.note}
                    </p>
                  </div>

                  <div className="relative mt-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[0.64rem] font-extrabold uppercase tracking-[0.16em] text-cream/35">
                      <Heart className="h-2.5 w-2.5 text-rose" />
                      chef&apos;s favourite customer
                    </span>
                    <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.16em] text-cream/35">
                      since always
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative px-4 pb-5 sm:px-8 sm:pb-8">
              <div className="grid gap-3 sm:grid-cols-[1.35fr_0.65fr]">
                <div className="relative rotate-[-0.7deg] overflow-hidden rounded-[1.2rem] border border-plum/15 bg-[#FFF9F0] p-4 sm:p-5">
                  <div
                    aria-hidden
                    className="absolute inset-2 rounded-[0.9rem] border border-dashed border-rose/30"
                  />
                  <span className="tape left-8 top-0 -translate-y-1/2 h-4 w-16" />
                  <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-rose-deep/40 bg-blush/40 text-center">
                      <span className="font-display text-[0.64rem] uppercase leading-tight tracking-wider text-rose-deep">
                        90%
                        <br />
                        coffee
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.24em] text-rose-deep/80">
                        {cafe.certificate.title}
                      </p>
                      <p className="font-display text-[1.35rem] leading-tight text-plum sm:text-[1.6rem]">
                        {cafe.certificate.headline}
                      </p>
                      <p className="mt-1 max-w-lg text-[0.76rem] leading-snug text-ink/65">
                        {cafe.certificate.body}
                      </p>
                    </div>
                    <div className="ml-auto hidden -rotate-12 rounded-full border-2 border-rose-deep/30 px-3 py-2 text-center sm:block">
                      <span className="block font-display text-[0.64rem] uppercase tracking-widest text-rose-deep/70">
                        {cafe.certificate.seal}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative rotate-[0.9deg] rounded-[1.2rem] border border-plum/10 bg-lavender/35 p-4">
                  <p className="eyebrow text-plum/50">today&apos;s special</p>
                  <p className="mt-1 font-display text-[1.15rem] leading-tight text-plum">
                    Whatever you&apos;re craving, and a table with no time limit.
                  </p>
                  <p className="hand mt-2 text-lg text-rose-deep/85">
                    side of gossip included, always
                  </p>
                  <Star4 className="absolute bottom-3 right-3 h-4 w-4 text-butter/80 anim-twinkle" />
                </div>
              </div>
              <p className="mt-4 text-center text-[0.64rem] font-bold uppercase tracking-[0.18em] text-plum/30">
                your table · no time limit · second cup&apos;s free
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
