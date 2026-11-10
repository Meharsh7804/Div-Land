"use client";

import { motion } from "motion/react";
import { seeded, cn } from "@/lib/utils";
import { DUR, EASE_SCENE } from "@/animations/motion";
import { ChapterSigil, type SigilName } from "./ChapterSigils";
import { Star4 } from "./Illustrations";

type SceneBridgeProps = {
  variant: "contact" | "nightfall" | "curtain" | "seal";
};

const frameRandom = seeded(48);
const contactFrames = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  color: ["#F6DCE7", "#FFF0B8", "#DCD5F5", "#FFDCCB", "#C98EA8"][i % 5],
  rotate: (frameRandom() - 0.5) * 6,
  exposure: 0.55 + frameRandom() * 0.45,
}));

const starRandom = seeded(19);
const nightStars = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: 3 + starRandom() * 94,
  top: 4 + starRandom() * 46,
  size: 1.5 + starRandom() * 2.8,
  opacity: 0.2 + starRandom() * 0.7,
  delay: starRandom() * 4,
}));

const dustRandom = seeded(33);
const stageDust = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: 28 + dustRandom() * 44,
  top: 12 + dustRandom() * 60,
  size: 1 + dustRandom() * 2.2,
  delay: dustRandom() * 6,
  duration: 6 + dustRandom() * 6,
}));

function BridgeCue({
  name,
  label,
  light = false,
  className,
}: {
  name: SigilName;
  label: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("absolute z-10 flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border p-1",
          light
            ? "border-butter/30 bg-plum/40 text-butter/80"
            : "border-plum/20 bg-cream/75 text-rose-deep",
        )}
      >
        <ChapterSigil name={name} />
      </span>
      <span
        className={cn(
          "text-[0.58rem] font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.22em]",
          light ? "text-cream/60" : "text-plum/45",
        )}
      >
        next · {label}
      </span>
    </div>
  );
}

