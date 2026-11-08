import { cn } from "@/lib/utils";

const outerColors = ["#F6DCE7", "#DCD5F5", "#FFDCCB", "#FFF0B8"];
const middleColors = ["#FFDCCB", "#F6DCE7", "#FFF0B8", "#DCD5F5"];
const innerColors = ["#C98EA8", "#FFF0B8", "#DCD5F5", "#FFDCCB"];

export function RangoliArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="A large rangoli centrepiece with layered petals, dots and a glowing centre"
    >
      <circle cx="300" cy="300" r="292" fill="none" stroke="#F6DCE7" strokeWidth=".8" strokeDasharray="2 9" opacity=".45" />
      <circle cx="300" cy="300" r="266" fill="none" stroke="#FFF0B8" strokeWidth=".9" opacity=".25" />

      {Array.from({ length: 20 }).map((_, i) => (
        <g key={`outer-${i}`} transform={`translate(300 300) rotate(${(360 / 20) * i})`}>
          <path
            d="M0 -80 C 38 -120, 38 -208, 0 -252 C -38 -208, -38 -120, 0 -80 Z"
            fill={outerColors[i % outerColors.length]}
            opacity=".92"
          />
          <path
            d="M0 -102 C 14 -140, 14 -194, 0 -226"
            fill="none"
            stroke="#FFF9F0"
            strokeWidth="2"
            strokeLinecap="round"
            opacity=".7"
          />
          <circle cx="0" cy="-64" r="4.2" fill="#FFF0B8" />
        </g>
      ))}

      {Array.from({ length: 12 }).map((_, i) => (
        <g key={`mid-${i}`} transform={`translate(300 300) rotate(${(360 / 12) * i + 15})`}>
          <path
            d="M0 -66 C 30 -88, 30 -140, 0 -176 C -30 -140, -30 -88, 0 -66 Z"
            fill={middleColors[i % middleColors.length]}
            stroke="#B0708C"
            strokeWidth="1.2"
            opacity=".95"
          />
          <path
            d="M0 -86 C 10 -108, 10 -136, 0 -154"
            fill="none"
            stroke="#FFF9F0"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity=".8"
          />
        </g>
      ))}

      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`inner-${i}`} transform={`translate(300 300) rotate(${45 * i})`}>
          <ellipse
            cx="0"
            cy="-44"
            rx="21"
            ry="44"
            fill={innerColors[i % innerColors.length]}
            stroke="#493348"
            strokeWidth="1.1"
            opacity=".97"
          />
          <path d="M0 -26V-62" stroke="#493348" strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
        </g>
      ))}

      <g>
        <circle cx="300" cy="300" r="38" fill="#C98EA8" stroke="#FFF9F0" strokeWidth="2" />
        <circle cx="300" cy="300" r="24" fill="#FFF0B8" />
        <circle cx="300" cy="300" r="10" fill="#B0708C" />
        <circle cx="300" cy="300" r="3.4" fill="#FFF9F0" />
      </g>

      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 40;
        const r = 279;
        const x = Number((300 + Math.cos(angle) * r).toFixed(2));
        const y = Number((300 + Math.sin(angle) * r).toFixed(2));
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r={i % 5 === 0 ? 4.2 : 2.6}
            fill={i % 3 === 0 ? "#FFF0B8" : i % 3 === 1 ? "#F6DCE7" : "#DCD5F5"}
            opacity=".95"
          />
        );
      })}

      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 20 + Math.PI / 20;
        const x = Number((300 + Math.cos(angle) * 285).toFixed(2));
        const y = Number((300 + Math.sin(angle) * 285).toFixed(2));
        return (
          <circle
            key={`smalldot-${i}`}
            cx={x}
            cy={y}
            r="1.7"
            fill="#FFF9F0"
            opacity=".7"
          />
        );
      })}

      <circle cx="300" cy="300" r="228" fill="none" stroke="#FFF0B8" strokeWidth="1" opacity=".18" />
      <circle cx="300" cy="300" r="150" fill="none" stroke="#F6DCE7" strokeWidth="1" strokeDasharray="3 10" opacity=".4" />
    </svg>
  );
}

export type MiniArtKind = "rangoli" | "painting" | "drawing" | "crafts";

