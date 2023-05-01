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
        btnBG: '#FF7D00',
        btnRED: '#8B0000',
        inputBorder: '#7BA3CC',
        headerText: '#EFEFEF',
        darkText: '#001524',
      },
    },
  },
  plugins: [],
};
