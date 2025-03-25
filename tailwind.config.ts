import plaiceholder from "@plaiceholder/tailwindcss";
import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-orange": "hsl(26, 100%, 55%)",
        "primary-pale-orange": "hsl(25, 100%, 94%)",
        "neutral-very-dark-blue": "hsl(220, 13%, 13%)",
        "neutral-dark-grayish-blue": "hsl(219, 9%, 45%)",
        "neutral-grayish-blue": "hsl(220, 14%, 75%)",
        "neutral-light-grayish-blue": "hsl(223, 64%, 98%)",
        "neutral-white": "hsl(0, 0%, 100%)",
        "neutral-black": "hsl(0, 0%, 0%)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      opacity: {
        "75": "0.75",
      },
      fontFamily: {
        kumbh: "var(--kumbh_sans)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  darkMode: ["class", "class"],
  plugins: [
    heroui({
      addCommonColors: true,

      themes: {
        light: {
          // ...
          colors: {
            primary: {
              foreground: "hsl(26, 100%, 55%)",
              DEFAULT: "hsl(26, 100%, 55%)",
            },
          },
        },
        dark: {
          // ...
          colors: {
            primary: {
              foreground: "hsl(26, 100%, 55%)",
              DEFAULT: "hsl(26, 100%, 55%)",
            },
          },
        },
        // ... custom themes
      },
    }),
    require("tailwindcss-animate"),
  ],
};
export default config;