export function MiniArt({ kind }: { kind: MiniArtKind }) {
  if (kind === "rangoli") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden className="h-full w-full">
        <rect width="200" height="200" fill="#F9E7E1" />
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`translate(100 100) rotate(${30 * i})`}>
            <path d="M0 -18 C 12 -28, 12 -52, 0 -64 C -12 -52, -12 -28, 0 -18 Z" fill={i % 2 ? "#DCD5F5" : "#F6DCE7"} />
            <circle cx="0" cy="-72" r="3" fill={i % 3 ? "#FFF0B8" : "#C98EA8"} />
          </g>
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`in-${i}`} transform={`translate(100 100) rotate(${45 * i})`}>
            <ellipse cx="0" cy="-16" rx="8" ry="16" fill={i % 2 ? "#FFF0B8" : "#FFDCCB"} />
          </g>
        ))}
        <circle cx="100" cy="100" r="13" fill="#C98EA8" />
        <circle cx="100" cy="100" r="6" fill="#FFF0B8" />
        <circle cx="100" cy="100" r="2" fill="#FFF9F0" />
      </svg>
    );
  }

  if (kind === "painting") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden className="h-full w-full">
        <rect width="200" height="200" fill="#F1E7F7" />
        <path d="M52 166l22-94 52 94" stroke="#493348" strokeWidth="2.4" strokeLinecap="round" opacity=".4" />
        <path d="M148 166l-20-94-50 94" stroke="#493348" strokeWidth="2.4" strokeLinecap="round" opacity=".4" />
        <rect x="38" y="36" width="124" height="102" rx="4" fill="#FFF9F0" stroke="#493348" strokeWidth="1.8" />
        <rect x="44" y="42" width="112" height="90" rx="2" fill="#FDF3E7" />
        <path d="M52 112c16-38 28-48 45-31 14 14 23 17 34-4 8-16 15-17 21-9v56H52Z" fill="#C98EA8" opacity=".75" />
        <path d="M52 124c20-25 37-28 52-12 15 16 29 14 48-9v29H52Z" fill="#DCD5F5" opacity=".9" />
        <circle cx="128" cy="66" r="13" fill="#FFF0B8" />
        <path d="M146 140l28-18" stroke="#493348" strokeWidth="4" strokeLinecap="round" />
        <path d="M170 116l10-6 5 9-10 6Z" fill="#B0708C" />
        <path d="M28 150c28-8 48-2 72 8s42 10 70-4" stroke="#A9B99E" strokeWidth="3" strokeLinecap="round" opacity=".8" />
      </svg>
    );
  }

  if (kind === "drawing") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden className="h-full w-full">
        <rect width="200" height="200" fill="#F7EFD9" />
        <rect x="36" y="28" width="118" height="142" rx="4" fill="#FFF9F0" stroke="#493348" strokeWidth="1.6" transform="rotate(-4 95 99)" />
        <path d="M58 62c20-8 38-8 56 0" stroke="#493348" strokeWidth="1.2" opacity=".18" />
        <path d="M56 78c24-9 48-9 72 0" stroke="#493348" strokeWidth="1.2" opacity=".14" />
        <path d="M54 152c30-10 58-10 88 0" stroke="#493348" strokeWidth="1.2" opacity=".16" />
        <g stroke="#493348" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M96 132c-16-14-24-27-14-38 8-9 21-4 20 8 2-14 16-20 24-10 10 12 1 25-18 40Z" />
          <path d="M96 132v20" />
          <path d="M96 144c-9-6-16-5-22 0M96 152c9-6 17-5 22 0" />
        </g>
        <path d="M118 138l40-48 11 9-40 48Z" fill="#FFF0B8" stroke="#493348" strokeWidth="1.6" />
        <path d="M158 90l8-10 11 9-8 10Z" fill="#C98EA8" stroke="#493348" strokeWidth="1.6" />
        <path d="M158 90l-40 48-4-1 36-50Z" fill="#493348" opacity=".55" />
        <circle cx="48" cy="44" r="4" fill="#C98EA8" opacity=".5" />
        <path d="M164 44l2 5.6 5.6 2-5.6 2-2 5.6-2-5.6-5.6-2 5.6-2 2-5.6Z" fill="#FFF0B8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" aria-hidden className="h-full w-full">
      <rect width="200" height="200" fill="#F7EFD9" />
      <circle cx="100" cy="94" r="58" fill="#FFF9F0" opacity=".8" />
      {[
        { x: 72, y: 72, s: 1, c: "#F6DCE7" },
        { x: 124, y: 92, s: 0.82, c: "#DCD5F5" },
        { x: 88, y: 128, s: 0.68, c: "#FFDCCB" },
      ].map((f, idx) => (
        <g key={idx} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-20"
              rx="11"
              ry="17"
              fill={f.c}
              transform={`rotate(${deg})`}
              stroke="#C98EA8"
              strokeWidth="1"
            />
          ))}
          <circle r="9" fill="#FFF0B8" stroke="#C98EA8" strokeWidth="1" />
          <circle r="3.5" fill="#C98EA8" opacity=".5" />
        </g>
      ))}
      <path d="M42 160c40-24 76-20 116-4" stroke="#7E8F72" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M56 150c-10-12-6-24 2-30 8 6 10 18-2 30ZM120 154c12-8 22-5 26 2-6 8-18 8-26-2Z" fill="#A9B99E" />
      <circle cx="152" cy="46" r="4" fill="#C98EA8" />
      <circle cx="40" cy="58" r="2.6" fill="#C98EA8" opacity=".6" />
      <path d="M156 26l2 5.6 5.6 2-5.6 2-2 5.6-2-5.6-5.6-2 5.6-2 2-5.6Z" fill="#FFF0B8" />
    </svg>
  );
}
