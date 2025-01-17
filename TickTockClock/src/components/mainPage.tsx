import React, { useState, useEffect } from 'react';
import Header from './Header/Header.tsx';
import Clock from './Header/Clock.tsx';
import './mainPage.css';
import SimpleInfo from './SimpleInfo/SimpleInfo';
import CustomInfo from './CustomInfo/CustomInfo';
import { AnimationType, ClockStatus } from '../types';
import { SimpleTimerInfo } from '../types/SimpleTimerInfo';
import { useClockStatus } from '../context/ClockContext';


const MainPage: React.FC = () => {

      //Toggle theme
      const [isDarkMode, setDarkMode] = useState(true);

      //Change mode
      const [isSimpleMode, setIsSimpleMode] = useState(true);

      //Start or stop
      const [isPaused, setIsPaused] = useState(true);
      const [isClickedPause, setIsClickedPause] = useState(false);
      const [reset, setReset] = useState(false);
      const [isClickedReset, setIsClickedReset] = useState(false);

       
      const [simpleTimerInfo, setSimpleTimerInfo] = useState<SimpleTimerInfo>({
            workLapDuration: 0,
            restLapDuration: 0,
            cycles: 1,
            currentAnimation: AnimationType.NONE
      });

      //Status of the clock in teh context
      const { clockStatus } = useClockStatus();

      //Change mode
      const changeToSimple = () => {
            setIsSimpleMode(true);
      }

      const changeToCustom = () => {
            setIsSimpleMode(false);
      }

      //Start or stop
      const handlePauseStart = () => {
            if (isSimpleMode && (simpleTimerInfo.workLapDuration === 0 || simpleTimerInfo.restLapDuration === 0)) {
                  setSimpleTimerInfo(prev => ({ ...prev, currentAnimation: AnimationType.EMPTY_LAPS_DURATION }));
                  return;
            } else {
                  setIsPaused(!isPaused);
                  setIsClickedPause(true);
                  setTimeout(() => setIsClickedPause(false), 300);
            }
      };

      const handleReset = () => {
            if(clockStatus === ClockStatus.ZERO){

                  setSimpleTimerInfo(prev => ({ ...prev, currentAnimation: AnimationType.ALREADY_RESET }));

            }

            setIsPaused(true);
            setReset(true);
            setTimeout(() => setReset(false), 100);
            setIsClickedReset(true);
            setTimeout(() => setIsClickedReset(false), 300);
      }

      useEffect(() => {
            if (simpleTimerInfo.currentAnimation !== AnimationType.NONE) {
                  const timer = setTimeout(() => {
                        setSimpleTimerInfo(prev => ({ ...prev, currentAnimation: AnimationType.NONE }));
                  }, 300);
                  return () => clearTimeout(timer);
            }
      }, [simpleTimerInfo.currentAnimation]);

      return (
            <div>
                  <div className="container mx-auto p-5">
                        <div className="grid grid-cols-12 gap-5 auto-rows-[100px]">

                              <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode}></Header>

                              {/*Clock */}
                              <div className={`col-span-4 row-span-4 rounded-3xl content-center flex flex-col gap-5
                                    ${simpleTimerInfo.currentAnimation === AnimationType.ALREADY_RESET || simpleTimerInfo.currentAnimation === AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00 ? 'button-error-animation' : ''}`}>
                                    <Clock
                                          isPaused={isPaused}
                                          setIsPaused={setIsPaused}
                                          reset={reset}
                                          simpleTimerInfo={simpleTimerInfo}
                                          setSimpleTimerInfo={setSimpleTimerInfo}
                                          isSimpleMode={isSimpleMode}
                                    ></Clock>
                              </div>

                              {/*Mode selection*/}
                              <div className='col-span-8 row-span-1 content-center flex'>

                                    {/*Simple btn*/}
                                    <div className='w-1/2 h-full rounded-3xl content-center bg-eerieBlack cursor-pointer flex flex-col' onClick={changeToSimple}>
                                          <div className='pt-4 px-4 h-full'>
                                                <p className={`font-extrabold text-timberwolf text-4xl text-center pt-2 transition-colors duration-300`}>
                                                      Simple
                                                </p>
                                          </div>
                                          <div className='w-full flex flex-row'>
                                                <div className={`
                                                      ${isSimpleMode ? (
                                                            'bg-jade'
                                                      ) : (
                                                            'bg-eerieBlack'
                                                      )}
                                                      h-6 flex-1 rounded-b-3xl transform duration-300`}>
                                                </div>
                                          </div>

                                    </div>

                                    {/*Custom btn*/}
                                    <div className='w-1/2 h-full rounded-3xl content-center bg-eerieBlack cursor-pointer flex flex-col' onClick={changeToCustom}>
                                          <div className='pt-4 px-4 h-full'>
                                                <p className={`font-extrabold text-timberwolf text-4xl text-center pt-2 transition-colors duration-300`}>
                                                      Custom
                                                </p>
                                          </div>
                                          <div className='w-full flex flex-row'>
                                                <div className={`
                ${isSimpleMode ? (
                                                            'bg-eerieBlack'
                                                      ) : (
                                                            'bg-jade'
                                                      )}
                h-6 flex-1 rounded-b-3xl transform duration-300`}></div>
                                          </div>

                                    </div>

                              </div>

                              {isSimpleMode ? (
                                    <SimpleInfo
                                          timerInfo={simpleTimerInfo}
                                          setTimerInfo={setSimpleTimerInfo}
                                          clockStatus={clockStatus}
                                    />
                              ) : (
                                    <CustomInfo
                                    />
                              )}

                              {/*Reset*/}
                              <div className={`col-span-2 row-span-1 bg-saffron p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer 
          ${isClickedReset ? 'scale-animation' : ''}
          ${simpleTimerInfo.currentAnimation === AnimationType.ALREADY_RESET ? 'button-error-animation' : ''}
          ${simpleTimerInfo.currentAnimation === AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00 ? 'button-error-animation' : ''}`}
                                    onClick={handleReset}>

                                    <p className='font-bold text-eerieBlack text-6xl text-center'>Reset</p>

                              </div>

                              {/*Start/stop*/}
                              <div className={`col-span-2 row-span-1 p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer
                                    ${isPaused ? 'bg-timberwolf' : 'bg-burntSienna'}
                                    ${isClickedPause ? 'scale-animation' : ''}
                                    ${simpleTimerInfo.currentAnimation === AnimationType.EMPTY_LAPS_DURATION ? 'button-error-animation' : ''}`}
                                    onClick={handlePauseStart}>

                                    <p className='font-bold text-eerieBlack text-6xl text-center'>
                                          {isPaused ? 'Start' : 'Stop'}
                                    </p>

                              </div>

                              {/*Expand clock*/}
                              <div className='col-span-4 row-span-1 bg-eerieBlack p-4 rounded-3xl flex justify-center items-center hover:scale-105 transition-transform duration-200 cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-12 h-12 fill-timberwolf mr-4'><path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z" /></svg>
                                    <p className='font-bold text-timberwolf text-5xl text-center'>Expand</p>
                              </div>






                        </div>
                  </div>
            </div>
      );
};

export default MainPage;