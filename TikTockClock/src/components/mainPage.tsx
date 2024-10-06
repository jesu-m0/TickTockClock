import React, { useState } from 'react';
import './MainPage.css';

const MainPage: React.FC = () => {

  const [isPaused, setIsPaused] = useState(true);
  const [isClicked, setIsClicked] = useState(false);


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

          <div className='col-span-6 row-span-1 rounded-xl content-center flex'>
            <div className='w-1/2 h-full p-4 rounded-xl content-center bg-eerieBlack border-r-2 border-dashed border-timberwolf'>

            </div>
            <div className='w-1/2 h-full p-4 rounded-xl content-center bg-eerieBlack'>

            </div>

          </div>



        </div>
      </div>
    </div>
  );
};

export default MainPage;