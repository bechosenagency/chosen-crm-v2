/* tailwind.config.ts ---------------------------------------------------- */
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class", '[data-theme="exec-dark"]'],

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  safelist: ["exec-dark", "exec-light"],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },

    extend: {
      /* ── token-first colour map ── */
      colors: {
        /* brand & feedback */
        primary:   "var(--c-primary)",
        secondary: "var(--c-secondary)",
        accent:    "var(--c-accent)",
        success:   "var(--c-success)",
        warning:   "var(--c-warning)",
        error:     "var(--c-error)",

        /* neutrals */
        bg:          "var(--c-bg)",
        surface:     "var(--c-surface-1)",
        "surface-1": "var(--c-surface-1)",
        "surface-2": "var(--c-surface-2)",
        border:      "var(--c-border)",
        sidebar:     "var(--c-sidebar)",

        text: {
          DEFAULT:   "var(--c-text-primary)",
          secondary: "var(--c-text-secondary)",
          muted:     "var(--c-text-muted)",
        },

        /* legacy ShadCN tokens — unchanged */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        input: "hsl(var(--input))",
        ring:  "hsl(var(--ring))",
      },

      /* gradients, shadows, fonts … unchanged from your file */
      backgroundImage: {
        "primary-grad":  "linear-gradient(135deg,var(--c-primary) 0%,var(--c-secondary) 100%)",
        "progress-grad": "linear-gradient(to right,var(--c-primary) 0%,var(--c-accent) 100%)",
        "bg-grad":       "linear-gradient(135deg,var(--c-bg-grad-from) 0%,var(--c-bg-grad-to) 100%)",
        "sidebar-grad":  "linear-gradient(180deg,var(--c-sidebar) 0%,transparent 100%)",
      },
      boxShadow: {
        premium:     "0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)",
        "premium-lg":"0 25px 50px -12px rgb(0 0 0 / 0.25)",
        glow:        "0 0 20px rgba(37,117,255,0.35)",
        purple:      "0 10px 30px -10px rgba(139,92,246,0.30)",
        hover:       "0 25px 50px -12px rgba(0,0,0,0.25)",
      },
      backdropBlur: { xs: "2px" },

      fontFamily:   { sans: ["Inter", ...fontFamily.sans] },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* keyframes / animations unchanged */
      keyframes: { /* … */ },
      animation: { /* … */ },
    },
  },

  plugins: [require("tailwindcss-animate")],
};

export default config;
