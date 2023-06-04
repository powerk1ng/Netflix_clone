/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        'poppins': 'Poppins, sans-serif'
      },

      screens: {
        'sm': '640px',
        'md': '767px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

