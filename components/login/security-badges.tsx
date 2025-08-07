"use client";

import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle } from "lucide-react";

export function SecurityBadges() {
  const badges = [
    { icon: Shield, label: "SOC 2 Certified" },
    { icon: Lock, label: "256-bit Encryption" },
    { icon: CheckCircle, label: "GDPR Compliant" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.6 }}
      className="flex items-center justify-center gap-6 py-6"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1.7 + index * 0.1 }}
          className="flex items-center gap-2 text-[#6B7280]"
        >
          <badge.icon className="h-4 w-4" />
          <span className="text-sm">{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}