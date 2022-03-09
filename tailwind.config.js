const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screen: {
        md: '640px',
        lg: '1024px',
        xl: '1500px'
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
        sans: ['"Roboto"', ...defaultTheme.fontFamily.sans],
        serif: ['"Roboto"', ...defaultTheme.fontFamily.sans],
      },
      typography: theme => {
        return {
          DEFAULT: {
            css: [
              { 
                'h1': {
                  fontSize: '26px',
                  fontWeight: '500',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  borderBottomWidth: '1px',
                  borderStyle: theme('border.solid')
                },
                'h2': {
                  fontSize: '20px'
                },
                'h3': {
                  fontSize: '16px'
                },
                p: {
                  marginTop: 0,
                  marginBottom: theme('spacing.8'),
                },
                blockquote: {
                  fontWeight: theme('fontWeight.normal'),
                  border: 'none',
                  borderRadius: theme('borderRadius.lg'),
                  padding: theme('spacing.4'),
                  marginTop: 0,
                  marginBottom: theme('spacing.10'),
                },
                'blockquote > :last-child': {
                  marginBottom: 0,
                },
              }
            ]
          },
          light: {
            css: [
              {
                color: theme('colors.gray.800'),
                'h1': {
                  borderColor: theme('colors.slate.300')
                },
                'h1, h2, h3, h4, h5, h6': {
                  color: theme('colors.black'),
                },
                blockquote: {
                  color: theme('colors.gray.500'),
                  backgroundColor: theme('colors.gray.100'),
                },
              }
            ]
          },
          dark: {
            css: [
              {
                color: theme('colors.gray.300'),
                'h1': {
                  borderColor: theme('colors.slate.700')
                },
                'h1, h2, h3, h4, h5, h6': {
                  color: theme('colors.gray.200'),
                },
                blockquote: {
                  color: theme('colors.blueGray.500'),
                  backgroundColor: theme('colors.gray.800'),
                },
              }
            ]
          }
        };
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
