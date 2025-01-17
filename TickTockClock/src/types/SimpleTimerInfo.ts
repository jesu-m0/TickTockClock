import { AnimationType } from '.';

export interface SimpleTimerInfo {
  workLapDuration: number;
  restLapDuration: number;
  cycles: number;
  currentAnimation: AnimationType;
} 