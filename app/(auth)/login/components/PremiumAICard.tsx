'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Clock, Sparkles } from 'lucide-react';

interface PremiumAICardProps {
  name: string;
  role: string;
  tagline: string;
  color: string;
  icon: 'max' | 'ava';
  features: string[];
  delay?: number;
}

export default function PremiumAICard({ 
  name, 
  role, 
  tagline, 
  color, 
  icon, 
  features,
  delay = 0 
}: PremiumAICardProps) {
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmer(true);
      setTimeout(() => setShimmer(false), 1000);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featureIcons = {
    'Real-time performance tracking': TrendingUp,
    'Pattern recognition': Shield,
    '24/7 pipeline monitoring': Clock,
    'Proactive alerts': Sparkles,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      {/* Glass card */}
      <div className="relative w-[280px] p-8 rounded-2xl overflow-hidden">
        {/* Background with blur */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
        
        {/* Border gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-50" />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ opacity: shimmer ? 0.3 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-full animate-shimmer" />
        </motion.div>

        {/* Glow on hover */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at center, ${color}20 0%, transparent 40%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div 
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div 
              className="w-20 h-20 flex items-center justify-center"
              style={{ color }}
            >
              {icon === 'max' ? <MaxIcon /> : <AvaIcon />}
            </div>
          </motion.div>
          
          {/* Header */}
          <div className="text-center mb-6">
            <h3 
              className="text-sm font-light tracking-[0.3em] uppercase mb-2"
              style={{ color }}
            >
              {name}
            </h3>
            <p className="text-sm text-white/60 font-light">{role}</p>
            <p className="text-base text-white/80 font-light italic mt-3">&ldquo;{tagline}&rdquo;</p>
          </div>

          {/* Features */}
          <div className="space-y-3 mt-8">
            {features.map((feature, index) => {
              const Icon = featureIcons[feature as keyof typeof featureIcons] || Sparkles;
              return (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.1 * index }}
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                  <span className="font-light">{feature}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MaxIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="maxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="30" cy="30" r="28" stroke="url(#maxGradient)" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Head profile */}
      <path d="M30 10 C40 10, 45 15, 45 25 C45 30, 43 33, 40 35 L40 45 C40 48, 37 50, 34 50 L26 50 C23 50, 20 48, 20 45 L20 35 C17 33, 15 30, 15 25 C15 15, 20 10, 30 10 Z" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Eye */}
      <circle cx="35" cy="22" r="2.5" fill="currentColor" />
      {/* Brain patterns */}
      <path d="M25 18 Q30 20, 35 18" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <path d="M25 22 Q30 24, 35 22" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <path d="M25 26 Q30 28, 35 26" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

function AvaIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="avaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Outer flowing ring */}
      <path d="M30 5 Q45 15, 45 30 T30 55 Q15 45, 15 30 T30 5" 
        stroke="url(#avaGradient)" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Main flow */}
      <path d="M30 10 Q40 15, 40 30 T30 50 Q20 45, 20 30 T30 10" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Inner flow */}
      <path d="M30 20 Q35 25, 35 30 T30 40 Q25 35, 25 30 T30 20" 
        stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6" />
      {/* Center orb */}
      <circle cx="30" cy="30" r="3" fill="currentColor" />
      {/* Energy dots */}
      <circle cx="30" cy="15" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="42" cy="30" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="30" cy="45" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="18" cy="30" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}