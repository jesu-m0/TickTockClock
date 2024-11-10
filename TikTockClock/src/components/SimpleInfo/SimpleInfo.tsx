import React from 'react';
import './SimpleInfo.css';

interface WorkDurationButton {
  id: string;
  seconds: number;
  label: string;
  isClicked: boolean;
}

interface SimpleInfoProps {
  timerInfo: {
    workLapDuration: number;
    restLapDuration: number;
  };
  workUpButtons: WorkDurationButton[];
  workDownButtons: WorkDurationButton[];
  restUpButtons: WorkDurationButton[];
  restDownButtons: WorkDurationButton[];
  handleWorkDurationUp: (seconds: number, buttonId: string) => void;
  handleWorkDurationDown: (seconds: number, buttonId: string) => void;
  handleRestDurationUp: (seconds: number, buttonId: string) => void;
  handleRestDurationDown: (seconds: number, buttonId: string) => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SimpleInfo: React.FC<SimpleInfoProps> = ({
  timerInfo,
  workUpButtons,
  workDownButtons,
  restUpButtons,
  restDownButtons,
  handleWorkDurationUp,
  handleWorkDurationDown,
  handleRestDurationUp,
  handleRestDurationDown,
}) => {
  return (
    <div className='col-span-8 row-span-4 rounded-3xl content-center bg-eerieBlack flex flex-col'>
      {/* Work Section */}
      <div className='h-1/2 rounded-t-3xl bg-burntSienna items-center flex'>
        {/* Work Timer Display */}
        <div className='flex flex-col items-center w-1/2'>
          <p className="text-timberwolf text-center text-5xl font-black mb-4">Work lap</p>
          <div className='p-4 bg-timberwolf rounded-3xl mx-auto mt-2 w-4/5'>
            <p className='text-7xl font-black text-eerieBlack w-full text-center'>
              {formatTime(timerInfo.workLapDuration)}
            </p>
          </div>
        </div>

        {/* Work Controls */}
        <div className='flex flex-col w-1/2 items-center gap-2'>
          <div className="flex gap-2 justify-center">
            {workUpButtons.map(button => (
              <a
                key={button.id}
                className={`time-button ${button.isClicked ? 'scale-animation' : ''}`}
                onClick={() => handleWorkDurationUp(button.seconds, button.id)}
              >
                {button.label}
              </a>
            ))}
          </div>

          <div className="flex gap-2 justify-center">
            {workDownButtons.map(button => (
              <a
                key={button.id}
                className={`time-button ${button.isClicked ? 'scale-animation' : ''}`}
                onClick={() => handleWorkDurationDown(button.seconds, button.id)}
              >
                {button.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Rest Section */}
      <div className='h-1/2 rounded-b-3xl bg-jade items-center flex'>
        {/* Rest Timer Display */}
        <div className='flex flex-col items-center w-1/2'>
          <p className="text-timberwolf text-center text-5xl font-black mb-4">Rest lap</p>
          <div className='p-4 bg-timberwolf rounded-3xl mx-auto mt-2 w-4/5'>
            <p className='text-7xl font-black text-eerieBlack w-full text-center'>
              {formatTime(timerInfo.restLapDuration)}
            </p>
          </div>
        </div>

        {/* Rest Controls */}
        <div className='flex flex-col w-1/2 items-center gap-2'>
          <div className="flex gap-2 justify-center">
            {restUpButtons.map(button => (
              <a
                key={button.id}
                className={`time-button ${button.isClicked ? 'scale-animation' : ''}`}
                onClick={() => handleRestDurationUp(button.seconds, button.id)}
              >
                {button.label}
              </a>
            ))}
          </div>

          <div className="flex gap-2 justify-center">
            {restDownButtons.map(button => (
              <a
                key={button.id}
                className={`time-button ${button.isClicked ? 'scale-animation' : ''}`}
                onClick={() => handleRestDurationDown(button.seconds, button.id)}
              >
                {button.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleInfo; 