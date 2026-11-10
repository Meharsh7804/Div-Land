"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const outerColors = ["#F6DCE7", "#DCD5F5", "#FFDCCB", "#FFF0B8"];
const middleColors = ["#FFDCCB", "#F6DCE7", "#FFF0B8", "#DCD5F5"];
const innerColors = ["#C98EA8", "#FFF0B8", "#DCD5F5", "#FFDCCB"];

const origin = {
  transformBox: "fill-box" as const,
  transformOrigin: "center" as const,
};

export function RangoliArt({
  className,
  revealed = true,
}: {
  className?: string;
  revealed?: boolean;
}) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 600 600"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="A large rangoli centrepiece with layered petals, dots and a glowing centre"
    >
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF6D8" stopOpacity=".95" />
          <stop offset="44%" stopColor="#FFF0B8" stopOpacity=".5" />
          <stop offset="100%" stopColor="#FFF0B8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="300" cy="300" r="292" fill="none" stroke="#F6DCE7" strokeWidth=".8" strokeDasharray="2 9" opacity=".45" />
      <circle cx="300" cy="300" r="266" fill="none" stroke="#FFF0B8" strokeWidth=".9" opacity=".25" />
      <circle cx="300" cy="300" r="210" fill={`url(#${uid}-glow)`} className="rangoli-breathe" />

      <motion.g
        initial={false}
        animate={revealed ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.64, rotate: -14 }}
        transition={{ duration: 1.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={origin}
      >
        <g className="rangoli-turn">
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
        </g>
      </motion.g>

      <motion.g
        initial={false}
        animate={revealed ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.42, rotate: 12 }}
        transition={{ duration: 1.45, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
        style={origin}
      >
        <g className="rangoli-turn-reverse">
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
        </g>
      </motion.g>

      <motion.g
        initial={false}
        animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
        transition={{ duration: 1.2, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
        style={origin}
      >
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
      </motion.g>

      <motion.g
        initial={false}
        animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.12 }}
        transition={{ duration: 1.05, delay: 0.94, ease: [0.16, 1, 0.3, 1] }}
        style={origin}
      >
        <circle cx="300" cy="300" r="38" fill="#C98EA8" stroke="#FFF9F0" strokeWidth="2" />
        <circle cx="300" cy="300" r="24" fill="#FFF0B8" />
        <circle cx="300" cy="300" r="10" fill="#B0708C" />
        <circle cx="300" cy="300" r="3.4" fill="#FFF9F0" />
      </motion.g>

      <motion.g
        initial={false}
        animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
        transition={{ duration: 1.3, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={origin}
      >
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
      </motion.g>

      <motion.g
        initial={false}
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 1.1 }}
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 20 + Math.PI / 20;
          const x = Number((300 + Math.cos(angle) * 285).toFixed(2));
          const y = Number((300 + Math.sin(angle) * 285).toFixed(2));
          return (
            <circle key={`smalldot-${i}`} cx={x} cy={y} r="1.7" fill="#FFF9F0" opacity=".7" />
          );
        })}
      </motion.g>

      <circle cx="300" cy="300" r="228" fill="none" stroke="#FFF0B8" strokeWidth="1" opacity=".18" />
      <circle cx="300" cy="300" r="150" fill="none" stroke="#F6DCE7" strokeWidth="1" strokeDasharray="3 10" opacity=".4" />
    </svg>
  );
}

export function PetalStudyArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={cn("h-full w-full", className)} aria-hidden>
      <rect width="400" height="400" fill="#2B1F2C" />
      <circle cx="200" cy="200" r="184" fill="#372636" />
      {Array.from({ length: 14 }).map((_, i) => (
        <g key={i} transform={`translate(200 200) rotate(${(360 / 14) * i})`}>
          <path
            d="M0 -22 C 40 -58, 42 -126, 0 -168 C -42 -126, -40 -58, 0 -22 Z"
            fill={i % 3 === 0 ? "#F6DCE7" : i % 3 === 1 ? "#FFDCCB" : "#FFF0B8"}
            opacity={i % 2 ? 0.88 : 0.7}
          />
          <path d="M0 -42 C 12 -74, 12 -128, 0 -148" fill="none" stroke="#FFF9F0" strokeWidth="2" strokeLinecap="round" opacity=".65" />
          <circle cx="0" cy="-20" r="5" fill="#C98EA8" />
        </g>
      ))}
      <circle cx="200" cy="200" r="54" fill="#C98EA8" />
      <circle cx="200" cy="200" r="34" fill="#FFF0B8" />
      <circle cx="200" cy="200" r="14" fill="#B0708C" />
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 24;
        return (
          <circle
            key={`d-${i}`}
            cx={Number((200 + Math.cos(angle) * 172).toFixed(1))}
            cy={Number((200 + Math.sin(angle) * 172).toFixed(1))}
            r={i % 4 === 0 ? 4 : 2.2}
            fill={i % 2 ? "#F6DCE7" : "#FFF0B8"}
            opacity=".9"
          />
        );
      })}
      <circle cx="200" cy="200" r="190" fill="none" stroke="#C98EA8" strokeWidth="1" strokeDasharray="2 8" opacity=".5" />
    </svg>
  );
}

export function CircleStudyArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={cn("h-full w-full", className)} aria-hidden>
      <rect width="400" height="400" fill="#2B1F2C" />
      <circle cx="200" cy="200" r="184" fill="#352435" />
      {[174, 154, 134, 114, 94, 74, 54, 34].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke={i % 2 ? "#F6DCE7" : "#FFF0B8"}
          strokeWidth={i % 2 ? 1.4 : 2.2}
          strokeDasharray={i % 3 === 0 ? "2 10" : undefined}
          opacity={0.28 + i * 0.075}
        />
      ))}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 16;
        const x = Number((200 + Math.cos(angle) * 154).toFixed(1));
        const y = Number((200 + Math.sin(angle) * 154).toFixed(1));
        return (
          <g key={`p-${i}`} transform={`translate(${x} ${y}) rotate(${(360 / 16) * i})`}>
            <path d="M0 -8 C 14 -18, 14 -36, 0 -48 C -14 -36, -14 -18, 0 -8 Z" fill={i % 2 ? "#FFDCCB" : "#DCD5F5"} opacity=".88" />
            <circle cx="0" cy="-50" r="3" fill="#FFF0B8" />
          </g>
        );
      })}
      <circle cx="200" cy="200" r="22" fill="#C98EA8" />
      <circle cx="200" cy="200" r="11" fill="#FFF0B8" />
      <circle cx="200" cy="200" r="4" fill="#493348" />
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 32;
        return (
          <circle
            key={`dot-${i}`}
            cx={Number((200 + Math.cos(angle) * 178).toFixed(1))}
            cy={Number((200 + Math.sin(angle) * 178).toFixed(1))}
            r={i % 4 === 0 ? 3.6 : 1.8}
            fill={i % 3 ? "#FFF0B8" : "#F6DCE7"}
            opacity=".85"
          />
        );
      })}
    </svg>
  );
}

export type MiniArtKind = "rangoli" | "detail" | "rhythm";

export function MiniArt({ kind }: { kind: MiniArtKind }) {
  if (kind === "detail") {
    return <PetalStudyArt />;
  }
  if (kind === "rhythm") {
    return <CircleStudyArt />;
  }
  return <RangoliArt />;
}
