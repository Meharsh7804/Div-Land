import type { MemoryKey } from "@/data/memories";

const plum = "#493348";
const rose = "#C98EA8";
const roseDeep = "#B0708C";
const blush = "#F6DCE7";
const lavender = "#DCD5F5";
const peach = "#FFDCCB";
const butter = "#FFF0B8";
const cream = "#FFF9F0";
const creamSoft = "#FFF4E8";

export function MemoryArt({
  kind,
  className,
}: {
  kind: MemoryKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 190"
      className={className}
      aria-hidden
      focusable="false"
    >
      {kind === "beginning" ? (
        <g>
          <circle cx="196" cy="58" r="42" fill={lavender} opacity=".55" />
          <circle cx="46" cy="140" r="30" fill={peach} opacity=".5" />
          <g transform="rotate(-3 130 95)">
            <rect x="78" y="32" width="106" height="126" rx="8" fill={creamSoft} stroke={plum} strokeWidth="2.4" />
            <rect x="86" y="52" width="90" height="98" rx="4" fill="#FFFDF8" stroke={plum} strokeWidth="1.3" />
            <rect x="108" y="24" width="46" height="16" rx="7" fill={rose} stroke={plum} strokeWidth="1.8" />
            <circle cx="131" cy="32" r="2.6" fill={cream} />
            <g stroke={plum} strokeWidth="1.2" opacity=".55">
              <line x1="98" y1="68" x2="164" y2="68" />
              <line x1="98" y1="88" x2="156" y2="88" />
              <line x1="98" y1="108" x2="162" y2="108" />
              <line x1="98" y1="128" x2="146" y2="128" />
            </g>
            {[68, 88, 108, 128].map((y, i) => (
              <g key={y}>
                <circle cx="101" cy={y} r="4" fill={i % 2 === 0 ? butter : blush} stroke={plum} strokeWidth="1" />
                {i % 2 === 0 ? (
                  <path d={`M98 ${y} l2 2 4-5`} stroke={roseDeep} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                ) : null}
              </g>
            ))}
          </g>
          <g transform="translate(221 116) rotate(18)">
            <rect x="0" y="0" width="9" height="44" rx="3" fill={butter} stroke={plum} strokeWidth="1.4" />
            <path d="M0 44h9l-4.5 9Z" fill={peach} stroke={plum} strokeWidth="1.2" />
            <rect x="0" y="0" width="9" height="6" fill={rose} />
          </g>
          <g>
            <path d="M18 58c0-7 5-12 12-12h26c7 0 12 5 12 12v10c0 7-5 12-12 12H44l-8 9v-9h-6c-7 0-12-5-12-12V58Z" fill={blush} stroke={plum} strokeWidth="1.6" />
            <text x="43" y="71" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="17" fill={plum}>
              hi?
            </text>
          </g>
          <g>
            <path d="M192 118c0-6 4-10 10-10h30c6 0 10 4 10 10v8c0 6-4 10-10 10h-2v8l-7-8h-21c-6 0-10-4-10-10v-8Z" fill={butter} stroke={plum} strokeWidth="1.5" />
            <circle cx="206" cy="127" r="1.8" fill={plum} />
            <circle cx="216" cy="127" r="1.8" fill={plum} />
            <circle cx="226" cy="127" r="1.8" fill={plum} />
          </g>
          <path d="M70 172h120" stroke={rose} strokeWidth="1.6" strokeDasharray="2 5" strokeLinecap="round" opacity=".7" />
          <path d="M162 22l1.6 5.4L169 29l-5.4 1.6L162 36l-1.6-5.4L155 29l5.4-1.6L162 22Z" fill={butter} />
        </g>
      ) : null}

      {kind === "sleep" ? (
        <g>
          <circle cx="60" cy="60" r="46" fill={lavender} opacity=".5" />
          <path d="M110 172c-18 0-30-10-30-26 0-14 12-25 27-25h70c17 0 30 11 30 26s-12 25-30 25h-67Z" fill={blush} stroke={plum} strokeWidth="1.8" />
          <path d="M92 172c-6-20 6-33 25-33h26c19 0 31 13 25 33" fill={cream} stroke={plum} strokeWidth="1.6" />
          <path d="M197 40a27 27 0 1 0 18 35 30 30 0 0 1-18-35Z" fill={butter} stroke={plum} strokeWidth="1.6" />
          <circle cx="52" cy="48" r="21" fill={cream} stroke={plum} strokeWidth="2" />
          <circle cx="52" cy="48" r="2" fill={plum} />
          <path d="M52 48V36M52 48l10 7" stroke={plum} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M52 28v3M72 48h-3M52 68v-3M32 48h3" stroke={plum} strokeWidth="1.2" opacity=".5" />
          <text x="174" y="92" fontFamily="var(--font-caveat)" fontSize="26" fill={roseDeep}>
            z z z
          </text>
          <g>
            <rect x="120" y="112" width="38" height="34" rx="6" fill={cream} stroke={plum} strokeWidth="1.8" />
            <path d="M158 120h5c5 0 7 4 5 8-1.5 3-4.5 4-8 3" fill="none" stroke={plum} strokeWidth="1.6" />
            <rect x="126" y="118" width="26" height="10" rx="3" fill={roseDeep} opacity=".55" />
            <path d="M132 108c-3-5 3-6 0-11M144 108c-3-5 3-6 0-11" stroke={roseDeep} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".7" />
          </g>
          <path d="M36 130l1.4 4.6L42 136l-4.6 1.4L36 142l-1.4-4.6L30 136l4.6-1.4L36 130Z" fill={butter} />
          <path d="M218 120l1.2 3.8 3.8 1.2-3.8 1.2L218 130l-1.2-3.8-3.8-1.2 3.8-1.2L218 120Z" fill={cream} />
          <path d="M84 158c8-8 18-8 26 0" stroke={plum} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity=".4" />
        </g>
      ) : null}

      {kind === "food" ? (
        <g>
          <circle cx="198" cy="52" r="40" fill={peach} opacity=".5" />
          <circle cx="48" cy="58" r="32" fill={butter} opacity=".4" />
          <path d="M24 148h212v34H24Z" fill={rose} opacity=".55" />
          <path d="M24 148h212" stroke={plum} strokeWidth="2.2" />
          <path d="M40 160h180M60 160v22M100 160v22M140 160v22M180 160v22M24 172h212" stroke={cream} strokeWidth="1.6" opacity=".6" />
          <g>
            <ellipse cx="86" cy="142" rx="38" ry="11" fill={cream} stroke={plum} strokeWidth="1.8" />
            <ellipse cx="86" cy="136" rx="26" ry="8" fill={blush} />
            <path d="M68 134c8-8 28-8 36 0M72 138c8 5 20 5 28 0" stroke={roseDeep} strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M78 128l2-6M90 126l1-6M102 129l-1-6" stroke={plum} strokeWidth="1.4" strokeLinecap="round" opacity=".6" />
          </g>
          <g>
            <ellipse cx="170" cy="142" rx="40" ry="11" fill={cream} stroke={plum} strokeWidth="1.8" />
            <path d="M148 134c0-6 9-11 21-11s21 5 21 11Z" fill={butter} stroke={plum} strokeWidth="1.4" />
            <path d="M148 138h44v6c0 4-5 7-11 7h-22c-6 0-11-3-11-7v-6Z" fill={peach} stroke={plum} strokeWidth="1.4" />
            <path d="M156 125c2-4 8-6 13-5 5 0 9 2 10 5" stroke={roseDeep} strokeWidth="1.6" fill="none" />
            <circle cx="191" cy="120" r="3" fill={rose} />
          </g>
          <g>
            <rect x="104" y="88" width="24" height="34" rx="3" fill={rose} stroke={plum} strokeWidth="1.4" />
            <path d="M104 88h24l-3-18h-18l-3 18Z" fill={peach} stroke={plum} strokeWidth="1.3" />
            <path d="M109 78l-2-14M116 78l0-14M123 78l2-14" stroke={butter} strokeWidth="2.6" strokeLinecap="round" />
          </g>
          <g>
            <rect x="140" y="98" width="18" height="24" rx="3" fill={cream} stroke={plum} strokeWidth="1.4" />
            <path d="M158 103h3c4 0 5 3 4 6-1 3-3 4-6 3" stroke={plum} strokeWidth="1.3" fill="none" />
            <path d="M146 94c-2-4 2-5 0-9M153 94c-2-4 2-5 0-9" stroke={roseDeep} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity=".6" />
          </g>
          <path d="M118 42c-4-4-10-2-8 3 1.2 3 4 4.4 8 6.4 4-2 6.8-3.4 8-6.4 2-5-4-7-8-3Z" fill={rose} />
          <path d="M66 94l1.5 4.5L72 100l-4.5 1.5L66 106l-1.5-4.5L60 100l4.5-1.5L66 94Z" fill={butter} />
          <path d="M212 94l1.4 4.2L217 100l-3.6 1.4L212 106l-1.4-4.6L207 100l3.6-1.4L212 94Z" fill={cream} />
        </g>
      ) : null}

      {kind === "conversations" ? (
        <g>
          <circle cx="196" cy="140" r="42" fill={lavender} opacity=".45" />
          <circle cx="56" cy="48" r="34" fill={peach} opacity=".45" />
          <g transform="rotate(4 130 100)">
            <rect x="86" y="24" width="88" height="146" rx="16" fill={plum} />
            <rect x="94" y="34" width="72" height="122" rx="10" fill={creamSoft} />
            <rect x="120" y="28" width="20" height="4" rx="2" fill={cream} opacity=".6" />
            <circle cx="130" cy="148" r="3.2" fill={cream} opacity=".7" />
            <path d="M100 46c0-4 3-7 7-7h30c4 0 7 3 7 7v10c0 4-3 7-7 7h-26l-5 5v-5c-4 0-6-3-6-7V46Z" fill={blush} stroke={plum} strokeWidth="1.3" />
            <path d="M112 52h18M112 58h11" stroke={plum} strokeWidth="1.2" strokeLinecap="round" opacity=".5" />
            <path d="M154 88c0-4-3-7-7-7h-30c-4 0-7 3-7 7v10c0 4 3 7 7 7h26l5 5v-5c4 0 6-3 6-7V88Z" fill={lavender} stroke={plum} strokeWidth="1.3" />
            <path d="M118 93h20M126 99h12" stroke={plum} strokeWidth="1.2" strokeLinecap="round" opacity=".5" />
            <path d="M100 118c0-4 3-7 7-7h24c4 0 7 3 7 7v8c0 4-3 7-7 7h-20l-5 5v-5c-4 0-6-3-6-7v-8Z" fill={butter} stroke={plum} strokeWidth="1.3" />
            <circle cx="110" cy="125" r="1.6" fill={plum} />
            <circle cx="118" cy="125" r="1.6" fill={plum} />
            <circle cx="126" cy="125" r="1.6" fill={plum} />
          </g>
          <path d="M52 118c-4-4-11-2-9 4 1.3 3.3 4.4 4.8 9 7 4.6-2.2 7.7-3.7 9-7 2-6-5-8-9-4Z" fill={rose} opacity=".9" />
          <path d="M202 78c-4-4-11-2-9 4 1.3 3.3 4.4 4.8 9 7 4.6-2.2 7.7-3.7 9-7 2-6-5-8-9-4Z" fill={peach} />
          <path d="M62 90l1.4 4.2L67 96l-3.6 1.4L62 102l-1.4-4.6L57 96l3.6-1.4L62 90Z" fill={butter} />
          <path d="M206 52l1.3 4 4 1.3-4 1.3-1.3 4-1.3-4-4-1.3 4-1.3 1.3-4Z" fill={cream} />
          <path d="M30 168h200" stroke={rose} strokeWidth="1.4" strokeDasharray="2 6" opacity=".5" />
        </g>
      ) : null}

      {kind === "reels" ? (
        <g>
          <circle cx="52" cy="112" r="42" fill={peach} opacity=".5" />
          <circle cx="214" cy="60" r="38" fill={lavender} opacity=".5" />
          <g transform="rotate(-7 130 100)">
            <rect x="82" y="24" width="96" height="148" rx="16" fill={plum} />
            <rect x="90" y="33" width="80" height="126" rx="10" fill={creamSoft} />
            <rect x="90" y="33" width="80" height="126" rx="10" fill="none" stroke={rose} strokeWidth="1" opacity=".4" />
            <circle cx="130" cy="90" r="24" fill={rose} stroke={plum} strokeWidth="2" />
            <path d="M124 79l17 11-17 11Z" fill={cream} />
            <g>
              <path d="M130 126c-4-3-9-1-7 3 1 2.5 3.4 3.6 7 5.4 3.6-1.8 6-2.9 7-5.4 2-4-3-6-7-3Z" fill={roseDeep} />
              <line x1="102" y1="136" x2="152" y2="136" stroke={plum} strokeWidth="1.2" opacity=".35" />
              <line x1="108" y1="143" x2="138" y2="143" stroke={plum} strokeWidth="1.2" opacity=".25" />
            </g>
            <rect x="120" y="27" width="20" height="4" rx="2" fill={cream} opacity=".6" />
            <circle cx="98" cy="46" r="2" fill={plum} opacity=".5" />
            <circle cx="104" cy="46" r="2" fill={plum} opacity=".5" />
            <circle cx="110" cy="46" r="2" fill={plum} opacity=".5" />
          </g>
          <path d="M55 50c-4-4-11-2-9 4 1.3 3.3 4.4 4.8 9 7 4.6-2.2 7.7-3.7 9-7 2-6-5-8-9-4Z" fill={rose} />
          <path d="M198 118c-3-3-8-1.5-7 3 1 2.4 3.3 3.5 7 5.1 3.6-1.6 5.9-2.7 6.8-5.1 1.9-4.5-4-6-6.8-3Z" fill={butter} />
          <path d="M46 148l1.5 4.4 4.5 1.6-4.5 1.5L46 160l-1.5-4.5L40 154l4.5-1.6L46 148Z" fill={butter} />
          <path d="M212 32l1.2 3.8 3.8 1.2-3.8 1.2L212 42l-1.2-3.8L207 37l3.8-1.2L212 32Z" fill={cream} />
          <path d="M34 80l1.2 3.8 3.8 1.2-3.8 1.2L34 90l-1.2-3.8L29 85l3.8-1.2L34 80Z" fill={cream} />
        </g>
      ) : null}

      {kind === "unexpected" ? (
        <g>
          <circle cx="130" cy="92" r="58" fill={lavender} opacity=".4" />
          <circle cx="44" cy="58" r="30" fill={peach} opacity=".4" />
          <circle cx="220" cy="130" r="34" fill={butter} opacity=".4" />
          <path d="M30 142c28-30 58-48 86-56M228 128c-22-22-46-35-72-44" stroke={rose} strokeWidth="1.8" strokeDasharray="3 6" fill="none" strokeLinecap="round" opacity=".7" />
          <g fill={cream} stroke={plum} strokeWidth="1.8" strokeLinejoin="round">
            <path d="M22 148l30-27 4 17-14 8Z" />
            <path d="M22 148l20-2" stroke={plum} strokeWidth="1.2" />
            <path d="M232 138l-30-25-3 16 13 8Z" />
            <path d="M232 138l-20-1" stroke={plum} strokeWidth="1.2" />
          </g>
          <g stroke={roseDeep} strokeWidth="1.3" fill="none" opacity=".75">
            <path d="M130 62l26 20-10 32-16 12-16-12-10-32 26-20Z" />
            <path d="M130 62v64M104 114l26-16 26 16" />
          </g>
          {[
            [130, 62],
            [156, 82],
            [146, 114],
            [130, 126],
            [114, 114],
            [104, 82],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="4.6" fill={i === 0 ? rose : butter} stroke={plum} strokeWidth="1.2" />
              <circle cx={x} cy={y} r="1.5" fill={plum} opacity=".5" />
            </g>
          ))}
          <path d="M130 86c-3-3-8-1-6 3 .8 2 2.7 2.9 6 4.3 3.3-1.4 5.2-2.3 6-4.3 2-4-3-6-6-3Z" fill={rose} />
          <path d="M70 42l1.5 4.5L76 48l-4.5 1.5L70 54l-1.5-4.5L64 48l4.5-1.5L70 42Z" fill={butter} />
          <path d="M190 46l1.4 4.2L195 52l-3.6 1.4L190 58l-1.4-4.6L185 52l3.6-1.4L190 46Z" fill={cream} />
          <path d="M210 96l1.2 3.8 3.8 1.2-3.8 1.2-1.2 3.8-1.2-3.8-3.8-1.2 3.8-1.2 1.2-3.8Z" fill={rose} />
        </g>
      ) : null}
    </svg>
  );
}
