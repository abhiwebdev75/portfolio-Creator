/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],

  darkMode: 'class',

  theme: {
    extend: {
      /*
       * MONOCHROME BRAND PALETTE
       *
       * Existing components using:
       * text-brand-400
       * bg-brand-500
       * border-brand-500
       *
       * will now automatically use white / silver
       * instead of purple.
       */
      colors: {
        brand: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#b8b8b8',
          500: '#ffffff',
          600: '#d4d4d4',
          700: '#a3a3a3',
          800: '#737373',
          900: '#404040',
        },

        cinematic: {
          black: '#000000',
          surface: '#050505',
          elevated: '#0a0a0a',
          border: '#1a1a1a',
          muted: '#737373',
          silver: '#d4d4d4',
          white: '#ffffff',
        },
      },

      // =================================================
      // TYPOGRAPHY
      // =================================================

      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],

        display: [
          '"Bricolage Grotesque"',
          'Inter',
          'ui-sans-serif',
          'sans-serif',
        ],

        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },

      // =================================================
      // CONTAINER
      // =================================================

      container: {
        center: true,
        padding: '1rem',

        screens: {
          '2xl': '1120px',
        },
      },

      // =================================================
      // SHADOWS / WHITE GLOW
      // =================================================

      boxShadow: {
        glow:
          '0 0 25px rgba(255, 255, 255, 0.12)',

        'glow-md':
          '0 0 45px rgba(255, 255, 255, 0.16)',

        'glow-lg':
          '0 0 80px rgba(255, 255, 255, 0.18)',

        'glow-soft':
          '0 0 100px rgba(255, 255, 255, 0.08)',
      },

      // =================================================
      // KEYFRAMES
      // =================================================

      keyframes: {
        /*
         * Standard reveal
         */
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(8px)',
          },

          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        /*
         * White/silver animated gradient.
         */
        gradient: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },

          '50%': {
            backgroundPosition: '100% 50%',
          },
        },

        /*
         * Cinematic breathing glow.
         */
        glow: {
          '0%, 100%': {
            opacity: '0.2',
            transform: 'scale(1)',
          },

          '50%': {
            opacity: '0.45',
            transform: 'scale(1.12)',
          },
        },

        /*
         * Slow floating particles.
         */
        'particle-float': {
          '0%': {
            transform: 'translate3d(0, 0, 0)',
            opacity: '0.1',
          },

          '50%': {
            opacity: '0.5',
          },

          '100%': {
            transform: 'translate3d(20px, -35px, 0)',
            opacity: '0.15',
          },
        },

        /*
         * Very slow atmospheric movement.
         */
        'atmosphere-drift': {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0) scale(1)',
          },

          '50%': {
            transform:
              'translate3d(30px, -20px, 0) scale(1.08)',
          },
        },

        /*
         * Subtle light pulse.
         */
        'light-pulse': {
          '0%, 100%': {
            opacity: '0.15',
          },

          '50%': {
            opacity: '0.35',
          },
        },

        /*
         * Very subtle moving background grid.
         */
        'grid-drift': {
          '0%': {
            backgroundPosition: '0 0',
          },

          '100%': {
            backgroundPosition: '70px 70px',
          },
        },
      },

      // =================================================
      // ANIMATIONS
      // =================================================

      animation: {
        'fade-in':
          'fade-in 0.5s ease-out both',

        gradient:
          'gradient 8s ease infinite',

        glow:
          'glow 8s ease-in-out infinite',

        'particle-float':
          'particle-float 7s ease-in-out infinite alternate',

        'atmosphere-drift':
          'atmosphere-drift 12s ease-in-out infinite',

        'light-pulse':
          'light-pulse 6s ease-in-out infinite',

        'grid-drift':
          'grid-drift 25s linear infinite',
      },
    },
  },

  plugins: [],
};