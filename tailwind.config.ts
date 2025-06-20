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
        // bg-background -> var(--background)
        // text-foreground -> var(--foreground)
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};

export default config; 