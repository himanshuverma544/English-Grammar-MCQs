/** @type {import('tailwindcss').Config} */


export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primaryPurple: "#7F00FF",
        secondaryPurple: "#140342",

        primaryOrange: "#F8931F",

        ["light-100"]: "#F9F9F9",
        ['light-200']: '#F8F4F1',
        ["light-300"]: "#DFDFDF",
        ["light-400"]: "#D7D7D7",
      }
    },
  },

  plugins: [],
}