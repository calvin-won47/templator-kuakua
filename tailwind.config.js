
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#7C3AED',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-size': '2rem 2rem',
      },
    },
  },
  plugins: [],
}
  