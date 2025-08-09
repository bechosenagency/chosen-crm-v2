'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { Target, Sparkles } from 'lucide-react';

interface PersonaCardProps {
  name: string;
  role: string;
  quote: string;
  features: Array<{
    icon: React.ElementType;
    text: string;
  }>;
  delay?: number;
  variant?: 'max' | 'ava';
}

export default function PersonaCard({
  name,
  role,
  quote,
  features,
  delay = 0,
  variant = 'max',
}: PersonaCardProps) {
  // Accent mapping by persona
  const accentVar = variant === 'max' ? '--c-max-accent' : '--c-ava-accent';
  const EmblemIcon = variant === 'max' ? Target : Sparkles;

  // Parallax hover effect (very gentle)
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [0.3, -0.3]);
  const rotateY = useTransform(x, [-100, 100], [-0.3, 0.3]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = ((event.clientX - rect.left) / rect.width - 0.5) * 100;
    const yPct = ((event.clientY - rect.top) / rect.height - 0.5) * 100;
    x.set(xPct);
    y.set(yPct);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={prefersReduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' as const }}
      className="relative group"
    >
      {/* Card */}
      <motion.div
        className="relative p-8 rounded-2xl overflow-hidden
                   bg-white/5 backdrop-blur-md border border-white/10
                   ring-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]"
        style={{
          // expose --accent for child elements
          '--accent': `var(${accentVar})`,
          boxShadow: `0 10px 30px -10px hsl(var(${accentVar}) / 0.25)`,
          borderColor: `hsl(var(${accentVar}) / 0.20)`,
        } as React.CSSProperties}
        whileHover={prefersReduced ? undefined : { 
          y: -2, 
          boxShadow: `0 18px 40px -14px hsl(var(${accentVar}) / 0.35)`,
          transition: { duration: 0.2 } 
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Glow layer (behind content) */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(40% 60% at 50% 50%, hsl(var(${accentVar}) / 0.10), transparent 70%)`,
            filter: 'blur(18px)',
          }}
          initial={{ opacity: 0 }}
          whileHover={prefersReduced ? undefined : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shimmer sweep (hover only) */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0">
          {!prefersReduced && (
            <motion.div
              className="absolute inset-0 -translate-x-full"
              style={{
                background: `linear-gradient(90deg, transparent 0%, hsl(var(${accentVar}) / 0.18) 50%, transparent 100%)`,
                transform: 'translateX(-100%) skewX(-12deg)',
              }}
              whileHover={{ x: ['0%', '200%'] }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          )}
        </div>

        {/* Content (above effects) */}
        <div className="relative z-10">
          {/* Header — fixed jumbled titles by using a single inline-flex row */}
          <header className="flex items-center gap-2.5 min-w-0 mb-6">
            {/* emblem chip */}
            <span
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full
                         ring-1 bg-white/5"
              style={{
                // ring/color in accent
                boxShadow: `inset 0 0 0 1px hsl(var(${accentVar}) / 0.45)`,
              }}
              aria-hidden
            >
              <EmblemIcon className="h-3.5 w-3.5" style={{ color: `hsl(var(${accentVar}))` }} />
            </span>

            {/* title + role (no wrap to avoid jumbled look) */}
            <div className="min-w-0 leading-none">
              <div
                className="text-xs font-semibold uppercase text-white/90
                           tracking-[0.12em] whitespace-nowrap"
              >
                {name}
              </div>
              <div
                className="text-[10px] uppercase text-white/55
                           tracking-[0.16em] whitespace-nowrap"
              >
                {role}
              </div>
            </div>
          </header>

          {/* Quote */}
          <p className="text-lg font-light text-[hsl(var(--c-text-light))]/90 mb-8 italic">
            &ldquo;{quote}&rdquo;
          </p>

          {/* Feature list */}
          <div className="space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.08 * (index + 1) }}
                  className="flex items-center gap-3"
                >
                  <Icon className="w-4 h-4" style={{ color: `hsl(var(${accentVar}) / 0.70)` }} />
                  <span className="text-sm text-[hsl(var(--c-text-light))]/80">{feature.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
