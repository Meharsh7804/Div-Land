"use client";

import { useEffect } from "react";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { LetterSection } from "@/components/letter/LetterSection";

export default function PreviewLetterPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("open")) return;
    const target = document.querySelector<HTMLButtonElement>(
      '[aria-label="Open the letter for Sonu"]',
    );
    target?.scrollIntoView({ block: "center" });
    const timer = window.setTimeout(() => target?.click(), 350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AudioProvider>
      <main className="min-h-screen bg-cream">
        <LetterSection />
      </main>
    </AudioProvider>
  );
}
