import React from 'react';

interface SettingsSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const SettingsSlider: React.FC<SettingsSliderProps> = ({ label, value, onChange, min = 0, max = 100 }) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="font-bold text-blackOlive dark:text-timberwolf text-sm lg:text-base">
          {label}
        </p>
        <span className="font-bold text-jade text-sm lg:text-base">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, var(--color-jade) ${percent}%, color-mix(in srgb, var(--color-timberwolf) 20%, transparent) ${percent}%)`,
        }}
        className="w-full h-2 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-jade
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-jade
          [&::-moz-range-thumb]:border-none
          [&::-moz-range-thumb]:shadow-md
          [&::-moz-range-thumb]:cursor-pointer
          [&::-moz-range-progress]:bg-transparent"
      />
    </div>
  );
};

export default SettingsSlider;
