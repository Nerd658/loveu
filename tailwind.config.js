/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        display: ['Cinzel', 'serif'],
      },
      colors: {
        background: '#030303',
        foreground: '#ededed',
        card: '#0a0a0a',
        border: 'rgba(255, 255, 255, 0.08)',
        primary: {
          DEFAULT: '#e11d48', // rose-600
          foreground: '#ffffff',
          hover: '#be123c', // rose-700
        },
        gold: {
          light: '#fde68a',
          DEFAULT: '#c9a84c',
          dark: '#b45309'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(225,29,72,0.3))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(225,29,72,0.6))' },
        }
      }
    },
  },
  plugins: [],
}
