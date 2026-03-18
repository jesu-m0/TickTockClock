import React from "react";
import { useClockStatus } from "../../context/ClockContext";
import { ClockStatus } from "../../types";

const ProgressBarFill: React.FC = () => {
      const {
            clockStatus,
            time,
            isSimpleMode,
            simpleTimerConfig,
            simpleTimerState,
            customTimerState,
      } = useClockStatus();

      if (clockStatus !== ClockStatus.RUNNING && clockStatus !== ClockStatus.PAUSED) {
            return null;
      }

      if (isSimpleMode) {
            const totalDuration = simpleTimerState.isWorkLap
                  ? simpleTimerConfig.workLapDuration
                  : simpleTimerConfig.restLapDuration;

            return (
                  <div
                        className={`absolute left-0 top-0 h-full transition-all duration-1000
                              ${simpleTimerState.isWorkLap ? "bg-secondary" : "bg-primary"}`}
                        style={{ width: `${(time / totalDuration) * 100}%` }}
                  />
            );
      }

      if (customTimerState.remainingIntervals.length > 0) {
            return (
                  <div
                        className="absolute left-0 top-0 h-full transition-all duration-1000"
                        style={{
                              width: `${(time / customTimerState.remainingIntervals[0].duration) * 100}%`,
                              backgroundColor: customTimerState.remainingIntervals[0].color,
                        }}
                  />
            );
      }

      return null;
};

export default ProgressBarFill;
