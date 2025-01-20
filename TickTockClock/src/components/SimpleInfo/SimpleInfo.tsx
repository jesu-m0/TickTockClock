import React, { useState } from 'react';
import './SimpleInfo.css';
import { AnimationType, ClockStatus } from '../../types';
import { useClockStatus } from '../../context/ClockContext';

export interface WorkDurationButton {
      id: string;
      seconds: number;
      label: string;
      isClicked: boolean;
}

const SimpleInfo: React.FC = () => {
      const { 
            simpleTimerInfo, 
            setSimpleTimerInfo, 
            clockStatus 
      } = useClockStatus();

      const [buttonDoAnimation, setButtonDoAnimation] = useState<string>("");

      const [workUpButtons, setWorkUpButtons] = useState<WorkDurationButton[]>([
            { id: 'workUp1', seconds: 1, label: '+1"', isClicked: false },
            { id: 'workUp5', seconds: 5, label: '+5"', isClicked: false },
            { id: 'workUp30', seconds: 30, label: '+30"', isClicked: false },
            { id: 'workUp300', seconds: 300, label: "+5'", isClicked: false },
      ]);

      const [workDownButtons, setWorkDownButtons] = useState<WorkDurationButton[]>([
            { id: 'workDown1', seconds: 1, label: '-1"', isClicked: false },
            { id: 'workDown5', seconds: 5, label: '-5"', isClicked: false },
            { id: 'workDown30', seconds: 30, label: '-30"', isClicked: false },
            { id: 'workDown300', seconds: 300, label: "-5'", isClicked: false },
      ]);

      const [restUpButtons, setRestUpButtons] = useState<WorkDurationButton[]>([
            { id: 'restUp1', seconds: 1, label: '+1"', isClicked: false },
            { id: 'restUp5', seconds: 5, label: '+5"', isClicked: false },
            { id: 'restUp30', seconds: 30, label: '+30"', isClicked: false },
            { id: 'restUp300', seconds: 300, label: "+5'", isClicked: false },
      ]);

      const [restDownButtons, setRestDownButtons] = useState<WorkDurationButton[]>([
            { id: 'restDown1', seconds: 1, label: '-1"', isClicked: false },
            { id: 'restDown5', seconds: 5, label: '-5"', isClicked: false },
            { id: 'restDown30', seconds: 30, label: '-30"', isClicked: false },
            { id: 'restDown300', seconds: 300, label: "-5'", isClicked: false },
      ]);

      const [plusClicked, setPlusClicked] = useState(false);
      const [minusClicked, setMinusClicked] = useState(false);

      const handleWorkDurationUp = (seconds: number, buttonId: string) => {
            
            console.log('Current clockStatus:', clockStatus);

            if (clockStatus === ClockStatus.ZERO || clockStatus === ClockStatus.READY) {
                  setSimpleTimerInfo({...simpleTimerInfo, workLapDuration: simpleTimerInfo.workLapDuration + seconds});

                  // Update only the clicked button's state
                  setWorkUpButtons(prev => prev.map(button => ({
                        ...button,
                        isClicked: button.id === buttonId ? true : button.isClicked
                  })));

                  // Reset the clicked state after animation
                  setTimeout(() => {
                        setWorkUpButtons(prev => prev.map(button => ({
                              ...button,
                              isClicked: button.id === buttonId ? false : button.isClicked
                        })));
                  }, 300);

            } else if (clockStatus === ClockStatus.RUNNING || clockStatus === ClockStatus.PAUSED) {
                  setButtonDoAnimation(buttonId);
                  setSimpleTimerInfo({...simpleTimerInfo, currentAnimation: AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00})
                  console.log(AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00);

            }
      };

      const handleWorkDurationDown = (seconds: number, buttonId: string) => {
            if (clockStatus === ClockStatus.ZERO || clockStatus === ClockStatus.READY) {
                  setSimpleTimerInfo({...simpleTimerInfo, workLapDuration: Math.max(0, simpleTimerInfo.workLapDuration - seconds)})


                  setWorkDownButtons(prev => prev.map(button => ({
                        ...button,
                        isClicked: button.id === buttonId ? true : button.isClicked
                  })));

                  setTimeout(() => {
                        setWorkDownButtons(prev => prev.map(button => ({
                              ...button,
                              isClicked: button.id === buttonId ? false : button.isClicked
                        })));
                  }, 300);
            } else if (clockStatus === ClockStatus.RUNNING || clockStatus === ClockStatus.PAUSED) {
                  setButtonDoAnimation(buttonId);
                  setSimpleTimerInfo({...simpleTimerInfo, currentAnimation: AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00})
            }
      };

      const handleRestDurationUp = (seconds: number, buttonId: string) => {
            if (clockStatus === ClockStatus.ZERO || clockStatus === ClockStatus.READY) {

                  setSimpleTimerInfo({...simpleTimerInfo, restLapDuration: simpleTimerInfo.restLapDuration + seconds})

                  setRestUpButtons(prev => prev.map(button => ({
                        ...button,
                        isClicked: button.id === buttonId ? true : button.isClicked
                  })));

                  setTimeout(() => {
                        setRestUpButtons(prev => prev.map(button => ({
                              ...button,
                              isClicked: button.id === buttonId ? false : button.isClicked
                        })));
                  }, 300);
            } else if (clockStatus === ClockStatus.RUNNING || clockStatus === ClockStatus.PAUSED) {
                  setButtonDoAnimation(buttonId);
                  setSimpleTimerInfo({...simpleTimerInfo, currentAnimation: AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00})
            }
      };

      const handleRestDurationDown = (seconds: number, buttonId: string) => {
            if (clockStatus === ClockStatus.ZERO || clockStatus === ClockStatus.READY) {

                  setSimpleTimerInfo({...simpleTimerInfo, restLapDuration: Math.max(0, simpleTimerInfo.restLapDuration - seconds)})

                  setRestDownButtons(prev => prev.map(button => ({
                        ...button,
                        isClicked: button.id === buttonId ? true : button.isClicked
                  })));

                  setTimeout(() => {
                        setRestDownButtons(prev => prev.map(button => ({
                              ...button,
                              isClicked: button.id === buttonId ? false : button.isClicked
                        })));
                  }, 300);
            } else if (clockStatus === ClockStatus.RUNNING || clockStatus === ClockStatus.PAUSED) {
                  setButtonDoAnimation(buttonId);
                  setSimpleTimerInfo({...simpleTimerInfo, currentAnimation: AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00})
            }
      };

      const handleCyclesUp = () => {
            setSimpleTimerInfo({...simpleTimerInfo, cycles: simpleTimerInfo.cycles + 1})
            setPlusClicked(true);
            setTimeout(() => setPlusClicked(false), 300);
      };

      const handleCyclesDown = () => {
            setSimpleTimerInfo({...simpleTimerInfo, cycles: simpleTimerInfo.cycles - 1})
            setMinusClicked(true);
            setTimeout(() => setMinusClicked(false), 300);
      };

      const formatTime = (seconds: number): string => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };

      return (
            <div className='col-span-8 row-span-5 flex flex-col gap-5'>
                  {/* First section - Work and Rest */}
                  <div className='flex-grow rounded-3xl content-center dark:bg-eerieBlack bg-floralWhite flex flex-col'>
                        <div className='h-full'>
                              {/* Work Section */}
                              <div className='h-1/2 rounded-t-3xl bg-burntSienna items-center flex'>
                                    {/* Work Timer Display */}
                                    <div className='flex flex-col items-center w-1/2'>
                                          <p className="dark:text-timberwolf text-floralWhite text-center text-5xl font-black mb-4">Work lap</p>
                                          <div className={`p-4 dark:bg-timberwolf bg-floralWhite rounded-3xl mx-auto mt-2 w-4/5
                                                ${simpleTimerInfo.currentAnimation === AnimationType.EMPTY_LAPS_DURATION && simpleTimerInfo.workLapDuration === 0 ? 'button-error-animation' : ''}`}>
                                                <p className='text-7xl font-black text-eerieBlack w-full text-center'>
                                                      {formatTime(simpleTimerInfo.workLapDuration)}
                                                </p>
                                          </div>
                                    </div>

                                    {/* Work Controls */}
                                    <div className='flex flex-col w-1/2 items-center gap-2'>
                                          <div className="flex gap-2 justify-center">
                                                {workUpButtons.map(button => (
                                                      <a
                                                            key={button.id}
                                                            className={`time-button 
                                                                  ${button.isClicked ? 'scale-animation' : ''}
                                                                  ${(simpleTimerInfo.currentAnimation === AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00) && buttonDoAnimation === button.id ? 'button-error-animation' : ''}`}
                                                            onClick={() => handleWorkDurationUp(button.seconds, button.id)}
                                                      >
                                                            {button.label}
                                                      </a>
                                                ))}
                                          </div>

                                          <div className="flex gap-2 justify-center">
                                                {workDownButtons.map(button => (
                                                      <a
                                                            key={button.id}
                                                            className={`time-button 
                                                                  ${button.isClicked ? 'scale-animation' : ''}
                                                                  ${(simpleTimerInfo.currentAnimation === AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00) && buttonDoAnimation === button.id ? 'button-error-animation' : ''}`}
                                                            onClick={() => handleWorkDurationDown(button.seconds, button.id)}
                                                      >
                                                            {button.label}
                                                      </a>
                                                ))}
                                          </div>
                                    </div>
                              </div>

                              {/* Rest Section */}
                              <div className='h-1/2 rounded-b-3xl bg-jade items-center flex'>
                                    {/* Rest Timer Display */}
                                    <div className='flex flex-col items-center w-1/2'>
                                          <p className="dark:text-timberwolf text-floralWhite text-center text-5xl font-black mb-4">Rest lap</p>
                                          <div className={`p-4 dark:bg-timberwolf bg-floralWhite rounded-3xl mx-auto mt-2 w-4/5 
                                                ${simpleTimerInfo.currentAnimation === AnimationType.EMPTY_LAPS_DURATION && simpleTimerInfo.restLapDuration === 0 ? 'button-error-animation' : ''}`}>
                                                <p className='text-7xl font-black text-eerieBlack w-full text-center'>
                                                      {formatTime(simpleTimerInfo.restLapDuration)}
                                                </p>
                                          </div>
                                    </div>

                                    {/* Rest Controls */}
                                    <div className='flex flex-col w-1/2 items-center gap-2'>
                                          <div className="flex gap-2 justify-center">
                                                {restUpButtons.map(button => (
                                                      <a
                                                            key={button.id}
                                                            className={`time-button 
                                                                  ${button.isClicked ? 'scale-animation' : ''}
                                                                  ${(simpleTimerInfo.currentAnimation === AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00) && buttonDoAnimation === button.id ? 'button-error-animation' : ''}`}
                                                            onClick={() => handleRestDurationUp(button.seconds, button.id)}
                                                      >
                                                            {button.label}
                                                      </a>
                                                ))}
                                          </div>

                                          <div className="flex gap-2 justify-center">
                                                {restDownButtons.map(button => (
                                                      <a
                                                            key={button.id}
                                                            className={`time-button 
                                                                  ${button.isClicked ? 'scale-animation' : ''}
                                                                  ${(simpleTimerInfo.currentAnimation === AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00) && buttonDoAnimation === button.id ? 'button-error-animation' : ''}`}
                                                            onClick={() => handleRestDurationDown(button.seconds, button.id)}
                                                      >
                                                            {button.label}
                                                      </a>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Second section - New functionality (100px = 1 row) */}
                  <div className='h-[100px] rounded-3xl flex items-center gap-5'>
                        <div className='dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-2/5 flex items-center justify-center'>
                              <p className="dark:text-timberwolf text-blackOlive text-5xl font-black">Cycles</p>
                        </div>
                        <div 
                              className={`dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center 
                                    hover:scale-105 transition-transform duration-200 cursor-pointer
                                    ${minusClicked ? 'scale-animation' : ''}`}
                              onClick={handleCyclesDown}
                        >
                              <p className="dark:text-timberwolf text-blackOlive text-5xl font-black">-</p>
                        </div>
                        <div className='dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center'>
                              <p className="dark:text-timberwolf text-blackOlive text-5xl font-black">{simpleTimerInfo.cycles}</p>
                        </div>
                        <div 
                              className={`dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center 
                                    hover:scale-105 transition-transform duration-200 cursor-pointer
                                    ${plusClicked ? 'scale-animation' : ''}`}
                              onClick={handleCyclesUp}
                        >
                              <p className="dark:text-timberwolf text-blackOlive text-5xl font-black">+</p>
                        </div>
                  </div>
            </div>
      );
};

export default SimpleInfo; 