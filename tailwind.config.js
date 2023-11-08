/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      maxWidth: {
        app: '76rem',
      },
    },

    colors: {
      'app-grey-100': '#F8F9FA',
      'app-grey-800': '#404B5A',
      'app-grey-900': '#212934',
      'app-blue-500': '#2196f3',
    },
  },
  plugins: [],
};
