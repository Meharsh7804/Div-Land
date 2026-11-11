"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StorybookHeading } from "@/components/common/StorybookHeading";
import { CatSticker } from "@/components/cats/CatSticker";
import { useAudioExperience } from "@/components/audio/AudioProvider";
import { useChapterGate } from "@/components/journey/JourneyProvider";
import {
  Cloud,
  CoffeeCup,
  Flower,
  Heart,
  LeafSprig,
  Sparkle,
  Star4,
} from "@/components/common/Illustrations";
import { cafe, type DrinkId, type MenuItem } from "@/data/cafe";
import { chapterInstructions } from "@/data/journey";
import { EASE_SCENE } from "@/animations/motion";
import { cn, makeBag } from "@/lib/utils";

type Stage = "idle" | "grinding" | "brewing" | "done";

const stageCopy: Record<Stage, string> = {
  idle: cafe.machine.idle,
  grinding: cafe.machine.grinding,
  brewing: cafe.machine.brewing,
  done: cafe.machine.brewAgain,
};

const bulbSpots = [
  { x: 32, y: 20, color: "#FFF0B8" },
  { x: 120, y: 40, color: "#F6DCE7" },
  { x: 210, y: 51, color: "#FFF0B8" },
  { x: 300, y: 44, color: "#DCD5F5" },
  { x: 390, y: 31, color: "#FFF0B8" },
  { x: 480, y: 25, color: "#F6DCE7" },
  { x: 570, y: 30, color: "#FFF0B8" },
  { x: 660, y: 38, color: "#DCD5F5" },
  { x: 750, y: 38, color: "#FFF0B8" },
  { x: 840, y: 30, color: "#F6DCE7" },
  { x: 895, y: 22, color: "#FFF0B8" },
];

