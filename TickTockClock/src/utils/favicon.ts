import { ColorTheme } from '../context/ThemeContext';

// Theme color definitions for favicons (hex values)
const themeColors: Record<ColorTheme, { primary: string; secondary: string; surface: string; surfaceDark: string }> = {
  default: {
    primary: '#44AF69',
    secondary: '#E76F51',
    surface: '#FFFCF2',
    surfaceDark: '#252422',
  },
  tropical: {
    primary: '#2EC4B6',
    secondary: '#FF9F1C',
    surface: '#FFFFFF',
    surfaceDark: '#153736',
  },
  coral: {
    primary: '#4ECDC4',
    secondary: '#FF6B6B',
    surface: '#F7FFF7',
    surfaceDark: '#1A535C',
  },
  midnightRose: {
    primary: '#6B9AC4',
    secondary: '#8B1E3F',
    surface: '#FDF5BF',
    surfaceDark: '#033F63',
  },
};

/**
 * Generates a favicon SVG data URL based on theme, dark mode, and alternate state.
 * The favicon is a circle split into two halves (like the original PNGs).
 */
export function generateFaviconUrl(
  colorTheme: ColorTheme,
  isDarkMode: boolean,
  isAlternate: boolean
): string {
  const colors = themeColors[colorTheme];
  const bg = isDarkMode ? colors.surfaceDark : colors.surface;

  // Alternate swaps the two half colors
  const leftColor = isAlternate ? colors.secondary : colors.primary;
  const rightColor = isAlternate ? colors.primary : colors.secondary;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="32" fill="${bg}"/>
    <path d="M32 0 A32 32 0 0 0 32 64 Z" fill="${leftColor}"/>
    <path d="M32 0 A32 32 0 0 1 32 64 Z" fill="${rightColor}"/>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
