/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","./src/*.{html}"],
  theme: {
    extend: {
      screens: {
        'mobile': '480px',
  
        'tablet': '640px',
  
        'laptop': '1024px',
  
        'desktop': '1280px',
      },
    },
    fontFamily:{
      'sans':'Inter, sans-serif'
    },
    
  },
  plugins: [],
}

