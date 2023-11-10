/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      maxWidth: {
        app: '76rem',
      },

      boxShadow: {
        app: 'rgba(33, 41, 52, 0.06) 0px 1px 2px, rgba(33, 41, 52, 0.1) 0px 1px 3px',
      },
    },

    colors: {
      'pure-white': '#FFFFFF',
      'app-grey-050': '#FBFCFD',
      'app-grey-100': '#F8F9FA',
      'app-grey-300': '#E8EDF2',
      'app-grey-600': '#6C7787',
      'app-grey-800': '#404B5A',
      'app-grey-900': '#212934',
      'app-blue-500': '#2196f3',
    },
  },
  plugins: [],
};
