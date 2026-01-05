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
export const playTimerFinishedSound = () => {
  if (typeof window === 'undefined') return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Play three ascending tones (pleasant chime)
    playTone(audioContext, 523.25, 0);    // C5
    playTone(audioContext, 659.25, 0.15); // E5
    playTone(audioContext, 783.99, 0.3);  // G5

  } catch (error) {
    console.warn('Could not play timer finished sound:', error);
  }
};

/**
 * Plays a short beep when work lap finishes
 * Higher pitched and energetic (time to rest!)
 */
export const playWorkLapFinishedSound = () => {
  if (typeof window === 'undefined') return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Single higher pitched beep (energetic - work done!)
    playTone(audioContext, 659.25, 0, 0.2, 0.25); // E5

  } catch (error) {
    console.warn('Could not play work lap sound:', error);
  }
};

/**
 * Plays a short beep when rest lap finishes
 * Lower pitched and motivating (time to work!)
 */
export const playRestLapFinishedSound = () => {
  if (typeof window === 'undefined') return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Single lower pitched beep (motivating - back to work!)
    playTone(audioContext, 523.25, 0, 0.2, 0.25); // C5

  } catch (error) {
    console.warn('Could not play rest lap sound:', error);
  }
};
