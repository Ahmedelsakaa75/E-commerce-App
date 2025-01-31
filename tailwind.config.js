module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          light: "#ffffff",
          dark: "#1a1a1a",
        },
        accent: "#4f46e5",
        text: {
          light: "#1f2937",
          dark: "#f3f4f6",
        }
      },
      transitionDuration: {
        fast: "150ms",
      }
    },
  },
  plugins: [],
};