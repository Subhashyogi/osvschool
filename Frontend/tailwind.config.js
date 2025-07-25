/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        signature: ['"Dancing Script"', "cursive"],
      },
      // colors: {
      //   // --- The "Natural & Academic" Palette ---
      //   "brand-light": "#f8f9fa", // Main light background (soft off-white)
      //   "brand-white": "#ffffff", // For cards and raised surfaces
      //   "brand-dark": "#343a40", // Primary text & primary button background (charcoal)
      //   "brand-nav": "#212529", // Darkest color for Nav/Footer background
      //   "brand-accent": "#b7b7a4", // The anchor color (muted sage/stone)
      //   "brand-muted": "#6c757d", // Muted gray for secondary text
      //   "brand-nav-text": "#f8f9fa", // Light text for use on the dark nav/footer
      //   "brand-nav-muted": "#adb5bd", // Muted light text for use on the dark nav/footer
      //   "brand-surface": "#343a40", // Added for consistency on dark backgrounds
      // },
      colors: {
        // --- Enhanced "Academic Excellence" Palette ---
        // Richer, more sophisticated colors with depth and warmth

        "brand-light": "#f7f5f3", // Warmer, creamier background (less stark white)
        "brand-white": "#ffffff", // Pure white for contrast when needed
        "brand-dark": "#2c2c2c", // Deeper, richer dark for text (less harsh than black)
        "brand-nav": "#1a365d", // Deep navy blue for navigation (professional and trustworthy)
        "brand-accent": "#e67e22", // Vibrant orange-red for CTAs and highlights
        "brand-secondary": "#3182ce", // Rich blue for secondary elements
        "brand-muted": "#4a5568", // Sophisticated gray for secondary text
        "brand-nav-text": "#ffffff", // Clean white text for dark nav
        "brand-nav-muted": "#a0aec0", // Soft blue-gray for muted nav text
        "brand-surface": "#edf2f7", // Light gray-blue for card backgrounds
        "brand-warm": "#fed7aa", // Warm peach for accent backgrounds
        "brand-cool": "#bee3f8", // Cool blue for alternate sections
        "brand-success": "#38a169", // Green for success states
        "brand-warning": "#d69e2e", // Amber for warnings
        "brand-error": "#e53e3e", // Red for errors
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        "hero-gradient":
          "linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #3182ce 100%)",
        "warm-gradient": "linear-gradient(135deg, #fed7aa 0%, #fbb6ce 100%)",
        "cool-gradient": "linear-gradient(135deg, #bee3f8 0%, #90cdf4 100%)",
        "accent-gradient": "linear-gradient(135deg, #e67e22 0%, #d69e2e 100%)",
        "dark-gradient": "linear-gradient(135deg, #2c2c2c 0%, #1a365d 100%)",
        "subtle-pattern":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
      },
      backgroundSize: {
        "grid-size": "20px 20px",
        "pattern-size": "30px 30px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-gentle": "bounce 2s infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.8s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
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
