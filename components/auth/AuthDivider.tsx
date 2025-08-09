'use client';

import React from 'react';

export default function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[hsl(var(--c-border))]" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[hsl(var(--c-surface-1))] px-4 text-[hsl(var(--c-text-secondary))]">
          or
        </span>
      </div>
    </div>
  );
}