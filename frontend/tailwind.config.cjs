/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: {
        DEFAULT: '#ffffff',
      },
      green: {
        DEFAULT: '#CCE86B',
        50: '#69B578',
        100: '#3A7D44',
      },
      grey: {
        DEFAULT: '#9690A20F',
        50: '#AAB5BC',
      },
      red: {
        DEFAULT: '#f87171',
        400: '#f87171',
      },
      blue: {
        DEFAULT: '#06BCCB'
      }
    },
    fontFamily: {
      sans: ['Public Sans', 'sans-serif'],
      rubik: ['', ''],
    },
    extend: {},
    fontFamily: {
      rub: ['Rubik', 'sans-serif'],
    },
  },
  plugins: [],
};
