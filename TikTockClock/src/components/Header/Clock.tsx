import React, { useState, useEffect } from 'react';
import { AnimationType, ClockStatus } from '../../types';
import { SimpleTimerInfo } from '../../types/SimpleTimerInfo';
import { useClockStatus } from '../../context/ClockContext';

interface ClockProps {
      isPaused: boolean;
      reset: boolean;
      simpleTimerInfo: SimpleTimerInfo;
      setSimpleTimerInfo: React.Dispatch<React.SetStateAction<SimpleTimerInfo>>;
      isSimpleMode: boolean;
}

//TODO: Are status well controlled? NO.
const Clock: React.FC<ClockProps> = ({ isPaused, reset, simpleTimerInfo, setSimpleTimerInfo, isSimpleMode }) => {
      const [time, setTime] = useState(0);
      const [isAlternate, setIsAlternate] = useState(false);
      const [remainingCycles, setRemainingCycles] = useState(isSimpleMode ? simpleTimerInfo.cycles : null); //TODO: change when the custom mode is implementedq

      const { clockStatus, setClockStatus } = useClockStatus();

      useEffect(() => {
            if (isSimpleMode) {
                  setRemainingCycles(simpleTimerInfo.cycles);
            } else {
                  setRemainingCycles(null); //TODO: change when the custom mode is implemented
            }
      }, [isSimpleMode]);

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
            try {
                  switch (clockStatus) {
                        case ClockStatus.ZERO:
                              if (time === 0 && simpleTimerInfo.workLapDuration > 0 && simpleTimerInfo.restLapDuration > 0) {
                                    console.log('Status Change: ZERO -> READY');
                                    setClockStatus(ClockStatus.READY);
                              }
                              break;
                        case ClockStatus.READY:
                              if (time === 0 && (simpleTimerInfo.workLapDuration === 0 || simpleTimerInfo.restLapDuration === 0)) {
                                    console.log('Status Change: READY -> ZERO');
                                    setClockStatus(ClockStatus.ZERO);
                              }
                              if (!isPaused) {
                                    console.log('Status Change: READY -> RUNNING');
                                    setClockStatus(ClockStatus.RUNNING);
                              }
                              break;
                        case ClockStatus.RUNNING:
                              if (isPaused) {
                                    console.log('Status Change: RUNNING -> PAUSED');
                                    setClockStatus(ClockStatus.PAUSED);
                              }
                              if (remainingCycles === 0 && time === 0) {
                                    console.log('Status Change: RUNNING -> FINISHED');
                                    setClockStatus(ClockStatus.FINISHED);
                              }
                              break;
                        case ClockStatus.PAUSED:
                              if (!isPaused && time > 0) {
                                    console.log('Status Change: PAUSED -> RUNNING');
                                    setClockStatus(ClockStatus.RUNNING);
                              }
                              if (isPaused && time === 0 && (simpleTimerInfo.workLapDuration === 0 || simpleTimerInfo.restLapDuration === 0)) {
                                    console.log('Status Change: PAUSED -> ZERO');
                                    setClockStatus(ClockStatus.ZERO);
                              }
                              if (isPaused && time === 0 && simpleTimerInfo.workLapDuration > 0 && simpleTimerInfo.restLapDuration > 0) {
                                    console.log('Status Change: PAUSED -> READY');
                                    setClockStatus(ClockStatus.READY);
                              }
                              break;
                        case ClockStatus.FINISHED:
                              if (isSimpleMode) {
                                    console.log('Status: FINISHED - Setting animation');
                                    setSimpleTimerInfo(prev => ({ ...prev, currentAnimation: AnimationType.TIMER_FINISHED_SIMPLE }));

                                    if (simpleTimerInfo.workLapDuration === 0 || simpleTimerInfo.restLapDuration === 0) {
                                          console.log('Status Change: FINISHED -> ZERO');
                                          setClockStatus(ClockStatus.ZERO);
                                    }
                                    if (simpleTimerInfo.workLapDuration > 0 && simpleTimerInfo.restLapDuration > 0) {
                                          console.log('Status Change: FINISHED -> READY');
                                          setClockStatus(ClockStatus.READY);
                                    }
                              } else {
                                    //TODO: implement custom logic
                              }
                              break;
                  }
            } catch (error) {
                  console.error('Error in clock status update:', error);
            }
      }, [
            isPaused, 
            simpleTimerInfo,
            clockStatus,
            isSimpleMode,
            remainingCycles,
            time
      ]);

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
