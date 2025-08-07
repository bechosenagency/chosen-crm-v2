"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// SSO-Buttons-v2: Premium SSO integration with loading states and animations
interface SSOButtonsProps {
  onGoogleSignIn?: () => Promise<void>;
  onMicrosoftSignIn?: () => Promise<void>;
  disabled?: boolean;
}

export function SSOButtons({ 
  onGoogleSignIn, 
  onMicrosoftSignIn, 
  disabled = false 
}: SSOButtonsProps) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [microsoftLoading, setMicrosoftLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (!onGoogleSignIn || disabled) return;
    
    setGoogleLoading(true);
    try {
      await onGoogleSignIn();
    } catch (error) {
      // Handle error silently - could show toast notification here
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    if (!onMicrosoftSignIn || disabled) return;
    
    setMicrosoftLoading(true);
    try {
      await onMicrosoftSignIn();
    } catch (error) {
      // Handle error silently - could show toast notification here
    } finally {
      setMicrosoftLoading(false);
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  return (
    <div className="space-y-3">
      {/* Google SSO Button */}
      <motion.div
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
      >
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={disabled || googleLoading || microsoftLoading}
          className="w-full bg-white border-[#E5E7EB] hover:bg-[#F8FAFC] hover:border-[#D1D5DB] 
                     text-[#1A1A1A] transition-all duration-200 py-3 group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-center space-x-3">
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            <span className="font-medium">
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </span>
          </div>
        </Button>
      </motion.div>

      {/* Microsoft SSO Button */}
      <motion.div
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
      >
        <Button
          type="button"
          variant="outline"
          onClick={handleMicrosoftSignIn}
          disabled={disabled || googleLoading || microsoftLoading}
          className="w-full bg-white border-[#E5E7EB] hover:bg-[#F8FAFC] hover:border-[#D1D5DB] 
                     text-[#1A1A1A] transition-all duration-200 py-3 group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-center space-x-3">
            {microsoftLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z" />
                <path fill="#00A4EF" d="M13 1h10v10H13z" />
                <path fill="#7FBA00" d="M1 13h10v10H1z" />
                <path fill="#FFB900" d="M13 13h10v10H13z" />
              </svg>
            )}
            <span className="font-medium">
              {microsoftLoading ? "Signing in..." : "Continue with Microsoft"}
            </span>
          </div>
        </Button>
      </motion.div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E5E7EB]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-[#6B7280]">or</span>
        </div>
      </div>
    </div>
  );
}