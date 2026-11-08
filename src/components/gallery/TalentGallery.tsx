"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { SparkleField } from "@/components/common/Ambient";
import { Diya, Flower, Star4 } from "@/components/common/Illustrations";
import { gallery, type GalleryPiece } from "@/data/gallery";
import { cn } from "@/lib/utils";
import { MiniArt, RangoliArt } from "./RangoliArt";

function Garland() {
  const flowers = Array.from({ length: 18 }, (_, i) => {
    const t = i / 17;
    return {
      left: 1.5 + t * 97,
      top: 6 + Math.sin(t * Math.PI) * 34,
      size: 12 + (i % 3) * 4,
      color: ["#FFF0B8", "#FFDCCB", "#F6DCE7"][i % 3],
      delay: (i % 5) * 0.4,
    };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28 overflow-hidden">
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-24 w-full"
      >
        <path d="M0 10 Q250 86 500 32 T1000 10" fill="none" stroke="#C98EA8" strokeWidth="1.6" opacity=".55" />
        <path d="M0 16 Q250 92 500 38 T1000 16" fill="none" stroke="#FFF0B8" strokeWidth="1" opacity=".25" />
      </svg>
      {flowers.map((flower, i) => (
        <span
          key={i}
          className="absolute anim-sway"
          style={{
            left: `${flower.left}%`,
            top: `${flower.top}%`,
            width: flower.size,
            height: flower.size,
            animationDelay: `${flower.delay}s`,
            animationDuration: `${4.5 + (i % 4) * 0.6}s`,
          }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse key={deg} cx="12" cy="7" rx="3.2" ry="5.2" fill={flower.color} transform={`rotate(${deg} 12 12)`} />
            ))}
            <circle cx="12" cy="12" r="2.8" fill="#C98EA8" />
            <circle cx="12" cy="12" r="1" fill="#FFF9F0" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function FloatingDiya({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <Diya
      aria-hidden
      className={cn("pointer-events-none absolute anim-float", className)}
      style={{ animationDelay: `${delay}s`, animationDuration: "6s" }}
    />
  );
}

function GalleryFrame({ piece, index }: { piece: GalleryPiece; index: number }) {
  const rotations = ["-1.2deg", "1deg", "-0.6deg", "0.8deg"];
  return (
    <Reveal
      delay={index * 0.09}
      y={38}
      direction={index === 1 ? "down" : "up"}
      className="h-full"
    >
      <figure className="group">
        <div
          className="relative rounded-[0.7rem] border border-butter/35 bg-[#FFFBF3] p-2.5 shadow-[0_24px_50px_-30px_rgba(0,0,0,.8)] transition-transform duration-500 [transform:rotate(var(--rot))] hover:[transform:rotate(0deg)] hover:-translate-y-1 sm:p-3"
          style={{ ["--rot" as string]: rotations[index % rotations.length] }}
        >
          <div className="sheen relative overflow-hidden rounded-[0.35rem] bg-cream">
            <div className="relative aspect-[4/4.4]">
              {piece.image ? (
                <Image
                  src={piece.image}
                  alt={`${piece.title} — ${piece.medium}`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
                  <MiniArt kind={piece.art} />
                </div>
              )}
            </div>
            <span className="absolute left-2 top-2 rounded-full border border-butter/40 bg-plum/90 px-2 py-0.5 text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-cream/80">
              exhibit {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 px-1 pt-2">
            <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.14em] text-plum/45">
              {piece.medium}
            </span>
            <span className="h-px flex-1 bg-plum/10" />
            <Star4 className="h-2 w-2 text-rose-deep/60" />
          </div>
        </div>
        <figcaption className="mt-3 px-1">
          <p className="font-display text-[1.15rem] leading-tight text-cream">
            {piece.title}
          </p>
          <p className="mt-1 text-[0.74rem] leading-snug text-cream/55">
            {piece.note}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function TalentGallery() {
  return (
    <section
      id="chapter-gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_20%,#5B3F58_0%,#3B2838_48%,#2A1C29_100%)] section-pad"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <SparkleField count={24} seed={77} tone="text-butter" className="opacity-70" />
        <div className="absolute left-1/2 top-0 h-[44rem] w-[min(66rem,120vw)] -translate-x-1/2 -rotate-[16deg] bg-[linear-gradient(112deg,transparent_32%,rgba(255,240,184,.11)_49%,transparent_66%)] blur-2xl" />
        <div className="absolute left-1/2 top-[38%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,240,184,.13),transparent_65%)]" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-rose/10 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-lavender/10 blur-3xl" />
      </div>

      <Garland />

      <div className="section-shell relative z-[1] pt-10">
        <SectionHeading
          number="06"
          sceneId="gallery"
          variant="marquee"
          tone="light"
          eyebrow={gallery.eyebrow}
          title={<span id="gallery-title">{gallery.title}</span>}
          script={gallery.script}
        />

        <div className="mt-10 grid items-center gap-10 sm:mt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="relative order-1 mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:order-2 lg:max-w-[34rem]">
            <div className="relative aspect-square w-full">
              <div
                aria-hidden
                className="absolute inset-[-4%] rounded-full border border-dashed border-butter/20"
              />
              <div
                aria-hidden
                className="absolute inset-[4%] rounded-full border border-dashed border-blush/15"
              />
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <RangoliArt />
              </div>

              <FloatingDiya className="left-[-2%] top-[4%] h-10 w-10 sm:h-12 sm:w-12" />
              <FloatingDiya className="right-[-1%] top-[1%] h-9 w-9 sm:h-11 sm:w-11" delay={-1.5} />
              <FloatingDiya className="bottom-[2%] left-[2%] h-9 w-9 sm:h-11 sm:w-11" delay={-3} />
              <FloatingDiya className="bottom-[5%] right-[-2%] h-10 w-10 sm:h-12 sm:w-12" delay={-4.5} />

              <Star4 className="absolute left-[14%] top-0 h-3 w-3 text-butter anim-twinkle" />
              <Star4 className="absolute right-[10%] top-[20%] h-2.5 w-2.5 text-blush anim-twinkle" style={{ animationDelay: "1.2s" }} />
              <Flower className="absolute bottom-[10%] left-[6%] h-5 w-5 opacity-60 anim-sway" />
            </div>

            <div className="mt-2 flex flex-col items-center gap-1">
              <p className="hand text-center text-[1.25rem] leading-tight text-blush/75">
                one artist, many mediums
              </p>
              <p className="text-center text-[0.64rem] font-extrabold uppercase tracking-[0.22em] text-cream/30">
                rangoli · paint · pencil · whatever&apos;s in reach
              </p>
            </div>
          </div>

          <div className="order-2 lg:order-1">
            <Reveal>
              <div className="relative overflow-hidden rounded-[1.5rem] border border-butter/30 bg-[#FFFBF3] p-5 shadow-[0_30px_70px_-40px_rgba(0,0,0,.9)] sm:p-7">
                <span className="absolute left-3 top-3 h-2 w-2 rounded-full border border-plum/25 bg-blush" />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full border border-plum/25 bg-lavender" />
                <p className="eyebrow text-rose-deep/80">exhibit label · gallery 06</p>
                <p className="mt-3 font-display text-[clamp(1.6rem,4.6vw,2.25rem)] italic leading-[1.15] text-plum">
                  &ldquo;{gallery.message}&rdquo;
                </p>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-ink/70">
                  {gallery.body}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-rose-deep/25 bg-blush/30 px-2.5 py-1 text-[0.64rem] font-extrabold uppercase tracking-[0.14em] text-rose-deep/80">
                    rangoli · paint · pencil
                  </span>
                  <span className="rounded-full border border-plum/15 bg-lavender/40 px-2.5 py-1 text-[0.64rem] font-extrabold uppercase tracking-[0.14em] text-plum/65">
                    range · suspicious
                  </span>
                  <span className="rounded-full border border-plum/15 bg-butter/50 px-2.5 py-1 text-[0.64rem] font-extrabold uppercase tracking-[0.14em] text-plum/65">
                    chhota packet · bada dhamaka
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-dashed border-plum/15 pt-4">
                  <p className="hand text-[1.25rem] leading-tight text-rose-deep/85">
                    {gallery.note}
                  </p>
                  <div className="relative flex h-14 w-14 shrink-0 -rotate-12 flex-col items-center justify-center rounded-full border-2 border-rose-deep/35 text-center">
                    <span className="text-[0.58rem] font-extrabold uppercase leading-tight tracking-[0.1em] text-rose-deep/70">
                      certified
                      <br />
                      multi
                      <br />
                      talented
                    </span>
                    <Star4 className="absolute -right-1 -top-1 h-3 w-3 text-butter" />
                  </div>
                </div>
              </div>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-4 flex items-center gap-3 rounded-[1rem] border border-cream/10 bg-cream/[0.08] px-4 py-3"
            >
              <Diya className="h-9 w-9 shrink-0" />
              <p className="text-[0.76rem] leading-snug text-cream/60">
                Made by hand, with more patience than most people have, and a
                level of detail that&apos;s honestly a bit unfair.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {gallery.pieces.map((piece, index) => (
            <GalleryFrame key={piece.id} piece={piece} index={index} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-cream/15" />
            <SparkleField count={1} seed={3} tone="text-butter" className="relative h-3 w-3" />
            <span className="h-px w-10 bg-cream/15" />
          </div>
          <p className="hand text-[1.35rem] text-cream/45">
            some talents refuse to fit in one frame
          </p>
        </div>
      </div>
    </section>
  );
}
