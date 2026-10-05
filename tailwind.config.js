/** Tailwind config — brand color lives here AND in globals.css (--brand). */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#0069ff", soft: "#e8f1ff", dark: "#0050c8" } },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
      transitionTimingFunction: { apple: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};
