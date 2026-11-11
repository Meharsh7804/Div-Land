import type { CSSProperties, SVGProps } from "react";
import { cn } from "@/lib/utils";

type ArtProps = SVGProps<SVGSVGElement>;

const base = {
  "aria-hidden": true,
  focusable: false,
} as const;

/* ————————————————— washi tape ————————————————— */

export type TapeTone = "butter" | "rose" | "lav" | "mint" | "cream";

export function Tape({
  tone = "butter",
  className,
  style,
}: {
  tone?: TapeTone;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={cn("sb-tape", `sb-tape--${tone}`, className)}
      style={style}
    />
  );
}

/* ————————————————— pressed botanicals ————————————————— */

export function PressedFlower({ className, ...props }: ArtProps) {
  const petals = ["#E9C2D3", "#D7CBE9", "#F1D2C0", "#E9C2D3", "#E4DCC0"];
  return (
    <svg viewBox="0 0 64 96" fill="none" className={className} {...base} {...props}>
      <path
        d="M32 94C32 72 32 54 32 40"
        stroke="#9AA98C"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M32 68c-8-1-13-7-14-14 7 0 12 4 14 10M32 58c8-1 13-7 14-14-7 0-12 4-14 10"
        fill="#BCC9AE"
        stroke="#93A588"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <g transform="translate(32 28)">
        {[0, 72, 144, 216, 288].map((deg, index) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-13"
            rx="8"
            ry="13"
            transform={`rotate(${deg})`}
            fill={petals[index]}
            opacity="0.94"
          />
        ))}
        <circle r="6.4" fill="#F4E2A6" />
        <circle r="2.6" fill="#C98EA8" opacity="0.55" />
      </g>
    </svg>
  );
}

export function Eucalyptus({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 48 122" fill="none" className={className} {...base} {...props}>
      <path
        d="M24 118C24 92 24 64 24 32"
        stroke="#93A588"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 32 + i * 15;
        const r = 9 - i * 0.6;
        return (
          <g key={i}>
            <ellipse cx={24 - r * 1.05} cy={y} rx={r} ry={r * 0.7} fill="#B7C6A9" opacity="0.85" />
            <ellipse cx={24 + r * 1.05} cy={y + 7} rx={r} ry={r * 0.7} fill="#C9D5BC" opacity="0.85" />
          </g>
        );
      })}
      <circle cx="24" cy="26" r="6.5" fill="#C7D3BD" />
    </svg>
  );
}

export function Bouquet({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 80 96" fill="none" className={className} {...base} {...props}>
      <path
        d="M40 94c-6-16-10-26-14-34M40 94c0-18 2-30 6-40M40 94c6-14 10-22 16-28"
        stroke="#93A588"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <g transform="translate(24 52)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="0" cy="-8" rx="5" ry="8" transform={`rotate(${deg})`} fill="#F0C6D6" />
        ))}
        <circle r="3.6" fill="#F4E2A6" />
      </g>
      <g transform="translate(52 48)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="0" cy="-7" rx="4.4" ry="7" transform={`rotate(${deg})`} fill="#D8CEEA" />
        ))}
        <circle r="3.2" fill="#FFF9F0" />
      </g>
      <g transform="translate(40 34)">
        {[0, 90, 180, 270].map((deg) => (
          <ellipse key={deg} cx="0" cy="-9" rx="5" ry="9" transform={`rotate(${deg})`} fill="#FFDCCB" />
        ))}
        <circle r="3.6" fill="#C98EA8" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ————————————————— delicate butterfly ————————————————— */

