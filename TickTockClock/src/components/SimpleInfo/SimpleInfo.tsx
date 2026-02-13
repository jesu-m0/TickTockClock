import React, { useState } from 'react';
import './SimpleInfo.css';
import { AnimationType, ClockStatus } from '../../types';
import { useClockStatus } from '../../context/ClockContext';

export interface WorkDurationButton {
      id: string;
      seconds: number;
      label: string;
      isClicked: boolean;
      size: 'xs' | 's' | 'm' | 'l' | 'xl';
}

const SimpleInfo: React.FC = () => {
      const {
            simpleTimerInfo,
            setSimpleTimerInfo,
            clockStatus
      } = useClockStatus();

      const [buttonDoAnimation, setButtonDoAnimation] = useState<string>("");

      const [workUpButtons, setWorkUpButtons] = useState<WorkDurationButton[]>([
            { id: 'workUp1', seconds: 1, label: '+1"', isClicked: false, size: 'xs' },
            { id: 'workUp5', seconds: 5, label: '+5"', isClicked: false, size: 's' },
            { id: 'workUp30', seconds: 30, label: '+30"', isClicked: false, size: 'm' },
            { id: 'workUp300', seconds: 300, label: "+5'", isClicked: false, size: 'xl' },
      ]);

      const [workDownButtons, setWorkDownButtons] = useState<WorkDurationButton[]>([
            { id: 'workDown1', seconds: 1, label: '-1"', isClicked: false, size: 'xs' },
            { id: 'workDown5', seconds: 5, label: '-5"', isClicked: false, size: 's' },
            { id: 'workDown30', seconds: 30, label: '-30"', isClicked: false, size: 'm' },
            { id: 'workDown300', seconds: 300, label: "-5'", isClicked: false, size: 'xl' },
      ]);

      const [restUpButtons, setRestUpButtons] = useState<WorkDurationButton[]>([
            { id: 'restUp1', seconds: 1, label: '+1"', isClicked: false, size: 'xs' },
            { id: 'restUp5', seconds: 5, label: '+5"', isClicked: false, size: 's' },
            { id: 'restUp30', seconds: 30, label: '+30"', isClicked: false, size: 'm' },
            { id: 'restUp300', seconds: 300, label: "+5'", isClicked: false, size: 'xl' },
      ]);

      const [restDownButtons, setRestDownButtons] = useState<WorkDurationButton[]>([
            { id: 'restDown1', seconds: 1, label: '-1"', isClicked: false, size: 'xs' },
            { id: 'restDown5', seconds: 5, label: '-5"', isClicked: false, size: 's' },
            { id: 'restDown30', seconds: 30, label: '-30"', isClicked: false, size: 'm' },
            { id: 'restDown300', seconds: 300, label: "-5'", isClicked: false, size: 'xl' },
      ]);

      //Control the animation of + or - when clicked
      const [plusClicked, setPlusClicked] = useState(false);
      const [minusClicked, setMinusClicked] = useState(false);

      const handleWorkDurationUp = (seconds: number, buttonId: string) => {

            console.log('Current clockStatus:', clockStatus);

            if (clockStatus === ClockStatus.ZERO || clockStatus === ClockStatus.READY) {
                  setSimpleTimerInfo({ ...simpleTimerInfo, workLapDuration: simpleTimerInfo.workLapDuration + seconds });

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
                  setSimpleTimerInfo({ ...simpleTimerInfo, currentAnimation: AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00 })
                  console.log(AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00);

            }
      };

      const handleWorkDurationDown = (seconds: number, buttonId: string) => {
            if (clockStatus === ClockStatus.ZERO || clockStatus === ClockStatus.READY) {
                  setSimpleTimerInfo({ ...simpleTimerInfo, workLapDuration: Math.max(0, simpleTimerInfo.workLapDuration - seconds) })


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
                  setSimpleTimerInfo({ ...simpleTimerInfo, currentAnimation: AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00 })
            }
      };

      const handleRestDurationUp = (seconds: number, buttonId: string) => {
            if (clockStatus === ClockStatus.ZERO || clockStatus === ClockStatus.READY) {

                  setSimpleTimerInfo({ ...simpleTimerInfo, restLapDuration: simpleTimerInfo.restLapDuration + seconds })

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
                  setSimpleTimerInfo({ ...simpleTimerInfo, currentAnimation: AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00 })
            }
      };

      const handleRestDurationDown = (seconds: number, buttonId: string) => {
            if (clockStatus === ClockStatus.ZERO || clockStatus === ClockStatus.READY) {

                  setSimpleTimerInfo({ ...simpleTimerInfo, restLapDuration: Math.max(0, simpleTimerInfo.restLapDuration - seconds) })

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
                  setSimpleTimerInfo({ ...simpleTimerInfo, currentAnimation: AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00 })
            }
      };

      const handleSetsUp = () => {
            setSimpleTimerInfo({ ...simpleTimerInfo, sets: simpleTimerInfo.sets + 1 })
            setPlusClicked(true);
            setTimeout(() => setPlusClicked(false), 300);
      };

      const handleSetsDown = () => {
            if (simpleTimerInfo.sets > 1) {
                  setSimpleTimerInfo({ ...simpleTimerInfo, sets: simpleTimerInfo.sets - 1 });
                  setMinusClicked(true);
                  setTimeout(() => setMinusClicked(false), 300);
            }
      };


      const formatTime = (seconds: number): string => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };

      const getSizeClass = (size: 'xs' | 's' | 'm' | 'l' | 'xl'): string => {
            const sizeMap = {
                  'xs': 'time-button-xs',
                  's': 'time-button-s',
                  'm': 'time-button-m',
                  'l': 'time-button-l',
                  'xl': 'time-button-xl'
            };
            return sizeMap[size];
      };

      return (
            <div className='order-9 lg:order-6 lg:col-span-8 col-span-12 lg:row-span-5 row-span-8 flex flex-col lg:gap-5 gap-3'>

                  {/* First section - Work and Rest */}
                  <div className='flex-1 rounded-3xl content-center dark:bg-eerieBlack bg-floralWhite flex flex-col min-h-0'>
                        <div className='h-full flex flex-col'>

                              {/* Work Section */}
                              <div className='flex-1 items-center flex lg:flex-row flex-col justify-evenly bg-burntSienna rounded-t-3xl'>

                                    {/* Work Timer Display */}
                                    <div className='time-controls-layout'>
                                          <p className="timer-phase-title">Work lap</p>
                                          <div className={`lap-timer-display-container
                                                ${simpleTimerInfo.currentAnimation === AnimationType.EMPTY_LAPS_DURATION && simpleTimerInfo.workLapDuration === 0 ? 'button-error-animation' : ''}`}>
                                                <p className='lap-timer-digits'>
                                                      {formatTime(simpleTimerInfo.workLapDuration)}
                                                </p>
                                          </div>
                                    </div>

                                    {/* Work Controls */}
                                    <div className='timer-lap-buttons-layout'>
                                          <div className="flex gap-1 justify-center max-w-full">
                                                {workUpButtons.map(button => (
                                                      <a
                                                            key={button.id}
                                                            className={`time-button ${getSizeClass(button.size)}
                                                                  ${button.isClicked ? 'scale-animation' : ''}
                                                                  ${(simpleTimerInfo.currentAnimation === AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00) && buttonDoAnimation === button.id ? 'button-error-animation' : ''}`}
                                                            onClick={() => handleWorkDurationUp(button.seconds, button.id)}
                                                      >
                                                            {button.label}
                                                      </a>
                                                ))}
                                          </div>

                                          <div className="flex gap-1 justify-center max-w-full">
                                                {workDownButtons.map(button => (
                                                      <a
                                                            key={button.id}
                                                            className={`time-button ${getSizeClass(button.size)}
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
                              <div className='flex-1 items-center flex lg:flex-row flex-col justify-evenly rounded-b-3xl bg-jade'>
                                    {/* Rest Timer Display */}
                                    <div className='time-controls-layout'>
                                          <p className="timer-phase-title">Rest lap</p>
                                          <div className={`lap-timer-display-container 
                                                ${simpleTimerInfo.currentAnimation === AnimationType.EMPTY_LAPS_DURATION && simpleTimerInfo.restLapDuration === 0 ? 'button-error-animation' : ''}`}>
                                                <p className='lap-timer-digits'>
                                                      {formatTime(simpleTimerInfo.restLapDuration)}
                                                </p>
                                          </div>
                                    </div>

                                    {/* Rest Controls */}
                                    <div className='timer-lap-buttons-layout'>
                                          <div className="flex gap-1 justify-center max-w-full">
                                                {restUpButtons.map(button => (
                                                      <a
                                                            key={button.id}
                                                            className={`time-button ${getSizeClass(button.size)}
                                                                  ${button.isClicked ? 'scale-animation' : ''}
                                                                  ${(simpleTimerInfo.currentAnimation === AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00) && buttonDoAnimation === button.id ? 'button-error-animation' : ''}`}
                                                            onClick={() => handleRestDurationUp(button.seconds, button.id)}
                                                      >
                                                            {button.label}
                                                      </a>
                                                ))}
                                          </div>

                                          <div className="flex gap-1 justify-center max-w-full">
                                                {restDownButtons.map(button => (
                                                      <a
                                                            key={button.id}
                                                            className={`time-button ${getSizeClass(button.size)}
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

                  {/* Sets management */}
                  <div className='h-[60px] rounded-3xl flex items-center lg:gap-5 gap-2 sm:gap-3'>
                        <div className='dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-2/5 flex items-center justify-center'>
                              <p className="dark:text-timberwolf text-blackOlive text-2xl lg:text-3xl font-black">Sets</p>
                        </div>
                        <div
                              className={`dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center
                                    hover:scale-105 transition-transform duration-200 cursor-pointer
                                    ${minusClicked ? 'scale-animation' : ''}`}
                              onClick={handleSetsDown}
                        >
                              <p className="dark:text-timberwolf text-blackOlive text-2xl lg:text-3xl font-black">-</p>
                        </div>
                        <div className='dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center'>
                              <p className="dark:text-timberwolf text-blackOlive text-2xl lg:text-3xl font-black">{simpleTimerInfo.sets}</p>
                        </div>
                        <div
                              className={`dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center
                                    hover:scale-105 transition-transform duration-200 cursor-pointer
                                    ${plusClicked ? 'scale-animation' : ''}`}
                              onClick={handleSetsUp}
                        >
                              <p className="dark:text-timberwolf text-blackOlive text-2xl lg:text-3xl font-black">+</p>
                        </div>
                  </div>
            </div>
      );
};

export default SimpleInfo; 