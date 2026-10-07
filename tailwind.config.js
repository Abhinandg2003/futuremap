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
  plugins: [require("daisyui")],

  daisyui: {
    prefix: "d-",   // every daisyUI class starts with d- (avoids the clash with our .btn)
    base: false,    // don't let daisyUI restyle the whole page
    logs: false,
    // Custom theme so daisyUI components use our brand colors. TODO: tweak if needed
    themes: [
      {
        futuremap: {
          primary: "#0069ff",
          "primary-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f5f5f7",
          "base-300": "#e8e8ed",
          "base-content": "#1d1d1f",
        },
      },
    ],
  },
};
