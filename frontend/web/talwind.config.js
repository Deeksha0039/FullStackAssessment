/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // important: use class-based dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e6f5ff",
          500: "#06b6d4",
        },
      },
    },
  },
  plugins: [],
};
