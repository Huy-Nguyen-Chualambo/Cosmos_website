/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "rgb(2 6 23)",
        foreground: "rgb(255 255 255 / 0.9)",
        card: {
          DEFAULT: "rgb(255 255 255 / 0.1)",
          foreground: "rgb(255 255 255 / 0.9)"
        },
        muted: {
          DEFAULT: "rgb(255 255 255 / 0.1)",
          foreground: "rgb(255 255 255 / 0.5)"
        },
        border: "rgb(255 255 255 / 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "twinkle": "twinkle var(--twinkle-duration, 3s) ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 