/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C1C1B",
        secondary: "#272727",
        third : "#181817",
        textPrimary : "#3B5B5B",
        textSecondary: "#FDFDFD",
        heroPrimary : "#FF9E01",
        heroSecodary : "#F77801"
      }
      
    },
  },
  plugins: [],
}