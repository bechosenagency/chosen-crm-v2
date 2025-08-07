"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";

interface TaskCounterProps {
  completed: number;
  total: number;
  className?: string;
}

export default function TaskCounter({
  completed,
  total,
  className = "",
}: TaskCounterProps) {
  const completedMotion = useMotionValue(0);
  const displayCompleted = useTransform(completedMotion, (latest) =>
    Math.round(latest),
  );

  useEffect(() => {
    const animation = animate(completedMotion, completed, {
      duration: 1.5,
      ease: "easeOut",
    });
    return animation.stop;
  }, [completed, completedMotion]);

  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const isComplete = completed === total && total > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="p-8 bg-white/90 backdrop-blur-md border-white/20 shadow-premium hover:shadow-premium-lg transition-premium relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Daily Tasks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your focus for today
                </p>
              </div>
            </div>
            {isComplete && (
              <Badge variant="secondary" className="text-sm px-3 py-1.5">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Complete!
              </Badge>
            )}
          </div>

          {/* Main counter display */}
          <div className="text-center py-8">
            <div className="inline-flex items-baseline gap-2">
              <motion.span
                className={`text-metric-xl font-ultralight text-metric transition-colors duration-500 ${
                  completed === 0
                    ? "text-destructive"
                    : isComplete
                      ? "text-secondary"
                      : "text-primary"
                }`}
              >
                {displayCompleted}
              </motion.span>
              <span className="text-metric-lg font-thin text-muted-foreground">
                /
              </span>
              <span className="text-metric-lg font-thin text-foreground text-metric">
                {total}
              </span>
            </div>

            <motion.p
              className="text-sm font-medium mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {completed === 0 ? (
                <span className="text-muted-foreground">
                  Let's get started! 🚀
                </span>
              ) : isComplete ? (
                <span className="text-secondary">Outstanding work! 🎉</span>
              ) : (
                <span className="text-primary">
                  Keep going, you're doing great! 💪
                </span>
              )}
            </motion.p>
          </div>

          {/* Progress bar */}
          <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
            <motion.div
              className={`absolute inset-y-0 left-0 rounded-full ${
                isComplete
                  ? "bg-gradient-to-r from-secondary to-secondary/70"
                  : "bg-gradient-to-r from-primary to-primary/70"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/20">
            <div className="text-center">
              <p className="text-2xl font-thin text-foreground text-metric">
                {Math.round(percentage)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">
                Progress
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-thin text-foreground text-metric">
                {total - completed}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">
                Remaining
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-thin text-foreground text-metric">
                {completed * 45}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">
                Points
              </p>
            </div>
          </div>
        </div>

        {/* Completion celebration effect */}
        {isComplete && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent" />
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
