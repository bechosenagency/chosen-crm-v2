"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Trophy, TrendingUp } from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
  personalBest: number;
  className?: string;
}

export default function StreakCounter({
  currentStreak,
  personalBest,
  className = "",
}: StreakCounterProps) {
  const [showFlame, setShowFlame] = useState(false);
  const streakMotion = useMotionValue(0);
  const displayStreak = useTransform(streakMotion, (latest) =>
    Math.round(latest),
  );

  useEffect(() => {
    const animation = animate(streakMotion, currentStreak, {
      duration: 2,
      ease: "easeOut",
    });

    // Show flame animation when streak updates
    if (currentStreak > 0) {
      setShowFlame(true);
      const timer = setTimeout(() => setShowFlame(false), 3000);
      return () => {
        animation.stop();
        clearTimeout(timer);
      };
    }

    return animation.stop;
  }, [currentStreak, streakMotion]);

  const isNewRecord = currentStreak > personalBest;
  const streakLevel =
    currentStreak >= 30
      ? "legendary"
      : currentStreak >= 14
        ? "epic"
        : currentStreak >= 7
          ? "hot"
          : currentStreak >= 3
            ? "warming"
            : "starting";

  const getStreakColor = () => {
    switch (streakLevel) {
      case "legendary":
        return "from-amber-500 to-orange-600";
      case "epic":
        return "from-orange-500 to-red-600";
      case "hot":
        return "from-red-500 to-pink-600";
      case "warming":
        return "from-primary to-primary/70";
      default:
        return "from-muted-foreground to-muted-foreground/70";
    }
  };

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
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getStreakColor()} opacity-5 pointer-events-none`}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${getStreakColor()} bg-opacity-10`}
              >
                <Flame
                  className={`h-6 w-6 text-${streakLevel === "legendary" ? "amber" : "orange"}-500`}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Daily Streak
                </h3>
                <p className="text-sm text-muted-foreground">
                  Keep the momentum!
                </p>
              </div>
            </div>
            {isNewRecord && (
              <Badge
                variant="destructive"
                className="text-sm px-3 py-1.5 animate-pulse"
              >
                <Trophy className="h-3 w-3 mr-1" />
                New Record!
              </Badge>
            )}
          </div>

          {/* Main streak display */}
          <div className="text-center py-8">
            <div className="inline-flex items-baseline gap-3">
              <motion.div
                animate={
                  showFlame
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, -5, 5, -5, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.5 }}
                className="text-5xl"
              >
                🔥
              </motion.div>
              <motion.span
                className={`text-metric-xl font-ultralight text-metric bg-gradient-to-r ${getStreakColor()} bg-clip-text text-transparent`}
              >
                {displayStreak}
              </motion.span>
              <span className="text-metric-md font-thin text-muted-foreground">
                {currentStreak === 1 ? "day" : "days"}
              </span>
            </div>

            <motion.p
              className="text-sm font-medium mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {streakLevel === "legendary" && (
                <span className="text-amber-600">
                  Legendary streak! You're unstoppable! 🌟
                </span>
              )}
              {streakLevel === "epic" && (
                <span className="text-orange-600">
                  Epic streak! Keep crushing it! 💪
                </span>
              )}
              {streakLevel === "hot" && (
                <span className="text-red-600">
                  You're on fire! Don't stop now! 🔥
                </span>
              )}
              {streakLevel === "warming" && (
                <span className="text-primary">
                  Getting warmer! Build that habit! 🚀
                </span>
              )}
              {streakLevel === "starting" && (
                <span className="text-muted-foreground">
                  Every journey starts with day one! 💫
                </span>
              )}
            </motion.p>
          </div>

          {/* Progress to next milestone */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next milestone</span>
              <span className="font-medium text-foreground">
                {currentStreak < 3
                  ? "3 days"
                  : currentStreak < 7
                    ? "7 days"
                    : currentStreak < 14
                      ? "14 days"
                      : currentStreak < 30
                        ? "30 days"
                        : "∞ days"}
              </span>
            </div>
            <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${getStreakColor()}`}
                initial={{ width: 0 }}
                animate={{
                  width:
                    currentStreak < 3
                      ? `${(currentStreak / 3) * 100}%`
                      : currentStreak < 7
                        ? `${((currentStreak - 3) / 4) * 100}%`
                        : currentStreak < 14
                          ? `${((currentStreak - 7) / 7) * 100}%`
                          : currentStreak < 30
                            ? `${((currentStreak - 14) / 16) * 100}%`
                            : "100%",
                }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/20">
            <div className="text-center">
              <p className="text-2xl font-thin text-foreground text-metric">
                {personalBest}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">
                Personal Best
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-thin text-foreground text-metric">
                {Math.max(0, personalBest - currentStreak)}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">
                To Beat Record
              </p>
            </div>
          </div>
        </div>

        {/* Flame particles effect */}
        {showFlame && streakLevel !== "starting" && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-orange-400 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
