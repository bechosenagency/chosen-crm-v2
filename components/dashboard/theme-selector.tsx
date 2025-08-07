"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Sparkles, Monitor, Palette } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Theme = "exec-light" | "exec-dark" | "premium-bright" | "refined-noir" | "refined-noir-light";

interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const themeOptions: ThemeOption[] = [
  {
    value: "exec-suite-light",
    label: "Executive Suite Light",
    icon: Sparkles,
    description: "Premium professional theme"
  },
  {
    value: "refined-noir-light",
    label: "Refined Light",
    icon: Sun,
    description: "Clean and professional light theme"
  },
  {
    value: "refined-noir",
    label: "Refined Noir",
    icon: Moon,
    description: "Sophisticated dark theme"
  },
  {
    value: "premium-bright",
    label: "Premium Bright",
    icon: Monitor,
    description: "High-contrast bright theme"
  },
  {
    value: "exec-dark",
    label: "Executive Dark",
    icon: Palette,
    description: "Classic dark theme"
  }
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentTheme = themeOptions.find(t => t.value === theme) || themeOptions[0];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative h-9 w-9 rounded-lg transition-all hover:bg-surface-2"
              aria-label="Select theme"
              aria-expanded={isOpen}
              aria-haspopup="menu"
            >
              <currentTheme.icon className="h-[1.2rem] w-[1.2rem] transition-all" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Current theme: {currentTheme.label}
          </TooltipContent>
        </Tooltip>

        {/* Theme selector dropdown */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 w-64 rounded-lg bg-surface-1 border border-border shadow-lg z-50"
              role="menu"
              aria-label="Theme selection menu"
            >
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                  Select Theme
                </p>
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = theme === option.value;
                  
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleThemeChange(option.value)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
                        transition-all duration-200
                        ${isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-surface-2 text-foreground'
                        }
                      `}
                      role="menuitem"
                      aria-current={isActive ? "true" : "false"}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <div className="text-left flex-1">
                        <p className="font-medium">{option.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-2 w-2 rounded-full bg-primary"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}