/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#F6F5F3',
        ink:     '#111111',
        muted:   '#888888',
        surface: '#FFFFFF',
        border:  '#EDEDED',
        brand: {
          DEFAULT: '#E8720C',
          light:   '#FEF3EA',
          dark:    '#C55E08',
        },
        safe:    '#16A34A',
        danger:  '#DC2626',
      },
      fontFamily: {
        sans: ['-apple-system', "'SF Pro Text'", "'Helvetica Neue'", 'Arial', 'sans-serif'],
        mono: ["'SF Mono'", 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)',
        lift: '0 4px 16px rgba(0,0,0,0.10)',
        sheet:'0 -1px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
