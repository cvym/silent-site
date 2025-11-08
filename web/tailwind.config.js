/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#12131a",
        "brand": "#5865f2",
        "brand-accent": "#8a5cf6",
        "brand-light": "#ddddff"
      },
      fontFamily: {
        heading: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"]
      }
    }
  },
  plugins: []
};

