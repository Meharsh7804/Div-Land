import type { SVGProps } from "react";
import type { SkillId } from "@/data/making";

type SkillGlyphProps = SVGProps<SVGSVGElement> & {
  id: SkillId;
};

const shared = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function SkillGlyph({ id, className, ...props }: SkillGlyphProps) {
  return (
    <svg className={className} {...shared} {...props}>
      {id === "creativity" ? (
        <>
          <path
            d="M8.5 29.5C6 21 12.5 13.5 22 12.6c9.4-.9 16.6 4.4 15.9 12-.6 6.7-7.4 5.9-10.3 8.8-2.8 2.8-1.7 6.6-5.7 6.6-6 0-10.6-3.8-13.4-10.5Z"
            fill="#FFF9F0"
          />
          <circle cx="17" cy="20" r="2.2" fill="#C95D86" stroke="none" />
          <circle cx="25" cy="17" r="2.2" fill="#D6A23F" stroke="none" />
          <circle cx="32" cy="23" r="2.2" fill="#8A6BB5" stroke="none" />
          <circle cx="22" cy="27" r="1.6" fill="#4E8C7A" stroke="none" />
          <path d="M30 32.5 39.6 16.4l3.2 1.9-9.2 16.5" fill="#F2C8D7" />
          <path d="M33.6 34.8l-2.6 3.4-3.9.7 1.7-3.6 4.8-.5Z" fill="#493348" stroke="none" />
          <path d="M38.4 13.5c1.7-2.9 2.7-4.6 4.3-5.3 1.1-.5 2.2.8 1.4 2-.9 1.3-3.1 1.9-5.7 3.3Z" fill="#7C9A70" stroke="none" />
        </>
      ) : null}

      {id === "confidence" ? (
        <>
          <path d="M7 35c6.3-5.7 11.1 2.4 17.7-2.3 5.2-3.7 4.8-9.7.9-10.6-3.2-.7-5.3 2.5-3.1 4.6 1.6 1.5 4.7.7 5.6-1.8" opacity=".6" />
          <path d="m26.7 8.5 9.7 9.7-17.5 17.5-9.7-9.7L26.7 8.5Z" fill="#FFF9F0" />
          <path d="m26.7 8.5 9.7 9.7-4 4-9.7-9.7 4-4Z" fill="#DCD5F5" />
          <path d="m9.2 26 9.7 9.7-1.6 4.6-7.1 1.9 1.9-7.1L9.2 26Z" fill="#F6DCE7" />
          <path d="m15.5 32.5 3.1 3.1M13.4 36l2 2" opacity=".55" />
          <path d="M35.5 6.6l1 2.6 2.7 1-2.7 1-1 2.6-1-2.6-2.7-1 2.7-1 1-2.6Z" fill="#D6A23F" stroke="none" opacity=".85" />
        </>
      ) : null}

      {id === "cooking" ? (
        <>
          <path d="M18 12.5c-1.6-1.8.2-3-.5-4.6M24 11.5c-1.6-1.8.2-3-.5-4.6M30 12.5c-1.6-1.8.2-3-.5-4.6" stroke="#7C9A70" strokeWidth="1.3" strokeLinecap="round" opacity=".7" />
          <circle cx="24" cy="13.2" r="2.1" fill="#D6A23F" stroke="none" />
          <path d="M13.5 20.5h21l-1.3-3.1a2.2 2.2 0 0 0-2-1.4H16.8a2.2 2.2 0 0 0-2 1.4Z" fill="#DCD5F5" />
          <path d="M9 22h30v8.5a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6Z" fill="#FFF9F0" />
          <path d="M9 24H6.5a2.6 2.6 0 0 0 0 5.2H9M39 24h2.5a2.6 2.6 0 0 1 0 5.2H39" strokeWidth="1.3" />
          <path d="M14 27.5c3 1.2 6.4 1.2 9.4 0M25 27.5c3 1.2 6.4 1.2 9.4 0" opacity=".45" strokeWidth="1.1" />
          <path d="M20 17.5l1.1 2.7 2.7 1.1-2.7 1.1-1.1 2.7-1.1-2.7-2.7-1.1 2.7-1.1 1.1-2.7Z" fill="#C95D86" stroke="none" opacity=".8" />
          <circle cx="33.5" cy="31.5" r="1.3" fill="#D6A23F" stroke="none" opacity=".75" />
        </>
      ) : null}

      {id === "marwadi-dimaag" ? (
        <>
          <path d="M19 9.5h10l1.4 6H17.6Z" fill="#D6A23F" />
          <path d="M17 15h14c4.2 3.6 6.5 8.3 6.5 12.7C37.5 35 32.5 40.5 24 40.5S10.5 35 10.5 27.7c0-4.4 2.3-9.1 6.5-12.7Z" fill="#FFF9F0" />
          <path d="M17 15c-1.6 2-2.6 3.6-3.1 5.4M31 15c1.6 2 2.6 3.6 3.1 5.4" opacity=".45" strokeWidth="1.1" />
          <circle cx="19" cy="26" r="4.4" fill="#D6A23F" stroke="none" />
          <circle cx="19" cy="26" r="1.5" fill="#FFF0B8" stroke="none" />
          <circle cx="28.5" cy="23.5" r="3.6" fill="#D6A23F" stroke="none" opacity=".85" />
          <circle cx="28.5" cy="23.5" r="1.3" fill="#FFF0B8" stroke="none" />
          <circle cx="25" cy="32" r="3.1" fill="#D6A23F" stroke="none" opacity=".7" />
          <path d="M24 15v-3.2" strokeWidth="1.4" />
          <path d="M38.5 9l1.1 2.9 2.9 1.1-2.9 1.1-1.1 2.9-1.1-2.9-2.9-1.1 2.9-1.1 1.1-2.9Z" fill="#C95D86" stroke="none" opacity=".85" />
          <path d="M9 38.5c2.4-1 4.4-.8 6.5 1M33 39.5c2-1.4 4-1.6 6-1" opacity=".5" />
        </>
      ) : null}

      {id === "emotional" ? (
        <>
          <path
            d="M19.5 37.5C13.4 32.8 8.5 28.9 8.5 23.9c0-3.9 3-6.9 6.7-6.9 2.3 0 4.4 1.2 5.7 3.2 1.3-2 3.4-3.2 5.7-3.2 3.7 0 6.7 3 6.7 6.9 0 5-4.9 8.9-13.8 13.6Z"
            fill="#F6DCE7"
          />
          <path d="M14.5 22.5c1.4 3.4 1.4 7.1 0 10.5" stroke="#FFF9F0" strokeWidth="1.2" opacity=".8" />
          <path d="M35.5 10.5c3.2 3.9 5 6.9 5 9.6a5 5 0 1 1-10 0c0-2.7 1.8-5.7 5-9.6Z" fill="#96ACE0" opacity=".85" />
          <circle cx="36.5" cy="18" r="1.4" fill="#FFF9F0" stroke="none" />
          <path d="M6 41c2.2-1.6 4.4-1.6 6.6 0M15 42.5c2-1.3 4-1.3 6 0" stroke="#C98EA8" strokeWidth="1.2" strokeLinecap="round" opacity=".65" />
          <path d="M30.5 7l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3Z" fill="#D6A23F" stroke="none" opacity=".8" />
        </>
      ) : null}

      {id === "allrounder" ? (
        <>
          <path d="M24 5.5 29 16l11.4 1.1-8.6 7.6 2.5 11.3L24 30.5 13.7 36l2.5-11.3-8.6-7.6L19 16l5-10.5Z" fill="#FFF9F0" />
          <path d="M24 16.5v11M18.5 22h11" stroke="#C98EA8" strokeWidth="1.3" opacity=".7" />
          <circle cx="24" cy="22" r="2.4" fill="#D6A23F" stroke="none" />
          <path d="M14.5 31.5c1.5-3.4 4-5.2 7-5.6M33.5 31.5c-1.5-3.4-4-5.2-7-5.6" opacity=".55" />
          <path d="M9.5 39.5c2.4-1 4.4-.8 6.5 1M38.5 39.5c-2.4-1-4.4-.8-6.5 1" opacity=".5" />
          <circle cx="12" cy="20" r="1.5" fill="#8A6BB5" stroke="none" />
          <circle cx="36" cy="20" r="1.5" fill="#4E8C7A" stroke="none" />
        </>
      ) : null}

      {id === "kindness" ? (
        <>
          <path
            d="M24 39.5C16.8 34.4 10.5 30 10.5 23.8c0-4.2 3.2-7.3 7.2-7.3 2.6 0 4.8 1.3 6.3 3.4 1.5-2.1 3.7-3.4 6.3-3.4 4 0 7.2 3.1 7.2 7.3 0 6.2-6.3 10.6-13.5 15.7Z"
            fill="#F6DCE7"
          />
          <path d="M30.5 20.5c2.5-5.3 6.6-7.7 10.2-6.6" stroke="#7C9A70" strokeWidth="1.4" />
          <path d="M33 17.5c-1.8-2.2-.2-4.6 2-4.1 1.3.3 2.2 1.3 2.4 2.6M35.5 13.5c.5-2.4 3.2-3 4.5-1.3.9 1.2.8 2.7-.1 3.8M39.8 17.2c2.4-.8 4.4 1 3.7 3-.5 1.4-1.8 2.1-3.2 2M37.7 21.7c2 1.5 1.5 4.2-.6 4.9-1.3.4-2.6-.2-3.3-1.3M32.8 22.9c-1.7 1.8-4.2.8-4.4-1.3-.1-1.2.6-2.3 1.6-2.9" stroke="#C98EA8" strokeWidth="1.2" fill="#FFF0B8" />
          <circle cx="36" cy="17.5" r="2.1" fill="#D6A23F" stroke="none" />
          <path d="M16.5 20.5c1.2 3 1.2 6.3 0 9.4" stroke="#FFF9F0" strokeWidth="1.2" opacity=".8" />
        </>
      ) : null}
    </svg>
  );
}
