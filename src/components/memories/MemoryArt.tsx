"use client";

import { motion } from "motion/react";
import { EASE_SCENE } from "@/animations/motion";
import type { MemoryKey } from "@/data/memories";

const plum = "#493348";
const plumSoft = "#6A4C66";
const bean = "#6B4432";
const rose = "#C98EA8";
const roseDeep = "#B0708C";
const blush = "#F6DCE7";
const blushDeep = "#EFC9DA";
const lavender = "#DCD5F5";
const lavenderDeep = "#C9BFE9";
const peach = "#FFDCCB";
const butter = "#FFF0B8";
const cream = "#FFF9F0";
const creamSoft = "#FFF4E8";
const sage = "#C7D3BD";
const sageDeep = "#AFC29F";
const yellow = "#FEFD65"
const darkyellow = "#FFF150"

type SceneProps = { animated: boolean };

function SparkShape({
  x,
  y,
  s = 1,
  color = butter,
}: {
  x: number;
  y: number;
  s?: number;
  color?: string;
}) {
  return (
    <path
      d="M0 -6C1.4 -2.6 2.6 -1.4 6 0 2.6 1.4 1.4 2.6 0 6-1.4 2.6-2.6 1.4-6 0-2.6-1.4-1.4-2.6 0-6Z"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill={color}
    />
  );
}

function HeartShape({
  x,
  y,
  s = 1,
  color = rose,
}: {
  x: number;
  y: number;
  s?: number;
  color?: string;
}) {
  return (
    <path
      d="M0 6.6C-4.9 3-7.6 0.9-7.6-2.2-7.6-4.6-5.8-6.3-3.5-6.3-1.9-6.3-0.8-5.6 0-4.4 0.8-5.6 1.9-6.3 3.5-6.3 5.8-6.3 7.6-4.6 7.6-2.2 7.6 0.9 4.9 3 0 6.6Z"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill={color}
    />
  );
}

function Steam({
  x,
  y,
  animated,
  delay = 0,
  color = cream,
  width = 2,
}: {
  x: number;
  y: number;
  animated: boolean;
  delay?: number;
  color?: string;
  width?: number;
}) {
  return (
    <motion.path
      d={`M${x} ${y}c-3-5 3-7 0-12`}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      fill="none"
      initial={animated ? undefined : false}
      animate={
        animated
          ? { opacity: [0, 0.85, 0], y: [2, -7, -15] }
          : { opacity: 0.6 }
      }
      transition={
        animated
          ? { duration: 2.6, repeat: Infinity, delay, ease: "easeInOut" }
          : undefined
      }
    />
  );
}

