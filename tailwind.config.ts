import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#12201e', soft: '#3d4f4c', muted: '#6b7c79' },
        paper: { DEFAULT: '#f4f7f6', raised: '#ffffff', line: '#dde5e3' },
        brand: {
          50: '#effaf7',
          100: '#d3f3ea',
          200: '#a8e5d5',
          300: '#72d0bb',
          400: '#3fb59f',
          500: '#229a86',
          600: '#157b6c',
          700: '#126258',
          800: '#124e47',
          900: '#10413c',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
