"use client";

import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ThemeToggleLogin() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const preferredTheme = savedTheme || "light";
    setTheme(preferredTheme);
    updateTheme(preferredTheme);
  }, []);

  const updateTheme = (newTheme: "light" | "dark") => {
    if (newTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "refined-noir");
    } else {
      document.documentElement.setAttribute("data-theme", "premium-bright");
    }
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    updateTheme(newTheme);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-[#F3F4F6] transition-colors duration-200"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Sun className="w-5 h-5 text-[#F59E0B]" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Moon className="w-5 h-5 text-[#8B5CF6]" />
        </motion.div>
      </div>
    </motion.button>
  );
}