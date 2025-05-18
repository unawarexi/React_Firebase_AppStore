/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme
        primary: "#1C1C1B",
        secondary: "#272727",
        third: "#181817",
        textPrimary: "#181818",
        textSecondary: "#444444",
        heroPrimary: "#FF9E01",
        heroSecodary: "#F77801",
        // Dark theme overrides using Tailwind gray shades
        dark: {
          bg: "#111827", // gray-900
          bgSecondary: "#1f2937", // gray-800
          bgCard: "#374151", // gray-700
          textPrimary: "#f3f4f6", // gray-100
          textSecondary: "#9ca3af", // gray-400
          accent: "#2563eb",
          accentSecondary: "#60a5fa",
          border: "#374151", // gray-700
        }
      }
    },
  },
  plugins: [import('tailwind-scrollbar')],
}

