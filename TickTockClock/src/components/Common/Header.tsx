import React from 'react';
import ThemeToggleButton from './ThemeToggleButton.tsx';

const Header: React.FC = () => {
    return (
        <>
            {/* TickTockClock label - mobile: 4x1, desktop: 6x1 */}
            <div className='col-span-4 lg:col-span-6 lg:col-start-1 lg:row-start-1 h-full p-4 rounded-3xl bg-floralWhite dark:bg-eerieBlack flex items-center justify-center'>
                <h1 className="font-extrabold text-timberwolf text-4xl md:text-5xl xl:text-6xl text-center">
                    <span className='text-burntSienna'>Tick</span>
                    <span className='text-burntSienna'>Tock</span>
                    <span className='text-jade'>Clock</span>
                </h1>
            </div>

            {/* Interval timer label - mobile: 3x1, desktop: 5x1 */}
            <div className='col-span-3 lg:col-span-5 lg:col-start-7 lg:row-start-1 h-full p-4 rounded-3xl bg-floralWhite dark:bg-eerieBlack flex items-center justify-center'>
                <h2 className='font-bold text-blackOlive dark:text-timberwolf rounded text-3xl lg:text-4xl 2xl:text-6xl text-center'>Interval timer</h2>
            </div>

            {/* Theme toggle - 1x1 */}
            <ThemeToggleButton />
        </>
    );
};

export default Header;
