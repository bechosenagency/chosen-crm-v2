'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MetallicSheen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: springX,
          y: springY,
          background: 'radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: springX,
          y: springY,
          background: 'radial-gradient(circle, rgba(184, 149, 106, 0.1) 0%, transparent 60%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
}