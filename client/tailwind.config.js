/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Accent used across buttons, links, highlights
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Characterful grotesque, used with restraint for headings + the hero name
        display: ['"Bricolage Grotesque"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        // Monospace utility face for eyebrows, dates, and data labels
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: { '2xl': '1120px' },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Slow drift of a gradient's position (used on the hero name)
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Ambient breathing for the hero glow blobs
        glow: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.65', transform: 'scale(1.15)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out both',
        gradient: 'gradient 8s ease infinite',
        glow: 'glow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
