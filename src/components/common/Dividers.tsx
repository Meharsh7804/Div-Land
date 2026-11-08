import { cn } from "@/lib/utils";

type ScallopDividerProps = {
  color: string;
  flip?: boolean;
  className?: string;
  height?: number;
};

export function ScallopDivider({
  color,
  flip = false,
  className,
  height = 56,
}: ScallopDividerProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative z-[1] w-full leading-none",
        flip && "rotate-180",
        className,
      )}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <path
          d="M0 96V56c40 0 40-34 80-34s40 34 80 34 40-34 80-34 40 34 80 34 40-34 80-34 40 34 80 34 40-34 80-34 40 34 80 34 40-34 80-34 40 34 80 34 40-34 80-34 40 34 80 34 40-34 80-34 40 34 80 34 40-34 80-34 40 34 80 34 40-34 80-34 40 34 80 34 40-34 80-34 40 34 80 34 40-34 80-34v74Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

export function WaveDivider({
  color,
  className,
}: {
  color: string;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none w-full leading-none", className)}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-14 w-full sm:h-20">
        <path
          d="M0 44c120-36 240-36 360 0s240 36 360 0 240-36 360 0 240 36 360 0v36H0Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
