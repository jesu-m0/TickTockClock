import React from "react";
import { useClockStatus } from "../../context/ClockContext";
import { ClockStatus, Colors } from "../../types";

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

            // Pause state
            //isPaused,
            //setIsPaused,

            // Simple mode
            isSimpleMode,

            // Simple mode configuration
            simpleTimerInfo,

            customTimerInfo,

            // Animation state
            isAlternate,
      } = useClockStatus();

      return (
            <>
                  <div className="h-full w-full dark:bg-eerieBlack bg-timberwolf">
                        <button onClick={unexpand}>
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="dark:text-timberwolf text-blackOlive h-12 w-12 mt-4 ml-4"
                              >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                              </svg>
                        </button>

                        <div className="flex flex-col justify-center">
                              {/*Clock*/}
                              <div className="mx-auto dark:bg-timberwolf bg-floralWhite h-[50vh] lg:h-[60vh] lg:w-[60vw] w-[85vw] rounded-3xl mt-[5vh] flex flex-col items-center justify-center">
                                    <div className="h-full flex flex-col justify-center items-center">
                                          <p className="text-blackOlive 2xl:text-[18rem] xl:text-[16rem] lg:text-[14rem] md:text-[12rem] text-8xl font-black">
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

                              {/*Sets progress bar*/}
                              <div
                                    className={`lg:h-[11vh] h-[10vh] lg:w-[60vw] w-[85vw] mx-auto mt-[5vh] rounded-3xl relative overflow-hidden dark:bg-timberwolf bg-floralWhite flex items-center justify-center`}
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
                                    <p className="font-bold dark:text-blackOlive text-blackOlive text-4xl lg:text-5xl text-center relative z-10">
                                          {isSimpleMode ? simpleTimerInfo.remainingSets : customTimerInfo.sets}
                                    </p>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default ExpandedContent;
