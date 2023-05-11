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
  plugins: [],
}
