import { useEffect, useCallback, useRef } from "react";
import { AnimationType, ClockStatus } from "../types";
import { useClockStatus } from "../context/ClockContext";
import { useSettings } from "../context/SettingsContext";
import { previewSound } from "../utils/soundNotification";

/**
 * State machine that drives both simple and custom timer modes.
 * Handles all status transitions (ZERO → READY → RUNNING → PAUSED → FINISHED)
 * and the logic for lap/interval changes within each mode.
 *
 * Reads from config (user-set values), writes to state (runtime values).
 */
export function useTimerStateMachine() {
      const {
            clockStatus,
            setClockStatus,
            time,
            setTime,
            isPaused,
            setIsPaused,
            isSimpleMode,
            simpleTimerConfig,
            simpleTimerState,
            setSimpleTimerState,
            customTimerConfig,
            customTimerState,
            setCustomTimerState,
      } = useClockStatus();

      const { settings } = useSettings();

      const playIntervalEnd = useCallback((soundKey?: string) => previewSound(soundKey || settings.endIntervalSound), [settings.endIntervalSound]);
      const playSetEnd = useCallback(() => previewSound(settings.endSetSound), [settings.endSetSound]);
      const playFinish = useCallback(() => previewSound(settings.finishSound), [settings.finishSound]);

      // Refs to always access the latest values inside setTimeout callbacks,
      // avoiding stale closures that capture outdated state.
      const simpleTimerConfigRef = useRef(simpleTimerConfig);
      simpleTimerConfigRef.current = simpleTimerConfig;

      const simpleTimerStateRef = useRef(simpleTimerState);
      simpleTimerStateRef.current = simpleTimerState;

      const customTimerConfigRef = useRef(customTimerConfig);
      customTimerConfigRef.current = customTimerConfig;

      const customTimerStateRef = useRef(customTimerState);
      customTimerStateRef.current = customTimerState;

      // ── Simple mode transition callbacks ──────────────────────────────

      const setReadyToRunningSimple = useCallback(() => {
            setSimpleTimerState(prev => ({
                  ...prev,
                  remainingSets: simpleTimerConfigRef.current.sets,
            }));
            setTime(simpleTimerConfigRef.current.workLapDuration);
            setClockStatus(ClockStatus.RUNNING);
      }, [setSimpleTimerState, setTime, setClockStatus]);

      const setRunningToFinishedSimple = useCallback(() => {
            setTime(0);
            setSimpleTimerState(prev => ({
                  ...prev,
                  remainingSets: 0,
                  isWorkLap: true,
                  currentAnimation: AnimationType.WORKOUT_FINISHED_SIMPLE,
            }));
            setClockStatus(ClockStatus.FINISHED);
            playFinish();
      }, [setSimpleTimerState, setTime, setClockStatus, playFinish]);

      const setRunningToRunningWorkLapEndedSimple = useCallback(() => {
            setSimpleTimerState(prev => ({ ...prev, isWorkLap: false }));
            setTime(simpleTimerConfigRef.current.restLapDuration);
            setClockStatus(ClockStatus.RUNNING);
      }, [setSimpleTimerState, setTime, setClockStatus]);

      const setRunningToRunningRestLapEndedSimple = useCallback(() => {
            setSimpleTimerState(prev => ({
                  ...prev,
                  isWorkLap: true,
                  remainingSets: prev.remainingSets - 1,
            }));
            if (simpleTimerStateRef.current.remainingSets !== 0) {
                  setTime(simpleTimerConfigRef.current.workLapDuration);
            }
            setClockStatus(ClockStatus.RUNNING);
      }, [setSimpleTimerState, setTime, setClockStatus]);

      const setFinishedToZeroSimple = useCallback(() => {
            setSimpleTimerState(prev => ({ ...prev, remainingSets: 0 }));
            setIsPaused(true);
            setClockStatus(ClockStatus.ZERO);
      }, [setSimpleTimerState, setIsPaused, setClockStatus]);

      const setFinishedToReadySimple = useCallback(() => {
            setSimpleTimerState(prev => ({
                  ...prev,
                  remainingSets: simpleTimerConfigRef.current.sets,
                  isWorkLap: true,
            }));
            setIsPaused(true);
            setClockStatus(ClockStatus.READY);
      }, [setSimpleTimerState, setIsPaused, setClockStatus]);

      // ── Main state machine effect ─────────────────────────────────────

      useEffect(() => {
            try {
                  if (isSimpleMode) {
                        handleSimpleMode();
                  } else {
                        handleCustomMode();
                  }
            } catch (error) {
                  console.error("Error in clock status update:", error);
            }
      }, [
            isPaused,
            simpleTimerConfig,
            simpleTimerState,
            clockStatus,
            isSimpleMode,
            time,
            customTimerConfig,
            customTimerState,
            setClockStatus,
            setReadyToRunningSimple,
            setRunningToFinishedSimple,
            setRunningToRunningWorkLapEndedSimple,
            setRunningToRunningRestLapEndedSimple,
            setFinishedToZeroSimple,
            setFinishedToReadySimple,
            setCustomTimerState,
      ]);

      // ── Simple mode state diagram ─────────────────────────────────────

      function handleSimpleMode() {
            switch (clockStatus) {
                  case ClockStatus.ZERO:
                        if (
                              time === 0 &&
                              simpleTimerConfig.workLapDuration > 0 &&
                              simpleTimerConfig.restLapDuration > 0
                        ) {
                              setClockStatus(ClockStatus.READY);
                        }
                        break;

                  case ClockStatus.READY:
                        if (
                              time === 0 &&
                              (simpleTimerConfig.workLapDuration === 0 ||
                                    simpleTimerConfig.restLapDuration === 0)
                        ) {
                              setClockStatus(ClockStatus.ZERO);
                        }
                        if (!isPaused) {
                              setReadyToRunningSimple();
                        }
                        break;

                  case ClockStatus.RUNNING:
                        if (isPaused) {
                              setClockStatus(ClockStatus.PAUSED);
                        }
                        if (
                              time === 0 &&
                              simpleTimerState.remainingSets === 1 &&
                              !simpleTimerState.isWorkLap
                        ) {
                              setRunningToFinishedSimple();
                        } else if (time === 0 && simpleTimerState.isWorkLap) {
                              playIntervalEnd();
                              setTimeout(() => {
                                    setRunningToRunningWorkLapEndedSimple();
                              }, 1000);
                        } else if (time === 0 && !simpleTimerState.isWorkLap) {
                              playSetEnd();
                              setTimeout(() => {
                                    setRunningToRunningRestLapEndedSimple();
                              }, 1000);
                        }
                        break;

                  case ClockStatus.PAUSED:
                        if (!isPaused && time > 0) {
                              setClockStatus(ClockStatus.RUNNING);
                        }
                        if (
                              isPaused &&
                              time === 0 &&
                              (simpleTimerConfig.workLapDuration === 0 ||
                                    simpleTimerConfig.restLapDuration === 0)
                        ) {
                              setClockStatus(ClockStatus.ZERO);
                        }
                        if (
                              isPaused &&
                              time === 0 &&
                              simpleTimerConfig.workLapDuration > 0 &&
                              simpleTimerConfig.restLapDuration > 0
                        ) {
                              setClockStatus(ClockStatus.READY);
                        }
                        break;

                  case ClockStatus.FINISHED:
                        if (
                              simpleTimerConfig.workLapDuration === 0 ||
                              simpleTimerConfig.restLapDuration === 0
                        ) {
                              setFinishedToZeroSimple();
                        }
                        if (
                              simpleTimerConfig.workLapDuration > 0 &&
                              simpleTimerConfig.restLapDuration > 0
                        ) {
                              setFinishedToReadySimple();
                        }
                        break;
            }
      }

      // ── Custom mode state diagram ─────────────────────────────────────

      function handleCustomMode() {
            switch (clockStatus) {
                  case ClockStatus.ZERO:
                        if (customTimerConfig.intervals.length > 0) {
                              setClockStatus(ClockStatus.READY);
                        }
                        break;

                  case ClockStatus.READY:
                        if (customTimerConfig.intervals.length === 0) {
                              setClockStatus(ClockStatus.ZERO);
                        } else if (customTimerConfig.intervals.length > 0 && !isPaused) {
                              setClockStatus(ClockStatus.RUNNING);
                              setCustomTimerState(prev => ({
                                    ...prev,
                                    remainingIntervals: [...customTimerConfig.intervals],
                                    remainingSets: customTimerConfig.sets,
                              }));
                              setTime(customTimerConfig.intervals[0].duration);
                        }
                        break;

                  case ClockStatus.RUNNING:
                        if (isPaused) {
                              setClockStatus(ClockStatus.PAUSED);
                        } else if (time === 0 && customTimerState.remainingIntervals.length > 1) {
                              playIntervalEnd(customTimerState.remainingIntervals[0].soundKey);
                              setTimeout(() => {
                                    setCustomTimerState(prev => ({
                                          ...prev,
                                          remainingIntervals: prev.remainingIntervals.slice(1),
                                    }));
                                    setTime(customTimerStateRef.current.remainingIntervals[1].duration);
                              }, 1000);
                        } else if (time === 0 && customTimerState.remainingIntervals.length === 1 && customTimerState.remainingSets > 1) {
                              playSetEnd();
                              setTimeout(() => {
                                    setCustomTimerState(prev => ({
                                          ...prev,
                                          remainingSets: prev.remainingSets - 1,
                                          remainingIntervals: [...customTimerConfigRef.current.intervals],
                                    }));
                                    setTime(customTimerConfigRef.current.intervals[0].duration);
                              }, 1000);
                        } else if (time === 0 && customTimerState.remainingIntervals.length === 1 && customTimerState.remainingSets === 1) {
                              setClockStatus(ClockStatus.FINISHED);
                              playFinish();
                        }
                        break;

                  case ClockStatus.PAUSED:
                        if (!isPaused) {
                              setClockStatus(ClockStatus.RUNNING);
                        } else if (time === 0) {
                              setClockStatus(ClockStatus.READY);
                        }
                        break;

                  case ClockStatus.FINISHED:
                        if (customTimerConfig.intervals.length > 0) {
                              setIsPaused(true);
                              setClockStatus(ClockStatus.READY);
                        }
                        break;
            }
      }
}
