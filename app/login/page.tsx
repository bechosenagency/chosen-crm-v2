"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement backend login logic
    console.log("Login attempt:", { email, password });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    // TODO: Implement Google OAuth
    console.log("Google sign-in clicked");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-[#F8FAFC] border-[#E5E7EB] shadow-lg">
          <CardHeader className="space-y-1 text-center pb-8">
            {/* Logo placeholder */}
            <div className="mx-auto mb-4 w-16 h-16 bg-[#00D6A1] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1F2937]">Welcome back</h1>
            <p className="text-sm text-[#6B7280]">Sign in to your ChosenCRM account</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1F2937]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-[#E5E7EB] focus:border-[#00D6A1] focus:ring-[#00D6A1]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#1F2937]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white border-[#E5E7EB] focus:border-[#00D6A1] focus:ring-[#00D6A1]"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00D6A1] hover:bg-[#00D6A1]/90 text-white font-medium py-2.5"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* OAuth Section */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E7EB]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#F8FAFC] px-2 text-[#6B7280]">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full mt-4 bg-white border-[#E5E7EB] hover:bg-[#F8FAFC] hover:border-[#D1D5DB] text-[#1F2937]"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
                Continue with Google
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Links below card */}
        <div className="mt-6 text-center space-y-2">
          <Link 
            href="/forgot-password" 
            className="text-sm text-[#00D6A1] hover:text-[#00D6A1]/80 transition-colors"
          >
            Forgot password?
          </Link>
          <p className="text-sm text-[#6B7280]">
            Don't have an account?{" "}
            <Link 
              href="/contact-sales" 
              className="text-[#00D6A1] hover:text-[#00D6A1]/80 transition-colors font-medium"
            >
              Contact sales
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}