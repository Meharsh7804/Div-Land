"use client";

import { useEffect, useState } from "react";

/**
 * True below the given width (767px by default). Useful for skipping
 * scroll-linked effects and heavy overlays on phones.
 */
export function useCompact(maxWidth = 767) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [maxWidth]);

  return compact;
}
