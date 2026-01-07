import { Interval } from '../types/CustomTimerInfo';

const INTERVALS_STORAGE_KEY = 'ticktockclock_intervals';
const SETS_STORAGE_KEY = 'ticktockclock_sets';

/**
 * Save intervals to local storage
 */
export const saveIntervalsToLocalStorage = (intervals: Interval[]): void => {
  try {
    localStorage.setItem(INTERVALS_STORAGE_KEY, JSON.stringify(intervals));
  } catch (error) {
    console.error('Failed to save intervals to local storage:', error);
  }
};

/**
 * Load intervals from local storage
 * Returns null if no intervals are stored or if there's an error
 */
export const loadIntervalsFromLocalStorage = (): Interval[] | null => {
  try {
    const stored = localStorage.getItem(INTERVALS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Interval[];
    }
    return null;
  } catch (error) {
    console.error('Failed to load intervals from local storage:', error);
    return null;
  }
};

/**
 * Save sets count to local storage
 */
export const saveSetsToLocalStorage = (sets: number): void => {
  try {
    localStorage.setItem(SETS_STORAGE_KEY, sets.toString());
  } catch (error) {
    console.error('Failed to save sets to local storage:', error);
  }
};

/**
 * Load sets count from local storage
 * Returns null if no sets are stored or if there's an error
 */
export const loadSetsFromLocalStorage = (): number | null => {
  try {
    const stored = localStorage.getItem(SETS_STORAGE_KEY);
    if (stored) {
      return parseInt(stored, 10);
    }
    return null;
  } catch (error) {
    console.error('Failed to load sets from local storage:', error);
    return null;
  }
};

/**
 * Clear all stored interval data from local storage
 */
export const clearIntervalsFromLocalStorage = (): void => {
  try {
    localStorage.removeItem(INTERVALS_STORAGE_KEY);
    localStorage.removeItem(SETS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear intervals from local storage:', error);
  }
};
