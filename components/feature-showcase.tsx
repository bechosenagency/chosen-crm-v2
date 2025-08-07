"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "AI Coaching & Accountability",
    description: "Get personalized guidance and stay on track with your goals",
  },
  {
    title: "Lender Intelligence Engine",
    description: "Smart matching with the right lenders for your clients",
  },
  {
    title: "Power Dialer Built-In",
    description: "Reach more prospects with automated dialing capabilities",
  },
  {
    title: "Marketing Automation",
    description: "Nurture leads and close deals on autopilot",
  },
];

export function FeatureShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const currentFeature = features[currentIndex];
    let charIndex = 0;

    if (isTyping) {
      setShowDescription(false);
      const typingInterval = setInterval(() => {
        if (charIndex <= currentFeature.title.length) {
          setDisplayText(currentFeature.title.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setShowDescription(true);

          setTimeout(() => {
            setIsTyping(true);
            setCurrentIndex((prev) => (prev + 1) % features.length);
          }, 3000);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [currentIndex, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="mt-8 h-24 flex flex-col items-center justify-center"
    >
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-700 h-8">
          {displayText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle"
          />
        </h3>
        <AnimatePresence mode="wait">
          {showDescription && (
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-gray-500 max-w-md"
            >
              {features[currentIndex].description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
