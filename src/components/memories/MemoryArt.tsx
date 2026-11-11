"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_SCENE } from "@/animations/motion";
import type { MemoryKey } from "@/data/memories";

const SCENE_INTRO_END = 0.35;
const SCENE_FADE_START = 5.4;
const SCENE_FADE_END = 6.3;

const plum = "#493348";
const plumSoft = "#6A4C66";
const bean = "#6B4432";
const rose = "#C98EA8";
const roseDeep = "#B0708C";
const blush = "#F6DCE7";
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

function ScenePhaseOut({ children }: { children: ReactNode }) {
  return (
    <motion.g
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: SCENE_FADE_END - SCENE_FADE_START, delay: SCENE_FADE_START, ease: "easeInOut" }}
    >
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: SCENE_INTRO_END, ease: "easeInOut" }}
      >
        {children}
      </motion.g>
    </motion.g>
  );
}

function ScenePhaseIn({ children }: { children: ReactNode }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: SCENE_FADE_END - SCENE_FADE_START, delay: SCENE_FADE_START, ease: "easeInOut" }}
    >
      {children}
    </motion.g>
  );
}

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

type BubbleProps = {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
  text?: string;
  tail?: "left" | "right" | "none";
  fontSize?: number;
};

function Bubble({
  x,
  y,
  w,
  h = 16,
  fill = cream,
  text,
  tail = "left",
  fontSize = 7.5,
}: BubbleProps) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} stroke={plum} strokeWidth="1.05" />
      {tail === "left" ? (
        <path d={`M${x + 9} ${y + h - 1.2}l-4 5.6 5.4-5.6Z`} fill={fill} stroke={plum} strokeWidth="1" strokeLinejoin="round" />
      ) : tail === "right" ? (
        <path d={`M${x + w - 9} ${y + h - 1.2}l4 5.6-5.4-5.6Z`} fill={fill} stroke={plum} strokeWidth="1" strokeLinejoin="round" />
      ) : null}
      {text ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + fontSize * 0.34}
          textAnchor="middle"
          fontFamily="var(--font-caveat)"
          fontSize={fontSize}
          fill={plum}
        >
          {text}
        </text>
      ) : (
        <>
          <path d={`M${x + 8} ${y + h / 2 - 1.6}h${w - 16}`} stroke={plum} strokeWidth="1.1" strokeLinecap="round" opacity=".28" />
          <path d={`M${x + 8} ${y + h / 2 + 2.8}h${w * 0.52}`} stroke={plum} strokeWidth="1.1" strokeLinecap="round" opacity=".2" />
        </>
      )}
    </g>
  );
}

function Cup({
  x,
  y,
  animated = false,
  delay = 0,
  liquid = rose,
  scale = 1,
}: {
  x: number;
  y: number;
  animated?: boolean;
  delay?: number;
  liquid?: string;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="12" rx="10" ry="3.2" fill={cream} stroke={plum} strokeWidth="1" />
      <path d="M-6.4 0h12.8l-1.8 9.4c-.3 1.7-1.3 2.4-2.8 2.4h-3.6c-1.5 0-2.5-.7-2.8-2.4Z" fill={cream} stroke={plum} strokeWidth="1.2" />
      <ellipse cx="0" cy="0" rx="6.4" ry="2.1" fill={liquid} opacity=".55" />
      <path d="M6.4 2h2.2c2.2 0 2.8 2.2 1.8 3.6-.7 1-1.8 1.2-3.3 1" stroke={plum} strokeWidth="1" fill="none" />
      <Steam x={-2} y={-4} animated={animated} delay={delay} color={rose} width={1.4} />
      <Steam x={2.6} y={-5} animated={animated} delay={delay + 0.9} color={rose} width={1.4} />
    </g>
  );
}

function BoyStanding() {
  return (
    <g>
      <ellipse cx="0" cy="2" rx="16" ry="3" fill={plum} opacity=".12" />
      <path d="M-5.5 -16l-3 16M5.5 -16l3 16" stroke={plum} strokeWidth="4.4" strokeLinecap="round" />
      <ellipse cx="-10" cy="1" rx="5.6" ry="2.5" fill={plumSoft} />
      <ellipse cx="10" cy="1" rx="5.6" ry="2.5" fill={plumSoft} />
      <path d="M-14 -14c-2-13 3-21 14-21s16 8 14 21c-1 5-7 7-14 7s-13-2-14-7Z" fill={sageDeep} stroke={plum} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M-9 -33c2-4 5-6 9-6s7 2 9 6c-3 3-15 3-18 0Z" fill={sage} stroke={plum} strokeWidth="1.1" />
      <path d="M-8 -16h16" stroke={sage} strokeWidth="2.6" strokeLinecap="round" opacity=".9" />
      <path d="M-13 -31c-4 6-4 11-1 14M13 -31c4 6 4 11 1 14" stroke={sageDeep} strokeWidth="4.8" strokeLinecap="round" fill="none" />
      <circle cx="-14" cy="-15" r="2.6" fill={creamSoft} stroke={plum} strokeWidth=".9" />
      <circle cx="14" cy="-15" r="2.6" fill={creamSoft} stroke={plum} strokeWidth=".9" />
      <path d="M-3.5 -38h7v5h-7Z" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <circle cx="0" cy="-47" r="10.2" fill={creamSoft} stroke={plum} strokeWidth="1.9" />
      <ellipse cx="-10.2" cy="-46" rx="2" ry="3" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <ellipse cx="10.2" cy="-46" rx="2" ry="3" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <path d="M-10.2 -50c.5-7 4.6-11 10.2-11s9.7 4 10.2 11c-2-4-5.4-6-10.2-6s-8.2 2-10.2 6Z" fill={plum} />
      <path d="M-8 -34c-1 4-1 8 .3 11M8 -34c1 4 1 8-.3 11" stroke={plum} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-6.4 -47c1.3 1.4 3 1.4 4.3 0M2.1 -47c1.3 1.4 3 1.4 4.3 0" stroke={plum} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M-2.4 -41.4c1.4 1.5 3.8 1.5 5.2 0" stroke={roseDeep} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <ellipse cx="-7" cy="-43.8" rx="2.4" ry="1.4" fill={rose} opacity=".4" />
      <ellipse cx="7" cy="-43.8" rx="2.4" ry="1.4" fill={rose} opacity=".4" />
    </g>
  );
}

function ReelCard({ x = 0, y = 0, tone = sage, scale = 1 }: { x?: number; y?: number; tone?: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-19" y="-24" width="38" height="48" rx="6" fill={cream} stroke={plum} strokeWidth="1.2" />
      <rect x="-15.5" y="-20.5" width="31" height="30" rx="3.5" fill={tone} />
      <circle cx="0" cy="-5.5" r="6.4" fill={cream} opacity=".92" />
      <path d="M-1.6 -9l5 3.5-5 3.5Z" fill={roseDeep} />
      <path d="M-12 14h24M-12 19h15" stroke={plum} strokeWidth="1.3" strokeLinecap="round" opacity=".35" />
      <HeartShape x={11} y={15} s={0.42} color={roseDeep} />
    </g>
  );
}

