"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DUR, EASE_SCENE, STAGGER, VIEWPORT } from "@/animations/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  once?: boolean;
  direction?: Direction;
  blur?: boolean;
  duration?: number;
};

function offset(direction: Direction, distance: number) {
  if (direction === "left") return { x: distance, y: 0 };
  if (direction === "right") return { x: -distance, y: 0 };
  if (direction === "down") return { x: 0, y: -distance };
  if (direction === "none") return { x: 0, y: 0 };
  return { x: 0, y: distance };
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  amount = VIEWPORT.amount,
  once = true,
  direction = "up",
  blur = true,
  duration = DUR.scene,
}: RevealProps) {
  const from = offset(direction, y);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from, filter: blur ? "blur(5px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: EASE_SCENE,
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  stagger?: number;
};

export function Stagger({
  children,
  className,
  delay = 0,
  amount = VIEWPORT.amount,
  stagger = STAGGER.base,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  direction?: Direction;
}) {
  const from = offset(direction, y);
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...from, filter: "blur(4px)" },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: DUR.base, ease: EASE_SCENE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealTitle({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={cn("overflow-hidden pb-[0.12em]", className)}>
      <motion.h2
        className="display-title balance"
        initial={{ opacity: 0, y: "108%", rotate: 1.5 }}
        whileInView={{ opacity: 1, y: "0%", rotate: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: DUR.title, delay, ease: EASE_SCENE }}
      >
        {children}
      </motion.h2>
    </div>
  );
}
