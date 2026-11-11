"use client";

import { motion } from "motion/react";
import {
  Flower,
  LeafSprig,
  Star4,
  TinyFlower,
} from "@/components/common/Illustrations";
import { EASE_ENTER } from "@/animations/motion";
import { cn } from "@/lib/utils";

type GateArtProps = {
  bloom: boolean;
  opening: boolean;
  reduced: boolean;
};

const archBlooms = [
  { left: 6, top: 39.5, size: 21, petal: "#F3C9DC", center: "#FFF0B8", delay: 0 },
  { left: 13, top: 30.5, size: 16, petal: "#DCD5F5", center: "#FFF9F0", delay: 0.07 },
  { left: 24, top: 23.5, size: 18, petal: "#FFDCCB", center: "#C98EA8", delay: 0.13 },
  { left: 38, top: 19, size: 17, petal: "#DCD5F5", center: "#FFF9F0", delay: 0.18 },
  { left: 50, top: 17.5, size: 21, petal: "#F3C9DC", center: "#FFF0B8", delay: 0.23 },
  { left: 62, top: 19, size: 17, petal: "#FFDCCB", center: "#C98EA8", delay: 0.28 },
  { left: 76, top: 23.5, size: 18, petal: "#F3C9DC", center: "#FFF9F0", delay: 0.33 },
  { left: 87, top: 30.5, size: 16, petal: "#DCD5F5", center: "#FFF0B8", delay: 0.38 },
  { left: 94, top: 39.5, size: 21, petal: "#FFF0B8", center: "#C98EA8", delay: 0.42 },
  { left: 2, top: 58, size: 17, petal: "#DCD5F5", center: "#FFF0B8", delay: 0.24 },
  { left: 98, top: 58, size: 18, petal: "#F3C9DC", center: "#FFF9F0", delay: 0.3 },
  { left: 4, top: 86, size: 27, petal: "#F3C9DC", center: "#FFF0B8", delay: 0.34 },
  { left: 96, top: 87, size: 25, petal: "#DCD5F5", center: "#FFF0B8", delay: 0.4 },
];

const doorBlooms = {
  left: [
    { left: 22, top: 71, size: 18 },
    { left: 74, top: 41, size: 13 },
  ],
  right: [
    { left: 78, top: 71, size: 18 },
    { left: 26, top: 41, size: 13 },
  ],
};

function DoorLeaf({ side }: { side: "left" | "right" }) {
  const handle = side === "left" ? 108 : 12;
  return (
    <svg
      viewBox="0 0 120 340"
      preserveAspectRatio="none"
      aria-hidden
      className="h-full w-full drop-shadow-[0_14px_20px_rgba(47,31,46,0.32)]"
    >
      <g fill="none" stroke="url(#dl-gate-iron)" strokeLinecap="round">
        <rect x="4" y="4" width="112" height="332" rx="5" strokeWidth="6" />
        <path
          d="M22 12v318M44 12v318M66 12v318M88 12v318M106 12v318"
          strokeWidth="3.2"
        />
        <path d="M8 96h104M8 198h104M8 306h104" strokeWidth="3" />
        <path
          d="M22 96c0 24 16 28 16 46s-16 22-16 46"
          strokeWidth="2"
          opacity=".7"
        />
        <path
          d="M106 96c0 24-16 28-16 46s16 22 16 46"
          strokeWidth="2"
          opacity=".7"
        />
        <path
          d="M22 198c14 9 26 9 40 0M106 198c-14 9-26 9-40 0"
          strokeWidth="2"
          opacity=".6"
        />
      </g>
      <g fill="url(#dl-gate-iron)">
        {[22, 44, 66, 88, 106].map((x) => (
          <circle key={x} cx={x} cy="18" r="2.6" />
        ))}
      </g>
      <path
        d="M22 12v318M44 12v318M66 12v318M88 12v318M106 12v318"
        stroke="#FFE7BC"
        strokeOpacity=".18"
        strokeWidth="1"
        transform="translate(-1 0)"
      />
      <g stroke="#D9B879" strokeWidth="2.2" fill="none" opacity=".9">
        <circle cx={handle} cy="200" r="6.5" />
        <circle cx={handle} cy="200" r="1.6" fill="#D9B879" />
      </g>
    </svg>
  );
}

