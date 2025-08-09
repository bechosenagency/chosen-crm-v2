import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  safelist: ["prestige-metallic"],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },

    extend: {
      colors: {
        // Brand & feedback
        primary:   "var(--c-primary)",
        secondary: "var(--c-secondary)",
        accent:    "var(--c-accent)",
        success:   "var(--c-success)",
        warning:   "var(--c-warning)",
        error:     "var(--c-error)",

        // Neutrals
        bg:          "var(--c-bg)",
        surface:     "var(--c-surface-1)",
        "surface-1": "var(--c-surface-1)",
        "surface-2": "var(--c-surface-2)",
        border:      "var(--c-border)",
        sidebar:     "var(--c-sidebar)",
        topbar:      "var(--c-topbar)",

        text: {
          DEFAULT:   "var(--c-text-primary)",
          secondary: "var(--c-text-secondary)",
          muted:     "var(--c-text-muted)",
          light:     "var(--c-text-light)",
        },
        
        // Prestige Metallic specific colors
        prestige: {
          gold:      "#C9A961",
          titanium:  "#8B8680",
          platinum:  "#E5E4E2",
          "rose-gold": "#B8956A",
        },

        // ShadCN legacy tokens
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

      backgroundImage: {
        "primary-grad":  "linear-gradient(135deg,var(--c-primary) 0%,var(--c-secondary) 100%)",
        "progress-grad": "linear-gradient(to right,var(--c-primary) 0%,var(--c-accent) 100%)",
        "bg-grad":       "linear-gradient(135deg,var(--c-bg-grad-from) 0%,var(--c-bg-grad-to) 100%)",
        "sidebar-grad":  "linear-gradient(180deg,var(--c-sidebar) 0%,transparent 100%)",
      },

      boxShadow: {
        premium:      "0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)",
        "premium-lg": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        glow:         "0 0 20px rgba(37,117,255,0.35)",
        purple:       "0 10px 30px -10px rgba(139,92,246,0.30)",
        hover:        "0 25px 50px -12px rgba(0,0,0,0.25)",
      },

      backdropBlur: {
        xs: "2px",
      },

      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        serif: ["var(--font-playfair)", ...fontFamily.serif],
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};

export default config;
