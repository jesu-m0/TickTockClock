import React, { useState, useEffect } from 'react';
import { ClockStatus } from '../../types';
import { SimpleTimerInfo } from '../../types/SimpleTimerInfo';

interface ClockProps {
      isPaused: boolean;
      reset: boolean;
      simpleTimerInfo: SimpleTimerInfo;
      isSimpleMode: boolean;
      onStatusChange: (status: ClockStatus) => void;
}

//TODO: Are status well controlled?
const Clock: React.FC<ClockProps> = ({ isPaused, reset, simpleTimerInfo, isSimpleMode, onStatusChange }) => {
      const [time, setTime] = useState(0);
      const [isAlternate, setIsAlternate] = useState(false);
      const [status, setStatus] = useState<ClockStatus>(ClockStatus.ZERO);

      useEffect(() => {
            let timer: number | null = null;

            if (!isPaused) {
                  timer = window.setInterval(() => {
                        setTime((prevTime) => prevTime + 1);
                        setIsAlternate(prev => !prev);
                  }, 1000);
            }

            return () => {
                  if (timer !== null) {
                        clearInterval(timer);
                  }
            };
      }, [isPaused]);

      useEffect(() => {
            if (reset) {
                  setTime(0);
            }
      }, [reset]);

      // Format time to MM:SS
      const formatTime = (seconds: number) => {
            const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            return `${mins}:${secs}`;
      };

      // Update status based on timer logic
      useEffect(() => {
            // Example logic
            if (simpleTimerInfo.workLapDuration === 0 && simpleTimerInfo.restLapDuration === 0) {
                  setStatus(ClockStatus.ZERO);
            } else if (!isPaused) {
                  setStatus(ClockStatus.RUNNING);
            }

            onStatusChange(status);
      }, [isPaused, simpleTimerInfo, /* other dependencies */]);

      return (
            <>
                  <div className="p-4 h-full flex flex-col justify-center items-center">
                        <p className="font-black text-eerieBlack text-9xl text-center">
                              {formatTime(time)}
                        </p>
                        <div className="flex px-8 w-full">
                              <p className="font-medium text-eerieBlack text-lg text-center w-1/2">
                                    min
                              </p>
                              <p className="font-medium text-eerieBlack text-lg text-center w-1/2">
                                    sec
                              </p>
                        </div>
                  </div>
                  <div className="w-full flex flex-row">
                        <div className={`h-6 flex-1 rounded-bl-3xl ${isAlternate ? 'bg-burntSienna' : 'bg-jade'}`}></div>
                        <div className={`h-6 flex-1 ${isAlternate ? 'bg-jade' : 'bg-burntSienna'}`}></div>
                        <div className={`h-6 flex-1 ${isAlternate ? 'bg-burntSienna' : 'bg-jade'}`}></div>
                        <div className={`h-6 flex-1 ${isAlternate ? 'bg-jade' : 'bg-burntSienna'}`}></div>
                        <div className={`h-6 flex-1 ${isAlternate ? 'bg-burntSienna' : 'bg-jade'}`}></div>
                        <div className={`h-6 flex-1 rounded-br-3xl ${isAlternate ? 'bg-jade' : 'bg-burntSienna'}`}></div>
                  </div>
            </>
      );
};

export default Clock;
