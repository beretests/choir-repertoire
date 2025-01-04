import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        dark: '#1a202c',
        light: '#f8f9fa',
      },
      textColor: {
        dark: '#e2e8f0',
        light: '#1a202c',
      },
      colors: {
        'custom-blue': '#1976d2',
      },
    },
  },
  plugins: [],
} satisfies Config;
