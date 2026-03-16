/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        primaryLight: 'rgb(var(--color-primary-light) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        surfaceDark: 'rgb(var(--color-surface-dark) / <alpha-value>)',
        base: 'rgb(var(--color-base) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
      },
      gridTemplateRows: {
            'max-100': 'minmax(0, 100px)', // Custom utility
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
