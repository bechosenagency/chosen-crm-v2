'use client';

import React, { useState, FormEvent } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      {/* Elevated card with shadow */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-12 transform translate-y-[-40px]">
        {/* Grain texture overlay */}
        <div className="absolute inset-0 rounded-2xl opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        <form onSubmit={onSubmit} className="relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-3xl font-light text-gray-800 mb-2">Welcome back</h1>
            <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
          </motion.div>

          {/* Email Field */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 relative"
          >
            <motion.label
              htmlFor="email"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                emailFocused || email
                  ? '-top-2 text-xs bg-white px-1'
                  : 'top-4 text-sm'
              }`}
              style={{ color: emailFocused ? '#C9A961' : '#9CA3AF' }}
            >
              Email address
            </motion.label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full px-4 py-4 pl-12 pr-4 border-2 bg-white text-black outline-none transition-all duration-300 rounded-lg"
                style={{
                  borderColor: emailFocused ? '#C9A961' : '#E5E7EB',
                  boxShadow: emailFocused ? '0 0 0 4px rgba(201, 169, 97, 0.1)' : 'none',
                }}
                autoComplete="email"
              />
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                emailFocused ? 'text-[#C9A961]' : 'text-gray-400'
              }`} />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 relative"
          >
            <motion.label
              htmlFor="password"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                passwordFocused || password
                  ? '-top-2 text-xs bg-white px-1'
                  : 'top-4 text-sm'
              }`}
              style={{ color: passwordFocused ? '#C9A961' : '#9CA3AF' }}
            >
              Password
            </motion.label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full px-4 py-4 pl-12 pr-12 border-2 bg-white text-black outline-none transition-all duration-300 rounded-lg"
                style={{
                  borderColor: passwordFocused ? '#C9A961' : '#E5E7EB',
                  boxShadow: passwordFocused ? '0 0 0 4px rgba(201, 169, 97, 0.1)' : 'none',
                }}
                autoComplete="current-password"
              />
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                passwordFocused ? 'text-[#C9A961]' : 'text-gray-400'
              }`} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C9A961] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Remember Me */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 flex items-center"
          >
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                rememberMe 
                  ? 'bg-[#C9A961] border-[#C9A961]' 
                  : 'bg-white border-gray-300'
              }`}>
                {rememberMe && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 text-white absolute top-0.5 left-0.5"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                    />
                  </motion.svg>
                )}
              </div>
              <span className="ml-3 text-sm text-gray-600">Remember me</span>
            </label>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            type="submit"
            disabled={loading}
            className="relative w-full h-14 bg-gradient-to-r from-[#C9A961] to-[#B8956A] text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl disabled:opacity-50 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>
            
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </span>
          </motion.button>

          {/* Demo Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-[#C9A961] transition-colors duration-300"
            >
              Request a demo
            </a>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}