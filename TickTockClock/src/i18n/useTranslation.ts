import { useSettings } from '../context/SettingsContext';
import { translations, TranslationKey, Language } from './translations';

export const useTranslation = () => {
  const { settings } = useSettings();
  const lang = (settings.language as Language) || 'en';
  const t = translations[lang] ?? translations.en;

  return {
    t,
    /** Helper for strings with interpolation like "{name}" */
    tf: (key: TranslationKey, vars: Record<string, string>) => {
      let text: string = t[key];
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(`{${k}}`, v);
      }
      return text;
    },
  };
};
