import React, { createContext, useContext, useState, useEffect } from 'react';

export type ColorTheme = 'default' | 'tropical';

interface ThemeContextType {
    isDarkMode: boolean;
    setDarkMode: (isDark: boolean) => void;
    colorTheme: ColorTheme;
    setColorTheme: (theme: ColorTheme) => void;
}

const THEME_STORAGE_KEY = 'ticktockclock_theme';

interface StoredTheme {
    isDarkMode: boolean;
    colorTheme: ColorTheme;
}

const loadTheme = (): StoredTheme => {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored) {
            return { isDarkMode: true, colorTheme: 'default', ...JSON.parse(stored) };
        }
    } catch (error) {
        console.error('Failed to load theme:', error);
    }
    return { isDarkMode: true, colorTheme: 'default' };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const stored = loadTheme();
    const [isDarkMode, setDarkMode] = useState<boolean>(stored.isDarkMode);
    const [colorTheme, setColorTheme] = useState<ColorTheme>(stored.colorTheme);

    // Persist theme to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ isDarkMode, colorTheme }));
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    }, [isDarkMode, colorTheme]);

    // Handle dark mode class on body
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Handle color theme data attribute on root element
    useEffect(() => {
        document.documentElement.setAttribute('data-color-theme', colorTheme);
    }, [colorTheme]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setDarkMode, colorTheme, setColorTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
