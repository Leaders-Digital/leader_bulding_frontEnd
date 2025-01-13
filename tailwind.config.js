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
    },
  },
  plugins: [],
};