function BeginningScene({ animated }: SceneProps) {
  return (
    <g>
      <circle cx="160" cy="102" r="94" fill={lavender} opacity=".3" />
      <circle cx="258" cy="50" r="28" fill={butter} opacity=".4" />
      <path d="M38 186h244" stroke={plum} strokeWidth="2" strokeLinecap="round" opacity=".16" />

      <g transform="rotate(-5 68 54)">
        <rect x="44" y="34" width="48" height="42" rx="4" fill={butter} opacity=".85" stroke={plum} strokeWidth="1.2" />
        <path d="M53 48h30M53 57h22M53 66h27" stroke={plum} strokeWidth="1.1" strokeLinecap="round" opacity=".3" />
      </g>
      <g transform="rotate(5 250 62)">
        <rect x="226" y="40" width="46" height="36" rx="4" fill={blush} opacity=".9" stroke={plum} strokeWidth="1.2" />
        <path d="M235 54h28M235 63h17" stroke={plum} strokeWidth="1.1" strokeLinecap="round" opacity=".3" />
      </g>

      <g>
        <circle cx="108" cy="100" r="14" fill={creamSoft} stroke={plum} strokeWidth="1.8" />
        <path d="M94 96c2-11 26-11 28 0-4-4-9-5-14-5s-10 1-14 5Z" fill={bean} />
        <circle cx="103" cy="101" r="1.5" fill={plum} />
        <circle cx="113" cy="101" r="1.5" fill={plum} />
        <path d="M104 107c2 1.8 6 1.8 8 0" stroke={plum} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M89 130c3-14 11-20 19-20s16 6 19 20Z" fill={blush} stroke={plum} strokeWidth="1.8" strokeLinejoin="round" />
      </g>
      <g>
        <circle cx="212" cy="100" r="14" fill={creamSoft} stroke={plum} strokeWidth="1.8" />
        <path d="M198 98c0-7 6-12 14-12s14 5 14 12c-3-3-6-4-9-2-5-4-13-3-19 2Z" fill={bean} />
        <circle cx="207" cy="101" r="1.5" fill={plum} />
        <circle cx="217" cy="101" r="1.5" fill={plum} />
        <path d="M208 107c2 1.8 6 1.8 8 0" stroke={plum} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M193 130c3-14 11-20 19-20s16 6 19 20Z" fill={lavender} stroke={plum} strokeWidth="1.8" strokeLinejoin="round" />
      </g>

      <rect x="64" y="132" width="192" height="13" rx="5" fill={creamSoft} stroke={plum} strokeWidth="2" />
      <rect x="64" y="145" width="192" height="4" fill={plum} opacity=".12" />
      <rect x="80" y="147" width="7" height="34" rx="3" fill={bean} />
      <rect x="233" y="147" width="7" height="34" rx="3" fill={bean} />

      <g>
        <rect x="92" y="126" width="44" height="10" rx="2" fill={cream} stroke={plum} strokeWidth="1" transform="rotate(-6 114 131)" />
        <rect x="118" y="128" width="42" height="10" rx="2" fill={cream} stroke={plum} strokeWidth="1" transform="rotate(4 139 133)" />
        <path d="M178 131l26-5" stroke={roseDeep} strokeWidth="2.6" strokeLinecap="round" />
      </g>

      <motion.g
        initial={animated ? undefined : false}
        animate={
          animated
            ? { scale: [0.86, 1.16, 0.86], opacity: [0.65, 1, 0.65] }
            : { scale: 1, opacity: 1 }
        }
        transition={
          animated
            ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <SparkShape x={160} y={84} s={2.3} color={butter} />
        <SparkShape x={160} y={84} s={1.15} color={rose} />
        <circle cx="160" cy="84" r="3.2" fill={cream} />
        <path d="M160 70v-6M160 98v6M146 84h-6M174 84h6" stroke={butter} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="149" cy="73" r="1.8" fill={rose} />
        <circle cx="171" cy="95" r="1.8" fill={peach} />
      </motion.g>

      <motion.g
        initial={animated ? undefined : false}
        animate={animated ? { y: [0, -3, 0] } : { y: 0 }}
        transition={animated ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <path d="M66 60c0-6 4-10 10-10h16c6 0 10 4 10 10v3c0 6-4 10-10 10h-7l-6 7v-7h-3c-6 0-10-4-10-10Z" fill={butter} stroke={plum} strokeWidth="1.4" />
        <circle cx="78" cy="63" r="1.5" fill={plum} />
        <circle cx="85" cy="63" r="1.5" fill={plum} />
        <circle cx="92" cy="63" r="1.5" fill={plum} />
      </motion.g>
      <motion.g
        initial={animated ? undefined : false}
        animate={animated ? { y: [0, -3, 0] } : { y: 0 }}
        transition={animated ? { duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 } : undefined}
      >
        <path d="M214 58c0-5 4-9 9-9h20c5 0 9 4 9 9v3c0 5-4 9-9 9h-3v7l-6-7h-11c-5 0-9-4-9-9Z" fill={lavender} stroke={plum} strokeWidth="1.4" />
        <circle cx="228" cy="61" r="1.4" fill={plum} />
        <circle cx="235" cy="61" r="1.4" fill={plum} />
        <circle cx="242" cy="61" r="1.4" fill={plum} />
      </motion.g>

      <SparkShape x={54} y={122} s={0.9} color={rose} />
      <SparkShape x={272} y={112} s={0.8} color={butter} />
    </g>
  );
}

const kfcRed = "#CF4A43";
const kfcRedDeep = "#A93A33";
const kfcCream = "#FFF5E6";
const kfcWall = "#FBEBD9";
const kfcStripe = "#F6E2CD";
const floorWarm = "#F0DECB";

function KfcRoom() {
  const awning = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const counterStripes = [0, 1, 2, 3, 4, 5, 6, 7];
  const floorCols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <g>
      <rect x="0" y="0" width="320" height="176" fill={kfcWall} />
      <rect x="0" y="62" width="320" height="16" fill={kfcRed} opacity=".9" />
      <path d="M0 62h320M0 78h320" stroke={kfcRedDeep} strokeWidth="1.2" opacity=".35" />
      <rect x="0" y="78" width="320" height="98" fill={kfcStripe} opacity=".45" />

      <rect x="0" y="0" width="320" height="15" fill={kfcRed} />
      {awning.map((i) => (
        <rect key={`awn-${i}`} x={3 + i * 22} y="0" width="8" height="15" fill={kfcCream} opacity=".92" />
      ))}
      {awning.map((i) => (
        <circle key={`awn-bump-${i}`} cx={12 + i * 22} cy="15" r="11" fill={kfcRed} />
      ))}

      <rect x="0" y="176" width="320" height="34" fill={floorWarm} />
      <path d="M0 176h320" stroke={plum} strokeWidth="1.4" opacity=".16" />
      {floorCols.map((col) =>
        [0, 1].map((row) =>
          (col + row) % 2 === 0 ? (
            <rect
              key={`floor-${col}-${row}`}
              x={col * 20}
              y={176 + row * 17}
              width="20"
              height="17"
              fill={kfcRed}
              opacity=".08"
            />
          ) : null,
        ),
      )}

      {[150, 202].map((x) => (
        <g key={`lamp-${x}`}>
          <path d={`M${x} 0v20`} stroke={plum} strokeWidth="1.4" />
          <path d={`M${x - 11} 20h22l-4 9h-14Z`} fill={kfcRed} stroke={plum} strokeWidth="1.3" strokeLinejoin="round" />
          <ellipse cx={x} cy="30" rx="5" ry="2" fill={butter} />
          <circle cx={x} cy="35" r="9" fill={butter} opacity=".16" />
        </g>
      ))}

      <g>
        <rect x="12" y="32" width="98" height="44" rx="4" fill={plumSoft} opacity=".94" stroke={plum} strokeWidth="1.5" />
        <rect x="17" y="37" width="88" height="34" rx="2" fill="#453542" />
        <path d="M23 43h26" stroke={kfcCream} strokeWidth="2.2" strokeLinecap="round" opacity=".85" />
        <path d="M23 51h44M23 56h38M23 61h46M23 66h28" stroke={kfcCream} strokeWidth="1.3" strokeLinecap="round" opacity=".4" />
        <g transform="translate(90 52)">
          <path d="M-6 -9h12l-2 15h-8Z" fill={kfcCream} stroke={kfcRed} strokeWidth="1" strokeLinejoin="round" />
          <path d="M-3.5 -9l.7 15M0 -9v15M3.5 -9l-.7 15" stroke={kfcRed} strokeWidth="1.6" />
          <ellipse cx="0" cy="-9" rx="6" ry="1.8" fill={kfcCream} stroke={kfcRed} strokeWidth=".9" />
        </g>
      </g>

      <g>
        <rect x="8" y="114" width="122" height="8" rx="3" fill={kfcCream} stroke={plum} strokeWidth="1.4" />
        <rect x="14" y="122" width="110" height="54" fill={kfcRed} stroke={plum} strokeWidth="1.5" />
        {counterStripes.map((i) => (
          <rect key={`counter-${i}`} x={22 + i * 13} y="128" width="5" height="48" fill={kfcCream} opacity=".85" />
        ))}
        <rect x="10" y="172" width="118" height="6" rx="2" fill={kfcRedDeep} />
        <g transform="translate(92 114)">
          <rect x="-13" y="-14" width="26" height="14" rx="2" fill={kfcCream} stroke={plum} strokeWidth="1.3" />
          <rect x="-9" y="-19" width="18" height="6" rx="2" fill={plumSoft} stroke={plum} strokeWidth="1" />
          <path d="M-9 -9h18M-9 -5h11" stroke={plum} strokeWidth="1" opacity=".4" />
        </g>
        <g transform="translate(40 114)">
          <path d="M-9 0h18l-2-19h-14Z" fill={kfcCream} stroke={plum} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M-5 0l.6-19M0 0v-19M5 0l-.6-19" stroke={kfcRed} strokeWidth="3" opacity=".9" />
          <ellipse cx="0" cy="-19" rx="9.5" ry="3" fill={kfcCream} stroke={plum} strokeWidth="1.2" />
          <g transform="translate(2 -19) rotate(-16)">
            <ellipse cx="0" cy="0" rx="5" ry="3.4" fill={bean} stroke={plum} strokeWidth=".9" />
            <path d="M4 2l5 4" stroke={kfcCream} strokeWidth="2.6" strokeLinecap="round" />
          </g>
        </g>
      </g>

      <g>
        <rect x="244" y="104" width="74" height="50" rx="8" fill={kfcRed} stroke={plum} strokeWidth="1.6" />
        <path d="M251 112h60M251 146h60" stroke={kfcCream} strokeWidth="2" strokeLinecap="round" opacity=".65" />
        <rect x="238" y="148" width="80" height="12" rx="5" fill={kfcRedDeep} stroke={plum} strokeWidth="1.4" />
        <rect x="246" y="160" width="8" height="16" fill={bean} />
        <rect x="304" y="160" width="8" height="16" fill={bean} />
      </g>
    </g>
  );
}

function ScooterRider() {
  return (
    <g transform="translate(-10 -26)">
      <path d="M-1 2c5 2 10 6 13 12" stroke={plum} strokeWidth="4.6" strokeLinecap="round" fill="none" />
      <path d="M4 1c5 2 9 6 12 11" stroke={plumSoft} strokeWidth="4.4" strokeLinecap="round" fill="none" />
      <ellipse cx="14" cy="15" rx="5" ry="2.2" fill={plumSoft} />
      <path d="M-9 0c-3-7-2-13 3-16 3-2 7-1 9 2 3 4 3 9 1 14Z" fill={lavenderDeep} stroke={plum} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M-4 -3h8" stroke={lavender} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M6 -12c8 0 16 3 22 6" stroke={lavenderDeep} strokeWidth="4.6" strokeLinecap="round" fill="none" />
      <circle cx="28" cy="-6" r="2.6" fill={creamSoft} stroke={plum} strokeWidth=".9" />
      <path d="M-3 -16h6v4h-6Z" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <circle cx="0" cy="-25" r="9.4" fill={creamSoft} stroke={plum} strokeWidth="1.8" />
      <circle cx="-9" cy="-31" r="4.8" fill={bean} />
      <path d="M-12 -33c1.6-1.6 3.6-1.6 5 0" stroke={plumSoft} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M-9.4 -27c.4-7 4.2-10 9.4-10s9 3.6 9.4 10c-2-3.6-5-5.4-9.4-5.4s-7.4 1.8-9.4 5.4Z" fill={bean} />
      <path d="M-3 -37c2.6-1.4 5.6-.8 7.4 1.6" stroke={rose} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M-5.4 -25c1.2 1.2 2.6 1.2 3.8 0M1.4 -25c1.2 1.2 2.6 1.2 3.8 0" stroke={plum} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M-2 -21.6c1.2 1 3 1 4.2 0" stroke={roseDeep} strokeWidth=".9" fill="none" strokeLinecap="round" />
      <ellipse cx="-6" cy="-23" rx="2.2" ry="1.3" fill={rose} opacity=".4" />
      <ellipse cx="5.4" cy="-23" rx="2.2" ry="1.3" fill={rose} opacity=".4" />
    </g>
  );
}

function Scooter({ parked = false, animated = false }: { parked?: boolean; animated?: boolean }) {
  return (
    <g>
      <ellipse cx="0" cy="2" rx="36" ry="4" fill={plum} opacity=".12" />
      {[-24, 24].map((cx) => (
        <g key={`wheel-${cx}`}>
          <circle cx={cx} cy="-8" r="8" fill="#4A3546" stroke={plum} strokeWidth="1.8" />
          <motion.g
            initial={{ rotate: 0 }}
            animate={animated ? { rotate: [0, 720] } : { rotate: 0 }}
            transition={animated ? { duration: 1.5, delay: 0.5, ease: "linear" } : undefined}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx={cx} cy="-8" r="3.2" fill={kfcCream} />
            <path d={`M${cx - 5} -8h10M${cx} -13v10`} stroke={plumSoft} strokeWidth="1" opacity=".7" />
          </motion.g>
        </g>
      ))}
      <path d="M-34 -12c0-8 5-13 13-13h12c5 0 9 4 9 9v8c0 5-4 8-9 8h-18c-4 0-7-5-7-12Z" fill={butter} stroke={plum} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M-30 -26h24c3 0 5 2 4 5l-1 3h-28c-2 0-3-2-2-5Z" fill={plumSoft} stroke={plum} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M-6 -10h24v5h-24Z" fill={butter} stroke={plum} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M16 -32c6-3 12 0 13 6l2 14c1 5-3 8-8 8h-8Z" fill={butter} stroke={plum} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M24 -34l6-4" stroke={plum} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="31" cy="-39" r="1.8" fill={plum} />
      <path d="M29 -39v-6" stroke={plum} strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="29" cy="-47" rx="3" ry="1.8" fill={creamSoft} stroke={plum} strokeWidth=".8" />
      <circle cx="30" cy="-22" r="4" fill={cream} stroke={plum} strokeWidth="1.2" />
      <circle cx="-33" cy="-20" r="2" fill={kfcRed} />
      {parked ? <path d="M-12 -8l-8 8" stroke={plum} strokeWidth="1.8" strokeLinecap="round" /> : null}
    </g>
  );
}

function DivyaStanding() {
  return (
    <g transform="rotate(1.4 0 0)">
      <ellipse cx="0" cy="2" rx="16" ry="3" fill={plum} opacity=".12" />
      <path d="M-5.5 -16l-3 16M5.5 -16l3 16" stroke={plum} strokeWidth="4.4" strokeLinecap="round" />
      <ellipse cx="-10" cy="1" rx="5.6" ry="2.5" fill={plumSoft} />
      <ellipse cx="10" cy="1" rx="5.6" ry="2.5" fill={plumSoft} />
      <path d="M-14 -14c-2-13 3-21 14-21s16 8 14 21c-1 5-7 7-14 7s-13-2-14-7Z" fill={lavenderDeep} stroke={plum} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M-9 -33c2-4 5-6 9-6s7 2 9 6c-3 3-15 3-18 0Z" fill={lavender} stroke={plum} strokeWidth="1.1" />
      <path d="M-8 -16h16" stroke={lavender} strokeWidth="2.6" strokeLinecap="round" opacity=".9" />
      <path d="M-13 -31c-4 6-4 11-1 14M13 -31c4 6 4 11 1 14" stroke={lavenderDeep} strokeWidth="4.8" strokeLinecap="round" fill="none" />
      <circle cx="-14" cy="-15" r="2.6" fill={creamSoft} stroke={plum} strokeWidth=".9" />
      <circle cx="14" cy="-15" r="2.6" fill={creamSoft} stroke={plum} strokeWidth=".9" />
      <g transform="translate(16 -14)">
        <rect x="-3.6" y="-7" width="7.2" height="9" rx="1.6" fill={cream} stroke={plum} strokeWidth="1.1" />
        <path d="M-3.6 -4.5h7.2" stroke={kfcRed} strokeWidth="2" />
        <path d="M-1.2 -8c-1-2 2-2 0-4M1.4 -8c-1-2 2-2 0-4" stroke={roseDeep} strokeWidth=".9" strokeLinecap="round" fill="none" opacity=".55" />
      </g>
      <path d="M-3.5 -38h7v5h-7Z" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <circle cx="0" cy="-47" r="10.4" fill={creamSoft} stroke={plum} strokeWidth="1.9" />
      <ellipse cx="-10.4" cy="-46" rx="2.2" ry="3.2" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <ellipse cx="10.4" cy="-46" rx="2.2" ry="3.2" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <circle cx="9" cy="-57" r="5.4" fill={bean} />
      <path d="M6 -59c2-2 4.4-2 6 0" stroke={plumSoft} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M-10.4 -49c.6-7 4.6-11 10.4-11s9.8 4 10.4 11c-2-4-5.4-6-10.4-6s-8.4 2-10.4 6Z" fill={bean} />
      <path d="M-10 -38c-1 4-1 8 .4 11M10 -38c1 4 1 8-.4 11" stroke={bean} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M-6.4 -47c1.4 1.5 3 1.5 4.4 0M2 -47c1.4 1.5 3 1.5 4.4 0" stroke={plum} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M-7 -47l-1.6-1.4M7.4 -47l1.6-1.4" stroke={plum} strokeWidth=".9" strokeLinecap="round" />
      <ellipse cx="-7" cy="-43.8" rx="2.6" ry="1.5" fill={rose} opacity=".45" />
      <ellipse cx="7" cy="-43.8" rx="2.6" ry="1.5" fill={rose} opacity=".45" />
      <path d="M-2.4 -41.4c1.4 1.5 3.8 1.5 5.2 0" stroke={roseDeep} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M7 -53l4 2" stroke={rose} strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

function BoyWaiting({ animated }: SceneProps) {
  return (
    <g transform="translate(278 176)">
      <ellipse cx="0" cy="2" rx="18" ry="3.2" fill={plum} opacity=".1" />
      <path d="M-7 -16l-2 16M7 -16l2 16" stroke={plum} strokeWidth="4.6" strokeLinecap="round" />
      <ellipse cx="-9" cy="1" rx="5" ry="2.4" fill={plumSoft} />
      <ellipse cx="9" cy="1" rx="5" ry="2.4" fill={plumSoft} />
      <path d="M-14 -14c-2-13 2-21 14-21s16 8 14 21c-1 5-6 7-14 7s-13-2-14-7Z" fill={sageDeep} stroke={plum} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M-8 -31c2-4 5-6 8-6s6 2 8 6c-3 3-13 3-16 0Z" fill={sage} stroke={plum} strokeWidth="1.1" />
      <path d="M-12 -28c-4 6-4 10-1 13M12 -28c4 6 4 10 1 13" stroke={sageDeep} strokeWidth="4.8" strokeLinecap="round" fill="none" />
      <circle cx="-14" cy="-14" r="2.6" fill={creamSoft} stroke={plum} strokeWidth=".9" />
      <circle cx="14" cy="-14" r="2.6" fill={creamSoft} stroke={plum} strokeWidth=".9" />
      <path d="M-3.5 -40h7v5h-7Z" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <motion.g
        initial={animated ? { rotate: 0 } : { rotate: -7 }}
        animate={animated ? { rotate: [0, 0, -7] } : { rotate: -7 }}
        transition={animated ? { duration: 3.8, times: [0, 0.62, 0.8], ease: EASE_SCENE } : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
      >
        <circle cx="0" cy="-48" r="9.6" fill={creamSoft} stroke={plum} strokeWidth="1.9" />
        <ellipse cx="-9.6" cy="-47" rx="2" ry="3" fill={creamSoft} stroke={plum} strokeWidth="1.1" />
        <ellipse cx="9.6" cy="-47" rx="2" ry="3" fill={creamSoft} stroke={plum} strokeWidth="1.1" />
        <path d="M-9.6 -50c.4-7 4.4-11 9.6-11s9.2 4 9.6 11c-2-4-5-6-9.6-6s-7.6 2-9.6 6Z" fill={plum} />
        <path d="M-4 -59c3-2 7-1 9 2" stroke={plum} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="-5.4" cy="-47" r="1.2" fill={plum} />
        <circle cx="3.4" cy="-47" r="1.2" fill={plum} />
        <path d="M-6.6 -50.4c1.2-.6 2.8-.6 4 0M2.6 -50.4c1.2-.6 2.8-.6 4 0" stroke={plum} strokeWidth=".9" strokeLinecap="round" fill="none" opacity=".7" />
        <path d="M-2.6 -43.4c1.4 1.5 3.8 1.5 5.2 0" stroke={roseDeep} strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <ellipse cx="-6" cy="-45.6" rx="2.4" ry="1.4" fill={rose} opacity=".4" />
        <ellipse cx="6" cy="-45.6" rx="2.4" ry="1.4" fill={rose} opacity=".4" />
      </motion.g>
      <motion.g
        initial={animated ? { opacity: 0, scale: 0.5 } : false}
        animate={animated ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={animated ? { duration: 0.35, delay: 2.2, ease: EASE_SCENE } : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <SparkShape x={0} y={-72} s={1.15} color={butter} />
        <SparkShape x={0} y={-72} s={0.58} color={rose} />
      </motion.g>
    </g>
  );
}

function KfcBoothTable() {
  return (
    <g transform="translate(244 164)">
      <ellipse cx="0" cy="14" rx="30" ry="5" fill={plum} opacity=".1" />
      <ellipse cx="0" cy="0" rx="28" ry="9" fill={kfcCream} stroke={plum} strokeWidth="1.6" />
      <path d="M-4 8v14h8V8" fill={kfcRedDeep} stroke={plum} strokeWidth="1.2" />
      <ellipse cx="0" cy="22" rx="13" ry="3" fill={kfcRedDeep} opacity=".8" />
      <g transform="translate(-8 -2)">
        <path d="M-6 0l1.6-13h8.8L6 0Z" fill={kfcCream} stroke={plum} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M-3.6 -8h7.2" stroke={kfcRed} strokeWidth="2.6" />
        <ellipse cx="0" cy="-13" rx="5" ry="1.8" fill={kfcCream} stroke={plum} strokeWidth="1" />
        <path d="M2 -14l2-6" stroke={roseDeep} strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <g transform="translate(12 -2)">
        <path d="M-6 0h12l-1.5-11h-9Z" fill={kfcCream} stroke={plum} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M-3.5 0l.5-11M0 0v-11M3.5 0l-.5-11" stroke={kfcRed} strokeWidth="1.8" />
        <ellipse cx="0" cy="-11" rx="6" ry="2" fill={kfcCream} stroke={plum} strokeWidth="1" />
      </g>
    </g>
  );
}

function BoyCozy() {
  return (
    <g transform="translate(128 158) rotate(3 0 -24)">
      <path d="M-18 2c1-15 7-24 18-24s17 9 18 24Z" fill={sageDeep} stroke={plum} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M-8 -20c2-4 5-6 8-6s6 2 8 6c-3 4-13 4-16 0Z" fill={sage} stroke={plum} strokeWidth="1.2" />
      <path d="M-16 -12c-4 6-5 11-3 14M16 -12c4 6 5 11 3 14" stroke={plum} strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="-17" cy="2" rx="4" ry="2.6" fill={creamSoft} stroke={plum} strokeWidth="1.1" />
      <ellipse cx="17" cy="2" rx="4" ry="2.6" fill={creamSoft} stroke={plum} strokeWidth="1.1" />
      <path d="M-3.5 -22h7v-5h-7Z" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <circle cx="0" cy="-33" r="9.6" fill={creamSoft} stroke={plum} strokeWidth="1.8" />
      <path d="M-9.6 -35c.5-7 4.5-11 9.6-11s9 4 9.6 11c-2-4-5-6-9.6-6s-7.6 2-9.6 6Z" fill={plum} />
      <path d="M-3 -45c3-2 7-2 9 1" stroke={plum} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="-2.6" cy="-33" r="1.1" fill={plum} />
      <circle cx="5.6" cy="-33" r="1.1" fill={plum} />
      <path d="M-6 -36.5c1.2-.6 2.6-.6 3.8 0M3 -36.5c1.2-.6 2.6-.6 3.8 0" stroke={plum} strokeWidth=".9" strokeLinecap="round" fill="none" opacity=".7" />
      <path d="M-3 -27c1.6 1.8 4.4 1.8 6 0" stroke={roseDeep} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <ellipse cx="-6.5" cy="-29.5" rx="2.4" ry="1.5" fill={rose} opacity=".4" />
      <ellipse cx="6.5" cy="-29.5" rx="2.4" ry="1.5" fill={rose} opacity=".4" />
    </g>
  );
}

function DivyaCozy() {
  return (
    <g transform="translate(192 158) rotate(-3 0 -24)">
      <path d="M-18 2c1-15 7-24 18-24s17 9 18 24Z" fill={lavenderDeep} stroke={plum} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M-8 -20c2-4 5-6 8-6s6 2 8 6c-3 4-13 4-16 0Z" fill={lavender} stroke={plum} strokeWidth="1.2" />
      <path d="M-16 -12c-4 6-5 11-3 14M16 -12c4 6 5 11 3 14" stroke={plum} strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="-17" cy="2" rx="4" ry="2.6" fill={creamSoft} stroke={plum} strokeWidth="1.1" />
      <ellipse cx="17" cy="2" rx="4" ry="2.6" fill={creamSoft} stroke={plum} strokeWidth="1.1" />
      <path d="M-3.5 -22h7v-5h-7Z" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <circle cx="0" cy="-34" r="11" fill={bean} />
      <circle cx="9" cy="-43" r="5.2" fill={bean} />
      <path d="M6 -45c2-2 4.4-2 6 0" stroke={plumSoft} strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="-33" r="9.6" fill={creamSoft} stroke={plum} strokeWidth="1.8" />
      <path d="M-9.6 -36c.6-7 4.5-11 9.6-11s9 4 9.6 11c-2-3.5-5-5-9.6-5s-7.6 1.5-9.6 5Z" fill={bean} />
      <path d="M-9 -36c-1 4-1 8 .4 11M9 -36c1 4 1 8-.4 11" stroke={bean} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M-6 -33c1.4 1.5 3 1.5 4.4 0M2 -33c1.4 1.5 3 1.5 4.4 0" stroke={plum} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M-6.6 -33l-1.6-1.4M5.8 -33l1.6-1.4" stroke={plum} strokeWidth=".9" strokeLinecap="round" />
      <path d="M-5.5 -30.4c1.2.6 2.4.6 3.6 0M2.5 -30.4c1.2.6 2.4.6 3.6 0" stroke={roseDeep} strokeWidth=".8" opacity=".3" fill="none" strokeLinecap="round" />
      <ellipse cx="-6.5" cy="-30" rx="2.6" ry="1.6" fill={rose} opacity=".45" />
      <ellipse cx="6.5" cy="-30" rx="2.6" ry="1.6" fill={rose} opacity=".45" />
      <path d="M-2.4 -26.4c1.4 1.4 3.8 1.4 5.2 0" stroke={roseDeep} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M7 -40l4 2" stroke={rose} strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

function KfcFeast() {
  return (
    <g>
      <ellipse cx="160" cy="164" rx="76" ry="8" fill={plum} opacity=".06" />
      <g transform="translate(160 160)">
        <path d="M-13 0l2.6-25h20.8L13 0Z" fill={kfcCream} stroke={plum} strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M-7 0l1.2-25h3.2L-3.6 0Z" fill={kfcRed} />
        <path d="M-1 0v-25h3.2V0Z" fill={kfcRed} />
        <path d="M7 0l-1.4-25h3.2L10 0Z" fill={kfcRed} />
        <ellipse cx="0" cy="-25" rx="15" ry="4.2" fill={kfcCream} stroke={plum} strokeWidth="1.4" />
        <g transform="translate(-7 -27) rotate(-22)">
          <ellipse cx="0" cy="0" rx="6.4" ry="4.2" fill={bean} stroke={plum} strokeWidth="1" />
          <path d="M5 2l6 4" stroke={cream} strokeWidth="3" strokeLinecap="round" />
          <circle cx="12.4" cy="6.6" r="2.2" fill={cream} stroke={plum} strokeWidth=".7" />
        </g>
        <g transform="translate(8 -27) rotate(20)">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill={bean} stroke={plum} strokeWidth="1" />
          <path d="M-5 2l-6 4" stroke={cream} strokeWidth="3" strokeLinecap="round" />
          <circle cx="-12" cy="6.6" r="2.2" fill={cream} stroke={plum} strokeWidth=".7" />
        </g>
      </g>

      <g transform="translate(113 160)">
        <path d="M-8 0l2-18h12l2 18Z" fill={kfcRed} stroke={plum} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M-5.6 -7h11.2" stroke={kfcCream} strokeWidth="3.4" opacity=".95" />
        <ellipse cx="0" cy="-18" rx="7" ry="2.4" fill={kfcCream} stroke={plum} strokeWidth="1.2" />
        <path d="M2 -19l4-9" stroke={roseDeep} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 -28h4.5" stroke={roseDeep} strokeWidth="1.8" strokeLinecap="round" />
      </g>

      <g transform="translate(207 160)">
        <path d="M-8 0l2-18h12l2 18Z" fill={kfcRed} stroke={plum} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M-5.6 -7h11.2" stroke={kfcCream} strokeWidth="3.4" opacity=".95" />
        <ellipse cx="0" cy="-18" rx="7" ry="2.4" fill={kfcCream} stroke={plum} strokeWidth="1.2" />
        <path d="M-2 -19l-4-9" stroke={roseDeep} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M-6 -28h-4.5" stroke={roseDeep} strokeWidth="1.8" strokeLinecap="round" />
      </g>

      <g transform="translate(136 160)">
        <path d="M-7 0l2-13h10l2 13Z" fill={kfcRed} stroke={plum} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M-3 -13l.5-5M0 -13v-6M3 -13l-.5-5" stroke={butter} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M-4.4 -6h8.8" stroke={kfcCream} strokeWidth="1.6" opacity=".9" />
      </g>
    </g>
  );
}

function KfcCozyScene({ animated }: SceneProps) {
  return (
    <g>
      <KfcRoom />
      <circle cx="160" cy="122" r="76" fill={butter} opacity=".18" />
      <circle cx="160" cy="122" r="46" fill={butter} opacity=".16" />

      <motion.g
        initial={animated ? undefined : false}
        animate={animated ? { y: [0, -0.9, 0] } : { y: 0 }}
        transition={animated ? { duration: 4.6, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <BoyCozy />
        <DivyaCozy />
      </motion.g>

      <ellipse cx="160" cy="198" rx="104" ry="7" fill={plum} opacity=".12" />
      <rect x="58" y="160" width="204" height="10" rx="5" fill={cream} stroke={plum} strokeWidth="2" />
      <rect x="66" y="170" width="188" height="6" rx="3" fill={kfcRed} opacity=".32" />
      <rect x="80" y="176" width="9" height="28" rx="3" fill={bean} />
      <rect x="231" y="176" width="9" height="28" rx="3" fill={bean} />

      <KfcFeast />

      <Steam x={156} y={130} animated={animated} delay={0.2} color={rose} width={1.8} />
      <Steam x={164} y={129} animated={animated} delay={1.3} color={rose} width={1.8} />

      <motion.g
        initial={animated ? undefined : false}
        animate={animated ? { y: [0, -5, 0], opacity: [0.55, 0.95, 0.55] } : { y: 0, opacity: 0.85 }}
        transition={animated ? { duration: 3.8, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <HeartShape x={160} y={104} s={1.35} color={yellow} />
        <HeartShape x={172} y={96} s={0.8} color={darkyellow} />
      </motion.g>

      {[
        { x: 206, y: 112, size: 11, delay: 0 },
        { x: 213, y: 103, size: 13, delay: 1.2 },
      ].map((z) => (
        <motion.text
          key={`cozy-z-${z.x}`}
          x={z.x}
          y={z.y}
          fontFamily="var(--font-caveat)"
          fontSize={z.size}
          fill={roseDeep}
          initial={animated ? undefined : false}
          animate={animated ? { opacity: [0, 0.75, 0], y: [0, -6, -12] } : { opacity: 0.5 }}
          transition={animated ? { duration: 3, repeat: Infinity, delay: z.delay, ease: "easeOut" } : undefined}
        >
          z
        </motion.text>
      ))}

      <SparkShape x={130} y={92} s={0.7} color={butter} />
      <SparkShape x={214} y={88} s={0.6} color={cream} />
    </g>
  );
}

function SleepScene({ animated }: SceneProps) {
  if (!animated) {
    return (
      <g>
        <KfcRoom />
        <g transform="translate(62 176)">
          <Scooter parked />
        </g>
        <BoyWaiting animated={false} />
        <KfcBoothTable />
        <g transform="translate(210 176)">
          <DivyaStanding />
        </g>
        <HeartShape x={242} y={124} s={1.25} color={darkyellow} />
        <SparkShape x={214} y={92} s={0.7} color={butter} />
        <SparkShape x={162} y={88} s={0.6} color={rose} />
      </g>
    );
  }

  return (
    <g>
      <motion.g
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: 6.4, times: [0, 0.73, 0.87], ease: "easeInOut" }}
      >
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_SCENE }}
        >
          <KfcRoom />
        </motion.g>

        <g transform="translate(62 176)">
          <motion.g
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: EASE_SCENE }}
          >
            <motion.g
              animate={{ rotate: [0, 0, -2.4] }}
              transition={{ duration: 2.6, times: [0, 0.8, 1], ease: EASE_SCENE }}
              style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            >
              <Scooter animated />
            </motion.g>
            <motion.g
              animate={{ opacity: [1, 1, 0] }}
              transition={{ duration: 2.3, times: [0, 0.86, 1], ease: "easeInOut" }}
            >
              <ScooterRider />
            </motion.g>
          </motion.g>
        </g>

        <BoyWaiting animated />
        <KfcBoothTable />

        <g transform="translate(210 176)">
          <motion.g
            initial={{ opacity: 0, x: -106 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              opacity: { duration: 0.32, delay: 1.95 },
              x: { duration: 1.12, delay: 2.4, ease: EASE_SCENE },
            }}
          >
            <motion.g
              animate={{ y: [0, -1.6, 0] }}
              transition={{ duration: 0.28, repeat: 4, delay: 2.4, ease: "easeInOut" }}
            >
              <DivyaStanding />
            </motion.g>
          </motion.g>
        </g>

        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 1, 0.9], scale: [0.6, 1.1, 1] }}
          transition={{ duration: 1.2, delay: 3.5, ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <HeartShape x={242} y={124} s={1.25} color={yellow} />
        </motion.g>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.6] }}
          transition={{ duration: 1.6, delay: 3.2, ease: "easeInOut" }}
        >
          <SparkShape x={214} y={92} s={0.7} color={butter} />
          <SparkShape x={162} y={88} s={0.6} color={rose} />
        </motion.g>
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 6.4, times: [0, 0.73, 0.87], ease: "easeInOut" }}
      >
        <KfcCozyScene animated />
      </motion.g>
    </g>
  );
}

