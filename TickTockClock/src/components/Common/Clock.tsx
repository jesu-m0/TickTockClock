import React, { useEffect, useCallback } from "react";
import { AnimationType, ClockStatus } from "../../types";
import { useClockStatus } from "../../context/ClockContext";
import { useTheme } from "../../context/ThemeContext";

const Clock: React.FC = () => {
  const { isDarkMode } = useTheme();
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

    // Animation state
    isAlternate,
    setIsAlternate,
  } = useClockStatus();

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
              // Work lap ended, next step will be rest lap
              console.log("Status Change: RUNNING -> RUNNING: work lap ended.");
              setRunningToRunningWorkLapEndedSimple();
              //} else if (time === 0 && simpleLapCounts.workLaps < simpleLapCounts.restLaps) {
            } else if (time === 0 && !simpleTimerInfo.isWorkLap) {
              // Rest lap ended, next step will be work lap & remaining sets - 1
              console.log(
                "Status Change: RUNNING -> RUNNING: rest lap ended, cycle completed. " +
                  (simpleTimerInfo.remainingSets - 1) +
                  " sets remaining."
              );
              setRunningToRunningRestLapEndedSimple();
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
        //TODO: implement custom logic
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
    setClockStatus,
    setReadyToRunningSimple,
    setRunningToFinishedSimple,
    setRunningToRunningWorkLapEndedSimple,
    setRunningToRunningRestLapEndedSimple,
    setFinishedToZeroSimple,
    setFinishedToReadySimple,
  ]);

  return (
    <>
      {/*Clock*/}
      <div className="flex-grow rounded-3xl content-center dark:bg-timberwolf bg-floralWhite flex flex-col">
        <div className="p-4 h-full flex flex-col justify-center items-center">
          <p className="font-black text-blackOlive dark:text-eerieBlack text-8xl md:text-8xl xl:text-9xl text-center">
            {formatTime(time)}
          </p>
          <div className="flex px-8 w-full">
            <p className="font-medium text-blackOlive dark:text-eerieBlack text-lg text-center w-1/2">
              min
            </p>
            <p className="font-medium text-blackOlive dark:text-eerieBlack text-lg text-center w-1/2">
              sec
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div
            className={`h-6 flex-1 rounded-bl-3xl ${
              isAlternate ? "bg-burntSienna" : "bg-jade"
            }`}
          ></div>
          <div
            className={`h-6 flex-1 ${
              isAlternate ? "bg-jade" : "bg-burntSienna"
            }`}
          ></div>
          <div
            className={`h-6 flex-1 ${
              isAlternate ? "bg-burntSienna" : "bg-jade"
            }`}
          ></div>
          <div
            className={`h-6 flex-1 ${
              isAlternate ? "bg-jade" : "bg-burntSienna"
            }`}
          ></div>
          <div
            className={`h-6 flex-1 ${
              isAlternate ? "bg-burntSienna" : "bg-jade"
            }`}
          ></div>
          <div
            className={`h-6 flex-1 rounded-br-3xl ${
              isAlternate ? "bg-jade" : "bg-burntSienna"
            }`}
          ></div>
        </div>
      </div>
      {/*Sets progress bar*/}
      <div
        className={`lg:h-[11vh] h-[10vh] rounded-3xl relative overflow-hidden dark:bg-eerieBlack bg-floralWhite flex items-center justify-center`}
      >
        {(clockStatus === ClockStatus.RUNNING ||
          clockStatus === ClockStatus.PAUSED) && (
          <div
            className={`absolute left-0 top-0 h-full transition-all duration-1000
                                        ${
                                          simpleTimerInfo.isWorkLap
                                            ? "bg-burntSienna"
                                            : "bg-jade"
                                        }`}
            style={{
              width: `${
                (time /
                  (simpleTimerInfo.isWorkLap
                    ? simpleTimerInfo.workLapDuration
                    : simpleTimerInfo.restLapDuration)) *
                100
              }%`,
            }}
          />
        )}
        <p className="font-bold dark:text-timberwolf text-blackOlive text-4xl lg:text-5xl text-center relative z-10">
          {isSimpleMode ? simpleTimerInfo.remainingSets : "Coming soon"}
        </p>
      </div>
    </>
  );
};

export default Clock;
