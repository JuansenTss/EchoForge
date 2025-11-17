/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        medieval: {
          50: '#faf7f0',
          100: '#f4ede0',
          200: '#e7d9be',
          300: '#d7bf96',
          400: '#c8a568',
          500: '#b88b4a',
          600: '#a67939',
          700: '#8a6230',
          800: '#71502c',
          900: '#5d4327',
        },
        gold: {
          DEFAULT: '#FFD700',
          dark: '#B8860B',
        }
      },
      fontFamily: {
        medieval: ['MedievalSharp', 'serif'],
        pixel: ['Press Start 2P', 'monospace'],
      }
    },
  },
  plugins: [],
}