function OfficeRoom() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="176" fill="#F7F0E9" />
      <rect x="0" y="0" width="320" height="176" fill={lavender} opacity=".14" />
      <rect x="0" y="0" width="320" height="7" fill={lavenderDeep} opacity=".55" />
      <rect x="0" y="148" width="320" height="62" fill={creamSoft} />
      <path d="M0 148h320M0 155h320" stroke={plum} strokeWidth="1" opacity=".1" />

      <g transform="translate(20 22)">
        <rect x="-2" y="-2" width="74" height="56" rx="4" fill={plum} opacity=".14" />
        <rect width="70" height="52" rx="3" fill={cream} stroke={plum} strokeWidth="1.5" />
        <rect x="4" y="4" width="62" height="44" rx="2" fill="#DCE9EA" />
        <path d="M35 4v44M4 26h62" stroke={cream} strokeWidth="2.6" />
        <path d="M10 40c7-9 15-9 22-1M12 20c5-7 12-7 18 0" stroke="#B9D2C4" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".7" />
      </g>

      <g transform="translate(214 18)">
        <rect width="84" height="30" rx="4" fill={plum} />
        <text x="42" y="14" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="11" fill={butter} letterSpacing="1">
          ALTRONIX
        </text>
        <text x="42" y="24" textAnchor="middle" fontSize="3.8" fill={cream} opacity=".72" letterSpacing="1.2">
          INTERVIEWS · TODAY
        </text>
      </g>

      <g transform="translate(266 58)">
        <rect x="-3" y="-3" width="48" height="92" rx="3" fill={plum} opacity=".15" />
        <rect width="42" height="86" rx="2" fill={cream} stroke={plum} strokeWidth="1.5" />
        <rect x="5" y="6" width="32" height="30" rx="2" fill={lavender} opacity=".7" />
        <circle cx="34" cy="48" r="1.8" fill={plum} />
        <path d="M5 70h32" stroke={plum} strokeWidth="1" opacity=".18" />
      </g>

      <SparkShape x={118} y={28} s={0.6} color={butter} />
      <SparkShape x={198} y={56} s={0.5} color={rose} />
    </g>
  );
}

function OfficeClock({ animated }: SceneProps) {
  const cx = 126;
  const cy = 44;
  return (
    <g>
      <circle cx={cx} cy={cy} r="13" fill={cream} stroke={plum} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="10.4" fill="none" stroke={plum} strokeWidth=".6" opacity=".22" />
      {[0, 90, 180, 270].map((deg) => (
        <path
          key={deg}
          d={`M${cx} ${cy - 11.3}v-1.4`}
          stroke={plum}
          strokeWidth=".9"
          strokeLinecap="round"
          opacity=".35"
          transform={`rotate(${deg} ${cx} ${cy})`}
        />
      ))}
      <motion.g
        initial={false}
        animate={animated ? { rotate: [0, 90] } : { rotate: 0 }}
        transition={animated ? { duration: 4.6, delay: 0.3, ease: EASE_SCENE } : undefined}
        style={{ transformBox: "view-box", transformOrigin: `${cx}px ${cy}px` }}
      >
        <path d={`M${cx} ${cy}V${cy - 9.6}`} stroke={plum} strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>
      <path d={`M${cx} ${cy}l5.6 2.4`} stroke={plumSoft} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="1.3" fill={plum} />
    </g>
  );
}

function OfficeDesk() {
  return (
    <g>
      <ellipse cx="160" cy="198" rx="96" ry="5" fill={plum} opacity=".09" />
      <rect x="52" y="156" width="216" height="11" rx="4" fill={cream} stroke={plum} strokeWidth="1.6" />
      <rect x="60" y="167" width="200" height="8" rx="3" fill={lavender} opacity=".55" />
      <rect x="72" y="175" width="8" height="26" rx="3" fill={bean} />
      <rect x="240" y="175" width="8" height="26" rx="3" fill={bean} />
    </g>
  );
}

