"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import gsap from "gsap";
import { Heart, Sparkle, Star4 } from "@/components/common/Illustrations";
import {
  PORTRAIT_ASPECT,
  PORTRAIT_HEIGHT,
  PORTRAIT_SRC,
  PORTRAIT_WIDTH,
  portraitFragments,
  type PortraitFragment,
} from "@/data/portrait";
import { skills, type SkillId } from "@/data/making";
import { SkillGlyph } from "./SkillGlyph";

type DivyaPortraitProps = {
  discovered: SkillId[];
  finale: boolean;
  reduced: boolean;
};

type SkillAccent = (typeof skills)[number]["accent"];

const SCATTER_FILTER =
  "saturate(0.78) brightness(1.03) blur(0.55px) drop-shadow(0 7px 10px rgba(73,51,72,0.14))";
const SETTLED_FILTER =
  "saturate(1) brightness(1) blur(0px) drop-shadow(0 3px 5px rgba(73,51,72,0.2))";
const FRAME_SCALE = 1.045;

const SKILL_ACCENTS = skills.reduce<Record<SkillId, SkillAccent>>(
  (map, skill) => {
    map[skill.id] = skill.accent;
    return map;
  },
  {} as Record<SkillId, SkillAccent>,
);

function pieceWash(accent: SkillAccent, index: number): CSSProperties {
  const layers = [
    "radial-gradient(circle at 32% 24%, rgba(255,255,255,0.55), transparent 60%)",
  ];
  let size: string | undefined;

  if (index % 3 === 0) {
    layers.push(`radial-gradient(circle, ${accent.ink}26 1.1px, transparent 1.3px)`);
    size = "auto, 12px 12px, auto";
  } else if (index % 3 === 1) {
    layers.push(
      `repeating-linear-gradient(135deg, ${accent.ink}1C 0 5px, transparent 5px 11px)`,
    );
  }
  layers.push(`linear-gradient(160deg, ${accent.paper}, ${accent.wash})`);

  return {
    backgroundImage: layers.join(", "),
    backgroundSize: size,
  };
}

function scatterFor(
  fragment: PortraitFragment,
  frameWidth: number,
  frameHeight: number,
) {
  const centerX = fragment.box.x + fragment.box.w / 2;
  const centerY = fragment.box.y + fragment.box.h / 2;

  return {
    x: (fragment.drift.x - (centerX - 0.5)) * frameWidth,
    y: (fragment.drift.y - (centerY - 0.5)) * frameHeight,
    rotate: fragment.drift.rotate,
    scale: fragment.drift.scale,
    opacity: fragment.drift.opacity,
    filter: SCATTER_FILTER,
  };
}

