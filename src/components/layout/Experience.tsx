"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { IntroGate } from "@/components/invitation/IntroGate";
import { Overture } from "@/components/layout/Overture";
import { PersonalityFiles } from "@/components/personality/PersonalityFiles";
import { ThoughtLab } from "@/components/overthinking/ThoughtLab";
import { SonuCafe } from "@/components/cafe/SonuCafe";
import { MemoryScrapbook } from "@/components/memories/MemoryScrapbook";
import { ManyWorlds } from "@/components/worlds/ManyWorlds";
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
import { EASE_ENTER } from "@/animations/motion";

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
      <ManyWorlds />
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
  const chromeVisible = entered && !gateOpen;
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
    if (!gateOpen || entered) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [gateOpen, entered]);


  const handleEnter = useCallback(() => {
    setEntered(true);
    window.setTimeout(
      () => scrollToTarget("#chapter-files", { immediate: true }),
      60,
    );
  }, []);

  const handleComplete = useCallback(() => {
    setGateOpen(false);
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
          aria-hidden={!chromeVisible}
          inert={!chromeVisible}
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[96] focus:rounded-full focus:bg-plum focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-cream"
        >
          Skip to the chapters
        </a>

        <AudioControls visible={chromeVisible} />

        <TopProgress visible={chromeVisible} />
        <BrandMark visible={chromeVisible} />
        <ChapterIndicator active={active} onSelect={handleSelect} visible={chromeVisible} />
        <ChapterRail active={active} onSelect={handleSelect} visible={chromeVisible} />
        <SmileButton visible={chromeVisible} />
        <ScrollTopButton visible={chromeVisible} />

        <main
          inert={!entered}
          aria-hidden={!entered}
          className={entered ? "relative" : "pointer-events-none relative"}
        >
          <motion.div
            initial={false}
            animate={{ opacity: entered ? 1 : 0 }}
            transition={{ duration: entered ? 1.4 : 0.4, ease: EASE_ENTER }}
          >
            <StorySections playing={entered} onReplay={handleReplay} />
          </motion.div>
        </main>

        <AnimatePresence>
          {gateOpen ? (
            <IntroGate
              key={gateKey}
              onEnter={handleEnter}
              onComplete={handleComplete}
              reduced={reduced}
            />
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
