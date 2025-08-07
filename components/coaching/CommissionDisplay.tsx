"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, ArrowUp, Sparkles } from "lucide-react";

interface CommissionDisplayProps {
  monthlyCommission: number;
  pipelineValue: number;
  lastMonthCommission?: number;
  className?: string;
}

export default function CommissionDisplay({
  monthlyCommission,
  pipelineValue,
  lastMonthCommission = 0,
  className = "",
}: CommissionDisplayProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const commissionMotion = useMotionValue(0);
  const pipelineMotion = useMotionValue(0);

  const displayCommission = useTransform(commissionMotion, (latest) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(latest)),
  );

  const displayPipeline = useTransform(pipelineMotion, (latest) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(latest)),
  );

  useEffect(() => {
    setIsAnimating(true);

    const commissionAnim = animate(commissionMotion, monthlyCommission, {
      duration: 2.5,
      ease: "easeOut",
    });

    const pipelineAnim = animate(pipelineMotion, pipelineValue, {
      duration: 2.5,
      ease: "easeOut",
      delay: 0.3,
    });

    const timer = setTimeout(() => setIsAnimating(false), 3000);

    return () => {
      commissionAnim.stop();
      pipelineAnim.stop();
      clearTimeout(timer);
    };
  }, [monthlyCommission, pipelineValue, commissionMotion, pipelineMotion]);

  const growthPercentage =
    lastMonthCommission > 0
      ? Math.round(
          ((monthlyCommission - lastMonthCommission) / lastMonthCommission) *
            100,
        )
      : 0;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* Monthly Commission Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-8 bg-white/90 backdrop-blur-md border-white/20 shadow-premium hover:shadow-premium-lg transition-premium relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <DollarSign className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    Monthly Commission
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Earned this month
                  </p>
                </div>
              </div>
              {growthPercentage > 0 && (
                <Badge variant="secondary" className="text-sm px-3 py-1.5">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {growthPercentage}%
                </Badge>
              )}
            </div>

            {/* Commission display with slot machine effect */}
            <div className="text-center py-6">
              <motion.div
                className="text-metric-xl font-ultralight text-foreground text-metric relative"
                animate={
                  isAnimating
                    ? {
                        textShadow: [
                          "0 0 0 transparent",
                          "0 0 20px rgba(16, 185, 129, 0.5)",
                          "0 0 0 transparent",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {displayCommission}
              </motion.div>

              {isAnimating && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="h-8 w-8 text-secondary" />
                </motion.div>
              )}
            </div>

            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly goal</span>
                <span className="font-medium text-foreground">$50,000</span>
              </div>
              <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-secondary to-secondary/70"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min((monthlyCommission / 50000) * 100, 100)}%`,
                  }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Pipeline Value Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="p-8 bg-white/90 backdrop-blur-md border-white/20 shadow-premium hover:shadow-premium-lg transition-premium relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    Pipeline Value
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Active opportunities
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-primary text-sm px-3 py-1.5"
              >
                12 deals
              </Badge>
            </div>

            {/* Pipeline value display */}
            <div className="text-center py-6">
              <motion.div
                className="text-metric-xl font-ultralight text-foreground text-metric"
                animate={
                  isAnimating
                    ? {
                        scale: [1, 1.02, 1],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {displayPipeline}
              </motion.div>
            </div>

            {/* Deal stages breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-muted/10 rounded-lg">
                <p className="text-lg font-thin text-foreground">3</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Application
                </p>
              </div>
              <div className="p-3 bg-muted/10 rounded-lg">
                <p className="text-lg font-thin text-foreground">5</p>
                <p className="text-xs text-muted-foreground mt-1">Processing</p>
              </div>
              <div className="p-3 bg-muted/10 rounded-lg">
                <p className="text-lg font-thin text-foreground">4</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Underwriting
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
