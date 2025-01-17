import React from 'react';
import './CustomInfo.css';

interface CustomInfoProps {
  
}

const CustomInfo: React.FC<CustomInfoProps> = ({ }) => {
  return (
    <div className="col-span-8 row-span-4 rounded-3xl bg-eerieBlack p-4">
      <p className='text-timberwolf text-center text-5xl font-black'>Work in progress</p>
    </div>
  );
};

export default CustomInfo; 