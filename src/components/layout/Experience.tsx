"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { IntroGate } from "@/components/invitation/IntroGate";
import { Overture } from "@/components/layout/Overture";
import { PersonalityFiles } from "@/components/personality/PersonalityFiles";
import { ThoughtLab } from "@/components/overthinking/ThoughtLab";
import { SonuCafe } from "@/components/cafe/SonuCafe";
import { MemoryScrapbook } from "@/components/memories/MemoryScrapbook";
import { TalentGallery } from "@/components/gallery/TalentGallery";
import { LetterSection } from "@/components/letter/LetterSection";
import { Finale } from "@/components/finale/Finale";
import { AudioControls } from "@/components/audio/AudioControls";
import {
  AudioProvider,
  useAudioExperience,
} from "@/components/audio/AudioProvider";
import { ChapterIndicator, ChapterRail } from "@/components/common/ChapterNav";
import { SmileButton } from "@/components/common/SmileButton";
import { BrandMark, ScrollTopButton, TopProgress } from "@/components/common/ScrollTop";
import { chapters, type Chapter } from "@/data/site";
import { useActiveChapter } from "@/hooks/useChapterProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToTarget } from "@/animations/useSmoothScroll";

const sectionIds = chapters.map((chapter) => chapter.sectionId);

const StorySections = memo(function StorySections({
  playing,
  onReplay,
}: {
  playing: boolean;
  onReplay: () => void;
}) {
  return (
    <>
      <Overture playing={playing} />
      <PersonalityFiles />
      <ThoughtLab />
      <SonuCafe />
      <MemoryScrapbook />
      <TalentGallery />
      <LetterSection />
      <Finale onReplay={onReplay} />
    </>
  );
});

function ExperienceShell() {
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [gateOpen, setGateOpen] = useState(true);
  const [gateKey, setGateKey] = useState(0);
  const audio = useAudioExperience();

  const activeSection = useActiveChapter(sectionIds);
  const active =
    chapters.find((chapter) => chapter.sectionId === activeSection) ?? chapters[0];
  const { setMood } = audio;

  useEffect(() => {
    if (active.id === "letter") {
      setMood("intimate");
    } else if (active.id === "finale") {
      setMood("bright");
    } else {
      setMood("default");
    }
  }, [active.id, setMood]);

  useEffect(() => {
    if (!gateOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [gateOpen]);


  const handleEnter = useCallback(() => {
    setEntered(true);
    setGateOpen(false);
    window.setTimeout(
      () => scrollToTarget("#chapter-files", { immediate: true }),
      40,
    );
  }, []);

  const handleReplay = useCallback(() => {
    setEntered(false);
    setGateKey((key) => key + 1);
    setGateOpen(true);
    scrollToTarget(0, { immediate: true });
  }, []);

  const handleSelect = useCallback(
    (chapter: Chapter) => {
      audio.playSfx("page");
      if (chapter.sectionId === "top") {
        scrollToTarget(0);
        return;
      }
      scrollToTarget(`#${chapter.sectionId}`);
    },
    [audio],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-cream">
        <a
          href="#chapter-files"
          aria-hidden={!entered}
          inert={!entered}
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[96] focus:rounded-full focus:bg-plum focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-cream"
        >
          Skip to the chapters
        </a>

        <AudioControls visible={entered} />

        <TopProgress visible={entered} />
        <BrandMark visible={entered} />
        <ChapterIndicator active={active} onSelect={handleSelect} visible={entered} />
        <ChapterRail active={active} onSelect={handleSelect} visible={entered} />
        <SmileButton visible={entered} />
        <ScrollTopButton visible={entered} />

        <main
          inert={!entered}
          aria-hidden={!entered}
          className={entered ? "relative" : "pointer-events-none relative"}
        >
          <StorySections playing={entered} onReplay={handleReplay} />
        </main>

        <AnimatePresence>
          {gateOpen ? (
            <IntroGate key={gateKey} onEnter={handleEnter} reduced={reduced} />
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export function Experience() {
  return (
    <AudioProvider>
      <ExperienceShell />
    </AudioProvider>
  );
}
