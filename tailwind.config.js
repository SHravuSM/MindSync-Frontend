// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // Minimum width of 500px and maximum width of 767px
      sm: { min: "285px", max: "431px" },

      // Minimum width of 768px and maximum width of 1023px
      md: { min: "431px", max: "900px" },

      // Maximum width of 1279px
      lg: { min: "901px", max: "2440px" },
    },
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
