import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sys: "rgb(var(--bg) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        label: "rgb(var(--label) / <alpha-value>)",
        slabel: "rgb(var(--slabel) / <alpha-value>)",
        tint: "rgb(var(--tint) / <alpha-value>)",
        separator: "rgb(var(--separator) / <alpha-value>)"
      },
      boxShadow: {
        ios: "0 10px 30px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        ios: "24px",
        "ios-lg": "28px",
        "ios-xl": "32px"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out"
      },
      fontFamily: {
        sans: ["var(--font-tajawal)", "sans-serif"]
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
};

export default config;


