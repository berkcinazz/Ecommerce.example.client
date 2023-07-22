/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      colors: {
        'primary' : '#f3c614',
        'secondary' : '#353535',
        pink : colors.pink,
        blue : colors.blue,
        sky:colors.sky,
        green : '#10b981',
        red : '#ef4444',
        yellow : '#f59e0b',
        gray : colors.gray,
        white : colors.white,
        black : colors.black,
        transparent : colors.transparent,
        current : colors.current,
        indigo : colors.indigo,
        purple : colors.purple,
        rose : colors.rose,
        amber : colors.amber,
        lime : colors.lime,
        'light-yellow' : '#fde047',
      },
    },
    plugins: [],
  }