/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          default: "#0f1021", // Deep dark base
          dark: "#0a0a1a", // Extra dark for modals/nav
          card: "#1c1c2e", // Glassy card background
          gradientStart: "#1c1c3b",
          gradientEnd: "#351a4f",
        },
        primary: {
          default: "#a78bfa", // Soft violet (text/buttons)
          hover: "#c4b5fd", // Lighter violet
          solid: "#7c3aed", // Strong purple (highlight)
        },
        accent: {
          default: "#3b82f6", // Main blue CTA
          hover: "#2563eb", // Hover blue
          muted: "#60a5fa", // Optional lighter accent
        },
        secondary: {
          default: "#373854", // Secondary surfaces/borders
          hover: "#4b4c6b",
        },
        input: {
          background: "#2a2a40",
          border: "#3e3e5e",
          focus: "#a78bfa",
        },
        text: {
          default: "#ffffff",
          muted: "#b3b3c6",
          secondary: "#8f8fa6",
          contrast: "#a78bfa",
        },
      },
      borderColor: {
        card: "rgba(255, 255, 255, 0.08)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
        glow: "0 0 20px rgba(167, 139, 250, 0.4)",
      },
    },
  },
  plugins: [],
};