function DrinkCup({ id, className }: { id: DrinkId; className?: string }) {
  const item = cafe.menu.find((drink) => drink.id === id) ?? cafe.menu[0];

  return (
    <svg viewBox="0 0 80 88" fill="none" aria-hidden className={className}>
      <ellipse cx="40" cy="80" rx="27" ry="5" fill="#493348" opacity=".12" />

      {id === "cappuccino" ? (
        <g>
          <path d="M15 34h42l-4 34a7 7 0 0 1-7 6H26a7 7 0 0 1-7-6l-4-34Z" fill="#FFF9F0" stroke="#493348" strokeWidth="2" />
          <path d="M57 40h5a8 8 0 0 1 0 16h-8" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="36" cy="35" rx="21" ry="6" fill={item.foam} stroke="#493348" strokeWidth="1.6" />
          <path d="M36 39c-5-4-9-5.5-9-8.6 0-2 1.6-3.6 3.6-3.6 1.2 0 2.2.5 2.9 1.5.7-1 1.7-1.5 2.9-1.5 2 0 3.6 1.6 3.6 3.6 0 3.1-4 4.6-9 8.6Z" fill="#C98EA8" opacity=".8" />
          <path d="M28 22c-2-3 2-4 0-7M42 21c-2-3 2-4 0-7" stroke="#C98EA8" strokeWidth="1.8" strokeLinecap="round" className="cafe-steam" />
          <path d="M19 74h38" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : null}

      {id === "cold-coffee" ? (
        <g>
          <path d="M26 22h28l-4 54H30l-4-54Z" fill="#FFF9F0" stroke="#493348" strokeWidth="2" />
          <path d="M29 32h22l-3 42H32l-3-42Z" fill={item.liquid} opacity=".9" />
          <rect x="34" y="44" width="8" height="8" rx="2" fill="#FFF9F0" opacity=".45" transform="rotate(-12 38 48)" />
          <rect x="46" y="55" width="7" height="7" rx="2" fill="#FFF9F0" opacity=".35" transform="rotate(14 49 58)" />
          <path d="M32 22h16l-3-12H35l-3 12Z" fill={item.foam} stroke="#493348" strokeWidth="1.4" />
          <path d="M35 10c-2-3 2-4 0-7M44 10c-2-3 2-4 0-7" stroke="#B0708C" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M50 8 44 70" stroke="#8EA5DA" strokeWidth="4" strokeLinecap="round" />
          <circle cx="48" cy="17" r="2" fill="#FFF9F0" opacity=".7" />
        </g>
      ) : null}

      {id === "latte" ? (
        <g>
          <path d="M18 30h44l-5 38a7 7 0 0 1-7 6H30a7 7 0 0 1-7-6l-5-38Z" fill="#FFF9F0" stroke="#493348" strokeWidth="2" opacity=".9" />
          <path d="M22 38h36l-4.5 29a4 4 0 0 1-4 3.5H30.5a4 4 0 0 1-4-3.5L22 38Z" fill={item.liquid} opacity=".85" />
          <path d="M22 38h36l-1.5 9H23.5L22 38Z" fill={item.foam} />
          <path d="M40 41c-4 3-7 4-7 8 0 3 3 5 7 2 4 3 7 1 7-2 0-4-3-5-7-8Z" fill="#FFF9F0" opacity=".8" />
          <path d="M62 37h4a8 8 0 0 1 0 16h-6" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 21c-2-3 2-4 0-7M53 21c-2-3 2-4 0-7" stroke="#C98EA8" strokeWidth="1.8" strokeLinecap="round" className="cafe-steam" />
          <path d="M22 74h36" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : null}

      {id === "mocha" ? (
        <g>
          <path d="M16 35h44l-4 33a7 7 0 0 1-7 6H27a7 7 0 0 1-7-6l-4-33Z" fill="#FFF9F0" stroke="#493348" strokeWidth="2" />
          <path d="M20 43h36l-3.5 25a4 4 0 0 1-4 3H28.5a4 4 0 0 1-4-3L20 43Z" fill={item.liquid} />
          <path d="M58 41h5a8 8 0 0 1 0 15h-8" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
          <path d="M25 35c0-7 8-8 8-14 4 6 3 10 0 14M35 35c0-8 9-10 10-17 4 7 3 12-1 17M47 35c1-6 7-7 7-12 4 6 2 10-1 12" fill={item.foam} stroke="#493348" strokeWidth="1.2" />
          <path d="M29 31c5 3 10 3 15 1M38 29c4 2 8 2 11 1" stroke="#6B4432" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="30" y="31" width="6" height="4" rx="2" fill="#FFF9F0" />
          <rect x="42" y="30" width="6" height="4" rx="2" fill="#F6DCE7" />
          <path d="M22 74h38" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : null}

      {id === "special" ? (
        <g>
          <path d="M22 28h36l-5 42a7 7 0 0 1-7 6H34a7 7 0 0 1-7-6l-5-42Z" fill="#FFF9F0" stroke="#493348" strokeWidth="2" />
          <path d="M25 36h30l-4 32a4 4 0 0 1-4 3H33a4 4 0 0 1-4-3l-4-32Z" fill="#E9C08E" opacity=".75" />
          <path d="M25 36h30l-1.5 10H26.5L25 36Z" fill={item.foam} />
          <path d="M22 28h36" stroke="#B0708C" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M36 26c0-5 5-6 6-12 4 7 2 10-1 12M45 26c1-4 5-5 6-9 3 4 2 8-1 9" fill="#FFF9F0" stroke="#493348" strokeWidth="1.2" />
          <circle cx="44" cy="17" r="3.4" fill="#C98EA8" />
          <path d="M44 13c1-3 3-4 5-4" stroke="#6F8267" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M50 8 30 66" stroke="#F6DCE7" strokeWidth="3.4" strokeLinecap="round" />
          <g fill="#FFF0B8">
            <path d="M32 49l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1 1-2.6Z" />
            <path d="M48 56l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
          </g>
          <path d="M22 74h36" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : null}
    </svg>
  );
}

function StringLights() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 90"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-16 w-full sm:h-20"
    >
      <path
        d="M0 14Q225 70 450 22T900 18"
        stroke="#8A6A53"
        strokeWidth="1.2"
        fill="none"
        opacity=".45"
      />
      {bulbSpots.map((bulb, index) => (
        <g key={index}>
          <line x1={bulb.x} y1={bulb.y - 2} x2={bulb.x} y2={bulb.y + 4} stroke="#8A6A53" strokeWidth="1" opacity=".55" />
          <circle
            cx={bulb.x}
            cy={bulb.y + 6}
            r="4"
            fill={bulb.color}
            className="garden-twinkle"
            style={{ animationDelay: `${(index % 5) * 0.4}s` }}
          />
          <circle cx={bulb.x} cy={bulb.y + 6} r="9" fill={bulb.color} opacity=".16" />
        </g>
      ))}
    </svg>
  );
}

function CafeWindow() {
  return (
    <div aria-hidden className="absolute left-[4%] top-[8%] z-[1] w-[40%] sm:w-[30%]">
      <div className="relative aspect-[4/3.4] overflow-hidden rounded-t-[4.5rem] border-[6px] border-[#C9A27E] bg-[linear-gradient(180deg,#FFE7C5,#FFD0A5_55%,#F4C3AE)] shadow-[inset_0_0_30px_rgba(73,51,72,.16),0_18px_36px_-26px_rgba(73,51,72,.62)]">
        <span className="absolute right-[15%] top-[15%] h-8 w-8 rounded-full bg-butter shadow-[0_0_28px_12px_rgba(255,240,184,.65)] sm:h-10 sm:w-10" />
        <Cloud className="absolute left-[8%] top-[22%] h-5 w-12 text-white/70 sm:h-7 sm:w-16" />

        <svg viewBox="0 0 200 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[42%] w-full">
          <path d="M0 70c30-22 54 4 80-6 26-10 42-24 62-16 22 9 34 24 58 12v60H0V70Z" fill="#C7D3BD" opacity=".8" />
          <path d="M0 92c28-12 48 6 76-2 30-8 48-14 70-6 20 8 32 10 54 2v34H0V92Z" fill="#AFC29F" opacity=".8" />
          <path d="M0 108c26-6 50 2 76-2 30-4 48-6 70-2 18 3 34 2 54-2v18H0v-12Z" fill="#8FA083" opacity=".65" />
        </svg>

        <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-[#C9A27E]/65" />
        <span className="absolute inset-x-0 top-[47%] h-[3px] bg-[#C9A27E]/65" />
        <span className="absolute left-[8%] top-[8%] h-8 w-5 -rotate-[18deg] rounded-full bg-white/35 blur-sm" />
      </div>

      <span className="absolute -left-2 -top-1 h-[112%] w-[23%] rounded-b-[1.4rem] bg-[linear-gradient(90deg,#E8B9C8,#F9E1E9)] shadow-[inset_-6px_0_12px_rgba(73,51,72,.13)]" />
      <span className="absolute -right-2 -top-1 h-[112%] w-[23%] rounded-b-[1.4rem] bg-[linear-gradient(90deg,#F9E1E9,#E8B9C8)] shadow-[inset_6px_0_12px_rgba(73,51,72,.13)]" />
      <span className="absolute -left-3 -top-2 h-4 w-[112%] rounded-b-full bg-[linear-gradient(180deg,#E8B9C8,#F6DCE7)] shadow-sm" />
      <span className="absolute -bottom-2 -left-3 -right-3 h-2.5 rounded-full bg-[#B98F6E] shadow-sm" />

      <span className="absolute -bottom-7 left-[18%] h-6 w-8 rounded-b-[0.5rem] bg-[#B0708C]">
        <LeafSprig className="absolute -top-6 left-1 h-8 w-8 text-[#6F8267]/80" />
        <LeafSprig className="absolute -top-5 right-0 h-7 w-7 -scale-x-100 text-[#8FA083]/80" />
      </span>
    </div>
  );
}

function ShelfUnit() {
  return (
    <div aria-hidden className="absolute right-[3%] top-[10%] z-[1] w-[31%] sm:w-[25%]">
      <div className="flex items-end justify-end gap-1.5">
        <span className="relative h-9 w-6 rounded-b-md border border-white/50 bg-white/30 shadow-sm sm:h-11 sm:w-7">
          <span className="absolute inset-x-0 top-0 h-1.5 rounded-t-md bg-[#B98F6E]" />
          <span className="absolute bottom-1.5 left-1 h-1.5 w-1.5 rounded-full bg-[#6B4432]" />
          <span className="absolute bottom-3 right-1 h-1.5 w-1.5 rounded-full bg-[#6B4432]" />
          <span className="absolute bottom-2 left-2.5 h-1.5 w-1.5 rounded-full bg-[#6B4432]" />
        </span>
        <span className="relative h-8 w-7 sm:h-10 sm:w-8">
          <span className="absolute bottom-0 h-3 w-full rounded-b-md border border-plum/15 bg-[#DCD5F5]" />
          <span className="absolute bottom-2 h-3 w-full rounded-b-md border border-plum/15 bg-[#F6DCE7]" />
          <span className="absolute bottom-4 h-3 w-full rounded-b-md border border-plum/15 bg-[#FFF0B8]" />
        </span>
        <span className="relative h-10 w-7 sm:h-12 sm:w-8">
          <LeafSprig className="absolute -top-3 left-0 h-8 w-8 text-[#6F8267]/80" />
          <span className="absolute bottom-0 h-4 w-full rounded-b-md bg-[#C98EA8]" />
        </span>
      </div>
      <div className="mt-0.5 h-2 rounded-full bg-[#B98F6E] shadow-[0_2px_4px_rgba(73,51,72,.2)]" />
      <div className="mt-2 flex items-end justify-end gap-2">
        <span className="h-7 w-1.5 rotate-[5deg] rounded-sm bg-[#B0708C]" />
        <span className="h-8 w-1.5 -rotate-[4deg] rounded-sm bg-[#8EA5DA]" />
        <span className="h-6 w-1.5 rotate-[2deg] rounded-sm bg-[#C7D3BD]" />
        <span className="relative h-6 w-8 rounded-sm border-2 border-[#B98F6E] bg-[#FFF9F0]">
          <Heart className="absolute inset-1 h-3.5 w-3.5 text-rose/70" />
        </span>
      </div>
      <div className="mt-0.5 h-2 rounded-full bg-[#B98F6E] shadow-[0_2px_4px_rgba(73,51,72,.2)]" />
    </div>
  );
}

function CounterItems() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[3]">
      <div className="absolute bottom-[26%] left-[5%]">
        <LeafSprig className="absolute -top-8 left-1 h-12 w-12 rotate-[-8deg] text-[#6F8267]/75 sm:-top-10 sm:h-16 sm:w-16" />
        <LeafSprig className="absolute -top-7 right-0 h-10 w-10 -scale-x-100 rotate-[8deg] text-[#8FA083]/70 sm:h-12 sm:w-12" />
        <span className="relative block h-8 w-10 rounded-b-[0.55rem] border border-[#B0708C]/40 bg-[linear-gradient(180deg,#E9C0CF,#D49DB2)] shadow-sm sm:h-9 sm:w-12" />
      </div>

      <div className="absolute bottom-[26%] right-[6%] hidden sm:block">
        <span className="absolute -top-1 left-1/2 h-px w-10 -translate-x-1/2 bg-[#B98F6E]/60" />
        <span className="absolute -top-5 left-1/2 h-5 w-1 -translate-x-1/2 rounded-full bg-[#B98F6E]/70" />
        <span className="relative block h-10 w-16 rounded-t-full border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,.7),rgba(255,249,240,.25))] shadow-[inset_0_4px_10px_rgba(255,255,255,.6)] backdrop-blur-[1px]">
          <span className="absolute bottom-0 left-1/2 h-7 w-12 -translate-x-1/2 rounded-t-[0.4rem] bg-[#F6DCE7]" />
          <span className="absolute bottom-4 left-1/2 h-2 w-12 -translate-x-1/2 bg-[#C98EA8]/70" />
          <span className="absolute bottom-6 left-1/2 h-2 w-12 -translate-x-1/2 bg-[#FFF0B8]" />
          <span className="absolute bottom-0 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-[#B98F6E]" />
        </span>
      </div>

      <div className="absolute bottom-[26%] right-[23%] hidden md:flex md:items-end">
        <span className="relative h-9 w-8 rounded-b-md border-2 border-plum/25 bg-[#FFF9F0] shadow-sm">
          <span className="absolute -right-2 top-2 h-3 w-3 rounded-full border-2 border-plum/25 bg-[#FFF9F0]" />
          <span className="absolute inset-x-1 bottom-1.5 h-1.5 rounded-full bg-[#C98EA8]/70" />
        </span>
        <span className="relative -ml-1 h-8 w-8 rounded-b-md border-2 border-plum/25 bg-[#F6DCE7] shadow-sm">
          <span className="absolute inset-x-1 bottom-1.5 h-1.5 rounded-full bg-[#FFF0B8]" />
        </span>
      </div>

      <div className="absolute bottom-[26%] left-[19%] hidden md:block">
        <span className="relative block h-12 w-9 rounded-t-[0.4rem] rounded-b-md border-2 border-plum/25 bg-[#FFF9F0] shadow-sm">
          <span className="absolute left-1/2 top-1 h-5 w-5 -translate-x-1/2 rounded-full border border-plum/20 bg-[#FDF4E8]">
            <Star4 className="absolute inset-1 h-3 w-3 text-rose-deep/60" />
          </span>
          <span className="absolute inset-x-1.5 bottom-1.5 h-1 rounded-full bg-plum/10" />
        </span>
        <span className="absolute -bottom-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-plum/15 blur-[1px]" />
      </div>
    </div>
  );
}

function CoffeeMachineArt({
  stage,
  drink,
  onBrew,
  cups,
}: {
  stage: Stage;
  drink: MenuItem;
  onBrew: () => void;
  cups: number;
}) {
  const grinding = stage === "grinding";
  const brewing = stage === "brewing";
  const done = stage === "done";
  const busy = grinding || brewing;
  const steam = brewing || done;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onBrew}
        aria-label={
          busy
            ? "Coffee is being made, please wait"
            : `${cafe.machine.label}: brew ${drink.name}`
        }
        disabled={busy}
        aria-busy={busy}
        className="group mx-auto block w-full max-w-[14rem] rounded-[2rem] p-1 focus-visible:outline-offset-8 active:scale-[0.99] disabled:cursor-default sm:max-w-[17.5rem]"
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-8 bottom-2 h-8 rounded-full bg-plum/20 blur-lg transition-transform duration-500 group-hover:scale-105",
            busy && "scale-110",
          )}
        />
        <svg viewBox="0 0 280 300" className="relative h-auto w-full drop-shadow-[0_28px_36px_rgba(73,51,72,.3)]">
          <ellipse cx="140" cy="286" rx="86" ry="10" fill="#493348" opacity=".18" />

          <g opacity=".9">
            <rect x="34" y="20" width="212" height="6" rx="3" fill="#C98EA8" opacity=".55" />
            <g transform="translate(56 0)">
              <path d="M0 30h30l-3 22c-.4 4-3.6 6-7 6H10c-3.4 0-6.6-2-7-6L0 30Z" fill="#FFF9F0" stroke="#B0708C" strokeWidth="1.5" />
              <path d="M30 36h5c5 0 7 4 5 8-1.6 3-5 5-9 4" fill="none" stroke="#B0708C" strokeWidth="1.5" />
              <path d="M11 26c-2-3 2-5 0-8M21 26c-2-3 2-5 0-8" stroke="#C98EA8" strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
            </g>
            <g transform="translate(122 0)">
              <path d="M0 32h26l-3 20c-.4 4-3.2 6-6 6H9c-2.8 0-5.6-2-6-6L0 32Z" fill="#DCD5F5" stroke="#B0708C" strokeWidth="1.5" />
              <path d="M26 37h4c5 0 6 4 4 7-1.4 3-4 4-8 3" fill="none" stroke="#B0708C" strokeWidth="1.5" />
            </g>
            <g transform="translate(190 0)">
              <path d="M0 30h28l-3 21c-.4 4-3.4 6-6.6 6H9.6c-3.2 0-6.2-2-6.6-6L0 30Z" fill="#FFDCCB" stroke="#B0708C" strokeWidth="1.5" />
              <path d="M28 36h5c5 0 7 4 5 8-1.6 3-5 5-9 4" fill="none" stroke="#B0708C" strokeWidth="1.5" />
            </g>
          </g>

          <path d="M104 108 113 60h54l9 48Z" fill="#FFF9F0" opacity=".75" stroke="#B0708C" strokeWidth="2" />
          <rect x="108" y="50" width="64" height="13" rx="6" fill="#493348" />
          <rect x="118" y="67" width="44" height="4" rx="2" fill="#C98EA8" opacity=".5" />

          {[
            { x: 126, y: 82, r: -18 },
            { x: 144, y: 76, r: 12 },
            { x: 134, y: 93, r: 28 },
            { x: 152, y: 90, r: -6 },
            { x: 121, y: 98, r: 8 },
            { x: 147, y: 101, r: -20 },
          ].map((bean, index) => (
            <g key={index} transform={`rotate(${bean.r} ${bean.x} ${bean.y})`}>
              <ellipse cx={bean.x} cy={bean.y} rx="5" ry="3.6" fill="#6B4432" />
              <path d={`M${bean.x - 4} ${bean.y} Q${bean.x} ${bean.y - 2} ${bean.x + 4} ${bean.y}`} stroke="#C98EA8" strokeWidth="1" fill="none" opacity=".6" />
            </g>
          ))}

          {grinding
            ? [0, 1, 2, 3, 4].map((index) => (
                <motion.ellipse
                  key={`drop-${index}`}
                  cx={126 + index * 7}
                  cy={92 + (index % 2) * 4}
                  rx="4.6"
                  ry="3.2"
                  fill="#6B4432"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [0, 10, 18, 26] }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeIn" }}
                />
              ))
            : null}

          <motion.g
            animate={grinding ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: grinding ? 1.1 : 0.4, repeat: grinding ? Infinity : 0, ease: "linear" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx="140" cy="92" r="7" fill="none" stroke="#B0708C" strokeWidth="2.4" opacity=".7" strokeDasharray="3 3" />
            <circle cx="140" cy="92" r="2" fill="#B0708C" />
          </motion.g>

          {grinding
            ? [0, 1, 2].map((index) => (
                <motion.circle
                  key={`dust-${index}`}
                  cx={132 + index * 7}
                  cy="76"
                  r={1.5 + index}
                  fill="#B0708C"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0], y: [0, -8, -16], x: [0, index === 1 ? 4 : -3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.18 }}
                />
              ))
            : null}

          <rect x="44" y="112" width="192" height="146" rx="26" fill="#C98EA8" stroke="#B0708C" strokeWidth="2" />
          <rect x="56" y="124" width="168" height="122" rx="20" fill="#F6DCE7" />
          <rect x="56" y="124" width="168" height="37" rx="18" fill="#EFC9DA" />

          <circle cx="92" cy="177" r="17" fill="#FFF9F0" stroke="#B0708C" strokeWidth="1.6" />
          <motion.g
            animate={busy ? { rotate: [-18, 28, -8, 34, -18] } : { rotate: -18 }}
            transition={{ duration: busy ? 1.4 : 0.6, repeat: busy ? Infinity : 0, ease: "easeInOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "92px 177px" }}
          >
            <line x1="92" y1="177" x2="92" y2="166" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
          </motion.g>
          <circle cx="92" cy="177" r="3.2" fill="#493348" />
          <path d="M80 166a16 16 0 0 1 10-5" stroke="#C98EA8" strokeWidth="1.6" fill="none" opacity=".7" />

          <text x="170" y="157" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="17" fill="#493348">
            Divy&apos;s
          </text>
          <text x="170" y="170" textAnchor="middle" fontFamily="var(--font-nunito)" fontWeight="800" fontSize="6.5" letterSpacing="2.2" fill="#B0708C">
            COFFEE CO.
          </text>
          <text x="170" y="184" textAnchor="middle" fontFamily="var(--font-nunito)" fontWeight="800" fontSize="5" letterSpacing="1.4" fill="#493348" opacity=".45">
            {drink.name.split(" ")[0].toUpperCase()}
          </text>

          <circle cx="196" cy="197" r="13" fill="#493348" />
          <motion.circle
            cx="196"
            cy="197"
            r="4"
            fill={stage === "idle" ? "#FFF0B8" : "#C98EA8"}
            animate={busy ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
            transition={{ duration: 0.8, repeat: busy ? Infinity : 0 }}
          />
          <path d="M196 188l1.5 4.3 4.3 1.5-4.3 1.5-1.5 4.3-1.5-4.3-4.3-1.5 4.3-1.5L196 188Z" fill="#FFF9F0" opacity=".85" />

          <rect x="118" y="189" width="46" height="16" rx="6" fill="#493348" />
          <rect x="126" y="204" width="30" height="9" rx="4" fill="#B0708C" />
          <rect x="136" y="212" width="10" height="6" rx="2" fill="#493348" />

          <motion.rect
            x="139"
            y="216"
            width="4"
            height="12"
            rx="2"
            fill="#6B4432"
            animate={{ opacity: brewing ? [0.4, 1, 0.5, 1] : 0 }}
            transition={{ duration: 0.7, repeat: brewing ? Infinity : 0 }}
          />

          <rect x="96" y="258" width="90" height="10" rx="5" fill="#B0708C" />
          <rect x="102" y="267" width="78" height="5" rx="2.5" fill="#493348" opacity=".45" />

          <path d="M118 258 L126 222 H156 L164 258 Z" fill="#FFF9F0" stroke="#493348" strokeWidth="2" strokeLinejoin="round" />
          <path d="M156 230h6c7 0 10 5 8 11-1.6 5-6 8-11 7" fill="none" stroke="#493348" strokeWidth="2" strokeLinecap="round" />
          <rect x="130" y="226" width="22" height="28" rx="3" fill="#B0708C" opacity=".2" />

          <motion.rect
            x="130"
            y="226"
            width="22"
            height="28"
            rx="3"
            fill={drink.liquid}
            style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
            animate={{ scaleY: brewing ? 0.82 : done ? 0.9 : 0 }}
            initial={false}
            transition={{ duration: brewing ? 1.35 : 0.35, ease: "easeOut" }}
          />
          <motion.rect
            x="130"
            y="226"
            width="22"
            height="5"
            rx="2.5"
            fill={drink.foam}
            animate={{ opacity: brewing ? 0.7 : done ? 1 : 0 }}
          />

          {drink.id === "cold-coffee" && (brewing || done) ? (
            <g opacity=".55">
              <rect x="133" y="234" width="6" height="6" rx="1.5" fill="#FFF9F0" transform="rotate(-10 136 237)" />
              <rect x="144" y="242" width="5" height="5" rx="1.5" fill="#FFF9F0" transform="rotate(12 146 244)" />
            </g>
          ) : null}
          {drink.id === "mocha" && (brewing || done) ? (
            <g fill="#6B4432" opacity=".65">
              <circle cx="137" cy="233" r="1.2" />
              <circle cx="145" cy="236" r="1" />
              <circle cx="141" cy="240" r="1.3" />
            </g>
          ) : null}
          {drink.id === "special" && (brewing || done) ? (
            <path d="M145 242l1.2 3.2 3.2 1.2-3.2 1.2-1.2 3.2-1.2-3.2-3.2-1.2 3.2-1.2 1.2-3.2Z" fill="#FFF0B8" opacity=".9" />
          ) : null}

          <AnimatePresence>
            {done ? (
              <motion.g
                key="cup-face"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 16 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <circle cx="136" cy="234" r="1.5" fill="#493348" />
                <circle cx="146" cy="234" r="1.5" fill="#493348" />
                <path d="M136 238c2 2 6 2 8 0" stroke="#493348" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              </motion.g>
            ) : null}
          </AnimatePresence>

          <g opacity={steam ? 1 : 0} style={{ transition: "opacity .5s" }}>
            <path d="M132 218c-4-7 4-9 0-17" stroke="#FFF9F0" strokeWidth="2.6" strokeLinecap="round" fill="none" className="cafe-steam" opacity=".9" />
            <path d="M146 216c-4-8 5-10 0-19" stroke="#FFF9F0" strokeWidth="2.6" strokeLinecap="round" fill="none" className="cafe-steam" style={{ animationDelay: "0.5s" }} opacity=".72" />
            <path d="M160 218c-4-7 4-9 0-17" stroke="#FFF9F0" strokeWidth="2.6" strokeLinecap="round" fill="none" className="cafe-steam" style={{ animationDelay: "0.9s" }} opacity=".82" />
          </g>

          <g opacity={busy ? 0.55 : 0} style={{ transition: "opacity .4s" }}>
            <path d="M132 42c-3-5 3-7 0-12" stroke="#C98EA8" strokeWidth="2" strokeLinecap="round" fill="none" className="cafe-steam" />
            <path d="M148 40c-3-5 3-7 0-12" stroke="#C98EA8" strokeWidth="2" strokeLinecap="round" fill="none" className="cafe-steam" style={{ animationDelay: ".6s" }} />
          </g>

          <AnimatePresence>
            {done ? (
              <motion.g
                key="cup-sparkles"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_SCENE }}
                style={{ transformBox: "fill-box", transformOrigin: "140px 205px" }}
              >
                <path d="M106 198l1.7 4.6 4.6 1.7-4.6 1.7-1.7 4.6-1.7-4.6-4.6-1.7 4.6-1.7 1.7-4.6Z" fill="#FFF0B8" />
                <path d="M174 200l1.2 3.4 3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4-3.4-1.2 3.4-1.2 1.2-3.4Z" fill="#F6DCE7" />
                <circle cx="166" cy="212" r="2" fill="#DCD5F5" />
              </motion.g>
            ) : null}
          </AnimatePresence>
        </svg>
      </button>

      <div className="mt-1 flex flex-col items-center gap-0.5">
        <span className="flex items-center gap-1.5 text-[0.52rem] font-extrabold uppercase tracking-[0.16em] text-plum/70 sm:text-[0.56rem]">
          <span className={cn("h-1.5 w-1.5 rounded-full", busy ? "bg-rose-deep garden-twinkle" : "bg-sage")} />
          {stage === "idle" ? "machine ready" : stage === "done" ? "freshly brewed" : "in progress"}
        </span>
        <span className="hand text-base text-rose-deep/85 sm:text-lg">
          cups poured today: {cups} · {cafe.counter.suffix}
        </span>
      </div>
    </div>
  );
}

