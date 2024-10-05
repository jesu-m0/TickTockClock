import React from 'react';
import './MainPage.css';

const MainPage: React.FC = () => {
  return (
    <div className='mbView md:mdView lg:lgView'>
        <div className='aspect-[1/1] card xsCard md:sCard lg:lgCard bg-eerieBlack'>
            <p className='text-white md:text-red-500 lg:text-blue-400'>pedro Sanchez</p>
        </div>
    </div>
  );
};

export default MainPage;