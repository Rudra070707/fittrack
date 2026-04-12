/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      // 🎨 COLOR SYSTEM (PREMIUM DARK UI)
      colors: {
        primary: "#22c55e",
        primaryDark: "#16a34a",
        accent: "#06b6d4",

        // 🔥 NEW GLOW COLORS
        neonGreen: "#00FF9C",
        neonBlue: "#00C2FF",

        background: "#05070c",
        surface: "#0b0f1a",
        surfaceLight: "#111827",
        border: "rgba(255,255,255,0.08)",

        textPrimary: "#ffffff",
        textSecondary: "rgba(255,255,255,0.7)",
        textMuted: "rgba(255,255,255,0.5)",

        success: "#22c55e",
        error: "#ef4444",
        warning: "#f59e0b",
      },

      // 🌈 GRADIENTS (NEW 🔥)
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #22c55e, #06b6d4)",
        "gradient-dark": "linear-gradient(to bottom, #020617, #05070c)",
        "gradient-glow": "radial-gradient(circle, rgba(34,197,94,0.3), transparent)",
      },

      // 🌫️ SHADOW SYSTEM (UPGRADED)
      boxShadow: {
        glow: "0 0 30px rgba(34,197,94,0.5)",
        glowStrong: "0 0 60px rgba(34,197,94,0.7)",
        glowBlue: "0 0 30px rgba(6,182,212,0.6)",

        soft: "0 10px 30px rgba(0,0,0,0.3)",
        deep: "0 20px 60px rgba(0,0,0,0.6)",

        // 🔥 NEW LAYERED DEPTH
        elevated: "0 8px 20px rgba(0,0,0,0.25), 0 20px 60px rgba(0,0,0,0.5)",
      },

      // 🧊 BLUR SYSTEM
      backdropBlur: {
        xs: "2px",
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "30px",
      },

      // 🔤 TYPOGRAPHY
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      // 🔲 BORDER RADIUS
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },

      // 📏 SPACING SYSTEM (NEW)
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },

      // 🎞️ ANIMATION SYSTEM (UPGRADED)
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(34,197,94,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(34,197,94,0.8)" },
        },

        // 🔥 NEW FLOAT ANIMATION
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        // 🔥 NEW FADE SCALE
        fadeScale: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },

      animation: {
        fadeUp: "fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        fadeIn: "fadeIn 0.5s ease-out",
        scaleIn: "scaleIn 0.4s ease-out",
        glowPulse: "glowPulse 2s infinite ease-in-out",

        // 🔥 NEW
        float: "float 4s ease-in-out infinite",
        fadeScale: "fadeScale 0.4s ease-out",
      },

      // ⚡ TRANSITIONS
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      // 🔝 Z-INDEX SYSTEM (NEW)
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },

      // 📦 CONTAINER SYSTEM (NEW)
      container: {
        center: true,
        padding: "1rem",
      },

    },
  },

  plugins: [],
};