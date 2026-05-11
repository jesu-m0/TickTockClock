import React from 'react';
import SoundOptionsGrid from './SoundOptionsGrid';

interface SoundOption {
  value: string;
  label: string;
  icon: string;
}

interface SoundPickerProps {
  label: string;
  value: string;
  options: SoundOption[];
  funOptions: SoundOption[];
  cheatMode: boolean;
  onChange: (value: string) => void;
}

const SoundPicker: React.FC<SoundPickerProps> = ({ label, value, options, funOptions, cheatMode, onChange }) => (
  <div className="flex flex-col gap-2">
    <p className="font-bold text-baseClr dark:text-muted text-sm lg:text-base">{label}</p>
    <SoundOptionsGrid
      value={value}
      options={options}
      funOptions={funOptions}
      cheatMode={cheatMode}
      onChange={onChange}
    />
  </div>
);

export default SoundPicker;
