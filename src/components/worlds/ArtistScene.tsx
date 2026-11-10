"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion } from "motion/react";
import { Paintbrush, Sparkles } from "lucide-react";
import { EASE_SCENE } from "@/animations/motion";
import { cn } from "@/lib/utils";
import { RangoliArt } from "./RangoliArt";
import { DriftField, SceneLayer } from "./scene-kit";
import type { SceneInteractionProps } from "./scene-types";

const swatches = [
  { id: "rose", color: "#C95D86" },
  { id: "violet", color: "#8A6BB5" },
  { id: "peach", color: "#E38E5D" },
  { id: "teal", color: "#4E8C7A" },
  { id: "gold", color: "#D6A23F" },
  { id: "plum", color: "#9A4F76" },
] as const;

type Point = { x: number; y: number };

export function ArtistScene({ completed, onComplete }: SceneInteractionProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const flourishRef = useRef<(() => void) | null>(null);
  const lastRef = useRef<Point | null>(null);
  const travelRef = useRef(0);
  const doneRef = useRef(completed);

  const [color, setColor] = useState<string>(swatches[0].color);
  const [revealed, setRevealed] = useState(completed);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setRevealed(true);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    let frame = 0;

    const drawFlourish = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
      const w = rect.width;
      const h = rect.height;

      const strokes: {
        color: string;
        width: number;
        draw: () => void;
      }[] = [
        {
          color: "#C95D86",
          width: Math.max(12, h * 0.035),
          draw: () => {
            ctx.beginPath();
            ctx.moveTo(w * 0.08, h * 0.64);
            ctx.bezierCurveTo(
              w * 0.28,
              h * 0.36,
              w * 0.42,
              h * 0.76,
              w * 0.62,
              h * 0.5,
            );
            ctx.bezierCurveTo(
              w * 0.76,
              h * 0.32,
              w * 0.86,
              h * 0.58,
              w * 0.95,
              h * 0.42,
            );
            ctx.stroke();
          },
        },
        {
          color: "#8A6BB5",
          width: Math.max(9, h * 0.024),
          draw: () => {
            ctx.beginPath();
            ctx.moveTo(w * 0.16, h * 0.28);
            ctx.bezierCurveTo(
              w * 0.3,
              h * 0.18,
              w * 0.44,
              h * 0.36,
              w * 0.58,
              h * 0.26,
            );
            ctx.bezierCurveTo(
              w * 0.7,
              h * 0.18,
              w * 0.82,
              h * 0.3,
              w * 0.9,
              h * 0.24,
            );
            ctx.stroke();
          },
        },
        {
          color: "#D6A23F",
          width: Math.max(6, h * 0.016),
          draw: () => {
            ctx.beginPath();
            ctx.moveTo(w * 0.1, h * 0.8);
            ctx.bezierCurveTo(
              w * 0.3,
              h * 0.9,
              w * 0.5,
              h * 0.72,
              w * 0.7,
              h * 0.82,
            );
            ctx.bezierCurveTo(
              w * 0.8,
              h * 0.87,
              w * 0.88,
              h * 0.74,
              w * 0.96,
              h * 0.78,
            );
            ctx.stroke();
          },
        },
      ];

      strokes.forEach((stroke) => {
        ctx.save();
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.globalAlpha = 0.82;
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = 16;
        stroke.draw();
        ctx.restore();
      });
    };

    flourishRef.current = drawFlourish;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      travelRef.current = 0;
      lastRef.current = null;
      if (doneRef.current) drawFlourish();
    };

    resize();
    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(resize);
    });
    observer.observe(wrap);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      flourishRef.current = null;
    };
  }, []);

  const pointFrom = (event: ReactPointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const limit = () =>
    (wrapRef.current?.getBoundingClientRect().width ?? 600) * 1.35;

  const drawDot = (point: Point) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.9;
    ctx.shadowColor = color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawSegment = (from: Point, to: Point) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.globalAlpha = 0.9;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = pointFrom(event);
    lastRef.current = point;
    travelRef.current += 6;
    drawDot(point);
    if (travelRef.current > limit()) finish();
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!lastRef.current) return;
    const point = pointFrom(event);
    const from = lastRef.current;
    const distance = Math.hypot(point.x - from.x, point.y - from.y);
    if (distance < 1.2) return;
    drawSegment(from, point);
    lastRef.current = point;
    travelRef.current += distance;
    if (travelRef.current > limit()) finish();
  };

  const handlePointerEnd = () => {
    lastRef.current = null;
  };

  const paintForMe = () => {
    flourishRef.current?.();
    finish();
  };

  return (
    <SceneLayer className="bg-[linear-gradient(155deg,#FCF2E2_0%,#F5DFD4_46%,#EFC9C9_100%)]">
      <div ref={wrapRef} className="absolute inset-0">
        <div className="absolute -left-[14%] top-[-22%] h-[86%] w-[56%] rotate-[18deg] bg-[linear-gradient(180deg,rgba(255,249,240,.92),transparent)] blur-2xl" />
        <div className="absolute right-[-18%] top-[-16%] h-[70%] w-[50%] -rotate-[16deg] bg-[linear-gradient(180deg,rgba(255,240,184,.38),transparent)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,rgba(201,142,168,.04),rgba(201,142,168,.2))]" />

        <motion.div
          className="absolute inset-[7%] flex items-center justify-center sm:inset-[6%]"
          initial={false}
          animate={{
            opacity: revealed ? 0.7 : 0,
            scale: revealed ? 1 : 0.9,
            rotate: revealed ? 0 : -4,
          }}
          transition={{ duration: 1.6, ease: EASE_SCENE }}
          style={{ mixBlendMode: "multiply" }}
        >
          <RangoliArt revealed={revealed} />
        </motion.div>

        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onLostPointerCapture={handlePointerEnd}
          onContextMenu={(event) => event.preventDefault()}
          aria-label="A blank canvas. Drag to paint colour across it."
          className="absolute inset-0 z-[2] h-full w-full touch-none cursor-crosshair"
        />
      </div>

      <DriftField
        count={16}
        seed={41}
        tones={["#FFF0B8", "#F6DCE7", "#DCD5F5", "#FFDCCB"]}
        opacity={0.42}
        minSize={2}
        maxSize={6}
      />

      <div className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-1.5 sm:left-4 sm:gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#8F5069]/30 bg-[#FFF9F0]/80 text-[#8F5069] shadow-sm">
          <Paintbrush className="h-3.5 w-3.5" strokeWidth={1.8} />
        </span>
        {swatches.map((swatch) => (
          <button
            key={swatch.id}
            type="button"
            onClick={() => setColor(swatch.color)}
            aria-label={`Paint with ${swatch.id}`}
            aria-pressed={color === swatch.color}
            className={cn(
              "h-5 w-5 rounded-full border-2 shadow-sm transition-transform hover:scale-110 sm:h-6 sm:w-6",
              color === swatch.color
                ? "scale-110 border-[#493348]"
                : "border-[#FFF9F0]",
            )}
            style={{ background: swatch.color }}
          />
        ))}
        {!revealed ? (
          <button
            type="button"
            onClick={paintForMe}
            className="mt-1 rounded-full border border-[#8F5069]/30 bg-[#FFF9F0]/85 px-2 py-1 text-[0.44rem] font-extrabold uppercase leading-tight tracking-[0.12em] text-[#8F5069] shadow-sm transition hover:bg-[#FFF9F0]"
          >
            paint
            <br />
            for me
          </button>
        ) : null}
      </div>

      <Sparkles className="absolute left-[10%] top-[12%] h-4 w-4 text-[#C95D86]/60 anim-twinkle" />
      <Sparkles className="absolute right-[14%] bottom-[18%] h-3 w-3 text-[#8A6BB5]/50 anim-twinkle" />
    </SceneLayer>
  );
}
