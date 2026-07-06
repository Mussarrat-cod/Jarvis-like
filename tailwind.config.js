/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0E0D0C',
        'bg-secondary': '#18160F',
        'panel': '#1D1B15',
        'ink': '#F2EEE3',
        'muted': '#A69C87',
        'accent': '#C77D3E',
        'accent-dim': '#8A5A32',
        'danger': '#B5502F',
        'line': 'rgba(242, 238, 227, 0.08)',
        'line-strong': 'rgba(242, 238, 227, 0.16)',
        'accent-line': 'rgba(199, 125, 62, 0.35)',
      },
      animation: {
        'dial-rotate': 'dial-rotate 4s linear infinite',
        'wave': 'wave 1.6s ease-in-out infinite',
      },
      keyframes: {
        'dial-rotate': {
          'to': { transform: 'rotate(360deg)' },
        },
        'wave': {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '0.7' },
          '50%': { transform: 'scaleY(1.3)', opacity: '1' },
        },
      },
      fontFamily: {
        'display': ['Söhne', 'Inter', '-apple-system', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