function InterviewPaper({ animated, payoff = false }: SceneProps & { payoff?: boolean }) {
  const lines = [
    { y: 1, w: 18, delay: 2.3 },
    { y: 5.5, w: 13, delay: 2.6 },
    { y: 10, w: 16, delay: 2.9 },
  ];

  return (
    <g transform="translate(160 142)">
      <rect x="-27" y="-5" width="54" height="21" rx="2.5" fill={cream} stroke={plum} strokeWidth="1.1" transform="rotate(-3)" />
      <path d="M-17 -2h10" stroke={plum} strokeWidth="1.4" strokeLinecap="round" opacity=".5" transform="rotate(-3)" />

      {payoff || !animated ? (
        <g>
          <path d="M-9 4c1.3-2 3.2-3.2 5.2-2.6 2 .6 2.6 2.6 1.2 3.8-1.2 1-2.9.8-4.2-.4-1.2 1.4-3 2.2-4.2 1.2-1.5-1.2-.8-3.2 2-4Z" fill={rose} opacity=".85" />
          <SparkShape x={4} y={9} s={0.5} color={butter} />
          <text x="8" y="13" fontFamily="var(--font-caveat)" fontSize="6" fill={plumSoft} opacity=".75">
            0 questions
          </text>
        </g>
      ) : (
        lines.map((line) => (
          <motion.path
            key={line.y}
            d={`M-17 ${line.y + 3}h${line.w}`}
            stroke={plum}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity=".35"
            initial={false}
            animate={{ y: [0, 0, -22], opacity: [0.35, 0.35, 0] }}
            transition={{ duration: 1.4, times: [0, 0.45, 1], delay: line.delay, ease: "easeInOut" }}
          />
        ))
      )}

      <motion.g
        initial={false}
        animate={animated && !payoff ? { opacity: [0, 0, 1], scale: [0.6, 0.6, 1] } : { opacity: 1, scale: 1 }}
        transition={animated && !payoff ? { duration: 0.9, times: [0, 0.6, 1], delay: 3.3, ease: EASE_SCENE } : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <g transform="translate(17 -2) rotate(8)">
          <rect x="-13" y="-5" width="26" height="10" rx="2" fill={butter} stroke={plum} strokeWidth=".9" />
          <text x="0" y="2.4" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.6" fill={plum}>
            no questions!
          </text>
        </g>
      </motion.g>
    </g>
  );
}

function BeginningScene({ animated }: SceneProps) {
  if (!animated) {
    return (
      <g>
        <OfficeRoom />
        <OfficeClock animated={false} />
        <BoyCozy />
        <DivyaCozy />
        <OfficeDesk />
        <InterviewPaper animated={false} payoff />
        <Cup x={86} y={144} liquid={roseDeep} />
        <Cup x={234} y={144} liquid={roseDeep} />
        <Bubble x={80} y={102} w={46} fill={blush} text="tell me" tail="right" />
        <Bubble x={198} y={88} w={54} fill={lavender} text="everything" tail="left" />
        <HeartShape x={160} y={116} s={1.15} color={darkyellow} />
        <HeartShape x={170} y={108} s={0.7} color={yellow} />
        <SparkShape x={64} y={84} s={0.8} color={butter} />
        <SparkShape x={254} y={76} s={0.7} color={rose} />
      </g>
    );
  }

  return (
    <g>
      <ScenePhaseOut>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <OfficeRoom />
          <OfficeClock animated />
        </motion.g>

        <motion.g
          initial={{ x: 96, opacity: 0 }}
          animate={{ x: [96, 0, 0, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.3, times: [0, 0.2, 0.72, 1], ease: EASE_SCENE }}
        >
          <g transform="translate(222 178)">
            <motion.g
              animate={{ y: [0, -1.6, 0] }}
              transition={{ duration: 0.4, repeat: 5, ease: "easeInOut" }}
            >
              <DivyaStanding />
            </motion.g>
          </g>
        </motion.g>

        <BoyCozy />

        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 2.3 }}>
          <DivyaCozy />
        </motion.g>

        <OfficeDesk />
        <InterviewPaper animated />

        <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
          <Cup x={86} y={144} liquid={roseDeep} animated delay={0.4} />
          <Cup x={234} y={144} liquid={roseDeep} animated delay={1} />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, y: 6, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 4.1, ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <Bubble x={78} y={102} w={48} fill={blush} text="so… hi?" tail="right" />
        </motion.g>
        <motion.g
          initial={{ opacity: 0, y: 6, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 4.55, ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <Bubble x={196} y={88} w={56} fill={lavender} text="no questions." tail="left" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0.9], scale: [0.5, 1.12, 1] }}
          transition={{ duration: 0.7, delay: 4.7, ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <HeartShape x={160} y={116} s={1.2} color={yellow} />
        </motion.g>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.6] }}
          transition={{ duration: 1.2, delay: 4.4 }}
        >
          <SparkShape x={62} y={82} s={0.8} color={butter} />
          <SparkShape x={256} y={74} s={0.7} color={rose} />
        </motion.g>
      </ScenePhaseOut>

      <ScenePhaseIn>
        <OfficeRoom />
        <OfficeClock animated />
        <BoyCozy />
        <DivyaCozy />
        <OfficeDesk />
        <InterviewPaper animated payoff />
        <Cup x={86} y={144} liquid={roseDeep} animated delay={6.3} />
        <Cup x={234} y={144} liquid={roseDeep} animated delay={6.9} />
        <motion.g
          animate={{ y: [0, -1.2, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, delay: 6.3, ease: "easeInOut" }}
        >
          <Bubble x={78} y={102} w={50} fill={blush} text="tell me" tail="right" />
          <Bubble x={196} y={88} w={56} fill={lavender} text="everything" tail="left" />
        </motion.g>
        <motion.g
          animate={{ y: [0, -4, 0], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 4, repeat: Infinity, delay: 6.3, ease: "easeInOut" }}
        >
          <HeartShape x={160} y={116} s={1.2} color={yellow} />
          <HeartShape x={171} y={108} s={0.7} color={darkyellow} />
        </motion.g>
        <SparkShape x={62} y={82} s={0.8} color={butter} />
        <SparkShape x={256} y={74} s={0.7} color={rose} />
      </ScenePhaseIn>
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

function CafeRoom() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="180" fill="#FBEDE1" />
      <rect x="0" y="0" width="320" height="180" fill={peach} opacity=".2" />
      <rect x="0" y="146" width="320" height="64" fill="#F6E0CE" />
      <path d="M0 146h320" stroke={plum} strokeWidth="1.2" opacity=".14" />

      <g transform="translate(30 24)">
        <rect x="-3" y="-3" width="102" height="58" rx="6" fill={plum} opacity=".18" />
        <rect width="96" height="52" rx="5" fill={plum} />
        <text x="48" y="15" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="11" fill={butter}>
          today&apos;s menu
        </text>
        <path d="M14 22h68" stroke={cream} strokeWidth="1" opacity=".35" strokeLinecap="round" />
        <path d="M14 30h50M14 37h58M14 44h42" stroke={cream} strokeWidth="1.4" opacity=".5" strokeLinecap="round" />
        <HeartShape x={57} y={16} s={0.45} color={rose} />
      </g>

      <g transform="translate(244 34)">
        <rect width="58" height="44" rx="5" fill={cream} stroke={plum} strokeWidth="1.2" transform="rotate(2)" />
        <text x="29" y="13" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="8" fill={plum} transform="rotate(2)">
          the ratio
        </text>
        <rect x="8" y="19" width="42" height="6" rx="3" fill={plum} opacity=".12" />
        <rect x="8" y="19" width="30" height="6" rx="3" fill={rose} />
        <text x="8" y="35" fontSize="4.2" fill={plumSoft} transform="rotate(2)">
          talking 70%
        </text>
        <text x="50" y="35" textAnchor="end" fontSize="4.2" fill={plumSoft} opacity=".6" transform="rotate(2)">
          eating
        </text>
      </g>

      <g transform="translate(18 118)">
        <path d="M0 24V0" stroke={plum} strokeWidth="2" />
        <path d="M-7 0h14l-2 8h-10Z" fill={rose} stroke={plum} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M-3 8v16M3 8v16" stroke={sageDeep} strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="0" cy="26" rx="9" ry="3" fill={plum} opacity=".1" />
      </g>
      <g transform="translate(302 118)">
        <path d="M0 24V0" stroke={plum} strokeWidth="2" />
        <path d="M-7 0h14l-2 8h-10Z" fill={lavender} stroke={plum} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M-3 8v16M3 8v16" stroke={sageDeep} strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="0" cy="26" rx="9" ry="3" fill={plum} opacity=".1" />
      </g>

      <ellipse cx="160" cy="46" rx="58" ry="24" fill={butter} opacity=".22" />
      <SparkShape x={120} y={26} s={0.6} color={rose} />
      <SparkShape x={206} y={84} s={0.55} color={butter} />
    </g>
  );
}

function CafeTable() {
  return (
    <g>
      <ellipse cx="160" cy="198" rx="104" ry="6" fill={plum} opacity=".1" />
      <rect x="44" y="156" width="232" height="12" rx="6" fill={creamSoft} stroke={plum} strokeWidth="2" />
      <rect x="52" y="168" width="216" height="8" rx="3" fill={rose} opacity=".34" />
      <rect x="64" y="176" width="8" height="24" rx="3" fill={bean} />
      <rect x="248" y="176" width="8" height="24" rx="3" fill={bean} />
      <rect x="84" y="152" width="46" height="5" rx="2.4" fill={blush} opacity=".8" />
      <rect x="190" y="152" width="46" height="5" rx="2.4" fill={blush} opacity=".8" />
    </g>
  );
}

function Waiter() {
  return (
    <g>
      <ellipse cx="0" cy="2" rx="15" ry="2.8" fill={plum} opacity=".12" />
      <path d="M-5 -16l-3 16M5 -16l3 16" stroke={plum} strokeWidth="4.2" strokeLinecap="round" />
      <ellipse cx="-9" cy="1" rx="5.2" ry="2.2" fill={plumSoft} />
      <ellipse cx="9" cy="1" rx="5.2" ry="2.2" fill={plumSoft} />
      <path d="M-13 -14c-2-12 3-20 13-20s15 8 13 20c-1 5-6 7-13 7s-12-2-13-7Z" fill={cream} stroke={plum} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M-7 -16h14v16h-14Z" fill={roseDeep} opacity=".7" />
      <path d="M-5 -13h10" stroke={cream} strokeWidth="1.2" strokeLinecap="round" opacity=".85" />
      <path d="M-12 -12c-7 1-11 5-12 10" stroke={cream} strokeWidth="4.4" strokeLinecap="round" fill="none" />
      <path d="M-3 -13c7 0 11 3 13 7" stroke={cream} strokeWidth="4.2" strokeLinecap="round" fill="none" />
      <path d="M-26 -2h20" stroke={plum} strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="-16" cy="-2" rx="12" ry="3" fill={cream} stroke={plum} strokeWidth="1.1" />
      <ellipse cx="-21" cy="-4" rx="4.6" ry="1.5" fill={peach} stroke={plum} strokeWidth=".8" />
      <ellipse cx="-11" cy="-4" rx="4.6" ry="1.5" fill={butter} stroke={plum} strokeWidth=".8" />
      <path d="M-3.5 -38h7v5h-7Z" fill={creamSoft} stroke={plum} strokeWidth="1" />
      <circle cx="0" cy="-47" r="9.6" fill={creamSoft} stroke={plum} strokeWidth="1.8" />
      <path d="M-9.6 -50c.5-7 4.4-11 9.6-11s9.1 4 9.6 11c-2-4-5-6-9.6-6s-7.6 2-9.6 6Z" fill={bean} />
      <path d="M-4 -59c3-2 7-1 8.6 1.6" stroke={bean} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="-4" cy="-47" r="1.1" fill={plum} />
      <circle cx="4" cy="-47" r="1.1" fill={plum} />
      <path d="M-2 -42.8c1.4 1.5 3.8 1.5 5.2 0" stroke={roseDeep} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <ellipse cx="-6.4" cy="-45.4" rx="2.3" ry="1.4" fill={rose} opacity=".4" />
      <ellipse cx="6.4" cy="-45.4" rx="2.3" ry="1.4" fill={rose} opacity=".4" />
    </g>
  );
}

