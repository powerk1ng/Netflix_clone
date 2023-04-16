/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('src/assets/auth-bg.jpg')",
        'user-ken': "url('src/assets/user-logo.png')",
        'user-ken2': "url('src/assets/user-logo2.webp')",
        'user-other': "url('src/assets/user-other.jpeg')"
      },
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

