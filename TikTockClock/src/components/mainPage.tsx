import React, { useState } from 'react';
import Header from './Header/Header.tsx';
import Clock from './Header/Clock.tsx';
import './MainPage.css';

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


  //Change mode

  const changeToSimple = () => {
    setIsSimpleMode(true);
  }

  const changeToCustom = () => {
    setIsSimpleMode(false);
  }

  //Start or stop

  const handlePauseStart = () => {
    setIsPaused(!isPaused);
    setIsClickedPause(true);
    setTimeout(() => setIsClickedPause(false), 300);
  };

  const handleReset = () => {
    setReset(true);
    setReset(false);
    setIsClickedReset(true);
    setTimeout(() => setIsClickedReset(false), 300);
  }

  return (
    <div>
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-12 gap-5 auto-rows-[100px]">

          <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode}></Header>

          {/*Clock */}
          <div className="col-span-4 row-span-3 rounded-3xl content-center flex flex-col bg-timberwolf">
            <Clock isPaused={isPaused} reset={reset}></Clock>
          </div>

          {/*Mode selection*/}
          <div className='col-span-8 row-span-1 rounded-3xl content-center flex'>

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
                h-6 flex-1 rounded-b-3xl transform duration-300`}></div>
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

          {/* Mode info */}
          <div className='col-span-8 row-span-4 rounded-3xl content-center bg-eerieBlack flex flex-col'>

            <div className='h-1/2 rounded-t-3xl bg-burntSienna items-center flex'>


              <div className='flex flex-col items-center w-1/2'>
                <p className="text-timberwolf text-center text-5xl font-black mb-4">Work lap</p>
                <div className='p-4 bg-timberwolf rounded-3xl mx-auto mt-2 w-4/5'>
                  <p className='text-7xl font-black text-eerieBlack w-full text-center'>00:00</p>
                </div>
              </div>

              <div className='flex flex-col w-1/2 items-center'>
                <a className='text-5xl w-3/5 font-black text-timberwolf bg-eerieBlack rounded-full text-center cursor-pointer flex justify-center items-center leading-none h-16 my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-8 h-8 fill-timberwolf'><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" /></svg>
                </a>

                <a className='text-5xl w-3/5 font-black text-timberwolf bg-eerieBlack rounded-full text-center cursor-pointer flex justify-center items-center leading-none h-16 my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-8 h-8 fill-timberwolf'><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                </a>
              </div>

            </div>
            <div className='h-1/2 rounded-b-3xl bg-jade items-center flex'>
              <div className='flex flex-col items-center w-1/2'>
                <p className="text-timberwolf text-center text-5xl font-black mb-4">Rest lap</p>
                <div className='p-4 bg-timberwolf rounded-3xl mx-auto mt-2 w-4/5'>
                  <p className='text-7xl font-black text-eerieBlack w-full text-center'>00:00</p>
                </div>
              </div>
              <div className='flex flex-col w-1/2 items-center'>
                <a className='text-5xl w-3/5 font-black text-timberwolf bg-eerieBlack rounded-full text-center cursor-pointer flex justify-center items-center leading-none h-16 my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-8 h-8 fill-timberwolf'><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" /></svg>
                </a>

                <a className='text-5xl w-3/5 font-black text-timberwolf bg-eerieBlack rounded-full text-center cursor-pointer flex justify-center items-center leading-none h-16 my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-8 h-8 fill-timberwolf'><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                </a>
              </div>
            </div>

          </div>
          {/*Reset*/}
          <div className={`col-span-2 row-span-1 bg-timberwolf p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer 
          ${isClickedReset ? 'scale-animation' : ''}`}
            onClick={handleReset}>
            
            <p className='font-bold text-eerieBlack text-6xl text-center'>Reset</p>

          </div>

          {/*Start/stop*/}
          <div className={`col-span-2 row-span-1 p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer
          ${isPaused ? 'bg-saffron' : 'bg-burntSienna'}
          ${isClickedPause ? 'scale-animation' : ''}`}
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