export function DelicateButterfly({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 58" fill="none" className={className} {...base} {...props}>
      <path
        d="M31 27C20 8 3 11 8 25c3 10 14 10 21 6"
        fill="#F6DCE7"
        stroke="#C98EA8"
        strokeWidth="1.1"
      />
      <path
        d="M33 27C44 8 61 11 56 25c-3 10-14 10-21 6"
        fill="#DCD5F5"
        stroke="#C98EA8"
        strokeWidth="1.1"
      />
      <path
        d="M31 36c-7 12-19 12-16 2 2-6 10-7 16-6"
        fill="#FFF0B8"
        stroke="#C98EA8"
        strokeWidth="1.1"
      />
      <path
        d="M33 36c7 12 19 12 16 2-2-6-10-7-16-6"
        fill="#FFDCCB"
        stroke="#C98EA8"
        strokeWidth="1.1"
      />
      <path d="M32 23v22" stroke="#493348" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M31 21c-3-3-5-4-7-5M33 21c3-3 5-4 7-5"
        stroke="#493348"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ————————————————— ink doodles ————————————————— */

export function DoodleHeart({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 28 26" fill="none" className={className} {...base} {...props}>
      <path
        d="M14 23C6.5 17.5 2 13.6 2 8.9 2 5.4 4.8 2.6 8.1 2.6c2.2 0 4.1 1.1 5.9 3.3 1.8-2.2 3.7-3.3 5.9-3.3C23.2 2.6 26 5.4 26 8.9c0 4.7-4.5 8.6-12 14.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Squiggle({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 120 20" fill="none" className={className} {...base} {...props}>
      <path
        d="M4 13c12-9 20 4 32-2s20 4 32-2 20 4 32-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CurlyArrow({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 72 56" fill="none" className={className} {...base} {...props}>
      <path
        d="M6 8c26 2 44 12 50 34"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M48 38c4 4 8 4 12 2M56 44c-1-5-1-9 0-13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaperClip({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 32 64" fill="none" className={className} {...base} {...props}>
      <path
        d="M10 22v24a6 6 0 0 0 12 0V14a10 10 0 0 0-20 0v30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ————————————————— wax seal & stamp ————————————————— */

export function WaxSeal({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path
        d="M32 3c3 6 9 3 13 7s1 10 6 13-2 9-1 14-6 6-8 10-8 3-12 2-8-5-13-5-6-8-8-12 3-10 1-15 6-8 9-11 10 3 13-3Z"
        fill="#C98EA8"
      />
      <path
        d="M32 8c2.5 5 7.5 2.5 10.5 6S44 22 48 24.5s-1.5 7.5-.5 11.5-5 5-6.5 8-6.5 2.5-9.5 1.5-6.5-4-10.5-4-5-6.5-6.5-9.5 2.5-8 .5-12 5-6.5 7.5-9 7 2.5 9.5-2.5Z"
        fill="#B0708C"
        opacity="0.5"
      />
      <path
        d="M32 40c-5.5-4-8.5-6.6-8.5-10 0-2.6 2-4.6 4.6-4.6 1.5 0 2.8.7 3.9 2 1.1-1.3 2.4-2 3.9-2 2.6 0 4.6 2 4.6 4.6 0 3.4-3 6-8.5 10Z"
        fill="#FFF9F0"
      />
    </svg>
  );
}

export function PostageStamp({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 72 88" fill="none" className={className} {...base} {...props}>
      <path
        d="M4 8h64v72H4z"
        fill="#FFF9F0"
        stroke="#C98EA8"
        strokeWidth="1"
        strokeDasharray="3 3.4"
      />
      <rect x="9" y="13" width="54" height="52" rx="2" fill="#F6DCE7" />
      <path d="M9 46c12-6 22 4 34-2s20 2 20 2v19H9Z" fill="#DCD5F5" opacity="0.8" />
      <circle cx="47" cy="26" r="6" fill="#FFF0B8" />
      <path
        d="M22 52c4-8 10-12 14-12s10 4 14 12"
        stroke="#B0708C"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M36 66c-2.6-2-4.6-3.2-4.6-5.2 0-1.4 1.1-2.5 2.5-2.5.8 0 1.6.4 2.1 1.1.5-.7 1.3-1.1 2.1-1.1 1.4 0 2.5 1.1 2.5 2.5 0 2-2 3.2-4.6 5.2Z"
        fill="#C98EA8"
      />
    </svg>
  );
}

/* ————————————————— corner vine ————————————————— */

export function CornerVine({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={className} {...base} {...props}>
      <path
        d="M4 4c44 6 78 22 104 54 10 12 16 26 20 42"
        stroke="#A8BA9C"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 16 + i * 22;
        const y = 12 + i * 18;
        return (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="10" ry="4.4" transform={`rotate(${24 + i * 14} ${x} ${y})`} fill="#C7D3BD" opacity="0.85" />
            <ellipse cx={x + 10} cy={y + 8} rx="9" ry="4" transform={`rotate(${60 + i * 10} ${x + 10} ${y + 8})`} fill="#B7C6A9" opacity="0.75" />
          </g>
        );
      })}
      <g transform="translate(96 74)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="0" cy="-8" rx="5" ry="8" transform={`rotate(${deg})`} fill="#F0C6D6" />
        ))}
        <circle r="3.4" fill="#F4E2A6" />
      </g>
      <circle cx="58" cy="40" r="3.4" fill="#DCD5F5" />
      <circle cx="30" cy="24" r="2.6" fill="#FFDCCB" />
    </svg>
  );
}
