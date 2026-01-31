/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ahora apunta a toda la carpeta app
    "./components/**/*.{js,ts,jsx,tsx}", // si tienes components aparte
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}