function MenuBoard({
  selectedId,
  onSelect,
  disabled,
}: {
  selectedId: DrinkId;
  onSelect: (id: DrinkId) => void;
  disabled: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[24rem] lg:max-w-none">
      <span aria-hidden className="absolute left-1/2 -top-6 h-6 w-px -translate-x-1/2 bg-[#8A6A53]/60" />
      <div className="relative rotate-[0.6deg] rounded-[1.3rem] border-[9px] border-[#8A6A53] bg-[#3A2E2C] p-2.5 shadow-[0_34px_60px_-32px_rgba(47,31,46,.8),inset_0_1px_0_rgba(255,255,255,.2)] sm:p-3">
        <div className="rounded-[0.9rem] bg-[radial-gradient(circle_at_26%_16%,#4B3A35,#332724_72%)] p-4 sm:p-5">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="hand text-[1.55rem] leading-none text-cream/85 sm:text-[1.8rem]">
                {cafe.menuCopy.boardTitle}
              </p>
              <p className="mt-1 text-[0.44rem] font-extrabold uppercase tracking-[0.22em] text-cream/35">
                {cafe.menuCopy.boardNote}
              </p>
            </div>
            <Star4 className="h-4 w-4 text-butter/80 garden-twinkle" />
          </div>

          <div className="my-2.5 border-t border-dashed border-cream/15" />

          <ul className="space-y-1">
            {cafe.menu.map((item) => {
              const selected = item.id === selectedId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    disabled={disabled}
                    aria-pressed={selected}
                    className={cn(
                      "group flex w-full items-start gap-2.5 rounded-[0.7rem] px-2 py-1.5 text-left transition-colors duration-300 focus-visible:outline-offset-2 disabled:cursor-default",
                      selected ? "bg-cream/10" : "hover:bg-cream/[0.05]",
                      disabled && !selected && "opacity-55",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                        selected
                          ? "border-butter/50 bg-cream/10"
                          : "border-cream/10 bg-cream/[0.04]",
                      )}
                    >
                      <DrinkCup id={item.id} className="h-8 w-8" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span
                          className={cn(
                            "font-display text-[0.95rem] italic leading-tight transition-colors sm:text-[1.02rem]",
                            selected ? "text-butter" : "text-cream/82 group-hover:text-cream",
                          )}
                        >
                          {item.name}
                        </span>
                        <span className="ml-auto font-hand text-[0.95rem] text-cream/45">
                          {item.price}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block text-[0.55rem] leading-snug transition-colors",
                          selected ? "text-cream/60" : "text-cream/38",
                        )}
                      >
                        {item.notes}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "mt-1 h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                        selected ? "bg-butter garden-twinkle" : "bg-cream/10",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-dashed border-cream/15 pt-2">
            <span className="hand text-[0.95rem] text-cream/55">{cafe.menuCopy.hint}</span>
            <CoffeeCup className="h-5 w-5 opacity-35" />
          </div>
        </div>

        <span aria-hidden className="absolute -bottom-3 left-1/2 h-3 w-[28%] -translate-x-1/2 rounded-b-full bg-[#8A6A53] shadow-md" />
        <span aria-hidden className="absolute -bottom-2 left-1/2 h-1.5 w-[22%] -translate-x-1/2 rounded-full bg-[#FFF0B8]/40" />
      </div>
    </div>
  );
}

function Certificate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -1.4, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, rotate: -0.8, scale: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 18 }}
      className="relative mx-auto mt-8 w-full max-w-[34rem]"
    >
      <span className="tape left-1/2 top-0 h-3.5 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg]" />
      <div className="paper deckle relative overflow-hidden border border-plum/12 px-6 py-6 text-center shadow-[0_30px_60px_-34px_rgba(47,31,46,.65)] sm:px-9 sm:py-8">
        <Sparkle className="absolute left-5 top-5 h-4 w-4 text-rose/45" />
        <Sparkle className="absolute bottom-5 right-5 h-3 w-3 text-butter" />
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-rose-deep/55 bg-butter/55 shadow-inner">
          <Star4 className="h-6 w-6 text-rose-deep/80" />
        </div>
        <p className="mt-3 text-[0.56rem] font-extrabold uppercase tracking-[0.26em] text-plum/70">
          {cafe.certificate.title}
        </p>
        <h3 className="display-title mt-1 text-[clamp(1.55rem,5.4vw,2.35rem)] leading-tight text-plum">
          {cafe.certificate.headline}
        </h3>
        <p className="mx-auto mt-2 max-w-[26rem] text-[0.8rem] leading-relaxed text-plum/75 sm:text-[0.88rem]">
          {cafe.certificate.body}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-plum/15 sm:w-14" />
          <span className="hand text-base text-rose-deep/80 sm:text-lg">{cafe.certificate.seal}</span>
          <span className="h-px w-10 bg-plum/15 sm:w-14" />
        </div>
      </div>
    </motion.div>
  );
}

