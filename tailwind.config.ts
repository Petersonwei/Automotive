import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // enables class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Maps Tailwind classes to our CSS variables:
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'border-color': 'var(--border)',
        // Button colors that invert in dark mode
        'button-bg': 'var(--button-bg)',
        'button-text': 'var(--button-text)',
        // Brand colors mapped to CSS variables
        brand: {
          primary: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
      },
    },
  },
  plugins: [],
};

export default config; 