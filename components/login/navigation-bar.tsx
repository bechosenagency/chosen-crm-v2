"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export function NavigationBar() {
  const navItems = [
    { label: "Product", href: "#product" },
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "#resources" },
    { label: "Company", href: "#company" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="w-full py-6"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">CHOSEN</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#6B7280] hover:text-[#1A1A1A] font-medium transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 font-medium"
        >
          Book Demo
        </Button>
      </div>
    </motion.nav>
  );
}