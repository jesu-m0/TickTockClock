export enum AnimationType {
      NONE = 'none',
      EMPTY_DURATION = 'empty_duration',
      ALREADY_RESET = 'already_reset'
}

export enum ClockStatus {
      ZERO = 'zero',        // Both timers are at 0
      READY = 'ready',      // Timers have values but not started
      RUNNING = 'running',  // Clock is actively counting
      PAUSED = 'paused',    // Clock has time remaining but is paused
      FINISHED = 'finished' // Completed all cycles
}