/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-teal': '#162D3A',
        'dark-blue-gray': '#162D3A',
        'slate-blue': '#313957'
      }
    },
  },
  plugins: [],
 
}

