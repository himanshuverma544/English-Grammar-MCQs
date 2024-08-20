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
        primaryOrange: "#F8931F"
      }
    },
  },

  plugins: [],
}