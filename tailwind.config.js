/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '8': 'auto auto'
      },
      gridTemplateColumns: {
        '8': '16em auto auto'
      }
    },
  },
  plugins: [],
}
