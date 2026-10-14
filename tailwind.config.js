/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // WWDD palette, taken from the logo's blue (#164386). Blue and white only.
      colors: {
        ink: '#0B1B33',
        navy: { DEFAULT: '#0F2A52', deep: '#0A1D3A' },
        brand: { DEFAULT: '#164386', light: '#2D66B8', soft: '#DCE7F6' },
        sky: '#9CC3EE',
        mist: '#EEF3F9',
        paper: '#FAFBFD',
        slate: { DEFAULT: '#4A5B74', light: '#6B7B93' },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '72rem' },
    },
  },
  plugins: [],
}
