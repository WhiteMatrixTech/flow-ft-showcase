/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeColor: "#2A282D",
        textColor: "#121212",
        secondaryWhite: "#f5f5f5",
        primaryWhite: "#ffffff",
      },
    },
  },
  plugins: [],
};
