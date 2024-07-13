const flowbite = require("flowbite-react/tailwind");
const scrollbar = require('tailwind-scrollbar');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      outline: {
      }
    },
  },
  plugins: [
    flowbite.plugin(),
    scrollbar,
  ],
};