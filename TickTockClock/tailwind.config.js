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
        // link to the patlette https://coolors.co/403d39-252422-e76f51-ccc5b9-fffcf2-e9c46a-44af69
        blackOlive: '#403D39',
        eerieBlack: '#252422',
        burntSienna: '#E76F51',
        timberwolf: '#CCC5B9',
        floralWhite: '#FFFCF2',
        saffron: '#E9C46A',
        jade: '#44Af69'
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

