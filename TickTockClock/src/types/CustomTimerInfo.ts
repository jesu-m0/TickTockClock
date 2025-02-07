import { UUIDTypes } from 'uuid';
import { AnimationType, Colors } from '.';

/** Represents a single interval in the workout timer */
export interface Interval {
      id: UUIDTypes,
      duration: number; // Duration in seconds
      color: Colors;
      name: string; // Interval type (e.g., "work", "rest", "cooldown")
}

/** Configuration and state of a custom workout timer */
export interface CustomTimerInfo {
      intervals: Interval[]; // Workout intervals sequence
      sets: number; // Number of sets to repeat
      currentAnimation: AnimationType; // Current animation state
      
      remainingSets: number; //Sets remaaining
      remainingIntervals: Interval[]; // Intervals left in the current set
}
