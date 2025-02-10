module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './templates/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('tailwind-scrollbar'),
    ]
    ,
  }
  