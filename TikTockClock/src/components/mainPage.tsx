import React, { useState } from 'react';
import Header from './Header/Header.tsx';
import './MainPage.css';

const MainPage: React.FC = () => {

  const [isPaused, setIsPaused] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isSimpleMode, setIsSimpleMode] = useState(true);

  const [isDarkMode, setDarkMode] = useState(true);
  const [darkTransition, setDarkTransition] = useState(false);
  const [lightTransition, setLightTransition] = useState(false);

  const toggleTheme = () => {
    if (isDarkMode) {
      setLightTransition(true);
    } else {
      setDarkTransition(true);
    }

    setTimeout(() => {
      setDarkMode(!isDarkMode);
      setDarkTransition(false);
      setLightTransition(false);
    }, 300);
  };

  const changeToSimple = () => {
    setIsSimpleMode(true);
  }

  const changeToCustom = () => {
    setIsSimpleMode(false);
  }

  const handlePauseStart = () => {
    setIsPaused(!isPaused);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <div>
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-12 gap-5 auto-rows-[100px]">

          <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}></Header>

          {/* Name */}
          <div className='col-span-7 p-4 row-span-1 rounded-3xl bg-eerieBlack'>
            <p className='font-extrabold text-timberwolf text-6xl text-center'>
              <span className='text-burntSienna'>Tick</span>
              <span className='text-burntSienna'>Tock</span>
              <span className='text-jade'>Clock</span>
            </p>
          </div>

          <div className='col-span-4 p-4 row-span-1 rounded-3xl bg-eerieBlack'>
            <p className='font-bold text-timberwolf rounded text-6xl text-center'>Interval timer</p>
          </div>

          {/* Light / Dark button */}
          <div className='col-span-1 row-span-1 rounded-full bg-eerieBlack flex justify-center items-center cursor-pointer' onClick={toggleTheme}>
            {isDarkMode ? (
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className={`fill-timberwolf w-12 h-12 transform transition-transform duration-300 ${lightTransition ? 'scale-0' : 'scale-100 hover:scale-105'
                }`}
            >
              <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
            </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={`fill-saffron w-12 h-12 transform transition-transform duration-300 ${darkTransition ? 'scale-0' : 'scale-100 hover:scale-105'
                  }`}
              >
                <path d="M256 0c-13.3 0-24 10.7-24 24l0 64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64c0-13.3-10.7-24-24-24zm0 400c-13.3 0-24 10.7-24 24l0 64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64c0-13.3-10.7-24-24-24zM488 280c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0zM112 256c0-13.3-10.7-24-24-24l-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0c13.3 0 24-10.7 24-24zM437 108.9c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-45.3 45.3c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L437 108.9zM154.2 357.8c-9.4-9.4-24.6-9.4-33.9 0L75 403.1c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l45.3-45.3c9.4-9.4 9.4-24.6 0-33.9zM403.1 437c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-45.3-45.3c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L403.1 437zM154.2 154.2c9.4-9.4 9.4-24.6 0-33.9L108.9 75c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l45.3 45.3c9.4 9.4 24.6 9.4 33.9 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224z" />
              </svg>
              
            )}
          </div>

          {/*Clock */}
          <div className="col-span-4 row-span-3 bg-timberwolf rounded-3xl content-center flex flex-col">
            <div className='p-4 h-full flex flex-col justify-center items-center'>
              <p className="font-black text-eerieBlack text-9xl text-center">00:00</p>
              <div className='flex px-8 w-full'>
                <p className="font-medium text-eerieBlack text-lg text-center w-1/2">min</p>
                <p className="font-medium text-eerieBlack text-lg text-center w-1/2">sec</p>
              </div>
            </div>
            <div className='w-full flex flex-row'>
              <div className='bg-jade h-6 flex-1 rounded-bl-3xl'></div>
              <div className='bg-burntSienna h-6 flex-1'></div>
              <div className='bg-jade h-6 flex-1'></div>
              <div className='bg-burntSienna h-6 flex-1'></div>
              <div className='bg-jade h-6 flex-1'></div>
              <div className='bg-burntSienna h-6 flex-1 rounded-br-3xl'></div>
            </div>
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
          <div className='col-span-2 row-span-1 bg-timberwolf p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer'>
            <p className='font-bold text-eerieBlack text-6xl text-center'>Reset</p>
          </div>

          {/*Start/stop*/}
          <div className={`col-span-2 row-span-1 p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer
          ${isPaused ? 'bg-saffron' : 'bg-burntSienna'}
          ${isClicked ? 'scale-animation' : ''}`}
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