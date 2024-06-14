/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      white: {
        DEFAULT: '#ffffff',
      },
      grey: {
        DEFAULT: '#9690A20F',
        50: '#AAB5BC',
      },
      blue: {
        DEFAULT: '#26C6CB',
        100: '#28D7CB'
      }
    },
    extend: {},
  },
  plugins: [],
}

