import { AnimationType } from '.';

/**
 * Interface representing the configuration and state of a simple timer
 */
export interface SimpleTimerInfo {
    /** Duration of work intervals in seconds */
    workLapDuration: number;
    
    /** Duration of rest intervals in seconds */
    restLapDuration: number;
    
    /** Number of work/rest sets to perform. This wont change, we need to keep track of the remaining sets in case we need to reset the timer*/
    sets: number;

    /** Remaining sets to perform. This will change as the timer progresses */
    remainingSets: number
    
    /** Tracks if currently in work lap (true) or rest lap (false) */
    isWorkLap: boolean;
    
    /** Current UI animation state for the timer */
    currentAnimation: AnimationType;
} 