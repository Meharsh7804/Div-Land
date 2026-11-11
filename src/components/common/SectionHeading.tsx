"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DUR, EASE_SCENE } from "@/animations/motion";
import { ChapterSigil, type SigilName } from "./ChapterSigils";
import { WordReveal } from "./AnimatedText";
import { Sparkle } from "./Illustrations";

type HeadingVariant = "center" | "editorial" | "placard" | "marquee";

type SectionHeadingProps = {
  number?: string;
  eyebrow?: string;
  title: ReactNode;
  script?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  variant?: HeadingVariant;
  sceneId?: SigilName;
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  number,
  eyebrow,
  title,
  script,
  align = "center",
  tone = "dark",
  variant = "center",
  sceneId,
  className,
  children,
}: SectionHeadingProps) {
  const light = tone === "light";
  const isCenter = variant === "center" || variant === "marquee";
  const isMarquee = variant === "marquee";
  const isEditorial = variant === "editorial";
  const isPlacard = variant === "placard";
  const resolvedAlign = isEditorial || isPlacard ? "left" : align;

  const eyebrowColor = light ? "text-blush/85" : "text-rose-ink";
  const ruleColor = light ? "bg-blush/35" : "bg-rose/40";
  const titleColor = light ? "text-cream" : "text-plum";
  const scriptColor = light ? "text-butter/90" : "text-rose-deep";
  const bodyColor = light ? "text-cream/75" : "text-ink/75";
  const medallion = light
    ? "border-blush/35 bg-cream/[0.06] text-blush"
    : "border-plum/15 bg-cream/70 text-rose-deep";
  const watermark = light ? "text-cream/[0.045]" : "text-plum/[0.045]";
  const sceneNumber = number ? `SC. ${number}` : null;

  return (
    <div
      className={cn(
        "relative",
        resolvedAlign === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left",
        isEditorial && "max-w-4xl",
        isPlacard && "max-w-2xl",
        isMarquee && "mx-auto max-w-4xl text-center",
        className,
      )}
    >
      {sceneId ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute select-none",
            watermark,
            isCenter
              ? "left-1/2 top-[46%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 sm:h-72 sm:w-72"
              : "-right-10 -top-16 hidden h-48 w-48 lg:block",
          )}
        >
          <ChapterSigil name={sceneId} className="h-full w-full" />
        </div>
      ) : null}

      {isEditorial && number ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -right-4 -top-20 hidden select-none font-display text-[12rem] italic leading-none tracking-[-0.08em] lg:block",
            light ? "text-cream/[0.035]" : "text-plum/[0.035]",
          )}
        >
          {number}
        </span>
      ) : null}

      {isPlacard ? (
        <motion.div
          className="flex items-start gap-3 sm:gap-4"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.base, ease: EASE_SCENE }}
        >
          <span
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.55rem] border p-2.5 sm:h-14 sm:w-14",
              medallion,
            )}
          >
            {sceneId ? (
              <ChapterSigil name={sceneId} />
            ) : (
              <Sparkle className="h-full w-full" />
            )}
          </span>
          <div
            className={cn(
              "mt-1 border-l pl-3 sm:pl-4",
              light ? "border-butter/25" : "border-rose/35",
            )}
          >
            <p className={cn("eyebrow", eyebrowColor)}>{eyebrow}</p>
            <p
              className={cn(
                "mt-1 text-[0.64rem] font-extrabold uppercase tracking-[0.28em]",
                light ? "text-cream/35" : "text-plum/70",
              )}
            >
              {sceneNumber ?? "scene"} · take one
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className={cn(
            "flex items-center gap-3",
            isCenter ? "justify-center" : "justify-start",
          )}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.base, ease: EASE_SCENE }}
        >
          <span
            className={cn("h-px", isEditorial ? "w-10 sm:w-16" : "w-7 sm:w-10", ruleColor)}
          />
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border p-1.5",
              medallion,
            )}
          >
            {sceneId ? (
              <ChapterSigil name={sceneId} />
            ) : (
              <Sparkle className="h-full w-full" />
            )}
          </span>
          <span className={cn("eyebrow", eyebrowColor)}>{eyebrow}</span>
          {sceneNumber ? (
            <span
              className={cn(
                "font-display text-xs italic",
                light ? "text-blush/55" : "text-plum/70",
              )}
            >
              {sceneNumber}
            </span>
          ) : null}
          <span
            className={cn(
              "h-px",
              isEditorial ? "w-10 sm:w-16" : isMarquee ? "w-14 sm:w-24" : "w-7 sm:w-10",
              ruleColor,
            )}
          />
          {isEditorial ? (
            <span className={cn("h-1 w-1 rounded-full", light ? "bg-butter" : "bg-rose")} />
          ) : null}
        </motion.div>
      )}

      <h2
        className={cn(
          "display-title balance pb-[0.12em]",
          isMarquee
            ? "mt-6 text-[clamp(2.5rem,8vw,5.1rem)]"
            : isPlacard
              ? "mt-4 text-[clamp(2.1rem,5.8vw,3.7rem)]"
              : "mt-5 text-[clamp(2.3rem,7.2vw,4.6rem)]",
          titleColor,
        )}
      >
        <WordReveal delay={0.04}>{title}</WordReveal>
      </h2>

      {script ? (
        <motion.div
          className={cn(
            "mt-2 flex items-center gap-3",
            isCenter ? "justify-center" : "justify-start",
          )}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.base, delay: 0.16, ease: EASE_SCENE }}
        >
          {!isCenter ? <span className={cn("h-px w-6", ruleColor)} /> : null}
          <p className={cn("hand text-[clamp(1.3rem,4.2vw,1.8rem)]", scriptColor)}>{script}</p>
          <span
            aria-hidden
            className={cn(
              "flex h-4 w-4 items-center justify-center",
              light ? "text-butter/60" : "text-rose/60",
            )}
          >
            {sceneId ? (
              <ChapterSigil name={sceneId} />
            ) : (
              <Sparkle className="h-2.5 w-2.5" />
            )}
          </span>
        </motion.div>
      ) : null}

      {children ? (
        <motion.div
          className={cn(
            "mt-5 max-w-2xl text-[0.94rem] leading-relaxed sm:text-base",
            isCenter ? "mx-auto" : "ml-0",
            bodyColor,
          )}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.base, delay: 0.22, ease: EASE_SCENE }}
        >
          {children}
        </motion.div>
      ) : null}
    </div>
  );
}
