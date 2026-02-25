/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4285F4',
          DEFAULT: '#1a73e8',
          dark: '#0d47a1',
        },
        secondary: {
          light: '#ff7961',
          DEFAULT: '#f44336',
          dark: '#ba000d',
        },
        neutral: {
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        background: '#f6f8fc',
        important: '#d93025',
        social: '#1a73e8',
        promotions: '#188038',
        updates: '#e37400',
        forums: '#8430ce',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
        'nav': '0 1px 2px 0 rgba(60, 64, 67, 0.3)',
      },
    },
  },
  plugins: [],
} 