"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which chapter is currently in the reading zone. State only changes
 * when the active chapter actually changes, so the page tree stays quiet
 * while scrolling.
 */
export function useActiveChapter(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(
    sectionIds[0] ?? null,
  );

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.42;
      let current = sectionIds[0] ?? null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= readingLine) current = id;
      }

      setActiveSection((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const timeout = window.setTimeout(update, 600);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return activeSection;
}
