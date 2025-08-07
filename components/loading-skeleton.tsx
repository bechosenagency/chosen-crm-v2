"use client";

import { motion } from "framer-motion";

// Loading-Skeleton-v2: Premium loading states with smooth animations
interface LoadingSkeletonProps {
  variant?: "form" | "feature" | "button" | "text";
  className?: string;
}

export function LoadingSkeleton({ variant = "text", className = "" }: LoadingSkeletonProps) {
  const shimmerAnimation = {
    initial: { x: "-100%" },
    animate: { x: "100%" },
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear"
    }
  };

  const baseClasses = "relative overflow-hidden bg-white/5 rounded-lg";
  const shimmerClasses = "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent";

  if (variant === "form") {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Form field skeletons */}
        {[1, 2].map((index) => (
          <div key={index} className="space-y-2">
            <div className={`${baseClasses} h-4 w-16`}>
              <motion.div className={shimmerClasses} {...shimmerAnimation} />
            </div>
            <div className={`${baseClasses} h-12 w-full`}>
              <motion.div className={shimmerClasses} {...shimmerAnimation} />
            </div>
          </div>
        ))}
        
        {/* Button skeleton */}
        <div className={`${baseClasses} h-12 w-full`}>
          <motion.div className={shimmerClasses} {...shimmerAnimation} />
        </div>
        
        {/* SSO buttons skeleton */}
        <div className="space-y-3">
          {[1, 2].map((index) => (
            <div key={index} className={`${baseClasses} h-12 w-full`}>
              <motion.div className={shimmerClasses} {...shimmerAnimation} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "feature") {
    return (
      <div className={`text-center space-y-6 ${className}`}>
        {/* Icon skeleton */}
        <div className={`${baseClasses} w-16 h-16 mx-auto rounded-2xl`}>
          <motion.div className={shimmerClasses} {...shimmerAnimation} />
        </div>
        
        {/* Metric skeleton */}
        <div className="space-y-2">
          <div className={`${baseClasses} h-8 w-48 mx-auto`}>
            <motion.div className={shimmerClasses} {...shimmerAnimation} />
          </div>
          <div className={`${baseClasses} h-6 w-32 mx-auto`}>
            <motion.div className={shimmerClasses} {...shimmerAnimation} />
          </div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className={`${baseClasses} h-4 w-64 mx-auto`}>
            <motion.div className={shimmerClasses} {...shimmerAnimation} />
          </div>
          <div className={`${baseClasses} h-4 w-48 mx-auto`}>
            <motion.div className={shimmerClasses} {...shimmerAnimation} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "button") {
    return (
      <div className={`${baseClasses} h-12 w-full ${className}`}>
        <motion.div className={shimmerClasses} {...shimmerAnimation} />
      </div>
    );
  }

  // Default text skeleton
  return (
    <div className={`${baseClasses} h-4 w-full ${className}`}>
      <motion.div className={shimmerClasses} {...shimmerAnimation} />
    </div>
  );
}