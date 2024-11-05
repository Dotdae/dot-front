/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '8': 'auto auto 3em'
      },
      gridTemplateColumns: {
        '8': '16em auto auto'
      }
    },
  },
  plugins: [],
}
