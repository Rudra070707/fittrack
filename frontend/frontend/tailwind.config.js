/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        primary: "#22c55e",
        background: "#05070c",
      },

      boxShadow: {
        glow: "0 0 30px rgba(34,197,94,0.5)",
      },

      backdropBlur: {
        xs: "2px",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

    },
  },

  plugins: [],
};