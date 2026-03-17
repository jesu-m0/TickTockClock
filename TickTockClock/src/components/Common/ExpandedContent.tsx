
import React from "react";
import { useClockStatus } from "../../context/ClockContext";
import { ClockStatus, Colors } from "../../types";
import { useTranslation } from "../../i18n/useTranslation";
import TimeDigits from "./TimeDigits";

interface ExpandedContentProps {
      setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
      setShowContent: React.Dispatch<React.SetStateAction<boolean>>;
      setShowExpandLetters: React.Dispatch<React.SetStateAction<boolean>>;
      divExist: React.Dispatch<React.SetStateAction<boolean>>;
      openAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpandedContent: React.FC<ExpandedContentProps> = ({
      setIsExpanded,
      setShowContent,
      setShowExpandLetters,
      divExist,
      openAnimation,
}) => {
      const unexpand = () => {
            openAnimation(false);
            setShowContent(false); //200ms content disappear animation
            setTimeout(() => setIsExpanded(false), 200); //700ms div "unexpand" to button animation
            setTimeout(() => divExist(false), 900); //100ms div disappear animation
            setTimeout(() => setShowExpandLetters(true), 1000); //200ms "Expand" appear animation
      };

      // Format time to MM:SS
      const formatTime = (seconds: number) => {
            const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
            const secs = String(seconds % 60).padStart(2, "0");
            return `${mins}:${secs}`;
      };

      const {
            // Clock status
            clockStatus,

            // Timer state
            time,

            // Simple mode
            isSimpleMode,

            // Simple mode configuration
            simpleTimerInfo,

            customTimerInfo,

            // Animation state
            isAlternate,
      } = useClockStatus();
      const { t } = useTranslation();

      return (
            <>
                  <div className="h-full w-full dark:bg-surfaceDark bg-muted">
                        <button onClick={unexpand}>
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="dark:text-muted text-baseClr h-12 w-12 mt-4 ml-4"
                              >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                              </svg>
                        </button>

                        <div className="flex flex-col justify-center">
                              {/*Clock*/}
                              <div className="mx-auto dark:bg-muted bg-surface h-[50vh] lg:h-[60vh] lg:w-[60vw] w-[85vw] rounded-3xl mt-[5vh] flex flex-col items-center justify-center">
                                    <div className="flex-1 flex flex-col justify-center items-center">
                                          <TimeDigits value={formatTime(time)} className="text-baseClr 2xl:text-[18rem] xl:text-[16rem] lg:text-[14rem] md:text-[12rem] text-8xl font-black leading-none" />
                                          <div className="flex px-8 w-full mt-2 md:mt-3 lg:mt-4">
                                                <p className="font-medium text-lg md:text-xl lg:text-2xl xl:text-3xl dark:text-surfaceDark text-baseClr text-center w-1/2">
                                                      {t.min}
                                                </p>
                                                <p className="font-medium text-lg md:text-xl lg:text-2xl xl:text-3xl dark:text-surfaceDark text-baseClr text-center w-1/2">
                                                      {t.sec}
                                                </p>
                                          </div>
                                    </div>
                                    <div className="w-full flex flex-row">
                                          <div
                                                className={`h-6 flex-1 rounded-bl-3xl ${isAlternate ? "bg-secondary" : "bg-primary"
                                                      }`}
                                          ></div>
                                          <div
                                                className={`h-6 flex-1 ${isAlternate ? "bg-primary" : "bg-secondary"
                                                      }`}
                                          ></div>
                                          <div
                                                className={`h-6 flex-1 ${isAlternate ? "bg-secondary" : "bg-primary"
                                                      }`}
                                          ></div>
                                          <div
                                                className={`h-6 flex-1 ${isAlternate ? "bg-primary" : "bg-secondary"
                                                      }`}
                                          ></div>
                                          <div
                                                className={`h-6 flex-1 ${isAlternate ? "bg-secondary" : "bg-primary"
                                                      }`}
                                          ></div>
                                          <div
                                                className={`h-6 flex-1 ${isAlternate ? "bg-primary" : "bg-secondary"
                                                      }`}
                                          ></div>
                                          <div
                                                className={`h-6 flex-1 ${isAlternate ? "bg-secondary" : "bg-primary"
                                                      }`}
                                          ></div>
                                          <div
                                                className={`h-6 flex-1 ${isAlternate ? "bg-primary" : "bg-secondary"
                                                      }`}
                                          ></div>
                                          <div
                                                className={`h-6 flex-1 ${isAlternate ? "bg-secondary" : "bg-primary"
                                                      }`}
                                          ></div>
                                          <div
                                                className={`h-6 flex-1 rounded-br-3xl ${isAlternate ? "bg-primary" : "bg-secondary"
                                                      }`}
                                          ></div>
                                    </div>
                              </div>

                              {/*Sets progress bar*/}
                              <div
                                    className={`lg:h-[11vh] h-[10vh] lg:w-[60vw] w-[85vw] mx-auto mt-[5vh] rounded-3xl relative overflow-hidden dark:bg-muted bg-surface flex items-center justify-center`}
                              >
                                    {(clockStatus === ClockStatus.RUNNING || clockStatus === ClockStatus.PAUSED) && (
                                          <>
                                                {/* Simple Mode Progress Bar */}
                                                {isSimpleMode && (
                                                      <div
                                                            className={`absolute left-0 top-0 h-full transition-all duration-1000
                                        ${simpleTimerInfo.isWorkLap
                                                                        ? "bg-secondary"
                                                                        : "bg-primary"
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
                                    <p className="font-bold dark:text-baseClr text-baseClr text-5xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] text-center relative z-10">                                          {isSimpleMode ? simpleTimerInfo.remainingSets : customTimerInfo.sets}
                                    </p>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default ExpandedContent;
