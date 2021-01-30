module.exports = {
  purge: ['./src/pages/**/*.js', './src/components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        '5-overflow': '0 repeat(5, minmax(calc(40% - 20px), 300px)) 0',
        'track-row': 'fit-content(0) 1fr 1fr fit-content(0)',
        'track-row-sm': 'fit-content(0) 1fr fit-content(0) fit-content(0)'
      },
      gridTemplateRows: {
        'home': '1fr 40px'
      },
      padding: {
        '100': '100%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
