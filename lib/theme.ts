// theme.ts - Prestige Metallic Theme Configuration
export const THEME_NAME = "prestige-metallic";

export const THEME_COLORS = {
  // Primary Palette
  background: "#FAFBFC", // Platinum White
  surface: "#FFFFFF", // Pure White
  sidebar: "#1A1B1E", // Obsidian Black
  topBar: "#000000", // Deep Black
  
  // Metallic Accents
  primary: "#C9A961", // Champagne Gold
  secondary: "#8B8680", // Titanium
  accent: "#E5E4E2", // Platinum
  hover: "#B8956A", // Rose Gold
  
  // Text Colors
  textPrimary: "#1A1B1E", // Near Black
  textSecondary: "#6B7280", // Steel Gray
  textLight: "#F9FAFB", // Off White (on dark)
  
  // Semantic Colors
  success: "#059669", // Emerald
  warning: "#D97706", // Amber
  error: "#DC2626", // Ruby
  info: "#2563EB", // Sapphire
} as const;

export function setTheme() {
  const root = document.documentElement;
  root.dataset.theme = THEME_NAME;
  localStorage.setItem("theme", THEME_NAME);
}

export function getTheme(): string {
  if (typeof window === "undefined") return THEME_NAME;
  
  const stored = localStorage.getItem("theme");
  return stored === THEME_NAME ? stored : THEME_NAME;
}

export function initTheme() {
  setTheme();
}

// AI Coaches configuration
export const AI_COACHES = {
  max: {
    name: "Coach Max",
    role: "Performance & Accountability",
    color: THEME_COLORS.primary,
    icon: "Trophy",
  },
  ava: {
    name: "Assistant Ava", 
    role: "Pipeline & Task Management",
    color: THEME_COLORS.secondary,
    icon: "Sparkles",
  }
} as const;