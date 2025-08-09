import React from "react";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata = {
  title: "ChosenCRM – Sign in",
};

// ⚠️ Nested layouts must NOT render <html> or <body>.
// Root html/body (and data-theme + font classes) belong in app/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`min-h-screen bg-[var(--c-bg)] text-[var(--c-text)] ${playfair.variable}`}>
      {children}
    </div>
  );
}