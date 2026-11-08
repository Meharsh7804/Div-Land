import { cn } from "@/lib/utils";

type CharacterProps = { className?: string; active?: boolean };

const skin = "#E3AC8D";
const skinShade = "#D49A7C";
const hair = "#3B2838";

export function WorldDivya({ className, active = true }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 220 280"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Illustration of Divya in public: sleek hair, sunglasses, blazer, unbothered expression"
    >
      <ellipse cx="110" cy="266" rx="70" ry="9" fill="#493348" opacity=".12" />
      <g
        style={{
          transition: "transform .7s cubic-bezier(.22,1,.36,1)",
          transform: active ? "translateY(0px)" : "translateY(6px)",
        }}
      >
        {/* hair back */}
        <path
          d="M65 92c-7 30-4 62 2 91 6 29 21 45 43 45s37-16 43-45c6-29 9-61 2-91-7-32-26-50-45-50S72 60 65 92Z"
          fill={hair}
        />
        {/* blazer */}
        <path
          d="M30 280c2-63 27-99 61-108l19 22 19-22c34 9 59 45 61 108H30Z"
          fill="#C98EA8"
        />
        <path
          d="M91 172l19 22 19-22 9 6-28 33-28-33 9-6Z"
          fill="#FFF9F0"
        />
        <path d="M91 172l19 22-5 37-27-55 13-4Z" fill="#B0708C" />
        <path d="M129 172l-19 22 5 37 27-55-13-4Z" fill="#B0708C" />
        <path
          d="M103 174c4 6 10 6 14 0"
          stroke="#FFF0B8"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="110" cy="188" r="2.6" fill="#FFF0B8" />
        {/* neck */}
        <path d="M98 140h24v28c0 9-24 9-24 0v-28Z" fill={skinShade} />
        {/* ears */}
        <ellipse cx="66" cy="114" rx="8" ry="12" fill={skinShade} />
        <ellipse cx="154" cy="114" rx="8" ry="12" fill={skinShade} />
        {/* face */}
        <ellipse cx="110" cy="108" rx="44" ry="51" fill={skin} />
        {/* cheeks */}
        <ellipse cx="79" cy="128" rx="9" ry="5" fill="#D98A82" opacity=".35" />
        <ellipse cx="141" cy="128" rx="9" ry="5" fill="#D98A82" opacity=".35" />
        {/* hair front */}
        <path
          d="M66 108c-2-32 15-58 44-58 34 0 48 25 45 57-8-13-18-20-31-22-13-2-27 3-38 13-7 6-13 12-20 10Z"
          fill={hair}
        />
        <path
          d="M151 82c8 9 12 22 10 37-3 19-6 31-3 45 2 9 10 14 18 12-5 13-23 11-27-4-4-17 2-35 3-54 1-14-3-25-1-36Z"
          fill={hair}
        />
        <path
          d="M78 82c-6 8-9 19-8 31"
          stroke="#5A3E52"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity=".7"
        />
        {/* sunglasses */}
        <g>
          <rect x="70" y="97" width="37" height="25" rx="9" fill="#2F1F2E" stroke="#B0708C" strokeWidth="1.8" />
          <rect x="113" y="97" width="37" height="25" rx="9" fill="#2F1F2E" stroke="#B0708C" strokeWidth="1.8" />
          <path d="M107 105h6" stroke="#B0708C" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M76 103l11 7" stroke="#FFF9F0" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
          <path d="M119 103l11 7" stroke="#FFF9F0" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
        </g>
        {/* nose + smirk */}
        <path
          d="M110 121c-2 5-1 9 4 10"
          stroke={skinShade}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M96 139c7 5 16 5 23 0"
          stroke="#B05F6D"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M119 139c3 1 5 0 6-2" stroke="#B05F6D" strokeWidth="1.8" strokeLinecap="round" />
        {/* earrings */}
        <circle cx="64" cy="132" r="5.5" fill="none" stroke="#FFF0B8" strokeWidth="2.6" />
        <circle cx="156" cy="132" r="5.5" fill="none" stroke="#FFF0B8" strokeWidth="2.6" />
        {/* little sparkle */}
        <path
          d="M170 62l1.8 5.2L177 69l-5.2 1.8L170 76l-1.8-5.2L163 69l5.2-1.8L170 62Z"
          fill="#FFF0B8"
        />
        <path
          d="M48 54l1.4 4L54 59.4l-4.6 1.4L48 65.4l-1.4-4.6L42 59.4l4.6-1.4L48 54Z"
          fill="#FFF9F0"
          opacity=".9"
        />
      </g>
    </svg>
  );
}

