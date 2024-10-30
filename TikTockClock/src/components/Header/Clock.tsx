import React, { useState, useEffect } from 'react';

interface ClockProps {
  isPaused: boolean;
  reset: boolean;
}

const Clock: React.FC<ClockProps> = ({ isPaused, reset }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: number | null = null;

    if (!isPaused) {
      timer = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Cleanup the interval on component unmount or when paused
    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [isPaused]);

  useEffect(() => {
    if (reset) {
      setTime(0);
    }
  }, [reset]);

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <>
      <div className="p-4 h-full flex flex-col justify-center items-center">
        <p className="font-black text-eerieBlack text-9xl text-center">
          {formatTime(time)}
        </p>
        <div className="flex px-8 w-full">
          <p className="font-medium text-eerieBlack text-lg text-center w-1/2">
            min
          </p>
          <p className="font-medium text-eerieBlack text-lg text-center w-1/2">
            sec
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div className="bg-jade h-6 flex-1 rounded-bl-3xl"></div>
        <div className="bg-burntSienna h-6 flex-1"></div>
        <div className="bg-jade h-6 flex-1"></div>
        <div className="bg-burntSienna h-6 flex-1"></div>
        <div className="bg-jade h-6 flex-1"></div>
        <div className="bg-burntSienna h-6 flex-1 rounded-br-3xl"></div>
      </div>
    </>
  );
};

export default Clock;
