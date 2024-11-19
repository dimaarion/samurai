/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        "orange":"#FF7E3D",
        "aqua":"#00CCCB",
        "turquoise":"#0F9A96"

      }
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs"),require("@tailwindcss/forms")]
}