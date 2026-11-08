import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export type SigilName =
  | "invitation"
  | "files"
  | "overthinking"
  | "cafe"
  | "memories"
  | "gallery"
  | "letter"
  | "finale";

type SigilProps = SVGProps<SVGSVGElement> & {
  name: SigilName;
};

/**
 * Eight small, original chapter marks. They are the thread that ties the
 * navigation, the scene slates and the transitions to the same world.
 */
export function ChapterSigil({ name, className, ...props }: SigilProps) {
  const shared = {
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };

  return (
    <svg className={cn("h-full w-full", className)} {...shared} {...props}>
      {name === "invitation" ? (
        <>
          <path d="M8 33V17a12 12 0 0 1 24 0v16" />
          <path d="M4 33h32M13 33V19a7 7 0 0 1 14 0v14" opacity=".55" />
          <circle cx="20" cy="13" r="2.6" fill="currentColor" stroke="none" opacity=".55" />
          <path d="M20 23c-3-3-7-1-5 2.4.9 1.6 2.7 2.4 5 3.6 2.3-1.2 4.1-2 5-3.6 2-3.4-2-5.4-5-2.4Z" fill="currentColor" stroke="none" opacity=".7" />
        </>
      ) : null}

      {name === "files" ? (
        <>
          <path d="M6 12h10l3 4h15v16a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V12Z" />
          <path d="M6 19h28" opacity=".45" />
          <path d="M20 29c-3-2.4-6-4-6-6.2 0-1.6 1.3-2.8 2.8-2.8.9 0 1.7.4 2.2 1 .5-.6 1.3-1 2.2-1 1.5 0 2.8 1.2 2.8 2.8 0 2.2-3 3.8-6 6.2Z" fill="currentColor" stroke="none" opacity=".7" />
          <path d="M12 8h7" opacity=".5" />
        </>
      ) : null}

      {name === "overthinking" ? (
        <>
          <path d="M20 20c0-3 4.6-3 4.6 0 0 4.6-7.4 5.4-8.3 0-.8-6.7 10.4-9 12.7-1.6 2.2 8-8.6 13.3-15.5 6.7-6-5.7-1.5-15.6 6.7-16.3C27 8 32 18.8 25.2 26" opacity=".8" />
          <path d="M20 20c-1.6-2.6-4.6-2-4.6.4 0 2.6 2.7 3.4 4.6 4.6 1.9-1.2 4.6-2 4.6-4.6 0-2.4-3-3-4.6-.4Z" fill="currentColor" stroke="none" opacity=".75" />
          <path d="M31 9l1 2.8L35 13l-3 1.2L31 17l-1-2.8L27 13l3-1.2L31 9Z" fill="currentColor" stroke="none" opacity=".8" />
        </>
      ) : null}

      {name === "cafe" ? (
        <>
          <path d="M9 18h20l-1.6 10.4a5 5 0 0 1-5 4.6h-6.8a5 5 0 0 1-5-4.6L9 18Z" />
          <path d="M29 20h2.4a3.8 3.8 0 0 1 0 7.6H28" />
          <path d="M8 36h24" opacity=".5" />
          <path d="M15 13c-1.5-2.4 1.5-3 0-6M20 13c-1.5-2.4 1.5-3 0-6M25 13c-1.5-2.4 1.5-3 0-6" opacity=".65" />
          <path d="M13 22h14" opacity=".4" />
        </>
      ) : null}

      {name === "memories" ? (
        <>
          <rect x="9" y="7" width="18" height="22" rx="2" transform="rotate(-8 18 18)" opacity=".55" />
          <rect x="14" y="11" width="18" height="22" rx="2" />
          <path d="M18 16h10M18 20h7" opacity=".5" />
          <circle cx="23" cy="27" r="2" fill="currentColor" stroke="none" opacity=".65" />
          <path d="M6 33c8 2 20 2 28-1" strokeDasharray="1.5 4" opacity=".55" />
        </>
      ) : null}

      {name === "gallery" ? (
        <>
          {[0, 45, 90, 135].map((deg) => (
            <ellipse key={deg} cx="20" cy="13.5" rx="3.4" ry="7" transform={`rotate(${deg} 20 20)`} opacity=".7" />
          ))}
          <circle cx="20" cy="20" r="4.2" fill="currentColor" stroke="none" opacity=".7" />
          <circle cx="20" cy="20" r="14" strokeDasharray="1.5 4" opacity=".5" />
          <circle cx="20" cy="20" r="17.5" opacity=".35" />
          <circle cx="20" cy="3" r="1" fill="currentColor" stroke="none" opacity=".8" />
          <circle cx="37" cy="20" r="1" fill="currentColor" stroke="none" opacity=".8" />
          <circle cx="3" cy="20" r="1" fill="currentColor" stroke="none" opacity=".8" />
        </>
      ) : null}

      {name === "letter" ? (
        <>
          <rect x="5" y="12" width="30" height="20" rx="2.5" />
          <path d="M6 14l14 10 14-10" opacity=".7" />
          <circle cx="20" cy="27" r="4.2" fill="currentColor" stroke="none" opacity=".65" />
          <path d="M20 25.2c-1.4-1.4-3.4-.6-2.8 1.2.4 1.2 1.6 1.7 2.8 2.5 1.2-.8 2.4-1.3 2.8-2.5.6-1.8-1.4-2.6-2.8-1.2Z" fill="#FFF9F0" stroke="none" opacity=".9" />
          <path d="M9 17.5v10M31 17.5v10" opacity=".35" />
        </>
      ) : null}

      {name === "finale" ? (
        <>
          <path d="M9 21h22v12a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V21Z" />
          <path d="M7 26h26" opacity=".4" />
          <path d="M13 21c0-3 2-5 7-5s7 2 7 5" opacity=".6" />
          <path d="M15 16V9M20 16V8M25 16V9" />
          <path d="M15 7c-1.4-1.8.8-2.4 0-4M20 6c-1.4-1.8.8-2.4 0-4M25 7c-1.4-1.8.8-2.4 0-4" opacity=".8" />
          <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
          <circle cx="20" cy="9" r="1" fill="currentColor" stroke="none" />
          <circle cx="25" cy="10" r="1" fill="currentColor" stroke="none" />
        </>
      ) : null}
    </svg>
  );
}
