import React, { useEffect, useCallback, useState } from "react";
import { AnimationType, ClockStatus, Colors } from "../../types";
import { useClockStatus } from "../../context/ClockContext";
import { useTheme } from "../../context/ThemeContext";
import { playTimerFinishedSound, playWorkLapFinishedSound, playRestLapFinishedSound } from "../../utils/soundNotification";
import { useTranslation } from "../../i18n/useTranslation";
import TimeDigits from "./TimeDigits";

const Clock: React.FC = () => {
      const { isDarkMode } = useTheme();
      const { t } = useTranslation();
      const {
            // Clock status
            clockStatus,
            setClockStatus,

            // Timer state
            time,
            setTime,

            // Pause state
            isPaused,
            setIsPaused,

            // Reset state
            reset,

            // Simple mode
            isSimpleMode,

            // Simple mode configuration
            simpleTimerInfo,
            setSimpleTimerInfo,

            //Custom mode configuration
            customTimerInfo,
            setCustomTimerInfo,

            // Animation state
            isAlternate,
            setIsAlternate,
      } = useClockStatus();

      const [showShortcuts, setShowShortcuts] = useState(false);

      const setReadyToRunningSimple = useCallback(() => {
            //Set parameters for the first lap. The workout gonna start NOW.
            setSimpleTimerInfo({
                  ...simpleTimerInfo,
                  remainingSets: simpleTimerInfo.sets,
            });
            setTime(simpleTimerInfo.workLapDuration);
            setClockStatus(ClockStatus.RUNNING);
      }, [simpleTimerInfo, setSimpleTimerInfo, setTime, setClockStatus]);

      const setRunningToFinishedSimple = useCallback(() => {
            setTime(0);

            console.log(
                  "Status: FINISHED - Setting animation: " +
                  AnimationType.WORKOUT_FINISHED_SIMPLE
            );
            setSimpleTimerInfo({
                  ...simpleTimerInfo,
                  remainingSets: 0,
                  isWorkLap: true,
                  currentAnimation: AnimationType.WORKOUT_FINISHED_SIMPLE,
            });
            setClockStatus(ClockStatus.FINISHED);

            // Play notification sound
            playTimerFinishedSound();
      }, [simpleTimerInfo, setSimpleTimerInfo, setTime, setClockStatus]);

      const setRunningToRunningWorkLapEndedSimple = useCallback(() => {
            setSimpleTimerInfo({ ...simpleTimerInfo, isWorkLap: false });
            setTime(simpleTimerInfo.restLapDuration);
            setClockStatus(ClockStatus.RUNNING);
      }, [simpleTimerInfo, setSimpleTimerInfo, setTime, setClockStatus]);

      const setRunningToRunningRestLapEndedSimple = useCallback(() => {
            setSimpleTimerInfo({
                  ...simpleTimerInfo,
                  isWorkLap: true,
                  remainingSets: simpleTimerInfo.remainingSets - 1,
            });
            if (simpleTimerInfo.remainingSets != 0) {
                  setTime(simpleTimerInfo.workLapDuration);
            }
            setClockStatus(ClockStatus.RUNNING);
      }, [simpleTimerInfo, setSimpleTimerInfo, setTime, setClockStatus]);

      const setFinishedToZeroSimple = useCallback(() => {
            setSimpleTimerInfo({ ...simpleTimerInfo, remainingSets: 0 });
            setIsPaused(true);
            setClockStatus(ClockStatus.ZERO);
      }, [simpleTimerInfo, setSimpleTimerInfo, setIsPaused, setClockStatus]);

      const setFinishedToReadySimple = useCallback(() => {
            setSimpleTimerInfo({
                  ...simpleTimerInfo,
                  remainingSets: simpleTimerInfo.sets,
                  isWorkLap: true,
            });
            setIsPaused(true);
            setClockStatus(ClockStatus.READY);
      }, [simpleTimerInfo, setSimpleTimerInfo, setIsPaused, setClockStatus]);

      useEffect(() => {
            let timer: number | null = null;

            if (clockStatus === ClockStatus.RUNNING) {
                  timer = window.setInterval(() => {
                        setTime((prevTime) => Math.max(0, prevTime - 1)); // Decrement time by 1 each second the timer.
                        setIsAlternate((prev) => !prev);
                  }, 1000);
            }

            return () => {
                  if (timer !== null) {
                        clearInterval(timer);
                  }
            };
      }, [clockStatus, setTime]);

      useEffect(() => {
            if (reset) {
                  setTime(0);
            }
      }, [reset, setTime]);


      // Change favicon
      useEffect(() => {
            const favicon = document.getElementById(
                  "favicon"
            ) as HTMLLinkElement | null;
            if (favicon && !isDarkMode) {
                  favicon.href = isAlternate
                        ? "/favico/light/TickTockClockFavicoLight1.png"
                        : "/favico/light/TickTockClockFavicoLight2.png";
            } else if (favicon && isDarkMode) {
                  favicon.href = isAlternate
                        ? "/favico/dark/TickTockClockFavicoDark1.png"
                        : "/favico/dark/TickTockClockFavicoDark2.png";
            }
      }, [isAlternate, isDarkMode]);

      // Format time to MM:SS
      const formatTime = (seconds: number) => {
            const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
            const secs = String(seconds % 60).padStart(2, "0");
            return `${mins}:${secs}`;
      };

      // State diagram implementation
      useEffect(() => {
            try {
                  if (isSimpleMode) {
                        switch (clockStatus) {
                              case ClockStatus.ZERO:
                                    if (
                                          time === 0 &&
                                          simpleTimerInfo.workLapDuration > 0 &&
                                          simpleTimerInfo.restLapDuration > 0
                                    ) {
                                          console.log("Status Change: ZERO -> READY");
                                          setClockStatus(ClockStatus.READY);
                                    }
                                    break;
                              case ClockStatus.READY:
                                    if (
                                          time === 0 &&
                                          (simpleTimerInfo.workLapDuration === 0 ||
                                                simpleTimerInfo.restLapDuration === 0)
                                    ) {
                                          console.log("Status Change: READY -> ZERO");
                                          setClockStatus(ClockStatus.ZERO);
                                    }

                                    if (!isPaused) {
                                          console.log("Status Change: READY -> RUNNING");
                                          setReadyToRunningSimple();
                                    }
                                    break;

                              case ClockStatus.RUNNING:
                                    if (isPaused) {
                                          console.log("Status Change: RUNNING -> PAUSED");
                                          setClockStatus(ClockStatus.PAUSED);
                                    }

                                    if (
                                          time === 0 &&
                                          simpleTimerInfo.remainingSets === 1 &&
                                          !simpleTimerInfo.isWorkLap
                                    ) {
                                          // One cycle remaining, BUT was a rest lap, so next step will be remaining sets - 1 ---> FINISHED
                                          console.log("Status Change: RUNNING -> FINISHED");
                                          setRunningToFinishedSimple();
                                    } else if (time === 0 && simpleTimerInfo.isWorkLap) {
                                          // Work lap ended, next step will be rest lap (after 1 second pause)
                                          console.log("Status Change: RUNNING -> RUNNING: work lap ended.");

                                          // Play work lap finished sound
                                          playWorkLapFinishedSound();

                                          setTimeout(() => {
                                                setRunningToRunningWorkLapEndedSimple();
                                          }, 1000);
                                          //} else if (time === 0 && simpleLapCounts.workLaps < simpleLapCounts.restLaps) {
                                    } else if (time === 0 && !simpleTimerInfo.isWorkLap) {
                                          // Rest lap ended, next step will be work lap & remaining sets - 1 (after 1 second pause)
                                          console.log(
                                                "Status Change: RUNNING -> RUNNING: rest lap ended, cycle completed. " +
                                                (simpleTimerInfo.remainingSets - 1) +
                                                " sets remaining."
                                          );

                                          // Play rest lap finished sound
                                          playRestLapFinishedSound();

                                          setTimeout(() => {
                                                setRunningToRunningRestLapEndedSimple();
                                          }, 1000);
                                    }

                                    break;

                              case ClockStatus.PAUSED:
                                    if (!isPaused && time > 0) {
                                          console.log("Status Change: PAUSED -> RUNNING");
                                          setClockStatus(ClockStatus.RUNNING);
                                    }
                                    if (
                                          isPaused &&
                                          time === 0 &&
                                          (simpleTimerInfo.workLapDuration === 0 ||
                                                simpleTimerInfo.restLapDuration === 0)
                                    ) {
                                          console.log("Status Change: PAUSED -> ZERO");
                                          setClockStatus(ClockStatus.ZERO);
                                    }
                                    if (
                                          isPaused &&
                                          time === 0 &&
                                          simpleTimerInfo.workLapDuration > 0 &&
                                          simpleTimerInfo.restLapDuration > 0
                                    ) {
                                          console.log("Status Change: PAUSED -> READY");
                                          setClockStatus(ClockStatus.READY);
                                    }
                                    break;
                              case ClockStatus.FINISHED:
                                    if (
                                          simpleTimerInfo.workLapDuration === 0 ||
                                          simpleTimerInfo.restLapDuration === 0
                                    ) {
                                          //Theoretically never happens because it's not possible to change lap durartions while running.
                                          console.log("Status Change: FINISHED -> ZERO");
                                          setFinishedToZeroSimple();
                                    }
                                    if (
                                          simpleTimerInfo.workLapDuration > 0 &&
                                          simpleTimerInfo.restLapDuration > 0
                                    ) {
                                          console.log("Status Change: FINISHED -> READY");
                                          setFinishedToReadySimple();
                                    }
                                    break;
                        }
                  } else {
                        switch (clockStatus) {
                              case ClockStatus.ZERO:
                                    if (customTimerInfo.intervals.length > 0) {
                                          console.log("Status change: ZERO -> READY");
                                          setClockStatus(ClockStatus.READY);
                                    }
                                    break;
                              case ClockStatus.READY:
                                    if (customTimerInfo.intervals.length == 0) {
                                          console.log("Status change: READY -> ZERO");
                                          setClockStatus(ClockStatus.ZERO);
                                    } else if (customTimerInfo.intervals.length > 0 && !isPaused) {
                                          console.log("Status change: READY -> RUNNING");
                                          setClockStatus(ClockStatus.RUNNING)
                                          setCustomTimerInfo({
                                                ...customTimerInfo,
                                                remainingIntervals: [...customTimerInfo.intervals],
                                                remainingSets: customTimerInfo.sets,
                                          });
                                          setTime(customTimerInfo.intervals[0].duration)
                                    }
                                    break;
                              case ClockStatus.RUNNING:
                                    if (isPaused) {
                                          console.log("Status change: RUNNING -> PAUSED");
                                          setClockStatus(ClockStatus.PAUSED)
                                    } else if (time == 0 && customTimerInfo.remainingIntervals.length > 1) {
                                          console.log("Interval finished, there are more left: RUNNING -> RUNNING")

                                          // Play interval finished sound
                                          playWorkLapFinishedSound();

                                          setTimeout(() => {
                                                setCustomTimerInfo({
                                                      ...customTimerInfo,
                                                      remainingIntervals: customTimerInfo.remainingIntervals.slice(1),
                                                });
                                                setTime(customTimerInfo.remainingIntervals[1].duration)
                                          }, 1000);
                                    } else if (time == 0 && customTimerInfo.remainingIntervals.length == 1 && customTimerInfo.remainingSets > 1) {
                                          console.log("Set finished, loading intervals: RUNNING -> RUNNING");

                                          // Play set finished sound
                                          playRestLapFinishedSound();

                                          setTimeout(() => {
                                                setCustomTimerInfo({
                                                      ...customTimerInfo,
                                                      remainingSets: customTimerInfo.remainingSets - 1,
                                                      remainingIntervals: [...customTimerInfo.intervals]
                                                });
                                                setTime(customTimerInfo.intervals[0].duration)
                                          }, 1000);

                                    } else if (time == 0 && customTimerInfo.remainingIntervals.length == 1 && customTimerInfo.remainingSets == 1) {
                                          console.log("Status change: RUNNING -> FINISHED");
                                          setClockStatus(ClockStatus.FINISHED);

                                          // Play notification sound
                                          playTimerFinishedSound();
                                    }
                                    break;
                              case ClockStatus.PAUSED:
                                    if (!isPaused) {
                                          console.log("Status change: PAUSED -> RUNNING");
                                          setClockStatus(ClockStatus.RUNNING)
                                    } else if (time == 0) {
                                          console.log("Status change: PAUSED -> READY");
                                          setClockStatus(ClockStatus.READY)
                                    }
                                    break;
                              case ClockStatus.FINISHED:
                                    if (customTimerInfo.intervals.length > 0) {
                                          //TODO: finished animation
                                          console.log("Status change: FINISHED -> READY");
                                          setIsPaused(true);
                                          setClockStatus(ClockStatus.READY);
                                    }
                                    break;
                        }
                  }
            } catch (error) {
                  console.error("Error in clock status update:", error);
            }
      }, [
            isPaused,
            simpleTimerInfo,
            clockStatus,
            isSimpleMode,
            time,
            customTimerInfo,
            setClockStatus,
            setReadyToRunningSimple,
            setRunningToFinishedSimple,
            setRunningToRunningWorkLapEndedSimple,
            setRunningToRunningRestLapEndedSimple,
            setFinishedToZeroSimple,
            setFinishedToReadySimple,
            setCustomTimerInfo,
      ]);

      return (
            <>
                  {/* Clock display - mobile: 4x4, desktop: 4x4 */}
                  <div className="col-span-4 row-span-4 lg:col-start-1 lg:row-start-2 h-full rounded-3xl content-center dark:bg-timberwolf bg-floralWhite flex flex-col relative">
                        {/* Keyboard shortcuts button */}
                        <button
                              onClick={() => setShowShortcuts(!showShortcuts)}
                              className="absolute top-4 left-4 z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl hover:scale-110 hover:bg-blackOlive/10 dark:hover:bg-eerieBlack/20 transition-all duration-200 cursor-pointer"
                        >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 lg:w-6 lg:h-6 text-blackOlive/30 dark:text-eerieBlack/40">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h8" />
                              </svg>
                        </button>

                        {/* Shortcuts card */}
                        {showShortcuts && (
                              <div className="absolute top-14 left-4 lg:top-16 z-20 bg-blackOlive dark:bg-eerieBlack text-floralWhite dark:text-timberwolf rounded-2xl p-4 shadow-lg min-w-[180px]">
                                    <div className="flex justify-between items-center mb-3">
                                          <p className="font-bold text-sm lg:text-base">{t.shortcuts}</p>
                                          <button
                                                onClick={() => setShowShortcuts(false)}
                                                className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-floralWhite/20 transition-colors duration-200 cursor-pointer"
                                          >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                      <path d="M18 6 6 18" />
                                                      <path d="m6 6 12 12" />
                                                </svg>
                                          </button>
                                    </div>
                                    <div className="flex flex-col gap-2 text-sm">
                                          <div className="flex justify-between items-center gap-4">
                                                <p className="pointer-events-auto">{t.playPause}</p>
                                                <kbd className="bg-floralWhite/20 px-2 py-0.5 rounded-md flex items-center justify-center">
                                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-4">
                                                            <path d="M4 10V12H20V10" />
                                                      </svg>
                                                </kbd>
                                          </div>
                                          <div className="flex justify-between items-center gap-4">
                                                <p className="pointer-events-auto">{t.reset}</p>
                                                <kbd className="bg-floralWhite/20 px-2 py-0.5 rounded-md font-mono text-xs">R</kbd>
                                          </div>
                                    </div>
                              </div>
                        )}

                        <div className="p-4 h-full flex flex-col justify-center items-center">
                              <TimeDigits value={formatTime(time)} className="font-black text-blackOlive dark:text-eerieBlack text-8xl md:text-8xl xl:text-9xl text-center" />
                              <div className="flex px-8 w-full">
                                    <p className="font-medium text-blackOlive dark:text-eerieBlack text-lg text-center w-1/2">
                                          {t.min}
                                    </p>
                                    <p className="font-medium text-blackOlive dark:text-eerieBlack text-lg text-center w-1/2">
                                          {t.sec}
                                    </p>
                              </div>
                        </div>
                        <div className="w-full flex flex-row">
                              <div
                                    className={`h-6 flex-1 rounded-bl-3xl ${isAlternate ? "bg-burntSienna" : "bg-jade"
                                          }`}
                              ></div>
                              <div
                                    className={`h-6 flex-1 ${isAlternate ? "bg-jade" : "bg-burntSienna"
                                          }`}
                              ></div>
                              <div
                                    className={`h-6 flex-1 ${isAlternate ? "bg-burntSienna" : "bg-jade"
                                          }`}
                              ></div>
                              <div
                                    className={`h-6 flex-1 ${isAlternate ? "bg-jade" : "bg-burntSienna"
                                          }`}
                              ></div>
                              <div
                                    className={`h-6 flex-1 ${isAlternate ? "bg-burntSienna" : "bg-jade"
                                          }`}
                              ></div>
                              <div
                                    className={`h-6 flex-1 rounded-br-3xl ${isAlternate ? "bg-jade" : "bg-burntSienna"
                                          }`}
                              ></div>
                        </div>
                  </div>

                  {/* Sets progress bar - 4x1 */}
                  <div
                        className="col-span-4 lg:col-start-1 lg:row-start-6 h-full rounded-3xl relative overflow-hidden dark:bg-eerieBlack bg-floralWhite flex items-center justify-center"
                  >
                        {(clockStatus === ClockStatus.RUNNING || clockStatus === ClockStatus.PAUSED) && (
                              <>
                                    {/* Simple Mode Progress Bar */}
                                    {isSimpleMode && (
                                          <div
                                                className={`absolute left-0 top-0 h-full transition-all duration-1000
                                        ${simpleTimerInfo.isWorkLap
                                                            ? "bg-burntSienna"
                                                            : "bg-jade"
                                                      }`}
                                                style={{
                                                      width: `${(time /
                                                            (simpleTimerInfo.isWorkLap
                                                                  ? simpleTimerInfo.workLapDuration
                                                                  : simpleTimerInfo.restLapDuration)) *
                                                            100
                                                            }%`,
                                                }}
                                          />
                                    )
                                    }

                                    {/* Custom Mode Progress Bar */}
                                    {!isSimpleMode && (
                                          <div
                                                className={`absolute left-0 top-0 h-full transition-all duration-1000`}
                                                style={{
                                                      width: `${(time / customTimerInfo.remainingIntervals[0].duration) *
                                                            100
                                                            }%`,
                                                      backgroundColor: customTimerInfo.remainingIntervals.length > 0 ? customTimerInfo.remainingIntervals[0].color : Colors.EerieBlack,
                                                }}
                                          />
                                    )

                                    }

                              </>
                        )}
                        <p className="font-bold dark:text-timberwolf text-blackOlive text-3xl lg:text-5xl text-center relative z-10">
                              {isSimpleMode ? simpleTimerInfo.remainingSets : customTimerInfo.remainingSets}
                        </p>
                  </div>
            </>
      );
};

export default Clock;
