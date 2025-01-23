import React from 'react';
import ThemeToggleButton from './ThemeToggleButton.tsx';

const Header: React.FC = () => {
    return (
        <header className="contents">
            <div className='order-1 md:order-1 col-span-7 p-4 row-span-1 rounded-3xl bg-floralWhite dark:bg-eerieBlack'>
                <h1 className="font-extrabold text-timberwolf text-6xl text-center">
                    <span className='text-burntSienna'>Tick</span>
                    <span className='text-burntSienna'>Tock</span>
                    <span className='text-jade'>Clock</span>
                </h1>
            </div>

            <div className='order-2 md:order-2 col-span-4 p-4 row-span-1 rounded-3xl bg-floralWhite dark:bg-eerieBlack'>
                <h2 className='font-bold text-blackOlive dark:text-timberwolf rounded text-6xl text-center'>Interval timer</h2>
            </div>
            <ThemeToggleButton />
        </header>
    );
};

export default Header;