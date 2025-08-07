"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, Target, Zap } from "lucide-react";

// Feature-Carousel-v2: Premium feature carousel with exact PRD metrics and auto-advance
interface FeatureMetric {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  metric: string;
  description: string;
  gradient: string;
}

const features: FeatureMetric[] = [
  {
    icon: Users,
    title: "Daily Engagement",
    metric: "90% daily active usage",
    description: "Loan officers stay engaged with intelligent daily coaching and accountability features that drive consistent action",
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    icon: TrendingUp,
    title: "Production Increase",
    metric: "40% more loans closed",
    description: "AI-powered lead qualification and coaching insights help loan officers close significantly more deals",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    icon: Zap,
    title: "Time Efficiency",
    metric: "2+ hours saved daily",
    description: "Intelligent automation eliminates repetitive tasks so you can focus on high-value activities",
    gradient: "from-violet-400 to-purple-500"
  },
  {
    icon: Target,
    title: "Cost Savings",
    metric: "Replace $2000 in tools",
    description: "One comprehensive platform replaces multiple expensive subscriptions while delivering superior results",
    gradient: "from-orange-400 to-red-500"
  }
];

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentFeature = features[currentIndex];
  const Icon = currentFeature.icon;

  return (
    <div className="space-y-8">
      {/* Progress indicators */}
      <div className="flex justify-center space-x-2">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? "w-8 h-1 bg-primary" 
                : "w-4 h-1 bg-white/20 hover:bg-white/40"
            } before:content-[''] before:absolute before:inset-0 before:-inset-y-5 before:rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Feature content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ 
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1] // Custom easing for premium feel
          }}
          className="text-center space-y-6"
        >
          {/* Icon with gradient background */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${currentFeature.gradient} 
                       flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Metric - Large emphasis */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="space-y-2"
          >
            <h3 className="text-3xl font-bold text-white">
              {currentFeature.metric}
            </h3>
            <p className="text-lg font-medium text-white/80">
              {currentFeature.title}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-white/70 text-sm leading-relaxed max-w-sm mx-auto"
          >
            {currentFeature.description}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots for mobile */}
      <div className="flex justify-center space-x-3 md:hidden">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? "bg-primary scale-125" 
                : "bg-white/30 hover:bg-white/50"
            } before:content-[''] before:absolute before:inset-0 before:-inset-4 before:rounded-full`}
            aria-label={`Feature ${index + 1}: ${features[index].title}`}
          />
        ))}
      </div>
    </div>
  );
}