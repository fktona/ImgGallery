/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
  colors: {
  'primary': "#392724",
  'secondary': "#F6D2BC",
  'ascent': "#5C4643",
  'action': "#F0C6B3",
  'sub': "#F59B7B",
  },

  fontFamily: {
  mono: ['Montserrat', 'sans-serifve'],
  popi: ['Poppins', 'sans-serifve'],
  lato: ['Lato', 'sans-serifve'],
  robo: ['Roboto', 'sans-serifve'],
  geor: ['Noto Sans Georgian', 'sans-seri'],
  danc: ['Dancing Script', 'cursive'],
  }
  },
  },
  plugins: [],
  }