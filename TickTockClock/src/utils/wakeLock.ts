/**
 * Wake Lock API utilities to prevent screen from sleeping during timer
 * Supported on modern browsers including iOS Safari 16.4+ and Android Chrome
 */

let wakeLock: WakeLockSentinel | null = null;

/**
 * Request a wake lock to keep the screen on
 */
export const requestWakeLock = async (): Promise<void> => {
  // Check if Wake Lock API is supported
  if (!('wakeLock' in navigator)) {
    console.warn('Wake Lock API not supported on this browser');
    return;
  }

  try {
    // Request a screen wake lock
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock active - screen will stay on');

    // Re-acquire wake lock if it's released (e.g., when tab becomes inactive)
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock released');
    });

  } catch (error) {
    console.warn('Failed to acquire wake lock:', error);
  }
};

/**
 * Release the wake lock to allow screen to sleep normally
 */
export const releaseWakeLock = async (): Promise<void> => {
  if (wakeLock) {
    try {
      await wakeLock.release();
      wakeLock = null;
      console.log('Wake Lock released manually');
    } catch (error) {
      console.warn('Failed to release wake lock:', error);
    }
  }
};

/**
 * Check if wake lock is currently active
 */
export const isWakeLockActive = (): boolean => {
  return wakeLock !== null && !wakeLock.released;
};
