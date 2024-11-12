export enum AnimationType {
      NONE = 'none',
      EMPTY_LAPS_DURATION = 'Laps duration can\'t be 0 because it will break the app',
      ALREADY_RESET = 'Clock is already reset',
      CANT_CHANGE_LAPS_DURATION_CLOCK_RUNNING = 'You can\'t change laps duration when clock is running',
      TIMER_FINISHED_SIMPLE = 'Timer has finished in simple mode',
      TIMER_FINISHED_CUSTOM = 'Timer has finished in custom mode', //TODO: implement custom mode
      CANT_CHANGE_LAPS_DURATION_CLOCK_PAUSED = 'You can\'t change laps duration when clock is paused'
}

export enum ClockStatus {
      ZERO = 'zero',        // Clock laps havent been set
      READY = 'ready',      // Clock laps have values but not started
      RUNNING = 'running',  // Clock is actively counting
      PAUSED = 'paused',    // Clock has time remaining but is paused
      FINISHED = 'finished' // Clock has finished
}