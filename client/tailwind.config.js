/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Roboto", "Arial", "sans-serif"],
      serif: ["Merriweather", "Georgia", "serif"],
      custom: ["MyCustomFont", "sans-serif"],
    },
    extend: {
      colors: {
        gray33: "#333",

        "custom-gradient": {
          from: "[#b4e2ef]",
          to: "[#ebc8da]",
        },
      },
    },
  },
  variant: {},
  plugins: [],
};
