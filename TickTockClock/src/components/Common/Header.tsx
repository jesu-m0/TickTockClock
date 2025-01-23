import React from 'react';
import ThemeToggleButton from './ThemeToggleButton.tsx';

const Header: React.FC = () => {
    return (
        <header className="contents">
            <div className='order-1 lg:order-1 p-4 row-span-1 rounded-3xl bg-floralWhite dark:bg-eerieBlack col-span-12 lg:col-span-7'>
                <h1 className="font-extrabold text-timberwolf text-4xl lg:text-6xl text-center">
                    <span className='text-burntSienna'>Tick</span>
                    <span className='text-burntSienna'>Tock</span>
                    <span className='text-jade'>Clock</span>
                </h1>
            </div>

            <div className='order-2 lg:order-2 lg:col-span-4 col-span-9 p-4 row-span-1 rounded-3xl bg-floralWhite dark:bg-eerieBlack'>
                <h2 className='font-bold text-blackOlive dark:text-timberwolf rounded text-3xl lg:text-6xl text-center'>Interval timer</h2>
            </div>
            <ThemeToggleButton />
        </header>
    );
};

export default Header;