export type SfxName =
  | "gate"
  | "garden"
  | "enter"
  | "page"
  | "coffee"
  | "envelope"
  | "lights"
  | "spark"
  | "candle"
  | "finale"
  | "gift";

export type MusicMood = "default" | "intimate" | "bright" | "celebration";

type EngineOptions = {
  musicVolume: number;
  sfxVolume: number;
};

type Chord = {
  bass: number;
  pad: number[];
  arp: number[];
  melody: number[];
};

const BPM = 72;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const SCHEDULE_AHEAD = 1.1;
const SCHEDULER_MS = 180;
const MUSIC_LEVEL = 0.55;
const SFX_LEVEL = 0.62;

const MOOD_LEVEL: Record<MusicMood, number> = {
  default: 1,
  intimate: 0.54,
  bright: 1.06,
  celebration: 1.22,
};

const CHORDS: Chord[] = [
  {
    bass: 130.81,
    pad: [261.63, 329.63, 392, 493.88],
    arp: [261.63, 329.63, 392, 493.88, 587.33, 493.88, 392, 329.63],
    melody: [659.25, 783.99, 987.77],
  },
  {
    bass: 110,
    pad: [220, 261.63, 329.63, 392],
    arp: [220, 261.63, 329.63, 392, 493.88, 392, 329.63, 261.63],
    melody: [523.25, 659.25, 783.99],
  },
  {
    bass: 87.31,
    pad: [174.61, 220, 261.63, 329.63],
    arp: [174.61, 261.63, 329.63, 440, 523.25, 440, 329.63, 261.63],
    melody: [698.46, 880, 1046.5],
  },
  {
    bass: 98,
    pad: [196, 246.94, 293.66, 392],
    arp: [196, 246.94, 293.66, 392, 493.88, 392, 293.66, 246.94],
    melody: [587.33, 783.99, 987.77],
  },
  {
    bass: 130.81,
    pad: [261.63, 329.63, 392, 493.88],
    arp: [261.63, 329.63, 392, 493.88, 587.33, 493.88, 392, 329.63],
    melody: [783.99, 987.77, 1046.5],
  },
  {
    bass: 164.81,
    pad: [329.63, 392, 493.88, 587.33],
    arp: [164.81, 246.94, 329.63, 392, 493.88, 392, 329.63, 246.94],
    melody: [659.25, 783.99, 987.77],
  },
  {
    bass: 87.31,
    pad: [174.61, 220, 261.63, 329.63],
    arp: [174.61, 261.63, 329.63, 440, 523.25, 440, 329.63, 261.63],
    melody: [698.46, 880, 1046.5],
  },
  {
    bass: 98,
    pad: [196, 246.94, 293.66, 392],
    arp: [196, 246.94, 293.66, 392, 493.88, 392, 293.66, 246.94],
    melody: [587.33, 783.99, 1046.5],
  },
];

const MOTIFS = [
  [
    { beat: 0.5, note: 1 },
    { beat: 1.75, note: 2 },
    { beat: 3, note: 0 },
  ],
  [
    { beat: 0, note: 0 },
    { beat: 1.5, note: 1 },
    { beat: 2.75, note: 2 },
  ],
  [
    { beat: 0.75, note: 2 },
    { beat: 2, note: 1 },
    { beat: 3.5, note: 0 },
  ],
  [
    { beat: 0.25, note: 0 },
    { beat: 1.75, note: 2 },
    { beat: 3.25, note: 1 },
  ],
];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const humanize = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return (value - Math.floor(value) - 0.5) * 0.018;
};

export class DivyaAudioEngine {
  private ctx: AudioContext;
  private master: GainNode;
  private musicBus: GainNode;
  private sfxBus: GainNode;
  private reverb: ConvolverNode;
  private musicSend: GainNode;
  private sfxSend: GainNode;
  private noise: AudioBuffer | null = null;
  private musicVolume: number;
  private sfxVolume: number;
  private musicMood: MusicMood = "default";
  private musicRunning = false;
  private schedulerTimer: number | null = null;
  private nextBarTime = 0;
  private barIndex = 0;

  constructor({ musicVolume, sfxVolume }: EngineOptions) {
    const AudioCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtor) throw new Error("Web Audio is not available");

    this.ctx = new AudioCtor({ latencyHint: "interactive" });
    this.musicVolume = clamp(musicVolume);
    this.sfxVolume = clamp(sfxVolume);

    this.master = this.ctx.createGain();
    this.master.gain.value = 0.86;

    const compressor = this.ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 20;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.004;
    compressor.release.value = 0.25;

