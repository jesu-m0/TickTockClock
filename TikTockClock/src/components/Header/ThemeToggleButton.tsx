import React, { useState } from 'react';

interface ThemeToggleButtonProps {
  isDarkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ isDarkMode, setDarkMode }) => {

  const [darkTransition, setDarkTransition] = useState(false);
  const [lightTransition, setLightTransition] = useState(false);

  const handleToggle = () => {
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
  
  return (
    <div
      className="col-span-1 row-span-1 rounded-full bg-eerieBlack flex justify-center items-center cursor-pointer"
      onClick={handleToggle}
    >
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
  );
};

export default ThemeToggleButton;
