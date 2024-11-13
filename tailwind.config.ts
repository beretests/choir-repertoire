import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        dark: '#1a202c',
      },
      textColor: {
        dark: '#e2e8f0',
      },
    },
  },
  plugins: [],
} satisfies Config;
