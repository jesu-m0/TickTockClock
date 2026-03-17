import SettingsCard from './SettingsCard';
import { useTheme, ColorTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../i18n/useTranslation';

const themes: { id: ColorTheme; colors: string[] }[] = [
  { id: 'default', colors: ['#44AF69', '#E76F51', '#E9C46A', '#CCC5B9'] },
  { id: 'tropical', colors: ['#2EC4B6', '#FF9F1C', '#FFBF69', '#CBF3F0'] },
  { id: 'coral', colors: ['#4ECDC4', '#FF6B6B', '#FFE66D', '#1A535C'] },
  { id: 'midnightRose', colors: ['#6B9AC4', '#8B1E3F', '#F7B2B7', '#033F63'] },
];

const AppearanceSection: React.FC = () => {
  const { colorTheme, setColorTheme } = useTheme();
  const { t } = useTranslation();

  const themeLabels: Record<ColorTheme, string> = {
    default: t.themeDefault,
    tropical: t.themeTropical,
    coral: t.themeCoral,
    midnightRose: t.themeMidnightRose,
  };

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <SettingsCard
        title={t.colorTheme}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 lg:w-6 lg:h-6 fill-current">
            <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
          </svg>
        }
        iconColor="text-secondary"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => setColorTheme(theme.id)}
              className={`rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-200 cursor-pointer border-2 ${
                colorTheme === theme.id
                  ? 'border-primary bg-primary/10'
                  : 'border-transparent bg-baseClr/5 dark:bg-muted/5 hover:bg-baseClr/10 dark:hover:bg-muted/10'
              }`}
            >
              <div className="flex gap-1.5">
                {theme.colors.map((color, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                  />
                ))}
              </div>
              <span className={`font-bold text-sm lg:text-base ${
                colorTheme === theme.id ? 'text-primary' : 'text-baseClr dark:text-muted'
              }`}>
                {themeLabels[theme.id]}
              </span>
            </button>
          ))}
        </div>
      </SettingsCard>
    </div>
  );
};

export default AppearanceSection;
