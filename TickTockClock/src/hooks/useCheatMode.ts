/**
 * 4:20 easter egg.
 *
 * The fun-sound tab in the audio settings and the per-interval sound picker
 * is hidden by default and only appears when the user sets the rest lap of
 * the simple-mode timer to exactly 4 minutes 20 seconds (260 seconds).
 *
 * Centralizing the trigger here keeps the rule in one place — every consumer
 * stays in sync if the activation criteria ever change.
 */
const CHEAT_REST_DURATION_SECONDS = 4 * 60 + 20;

export const useCheatMode = (restLapDuration: number): boolean =>
  restLapDuration === CHEAT_REST_DURATION_SECONDS;
