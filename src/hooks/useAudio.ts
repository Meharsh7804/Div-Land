"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Mode = "file" | "ambient" | null;

type AmbientHandles = {
  ctx: AudioContext;
  master: GainNode;
  stop: () => void;
};

const CHIME_NOTES = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];

function createAmbient(volume: number): AmbientHandles | null {
  const AudioCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtor) return null;

  const ctx = new AudioCtor();
  if (ctx.state === "suspended") {
    void ctx.resume().catch(() => undefined);
  }
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, ctx.currentTime);
  master.gain.exponentialRampToValueAtTime(
    Math.max(0.02, volume * 0.16),
    ctx.currentTime + 2.4,
  );

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1100;
  filter.Q.value = 0.4;
  filter.connect(master);
  master.connect(ctx.destination);

  const padFrequencies = [130.81, 164.81, 196.0, 261.63];
  const oscillators: OscillatorNode[] = [];
  const padGains: GainNode[] = [];

  padFrequencies.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    osc.type = index % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;
    osc.detune.value = (index - 1.5) * 4;

    const gain = ctx.createGain();
    gain.gain.value = 0.045 / (index * 0.35 + 1);

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045 + index * 0.012;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = gain.gain.value * 0.55;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();

    osc.connect(gain);
    gain.connect(filter);
    osc.start();

    oscillators.push(osc, lfo);
    padGains.push(gain);
  });

  let stopped = false;

  const playChime = () => {
    if (stopped) return;
    const note =
      CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)] *
      (Math.random() > 0.72 ? 2 : 1);
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = note;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.075, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.2);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 5.4);

    const overtone = ctx.createOscillator();
    const overtoneGain = ctx.createGain();
    overtone.type = "sine";
    overtone.frequency.value = note * 2.01;
    overtoneGain.gain.setValueAtTime(0.0001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.022, now + 0.1);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);
    overtone.connect(overtoneGain);
    overtoneGain.connect(master);
    overtone.start(now);
    overtone.stop(now + 3.6);
  };

  const chimeTimer = window.setInterval(playChime, 8200);
  const firstChime = window.setTimeout(playChime, 2600);

  const stop = () => {
    if (stopped) return;
    stopped = true;
    window.clearInterval(chimeTimer);
    window.clearTimeout(firstChime);
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
    oscillators.forEach((osc) => {
      try {
        osc.stop(now + 0.9);
      } catch {
        /* already stopped */
      }
    });
    padGains.forEach((gain) => {
      try {
        gain.disconnect();
      } catch {
        /* noop */
      }
    });
    window.setTimeout(() => {
      void ctx.close().catch(() => undefined);
    }, 1100);
  };

  return { ctx, master, stop };
}

/**
 * Music is opt-in. We try a real audio file first (see data/site.ts), and if
 * there isn't one — or it fails to play — we fall back to a gentle, original
 * ambient soundscape generated live with the Web Audio API.
 */
export function useAudio(src: string, volume = 0.32) {
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [busy, setBusy] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<AmbientHandles | null>(null);
  const starting = useRef(false);
  const alive = useRef(true);

  const teardown = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (ambientRef.current) {
      ambientRef.current.stop();
      ambientRef.current = null;
    }
  }, []);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      teardown();
    };
  }, [teardown]);

  const stop = useCallback(() => {
    teardown();
    setPlaying(false);
    setMode(null);
    setBusy(false);
  }, [teardown]);

  const start = useCallback(async () => {
    if (starting.current || ambientRef.current || audioRef.current) return;
    starting.current = true;
    setBusy(true);
    try {
      if (src) {
        try {
          const audio = new Audio(src);
          audio.loop = true;
          audio.volume = volume;
          audio.preload = "auto";
          audioRef.current = audio;
          await audio.play();
          if (!alive.current) {
            audio.pause();
            return;
          }
          setMode("file");
          setPlaying(true);
          return;
        } catch {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
          }
        }
      }

      const ambient = createAmbient(volume);
      if (!ambient) return;
      if (!alive.current) {
        ambient.stop();
        return;
      }
      ambientRef.current = ambient;
      setMode("ambient");
      setPlaying(true);
    } finally {
      starting.current = false;
      if (alive.current) setBusy(false);
    }
  }, [src, volume]);

  const toggle = useCallback(async () => {
    if (playing) stop();
    else await start();
  }, [playing, start, stop]);

  return { playing, mode, busy, toggle, stop };
}
