/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '8': 'auto auto 5em'
      },
      gridTemplateColumns: {
        '8': '18em auto auto'
      }
    },
  },
  plugins: [],
}

