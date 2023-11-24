import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        ranga: ['var(--font-ranga-bold)'],
        roboto: ['var(--font-roboto-condensed)'],
      },
      boxShadow: {
        levitate: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      },
      backdropBlur: {
        '1': '1px',
      },
      animation: {
        attractAttention: 'attractAttention 500ms ease-in-out',
      },
      keyframes: {
        attractAttention: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(0.9)',
          },
        },
      },
    },
    variants: {
      extend: {
        backgroundColor: ['before'],
        display: ['before'],
        content: ['before'],
        inset: ['before'],
        backdropBlur: ['before'],
      },
    },
  },
  plugins: [],
};
export default config;
