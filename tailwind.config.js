/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-teal': '#162D3A',
        'dark-blue-gray': '#162D3A',
        'slate-blue': '#313957',
        'input-bg': '#F7FBFF',
        'link': '#1E4AE9',
        'light-grey': '#667085',
        'dark-blue': '#262633'

      }
    },
  },
  plugins: [],
 
}

