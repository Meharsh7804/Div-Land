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

function SleepScene({ animated }: SceneProps) {
  return (
    <g>
      <circle cx="164" cy="116" r="102" fill={butter} opacity=".2" />
      <circle cx="62" cy="54" r="42" fill={lavender} opacity=".32" />
      <path d="M276 24a20 20 0 1 0 8 34 24 24 0 0 1-8-34Z" fill={butter} stroke={plum} strokeWidth="1.4" />
      <SparkShape x={244} y={30} s={0.9} color={butter} />
      <SparkShape x={292} y={72} s={0.7} color={cream} />
      <SparkShape x={220} y={64} s={0.6} color={rose} />

      <g>
        <circle cx="58" cy="58" r="28" fill={cream} stroke={plum} strokeWidth="2.6" />
        <circle cx="58" cy="58" r="21" fill="none" stroke={plumSoft} strokeWidth="0.8" strokeDasharray="1 6" opacity=".35" />
        <path d="M58 34v4M58 78v4M34 58h4M78 58h4" stroke={plum} strokeWidth="1.6" strokeLinecap="round" opacity=".65" />
        <motion.line
          x1="58"
          y1="58"
          x2="58"
          y2="42"
          stroke={plum}
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={animated ? undefined : false}
          animate={animated ? { rotate: 360 } : { rotate: 0 }}
          transition={animated ? { duration: 24, repeat: Infinity, ease: "linear" } : undefined}
          style={{ transformBox: "view-box", transformOrigin: "58px 58px" }}
        />
        <motion.line
          x1="58"
          y1="58"
          x2="58"
          y2="38"
          stroke={plumSoft}
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={animated ? undefined : false}
          animate={animated ? { rotate: 360 } : { rotate: 45 }}
          transition={animated ? { duration: 120, repeat: Infinity, ease: "linear" } : undefined}
          style={{ transformBox: "view-box", transformOrigin: "58px 58px" }}
        />
        <circle cx="58" cy="58" r="2.8" fill={plum} />
      </g>

      <ellipse cx="238" cy="146" rx="42" ry="6" fill={plum} opacity=".12" />
      <circle cx="240" cy="128" r="24" fill={butter} opacity=".28" />
      <rect x="206" y="98" width="66" height="46" rx="6" fill={creamSoft} stroke={plum} strokeWidth="2" />
      <rect x="200" y="90" width="78" height="12" rx="4" fill={rose} stroke={plum} strokeWidth="1.6" />
      <path d="M212 90v12M226 90v12M240 90v12M254 90v12M268 90v12" stroke={cream} strokeWidth="2.4" opacity=".75" />
      <rect x="232" y="118" width="16" height="26" rx="2" fill={bean} stroke={plum} strokeWidth="1.2" />
      <rect x="216" y="110" width="12" height="13" rx="2" fill={butter} stroke={plum} strokeWidth="1.2" />
      <path d="M216 116h12M222 110v13" stroke={plum} strokeWidth="0.9" opacity=".45" />
      <rect x="252" y="110" width="12" height="13" rx="2" fill={butter} stroke={plum} strokeWidth="1.2" />
      <path d="M252 116h12M258 110v13" stroke={plum} strokeWidth="0.9" opacity=".45" />
      <g transform="translate(274 62)">
        <line x1="0" y1="0" x2="0" y2="30" stroke={plum} strokeWidth="1.6" />
        <motion.path
          d="M0 1l16 4-16 5Z"
          fill={roseDeep}
          initial={animated ? undefined : false}
          animate={animated ? { skewY: [0, -3, 0, 3, 0] } : { skewY: 0 }}
          transition={animated ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "left center" }}
        />
      </g>
      <HeartShape x={240} y={84} s={1.5} color={rose} />

      <path
        d="M18 200C56 192 46 168 92 166S150 154 178 146s36-10 44-14"
        stroke={roseDeep}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 8"
        fill="none"
        opacity=".65"
      />
      <motion.path
        d="M18 200C56 192 46 168 92 166S150 154 178 146s36-10 44-14"
        stroke={roseDeep}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="1 8"
        fill="none"
        opacity=".16"
        initial={animated ? undefined : false}
        animate={animated ? { strokeDashoffset: [0, -18] } : { strokeDashoffset: 0 }}
        transition={animated ? { duration: 2.2, repeat: Infinity, ease: "linear" } : undefined}
      />

      <g opacity=".38">
        <ellipse cx="66" cy="190" rx="4" ry="2.4" fill={plum} />
        <ellipse cx="78" cy="185" rx="4" ry="2.4" fill={plum} />
        <ellipse cx="89" cy="179" rx="4" ry="2.4" fill={plum} />
      </g>

      <g transform="translate(104 170)">
        <motion.g
          initial={animated ? undefined : false}
          animate={animated ? { y: [0, -2.2, 0], rotate: [-0.6, 0.6, -0.6] } : { y: 0, rotate: 0 }}
          transition={animated ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" } : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        >
          <path d="M-6-18-11 0M6-18 11 0" stroke={plum} strokeWidth="4.4" strokeLinecap="round" />
          <ellipse cx="-12" cy="1" rx="5" ry="2.6" fill={plumSoft} />
          <ellipse cx="12" cy="1" rx="5" ry="2.6" fill={plumSoft} />
          <path d="M-13-46C-17-32-14-18-6-18H8C16-18 18-32 14-46Z" fill={lavenderDeep} stroke={plum} strokeWidth="2" strokeLinejoin="round" />
          <path d="M-12-44C-18-40-20-32-16-27" stroke={plum} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M12-44C19-40 21-34 17-29" stroke={plum} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M-8-46h16" stroke={rose} strokeWidth="4" strokeLinecap="round" />
          <circle cx="1" cy="-58" r="11" fill={creamSoft} stroke={plum} strokeWidth="2" />
          <path d="M-10-62c1-9 21-11 21-1-3-3-6-2-9-3-4 3-8 2-12 4Z" fill={bean} />
          <path d="M-6-59c1.2 1.2 2.8 1.2 4 0M3-59c1.2 1.2 2.8 1.2 4 0" stroke={plum} strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M-6-55c1 0.8 2 0.8 3 0M3-55c1 0.8 2 0.8 3 0" stroke={roseDeep} strokeWidth="0.9" strokeLinecap="round" fill="none" opacity=".7" />
          <ellipse cx="1" cy="-51" rx="2.2" ry="2.8" fill={plumSoft} opacity=".8" />
          <g transform="translate(18 -30)">
            <rect x="-4" y="0" width="9" height="9" rx="2" fill={cream} stroke={plum} strokeWidth="1.4" />
            <path d="M5 2h2c2 0 2 3 0 3H5" stroke={plum} strokeWidth="1.2" fill="none" />
            <path d="M0-2c-1-2 2-2 0-4M3-2c-1-2 2-2 0-4" stroke={roseDeep} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity=".7" />
          </g>
        </motion.g>
      </g>

      {[
        { x: 92, y: 96, size: 12, delay: 0 },
        { x: 108, y: 86, size: 15, delay: 0.6 },
        { x: 124, y: 78, size: 10, delay: 1.2 },
      ].map((z) => (
        <motion.text
          key={z.x}
          x={z.x}
          y={z.y}
          fontFamily="var(--font-caveat)"
          fontSize={z.size}
          fill={roseDeep}
          initial={animated ? undefined : false}
          animate={
            animated
              ? { opacity: [0, 0.9, 0], y: [0, -8, -16] }
              : { opacity: 0.55 }
          }
          transition={
            animated
              ? { duration: 3, repeat: Infinity, delay: z.delay, ease: "easeOut" }
              : undefined
          }
        >
          z
        </motion.text>
      ))}

      <SparkShape x={190} y={80} s={0.8} color={butter} />
      <SparkShape x={166} y={60} s={0.6} color={rose} />
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
        <HeartShape x={226} y={72} s={1.5} color={rose} />
      </motion.g>
      <motion.g
        initial={animated ? undefined : false}
        animate={animated ? { y: [0, -4, 0], opacity: [0.5, 0.9, 0.5] } : { y: 0, opacity: 0.75 }}
        transition={animated ? { duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 } : undefined}
      >
        <HeartShape x={92} y={104} s={1.1} color={peach} />
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
          <HeartShape x={heart.x} y={heart.y} s={heart.s} color={heart.s > 1 ? rose : peach} />
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
        <HeartShape x={202} y={64} s={1.9} color={rose} />
        <HeartShape x={202} y={64} s={1.1} color={blushDeep} />
        <path d="M202 40v-6M202 88v6M178 64h-6M226 64h6M185 47l-4-4M219 81l4 4M219 47l4-4M185 81l-4 4" stroke={butter} strokeWidth="1.8" strokeLinecap="round" />
      </motion.g>

      <motion.g
        initial={animated ? undefined : false}
        animate={animated ? { y: [0, -4, 0], opacity: [0.5, 0.9, 0.5] } : { y: 0, opacity: 0.75 }}
        transition={animated ? { duration: 3.6, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <HeartShape x={80} y={74} s={0.9} color={peach} />
        <HeartShape x={250} y={110} s={0.7} color={rose} />
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
