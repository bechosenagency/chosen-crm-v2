"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, Users, DollarSign, BarChart3, PieChart } from "lucide-react";

export function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative w-full max-w-2xl mx-auto mt-8"
    >
      {/* Browser Window Frame */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E5E7EB]">
        {/* Browser Header */}
        <div className="bg-[#F8FAFC] px-4 py-3 border-b border-[#E5E7EB] flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white px-4 py-1 rounded-md text-xs text-[#6B7280] border border-[#E5E7EB]">
              app.chosen.ai/dashboard
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 bg-gradient-to-br from-[#F8FAFC] to-white">
          {/* Header Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { icon: DollarSign, value: "$2.4M", label: "Pipeline", color: "from-[#10B981] to-[#059669]" },
              { icon: Users, value: "142", label: "Active Leads", color: "from-[#0066FF] to-[#0052CC]" },
              { icon: TrendingUp, value: "+28%", label: "Conversion", color: "from-[#8B5CF6] to-[#7C3AED]" },
              { icon: Activity, value: "94%", label: "Activity Score", color: "from-[#F59E0B] to-[#D97706]" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-lg p-3 shadow-sm border border-[#E5E7EB]"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-lg font-bold text-[#1A1A1A]">{stat.value}</div>
                <div className="text-xs text-[#6B7280]">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Pipeline Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="bg-white rounded-lg p-4 shadow-sm border border-[#E5E7EB]"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#1A1A1A]">Pipeline Stages</h3>
                <BarChart3 className="h-4 w-4 text-[#6B7280]" />
              </div>
              <div className="space-y-2">
                {[
                  { stage: "Application", value: 45, color: "bg-[#0066FF]" },
                  { stage: "Processing", value: 32, color: "bg-[#8B5CF6]" },
                  { stage: "Underwriting", value: 28, color: "bg-[#10B981]" },
                  { stage: "Closing", value: 37, color: "bg-[#F59E0B]" },
                ].map((item) => (
                  <div key={item.stage} className="flex items-center gap-3">
                    <div className="text-xs text-[#6B7280] w-20">{item.stage}</div>
                    <div className="flex-1 bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                    <div className="text-xs font-medium text-[#1A1A1A]">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activity Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="bg-white rounded-lg p-4 shadow-sm border border-[#E5E7EB]"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#1A1A1A]">Weekly Activity</h3>
                <PieChart className="h-4 w-4 text-[#6B7280]" />
              </div>
              <div className="flex items-center justify-center h-32">
                <div className="relative">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="#F3F4F6"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 36 * 0.25 }}
                      transition={{ duration: 1.5, delay: 1.3 }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0066FF" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xl font-bold text-[#1A1A1A]">75%</div>
                    <div className="text-xs text-[#6B7280]">Complete</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#0066FF]/20 to-[#10B981]/20 rounded-full blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#8B5CF6]/20 to-[#F59E0B]/20 rounded-full blur-2xl"
      />
    </motion.div>
  );
}