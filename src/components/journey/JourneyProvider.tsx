"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { chapters } from "@/data/site";

type CompletedMap = Record<string, boolean>;

type JourneyContextValue = {
  currentIndex: number;
  furthestIndex: number;
  completed: CompletedMap;
  total: number;
  activeId: string;
  isComplete: (id: string) => boolean;
  isUnlocked: (index: number) => boolean;
  markComplete: (id: string) => void;
  goTo: (index: number) => void;
  goNext: () => void;
  reset: () => void;
};

const JourneyContext = createContext<JourneyContextValue | null>(null);

const INITIAL_COMPLETED: CompletedMap = { invitation: true };

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [furthestIndex, setFurthestIndex] = useState(0);
  const [completed, setCompleted] = useState<CompletedMap>(INITIAL_COMPLETED);

  const markComplete = useCallback((id: string) => {
    setCompleted((previous) =>
      previous[id] ? previous : { ...previous, [id]: true },
    );
  }, []);

  const isComplete = useCallback(
    (id: string) => Boolean(completed[id]),
    [completed],
  );

  const isUnlocked = useCallback(
    (index: number) => index >= 0 && index <= furthestIndex,
    [furthestIndex],
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(
        0,
        Math.min(index, furthestIndex, chapters.length - 1),
      );
      setCurrentIndex((previous) => (previous === clamped ? previous : clamped));
    },
    [furthestIndex],
  );

  const goNext = useCallback(() => {
    if (currentIndex >= chapters.length - 1) return;
    const current = chapters[currentIndex];
    if (!current || !completed[current.id]) return;
    const next = currentIndex + 1;
    setFurthestIndex((previous) => Math.max(previous, next));
    setCurrentIndex(next);
  }, [completed, currentIndex]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setFurthestIndex(0);
    setCompleted(INITIAL_COMPLETED);
  }, []);

  const value = useMemo<JourneyContextValue>(
    () => ({
      currentIndex,
      furthestIndex,
      completed,
      total: chapters.length,
      activeId: chapters[currentIndex]?.id ?? chapters[0].id,
      isComplete,
      isUnlocked,
      markComplete,
      goTo,
      goNext,
      reset,
    }),
    [
      completed,
      currentIndex,
      furthestIndex,
      goNext,
      goTo,
      isComplete,
      isUnlocked,
      markComplete,
      reset,
    ],
  );

  return (
    <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error("useJourney must be used inside JourneyProvider");
  }
  return context;
}

export function useChapterGate(id: string) {
  const { activeId, isComplete, markComplete } = useJourney();
  return {
    active: activeId === id,
    complete: isComplete(id),
    markComplete,
  };
}
