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
                  fontSize: theme('fontSize.2xl'),
                  fontWeight: '500',
                  paddingTop: theme('spacing.10'),
                  paddingBottom: '10px',
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    fontSize: theme('fontSize.3xl'),
                  },
                },
                'h2': {
                  fontSize: theme('fontSize.lg'),
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    fontSize: theme('fontSize.xl'),
                  },
                },
                a: {
                  textDecoration: 'none'
                },
                'a:hover, a:focus': {
                  textDecoration: 'underline',
                  outline: 'none',
                },
                p: {
                  letterSpacing: '-0.3px',
                  lineHeight: '1.8rem',
                  marginTop: theme('spacing.4'),
                  marginBottom: theme('spacing.4'),
                },
                blockquote: {
                  fontWeight: theme('fontWeight.normal'),
                  borderLeftWidth: '4px',
                  borderRadius: theme('borderRadius.lg'),
                  padding: theme('spacing.4'),
                  marginTop: 0,
                  marginBottom: theme('spacing.10'),
                },
                'blockquote p:first-of-type::before': false,
                'blockquote p:last-of-type::after': false,
                'code::before': false,
                'code::after': false,
                'code:not(pre code)': {
                  display: 'inline',
                  padding: `${theme('padding.1')} ${theme('padding.2')}`,
                  margin: theme('margin.1'),
                  border: 'none',
                  borderRadius: theme('borderRadius.md')
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
                color: theme('colors.gray.700'),
                'h1, h2, h3, h4, h5, h6': {
                  color: theme('colors.black'),
                },
                a: {
                  color: theme('colors.sky.600')
                },
                strong: {
                  color: theme('colors.teal.500'),
                },
                blockquote: {
                  borderLeftColor: theme('colors.teal.500'),
                  backgroundColor: theme('colors.gray.100'),
                },
                'blockquote > p': {
                  color: theme('colors.gray.500'),
                },
                'code:not(pre code)': {
                  color: theme('colors.teal.500'),
                  backgroundColor: theme('colors.gray.100')
                },
              }
            ]
          },
          dark: {
            css: [
              {
                color: theme('colors.gray.300'),
                'h1, h2, h3, h4, h5, h6': {
                  color: theme('colors.white'),
                },
                a: {
                  color: theme('colors.sky.400')
                },
                strong: {
                  color: theme('colors.teal.300'),
                },
                blockquote: {
                  borderLeftColor: theme('colors.teal.300'),
                  backgroundColor: theme('colors.gray.800'),
                },
                'blockquote > p': {
                  color: theme('colors.slate.400'),
                },
                'code:not(pre code)': {
                  color: theme('colors.teal.300'),
                  backgroundColor: theme('colors.gray.700')
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
