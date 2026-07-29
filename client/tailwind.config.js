/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-surface': '#111111',
        'border-subtle': '#262626',
        'text-primary': '#e5e5e5',
        'text-muted': '#8a8a8a',
        'accent': '#7dd3dc',
        'accent-hover': '#a3e4ea',
      },
      borderRadius: {
        DEFAULT: '6px',
      },
    },
  },
  plugins: [],
}
