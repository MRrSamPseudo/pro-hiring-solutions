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
          DEFAULT: '#0d2249',
          50: '#f4f6fa',
          100: '#e6eaf2',
          200: '#c7d0e2',
          300: '#94a4c4',
          400: '#5b70a0',
          500: '#33487d',
          600: '#1d3160',
          700: '#132650',
          800: '#0d2249',
          900: '#0a1a38',
          950: '#071228',
        },
        teal: {
          DEFAULT: '#17a2b4',
          50: '#f0fbfc',
          100: '#d5f3f7',
          200: '#ade7ee',
          300: '#76d4e1',
          400: '#3bb9cd',
          500: '#17a2b4',
          600: '#148498',
          700: '#166a7c',
          800: '#175767',
          900: '#174857',
        },
        ink: '#0d2249',
        muted: '#667085',
        line: '#e7eaf0',
        canvas: '#f6f7fa',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.25rem', lg: '2rem' },
        screens: { '2xl': '1160px' },
      },
      boxShadow: {
        card: '0 1px 2px rgba(13, 34, 73, 0.04), 0 8px 24px -12px rgba(13, 34, 73, 0.10)',
        btn: '0 1px 2px rgba(13, 34, 73, 0.12)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
