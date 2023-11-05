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
    },
  },
  plugins: [],
};