function PastaPlate({ animated, delay = 0 }: { animated: boolean; delay?: number }) {
  return (
    <g transform="translate(96 147)">
      <ellipse cx="0" cy="9" rx="25" ry="6" fill={cream} stroke={plum} strokeWidth="1.3" />
      <ellipse cx="0" cy="2" rx="17" ry="7" fill={peach} />
      <path d="M-12 1c4-5 20-5 24 0M-13 4c5 3 21 3 26 0" stroke={roseDeep} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M-8 -5l1-4M0 -6v-4M8 -5l-1-4" stroke={sageDeep} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="-5" cy="3" r="1.6" fill={roseDeep} />
      <circle cx="6" cy="1" r="1.5" fill={sageDeep} />
      <Steam x={0} y={-10} animated={animated} delay={delay} color={rose} width={1.5} />
    </g>
  );
}

function BurgerPlate({ animated, delay = 0 }: { animated: boolean; delay?: number }) {
  return (
    <g transform="translate(224 147)">
      <ellipse cx="0" cy="9" rx="25" ry="6" fill={cream} stroke={plum} strokeWidth="1.3" />
      <path d="M-15 2c0-6 5-10 15-10s15 4 15 10Z" fill={peach} stroke={plum} strokeWidth="1.3" />
      <path d="M-16 3h32v4c0 3-4 5-9 5h-14c-5 0-9-2-9-5Z" fill={butter} stroke={plum} strokeWidth="1.3" />
      <path d="M-14 1h28" stroke={sageDeep} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="-6" cy="-2" r="1.1" fill={cream} />
      <circle cx="2" cy="-4" r="1.1" fill={cream} />
      <circle cx="9" cy="-1" r="1.1" fill={cream} />
      <Steam x={0} y={-14} animated={animated} delay={delay} color={rose} width={1.5} />
    </g>
  );
}

function Fries({ animated, delay = 0.6 }: { animated: boolean; delay?: number }) {
  return (
    <g transform="translate(160 156)">
      <path d="M-8 0l2-13h12l2 13Z" fill={kfcRed} stroke={plum} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M-3 -13l.5-6M0 -13v-7M3 -13l-.5-6" stroke={butter} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M-4.4 -6h8.8" stroke={cream} strokeWidth="1.6" opacity=".9" />
      <Steam x={0} y={-18} animated={animated} delay={delay} color={rose} width={1.2} />
    </g>
  );
}

function FoodScene({ animated }: SceneProps) {
  const still = (
    <g>
      <CafeRoom />
      <BoyCozy />
      <DivyaCozy />
      <CafeTable />
    </g>
  );

  if (!animated) {
    return (
      <g>
        {still}
        <PastaPlate animated={false} />
        <BurgerPlate animated={false} />
        <Fries animated={false} />
        <Cup x={90} y={144} liquid={roseDeep} />
        <Cup x={230} y={144} liquid={roseDeep} />
        <Bubble x={62} y={100} w={50} fill={blush} text="so then…" tail="right" />
        <Bubble x={206} y={86} w={52} fill={lavender} text="wait what?" tail="left" />
        <HeartShape x={160} y={112} s={1.1} color={darkyellow} />
        <SparkShape x={66} y={74} s={0.8} color={butter} />
        <SparkShape x={258} y={112} s={0.65} color={rose} />
      </g>
    );
  }

  return (
    <g>
      <ScenePhaseOut>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {still}
        </motion.g>

        <motion.g
          initial={{ x: -110, opacity: 0 }}
          animate={{ x: [-110, 0, 0, -120], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.4, times: [0, 0.24, 0.7, 1], ease: EASE_SCENE }}
        >
          <g transform="translate(58 178)">
            <motion.g animate={{ y: [0, -1.4, 0] }} transition={{ duration: 0.5, repeat: 7, ease: "easeInOut" }}>
              <Waiter />
            </motion.g>
          </g>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, y: -22, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 1.4, ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <PastaPlate animated delay={0.2} />
        </motion.g>
        <motion.g
          initial={{ opacity: 0, y: -22, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 1.8, ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <BurgerPlate animated delay={0.5} />
        </motion.g>
        <motion.g
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.1, ease: EASE_SCENE }}
        >
          <Fries animated />
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
          <Cup x={90} y={144} liquid={roseDeep} animated />
        </motion.g>
        <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
          <Cup x={230} y={144} liquid={roseDeep} animated delay={0.6} />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, y: 6, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 3.2, ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <Bubble x={60} y={100} w={54} fill={blush} text="so then…" tail="right" />
        </motion.g>
        <motion.g
          initial={{ opacity: 0, y: 6, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 3.7, ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <Bubble x={206} y={86} w={54} fill={lavender} text="wait, what?" tail="left" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0.9], scale: [0.5, 1.12, 1] }}
          transition={{ duration: 0.7, delay: 4.3, ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <HeartShape x={160} y={112} s={1.15} color={yellow} />
        </motion.g>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.6] }}
          transition={{ duration: 1.2, delay: 4.3 }}
        >
          <SparkShape x={64} y={74} s={0.8} color={butter} />
          <SparkShape x={258} y={112} s={0.65} color={rose} />
        </motion.g>
      </ScenePhaseOut>

      <ScenePhaseIn>
        <CafeRoom />
        <BoyCozy />
        <DivyaCozy />
        <CafeTable />
        <PastaPlate animated delay={6.3} />
        <BurgerPlate animated delay={6.6} />
        <Fries animated delay={6.3} />
        <Cup x={90} y={144} liquid={roseDeep} animated delay={6.3} />
        <Cup x={230} y={144} liquid={roseDeep} animated delay={6.9} />
        <motion.g
          animate={{ y: [0, -1.2, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, delay: 6.3, ease: "easeInOut" }}
        >
          <Bubble x={60} y={100} w={54} fill={blush} text="so then…" tail="right" />
          <Bubble x={204} y={86} w={56} fill={lavender} text="tell me more" tail="left" />
        </motion.g>
        <motion.g
          animate={{ y: [0, -4, 0], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3.8, repeat: Infinity, delay: 6.3, ease: "easeInOut" }}
        >
          <HeartShape x={160} y={112} s={1.15} color={yellow} />
          <HeartShape x={171} y={104} s={0.68} color={darkyellow} />
        </motion.g>
        <SparkShape x={64} y={74} s={0.8} color={butter} />
        <SparkShape x={258} y={112} s={0.65} color={rose} />
      </ScenePhaseIn>
    </g>
  );
}

function PhoneFrame() {
  return (
    <g>
      <ellipse cx="160" cy="200" rx="58" ry="6" fill={plum} opacity=".14" />
      <rect x="108" y="16" width="104" height="178" rx="18" fill={plum} />
      <rect x="115" y="28" width="90" height="150" rx="10" fill={creamSoft} />
      <rect x="144" y="22" width="32" height="5" rx="2.5" fill={plumSoft} />
      <circle cx="160" cy="183" r="3" fill={cream} opacity=".55" />
    </g>
  );
}

