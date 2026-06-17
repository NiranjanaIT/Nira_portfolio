/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: "#050505",
        bgDark: "#0B0F19",
        accentBlue: "#3B82F6",
        accentPurple: "#8B5CF6",
        accentBeige: "#F5F2EB",
        accentPaperDark: "#1A1A1A",
      },
      fontFamily: {
        space: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
