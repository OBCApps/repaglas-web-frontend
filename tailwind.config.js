/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
  important: true,
  content: [],
  theme: {
    extend: {
      colors: {
        blue_global: '#233775',
        green_global: '#69CCAE',
        grey_global: '#EEEEEE',
        grey_dark_global: '#858585',
        green_dark_global: '#69CCAE',                
      },
    },
  },
  plugins: [],

  
}
