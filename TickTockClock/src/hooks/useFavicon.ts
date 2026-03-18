import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useClockStatus } from "../context/ClockContext";
import { generateFaviconUrl } from "../utils/favicon";

/**
 * Updates the browser favicon dynamically based on theme, dark mode, and alternate state.
 */
export function useFavicon() {
      const { isDarkMode, colorTheme } = useTheme();
      const { isAlternate } = useClockStatus();

      useEffect(() => {
            const favicon = document.getElementById(
                  "favicon"
            ) as HTMLLinkElement | null;
            if (favicon) {
                  favicon.href = generateFaviconUrl(colorTheme, isDarkMode, isAlternate);
            }
      }, [isAlternate, isDarkMode, colorTheme]);
}
