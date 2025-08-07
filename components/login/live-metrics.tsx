"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export function LiveMetrics() {
  const [loanCount, setLoanCount] = useState(2800);
  const targetCount = 2847;

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = (targetCount - 2800) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setLoanCount(Math.floor(2800 + increment * currentStep));
        currentStep++;
      } else {
        setLoanCount(targetCount);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="inline-flex items-center gap-3 bg-gradient-to-r from-[#10B981]/10 to-[#0066FF]/10 px-6 py-3 rounded-full border border-[#10B981]/20"
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
        <span className="text-sm font-medium text-[#10B981]">LIVE</span>
      </div>
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-[#10B981]" />
        <span className="text-lg font-bold text-[#1A1A1A] tabular-nums">
          {loanCount.toLocaleString()}
        </span>
        <span className="text-sm text-[#6B7280]">loans closed this week</span>
      </div>
    </motion.div>
  );
}