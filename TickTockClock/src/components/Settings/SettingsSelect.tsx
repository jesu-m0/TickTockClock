import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SettingsSelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  onPreview?: (value: string) => void;
}

const SettingsSelect: React.FC<SettingsSelectProps> = ({ label, value, options, onChange, onPreview }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(o => o.value === value)?.label ?? value;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-blackOlive dark:text-timberwolf text-sm lg:text-base">
        {label}
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1" ref={containerRef}>
          {/* Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between rounded-xl px-4 py-2.5
              bg-blackOlive/10 dark:bg-blackOlive
              text-blackOlive dark:text-timberwolf
              font-semibold text-sm lg:text-base
              cursor-pointer transition-colors duration-200
              hover:bg-blackOlive/15 dark:hover:bg-blackOlive/80"
          >
            <span>{selectedLabel}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={`w-3.5 h-3.5 fill-blackOlive/50 dark:fill-timberwolf/50 transition-transform duration-200
                ${isOpen ? 'rotate-180' : ''}`}
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </button>

          {/* Options list */}
          {isOpen && (
            <div className="absolute z-20 mt-1 w-full rounded-xl overflow-hidden shadow-lg
              bg-floralWhite dark:bg-blackOlive
              border border-blackOlive/10 dark:border-timberwolf/10">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    onPreview?.(opt.value);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm lg:text-base font-semibold
                    cursor-pointer transition-colors duration-150
                    ${opt.value === value
                      ? 'bg-jade/20 text-jade'
                      : 'text-blackOlive dark:text-timberwolf hover:bg-blackOlive/5 dark:hover:bg-eerieBlack/50'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Preview button */}
        {onPreview && (
          <button
            type="button"
            onClick={() => onPreview(value)}
            className="shrink-0 w-10 h-10 rounded-xl bg-blackOlive/10 dark:bg-blackOlive
              flex items-center justify-center cursor-pointer
              hover:scale-105 transition-transform duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-3.5 h-3.5 fill-blackOlive dark:fill-timberwolf">
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.8 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsSelect;
