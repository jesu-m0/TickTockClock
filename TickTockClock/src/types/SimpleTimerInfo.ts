import { AnimationType } from '.';

/** Configuration set by the user — does not change while the timer runs */
export interface SimpleTimerConfig {
    /** Duration of work intervals in seconds */
    workLapDuration: number;

    /** Duration of rest intervals in seconds */
    restLapDuration: number;

    /** Number of work/rest sets to perform */
    sets: number;
}

/** Runtime state that changes as the timer progresses */
export interface SimpleTimerState {
    /** Remaining sets to perform */
    remainingSets: number;

    /** Tracks if currently in work lap (true) or rest lap (false) */
    isWorkLap: boolean;

    /** Current UI animation state for the timer */
    currentAnimation: AnimationType;
}
