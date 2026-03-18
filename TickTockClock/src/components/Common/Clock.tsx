import React from "react";
import { useClockStatus } from "../../context/ClockContext";
import { useTimerTick } from "../../hooks/useTimerTick";
import { useFavicon } from "../../hooks/useFavicon";
import { useTimerStateMachine } from "../../hooks/useTimerStateMachine";
import { formatTime } from "../../utils/formatTime";
import ClockCard from "./ClockCard";
import ProgressBarFill from "./ProgressBarFill";
import ShortcutsPanel from "./ShortcutsPanel";

const Clock: React.FC = () => {
      const {
            time,
            isSimpleMode,
            isAlternate,
            simpleTimerState,
            customTimerState,
      } = useClockStatus();

      // Activate hooks
      useTimerTick();
      useFavicon();
      useTimerStateMachine();

      return (
            <>
                  {/* Clock display - mobile: 4x4, desktop: 4x4 */}
                  <ClockCard
                        value={formatTime(time)}
                        barCount={6}
                        isAlternate={isAlternate}
                        className="col-span-4 row-span-4 lg:col-start-1 lg:row-start-2 h-full content-center relative"
                  >
                        <ShortcutsPanel />
                  </ClockCard>

                  {/* Sets progress bar - 4x1 */}
                  <div
                        className="col-span-4 lg:col-start-1 lg:row-start-6 h-full rounded-3xl relative overflow-hidden dark:bg-surfaceDark bg-surface flex items-center justify-center"
                  >
                        <ProgressBarFill />
                        <p className="font-bold dark:text-muted text-baseClr text-3xl lg:text-5xl text-center relative z-10">
                              {isSimpleMode ? simpleTimerState.remainingSets : customTimerState.remainingSets}
                        </p>
                  </div>
            </>
      );
};

export default Clock;
