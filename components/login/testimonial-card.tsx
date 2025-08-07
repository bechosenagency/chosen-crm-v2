"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function TestimonialCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="absolute -right-8 top-1/3 z-20 max-w-sm"
    >
      <div className="bg-white rounded-xl shadow-xl border border-[#E5E7EB] p-6 relative">
        {/* Quote Icon */}
        <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-[#0066FF] to-[#0052CC] rounded-full flex items-center justify-center shadow-lg">
          <Quote className="h-5 w-5 text-white" />
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-[#1A1A1A] font-medium mb-4">
          "CHOSEN transformed our mortgage business. We've closed 40% more loans and saved countless hours on admin work. It's like having a full team of assistants."
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <div className="font-semibold text-[#1A1A1A]">Jennifer Davis</div>
            <div className="text-sm text-[#6B7280]">Senior Loan Officer, Wells Fargo</div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-[#0066FF]/10 to-[#10B981]/10 rounded-full blur-xl" />
      </div>
    </motion.div>
  );
}