export function GateArt({ bloom, opening, reduced }: GateArtProps) {
  const transition = reduced
    ? { duration: 0.01 }
    : { duration: 2.4, ease: EASE_ENTER };

  return (
    <div className={cn("relative h-full w-full", opening && "gate-open")}>
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <linearGradient id="dl-gate-stone" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F0E3D2" />
            <stop offset=".45" stopColor="#E1CEBB" />
            <stop offset="1" stopColor="#CBB2A0" />
          </linearGradient>
          <linearGradient id="dl-gate-stone-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F7EDE0" />
            <stop offset="1" stopColor="#DFC9B7" />
          </linearGradient>
          <linearGradient id="dl-gate-iron" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#715877" />
            <stop offset=".42" stopColor="#443250" />
            <stop offset=".7" stopColor="#5D4564" />
            <stop offset="1" stopColor="#35263E" />
          </linearGradient>
          <linearGradient id="dl-gate-portal" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#FFE7B6" />
            <stop offset=".45" stopColor="#FFD9A2" />
            <stop offset="1" stopColor="#F4C3B4" />
          </linearGradient>
          <radialGradient id="dl-gate-sun" cx=".5" cy=".64" r=".58">
            <stop offset="0" stopColor="#FFFCEB" stopOpacity=".95" />
            <stop offset=".5" stopColor="#FFE8AF" stopOpacity=".55" />
            <stop offset="1" stopColor="#FFE8AF" stopOpacity="0" />
          </radialGradient>
          <clipPath id="dl-gate-opening">
            <path d="M80 638V300a120 120 0 0 1 240 0v338Z" />
          </clipPath>
          <clipPath id="dl-gate-fan">
            <path d="M80 300a120 120 0 0 1 240 0Z" />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        aria-hidden
        initial={false}
        animate={{
          opacity: bloom ? (opening ? 1 : 0.9) : 0.42,
          scale: bloom ? (opening ? 1.5 : 1.08) : 0.9,
        }}
        transition={transition}
        className="absolute left-1/2 top-[44%] z-0 h-[132%] w-[190%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,240,187,.88), rgba(255,214,170,.42) 46%, transparent 74%)",
        }}
      />

      <svg
        viewBox="0 0 400 640"
        aria-hidden
        className="absolute inset-0 z-[1] h-full w-full overflow-visible"
      >
        <g clipPath="url(#dl-gate-opening)">
          <rect x="80" y="180" width="240" height="460" fill="url(#dl-gate-portal)" />
          <rect x="80" y="180" width="240" height="460" fill="url(#dl-gate-sun)" />
          <path
            d="M80 566c44-24 76 8 112-8 34-15 62-34 96-20 24 10 30 26 32 28v72H80Z"
            fill="#EFC3A2"
            opacity=".5"
          />
          <g fill="#E3B094" opacity=".42">
            {[
              [112, 566, 20],
              [286, 558, 26],
              [318, 578, 18],
              [96, 590, 15],
            ].map(([x, y, r], index) => (
              <g key={index} transform={`translate(${x} ${y})`}>
                <rect x="-2" y="0" width="4" height={r * 1.4} />
                <circle cx="0" cy="-6" r={r} />
              </g>
            ))}
          </g>
          <path
            d="M200 638c-20-58-12-110 0-146 12 36 20 88 0 146Z"
            fill="#FFF6DE"
            opacity=".62"
          />
          <ellipse cx="200" cy="632" rx="58" ry="12" fill="#FFF1CF" opacity=".55" />
        </g>

        <g clipPath="url(#dl-gate-fan)" opacity=".92">
          <g
            fill="none"
            stroke="url(#dl-gate-iron)"
            strokeWidth="3.1"
            strokeLinecap="round"
          >
            <path d="M200 300V180" />
            {[180, 210, 240, 270, 300, 330, 360].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <path
                  key={angle}
                  d={`M200 300 L${(200 + Math.cos(rad) * 120).toFixed(1)} ${(
                    300 +
                    Math.sin(rad) * 120
                  ).toFixed(1)}`}
                />
              );
            })}
            <circle cx="200" cy="300" r="42" />
            <circle cx="200" cy="300" r="82" opacity=".7" />
            <circle cx="200" cy="282" r="6" fill="#D9B879" stroke="none" />
          </g>
        </g>

        <path
          d="M80 638V300a120 120 0 0 1 240 0v338"
          fill="none"
          stroke="#5B3F52"
          strokeOpacity=".3"
          strokeWidth="2.4"
        />
      </svg>

      <div
        aria-hidden
        className={cn("gate-rays absolute inset-0 z-[3]", bloom && "is-bloomed")}
      />

      <div className="absolute bottom-[0.4%] left-[20.8%] right-[20.8%] top-[46.9%] z-[10] [perspective:1300px]">
        <div
          aria-hidden
          className={cn(
            "gate-door gate-door-left absolute inset-y-0 left-0 w-1/2",
            opening && "is-open",
          )}
        >
          <DoorLeaf side="left" />
          {doorBlooms.left.map((spot, index) => (
            <span
              key={index}
              className="absolute z-10 block"
              style={{
                left: `${spot.left}%`,
                top: `${spot.top}%`,
                width: spot.size,
                height: spot.size,
                marginLeft: -spot.size / 2,
                marginTop: -spot.size / 2,
              }}
            >
              <motion.span
                initial={false}
                animate={bloom ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{ duration: reduced ? 0.01 : 0.9, delay: 0.2 + index * 0.12, ease: EASE_ENTER }}
                className="block h-full w-full"
              >
                <Flower
                  className="h-full w-full garden-sway"
                  style={{
                    ["--flower-petal" as string]: index ? "#DCD5F5" : "#F3C9DC",
                    ["--flower-center" as string]: "#FFF0B8",
                  }}
                />
              </motion.span>
            </span>
          ))}
        </div>

        <div
          aria-hidden
          className={cn(
            "gate-door gate-door-right absolute inset-y-0 right-0 w-1/2",
            opening && "is-open",
          )}
        >
          <DoorLeaf side="right" />
          {doorBlooms.right.map((spot, index) => (
            <span
              key={index}
              className="absolute z-10 block"
              style={{
                left: `${spot.left}%`,
                top: `${spot.top}%`,
                width: spot.size,
                height: spot.size,
                marginLeft: -spot.size / 2,
                marginTop: -spot.size / 2,
              }}
            >
              <motion.span
                initial={false}
                animate={bloom ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{ duration: reduced ? 0.01 : 0.9, delay: 0.26 + index * 0.12, ease: EASE_ENTER }}
                className="block h-full w-full"
              >
                <Flower
                  className="h-full w-full garden-sway"
                  style={{
                    ["--flower-petal" as string]: index ? "#F3C9DC" : "#DCD5F5",
                    ["--flower-center" as string]: "#FFF9F0",
                  }}
                />
              </motion.span>
            </span>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[12] bg-[radial-gradient(ellipse_at_50%_62%,rgba(255,249,232,.28),transparent_62%)]"
      />

      <svg
        viewBox="0 0 400 640"
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[20] h-full w-full overflow-visible drop-shadow-[0_22px_26px_rgba(47,31,46,0.32)]"
      >
        <path
          d="M18 300h64v340H18ZM318 300h64v340h-64Z"
          fill="url(#dl-gate-stone)"
        />
        <path
          d="M18 300A182 182 0 0 1 382 300L320 300A120 120 0 0 0 80 300Z"
          fill="url(#dl-gate-stone)"
        />
        <path
          d="M12 288h72v14H12ZM316 288h72v14h-72Z"
          fill="url(#dl-gate-stone-light)"
        />
        <path
          d="M10 620h380v20H10ZM22 606h52v16H22ZM326 606h52v16h-52Z"
          fill="url(#dl-gate-stone-light)"
        />
        <path
          d="M186 112l14-8 14 8-4 46h-20Z"
          fill="url(#dl-gate-stone-light)"
          stroke="#B99E8C"
          strokeOpacity=".4"
          strokeWidth="1"
        />
        <path
          d="M200 78l6 16-6 15-6-15Z"
          fill="#D8B275"
          stroke="#B07C5B"
          strokeOpacity=".5"
          strokeWidth="1"
        />
        <circle cx="200" cy="72" r="4" fill="none" stroke="#B07C5B" strokeOpacity=".55" strokeWidth="1.4" />

        <g stroke="#9C7A6A" strokeOpacity=".28" strokeWidth="1">
          <path d="M18 360h64M18 424h64M18 488h64M18 552h64M318 360h64M318 424h64M318 488h64M318 552h64" />
          <path d="M50 300v60M50 424v64M50 552v88M350 300v60M350 424v64M350 552v88" />
          <path d="M71 171 115 215M329 171 285 215" />
        </g>

        <path
          d="M80 300a120 120 0 0 1 240 0v338"
          fill="none"
          stroke="#4A3148"
          strokeOpacity=".34"
          strokeWidth="4"
        />
        <path
          d="M18 300A182 182 0 0 1 382 300"
          fill="none"
          stroke="#FFF9EC"
          strokeOpacity=".45"
          strokeWidth="1.6"
        />
        <path
          d="M18 596c22-14 34-4 64-14v58H18ZM382 596c-22-14-34-4-64-14v58h64Z"
          fill="#8FA083"
          opacity=".32"
        />
        <g fill="#7E8F72" opacity=".4">
          {[34, 62, 338, 366].map((x, index) => (
            <path
              key={x}
              d={`M${x} 632c-6-18 4-30 ${index % 2 ? 8 : -6}-42`}
              stroke="#7E8F72"
              strokeWidth="1.4"
              fill="none"
            />
          ))}
        </g>
      </svg>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-[30]">
        <motion.span
          initial={false}
          animate={bloom ? { opacity: 0.9 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0.01 : 1.2 }}
          className="absolute left-[3%] top-[46%] block h-16 w-16 origin-bottom -rotate-12"
        >
          <LeafSprig className="h-full w-full text-[#7E8F72]/70 garden-sway" />
        </motion.span>
        <motion.span
          initial={false}
          animate={bloom ? { opacity: 0.85 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0.01 : 1.2, delay: 0.15 }}
          className="absolute right-[3%] top-[43%] block h-20 w-20 origin-bottom rotate-12"
        >
          <LeafSprig
            className="h-full w-full text-[#6F8267]/70 garden-sway"
            style={{ animationDelay: "-2.2s" }}
          />
        </motion.span>

        {archBlooms.map((spot, index) => (
          <span
            key={`${spot.left}-${index}`}
            className="absolute block"
            style={{
              left: `${spot.left}%`,
              top: `${spot.top}%`,
              width: spot.size,
              height: spot.size,
              marginLeft: -spot.size / 2,
              marginTop: -spot.size / 2,
            }}
          >
            <motion.span
              initial={false}
              animate={bloom ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.15 }}
              transition={{
                duration: reduced ? 0.01 : 1,
                delay: reduced ? 0 : spot.delay,
                ease: EASE_ENTER,
              }}
              className="block h-full w-full"
            >
              <Flower
                className="h-full w-full garden-sway"
                style={{
                  ["--flower-petal" as string]: spot.petal,
                  ["--flower-center" as string]: spot.center,
                  animationDelay: `${-index * 0.5}s`,
                }}
              />
            </motion.span>
          </span>
        ))}

        <TinyFlower
          className="absolute left-[9%] top-[52%] h-4 w-4 text-rose/60 garden-sway"
          style={{ animationDelay: "-1.4s" }}
        />
        <TinyFlower className="absolute right-[9%] top-[66%] h-5 w-5 text-lavender-deep/65 garden-sway" />
        <Star4 className="absolute left-[46%] top-[3%] h-3 w-3 text-butter garden-twinkle" />
      </div>
    </div>
  );
}
