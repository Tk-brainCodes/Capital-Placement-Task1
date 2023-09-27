/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 4px 23px 0px rgba(0, 0, 0, 0.05)',
        custom2: '0px 1px 18px 0px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  plugins: []
}
