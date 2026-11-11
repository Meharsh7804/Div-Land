import type { CSSProperties, SVGProps } from "react";

type ArtProps = SVGProps<SVGSVGElement> & {
  style?: CSSProperties;
};

const base = {
  "aria-hidden": true,
  focusable: false,
} as const;

export function Sparkle({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path
        d="M32 2c2.2 16.5 11.3 25.6 28 30-16.7 4.4-25.8 13.5-28 30-2.2-16.5-11.3-25.6-28-30 16.7-4.4 25.8-13.5 28-30Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Star4({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...base} {...props}>
      <path
        d="M12 0c1 7.2 3.8 10 12 12-8.2 2-11 4.8-12 12-1-7.2-3.8-10-12-12C8.2 10 11 7.2 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Flower({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <g fill="var(--flower-petal, #F6DCE7)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="32"
            cy="17"
            rx="9"
            ry="14"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
      </g>
      <circle cx="32" cy="32" r="7.5" fill="var(--flower-center, #FFF0B8)" />
      <circle cx="32" cy="32" r="3" fill="#C98EA8" opacity="0.55" />
    </svg>
  );
}

export function TinyFlower({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...base} {...props}>
      <g fill="currentColor">
        {[0, 90, 180, 270].map((deg) => (
          <ellipse key={deg} cx="12" cy="6" rx="3.4" ry="5.4" transform={`rotate(${deg} 12 12)`} />
        ))}
      </g>
      <circle cx="12" cy="12" r="2.6" fill="var(--flower-center, #FFF0B8)" />
    </svg>
  );
}

export function Butterfly({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path
        d="M31 30C22 10 5 8 9 24c2.5 10 12.5 11.5 20 9"
        fill="#F6DCE7"
        stroke="#C98EA8"
        strokeWidth="1.1"
      />
      <path
        d="M33 30C42 10 59 8 55 24c-2.5 10-12.5 11.5-20 9"
        fill="#DCD5F5"
        stroke="#C98EA8"
        strokeWidth="1.1"
      />
      <path
        d="M31 38c-7 14-21 16-18 5 2-7 10-8 17-8"
        fill="#FFF0B8"
        stroke="#C98EA8"
        strokeWidth="1.1"
      />
      <path
        d="M33 38c7 14 21 16 18 5-2-7-10-8-17-8"
        fill="#FFDCCB"
        stroke="#C98EA8"
        strokeWidth="1.1"
      />
      <ellipse cx="32" cy="33" rx="2.4" ry="10.5" fill="#493348" />
      <path
        d="M31 23c-3-4-6-5-8-6M33 23c3-4 6-5 8-6"
        stroke="#493348"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="23" cy="22" r="1.5" fill="#FFF9F0" opacity="0.85" />
      <circle cx="41" cy="22" r="1.5" fill="#FFF9F0" opacity="0.85" />
    </svg>
  );
}