export function SceneBridge({ variant }: SceneBridgeProps) {
  if (variant === "contact") {
    return (
      <div
        aria-hidden
        className="relative flex h-32 items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#FFF6E7_0%,#F5E8E1_100%)] sm:h-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,.55),transparent_68%)]" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.scene, ease: EASE_SCENE }}
          className="relative h-[5.4rem] w-[112%] max-w-[64rem] border-y border-plum/10 bg-[#EFDFD8] shadow-[0_18px_40px_-30px_rgba(47,31,46,.55)] sm:h-[6.6rem]"
        >
          <span className="absolute inset-x-0 top-0 z-10 h-2 bg-[repeating-linear-gradient(90deg,transparent_0_7px,rgba(73,51,72,.28)_7px_13px,transparent_13px_21px)] opacity-70" />
          <span className="absolute inset-x-0 bottom-0 z-10 h-2 bg-[repeating-linear-gradient(90deg,transparent_0_7px,rgba(73,51,72,.28)_7px_13px,transparent_13px_21px)] opacity-70" />

          <motion.div
            className="absolute inset-y-2.5 left-0 flex w-[124%] gap-1.5 px-2"
            animate={{ x: ["-2.2%", "-0.4%", "-2.2%"] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            {contactFrames.map((frame, index) => (
              <span
                key={frame.id}
                className="relative h-full min-w-0 flex-1 overflow-hidden rounded-[2px] border border-plum/15"
                style={{
                  background: `linear-gradient(155deg, ${frame.color} 0%, #FFF9F0 100%)`,
                  transform: `rotate(${frame.rotate}deg)`,
                  opacity: frame.exposure,
                }}
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_38%_28%,rgba(255,255,255,.85),transparent_62%)]" />
                <span className="absolute inset-x-1 bottom-1 h-px bg-plum/20" />
                <span className="absolute bottom-1 left-1.5 font-display text-[0.64rem] italic leading-none text-plum/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Star4 className="absolute right-1.5 top-1.5 h-2 w-2 text-plum/20" />
              </span>
            ))}
          </motion.div>

          <span className="absolute inset-x-0 top-2.5 z-20 h-px bg-cream/40" />
        </motion.div>

        <p className="absolute left-4 top-2 hidden text-[0.6rem] font-extrabold uppercase tracking-[0.24em] text-plum/40 sm:left-6 sm:block">
          contact sheet · reels 03—04
        </p>
        <p className="absolute bottom-2 right-4 hidden text-[0.6rem] font-extrabold uppercase tracking-[0.24em] text-plum/35 sm:right-6 sm:block">
          kodak 400 · not for distribution
        </p>
        <BridgeCue name="memories" label="the little things" className="bottom-2 left-4 sm:left-6" />
      </div>
    );
  }

  if (variant === "nightfall") {
    return (
      <div
        aria-hidden
        className="relative h-40 overflow-hidden bg-[linear-gradient(180deg,#FFF6E7_0%,#F3D9DE_20%,#C98EA8_46%,#6B4760_70%,#2A1C29_100%)] sm:h-48"
      >
        <div className="absolute left-1/2 top-[46%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFE6B0_0%,#F0B7A3_42%,transparent_72%)] opacity-85 blur-[1px] sm:h-36 sm:w-36" />

        <div className="absolute inset-x-0 top-[58%] h-px bg-butter/30" />
        <div className="absolute inset-x-0 top-[62%] h-px bg-butter/12" />

        {nightStars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-butter anim-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              boxShadow: "0 0 8px 2px rgba(255,240,184,.22)",
            }}
          />
        ))}

        <span className="anim-shoot absolute right-[18%] top-[14%] h-px w-24 bg-gradient-to-r from-transparent via-cream/80 to-transparent" />
        <span
          className="anim-shoot absolute right-[4%] top-[30%] h-px w-16 bg-gradient-to-r from-transparent via-butter/70 to-transparent"
          style={{ animationDelay: "4.5s", animationDuration: "9s" }}
        />

        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-20"
        >
          <path d="M0 180V96l134-26 118 34 164-44 148 38 152-28 138 32 150-42 152 38 134-20 150 26v76Z" fill="#3A2638" opacity=".85" />
          <path d="M0 180v-38l180-22 140 30 190-36 180 40 190-26 170 28 210-34 180 28v40Z" fill="#2A1C29" />
        </svg>

      </div>
    );
  }

  if (variant === "curtain") {
    return (
      <div
        aria-hidden
        className="relative h-36 overflow-hidden bg-[linear-gradient(180deg,#1E141C_0%,#2F1F2E_38%,#4A3044_68%,#F4DECE_90%,#FFF9F0_100%)] sm:h-44"
      >
        <div className="absolute left-1/2 top-0 h-full w-[74%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,240,184,.2),rgba(255,240,184,.06)_48%,transparent_82%)] [clip-path:polygon(42%_0,58%_0,100%_100%,0_100%)] blur-md" />

        {stageDust.map((mote) => (
          <span
            key={mote.id}
            className="absolute rounded-full bg-butter/70 anim-dust"
            style={{
              left: `${mote.left}%`,
              top: `${mote.top}%`,
              width: mote.size,
              height: mote.size,
              animationDelay: `${mote.delay}s`,
              animationDuration: `${mote.duration}s`,
            }}
          />
        ))}

        <div
          className="absolute inset-y-0 left-0 w-[42%] bg-[repeating-linear-gradient(90deg,#1E141C_0_10px,#2F1F2E_10px_20px,#241821_20px_30px)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 74% 100%, 0 100%)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[42%] bg-[repeating-linear-gradient(270deg,#1E141C_0_10px,#2F1F2E_10px_20px,#241821_20px_30px)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 26% 100%)" }}
        />
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#1E141C]/90 to-transparent" />

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: DUR.scene, ease: EASE_SCENE }}
          className="absolute left-1/2 top-[62%] h-px w-[min(58vw,26rem)] origin-center -translate-x-1/2 bg-gradient-to-r from-transparent via-butter/70 to-transparent"
        />
        <div className="absolute left-1/2 top-[62%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-butter/20 blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#FFF9F0] to-transparent" />

        <BridgeCue name="letter" label="sealed &amp; sent" light className="bottom-3 left-1/2 -translate-x-1/2" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="relative h-40 overflow-hidden bg-[linear-gradient(180deg,#FFF9F0_0%,#F6E0D5_26%,#5A3C50_66%,#251922_100%)] sm:h-48"
    >
      <div className="absolute left-1/2 top-0 h-24 w-[min(36rem,72vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,240,184,.22),transparent_70%)]" />
      <div className="absolute inset-x-0 top-[52%] flex items-center justify-center">
        <span className="h-px w-[30%] bg-gradient-to-r from-transparent to-butter/55" />
        <motion.span
          initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: DUR.scene, ease: EASE_SCENE }}
          className="relative mx-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#8F5069] bg-[radial-gradient(circle_at_35%_30%,#C97E9B,#8F5069_70%)] font-display text-lg italic text-cream shadow-[0_12px_24px_-12px_rgba(0,0,0,.75)] sm:h-16 sm:w-16"
        >
          <span className="absolute inset-1 rounded-full border border-cream/25" />
          <span className="absolute inset-2 rounded-full border border-cream/10" />
          D
        </motion.span>
        <span className="h-px w-[30%] bg-gradient-to-l from-transparent to-butter/55" />
      </div>

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: DUR.base, delay: 0.2, ease: EASE_SCENE }}
        className="absolute left-1/2 top-[62%] hidden -translate-x-1/2 whitespace-nowrap text-[0.6rem] font-extrabold uppercase tracking-[0.34em] text-butter/45 sm:block"
      >
        sealed · stamped · on its way
      </motion.span>

      {[
        { className: "left-[22%] top-[28%] h-1.5 w-1.5 bg-butter/60", delay: 0 },
        { className: "right-[24%] top-[20%] h-1 w-1 bg-butter/45", delay: 1.2 },
        { className: "right-[18%] top-[34%] h-2 w-2 bg-blush/40", delay: 2.1 },
        { className: "bottom-[18%] left-[18%] h-px w-14 bg-gradient-to-r from-transparent via-butter/40 to-transparent", delay: 0.6 },
      ].map((spark, index) => (
        <span
          key={index}
          className={cn("absolute anim-twinkle", spark.className)}
          style={{ animationDelay: `${spark.delay}s` }}
        />
      ))}

      <BridgeCue name="finale" label="make a wish" light className="right-4 top-4 sm:right-6" />
    </div>
  );
}