export function DivyaPortrait({
  discovered,
  finale,
  reduced,
}: DivyaPortraitProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const baseRef = useRef<HTMLImageElement | null>(null);
  const emptyRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const fragmentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const litRef = useRef<Set<string>>(new Set());

  const scatterAll = useCallback(() => {
    const photo = photoRef.current;
    if (!photo) return;
    const { width, height } = photo.getBoundingClientRect();
    if (!width || !height) return;

    portraitFragments.forEach((fragment, index) => {
      if (litRef.current.has(fragment.id)) return;
      const el = fragmentRefs.current[index];
      if (!el) return;

      if (reduced) {
        gsap.set(el, {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 0,
          filter: "none",
          transformOrigin: "50% 50%",
        });
      } else {
        gsap.set(el, {
          ...scatterFor(fragment, width, height),
          transformOrigin: "50% 50%",
          force3D: true,
        });
      }
    });
  }, [reduced]);

  useEffect(() => {
    const handle = window.requestAnimationFrame(() => {
      scatterAll();
    });
    return () => window.cancelAnimationFrame(handle);
  }, [scatterAll]);

  useEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;

    let frame = 0;
    const observer = new ResizeObserver(() => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!finale) scatterAll();
      });
    });

    observer.observe(photo);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [finale, scatterAll]);

  useEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;
    const { width, height } = photo.getBoundingClientRect();
    if (!width || !height) return;

    const current = new Set(discovered);
    const empty = emptyRef.current;
    let landing = 0;

    portraitFragments.forEach((fragment, index) => {
      const el = fragmentRefs.current[index];
      if (!el) return;

      const on = current.has(fragment.skill);

      if (on && !litRef.current.has(fragment.id)) {
        litRef.current.add(fragment.id);

        if (reduced) {
          gsap.set(el, {
            opacity: 1,
            filter: SETTLED_FILTER,
            overwrite: true,
          });
        } else {
          gsap.set(el, {
            ...scatterFor(fragment, width, height),
            transformOrigin: "50% 50%",
            force3D: true,
          });
          gsap.to(el, {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            filter: SETTLED_FILTER,
            duration: 1.15,
            delay: landing * 0.09,
            ease: "power3.inOut",
            overwrite: true,
          });
        }

        landing += 1;
        return;
      }

      if (!on && litRef.current.has(fragment.id)) {
        litRef.current.delete(fragment.id);

        if (reduced) {
          gsap.to(el, {
            opacity: 0,
            duration: 0.2,
            overwrite: true,
          });
        } else {
          gsap.to(el, {
            ...scatterFor(fragment, width, height),
            duration: 0.6,
            ease: "power2.inOut",
            overwrite: true,
            transformOrigin: "50% 50%",
            force3D: true,
          });
        }
      }
    });

    if (empty) {
      gsap.to(empty, {
        opacity: current.size > 0 ? 0 : 1,
        duration: reduced ? 0.2 : 0.45,
        ease: "power1.out",
        overwrite: true,
      });
    }
  }, [discovered, reduced]);

  useEffect(() => {
    const base = baseRef.current;
    const empty = emptyRef.current;
    const glow = glowRef.current;
    if (!base) return;

    const pieces = fragmentRefs.current.filter(
      (el): el is HTMLDivElement => Boolean(el),
    );

    if (finale) {
      if (reduced) {
        gsap.set(base, {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0% round 0.45rem)",
          filter: "none",
        });
        gsap.set(pieces, { opacity: 0 });
        gsap.set(empty, { opacity: 0 });
        gsap.set(glow, { opacity: 0 });
        return;
      }

      gsap.set(base, {
        opacity: 0,
        clipPath: "inset(0% 0% 100% 0% round 0.45rem)",
        filter: "blur(9px) brightness(1.08) saturate(0.9)",
      });
      gsap.set(glow, { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" });

      const tl = gsap.timeline();
      tl.to(empty, { opacity: 0, duration: 0.45, ease: "power1.out" }, 0)
        .to(base, { opacity: 1, duration: 0.25, ease: "power1.out" }, 0.35)
        .to(
          base,
          {
            clipPath: "inset(0% 0% 0% 0% round 0.45rem)",
            duration: 1.3,
            ease: "power3.inOut",
          },
          0.35,
        )
        .to(
          base,
          {
            filter: "blur(0px) brightness(1) saturate(1)",
            duration: 1.4,
            ease: "power2.out",
          },
          0.35,
        )
        .to(
          glow,
          { opacity: 0.85, scale: 1, duration: 0.45, ease: "power2.out" },
          0.35,
        )
        .to(glow, { opacity: 0, duration: 1, ease: "power2.in" }, 0.85)
        .to(pieces, { opacity: 0, duration: 0.6, ease: "power1.out" }, 0.9);

      return () => {
        tl.kill();
      };
    }

    if (reduced) {
      gsap.set(base, {
        opacity: 0,
        clipPath: "inset(0% 0% 0% 0% round 0.45rem)",
        filter: "none",
      });
      gsap.set(empty, { opacity: 1 });
      gsap.set(glow, { opacity: 0 });
      return;
    }

    gsap.to(base, {
      opacity: 0,
      duration: 0.35,
      ease: "power1.out",
      overwrite: true,
    });
    gsap.set(base, {
      clipPath: "inset(0% 0% 0% 0% round 0.45rem)",
      filter: "none",
    });
    gsap.to(empty, {
      opacity: 1,
      duration: 0.6,
      delay: 0.15,
      ease: "power1.out",
      overwrite: true,
    });
    gsap.to(glow, { opacity: 0, duration: 0.3, overwrite: true });
  }, [finale, reduced]);

  const label = finale
    ? "Divya's completed portrait, assembled from pieces of everything she is."
    : discovered.length === 0
      ? "An empty portrait frame waiting for the pieces of Divya."
      : "Divya's portrait, partly assembled from pieces of her skills.";

  return (
    <div
      ref={frameRef}
      data-portrait-frame
      className="relative"
      style={{ transform: `scale(${FRAME_SCALE})` }}
    >
      <div className="relative rounded-[1.35rem] border border-rose/25 bg-[linear-gradient(145deg,#FFFDF8,#FBEfE7)] p-2.5 shadow-[0_28px_60px_-34px_rgba(73,51,72,0.55)] sm:p-3">
        <span
          aria-hidden
          className="tape -top-2.5 left-1/2 -translate-x-1/2"
        />
        <div
          ref={photoRef}
          data-portrait-photo
          role="img"
          aria-label={label}
          className="relative w-full overflow-visible rounded-[0.45rem] bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,0.94),rgba(252,233,239,0.72)_46%,rgba(236,231,248,0.78))]"
          style={{ aspectRatio: PORTRAIT_ASPECT }}
        >
          <div
            ref={emptyRef}
            data-portrait-empty
            aria-hidden
            className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-3"
          >
            <span className="absolute inset-2 rounded-[0.35rem] border border-dashed border-rose/30" />
            <span className="absolute inset-4 rounded-[0.25rem] border border-rose/10" />
            <span className="flex items-center gap-2 text-rose/45">
              <Star4 className="h-3 w-3 anim-twinkle" />
              <Heart className="h-4 w-4 text-blush-deep/70" />
              <Star4
                className="h-3 w-3 anim-twinkle"
                style={{ animationDelay: "-1.2s" }}
              />
            </span>
            <span className="hand px-6 text-center text-[0.98rem] leading-tight text-plum/40">
              waiting for her pieces
            </span>
            <Sparkle className="h-3.5 w-3.5 text-lavender-deep/45 anim-twinkle" />
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={baseRef}
            data-portrait-base
            src={PORTRAIT_SRC}
            alt=""
            aria-hidden
            width={PORTRAIT_WIDTH}
            height={PORTRAIT_HEIGHT}
            draggable={false}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 z-[12] h-full w-full select-none object-cover opacity-0"
          />

          <div aria-hidden className="absolute inset-0 z-10">
            {portraitFragments.map((fragment, index) => (
              <div
                key={fragment.id}
                data-fragment
                data-fragment-id={fragment.id}
                data-skill={fragment.skill}
                ref={(el) => {
                  fragmentRefs.current[index] = el;
                }}
                className="absolute will-change-transform"
                style={{
                  left: `${fragment.box.x * 100}%`,
                  top: `${fragment.box.y * 100}%`,
                  width: `${fragment.box.w * 100}%`,
                  height: `${fragment.box.h * 100}%`,
                  clipPath: fragment.clip,
                  opacity: 0,
                }}
              >
                <div
                  className="absolute inset-0 bg-no-repeat"
                  style={pieceWash(SKILL_ACCENTS[fragment.skill], index)}
                />
                {index % 3 === 1 ? (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <SkillGlyph
                      id={fragment.skill}
                      className="h-[40%] w-[40%]"
                    />
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <div
            ref={glowRef}
            aria-hidden
            data-portrait-glow
            className="pointer-events-none absolute inset-0 z-[16] rounded-[0.45rem] opacity-0"
            style={{
              background:
                "radial-gradient(circle at 50% 44%, rgba(255,252,245,0.95), rgba(255,228,204,0.5) 36%, rgba(255,240,214,0) 70%)",
            }}
          />

          <div
            aria-hidden
            data-portrait-ring
            className="pointer-events-none absolute inset-0 z-20 rounded-[0.45rem] ring-1 ring-inset ring-[rgba(176,112,140,0.18)]"
          />
        </div>
      </div>
    </div>
  );
}