function ChatHeader({ night = false }: { night?: boolean }) {
  return (
    <g>
      <circle cx="124" cy="40" r="5.4" fill={bean} />
      <circle cx="124" cy="41" r="4" fill={creamSoft} />
      <path d="M119.6 38.6c.6-2.6 8.2-2.6 8.8 0-1.4-1.4-3-2-4.4-2s-3 .6-4.4 2Z" fill={bean} />
      <text x="133" y="42" fontFamily="var(--font-caveat)" fontSize="7.4" fill={plum}>
        divya
      </text>
      <text x="133" y="48" fontSize="3.5" fill={night ? roseDeep : sageDeep} letterSpacing=".4">
        {night ? "still online" : "online"}
      </text>
      <text x="196" y="43" textAnchor="end" fontSize="4.2" fill={plumSoft} opacity=".7">
        {night ? "1:47 AM" : "9:12 AM"}
      </text>
      <path d="M115 53h90" stroke={plum} strokeWidth=".8" opacity=".14" />
    </g>
  );
}

function PhoneDayScreen({ animated }: SceneProps) {
  const beat = (delay: number) =>
    animated
      ? {
          initial: { opacity: 0, y: 6, scale: 0.86 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.4, delay, ease: EASE_SCENE },
        }
      : {};

  return (
    <g>
      <ChatHeader />
      <motion.g {...beat(0.5)}>
        <Bubble x={120} y={58} w={26} h={13} fill={blush} text="hi" tail="left" fontSize={7} />
      </motion.g>
      <motion.g
        initial={animated ? { opacity: 0 } : false}
        animate={animated ? { opacity: [0, 0.8, 0.8, 0] } : { opacity: 0.7 }}
        transition={animated ? { duration: 2.2, times: [0, 0.2, 0.75, 1], delay: 1.3 } : undefined}
      >
        {[0, 1, 2].map((dot) => (
          <motion.circle
            key={`day-dot-${dot}`}
            cx={124 + dot * 5}
            cy="82"
            r="1.6"
            fill={plumSoft}
            animate={animated ? { opacity: [0.25, 1, 0.25] } : { opacity: 0.6 }}
            transition={animated ? { duration: 0.9, repeat: Infinity, delay: dot * 0.14 } : undefined}
          />
        ))}
      </motion.g>
      <motion.g {...beat(2.4)}>
        <Bubble x={170} y={70} w={30} h={13} fill={blush} text="heyy" tail="right" fontSize={7} />
      </motion.g>
      <motion.g {...beat(3.2)}>
        <Bubble x={120} y={90} w={58} h={14} fill={lavender} text="u free today?" tail="left" fontSize={7} />
      </motion.g>
      <motion.g {...beat(4)}>
        <Bubble x={172} y={110} w={28} h={13} fill={blush} text="always" tail="right" fontSize={6.6} />
      </motion.g>
      <motion.g {...beat(4.7)}>
        <Bubble x={120} y={124} w={34} h={13} fill={butter} text="coffee?" tail="left" fontSize={6.6} />
      </motion.g>
      <motion.g
        initial={animated ? { opacity: 0, scale: 0.4, rotate: -10 } : false}
        animate={animated ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 1, scale: 1, rotate: 0 }}
        transition={animated ? { duration: 0.45, delay: 4.9, ease: EASE_SCENE } : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <g transform="translate(186 140)">
          <circle r="9" fill={blush} stroke={plum} strokeWidth="1.1" />
          <HeartShape x={0} y={-0.5} s={0.62} color={roseDeep} />
        </g>
      </motion.g>
      <g>
        <rect x="119" y="156" width="74" height="12" rx="6" fill={cream} stroke={plum} strokeWidth=".8" />
        <text x="126" y="164" fontFamily="var(--font-caveat)" fontSize="6.4" fill={plumSoft} opacity=".55">
          type a message…
        </text>
      </g>
    </g>
  );
}

function PhoneNightScreen({ animated }: SceneProps) {
  const beat = (delay: number) =>
    animated
      ? {
          initial: { opacity: 0, y: 6, scale: 0.86 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.45, delay, ease: EASE_SCENE },
        }
      : {};

  return (
    <g>
      <ChatHeader night />
      <motion.g {...beat(6.4)}>
        <Bubble x={120} y={58} w={34} h={13} fill={lavender} text="u up?" tail="left" fontSize={6.8} />
      </motion.g>
      <motion.g {...beat(6.85)}>
        <Bubble x={168} y={76} w={32} h={13} fill={blush} text="always" tail="right" fontSize={6.6} />
      </motion.g>
      <motion.g {...beat(7.3)}>
        <Bubble x={120} y={94} w={64} h={24} fill={lavender} tail="left" />
      </motion.g>
      <motion.g {...beat(7.75)}>
        <Bubble x={164} y={124} w={36} h={20} fill={blush} tail="right" />
      </motion.g>
      <motion.g
        initial={animated ? { opacity: 0, scale: 0.4, rotate: -12 } : false}
        animate={animated ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 1, scale: 1, rotate: 0 }}
        transition={animated ? { duration: 0.5, delay: 8.1, ease: EASE_SCENE } : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <g transform="translate(132 148)">
          <circle r="9.5" fill={butter} stroke={plum} strokeWidth="1.1" />
          <HeartShape x={0} y={-0.5} s={0.68} color={roseDeep} />
          <SparkShape x={8} y={-8} s={0.4} color={cream} />
        </g>
      </motion.g>
      <motion.g
        initial={animated ? { opacity: 0 } : false}
        animate={animated ? { opacity: [0, 0.75, 0.75, 0] } : { opacity: 0.7 }}
        transition={animated ? { duration: 1.6, times: [0, 0.2, 0.75, 1], delay: 8.2 } : undefined}
      >
        {[0, 1, 2].map((dot) => (
          <motion.circle
            key={`night-dot-${dot}`}
            cx={154 + dot * 5}
            cy="150"
            r="1.6"
            fill={plumSoft}
            animate={animated ? { opacity: [0.25, 1, 0.25] } : { opacity: 0.6 }}
            transition={animated ? { duration: 0.9, repeat: Infinity, delay: dot * 0.14 } : undefined}
          />
        ))}
      </motion.g>
      <motion.g
        initial={animated ? { opacity: 0, y: 4 } : false}
        animate={animated ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={animated ? { duration: 0.35, delay: 8.05, ease: EASE_SCENE } : undefined}
      >
        <rect x="119" y="156" width="74" height="12" rx="6" fill={butter} opacity=".7" />
        <text x="156" y="164" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="6.6" fill={plum}>
          still here.
        </text>
      </motion.g>
    </g>
  );
}

const nightStars = [
  { x: 58, y: 44, s: 0.8, delay: 0 },
  { x: 96, y: 78, s: 0.55, delay: 1.1 },
  { x: 220, y: 24, s: 0.6, delay: 1.8 },
  { x: 274, y: 118, s: 0.75, delay: 0.6 },
  { x: 42, y: 92, s: 0.5, delay: 2.2 },
];

function DayBackdrop() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="210" fill="#FFF1DC" />
      <circle cx="248" cy="52" r="28" fill={butter} opacity=".9" />
      <circle cx="248" cy="52" r="38" fill={butter} opacity=".22" />
      <circle cx="52" cy="142" r="42" fill={peach} opacity=".4" />
      <path d="M28 66c8-8 22-8 30 0 7-6 17-5 23 2" stroke={cream} strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8" />
      <path d="M236 148c6-6 16-6 22 0" stroke={cream} strokeWidth="2.6" strokeLinecap="round" fill="none" opacity=".6" />
      <SparkShape x={74} y={48} s={0.7} color={rose} />
    </g>
  );
}

function NightBackdrop({ animated }: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="320" height="210" fill="#E9E3F7" />
      <circle cx="248" cy="52" r="22" fill={cream} />
      <circle cx="242" cy="46" r="4.4" fill={lavenderDeep} opacity=".45" />
      <circle cx="254" cy="58" r="3" fill={lavenderDeep} opacity=".4" />
      <circle cx="52" cy="142" r="42" fill={lavenderDeep} opacity=".28" />
      {nightStars.map((star) =>
        animated ? (
          <motion.g
            key={`${star.x}-${star.y}`}
            initial={false}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          >
            <SparkShape x={star.x} y={star.y} s={star.s} color={cream} />
          </motion.g>
        ) : (
          <g key={`${star.x}-${star.y}`} opacity=".65">
            <SparkShape x={star.x} y={star.y} s={star.s} color={cream} />
          </g>
        ),
      )}
    </g>
  );
}

