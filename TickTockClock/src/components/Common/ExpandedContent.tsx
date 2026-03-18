
import React from "react";
import { useClockStatus } from "../../context/ClockContext";
import { formatTime } from "../../utils/formatTime";
import ClockCard from "./ClockCard";
import ProgressBarFill from "./ProgressBarFill";

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

      const {
            // Timer state
            time,

            // Simple mode
            isSimpleMode,

            // Runtime state
            simpleTimerState,
            customTimerState,

            // Animation state
            isAlternate,
      } = useClockStatus();
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
                              <ClockCard
                                    value={formatTime(time)}
                                    barCount={10}
                                    isAlternate={isAlternate}
                                    className="mx-auto h-[50vh] lg:h-[60vh] lg:w-[60vw] w-[85vw] mt-[5vh] items-center justify-center"
                              />

                              {/*Sets progress bar*/}
                              <div
                                    className={`lg:h-[11vh] h-[10vh] lg:w-[60vw] w-[85vw] mx-auto mt-[5vh] rounded-3xl relative overflow-hidden dark:bg-muted bg-surface flex items-center justify-center`}
                              >
                                    <ProgressBarFill />
                                    <p className="font-bold dark:text-baseClr text-baseClr text-5xl md:text-6xl lg:text-7xl text-center relative z-10">
                                          {isSimpleMode ? simpleTimerState.remainingSets : customTimerState.remainingSets}
                                    </p>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default ExpandedContent;
