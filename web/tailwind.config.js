/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Inconsolata', 'monospace'],
    },
    fontSize: {
      // xs: ['10px', '12px'],
      // sm: ['14px', '20px'],
      // base: ['16px', '24px'],
      // md: ['20px', '24px'],
      // lg: ['28px', '32px'],
      // xl: ['36px', '40px'],
      // '2xl': ['45px', '44px'],
      // '3xl': ['58px', '64px'],
      // '4xl': ['73px', '76px'],
      // '5xl': ['92px', '96px'],
      // '6xl': ['105px', '104px'],
      xs: ['10px', '12px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      md: ['20px', '24px'],
      lg: ['24px', '28px'],
      xl: ['35px', '36px'],
      '2xl': ['42px', '44px'],
      '3xl': ['50px', '52px'],
      '4xl': ['60px', '64px'],
      '5xl': ['87px', '88px'],
      '6xl': ['104px', '104px'],
    },
  },
  extend: {
    screens: {
      'xs': '400px'
    },
  },
  plugins: [],
}
