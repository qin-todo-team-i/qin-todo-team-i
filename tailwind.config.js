module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "1.5xl": ["1.375rem", "1.625rem"],
      },
      colors: {
        primary: "#F43F5E",
        secondary: "#FB923C",
        tertiary: "#FBBF24",
        gray: "#C2C6D2",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
