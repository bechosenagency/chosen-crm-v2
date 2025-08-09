'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Loader2, Mail, Shield, Target, TrendingUp, RefreshCw, Timer, BarChart3, Zap, GitBranch, ClipboardCheck, Users } from 'lucide-react';

import PersonaCard from '@/components/auth/PersonaCard';
import SsoButtons from '@/components/auth/SsoButtons';
import AuthDivider from '@/components/auth/AuthDivider';
import ParticleField from '@/components/auth/ParticleField';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setFocus,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  // Focus first error field
  useEffect(() => {
    const firstError = errors.email ? 'email' : errors.password ? 'password' : null;
    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  const onSubmit = async (_data: LoginFormData) => {
    setIsLoading(true);
    
    // TODO: Wire this to backend at /api/auth/login
    // For now, simulate success and route to dashboard
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    router.push('/dashboard');
  };

  // Persona data
  const maxwellFeatures = [
    { icon: Target, text: 'Daily scorecards & call blocks' },
    { icon: TrendingUp, text: 'Pattern coaching' },
    { icon: RefreshCw, text: 'Accountability loops' },
    { icon: Timer, text: 'Focus sprints' },
    { icon: BarChart3, text: 'KPI sync with dialer, calendar, leads, and tasks' },
  ];

  const avaFeatures = [
    { icon: Zap, text: 'Speed-to-lead' },
    { icon: GitBranch, text: 'Adaptive cadences' },
    { icon: ClipboardCheck, text: 'Qualification & 1003 pre-check' },
    { icon: TrendingUp, text: 'Credit-improvement tracks' },
    { icon: Users, text: 'Realtor updates' },
  ];

  return (
    <main className="min-h-screen grid lg:grid-cols-[38%_62%] bg-[hsl(var(--c-bg))]">
      {/* Left Panel - Brand Storytelling */}
      <motion.section 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-[hsl(var(--c-sidebar))] to-[hsl(var(--c-sidebar))]/95 flex items-center justify-center p-8 lg:p-12 noise-overlay overflow-hidden"
      >
        {/* Particle effects */}
        <ParticleField />
        
        {/* Background depth - radial gradient spots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Max accent spot */}
          <div 
            className="absolute -top-20 -left-20 w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, hsl(var(--c-max-accent) / 0.1), transparent 70%)`,
              filter: 'blur(60px)'
            }}
          />
          {/* Ava accent spot */}
          <div 
            className="absolute bottom-40 right-10 w-80 h-80 rounded-full"
            style={{
              background: `radial-gradient(circle, hsl(var(--c-ava-accent) / 0.08), transparent 70%)`,
              filter: 'blur(50px)'
            }}
          />
          {/* Primary accent spot */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, hsl(var(--c-primary) / 0.05), transparent 60%)`,
              filter: 'blur(80px)'
            }}
          />
        </div>
        
        {/* Content container */}
        <div className="relative z-10 max-w-md w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-light text-[hsl(var(--c-text-light))] mb-2">
              ChosenCRM
            </h1>
            <p className="text-sm text-[hsl(var(--c-text-light))]/60 tracking-[0.2em] uppercase">
              Dual Intelligence. Singular Focus.
            </p>
          </motion.div>

          {/* Persona Cards */}
          <div className="relative mb-12">
            {/* Cards container */}
            <div className="space-y-6">
              <PersonaCard
                name="MAXWELL"
                role="AI Coach & Accountability"
                quote="I turn your patterns into profit."
                features={maxwellFeatures}
                delay={0.4}
                variant="max"
              />
              
              <PersonaCard
                name="AVA"
                role="AI Assistant"
                quote="I ensure nothing falls through."
                features={avaFeatures}
                delay={0.6}
                variant="ava"
              />
            </div>
            
            {/* Connector line between cards - hidden on mobile */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 -z-10 hidden lg:block"
              aria-hidden="true"
            >
              <div 
                className="connector"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `repeating-linear-gradient(
                    to bottom,
                    hsl(var(--c-border)) 0 6px,
                    transparent 6px 12px
                  )`,
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
                  maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
                  opacity: 0.35,
                }}
              />
            </div>
          </div>

          {/* Together Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-3"
          >
            <h3 className="text-sm font-medium text-[hsl(var(--c-primary))] uppercase tracking-wider">
              Together
            </h3>
            <div className="text-sm text-[hsl(var(--c-text-light))]/70 space-y-1">
              <p>Max sets goals, reviews performance, and assigns focus.</p>
              <p>Ava executes outreach, follow-ups, and data collection.</p>
              <p className="text-[hsl(var(--c-text-light))]/90 pt-2">
                Feedback loop tightens daily → more activity → better coaching → higher conversion.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Right Panel - Auth Card */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center justify-center p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-[hsl(var(--c-surface-1))] rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] p-8 lg:p-10">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-light text-[hsl(var(--c-text-primary))] mb-2">
                Welcome back
              </h2>
              <p className="text-sm text-[hsl(var(--c-text-secondary))]">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--c-text-secondary))]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="pl-10"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    data-testid="login-email"
                    {...register('email')}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      id="email-error"
                      className="text-sm text-[hsl(var(--c-error))]"
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--c-text-secondary))]" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    data-testid="login-password"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[hsl(var(--c-text-secondary))] hover:text-[hsl(var(--c-text-primary))] transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--c-primary))]/60"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      id="password-error"
                      className="text-sm text-[hsl(var(--c-error))]"
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setValue('rememberMe', checked as boolean)}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-sm text-[hsl(var(--c-primary))] hover:text-[hsl(var(--c-primary))]/80 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="relative w-full h-11 rounded-lg bg-gradient-to-r from-[hsl(var(--c-accent))] to-[hsl(var(--c-primary))] text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--c-primary))]/60 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                data-testid="login-submit"
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_700ms_ease-out_forwards] bg-gradient-to-r from-transparent via-[hsl(var(--c-accent))]/20 to-transparent skew-x-12" />
                </div>
                
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </span>
              </motion.button>

              {/* Divider */}
              <AuthDivider />

              {/* SSO Buttons */}
              <SsoButtons disabled={isLoading} />

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 pt-4 text-xs text-[hsl(var(--c-text-secondary))]">
                <Shield className="w-3 h-3" />
                <span>Bank-grade encryption. SOC 2 Type II.</span>
              </div>
            </form>

            {/* Request Demo Link */}
            <p className="text-center mt-8 text-sm text-[hsl(var(--c-text-secondary))]">
              Need an account?{' '}
              <a
                href="#"
                className="text-[hsl(var(--c-primary))] hover:text-[hsl(var(--c-primary))]/80 transition-colors"
              >
                Request a demo
              </a>
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Mobile View - Stacked Layout */}
      <style jsx>{`
        @media (max-width: 1023px) {
          main {
            display: flex;
            flex-direction: column;
          }
          
          section:first-child {
            min-height: 50vh;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          @keyframes shimmer {
            0%, 100% {
              transform: none;
            }
          }
          
          .connector {
            animation: none !important;
          }
        }
        
        /* Ensure connector respects high contrast mode */
        @media (prefers-contrast: high) {
          .connector {
            opacity: 0.6;
          }
        }
      `}</style>
    </main>
  );
}