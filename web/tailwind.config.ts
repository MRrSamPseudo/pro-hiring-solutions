import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef3fb',
          100: '#d5e0f3',
          200: '#adc2e6',
          300: '#7f9dd6',
          400: '#4f73bf',
          500: '#2f4f9e',
          600: '#213c7d',
          700: '#1a2f61',
          800: '#132548',
          900: '#0e1c38',
          950: '#08122a',
        },
        teal: {
          50: '#effcfd',
          100: '#d0f5f8',
          200: '#a6ebf1',
          300: '#6fdae6',
          400: '#2fc0d2',
          500: '#17a2b4',
          600: '#158298',
          700: '#17697c',
          800: '#1a5666',
          900: '#194857',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.25rem', lg: '2rem' },
        screens: { '2xl': '1200px' },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
