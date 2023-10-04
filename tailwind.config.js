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
        customPrimary: '#dc3522',
        customSecondary: '#f7f5ec',
        customWhite: '#f4f4f4',
        customDarkGray: '#51595e',
        customLighterDarkGray: '#647589',
      },
      fontFamily: {
        customPrimary: ['Monserrat', 'sans-serif'],
        customSecondary: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
