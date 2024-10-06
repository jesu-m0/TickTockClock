import React, { useState } from 'react';
import './MainPage.css';

const MainPage: React.FC = () => {

  const [isPaused, setIsPaused] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const [isSimpleMode, setIsSimpleMode] = useState(true);

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

          <div className="col-span-4 row-span-2 bg-eerieBlack p-4 rounded-xl content-center">
            <div className='flex px-8'>
              <p className="font-medium text-timberwolf text-sm text-center w-1/2">min</p>
              <p className="font-medium text-timberwolf text-sm text-center w-1/2">sec</p>
            </div>
            <p className="font-black text-timberwolf text-9xl text-center">00:00</p>
          </div>
          <div className="col-span-8 row-span-2 bg-eerieBlack p-4 rounded-xl content-center">
            <p className="font-black text-timberwolf text-9xl text-center">idk</p>
          </div>

          <div className='col-span-2 row-span-1 bg-timberwolf p-4 rounded-xl content-center'>
            <p className='font-bold text-eerieBlack text-6xl text-center'>Reset</p>
          </div>
          <div className={`col-span-2 row-span-1 p-4 rounded-xl content-center
          ${isPaused ? 'bg-saffron' : 'bg-burntSienna'}
          ${isClicked ? 'scale-animation' : ''}`}
            onClick={handlePauseStart}>
            <p className='font-bold text-eerieBlack text-6xl text-center'>
              {isPaused ? 'Start' : 'Stop'}
            </p>
          </div>

          {/*Mode selection*/}
          <div className='col-span-6 row-span-1 rounded-xl content-center flex'>

            {/*Simple btn*/}
            <div className='w-1/2 h-full p-4 rounded-xl content-center bg-eerieBlack' onClick={changeToSimple}>
              <p className={`font-extrabold text-4xl text-center transition-colors duration-300
              ${isSimpleMode ? 'modeSelected' : 'modeUnselected'}
              `}>
                Simple
              </p>
            </div>

            {/*Custom btn*/}
            <div className='w-1/2 h-full p-4 rounded-xl content-center bg-eerieBlack' onClick={changeToCustom}>
              <p className={`font-extrabold text-4xl text-center transition-colors duration-300
              ${isSimpleMode ? 'modeUnselected' : 'modeSelected'}
              `}>
                Custom
              </p>
            </div>

          </div>




        </div>
      </div>
    </div>
  );
};

export default MainPage;