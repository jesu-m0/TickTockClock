import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SettingsState {
  // General
  language: string;
  keepScreenAwake: boolean;
  flashScreenOnFinish: boolean;

  // Audio
  masterVolume: number;
  countdownBeeps: boolean;
  endIntervalSound: string;
  endSetSound: string;
  finishSound: string;
}

interface SettingsContextType {
  settings: SettingsState;
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
  clearAllData: () => void;
}

const SETTINGS_STORAGE_KEY = 'ticktockclock_settings';

const defaultSettings: SettingsState = {
  language: 'en',
  keepScreenAwake: true,
  flashScreenOnFinish: false,
  masterVolume: 85,
  countdownBeeps: true,
  endIntervalSound: 'beep',
  endSetSound: 'chime',
  finishSound: 'boxing-bell',
};

const loadSettings = (): SettingsState => {
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return defaultSettings;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(loadSettings);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [settings]);

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const clearAllData = () => {
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    localStorage.removeItem('ticktockclock_intervals');
    localStorage.removeItem('ticktockclock_sets');
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, clearAllData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
