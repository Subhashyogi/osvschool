/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        signature: ['"Dancing Script"', "cursive"],
      },
      colors: {
        // --- The "Natural & Academic" Palette ---
        "brand-light": "#f8f9fa", // Main light background (soft off-white)
        "brand-white": "#ffffff", // For cards and raised surfaces
        "brand-dark": "#343a40", // Primary text & primary button background (charcoal)
        "brand-nav": "#212529", // Darkest color for Nav/Footer background
        "brand-accent": "#b7b7a4", // The anchor color (muted sage/stone)
        "brand-muted": "#6c757d", // Muted gray for secondary text
        "brand-nav-text": "#f8f9fa", // Light text for use on the dark nav/footer
        "brand-nav-muted": "#adb5bd", // Muted light text for use on the dark nav/footer
        "brand-surface": "#343a40", // Added for consistency on dark backgrounds
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-size": "20px 20px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
