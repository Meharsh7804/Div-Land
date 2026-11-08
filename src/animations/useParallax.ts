"use client";

import { useEffect } from "react";

/**
 * Runs a callback once when the element enters the viewport.
 */
export function useOnceInView(
  ref: React.RefObject<HTMLElement | null>,
  onEnter: () => void,
  threshold = 0.3,
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fired) {
            fired = true;
            onEnter();
            observer.disconnect();
          }
        });
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, onEnter, threshold]);
}
