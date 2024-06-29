import { nextui } from "@nextui-org/react";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        trans: {
          '0%': { transform: "translateY(800px) translateX(300px)" },
          '100%': { transform: "translateY(-800px) translateX(-10px)" },
        },
        trans2: {
          '0%': { transform: "translateY(-800px) translateX(-100px)" },
          '100%': { transform: "translateY(800px) translateX(100px)" },
        },
      },
      animation: {
        trans: "trans 20s linear infinite",
        trans2: "trans2 20s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
