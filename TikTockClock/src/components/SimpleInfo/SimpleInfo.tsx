import React, { useState } from 'react';
import './SimpleInfo.css';
import { AnimationType, ClockStatus } from '../../types';
import { SimpleTimerInfo } from '../../types/SimpleTimerInfo';

interface SimpleInfoProps {
      timerInfo: SimpleTimerInfo;
      setTimerInfo: React.Dispatch<React.SetStateAction<SimpleTimerInfo>>;
      clockStatus: ClockStatus;
}

export interface WorkDurationButton {
      id: string;
      seconds: number;
      label: string;
      isClicked: boolean;
}

const SimpleInfo: React.FC<SimpleInfoProps> = ({ timerInfo, setTimerInfo, clockStatus }) => {

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

      const handleWorkDurationUp = (seconds: number, buttonId: string) => {
            if (clockStatus === ClockStatus.ZERO || clockStatus === ClockStatus.READY) {
                  setTimerInfo(prev => ({
                        ...prev,
                        workLapDuration: prev.workLapDuration + seconds
                  }));

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
            } else {
                  setTimerInfo(prev => ({
                        ...prev,
                        currentAnimation: AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_RUNNING
                  }));
                  setButtonDoAnimation(buttonId);
                  console.log(AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_RUNNING);
                  setTimeout(() => setTimerInfo(prev => ({
                        ...prev, 
                        currentAnimation: AnimationType.NONE
                  })), 300);
                  setButtonDoAnimation("");
            }
      };

      const handleWorkDurationDown = (seconds: number, buttonId: string) => {
            setTimerInfo(prev => ({
                  ...prev,
                  workLapDuration: Math.max(0, prev.workLapDuration - seconds)
            }));

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
      };

      const handleRestDurationUp = (seconds: number, buttonId: string) => {
            setTimerInfo(prev => ({
                  ...prev,
                  restLapDuration: prev.restLapDuration + seconds
            }));

            // Update only the clicked button's state
            setRestUpButtons(prev => prev.map(button => ({
                  ...button,
                  isClicked: button.id === buttonId ? true : button.isClicked
            })));

            // Reset the clicked state after animation
            setTimeout(() => {
                  setRestUpButtons(prev => prev.map(button => ({
                        ...button,
                        isClicked: button.id === buttonId ? false : button.isClicked
                  })));
            }, 300);
      };

      const handleRestDurationDown = (seconds: number, buttonId: string) => {
            setTimerInfo(prev => ({
                  ...prev,
                  restLapDuration: Math.max(0, prev.restLapDuration - seconds)
            }));

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
      };

      const formatTime = (seconds: number): string => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };

      return (
            <div className='col-span-8 row-span-4 rounded-3xl content-center bg-eerieBlack flex flex-col'>
                  {/* Work Section */}
                  <div className='h-1/2 rounded-t-3xl bg-burntSienna items-center flex'>
                        {/* Work Timer Display */}
                        <div className='flex flex-col items-center w-1/2'>
                              <p className="text-timberwolf text-center text-5xl font-black mb-4">Work lap</p>
                              <div className={`p-4 bg-timberwolf rounded-3xl mx-auto mt-2 w-4/5
                                    ${timerInfo.currentAnimation === AnimationType.EMPTY_LAPS_DURATION && timerInfo.workLapDuration === 0 ? 'button-error-animation' : ''}`}>
                                    <p className='text-7xl font-black text-eerieBlack w-full text-center'>
                                          {formatTime(timerInfo.workLapDuration)}
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
                                                      ${timerInfo.currentAnimation === AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_RUNNING && buttonDoAnimation === button.id ? 'button-error-animation' : ''}`}
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
                                                className={`time-button ${button.isClicked ? 'scale-animation' : ''}`}
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
                              <p className="text-timberwolf text-center text-5xl font-black mb-4">Rest lap</p>
                              <div className={`p-4 bg-timberwolf rounded-3xl mx-auto mt-2 w-4/5 
                              ${timerInfo.currentAnimation === AnimationType.EMPTY_LAPS_DURATION && timerInfo.restLapDuration === 0 ? 'button-error-animation' : ''}`}>
                                    <p className='text-7xl font-black text-eerieBlack w-full text-center'>
                                          {formatTime(timerInfo.restLapDuration)}
                                    </p>
                              </div>
                        </div>

                        {/* Rest Controls */}
                        <div className='flex flex-col w-1/2 items-center gap-2'>
                              <div className="flex gap-2 justify-center">
                                    {restUpButtons.map(button => (
                                          <a
                                                key={button.id}
                                                className={`time-button ${button.isClicked ? 'scale-animation' : ''}`}
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
                                                className={`time-button ${button.isClicked ? 'scale-animation' : ''}`}
                                                onClick={() => handleRestDurationDown(button.seconds, button.id)}
                                          >
                                                {button.label}
                                          </a>
                                    ))}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default SimpleInfo; 