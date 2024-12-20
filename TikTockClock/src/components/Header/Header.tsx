import React from 'react';
import ThemeToggleButton from './ThemeToggleButton.tsx';

interface HeaderProps {
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ setDarkMode, isDarkMode }) => {
    return (
        <header className="contents">
            <div className='col-span-7 p-4 row-span-1 rounded-3xl bg-eerieBlack'>
                <h1 className="font-extrabold text-timberwolf text-6xl text-center">
                    <span className='text-burntSienna'>Tick</span>
                    <span className='text-burntSienna'>Tock</span>
                    <span className='text-jade'>Clock</span>
                </h1>
            </div>

            <div className='col-span-4 p-4 row-span-1 rounded-3xl bg-eerieBlack'>
                <h2 className='font-bold text-timberwolf rounded text-6xl text-center'>Interval timer</h2>
            </div>
            <ThemeToggleButton setDarkMode={setDarkMode} isDarkMode={isDarkMode} />
        </header>
    );
};

export default Header;