export function SonuCafe() {
  const audio = useAudioExperience();
  const [stage, setStage] = useState<Stage>("idle");
  const [selectedId, setSelectedId] = useState<DrinkId>("cappuccino");
  const [cups, setCups] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [certified, setCertified] = useState(false);
  const bag = useRef<string[]>([]);
  const timers = useRef<number[]>([]);
  const selected = cafe.menu.find((item) => item.id === selectedId) ?? cafe.menu[0];
  const busy = stage === "grinding" || stage === "brewing";
  const { markComplete } = useChapterGate("cafe");

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (cups > 0) markComplete("cafe");
  }, [cups, markComplete]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const chooseDrink = (id: DrinkId) => {
    if (busy || id === selectedId) return;
    audio.playSfx("page");
    setSelectedId(id);
    setStage("idle");
    setMessage(null);
  };

  const brew = () => {
    if (busy) return;
    audio.playSfx("coffee");
    clearTimers();
    setStage("grinding");
    setMessage(null);

    timers.current.push(
      window.setTimeout(() => setStage("brewing"), 950),
      window.setTimeout(() => {
        setStage("done");
        setCups((value) => value + 1);
        if (bag.current.length === 0) bag.current = makeBag([...cafe.messages]);
        setMessage(bag.current.pop() ?? cafe.messages[0]);
        if (!certified) {
          setCertified(true);
          audio.playSfx("gift");
        }
      }, 2700),
    );
  };

  const brewLabel = busy
    ? stage === "grinding"
      ? cafe.machine.grinding
      : cafe.machine.brewing
    : stage === "done"
      ? stageCopy.done
      : `Brew ${selected.name}`;

  const status =
    stage === "grinding"
      ? "the beans are doing their thing..."
      : stage === "brewing"
        ? "patience. good coffee takes a moment."
        : stage === "done" && message
          ? message
          : selected.notes;

  return (
    <section
      id="chapter-cafe"
      aria-labelledby="cafe-title"
      className="story-scene bg-[linear-gradient(180deg,#FFF9F0_0%,#FFEFDF_46%,#FFF5E5_100%)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-peach/45 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-butter/40 blur-3xl" />
        <Flower className="absolute left-[4%] top-[38%] h-9 w-9 opacity-40 garden-sway" />
        <Star4 className="absolute right-[10%] top-[18%] h-4 w-4 text-rose/45 garden-twinkle" />
      </div>

      <div className="section-shell relative">
        <StorybookHeading
          id="cafe-title"
          number="04"
          label={cafe.eyebrow.replace("Chapter 04 · ", "")}
          title={cafe.title}
          note={cafe.script}
          instruction={chapterInstructions.cafe}
        />

        <div className="mt-6 grid gap-6 sm:mt-9 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div className="min-w-0">
            <div className="relative h-[27rem] overflow-hidden rounded-[1.7rem] border border-plum/12 bg-[linear-gradient(180deg,#F8E6CF_0%,#F3D6B9_58%,#EFCCAF_100%)] shadow-[0_40px_80px_-46px_rgba(47,31,46,.68)] sm:h-[33rem] sm:rounded-[2rem]">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,249,240,.7) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div aria-hidden className="absolute -left-16 top-4 h-64 w-64 rounded-full bg-butter/45 blur-3xl" />
              <div aria-hidden className="absolute right-0 top-0 h-72 w-72 rounded-full bg-peach/35 blur-3xl" />

              <CafeWindow />
              <ShelfUnit />
              <StringLights />

              <div aria-hidden className="absolute left-[36%] top-[8%] hidden rotate-[-3deg] rounded-sm border-[3px] border-[#B98F6E] bg-[#FFF9F0] p-1.5 shadow-sm sm:block">
                <Star4 className="h-5 w-5 text-rose/55" />
              </div>

              <div aria-hidden className="absolute inset-x-0 bottom-0 z-[2] h-[27%]">
                <div className="h-3 bg-[linear-gradient(180deg,#E4C29B,#C99E76)] shadow-[0_2px_0_rgba(255,255,255,.45),0_7px_16px_rgba(73,51,72,.2)]" />
                <div className="relative h-full bg-[linear-gradient(180deg,#B07E5B,#936247)]">
                  <div className="flex h-full items-start justify-around px-3 pt-3">
                    {[0, 1, 2].map((index) => (
                      <span
                        key={index}
                        className="relative h-[68%] w-[27%] rounded-t-[0.4rem] border border-[#7B5038]/40 bg-[#A06B4C]/55 shadow-[inset_0_1px_0_rgba(255,255,255,.12)]"
                      >
                        <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#6B4432]/60" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <CounterItems />

              <CatSticker
                art="cup"
                label="Say hello to the cafe cat"
                bubble="catpuccino?"
                bubbleSide="top"
                interactive
                motion="breathe"
                delay={-1.5}
                className="absolute bottom-[27%] left-[14%] z-[4] hidden w-16 md:block"
              />

              <div className="absolute bottom-[25.5%] left-1/2 z-20 w-[13.5rem] -translate-x-1/2 sm:w-[17rem]">
                <CoffeeMachineArt stage={stage} drink={selected} onBrew={brew} cups={cups} />
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute bottom-[27.5%] right-[4%] z-[4] hidden rotate-[2deg] rounded-[0.5rem] border border-dashed border-plum/20 bg-[#FFFBF1] px-3 py-2 shadow-[0_14px_24px_-20px_rgba(47,31,46,.6)] sm:block"
              >
                <p className="text-[0.4rem] font-extrabold uppercase tracking-[0.18em] text-plum/35">now serving</p>
                <p className="hand text-base leading-tight text-rose-deep/85">{selected.name}</p>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute left-[4%] top-[4%] z-[4] rounded-full border border-cream/50 bg-cream/30 px-3 py-1 text-[0.44rem] font-extrabold uppercase tracking-[0.2em] text-plum/45 backdrop-blur-sm"
              >
                Open 24x7
              </div>
            </div>

            <div className="mt-4 flex w-full flex-col items-center gap-2">
              <button
                type="button"
                onClick={brew}
                disabled={busy}
                aria-busy={busy}
                aria-label={busy ? "Coffee is being made, please wait" : `Brew ${selected.name}`}
                className="btn-magic w-full max-w-[23rem] min-h-[3.15rem] text-[0.9rem]"
              >
                <CoffeeCup className="h-4.5 w-4.5 text-butter" />
                {brewLabel}
              </button>

              <p
                aria-live="polite"
                aria-atomic="true"
                className="min-h-[1.6rem] max-w-[26rem] text-center text-[0.7rem] font-semibold leading-relaxed text-plum/48"
              >
                {status}
              </p>

              <div className="flex items-center justify-center gap-2 border-t border-dashed border-plum/12 pt-2">
                <Sparkle className="h-3 w-3 text-rose-deep/45" />
                <span className="hand text-base text-plum/50">no decaf. no rush.</span>
              </div>
            </div>
          </div>

          <MenuBoard selectedId={selectedId} onSelect={chooseDrink} disabled={busy} />
        </div>

        <AnimatePresence>{certified ? <Certificate key="certificate" /> : null}</AnimatePresence>
      </div>
    </section>
  );
}
