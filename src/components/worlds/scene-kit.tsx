"use client";

import type { ReactNode } from "react";
import { cn, seeded } from "@/lib/utils";

export function SceneLayer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {children}
    </div>
  );
}

type DriftFieldProps = {
  count: number;
  seed: number;
  tones: string[];
  className?: string;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  opacity?: number;
};

export function DriftField({
  count,
  seed,
  tones,
  className,
  minSize = 2,
  maxSize = 5,
  minDuration = 7,
  maxDuration = 14,
  opacity = 0.35,
}: DriftFieldProps) {
  const random = seeded(seed);
  const motes = Array.from({ length: count }, (_, index) => {
    const size = minSize + random() * (maxSize - minSize);
    return {
      id: index,
      left: 4 + random() * 92,
      top: 6 + random() * 82,
      size,
      tone: tones[index % tones.length],
      duration: minDuration + random() * (maxDuration - minDuration),
      delay: random() * -14,
    };
  });

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {motes.map((mote) => (
        <span
          key={mote.id}
          className="absolute rounded-full blur-[0.5px] anim-float"
          style={{
            left: `${mote.left}%`,
            top: `${mote.top}%`,
            width: mote.size,
            height: mote.size,
            background: mote.tone,
            opacity,
            animationDuration: `${mote.duration}s`,
            animationDelay: `${mote.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
