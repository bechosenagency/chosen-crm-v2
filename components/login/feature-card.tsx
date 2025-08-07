"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  example: string;
  delay?: number;
}

export function FeatureCard({ icon, title, description, example, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-shadow duration-300"
    >
      <div className="mb-4">
        {icon}
      </div>
      
      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-[#6B7280] mb-3">
        {description}
      </p>
      
      <div className="bg-[#F8FAFC] rounded-lg px-3 py-2 border border-[#E5E7EB]">
        <p className="text-xs text-[#6B7280] italic">
          {example}
        </p>
      </div>
    </motion.div>
  );
}