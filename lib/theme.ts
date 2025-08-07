// toggleTheme.js
export function setTheme(mode: "exec-dark" | "exec-light" = "exec-dark") {
  const root = document.documentElement;
  root.dataset.theme = mode; // swaps the CSS variables
  localStorage.setItem("theme", mode);
}

export function getTheme(): "exec-dark" | "exec-light" {
  if (typeof window === "undefined") return "exec-dark";

  const stored = localStorage.getItem("theme");
  if (stored === "exec-dark" || stored === "exec-light") {
    return stored;
  }

  // Default to dark theme
  return "exec-dark";
}

export function initTheme() {
  const theme = getTheme();
  setTheme(theme);
}

export function toggleTheme() {
  const currentTheme = getTheme();
  const newTheme = currentTheme === "exec-dark" ? "exec-light" : "exec-dark";
  setTheme(newTheme);
}
