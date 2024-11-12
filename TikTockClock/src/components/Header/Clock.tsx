import React, { useState, useEffect } from 'react';
import { ClockStatus } from '../../types';
import { SimpleTimerInfo } from '../../types/SimpleTimerInfo';

interface ClockProps {
      isPaused: boolean;
      reset: boolean;
      simpleTimerInfo: SimpleTimerInfo;
      isSimpleMode: boolean;
      clockStatus: ClockStatus;
      onStatusChange: (status: ClockStatus) => void;
}

//TODO: Are status well controlled? NO.
const Clock: React.FC<ClockProps> = ({ isPaused, reset, simpleTimerInfo, isSimpleMode, clockStatus, onStatusChange }) => {
      const [time, setTime] = useState(0);
      const [isAlternate, setIsAlternate] = useState(false);
      const [status, setStatus] = useState<ClockStatus>(ClockStatus.ZERO);

      useEffect(() => {
            let timer: number | null = null;

            if (!isPaused) {
                  setStatus(ClockStatus.RUNNING);
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
                  setStatus(ClockStatus.ZERO);
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
            switch (clockStatus) {
                  case ClockStatus.ZERO:
                        // ZERO -> READY
                        if (time === 0 && simpleTimerInfo.workLapDuration > 0 && simpleTimerInfo.restLapDuration > 0) {
                              setStatus(ClockStatus.READY);
                        }
                        break;
                  case ClockStatus.READY:
                        //READY -> ZERO
                        if (time === 0 && (simpleTimerInfo.workLapDuration === 0 || simpleTimerInfo.restLapDuration === 0)) {
                              setStatus(ClockStatus.ZERO);
                        }
                        //READY -> RUNNING
                        if (!isPaused) {
                              setStatus(ClockStatus.RUNNING);
                        }
                        break;
                  case ClockStatus.RUNNING:
                        //RUNNING -> PAUSED
                        if (isPaused) {
                              setStatus(ClockStatus.PAUSED);
                        }
                        break;
                  case ClockStatus.PAUSED:
                        //PAUSED -> RUNNING
                        if (!isPaused && time > 0) {
                              setStatus(ClockStatus.RUNNING);
                        }
                        //PAUSED -> ZERO
                        if (isPaused && time === 0 && (simpleTimerInfo.workLapDuration === 0 || simpleTimerInfo.restLapDuration === 0)) {
                              setStatus(ClockStatus.ZERO);
                        }
                        //PAUSED -> READY
                        if (isPaused && time === 0 && simpleTimerInfo.workLapDuration > 0 && simpleTimerInfo.restLapDuration > 0) {
                              setStatus(ClockStatus.READY);
                        }
                        //PAUSED -> FINISHED
                        //TODO
                        break;
                  case ClockStatus.FINISHED:
                        //FINISHED -> ZERO

                        //FINISHED -> READY
            }

            onStatusChange(status);
      }, [isPaused, simpleTimerInfo]);

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
