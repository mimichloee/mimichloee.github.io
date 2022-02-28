const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    screen: {
      md: '640px',
      lg: '1024px',
      xl: '1500px'
    },
    fontFamily: {
      mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
    },
    extend: {},
  },
  plugins: [],
}
