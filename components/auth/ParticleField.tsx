'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ParticleFieldProps {
  count?: number;
  seed?: number;
}

// Mulberry32 PRNG - deterministic random number generator
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export default function ParticleField({ count = 14, seed = 1337 }: ParticleFieldProps) {
  // Generate particles deterministically using seeded PRNG
  const particles = useMemo(() => {
    const random = mulberry32(seed);
    
    return Array.from({ length: count }, (_, i) => {
      // Make 2 particles larger for more presence
      const isLarge = i < 2;
      const baseSize = random() * 3 + 1;
      const size = isLarge ? baseSize * 1.25 : baseSize;
      
      return {
        id: i,
        size,
        initialX: random() * 100,
        initialY: random() * 100,
        duration: random() * 20 + 30, // 30-50s
        delay: random() * 10,
      };
    });
  }, [count, seed]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[hsl(var(--c-primary))]/10 blur-xl"
          style={{
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            opacity: [0.08, 0.14, 0.08],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Static radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-[hsl(var(--c-primary))]/5 via-transparent to-transparent" />
      
      {/* Reduced motion: static dots */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          div :global(.absolute.rounded-full) {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}