import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            // primary: {
            //   DEFAULT: "#5D4EA9",
            //   // DEFAULT: "#FE1EFE",
            //   DEFAULT: "#cb09dd",
            //   50: "#ffe3ff",
            //   100: "#f9b3ff",
            //   200: "#f183fc",
            //   300: "#eb52f9",
            //   400: "#e422f6",
            //   500: "#cb09dd",
            //   600: "#9e03ad",
            //   700: "#72017c",
            //   800: "#46004c",
            //   900: "#1b001e",
            // },

            primary: {
              DEFAULT: "#56489d",
              50: "#efedff",
              100: "#cfcaec",
              200: "#b0a8d9",
              300: "#9085c8",
              400: "#7062b7",
              500: "#56489d",
              600: "#43387b",
              700: "#302859",
              800: "#1d1737",
              900: "#0b0618",
            },
          },
        },
      },
    }),
  ],
};

module.exports = config;
