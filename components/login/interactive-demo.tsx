"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, AlertCircle } from "lucide-react";

export function InteractiveDemo() {
  const [score, setScore] = useState(87);
  const [calls, setCalls] = useState(12);
  const [emails, setEmails] = useState(28);
  const [applications, setApplications] = useState(3);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prev => {
        const newScore = prev + Math.floor(Math.random() * 3) - 1;
        return Math.max(0, Math.min(100, newScore));
      });
      setCalls(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setEmails(prev => prev + (Math.random() > 0.5 ? 1 : 0));
      setApplications(prev => prev + (Math.random() > 0.9 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-[#E5E7EB]"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">Live Demo Preview</h3>
        <span className="text-xs text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full">
          • Live
        </span>
      </div>

      <div className="space-y-4">
        {/* Daily Accountability Score */}
        <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">Daily Accountability Score</p>
            <p className="text-xs text-[#6B7280]">3 more calls to reach your goal</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              key={score}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-[#0066FF]"
            >
              {score}%
            </motion.div>
            <TrendingUp className="h-5 w-5 text-[#10B981]" />
          </div>
        </div>

        {/* AI Suggestion */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#0066FF]/5 to-[#10B981]/5 rounded-lg border border-[#0066FF]/20"
        >
          <AlertCircle className="h-5 w-5 text-[#0066FF] mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">AI Suggestion</p>
            <p className="text-xs text-[#6B7280]">
              Call Johnson lead now - 78% close probability based on similar patterns
            </p>
          </div>
        </motion.div>

        {/* Activity Tracker */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            key={calls}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-center p-3 bg-[#F8FAFC] rounded-lg"
          >
            <div className="text-lg font-bold text-[#1A1A1A]">{calls}</div>
            <div className="text-xs text-[#6B7280]">Calls</div>
          </motion.div>
          <motion.div
            key={emails}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-center p-3 bg-[#F8FAFC] rounded-lg"
          >
            <div className="text-lg font-bold text-[#1A1A1A]">{emails}</div>
            <div className="text-xs text-[#6B7280]">Emails</div>
          </motion.div>
          <motion.div
            key={applications}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-center p-3 bg-[#F8FAFC] rounded-lg"
          >
            <div className="text-lg font-bold text-[#1A1A1A]">{applications}</div>
            <div className="text-xs text-[#6B7280]">Apps</div>
          </motion.div>
        </div>
      </div>

      {/* See Live Demo Button */}
      <button className="mt-4 w-full py-2 text-sm font-medium text-[#0066FF] bg-[#0066FF]/5 rounded-lg hover:bg-[#0066FF]/10 transition-colors duration-200">
        See Full Live Demo →
      </button>
    </motion.div>
  );
}