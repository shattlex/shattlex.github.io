import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        panel: "#121212",
        accent: "#E10600",
        accentSoft: "#FF3B30"
      },
      boxShadow: {
        glow: "0 0 30px rgba(225,6,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;


