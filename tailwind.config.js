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
        grey_global: '#707070',
        grey_dark_global: '#A7B9D1',
        green_dark_global: '#69CCAE',                
      },
    },
  },
  plugins: [],

  
}
