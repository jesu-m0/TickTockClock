// Shared AudioContext instance for iOS compatibility
let audioContext: AudioContext | null = null;

// Silent buffer for iOS unlock — playing a silent buffer on user interaction
// ensures the AudioContext stays unlocked for future programmatic playback
let silentBuffer: AudioBuffer | null = null;

/**
 * Initializes the AudioContext (should be called on user interaction for iOS compatibility)
 * This ensures audio can play on iOS Safari, which requires user interaction to enable audio.
 * On iOS, we also play a silent buffer to fully unlock the audio context.
 */
export const initializeAudioContext = async (): Promise<void> => {
  const ctx = await getAudioContext();
  if (!ctx) return;

  // Play a silent buffer to fully unlock audio on iOS Safari.
  // This is the most reliable way to ensure future programmatic playback works.
  try {
    if (!silentBuffer) {
      silentBuffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    }
    const source = ctx.createBufferSource();
    source.buffer = silentBuffer;
    source.connect(ctx.destination);
    source.start(0);
  } catch {
    // Silent buffer play failed — not critical
  }
};

/**
 * Gets or creates the AudioContext, ensuring it's resumed (required for iOS)
 */
const getAudioContext = async (): Promise<AudioContext | null> => {
  if (typeof window === 'undefined') return null;

  try {
    // Create AudioContext if it doesn't exist
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    // Resume AudioContext if suspended (required for iOS Safari)
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // If still not running after resume attempt, try recreating
    if (audioContext.state !== 'running') {
      try {
        audioContext.close();
      } catch {
        // ignore close errors
      }
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await audioContext.resume();
    }

    return audioContext;
  } catch (error) {
    console.warn('Could not create/resume AudioContext:', error);
    return null;
  }
};

// Re-resume AudioContext when the page becomes visible again (iOS suspends it in background)
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && audioContext && audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }
  });
}

/**
 * Helper function to play a tone using Web Audio API
 */
const playTone = (
  audioContext: AudioContext,
  frequency: number,
  startTime: number,
  duration: number = 0.3,
  volume: number = 0.3
) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  // Fade in and out for smooth sound
  gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime);
  gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + startTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + startTime + duration);

  oscillator.start(audioContext.currentTime + startTime);
  oscillator.stop(audioContext.currentTime + startTime + duration);
};

/**
 * Plays a notification sound when the timer finishes
 * Uses Web Audio API to generate a pleasant three-tone chime
 */
export const playTimerFinishedSound = async () => {
  const ctx = await getAudioContext();
  if (!ctx) return;

  try {
    // Play three ascending tones (pleasant chime)
    playTone(ctx, 523.25, 0);    // C5
    playTone(ctx, 659.25, 0.15); // E5
    playTone(ctx, 783.99, 0.3);  // G5

  } catch (error) {
    console.warn('Could not play timer finished sound:', error);
  }
};

/**
 * Plays a short beep when work lap finishes
 * Higher pitched and energetic (time to rest!)
 */
export const playWorkLapFinishedSound = async () => {
  const ctx = await getAudioContext();
  if (!ctx) return;

  try {
    // Single higher pitched beep (energetic - work done!)
    playTone(ctx, 659.25, 0, 0.2, 0.25); // E5

  } catch (error) {
    console.warn('Could not play work lap sound:', error);
  }
};

/**
 * Plays a short beep when rest lap finishes
 * Lower pitched and motivating (time to work!)
 */
export const playRestLapFinishedSound = async () => {
  const ctx = await getAudioContext();
  if (!ctx) return;

  try {
    // Single lower pitched beep (motivating - back to work!)
    playTone(ctx, 523.25, 0, 0.2, 0.25); // C5

  } catch (error) {
    console.warn('Could not play rest lap sound:', error);
  }
};

/**
 * Sound previews for settings - each key maps to a distinct sound
 */
const playBeep = async () => {
  const ctx = await getAudioContext();
  if (!ctx) return;
  playTone(ctx, 880, 0, 0.15, 0.3); // A5 short beep
};

