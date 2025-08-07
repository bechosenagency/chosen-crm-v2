"use client";

import { motion } from "framer-motion";

export function PressLogos() {
  const pressOutlets = [
    { name: "HousingWire", className: "text-[#E85D3D]" },
    { name: "Mortgage Professional America", className: "text-[#003366]" },
    { name: "National Mortgage News", className: "text-[#2E3192]" },
    { name: "Forbes", className: "text-[#231F20]" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="w-full"
    >
      <p className="text-sm text-[#6B7280] mb-4 text-center">As seen in</p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {pressOutlets.map((outlet, index) => (
          <motion.div
            key={outlet.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 + index * 0.1 }}
            className={`font-semibold text-lg ${outlet.className} transition-opacity duration-200`}
          >
            {outlet.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}