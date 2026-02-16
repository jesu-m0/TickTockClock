import React from 'react';

interface SettingsToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-bold text-blackOlive dark:text-timberwolf text-sm lg:text-base">
          {label}
        </p>
        {description && (
          <p className="text-blackOlive/60 dark:text-timberwolf/50 text-xs lg:text-sm mt-0.5">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-300 cursor-pointer
          ${checked ? 'bg-jade' : 'bg-blackOlive/30 dark:bg-timberwolf/20'}`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-floralWhite shadow-md transition-transform duration-300
            ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
};

export default SettingsToggle;
