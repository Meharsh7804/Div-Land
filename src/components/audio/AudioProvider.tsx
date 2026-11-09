"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  DivyaAudioEngine,
  type MusicMood,
  type SfxName,
} from "@/lib/audio-engine";
import { site } from "@/data/site";
import { clamp } from "@/lib/utils";

type AudioPreferences = {
  musicOn: boolean;
  sfxOn: boolean;
  musicVolume: number;
  sfxVolume: number;
};

type AudioExperience = AudioPreferences & {
  playing: boolean;
  busy: boolean;
  enableMusic: () => Promise<void>;
  disableMusic: () => void;
  toggleMusic: () => void;
  startIfEnabled: () => Promise<void>;
  stopMusic: () => void;
  setMusicVolume: (value: number) => void;
  setSfxVolume: (value: number) => void;
  setSfxOn: (value: boolean) => void;
  toggleSfx: () => void;
  playSfx: (name: SfxName) => void;
  setMood: (mood: MusicMood) => void;
};

const STORAGE_KEY = "divya-land:audio:v1";

const DEFAULTS: AudioPreferences = {
  musicOn: false,
  sfxOn: true,
  musicVolume: site.music.volume,
  sfxVolume: site.music.sfxVolume,
};

const AudioContext = createContext<AudioExperience | null>(null);

function readPreferences(): AudioPreferences {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<AudioPreferences>;
    return {
      musicOn:
        typeof parsed.musicOn === "boolean" ? parsed.musicOn : DEFAULTS.musicOn,
      sfxOn: typeof parsed.sfxOn === "boolean" ? parsed.sfxOn : DEFAULTS.sfxOn,
      musicVolume:
        typeof parsed.musicVolume === "number"
          ? clamp(parsed.musicVolume, 0, 1)
          : DEFAULTS.musicVolume,
      sfxVolume:
        typeof parsed.sfxVolume === "number"
          ? clamp(parsed.sfxVolume, 0, 1)
          : DEFAULTS.sfxVolume,
    };
  } catch {
    return DEFAULTS;
  }
}

const listeners = new Set<() => void>();
let cachedPreferences: AudioPreferences | null = null;

function getPreferencesSnapshot() {
  if (typeof window === "undefined") return DEFAULTS;
  cachedPreferences ??= readPreferences();
  return cachedPreferences;
}

function getServerPreferencesSnapshot() {
  return DEFAULTS;
}

function subscribePreferences(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function mutatePreferences(
  updater: (current: AudioPreferences) => AudioPreferences,
) {
  const next = updater(getPreferencesSnapshot());
  cachedPreferences = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* preference storage can be unavailable */
  }
  listeners.forEach((listener) => listener());
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const preferences = useSyncExternalStore(
    subscribePreferences,
    getPreferencesSnapshot,
    getServerPreferencesSnapshot,
  );
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const engineRef = useRef<DivyaAudioEngine | null>(null);
  const preferencesRef = useRef(preferences);
  const moodRef = useRef<MusicMood>("default");

  useEffect(() => {
    preferencesRef.current = preferences;
  }, [preferences]);

  useEffect(() => {
    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  const ensureEngine = useCallback(() => {
    if (engineRef.current) return engineRef.current;
    try {
      const current = preferencesRef.current;
      engineRef.current = new DivyaAudioEngine({
        musicVolume: current.musicVolume,
        sfxVolume: current.sfxOn ? current.sfxVolume : 0,
      });
      engineRef.current.setMood(moodRef.current);
      return engineRef.current;
    } catch {
      return null;
    }
  }, []);

  const enableMusic = useCallback(async () => {
    mutatePreferences((current) => ({ ...current, musicOn: true }));
    setBusy(true);
    try {
      const engine = ensureEngine();
      if (!engine) {
        mutatePreferences((current) => ({ ...current, musicOn: false }));
        return;
      }
      await engine.resume();
      const current = preferencesRef.current;
      engine.setSfxVolume(current.sfxOn ? current.sfxVolume : 0);
      engine.startMusic(current.musicVolume);
      setPlaying(true);
    } catch {
      setPlaying(false);
    } finally {
      setBusy(false);
    }
  }, [ensureEngine]);

  const stopMusic = useCallback(() => {
    engineRef.current?.stopMusic();
    setPlaying(false);
  }, []);

  const disableMusic = useCallback(() => {
    mutatePreferences((current) => ({ ...current, musicOn: false }));
    stopMusic();
  }, [stopMusic]);

  const toggleMusic = useCallback(() => {
    if (preferencesRef.current.musicOn) {
      disableMusic();
    } else {
      void enableMusic();
    }
  }, [disableMusic, enableMusic]);

  const startIfEnabled = useCallback(async () => {
    if (!preferencesRef.current.musicOn) return;
    await enableMusic();
  }, [enableMusic]);

  const setMusicVolume = useCallback((value: number) => {
    const volume = clamp(value, 0, 1);
    mutatePreferences((current) => ({ ...current, musicVolume: volume }));
    engineRef.current?.setMusicVolume(volume);
  }, []);

  const setSfxVolume = useCallback((value: number) => {
    const volume = clamp(value, 0, 1);
    mutatePreferences((current) => ({ ...current, sfxVolume: volume }));
    engineRef.current?.setSfxVolume(
      preferencesRef.current.sfxOn ? volume : 0,
    );
  }, []);

  const setSfxOn = useCallback((value: boolean) => {
    mutatePreferences((current) => ({ ...current, sfxOn: value }));
    engineRef.current?.setSfxVolume(
      value ? preferencesRef.current.sfxVolume : 0,
    );
  }, []);

  const toggleSfx = useCallback(() => {
    setSfxOn(!preferencesRef.current.sfxOn);
  }, [setSfxOn]);

  const setMood = useCallback((mood: MusicMood) => {
    moodRef.current = mood;
    engineRef.current?.setMood(mood);
  }, []);

  const playSfx = useCallback(
    (name: SfxName) => {
      const current = preferencesRef.current;
      if (!current.sfxOn || current.sfxVolume <= 0) return;
      const engine = ensureEngine();
      if (!engine) return;
      engine.setSfxVolume(current.sfxVolume);
      void engine
        .resume()
        .then(() => engine.playSfx(name))
        .catch(() => undefined);
    },
    [ensureEngine],
  );

  const value = useMemo<AudioExperience>(
    () => ({
      ...preferences,
      playing,
      busy,
      enableMusic,
      disableMusic,
      toggleMusic,
      startIfEnabled,
      stopMusic,
      setMusicVolume,
      setSfxVolume,
      setSfxOn,
      toggleSfx,
      playSfx,
      setMood,
    }),
    [
      preferences,
      playing,
      busy,
      enableMusic,
      disableMusic,
      toggleMusic,
      startIfEnabled,
      stopMusic,
      setMusicVolume,
      setSfxVolume,
      setSfxOn,
      toggleSfx,
      playSfx,
      setMood,
    ],
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudioExperience() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioExperience must be used inside AudioProvider");
  }
  return context;
}
