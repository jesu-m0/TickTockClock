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
        burntSienna: '#E76F51',
        timberwolf: '#CCC5B9',
        floralWhite: '#FFFCF2',
        saffron: '#E9C46A',
        jade: '#44Af69'

      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}

