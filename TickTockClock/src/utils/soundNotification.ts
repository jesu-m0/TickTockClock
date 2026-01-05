// Shared AudioContext instance for iOS compatibility
let audioContext: AudioContext | null = null;

/**
 * Initializes the AudioContext (should be called on user interaction for iOS compatibility)
 * This ensures audio can play on iOS Safari, which requires user interaction to enable audio
 */
export const initializeAudioContext = async (): Promise<void> => {
  await getAudioContext();
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

    return audioContext;
  } catch (error) {
    console.warn('Could not create/resume AudioContext:', error);
    return null;
  }
};

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
