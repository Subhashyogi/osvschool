/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- The "Heritage & Innovation" Palette ---
        "brand-dark": "#212529", // Deep Charcoal (for main backgrounds)
        "brand-surface": "#343a40", // Lighter Charcoal (for cards, nav/footer)
        "brand-accent": "#c79a3b", // Warm Gold/Ochre (for buttons, links, highlights)
        "brand-light": "#f8f9fa", // Clean Off-White (for text on dark surfaces)
        "brand-muted": "#adb5bd", // Soft Gray (for subtitles, secondary text)
        "brand-light-bg": "#fdfdfd", // Very light off-white (for light-themed sections)
        "brand-dark-text": "#212529", // Deep Charcoal (for text on light surfaces)
      },
    },
  },
  plugins: [],
};
