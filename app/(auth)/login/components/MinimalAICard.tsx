'use client';

import React from 'react';

interface MinimalAICardProps {
  name: string;
  role: string;
  tagline: string;
  color: string;
  icon: 'max' | 'ava';
}

export default function MinimalAICard({ name, role, tagline, color, icon }: MinimalAICardProps) {
  return (
    <div className="group cursor-default">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div 
          className="w-16 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
          style={{ color }}
        >
          {icon === 'max' ? <MaxIcon /> : <AvaIcon />}
        </div>
      </div>
      
      {/* Content */}
      <div className="text-center">
        <h3 
          className="text-xs font-light tracking-[0.3em] uppercase mb-1 transition-opacity duration-300 group-hover:opacity-80"
          style={{ color }}
        >
          {name}
        </h3>
        <p className="text-xs text-white/50 mb-4">{role}</p>
        <p className="text-sm text-white/70 font-light italic">&ldquo;{tagline}&rdquo;</p>
      </div>
    </div>
  );
}

// Minimal geometric head profile for Coach Max
function MaxIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
      {/* Head profile */}
      <path d="M24 8 C32 8, 36 12, 36 20 C36 24, 34 26, 32 28 L32 36 C32 38, 30 40, 28 40 L20 40 C18 40, 16 38, 16 36 L16 28 C14 26, 12 24, 12 20 C12 12, 16 8, 24 8 Z" />
      {/* Eye */}
      <circle cx="28" cy="18" r="2" fill="currentColor" />
      {/* Abstract brain lines */}
      <path d="M20 14 Q24 16, 28 14" strokeWidth="0.5" />
      <path d="M20 18 Q24 20, 28 18" strokeWidth="0.5" />
    </svg>
  );
}

// Abstract flowing lines for Assistant Ava
function AvaIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
      {/* Flowing abstract shape */}
      <path d="M24 8 Q32 12, 32 24 T24 40 Q16 36, 16 24 T24 8" />
      {/* Inner flow */}
      <path d="M24 16 Q28 20, 28 24 T24 32 Q20 28, 20 24 T24 16" strokeWidth="0.5" />
      {/* Center dot */}
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}