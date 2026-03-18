import { useEffect } from "react";
import { ClockStatus } from "../types";
import { useClockStatus } from "../context/ClockContext";

/**
 * Handles the countdown interval (decrement every second) and reset logic.
 */
export function useTimerTick() {
      const { clockStatus, setTime, setIsAlternate, reset } = useClockStatus();

      // Countdown: decrement time every second while RUNNING
      useEffect(() => {
            let timer: number | null = null;

            if (clockStatus === ClockStatus.RUNNING) {
                  timer = window.setInterval(() => {
                        setTime((prevTime) => Math.max(0, prevTime - 1));
                        setIsAlternate((prev) => !prev);
                  }, 1000);
            }

            return () => {
                  if (timer !== null) {
                        clearInterval(timer);
                  }
            };
      }, [clockStatus, setTime, setIsAlternate]);

      // Reset: zero the timer when reset flag is set
      useEffect(() => {
            if (reset) {
                  setTime(0);
            }
      }, [reset, setTime]);
}
