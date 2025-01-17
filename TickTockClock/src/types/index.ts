export enum AnimationType {
      NONE = 'none',
      EMPTY_LAPS_DURATION = 'Laps duration can\'t be 0 because it will break the app',
      ALREADY_RESET = 'Clock is already reset',
      WORKOUT_FINISHED_SIMPLE = 'Timer has finished in simple mode',
      TIMER_FINISHED_CUSTOM = 'Timer has finished in custom mode', //TODO: implement custom mode
      CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00 = 'You can\'t change laps duration or cycles when clock is Running or Paused. Clock isn\'t at 00:00'
}

export enum ClockStatus {
      ZERO = 'zero',        // Clock laps havent been set
      READY = 'ready',      // Clock laps have values but not started
      RUNNING = 'running',  // Clock is actively counting
      PAUSED = 'paused',    // Clock has time remaining but is paused
      FINISHED = 'finished' // Clock has finished
}