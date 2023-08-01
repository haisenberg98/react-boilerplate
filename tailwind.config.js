/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        customGray: '#F6F6F7',
        customDarkGray: '#888888',
        borderColor: '#CCCCCC',
        asteriskColor: '#C90000',
        customDark: '#222222',
      },
    },
  },
  plugins: [],
};