function FoodScene({ animated }: SceneProps) {
  return (
    <g>
      <circle cx="160" cy="110" r="98" fill={peach} opacity=".28" />
      <circle cx="258" cy="66" r="34" fill={butter} opacity=".32" />

      <path d="M160 4v30" stroke={plum} strokeWidth="1.6" />
      <path d="M144 34h32l-6 13h-20Z" fill={rose} stroke={plum} strokeWidth="1.6" strokeLinejoin="round" />
      <motion.ellipse
        cx="160"
        cy="60"
        rx="38"
        ry="18"
        fill={butter}
        initial={animated ? undefined : false}
        animate={animated ? { opacity: [0.12, 0.3, 0.12] } : { opacity: 0.22 }}
        transition={animated ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
      />

      <ellipse cx="160" cy="182" rx="96" ry="8" fill={plum} opacity=".12" />
      <rect x="54" y="146" width="212" height="12" rx="6" fill={creamSoft} stroke={plum} strokeWidth="2" />
      <rect x="62" y="158" width="196" height="7" rx="3" fill={rose} opacity=".34" />
      <rect x="72" y="165" width="8" height="24" rx="3" fill={bean} />
      <rect x="240" y="165" width="8" height="24" rx="3" fill={bean} />

      <g>
        <rect x="34" y="112" width="14" height="40" rx="5" fill={blush} stroke={plum} strokeWidth="1.6" />
        <rect x="40" y="146" width="30" height="9" rx="4" fill={blushDeep} stroke={plum} strokeWidth="1.4" />
      </g>
      <g>
        <rect x="272" y="112" width="14" height="40" rx="5" fill={lavender} stroke={plum} strokeWidth="1.6" />
        <rect x="250" y="146" width="30" height="9" rx="4" fill={lavenderDeep} stroke={plum} strokeWidth="1.4" />
      </g>

      <ellipse cx="98" cy="144" rx="32" ry="10" fill={cream} stroke={plum} strokeWidth="1.8" />
      <ellipse cx="98" cy="136" rx="23" ry="9" fill={peach} />
      <path d="M80 134c8-6 26-6 36 0M84 138c8 4 20 4 28 0" stroke={roseDeep} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M88 128l1-4M98 126l0-4M108 128l-1-4" stroke={sageDeep} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="98" cy="132" r="2" fill={rose} />

      <ellipse cx="222" cy="144" rx="32" ry="10" fill={cream} stroke={plum} strokeWidth="1.8" />
      <path d="M200 139c0-5 4-8 9-9h26c5 1 9 4 9 9Z" fill={peach} stroke={plum} strokeWidth="1.4" />
      <path d="M204 136c6-4 30-4 36 0" stroke={roseDeep} strokeWidth="1.4" fill="none" />
      <path d="M200 140h44v5c0 4-5 6-11 6h-22c-6 0-11-2-11-6Z" fill={butter} stroke={plum} strokeWidth="1.4" />
      <circle cx="212" cy="136" r="1.2" fill={cream} />
      <circle cx="220" cy="135" r="1.2" fill={cream} />
      <circle cx="228" cy="136" r="1.2" fill={cream} />

      {[
        { x: 138, y: 130, color: roseDeep },
        { x: 182, y: 130, color: roseDeep },
      ].map((cup) => (
        <g key={cup.x}>
          <ellipse cx={cup.x} cy="143" rx="14" ry="4" fill={cream} stroke={plum} strokeWidth="1.2" />
          <path d={`M${cup.x - 8} 128h16l-2 12c-.3 2-1.6 3-3.5 3h-5c-1.9 0-3.2-1-3.5-3l-2-12Z`} fill={cream} stroke={plum} strokeWidth="1.5" />
          <path d={`M${cup.x + 8} 130h3c3 0 4 3 3 5-1 2-3 2-5 2`} stroke={plum} strokeWidth="1.3" fill="none" />
          <ellipse cx={cup.x} cy="128" rx="8" ry="3" fill={cup.color} opacity=".55" />
          <Steam x={cup.x - 3} y={122} animated={animated} delay={0.2} color={rose} width={1.8} />
          <Steam x={cup.x + 3} y={121} animated={animated} delay={1.1} color={rose} width={1.8} />
        </g>
      ))}

      <g transform="translate(160 122)">
        <motion.ellipse
          cx="0"
          cy="12"
          rx="16"
          ry="8"
          fill={butter}
          initial={animated ? undefined : false}
          animate={animated ? { opacity: [0.2, 0.42, 0.2] } : { opacity: 0.28 }}
          transition={animated ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : undefined}
        />
        <rect x="-5" y="0" width="10" height="16" rx="3" fill={butter} stroke={plum} strokeWidth="1.3" opacity=".9" />
        <motion.path
          d="M0 2c-3-3 3-5 0-9-3 4 3 6 0 9Z"
          fill={peach}
          stroke={roseDeep}
          strokeWidth="0.9"
          initial={animated ? undefined : false}
          animate={animated ? { scale: [1, 1.16, 0.94, 1], rotate: [-1.5, 1.5, -1.5] } : { scale: 1, rotate: 0 }}
          transition={animated ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" } : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        />
      </g>

      {[
        { x: 72, y: 84, s: 1.2, color: rose, delay: 0 },
        { x: 246, y: 100, s: 0.9, color: peach, delay: 0.8 },
        { x: 226, y: 74, s: 0.7, color: rose, delay: 1.5 },
      ].map((heart) => (
        <motion.g
          key={`${heart.x}-${heart.y}`}
          initial={animated ? undefined : false}
          animate={animated ? { y: [0, -6, 0], opacity: [0.55, 0.95, 0.55] } : { y: 0, opacity: 0.8 }}
          transition={animated ? { duration: 3.6, repeat: Infinity, delay: heart.delay, ease: "easeInOut" } : undefined}
        >
          <HeartShape x={heart.x} y={heart.y} s={heart.s} color={heart.color} />
        </motion.g>
      ))}
      <SparkShape x={58} y={124} s={0.8} color={butter} />
      <SparkShape x={264} y={128} s={0.7} color={cream} />
    </g>
  );
}

function ConversationsScene({ animated }: SceneProps) {
  const bubbles = [
    { x: 124, y: 56, w: 46, h: 18, fill: blush, w2: 12, delay: 0 },
    { x: 158, y: 90, w: 38, h: 16, fill: lavender, w2: 10, delay: 1.1 },
    { x: 124, y: 122, w: 50, h: 18, fill: butter, w2: 16, delay: 2.2 },
  ];

  return (
    <g>
      <circle cx="160" cy="108" r="92" fill={blush} opacity=".32" />
      <circle cx="54" cy="150" r="30" fill={lavender} opacity=".34" />
      <circle cx="266" cy="76" r="26" fill={peach} opacity=".34" />

      <rect x="110" y="24" width="100" height="168" rx="18" fill={plum} />
      <rect x="117" y="34" width="86" height="142" rx="10" fill={creamSoft} />
      <rect x="146" y="28" width="28" height="5" rx="2.5" fill={plumSoft} />
      <circle cx="160" cy="182" r="3" fill={cream} opacity=".55" />

      {bubbles.map((bubble) => (
        <motion.g
          key={`${bubble.x}-${bubble.y}`}
          initial={animated ? undefined : false}
          animate={
            animated
              ? { opacity: [0, 1, 1, 0], y: [10, 0, -3, -16] }
              : { opacity: 1, y: 0 }
          }
          transition={
            animated
              ? { duration: 4, repeat: Infinity, delay: bubble.delay, ease: "easeInOut" }
              : undefined
          }
        >
          <rect x={bubble.x} y={bubble.y} width={bubble.w} height={bubble.h} rx={bubble.h / 2} fill={bubble.fill} stroke={plum} strokeWidth="1.2" />
          <path d={`M${bubble.x + 9} ${bubble.y + 7}h${bubble.w - 18}`} stroke={plum} strokeWidth="1.3" strokeLinecap="round" opacity=".35" />
          <path d={`M${bubble.x + 9} ${bubble.y + 12}h${bubble.w - 18 - bubble.w2}`} stroke={plum} strokeWidth="1.3" strokeLinecap="round" opacity=".25" />
        </motion.g>
      ))}

      <g transform="translate(128 160)">
        {[0, 1, 2].map((dot) => (
          <motion.circle
            key={dot}
            cx={dot * 7}
            cy="0"
            r="2"
            fill={plumSoft}
            initial={animated ? undefined : false}
            animate={animated ? { opacity: [0.25, 1, 0.25] } : { opacity: 0.6 }}
            transition={animated ? { duration: 1.1, repeat: Infinity, delay: dot * 0.16, ease: "easeInOut" } : undefined}
          />
        ))}
      </g>

      <motion.g
        initial={animated ? undefined : false}
        animate={animated ? { y: [0, -5, 0], opacity: [0.7, 1, 0.7] } : { y: 0, opacity: 0.9 }}
        transition={animated ? { duration: 3.8, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <HeartShape x={226} y={72} s={1.5} color={darkyellow} />
      </motion.g>
      <motion.g
        initial={animated ? undefined : false}
        animate={animated ? { y: [0, -4, 0], opacity: [0.5, 0.9, 0.5] } : { y: 0, opacity: 0.75 }}
        transition={animated ? { duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 } : undefined}
      >
        <HeartShape x={92} y={104} s={1.1} color={yellow} />
      </motion.g>

      <SparkShape x={72} y={68} s={0.8} color={butter} />
      <SparkShape x={248} y={132} s={0.7} color={cream} />
    </g>
  );
}

function ReelsScene({ animated }: SceneProps) {
  const minis = [0, 1, 2];

  return (
    <g>
      <circle cx="52" cy="118" r="42" fill={peach} opacity=".34" />
      <circle cx="270" cy="70" r="36" fill={lavender} opacity=".34" />

      <rect x="108" y="20" width="104" height="176" rx="18" fill={plum} />
      <rect x="115" y="30" width="90" height="152" rx="10" fill={creamSoft} />
      <rect x="146" y="24" width="28" height="5" rx="2.5" fill={plumSoft} />

      <g>
        <rect x="121" y="36" width="78" height="104" rx="9" fill={sage} />
        <circle cx="176" cy="58" r="9" fill={butter} />
        <path d="M121 104c14-16 30-16 44-4 10-12 22-14 34-4v35h-78Z" fill={sageDeep} opacity=".9" />
        <path d="M121 116c16-10 30-8 44 2 10-8 22-8 34 0v13h-78Z" fill="#8FA083" opacity=".8" />
        <motion.g
          initial={animated ? undefined : false}
          animate={animated ? { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] } : { scale: 1, opacity: 1 }}
          transition={animated ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx="160" cy="86" r="14" fill={cream} opacity=".92" />
          <path d="M156 80l10 6-10 6Z" fill={roseDeep} />
        </motion.g>
      </g>

      <g>
        {minis.map((i) => (
          <motion.rect
            key={i}
            x={121 + i * 27}
            y="146"
            width="22"
            height="22"
            rx="5"
            fill={i === 0 ? rose : i === 1 ? peach : lavender}
            stroke={plum}
            strokeWidth="1.2"
            initial={animated ? undefined : false}
            animate={animated ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={animated ? { duration: 2.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" } : undefined}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
        <path d="M147 172l4 3 4-3" stroke={plumSoft} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>

      {[
        { x: 214, y: 42, fill: rose, delay: 0 },
        { x: 222, y: 68, fill: butter, delay: 1.1 },
      ].map((badge) => (
        <motion.g
          key={badge.x}
          initial={animated ? undefined : false}
          animate={animated ? { scale: [0.6, 1.12, 1], opacity: [0, 1, 1] } : { scale: 1, opacity: 1 }}
          transition={animated ? { duration: 2.6, repeat: Infinity, delay: badge.delay, ease: "easeInOut" } : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx={badge.x} cy={badge.y} r="9" fill={badge.fill} stroke={plum} strokeWidth="1.4" />
          <HeartShape x={badge.x} y={badge.y} s={0.55} color={cream} />
        </motion.g>
      ))}

      {[
        { x: 76, y: 92, s: 1.1, delay: 0 },
        { x: 248, y: 120, s: 0.85, delay: 1.3 },
      ].map((heart) => (
        <motion.g
          key={heart.x}
          initial={animated ? undefined : false}
          animate={animated ? { y: [0, -10, 0], opacity: [0, 0.95, 0] } : { y: 0, opacity: 0.7 }}
          transition={animated ? { duration: 3.4, repeat: Infinity, delay: heart.delay, ease: "easeOut" } : undefined}
        >
          <HeartShape x={heart.x} y={heart.y} s={heart.s} color={heart.s > 1 ? yellow : darkyellow} />
        </motion.g>
      ))}

      <SparkShape x={62} y={58} s={0.9} color={butter} />
      <SparkShape x={262} y={146} s={0.7} color={cream} />
    </g>
  );
}

function UnexpectedScene({ animated }: SceneProps) {
  const mergedGlow = "M160 118C168 98 184 84 202 70";
  const merged = "M160 118C168 98 184 84 202 70";

  return (
    <g>
      <circle cx="160" cy="116" r="96" fill={sage} opacity=".26" />
      <circle cx="54" cy="62" r="30" fill={peach} opacity=".32" />
      <circle cx="266" cy="158" r="34" fill={lavender} opacity=".32" />
      <path d="M24 178h272" stroke={plum} strokeWidth="2" strokeLinecap="round" opacity=".14" />

      <path
        d="M22 158C60 150 84 132 112 124S140 116 158 114"
        stroke={rose}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="2 7"
        fill="none"
      />
      <path
        d="M298 150C262 146 230 132 204 124S176 116 162 114"
        stroke={lavenderDeep}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="2 7"
        fill="none"
      />

      <motion.path
        d={mergedGlow}
        stroke={butter}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        opacity=".28"
        initial={animated ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={animated ? { duration: 1.7, ease: EASE_SCENE } : { duration: 0 }}
      />
      <motion.path
        d={merged}
        stroke={roseDeep}
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
        initial={animated ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={animated ? { duration: 1.7, ease: EASE_SCENE } : { duration: 0 }}
      />

      <g opacity=".42">
        <ellipse cx="168" cy="108" rx="3.6" ry="2.2" fill={plum} transform="rotate(-28 168 108)" />
        <ellipse cx="176" cy="99" rx="3.6" ry="2.2" fill={plum} transform="rotate(-34 176 99)" />
        <ellipse cx="184" cy="91" rx="3.6" ry="2.2" fill={plum} transform="rotate(-40 184 91)" />
      </g>

      <g>
        <circle cx="22" cy="158" r="6" fill={rose} stroke={plum} strokeWidth="1.4" />
        <circle cx="22" cy="158" r="2" fill={cream} />
      </g>
      <g>
        <circle cx="298" cy="150" r="6" fill={lavenderDeep} stroke={plum} strokeWidth="1.4" />
        <circle cx="298" cy="150" r="2" fill={cream} />
      </g>

      <circle cx="158" cy="114" r="7" fill={butter} stroke={plum} strokeWidth="1.6" />

      <motion.g
        initial={animated ? undefined : false}
        animate={animated ? { scale: [0.9, 1.12, 0.9] } : { scale: 1 }}
        transition={animated ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle cx="202" cy="64" r="20" fill={butter} opacity=".32" />
        <HeartShape x={202} y={64} s={1.9} color={yellow} />
        <HeartShape x={202} y={64} s={1.1} color={darkyellow} />
        <path d="M202 40v-6M202 88v6M178 64h-6M226 64h6M185 47l-4-4M219 81l4 4M219 47l4-4M185 81l-4 4" stroke={butter} strokeWidth="1.8" strokeLinecap="round" />
      </motion.g>

      <motion.g
        initial={animated ? undefined : false}
        animate={animated ? { y: [0, -4, 0], opacity: [0.5, 0.9, 0.5] } : { y: 0, opacity: 0.75 }}
        transition={animated ? { duration: 3.6, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <HeartShape x={80} y={74} s={0.9} color={darkyellow} />
        <HeartShape x={250} y={110} s={0.7} color={yellow} />
      </motion.g>

      <SparkShape x={130} y={84} s={0.8} color={butter} />
      <SparkShape x={232} y={40} s={0.7} color={cream} />
      <SparkShape x={60} y={130} s={0.6} color={rose} />
    </g>
  );
}

export function MemoryScene({
  kind,
  className,
  animated = true,
}: {
  kind: MemoryKey;
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 320 210"
      className={className}
      aria-hidden
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {kind === "beginning" ? <BeginningScene animated={animated} /> : null}
      {kind === "sleep" ? <SleepScene animated={animated} /> : null}
      {kind === "food" ? <FoodScene animated={animated} /> : null}
      {kind === "conversations" ? <ConversationsScene animated={animated} /> : null}
      {kind === "reels" ? <ReelsScene animated={animated} /> : null}
      {kind === "unexpected" ? <UnexpectedScene animated={animated} /> : null}
    </svg>
  );
}
