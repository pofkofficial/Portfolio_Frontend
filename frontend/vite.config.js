/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line is CRITICAL
  ],
  theme: {
    extend: {
      // Add your custom bioluminescent colors here if you want
      colors: {
        cyan: {
          500: '#00f2ff',
        }
      }
    },
  },
  plugins: [],
}