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
        // --- Modern Educational Excellence Palette ---
        // Fresh, modern colors with elegance and professionalism

        "brand-light": "#fafbfc", // Very light blue-gray background
        "brand-white": "#ffffff", // Pure white for contrast
        "brand-dark": "#1e293b", // Slate dark for text (modern and readable)
        "brand-nav": "#0f172a", // Deep slate for navigation (sophisticated)
        "brand-accent": "#3b82f6", // Modern blue for CTAs and highlights
        "brand-secondary": "#10b981", // Fresh green for secondary elements
        "brand-muted": "#64748b", // Modern gray for secondary text
        "brand-nav-text": "#f8fafc", // Light text for dark nav
        "brand-nav-muted": "#cbd5e1", // Soft gray for muted nav text
        "brand-surface": "#f1f5f9", // Light slate for card backgrounds
        "brand-warm": "#fef3c7", // Warm yellow for highlights
        "brand-cool": "#dbeafe", // Cool blue for alternate sections
        "brand-success": "#059669", // Green for success states
        "brand-warning": "#d97706", // Orange for warnings
        "brand-error": "#dc2626", // Red for errors
        "brand-purple": "#8b5cf6", // Purple for special elements
        "brand-teal": "#0d9488", // Teal for variety
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        "hero-gradient":
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #3b82f6 100%)",
        "warm-gradient": "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
        "cool-gradient": "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
        "accent-gradient": "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        "dark-gradient": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        "success-gradient": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        "purple-gradient": "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
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
