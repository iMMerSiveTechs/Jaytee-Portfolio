/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        base: '#08090a',
        surface: '#0f1115',
        surfaceHigh: '#161920',
        brand: {
          cyan: '#00f0ff',
          blue: '#3b82f6',
          violet: '#8b5cf6',
        },
      },
    },
  },
  plugins: [],
};
