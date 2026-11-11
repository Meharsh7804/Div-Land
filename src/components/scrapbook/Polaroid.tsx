"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PolaroidProps = {
  caption?: string;
  rotate?: number;
  className?: string;
  frameClassName?: string;
  captionClassName?: string;
  src?: string;
  alt?: string;
  objectPosition?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

/**
 * A physical-feeling polaroid: cream card stock, a square window and a
 * handwritten caption along the bottom. Rotation is applied with the CSS
 * `rotate` property so hover lift and GSAP transforms never fight it.
 */
export function Polaroid({
  caption,
  rotate = 0,
  className,
  frameClassName,
  captionClassName,
  src,
  alt = "",
  objectPosition,
  children,
  style,
}: PolaroidProps) {
  return (
    <figure
      className={cn("sb-polaroid", className)}
      style={{ rotate: `${rotate}deg`, ...style }}
    >
      <div className={cn("sb-polaroid-frame", frameClassName)}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={objectPosition ? { objectPosition } : undefined}
          />
        ) : (
          children
        )}
      </div>
      {caption ? (
        <figcaption
          className={cn(
            "hand absolute inset-x-0 bottom-1 px-2 text-center text-[0.92rem] leading-none text-plum/70",
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
