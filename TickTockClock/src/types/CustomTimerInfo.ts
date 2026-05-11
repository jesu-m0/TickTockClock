import { UUIDTypes } from 'uuid';
import { AnimationType, Colors } from '.';

/** Represents a single interval in the workout timer */
export interface Interval {
      id: UUIDTypes,
      duration: number; // Duration in seconds
      color: Colors;
      name: string; // Interval type (e.g., "work", "rest", "cooldown")
      soundKey: string; // Sound played when this interval ends
}

/** Configuration set by the user — does not change while the timer runs */
export interface CustomTimerConfig {
      intervals: Interval[]; // Workout intervals sequence
      sets: number; // Number of sets to repeat
}

/** Runtime state that changes as the timer progresses */
export interface CustomTimerState {
      currentAnimation: AnimationType; // Current animation state
      remainingSets: number; // Sets remaining
      remainingIntervals: Interval[]; // Intervals left in the current set
}
