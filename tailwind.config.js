// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      colors: {
        premium: "#ff6b81",
        luxuryGold: "#d4af37",
      },
      dropShadow: {
        glow: "0 0 10px rgba(0, 255, 255, 0.5)", // custom glow shadow
      },
    },
  },
  plugins: [],
};