export function MineDivya({ className, active = false }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 220 280"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Illustration of Divya off duty: messy bun, oversized hoodie, sleepy eyes, holding a coffee mug"
    >
      <ellipse cx="110" cy="266" rx="70" ry="9" fill="#493348" opacity=".12" />
      <g
        style={{
          transition: "transform .7s cubic-bezier(.22,1,.36,1)",
          transform: active ? "translateY(0px)" : "translateY(6px)",
        }}
      >
        {/* hair back */}
        <path
          d="M64 110c-3 31-1 62 8 87 9 25 25 36 38 36s29-11 38-36c9-25 11-56 8-87-3-40-22-62-46-62s-43 22-46 62Z"
          fill="#493348"
        />
        {/* bun */}
        <circle cx="145" cy="50" r="25" fill="#493348" />
        <path
          d="M130 42c6-7 18-7 24 0M128 54c8-6 20-6 28 0"
          stroke="#6B4C60"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity=".8"
        />
        <circle cx="145" cy="50" r="8" fill="#F6DCE7" />
        <path d="M145 42v16M137 50h16" stroke="#C98EA8" strokeWidth="1.6" />
        {/* hoodie */}
        <path
          d="M26 280c0-58 23-94 59-104l25 19 25-19c36 10 59 46 59 104H26Z"
          fill="#DCD5F5"
        />
        <path
          d="M80 180c6-19 18-28 30-28s24 9 30 28c-16 11-44 11-60 0Z"
          fill="#C9BFE9"
        />
        <path d="M92 190c-3 22-5 38-3 54M128 190c3 22 5 38 3 54" stroke="#FFF9F0" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="89" cy="246" r="3" fill="#FFF9F0" />
        <circle cx="131" cy="246" r="3" fill="#FFF9F0" />
        {/* neck */}
        <path d="M98 142h24v27c0 9-24 9-24 0v-27Z" fill={skinShade} />
        {/* ears */}
        <ellipse cx="66" cy="114" rx="8" ry="12" fill={skinShade} />
        <ellipse cx="154" cy="114" rx="8" ry="12" fill={skinShade} />
        {/* face */}
        <ellipse cx="110" cy="110" rx="44" ry="50" fill={skin} />
        {/* hair front */}
        <path
          d="M66 110c-2-34 17-60 44-60s46 26 44 60c-6-13-13-22-24-28-7 17-21 25-39 25-9 0-18-4-25-12-1 5 0 10 0 15Z"
          fill="#493348"
        />
        <path
          d="M69 104c-4 17-3 36 1 50M151 104c4 17 3 36-1 50"
          stroke="#493348"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M147 84c7 7 11 18 10 30"
          stroke="#6B4C60"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          opacity=".7"
        />
        {/* sleepy eyes */}
        <path d="M82 115c5 6 14 6 19 0" stroke="#3B2838" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M119 115c5 6 14 6 19 0" stroke="#3B2838" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M83 116l-3-3M100 116l3-3M120 116l-3-3M137 116l3-3" stroke="#3B2838" strokeWidth="1.8" strokeLinecap="round" />
        {/* blush */}
        <ellipse cx="80" cy="130" rx="10" ry="6" fill="#E69A93" opacity=".45" />
        <ellipse cx="140" cy="130" rx="10" ry="6" fill="#E69A93" opacity=".45" />
        {/* nose + pout */}
        <path d="M110 122c-1 5 0 8 4 9" stroke={skinShade} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M102 140c4-3 12-3 16 0-4 5-12 5-16 0Z" fill="#B05F6D" />
        {/* mug */}
        <path
          d="M77 212h66l-6 38c-1 9-9 16-18 16h-18c-9 0-17-7-18-16l-6-38Z"
          fill="#FFF9F0"
          stroke="#493348"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M143 222h7c8 0 12 6 10 13-2 6-8 9-14 8" stroke="#493348" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M84 212h52l-1 9H85l-1-9Z" fill="#B0708C" />
        <path
          d="M110 229c-5-4-11-2-8 3 1.7 3 5 4.6 8 6.4 3-1.8 6.3-3.4 8-6.4 3-5-3-7-8-3Z"
          fill="#C98EA8"
        />
        {/* hands */}
        <ellipse cx="80" cy="222" rx="13" ry="11" fill={skin} />
        <ellipse cx="140" cy="222" rx="13" ry="11" fill={skin} />
        <path d="M73 222h14M133 222h14" stroke={skinShade} strokeWidth="1.6" strokeLinecap="round" />
        {/* steam */}
        <g className="anim-float" style={{ animationDuration: "5s" }}>
          <path d="M95 202c-5-7 5-10 0-18M110 200c-5-8 5-11 0-19M125 202c-5-7 5-10 0-18" stroke="#FFF9F0" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".75" />
        </g>
        {/* stickers */}
        <path
          d="M171 76c-3-4-9-3-9 2 0 3 3 4 5 6 2-2 5-3 5-6 0-5-6-6-9-2"
          fill="#F6DCE7"
          stroke="#C98EA8"
          strokeWidth="1.2"
        />
        <path d="M47 70l1.5 4.3L53 76l-4.5 1.7L47 82l-1.5-4.3L41 76l4.5-1.7L47 70Z" fill="#FFF0B8" />
      </g>
    </svg>
  );
}
