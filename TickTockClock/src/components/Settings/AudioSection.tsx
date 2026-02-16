import React from 'react';
import SettingsCard from './SettingsCard';
import SettingsToggle from './SettingsToggle';
import SettingsSlider from './SettingsSlider';
import SettingsSelect from './SettingsSelect';
import { useSettings } from '../../context/SettingsContext';
import { previewSound } from '../../utils/soundNotification';
import { useTranslation } from '../../i18n/useTranslation';

const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-5 h-5 lg:w-6 lg:h-6 fill-jade">
    <path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C478.5 334.5 496 297.1 496 256s-17.5-78.5-53.2-112.2c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C559.6 398.5 592 332.1 592 256s-32.4-142.5-88.7-186.2c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z" />
  </svg>
);

const AudioSection: React.FC = () => {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();

  const soundOptions = [
    { value: 'beep', label: t.beep },
    { value: 'chime', label: t.chime },
    { value: 'boxing-bell', label: t.boxingBell },
    { value: 'whistle', label: t.whistle },
    { value: 'tone', label: t.tone },
  ];

  return (
    <SettingsCard title={t.audio} icon={<SpeakerIcon />}>
      <SettingsSlider
        label={t.masterVolume}
        value={settings.masterVolume}
        onChange={(v) => updateSetting('masterVolume', v)}
      />
      <SettingsToggle
        label={t.countdownBeeps}
        description={t.countdownBeepsDesc}
        checked={settings.countdownBeeps}
        onChange={(v) => updateSetting('countdownBeeps', v)}
      />
      <SettingsSelect
        label={t.endIntervalSound}
        value={settings.endIntervalSound}
        options={soundOptions}
        onChange={(v) => updateSetting('endIntervalSound', v)}
        onPreview={previewSound}
      />
      <SettingsSelect
        label={t.endSetSound}
        value={settings.endSetSound}
        options={soundOptions}
        onChange={(v) => updateSetting('endSetSound', v)}
        onPreview={previewSound}
      />
      <SettingsSelect
        label={t.finishSound}
        value={settings.finishSound}
        options={soundOptions}
        onChange={(v) => updateSetting('finishSound', v)}
        onPreview={previewSound}
      />
    </SettingsCard>
  );
};

export default AudioSection;
