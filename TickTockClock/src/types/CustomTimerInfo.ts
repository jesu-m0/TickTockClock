import { AnimationType, Colors } from '.';

/** Represents a single interval in the workout timer */
export interface Interval {
    duration: number; // Duration in seconds
    color: Colors;
    name: string; // Interval type (e.g., "work", "rest", "cooldown")
}

/** Configuration and state of a custom workout timer */
export interface CustomTimerInfo {
    intervals: Interval[]; // Workout intervals sequence
    sets: number; // Number of sets to repeat
    remainingIntervals: Interval[]; // Intervals left in the current set
    currentAnimation: AnimationType; // Current animation state
}
