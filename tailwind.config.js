/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        customGray: '#F6F6F7',
        customDarkGray: '#888888',
        customDark: '#222222',
        customWhite: '#f4f4f4',
        customLightGray: '#c4c4c4',
        customDarkGray: '#636569',
      },
    },
  },
  plugins: [],
};
