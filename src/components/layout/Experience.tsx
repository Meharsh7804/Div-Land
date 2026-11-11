"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { IntroGate } from "@/components/invitation/IntroGate";
import { Overture } from "@/components/layout/Overture";
import { PersonalityFiles } from "@/components/personality/PersonalityFiles";
import { ThoughtLab } from "@/components/overthinking/ThoughtLab";
import { SonuCafe } from "@/components/cafe/SonuCafe";
import { MemoryScrapbook } from "@/components/memories/MemoryScrapbook";
import { MakingOfDivya } from "@/components/making/MakingOfDivya";
import { LetterSection } from "@/components/letter/LetterSection";
import { Finale } from "@/components/finale/Finale";
import {
  AudioProvider,
  useAudioExperience,
} from "@/components/audio/AudioProvider";
import { ChapterRail } from "@/components/common/ChapterNav";
import { SceneTransition } from "@/components/common/SceneTransition";
import { ScrollTopButton, TopProgress } from "@/components/common/ScrollTop";
import { JourneyContinue } from "@/components/journey/JourneyContinue";
import {
  JourneyProvider,
  useJourney,
} from "@/components/journey/JourneyProvider";
import { chapters, type Chapter } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToTarget } from "@/animations/useSmoothScroll";
import { EASE_ENTER } from "@/animations/motion";

const StorySections = memo(function StorySections({
  playing,
  onReplay,
  currentIndex,
}: {
  playing: boolean;
  onReplay: () => void;
  currentIndex: number;
}) {
  const views = [
    <Overture key="overture" playing={playing} />,
    <PersonalityFiles key="files" />,
    <ThoughtLab key="overthinking" />,
    <SonuCafe key="cafe" />,
    <MemoryScrapbook key="memories" />,
    <MakingOfDivya key="making" />,
    <LetterSection key="letter" />,
    <Finale key="finale" onReplay={onReplay} />,
  ];

  return (
    <>
      {views.map((view, index) => (
        <div
          key={chapters[index].id}
          hidden={index !== currentIndex}
          aria-hidden={index !== currentIndex}
          inert={index !== currentIndex}
        >
          {view}
        </div>
      ))}
    </>
  );
});

function ExperienceShell() {
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [gateOpen, setGateOpen] = useState(true);
  const [gateKey, setGateKey] = useState(0);
  const [storyKey, setStoryKey] = useState(0);
  const mainRef = useRef<HTMLElement | null>(null);
  const audio = useAudioExperience();
  const {
    currentIndex,
    furthestIndex,
    goTo,
    reset: resetJourney,
    isUnlocked,
  } = useJourney();

  const active = chapters[currentIndex] ?? chapters[0];
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

  useEffect(() => {
    if (!entered || gateOpen) return;
    const frame = window.requestAnimationFrame(() =>
      scrollToTarget(0, { immediate: true }),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [currentIndex, entered, gateOpen]);


  const handleEnter = useCallback(() => {
    setEntered(true);
    window.setTimeout(
      () => scrollToTarget("#top", { immediate: true }),
      60,
    );
  }, []);

  const handleComplete = useCallback(() => {
    setGateOpen(false);
    window.requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const handleReplay = useCallback(() => {
    resetJourney();
    setStoryKey((key) => key + 1);
    setEntered(false);
    setGateKey((key) => key + 1);
    setGateOpen(true);
    scrollToTarget(0, { immediate: true });
  }, [resetJourney]);

  const handleSelect = useCallback(
    (chapter: Chapter) => {
      const index = chapters.findIndex((item) => item.id === chapter.id);
      if (index < 0 || !isUnlocked(index)) return;
      audio.playSfx("page");
      if (index === currentIndex) {
        scrollToTarget(0);
        return;
      }
      goTo(index);
    },
    [audio, currentIndex, goTo, isUnlocked],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-cream">
        <div aria-hidden className="visual-grain" />

        <a
          href={`#${active.sectionId}`}
          aria-hidden={!chromeVisible}
          inert={!chromeVisible}
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[96] focus:rounded-full focus:bg-plum focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-cream"
        >
          Skip to the current chapter
        </a>

        <TopProgress visible={chromeVisible} />
        <ChapterRail
          active={active}
          onSelect={handleSelect}
          visible={chromeVisible}
          unlockedIndex={furthestIndex}
        />
        <JourneyContinue visible={chromeVisible} />
        <ScrollTopButton visible={chromeVisible} />
        <SceneTransition active={active} visible={chromeVisible} reduced={reduced} />

        <main
          ref={mainRef}
          tabIndex={-1}
          inert={!entered}
          aria-hidden={!entered}
          className={
            entered
              ? "relative focus:outline-none"
              : "pointer-events-none relative focus:outline-none"
          }
        >
          <motion.div
            initial={false}
            animate={{ opacity: entered ? 1 : 0 }}
            transition={{ duration: entered ? 1.4 : 0.4, ease: EASE_ENTER }}
          >
            <StorySections
              key={storyKey}
              playing={entered}
              onReplay={handleReplay}
              currentIndex={currentIndex}
            />
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
    <JourneyProvider>
      <AudioProvider>
        <ExperienceShell />
      </AudioProvider>
    </JourneyProvider>
  );
}
