import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warmGray: {
          50:  '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        accent: {
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        success: {
          500: '#10B981',
        },
        danger: {
          400: '#F87171',
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'app-title':  ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'task-title':  ['1rem',    { lineHeight: '1.5rem',  fontWeight: '400' }],
        'tab':         ['0.875rem',{ lineHeight: '1.25rem', fontWeight: '500' }],
        'footer':      ['0.875rem',{ lineHeight: '1.25rem', fontWeight: '400' }],
        'button':      ['0.875rem',{ lineHeight: '1.25rem', fontWeight: '500' }],
      },
      borderRadius: {
        'card': '12px',
        'input': '8px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
        'focus-ring': '0 0 0 3px rgba(99,102,241,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
