"use client";

import { useCallback, useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  shape: "rect" | "circle" | "streamer";
  life: number;
  decay: number;
  wobble: number;
  wobbleSpeed: number;
};

const COLORS = [
  "#C98EA8",
  "#F6DCE7",
  "#FFF0B8",
  "#DCD5F5",
  "#FFDCCB",
  "#FFF9F0",
  "#B0708C",
];

type BurstOptions = {
  x?: number;
  y?: number;
  count?: number;
};

export function useConfetti() {
  const canvases = useRef<HTMLCanvasElement[]>([]);
  const rafs = useRef<number[]>([]);

  const cleanupCanvas = useCallback((canvas: HTMLCanvasElement) => {
    canvas.remove();
    canvases.current = canvases.current.filter((c) => c !== canvas);
  }, []);

  const fire = useCallback(
    (options: BurstOptions = {}) => {
      if (typeof window === "undefined") return;
      const reduced = prefersReducedMotion();
      if (reduced) return;
      const count = options.count ?? (window.innerWidth < 640 ? 110 : 180);

      const canvas = document.createElement("canvas");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.cssText = `position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:90;`;
      canvas.setAttribute("aria-hidden", "true");
      document.body.appendChild(canvas);
      canvases.current.push(canvas);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      const originX = options.x ?? width / 2;
      const originY = options.y ?? height * 0.42;
      const particles: Particle[] = [];

      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 11;
        const shapeRoll = Math.random();
        particles.push({
          x: originX + (Math.random() - 0.5) * 60,
          y: originY + (Math.random() - 0.5) * 30,
          vx: Math.cos(angle) * speed * (0.55 + Math.random() * 0.8),
          vy: Math.sin(angle) * speed - 4 - Math.random() * 5,
          size: 4 + Math.random() * 7,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.32,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: shapeRoll > 0.86 ? "streamer" : shapeRoll > 0.4 ? "rect" : "circle",
          life: 1,
          decay: 0.004 + Math.random() * 0.006,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.04 + Math.random() * 0.06,
        });
      }

      const start = performance.now();
      let last = start;

      const frame = (now: number) => {
        const dt = Math.min(32, now - last);
        last = now;
        ctx.clearRect(0, 0, width, height);
        let alive = false;

        particles.forEach((p) => {
          p.vy += 0.22 * (dt / 16.67);
          p.vx *= 0.995;
          p.vy *= 0.994;
          p.wobble += p.wobbleSpeed * (dt / 16.67);
          p.x += (p.vx + Math.sin(p.wobble) * 0.6) * (dt / 16.67);
          p.y += p.vy * (dt / 16.67);
          p.rotation += p.spin * (dt / 16.67);
          p.life -= p.decay * (dt / 16.67);

          if (p.life <= 0 || p.y > height + 40) return;
          alive = true;

          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4));
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === "streamer") {
            ctx.fillRect(-p.size * 0.22, -p.size * 1.4, p.size * 0.44, p.size * 2.4);
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
          }
          ctx.restore();
        });

        if (alive && now - start < 9000) {
          const id = requestAnimationFrame(frame);
          rafs.current.push(id);
        } else {
          cleanupCanvas(canvas);
        }
      };

      const id = requestAnimationFrame(frame);
      rafs.current.push(id);
    },
    [cleanupCanvas],
  );

  useEffect(() => {
    const activeCanvases = canvases.current;
    const activeRafs = rafs.current;
    return () => {
      activeRafs.forEach((id) => cancelAnimationFrame(id));
      activeCanvases.forEach((canvas) => canvas.remove());
      activeCanvases.length = 0;
      activeRafs.length = 0;
    };
  }, []);

  return { fire };
}
