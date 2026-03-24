/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'holo': {
          'bg-primary': '#0A0F1C',
          'bg-secondary': '#151923',
          'primary': '#00E5FF',
          'accent': '#7C4DFF',
          'highlight': '#FF6B6B',
          'text-primary': '#FFFFFF',
          'text-secondary': '#B8C5D6',
        },
        'jarvis': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'core-pulse': 'core-pulse 3s ease-in-out infinite',
        'core-ring': 'core-ring 2s linear infinite',
        'mic-pulse': 'mic-pulse 2s ease-in-out infinite',
        'mic-listening': 'mic-listening 1s ease-in-out infinite',
        'typing': 'typing 3s steps(40, end)',
        'blink': 'blink 0.75s step-end infinite',
        'wave': 'wave 1s ease-in-out infinite',
        'holo-shift': 'holo-shift 3s ease-in-out infinite',
        'progress': 'progress 2s ease-in-out infinite',
        'grid-move': 'grid-move 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 229, 255, 0.8)' },
        },
        'core-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        'core-ring': {
          '0%': { transform: 'rotate(0deg)', opacity: '1' },
          '100%': { transform: 'rotate(360deg)', opacity: '0' },
        },
        'mic-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)',
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 40px rgba(0, 229, 255, 0.8)',
          },
        },
        'mic-listening': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 30px rgba(255, 107, 107, 0.8)',
          },
          '50%': { 
            transform: 'scale(1.1)',
            boxShadow: '0 0 50px rgba(255, 107, 107, 1)',
          },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#00E5FF' },
        },
        'wave': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
        'holo-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'progress': {
          '0%': { 'stroke-dashoffset': '126' },
          '50%': { 'stroke-dashoffset': '0' },
          '100%': { 'stroke-dashoffset': '126' },
        },
        'grid-move': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
