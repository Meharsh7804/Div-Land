import type { CSSProperties } from "react";
import { seeded, cn } from "@/lib/utils";
import { Star4 } from "./Illustrations";

export function GrainOverlay() {
  return <div aria-hidden className="grain-overlay" />;
}

const PETAL_COLORS = ["#F6DCE7", "#FFF0B8", "#DCD5F5", "#FFDCCB", "#C98EA8"];

export function PetalRain({
  count = 16,
  seed = 7,
  className,
  slow = false,
}: {
  count?: number;
  seed?: number;
  className?: string;
  slow?: boolean;
}) {
  const random = seeded(seed);
  const petals = Array.from({ length: count }, (_, i) => {
    const left = 2 + random() * 96;
    const delay = random() * 14;
    const duration = (slow ? 18 : 11) + random() * 12;
    const size = 6 + random() * 10;
    const drift = (random() - 0.5) * 140;
    const color = PETAL_COLORS[Math.floor(random() * PETAL_COLORS.length)];
    const rotate = random() * 360;
    return { id: i, left, delay, duration, size, drift, color, rotate };
  });

  return (
    <div
      aria-hidden
      className={cn("petal-rain pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {petals.map((p) => {
        const style: CSSProperties = {
          left: `${p.left}%`,
          width: p.size,
          height: p.size * 0.72,
          background: p.color,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          transform: `rotate(${p.rotate}deg)`,
          ["--drift" as string]: `${p.drift}px`,
          borderRadius: "100% 0 100% 0",
        };
        return (
          <span
            key={p.id}
            className="absolute top-0 block opacity-0"
            style={{
              ...style,
              animationName: "petal-fall",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          />
        );
      })}
    </div>
  );
}

export function SparkleField({
  count = 22,
  seed = 11,
  className,
  tone = "text-butter",
}: {
  count?: number;
  seed?: number;
  className?: string;
  tone?: string;
}) {
  const random = seeded(seed);
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: random() * 100,
    top: random() * 100,
    size: 4 + random() * 8,
    delay: random() * 5,
    duration: 2.4 + random() * 3.5,
    opacity: 0.3 + random() * 0.7,
  }));

  return (
    <div aria-hidden className={cn("sparkle-field pointer-events-none absolute inset-0", className)}>
      {stars.map((s) => (
        <Star4
          key={s.id}
          className={cn("absolute anim-twinkle", tone)}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

export function DottedBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage:
          "radial-gradient(rgba(73,51,72,0.14) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 78%)",
      }}
    />
  );
}
