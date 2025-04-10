/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        accent: '#2e7d32',
        textMain: '#1e293b',
        lightGreen: '#e6f4ea',
        lighterGreen: '#f3fdf6', // subtle alternate shade for section backgrounds
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
