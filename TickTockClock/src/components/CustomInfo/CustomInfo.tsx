import React, { useState } from 'react';
import './CustomInfo.css';
import { useClockStatus } from '../../context/ClockContext';

const CustomInfo: React.FC = () => {

      const {
            customTimerInfo,
            setCustomTimerInfo,
            clockStatus
      } = useClockStatus();

      //Control the animation of + or - when clicked
      const [plusClicked, setPlusClicked] = useState(false);
      const [minusClicked, setMinusClicked] = useState(false);

      const handleSetsUp = () => {
            setCustomTimerInfo({ ...customTimerInfo, sets: customTimerInfo.sets + 1 })
            setPlusClicked(true);
            setTimeout(() => setPlusClicked(false), 300);
      };

      const handleSetsDown = () => {
            if (customTimerInfo.sets > 1) {
                  setCustomTimerInfo({ ...customTimerInfo, sets: customTimerInfo.sets - 1 });
                  setMinusClicked(true);
                  setTimeout(() => setMinusClicked(false), 300);
            }
      };

      const createNewInterval = () => {
            //TODO: open "modal" to create a new interval
      }

      return (
            <>
                  <div className="order-9 lg:order-6 lg:col-span-8 col-span-12 lg:row-span-4 row-span-6 rounded-3xl bg-eerieBlack p-4">
                        <p className='text-timberwolf text-center text-5xl font-black'>Work in progress</p>
                  </div>

                  {/* Sets  */}
                  <div className='order-10 lg:order-11 lg:col-span-8 col-span-12 lg:row-span-1 row-span-1 rounded-3xl flex items-center lg:gap-5 gap-3'>
                        
                        
                        <div className='dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center'>
                              <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-3xl font-black">Sets</p>
                        </div>


                        <div
                              className={`dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center 
                hover:scale-105 transition-transform duration-200 cursor-pointer
                ${minusClicked ? 'scale-animation' : ''}`}
                              onClick={handleSetsDown}
                        >
                              <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black pb-2">-</p>
                        </div>


                        <div className='dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center'>
                              <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black">{customTimerInfo.sets}</p>
                        </div>


                        <div
                              className={`dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center 
                hover:scale-105 transition-transform duration-200 cursor-pointer
                ${plusClicked ? 'scale-animation' : ''}`}
                              onClick={handleSetsUp}
                        >
                              <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black pb-2">+</p>
                        </div>

                        
                        <div
                              className={`bg-jade rounded-3xl h-full w-1/5 flex items-center justify-center 
                hover:scale-105 transition-transform duration-200 cursor-pointer
                `}
                onClick={createNewInterval}
                        >
                              <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black pb-2">Add</p>
                        </div>
                  </div>
            </>
      );
};

export default CustomInfo; 