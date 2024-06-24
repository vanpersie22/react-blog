const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // eslint-disable-next-line no-undef
    flowbite.content(),
  ],
  theme: {
    extend: {
      outline: {
        green: '2px solid #10B981', // Example for a green outline
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};

