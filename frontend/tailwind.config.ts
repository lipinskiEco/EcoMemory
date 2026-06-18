import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Muted botanical green scale (TERRAIN). Remapped so existing
        // eco-50 .. eco-900 usages render in the new sage→forest palette.
        eco: {
          50: '#f1f4ee',
          100: '#e3e9dd',
          200: '#c9d4be',
          300: '#a9b99b',
          400: '#8aa078',
          500: '#7c9673', // sage
          600: '#5f7a55',
          700: '#4a6240',
          800: '#364c30', // forest
          900: '#1e2b1c', // deep forest
        },
        leaf: {
          light: '#c9d4be',
          DEFAULT: '#7c9673',
          dark: '#364c30',
        },
        // Warm editorial neutrals.
        ivory: '#f4f1ea',
        cream: '#faf8f2',
        ink: '#23201b',
      },
      fontFamily: {
        // Loaded as next/font CSS variables in app/layout.tsx.
        sans: ['var(--font-body)', 'ui-serif', 'Georgia', 'serif'],
        serif: ['var(--font-body)', 'ui-serif', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      boxShadow: {
        soft: '0 18px 50px -28px rgba(35, 32, 27, 0.35)',
        card: '0 12px 40px -24px rgba(35, 32, 27, 0.28)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift-light': 'driftLight 22s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        driftLight: {
          '0%': { transform: 'translate3d(-2%, -1%, 0) scale(1.05)', opacity: '0.85' },
          '100%': { transform: 'translate3d(3%, 2%, 0) scale(1.12)', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
