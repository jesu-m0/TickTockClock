import React, { useState, useEffect } from 'react';
import { AnimationType, ClockStatus } from '../../types';
import { SimpleTimerInfo } from '../../types/SimpleTimerInfo';
import { useClockStatus } from '../../context/ClockContext';

interface ClockProps {
      isPaused: boolean;
      setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
      reset: boolean;
      simpleTimerInfo: SimpleTimerInfo;
      setSimpleTimerInfo: React.Dispatch<React.SetStateAction<SimpleTimerInfo>>;
      isSimpleMode: boolean;
}

//TODO: Are status well controlled? NO.
const Clock: React.FC<ClockProps> = ({ isPaused, setIsPaused, reset, simpleTimerInfo, setSimpleTimerInfo, isSimpleMode }) => {
      const [time, setTime] = useState(0);
      const [isAlternate, setIsAlternate] = useState(false);
      const [remainingCycles, setRemainingCycles] = useState(isSimpleMode ? simpleTimerInfo.cycles : null); //TODO: change when the custom mode is implemented

      const { clockStatus, setClockStatus } = useClockStatus();

      const [simpleLapCounts, setSimpleLapCounts] = useState({
            workLaps: 0,
            restLaps: 0
      });

      useEffect(() => {
            if (isSimpleMode) {
                  setRemainingCycles(simpleTimerInfo.cycles);
            } else {
                  setRemainingCycles(null); //TODO: change when the custom mode is implemented
            }
      }, [isSimpleMode]);

      useEffect(() => {
            let timer: number | null = null;

            if (clockStatus === ClockStatus.RUNNING) {
                  timer = window.setInterval(() => {
                        setTime((prevTime) => Math.max(0, prevTime - 1));
                        setIsAlternate(prev => !prev);
                  }, 1000);
            }

            return () => {
                  if (timer !== null) {
                        clearInterval(timer);
                  }
            };
      }, [clockStatus]);

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

      // State diagram implementation
      useEffect(() => {
            try {
                  if (isSimpleMode) {
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
                                          setReadyToRunningSimple();
                                    }
                                    break;


                              case ClockStatus.RUNNING:

                                    if (isPaused) {
                                          console.log('Status Change: RUNNING -> PAUSED');
                                          setClockStatus(ClockStatus.PAUSED);
                                    }

                                    if (time === 0 && simpleLapCounts.workLaps === 0 && simpleLapCounts.restLaps === 1) {
                                          console.log('Status Change: RUNNING -> FINISHED');
                                          setRunningToFinishedSimple();
                                    } else if (time === 0 && simpleLapCounts.workLaps === simpleLapCounts.restLaps) {
                                          console.log('Status Change: RUNNING -> RUNNING: work lap ended.');
                                          setRunningToRunningWorkLapEndedSimple();
                                    } else if (time === 0 && simpleLapCounts.workLaps < simpleLapCounts.restLaps) {
                                          console.log('Status Change: RUNNING -> RUNNING: rest lap ended, cycle completed. ' + simpleLapCounts.workLaps + ' cycles remaining.');
                                          setRunningToRunningRestLapEndedSimple();
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

                                    alert('Congratulations! You have completed your workout!');

                                    if (simpleTimerInfo.workLapDuration === 0 || simpleTimerInfo.restLapDuration === 0) { //Theoretically never happens because it's not possible to change lap durartions while running.
                                          console.log('Status Change: FINISHED -> ZERO');
                                          setFinishedToZeroSimple();
                                    }
                                    if (simpleTimerInfo.workLapDuration > 0 && simpleTimerInfo.restLapDuration > 0) {
                                          console.log('Status Change: FINISHED -> READY');
                                          setClockStatus(ClockStatus.READY);
                                          setFinishedToReadySimple();
                                    }
                                    break;
                        }
                  } else {
                        //TODO: implement custom logic
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

      const setReadyToRunningSimple = () => {
            //Set parameters for the first lap. The workout gonna start NOW.
            setRemainingCycles(simpleTimerInfo.cycles);
            setSimpleLapCounts({ workLaps: simpleTimerInfo.cycles, restLaps: simpleTimerInfo.cycles });
            setTime(simpleTimerInfo.workLapDuration);
            setClockStatus(ClockStatus.RUNNING);
      }

      const setRunningToFinishedSimple = () => {
            
            setRemainingCycles(prev => prev !== null ? Math.max(0, prev - 1) : 0);
            setSimpleLapCounts(prev => ({ ...prev, restLaps: prev.restLaps - 1 }));

            console.log('Status: FINISHED - Setting animation: ' + AnimationType.WORKOUT_FINISHED_SIMPLE);
            setSimpleTimerInfo(prev => ({ ...prev, currentAnimation: AnimationType.WORKOUT_FINISHED_SIMPLE }));
            setClockStatus(ClockStatus.FINISHED)
      }

      const setRunningToRunningWorkLapEndedSimple = () => {
            setSimpleLapCounts(prev => ({ ...prev, workLaps: prev.workLaps - 1 }));
            setTime(simpleTimerInfo.restLapDuration);
            setClockStatus(ClockStatus.RUNNING);
      }

      const setRunningToRunningRestLapEndedSimple = () => {
            setSimpleLapCounts(prev => ({ ...prev, restLaps: prev.restLaps - 1 }));
            setRemainingCycles(prev => prev !== null ? Math.max(0, prev - 1) : 0);
            if (remainingCycles != 0) {
                  setTime(simpleTimerInfo.workLapDuration);
            }
            setClockStatus(ClockStatus.RUNNING);
      }

      const setFinishedToZeroSimple = () => {
            setSimpleLapCounts({ workLaps: 0, restLaps: 0 });
            setIsPaused(true);
            setClockStatus(ClockStatus.ZERO);
      }

      const setFinishedToReadySimple = () => {
            setSimpleLapCounts({ workLaps: simpleTimerInfo.cycles, restLaps: simpleTimerInfo.cycles });
            setIsPaused(true);
            setClockStatus(ClockStatus.READY);
      }

      return (
            <>
                  <div className='flex-grow rounded-3xl content-center bg-timberwolf flex flex-col'>
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
                  </div>
                  <div className={`h-[100px] rounded-3xl gap-5 ${clockStatus === ClockStatus.RUNNING || clockStatus === ClockStatus.PAUSED ?
                              simpleLapCounts.workLaps === simpleLapCounts.restLaps ? 'bg-burntSienna' : 'bg-jade'
                              : 'bg-eerieBlack'
                        } flex items-center justify-center`}>
                        <p className="font-bold text-timberwolf text-5xl text-center">
                              {remainingCycles}
                        </p>
                  </div>
            </>
      );
};

export default Clock;


