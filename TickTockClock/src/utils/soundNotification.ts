/**
 * Plays a notification sound when the timer finishes
 * Uses Web Audio API to generate a pleasant chime sound
 */
export const playTimerFinishedSound = () => {
  if (typeof window === 'undefined') return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create a pleasant three-tone chime
    const playTone = (frequency: number, startTime: number, duration: number = 0.3) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      // Fade in and out for smooth sound
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + startTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + startTime + duration);

      oscillator.start(audioContext.currentTime + startTime);
      oscillator.stop(audioContext.currentTime + startTime + duration);
    };

    // Play three ascending tones (pleasant chime)
    playTone(523.25, 0);    // C5
    playTone(659.25, 0.15); // E5
    playTone(783.99, 0.3);  // G5

  } catch (error) {
    console.warn('Could not play timer finished sound:', error);
  }
};
