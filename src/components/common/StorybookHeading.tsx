"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_SCENE } from "@/animations/motion";

type StorybookHeadingProps = {
  id?: string;
  number: string;
  label: string;
  title?: ReactNode;
  note?: string;
  tone?: "dark" | "light";
  className?: string;
};

export function StorybookHeading({
  id,
  number,
  label,
  title,
  note,
  tone = "dark",
  className,
}: StorybookHeadingProps) {
  const light = tone === "light";

  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.75, ease: EASE_SCENE }}
      className={cn("relative mx-auto max-w-2xl text-center", className)}
    >
      <div
        className={cn(
          "flex items-center justify-center gap-2.5 text-[0.6rem] font-extrabold uppercase tracking-[0.24em]",
          light ? "text-cream/55" : "text-plum/45",
        )}
      >
        <span className={light ? "text-butter/75" : "text-rose-deep/80"}>SC. {number}</span>
        <span className={cn("h-px w-6", light ? "bg-cream/20" : "bg-plum/15")} />
        <span>{label}</span>
      </div>

      {title ? (
        <h2
          id={id}
          className={cn(
            "display-title balance mt-3 pb-[0.1em] text-[clamp(1.85rem,6vw,3.15rem)] leading-[1.02]",
            light ? "text-cream" : "text-plum",
          )}
        >
          {title}
        </h2>
      ) : (
        <h2 id={id} className="sr-only">
          {label}
        </h2>
      )}

      {note ? (
        <p
          className={cn(
            "hand mt-1.5 text-[clamp(1.05rem,3.5vw,1.35rem)] leading-tight",
            light ? "text-butter/80" : "text-rose-deep/85",
          )}
        >
          {note}
        </p>
      ) : null}
    </motion.header>
  );
}
