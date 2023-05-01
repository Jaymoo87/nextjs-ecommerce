/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // classname: 'color'
        mainBG: '#001524',
        tableBG: '#FFECD1',
        headerBG: '#15616D',
        headerText: '#EFEFEF',
        btnBG: '#FF7D00',
        darkText: '#001524',
        btnRED: '#C94435',
        inputBorder: '#7BA3CC',
      },
    },
  },
  plugins: [],
};
