import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0f111a',
        surface: '#1b1e2c',
        border: '#2b2f45',
        ink: '#e7e9f5',
        inkDim: '#9296b4',
        comment: '#5c6084',
        accent: {
          purple: '#b48cf4',
          yellow: '#f2d16b',
          blue: '#74a8fb',
          green: '#7fdda0',
          cyan: '#6fe0e0',
          pink: '#f38fb0',
          orange: '#fbab6c',
          teal: '#63e0c4',
          red: '#ff8c8c'
        }
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-display)', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
