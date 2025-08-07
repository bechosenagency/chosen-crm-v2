"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles, Star } from "lucide-react";

interface MicroCelebrationProps {
  show: boolean;
  message?: string;
  onComplete?: () => void;
}

export default function MicroCelebration({
  show,
  message = "Great job!",
  onComplete,
}: MicroCelebrationProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={100}
            recycle={false}
            gravity={0.2}
            colors={[
              "var(--c-primary)",
              "var(--c-success)",
              "var(--c-warning)",
              "var(--c-error)",
            ]}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Trophy className="h-16 w-16 text-primary" />
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-warning" />
                <Star className="absolute -bottom-2 -left-2 h-6 w-6 text-secondary" />
              </motion.div>
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-foreground"
              >
                {message}
              </motion.h3>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
