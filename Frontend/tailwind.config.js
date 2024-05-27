/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#1CB90E",
        secondaryGreen: "#60CE57",
        tertaryGreen: "#ADE6A8",
        darkGreen: "#1C3C19",
        darkGray: "#787878",
        lightGray: "#A8A8A8",
      },
    },
  },
  plugins: [],
};