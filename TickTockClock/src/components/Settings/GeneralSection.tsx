import React from 'react';
import SettingsCard from './SettingsCard';
import SettingsToggle from './SettingsToggle';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../i18n/useTranslation';

const FlagGB = () => (
  <svg viewBox="0 0 60 30" className="w-5 h-3 lg:w-6 lg:h-4 rounded-sm shrink-0">
    <clipPath id="gb"><rect width="60" height="30" /></clipPath>
    <g clipPath="url(#gb)">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#gb)" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const FlagES = () => (
  <svg viewBox="0 0 60 30" className="w-5 h-3 lg:w-6 lg:h-4 rounded-sm shrink-0">
    <rect width="60" height="7.5" fill="#AA151B" />
    <rect y="7.5" width="60" height="15" fill="#F1BF00" />
    <rect y="22.5" width="60" height="7.5" fill="#AA151B" />
  </svg>
);

const FlagDE = () => (
  <svg viewBox="0 0 60 30" className="w-5 h-3 lg:w-6 lg:h-4 rounded-sm shrink-0">
    <rect width="60" height="10" fill="#000" />
    <rect y="10" width="60" height="10" fill="#DD0000" />
    <rect y="20" width="60" height="10" fill="#FFCC00" />
  </svg>
);

const languages = [
  { value: 'en', label: 'English', flag: <FlagGB /> },
  { value: 'es', label: 'Español', flag: <FlagES /> },
  { value: 'de', label: 'Deutsch', flag: <FlagDE /> },
];

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 lg:w-6 lg:h-6 fill-jade">
    <path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z" />
  </svg>
);

const GeneralSection: React.FC = () => {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();

  return (
    <SettingsCard title={t.general} icon={<GlobeIcon />}>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-blackOlive dark:text-timberwolf text-sm lg:text-base">
          {t.appLanguage}
        </p>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => updateSetting('language', lang.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm lg:text-base transition-colors duration-200 cursor-pointer
                ${settings.language === lang.value
                  ? 'bg-jade text-floralWhite'
                  : 'bg-blackOlive/5 dark:bg-timberwolf/10 text-blackOlive dark:text-timberwolf hover:bg-blackOlive/10 dark:hover:bg-timberwolf/20'
                }`}
            >
              {lang.flag} {lang.label}
            </button>
          ))}
        </div>
      </div>
      <SettingsToggle
        label={t.keepScreenAwake}
        description={t.keepScreenAwakeDesc}
        checked={settings.keepScreenAwake}
        onChange={(v) => updateSetting('keepScreenAwake', v)}
      />
      <SettingsToggle
        label={t.flashScreenOnFinish}
        description={t.flashScreenOnFinishDesc}
        checked={settings.flashScreenOnFinish}
        onChange={(v) => updateSetting('flashScreenOnFinish', v)}
      />
    </SettingsCard>
  );
};

export default GeneralSection;
