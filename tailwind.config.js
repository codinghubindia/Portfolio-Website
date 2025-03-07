/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-1': ['2.5rem', { lineHeight: '1.3' }],
        'heading-2': ['2rem', { lineHeight: '1.35' }],
        'heading-3': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'nav': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '500' }],
      },
      colors: {
        primary: {
          500: '#843dff',
          600: '#7916ff',
          700: '#6b04fd',
        },
        secondary: {
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        blob: "blob 7s infinite",
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.75',
          },
        },
      },
      animationDelay: {
        '2000': '2s',
        '4000': '4s',
      }
    },
  },
  // Reduce unused CSS
  safelist: [
    'from-purple-600',
    'to-blue-500',
    'bg-gradient-to-r',
  ],
  plugins: [],
  variants: {
    extend: {
      animation: ['hover', 'group-hover'],
    },
  },
};