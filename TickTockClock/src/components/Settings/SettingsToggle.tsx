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
        <p className="font-bold text-base dark:text-muted text-sm lg:text-base">
          {label}
        </p>
        {description && (
          <p className="text-base/60 dark:text-muted/50 text-xs lg:text-sm mt-0.5">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-300 cursor-pointer
          ${checked ? 'bg-primary' : 'bg-base/30 dark:bg-muted/20'}`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-surface shadow-md transition-transform duration-300
            ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
};

export default SettingsToggle;