const playChime = async () => {
  const ctx = await getAudioContext();
  if (!ctx) return;
  playTone(ctx, 523.25, 0, 0.3, 0.25);    // C5
  playTone(ctx, 659.25, 0.15, 0.3, 0.25);  // E5
  playTone(ctx, 783.99, 0.3, 0.3, 0.25);   // G5
};

const playBoxingBell = async () => {
  const ctx = await getAudioContext();
  if (!ctx) return;
  playTone(ctx, 440, 0, 0.4, 0.35);       // A4 strong hit
  playTone(ctx, 440, 0.05, 0.35, 0.2);    // A4 overlay for richness
  playTone(ctx, 880, 0, 0.5, 0.15);       // A5 shimmer
};

const playWhistle = async () => {
  const ctx = await getAudioContext();
  if (!ctx) return;
  playTone(ctx, 1174.66, 0, 0.15, 0.3);   // D6
  playTone(ctx, 1318.51, 0.12, 0.25, 0.3); // E6
};

const playSimpleTone = async () => {
  const ctx = await getAudioContext();
  if (!ctx) return;
  playTone(ctx, 587.33, 0, 0.4, 0.3); // D5 sustained tone
};

const soundPreviewMap: Record<string, () => Promise<void>> = {
  'beep': playBeep,
  'chime': playChime,
  'boxing-bell': playBoxingBell,
  'whistle': playWhistle,
  'tone': playSimpleTone,
};

const funSoundUrls: Record<string, string> = {
  'fun-siuu': new URL('./sounds/Siuu.mp3', import.meta.url).href,
  'fun-ruidoo': new URL('./sounds/RUIDOOOO.mp3', import.meta.url).href,
  'fun-epic': new URL('./sounds/that was epic.mp3', import.meta.url).href,
  'fun-damn': new URL('./sounds/ohh got damn it.mp3', import.meta.url).href,
  'fun-penalti': new URL('./sounds/Penalti a favor del real madrid.mp3', import.meta.url).href,
};

const playFunSound = async (key: string): Promise<void> => {
  const url = funSoundUrls[key];
  if (!url) return;
  const audio = new Audio(url);
  audio.volume = 0.5;
  await audio.play().catch(() => {});
};

export const isFunSound = (key: string): boolean => key.startsWith('fun-');

/** Sound options shared between settings and per-interval picker */
export interface SoundOption {
  value: string;
  label: string;
  icon: string;
  translationKey?: string;
}

export const STANDARD_SOUND_OPTIONS: SoundOption[] = [
  { value: 'beep', label: 'Beep', icon: '•', translationKey: 'beep' },
  { value: 'chime', label: 'Chime', icon: '♪', translationKey: 'chime' },
  { value: 'boxing-bell', label: 'Bell', icon: '◉', translationKey: 'boxingBell' },
  { value: 'whistle', label: 'Whistle', icon: '▸', translationKey: 'whistle' },
  { value: 'tone', label: 'Tone', icon: '∿', translationKey: 'tone' },
];

export const FUN_SOUND_OPTIONS: SoundOption[] = [
  { value: 'fun-siuu', label: 'SIUUU', icon: '⚽' },
  { value: 'fun-ruidoo', label: 'RUIDO', icon: '◆' },
  { value: 'fun-epic', label: 'Epic', icon: '★' },
  { value: 'fun-damn', label: 'Damn!', icon: '✕' },
  { value: 'fun-penalti', label: 'Penalti', icon: '⚑' },
];

export const DEFAULT_INTERVAL_SOUND = 'beep';

export const getRandomStandardSound = (): string => {
  const opts = STANDARD_SOUND_OPTIONS;
  return opts[Math.floor(Math.random() * opts.length)].value;
};

/**
 * Preview a sound by its key (used in settings)
 */
export const previewSound = async (soundKey: string): Promise<void> => {
  if (isFunSound(soundKey)) {
    await playFunSound(soundKey);
    return;
  }
  const playFn = soundPreviewMap[soundKey];
  if (playFn) {
    await playFn();
  }
};
