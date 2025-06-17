/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Golden: "#F7D47A",
        Martinique: "#3A3541",
        GohstWhite: "#F4F5F9",
        Gray: "#8C8E90",
        GoldenHover: {
          500: "#F7D47A",
        },
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      keyframes:{
       'fade-slide':{
        '0%':{
          opacity: 0,
          transform: 'translateX(0)'
        },
        '100%':{
          opacity: 1,
          transform: 'translateX(5px)'
        }
       }
      },
      animation:{
        
        fadeSlide: 'fade-slide 0.5s ease-in-out forwards'
      }
    },
  },
  plugins: [],
};