    this.master.connect(compressor);
    compressor.connect(this.ctx.destination);

    this.musicBus = this.ctx.createGain();
    this.musicBus.gain.value = 0.0001;
    this.musicBus.connect(this.master);

    this.sfxBus = this.ctx.createGain();
    this.sfxBus.gain.value = Math.max(0.0001, this.sfxVolume * SFX_LEVEL);
    this.sfxBus.connect(this.master);

    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = this.makeImpulse();

    const reverbFilter = this.ctx.createBiquadFilter();
    reverbFilter.type = "lowpass";
    reverbFilter.frequency.value = 3400;

    const reverbReturn = this.ctx.createGain();
    reverbReturn.gain.value = 0.32;

    this.musicSend = this.ctx.createGain();
    this.musicSend.gain.value = 0.38;
    this.musicBus.connect(this.musicSend);
    this.musicSend.connect(this.reverb);

    this.sfxSend = this.ctx.createGain();
    this.sfxSend.gain.value = 0.2;
    this.sfxBus.connect(this.sfxSend);
    this.sfxSend.connect(this.reverb);

    this.reverb.connect(reverbFilter);
    reverbFilter.connect(reverbReturn);
    reverbReturn.connect(this.master);
  }

  private makeImpulse() {
    const seconds = 2.8;
    const length = Math.floor(this.ctx.sampleRate * seconds);
    const impulse = this.ctx.createBuffer(2, length, this.ctx.sampleRate);
    for (let channel = 0; channel < 2; channel += 1) {
      const data = impulse.getChannelData(channel);
      for (let i = 0; i < length; i += 1) {
        const fade = Math.pow(1 - i / length, 3.4);
        data[i] = (Math.random() * 2 - 1) * fade;
      }
    }
    return impulse;
  }

  private getNoise() {
    if (this.noise) return this.noise;
    const length = Math.floor(this.ctx.sampleRate * 2.2);
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noise = buffer;
    return buffer;
  }

  private panner(value: number) {
    const node = this.ctx.createStereoPanner();
    node.pan.value = clamp(value, -1, 1);
    return node;
  }

  private connectVoice(gain: GainNode, pan: number, bus: GainNode) {
    const panner = this.panner(pan);
    gain.connect(panner);
    panner.connect(bus);
  }

  async resume() {
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
  }

  private musicTarget() {
    return Math.max(
      0.0001,
      this.musicVolume * MUSIC_LEVEL * MOOD_LEVEL[this.musicMood],
    );
  }

  private applyMusicLevel(immediate = false) {
    if (!this.musicRunning) return;
    const now = this.ctx.currentTime;
    this.musicBus.gain.cancelScheduledValues(now);
    this.musicBus.gain.setValueAtTime(
      Math.max(0.0001, this.musicBus.gain.value),
      now,
    );
    this.musicBus.gain.linearRampToValueAtTime(
      this.musicTarget(),
      now + (immediate ? 0.03 : 0.7),
    );
  }

  setMood(mood: MusicMood) {
    if (this.musicMood === mood) return;
    this.musicMood = mood;
    this.applyMusicLevel();
  }

  setMusicVolume(volume: number, immediate = false) {
    this.musicVolume = clamp(volume);
    this.applyMusicLevel(immediate);
  }

  setSfxVolume(volume: number) {
    this.sfxVolume = clamp(volume);
    const now = this.ctx.currentTime;
    const target = Math.max(0.0001, this.sfxVolume * SFX_LEVEL);
    this.sfxBus.gain.cancelScheduledValues(now);
    this.sfxBus.gain.setValueAtTime(
      Math.max(0.0001, this.sfxBus.gain.value),
      now,
    );
    this.sfxBus.gain.linearRampToValueAtTime(target, now + 0.18);
  }

  startMusic(volume: number) {
    if (this.musicRunning) {
      this.setMusicVolume(volume);
      return;
    }
    this.musicVolume = clamp(volume);
    this.musicRunning = true;
    this.barIndex = 0;
    this.nextBarTime = this.ctx.currentTime + 0.16;
    const now = this.ctx.currentTime;
    const target = this.musicTarget();
    this.musicBus.gain.cancelScheduledValues(now);
    this.musicBus.gain.setValueAtTime(0.0001, now);
    this.musicBus.gain.exponentialRampToValueAtTime(target, now + 2.8);
    this.schedulerTimer = window.setInterval(
      () => this.scheduleAhead(),
      SCHEDULER_MS,
    );
    this.scheduleAhead();
  }

  stopMusic() {
    if (!this.musicRunning) return;
    this.musicRunning = false;
    if (this.schedulerTimer !== null) {
      window.clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    const now = this.ctx.currentTime;
    this.musicBus.gain.cancelScheduledValues(now);
    this.musicBus.gain.setValueAtTime(
      Math.max(0.0001, this.musicBus.gain.value),
      now,
    );
    this.musicBus.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
  }

  private scheduleAhead() {
    if (!this.musicRunning) return;
    while (this.nextBarTime < this.ctx.currentTime + SCHEDULE_AHEAD) {
      this.scheduleBar(this.barIndex, this.nextBarTime);
      this.nextBarTime += BAR;
      this.barIndex += 1;
    }
  }

  private scheduleBar(bar: number, time: number) {
    const chord = CHORDS[bar % CHORDS.length];
    const cycle = Math.floor(bar / CHORDS.length);

    this.pad(chord.pad, time, BAR + 1.1);

    this.felt(chord.bass, time + humanize(bar), 0.075, 2.9, -0.16);
    if (bar % 2 === 0) {
      this.felt(chord.bass * 1.5, time + BEAT * 2, 0.045, 2.3, 0.18);
    }

    const pianoSteps = [
      { beat: 0, index: 0 },
      { beat: 0.75, index: 2 },
      { beat: 1.5, index: 1 },
      { beat: 2.5, index: 3 },
      { beat: 3.25, index: 2 },
    ];

    pianoSteps.forEach((step, index) => {
      if ((bar + index) % 7 === 0) return;
      const note = chord.arp[step.index % chord.arp.length];
      this.felt(
        note,
        time + step.beat * BEAT + humanize(bar * 11 + index),
        0.032 + (index % 2) * 0.006,
        1.9,
        index % 2 === 0 ? -0.2 : 0.2,
      );
    });

    if (bar % 2 === 0) {
      chord.arp.slice(0, 4).forEach((note, index) => {
        this.musicBox(
          note * 2,
          time + index * BEAT * 0.5 + humanize(bar * 13 + index),
          0.018,
          1.2,
          index % 2 === 0 ? 0.28 : -0.28,
        );
      });
    }

    const motif = MOTIFS[bar % MOTIFS.length];
    motif.forEach((entry, index) => {
      if ((bar + cycle) % 6 === 0 && index === 2) return;
      const note =
        chord.melody[(entry.note + cycle + index) % chord.melody.length];
      this.musicBox(
        note,
        time + entry.beat * BEAT + humanize(bar * 17 + index),
        0.038,
        1.7,
        index === 0 ? -0.24 : index === 1 ? 0.26 : 0,
      );
    });

    this.shaker(time + BEAT * 1.5, 0.01, 0.24);
    this.shaker(time + BEAT * 3.5, 0.008, -0.2);

    if (bar % 4 === 0) {
      this.bell(
        chord.melody[0] * 2,
        time + 0.04,
        0.026,
        2.9,
        -0.32,
        this.musicBus,
      );
    }

    if (bar % 8 === 7) {
      this.bell(
        chord.melody[2] * 2,
        time + BEAT * 3.25,
        0.014,
        2.4,
        0.36,
        this.musicBus,
      );
    }
  }

  private felt(
    freq: number,
    time: number,
    level: number,
    decay: number,
    pan: number,
  ) {
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(Math.min(4200, freq * 7), time);
    filter.Q.value = 0.35;

    const body = this.ctx.createOscillator();
    body.type = "triangle";
    body.frequency.setValueAtTime(freq, time);

    const overtone = this.ctx.createOscillator();
    overtone.type = "sine";
    overtone.frequency.setValueAtTime(freq * 2.003, time);

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.value = 0.14;

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(level, time + 0.014);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

    body.connect(filter);
    overtone.connect(overtoneGain);
    overtoneGain.connect(filter);
    filter.connect(gain);
    this.connectVoice(gain, pan, this.musicBus);

    body.start(time);
    overtone.start(time);
    body.stop(time + decay + 0.05);
    overtone.stop(time + decay + 0.05);
  }

  private musicBox(
    freq: number,
    time: number,
    level: number,
    decay: number,
    pan: number,
  ) {
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 6200;

    const fundamental = this.ctx.createOscillator();
    fundamental.type = "sine";
    fundamental.frequency.setValueAtTime(freq, time);

    const shimmer = this.ctx.createOscillator();
    shimmer.type = "sine";
    shimmer.frequency.setValueAtTime(freq * 2.01, time);

    const shimmerGain = this.ctx.createGain();
    shimmerGain.gain.value = 0.18;

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(level, time + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

    fundamental.connect(filter);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(filter);
    filter.connect(gain);
    this.connectVoice(gain, pan, this.musicBus);

    fundamental.start(time);
    shimmer.start(time);
    fundamental.stop(time + decay + 0.04);
    shimmer.stop(time + decay + 0.04);
  }

  private pad(freqs: number[], time: number, duration: number) {
    freqs.forEach((freq, index) => {
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(850 + index * 90, time);
      filter.Q.value = 0.25;

      const voice = this.ctx.createOscillator();
      voice.type = "triangle";
      voice.frequency.setValueAtTime(freq, time);
      voice.detune.setValueAtTime(index % 2 === 0 ? -4 : 4, time);

      const shadow = this.ctx.createOscillator();
      shadow.type = "sine";
      shadow.frequency.setValueAtTime(freq * 1.002, time);
      shadow.detune.setValueAtTime(index % 2 === 0 ? 3 : -3, time);

      const shadowGain = this.ctx.createGain();
      shadowGain.gain.value = 0.32;

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.014, time + 1.65);
      gain.gain.setValueAtTime(0.014, time + duration - 1.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      voice.connect(filter);
      shadow.connect(shadowGain);
      shadowGain.connect(filter);
      filter.connect(gain);
      this.connectVoice(gain, (index - 1.5) * 0.12, this.musicBus);

      voice.start(time);
      shadow.start(time);
      voice.stop(time + duration + 0.05);
      shadow.stop(time + duration + 0.05);
    });
  }

  private shaker(time: number, level: number, pan: number) {
    const source = this.ctx.createBufferSource();
    source.buffer = this.getNoise();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 5200;
    filter.Q.value = 1.6;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(level, time + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
    source.connect(filter);
    filter.connect(gain);
    this.connectVoice(gain, pan, this.musicBus);
    source.start(time, Math.random() * 1.2);
    source.stop(time + 0.16);
  }

  private bell(
    freq: number,
    time: number,
    level: number,
    decay: number,
    pan: number,
    bus: GainNode,
  ) {
    const gain = this.ctx.createGain();
    const fundamental = this.ctx.createOscillator();
    fundamental.type = "sine";
    fundamental.frequency.setValueAtTime(freq, time);
    const overtone = this.ctx.createOscillator();
    overtone.type = "sine";
    overtone.frequency.setValueAtTime(freq * 2.01, time);
    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.value = 0.22;

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(level, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

    fundamental.connect(gain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(gain);
    this.connectVoice(gain, pan, bus);

    fundamental.start(time);
    overtone.start(time);
    fundamental.stop(time + decay + 0.05);
    overtone.stop(time + decay + 0.05);
  }

  private noiseSweep(
    time: number,
    duration: number,
    from: number,
    to: number,
    level: number,
    pan = 0,
  ) {
    const source = this.ctx.createBufferSource();
    source.buffer = this.getNoise();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 0.9;
    filter.frequency.setValueAtTime(from, time);
    filter.frequency.exponentialRampToValueAtTime(Math.max(40, to), time + duration);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(level, time + 0.05);
    gain.gain.setValueAtTime(level, time + duration * 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    source.connect(filter);
    filter.connect(gain);
    this.connectVoice(gain, pan, this.sfxBus);
    source.start(time, Math.random() * 1.4);
    source.stop(time + duration + 0.05);
  }

  private paperRustle(time: number, level: number, pan = 0) {
    const source = this.ctx.createBufferSource();
    source.buffer = this.getNoise();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1650;
    filter.Q.value = 0.7;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(level, time + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);
    source.connect(filter);
    filter.connect(gain);
    this.connectVoice(gain, pan, this.sfxBus);
    source.start(time, Math.random() * 1.6);
    source.stop(time + 0.34);
  }

  private flutter(time: number) {
    [0, 0.11, 0.23, 0.36].forEach((offset, index) => {
      const source = this.ctx.createBufferSource();
      source.buffer = this.getNoise();
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2600 + index * 420;
      filter.Q.value = 1.1;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time + offset);
      gain.gain.linearRampToValueAtTime(0.014 - index * 0.002, time + offset + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + offset + 0.12);
      source.connect(filter);
      filter.connect(gain);
      this.connectVoice(gain, index % 2 === 0 ? -0.35 : 0.35, this.sfxBus);
      source.start(time + offset, Math.random() * 1.2);
      source.stop(time + offset + 0.16);
    });
  }

  playSfx(name: SfxName) {
    const now = this.ctx.currentTime + 0.018;
    switch (name) {
      case "gate": {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
          this.bell(
            freq,
            now + index * 0.105,
            0.045 - index * 0.004,
            2.5,
            index % 2 === 0 ? -0.3 : 0.3,
            this.sfxBus,
          );
        });
        this.flutter(now + 0.08);
        this.paperRustle(now + 0.4, 0.012, 0.12);
        break;
      }
      case "garden": {
        this.noiseSweep(now, 3.4, 380, 1500, 0.011, -0.18);
        this.noiseSweep(now + 0.3, 3, 1200, 620, 0.007, 0.2);
        this.flutter(now + 0.9);
        this.flutter(now + 2.1);
        [783.99, 987.77, 1174.66].forEach((freq, index) => {
          this.bell(
            freq,
            now + 0.6 + index * 0.18,
            0.011 - index * 0.002,
            2.6,
            index % 2 === 0 ? -0.2 : 0.2,
            this.sfxBus,
          );
        });
        break;
      }
      case "enter": {
        this.noiseSweep(now, 2.1, 260, 5400, 0.019, 0);
        [392, 523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
          this.bell(
            freq,
            now + 0.15 + index * 0.11,
            0.025 - index * 0.003,
            2.9,
            index % 2 === 0 ? -0.28 : 0.28,
            this.sfxBus,
          );
        });
        this.noiseSweep(now + 0.9, 1.4, 3200, 9000, 0.006, 0.12);
        break;
      }
      case "page": {
        this.paperRustle(now, 0.022, -0.18);
        this.paperRustle(now + 0.055, 0.014, 0.2);
        break;
      }
      case "coffee": {
        this.noiseSweep(now, 1.9, 760, 1750, 0.022, -0.1);
        this.noiseSweep(now + 0.25, 1.5, 380, 920, 0.012, 0.15);
        [1860, 2470, 3180].forEach((freq, index) => {
          this.bell(
            freq,
            now + 2.15 + index * 0.045,
            0.012,
            0.9,
            index % 2 === 0 ? 0.3 : -0.2,
            this.sfxBus,
          );
        });
        break;
      }
      case "envelope": {
        this.paperRustle(now, 0.028, -0.15);
        this.paperRustle(now + 0.11, 0.02, 0.12);
        this.bell(392, now + 0.02, 0.016, 1.6, 0, this.sfxBus);
        this.bell(587.33, now + 0.16, 0.012, 1.8, 0.2, this.sfxBus);
        break;
      }
      case "lights": {
        this.noiseSweep(now, 0.45, 420, 2400, 0.012, 0);
        [261.63, 392, 523.25, 659.25].forEach((freq, index) => {
          this.bell(
            freq,
            now + 0.08 + index * 0.075,
            0.016 - index * 0.002,
            2.1,
            index % 2 === 0 ? -0.26 : 0.26,
            this.sfxBus,
          );
        });
        break;
      }
      case "spark": {
        this.noiseSweep(now, 0.2, 2800, 900, 0.014, 0.08);
        this.bell(783.99, now + 0.03, 0.014, 0.9, 0.2, this.sfxBus);
        this.bell(1174.66, now + 0.1, 0.009, 0.8, -0.2, this.sfxBus);
        break;
      }
      case "candle": {
        this.noiseSweep(now, 0.62, 1100, 260, 0.026, 0);
        this.paperRustle(now + 0.08, 0.008, 0.2);
        break;
      }
      case "finale": {
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, index) => {
          this.bell(
            freq,
            now + index * 0.115,
            0.04 - index * 0.003,
            2.8,
            index % 2 === 0 ? -0.34 : 0.34,
            this.sfxBus,
          );
        });
        [261.63, 329.63, 392, 523.25].forEach((freq, index) => {
          this.bell(
            freq,
            now + 0.18 + index * 0.03,
            0.018,
            2.2,
            (index - 1.5) * 0.12,
            this.sfxBus,
          );
        });
        this.noiseSweep(now + 0.2, 0.9, 2800, 6400, 0.008, 0.1);
        break;
      }
      case "gift": {
        [783.99, 1046.5, 1318.5].forEach((freq, index) => {
          this.bell(
            freq,
            now + index * 0.09,
            0.028 - index * 0.004,
            2.4,
            index % 2 === 0 ? 0.24 : -0.24,
            this.sfxBus,
          );
        });
        break;
      }
    }
  }

  destroy() {
    this.stopMusic();
    if (this.schedulerTimer !== null) {
      window.clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    if (this.noise) {
      this.noise = null;
    }
    void this.ctx.close().catch(() => undefined);
  }
}
