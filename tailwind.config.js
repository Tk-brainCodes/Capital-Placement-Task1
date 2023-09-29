/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 4px 23px 0px rgba(0, 0, 0, 0.05)',
        custom2: '0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
        form: '3px 3px 14px 0px rgba(190, 190, 190, 0.30)',
        formDashed: '3px 3px 9px 0px rgba(190, 190, 190, 0.13)'
      },
      fontFamily: {
        Inter: 'Inter',
        Poppins: 'Poppins'
      },
      borderRadius: {
        radius1: '20px 20px 0px 0px',
      },
    }
  },
  plugins: []
}
