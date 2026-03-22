import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warm: {
          bg:            '#FAFAF8',
          'bg-dark':     '#141412',
          'bg-alt':      '#F4F2EE',
          'bg-alt-dark': '#1E1C1A',
          surface:       '#FFFFFF',
          'surface-dark':'#252320',
          'text-primary':    '#1A1A16',
          'text-primary-dark':'#F0EEE8',
          'text-secondary':  '#6B6860',
          'text-secondary-dark':'#9C9990',
          border:        '#E5E2DC',
          'border-dark': '#302E2C',
        },
        indigo: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        rose: {
          400: '#FB7185',
          500: '#F43F5E',
        },
      },
      fontFamily: {
        heading: ['var(--font-plus-jakarta)', 'var(--font-noto-sans)', 'sans-serif'],
        body:    ['var(--font-noto-sans)', 'var(--font-plus-jakarta)', 'sans-serif'],
        sans:    ['var(--font-plus-jakarta)', 'var(--font-noto-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'app-title': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700', letterSpacing: '-0.02em' }],
        'task-title':['1rem',    { lineHeight: '1.5rem',  fontWeight: '400' }],
        tab:         ['0.875rem',{ lineHeight: '1.25rem', fontWeight: '500' }],
        footer:      ['0.875rem',{ lineHeight: '1.25rem', fontWeight: '400' }],
        button:      ['0.875rem',{ lineHeight: '1.25rem', fontWeight: '500' }],
      },
      borderRadius: {
        card:  '14px',
        input: '10px',
        pill:  '9999px',
      },
      boxShadow: {
        card:       '0 2px 12px rgba(26,26,22,0.07), 0 1px 3px rgba(26,26,22,0.04)',
        'card-hover':'0 8px 28px rgba(26,26,22,0.12), 0 2px 8px rgba(26,26,22,0.05)',
        'card-dark': '0 2px 12px rgba(0,0,0,0.3)',
        'card-hover-dark':'0 8px 28px rgba(0,0,0,0.5)',
        'focus-ring':'0 0 0 3px rgba(99,102,241,0.2)',
        input:       '0 1px 2px rgba(26,26,22,0.04)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-in':   'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
