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

export enum Colors {
      //Link to the colors used here:
      //https://coolors.co/6c584c-953931-e76f51-f38f8f-f4ba9b-e9c46a-faa930-44af69-00afb9
      //https://coolors.co/8f2d56-6c4e6f-37444b-023927-252422-ccc5b9-fffcf2
      
      EerieBlack = "#252422",
      Umber = "#6C584C",
      Timberwolf = "#CCC5B9",
      FloralWhite = "#FFFCF2",
      Chestnut = "#953931",
      BurntSienna = "#E76F51",
      LightCoral = "#F38F8F",
      Peach = "#F4BA9B",
      OrangeWeb = "#FAA930",
      Saffron = "#E9C46A",
      DarkGreen = "#023927",
      Jade = "#44AF69",
      Charcoal = "#37444B",
      Verdigris = "#00AFB9",
      QuinacridoneMagenta = "#8F2D56",
      EnglishViolet = "#6C4E6F",
  }