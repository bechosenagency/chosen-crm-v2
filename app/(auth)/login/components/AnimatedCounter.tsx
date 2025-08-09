'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValueEvent } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ target, duration = 2, className = '' }: AnimatedCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');
  const spring = useSpring(0, { duration: duration * 1000 });

  useMotionValueEvent(spring, 'change', (current) => {
    setDisplayValue(Math.floor(current).toLocaleString());
  });

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
      spring.set(target);
    }, 500);

    return () => clearTimeout(timer);
  }, [spring, target]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {displayValue}+
    </motion.span>
  );
}