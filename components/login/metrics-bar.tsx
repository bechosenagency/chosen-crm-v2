"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, Clock, DollarSign } from "lucide-react";

export function MetricsBar() {
  const metrics = [
    {
      icon: Zap,
      value: "90%",
      label: "Daily Active Users",
      color: "from-[#F59E0B] to-[#D97706]",
    },
    {
      icon: TrendingUp,
      value: "40%",
      label: "More Loans Closed",
      color: "from-[#10B981] to-[#059669]",
    },
    {
      icon: Clock,
      value: "2+",
      label: "Hours Saved Daily",
      color: "from-[#0066FF] to-[#0052CC]",
    },
    {
      icon: DollarSign,
      value: "$2000",
      label: "Replace in Tools",
      color: "from-[#8B5CF6] to-[#7C3AED]",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="w-full bg-gradient-to-r from-[#F8FAFC] to-white border-y border-[#E5E7EB] py-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1A1A1A]">{metric.value}</div>
                <div className="text-sm text-[#6B7280]">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}