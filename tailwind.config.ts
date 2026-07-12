import { heroui } from "@heroui/theme";

const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
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
  plugins: [heroui()],
};

export default config;
