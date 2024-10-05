/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackOlive: '#403D39',
        eerieBlack: '#252422',
        flame: '#EB5E28',
        timberwolf: '#CCC5B9',
        floralWhite: '#FFFCF2'
      },
    },
  },
  plugins: [],
}

