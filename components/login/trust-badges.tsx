"use client";

import { motion } from "framer-motion";

export function TrustBadges() {
  // Using placeholder text for company names
  const companies = [
    { name: "Wells Fargo", className: "text-[#D71E2B]" },
    { name: "Rocket Mortgage", className: "text-[#DA0032]" },
    { name: "Chase", className: "text-[#117ACA]" },
    { name: "Bank of America", className: "text-[#012169]" },
    { name: "Quicken Loans", className: "text-[#00A4E4]" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <p className="text-sm text-[#6B7280] mb-4 text-center md:text-left">
        Trusted by leading mortgage professionals at
      </p>
      <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
        {companies.map((company, index) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            className={`font-semibold text-lg ${company.className} opacity-60 hover:opacity-100 transition-opacity duration-200`}
          >
            {company.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}