function ConversationsScene({ animated }: SceneProps) {
  if (!animated) {
    return (
      <g>
        <NightBackdrop animated={false} />
        <PhoneFrame />
        <PhoneNightScreen animated={false} />
        <HeartShape x={246} y={130} s={1.25} color={darkyellow} />
        <HeartShape x={236} y={146} s={0.72} color={yellow} />
        <HeartShape x={74} y={110} s={0.95} color={yellow} />
        <SparkShape x={62} y={70} s={0.75} color={butter} />
        <SparkShape x={270} y={168} s={0.65} color={cream} />
      </g>
    );
  }

  return (
    <g>
      <ScenePhaseOut>
        <DayBackdrop />
      </ScenePhaseOut>
      <ScenePhaseIn>
        <NightBackdrop animated />
      </ScenePhaseIn>

      <PhoneFrame />

      <ScenePhaseOut>
        <PhoneDayScreen animated />
      </ScenePhaseOut>
      <ScenePhaseIn>
        <PhoneNightScreen animated />
      </ScenePhaseIn>

      <motion.g
        initial={false}
        animate={{ y: [0, -6, 0], opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <HeartShape x={246} y={130} s={1.25} color={darkyellow} />
        <HeartShape x={236} y={146} s={0.72} color={yellow} />
      </motion.g>
      <motion.g
        initial={false}
        animate={{ y: [0, -4, 0], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <HeartShape x={74} y={110} s={0.95} color={yellow} />
      </motion.g>

      <SparkShape x={62} y={70} s={0.75} color={butter} />
      <SparkShape x={270} y={168} s={0.65} color={cream} />
    </g>
  );
}

function DepartmentRoom() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="210" fill="#EEF3E9" />
      <rect x="0" y="0" width="320" height="10" fill={sageDeep} opacity=".5" />
      <rect x="0" y="184" width="320" height="26" fill="#E2EADB" />
      <path d="M0 184h320" stroke={plum} strokeWidth="1" opacity=".14" />

      <g transform="translate(88 8)">
        <rect width="144" height="32" rx="5" fill={plum} />
        <text x="72" y="17" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="11.5" fill={butter} letterSpacing=".6">
          reel department
        </text>
        <text x="72" y="26.5" textAnchor="middle" fontSize="3.8" fill={cream} opacity=".72" letterSpacing="1.2">
          QUALITY · APPROVED · SENT
        </text>
        <HeartShape x={132} y={11} s={0.42} color={rose} />
      </g>

      <g transform="translate(12 82)">
        <rect width="52" height="42" rx="3" fill={cream} stroke={plum} strokeWidth="1.2" />
        <path d="M8 34h36" stroke={plum} strokeWidth="1.2" opacity=".25" />
        <rect x="8" y="10" width="15" height="18" rx="2" fill={sage} stroke={plum} strokeWidth=".9" />
        <rect x="27" y="10" width="15" height="18" rx="2" fill={peach} stroke={plum} strokeWidth=".9" />
        <circle cx="15.5" cy="19" r="2.4" fill={cream} opacity=".85" />
        <circle cx="34.5" cy="19" r="2.4" fill={cream} opacity=".85" />
        <path d="M8 16h34" stroke={plum} strokeWidth=".8" opacity=".18" />
      </g>

      <g transform="translate(26 42) rotate(-5)">
        <rect width="48" height="26" rx="2" fill={butter} stroke={plum} strokeWidth="1" />
        <text x="24" y="12" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="7.4" fill={plum}>
          reel ideas
        </text>
        <path d="M10 17h28M10 21h18" stroke={plum} strokeWidth="1" opacity=".3" strokeLinecap="round" />
      </g>

      <g transform="translate(292 150) rotate(8)">
        <rect x="-10" y="-14" width="20" height="14" rx="2" fill={cream} stroke={plum} strokeWidth="1" />
        <path d="M-5 -7h10M-5 -3h6" stroke={plum} strokeWidth=".9" opacity=".3" strokeLinecap="round" />
      </g>

      <SparkShape x={68} y={134} s={0.55} color={butter} />
      <SparkShape x={286} y={40} s={0.5} color={rose} />
    </g>
  );
}

function Conveyor({ animated }: SceneProps) {
  const slats = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <g>
      <ellipse cx="160" cy="202" rx="140" ry="5" fill={plum} opacity=".1" />
      <rect x="10" y="166" width="300" height="12" rx="5" fill={plumSoft} stroke={plum} strokeWidth="1.4" />
      <motion.g
        initial={false}
        animate={animated ? { x: [0, 24] } : { x: 0 }}
        transition={animated ? { duration: 1.4, repeat: Infinity, ease: "linear" } : undefined}
      >
        {slats.map((i) => (
          <rect key={i} x={-16 + i * 24} y="168" width="12" height="8" rx="2" fill={butter} opacity=".85" />
        ))}
      </motion.g>
      {[34, 72, 110, 148, 186, 224, 262, 296].map((x) => (
        <g key={x}>
          <circle cx={x} cy="176" r="4.4" fill={plum} stroke={plumSoft} strokeWidth="1" />
          <circle cx={x} cy="176" r="1.5" fill={cream} />
        </g>
      ))}
      <rect x="26" y="178" width="8" height="22" rx="3" fill={bean} />
      <rect x="286" y="178" width="8" height="22" rx="3" fill={bean} />
    </g>
  );
}

function StampPress({ animated }: SceneProps) {
  return (
    <g transform="translate(154 0)">
      <rect x="-2.5" y="104" width="5" height="62" rx="2" fill={plumSoft} />
      <motion.g
        initial={false}
        animate={animated ? { y: [0, 0, 20, 0] } : { y: 0 }}
        transition={animated ? { duration: 1.2, times: [0, 0.3, 0.48, 0.72], delay: 3, ease: EASE_SCENE } : undefined}
      >
        <rect x="-18" y="84" width="36" height="18" rx="3" fill={plum} />
        <rect x="-11" y="101" width="22" height="5" rx="2" fill={rose} />
        <text x="0" y="96" textAnchor="middle" fontSize="6" fill={butter} letterSpacing=".4">
          Q.C.
        </text>
      </motion.g>
      <motion.g
        initial={false}
        animate={animated ? { opacity: [0, 0, 1, 1] } : { opacity: 0 }}
        transition={animated ? { duration: 1.2, times: [0, 0.7, 0.85, 1], delay: 3 } : undefined}
      >
        <SparkShape x={-22} y={132} s={0.55} color={butter} />
        <SparkShape x={22} y={130} s={0.45} color={rose} />
      </motion.g>
    </g>
  );
}

function DeliveryScreen({ lit, animated }: { lit: boolean; animated: boolean }) {
  return (
    <g transform="translate(242 52)">
      <text x="30" y="-6" textAnchor="middle" fontSize="3.6" fill={plumSoft} letterSpacing="1" opacity=".75">
        DELIVERIES
      </text>
      <rect x="-3" y="-3" width="66" height="48" rx="6" fill={plum} />
      <rect x="2" y="2" width="56" height="38" rx="4" fill={lit ? creamSoft : cream} />
      {lit ? (
        <motion.g
          initial={animated ? { opacity: 0, scale: 0.7 } : false}
          animate={animated ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={animated ? { duration: 0.5, delay: 6.4, ease: EASE_SCENE } : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <ReelCard x={22} y={21} scale={0.44} tone={rose} />
          <HeartShape x={44} y={13} s={0.5} color={roseDeep} />
          <path d="M36 31l2.6 2.6 5.4-5.4" stroke={sageDeep} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="46" y="36" textAnchor="end" fontFamily="var(--font-caveat)" fontSize="5.4" fill={plumSoft}>
            sent
          </text>
        </motion.g>
      ) : (
        <g>
          <ReelCard x={22} y={21} scale={0.4} tone={sage} />
          <text x="44" y="34" textAnchor="end" fontSize="4" fill={plumSoft} opacity=".55">
            waiting
          </text>
        </g>
      )}
    </g>
  );
}

function ReelsScene({ animated }: SceneProps) {
  const still = (
    <g>
      <DepartmentRoom />
      <g transform="translate(54 184) scale(0.86)">
        <DivyaStanding />
      </g>
      <g transform="translate(270 184) scale(0.86)">
        <BoyStanding />
      </g>
      <Conveyor animated={animated} />
      <StampPress animated={animated} />
    </g>
  );

  if (!animated) {
    return (
      <g>
        {still}
        <DeliveryScreen lit animated={false} />
        <g transform="translate(152 144)">
          <ReelCard tone={rose} />
          <g transform="translate(0 -4) rotate(-6)">
            <rect x="-19" y="-6" width="38" height="12" rx="3" fill={butter} stroke={plum} strokeWidth=".9" />
            <text x="0" y="2" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.6" fill={plum}>
              approved
            </text>
          </g>
        </g>
        <HeartShape x={100} y={104} s={0.9} color={darkyellow} />
        <HeartShape x={214} y={92} s={0.7} color={yellow} />
        <SparkShape x={80} y={72} s={0.7} color={butter} />
        <SparkShape x={230} y={136} s={0.6} color={rose} />
      </g>
    );
  }

  return (
    <g>
      <ScenePhaseOut>
        {still}
        <DeliveryScreen lit={false} animated />

        <motion.g
          initial={{ x: 10, y: 144, scale: 0.9, opacity: 0 }}
          animate={{
            x: [10, 10, 154, 154, 274, 274, 274],
            y: [144, 144, 144, 144, 76, 76, 76],
            scale: [0.9, 0.9, 0.9, 0.9, 0.52, 0.52, 0.52],
            opacity: [0, 1, 1, 1, 1, 0.4, 0],
          }}
          transition={{ duration: 5.4, times: [0, 0.06, 0.22, 0.7, 0.88, 0.96, 1], ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <ReelCard tone={rose} />
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 3.75, ease: EASE_SCENE }}
          >
            <g transform="translate(0 -2) rotate(-6)">
              <rect x="-19" y="-6" width="38" height="12" rx="3" fill={butter} stroke={plum} strokeWidth=".9" />
              <text x="0" y="2" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.6" fill={plum}>
                approved
              </text>
            </g>
          </motion.g>
        </motion.g>
      </ScenePhaseOut>

      <ScenePhaseIn>
        <DepartmentRoom />
        <g transform="translate(54 184) scale(0.86)">
          <motion.g
            animate={{ y: [0, -2.4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 6.3, ease: "easeInOut" }}
          >
            <DivyaStanding />
          </motion.g>
        </g>
        <g transform="translate(270 184) scale(0.86)">
          <motion.g
            animate={{ y: [0, -2.4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 6.6, ease: "easeInOut" }}
          >
            <BoyStanding />
          </motion.g>
        </g>
        <Conveyor animated />
        <StampPress animated={false} />
        <DeliveryScreen lit animated />
        <motion.g
          animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.8, repeat: Infinity, delay: 6.3, ease: "easeInOut" }}
        >
          <HeartShape x={98} y={102} s={0.95} color={darkyellow} />
          <HeartShape x={216} y={88} s={0.75} color={yellow} />
          <HeartShape x={160} y={100} s={0.6} color={darkyellow} />
        </motion.g>
        <g transform="translate(54 110)">
          <rect x="-24" y="-8" width="48" height="12" rx="3" fill={butter} stroke={plum} strokeWidth=".9" transform="rotate(-4)" />
          <text x="0" y="0.4" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="6" fill={plum} transform="rotate(-4)">
            head of reels
          </text>
        </g>
        <SparkShape x={76} y={70} s={0.7} color={butter} />
        <SparkShape x={232} y={136} s={0.6} color={rose} />
      </ScenePhaseIn>
    </g>
  );
}

function ParkBackground() {
  return (
    <g>
      <rect x="0" y="0" width="320" height="210" fill="#F3F1E2" />
      <rect x="0" y="0" width="320" height="210" fill={sage} opacity=".14" />
      <circle cx="54" cy="46" r="24" fill={butter} opacity=".9" />
      <circle cx="54" cy="46" r="34" fill={butter} opacity=".2" />
      <path d="M0 158c40-16 74-14 110-4 40 11 80 12 120 2 34-8 64-8 90 2v52H0Z" fill={sageDeep} opacity=".32" />
      <path d="M0 172c46-10 82-8 118 0 44 10 84 10 124 1 30-7 56-7 78 0v37H0Z" fill={sage} opacity=".4" />
      <rect x="0" y="184" width="320" height="26" fill="#DCE7D2" />
      <path d="M0 184h320" stroke={plum} strokeWidth="1" opacity=".12" />
      <path d="M16 194h30M60 200h22M244 194h26M282 201h18" stroke={sageDeep} strokeWidth="1.6" strokeLinecap="round" opacity=".45" />
    </g>
  );
}

function ParkTree({ animated }: SceneProps) {
  return (
    <g>
      <path d="M264 188c-3-28-2-52 3-74" stroke={bean} strokeWidth="8" strokeLinecap="round" />
      <path d="M264 138c6-8 14-12 22-13M263 152c-7-7-14-9-21-9" stroke={bean} strokeWidth="4.4" strokeLinecap="round" fill="none" />
      <circle cx="262" cy="82" r="32" fill={sageDeep} opacity=".92" />
      <circle cx="290" cy="102" r="23" fill={sage} />
      <circle cx="234" cy="104" r="24" fill={sage} />
      <circle cx="270" cy="118" r="19" fill={sageDeep} opacity=".85" />
      <circle cx="250" cy="72" r="16" fill="#B7C9A8" opacity=".7" />
      <path d="M244 150c8 4 16 4 24 0" stroke={plum} strokeWidth="1.2" opacity=".14" fill="none" />
      {[
        { x: 238, y: 128, delay: 0 },
        { x: 292, y: 120, delay: 1.4 },
        { x: 258, y: 94, delay: 2.6 },
      ].map((leaf) => (
        <motion.g
          key={`${leaf.x}-${leaf.y}`}
          initial={false}
          animate={animated ? { y: [0, 6, 0], rotate: [0, 12, 0], opacity: [0.5, 0.9, 0.5] } : { y: 0, rotate: 0, opacity: 0.65 }}
          transition={animated ? { duration: 4.4, repeat: Infinity, delay: leaf.delay, ease: "easeInOut" } : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <ellipse cx={leaf.x} cy={leaf.y} rx="3.4" ry="1.8" fill={sageDeep} transform={`rotate(-24 ${leaf.x} ${leaf.y})`} />
        </motion.g>
      ))}
    </g>
  );
}

function BenchBack() {
  return (
    <g>
      <rect x="112" y="128" width="96" height="6" rx="3" fill={bean} />
      <rect x="112" y="138" width="96" height="6" rx="3" fill={bean} opacity=".9" />
      <rect x="114" y="148" width="92" height="6" rx="3" fill={bean} opacity=".8" />
      <rect x="116" y="128" width="6" height="30" fill={bean} />
      <rect x="198" y="128" width="6" height="30" fill={bean} />
      <rect x="116" y="154" width="4" height="34" fill={bean} />
      <rect x="200" y="154" width="4" height="34" fill={bean} />
    </g>
  );
}

function BenchSeat() {
  return (
    <g>
      <ellipse cx="160" cy="192" rx="62" ry="4.4" fill={plum} opacity=".1" />
      <rect x="106" y="156" width="108" height="9" rx="4" fill={creamSoft} stroke={plum} strokeWidth="1.4" />
      <rect x="110" y="165" width="100" height="4" rx="2" fill={bean} opacity=".55" />
      <rect x="114" y="169" width="5" height="20" fill={bean} />
      <rect x="201" y="169" width="5" height="20" fill={bean} />
    </g>
  );
}

function UnexpectedNote({ animated, delay = 0.5 }: SceneProps & { delay?: number }) {
  return (
    <motion.g
      initial={animated ? { opacity: 0, y: -8, rotate: -10 } : false}
      animate={animated ? { opacity: 1, y: [0, -2, 0], rotate: [-6, -3, -6] } : { opacity: 1, y: 0, rotate: -6 }}
      transition={animated ? { duration: 5, repeat: Infinity, ease: "easeInOut", delay } : undefined}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      <g transform="translate(52 88)">
        <rect x="-21" y="-13" width="42" height="26" rx="2" fill={butter} stroke={plum} strokeWidth="1.1" />
        <text x="0" y="-2" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="7.4" fill={plum}>
          no plans
        </text>
        <text x="0" y="8" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="6.4" fill={plumSoft}>
          today :)
        </text>
        <rect x="-7" y="-16" width="14" height="5" fill={cream} opacity=".7" transform="rotate(-4)" />
      </g>
    </motion.g>
  );
}

function UnexpectedScene({ animated }: SceneProps) {
  const leftPath = "M8 188C58 182 76 156 124 160S152 164 160 164";
  const rightPath = "M312 188C262 184 244 156 196 160S168 164 160 164";

  const couple = (
    <g>
      <g transform="translate(-10 0)">
        <BoyCozy />
      </g>
      <g transform="translate(8 0)">
        <DivyaCozy />
      </g>
    </g>
  );

  if (!animated) {
    return (
      <g>
        <ParkBackground />
        <ParkTree animated={false} />
        <BenchBack />
        <path d={leftPath} stroke={rose} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 7" fill="none" />
        <path d={rightPath} stroke={lavenderDeep} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 7" fill="none" />
        <path d="M160 164c0-14 2-24 6-34" stroke={roseDeep} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="2 7" fill="none" />
        {couple}
        <BenchSeat />
        <Cup x={160} y={148} liquid={roseDeep} scale={0.72} />
        <HeartShape x={160} y={112} s={1.2} color={darkyellow} />
        <HeartShape x={171} y={104} s={0.7} color={yellow} />
        <UnexpectedNote animated={false} />
        <SparkShape x={116} y={94} s={0.75} color={butter} />
        <SparkShape x={214} y={124} s={0.6} color={rose} />
      </g>
    );
  }

  return (
    <g>
      <ScenePhaseOut>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <ParkBackground />
          <ParkTree animated />
          <BenchBack />
        </motion.g>

        <motion.path
          d={leftPath}
          stroke={rose}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="2 7"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.2, ease: EASE_SCENE }}
        />
        <motion.path
          d={rightPath}
          stroke={lavenderDeep}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="2 7"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.2, ease: EASE_SCENE }}
        />

        <motion.g
          initial={{ x: -82, opacity: 0 }}
          animate={{ x: [-82, 0], opacity: [0, 1] }}
          transition={{ duration: 2.4, delay: 0.3, ease: EASE_SCENE }}
        >
          <g transform="translate(100 188) scale(0.82)">
            <motion.g animate={{ y: [0, -1.8, 0] }} transition={{ duration: 0.5, repeat: 5, ease: "easeInOut" }}>
              <DivyaStanding />
            </motion.g>
          </g>
        </motion.g>
        <motion.g
          initial={{ x: 82, opacity: 0 }}
          animate={{ x: [82, 0], opacity: [0, 1] }}
          transition={{ duration: 2.4, delay: 0.3, ease: EASE_SCENE }}
        >
          <g transform="translate(220 188) scale(0.82)">
            <motion.g
              animate={{ y: [0, -1.8, 0] }}
              transition={{ duration: 0.5, repeat: 5, delay: 0.18, ease: "easeInOut" }}
            >
              <BoyStanding />
            </motion.g>
          </g>
        </motion.g>

        <BenchSeat />
        <UnexpectedNote animated />

        <motion.g
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0, 1, 1], scale: [0.4, 0.4, 1.2, 1] }}
          transition={{ duration: 1.3, times: [0, 0.6, 0.82, 1], delay: 2.8, ease: EASE_SCENE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <HeartShape x={160} y={150} s={1.05} color={yellow} />
          <SparkShape x={160} y={150} s={1.2} color={butter} />
        </motion.g>
      </ScenePhaseOut>

      <ScenePhaseIn>
        <ParkBackground />
        <ParkTree animated />
        <BenchBack />
        <path d={leftPath} stroke={rose} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 7" fill="none" opacity=".8" />
        <path d={rightPath} stroke={lavenderDeep} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 7" fill="none" opacity=".8" />
        <path d="M160 164c0-14 2-24 6-34" stroke={roseDeep} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="2 7" fill="none" />
        <motion.g
          animate={{ y: [0, -1.2, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, delay: 6.3, ease: "easeInOut" }}
        >
          {couple}
        </motion.g>
        <BenchSeat />
        <Cup x={160} y={148} liquid={roseDeep} scale={0.72} animated delay={6.3} />
        <UnexpectedNote animated delay={6.3} />
        <motion.g
          animate={{ y: [0, -4, 0], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3.8, repeat: Infinity, delay: 6.3, ease: "easeInOut" }}
        >
          <HeartShape x={160} y={112} s={1.2} color={yellow} />
          <HeartShape x={171} y={104} s={0.7} color={darkyellow} />
        </motion.g>
        <SparkShape x={116} y={94} s={0.75} color={butter} />
        <SparkShape x={214} y={124} s={0.6} color={rose} />
      </ScenePhaseIn>
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
      <motion.g
        initial={false}
        animate={
          animated
            ? {
                x: [0, 1.2, 0, -0.8, 0],
                y: [0, -0.7, 0, 0.5, 0],
                scale: [1, 1.006, 1.01, 1.004, 1],
              }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={
          animated
            ? { duration: 12, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        style={{ transformBox: "view-box", transformOrigin: "160px 105px" }}
      >
        {kind === "beginning" ? <BeginningScene animated={animated} /> : null}
        {kind === "sleep" ? <SleepScene animated={animated} /> : null}
        {kind === "food" ? <FoodScene animated={animated} /> : null}
        {kind === "conversations" ? <ConversationsScene animated={animated} /> : null}
        {kind === "reels" ? <ReelsScene animated={animated} /> : null}
        {kind === "unexpected" ? <UnexpectedScene animated={animated} /> : null}
      </motion.g>
      {animated ? (
        <motion.rect
          x="-80"
          y="-20"
          width="70"
          height="250"
          rx="35"
          fill="url(#memory-light-sweep)"
          opacity={0}
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 390, opacity: [0, 0.12, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          pointerEvents="none"
        />
      ) : null}
      <defs>
        <linearGradient id="memory-light-sweep" x1="0" x2="1">
          <stop offset="0" stopColor="#FFF9F0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFF0B8" stopOpacity="0.8" />
          <stop offset="1" stopColor="#FFF9F0" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
