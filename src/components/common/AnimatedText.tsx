"use client";

import {
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { motion, type Variants } from "motion/react";
import { DUR, EASE_ENTER, STAGGER, VIEWPORT } from "@/animations/motion";
import { cn } from "@/lib/utils";

const wordRise: Variants = {
  hidden: { y: "118%", rotate: 1.2, opacity: 0 },
  show: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: DUR.title, ease: EASE_ENTER },
  },
};

function splitWords(node: ReactNode, keyPrefix: string): ReactNode {
  if (typeof node === "string") {
    if (!node) return null;
    return node
      .split(/(\s+)/)
      .filter(Boolean)
      .map((piece, index) => {
        const key = `${keyPrefix}-${index}`;
        if (/^\s+$/.test(piece)) {
          return <Fragment key={key}>{piece}</Fragment>;
        }
        return (
          <span
            key={key}
            className="-mb-[0.14em] -mr-[0.06em] inline-block overflow-hidden pb-[0.14em] pr-[0.06em] align-bottom"
          >
            <motion.span
              variants={wordRise}
              className="inline-block will-change-transform"
            >
              {piece}
            </motion.span>
          </span>
        );
      });
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <Fragment key={`${keyPrefix}-n${index}`}>
        {splitWords(child, `${keyPrefix}-${index}`)}
      </Fragment>
    ));
  }

  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    if (!element.props.children) return element;
    return cloneElement(
      element,
      undefined,
      splitWords(element.props.children, `${keyPrefix}-e`),
    );
  }

  return node;
}

type WordRevealProps = {
  children: ReactNode;
  className?: string;
  /** When provided, the reveal is controlled instead of viewport-driven. */
  play?: boolean;
  once?: boolean;
  amount?: number;
  delay?: number;
  stagger?: number;
};

/**
 * A masked, word-by-word typographic reveal. It preserves nested markup
 * (italic accents, underlined spans, ids) while giving every word its own
 * clip-mask and staggered rise.
 */
export function WordReveal({
  children,
  className,
  play,
  once = true,
  amount = VIEWPORT.amount,
  delay = 0,
  stagger = STAGGER.word,
}: WordRevealProps) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const content = splitWords(children, "w");

  if (typeof play === "boolean") {
    return (
      <motion.span
        className={cn("inline", className)}
        initial="hidden"
        animate={play ? "show" : "hidden"}
        variants={variants}
      >
        {content}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
    >
      {content}
    </motion.span>
  );
}