export function Cloud({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 90 52" fill="none" className={className} {...base} {...props}>
      <path
        d="M20 46c-9 0-14-5.5-14-12.5S11 21 20 21c1-8 8.5-15 17.5-15 10 0 18 7 18.5 16 8 .5 14 6 14 13S64 46 56 46H20Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Bow({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 56" fill="none" className={className} {...base} {...props}>
      <path
        d="M30 28C19 13 5 16 7 29c2 11 15 10 23-1Z"
        fill="#F6DCE7"
        stroke="#C98EA8"
        strokeWidth="1.3"
      />
      <path
        d="M34 28c11-15 25-12 23 1-2 11-15 10-23-1Z"
        fill="#F6DCE7"
        stroke="#C98EA8"
        strokeWidth="1.3"
      />
      <path d="M26 26 14 48l9-2 5-9Z" fill="#DCD5F5" stroke="#C98EA8" strokeWidth="1.2" />
      <path d="M38 26 50 48l-9-2-5-9Z" fill="#DCD5F5" stroke="#C98EA8" strokeWidth="1.2" />
      <rect x="27" y="22" width="10" height="11" rx="4" fill="#C98EA8" />
      <path d="M32 26v4" stroke="#FFF9F0" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Heart({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 32 30" fill="none" className={className} {...base} {...props}>
      <path
        d="M16 27C8 21 2 16.5 2 10.4 2 6 5.5 2.6 9.7 2.6c2.6 0 4.7 1.1 6.3 3 1.6-1.9 3.7-3 6.3-3C26.5 2.6 30 6 30 10.4c0 6.1-6 10.6-14 16.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CoffeeCup({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path d="M10 40h38l-3 12a6 6 0 0 1-6 5H19a6 6 0 0 1-6-5l-3-12Z" fill="#FFF9F0" stroke="#493348" strokeWidth="2" />
      <path d="M48 43h4a7 7 0 0 1 0 14h-7" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 39h40" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 29h28l-2 8H17l-2-8Z" fill="#C98EA8" />
      <path d="M20 20c-2-3 2-4 0-8M31 20c-2-3 2-4 0-8M42 20c-2-3 2-4 0-8" stroke="#C98EA8" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 57h34" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MealArt({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <g transform="rotate(-24 32 32)">
        <ellipse cx="32" cy="14" rx="7.5" ry="10" fill="#F6DCE7" stroke="#493348" strokeWidth="2" />
        <path d="M32 24c1.2 11 .8 24 0 36" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="rotate(24 32 32)" stroke="#493348" strokeWidth="2" strokeLinecap="round">
        <path d="M27 5v11M32 4v12M37 5v11" />
        <path d="M26 16.5c-.8 2.4 12.8 2.4 12 0" />
        <path d="M32 19.5c1 12 .8 26 0 41" />
      </g>
      <path d="M9 13l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1 1-2.8Z" fill="#FFF0B8" />
    </svg>
  );
}

export function ChatBubbleArt({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path
        d="M15 7h34a10 10 0 0 1 10 10v15a10 10 0 0 1-10 10H34l-11 9v-9h-8a10 10 0 0 1-10-10V17A10 10 0 0 1 15 7Z"
        fill="#FFF9F0"
        stroke="#493348"
        strokeWidth="2"
      />
      <circle cx="20" cy="26" r="3" fill="#C98EA8" />
      <circle cx="32" cy="26" r="3" fill="#B0708C" />
      <circle cx="44" cy="26" r="3" fill="#C98EA8" />
    </svg>
  );
}

export function HeartHandsArt({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path
        d="M32 21c-4.5-6-14-6-14 2 0 6.5 8 11 14 16 6-5 14-9.5 14-16 0-8-9.5-8-14-2Z"
        fill="#F6DCE7"
        stroke="#493348"
        strokeWidth="2"
      />
      <path
        d="M32 26c-2.5-3.4-7.8-2.6-7.8 1.3 0 3.6 5.1 6.4 7.8 8.7 2.7-2.3 7.8-5.1 7.8-8.7 0-3.9-5.3-4.7-7.8-1.3Z"
        fill="#FFF9F0"
      />
      <path
        d="M6 46c3.5 8.5 12.5 13.5 26 13.5S54.5 54.5 58 46c-8.5 3.5-16.5 5.2-26 5.2S14.5 49.5 6 46Z"
        fill="#FFF9F0"
        stroke="#493348"
        strokeWidth="2"
      />
      <path
        d="M20 52.8c1.6 2 3.6 3.6 6 4.7M44 52.8c-1.6 2-3.6 3.6-6 4.7"
        stroke="#C98EA8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M55 6l1.2 3.4 3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4-3.4-1.2 3.4-1.2 1.2-3.4Z" fill="#FFF0B8" />
    </svg>
  );
}

export function Diya({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <ellipse cx="32" cy="46" rx="22" ry="9" fill="#C98EA8" opacity="0.35" />
      <path d="M12 38c2 9 10 13 20 13s18-4 20-13c-12 4-28 4-40 0Z" fill="#C98EA8" />
      <path d="M12 38c12 4 28 4 40 0" stroke="#B0708C" strokeWidth="2" />
      <ellipse cx="32" cy="37" rx="21" ry="5" fill="#B0708C" />
      <path d="M32 33c-5-5 0-10 0-16 6 8 8 11 0 16Z" fill="#FFF0B8" />
      <path d="M32 31c-2.5-2.7 0-5.4 0-8.6 3.2 4.3 4.3 6 0 8.6Z" fill="#FFDCCB" />
      <circle cx="32" cy="26" r="12" fill="#FFF0B8" opacity="0.22" />
    </svg>
  );
}

export function Balloon({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 48 76" fill="none" className={className} {...base} {...props}>
      <ellipse cx="24" cy="22" rx="18" ry="21" fill="currentColor" />
      <ellipse cx="18" cy="15" rx="5" ry="8" fill="#FFF9F0" opacity="0.5" />
      <path d="M24 43l-3 4h6l-3-4Z" fill="currentColor" />
      <path d="M24 47c5 8-5 12 0 20 4 6-3 8 0 9" stroke="#493348" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export function EnvelopeArt({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 80 56" fill="none" className={className} {...base} {...props}>
      <rect x="2" y="4" width="76" height="48" rx="4" fill="#FFF9F0" stroke="#493348" strokeWidth="2" />
      <path d="M3 7l37 26L77 7" stroke="#493348" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 50l24-20M77 50 53 30" stroke="#C98EA8" strokeWidth="1.4" opacity="0.7" />
      <circle cx="40" cy="34" r="6" fill="#C98EA8" />
      <path d="M40 31.5c-2-2-4.6 0-3 2.4 1 1.4 2.1 2 3 2.6.9-.6 2-1.2 3-2.6 1.6-2.4-1-4.4-3-2.4Z" fill="#FFF9F0" />
    </svg>
  );
}

export function MoonArt({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path
        d="M42 6a26 26 0 1 0 16 42A28 28 0 0 1 42 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BrainBloom({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 80 72" fill="none" className={className} {...base} {...props}>
      <path
        d="M40 14c-6-7-19-4-20 6-8 1-12 9-7 15-4 7 2 15 10 13 3 7 14 7 17 0 8 2 14-6 10-13 5-6 1-14-7-15-1-10-14-13-20-6"
        fill="#F6DCE7"
        stroke="#C98EA8"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M40 16v38M31 22c-5 3-4 9 1 10M49 22c5 3 4 9-1 10M29 41c-4 0-5 5-1 6M51 41c4 0 5 5 1 6"
        stroke="#C98EA8"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M40 36c-3-3-7-1.5-5 2 1.2 2.2 3.4 3.2 5 4.2 1.6-1 3.8-2 5-4.2 2-3.5-2-5-5-2Z"
        fill="#C98EA8"
      />
      <path d="M58 12l1.6 4.4L64 18l-4.4 1.6L58 24l-1.6-4.4L52 18l4.4-1.6L58 12Z" fill="#FFF0B8" />
      <circle cx="18" cy="12" r="2" fill="#DCD5F5" />
      <circle cx="66" cy="52" r="2.4" fill="#FFDCCB" />
    </svg>
  );
}

export function SpiralDoodle({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path
        d="M32 32c0-4 6-4 6 0 0 6-10 7-11 0-1-9 14-12 17-2 3 11-12 18-21 9-8-8-2-21 9-22 14-1 21 15 11 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MusicNote({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...base} {...props}>
      <path
        d="M9 18V5l10-2v12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="18" r="3.2" fill="currentColor" />
      <circle cx="16.5" cy="15" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function LeafSprig({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path d="M12 56C22 40 34 24 54 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <ellipse
            cx={22 + i * 6}
            cy={44 - i * 7}
            rx="7"
            ry="3.2"
            transform={`rotate(-42 ${22 + i * 6} ${44 - i * 7})`}
            fill="currentColor"
            opacity={0.75 - i * 0.06}
          />
          <ellipse
            cx={28 + i * 6}
            cy={38 - i * 7}
            rx="7"
            ry="3.2"
            transform={`rotate(42 ${28 + i * 6} ${38 - i * 7})`}
            fill="currentColor"
            opacity={0.55 - i * 0.05}
          />
        </g>
      ))}
    </svg>
  );
}

export function GiftArt({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <rect x="9" y="26" width="46" height="32" rx="4" fill="#FFF9F0" stroke="currentColor" strokeWidth="2" />
      <rect x="6" y="18" width="52" height="12" rx="3" fill="#F6DCE7" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="18" width="8" height="40" fill="#C98EA8" />
      <path d="M32 18c-3-8-14-9-14-1 0 5 7 5 14 1ZM32 18c3-8 14-9 14-1 0 5-7 5-14 1Z" fill="#C98EA8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M32 44c-2.6-2-5-3.4-5-5.4 0-1.5 1.2-2.6 2.6-2.6.9 0 1.7.4 2.4 1.2.7-.8 1.5-1.2 2.4-1.2 1.4 0 2.6 1.1 2.6 2.6 0 2-2.4 3.4-5 5.4Z" fill="#B0708C" />
      <path d="M52 10l1.2 3.4L56.6 15l-3.4 1.2L52 19.6l-1.2-3.4L47.4 15l3.4-1.6L52 10Z" fill="#FFF0B8" />
    </svg>
  );
}

export function WindArt({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path d="M8 24h26c6 0 6-9 0-9-4 0-5 3-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 34h38c8 0 8 12 0 12-5 0-7-4-5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      <path d="M12 44h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".6" />
      <path d="M50 22l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1L50 22Z" fill="currentColor" opacity=".7" />
    </svg>
  );
}

export function EyeHeart({ className, ...props }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} {...base} {...props}>
      <path
        d="M6 32s10-15 26-15 26 15 26 15-10 15-26 15S6 32 6 32Z"
        fill="#FFF9F0"
        stroke="#C98EA8"
        strokeWidth="2"
      />
      <circle cx="32" cy="32" r="9" fill="#493348" />
      <path
        d="M32 36.5c-6-4-9-7-9-10.4 0-2.4 2-4.3 4.3-4.3 1.4 0 2.6.6 3.4 1.7.8-1.1 2-1.7 3.4-1.7 2.3 0 4.3 1.9 4.3 4.3 0 3.4-3 6.4-9 10.4Z"
        fill="#F6DCE7"
      />
      <circle cx="28" cy="27" r="2" fill="#FFF9F0" />
    </svg>
  );
}
